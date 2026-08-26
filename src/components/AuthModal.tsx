import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { X, Mail, Phone, Lock, Eye, EyeOff, Building2, RefreshCw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { loginWithEmail, registerWithEmail, loginWithGoogle, resendVerificationEmail } from '../firebase';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onNewAccountCreated?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess, onNewAccountCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verification states
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Timer effect for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      if (onNewAccountCreated) {
        onNewAccountCreated(user);
      }
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err?.message || 'Gagal masuk dengan Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResendSuccess(null);

    try {
      if (isRegister) {
        const res = await registerWithEmail(email, password, name, phone, institution);
        if (res.emailSent) {
          setUnverifiedEmail(res.emailSent);
          setResendCooldown(30); // 30s cooldown after registration
        } else if (res.user) {
          if (onNewAccountCreated) {
            onNewAccountCreated(res.user);
          }
          onLoginSuccess(res.user);
        }
      } else {
        const res = await loginWithEmail(email, password);
        if (res.user) {
          if (onNewAccountCreated) {
            onNewAccountCreated(res.user);
          }
          onLoginSuccess(res.user);
        } else if (res.emailUnverified) {
          setUnverifiedEmail(res.emailUnverified);
          setError('Email Anda belum diverifikasi. Silakan periksa inbox / spam Anda.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Gagal memproses permintaan Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!unverifiedEmail || resendCooldown > 0 || resendLoading) return;
    setResendLoading(true);
    setError(null);
    setResendSuccess(null);

    try {
      const res = await resendVerificationEmail(unverifiedEmail, password);
      setResendSuccess(res.message);
      setResendCooldown(45); // 45s cooldown
    } catch (err: any) {
      setError(err?.message || 'Gagal mengirim ulang email verifikasi.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleProceedToLogin = () => {
    if (unverifiedEmail) {
      setEmail(unverifiedEmail);
    }
    setUnverifiedEmail(null);
    setIsRegister(false);
    setError(null);
    setResendSuccess(null);
  };

  // UNVERIFIED EMAIL VIEW
  if (unverifiedEmail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5 text-center">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Mail Icon Animation */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200/80 flex items-center justify-center text-[#0f766e] shadow-inner">
              <Mail className="w-10 h-10 animate-bounce text-[#0f766e]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold rounded-full">
              Wajib Verifikasi Email
            </span>
            <h2 className="text-xl font-black text-slate-900">Verifikasi Email Anda</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tautan verifikasi telah dikirimkan ke alamat email:
            </p>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-xs break-all select-all">
              {unverifiedEmail}
            </div>
          </div>

          {/* Spam notice box */}
          <div className="p-3.5 bg-teal-50/70 border border-teal-200/70 rounded-2xl text-left space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#0f766e]">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#0f766e]" />
              <span>Petunjuk Penting:</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 pl-5 list-disc leading-relaxed">
              <li>Buka kotak masuk email Anda dan klik <strong>tautan verifikasi</strong>.</li>
              <li>Jika tidak ada di Inbox, periksa folder <strong>Spam</strong>, <strong>Junk</strong>, atau tab <strong>Promotions / Updates</strong>.</li>
            </ul>
          </div>

          {/* Success Banner */}
          {resendSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 text-left animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{resendSuccess}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleProceedToLogin}
              className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-black rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Saya Sudah Verifikasi / Coba Masuk</span>
            </button>

            <button
              type="button"
              onClick={handleResendEmail}
              disabled={resendLoading || resendCooldown > 0}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed text-slate-800 font-bold rounded-xl border border-slate-300 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resendLoading ? 'animate-spin' : ''}`} />
              <span>
                {resendLoading 
                  ? 'Mengirim Ulang...' 
                  : resendCooldown > 0 
                    ? `Kirim Ulang (${resendCooldown}s)` 
                    : 'Kirim Ulang Email Verifikasi'}
              </span>
            </button>

            <button
              onClick={() => {
                setUnverifiedEmail(null);
                setError(null);
                setResendSuccess(null);
              }}
              className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline hover:no-underline pt-1 block mx-auto"
            >
              Ganti email pendaftaran
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN LOGIN / REGISTER VIEW
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-7 space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5">
          <Logo size="md" className="justify-center" />
          <h2 className="text-xl font-black text-[#082a24] pt-1">
            {isRegister ? 'Daftar Akun Baru' : 'Masuk Akun'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Platform Informasi Obat & Evaluasi Interaksi Klinis
          </p>
        </div>

        {/* Info Banner when registering */}
        {isRegister && (
          <div className="p-3 bg-teal-50 border border-teal-200/80 rounded-xl text-[11px] text-teal-800 font-semibold flex items-start gap-2">
            <Mail className="w-4 h-4 text-[#0f766e] shrink-0 mt-0.5" />
            <span>Setelah mendaftar, tautan verifikasi akan otomatis dikirimkan ke alamat email Anda.</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center shadow-2xs">
            {error}
          </div>
        )}

        {/* Form Masuk / Daftar */}
        <form onSubmit={handleCustomLoginSubmit} className="space-y-3.5 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="apt. Budi Santoso, S.Farm"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Instansi / Klinik / RS / Apotek</label>
                <div className="relative flex items-center">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Contoh: RS Medika Sejahtera / Apotek K-24"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>Nomor Telepon / WhatsApp</span>
                  <span className="text-[10px] text-teal-700 font-semibold font-mono">+62 / 08xx</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-extrabold text-slate-700 block mb-1">Email</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="font-extrabold text-slate-700 block mb-1">Kata Sandi</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] disabled:bg-teal-400 text-white font-black rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : isRegister ? (
              'Daftar Akun & Kirim Verifikasi'
            ) : (
              'Masuk dengan Email'
            )}
          </button>
        </form>

        {/* Toggle Register / Login Link */}
        <div className="text-center text-xs text-slate-500 font-medium">
          {isRegister ? (
            <span>Sudah punya akun? <button onClick={() => { setIsRegister(false); setError(null); }} className="text-[#0f766e] font-black hover:underline cursor-pointer">Masuk di sini</button></span>
          ) : (
            <span>Belum punya akun? <button onClick={() => { setIsRegister(true); setError(null); }} className="text-[#0f766e] font-black hover:underline cursor-pointer">Daftar akun baru</button></span>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center text-[11px] text-slate-400 font-semibold">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 whitespace-nowrap text-slate-500">Atau</span>
          <div className="border-t border-slate-200 w-full" />
        </div>

        {/* Lanjutkan dengan Akun Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold rounded-xl shadow-xs transition-all text-xs flex items-center justify-center gap-2.5 cursor-pointer hover:border-slate-400 hover:scale-[1.01]"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Lanjutkan dengan Akun Google</span>
        </button>

      </div>
    </div>
  );
};
