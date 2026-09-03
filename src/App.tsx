import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { DrugDirectory } from './components/DrugDirectory';
import { InteractionChecker } from './components/InteractionChecker';
import { HistoryList } from './components/HistoryList';
import { AdminPanel } from './components/AdminPanel';
import { MedicationUsageGuide } from './components/MedicationUsageGuide';
import { PharmacySopManager } from './components/PharmacySopManager';
import { PharmacyRegulationsManager } from './components/PharmacyRegulationsManager';
import { ClinicalLiterature } from './components/ClinicalLiterature';
import { RenalDoseAdjuster } from './components/RenalDoseAdjuster';
import { ClinicalPolypharmacyEvaluator } from './components/ClinicalPolypharmacyEvaluator';
import { ClinicalTherapyGuidelines } from './components/ClinicalTherapyGuidelines';
import { PediatricCompoundingCalculator } from './components/PediatricCompoundingCalculator';
import { IvCompatibilityChecker } from './components/IvCompatibilityChecker';
import { WhatsAppPatientCardManager } from './components/WhatsAppPatientCardManager';
import { CustomerSubscriptionManager } from './components/CustomerSubscriptionManager';
import { SideEffectChecker } from './components/SideEffectChecker';
import { PharmacyCompetencyCenter } from './components/PharmacyCompetencyCenter';
import { PregnancyLactationChecker } from './components/PregnancyLactationChecker';
import { DrugLabInteractionChecker } from './components/DrugLabInteractionChecker';
import { BeyondUseDateCalculator } from './components/BeyondUseDateCalculator';
import { HerbDrugInteractionChecker } from './components/HerbDrugInteractionChecker';
import { ProFeatureGate } from './components/ProFeatureGate';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import { DrugDetailModal } from './components/DrugDetailModal';
import { InteractionReportModal } from './components/InteractionReportModal';
import { AntigravityUpdateModal } from './components/AntigravityUpdateModal';
import { Drug, DrugInteraction, UserProfile, InteractionCheckRecord, SeverityLevel, PricingPlan, DrugFoodInteraction, TherapeuticDuplication, SystemAuditLog, AuditActionType, AdminUser, ClinicBrandingSettings, PaymentMethodSettings } from './types';
import { INITIAL_DRUGS, INITIAL_INTERACTIONS, PRICING_PLANS, SAMPLE_FOOD_INTERACTIONS, SAMPLE_THERAPEUTIC_DUPLICATIONS } from './data/ddinterData';
import { INITIAL_AUDIT_LOGS } from './data/mockAuditLogs';
import { INITIAL_ADMIN_USERS } from './data/mockAdminUsers';
import { INITIAL_CUSTOMERS, SAMPLE_DEMO_CUSTOMERS } from './data/mockCustomers';
import { DEFAULT_CLINIC_BRANDING } from './data/defaultBranding';
import { DEFAULT_PAYMENT_SETTINGS } from './data/defaultPaymentSettings';
import {
  auth,
  logoutUser,
  fetchAllDrugs,
  fetchAllInteractions,
  saveDrugToFirestore,
  deleteDrugFromFirestore,
  saveInteractionToFirestore,
  saveInteractionCheckHistory,
  fetchUserHistory,
  seedFirestoreIfEmpty,
  saveUserProfileToFirestore,
  getUserProfileFromFirestore,
  subscribeToCustomersFirestore,
  fetchCustomersFromFirestore
} from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { deduplicateDrugs, deduplicateInteractions, resolveInteractionPair } from './utils/ddinterEngine';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('farmasi_current_user');
      if (!savedUser || savedUser === 'null_session' || savedUser === 'null' || savedUser === 'undefined') return null;
      const parsed = JSON.parse(savedUser);
      if (!parsed || typeof parsed !== 'object') return null;
      if (parsed.isEmailVerified === false) {
        localStorage.setItem('farmasi_current_user', 'null_session');
        return null;
      }
      if (parsed.subscriptionPlan === 'Klinik' || parsed.subscriptionPlan === 'Elite' || (parsed.role === 'admin' && parsed.subscriptionPlan !== 'Pemula')) {
        parsed.subscriptionPlan = 'Pro';
        try {
          localStorage.setItem('farmasi_current_user', JSON.stringify(parsed));
        } catch (e) {}
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse saved user session:', e);
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const savedUser = localStorage.getItem('farmasi_current_user');
      const hasUser = savedUser && savedUser !== 'null_session' && savedUser !== 'null' && savedUser !== 'undefined';
      if (!hasUser) {
        localStorage.setItem('farmasi_active_tab', 'landing');
        return 'landing';
      }
      let parsedUser: any = null;
      try {
        parsedUser = JSON.parse(savedUser);
      } catch (e) {}
      const savedTab = localStorage.getItem('farmasi_active_tab');
      if (savedTab) {
        if (savedTab.startsWith('admin') && (!parsedUser || parsedUser.role !== 'admin')) {
          localStorage.setItem('farmasi_active_tab', 'landing');
          return 'landing';
        }
        return savedTab;
      }
    } catch (e) {
      console.error('Failed to parse saved active tab:', e);
    }
    return 'landing';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('farmasi_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch (e) {}
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    } catch (e) {}
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const APP_DB_VERSION = 'v2026_indonesian_monographs_v33';

  // Atomic database version migration and cache invalidation
  try {
    const dbVer = localStorage.getItem('farmasi_db_version');
    if (dbVer !== APP_DB_VERSION) {
      localStorage.setItem('farmasi_db_version', APP_DB_VERSION);
      localStorage.removeItem('farmasi_custom_drugs');
      localStorage.removeItem('farmasi_custom_interactions');
      localStorage.removeItem('farmasi_food_interactions');
      localStorage.removeItem('farmasi_duplication_rules');
    }
  } catch (e) {
    console.error('Failed to sync DB version in localStorage:', e);
  }

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [drugs, setDrugs] = useState<Drug[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_custom_drugs');
      if (saved) return deduplicateDrugs(JSON.parse(saved));
    } catch (e) {}
    return deduplicateDrugs(INITIAL_DRUGS);
  });

  const [interactions, setInteractions] = useState<DrugInteraction[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_custom_interactions');
      if (saved) return deduplicateInteractions(JSON.parse(saved));
    } catch (e) {}
    return deduplicateInteractions(INITIAL_INTERACTIONS);
  });

  const [foodInteractions, setFoodInteractions] = useState<DrugFoodInteraction[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_food_interactions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_FOOD_INTERACTIONS;
  });

  const [duplicationRules, setDuplicationRules] = useState<TherapeuticDuplication[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_duplication_rules');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_THERAPEUTIC_DUPLICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_audit_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_AUDIT_LOGS;
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_admin_users');
      if (saved) {
        const parsed: AdminUser[] = JSON.parse(saved);
        const filtered = parsed
          .filter(u => !['admin-001', 'admin-002', 'admin-003', 'admin-004'].includes(u.id))
          .map(u => ({
            ...u,
            password: u.password || (u.id === 'admin-main-000' ? 'admin123' : 'pass12345')
          }));
        if (filtered.length > 0) {
          localStorage.setItem('farmasi_admin_users', JSON.stringify(filtered));
          return filtered;
        }
      }
    } catch (e) {}
    return INITIAL_ADMIN_USERS;
  });

  const [clinicBranding, setClinicBranding] = useState<ClinicBrandingSettings>(() => {
    try {
      const saved = localStorage.getItem('farmasi_clinic_branding');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_CLINIC_BRANDING;
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentMethodSettings>(() => {
    try {
      const saved = localStorage.getItem('farmasi_payment_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_PAYMENT_SETTINGS;
  });

  const [customerList, setCustomerList] = useState<UserProfile[]>(() => {
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

  // Real-time Firestore Listener for Customer Subscriptions
  useEffect(() => {
    const unsubscribe = subscribeToCustomersFirestore((firestoreCustomers) => {
      if (!firestoreCustomers) return;

      let deletedList: string[] = [];
      try {
        const savedDeleted = localStorage.getItem('farmasi_deleted_customer_uids');
        if (savedDeleted) deletedList = JSON.parse(savedDeleted);
      } catch (e) {}

      const cleanList = firestoreCustomers.filter(c => 
        c.role !== 'admin' && 
        !(c.email && c.email.toLowerCase().includes('admin@farmasidruggist.com')) &&
        c.uid && !deletedList.includes(c.uid)
      );

      setCustomerList((prev) => {
        const map = new Map<string, UserProfile>();
        // Add existing local customers first
        prev.forEach(c => {
          if (c.uid && !deletedList.includes(c.uid)) {
            const key = (c.uid || c.email).toLowerCase();
            map.set(key, c);
          }
        });
        // Merge with fresh Firestore customer data
        cleanList.forEach(fc => {
          if (fc.uid && !deletedList.includes(fc.uid)) {
            const key = (fc.uid || fc.email).toLowerCase();
            map.set(key, fc);
          }
        });
        const merged = Array.from(map.values());
        try {
          localStorage.setItem('farmasi_customer_subscriptions', JSON.stringify(merged));
        } catch (e) {}
        return merged;
      });
    });
    return () => unsubscribe();
  }, []);

  const handleRegisterOrSyncCustomer = (newUser: UserProfile) => {
    // Exclude admin accounts from being inserted into customer subscriptions
    if (newUser.role === 'admin' || (newUser.email && newUser.email.toLowerCase().includes('admin@farmasidruggist.com'))) {
      return;
    }

    // Save directly to Cloud Firestore
    saveUserProfileToFirestore(newUser).catch((err) => {
      console.warn('Could not sync user to Firestore:', err);
    });

    setCustomerList((prev) => {
      const existingIdx = prev.findIndex(c => 
        (c.email && newUser.email && c.email.toLowerCase() === newUser.email.toLowerCase()) || 
        (c.uid && newUser.uid && c.uid === newUser.uid)
      );

      let updated: UserProfile[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          name: newUser.name || updated[existingIdx].name,
          phone: newUser.phone || updated[existingIdx].phone,
          institution: newUser.institution || updated[existingIdx].institution,
          password: newUser.password || updated[existingIdx].password,
          subscriptionPlan: newUser.subscriptionPlan || updated[existingIdx].subscriptionPlan,
          subscriptionStatus: newUser.subscriptionStatus || updated[existingIdx].subscriptionStatus,
          role: newUser.role || updated[existingIdx].role
        };
      } else {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 12);

        const newEntry: UserProfile = {
          uid: newUser.uid || 'cust-' + Date.now(),
          email: newUser.email,
          name: newUser.name || newUser.email.split('@')[0],
          password: newUser.password || '',
          phone: newUser.phone || '',
          institution: newUser.institution || '',
          licenseNumber: newUser.licenseNumber || '',
          notes: newUser.notes || '',
          role: newUser.role || 'free',
          subscriptionPlan: newUser.subscriptionPlan || 'Pemula',
          subscriptionStatus: newUser.subscriptionStatus || 'active',
          maxDrugsOverride: 99,
          canExportPdf: false,
          canAccessRenal: false,
          canAccessPolypharmacy: false,
          expiresAt: newUser.expiresAt || expiryDate.toISOString(),
          createdAt: newUser.createdAt || new Date().toISOString()
        };
        updated = [newEntry, ...prev];
      }

      try {
        localStorage.setItem('farmasi_customer_subscriptions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleUpdateCustomers = (updated: UserProfile[]) => {
    setCustomerList(updated);
    try {
      localStorage.setItem('farmasi_customer_subscriptions', JSON.stringify(updated));
    } catch (e) {}
    // Sync each customer to Firestore
    updated.forEach((c) => {
      if (c.uid) {
        saveUserProfileToFirestore(c).catch(() => {});
      }
    });
  };

  const [historyRecords, setHistoryRecords] = useState<InteractionCheckRecord[]>(() => {
    try {
      const saved = localStorage.getItem('farmasi_history_records');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Modals & Selections
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [showAntigravityUpdateModal, setShowAntigravityUpdateModal] = useState<boolean>(false);
  const [selectedDrugForDetail, setSelectedDrugForDetail] = useState<Drug | null>(null);
  const [preselectedDrugName, setPreselectedDrugName] = useState<string>('');
  const [preselectedDrugNames, setPreselectedDrugNames] = useState<string[]>([]);
  const [preselectedPioDrug, setPreselectedPioDrug] = useState<Drug | null>(null);
  const [searchQueryForDirectory, setSearchQueryForDirectory] = useState<string>('');
  const [reportModalData, setReportModalData] = useState<{
    selectedDrugs: Drug[];
    interactions: DrugInteraction[];
  } | null>(null);

  const handleAddToPioCard = (drug: Drug) => {
    setPreselectedPioDrug(drug);
    handleSelectTab('whatsapp-pio');
  };

  const isProUser = Boolean(
    currentUser?.role === 'admin' ||
    (currentUser?.subscriptionPlan === 'Pro' && currentUser?.subscriptionStatus === 'active')
  );

  // Sync currentUser & activeTab to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('farmasi_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.setItem('farmasi_current_user', 'null_session');
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('farmasi_active_tab', activeTab);
    }
  }, [activeTab]);

  // Sync datasets to localStorage for offline / demo mode persistence
  useEffect(() => {
    try {
      localStorage.setItem('farmasi_custom_drugs', JSON.stringify(drugs));
    } catch (e) {}
  }, [drugs]);

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_custom_interactions', JSON.stringify(interactions));
    } catch (e) {}
  }, [interactions]);

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_food_interactions', JSON.stringify(foodInteractions));
    } catch (e) {}
  }, [foodInteractions]);

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_duplication_rules', JSON.stringify(duplicationRules));
    } catch (e) {}
  }, [duplicationRules]);

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {}
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_admin_users', JSON.stringify(adminUsers));
    } catch (e) {}
  }, [adminUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('farmasi_clinic_branding', JSON.stringify(clinicBranding));
    } catch (e) {}
  }, [clinicBranding]);

  // Load Firestore data on mount
  useEffect(() => {
    async function loadData() {
      try {
        await seedFirestoreIfEmpty();
        const firestoreDrugs = await fetchAllDrugs();
        if (firestoreDrugs.length > 0) {
          setDrugs(firestoreDrugs);
        }
        const firestoreInteractions = await fetchAllInteractions();
        if (firestoreInteractions.length > 0) {
          setInteractions(firestoreInteractions);
        }
      } catch (err) {
        console.warn('Initializing with default datasets:', err);
      }
    }
    loadData();
  }, []);

  // Fetch history when user changes
  useEffect(() => {
    if (currentUser?.uid) {
      fetchUserHistory(currentUser.uid).then((records) => {
        setHistoryRecords(records);
      });
    } else {
      setHistoryRecords([]);
    }
  }, [currentUser]);

  // Protective guard: if not logged in or non-admin on restricted tab, redirect to landing
  useEffect(() => {
    if (!currentUser) {
      const savedUser = localStorage.getItem('farmasi_current_user');
      if (!savedUser || savedUser === 'null_session') {
        if (activeTab === 'dashboard' || activeTab === 'admin' || activeTab.startsWith('admin-')) {
          setActiveTab('landing');
          localStorage.setItem('farmasi_active_tab', 'landing');
        }
      }
    } else if (currentUser && currentUser.role !== 'admin' && (activeTab === 'admin' || activeTab.startsWith('admin-'))) {
      setActiveTab('dashboard');
      localStorage.setItem('farmasi_active_tab', 'dashboard');
    }
  }, [currentUser, activeTab]);

  // Handlers
  const handleSelectTab = (tab: string) => {
    if (tab === 'pricing') {
      if (activeTab === 'landing') {
        const pricingElem = document.getElementById('pricing-section');
        if (pricingElem) {
          pricingElem.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      setShowPricingModal(true);
      return;
    }

    // Enforce auth requirement for all internal clinical workspace tools when user is not logged in
    if (!currentUser && tab !== 'landing') {
      setShowAuthModal(true);
      return;
    }

    if ((tab === 'admin' || tab.startsWith('admin-')) && currentUser?.role !== 'admin') {
      setShowAuthModal(true);
      return;
    }

    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDrugDetailByName = (drugName: string) => {
    if (!drugName) return;
    const q = drugName.toLowerCase().trim();
    const found = drugs.find(d => 
      d.name.toLowerCase() === q ||
      d.genericName.toLowerCase() === q ||
      d.name.toLowerCase().includes(q) ||
      d.genericName.toLowerCase().includes(q) ||
      d.brandNames?.some(b => b.toLowerCase() === q)
    );
    if (found) {
      setSelectedDrugForDetail(found);
    }
  };

  const handleHeroSearchDrug = (query: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setSearchQueryForDirectory(query);
    setActiveTab('drugs');
  };

  const handleCheckInteractionWith = (targetDrugName: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setPreselectedDrugName(targetDrugName);
    setActiveTab('interactions');
  };

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        const email = firebaseUser.email.toLowerCase();
        const isAdmin = email === 'admin@farmasidruggist.com' || 
                        email.includes('admin') || 
                        INITIAL_ADMIN_USERS.some(a => a.email && a.email.toLowerCase() === email);

        // Block unverified email users from automatic dashboard entry (except administrators)
        if (!isAdmin && !firebaseUser.emailVerified) {
          try {
            await logoutUser();
          } catch (e) {}
          setCurrentUser((prev) => (prev && prev.email.toLowerCase() === email ? null : prev));
          return;
        }

        let profile = await getUserProfileFromFirestore(firebaseUser.uid);
        if (!profile) {
          const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);

          profile = {
            uid: firebaseUser.uid,
            email: email,
            name: firebaseUser.displayName || email.split('@')[0] || 'User',
            role: isAdmin ? 'admin' : 'free',
            subscriptionPlan: isAdmin ? 'Pro' : 'Pemula',
            subscriptionStatus: 'active',
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
            expiresAt: expiryDate.toISOString()
          };
          await saveUserProfileToFirestore(profile);
        } else if (isAdmin && profile.role !== 'admin') {
          profile = {
            ...profile,
            role: 'admin',
            subscriptionPlan: 'Pro',
            subscriptionStatus: 'active',
            isEmailVerified: true
          };
          await saveUserProfileToFirestore(profile);
        } else if (profile.subscriptionPlan === 'Klinik' || profile.subscriptionPlan === 'Elite') {
          profile = {
            ...profile,
            subscriptionPlan: 'Pro'
          };
          await saveUserProfileToFirestore(profile);
        }

        setCurrentUser(profile);
        localStorage.setItem('farmasi_current_user', JSON.stringify(profile));

        // Auto-navigate from landing to workspace/admin upon authentication
        setActiveTab((prevTab) => {
          if (prevTab === 'landing') {
            const nextTab = profile.role === 'admin' ? 'admin' : 'dashboard';
            localStorage.setItem('farmasi_active_tab', nextTab);
            return nextTab;
          }
          return prevTab;
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    const targetTab = user.role === 'admin' ? 'admin' : 'dashboard';
    setActiveTab(targetTab);
    localStorage.setItem('farmasi_current_user', JSON.stringify(user));
    localStorage.setItem('farmasi_active_tab', targetTab);
  };

  // Heartbeat Presence: update lastActiveAt & isOnline for currentUser
  useEffect(() => {
    if (!currentUser?.uid) return;
    const sendHeartbeat = () => {
      const now = new Date().toISOString();
      saveUserProfileToFirestore({
        ...currentUser,
        lastActiveAt: now,
        isOnline: true
      }).catch(() => {});
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendHeartbeat();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    if (currentUser?.uid) {
      saveUserProfileToFirestore({
        ...currentUser,
        isOnline: false,
        lastActiveAt: new Date().toISOString()
      }).catch(() => {});
    }
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setCurrentUser(null);
    setActiveTab('landing');
    setShowAuthModal(true);
    localStorage.setItem('farmasi_current_user', 'null_session');
    localStorage.setItem('farmasi_active_tab', 'landing');
  };

  const handleSubscribeSuccess = (planName: 'Pro' | string) => {
    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        subscriptionPlan: planName,
        subscriptionStatus: 'active'
      };
      setCurrentUser(updatedUser);
      handleRegisterOrSyncCustomer(updatedUser);
    }
    setShowPricingModal(false);
  };

  const handleSaveHistoryRecord = async (
    drugNames: string[],
    interactionCount: number,
    highestSeverity: SeverityLevel | 'None'
  ) => {
    if (!currentUser) return;

    const newRecord: Omit<InteractionCheckRecord, 'id'> = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      drugs: drugNames,
      timestamp: new Date().toISOString(),
      interactionCount,
      highestSeverity
    };

    const docId = await saveInteractionCheckHistory(newRecord);
    const fullRecord: InteractionCheckRecord = { id: docId, ...newRecord };

    setHistoryRecords((prev) => {
      const updated = [fullRecord, ...prev];
      try {
        localStorage.setItem('farmasi_history_records', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handlePrintHistoryReport = (record: InteractionCheckRecord) => {
    const matchedDrugs: Drug[] = record.drugs.map((dName, idx) => {
      const found = drugs.find(
        (d) =>
          d.name.toLowerCase() === dName.toLowerCase() ||
          (d.genericName && d.genericName.toLowerCase() === dName.toLowerCase())
      );
      if (found) return found;
      return {
        id: 'hist-' + idx,
        name: dName,
        genericName: dName,
        brandNames: [],
        atcCode: '-',
        category: 'Resep Pasien',
        dosage: '-',
        indication: '-',
        mechanism: '-'
      };
    });

    const matchedInteractions: DrugInteraction[] = [];
    for (let i = 0; i < matchedDrugs.length; i++) {
      for (let j = i + 1; j < matchedDrugs.length; j++) {
        const pair = resolveInteractionPair(matchedDrugs[i], matchedDrugs[j], interactions);
        if (pair) matchedInteractions.push(pair);
      }
    }

    setReportModalData({
      selectedDrugs: matchedDrugs,
      interactions: matchedInteractions
    });
  };

  const handleSendWhatsappHistory = (record: InteractionCheckRecord) => {
    const firstDrug = drugs.find((d) =>
      record.drugs.some((rd) => rd.toLowerCase() === d.name.toLowerCase())
    );
    if (firstDrug) {
      setPreselectedPioDrug(firstDrug);
    }
    handleSelectTab('whatsapp');
  };

  const handleUpdateHistoryNotes = (recordId: string, notes: string) => {
    setHistoryRecords((prev) => {
      const updated = prev.map((r) => (r.id === recordId ? { ...r, notes } : r));
      try {
        localStorage.setItem('farmasi_history_records', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleDeleteHistoryRecord = (recordId: string) => {
    setHistoryRecords((prev) => {
      const updated = prev.filter((r) => r.id !== recordId);
      try {
        localStorage.setItem('farmasi_history_records', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearAllHistoryRecords = () => {
    setHistoryRecords([]);
    try {
      localStorage.removeItem('farmasi_history_records');
    } catch (e) {}
  };

  const logAdminAction = (
    actionType: AuditActionType,
    targetEntity: 'Obat' | 'Interaksi DDInter' | 'Subskripsi Customer' | 'Tarif & Fitur' | 'Interaksi Makanan' | 'Duplikasi Terapi' | 'Sistem',
    summaryText: string,
    detailsObj?: any
  ) => {
    const newLog: SystemAuditLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      actorName: currentUser ? currentUser.name : 'System Admin',
      actorEmail: currentUser ? currentUser.email : 'admin@farmasidruggist.com',
      actionType,
      targetEntity,
      summaryText,
      detailsJson: detailsObj ? JSON.stringify(detailsObj, null, 2) : undefined,
      ipAddress: '180.252.112.45'
    };

    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdatePricingPlans = (updatedPlans: PricingPlan[]) => {
    setPricingPlans(updatedPlans);
    logAdminAction('UPDATE', 'Tarif & Fitur', 'Memperbarui pengaturan tarif dan daftar fitur paket berlangganan.', updatedPlans);
  };

  const handleAdminSaveDrug = async (drug: Drug) => {
    await saveDrugToFirestore(drug);
    setDrugs((prev) => {
      const idx = prev.findIndex((d) => d.id === drug.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = drug;
        return updated;
      }
      return [drug, ...prev];
    });
    logAdminAction('UPDATE', 'Obat', `Menyimpan monografi obat "${drug.name}".`, drug);
  };

  const handleAdminDeleteDrug = async (drugId: string) => {
    const drugToDelete = drugs.find(d => d.id === drugId);
    await deleteDrugFromFirestore(drugId);
    setDrugs((prev) => prev.filter((d) => d.id !== drugId));
    logAdminAction('DELETE', 'Obat', `Menghapus obat "${drugToDelete?.name || drugId}" dari database.`, { drugId });
  };

  const handleAdminSaveInteraction = async (inter: DrugInteraction) => {
    await saveInteractionToFirestore(inter);
    setInteractions((prev) => [inter, ...prev]);
    logAdminAction('CREATE', 'Interaksi DDInter', `Menambahkan pasangan interaksi "${inter.drugAName} ⚡ ${inter.drugBName}".`, inter);
  };

  const handleSeedFirebase = async () => {
    await seedFirestoreIfEmpty();
    const firestoreDrugs = await fetchAllDrugs();
    setDrugs(firestoreDrugs);
    const firestoreInteractions = await fetchAllInteractions();
    setInteractions(firestoreInteractions);
    logAdminAction('SYNC', 'Sistem', 'Melakukan sinkronisasi massal basis data DDInter ke Cloud Firebase.');
  };

  const handleSaveFoodInteraction = async (dfi: DrugFoodInteraction) => {
    setFoodInteractions((prev) => {
      const idx = prev.findIndex(item => item.id === dfi.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = dfi;
        return updated;
      }
      return [dfi, ...prev];
    });
    logAdminAction('UPDATE', 'Interaksi Makanan', `Menyimpan interaksi obat-makanan "${dfi.drugName} ⚡ ${dfi.foodName}".`, dfi);
  };

  const handleDeleteFoodInteraction = async (id: string) => {
    const target = foodInteractions.find(f => f.id === id);
    setFoodInteractions((prev) => prev.filter(item => item.id !== id));
    logAdminAction('DELETE', 'Interaksi Makanan', `Menghapus interaksi obat-makanan "${target?.drugName || id}".`, { id });
  };

  const handleSaveDuplicationRule = async (rule: TherapeuticDuplication) => {
    setDuplicationRules((prev) => {
      const idx = prev.findIndex(item => item.id === rule.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = rule;
        return updated;
      }
      return [rule, ...prev];
    });
    logAdminAction('UPDATE', 'Duplikasi Terapi', `Menyimpan aturan duplikasi terapi "${rule.therapeuticClass}".`, rule);
  };

  const handleDeleteDuplicationRule = async (id: string) => {
    const target = duplicationRules.find(d => d.id === id);
    setDuplicationRules((prev) => prev.filter(item => item.id !== id));
    logAdminAction('DELETE', 'Duplikasi Terapi', `Menghapus aturan duplikasi "${target?.therapeuticClass || id}".`, { id });
  };

  const handleSaveAdminUser = (admin: AdminUser) => {
    setAdminUsers((prev) => {
      const idx = prev.findIndex(u => u.id === admin.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = admin;
        return updated;
      }
      return [admin, ...prev];
    });
    logAdminAction('UPDATE', 'Sistem', `Menyimpan data staf administrator "${admin.name}" (Peran: ${admin.roleType}).`, admin);
  };

  const handleDeleteAdminUser = (adminId: string) => {
    const target = adminUsers.find(u => u.id === adminId);
    setAdminUsers((prev) => prev.filter(u => u.id !== adminId));
    logAdminAction('DELETE', 'Sistem', `Menghapus akun staf administrator "${target?.name || adminId}".`, { adminId });
  };

  const handleSaveBranding = (updated: ClinicBrandingSettings) => {
    setClinicBranding(updated);
    logAdminAction('UPDATE', 'Sistem', `Memperbarui konfigurasi Kop Surat & Branding Instansi (${updated.clinicName}).`, updated);
  };

  const handleSavePaymentSettings = (updated: PaymentMethodSettings) => {
    setPaymentSettings(updated);
    localStorage.setItem('farmasi_payment_settings', JSON.stringify(updated));
    logAdminAction('UPDATE', 'Tarif & Fitur', `Memperbarui detail metode pembayaran QRIS, Rekening Bank, dan E-Wallet.`, updated);
  };

  const isLanding = activeTab === 'landing';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#051418] font-sans text-slate-800 dark:text-slate-100 flex flex-col md:flex-row selection:bg-teal-900 selection:text-teal-100 transition-colors duration-300">

      {/* Sidebar Navigation - Hanya untuk tab selain Landing Page */}
      {!isLanding && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleSelectTab}
          currentUser={currentUser}
          onOpenAuthModal={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          onOpenPricingModal={() => setShowPricingModal(true)}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />
      )}

      {/* Container Utama Aplikasi with Modern Clinical Obsidian & Clean Slate Theme */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50 dark:bg-[#090d16] relative overflow-x-clip transition-colors duration-200">
        
        {/* Subtle Ambient Glow Mesh Orbs matching Logo Palette */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#156d67]/5 dark:bg-[#156d67]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed top-1/3 right-10 w-80 h-80 bg-[#3dbfd1]/5 dark:bg-[#3dbfd1]/12 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-[#38b2a3]/5 dark:bg-[#2fa89b]/12 rounded-full blur-3xl pointer-events-none -z-10" />

        <Header
          activeTab={activeTab}
          setActiveTab={handleSelectTab}
          currentUser={currentUser}
          onOpenAuthModal={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          onOpenPricingModal={() => setShowPricingModal(true)}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <main className={`flex-1 ${isLanding ? '' : 'p-4 sm:p-6 lg:p-8'} print:p-0 print:m-0 print:w-full print:bg-white`}>
          {isLanding ? (
            <LandingPage
              drugs={drugs}
              interactions={interactions}
              onSelectTab={handleSelectTab}
              currentUser={currentUser}
              onOpenPricingModal={() => setShowPricingModal(true)}
              onOpenAuthModal={() => setShowAuthModal(true)}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  drugs={drugs}
                  interactions={interactions}
                  historyRecords={historyRecords}
                  currentUser={currentUser}
                  onSelectTab={handleSelectTab}
                  onSearchDrug={handleHeroSearchDrug}
                  onCheckInteractionWith={handleCheckInteractionWith}
                  onOpenPricingModal={() => setShowPricingModal(true)}
                />
              )}

              {(activeTab === 'drugs' || activeTab === 'directory') && (
                <DrugDirectory
                  drugs={drugs}
                  interactions={interactions}
                  currentUser={currentUser}
                  onSelectDrug={(drug) => setSelectedDrugForDetail(drug)}
                  onCheckInteractionWith={handleCheckInteractionWith}
                  onAddToPioCard={handleAddToPioCard}
                  initialSearchQuery={searchQueryForDirectory}
                />
              )}

              {activeTab === 'pregnancy' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Keamanan Obat Ibu Hamil & Menyusui (Pregnancy & Lactation Database)"
                    featureDescription="Akses komprehensif penapisan risiko teratogenik FDA PLLR per trimester, profil ekskresi ASI (Hale’s L1–L5 & RID %), deteksi obat teratogenik Kategori X, serta direktori terapi lini pertama yang aman."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <PregnancyLactationChecker
                    onSelectTab={handleSelectTab}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenDrugDetail={handleOpenDrugDetailByName}
                  />
                )
              )}

              {activeTab === 'drug-lab' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Interaksi Obat dengan Uji Laboratorium (Drug-Lab Interactions)"
                    featureDescription="Akses lengkap deteksi gangguan analit in vitro, pencegahan hasil positif/negatif palsu pemeriksaan biomarker kardiologi (Troponin), tiroid (TSH/FT4), fungsi ginjal (Kreatinin), glukosa strip & toksikologi narkoba urin."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <DrugLabInteractionChecker
                    onSelectTab={handleSelectTab}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                )
              )}

              {activeTab === 'bud' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Kalkulator Stabilitas & Beyond Use Date (BUD Racikan)"
                    featureDescription="Akses lengkap penetapan batas kadaluarsa sediaan racikan padat bebas air (puyer/kapsul), sirup oral berair, krim/gel topikal, sirup kering rekonstitusi, tetes mata multidose & minidose, serta injeksi steril berstandar USP <795>, <797> & Farmakope Indonesia VI."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <BeyondUseDateCalculator
                    onSelectTab={handleSelectTab}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                )
              )}

              {activeTab === 'herb-drug' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Interaksi Herbal & Obat Indonesia (Herb-Drug Interactions)"
                    featureDescription="Akses lengkap evaluasi penapisan interaksi sediaan Jamu, OHT & Fitofarmaka (Kunyit, Temulawak, Sambiloto, Bawang Putih, Ginkgo, Ginseng, Kumis Kucing, Daun Sirsak, Meniran) terhadap obat resep dokter, protokol penghentian pra-bedah & modul farmakologi herbal asli Indonesia."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <HerbDrugInteractionChecker
                    onSelectTab={handleSelectTab}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                )
              )}

              {activeTab === 'competency' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Pusat Belajar Uji Kompetensi Farmasi (UKMPPAI CBT, OSCE & UKTVF)"
                    featureDescription="Akses lengkap rangkuman 4 domain blueprint nasional KFN/IAI, bank soal kasus vignette interaktif, simulasi tryout CBT berwaktu, generator rumus hitungan cepat, dan panduan stasi OSCE."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <PharmacyCompetencyCenter
                    onSelectTab={handleSelectTab}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                )
              )}

              {activeTab === 'guidelines' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Database Panduan Terapi PNPK & Konsensus RI"
                    featureDescription="Akses lengkap 23+ pedoman nasional pelayanan kedokteran Kemenkes RI, algoritma terapi lini pertama & kedua, Formularium Nasional (FORNAS), dan pencegahan risiko interaksi."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <ClinicalTherapyGuidelines
                    allDrugs={drugs}
                    onSelectDrugForDetail={(drug) => setSelectedDrugForDetail(drug)}
                    onCheckInteractionsWithRegimen={(drugNames) => {
                      setPreselectedDrugNames(drugNames);
                      setPreselectedDrugName(drugNames[0] || '');
                      handleSelectTab('interactions');
                    }}
                    clinicBranding={clinicBranding}
                  />
                )
              )}

              {activeTab === 'polypharmacy' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Evaluasi Skrining Resep & Polifarmasi Klinis"
                    featureDescription="Analisis otomatis interaksi kompleks multi-obat, skrining potensi duplikasi terapi farmakologis, serta pencegahan efek samping polifarmasi pasien."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <ClinicalPolypharmacyEvaluator
                    allDrugs={drugs}
                    allInteractions={interactions}
                    foodInteractions={foodInteractions}
                    duplicationRules={duplicationRules}
                    clinicBranding={clinicBranding}
                    onSelectTab={handleSelectTab}
                  />
                )
              )}

              {activeTab === 'interactions' && (
                <InteractionChecker
                  drugs={drugs}
                  interactions={interactions}
                  currentUser={currentUser}
                  pricingPlans={pricingPlans}
                  onSaveHistory={handleSaveHistoryRecord}
                  onOpenPricingModal={() => setShowPricingModal(true)}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onOpenReportModal={(selectedDrugs, matchedInteractions) =>
                    setReportModalData({ selectedDrugs, interactions: matchedInteractions })
                  }
                  preselectedDrugName={preselectedDrugName}
                  preselectedDrugNames={preselectedDrugNames}
                />
              )}

              {activeTab === 'side-effects' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Pusat Analisis Efek Samping Obat & Instrumen Farmakovigilans (MESO)"
                    featureDescription="Evaluasi akumulasi beban toksisitas organ (Hepatotoksik, Nefrotoksik, Kardiotoksik, dll.), pelacak gejala KTD, algoritma kausalitas Naranjo & WHO-UMC, tingkat keparahan Hartwig, serta generator formulir kuning MESO BPOM."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <SideEffectChecker
                    allDrugs={drugs}
                    clinicBranding={clinicBranding}
                    onSelectTab={handleSelectTab}
                    isProUser={isProUser}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                )
              )}

              {activeTab === 'usage' && (
                <MedicationUsageGuide
                  clinicBranding={clinicBranding}
                  onSelectTab={handleSelectTab}
                />
              )}

              {activeTab === 'sop' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Modul Standar Operasional Prosedur (SOP) Farmasi Klinis"
                    featureDescription="Koleksi SOP resmi pelayanan kefarmasian di apotek dan klinik: penapisan resep, penyerahan obat (dispensing), konseling PIO, dan pelaporan MESO."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <PharmacySopManager
                    clinicBranding={clinicBranding}
                  />
                )
              )}

              {activeTab === 'regulations' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Database Regulasi & Standar Hukum Kefarmasian RI"
                    featureDescription="Kompilasi undang-undang, Permenkes, dan standar akreditasi fasilitas pelayanan kefarmasian terkini di Indonesia."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <PharmacyRegulationsManager
                    clinicBranding={clinicBranding}
                  />
                )
              )}

              {activeTab === 'literature' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Pusat Literatur Klinis, Matriks Bukti & Basis Ilmiah EBM"
                    featureDescription="Akses komprehensif kepustakaan farmakologi klinis terakreditasi, basis data Evidence-Based Medicine (EBM), jurnal pedoman internasional, serta matriks pembuktian ilmiah untuk setiap parameter klinis obat."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <ClinicalLiterature
                    onSelectTab={handleSelectTab}
                  />
                )
              )}

              {activeTab === 'whatsapp-pio' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Kartu PIO Pasien Siap Kirim via WhatsApp"
                    featureDescription="Buat kartu edukasi aturan pakai obat digital, pantangan makanan, dan instruksi penyimpanan, lalu kirim langsung ke WhatsApp pasien hanya dengan 1 kali klik."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <WhatsAppPatientCardManager
                    clinicBranding={clinicBranding}
                    drugs={drugs}
                    onSelectDrugForDetail={(drug) => setSelectedDrugForDetail(drug)}
                    preselectedDrug={preselectedPioDrug}
                  />
                )
              )}

              {activeTab === 'iv-compatibility' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Uji Kompatibilitas Injeksi IV, Y-Site & Stabilitas Rekonstitusi"
                    featureDescription="Evaluasi kompatibilitas percabangan jalur infus bersama (Y-Site Co-Infusion), skrining presipitasi asam-basa, kompatibilitas pelarut infus (NS, D5W, RL), stabilitas BUD, dan titrasi syringe pump."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <IvCompatibilityChecker
                    onSelectTab={handleSelectTab}
                  />
                )
              )}

              {activeTab === 'pediatric' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Kalkulator Dosis Pediatrik & Konversi Racikan Puyer / Sirup"
                    featureDescription="Hitung dosis terapi anak berbasis BB & BSA, konversi peracikan tablet utuh ke serbuk puyer dengan perhitungan zat pengisi Saccharum Lactis, dan takaran botol sirup."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <PediatricCompoundingCalculator
                    existingDrugs={drugs}
                    onCheckInteractions={(drugNames) => {
                      setPreselectedDrugNames(drugNames);
                      handleSelectTab('interactions');
                    }}
                  />
                )
              )}

              {activeTab === 'renal-adjuster' && (
                !isProUser ? (
                  <ProFeatureGate
                    featureTitle="Kalkulator Medis & Penyesuaian Dosis"
                    featureDescription="Kalkulator farmakoterapi komprehensif: Klirens Ginjal (CrCl/eGFR), Skor Hepar (Child-Pugh & MELD), Konversi Opioid & Paliatif (OME CDC), Berat Badan Ideal (IBW), dan Oksigen Medis."
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                    isLoggedIn={Boolean(currentUser)}
                  />
                ) : (
                  <RenalDoseAdjuster
                    drugs={drugs}
                    currentUser={currentUser}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                )
              )}

              {activeTab === 'history' && (
                <HistoryList
                  historyRecords={historyRecords}
                  currentUser={currentUser}
                  onOpenPricingModal={() => setShowPricingModal(true)}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onRecheckRecord={(record) => {
                    setPreselectedDrugNames(record.drugs);
                    setPreselectedDrugName(record.drugs[0] || '');
                    handleSelectTab('interactions');
                  }}
                  onPrintReport={handlePrintHistoryReport}
                  onSendWhatsapp={handleSendWhatsappHistory}
                  onUpdateRecordNotes={handleUpdateHistoryNotes}
                  onDeleteRecord={handleDeleteHistoryRecord}
                  onClearAllRecords={handleClearAllHistoryRecords}
                />
              )}

              {(activeTab === 'admin' || activeTab.startsWith('admin-')) && (
                <AdminPanel
                  drugs={drugs}
                  interactions={interactions}
                  currentUser={currentUser}
                  pricingPlans={pricingPlans}
                  paymentSettings={paymentSettings}
                  foodInteractions={foodInteractions}
                  duplicationRules={duplicationRules}
                  auditLogs={auditLogs}
                  adminUsers={adminUsers}
                  customers={customerList}
                  onUpdateCustomers={handleUpdateCustomers}
                  initialSubTab={
                    activeTab === 'admin-interactions' ? 'interactions' :
                    activeTab === 'admin-firebase' ? 'firebase-sync' :
                    activeTab === 'admin-editor' ? 'advanced-editor' :
                    activeTab === 'admin-pricing' ? 'pricing-settings' :
                    activeTab === 'admin-users' ? 'team-admin' :
                    activeTab === 'admin-logs' ? 'audit-log' :
                    activeTab === 'admin-subscriptions' ? 'customers' : 'firebase-sync'
                  }
                  onSaveDrug={handleAdminSaveDrug}
                  onDeleteDrug={handleAdminDeleteDrug}
                  onSaveInteraction={handleAdminSaveInteraction}
                  onSeedFirebase={handleSeedFirebase}
                  onUpdatePricingPlans={handleUpdatePricingPlans}
                  onSavePaymentSettings={handleSavePaymentSettings}
                  onSaveFoodInteraction={handleSaveFoodInteraction}
                  onDeleteFoodInteraction={handleDeleteFoodInteraction}
                  onSaveDuplicationRule={handleSaveDuplicationRule}
                  onDeleteDuplicationRule={handleDeleteDuplicationRule}
                  onSaveAdminUser={handleSaveAdminUser}
                  onDeleteAdminUser={handleDeleteAdminUser}
                />
              )}

              {activeTab === 'subscriptions' && (
                <CustomerSubscriptionManager
                  currentUser={currentUser}
                  customers={customerList}
                  onUpdateCustomers={handleUpdateCustomers}
                />
              )}

              {/* Safe Fallback for unrecognized tab or stale localStorage */}
              {![
                'landing', 'dashboard', 'drugs', 'directory', 'pregnancy', 'drug-lab', 'bud', 'herb-drug',
                'competency', 'guidelines', 'polypharmacy', 'interactions', 'side-effects', 'usage',
                'sop', 'regulations', 'literature', 'whatsapp-pio', 'iv-compatibility', 'pediatric',
                'renal-adjuster', 'history', 'subscriptions'
              ].includes(activeTab) && !activeTab.startsWith('admin') && (
                currentUser ? (
                  <Dashboard
                    drugs={drugs}
                    interactions={interactions}
                    historyRecords={historyRecords}
                    currentUser={currentUser}
                    onSelectTab={handleSelectTab}
                    onSearchDrug={handleHeroSearchDrug}
                    onCheckInteractionWith={handleCheckInteractionWith}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                  />
                ) : (
                  <LandingPage
                    drugs={drugs}
                    interactions={interactions}
                    onSelectTab={handleSelectTab}
                    currentUser={currentUser}
                    onOpenPricingModal={() => setShowPricingModal(true)}
                    onOpenAuthModal={() => setShowAuthModal(true)}
                  />
                )
              )}
            </>
          )}
        </main>

        {/* Footer Hanya Tampil di Landing Page */}
        {isLanding && <Footer onSelectTab={handleSelectTab} />}
      </div>

      {/* MODALS */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          onNewAccountCreated={handleRegisterOrSyncCustomer}
        />
      )}

      {showPricingModal && (
        <PricingModal
          onClose={() => setShowPricingModal(false)}
          currentUser={currentUser}
          pricingPlans={pricingPlans}
          paymentSettings={paymentSettings}
          onSubscribeSuccess={handleSubscribeSuccess}
          onOpenAuthModal={() => setShowAuthModal(true)}
        />
      )}

      {selectedDrugForDetail && (
        <DrugDetailModal
          drug={selectedDrugForDetail}
          allInteractions={interactions}
          allDrugs={drugs}
          onClose={() => setSelectedDrugForDetail(null)}
          onCheckInteractionWith={handleCheckInteractionWith}
          onAddToPioCard={handleAddToPioCard}
          onOpenPregnancyChecker={(drugName) => {
            setSelectedDrugForDetail(null);
            handleSelectTab('pregnancy');
          }}
        />
      )}

      {reportModalData && (
        <InteractionReportModal
          selectedDrugs={reportModalData.selectedDrugs}
          interactions={reportModalData.interactions}
          clinicBranding={clinicBranding}
          onClose={() => setReportModalData(null)}
        />
      )}

    </div>
  );
}
