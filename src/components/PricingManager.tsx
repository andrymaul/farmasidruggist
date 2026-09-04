import React, { useState } from 'react';
import { PricingPlan, PaymentMethodSettings, CustomerPlanPermissions } from '../types';
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
  Copy,
  Download,
  FileText,
  Syringe,
  HeartHandshake,
  FlaskConical,
  Leaf,
  Activity,
  CalendarClock,
  Baby,
  Calculator,
  Stethoscope,
  MessageSquare,
  HeartPulse,
  GraduationCap,
  ClipboardList,
  Scale,
  BookMarked,
  Sliders,
  Lock,
  FileSpreadsheet,
  Layers,
  UtensilsCrossed
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

  const getPlanPermissions = (plan: PricingPlan): CustomerPlanPermissions => {
    return plan.permissions || {
      maxDrugsPerCheck: plan.id === 'free' ? 20 : 99,
      canPrintPdfReport: plan.id !== 'free',
      canAccessFoodInteractions: plan.id !== 'free',
      canAccessTherapeuticDuplications: plan.id !== 'free',
      canSaveCloudHistory: plan.id !== 'free',
      maxHistoryRecords: plan.id === 'free' ? 0 : 999,
      canAccessClinicBranding: plan.id === 'pro',
      canExportExcelCsv: plan.id !== 'free',
      canAccessIvCompatibility: plan.id !== 'free',
      canAccessPregnancy: plan.id !== 'free',
      canAccessDrugLab: plan.id !== 'free',
      canAccessHerbDrug: plan.id !== 'free',
      canAccessSideEffects: plan.id !== 'free',
      canAccessBud: plan.id !== 'free',
      canAccessPediatric: plan.id !== 'free',
      canAccessRenal: plan.id !== 'free',
      canAccessPolypharmacy: plan.id !== 'free',
      canAccessWhatsappPio: plan.id !== 'free',
      canAccessGuidelines: plan.id !== 'free',
      canAccessCompetency: plan.id !== 'free',
      canAccessSop: plan.id !== 'free',
      canAccessRegulations: plan.id !== 'free',
      canAccessLiterature: plan.id !== 'free',
      canAccessSwamedikasi: true
    };
  };

  const togglePermission = (key: keyof CustomerPlanPermissions, customVal?: any) => {
    setPlans(plans.map(p => {
      if (p.id !== activePlanId) return p;
      const currentPerms = getPlanPermissions(p);
      const newVal = customVal !== undefined ? customVal : !Boolean((currentPerms as any)[key]);
      return {
        ...p,
        permissions: {
          ...currentPerms,
          [key]: newVal
        }
      };
    }));
  };

  const handleEnableAllPermissions = () => {
    setPlans(plans.map(p => {
      if (p.id !== activePlanId) return p;
      return {
        ...p,
        permissions: {
          maxDrugsPerCheck: 99,
          canPrintPdfReport: true,
          canAccessFoodInteractions: true,
          canAccessTherapeuticDuplications: true,
          canSaveCloudHistory: true,
          maxHistoryRecords: 999,
          canAccessClinicBranding: true,
          canExportExcelCsv: true,
          canAccessIvCompatibility: true,
          canAccessPregnancy: true,
          canAccessDrugLab: true,
          canAccessHerbDrug: true,
          canAccessSideEffects: true,
          canAccessBud: true,
          canAccessPediatric: true,
          canAccessRenal: true,
          canAccessRenalCalculator: true,
          canAccessPolypharmacy: true,
          canAccessWhatsappPio: true,
          canAccessGuidelines: true,
          canAccessClinicalGuidelines: true,
          canAccessCompetency: true,
          canAccessSop: true,
          canAccessRegulations: true,
          canAccessLiterature: true
        }
      };
    }));
    setMessage(`Seluruh hak akses fitur klinis & kalkulator untuk paket "${currentPlan.name}" telah diaktifkan!`);
    setTimeout(() => setMessage(''), 3500);
  };

  const handleRestrictToBasic = () => {
    setPlans(plans.map(p => {
      if (p.id !== activePlanId) return p;
      return {
        ...p,
        permissions: {
          maxDrugsPerCheck: 20,
          canPrintPdfReport: false,
          canAccessFoodInteractions: false,
          canAccessTherapeuticDuplications: false,
          canSaveCloudHistory: false,
          maxHistoryRecords: 0,
          canAccessClinicBranding: false,
          canExportExcelCsv: false,
          canAccessIvCompatibility: false,
          canAccessPregnancy: false,
          canAccessDrugLab: false,
          canAccessHerbDrug: false,
          canAccessSideEffects: false,
          canAccessBud: false,
          canAccessPediatric: false,
          canAccessRenal: false,
          canAccessRenalCalculator: false,
          canAccessPolypharmacy: false,
          canAccessWhatsappPio: false,
          canAccessGuidelines: false,
          canAccessClinicalGuidelines: false,
          canAccessCompetency: false,
          canAccessSop: false,
          canAccessRegulations: false,
          canAccessLiterature: false
        }
      };
    }));
    setMessage(`Hak akses paket "${currentPlan.name}" telah dibatasi ke standar dasar.`);
    setTimeout(() => setMessage(''), 3500);
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
        {(() => {
          const perms = getPlanPermissions(currentPlan);
          return (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-outfit">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                    <span>Checklist Hak Akses Fitur Paket ({currentPlan.name})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Centang fitur yang diizinkan untuk paket ini. Konfigurasi ini secara otomatis mengatur batasan dan hak akses seluruh modul pelanggan di sistem.
                  </p>
                </div>

                <span className="self-start sm:self-auto text-[11px] font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
                  Kontrol Akses Admin
                </span>
              </div>

              {/* Quick Action Presets */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-teal-50/90 to-emerald-50/90 rounded-2xl border border-teal-200 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-teal-900 font-outfit">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Aksi Cepat Hak Akses Paket ({currentPlan.name}):</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleEnableAllPermissions}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer hover:scale-102 font-outfit"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Buka Semua Fitur (Standar Pro)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRestrictToBasic}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs transition-colors cursor-pointer font-outfit"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Batasi ke Fitur Dasar (Pemula)</span>
                  </button>
                </div>
              </div>

              {/* KATEGORI 1: Kuota Pemeriksaan & Output Laporan */}
              <div className="space-y-3 p-4 bg-slate-50/60 rounded-3xl border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-800 font-outfit pb-2 border-b border-slate-200">
                  <Sliders className="w-4 h-4 text-teal-600" />
                  <span>1. Batas Kuota, Riwayat &amp; Laporan Resmi</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Cek Multi-Obat & Batas Obat */}
                  <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2.5 hover:border-teal-300 transition-colors shadow-2xs">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(perms.maxDrugsPerCheck && perms.maxDrugsPerCheck > 2)}
                        onChange={() => {
                          const isCurrentlyUnlimited = (perms.maxDrugsPerCheck ?? 2) > 2;
                          togglePermission('maxDrugsPerCheck', isCurrentlyUnlimited ? 2 : 99);
                        }}
                        className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-teal-600" />
                          Analisis Multi-Obat Tanpa Batas ({">"}2 Obat)
                        </p>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Izinkan pengguna mengecek lebih dari 2 obat sekaligus dalam satu formulir resep.
                        </p>
                      </div>
                    </label>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 pl-7">
                      <span className="text-[11px] font-bold text-slate-600">Batas Maksimal Obat per Cek:</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={perms.maxDrugsPerCheck ?? (currentPlan.id === 'free' ? 20 : 99)}
                        onChange={(e) => togglePermission('maxDrugsPerCheck', Math.max(1, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-teal-700 text-center font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <span className="text-[11px] text-slate-500 font-medium">Obat</span>
                    </div>
                  </div>

                  {/* Cetak & Ekspor Laporan PDF */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1 hover:border-teal-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canPrintPdfReport)}
                      onChange={() => togglePermission('canPrintPdfReport')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-teal-600" />
                        Cetak &amp; Ekspor Laporan PDF Evaluasi Klinis
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Pengguna dapat mengunduh &amp; mencetak lembar telaah klinis resmi berformat PDF lengkap dengan kop faskes.
                      </p>
                    </div>
                  </label>

                  {/* Simpan & Riwayat Cloud */}
                  <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2.5 hover:border-teal-300 transition-colors shadow-2xs">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(perms.canSaveCloudHistory)}
                        onChange={() => togglePermission('canSaveCloudHistory')}
                        className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                          Simpan &amp; Riwayat Pemeriksaan Cloud
                        </p>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Pengguna dapat menyimpan catatan evaluasi resep ke riwayat akun cloud pribadi.
                        </p>
                      </div>
                    </label>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 pl-7">
                      <span className="text-[11px] font-bold text-slate-600">Batas Riwayat Terbuka:</span>
                      <input
                        type="number"
                        min={0}
                        max={1000}
                        value={perms.maxHistoryRecords ?? (currentPlan.id === 'free' ? 0 : 999)}
                        onChange={(e) => togglePermission('maxHistoryRecords', Math.max(0, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-teal-700 text-center font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <span className="text-[11px] text-slate-500 font-medium">Catatan</span>
                    </div>
                  </div>

                  {/* Kop Surat & Stempel Digital (Clinic Branding) */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1 hover:border-teal-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessClinicBranding)}
                      onChange={() => togglePermission('canAccessClinicBranding')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-teal-600" />
                        Kop Surat &amp; Stempel Digital Faskes (Branding)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Personalisasi kop surat, logo resmi, nama fasilitas kesehatan, dan stempel digital apoteker.
                      </p>
                    </div>
                  </label>

                  {/* Ekspor Excel / CSV */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1 hover:border-teal-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer md:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canExportExcelCsv)}
                      onChange={() => togglePermission('canExportExcelCsv')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        Ekspor Data Interaksi &amp; Rekap ke Excel / CSV
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Pengguna dapat mengunduh seluruh matriks interaksi obat atau rekap data riwayat ke format spreadsheet.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* KATEGORI 2: Modul Skrining & Keamanan Resep Klinis */}
              <div className="space-y-3 p-4 bg-slate-50/60 rounded-3xl border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-800 font-outfit pb-2 border-b border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>2. Modul Skrining &amp; Keamanan Resep Klinis</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Kompatibilitas IV */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessIvCompatibility)}
                      onChange={() => togglePermission('canAccessIvCompatibility')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Syringe className="w-3.5 h-3.5 text-sky-600" />
                        Kompatibilitas Injeksi IV &amp; ICU (ASHP)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Skrining percabangan Y-Site, presipitasi pelarut infus &amp; stabilitas rekonstitusi obat injeksi.
                      </p>
                    </div>
                  </label>

                  {/* Bumil & Busui */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-pink-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessPregnancy)}
                      onChange={() => togglePermission('canAccessPregnancy')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <HeartHandshake className="w-3.5 h-3.5 text-pink-600" />
                        Keamanan Obat Ibu Hamil &amp; Menyusui
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Penapisan risiko teratogenik FDA PLLR per trimester &amp; profil ekskresi ASI (Hale's L1–L5).
                      </p>
                    </div>
                  </label>

                  {/* Uji Lab */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-cyan-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessDrugLab)}
                      onChange={() => togglePermission('canAccessDrugLab')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5 text-cyan-600" />
                        Interaksi Obat &amp; Hasil Uji Laboratorium
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Deteksi positif/negatif palsu biomarker lab (Troponin, Kreatinin, TSH, Glukosa, Elektrolit).
                      </p>
                    </div>
                  </label>

                  {/* Herbal & Jamu */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessHerbDrug)}
                      onChange={() => togglePermission('canAccessHerbDrug')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                        Interaksi Obat dengan Jamu &amp; Herbal Indonesia
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Evaluasi penapisan sediaan Jamu, OHT &amp; Fitofarmaka terhadap obat resep dokter.
                      </p>
                    </div>
                  </label>

                  {/* Efek Samping & Naranjo */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessSideEffects)}
                      onChange={() => togglePermission('canAccessSideEffects')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-amber-600" />
                        Analisis Efek Samping Obat &amp; Skor Naranjo (MESO)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Evaluasi toksisitas organ, algoritma kausalitas Naranjo, dan generator formulir pelaporan MESO BPOM.
                      </p>
                    </div>
                  </label>

                  {/* Interaksi Obat-Makanan */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessFoodInteractions)}
                      onChange={() => togglePermission('canAccessFoodInteractions')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
                        Evaluasi Interaksi Obat-Makanan (DFI)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Menampilkan analisis interaksi obat dengan makanan, jus buah, susu, suplemen, atau alkohol berisiko.
                      </p>
                    </div>
                  </label>

                  {/* Duplikasi Terapi Ganda */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer md:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessTherapeuticDuplications)}
                      onChange={() => togglePermission('canAccessTherapeuticDuplications')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        Peringatan Duplikasi Terapi Ganda
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Mendeteksi dan memperingatkan penggunaan 2 obat dari kelas terapi yang sama (redudansi terapi).
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* KATEGORI 3: Modul Kalkulator Medis & Racikan Farmasi */}
              <div className="space-y-3 p-4 bg-slate-50/60 rounded-3xl border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 font-outfit pb-2 border-b border-slate-200">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>3. Modul Kalkulator Medis &amp; Racikan Farmasi</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* BUD Racikan */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessBud)}
                      onChange={() => togglePermission('canAccessBud')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <CalendarClock className="w-3.5 h-3.5 text-teal-600" />
                        Stabilitas &amp; Beyond Use Date (BUD Racikan)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Penetapan batas kadaluarsa sediaan racikan berstandar USP &lt;795&gt;, &lt;797&gt; &amp; FI VI.
                      </p>
                    </div>
                  </label>

                  {/* Dosis Pediatrik */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-rose-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessPediatric)}
                      onChange={() => togglePermission('canAccessPediatric')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Baby className="w-3.5 h-3.5 text-rose-600" />
                        Kalkulator Dosis Pediatrik &amp; Konversi Puyer
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Hitung dosis anak berbasis BB &amp; BSA serta peracikan puyer dengan penimbang SL otomatis.
                      </p>
                    </div>
                  </label>

                  {/* Klirens Ginjal */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessRenal ?? perms.canAccessRenalCalculator)}
                      onChange={() => {
                        const current = Boolean(perms.canAccessRenal ?? perms.canAccessRenalCalculator);
                        togglePermission('canAccessRenal', !current);
                        togglePermission('canAccessRenalCalculator', !current);
                      }}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5 text-violet-600" />
                        Kalkulator Medis &amp; Klirens Ginjal (CrCl/eGFR)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Kalkulasi eGFR/CrCl Cockcroft-Gault, penyesuaian dosis obat ginjal, dan skor Child-Pugh hepar.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* KATEGORI 4: Modul Polifarmasi & Edukasi Pasien */}
              <div className="space-y-3 p-4 bg-slate-50/60 rounded-3xl border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-800 font-outfit pb-2 border-b border-slate-200">
                  <Stethoscope className="w-4 h-4 text-indigo-600" />
                  <span>4. Modul Polifarmasi &amp; Edukasi Pasien</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Polifarmasi Beers */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessPolypharmacy)}
                      onChange={() => togglePermission('canAccessPolypharmacy')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                        Evaluasi Polifarmasi Geriatri (Beers 2023)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Penapisan obat tidak tepat lansia (PIMs), analisis beban antikolinergik &amp; duplikasi terapi geriatri.
                      </p>
                    </div>
                  </label>

                  {/* PIO WhatsApp */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessWhatsappPio)}
                      onChange={() => togglePermission('canAccessWhatsappPio')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                        Kartu Edukasi Obat (PIO) WhatsApp Pasien
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Pembuatan kartu aturan pakai digital dan kirim instan via WhatsApp ke nomor pasien.
                      </p>
                    </div>
                  </label>

                  {/* Panduan Terapi PNPK */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessGuidelines ?? perms.canAccessClinicalGuidelines)}
                      onChange={() => {
                        const current = Boolean(perms.canAccessGuidelines ?? perms.canAccessClinicalGuidelines);
                        togglePermission('canAccessGuidelines', !current);
                        togglePermission('canAccessClinicalGuidelines', !current);
                      }}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <HeartPulse className="w-3.5 h-3.5 text-blue-600" />
                        Database Panduan Terapi PNPK Kemenkes RI
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Akses 23+ pedoman nasional pelayanan kedokteran &amp; algoritma terapi FORNAS resmi.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* KATEGORI 5: Pusat Belajar, SOP & Regulasi Farmasi */}
              <div className="space-y-3 p-4 bg-slate-50/60 rounded-3xl border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-900 font-outfit pb-2 border-b border-slate-200">
                  <GraduationCap className="w-4 h-4 text-cyan-600" />
                  <span>5. Pusat Belajar, SOP &amp; Regulasi Farmasi</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Pusat Belajar CBT/OSCE */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessCompetency)}
                      onChange={() => togglePermission('canAccessCompetency')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        Pusat Belajar Farmasi (CBT &amp; OSCE UKMPPAI)
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Bank soal kasus vignette klinis, simulasi tryout berwaktu, dan panduan stasi OSCE.
                      </p>
                    </div>
                  </label>

                  {/* SOP Pelayanan Farmasi */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessSop)}
                      onChange={() => togglePermission('canAccessSop')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <ClipboardList className="w-3.5 h-3.5 text-slate-600" />
                        SOP Pelayanan Farmasi Klinis
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Standar operasional prosedur resmi penapisan resep, dispensing, dan konseling farmasi.
                      </p>
                    </div>
                  </label>

                  {/* Regulasi & UU Kesehatan */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessRegulations)}
                      onChange={() => togglePermission('canAccessRegulations')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-amber-600" />
                        Database Regulasi &amp; UU Kesehatan RI
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Kompilasi undang-undang, Permenkes, dan standar regulasi akreditasi fasilitas farmasi.
                      </p>
                    </div>
                  </label>

                  {/* Literatur Ilmiah EBM */}
                  <label className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors shadow-2xs flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(perms.canAccessLiterature)}
                      onChange={() => togglePermission('canAccessLiterature')}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-teal-600" />
                        Pusat Literatur Klinis &amp; Basis Ilmiah EBM
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Akses jurnal farmakologi terakreditasi, matriks pembuktian klinis &amp; Evidence-Based Medicine.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          );
        })()}

      </div>

    </div>
  );
};

export default PricingManager;

