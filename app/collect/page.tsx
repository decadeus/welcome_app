'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import React from 'react'; // Added for React.useRef

interface Collecte {
  id: number;
  date_collecte: string;
  type_dechet_id: number;
  zone: string;
  statut: 'planifiée' | 'en_cours' | 'terminée' | 'annulée';
  notes?: string;
  created_at: string;
}

interface TypeDechet {
  id: number;
  nom: string;
  couleur: string;
  actif: boolean;
  created_at: string;
  updated_at: string;
}

interface CollecteCell {
  collecte: Collecte;
  isToday: boolean;
}

export default function CollectPage() {
  const [collectes, setCollectes] = useState<Collecte[]>([]);
  const [typesDechets, setTypesDechets] = useState<TypeDechet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [editingType, setEditingType] = useState<number | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>('');
  const [editingColor, setEditingColor] = useState<string>('bg-gray-500');
  const COLORS = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-gray-500',
  ];

  // Jours de la semaine
  const joursSemaine = [
    { id: 'lundi', label: 'Lundi', short: 'Lun' },
    { id: 'mardi', label: 'Mardi', short: 'Mar' },
    { id: 'mercredi', label: 'Mercredi', short: 'Mer' },
    { id: 'jeudi', label: 'Jeudi', short: 'Jeu' },
    { id: 'vendredi', label: 'Vendredi', short: 'Ven' },
    { id: 'samedi', label: 'Samedi', short: 'Sam' },
    { id: 'dimanche', label: 'Dimanche', short: 'Dim' }
  ];

  // Load collectes and types on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      console.log('🔄 Chargement des données...');
      
      // Charger les types de déchets
      const { data: typesData, error: typesError } = await supabase
        .from('types_dechets')
        .select('*')
        .eq('actif', true)
        .order('nom');

      if (typesError) {
        console.error('❌ Erreur lors du chargement des types:', typesError);
        console.error('❌ Détails de l\'erreur:', {
          code: typesError.code,
          message: typesError.message,
          details: typesError.details,
          hint: typesError.hint
        });
        return;
      }

      console.log('✅ Types de déchets chargés:', typesData);
      setTypesDechets(typesData || []);

      // Charger les collectes
      const { data: collectesData, error: collectesError } = await supabase
        .from('collectes')
        .select('*')
        .order('date_collecte', { ascending: true });

      if (collectesError) {
        if (collectesError.code === '42P01') {
          console.error('❌ Table "collectes" non trouvée. Exécutez: npm run init-db');
        } else {
          console.error('❌ Erreur lors du chargement des collectes:', collectesError);
        }
        return;
      }
      
      console.log('✅ Collectes chargées:', collectesData);
      setCollectes(collectesData || []);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (jourSemaine: string, typeId: number) => {
    if (!isSelecting) {
      // Mode sélection : sélectionner le jour et le type
      setSelectedDay(jourSemaine);
      setSelectedType(typeId);
      setIsSelecting(true);
    } else {
      // Mode création : créer la collecte
      createCollecte(jourSemaine, typeId);
      setIsSelecting(false);
      setSelectedDay('');
      setSelectedType(null);
    }
  };

  const createCollecte = async (jourSemaine: string, typeId: number) => {
    try {
      // Calculer la prochaine date pour ce jour de la semaine
      const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      const jourIndex = jours.indexOf(jourSemaine);
      const today = new Date();
      const daysUntilNext = (jourIndex - today.getDay() + 7) % 7;
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysUntilNext);
      const dateStr = `${nextDate.toISOString().split('T')[0]}T08:00`;

      // Vérifier si une collecte existe déjà pour ce type et ce jour
      const existe = collectes.some(collecte => {
        const collecteDate = new Date(collecte.date_collecte);
        const jourCollecte = collecteDate.getDay();
        return jourCollecte === jourIndex && collecte.type_dechet_id === typeId;
      });
      if (existe) {
        alert('Une collecte existe déjà pour ce type et ce jour.');
        return;
      }

      const newCollecte = {
        date_collecte: dateStr,
        type_dechet_id: typeId,
        zone: 'Zone par défaut',
        statut: 'planifiée' as const,
        notes: ''
      };

      console.log('🆕 Création de collecte:', newCollecte);

      const { error } = await supabase
        .from('collectes')
        .insert([newCollecte]);

      if (error) {
        if (error.code === '42P01') {
          console.error('❌ Table "collectes" non trouvée. Exécutez: npm run init-db');
        } else {
          console.error('Erreur lors de la création:', error);
        }
        return;
      }
      loadData();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette collecte ?')) return;

    try {
      const { error } = await supabase
        .from('collectes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'planifiée': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'terminée': return 'bg-green-100 text-green-800';
      case 'annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCollectesForCell = (jourSemaine: string, typeId: number): Collecte[] => {
    return collectes.filter(collecte => {
      const collecteDate = new Date(collecte.date_collecte);
      const jourCollecte = collecteDate.getDay(); // 0 = dimanche, 1 = lundi, etc.
      
      // Convertir le jour de la semaine en nom français
      const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      const jourCollecteStr = jours[jourCollecte];
      
      return jourCollecteStr === jourSemaine && collecte.type_dechet_id === typeId;
    });
  };

  const getCurrentDay = () => {
    const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    return jours[new Date().getDay()];
  };

  const isCellSelected = (jourSemaine: string, typeId: number) => {
    return selectedDay === jourSemaine && selectedType === typeId;
  };

  const getTypeColor = (typeId: number) => {
    const type = typesDechets.find(t => t.id === typeId);
    return type ? type.couleur : 'bg-gray-500';
  };

  // Gestion des types de déchets
  const handleEditType = (typeId: number) => {
    const type = typesDechets.find(t => t.id === typeId);
    if (type) {
      setEditingType(typeId);
      setEditingLabel(type.nom);
      setEditingColor(type.couleur || 'bg-gray-500');
    }
  };

  const handleSaveType = async (typeId: number) => {
    try {
      const oldType = typesDechets.find(t => t.id === typeId);
      if (!oldType) {
        console.error('❌ Type non trouvé:', typeId);
        return;
      }

      console.log('🔄 Mise à jour du type:', { 
        oldNom: oldType.nom, 
        newNom: editingLabel, 
        typeId,
        editingColor,
        typesDechets: typesDechets.map(t => ({ id: t.id, nom: t.nom }))
      });

      // Mettre à jour le type dans la base de données
      const { data, error } = await supabase
        .from('types_dechets')
        .update({ nom: editingLabel, couleur: editingColor })
        .eq('id', typeId)
        .select();

      if (error) {
        console.error('❌ Erreur lors de la mise à jour du type:', error);
        console.error('❌ Détails de l\'erreur:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return;
      }

      console.log('✅ Mise à jour réussie:', data);
      setEditingType(null);
      setEditingLabel('');
      setEditingColor('bg-gray-500');
      
      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingType(null);
    setEditingLabel('');
    setEditingColor('bg-gray-500');
  };

  const handleDeleteType = async (typeId: number) => {
    const collectesForType = collectes.filter(c => c.type_dechet_id === typeId);
    if (collectesForType.length > 0) {
      if (!confirm(`Ce type a ${collectesForType.length} collecte(s) associée(s). Voulez-vous TOUT supprimer ?`)) {
        return;
      }
      try {
        const { error: delCollectesError } = await supabase
          .from('collectes')
          .delete()
          .eq('type_dechet_id', typeId);
        if (delCollectesError) {
          console.error('Erreur lors de la suppression des collectes associées:', delCollectesError);
          alert('Erreur lors de la suppression des collectes associées: ' + (delCollectesError && typeof delCollectesError === 'object' && 'message' in delCollectesError ? delCollectesError.message : JSON.stringify(delCollectesError)));
          return;
        }
        const { error: delTypeError } = await supabase
          .from('types_dechets')
          .update({ actif: false })
          .eq('id', typeId);
        if (delTypeError) {
          console.error('Erreur lors de la suppression du type:', delTypeError);
          alert('Erreur lors de la suppression du type: ' + (delTypeError && typeof delTypeError === 'object' && 'message' in delTypeError ? delTypeError.message : JSON.stringify(delTypeError)));
          return;
        }
        await loadData();
      } catch (error) {
        console.error('Erreur lors de la suppression en cascade:', error);
        alert('Erreur lors de la suppression en cascade: ' + (error && typeof error === 'object' && 'message' in error ? error.message : JSON.stringify(error)));
      }
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce type de collecte ?')) {
      try {
        const { error } = await supabase
          .from('types_dechets')
          .update({ actif: false })
          .eq('id', typeId);
        if (error) {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression: ' + (error && typeof error === 'object' && 'message' in error ? error.message : JSON.stringify(error)));
          return;
        }
        await loadData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression: ' + (error && typeof error === 'object' && 'message' in error ? error.message : JSON.stringify(error)));
      }
    }
  };

  const handleAddType = async () => {
    if (typesDechets.length >= 7) {
      alert('Vous ne pouvez pas ajouter plus de 7 types de collecte.');
      return;
    }
    // Générer un nom unique
    let baseName = 'Nouveau Type';
    let newName = baseName;
    let i = 2;
    const existingNames = typesDechets.map(t => t.nom);
    while (existingNames.includes(newName)) {
      newName = `${baseName} ${i}`;
      i++;
    }
    try {
      const { data, error } = await supabase
        .from('types_dechets')
        .insert([{ nom: newName, couleur: editingColor }])
        .select();
      if (error) {
        console.error('Erreur lors de l\'ajout:', error, JSON.stringify(error, null, 2));
        alert('Erreur lors de l\'ajout: ' + (error?.message || JSON.stringify(error)));
        return;
      }
      if (data && data[0]) {
        setEditingType(data[0].id);
        setEditingLabel(newName);
        setEditingColor(data[0].couleur || 'bg-gray-500');
      }
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  // Mini-éditeur custom pour infos exceptionnelles (version multi-zones)
  function SpecialInfoEditors() {
    const ZONES = [
      'Collectes exceptionnelles / Infos spéciales 1',
      'Collectes exceptionnelles / Infos spéciales 2',
      'Collectes exceptionnelles / Infos spéciales 3',
    ];
    const [values, setValues] = React.useState(['', '', '']);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const editorsRef = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)];
    const MAX_LENGTH = 300;

    // Charger depuis Supabase au montage
    React.useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('infos_speciales')
          .select('zone1, zone2, zone3')
          .limit(1)
          .single();
        if (data) {
          setValues([data.zone1 || '', data.zone2 || '', data.zone3 || '']);
          // Met à jour le DOM natif pour chaque éditeur
          editorsRef.forEach((ref, i) => {
            if (ref.current) ref.current.innerHTML = (data as any)[`zone${i+1}`] || '';
          });
        }
        setLoading(false);
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Commande de formatage
    const format = (cmd: 'bold' | 'italic' | 'underline', idx: number) => {
      document.execCommand(cmd, false, undefined);
      editorsRef[idx].current?.focus();
    };

    // Gestion de la saisie et limitation
    const handleInput = (e: React.FormEvent<HTMLDivElement>, idx: number) => {
      let html = e.currentTarget.innerHTML;
      if (html.length > MAX_LENGTH) {
        html = html.slice(0, MAX_LENGTH);
        e.currentTarget.innerHTML = html;
      }
      setValues(vals => {
        const newVals = [...vals];
        newVals[idx] = html;
        return newVals;
      });
    };

    // Sauvegarde dans Supabase
    const handleSave = async () => {
      setLoading(true);
      setSuccess(false);
      const { error } = await supabase
        .from('infos_speciales')
        .update({ zone1: values[0], zone2: values[1], zone3: values[2], updated_at: new Date().toISOString() })
        .eq('id', 1);
      setLoading(false);
      if (!error) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert('Erreur lors de la sauvegarde : ' + (error.message || JSON.stringify(error)));
      }
    };

    return (
      <div className="mt-8 flex flex-col gap-6">
        {ZONES.map((label, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <div className="mb-2 flex gap-2">
              <button
                type="button"
                className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
                onClick={() => format('bold', idx)}
              >
                B
              </button>
              <button
                type="button"
                className="px-2 py-1 border rounded hover:bg-gray-100 italic"
                onClick={() => format('italic', idx)}
              >
                I
              </button>
              <button
                type="button"
                className="px-2 py-1 border rounded hover:bg-gray-100 underline"
                onClick={() => format('underline', idx)}
              >
                U
              </button>
            </div>
            <div
              ref={editorsRef[idx]}
              contentEditable
              suppressContentEditableWarning
              className="w-full min-h-[80px] border border-gray-300 rounded p-2 text-sm focus:outline-none flex-1"
              style={{ whiteSpace: 'pre-wrap' }}
              onInput={e => handleInput(e, idx)}
            ></div>
            <div className="text-right text-xs text-gray-500 mt-1">
              {values[idx].length}/{MAX_LENGTH} caractères
            </div>
          </div>
        ))}
        <button
          className="self-end mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {success && <div className="text-green-600 text-right">Enregistré !</div>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Planning Hebdomadaire des Collectes
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isSelecting && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Sélectionné :</span>
                  <span className="font-medium">{joursSemaine.find(j => j.id === selectedDay)?.label}</span>
                  <span>-</span>
                  <span className="font-medium">{typesDechets.find(t => t.id === selectedType)?.nom}</span>
                  <button
                    onClick={() => {
                      setIsSelecting(false);
                      setSelectedDay('');
                      setSelectedType(null);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Weekly Schedule Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Planning Hebdomadaire Récurrent
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Cliquez sur un cercle vide pour créer une collecte
                    </p>
                  </div>
                  <button
                    onClick={handleAddType}
                    disabled={typesDechets.length >= 7}
                    className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    + Ajouter un type
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Chargement...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type de Collecte
                        </th>
                        {joursSemaine.map((jour) => (
                          <th key={jour.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="text-center">
                              <div className="font-semibold">
                                {jour.short}
                              </div>
                              {/* Nom complet supprimé ici */}
                              {jour.id === getCurrentDay() && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {typesDechets.map((type) => (
                        <tr key={type.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full ${type.couleur}`}></div>
                              {editingType === type.id ? (
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="text"
                                      value={editingLabel}
                                      onChange={(e) => setEditingLabel(e.target.value)}
                                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => handleSaveType(type.id)}
                                      className="text-green-600 hover:text-green-800 text-lg px-2 py-1"
                                    >
                                      ✓
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="text-red-600 hover:text-red-800 text-lg px-2 py-1"
                                    >
                                      ✗
                                    </button>
                                  </div>
                                  {/* Palette de couleurs */}
                                  <div className="flex items-center space-x-2 mt-1">
                                    {COLORS.map((color) => (
                                      <button
                                        key={color}
                                        type="button"
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center focus:outline-none transition-all ${color} ${editingColor === color ? 'ring-2 ring-black border-black' : 'border-gray-300'}`}
                                        onClick={() => setEditingColor(color)}
                                        aria-label={`Choisir la couleur ${color}`}
                                      >
                                        {editingColor === color && (
                                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <span 
                                    className="cursor-pointer hover:text-blue-600"
                                    onClick={() => handleEditType(type.id)}
                                  >
                                    {type.nom}
                                  </span>
                                  <div className="flex space-x-1">
                                    <button
                                      onClick={() => handleEditType(type.id)}
                                      className="text-blue-600 hover:text-blue-800 text-lg px-2 py-1"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleDeleteType(type.id)}
                                      className="text-red-600 hover:text-red-800 text-lg px-2 py-1"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          {joursSemaine.map((jour) => {
                            const collectes = getCollectesForCell(jour.id, type.id);
                            const isToday = jour.id === getCurrentDay();
                            const isSelected = isCellSelected(jour.id, type.id);
                            
                            return (
                              <td 
                                key={jour.id} 
                                className={`px-6 py-4 border-b border-gray-200 min-h-[120px] ${isToday ? 'bg-blue-50' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                              >
                                <div 
                                  className="h-full min-h-[100px] cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors relative"
                                  onClick={() => handleCellClick(jour.id, type.id)}
                                >
                                  {collectes.map((collecte) => (
                                    <div 
                                      key={collecte.id}
                                      className="flex justify-center items-center h-16 relative"
                                    >
                                      <div className={`w-8 h-8 rounded-full ${getTypeColor(collecte.type_dechet_id)} flex items-center justify-center shadow-lg`}>
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDelete(collecte.id);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                  {collectes.length === 0 && (
                                    <div className="flex justify-center items-center h-16">
                                      <div className="w-8 h-8 border-2 border-gray-300 rounded-full hover:border-gray-400 transition-colors"></div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Bloc infos collectes exceptionnelles */}
          <SpecialInfoEditors />
        </div>
      </main>
    </div>
  );
} 