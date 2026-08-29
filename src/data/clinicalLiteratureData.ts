export interface LiteratureSource {
  id: string;
  title: string;
  institution: string;
  category: 'guidelines' | 'interactions' | 'iv_sterile' | 'regulations' | 'formulary_bpom' | 'calculators';
  categoryLabel: string;
  documentCode?: string;
  releaseYear: string;
  lastUpdated: string;
  evidenceLevel: 'Level 1 (Meta-Analisis / RCT)' | 'Level 2 (PNPK & Konsensus Spesialis)' | 'Level 3 (Monograf Baku & Regulasi Pemerintah)';
  evidenceGrade: 'Grade A' | 'Grade B' | 'Grade C';
  summary: string;
  keyTopics: string[];
  appliedInFeatures: {
    tabId: string;
    featureName: string;
    description: string;
  }[];
  officialUrl?: string;
  officialUrlLabel?: string;
  citation: string;
  badgeColor: string;
}

export interface LiteratureCategory {
  id: string;
  label: string;
  description: string;
  count: number;
}

export const CLINICAL_LITERATURE_DATABASE: LiteratureSource[] = [
  // 1. PANDUAN TERAPI & PNPK
  {
    id: 'lit-pnpk-kemenkes',
    title: 'Pedoman Nasional Pelayanan Kedokteran (PNPK) Kemenkes RI',
    institution: 'Kementerian Kesehatan Republik Indonesia',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Kepmenkes RI Terpadu PNPK',
    releaseYear: '2021 - 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Rangkaian pedoman tata laksana klinis komprehensif nasional yang ditetapkan secara hukum oleh Menteri Kesehatan untuk standarisasi terapi penyakit prioritas di seluruh faskes Indonesia.',
    keyTopics: [
      'Hipertensi & Gagal Jantung',
      'Diabetes Melitus Tipe 2 & Komplikasi',
      'Tuberkulosis Sensitif & Resisten Obat (TB-RO)',
      'Sepsis & Syok Septik Dewasa',
      'Penyakit Paru Obstruktif Kronik (PPOK) & Asma',
      'Stroke Iskemik Akut & Pencegahan Sekunder',
      'Kanker Payudara & Kolorektal'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Algoritma lini terapi 1 & 2, target klinis, dan pemilihan regimen obat terintegrasi.'
      },
      {
        tabId: 'polypharmacy',
        featureName: 'Evaluasi & Polifarmasi',
        description: 'Penyelarasan pemilihan obat dengan rekomendasi resmi PNPK Kemenkes.'
      }
    ],
    officialUrl: 'https://kemkes.go.id',
    officialUrlLabel: 'Portal Resmi PNPK Kemenkes RI',
    citation: 'Kementerian Kesehatan RI. Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Klinis Berbagai Penyakit. Jakarta: Kemenkes RI.',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'lit-perki-kardio',
    title: 'Pedoman Tata Laksana Kardiovaskular & Hipertensi PERKI',
    institution: 'Perhimpunan Dokter Spesialis Kardiovaskular Indonesia (PERKI)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Konsensus Nasional PERKI 2023/2024',
    releaseYear: '2023 / 2024',
    lastUpdated: 'November 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Konsensus tata laksana Hipertensi, Gagal Jantung Akut & Kronik (HFrEF/HFpEF), Sindrom Koroner Akut (NSTEMI/STEMI), serta Dislipidemia yang diselaraskan dengan standar ESC dan ACC/AHA.',
    keyTopics: [
      'Kombinasi Dual Antihipertensi Dosis Tunggal (SPC)',
      'Terapi 4 Pilar Gagal Jantung (ARNI/ACEi, BB, MRA, SGLT2i)',
      'Dual Antiplatelet Therapy (DAPT) Paska-PCI',
      'Target LDL-Kolesterol Berbasis Stratifikasi Risiko'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol penanganan Hipertensi, Gagal Jantung, dan ACS.'
      },
      {
        tabId: 'interactions',
        featureName: 'Cek Interaksi Obat',
        description: 'Pencegahan interaksi DAPT (Clopidogrel + PPI) dan ARNI + ACEi.'
      }
    ],
    officialUrl: 'https://www.inaheart.org',
    officialUrlLabel: 'Pedoman Resmi InaHeart PERKI',
    citation: 'PERKI. Pedoman Tata Laksana Hipertensi & Gagal Jantung Terkini. InaHeart Journal 2023.',
    badgeColor: 'bg-red-600 text-white'
  },
  {
    id: 'lit-perkeni-dm',
    title: 'Konsensus Pedoman Pengelolaan Diabetes Melitus Tipe 2 PERKENI',
    institution: 'Perkumpulan Endokrinologi Indonesia (PERKENI)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Konsensus PERKENI 2023',
    releaseYear: '2023',
    lastUpdated: 'Desember 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman terkini pengelolaan DM tipe 2 di Indonesia yang mengutamakan proteksi kardiorenal menggunakan agen modern SGLT-2 Inhibitor dan GLP-1 RA di samping Metformin lini pertama.',
    keyTopics: [
      'Inisiasi Metformin & Modifikasi Gaya Hidup Sehat',
      'Proteksi Renal & Kardiovaskular (SGLT2i: Empagliflozin/Dapagliflozin)',
      'Tititasi Insulin Basal & Kombinasi OAD',
      'Target Kendali HbA1c < 7.0% Terindividualisasi'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Algoritma DM Tipe 2 dan panduan kombinasi obat antidiabetes.'
      },
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Medis & Dosis',
        description: 'Dosis Metformin dan penyesuaian eGFR pada penderita nefropati diabetik.'
      }
    ],
    officialUrl: 'https://pbperkeni.or.id',
    officialUrlLabel: 'Publikasi Resmi PB PERKENI',
    citation: 'PB PERKENI. Pedoman Pengelolaan dan Pencegahan Diabetes Melitus Tipe 2 Dewasa di Indonesia. 2023.',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'lit-idai-pediatrik',
    title: 'Panduan Dosis Terapi & Pedoman Pelayanan Medis Anak IDAI',
    institution: 'Ikatan Dokter Anak Indonesia (IDAI)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Pedoman Praktik Klinis IDAI',
    releaseYear: '2022 - 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Standar penentuan dosis obat pediatrik berdasarkan Berat Badan (mg/kgBB/hari) dan Luas Permukaan Tubuh (BSA), serta pencegahan kontraindikasi obat pada neonatus dan anak.',
    keyTopics: [
      'Dosis Antipiretik Paracetamol & Ibuprofen Pediatrik',
      'Antibiotik Lini Pertama ISPA & Otitis Media Anak',
      'Koreksi Dehidrasi Diare Akut & Suplementasi Zinc',
      'Restriksi Obat Tertentu pada Anak (Tetrasiklin, Fluorokuinolon)'
    ],
    appliedInFeatures: [
      {
        tabId: 'pediatric',
        featureName: 'Dosis Pediatrik & Puyer',
        description: 'Kalkulator dosis aman mg/kgBB, konversi tablet ke puyer, dan takaran sirup.'
      },
      {
        tabId: 'whatsapp-pio',
        featureName: 'Kartu PIO WhatsApp',
        description: 'Instruksi aturan minum sirup obat anak siap kirim ke orang tua.'
      }
    ],
    officialUrl: 'https://www.idai.or.id',
    officialUrlLabel: 'Portal Publikasi Ilmiah IDAI',
    citation: 'Ikatan Dokter Anak Indonesia. Pedoman Pelayanan Medis & Dosis Pediatrik. Jakarta: Badan Penerbit IDAI.',
    badgeColor: 'bg-rose-500 text-white'
  },

  // 2. INTERAKSI OBAT & FARMAKOVIGILANS
  {
    id: 'lit-ddinter-database',
    title: 'DDInter: Drug-Drug Interaction Database Platform',
    institution: 'Zhejiang University & Nature Digital Medicine',
    category: 'interactions',
    categoryLabel: 'Interaksi & Keamanan',
    documentCode: 'DDInter v2.0 Platform (Nature npj Digit. Med)',
    releaseYear: '2022 - 2025',
    lastUpdated: 'Februari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Database interaksi obat komprehensif global yang divalidasi dengan machine learning dan uji klinis, memuat lebih dari 280.000 relasi interaksi antarmolekul obat dengan kategorisasi keparahan Major, Moderate, dan Minor.',
    keyTopics: [
      'Mekanisme Farmakokinetik (Enzim CYP450, P-Glikoprotein, Klirens Ginjal)',
      'Mekanisme Farmakodinamik (Sinergisme Toksisitas, Pemanjangan QTc, Depresi SSP)',
      'Manajemen Klinis & Rekomendasi Modifikasi Waktu Pemberian',
      'Level Evidens Interaksi (Clinical Trial vs Post-Marketing Report)'
    ],
    appliedInFeatures: [
      {
        tabId: 'interactions',
        featureName: 'Cek Interaksi Obat',
        description: 'Mesin deteksi pasangan interaksi obat klinis dengan tingkat keparahan.'
      },
      {
        tabId: 'polypharmacy',
        featureName: 'Evaluasi & Polifarmasi',
        description: 'Pemeriksaan multi-interaksi simultan pada resep polifarmasi kompleks.'
      }
    ],
    officialUrl: 'http://ddinter.scbdd.com',
    officialUrlLabel: 'Database Resmi DDInter Online',
    citation: 'Xiong, G., et al. DDInter: an online drug-drug interaction database toward improving clinical medication safety. npj Digit. Med. 5, 51 (2022).',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'lit-drugscom-medscape',
    title: 'Drugs.com Clinical Knowledge Base & Monograf Medscape',
    institution: 'Drugs.com Clinical Review Board & Medscape Reference',
    category: 'interactions',
    categoryLabel: 'Interaksi & Keamanan',
    documentCode: 'Clinical Monograph Reference 2025',
    releaseYear: '2024 / 2025',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Pustaka monograf klinis yang mencakup interaksi makanan-obat (Drug-Food Interactions), aturan duplikasi terapi satu golongan (Therapeutic Duplications), dan parameter farmakologis esensial.',
    keyTopics: [
      'Interaksi Makanan (Jus Grapefruit, Makanan Tinggi Kalsium/Susu, Alkohol)',
      'Skrining Duplikasi Terapi (Dual NSAID, Dual ARB/ACEi, Dual Statin)',
      'Penanda Keamanan Kehamilan FDA (Kategori A, B, C, D, X & PLLR)',
      'Peringatan Black Box Warning & Efek Samping Berbahaya'
    ],
    appliedInFeatures: [
      {
        tabId: 'side-effects',
        featureName: 'Cek Efek Samping & ADR',
        description: 'Analisis potensi adverse drug reaction dan peringatan keamanan.'
      },
      {
        tabId: 'polypharmacy',
        featureName: 'Evaluasi & Polifarmasi',
        description: 'Deteksi duplikasi zat aktif dan aturan interaksi makanan pada resep.'
      }
    ],
    officialUrl: 'https://www.drugs.com',
    officialUrlLabel: 'Drugs.com Clinical Database',
    citation: 'Drugs.com Clinical Team. Comprehensive Drug Information and Interaction Checker Database. 2025.',
    badgeColor: 'bg-teal-600 text-white'
  },

  // 3. KOMPATIBILITAS IV & STERIL
  {
    id: 'lit-trissels-ashp',
    title: "Trissel's™ 2024 Handbook on Injectable Drugs & ASHP Standards",
    institution: 'American Society of Health-System Pharmacists (ASHP)',
    category: 'iv_sterile',
    categoryLabel: 'Injeksi & IV Steril',
    documentCode: "Handbook on Injectable Drugs (Trissel's™ 2024)",
    releaseYear: '2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Standar emas internasional (*Gold Standard*) untuk evaluasi kompatibilitas sediaan parenteral, pencampuran jalur infus Y-Site, presipitasi kimiawi asam-basa, kompatibilitas pelarut infus (NS, D5W, RL), serta stabilitas Beyond-Use Date (BUD).',
    keyTopics: [
      'Kompatibilitas Y-Site Co-Infusion (Kompatibel, Inkompatibel, Tidak Pasti)',
      'Presipitasi Asam-Basa (pH Incompatibility misal Furosemide + Dobutamine)',
      'Pelarut Rekonstitusi yang Sesuai (NaCl 0.9%, Dextrose 5%, Water for Injection)',
      'Stabilitas Beyond-Use Date (BUD) Suhu Ruang vs Lemari Pendingin (USP <797>)',
      'Kebutuhan Filter In-Line & Perlindungan dari Cahaya (Light Protection)'
    ],
    appliedInFeatures: [
      {
        tabId: 'iv-compatibility',
        featureName: 'Kompatibilitas Injeksi IV',
        description: 'Pemeriksaan multi-obat Y-Site ICU/Rawat Inap, pelarut infus, dan stabilitas rekonstitusi.'
      }
    ],
    officialUrl: 'https://www.ashp.org',
    officialUrlLabel: 'Portal Resmi ASHP Drug Information',
    citation: "American Society of Health-System Pharmacists. ASHP's Handbook on Injectable Drugs (Trissel's Reference). 2024.",
    badgeColor: 'bg-cyan-600 text-white'
  },

  // 4. FORNAS & BPOM RI
  {
    id: 'lit-fornas-kemenkes',
    title: 'Formularium Nasional (FORNAS) & e-Katalog Obat Kemenkes RI',
    institution: 'Kementerian Kesehatan Republik Indonesia & BPJS Kesehatan',
    category: 'formulary_bpom',
    categoryLabel: 'Formularium & BPOM',
    documentCode: 'Kepmenkes RI No. HK.01.07/MENKES/6477/2021 & Addendum',
    releaseYear: '2021 - 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Daftar obat terpilih yang wajib tersedia di fasilitas pelayanan kesehatan dalam penyelenggaraan Jaminan Kesehatan Nasional (JKN/BPJS), lengkap dengan restriksi peresepan, peruntukan faskes (TK 1, TK 2, TK 3), dan program rujuk balik (PRB).',
    keyTopics: [
      'Tingkat Faskes Penyedia (Faskes 1 Puskesmas/Klinik, Faskes 2 RS Tipe C/B, Faskes 3 RS Rujukan)',
      'Restriksi Indikasi & Maksimal Peresepan Obat Kronis',
      'Obat Program Rujuk Balik (PRB) untuk Pasien Stabil',
      'Restriksi Antibiotik Cadangan (Reserve / Restricted Antibiotics)'
    ],
    appliedInFeatures: [
      {
        tabId: 'drugs',
        featureName: 'Katalog & Informasi Obat',
        description: 'Tampilan status FORNAS, restriksi peresepan, dan batas faskes BPJS.'
      },
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Penyelarasan regimen obat lini pertama dengan ketersediaan FORNAS.'
      }
    ],
    officialUrl: 'https://yankes.kemkes.go.id',
    officialUrlLabel: 'Portal e-Formularium Nasional Kemenkes',
    citation: 'Kemenkes RI. Keputusan Menteri Kesehatan tentang Formularium Nasional (FORNAS) dan Ketentuan Peresepan BPJS Kesehatan.',
    badgeColor: 'bg-indigo-600 text-white'
  },
  {
    id: 'lit-bpom-ri',
    title: 'Database Registrasi Obat & Farmakovigilans Badan POM RI',
    institution: 'Badan Pengawas Obat dan Makanan (BPOM) Republik Indonesia',
    category: 'formulary_bpom',
    categoryLabel: 'Formularium & BPOM',
    documentCode: 'Pusat Informasi Obat Nasional (PIONAS) & CekBPOM',
    releaseYear: '2024 / 2025',
    lastUpdated: 'Februari 2025',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Pangkalan data resmi izin edar obat (Nomor NIE), peringatan keamanan, safety alerts, penarikan obat (recall), dan informasi produk terdaftar resmi di wilayah Negara Kesatuan Republik Indonesia.',
    keyTopics: [
      'Verifikasi Nomor Izin Edar (NIE BPOM: DKL, DTL, GKL, dll)',
      'Peringatan Keamanan Terkini (Drug Safety Warnings)',
      'Informasi Produsen & Industri Farmasi Terdaftar',
      'Pedoman Pelaporan Efek Samping Obat (MESO / Formulir Kuning)'
    ],
    appliedInFeatures: [
      {
        tabId: 'drugs',
        featureName: 'Katalog & Informasi Obat',
        description: 'Tautan langsung ke sistem CekBPOM resmi untuk verifikasi nomor registrasi.'
      },
      {
        tabId: 'sop',
        featureName: 'SOP Farmasi',
        description: 'Prosedur Pelaporan Efek Samping Obat (MESO) standar BPOM RI.'
      }
    ],
    officialUrl: 'https://cekbpom.pom.go.id',
    officialUrlLabel: 'Portal Resmi CekBPOM RI',
    citation: 'Badan Pengawas Obat dan Makanan RI. PIONAS & Database Registrasi Obat Indonesia. Jakarta: BPOM RI.',
    badgeColor: 'bg-emerald-600 text-white'
  },

  // 5. REGULASI & STANDAR HUKUM
  {
    id: 'lit-uu-kesehatan',
    title: 'Undang-Undang Republik Indonesia Nomor 17 Tahun 2023 tentang Kesehatan',
    institution: 'Pemerintah Republik Indonesia & DPR RI',
    category: 'regulations',
    categoryLabel: 'Regulasi & SOP',
    documentCode: 'Lembaran Negara RI Tahun 2023 No. 105',
    releaseYear: '2023',
    lastUpdated: 'Agustus 2023',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Undang-undang payung hukum utama yang mereformasi seluruh sistem ketenagakerjaan medis, kefarmasian, registrasi SIP/STR seumur hidup, dan penyelenggaraan teknologi informasi kesehatan di Indonesia.',
    keyTopics: [
      'Praktik Profesi Apoteker & Tenaga Vokasi Farmasi',
      'Penyelenggaraan Rekam Medis Elektronik & Telefarmasi',
      'Kewajiban Pengamanan Sediaan Farmasi & Alat Kesehatan',
      'Perlindungan Hukum Tenaga Medis & Tenaga Kesehatan'
    ],
    appliedInFeatures: [
      {
        tabId: 'regulations',
        featureName: 'Regulasi Farmasi',
        description: 'Database naskah lengkap UU No. 17 Tahun 2023 dan ringkasan pasal kefarmasian.'
      }
    ],
    officialUrl: 'https://peraturan.go.id',
    officialUrlLabel: 'JDIH Peraturan Perundang-undangan',
    citation: 'Republik Indonesia. Undang-Undang No. 17 Tahun 2023 tentang Kesehatan. Jakarta: Sekretariat Negara.',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'lit-permenkes-73',
    title: 'Permenkes No. 73 Tahun 2016: Standar Pelayanan Kefarmasian di Apotek',
    institution: 'Kementerian Kesehatan Republik Indonesia',
    category: 'regulations',
    categoryLabel: 'Regulasi & SOP',
    documentCode: 'Peraturan Menteri Kesehatan RI No. 73/2016',
    releaseYear: '2016',
    lastUpdated: 'Tetap Berlaku',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman wajib pengelolaan sediaan farmasi, alkes, BMHP, serta pelayanan farmasi klinis (pengkajian resep, dispensing, PIO, konseling, dan home pharmacy care) di seluruh apotek Indonesia.',
    keyTopics: [
      'Skrining Administratif, Farmasetik, dan Klinis Resep Dokter',
      'Pelayanan Informasi Obat (PIO) & Edukasi Pasien',
      'Konseling Obat untuk Pasien Geriatri, Pediatri, dan Kronis',
      'Penyimpanan Obat High Alert, LASA/NORUM, dan Narkotika/Psikotropika'
    ],
    appliedInFeatures: [
      {
        tabId: 'sop',
        featureName: 'SOP Farmasi Klinis',
        description: 'Kumpulan SOP siap pakai: Skrining Resep, Dispensing Obat, dan Konseling PIO.'
      },
      {
        tabId: 'whatsapp-pio',
        featureName: 'Kartu PIO WhatsApp',
        description: 'Standarisasi penyampaian informasi aturan pakai obat sesuai kaidah Permenkes 73.'
      }
    ],
    officialUrl: 'https://peraturan.bpk.go.id',
    officialUrlLabel: 'JDIH BPK RI Permenkes 73/2016',
    citation: 'Kemenkes RI. Permenkes No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek. Jakarta: Kemenkes RI.',
    badgeColor: 'bg-slate-700 text-white'
  },

  // 6. KALKULATOR MEDIS & FARMAKOKINETIKA
  {
    id: 'lit-calc-cockcroft-kdigo',
    title: 'Standar KDIGO & Formula Cockcroft-Gault / CKD-EPI (Klirens Ginjal)',
    institution: 'Kidney Disease: Improving Global Outcomes (KDIGO) & NKF',
    category: 'calculators',
    categoryLabel: 'Kalkulator Farmakoterapi',
    documentCode: 'KDIGO 2024 Clinical Practice Guideline for CKD',
    releaseYear: '2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Standar baku emas internasional dalam perhitungan estimasi Klirens Kreatinin (CrCl mL/menit) dan Laju Filtrasi Glomerulus (eGFR mL/menit/1.73m²) untuk penyesuaian dosis obat nefrotoksik dan eliminasi renal.',
    keyTopics: [
      'Formula Cockcroft-Gault (CrCl Dewasa dengan Koreksi Jenis Kelamin & Berat Badan)',
      'Formula CKD-EPI 2021 (Estimasi GFR Tanpa Ras)',
      'Formula Bedside Schwartz (eGFR Pediatrik dengan Tinggi Badan)',
      'Stratifikasi Stadium G1 hingga G5 CKD'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Medis & Dosis',
        description: 'Perhitungan CrCl otomatis dan rekomendasi penyesuaian dosis obat pada gangguan ginjal.'
      }
    ],
    officialUrl: 'https://kdigo.org',
    officialUrlLabel: 'Portal Resmi KDIGO Guidelines',
    citation: 'KDIGO. Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024.',
    badgeColor: 'bg-violet-600 text-white'
  },
  {
    id: 'lit-calc-child-pugh-meld',
    title: 'Klasifikasi Child-Pugh Score & MELD (Penyesuaian Dosis Disfungsi Hepar)',
    institution: 'American Association for the Study of Liver Diseases (AASLD)',
    category: 'calculators',
    categoryLabel: 'Kalkulator Farmakoterapi',
    documentCode: 'AASLD Practice Guidelines',
    releaseYear: '2023',
    lastUpdated: 'Desember 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Metode penilaian kuantitatif keparahan sirosis hepar (Child-Pugh Kelas A, B, C) dan skor MELD berbasis parameter laboratorium (Bilirubin, Albumin, INR, Asites, Ensefalopati) untuk penyesuaian dosis obat metabolisme hati.',
    keyTopics: [
      'Child-Pugh Kelas A (5-6 poin): Fungsi Hepar Terkompensasi Baik',
      'Child-Pugh Kelas B (7-9 poin): Gangguan Fungsional Signifikan',
      'Child-Pugh Kelas C (10-15 poin): Dekompensasi Hepar Berat',
      'Skor MELD untuk Evaluasi Pasien Transplantasi & Rawat Inap'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Medis & Dosis',
        description: 'Modul kalkulator Child-Pugh dan rekomendasi dosis hepatik.'
      }
    ],
    officialUrl: 'https://www.aasld.org',
    officialUrlLabel: 'AASLD Practice Guidelines',
    citation: 'AASLD. Practice Guideline: Management of Cirrhosis and Portal Hypertension. Hepatology 2023.',
    badgeColor: 'bg-purple-600 text-white'
  }
];

