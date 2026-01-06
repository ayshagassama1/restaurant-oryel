# restaurant.oryel.dev
 
Site vitrine de démonstration pour **Le Botaniste**, un restaurant fictif à Metz.

 
## Stack
 
- **Frontend** : React 18 + Vite + Tailwind CSS
- **Backend** : FastAPI + Python
- **IA** : OpenAI API (chatbot assistant)
- **Déploiement** : AWS S3 + CloudFront (frontend) / EC2 (backend)
 
## Lancer en local
 
```bash
# Frontend
npm install
npm run dev
 
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
