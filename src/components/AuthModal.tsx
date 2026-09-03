import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { X, Mail, Phone, Lock, Eye, EyeOff, Building2, RefreshCw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { loginWithEmail, registerWithEmail, resendVerificationEmail } from '../firebase';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onNewAccountCreated?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess, onNewAccountCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email verification state
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

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


  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isConfirmMatch = confirmPassword.length > 0 && confirmPassword === password;

  const handleCustomLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResendSuccess(null);

    try {
      if (isRegister) {
        if (password.length < 6) {
          setError('Kata sandi minimal 6 karakter.');
          setLoading(false);
          return;
        }
        if (!/[A-Z]/.test(password)) {
          setError('Kata sandi wajib mengandung setidaknya 1 huruf besar (A-Z).');
          setLoading(false);
          return;
        }
        if (!/[0-9]/.test(password)) {
          setError('Kata sandi wajib mengandung setidaknya 1 angka (0-9).');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Konfirmasi kata sandi tidak cocok.');
          setLoading(false);
          return;
        }

        const res = await registerWithEmail(email, password, name, phone, institution);
        if (res.userProfile && onNewAccountCreated) {
          onNewAccountCreated(res.userProfile);
        }
        if (res.emailSent) {
          setUnverifiedEmail(res.emailSent);
          setResendCooldown(30);
        }
      } else {
        const res = await loginWithEmail(email, password);
        if (res.emailUnverified) {
          setUnverifiedEmail(res.emailUnverified);
        } else if (res.user) {
          if (onNewAccountCreated) {
            onNewAccountCreated(res.user);
          }
          onLoginSuccess(res.user);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Email or password is incorrect');
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
      setResendCooldown(45);
    } catch (err: any) {
      setError(err?.message || 'Could not resend email verification.');
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
    setConfirmPassword('');
    setError(null);
    setResendSuccess(null);
  };

  // VERIFICATION SCREEN
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

          {/* Mail Icon */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200/80 flex items-center justify-center text-[#0f766e] shadow-inner">
              <Mail className="w-10 h-10 animate-bounce text-[#0f766e]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold rounded-full">
              Email Verification
            </span>
            <h2 className="text-xl font-black text-slate-900">Email Verification</h2>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-xs leading-relaxed">
              We have sent you a verification email to <span className="font-bold text-teal-800 font-mono break-all">{unverifiedEmail}</span>. Please verify it and log in.
            </div>
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
              <span>Login</span>
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
                  ? 'Sending...' 
                  : resendCooldown > 0 
                    ? `Resend Email (${resendCooldown}s)` 
                    : 'Resend Verification Email'}
              </span>
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
          <h2 className="text-xl font-black text-[#082a24] dark:text-white pt-1 font-outfit">
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
                <label className="font-extrabold text-slate-700 block mb-1">Instansi / Institusi</label>
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
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  (contoh: Nama RS, puskesmas, klinik, apotek, perusahaan, atau kampus/sekolah)
                </p>
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
                placeholder={isRegister ? "Minimal 6 karakter, huruf besar & angka" : "Minimal 6 karakter"}
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

            {/* Indikator Ketentuan Sandi Saat Registrasi */}
            {isRegister && (
              <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-slate-600 text-[10.5px]">Ketentuan Kata Sandi:</div>
                <div className="grid grid-cols-1 gap-1">
                  <div className={`flex items-center gap-1.5 transition-colors ${hasMinLength ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${hasMinLength ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>Minimal 6 karakter</span>
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors ${hasUppercase ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${hasUppercase ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>Wajib ada huruf besar (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors ${hasNumber ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${hasNumber ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>Wajib ada angka (0-9)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Kolom Konfirmasi Kata Sandi Saat Registrasi */}
          {isRegister && (
            <div>
              <label className="font-extrabold text-slate-700 block mb-1">Konfirmasi Kata Sandi</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className={`w-full pl-9 pr-10 py-2.5 bg-slate-50 rounded-xl border text-slate-900 font-bold focus:outline-none focus:bg-white transition-colors ${
                    confirmPassword && !isConfirmMatch
                      ? 'border-rose-400 focus:border-rose-500'
                      : confirmPassword && isConfirmMatch
                        ? 'border-emerald-500 focus:border-emerald-600'
                        : 'border-slate-200 focus:border-teal-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showConfirmPassword ? 'Sembunyikan password' : 'Lihat password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && !isConfirmMatch && (
                <p className="text-[11px] text-rose-600 font-bold mt-1">
                  Konfirmasi kata sandi tidak cocok.
                </p>
              )}
              {confirmPassword && isConfirmMatch && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kata sandi cocok</span>
                </p>
              )}
            </div>
          )}

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
            <span>Sudah punya akun? <button onClick={() => { setIsRegister(false); setConfirmPassword(''); setError(null); }} className="text-[#0f766e] font-black hover:underline cursor-pointer">Masuk di sini</button></span>
          ) : (
            <span>Belum punya akun? <button onClick={() => { setIsRegister(true); setConfirmPassword(''); setError(null); }} className="text-[#0f766e] font-black hover:underline cursor-pointer">Daftar akun baru</button></span>
          )}
        </div>


      </div>
    </div>
  );
};
