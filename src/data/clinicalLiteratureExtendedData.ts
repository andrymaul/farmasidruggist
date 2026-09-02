import { LiteratureSource } from './clinicalLiteratureData';

export const CLINICAL_LITERATURE_EXTENDED_DATABASE: LiteratureSource[] = [
  // =========================================================================
  // 1. KONSENSUS GASTROENTEROLOGI & HEPAR (BAVENO VII, EASL, AASLD)
  // =========================================================================
  {
    id: 'lit-baveno-vii-portal-hypertension',
    title: 'Baveno VII Consensus: Personalized Care in Portal Hypertension',
    institution: 'Baveno Cooperation & European Association for the Study of the Liver (EASL)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Baveno VII Guidelines 2022 - 2024',
    releaseYear: '2022 / 2024',
    lastUpdated: 'November 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Konsensus baku emas internasional untuk diagnosis non-invasif hipertensi portal, profilaksis perdarahan varises esofagus, serta pedoman penggunaan beta-blocker non-selektif (Carvedilol & Propranolol) pada pasien sirosis hati kompensata dan dekompensata.',
    keyTopics: [
      'Terapi Lini Pertama Non-Selective Beta-Blocker (NSBB): Carvedilol (target titrasi 12.5 mg/hari) vs Propranolol',
      'Pencegahan Primer & Sekunder Perdarahan Varises Gastroesofageal',
      'Kriteria Penghentian Sementara atau Penurunan Dosis NSBB saat Terjadi Hipotensi Refrakter (MAP < 65 mmHg) atau Peritonitis Bakterial Spontan (SBP)',
      'Stratifikasi Risiko Dekompensasi Klinis Berbasis Transient Elastography (FibroScan)'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Dosis Disfungsi Hepar & Sirosis',
        description: 'Panduan batas titrasi Carvedilol dan Propranolol pada sirosis Child-Pugh A, B, C.'
      },
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Algoritma tata laksana hipertensi portal dan perdarahan saluran cerna atas.'
      }
    ],
    officialUrl: 'https://easl.eu/publication/baveno-vii-consensus-portal-hypertension/',
    officialUrlLabel: 'Portal Resmi Konsensus Baveno VII',
    citation: 'de Franchis R, Bosch J, Garcia-Tsao G, Reiberger T, Ripoll C; Baveno VII Faculty. Baveno VII - Renewing consensus in portal hypertension. J Hepatol. 2022;76(4):959-974.',
    badgeColor: 'bg-teal-700 text-white'
  },
  {
    id: 'lit-easl-decompensated-cirrhosis',
    title: 'EASL Clinical Practice Guidelines: Management of Decompensated Cirrhosis',
    institution: 'European Association for the Study of the Liver (EASL)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'EASL Guidelines on Cirrhosis',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Desember 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman komprehensif Eropa untuk tata laksana komplikasi sirosis dekompensata mencakup asites refrakter, peritonitis bakterial spontan (SBP), sindrom hepatorenal (HRS-AKI), dan ensefalopati hepatik, termasuk penyesuaian dosis obat dan kontraindikasi farmakoterapi.',
    keyTopics: [
      'Protokol Terapi Diuretik Asites Sirosis: Spironolakton & Furosemid dengan Rasio Baku 100 mg : 40 mg',
      'Pemberian Human Albumin 20-25% Pasca-Parasentesis Volume Besar (>5 L: 8 g albumin per liter asites yang diaspirasi)',
      'Terapi Lini Pertama Sindrom Hepatorenal (HRS-AKI): Kombinasi Terlipressin Intravena & Albumin',
      'KONTRAINDIKASI MUTLAK NSAID, ACEi/ARB, dan Aminoglikosida pada Pasien Sirosis Asites Dekompensata'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Dosis Disfungsi Hepar & Sirosis',
        description: 'Kalkulasi dosis diuretik rasio 100:40 dan protokol albumin pasca-parasentesis asites.'
      },
      {
        tabId: 'interactions',
        featureName: 'Kontraindikasi Obat-Penyakit (DDSI)',
        description: 'Peringatan bahaya NSAID memicu gagal ginjal akut HRS pada sirosis.'
      }
    ],
    officialUrl: 'https://easl.eu/guideline/management-of-decompensated-cirrhosis/',
    officialUrlLabel: 'Portal Pedoman Resmi EASL',
    citation: 'European Association for the Study of the Liver. EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol. 2018;69(2):406-460 (Updated 2024).',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'lit-aasld-hepatic-encephalopathy',
    title: 'AASLD Practice Guidance: Hepatic Encephalopathy in Chronic Liver Disease',
    institution: 'American Association for the Study of Liver Diseases (AASLD)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'AASLD Practice Guidance 2023/2024',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Oktober 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Panduan tata laksana ensefalopati hepatik (overt & minimal), penanganan faktor presipitasi, penggunaan laktulosa dan rifaksimin, serta pedoman restriksi obat penekan susunan saraf pusat pada penderita sirosis.',
    keyTopics: [
      'Terapi Lini Pertama Laktulosa Oral / Enema: Titrasi Dosis hingga Tercapai 2 - 3 Kali Defekasi Lunak per Hari',
      'Pencegahan Sekunder Terobosan Ensefalopati: Penambahan Rifaximin 550 mg Dua Kali Sehari pada Laktulosa',
      'Batasan Maksimal Parasetamol pada Pasien Sirosis Stabil: Maksimum 2000 mg (2 g) per Hari',
      'HINDARI PENGGUNAAN Benzodiazepin, Opioid, dan Sedatif yang Berisiko Memicu Koma Hepatik Iatrogenik'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Dosis Disfungsi Hepar & Sirosis',
        description: 'Mutiara klinis pembatasan parasetamol dan tata laksana laktulosa/rifaksimin.'
      },
      {
        tabId: 'interactions',
        featureName: 'Cek Interaksi Obat & DDSI',
        description: 'Deteksi bahaya sedatif benzodiazepin pada pasien ensefalopati hepatik.'
      }
    ],
    officialUrl: 'https://www.aasld.org/practice-guidelines',
    officialUrlLabel: 'Portal Pedoman AASLD Practice Guidance',
    citation: 'Vilstrup H, Amodio P, Bajaj J, et al. Hepatic encephalopathy in chronic liver disease: 2014 practice guideline by AASLD and EASL. Hepatology. 2014;60(2):715-735 (Reaffirmed 2023/2024).',
    badgeColor: 'bg-cyan-700 text-white'
  },

  // =========================================================================
  // 2. PEDIATRIK & POPULASI KHUSUS INTERNASIONAL
  // =========================================================================
  {
    id: 'lit-who-pocketbook-pediatrics',
    title: 'WHO Pocket Book of Hospital Care for Children (2nd Edition & Updates)',
    institution: 'World Health Organization (WHO)',
    category: 'pediatric_special',
    categoryLabel: 'Pediatrik & Puyer',
    documentCode: 'WHO Guidelines Approved by the Guidelines Review Committee',
    releaseYear: '2022 - 2024',
    lastUpdated: 'Juni 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Buku panduan saku resmi World Health Organization untuk penanganan rawat inap anak di rumah sakit lini pertama dan rujukan, memuat standar terapi cairan rehidrasi oral (Oralit), suplementasi Zinc diare, antibiotik esensial anak, dan tata laksana gizi buruk.',
    keyTopics: [
      'Protokol Rehidrasi Oralit Hipoosmolar pada Diare Akut Cair (Formula WHO Osmolaritas 245 mOsm/L)',
      'Suplementasi Zinc Elemental Diare: 10 mg/hari (usia < 6 bulan) dan 20 mg/hari (usia >= 6 bulan) selama 10 hari',
      'Dosis Antibiotik Lini Pertama Pneumonia dan Sepsis Anak (Amoksisilin, Ampisilin, Gentamisin)',
      'Peringatan Bahaya Toksisitas Kloramfenikol (Gray Baby Syndrome) dan Tetrasiklin (Diskolorisasi Gigi Anak)'
    ],
    appliedInFeatures: [
      {
        tabId: 'pediatric-dosing',
        featureName: 'Dosis Pediatrik & Puyer',
        description: 'Algoritma dosis rehidrasi oralit, zinc diare, dan antibiotik anak esensial.'
      },
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol penanganan gastroenteritis akut dehidrasi dan pneumonia anak.'
      }
    ],
    officialUrl: 'https://www.who.int/publications/i/item/9789241548373',
    officialUrlLabel: 'Portal Resmi WHO Pocket Book for Children',
    citation: 'World Health Organization. Pocket Book of Hospital Care for Children: Guidelines for the Management of Common Childhood Illnesses (Second Edition). Geneva: World Health Organization, 2024.',
    badgeColor: 'bg-blue-600 text-white'
  },

  // =========================================================================
  // 3. REGULASI NASIONAL & FORMULARIUM RESMI INDONESIA
  // =========================================================================
  {
    id: 'lit-pionas-bpom-ri',
    title: 'Pusat Informasi Obat Nasional (PIONAS) Badan POM RI',
    institution: 'Badan Pengawas Obat dan Makanan (BPOM) Republik Indonesia',
    category: 'formulary_bpom',
    categoryLabel: 'Formularium & BPOM',
    documentCode: 'PIONAS BPOM Online Database',
    releaseYear: '2023 - 2025',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Pusat rujukan resmi informasi obat nasional independen yang dikelola oleh Badan POM RI, memuat monografi lengkap obat yang beredar di Indonesia, indikasi resmi, peringatan keselamatan (Safety Alerts), kontraindikasi, efek samping, dan petunjuk penyesuaian dosis.',
    keyTopics: [
      'Peringatan Keamanan Obat & Kotak Hitam (Black Box Warnings) Resmi BPOM RI',
      'Batasan Usia Kontraindikasi Obat Flu & Batuk OTC Golongan Dekongestan pada Anak < 6 Tahun',
      'Monografi Dosis Obat Esensial dan Generik Berizin Edar di Indonesia',
      'Panduan Farmakovigilans Nasional & Pelaporan Efek Samping Obat (MESO / Yellow Form)'
    ],
    appliedInFeatures: [
      {
        tabId: 'competency-center',
        featureName: 'Pusat Belajar Uji Kompetensi',
        description: 'Monografi baku farmakologi nasional untuk latihan soal UKMPPAI.'
      },
      {
        tabId: 'interactions',
        featureName: 'Cek Interaksi Obat',
        description: 'Verifikasi peringatan resmi BPOM RI untuk interaksi obat mayor.'
      }
    ],
    officialUrl: 'https://pionas.pom.go.id',
    officialUrlLabel: 'Portal Resmi PIONAS BPOM RI',
    citation: 'Badan Pengawas Obat dan Makanan Republik Indonesia. Pusat Informasi Obat Nasional (PIONAS). Jakarta: BPOM RI, 2025.',
    badgeColor: 'bg-emerald-800 text-white'
  },

  // =========================================================================
  // 4. PENYAKIT INFEKSI & ANTIMIKROBA KLINIS
  // =========================================================================
  {
    id: 'lit-sanford-antimicrobial-2024',
    title: 'The Sanford Guide to Antimicrobial Therapy (54th Edition 2024/2025)',
    institution: 'Antimicrobial Therapy Inc. & Sanford Guide Editorial Board',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Sanford Guide 54th Edition',
    releaseYear: '2024 / 2025',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Standar emas referensi infeksi klinis dunia untuk pemilihan antibiotik empiris dan definitif, penyesuaian dosis insufisiensi ginjal (CrCl) dan dialisis (HD/CAPD/CRRT), interaksi obat antimikroba, serta Therapeutic Drug Monitoring (TDM).',
    keyTopics: [
      'Penyesuaian Dosis Antibiotik Berdasarkan Klirens Kreatinin (CrCl < 50, < 30, < 10 mL/min)',
      'Dosis Tambahan Pasca-Hemodialisis (Post-HD Supplementation) untuk Vankomisin, Meropenem, dan Flukonazol',
      'Target AUC24/MIC 400-600 untuk Vankomisin pada Infeksi MRSA Berat',
      'Regimen Antimikroba Lini Depan Patogen Resisten ESBL, CRE, Pseudomonas aeruginosa, dan Acinetobacter'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Penyesuaian Dosis Ginjal',
        description: 'Tabel penyesuaian dosis CrCl dan dosis suplemen hemodialisis 63 obat esensial.'
      },
      {
        tabId: 'iv-compatibility',
        featureName: 'Kompatibilitas Intravena RS',
        description: 'Protokol laju infus antimikroba intravena dan stabilitas rekonstitusi pelarut.'
      }
    ],
    officialUrl: 'https://www.sanfordguide.com',
    officialUrlLabel: 'Portal Resmi The Sanford Guide',
    citation: 'Gilbert DN, Chambers HF, Saag MS, Pavia AT, Boucher HW, eds. The Sanford Guide to Antimicrobial Therapy 2024 (54th ed.). Sperryville, VA: Antimicrobial Therapy, Inc., 2024.',
    badgeColor: 'bg-red-700 text-white'
  },

  // =========================================================================
  // 5. KIMIA KLINIS & INTERFERENSI UJI LABORATORIUM
  // =========================================================================
  {
    id: 'lit-tietz-clinical-chemistry',
    title: 'Tietz Textbook of Clinical Chemistry and Molecular Diagnostics (7th Edition)',
    institution: 'American Association for Clinical Chemistry (AACC) & Elsevier',
    category: 'interactions',
    categoryLabel: 'Interaksi & Keamanan',
    documentCode: 'Tietz Clinical Chemistry 7th Ed',
    releaseYear: '2023 / 2024',
    lastUpdated: 'September 2024',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Rujukan otoritatif tertinggi laboratorium medik global mengenai pengaruh interferensi obat, metabolit, dan zat eksogen terhadap keakuratan uji biokimia klinis, spektrofotometri, tes enzimatik, dan urinalisis dipstick.',
    keyTopics: [
      'Mekanisme Interferensi Fotometrik: Efek Kromogenik Fenazopiridin, Rifampisin, dan Doksorubisin terhadap Bilirubin & Urinalisis Dipstick',
      'Interferensi Reduktor Kuat: Vitamin C Dosis Tinggi terhadap Uji Enzimatik Glukosa Oksidase & FOBT Guaiac',
      'Interferensi Kinetik Enzim UV 340 nm: Metronidazole Menimbulkan Hasil SGPT/ALT Sangat Rendah Palsu',
      'Cross-Reactivity Skrining Toksikologi Narkoba Urin (UDS): Sertraline vs Benzodiazepin & Dekstrometorfan vs PCP'
    ],
    appliedInFeatures: [
      {
        tabId: 'drug-lab',
        featureName: 'Interferensi Obat vs Uji Lab',
        description: 'Basis mekanisme biokimia dan rekomendasi klinis 45 pasangan interferensi obat-lab.'
      },
      {
        tabId: 'competency-center',
        featureName: 'Pusat Belajar Uji Kompetensi',
        description: 'Konsep kimia klinis analitik dan farmakoterapi interpretasi data laboratorium.'
      }
    ],
    officialUrl: 'https://www.sciencedirect.com/book/9780323359214',
    officialUrlLabel: 'Tietz Clinical Chemistry Reference',
    citation: 'Rifai N, Chiu RWK, Young I, Burnham CAD, Wittwer CT, eds. Tietz Textbook of Laboratory Medicine (7th ed.). St. Louis, MO: Elsevier, 2023.',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'lit-adlm-aacc-biotin-interference',
    title: 'ADLM / AACC Guidance Document: Managing Interferences in Clinical Immunoassays',
    institution: 'Association for Diagnostics & Laboratory Medicine (ADLM, dahulu AACC)',
    category: 'interactions',
    categoryLabel: 'Interaksi & Keamanan',
    documentCode: 'ADLM Clinical Guidance 2023',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Agustus 2024',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Panduan keselamatan laboratorium klinis internasional untuk identifikasi, mitigasi, dan pencegahan kesalahan fatal akibat interferensi immunoassay berbasis streptavidin-biotin, reaktivitas silang antibodi heterofilik, dan obat-obatan kardiovaskular.',
    keyTopics: [
      'Interferensi Biotin Dosis Tinggi (>= 5 mg/hari) Menyebabkan Hasil Troponin Jantung I & T Negatif Palsu pada Infark Miokard Akut',
      'Pola Hipertiroidisme Palsu Akibat Biotin: TSH Terbaca Rendah Palsu dan FT4 Terbaca Tinggi Palsu',
      'Protokol Pencucian Sampel atau Penundaan Pengambilan Darah Minimal 48 - 72 Jam Pasca-Konsumsi Biotin',
      'Interferensi Daptomycin Memperpanjang Waktu Protrombin (PT-INR) Tinggi Palsu pada Kit Tromboplastin Tertentu'
    ],
    appliedInFeatures: [
      {
        tabId: 'drug-lab',
        featureName: 'Interferensi Obat vs Uji Lab',
        description: 'Protokol darurat penanganan sampel darah pasien suspek serangan jantung IMA yang mengonsumsi biotin.'
      }
    ],
    officialUrl: 'https://www.myadlm.org/cln/articles/2023/biotin-interference',
    officialUrlLabel: 'Portal Panduan ADLM Immunoassay',
    citation: 'Association for Diagnostics & Laboratory Medicine (ADLM). ADLM Guidance on Biotin Interference in Clinical Immunoassays. Washington, DC: ADLM, 2023.',
    badgeColor: 'bg-violet-700 text-white'
  },

  // =========================================================================
  // 6. ONKOLOGI & KESELAMATAN SITOTOKSIK INTRAVENA
  // =========================================================================
  {
    id: 'lit-nccn-antiemesis-2024',
    title: 'NCCN Clinical Practice Guidelines in Oncology: Antiemesis (Version 2024/2025)',
    institution: 'National Comprehensive Cancer Network (NCCN)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'NCCN Guidelines Version 1.2025 - Antiemesis',
    releaseYear: '2024 / 2025',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman konsensus onkologi paling terkemuka di dunia untuk pencegahan dan penatalaksanaan Chemotherapy-Induced Nausea and Vomiting (CINV) akut dan lambat berbasis stratifikasi potensi emetogenik kemoterapi sitotoksik.',
    keyTopics: [
      'Stratifikasi Tingkat Emetogenik Obat Kemoterapi: High (Cisplatin, Cyclophosphamide Doxorubicin AC regimen), Moderate (Carboplatin, Oxaliplatin), Low (Paclitaxel, Docetaxel, 5-FU)',
      'Protokol Profilaksis Kuadrupel / Tripel: Kombinasi Antagonis 5-HT3 (Ondansetron) + Dexamethasone + Antagonis NK1 (Aprepitant) + Olanzapine',
      'Pemberian Premedikasi Wajib Sebelum Memulai Infus Kemoterapi',
      'Manajemen Mual Muntah Antisipatorik dengan Benzodiazepin Dosis Rendah (Lorazepam)'
    ],
    appliedInFeatures: [
      {
        tabId: 'iv-compatibility',
        featureName: 'Kompatibilitas Intravena RS',
        description: 'Protokol premedikasi antiemetik pada 15 obat kemoterapi sitotoksik onkologi.'
      },
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol terapi suportif onkologi terintegrasi.'
      }
    ],
    officialUrl: 'https://www.nccn.org/guidelines/guidelines-detail?category=3&id=1415',
    officialUrlLabel: 'NCCN Antiemesis Clinical Guidelines',
    citation: 'National Comprehensive Cancer Network (NCCN). NCCN Clinical Practice Guidelines in Oncology: Antiemesis (Version 1.2025). Plymouth Meeting, PA: NCCN, 2025.',
    badgeColor: 'bg-rose-700 text-white'
  },
  {
    id: 'lit-asco-ons-chemo-safety',
    title: 'ASCO / Oncology Nursing Society (ONS) Chemotherapy Administration Safety Standards',
    institution: 'American Society of Clinical Oncology (ASCO) & Oncology Nursing Society (ONS)',
    category: 'iv_sterile',
    categoryLabel: 'Injeksi & IV Steril',
    documentCode: 'ASCO/ONS Chemotherapy Safety Standards',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Oktober 2024',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Standar keselamatan internasional dalam penyiapan, pemberian, pencegahan kesalahan rute, dan penanganan darurat ekstravasasi obat kemoterapi sitotoksik intravena.',
    keyTopics: [
      'Protokol Penanganan Darurat Ekstravasasi Vesikan Kuat: Doxorubicin (Kompres Dingin Kering + Antidotum Dexrazoxane) vs Vincristine (Kompres Hangat + Antidotum Hialuronidase)',
      'PERINGATAN FATAL: Larangan Mutlak Pemberian Vincristine via Rute Intratekal (Wajib Dikemas Hanya dalam Mini-bag 50 mL)',
      'Wajib Penggunaan Wadah Bebas PVC (Non-PVC Tubing) dan Filter In-Line 0.22 Mikron pada Paclitaxel',
      'Standar Verifikasi Ganda (Independent Double Check) Sebelum Pemberian Obat Sitotoksik'
    ],
    appliedInFeatures: [
      {
        tabId: 'iv-compatibility',
        featureName: 'Kompatibilitas Intravena RS',
        description: 'Peringatan Black Box vesikan, rute intratekal fatal, dan set infus non-PVC kemoterapi.'
      }
    ],
    officialUrl: 'https://ascopubs.org/doi/full/10.1200/JOP.2016.019109',
    officialUrlLabel: 'Portal ASCO/ONS Chemotherapy Standards',
    citation: 'Neuss MN, Gilmore TR, Belderson KM, et al. 2016 Updated American Society of Clinical Oncology/Oncology Nursing Society Chemotherapy Administration Safety Standards. J Clin Oncol. 2017;35(5):562-576 (Reaffirmed 2024).',
    badgeColor: 'bg-amber-700 text-white'
  },

  // =========================================================================
  // 7. GERIATRI & FARMAKOTERAPI USIA LANJUT
  // =========================================================================
  {
    id: 'lit-stopp-start-v3-2023',
    title: 'STOPP/START Criteria Version 3: Screening Tool for Older People\'s Prescriptions',
    institution: 'European Geriatric Medicine Society (EuGMS) & British Pharmacological Society',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'STOPP/START Criteria Version 3',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Juli 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Konsensus berbasis bukti para pakar geriatri Eropa (terdiri dari 190 kriteria klinis) untuk mengidentifikasi peresepan obat yang berpotensi tidak tepat (STOPP) dan obat penting yang berpotensi terlewatkan (START) pada pasien geriatri usia >= 65 tahun.',
    keyTopics: [
      'Kriteria STOPP Penghentian Obat Nefrotoksik (NSAID, ACEi dosis berlebih) pada Lansia dengan Penurunan Laju Filtrasi Ginjal',
      'Penghindaran Beban Antikolinergik Tinggi (Trihexyphenidyl, Amitriptyline) pada Lansia Demensia / Risiko Jatuh',
      'Kriteria STOPP Penggunaan Benzodiazepin dan Z-Drugs Jangka Panjang (>4 Minggu) Akibat Risiko Fraktur Panggul',
      'Kriteria START Indikasi Wajib: Statin pada PJK Usia Lanjut dan SGLT2i pada CKD / Gagal Jantung Lansia'
    ],
    appliedInFeatures: [
      {
        tabId: 'polypharmacy',
        featureName: 'Evaluasi & Polifarmasi',
        description: 'Skrining otomatis peresepan obat tidak tepat pada pasien geriatri bersama Beers Criteria.'
      },
      {
        tabId: 'interactions',
        featureName: 'Kontraindikasi Obat-Penyakit (DDSI)',
        description: 'Evaluasi komorbiditas dan risiko fraktur/jatuh pada populasi lanjut usia.'
      }
    ],
    officialUrl: 'https://academic.oup.com/ageing/article/52/7/afad087/7206132',
    officialUrlLabel: 'European Geriatric Society STOPP/START Portal',
    citation: 'O\'Mahony D, Cherubini A, Guiteras AR, et al. STOPP/START criteria for potentially inappropriate prescribing in older people: version 3. Age Ageing. 2023;52(7):afad087.',
    badgeColor: 'bg-emerald-900 text-white'
  },

  // =========================================================================
  // 8. NEFROLOGI & GAGAL GINJAL KRONIK (KDIGO 2024)
  // =========================================================================
  {
    id: 'lit-kdigo-2024-ckd-guidelines',
    title: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD',
    institution: 'Kidney Disease: Improving Global Outcomes (KDIGO)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'KDIGO 2024 CKD Guideline',
    releaseYear: '2024 / 2025',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Panduan internasional terkini dan paling revolusioner dalam nefrologi modern yang menetapkan standar 4 pilar terapi nefroproteksi, penilaian eGFR berbasis formula CKD-EPI 2021, stratifikasi albuminuria, serta penyesuaian dosis obat berbasis klirens ginjal aktual.',
    keyTopics: [
      'Empat Pilar Terapi Nefroproteksi CKD: SGLT2 Inhibitor (Dapagliflozin/Empagliflozin), Non-Steroidal MRA (Finerenone), RAS Inhibitor (ACEi/ARB), dan Terapi Statin',
      'Penyesuaian Dosis Obat Berdasarkan eGFR CKD-EPI 2021 Tanpa Variabel Ras (Creatinine & Cystatin C)',
      'Pedoman Titrasi dan Penghentian Sementara Obat-obatan Nefrotoksik saat Mengalami Sakit Akut (Sick Day Rules)',
      'Manajemen Gangguan Mineral Tulang pada CKD (CKD-MBD): Target Fosfat, Kalsium, dan PTH Serum'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Klirens Ginjal & Dosis',
        description: 'Rumus Cockcroft-Gault, CKD-EPI 2021, dan penyesuaian dosis 63 obat ginjal/HD.'
      },
      {
        tabId: 'interactions',
        featureName: 'Kontraindikasi Obat-Penyakit (DDSI)',
        description: 'Deteksi kontraindikasi SGLT2i, Metformin, dan NSAID pada gagal ginjal berat.'
      }
    ],
    officialUrl: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
    officialUrlLabel: 'Portal Resmi KDIGO 2024 CKD Guidelines',
    citation: 'Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117-S314.',
    badgeColor: 'bg-indigo-700 text-white'
  }
];
