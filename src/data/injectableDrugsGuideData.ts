// =====================================================================
// INJECTABLE DRUGS GUIDE (IDG) - ALISTAIR GRAY, JANE WRIGHT (2021)
// PHARMACEUTICAL PRESS / ROYAL PHARMACEUTICAL SOCIETY & NPSA ALERT 20
// STANDAR KESELAMATAN OBAT SUNTIK, DISPLACEMENT VALUE & EKSTRAVASASI RS
// ZERO-DUPLICATION CLINICAL ENRICHMENT LAYER
// =====================================================================

import type { IvDrugProfile } from './ivCompatibilityData';

export type NpsaRiskLevel = 'High Risk' | 'Moderate Risk' | 'Low Risk';

export interface DisplacementData {
  powderWeightMg: number;
  displacementVolumeMl: number; // Volume yang ditempati serbuk saat larut
  standardDiluentVolumeMl: number; // Volume pelarut yang lazim ditambahkan
  totalReconstitutedVolumeMl: number; // Pelarut + displacement
  reconstitutedConcentrationMgMl: number;
  notes: string;
}

export interface ExtravasationProfile {
  classification: 'Vesicant' | 'Irritant' | 'Non-vesicant';
  tissueToxicity: string;
  thermalIntervention: 
    | 'Kompres Kering Dingin (Vasokonstriksi)' 
    | 'Kompres Kering Hangat (Dispersi)' 
    | 'Hindari Suhu Ekstrem (Netral)';
  antidoteName?: string;
  antidoteDoseAndRoute?: string;
  antidoteInstructions?: string;
  emergencySteps: string[];
}

export interface VascularAccessProfile {
  preferredRoute: 'CVC (Vena Sentral) Wajib' | 'CVC Sangat Dianjurkan' | 'Vena Perifer Dapat Digunakan';
  osmolarityEstimate: string;
  phStatus: string;
  isExtremePh: boolean; // pH < 5 atau > 9
  phlebitisRisk: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Rendah';
  recommendations: string;
}

export interface FlushingProtocol {
  preferredFlushSolution: 'NaCl 0.9% (Normal Saline)' | 'Dextrose 5% (D5W)' | 'Water for Injection (WFI)' | 'NaCl 0.9% atau D5W';
  minFlushVolumeMl: number;
  flushIncompatibilityWarning?: string;
}

export interface EquipmentGuidelines {
  inlineFilter: 'Wajib 0.22 mikron' | 'Wajib 1.2 mikron' | 'Dianjurkan jika ada partikel' | 'Tidak Diperlukan';
  inlineFilterReason?: string;
  containerMaterial: string;
  adsorptionRisk?: string;
}

export interface GrayIdgClinicalDetails {
  npsaRiskRating: NpsaRiskLevel;
  npsaRiskRationale: string[];
  preAdministrationChecks: string[];
  bedsideMonitoring: string[];
  displacementData?: DisplacementData;
  extravasation: ExtravasationProfile;
  vascularAccess: VascularAccessProfile;
  flushing: FlushingProtocol;
  equipment: EquipmentGuidelines;
}

// =====================================================================
// ID-KEYED ENRICHMENT MAPPING (ZERO DATA DUPLICATION)
// Menautkan standar Gray (2021) ke ID obat tanpa menduplikasi data umum
// =====================================================================

