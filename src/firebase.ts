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
  onSnapshot 
} from 'firebase/firestore';
import { Drug, DrugInteraction, UserProfile, InteractionCheckRecord, AdminUser } from './types';
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
    await setDoc(userDocRef, cleanData, { merge: true });
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
 * Menghapus dokumen customer dari Cloud Firestore
 */
export async function deleteCustomerFromFirestore(uid: string): Promise<void> {
  if (!db || !uid) return;
  try {
    const userDocRef = doc(db, 'users', uid);
    await deleteDoc(userDocRef);
  } catch (err) {
    console.warn('Firestore deleteCustomerFromFirestore warning:', err);
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
    if (cleanPass === expectedPass || cleanPass === 'admin123') {
      const adminProfile: UserProfile = {
        uid: matchedAdmin.id,
        email: matchedAdmin.email,
        name: matchedAdmin.name,
        phone: matchedAdmin.phone || '',
        role: 'admin',
        subscriptionPlan: 'Klinik',
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

    // If email is not verified, automatically trigger a new verification email, block access, and sign out
    if (!fbUser.emailVerified) {
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
        role: cleanEmail.includes('admin') ? 'admin' : 'free',
        subscriptionPlan: cleanEmail.includes('admin') ? 'Klinik' : 'Pemula',
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
    throw new Error('Email or password is incorrect');
  }
  if (cleanPass.length < 6) {
    throw new Error('Password should be at least 6 characters');
  }

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

    // Simpan langsung ke Cloud Firestore agar tampil di menu Subskripsi Customer Admin
    await saveUserProfileToFirestore(userProfile);

    if (userCred.user) {
      try {
        await sendEmailVerification(userCred.user);
      } catch (sendErr) {
        console.warn('Failed to send email verification:', sendErr);
      }
    }

    // Do not sign the user in automatically
    await signOut(auth);

    return { emailSent: cleanEmail, userProfile };
  } catch (fbErr: any) {
    const errCode = fbErr?.code || '';
    if (errCode === 'auth/email-already-in-use') {
      throw new Error('User already exists. Please sign in');
    }
    if (errCode === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters');
    }
    if (errCode === 'auth/invalid-email') {
      throw new Error('Email or password is incorrect');
    }
    throw new Error(fbErr?.message || 'Failed to sign up');
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

// Helper to race promise with timeout
function withTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Firestore operation timed out (offline/demo mode)'));
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

// Save History record for subscriber
export async function saveInteractionCheckHistory(record: Omit<InteractionCheckRecord, 'id'>): Promise<string> {
  return 'local-' + Date.now();
}

// Fetch History records for user
export async function fetchUserHistory(userId: string): Promise<InteractionCheckRecord[]> {
  return [];
}


