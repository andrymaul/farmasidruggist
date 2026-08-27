import { UserProfile } from '../types';

// Default customer list is empty so deleted customers/dummy records never reappear automatically
export const INITIAL_CUSTOMERS: UserProfile[] = [];

// Optional sample demo customers only if Admin explicitly clicks 'Muat Contoh Demo'
export const SAMPLE_DEMO_CUSTOMERS: UserProfile[] = [
  {
    uid: 'cust-001',
    email: 'farmasis.klinik@gmail.com',
    name: 'apt. Rina Wati, S.Farm',
    password: 'RinaWati#Farmasi25',
    phone: '0812-3456-7890',
    institution: 'Klinik Medika Sejahtera Jakarta',
    licenseNumber: 'SIPA: 19920814/SIPA_31.74/2023/2019',
    notes: 'Paket Lisensi Elite 2 Tahun via invoice BNI. PIC apt. Rina.',
    role: 'customer',
    subscriptionPlan: 'Elite',
    subscriptionStatus: 'active',
    maxDrugsOverride: 30,
    canExportPdf: true,
    canAccessRenal: true,
    canAccessPolypharmacy: true,
    expiresAt: '2027-08-14T00:00:00.000Z',
    createdAt: '2025-08-14T00:00:00.000Z'
  },
  {
    uid: 'cust-002',
    email: 'budi.santoso@rsmedika.co.id',
    name: 'dr. Budi Santoso, Sp.PD',
    password: 'DrBudi@SpPD2026',
    phone: '0813-8877-6655',
    institution: 'RS Medika Utama Surabaya',
    licenseNumber: 'SIP: 446.1/104/SIP.D/2022',
    notes: 'Dokter spesialis penyakit dalam, aktif menggunakan kalkulator ginjal.',
    role: 'customer',
    subscriptionPlan: 'Pro',
    subscriptionStatus: 'active',
    maxDrugsOverride: 20,
    canExportPdf: true,
    canAccessRenal: true,
    canAccessPolypharmacy: true,
    expiresAt: '2027-02-10T00:00:00.000Z',
    createdAt: '2026-02-10T00:00:00.000Z'
  },
  {
    uid: 'cust-003',
    email: 'apotek.k24sudirman@gmail.com',
    name: 'Apotek K-24 Cabang Sudirman',
    password: 'K24Sudirman!2026',
    phone: '0821-4455-6677',
    institution: 'PT K-24 Indonesia',
    licenseNumber: 'SIA: 449.1/092/SIA/DPMPTSP/2024',
    notes: 'Apotek 24 jam dengan integrasi SOP dan evaluasi penapisan resep.',
    role: 'customer',
    subscriptionPlan: 'Elite',
    subscriptionStatus: 'active',
    maxDrugsOverride: 30,
    canExportPdf: true,
    canAccessRenal: true,
    canAccessPolypharmacy: true,
    expiresAt: '2026-12-31T00:00:00.000Z',
    createdAt: '2025-12-31T00:00:00.000Z'
  }
];
