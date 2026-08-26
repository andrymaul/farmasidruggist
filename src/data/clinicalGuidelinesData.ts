import { ClinicalGuideline } from '../types';

/**
 * CLINICAL PRACTICE THERAPY GUIDELINES DATABASE (PANDUAN TERAPI KLINIS INDONESIA)
 * Dikompilasi dan diselaraskan secara resmi dengan:
 * - PNPK Kemenkes RI (Pedoman Nasional Pelayanan Kedokteran)
 * - PERKI (Perhimpunan Dokter Spesialis Kardiovaskular Indonesia) 2023/2024
 * - PERKENI (Perkumpulan Endokrinologi Indonesia) 2023/2024
 * - PAPDI (Perhimpunan Dokter Spesialis Penyakit Dalam Indonesia)
 * - PDPI (Perhimpunan Dokter Paru Indonesia)
 * - IDAI (Ikatan Dokter Anak Indonesia)
 * - POGI (Perkumpulan Obstetri dan Ginekologi Indonesia)
 * - PERDOSSI (Perhimpunan Dokter Spesialis Neurologi Indonesia)
 * - IRA (Indonesian Rheumatology Association)
 * - PERNEFRI (Perhimpunan Nefrologi Indonesia)
 * - PGI-PEGI (Perkumpulan Gastroenterologi Indonesia)
 * - Formularium Nasional (FORNAS) BPJS Kesehatan
 */

