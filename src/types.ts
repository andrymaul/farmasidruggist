export type SeverityLevel = 'Major' | 'Moderate' | 'Minor';

export type AuditActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'SYNC' | 'LICENSE_CHANGE';

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  actionType: AuditActionType;
  targetEntity: 'Obat' | 'Interaksi DDInter' | 'Subskripsi Customer' | 'Tarif & Fitur' | 'Interaksi Makanan' | 'Duplikasi Terapi' | 'Sistem';
  summaryText: string;
  detailsJson?: string;
  ipAddress?: string;
}

export type AdminRoleType = 'Super Admin' | 'Apoteker Pengelola' | 'Editor Konten Obat' | 'Support Staff';

export interface AdminPermissionSet {
  canManageDrugs: boolean;
  canManageInteractions: boolean;
  canManageSubscriptions: boolean;
  canManagePricing: boolean;
  canManageFoodInteractions: boolean;
  canViewAuditLogs: boolean;
  canManageTeamAdmins: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  roleType: AdminRoleType;
  permissions: AdminPermissionSet;
  status: 'active' | 'suspended';
  lastLoginAt?: string;
  createdAt: string;
}

export interface ClinicBrandingSettings {
  clinicName: string;
  tagline?: string;
  address: string;
  phone: string;
  email: string;
  licenseNumber?: string;
  logoUrl?: string;
  stampUrl?: string;
  primaryColor: string;
  showWatermark: boolean;
  customFooterText: string;
  pharmacistName: string;
  pharmacistSipa: string;
}

export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  atcCode: string;
  category: string;
  bpomClassification?: 'Obat Bebas' | 'Obat Bebas Terbatas' | 'Obat Keras' | 'Obat-Obat Tertentu' | 'Psikotropika' | 'Prekursor Farmasi' | 'Narkotika';
  drugClassification?: string;
  description?: string;
  indication: string;
  offLabelIndication?: string;
  contraindications?: string;
  contraindication?: string;
  sideEffects?: string;
  adverseEffects?: string;
  dosage: string;
  halfLife?: string;
  clearance?: string;
  pharmacology?: string;
  foodInteraction?: string;
  pregnancyCategory?: string;
  ddinterId?: string;
  updatedAt?: string;
}

export interface DrugInteraction {
  id: string;
  drugAId: string;
  drugBId: string;
  drugAName: string;
  drugBName: string;
  severity: SeverityLevel;
  mechanism: string;
  clinicalOutcome: string;
  management: string;
  evidenceLevel: 'High' | 'Moderate' | 'Low';
  ddinterPairId: string;
}

export type UserRole = 'admin' | 'customer' | 'free';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  password?: string;
  phone?: string;
  institution?: string;
  licenseNumber?: string;
  notes?: string;
  role: UserRole;
  subscriptionPlan: 'Gratis' | 'Pro' | 'Klinik';
  subscriptionStatus: 'active' | 'expired' | 'trial';
  maxDrugsOverride?: number;
  canExportPdf?: boolean;
  canAccessRenal?: boolean;
  canAccessPolypharmacy?: boolean;
  expiresAt?: string;
  createdAt?: string;
}

export interface InteractionCheckRecord {
  id: string;
  userId: string;
  userEmail?: string;
  patientName?: string;
  drugs: string[]; // List of drug names
  timestamp: string;
  interactionCount: number;
  highestSeverity: SeverityLevel | 'None';
  notes?: string;
}

export interface CustomerPlanPermissions {
  maxDrugsPerCheck: number;
  canPrintPdfReport: boolean;
  canAccessFoodInteractions: boolean;
  canAccessTherapeuticDuplications: boolean;
  canSaveCloudHistory: boolean;
  maxHistoryRecords: number;
  canAccessClinicBranding: boolean;
  canExportExcelCsv: boolean;
}

export interface PricingPlan {
  id: 'free' | 'pro' | 'klinik';
  name: string;
  badge?: string;
  priceFormatted: string;
  priceValue: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  permissions?: CustomerPlanPermissions;
}

export interface DrugFoodInteraction {
  id: string;
  drugName: string;
  foodName: string;
  foodCategory: 'Buah / Juice' | 'Susu / Kalsium' | 'Alkohol' | 'Makanan Tinggi Vitamin K' | 'Kafein / Kopi' | 'Makanan Tinggi Lemak' | 'Lainnya';
  severity: SeverityLevel;
  mechanism: string;
  clinicalOutcome: string;
  recommendation: string;
}

export interface TherapeuticDuplication {
  id: string;
  drugAName: string;
  drugBName: string;
  therapeuticClass: string;
  riskDescription: string;
  recommendation: string;
}

export interface DDInterDatasetInfo {
  version: string;
  totalDDI: number;
  totalApprovedDrugs: number;
  totalDFI: number;
  totalDDSI: number;
  totalDuplications: number;
  lastSyncDate: string;
  sourceUrl: string;
  categories: {
    code: string;
    name: string;
    recordCount: number;
    description: string;
  }[];
}

export interface MedicationStep {
  stepNumber: number;
  title: string;
  description: string;
  importantNote?: string;
}

export interface MedicationGuide {
  id: string;
  title: string;
  category: 'Mata & Telinga' | 'Inhalasi & Respirasi' | 'Injeksi' | 'Suppositoria & Vaginal';
  iconName: string;
  shortDesc: string;
  preparationSteps: string[];
  steps: MedicationStep[];
  importantWarnings: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  storageAdvice: string;
  commonMistakes: string[];
}
export interface QrisSettings {
  merchantName: string;
  nmid: string;
  qrImageUrl: string;
  notes: string;
}

export interface BankTransferSettings {
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankCode?: string;
  notes: string;
}

export interface EWalletSettings {
  gopayNumber: string;
  gopayName: string;
  ovoNumber: string;
  ovoName: string;
  danaNumber: string;
  danaName: string;
  shopeepayNumber: string;
  shopeepayName: string;
  notes: string;
}

export interface PaymentMethodSettings {
  qris: QrisSettings;
  bank: BankTransferSettings;
  ewallet: EWalletSettings;
}
