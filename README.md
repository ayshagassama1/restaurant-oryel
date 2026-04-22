# restaurant.oryel.dev
 
Site vitrine de démonstration pour **Le Botaniste**, restaurant fictif à Metz.
Construit pour le portfolio [Oryel](https://oryel.dev) — démontre ce qu'une TPE peut obtenir avec l'offre "Vitrine + Assistant IA".
 
## Stack
 
| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| Backend | FastAPI + Pydantic + Python 3.12 |
| IA | OpenAI API (gpt-4o-mini) |
| Déploiement | AWS S3 + CloudFront (frontend), EC2 (backend) |
| CI/CD | GitHub Actions |
 
## Architecture
 
```
restaurant-oryel/
├── src/
│   ├── components/restaurant/   # Banner, Navbar, Hero, Menu, Réservation, Avis, Footer, Chatbot
│   ├── components/ui/           # Input, Button, Select, Tabs (shadcn-style)
│   ├── hooks/                   # useScrollAnimate
│   └── pages/Home.jsx
├── backend/
│   ├── main.py                  # FastAPI app + CORS
│   ├── config.py                # pydantic-settings
│   └── routes/
│       ├── reservations.py      # POST /api/reservations
│       └── chat.py              # POST /api/chat (OpenAI)
└── infra/
    ├── deploy-backend.sh        # Script EC2
    └── restaurant-api.service   # Systemd unit
```
 
## Fonctionnalités
 
- Menu interactif avec onglets par catégorie
- Filtre allergènes (végétarien, sans gluten, sans lactose)
- Badges produits (Bestseller, Nouveau) avec origine au survol
- Formulaire de réservation avec confirmation inline
- Chatbot IA connecté à l'API (contexte restaurant complet)
- Responsive mobile
- Déploiement automatisé via GitHub Actions
 
## Lancer en local
 
```bash
# Frontend
npm install
npm run dev        
 
# Backend (dans un autre terminal)
cd backend
python -m venv .venv
source .venv/bin/activate   
pip install -r requirements.txt
cp .env.example .env        
uvicorn main:app --reload   
```
 
## Variables d'environnement
 
```env
# backend/.env
OPENAI_API_KEY=sk-...
ALLOWED_ORIGINS=http://localhost:5173,https://restaurant.oryel.dev
```
 
---
 
Projet réalisé par [Aissatou Gassama](https://oryel.dev) - freelance fullstack Python/React & IA.
