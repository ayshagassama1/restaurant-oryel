from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes import reservations, chat
 
app = FastAPI(title="Le Botaniste API")
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
app.include_router(reservations.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
 
@app.get("/api/health")
def health():
    return {"status": "ok"}
