import React, { useState, useMemo, useEffect } from 'react';
import { Logo } from './Logo';
import { UserProfile } from '../types';
import { 
  Pill, 
  ShieldAlert, 
  History, 
  LogIn, 
  LogOut, 
  X, 
  Sparkles, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Zap,
  BookOpen,
  Database,
  Tag,
  Building2,
  Users,
  FileSpreadsheet,
  Utensils,
  Calculator,
  Stethoscope,
  RefreshCw, 
  ClipboardList, 
  Scale, 
  HeartPulse, 
  Baby, 
  Syringe, 
  MessageSquare,
  Activity,
  BookMarked,
  GraduationCap,
  HeartHandshake,
  FlaskConical,
  CalendarClock,
  Leaf,
  Search,
  Send,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenPricingModal: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  iconColor?: string;
}

interface NavCategory {
  id: string;
  title: string;
  shortTitle: string;
  badge?: string;
  colorClass: string;
  headerBg: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenPricingModal,
  mobileOpen,
  setMobileOpen,
  theme = 'dark',
  onToggleTheme
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  // Define categorized navigation groups based on 4 clinical pillars + Core + Admin
  const categories: NavCategory[] = useMemo(() => {
    const isUser = !!currentUser;
    const isAdmin = currentUser?.role === 'admin';

    const list: NavCategory[] = [
      {
        id: 'core',
        title: 'Utama & Monografi',
        shortTitle: 'Utama',
        colorClass: 'text-teal-600 dark:text-teal-400',
        headerBg: 'bg-teal-500/10 border-teal-500/20 text-teal-800 dark:text-teal-300',
        items: [
          ...(isUser
            ? [{ id: 'dashboard', label: 'Dashboard', icon: Sparkles, iconColor: 'text-amber-500 dark:text-amber-400' }]
            : [{ id: 'landing', label: 'Beranda', icon: Sparkles, iconColor: 'text-amber-500 dark:text-amber-400' }]),
          { id: 'drugs', label: 'Katalog & Monografi Obat', icon: Pill, iconColor: 'text-teal-500 dark:text-teal-400' },
          { id: 'usage', label: 'Panduan Cara Pakai Obat', icon: BookOpen, iconColor: 'text-sky-500 dark:text-sky-400' },
          ...(isUser ? [{ id: 'history', label: 'Riwayat Cek Resep', icon: History, iconColor: 'text-indigo-400 dark:text-indigo-300' }] : [])
        ]
      },
      {
        id: 'screening',
        title: 'Skrining & Keamanan Resep',
        shortTitle: 'Skrining',
        badge: 'Klinis',
        colorClass: 'text-rose-600 dark:text-rose-400',
        headerBg: 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-300',
        items: [
          { id: 'interactions', label: 'Cek Interaksi Obat (DDInter)', icon: ShieldAlert, badge: 'DDI', badgeColor: 'text-rose-500 dark:text-rose-400' },
          { id: 'pregnancy', label: 'Keamanan Bumil & Busui', icon: HeartHandshake, badge: 'Bumil', badgeColor: 'text-pink-500 dark:text-pink-400' },
          { id: 'drug-lab', label: 'Interaksi Obat & Uji Lab', icon: FlaskConical, badge: 'Lab', badgeColor: 'text-cyan-500 dark:text-cyan-400' },
          { id: 'herb-drug', label: 'Interaksi Herbal & Obat', icon: Leaf, badge: 'Jamu', badgeColor: 'text-emerald-500 dark:text-emerald-400' },
          { id: 'side-effects', label: 'Cek Efek Samping & Naranjo', icon: Activity, badge: 'ADR', badgeColor: 'text-amber-500 dark:text-amber-400' },
          { id: 'iv-compatibility', label: 'Kompatibilitas Injeksi IV', icon: Syringe, badge: 'IV/ICU', badgeColor: 'text-sky-500 dark:text-sky-400' }
        ]
      },
      {
        id: 'calculators',
        title: 'Kalkulator Medis & Racikan',
        shortTitle: 'Kalkulator',
        badge: 'Dosis & BUD',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        headerBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300',
        items: [
          { id: 'bud', label: 'Stabilitas & BUD Racikan', icon: CalendarClock, badge: 'USP', badgeColor: 'text-teal-500 dark:text-teal-400' },
          { id: 'pediatric', label: 'Dosis Pediatrik & Puyer', icon: Baby, badge: 'Puyer', badgeColor: 'text-rose-400 dark:text-rose-300' },
          { id: 'renal-adjuster', label: 'Kalkulator Medis & Dosis', icon: Calculator, badge: 'Lengkap', badgeColor: 'text-violet-500 dark:text-violet-400' }
        ]
      },
      {
        id: 'polymed',
        title: 'Polifarmasi & Edukasi Pasien',
        shortTitle: 'Edukasi',
        badge: 'PIO',
        colorClass: 'text-indigo-600 dark:text-indigo-400',
        headerBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-800 dark:text-indigo-300',
        items: [
          { id: 'swamedikasi', label: 'Swamedikasi & Triage', icon: Sparkles, badge: 'Baru', badgeColor: 'text-amber-500 dark:text-amber-400', iconColor: 'text-amber-500 dark:text-amber-400' },
          { id: 'polypharmacy', label: 'Evaluasi Polifarmasi Beers', icon: Stethoscope, badge: 'Beers', badgeColor: 'text-indigo-500 dark:text-indigo-400' },
          { id: 'whatsapp-pio', label: 'Kartu PIO WhatsApp Pasien', icon: MessageSquare, badge: 'Pasien', badgeColor: 'text-teal-500 dark:text-teal-400' },
          { id: 'guidelines', label: 'Panduan Terapi (PNPK)', icon: HeartPulse, badge: 'PNPK', badgeColor: 'text-blue-500 dark:text-blue-400' }
        ]
      },
      {
        id: 'education',
        title: 'Pusat Belajar, SOP & Regulasi',
        shortTitle: 'Belajar & EBM',
        badge: 'UKMPPAI',
        colorClass: 'text-teal-700 dark:text-cyan-400',
        headerBg: 'bg-teal-500/10 border-teal-500/20 text-teal-800 dark:text-teal-300',
        items: [
          { id: 'competency', label: 'Pusat Belajar Farmasi', icon: GraduationCap, badge: 'CBT/OSCE', badgeColor: 'text-emerald-500 dark:text-emerald-400' },
          { id: 'sop', label: 'SOP Pelayanan Farmasi', icon: ClipboardList, badge: 'Resmi', badgeColor: 'text-slate-500 dark:text-slate-400' },
          { id: 'regulations', label: 'Regulasi & UU Kesehatan', icon: Scale, badge: 'Hukum', badgeColor: 'text-amber-600 dark:text-amber-400' },
          { id: 'literature', label: 'Literatur Ilmiah (EBM)', icon: BookMarked, badge: 'EBM', badgeColor: 'text-teal-500 dark:text-teal-400' },
          { id: 'pricing', label: 'Harga Layanan & Lisensi', icon: CreditCard, iconColor: 'text-amber-500 dark:text-amber-400' }
        ]
      }
    ];

    // Admin Panel Category
    if (isAdmin) {
      list.push({
        id: 'admin',
        title: 'Panel Admin & Konfigurasi',
        shortTitle: 'Admin',
        badge: 'Admin',
        colorClass: 'text-amber-600 dark:text-amber-400',
        headerBg: 'bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-300',
        items: [
          { id: 'admin-firebase', label: 'Sinkronisasi Firebase', icon: RefreshCw, iconColor: 'text-orange-500 dark:text-orange-400' },
          { id: 'admin-pricing', label: 'Tarif & Hak Akses', icon: Tag, iconColor: 'text-teal-500 dark:text-teal-400' },
          { id: 'admin-users', label: 'Kelola Tim Admin', icon: Users, iconColor: 'text-blue-500 dark:text-blue-400' },
          { id: 'admin-subscriptions', label: 'Subskripsi Customer', icon: UserCheck, iconColor: 'text-emerald-500 dark:text-emerald-400' }
        ]
      });
    }

    return list;
  }, [currentUser]);

