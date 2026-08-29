export interface LiteratureSource {
  id: string;
  title: string;
  institution: string;
  category: 'guidelines' | 'interactions' | 'iv_sterile' | 'regulations' | 'formulary_bpom' | 'calculators' | 'pediatric_special';
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
  // =========================================================================
  // 1. PANDUAN TERAPI & PNPK SPESIALIS (10 SUMBER)
  // =========================================================================
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
    id: 'lit-papdi-internal',
    title: 'Buku Ajar & Panduan Praktik Klinis PAPDI (Penyakit Dalam)',
    institution: 'Perhimpunan Dokter Spesialis Penyakit Dalam Indonesia (PAPDI)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'PPK PAPDI Penyakit Dalam Edisi III',
    releaseYear: '2023',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Standar penanganan komprehensif spektrum penyakit dalam: Sepsis, GERD, Sirosis Hepatis, Gagal Ginjal Akut, Sindrom Metabolik, dan Infeksi Tropis di ruang rawat inap dan faskes rujukan.',
    keyTopics: [
      'Terapi PPI Dosis Ganda & Eradikasi H. pylori',
      'Resusitasi Cairan & Antibiotik Empiris Sepsis 1 Jam Pertama',
      'Manajemen Asites & Spontaneous Bacterial Peritonitis (SBP)',
      'Koreksi Elektrolit Hipokalemia & Hiponatremia'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Pedoman terapi penyakit dalam, GERD, dan sepsis.'
      },
      {
        tabId: 'polypharmacy',
        featureName: 'Evaluasi & Polifarmasi',
        description: 'Penyelarasan multi-terapi penyakit dalam kronis.'
      }
    ],
    officialUrl: 'https://www.papdi.or.id',
    officialUrlLabel: 'Publikasi Resmi PAPDI',
    citation: 'PAPDI. Panduan Praktik Klinis Penyakit Dalam. Jakarta: Interna Publishing, 2023.',
    badgeColor: 'bg-indigo-600 text-white'
  },
  {
    id: 'lit-pdpi-paru',
    title: 'Pedoman Diagnosis & Penatalaksanaan Asma & PPOK PDPI',
    institution: 'Perhimpunan Dokter Paru Indonesia (PDPI) & GINA Guidelines',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Konsensus PDPI PPOK & Asma 2023/2024',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Desember 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman penatalaksanaan penyakit paru obstruktif: PPOK stabil dan eksaserbasi, Asma intermiten hingga persisten berat, serta terapi inhaler kombinasi ICS-LABA-LAMA sesuai stratifikasi GOLD.',
    keyTopics: [
      'Terapi Pemeliharaan & Pelega Asma (SMART / Inhaler Formoterol-Budesonide)',
      'Bronkodilator Kombinasi LAMA/LABA pada PPOK Eksaserbasi Berulang',
      'Kortikosteroid Sistemik Jangka Pendek pada Eksaserbasi Akut',
      'Teknik Penggunaan MDI, DPI, dan Nebulisasi'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol PPOK dan asma dengan pemilihan inhaler bertingkat.'
      },
      {
        tabId: 'usage',
        featureName: 'Penggunaan Obat',
        description: 'Panduan langkah demi langkah cara pemakaian inhaler MDI & DPI.'
      }
    ],
    officialUrl: 'https://klikpdpi.com',
    officialUrlLabel: 'Publikasi Resmi PDPI',
    citation: 'Perhimpunan Dokter Paru Indonesia. Pedoman Diagnosis & Penatalaksanaan PPOK dan Asma. Jakarta: PDPI, 2023.',
    badgeColor: 'bg-sky-600 text-white'
  },
  {
    id: 'lit-perdossi-stroke',
    title: 'Panduan Tata Laksana Stroke Iskemik & Neurologi PERDOSSI',
    institution: 'Perhimpunan Dokter Spesialis Neurologi Indonesia (PERDOSSI)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Guideline Stroke PERDOSSI Edisi Revisi',
    releaseYear: '2023',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Protokol penanganan kegawatdaruratan stroke fase akut: trombolisis intravena r-tPA, terapi antiplatelet ganda 21 hari pertama, kontrol tensi peri-stroke, serta profilaksis sekunder statin intensitas tinggi.',
    keyTopics: [
      'Manajemen Tekanan Darah Akut (< 180/105 pasca-trombolisis)',
      'Dual Antiplatelet (Aspirin + Clopidogrel) pada Minor Stroke / TIA',
      'Statin Intensitas Tinggi (Atorvastatin 40-80 mg)',
      'Neuroprotektor & Terapi Pencegahan Edema Serebri'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol stroke iskemik dan antiplatelet preventif.'
      }
    ],
    officialUrl: 'https://perdossi.id',
    officialUrlLabel: 'Portal Resmi PERDOSSI Neurologi',
    citation: 'PERDOSSI. Panduan Tata Laksana Stroke Iskemik Akut. Jakarta: Badan Penerbit PERDOSSI, 2023.',
    badgeColor: 'bg-violet-600 text-white'
  },
  {
    id: 'lit-pernefri-kdigo',
    title: 'Konsensus Tatalaksana Penyakit Ginjal Kronik PERNEFRI & KDIGO',
    institution: 'Perhimpunan Nefrologi Indonesia (PERNEFRI) & KDIGO',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Konsensus PERNEFRI CKD 2023 / KDIGO 2024',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman tata laksana CKD stadium 1 hingga 5: pencegahan progresi penurunan eGFR, pengendalian proteinuria dengan ACEi/ARB/SGLT2i, penanganan anemia defisiensi besi & ESA, dan tata laksana osteodistrofi renal.',
    keyTopics: [
      'Proteksi Glomerular SGLT-2 Inhibitor (Dapagliflozin/Empagliflozin)',
      'Manajemen Hiperkalemia (Pemberian Resin Kalium / Kalsium Glukonat)',
      'Koreksi Asidosis Metabolik dengan Natrium Bikarbonat Oral',
      'Penyesuaian Dosis Obat Nefrotoksik (NSAID, Aminoglikosida, Kontras)'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Medis & Dosis',
        description: 'Perhitungan CrCl Cockcroft-Gault dan penyesuaian dosis obat ginjal.'
      },
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol CKD dan pencegahan nefrotoksisitas.'
      }
    ],
    officialUrl: 'https://pernefri.org',
    officialUrlLabel: 'Publikasi Resmi PERNEFRI',
    citation: 'PERNEFRI. Konsensus Penatalaksanaan Penyakit Ginjal Kronik di Indonesia. 2023.',
    badgeColor: 'bg-purple-600 text-white'
  },
  {
    id: 'lit-pogi-obstetri',
    title: 'Pedoman Nasional Preeklampsia & Terapi Kehamilan POGI',
    institution: 'Perkumpulan Obstetri dan Ginekologi Indonesia (POGI)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'PNPK Preeklampsia & Hipertensi Kehamilan POGI',
    releaseYear: '2022 / 2023',
    lastUpdated: 'November 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman keselamatan terapi pada wanita hamil dan menyusui: tata laksana preeklampsia dengan MgSO4, obat antihipertensi lini pertama kehamilan (Methyldopa, Nifedipine, Labetalol), serta profilaksis Aspirin dosis rendah.',
    keyTopics: [
      'Kontraindikasi Mutlak ACEi / ARB pada Trimester 2 & 3',
      'Protokol MgSO4 Loading & Maintenance pada Preeklampsia Berat',
      'Pencegahan Preeklampsia dengan Aspirin 80-150 mg Sejak Trimester 1',
      'Klasifikasi Keamanan Obat Laktasi & Transfer ASI'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol hipertensi gestasional dan preeklampsia.'
      },
      {
        tabId: 'side-effects',
        featureName: 'Cek Efek Samping & ADR',
        description: 'Skrining keamanan obat kehamilan (FDA Kategori A, B, C, D, X & Teratogenik).'
      }
    ],
    officialUrl: 'https://pogi.or.id',
    officialUrlLabel: 'Publikasi Resmi PB POGI',
    citation: 'POGI. Pedoman Nasional Pelayanan Kedokteran Preeklampsia. Jakarta: PB POGI, 2022.',
    badgeColor: 'bg-pink-600 text-white'
  },
  {
    id: 'lit-ira-reumatologi',
    title: 'Pedoman Diagnosis & Pengelolaan Artritis Reumatoid & Gout IRA',
    institution: 'Indonesian Rheumatology Association (IRA)',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Rekomendasi IRA Gout & RA 2023',
    releaseYear: '2023',
    lastUpdated: 'Desember 2024',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Rekomendasi terkini tata laksana Artritis Gout akut (Kolchisin, NSAID, Kortikosteroid), terapi penurun asam urat (Allopurinol, Febuxostat) berbasis target sUA < 6.0 mg/dL, dan DMARDs pada Artritis Reumatoid.',
    keyTopics: [
      'Inisiasi Allopurinol Dimulai Dosis Rendah (100 mg/hari) dengan Titrasi',
      'Skrining HLA-B*5801 & Pencegahan Steven-Johnson Syndrome',
      'Pemberian Profilaksis Kolchisin saat Inisiasi Urate-Lowering Therapy (ULT)',
      'Methotrexate sebagai DMARD Lini Pertama pada Artritis Reumatoid'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Algoritma hiperurisemia, asam urat akut, dan target sUA.'
      }
    ],
    officialUrl: 'https://reumatologi.or.id',
    officialUrlLabel: 'Publikasi Resmi IRA Reumatologi',
    citation: 'Indonesian Rheumatology Association. Pedoman Diagnosis dan Pengelolaan Artritis Gout & Reumatoid. 2023.',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'lit-tbc-kemenkes',
    title: 'Pedoman Nasional Pelayanan Kedokteran Tata Laksana Tuberkulosis',
    institution: 'Kementerian Kesehatan RI & Komite Ahli TB Nasional',
    category: 'guidelines',
    categoryLabel: 'Pedoman Klinis & PNPK',
    documentCode: 'Kepmenkes No. HK.01.07/MENKES/755/2023',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A',
    summary: 'Protokol baku terapi TB Sensitif Obat (Kombipak FDC 2RHZE/4RH) dan paduan jangka pendek TB Resisten Obat (TB-RO BPaL/BPaLM: Bedaquiline, Pretomanid, Linezolid, Moxifloxacin) serta pemantauan hepatotoksisitas (DILI).',
    keyTopics: [
      'Dosis Fixed-Dose Combination (FDC) Berbasis Berat Badan Pasien',
      'Penatalaksanaan Drug-Induced Liver Injury (DILI) akibat OAT',
      'Suplementasi Vitamin B6 (Piridoksin) untuk Mencegah Neuropati INH',
      'Interaksi Enzimatis Rifampisin (Induser Kuat CYP3A4 & P-gp)'
    ],
    appliedInFeatures: [
      {
        tabId: 'guidelines',
        featureName: 'Panduan Terapi Klinis',
        description: 'Protokol terapi TB paru, ekstra paru, dan dosis OAT FDC.'
      },
      {
        tabId: 'interactions',
        featureName: 'Cek Interaksi Obat',
        description: 'Deteksi penurunan efektivitas obat lain akibat induksi Rifampisin.'
      }
    ],
    officialUrl: 'https://tbindonesia.or.id',
    officialUrlLabel: 'Portal Resmi TB Indonesia Kemenkes',
    citation: 'Kemenkes RI. Petunjuk Teknis Penatalaksanaan Tuberkulosis di Fasilitas Pelayanan Kesehatan. 2023.',
    badgeColor: 'bg-teal-700 text-white'
  },

  // =========================================================================
  // 2. PEDIATRI & PERACIKAN PUYER (3 SUMBER)
  // =========================================================================
  {
    id: 'lit-idai-pediatrik',
    title: 'Panduan Dosis Terapi & Pedoman Pelayanan Medis Anak IDAI',
    institution: 'Ikatan Dokter Anak Indonesia (IDAI)',
    category: 'pediatric_special',
    categoryLabel: 'Dosis Pediatrik & Puyer',
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
  {
    id: 'lit-farmakope-puyer',
    title: 'Farmakope Indonesia Edisi VI: Standar Sediaan Serbuk Bagi (Puyer)',
    institution: 'Kementerian Kesehatan Republik Indonesia & Komite Farmakope',
    category: 'pediatric_special',
    categoryLabel: 'Dosis Pediatrik & Puyer',
    documentCode: 'Kepmenkes RI No. HK.01.07/MENKES/420/2020 (FI VI)',
    releaseYear: '2020 - 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Monograf resmi peracikan serbuk terbagi (*pulveres*): keseragaman bobot, batas maksimum bobot puyer (300-500 mg), pemilihan zat pengisi inert (Saccharum Lactis), serta penetapan Beyond-Use Date (BUD) racikan padat non-steril.',
    keyTopics: [
      'Kalkulasi Kebutuhan Zat Pengisi (Saccharum Lactis / Dextrose)',
      'Penetapan Beyond-Use Date (BUD) Puyer Maksimal 25% Waktu Kedaluwarsa Asli atau 6 Bulan',
      'Ketentuan Larangan Membuka Tablet Salut Enterik atau Sediaan Lepas Lambat (SR/ER)',
      'Keseragaman Bobot Tiap Bungkus Serbuk Terbagi'
    ],
    appliedInFeatures: [
      {
        tabId: 'pediatric',
        featureName: 'Dosis Pediatrik & Puyer',
        description: 'Kalkulator konversi tablet utuh ke jumlah bungkus puyer dan bobot pengisi SL.'
      }
    ],
    officialUrl: 'https://farmakope.kemkes.go.id',
    officialUrlLabel: 'Portal Resmi Farmakope Indonesia',
    citation: 'Kemenkes RI. Farmakope Indonesia Edisi VI. Jakarta: Direktorat Jenderal Kefarmasian dan Alat Kesehatan, 2020.',
    badgeColor: 'bg-slate-700 text-white'
  },
  {
    id: 'lit-nelson-harriet',
    title: "Harriet Lane Handbook & Nelson Textbook of Pediatrics (Dosing Standard)",
    institution: "The Johns Hopkins Hospital & Elsevier Health Sciences",
    category: 'pediatric_special',
    categoryLabel: 'Dosis Pediatrik & Puyer',
    documentCode: "The Harriet Lane Handbook 23rd Edition",
    releaseYear: '2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman rujukan dunia (*World Standard Reference*) dalam penentuan dosis terapeutik, batas dosis toksik per hari, dan interval pemberian obat pediatrik serta neonatus di seluruh instalasi perawatan intensif anak (PICU/NICU).',
    keyTopics: [
      'Formula Mosteller & DuBois untuk Luas Permukaan Tubuh (BSA m²)',
      'Batas Dosis Maksimal Anak Tidak Boleh Melampaui Dosis Dewasa',
      'Penyesuaian Klirens Ginjal pada Bayi Kurang Bulan (Prematur)',
      'Dosis Resusitasi Kedaruratan Anak & Titrasi Inotropik'
    ],
    appliedInFeatures: [
      {
        tabId: 'pediatric',
        featureName: 'Dosis Pediatrik & Puyer',
        description: 'Validasi batas dosis maksimum harian pada kalkulator anak.'
      }
    ],
    officialUrl: 'https://www.elsevier.com',
    officialUrlLabel: 'Harriet Lane Pediatric Reference',
    citation: "Johns Hopkins Hospital. The Harriet Lane Handbook: A Manual for Pediatric House Officers. 23rd ed. Philadelphia: Elsevier, 2024.",
    badgeColor: 'bg-rose-600 text-white'
  },

  // =========================================================================
  // 3. INJEKSI PARENTERAL & STERIL (3 SUMBER)
  // =========================================================================
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
  {
    id: 'lit-usp-797',
    title: 'USP General Chapter <797>: Pharmaceutical Compounding – Sterile Preparations',
    institution: 'United States Pharmacopeial Convention (USP)',
    category: 'iv_sterile',
    categoryLabel: 'Injeksi & IV Steril',
    documentCode: 'USP-NF Chapter <797> Revised Standard',
    releaseYear: '2023 / 2024',
    lastUpdated: 'Februari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Standar global dalam penyiapan sediaan steril (IV Admixture): klasifikasi ruangan bersih (Cleanroom ISO Class 5/7/8), teknik aseptik, serta matriks penetapan Beyond-Use Date (BUD) sediaan suntik berdasarkan kategori risiko kontaminasi mikroba.',
    keyTopics: [
      'BUD Kategori 1 (Segera Pakai / Non-Cleanroom): 4 Jam Suhu Ruang',
      'BUD Kategori 2 (Cleanroom Aseptis): 4 Hari Suhu Ruang / 10 Hari Suhu 2-8°C',
      'Pencegahan Pembentukan Partikulat & Penanganan Obat Sitotoksik (USP <800>)',
      'Persyaratan Alat Pelindung Diri (APD) dan Laminar Air Flow (LAF)'
    ],
    appliedInFeatures: [
      {
        tabId: 'iv-compatibility',
        featureName: 'Kompatibilitas Injeksi IV',
        description: 'Rekomendasi Beyond-Use Date (BUD) dan batas jam penyimpanan sediaan rekonstitusi.'
      },
      {
        tabId: 'sop',
        featureName: 'SOP Farmasi',
        description: 'SOP Pencampuran Obat Suntik & Penanganan Obat Sitostatika.'
      }
    ],
    officialUrl: 'https://www.usp.org',
    officialUrlLabel: 'USP Sterile Compounding Standards',
    citation: 'United States Pharmacopeial Convention. USP <797> Pharmaceutical Compounding - Sterile Preparations. Rockville: USP, 2023.',
    badgeColor: 'bg-cyan-700 text-white'
  },
  {
    id: 'lit-king-guide-iv',
    title: 'King Guide to Parenteral Admixtures & Clinical Compatibility',
    institution: 'King Guide Publications Inc.',
    category: 'iv_sterile',
    categoryLabel: 'Injeksi & IV Steril',
    documentCode: 'King Guide Parenteral Reference 2024',
    releaseYear: '2024',
    lastUpdated: 'Desember 2024',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Database komprehensif stabilitas dan kompatibilitas obat suntik di rumah sakit, memuat lebih dari 500 zat parenteral dengan penekanan pada cairan infus elektrolit pekat (KCl, NaCl 3%, Kalsium Glukonat).',
    keyTopics: [
      'Inkompatibilitas Cairan Pembawa Ringer Laktat (Kandungan Kalsium)',
      'Kompatibilitas Syringe Pump Jalur Tunggal pada Pasien Kritis ICU',
      'Stabilitas Obat Inotropik (Norepinephrine, Dobutamine, Epinephrine)',
      'Perubahan Warna & Oksidasi Molekul Terlarut'
    ],
    appliedInFeatures: [
      {
        tabId: 'iv-compatibility',
        featureName: 'Kompatibilitas Injeksi IV',
        description: 'Pemeriksaan cairan pembawa infus yang kompatibel dan catatan khusus stabilitas.'
      }
    ],
    officialUrl: 'https://kingguide.com',
    officialUrlLabel: 'Portal King Guide Online',
    citation: 'King Guide Publications. King Guide to Parenteral Admixtures. Napa, CA: King Guide Publications, 2024.',
    badgeColor: 'bg-teal-600 text-white'
  },

  // =========================================================================
  // 4. INTERAKSI OBAT, FARMAKOVIGILANS & ADR (4 SUMBER)
  // =========================================================================
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
  {
    id: 'lit-naranjo-adverse',
    title: 'Algoritma Skala Probabilitas Efek Samping Obat Naranjo (ADR)',
    institution: 'World Health Organization (WHO) & Clinical Pharmacology',
    category: 'interactions',
    categoryLabel: 'Interaksi & Keamanan',
    documentCode: 'Naranjo ADR Probability Scale Standard',
    releaseYear: 'Standard Klinis Internasional',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Kuesioner standar baku internasional berisi 10 pertanyaan validasi kausalitas untuk menentukan apakah kejadian tidak diinginkan (KTD / ADR) pada pasien disebabkan oleh obat tertentu (Skor: Definite, Probable, Possible, Doubtful).',
    keyTopics: [
      'Hubungan Waktu Pemberian Obat dan Munculnya Gejala (De-challenge)',
      'Efek Penghentian Obat & Reaksi Pemberian Ulang (Re-challenge)',
      'Konfirmasi Kadar Obat dalam Darah / Bukti Objektif Laboratorium',
      'Pelaporan MESO (Monitoring Efek Samping Obat) ke BPOM RI'
    ],
    appliedInFeatures: [
      {
        tabId: 'side-effects',
        featureName: 'Cek Efek Samping & ADR',
        description: 'Kalkulator penilai kausalitas ADR Naranjo terintegrasi.'
      },
      {
        tabId: 'sop',
        featureName: 'SOP Farmasi',
        description: 'SOP Pelaporan Efek Samping Obat (MESO / Formulir Kuning BPOM).'
      }
    ],
    officialUrl: 'https://www.who.int/teams/regulation-prequalification/pharmacovigilance',
    officialUrlLabel: 'WHO Pharmacovigilance Program',
    citation: 'Naranjo CA, et al. A method for estimating the probability of adverse drug reactions. Clin Pharmacol Ther. 1981;30(2):239-245.',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'lit-lexicomp-clinical',
    title: 'Lexicomp Drug Information & Clinical Pharmacology Database',
    institution: 'Wolters Kluwer Health Clinical Solutions',
    category: 'interactions',
    categoryLabel: 'Interaksi & Keamanan',
    documentCode: 'Lexicomp Clinical Drug Reference',
    releaseYear: '2024 / 2025',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Pangkalan data farmakologi klinis terpercaya untuk penentuan parameter farmakokinetik: ikatan protein plasma, waktu paruh eliminasi (t1/2), rute ekskresi renal vs biliar, dan indeks terapi sempit (*Narrow Therapeutic Index*).',
    keyTopics: [
      'Obat Indeks Terapi Sempit (Warfarin, Digoxin, Teofilin, Fenitoin, Litium, Siklosporin)',
      'Manajemen Therapeutic Drug Monitoring (TDM)',
      'Faktor Pemanjangan Interval QTc dan Risiko Torsades de Pointes',
      'Penyesuaian Dosis Obesitas Berdasarkan IBW vs Adjusted Body Weight (ABW)'
    ],
    appliedInFeatures: [
      {
        tabId: 'interactions',
        featureName: 'Cek Interaksi Obat',
        description: 'Peringatan risiko aritmia pemanjangan QTc dan obat indeks terapi sempit.'
      },
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Medis & Dosis',
        description: 'Kalkulator Berat Badan Ideal (IBW) dan Klirens Ginjal terstandarisasi.'
      }
    ],
    officialUrl: 'https://www.wolterskluwer.com/en/solutions/lexicomp',
    officialUrlLabel: 'Lexicomp Clinical Drug Reference',
    citation: 'Wolters Kluwer. Lexicomp Drug Information Handbook. Hudson, OH: Wolters Kluwer Clinical Drug Information, 2024.',
    badgeColor: 'bg-emerald-600 text-white'
  },

  // =========================================================================
  // 5. FORMASI, BPOM & REGULASI KEFARMASIAN (5 SUMBER)
  // =========================================================================
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
  {
    id: 'lit-dowa-kemenkes',
    title: 'Daftar Obat Wajib Apotek (DOWA 1, 2, dan 3) Kemenkes RI',
    institution: 'Kementerian Kesehatan Republik Indonesia',
    category: 'regulations',
    categoryLabel: 'Regulasi & SOP',
    documentCode: 'Kepmenkes No. 347/1990, No. 924/1993, & No. 1176/1999',
    releaseYear: 'Standar Nasional Indonesia',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A',
    summary: 'Pedoman resmi daftar obat keras yang dapat diserahkan oleh Apoteker kepada pasien di apotek tanpa resep dokter, lengkap dengan batas maksimal jumlah penyerahan dan kewajiban pencatatan edukasi pasien.',
    keyTopics: [
      'DOWA 1: Kontrasepsi Oral, Obat Saluran Cerna (Antasida/Ranitidine), Analgetik',
      'DOWA 2: Antiinflamasi Topikal, Antihistamin, Antiulkus',
      'DOWA 3: Antiasma Inhalasi, Antibiotik Topikal Tertentu',
      'Kewajiban Pelayanan Informasi Obat (PIO) Tertulis saat Penyerahan DOWA'
    ],
    appliedInFeatures: [
      {
        tabId: 'regulations',
        featureName: 'Regulasi Farmasi',
        description: 'Daftar lengkap golongan obat DOWA 1, 2, dan 3 beserta batasan serah.'
      },
      {
        tabId: 'whatsapp-pio',
        featureName: 'Kartu PIO WhatsApp',
        description: 'Penyusunan etiket edukasi penyerahan obat mandiri (swamedikasi).'
      }
    ],
    officialUrl: 'https://peraturan.go.id',
    officialUrlLabel: 'JDIH Peraturan DOWA Kemenkes',
    citation: 'Kemenkes RI. Keputusan Menteri Kesehatan tentang Daftar Obat Wajib Apotek No. 1, 2, dan 3. Jakarta: Kemenkes RI.',
    badgeColor: 'bg-amber-700 text-white'
  },

  // =========================================================================
  // 6. KALKULATOR MEDIS & FARMAKOKINETIKA (3 SUMBER)
  // =========================================================================
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
  },
  {
    id: 'lit-calc-mme-cdc',
    title: 'CDC Clinical Practice Guideline for Prescribing Opioids & MME Conversion',
    institution: 'Centers for Disease Control and Prevention (CDC)',
    category: 'calculators',
    categoryLabel: 'Kalkulator Farmakoterapi',
    documentCode: 'CDC Opioid Prescribing Guideline 2022',
    releaseYear: '2022 / 2024',
    lastUpdated: 'Januari 2025',
    evidenceLevel: 'Level 1 (Meta-Analisis / RCT)',
    evidenceGrade: 'Grade A',
    summary: 'Standar konversi ekuivalen dosis opioid harian (*Morphine Milligram Equivalent / MME*) untuk mencegah overdosis depresi napas dan memfasilitasi rotasi opioid yang aman pada terapi nyeri paliatif & kanker.',
    keyTopics: [
      'Faktor Konversi Morfin Oral ke Fentanil Patch, Oksikodon, dan Kodein',
      'Ambang Batas Keamanan: Dosis >= 50 MME/hari Memerlukan Pemantauan Ketat',
      'Ambang Batas Bahaya: Dosis >= 90 MME/hari Harus Dihindari Tanpa Justifikasi Ahli',
      'Pencegahan Interaksi Opioid + Benzodiazepin (Black Box Warning)'
    ],
    appliedInFeatures: [
      {
        tabId: 'renal-adjuster',
        featureName: 'Kalkulator Medis & Dosis',
        description: 'Kalkulator konversi MME opioid dan peringatan ambang batas keamanan.'
      }
    ],
    officialUrl: 'https://www.cdc.gov/opioids',
    officialUrlLabel: 'CDC Opioid Clinical Guidelines',
    citation: 'Dowell D, et al. CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. MMWR Recomm Rep 2022;71(No. RR-3):1–95.',
    badgeColor: 'bg-rose-700 text-white'
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
    description: 'PNPK Kemenkes RI dan Konsensus Spesialis (PERKI, PERKENI, PAPDI, PDPI, PERDOSSI, POGI)',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'guidelines').length
  },
  {
    id: 'pediatric_special',
    label: 'Pediatrik & Puyer',
    description: 'IDAI, Farmakope Indonesia VI (Serbuk Bagi), dan Harriet Lane Handbook',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'pediatric_special').length
  },
  {
    id: 'interactions',
    label: 'Interaksi & Keamanan',
    description: 'DDInter Database, Nature Digital Medicine, Lexicomp, dan Skala Naranjo ADR',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'interactions').length
  },
  {
    id: 'iv_sterile',
    label: 'Injeksi & IV Steril',
    description: "Trissel's™ 2024 Handbook on Injectable Drugs, USP <797>, dan King Guide",
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
    description: 'UU Kesehatan No. 17/2023, Permenkes 73/2016 Apotek, dan DOWA 1, 2, 3',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'regulations').length
  },
  {
    id: 'calculators',
    label: 'Kalkulator Farmakoterapi',
    description: 'KDIGO Cockcroft-Gault, CKD-EPI, Child-Pugh, dan CDC Opioid MME',
    count: CLINICAL_LITERATURE_DATABASE.filter(d => d.category === 'calculators').length
  }
];

