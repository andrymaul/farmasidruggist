import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { UserProfile } from '../types';
import { 
  Menu, 
  X,
  Sparkles, 
  Pill, 
  CreditCard, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  Stethoscope, 
  Sun, 
  Moon 
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenPricingModal: () => void;
  onOpenBrandingModal?: () => void;
  onToggleMobileSidebar?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenPricingModal,
  onToggleMobileSidebar,
  theme = 'dark',
  onToggleTheme
}) => {
  const [landingMobileMenuOpen, setLandingMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = activeTab === 'landing';

  // Landing Header Rendering
  if (isLanding) {
    return (
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#06191c]/95 backdrop-blur-2xl border-b border-[#3dbfd1]/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-[#071c21]/90 backdrop-blur-xl border-b border-teal-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.3)]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <button 
              onClick={() => setActiveTab('landing')}
              className="focus:outline-none flex items-center gap-2 group text-left cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <Logo size="md" variant="dark" />
            </button>

            {/* Nav Items on Landing */}
            <nav className="hidden md:flex items-center space-x-1 text-xs font-bold font-outfit">
              <button
                onClick={() => setActiveTab('landing')}
                className="text-teal-300 bg-teal-500/15 border border-teal-500/30 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-[0_0_12px_rgba(20,184,166,0.2)]"
              >
                Beranda
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    onOpenAuthModal();
                  } else {
                    setActiveTab('drugs');
                  }
                }}
                className="text-slate-300 hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Pill className="w-3.5 h-3.5 text-teal-400" />
                <span>Katalog Obat</span>
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    onOpenAuthModal();
                  } else {
                    setActiveTab('polypharmacy');
                  }
                }}
                className="text-slate-300 hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                <span>Evaluasi Polifarmasi</span>
              </button>
              <button
                onClick={onOpenPricingModal}
                className="text-slate-300 hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                <span>Harga Layanan</span>
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              
              {/* Dark/Light Mode Switcher on Landing */}
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
                  className="p-2 rounded-xl text-teal-300 hover:text-white bg-[#0a2f38]/80 hover:bg-[#0e3c47] border border-teal-700/50 transition-all flex items-center justify-center cursor-pointer shadow-xs hover:scale-105"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-teal-300" />
                  )}
                </button>
              )}

              {!currentUser ? (
                <>
                  <button
                    onClick={onOpenAuthModal}
                    className="px-4 py-2 text-xs font-bold text-teal-200 hover:text-white bg-[#0a272f]/80 hover:bg-[#0c2f37] border border-teal-700/60 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-105 font-outfit"
                  >
                    <LogIn className="w-3.5 h-3.5 text-teal-400" />
                    <span>Masuk Akun</span>
                  </button>
                  <button
                    onClick={onOpenPricingModal}
                    className="px-4 py-2 text-xs font-black text-slate-950 btn-amber-gradient rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 font-outfit"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Berlangganan</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 text-xs font-bold text-white btn-teal-gradient rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <span>Buka Workspace</span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Keluar Akun"
                    className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800/80 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer border border-slate-700/50"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle on Landing */}
            <div className="flex md:hidden items-center gap-2">
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="p-2 rounded-xl text-teal-300 bg-[#0a2f38] border border-teal-700/50"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-teal-300" />}
                </button>
              )}
              <button
                onClick={() => setLandingMobileMenuOpen(!landingMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-teal-300 hover:bg-[#0c2f37]"
                aria-label="Toggle Landing Menu"
              >
                {landingMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown on Landing */}
        {landingMobileMenuOpen && (
          <div className="md:hidden bg-[#071c21] border-b border-[#133c46] px-4 pt-2 pb-6 space-y-3">
            <button
              onClick={() => { setActiveTab('landing'); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-teal-300 bg-[#0c2b33]"
            >
              Beranda
            </button>
            <button
              onClick={() => { 
                setLandingMobileMenuOpen(false);
                if (!currentUser) {
                  onOpenAuthModal();
                } else {
                  setActiveTab('drugs');
                }
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#0c2b33]"
            >
              Katalog Obat
            </button>
            <button
              onClick={() => { 
                setLandingMobileMenuOpen(false);
                if (!currentUser) {
                  onOpenAuthModal();
                } else {
                  setActiveTab('polypharmacy');
                }
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#0c2b33]"
            >
              Evaluasi Polifarmasi
            </button>
            <button
              onClick={() => { onOpenPricingModal(); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#0c2b33]"
            >
              Harga Layanan
            </button>
            
            <div className="pt-3 border-t border-[#133c46] flex flex-col gap-2">
              {!currentUser ? (
                <>
                  <button
                    onClick={() => { onOpenAuthModal(); setLandingMobileMenuOpen(false); }}
                    className="w-full py-2.5 text-center text-xs font-bold text-teal-200 bg-[#0a272f] rounded-xl border border-teal-700/60"
                  >
                    Masuk Akun
                  </button>
                  <button
                    onClick={() => { onOpenPricingModal(); setLandingMobileMenuOpen(false); }}
                    className="w-full py-2.5 text-center text-xs font-black text-slate-950 bg-amber-400 rounded-xl shadow-xs"
                  >
                    Berlangganan
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setActiveTab('dashboard'); setLandingMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0f766e] rounded-xl shadow-xs"
                >
                  Buka Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }

  // App Topbar Rendering (When Sidebar is active)
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return { title: 'Dashboard Utama', desc: 'Ringkasan aktivitas & analisis obat klinis' };
      case 'drugs': return { title: 'Katalog Informasi Obat', desc: 'Direktori komprehensif indikasi, dosis & efek samping' };
      case 'polypharmacy': return { title: 'Evaluasi Klinis & Penapisan Polifarmasi', desc: 'Parameter klinis pasien, penapisan resep, generator jadwal harian & interaksi makanan/gaya hidup' };
      case 'interactions': return { title: 'Deteksi Interaksi Obat (Evaluasi Klinis)', desc: 'Pemeriksaan potensi efek samping & tingkat keparahan' };
      case 'usage': return { title: 'Panduan Penggunaan Obat', desc: 'Petunjuk langkah demi langkah tata cara penggunaan sediaan obat khusus' };
      case 'history': return { title: 'Riwayat Pemeriksaan', desc: 'Rekam jejak simulasi & penelusuran interaksi' };
      case 'pricing': return { title: 'Paket & Langganan', desc: 'Pilih lisensi layanan yang sesuai untuk fasilitas kesehatan Anda' };
      case 'renal-adjuster': return { title: 'Kalkulator Dosis Pediatrik & Penyesuaian Ginjal', desc: 'Perhitungan dosis anak berbasis BB/Usia/BSA & penyesuaian dosis ginjal CrCl/eGFR' };
      case 'sop': return { title: 'Standar Operasional Prosedur (SOP) Farmasi', desc: 'Kumpulan SOP Pelayanan Kefarmasian berstandar Permenkes No. 73/2016 & CDOB BPOM' };
      case 'regulations': return { title: 'Regulasi & Kebijakan Farmasi Indonesia', desc: 'Kompilasi UU Kesehatan No. 17/2023, Narkotika, Psikotropika, Permenkes No. 73/2016, DOWA & PerBPOM' };
      case 'admin': return { title: 'Panel Administrasi', desc: 'Manajemen basis data obat & aturan interaksi' };
      case 'subscriptions': return { title: 'Manajemen Berlangganan Customer', desc: 'Pengelolaan lisensi subskripsi, perpanjangan masa aktif & akun pelanggan' };
      default: return { title: 'Farmasi & Klinik DDI Interaksi', desc: 'Platform Integrasi Klinis Penilaian Interaksi Obat' };
    }
  };

  const { title, desc } = getTabTitle(activeTab);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 print:hidden ${
      isScrolled 
        ? 'bg-white/95 dark:bg-[#06191c]/95 backdrop-blur-2xl border-b border-[#3dbfd1]/30 shadow-[0_8px_30px_rgba(21,109,103,0.12)] dark:shadow-[0_8px_35px_rgba(0,0,0,0.6)]' 
        : 'bg-white/85 dark:bg-[#071c21]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-teal-500/20 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
    }`}>
      <div className="flex items-center justify-between gap-4">
        
        {/* Mobile Sidebar Toggle & Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-teal-300 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-[#0c2f37] transition-colors"
              aria-label="Buka Menu Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <div className="md:hidden">
            <button onClick={() => setActiveTab(currentUser ? 'dashboard' : 'landing')}>
              <Logo size="sm" variant={theme === 'dark' ? 'dark' : 'light'} />
            </button>
          </div>

          {/* Desktop Tab Header Info */}
          <div className="hidden md:block">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#082a24] dark:text-teal-200 tracking-tight flex items-center gap-2 font-outfit">
              {title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-teal-100/70 hidden lg:block font-medium">{desc}</p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Dark/Light Mode Switcher */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
              className="p-2 rounded-xl text-slate-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-white bg-slate-100/80 dark:bg-[#0a2f38]/90 border border-slate-200 dark:border-teal-500/30 transition-all flex items-center justify-center cursor-pointer shadow-xs hover:scale-105"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 fill-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-teal-800" />
              )}
            </button>
          )}

          {/* Quick Pricing Badge */}
          {currentUser && currentUser.subscriptionPlan === 'Gratis' && (
            <button
              onClick={onOpenPricingModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_2px_10px_rgba(245,158,11,0.3)] cursor-pointer font-outfit"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              Upgrade ke Pro
            </button>
          )}

          {/* User Account / Auth Actions */}
          {!currentUser ? (
            <div className="flex items-center gap-2 font-outfit">
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-1.5 text-xs font-bold text-teal-900 dark:text-teal-200 bg-teal-50 dark:bg-[#0a272f] rounded-xl border border-teal-300 dark:border-teal-700/60 hover:bg-teal-100 dark:hover:bg-[#0e3742] transition-colors cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={onOpenPricingModal}
                className="px-4 py-1.5 text-xs font-bold text-white btn-teal-gradient rounded-xl shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
              >
                Berlangganan
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Header profile chip on desktop */}
              <div className="hidden sm:flex items-center gap-2 pl-3 py-1 pr-1.5 bg-slate-50/90 dark:bg-[#0c2f37]/90 rounded-full border border-slate-200/90 dark:border-teal-500/30 shadow-2xs">
                <span className="text-xs font-bold text-slate-800 dark:text-white font-outfit">{currentUser.name}</span>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-300 border border-teal-300 dark:border-teal-600/60 flex items-center gap-1 font-outfit">
                  <ShieldCheck className="w-3 h-3 text-teal-700 dark:text-teal-400" />
                  {currentUser.subscriptionPlan}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Keluar / Logout"
                className="px-3 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 rounded-xl transition-colors flex items-center gap-1 cursor-pointer font-outfit"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
