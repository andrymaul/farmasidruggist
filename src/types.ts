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
  // Panel Admin & Master Data (Sesuai Menu & Database di Aplikasi)
  canManageDrugs: boolean;
  canManageInteractions: boolean;
  canManageSubscriptions: boolean;
  canManagePricing: boolean;
  canManageFoodInteractions: boolean;
  canManageTherapeuticDuplication?: boolean;
  canManageFirebaseSync?: boolean;
  canViewAuditLogs: boolean;
  canManageTeamAdmins: boolean;

  // Modul Skrining Klinis & Keamanan Resep
  canAccessInteractions?: boolean;
  canAccessPregnancy?: boolean;
  canAccessDrugLab?: boolean;
  canAccessHerbDrug?: boolean;
  canAccessSideEffects?: boolean;
  canAccessIvCompatibility?: boolean;

  // Modul Kalkulator Medis & Racikan Farmasi
  canAccessBud?: boolean;
  canAccessPediatric?: boolean;
  canAccessRenal?: boolean;

  // Modul Polifarmasi & Edukasi Pasien
  canAccessPolypharmacy?: boolean;
  canAccessWhatsappPio?: boolean;
  canAccessGuidelines?: boolean;
  canAccessSwamedikasi?: boolean;

  // Modul Pusat Belajar, SOP & Regulasi
  canAccessCompetency?: boolean;
  canAccessSop?: boolean;
  canAccessRegulations?: boolean;
  canAccessLiterature?: boolean;
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
  enableHeaderKop?: boolean;
  enableDigitalStamp?: boolean;
  enablePharmacistSignature?: boolean;
  enableFooter?: boolean;
  customFooterText: string;
  pharmacistName: string;
  pharmacistSipa: string;
  doctorName?: string;
  sipNumber?: string;
}

export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  atcCode: string;
  category: string;
  subCategory?: string;
  dosageForms?: string[];
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
  mechanismOfAction?: string;
  interactionKeywords?: string[];
  foodInteraction?: string;
  pregnancyCategory?: string;
  ddinterId?: string;
  updatedAt?: string;
  // Drugs.com & Clinical Standards Extension
  blackBoxWarning?: string;
  lactationWarning?: string;
  cypPathway?: string;
  monitoringParameters?: string;
  patientTips?: string;
  drugsComUrl?: string;
  commonSideEffects?: string[];
  seriousSideEffects?: string[];
  // Drugs.com Detailed Dosage & Administration Breakdown
  adultDosage?: string;
  pediatricDosage?: string;
  geriatricDosage?: string;
  renalDoseAdjustment?: string;
  hepaticDoseAdjustment?: string;
  maxDoseLimit?: string;
  administrationGuideline?: string;
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
  evidenceLevel: 'High' | 'Moderate' | 'Low' | string;
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
  subscriptionPlan: 'Pemula' | 'Pro' | 'Gratis' | string;
  subscriptionStatus: 'active' | 'expired' | 'trial';
  maxDrugsOverride?: number;
  canExportPdf?: boolean;
  canAccessRenal?: boolean;
  canAccessPolypharmacy?: boolean;
  canAccessIvCompatibility?: boolean;
  canAccessBud?: boolean;
  canAccessPediatric?: boolean;
  canAccessPregnancy?: boolean;
  canAccessDrugLab?: boolean;
  canAccessHerbDrug?: boolean;
  canAccessSideEffects?: boolean;
  canAccessWhatsappPio?: boolean;
  canAccessGuidelines?: boolean;
  canAccessCompetency?: boolean;
  canAccessSop?: boolean;
  canAccessRegulations?: boolean;
  canAccessLiterature?: boolean;
  canAccessSwamedikasi?: boolean;
  expiresAt?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastActiveAt?: string;
  isOnline?: boolean;
  paymentHistory?: CustomerPaymentRecord[];
}

export interface CustomerPaymentRecord {
  id: string;
  date: string;
  amount: number;
  plan: string;
  paymentMethod: string;
  referenceNumber?: string;
  status: 'Lunas' | 'Pending' | 'Batal';
  notes?: string;
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

