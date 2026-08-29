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
  HeartPulse,
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
          ? 'bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-md' 
          : 'bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <button 
              onClick={() => setActiveTab('landing')}
              className="focus:outline-none flex items-center gap-2 group text-left cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <Logo size="md" variant={theme === 'dark' ? 'dark' : 'light'} />
            </button>

            {/* Nav Items on Landing */}
            <nav className="hidden md:flex items-center space-x-1 text-xs font-bold font-outfit">
              <button
                onClick={() => setActiveTab('landing')}
                className="text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
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
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Pill className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Katalog Obat</span>
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    onOpenAuthModal();
                  } else {
                    setActiveTab('interactions');
                  }
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                <span>Cek Interaksi</span>
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    onOpenAuthModal();
                  } else {
                    setActiveTab('polypharmacy');
                  }
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5 text-indigo-500" />
                <span>Evaluasi Polifarmasi</span>
              </button>
              <button
                onClick={onOpenPricingModal}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                <span>Harga Layanan</span>
              </button>
            </nav>

            {/* Right Action Buttons on Landing */}
            <div className="hidden md:flex items-center space-x-3">
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
                  className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-xs hover:scale-105"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-teal-700" />
                  )}
                </button>
              )}

              {!currentUser ? (
                <>
                  <button
                    onClick={onOpenAuthModal}
                    className="text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-300 text-xs font-bold px-3 py-2 transition-colors cursor-pointer font-outfit"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={onOpenPricingModal}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer font-outfit"
                  >
                    Mulai Sekarang
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer font-outfit"
                  >
                    Buka Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    title="Keluar / Logout"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button on Landing */}
            <div className="flex items-center md:hidden gap-2">
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-700" />}
                </button>
              )}
              <button
                onClick={() => setLandingMobileMenuOpen(!landingMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {landingMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown on Landing */}
        {landingMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => { setActiveTab('landing'); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-teal-600 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40"
            >
              Beranda
            </button>
            <button
              onClick={() => { setActiveTab('drugs'); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Katalog Obat
            </button>
            <button
              onClick={() => { setActiveTab('interactions'); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cek Interaksi
            </button>
            <button
              onClick={() => { setActiveTab('polypharmacy'); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Evaluasi Polifarmasi
            </button>
            <button
              onClick={() => { onOpenPricingModal(); setLandingMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Harga Layanan
            </button>
            
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              {!currentUser ? (
                <>
                  <button
                    onClick={() => { onOpenAuthModal(); setLandingMobileMenuOpen(false); }}
                    className="w-full py-2.5 text-center text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
                  >
                    Masuk Akun
                  </button>
                  <button
                    onClick={() => { onOpenPricingModal(); setLandingMobileMenuOpen(false); }}
                    className="w-full py-2.5 text-center text-xs font-black text-white bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl shadow-xs"
                  >
                    Berlangganan
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setActiveTab('dashboard'); setLandingMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-teal-600 rounded-xl shadow-xs"
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
      case 'guidelines': return { title: 'Panduan Terapi Klinis Indonesia', desc: 'Pedoman Nasional Pelayanan Kedokteran (PNPK) & Konsensus Organisasi Profesi Spesialis RI' };
      case 'polypharmacy': return { title: 'Evaluasi Klinis & Penapisan Polifarmasi', desc: 'Parameter klinis pasien, penapisan resep, generator jadwal harian & interaksi makanan' };
      case 'interactions': return { title: 'Deteksi Interaksi Obat (Evaluasi Klinis)', desc: 'Pemeriksaan potensi efek samping & tingkat keparahan' };
      case 'side-effects': return { title: 'Pusat Analisis Efek Samping & Toksisitas Organ', desc: 'Evaluasi toksisitas kumulatif multi-obat, pelacak gejala KTD & algoritma farmakovigilans BPOM' };
      case 'usage': return { title: 'Panduan Penggunaan Obat', desc: 'Petunjuk langkah demi langkah tata cara penggunaan sediaan obat khusus' };
      case 'history': return { title: 'Riwayat Pemeriksaan', desc: 'Rekam jejak simulasi & penelusuran interaksi' };
      case 'renal-adjuster': return { title: 'Kalkulator Medis & Penyesuaian Dosis', desc: 'Suite kalkulator farmako-klinis terpadu: Dosis Ginjal, Hepar, Syringe Pump, Opioid, IBW, dan Skor Klinis' };
      case 'pediatric': return { title: 'Kalkulator Dosis Pediatrik & Puyer', desc: 'Perhitungan dosis anak berbasis BB/BSA, konversi puyer, takaran sirup & batas dosis toksik' };
      case 'iv-compatibility': return { title: 'Uji Kompatibilitas Injeksi IV', desc: 'Skrining kompatibilitas percabangan Y-Site, presipitasi pelarut infus & stabilitas rekonstitusi' };
      case 'whatsapp-pio': return { title: 'Kartu PIO Pasien WhatsApp', desc: 'Generator kartu edukasi aturan pakai & etiket resep siap kirim langsung ke WhatsApp pasien' };
      case 'sop': return { title: 'Standar Operasional Prosedur (SOP) Farmasi', desc: 'Kumpulan SOP Pelayanan Kefarmasian berstandar Permenkes No. 73/2016 & BPOM' };
      case 'regulations': return { title: 'Regulasi & Kebijakan Farmasi Indonesia', desc: 'Kompilasi UU Kesehatan No. 17/2023, Narkotika, Psikotropika, DOWA & PerBPOM' };
      case 'admin': return { title: 'Panel Administrasi', desc: 'Manajemen basis data obat & aturan interaksi' };
      case 'subscriptions': return { title: 'Manajemen Berlangganan Customer', desc: 'Pengelolaan lisensi subskripsi, perpanjangan masa aktif & akun pelanggan' };
      default: return { title: 'Farmasi & Klinik DDI Interaksi', desc: 'Platform Integrasi Klinis Penilaian Interaksi Obat' };
    }
  };

  const { title, desc } = getTabTitle(activeTab);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 print:hidden ${
      isScrolled 
        ? 'bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-sm' 
        : 'bg-white/85 dark:bg-[#0b0f19]/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70'
    }`}>
      <div className="flex items-center justify-between gap-4">
        
        {/* Mobile Sidebar Toggle & Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-teal-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 font-outfit">
              {title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden lg:block font-medium">{desc}</p>
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
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-xs hover:scale-105"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-teal-700" />
              )}
            </button>
          )}

          {/* Quick Pricing Badge */}
          {currentUser && (currentUser.subscriptionPlan === 'Gratis' || currentUser.subscriptionPlan === 'Pemula') && (
            <button
              onClick={onOpenPricingModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-xs cursor-pointer font-outfit"
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
                className="px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={onOpenPricingModal}
                className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 rounded-xl shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
              >
                Berlangganan
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Header profile chip on desktop */}
              <div className="hidden sm:flex items-center gap-2 pl-3 py-1 pr-1.5 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit">{currentUser.name}</span>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1 font-outfit">
                  <ShieldCheck className="w-3 h-3 text-teal-600 dark:text-teal-400" />
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
