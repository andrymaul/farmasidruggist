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
  },
{
    "id": "guideline-postpartum-hemorrhage",
    "diseaseName": "Perdarahan Pasca Persalinan (Postpartum Hemorrhage / HPP)",
    "category": "Obstetri & Ginekologi",
    "organization": "POGI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "O72.1",
    "indonesianKeywords": [
      "pendarahan melahirkan",
      "perdarahan postpartum",
      "hpp",
      "atonia uteri",
      "oksitosin",
      "asam traneksamat",
      "metilergometrin",
      "misoprostol"
    ],
    "summary": "Kehilangan darah > 500 mL setelah persalinan pervaginam atau > 1000 mL setelah seksio sesarea, atau perdarahan yang memicu ketidakstabilan hemodinamik. Merupakan penyebab utama kematian maternal. Etiologi 4T: Tonus (Atonia Uteri 70%), Tissue (Retensio Plasenta), Trauma (Laserasi Jalan Lahir), dan Thrombin (Koagulopati).",
    "targetGoals": [
      "Hentikan Perdarahan Aktif Sesegera Mungkin (< 30-60 Menit)",
      "Pertahankan Stabilitas Hemodinamik (Tekanan Darah Sistolik >= 90 mmHg, Nadi < 100 bpm, Produksi Urin >= 0.5 mL/kg/jam)",
      "Cegah Trias Kematian Hipotermia, Asidosis, dan Koagulopati Konsumtif"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Oxytocin",
        "dosage": "Profilaksis: 10 IU IM segera setelah bayi lahir (MAK III). Terapi Atonia: 20 - 40 IU dalam 1000 mL NaCl 0.9%/RL IV drip 40-60 tetes/menit",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Uterotonika lini pertama baku emas; merangsang kontraksi ritmik miometrium segmen atas uterus secara kuat."
      },
      {
        "drugName": "Tranexamic Acid",
        "dosage": "1 gram (100 mg/mL, 10 mL) IV bolus lambat dalam 10 menit (dalam kurun waktu < 3 jam pasca salin); dapat diulang 1 gram setelah 30 menit jika perdarahan berlanjut",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antifibrinolitik (rekomendasi WHO & WOMAN Trial); mengurangi mortalitas akibat perdarahan tanpa meningkatkan risiko trombosis."
      },
      {
        "drugName": "Methylergometrine",
        "dosage": "0.2 mg IM atau IV lambat (dapat diulang tiap 2-4 jam, maks 5 dosis / 1 mg/hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Alkaloid ergot pemicu kontraksi tetanik miometrium. KONTRAINDIKASI MUTLAK pada Preeklamsia, Hipertensi Gestasional, dan Penyakit Jantung."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Misoprostol",
        "dosage": "600 - 800 mcg per oral sublingual atau per rektal (dosis tunggal)",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Analog Prostaglandin E1; sangat stabil pada suhu ruang, pilihan utama jika oksitosin dingin tidak tersedia di faskes primer."
      }
    ],
    "nonPharmacological": [
      "Manajemen Aktif Kala III (MAK III) secara rutin pada semua persalinan.",
      "Masase Fundus Uteri segera pasca pengeluaran plasenta.",
      "Kompresi Bimanual Interna (KBI) dan Kompresi Bimanual Eksterna (KBE) atau Kompresi Aorta Abdominalis.",
      "Pemasangan Balon Tamponade Uterus (Kondom Kateter Uterin) jika atonia belum teratasi.",
      "Resusitasi Cairan Kristaloid Hangat jalur ganda (jarum IV 16-18G) dengan rasio penggantian 3:1 dan transfusi PRC jika Hb < 8 g/dL atau syok."
    ],
    "specialPopulations": [
      {
        "condition": "Ibu dengan Preeklamsia Berat atau Riwayat Hipertensi Kronis",
        "recommendation": "HINDARI Methylergometrine; gunakan Oksitosin IV infus kontinu dan Misoprostol sublingual/rektal.",
        "contraindicatedDrugs": [
          "Methylergometrine (memicu krisis hipertensi ensefalopati dan stroke perdarahan)"
        ]
      }
    ],
    "monitoringParameters": [
      "Tanda-tanda Vital (Tekanan Darah, Denyut Jantung, Laju Napas, Saturasi SpO2) setiap 15 menit",
      "Tonus Kontraksi Uterus (teraba keras dan bundar)",
      "Estimasi Volume Perdarahan dan Produksi Urin melalui Kateter Folley (target >= 30 mL/jam)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Perdarahan Pasca Persalinan Kemenkes RI / Rekomendasi POGI / WHO Guidelines on Postpartum Haemorrhage",
    "updatedYear": "2024",
    "keyClinicalAlert": "Setiap menit sangat berharga! Berikan Asam Traneksamat 1 gram IV sesegera mungkin dalam rentang waktu < 3 JAM pertama sejak timbulnya perdarahan postpartum."
  },
  {
    "id": "guideline-hypothyroidism",
    "diseaseName": "Hipotiroidisme Primer Dewasa & Tiroiditis Hashimoto",
    "category": "Endokrin & Metabolik",
    "organization": "PERKENI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "E03.9",
    "indonesianKeywords": [
      "kurang hormon tiroid",
      "hipotiroid",
      "levothyroxine",
      "euthyrox",
      "hashimoto",
      "tsh tinggi",
      "badan bengkak",
      "lemas lambat"
    ],
    "summary": "Kondisi defisiensi hormon tiroid sistemik akibat kegagalan kelenjar tiroid memproduksi tiroksin (T4) dan triiodotironin (T3) dalam jumlah adekuat, ditandai peningkatan TSH serum (>4.5 mIU/L) dan penurunan FT4 bebas. Penyebab tersering di daerah non-defisiensi iodium adalah tiroiditis autoimun (Hashimoto).",
    "targetGoals": [
      "Normalisasi Kadar TSH Serum Sesuai Usia (Target 0.5 - 2.5 mIU/L pada dewasa muda; 1.0 - 3.0 mIU/L pada geriatri/CKD)",
      "Resolusi Gejala Klinis (Menghilangkan lemas, intoleransi dingin, konstipasi, bradikardia, dan edema miksedema)",
      "Pencegahan Komplikasi Koma Miksedema dan Dislipidemia Aterogenik"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Levothyroxine",
        "dosage": "Dewasa muda tanpa PJK: Dosis penuh 1.6 mcg/kgBB/hari PO sekali sehari saat perut kosong. Lansia/PJK: Awali 12.5 - 25 mcg/hari PO, titrasi tiap 6-8 minggu",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Hormon T4 sintetik baku emas; memiliki waktu paruh panjang (7 hari) yang stabil. WAJIB diminum saat perut kosong 30-60 menit sebelum sarapan dengan air putih."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Liothyronine",
        "dosage": "5 - 25 mcg per oral per hari terbagi 2-3 dosis",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Hormon T3 sintetik kerja cepat; hanya digunakan pada kondisi emergensi koma miksedema atau terapi kombinasi refrakter di bawah pengawasan Sp.PD-KEMD."
      }
    ],
    "nonPharmacological": [
      "Konsumsi makanan bergizi seimbang dengan asupan iodium cukup.",
      "Patuhi aturan minum obat di pagi hari saat bangun tidur dengan segelas air putih murni.",
      "Jeda minimal 4 jam dari konsumsi suplemen kalsium, suplemen zat besi, antasida, kopi/teh, atau produk kedelai."
    ],
    "specialPopulations": [
      {
        "condition": "Wanita Hamil dengan Hipotiroidisme",
        "recommendation": "Target TSH trimester I < 2.5 mIU/L; trimester II-III < 3.0 mIU/L. Segera naikkan dosis Levothyroxine 25-30% begitu konfirmasi kehamilan positif untuk mendukung neurogenesis otak janin.",
        "contraindicatedDrugs": [
          "Penundaan terapi atau pengurangan dosis selama kehamilan"
        ]
      },
      {
        "condition": "Lansia / Geriatri dengan Penyakit Jantung Koroner",
        "recommendation": "Prinsip \"Start Low, Go Slow\": Awali dosis 12.5 - 25 mcg/hari untuk mencegah presipitasi angina pektoris atau aritmia fibrilasi atrium.",
        "contraindicatedDrugs": [
          "Inisiasi dosis penuh langsung pada pasien iskemia miokard aktif"
        ]
      }
    ],
    "monitoringParameters": [
      "Kadar TSH Serum dan Free T4 (FT4) setiap 6 - 8 minggu setelah inisiasi atau penyesuaian dosis",
      "Evaluasi TSH berkala setiap 6 - 12 bulan setelah kadar terapeutik stabil tercapai",
      "Frekuensi denyut nadi istirahat dan berat badan"
    ],
    "sourceGuidelines": "Konsensus Pengelolaan Hipotiroidisme Perhimpunan Endokrinologi Indonesia (PERKENI) / American Thyroid Association (ATA) Hypothyroidism Guidelines",
    "updatedYear": "2023",
    "keyClinicalAlert": "Levothyroxine HARUS diminum saat perut kosong di pagi hari dengan air putih murni. Beri jeda minimal 4 jam dari suplemen Kalsium, Besi, dan Antasida agar obat tidak terikat dan gagal diserap."
  },
  {
    "id": "guideline-epilepsy",
    "diseaseName": "Epilepsi & Penatalaksanaan Status Epileptikus",
    "category": "Sistem Saraf & Psikiatri",
    "organization": "PERDOSSI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "G40.9",
    "indonesianKeywords": [
      "epilepsi",
      "ayan",
      "kejang berulang",
      "status epileptikus",
      "diazepam",
      "phenytoin",
      "valproat",
      "carbamazepine",
      "levetiracetam"
    ],
    "summary": "Penyakit neurologis kronis yang ditandai dengan kecenderungan bangkitan epileptik berulang spontan tanpa provokasi akibat pelepasan muatan listrik abnormal neuron korteks serebri. Status Epileptikus (kejang berlangsung > 5 menit tanpa jeda) merupakan kegawatdaruratan neurologis yang mengancam jiwa.",
    "targetGoals": [
      "Hentikan Kejang Akut dalam < 10-20 Menit Pertama pada Status Epileptikus",
      "Bebas Bangkitan Kejang Penuh (Seizure-Free) Tanpa Efek Samping Obat Bermakna",
      "Mencegah Cedera Fisik, Status Epileptikus Sekunder, dan Kematian Mendadak pada Pasien Epilepsi (SUDEP)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Diazepam",
        "dosage": "Status Akut: 10 mg IV bolus lambat (2-5 mg/menit), dapat diulang 1 kali setelah 5-10 menit; atau 10 mg per rektal (dewasa/anak >10 kg) jika jalur IV belum siap",
        "role": "Acute Rescue",
        "fornasTier": "Faskes 1",
        "notes": "Benzodiazepin kerja cepat lini pertama darurat status epileptikus. Siapkan oksigenasi dan bagging jika terjadi depresi napas."
      },
      {
        "drugName": "Phenytoin Sodium",
        "dosage": "Status Akut Lini 2: Loading dose 15 - 20 mg/kgBB IV dilarutkan dalam NaCl 0.9% kecepatan maks 50 mg/menit. Rumatan: 200 - 300 mg/hari PO terbagi 2-3 dosis",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antikonvulsan penghambat kanal natrium; lini pertama bangkitan fokal dan status epileptikus terkonfirmasi. Wajib monitor EKG."
      },
      {
        "drugName": "Valproic Acid",
        "dosage": "Rumatan: Awal 500 mg/hari PO, titrasi hingga 1000 - 2000 mg/hari (15 - 30 mg/kgBB/hari) terbagi 2 dosis",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antikonvulsan spektrum luas baku emas untuk bangkitan umum tonik-klonik, mioklonik, dan lena (absence). KONTRAINDIKASI pada wanita hamil (sangat teratogenik)."
      },
      {
        "drugName": "Carbamazepine",
        "dosage": "Awal 200 mg PO 2 kali sehari, titrasi hingga 800 - 1200 mg/hari terbagi 2-3 dosis",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Pilihan utama bangkitan fokal/parsial dengan atau tanpa generalisasi sekunder. Waspada ruam SJS."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Levetiracetam",
        "dosage": "Awal 500 mg PO/IV 2 kali sehari, titrasi hingga 1000 - 1500 mg 2 kali sehari",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Antiepilepsi pengikat glikoprotein vesikel sinaptik SV2A; profil keamanan hepar dan interaksi obat paling aman."
      },
      {
        "drugName": "Lamotrigine",
        "dosage": "Awal 25 mg PO sekali sehari selama 2 minggu, lalu 50 mg/hari 2 minggu, titrasi lambat target 100 - 200 mg/hari",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Pilihan teraman pada wanita usia subur/kehamilan. WAJIB titrasi sangat lambat untuk mencegah ruam Stevens-Johnson Syndrome."
      }
    ],
    "nonPharmacological": [
      "Amankan pasien saat kejang: Miringkan tubuh ke posisi pemulihan (recovery position), longgarkan pakaian leher, jangan masukkan sendok/benda apapun ke dalam mulut.",
      "Hindari faktor pemicu: Kurang tidur, stres berat, konsumsi alkohol, demam tinggi, dan cahaya berkedip (fotosensitivitas).",
      "Patuhi konsumsi obat antiepilepsi setiap hari tanpa putus obat mendadak."
    ],
    "specialPopulations": [
      {
        "condition": "Wanita Usia Subur & Kehamilan",
        "recommendation": "HINDARI Asam Valproat (risiko defek tabung saraf spina bifida & penurunan IQ anak >10%). Pilih Lamotrigine atau Levetiracetam dengan suplementasi Asam Folat dosis tinggi 4-5 mg/hari.",
        "contraindicatedDrugs": [
          "Valproic Acid / Asam Valproat pada wanita usia subur"
        ]
      }
    ],
    "monitoringParameters": [
      "Buku Harian Bangkitan Kejang (frekuensi, tipe, durasi, dan waktu bangkitan)",
      "Kadar obat dalam darah (TDM Fenitoin/Karbamazepin jika curiga toksisitas atau ketidakpatuhan)",
      "Pemeriksaan fungsi hepar, enzim hati, dan Darah Lengkap berkala"
    ],
    "sourceGuidelines": "Pedoman Diagnosis dan Penatalaksanaan Epilepsi Kelompok Studi Epilepsi PERDOSSI / ILAE Official Guidelines on Epilepsy",
    "updatedYear": "2023",
    "keyClinicalAlert": "Jangan pernah memasukkan benda apapun (sendok/jari) ke dalam mulut pasien yang sedang kejang! JANGAN menghentikan obat antiepilepsi secara mendadak karena dapat memicu Status Epileptikus refrakter mematikan."
  },
  {
    "id": "guideline-rheumatoid-arthritis",
    "diseaseName": "Artritis Reumatoid (Rheumatoid Arthritis / RA)",
    "category": "Reumatologi & Ginjal",
    "organization": "IRA",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "M05.9",
    "indonesianKeywords": [
      "rematik radang sendi",
      "artritis reumatoid",
      "nyeri sendi simetris",
      "kaku pagi hari",
      "methotrexate",
      "leflunomide",
      "sulfasalazine",
      "faktor reumatoid"
    ],
    "summary": "Penyakit autoimun inflamasi sistemik kronis progresif yang menyerang membran sinovial sendi diartrodial perifer secara simetris (terutama sendi MCP, PIP tangan, pergelangan tangan, dan MTP kaki), ditandai kaku sendi pagi hari > 1 jam, pembengkakan sendi, dan destruksi erosi tulang rawan permanen.",
    "targetGoals": [
      "Mencapai Remisi Klinis Penuh (DAS28-ESR < 2.6 atau CDAI <= 2.8)",
      "Menghambat Progresivitas Erosi Radiologis Sendi dan Mencegah Deformitas Permanen",
      "Mempertahankan Kualitas Hidup dan Kemandirian Fungsional Pasien"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Methotrexate",
        "dosage": "Awal 7.5 - 10 mg PO atau SC SEKALI SEMINGGU, titrasi bertahap tiap 4 minggu hingga target 15 - 25 mg SEKALI SEMINGGU + Asam Folat 1-5 mg/hari (di luar hari MTX)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "csDMARD baku emas jangkar lini pertama. KONTRAINDIKASI pada kehamilan, penyakit hepar aktif, dan CrCl < 30 mL/min."
      },
      {
        "drugName": "Methylprednisolone",
        "dosage": "4 - 8 mg PO sekali sehari pada pagi hari sebagai terapi jembatan (bridging therapy) jangka pendek (maksimal 3-6 bulan saat inisiasi DMARD)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Kortikosteroid dosis rendah pereda inflamasi cepat; lakukan tapering off dan hentikan begitu efek MTX tercapai."
      },
      {
        "drugName": "Folic Acid",
        "dosage": "1 - 5 mg PO per hari (diminum setiap hari KECUALI pada hari konsumsi Methotrexate)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Proteksi toksisitas gastrointestinal, stomatitis ulseratif, dan kenaikan enzim hepar akibat antagonisme folat MTX."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Sulfasalazine",
        "dosage": "Awal 500 mg PO 2 kali sehari sesudah makan, titrasi hingga 1000 mg 2 kali sehari",
        "role": "Combination / Add-On",
        "fornasTier": "Faskes 1",
        "notes": "csDMARD alternatif atau kombinasi ganda bersama MTX. Waspada alergi sulfa."
      },
      {
        "drugName": "Rituximab",
        "dosage": "1000 mg IV infus lambat pada Hari ke-1 dan Hari ke-15 (siklus diulang tiap 6 bulan)",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Biologic DMARD anti-CD20; diindikasikan pada RA seropositif berat yang gagal dengan kombinasi csDMARD konvensional."
      }
    ],
    "nonPharmacological": [
      "Fisioterapi dan latihan rentang gerak sendi (ROM) non-beban untuk mencegah kekakuan kontraktur.",
      "Edukasi perlindungan sendi (joint protection techniques) dan penggunaan bidai/splint saat fase akut.",
      "Diet anti-inflamasi tinggi asam lemak omega-3 dan berhenti merokok (merokok memperparah destruksi RA)."
    ],
    "specialPopulations": [
      {
        "condition": "Wanita Merencanakan Kehamilan & Hamil",
        "recommendation": "HENTIKAN Methotrexate dan Leflunomide minimal 3-6 bulan sebelum konsepsi (sangat teratogenik). Beralih ke Sulfasalazine + Asam Folat atau Hydroxychloroquine.",
        "contraindicatedDrugs": [
          "Methotrexate",
          "Leflunomide"
        ]
      }
    ],
    "monitoringParameters": [
      "Skor Aktivitas Penyakit (DAS28 atau CDAI) setiap 1 - 3 bulan hingga remisi tercapai",
      "Pemeriksaan Darah Lengkap (skrining leukopenia/pansitopenia MTX) dan Enzim Hati (SGOT/SGPT) berkala tiap 4-8 minggu",
      "Foto Rontgen Sendi Tangan dan Kaki setiap 1-2 tahun untuk evaluasi progresi erosi tulang"
    ],
    "sourceGuidelines": "Rekomendasi Pengelolaan Artritis Reumatoid Ikatan Reumatologi Indonesia (IRA) / EULAR Recommendations for RA Management",
    "updatedYear": "2023",
    "keyClinicalAlert": "Methotrexate HANYA DIMINUM SEKALI SEMINGGU (bukan setiap hari!). Minum setiap hari memicu overdosis mielosupresi fatal. Selalu dampingi dengan Asam Folat pada hari yang berbeda."
  },
  {
    "id": "guideline-osteoporosis",
    "diseaseName": "Osteoporosis Pascamenopause & Senilis Dewasa",
    "category": "Reumatologi & Ginjal",
    "organization": "PERKENI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "M81.0",
    "indonesianKeywords": [
      "pengeroposan tulang",
      "tulang rapuh",
      "osteoporosis",
      "alendronate",
      "zoledronic acid",
      "kalsium karbonat",
      "vitamin d3",
      "dexa scan"
    ],
    "summary": "Penyakit tulang metabolik sistemik yang ditandai dengan penurunan densitas massa tulang (T-score densitometri DEXA <= -2.5 SD) dan kemunduran mikroarsitektur jaringan tulang, yang mengakibatkan peningkatan kerapuhan tulang dan kerentanan fraktur patologis (terutama tulang belakang vertebra, panggul/femur, dan pergelangan tangan).",
    "targetGoals": [
      "Mencegah Terjadinya Fraktur Fragilitas Tulang Pertama Maupun Berulang",
      "Meningkatkan Densitas Mineral Tulang (Bone Mineral Density / BMD) Terukur pada Evaluasi DEXA",
      "Menghilangkan Nyeri Tulang Kronis dan Mempertahankan Postur serta Mobilitas Aktif"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Alendronate",
        "dosage": "70 mg per oral SEKALI SEMINGGU di pagi hari saat bangun tidur saat perut kosong dengan segelas penuh air putih murni",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Bifosfonat oral baku emas; menghambat resorpsi osteoklas. WAJIB tetap dalam posisi tegak (duduk/berdiri) minimal 30 menit setelah minum obat."
      },
      {
        "drugName": "Calcium Carbonate",
        "dosage": "1000 - 1200 mg kalsium elemental per hari terbagi 1-2 dosis bersama makanan",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Suplementasi substrat mineralisasi matriks tulang; diminum bersama makanan. Jeda minimal 1 jam dari Alendronate."
      },
      {
        "drugName": "Cholecalciferol",
        "dosage": "1000 - 2000 IU per oral sekali sehari sesudah makan berlemak",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Vitamin D3 esensial untuk penyerapan kalsium usus dan fungsi neuromuskular kekuatan otot pencegah jatuh."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Zoledronic Acid",
        "dosage": "5 mg IV infus dalam 100 mL NaCl 0.9% selama minimal 15-30 menit SEKALI SETAHUN",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Bifosfonat IV poten tahunan; kepatuhan 100%, pilihan utama pada intoleransi saluran cerna atas atau malabsorpsi bifosfonat oral."
      }
    ],
    "nonPharmacological": [
      "Latihan fisik teratur menahan beban (weight-bearing exercise) seperti jalan cepat, senam osteoporosis, dan latihan keseimbangan (Tai Chi) untuk mencegah jatuh.",
      "Pencegahan Risiko Jatuh di Rumah: Pasang pegangan di kamar mandi, pastikan pencahayaan terang, hindari karpet licin.",
      "Hindari merokok dan batasi konsumsi alkohol serta kafein berlebih."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien dengan Penyakit Ginjal Kronis Berat (CrCl < 35 mL/min)",
        "recommendation": "HINDARI Bifosfonat (Alendronate/Zoledronic Acid) karena risiko nefrotoksisitas akumulasi. Konsultasikan terapi alternatif non-renal (Denosumab) ke konsultan endokrin/reumatologi.",
        "contraindicatedDrugs": [
          "Alendronate Sodium",
          "Zoledronic Acid"
        ]
      }
    ],
    "monitoringParameters": [
      "Pemeriksaan Bone Mineral Densitometry (DEXA Scan) vertebra lumbal dan leher panggul setiap 1 - 2 tahun",
      "Evaluasi kepatuhan cara minum obat bifosfonat dan skrining efek samping dispepsia/esofagitis",
      "Kadar Kalsium serum dan Kreatinin ginjal sebelum pemberian Zoledronic Acid tahunan"
    ],
    "sourceGuidelines": "Panduan Diagnosis dan Tata Laksana Osteoporosis Perhimpunan Osteoporosis Indonesia (PEROSI) / AACE Clinical Practice Guidelines for Postmenopausal Osteoporosis",
    "updatedYear": "2023",
    "keyClinicalAlert": "Tablet Alendronate HARUS DITELAN UTUH di pagi hari dengan segelas air putih murni saat perut kosong. Pasien DILARANG BERBARING minimal 30 menit setelahnya untuk mencegah erosi dan perforasi esofagus berat!"
  },
  {
    "id": "guideline-ulcerative-colitis",
    "diseaseName": "Kolitis Ulseratif & Penyakit Radang Usus (IBD)",
    "category": "Gastrointestinal",
    "organization": "PGI-PEGI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "K51.9",
    "indonesianKeywords": [
      "radang usus",
      "kolitis ulseratif",
      "ibd",
      "diare berdarah menahun",
      "mesalazine",
      "azathioprine",
      "kolonoskopi",
      "feses berdarah"
    ],
    "summary": "Penyakit radang usus kronis idiopatik (Inflammatory Bowel Disease / IBD) yang ditandai peradangan mukosa kolon yang berjalan difus kontinu mulai dari rektum meluas ke arah proksimal kolon, bermanifestasi sebagai diare bercampur darah dan lendir berulang, tenesmus, kram nyeri abdomen, dan anemia.",
    "targetGoals": [
      "Induksi dan Pemeliharaan Remisi Klinis Bebas Kortikosteroid (Corticosteroid-Free Remission)",
      "Penyembuhan Mukosa Endoskopi Kolon (Mucosal Healing Mayo Endoscopic Score <= 1)",
      "Mencegah Eksaserbasi Akut, Megakolon Toksik, dan Risiko Karsinoma Kolorektal Jangka Panjang"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Mesalazine",
        "dosage": "Induksi Ringan-Sedang: 2.4 - 4.8 gram/hari PO terbagi 2-3 dosis sesudah makan + Supositoria 1 g/hari pada proktitis. Pemeliharaan: 1.5 - 2.4 g/hari PO",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Senyawa 5-ASA anti-inflamasi topikal kolonik baku emas untuk induksi dan pemeliharaan remisi jangka panjang."
      },
      {
        "drugName": "Methylprednisolone",
        "dosage": "Induksi Eksaserbasi Sedang-Berat: 16 - 32 mg PO per hari pada pagi hari selama 2-4 minggu, dilanjutkan tapering-off bertahap dalam 8-12 minggu",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Kortikosteroid sistemik pereda inflamasi cepat pada fase eksaserbasi aktif; TIDAK BOLEH digunakan untuk terapi pemeliharaan kronis."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Azathioprine",
        "dosage": "1.5 - 2.5 mg/kgBB/hari PO sekali sehari sesudah makan",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Imunosupresan tiopurin; diindikasikan pada kasus ketergantungan steroid (steroid-dependent) atau sering relaps."
      }
    ],
    "nonPharmacological": [
      "Nutrisi adekuat tinggi protein rendah residu selama fase eksaserbasi aktif.",
      "Hindari makanan pemicu iritasi: Makanan sangat pedas, susu/laktosa (bila intoleran), pemanis buatan, dan alkohol.",
      "Suplementasi Besi dan Asam Folat jika terjadi anemia defisiensi akibat perdarahan kolon kronis."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien dengan Eksaserbasi Berat / Megakolon Toksik",
        "recommendation": "Rawat inap intensif segera: Puasakan, hidrasi cairan IV elektrolit, Hidrokortison 100 mg IV tiap 6 jam, dan siapkan konsultasi bedah digestif darurat bila ada tanda perforasi.",
        "contraindicatedDrugs": [
          "Opioid antimotilitas (Loperamide) - Memicu Megakolon Toksik Fatal",
          "NSAID"
        ]
      }
    ],
    "monitoringParameters": [
      "Evaluasi Frekuensi BAB dan adanya darah tinja (Mayo Clinical Score / Partial Mayo Score)",
      "Kadar Hemoglobin, Laju Endap Darah (LED), CRP kuantitatif, dan Kalprotektin Fekal (Fecal Calprotectin)",
      "Surveilans Kolonoskopi berkala setelah 8-10 tahun durasi penyakit untuk skrining displasia/kanker kolon"
    ],
    "sourceGuidelines": "Konsensus Nasional Penatalaksanaan Inflammatory Bowel Disease (IBD) Perkumpulan Gastroenterologi Indonesia (PGI-PEGI) / ECCO Guidelines on Ulcerative Colitis",
    "updatedYear": "2023",
    "keyClinicalAlert": "DILARANG MEMBERIKAN OBAT ANTIMOTILITAS (seperti Loperamide) pada pasien dengan diare berdarah kolitis ulseratif akut aktif karena dapat memicu komplikasi MEGAKOLON TOKSIK dan perforasi usus mematikan!"
  },
  {
    "id": "guideline-parkinson",
    "diseaseName": "Penyakit Parkinson (Parkinson's Disease)",
    "category": "Sistem Saraf & Psikiatri",
    "organization": "PERDOSSI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "G20",
    "indonesianKeywords": [
      "parkinson",
      "gemetar istirahat",
      "gerakan lambat",
      "kaku otot",
      "jalan menyeret",
      "levodopa",
      "benserazide",
      "pramipexole",
      "trihexyphenidyl"
    ],
    "summary": "Penyakit neurodegeneratif progresif yang ditandai dengan hilangnya neuron dopaminergik di substansia nigra pars kompakta ganglia basalis, bermanifestasi sebagai tetrad motorik kardinal TRAP: Tremor saat istirahat (resting tremor), Rigiditas otot tipe roda gigi (cogwheel rigidity), Akinesia/Bradikinesia, dan Instabilitas Postural.",
    "targetGoals": [
      "Mengoptimalkan Kontrol Fungsi Motorik dan Mobilitas Mandiri Pasien",
      "Meminimalkan Komplikasi Fluktuasi Motorik (Wearing-off / On-Off Phenomenon) dan Diskinesia",
      "Menangani Gejala Non-Motorik (Depresi, Gangguan Tidur, Konstipasi, dan Hipotensi Ortostatik)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Levodopa / Benserazide",
        "dosage": "Awal 62.5 - 125 mg PO 2-3 kali sehari saat perut kosong (minimal 30-60 menit sebelum makan), titrasi bertahap tiap minggu sesuai respon klinis",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Prekursor dopamin + inhibitor dopa-dekarboksilase perifer; baku emas efikasi motorik terbaik. Hindari konsumsi bersamaan dengan makanan tinggi protein."
      },
      {
        "drugName": "Pramipexole",
        "dosage": "Awal 0.125 mg PO 3 kali sehari sesudah makan, titrasi bertahap tiap minggu hingga target 0.5 - 1.5 mg 3 kali sehari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Agonis Dopamin non-ergot; pilihan awal utama pada pasien usia lebih muda (<60-65 tahun) untuk menunda komplikasi motorik levodopa."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Trihexyphenidyl",
        "dosage": "Awal 1 mg PO 2-3 kali sehari sesudah makan, titrasi bertahap hingga 2 mg 3 kali sehari",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Antikolinergik sentral; efektif meredakan resting tremor pada pasien usia muda. HINDARI pada lansia (memicu halusinasi, konfusi, dan retensi urin)."
      }
    ],
    "nonPharmacological": [
      "Fisioterapi motorik teratur, latihan berjalan dengan aba-aba ritmik (cued gait training), dan senam peregangan.",
      "Terapi wicara (Lee Silverman Voice Treatment / LSVT) untuk mengatasi suara serak/monoton dan disfagia.",
      "Penyesuaian waktu diet protein tinggi: Konsumsi protein hewani pada makan malam agar penyerapan levodopa siang hari tidak terganggu."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Usia Lanjut (> 70 tahun) atau dengan Gangguan Kognitif",
        "recommendation": "Prioritaskan monoterapi Levodopa dosis rendah yang disesuaikan; HINDARI Antikolinergik (Trihexyphenidyl) dan hati-hati Agonis Dopamin karena risiko psikosis/halusinasi visual.",
        "contraindicatedDrugs": [
          "Trihexyphenidyl pada lansia demensia",
          "Antipsikotik tipikal penyekat D2 (Haloperidol)"
        ]
      }
    ],
    "monitoringParameters": [
      "Skor Evaluasi Motorik Unified Parkinson's Disease Rating Scale (UPDRS)",
      "Deteksi dini fluktuasi motorik (wearing-off, fenomena on-off, atau diskinesia involunter)",
      "Pemeriksaan tekanan darah posisi tidur dan berdiri (skrining hipotensi ortostatik)"
    ],
    "sourceGuidelines": "Panduan Praktis Klinis Gangguan Gerak Perhimpunan Dokter Spesialis Neurologi Indonesia (PERDOSSI) / Movement Disorder Society (MDS) Evidence-Based Guidelines for Parkinson's Disease",
    "updatedYear": "2023",
    "keyClinicalAlert": "Tablet Levodopa HARUS diminum saat perut kosong minimal 30-60 menit sebelum makan. JANGAN DIMINUM BERSAMAAN DENGAN LAUK TINGGI PROTEIN (daging/telur/susu) karena asam amino bersaing di saluran cerna dan sawar darah otak, membuat obat kehilangan khasiatnya."
  },
  {
    "id": "guideline-pediatric-pneumonia",
    "diseaseName": "Pneumonia Komunitas pada Balita & Anak (Pneumonia Pediatrik)",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "J18.9",
    "indonesianKeywords": [
      "pneumonia anak",
      "paru-paru basah anak",
      "napas cepat balita",
      "tarikan dinding dada",
      "amoxicillin dosis tinggi",
      "ampicillin",
      "gentamicin",
      "sesak anak"
    ],
    "summary": "Infeksi akut parenkim paru pada anak yang ditandai dengan batuk dan/atau kesulitan bernapas disertai Napas Cepat (Takipnea sesuai usia: <2 bln >=60x/m, 2-11 bln >=50x/m, 1-5 thn >=40x/m) dan/atau Tarikan Dinding Dada Bagian Bawah ke Dalam (Chest Indrawing). Merupakan salah satu penyebab mortalitas balita tertinggi di Indonesia.",
    "targetGoals": [
      "Eradikasi Patogen Penyebab (Streptococcus pneumoniae, Haemophilus influenzae) dan Resolusi Takipnea",
      "Pertahankan Oksigenasi Darah Adekuat (Target Saturasi SpO2 >= 94% pada udara ruangan)",
      "Mencegah Komplikasi Gagal Napas, Efusi Pleura Empiema, dan Sepsis Berat"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Amoxicillin",
        "dosage": "Rawat Jalan (Pneumonia Ringan-Sedang): Dosis tinggi 80 - 90 mg/kgBB/hari PO terbagi dalam 2 dosis (tiap 12 jam) sesudah makan selama 3 - 5 hari penuh",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Lini pertama baku emas rawat jalan rekomendasi IDAI & WHO; dosis tinggi mengatasi strain pneumokokus dengan resistensi penisilin intermediate."
      },
      {
        "drugName": "Ampicillin",
        "dosage": "Rawat Inap (Pneumonia Berat): 50 mg/kgBB/kali IV tiap 6 jam (200 mg/kgBB/hari) dikombinasikan dengan Gentamicin 7.5 mg/kgBB IV sekali sehari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Regimen parenteral lini pertama di rumah sakit untuk balita dengan pneumonia berat / distres napas."
      },
      {
        "drugName": "Paracetamol",
        "dosage": "10 - 15 mg/kgBB/kali PO tiap 4-6 jam prn bila suhu >= 38.5°C atau anak rewel gelisah",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antipiretik dan analgesik kenyamanan anak; hindari dehidrasi akibat demam."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Ceftriaxone",
        "dosage": "50 - 100 mg/kgBB/hari IV/IM sekali sehari (maksimal 2 gram/hari)",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Sefalosporin generasi ke-3; diindikasikan bila tidak ada perbaikan klinis dalam 48 jam dengan lini pertama atau curiga komplikasi empiema."
      }
    ],
    "nonPharmacological": [
      "Terapi Oksigen kanul nasal atau sungkup bila SpO2 < 94% atau sianosis/distres napas berat.",
      "Pemberian cairan hidrasi dan nutrisi adekuat (ASI diteruskan pada bayi).",
      "Pembersihan jalan napas dari lendir hidung dengan saline nasal drop sebelum menyusui/makan."
    ],
    "specialPopulations": [
      {
        "condition": "Bayi Muda Usia < 2 Bulan dengan Napas Cepat / Distres Napas",
        "recommendation": "Semua pneumonia pada usia < 2 bulan diklasifikasikan sebagai PNEUMONIA BERAT / PENYAKIT SANGAT BERAT; WAJIB RAWAT INAP di RS dengan Ampicillin + Gentamicin IV.",
        "contraindicatedDrugs": [
          "Terapi rawat jalan tanpa observasi ketat pada neonatus < 2 bulan"
        ]
      }
    ],
    "monitoringParameters": [
      "Hitung Laju Pernapasan dalam 1 Menit Penuh saat anak tenang",
      "Saturasi Oksigen (SpO2) kontinu dengan Pulse Oximeter",
      "Evaluasi respon klinis dalam 48 - 72 jam pertama (penurunan demam, nafsu makan membaik, tarikan dinding dada berkurang)"
    ],
    "sourceGuidelines": "Pedoman Pelayanan Medis Ikatan Dokter Anak Indonesia (IDAI) / PNPK Pneumonia Anak Kemenkes RI / WHO Revised Pocket Book of Hospital Care for Children",
    "updatedYear": "2024",
    "keyClinicalAlert": "Hitung napas balita dalam 1 MENIT PENUH saat anak tenang! Tanda bahaya umum: Tidak bisa minum/menyusui, memuntahkan semua, kejang, letargis/tidak sadar, atau stridor saat tenang — WAJIB SEGERA RUJUK KE RUMAH SAKIT."
  },
  {
    "id": "guideline-tb-mdr",
    "diseaseName": "Tuberkulosis Resistan Obat (TB-RO / MDR-TB & TB-RR)",
    "category": "Anti-Infeksi",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Faskes 2/3 (RS Rujukan)",
    "icd10": "U88.0",
    "indonesianKeywords": [
      "tb kebal obat",
      "tb mdr",
      "tb resistan",
      "bedaquiline",
      "linezolid",
      "pretomanid",
      "moxifloxacin",
      "bpalm",
      "tcm genexpert"
    ],
    "summary": "Infeksi Mycobacterium tuberculosis yang telah resistan terhadap minimal Rifampisin (TB-RR) atau resistan ganda simultan terhadap Rifampisin dan Isoniazid (MDR-TB), dikonfirmasi melalui pemeriksaan Tes Cepat Molekuler (TCM GeneXpert MTB/RIF) dan uji kepekaan obat fenotipik/genotipik (LPA).",
    "targetGoals": [
      "Konversi Biakan Dahak (Sputum Culture Conversion) Menjadi Negatif dalam 2-3 Bulan Pertama",
      "Kesembuhan Klinis dan Bakteriologis Penuh Tanpa Relaps dengan Paduan Jangka Pendek (BPaLM 6 Bulan)",
      "Mencegah Transmisi Penularan Strain Resistan di Keluarga dan Komunitas"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Bedaquiline",
        "dosage": "400 mg PO sekali sehari selama 2 minggu pertama, dilanjutkan 200 mg 3 kali seminggu selama 22 minggu berikutnya (diminum bersama makanan)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Inhibitor ATP sintase mikobakteri; jangkar utama paduan TB-RO modern. Wajib monitor EKG berkala (interval QTc)."
      },
      {
        "drugName": "Pretomanid",
        "dosage": "200 mg PO sekali sehari selama 24 minggu (6 bulan penuh) bersama makanan",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Senyawa nitroimidazooxazine bakterisidal; komponen kunci paduan standar BPaLM Kemenkes RI 2024."
      },
      {
        "drugName": "Linezolid",
        "dosage": "600 mg PO sekali sehari selama 24 minggu (dapat diturunkan ke 300 mg/hari jika timbul neuropati perifer / anemia)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Antibiotik oksazolidinon poten. Pantau Darah Lengkap (risiko trombositopenia/anemia) dan sensasi saraf perifer."
      },
      {
        "drugName": "Moxifloxacin",
        "dosage": "400 mg PO sekali sehari selama 24 minggu",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Fluorokuinolon respirasi generasi lanjut; diberikan pada paduan BPaLM jika kuman terbukti sensitif terhadap kuinolon."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Levofloxacin",
        "dosage": "750 - 1000 mg PO sekali sehari pagi hari",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Alternatif fluorokuinolon pada paduan jangka panjang individu (individualized long regimen)."
      }
    ],
    "nonPharmacological": [
      "Penerapan Pengawasan Menelan Obat Langsung (PMO / DOTS-RO) secara ketat setiap hari.",
      "Pengendalian Pencegahan Infeksi (PPI) TB: Penggunaan masker respirator N95, ventilasi ruangan alami yang baik dan paparan sinar matahari.",
      "Dukungan nutrisi tinggi kalori tinggi protein dan pendampingan psikososial melalui organisasi penyintas TB (Pejuang TB)."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien TB-RO dengan Ko-infeksi HIV",
        "recommendation": "Mulai terapi ARV (Dolutegravir-based) sesegera mungkin dalam 2-8 minggu setelah terapi TB-RO dimulai dan dapat ditoleransi.",
        "contraindicatedDrugs": [
          "Efavirenz bersama Bedaquiline (menurunkan kadar bedaquiline hingga 50%)"
        ]
      }
    ],
    "monitoringParameters": [
      "Pemeriksaan Mikroskopis dan Biakan Dahak Sputum setiap bulan hingga pengobatan selesai",
      "Pemeriksaan Rekam Jantung EKG (Interval QTc) pada awal (basal), minggu ke-2, 4, 8, 12, dan 24",
      "Pemeriksaan Darah Lengkap (Hb, Leukosit, Trombosit) dan Fungsi Hati (SGOT/SGPT/Bilirubin) berkala"
    ],
    "sourceGuidelines": "Petunjuk Teknis Penatalaksanaan Tuberkulosis Resistan Obat di Indonesia Kemenkes RI 2024 / WHO Consolidated Guidelines on Tuberculosis (Module 4: Drug-Resistant TB)",
    "updatedYear": "2024",
    "keyClinicalAlert": "Regimen BPaLM (Bedaquiline, Pretomanid, Linezolid, Moxifloxacin) kini menjadi standar baru pengobatan TB-RO dengan durasi jauh lebih singkat (6 BULAN). Pantau EKG interval QTc secara rutin pada setiap kunjungan."
  },
  {
    "id": "guideline-gad-panic",
    "diseaseName": "Gangguan Cemas Menyeluruh (GAD) & Gangguan Panik",
    "category": "Sistem Saraf & Psikiatri",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "F41.1",
    "indonesianKeywords": [
      "cemas berlebihan",
      "gad",
      "serangan panik",
      "panic attack",
      "sertraline",
      "escitalopram",
      "clonazepam",
      "jantung berdebar cemas",
      "sesak panik"
    ],
    "summary": "Kondisi kecemasan dan kekhawatiran yang berlebihan, persisten, dan sulit dikendalikan mengenai berbagai situasi kehidupan sehari-hari minimal 6 bulan berturut-turut (GAD) atau serangan ketakutan intens tiba-tiba disertai gejala fisik mendadak seperti palpitasi, sesak napas, rasa tercekik, dan ketakutan akan kematian/kehilangan kendali (Gangguan Panik).",
    "targetGoals": [
      "Meredakan Gejala Kecemasan Psikis dan Manifestasi Somatik Otonom",
      "Menghentikan Terjadinya Serangan Panik Spontan (Panic Attack-Free)",
      "Mengembalikan Fungsi Sosial, Pekerjaan, dan Kualitas Hidup Normal"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Sertraline",
        "dosage": "Awal 25 - 50 mg PO sekali sehari pada pagi hari, titrasi bertahap tiap 1-2 minggu hingga target 50 - 150 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "SSRI baku emas lini pertama untuk terapi pemeliharaan jangka panjang GAD dan Gangguan Panik; aman pada kardiovaskular."
      },
      {
        "drugName": "Escitalopram",
        "dosage": "Awal 5 - 10 mg PO sekali sehari pada pagi hari, titrasi hingga 10 - 20 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "SSRI dengan selektivitas transporter serotonin tertinggi dan interaksi obat minimal."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Clonazepam",
        "dosage": "0.25 - 0.5 mg PO 1-2 kali sehari pada fase akut serangan cemas berat",
        "role": "Acute Rescue",
        "fornasTier": "Faskes 1",
        "notes": "Benzodiazepin potensi tinggi; HANYA digunakan sebagai terapi jembatan pereda cemas cepat pada 2-4 MINGGU PERTAMA saat menunggu efek SSRI bekerja, lalu lakukan tapering-off."
      }
    ],
    "nonPharmacological": [
      "Cognitive Behavioral Therapy (CBT / Terapi Perilaku Kognitif) untuk restrukturisasi pola pikir cemas bencana (catastrophizing).",
      "Teknik Relaksasi Pernapasan Diafragma (Box Breathing 4-4-4-4) saat serangan panik muncul.",
      "Hindari konsumsi kafein (kopi, minuman berenergi), alkohol, dan nikotin yang memicu takikardia dan serangan panik."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien dengan Riwayat Ketergantungan Zat atau Risiko Adiksi",
        "recommendation": "HINDARI pemberian golongan Benzodiazepin (Clonazepam/Alprazolam). Gunakan monoterapi SSRI murni (Sertraline/Escitalopram) atau Buspirone.",
        "contraindicatedDrugs": [
          "Peresepan Benzodiazepin jangka panjang > 4 minggu"
        ]
      }
    ],
    "monitoringParameters": [
      "Skala Keparahan Kecemasan Klinis (HAM-A atau GAD-7 Score) setiap kunjungan",
      "Evaluasi respons terapi SSRI (efek anxiolitik optimal biasanya terlihat setelah 4 - 6 minggu pemakaian rutin)",
      "Tapering-off Benzodiazepin secara bertahap untuk mencegah rebound anxiety"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran Jiwa Kemenkes RI / APA Practice Guideline for Anxiety Disorders / NICE Clinical Guidelines for GAD and Panic",
    "updatedYear": "2024",
    "keyClinicalAlert": "Benzodiazepin (Clonazepam/Alprazolam) HANYA DIGUNAKAN DALAM JANGKA PENDEK (maksimal 2-4 minggu) saat awal pengobatan. Penggunaan kronis memicu ketergantungan fisik dan sindrom putus obat berat."
  },
  {
    "id": "guideline-hypertensive-crisis",
    "diseaseName": "Krisis Hipertensi (Hipertensi Emergensi & Hipertensi Urgensi)",
    "category": "Kardiovaskular",
    "organization": "PERKI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "I16.0",
    "indonesianKeywords": [
      "tensi sangat tinggi",
      "krisis hipertensi",
      "hipertensi emergensi",
      "hipertensi urgensi",
      "nicardipine iv",
      "diltiazem iv",
      "nitrogliserin",
      "captopril sublingual"
    ],
    "summary": "Peningkatan tekanan darah arterial akut yang sangat tinggi (Sistolik >= 180 mmHg dan/atau Diastolik >= 120 mmHg). Hipertensi Emergensi: Disertai kerusakan organ target akut (Target Organ Damage / TOD: Ensefalopati, Stroke Akut, Sindrom Koroner Akut, Edema Paru Akut Kardiogenik, Diseksi Aorta, AKI); wajib dirawat di ICU dengan titrasi antihipertensi IV. Hipertensi Urgensi: Tanpa kerusakan organ target akut; ditangani dengan obat oral bertahap dalam 24-48 jam.",
    "targetGoals": [
      "Hipertensi Emergensi: Turunkan Mean Arterial Pressure (MAP) maksimal 20 - 25% dalam 1 Jam Pertama, lalu target 160/100-110 mmHg dalam 2 - 6 jam berikutnya",
      "Pengecualian Diseksi Aorta Akut: Turunkan Tekanan Darah Sistolik < 120 mmHg dan Heart Rate < 60 bpm dalam waktu < 20 Menit",
      "Hipertensi Urgensi: Turunkan Tekanan Darah secara Bertahap dalam 24 - 48 Jam dengan Obat Oral di Faskes Rawat Jalan/IGD"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Nicardipine",
        "dosage": "Hipertensi Emergensi: Infus kontinu 5 mg/jam IV, titrasi naik 2.5 mg/jam tiap 5-15 menit (maks 15 mg/jam) hingga target tercapai, lalu turunkan ke rumatan 3 mg/jam",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "CCB dihidropiridin IV poten kerja cepat dengan titrasi mudah; pilihan utama pada ensefalopati hipertensi dan stroke perdarahan."
      },
      {
        "drugName": "Nitroglycerin",
        "dosage": "5 - 100 mcg/menit IV drip infus kontinu (titrasi naik 5 mcg/menit tiap 5 menit)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Venodilator selektif; pilihan utama bila krisis hipertensi disertai Sindrom Koroner Akut (SKA) atau Edema Paru Akut."
      },
      {
        "drugName": "Captopril",
        "dosage": "Hipertensi Urgensi Oral: 12.5 - 25 mg PO ditelan/dikunyah (onset 15-30 menit, dapat diulang 1 kali setelah 1-2 jam)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "ACE Inhibitor kerja cepat untuk hipertensi urgensi tanpa kerusakan organ target akut."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Diltiazem",
        "dosage": "Bolus IV 10 mg (1-3 menit), dilanjutkan infus kontinu 5 - 15 mcg/kgBB/menit",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "CCB non-dihidropiridin; alternatif bila diperlukan kontrol denyut jantung bersamaan."
      },
      {
        "drugName": "Clonidine",
        "dosage": "Hipertensi Urgensi Oral: 0.15 mg PO awal, dapat diulang 0.15 mg tiap 1 jam (maksimal 0.6 mg/hari)",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Agonis alfa-2 sentral; menurunkan aktivitas simpatis secara cepat."
      }
    ],
    "nonPharmacological": [
      "Istirahatkan pasien di ruang tenang dan redup selama 30 menit (tekanan darah sering turun spontan 10-20 mmHg pada hipertensi urgensi).",
      "Pemasangan kateter urin menetap untuk pemantauan produksi urin per jam pada hipertensi emergensi.",
      "Pasang jalur akses intravena paten dan monitor EKG 12 lead serta saturasi oksigen kontinu."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Stroke Iskemik Akut Calon Trombolisis rt-PA",
        "recommendation": "Turunkan Tekanan Darah dengan hati-hati hingga Sistolik < 185 mmHg dan Diastolik < 110 mmHg sebelum trombolisis dimulai, dan pertahankan < 180/105 mmHg selama 24 jam pertama.",
        "contraindicatedDrugs": [
          "Penurunan tensi terlalu agresif (>25%) yang memicu hipoperfusi area penumbra iskemik otak"
        ]
      }
    ],
    "monitoringParameters": [
      "Tekanan Darah Otomatis setiap 5 - 15 menit selama titrasi obat IV infus",
      "Status Neurologis (Skor GCS / skrining defisit neurologis fokal baru)",
      "Elektrokardiogram EKG kontinu, Foto Toraks, dan Urin Output per jam"
    ],
    "sourceGuidelines": "Panduan Tata Laksana Hipertensi Perhimpunan Dokter Spesialis Kardiovaskular Indonesia (PERKI) / ESC Guidelines for the Management of Arterial Hypertension",
    "updatedYear": "2024",
    "keyClinicalAlert": "JANGAN MENURUNKAN TEKANAN DARAH TERLALU CEPAT ATAU TERLALU DRASTIS! Penurunan MAP > 25% pada jam pertama dapat memicu iskemia serebral fatal (stroke iskemik sekunder), infark miokard, atau gagal ginjal akut."
  },
  {
    "id": "guideline-pediatric-nephrotic-syndrome",
    "diseaseName": "Sindrom Nefrotik Primer pada Anak (SN Kelainan Minimal)",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "N04.0",
    "indonesianKeywords": [
      "sindrom nefrotik anak",
      "bengkak kelopak mata anak",
      "kencing berbusa",
      "albumin rendah anak",
      "prednisone dosis penuh",
      "proteinuria masif"
    ],
    "summary": "Penyakit glomerulus tersering pada anak usia 1-6 tahun yang ditandai oleh 4 serangkai: Proteinuria masif (dipstick >= +3 atau rasio protein/kreatinin urin > 2 mg/mg), Hipoalbuminemia berat (< 2.5 g/dL), Edema anasarka (terutama bengkak kelopak mata pagi hari, asites, dan tungkai), serta Hiperkolesterolemia (> 200 mg/dL). Mayoritas sensitif terhadap kortikosteroid.",
    "targetGoals": [
      "Induksi Remisi Penuh (Proteinuria Urin Menjadi Negatif atau Trace 3 Hari Berturut-turut)",
      "Mengurangi Edema dan Asites serta Mencegah Syok Hipovolemik Intravaskular",
      "Mencegah dan Menangani Komplikasi Infeksi Bakterial (Peritonitis Spontan) dan Tromboemboli"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Prednisone",
        "dosage": "Fase Induksi Awal: Dosis penuh 60 mg/m²/hari atau 2 mg/kgBB/hari (maksimal 80 mg/hari) PO dibagi 3 dosis sesudah makan selama 4 MINGGU PENUH. Dilanjutkan Dosis Alternate-Day (selang sehari): 40 mg/m²/hari (maks 60 mg/hari) dosis tunggal pagi hari sesudah sarapan selama 4 MINGGU BERIKUTNYA",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Kortikosteroid baku emas inisiasi serangan pertama konsensus IDAI 2023 (total durasi 8 minggu sebelum tapering off)."
      },
      {
        "drugName": "Calcium Carbonate",
        "dosage": "500 mg PO 1-2 kali sehari sesudah makan bersama suplemen Vitamin D3",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Proteksi densitas tulang terhadap efek samping demineralisasi kortikosteroid dosis tinggi."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Furosemide",
        "dosage": "1 - 2 mg/kgBB/hari PO atau IV pelan (hanya diberikan jika edema berat/edema skrotum/asites tegang dan hemodinamik stabil)",
        "role": "Combination / Add-On",
        "fornasTier": "Faskes 1",
        "notes": "Diuretik loop; gunakan dengan sangat hati-hati untuk menghindari hipovolemia berat."
      },
      {
        "drugName": "Human Albumin 20%",
        "dosage": "0.5 - 1 gram/kgBB IV infus pelan (selama 4 jam) diberikan bersamaan Furosemide 1 mg/kgBB IV di tengah infus albumin",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "HANYA diindikasikan pada hipoalbuminemia berat (< 1.5 g/dL) yang disertai syok hipovolemik, edema paru, atau asites masif sesak napas."
      }
    ],
    "nonPharmacological": [
      "Diet rendah garam (1-2 g/hari) selama fase edema aktif; tidak perlu diet rendah protein (berikan protein normal sesuai AKG usia).",
      "Pantau asupan cairan harian (batasi bila edema anasarka berat).",
      "Timbang berat badan anak setiap pagi setelah buang air kecil pertama."
    ],
    "specialPopulations": [
      {
        "condition": "Anak dengan Sindrom Nefrotik Resisten Steroid (SNRS)",
        "recommendation": "Bila setelah 4 minggu dosis penuh prednisone proteinuria tetap >= +2 (tidak remisi), rujuk ke Konsultan Nefrologi Anak untuk Biopsi Ginjal dan inisiasi imunosupresan lini kedua (Siklosporin / Tacrolimus / CPA).",
        "contraindicatedDrugs": [
          "Melanjutkan prednisone dosis tinggi terus-menerus tanpa evaluasi nefrologi anak"
        ]
      }
    ],
    "monitoringParameters": [
      "Uji Celup Protein Urin (Dipstick) setiap pagi di rumah oleh orang tua (catat di buku harian)",
      "Penimbangan Berat Badan harian dan Pengukuran Lingkar Perut (bila ada asites)",
      "Tekanan Darah, Laju Pertumbuhan Tinggi Badan, dan Skrining Tanda Infeksi (Demam/Nyeri Perut)"
    ],
    "sourceGuidelines": "Konsensus Tata Laksana Sindrom Nefrotik Idiopatik pada Anak Ikatan Dokter Anak Indonesia (IDAI) / KDIGO Clinical Practice Guideline for Glomerular Diseases",
    "updatedYear": "2023",
    "keyClinicalAlert": "Orang tua WAJIB diajari cara memeriksa protein urin mandiri dengan carik celup (dipstick) setiap pagi! Remisi tercapai bila dipstick negatif/trace selama 3 hari berturut-turut. Jangan hentikan Prednisone mendadak."
  },
{
    "id": "guideline-syphilis-2026",
    "diseaseName": "Sifilis (Treponema pallidum) Dewasa & Maternal",
    "category": "Anti-Infeksi",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "A51.0",
    "indonesianKeywords": [
      "sifilis",
      "raja singa",
      "treponema pallidum",
      "ulkus durum",
      "rpr vdrl positif",
      "benzathine penicillin",
      "sifilis kehamilan",
      "injeksi penisilin"
    ],
    "summary": "Infeksi menular seksual sistemik kronis yang disebabkan oleh bakteri spiroseta Treponema pallidum. Terbagi menjadi Sifilis Dini (Sifilis Primer dengan ulkus durum tidak nyeri, Sifilis Sekunder dengan ruam makulopapular telapak tangan/kaki dan kondiloma lata, serta Sifilis Laten Dini < 1 tahun) dan Sifilis Lanjut (Sifilis Laten Lanjut >= 1 tahun, Sifilis Tersier gumatosa/kardiovaskular, Neurosifilis, dan Sifilis Kongenital).",
    "targetGoals": [
      "Eradikasi Total Kuman Treponema pallidum dan Penyembuhan Lesi Mukokutan",
      "Penurunan Titer Serologi Non-Treponemal (RPR/VDRL) Minimal 4 Kali Lipat (misal dari 1:32 menjadi <= 1:8) dalam 6 - 12 Bulan",
      "Mencegah Transmisi Kongenital Vertikal Ibu ke Janin dan Komplikasi Neurosifilis Tersier"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Benzathine Penicillin G",
        "dosage": "Sifilis Dini (Primer/Sekunder/Laten Dini): 2.4 juta IU IM DOSIS TUNGGAL (injeksi gluteal dalam terbagi di 2 bokong kiri & kanan). Sifilis Laten Lanjut / Tersier: 2.4 juta IU IM SEKALI SEMINGGU selama 3 MINGGU BERTURUT-TURUT (total 7.2 juta IU)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Baku emas terapi kausatif mutlak rekomendasi PNPK Kemenkes RI 2026 & WHO. Menghasilkan kadar treponemisidal plasma stabil selama 2-3 minggu."
      },
      {
        "drugName": "Procaine Penicillin G",
        "dosage": "Neurosifilis / Sifilis Okular: 2.4 juta IU IM sekali sehari + Probenecid 500 mg PO 4 kali sehari selama 10 - 14 hari penuh",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Alternatif parenteral dengan penetrasi sawar darah otak yang baik; atau Benzilpenisilin G Kristalin 18-24 juta IU/hari IV selama 10-14 hari."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Doxycycline",
        "dosage": "100 mg PO 2 kali sehari sesudah makan selama 14 hari (sifilis dini) atau 28 hari (sifilis laten lanjut)",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Pilihan utama pada pasien ALERGI PENISILIN (HANYA UNTUK WANITA TIDAK HAMIL DAN DEWASA). KONTRAINDIKASI PADA KEHAMILAN."
      },
      {
        "drugName": "Ceftriaxone",
        "dosage": "1 - 2 gram IM atau IV sekali sehari selama 10 - 14 hari",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Alternatif sefalosporin bila penisilin tidak tersedia atau alergi ringan."
      }
    ],
    "nonPharmacological": [
      "Abstinensia (pantang hubungan seksual) hingga ulkus chancre/ruam sembuh total dan titer serologi turun.",
      "Pelacakan Kontak Seksual (Partner Notification & Contact Tracing): Semua pasangan seksual dalam 90 hari terakhir WAJIB diperiksa dan diterapi secara bersamaan.",
      "Penggunaan kondom lateks secara konsisten pada setiap aktivitas seksual pasca kesembuhan.",
      "Edukasi Reaksi Jarisch-Herxheimer (demam, menggigil, nyeri otot akut dalam 24 jam pertama pasca injeksi penisilin akibat lisis masif spiroseta; bukan alergi obat)."
    ],
    "specialPopulations": [
      {
        "condition": "Wanita Hamil dengan Sifilis",
        "recommendation": "PENISILIN ADALAH SATU-SATUNYA TERAPI EFEKTIF YANG DAPAT MENEMBUS PLASENTA UNTUK MENCEGAH KEMATIAN JANIN DAN SIFILIS KONGENITAL. Jika ibu hamil alergi penisilin, WAJIB DILAKUKAN DESENSITISASI PENISILIN di Rumah Sakit.",
        "contraindicatedDrugs": [
          "Doxycycline (Teratogenik diskolorasi gigi permanen dan displasia tulang janin)"
        ]
      }
    ],
    "monitoringParameters": [
      "Uji Serologi Non-Treponemal Kuantitatif (RPR atau VDRL) pada bulan ke-3, ke-6, dan ke-12 pasca terapi",
      "Evaluasi Keberhasilan Terapi: Penurunan titer minimal 4 kali lipat (misal 1:64 menjadi 1:16)",
      "Skrining Koinfeksi Menular Seksual Lainnya (HIV, Gonore, Hepatitis B) pada saat diagnosis awal"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Klinis (PNPK) Tata Laksana Sifilis Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/291/2026) / CDC STI Treatment Guidelines",
    "updatedYear": "2026",
    "keyClinicalAlert": "Benzathine Penicillin G 2.4 juta IU IM adalah baku emas terapi Sifilis. Pada ibu hamil yang alergi penisilin, DILARANG mengganti dengan Doksisiklin; pasien WAJIB dirujuk untuk prosedur Desensitisasi Penisilin agar janin selamat dari Sifilis Kongenital!"
  },
  {
    "id": "guideline-dementia-2026",
    "diseaseName": "Demensia (Penyakit Alzheimer & Demensia Vaskular)",
    "category": "Sistem Saraf & Psikiatri",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "F00.9",
    "indonesianKeywords": [
      "demensia",
      "pikun berat",
      "penyakit alzheimer",
      "demensia vaskular",
      "donepezil",
      "memantine",
      "rivastigmine",
      "lupa ingatan",
      "gangguan perilaku lansia"
    ],
    "summary": "Sindrom penurunan fungsi kognitif global neurodegeneratif progresif (memori episodik, orientasi waktu/tempat, bahasa, praksis, dan fungsi eksekutif) yang melampaui proses penuaan fisiologis normal, mengakibatkan hilangnya kemandirian aktivitas hidup sehari-hari (ADL). Penyebab tersering: Penyakit Alzheimer (60-70%) dan Demensia Vaskular pasca-stroke.",
    "targetGoals": [
      "Memperlambat Laju Kemunduran Fungsi Kognitif dan Memori Terukur",
      "Mempertahankan Kemandirian Fungsional Aktivitas Harian (ADL / IADL) Sepanjang Mungkin",
      "Mengendalikan Gejala Perilaku dan Psikologis Demensia (BPSD: Agitasi, Agresi, Halusinasi, Wandering) Serta Meringankan Beban Caregiver"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Donepezil",
        "dosage": "Awal 5 mg PO sekali sehari pada malam hari sebelum tidur selama minimal 4-6 minggu, dapat ditingkatkan hingga 10 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Inhibitor Asetilkolinesterase (AChEI) reversibel spesifik lini pertama untuk Alzheimer derajat ringan hingga sedang. Tingkatkan neurotransmisi kolinergik sentral."
      },
      {
        "drugName": "Memantine",
        "dosage": "Awal 5 mg PO sekali sehari pagi hari, titrasi naik 5 mg per minggu hingga dosis target 10 mg 2 kali sehari (20 mg/hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Antagonis reseptor NMDA unkompetitif afinitas sedang; melindungi neuron dari eksitotoksisitas glutamat kronis. Lini pertama Alzheimer derajat sedang hingga berat."
      },
      {
        "drugName": "Rivastigmine",
        "dosage": "Oral: 1.5 mg PO 2 kali sehari bersama makanan (titrasi hingga 3 - 6 mg 2x/hari). Transdermal Patch: 4.6 mg/24 jam ditempel sekali sehari (titrasi ke 9.5 mg/24 jam)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Inhibitor ganda asetilkolinesterase dan butirilkolinesterase; sediaan patch transdermal sangat meminimalkan efek samping mual saluran cerna."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Risperidone",
        "dosage": "0.25 - 0.5 mg PO malam hari (dosis sangat rendah, maks 1 - 1.5 mg/hari) hanya untuk BPSD refrakter parah",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Antipsikotik atipikal ajuvan jangka pendek (<6-12 minggu) jika terdapat agitasi agresif berat atau psikosis membahayakan diri sendiri."
      }
    ],
    "nonPharmacological": [
      "Terapi Stimulasi Kognitif (Cognitive Stimulation Therapy / CST) dan Terapi Reminisensi (bercerita pengalaman masa lalu menggunakan foto/musik nostalgia).",
      "Modifikasi Lingkungan Rumah Aman: Pasang pegangan tangan di kamar mandi, lantai anti-slip, kunci pengaman pintu luar, pencahayaan terang malam hari, gelang identitas GPS.",
      "Jadwal rutinitas harian yang terstruktur dan teratur untuk mengurangi kebingungan (sundowning).",
      "Pelatihan dan Konseling Dukungan Caregiver Keluarga untuk mencegah kelelahan fisik dan emosional (Caregiver Burnout)."
    ],
    "specialPopulations": [
      {
        "condition": "Lansia dengan Demensia Lewy Body (DLB) atau Demensia Parkinson",
        "recommendation": "HINDARI obat Antipsikotik Tipikal (seperti Haloperidol) karena pasien DLB memiliki hipersensitivitas neuroleptik ekstrem yang dapat memicu rigiditas katatonik dan kematian mendadak.",
        "contraindicatedDrugs": [
          "Antipsikotik Tipikal (Haloperidol, Klorpromazin)",
          "Obat antikolinergik kuat (Trihexyphenidyl, Amitriptyline)"
        ]
      }
    ],
    "monitoringParameters": [
      "Skor Penilaian Kognitif Global (Mini-Mental State Examination / MMSE atau MoCA-Ina) setiap 6 bulan",
      "Skor Kemandirian Aktivitas Harian Barthel Index (ADL) dan Lawton (IADL)",
      "Evaluasi Gejala Perilaku BPSD (Neuropsychiatric Inventory / NPI) dan toleransi kardiovaskular AChEI (denyut nadi / bradikardia)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Klinis (PNPK) Tata Laksana Demensia Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/273/2026) / Panduan Praktis PERDOSSI",
    "updatedYear": "2026",
    "keyClinicalAlert": "Hindari peresepan obat-obatan yang memiliki efek antikolinergik kuat (seperti Trihexyphenidyl, Diphenhydramine, Amitriptyline) pada pasien demensia karena dapat memperparah kemunduran daya ingat dan memicu konfusi delirium akut!"
  },
  {
    "id": "guideline-hypertension-pregnancy-2026",
    "diseaseName": "Hipertensi Dalam Kehamilan (HDK) & Preeklamsia",
    "category": "Obstetri & Ginekologi",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "O13",
    "indonesianKeywords": [
      "hipertensi kehamilan",
      "preeklamsia",
      "hdk",
      "ibu hamil darah tinggi",
      "nifedipine hamil",
      "methyldopa",
      "magnesium sulfat",
      "aspirin dosis rendah hamil"
    ],
    "summary": "Spektrum kelainan vaskular plasenta yang ditandai dengan Tekanan Darah Sistolik >= 140 mmHg dan/atau Diastolik >= 90 mmHg pada usia kehamilan > 20 minggu, mencakup Hipertensi Gestasional (tanpa proteinuria) dan Preeklamsia (disertai proteinuria >= +1 atau disfungsi organ maternal: trombositopenia < 100.000, gangguan hepar SGOT/SGPT naik 2x, kreatinin > 1.1 mg/dL, edema paru, atau nyeri kepala hebat menetap).",
    "targetGoals": [
      "Mencegah Komplikasi Serebrovaskular Maternal Fatal (Stroke Perdarahan, Eklamsia Kejang, Solusio Plasenta, dan Sindrom HELLP)",
      "Mengendalikan Tekanan Darah Optimal (Target Sistolik 130 - 140 mmHg dan Diastolik 80 - 90 mmHg) Tanpa Mengorbankan Perfusi Uteroplasenta Janin",
      "Menurunkan Angka Kematian Ibu (AKI) dan Mortalitas Perinatal Akibat Prematuritas Iatrogenik"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Methyldopa",
        "dosage": "250 - 500 mg PO 2-3 kali sehari sesudah makan (maksimal 2000 - 3000 mg/hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Agonis alfa-2 adrenergik sentral; baku emas dengan profil keamanan jangka panjang terlengkap pada janin dan pertumbuhan anak."
      },
      {
        "drugName": "Nifedipine",
        "dosage": "Sediaan Lepas Lambat (GITS/Retard): 20 - 30 mg PO sekali sehari (atau 10-20 mg 2 kali sehari). Kasus Urgensi Tensi >= 160/110: 10 mg kapsul ditelan utuh (bukan sublingual)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "CCB dihidropiridin; sangat efektif menurunkan tahanan vaskular perifer tanpa mengganggu aliran darah plasenta."
      },
      {
        "drugName": "Magnesium Sulfate",
        "dosage": "Inisiasi PEB / Eklamsia: Loading Dose 4 gram IV (larutan 20% / 40%) dalam 100 mL RL selama 15-20 menit, dilanjutkan Dosis Rumatan 1 gram/jam IV infus selama 24 jam pasca salin",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Profilaksis dan terapi lini pertama baku emas kejang eklamsia. Syarat pemberian: Refleks patela (+), Laju Napas >= 16x/m, Produksi Urin >= 30 mL/jam, dan Tersedia Kalsium Glukonat 10% sebagai antidotum."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Aspirin",
        "dosage": "Pencegahan Primer Risiko Tinggi: 80 - 150 mg PO sekali sehari pada malam hari sebelum tidur, dimulai sejak usia kehamilan 12 - 16 minggu hingga 36 minggu",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antiplatelet profilaksis terbukti menurunkan risiko preeklamsia hingga >50% pada populasi risiko tinggi (riwayat preeklamsia, kehamilan ganda, DM, penyakit ginjal)."
      },
      {
        "drugName": "Calcium Carbonate",
        "dosage": "1000 - 1500 mg kalsium elemental PO per hari terbagi 2-3 dosis bersama makanan",
        "role": "Combination / Add-On",
        "fornasTier": "Faskes 1",
        "notes": "Suplementasi kalsium pencegah preeklamsia pada populasi dengan asupan kalsium harian rendah."
      }
    ],
    "nonPharmacological": [
      "Istirahat tirah baring posisi miring ke kiri (left lateral recumbent position) untuk memaksimalkan venous return vena kava inferior dan perfusi plasenta.",
      "Diet bergizi seimbang normal protein (TIDAK PERLU diet rendah garam ketat pada kehamilan normal kecuali ada gagal jantung).",
      "Perencanaan persalinan terpadu (terminasi kehamilan adalah satu-satunya terapi definitif preeklamsia berat pada usia gestasi >= 34-37 minggu)."
    ],
    "specialPopulations": [
      {
        "condition": "Semua Wanita Hamil dengan Hipertensi",
        "recommendation": "KONTRAINDIKASI MUTLAK GOLONGAN ACEi DAN ARB SEPANJANG MASA KEHAMILAN karena memicu fetopati renal, anuria janin, gagal ginjal permanen, dan kematian janin dalam kandungan.",
        "contraindicatedDrugs": [
          "ACE Inhibitor (Captopril, Lisinopril, Ramipril)",
          "ARB (Candesartan, Valsartan, Losartan)",
          "Spironolactone / Diuretik dosis tinggi (kecuali ada edema paru maternal)"
        ]
      }
    ],
    "monitoringParameters": [
      "Pengukuran Tekanan Darah berkala dengan manset ukuran pas",
      "Pemeriksaan Proteinuria Urin (Carik Celup / Protein Esbach / Rasio Protein-Kreatinin)",
      "Pemeriksaan Laboratorium Sindrom HELLP (Darah Lengkap/Trombosit, SGOT/SGPT, LDH, Bilirubin, Kreatinin Serum)",
      "Pemantauan Kesejahteraan Janin (Kardiotokografi / USG Doppler Arteri Umbilikalis)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Klinis (PNPK) Tata Laksana Hipertensi Dalam Kehamilan Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/701/2026) / PNPK Preeklamsia POGI",
    "updatedYear": "2026",
    "keyClinicalAlert": "GOLONGAN OBAT DARAH TINGGI ACE INHIBITOR (Captopril/Lisinopril) DAN ARB (Candesartan/Valsartan) DILARANG KERAS DIGUNAKAN PADA KEHAMILAN karena bersifat teratogenik fatal pada ginjal janin!"
  },
  {
    "id": "guideline-obesity-2025",
    "diseaseName": "Obesitas Dewasa & Penurunan Risiko Kardiometabolik",
    "category": "Endokrin & Metabolik",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "E66.0",
    "indonesianKeywords": [
      "obesitas",
      "kegemukan",
      "berat badan berlebih",
      "perut buncit",
      "bmi tinggi",
      "orlistat",
      "liraglutide",
      "diet kalori",
      "bariatrik"
    ],
    "summary": "Penyakit metabolik multifaktorial kronis yang ditandai dengan penumpukan jaringan lemak tubuh berlebihan yang berdampak buruk terhadap kesehatan fisik, metabolik, dan psikososial. Klasifikasi Asia-Pasifik Kemenkes RI: Berat Badan Berlebih / Overweight (BMI 23.0 - 24.9 kg/m²), Obesitas Tingkat I (BMI 25.0 - 29.9 kg/m²), Obesitas Tingkat II (BMI >= 30.0 kg/m²), dan Obesitas Sentral (Lingkar Perut Pria >= 90 cm, Wanita >= 80 cm).",
    "targetGoals": [
      "Penurunan Berat Badan Realistis Sebesar 5 - 10% dari Berat Badan Basal dalam 6 Bulan Pertama",
      "Perbaikan Parameter Komorbiditas Kardiometabolik (Menurunkan HbA1c, Tekanan Darah Sistolik/Diastolik, Trigliserida, dan Menaikkan HDL)",
      "Mempertahankan Penurunan Berat Badan Jangka Panjang dan Mencegah Efek Yoyo (Weight Regain)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Liraglutide",
        "dosage": "Injeksi subkutan harian; awal 0.6 mg/hari SC selama 1 minggu, titrasi naik 0.6 mg tiap minggu hingga dosis terapeutik 3.0 mg/hari SC bersamaan dengan diet rendah kalori dan aktivitas fisik",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Agonis Reseptor GLP-1 lini pertama persetujuan BPOM/FDA untuk obesitas; meningkatkan rasa kenyang di hipotalamus dan memperlambat pengosongan lambung."
      },
      {
        "drugName": "Orlistat",
        "dosage": "120 mg PO 3 kali sehari diminum bersamaan atau maksimal 1 jam setelah makan makanan yang mengandung lemak",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Inhibitor lipase lambung dan pankreas; menghambat penyerapan ~30% lemak makanan di usus halus. Wajib suplemen multivitamin ADEK larut lemak."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Metformin",
        "dosage": "500 - 1000 mg PO 2 kali sehari bersama makanan",
        "role": "Combination / Add-On",
        "fornasTier": "Faskes 1",
        "notes": "Sensitizer insulin; terapi pilihan tambahan pada pasien obesitas dengan komorbid Pradiabetes, Resistensi Insulin, atau Sindrom Ovarium Polikistik (PCOS)."
      }
    ],
    "nonPharmacological": [
      "Terapi Nutrisi Medis Defisit Kalori: Pengurangan 500 - 750 kkal/hari dari kebutuhan harian basal (target asupan 1200 - 1500 kkal/hari untuk wanita, 1500 - 1800 kkal/hari untuk pria).",
      "Aktivitas Fisik Aerobik & Latihan Beban: Minimal 150 - 300 menit per minggu aktivitas aerobik intensitas sedang (jalan cepat, bersepeda) ditambah latihan resistensi otot 2-3 kali seminggu.",
      "Modifikasi Perilaku & Higiene Tidur: Tidur cukup 7-8 jam per malam (kurang tidur meningkatkan hormon lapar ghrelin), pencatatan harian makanan (food logging).",
      "Pertimbangan Bedah Bariatrik & Metabolik (Sleeve Gastrectomy / Roux-en-Y Gastric Bypass) pada Obesitas Ekstrem (BMI >= 35 kg/m² dengan komorbid berat atau BMI >= 37.5 kg/m²)."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Obesitas dengan Riwayat Kanker Tiroid Medularis atau MEN-2",
        "recommendation": "HINDARI obat golongan Agonis Reseptor GLP-1 (Liraglutide/Semaglutide). Pilih Orlistat atau terapi non-farmakologis intensif.",
        "contraindicatedDrugs": [
          "Liraglutide / Agonis GLP-1 pada riwayat Medullary Thyroid Carcinoma (MTC)"
        ]
      }
    ],
    "monitoringParameters": [
      "Penimbangan Berat Badan, Indeks Massa Tubuh (BMI), dan Pengukuran Lingkar Pinggang setiap 2 - 4 minggu",
      "Profil Glikemik (Gula Darah Puasa / HbA1c) dan Profil Lipid Lengkap (Trigliserida, Kolesterol Total, HDL, LDL)",
      "Pemeriksaan Tekanan Darah dan Enzim Hati (SGOT/SGPT untuk evaluasi perbaikan perlemakan hati NAFLD/MASLD)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Klinis (PNPK) Tata Laksana Obesitas Dewasa Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/509/2025) / Konsensus Pengelolaan Obesitas PERKENI",
    "updatedYear": "2025",
    "keyClinicalAlert": "Farmakoterapi obesitas diindikasikan pada pasien dengan BMI >= 27 kg/m² yang memiliki komorbid (Hipertensi/DM/Dislipidemia) atau BMI >= 30 kg/m² yang belum mencapai target dengan perubahan gaya hidup. Obat obesitas harus selalu didampingi diet defisit kalori dan olahraga!"
  },
  {
    "id": "guideline-schizophrenia-2025",
    "diseaseName": "Skizofrenia & Gangguan Psikotik Kronis Dewasa",
    "category": "Sistem Saraf & Psikiatri",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "F20.9",
    "indonesianKeywords": [
      "skizofrenia",
      "gangguan jiwa berat",
      "psikotik",
      "halusinasi suara",
      "waham curiga",
      "risperidone",
      "olanzapine",
      "aripiprazole",
      "clozapine",
      "haloperidol"
    ],
    "summary": "Gangguan jiwa psikotik berat kronis yang ditandai dengan distorsi mendalam pada proses berpikir, persepsi, emosi, bahasa, dan perilaku. Meliputi Gejala Positif (Waham/Delusi, Halusinasi dengar/lihat), Gejala Negatif (Afek tumpul, Avolisi, Alogia, Penarikan diri sosial), serta Disorganisasi Pikiran dan Perilaku motorik katatonik.",
    "targetGoals": [
      "Mengatasi Episode Psikotik Akut dan Meredakan Agitasi Perilaku Gaduh Gelisah",
      "Mencapai Remisi Gejala Penuh dan Mencegah Terjadinya Relaps Kekambuhan Berulang",
      "Meningkatkan Fungsi Kognitif, Keterampilan Sosial, dan Reintegrasi Komunitas Pasien (Recovery)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Risperidone",
        "dosage": "Awal 1 - 2 mg PO per hari pada malam hari, titrasi bertahap tiap 2-3 hari hingga dosis efektif 2 - 6 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antipsikotik Atipikal (APG-II) lini pertama baku emas; efektifitas seimbang pada gejala positif dan negatif dengan risiko ekstrapiramidal rendah."
      },
      {
        "drugName": "Olanzapine",
        "dosage": "Awal 5 - 10 mg PO sekali sehari pada malam hari sebelum tidur, titrasi hingga 10 - 20 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "APG-II sangat poten untuk agitasi dan gejala negatif; monitor berat badan dan profil metabolik berkala."
      },
      {
        "drugName": "Aripiprazole",
        "dosage": "Awal 10 - 15 mg PO sekali sehari pada pagi hari, titrasi hingga 15 - 30 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Agonis parsial reseptor dopamin D2; profil metabolik terbaik (tidak memicu kenaikan berat badan atau sedasi berlebih)."
      },
      {
        "drugName": "Haloperidol",
        "dosage": "Akut Gaduh Gelisah: 2.5 - 5 mg IM atau PO (dapat diulang setelah 30-60 menit, maks 15-20 mg/hari). Rumatan: 5 - 15 mg/hari PO",
        "role": "Acute Rescue",
        "fornasTier": "Faskes 1",
        "notes": "Antipsikotik Tipikal (APG-I) poten pereda gaduh gelisah darurat; siapkan Trihexyphenidyl atau Difenhidramin injeksi bila terjadi distonia akut."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Clozapine",
        "dosage": "Awal 12.5 - 25 mg PO malam hari, titrasi lambat tiap beberapa hari hingga 200 - 450 mg/hari terbagi 1-2 dosis",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Baku emas Skizofrenia Resisten Pengobatan (Treatment-Resistant Schizophrenia / TRS yang gagal dengan 2 antipsikotik berbeda). Wajib monitor hitung leukosit/ANC berkala (risiko agranulositosis)."
      }
    ],
    "nonPharmacological": [
      "Psikoedukasi Keluarga (Family Psychoeducation) untuk menurunkan tingkat Expressed Emotion (kritikan berlebih dan permusuhan di rumah) yang merupakan pemicu utama relaps.",
      "Rehabilitasi Psikososial dan Pelatihan Keterampilan Sosial (Social Skills Training / SST).",
      "Terapi Perilaku Kognitif untuk Psikosis (CBTp) dan dukungan okupasi mandiri.",
      "Dukungan komunitas dan pencegahan stigma serta penolakan pemasungan (*Gerakan Bebas Pasung Kemenkes RI*)."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien dengan Episode Pertama Psikosis (First-Episode Psychosis / FEP)",
        "recommendation": "Gunakan dosis awal yang lebih rendah (misal Risperidone 1-2 mg/hari) karena pasien FEP sangat sensitif terhadap efek samping ekstrapiramidal dan respons terapeutik.",
        "contraindicatedDrugs": [
          "Penghentian dini antipsikotik dalam kurun waktu < 1-2 tahun pertama pasca remisi"
        ]
      }
    ],
    "monitoringParameters": [
      "Skala Gejala Klinis Positive and Negative Syndrome Scale (PANSS) atau BPRS",
      "Skrining Efek Samping Ekstrapiramidal (EPS: Parkinsonisme, Akatisia, Distonia Akut, Diskinesia Tardif)",
      "Profil Sindrom Metabolik: Berat Badan, Lingkar Perut, Tekanan Darah, Gula Darah Puasa, dan Profil Lipid setiap 3-6 bulan"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Klinis (PNPK) Tata Laksana Skizofrenia Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/970/2025) / Konsensus PDSKJI",
    "updatedYear": "2025",
    "keyClinicalAlert": "Pengobatan antipsikotik pada skizofrenia WAJIB DILANJUTKAN MINIMAL 1 - 2 TAHUN (pada episode pertama) atau SEUMUR HIDUP (pada episode berulang) untuk mencegah kekambuhan dan perburukan fungsi otak!"
  },
  {
    "id": "guideline-cirrhosis-2025",
    "diseaseName": "Sirosis Hati & Tatalaksana Komplikasi Hipertensi Porta",
    "category": "Gastrointestinal",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "K74.6",
    "indonesianKeywords": [
      "sirosis hati",
      "liver kronis",
      "perut buncit asites",
      "varises esofagus",
      "muntah darah liver",
      "koma hepatik",
      "spironolactone furosemide",
      "lactulose sirosis"
    ],
    "summary": "Stadium akhir fibrosis hepatik difus progresif dengan distorsi arsitektur vaskular dan pembentukan nodul regeneratif parenkim hati abnormal. Komplikasi dekompensasi meliputi Asites masif, Peritonitis Bakterial Spontan (SBP), Perdarahan Varises Gastroesofagus (VH), Ensefalopati Hepatik (HE), dan Sindrom Hepatorenal (HRS).",
    "targetGoals": [
      "Mengontrol Asites dan Edema Perifer Tanpa Menginduksi Hipovolemia Intravaskular atau Gangguan Elektrolit",
      "Mencegah Terjadinya Perdarahan Varises Esofagus Primer Maupun Perdarahan Ulang Sekunder",
      "Mengatasi dan Mencegah Episode Ensefalopati Hepatik serta Infeksi Peritonitis Bakterial Spontan (SBP)",
      "Memperlambat Dekompensasi Hati dan Skrining Dini Karsinoma Sel Hati (HCC)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Spironolactone",
        "dosage": "Asites: Awal 100 mg PO sekali sehari pada pagi hari, dititrasi bertahap setiap 3-5 hari hingga maksimal 400 mg/hari (dikombinasikan dengan Furosemide)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antagonis aldosteron lini pertama asites sirosis; membalikkan hiperaldosteronisme sekunder retensi natrium."
      },
      {
        "drugName": "Furosemide",
        "dosage": "Asites: Awal 40 mg PO sekali sehari pagi hari (kombinasi rasio emas 100 mg Spironolactone : 40 mg Furosemide), titrasi hingga maks 160 mg/hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Diuretik loop sinergis; mempertahankan keseimbangan kalium serum normal bersama spironolakton."
      },
      {
        "drugName": "Propranolol",
        "dosage": "Preventsi Perdarahan Varises: Awal 20 - 40 mg PO 2 kali sehari, titrasi bertahap hingga target resting heart rate 55 - 60 bpm (maks 160-320 mg/hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Beta-bloker non-selektif; menurunkan tekanan vena porta via vasokonstriksi splanknikus alfa-1 (blokade beta-2) dan penurunan cardiac output (blokade beta-1)."
      },
      {
        "drugName": "Lactulose",
        "dosage": "Ensefalopati Hepatik: 30 - 45 mL PO 3-4 kali sehari (titrasi target 2-3 kali defekasi lunak per hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Disakarida osmotik pengasam kolon; mengubah amonia difusibel (NH3) menjadi ion amonium (NH4+) yang terperangkap dan dibuang di feses."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Ceftriaxone",
        "dosage": "1 - 2 gram IV sekali sehari selama 5 - 7 hari",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Antibiotik empiris lini pertama baku emas untuk terapi Peritonitis Bakterial Spontan (SBP / hitung neutrofil cairan asites PMN >= 250 sel/mm³) dan profilaksis perdarahan varises akut."
      },
      {
        "drugName": "Human Albumin 20%",
        "dosage": "Parasantesis Asites Volume Besar (>5 Liter): 8 gram Albumin per 1 Liter cairan asites yang dikeluarkan IV; SBP: 1.5 g/kgBB IV hari-1 dan 1 g/kgBB hari-3",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Mencegah Disfungsi Sirkulasi Pasca-Parasentesis (PPCD) dan gagal ginjal hepatorenal sindrom."
      }
    ],
    "nonPharmacological": [
      "Diet Rendah Garam / Natrium: Batasi asupan natrium < 2 gram/hari (< 1 sendok teh garam dapur) untuk mengontrol asites.",
      "Asupan Nutrisi dan Kalori Adekuat: Diet tinggi kalori (30-35 kkal/kgBB/hari) dan protein normal-tinggi (1.2 - 1.5 g/kgBB/hari) terbagi dalam porsi kecil sering (hindari restriksi protein karena memperparah sarkopenia).",
      "Hentikan Total Konsumsi Alkohol dan hindari obat-obatan hepatotoksik (NSAID, Parasetamol dosis tinggi, suplemen herbal tanpa izin).",
      "Vaksinasi Hepatitis A, Hepatitis B, dan Pneumokokus."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Sirosis dengan Asites yang Membutuhkan Analgesik",
        "recommendation": "KONTRAINDIKASI MUTLAK GOLONGAN NSAID (Ibuprofen, Meloxicam, Ketorolac, Asam Mefenamat) karena memicu vasokonstriksi arteriol ginjal, Gagal Ginjal Akut Hepatorenal, asites refrakter, dan perdarahan saluran cerna.",
        "contraindicatedDrugs": [
          "Semua jenis NSAID",
          "Obat nefrotoksisitas aminoglikosida"
        ]
      }
    ],
    "monitoringParameters": [
      "Skor Penilaian Keparahan Fungsi Hati Child-Pugh Score dan MELD Score (Model for End-Stage Liver Disease)",
      "Penimbangan Berat Badan harian (target penurunan BB 0.5 kg/hari tanpa edema atau 1 kg/hari dengan edema)",
      "Pemeriksaan USG Abdomen dan Alfa-Fetoprotein (AFP) setiap 6 bulan untuk deteksi dini Kanker Hati (Karsinoma Sel Hati / HCC)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Klinis (PNPK) Tata Laksana Sirosis Hati pada Dewasa Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/778/2025) / Konsensus PGI-PEGI",
    "updatedYear": "2025",
    "keyClinicalAlert": "DILARANG MEMBERIKAN OBAT PEREDA NYERI GOLONGAN NSAID (seperti Asam Mefenamat/Ibuprofen/Natrium Diklofenak) pada pasien sirosis hati karena dapat memicu GAGAL GINJAL AKUT (Sindrom Hepatorenal) yang mematikan dalam hitungan hari!"
  },
  {
    "id": "guideline-stable-angina-pnpk",
    "diseaseName": "Angina Pektoris Stabil & Sindrom Koroner Kronis (CCS)",
    "category": "Kardiovaskular",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "I20.9",
    "indonesianKeywords": [
      "angina stabil",
      "penyakit jantung koroner",
      "nyeri dada saat aktivitas",
      "pjk kronis",
      "isdn sublingual",
      "bisoprolol",
      "aspirin",
      "atorvastatin",
      "pasang ring jantung"
    ],
    "summary": "Sindrom klinis nyeri dada retrosternal substernal iskemik miokard (rasa tertekan berat, menjalar ke leher, rahang, atau lengan kiri) yang dipicu oleh aktivitas fisik atau stres emosional dan mereda dalam waktu < 5-10 menit dengan istirahat atau nitrat sublingual, akibat plak aterosklerosis koroner obstruktif yang stabil.",
    "targetGoals": [
      "Menghilangkan Gejala Angina Pektoris dan Memperbaiki Kapasitas Fungsional Aktivitas Harian (CCS Class 0-I)",
      "Pencegahan Kejadian Kardiovaskular Mayor (MACE: Infark Miokard Akut, Kematian Kardiovaskular, dan Gagal Jantung)",
      "Mencapai Target Agresif Kadar Kolesterol LDL < 55 mg/dL dan Penurunan >= 50% dari Nilai Basal"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Bisoprolol",
        "dosage": "2.5 - 5 mg PO sekali sehari pada pagi hari, titrasi hingga target resting heart rate 55 - 60 bpm (maksimal 10 mg/hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Beta-1 bloker kardioselektif lini pertama anti-angina; menurunkan konsumsi oksigen miokard (MVO2) via penurunan laju denyut jantung dan kontraktilitas."
      },
      {
        "drugName": "Isosorbide Dinitrate",
        "dosage": "Serangan Akut: 5 mg Sublingual saat nyeri dada (dapat diulang tiap 5 menit, maks 3 dosis). Profilaksis Rumatan: 10 - 20 mg PO 2-3 kali sehari dengan interval bebas nitrat 10-12 jam",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Nitrat kerja cepat venodilator koroner; wajib menyertakan interval bebas nitrat malam hari untuk mencegah toleransi nitrat."
      },
      {
        "drugName": "Aspirin",
        "dosage": "75 - 100 mg PO sekali sehari sesudah makan pagi",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antiplatelet tunggal baku emas pencegahan sekunder jangka panjang untuk mencegah trombosis plak ateroma."
      },
      {
        "drugName": "Atorvastatin",
        "dosage": "20 - 40 mg (atau Rosuvastatin 10 - 20 mg) PO sekali sehari pada malam hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Statin intensitas tinggi; stabilisasi plak aterosklerotik koroner dan penurunan agresif kolesterol aterogenik."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Amlodipine",
        "dosage": "5 - 10 mg PO sekali sehari",
        "role": "Combination / Add-On",
        "fornasTier": "Faskes 1",
        "notes": "CCB dihidropiridin; lini kedua kombinasi bersama Beta-bloker bila gejala angina belum terkontrol penuh atau intoleran beta-bloker."
      },
      {
        "drugName": "Clopidogrel",
        "dosage": "75 mg PO sekali sehari sesudah makan",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Antiplatelet inhibitor P2Y12; alternatif utama jika pasien memiliki kontraindikasi/alergi terhadap Aspirin."
      }
    ],
    "nonPharmacological": [
      "Pola Makan Sehat Jantung (Diet Mediterania): Kaya sayuran, buah-buahan, biji-bijian utuh, ikan, minyak zaitun, dan batasi lemak jenuh serta gula sederhana.",
      "Aktivitas Fisik Teratur Terbimbing: Olahraga aerobik 30-60 menit/hari minimal 5 hari seminggu yang disesuaikan dengan kapasitas uji latih jantung (Treadmill Test).",
      "Berhenti Merokok Total (termasuk rokok elektrik) dan hindari paparan asap rokok pasif.",
      "Pengendalian Berat Badan (target BMI 18.5 - 22.9 kg/m²) dan pengelolaan stres."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Angina yang Mengonsumsi Obat Disfungsi Ereksi (Sildenafil / Tadalafil)",
        "recommendation": "KONTRAINDIKASI MUTLAK PEMBERIAN NITRAT (ISDN / Nitrogliserin) dalam kurun waktu 24 jam setelah Sildenafil atau 48 jam setelah Tadalafil karena memicu vasodilatasi masif, hipotensi berat refrakter, syok kardiogenik, dan kematian.",
        "contraindicatedDrugs": [
          "ISDN / Nitrat bersama Sildenafil atau Tadalafil"
        ]
      }
    ],
    "monitoringParameters": [
      "Frekuensi dan Derajat Keparahan Serangan Angina (Canadian Cardiovascular Society / CCS Functional Class)",
      "Profil Lipid Lengkap (Kolesterol Total, Trigliserida, HDL, dan LDL) setiap 6 - 12 minggu hingga target tercapai",
      "Elektrokardiogram EKG 12 Sadapan, Uji Latih Beban Jantung (Treadmill Stress Test), atau Ekokardiografi berkala"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Angina Pektoris Stabil Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/1419/2023) / Panduan PERKI / ESC CCS Guidelines",
    "updatedYear": "2026",
    "keyClinicalAlert": "DILARANG KERAS meminum obat nitrat (seperti ISDN) bersamaan dengan obat kuat disfungsi ereksi golongan inhibitor PDE-5 (seperti Sildenafil / Viagra atau Tadalafil) karena dapat memicu DROP TEKANAN DARAH FATAL dan henti jantung!"
  },
{
    "id": "guideline-adult-sepsis",
    "diseaseName": "Sepsis & Syok Septik Dewasa (Hour-1 Bundle Protocol)",
    "category": "Anti-Infeksi",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "A41.9",
    "indonesianKeywords": [
      "sepsis",
      "syok septik",
      "infeksi berat",
      "laktat tinggi",
      "norepinephrine",
      "meropenem",
      "resusitasi cairan kristaloid",
      "qsofa"
    ],
    "summary": "Disfungsi organ yang mengancam jiwa akibat disregulasi respon imun pejamu terhadap infeksi sistemik (peningkatan skor SOFA >= 2 atau skrining cepat qSOFA >= 2: Laju Napas >= 22x/m, Perubahan Status Mental GCS < 15, Tekanan Darah Sistolik <= 100 mmHg). Syok Septik ditandai hipotensi refrakter yang memerlukan vasopresor untuk mempertahankan MAP >= 65 mmHg dan kadar laktat serum > 2 mmol/L meski telah diresusitasi cairan adekuat.",
    "targetGoals": [
      "Pelaksanaan Protokol Hour-1 Bundle Sepsis dalam Kurun Waktu < 60 Menit Sejak Pasien Tiba di Faskes/IGD",
      "Mencapai dan Mempertahankan Target Mean Arterial Pressure (MAP) >= 65 mmHg dan Urin Output >= 0.5 mL/kg/jam",
      "Klirens Asam Laktat Serum (Penurunan Kadar Laktat Menuju Normal < 2.0 mmol/L dalam 6 Jam Pertama)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Norepinephrine",
        "dosage": "Infus IV kontinu via central venous line (atau jalur perifer darurat); awal 0.05 - 0.1 mcg/kgBB/menit, titrasi cepat tiap 2-5 menit hingga target MAP >= 65 mmHg (dosis lazim 0.2 - 1.0 mcg/kgBB/menit)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Vasopresor lini pertama pilihan utama; agonis alfa-1 poten yang meningkatkan resistensi vaskular sistemik tanpa takikardia berlebih."
      },
      {
        "drugName": "Meropenem",
        "dosage": "1000 mg IV tiap 8 jam diberikan secara infus diperpanjang (extended infusion selama 3 jam) setelah bolus loading dose inisial",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Karbapenem antipseudomonas spektrum luas; wajib diberikan dalam < 1 jam pertama setelah pengambilan kultur darah pada sepsis berat/syok septik."
      },
      {
        "drugName": "Ceftriaxone",
        "dosage": "2000 mg (2 gram) IV sekali sehari dilarutkan dalam 100 mL NaCl 0.9% habis dalam 30 menit",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Antibiotik empiris lini pertama di faskes primer/rujukan awal untuk sepsis komunitas sebelum data mikrobiologi tersedia."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Vasopressin",
        "dosage": "0.03 unit/menit IV drip infus kontinu dosis tetap (tidak dititrasi)",
        "role": "Combination / Add-On",
        "fornasTier": "Faskes 2/3",
        "notes": "Vasopresor lini kedua tambahan; ditambahkan untuk menurunkan kebutuhan dosis norepinefrin jika MAP belum stabil."
      },
      {
        "drugName": "Hydrocortisone",
        "dosage": "200 mg/hari IV (diberikan 50 mg IV tiap 6 jam atau infus kontinu 200 mg/24 jam)",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Kortikosteroid dosis fisiologis; diindikasikan HANYA pada syok septik refrakter vasopresor dosis tinggi (Norepinefrin >= 0.25 mcg/kg/menit)."
      }
    ],
    "nonPharmacological": [
      "Resusitasi Cairan Kristaloid Cepat: Berikan minimal 30 mL/kgBB cairan kristaloid isotonik (Ringer Laktat) IV dalam 3 jam pertama.",
      "Pengambilan Kultur Darah 2 Set (aerob dan anaerob) SEBELUM antibiotik pertama dimasukkan (tanpa menunda antibiotik > 1 jam).",
      "Pemeriksaan Asam Laktat Darah Awal dan evaluasi ulang dalam 2-4 jam untuk menilai adekuasi perfusi jaringan.",
      "Pencarian dan Kontrol Sumber Infeksi (Source Control: drainase abses, debridemen luka nekrotik, pelepasan kateter terinfeksi) dalam < 6-12 jam."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Sepsis dengan Gagal Jantung Kongestif Berat atau Penyakit Ginjal Kronis Stadium Akhir",
        "recommendation": "Lakukan pemberian cairan kristaloid dengan teknik uji beban dinamis (fluid challenge 250-500 mL) terpandu ultrasonografi paru (B-lines) dan vena kava inferior (VKI collapsibility) untuk mencegah edema paru kardiogenik iatrogenik.",
        "contraindicatedDrugs": [
          "Pemberian koloid hidroksietil starches (HES) - meningkatkan mortalitas dan gagal ginjal akut"
        ]
      }
    ],
    "monitoringParameters": [
      "Target Mean Arterial Pressure (MAP) kontinu via monitor tekanan darah invasif/non-invasif",
      "Kadar Asam Laktat Serum serial setiap 2 - 4 jam hingga < 2 mmol/L",
      "Produksi Urin per jam via kateter Folley (target >= 0.5 mL/kgBB/jam)"
    ],
    "sourceGuidelines": "Surviving Sepsis Campaign International Guidelines for Management of Sepsis and Septic Shock / PNPK Sepsis Kemenkes RI",
    "updatedYear": "2024",
    "keyClinicalAlert": "HOUR-1 BUNDLE PROTOCOL: Ambil kultur darah dan masukkan antibiotik IV spektrum luas serta resusitasi cairan kristaloid 30 mL/kgBB dalam kurun waktu < 60 MENIT PERTAMA! Setiap keterlambatan 1 jam pemberian antibiotik meningkatkan mortalitas sepsis hingga 7.6%!"
  },
  {
    "id": "guideline-pediatric-sepsis",
    "diseaseName": "Sepsis & Syok Septik pada Anak & Neonatus",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "P36.9",
    "indonesianKeywords": [
      "sepsis anak",
      "sepsis neonatus",
      "infeksi darah bayi",
      "syok septik anak",
      "ampicillin gentamicin bayi",
      "epinephrine infus anak",
      "crt lambat anak"
    ],
    "summary": "Disfungsi organ kardiovaskular atau multiorgan yang mengancam jiwa akibat infeksi sistemik pada bayi baru lahir dan anak-anak. Meliputi Sepsis Neonatorum Awitan Dini / Early-Onset Sepsis (< 72 jam pertama kehidupan, transmisi vertikal maternal) dan Awitan Lambat / Late-Onset Sepsis (> 72 jam, infeksi nosokomial/komunitas).",
    "targetGoals": [
      "Pemberian Antibiotik IV Empiris Spektrum Luas Sesuai Usia dalam < 60 Menit Pertama",
      "Resusitasi Cairan Bolus 10 - 20 mL/kgBB dalam 20 Menit Pertama hingga Perfusi Membaik",
      "Normalisasi Capillary Refill Time (CRT < 2 detik), Denyut Nadi Kuat, Laju Jantung Sesuai Usia, dan Produksi Urin >= 1 mL/kg/jam"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Ampicillin",
        "dosage": "Sepsis Neonatus Awal (<72 jam): 50 mg/kgBB/kali IV tiap 12 jam (usia < 7 hari) atau tiap 8 jam (usia >= 7 hari) dikombinasikan dengan Gentamicin",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Baku emas lini pertama sepsis neonatus awitan dini; mencakup patogen maternal Streptococcus Grup B (GBS) dan Listeria monocytogenes."
      },
      {
        "drugName": "Gentamicin",
        "dosage": "Sepsis Neonatus: 4 - 5 mg/kgBB IV sekali sehari (tiap 24 jam) diinfuskan lambat dalam 30 menit",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Aminoglikosida sinergis mencakup basil gram negatif enterik (E. coli, Klebsiella)."
      },
      {
        "drugName": "Ceftriaxone",
        "dosage": "Sepsis Anak Usia > 1 Bulan: 50 - 100 mg/kgBB/hari IV sekali sehari (maks 2 gram/hari)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Sefalosporin generasi ke-3 lini pertama sepsis anak komunitas. KONTRAINDIKASI PADA NEONATUS < 28 HARI DENGAN HIPERBILIRUBINEMIA ATAU MENERIMA KALSIUM IV."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Epinephrine",
        "dosage": "Syok Dingin Anak (Cold Shock): Infus IV/IO 0.05 - 0.3 mcg/kgBB/menit titrasi",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Inotropik dan vasopresor lini pertama pilihan pada syok septik anak tipe cold shock (ekstremitas dingin, CRT > 2 detik, nadi lemah)."
      },
      {
        "drugName": "Meropenem",
        "dosage": "Sepsis Nosokomial Berat: 20 - 40 mg/kgBB/kali IV tiap 8 jam",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Diindikasikan pada sepsis rumah sakit (HAIs) dengan kecurigaan bakteri resisten ESBL."
      }
    ],
    "nonPharmacological": [
      "Akses Vaskular Segera: Jika akses IV perifer gagal dipasang dalam 5 menit pertama, PASANG JARUM INTRAOSEUS (IO) SEGERA.",
      "Oksigenasi konsentrasi tinggi via sungkup dengan reservoir (NRM) atau nasal kanul high-flow.",
      "Pencegahan Hipotermia pada neonatus (gunakan infant warmer / metode kanguru) dan koreksi hipoglikemia (Dextrose 10% 2 mL/kgBB bolus IV)."
    ],
    "specialPopulations": [
      {
        "condition": "Neonatus Usia < 28 Hari dengan Sepsis",
        "recommendation": "HINDARI Ceftriaxone (menggeser ikatan bilirubin pada albumin memicu kernikterus ensefalopati dan membentuk presipitat kalsium-seftriakson di paru/ginjal). Gunakan Cefotaxime jika sefalosporin generasi 3 diperlukan.",
        "contraindicatedDrugs": [
          "Ceftriaxone pada neonatus hiperbilirubinemia / menerima infus kalsium"
        ]
      }
    ],
    "monitoringParameters": [
      "Waktu Pengisian Kapiler (Capillary Refill Time / CRT) pada sternum/ujung jari",
      "Tekanan Darah Arteri, Frekuensi Denyut Jantung, dan Skor Kesadaran Pediatrik",
      "Kadar Gula Darah Sewaktu (skrining hipoglikemia neonatus) dan Kadar Asam Laktat"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Sepsis Pada Anak Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/4722/2021) / Surviving Sepsis Campaign International Guidelines for Pediatric Sepsis",
    "updatedYear": "2024",
    "keyClinicalAlert": "Bila akses infus vena perifer pada anak/bayi syok septik sulit dipasang dalam 5 MENIT PERTAMA, SEGERA PASANG AKSES INTRAOSEUS (IO) pada tuberositas tibia untuk memasukkan cairan resusitasi dan antibiotik!"
  },
  {
    "id": "guideline-dka-hhs",
    "diseaseName": "Ketoasidosis Diabetik (KAD) & Krisis Hiperglikemia Dewasa",
    "category": "Endokrin & Metabolik",
    "organization": "PERKENI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "E10.1",
    "indonesianKeywords": [
      "kad",
      "ketoasidosis diabetik",
      "gula darah sangat tinggi",
      "napas kussmaul",
      "keton positif",
      "insulin reguler actrapid",
      "kcl infus",
      "krisis diabetes"
    ],
    "summary": "Kegawatdaruratan metabolik diabetes melitus yang ditandai oleh trias biokimia: Hiperglikemia (Glukosa Darah > 250 mg/dL), Ketosis (Keton serum/urin positif >= +2), dan Asidosis Metabolik Anion Gap Tinggi (pH darah < 7.30, Bikarbonat serum < 18 mEq/L, Anion Gap > 12) akibat defisiensi insulin absolut atau relatif berat disertai lonjakan hormon glukagon dan katekolamin.",
    "targetGoals": [
      "Rehidrasi Volume Cairan Intravaskular yang Hilang (Defisit Rata-rata 100 mL/kgBB atau 5-8 Liter) secara Bertahap",
      "Resolusi Total Asidosis Metabolik dan Ketosis (pH Arteri > 7.30, Bikarbonat >= 18 mEq/L, Normal Anion Gap <= 12)",
      "Penurunan Glukosa Darah Bertahap 50 - 75 mg/dL per Jam (Mencegah Risiko Edema Serebral dan Hipokalemia Fatal)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Insulin Reguler (Short-Acting)",
        "dosage": "Infus IV Kontinu: Awal 0.1 Unit/kgBB/jam IV kontinu (atau bolus 0.1 U/kgBB IV dilanjutkan 0.1 U/kgBB/jam). Bila glukosa darah tidak turun 50-75 mg/dL dalam jam pertama, gandakan kecepatan infus insulin",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Baku emas terapi KAD; menekan lipolisis hepar dan produksi benda keton. JANGAN MEMULAI INSULIN BILA KALIUM SERUM < 3.3 mEq/L."
      },
      {
        "drugName": "Kalium Klorida (KCl)",
        "dosage": "Koreksi Elektrolit: Tambahkan 20 - 30 mEq KCl per 1 Liter cairan infus segera setelah Kalium serum < 5.2 mEq/L dan urin output terpantau lancar (target Kalium serum 4.0 - 5.0 mEq/L)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Mencegah hipokalemia fatal akibat perpindahan kalium dari ekstraseluler ke intraseluler yang dipacu oleh insulin."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Natrium Bikarbonat",
        "dosage": "100 mmol NaHCO3 dalam 400 mL air steril + 20 mEq KCl diinfuskan selama 2 jam HANYA JIKA pH darah arteri < 6.90",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Hanya diindikasikan pada asidosis ekstrem mengancam jiwa (pH < 6.90); tidak direkomendasikan pada pH >= 6.90 karena risiko hipokalemia dan asidosis SSP paradoksal."
      }
    ],
    "nonPharmacological": [
      "Protokol Resusitasi Cairan Kristaloid NaCl 0.9%: Jam ke-1: 1000 - 1500 mL IV bolus; Jam ke-2 hingga ke-4: 500 - 1000 mL/jam. Evaluasi natrium terkoreksi: jika normal/tinggi, ganti ke NaCl 0.45% (250-500 mL/jam).",
      "Ganti Cairan ke Dextrose 5% dalam NaCl 0.45%: Begitu glukosa darah mencapai < 200 - 250 mg/dL, SEGERA tambahkan infus Dextrose 5% dengan mempertahankan infus insulin dosis rendah (0.02 - 0.05 U/kg/jam) hingga ketoasidosis teratasi penuh.",
      "Identifikasi Faktor Presipitasi: Infeksi akut (pneumonia, ISK, sepsis - 50% kasus), putus obat insulin, infark miokard akut, atau pankreatitis.",
      "Transisi ke Insulin Subkutan Basal-Bolus: Dilakukan HANYA setelah KAD teratasi penuh (pH > 7.30, HCO3 >= 18, Anion Gap normal) dan pasien bisa makan per oral (berikan insulin subkutan 1-2 jam SEBELUM infus insulin IV dihentikan)."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien KAD dengan Hipokalemia Basal (Kalium < 3.3 mEq/L)",
        "recommendation": "TUNDA PEMBERIAN INSULIN! Berikan infus cairan resusitasi yang mengandung KCl 20-40 mEq/jam hingga kadar Kalium serum naik di atas 3.3 mEq/L untuk mencegah aritmia ventrikel fatal dan henti jantung.",
        "contraindicatedDrugs": [
          "Inisiasi insulin saat Kalium < 3.3 mEq/L"
        ]
      }
    ],
    "monitoringParameters": [
      "Glukosa Darah Kapiler setiap 1 jam selama titrasi infus insulin",
      "Elektrolit Serum (Kalium, Natrium, Klorida), Bikarbonat, dan Analisis Gas Darah (AGD) setiap 2 - 4 jam",
      "Hitung Anion Gap Serum: [Na+] - ([Cl-] + [HCO3-]) setiap 4 jam (target <= 12 mEq/L)"
    ],
    "sourceGuidelines": "Petunjuk Praktis Pengelolaan Krisis Hiperglikemia pada Diabetes Melitus PERKENI / ADA Consensus Statement on Hyperglycemic Crises in Adults",
    "updatedYear": "2024",
    "keyClinicalAlert": "JANGAN PERNAH MEMBERIKAN INSULIN JIKA KALIUM SERUM < 3.3 mEq/L! Insulin akan mendorong kalium masuk ke dalam sel secara masif, memicu hipokalemia berat, aritmia fatal, dan henti jantung seketika."
  },
  {
    "id": "guideline-nonvariceal-ugib",
    "diseaseName": "Perdarahan Saluran Cerna Atas Non-Varises (Tukak Peptikum Berdarah)",
    "category": "Gastrointestinal",
    "organization": "PGI-PEGI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "K25.0",
    "indonesianKeywords": [
      "muntah darah hitam",
      "hematemesis",
      "melena",
      "tukak lambung berdarah",
      "omeprazole drip",
      "asam traneksamat lambung",
      "endoskopi hemostatik",
      "rockall score"
    ],
    "summary": "Perdarahan akut saluran pencernaan yang bersumber dari lesi mukosa proksimal dari ligamentum Treitz yang bukan disebabkan oleh varises esofagus/gaster (paling sering akibat Ulkus Lambung, Ulkus Duodenum, Gastritis Erosif akibat NSAID/Aspirin, atau Sindrom Mallory-Weiss), ditandai dengan muntah darah hitam/segar (hematemesis) dan buang air besar hitam pekat seperti petis (melena).",
    "targetGoals": [
      "Stabilisasi Hemodinamik Resusitasi Cairan Cepat (Target Hb >= 7.0 - 8.0 g/dL pada umum; >= 9.0 g/dL pada riwayat PJK aktif)",
      "Supresi Asam Lambung Agresif Mempertahankan pH Lambung > 6.0 untuk Mencegah Lisis Bekuan Fibrin Platelet",
      "Tindakan Hemostasis Endoskopi Saluran Cerna Dini (< 24 Jam) dan Eradikasi Bakteri Helicobacter pylori"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Omeprazole",
        "dosage": "Regimen Dosis Tinggi: Bolus 80 mg IV lambat (dalam 10-20 menit), dilanjutkan Drip Infus Kontinu 8 mg/jam (atau 40 mg IV bolus tiap 12 jam) selama 72 jam pertama pasca endoskopi hemostatik",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Inhibitor Pompa Proton (PPI) parenteral baku emas; menaikkan pH intralambung > 6.0 secara stabil untuk memicu agregasi trombosit dan stabilitas clot bekuan darah."
      },
      {
        "drugName": "Pantoprazole",
        "dosage": "Bolus 80 mg IV dilanjutkan Drip Infus Kontinu 8 mg/jam selama 72 jam",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Alternatif PPI parenteral dengan profil interaksi sitokrom P450 (CYP2C19) paling rendah."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Amoxicillin",
        "dosage": "Eradikasi H. pylori (diberikan setelah perdarahan akut berhenti): 1000 mg PO 2 kali sehari sesudah makan selama 14 hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Komponen triple therapy baku emas pembasmi H. pylori bersama Klaritromisin dan PPI dosis ganda."
      },
      {
        "drugName": "Clarithromycin",
        "dosage": "500 mg PO 2 kali sehari sesudah makan selama 14 hari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Makrolida bakterisidal eradikasi H. pylori."
      }
    ],
    "nonPharmacological": [
      "Pemasangan 2 Jalur Intravena Jarum Besar (16G atau 18G) dan resusitasi kristaloid Ringer Laktat cepat.",
      "Strategi Transfusi Darah Restriktif: Transfusi Packed Red Cells (PRC) diberikan jika Hb < 7.0 g/dL (target pasca transfusi Hb 7.0 - 9.0 g/dL). Transfusi terlalu agresif (target Hb > 10) terbukti meningkatkan risiko perdarahan ulang.",
      "Pemeriksaan Endoskopi Saluran Cerna Atas (EGD) Dini dalam 24 Jam Pertama (klasifikasi Forrest I-III untuk hemostasis injeksi adrenalin, kliping mekanik, atau koagulasi termal).",
      "Hentikan sementara semua obat pemicu ulserasi lambung: NSAID, Aspirin, Antikoagulan, dan Kortikosteroid."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Pasca Pasang Ring Jantung (PCI/Stent) yang Mengalami Perdarahan Tukak Lambung",
        "recommendation": "Konsultasikan bersama Dokter Spesialis Jantung; lanjutkan Aspirin dosis rendah (80-100 mg) setelah hemostasis endoskopi tercapai dan dampingi dengan terapi PPI jangka panjang untuk mencegah trombosis stent koroner.",
        "contraindicatedDrugs": [
          "Penghentian antiplatelet ganda jangka panjang tanpa koordinasi spesialis jantung"
        ]
      }
    ],
    "monitoringParameters": [
      "Tanda Vital (Tekanan Darah, Laju Nadi) dan Skor Stratifikasi Risiko Klinis (Glasgow-Blatchford Score / GBS dan Rockall Score)",
      "Kadar Hemoglobin dan Hematokrit serial setiap 6 - 12 jam selama fase akut",
      "Evaluasi tanda-tanda perdarahan ulang (aspirat NGT merah segar berulang, melena masif baru, hemodinamik tidak stabil)"
    ],
    "sourceGuidelines": "Konsensus Nasional Penatalaksanaan Perdarahan Saluran Cerna Atas Non-Varises Perkumpulan Gastroenterologi Indonesia (PGI-PEGI) / ESGE Non-Variceal Upper GI Bleeding Guidelines",
    "updatedYear": "2023",
    "keyClinicalAlert": "Gunakan strategi transfusi darah PRC RESTRIKTIF (hanya mulai transfusi jika Hb < 7 g/dL; target 7-9 g/dL). Transfusi terlalu agresif hingga Hb > 10 g/dL justru meningkatkan tekanan vaskular dan melipatgandakan risiko perdarahan ulang!"
  },
  {
    "id": "guideline-hiv-aids-tld",
    "diseaseName": "HIV / AIDS Dewasa & Terapi Antiretroviral Lini Pertama (TLD)",
    "category": "Anti-Infeksi",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "B20",
    "indonesianKeywords": [
      "hiv aids",
      "arv lini pertama",
      "tld",
      "tenofovir lamivudine dolutegravir",
      "cd4 rendah",
      "infeksi oportunistik",
      "viral load",
      "profilaksis kotrimoksazol"
    ],
    "summary": "Infeksi retrovirus Human Immunodeficiency Virus yang menyerang limfosit T CD4+, mengakibatkan penurunan daya tahan tubuh seluler progresif dan kerentanan fatal terhadap berbagai Infeksi Oportunistik (IO). Program Nasional Kemenkes RI: Terapi ARV Dini untuk Semua (Treat All) segera dimulai tanpa memandang hitung limfosit CD4.",
    "targetGoals": [
      "Supresi Replikasi Viral Load HIV Menjadi Tidak Terdeteksi (Undetectable Viral Load < 50 copies/mL dalam 6 Bulan Pertama)",
      "Pemulihan dan Pemeliharaan Hitung Limfosit CD4+ (Pencegahan Infeksi Oportunistik dan Kematian)",
      "Mencapai Konsep U=U (Undetectable = Untransmittable: Tidak Menularkan Virus ke Pasangan Seksual Maupun Vertikal)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "TLD (Tenofovir + Lamivudine + Dolutegravir)",
        "dosage": "1 tablet kombinasi dosis tetap FDC (TDF 300 mg + 3TC 300 mg + DTG 50 mg) per oral SEKALI SEHARI pada malam hari sebelum tidur dengan atau tanpa makanan",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Paduan ARV lini pertama baku emas pilihan utama rekomendasi PNPK Kemenkes RI & WHO. Memiliki barrier resistensi genetik sangat tinggi, supresi virologis cepat, dan efek samping minimal."
      },
      {
        "drugName": "Cotrimoxazole",
        "dosage": "Profilaksis Infeksi Oportunistik (TPK): 960 mg (1 tablet Forte) PO sekali sehari pada semua pasien dengan CD4 < 200 sel/mm³ atau Stadium Klinis 3-4",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Mencegah Pneumonia Pneumocystis jirovecii (PCP), Toksoplasmosis Ensefalopati serebri, dan infeksi bakterial berat."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "TLE (Tenofovir + Lamivudine + Efavirenz)",
        "dosage": "1 tablet FDC (TDF 300 mg + 3TC 300 mg + EFV 600 mg) PO sekali sehari malam sebelum tidur",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Paduan alternatif lini pertama berbasis NNRTI bila terdapat kontraindikasi terhadap Dolutegravir."
      }
    ],
    "nonPharmacological": [
      "Konseling Kepatuhan Menelan Obat (Adherence Counseling): Edukasi minum obat SEUMUR HIDUP pada jam yang sama setiap hari dengan tingkat kepatuhan minimal >= 95%.",
      "Skrining Koinfeksi Tuberkulosis (TB) dan Inisiasi Terapi Pencegahan TB (TPT: Isoniazid + Rifapentine 3HP atau Isoniazid 6H).",
      "Pencegahan Transmisi: Penggunaan kondom konsisten dan notifikasi pasangan seksual untuk tes sukarela (VCT).",
      "Dukungan Psikososial melalui Kelompok Dukungan Sebaya (KDS) Orang dengan HIV (ODHIV)."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien HIV dengan Koinfeksi Tuberkulosis (TB-HIV) yang Mendapat Rifampisin",
        "recommendation": "Dolutegravir mengalami percepatan metabolisme oleh Rifampisin; WAJIB MENAMBAHKAN DOSIS EKSTRA DOLUTEGRAVIR 50 mg PO (diberikan dengan jeda 12 jam dari dosis TLD malam) selama terapi Rifampisin berlangsung dan 2 minggu setelahnya.",
        "contraindicatedDrugs": [
          "Monoterapi ARV atau penghentian ARV karena sedang terapi TB"
        ]
      }
    ],
    "monitoringParameters": [
      "Pemeriksaan Jumlah Viral Load HIV RNA Plasma pada bulan ke-6 dan ke-12 setelah inisiasi ARV, lalu setiap 12 bulan",
      "Hitung Limfosit T CD4+ awal dan berkala",
      "Pemeriksaan Fungsi Ginjal (Kreatinin Serum / eGFR untuk keamanan Tenofovir) dan HBsAg (skrining koinfeksi Hepatitis B)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana HIV Kementerian Kesehatan RI / WHO Consolidated Guidelines on HIV Prevention, Testing, Treatment, Service Delivery and Monitoring",
    "updatedYear": "2024",
    "keyClinicalAlert": "KONSEP U=U (UNDETECTABLE = UNTRANSMITTABLE): Pasien HIV yang patuh meminum obat ARV TLD harian hingga jumlah virus tidak terdeteksi (< 50 copies/mL) TIDAK AKAN MENULARKAN HIV ke pasangan seksualnya!"
  },
  {
    "id": "guideline-hepatitis-b-c",
    "diseaseName": "Hepatitis B Kronis & Hepatitis C Terapi Antivirus DAA",
    "category": "Gastrointestinal",
    "organization": "PNPK Kemenkes RI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "B18.1",
    "indonesianKeywords": [
      "hepatitis b kronis",
      "hepatitis c",
      "hbsag positif",
      "sofosbuvir daclatasvir",
      "tenofovir hepar",
      "entecavir",
      "daa hepatitis",
      "fibroscan"
    ],
    "summary": "Infeksi virus hepatotropik kronis (> 6 bulan) yang menjadi penyebab utama sirosis hati dan karsinoma sel hati (kanker hati). Hepatitis B (HBV): Ditandai HBsAg persisten positif dengan DNA HBV terdeteksi dan peningkatan enzim ALT/fibrosis hepar. Hepatitis C (HCV): Ditandai Anti-HCV reaktif dengan RNA HCV terdeteksi.",
    "targetGoals": [
      "Hepatitis B: Supresi Replikasi DNA HBV Plasma Jangka Panjang Menjadi Tidak Terdeteksi (< 10-20 IU/mL) dan Normalisasi Enzim ALT (Mencegah Progresi ke Sirosis dan Karsinoma Sel Hati)",
      "Hepatitis C: Mencapai Respons Virologi Berkelanjutan (Sustained Virologic Response / SVR12 pada 12 Minggu Pasca Terapi Selesai) / KESEMBUHAN TOTAL BEBAS VIRUS > 95%"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Tenofovir Disoproxil Fumarate",
        "dosage": "Hepatitis B Kronis: 300 mg PO sekali sehari sesudah makan diminum jangka panjang",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Analog nukleotida poten baku emas; barrier resistensi genetik sangat tinggi (hampir 0% resistensi setelah 5 tahun terapi)."
      },
      {
        "drugName": "Sofosbuvir + Daclatasvir (Regimen DAA Pan-Genotip)",
        "dosage": "Hepatitis C: Sofosbuvir 400 mg + Daclatasvir 60 mg PO sekali sehari bersama makanan selama 12 MINGGU PENUH (pada pasien tanpa sirosis atau sirosis terkompensasi)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Direct-Acting Antiviral (DAA) pan-genotipik bebas interferon; tingkat kesembuhan virologi (cure rate) mencapai 95-98% dengan efek samping minimal."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Entecavir",
        "dosage": "Hepatitis B Kronis: 0.5 mg PO sekali sehari saat perut kosong (minimal 2 jam sebelum/sesudah makan)",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Pilihan utama terapi Hepatitis B pada pasien dengan gangguan ginjal (CrCl < 50 mL/min), osteoporosis, atau lansia."
      }
    ],
    "nonPharmacological": [
      "Pantang Total Mengonsumsi Alkohol dan zat hepatotoksik.",
      "Skrining Kanker Hati (Karsinoma Sel Hati / KSH): Lakukan USG Abdomen dan pemeriksaan Alfa-Fetoprotein (AFP) setiap 6 bulan pada semua pasien hepatitis B risiko tinggi dan sirosis.",
      "Vaksinasi Hepatitis B pada seluruh anggota keluarga serumah dan pasangan seksual yang memiliki HBsAg negatif dan Anti-HBs negatif.",
      "Edukasi transmisi darah dan cairan tubuh (hindari penggunaan alat cukur/sikat gigi bersama, jarum tato tidak steril)."
    ],
    "specialPopulations": [
      {
        "condition": "Ibu Hamil dengan Hepatitis B (HBsAg Positif dan DNA HBV Tinggi > 200.000 IU/mL)",
        "recommendation": "Berikan Tenofovir Disoproxil (TDF) 300 mg/hari mulai usia kehamilan 28 MINGGU hingga 1-3 bulan pasca salin untuk mencegah transmisi vertikal ke bayi, dan BERIKAN VAKSIN HEPATITIS B + IMMUNOGLOBULIN HEPATITIS B (HBIg) PADA BAYI DALAM KURUN WAKTU < 24 JAM SETELAH LAHIR.",
        "contraindicatedDrugs": [
          "Penundaan profilaksis HBIg pada bayi dari ibu HBsAg positif"
        ]
      }
    ],
    "monitoringParameters": [
      "Kuantitatif DNA HBV / RNA HCV PCR berkala",
      "Enzim Hati Serum (SGOT, SGPT) dan Profil Fungsi Hati setiap 3 - 6 bulan",
      "Evaluasi Derajat Kekakuan Jaringan Hati / Fibrosis (Transient Elastography / FibroScan atau APRI Score)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Hepatitis B & C Kementerian Kesehatan RI / Konsensus PGI-PEGI / WHO Guidelines for the Care and Treatment of Persons Diagnosed with Chronic Hepatitis C",
    "updatedYear": "2024",
    "keyClinicalAlert": "Hepatitis C kini DAPAT DISEMBUHKAN TOTAL dalam kurun waktu 12 MINGGU dengan obat DAA oral (Sofosbuvir + Daclatasvir) dengan tingkat kesembuhan > 95%! Program pengobatan DAA tersedia secara gratis di faskes program Kemenkes RI."
  },
  {
    "id": "guideline-stunting-malnutrition",
    "diseaseName": "Stunting & Gizi Buruk pada Balita (Severe Acute Malnutrition / SAM)",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "E43",
    "indonesianKeywords": [
      "stunting",
      "gizi buruk",
      "anak pendek",
      "marasmus",
      "kwashiorkor",
      "formula f75",
      "f100 rutf",
      "zink gizi buruk",
      "10 langkah tatalaksana gizi"
    ],
    "summary": "Gangguan pertumbuhan dan perkembangan balita akibat kekurangan asupan gizi kronis dan infeksi berulang, ditandai nilai Z-score Panjang/Tinggi Badan menurut Usia (PB/U atau TB/U) < -2 SD (Stunting) atau Z-score Berat Badan menurut Panjang/Tinggi Badan (BB/PB) < -3 SD dan/atau Edema Nutrisional Bilateral (Gizi Buruk Marasmus / Kwashiorkor).",
    "targetGoals": [
      "Penyelamatan Nyawa Balita Mengikuti Protokol 10 Langkah Tatalaksana Gizi Buruk WHO & Kemenkes RI",
      "Fase Stabilisasi: Koreksi dan Pencegahan Hipoglikemia (< 54 mg/dL), Hipotermia (< 36.5°C), dan Dehidrasi Berat",
      "Fase Rehabilitasi: Kejar Tumbuh Cepat (Catch-Up Growth) dengan Target Kenaikan Berat Badan >= 10 gram/kgBB/hari"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Formula F-75 (Fase Stabilisasi Hari 1-7)",
        "dosage": "130 mL/kgBB/hari (atau 100 mL/kgBB/hari jika ada edema derajat 3) dibagi dalam 8 hingga 12 kali pemberian porsi kecil sering (tiap 2-3 jam) siang dan malam",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Formula terapeutik khusus rendah protein dan natrium (75 kkal dan 0.9 g protein per 100 mL); memulihkan fungsi homeostasis organ tanpa membebani jantung dan ginjal."
      },
      {
        "drugName": "Formula F-100 / RUTF (Fase Transisi & Rehabilitasi)",
        "dosage": "150 - 220 kkal/kgBB/hari dan 3 - 5 gram protein/kgBB/hari dalam bentuk sirup F-100 atau Ready-to-Use Therapeutic Food (RUTF pasta kacang bergizi tinggi)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Formula padat energi untuk kejar tumbuh pesat setelah nafsu makan anak pulih dan edema mereda."
      },
      {
        "drugName": "Zinc Sulfate Dispersibel",
        "dosage": "10 mg/hari (usia < 6 bulan) atau 20 mg/hari (usia >= 6 bulan) dilarutkan dalam air selama 14 HARI PENUH",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Mineral mikro esensial untuk regenerasi mukosa usus, perbaikan sistem imun, dan stimulasi nafsu makan."
      },
      {
        "drugName": "Vitamin A Dosis Tinggi",
        "dosage": "Usia < 6 bln: 50.000 IU; 6-11 bln: 100.000 IU; 1-5 thn: 200.000 IU PO diberikan pada Hari ke-1, Hari ke-2, dan Hari ke-15",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Mencegah kebutaan xeroftalmia dan memperbaiki integritas epitel mukosa pernapasan/pencernaan."
      },
      {
        "drugName": "Amoxicillin",
        "dosage": "Dosis empiris profilaksis infeksi tersembunyi: 50 mg/kgBB/hari PO terbagi 3 dosis selama 5 hari (tanpa komplikasi berat)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Semua anak gizi buruk mengalami defisiensi imun berat dan bakteremia tersembunyi; wajib antibiotik empiris."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "ReSoMal (Rehydration Solution for Malnutrition)",
        "dosage": "5 mL/kgBB tiap 30 menit selama 2 jam pertama oral/NGT, lalu 5-10 mL/kg/jam berselang dengan F-75",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "Oralit khusus gizi buruk rendah natrium tinggi kalium/magnesium; HINDARI ORALIT BIASA KARENA NATRIUM TINGGI MEMICU GAGAL JANTUNG KONGESTIF."
      }
    ],
    "nonPharmacological": [
      "Pemberian Makanan Pendamping ASI (MPASI) Kaya Protein Hewani (Telur, Ikan, Daging Ayam/Sapi, Susu) secara konsisten pada balita stunting.",
      "Stimulasi Sensorik dan Emosional Tumbuh Kembang (Play Therapy / Terapi Bermain) untuk mencegah retardasi mental kognitif permanen.",
      "Penerapan Pola Hidup Bersih dan Sehat (PHBS): Akses air minum bersih, jamban sehat, dan cuci tangan pakai sabun.",
      "Pemantauan Pertumbuhan Bulanan di Posyandu menggunakan kurva pertumbuhan WHO (KMS digital)."
    ],
    "specialPopulations": [
      {
        "condition": "Balita Gizi Buruk dengan Tanda Dehidrasi Akut",
        "recommendation": "HINDARI RESUSITASI CAIRAN INTRAVENA CEPAT KECUALI DALAM KONDISI SYOK BERAT! Anak gizi buruk memiliki massa miokardium atrofi tipis; beban cairan IV berlebih memicu edema paru akut dan kematian seketika. Gunakan cairan ReSoMal per oral / NGT.",
        "contraindicatedDrugs": [
          "Infus cairan IV agresif tanpa tanda syok terbukti",
          "Oralit standar WHO tanpa modifikasi (tinggi natrium)"
        ]
      }
    ],
    "monitoringParameters": [
      "Penimbangan Berat Badan Harian dengan timbangan digital presisi sebelum makan pagi",
      "Evaluasi Kenaikan Berat Badan Mingguan: Buruk (< 5 g/kg/hari), Sedang (5-10 g/kg/hari), Baik (> 10 g/kg/hari)",
      "Pengukuran Lingkar Lengan Atas (LiLA) dan Pemantauan Berkurangnya Derajat Edema"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Stunting Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/1928/2022) / Pedoman Pelayanan Medis IDAI Asuhan Nutrisi Pediatrik",
    "updatedYear": "2024",
    "keyClinicalAlert": "JANGAN MEMBERIKAN CAIRAN INFUS CEPAT DAN ORALIT STANDAR BIASA PADA ANAK GIZI BURUK! Jantung anak gizi buruk mengalami atrofi; natrium tinggi dan beban cairan cepat memicu GAGAL JANTUNG AKUT DAN EDEMA PARU FATAL. Gunakan ReSoMal per oral/pipa NGT."
  },
  {
    "id": "guideline-thalassemia-pediatric",
    "diseaseName": "Thalasemia Mayor pada Anak & Terapi Kelasi Besi",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "D56.1",
    "indonesianKeywords": [
      "thalasemia mayor",
      "transfusi darah rutin anak",
      "kelasi besi",
      "deferasirox",
      "deferiprone",
      "desferal",
      "feritin tinggi",
      "facies cooley"
    ],
    "summary": "Penyakit anemia hemolitik herediter autosomal resesif akibat mutasi gen pembentukan rantai beta-globin hemoglobin, mengakibatkan eritropoiesis inefektif berat, anemia kronis bergantung transfusi seumur hidup (Transfusion-Dependent Thalassemia / TDT), pembesaran limpa dan hati (hepatosplenomegali), perubahan tulang wajah khas (facies cooley), serta risiko penumpukan besi berlebih di organ vital (Hemosiderosis).",
    "targetGoals": [
      "Mempertahankan Kadar Hemoglobin Pre-Transfusi 9.5 - 10.5 g/dL untuk Menjamin Oksigenasi Jaringan dan Pertumbuhan Fisik Normal",
      "Mengurangi Beban Akumulasi Zat Besi Toksik dalam Tubuh (Target Kadar Feritin Serum < 1000 - 1500 ng/mL)",
      "Mencegah Kerusakan Organ Sekunder Akibat Kelebihan Besi (Kardiomiopati Aritmia, Sirosis Hepar, Diabetes, dan Gagal Pubertas)"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Packed Red Cells (PRC) Leukodepleted",
        "dosage": "Transfusi Darah Rutin: 10 - 15 mL/kgBB per siklus (diberikan tiap 3-4 minggu) dengan kecepatan transfusi 2 - 3 mL/kgBB/jam",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Darah PRC yang telah disaring leukositnya (leukodepleted / leukoreduced) untuk mencegah reaksi transfusi febris non-hemolitik dan aloimunisasi."
      },
      {
        "drugName": "Deferasirox",
        "dosage": "Kelasi Besi Oral Lini Pertama: 20 - 40 mg/kgBB PO sekali sehari diminum saat perut kosong 30 menit sebelum makan (larutkan tablet dispersibel dalam segelas air atau jus jeruk)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 2/3",
        "notes": "Pengikat besi tridentat oral harian baku emas; kepatuhan sangat tinggi dibanding pompa injeksi desferal. Dimulai saat feritin serum > 1000 ng/mL."
      },
      {
        "drugName": "Folic Acid",
        "dosage": "1 - 5 mg PO sekali sehari",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Suplementasi koenzim untuk mendukung aktivitas eritropoiesis hepar/limpa yang hiperaktif."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Deferiprone",
        "dosage": "75 - 100 mg/kgBB/hari PO terbagi dalam 3 dosis sesudah makan",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Kelador besi bidentat oral dengan kemampuan penetrasi kelasi besi miokardium jantung terbaik. Wajib monitor neutrofil darah (risiko agranulositosis)."
      },
      {
        "drugName": "Deferoxamine (Desferal)",
        "dosage": "20 - 40 mg/kgBB/hari via infus subkutan lambat menggunakan syringe pump selama 8-12 jam semalam, 5-7 malam per minggu",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Kelador parenteral klasik; digunakan bila timbul intoleransi atau kegagalan kelasi oral."
      }
    ],
    "nonPharmacological": [
      "Pola Makan Rendah Besi: Hindari makanan yang difortifikasi zat besi (sereal besi tinggi, suplemen multivitamin mengandung zat besi, daging merah berlebih).",
      "Minum Teh Hijau / Teh Hitam saat makan (polifenol dan tanin dalam teh menghambat penyerapan zat besi non-heme di saluran pencernaan).",
      "Skrining Thalasemia Pra-Nikah (Premarital Screening): Pemeriksaan Darah Lengkap (MCV/MCH rendah) dan Analisis Hemoglobin (Hb Elektroforesis / HPLC) pada calon pengantin untuk mencegah kelahiran anak thalasemia mayor baru.",
      "Dukungan Psikososial dan Komunitas Persatuan Orang Tua Penderita Thalasemia Indonesia (POPTI)."
    ],
    "specialPopulations": [
      {
        "condition": "Pasien Thalasemia dengan Beban Besi Tinggi yang Mendapat Suplemen Vitamin C",
        "recommendation": "Vitamin C meningkatkan ketersediaan besi bebas terionisasi untuk kelasi desferal, TETAPI DILARANG DIBERIKAN MELEBIHI 100-200 mg/hari atau diberikan pada pasien dengan gagal jantung karena memicu aritmia ventrikel fatal.",
        "contraindicatedDrugs": [
          "Suplemen Zat Besi (Ferrous Sulfate/Fumarate)",
          "Vitamin C dosis tinggi pada kardiomiopati besi"
        ]
      }
    ],
    "monitoringParameters": [
      "Kadar Hemoglobin Pre-Transfusi dan Post-Transfusi pada setiap siklus kunjungan",
      "Kadar Feritin Serum setiap 3 - 6 bulan untuk titrasi penyesuaian dosis kelasi besi",
      "Pemeriksaan MRI T2* Jantung dan Hati setiap 1-2 tahun untuk evaluasi hemosiderosis miokard",
      "Evaluasi Tumbuh Kembang: Kurva Tinggi Badan, Indeks Maturasi Seksual (Tanner Staging), dan Skrining Endokrin (Gula Darah, Fungsi Tiroid, Kalsium)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Thalasemia Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/1/2018) / Panduan Praktis Klinis IDAI / Thalassaemia International Federation (TIF) Guidelines",
    "updatedYear": "2024",
    "keyClinicalAlert": "DILARANG KERAS MEMBERIKAN SUPLEMEN ZAT BESI ATAU MULTIVITAMIN PENAMBAH DARAH pada pasien Thalasemia! Pasien thalasemia mengalami kelebihan zat besi berat akibat transfusi; penambahan zat besi mempercepat kerusakan fatal jantung dan hati."
  },
  {
    "id": "guideline-t1dm-pediatric",
    "diseaseName": "Diabetes Melitus Tipe 1 pada Anak & Remaja",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "E10.9",
    "indonesianKeywords": [
      "dm tipe 1 anak",
      "diabetes anak",
      "insulin basal bolus anak",
      "actrapid novorapid anak",
      "lantus tresiba anak",
      "gula darah anak tinggi",
      "hipoglikemia anak"
    ],
    "summary": "Penyakit metabolik autoimun kronis yang disebabkan oleh destruksi autoimun sel beta pankreas penghasil insulin, mengakibatkan defisiensi insulin absolut seumur hidup. Ditandai oleh gejala kardinal 4P: Poliuria (sering kencing/mengompol kembali), Polidipsia (haus berlebih), Polifagia (banyak makan), dan Penurunan Berat Badan Cepat, serta risiko tinggi komplikasi fatal Ketoasidosis Diabetik (KAD).",
    "targetGoals": [
      "Target Kadar HbA1c < 7.0% (atau < 7.5%) Tanpa Menimbulkan Episode Hipoglikemia Berat",
      "Rentang Target Glukosa Darah Harian: Pre-Prandial 70 - 130 mg/dL dan Post-Prandial 90 - 180 mg/dL (Waktu Tidur 100 - 140 mg/dL)",
      "Menjamin Pertumbuhan Fisik Linier Normal, Kematangan Pubertas Sesuai Usia, dan Kesejahteraan Psikososial Anak"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Insulin Basal-Bolus Intensif (MDI - Multiple Daily Injections)",
        "dosage": "Total Dosis Harian (TDD): Awal 0.5 - 0.75 Unit/kgBB/hari (Fase Honeymoon 0.2-0.5 U/kg; Pubertas 1.0-1.5 U/kg/hari).\n• Insulin Basal (Glargine / Degludec): 30 - 45% dari TDD diinjeksi subkutan SEKALI SEHARI pada jam yang sama malam hari.\n• Insulin Prandial Kerja Cepat (Aspart / Lispro): 55 - 70% dari TDD dibagi 3 kali injeksi subkutan tepat 5-15 menit SEBELUM makan",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Regimen terapi baku emas mutlak rekomendasi IDAI & ISPAD; meniru profil fisiologis sekresi insulin alami tubuh."
      },
      {
        "drugName": "Glukosa Oral / Tablet Dextrose",
        "dosage": "Pertolongan Pertama Hipoglikemia Ringan-Sedang (Gula Darah < 70 mg/dL): Aturan \"Rule of 15\" — Berikan 15 gram karbohidrat cepat serap (1/2 gelas jus buah manis atau 3-4 sendok teh gula pasir dilarutkan air), tunggu 15 menit, lalu cek ulang gula darah",
        "role": "Acute Rescue",
        "fornasTier": "Faskes 1",
        "notes": "Wajib selalu dibawa oleh anak dan orang tua ke sekolah dan tempat beraktivitas."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Glucagon Injeksi",
        "dosage": "Hipoglikemia Berat dengan Penurunan Kesadaran / Kejang: 0.5 mg (< 25 kg) atau 1.0 mg (>= 25 kg) IM/SC",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Hormon penyelamat gawat darurat hipoglikemia berat jika anak tidak sadar / tidak bisa menelan."
      }
    ],
    "nonPharmacological": [
      "Edukasi Perhitungan Karbohidrat (Carbohydrate Counting): Mencocokkan dosis insulin bolus prandial dengan jumlah gram karbohidrat yang dikonsumsi (Rasio Insulin:Karbohidrat / ICR).",
      "Pemantauan Glukosa Darah Mandiri (Self-Monitoring of Blood Glucose / SMBG): Minimal 4-6 kali per hari (sebelum makan, 2 jam sesudah makan, sebelum tidur, dan jam 03.00 dini hari) atau menggunakan Continuous Glucose Monitoring (CGM).",
      "Penyesuaian Insulin saat Olahraga: Konsumsi camilan karbohidrat ekstra 15-30 gram sebelum aktivitas fisik intensif untuk mencegah hipoglikemia saat dan setelah olahraga.",
      "Manajemen Hari Sakit (Sick Day Rules): JANGAN PERNAH MENGHENTIKAN INSULIN BASAL saat anak sakit/demam karena kebutuhan insulin justru meningkat."
    ],
    "specialPopulations": [
      {
        "condition": "Anak dengan Fenomena Dawn atau Efek Somogyi (Gula Darah Pagi Tinggi)",
        "recommendation": "Periksa glukosa darah jam 03.00 dini hari: Jika jam 03.00 rendah (<70 mg/dL) = Efek Somogyi (turunkan insulin basal malam); Jika jam 03.00 tinggi = Fenomena Dawn (naikkan insulin basal malam).",
        "contraindicatedDrugs": [
          "Obat antidiabetes oral sulfonilurea (Glibenklamid/Glimepirid) - TIDAK EFEKTIF DAN KONTRAINDIKASI PADA DM TIPE 1"
        ]
      }
    ],
    "monitoringParameters": [
      "Pemeriksaan HbA1c setiap 3 bulan sekali di laboratorium",
      "Buku Catatan Harian Glukosa Darah (Logbook SMBG) dan Evaluasi Pola Hipoglikemia",
      "Skrining Komplikasi Jangka Panjang (Mulai 2-5 tahun pasca diagnosis atau usia >= 11 tahun): Mikroalbuminuria urin berkala, Pemeriksaan Mata Funduskopi, Profil Lipid, dan Skrining Tiroid Autoimun (TSH/FT4)"
    ],
    "sourceGuidelines": "Konsensus Nasional Pengelolaan Diabetes Melitus Tipe 1 Ikatan Dokter Anak Indonesia (IDAI) / ISPAD Clinical Practice Consensus Guidelines for Type 1 Diabetes",
    "updatedYear": "2024",
    "keyClinicalAlert": "JANGAN PERNAH MENGHENTIKAN SUNTIKAN INSULIN SAAT ANAK SEDANG SAKIT/DEMAM/MUNTAH (SICK DAY RULES)! Saat sakit, stres metabolik meningkatkan hormon kontra-regulator sehingga kebutuhan insulin tetap ada. Menghentikan insulin memicu KETOASIDOSIS DIABETIK (KAD) fatal dalam < 24 jam!"
  },
  {
    "id": "guideline-prom-pprom",
    "diseaseName": "Ketuban Pecah Dini (KPD / PROM & PPROM)",
    "category": "Obstetri & Ginekologi",
    "organization": "POGI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "O42.0",
    "indonesianKeywords": [
      "ketuban pecah dini",
      "kpd",
      "pprom",
      "air ketuban merembes",
      "ampicillin erythromycin kpd",
      "dexamethasone pematangan paru",
      "korioamnionitis"
    ],
    "summary": "Pecahnya selaput ketuban sebelum adanya tanda-tanda inpartu/persalinan. Terbagi atas KPD Aterm (PROM / usia kehamilan >= 37 minggu) dan KPD Preterm (PPROM / Preterm Premature Rupture of Membranes pada usia kehamilan < 37 minggu). Merupakan penyebab utama persalinan prematur dan komplikasi infeksi intrauterin asenden (korioamnionitis maternal dan sepsis neonatal).",
    "targetGoals": [
      "Memperpanjang Masa Latensi Kehamilan pada PPROM (< 34 Minggu) untuk Memberi Waktu Pematangan Paru Janin",
      "Pencegahan Infeksi Intrauterin Asenden (Korioamnionitis) dan Sepsis Neonatal Dini",
      "Pencegahan Sindrom Distres Pernapasan (RDS), Perdarahan Intraventrikular (IVH), dan Enterokolitis Nekrotikans pada Bayi Prematur"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Ampicillin + Erythromycin (Regimen Antibiotik Latensi POGI / ACOG)",
        "dosage": "Fase Intravena (48 Jam Pertama): Ampicillin 2 gram IV tiap 6 jam + Erythromycin 250 mg IV tiap 6 jam selama 48 jam.\nFase Oral (5 Hari Berikutnya): Amoxicillin 500 mg PO tiap 8 jam + Erythromycin 333 mg (atau 500 mg) PO tiap 8 jam selama 5 hari (Total Durasi Terapi 7 Hari Penuh)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Regimen antibiotik baku emas terbukti memperpanjang masa latensi kehamilan dan menurunkan mortalitas sepsis neonatal serta morbiditas RDS."
      },
      {
        "drugName": "Dexamethasone",
        "dosage": "Kortikosteroid Pematangan Paru Janin (Usia Gestasi 24 - 34 Minggu): 6 mg IM tiap 12 jam (total 4 dosis dalam kurun waktu 48 jam)",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Menstimulasi produksi surfaktan tipe II paru janin; menurunkan insidensi Respiratory Distress Syndrome (RDS) dan mortalitas perinatal hingga 50%."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Nifedipine",
        "dosage": "Tokolitik Jangka Pendek (Hanya untuk Memberi Waktu 48 Jam Kortikosteroid Bekerja): Awal 20 mg PO, dilanjutkan 10 - 20 mg tiap 6-8 jam (maksimal 48 jam)",
        "role": "Alternative",
        "fornasTier": "Faskes 1",
        "notes": "CCB tokolitik; merelaksasikan kontraksi miometrium preterm sementara. HINDARI PENGGUNAAN TOKOLITIK JANGKA PANJANG > 48 JAM."
      },
      {
        "drugName": "Magnesium Sulfate",
        "dosage": "Neuroproteksi Janin (Usia Gestasi < 32 Minggu): Loading dose 4 gram IV dalam 20-30 menit dilanjutkan 1 g/jam IV selama 12-24 jam menjelang persalinan prematur iminen",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Menurunkan risiko Cerebral Palsy (kelumpuhan otak) pada bayi prematur ekstrem."
      }
    ],
    "nonPharmacological": [
      "Konfirmasi Diagnosis KPD: Pemeriksaan spekulum steril inspekulo (melihat genangan cairan ketuban di forniks posterior / pooling), Uji Nitrazin (kertas lakmus merah berubah menjadi biru karena pH basa ketuban 7.0 - 7.5), dan Uji Pakis (Ferning Test mikroskopis).",
      "HINDARI Pemeriksaan Dalam Vagina (Digital Vaginal Toucher / VT) berulang kecuali pasien sudah inpartu aktif fase aktif, karena VT berulang melipatgandakan risiko infeksi korioamnionitis asenden.",
      "Tirah baring dan observasi tanda-tanda korioamnionitis (Demam maternal >= 38.0°C, takikardia maternal > 100 bpm, takikardia janin > 160 bpm, nyeri tekan uterus, cairan ketuban berbau busuk). Jika timbul korioamnionitis, TERMINASI PERSALINAN SEGERA TANPA MEMANDANG USIA GESTASI."
    ],
    "specialPopulations": [
      {
        "condition": "KPD Aterm (Usia Kehamilan >= 37 Minggu)",
        "recommendation": "Jika tidak terjadi his persalinan spontan dalam 6-12 jam pasca pecah ketuban, LAKUKAN INDUKSI PERSALINAN (dengan Oksitosin IV infus drip) untuk menurunkan risiko infeksi maternal dan neonatal.",
        "contraindicatedDrugs": [
          "Amoxicillin-Clavulanate (Co-amoxiclav) pada KPD preterm - memicu Enterokolitis Nekrotikans / NEC pada bayi"
        ]
      }
    ],
    "monitoringParameters": [
      "Tanda Vital Maternal (Suhu Tubuh setiap 4 jam, Denyut Nadi)",
      "Denyut Jantung Janin (Kardiotokografi / CTG kontinu atau Doppler)",
      "Hitung Darah Lengkap (skrining Leukositosis maternal > 15.000 / shift to the left) dan USG Volume Cairan Ketuban (AFI)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Ketuban Pecah Dini Perkumpulan Obstetri dan Ginekologi Indonesia (POGI) / ACOG Practice Bulletin on Prelabor Rupture of Membranes",
    "updatedYear": "2023",
    "keyClinicalAlert": "HINDARI PENGGUNAAN ANTIBIOTIK AMOXICILLIN-CLAVULANATE (CO-AMOXICLAV) PADA KPD PRETERM karena terbukti secara klinis memicu komplikasi fatal Enterokolitis Nekrotikans (NEC / pembusukan usus bayi baru lahir)! Gunakan kombinasi Ampicillin + Erythromycin."
  },
  {
    "id": "guideline-neonatal-hyperbilirubinemia",
    "diseaseName": "Hiperbilirubinemia & Ikterus Neonatorum pada Bayi Baru Lahir",
    "category": "Pediatri (Kesehatan Anak)",
    "organization": "IDAI",
    "fornasTier": "Semua Tingkat Faskes",
    "icd10": "P59.9",
    "indonesianKeywords": [
      "bayi kuning",
      "ikterus neonatorum",
      "bilirubin tinggi bayi",
      "fototerapi blue light",
      "transfusi tukar bayi",
      "kernikterus",
      "inkompatibilitas abo rhesus"
    ],
    "summary": "Peningkatan konsentrasi kadar Bilirubin Serum Total (TSB) pada bayi baru lahir yang termanifestasi secara klinis sebagai pewarnaan kuning pada sklera mata, kulit, dan membran mukosa (kemerahan visual Kramer I hingga V). Hiperbilirubinemia indirek tak terkonjugasi patologis berisiko menembus sawar darah otak dan memicu Ensefalopati Bilirubin Akut (ABE) serta kerusakan otak permanen (Kernikterus).",
    "targetGoals": [
      "Menurunkan Kadar Bilirubin Serum Total (TSB) di Bawah Batas Kurva Ambang Batas Fototerapi Nomogram Bhutani / AAP",
      "Mencegah Terjadinya Kerusakan Neurologis Ensefalopati Bilirubin Akut (Letargis, Hipotonia, Tangisan Melengking / High-Pitched Cry, Opistotonus) dan Kernikterus Permanen",
      "Mempertahankan Asupan Cairan dan Nutrisi ASI Eksklusif yang Adekuat"
    ],
    "firstLineTherapy": [
      {
        "drugName": "Fototerapi Intensif (Blue-Green Light)",
        "dosage": "Penyinaran lampu fototerapi intensif (panjang gelombang 460 - 490 nm, iradians minimal 30 mcW/cm²/nm) pada seluruh luas permukaan tubuh bayi telanjang (hanya memakai popok dan penutup mata khusus) secara kontinu",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Baku emas terapi non-invasif; memicu reaksi fotoisomerisasi struktural mengubah 4Z,15Z-bilirubin menjadi lumirubin larut air yang diekskresikan via empedu dan urin tanpa perlu konjugasi hepar."
      },
      {
        "drugName": "ASI Eksklusif / Nutrisi Enteral Adekuat",
        "dosage": "Pemberian ASI atau formula 8 - 12 kali per hari (tiap 2-3 jam) untuk meningkatkan motilitas usus dan mempercepat pembuangan bilirubin via mekonium/feses",
        "role": "Lini Pertama",
        "fornasTier": "Faskes 1",
        "notes": "Menurunkan resirkulasi enterohepatik bilirubin tak terkonjugasi di lumen usus."
      }
    ],
    "secondLineTherapy": [
      {
        "drugName": "Transfusi Tukar (Exchange Transfusion)",
        "dosage": "Transfusi ganti darah volume ganda (Double-Volume Exchange Transfusion = 2 x 80 mL/kgBB = 160 mL/kgBB) via kateter vena umbilikalis",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Tindakan penyelamatan darurat jika kadar TSB mencapai garis ambang transfusi tukar atau timbul tanda ensefalopati bilirubin akut fase awal."
      },
      {
        "drugName": "Intravenous Immunoglobulin (IVIg)",
        "dosage": "0.5 - 1.0 gram/kgBB IV infus pelan dalam 2 jam (dapat diulang setelah 12 jam jika perlu)",
        "role": "Alternative",
        "fornasTier": "Faskes 2/3",
        "notes": "Diindikasikan pada penyakit hemolitik autoimun isoimunisasi (Inkompatibilitas Golongan Darah ABO atau Inkompatibilitas Rhesus) untuk memblokade reseptor Fc RES dan mencegah hemolisis eritrosit masif."
      }
    ],
    "nonPharmacological": [
      "Pemeriksaan Visual Derajat Ikterus Kramer (Kramer 1: Kepala/leher ~5 mg/dL; Kramer 2: Dada/pusat ~9 mg/dL; Kramer 3: Paha ~11 mg/dL; Kramer 4: Lengan/betis ~12 mg/dL; Kramer 5: Telapak tangan & kaki > 15 mg/dL).",
      "Pemeriksaan Kadar Bilirubin Transkutan (TcB) atau Bilirubin Serum Total (TSB) laboratorium.",
      "Perlindungan Mata dan Genitalia: Pasang penutup mata kedap cahaya (eye patch) selama fototerapi dan pastikan posisi bayi diubah setiap 2-3 jam.",
      "Pemantauan Suhu Tubuh bayi setiap 3-4 jam (cegah hipertermia atau hipotermia) dan hidrasi cairan."
    ],
    "specialPopulations": [
      {
        "condition": "Bayi dengan Ikterus Timbul dalam Kurun Waktu < 24 Jam Pertama Kehidupan",
        "recommendation": "Semua ikterus pada usia < 24 jam adalah IKTERUS PATOLOGIS BERAT (kebanyakan akibat inkompatibilitas ABO/Rhesus atau defisiensi enzim G6PD); WAJIB SEGERA RUJUK KE RS untuk pemeriksaan TSB, Coombs Test, Golongan Darah Ibu-Bayi, dan FOTOTERAPI INTENSIF SEGERA.",
        "contraindicatedDrugs": [
          "Menjemur bayi di bawah sinar matahari pagi sebagai pengganti fototerapi pada ikterus patologis"
        ]
      }
    ],
    "monitoringParameters": [
      "Kadar Bilirubin Serum Total (TSB) setiap 12 - 24 jam selama fototerapi (hentikan jika TSB turun < 13-14 mg/dL atau 2-3 mg/dL di bawah garis ambang)",
      "Evaluasi Rebound Bilirubin 24 jam pasca penghentian fototerapi",
      "Skrining Status Hidrasi (Penurunan Berat Badan harian, Frekuensi Buang Air Kecil minimal 6 kali/hari, Karakteristik Feses)"
    ],
    "sourceGuidelines": "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Hiperbilirubinemia Kementerian Kesehatan RI (KMK No. HK.01.07/MENKES/240/2019) / Panduan Praktis Klinis IDAI / AAP Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant",
    "updatedYear": "2024",
    "keyClinicalAlert": "Ikterus yang muncul dalam waktu < 24 JAM PERTAMA setelah lahir adalah GAWAT DARURAT PATOLOGIS! Menjemur bayi di bawah sinar matahari pagi BUKAN terapi yang tepat untuk hiperbilirubinemia dan tidak dapat menggantikan Fototerapi Medis Rumah Sakit."
  }
];
