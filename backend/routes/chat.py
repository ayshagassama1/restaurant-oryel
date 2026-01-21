from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from groq import Groq
from config import settings

router = APIRouter()
client = Groq(api_key=settings.groq_api_key)

SYSTEM_PROMPT = """
Tu es l'assistant virtuel du restaurant Le Botaniste à Metz.
Tu réponds aux questions des clients de façon chaleureuse, courte et précise.
 
Infos :
- Adresse : 12 rue des Jardins, 57000 Metz
- Téléphone : 03 87 12 34 56
- Email : contact@lebotaniste-metz.fr
- Horaires : Mar-Sam 12h-14h et 19h-22h. Dim 12h-14h. Lun fermé.
- Note : 4.8/5 sur Google. Sélection Le Républicain Lorrain 2025.
 
Carte actuelle :
Entrées : Velouté de potimarron 9€ (végétarien, sans gluten), Tartare de thon 13€, Tarte à la tomate et mozzarella 13€ (végétarien)
Plats : Filet de cabillaud 22€ (sans gluten), Risotto aux champignons 18€ (végétarien), Magret de canard 26€ (sans gluten)
Desserts : Tarte Tatin 8€ (végétarien), Fondant chocolat 7€ (végétarien), Fromages affinés 10€ (sans gluten)
Boissons : Eau 3€, Vin au verre 6€, Jus de fruits 5€, Café 2.50€
 
Politique de réservation : recommandée, confirmée sous 24h. Groupes de plus de 8 sur appel. Annulation possible jusqu'à 24h avant.
 
Si quelqu'un veut réserver, oriente-les vers le formulaire sur cette page ou le téléphone.
Tu ne peux pas enregistrer de réservation toi-même.
 
Réponds en français et si nécessaire dans la langue de l'utilisateur.
"""  

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[list[ChatMessage]] = []

@router.post("/chat")
def chat(request: ChatRequest):
    try:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in (request.history or []):
            messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": request.message})

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=400,
            temperature=0.7,
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))