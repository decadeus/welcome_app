export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Météo & Conditions
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700">
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Weather Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Température
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        22°C
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Humidité
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        65%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Vent
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        15 km/h
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Current Weather */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Conditions Actuelles
                </h3>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">22°C</div>
                  <div className="text-lg text-gray-600 mb-4">Ensoleillé</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Humidité:</span>
                      <span className="ml-2 text-gray-900">65%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Vent:</span>
                      <span className="ml-2 text-gray-900">15 km/h</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Pression:</span>
                      <span className="ml-2 text-gray-900">1013 hPa</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Visibilité:</span>
                      <span className="ml-2 text-gray-900">10 km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Prévisions
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">Aujourd'hui</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">22°C</div>
                      <div className="text-xs text-gray-500">Ensoleillé</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">Demain</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">19°C</div>
                      <div className="text-xs text-gray-500">Nuageux</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">Après-demain</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">24°C</div>
                      <div className="text-xs text-gray-500">Pluie</div>
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