export const LITERATURE_CATEGORIES: LiteratureCategory[] = [
  {
    id: 'all',
    label: 'Semua Referensi',
    description: 'Seluruh database pedoman, monograf, dan regulasi resmi',
    count: CLINICAL_LITERATURE_DATABASE.length
  },
  {
    id: 'guidelines',
    label: 'Pedoman Klinis & PNPK',
    description: 'PNPK Kemenkes RI dan Konsensus Organisasi Profesi (PERKI, PERKENI, IDAI)',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'guidelines').length
  },
  {
    id: 'interactions',
    label: 'Interaksi & Keamanan',
    description: 'DDInter Database, Nature Digital Medicine, Drugs.com, dan Medscape',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'interactions').length
  },
  {
    id: 'iv_sterile',
    label: 'Injeksi & IV Steril',
    description: "Trissel's™ 2024 Handbook on Injectable Drugs & Standar ASHP",
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'iv_sterile').length
  },
  {
    id: 'formulary_bpom',
    label: 'Formularium & BPOM',
    description: 'Formularium Nasional (FORNAS), e-Katalog, dan CekBPOM RI',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'formulary_bpom').length
  },
  {
    id: 'regulations',
    label: 'Regulasi & SOP',
    description: 'UU Kesehatan No. 17/2023, Permenkes 73/2016 Apotek, dan Permenkes 72 RS',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'regulations').length
  },
  {
    id: 'calculators',
    label: 'Kalkulator Farmakoterapi',
    description: 'KDIGO Cockcroft-Gault, CKD-EPI, Child-Pugh, dan CDC Opioid Conversion',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'calculators').length
  }
];

