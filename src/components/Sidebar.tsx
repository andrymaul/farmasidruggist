import React, { useState } from 'react';
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
  HeartPulse
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

  // Navigation items depending on login status
  const mainNavItems = currentUser
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
        { id: 'drugs', label: 'Informasi Obat', icon: Pill },
        { id: 'guidelines', label: 'Panduan Terapi', icon: HeartPulse, badge: 'Pedoman' },
        { id: 'polypharmacy', label: 'Evaluasi & Polifarmasi', icon: Stethoscope, badge: 'Baru' },
        { id: 'interactions', label: 'Cek Interaksi', icon: ShieldAlert, badge: 'Klinis' },
        { id: 'renal-adjuster', label: 'Kalkulator Dosis', icon: Calculator, badge: 'Dosis' },
        { id: 'sop', label: 'SOP Farmasi', icon: ClipboardList, badge: 'Resmi' },
        { id: 'regulations', label: 'Regulasi Farmasi', icon: Scale, badge: 'Hukum' },
        { id: 'usage', label: 'Penggunaan Obat', icon: BookOpen },
        { id: 'history', label: 'Riwayat Cek', icon: History },
        { id: 'pricing', label: 'Harga Layanan', icon: CreditCard },
      ]
    : [
        { id: 'landing', label: 'Beranda', icon: Sparkles },
        { id: 'drugs', label: 'Katalog Obat', icon: Pill },
        { id: 'guidelines', label: 'Panduan Terapi', icon: HeartPulse, badge: 'Pedoman' },
        { id: 'polypharmacy', label: 'Evaluasi & Polifarmasi', icon: Stethoscope, badge: 'Baru' },
        { id: 'renal-adjuster', label: 'Kalkulator Dosis', icon: Calculator, badge: 'Dosis' },
        { id: 'sop', label: 'SOP Farmasi', icon: ClipboardList, badge: 'Resmi' },
        { id: 'regulations', label: 'Regulasi Farmasi', icon: Scale, badge: 'Hukum' },
        { id: 'usage', label: 'Penggunaan Obat', icon: BookOpen },
        { id: 'pricing', label: 'Harga Layanan', icon: CreditCard }
      ];

  const adminNavItems = (currentUser && currentUser.role === 'admin')
    ? [
        { id: 'admin-drugs', label: 'Monografi & Obat', icon: Database },
        { id: 'admin-interactions', label: 'Interaksi DDInter', icon: ShieldAlert },
        { id: 'admin-firebase', label: 'Sinkronisasi Firebase', icon: RefreshCw },
        { id: 'admin-editor', label: 'Editor DFI & Duplikasi', icon: Utensils },
        { id: 'admin-pricing', label: 'Tarif & Hak Akses', icon: Tag },
        { id: 'admin-branding', label: 'Kop Surat & Stempel', icon: Building2 },
        { id: 'admin-users', label: 'Kelola Tim Admin', icon: Users },
        { id: 'admin-logs', label: 'Log Audit Sistem', icon: FileSpreadsheet },
        { id: 'admin-subscriptions', label: 'Subskripsi Customer', icon: UserCheck },
      ]
    : [];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#071c21]/95 backdrop-blur-xl text-slate-800 dark:text-slate-200 border-r border-slate-200/80 dark:border-teal-500/20 shadow-xl transition-all duration-300">
      {/* Sidebar Header / Logo */}
      <div className={`p-4 flex items-center justify-between border-b border-slate-100 dark:border-teal-500/20 bg-slate-50/80 dark:bg-[#051418]/80 ${collapsed ? 'px-3 justify-center' : 'px-5'}`}>
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
          className="hidden md:flex items-center justify-center p-1.5 rounded-xl text-slate-400 dark:text-teal-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0e3742] transition-colors cursor-pointer"
          title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
        <div className="space-y-1">
          <div className={`text-[10px] font-extrabold tracking-wider text-teal-700 dark:text-teal-400 uppercase mb-2 font-outfit ${collapsed ? 'text-center' : 'px-3'}`}>
            {collapsed ? '•••' : 'Menu Utama & PIO'}
          </div>
          
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 group relative cursor-pointer font-outfit ${
                  isActive
                    ? 'btn-teal-gradient shadow-[0_4px_18px_rgba(20,184,166,0.35)] border border-teal-300/40 scale-[1.02]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/90 dark:hover:bg-[#0c2f37] hover:text-slate-900 dark:hover:text-white'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-[#0f766e] dark:text-teal-400 group-hover:text-teal-600 dark:group-hover:text-teal-300'
                }`} />
                
                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs ${
                    item.badge === 'Baru' ? 'bg-indigo-500 text-white' :
                    item.badge === 'AI' ? 'bg-purple-500 text-white' :
                    item.badge === 'Dosis' ? 'bg-amber-400 text-slate-950' :
                    'bg-teal-400 text-slate-950'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {/* Tooltip on Collapsed Mode */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 dark:bg-[#061c21] text-white text-xs rounded-md border border-slate-700 dark:border-teal-500/30 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Nav Section */}
        {adminNavItems.length > 0 && (
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-teal-500/20">
            <div className={`text-[10px] font-extrabold tracking-wider text-amber-600 dark:text-amber-400 uppercase mb-2 font-outfit ${collapsed ? 'text-center' : 'px-3'}`}>
              {collapsed ? '⚙️' : 'Panel Admin & Konfigurasi'}
            </div>

            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (activeTab === 'admin' && item.id === 'admin-drugs');
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group relative cursor-pointer font-outfit ${
                    isActive
                      ? 'btn-amber-gradient shadow-[0_4px_18px_rgba(245,158,11,0.35)] border border-amber-300 scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-900 dark:hover:text-amber-300'
                  } ${collapsed ? 'justify-center px-2' : ''}`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-slate-950' : 'text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300'
                  }`} />
                  
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {/* Tooltip on Collapsed Mode */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 dark:bg-[#061c21] text-amber-300 text-xs rounded-md border border-amber-900/60 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer / User Profile Section */}
      <div className="p-3 border-t border-slate-100 dark:border-teal-500/20 bg-slate-50/80 dark:bg-[#051418]/80">
        {currentUser ? (
          <div className={`flex items-center gap-3 p-2.5 rounded-2xl bg-white/90 dark:bg-[#0c2f37]/90 border border-slate-200/90 dark:border-teal-500/30 shadow-md ${collapsed ? 'justify-center p-2' : ''}`}>
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
                      Admin
                    </span>
                  ) : (
                    <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-[9px] px-1.5 py-0.5 rounded font-bold font-outfit">
                      {currentUser.subscriptionPlan || 'Customer'}
                    </span>
                  )}
                </div>
              </div>
            )}

            {!collapsed && (
              <button
                onClick={onLogout}
                title="Keluar Akun"
                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl p-2 transition-colors cursor-pointer ml-auto"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {!collapsed ? (
              <>
                <button
                  onClick={onOpenAuthModal}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-teal-900 dark:text-teal-200 bg-teal-50 dark:bg-[#0a2f38] rounded-xl border border-teal-200 dark:border-teal-700/60 hover:bg-teal-100 dark:hover:bg-[#0e3c47] transition-colors cursor-pointer font-outfit"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Masuk Akun
                </button>
                <button
                  onClick={onOpenPricingModal}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 shadow-md transition-all cursor-pointer font-outfit"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  Berlangganan
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="w-full p-2.5 flex justify-center text-teal-600 dark:text-teal-400 hover:bg-slate-100 dark:hover:bg-[#0c2f37] rounded-xl cursor-pointer"
                title="Masuk Akun"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className={`hidden md:block print:hidden h-screen sticky top-0 z-30 transition-all duration-300 flex-shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileOpen && (
        <div className="md:hidden print:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex-1 max-w-xs w-full h-full z-10 animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white bg-slate-800 dark:bg-[#061c21] rounded-full z-20 border border-slate-700 dark:border-[#143d47] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
