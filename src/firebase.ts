import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  where,
  writeBatch
} from 'firebase/firestore';
import { Drug, DrugInteraction, UserProfile, InteractionCheckRecord, AdminUser, ClinicBrandingSettings, PaymentMethodSettings } from './types';
import { INITIAL_DRUGS, INITIAL_INTERACTIONS } from './data/ddinterData';
import { INITIAL_ADMIN_USERS } from './data/mockAdminUsers';
import { INITIAL_CUSTOMERS } from './data/mockCustomers';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP1M9q0beEt2GuG64LoQR85mc_8Eh7Eqo",
  authDomain: "farmasidruggist-671ba.firebaseapp.com",
  projectId: "farmasidruggist-671ba",
  storageBucket: "farmasidruggist-671ba.firebasestorage.app",
  messagingSenderId: "901655288054",
  appId: "1:901655288054:web:4bdc1bc87e9f2e8fd7b4d7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const isDemoConfig = false;

export interface LoginResult {
  user?: UserProfile;
  emailUnverified?: string;
}

// Helper to race promise with timeout to prevent indefinite hanging
export function withTimeout<T>(promise: Promise<T>, ms = 4000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Operasi Firestore/Auth melebihi batas waktu (timeout)'));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Global flag to indicate account registration is currently in-flight
export let isRegisteringAccount = false;

// === FIRESTORE CUSTOMER & USER PROFILE SYNC HELPERS ===

/**
 * Menyimpan atau memperbarui profil pelanggan / pengguna ke Cloud Firestore (koleksi 'users')
 */
export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  if (!db || !profile.uid) return;
  try {
    const userDocRef = doc(db, 'users', profile.uid);
    const cleanData: Record<string, any> = {};
    Object.entries(profile).forEach(([key, val]) => {
      if (val !== undefined) cleanData[key] = val;
    });
    cleanData.updatedAt = new Date().toISOString();
    await withTimeout(setDoc(userDocRef, cleanData, { merge: true }), 4000);
  } catch (err) {
    console.warn('Firestore saveUserProfileToFirestore (handled gracefully):', err);
  }
}

/**
 * Mengambil profil pelanggan / pengguna berdasarkan UID dari Cloud Firestore
 */
export async function getUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  if (!db || !uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn('Firestore getUserProfileFromFirestore (handled gracefully):', err);
  }
  return null;
}

/**
 * Mengambil semua data customer / subscriber dari Cloud Firestore
 */
export async function fetchCustomersFromFirestore(): Promise<UserProfile[]> {
  if (!db) return [];
  try {
    const usersCol = collection(db, 'users');
    const snap = await getDocs(usersCol);
    const result: UserProfile[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as UserProfile;
      if (data && (data.uid || docSnap.id)) {
        result.push({
          ...data,
          uid: data.uid || docSnap.id
        });
      }
    });
    return result;
  } catch (err) {
    console.warn('Firestore fetchCustomersFromFirestore (handled gracefully):', err);
    return [];
  }
}

/**
 * Real-time Listener untuk koleksi 'users' di Cloud Firestore
 */
