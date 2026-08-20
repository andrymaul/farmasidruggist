import { SystemAuditLog } from '../types';

export const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-08-14T09:15:22.000Z',
    actorName: 'apt. Rina Wati, S.Farm (Admin Utama)',
    actorEmail: 'farmasis.klinik@gmail.com',
    actionType: 'LICENSE_CHANGE',
    targetEntity: 'Subskripsi Customer',
    summaryText: 'Memperpanjang masa aktif lisensi Apotek K-24 Cabang Sudirman selama +1 Tahun.',
    detailsJson: JSON.stringify({
      customerName: 'Apotek K-24 Cabang Sudirman',
      oldExpiresAt: '2025-12-31',
      newExpiresAt: '2026-12-31',
      plan: 'Klinik'
    }, null, 2),
    ipAddress: '180.252.112.45'
  },
  {
    id: 'log-102',
    timestamp: '2026-08-14T08:45:10.000Z',
    actorName: 'apt. Rina Wati, S.Farm (Admin Utama)',
    actorEmail: 'farmasis.klinik@gmail.com',
    actionType: 'UPDATE',
    targetEntity: 'Tarif & Fitur',
    summaryText: 'Mengubah nominal harga Paket Pro dari Rp 149.000 menjadi Rp 99.000/bulan.',
    detailsJson: JSON.stringify({
      planId: 'pro',
      oldPrice: 'Rp 149.000',
      newPrice: 'Rp 99.000',
      badge: 'Paling Populer'
    }, null, 2),
    ipAddress: '180.252.112.45'
  },
  {
    id: 'log-103',
    timestamp: '2026-08-14T07:20:00.000Z',
    actorName: 'apt. Rina Wati, S.Farm (Admin Utama)',
    actorEmail: 'farmasis.klinik@gmail.com',
    actionType: 'CREATE',
    targetEntity: 'Interaksi Makanan',
    summaryText: 'Menambahkan rekor interaksi obat-makanan baru "Simvastatin ⚡ Jus Grapefruit".',
    detailsJson: JSON.stringify({
      drugName: 'Simvastatin',
      foodName: 'Jus Grapefruit',
      severity: 'Major',
      mechanism: 'Inhibisi enzim CYP3A4 memicu lonjakan kadar plasma simvastatin.'
    }, null, 2),
    ipAddress: '180.252.112.45'
  },
  {
    id: 'log-104',
    timestamp: '2026-08-13T16:10:05.000Z',
    actorName: 'System Administrator',
    actorEmail: 'admin@farmasidruggist.com',
    actionType: 'CREATE',
    targetEntity: 'Obat',
    summaryText: 'Menambahkan monografi obat baru "Empagliflozin (Jardiance)" ke database.',
    detailsJson: JSON.stringify({
      name: 'Empagliflozin',
      category: 'Antidiabetes Oral (Inhibitor SGLT2)',
      atcCode: 'A10BK03',
      pregnancyCategory: 'C'
    }, null, 2),
    ipAddress: '127.0.0.1'
  },
  {
    id: 'log-105',
    timestamp: '2026-08-13T14:00:00.000Z',
    actorName: 'System Administrator',
    actorEmail: 'admin@farmasidruggist.com',
    actionType: 'SYNC',
    targetEntity: 'Sistem',
    summaryText: 'Sinkronisasi massal basis data interaksi obat ke Cloud Firebase Firestore.',
    detailsJson: JSON.stringify({
      totalDrugsSynced: 30,
      totalInteractionsSynced: 50,
      firebaseProject: 'demo-app'
    }, null, 2),
    ipAddress: '127.0.0.1'
  },
  {
    id: 'log-106',
    timestamp: '2026-08-12T11:30:15.000Z',
    actorName: 'apt. Rina Wati, S.Farm (Admin Utama)',
    actorEmail: 'farmasis.klinik@gmail.com',
    actionType: 'UPDATE',
    targetEntity: 'Duplikasi Terapi',
    summaryText: 'Memperbarui aturan duplikasi terapi golongan "NSAID Ganda".',
    detailsJson: JSON.stringify({
      therapeuticClass: 'NSAID',
      recommendation: 'Hentikan salah satu NSAID dan kombinasikan dengan parasetamol.'
    }, null, 2),
    ipAddress: '180.252.112.45'
  }
];
