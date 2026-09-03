import React, { useState, useMemo } from 'react';
import { AdminUser, AdminRoleType, AdminPermissionSet } from '../types';
import { 
  Users, 
  ShieldCheck, 
  Search, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  UserCheck, 
  UserX, 
  Trash2, 
  Key, 
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Sparkles, 
  X, 
  Check, 
  ShieldAlert, 
  BookOpen, 
  CreditCard, 
  Activity, 
  Phone, 
  Mail,
  Crown
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
  const [message, setMessage] = useState('');

  // Password visibility states
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

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
      canViewAuditLogs: false,
      canManageTeamAdmins: false
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

      const matchesRole = selectedRoleFilter === 'Semua' || u.roleType === selectedRoleFilter;

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
    setMessage(`Password disalin ke clipboard!`);
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
    setFormState({
      name: '',
      email: '',
      password: 'admin' + Math.floor(100 + Math.random() * 900),
      phone: '',
      roleType: 'Editor Konten Obat',
      status: 'active',
      permissions: {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: false,
        canManagePricing: false,
        canManageFoodInteractions: true,
        canViewAuditLogs: false,
        canManageTeamAdmins: false
      }
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setShowModalPassword(false);
    setFormState({
      name: admin.name,
      email: admin.email,
      password: admin.password || 'admin123',
      phone: admin.phone || '',
      roleType: admin.roleType,
      status: admin.status,
      permissions: { ...admin.permissions }
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
      canViewAuditLogs: false,
      canManageTeamAdmins: false
    };

    if (role === 'Super Admin') {
      presetPerms = {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: true,
        canManagePricing: true,
        canManageFoodInteractions: true,
        canViewAuditLogs: true,
        canManageTeamAdmins: true
      };
    } else if (role === 'Apoteker Pengelola') {
      presetPerms = {
        canManageDrugs: true,
        canManageInteractions: true,
        canManageSubscriptions: false,
        canManagePricing: false,
        canManageFoodInteractions: true,
        canViewAuditLogs: true,
        canManageTeamAdmins: false
      };
    } else if (role === 'Editor Konten Obat') {
      presetPerms = {
        canManageDrugs: true,
        canManageInteractions: false,
        canManageSubscriptions: false,
        canManagePricing: false,
        canManageFoodInteractions: true,
        canViewAuditLogs: false,
        canManageTeamAdmins: false
      };
    } else if (role === 'Support Staff') {
      presetPerms = {
        canManageDrugs: false,
        canManageInteractions: false,
        canManageSubscriptions: true,
        canManagePricing: false,
        canManageFoodInteractions: false,
        canViewAuditLogs: true,
        canManageTeamAdmins: false
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

  const handleDeleteAdmin = (adminId: string, name: string) => {
    if (confirm(`Yakin ingin menghapus akun staf admin "${name}"?`)) {
      onDeleteAdminUser(adminId);
      setMessage(`Akun staf admin "${name}" telah dihapus.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner - Clean White Enterprise Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 text-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Manajemen Akses Multi-Staf Administrator</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Manajemen Tim Admin & Hak Akses
          </h1>
          
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Kelola akun tim administrator, tentukan peran staf (*Apoteker Pengelola, Editor Konten, Support*), dan atur centang hak akses per modul aplikasi secara terpusat.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Staf Admin Baru</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-teal-50 text-teal-800 border border-teal-200 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage('')} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
      )}

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Staf Admin</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats.total}</p>
          <p className="text-[11px] text-slate-500">Akun pengelola</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Super Admin</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-600">{stats.superAdminCount}</p>
          <p className="text-[11px] text-slate-500">Akses penuh sistem</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Apoteker & Editor</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-teal-600">{stats.apotekerCount + stats.editorCount}</p>
          <p className="text-[11px] text-slate-500">Pengelola konten klinis</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Staf Support / CS</span>
            <UserCheck className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{stats.supportCount}</p>
          <p className="text-[11px] text-slate-500">Layanan pelanggan</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari staf admin berdasarkan nama, email, atau nomor HP..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500">Peran:</span>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl text-xs px-3 py-1.5 font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="Semua">Semua Peran</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Apoteker Pengelola">Apoteker Pengelola</option>
            <option value="Editor Konten Obat">Editor Konten Obat</option>
            <option value="Support Staff">Support Staff</option>
          </select>
        </div>
      </div>

      {/* Admin Team Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Nama Staf & Email</th>
                <th className="py-3.5 px-4">Password Login</th>
                <th className="py-3.5 px-4">Peran Administrator</th>
                <th className="py-3.5 px-4">Hak Akses Modul (Permissions)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Tidak ada staf admin yang sesuai dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Name & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full font-extrabold flex items-center justify-center shrink-0 border ${admin.id === 'admin-main-000' ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' : 'bg-slate-900 text-teal-300 border-slate-700'}`}>
                          {admin.id === 'admin-main-000' ? <Crown className="w-5 h-5 text-slate-950 fill-amber-300" /> : admin.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-slate-800">{admin.name}</p>
                            {admin.id === 'admin-main-000' && (
                              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                                <Crown className="w-3 h-3 text-amber-600" /> ADMIN UTAMA
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" />{admin.email}</span>
                            {admin.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{admin.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Password Column */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-xl shadow-2xs">
                        <KeyRound className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider select-all">
                          {visiblePasswords[admin.id] ? (admin.password || 'admin123') : '••••••••'}
                        </span>
                        <div className="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-700 pl-1.5 ml-0.5">
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(admin.id)}
                            className="p-1 hover:text-teal-600 text-slate-400 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                            title={visiblePasswords[admin.id] ? "Sembunyikan Password" : "Tampilkan Password"}
                          >
                            {visiblePasswords[admin.id] ? <EyeOff className="w-3.5 h-3.5 text-teal-600" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyPassword(admin.id, admin.password || 'admin123')}
                            className="p-1 hover:text-teal-600 text-slate-400 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                            title="Salin Password ke Clipboard"
                          >
                            {copiedId === admin.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4">
                      {admin.roleType === 'Super Admin' && (
                        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full font-extrabold text-xs">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Super Admin
                        </span>
                      )}
                      {admin.roleType === 'Apoteker Pengelola' && (
                        <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full font-extrabold text-xs">
                          <BookOpen className="w-3.5 h-3.5" />
                          Apoteker Pengelola
                        </span>
                      )}
                      {admin.roleType === 'Editor Konten Obat' && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full font-bold text-xs">
                          Editor Konten Obat
                        </span>
                      )}
                      {admin.roleType === 'Support Staff' && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-bold text-xs">
                          Support Staff
                        </span>
                      )}
                    </td>

                    {/* Permissions Badges */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.canManageDrugs && <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-200">💊 Obat</span>}
                        {admin.permissions.canManageInteractions && <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-200">⚡ Interaksi</span>}
                        {admin.permissions.canManageSubscriptions && <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-200">👥 Subskripsi</span>}
                        {admin.permissions.canManagePricing && <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-200">💳 Tarif</span>}
                        {admin.permissions.canManageFoodInteractions && <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-200">🍎 DFI</span>}
                        {admin.permissions.canViewAuditLogs && <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-200">📋 Audit Log</span>}
                        {admin.permissions.canManageTeamAdmins && <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded font-bold border border-purple-200">🔑 Akses Tim</span>}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {admin.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Ditangguhkan
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleToggleStatus(admin)}
                        title="Ubah Status Aktif/Suspend"
                        className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
                      >
                        {admin.status === 'active' ? 'Suspend' : 'Aktifkan'}
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(admin)}
                        className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center"
                        title="Edit Peran & Hak Akses"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                        title="Hapus Akun Staf"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Tambah/Edit Staf Admin & Permission Matrix */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                {editingAdmin ? 'Edit Staf Admin & Hak Akses' : 'Tambah Staf Admin Baru'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="apt. Budi Santoso, S.Farm"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Instansi / Kerja *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="budi@farmasidruggist.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password & Phone Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700">Password Akun *</label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomPassword}
                      className="text-[10px] text-teal-600 hover:text-teal-700 font-bold flex items-center gap-0.5 cursor-pointer"
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
                      className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalPassword(!showModalPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showModalPassword ? "Sembunyikan" : "Lihat"}
                    >
                      {showModalPassword ? <EyeOff className="w-4 h-4 text-teal-600" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Telepon / WA</label>
                  <input
                    type="text"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Peran Administrator (Preset)</label>
                <select
                  value={formState.roleType}
                  onChange={(e) => handleRolePresetChange(e.target.value as AdminRoleType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Super Admin">Super Admin (Akses Penuh)</option>
                  <option value="Apoteker Pengelola">Apoteker Pengelola</option>
                  <option value="Editor Konten Obat">Editor Konten Obat</option>
                  <option value="Support Staff">Support Staff / CS</option>
                </select>
              </div>

              {/* PERMISSION CHECKBOX MATRIX */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-extrabold text-slate-900 text-xs flex items-center justify-between">
                  <span>Matriks Centang Hak Akses Modul (Permissions)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Centang modul yang diizinkan</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-teal-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canManageDrugs}
                      onChange={() => handleTogglePermission('canManageDrugs')}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-slate-800">Kelola Monografi Obat</p>
                      <p className="text-[10px] text-slate-500">Tambah/Edit/Hapus katalog obat</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-teal-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canManageInteractions}
                      onChange={() => handleTogglePermission('canManageInteractions')}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-slate-800">Kelola Interaksi Obat</p>
                      <p className="text-[10px] text-slate-500">Tambah/Edit aturan interaksi obat</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-teal-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canManageSubscriptions}
                      onChange={() => handleTogglePermission('canManageSubscriptions')}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-slate-800">Kelola Subskripsi Customer</p>
                      <p className="text-[10px] text-slate-500">Perpanjang & atur lisensi customer</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-teal-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canManagePricing}
                      onChange={() => handleTogglePermission('canManagePricing')}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-slate-800">Pengaturan Tarif & Fitur</p>
                      <p className="text-[10px] text-slate-500">Ubah harga paket & promo diskon</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-teal-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canManageFoodInteractions}
                      onChange={() => handleTogglePermission('canManageFoodInteractions')}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-slate-800">Interaksi Makanan & Duplikasi</p>
                      <p className="text-[10px] text-slate-500">Editor DFI & kelas terapi ganda</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-teal-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canViewAuditLogs}
                      onChange={() => handleTogglePermission('canViewAuditLogs')}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-slate-800">Akses Audit Log System</p>
                      <p className="text-[10px] text-slate-500">Lihat & ekspor rekam jejak sistem</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-purple-300 cursor-pointer transition-colors col-span-1 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={formState.permissions.canManageTeamAdmins}
                      onChange={() => handleTogglePermission('canManageTeamAdmins')}
                      className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-purple-900">Kelola Tim Admin & Hak Akses (Super Admin Privilege)</p>
                      <p className="text-[10px] text-purple-700">Mengatur akun staf admin lain & izin modul</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-xs"
                >
                  Simpan Staf Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
