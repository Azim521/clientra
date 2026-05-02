from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import clients, proposals, earnings

load_dotenv()

app = FastAPI(
    title="Clientra API",
    description="AI Freelance Manager Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://studious-guacamole-4j94vgr7gqp374g7-5173.app.github.dev",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(clients.router)
app.include_router(proposals.router)
app.include_router(earnings.router)

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