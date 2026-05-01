from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Clientra API",
    description="AI Freelance Manager Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Clientra API is running 🚀"}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "app": "Clientra",
        "version": "1.0.0"
    }