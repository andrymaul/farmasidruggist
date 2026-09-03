import React, { useState } from 'react';
import { PricingPlan, PaymentMethodSettings } from '../types';
import { DEFAULT_PAYMENT_SETTINGS } from '../data/defaultPaymentSettings';
import { 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Tag, 
  Building2, 
  Zap, 
  ShieldCheck,
  Percent,
  Check,
  Info,
  QrCode,
  Smartphone,
  Landmark,
  Image,
  Copy
} from 'lucide-react';

interface PricingManagerProps {
  pricingPlans: PricingPlan[];
  paymentSettings?: PaymentMethodSettings;
  onUpdatePricingPlans: (updatedPlans: PricingPlan[]) => void;
  onSavePaymentSettings?: (updatedPayment: PaymentMethodSettings) => void;
}

export const PricingManager: React.FC<PricingManagerProps> = ({
  pricingPlans,
  paymentSettings = DEFAULT_PAYMENT_SETTINGS,
  onUpdatePricingPlans,
  onSavePaymentSettings
}) => {
  const [plans, setPlans] = useState<PricingPlan[]>(pricingPlans);
  const [activePlanId, setActivePlanId] = useState<string>('pro');
  const [message, setMessage] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');

  const currentPlan = plans.find(p => p.id === activePlanId) || plans[0];

  // Handlers
  const handleFieldChange = (field: keyof PricingPlan, value: any) => {
    setPlans(plans.map(p => {
      if (p.id === activePlanId) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const handlePriceValueChange = (val: number) => {
    const formatted = val === 0 ? 'Rp 0' : `Rp ${val.toLocaleString('id-ID')}`;
    setPlans(plans.map(p => {
      if (p.id === activePlanId) {
        return { ...p, priceValue: val, priceFormatted: formatted };
      }
      return p;
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setPlans(plans.map(p => {
      if (p.id === activePlanId) {
        return { ...p, features: [...p.features, newFeatureText.trim()] };
      }
      return p;
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (idx: number) => {
    setPlans(plans.map(p => {
      if (p.id === activePlanId) {
        const updatedFeatures = [...p.features];
        updatedFeatures.splice(idx, 1);
        return { ...p, features: updatedFeatures };
      }
      return p;
    }));
  };

  const handleApplyDiscountPreset = (percent: number) => {
    setPlans(plans.map(p => {
      if (p.id === 'pro') {
        const basePrice = 999000;
        const discounted = Math.round(basePrice * (1 - percent / 100));
        return {
          ...p,
          priceValue: discounted,
          priceFormatted: `Rp ${discounted.toLocaleString('id-ID')}`,
          badge: `Promo Hemat ${percent}%`
        };
      }
      return p;
    }));
    setMessage(`Berhasil mengaplikasikan diskon promo ${percent}% untuk paket Pro!`);
  };

  const handleSaveAll = () => {
    onUpdatePricingPlans(plans);
    if (onSavePaymentSettings) {
      onSavePaymentSettings(paymentSettings);
    }
    setMessage('Pengaturan Tarif & Hak Akses Paket berhasil disimpan!');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner - Clean White Enterprise Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 text-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
            <CreditCard className="w-3.5 h-3.5 text-teal-600" />
            <span>Panel Pengaturan Mandiri Administrator</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Pengaturan Tarif, Paket & Metode Pembayaran
          </h1>
          
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Kelola harga langganan, fitur paket, dan nomor rekening/QRIS untuk pembayaran QRIS, Transfer Bank, dan E-Wallet secara dinamis.
          </p>
        </div>

        <div className="flex flex-col items-stretch sm:items-end gap-2.5 shrink-0">
          <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 text-left sm:text-right shadow-xs">
            <span className="text-[11px] text-slate-500 block font-medium">Tingkat Akses Lisensi:</span>
            <span className="text-base sm:text-lg font-black text-teal-700">{plans.length} Paket Layanan</span>
          </div>

          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>Simpan Semua Perubahan</span>
          </button>
        </div>
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

      {/* Quick Promo Preset Buttons */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Tag className="w-4 h-4 text-teal-600" />
          <span>Preset Promo Diskon Cepat:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleApplyDiscountPreset(15)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200 transition-colors"
          >
            Diskon 15%
          </button>
          <button
            onClick={() => handleApplyDiscountPreset(30)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
          >
            Promo Special 30%
          </button>
          <button
            onClick={() => handleApplyDiscountPreset(50)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-xs transition-colors"
          >
            Mega Sale 50% Off
          </button>
        </div>
      </div>

      {/* Main Plan Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isActive = plan.id === activePlanId;
          return (
            <div
              key={plan.id}
              onClick={() => setActivePlanId(plan.id as any)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${
                    plan.id === 'pro' ? 'text-teal-600' : 'text-slate-500'
                  }`}>
                    Paket {plan.id}
                  </span>
                  {plan.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                <div className="text-xl font-extrabold text-slate-900">
                  {plan.priceFormatted} <span className="text-xs font-normal text-slate-500">/ bln</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className={isActive ? 'text-teal-700 font-bold' : 'text-slate-500'}>
                  {isActive ? 'Sedang Diedit' : 'Klik untuk Edit'}
                </span>
                <Edit3 className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Plan Editor Workspace */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-teal-600" />
              Mengedit Detail Paket: <span className="text-teal-600">{currentPlan.name}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Ubah nama paket, nominal harga, badge, dan daftar fitur di bawah ini.</p>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={currentPlan.isPopular || false}
              onChange={(e) => handleFieldChange('isPopular', e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500"
            />
            <span>Tandai Sebagai "Paling Populer"</span>
          </label>
        </div>

        {/* Basic Info & Price Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Tampilan Paket</label>
            <input
              type="text"
              value={currentPlan.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Label Badge (Opsional)</label>
            <input
              type="text"
              value={currentPlan.badge || ''}
              onChange={(e) => handleFieldChange('badge', e.target.value)}
              placeholder="Contoh: Best Value / Promo 30%"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nominal Harga Bulanan (Rp)</label>
            <input
              type="number"
              value={currentPlan.priceValue}
              onChange={(e) => handlePriceValueChange(Number(e.target.value))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Teks Harga Terformat</label>
            <input
              type="text"
              value={currentPlan.priceFormatted}
              onChange={(e) => handleFieldChange('priceFormatted', e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Teks Keterangan Periode</label>
            <input
              type="text"
              value={currentPlan.period}
              onChange={(e) => handleFieldChange('period', e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol Aksi (CTA Button)</label>
            <input
              type="text"
              value={currentPlan.ctaText}
              onChange={(e) => handleFieldChange('ctaText', e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Deskripsi Paket */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Paket Singkat</label>
          <textarea
            rows={2}
            value={currentPlan.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Dynamic Feature Bullets Editor */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Daftar Poin Fitur Unggulan Paket ({currentPlan.features.length})</span>
            </h3>
          </div>

          {/* Add New Feature Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeatureText}
              onChange={(e) => setNewFeatureText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              placeholder="Ketik poin fitur baru (contoh: 'Akses Panduan Penggunaan Obat 9 Sediaan')..."
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button
              onClick={handleAddFeature}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Fitur</span>
            </button>
          </div>

          {/* Feature Bullets List */}
          <div className="space-y-2 pt-2">
            {currentPlan.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                    ✓
                  </div>
                  <span className="font-medium">{feat}</span>
                </div>

                <button
                  onClick={() => handleRemoveFeature(idx)}
                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Hapus Poin Fitur"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist Pengaturan Hak Akses Fitur Customer */}
        <div className="space-y-4 pt-5 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Checklist Hak Akses Fitur Paket ({currentPlan.name})</span>
            </h3>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
              Kontrol Akses Admin
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Centang fitur yang diizinkan untuk paket ini. Sistem akan secara otomatis membatasi atau mengaktifkan hak akses customer sesuai checklist di bawah ini.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            
            {/* Checklist: Cek Multi-Obat & Batas Obat */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 hover:border-teal-300 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPlan.permissions?.maxDrugsPerCheck ? currentPlan.permissions.maxDrugsPerCheck > 2 : currentPlan.id !== 'free'}
                  onChange={() => {
                    const isCurrentlyUnlimited = (currentPlan.permissions?.maxDrugsPerCheck ?? (currentPlan.id === 'free' ? 2 : 99)) > 2;
                    const newLimit = isCurrentlyUnlimited ? 2 : 99;
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: newLimit,
                        canPrintPdfReport: p.permissions?.canPrintPdfReport ?? (p.id !== 'free'),
                        canAccessFoodInteractions: p.permissions?.canAccessFoodInteractions ?? (p.id !== 'free'),
                        canAccessTherapeuticDuplications: p.permissions?.canAccessTherapeuticDuplications ?? (p.id !== 'free'),
                        canSaveCloudHistory: p.permissions?.canSaveCloudHistory ?? true,
                        maxHistoryRecords: p.permissions?.maxHistoryRecords ?? (p.id === 'free' ? 3 : 999),
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Analisis Multi-Obat Tanpa Batas ({">"}2 Obat)</p>
                  <p className="text-[11px] text-slate-500">Izinkan pengguna mengecek lebih dari 2 obat sekaligus.</p>
                </div>
              </label>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 pl-7">
                <span className="text-[11px] font-bold text-slate-600">Batas Maksimal Obat per Cek:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={currentPlan.permissions?.maxDrugsPerCheck ?? (currentPlan.id === 'free' ? 2 : 99)}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value));
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: val,
                        canPrintPdfReport: p.permissions?.canPrintPdfReport ?? (p.id !== 'free'),
                        canAccessFoodInteractions: p.permissions?.canAccessFoodInteractions ?? (p.id !== 'free'),
                        canAccessTherapeuticDuplications: p.permissions?.canAccessTherapeuticDuplications ?? (p.id !== 'free'),
                        canSaveCloudHistory: p.permissions?.canSaveCloudHistory ?? true,
                        maxHistoryRecords: p.permissions?.maxHistoryRecords ?? (p.id === 'free' ? 3 : 999),
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="w-20 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-extrabold text-teal-700 text-center"
                />
                <span className="text-[11px] text-slate-500 font-medium">Obat</span>
              </div>
            </div>

            {/* Checklist: Cetak Laporan PDF */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPlan.permissions?.canPrintPdfReport ?? (currentPlan.id !== 'free')}
                  onChange={() => {
                    const current = currentPlan.permissions?.canPrintPdfReport ?? (currentPlan.id !== 'free');
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: p.permissions?.maxDrugsPerCheck ?? (p.id === 'free' ? 2 : 99),
                        canPrintPdfReport: !current,
                        canAccessFoodInteractions: p.permissions?.canAccessFoodInteractions ?? (p.id !== 'free'),
                        canAccessTherapeuticDuplications: p.permissions?.canAccessTherapeuticDuplications ?? (p.id !== 'free'),
                        canSaveCloudHistory: p.permissions?.canSaveCloudHistory ?? true,
                        maxHistoryRecords: p.permissions?.maxHistoryRecords ?? (p.id === 'free' ? 3 : 999),
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Cetak & Ekspor Laporan PDF Evaluasi Klinis</p>
                  <p className="text-[11px] text-slate-500">Pengguna dapat mengunduh & mencetak lembar laporan resmi hasil evaluasi resep.</p>
                </div>
              </label>
            </div>

            {/* Checklist: Interaksi Obat-Makanan (DFI) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPlan.permissions?.canAccessFoodInteractions ?? (currentPlan.id !== 'free')}
                  onChange={() => {
                    const current = currentPlan.permissions?.canAccessFoodInteractions ?? (currentPlan.id !== 'free');
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: p.permissions?.maxDrugsPerCheck ?? (p.id === 'free' ? 2 : 99),
                        canPrintPdfReport: p.permissions?.canPrintPdfReport ?? (p.id !== 'free'),
                        canAccessFoodInteractions: !current,
                        canAccessTherapeuticDuplications: p.permissions?.canAccessTherapeuticDuplications ?? (p.id !== 'free'),
                        canSaveCloudHistory: p.permissions?.canSaveCloudHistory ?? true,
                        maxHistoryRecords: p.permissions?.maxHistoryRecords ?? (p.id === 'free' ? 3 : 999),
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Evaluasi Interaksi Obat-Makanan (DFI)</p>
                  <p className="text-[11px] text-slate-500">Menampilkan analisis interaksi obat dengan makanan/minuman berisiko.</p>
                </div>
              </label>
            </div>

            {/* Checklist: Duplikasi Terapi Ganda */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPlan.permissions?.canAccessTherapeuticDuplications ?? (currentPlan.id !== 'free')}
                  onChange={() => {
                    const current = currentPlan.permissions?.canAccessTherapeuticDuplications ?? (currentPlan.id !== 'free');
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: p.permissions?.maxDrugsPerCheck ?? (p.id === 'free' ? 2 : 99),
                        canPrintPdfReport: p.permissions?.canPrintPdfReport ?? (p.id !== 'free'),
                        canAccessFoodInteractions: p.permissions?.canAccessFoodInteractions ?? (p.id !== 'free'),
                        canAccessTherapeuticDuplications: !current,
                        canSaveCloudHistory: p.permissions?.canSaveCloudHistory ?? true,
                        maxHistoryRecords: p.permissions?.maxHistoryRecords ?? (p.id === 'free' ? 3 : 999),
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Peringatan Duplikasi Terapi Ganda</p>
                  <p className="text-[11px] text-slate-500">Mendeteksi dan memperingatkan penggunaan 2 obat dari kelas terapi yang sama.</p>
                </div>
              </label>
            </div>

            {/* Checklist: Simpan & Riwayat Cloud */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 hover:border-teal-300 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPlan.permissions?.canSaveCloudHistory ?? true}
                  onChange={() => {
                    const current = currentPlan.permissions?.canSaveCloudHistory ?? true;
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: p.permissions?.maxDrugsPerCheck ?? (p.id === 'free' ? 2 : 99),
                        canPrintPdfReport: p.permissions?.canPrintPdfReport ?? (p.id !== 'free'),
                        canAccessFoodInteractions: p.permissions?.canAccessFoodInteractions ?? (p.id !== 'free'),
                        canAccessTherapeuticDuplications: p.permissions?.canAccessTherapeuticDuplications ?? (p.id !== 'free'),
                        canSaveCloudHistory: !current,
                        maxHistoryRecords: p.permissions?.maxHistoryRecords ?? (p.id === 'free' ? 3 : 999),
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Simpan & Riwayat Pemeriksaan Cloud</p>
                  <p className="text-[11px] text-slate-500">Pengguna dapat menyimpan catatan resep ke riwayat akun.</p>
                </div>
              </label>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 pl-7">
                <span className="text-[11px] font-bold text-slate-600">Batas Riwayat Terbuka:</span>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={currentPlan.permissions?.maxHistoryRecords ?? (currentPlan.id === 'free' ? 3 : 999)}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value));
                    setPlans(plans.map(p => p.id === activePlanId ? {
                      ...p,
                      permissions: {
                        maxDrugsPerCheck: p.permissions?.maxDrugsPerCheck ?? (p.id === 'free' ? 2 : 99),
                        canPrintPdfReport: p.permissions?.canPrintPdfReport ?? (p.id !== 'free'),
                        canAccessFoodInteractions: p.permissions?.canAccessFoodInteractions ?? (p.id !== 'free'),
                        canAccessTherapeuticDuplications: p.permissions?.canAccessTherapeuticDuplications ?? (p.id !== 'free'),
                        canSaveCloudHistory: p.permissions?.canSaveCloudHistory ?? true,
                        maxHistoryRecords: val,
                        canAccessClinicBranding: p.permissions?.canAccessClinicBranding ?? (p.id === 'pro'),
                        canExportExcelCsv: p.permissions?.canExportExcelCsv ?? (p.id !== 'free')
                      }
                    } : p));
                  }}
                  className="w-20 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-extrabold text-teal-700 text-center"
                />
                <span className="text-[11px] text-slate-500 font-medium">Catatan</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default PricingManager;

