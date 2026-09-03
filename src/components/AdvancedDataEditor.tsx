import React, { useState, useMemo } from 'react';
import { DrugFoodInteraction, TherapeuticDuplication, SeverityLevel } from '../types';
import { 
  Utensils, 
  Copy, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  X, 
  Sparkles,
  Info,
  Layers,
  BookOpen
} from 'lucide-react';

interface AdvancedDataEditorProps {
  foodInteractions: DrugFoodInteraction[];
  duplicationRules: TherapeuticDuplication[];
  onSaveFoodInteraction: (dfi: DrugFoodInteraction) => Promise<void>;
  onDeleteFoodInteraction: (id: string) => Promise<void>;
  onSaveDuplicationRule: (rule: TherapeuticDuplication) => Promise<void>;
  onDeleteDuplicationRule: (id: string) => Promise<void>;
}

export const AdvancedDataEditor: React.FC<AdvancedDataEditorProps> = ({
  foodInteractions,
  duplicationRules,
  onSaveFoodInteraction,
  onDeleteFoodInteraction,
  onSaveDuplicationRule,
  onDeleteDuplicationRule
}) => {
  const [activeTab, setActiveTab] = useState<'dfi' | 'duplications'>('dfi');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('Semua');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // DFI Modal State
  const [showDfiModal, setShowDfiModal] = useState(false);
  const [editingDfi, setEditingDfi] = useState<DrugFoodInteraction | null>(null);
  const [dfiForm, setDfiForm] = useState<{
    drugName: string;
    foodName: string;
    foodCategory: DrugFoodInteraction['foodCategory'];
    severity: SeverityLevel;
    mechanism: string;
    clinicalOutcome: string;
    recommendation: string;
  }>({
    drugName: '',
    foodName: '',
    foodCategory: 'Buah / Juice',
    severity: 'Major',
    mechanism: '',
    clinicalOutcome: '',
    recommendation: ''
  });

  // Duplication Modal State
  const [showDupModal, setShowDupModal] = useState(false);
  const [editingDup, setEditingDup] = useState<TherapeuticDuplication | null>(null);
  const [dupForm, setDupForm] = useState({
    drugAName: '',
    drugBName: '',
    therapeuticClass: '',
    riskDescription: '',
    recommendation: ''
  });

  // Filtered DFI List
  const filteredDfi = useMemo(() => {
    return foodInteractions.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.drugName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mechanism.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = severityFilter === 'Semua' || item.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [foodInteractions, searchQuery, severityFilter]);

  // Filtered Duplication List
  const filteredDup = useMemo(() => {
    return duplicationRules.filter(item => {
      return searchQuery === '' || 
        item.drugAName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.drugBName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.therapeuticClass.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [duplicationRules, searchQuery]);

  // DFI Handlers
  const handleOpenNewDfi = () => {
    setEditingDfi(null);
    setDfiForm({
      drugName: '',
      foodName: '',
      foodCategory: 'Buah / Juice',
      severity: 'Major',
      mechanism: '',
      clinicalOutcome: '',
      recommendation: ''
    });
    setShowDfiModal(true);
  };

  const handleOpenEditDfi = (dfi: DrugFoodInteraction) => {
    setEditingDfi(dfi);
    setDfiForm({
      drugName: dfi.drugName,
      foodName: dfi.foodName,
      foodCategory: dfi.foodCategory,
      severity: dfi.severity,
      mechanism: dfi.mechanism,
      clinicalOutcome: dfi.clinicalOutcome,
      recommendation: dfi.recommendation
    });
    setShowDfiModal(true);
  };

  const handleSaveDfiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dfiForm.drugName || !dfiForm.foodName) return;

    setLoading(true);
    try {
      const obj: DrugFoodInteraction = {
        id: editingDfi ? editingDfi.id : 'dfi-' + Date.now(),
        drugName: dfiForm.drugName.trim(),
        foodName: dfiForm.foodName.trim(),
        foodCategory: dfiForm.foodCategory,
        severity: dfiForm.severity,
        mechanism: dfiForm.mechanism.trim(),
        clinicalOutcome: dfiForm.clinicalOutcome.trim(),
        recommendation: dfiForm.recommendation.trim()
      };

      await onSaveFoodInteraction(obj);
      setMessage(`Interaksi Obat-Makanan "${obj.drugName} ⚡ ${obj.foodName}" berhasil disimpan!`);
      setShowDfiModal(false);
    } catch (err) {
      setMessage('Gagal menyimpan interaksi obat-makanan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDfiClick = async (id: string) => {
    if (confirm('Yakin ingin menghapus rekor interaksi obat-makanan ini?')) {
      setLoading(true);
      try {
        await onDeleteFoodInteraction(id);
        setMessage('Interaksi obat-makanan berhasil dihapus.');
      } catch (err) {
        setMessage('Gagal menghapus rekor.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Duplication Handlers
  const handleOpenNewDup = () => {
    setEditingDup(null);
    setDupForm({
      drugAName: '',
      drugBName: '',
      therapeuticClass: '',
      riskDescription: '',
      recommendation: ''
    });
    setShowDupModal(true);
  };

  const handleOpenEditDup = (dup: TherapeuticDuplication) => {
    setEditingDup(dup);
    setDupForm({
      drugAName: dup.drugAName,
      drugBName: dup.drugBName,
      therapeuticClass: dup.therapeuticClass,
      riskDescription: dup.riskDescription,
      recommendation: dup.recommendation
    });
    setShowDupModal(true);
  };

  const handleSaveDupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dupForm.drugAName || !dupForm.therapeuticClass) return;

    setLoading(true);
    try {
      const obj: TherapeuticDuplication = {
        id: editingDup ? editingDup.id : 'dup-' + Date.now(),
        drugAName: dupForm.drugAName.trim(),
        drugBName: dupForm.drugBName.trim(),
        therapeuticClass: dupForm.therapeuticClass.trim(),
        riskDescription: dupForm.riskDescription.trim(),
        recommendation: dupForm.recommendation.trim()
      };

      await onSaveDuplicationRule(obj);
      setMessage(`Aturan duplikasi terapi "${obj.therapeuticClass}" berhasil disimpan!`);
      setShowDupModal(false);
    } catch (err) {
      setMessage('Gagal menyimpan aturan duplikasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDupClick = async (id: string) => {
    if (confirm('Yakin ingin menghapus aturan duplikasi terapi ini?')) {
      setLoading(true);
      try {
        await onDeleteDuplicationRule(id);
        setMessage('Aturan duplikasi terapi berhasil dihapus.');
      } catch (err) {
        setMessage('Gagal menghapus aturan.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Editor Komprehensif Aturan Klinis Lanjutan</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Editor Interaksi Makanan & Duplikasi Terapi
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Kelola database Interaksi Obat-Makanan (DFI) dan Aturan Duplikasi Terapi secara mandiri. Data ini akan langsung digunakan oleh mesin analisis resep klinis.
          </p>
        </div>

        <button
          onClick={activeTab === 'dfi' ? handleOpenNewDfi : handleOpenNewDup}
          className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 border border-teal-500/40"
        >
          <Plus className="w-5 h-5" />
          <span>{activeTab === 'dfi' ? 'Tambah Interaksi Makanan' : 'Tambah Duplikasi Terapi'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-teal-50 text-teal-800 border border-teal-200 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage('')} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('dfi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'dfi'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Interaksi Obat - Makanan ({foodInteractions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('duplications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'duplications'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Copy className="w-4 h-4" />
          <span>Aturan Duplikasi Terapi ({duplicationRules.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'dfi' ? "Cari nama obat atau jenis makanan..." : "Cari obat atau golongan kelas terapi..."}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {activeTab === 'dfi' && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">Keparahan:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs px-3 py-1.5 font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="Semua">Semua Keparahan</option>
              <option value="Major">Major</option>
              <option value="Moderate">Moderate</option>
              <option value="Minor">Minor</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: INTERAKSI OBAT-MAKANAN (DFI) */}
      {activeTab === 'dfi' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Obat ⚡ Makanan/Minuman</th>
                  <th className="py-3.5 px-4">Keparahan & Kategori</th>
                  <th className="py-3.5 px-4">Mekanisme Enzim / Toksisitas</th>
                  <th className="py-3.5 px-4">Rekomendasi Konseling</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDfi.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      Tidak ada rekor interaksi obat-makanan yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredDfi.map((dfi) => (
                    <tr key={dfi.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{dfi.drugName}</p>
                        <p className="text-[11px] text-teal-700 font-semibold mt-0.5">⚡ {dfi.foodName}</p>
                      </td>
                      <td className="py-3.5 px-4 space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          dfi.severity === 'Major' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {dfi.severity}
                        </span>
                        <p className="text-[10px] text-slate-500 font-medium">{dfi.foodCategory}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs leading-relaxed">
                        <p className="font-semibold text-slate-800">{dfi.mechanism}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{dfi.clinicalOutcome}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs leading-relaxed font-medium">
                        {dfi.recommendation}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditDfi(dfi)}
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center"
                          title="Edit DFI"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDfiClick(dfi.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                          title="Hapus DFI"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ATURAN DUPLIKASI TERAPI */}
      {activeTab === 'duplications' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Golongan Kelas Terapi</th>
                  <th className="py-3.5 px-4">Contoh Obat Duplikasi</th>
                  <th className="py-3.5 px-4">Risiko Toksisitas Ganda</th>
                  <th className="py-3.5 px-4">Solusi & Rekomendasi</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDup.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      Tidak ada aturan duplikasi terapi yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredDup.map((dup) => (
                    <tr key={dup.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200">
                          {dup.therapeuticClass}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{dup.drugAName}</p>
                        <p className="text-[11px] text-slate-500 font-semibold">+ {dup.drugBName}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs leading-relaxed font-medium">
                        {dup.riskDescription}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs leading-relaxed font-semibold text-emerald-800">
                        {dup.recommendation}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditDup(dup)}
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center"
                          title="Edit Duplikasi"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDupClick(dup.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                          title="Hapus Duplikasi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Tambah/Edit DFI */}
      {showDfiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-teal-600" />
                {editingDfi ? 'Edit Interaksi Obat - Makanan' : 'Tambah Interaksi Obat - Makanan Baru'}
              </h3>
              <button onClick={() => setShowDfiModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDfiSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Obat Utama *</label>
                  <input
                    type="text"
                    required
                    value={dfiForm.drugName}
                    onChange={(e) => setDfiForm({ ...dfiForm, drugName: e.target.value })}
                    placeholder="Misal: Simvastatin, Warfarin"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Makanan / Minuman *</label>
                  <input
                    type="text"
                    required
                    value={dfiForm.foodName}
                    onChange={(e) => setDfiForm({ ...dfiForm, foodName: e.target.value })}
                    placeholder="Misal: Jus Grapefruit, Susu"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Makanan</label>
                  <select
                    value={dfiForm.foodCategory}
                    onChange={(e) => setDfiForm({ ...dfiForm, foodCategory: e.target.value as DrugFoodInteraction['foodCategory'] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Buah / Juice">Buah / Juice</option>
                    <option value="Susu / Kalsium">Susu / Kalsium</option>
                    <option value="Alkohol">Alkohol</option>
                    <option value="Kafein / Kopi">Kafein / Kopi</option>
                    <option value="Makanan Tinggi Vitamin K">Makanan Tinggi Vitamin K</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tingkat Keparahan</label>
                  <select
                    value={dfiForm.severity}
                    onChange={(e) => setDfiForm({ ...dfiForm, severity: e.target.value as SeverityLevel })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Major">Major</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mekanisme Interaksi Enzim/Farmakologi</label>
                <textarea
                  rows={2}
                  required
                  value={dfiForm.mechanism}
                  onChange={(e) => setDfiForm({ ...dfiForm, mechanism: e.target.value })}
                  placeholder="Misal: Furanokumarin menghambat enzim CYP3A4 di usus halus..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dampak Klinis Pasien</label>
                <textarea
                  rows={2}
                  required
                  value={dfiForm.clinicalOutcome}
                  onChange={(e) => setDfiForm({ ...dfiForm, clinicalOutcome: e.target.value })}
                  placeholder="Misal: Peningkatan kadar obat plasma hingga memicu rhabdomyolysis..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rekomendasi & Jeda Konsumsi</label>
                <textarea
                  rows={2}
                  required
                  value={dfiForm.recommendation}
                  onChange={(e) => setDfiForm({ ...dfiForm, recommendation: e.target.value })}
                  placeholder="Misal: Hindari minum jus grapefruit secara mutlak saat terapi simvastatin..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDfiModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-xs"
                >
                  Simpan Interaksi Makanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Tambah/Edit Duplikasi Terapi */}
      {showDupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Copy className="w-5 h-5 text-teal-600" />
                {editingDup ? 'Edit Aturan Duplikasi Terapi' : 'Tambah Aturan Duplikasi Terapi Baru'}
              </h3>
              <button onClick={() => setShowDupModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDupSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Golongan Kelas Terapi *</label>
                <input
                  type="text"
                  required
                  value={dupForm.therapeuticClass}
                  onChange={(e) => setDupForm({ ...dupForm, therapeuticClass: e.target.value })}
                  placeholder="Misal: NSAID / Antiinflamasi Non-Steroid"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contoh Obat A *</label>
                  <input
                    type="text"
                    required
                    value={dupForm.drugAName}
                    onChange={(e) => setDupForm({ ...dupForm, drugAName: e.target.value })}
                    placeholder="Ibuprofen"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contoh Obat B / Kelas *</label>
                  <input
                    type="text"
                    required
                    value={dupForm.drugBName}
                    onChange={(e) => setDupForm({ ...dupForm, drugBName: e.target.value })}
                    placeholder="Mefenamic Acid / Ketorolac"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Risiko Toksisitas Ganda</label>
                <textarea
                  rows={2}
                  required
                  value={dupForm.riskDescription}
                  onChange={(e) => setDupForm({ ...dupForm, riskDescription: e.target.value })}
                  placeholder="Misal: Dua NSAID tidak meningkatkan analgesik namun melipatgandakan risiko pendarahan lambung..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Solusi & Rekomendasi Klinis</label>
                <textarea
                  rows={2}
                  required
                  value={dupForm.recommendation}
                  onChange={(e) => setDupForm({ ...dupForm, recommendation: e.target.value })}
                  placeholder="Misal: Hentikan salah satu NSAID dan gunakan kombinasi dengan parasetamol..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDupModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-xs"
                >
                  Simpan Aturan Duplikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