export const GRAY_IDG_ENRICHMENTS: Record<string, GrayIdgClinicalDetails> = {
  // 1. NOREPINEPHRINE
  'iv-norepinephrine': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Vasokonstriktor kuat dengan risiko iskemia perifer masif jika salah titrasi.',
      'Vesikan potensi tinggi: ekstravasasi dapat menyebabkan nekrosis jaringan berat.',
      'Sediaan pekat memerlukan perhitungan kecepatan infus mikro (mcg/kg/menit).'
    ],
    preAdministrationChecks: [
      'Verifikasi kepatenan kanula vena atau CVC sebelum memulai infus.',
      'Pasang monitor tekanan darah kontinu (arterial line atau NIBP siklus 2–5 menit).',
      'Pastikan pelarut mengandung Dekstrosa 5% (D5W) untuk melindungi oksidasi katekolamin.'
    ],
    bedsideMonitoring: [
      'Target Mean Arterial Pressure (MAP) ≥ 65 mmHg.',
      'Inspeksi perfusi ekstremitas (ujung jari tangan dan kaki untuk tanda iskemia acral).',
      'Inspeksi situs insersi kateter setiap 1 jam untuk tanda ekstravasasi.'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Nekrosis iskemik jaringan subkutan parah akibat vasokonstriksi alfa-1 alfa lokal hebat.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      antidoteName: 'Phentolamine Mesylate Subkutan',
      antidoteDoseAndRoute: 'Infiltrasi 5 - 10 mg Phentolamine dilarutkan dalam 10 - 15 mL NaCl 0.9% subkutan ke seluruh area ekstravasasi.',
      antidoteInstructions: 'Berikan secepatnya dalam < 12 jam sejak ekstravasasi dengan jarum halus (27-gauge) secara melingkar di batas infiltrasi. Segera konsultasikan bedah plastik jika terjadi ulserasi.',
      emergencySteps: [
        'Hentikan infus seketika, jangan mencabut kateter vena.',
        'Aspirasi perlahan 3–5 mL darah/cairan dari kateter untuk menarik sisa obat, lalu lepaskan kateter.',
        'Tandai batas eritema/iskemia kulit dengan spidol permanen.',
        'Infiltrasi antidot Phentolamine subkutan ke seluruh area yang memutih/dingin.',
        'Berikan kompres hangat kering untuk memicu vasodilatasi lokal, elevasi ekstremitas.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC (Vena Sentral) Wajib',
      osmolarityEstimate: '260 - 320 mOsm/L (Isotonik dengan D5W)',
      phStatus: 'pH 3.0 - 4.5 (Sangat Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Harus diberikan melalui kateter vena sentral (CVC). Infus perifer hanya diizinkan dalam kondisi darurat henti jantung sementara dengan kateter vena besar (fossa antekubiti) sambil mempersiapkan CVC.'
    },
    flushing: {
      preferredFlushSolution: 'Dextrose 5% (D5W)',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'Jangan membilas jalur dengan larutan basa kuat (Sodium Bikarbonat) karena akan menonaktifkan katekolamin secara instan.'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wajib Terlindung Cahaya (Amber Tubing & Kantong Gelap)',
      adsorptionRisk: 'Tidak menyerap secara bermakna pada PVC, namun rentan fotooksidasi jika terpapar sinar matahari langsung > 24 jam.'
    }
  },

  // 2. DOBUTAMINE
  'iv-dobutamine': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Inotropik poten dengan efek aritmogenik dan takikardia.',
      'Sediaan pekat memerlukan pompa syringe atau volumetrik presisi.',
      'Inkompatibel dengan larutan alkali.'
    ],
    preAdministrationChecks: [
      'Rekam EKG dasar 12-lead dan ukur baseline denyut jantung.',
      'Koreksi hipovolemia pasien sebelum memulai terapi inotropik.',
      'Pastikan kalium serum normal untuk mencegah aritmia ventrikel.'
    ],
    bedsideMonitoring: [
      'Denyut jantung (waspadai takikardia > 120 bpm atau aritmia baru).',
      'Tekanan darah kontinu.',
      'Laju urine dan tanda-tanda perbaikan curah jantung.'
    ],
    extravasation: {
      classification: 'Irritant',
      tissueToxicity: 'Iritasi lokal dan inflamasi jaringan; nekrosis dapat terjadi pada konsentrasi sangat pekat (> 4 mg/mL).',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      antidoteName: 'Phentolamine (jika terjadi vasokonstriksi lokal berat)',
      antidoteDoseAndRoute: 'Infiltrasi 5 mg Phentolamine subkutan jika terdapat pucat/iskemia fokal.',
      emergencySteps: [
        'Hentikan infus dan aspirasi sisa larutan melalui kanula.',
        'Tinggikan ekstremitas untuk mengurangi edema.',
        'Kompres hangat kering 15–20 menit 4 kali sehari.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC Sangat Dianjurkan',
      osmolarityEstimate: '280 - 350 mOsm/L',
      phStatus: 'pH 2.5 - 5.5 (Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Tinggi',
      recommendations: 'Pemberian via CVC lebih disukai untuk mengurangi risiko flebitis kimiawi akibat pH asam. Batasi konsentrasi perifer maksimal 2 mg/mL.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% atau D5W',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'Jangan membilas dengan Sodium Bicarbonate atau larutan basa karena akan merusak struktur dobutamin.'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman',
      adsorptionRisk: 'Larutan dapat mengalami sedikit perubahan warna merah muda (pink) karena sedikit oksidasi, tidak mempengaruhi potensi selama 24 jam.'
    }
  },

  // 3. DOPAMINE
  'iv-dopamine': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Katekolamin dengan rentang dosis dinamis (renal, inotropik, vasopresor).',
      'Vesikan kuat jika terjadi ekstravasasi pada konsentrasi > 1.6 mg/mL.',
      'Risiko takiaritmia dan iskemia miokard.'
    ],
    preAdministrationChecks: [
      'Pastikan resusitasi cairan selesai sebelum vasopresor dimulai.',
      'Gunakan syringe pump terkalibrasi khusus ICU.'
    ],
    bedsideMonitoring: [
      'Tekanan darah, HR, EKG ritme kontinu, perfusi akral, dan output urin.'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Iskemia dan nekrosis jaringan subkutan akibat vasokonstriksi lokal hebat.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      antidoteName: 'Phentolamine Subkutan',
      antidoteDoseAndRoute: 'Infiltrasi 5 - 10 mg Phentolamine dalam 10 mL NaCl 0.9% subkutan.',
      antidoteInstructions: 'Infiltrasi melingkar di area iskemik dalam kurun 12 jam.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi 3–5 mL cairan dari kateter.',
        'Lepas kanula, beri kompres hangat kering, infiltrasi Phentolamine jika tersedia.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC (Vena Sentral) Wajib',
      osmolarityEstimate: '280 - 320 mOsm/L',
      phStatus: 'pH 2.5 - 5.0 (Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Wajib CVC untuk mencegah ekstravasasi berbahaya. Hindari penggunaan vena perifer tungkai bawah (risiko trombosis vena dalam).'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% atau D5W',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'Inkompatibel dengan Bikarbonat, Furosemide, dan Insulin reguler.'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 4. AMIODARONE
  'iv-amiodarone': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Risiko flebitis perifer parah (tingkat kejadian flebitis mencapai 50-80% pada akses perifer).',
      'Hanya kompatibel dengan Dextrose 5% (D5W) - presipitasi dalam Normal Saline.',
      'Sangat menyerap pada pipa dan kantong PVC standar (menurunkan ketersediaan obat).'
    ],
    preAdministrationChecks: [
      'Rekam EKG interval QTc (kontraindikasi jika QTc > 500 ms).',
      'Periksa kadar Kalium dan Magnesium serum (wajib dikoreksi sebelum amiodarone).',
      'PASTIKAN pelarut adalah Dextrose 5% (D5W murni).'
    ],
    bedsideMonitoring: [
      'Monitoring interval QTc, denyut jantung (risiko bradikardia berat), tekanan darah (risiko hipotensi akibat pelarut Polysorbate 80).'
    ],
    extravasation: {
      classification: 'Irritant',
      tissueToxicity: 'Inflamasi steril parah, selulitis kimiawi, dan flebitis tromboflebitis luas.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      antidoteName: 'Tidak ada antidotum kimiawi spesifik',
      emergencySteps: [
        'Segera hentikan infus dan aspirasi kateter.',
        'Berikan kompres dingin kering 15 menit 4 kali sehari untuk membatasi peradangan.',
        'Elevasikan ekstremitas dan berikan analgesik lokal.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC (Vena Sentral) Wajib',
      osmolarityEstimate: '320 - 450 mOsm/L',
      phStatus: 'pH 3.5 - 4.5 (Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Infus kontinu amiodarone > 2 jam WAJIB diberikan melalui CVC. Jika terpaksa via vena perifer dalam henti jantung, gunakan kanula lumen besar dan konsentrasi tidak melebihi 2 mg/mL.'
    },
    flushing: {
      preferredFlushSolution: 'Dextrose 5% (D5W)',
      minFlushVolumeMl: 15,
      flushIncompatibilityWarning: 'JANGAN PERNAH membilas jalur amiodarone dengan NaCl 0.9% karena akan memicu kristalisasi amiodarone seketika di dalam lumen kanula.'
    },
    equipment: {
      inlineFilter: 'Wajib 0.22 mikron',
      inlineFilterReason: 'Mencegah mikro-endapan kristal amiodarone masuk ke sirkulasi kapiler paru.',
      containerMaterial: 'Wadah Non-PVC / Bebas DEHP (Kaca/Polietilen)',
      adsorptionRisk: 'Amiodarone menyerap kuat pada wadah/selang PVC (kehilangan hingga 30–40% obat pada jam pertama jika menggunakan set PVC standar).'
    }
  },

  // 5. FUROSEMIDE
  'iv-furosemide': {
    npsaRiskRating: 'Moderate Risk',
    npsaRiskRationale: [
      'Larutan sangat basa (pH 8.0 - 9.3).',
      'Memicu presipitasi kristal putih seketika jika tercampur dengan larutan asam (Milrinone, Dobutamine, Midazolam).'
    ],
    preAdministrationChecks: [
      'Periksa tekanan darah dan status hidrasi.',
      'Cek Kalium, Natrium, dan fungsi ginjal (ureum/kreatinin).'
    ],
    bedsideMonitoring: [
      'Produksi urin per jam.',
      'Tanda-tanda deplesi elektrolit (kram otot, aritmia).'
    ],
    extravasation: {
      classification: 'Irritant',
      tissueToxicity: 'Iritasi lokal akibat pH basa tinggi.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      emergencySteps: [
        'Hentikan injeksi, cabut kanula, berikan kompres hangat dan tinggikan tangan.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'Vena Perifer Dapat Digunakan',
      osmolarityEstimate: '290 mOsm/L',
      phStatus: 'pH 8.0 - 9.3 (Basa Tinggi)',
      isExtremePh: true,
      phlebitisRisk: 'Sedang',
      recommendations: 'Dapat diberikan secara perifer. Kecepatan IV bolus lambat tidak boleh melebihi 4 mg/menit untuk mencegah ototoksisitas permanen.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'Jangan membilas bersama larutan ber-pH < 6.0.'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wajib Terlindung Cahaya (Amber Tubing & Kantong Gelap)'
    }
  },

  // 6. CEFTRIAXONE
  'iv-ceftriaxone': {
    npsaRiskRating: 'Moderate Risk',
    npsaRiskRationale: [
      'INTOKSIKASI FATAL jika dicampur dengan Kalsium (kristal kalsium-seftriakson di paru dan ginjal neonatus).',
      'Rekonstitusi serbuk memiliki displacement value bermakna pada pediatrik.'
    ],
    preAdministrationChecks: [
      'Pastikan pasien BUKAN neonatus yang menerima cairan mengandung kalsium (seperti Ringer Laktat atau Nutrisi Parenteral Kalsium).',
      'Cek riwayat hipersensitivitas anafilaksis penisilin/sefalosporin.'
    ],
    bedsideMonitoring: [
      'Tanda-tanda anafilaksis dan diare terkait Clostridioides difficile.'
    ],
    displacementData: {
      powderWeightMg: 1000,
      displacementVolumeMl: 0.77, // Standar Gray 2021 & BNF for Children
      standardDiluentVolumeMl: 9.23, // 9.23 mL WFI menghasilkan tepat 10.0 mL larutan 100 mg/mL
      totalReconstitutedVolumeMl: 10.0,
      reconstitutedConcentrationMgMl: 100,
      notes: 'Serbuk 1000 mg menempati 0.77 mL volume cair. Jika ditambahkan 10 mL penuh WFI, volume total menjadi 10.77 mL sehingga konsentrasi sebenarnya adalah 92.8 mg/mL (bukan 100 mg/mL), memicu under-dosing sebesar 7.2% pada bayi.'
    },
    extravasation: {
      classification: 'Non-vesicant',
      tissueToxicity: 'Iritasi ringan lokal transien.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      emergencySteps: ['Hentikan infus, pasang kanula di lokasi baru.']
    },
    vascularAccess: {
      preferredRoute: 'Vena Perifer Dapat Digunakan',
      osmolarityEstimate: '350 - 450 mOsm/L',
      phStatus: 'pH 6.6 - 6.7 (Netral)',
      isExtremePh: false,
      phlebitisRisk: 'Rendah',
      recommendations: 'Aman via vena perifer. Berikan bolus IV lambat selama minimal 3–5 menit atau infus intermiten selama 30 menit.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'KONTRAINDIKASI MUTLAK pembilasan dengan cairan mengandung kalsium (Ringer Laktat / Hartmann).'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 7. MEROPENEM
  'iv-meropenem': {
    npsaRiskRating: 'Moderate Risk',
    npsaRiskRationale: [
      'Stabilitas sangat singkat pada suhu kamar (hanya 2-3 jam tergantung pelarut).',
      'Perlu perhitungan displacement value pada neonatus.'
    ],
    preAdministrationChecks: [
      'Konfirmasi riwayat alergi karbapenem / anafilaksis beta-laktam.',
      'Periksa eGFR / klirens kreatinin untuk penyesuaian interval dosis.'
    ],
    bedsideMonitoring: [
      'Tanda kejang pada pasien gangguan ginjal jika dosis tidak disesuaikan.'
    ],
    displacementData: {
      powderWeightMg: 1000,
      displacementVolumeMl: 0.80, // Standar Gray 2021
      standardDiluentVolumeMl: 19.2,
      totalReconstitutedVolumeMl: 20.0,
      reconstitutedConcentrationMgMl: 50,
      notes: 'Serbuk 1000 mg menempati 0.80 mL. Larutkan 1000 mg dalam 20 mL WFI untuk bolus IV (50 mg/mL). Untuk stabilitas maksimal, segera gunakan setelah rekonstitusi.'
    },
    extravasation: {
      classification: 'Non-vesicant',
      tissueToxicity: 'Iritasi lokal minimal.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      emergencySteps: ['Hentikan injeksi, berikan kompres sejuk jika bengkak.']
    },
    vascularAccess: {
      preferredRoute: 'Vena Perifer Dapat Digunakan',
      osmolarityEstimate: '290 - 330 mOsm/L',
      phStatus: 'pH 7.3 - 8.3 (Sedikit Basa)',
      isExtremePh: false,
      phlebitisRisk: 'Rendah',
      recommendations: 'Dapat diberikan perifer. Bolus diberikan 3–5 menit atau infus intermiten / prolonged infusion 3–4 jam untuk patogen MDR.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 10
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 8. VANCOMYCIN
  'iv-vancomycin': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Risiko sindrom leher merah (Red Man Syndrome) akibat degranulasi histamin cepat jika infus < 60 menit.',
      'Iritan kuat yang memicu flebitis dan nekrosis jika ekstravasasi.',
      'Nefrotoksisitas & ototoksisitas memerlukan Therapeutic Drug Monitoring (TDM).'
    ],
    preAdministrationChecks: [
      'Periksa serum kreatinin dan trough level vancomycin sebelum dosis berikutnya.',
      'Pastikan volume pengenceran minimal 100–250 mL pelarut (konsentrasi ≤ 5 mg/mL).'
    ],
    bedsideMonitoring: [
      'Observasi eritema, gatal di wajah/leher/dada (Red Man Syndrome). Jika terjadi, perlambat kecepatan infus hingga separuhnya.',
      'Tekanan darah kontinu (waspadai hipotensi berat).'
    ],
    displacementData: {
      powderWeightMg: 500,
      displacementVolumeMl: 0.30, // Standar Gray 2021
      standardDiluentVolumeMl: 9.7,
      totalReconstitutedVolumeMl: 10.0,
      reconstitutedConcentrationMgMl: 50,
      notes: 'Rekonstitusi vial 500 mg dengan 10 mL WFI menghasilkan larutan pekat 50 mg/mL. Larutan ini WAJIB diencerkan lagi minimal hingga 5 mg/mL (100 mL pelarut per 500 mg) sebelum diberikan ke pasien.'
    },
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Iritasi vaskular hebat, selulitis kimiawi dan nekrosis ulseratif pada ekstravasasi konsentrasi tinggi.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      antidoteName: 'Hyaluronidase Subkutan',
      antidoteDoseAndRoute: 'Infiltrasi 150 unit Hyaluronidase dalam 1 mL NaCl 0.9% subkutan ke seluruh tepi lesi infiltrasi.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi cairan sebanyak mungkin.',
        'Infiltrasi Hyaluronidase subkutan untuk memecah asam hialuronat matriks dan mempercepat absorbsi obat.',
        'Kompres hangat kering dan elevasi ekstremitas.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC Sangat Dianjurkan',
      osmolarityEstimate: '350 - 500 mOsm/L',
      phStatus: 'pH 2.8 - 4.5 (Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Kecepatan infus maksimal 10 mg/menit (minimal 60 menit per 500–1000 mg). Akses CVC sangat dianjurkan untuk infus kontinu atau durasi terapi > 3 hari.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 15,
      flushIncompatibilityWarning: 'Inkompatibel dengan Heparin, Piperacillin-Tazobactam, dan Ceftriaxone.'
    },
    equipment: {
      inlineFilter: 'Dianjurkan jika ada partikel',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 9. POTASSIUM CHLORIDE (KCL PEKAT)
  'iv-potassium-chloride': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'FATAL ALERT: Injeksi bolus langsung KCL pekat memicu henti jantung asistol seketika.',
      'Wajib diencerkan secara menyeluruh dalam kantong infus cairan pembawa sebelum diberikan.',
      'Sangat iritatif terhadap endotel vena perifer.'
    ],
    preAdministrationChecks: [
      'PASTIKAN TIDAK PERNAH DIBERIKAN SEBAGAI BOLUS ATAU PUSH TANPA PENGENCERAN.',
      'Periksa kadar Kalium serum dan fungsi ginjal / klirens kreatinin.',
      'Pastikan terpasang monitor ritme jantung (EKG kontinu) jika koreksi cepat (> 10 mEq/jam).'
    ],
    bedsideMonitoring: [
      'EKG ritme (waspadai gelombang T tinggi/peaked T waves, pemanjangan PR).',
      'Nyeri atau sensasi terbakar di vena perifer.'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Nekrosis koagulatif jaringan dalam akibat hiperkalemia hiperosmolar lokal hebat.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      antidoteName: 'Hyaluronidase Subkutan',
      antidoteDoseAndRoute: 'Infiltrasi 150 IU Hyaluronidase subkutan di sekitar batas lesi ekstravasasi.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi sisa cairan.',
        'Infiltrasi Hyaluronidase subkutan, tinggikan lengan, kompres dingin untuk meredakan inflamasi.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC (Vena Sentral) Wajib',
      osmolarityEstimate: 'Konsentrasi > 40 mEq/L memiliki osmolaritas > 500 mOsm/L',
      phStatus: 'pH 4.0 - 8.0',
      isExtremePh: false,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Konsentrasi perifer maksimal 40 mEq/L dengan kecepatan tidak melebihi 10 mEq/jam. Konsentrasi 40–80 mEq/L dan kecepatan hingga 20 mEq/jam WAJIB via CVC dengan monitor EKG.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 10
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 10. PROPOFOL
  'iv-propofol': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Emulsi lipid steril tanpa pengawet: media pertumbuhan bakteri yang sangat subur.',
      'Risiko Propofol Infusion Syndrome (PRIS) pada infus jangka panjang (> 48 jam) atau dosis tinggi (> 4 mg/kg/jam).',
      'Depresi pernapasan dan hipotensi berat.'
    ],
    preAdministrationChecks: [
      'Pastikan fasilitas resusitasi jalan napas (intubasi, bag-valve mask, suction) siap di samping pasien.',
      'Verifikasi bahwa vial propofol baru saja dibuka (< 6–12 jam).'
    ],
    bedsideMonitoring: [
      'SpO2, laju napas, tekanan darah kontinu, trigliserida serum (jika infus > 24 jam).'
    ],
    extravasation: {
      classification: 'Irritant',
      tissueToxicity: 'Iritasi dan pembengkakan lokal; risiko nekrosis rendah kecuali volume sangat besar.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      emergencySteps: [
        'Hentikan injeksi, cabut kanula, berikan kompres hangat dan elevasi.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'Vena Perifer Dapat Digunakan',
      osmolarityEstimate: '300 mOsm/L (Isotonik)',
      phStatus: 'pH 6.0 - 8.5 (Netral)',
      isExtremePh: false,
      phlebitisRisk: 'Sedang',
      recommendations: 'Dapat diberikan perifer. Gunakan vena besar (fossa antekubiti) untuk mengurangi sensasi nyeri terbakar saat injeksi. Jangan gunakan filter 0.22 mikron karena emulsi lemak akan tersumbat.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% atau D5W',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'Bilas jalur tuntas untuk membersihkan sisa emulsi lemak dari kanula.'
    },
    equipment: {
      inlineFilter: 'Wajib 1.2 mikron',
      inlineFilterReason: 'Emulsi lemak hanya boleh melewati filter berukuran ≥ 1.2 mikron. FILTER 0.22 MIKRON AKAN PECAH ATAU TERSUMBAT!',
      containerMaterial: 'Wadah Kaca atau Polietilen Bebas DEHP',
      adsorptionRisk: 'Dapat melarutkan plasticizer DEHP dari PVC standar selama kontak berkepanjangan.'
    }
  },

  // 11. MIDAZOLAM
  'iv-midazolam': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Sedatif kuat dengan risiko depresi napas mendadak dan apnea.',
      'Inkompatibel dengan larutan alkali (bikarbonat, furosemid) - memicu presipitasi seketika.'
    ],
    preAdministrationChecks: [
      'Pastikan antidot Flumazenil tersedia di ruang tindakan.',
      'Peralatan pemeliharaan jalan napas (oksigen, suction) harus siap pakai.'
    ],
    bedsideMonitoring: [
      'Kedalaman sedasi (skor RASS), saturasi oksigen kontinu, dan frekuensi pernapasan.'
    ],
    extravasation: {
      classification: 'Non-vesicant',
      tissueToxicity: 'Iritasi minimal pada jaringan.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      emergencySteps: ['Hentikan injeksi, reposisi kanula.']
    },
    vascularAccess: {
      preferredRoute: 'Vena Perifer Dapat Digunakan',
      osmolarityEstimate: '290 - 320 mOsm/L',
      phStatus: 'pH 3.0 - 3.6 (Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Sedang',
      recommendations: 'Dapat perifer atau sentral. Bolus lambat selama minimal 2 menit.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: 'Jangan dibilas dengan larutan alkali.'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 12. NICARDIPINE
  'iv-nicardipine': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Antihipertensi arteriolar poten; titrasi harus presisi untuk mencegah penurunan perfusi koroner/serebral.',
      'Sangat iritatif terhadap endotel vena perifer (risiko flebitis tinggi jika infus > 12 jam pada vena yang sama).'
    ],
    preAdministrationChecks: [
      'Pasang monitor tekanan darah kontinu (arterial line atau NIBP otomatis tiap 5 menit saat titrasi).',
      'Verifikasi pengenceran dalam D5W atau NaCl 0.9% hingga konsentrasi 0.1–0.2 mg/mL.'
    ],
    bedsideMonitoring: [
      'Tekanan darah sistolik/diastolik, denyut nadi (waspadai takikardia refleks).'
    ],
    extravasation: {
      classification: 'Irritant',
      tissueToxicity: 'Iritasi dan nyeri lokal parah.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      emergencySteps: [
        'Hentikan infus, aspirasi cairan dari kanula, kompres hangat.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC Sangat Dianjurkan',
      osmolarityEstimate: '290 - 330 mOsm/L',
      phStatus: 'pH 3.5 - 4.5 (Asam)',
      isExtremePh: true,
      phlebitisRisk: 'Tinggi',
      recommendations: 'Ganti lokasi kanula vena perifer setiap 12 jam untuk mencegah flebitis berat, atau gunakan CVC untuk infus jangka panjang.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% atau D5W',
      minFlushVolumeMl: 10
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  },

  // 13. CISPLATIN (ONKOLOGI VESIKAN)
  'iv-cisplatin': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Sitotoksik berisiko tinggi nefrotoksisitas akut jika tanpa hidrasi agresif.',
      'Inkompatibel dengan logam aluminium (membentuk presipitasi hitam platinum).',
      'Vesikan dengan risiko nekrosis jaringan.'
    ],
    preAdministrationChecks: [
      'Verifikasi hidrasi pra-infus minimal 1–2 Liter cairan NaCl 0.9%.',
      'Periksa laju filtrasi glomerulus / kreatinin serum dan elektrolit (Mg, K).',
      'PASTIKAN jarum, spuit, atau set infus TIDAK mengandung komponen ALUMINIUM.'
    ],
    bedsideMonitoring: [
      'Output urin minimal 100 mL/jam selama dan setelah infus.',
      'Situs infus setiap 30–60 menit untuk pencegahan ekstravasasi.'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Nekrosis jaringan progresif, ulserasi dalam, dan kerusakan saraf permanen pada volume > 20 mL atau konsentrasi > 0.5 mg/mL.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      antidoteName: 'Sodium Thiosulfate 1/6 Molar Subkutan',
      antidoteDoseAndRoute: 'Campurkan 4 mL Sodium Thiosulfate 10% dengan 6 mL WFI untuk mendapatkan larutan 1/6 M (konsentrasi ~4%). Infiltrasi 5–10 mL subkutan di sekitar lesi.',
      antidoteInstructions: 'Infiltrasi sesegera mungkin untuk mengikat molekul platinum reaktif.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi 3–5 mL darah dari kateter.',
        'Infiltrasi Sodium Thiosulfate 1/6 M subkutan secara sirkuler di sekitar ekstravasasi.',
        'Berikan kompres dingin 15 menit 4 kali sehari selama 48 jam.',
        'Konsultasikan ke tim bedah onkologi/plastik.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC Sangat Dianjurkan',
      osmolarityEstimate: '300 - 450 mOsm/L',
      phStatus: 'pH 3.5 - 5.5',
      isExtremePh: false,
      phlebitisRisk: 'Tinggi',
      recommendations: 'Gunakan jalur vena sentral (PICC atau chemoport) untuk pemberian aman regimen platinum.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 20,
      flushIncompatibilityWarning: 'Jangan gunakan D5W murni untuk pembilasan (menyebabkan hidrolisis platinum menjadi metabolit toksik).'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah Terlindung Cahaya (Amber Bag)',
      adsorptionRisk: 'Hindari alat yang mengandung komponen aluminium.'
    }
  },

  // 14. DOXORUBICIN (VESIKAN ANTRASIKLIN)
  'iv-doxorubicin': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Vesikan DNA-intercalating paling berbahaya: memicu ulserasi jaringan kronis yang menyebar progresif selama berbulan-bulan.',
      'Kardiotoksisitas kumulatif (dosis maksimal seumur hidup 450–550 mg/m2).'
    ],
    preAdministrationChecks: [
      'Konfirmasi LVEF (Echocardiography) ≥ 50%.',
      'Uji patensi vena dengan aspirasi darah bebas sebelum menyuntikkan doxorubicin.'
    ],
    bedsideMonitoring: [
      'Pantau ketat lokasi kanula setiap 2–3 menit selama injeksi bolus lambat.'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Nekrosis jaringan dalam, pembentukan ulkus nekrotik persisten yang memerlukan eksisi bedah dan cangkok kulit.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      antidoteName: 'Dexrazoxane IV (Savene / Totect)',
      antidoteDoseAndRoute: 'Infus IV Dexrazoxane pada vena yang berbeda: Hari 1: 1000 mg/m2, Hari 2: 1000 mg/m2, Hari 3: 500 mg/m2.',
      antidoteInstructions: 'Mulai infus Dexrazoxane secepatnya dalam kurun 6 jam pasca-ekstravasasi. Jika Dexrazoxane tidak tersedia, gunakan DMSO 99% topikal 4 tetes per 10 cm2.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi sisa obat dari kanula.',
        'Berikan kompres es dingin kering selama 15–30 menit.',
        'Mulai terapi antidot Dexrazoxane intravena sistemik sesegera mungkin (< 6 jam).'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC (Vena Sentral) Wajib',
      osmolarityEstimate: '290 mOsm/L',
      phStatus: 'pH 4.0 - 5.5',
      isExtremePh: false,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Sangat direkomendasikan melalui kateter CVC atau port kemoterapi terverifikasi paten.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 20
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah Terlindung Cahaya (Amber Bag)'
    }
  },

  // 15. VINCRISTINE (VESIKAN VINCA ALKALOID - FATAL INTRATHECAL)
  'iv-vincristine': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'BLACK BOX NPSA FATAL: Pemberian intratekal (ke saraf tulang belakang) SELALU BERAKHIR KEMATIAN akibat ensefalomielopati asending.',
      'Vesikan potensi tinggi pengikat tubulin.'
    ],
    preAdministrationChecks: [
      'PASTIKAN PEMBERIAN HANYA SECARA INTRAVENA (DILARANG KERAS INTRATEKAL).',
      'Kemasan harus diberi label peringatan tegas warna mencolok: "FOR INTRAVENOUS USE ONLY - FATAL IF GIVEN BY OTHER ROUTES".'
    ],
    bedsideMonitoring: [
      'Situs infus setiap menit selama injeksi.'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Nekrosis jaringan berat dan ulserasi.',
      thermalIntervention: 'Kompres Kering Hangat (Dispersi)',
      antidoteName: 'Hyaluronidase Subkutan',
      antidoteDoseAndRoute: 'Infiltrasi 150–300 unit Hyaluronidase dalam 1 mL NaCl 0.9% subkutan di sekitar area infiltrasi.',
      antidoteInstructions: 'JANGAN DIBERIKAN KOMPRES DINGIN karena suhu dingin akan memperparah toksisitas vinca alkaloid.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi sisa obat.',
        'Infiltrasi Hyaluronidase subkutan di sekeliling lesi.',
        'Berikan kompres HANGAT kering (suhu hangat meningkatkan difusi dan inaktivasi obat).'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC Sangat Dianjurkan',
      osmolarityEstimate: '300 mOsm/L',
      phStatus: 'pH 3.5 - 5.5',
      isExtremePh: false,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Gunakan CVC atau minibag 50 mL NaCl 0.9% yang diinfuskan selama 10–15 menit dengan pengawasan terus-menerus (bukan syringe push).'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 20
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah Terlindung Cahaya (Amber Bag)'
    }
  },

  // 16. CALCIUM CHLORIDE & GLUCONATE
  'iv-calcium-chloride': {
    npsaRiskRating: 'High Risk',
    npsaRiskRationale: [
      'Sediaan sangat hiperosmolar (~2000 mOsm/L) dan sangat vesikan.',
      'Ekstravasasi menyebabkan kalsifikasi jaringan, nekrosis dalam, dan sloughing kulit berat.'
    ],
    preAdministrationChecks: [
      'Konfirmasi patensi kanula vena dengan tes aspirasi darah.',
      'Kalsium klorida mengandung kalsium elemental 3x lebih besar dibanding kalsium glukonat.'
    ],
    bedsideMonitoring: [
      'Denyut jantung dan EKG kontinu (waspadai bradikardia dan aritmia saat injeksi bolus).'
    ],
    extravasation: {
      classification: 'Vesicant',
      tissueToxicity: 'Kalsifikasi subkutan, nekrosis jaringan iskemik dalam, dan pembentukan eschar.',
      thermalIntervention: 'Kompres Kering Dingin (Vasokonstriksi)',
      antidoteName: 'Sodium Thiosulfate Subkutan',
      antidoteDoseAndRoute: 'Infiltrasi Sodium Thiosulfate 1/6 M subkutan ke seluruh area terdampak.',
      emergencySteps: [
        'Hentikan infus seketika, aspirasi cairan dari kateter.',
        'Infiltrasi Sodium Thiosulfate untuk mengendapkan kalsium menjadi garam kalsium tiosulfat yang larut.',
        'Kompres dingin kering dan elevasi ekstremitas.'
      ]
    },
    vascularAccess: {
      preferredRoute: 'CVC (Vena Sentral) Wajib',
      osmolarityEstimate: '> 2000 mOsm/L (Sangat Hiperosmolar)',
      phStatus: 'pH 5.5 - 7.5',
      isExtremePh: false,
      phlebitisRisk: 'Sangat Tinggi',
      recommendations: 'Kalsium klorida 10% WAJIB diberikan melalui CVC kecuali dalam henti jantung akut. Untuk akses perifer non-darurat, gunakan Kalsium Glukonat 10% yang jauh lebih ramah vena.'
    },
    flushing: {
      preferredFlushSolution: 'NaCl 0.9% (Normal Saline)',
      minFlushVolumeMl: 15,
      flushIncompatibilityWarning: 'KONTRAINDIKASI pembilasan dengan Bikarbonat, Fosfat, atau Seftriakson (presipitasi kristal kalsium keras).'
    },
    equipment: {
      inlineFilter: 'Tidak Diperlukan',
      containerMaterial: 'Wadah PVC Standar Aman'
    }
  }
};

