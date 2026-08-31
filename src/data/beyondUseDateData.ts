export type DosageFormCategory =
  | 'non_aqueous_solid' // Puyer, Kapsul, Salep Anhidrat (6 bln / 25% ED)
  | 'oral_water_containing' // Sirup oral berair, Suspensi oral racikan (14 hari 2-8°C)
  | 'topical_water_containing' // Krim, Gel, Pasta, Lotion berair (30 hari suhu ruang)
  | 'commercial_dry_syrup' // Sirup Kering Rekonstitusi Pabrik (7-14 hari)
  | 'sterile_sdv' // Single-Dose Vial / Ampul (1 jam non-LAF / 6 jam LAF)
  | 'sterile_mdv' // Multi-Dose Vial dengan pengawet (28 hari)
  | 'ophthalmic_multidose' // Tetes mata botol multi-dose (28 hari)
  | 'ophthalmic_minidose'; // Tetes mata minidose tanpa pengawet (3x24 jam)

export interface CommercialDrugReconstitution {
  id: string;
  drugName: string;
  genericName: string;
  formType: 'Dry Syrup' | 'Injeksi IV/IM Powder' | 'Sediaan Oftalmik' | 'Injeksi Insulin';
  brandExamples: string[];
  reconstitutionDiluent: string;
  volumeOrInstruction: string;
  budRoomTemp: string; // Suhu ruang (20-25°C)
  budRefrigerated: string; // Suhu dingin (2-8°C)
  storageNotes: string;
  references: string;
}

export interface BudDosageRule {
  id: DosageFormCategory;
  name: string;
  uspStandard: 'USP <795>' | 'USP <797>' | 'Farmakope Indonesia VI';
  maxBudFormula: string;
  storageCondition: string;
  description: string;
  examples: string[];
  clinicalPearls: string[];
}

