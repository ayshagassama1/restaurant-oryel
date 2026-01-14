from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
 
router = APIRouter()
 
class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    date: str
    time: str
    guests: int
    message: Optional[str] = None
 
reservations_store: list[dict] = []
 
@router.post("/reservations", status_code=201)
def create_reservation(data: ReservationCreate):
    reservation = {
        **data.model_dump(),
        "id": len(reservations_store) + 1,
        "created_at": datetime.utcnow().isoformat(),
    }
    reservations_store.append(reservation)
    return {"message": "Réservation enregistrée", "id": reservation["id"]}
 
@router.get("/reservations")
def list_reservations():
    return reservations_store
