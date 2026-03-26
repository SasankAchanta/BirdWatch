import requests
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
from supabase import ClientOptions, create_client, Client
from dotenv import load_dotenv
import stats # for changing points
import logging # for logging errors

load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

security = HTTPBearer()

# logger for errors/exceptions (with the name of the module):
logger = logging.getLogger(__name__)

# get the currently logged in user
def get_current_user(
        # formats request header to easily extract the token needed to determine the current user 
        credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        response = supabase.auth.get_user(token)
        
        if not response or not response.user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return response.user
    # raise exceptions separately because HTTPException handles SPECIFIC errors (like 401) and Exception handles unexpected exceptions
    except HTTPException:
        raise # raise as is 
    except Exception as e:
        # log the error:
        logger.error(f"Auth error: {e}")
        # raise the exception:
        raise HTTPException(status_code=401, detail="Authentication error")


supabase: Client = create_client(sb_url, 
                         sb_key,
                         options=ClientOptions(
                            auto_refresh_token=False,
                            persist_session=False,
                         ))
app = FastAPI()

class SignUpRequest(BaseModel):
    email: str
    password: str

class SignInRequest(BaseModel):
    email: str
    password: str

class PointsChangeRequest(BaseModel):
    num_points: int

# called whenever front end gets user info from sign up page
@app.post("/signup")
def signup(user_info: SignUpRequest):
    try:
        auth_response = supabase.auth.sign_up({
            "email": user_info.email,
            "password": user_info.password
        })

        user = auth_response.user
        if not user:
            raise HTTPException(status_code=400, detail="Signup failed")

        # insert a new row into the supabase table and initialize user_id to the user's id and points to 0
        points_response = supabase.table("User_Points").insert({
            "user_id": user.id,
            "points": 0
        }).execute()

        return {
            "message": "User successfully added!"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# called whenever the front end gets user info in the sign in page
@app.post("/signin")
def signin(user_info: SignInRequest):
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": user_info.email,
            "password": user_info.password
        })

        session = auth_response.session
        user = auth_response.user
        if not user:
            raise HTTPException(status_code=400, detail="Signin failed")

        return {
            "message": "User successfully logged in!",
            "token": session.access_token,
            "user_id": user.id
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# called whenever the user clicks sign out
@app.post("/signout")
def signout():
    try:
        supabase.auth.sign_out()
        return {
            "message": "User successfully signed out!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# get the user's points to display
@app.get("/get_points")
def get_points(current_user=Depends(get_current_user)): 
    try:
        user_id = current_user.id
        response = supabase.table("User_Points").select("points").eq("user_id", user_id).execute()
        
        # raise error if user has no points row
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found in User_Points table")
        
        return {
            # return ONLY ONE row in the points column
            "points": response.data[0]["points"] 
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# update the points whenever a picture is taken 
@app.patch("/update_points")
def update_points(points_change: PointsChangeRequest, current_user=Depends(get_current_user)): 
    try:
        user_id = current_user.id
        response = supabase.table("User_Points").select("points").eq("user_id", user_id).execute()
        
        # raise error if user has no points row
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found in User_Points table")
        
        points = response.data[0]["points"]
        points = points + points_change.num_points
        response = supabase.table("User_Points").update({"points": points}).eq("user_id", user_id).execute()
    
        return {
            "points": response.data[0]["points"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


    
