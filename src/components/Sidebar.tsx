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
  Search
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
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
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
  setMobileOpen
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
            ? [{ id: 'dashboard', label: 'Dashboard', icon: Sparkles }]
            : [{ id: 'landing', label: 'Beranda', icon: Sparkles }]),
          { id: 'drugs', label: 'Katalog & Monografi Obat', icon: Pill },
          { id: 'usage', label: 'Panduan Cara Pakai Obat', icon: BookOpen },
          ...(isUser ? [{ id: 'history', label: 'Riwayat Cek Resep', icon: History }] : [])
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
          { id: 'interactions', label: 'Cek Interaksi Obat (DDInter)', icon: ShieldAlert, badge: 'DDI', badgeColor: 'bg-rose-600 text-white' },
          { id: 'pregnancy', label: 'Keamanan Bumil & Busui', icon: HeartHandshake, badge: 'Bumil', badgeColor: 'bg-pink-600 text-white' },
          { id: 'drug-lab', label: 'Interaksi Obat & Uji Lab', icon: FlaskConical, badge: 'Lab', badgeColor: 'bg-cyan-700 text-white' },
          { id: 'herb-drug', label: 'Interaksi Herbal & Obat', icon: Leaf, badge: 'Jamu', badgeColor: 'bg-emerald-800 text-white' },
          { id: 'side-effects', label: 'Cek Efek Samping & Naranjo', icon: Activity, badge: 'ADR', badgeColor: 'bg-amber-500 text-slate-950 font-bold' },
          { id: 'iv-compatibility', label: 'Kompatibilitas Injeksi IV', icon: Syringe, badge: 'IV/ICU', badgeColor: 'bg-cyan-600 text-white' }
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
          { id: 'bud', label: 'Stabilitas & BUD Racikan', icon: CalendarClock, badge: 'USP', badgeColor: 'bg-emerald-700 text-white' },
          { id: 'pediatric', label: 'Dosis Pediatrik & Puyer', icon: Baby, badge: 'Puyer', badgeColor: 'bg-rose-500 text-white' },
          { id: 'renal-adjuster', label: 'Kalkulator Ginjal & Skor', icon: Calculator, badge: 'Lengkap', badgeColor: 'bg-violet-600 text-white' }
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
          { id: 'polypharmacy', label: 'Evaluasi Polifarmasi Beers', icon: Stethoscope, badge: 'Beers', badgeColor: 'bg-indigo-600 text-white' },
          { id: 'whatsapp-pio', label: 'Kartu PIO WhatsApp Pasien', icon: MessageSquare, badge: 'Pasien', badgeColor: 'bg-teal-600 text-white' },
          { id: 'guidelines', label: 'Panduan Terapi (PNPK)', icon: HeartPulse, badge: 'PNPK', badgeColor: 'bg-blue-600 text-white' }
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
          { id: 'competency', label: 'Pusat Belajar UKMPPAI', icon: GraduationCap, badge: 'CBT/OSCE', badgeColor: 'bg-emerald-600 text-white' },
          { id: 'sop', label: 'SOP Pelayanan Farmasi', icon: ClipboardList, badge: 'Resmi', badgeColor: 'bg-slate-700 dark:bg-slate-600 text-white' },
          { id: 'regulations', label: 'Regulasi & UU Kesehatan', icon: Scale, badge: 'Hukum', badgeColor: 'bg-amber-600 text-white' },
          { id: 'literature', label: 'Literatur Ilmiah (EBM)', icon: BookMarked, badge: 'EBM', badgeColor: 'bg-teal-600 text-white' },
          { id: 'pricing', label: 'Harga Layanan & Lisensi', icon: CreditCard }
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
          { id: 'admin-drugs', label: 'Monografi & Obat', icon: Database },
          { id: 'admin-interactions', label: 'Interaksi DDInter', icon: ShieldAlert },
          { id: 'admin-firebase', label: 'Sinkronisasi Firebase', icon: RefreshCw },
          { id: 'admin-editor', label: 'Editor DFI & Duplikasi', icon: Utensils },
          { id: 'admin-pricing', label: 'Tarif & Hak Akses', icon: Tag },
          { id: 'admin-users', label: 'Kelola Tim Admin', icon: Users },
          { id: 'admin-logs', label: 'Log Audit Sistem', icon: FileSpreadsheet },
          { id: 'admin-subscriptions', label: 'Subskripsi Customer', icon: UserCheck }
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
      cat.items.some((item) => item.id === activeTab || (activeTab === 'admin' && item.id === 'admin-drugs'))
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

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800/90 shadow-sm transition-all duration-300">
      
      {/* Sidebar Header / Logo */}
      <div className={`p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0e1320]/70 ${collapsed ? 'px-3 justify-center' : 'px-5'}`}>
        {!collapsed && (
          <button 
            onClick={() => handleTabClick(currentUser ? 'dashboard' : 'landing')}
            className="focus:outline-none flex items-center gap-2 group text-left cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <Logo size="sm" />
          </button>
        )}
        {collapsed && (
          <button 
            onClick={() => handleTabClick(currentUser ? 'dashboard' : 'landing')}
            className="p-1 rounded-xl focus:outline-none transition-transform hover:scale-110 cursor-pointer"
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
              (item) => item.id === activeTab || (activeTab === 'admin' && item.id === 'admin-drugs')
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
                      const isActive = activeTab === item.id || (activeTab === 'admin' && item.id === 'admin-drugs');

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          title={collapsed ? `${category.title}: ${item.label}` : undefined}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 group relative cursor-pointer font-outfit ${
                            isActive
                              ? 'bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-600 dark:to-cyan-600 text-white shadow-md shadow-teal-500/20 scale-[1.01]'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                          } ${collapsed ? 'justify-center px-2' : ''}`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-300'
                          }`} />
                          
                          {!collapsed && (
                            <span className="flex-1 text-left truncate">{item.label}</span>
                          )}

                          {!collapsed && item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs ${item.badgeColor || 'bg-teal-500 text-white'}`}>
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
      <aside className={`hidden md:block flex-shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
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