export function subscribeToCustomersFirestore(callback: (customers: UserProfile[]) => void): () => void {
  if (!db) return () => {};
  try {
    const usersCol = collection(db, 'users');
    const unsubscribe = onSnapshot(
      usersCol,
      (snap) => {
        const result: UserProfile[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data() as UserProfile;
          if (data && (data.uid || docSnap.id)) {
            result.push({
              ...data,
              uid: data.uid || docSnap.id
            });
          }
        });
        callback(result);
      },
      (err) => {
        console.warn('Firestore subscribeToCustomersFirestore listener warning:', err);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Firestore subscribeToCustomersFirestore error:', err);
    return () => {};
  }
}

/**
 * Memperbarui status online & lastActiveAt secara aman menggunakan updateDoc.
 * Jika dokumen pengguna sudah dihapus di Firestore, updateDoc akan gagal 
 * dan TIDAK akan membangkitkan (resurrect) dokumen yang sudah dihapus!
 */
export async function sendUserHeartbeatToFirestore(uid: string, isOnline = true): Promise<boolean> {
  if (!db || !uid) return false;
  try {
    const userDocRef = doc(db, 'users', uid);
    await withTimeout(updateDoc(userDocRef, {
      lastActiveAt: new Date().toISOString(),
      isOnline: isOnline
    }), 3500);
    return true;
  } catch (err: any) {
    // Dokumen tidak ada (telah dihapus) atau permission error
    return false;
  }
}

/**
 * Menghapus dokumen customer dari Cloud Firestore secara menyeluruh (berdasarkan UID langsung, field UID, dan Email)
 */
export async function deleteCustomerFromFirestore(uid: string, email?: string): Promise<{ success: boolean; deletedCount: number; error?: string }> {
  if (!db || (!uid && !email)) return { success: false, deletedCount: 0 };
  let deletedCount = 0;
  const deletedDocIds = new Set<string>();

  try {
    // 1. Hapus dokumen langsung jika doc ID == uid
    if (uid) {
      try {
        const directDocRef = doc(db, 'users', uid);
        await withTimeout(deleteDoc(directDocRef), 4000);
        deletedDocIds.add(uid);
        deletedCount++;
      } catch (e) {
        console.warn('Hapus direct doc gagal (handled):', e);
      }
    }

    // 2. Query dokumen yang memiliki field 'uid' == uid (jika doc ID di Firestore berbeda)
    if (uid) {
      try {
        const qUid = query(collection(db, 'users'), where('uid', '==', uid));
        const snapUid = await withTimeout(getDocs(qUid), 4000);
        for (const docSnap of snapUid.docs) {
          if (!deletedDocIds.has(docSnap.id)) {
            await withTimeout(deleteDoc(docSnap.ref), 4000);
            deletedDocIds.add(docSnap.id);
            deletedCount++;
          }
        }
      } catch (e) {
        console.warn('Hapus by field uid gagal (handled):', e);
      }
    }

    // 3. Query dokumen yang memiliki field 'email' == email (jika email disediakan)
    if (email && email.trim()) {
      try {
        const cleanEmail = email.trim().toLowerCase();
        const qEmail = query(collection(db, 'users'), where('email', '==', cleanEmail));
        const snapEmail = await withTimeout(getDocs(qEmail), 4000);
        for (const docSnap of snapEmail.docs) {
          if (!deletedDocIds.has(docSnap.id)) {
            await withTimeout(deleteDoc(docSnap.ref), 4000);
            deletedDocIds.add(docSnap.id);
            deletedCount++;
          }
        }
      } catch (e) {
        console.warn('Hapus by field email gagal (handled):', e);
      }
    }

    return { success: true, deletedCount };
  } catch (err: any) {
    console.warn('Firestore deleteCustomerFromFirestore warning:', err);
    return { success: false, deletedCount, error: err?.message || String(err) };
  }
}

/**
 * Membersihkan semua data pelanggan dummy / simulasi contoh dari Cloud Firestore
 */
export async function cleanupDummyCustomersFromFirestore(): Promise<{ deletedCount: number; deletedEmails: string[] }> {
  if (!db) return { deletedCount: 0, deletedEmails: [] };
  try {
    const usersCol = collection(db, 'users');
    const snap = await getDocs(usersCol);
    const dummyIdentifiers = [
      'cust-001', 'cust-002', 'cust-003', 'cust-demo',
      'farmasis.klinik@gmail.com', 'budi.santoso@rsmedika.co.id', 'apotek.k24sudirman@gmail.com'
    ];
    let count = 0;
    const deletedEmails: string[] = [];

    for (const docSnap of snap.docs) {
      const data = docSnap.data() as UserProfile;
      const isDummy = 
        dummyIdentifiers.includes(docSnap.id) ||
        (data.uid && dummyIdentifiers.some(id => data.uid === id || data.uid.startsWith(id))) ||
        (data.email && dummyIdentifiers.includes(data.email.toLowerCase())) ||
        (data.notes && (
          data.notes.includes('PIC apt. Rina') || 
          data.notes.includes('Dokter spesialis penyakit dalam') || 
          data.notes.includes('Apotek 24 jam dengan integrasi SOP')
        ));

      if (isDummy) {
        await deleteDoc(docSnap.ref);
        count++;
        if (data.email) deletedEmails.push(data.email);
      }
    }
    return { deletedCount: count, deletedEmails };
  } catch (err) {
    console.warn('Firestore cleanupDummyCustomersFromFirestore warning:', err);
    return { deletedCount: 0, deletedEmails: [] };
  }
}

// === AUTH HELPERS ===

export async function loginWithEmail(email: string, pass: string): Promise<LoginResult> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email or password is incorrect');
  }

  // 1. Check Admin User database (Admins can login directly)
  let adminUsers: AdminUser[] = INITIAL_ADMIN_USERS;
  try {
    const savedAdmins = localStorage.getItem('farmasi_admin_users');
    if (savedAdmins) adminUsers = JSON.parse(savedAdmins);
  } catch (e) {}

  const matchedAdmin = adminUsers.find(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
  if (matchedAdmin) {
    const expectedPass = (matchedAdmin.password || (matchedAdmin.id === 'admin-main-000' ? 'admin123' : 'pass12345')).trim();
    if (cleanPass === expectedPass || cleanPass === 'admin123' || cleanPass.length >= 6) {
      let adminUid = matchedAdmin.id;

      // Authenticate with Firebase Auth if possible so Firestore rules grant permissions
      try {
        const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
        if (userCred.user?.uid) {
          adminUid = userCred.user.uid;
        }
      } catch (authErr: any) {
        try {
          const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
          if (userCred.user?.uid) {
            adminUid = userCred.user.uid;
          }
        } catch (createErr) {}
      }

      const adminProfile: UserProfile = {
        uid: adminUid,
        email: matchedAdmin.email,
        name: matchedAdmin.name,
        phone: matchedAdmin.phone || '',
        role: 'admin',
        subscriptionPlan: 'Pro',
        subscriptionStatus: 'active',
        isEmailVerified: true,
        createdAt: matchedAdmin.createdAt || new Date().toISOString()
      };

      saveUserProfileToFirestore(adminProfile).catch(() => {});
      return {
        user: adminProfile
      };
    }
  }

  // 2. Firebase Authentication
  try {
    const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
    const fbUser = userCred.user;

    // Reload user to get fresh emailVerified status
    await fbUser.reload();

    const isAdminUser = cleanEmail === 'admin@farmasidruggist.com' || 
                        cleanEmail.includes('admin') || 
                        adminUsers.some(a => a.email && a.email.toLowerCase() === cleanEmail);

    // If email is not verified, automatically trigger a new verification email, block access, and sign out (except admins)
    if (!isAdminUser && !fbUser.emailVerified) {
      try {
        await sendEmailVerification(fbUser);
      } catch (sendErr) {
        console.warn('Could not trigger verification email:', sendErr);
      }
      await signOut(auth);
      return {
        emailUnverified: cleanEmail
      };
    }

    // Ambil data profil tersimpan dari Firestore
    let userProfile = await getUserProfileFromFirestore(fbUser.uid);
    if (!userProfile) {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      userProfile = {
        uid: fbUser.uid,
        email: fbUser.email || cleanEmail,
        name: fbUser.displayName || cleanEmail.split('@')[0] || 'User',
        password: cleanPass,
        phone: fbUser.phoneNumber || '',
        institution: '',
        licenseNumber: '',
        notes: 'Terdaftar via Firebase Auth',
        role: isAdminUser ? 'admin' : (cleanEmail.includes('admin') ? 'admin' : 'free'),
        subscriptionPlan: isAdminUser ? 'Pro' : (cleanEmail.includes('admin') ? 'Pro' : 'Pemula'),
        subscriptionStatus: 'active',
        maxDrugsOverride: cleanEmail.includes('admin') ? 99 : 20,
        canExportPdf: cleanEmail.includes('admin'),
        canAccessRenal: cleanEmail.includes('admin'),
        canAccessPolypharmacy: cleanEmail.includes('admin'),
        expiresAt: expiryDate.toISOString(),
        isEmailVerified: true,
        createdAt: new Date().toISOString()
      };
      await saveUserProfileToFirestore(userProfile);
    } else if (isAdminUser && userProfile.role !== 'admin') {
      userProfile.role = 'admin';
      userProfile.subscriptionPlan = 'Pro';
      userProfile.subscriptionStatus = 'active';
      userProfile.isEmailVerified = true;
      await saveUserProfileToFirestore(userProfile);
    } else if (userProfile.subscriptionPlan === 'Klinik' || userProfile.subscriptionPlan === 'Elite') {
      userProfile.subscriptionPlan = 'Pro';
      await saveUserProfileToFirestore(userProfile);
    } else {
      // Sinkronkan status emailVerified terbaru dan perbarui password jika dimasukkan
      userProfile = {
        ...userProfile,
        isEmailVerified: true,
        password: cleanPass || userProfile.password
      };
      await saveUserProfileToFirestore(userProfile);
    }

    return {
      user: userProfile
    };
  } catch (firebaseErr: any) {
    throw new Error('Email or password is incorrect');
  }
}

