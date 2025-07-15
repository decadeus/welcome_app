#!/bin/bash

# Script de déploiement pour Admin App Accueil
echo "🚀 Déploiement Admin App Accueil..."

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "Installez-le avec: npm i -g vercel"
    exit 1
fi

# Build du projet
echo "📦 Build du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

# Déploiement sur Vercel
echo "🌐 Déploiement sur Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi !"
    echo "🔗 Votre application est maintenant en ligne"
else
    echo "❌ Erreur lors du déploiement"
    exit 1
fi 