export const BUD_DOSAGE_RULES: BudDosageRule[] = [
  {
    id: 'non_aqueous_solid',
    name: 'Sediaan Padat & Semisolid Tanpa Air (Non-Aqueous Formulations)',
    uspStandard: 'USP <795>',
    maxBudFormula: 'Maksimal 180 hari (6 bulan) ATAU 25% dari sisa masa kadaluarsa (ED) bahan baku terdekat (pilih waktu paling singkat).',
    storageCondition: 'Suhu Kamar Terkontrol (20°C - 25°C), terlindung dari cahaya & kelembapan.',
    description: 'Sediaan racikan yang tidak mengandung fase air bebas dalam formulanya. Ketiadaan air membatasi pertumbuhan mikroorganisme patogen dan hidrolisis kimia zat aktif.',
    examples: [
      'Puyer / Pulveres / Serbuk Bagi (kemasan kertas perkamen / puyer press)',
      'Kapsul keras racikan',
      'Salep basis hidrokarbon / anhidrat murni (Vaseline album, Cera alba)',
      'Suppositoria berbasis Oleum Cacao / Lemak Padat / PEG tanpa air'
    ],
    clinicalPearls: [
      'Contoh: Jika sisa ED obat bahan baku adalah 12 bulan, maka 25% x 12 bulan = 3 bulan (BUD adalah 3 bulan, bukan 6 bulan).',
      'Jika sisa ED obat bahan baku adalah 36 bulan, maka 25% x 36 bulan = 9 bulan. Karena batas maksimal adalah 6 bulan, maka BUD ditetapkan 6 bulan.',
      'Kemasan puyer wajib kedap udara untuk mencegah penyerapan uap lembap yang memicu penggumpalan (caking).'
    ]
  },
  {
    id: 'oral_water_containing',
    name: 'Sediaan Cair Oral Mengandung Air (Water-Containing Oral Liquids)',
    uspStandard: 'USP <795>',
    maxBudFormula: 'Maksimal 14 HARI bila disimpan dalam lemari pendingin (2°C - 8°C).',
    storageCondition: 'Wajib Lemari Pendingin / Kulkas (2°C - 8°C). DILARANG dibekukan di freezer.',
    description: 'Larutan oral, suspensi racikan, atau campuran puyer ke dalam sirup pembawa yang mengandung air. Rentan terhadap pertumbuhan jamur, bakteri, dan degradasi hidrolitik.',
    examples: [
      'Suspensi racikan oral (misal: racikan puyer Paracetamol/Captopril dalam sirup simpleks/air)',
      'Larutan oral racikan berbasis aquades',
      'Emulsi oral tipe M/A racikan'
    ],
    clinicalPearls: [
      'Sediaan cair oral berair TIDAK BOLEH disimpan pada suhu ruang jika melebihi batas beberapa hari tanpa studi stabilitas tervalidasi.',
      'Edukasi pasien/keluarga untuk selalu mengocok botol (kocok dahulu) sebelum diminum dan simpan di pintu kulkas (bukan freezer).'
    ]
  },
  {
    id: 'topical_water_containing',
    name: 'Sediaan Topikal & Mukosal Mengandung Air (Topical/Dermal Liquids & Semisolids)',
    uspStandard: 'USP <795>',
    maxBudFormula: 'Maksimal 30 HARI (1 bulan) pada suhu kamar terkontrol (20°C - 25°C).',
    storageCondition: 'Suhu Kamar Terkontrol (20°C - 25°C) di tempat sejuk dan kering.',
    description: 'Sediaan semisolid racikan yang mengandung fase air bebas seperti krim, gel, dan lotion untuk penggunaan topikal kulit atau mukosa.',
    examples: [
      'Krim racikan (misal: campuran Krim Hidrokortison + Krim Ketokonazol)',
      'Gel berbasis karbomer/hidrogel berair',
      'Pasta dan lotion kulit yang mengandung air',
      'Larutan kumur (gargle) atau tetes hidung racikan berair'
    ],
    clinicalPearls: [
      'Mencampurkan dua krim pabrik yang berbeda berpotensi merusak sistem emulsi (cracking/creaming) dan menurunkan efektivitas pengawet.',
      'Tuliskan tanggal racik dan tanggal BUD dengan jelas pada etiket warna BIRU untuk sediaan luar.'
    ]
  },
  {
    id: 'commercial_dry_syrup',
    name: 'Sirup Kering Rekonstitusi Pabrik (Commercial Dry Syrup)',
    uspStandard: 'Farmakope Indonesia VI',
    maxBudFormula: 'Umumnya 7 HINGGA 14 HARI setelah ditambahkan air (sesuai monografi pabrik pembuat).',
    storageCondition: 'Suhu dingin (2°C - 8°C) atau suhu ruang terkontrol sesuai brosur resmi masing-masing obat.',
    description: 'Sediaan serbuk antibiotik pabrik yang direkonstitusi dengan air minum matang/aquades di apotek saat penyerahan resep.',
    examples: [
      'Amoxicillin Dry Syrup (7-14 hari)',
      'Co-Amoxiclav / Clavamox Dry Syrup (7 hari di kulkas 2-8°C)',
      'Cefixime Dry Syrup (7-14 hari)',
      'Azithromycin Dry Syrup (10 hari suhu ruang)'
    ],
    clinicalPearls: [
      'Co-amoxiclav (Amoksisilin + Asam Klavulanat) sangat sensitif terhadap kelembapan; asam klavulanat cepat terurai jika dibiarkan pada suhu ruang.',
      'Beri tanda garis volume air pada botol dan jelaskan cara penyimpanan kepada orang tua pasien pediatrik.'
    ]
  },
  {
    id: 'sterile_sdv',
    name: 'Sediaan Steril: Single-Dose Vial (SDV) & Ampul',
    uspStandard: 'USP <797>',
    maxBudFormula: 'Maksimal 1 JAM jika ditusuk di luar ruang LAF (lingkungan bangsal/kamar operasi); Maksimal 6 JAM jika ditusuk di dalam LAF ISO Class 5.',
    storageCondition: 'Gunakan sesegera mungkin. Simpan sesuai petunjuk stabilitas kimia obat.',
    description: 'Vial dosis tunggal tanpa bahan pengawet antimikroba (preservative-free) dan ampul kaca.',
    examples: [
      'Ampul Fentanyl, Morfin, Petidin (Buka langsung pakai, sisa WAJIB DIBUANG)',
      'Single-Dose Vial Ceftriaxone, Meropenem, Omeprazole Injeksi',
      'Infus asam amino / cairan parenteral tanpa pengawet'
    ],
    clinicalPearls: [
      'Ampul kaca yang telah dipatahkan TIDAK MEMILIKI BUD (harus segera diinjeksi/dimasukkan infus, sisa tidak boleh disimpan).',
      'Single-Dose Vial yang ditusuk di bangsal perawatan terbuka hanya berlaku 1 jam karena ketiadaan pengawet memudahkan kolonisasi bakteri.'
    ]
  },
  {
    id: 'sterile_mdv',
    name: 'Sediaan Steril: Multi-Dose Vial (MDV) Berpengawet',
    uspStandard: 'USP <797>',
    maxBudFormula: 'Maksimal 28 HARI setelah tusukan pertama (first puncture), kecuali dinyatakan lain oleh pabrik.',
    storageCondition: 'Suhu dingin (2°C - 8°C) atau suhu ruang sejuk (<30°C) sesuai karakteristik obat.',
    description: 'Vial multidosis yang diformulasikan secara khusus dengan penambahan agen pengawet antimikroba (contoh: kresol, fenol, benzil alkohol, klorobutanol).',
    examples: [
      'Insulin Pen / Vial (Novorapid, Lantus, Levemir, Sansulin)',
      'Vial Multidosis Lidocain HCl 2% dengan pengawet',
      'Vial Multidosis Vaksin dengan pengawet thimerosal'
    ],
    clinicalPearls: [
      'Insulin Pen yang SEDANG DIGUNAKAN (in use) disimpan pada suhu ruang (<30°C) dan tahan 28 hari (Lantus/Novorapid) atau 42-56 hari (Tresiba/Toujeo). JANGAN simpan insulin in-use di dalam freezer!',
      'Wajib tulis tanggal pertama kali dibuka pada badan pen/vial.'
    ]
  },
  {
    id: 'ophthalmic_multidose',
    name: 'Sediaan Tetes Mata / Salep Mata Botol Multidose',
    uspStandard: 'Farmakope Indonesia VI',
    maxBudFormula: 'Maksimal 28 HARI (4 Minggu) setelah segel botol pertama kali dibuka.',
    storageCondition: 'Suhu ruang terkontrol (<25°C - 30°C) atau lemari pendingin (2°C - 8°C) sesuai jenis zat aktif.',
    description: 'Sediaan oftalmik steril dalam kemasan botol tetes multipel yang mengandung pengawet antimikroba (umumnya Benzalkonium Klorida 0.01%).',
    examples: [
      'Botol Cendo Xitrol, Cendo Tobroson, Cendo Fenicol',
      'Tetes mata Glaukoma (Timolol, Latanoprost)',
      'Salep mata steril (Chloramphenicol / Gentamicin eye ointment)'
    ],
    clinicalPearls: [
      'Ujung penetes botol TIDAK BOLEH menyentuh bulu mata, kornea, atau jari tangan untuk mencegah kontaminasi silang bakteri Pseudomonas aeruginosa.',
      'Setelah 28 hari, efektivitas pengawet menurun drastis dan sediaan harus dibuang meskipun cairan masih tersisa banyak.'
    ]
  },
  {
    id: 'ophthalmic_minidose',
    name: 'Sediaan Tetes Mata Minidose / Unit-Dose (Tanpa Pengawet)',
    uspStandard: 'Farmakope Indonesia VI',
    maxBudFormula: 'Maksimal 3 x 24 JAM (72 Jam) setelah tutup tube minidose dipatahkan/dibuka dan ditutup kembali.',
    storageCondition: 'Suhu ruang sejuk terkontrol, simpan dalam wadah foil aslinya.',
    description: 'Sediaan tetes mata strip tanpa bahan pengawet (preservative-free) untuk pasien mata kering kronis atau pasca operasi katarak/lasik.',
    examples: [
      'Cendo Cenfresh Minidose (Carboxymethylcellulose sodium)',
      'Cendo Lyteers Minidose',
      'Cendo Hyalub Minidose'
    ],
    clinicalPearls: [
      'Karena tidak mengandung pengawet benzalkonium klorida, toleransi okular sangat baik namun risiko kontaminasi mikroba tinggi jika disimpan melebihi 3 hari.',
      'Tutup kembali ujung minidose rapat-rapat setelah diteteskan.'
    ]
  }
];

