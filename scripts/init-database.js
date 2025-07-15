const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  console.log('📝 Assurez-vous que votre fichier .env.local contient :');
  console.log('NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function initDatabase() {
  try {
    console.log('🔍 Vérification de la connexion Supabase...');
    
    // Test de connexion
    const { data, error } = await supabase
      .from('collectes')
      .select('count')
      .limit(1);

    if (error && error.code === '42P01') {
      // Table n'existe pas, on la crée
      console.log('📋 Table "collectes" non trouvée, création en cours...');
      
      // Créer la table avec SQL
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
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
          
          -- Créer les index
          CREATE INDEX IF NOT EXISTS idx_collectes_date_collecte ON collectes(date_collecte);
          CREATE INDEX IF NOT EXISTS idx_collectes_statut ON collectes(statut);
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
          DROP TRIGGER IF EXISTS update_collectes_updated_at ON collectes;
          CREATE TRIGGER update_collectes_updated_at 
              BEFORE UPDATE ON collectes 
              FOR EACH ROW 
              EXECUTE FUNCTION update_updated_at_column();
        `
      });

      if (createError) {
        console.error('❌ Erreur lors de la création de la table:', createError);
        console.log('💡 Vous devez exécuter le script SQL manuellement dans l\'éditeur SQL de Supabase');
        console.log('📄 Voir le fichier setup-collectes.sql');
        return;
      }

      console.log('✅ Table "collectes" créée avec succès !');
    } else if (error) {
      console.error('❌ Erreur de connexion:', error);
      return;
    } else {
      console.log('✅ Table "collectes" existe déjà');
    }

    // Test d'insertion d'une donnée d'exemple
    console.log('🧪 Test d\'insertion d\'une collecte d\'exemple...');
    const testCollecte = {
      date_collecte: new Date().toISOString(),
      type_dechet: 'ordures_ménagères',
      zone: 'Zone Test',
      statut: 'planifiée',
      notes: 'Collecte de test'
    };

    const { error: insertError } = await supabase
      .from('collectes')
      .insert([testCollecte]);

    if (insertError) {
      console.error('❌ Erreur lors du test d\'insertion:', insertError);
    } else {
      console.log('✅ Test d\'insertion réussi !');
      
      // Supprimer la donnée de test
      await supabase
        .from('collectes')
        .delete()
        .eq('zone', 'Zone Test');
    }

    console.log('🎉 Base de données initialisée avec succès !');
    console.log('🚀 Vous pouvez maintenant utiliser l\'application');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
}

initDatabase(); 