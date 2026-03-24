import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# MAKE AUTH FRONTEND because supabase works bettwe that way

load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

supabase = create_client(sb_url, sb_key)
app = FastAPI()

class SignUpRequest(BaseModel):
    email: str
    password: str

class SignInRequest(BaseModel):
    email: str
    password: str


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

@app.post("/signin")
def signin(user_info: SignInRequest):
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": user_info.email,
            "password": user_info.password
        })

        user = auth_response.user
        if not user:
            raise HTTPException(status_code=400, detail="Signin failed")

        return {
            "message": "User successfully logged in!"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/signout")
def signout():
    try:
        supabase.auth.sign_out()
        return {
            "message": "User successfully signed out!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