  // Track collapsed/expanded state for each category
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Auto-expand category containing activeTab whenever activeTab changes
  useEffect(() => {
    const activeCategory = categories.find((cat) =>
      cat.items.some((item) => item.id === activeTab || (activeTab === 'admin' && item.id === 'admin-firebase'))
    );
    if (activeCategory && collapsedCategories[activeCategory.id]) {
      setCollapsedCategories((prev) => ({
        ...prev,
        [activeCategory.id]: false
      }));
    }
  }, [activeTab, categories]);

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  // Filter items based on menu search query
  const filteredCategories = useMemo(() => {
    if (!menuSearchQuery.trim()) return categories;
    const q = menuSearchQuery.toLowerCase().trim();

    return categories
      .map((cat) => {
        const matchingItems = cat.items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            (item.badge && item.badge.toLowerCase().includes(q))
        );
        return {
          ...cat,
          items: matchingItems
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categories, menuSearchQuery]);

  const getActiveTabStyle = (itemId: string): string => {
    switch (itemId) {
      case 'interactions':
        return 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-700 text-white shadow-md shadow-rose-950/50 border border-rose-500/40';
      case 'pregnancy':
        return 'bg-gradient-to-r from-pink-950 via-pink-900 to-pink-700 text-white shadow-md shadow-pink-950/50 border border-pink-500/40';
      case 'drug-lab':
        return 'bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-700 text-white shadow-md shadow-cyan-950/50 border border-cyan-500/40';
      case 'herb-drug':
        return 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-700 text-white shadow-md shadow-emerald-950/50 border border-emerald-500/40';
      case 'side-effects':
        return 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-700 text-white shadow-md shadow-amber-950/50 border border-amber-500/40';
      case 'iv-compatibility':
        return 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 text-white shadow-md shadow-blue-950/50 border border-blue-500/40';
      case 'bud':
        return 'bg-gradient-to-r from-teal-950 via-teal-900 to-teal-700 text-white shadow-md shadow-teal-950/50 border border-teal-500/40';
      case 'pediatric':
        return 'bg-gradient-to-r from-purple-950 via-purple-900 to-purple-700 text-white shadow-md shadow-purple-950/50 border border-purple-500/40';
      case 'renal-adjuster':
        return 'bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-700 text-white shadow-md shadow-indigo-950/50 border border-indigo-500/40';
      case 'polypharmacy':
        return 'bg-gradient-to-r from-violet-950 via-violet-900 to-violet-700 text-white shadow-md shadow-violet-950/50 border border-violet-500/40';
      case 'whatsapp-pio':
        return 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-700 text-white shadow-md shadow-emerald-950/50 border border-emerald-500/40';
      case 'guidelines':
        return 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 text-white shadow-md shadow-blue-950/50 border border-blue-500/40';
      case 'drugs':
        return 'bg-gradient-to-r from-teal-950 via-teal-900 to-teal-700 text-white shadow-md shadow-teal-950/50 border border-teal-500/40';
      case 'usage':
        return 'bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-700 text-white shadow-md shadow-cyan-950/50 border border-cyan-500/40';
      case 'history':
        return 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white shadow-md shadow-slate-950/50 border border-slate-500/40';
      case 'competency':
        return 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-700 text-white shadow-md shadow-emerald-950/50 border border-emerald-500/40';
      case 'sop':
        return 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white shadow-md shadow-slate-950/50 border border-slate-500/40';
      case 'regulations':
        return 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-700 text-white shadow-md shadow-amber-950/50 border border-amber-500/40';
      case 'literature':
        return 'bg-gradient-to-r from-teal-950 via-teal-900 to-teal-700 text-white shadow-md shadow-teal-950/50 border border-teal-500/40';
      case 'dashboard':
        return 'bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-700 text-white shadow-md shadow-indigo-950/50 border border-indigo-500/40';
      default:
        if (itemId.startsWith('admin')) {
          return 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-700 text-white shadow-md shadow-amber-950/50 border border-amber-500/40';
        }
        return 'bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-600 dark:to-cyan-600 text-white shadow-md shadow-teal-500/20';
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800/90 shadow-sm transition-all duration-300">
      
      {/* Sidebar Header / Logo */}
      {/* Sidebar Header / Logo */}
      <div className={`p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#090e1a] ${collapsed ? 'px-3 justify-center' : 'px-4 sm:px-5'}`}>
        {!collapsed && (
          <button 
            onClick={() => handleTabClick(currentUser ? 'dashboard' : 'landing')}
            className="focus:outline-none flex items-center gap-2 group text-left cursor-pointer transition-transform hover:scale-[1.02] p-1 -ml-1 rounded-2xl hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
          >
            <Logo size="sm" />
          </button>
        )}
        {collapsed && (
          <button 
            onClick={() => handleTabClick(currentUser ? 'dashboard' : 'landing')}
            className="p-1 rounded-2xl focus:outline-none transition-transform hover:scale-110 cursor-pointer"
            title="FARMASIDRUGGIST"
          >
            <Logo size="sm" showText={false} />
          </button>
        )}

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center p-1.5 rounded-xl text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Search Menu (Only in Expanded Mode) */}
      {!collapsed && (
        <div className="p-3 pb-1 border-b border-slate-100 dark:border-slate-800/60">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              placeholder="Cari modul / menu..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
            />
            {menuSearchQuery && (
              <button
                onClick={() => setMenuSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grouped Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 custom-scrollbar">
        {filteredCategories.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 space-y-1">
            <Search className="w-5 h-5 mx-auto text-slate-400/60" />
            <p>Tidak ada modul yang cocok dengan "{menuSearchQuery}"</p>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isCategoryCollapsed = !menuSearchQuery && !!collapsedCategories[category.id];
            const hasActiveItem = category.items.some(
              (item) => item.id === activeTab || (activeTab === 'admin' && item.id === 'admin-firebase')
            );

            return (
              <div key={category.id} className="space-y-1">
                
                {/* Category Header (Clickable Accordion) */}
                {!collapsed ? (
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left group transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${hasActiveItem ? 'bg-teal-500 ring-2 ring-teal-400/30' : 'bg-slate-300 dark:bg-slate-700'}`} />
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 font-outfit truncate">
                        {category.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isCategoryCollapsed ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-outfit">
                          {category.items.length}
                        </span>
                      ) : null}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isCategoryCollapsed ? '-rotate-90' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>
                ) : (
                  <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-1" />
                )}

                {/* Category Items List */}
                {(!isCategoryCollapsed || collapsed) && (
                  <div className="space-y-0.5 pt-0.5">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id || (activeTab === 'admin' && item.id === 'admin-firebase');

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          title={collapsed ? `${category.title}: ${item.label}` : undefined}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 group relative cursor-pointer font-outfit ${
                            isActive
                              ? `${getActiveTabStyle(item.id)} scale-[1.01]`
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                          } ${collapsed ? 'justify-center px-2' : ''}`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-150 group-hover:scale-115 ${
                            isActive ? 'text-white' : (item.iconColor || item.badgeColor || 'text-teal-600 dark:text-teal-400')
                          }`} />
                          
                          {!collapsed && (
                            <span className="flex-1 text-left truncate">{item.label}</span>
                          )}

                          {!collapsed && item.badge && (
                            <span
                              className={`text-[10px] font-black tracking-wider uppercase font-outfit shrink-0 transition-colors duration-150 ${
                                isActive
                                  ? 'text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                                  : (item.badgeColor || 'text-teal-600 dark:text-teal-400')
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}

                          {/* Tooltip on Collapsed Mode */}
                          {collapsed && (
                            <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-950 text-white text-xs rounded-xl border border-slate-700 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap space-y-0.5">
                              <p className="text-[9px] font-extrabold uppercase tracking-wider text-teal-400">{category.title}</p>
                              <p className="font-bold">{item.label}</p>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Telegram Community Quick Link in Sidebar */}
      <div className="px-3 pt-2 pb-1">
        <a
          href="https://t.me/+lHiIMC_TdoM2NTk1"
          target="_blank"
          rel="noopener noreferrer"
          title="Gabung Grup Telegram Komunitas Farmasi"
          className={`flex items-center gap-2 p-2 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#1b8bc2] dark:text-sky-300 border border-[#229ED9]/30 hover:border-[#229ED9]/60 transition-all font-outfit text-xs font-bold ${collapsed ? 'justify-center' : ''}`}
        >
          <Send className="w-4 h-4 fill-[#229ED9] dark:fill-sky-300 shrink-0" />
          {!collapsed && <span className="truncate">Komunitas Telegram</span>}
        </a>
      </div>

      {/* Dark / Light Mode Toggle in Sidebar */}
      {onToggleTheme && (
        <div className="px-3 pt-1 pb-2">
          <button
            onClick={onToggleTheme}
            className={`w-full flex items-center justify-between gap-2 p-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer font-outfit border border-slate-200/80 dark:border-slate-800/80 ${collapsed ? 'justify-center p-2' : ''}`}
            title={theme === 'dark' ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 fill-slate-700/20 shrink-0" />
              )}
              {!collapsed && (
                <span>{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
              )}
            </div>
            {!collapsed && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Footer / User Profile Section */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0e1320]/70">
        {currentUser ? (
          <div className={`flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs ${collapsed ? 'justify-center p-2' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 text-white font-black font-outfit flex items-center justify-center flex-shrink-0 shadow-xs">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate font-outfit">{currentUser.name}</p>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {currentUser.role === 'admin' ? (
                    <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.5 rounded font-extrabold shadow-xs font-outfit">
                      Admin Utama
                    </span>
                  ) : (
                    <span className="bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 text-[9px] px-1.5 py-0.5 rounded font-bold font-outfit border border-teal-200/60 dark:border-teal-800/50">
                      {currentUser.subscriptionPlan || 'Customer'}
                    </span>
                  )}
                </div>
              </div>
            )}

            {!collapsed && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Keluar / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={onOpenAuthModal}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md transition cursor-pointer font-outfit ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <LogIn className="w-4 h-4" />
              {!collapsed && <span>Masuk / Login</span>}
            </button>
            
            {!collapsed && (
              <button
                onClick={onOpenPricingModal}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition cursor-pointer font-outfit"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Langganan Pro</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:block flex-shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-[#0b0f19] z-50">
            <div className="absolute top-2 right-2 z-50">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
