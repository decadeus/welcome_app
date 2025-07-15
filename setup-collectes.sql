-- Script de configuration de la table collectes pour Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase

-- Création de la table collectes
CREATE TABLE IF NOT EXISTS collectes (
  id BIGSERIAL PRIMARY KEY,
  date_collecte TIMESTAMP WITH TIME ZONE NOT NULL,
  type_dechet TEXT NOT NULL CHECK (type_dechet IN ('ordures_ménagères', 'recyclage', 'verre', 'déchets_verts', 'encombrants')),
  zone TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'planifiée' CHECK (statut IN ('planifiée', 'en_cours', 'terminée', 'annulée')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création d'un index sur la date de collecte pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_collectes_date_collecte ON collectes(date_collecte);

-- Création d'un index sur le statut
CREATE INDEX IF NOT EXISTS idx_collectes_statut ON collectes(statut);

-- Création d'un index sur la zone
CREATE INDEX IF NOT EXISTS idx_collectes_zone ON collectes(zone);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_collectes_updated_at 
    BEFORE UPDATE ON collectes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Données d'exemple (optionnel)
INSERT INTO collectes (date_collecte, type_dechet, zone, statut, notes) VALUES
  (NOW() + INTERVAL '1 day', 'ordures_ménagères', 'Zone A - Centre Ville', 'planifiée', 'Collecte matinale'),
  (NOW() + INTERVAL '2 days', 'recyclage', 'Zone B - Quartier Nord', 'planifiée', 'Collecte des bacs jaunes'),
  (NOW() + INTERVAL '3 days', 'verre', 'Zone C - Quartier Sud', 'planifiée', 'Collecte des conteneurs verre'),
  (NOW() - INTERVAL '1 day', 'déchets_verts', 'Zone A - Centre Ville', 'terminée', 'Collecte effectuée avec succès'),
  (NOW() - INTERVAL '2 days', 'encombrants', 'Zone B - Quartier Nord', 'terminée', 'Collecte des gros objets');

-- Politique RLS (Row Level Security) - Activer RLS
ALTER TABLE collectes ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous les utilisateurs authentifiés
CREATE POLICY "Permettre la lecture des collectes" ON collectes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Politique pour permettre l'insertion aux utilisateurs authentifiés
CREATE POLICY "Permettre l'insertion des collectes" ON collectes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "Permettre la mise à jour des collectes" ON collectes
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression aux utilisateurs authentifiés
CREATE POLICY "Permettre la suppression des collectes" ON collectes
  FOR DELETE USING (auth.role() = 'authenticated'); 