// =====================================================================
// PRESET DAFTAR OBAT SERBUK & NILAI PEMINDAHAN (DISPLACEMENT VALUES)
// Standar Alistair Gray (2021) & British National Formulary for Children
// =====================================================================

export interface PediatricDisplacementPreset {
  id: string;
  drugName: string;
  vialStrengthMg: number;
  displacementVolumeMl: number;
  recommendedDiluent: string;
  defaultDiluentVolumeMl: number;
  resultingVolumeMl: number;
  resultingConcentrationMgMl: number;
  clinicalPearls: string;
}

export const PEDIATRIC_DISPLACEMENT_PRESETS: PediatricDisplacementPreset[] = [
  {
    id: 'disp-ceftriaxone-1g',
    drugName: 'Ceftriaxone 1 g (1000 mg) Vial',
    vialStrengthMg: 1000,
    displacementVolumeMl: 0.77,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.23,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 100,
    clinicalPearls: 'Serbuk 1g memindahkan 0.77 mL air. Untuk menghasilkan tepat 100 mg/mL, tambahkan 9.23 mL WFI. Jika ditambah 10 mL penuh, volume total jadi 10.77 mL dan konsentrasi turun menjadi 92.8 mg/mL.'
  },
  {
    id: 'disp-ceftriaxone-500mg',
    drugName: 'Ceftriaxone 500 mg Vial',
    vialStrengthMg: 500,
    displacementVolumeMl: 0.38,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 4.62,
    resultingVolumeMl: 5.0,
    resultingConcentrationMgMl: 100,
    clinicalPearls: 'Serbuk 500 mg memindahkan 0.38 mL air. Sangat ideal untuk dosis bayi/neonatus dengan pengenceran presisi.'
  },
  {
    id: 'disp-meropenem-1g',
    drugName: 'Meropenem 1 g (1000 mg) Vial',
    vialStrengthMg: 1000,
    displacementVolumeMl: 0.80,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 19.2,
    resultingVolumeMl: 20.0,
    resultingConcentrationMgMl: 50,
    clinicalPearls: 'Serbuk 1g memindahkan 0.80 mL. Larutkan dengan 19.2 mL WFI untuk mendapatkan larutan persis 50 mg/mL dalam 20 mL total.'
  },
  {
    id: 'disp-meropenem-500mg',
    drugName: 'Meropenem 500 mg Vial',
    vialStrengthMg: 500,
    displacementVolumeMl: 0.40,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.6,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 50,
    clinicalPearls: 'Serbuk 500 mg memindahkan 0.40 mL. Tambahkan 9.6 mL WFI untuk total 10.0 mL konsentrasi 50 mg/mL.'
  },
  {
    id: 'disp-vancomycin-500mg',
    drugName: 'Vancomycin 500 mg Vial',
    vialStrengthMg: 500,
    displacementVolumeMl: 0.30,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.7,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 50,
    clinicalPearls: 'Rekonstitusi awal dengan 9.7 mL WFI menghasilkan larutan pekat 50 mg/mL. Larutan ini harus diencerkan lagi minimal hingga konsentrasi ≤ 5 mg/mL sebelum infus.'
  },
  {
    id: 'disp-vancomycin-1g',
    drugName: 'Vancomycin 1 g (1000 mg) Vial',
    vialStrengthMg: 1000,
    displacementVolumeMl: 0.60,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 19.4,
    resultingVolumeMl: 20.0,
    resultingConcentrationMgMl: 50,
    clinicalPearls: 'Serbuk 1000 mg memindahkan 0.60 mL. Rekonstitusi awal dengan 19.4 mL WFI untuk larutan antara 50 mg/mL.'
  },
  {
    id: 'disp-ampicillin-1g',
    drugName: 'Ampicillin 1 g (1000 mg) Vial',
    vialStrengthMg: 1000,
    displacementVolumeMl: 0.60,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.4,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 100,
    clinicalPearls: 'Serbuk 1g memindahkan 0.60 mL cairan. Stabilitas sangat terbatas (gunakan dalam kurun 1 jam setelah rekonstitusi).'
  },
  {
    id: 'disp-ampicillin-sulbactam-1500mg',
    drugName: 'Ampicillin + Sulbactam 1.5 g Vial',
    vialStrengthMg: 1500,
    displacementVolumeMl: 0.85,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 4.15,
    resultingVolumeMl: 5.0,
    resultingConcentrationMgMl: 300,
    clinicalPearls: 'Serbuk kombinasi 1.5 g memindahkan 0.85 mL. Tambahkan 4.15 mL WFI untuk mendapatkan total volume 5.0 mL (300 mg/mL total obat aktif).'
  },
  {
    id: 'disp-cefotaxime-1g',
    drugName: 'Cefotaxime 1 g (1000 mg) Vial',
    vialStrengthMg: 1000,
    displacementVolumeMl: 0.50,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.5,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 100,
    clinicalPearls: 'Serbuk 1g memindahkan 0.50 mL. Tambahkan 9.5 mL WFI untuk mendapatkan larutan tepat 100 mg/mL.'
  },
  {
    id: 'disp-cefazolin-1g',
    drugName: 'Cefazolin 1 g (1000 mg) Vial',
    vialStrengthMg: 1000,
    displacementVolumeMl: 0.60,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.4,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 100,
    clinicalPearls: 'Serbuk 1g memindahkan 0.60 mL. Standar profilaksis bedah dan pengenceran pediatrik.'
  },
  {
    id: 'disp-cefoperazone-sulbactam-2g',
    drugName: 'Cefoperazone + Sulbactam 2 g (1g:1g) Vial',
    vialStrengthMg: 2000,
    displacementVolumeMl: 1.20,
    recommendedDiluent: 'Water for Injection (WFI) atau D5W',
    defaultDiluentVolumeMl: 8.8,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 200,
    clinicalPearls: 'Serbuk 2g memiliki volume pemindahan besar yaitu 1.20 mL. Tambahkan 8.8 mL pelarut untuk mendapatkan tepat 10 mL larutan 200 mg/mL.'
  },
  {
    id: 'disp-acyclovir-250mg',
    drugName: 'Acyclovir 250 mg Vial',
    vialStrengthMg: 250,
    displacementVolumeMl: 0.18,
    recommendedDiluent: 'Water for Injection (WFI)',
    defaultDiluentVolumeMl: 9.82,
    resultingVolumeMl: 10.0,
    resultingConcentrationMgMl: 25,
    clinicalPearls: 'Larutan hasil rekonstitusi memiliki pH sangat basa (~11). Wajib diencerkan lebih lanjut ke konsentrasi ≤ 7 mg/mL dan diinfus lambat minimal 1 jam untuk mencegah gagal ginjal kristaluria.'
  }
];