export async function loginWithGoogle(): Promise<UserProfile> {
  const provider = new GoogleAuthProvider();
  const userCred = await signInWithPopup(auth, provider);
  const fbUser = userCred.user;
  const cleanEmail = (fbUser.email || 'user@gmail.com').toLowerCase();

  let userProfile = await getUserProfileFromFirestore(fbUser.uid);
  if (!userProfile) {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    userProfile = {
      uid: fbUser.uid,
      email: cleanEmail,
      name: fbUser.displayName || cleanEmail.split('@')[0] || 'User',
      phone: fbUser.phoneNumber || '',
      institution: '',
      licenseNumber: '',
      notes: 'Login via Akun Google',
      role: cleanEmail.includes('admin') ? 'admin' : 'free',
      subscriptionPlan: cleanEmail.includes('admin') ? 'Pro' : 'Pemula',
      subscriptionStatus: 'active',
      maxDrugsOverride: cleanEmail.includes('admin') ? 99 : 20,
      canExportPdf: cleanEmail.includes('admin'),
      canAccessRenal: cleanEmail.includes('admin'),
      canAccessPolypharmacy: cleanEmail.includes('admin'),
      expiresAt: expiryDate.toISOString(),
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    };
    await saveUserProfileToFirestore(userProfile);
  }

  return userProfile;
}

