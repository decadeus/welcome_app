# Configuration Supabase

## 🚀 Étapes pour configurer Supabase

### 1. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub ou créez un compte
4. Cliquez sur "New Project"
5. Choisissez votre organisation
6. Donnez un nom à votre projet (ex: "admin-app-accueil")
7. Créez un mot de passe pour la base de données
8. Choisissez une région proche de vous
9. Cliquez sur "Create new project"

### 2. Récupérer les clés API

1. Une fois le projet créé, allez dans **Settings** (⚙️) dans la sidebar
2. Cliquez sur **API**
3. Vous verrez deux informations importantes :
   - **Project URL** (ex: `https://your-project-id.supabase.co`)
   - **anon public** key (commence par `eyJ...`)

### 3. Configurer les variables d'environnement

1. Copiez le fichier `env.example` vers `.env.local` :
   ```bash
   cp env.example .env.local
   ```

2. Éditez le fichier `.env.local` et remplacez les valeurs :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 4. Vérifier la configuration

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Vérifiez que Supabase fonctionne en allant sur http://localhost:3000

## 📊 Tables recommandées pour votre projet

Voici les tables que vous pourriez créer dans Supabase :

### Table `packages`
```sql
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table `info`
```sql
CREATE TABLE info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table `meetings`
```sql
CREATE TABLE meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE,
  type TEXT,
  is_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Prochaines étapes

1. **Créer les tables** dans l'interface Supabase
2. **Configurer les politiques RLS** (Row Level Security)
3. **Tester la connexion** avec votre application
4. **Ajouter des données** via l'interface Supabase
5. **Développer les fonctionnalités** CRUD dans votre app

## 📝 Notes importantes

- Les variables commençant par `NEXT_PUBLIC_` sont visibles côté client
- Gardez vos clés secrètes et ne les partagez jamais
- Le fichier `.env.local` est déjà dans `.gitignore` pour la sécurité 