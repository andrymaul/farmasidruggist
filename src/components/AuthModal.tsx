import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { X, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { loginWithEmail, registerWithEmail, loginWithGoogle } from '../firebase';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onNewAccountCreated?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess, onNewAccountCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

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
    try {
      if (isRegister) {
        const res = await registerWithEmail(email, password, name, phone);
        if (res.user) {
          if (onNewAccountCreated) {
            onNewAccountCreated(res.user);
          }
          onLoginSuccess(res.user);
        } else if (res.emailSent) {
          setUnverifiedEmail(res.emailSent);
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
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Gagal masuk. Silakan periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (roleType: 'admin' | 'pro' | 'free') => {
    let demoUser: UserProfile;

    if (roleType === 'admin') {
      demoUser = {
        uid: 'demo-admin-001',
        email: 'admin@farmasidruggist.com',
        name: 'Apoteker Administrator Main',
        phone: '081234567890',
        role: 'admin',
        subscriptionPlan: 'Klinik',
        subscriptionStatus: 'active',
        createdAt: new Date().toISOString()
      };
    } else if (roleType === 'pro') {
      demoUser = {
        uid: 'demo-pro-002',
        email: 'farmasis.klinik@gmail.com',
        name: 'apt. Rina Wati, S.Farm',
        phone: '081398765432',
        role: 'customer',
        subscriptionPlan: 'Pro',
        subscriptionStatus: 'active',
        createdAt: new Date().toISOString()
      };
    } else {
      demoUser = {
        uid: 'demo-free-003',
        email: 'user.gratis@gmail.com',
        name: 'Mahasiswa Farmasi Demo',
        phone: '085712345678',
        role: 'free',
        subscriptionPlan: 'Gratis',
        subscriptionStatus: 'trial',
        createdAt: new Date().toISOString()
      };
    }

    onLoginSuccess(demoUser);
  };

  if (unverifiedEmail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-6 text-center">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">Verifikasi Email Diperlukan</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kami telah mengirimkan tautan verifikasi ke email <span className="font-bold text-slate-900">{unverifiedEmail}</span>. Silakan buka email Anda, lakukan verifikasi, lalu masuk kembali.
            </p>
          </div>

          <button
            onClick={() => {
              setUnverifiedEmail(null);
              setIsRegister(false);
              setError(null);
            }}
            className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            Masuk Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
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

        {/* Error Alert Banner */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center shadow-2xs">
            {error}
          </div>
        )}

        {/* 1. PALING ATAS: Form Masuk dengan Email */}
        <form onSubmit={handleCustomLoginSubmit} className="space-y-3 text-xs">
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
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="font-extrabold text-slate-700 block mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] disabled:bg-teal-400 text-white font-black rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : isRegister ? (
              'Daftar Akun Baru'
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

        {/* 2. KEDUA: Lanjutkan dengan Akun Google */}
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
