from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
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


@router.post("/reservations", status_code=201)
def create_reservation(data: ReservationCreate):
    return {"message": "Réservation enregistrée"}