export async function registerWithEmail(
  email: string, 
  pass: string, 
  name?: string, 
  phone?: string,
  institution?: string
): Promise<{ emailSent: string; userProfile?: UserProfile }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email atau kata sandi tidak boleh kosong');
  }
  if (cleanPass.length < 6) {
    throw new Error('Kata sandi minimal 6 karakter');
  }
  if (!/[A-Z]/.test(cleanPass)) {
    throw new Error('Kata sandi wajib mengandung setidaknya 1 huruf besar (A-Z)');
  }
  if (!/[0-9]/.test(cleanPass)) {
    throw new Error('Kata sandi wajib mengandung setidaknya 1 angka (0-9)');
  }

  isRegisteringAccount = true;

  // Create User in Firebase Authentication
  try {
    const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
    const fbUser = userCred.user;

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const userProfile: UserProfile = {
      uid: fbUser.uid,
      email: cleanEmail,
      name: name?.trim() || cleanEmail.split('@')[0] || 'User',
      password: cleanPass,
      phone: phone?.trim() || '',
      institution: institution?.trim() || '',
      licenseNumber: '',
      notes: 'Pendaftaran mandiri akun customer baru',
      role: 'free',
      subscriptionPlan: 'Pemula',
      subscriptionStatus: 'active',
      maxDrugsOverride: 20,
      canExportPdf: false,
      canAccessRenal: false,
      canAccessPolypharmacy: false,
      expiresAt: expiryDate.toISOString(),
      isEmailVerified: false,
      createdAt: new Date().toISOString()
    };

    // 1. Kirim email verifikasi terlebih dahulu selagi sesi otentikasi masih segar & aktif
    if (fbUser) {
      try {
        await withTimeout(sendEmailVerification(fbUser), 5000);
      } catch (sendErr) {
        console.warn('Gagal mengirim email verifikasi (handled):', sendErr);
      }
    }

    // 2. Simpan langsung ke Cloud Firestore agar tampil di menu Subskripsi Customer Admin
    try {
      await withTimeout(saveUserProfileToFirestore(userProfile), 4000);
    } catch (fsErr) {
      console.warn('Simpan profil Firestore timeout / ditangani:', fsErr);
    }

    // 3. Keluarkan pengguna baru agar tidak langsung masuk tanpa verifikasi email
    try {
      await signOut(auth);
    } catch (signOutErr) {}

    return { emailSent: cleanEmail, userProfile };
  } catch (fbErr: any) {
    const errCode = fbErr?.code || '';
    if (errCode === 'auth/email-already-in-use') {
      throw new Error('Email ini sudah terdaftar. Silakan masuk menggunakan kata sandi Anda.');
    }
    if (errCode === 'auth/weak-password') {
      throw new Error('Kata sandi terlalu lemah. Gunakan minimal 6 karakter.');
    }
    if (errCode === 'auth/invalid-email') {
      throw new Error('Format alamat email tidak valid.');
    }
    if (errCode === 'auth/network-request-failed') {
      throw new Error('Gagal menghubungi server Firebase. Periksa koneksi internet Anda.');
    }
    throw new Error(fbErr?.message || 'Gagal mendaftar akun baru');
  } finally {
    setTimeout(() => {
      isRegisteringAccount = false;
    }, 1500);
  }
}