  // Modul Skrining Klinis & Keamanan Resep
  canAccessIvCompatibility?: boolean;
  canAccessPregnancy?: boolean;
  canAccessDrugLab?: boolean;
  canAccessHerbDrug?: boolean;
  canAccessSideEffects?: boolean;

  // Modul Kalkulator Medis & Racikan Farmasi
  canAccessBud?: boolean;
  canAccessPediatric?: boolean;
  canAccessRenal?: boolean;
  canAccessRenalCalculator?: boolean;

  // Modul Polifarmasi & Edukasi Pasien
  canAccessPolypharmacy?: boolean;
  canAccessWhatsappPio?: boolean;
  canAccessGuidelines?: boolean;
  canAccessClinicalGuidelines?: boolean;

  // Modul Pusat Belajar, SOP & Regulasi
  canAccessCompetency?: boolean;
  canAccessSop?: boolean;
  canAccessRegulations?: boolean;
  canAccessLiterature?: boolean;
  canAccessSwamedikasi?: boolean;
}

export interface PricingPlan {
  id: 'free' | 'pro' | string;
  name: string;
  badge?: string;
  priceFormatted: string;
  originalPriceFormatted?: string;
  discountBadge?: string;
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
  foodCategory: 'Buah / Juice' | 'Susu / Kalsium' | 'Alkohol' | 'Makanan Tinggi Vitamin K' | 'Kafein / Kopi' | 'Makanan Tinggi Lemak' | 'Suplemen / Mineral' | 'Lainnya';
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

export type DiseaseCategory =
  | 'Kardiovaskular'
  | 'Ginjal & Saluran Kemih'
  | 'Gastrointestinal & Hepar'
  | 'Respirasi & Paru'
  | 'Endokrin & Metabolik'
  | 'Neurologi & Psikiatri'
  | 'Oftalmologi'
  | 'Lainnya';

export type ContraindicationLevel =
  | 'Kontraindikasi Mutlak (Absolute)'
  | 'Peringatan Ketat (Black Box / Relative)'
  | 'Gunakan dengan Kehati-hatian (Caution)';

export interface DrugDiseaseInteraction {
  id: string;
  drugName: string;
  diseaseName: string;
  diseaseCategory: DiseaseCategory;
  severity: SeverityLevel;
  contraindicationLevel: ContraindicationLevel;
  mechanism: string;
  clinicalRisk: string;
  recommendation: string;
  references?: string;
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
  category: 'Mata & Telinga' | 'Inhalasi & Respirasi' | 'Injeksi' | 'Suppositoria & Vaginal' | 'Topikal & Oral Khusus';
  iconName: string;
  shortDesc: string;
  popularBrands?: string[];
  preparationSteps: string[];
  steps: MedicationStep[];
  importantWarnings: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  storageAdvice: string;
  commonMistakes: string[];
  clinicalPearls?: string[];
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

// === PANDUAN TERAPI PENYAKIT (CLINICAL PRACTICE GUIDELINES) ===
export type GuidelineCategory =
  | 'Semua Kategori'
  | 'Kardiovaskular'
  | 'Endokrin & Metabolik'
  | 'Respirasi & Alergi'
  | 'Gastrointestinal'
  | 'Anti-Infeksi'
  | 'Reumatologi & Ginjal'
  | 'Sistem Saraf & Psikiatri'
  | 'Pediatri (Kesehatan Anak)'
  | 'Obstetri & Ginekologi';

export type GuidelineOrganization =
  | 'Semua Sumber'
  | 'PNPK Kemenkes RI'
  | 'PERKI'
  | 'PERKENI'
  | 'PAPDI'
  | 'PDPI'
  | 'IDAI'
  | 'POGI'
  | 'PERDOSSI'
  | 'IRA'
  | 'PGI-PEGI'
  | 'PERNEFRI';

export interface GuidelineDrugRegimen {
  drugName: string;
  dosage: string;
  role: 'First-Line' | 'Alternative' | 'Combination / Add-On' | 'Acute Rescue' | 'Maintenance' | 'Lini Pertama' | 'Lini Kedua' | 'Kombinasi / Add-On' | 'Kombinasi' | string;
  notes?: string;
  fornasTier?: 'Faskes 1' | 'Faskes 2/3' | 'Semua Faskes' | string;
}

export interface GuidelineSpecialPopulation {
  condition: string; // e.g. "Ibu Hamil & Menyusui", "Gangguan Ginjal Kronis (CKD)", "Geriatri / Lansia"
  recommendation: string;
  contraindicatedDrugs?: string[];
}

export interface ClinicalGuideline {
  id: string;
  diseaseName: string;
  category: 
    | 'Kardiovaskular' 
    | 'Endokrin & Metabolik' 
    | 'Respirasi & Alergi' 
    | 'Gastrointestinal' 
    | 'Anti-Infeksi' 
    | 'Reumatologi & Ginjal' 
    | 'Sistem Saraf & Psikiatri'
    | 'Pediatri (Kesehatan Anak)'
    | 'Obstetri & Ginekologi';
  organization?: GuidelineOrganization | string;
  fornasTier?: 'Faskes 1 (Puskesmas/Klinik Pratama)' | 'Faskes 2/3 (RS Rujukan)' | 'Semua Tingkat Faskes' | string;
  icd10?: string;
  summary: string;
  targetGoals: string[];
  firstLineTherapy: GuidelineDrugRegimen[];
  secondLineTherapy: GuidelineDrugRegimen[];
  nonPharmacological: string[];
  specialPopulations?: GuidelineSpecialPopulation[];
  monitoringParameters: string[];
  sourceGuidelines: string;
  updatedYear?: string;
  keyClinicalAlert?: string;
  indonesianKeywords?: string[];
}

// === SWAMEDIKASI & CLINICAL TRIAGE (SELF-MEDICATION) ===
export type SwamedikasiCategoryKey =
  | 'all'
  | 'pain-fever'
  | 'digestive'
  | 'respiratory'
  | 'skin-allergy'
  | 'eye-ear'
  | 'mouth-oral'
  | 'pediatric'
  | 'motion-fatigue';

export type BpomClassificationType =
  | 'Obat Bebas (Hijau)'
  | 'Obat Bebas Terbatas (Biru)'
  | 'Obat Bebas / Bebas Terbatas'
  | 'Obat Wajib Apotek (OWA)'
  | 'Suplemen Kesehatan (POM SD)';

export interface SwamedikasiDrugOption {
  genericName: string;
  brandExamples: string[];
  bpomClass: BpomClassificationType;
  dosageGuideline: string;
  timing: string; // misal: 'Diminum sesudah makan', '30-60 menit sebelum makan'
  cautionNotes?: string;
  targetDrugId?: string; // id obat di database master untuk cek interaksi
}

export interface SwamedikasiProtocol {
  id: string;
  title: string;
  category: SwamedikasiCategoryKey;
  categoryLabel: string;
  iconName: string;
  quickSummary: string;
  laymanKeywords: string[]; // kata kunci awam, e.g. ['meriang', 'badan anget', 'panas', 'masuk angin']
  typicalSymptoms: string[];
  redFlags: string[]; // Gejala bahaya yang WAJIB segera dirujuk ke dokter / UGD
  maxSelfMedDays: number; // Batas maksimal hari swamedikasi sebelum harus evaluasi dokter
  recommendedDrugs: SwamedikasiDrugOption[];
  nonPharmacolTherapy: string[]; // Terapi non-obat (kompres, hidrasi, istirahat, pola makan)
  contraindicatedForSelfMed: string[]; // Hal atau obat yang TIDAK BOLEH digunakan sembarangan (e.g. Antibiotik oral)
  specialPopulations: {
    pregnancyWarning: string;
    pediatricWarning: string;
    geriatricWarning?: string;
  };
  whenToSeeDoctor: string[];
  gemaCermatTips?: string[]; // Tips Dagusibu & Edukasi Cerdas Obat Kemenkes RI
}

