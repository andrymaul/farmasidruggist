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
  BookMarked,
  GraduationCap,
  ShieldAlert,
  Activity,
  BookOpen,
  History,
  Calculator,
  Baby,
  Syringe,
  MessageSquare,
  ClipboardList,
  Scale,
  Database,
  UserCheck,
  HeartHandshake,
  FlaskConical,
  CalendarClock,
  Leaf,
  Send
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenPricingModal: () => void;
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
            </nav>

            {/* Right Action Buttons on Landing */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Telegram Community Button on Landing Header */}
              <a
                href="https://t.me/+lHiIMC_TdoM2NTk1"
                target="_blank"
                rel="noopener noreferrer"
                title="Gabung Komunitas Telegram Apoteker & Dokter"
                className="h-9 px-3.5 sm:px-4 rounded-xl text-xs font-black text-white bg-[#229ED9] hover:bg-[#1b8bc2] border border-[#229ED9] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs hover:shadow-md hover:scale-105 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>Komunitas Telegram</span>
              </a>

              {!currentUser ? (
                <>
                  <button
                    onClick={onOpenAuthModal}
                    className="h-9 px-3.5 sm:px-4 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 border border-amber-300 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs hover:shadow-md hover:scale-105 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-950 stroke-[2.5] shrink-0" />
                    <span>Masuk</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Keluar"
                    className="p-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button on Landing */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setLandingMobileMenuOpen(!landingMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              {!currentUser ? (
                <>
                  <button
                    onClick={() => { onOpenAuthModal(); setLandingMobileMenuOpen(false); }}
                    className="w-full py-2.5 text-center text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
                  >
                    Masuk Akun
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
      case 'dashboard': return { title: 'Dashboard Utama', desc: 'Ringkasan aktivitas & analisis obat klinis', icon: Sparkles, iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' };
      case 'drugs': return { title: 'Katalog Informasi Obat', desc: 'Direktori komprehensif indikasi, dosis & efek samping', icon: Pill, iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800' };
      case 'pregnancy': return { title: 'Keamanan Obat Ibu Hamil & Menyusui (Pregnancy & Lactation)', desc: 'Penapisan risiko teratogenik FDA PLLR, profil laktasi Hale’s L1-L5, RID %, dan direktori alternatif obat aman', icon: HeartHandshake, iconColor: 'text-pink-600 bg-pink-50 dark:bg-pink-950/50 border-pink-200 dark:border-pink-800' };
      case 'drug-lab': return { title: 'Interaksi Obat dengan Uji Laboratorium (DLI)', desc: 'Deteksi distorsi analit in vitro & hasil positif/negatif palsu pemeriksaan Troponin, Tiroid, Ginjal, Glukosa & Narkoba Urin', icon: FlaskConical, iconColor: 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800' };
      case 'herb-drug': return { title: 'Interaksi Herbal & Obat Indonesia (Herb-Drug Interactions)', desc: 'Penapisan interaksi Jamu, OHT & Fitofarmaka (Kunyit, Temulawak, Sambiloto, Bawang Putih, Ginkgo) terhadap obat resep sintetik', icon: Leaf, iconColor: 'text-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' };
      case 'bud': return { title: 'Kalkulator Stabilitas & Beyond Use Date (BUD)', desc: 'Penetapan batas kadaluarsa sediaan racikan puyer, sirup oral, krim/gel, tetes mata, insulin & injeksi steril berstandar USP <795>, <797> & FI VI', icon: CalendarClock, iconColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' };
      case 'competency': return { title: 'Pusat Belajar Uji Kompetensi Farmasi (UKMPPAI & UKTVF)', desc: 'Rangkuman 4 domain blueprint nasional, bank soal kasus vignette, simulasi CBT, rumus hitungan cepat & panduan OSCE', icon: GraduationCap, iconColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' };
      case 'guidelines': return { title: 'Panduan Terapi Klinis Indonesia', desc: 'Pedoman Nasional Pelayanan Kedokteran (PNPK) & Konsensus Organisasi Profesi Spesialis RI', icon: HeartPulse, iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800' };
      case 'polypharmacy': return { title: 'Evaluasi Klinis & Penapisan Polifarmasi', desc: 'Parameter klinis pasien, penapisan resep, generator jadwal harian & interaksi makanan', icon: Stethoscope, iconColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800' };
      case 'interactions': return { title: 'Deteksi Interaksi Obat (Evaluasi Klinis)', desc: 'Pemeriksaan potensi efek samping & tingkat keparahan', icon: ShieldAlert, iconColor: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800' };
      case 'side-effects': return { title: 'Pusat Analisis Efek Samping & Toksisitas Organ', desc: 'Evaluasi toksisitas kumulatif multi-obat, pelacak gejala KTD & algoritma farmakovigilans BPOM', icon: Activity, iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' };
      case 'usage': return { title: 'Panduan Penggunaan Obat', desc: 'Petunjuk langkah demi langkah tata cara penggunaan sediaan obat khusus', icon: BookOpen, iconColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' };
      case 'literature': return { title: 'Literatur & Basis Ilmiah (EBM)', desc: 'Direktori komprehensif pedoman PNPK Kemenkes, konsensus organisasi profesi & standar internasional', icon: BookMarked, iconColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' };
      case 'history': return { title: 'Riwayat Pemeriksaan', desc: 'Rekam jejak simulasi & penelusuran interaksi', icon: History, iconColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800' };
      case 'renal-adjuster': return { title: 'Kalkulator Medis & Penyesuaian Dosis', desc: 'Suite kalkulator farmako-klinis terpadu: Dosis Ginjal, Hepar, Syringe Pump, Opioid, IBW, dan Skor Klinis', icon: Calculator, iconColor: 'text-violet-600 bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800' };
      case 'pediatric': return { title: 'Kalkulator Dosis Pediatrik & Puyer', desc: 'Perhitungan dosis anak berbasis BB/BSA, konversi puyer, takaran sirup & batas dosis toksik', icon: Baby, iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800' };
      case 'iv-compatibility': return { title: 'Uji Kompatibilitas Injeksi IV', desc: 'Skrining kompatibilitas percabangan Y-Site, presipitasi pelarut infus & stabilitas rekonstitusi', icon: Syringe, iconColor: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800' };
      case 'whatsapp-pio': return { title: 'Kartu PIO Pasien WhatsApp', desc: 'Generator kartu edukasi aturan pakai & etiket resep siap kirim langsung ke WhatsApp pasien', icon: MessageSquare, iconColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' };
      case 'sop': return { title: 'Standar Operasional Prosedur (SOP) Farmasi', desc: 'Kumpulan SOP Pelayanan Kefarmasian berstandar Permenkes No. 73/2016 & BPOM', icon: ClipboardList, iconColor: 'text-slate-700 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
      case 'regulations': return { title: 'Regulasi & Kebijakan Farmasi Indonesia', desc: 'Kompilasi UU Kesehatan No. 17/2023, Narkotika, Psikotropika, DOWA & PerBPOM', icon: Scale, iconColor: 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' };
      case 'admin': return { title: 'Panel Administrasi', desc: 'Manajemen basis data obat & aturan interaksi', icon: Database, iconColor: 'text-slate-700 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
      case 'subscriptions': return { title: 'Manajemen Berlangganan Customer', desc: 'Pengelolaan lisensi subskripsi, perpanjangan masa aktif & akun pelanggan', icon: UserCheck, iconColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' };
      default: return { title: 'Farmasi & Klinik DDI Interaksi', desc: 'Platform Integrasi Klinis Penilaian Interaksi Obat', icon: Sparkles, iconColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' };
    }
  };

  const currentTabMeta = getTabTitle(activeTab);
  const { title, desc, icon: TabIcon, iconColor } = currentTabMeta;

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
          <div className="hidden md:flex items-center gap-3">
            {TabIcon && (
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${iconColor}`}>
                <TabIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 font-outfit">
                {title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden lg:block font-medium">{desc}</p>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Telegram Community Join Button */}
          <a
            href="https://t.me/+lHiIMC_TdoM2NTk1"
            target="_blank"
            rel="noopener noreferrer"
            title="Gabung Komunitas Telegram Apoteker & Dokter FarmasiDruggist"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#1b8bc2] dark:text-sky-300 border border-[#229ED9]/40 hover:border-[#229ED9]/70 rounded-full text-xs font-bold transition-all shadow-2xs hover:scale-105 font-outfit"
          >
            <Send className="w-3.5 h-3.5 fill-[#229ED9] dark:fill-sky-300" />
            <span className="hidden sm:inline">Komunitas Telegram</span>
            <span className="sm:hidden">Telegram</span>
          </a>

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