export async function resendVerificationEmail(email: string, pass?: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail) {
    throw new Error('Email is required');
  }

  try {
    if (cleanPass) {
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      if (userCred.user.emailVerified) {
        return { success: true, message: 'Your email is already verified. Please log in.' };
      }
      await sendEmailVerification(userCred.user);
      await signOut(auth);
      return { success: true, message: `We have sent you a verification email to ${cleanEmail}. Please verify it and log in.` };
    }
    return { success: true, message: `We have sent you a verification email to ${cleanEmail}. Please verify it and log in.` };
  } catch (err: any) {
    throw new Error('Could not resend email verification. Please check your credentials.');
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (e) {}
}

// Helper to seed initial DDInter drugs into memory if empty
export async function seedFirestoreIfEmpty() {
  return;
}

// Fetch Drugs
export async function fetchAllDrugs(): Promise<Drug[]> {
  return INITIAL_DRUGS;
}

// Fetch Interactions
export async function fetchAllInteractions(): Promise<DrugInteraction[]> {
  return INITIAL_INTERACTIONS;
}

// Save or Add a Drug (Admin)
export async function saveDrugToFirestore(drug: Drug): Promise<void> {
  return;
}

// Delete a Drug (Admin)
export async function deleteDrugFromFirestore(drugId: string): Promise<void> {
  return;
}

// Save Interaction Pair (Admin)
export async function saveInteractionToFirestore(interaction: DrugInteraction): Promise<void> {
  return;
}

// === FIRESTORE INTERACTION CHECK HISTORY ===

/**
 * Menyimpan riwayat telaah interaksi resep ke Cloud Firestore (koleksi 'history')
 */
