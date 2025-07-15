# Page de Gestion des Collectes de Déchets

## Vue d'ensemble

Cette page permet à l'administrateur de gérer les collectes de déchets en programmant des dates, en définissant les zones et les types de déchets, et en suivant le statut des collectes.

## Fonctionnalités

### 📊 Tableau de bord
- **Statistiques en temps réel** : Nombre total de collectes, collectes planifiées, en cours et terminées
- **Vue d'ensemble** : Permet de voir rapidement l'état des collectes

### ➕ Gestion des collectes
- **Ajout de nouvelles collectes** : Formulaire complet avec validation
- **Modification des collectes existantes** : Édition en place avec modal
- **Suppression des collectes** : Avec confirmation de sécurité
- **Statuts multiples** : Planifiée, En cours, Terminée, Annulée

### 📅 Informations collectées
- **Date et heure de collecte** : Sélecteur datetime-local
- **Type de déchet** : Ordures ménagères, Recyclage, Verre, Déchets verts, Encombrants
- **Zone de collecte** : Zone géographique personnalisable
- **Statut** : Suivi de l'avancement
- **Notes** : Informations supplémentaires optionnelles

## Configuration de la base de données

### 1. Configuration Supabase

1. Connectez-vous à votre projet Supabase
2. Allez dans l'éditeur SQL
3. Exécutez le script `setup-collectes.sql` pour créer la table et les politiques

### 2. Variables d'environnement

Assurez-vous que votre fichier `.env.local` contient :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## Structure de la base de données

### Table `collectes`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | BIGSERIAL | Identifiant unique (clé primaire) |
| `date_collecte` | TIMESTAMP WITH TIME ZONE | Date et heure de la collecte |
| `type_dechet` | TEXT | Type de déchet (avec contraintes) |
| `zone` | TEXT | Zone géographique de collecte |
| `statut` | TEXT | Statut de la collecte (avec contraintes) |
| `notes` | TEXT | Notes optionnelles |
| `created_at` | TIMESTAMP WITH TIME ZONE | Date de création |
| `updated_at` | TIMESTAMP WITH TIME ZONE | Date de dernière modification |

### Types de déchets supportés
- `ordures_ménagères`
- `recyclage`
- `verre`
- `déchets_verts`
- `encombrants`

### Statuts disponibles
- `planifiée`
- `en_cours`
- `terminée`
- `annulée`

## Utilisation

### Ajouter une nouvelle collecte

1. Cliquez sur "Nouvelle Collecte" dans l'en-tête ou "Ajouter" dans la section des collectes
2. Remplissez le formulaire :
   - **Date de collecte** : Sélectionnez la date et l'heure
   - **Type de déchet** : Choisissez dans la liste déroulante
   - **Zone** : Entrez la zone géographique
   - **Statut** : Sélectionnez le statut initial (généralement "Planifiée")
   - **Notes** : Ajoutez des informations supplémentaires si nécessaire
3. Cliquez sur "Créer"

### Modifier une collecte existante

1. Dans la liste des collectes, cliquez sur "Modifier"
2. Le formulaire s'ouvre avec les données actuelles
3. Modifiez les champs nécessaires
4. Cliquez sur "Modifier"

### Supprimer une collecte

1. Dans la liste des collectes, cliquez sur "Supprimer"
2. Confirmez la suppression dans la boîte de dialogue

### Suivre les statuts

- **Planifiée** : Collecte programmée mais pas encore commencée
- **En cours** : Collecte actuellement en cours d'exécution
- **Terminée** : Collecte achevée avec succès
- **Annulée** : Collecte annulée

## Interface utilisateur

### Design responsive
- **Desktop** : Vue complète avec tableau détaillé
- **Mobile** : Interface adaptée avec cartes et modales

### Couleurs des statuts
- **Planifiée** : Bleu
- **En cours** : Jaune
- **Terminée** : Vert
- **Annulée** : Rouge

### Navigation
- **En-tête** : Titre et bouton d'ajout rapide
- **Statistiques** : Cartes avec métriques en temps réel
- **Liste** : Tableau avec actions et filtres visuels

## Sécurité

### Politiques RLS (Row Level Security)
- Lecture : Utilisateurs authentifiés uniquement
- Écriture : Utilisateurs authentifiés uniquement
- Suppression : Utilisateurs authentifiés uniquement

### Validation des données
- Contraintes au niveau de la base de données
- Validation côté client avec TypeScript
- Gestion des erreurs avec try/catch

## Développement

### Technologies utilisées
- **Next.js 15** : Framework React
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling
- **Supabase** : Base de données et authentification

### Structure du code
- **Interface Collecte** : Définition TypeScript des types
- **Hooks React** : useState, useEffect pour la gestion d'état
- **Fonctions CRUD** : Create, Read, Update, Delete avec Supabase
- **Composants UI** : Modales, tableaux, formulaires

### Améliorations possibles
- Filtres par date, zone, type de déchet
- Export des données en CSV/PDF
- Notifications pour les collectes à venir
- Calendrier visuel des collectes
- Géolocalisation des zones
- Photos des collectes
- Historique des modifications 