# Admin App Accueil

Une application web Next.js avec Supabase pour gérer les informations qui seront affichées sur une application mobile iOS/Android.

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd admin-app-accueil
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Supabase**

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

Pour obtenir ces valeurs :
1. Créez un projet sur [Supabase](https://supabase.com)
2. Allez dans Settings > API
3. Copiez l'URL et la clé anon

**Instructions détaillées :** Voir le fichier `setup-supabase.md`

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🌐 Déploiement sur Vercel

### Déploiement Rapide

1. **Poussez votre code sur GitHub**
2. **Connectez-vous à [Vercel](https://vercel.com)**
3. **Importez votre repository**
4. **Configurez les variables d'environnement Supabase**

**Instructions détaillées :** Voir le fichier `deploy-vercel.md`

### Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

## 📁 Structure du Projet

```
admin-app-accueil/
├── app/                 # Pages Next.js (App Router)
│   ├── page.tsx        # Page d'accueil
│   ├── packages/       # Gestion des packages
│   ├── collect/        # Collecte de données
│   ├── info/           # Informations générales
│   ├── weather/        # Météo et conditions
│   ├── meeting/        # Réunions et rendez-vous
│   ├── surveys/        # Sondages et enquêtes
│   ├── ag/             # Assemblées générales
│   ├── trade/          # Échanges et transactions
│   ├── important/      # Informations importantes
│   ├── test-supabase/  # Test de connexion Supabase
│   └── layout.tsx      # Layout principal
├── lib/                # Utilitaires
│   └── supabase.ts     # Configuration Supabase
├── components/         # Composants React (à venir)
├── public/            # Fichiers statiques
├── vercel.json        # Configuration Vercel
└── ...
```

## 🛠️ Fonctionnalités

- ✅ Interface d'administration de base
- ✅ Configuration Supabase
- ✅ Design responsive avec Tailwind CSS
- ✅ 9 sections de gestion différentes
- ✅ Page de test Supabase
- ✅ Configuration Vercel
- 🔄 Ajout d'informations (à venir)
- 🔄 Modification d'informations (à venir)
- 🔄 Suppression d'informations (à venir)
- 🔄 API pour l'application mobile (à venir)

## 🎨 Technologies Utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Supabase** - Backend-as-a-Service
- **Vercel** - Déploiement et hosting
- **ESLint** - Linting

## 📱 Pour l'Application Mobile

Cette interface admin permettra de :
- Gérer le contenu affiché sur l'app mobile
- Créer/modifier/supprimer des informations
- Organiser les données par catégories
- Fournir une API REST pour l'app mobile

## 🔧 Scripts Disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Build pour la production
npm run start        # Démarre le serveur de production
npm run lint         # Lance ESLint
```

## 🧪 Test de Connexion Supabase

Pour vérifier que Supabase est correctement configuré :

1. Configurez vos variables d'environnement dans `.env.local`
2. Allez sur [http://localhost:3000/test-supabase](http://localhost:3000/test-supabase)
3. Vérifiez le statut de la connexion

## 📝 Prochaines Étapes

1. ✅ Configurer la base de données Supabase
2. ✅ Configuration Vercel
3. 🔄 Créer les tables pour les informations
4. 🔄 Ajouter les composants CRUD
5. 🔄 Implémenter l'authentification
6. 🔄 Créer l'API pour l'application mobile

## 📚 Documentation

- **Configuration Supabase :** `setup-supabase.md`
- **Déploiement Vercel :** `deploy-vercel.md`
- **Variables d'environnement :** `env.example`
- **Test de connexion :** `/test-supabase`

## 🚀 Déploiement Rapide

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/admin-app-accueil)
