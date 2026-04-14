import requests
from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
from supabase import ClientOptions, create_client, Client
from dotenv import load_dotenv
import logging # for logging errors

load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

security = HTTPBearer()

# logger for errors/exceptions (with the name of the module):
logger = logging.getLogger(__name__)


supabase: Client = create_client(sb_url, 
                         sb_key,
                         options=ClientOptions(
                            auto_refresh_token=False,
                            persist_session=False,
                         ))

# instead of app, make this a router (a PORTION of the app; this helps combine many different file endpoints)
router = APIRouter()

class SignUpRequest(BaseModel):
    email: str
    password: str

class SignInRequest(BaseModel):
    email: str
    password: str

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

# called whenever front end gets user info from sign up page
@router.post("/signup")
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
        supabase.table("User_Points").insert({
            "user_id": user.id,
            "points": 0
        }).execute()

        #insert a new row into supabase pokedex table 
        supabase.table("bird_checklist").insert({
            "id": user.id
        }).execute()

        return {
            "message": "User successfully added!"
        }
    except HTTPException:
        raise
    except Exception as e:
        e_msg = str(e).lower() 
        if "database error saving new user" in e_msg:
            raise HTTPException(status_code=409, detail="An account with this email already exists")
        raise HTTPException(status_code=500, detail=str(e))

# called whenever the front end gets user info in the sign in page
@router.post("/signin")
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
@router.post("/signout")
def signout():
    try:
        supabase.auth.sign_out()
        return {
            "message": "User successfully signed out!"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    



    
