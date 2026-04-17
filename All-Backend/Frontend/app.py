from supabase import create_client, Client
from fastapi import FastAPI, APIRouter, File, HTTPException, Depends, UploadFile
# able to load environment variables from a .env file
from dotenv import load_dotenv
import os
import Backend.auth as auth
import Backend.backend as backend
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add into this "main" file the endpoints of auth (using auth's and backend's routers)
app.include_router(auth.router)
app.include_router(backend.router)
