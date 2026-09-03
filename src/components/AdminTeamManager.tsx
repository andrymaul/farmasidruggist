import React, { useState, useMemo } from 'react';
import { AdminUser, AdminRoleType, AdminPermissionSet } from '../types';
import { 
  Users, 
  ShieldCheck, 
  Search, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Lock, 
  UserCheck, 
  Trash2, 
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Sparkles, 
  X, 
  Check, 
  BookOpen, 
  Phone, 
  Mail, 
  Crown,
  RotateCcw,
  AlertTriangle,
  Layers,
  Database,
  RefreshCw,
  Syringe,
  HeartHandshake,
  FlaskConical,
  Leaf,
  Activity,
  Calculator,
  CalendarClock,
  Baby,
  Stethoscope,
  MessageSquare,
  HeartPulse,
  GraduationCap,
  ClipboardList,
  Scale,
  BookMarked,
  Tag,
  Zap,
  Sliders
} from 'lucide-react';

interface AdminTeamManagerProps {
  adminUsers: AdminUser[];
  onSaveAdminUser: (admin: AdminUser) => void;
  onDeleteAdminUser: (adminId: string) => void;
}

export const AdminTeamManager: React.FC<AdminTeamManagerProps> = ({
  adminUsers,
  onSaveAdminUser,
  onDeleteAdminUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('Semua');
  const [selectedCardFilter, setSelectedCardFilter] = useState<'all' | 'super' | 'apoteker-editor' | 'support'>('all');
  const [message, setMessage] = useState('');

  // Password visibility states
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<AdminUser | null>(null);
  const [activePermissionTab, setActivePermissionTab] = useState<'all' | 'admin' | 'clinical' | 'calculators' | 'education'>('all');

  // Form State
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    password: string;
    phone: string;
    roleType: AdminRoleType;
    status: 'active' | 'suspended';
    permissions: AdminPermissionSet;
  }>({
    name: '',
    email: '',
    password: 'admin123',
    phone: '',
    roleType: 'Editor Konten Obat',
    status: 'active',
    permissions: {
      canManageDrugs: true,
      canManageInteractions: true,
      canManageSubscriptions: false,
      canManagePricing: false,
      canManageFoodInteractions: true,
      canManageTherapeuticDuplication: true,
      canManageFirebaseSync: false,
      canViewAuditLogs: false,
      canManageTeamAdmins: false,
      canAccessInteractions: true,
      canAccessPregnancy: true,
      canAccessDrugLab: true,
      canAccessHerbDrug: true,
      canAccessSideEffects: true,
      canAccessIvCompatibility: true,
      canAccessBud: true,
      canAccessPediatric: true,
      canAccessRenal: true,
      canAccessPolypharmacy: true,
      canAccessWhatsappPio: true,
      canAccessGuidelines: true,
      canAccessCompetency: true,
      canAccessSop: true,
      canAccessRegulations: true,
      canAccessLiterature: true
    }
  });

  // Calculate Stats
  const stats = useMemo(() => {
    const total = adminUsers.length;
    const superAdminCount = adminUsers.filter(u => u.roleType === 'Super Admin').length;
    const apotekerCount = adminUsers.filter(u => u.roleType === 'Apoteker Pengelola').length;
    const editorCount = adminUsers.filter(u => u.roleType === 'Editor Konten Obat').length;
    const supportCount = adminUsers.filter(u => u.roleType === 'Support Staff').length;

    return { total, superAdminCount, apotekerCount, editorCount, supportCount };
  }, [adminUsers]);

  // Filtered List
  const filteredAdmins = useMemo(() => {
    return adminUsers.filter(u => {
      const matchesSearch = searchQuery === '' || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.phone && u.phone.includes(searchQuery));

      let matchesRole = true;
      if (selectedRoleFilter === 'apoteker-editor') {
        matchesRole = u.roleType === 'Apoteker Pengelola' || u.roleType === 'Editor Konten Obat';
      } else if (selectedRoleFilter !== 'Semua') {
        matchesRole = u.roleType === selectedRoleFilter;
      }

      return matchesSearch && matchesRole;
    });
  }, [adminUsers, searchQuery, selectedRoleFilter]);

  // Handlers
  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPassword = (id: string, pass: string) => {
    navigator.clipboard.writeText(pass);
    setCopiedId(id);
    setMessage(`Password staf admin disalin ke clipboard!`);
    setTimeout(() => {
      setCopiedId(null);
      setMessage('');
    }, 2500);
  };

  const handleGenerateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$!';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormState(prev => ({ ...prev, password: result }));
  };

  const handleOpenAddModal = () => {
    setEditingAdmin(null);
    setShowModalPassword(true);
    setActivePermissionTab('all');
    setFormState({
      name: '',
      email: '',
      password: 'admin' + Math.floor(100 + Math.random() * 900),
      phone: '',
      roleType: 'Apoteker Pengelola',
      status: 'active',
      permissions: {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: false,
        canManagePricing: false,
        canManageFoodInteractions: true,
        canManageTherapeuticDuplication: true,
        canManageFirebaseSync: false,
        canViewAuditLogs: true,
        canManageTeamAdmins: false,
        canAccessInteractions: true,
        canAccessPregnancy: true,
        canAccessDrugLab: true,
        canAccessHerbDrug: true,
        canAccessSideEffects: true,
        canAccessIvCompatibility: true,
        canAccessBud: true,
        canAccessPediatric: true,
        canAccessRenal: true,
        canAccessPolypharmacy: true,
        canAccessWhatsappPio: true,
        canAccessGuidelines: true,
        canAccessCompetency: true,
        canAccessSop: true,
        canAccessRegulations: true,
        canAccessLiterature: true
      }
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setShowModalPassword(false);
    setActivePermissionTab('all');
    setFormState({
      name: admin.name,
      email: admin.email,
      password: admin.password || 'admin123',
      phone: admin.phone || '',
      roleType: admin.roleType,
      status: admin.status,
      permissions: {
        canManageDrugs: admin.permissions.canManageDrugs ?? true,
        canManageInteractions: admin.permissions.canManageInteractions ?? true,
        canManageSubscriptions: admin.permissions.canManageSubscriptions ?? false,
        canManagePricing: admin.permissions.canManagePricing ?? false,
        canManageFoodInteractions: admin.permissions.canManageFoodInteractions ?? true,
        canManageTherapeuticDuplication: admin.permissions.canManageTherapeuticDuplication ?? true,
        canManageFirebaseSync: admin.permissions.canManageFirebaseSync ?? false,
        canViewAuditLogs: admin.permissions.canViewAuditLogs ?? true,
        canManageTeamAdmins: admin.permissions.canManageTeamAdmins ?? false,
        canAccessInteractions: admin.permissions.canAccessInteractions ?? true,
        canAccessPregnancy: admin.permissions.canAccessPregnancy ?? true,
        canAccessDrugLab: admin.permissions.canAccessDrugLab ?? true,
        canAccessHerbDrug: admin.permissions.canAccessHerbDrug ?? true,
        canAccessSideEffects: admin.permissions.canAccessSideEffects ?? true,
        canAccessIvCompatibility: admin.permissions.canAccessIvCompatibility ?? true,
        canAccessBud: admin.permissions.canAccessBud ?? true,
        canAccessPediatric: admin.permissions.canAccessPediatric ?? true,
        canAccessRenal: admin.permissions.canAccessRenal ?? true,
        canAccessPolypharmacy: admin.permissions.canAccessPolypharmacy ?? true,
        canAccessWhatsappPio: admin.permissions.canAccessWhatsappPio ?? true,
        canAccessGuidelines: admin.permissions.canAccessGuidelines ?? true,
        canAccessCompetency: admin.permissions.canAccessCompetency ?? true,
        canAccessSop: admin.permissions.canAccessSop ?? true,
        canAccessRegulations: admin.permissions.canAccessRegulations ?? true,
        canAccessLiterature: admin.permissions.canAccessLiterature ?? true
      }
    });
    setShowAddModal(true);
  };

  const handleRolePresetChange = (role: AdminRoleType) => {
    let presetPerms: AdminPermissionSet = {
      canManageDrugs: false,
      canManageInteractions: false,
      canManageSubscriptions: false,
      canManagePricing: false,
      canManageFoodInteractions: false,
      canManageTherapeuticDuplication: false,
      canManageFirebaseSync: false,
      canViewAuditLogs: false,
      canManageTeamAdmins: false,
      canAccessInteractions: false,
      canAccessPregnancy: false,
      canAccessDrugLab: false,
      canAccessHerbDrug: false,
      canAccessSideEffects: false,
      canAccessIvCompatibility: false,
      canAccessBud: false,
      canAccessPediatric: false,
      canAccessRenal: false,
      canAccessPolypharmacy: false,
      canAccessWhatsappPio: false,
      canAccessGuidelines: false,
      canAccessCompetency: false,
      canAccessSop: false,
      canAccessRegulations: false,
      canAccessLiterature: false
    };

    if (role === 'Super Admin') {
      presetPerms = {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: true,
        canManagePricing: true,
        canManageFoodInteractions: true,
        canManageTherapeuticDuplication: true,
        canManageFirebaseSync: true,
        canViewAuditLogs: true,
        canManageTeamAdmins: true,
        canAccessInteractions: true,
        canAccessPregnancy: true,
        canAccessDrugLab: true,
        canAccessHerbDrug: true,
        canAccessSideEffects: true,
        canAccessIvCompatibility: true,
        canAccessBud: true,
        canAccessPediatric: true,
        canAccessRenal: true,
        canAccessPolypharmacy: true,
        canAccessWhatsappPio: true,
        canAccessGuidelines: true,
        canAccessCompetency: true,
        canAccessSop: true,
        canAccessRegulations: true,
        canAccessLiterature: true
      };
    } else if (role === 'Apoteker Pengelola') {
      presetPerms = {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: false,
        canManagePricing: false,
        canManageFoodInteractions: true,
        canManageTherapeuticDuplication: true,
        canManageFirebaseSync: false,
        canViewAuditLogs: true,
        canManageTeamAdmins: false,
        canAccessInteractions: true,
        canAccessPregnancy: true,
        canAccessDrugLab: true,
        canAccessHerbDrug: true,
        canAccessSideEffects: true,
        canAccessIvCompatibility: true,
        canAccessBud: true,
        canAccessPediatric: true,
        canAccessRenal: true,
        canAccessPolypharmacy: true,
        canAccessWhatsappPio: true,
        canAccessGuidelines: true,
        canAccessCompetency: true,
        canAccessSop: true,
        canAccessRegulations: true,
        canAccessLiterature: true
      };
    } else if (role === 'Editor Konten Obat') {
      presetPerms = {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: false,
        canManagePricing: false,
        canManageFoodInteractions: true,
        canManageTherapeuticDuplication: true,
        canManageFirebaseSync: false,
        canViewAuditLogs: false,
        canManageTeamAdmins: false,
        canAccessInteractions: true,
        canAccessPregnancy: false,
        canAccessDrugLab: false,
        canAccessHerbDrug: true,
        canAccessSideEffects: false,
        canAccessIvCompatibility: false,
        canAccessBud: false,
        canAccessPediatric: false,
        canAccessRenal: false,
        canAccessPolypharmacy: false,
        canAccessWhatsappPio: false,
        canAccessGuidelines: true,
        canAccessCompetency: true,
        canAccessSop: true,
        canAccessRegulations: true,
        canAccessLiterature: true
      };
    } else if (role === 'Support Staff') {
      presetPerms = {
        canManageDrugs: false,
        canManageInteractions: false,
        canManageSubscriptions: true,
        canManagePricing: false,
        canManageFoodInteractions: false,
        canManageTherapeuticDuplication: false,
        canManageFirebaseSync: false,
        canViewAuditLogs: true,
        canManageTeamAdmins: false,
        canAccessInteractions: false,
        canAccessPregnancy: false,
        canAccessDrugLab: false,
        canAccessHerbDrug: false,
        canAccessSideEffects: false,
        canAccessIvCompatibility: false,
        canAccessBud: false,
        canAccessPediatric: false,
        canAccessRenal: false,
        canAccessPolypharmacy: false,
        canAccessWhatsappPio: true,
        canAccessGuidelines: false,
        canAccessCompetency: false,
        canAccessSop: true,
        canAccessRegulations: false,
        canAccessLiterature: false
      };
    }

    setFormState(prev => ({
      ...prev,
      roleType: role,
      permissions: presetPerms
    }));
  };

  const handleTogglePermission = (key: keyof AdminPermissionSet) => {
    setFormState(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key]
      }
    }));
  };

  const handleSetAllPermissions = (value: boolean) => {
    setFormState(prev => {
      const next: AdminPermissionSet = { ...prev.permissions };
      (Object.keys(next) as (keyof AdminPermissionSet)[]).forEach(k => {
        next[k] = value;
      });
      return { ...prev, permissions: next };
    });
  };

  const handleSaveFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    const updatedAdmin: AdminUser = {
      id: editingAdmin ? editingAdmin.id : 'admin-' + Date.now(),
      name: formState.name,
      email: formState.email,
      password: formState.password || 'admin123',
      phone: formState.phone,
      roleType: formState.roleType,
      permissions: formState.permissions,
      status: formState.status,
      createdAt: editingAdmin ? editingAdmin.createdAt : new Date().toISOString(),
      lastLoginAt: editingAdmin ? editingAdmin.lastLoginAt : new Date().toISOString()
    };

    onSaveAdminUser(updatedAdmin);
    setMessage(`Staf Admin "${updatedAdmin.name}" berhasil disimpan!`);
    setShowAddModal(false);
  };

  const handleToggleStatus = (admin: AdminUser) => {
    const newStatus = admin.status === 'active' ? 'suspended' : 'active';
    onSaveAdminUser({ ...admin, status: newStatus });
    setMessage(`Status akun "${admin.name}" diubah menjadi ${newStatus === 'active' ? 'Aktif' : 'Ditangguhkan'}.`);
  };

  const handleConfirmDelete = () => {
    if (!deletingAdmin) return;
    onDeleteAdminUser(deletingAdmin.id);
    setMessage(`Akun staf admin "${deletingAdmin.name}" telah dihapus.`);
    setDeletingAdmin(null);
  };

  const getClinicalPermCount = (perms: AdminPermissionSet) => {
    const clinicalKeys: (keyof AdminPermissionSet)[] = [
      'canAccessInteractions', 'canAccessPregnancy', 'canAccessDrugLab', 'canAccessHerbDrug', 'canAccessSideEffects', 'canAccessIvCompatibility',
      'canAccessBud', 'canAccessPediatric', 'canAccessRenal',
      'canAccessPolypharmacy', 'canAccessWhatsappPio', 'canAccessGuidelines',
      'canAccessCompetency', 'canAccessSop', 'canAccessRegulations', 'canAccessLiterature'
    ];
    return clinicalKeys.filter(k => !!perms[k]).length;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-outfit">
      
      {/* Header Banner - Executive Clean Card with Dark Mode & Outfit Font */}
      <div className="bg-white dark:bg-[#06191c] rounded-2xl p-6 sm:p-7 text-slate-900 dark:text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200 dark:border-[#184c53] relative overflow-hidden font-outfit">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-[#156d67]/30 text-teal-700 dark:text-[#5fd0df] text-xs font-bold border border-teal-200 dark:border-[#3dbfd1]/30 font-outfit">
            <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-[#5fd0df]" />
            <span>Manajemen Akses Multi-Staf Administrator</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-outfit">
            Manajemen Tim Admin &amp; Hak Akses
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed font-outfit">
            Kelola akun tim administrator, tentukan peran staf (*Apoteker Pengelola, Editor Konten, Support*), dan atur centang hak akses per modul database master &amp; fitur klinis secara terpusat.
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 cursor-pointer hover:scale-102 transition-all font-outfit"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Staf Admin Baru</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 bg-teal-50 dark:bg-[#092b31] border border-teal-200 dark:border-[#184c53] rounded-2xl text-xs font-bold text-[#12645e] dark:text-[#5fd0df] flex items-center justify-between shadow-xs font-outfit animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">✕</button>
        </div>
      )}

      {/* Metrics Row - 4 Executive Obsidian & Jewel Tones Cards (Mirrored from Customer Subscriptions) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 1. Total Staf Admin - Deep Midnight Teal */}
        <div 
          onClick={() => {
            setSelectedCardFilter('all');
            setSelectedRoleFilter('Semua');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-white border ${
            selectedCardFilter === 'all' && selectedRoleFilter === 'Semua'
              ? 'ring-2 ring-teal-400 bg-gradient-to-br from-[#0c2f35] via-[#082226] to-[#041215] border-teal-400/60 shadow-xl shadow-teal-950/40'
              : 'bg-gradient-to-br from-[#09252a] via-[#071c20] to-[#041215] border-[#134950] shadow-lg shadow-black/20 hover:border-teal-500/50'
          }`}
          title="Klik untuk melihat semua staf admin"
        >
          <div className="flex items-center justify-between text-teal-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-300/90 font-outfit">Total Staf Admin</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-300 border border-teal-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <Users className="w-4 h-4 text-teal-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight">{stats.total}</p>
          <p className="text-[11px] text-teal-200/70 font-medium font-outfit">Akun pengelola sistem</p>
        </div>

        {/* 2. Super Admin - Imperial Obsidian & Royal Violet / Purple */}
        <div 
          onClick={() => {
            setSelectedCardFilter('super');
            setSelectedRoleFilter('Super Admin');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-purple-100 border ${
            selectedRoleFilter === 'Super Admin'
              ? 'ring-2 ring-purple-400 bg-gradient-to-br from-[#2a0e3c] via-[#1f0a2e] to-[#12051a] border-purple-400/70 shadow-xl shadow-purple-950/40'
              : 'bg-gradient-to-br from-[#1e0a2b] via-[#15071f] to-[#0a030f] border-purple-500/30 shadow-lg shadow-black/20 hover:border-purple-400/60'
          }`}
          title="Klik untuk memfilter Super Admin"
        >
          <div className="flex items-center justify-between text-purple-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-300/90 font-outfit">Super Admin</span>
            <div className="w-8 h-8 rounded-xl bg-purple-400/15 text-purple-300 border border-purple-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-purple-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-purple-300 font-outfit tracking-tight drop-shadow-xs">{stats.superAdminCount}</p>
          <p className="text-[11px] text-purple-200/70 font-semibold font-outfit">Akses penuh sistem</p>
        </div>

        {/* 3. Apoteker & Editor - Executive Deep Jewel Teal */}
        <div 
          onClick={() => {
            setSelectedCardFilter('apoteker-editor');
            setSelectedRoleFilter('apoteker-editor');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-teal-100 border ${
            selectedRoleFilter === 'apoteker-editor' || selectedRoleFilter === 'Apoteker Pengelola' || selectedRoleFilter === 'Editor Konten Obat'
              ? 'ring-2 ring-teal-400 bg-gradient-to-br from-[#0c2f35] via-[#082226] to-[#041215] border-teal-400/60 shadow-xl shadow-teal-950/40'
              : 'bg-gradient-to-br from-[#09252a] via-[#071c20] to-[#041215] border-[#134950] shadow-lg shadow-black/20 hover:border-teal-500/50'
          }`}
          title="Klik untuk memfilter Apoteker &amp; Editor Konten"
        >
          <div className="flex items-center justify-between text-teal-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-300/90 font-outfit">Apoteker &amp; Editor</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-300 border border-teal-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <BookOpen className="w-4 h-4 text-teal-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight">{stats.apotekerCount + stats.editorCount}</p>
          <p className="text-[11px] text-teal-200/70 font-semibold font-outfit">Pengelola konten klinis</p>
        </div>

        {/* 4. Staf Support / CS - Imperial Obsidian & Champagne Gold */}
        <div 
          onClick={() => {
            setSelectedCardFilter('support');
            setSelectedRoleFilter('Support Staff');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-amber-100 border ${
            selectedRoleFilter === 'Support Staff'
              ? 'ring-2 ring-amber-400 bg-gradient-to-br from-[#2a2208] via-[#1c1604] to-[#0f0c02] border-amber-400/70 shadow-xl shadow-amber-950/40'
              : 'bg-gradient-to-br from-[#201905] via-[#161203] to-[#0c0902] border-amber-500/30 shadow-lg shadow-black/20 hover:border-amber-400/60'
          }`}
          title="Klik untuk memfilter Support Staff"
        >
          <div className="flex items-center justify-between text-amber-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300/90 font-outfit">Staf Support / CS</span>
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <UserCheck className="w-4 h-4 text-amber-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-amber-300 font-outfit tracking-tight drop-shadow-xs">{stats.supportCount}</p>
          <p className="text-[11px] text-amber-200/70 font-semibold font-outfit">Layanan pelanggan</p>
        </div>
      </div>

      {/* Filter & Search Bar - Clean Unified Single Row (Mirrored from Customer Subscriptions) */}
      <div className="bg-white dark:bg-[#06191c] p-3 rounded-2xl border border-slate-200 dark:border-[#184c53] shadow-xs font-outfit">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari staf admin berdasarkan nama, email, atau nomor HP..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] transition-all font-outfit"
            />
          </div>

          {/* Role Filter */}
          <select
            value={selectedRoleFilter}
            onChange={(e) => {
              setSelectedRoleFilter(e.target.value);
              setSelectedCardFilter(e.target.value === 'Super Admin' ? 'super' : e.target.value === 'Support Staff' ? 'support' : e.target.value === 'apoteker-editor' ? 'apoteker-editor' : 'all');
            }}
            className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-2.5 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit"
          >
            <option value="Semua">🛡️ Semua Peran</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Apoteker Pengelola">Apoteker Pengelola</option>
            <option value="Editor Konten Obat">Editor Konten Obat</option>
            <option value="Support Staff">Support Staff</option>
          </select>

          {/* Reset Filter Button */}
          {(searchQuery || selectedRoleFilter !== 'Semua') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRoleFilter('Semua');
                setSelectedCardFilter('all');
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#0d2c31] transition-colors cursor-pointer shrink-0 font-outfit"
              title="Reset pencarian & filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Team Table - With Executive Dark Blue/Teal Table Header */}
      <div className="bg-white dark:bg-[#06191c] rounded-2xl border border-slate-200 dark:border-[#184c53] shadow-xs overflow-hidden font-outfit">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 dark:bg-[#031013] text-white border-b-2 border-teal-500 text-[11px] font-extrabold uppercase tracking-wider font-outfit shadow-xs">
                <th className="py-4 px-4 text-slate-200">Nama Staf &amp; Email</th>
                <th className="py-4 px-4 text-slate-200">Password Login</th>
                <th className="py-4 px-4 text-slate-200">Peran Administrator</th>
                <th className="py-4 px-4 text-slate-200">Hak Akses Modul (Permissions)</th>
                <th className="py-4 px-4 text-slate-200">Status</th>
                <th className="py-4 px-4 text-right text-slate-200">Aksi Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#184c53] text-xs font-outfit">
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                    Tidak ada staf admin yang sesuai dengan kriteria pencarian/filter.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => {
                  const isVisible = !!visiblePasswords[admin.id];
                  const isCopied = copiedId === admin.id;
                  const currentPassword = admin.password || 'admin123';
                  const clinicalCount = getClinicalPermCount(admin.permissions);

                  return (
                    <tr 
                      key={admin.id} 
                      className="group hover:bg-slate-50/80 dark:hover:bg-[#07242a]/40 transition-colors border-b border-slate-100 dark:border-[#0c2a30]/80"
                    >
                      {/* Name & Contact */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {admin.id === 'admin-main-000' || admin.roleType === 'Super Admin' ? (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black font-outfit text-xs flex items-center justify-center shadow-xs ring-2 ring-amber-400/50">
                                {admin.id === 'admin-main-000' ? <Crown className="w-4 h-4 text-slate-950 fill-amber-300" /> : admin.name.charAt(0)}
                              </div>
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-700 to-[#165651] text-teal-100 font-bold font-outfit text-xs flex items-center justify-center shadow-2xs ring-1 ring-teal-600/30">
                                {admin.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="font-bold text-[13px] text-slate-900 dark:text-slate-100 font-outfit tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {admin.name}
                              </p>
                              {admin.id === 'admin-main-000' && (
                                <span className="inline-flex items-center gap-1 text-[9.5px] px-2 py-0.5 rounded-full font-black bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 shadow-2xs font-outfit">
                                  <Crown className="w-3 h-3 text-amber-600 dark:text-amber-400" /> ADMIN UTAMA
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap font-outfit">
                              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400 shrink-0" />{admin.email}</span>
                              {admin.phone && (
                                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400 shrink-0" />{admin.phone}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Password Column with Minimalist Glass Capsule (Mirrored from Customer Subscriptions) */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-[#06191c]/80 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-[#134950]/60 hover:border-slate-300 dark:hover:border-[#185c64] transition-colors">
                          <KeyRound className="w-3.5 h-3.5 text-teal-600 dark:text-[#5fd0df] shrink-0" />
                          <span className={`font-mono text-xs ${isVisible ? 'font-bold text-teal-700 dark:text-[#5fd0df]' : 'text-slate-400 tracking-widest'}`}>
                            {isVisible ? currentPassword : '••••••••'}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(admin.id)}
                            title={isVisible ? "Sembunyikan password" : "Lihat password"}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-[#184c53] transition-colors cursor-pointer"
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyPassword(admin.id, currentPassword)}
                            title="Salin password"
                            className="text-slate-400 hover:text-teal-600 dark:hover:text-[#5fd0df] p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-[#184c53] transition-colors cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        {admin.roleType === 'Super Admin' && (
                          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500/15 to-purple-400/10 dark:from-purple-400/15 dark:to-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-300/80 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-black font-outfit shadow-2xs tracking-wide">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Super Admin</span>
                          </span>
                        )}
                        {admin.roleType === 'Apoteker Pengelola' && (
                          <span className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-300/80 dark:border-teal-500/30 px-3 py-1 rounded-full text-xs font-black font-outfit shadow-2xs">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Apoteker Pengelola</span>
                          </span>
                        )}
                        {admin.roleType === 'Editor Konten Obat' && (
                          <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-300/80 dark:border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold font-outfit shadow-2xs">
                            <span>Editor Konten Obat</span>
                          </span>
                        )}
                        {admin.roleType === 'Support Staff' && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold font-outfit shadow-2xs">
                            <span>Support Staff</span>
                          </span>
                        )}
                      </td>

                      {/* Permissions Badges Matching Exact Application Data */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex flex-wrap gap-1">
                          {admin.permissions.canManageDrugs && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">💊 671 Obat</span>}
                          {admin.permissions.canManageInteractions && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">⚡ 640 DDInter</span>}
                          {admin.permissions.canManageFoodInteractions && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">🍎 DFI</span>}
                          {admin.permissions.canManageTherapeuticDuplication && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">🔄 Duplikasi</span>}
                          {admin.permissions.canManageFirebaseSync && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">☁️ Firebase</span>}
                          {admin.permissions.canManageSubscriptions && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">👥 Subskripsi</span>}
                          {admin.permissions.canManagePricing && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">💳 Tarif</span>}
                          {admin.permissions.canViewAuditLogs && <span className="bg-slate-100 dark:bg-[#0a2327] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#134950]/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">📋 Audit Log</span>}
                          {admin.permissions.canManageTeamAdmins && <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/40 text-[10px] px-2 py-0.5 rounded-lg font-black font-outfit shadow-2xs">🔑 Akses Tim</span>}
                          
                          {/* Clinical Module Badge Count */}
                          {clinicalCount > 0 && (
                            <span className="bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-[#5fd0df] border border-teal-300/60 dark:border-teal-700/60 text-[10px] px-2 py-0.5 rounded-lg font-bold font-outfit shadow-2xs">
                              🩺 {clinicalCount === 16 ? '16 Modul Klinis Penuh' : `${clinicalCount} Modul Klinis`}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        {admin.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Aktif</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-300/80 dark:border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>Ditangguhkan</span>
                          </span>
                        )}
                      </td>

                      {/* Actions - Sleek Executive Ghost Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            onClick={() => handleToggleStatus(admin)}
                            title="Ubah Status Aktif/Ditangguhkan"
                            className={`px-2.5 py-1 text-[10.5px] font-bold rounded-lg border transition-all cursor-pointer font-outfit ${
                              admin.status === 'active' 
                                ? 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#0a2327] hover:bg-slate-200 dark:hover:bg-[#134950] border-slate-200 dark:border-slate-700' 
                                : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border-emerald-300 dark:border-emerald-700'
                            }`}
                          >
                            {admin.status === 'active' ? 'Suspend' : 'Aktifkan'}
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(admin)}
                            className="p-1.5 text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-[#09282d] border border-transparent hover:border-teal-200 dark:hover:border-teal-700/50 rounded-lg transition-all cursor-pointer hover:scale-105"
                            title="Edit Peran &amp; Hak Akses Staf"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {admin.id !== 'admin-main-000' && (
                            <button
                              onClick={() => setDeletingAdmin(admin)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-800/50 rounded-lg transition-all cursor-pointer hover:scale-105"
                              title="Hapus Akun Staf Admin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Tambah / Edit Staf Admin & Permission Matrix Matching Exact Application Data */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto font-outfit animate-in zoom-in-95 custom-scrollbar">
            
            {/* Modal Title */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-600 dark:text-[#5fd0df] border border-teal-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-outfit">
                    {editingAdmin ? 'Edit Staf Admin & Hak Akses' : 'Tambah Staf Admin Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Konfigurasi kredensial login &amp; matriks perizinan modul aplikasi
                  </p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFormSubmit} className="space-y-4 text-xs font-outfit">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap &amp; Gelar *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="apt. Budi Santoso, S.Farm"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#041215] border border-slate-200 dark:border-[#184c53] text-slate-800 dark:text-slate-100 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Instansi / Kerja *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="budi@farmasidruggist.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#041215] border border-slate-200 dark:border-[#184c53] text-slate-800 dark:text-slate-100 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700 dark:text-slate-300">Password Akun *</label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomPassword}
                      className="text-[10px] text-teal-600 dark:text-[#5fd0df] hover:text-teal-700 font-bold flex items-center gap-0.5 cursor-pointer font-outfit"
                    >
                      <Sparkles className="w-3 h-3" /> Acak
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showModalPassword ? "text" : "password"}
                      required
                      value={formState.password}
                      onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                      placeholder="Password login akun"
                      className="w-full pl-3 pr-9 py-2 bg-slate-50 dark:bg-[#041215] border border-slate-200 dark:border-[#184c53] rounded-xl font-mono text-xs font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalPassword(!showModalPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title={showModalPassword ? "Sembunyikan" : "Lihat"}
                    >
                      {showModalPassword ? <EyeOff className="w-4 h-4 text-teal-600 dark:text-[#5fd0df]" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor Telepon / WA</label>
                  <input
                    type="text"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#041215] border border-slate-200 dark:border-[#184c53] text-slate-800 dark:text-slate-100 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Role Preset Selector */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Peran Administrator (Preset Hak Akses)</label>
                <select
                  value={formState.roleType}
                  onChange={(e) => handleRolePresetChange(e.target.value as AdminRoleType)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#041215] border border-slate-200 dark:border-[#184c53] rounded-xl font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none font-outfit cursor-pointer"
                >
                  <option value="Super Admin">👑 Super Admin (Akses Penuh Semua Modul &amp; Database)</option>
                  <option value="Apoteker Pengelola">💊 Apoteker Pengelola (Katalog 671 Obat, DDInter &amp; Seluruh Modul Klinis)</option>
                  <option value="Editor Konten Obat">📝 Editor Konten Obat (Database Master, PNPK, SOP &amp; Regulasi Farmasi)</option>
                  <option value="Support Staff">🎧 Support Staff / CS (Subskripsi Customer, WA PIO &amp; Audit Log)</option>
                </select>
              </div>

              {/* PERMISSION CHECKBOX MATRIX - MATCHING ACTUAL DATA IN APPLICATION */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="block font-black text-slate-900 dark:text-white text-xs font-outfit">
                      Matriks Centang Hak Akses Modul (Permissions)
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Disesuaikan dengan modul master dan fitur klinis yang aktif di aplikasi
                    </p>
                  </div>

                  {/* Preset Action Toolbar */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSetAllPermissions(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-[#5fd0df] text-[10.5px] font-bold hover:bg-teal-100 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Centang Semua</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAllPermissions(false)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10.5px] font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <span>Reset Centang</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Tabs for Matrix Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActivePermissionTab('all')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                      activePermissionTab === 'all' 
                        ? 'bg-slate-900 dark:bg-[#15464d] text-white shadow-xs' 
                        : 'bg-slate-100 dark:bg-[#072428] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Semua ({9 + 6 + 3 + 7})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePermissionTab('admin')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                      activePermissionTab === 'admin' 
                        ? 'bg-amber-600 text-white shadow-xs' 
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    Panel Admin (9)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePermissionTab('clinical')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                      activePermissionTab === 'clinical' 
                        ? 'bg-rose-600 text-white shadow-xs' 
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-100'
                    }`}
                  >
                    Skrining Klinis (6)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePermissionTab('calculators')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                      activePermissionTab === 'calculators' 
                        ? 'bg-teal-600 text-white shadow-xs' 
                        : 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 hover:bg-teal-100'
                    }`}
                  >
                    Kalkulator Medis (3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePermissionTab('education')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                      activePermissionTab === 'education' 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-100'
                    }`}
                  >
                    Polifarmasi &amp; Edukasi (7)
                  </button>
                </div>

                {/* 1. KATEGORI: PANEL ADMIN & DATABASE MASTER FARMASI */}
                {(activePermissionTab === 'all' || activePermissionTab === 'admin') && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/40 dark:bg-[#110d05]/60 border border-amber-200/80 dark:border-amber-900/40 space-y-2.5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 font-outfit flex items-center gap-1.5 pb-1 border-b border-amber-200/60 dark:border-amber-900/40">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>Panel Administrasi &amp; Database Master (Menu Admin)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageDrugs}
                          onChange={() => handleTogglePermission('canManageDrugs')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Katalog Monografi Obat (671 Master)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Kelola 671+ katalog obat master, Fornas &amp; ATC</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageInteractions}
                          onChange={() => handleTogglePermission('canManageInteractions')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Interaksi Obat DDInter (640 Pasangan)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Aturan interaksi obat, keparahan &amp; mekanisme</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageFoodInteractions}
                          onChange={() => handleTogglePermission('canManageFoodInteractions')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Interaksi Obat &amp; Makanan (DFI)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Editor interaksi makanan (jus, susu, kafein, dll.)</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageTherapeuticDuplication}
                          onChange={() => handleTogglePermission('canManageTherapeuticDuplication')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Pemeriksaan Duplikasi Terapi</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Aturan duplikasi zat aktif &amp; polifarmasi</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageFirebaseSync}
                          onChange={() => handleTogglePermission('canManageFirebaseSync')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Sinkronisasi Cloud Firebase</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Akses Cloud Firestore &amp; cadangkan data awal</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageSubscriptions}
                          onChange={() => handleTogglePermission('canManageSubscriptions')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Subskripsi Customer &amp; Lisensi</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Kelola 175+ pelanggan, lisensi Pro &amp; kuota</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManagePricing}
                          onChange={() => handleTogglePermission('canManagePricing')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Tarif Layanan &amp; Hak Akses</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Konfigurasi harga paket, diskon &amp; rekening</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canViewAuditLogs}
                          onChange={() => handleTogglePermission('canViewAuditLogs')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Rekam Jejak Audit Log Sistem</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Lihat audit trail aktivitas &amp; rekam log sistem</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-purple-200/80 dark:border-purple-800/40 hover:border-purple-400 cursor-pointer transition-colors shadow-2xs col-span-1 sm:col-span-2">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canManageTeamAdmins}
                          onChange={() => handleTogglePermission('canManageTeamAdmins')}
                          className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-purple-900 dark:text-purple-300">Kelola Tim Admin (Super Admin Privilege)</p>
                          <p className="text-[10px] text-purple-700 dark:text-purple-400">Mengatur akun staf admin lain &amp; hak izin modul</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* 2. KATEGORI: MODUL SKRINING KLINIS & KEAMANAN RESEP */}
                {(activePermissionTab === 'all' || activePermissionTab === 'clinical') && (
                  <div className="p-3.5 rounded-2xl bg-rose-50/40 dark:bg-[#1a0709]/40 border border-rose-200/80 dark:border-rose-900/40 space-y-2.5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-rose-900 dark:text-rose-300 font-outfit flex items-center gap-1.5 pb-1 border-b border-rose-200/60 dark:border-rose-900/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                      <span>Modul Skrining Klinis &amp; Keamanan Resep</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-rose-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessInteractions}
                          onChange={() => handleTogglePermission('canAccessInteractions')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Cek Interaksi Obat (DDInter)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Skrining interaksi multi-obat klinis</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-pink-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessPregnancy}
                          onChange={() => handleTogglePermission('canAccessPregnancy')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Keamanan Bumil &amp; Busui</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Kategori risiko FDA PLLR &amp; laktasi Hale</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-cyan-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessDrugLab}
                          onChange={() => handleTogglePermission('canAccessDrugLab')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Interaksi Obat &amp; Uji Laboratorium</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Deteksi bias obat pada uji biomarker lab</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-emerald-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessHerbDrug}
                          onChange={() => handleTogglePermission('canAccessHerbDrug')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Interaksi Herbal &amp; Obat (Jamu)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Evaluasi sediaan Jamu, OHT &amp; Fitofarmaka</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessSideEffects}
                          onChange={() => handleTogglePermission('canAccessSideEffects')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Efek Samping &amp; Skor Naranjo (MESO)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Algoritma kausalitas ADR &amp; form MESO BPOM</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-sky-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessIvCompatibility}
                          onChange={() => handleTogglePermission('canAccessIvCompatibility')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Kompatibilitas Injeksi IV &amp; ICU (ASHP)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Skrining percabangan Y-Site &amp; pelarut infus</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* 3. KATEGORI: MODUL KALKULATOR MEDIS & RACIKAN */}
                {(activePermissionTab === 'all' || activePermissionTab === 'calculators') && (
                  <div className="p-3.5 rounded-2xl bg-teal-50/40 dark:bg-[#041a1c]/40 border border-teal-200/80 dark:border-teal-900/40 space-y-2.5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-teal-900 dark:text-teal-300 font-outfit flex items-center gap-1.5 pb-1 border-b border-teal-200/60 dark:border-teal-900/40">
                      <Calculator className="w-3.5 h-3.5 text-teal-600" />
                      <span>Modul Kalkulator Medis &amp; Racikan Farmasi</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-teal-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessBud}
                          onChange={() => handleTogglePermission('canAccessBud')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Stabilitas &amp; Beyond Use Date (BUD)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Batas kadaluarsa racikan USP &lt;795&gt;/&lt;797&gt;</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-rose-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessPediatric}
                          onChange={() => handleTogglePermission('canAccessPediatric')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Dosis Pediatrik &amp; Konversi Puyer</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Dosis anak berbasis BB/BSA &amp; racikan SL</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-violet-400 cursor-pointer transition-colors shadow-2xs col-span-1 sm:col-span-2">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessRenal}
                          onChange={() => handleTogglePermission('canAccessRenal')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Kalkulator Medis &amp; Klirens Ginjal (CrCl/eGFR)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Cockcroft-Gault, Child-Pugh, Opioid MME, Oksigen, &amp; Syringe Pump</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* 4. KATEGORI: POLIFARMASI, SOP & REGULASI KESEHATAN */}
                {(activePermissionTab === 'all' || activePermissionTab === 'education') && (
                  <div className="p-3.5 rounded-2xl bg-indigo-50/40 dark:bg-[#090b1c]/40 border border-indigo-200/80 dark:border-indigo-900/40 space-y-2.5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-300 font-outfit flex items-center gap-1.5 pb-1 border-b border-indigo-200/60 dark:border-indigo-900/40">
                      <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Polifarmasi, SOP, Regulasi &amp; Edukasi Farmasi</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-indigo-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessPolypharmacy}
                          onChange={() => handleTogglePermission('canAccessPolypharmacy')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Evaluasi Polifarmasi (Beers 2023)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Penapisan obat tidak tepat lansia</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-teal-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessWhatsappPio}
                          onChange={() => handleTogglePermission('canAccessWhatsappPio')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Kartu Edukasi WhatsApp Pasien (PIO)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Pembuatan &amp; kirim kartu aturan pakai WA</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-blue-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessGuidelines}
                          onChange={() => handleTogglePermission('canAccessGuidelines')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Panduan Terapi (PNPK Kemenkes)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Akses 23+ pedoman pelayanan kedokteran</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-emerald-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessCompetency}
                          onChange={() => handleTogglePermission('canAccessCompetency')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Pusat Belajar Farmasi (CBT/OSCE)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Bank latihan soal UKMPPAI &amp; studi kasus</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-slate-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessSop}
                          onChange={() => handleTogglePermission('canAccessSop')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">SOP Pelayanan Farmasi</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Standar operasional prosedur resmi</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-slate-200/80 dark:border-[#134950] hover:border-amber-400 cursor-pointer transition-colors shadow-2xs">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessRegulations}
                          onChange={() => handleTogglePermission('canAccessRegulations')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Regulasi &amp; UU Kesehatan RI</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Kompendium UU, PP &amp; Permenkes</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-[#071c20] rounded-xl border border-teal-200/80 dark:border-[#134950] hover:border-teal-400 cursor-pointer transition-colors shadow-2xs col-span-1 sm:col-span-2">
                        <input
                          type="checkbox"
                          checked={formState.permissions.canAccessLiterature}
                          onChange={() => handleTogglePermission('canAccessLiterature')}
                          className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">Literatur Ilmiah (EBM)</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Repositori jurnal ilmiah &amp; evidence-based medicine</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-xl cursor-pointer font-outfit"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold text-xs text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 rounded-xl shadow-md shadow-teal-700/20 hover:scale-102 transition-all cursor-pointer font-outfit"
                >
                  Simpan Staf Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Konfirmasi Hapus Akun Staf */}
      {deletingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 font-outfit animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Hapus Akun Staf Admin?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Apakah Anda yakin ingin menghapus akun staf <strong>&quot;{deletingAdmin.name}&quot;</strong> ({deletingAdmin.email})? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingAdmin(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-950/30 cursor-pointer hover:scale-102 transition-all"
              >
                Ya, Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTeamManager;
