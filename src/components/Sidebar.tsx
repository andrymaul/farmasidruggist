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
  HeartPulse, 
  Baby, 
  Syringe, 
  MessageSquare
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
        { id: 'guidelines', label: 'Panduan Terapi', icon: HeartPulse, badge: 'Pedoman', badgeColor: 'bg-blue-600 text-white' },
        { id: 'polypharmacy', label: 'Evaluasi & Polifarmasi', icon: Stethoscope, badge: 'Baru', badgeColor: 'bg-indigo-600 text-white' },
        { id: 'interactions', label: 'Cek Interaksi', icon: ShieldAlert, badge: 'Klinis', badgeColor: 'bg-emerald-600 text-white' },
        { id: 'whatsapp-pio', label: 'Kartu PIO WhatsApp', icon: MessageSquare, badge: 'Pasien', badgeColor: 'bg-teal-600 text-white' },
        { id: 'iv-compatibility', label: 'Kompatibilitas Injeksi IV', icon: Syringe, badge: 'IV/ICU', badgeColor: 'bg-cyan-600 text-white' },
        { id: 'pediatric', label: 'Dosis Pediatrik & Puyer', icon: Baby, badge: 'Puyer', badgeColor: 'bg-rose-500 text-white' },
        { id: 'renal-adjuster', label: 'Kalkulator Medis & Dosis', icon: Calculator, badge: 'Lengkap', badgeColor: 'bg-violet-600 text-white' },
        { id: 'sop', label: 'SOP Farmasi', icon: ClipboardList, badge: 'Resmi', badgeColor: 'bg-slate-700 dark:bg-slate-600 text-white' },
        { id: 'regulations', label: 'Regulasi Farmasi', icon: Scale, badge: 'Hukum', badgeColor: 'bg-amber-600 text-white' },
        { id: 'usage', label: 'Penggunaan Obat', icon: BookOpen },
        { id: 'history', label: 'Riwayat Cek', icon: History },
        { id: 'pricing', label: 'Harga Layanan', icon: CreditCard },
      ]
    : [
        { id: 'landing', label: 'Beranda', icon: Sparkles },
        { id: 'drugs', label: 'Katalog Obat', icon: Pill },
        { id: 'guidelines', label: 'Panduan Terapi', icon: HeartPulse, badge: 'Pedoman', badgeColor: 'bg-blue-600 text-white' },
        { id: 'polypharmacy', label: 'Evaluasi & Polifarmasi', icon: Stethoscope, badge: 'Baru', badgeColor: 'bg-indigo-600 text-white' },
        { id: 'whatsapp-pio', label: 'Kartu PIO WhatsApp', icon: MessageSquare, badge: 'Pasien', badgeColor: 'bg-teal-600 text-white' },
        { id: 'iv-compatibility', label: 'Kompatibilitas Injeksi IV', icon: Syringe, badge: 'IV/ICU', badgeColor: 'bg-cyan-600 text-white' },
        { id: 'pediatric', label: 'Dosis Pediatrik & Puyer', icon: Baby, badge: 'Puyer', badgeColor: 'bg-rose-500 text-white' },
        { id: 'renal-adjuster', label: 'Kalkulator Medis & Dosis', icon: Calculator, badge: 'Lengkap', badgeColor: 'bg-violet-600 text-white' },
        { id: 'sop', label: 'SOP Farmasi', icon: ClipboardList, badge: 'Resmi', badgeColor: 'bg-slate-700 dark:bg-slate-600 text-white' },
        { id: 'regulations', label: 'Regulasi Farmasi', icon: Scale, badge: 'Hukum', badgeColor: 'bg-amber-600 text-white' },
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

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
        <div className="space-y-1">
          <div className={`text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2 font-outfit ${collapsed ? 'text-center' : 'px-3'}`}>
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
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Nav Section */}
        {adminNavItems.length > 0 && (
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800/80">
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
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 scale-[1.01]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-900 dark:hover:text-amber-300'
                  } ${collapsed ? 'justify-center px-2' : ''}`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-amber-500 group-hover:text-amber-600'
                  }`} />
                  
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {/* Tooltip on Collapsed Mode */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-amber-300 text-xs rounded-md border border-amber-900/60 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
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
                      Admin
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
