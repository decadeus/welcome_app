# Déploiement sur Vercel

## 🚀 Déploiement Automatique

### Option 1 : Déploiement via GitHub (Recommandé)

1. **Poussez votre code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/admin-app-accueil.git
   git push -u origin main
   ```

2. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub
   - Cliquez sur "New Project"

3. **Importez votre projet**
   - Sélectionnez votre repository `admin-app-accueil`
   - Vercel détectera automatiquement Next.js
   - Cliquez sur "Deploy"

4. **Configurez les variables d'environnement**
   - Dans le dashboard Vercel, allez dans **Settings** > **Environment Variables**
   - Ajoutez vos variables Supabase :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option 2 : Déploiement via CLI

1. **Installez Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Connectez-vous à Vercel**
   ```bash
   vercel login
   ```

3. **Déployez**
   ```bash
   vercel
   ```

4. **Configurez les variables d'environnement**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

## ⚙️ Configuration des Variables d'Environnement

### Dans Vercel Dashboard :

1. Allez dans votre projet sur Vercel
2. Cliquez sur **Settings**
3. Allez dans **Environment Variables**
4. Ajoutez :

| Nom | Valeur | Environnements |
|-----|--------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |

### Via CLI :

```bash
# Pour la production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Pour le preview
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview

# Pour le développement
vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
```

## 🔧 Optimisations Vercel

### Configuration automatique :
- ✅ **Next.js 15** détecté automatiquement
- ✅ **TypeScript** supporté nativement
- ✅ **Tailwind CSS** optimisé
- ✅ **Edge Functions** disponibles
- ✅ **CDN global** pour les assets

### Avantages Vercel :
- **Déploiement automatique** à chaque push
- **Preview deployments** pour les PR
- **Edge Network** pour performance globale
- **Analytics** intégrés
- **SSL automatique**

## 📊 Monitoring et Analytics

### Vercel Analytics :
1. Allez dans **Analytics** dans votre dashboard
2. Activez les analytics pour votre projet
3. Surveillez les performances

### Logs et Debugging :
1. Allez dans **Functions** pour voir les logs
2. Utilisez **Edge Config** pour la configuration
3. Surveillez les erreurs dans **Functions**

## 🔄 Déploiement Continu

### Workflow recommandé :

1. **Développement local :**
   ```bash
   npm run dev
   ```

2. **Test local :**
   ```bash
   npm run build
   npm run start
   ```

3. **Push sur GitHub :**
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```

4. **Déploiement automatique :**
   - Vercel déploie automatiquement
   - Preview disponible immédiatement
   - Production après merge sur main

## 🚨 Troubleshooting

### Erreurs courantes :

**Build failed :**
```bash
# Vérifiez les variables d'environnement
vercel env ls

# Rebuild manuel
vercel --prod
```

**Variables d'environnement manquantes :**
```bash
# Vérifiez dans le dashboard Vercel
# Settings > Environment Variables
```

**Problèmes de Supabase :**
- Vérifiez que votre projet Supabase est actif
- Vérifiez les clés API dans Supabase Dashboard
- Testez la connexion localement d'abord

## 📱 Domaines Personnalisés

1. Allez dans **Settings** > **Domains**
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions Vercel

## 🔒 Sécurité

- ✅ Variables d'environnement sécurisées
- ✅ HTTPS automatique
- ✅ Headers de sécurité automatiques
- ✅ Protection DDoS incluse

## 📈 Performance

- ✅ **Edge Network** pour chargement rapide
- ✅ **Image Optimization** automatique
- ✅ **Code Splitting** automatique
- ✅ **Caching** intelligent 