export const FEATURE_EVIDENCE_MAPPING = [
  {
    feature: 'Cek Interaksi Obat & Skrining Polifarmasi',
    primarySource: 'DDInter (Zhejiang University / Nature npj), Drugs.com & Lexicomp Drug Interactions',
    standards: 'Tingkat Keparahan Major/Moderate/Minor, Mekanisme CYP450, P-gp & Aritmia QTc',
    evidenceLevel: 'Level 1 (RCT & Clinical Trials)'
  },
  {
    feature: 'Kompatibilitas Injeksi IV (Y-Site & Stabilitas)',
    primarySource: "Trissel's™ 2024 Handbook on Injectable Drugs (ASHP), USP <797> & King Guide",
    standards: 'Pencampuran Y-Site, Presipitasi Asam-Basa, Rekonstitusi Pelarut, Stabilitas BUD',
    evidenceLevel: 'Level 1 (Gold Standard ASHP)'
  },
  {
    feature: 'Panduan Terapi Klinis & Dosis Dewasa',
    primarySource: 'PNPK Kemenkes RI, Konsensus PERKI, PERKENI, PAPDI, PDPI, PERDOSSI, PERNEFRI, POGI',
    standards: 'Algoritma Terapi Lini Pertama & Kedua, Target Klinis HbA1c/Tensi, FORNAS BPJS',
    evidenceLevel: 'Level 2 (PNPK & Konsensus Spesialis)'
  },
  {
    feature: 'Dosis Pediatrik & Konversi Racikan Puyer',
    primarySource: 'Panduan Praktik Klinis IDAI, Farmakope Indonesia VI & Harriet Lane Handbook',
    standards: 'Dosis Berbasis mg/kgBB dan BSA (m²), Kalkulasi Zat Pengisi SL / Bobot Puyer',
    evidenceLevel: 'Level 2 (IDAI / Farmakope VI)'
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
    primarySource: 'UU No. 17 Tahun 2023, Permenkes No. 73/2016 (Apotek) & Daftar DOWA 1, 2, 3',
    standards: 'Skrining Resep, Dispensing, Edukasi PIO Pasien, Penyimpanan High-Alert & LASA',
    evidenceLevel: 'Level 3 (Standar Wajib Kemenkes)'
  }
];