// =====================================================================
// HELPER OTOMATIS GENERATOR PROFILE GRAY (2021) UNTUK OBAT LAIN
// Menjamin 100% obat memiliki metadata standar Gray tanpa duplikasi data
// =====================================================================

export function getGrayIdgClinicalDetails(drug: IvDrugProfile): GrayIdgClinicalDetails {
  // Jika sudah ada mapping manual spesifik di kamus, gunakan data tersebut
  if (GRAY_IDG_ENRICHMENTS[drug.id]) {
    return GRAY_IDG_ENRICHMENTS[drug.id];
  }

  // Jika tidak ada di kamus, bangun profil dinamis berdasarkan parameter kimia-fisik obat yang ada
  const phString = drug.phRange || '4.5 - 7.0';
  const isAcidic = phString.includes('2.') || phString.includes('3.') || phString.includes('Asam');
  const isAlkaline = phString.includes('8.') || phString.includes('9.') || phString.includes('10.') || phString.includes('Basa');
  const isExtremePh = isAcidic || isAlkaline;

  const isHighRiskCategory = 
    drug.category === 'Vasoaktif / Inotropik' || 
    drug.category === 'Kemoterapi Onkologi & Imunologi' || 
    drug.category === 'Sedasi & Anestesi' || 
    drug.category === 'Elektrolit & Koreksi';

  const npsaRiskRating: NpsaRiskLevel = isHighRiskCategory ? 'High Risk' : isExtremePh ? 'Moderate Risk' : 'Low Risk';

  const isVesicantCategory = drug.category === 'Kemoterapi Onkologi & Imunologi' || drug.category === 'Vasoaktif / Inotropik';
  const extravasationClass = isVesicantCategory ? 'Vesicant' : isExtremePh ? 'Irritant' : 'Non-vesicant';

  const centralLinePreferred = isVesicantCategory || (isExtremePh && drug.administration.infusionRoute.includes('Syringe'));

  return {
    npsaRiskRating,
    npsaRiskRationale: [
      `Kategori klinis: ${drug.category}.`,
      `Profil keasaman: ${drug.phRange}.`,
      isExtremePh ? 'Risiko flebitis akibat pH di luar rentang fisiologis darah (7.35–7.45).' : 'Rentang keamanan administrasi standar RS.'
    ],
    preAdministrationChecks: [
      'Verifikasi identitas pasien, etiket obat, tanggal kedaluwarsa, dan kepatenan kanula vena.',
      'Periksa kejernihan larutan: tidak boleh terdapat endapan atau perubahan warna abnormal.'
    ],
    bedsideMonitoring: [
      'Pantau tanda vital pasien (tekanan darah, denyut nadi, laju napas).',
      'Inspeksi area insersi kateter untuk mendeteksi dini nyeri, eritema, atau pembengkakan.'
    ],
    extravasation: {
      classification: extravasationClass,
      tissueToxicity: extravasationClass === 'Vesicant' 
        ? 'Risiko nekrosis jaringan pada ekstravasasi konsentrasi pekat.' 
        : extravasationClass === 'Irritant' 
        ? 'Risiko inflamasi dan nyeri lokal.' 
        : 'Iritasi minimal.',
      thermalIntervention: extravasationClass === 'Vesicant' 
        ? 'Kompres Kering Hangat (Dispersi)' 
        : 'Kompres Kering Dingin (Vasokonstriksi)',
      emergencySteps: [
        'Hentikan infus seketika, jangan mencabut kateter jika obat berpotensi vesikan.',
        'Aspirasi perlahan sisa cairan melalui lumen kateter, lalu lepaskan kateter.',
        'Elevasikan ekstremitas dan pantau perluasan eritema.'
      ]
    },
    vascularAccess: {
      preferredRoute: centralLinePreferred ? 'CVC Sangat Dianjurkan' : 'Vena Perifer Dapat Digunakan',
      osmolarityEstimate: '280 - 350 mOsm/L (Estimasi pengenceran standar)',
      phStatus: drug.phRange,
      isExtremePh,
      phlebitisRisk: isExtremePh ? 'Tinggi' : 'Rendah',
      recommendations: centralLinePreferred 
        ? 'Disarankan menggunakan kateter vena sentral (CVC) untuk mengurangi risiko flebitis endotel vena.'
        : 'Aman diberikan melalui vena perifer besar dengan pemantauan rutin.'
    },
    flushing: {
      preferredFlushSolution: drug.diluents.ns ? 'NaCl 0.9% (Normal Saline)' : 'Dextrose 5% (D5W)',
      minFlushVolumeMl: 10,
      flushIncompatibilityWarning: !drug.diluents.ns ? 'HINDARI pembilasan dengan Saline jika obat tidak kompatibel dengan NaCl!' : undefined
    },
    equipment: {
      inlineFilter: drug.stability.filterRequired 
        ? (drug.stability.filterType?.includes('1.2') ? 'Wajib 1.2 mikron' : 'Wajib 0.22 mikron') 
        : 'Tidak Diperlukan',
      inlineFilterReason: drug.stability.filterRequired ? (drug.stability.filterType || 'Retensi partikulat') : undefined,
      containerMaterial: drug.stability.lightProtectionRequired 
        ? 'Wajib Terlindung Cahaya (Amber Tubing & Kantong Gelap)' 
        : 'Wadah PVC Standar Aman'
    }
  };
}

