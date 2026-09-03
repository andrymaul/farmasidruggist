import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_CUSTOMERS, SAMPLE_DEMO_CUSTOMERS } from '../data/mockCustomers';
import { UserProfile, CustomerPaymentRecord } from '../types';
import { 
  saveUserProfileToFirestore, 
  deleteCustomerFromFirestore, 
  fetchCustomersFromFirestore,
  cleanupDummyCustomersFromFirestore
} from '../firebase';
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
  MessageSquare,
  FileText,
  Sliders,
  Trash2,
  Lock,
  Download,
  Stethoscope,
  Calculator,
  RotateCcw,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Syringe,
  CalendarClock,
  Baby,
  HeartHandshake,
  FlaskConical,
  Leaf,
  Activity,
  HeartPulse,
  GraduationCap,
  ClipboardList,
  Scale,
  BookMarked,
  CheckSquare
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
        if (Array.isArray(parsed)) {
          let deletedList: string[] = [];
          try {
            const savedDeleted = localStorage.getItem('farmasi_deleted_customer_uids');
            if (savedDeleted) deletedList = JSON.parse(savedDeleted);
          } catch (e) {}
          return parsed.filter((p: UserProfile) => p.uid && !deletedList.includes(p.uid));
        }
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
  const [selectedCardFilter, setSelectedCardFilter] = useState<'all' | 'pro' | 'free' | 'online'>('all');
  const [selectedExpiryFilter, setSelectedExpiryFilter] = useState<string>('Semua');
  const [selectedOnlineFilter, setSelectedOnlineFilter] = useState<string>('Semua');
  const [selectedContactFilter, setSelectedContactFilter] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<string>('latest_registered');

  // Pagination State (Default 20 accounts per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Reset to page 1 whenever filters or search query change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlanFilter, selectedStatusFilter, selectedExpiryFilter, selectedOnlineFilter, selectedContactFilter, sortBy]);

  // Bulk Selection State
  const [selectedCustomerUids, setSelectedCustomerUids] = useState<string[]>([]);

  // Firebase Sync State
  const [syncingFirebase, setSyncingFirebase] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSyncFromFirebase = async () => {
    setSyncingFirebase(true);
    setSyncMessage(null);
    try {
      const remoteUsers = await fetchCustomersFromFirestore();
      let deletedList: string[] = [];
      try {
        const savedDeleted = localStorage.getItem('farmasi_deleted_customer_uids');
        if (savedDeleted) deletedList = JSON.parse(savedDeleted);
      } catch (e) {}

      const cleanRemote = remoteUsers.filter(u => 
        u.role !== 'admin' && 
        !(u.email && u.email.toLowerCase().includes('admin@farmasidruggist.com')) &&
        !deletedList.includes(u.uid)
      );

      const map = new Map<string, UserProfile>();
      customers.forEach(c => {
        if (!deletedList.includes(c.uid)) {
          if (c.uid) map.set(c.uid, c);
          else if (c.email) map.set(c.email.toLowerCase(), c);
        }
      });
      cleanRemote.forEach(rc => {
        if (!deletedList.includes(rc.uid)) {
          if (rc.uid) map.set(rc.uid, rc);
          else if (rc.email) map.set(rc.email.toLowerCase(), rc);
        }
      });
      const merged = Array.from(map.values());
      setCustomers(merged);
      setSyncMessage(`Berhasil menyinkronkan ${cleanRemote.length} akun pelanggan dari Cloud Firebase!`);
      setTimeout(() => setSyncMessage(null), 4500);
    } catch (err) {
      setSyncMessage('Gagal mengambil data dari Cloud Firebase.');
      setTimeout(() => setSyncMessage(null), 4500);
    } finally {
      setSyncingFirebase(false);
    }
  };

  // Password Visibility State (uid -> boolean)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedPasswordUid, setCopiedPasswordUid] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<UserProfile | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<UserProfile | null>(null);
  const [editModalTab, setEditModalTab] = useState<'profile' | 'license' | 'permissions' | 'payment' | 'notes'>('profile');

  // Payment Recording State inside Edit Modal
  const [newPaymentAmount, setNewPaymentAmount] = useState<number>(199000);
  const [newPaymentDate, setNewPaymentDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>('Transfer Bank BCA');
  const [newPaymentRef, setNewPaymentRef] = useState<string>('');

  // Import from Firebase State
  const [importEmailsText, setImportEmailsText] = useState('');
  const [importPlan, setImportPlan] = useState<'Pro' | 'Pemula'>('Pro');
  const [importInstitution, setImportInstitution] = useState('');

  const handleImportEmailsFromFirebase = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = importEmailsText.trim();
    if (!raw) return;

    // Split by comma, newline, semicolon, or whitespace
    const emailList = raw
      .split(/[\n,;\s]+/)
      .map(e => e.trim().toLowerCase())
      .filter(e => e.includes('@') && e.includes('.'));

    if (emailList.length === 0) {
      alert('Mohon masukkan minimal 1 alamat email yang valid.');
      return;
    }

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + (importPlan === 'Pemula' ? 5 : 1));

    const newProfiles: UserProfile[] = [];

    for (const email of emailList) {
      // Check if email already exists in customers
      const exists = customers.some(c => c.email && c.email.toLowerCase() === email);
      if (!exists) {
        const username = email.split('@')[0];
        const displayName = username.charAt(0).toUpperCase() + username.slice(1);
        const profile: UserProfile = {
          uid: 'fb-user-' + Math.random().toString(36).substring(2, 9),
          email,
          name: displayName,
          password: 'Pass#' + Math.floor(1000 + Math.random() * 9000),
          phone: '',
          institution: importInstitution || 'Klinik / Faskes Terdaftar',
          licenseNumber: '',
          notes: 'Diimpor langsung dari data pendaftaran Firebase Console',
          role: importPlan === 'Pemula' ? 'free' : 'customer',
          subscriptionPlan: importPlan,
          subscriptionStatus: 'active',
          maxDrugsOverride: importPlan === 'Pemula' ? 20 : 30,
          canExportPdf: importPlan !== 'Pemula',
          canAccessRenal: importPlan !== 'Pemula',
          canAccessPolypharmacy: importPlan !== 'Pemula',
          expiresAt: expiryDate.toISOString(),
          createdAt: new Date().toISOString()
        };
        await saveUserProfileToFirestore(profile);
        newProfiles.push(profile);
      }
    }

    if (newProfiles.length > 0) {
      setCustomers([...newProfiles, ...customers]);
      setSyncMessage(`Sukses mengimpor & mengaktifkan ${newProfiles.length} akun pelanggan ke Cloud Firestore!`);
      setTimeout(() => setSyncMessage(null), 4500);
    } else {
      setSyncMessage('Semua email yang dimasukkan sudah terdaftar di database.');
      setTimeout(() => setSyncMessage(null), 4500);
    }

    setImportEmailsText('');
    setImportInstitution('');
    setShowImportModal(false);
  };

  // Form State for Add / Deep Edit
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    institution: '',
    licenseNumber: '',
    subscriptionPlan: 'Pro' as 'Pemula' | 'Pro' | 'Gratis' | string,
    subscriptionStatus: 'active' as 'active' | 'expired' | 'trial',
    createdAtDate: '',
    expiresAtDate: '',
    maxDrugsOverride: 99,
    canExportPdf: true,
    canAccessRenal: true,
    canAccessPolypharmacy: true,
    canAccessIvCompatibility: true,
    canAccessBud: true,
    canAccessPediatric: true,
    canAccessPregnancy: true,
    canAccessDrugLab: true,
    canAccessHerbDrug: true,
    canAccessSideEffects: true,
    canAccessWhatsappPio: true,
    canAccessGuidelines: true,
    canAccessCompetency: true,
    canAccessSop: true,
    canAccessRegulations: true,
    canAccessLiterature: true,
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

  // Helper to determine whether a customer is currently online
  const isCustomerOnline = (cust: UserProfile) => {
    if (currentUser && currentUser.uid === cust.uid) return true;
    if (cust.isOnline === false) return false;
    if (cust.isOnline === true) {
      if (!cust.lastActiveAt) return true;
      const diffMinutes = (Date.now() - new Date(cust.lastActiveAt).getTime()) / (1000 * 60);
      return diffMinutes <= 15;
    }
    if (cust.lastActiveAt) {
      const diffMinutes = (Date.now() - new Date(cust.lastActiveAt).getTime()) / (1000 * 60);
      return diffMinutes <= 10;
    }
    return false;
  };

  // WhatsApp Message Template State
  const [waModalCustomer, setWaModalCustomer] = useState<UserProfile | null>(null);
  const [waMessage, setWaMessage] = useState<string>('');

  const handleOpenWaTemplate = (cust: UserProfile) => {
    setWaModalCustomer(cust);
    // Default template: Sambutan Pengguna Baru
    setWaMessage(`Halo apt. ${cust.name}, selamat datang di platform Farmasi Druggist! Akun Anda telah siap digunakan untuk penapisan interaksi klinis obat dan evaluasi resep.`);
  };

  // Calculate Statistics
  const stats = useMemo(() => {
    const total = customers.length;
    const proCount = customers.filter(c => (c.subscriptionPlan === 'Pro' || c.subscriptionPlan === 'Elite' || c.subscriptionPlan === 'Klinik') && c.subscriptionStatus === 'active').length;
    const freeCount = customers.filter(c => (c.subscriptionPlan === 'Pemula' || c.subscriptionPlan === 'Gratis') || c.subscriptionStatus === 'trial').length;
    const activeCount = customers.filter(c => c.subscriptionStatus === 'active').length;
    const onlineCount = customers.filter(c => isCustomerOnline(c)).length;
    
    // Revenue estimation (Pro: Rp 199.000 / tahun)
    const annualRevenue = proCount * 199000;

    return { total, proCount, activeCount, freeCount, annualRevenue, onlineCount };
  }, [customers, currentUser]);

  // Filtered and sorted customers list
  const filteredCustomers = useMemo(() => {
    const list = customers.filter(cust => {
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
        (selectedPlanFilter === 'Pro' && (cust.subscriptionPlan === 'Pro' || cust.subscriptionPlan === 'Elite' || cust.subscriptionPlan === 'Klinik'));
      
      const matchesStatus = selectedStatusFilter === 'Semua' || cust.subscriptionStatus === selectedStatusFilter;

      // Online status filter
      const isOnline = isCustomerOnline(cust);
      const matchesOnline = selectedOnlineFilter === 'Semua' ||
        (selectedOnlineFilter === 'online' && isOnline) ||
        (selectedOnlineFilter === 'offline' && !isOnline);

      // Expiry filter
      let matchesExpiry = true;
      if (selectedExpiryFilter !== 'Semua') {
        const remainingDays = cust.expiresAt 
          ? Math.ceil((new Date(cust.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : null;
        if (selectedExpiryFilter === 'expiring_soon') {
          matchesExpiry = remainingDays !== null && remainingDays > 0 && remainingDays <= 30;
        } else if (selectedExpiryFilter === 'expired') {
          matchesExpiry = remainingDays !== null && remainingDays <= 0;
        } else if (selectedExpiryFilter === 'long_term') {
          matchesExpiry = remainingDays !== null && remainingDays > 180;
        }
      }

      // Contact filter
      let matchesContact = true;
      if (selectedContactFilter === 'has_wa') {
        matchesContact = !!(cust.phone && cust.phone.trim().length >= 8);
      } else if (selectedContactFilter === 'no_wa') {
        matchesContact = !cust.phone || cust.phone.trim().length < 8;
      } else if (selectedContactFilter === 'unverified_email') {
        matchesContact = cust.isEmailVerified === false;
      }

      return matchesSearch && matchesPlan && matchesStatus && matchesOnline && matchesExpiry && matchesContact;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'latest_registered') {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'expiring_soonest') {
        const dateA = a.expiresAt ? new Date(a.expiresAt).getTime() : 9999999999999;
        const dateB = b.expiresAt ? new Date(b.expiresAt).getTime() : 9999999999999;
        return dateA - dateB;
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [customers, searchQuery, selectedPlanFilter, selectedStatusFilter, selectedOnlineFilter, selectedExpiryFilter, selectedContactFilter, sortBy, currentUser]);

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));

  const paginatedCustomers = useMemo(() => {
    if (pageSize <= 0) return filteredCustomers;
    const start = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, currentPage, pageSize]);

  // Handlers
  const handleOpenAddModal = () => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const todayFormatted = new Date().toISOString().split('T')[0];

    setFormState({
      name: '',
      email: '',
      password: generateRandomPassword(),
      phone: '',
      institution: '',
      licenseNumber: '',
      subscriptionPlan: 'Pro',
      subscriptionStatus: 'active',
      createdAtDate: todayFormatted,
      expiresAtDate: expiryDate.toISOString().split('T')[0],
      maxDrugsOverride: 99,
      canExportPdf: true,
      canAccessRenal: true,
      canAccessPolypharmacy: true,
      canAccessIvCompatibility: true,
      canAccessBud: true,
      canAccessPediatric: true,
      canAccessPregnancy: true,
      canAccessDrugLab: true,
      canAccessHerbDrug: true,
      canAccessSideEffects: true,
      canAccessWhatsappPio: true,
      canAccessGuidelines: true,
      canAccessCompetency: true,
      canAccessSop: true,
      canAccessRegulations: true,
      canAccessLiterature: true,
      notes: '',
      durationMonths: 12
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (cust: UserProfile) => {
    setEditingCustomer(cust);
    setEditModalTab('profile');
    setShowModalPassword(false);
    
    const isPro = cust.subscriptionPlan !== 'Gratis' && cust.subscriptionPlan !== 'Pemula';

    const createdFormatted = cust.createdAt 
      ? new Date(cust.createdAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

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
      createdAtDate: createdFormatted,
      expiresAtDate: expiryFormatted,
      maxDrugsOverride: cust.maxDrugsOverride || (isPro ? 99 : 20),
      canExportPdf: cust.canExportPdf ?? isPro,
      canAccessRenal: cust.canAccessRenal ?? isPro,
      canAccessPolypharmacy: cust.canAccessPolypharmacy ?? isPro,
      canAccessIvCompatibility: cust.canAccessIvCompatibility ?? isPro,
      canAccessBud: cust.canAccessBud ?? isPro,
      canAccessPediatric: cust.canAccessPediatric ?? isPro,
      canAccessPregnancy: cust.canAccessPregnancy ?? isPro,
      canAccessDrugLab: cust.canAccessDrugLab ?? isPro,
      canAccessHerbDrug: cust.canAccessHerbDrug ?? isPro,
      canAccessSideEffects: cust.canAccessSideEffects ?? isPro,
      canAccessWhatsappPio: cust.canAccessWhatsappPio ?? isPro,
      canAccessGuidelines: cust.canAccessGuidelines ?? isPro,
      canAccessCompetency: cust.canAccessCompetency ?? isPro,
      canAccessSop: cust.canAccessSop ?? isPro,
      canAccessRegulations: cust.canAccessRegulations ?? isPro,
      canAccessLiterature: cust.canAccessLiterature ?? isPro,
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
      canAccessIvCompatibility: formState.canAccessIvCompatibility,
      canAccessBud: formState.canAccessBud,
      canAccessPediatric: formState.canAccessPediatric,
      canAccessPregnancy: formState.canAccessPregnancy,
      canAccessDrugLab: formState.canAccessDrugLab,
      canAccessHerbDrug: formState.canAccessHerbDrug,
      canAccessSideEffects: formState.canAccessSideEffects,
      canAccessWhatsappPio: formState.canAccessWhatsappPio,
      canAccessGuidelines: formState.canAccessGuidelines,
      canAccessCompetency: formState.canAccessCompetency,
      canAccessSop: formState.canAccessSop,
      canAccessRegulations: formState.canAccessRegulations,
      canAccessLiterature: formState.canAccessLiterature,
      expiresAt: expiryDate,
      createdAt: new Date().toISOString()
    };

    saveUserProfileToFirestore(newCustomer).catch(() => {});
    setCustomers([newCustomer, ...customers]);
    setShowAddModal(false);
  };

  const handleSaveEditCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const expiryDate = formState.expiresAtDate 
      ? new Date(formState.expiresAtDate + 'T23:59:59.000Z').toISOString()
      : editingCustomer.expiresAt;

    const createdDate = formState.createdAtDate 
      ? new Date(formState.createdAtDate + 'T00:00:00.000Z').toISOString()
      : (editingCustomer.createdAt || new Date().toISOString());

    const updatedCustomer: UserProfile = {
      ...editingCustomer,
      name: formState.name,
      email: formState.email,
      password: formState.password,
      phone: formState.phone,
      institution: formState.institution,
      licenseNumber: formState.licenseNumber,
      subscriptionPlan: formState.subscriptionPlan,
      subscriptionStatus: formState.subscriptionStatus,
      createdAt: createdDate,
      expiresAt: expiryDate,
      maxDrugsOverride: Number(formState.maxDrugsOverride),
      canExportPdf: formState.canExportPdf,
      canAccessRenal: formState.canAccessRenal,
      canAccessPolypharmacy: formState.canAccessPolypharmacy,
      canAccessIvCompatibility: formState.canAccessIvCompatibility,
      canAccessBud: formState.canAccessBud,
      canAccessPediatric: formState.canAccessPediatric,
      canAccessPregnancy: formState.canAccessPregnancy,
      canAccessDrugLab: formState.canAccessDrugLab,
      canAccessHerbDrug: formState.canAccessHerbDrug,
      canAccessSideEffects: formState.canAccessSideEffects,
      canAccessWhatsappPio: formState.canAccessWhatsappPio,
      canAccessGuidelines: formState.canAccessGuidelines,
      canAccessCompetency: formState.canAccessCompetency,
      canAccessSop: formState.canAccessSop,
      canAccessRegulations: formState.canAccessRegulations,
      canAccessLiterature: formState.canAccessLiterature,
      notes: formState.notes
    };

    saveUserProfileToFirestore(updatedCustomer).catch(() => {});

    setCustomers(customers.map(c => {
      if (c.uid === editingCustomer.uid) {
        return updatedCustomer;
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

        const updated: UserProfile = {
          ...c,
          subscriptionStatus: 'active',
          expiresAt: baseDate.toISOString()
        };
        saveUserProfileToFirestore(updated).catch(() => {});
        return updated;
      }
      return c;
    }));
  };

  const handleChangePlan = (uid: string, newPlan: string) => {
    setCustomers(customers.map(c => {
      if (c.uid === uid) {
        const isPro = newPlan === 'Pro' || newPlan === 'Elite' || newPlan === 'Klinik';
        let expiryDate = c.expiresAt;
        if (isPro && (!c.expiresAt || new Date(c.expiresAt).getTime() < Date.now())) {
          const exp = new Date();
          exp.setFullYear(exp.getFullYear() + 1);
          expiryDate = exp.toISOString();
        }

        const updated: UserProfile = {
          ...c,
          subscriptionPlan: newPlan,
          subscriptionStatus: 'active',
          canExportPdf: isPro,
          canAccessRenal: isPro,
          canAccessPolypharmacy: isPro,
          canAccessIvCompatibility: isPro,
          canAccessBud: isPro,
          canAccessPediatric: isPro,
          canAccessPregnancy: isPro,
          canAccessDrugLab: isPro,
          canAccessHerbDrug: isPro,
          canAccessSideEffects: isPro,
          canAccessWhatsappPio: isPro,
          canAccessGuidelines: isPro,
          canAccessCompetency: isPro,
          canAccessSop: isPro,
          canAccessRegulations: isPro,
          canAccessLiterature: isPro,
          maxDrugsOverride: isPro ? 99 : 20,
          expiresAt: expiryDate
        };
        saveUserProfileToFirestore(updated).catch(() => {});
        return updated;
      }
      return c;
    }));
  };

  const handleUpgradeToPro = (uid: string) => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    setCustomers(customers.map(c => {
      if (c.uid === uid) {
        const updated: UserProfile = {
          ...c,
          role: 'customer',
          subscriptionPlan: 'Pro',
          subscriptionStatus: 'active',
          canExportPdf: true,
          canAccessRenal: true,
          canAccessPolypharmacy: true,
          canAccessIvCompatibility: true,
          canAccessBud: true,
          canAccessPediatric: true,
          canAccessPregnancy: true,
          canAccessDrugLab: true,
          canAccessHerbDrug: true,
          canAccessSideEffects: true,
          canAccessWhatsappPio: true,
          canAccessGuidelines: true,
          canAccessCompetency: true,
          canAccessSop: true,
          canAccessRegulations: true,
          canAccessLiterature: true,
          maxDrugsOverride: 99,
          expiresAt: expiryDate.toISOString()
        };
        saveUserProfileToFirestore(updated).catch(() => {});
        return updated;
      }
      return c;
    }));
  };

  const handleToggleStatus = (uid: string) => {
    setCustomers(customers.map(c => {
      if (c.uid === uid) {
        const newStatus = c.subscriptionStatus === 'active' ? 'expired' : 'active';
        const updated: UserProfile = { ...c, subscriptionStatus: newStatus };
        saveUserProfileToFirestore(updated).catch(() => {});
        return updated;
      }
      return c;
    }));
  };

  const [isCleaningDummy, setIsCleaningDummy] = useState(false);

  const handleDeleteCustomer = async () => {
    if (!deletingCustomer) return;
    const { uid, email, name } = deletingCustomer;
    setDeletingCustomer(null);
    setSyncMessage(`Menghapus data pelanggan "${name}" dari Cloud Firestore...`);

    try {
      const res = await deleteCustomerFromFirestore(uid, email);
      try {
        const savedDeleted = localStorage.getItem('farmasi_deleted_customer_uids');
        const deletedList: string[] = savedDeleted ? JSON.parse(savedDeleted) : [];
        if (!deletedList.includes(uid)) {
          deletedList.push(uid);
          localStorage.setItem('farmasi_deleted_customer_uids', JSON.stringify(deletedList));
        }
      } catch (e) {}

      setCustomers(prev => prev.filter(c => c.uid !== uid && (email ? c.email?.toLowerCase() !== email.toLowerCase() : true)));
      setSyncMessage(`Akun "${name}" berhasil dihapus dari Cloud Firestore & database lokal (${res.deletedCount} dokumen Firestore terhapus).`);
      setTimeout(() => setSyncMessage(null), 4500);
    } catch (err) {
      setSyncMessage(`Gagal menghapus dari Cloud Firestore. Silakan periksa koneksi internet.`);
      setTimeout(() => setSyncMessage(null), 4500);
    }
  };

  const handleCleanupDummyData = async () => {
    if (!window.confirm('⚠️ Apakah Anda yakin ingin MEMBERSIHKAN SEMUA DATA DUMMY / SIMULASI (seperti apt. Rina Wati, dr. Budi Santoso, Apotek K-24 Sudirman) langsung dari Cloud Firestore?\n\nData asli customer Anda TIDAK akan terhapus.')) {
      return;
    }

    setIsCleaningDummy(true);
    setSyncMessage('Sedang memindai dan menghapus semua dokumen pelanggan dummy di Cloud Firestore...');

    try {
      const res = await cleanupDummyCustomersFromFirestore();
      const dummyEmails = ['farmasis.klinik@gmail.com', 'budi.santoso@rsmedika.co.id', 'apotek.k24sudirman@gmail.com'];
      const dummyUids = ['cust-001', 'cust-002', 'cust-003'];

      setCustomers(prev => prev.filter(c => 
        !dummyUids.includes(c.uid) && 
        !(c.email && dummyEmails.includes(c.email.toLowerCase()))
      ));

      setSyncMessage(`Sukses membersihkan: ${res.deletedCount} dokumen dummy berhasil dihapus tuntas dari Cloud Firestore!`);
      setTimeout(() => setSyncMessage(null), 5000);
    } catch (err) {
      setSyncMessage('Terjadi kendala saat membersihkan data dummy di Firestore.');
      setTimeout(() => setSyncMessage(null), 4500);
    } finally {
      setIsCleaningDummy(false);
    }
  };

  // Bulk Selection & Action Handlers
  const handleToggleSelectAll = () => {
    const pageUids = paginatedCustomers.map(c => c.uid);
    const allPageSelected = pageUids.length > 0 && pageUids.every(uid => selectedCustomerUids.includes(uid));
    if (allPageSelected) {
      setSelectedCustomerUids(prev => prev.filter(uid => !pageUids.includes(uid)));
    } else {
      setSelectedCustomerUids(prev => Array.from(new Set([...prev, ...pageUids])));
    }
  };

  const handleToggleSelectOne = (uid: string) => {
    setSelectedCustomerUids(prev => 
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  const handleBulkUpgradeToPro = () => {
    if (selectedCustomerUids.length === 0) return;
    if (!window.confirm(`Aktifkan Paket Pro (+1 Tahun) untuk ${selectedCustomerUids.length} pelanggan terpilih?`)) return;

    setCustomers(customers.map(c => {
      if (selectedCustomerUids.includes(c.uid)) {
        let expiryDate = c.expiresAt;
        if (!c.expiresAt || new Date(c.expiresAt).getTime() < Date.now()) {
          const exp = new Date();
          exp.setFullYear(exp.getFullYear() + 1);
          expiryDate = exp.toISOString();
        }
        const updated: UserProfile = {
          ...c,
          subscriptionPlan: 'Pro',
          subscriptionStatus: 'active',
          canExportPdf: true,
          canAccessRenal: true,
          canAccessPolypharmacy: true,
          maxDrugsOverride: 30,
          expiresAt: expiryDate
        };
        saveUserProfileToFirestore(updated).catch(() => {});
        return updated;
      }
      return c;
    }));
    setSyncMessage(`Sukses mengaktifkan Paket Pro untuk ${selectedCustomerUids.length} pelanggan!`);
    setTimeout(() => setSyncMessage(null), 4000);
    setSelectedCustomerUids([]);
  };

  const handleBulkExtendSubscription = (months: number) => {
    if (selectedCustomerUids.length === 0) return;
    if (!window.confirm(`Perpanjang masa aktif +${months} bulan untuk ${selectedCustomerUids.length} pelanggan terpilih?`)) return;

    setCustomers(customers.map(c => {
      if (selectedCustomerUids.includes(c.uid)) {
        const currentExp = c.expiresAt ? new Date(c.expiresAt) : new Date();
        const baseDate = currentExp > new Date() ? currentExp : new Date();
        baseDate.setMonth(baseDate.getMonth() + months);

        const updated: UserProfile = {
          ...c,
          subscriptionStatus: 'active',
          expiresAt: baseDate.toISOString()
        };
        saveUserProfileToFirestore(updated).catch(() => {});
        return updated;
      }
      return c;
    }));
    setSyncMessage(`Sukses memperpanjang masa aktif untuk ${selectedCustomerUids.length} pelanggan!`);
    setTimeout(() => setSyncMessage(null), 4000);
    setSelectedCustomerUids([]);
  };

  const handleBulkDelete = async () => {
    if (selectedCustomerUids.length === 0) return;
    const count = selectedCustomerUids.length;
    if (!window.confirm(`⚠️ PERINGATAN: Apakah Anda yakin ingin MENGHAPUS PERMANEN ${count} akun pelanggan terpilih?\n\nTindakan ini akan menghapus akun dari platform dan Cloud Firestore.`)) {
      return;
    }

    setSyncMessage(`Menghapus ${count} akun pelanggan terpilih dari Cloud Firestore...`);
    let totalFirestoreDeleted = 0;

    for (const uid of selectedCustomerUids) {
      const targetCust = customers.find(c => c.uid === uid);
      const res = await deleteCustomerFromFirestore(uid, targetCust?.email);
      totalFirestoreDeleted += res.deletedCount;
    }

    try {
      const savedDeleted = localStorage.getItem('farmasi_deleted_customer_uids');
      const deletedList: string[] = savedDeleted ? JSON.parse(savedDeleted) : [];
      selectedCustomerUids.forEach(uid => {
        if (!deletedList.includes(uid)) {
          deletedList.push(uid);
        }
      });
      localStorage.setItem('farmasi_deleted_customer_uids', JSON.stringify(deletedList));
    } catch (e) {}

    setCustomers(customers.filter(c => !selectedCustomerUids.includes(c.uid)));
    setSyncMessage(`Sukses menghapus ${count} akun pelanggan (${totalFirestoreDeleted} dokumen Firestore terhapus).`);
    setTimeout(() => setSyncMessage(null), 4000);
    setSelectedCustomerUids([]);
  };

  const handleExportCSV = (targetCustomers?: UserProfile[]) => {
    const listToExport = targetCustomers && targetCustomers.length > 0 
      ? targetCustomers 
      : (selectedCustomerUids.length > 0 
          ? customers.filter(c => selectedCustomerUids.includes(c.uid)) 
          : filteredCustomers);

    if (listToExport.length === 0) {
      alert('Tidak ada data pelanggan yang dapat diekspor.');
      return;
    }

    const headers = ['UID', 'Nama', 'Email', 'No Telepon', 'Instansi', 'No SIPA', 'Paket Subskripsi', 'Status Lisensi', 'Tanggal Terdaftar', 'Tanggal Kadaluarsa'];
    const rows = listToExport.map(c => [
      `"${c.uid}"`,
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.email || '').replace(/"/g, '""')}"`,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
      `"${(c.institution || '').replace(/"/g, '""')}"`,
      `"${(c.licenseNumber || '').replace(/"/g, '""')}"`,
      `"${c.subscriptionPlan || 'Pemula'}"`,
      `"${c.subscriptionStatus || 'active'}"`,
      `"${c.createdAt ? new Date(c.createdAt).toLocaleDateString('id-ID') : '-'}"`,
      `"${c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('id-ID') : '-'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `farmasi_druggist_pelanggan_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Payment History Handlers
  const handleAddPaymentRecord = () => {
    if (!editingCustomer) return;
    const newRecord: CustomerPaymentRecord = {
      id: 'pay-' + Date.now(),
      date: newPaymentDate,
      amount: Number(newPaymentAmount),
      plan: editingCustomer.subscriptionPlan || 'Pro',
      paymentMethod: newPaymentMethod,
      referenceNumber: newPaymentRef || undefined,
      status: 'Lunas'
    };

    const updatedHistory = [newRecord, ...(editingCustomer.paymentHistory || [])];
    const updatedCustomer: UserProfile = {
      ...editingCustomer,
      paymentHistory: updatedHistory
    };

    setEditingCustomer(updatedCustomer);
    setCustomers(customers.map(c => c.uid === updatedCustomer.uid ? updatedCustomer : c));
    saveUserProfileToFirestore(updatedCustomer).catch(() => {});
    setNewPaymentRef('');
  };

  const handleDeletePaymentRecord = (recordId: string) => {
    if (!editingCustomer) return;
    const updatedHistory = (editingCustomer.paymentHistory || []).filter(r => r.id !== recordId);
    const updatedCustomer: UserProfile = {
      ...editingCustomer,
      paymentHistory: updatedHistory
    };
    setEditingCustomer(updatedCustomer);
    setCustomers(customers.map(c => c.uid === updatedCustomer.uid ? updatedCustomer : c));
    saveUserProfileToFirestore(updatedCustomer).catch(() => {});
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner - Clean White Enterprise Card */}
      <div className="bg-white dark:bg-[#06191c] rounded-2xl p-6 sm:p-7 text-slate-900 dark:text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200 dark:border-[#184c53] relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-[#156d67]/30 text-teal-700 dark:text-[#5fd0df] text-xs font-bold border border-teal-200 dark:border-[#3dbfd1]/30 font-outfit">
            <UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-[#5fd0df]" />
            <span>Manajemen Pelanggan & Lisensi Subskripsi</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-outfit">
            Kelola Akun & Lisensi Customer
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Pantau kata sandi, status lisensi aktif, durasi masa langganan, kuota penapisan obat, dan data instansi customer dalam satu kendali administrator tersinkronisasi Cloud Firebase.
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleExportCSV()}
            className="px-4 py-2.5 bg-slate-100 dark:bg-[#0d2c31] hover:bg-slate-200 dark:hover:bg-[#184c53] border border-slate-300 dark:border-[#184c53] text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-102 font-outfit"
            title="Unduh data pelanggan (CSV / Excel)"
          >
            <Download className="w-4 h-4 text-teal-600 dark:text-[#5fd0df]" />
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2.5 bg-slate-100 dark:bg-[#0d2c31] hover:bg-slate-200 dark:hover:bg-[#184c53] border border-slate-300 dark:border-[#184c53] text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-102 font-outfit"
            title="Impor atau Tambah Cepat Akun Terdaftar dari Firebase Console"
          >
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-amber-400" />
            <span>Impor Akun Firebase</span>
          </button>

          <button
            onClick={handleSyncFromFirebase}
            disabled={syncingFirebase}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-102 disabled:opacity-50 font-outfit"
            title="Tarik & Sinkronkan data pelanggan terbaru dari Cloud Firebase"
          >
            <Cloud className={`w-4 h-4 text-white ${syncingFirebase ? 'animate-pulse' : ''}`} />
            <span>{syncingFirebase ? 'Menyinkronkan...' : 'Sinkronkan dari Firebase'}</span>
          </button>

          <button
            onClick={handleCleanupDummyData}
            disabled={isCleaningDummy}
            className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-102 disabled:opacity-50 font-outfit"
            title="Pindai & hapus permanen semua data akun dummy dari Cloud Firestore"
          >
            <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>{isCleaningDummy ? 'Membersihkan...' : 'Bersihkan Dummy di Firestore'}</span>
          </button>

          {customers.length === 0 && (
            <button
              onClick={() => setCustomers(SAMPLE_DEMO_CUSTOMERS)}
              className="px-4 py-2.5 bg-slate-100 dark:bg-[#0d2c31] hover:bg-slate-200 dark:hover:bg-[#184c53] border border-slate-300 dark:border-[#184c53] text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-102 font-outfit"
              title="Muat data contoh demo untuk simulasi"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>Muat Contoh Demo</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 cursor-pointer hover:scale-102 font-outfit"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Customer Baru</span>
          </button>
        </div>
      </div>

      {/* Sync Message Alert */}
      {syncMessage && (
        <div className="p-3.5 bg-teal-50 dark:bg-[#092b31] border border-teal-200 dark:border-[#184c53] rounded-2xl text-xs font-bold text-[#12645e] dark:text-[#5fd0df] flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Metrics Row - 4 Executive Obsidian & Jewel Tones Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 1. Total Pelanggan - Deep Midnight Teal */}
        <div 
          onClick={() => {
            setSelectedCardFilter('all');
            setSelectedPlanFilter('Semua');
            setSelectedOnlineFilter('Semua');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-white border ${
            selectedCardFilter === 'all' && selectedPlanFilter === 'Semua' && selectedOnlineFilter === 'Semua'
              ? 'ring-2 ring-teal-400 bg-gradient-to-br from-[#0c2f35] via-[#082226] to-[#041215] border-teal-400/60 shadow-xl shadow-teal-950/40'
              : 'bg-gradient-to-br from-[#09252a] via-[#071c20] to-[#041215] border-[#134950] shadow-lg shadow-black/20 hover:border-teal-500/50'
          }`}
          title="Klik untuk melihat semua pelanggan"
        >
          <div className="flex items-center justify-between text-teal-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-300/90 font-outfit">Total Pelanggan</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-300 border border-teal-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <Users className="w-4 h-4 text-teal-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight">{stats.total}</p>
          <div className="text-[11px] text-teal-200/70 font-medium flex items-center justify-between pt-0.5">
            <span>{stats.activeCount} lisensi aktif</span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCardFilter('online');
                setSelectedOnlineFilter('online');
              }}
              title="Klik untuk memfilter pelanggan yang sedang Online"
              className={`inline-flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                selectedOnlineFilter === 'online'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs ring-1 ring-emerald-300'
                  : 'bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-400/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{stats.onlineCount} online</span>
            </button>
          </div>
        </div>

        {/* 2. Paket Pro Aktif - Imperial Obsidian & Champagne Gold */}
        <div 
          onClick={() => {
            setSelectedCardFilter('pro');
            setSelectedPlanFilter('Pro');
            setSelectedOnlineFilter('Semua');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-amber-100 border ${
            selectedPlanFilter === 'Pro'
              ? 'ring-2 ring-amber-400 bg-gradient-to-br from-[#2a2208] via-[#1c1604] to-[#0f0c02] border-amber-400/70 shadow-xl shadow-amber-950/40'
              : 'bg-gradient-to-br from-[#201905] via-[#161203] to-[#0c0902] border-amber-500/30 shadow-lg shadow-black/20 hover:border-amber-400/60'
          }`}
          title="Klik untuk memfilter pelanggan Paket Pro"
        >
          <div className="flex items-center justify-between text-amber-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300/90 font-outfit">Paket Pro Aktif</span>
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-amber-300 font-outfit tracking-tight drop-shadow-xs">{stats.proCount}</p>
          <p className="text-[11px] text-amber-200/70 font-semibold">Rp 199rb / tahun per akun</p>
        </div>

        {/* 3. Paket Pemula Gratis - Quiet Executive Slate */}
        <div 
          onClick={() => {
            setSelectedCardFilter('free');
            setSelectedPlanFilter('Pemula');
            setSelectedOnlineFilter('Semua');
          }}
          className={`p-5 rounded-2xl space-y-2 cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl text-slate-100 border ${
            selectedPlanFilter === 'Pemula'
              ? 'ring-2 ring-slate-400 bg-gradient-to-br from-[#1e293b] via-[#141d2b] to-[#0b1017] border-slate-400/70 shadow-xl shadow-slate-950/40'
              : 'bg-gradient-to-br from-[#161f2e] via-[#0f1722] to-[#090e15] border-slate-700/60 shadow-lg shadow-black/20 hover:border-slate-500/60'
          }`}
          title="Klik untuk memfilter pelanggan Paket Pemula"
        >
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300/90 font-outfit">Paket Pemula Gratis</span>
            <div className="w-8 h-8 rounded-xl bg-slate-700/30 text-slate-300 border border-slate-600/40 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <Building2 className="w-4 h-4 text-slate-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight">{stats.freeCount}</p>
          <p className="text-[11px] text-slate-400 font-semibold">Akses Standar Gratis</p>
        </div>

        {/* 4. Estimasi Pendapatan - Royal Emerald Gem */}
        <div className="p-5 rounded-2xl space-y-2 bg-gradient-to-br from-[#064e3b] via-[#043b2d] to-[#02241b] text-white shadow-xl shadow-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400/60 transition-all duration-200 hover:scale-[1.015] hover:shadow-2xl">
          <div className="flex items-center justify-between text-emerald-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300/90 font-outfit">Estimasi Pendapatan (ARR)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight drop-shadow-xs">
            Rp {(stats.annualRevenue / 1000).toLocaleString('id-ID')}rb
          </p>
          <p className="text-[11px] text-emerald-200/70 font-semibold">Pendapatan tahunan berulang</p>
        </div>
      </div>

      {/* Filter & Search Bar - Clean Unified Single Row */}
      <div className="clean-card p-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, email, instansi, telepon, atau SIPA..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] transition-all"
            />
          </div>

          {/* Filter Paket */}
          <select
            value={selectedPlanFilter}
            onChange={(e) => {
              setSelectedPlanFilter(e.target.value);
              setSelectedCardFilter(e.target.value === 'Pro' ? 'pro' : e.target.value === 'Pemula' ? 'free' : 'all');
            }}
            className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-2.5 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit"
          >
            <option value="Semua">📦 Semua Paket</option>
            <option value="Pemula">Pemula (Gratis)</option>
            <option value="Pro">Pro (199rb/thn)</option>
          </select>

          {/* Filter Sisa Masa Aktif */}
          <select
            value={selectedExpiryFilter}
            onChange={(e) => setSelectedExpiryFilter(e.target.value)}
            className={`border rounded-xl text-xs px-2.5 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit ${
              selectedExpiryFilter === 'expiring_soon'
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : selectedExpiryFilter === 'expired'
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-700'
                : 'bg-slate-50 dark:bg-[#06191c] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#184c53]'
            }`}
          >
            <option value="Semua">⏳ Masa Aktif: Semua</option>
            <option value="expiring_soon">⚠️ Segera Kadaluarsa (&lt; 30 Hari)</option>
            <option value="expired">🔴 Sudah Kadaluarsa</option>
            <option value="long_term">🟢 Masa Aktif Panjang (&gt; 6 Bulan)</option>
          </select>

          {/* Filter Status Akun */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-2.5 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit"
          >
            <option value="Semua">🛡️ Status: Semua</option>
            <option value="active">Aktif</option>
            <option value="trial">Uji Coba</option>
            <option value="expired">Kadaluarsa</option>
          </select>

          {/* Filter Status Online */}
          <select
            value={selectedOnlineFilter}
            onChange={(e) => {
              setSelectedOnlineFilter(e.target.value);
              if (e.target.value === 'online') setSelectedCardFilter('online');
            }}
            className={`border rounded-xl text-xs px-2.5 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit ${
              selectedOnlineFilter === 'online'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-50 dark:bg-[#06191c] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#184c53]'
            }`}
          >
            <option value="Semua">🌐 Online: Semua</option>
            <option value="online">🟢 Sedang Online</option>
            <option value="offline">⚪ Offline</option>
          </select>

          {/* Filter Kelengkapan Kontak */}
          <select
            value={selectedContactFilter}
            onChange={(e) => setSelectedContactFilter(e.target.value)}
            className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-2.5 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit"
          >
            <option value="Semua">📱 Kontak: Semua</option>
            <option value="has_wa">Ada No. WhatsApp</option>
            <option value="no_wa">Tanpa No. WhatsApp</option>
            <option value="unverified_email">Email Belum Verifikasi</option>
          </select>

          {/* Urutkan Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs px-2.5 py-2 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3dbfd1] cursor-pointer shrink-0 font-outfit"
          >
            <option value="latest_registered">🕒 Terbaru Mendaftar</option>
            <option value="expiring_soonest">⚠️ Kadaluarsa Terdekat</option>
            <option value="name_asc">🔤 Nama (A - Z)</option>
          </select>

          {/* Reset Filter Button */}
          {(searchQuery !== '' || selectedPlanFilter !== 'Semua' || selectedStatusFilter !== 'Semua' || selectedExpiryFilter !== 'Semua' || selectedOnlineFilter !== 'Semua' || selectedContactFilter !== 'Semua' || sortBy !== 'latest_registered') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedPlanFilter('Semua');
                setSelectedStatusFilter('Semua');
                setSelectedExpiryFilter('Semua');
                setSelectedOnlineFilter('Semua');
                setSelectedContactFilter('Semua');
                setSelectedCardFilter('all');
                setSortBy('latest_registered');
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#0d2c31] transition-colors cursor-pointer shrink-0 font-outfit"
              title="Reset semua pencarian & filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Customers Table with Password Column & Deep Edit */}
      <div className="clean-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 dark:bg-[#031013] text-white border-b-2 border-teal-500 text-[11px] font-extrabold uppercase tracking-wider font-outfit shadow-xs">
                <th className="py-4 pl-4 pr-1 w-8">
                  <input
                    type="checkbox"
                    checked={paginatedCustomers.length > 0 && paginatedCustomers.every(c => selectedCustomerUids.includes(c.uid))}
                    onChange={handleToggleSelectAll}
                    title="Pilih semua pelanggan di halaman ini"
                    className="w-4 h-4 rounded text-teal-500 focus:ring-teal-400 border-slate-600 bg-slate-800 cursor-pointer"
                  />
                </th>
                <th className="py-4 px-4 text-slate-200">Pelanggan / Instansi</th>
                <th className="py-4 px-4 text-slate-200">Password Akses</th>
                <th className="py-4 px-4 text-slate-200">Paket Subskripsi</th>
                <th className="py-4 px-4 text-slate-200">Status Lisensi</th>
                <th className="py-4 px-4 text-slate-200">Masa Aktif & Terdaftar</th>
                <th className="py-4 px-4 text-right text-slate-200">Aksi Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#184c53] text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    Tidak ada data pelanggan yang sesuai dengan kriteria pencarian/filter.
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust) => {
                  const isVisible = !!visiblePasswords[cust.uid];
                  const isCopied = copiedPasswordUid === cust.uid;
                  const currentPassword = cust.password || 'CustPass#' + cust.uid.slice(-4);
                  const cleanWaNumber = cust.phone ? cust.phone.replace(/[^0-9]/g, '').replace(/^0/, '62') : '';
                  const isOnline = isCustomerOnline(cust);

                  // Calculate remaining days & visual alert flags
                  const remainingDays = cust.expiresAt 
                    ? Math.ceil((new Date(cust.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    : null;
                  const isExpiringIn30Days = remainingDays !== null && remainingDays > 0 && remainingDays <= 30;
                  const isExpired = remainingDays !== null && remainingDays <= 0;

                  // Calculate active duration in years / period
                  let activeYearsText: string | null = null;
                  if (cust.expiresAt) {
                    const exp = new Date(cust.expiresAt);
                    const start = cust.createdAt ? new Date(cust.createdAt) : null;
                    if (start && !isNaN(start.getTime()) && !isNaN(exp.getTime())) {
                      const diffDays = Math.round((exp.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                      const years = Math.round(diffDays / 365);
                      if (years >= 50) {
                        activeYearsText = 'Selamanya';
                      } else if (years >= 1) {
                        activeYearsText = `${years} Tahun`;
                      } else {
                        const months = Math.round(diffDays / 30);
                        activeYearsText = months > 0 ? `${months} Bulan` : '1 Tahun';
                      }
                    } else {
                      const diffFromNowDays = Math.round((exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                      const years = Math.round(diffFromNowDays / 365);
                      activeYearsText = years >= 1 ? `${years} Tahun` : '1 Tahun';
                    }
                  }

                  return (
                    <tr 
                      key={cust.uid} 
                      className={`group transition-colors duration-150 border-b border-slate-100 dark:border-[#0c2a30]/80 ${
                        isExpiringIn30Days
                          ? 'border-l-[3px] border-l-amber-500 bg-amber-50/20 dark:bg-amber-950/15 hover:bg-amber-50/40 dark:hover:bg-amber-950/25'
                          : isExpired
                          ? 'border-l-[3px] border-l-rose-500 bg-rose-50/15 dark:bg-rose-950/15 hover:bg-rose-50/35 dark:hover:bg-rose-950/25'
                          : selectedCustomerUids.includes(cust.uid)
                          ? 'border-l-[3px] border-l-teal-500 bg-teal-50/25 dark:bg-teal-950/25 hover:bg-teal-50/40'
                          : 'border-l-[3px] border-l-transparent hover:bg-slate-50/80 dark:hover:bg-[#07242a]/40'
                      }`}
                    >
                      {/* Checkbox Kolom Seleksi */}
                      <td className="py-3.5 pl-4 pr-1 w-8">
                        <input
                          type="checkbox"
                          checked={selectedCustomerUids.includes(cust.uid)}
                          onChange={() => handleToggleSelectOne(cust.uid)}
                          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-[#06191c] cursor-pointer"
                        />
                      </td>

                      {/* Name & Email & Institution & Online Indicator & Phone/WA */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0 mt-0.5">
                            {cust.subscriptionPlan === 'Pro' || cust.subscriptionPlan === 'Elite' || cust.subscriptionPlan === 'Klinik' ? (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black font-outfit text-xs flex items-center justify-center shadow-xs ring-2 ring-amber-400/50">
                                {cust.name.charAt(0).toUpperCase()}
                              </div>
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-700 to-[#165651] text-teal-100 font-bold font-outfit text-xs flex items-center justify-center shadow-2xs ring-1 ring-teal-600/30">
                                {cust.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            {/* Online / Offline Dot Indicator */}
                            {isOnline ? (
                              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3" title="Pengguna sedang Online">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white dark:ring-[#06191c]"></span>
                              </span>
                            ) : (
                              <span className="absolute -bottom-0.5 -right-0.5 inline-flex rounded-full h-2.5 w-2.5 bg-slate-300 dark:bg-slate-600 ring-2 ring-white dark:ring-[#06191c]" title="Pengguna sedang Offline"></span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="font-bold text-[13px] text-slate-900 dark:text-slate-100 font-outfit tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {cust.name}
                              </p>
                              <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                                isOnline 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                                  : 'text-slate-400 font-normal'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
                                <span>{isOnline ? 'Online' : 'Offline'}</span>
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <p className="text-[11.5px] text-slate-500 dark:text-slate-400">{cust.email}</p>
                              {cust.isEmailVerified !== undefined && (
                                <span className={`inline-flex items-center text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                                  cust.isEmailVerified 
                                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' 
                                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                                }`}>
                                  {cust.isEmailVerified ? 'Verified' : 'Unverified'}
                                </span>
                              )}
                            </div>

                            {cust.institution && (
                              <p className="text-[10.5px] text-teal-700 dark:text-teal-300/90 font-medium mt-0.5 flex items-center gap-1">
                                <Building2 className="w-3 h-3 shrink-0 opacity-80" />
                                <span>{cust.institution}</span>
                              </p>
                            )}

                            {/* No. Telepon / WhatsApp */}
                            {cust.phone && (
                              <div className="inline-flex items-center gap-1.5 mt-1 bg-slate-50 dark:bg-[#061c20] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-[#134950]/60 text-[10.5px] transition-colors">
                                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                                  {cust.phone}
                                </span>
                                <a
                                  href={`https://wa.me/${cleanWaNumber}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Chat via WhatsApp"
                                  className="p-0.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors inline-flex items-center cursor-pointer"
                                >
                                  <Phone className="w-2.5 h-2.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleOpenWaTemplate(cust)}
                                  title="Template WhatsApp"
                                  className="p-0.5 text-teal-600 dark:text-[#5fd0df] hover:text-teal-700 transition-colors inline-flex items-center cursor-pointer"
                                >
                                  <MessageSquare className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Password Column with Sleek Minimalist Glass Capsule */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-[#06191c]/80 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-[#134950]/60 hover:border-slate-300 dark:hover:border-[#185c64] transition-colors">
                          <span className={`font-mono text-xs ${isVisible ? 'font-bold text-teal-700 dark:text-[#5fd0df]' : 'text-slate-400 tracking-widest'}`}>
                            {isVisible ? currentPassword : '••••••••'}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(cust.uid)}
                            title={isVisible ? "Sembunyikan password" : "Lihat password"}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-[#184c53] transition-colors cursor-pointer"
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyPassword(cust.uid, currentPassword)}
                            title="Salin password"
                            className="text-slate-400 hover:text-teal-600 dark:hover:text-[#5fd0df] p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-[#184c53] transition-colors cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Subscription Plan Column - Executive Minimalist Glass */}
                      <td className="py-3.5 px-4">
                        {(cust.subscriptionPlan === 'Pro' || cust.subscriptionPlan === 'Elite' || cust.subscriptionPlan === 'Klinik') ? (
                          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/12 to-amber-400/12 dark:from-amber-400/15 dark:to-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-400/40 dark:border-amber-400/30 px-3 py-1 rounded-full text-xs font-black font-outfit shadow-2xs tracking-wide">
                            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>Paket Pro</span>
                          </span>
                        ) : (
                          <div className="inline-flex items-center gap-2">
                            <span className="inline-flex items-center bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-outfit">
                              Pemula
                            </span>
                            <button
                              type="button"
                              onClick={() => handleChangePlan(cust.uid, 'Pro')}
                              title="Tingkatkan akun ini menjadi Pro (+1 Tahun)"
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10.5px] font-bold text-amber-700 dark:text-amber-300 hover:text-slate-950 dark:hover:text-slate-950 bg-amber-50 hover:bg-amber-400 dark:bg-amber-950/40 dark:hover:bg-amber-400 border border-amber-300/80 dark:border-amber-500/40 hover:border-amber-400 rounded-full transition-all cursor-pointer font-outfit hover:shadow-xs"
                            >
                              <Zap className="w-2.5 h-2.5 fill-current" />
                              <span>Upgrade Pro</span>
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Status Badge - Subtle Glass Glow Badges */}
                      <td className="py-3.5 px-4">
                        {cust.subscriptionStatus === 'active' && (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Aktif</span>
                          </span>
                        )}
                        {cust.subscriptionStatus === 'trial' && (
                          <span className="inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit shadow-2xs">
                            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span>Uji Coba</span>
                          </span>
                        )}
                        {cust.subscriptionStatus === 'expired' && (
                          <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-300/80 dark:border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px] font-outfit shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>Kadaluarsa</span>
                          </span>
                        )}
                      </td>

                      {/* Expiry Date & Registration Date */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        <div className="space-y-1">
                          {cust.expiresAt ? (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-[#5fd0df] shrink-0" />
                              <span className={`font-semibold text-xs ${
                                isExpiringIn30Days ? 'text-amber-600 dark:text-amber-400 font-bold' : isExpired ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-800 dark:text-slate-200'
                              }`}>
                                {new Date(cust.expiresAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              {isExpiringIn30Days ? (
                                <span className="inline-flex items-center text-[9.5px] font-black px-1.5 py-0.2 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80 animate-pulse">
                                  Sisa {remainingDays} Hari
                                </span>
                              ) : isExpired ? (
                                <span className="inline-flex items-center text-[9.5px] font-black px-1.5 py-0.2 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700/80">
                                  Kadaluarsa
                                </span>
                              ) : activeYearsText ? (
                                <span className="inline-flex items-center text-[9.5px] font-bold px-1.5 py-0.2 rounded-md bg-teal-50/80 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/50">
                                  {activeYearsText}
                                </span>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-slate-400 font-mono text-xs">-</span>
                          )}
                          {cust.createdAt && (
                            <div className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-normal" title="Tanggal registrasi akun">
                              <Clock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              <span>Daftar {new Date(cust.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions - Sleek Executive Ghost Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1 justify-end">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(cust)}
                            title="Edit Data & Hak Akses Customer"
                            className="p-1.5 text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-[#09282d] border border-transparent hover:border-teal-200 dark:hover:border-teal-700/50 rounded-lg transition-all cursor-pointer hover:scale-105"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingCustomer(cust)}
                            title="Hapus Akun Customer"
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-800/50 rounded-lg transition-all cursor-pointer hover:scale-105"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {filteredCustomers.length > 0 && (
          <div className="px-6 py-4 bg-white dark:bg-[#06191c] border-t border-slate-100 dark:border-[#184c53] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Info Text & Page Size Selector */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>
                Menampilkan <strong className="text-slate-900 dark:text-white font-bold">{Math.min(filteredCustomers.length, (currentPage - 1) * pageSize + 1)}</strong> - <strong className="text-slate-900 dark:text-white font-bold">{Math.min(filteredCustomers.length, currentPage * pageSize)}</strong> dari <strong className="text-slate-900 dark:text-white font-bold">{filteredCustomers.length}</strong> akun
              </span>

              <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-[#184c53] pl-3">
                <span className="text-[11px]">Per halaman:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-50 dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] rounded-lg px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            {/* Right: Navigation Buttons */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#184c53] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 font-outfit"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, idx, arr) => {
                      const prevPage = arr[idx - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && <span className="px-1 text-slate-400 font-bold">...</span>}
                          <button
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer font-outfit ${
                              currentPage === page
                                ? 'bg-teal-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31]'
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#184c53] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 font-outfit"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
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
                onClick={() => setEditModalTab('payment')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 font-outfit cursor-pointer ${
                  editModalTab === 'payment'
                    ? 'bg-white dark:bg-[#0d2c31] text-[#12645e] dark:text-[#5fd0df] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Riwayat Transaksi</span>
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

                  {/* Tanggal Terdaftar & Tanggal Masa Aktif Berakhir */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-[#5fd0df]" />
                        <span>Tanggal Terdaftar (Registrasi)</span>
                      </label>
                      <input
                        type="date"
                        value={formState.createdAtDate}
                        onChange={(e) => setFormState({ ...formState, createdAtDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-[#5fd0df]" />
                        <span>Tanggal Masa Aktif Berakhir</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formState.expiresAtDate}
                        onChange={(e) => setFormState({ ...formState, expiresAtDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                      />
                    </div>
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

              {/* TAB 3: Feature Permissions & Quotas (Categorized Matching App Modules) */}
              {editModalTab === 'permissions' && (
                <div className="space-y-4 animate-in fade-in max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  
                  {/* Quick Preset Toolbar */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-teal-50/80 to-emerald-50/80 dark:from-[#09252a] dark:to-[#061c20] border border-teal-200 dark:border-[#184c53] gap-2 flex-wrap">
                    <div className="text-xs font-bold text-teal-900 dark:text-teal-200 font-outfit">
                      Preset Hak Akses Cepat:
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFormState(prev => ({
                            ...prev,
                            maxDrugsOverride: 99,
                            canExportPdf: true,
                            canAccessRenal: true,
                            canAccessPolypharmacy: true,
                            canAccessIvCompatibility: true,
                            canAccessBud: true,
                            canAccessPediatric: true,
                            canAccessPregnancy: true,
                            canAccessDrugLab: true,
                            canAccessHerbDrug: true,
                            canAccessSideEffects: true,
                            canAccessWhatsappPio: true,
                            canAccessGuidelines: true,
                            canAccessCompetency: true,
                            canAccessSop: true,
                            canAccessRegulations: true,
                            canAccessLiterature: true
                          }));
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-xs transition-all cursor-pointer hover:scale-102 font-outfit"
                      >
                        <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>Buka Semua (Standar Pro)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormState(prev => ({
                            ...prev,
                            maxDrugsOverride: 20,
                            canExportPdf: false,
                            canAccessRenal: false,
                            canAccessPolypharmacy: false,
                            canAccessIvCompatibility: false,
                            canAccessBud: false,
                            canAccessPediatric: false,
                            canAccessPregnancy: false,
                            canAccessDrugLab: false,
                            canAccessHerbDrug: false,
                            canAccessSideEffects: false,
                            canAccessWhatsappPio: false,
                            canAccessGuidelines: false,
                            canAccessCompetency: false,
                            canAccessSop: false,
                            canAccessRegulations: false,
                            canAccessLiterature: false
                          }));
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition-colors cursor-pointer font-outfit"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Batasi ke Pemula</span>
                      </button>
                    </div>
                  </div>

                  {/* KATEGORI 1: Kuota Pemeriksaan & Output Laporan */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-3">
                    <div className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300 font-outfit flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-[#184c53]">
                      <Sliders className="w-3.5 h-3.5 text-teal-600" />
                      <span>Batas Kuota & Ekspor Laporan</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">
                        Batas Maksimum Pemeriksaan Obat per Formulir Resep
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={formState.maxDrugsOverride}
                          onChange={(e) => setFormState({ ...formState, maxDrugsOverride: Number(e.target.value) })}
                          className="w-28 px-3.5 py-2 bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-black font-mono focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                        />
                        <span className="text-xs text-slate-500 font-medium">obat sekaligus (Standar: 20 Pemula / 99 Pro)</span>
                      </div>
                    </div>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-teal-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Download className="w-3.5 h-3.5 text-teal-600 dark:text-[#3dbfd1]" />
                          Izin Cetak & Ekspor PDF Laporan Klinis
                        </span>
                        <p className="text-[11px] text-slate-500">Mampu mencetak dokumen resmi kajian interaksi obat dengan kop klinik.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canExportPdf}
                        onChange={(e) => setFormState({ ...formState, canExportPdf: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>
                  </div>

                  {/* KATEGORI 2: Modul Skrining & Keamanan Resep */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-2.5">
                    <div className="text-xs font-black uppercase tracking-wider text-rose-800 dark:text-rose-400 font-outfit flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-[#184c53]">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                      <span>Skrining & Keamanan Resep Klinis</span>
                    </div>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-sky-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Syringe className="w-3.5 h-3.5 text-sky-500" />
                          Kompatibilitas Injeksi IV & ICU (ASHP)
                        </span>
                        <p className="text-[11px] text-slate-500">Skrining percabangan Y-Site, presipitasi pelarut infus & stabilitas rekonstitusi.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessIvCompatibility}
                        onChange={(e) => setFormState({ ...formState, canAccessIvCompatibility: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-pink-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />
                          Keamanan Obat Ibu Hamil & Menyusui
                        </span>
                        <p className="text-[11px] text-slate-500">Penapisan risiko teratogenik FDA PLLR per trimester & profil ekskresi ASI (Hale's L1–L5).</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessPregnancy}
                        onChange={(e) => setFormState({ ...formState, canAccessPregnancy: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-cyan-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5 text-cyan-500" />
                          Interaksi Obat & Hasil Uji Laboratorium
                        </span>
                        <p className="text-[11px] text-slate-500">Deteksi positif/negatif palsu biomarker lab (Troponin, Kreatinin, TSH, Glukosa).</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessDrugLab}
                        onChange={(e) => setFormState({ ...formState, canAccessDrugLab: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-emerald-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                          Interaksi Obat dengan Jamu & Herbal Indonesia
                        </span>
                        <p className="text-[11px] text-slate-500">Evaluasi penapisan sediaan Jamu, OHT & Fitofarmaka terhadap obat resep dokter.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessHerbDrug}
                        onChange={(e) => setFormState({ ...formState, canAccessHerbDrug: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-amber-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-amber-500" />
                          Analisis Efek Samping Obat & Skor Naranjo (MESO)
                        </span>
                        <p className="text-[11px] text-slate-500">Evaluasi toksisitas organ, algoritma kausalitas Naranjo, dan generator formulir MESO.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessSideEffects}
                        onChange={(e) => setFormState({ ...formState, canAccessSideEffects: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>
                  </div>

                  {/* KATEGORI 3: Kalkulator Medis & Racikan */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-2.5">
                    <div className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-outfit flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-[#184c53]">
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kalkulator Medis & Racikan Farmasi</span>
                    </div>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-teal-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <CalendarClock className="w-3.5 h-3.5 text-teal-500" />
                          Stabilitas & Beyond Use Date (BUD Racikan)
                        </span>
                        <p className="text-[11px] text-slate-500">Penetapan batas kadaluarsa sediaan racikan berstandar USP &lt;795&gt;, &lt;797&gt; & FI VI.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessBud}
                        onChange={(e) => setFormState({ ...formState, canAccessBud: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-rose-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Baby className="w-3.5 h-3.5 text-rose-500" />
                          Kalkulator Dosis Pediatrik & Konversi Puyer
                        </span>
                        <p className="text-[11px] text-slate-500">Hitung dosis anak berbasis BB & BSA serta peracikan puyer dengan penimbang SL.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessPediatric}
                        onChange={(e) => setFormState({ ...formState, canAccessPediatric: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-violet-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Calculator className="w-3.5 h-3.5 text-violet-500" />
                          Kalkulator Medis & Klirens Ginjal (CrCl/eGFR)
                        </span>
                        <p className="text-[11px] text-slate-500">Kalkulasi eGFR/CrCl, skor hepar Child-Pugh, dan konversi dosis opioid paliatif.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessRenal}
                        onChange={(e) => setFormState({ ...formState, canAccessRenal: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>
                  </div>

                  {/* KATEGORI 4: Polifarmasi & Edukasi Pasien */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-2.5">
                    <div className="text-xs font-black uppercase tracking-wider text-indigo-800 dark:text-indigo-400 font-outfit flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-[#184c53]">
                      <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Polifarmasi & Edukasi Pasien</span>
                    </div>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-indigo-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-indigo-500" />
                          Evaluasi Polifarmasi Geriatri (Kriteria Beers 2023)
                        </span>
                        <p className="text-[11px] text-slate-500">Penapisan obat tidak tepat lansia, analisis beban antikolinergik & duplikasi terapi.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessPolypharmacy}
                        onChange={(e) => setFormState({ ...formState, canAccessPolypharmacy: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-teal-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-teal-500" />
                          Kartu Edukasi Obat (PIO) WhatsApp Pasien
                        </span>
                        <p className="text-[11px] text-slate-500">Pembuatan kartu aturan pakai digital dan kirim instan via WhatsApp ke pasien.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessWhatsappPio}
                        onChange={(e) => setFormState({ ...formState, canAccessWhatsappPio: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-blue-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <HeartPulse className="w-3.5 h-3.5 text-blue-500" />
                          Database Panduan Terapi PNPK Kemenkes RI
                        </span>
                        <p className="text-[11px] text-slate-500">Akses 23+ pedoman nasional pelayanan kedokteran & algoritma terapi FORNAS.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessGuidelines}
                        onChange={(e) => setFormState({ ...formState, canAccessGuidelines: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>
                  </div>

                  {/* KATEGORI 5: Pusat Belajar, SOP & Regulasi */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-2.5">
                    <div className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-cyan-400 font-outfit flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-[#184c53]">
                      <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                      <span>Pusat Belajar, SOP & Regulasi Farmasi</span>
                    </div>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-emerald-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                          Pusat Belajar Farmasi (CBT & OSCE UKMPPAI)
                        </span>
                        <p className="text-[11px] text-slate-500">Bank soal kasus vignette, simulasi tryout berwaktu, dan panduan stasi OSCE.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessCompetency}
                        onChange={(e) => setFormState({ ...formState, canAccessCompetency: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-slate-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                          SOP Pelayanan Farmasi Klinis
                        </span>
                        <p className="text-[11px] text-slate-500">Standar operasional prosedur resmi penapisan resep, dispensing, dan konseling PIO.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessSop}
                        onChange={(e) => setFormState({ ...formState, canAccessSop: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-amber-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-amber-500" />
                          Database Regulasi & UU Kesehatan RI
                        </span>
                        <p className="text-[11px] text-slate-500">Kompilasi undang-undang, Permenkes, dan standar akreditasi fasilitas farmasi.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessRegulations}
                        onChange={(e) => setFormState({ ...formState, canAccessRegulations: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#092327] border border-slate-200 dark:border-[#184c53] cursor-pointer hover:border-teal-400 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit flex items-center gap-1.5">
                          <BookMarked className="w-3.5 h-3.5 text-teal-500" />
                          Pusat Literatur Klinis & Basis Ilmiah EBM
                        </span>
                        <p className="text-[11px] text-slate-500">Akses jurnal farmakologi terakreditasi, matriks pembuktian klinis & EBM.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formState.canAccessLiterature}
                        onChange={(e) => setFormState({ ...formState, canAccessLiterature: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>
                  </div>

                </div>
              )}

              {/* TAB 4: Payment & Transaction History */}
              {editModalTab === 'payment' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-[#092b31] border border-teal-200 dark:border-[#184c53] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 dark:text-[#5fd0df] font-outfit block">Paket Terdaftar</span>
                      <p className="text-sm font-black text-slate-900 dark:text-white font-outfit">
                        {editingCustomer.subscriptionPlan} • {editingCustomer.subscriptionStatus === 'active' ? 'Aktif' : 'Kadaluarsa'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-outfit block">Total Transaksi Tercatat</span>
                      <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-outfit">
                        Rp {((editingCustomer.paymentHistory || []).reduce((sum, r) => sum + (r.amount || 0), 0)).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Form Catat Transaksi Baru */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] space-y-3">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit block">
                      + Catat Pembayaran / Perpanjangan Baru
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 font-outfit">Tanggal Bayar</label>
                        <input
                          type="date"
                          value={newPaymentDate}
                          onChange={(e) => setNewPaymentDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 font-outfit">Nominal (Rp)</label>
                        <input
                          type="number"
                          value={newPaymentAmount}
                          onChange={(e) => setNewPaymentAmount(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold font-mono text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 font-outfit">Metode Bayar</label>
                        <select
                          value={newPaymentMethod}
                          onChange={(e) => setNewPaymentMethod(e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                          <option value="Transfer Bank BCA">Transfer BCA</option>
                          <option value="Transfer Bank Mandiri">Transfer Mandiri</option>
                          <option value="Transfer Bank BRI">Transfer BRI</option>
                          <option value="QRIS Apotek">QRIS Apotek</option>
                          <option value="Tunai / Kasir">Tunai / Kasir</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="No. Referensi / No. Resi Bank (Opsional)"
                        value={newPaymentRef}
                        onChange={(e) => setNewPaymentRef(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white dark:bg-[#0d2c31] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs text-slate-800 dark:text-slate-200"
                      />
                      <button
                        type="button"
                        onClick={handleAddPaymentRecord}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold font-outfit cursor-pointer transition-all hover:scale-102 shrink-0"
                      >
                        Simpan Pembayaran
                      </button>
                    </div>
                  </div>

                  {/* Daftar Riwayat Transaksi */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-outfit block">
                      Daftar Pembayaran Tercatat:
                    </span>
                    {(!editingCustomer.paymentHistory || editingCustomer.paymentHistory.length === 0) ? (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#06191c] text-center text-xs text-slate-400 border border-slate-200 dark:border-[#184c53]">
                        Belum ada riwayat pembayaran tercatat untuk pelanggan ini.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {editingCustomer.paymentHistory.map((rec) => (
                          <div 
                            key={rec.id}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] flex items-center justify-between text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800 dark:text-slate-200 font-outfit">
                                  Rp {rec.amount.toLocaleString('id-ID')}
                                </span>
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                  {rec.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {new Date(rec.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} • {rec.paymentMethod} {rec.referenceNumber ? `(${rec.referenceNumber})` : ''}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeletePaymentRecord(rec.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                              title="Hapus catatan transaksi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: Internal Admin Notes */}
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

      {/* MODAL: Impor Akun dari Firebase Authentication */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#092327] w-full max-w-xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-[#184c53] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#184c53] pb-3">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-outfit">
                <Sparkles className="w-5 h-5 text-[#3dbfd1]" />
                Impor & Daftarkan Akun dari Firebase Console
              </h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Salin atau ketik alamat email pengguna yang sudah terdaftar di <strong>Firebase Authentication</strong> (bisa 1 email atau banyak sekaligus dipisahkan baris baru / koma). Sistem akan otomatis membuatkan profil lisensinya ke Cloud Firestore.
            </p>

            <form onSubmit={handleImportEmailsFromFirebase} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">
                  Daftar Alamat Email (dari Firebase Console) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={importEmailsText}
                  onChange={(e) => setImportEmailsText(e.target.value)}
                  placeholder="contoh@gmail.com&#10;dokter.budi@rsmedika.com&#10;apt.siti@apotek.co.id"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-mono font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">
                    Pilihan Paket Subskripsi
                  </label>
                  <select
                    value={importPlan}
                    onChange={(e) => setImportPlan(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  >
                    <option value="Pro">Pro (1 Tahun Akses Penuh)</option>
                    <option value="Pemula">Pemula (Gratis Dasar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-outfit">
                    Instansi / Keterangan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={importInstitution}
                    onChange={(e) => setImportInstitution(e.target.value)}
                    placeholder="Contoh: RS Medika / Apotek"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#3dbfd1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-[#184c53]">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white btn-teal-gradient rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Impor & Aktifkan ke Firestore</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: WhatsApp Message Templates */}
      {waModalCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#06191c] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#184c53] p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#184c53]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kirim Pesan WhatsApp Cepat
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Kepada: <span className="font-bold text-slate-800 dark:text-slate-200">{waModalCustomer.name}</span> ({waModalCustomer.phone || '-'})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWaModalCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-[#0d2c31] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Template Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-outfit block">
                Pilih Template Pesan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWaMessage(`Halo apt. ${waModalCustomer.name}, selamat datang di platform Farmasi Druggist! Akun Anda telah siap digunakan untuk penapisan interaksi klinis obat dan evaluasi resep pasien.`)}
                  className="p-2.5 text-left bg-slate-50 dark:bg-[#0d2c31]/60 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 border border-slate-200 dark:border-[#184c53] rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>🌿</span> Sambutan Pengguna Baru
                  </div>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 truncate">Selamat datang di platform Farmasi Druggist...</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const exp = waModalCustomer.expiresAt ? new Date(waModalCustomer.expiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
                    setWaMessage(`Halo apt. ${waModalCustomer.name}, lisensi Paket Pro Farmasi Druggist Anda telah aktif sampai dengan ${exp}. Selamat bertugas dan menikmati seluruh fitur klinis tanpa batas!`);
                  }}
                  className="p-2.5 text-left bg-slate-50 dark:bg-[#0d2c31]/60 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 border border-slate-200 dark:border-[#184c53] rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>⚡</span> Konfirmasi Lisensi Pro
                  </div>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 truncate">Lisensi Paket Pro telah aktif s/d...</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const exp = waModalCustomer.expiresAt ? new Date(waModalCustomer.expiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
                    const remaining = waModalCustomer.expiresAt ? Math.ceil((new Date(waModalCustomer.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                    const remainingStr = remaining && remaining > 0 ? `tersisa ${remaining} hari lagi (berakhir pada ${exp})` : `telah berakhir pada ${exp}`;
                    setWaMessage(`Yth. apt. ${waModalCustomer.name}${waModalCustomer.institution ? ` (${waModalCustomer.institution})` : ''},\n\nKami menginformasikan bahwa lisensi platform Farmasi Druggist Anda ${remainingStr}.\n\nUntuk menjaga kelancaran evaluasi resep dan penapisan interaksi obat di faskes Anda, perpanjangan tahunan dapat dilakukan dengan rincian berikut:\n• Paket: Pro Lisensi 1 Tahun\n• Biaya: Rp 199.000 / tahun\n• Pembayaran: Transfer Bank / QRIS\n\nSilakan konfirmasi bukti transfer melalui nomor ini agar akun langsung diperpanjang. Terima kasih! 🙏`);
                  }}
                  className="p-2.5 text-left bg-slate-50 dark:bg-[#0d2c31]/60 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 border border-slate-200 dark:border-[#184c53] rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>🧾</span> Pengingat Tagihan Perpanjangan
                  </div>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 truncate">Rincian perpanjangan lisensi Rp 199rb...</p>
                </button>

                <button
                  type="button"
                  onClick={() => setWaMessage(`Halo apt. ${waModalCustomer.name}, apakah ada kendala atau pertanyaan terkait penggunaan fitur dan penapisan obat di Farmasi Druggist? Tim dukungan kami siap membantu.`)}
                  className="p-2.5 text-left bg-slate-50 dark:bg-[#0d2c31]/60 hover:bg-teal-50 dark:hover:bg-[#156d67]/30 border border-slate-200 dark:border-[#184c53] rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>💬</span> Bantuan & Dukungan
                  </div>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 truncate">Apakah ada kendala atau pertanyaan...</p>
                </button>
              </div>
            </div>

            {/* Editable Message Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-outfit block">
                Isi Pesan (Dapat Disesuaikan):
              </label>
              <textarea
                rows={4}
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                placeholder="Tulis pesan untuk dikirim via WhatsApp..."
                className="w-full p-3 bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-[#184c53] rounded-xl text-xs text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#3dbfd1]"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#184c53]">
              <button
                type="button"
                onClick={() => setWaModalCustomer(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0d2c31] rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const cleanPhone = waModalCustomer.phone ? waModalCustomer.phone.replace(/[^0-9]/g, '').replace(/^0/, '62') : '';
                  if (!cleanPhone) {
                    alert('Pelanggan ini belum memiliki nomor telepon/WhatsApp.');
                    return;
                  }
                  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`, '_blank');
                  setWaModalCustomer(null);
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 transition-all hover:scale-102"
              >
                <Phone className="w-4 h-4" />
                <span>Buka WhatsApp & Kirim</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bulk Action Bar */}
      {selectedCustomerUids.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-[#06191c]/95 backdrop-blur-md text-white rounded-2xl px-5 py-3.5 shadow-2xl border border-slate-700/80 dark:border-[#184c53] flex flex-wrap items-center gap-3.5 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-700 dark:border-slate-800">
            <div className="w-6 h-6 rounded-full bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center font-outfit">
              {selectedCustomerUids.length}
            </div>
            <span className="text-xs font-bold font-outfit">Pelanggan Dipilih</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBulkUpgradeToPro}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-102 font-outfit"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Aktifkan Pro</span>
            </button>

            <button
              type="button"
              onClick={() => handleBulkExtendSubscription(12)}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-102 font-outfit"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>+1 Tahun</span>
            </button>

            <button
              type="button"
              onClick={() => handleExportCSV()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-102 font-outfit"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Ekspor</span>
            </button>

            <button
              type="button"
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-102 font-outfit"
              title="Hapus permanen semua pelanggan yang dipilih"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCustomerUids([])}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Batalkan pilihan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerSubscriptionManager;
