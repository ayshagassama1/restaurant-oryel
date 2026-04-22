#!/bin/bash
# Déploiement du backend FastAPI sur EC2
# Prérequis : SSH configuré, EC2 avec Python 3.11+
 
set -e
 
EC2_HOST="${EC2_HOST:?Variable EC2_HOST manquante}"
EC2_USER="${EC2_USER:-ubuntu}"
APP_DIR="/home/ubuntu/restaurant-api"
 
echo "Déploiement backend sur $EC2_HOST..."
 
ssh "$EC2_USER@$EC2_HOST" << REMOTE
  cd $APP_DIR
  git pull origin main
  source .venv/bin/activate
  pip install -r requirements.txt --quiet
  sudo systemctl restart restaurant-api
  echo "Backend redémarré"
REMOTE
 
echo "Déploiement terminé."
