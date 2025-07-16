'use client';

import { useState } from 'react';

export default function PackagesPage() {
  const [packages, setPackages] = useState<{ value: string; date: string }[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const MAX_LENGTH = 5;

  const handleAddClick = () => {
    setShowInput(true);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setInputValue(e.target.value);
    }
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setInputValue('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const today = new Date();
      const dateStr = today.toLocaleDateString('fr-FR'); // format JJ/MM/AAAA
      setPackages([{ value: inputValue.trim(), date: dateStr }, ...packages]);
      setShowInput(false);
      setInputValue('');
    } else if (e.key === 'Escape') {
      setShowInput(false);
      setInputValue('');
    }
  };

  const handleDelete = (idx: number) => {
    setPackages(packages.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Packages</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Packages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {/* Carré compteur */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 border-2 border-gray-400 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700">
                  {packages.length}
                </div>
                <span className="mt-2 text-xs text-gray-500">Total</span>
              </div>
              {/* Carré d'ajout */}
              <div className="flex flex-col items-center">
                {showInput ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    maxLength={MAX_LENGTH}
                    autoFocus
                    className="w-20 h-20 border-2 border-blue-400 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="..."
                  />
                ) : (
                  <button
                    onClick={handleAddClick}
                    className="w-20 h-20 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center text-4xl text-blue-500 hover:bg-blue-50 transition"
                    aria-label="Ajouter un package"
                  >
                    +
                  </button>
                )}
                <span className="mt-2 text-xs text-gray-500">Ajouter</span>
              </div>
              {/* Carrés packages */}
              {packages.map((pkg, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-100 border-2 border-blue-400 rounded-lg flex flex-col items-center justify-center text-2xl font-bold text-blue-800">
                    <span>{pkg.value}</span>
                    <span className="text-xs text-blue-600 font-normal mt-1">{pkg.date}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow hover:bg-red-600"
                    aria-label="Supprimer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {packages.length === 0 && (
              <div className="text-center text-gray-400 mt-8">Aucun package. Cliquez sur + pour ajouter.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 