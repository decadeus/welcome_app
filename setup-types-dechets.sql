-- Script de configuration des types de déchets pour Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase

-- Création de la table types_dechets
CREATE TABLE IF NOT EXISTS types_dechets (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL UNIQUE,
  couleur TEXT NOT NULL DEFAULT 'bg-gray-500',
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion des types de déchets par défaut
INSERT INTO types_dechets (nom, couleur) VALUES
  ('ordures_ménagères', 'bg-red-500'),
  ('recyclage', 'bg-blue-500'),
  ('verre', 'bg-green-500'),
  ('déchets_verts', 'bg-emerald-500'),
  ('encombrants', 'bg-purple-500')
ON CONFLICT (nom) DO NOTHING;

-- Vérifier si la colonne type_dechet_id existe dans collectes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'collectes' 
        AND column_name = 'type_dechet_id'
    ) THEN
        ALTER TABLE collectes ADD COLUMN type_dechet_id INTEGER;
    END IF;
END $$;

-- Supprimer l'ancienne colonne type_dechet si elle existe
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'collectes' 
        AND column_name = 'type_dechet'
    ) THEN
        -- Mise à jour des collectes existantes pour utiliser les IDs
        UPDATE collectes 
        SET type_dechet_id = td.id 
        FROM types_dechets td 
        WHERE collectes.type_dechet = td.nom;
        
        -- Suppression de l'ancienne colonne
        ALTER TABLE collectes DROP COLUMN type_dechet;
    END IF;
END $$;

-- Ajout de la contrainte de clé étrangère (avec vérification)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_collectes_type_dechet'
        AND table_name = 'collectes'
    ) THEN
        ALTER TABLE collectes 
        ADD CONSTRAINT fk_collectes_type_dechet 
        FOREIGN KEY (type_dechet_id) REFERENCES types_dechets(id);
    END IF;
END $$;

-- Création d'un index sur la clé étrangère
CREATE INDEX IF NOT EXISTS idx_collectes_type_dechet_id ON collectes(type_dechet_id);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_types_dechets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at (avec vérification)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.triggers 
        WHERE trigger_name = 'update_types_dechets_updated_at'
        AND event_object_table = 'types_dechets'
    ) THEN
        CREATE TRIGGER update_types_dechets_updated_at 
            BEFORE UPDATE ON types_dechets 
            FOR EACH ROW 
            EXECUTE FUNCTION update_types_dechets_updated_at();
    END IF;
END $$;

-- Politiques RLS pour types_dechets
ALTER TABLE types_dechets ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Permettre la lecture des types de déchets" ON types_dechets;
DROP POLICY IF EXISTS "Permettre l'insertion des types de déchets" ON types_dechets;
DROP POLICY IF EXISTS "Permettre la mise à jour des types de déchets" ON types_dechets;
DROP POLICY IF EXISTS "Permettre la suppression des types de déchets" ON types_dechets;

-- Recréer les politiques
CREATE POLICY "Permettre la lecture des types de déchets" ON types_dechets
  FOR SELECT USING (true);

CREATE POLICY "Permettre l'insertion des types de déchets" ON types_dechets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permettre la mise à jour des types de déchets" ON types_dechets
  FOR UPDATE USING (true);

CREATE POLICY "Permettre la suppression des types de déchets" ON types_dechets
  FOR DELETE USING (true);

-- Affichage des informations de vérification
SELECT 'Configuration terminée! Voici les types de déchets disponibles:' as message;
SELECT id, nom, couleur, actif FROM types_dechets ORDER BY nom; 