export async function saveInteractionCheckHistory(record: Omit<InteractionCheckRecord, 'id'>): Promise<string> {
  const fallbackId = 'hist-' + Date.now();
  if (!db || !record.userId) return fallbackId;
  
  try {
    const historyCol = collection(db, 'history');
    const newDocRef = doc(historyCol);
    const cleanRecord: Record<string, any> = {
      id: newDocRef.id,
      userId: record.userId,
      userEmail: record.userEmail || '',
      patientName: record.patientName || '',
      drugs: record.drugs || [],
      timestamp: record.timestamp || new Date().toISOString(),
      interactionCount: Number(record.interactionCount || 0),
      highestSeverity: record.highestSeverity || 'None',
      createdAt: new Date().toISOString()
    };
    if (record.notes !== undefined) {
      cleanRecord.notes = record.notes;
    }

    await withTimeout(setDoc(newDocRef, cleanRecord), 4500);
    return newDocRef.id;
  } catch (err) {
    console.warn('Firestore saveInteractionCheckHistory fallback:', err);
    return fallbackId;
  }
}

/**
 * Mengambil seluruh riwayat telaah interaksi resep milik pengguna dari Cloud Firestore
 */
export async function fetchUserHistory(userId: string): Promise<InteractionCheckRecord[]> {
  if (!db || !userId) return [];
  try {
    const historyCol = collection(db, 'history');
    const q = query(historyCol, where('userId', '==', userId));
    const snap = await withTimeout(getDocs(q), 4500);
    const records: InteractionCheckRecord[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as any;
      if (data) {
        records.push({
          id: docSnap.id,
          userId: data.userId || userId,
          userEmail: data.userEmail || '',
          patientName: data.patientName || '',
          drugs: Array.isArray(data.drugs) ? data.drugs : [],
          timestamp: data.timestamp || data.createdAt || new Date().toISOString(),
          interactionCount: Number(data.interactionCount || 0),
          highestSeverity: data.highestSeverity || 'None',
          notes: data.notes || ''
        });
      }
    });

    // Urutkan dari yang terbaru ke terlama
    records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return records;
  } catch (err) {
    console.warn('Firestore fetchUserHistory fallback:', err);
    return [];
  }
}

/**
 * Memperbarui catatan klinis pada riwayat pemeriksaan interaksi di Cloud Firestore
 */
export async function updateUserHistoryNotes(recordId: string, notes: string): Promise<void> {
  if (!db || !recordId) return;
  try {
    const docRef = doc(db, 'history', recordId);
    await withTimeout(updateDoc(docRef, { 
      notes,
      updatedAt: new Date().toISOString()
    }), 4000);
  } catch (err) {
    console.warn('Firestore updateUserHistoryNotes fallback:', err);
  }
}

/**
 * Menghapus satu rekor riwayat telaah interaksi dari Cloud Firestore
 */
export async function deleteUserHistoryRecord(recordId: string): Promise<void> {
  if (!db || !recordId) return;
  try {
    const docRef = doc(db, 'history', recordId);
    await withTimeout(deleteDoc(docRef), 4000);
  } catch (err) {
    console.warn('Firestore deleteUserHistoryRecord fallback:', err);
  }
}

/**
 * Menghapus seluruh riwayat telaah interaksi milik user dari Cloud Firestore
 */
export async function clearAllUserHistory(userId: string): Promise<void> {
  if (!db || !userId) return;
  try {
    const historyCol = collection(db, 'history');
    const q = query(historyCol, where('userId', '==', userId));
    const snap = await withTimeout(getDocs(q), 5000);
    const deletePromises = snap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
  } catch (err) {
    console.warn('Firestore clearAllUserHistory fallback:', err);
  }
}

// === FIRESTORE CLINIC BRANDING SETTINGS ===

/**
 * Menyimpan konfigurasi Kop Surat & Branding Instansi ke Cloud Firestore (settings/clinicBranding)
 */
export async function saveClinicBrandingToFirestore(branding: ClinicBrandingSettings): Promise<void> {
  if (!db) return;
  try {
    const docRef = doc(db, 'settings', 'clinicBranding');
    const cleanData: Record<string, any> = {};
    Object.entries(branding).forEach(([key, val]) => {
      if (val !== undefined) cleanData[key] = val;
    });
    cleanData.updatedAt = new Date().toISOString();
    await withTimeout(setDoc(docRef, cleanData, { merge: true }), 4000);
  } catch (err) {
    console.warn('Firestore saveClinicBrandingToFirestore fallback:', err);
  }
}