export const CLINICAL_GUIDELINES_DATABASE: ClinicalGuideline[] = [
  // ==========================================
  // 1. KARDIOVASKULAR
  // ==========================================
  {
    id: 'guideline-hypertension',
    diseaseName: 'Hipertensi Primer / Esensial Dewasa',
    category: 'Kardiovaskular',
    organization: 'PERKI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'I10',
    indonesianKeywords: ['darah tinggi', 'tensi tinggi', 'hipertensi', 'amlodipine', 'candesartan', 'captopril', 'tekanan darah'],
    summary: 'Peningkatan tekanan darah persisten (Sistolik >= 140 mmHg dan/atau Diastolik >= 90 mmHg). Penatalaksanaan bertujuan mencegah komplikasi stroke, gagal jantung, infark miokard, dan penyakit ginjal kronis.',
    targetGoals: [
      'Target Umum: < 130/80 mmHg (Konsensus PERKI 2024 / ACC-AHA)',
      'Pasien DM & CKD dengan Proteinuria: < 130/80 mmHg',
      'Lansia / Geriatri Frail: < 140/90 mmHg (Sistolik 130-139 mmHg toleransi baik)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Amlodipine',
        dosage: '5 - 10 mg per oral sekali sehari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Calcium Channel Blocker (CCB) dihidropiridin; sangat efektif pada lansia dan pasien dengan resistensi vaskular perifer tinggi.'
      },
      {
        drugName: 'Candesartan',
        dosage: '8 - 16 mg per oral sekali sehari (Maks 32 mg/hari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Angiotensin Receptor Blocker (ARB); pilihan utama pada pasien dengan Diabetes, CKD dengan mikroalbuminuria, atau riwayat batuk akibat ACEi.'
      },
      {
        drugName: 'Lisinopril',
        dosage: '10 - 20 mg per oral sekali sehari (Maks 40 mg/hari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'ACE Inhibitor; proteksi kardiorenal superior. Hentikan bila timbul batuk kering membandel atau angioedema.'
      },
      {
        drugName: 'Hydrochlorothiazide',
        dosage: '12.5 - 25 mg per oral sekali sehari pagi hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Diuretik Tiazid; sering dikombinasikan dosis rendah dengan ACEi/ARB atau CCB.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Bisoprolol',
        dosage: '2.5 - 5 mg per oral sekali sehari (Maks 10 mg/hari)',
        role: 'Kombinasi / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Beta-1 Blocker Kardioselektif; lini pertama jika terdapat indikasi spesifik (PJK, Pasca-Infark Miokard, atau Gagal Jantung HFrEF).'
      },
      {
        drugName: 'Spironolactone',
        dosage: '25 - 50 mg per oral sekali sehari',
        role: 'Kombinasi / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Mineralocorticoid Receptor Antagonist (MRA); pilihan utama untuk Hipertensi Resisten (setelah kombinasi 3 obat: ACEi/ARB + CCB + Diuretik).'
      }
    ],
    nonPharmacological: [
      'Diet Rendah Garam (DASH Diet): Batasi asupan natrium < 2 gram/hari (< 1 sendok teh garam dapur).',
      'Penurunan Berat Badan: Target BMI 18.5 - 22.9 kg/m² (menurunkan TD 1 mmHg per 1 kg BB turun).',
      'Aktivitas Fisik Aerobik Teratur: Jalan cepat / bersepeda minimal 150 menit/minggu (30 menit/hari, 5 hari/minggu).',
      'Hentikan kebiasaan merokok dan batasi konsumsi kafein/alkohol.'
    ],
    specialPopulations: [
      {
        condition: 'Ibu Hamil (Hipertensi Gestasional / Preeklamsia)',
        recommendation: 'Lini pertama: Methyldopa 250-500 mg TID, Nifedipine lepas lambat 20-30 mg/hari, atau Labetalol.',
        contraindicatedDrugs: ['ACE Inhibitor (Captopril/Lisinopril/Ramipril) - Teratogenik Fetopati Renal Fatal', 'ARB (Candesartan/Valsartan/Losartan) - Teratogenik Fatal', 'Spironolactone / Diuretik dosis tinggi']
      },
      {
        condition: 'Penyakit Ginjal Kronis (CKD Stage 1-3 dengan Albuminuria)',
        recommendation: 'Prioritaskan ACEi (Lisinopril/Ramipril) atau ARB (Candesartan/Losartan) untuk efek antiproteinuria dan renoprotektif.',
        contraindicatedDrugs: ['Kombinasi simultan ACEi + ARB (meningkatkan risiko hiperkalemia dan gagal ginjal akut tanpa manfaat klinis)']
      }
    ],
    monitoringParameters: [
      'Tekanan darah berkala (Home Blood Pressure Monitoring / HBPM)',
      'Kadar Kalium Serum dan Serum Kreatinin / eGFR (evaluasi 2-4 minggu setelah inisiasi/peningkatan dosis ACEi/ARB/Diuretik)',
      'Tanda edema tungkai perifer (pada penggunaan CCB Amlodipine)'
    ],
    sourceGuidelines: 'Konsensus Penatalaksanaan Hipertensi PERKI 2024 / PNPK Kardiovaskular Kemenkes RI',
    updatedYear: '2024',
    keyClinicalAlert: 'Untuk Hipertensi Derajat 2 (TD >= 160/100 mmHg), sangat direkomendasikan memulai terapi dengan KOMBINASI 2 OBAT dari kelas berbeda (misal: ARB + CCB) sejak awal.'
  },

  {
    id: 'guideline-hfref',
    diseaseName: 'Gagal Jantung Fraksi Ejeksi Menurun (HFrEF / LVEF <= 40%)',
    category: 'Kardiovaskular',
    organization: 'PERKI',
    fornasTier: 'Faskes 2/3 (RS Rujukan)',
    icd10: 'I50.2',
    indonesianKeywords: ['gagal jantung', 'jantung bengkak', 'sesak jantung', 'hfref', 'sacubitril', 'bisoprolol', 'empagliflozin', 'edema paru'],
    summary: 'Sindrom klinis kompleks akibat ketidakmampuan ventrikel kiri memompa darah secara adekuat (LVEF <= 40%). Penatalaksanaan modern menerapkan 4 Pilar Terapi Terarah Pedoman (GDMT) untuk menurunkan mortalitas dan rehospitalisasi.',
    targetGoals: [
      'Penurunan Mortalitas Kardiovaskular & Rehospitalisasi',
      'Perbaikan Status Fungsional NYHA (Kelas I - II)',
      'Mencapai Status Euvolik (Bebas Kongesti & Edema)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Sacubitril / Valsartan',
        dosage: 'Awal 24/26 mg atau 49/51 mg BID, titrasi bertahap tiap 2-4 minggu ke Dosis Target 97/103 mg BID',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Pilar 1 (ARNI): Pengganti ACEi/ARB lini pertama; terbukti menurunkan mortalitas kardiovaskular 20% dibanding Enalapril.'
      },
      {
        drugName: 'Bisoprolol',
        dosage: 'Awal 1.25 mg sekali sehari, titrasi bertahap tiap 1-2 minggu ke Dosis Target 10 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilar 2 (Beta Blocker Kardioselektif): Menurunkan denyut jantung, mencegah aritmia ventrikel, dan meremodelling ventrikel kiri.'
      },
      {
        drugName: 'Spironolactone',
        dosage: 'Awal 12.5 - 25 mg sekali sehari, titrasi ke Dosis Target 50 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilar 3 (MRA): Menghambat fibrosis miokard dan retensi natrium yang dimediasi aldosteron.'
      },
      {
        drugName: 'Empagliflozin',
        dosage: '10 mg per oral sekali sehari pada pagi hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Pilar 4 (SGLT2 Inhibitor): Mengurangi beban kerja jantung dan menurunkan rehospitalisasi terlepas dari ada/tidaknya Diabetes.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Furosemide',
        dosage: '20 - 80 mg per oral 1 - 2 kali sehari (sesuai derajat kongesti)',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Diuretik Loop untuk dekongesti gejala sesak napas dan edema perifer. Dosis disesuaikan berdasarkan berat badan harian.'
      },
      {
        drugName: 'Digoxin',
        dosage: '0.125 - 0.25 mg per oral sekali sehari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Inotropik positif; diindikasikan pada HFrEF simtomatik persisten atau disertai Fibrilasi Atrium dengan respon ventrikel cepat.'
      }
    ],
    nonPharmacological: [
      'Pembatasan Cairan: 1.5 - 2.0 liter/hari pada pasien dengan kongesti refrakter atau hiponatremia.',
      'Restriksi Garam Natrium: < 2 gram/hari.',
      'Pemantauan Berat Badan Harian: Timbang BB setiap pagi setelah BAK; lapor dokter jika BB naik > 2 kg dalam 3 hari berturut-turut.',
      'Rehabilitasi Kardiovaskular & Latihan Fisik Terstruktur.'
    ],
    specialPopulations: [
      {
        condition: 'Transisi dari ACE Inhibitor ke ARNI (Sacubitril/Valsartan)',
        recommendation: 'Wajib jeda washout period minimal 36 JAM setelah dosis terakhir ACEi sebelum memulai ARNI untuk mencegah Angioedema mematikan.',
        contraindicatedDrugs: ['Pemberian bersamaan ACEi + ARNI tanpa jeda 36 jam']
      },
      {
        condition: 'Gangguan Ginjal Berat (eGFR < 30 mL/min) atau Hiperkalemia (K > 5.0 mEq/L)',
        recommendation: 'Gunakan Spironolactone dengan kehati-hatian ekstra atau tunda inisiasi; evaluasi elektrolit tiap minggu.',
        contraindicatedDrugs: ['Spironolactone jika Kalium serum > 5.0 mEq/L']
      }
    ],
    monitoringParameters: [
      'Kalium Serum & Serum Kreatinin / eGFR (pada hari ke-7, ke-14, dan tiap 1-3 bulan)',
      'Tekanan Darah dan Heart Rate (target HR istirahat 55 - 60 bpm)',
      'Status Volume Cairan (JVP, ronkhi basal paru, edema pretibial)'
    ],
    sourceGuidelines: 'Pedoman Tatalaksana Gagal Jantung PERKI 2023 / PNPK Kardiovaskular Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: '4 Pilar GDMT (ARNI + Beta Blocker + MRA + SGLT2i) harus diinisiasi sedini mungkin dan dititrasi cepat dalam 4-6 minggu pertama untuk luaran klinis terbaik.'
  },

  {
    id: 'guideline-acs-stemi',
    diseaseName: 'Sindrom Koroner Akut (SKA: STEMI & NSTEMI / UAP)',
    category: 'Kardiovaskular',
    organization: 'PERKI',
    fornasTier: 'Faskes 2/3 (RS Rujukan)',
    icd10: 'I21.9',
    indonesianKeywords: ['serangan jantung', 'angin duduk', 'infark miokard', 'stemi', 'nstemi', 'nyeri dada', 'aspirin', 'clopidogrel', 'ticagrelor', 'heparin'],
    summary: 'Spektrum klinis iskemia miokard akut akibat ruptur plak aterosklerosis koroner dan trombosis intraluminal akut. Membutuhkan revaskularisasi emergensi (Primary PCI / Fibrinolisis) dan terapi antitrombotik agresif.',
    targetGoals: [
      'Revaskularisasi Segera: Door-to-Balloon Time < 90 menit (Primary PCI) atau Door-to-Needle < 30 menit (Fibrinolisis)',
      'Pencegahan Trombosis Stent & Re-infark Akut',
      'Stabilisasi Plak & Reduksi Mortalitas Jangka Panjang'
    ],
    firstLineTherapy: [
      {
        drugName: 'Aspirin (Asam Asetilsalisilat)',
        dosage: 'Loading Dose 160 - 320 mg dikunyah per oral, dilanjutkan dosis pemeliharaan 75 - 100 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Inhibitor COX-1 ireversibel; komponen wajib DAPT (Dual Antiplatelet Therapy).'
      },
      {
        drugName: 'Ticagrelor',
        dosage: 'Loading Dose 180 mg per oral, dilanjutkan 90 mg dua kali sehari (BID) selama 12 bulan',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Inhibitor P2Y12 reversibel poten; pilihan utama pada STEMI/NSTEMI dengan PCI dibanding Clopidogrel (studi PLATO).'
      },
      {
        drugName: 'Clopidogrel',
        dosage: 'Loading Dose 300 - 600 mg per oral, dilanjutkan 75 mg sekali sehari selama 12 bulan',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Pilihan P2Y12 bila Ticagrelor kontraindikasi, pasien pasca fibrinolisis, atau keterbatasan jaminan Faskes 1.'
      },
      {
        drugName: 'Atorvastatin',
        dosage: '80 mg per oral sekali sehari malam hari (Statin Intensitas Tinggi)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Diberikan segera dalam 24 jam pertama SKA tanpa memandang kadar lipid baseline (efek pleiotropik stabilisasi plak).'
      },
      {
        drugName: 'Enoxaparin (LMWH)',
        dosage: '30 mg IV bolus diikuti 1 mg/kgBB Subkutan setiap 12 jam (selama fase rawat inap akut)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Antikoagulan parenteral standar selama fase akut SKA.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Isosorbide Dinitrate (ISDN)',
        dosage: '5 mg sublingual prn saat nyeri dada (atau infus IV titrasi 1-10 mg/jam)',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'Venodilator koroner untuk meredakan nyeri dada iskemia akut. KONTRAINDIKASI pada Infark Ventrikel Kanan atau penggunaan PDE-5 inhibitor (Sildenafil).'
      },
      {
        drugName: 'Bisoprolol',
        dosage: 'Awal 2.5 mg per oral sekali sehari (diberikan setelah pasien stabil secara hemodinamik)',
        role: 'Maintenance',
        fornasTier: 'Faskes 1',
        notes: 'Menurunkan konsumsi oksigen miokard dan mencegah aritmia letal pasca infark.'
      }
    ],
    nonPharmacological: [
      'Aktivasi Sistem Code STEMI dan transportasi ambulans gawat darurat segera.',
      'Tirah baring total (bed rest) dan pemantauan EKG kontinu di ICCU/CVCU.',
      'Oksigenoterapi HANYA jika saturasi SpO2 < 90% (oksigen hiperoksia rutin tidak direkomendasikan).',
      'Program Rehabilitasi Jantung Fase 1 - 3 dan berhenti merokok mutlak.'
    ],
    specialPopulations: [
      {
        condition: 'Penggunaan Sildenafil / Tadalafil dalam 24 - 48 jam terakhir',
        recommendation: 'DILARANG KERAS memberikan Nitrat (ISDN / NTG) karena memicu kolaps kardiovaskular dan syok refrakter mematikan.',
        contraindicatedDrugs: ['ISDN / Nitrogliserin bersama Inhibitor PDE-5']
      }
    ],
    monitoringParameters: [
      'Pemeriksaan Troponin I / T Serial & EKG 12 Sandapan serial',
      'Tanda Perdarahan Mayor (TIMI Bleeding) akibat DAPT + Antikoagulan',
      'Hemodinamik (Tekanan Darah, Heart Rate, Tanda Gagal Jantung Killip)'
    ],
    sourceGuidelines: 'Pedoman Tata Laksana Sindrom Koroner Akut PERKI 2023 / PNPK Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Waktu adalah miokardium (Time is Muscle)! Pasien STEMI onset < 12 jam harus segera mendapatkan reperfusi PCI (< 90 menit) atau Fibrinolisis (< 30 menit).'
  },

  {
    id: 'guideline-atrial-fibrillation',
    diseaseName: 'Fibrilasi Atrium (Atrial Fibrillation / AF)',
    category: 'Kardiovaskular',
    organization: 'PERKI',
    fornasTier: 'Faskes 2/3 (RS Rujukan)',
    icd10: 'I48.9',
    indonesianKeywords: ['aritmia', 'jantung berdebar', 'denyut tidak teratur', 'stroke kardioemboli', 'rivaroxaban', 'warfarin', 'dabigatran', 'digoxin'],
    summary: 'Aritmia supraventrikular yang ditandai dengan aktivasi atrium yang tidak terkoordinasi, menyebabkan gangguan fungsi mekanis atrium dan peningkatan risiko stroke kardioemboli hingga 5 kali lipat.',
    targetGoals: [
      'Pencegahan Stroke Emboli Berdasarkan Stratifikasi Skor CHA2DS2-VASc',
      'Pengendalian Laju Irama Jantung (Rate Control: HR Istirahat < 110 bpm)',
      'Konversi & Pemeliharaan Irama Sinus (Rhythm Control jika bergejala)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Rivaroxaban',
        dosage: '20 mg per oral sekali sehari bersama makan malam (15 mg/hari jika CrCl 15-49 mL/min)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'DOAC / NOAC (Direct Factor Xa Inhibitor); efikasi pencegahan stroke superior dibanding Warfarin dengan risiko perdarahan intrakranial jauh lebih rendah.'
      },
      {
        drugName: 'Dabigatran Etexilate',
        dosage: '150 mg per oral dua kali sehari (BID) (110 mg BID pada lansia >= 80 tahun)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Direct Thrombin Inhibitor; tersedia antidotum spesifik (Idarucizumab) jika terjadi perdarahan emergensi.'
      },
      {
        drugName: 'Warfarin',
        dosage: 'Dosis individual 2 - 5 mg/hari dititrasi dengan target INR 2.0 - 3.0',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Pilihan WAJIB (DOAC kontraindikasi) pada Fibrilasi Atrium Valvular (Stenosis Mitral Rheuma Sedang-Berat atau Katup Jantung Prostetik Mekanik).'
      },
      {
        drugName: 'Bisoprolol',
        dosage: '2.5 - 10 mg per oral sekali sehari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Rate control lini pertama untuk mengontrol respon ventrikel.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Digoxin',
        dosage: '0.125 - 0.25 mg per oral sekali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Kombinasi dengan Beta Blocker pada AF disertai gagal jantung atau gaya hidup sedenter.'
      },
      {
        drugName: 'Amiodarone',
        dosage: 'Loading Dose 600 mg/hari selama 4 minggu -> pemeliharaan 200 mg/hari',
        role: 'Alternative',
        fornasTier: 'Faskes 2/3',
        notes: 'Rhythm control antiaritmia kelas III untuk pemulihan irama sinus.'
      }
    ],
    nonPharmacological: [
      'Kardioversi Listrik (DC Shock) sinkronisasi pada pasien AF dengan hemodinamik tidak stabil.',
      'Ablasi Kateter Vena Pulmonalis pada AF paroksismal simtomatik refrakter obat.',
      'Hentikan konsumsi alkohol berlebih (Holiday Heart Syndrome) dan kendalikan sleep apnea.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien dengan Katup Jantung Mekanik',
        recommendation: 'DOAC (Rivaroxaban/Dabigatran/Apixaban) DILARANG. Wajib menggunakan Warfarin dengan target INR 2.5 - 3.5.',
        contraindicatedDrugs: ['DOAC / NOAC pada Katup Mekanik']
      }
    ],
    monitoringParameters: [
      'Kalkulasi Skor Risiko Perdarahan HAS-BLED berkala',
      'Pemeriksaan INR rutin tiap 2-4 minggu (khusus pengguna Warfarin)',
      'Fungsi Ginjal (eGFR / CrCl) untuk penyesuaian dosis DOAC'
    ],
    sourceGuidelines: 'Pedoman Tata Laksana Fibrilasi Atrium PERKI 2023 / ESC Guidelines 2024',
    updatedYear: '2023',
    keyClinicalAlert: 'Pasien pria dengan skor CHA2DS2-VASc >= 2 dan wanita >= 3 WAJIB mendapatkan terapi antikoagulan oral (DOAC/Warfarin) untuk mencegah kelumpuhan akibat stroke emboli.'
  },

  {
    id: 'guideline-dyslipidemia',
    diseaseName: 'Dislipidemia & Pencegahan Kardiovaskular Aterosklerotik (ASCVD)',
    category: 'Kardiovaskular',
    organization: 'PERKENI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'E78.5',
    indonesianKeywords: ['kolesterol', 'lemak darah', 'trigliserida', 'atorvastatin', 'simvastatin', 'rosuvastatin', 'ezetimibe', 'fenofibrate'],
    summary: 'Abnormalitas profil lipid plasma (peningkatan Kolesterol Total, LDL-C, Trigliserida, atau penurunan HDL-C) yang menjadi faktor risiko utama Penyakit Jantung Koroner dan Stroke Iskemik.',
    targetGoals: [
      'Risiko Sangat Tinggi (Riwayat PJK / Stroke / DM + Target Organ): LDL-C < 55 mg/dL dan reduksi >= 50% dari baseline',
      'Risiko Tinggi (DM tanpa komplikasi / Hipertensi Berat): LDL-C < 70 mg/dL',
      'Risiko Sedang: LDL-C < 100 mg/dL',
      'Target Trigliserida: < 150 mg/dL'
    ],
    firstLineTherapy: [
      {
        drugName: 'Atorvastatin',
        dosage: '40 - 80 mg per oral sekali sehari (Intensitas Tinggi) atau 10 - 20 mg/hari (Intensitas Sedang)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Inhibitor HMG-CoA Reduktase; menurunkan LDL-C sebesar 50-60%. Pilihan utama pada Pasca-SKA atau risiko kardiovaskular sangat tinggi.'
      },
      {
        drugName: 'Rosuvastatin',
        dosage: '20 - 40 mg per oral sekali sehari (Intensitas Tinggi) atau 5 - 10 mg/hari (Intensitas Sedang)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Statin intensitas tinggi berdurasi panjang dengan efikasi penurunan LDL-C yang sangat kuat.'
      },
      {
        drugName: 'Simvastatin',
        dosage: '20 - 40 mg per oral sekali sehari pada malam hari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Statin intensitas sedang. Dosis 80 mg/hari dibatasi FDA karena risiko miopati tinggi.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Ezetimibe',
        dosage: '10 mg per oral sekali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Inhibitor absorpsi kolesterol usus (NPC1L1); ditambahkan pada Statin dosis maksimal bila target LDL-C belum tercapai (menurunkan LDL-C tambahan 15-20%).'
      },
      {
        drugName: 'Fenofibrate',
        dosage: '145 - 200 mg per oral sekali sehari bersama makanan',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Agonis PPAR-alfa; pilihan utama jika Trigliserida sangat tinggi (TG > 500 mg/dL) untuk mencegah Pankreatitis Akut.'
      }
    ],
    nonPharmacological: [
      'Diet Jantung Sehat: Batasi asupan lemak jenuh (< 7% total kalori) dan hindari lemak trans.',
      'Tingkatkan asupan serat larut air (oatmeal, kacang-kacangan, apel) dan sterol/stanol tumbuhan.',
      'Olahraga aerobik teratur minimal 30 menit per hari, 5 hari per minggu.'
    ],
    specialPopulations: [
      {
        condition: 'Ibu Hamil & Menyusui',
        recommendation: 'Hentikan seluruh terapi Statin selama kehamilan dan menyusui.',
        contraindicatedDrugs: ['Semua Statin (Atorvastatin/Simvastatin/Rosuvastatin) - Kategori X FDA / Teratogenik']
      }
    ],
    monitoringParameters: [
      'Profil Lipid Lengkap (Kolesterol Total, LDL-C, HDL-C, Trigliserida) pada 4-12 minggu pasca inisiasi',
      'Enzim Hepar (SGOT / SGPT baseline)',
      'Kreatin Kinase (CK) bila pasien mengeluhkan nyeri/kelemahan otot hebat'
    ],
    sourceGuidelines: 'Panduan Pengelolaan Dislipidemia PERKENI & PERKI 2023 / PNPK Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Jangan mengombinasikan Simvastatin dengan Gemfibrozil karena risiko rhabdomyolysis meningkat 15 kali lipat (gunakan Fenofibrate jika memerlukan kombinasi fibrat).'
  },

  // ==========================================
  // 2. ENDOKRIN & METABOLIK
  // ==========================================
  {
    id: 'guideline-t2dm',
    diseaseName: 'Diabetes Melitus Tipe 2 (DMT2)',
    category: 'Endokrin & Metabolik',
    organization: 'PERKENI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'E11.9',
    indonesianKeywords: ['kencing manis', 'gula darah', 'diabetes', 'metformin', 'insulin', 'glimepiride', 'empagliflozin', 'hba1c'],
    summary: 'Gangguan metabolik kronis yang ditandai dengan resistensi insulin dan defisiensi sekresi insulin progresif, menyebabkan hiperglikemia kronis dan kerusakan mikrovaskular/makrovaskular.',
    targetGoals: [
      'Target HbA1c Umum: < 7.0% (< 53 mmol/mol) (PERKENI 2023 / ADA 2024)',
      'Target HbA1c Ketat (Usia Muda / Tanpa Komorbid): < 6.5%',
      'Target HbA1c Longgar (Lansia Frail / Risiko Hipoglikemia Tinggi): < 8.0%',
      'Glukosa Darah Puasa (GDP): 80 - 130 mg/dL',
      'Glukosa Darah 2 Jam Post-Prandial (GD2PP): < 180 mg/dL'
    ],
    firstLineTherapy: [
      {
        drugName: 'Metformin',
        dosage: 'Awal 500 mg 1-2x/hari bersama makan, titrasi bertahap ke Dosis Target 1500 - 2000 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Biguanid; pilihan utama penurun glukosa hepatik tanpa risiko hipoglikemia dan netral berat badan.'
      },
      {
        drugName: 'Empagliflozin',
        dosage: '10 - 25 mg per oral sekali sehari pagi hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'SGLT2 Inhibitor; prioritas lini pertama bersama Metformin bila pasien memiliki komorbiditas Gagal Jantung (HF), CKD, atau ASCVD.'
      },
      {
        drugName: 'Semaglutide',
        dosage: 'Subkutan 0.25 mg/mgg (4 mgg) -> 0.5 mg/mgg -> 1.0 mg/mgg; Oral: 3 mg -> 7-14 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'GLP-1 Receptor Agonist; prioritas utama pada pasien DM Tipe 2 dengan obesitas, riwayat ASCVD (stroke/PJK), atau kebutuhan reduksi berat badan signifikan.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Linagliptin',
        dosage: '5 mg per oral sekali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'DPP-4 Inhibitor; aman digunakan pada semua derajat gagal ginjal tanpa perlu penyesuaian dosis.'
      },
      {
        drugName: 'Glimepiride',
        dosage: '1 - 4 mg per oral sekali sehari sebelum sarapan pagi',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Sulfonilurea generasi 2; sekretagog insulin efektif dengan harga terjangkau (waspada risiko hipoglikemia).'
      },
      {
        drugName: 'Insulin Glargine',
        dosage: 'Awal 10 unit atau 0.1 - 0.2 unit/kgBB subkutan sekali sehari pada jam yang sama',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Insulin Basal Analog; diindikasikan bila HbA1c > 9.0-10.0% dengan gejala dekompensasi metabolik/katabolik (penurunan BB drastis).'
      }
    ],
    nonPharmacological: [
      'Terapi Nutrisi Medis (TNM): Pola makan 3J (Jadwal, Jumlah kalori, Jenis makanan teratur), batasi karbohidrat sederhana dan gula murni.',
      'Latihan Fisik Teratur: Minimal 150 menit/minggu latihan aerobik intensitas sedang ditambah latihan beban 2-3x/minggu.',
      'Edukasi Perawatan Kaki Diabetes: Pemeriksaan kaki harian dan penggunaan alas kaki yang pas untuk mencegah ulkus diabetikum.'
    ],
    specialPopulations: [
      {
        condition: 'Gangguan Ginjal Berat (eGFR < 30 mL/min)',
        recommendation: 'Hentikan Metformin (risiko asidosis laktat). Gunakan Linagliptin 5 mg atau Insulin dosis tersesuaikan.',
        contraindicatedDrugs: ['Metformin (bila eGFR < 30 mL/min)', 'Sulfonilurea berdurasi panjang seperti Glibenclamide (risiko hipoglikemia berkepanjangan)']
      },
      {
        condition: 'Wanita Hamil dengan Diabetes (GDM)',
        recommendation: 'Pilihan utama adalah Insulin Subkutan.',
        contraindicatedDrugs: ['SGLT2 Inhibitor', 'GLP-1 Receptor Agonist', 'Statin']
      }
    ],
    monitoringParameters: [
      'Pemeriksaan HbA1c setiap 3 bulan (atau 6 bulan jika target stabil tercapai)',
      'Pemantauan Glukosa Darah Mandiri (PGDM) berkala',
      'Skrining Komplikasi Tahunan: eGFR, Rasio Albumin-Kreatinin Urin (UACR), Funduskopi mata, dan Sensibilitas Kaki (Monofilamen 10g)'
    ],
    sourceGuidelines: 'Pedoman Pengelolaan dan Pencegahan DM Tipe 2 PERKENI 2023 / PNPK Diabetes Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Bila HbA1c saat diagnosis >= 1.5% di atas target (e.g. HbA1c >= 8.5%), mulai langsung dengan KOMBINASI 2 OBAT (Metformin + SGLT2i/GLP-1 RA/DPP-4i).'
  },

  {
    id: 'guideline-hyperthyroidism',
    diseaseName: 'Hipertiroidisme (Penyakit Graves & Struma Toksik)',
    category: 'Endokrin & Metabolik',
    organization: 'PERKENI',
    fornasTier: 'Faskes 2/3 (RS Rujukan)',
    icd10: 'E05.0',
    indonesianKeywords: ['gondok', 'tiroid', 'mata melotot', 'keringat berlebih', 'tsh', 'ft4', 'ptu', 'methimazole', 'thiamazole', 'propranolol'],
    summary: 'Hiperaktivitas kelenjar tiroid yang menyebabkan sintesis dan sekresi berlebih hormon tiroid (Free T4 dan/atau Free T3 meningkat dengan supresi TSH < 0.01 mIU/L), memicu tirotoksikosis hipermetabolik.',
    targetGoals: [
      'Mencapai Status Eutiroid (Normalisasi FT4 dan TSH Serum)',
      'Meredakan Gejala Adrenergik Tirotoksikosis (Palpitasi, Tremor, Cemas)',
      'Mencegah Krisis Tiroid (Thyroid Storm) yang Mengancam Nyawa'
    ],
    firstLineTherapy: [
      {
        drugName: 'Thiamazole (Methimazole)',
        dosage: 'Awal 10 - 30 mg per oral sekali sehari pagi hari, titrasi turun bertahap ke Dosis Pemeliharaan 5 - 10 mg/hari selama 12 - 18 bulan',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Thionamide lini pertama untuk orang dewasa/non-hamil trimester 1; efikasi lebih cepat dan profil hepatotoksisitas lebih aman dibanding PTU.'
      },
      {
        drugName: 'Propylthiouracil (PTU)',
        dosage: 'Awal 100 - 150 mg per oral setiap 8 jam (300-450 mg/hari), titrasi turun ke 50 - 100 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilihan WAJIB pada Ibu Hamil Trimester 1 dan Krisis Tiroid (menghambat konversi perifer T4 menjadi T3).'
      },
      {
        drugName: 'Propranolol',
        dosage: '10 - 40 mg per oral 3 - 4 kali sehari (q6-8h)',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Beta-blocker non-selektif untuk kontrol cepat takikardia, tremor, keringat berlebih, dan agitasi tirotoksikosis.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Lugol Solution (Kalium Iodida)',
        dosage: '3 - 5 tetes per oral 3 kali sehari dalam air atau jus',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 2/3',
        notes: 'Diberikan pada Krisis Tiroid atau persiapan pre-operatif tiroidektomi (efek Wolff-Chaikoff blokade sekresi hormon tiroid).'
      }
    ],
    nonPharmacological: [
      'Batasi konsumsi makanan tinggi iodium berlebih (garam beriodium tinggi, rumput laut, suplemen kelp).',
      'Hindari rokok mutlak (merokok memperparah Ofthalmopati Graves proptosis mata).',
      'Terapi Radioablasi Iodium-131 (RAI) atau Tiroidektomi Total jika relaps pasca 18 bulan terapi medikamentosa.'
    ],
    specialPopulations: [
      {
        condition: 'Ibu Hamil Trimester 1 dengan Hipertiroidisme',
        recommendation: 'Wajib gunakan PTU pada Trimester 1 (Methimazole memicu aplasia kutis / embriopati). Ganti ke Methimazole mulai Trimester 2 untuk menghindari hepatotoksisitas PTU.',
        contraindicatedDrugs: ['Methimazole pada Trimester 1 Kehamilan']
      }
    ],
    monitoringParameters: [
      'Kadar Free T4 (FT4) dan Total T3 setiap 4-6 minggu pada fase inisiasi',
      'Pemeriksaan Leukosit / Darah Lengkap Darurat bila timbul Demam dan Sakit Tenggorokan (skrining Agranulositosis fatal akibat Thionamide)',
      'Fungsi Hepar (SGOT/SGPT, Bilirubin)'
    ],
    sourceGuidelines: 'Petunjuk Praktis Pengelolaan Penyakit Tiroid PERKENI 2023 / ATA Guidelines',
    updatedYear: '2023',
    keyClinicalAlert: 'EDUKASI KRUSIAL: Pasien pengguna Thiamazole/PTU yang mengalami DEMAM dan SAKIT TENGGOROKAN harus SEGERA menghentikan obat dan cek Darah Lengkap untuk menyingkirkan Agranulositosis (< 500 neutrofil/mcL).'
  },

  // ==========================================
  // 3. RESPIRASI & PARU
  // ==========================================
  {
    id: 'guideline-tb-pulmonary',
    diseaseName: 'Tuberkulosis Paru (TB Paru Sensitif Obat / SO)',
    category: 'Respirasi & Alergi',
    organization: 'PNPK Kemenkes RI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'A15.0',
    indonesianKeywords: ['tbc', 'tb paru', 'batuk darah', 'obat merah', 'rifampisin', 'isoniazid', 'pirazinamid', 'etambutol', 'fdc tb', 'tes cepat molekuler'],
    summary: 'Penyakit infeksi menular kronis pada parenkim paru yang disebabkan oleh Mycobacterium tuberculosis. Penegakan diagnosis baku emas menggunakan Tes Cepat Molekuler (TCM GeneXpert MTB/RIF) dan diobati dengan paduan Obat Anti-Tuberkulosis (OAT) terstandar program nasional.',
    targetGoals: [
      'Kesembuhan Pasien Total & Mencegah Kematian Akibat TB',
      'Mencegah Kekambuhan (Relaps) Infeksi TB',
      'Memutus Rantai Penularan di Komunitas & Mencegah Resistensi Obat (TB-MDR)'
    ],
    firstLineTherapy: [
      {
        drugName: 'OAT Kategori 1 FDC (RHZE) - Fase Intensif',
        dosage: 'Sesuai Berat Badan (30-37 kg: 2 tab; 38-54 kg: 3 tab; 55-70 kg: 4 tab; >71 kg: 5 tab) sekali sehari pagi saat perut kosong selama 2 BULAN (2RHZE)',
        role: 'Lini Pertama',
        fornasTier: 'Semua Faskes',
        notes: 'Kombinasi Dosis Tetap (KDT/FDC): Rifampisin 150 mg + Isoniazid 75 mg + Pirazinamid 400 mg + Etambutol 275 mg per tablet.'
      },
      {
        drugName: 'OAT Kategori 1 FDC (RH) - Fase Lanjutan',
        dosage: 'Sesuai Berat Badan (30-37 kg: 2 tab; 38-54 kg: 3 tab; 55-70 kg: 4 tab; >71 kg: 5 tab) sekali sehari pagi selama 4 BULAN (4RH)',
        role: 'Lini Pertama',
        fornasTier: 'Semua Faskes',
        notes: 'Kombinasi Dosis Tetap (KDT/FDC): Rifampisin 150 mg + Isoniazid 150 mg per tablet diminum setiap hari.'
      },
      {
        drugName: 'Pyridoxine (Vitamin B6)',
        dosage: '25 - 50 mg per oral sekali sehari bersama OAT',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Pencegahan Neuropati Perifer yang diinduksi oleh Isoniazid (terutama pada pasien DM, malnutrisi, lansia, alkoholik, dan ibu hamil).'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Paduan TB-RO / MDR-TB BPaL / BPaLM',
        dosage: 'Bedaquiline + Pretomanid + Linezolid (+ Moxifloxacin) selama 6 bulan di bawah pengawasan Tim Ahli Klinis TB-RO',
        role: 'Alternative',
        fornasTier: 'Faskes 2/3',
        notes: 'Regimen oral jangka pendek untuk Tuberkulosis Resistan Rifampisin (TB-RR / TB-MDR).'
      }
    ],
    nonPharmacological: [
      'Pengawasan Menelan Obat (PMO) aktif oleh kader kesehatan atau keluarga terlatih.',
      'Etika Batuk dan Penggunaan Masker Bedah/N95 untuk mencegah droplet aerosol.',
      'Ventilasi Udara Rumah yang Baik dengan pencahayaan sinar matahari alami.',
      'Dukungan Nutrisi Tinggi Kalori Tinggi Protein (TKTP).'
    ],
    specialPopulations: [
      {
        condition: 'Pasien TB dengan Ko-infeksi HIV',
        recommendation: 'Mulai OAT segera, lalu inisiasi ARV (Antiretroviral: TLD) dalam kurun waktu 2 minggu setelah OAT ditoleransi dengan baik tanpa memandang jumlah CD4.',
        contraindicatedDrugs: ['Menunda ARV > 8 minggu']
      },
      {
        condition: 'Pasien dengan Hepatitis Imbas Obat (Drug-Induced Liver Injury / DILI: SGPT/SGOT > 5x ULN atau Bilirubin > 2 mg/dL)',
        recommendation: 'Hentikan segera semua OAT hepatotoksis (Pirazinamid, Isoniazid, Rifampisin). Berikan regimen non-hepatotoksis sementara (Streptomisin + Etambutol + Levofloxacin). Re-challenge bertahap setelah hepar pulih.',
        contraindicatedDrugs: ['Melanjutkan OAT hepatotoksik saat ikterik/SGOT-SGPT > 5x']
      }
    ],
    monitoringParameters: [
      'Pemeriksaan Dahak Mikroskopis BTA pada akhir Bulan ke-2 (evaluasi konversi), Bulan ke-5, dan Akhir Pengobatan (Bulan ke-6)',
      'Enzim Hepar (SGOT / SGPT / Bilirubin) baseline dan bila timbul mual muntah kuning',
      'Uji Tajam Penglihatan & Diskriminasi Warna (efek samping neuritis optik Etambutol)'
    ],
    sourceGuidelines: 'Pedoman Nasional Pelayanan Kedokteran Tata Laksana Tuberkulosis (PNPK TB Kemenkes RI 2023) / PDPI',
    updatedYear: '2023',
    keyClinicalAlert: 'OAT HARUS diminum teratur setiap hari selama 6 BULAN PENUH. Rifampisin menyebabkan warna urin dan keringat menjadi kemerahan (harus diedukasikan pada pasien agar tidak panik).'
  },

  {
    id: 'guideline-asthma',
    diseaseName: 'Asma Bronkial Dewasa & Remaja (Pedoman GINA & PDPI)',
    category: 'Respirasi & Alergi',
    organization: 'PDPI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'J45.9',
    indonesianKeywords: ['asma', 'sesak mengi', 'bengek', 'inhaler', 'budesonide', 'formoterol', 'salbutamol', 'symbicort', 'ventolin'],
    summary: 'Penyakit inflamasi kronis saluran napas heterogen yang ditandai dengan gejala mengi (wheezing), sesak napas, dada terasa berat, dan batuk yang bervariasi dalam waktu dan intensitas.',
    targetGoals: [
      'Mencapai Kontrol Gejala Asma Optimal (Aktivitas Harian Normal)',
      'Meminimalkan Risiko Eksaserbasi Akut, Rawat Inap, dan Kematian Terkait Asma',
      'Mencegah Penurunan Fungsi Paru Jangka Panjang (FEV1 Stabil)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Budesonide / Formoterol',
        dosage: 'Dosis Rendah (160/4.5 mcg atau 80/4.5 mcg) 1-2 hisap prn (GINA Track 1 Reliever & Maintenance)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Kombinasi ICS-Formoterol Inhalasi: Pilihan Jalur Utama (Track 1) GINA/PDPI untuk seluruh derajat asma. Memberikan peredaan cepat sekaligus antiinflamasi protektif.'
      },
      {
        drugName: 'Salbutamol',
        dosage: '100 - 200 mcg (1 - 2 semprot) inhalasi setiap 4 - 6 jam prn saat sesak',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'SABA Reliever (Jalur Track 2): HARUS SELALU didampingi pemakaian ICS harian rutin (dilarang monoterapi SABA tanpa ICS!).'
      },
      {
        drugName: 'Fluticasone Propionate',
        dosage: '100 - 250 mcg inhalasi dua kali sehari',
        role: 'Maintenance',
        fornasTier: 'Faskes 2/3',
        notes: 'Inhaled Corticosteroid (ICS) pemeliharaan rutin untuk menekan inflamasi bronkus persisten.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Montelukast',
        dosage: '10 mg per oral sekali sehari pada malam hari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Leukotriene Receptor Antagonist (LTRA); sangat bermanfaat pada asma yang dipicu alergi rinitis atau latihan fisik (exercise-induced).'
      },
      {
        drugName: 'Tiotropium',
        dosage: 'Respimat 2.5 mcg (2 hisapan = 5 mcg) sekali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'LAMA Inhalasi; terapi tambahan pada Asma Berat (Step 4-5) yang tidak terkontrol dengan ICS-LABA dosis sedang-tinggi.'
      },
      {
        drugName: 'Methylprednisolone',
        dosage: '16 - 32 mg/hari per oral dibagi 1-2 dosis selama 5 - 7 hari (Eksaserbasi Akut)',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'Kortikosteroid sistemik burst jangka pendek untuk meredakan eksaserbasi asma akut.'
      }
    ],
    nonPharmacological: [
      'Identifikasi dan Hindari Pemicu (Alergen debu, bulu hewan, asap rokok, polusi, suhu dingin).',
      'Edukasi Teknik Penggunaan Inhaler (MDI dengan Spacer atau DPI) yang benar.',
      'Penyusunan Rencana Aksi Asma Tertulis (Asthma Action Plan).',
      'Vaksinasi Influenza tahunan dan Vaksinasi Pneumokokus.'
    ],
    specialPopulations: [
      {
        condition: 'Asma pada Ibu Hamil',
        recommendation: 'Lanjutkan pengobatan ICS (Budesonide adalah ICS pilihan paling aman) dan SABA. Hipoksia janin akibat asma tidak terkontrol jauh lebih berbahaya dibanding risiko obat inhalasi.',
        contraindicatedDrugs: ['Penghentian mendadak obat inhaler pengendali asma']
      }
    ],
    monitoringParameters: [
      'Uji Fungsi Paru (Spirometri FEV1/FVC atau Arus Puncak Ekspirasi / APE)',
      'Kuesioner Kontrol Asma (Asthma Control Test / ACT score)',
      'Evaluasi Kepatuhan & Teknik Inhaler pada setiap kunjungan'
    ],
    sourceGuidelines: 'Pedoman Diagnosis & Penatalaksanaan Asma PDPI / GINA 2024 Guidelines',
    updatedYear: '2024',
    keyClinicalAlert: 'GINA & PDPI secara tegas TIDAK LAGI MEREKOMENDASIKAN penggunaan SABA monoterapi (Salbutamol saja tanpa ICS), karena terbukti meningkatkan risiko kematian terkait asma.'
  },

  {
    id: 'guideline-copd',
    diseaseName: 'Penyakit Paru Obstruktif Kronis (PPOK / COPD)',
    category: 'Respirasi & Alergi',
    organization: 'PDPI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'J44.9',
    indonesianKeywords: ['ppok', 'copd', 'batuk perokok', 'emfisema', 'bronkitis kronis', 'tiotropium', 'salmeterol', 'spiriva'],
    summary: 'Penyakit paru heterogen yang ditandai dengan gejala pernapasan kronis (sesak napas saat aktivitas, batuk berdahak) akibat kelainan saluran napas (bronkitis kronis) dan/atau alveoli (emfisema) yang menyebabkan hambatan aliran udara persisten.',
    targetGoals: [
      'Meredakan Gejala Sesak & Meningkatkan Toleransi Aktivitas Fisik',
      'Menurunkan Frekuensi dan Derajat Keparahan Eksaserbasi Akut PPOK',
      'Memperlambat Penurunan Fungsi Paru'
    ],
    firstLineTherapy: [
      {
        drugName: 'Tiotropium',
        dosage: '18 mcg inhalasi kapsul DPI sekali sehari ATAU Respimat 5 mcg sekali sehari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Long-Acting Muscarinic Antagonist (LAMA); bronkodilator fondasi utama PPOK untuk mengurangi hiperinflasi paru dan eksaserbasi.'
      },
      {
        drugName: 'Salmeterol',
        dosage: '50 mcg inhalasi dua kali sehari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Long-Acting Beta-2 Agonist (LABA); dikombinasikan dengan LAMA (Dual Bronchodilator LAMA+LABA) untuk kontrol optimal.'
      },
      {
        drugName: 'Ipratropium Bromide',
        dosage: '20 - 40 mcg (1 - 2 semprot) inhalasi setiap 6 - 8 jam prn',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'SAMA Reliever untuk peredaan sesak napas akut kerja cepat.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Budesonide / Formoterol',
        dosage: '160/4.5 mcg dua kali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Terapi Tripel (ICS + LABA + LAMA); diindikasikan HANYA pada pasien PPOK dengan riwayat eksaserbasi berulang dan eosinofil darah >= 300 sel/mcL.'
      },
      {
        drugName: 'N-Acetylcysteine',
        dosage: '600 mg per oral 1 - 2 kali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Mukolitik dan antioksidan untuk mengencerkan dahak kental pada PPOK fenotipe bronkitis kronis.'
      }
    ],
    nonPharmacological: [
      'BERHENTI MEROKOK (Intervensi paling efektif untuk menghentikan penurunan fungsi paru).',
      'Rehabilitasi Paru & Latihan Pernapasan (Pursed-lip breathing).',
      'Terapi Oksigen Jangka Panjang (LTOT) jika saturasi O2 istirahat <= 88%.',
      'Vaksinasi Wajib: Influenza tahunan, Pneumokokus (PCV20/PPSV23), dan COVID-19.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien PPOK dengan Eosinofil Darah Rendah (< 100 sel/mcL)',
        recommendation: 'HINDARI penggunaan Inhaled Corticosteroids (ICS) karena tidak efektif dan meningkatkan risiko Pneumonia bakterial berat.',
        contraindicatedDrugs: ['ICS dosis tinggi tanpa indikasi eosinofilia']
      }
    ],
    monitoringParameters: [
      'Uji Spirometri Pasca-Bronkodilator (Rasio FEV1/FVC < 0.70 konfirmasi diagnosis)',
      'Skor Gejala CAT (COPD Assessment Test) dan skala sesak mMRC',
      'Jumlah Eosinofil Darah Lengkap'
    ],
    sourceGuidelines: 'Pedoman PPOK Diagnosis dan Penatalaksanaan PDPI / GOLD 2024 Guidelines',
    updatedYear: '2024',
    keyClinicalAlert: 'Kombinasi ganda bronkodilator (LAMA + LABA) adalah lini pertama untuk sebagian besar pasien PPOK bergejala (GOLD Grup B dan E).'
  },

  // ==========================================
  // 4. PENYAKIT INFEKSI & TROPIS
  // ==========================================
  {
    id: 'guideline-dengue',
    diseaseName: 'Demam Berdarah Dengue (DBD / DHF Dewasa & Pediatrik)',
    category: 'Anti-Infeksi',
    organization: 'PAPDI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'A91',
    indonesianKeywords: ['dbd', 'demam berdarah', 'dengue', 'trombosit turun', 'hematokrit', 'cairan ringer laktat', 'warning signs', 'syok dengue'],
    summary: 'Infeksi virus dengue yang ditularkan nyamuk Aedes aegypti dengan manifestasi perembesan plasma (plasma leakage) kritis pada fase afebris (hari ke-3 hingga ke-7), trombositopenia, dan diatesis hemoragik.',
    targetGoals: [
      'Pemeliharaan Volume Sirkulasi Efektif & Mencegah Syok Dengue (DSS)',
      'Deteksi Dini Tanda Bahaya (Warning Signs) pada Fase Kritis',
      'Menghindari Overload / Kelebihan Cairan Pasca Fase Kritis'
    ],
    firstLineTherapy: [
      {
        drugName: 'Cairan Kristaloid Isotonik (Ringer Laktat / NaCl 0.9%)',
        dosage: 'Rumatan + Defisit: Fase Kritis: 5 - 7 mL/kgBB/jam (2-4 jam) -> turunkan ke 3 - 5 mL/kgBB/jam -> 2 - 3 mL/kgBB/jam sesuai respon Ht dan urin output',
        role: 'Lini Pertama',
        fornasTier: 'Semua Faskes',
        notes: 'Fondasi utama terapi DBD. Titrasi kecepatan infus secara dinamis berdasarkan nilai Hematokrit dan produksi urin (target >= 0.5-1 mL/kgBB/jam).'
      },
      {
        drugName: 'Paracetamol',
        dosage: 'Dewasa: 500 - 1000 mg q6h (Maks 3000 mg/hari); Anak: 10 - 15 mg/kgBB/kali q4-6h prn demam',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Antipiretik aman satu-satunya pada infeksi Dengue.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Cairan Koloid (Voluven / HES 130/0.4 atau Gelatin)',
        dosage: '10 - 20 mL/kgBB bolus cepat dalam 30 - 60 menit',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 2/3',
        notes: 'Diindikasikan HANYA pada Syok Dengue Terkompensasi / Dekompensasi yang refrakter terhadap resusitasi kristaloid isotonik.'
      },
      {
        drugName: 'Transfusi Trombosit Konsentrat (TC)',
        dosage: '1 unit / 10 kgBB',
        role: 'Alternative',
        fornasTier: 'Faskes 2/3',
        notes: 'Diindikasikan HANYA bila terdapat Perdarahan Masif Spontan (bukan sekadar angka trombosit rendah tanpa perdarahan).'
      }
    ],
    nonPharmacological: [
      'Tirah baring total dan kompres hangat di lipatan tubuh.',
      'Asupan Cairan Oral Berlimpah (Jus buah, oralit, susu, air putih) minimal 2 - 3 liter/hari pada fase demam.',
      'Edukasi keluarga mengenali Warning Signs: Nyeri perut hebat, muntah persisten, perdarahan mukosa, lemas/gelisah, oliguria.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien DBD Demam Tinggi',
        recommendation: 'DILARANG KERAS memberikan NSAID (Ibuprofen, Asam Mefenamat, Ketorolac) dan Aspirin karena memicu perdarahan saluran cerna fatal dan sindrom Reye.',
        contraindicatedDrugs: ['Semua NSAID (Ibuprofen, Asam Mefenamat, Natrium Diklofenak)', 'Aspirin', 'Kortikosteroid rutin']
      }
    ],
    monitoringParameters: [
      'Hematokrit (Ht) dan Trombosit serial setiap 6 - 12 jam selama fase kritis',
      'Tanda Vital dan Produksi Urin per jam (target urin > 0.5 mL/kgBB/jam)',
      'Tanda Overload Cairan: Ronkhi paru, takipnea, efusi pleura masif, asites'
    ],
    sourceGuidelines: 'Pedoman Diagnosis dan Tata Laksana Infeksi Virus Dengue PAPDI & IDAI / PNPK Dengue Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'HATI-HATI FASE KRITIS (Hari ke-3 s.d ke-6 saat demam mulai turun!). Di fase inilah risiko syok kebocoran plasma tertinggi terjadi. Hentikan cairan infus segera saat fase pemulihan (reabsorpsi) untuk mencegah Edema Paru Akut.'
  },

  {
    id: 'guideline-typhoid',
    diseaseName: 'Demam Tifoid (Tifus Abdominalis Dewasa & Anak)',
    category: 'Anti-Infeksi',
    organization: 'PAPDI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'A01.0',
    indonesianKeywords: ['tifus', 'tipes', 'demam tifoid', 'widal', 'tubex', 'ceftriaxone', 'ciprofloxacin', 'azithromycin', 'kloramfenikol'],
    summary: 'Infeksi sistemik akut yang disebabkan oleh bakteri Salmonella enterica serovar Typhi, ditandai dengan demam step-ladder remiten, gangguan gastrointestinal (konstipasi/diare), hepatosplenomegali, dan lidah tifoid berkabut kotor.',
    targetGoals: [
      'Eradikasi Bakteri Salmonella Typhi & Penyembuhan Klinis Cepat',
      'Mencegah Komplikasi Toksik & Perforasi/Perdarahan Saluran Cerna',
      'Mencegah Kekambuhan (Relaps) dan Status Pembawa Kuman Kronis (Chronic Carrier)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Ceftriaxone',
        dosage: 'Dewasa: 2 - 4 gram IV sekali sehari selama 5 - 7 hari; Anak: 80 - 100 mg/kgBB/hari IV dibagi 1-2 dosis',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Sefalosporin generasi 3; pilihan lini pertama utama di Indonesia karena tingkat resistensi terhadap kuinolon meningkat.'
      },
      {
        drugName: 'Ciprofloxacin',
        dosage: '500 mg per oral dua kali sehari (BID) selama 7 - 10 hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Fluoroquinolone oral untuk pasien rawat jalan dewasa (hanya jika daerah setempat masih sensitif).'
      },
      {
        drugName: 'Azithromycin',
        dosage: 'Dewasa: 1000 mg oral hari ke-1, dilanjutkan 500 mg/hari hari ke 2-7; Anak: 10-20 mg/kgBB/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilihan oral terbaik pada wanita hamil, anak-anak, atau daerah dengan isolat resisten fluoroquinolone.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Kloramfenikol',
        dosage: 'Dewasa: 500 mg per oral 4 kali sehari (q6h) selama 14 hari; Anak: 50 - 100 mg/kgBB/hari dibagi 4 dosis',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Obat klasik efektif; membutuhkan durasi 14 hari untuk mencegah relaps (waspada risiko depresi sumsum tulang).'
      },
      {
        drugName: 'Cefixime',
        dosage: 'Dewasa: 200 mg per oral dua kali sehari selama 10 - 14 hari; Anak: 10 - 20 mg/kgBB/hari dibagi 2 dosis',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Sefalosporin oral alternatif untuk transisi oral pasca Ceftriaxone IV.'
      }
    ],
    nonPharmacological: [
      'Tirah baring (bed rest) selama fase demam untuk mencegah komplikasi perforasi usus halus.',
      'Diet Lunak Rendah Serat (Bubur Halus) mudah cerna yang tidak merangsang peristaltik usus.',
      'Higiene Sanitasi Makanan & Minuman: Minum air matang dan cuci tangan teratur dengan sabun.'
    ],
    specialPopulations: [
      {
        condition: 'Demam Tifoid pada Ibu Hamil & Anak Usia Dini',
        recommendation: 'Gunakan Ceftriaxone IV atau Azithromycin oral. Ciprofloxacin dan Kloramfenikol KONTRAINDIKASI.',
        contraindicatedDrugs: ['Ciprofloxacin pada kehamilan', 'Kloramfenikol pada trimester 3 (Grey Baby Syndrome)']
      }
    ],
    monitoringParameters: [
      'Waktu Bebas Demam (Fever Clearance Time - umumnya tercapai 3-5 hari setelah antibiotik)',
      'Tanda Bahaya Abdomen Akut (Perforasi Usus): Nyeri perut mendadak tajam, defans muskular, distensi abdomen',
      'Pemeriksaan Darah Lengkap serial (leukopenia, aneosinofilia, trombositopenia)'
    ],
    sourceGuidelines: 'Konsensus Penatalaksanaan Demam Tifoid PAPDI & IDAI / PNPK Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Antibiotik HARUS dihabiskan sesuai durasi yang ditentukan meskipun demam sudah turun dalam 3 hari, guna mencegah kekambuhan dan terbentuknya kolonisasi pembawa kuman di kandung empedu.'
  },

  {
    id: 'guideline-cap',
    diseaseName: 'Pneumonia Komunitas (Community-Acquired Pneumonia / CAP)',
    category: 'Anti-Infeksi',
    organization: 'PDPI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'J18.9',
    indonesianKeywords: ['pneumonia', 'paru-paru basah', 'infeksi paru', 'sesak napas', 'ceftriaxone', 'azithromycin', 'levofloxacin', 'amoxicillin'],
    summary: 'Infeksi parenkim paru akut yang didapat di masyarakat (luar fasilitas rumah sakit). Patogen tersering mencakup Streptococcus pneumoniae, Mycoplasma pneumoniae, Chlamydia pneumoniae, dan virus respirasi.',
    targetGoals: [
      'Resolusi Klinis Infeksi (Bebas Demam, Normalisasi Laju Napas & Leukosit)',
      'Mencegah Gagal Napas Akut & Sepsis',
      'Eradikasi Bakteri Patogen Penyebab'
    ],
    firstLineTherapy: [
      {
        drugName: 'Amoxicillin',
        dosage: '875 mg q12h ATAU 1000 mg q8h per oral selama 5 - 7 hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Lini pertama pasien Rawat Jalan TANPA komorbiditas atau faktor risiko resistensi antibiotik.'
      },
      {
        drugName: 'Azithromycin',
        dosage: '500 mg per oral pada hari ke-1, dilanjutkan 250 mg sekali sehari pada hari ke 2-5',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Makrolida untuk mencakup bakteri atipikal (Mycoplasma/Chlamydia).'
      },
      {
        drugName: 'Amoxicillin-Clavulanate',
        dosage: '875/125 mg per oral dua kali sehari selama 7 hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Lini pertama pasien Rawat Jalan DENGAN komorbiditas (Penyakit Jantung, DM, Ginjal, Paru Kronis) dikombinasi Makrolida/Doksisiklin.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Levofloxacin',
        dosage: '500 - 750 mg per oral atau IV sekali sehari selama 5 - 7 hari',
        role: 'Alternative',
        fornasTier: 'Faskes 2/3',
        notes: 'Fluoroquinolone Respirasi; alternatif monoterapi rawat jalan dengan komorbid atau alergi berat Penisilin.'
      },
      {
        drugName: 'Ceftriaxone',
        dosage: '1 - 2 gram IV sekali sehari (dikombinasikan dengan Azithromycin 500 mg IV/oral q24h)',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Regimen standar pasien CAP Rawat Inap Non-ICU selama 5 - 7 hari.'
      }
    ],
    nonPharmacological: [
      'Istirahat Cukup & Hidrasi Cairan Adekuat.',
      'Oksigenoterapi jika saturasi SpO2 < 92%.',
      'Fisioterapi dada dan latihan batuk efektif.',
      'Vaksinasi Pencegahan: Pneumokokus (PCV13/PPSV23) dan Influenza tahunan.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien Lansia atau Pasien dengan Riwayat Pemanjangan Interval QTc',
        recommendation: 'Hindari kombinasi Fluoroquinolone (Levofloxacin) dengan Makrolida (Azithromycin) karena risiko aritmia Torsades de Pointes fatal.',
        contraindicatedDrugs: ['Kombinasi Levofloxacin + Azithromycin']
      }
    ],
    monitoringParameters: [
      'Tanda Vital (Suhu tubuh, Laju pernapasan, Tekanan darah, SpO2) dalam 48-72 jam pertama',
      'Hitung Leukosit Darah Lengkap & Foto Toraks Evaluasi',
      'Skor Stratifikasi Keparahan (CURB-65 Score atau PSI/PORT Score)'
    ],
    sourceGuidelines: 'Diagnosis & Penatalaksanaan Pneumonia Komunitas PDPI & PAPDI / ATS-IDSA Guidelines',
    updatedYear: '2023',
    keyClinicalAlert: 'Durasi terapi antibiotik CAP tanpa komplikasi adalah 5 HARI jika pasien telah afebris (bebas demam) selama minimal 48 jam dan stabil secara klinis.'
  },

  {
    id: 'guideline-uti',
    diseaseName: 'Infeksi Saluran Kemih (Sistitis Akut & Pielonefritis)',
    category: 'Anti-Infeksi',
    organization: 'PAPDI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'N30.0',
    indonesianKeywords: ['anyang-anyangan', 'isk', 'infeksi kemih', 'kencing sakit', 'nitrofurantoin', 'cotrimoxazole', 'fosfomycin', 'cefixime'],
    summary: 'Infeksi bakteri pada saluran kemih bawah (kandung kemih/sistitis) atau atas (ginjal/pielonefritis). Patogen penyebab utama adalah Escherichia coli uropatogenik (UPEC).',
    targetGoals: [
      'Eradikasi Infeksi Bakteri Saluran Kemih',
      'Peredaan Cepat Gejala Disuria, Urgensi, dan Frekuensi Berkemih',
      'Mencegah Progresi ke Pielonefritis Akut & Urosepsis'
    ],
    firstLineTherapy: [
      {
        drugName: 'Nitrofurantoin',
        dosage: 'Monohydrate/Macrocrystals 100 mg per oral dua kali sehari (q12h) bersama makanan selama 5 hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Lini pertama utama sistitis akut; konsentrasi urin tinggi dengan resistensi E. coli yang sangat rendah.'
      },
      {
        drugName: 'Cotrimoxazole (TMP-SMX)',
        dosage: '160/800 mg (1 tablet Forte) per oral dua kali sehari selama 3 hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Lini pertama jika resistensi lokal E. coli terhadap TMP-SMX < 20%.'
      },
      {
        drugName: 'Fosfomycin Trometamol',
        dosage: '3 gram serbuk oral dosis tunggal dilarutkan dalam segelas air',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Pilihan praktis dosis tunggal dengan kepatuhan pasien 100%.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Cefixime',
        dosage: '400 mg per oral sekali sehari (atau 200 mg BID) selama 5 - 7 hari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Sefalosporin generasi 3 oral yang aman dan sering digunakan di Indonesia.'
      },
      {
        drugName: 'Ciprofloxacin',
        dosage: '250 - 500 mg per oral dua kali sehari selama 3 - 7 hari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Fluoroquinolone; dicadangkan HANYA jika lini pertama tidak dapat digunakan atau terdapat komplikasi Pielonefritis.'
      }
    ],
    nonPharmacological: [
      'Tingkatkan Asupan Cairan Air Putih: Minimal 2 - 2.5 liter/hari untuk membantu pembilasan bakteri mekanis.',
      'Jangan menahan buang air kecil dan biasakan BAK segera setelah berhubungan seksual.',
      'Kebersihan higienitas personal genital (membasuh dari arah depan ke belakang).'
    ],
    specialPopulations: [
      {
        condition: 'Ibu Hamil dengan ISK / Bakteriuria Asimtomatik',
        recommendation: 'Wajib diterapi dengan antibiotik aman kehamilan: Amoxicillin-Clavulanate 500/125 mg BID (7 hari) atau Cefixime 200 mg BID.',
        contraindicatedDrugs: ['Fluoroquinolone (Ciprofloxacin)', 'Cotrimoxazole (Trimester 1 & 3)', 'Nitrofurantoin (Trimester 3 dekat persalinan - risiko anemia hemolitik neonatus)']
      },
      {
        condition: 'Gangguan Fungsi Ginjal (eGFR < 30 mL/min)',
        recommendation: 'Hindari Nitrofurantoin karena konsentrasi obat di urin tidak mencapai kadar bakterisidal efektif.',
        contraindicatedDrugs: ['Nitrofurantoin jika eGFR < 30 mL/min']
      }
    ],
    monitoringParameters: [
      'Resolusi keluhan disuria (nyeri berkemih) dan frekuensi dalam 48 jam',
      'Urinalisis / Kultur Urin bila gejala tidak membaik atau kambuh dalam kurun waktu 2-4 minggu'
    ],
    sourceGuidelines: 'Panduan Penatalaksanaan Infeksi Saluran Kemih PAPDI / PPRA Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Hindari penggunaan berlebih antibiotik Fluoroquinolone (Ciprofloxacin) untuk sistitis sederhana tanpa komplikasi guna mencegah lonjakan resistensi kuman ESBL di Indonesia.'
  },

  // ==========================================
  // 5. PEDIATRI (KESEHATAN ANAK)
  // ==========================================
  {
    id: 'guideline-pediatric-diarrhea',
    diseaseName: 'Diare Akut Dehidrasi Ringan-Sedang pada Anak (Lintas Diare)',
    category: 'Pediatri (Kesehatan Anak)',
    organization: 'IDAI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'A09',
    indonesianKeywords: ['diare anak', 'mencret', 'lintas diare', 'zinc anak', 'oralit', 'dehidrasi anak', 'probiotik'],
    summary: 'Buang air besar dengan konsistensi cair/lembek lebih dari 3 kali dalam 24 jam yang berlangsung kurang dari 14 hari. Program LINTAS DIARE (Lima Langkah Tuntaskan Diare) Kemenkes RI & IDAI merupakan standar wajib penatalaksanaan.',
    targetGoals: [
      'Rehidrasi Cepat & Pencegahan Dehidrasi Berat',
      'Regenerasi Mukosa Usus & Pemendekan Durasi Diare dengan Suplementasi Zinc',
      'Pemberian Nutrisi Adekuat & Pencegahan Malnutrisi Sekunder'
    ],
    firstLineTherapy: [
      {
        drugName: 'Oralit (Oral Rehydration Salts / ORS Osmolaritas Rendah)',
        dosage: 'Anak < 1 thn: 50-100 mL tiap kali BAB cair; Anak >= 1 thn: 100-200 mL tiap kali BAB cair (diberikan sedikit-sedikit tapi sering)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilar 1 Lintas Diare: Formula osmolaritas rendah (245 mOsm/L) untuk mengganti cairan dan elektrolit yang hilang.'
      },
      {
        drugName: 'Zinc Sulfat Tablet Dispersibel / Sirup',
        dosage: 'Bayi < 6 bulan: 10 mg (1/2 tablet) sekali sehari; Anak >= 6 bulan: 20 mg (1 tablet) sekali sehari SELAMA 10 HARI BERTURUT-TURUT',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilar 2 Lintas Diare: WAJIB diminum 10 hari penuh meskipun diare sudah berhenti untuk mempercepat perbaikan mukosa usus dan mencegah diare berulang 2-3 bulan ke depan.'
      },
      {
        drugName: 'Probiotik (Lactobacillus reuteri / Saccharomyces boulardii)',
        dosage: '1 sachet / 5 tetes per oral 1 - 2 kali sehari selama 5 hari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Membantu memulihkan mikroflora usus normal dan mempersingkat durasi diare ~24 jam.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Cefixime Sirup',
        dosage: '10 - 15 mg/kgBB/hari dibagi 2 dosis selama 3 - 5 hari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Pilar 4 Lintas Diare (Antibiotik Selektif): Diberikan HANYA jika terbukti Diare Berdarah (Disentri / Shigella) atau kecurigaan Kolera.'
      }
    ],
    nonPharmacological: [
      'Pilar 3: Teruskan Pemberian ASI dan Makanan Pendamping ASI (MPASI) secara teratur.',
      'Pilar 5: Edukasi Tanda Bahaya Dehidrasi (Mata sangat cekung, anak sangat haus/tidak bisa minum, turgor kulit sangat lambat > 2 detik, anak lemas/tidak sadar -> SEGERA KE RS!).',
      'Jangan mempuasakan anak selama diare berlangsung.'
    ],
    specialPopulations: [
      {
        condition: 'Diare Akut Cair pada Anak',
        recommendation: 'DILARANG KERAS memberikan Obat Antimotilitas / Antidiare (Loperamide / Kaolin-Pektin) pada anak karena berisiko fatal memicu Ileus Paralitik, megakolon toksik, dan perforasi usus.',
        contraindicatedDrugs: ['Loperamide pada anak usia < 12 tahun', 'Antibiotik rutin tanpa indikasi disentri/kolera']
      }
    ],
    monitoringParameters: [
      'Status Derajat Dehidrasi Klinis (Turgor kulit abdomen, kecekungan mata, produksi air mata, rasa haus)',
      'Frekuensi BAB dan BAK (frekuensi buang air kecil)',
      'Tanda Feses Berdarah (Disentri)'
    ],
    sourceGuidelines: 'Pedoman Pelayanan Medis Ikatan Dokter Anak Indonesia (IDAI) / Program Lintas Diare Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Tablet ZINC 20 mg HARUS diminum selama 10 HARI PENUH meskipun diare sudah berhenti pada hari ke-2 atau ke-3, demi membentuk kekebalan mukosa usus.'
  },

  {
    id: 'guideline-febrile-seizure',
    diseaseName: 'Kejang Demam pada Anak (Sederhana & Kompleks)',
    category: 'Pediatri (Kesehatan Anak)',
    organization: 'IDAI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'R56.0',
    indonesianKeywords: ['kejang demam', 'step', 'anak kejang', 'diazepam rektal', 'paracetamol anak', 'stesolid', 'suhu tinggi'],
    summary: 'Bangkitan kejang yang terjadi pada kenaikan suhu tubuh (suhu rektal > 38°C) yang disebabkan oleh proses ekstrakranium pada anak usia 6 bulan hingga 5 tahun tanpa bukti infeksi intrakranial atau riwayat kejang tanpa demam sebelumnya.',
    targetGoals: [
      'Pemberhentian Kejang Akut Segera (< 5 Menit)',
      'Penurunan Suhu Tubuh dan Penanganan Infeksi Pemicu Demam',
      'Pencegahan Rekurensi Bangkitan Kejang & Edukasi Orang Tua Menghilangkan Panik'
    ],
    firstLineTherapy: [
      {
        drugName: 'Diazepam Rektal (Suppositoria Enema)',
        dosage: 'BB < 12 kg: 5 mg per rektal; BB >= 12 kg: 10 mg per rektal (diberikan saat kejang masih berlangsung)',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'Lini pertama penanganan kejang akut di rumah/faskes primer. Jika kejang belum berhenti dalam 5 menit, dapat diulang 1 kali dosis yang sama (maksimal 2 kali pemberian sebelum rujukan RS).'
      },
      {
        drugName: 'Diazepam IV',
        dosage: '0.2 - 0.5 mg/kgBB IV perlahan dengan kecepatan 2 mg/menit (dosis maksimal 10 mg)',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'Pilihan lini pertama di fasilitas kesehatan jika akses vena sudah terpasang.'
      },
      {
        drugName: 'Paracetamol Sirup / Drop',
        dosage: '10 - 15 mg/kgBB/kali per oral setiap 4 - 6 jam prn saat demam (Maksimal 4 kali sehari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Antipiretik utama untuk kenyamanan anak (meskipun antipiretik tidak terbukti mencegah bangkitan kejang demam).'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Diazepam Oral Intermiten',
        dosage: '0.3 mg/kgBB/kali per oral setiap 8 jam selama 48 jam pertama onset demam',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Profilaksis intermiten: Diberikan HANYA pada anak dengan riwayat kejang demam berulang frekuensi tinggi.'
      },
      {
        drugName: 'Asam Valproat Sirup',
        dosage: '15 - 40 mg/kgBB/hari per oral dibagi 2 - 3 dosis selama 1 tahun bebas kejang',
        role: 'Maintenance',
        fornasTier: 'Faskes 2/3',
        notes: 'Pengobatan rumatan jangka panjang: Diindikasikan HANYA pada Kejang Demam Kompleks dengan kelainan neurologis berat.'
      }
    ],
    nonPharmacological: [
      'Pertahankan jalan napas terbuka: Miringkan posisi tubuh anak untuk mencegah aspirasi muntahan/ludah.',
      'Jangan memasukkan benda apa pun ke dalam mulut anak saat kejang (sendok, jari, kain dilarang!).',
      'Longgarkan pakaian ketat dan lakukan kompres hangat (tepid water sponge) di dahi dan ketiak.',
      'Catat durasi kejang dan bentuk kejang (fokal atau umum).'
    ],
    specialPopulations: [
      {
        condition: 'Anak dengan Kejang Berlangsung > 15 Menit atau Kejang Berulang dalam 24 Jam',
        recommendation: 'Kategori Kejang Demam Kompleks / Status Konvulsivus: Wajib evaluasi cairan serebrospinal (Pungsi Lumbal) pada usia < 12 bulan untuk menyingkirkan Meningitis bakterial.',
        contraindicatedDrugs: ['Penundaan rujukan RS pada kejang > 10 menit']
      }
    ],
    monitoringParameters: [
      'Status Kesadaran Pasca-Kejang (fase post-iktal / letargi)',
      'Tanda Rangsang Meningeal (Kaku kuduk, tanda Brudzinski/Kernig)',
      'Sumber infeksi pemicu demam (ISPA, Otitis Media Akut, Gastroenteritis)'
    ],
    sourceGuidelines: 'Konsensus Penatalaksanaan Kejang Demam Ikatan Dokter Anak Indonesia (IDAI) / PNPK Neurologi Anak',
    updatedYear: '2023',
    keyClinicalAlert: 'Saat anak kejang di rumah: JANGAN MASUKKAN SENDOK/KOPI ke dalam mulut anak karena berisiko mematahkan gigi dan menyumbat jalan napas fatal!'
  },

  // ==========================================
  // 6. OBSTETRI & GINEKOLOGI (POGI)
  // ==========================================
  {
    id: 'guideline-preeclampsia',
    diseaseName: 'Preeklamsia Berat (PEB) & Eklamsia Kehamilan',
    category: 'Obstetri & Ginekologi',
    organization: 'POGI',
    fornasTier: 'Faskes 2/3 (RS Rujukan)',
    icd10: 'O14.1',
    indonesianKeywords: ['preeklamsia', 'eklamsia', 'keracunan kehamilan', 'tensi hamil', 'magnesium sulfat', 'mgso4', 'nifedipine hamil', 'proteinuria hamil'],
    summary: 'Hipertensi yang timbul setelah usia kehamilan 20 minggu (Tekanan Darah Sistolik >= 140 mmHg dan/atau Diastolik >= 90 mmHg) yang disertai proteinuria dan/atau disfungsi organ maternal berat. Merupakan salah satu penyebab utama kematian ibu (AKI) di Indonesia.',
    targetGoals: [
      'Pencegahan & Penghentian Kejang Eklamsia dengan Magnesium Sulfat (MgSO4)',
      'Penurunan Tekanan Darah Terkontrol (Target Sistolik 135-145 mmHg & Diastolik 85-95 mmHg)',
      'Stabilisasi Ibu & Terminasi Kehamilan pada Waktu yang Tepat (Definitive Management)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Magnesium Sulfat (MgSO4 40%) - Loading & Maintenance',
        dosage: 'Loading Dose: 4 gram MgSO4 (10 mL larutan 40%) dilarutkan dalam 100 mL RL IV habis dalam 15-20 menit. Maintenance: 1 gram/jam IV kontinu (atau 6 gram dalam 500 mL RL kecepatan 28 tpm) selama 24 jam pasca salin',
        role: 'Lini Pertama',
        fornasTier: 'Semua Faskes',
        notes: 'Gold Standard Antikonvulsan POGI: Terbukti superior mencegah dan menghentikan kejang eklamsia dibanding Diazepam/Fenitoin.'
      },
      {
        drugName: 'Nifedipine Kapsul / Tablet Lepas Cepat',
        dosage: '10 mg per oral ditelan dengan air (dapat diulang tiap 20-30 menit jika TD >= 160/110 mmHg, maks 30 mg)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Antihipertensi kerja cepat lini pertama untuk krisis hipertensi emergensi kehamilan.'
      },
      {
        drugName: 'Methyldopa',
        dosage: '250 - 500 mg per oral 2 - 3 kali sehari (Maksimal 2000 mg/hari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Agonis alfa-2 sentral; pilihan aman pemeliharaan hipertensi kronis pada kehamilan.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Kalsium Glukonat 10%',
        dosage: '1 gram (10 mL larutan 10%) IV perlahan dalam 5 - 10 menit',
        role: 'Acute Rescue',
        fornasTier: 'Semua Faskes',
        notes: 'ANTIDOTUM SPESIFIK: Wajib tersedia di samping tempat tidur pasien saat pemberian MgSO4 untuk mengatasi Intoksikasi Magnesium.'
      },
      {
        drugName: 'Dexamethasone / Betamethasone',
        dosage: 'Dexamethasone 6 mg IM setiap 12 jam (4 dosis) ATAU Betamethasone 12 mg IM q24h (2 dosis)',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Pematangan paru janin pada usia kehamilan < 34 minggu sebelum terminasi kehamilan.'
      }
    ],
    nonPharmacological: [
      'Tirah baring posisi miring ke kiri (Left Lateral Decubitus) untuk mengoptimalkan perfusi uteroplasenta.',
      'Pasang Kateter Urin Folley menetap untuk pemantauan cairan ketat (urin output).',
      'Terminasi Kehamilan (Persalinan Pervaginam / Seksio Sesarea) adalah satu-satunya terapi kuratif definitif preeklamsia.'
    ],
    specialPopulations: [
      {
        condition: 'Syarat Mutlak Pemberian MgSO4',
        recommendation: 'MgSO4 HANYA boleh diberikan bila memenuhi 3 syarat: (1) Refleks patella (+) normal; (2) Frekuensi napas >= 16 kali/menit; (3) Produksi urin >= 0.5 mL/kgBB/jam (atau >= 30 mL/jam dalam 4 jam terakhir).',
        contraindicatedDrugs: ['MgSO4 bila refleks patella negatif atau laju napas < 16 x/menit (Tanda intoksikasi fatal)']
      }
    ],
    monitoringParameters: [
      'Tanda Intoksikasi MgSO4 (Refleks patella, Frekuensi Pernapasan, Urin Output per jam)',
      'Tekanan Darah Ibu setiap 15 - 30 menit selama terapi aktif',
      'Kardiotokografi (KTG / Denyut Jantung Janin) berkala'
    ],
    sourceGuidelines: 'Pedoman Nasional Pelayanan Kedokteran Hipertensi dalam Kehamilan (POGI) / PNPK Obstetri Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Selalu siapkan KALSIUM GLUKONAT 10% di dekat ranjang pasien saat memberikan infus MgSO4 sebagai antidotum jika terjadi depresi napas atau hilangnya refleks patella.'
  },

  // ==========================================
  // 7. GASTROINTESTINAL & HEPATOLOGI
  // ==========================================
  {
    id: 'guideline-gerd',
    diseaseName: 'Gastroesophageal Reflux Disease (GERD) & Tukak Lambung',
    category: 'Gastrointestinal',
    organization: 'PGI-PEGI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'K21.9',
    indonesianKeywords: ['gerd', 'asam lambung', 'maag', 'nyeri ulu hati', 'heartburn', 'omeprazole', 'lansoprazole', 'sucralfate'],
    summary: 'Kondisi refluks isi lambung ke dalam esofagus yang menimbulkan gejala mengganggu (heartburn / rasa terbakar di dada, regurgitasi asam) dan/atau komplikasi mukosa esofagus.',
    targetGoals: [
      'Peredaan Cepat dan Menyeluruh Gejala Heartburn & Regurgitasi',
      'Penyembuhan Mukosa Esofagitis Erosif (Mukosa Esofagus Utuh)',
      'Pencegahan Komplikasi Jangka Panjang (Strikturnya Esofagus & Barrett’s Esophagus)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Omeprazole',
        dosage: '20 - 40 mg per oral sekali sehari 30-60 menit sebelum sarapan pagi selama 4 - 8 minggu',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Proton Pump Inhibitor (PPI); supresor asam lambung paling poten untuk penyembuhan esofagitis erosif.'
      },
      {
        drugName: 'Lansoprazole',
        dosage: '30 mg per oral sekali sehari sebelum makan pagi selama 4 - 8 minggu',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'PPI alternatif dengan bioavailabilitas tinggi dan onset cepat.'
      },
      {
        drugName: 'Esomeprazole',
        dosage: '20 - 40 mg per oral sekali sehari 30-60 menit sebelum makan pagi',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'S-enantiomer omeprazole dengan kontrol supresi pH lambung yang sangat stabil.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Famotidine',
        dosage: '20 - 40 mg per oral 1 - 2 kali sehari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'H2-Receptor Antagonist (H2RA); digunakan untuk gejala refluks malam hari (nocturnal acid breakthrough) atau pemeliharaan dosis rendah.'
      },
      {
        drugName: 'Sucralfate',
        dosage: '1000 mg (1 gram / 5 mL suspensi) per oral 3 - 4 kali sehari saat perut kosong',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Mukoprotektor pelapis mukosa lambung dan esofagus dari erosi asam dan pepsin.'
      },
      {
        drugName: 'Domperidone',
        dosage: '10 mg per oral 3 kali sehari 15-30 menit sebelum makan (maksimal 7 hari)',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Prokinetik lambung untuk mempercepat pengosongan gastrik pada GERD dengan keluhan begah/gastroparesis.'
      }
    ],
    nonPharmacological: [
      'Modifikasi Pola Makan: Hindari makanan berlemak tinggi, cokelat, kopi, mint, makanan pedas/asam.',
      'Hindari berbaring atau tidur minimal 2 - 3 jam setelah makan.',
      'Elevasi Kepala Tempat Tidur: Tinggikan kepala tempat tidur 15 - 20 cm saat tidur malam.',
      'Penurunan berat badan pada pasien obesitas dan hindari pakaian ketat yang menekan perut.'
    ],
    specialPopulations: [
      {
        condition: 'Eradikasi Helicobacter pylori pada Tukak Peptik',
        recommendation: 'Regimen Tripel 14 Hari: PPI (Omeprazole 20 mg BID) + Amoxicillin 1000 mg BID + Clarithromycin 500 mg BID.',
        contraindicatedDrugs: ['Monoterapi PPI tanpa antibiotik pada ulkus aktif H. pylori positif']
      }
    ],
    monitoringParameters: [
      'Evaluasi peredaan gejala heartburn setelah 2-4 minggu terapi PPI',
      'Tanda Bahaya (Alarm Symptoms): Disfagia (sulit menelan), odinofagia (sakit menelan), anemia defisiensi besi, hematemesis/melena, atau penurunan BB drastis (Wajib Endoskopi SCBA segera!)'
    ],
    sourceGuidelines: 'Konsensus Nasional Penatalaksanaan GERD Perkumpulan Gastroenterologi Indonesia (PGI-PEGI) / PNPK Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'PPI HARUS diminum 30 - 60 menit SEBELUM MAKAN PAGI saat pompa proton dalam sel parietal lambung sedang aktif diaktifkan oleh makanan.'
  },

  // ==========================================
  // 8. REUMATOLOGI & NEFROLOGI
  // ==========================================
  {
    id: 'guideline-gout',
    diseaseName: 'Artritis Gout Akut & Terapi Penurun Asam Urat (ULT)',
    category: 'Reumatologi & Ginjal',
    organization: 'IRA',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'M10.9',
    indonesianKeywords: ['asam urat', 'gout', 'sendi bengkak jempol', 'allopurinol', 'colchicine', 'febuxostat', 'tofus'],
    summary: 'Artritis inflamasi akut yang dipicu oleh pengendapan kristal Monosodium Urat (MSU) pada persendian akibat hiperurisemia kronis (kadar asam urat serum > 6.8 mg/dL).',
    targetGoals: [
      'Peredaan Nyeri & Inflamasi Akut dalam 24 Jam Pertama',
      'Target Kadar Asam Urat Serum: < 6.0 mg/dL (< 360 mcmol/L) untuk melarutkan kristal urat',
      'Target Asam Urat pada Gout Kronis Berat Bertofus: < 5.0 mg/dL',
      'Pencegahan Kekambuhan Serangan & Kerusakan Sendi Permanen'
    ],
    firstLineTherapy: [
      {
        drugName: 'Colchicine',
        dosage: '1.0 mg saat onset tanda pertama, diikuti 0.5 mg 1 jam kemudian (Maks 1.5 mg dlm 1 jam)',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'Lini pertama serangan akut jika dimulai dalam kurun waktu <= 36 jam sejak onset gejala. Lanjutkan profilaksis 0.5 mg 1-2x/hari.'
      },
      {
        drugName: 'Ibuprofen / Natrium Diklofenak',
        dosage: 'Ibuprofen 400 - 800 mg TID atau Diklofenak 50 mg BID-TID bersama makanan selama 3-5 hari',
        role: 'Acute Rescue',
        fornasTier: 'Faskes 1',
        notes: 'NSAID poten untuk meredakan nyeri inflamasi akut sendi.'
      },
      {
        drugName: 'Allopurinol',
        dosage: 'Awal 100 mg per oral sekali sehari, titrasi naik 100 mg tiap 2-4 minggu hingga Target Asam Urat < 6.0 mg/dL (Maks 800 mg/hari)',
        role: 'Maintenance',
        fornasTier: 'Faskes 1',
        notes: 'Urate-Lowering Therapy (ULT) Lini Pertama: Inhibitor Xantin Oksidase. Diberikan jangka panjang bersama profilaksis Colchicine.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Febuxostat',
        dosage: '40 - 80 mg per oral sekali sehari (Maks 120 mg/hari)',
        role: 'Alternative',
        fornasTier: 'Faskes 2/3',
        notes: 'Inhibitor Xantin Oksidase non-purin poten; pilihan utama pada pasien dengan alergi/intoleransi Allopurinol atau gagal ginjal sedang-berat.'
      },
      {
        drugName: 'Methylprednisolone',
        dosage: '16 - 32 mg per oral sekali sehari selama 5 hari (tapering off)',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Kortikosteroid oral untuk serangan gout akut pada pasien dengan kontraindikasi NSAID dan Colchicine (e.g. gagal ginjal berat).'
      }
    ],
    nonPharmacological: [
      'Batasi Makanan Tinggi Purin: Jeroan (hati, babat, usus), daging merah berlebih, makanan laut (seafood seperti kerang, udang, sarden).',
      'HINDARI ALKOHOL (terutama Bir) dan minuman manis kaya fruktosa / High-Fructose Corn Syrup (HFCS).',
      'Cukupi Asupan Air Putih: Minimal 2 - 3 liter per hari untuk membantu ekskresi asam urat renal.',
      'Kompres Dingin (Es) pada sendi yang bengkak meradang untuk mengurangi rasa nyeri akut.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien Gangguan Ginjal Kronis (CKD)',
        recommendation: 'Inisiasi Allopurinol dari dosis sangat rendah: 50 mg/hari pada eGFR < 30 mL/min, titrasi bertahap. Hindari NSAID.',
        contraindicatedDrugs: ['NSAID dosis tinggi pada CKD stadium 3-5']
      }
    ],
    monitoringParameters: [
      'Kadar Asam Urat Serum berkala setiap 2-4 minggu selama masa titrasi ULT, lalu tiap 6 bulan setelah target stabil',
      'Skrining Ruam Kulit / Sindrom Hipersensitivitas Allopurinol (AHS / SJS-TEN)',
      'Fungsi Ginjal (eGFR) dan Enzim Hepar (SGOT/SGPT)'
    ],
    sourceGuidelines: 'Pedoman Diagnosis dan Pengelolaan Gout Indonesian Rheumatology Association (IRA) / ACR Guidelines',
    updatedYear: '2024',
    keyClinicalAlert: 'Terapi penurun asam urat (Allopurinol) WAJIB didampingi terapi profilaksis antiinflamasi (Colchicine 0.5 mg/hari) selama 3 - 6 bulan pertama untuk mencegah serangan "flare" gout.'
  },

  {
    id: 'guideline-osteoarthritis',
    diseaseName: 'Osteoartritis Sendi Lutut & Panggul (OA Genu)',
    category: 'Reumatologi & Ginjal',
    organization: 'IRA',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'M17.9',
    indonesianKeywords: ['pengapuran sendi', 'osteoartritis', 'nyeri lutut', 'radang sendi lutut', 'celecoxib', 'paracetamol', 'meloxicam', 'glukosamin'],
    summary: 'Penyakit sendi degeneratif kronis yang ditandai dengan kerusakan progresif kartilago sendi, pembentukan osteofit, dan sklerosis subkondral, menyebabkan nyeri sendi mekanik dan kekakuan.',
    targetGoals: [
      'Peredaan Nyeri Sendi Mekanik & Mengurangi Kekakuan Pagi Hari',
      'Mempertahankan dan Memperbaiki Mobilitas Sendi serta Fungsi Fisik',
      'Mencegah Progresi Kerusakan Sendi & Meminimalkan Toksisitas NSAID Sistemik'
    ],
    firstLineTherapy: [
      {
        drugName: 'Paracetamol',
        dosage: '500 - 1000 mg per oral 3 - 4 kali sehari (Maksimal 3000 mg/hari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Analgesik lini pertama pilihan awal untuk nyeri OA ringan-sedang karena profil keamanan gastrointestinal dan kardiovaskular yang baik.'
      },
      {
        drugName: 'NSAID Topikal (Gel Natrium Diklofenak 1%)',
        dosage: 'Oleskan 2 - 4 gram pada sendi lutut yang nyeri 3 - 4 kali sehari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Pilihan lini pertama utama IRA/OARSI untuk OA Lutut; efikasi setara NSAID oral dengan absorpsi sistemik sangat minimal (< 5%).'
      },
      {
        drugName: 'Celecoxib',
        dosage: '100 - 200 mg per oral sekali atau dua kali sehari bersama makanan',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Inhibitor COX-2 Selektif; pilihan oral lini pertama pada pasien dengan riwayat dispepsia / risiko perdarahan gastrointestinal.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Meloxicam',
        dosage: '7.5 - 15 mg per oral sekali sehari bersama makanan',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'NSAID preferensial COX-2 dengan dosis harian tunggal yang praktis.'
      },
      {
        drugName: 'Injeksi Intra-Artikular Asam Hialuronat (Hyaluronic Acid)',
        dosage: 'Injeksi intra-artikular 1 vial seminggu sekali selama 3-5 minggu berturut-turut',
        role: 'Alternative',
        fornasTier: 'Faskes 2/3',
        notes: 'Viskosuplementasi pelumas sendi lutut untuk OA derajat Kellgren-Lawrence II-III yang tidak respon obat oral.'
      }
    ],
    nonPharmacological: [
      'Penurunan Berat Badan: Setiap penurunan 1 kg BB mengurangi beban lutut hingga 4 kg saat berjalan.',
      'Latihan Fisik Berdampak Rendah (Low-impact Exercise): Berenang, bersepeda statis, dan penguatan otot kuadrisep paha.',
      'Penggunaan Alat Bantu Jalan (Tongkat pada sisi kontralateral) dan Knee Brace / Deker lutut.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien Lansia dengan Komorbid Kardiovaskular & Hipertensi',
        recommendation: 'Hindari NSAID oral jangka panjang. Gunakan NSAID Topikal atau Paracetamol dosis terkontrol.',
        contraindicatedDrugs: ['NSAID oral non-selektif dosis tinggi kronis']
      }
    ],
    monitoringParameters: [
      'Skor Nyeri VAS (Visual Analog Scale) dan Indeks Fungsi WOMAC',
      'Tekanan Darah dan Fungsi Ginjal (Kreatinin Serum) pada pengguna NSAID oral',
      'Gejala Dispepsia dan Perdarahan Saluran Cerna'
    ],
    sourceGuidelines: 'Rekomendasi Diagnosis dan Pengelolaan Osteoartritis Indonesian Rheumatology Association (IRA) / OARSI Guidelines',
    updatedYear: '2023',
    keyClinicalAlert: 'Utamakan NSAID TOPIKAL (Gel Diklofenak) terlebih dahulu sebelum beralih ke NSAID oral untuk meminimalkan risiko ulkus lambung dan komplikasi ginjal pada lansia.'
  },

  {
    id: 'guideline-ckd',
    diseaseName: 'Penyakit Ginjal Kronik (CKD Stage 1-4) & Renoproteksi',
    category: 'Reumatologi & Ginjal',
    organization: 'PERNEFRI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'N18.9',
    indonesianKeywords: ['gagal ginjal', 'ckd', 'cuci darah', 'kreatinin tinggi', 'proteinuria', 'candesartan', 'empagliflozin', 'renoproteksi'],
    summary: 'Abnormalitas struktur atau fungsi ginjal yang berlangsung lebih dari 3 bulan dengan implikasi kesehatan, ditandai dengan eGFR < 60 mL/min/1.73m² atau bukti kerusakan ginjal (Albuminuria UACR >= 30 mg/g).',
    targetGoals: [
      'Memperlambat Penurunan Laju Filtrasi Glomerulus (eGFR)',
      'Reduksi Albuminuria / Proteinuria minimal 30 - 50% dari baseline',
      'Kontrol Tekanan Darah Terarah: TD Sistolik < 120 mmHg (KDIGO 2024)',
      'Pencegahan Komplikasi Kardiovaskular & Penyakit Mineral Tulang (CKD-MBD)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Candesartan / Lisinopril',
        dosage: 'Candesartan 8 - 16 mg/hari ATAU Lisinopril 10 - 20 mg/hari (titrasi ke dosis toleransi tertinggi)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'ACEi atau ARB; fondasi utama renoproteksi pada CKD dengan Diabetes atau CKD dengan Albuminuria (UACR >= 30 mg/g).'
      },
      {
        drugName: 'Empagliflozin / Dapagliflozin',
        dosage: '10 mg per oral sekali sehari pagi hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'SGLT2 Inhibitor; pilar renoprotektif modern yang terbukti memperlambat progresi gagal ginjal terminal (ESRD) dan mortalitas pada CKD dengan/tanpa DM (studi EMPA-KIDNEY).'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Kalsium Karbonat (CaCO3)',
        dosage: '500 - 1000 mg per oral 3 kali sehari BERSAMA MAKANAN',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Phosphate Binder; mengikat fosfat dari makanan di saluran cerna untuk mencegah hiperfosfatemia dan osteodistrofi renal.'
      },
      {
        drugName: 'Natrium Bikarbonat',
        dosage: '500 - 1000 mg per oral 2 - 3 kali sehari',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Koreksi Asidosis Metabolik Kronis pada CKD (target kadar bikarbonat serum 22 - 26 mEq/L).'
      }
    ],
    nonPharmacological: [
      'Pembatasan Asupan Protein: 0.6 - 0.8 gram/kgBB/hari pada CKD stadium 3-5 non-dialisis.',
      'Diet Rendah Garam Natrium: < 2 gram natrium/hari (< 5 gram NaCl/hari).',
      'Batasi Makanan Tinggi Kalium (pisang, alpukat, air kelapa) bila kalium serum >= 5.0 mEq/L.'
    ],
    specialPopulations: [
      {
        condition: 'Peningkatan Serum Kreatinin Pasca-Inisiasi ACEi/ARB/SGLT2i',
        recommendation: 'Peningkatan kreatinin hingga 30% dari baseline dalam 4 minggu pertama adalah efek hemodinamik normal dan bersifat reversibel (jangan langsung dihentikan!). Hentikan HANYA jika kreatinin naik > 30% atau Kalium > 5.5 mEq/L refrakter.',
        contraindicatedDrugs: ['Penghentian prematur obat renoprotektif tanpa indikasi objektif']
      }
    ],
    monitoringParameters: [
      'eGFR dan Serum Kreatinin berkala tiap 3-6 bulan',
      'Rasio Albumin-Kreatinin Urin (UACR) kuantitatif',
      'Kadar Kalium, Kalsium, Fosfat, dan Bikarbonat Serum'
    ],
    sourceGuidelines: 'Konsensus Pencegahan dan Penatalaksanaan CKD PERNEFRI / KDIGO 2024 Clinical Practice Guideline',
    updatedYear: '2024',
    keyClinicalAlert: 'HINDARI PENGGUNAAN NSAID (seperti Asam Mefenamat, Natrium Diklofenak, Ibuprofen) pada pasien CKD karena dapat memicu gagal ginjal akut dekompensasi (AKI on CKD) yang ireversibel.'
  },

  // ==========================================
  // 9. SISTEM SARAF & PSIKIATRI (PERDOSSI & KEMENKES)
  // ==========================================
  {
    id: 'guideline-acute-ischemic-stroke',
    diseaseName: 'Stroke Iskemik Akut & Pencegahan Sekunder',
    category: 'Sistem Saraf & Psikiatri',
    organization: 'PERDOSSI',
    fornasTier: 'Faskes 2/3 (RS Rujukan)',
    icd10: 'I63.9',
    indonesianKeywords: ['stroke', 'lumpuh sebelah', 'bicara pelo', 'mulut mencong', 'alteplase', 'aspirin', 'clopidogrel', 'citicoline', 'ct scan kepala'],
    summary: 'Defisit neurologis fokal akut akibat oklusi mendadak arteri serebral yang menyebabkan infark jaringan otak. Membutuhkan evaluasi trombolisis intravena darurat dalam jendela waktu emas (golden period < 4.5 jam).',
    targetGoals: [
      'Reperfusi Jaringan Otak Segera: Trombolisis IV (rtPA) dalam Onset < 4.5 Jam',
      'Pencegahan Stroke Berulang dengan Terapi Antiplatelet Dini',
      'Neuroproteksi & Rehabilitasi Medik Dini untuk Meminimalkan Kecacatan Permanen'
    ],
    firstLineTherapy: [
      {
        drugName: 'Alteplase (rtPA)',
        dosage: '0.9 mg/kgBB IV (Dosis Maksimal 90 mg): 10% bolus IV dalam 1 menit, 90% sisanya via infus kontinu dalam 60 menit',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'Trombolitik lini pertama untuk Stroke Iskemik Akut onset < 4.5 jam setelah CT-Scan menyingkirkan perdarahan intrakranial.'
      },
      {
        drugName: 'Aspirin (Asam Asetilsalisilat)',
        dosage: 'Loading 160 - 320 mg per oral dalam 24 - 48 jam pertama pasca onset stroke, dilanjutkan 80 - 100 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Antiplatelet lini pertama untuk pencegahan sekunder (tunda 24 jam bila pasien menerima trombolisis rtPA).'
      },
      {
        drugName: 'Clopidogrel + Aspirin (DAPT Jangka Pendek)',
        dosage: 'Clopidogrel 300 mg loading dilanjutkan 75 mg/hari + Aspirin 100 mg/hari SELAMA 21 HARI PERTAMA',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Diindikasikan pada Stroke Iskemik Minor (NIHSS <= 3) atau TIA Risiko Tinggi (ABCD2 score >= 4) dalam kurun waktu 24 jam pertama (studi CHANCE/POINT).'
      },
      {
        drugName: 'Atorvastatin',
        dosage: '40 - 80 mg per oral sekali sehari pada malam hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Statin intensitas tinggi untuk stabilisasi plak aterosklerosis arteri karotis/serebral.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Citicoline',
        dosage: '500 - 1000 mg IV / oral 2 kali sehari selama fase akut',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 1',
        notes: 'Neuroprotektor prekursor fosfolipid membran saraf yang banyak digunakan di Indonesia.'
      }
    ],
    nonPharmacological: [
      'Aktivasi Code Stroke RS dan CT Scan Kepala Non-Kontras CITO emergensi.',
      'Elevasi Kepala Tempat Tidur 30 Derajat untuk memfasilitasi aliran balik vena jugularis.',
      'Manajemen Tekanan Darah Akut: Pertahankan TD < 185/110 mmHg jika kandidat trombolisis; pada non-trombolisis jangan turunkan TD kecuali > 220/120 mmHg (permissive hypertension untuk perfusi penumbra).',
      'Skrining Disfagia Tes Menelan sebelum pemberian makanan/obat oral untuk mencegah Pneumonia Aspirasi.'
    ],
    specialPopulations: [
      {
        condition: 'Pasien Pasca Trombolisis rtPA',
        recommendation: 'DILARANG memberikan Antiplatelet (Aspirin/Clopidogrel) atau Antikoagulan dalam 24 JAM PERTAMA pasca rtPA. Lakukan CT Scan ulang sebelum memulai antiplatelet.',
        contraindicatedDrugs: ['Aspirin / Heparin dalam 24 jam pertama pasca Alteplase']
      }
    ],
    monitoringParameters: [
      'Skor Defisit Neurologis NIHSS (National Institutes of Health Stroke Scale) serial',
      'Tekanan Darah setiap 15 menit selama pemberian trombolisis',
      'Tanda Perdarahan Intrakranial Simtomatik (penurunan kesadaran mendadak, muntah proyektil, nyeri kepala hebat)'
    ],
    sourceGuidelines: 'Panduan Tata Laksana Stroke Perhimpunan Dokter Spesialis Neurologi Indonesia (PERDOSSI) / PNPK Stroke Kemenkes RI',
    updatedYear: '2023',
    keyClinicalAlert: 'Waktu adalah Otak (Time is Brain - 1.9 juta neuron mati setiap menit!). Bawa segera ke Rumah Sakit dengan fasilitas CT-Scan dalam kurun waktu < 4.5 JAM sejak onset gejala (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call).'
  },

  {
    id: 'guideline-mdd',
    diseaseName: 'Gangguan Depresi Mayor (Major Depressive Disorder / MDD)',
    category: 'Sistem Saraf & Psikiatri',
    organization: 'PNPK Kemenkes RI',
    fornasTier: 'Semua Tingkat Faskes',
    icd10: 'F32.9',
    indonesianKeywords: ['depresi', 'stres berat', 'kehilangan minat', 'susah tidur', 'cemas', 'sertraline', 'fluoxetine', 'escitalopram', 'amitriptyline'],
    summary: 'Gangguan suasana perasaan (mood) persisten yang ditandai dengan perasaan sedih mendalam, kehilangan minat/anhedonia, kelelahan, gangguan tidur, dan penurunan fungsi psikososial minimal 2 minggu berturut-turut.',
    targetGoals: [
      'Remisi Total Gejala Depresi (Kembalinya Fungsi Psikososial & Pekerjaan Normal)',
      'Pencegahan Relaps dan Kekambuhan Episode Depresi Lanjutan',
      'Mencegah Risiko Perilaku Bunuh Diri (Suicidality)'
    ],
    firstLineTherapy: [
      {
        drugName: 'Sertraline',
        dosage: 'Awal 25 - 50 mg per oral sekali sehari pagi hari, titrasi bertahap hingga 100 - 200 mg/hari',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'Selective Serotonin Reuptake Inhibitor (SSRI); profil keamanan kardiovaskular terbaik (pilihan utama pada pasien pasca infark miokard).'
      },
      {
        drugName: 'Fluoxetine',
        dosage: '20 mg per oral sekali sehari pada pagi hari (rentang 20 - 60 mg/hari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 1',
        notes: 'SSRI dengan waktu paruh metabolit terpanjang (~7-15 hari); risiko sindrom putus obat (discontinuation syndrome) paling rendah.'
      },
      {
        drugName: 'Escitalopram',
        dosage: '10 mg per oral sekali sehari (Maks 20 mg/hari; lansia maks 10 mg/hari)',
        role: 'Lini Pertama',
        fornasTier: 'Faskes 2/3',
        notes: 'SSRI paling selektif dengan interaksi obat sitokrom CYP450 yang sangat minimal.'
      }
    ],
    secondLineTherapy: [
      {
        drugName: 'Quetiapine',
        dosage: 'Sediaan XR 50 - 300 mg per oral sekali sehari pada malam hari sebelum tidur',
        role: 'Combination / Add-On',
        fornasTier: 'Faskes 2/3',
        notes: 'Antipsikotik Atipikal (Ajuvan); terapi tambahan lini kedua untuk Depresi Resisten Terapi (TRD) atau disertai insomnia berat.'
      },
      {
        drugName: 'Amitriptyline',
        dosage: 'Awal 25 - 50 mg per oral malam hari, titrasi hingga 75 - 150 mg/hari',
        role: 'Alternative',
        fornasTier: 'Faskes 1',
        notes: 'Antidepresan Trisiklik (TCA); efektif namun memiliki efek samping sedatif dan antikolinergik lebih tinggi.'
      }
    ],
    nonPharmacological: [
      'Psikoterapi Berbasis Bukti: Cognitive Behavioral Therapy (CBT) dan Interpersonal Therapy (IPT).',
      'Olahraga Fisik Teratur & Terapi Paparan Cahaya Terang (Light Therapy).',
      'Higiene Tidur (Sleep Hygiene) dan meditasi mindfulness.',
      'Dukungan Keluarga & Konseling Komunitas.'
    ],
    specialPopulations: [
      {
        condition: 'Remaja dan Dewasa Muda (usia < 24 tahun)',
        recommendation: 'Pantau ketat dalam 4-6 minggu pertama inisiasi antidepresan terhadap risiko ideasi bunuh diri paradoksal (FDA Black Box Warning).',
        contraindicatedDrugs: ['Penghentian obat mendadak tanpa tapering off']
      }
    ],
    monitoringParameters: [
      'Skala Keparahan Depresi Klinis (PHQ-9 atau HAM-D Score) pada minggu ke-2, ke-4, ke-6, dan ke-12',
      'Evaluasi Onset Kerja Obat (perbaikan mood umumnya membutuhkan waktu 2 - 4 minggu)',
      'Skrining Risiko Ideasi atau Perilaku Bunuh Diri pada setiap sesi'
    ],
    sourceGuidelines: 'Pedoman Nasional Pelayanan Kedokteran Jiwa (PNPK Jiwa Kemenkes RI) / APA Practice Guideline for MDD',
    updatedYear: '2024',
    keyClinicalAlert: 'Terapi antidepresan WAJIB dilanjutkan selama minimal 6 - 9 BULAN setelah tercapainya remisi gejala penuh untuk mencegah kekambuhan episode depresi.'
  }
];
