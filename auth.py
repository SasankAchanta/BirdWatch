import requests
from fastapi import FastAPI
from pydantic import BaseModel
import os
from supabase import create_client, Client
from dotenv import load_dotenv
# JUST AS A TEST FOR FRONTEND
import streamlit as st

load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

supabase = create_client(sb_url, sb_key)

def sign_up(email, pw):
    try:
        user = supabase.auth.sign_up({
            "email": email,
            "password": pw
        })
        return user
    except Exception as e:
        st.error(f"Registration error: {e}")

def sign_in(email, pw):
    try:
        user = supabase.auth.sign_in_with_password({
            "email": email,
            "password": pw
        })
        return user
    except Exception as e:
        st.error(f"Login failed: {e}")

def sign_out():
    try:
        supabase.auth.sign_out()
        