export const COMMERCIAL_DRUG_RECONSTITUTIONS: CommercialDrugReconstitution[] = [
  // =========================================================================
  // SIRUP KERING (DRY SYRUP)
  // =========================================================================
  {
    id: 'rec-amoxicillin-dry',
    drugName: 'Amoxicillin Dry Syrup 125 mg / 250 mg per 5 mL',
    genericName: 'Amoxicillin Trihydrate',
    formType: 'Dry Syrup',
    brandExamples: ['Amoxil', 'Amoxsan', 'Kalmoxillin', 'Yusimox', 'Amoxicillin Generik'],
    reconstitutionDiluent: 'Air minum matang / Aquades dingin',
    volumeOrInstruction: 'Tambahkan air bertahap hingga tanda batas volume botol (umumnya 60 mL), lalu kocok kuat hingga suspensi homogen.',
    budRoomTemp: '7 Hari (Suhu Ruang < 25°C)',
    budRefrigerated: '14 Hari (Kulkas 2°C - 8°C)',
    storageNotes: 'Lebih direkomendasikan simpan di kulkas untuk mempertahankan potensi antibiotik.',
    references: 'Farmakope Indonesia VI & Brosur Resmi Pabrik'
  },
  {
    id: 'rec-coamoxiclav-dry',
    drugName: 'Co-Amoxiclav Dry Syrup (Amoxicillin + Clavulanate)',
    genericName: 'Amoxicillin + Potassium Clavulanate',
    formType: 'Dry Syrup',
    brandExamples: ['Augmentin', 'Clavamox', 'Claneksi', 'Co-Amoxiclav Generik'],
    reconstitutionDiluent: 'Aquades / Air matang dingin',
    volumeOrInstruction: 'Tambahkan air sesuai takaran tanda batas, kocok kuat.',
    budRoomTemp: 'TIDAK DISARANKAN (Asam klavulanat cepat rusak pada suhu ruang)',
    budRefrigerated: '7 HARI (Wajib Kulkas 2°C - 8°C)',
    storageNotes: 'Asam klavulanat sangat higroskopis dan mudah terhidrolisis. Setelah 7 hari dalam kulkas, sisa obat wajib dibuang.',
    references: 'USP-NF Monograph & GlaxoSmithKline Product Monograph'
  },
  {
    id: 'rec-cefixime-dry',
    drugName: 'Cefixime Dry Syrup 100 mg / 5 mL',
    genericName: 'Cefixime Trihydrate',
    formType: 'Dry Syrup',
    brandExamples: ['Cefspan', 'Cefila', 'Fixacep', 'Maxpro', 'Cefixime Generik'],
    reconstitutionDiluent: 'Air minum matang / Aquades',
    volumeOrInstruction: 'Tambahkan air matang sekitar 30 mL dalam 2 tahap, kocok hingga merata.',
    budRoomTemp: '14 Hari (Suhu Ruang < 30°C)',
    budRefrigerated: '14 Hari (Kulkas 2°C - 8°C)',
    storageNotes: 'Stabil pada suhu ruang maupun kulkas. Hindari paparan sinar matahari langsung.',
    references: 'Brosur Pabrik Cefspan & Farmakope Indonesia VI'
  },
  {
    id: 'rec-cefadroxil-dry',
    drugName: 'Cefadroxil Dry Syrup 125 mg / 250 mg per 5 mL',
    genericName: 'Cefadroxil Monohydrate',
    formType: 'Dry Syrup',
    brandExamples: ['Cefat', 'Lostacef', 'Droxal', 'Lapicef', 'Cefadroxil Generik'],
    reconstitutionDiluent: 'Air minum matang / Aquades',
    volumeOrInstruction: 'Tambahkan air hingga tanda batas botol (60 mL), kocok kuat hingga suspensi rata.',
    budRoomTemp: '7 Hari (Suhu Ruang < 25°C)',
    budRefrigerated: '14 Hari (Kulkas 2°C - 8°C)',
    storageNotes: 'Simpan botol tertutup rapat. Kocok dahulu sebelum diminum.',
    references: 'Farmakope Indonesia VI & Brosur Pabrik Sanbe Cefat'
  },
  {
    id: 'rec-azithromycin-dry',
    drugName: 'Azithromycin Dry Syrup 200 mg / 5 mL',
    genericName: 'Azithromycin Dihydrate',
    formType: 'Dry Syrup',
    brandExamples: ['Zithromax', 'Zithrolip', 'Azomax', 'Zistic', 'Azithromycin Generik'],
    reconstitutionDiluent: 'Air minum matang',
    volumeOrInstruction: 'Tambahkan air sesuai petunjuk takaran kemasan (umumnya 9 mL atau 12 mL), kocok kuat.',
    budRoomTemp: '10 HARI (Suhu Ruang 15°C - 30°C)',
    budRefrigerated: '10 Hari (Jangan dibekukan)',
    storageNotes: 'Simpan pada suhu ruang terkontrol.',
    references: 'Pfizer Zithromax Product Label'
  },
  {
    id: 'rec-erythromycin-dry',
    drugName: 'Erythromycin Ethylsuccinate Dry Syrup 200 mg / 5 mL',
    genericName: 'Erythromycin Ethylsuccinate',
    formType: 'Dry Syrup',
    brandExamples: ['Erysanbe', 'Pharothrocin', 'Erythrocin'],
    reconstitutionDiluent: 'Air minum matang',
    volumeOrInstruction: 'Tambahkan air hingga batas volume botol (60 mL), kocok hingga terlarut.',
    budRoomTemp: '7 Hari (Suhu Ruang)',
    budRefrigerated: '14 Hari (Kulkas 2°C - 8°C)',
    storageNotes: 'Eritromisin rentan terhadap hidrolisis asam; stabilitas lebih baik pada suhu dingin.',
    references: 'AHFS Drug Information'
  },

  // =========================================================================
  // SERBUK INJEKSI REKONSTITUSI STERIL
  // =========================================================================
  {
    id: 'rec-ceftriaxone-inj',
    drugName: 'Ceftriaxone Serbuk Injeksi 1 Gram',
    genericName: 'Ceftriaxone Sodium',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Rocephin', 'Broadced', 'Tericef', 'Ceftriaxone Generik'],
    reconstitutionDiluent: 'Water for Injection (WFI) untuk IV; Lidocain 1% untuk IM',
    volumeOrInstruction: 'Larutkan 1 g dengan 9.6 mL WFI (untuk IV) atau 3.5 mL Lidocain 1% (untuk IM).',
    budRoomTemp: '24 Jam (Suhu Ruang 25°C)',
    budRefrigerated: '72 Jam / 3 Hari (Kulkas 2°C - 8°C)',
    storageNotes: 'Warna larutan bervariasi dari kuning pucat hingga kuning amber tanpa mempengaruhi potensi.',
    references: 'AHFS Drug Information & Roche Rocephin Monograph'
  },
  {
    id: 'rec-cefotaxime-inj',
    drugName: 'Cefotaxime Serbuk Injeksi 1 Gram',
    genericName: 'Cefotaxime Sodium',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Claforan', 'Taxegram', 'Cefotaxime Generik'],
    reconstitutionDiluent: 'Water for Injection (WFI) 4 mL (IV/IM)',
    volumeOrInstruction: 'Larutkan 1 g dengan 4 mL WFI, kocok hingga jernih.',
    budRoomTemp: '12 Jam (Suhu Ruang 25°C)',
    budRefrigerated: '24 Jam (Kulkas 2°C - 8°C)',
    storageNotes: 'Lindungi dari paparan cahaya langsung. Jika larutan menggelap signifikan, buang.',
    references: 'Sanofi Claforan Product Monograph'
  },
  {
    id: 'rec-meropenem-inj',
    drugName: 'Meropenem Serbuk Injeksi 1 Gram',
    genericName: 'Meropenem Trihydrate',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Meronem', 'Meropenem Generik', 'Ronem'],
    reconstitutionDiluent: 'WFI atau NaCl 0.9%',
    volumeOrInstruction: 'Larutkan 1 g dengan 20 mL WFI untuk bolus IV lambat (5 menit) atau larutkan dalam 100 mL NaCl 0.9% untuk infus (15-30 menit).',
    budRoomTemp: '3 Jam (pada NaCl 0.9% Suhu Ruang)',
    budRefrigerated: '12 Jam (pada NaCl 0.9% Kulkas 2°C - 8°C)',
    storageNotes: 'Meropenem cepat terdegradasi cincin beta-laktamnya. Harus segera dihabiskan dalam 3 jam pasca rekonstitusi infus.',
    references: 'AstraZeneca Meronem Product Insert & Trissel’s Handbook on Injectable Drugs'
  },
  {
    id: 'rec-ampicillin-sulbactam',
    drugName: 'Ampicillin + Sulbactam Serbuk Injeksi 1.5 Gram',
    genericName: 'Ampicillin Sodium + Sulbactam Sodium',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Unasyn', 'Bactesyn', 'Viccillin-SX', 'Ampicillin-Sulbactam Generik'],
    reconstitutionDiluent: 'WFI 3.2 mL atau NaCl 0.9%',
    volumeOrInstruction: 'Larutkan vial 1.5 g dengan 3.2 mL WFI (konsentrasi 375 mg/mL) untuk IV lambat atau larutkan dalam 50-100 mL NaCl 0.9% untuk infus.',
    budRoomTemp: '8 Jam (dalam NaCl 0.9% Suhu Ruang)',
    budRefrigerated: '48 Jam (dalam NaCl 0.9% Kulkas 2°C - 8°C)',
    storageNotes: 'JANGAN gunakan pelarut Dextrose/Glukosa karena ampicillin cepat terhidrolisis pada larutan karbohidrat.',
    references: 'Pfizer Unasyn Package Insert & Trissel’s Handbook'
  },
  {
    id: 'rec-vancomycin-inj',
    drugName: 'Vancomycin Serbuk Injeksi 500 mg / 1 Gram',
    genericName: 'Vancomycin Hydrochloride',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Vancocin', 'Vancep', 'Vancomycin Generik'],
    reconstitutionDiluent: 'WFI 10 mL (untuk 500 mg) atau 20 mL (untuk 1 g)',
    volumeOrInstruction: 'Rekonstitusi dengan WFI, kemudian WAJIB diencerkan lebih lanjut dalam minimal 100 mL - 200 mL NaCl 0.9% atau D5W untuk infus lambat minimal 60 menit.',
    budRoomTemp: '24 Jam (Vial rekonstitusi)',
    budRefrigerated: '14 Hari (Kulkas 2°C - 8°C)',
    storageNotes: 'Infus terlalu cepat (<60 menit) memicu Red Man Syndrome (pelepasan histamin masif).',
    references: 'Eli Lilly Vancocin Prescribing Information & ASHP Therapeutic Guidelines'
  },
  {
    id: 'rec-omeprazole-inj',
    drugName: 'Omeprazole Serbuk Injeksi 40 mg',
    genericName: 'Omeprazole Sodium',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Losec Injeksi', 'Ozid IV', 'Omeprazole Generik', 'Inhipump IV'],
    reconstitutionDiluent: 'Pelarut Khusus Bawaan Pabrik (10 mL) atau Dextrose 5% / NaCl 0.9%',
    volumeOrInstruction: 'Larutkan dengan 10 mL pelarut khusus untuk injeksi IV lambat (minimal 2.5-4 menit).',
    budRoomTemp: '4 Jam (setelah dilarutkan dengan pelarut khusus)',
    budRefrigerated: 'TIDAK DISARANKAN disimpan (Harus segera diberikan)',
    storageNotes: 'Sangat sensitif terhadap pH asam dan cahaya. Jika larutan berubah warna menjadi keruh atau kecokelatan, buang segera.',
    references: 'AstraZeneca Losec IV Monograph'
  },
  {
    id: 'rec-pantoprazole-inj',
    drugName: 'Pantoprazole Serbuk Injeksi 40 mg',
    genericName: 'Pantoprazole Sodium',
    formType: 'Injeksi IV/IM Powder',
    brandExamples: ['Pantozol IV', 'Panloc IV', 'Pantoprazole Generik'],
    reconstitutionDiluent: 'NaCl 0.9% 10 mL',
    volumeOrInstruction: 'Rekonstitusi vial dengan 10 mL NaCl 0.9%, injeksikan bolus IV pelan selama minimal 2 menit atau encerkan dalam 100 mL infus.',
    budRoomTemp: '12 Jam (pada suhu ruang)',
    budRefrigerated: '24 Jam (Kulkas 2°C - 8°C)',
    storageNotes: 'Hindari pencampuran dengan larutan asam atau obat lain pada jalur infus yang sama.',
    references: 'Takeda Pantozol IV Package Insert'
  },

  // =========================================================================
  // SEDIAAN INSULIN STERIL
  // =========================================================================
  {
    id: 'rec-insulin-novorapid',
    drugName: 'Insulin Aspart (Novorapid FlexPen / Penfill)',
    genericName: 'Insulin Aspart Rapid-Acting',
    formType: 'Injeksi Insulin',
    brandExamples: ['Novorapid FlexPen', 'Novorapid PumpCart', 'NovoMix 30'],
    reconstitutionDiluent: 'Tidak perlu rekonstitusi (Larutan siap pakai)',
    volumeOrInstruction: 'Pasang jarum pen baru setiap kali penyuntikan subkutan.',
    budRoomTemp: '28 HARI (Suhu Ruang < 30°C untuk Pen yang sedang dipakai)',
    budRefrigerated: 'Sesuai Tanggal ED Pabrik (untuk Pen cadangan yang belum dibuka)',
    storageNotes: 'FlexPen yang sedang digunakan (in use) JANGAN disimpan di kulkas untuk mencegah rasa nyeri dan kristalisasi pada jarum.',
    references: 'Novo Nordisk Novorapid Prescribing Information'
  },
  {
    id: 'rec-insulin-lantus',
    drugName: 'Insulin Glargine (Lantus SoloStar 100 IU/mL)',
    genericName: 'Insulin Glargine Long-Acting',
    formType: 'Injeksi Insulin',
    brandExamples: ['Lantus SoloStar', 'Lantus Cartridge', 'Basaglar KwikPen'],
    reconstitutionDiluent: 'Tidak perlu rekonstitusi (Solutio bening)',
    volumeOrInstruction: 'Injeksi subkutan satu kali sehari pada waktu yang sama.',
    budRoomTemp: '28 HARI (Suhu Ruang < 30°C setelah dibuka)',
    budRefrigerated: 'Sesuai Tanggal ED Pabrik (sebelum dibuka pada 2°C - 8°C)',
    storageNotes: 'Lindungi dari panas langsung dan sinar matahari.',
    references: 'Sanofi-Aventis Lantus Prescribing Information'
  },
  {
    id: 'rec-insulin-tresiba',
    drugName: 'Insulin Degludec (Tresiba FlexTouch 100 U/mL)',
    genericName: 'Insulin Degludec Ultra-Long Acting',
    formType: 'Injeksi Insulin',
    brandExamples: ['Tresiba FlexTouch', 'Ryzodeg FlexTouch'],
    reconstitutionDiluent: 'Tidak perlu rekonstitusi (Solutio siap pakai)',
    volumeOrInstruction: 'Injeksi subkutan satu kali sehari dengan durasi kerja hingga 42 jam.',
    budRoomTemp: '56 HARI / 8 MINGGU (Suhu Ruang < 30°C setelah dibuka)',
    budRefrigerated: 'Sesuai Tanggal ED Pabrik (sebelum dibuka pada 2°C - 8°C)',
    storageNotes: 'Tresiba memiliki stabilitas suhu ruang lebih lama (hingga 56 hari) dibanding insulin konvensional.',
    references: 'Novo Nordisk Tresiba Prescribing Information'
  }
];
