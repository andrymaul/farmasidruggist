import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Building2, 
  Phone, 
  User, 
  FileText, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Save, 
  Loader2 
} from 'lucide-react';

interface CompleteProfileModalProps {
  currentUser: UserProfile;
  isMandatory: boolean;
  onSave: (updatedProfile: UserProfile) => Promise<void> | void;
  onClose: () => void;
  onLogout?: () => void;
}

export const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  currentUser,
  isMandatory,
  onSave,
  onClose,
  onLogout
}) => {
  // If currentUser.name looks like fallback (split email), allow them to easily customize it
  const defaultName = currentUser.name && currentUser.name !== currentUser.email?.split('@')[0]
    ? currentUser.name
    : '';

  const [name, setName] = useState(defaultName || currentUser.name || '');
  const [institution, setInstitution] = useState(currentUser.institution || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [licenseNumber, setLicenseNumber] = useState(currentUser.licenseNumber || '');
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanInstitution = institution.trim();
    const cleanPhone = phone.trim();
    const cleanLicense = licenseNumber.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Mohon masukkan nama lengkap Anda (minimal 2 karakter).');
      return;
    }

    if (!cleanInstitution || cleanInstitution.length < 2) {
      setError('Mohon masukkan nama instansi atau fasilitas kesehatan Anda.');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      setError('Mohon masukkan nomor WhatsApp atau nomor telepon aktif yang valid (minimal 8 digit).');
      return;
    }

    setSaving(true);
    try {
      const updatedProfile: UserProfile = {
        ...currentUser,
        name: cleanName,
        institution: cleanInstitution,
        phone: cleanPhone,
        licenseNumber: cleanLicense
      };

      await onSave(updatedProfile);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'Gagal menyimpan profil. Silakan coba lagi.');
      setSaving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => {
        if (!isMandatory) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#082025] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-[#164a51] overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0d3b36] via-[#104b46] to-[#0a2f2b] p-6 text-white relative">
          {!isMandatory && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 text-teal-200/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight font-outfit text-white">
                  {isMandatory ? 'Lengkapi Data Profil Akun' : 'Profil Pengguna'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-400/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
                  {currentUser.subscriptionPlan || 'Pemula'}
                </span>
              </div>
              <p className="text-xs text-teal-100/80 mt-0.5 font-medium">
                {isMandatory 
                  ? 'Diperlukan untuk validasi identitas & laporan klinis sebelum mengakses sistem'
                  : 'Perbarui data identitas instansi, kontak, dan nomor izin praktik Anda'}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[78vh] overflow-y-auto custom-scrollbar text-xs">
          
          {/* Mandatory Alert Notice */}
          {isMandatory && (
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-start gap-3 text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="font-extrabold font-outfit">Satu Langkah Terakhir Sebelum Memulai!</p>
                <p className="text-amber-800/90 dark:text-amber-300/80">
                  Data <strong>Instansi</strong> dan <strong>Nomor WhatsApp</strong> digunakan untuk mencetak kop laporan telaah klinis, integrasi kartu edukasi obat (PIO), serta verifikasi keamanan akses akun Anda.
                </p>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Profil berhasil disimpan! Mengalihkan ke dashboard...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email (Readonly) */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1 font-outfit">
                Email Terdaftar
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  disabled
                  value={currentUser.email || ''}
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-[#06181b] border border-slate-200 dark:border-[#143e44] rounded-xl text-slate-500 dark:text-slate-400 font-mono font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-bold mb-1 font-outfit flex items-center justify-between">
                <span>Nama Lengkap Customer / Apoteker *</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-normal">Sertakan gelar jika ada</span>
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: apt. Rulina Citra, S.Farm"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#06181b] border border-slate-200 dark:border-[#184c53] rounded-xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Instansi / Fasilitas Kesehatan */}
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-bold mb-1 font-outfit">
                Instansi / Fasilitas Kesehatan *
              </label>
              <div className="relative flex items-center">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Contoh: RS Medika Sejahtera / Apotek Sehat Farma"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#06181b] border border-slate-200 dark:border-[#184c53] rounded-xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                (Nama Rumah Sakit, Puskesmas, Klinik, Apotek, Laboratorium, atau Institusi Pendidikan)
              </p>
            </div>

            {/* Nomor WhatsApp / HP */}
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-bold mb-1 font-outfit flex items-center justify-between">
                <span>Nomor WhatsApp / HP Aktif *</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">08xx / +62</span>
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#06181b] border border-slate-200 dark:border-[#184c53] rounded-xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Nomor SIPA / SIP / STR (Opsional) */}
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-bold mb-1 font-outfit flex items-center justify-between">
                <span>Nomor SIPA / SIP / STR / Izin Praktik</span>
                <span className="text-[10px] text-slate-400 font-normal">Opsional</span>
              </label>
              <div className="relative flex items-center">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="Contoh: SIPA: 19920814/SIPA_31.74/2023/2019"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#06181b] border border-slate-200 dark:border-[#184c53] rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                Dicantumkan pada lembar validasi dokumen telaah resep dan cetak PDF resep klinis.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#164a51] flex items-center justify-between gap-3">
              {isMandatory ? (
                onLogout ? (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-bold cursor-pointer font-outfit"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar (Logout)</span>
                  </button>
                ) : <div />
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer font-outfit"
                >
                  Batal
                </button>
              )}

              <button
                type="submit"
                disabled={saving || success}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-70 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-outfit hover:scale-[1.01]"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isMandatory ? 'Simpan & Buka Dashboard' : 'Simpan Perubahan'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