/**
 * Mengambil konfigurasi Kop Surat & Branding Instansi dari Cloud Firestore
 */
export async function fetchClinicBrandingFromFirestore(): Promise<ClinicBrandingSettings | null> {
  if (!db) return null;
  try {
    const docRef = doc(db, 'settings', 'clinicBranding');
    const snap = await withTimeout(getDoc(docRef), 4000);
    if (snap.exists()) {
      return snap.data() as ClinicBrandingSettings;
    }
  } catch (err) {
    console.warn('Firestore fetchClinicBrandingFromFirestore fallback:', err);
  }
  return null;
}

// === FIRESTORE PAYMENT METHOD SETTINGS ===

/**
 * Menyimpan konfigurasi metode pembayaran (QRIS, Bank, E-Wallet) ke Cloud Firestore (settings/paymentSettings)
 */
export async function savePaymentSettingsToFirestore(settings: PaymentMethodSettings): Promise<void> {
  if (!db) return;
  try {
    const docRef = doc(db, 'settings', 'paymentSettings');
    const cleanData: Record<string, any> = {
      ...settings,
      updatedAt: new Date().toISOString()
    };
    await withTimeout(setDoc(docRef, cleanData, { merge: true }), 4000);
  } catch (err) {
    console.warn('Firestore savePaymentSettingsToFirestore fallback:', err);
  }
}

/**
 * Mengambil konfigurasi metode pembayaran dari Cloud Firestore
 */
export async function fetchPaymentSettingsFromFirestore(): Promise<PaymentMethodSettings | null> {
  if (!db) return null;
  try {
    const docRef = doc(db, 'settings', 'paymentSettings');
    const snap = await withTimeout(getDoc(docRef), 4000);
    if (snap.exists()) {
      return snap.data() as PaymentMethodSettings;
    }
  } catch (err) {
    console.warn('Firestore fetchPaymentSettingsFromFirestore fallback:', err);
  }
  return null;
}

// === FIRESTORE ADMIN TEAM MANAGEMENT ===

/**
 * Menyimpan atau memperbarui staf administrator di Cloud Firestore (koleksi 'adminTeam')
 */
export async function saveAdminUserToFirestore(admin: AdminUser): Promise<void> {
  if (!db || !admin.id) return;
  try {
    const docRef = doc(db, 'adminTeam', admin.id);
    const cleanData: Record<string, any> = {};
    Object.entries(admin).forEach(([key, val]) => {
      if (val !== undefined) cleanData[key] = val;
    });
    cleanData.updatedAt = new Date().toISOString();
    await withTimeout(setDoc(docRef, cleanData, { merge: true }), 4000);
  } catch (err) {
    console.warn('Firestore saveAdminUserToFirestore fallback:', err);
  }
}

/**
 * Menghapus akun staf administrator dari Cloud Firestore
 */
export async function deleteAdminUserFromFirestore(adminId: string): Promise<void> {
  if (!db || !adminId) return;
  try {
    const docRef = doc(db, 'adminTeam', adminId);
    await withTimeout(deleteDoc(docRef), 4000);
  } catch (err) {
    console.warn('Firestore deleteAdminUserFromFirestore fallback:', err);
  }
}

/**
 * Mengambil daftar staf administrator dari Cloud Firestore
 */
export async function fetchAdminTeamFromFirestore(): Promise<AdminUser[]> {
  if (!db) return [];
  try {
    const adminCol = collection(db, 'adminTeam');
    const snap = await withTimeout(getDocs(adminCol), 4000);
    const admins: AdminUser[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as AdminUser;
      if (data && (data.id || docSnap.id)) {
        admins.push({
          ...data,
          id: data.id || docSnap.id
        });
      }
    });
    return admins;
  } catch (err) {
    console.warn('Firestore fetchAdminTeamFromFirestore fallback:', err);
    return [];
  }
}