export const FEATURE_EVIDENCE_MAPPING = [
  {
    feature: 'Cek Interaksi Obat & Skrining Polifarmasi',
    primarySource: 'DDInter (Zhejiang University / Nature Digital Medicine) & Drugs.com Interaction Engine',
    standards: 'Tingkat Keparahan Major/Moderate/Minor, Mekanisme CYP450 & Farmakodinamik',
    evidenceLevel: 'Level 1 (RCT & Clinical Trials)'
  },
  {
    feature: 'Kompatibilitas Injeksi IV (Y-Site & Stabilitas)',
    primarySource: "Trissel's™ 2024 Handbook on Injectable Drugs (ASHP)",
    standards: 'Pencampuran Y-Site, Presipitasi Asam-Basa, Rekonstitusi Pelarut, Stabilitas BUD (USP <797>)',
    evidenceLevel: 'Level 1 (Gold Standard ASHP)'
  },
  {
    feature: 'Panduan Terapi Klinis & Dosis Dewasa',
    primarySource: 'PNPK Kemenkes RI, Konsensus PERKI (Jantung), PERKENI (Diabetes), PAPDI, IDAI',
    standards: 'Algoritma Terapi Lini Pertama & Kedua, Target Klinis HbA1c/Tekanan Darah, FORNAS BPJS',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)'
  },
  {
    feature: 'Dosis Pediatrik & Konversi Racikan Puyer',
    primarySource: 'Panduan Praktik Klinis IDAI & Standar Farmakope Indonesia',
    standards: 'Dosis Berbasis mg/kgBB dan BSA (m²), Kalkulasi Zat Pengisi SL / Bobot Kering',
    evidenceLevel: 'Level 2 (IDAI / Farmakope)'
  },
  {
    feature: 'Kalkulator Klirens Ginjal & Hepar',
    primarySource: 'KDIGO 2024 (Cockcroft-Gault, CKD-EPI, Schwartz) & AASLD (Child-Pugh, MELD)',
    standards: 'Penyesuaian Klirens Kreatinin (CrCl) & Estimasi Laju Filtrasi Glomerulus (eGFR)',
    evidenceLevel: 'Level 1 (KDIGO International)'
  },
  {
    feature: 'Formularium Nasional (FORNAS) & Cek Registrasi',
    primarySource: 'Kepmenkes RI No. HK.01.07/MENKES/6477/2021 & Portal CekBPOM RI',
    standards: 'Restriksi Faskes 1, 2, 3, Obat Program Rujuk Balik (PRB), Nomor Izin Edar Resmi',
    evidenceLevel: 'Level 3 (Regulasi Pemerintah RI)'
  },
  {
    feature: 'SOP Pelayanan Kefarmasian & Regulasi Hukum',
    primarySource: 'UU No. 17 Tahun 2023, Permenkes No. 73/2016 (Apotek) & No. 72/2016 (RS)',
    standards: 'Skrining Resep, Dispensing, Edukasi PIO Pasien, Penyimpanan High-Alert & LASA',
    evidenceLevel: 'Level 3 (Standar Wajib Kemenkes)'
  }
];
