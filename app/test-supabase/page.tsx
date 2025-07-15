'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabasePage() {
  const [status, setStatus] = useState<string>('Vérification...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      // Test de connexion basique
      const { data, error } = await supabase.from('test').select('*').limit(1);
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Table n'existe pas, mais la connexion fonctionne
          setStatus('✅ Connexion Supabase réussie !');
          setError('Note: La table "test" n\'existe pas, mais la connexion fonctionne.');
        } else {
          setStatus('❌ Erreur de connexion');
          setError(error.message);
        }
      } else {
        setStatus('✅ Connexion Supabase réussie !');
        setError(null);
      }
    } catch (err) {
      setStatus('❌ Erreur de configuration');
      setError('Vérifiez vos variables d\'environnement dans .env.local');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Test Supabase
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Test de Connexion Supabase
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Statut de la connexion</h4>
                      <p className="text-sm text-gray-500">{status}</p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Information</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Configuration requise</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>1. Créez un projet sur <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">Supabase</a></p>
                        <p>2. Copiez <code className="bg-blue-100 px-1 rounded">env.example</code> vers <code className="bg-blue-100 px-1 rounded">.env.local</code></p>
                        <p>3. Ajoutez vos clés Supabase dans <code className="bg-blue-100 px-1 rounded">.env.local</code></p>
                        <p>4. Redémarrez le serveur avec <code className="bg-blue-100 px-1 rounded">npm run dev</code></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 