import { ClinicBrandingSettings } from '../types';

export const DEFAULT_CLINIC_BRANDING: ClinicBrandingSettings = {
  clinicName: 'Klinik & Apotek Medika Sejahtera',
  tagline: 'Pusat Pelayanan Resep & Farmasi Klinis Terpadu',
  address: 'Jl. Jendral Sudirman No. 45, Kav. 12, Jakarta Selatan 12190',
  phone: '(021) 555-0199 / WhatsApp 0812-9988-7766',
  email: 'layanan.farmasi@medikasejahtera.co.id',
  licenseNumber: 'SIA: 449.1/092/SIA/DPMPTSP/2024',
  pharmacistName: 'apt. Rina Wati, S.Farm',
  pharmacistSipa: 'SIPA: 19920814/SIPA_31.74/2023/2019',
  primaryColor: '#0d9488', // Teal
  showWatermark: true,
  enableHeaderKop: true,
  enableDigitalStamp: true,
  enablePharmacistSignature: true,
  enableFooter: true,
  customFooterText: 'Dokumen evaluasi klinis interaksi obat ini diterbitkan secara sah dan tervalidasi melalui Sistem Informasi Farmasi Klinis.'
};
