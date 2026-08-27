import React, { useState } from 'react';
import { ClinicBrandingSettings } from '../types';
import { 
  Building2, 
  Printer, 
  Palette, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  RotateCcw,
  Eye,
  Sliders,
  Check,
  Image as ImageIcon,
  Stamp,
  ToggleLeft,
  ToggleRight,
  Power,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ClinicBrandingManagerProps {
  branding: ClinicBrandingSettings;
  onSaveBranding: (updated: ClinicBrandingSettings) => void;
}

const COLOR_PRESETS = [
  { name: 'Teal (Default)', value: '#0d9488', bgClass: 'bg-teal-600' },
  { name: 'Emerald', value: '#059669', bgClass: 'bg-emerald-600' },
  { name: 'Sakura Pink 🌸', value: '#ec4899', bgClass: 'bg-pink-500' },
  { name: 'Sweet Lavender 💜', value: '#a855f7', bgClass: 'bg-purple-500' },
  { name: 'Berry Rose 🍓', value: '#e11d48', bgClass: 'bg-rose-600' },
  { name: 'Sweet Peach 🍑', value: '#f97316', bgClass: 'bg-orange-500' },
  { name: 'Royal Blue', value: '#2563eb', bgClass: 'bg-blue-600' },
  { name: 'Indigo', value: '#4f46e5', bgClass: 'bg-indigo-600' },
  { name: 'Dark Slate', value: '#0f172a', bgClass: 'bg-slate-900' },
];

const SAMPLE_LOGOS = [
  { label: 'Logo Apotek (Hijau)', url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=120&q=80' },
  { label: 'Logo Klinik (Teal)', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=120&q=80' },
];

const SAMPLE_STAMPS = [
  { label: 'Stempel Resmi (Biru)', url: 'https://api.iconify.design/lucide:stamp.svg?color=%231e3a8a' },
  { label: 'Stempel Resmi (Merah)', url: 'https://api.iconify.design/lucide:stamp.svg?color=%23991b1b' },
];

export const ClinicBrandingManager: React.FC<ClinicBrandingManagerProps> = ({
  branding,
  onSaveBranding
}) => {
  const [formState, setFormState] = useState<ClinicBrandingSettings>({
    ...branding,
    enableHeaderKop: branding.enableHeaderKop ?? true,
    enableDigitalStamp: branding.enableDigitalStamp ?? true,
    enablePharmacistSignature: branding.enablePharmacistSignature ?? true,
    enableFooter: branding.enableFooter ?? true,
    showWatermark: branding.showWatermark ?? true,
  });

  const [savedSuccessMessage, setSavedSuccessMessage] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveBranding(formState);
    setSavedSuccessMessage('Pengaturan Kop Surat, Stempel, & Status Sakelar ON/OFF berhasil disimpan!');
    setTimeout(() => setSavedSuccessMessage(''), 4000);
  };

  // Quick preset handlers for toggle switches
  const applyPresetAllOn = () => {
    setFormState(prev => ({
      ...prev,
      enableHeaderKop: true,
      enableDigitalStamp: true,
      enablePharmacistSignature: true,
      enableFooter: true,
      showWatermark: true,
    }));
  };

  const applyPresetPreprintedPaper = () => {
    // Mode kertas fisik pre-printed: Kop dan stempel OFF, hanya tanda tangan basah & watermark
    setFormState(prev => ({
      ...prev,
      enableHeaderKop: false,
      enableDigitalStamp: false,
      enablePharmacistSignature: true,
      enableFooter: true,
      showWatermark: false,
    }));
  };

  const applyPresetMinimal = () => {
    setFormState(prev => ({
      ...prev,
      enableHeaderKop: true,
      enableDigitalStamp: false,
      enablePharmacistSignature: true,
      enableFooter: false,
      showWatermark: false,
    }));
  };

  const isKopOn = formState.enableHeaderKop !== false;
  const isStampOn = formState.enableDigitalStamp !== false;
  const isSigOn = formState.enablePharmacistSignature !== false;
  const isWatermarkOn = formState.showWatermark !== false;
  const isFooterOn = formState.enableFooter !== false;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Pengaturan Kop Surat & Stempel Digital Instansi</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Pengaturan Kop Surat, Logo & Stempel Digital
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Konfigurasikan identitas resmi instansi Anda (*Nama Klinik/Apotek, Logo, Alamat, Nomor SIPA Apoteker, URL Stempel Digital, dan Skema Warna*) dengan <strong>fitur Sakelar ON / OFF</strong> untuk mengontrol elemen yang dicetak pada dokumen PDF 1 Halaman A4.
          </p>
        </div>

        <button
          onClick={() => handleSubmit()}
          className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 border border-teal-500/40 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {savedSuccessMessage && (
        <div className="p-4 bg-teal-50 text-teal-800 border border-teal-200 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>{savedSuccessMessage}</span>
          </div>
          <button onClick={() => setSavedSuccessMessage('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
        </div>
      )}

      {/* Main Grid: Form Left (5 cols) & Live Preview Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Form Editors */}
        <div className="lg:col-span-5 space-y-6">

          {/* ========================================================================= */}
          {/* CARD 1: SAKELAR ON / OFF ELEMEN DOKUMEN CETAK (NEW FEATURE) */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Power className="w-5 h-5 text-teal-600" />
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Sakelar ON / OFF Elemen Dokumen</h2>
                  <p className="text-[11px] text-slate-500">Atur elemen mana saja yang aktif dicetak pada dokumen PDF</p>
                </div>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                ⚡ Template Cepat Sakelar:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={applyPresetAllOn}
                  className="p-1.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 font-bold text-slate-800 text-center transition-all cursor-pointer hover:bg-teal-50"
                >
                  Semua ON
                </button>
                <button
                  type="button"
                  onClick={applyPresetPreprintedPaper}
                  className="p-1.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 font-bold text-slate-800 text-center transition-all cursor-pointer hover:bg-teal-50"
                  title="Kop dan stempel OFF, cocok jika mencetak di atas kertas kop fisik yang sudah ada"
                >
                  Kertas Fisik
                </button>
                <button
                  type="button"
                  onClick={applyPresetMinimal}
                  className="p-1.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 font-bold text-slate-800 text-center transition-all cursor-pointer hover:bg-teal-50"
                >
                  Minimalis
                </button>
              </div>
            </div>

            {/* TOGGLE SWITCHES LIST */}
            <div className="space-y-3 pt-1">
              
              {/* 1. Toggle Kop Surat Resmi */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${isKopOn ? 'bg-teal-50/70 border-teal-200' : 'bg-slate-50 border-slate-200 opacity-85'}`}>
                <div className="space-y-0.5 max-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <Building2 className={`w-4 h-4 ${isKopOn ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">Kop Surat Resmi (Header)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isKopOn ? 'Logo, Nama Klinik, Alamat, & Izin SIA aktif dicetak di atas dokumen.' : 'Kop disembunyikan (mode kertas kop cetak fisik).'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, enableHeaderKop: !isKopOn })}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${isKopOn ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center">
                    {isKopOn ? (
                      <Check className="w-3 h-3 text-teal-600 font-bold" />
                    ) : (
                      <span className="text-[9px] text-slate-400 font-bold">✕</span>
                    )}
                  </div>
                </button>
              </div>

              {/* 2. Toggle Stempel Digital */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${isStampOn ? 'bg-teal-50/70 border-teal-200' : 'bg-slate-50 border-slate-200 opacity-85'}`}>
                <div className="space-y-0.5 max-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <Stamp className={`w-4 h-4 ${isStampOn ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">Stempel Digital Transparan</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isStampOn ? 'Stempel transparan otomatis tercetak di atas kolom tanda tangan.' : 'Stempel disembunyikan (untuk cap stempel basah manual).'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, enableDigitalStamp: !isStampOn })}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${isStampOn ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center">
                    {isStampOn ? (
                      <Check className="w-3 h-3 text-teal-600 font-bold" />
                    ) : (
                      <span className="text-[9px] text-slate-400 font-bold">✕</span>
                    )}
                  </div>
                </button>
              </div>

              {/* 3. Toggle Tanda Tangan & SIPA Apoteker */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${isSigOn ? 'bg-teal-50/70 border-teal-200' : 'bg-slate-50 border-slate-200 opacity-85'}`}>
                <div className="space-y-0.5 max-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className={`w-4 h-4 ${isSigOn ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">Kolom Tanda Tangan & SIPA</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isSigOn ? 'Nama Apoteker PJ dan Nomor SIPA ditampilkan di lembar pengesahan.' : 'Blok tanda tangan disembunyikan.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, enablePharmacistSignature: !isSigOn })}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${isSigOn ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center">
                    {isSigOn ? (
                      <Check className="w-3 h-3 text-teal-600 font-bold" />
                    ) : (
                      <span className="text-[9px] text-slate-400 font-bold">✕</span>
                    )}
                  </div>
                </button>
              </div>

              {/* 4. Toggle Watermark Keaslian Dokumen */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${isWatermarkOn ? 'bg-teal-50/70 border-teal-200' : 'bg-slate-50 border-slate-200 opacity-85'}`}>
                <div className="space-y-0.5 max-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <Layers className={`w-4 h-4 ${isWatermarkOn ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">Watermark Keaslian Dokumen</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isWatermarkOn ? 'Watermark diagonal samar aktif sebagai proteksi anti-duplikasi.' : 'Latar belakang kertas polos bersih tanpa watermark.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, showWatermark: !isWatermarkOn })}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${isWatermarkOn ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center">
                    {isWatermarkOn ? (
                      <Check className="w-3 h-3 text-teal-600 font-bold" />
                    ) : (
                      <span className="text-[9px] text-slate-400 font-bold">✕</span>
                    )}
                  </div>
                </button>
              </div>

              {/* 5. Toggle Catatan Kaki (Footer Legalitas) */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${isFooterOn ? 'bg-teal-50/70 border-teal-200' : 'bg-slate-50 border-slate-200 opacity-85'}`}>
                <div className="space-y-0.5 max-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <FileText className={`w-4 h-4 ${isFooterOn ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">Catatan Kaki (Footer Legalitas)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isFooterOn ? 'Teks disclaimer legalitas dan nomor halaman aktif di bagian bawah.' : 'Footer legalitas disembunyikan.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, enableFooter: !isFooterOn })}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${isFooterOn ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center">
                    {isFooterOn ? (
                      <Check className="w-3 h-3 text-teal-600 font-bold" />
                    ) : (
                      <span className="text-[9px] text-slate-400 font-bold">✕</span>
                    )}
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: FORM DATA IDENTITAS & KONTEN */}
          {/* ========================================================================= */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-extrabold text-slate-900">Form Identitas & Stempel</h2>
              </div>
              <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                Tersimpan Otomatis
              </span>
            </div>

            {/* Nama Instansi & Tagline */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Klinik / Rumah Sakit / Apotek *</label>
                <input
                  type="text"
                  required
                  value={formState.clinicName}
                  onChange={(e) => setFormState({ ...formState, clinicName: e.target.value })}
                  placeholder="Klinik & Apotek Medika Sejahtera"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Sub-Title Instansi</label>
                <input
                  type="text"
                  value={formState.tagline || ''}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  placeholder="Pusat Pelayanan Resep & Farmasi Klinis Terpadu"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Logo Instansi URL */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                  <span>URL Gambar Logo Instansi</span>
                </span>
                {formState.logoUrl && (
                  <span className="text-[10px] text-emerald-600 font-bold">✓ Gambar Terhubung</span>
                )}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formState.logoUrl || ''}
                  onChange={(e) => setFormState({ ...formState, logoUrl: e.target.value })}
                  placeholder="https://domain.com/logo-klinik.png"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                {formState.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, logoUrl: '' })}
                    className="px-2 py-1 text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>Contoh Cepat:</span>
                {SAMPLE_LOGOS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormState({ ...formState, logoUrl: sample.url })}
                    className="text-teal-700 font-semibold underline hover:text-teal-900 cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stempel Digital Transparan URL */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Stamp className="w-3.5 h-3.5 text-teal-600" />
                  <span>URL Stempel Digital (Transparan PNG)</span>
                </span>
                {formState.stampUrl && (
                  <span className="text-[10px] text-emerald-600 font-bold">✓ Stempel Terhubung</span>
                )}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formState.stampUrl || ''}
                  onChange={(e) => setFormState({ ...formState, stampUrl: e.target.value })}
                  placeholder="https://domain.com/stempel-resmi.png"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                {formState.stampUrl && (
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, stampUrl: '' })}
                    className="px-2 py-1 text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>Contoh Cepat:</span>
                {SAMPLE_STAMPS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormState({ ...formState, stampUrl: sample.url })}
                    className="text-teal-700 font-semibold underline hover:text-teal-900 cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alamat & Kontak */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap Instansi *</label>
                <textarea
                  rows={2}
                  required
                  value={formState.address}
                  onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                  placeholder="Jl. Jendral Sudirman No. 45, Jakarta Selatan"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. Telepon / WA</label>
                  <input
                    type="text"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="(021) 555-0199"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="farmasi@klinik.co.id"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Izin SIA & SIPA Apoteker */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">No. Izin Operasional Klinik / SIA</label>
                <input
                  type="text"
                  value={formState.licenseNumber || ''}
                  onChange={(e) => setFormState({ ...formState, licenseNumber: e.target.value })}
                  placeholder="SIA: 449.1/092/SIA/DPMPTSP/2024"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Apoteker Penanggung Jawab *</label>
                  <input
                    type="text"
                    required
                    value={formState.pharmacistName}
                    onChange={(e) => setFormState({ ...formState, pharmacistName: e.target.value })}
                    placeholder="apt. Rina Wati, S.Farm"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor SIPA Apoteker *</label>
                  <input
                    type="text"
                    required
                    value={formState.pharmacistSipa}
                    onChange={(e) => setFormState({ ...formState, pharmacistSipa: e.target.value })}
                    placeholder="SIPA: 19920814/SIPA_31.74/2023"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-extrabold text-slate-900">Pilih Warna Utama Kop Surat</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setFormState({ ...formState, primaryColor: preset.value })}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform cursor-pointer ${preset.bgClass} ${formState.primaryColor === preset.value ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
                    title={preset.name}
                  >
                    {formState.primaryColor === preset.value && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Footer */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teks Catatan Kaki Laporan (Footer)</label>
                <textarea
                  rows={2}
                  value={formState.customFooterText}
                  onChange={(e) => setFormState({ ...formState, customFooterText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Perubahan Identitas & Kop Surat</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Live A4 PDF Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-600" />
              <span>Live Pratinjau Kop Surat & Cetakan Laporan PDF</span>
            </h2>
            <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              A4 Format Preview (Real-Time Update)
            </span>
          </div>

          {/* SIMULATED A4 PAPER SHEET */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-2xl space-y-6 relative overflow-hidden text-slate-800 transition-all min-h-[600px] flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Optional Watermark */}
              {isWatermarkOn && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
                  <p className="text-6xl font-black rotate-[-30deg] tracking-widest text-slate-900 uppercase">
                    CLINICAL EVALUATION VALIDATED
                  </p>
                </div>
              )}

              {/* PREVIEW KOP HEADER WITH REAL IMAGE LOGO OR MINIMAL HEADER */}
              {isKopOn ? (
                <div className="flex items-start justify-between pb-4 border-b-2" style={{ borderColor: formState.primaryColor || '#0d9488' }}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      {formState.logoUrl ? (
                        <img 
                          src={formState.logoUrl} 
                          alt="Logo Instansi" 
                          className="w-12 h-12 object-contain shrink-0 rounded-lg p-0.5 border border-slate-200 bg-white" 
                        />
                      ) : (
                        <div className="p-2.5 rounded-xl text-white font-black text-sm shadow-xs shrink-0" style={{ backgroundColor: formState.primaryColor || '#0d9488' }}>
                          <Building2 className="w-6 h-6" />
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">
                          {formState.clinicName || 'Nama Instansi/Klinik'}
                        </h3>
                        {formState.tagline && (
                          <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{formState.tagline}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-600 space-y-0.5 font-medium leading-tight">
                      <p className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {formState.address}</p>
                      <p className="flex items-center gap-2">
                        <span><Phone className="w-3 h-3 text-slate-400 inline mr-0.5" /> {formState.phone}</span>
                        <span>• <Mail className="w-3 h-3 text-slate-400 inline mr-0.5" /> {formState.email}</span>
                      </p>
                      {formState.licenseNumber && (
                        <p className="text-slate-500 font-semibold">{formState.licenseNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded text-[10px] font-extrabold uppercase text-white shadow-xs" style={{ backgroundColor: formState.primaryColor || '#0d9488' }}>
                      LAPORAN FARMAKOLOGI
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">Ref No: RPT-{new Date().toISOString().slice(0,10)}</p>
                  </div>
                </div>
              ) : (
                /* MINIMAL HEADER WHEN KOP IS OFF (Pre-printed Paper Mode) */
                <div className="p-3 bg-amber-50/80 border border-dashed border-amber-300 rounded-2xl flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold block">[ Kop Surat Dinonaktifkan ]</span>
                      <span className="text-[10px] text-amber-700">Ruang kosong di atas disiapkan untuk pencetakan pada lembar kertas kop fisik instansi.</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-slate-500">Ref: RPT-{new Date().toISOString().slice(0,10)}</span>
                  </div>
                </div>
              )}

              {/* PREVIEW SAMPLE REPORT CONTENT */}
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Lembar Evaluasi Interaksi Resep Pasien</p>
                    <p className="text-[11px] text-slate-500">Pasien: Ny. Saptarini (54 Thn) • No. RM: RM-994821</p>
                  </div>
                  <span className="text-[10px] font-extrabold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">Tervalidasi Sistem Farmasi</span>
                </div>

                {/* Sample Table */}
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-2">Pasangan Obat Resep</th>
                      <th className="p-2">Tingkat Keparahan</th>
                      <th className="p-2">Rekomendasi Manajerial Klinik</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-bold text-slate-900">Empagliflozin ⚡ Furosemide</td>
                      <td className="p-2"><span className="bg-amber-100 text-amber-800 font-bold text-[9px] px-1.5 py-0.5 rounded">MODERATE</span></td>
                      <td className="p-2 text-slate-600">Pantau tekanan darah & tanda dehidrasi hipovolemik.</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-900">Warfarin ⚡ Aspirin</td>
                      <td className="p-2"><span className="bg-red-100 text-red-800 font-bold text-[9px] px-1.5 py-0.5 rounded">MAJOR</span></td>
                      <td className="p-2 text-slate-600">Risiko pendarahan meningkat. Evaluasi ulang indikasi.</td>
                    </tr>
                  </tbody>
                </table>

                {/* Signature Block with DIGITAL STAMP PREVIEW OR MANUAL SIGNATURE */}
                {isSigOn ? (
                  <div className="pt-6 flex justify-end">
                    <div className="text-center space-y-1 w-52 relative">
                      {isStampOn && formState.stampUrl && (
                        <img 
                          src={formState.stampUrl} 
                          alt="Stempel Digital Transparan" 
                          className="w-16 h-16 object-contain absolute -top-5 right-4 opacity-80 pointer-events-none" 
                        />
                      )}

                      <p className="text-[11px] text-slate-600 font-medium">
                        Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br/>
                        Apoteker Penanggung Jawab,
                      </p>
                      
                      <div className="h-10 flex items-center justify-center italic text-slate-400 text-[10px]">
                        {isStampOn ? '( Tanda Tangan & Stempel Resmi )' : '( Tanda Tangan Basah Manual )'}
                      </div>

                      <div className="pt-1 border-t border-slate-400">
                        <p className="font-extrabold text-slate-900 text-xs">{formState.pharmacistName}</p>
                        <p className="text-[10px] text-slate-500 font-semibold">{formState.pharmacistSipa}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 text-right">
                    <span className="text-[10px] text-slate-400 italic bg-slate-50 px-2 py-1 rounded border border-slate-200">
                      [ Blok Tanda Tangan Apoteker Dinonaktifkan ]
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* PREVIEW FOOTER */}
            {isFooterOn ? (
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                <p className="max-w-md italic">{formState.customFooterText || 'Dokumen PIO Resmi FARMASIDRUGGIST.'}</p>
                <p className="font-bold text-slate-400 shrink-0">Halaman 1 dari 1</p>
              </div>
            ) : (
              <div className="text-center text-[10px] text-slate-400 italic pt-2">
                [ Footer Legalitas Dinonaktifkan ]
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