// =====================================================================
// FORMULA KALKULATOR DISPLACEMENT VALUE (ALISTAIR GRAY 2021)
// =====================================================================

export interface DisplacementCalculationResult {
  vialStrengthMg: number;
  displacementVolumeMl: number;
  diluentVolumeAddedMl: number;
  totalSolutionVolumeMl: number;
  trueConcentrationMgMl: number;
  targetPatientDoseMg: number;
  requiredVolumeMl: number;
  nominalVolumeIfDisplacementIgnoredMl: number;
  dosingErrorPercentage: number;
  interpretationMessage: string;
}

export function calculateDisplacementDose(
  vialStrengthMg: number,
  displacementVolumeMl: number,
  diluentVolumeAddedMl: number,
  targetPatientDoseMg: number
): DisplacementCalculationResult {
  const totalSolutionVolumeMl = diluentVolumeAddedMl + displacementVolumeMl;
  const trueConcentrationMgMl = vialStrengthMg / totalSolutionVolumeMl;
  const requiredVolumeMl = targetPatientDoseMg / trueConcentrationMgMl;

  // Jika serbuk diabaikan (anggapan volume total = hanya cairan pelarut):
  const nominalConcentrationMgMl = vialStrengthMg / diluentVolumeAddedMl;
  const nominalVolumeIfDisplacementIgnoredMl = targetPatientDoseMg / nominalConcentrationMgMl;

  // Selisih persentase under-dosing jika perawat mengabaikan volume serbuk:
  // Volume yang diambil jika serbuk diabaikan akan lebih sedikit daripada yang seharusnya
  const dosingErrorPercentage = ((nominalVolumeIfDisplacementIgnoredMl - requiredVolumeMl) / requiredVolumeMl) * 100;

  let interpretationMessage = '';
  if (Math.abs(dosingErrorPercentage) >= 5) {
    interpretationMessage = `⚠️ PERINGATAN KLINIS: Mengabaikan volume serbuk akan menyebabkan UNDER-DOSING sebesar ${Math.abs(dosingErrorPercentage).toFixed(1)}%! Pasien hanya akan menerima ${(targetPatientDoseMg * (1 - Math.abs(dosingErrorPercentage)/100)).toFixed(1)} mg dari target ${targetPatientDoseMg} mg. Gunakan volume spuit presisi: ${requiredVolumeMl.toFixed(2)} mL.`;
  } else {
    interpretationMessage = `Volume pemindahan serbuk memberikan variasi ${Math.abs(dosingErrorPercentage).toFixed(1)}%. Tarik tepat ${requiredVolumeMl.toFixed(2)} mL larutan hasil rekonstitusi.`;
  }

  return {
    vialStrengthMg,
    displacementVolumeMl,
    diluentVolumeAddedMl,
    totalSolutionVolumeMl,
    trueConcentrationMgMl,
    targetPatientDoseMg,
    requiredVolumeMl,
    nominalVolumeIfDisplacementIgnoredMl,
    dosingErrorPercentage,
    interpretationMessage
  };
}
