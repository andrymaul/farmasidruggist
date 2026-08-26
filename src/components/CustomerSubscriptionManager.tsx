import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_CUSTOMERS, SAMPLE_DEMO_CUSTOMERS } from '../data/mockCustomers';
import { UserProfile } from '../types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CreditCard, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  X, 
  UserCheck, 
  AlertCircle,
  Zap,
  Award,
  Eye,
  EyeOff,
  Copy,
  Check,
  KeyRound,
  RefreshCw,
  Phone,
  FileText,
  Sliders,
  Trash2,
  Lock,
  Download,
  Stethoscope,
  Calculator,
  RotateCcw
} from 'lucide-react';

interface CustomerSubscriptionManagerProps {
  currentUser: UserProfile | null;
  customers?: UserProfile[];
  onUpdateCustomers?: (customers: UserProfile[]) => void;
}

export const CustomerSubscriptionManager: React.FC<CustomerSubscriptionManagerProps> = ({
  currentUser,
  customers: propCustomers,
  onUpdateCustomers
}) => {
  const [internalCustomers, setInternalCustomers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_customer_subscriptions');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    if (propCustomers !== undefined) {
      setInternalCustomers(propCustomers);
    }
  }, [propCustomers]);

  const customers = propCustomers !== undefined ? propCustomers : internalCustomers;

  const setCustomers = (newCustomers: UserProfile[] | ((prev: UserProfile[]) => UserProfile[])) => {
    const updated = typeof newCustomers === 'function' ? newCustomers(customers) : newCustomers;
    setInternalCustomers(updated);
    try {
      localStorage.setItem('farmasi_customer_subscriptions', JSON.stringify(updated));
    } catch (e) {}
    if (onUpdateCustomers) {
      onUpdateCustomers(updated);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('Semua');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');

  // Password Visibility State (uid -> boolean)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedPasswordUid, setCopiedPasswordUid] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<UserProfile | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<UserProfile | null>(null);
  const [editModalTab, setEditModalTab] = useState<'profile' | 'license' | 'permissions' | 'notes'>('profile');

  // Form State for Add / Deep Edit
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    institution: '',
    licenseNumber: '',
    subscriptionPlan: 'Pro' as 'Pemula' | 'Pro' | 'Elite' | 'Gratis' | 'Klinik',
    subscriptionStatus: 'active' as 'active' | 'expired' | 'trial',
    expiresAtDate: '',
    maxDrugsOverride: 20,
    canExportPdf: true,
    canAccessRenal: true,
    canAccessPolypharmacy: true,
    notes: '',
    durationMonths: 12
  });

  const [showModalPassword, setShowModalPassword] = useState(false);

  // Helper to generate secure random password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Toggle Table Password Visibility
  const togglePasswordVisibility = (uid: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [uid]: !prev[uid]
    }));
  };

  // Copy Password to Clipboard
  const handleCopyPassword = (uid: string, pass: string) => {
    navigator.clipboard.writeText(pass);
    setCopiedPasswordUid(uid);
    setTimeout(() => {
      setCopiedPasswordUid(null);
    }, 2000);
  };

  // Calculate Statistics
  const stats = useMemo(() => {
    const total = customers.length;
    const proCount = customers.filter(c => (c.subscriptionPlan === 'Pro' || c.subscriptionPlan === 'Elite' || c.subscriptionPlan === 'Klinik') && c.subscriptionStatus === 'active').length;
    const freeCount = customers.filter(c => (c.subscriptionPlan === 'Pemula' || c.subscriptionPlan === 'Gratis') || c.subscriptionStatus === 'trial').length;
    const activeCount = customers.filter(c => c.subscriptionStatus === 'active').length;
    
    // Revenue estimation (Pro: Rp 199.000 / tahun)
    const annualRevenue = proCount * 199000;

    return { total, proCount, activeCount, freeCount, annualRevenue };
  }, [customers]);

  // Filtered customers list
  const filteredCustomers = useMemo(() => {
    return customers.filter(cust => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        cust.name.toLowerCase().includes(q) || 
        cust.email.toLowerCase().includes(q) ||
        (cust.institution && cust.institution.toLowerCase().includes(q)) ||
        (cust.phone && cust.phone.includes(q)) ||
        (cust.licenseNumber && cust.licenseNumber.toLowerCase().includes(q));
      
      const matchesPlan = selectedPlanFilter === 'Semua' || 
        cust.subscriptionPlan === selectedPlanFilter ||
        (selectedPlanFilter === 'Pemula' && cust.subscriptionPlan === 'Gratis') ||
        (selectedPlanFilter === 'Pro' && (cust.subscriptionPlan === 'Elite' || cust.subscriptionPlan === 'Klinik'));
      
      const matchesStatus = selectedStatusFilter === 'Semua' || cust.subscriptionStatus === selectedStatusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [customers, searchQuery, selectedPlanFilter, selectedStatusFilter]);

  // Handlers
  const handleOpenAddModal = () => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    setFormState({
      name: '',
      email: '',
      password: generateRandomPassword(),
      phone: '',
      institution: '',
      licenseNumber: '',
      subscriptionPlan: 'Pro',
      subscriptionStatus: 'active',
      expiresAtDate: expiryDate.toISOString().split('T')[0],
      maxDrugsOverride: 30,
      canExportPdf: true,
      canAccessRenal: true,
      canAccessPolypharmacy: true,
      notes: '',
      durationMonths: 12
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (cust: UserProfile) => {
    setEditingCustomer(cust);
    setEditModalTab('profile');
    setShowModalPassword(false);
    
    const expiryFormatted = cust.expiresAt 
      ? new Date(cust.expiresAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    setFormState({
      name: cust.name || '',
      email: cust.email || '',
      password: cust.password || 'CustPass#' + cust.uid.slice(-4),
      phone: cust.phone || '',
      institution: cust.institution || '',
      licenseNumber: cust.licenseNumber || '',
      subscriptionPlan: cust.subscriptionPlan,
      subscriptionStatus: cust.subscriptionStatus,
      expiresAtDate: expiryFormatted,
      maxDrugsOverride: cust.maxDrugsOverride || 30,
      canExportPdf: cust.canExportPdf ?? (cust.subscriptionPlan !== 'Gratis' && cust.subscriptionPlan !== 'Pemula'),
      canAccessRenal: cust.canAccessRenal ?? (cust.subscriptionPlan !== 'Gratis' && cust.subscriptionPlan !== 'Pemula'),
      canAccessPolypharmacy: cust.canAccessPolypharmacy ?? (cust.subscriptionPlan !== 'Gratis' && cust.subscriptionPlan !== 'Pemula'),
      notes: cust.notes || '',
      durationMonths: 12
    });
  };

  const handleSaveAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    const expiryDate = formState.expiresAtDate 
      ? new Date(formState.expiresAtDate + 'T23:59:59.000Z').toISOString()
      : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

    const newCustomer: UserProfile = {
      uid: 'cust-' + Date.now(),
      name: formState.name,
      email: formState.email,
      password: formState.password || generateRandomPassword(),
      phone: formState.phone,
      institution: formState.institution,
      licenseNumber: formState.licenseNumber,
      notes: formState.notes,
      role: (formState.subscriptionPlan === 'Gratis' || formState.subscriptionPlan === 'Pemula') ? 'free' : 'customer',
      subscriptionPlan: formState.subscriptionPlan,
      subscriptionStatus: formState.subscriptionStatus,
      maxDrugsOverride: Number(formState.maxDrugsOverride),
      canExportPdf: formState.canExportPdf,
      canAccessRenal: formState.canAccessRenal,
      canAccessPolypharmacy: formState.canAccessPolypharmacy,
      expiresAt: expiryDate,
      createdAt: new Date().toISOString()
    };

    setCustomers([newCustomer, ...customers]);
    setShowAddModal(false);
  };

  const handleSaveEditCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const expiryDate = formState.expiresAtDate 
      ? new Date(formState.expiresAtDate + 'T23:59:59.000Z').toISOString()
      : editingCustomer.expiresAt;

    setCustomers(customers.map(c => {
      if (c.uid === editingCustomer.uid) {
        return {
          ...c,
          name: formState.name,
          email: formState.email,
          password: formState.password,
          phone: formState.phone,
          institution: formState.institution,
          licenseNumber: formState.licenseNumber,
          subscriptionPlan: formState.subscriptionPlan,
          subscriptionStatus: formState.subscriptionStatus,
          expiresAt: expiryDate,
          maxDrugsOverride: Number(formState.maxDrugsOverride),
          canExportPdf: formState.canExportPdf,
          canAccessRenal: formState.canAccessRenal,
          canAccessPolypharmacy: formState.canAccessPolypharmacy,
          notes: formState.notes
        };
      }
      return c;
    }));

    setEditingCustomer(null);
  };

  const handleQuickAddMonths = (months: number) => {
    const current = formState.expiresAtDate ? new Date(formState.expiresAtDate) : new Date();
    current.setMonth(current.getMonth() + months);
    setFormState(prev => ({
      ...prev,
      expiresAtDate: current.toISOString().split('T')[0],
      subscriptionStatus: 'active'
    }));
  };

  const handleSetLifetime = () => {
    setFormState(prev => ({
      ...prev,
      expiresAtDate: '2099-12-31',
      subscriptionStatus: 'active'
    }));
  };

  const handleExtendSubscription = (uid: string, months: number) => {
    setCustomers(customers.map(c => {
      if (c.uid === uid) {
        const currentExp = c.expiresAt ? new Date(c.expiresAt) : new Date();
        const baseDate = currentExp > new Date() ? currentExp : new Date();
        baseDate.setMonth(baseDate.getMonth() + months);

        return {
          ...c,
          subscriptionStatus: 'active',
          expiresAt: baseDate.toISOString()
        };
      }
      return c;
    }));
  };

  const handleUpgradeToPro = (uid: string) => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    setCustomers(customers.map(c => {
      if (c.uid === uid) {
        return {
          ...c,
          role: 'customer',
          subscriptionPlan: 'Pro',
          subscriptionStatus: 'active',
          canExportPdf: true,
          canAccessRenal: true,
          canAccessPolypharmacy: true,
          expiresAt: expiryDate.toISOString()
        };
      }
      return c;
    }));
  };

  const handleToggleStatus = (uid: string) => {
    setCustomers(customers.map(c => {
      if (c.uid === uid) {
        const newStatus = c.subscriptionStatus === 'active' ? 'expired' : 'active';
        return { ...c, subscriptionStatus: newStatus };
      }
      return c;
    }));
  };

  const handleDeleteCustomer = () => {
    if (!deletingCustomer) return;
    setCustomers(customers.filter(c => c.uid !== deletingCustomer.uid));
    setDeletingCustomer(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Banner - Deep Dark Teal Clinical & Outfit Display */}
      <div className="bg-gradient-to-r from-[#06191c] via-[#092b31] to-[#0a353c] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#184c53] relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#156d67]/30 text-[#5fd0df] text-xs font-bold border border-[#3dbfd1]/30 font-outfit">
            <UserCheck className="w-3.5 h-3.5 text-[#3dbfd1]" />
            <span>Manajemen Pelanggan & Lisensi Subskripsi</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit">
            Kelola Akun & Lisensi Customer
          </h2>
          
          <p className="text-teal-100/80 text-xs sm:text-sm font-medium leading-relaxed">
            Pantau kata sandi, status lisensi aktif, durasi masa langganan, kuota penapisan obat, dan data instansi customer dalam satu kendali administrator.
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex flex-wrap items-center gap-2.5">
          {customers.length > 0 && (
            <button
              onClick={() => setShowClearConfirmModal(true)}
              className="px-4 py-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105"
              title="Kosongkan / Bersihkan seluruh data pelanggan"
            >
              <Trash2 className="w-4 h-4" />
              <span>Bersihkan Semua</span>
            </button>
          )}

          {customers.length === 0 && (
            <button
              onClick={() => setCustomers(SAMPLE_DEMO_CUSTOMERS)}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105"
              title="Muat data contoh demo untuk simulasi"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Muat Contoh Demo</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto px-5 py-3 btn-teal-gradient rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Customer Baru</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="clean-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold font-outfit">Total Pelanggan</span>
            <Users className="w-4 h-4 text-[#156d67]" />
          </div>
          <p className="text-2xl font-black text-[#12645e] dark:text-[#5fd0df] font-outfit">{stats.total}</p>
          <p className="text-[11px] text-slate-500">{stats.activeCount} lisensi aktif</p>
        </div>

        <div className="clean-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold font-outfit">Paket Pro Aktif</span>
            <Zap className="w-4 h-4 text-[#2fa89b]" />
          </div>
          <p className="text-2xl font-black text-[#2fa89b] font-outfit">{stats.proCount}</p>
          <p className="text-[11px] text-slate-500">Rp 199rb / tahun</p>
        </div>

        <div className="clean-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold font-outfit">Paket Pemula Gratis</span>
            <Building2 className="w-4 h-4 text-slate-500" />
          </div>
          <p className="text-2xl font-black text-slate-700 dark:text-slate-300 font-outfit">{stats.freeCount}</p>
          <p className="text-[11px] text-slate-500">Akses Dasar</p>
        </div>

        <div className="clean-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold font-outfit">Estimasi Pendapatan (ARR)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-outfit">
            Rp {(stats.annualRevenue / 1000).toLocaleString('id-ID')}rb
          </p>
          <p className="text-[11px] text-slate-500">Pendapatan tahunan</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="clean-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pelanggan berdasarkan nama, email, instansi, nomor telepon, atau SIPA..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] transition-all"
            />
          </div>

          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 font-outfit">Paket:</span>
              <select
                value={selectedPlanFilter}
                onChange={(e) => setSelectedPlanFilter(e.target.value)}
                className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-3 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1]"
              >
                <option value="Semua">Semua Paket</option>
                <option value="Pemula">Pemula (Gratis)</option>
                <option value="Pro">Pro (199rb/thn)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 font-outfit">Status:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-3 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1]"
              >
                <option value="Semua">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="trial">Uji Coba</option>
                <option value="expired">Kadaluarsa</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Customers Table with Password Column & Deep Edit */}
      <div className="clean-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#06191c] border-b border-slate-200 dark:border-[#184c53] text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-outfit">
                <th className="py-4 px-4">Pelanggan / Instansi</th>
                <th className="py-4 px-4">Password Akses</th>
                <th className="py-4 px-4">Paket Subskripsi</th>
                <th className="py-4 px-4">Status Lisensi</th>
                <th className="py-4 px-4">Masa Aktif</th>
                <th className="py-4 px-4 text-right">Aksi Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#184c53] text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Tidak ada data pelanggan yang sesuai dengan kriteria pencarian/filter.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const isExpiringSoon = cust.expiresAt && (new Date(cust.expiresAt).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000);
                  const isVisible = !!visiblePasswords[cust.uid];
                  const isCopied = copiedPasswordUid === cust.uid;
                  const currentPassword = cust.password || 'CustPass#' + cust.uid.slice(-4);

                  return (
                    <tr key={cust.uid} className="hover:bg-slate-50/80 dark:hover:bg-[#0d2c31]/50 transition-colors">
                      {/* Name & Email & Institution */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#12645e] to-[#3dbfd1] text-white font-black font-outfit flex items-center justify-center shrink-0 shadow-xs">
                            {cust.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white font-outfit">{cust.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{cust.email}</p>
                            {cust.institution && (
                              <p className="text-[10px] text-[#156d67] dark:text-[#5fd0df] font-semibold mt-0.5 flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {cust.institution}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Password Column with Eye Toggle & One-Click Copy */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-[#06191c] px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#184c53]">
                          <span className={`font-mono text-xs font-bold ${isVisible ? 'text-[#12645e] dark:text-[#5fd0df]' : 'text-slate-400 tracking-widest'}`}>
                            {isVisible ? currentPassword : '••••••••'}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(cust.uid)}
                            title={isVisible ? "Sembunyikan password" : "Lihat password"}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#184c53] transition-colors cursor-pointer"
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyPassword(cust.uid, currentPassword)}
                            title="Salin password ke clipboard"
                            className="text-slate-400 hover:text-teal-600 dark:hover:text-[#5fd0df] p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#184c53] transition-colors cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Subscription Plan Badge */}
                      <td className="py-4 px-4">
                        {(cust.subscriptionPlan === 'Elite' || cust.subscriptionPlan === 'Klinik') && (
                          <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-2.5 py-1 rounded-full text-xs font-extrabold font-outfit">
                            <Building2 className="w-3.5 h-3.5" />
                            Elite
                          </span>
                        )}
                        {cust.subscriptionPlan === 'Pro' && (
                          <span className="inline-flex items-center gap-1 bg-teal-50 dark:bg-[#156d67]/20 text-[#156d67] dark:text-[#5fd0df] border border-teal-200 dark:border-[#3dbfd1]/30 px-2.5 py-1 rounded-full text-xs font-extrabold font-outfit">
                            <Zap className="w-3.5 h-3.5" />
                            Pro
                          </span>
                        )}
                        {(cust.subscriptionPlan === 'Pemula' || cust.subscriptionPlan === 'Gratis') && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold font-outfit">
                            Pemula
                          </span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        {cust.subscriptionStatus === 'active' && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            Aktif
                          </span>
                        )}
                        {cust.subscriptionStatus === 'trial' && (
                          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit">
                            <Clock className="w-3 h-3 text-amber-500" />
                            Uji Coba
                          </span>
                        )}
                        {cust.subscriptionStatus === 'expired' && (
                          <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit">
                            <XCircle className="w-3 h-3 text-rose-500" />
                            Kadaluarsa
                          </span>
                        )}
                      </td>

                      {/* Expiry Date */}
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        {cust.expiresAt ? (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className={isExpiringSoon ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>
                              {new Date(cust.expiresAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right space-x-1.5">
                        {(cust.subscriptionPlan === 'Pemula' || cust.subscriptionPlan === 'Gratis') && (
                          <button
                            onClick={() => handleUpgradeToPro(cust.uid)}
                            title="Aktifkan Akun Menjadi Paket Pro (+1 Tahun)"
                            className="px-2.5 py-1 text-[11px] font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-xs transition-all cursor-pointer font-outfit inline-flex items-center gap-1"
                          >
                            <Zap className="w-3 h-3 fill-slate-950" />
                            <span>Aktifkan Pro</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleExtendSubscription(cust.uid, 12)}
                          title="Perpanjang Masa Aktif +1 Tahun"
                          className="px-2.5 py-1 text-[11px] font-bold text-[#156d67] dark:text-[#5fd0df] bg-teal-50 dark:bg-[#156d67]/20 hover:bg-teal-100 dark:hover:bg-[#156d67]/40 border border-teal-200 dark:border-[#3dbfd1]/30 rounded-lg transition-colors cursor-pointer font-outfit"
                        >
                          +1 Thn
                        </button>
                        
                        <button
                          onClick={() => handleToggleStatus(cust.uid)}
                          title="Ubah Status Aktif/Kadaluarsa"
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer font-outfit"
                        >
                          {cust.subscriptionStatus === 'active' ? 'Off' : 'On'}
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(cust)}
                          title="Edit Detil Customer Lebih Jauh"
                          className="p-1.5 text-slate-500 hover:text-[#156d67] dark:hover:text-[#5fd0df] hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-lg transition-colors inline-flex items-center cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeletingCustomer(cust)}
                          title="Hapus Customer"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors inline-flex items-center cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Tambah Pelanggan Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#092327] w-full max-w-xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-[#184c53] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#184c53] pb-3">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-outfit">
                <Plus className="w-5 h-5 text-[#3dbfd1]" />
                Tambah Pelanggan Subskripsi Baru
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddCustomer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Nama Lengkap / PIC</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Contoh: apt. Rina Wati, S.Farm"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="rina@kliniksehat.com"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Field with Generator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-outfit">Password Akun Customer</label>
                  <button
                    type="button"
                    onClick={() => setFormState(prev => ({ ...prev, password: generateRandomPassword() }))}
                    className="text-[11px] font-bold text-[#156d67] dark:text-[#5fd0df] hover:underline flex items-center gap-1 cursor-pointer font-outfit"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Acak Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showModalPassword ? 'text' : 'password'}
                    required
                    value={formState.password}
                    onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                    className="w-full pl-3.5 pr-10 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Instansi / Klinik / RS</label>
                  <input
                    type="text"
                    value={formState.institution}
                    onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                    placeholder="Contoh: RS Medika Sejahtera"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">No. WhatsApp / HP</label>
                  <input
                    type="text"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Pilihan Paket</label>
                  <select
                    value={formState.subscriptionPlan}
                    onChange={(e) => setFormState({ ...formState, subscriptionPlan: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  >
                    <option value="Pemula">Pemula (Gratis)</option>
                    <option value="Pro">Pro (Rp 199.000 / tahun)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Masa Aktif Hingga</label>
                  <input
                    type="date"
                    required
                    value={formState.expiresAtDate}
                    onChange={(e) => setFormState({ ...formState, expiresAtDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-[#184c53]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white btn-teal-gradient rounded-xl shadow-md cursor-pointer"
                >
                  Simpan Pelanggan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Deep Edit Pelanggan (Mengedit Lebih Jauh & Password) */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#092327] w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-[#184c53] max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#184c53] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#12645e] to-[#3dbfd1] text-white flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Edit Pelanggan: {editingCustomer.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">UID: {editingCustomer.uid}</p>
                </div>
              </div>

              <button onClick={() => setEditingCustomer(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Subtabs for Deep Edit */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#06191c] rounded-2xl border border-slate-200 dark:border-[#184c53]">
              <button
                type="button"
                onClick={() => setEditModalTab('profile')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 font-outfit cursor-pointer ${
                  editModalTab === 'profile'
                    ? 'bg-white dark:bg-[#0d2c31] text-[#12645e] dark:text-[#5fd0df] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Profil & Password</span>
              </button>

              <button
                type="button"
                onClick={() => setEditModalTab('license')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 font-outfit cursor-pointer ${
                  editModalTab === 'license'
                    ? 'bg-white dark:bg-[#0d2c31] text-[#12645e] dark:text-[#5fd0df] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Lisensi & Masa Aktif</span>
              </button>

              <button
                type="button"
                onClick={() => setEditModalTab('permissions')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 font-outfit cursor-pointer ${
                  editModalTab === 'permissions'
                    ? 'bg-white dark:bg-[#0d2c31] text-[#12645e] dark:text-[#5fd0df] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Hak Akses & Kuota</span>
              </button>

              <button
                type="button"
                onClick={() => setEditModalTab('notes')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 font-outfit cursor-pointer ${
                  editModalTab === 'notes'
                    ? 'bg-white dark:bg-[#0d2c31] text-[#12645e] dark:text-[#5fd0df] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Catatan Internal</span>
              </button>
            </div>

            <form onSubmit={handleSaveEditCustomer} className="space-y-4">
              
              {/* TAB 1: Profile & Credentials */}
              {editModalTab === 'profile' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Nama Lengkap Customer</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Email Akun</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password & Generator */}
                  <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-[#06191c] border border-teal-200 dark:border-[#184c53] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#12645e] dark:text-[#5fd0df] flex items-center gap-1.5 font-outfit">
                        <KeyRound className="w-3.5 h-3.5" />
                        Password Akun (Bisa Dilihat & Diubah Admin)
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormState(prev => ({ ...prev, password: generateRandomPassword() }))}
                        className="text-[11px] font-bold text-[#156d67] dark:text-[#5fd0df] hover:underline flex items-center gap-1 cursor-pointer font-outfit"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Acak Baru
                      </button>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type={showModalPassword ? 'text' : 'password'}
                        required
                        value={formState.password}
                        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                        className="w-full pl-3.5 pr-20 py-2 bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                      <div className="absolute right-2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setShowModalPassword(!showModalPassword)}
                          title={showModalPassword ? "Sembunyikan" : "Tampilkan"}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#184c53] cursor-pointer"
                        >
                          {showModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(formState.password);
                            alert('Password berhasil disalin!');
                          }}
                          title="Salin Password"
                          className="p-1.5 text-slate-400 hover:text-[#156d67] dark:hover:text-[#5fd0df] rounded-lg hover:bg-slate-100 dark:hover:bg-[#184c53] cursor-pointer"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Instansi / Fasilitas Kesehatan</label>
                      <input
                        type="text"
                        value={formState.institution}
                        onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                        placeholder="Contoh: RS Medika Sejahtera"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">No. WhatsApp / HP</label>
                      <input
                        type="text"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Nomor SIPA / SIP / STR / Izin Praktik</label>
                    <input
                      type="text"
                      value={formState.licenseNumber}
                      onChange={(e) => setFormState({ ...formState, licenseNumber: e.target.value })}
                      placeholder="Contoh: SIPA: 19920814/SIPA_31.74/2023/2019"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: License & Expiration Management */}
              {editModalTab === 'license' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Paket Subskripsi</label>
                      <select
                        value={formState.subscriptionPlan}
                        onChange={(e) => setFormState({ ...formState, subscriptionPlan: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      >
                        <option value="Pemula">Pemula (Gratis)</option>
                        <option value="Pro">Pro (Rp 199.000 / tahun)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Status Lisensi</label>
                      <select
                        value={formState.subscriptionStatus}
                        onChange={(e) => setFormState({ ...formState, subscriptionStatus: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      >
                        <option value="active">Aktif</option>
                        <option value="trial">Uji Coba (Trial)</option>
                        <option value="expired">Kadaluarsa (Expired)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">Tanggal Masa Aktif Berakhir</label>
                    <input
                      type="date"
                      required
                      value={formState.expiresAtDate}
                      onChange={(e) => setFormState({ ...formState, expiresAtDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                    />
                  </div>

                  {/* Quick Extension Buttons */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-outfit">Tombol Cepat Tambah Durasi:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickAddMonths(1)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 transition-colors cursor-pointer"
                      >
                        +1 Bulan
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddMonths(3)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 transition-colors cursor-pointer"
                      >
                        +3 Bulan
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddMonths(6)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 transition-colors cursor-pointer"
                      >
                        +6 Bulan
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddMonths(12)}
                        className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-[#156d67]/20 border border-teal-200 dark:border-[#3dbfd1]/30 text-xs font-bold text-[#156d67] dark:text-[#5fd0df] hover:bg-teal-100 transition-colors cursor-pointer"
                      >
                        +1 Tahun (12 Bulan)
                      </button>
                      <button
                        type="button"
                        onClick={handleSetLifetime}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        Set Seumur Hidup (2099)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Feature Permissions & Quotas */}
              {editModalTab === 'permissions' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">
                        Batas Maksimum Pemeriksaan Obat per Resep
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={formState.maxDrugsOverride}
                          onChange={(e) => setFormState({ ...formState, maxDrugsOverride: Number(e.target.value) })}
                          className="w-32 px-3.5 py-2 bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold font-mono focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                        />
                        <span className="text-xs text-slate-500 font-medium">obat sekaligus dalam 1 formulir resep</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-[#184c53]">
                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                            <Download className="w-3.5 h-3.5 text-[#156d67] dark:text-[#3dbfd1]" />
                            Izin Cetak & Ekspor PDF Laporan Klinis
                          </span>
                          <p className="text-[11px] text-slate-500">Mampu mencetak dokumen resmi kajian interaksi obat dengan kop klinik.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={formState.canExportPdf}
                          onChange={(e) => setFormState({ ...formState, canExportPdf: e.target.checked })}
                          className="w-4 h-4 text-[#156d67] rounded focus:ring-[#3dbfd1]"
                        />
                      </label>

                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                            <Calculator className="w-3.5 h-3.5 text-[#156d67] dark:text-[#3dbfd1]" />
                            Akses Kalkulator Ginjal & Dosis Pediatrik
                          </span>
                          <p className="text-[11px] text-slate-500">Kalkulasi eGFR/CrCl dan dosis anak berbasis BB/Usia/BSA.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={formState.canAccessRenal}
                          onChange={(e) => setFormState({ ...formState, canAccessRenal: e.target.checked })}
                          className="w-4 h-4 text-[#156d67] rounded focus:ring-[#3dbfd1]"
                        />
                      </label>

                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5 text-[#156d67] dark:text-[#3dbfd1]" />
                            Akses Modul Penapisan Polifarmasi Lengkap
                          </span>
                          <p className="text-[11px] text-slate-500">Penapisan peringatan kehamilan, laktasi, lansia, dan jadwal minum obat.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={formState.canAccessPolypharmacy}
                          onChange={(e) => setFormState({ ...formState, canAccessPolypharmacy: e.target.checked })}
                          className="w-4 h-4 text-[#156d67] rounded focus:ring-[#3dbfd1]"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Internal Admin Notes */}
              {editModalTab === 'notes' && (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">
                      Catatan Administrator (Hanya Dilihat oleh Tim Admin)
                    </label>
                    <textarea
                      rows={5}
                      value={formState.notes}
                      onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      placeholder="Tulis catatan penting, contoh: Bukti transfer BCA An. dr. Budi No. Ref 908123, PIC apt. Siti, langganan 2 tahun..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] text-[11px] text-slate-500 space-y-1">
                    <p>• <strong>Dibuat pada:</strong> {editingCustomer.createdAt ? new Date(editingCustomer.createdAt).toLocaleString('id-ID') : '-'}</p>
                    <p>• <strong>ID Pelanggan:</strong> <code className="font-mono text-slate-700 dark:text-slate-300">{editingCustomer.uid}</code></p>
                  </div>
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-[#184c53]">
                <button
                  type="button"
                  onClick={() => {
                    const pass = formState.password;
                    navigator.clipboard.writeText(`Akun FarmasiDruggist:\nEmail: ${formState.email}\nPassword: ${pass}\nPaket: ${formState.subscriptionPlan}`);
                    alert('Data akun & password berhasil disalin!');
                  }}
                  className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer font-outfit"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Info Akun</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCustomer(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white btn-teal-gradient rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Konfirmasi Hapus Customer */}
      {deletingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#092327] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 border border-slate-200 dark:border-[#184c53]">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">Hapus Akun Customer?</h3>
              <p className="text-xs text-slate-500">
                Apakah Anda yakin ingin menghapus data customer <strong>{deletingCustomer.name}</strong> ({deletingCustomer.email})? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingCustomer(null)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteCustomer}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Konfirmasi Bersihkan Semua Pelanggan */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#092327] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 border border-slate-200 dark:border-[#184c53]">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">Bersihkan Semua Pelanggan?</h3>
              <p className="text-xs text-slate-500">
                Apakah Anda yakin ingin mengosongkan dan menghapus seluruh ({customers.length}) data pelanggan? Data dummy tidak akan dimuat kembali secara otomatis.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirmModal(false)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomers([]);
                  setShowClearConfirmModal(false);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md cursor-pointer"
              >
                Ya, Bersihkan Semua
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
