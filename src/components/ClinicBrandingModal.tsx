import React, { useState } from 'react';
import { ClinicBrandingSettings } from '../types';
import { X, Building2, Save, FileText, Check, Stamp, UserCheck, Phone, MapPin, Sparkles, Image, Power, Layers } from 'lucide-react';

interface ClinicBrandingModalProps {
  branding: ClinicBrandingSettings;
  onSave: (updatedBranding: ClinicBrandingSettings) => void;
  onClose: () => void;
}

export const ClinicBrandingModal: React.FC<ClinicBrandingModalProps> = ({
  branding,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState<ClinicBrandingSettings>({
    ...branding,
    enableHeaderKop: branding.enableHeaderKop ?? true,
    enableDigitalStamp: branding.enableDigitalStamp ?? true,
    enablePharmacistSignature: branding.enablePharmacistSignature ?? true,
    enableFooter: branding.enableFooter ?? true,
    showWatermark: branding.showWatermark ?? true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const isKopOn = formData.enableHeaderKop !== false;
  const isStampOn = formData.enableDigitalStamp !== false;
  const isSigOn = formData.enablePharmacistSignature !== false;
  const isWatermarkOn = formData.showWatermark !== false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto print:hidden">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 rounded-2xl border border-teal-500/30 text-teal-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Pengaturan Kop Surat & Stempel Digital</h2>
              <p className="text-xs text-slate-300">Integrasi Nama Apotek/Klinik, SIPA, Logo, & Sakelar ON/OFF Cetak PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar text-xs">
          
          {/* SAKELAR ON/OFF ELEMEN CETAK */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Power className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-teal-300">Sakelar ON / OFF Elemen Dokumen Cetak</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Kop Toggle */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, enableHeaderKop: !isKopOn })}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isKopOn ? 'bg-teal-600/30 text-teal-200 border-teal-500/50 font-bold' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <p className="text-[10px] text-slate-400">Kop Surat</p>
                <p className="text-xs font-black mt-0.5">{isKopOn ? '🟢 ON' : '⚪ OFF'}</p>
              </button>

              {/* Stamp Toggle */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, enableDigitalStamp: !isStampOn })}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isStampOn ? 'bg-teal-600/30 text-teal-200 border-teal-500/50 font-bold' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <p className="text-[10px] text-slate-400">Stempel</p>
                <p className="text-xs font-black mt-0.5">{isStampOn ? '🟢 ON' : '⚪ OFF'}</p>
              </button>

              {/* Signature Toggle */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, enablePharmacistSignature: !isSigOn })}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSigOn ? 'bg-teal-600/30 text-teal-200 border-teal-500/50 font-bold' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <p className="text-[10px] text-slate-400">Tanda Tangan</p>
                <p className="text-xs font-black mt-0.5">{isSigOn ? '🟢 ON' : '⚪ OFF'}</p>
              </button>

              {/* Watermark Toggle */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, showWatermark: !isWatermarkOn })}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isWatermarkOn ? 'bg-teal-600/30 text-teal-200 border-teal-500/50 font-bold' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <p className="text-[10px] text-slate-400">Watermark</p>
                <p className="text-xs font-black mt-0.5">{isWatermarkOn ? '🟢 ON' : '⚪ OFF'}</p>
              </button>
            </div>
          </div>

          {/* Section 1: Profil Instansi */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-2 border-b border-slate-200 pb-2">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Identitas Resmi Klinik / Apotek</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Klinik / Apotek *</label>
                <input
                  type="text"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  placeholder="Klinik & Apotek Medika Sejahtera"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline / Slogan</label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Pusat Pelayanan Farmasi Klinis"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Alamat Lengkap *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Jl. Jendral Sudirman No. 45, Jakarta"
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">No. Kontak / WA</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(021) 555-0199"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">No. Izin Operasional / SIA</label>
                <input
                  type="text"
                  value={formData.licenseNumber || ''}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="SIA: 449.1/092/SIA/2024"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Data Apoteker Penanggung Jawab */}
          <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200 space-y-3">
            <h3 className="font-extrabold text-teal-950 text-xs flex items-center gap-2 border-b border-teal-200/80 pb-2">
              <UserCheck className="w-4 h-4 text-teal-700" />
              <span>Apoteker Penanggung Jawab & Legalisasi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-teal-950 block mb-1">Nama Lengkap & Gelar Apoteker</label>
                <input
                  type="text"
                  value={formData.pharmacistName}
                  onChange={(e) => setFormData({ ...formData, pharmacistName: e.target.value })}
                  placeholder="apt. Budi Santoso, S.Farm."
                  className="w-full px-3 py-2 bg-white rounded-xl border border-teal-200 font-bold text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-teal-950 block mb-1">Nomor SIPA / NIPA Resmi</label>
                <input
                  type="text"
                  value={formData.pharmacistSipa}
                  onChange={(e) => setFormData({ ...formData, pharmacistSipa: e.target.value })}
                  placeholder="SIPA: 19940825/SIPA-31.71/2026/2088"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-teal-200 font-semibold text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Gambar Stempel Digital & Logo */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-3">
            <h3 className="font-extrabold text-amber-950 text-xs flex items-center gap-2 border-b border-amber-200/80 pb-2">
              <Stamp className="w-4 h-4 text-amber-700" />
              <span>Stempel Digital & Logo Instansi (PNG Transparan)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-amber-950 block mb-1">URL / Gambar Stempel Digital Resmi</label>
                <input
                  type="text"
                  value={formData.stampUrl || ''}
                  onChange={(e) => setFormData({ ...formData, stampUrl: e.target.value })}
                  placeholder="https://... / URL Stempel PNG Transparan"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-amber-200 font-semibold text-amber-950 focus:ring-2 focus:ring-amber-500 focus:outline-none mb-1.5"
                />
                <p className="text-[10px] text-amber-800">
                  Stempel akan otomatis ditempel di atas tanda tangan apoteker pada dokumen PDF.
                </p>
              </div>

              <div>
                <label className="font-bold text-amber-950 block mb-1">URL / Gambar Logo Instansi</label>
                <input
                  type="text"
                  value={formData.logoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://... / URL Logo PNG"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-amber-200 font-semibold text-amber-950 focus:ring-2 focus:ring-amber-500 focus:outline-none mb-1.5"
                />
                <p className="text-[10px] text-amber-800">
                  Logo akan ditampilkan di sisi kiri Kop Surat dokumen.
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Kop Surat Preview */}
          <div className="space-y-1.5">
            <span className="font-extrabold text-slate-700 block text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Pratinjau Kop Surat PDF Real-Time</span>
            </span>

            <div className="p-3 bg-white rounded-2xl border-2 border-teal-600/30 shadow-xs space-y-2">
              {isKopOn ? (
                <div className="border-b border-teal-700 pb-2 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-teal-950 uppercase">{formData.clinicName || 'Nama Klinik/Apotek'}</h4>
                    <p className="text-[10px] text-slate-600 font-medium">{formData.address || 'Alamat Klinik'}</p>
                  </div>
                  <div className="text-right text-[9px] text-slate-500 font-bold">
                    <p className="text-teal-800">LEMBAR RESMI PIO</p>
                    <p>Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              ) : (
                <div className="p-2 bg-amber-50 rounded-xl text-center text-amber-800 font-bold text-[10px] border border-amber-200">
                  [ Kop Surat Dinonaktifkan - Menggunakan Kertas Kop Fisik ]
                </div>
              )}

              {isSigOn && (
                <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1">
                  <span>Apoteker Penanggung Jawab: <strong>{formData.pharmacistName}</strong></span>
                  <span>{formData.pharmacistSipa}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengaturan Kop & Stempel</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
