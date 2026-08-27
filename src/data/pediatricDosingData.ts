export interface CommercialFormulation {
  name: string;
  form: 'sirup' | 'sirup_forte' | 'drops' | 'suspensi' | 'tablet' | 'kapsul' | 'puyer' | 'injeksi';
  strengthPerUnit: number; // in mg
  volumePerUnit?: number; // in mL (for liquid, e.g., 5 for per 5mL, 1 for drops, or 0 for tablet)
  unitLabel: string; // e.g. "120 mg / 5 mL", "250 mg / 5 mL", "100 mg / mL", "500 mg / tab"
  bottleSizeMl?: number; // e.g. 60 mL, 30 mL, 15 mL
  budAfterOpenDays?: number; // Beyond use date after reconstitution / opening in days
}

export interface PediatricDrugProfile {
  id: string;
  name: string;
  genericName: string;
  category: string;
  atcCode?: string;
  indications: string[];
  // Dosing guideline
  dosingType: 'per_kg_per_day' | 'per_kg_per_dose' | 'fixed_by_age' | 'fixed_by_weight';
  standardDoseMgPerKgPerDay?: number;
  minDoseMgPerKgPerDay?: number;
  maxDoseMgPerKgPerDay?: number;
  singleDoseMinMgPerKg?: number;
  singleDoseMaxMgPerKg?: number;
  defaultFrequencyPerDay: number; // e.g. 3 for TID (every 8h), 4 for QID (every 6h)
  frequencyOptions: { label: string; timesPerDay: number; intervalHours: number }[];
  maxSingleDoseMg?: number;
  maxDailyDoseMg?: number;
  minAgeMonths?: number;
  maxAgeYears?: number;
  standardAdultDoseMg?: number; // used for classic formulas (Young/Dilling)
  // Administration & safety
  administrationNotes: string;
  contraindications: string;
  redFlags: string[];
  formulations: CommercialFormulation[];
  defaultSignaTemplate: string;
}

export const PEDIATRIC_DRUGS_DATABASE: PediatricDrugProfile[] = [
  {
    id: 'ped-paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol',
    category: 'Antipiretik & Analgesik',
    atcCode: 'N02BE01',
    indications: ['Demam', 'Nyeri ringan hingga sedang', 'Pasca imunisasi'],
    dosingType: 'per_kg_per_dose',
    singleDoseMinMgPerKg: 10,
    singleDoseMaxMgPerKg: 15,
    minDoseMgPerKgPerDay: 40,
    maxDoseMgPerKgPerDay: 60,
    defaultFrequencyPerDay: 4,
    frequencyOptions: [
      { label: 'Setiap 4 - 6 jam saat demam (Maks 4-5x sehari / p.r.n)', timesPerDay: 4, intervalHours: 6 },
      { label: '3 kali sehari (Tiap 8 jam)', timesPerDay: 3, intervalHours: 8 },
      { label: '4 kali sehari (Tiap 6 jam)', timesPerDay: 4, intervalHours: 6 }
    ],
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000, // atau 75 mg/kg/hari (maks 4000 mg)
    minAgeMonths: 1,
    maxAgeYears: 18,
    standardAdultDoseMg: 500,
    administrationNotes: 'Dapat diminum sebelum atau sesudah makan. Berikan hanya saat demam (p.r.n >38°C) dengan interval minimal 4 jam antar dosis.',
    contraindications: 'Gangguan fungsi hati berat, hipersensitivitas paracetamol.',
    redFlags: [
      'Jangan melebihi 5 kali pemberian dalam kurun waktu 24 jam.',
      'Waspada potensi duplikasi dengan obat flu kombinasi OTC yang sudah mengandung paracetamol.',
      'Overdosis akut (>150 mg/kg) memicu nekrosis tubular ginjal dan gagal hati fulminan fatal.'
    ],
    formulations: [
      { name: 'Paracetamol Drops (Tetes)', form: 'drops', strengthPerUnit: 100, volumePerUnit: 1, unitLabel: '100 mg / mL (pipet tetes)', bottleSizeMl: 15, budAfterOpenDays: 30 },
      { name: 'Paracetamol Sirup Standar', form: 'sirup', strengthPerUnit: 120, volumePerUnit: 5, unitLabel: '120 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Paracetamol Sirup Forte', form: 'sirup_forte', strengthPerUnit: 250, volumePerUnit: 5, unitLabel: '250 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Paracetamol Tablet 500 mg', form: 'tablet', strengthPerUnit: 500, unitLabel: '500 mg / tablet' },
      { name: 'Paracetamol Tablet 100 mg (Kunyahan)', form: 'tablet', strengthPerUnit: 100, unitLabel: '100 mg / tablet' }
    ],
    defaultSignaTemplate: '3-4 x sehari 1 bungkus puyer / sendok takar saat demam (p.r.n)'
  },
  {
    id: 'ped-ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'NSAID / Antipiretik & Antiinflamasi',
    atcCode: 'M01AE01',
    indications: ['Demam tinggi refrakter', 'Nyeri inflamasi akut', 'Nyeri gigi / telinga (Otitis Media)'],
    dosingType: 'per_kg_per_dose',
    singleDoseMinMgPerKg: 5,
    singleDoseMaxMgPerKg: 10,
    minDoseMgPerKgPerDay: 20,
    maxDoseMgPerKgPerDay: 40,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam) bersama/sesudah makan', timesPerDay: 3, intervalHours: 8 },
      { label: '4 kali sehari (Tiap 6 jam saat demam)', timesPerDay: 4, intervalHours: 6 }
    ],
    maxSingleDoseMg: 400,
    maxDailyDoseMg: 1200, // atau 40 mg/kg/hari
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 400,
    administrationNotes: 'HARUS DIMINUM SESUDAH MAKAN ATAU BERSAMA SUSU untuk mencegah iritasi mukosa lambung.',
    contraindications: 'Bayi usia <6 bulan, dehidrasi berat, demam berdarah dengue (risiko perdarahan trombositopenia), tukak lambung aktif, asma yang dipicu NSAID.',
    redFlags: [
      'KONTRAINDIKASI pada kecurigaan Demam Berdarah Dengue (DBD) karena menghambat agregasi trombosit.',
      'Pastikan anak terhidrasi baik sebelum pemberian untuk mencegah nefrotoksisitas akut.',
      'Tidak direkomendasikan untuk bayi di bawah usia 6 bulan.'
    ],
    formulations: [
      { name: 'Ibuprofen Sirup Standar (Proris/Farsifen)', form: 'sirup', strengthPerUnit: 100, volumePerUnit: 5, unitLabel: '100 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Ibuprofen Sirup Forte', form: 'sirup_forte', strengthPerUnit: 200, volumePerUnit: 5, unitLabel: '200 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Ibuprofen Tablet 200 mg', form: 'tablet', strengthPerUnit: 200, unitLabel: '200 mg / tablet' },
      { name: 'Ibuprofen Tablet 400 mg', form: 'tablet', strengthPerUnit: 400, unitLabel: '400 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer / sendok takar sesudah makan'
  },
  {
    id: 'ped-amoxicillin',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotik Penicillin Spektrum Luas',
    atcCode: 'J01CA04',
    indications: ['Faringitis / Tonsilitis bakteri', 'Otitis Media Akut (OMA)', 'Pneumonia Komunitas', 'Infeksi Saluran Kemih'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 40,
    minDoseMgPerKgPerDay: 25,
    maxDoseMgPerKgPerDay: 50, // High-dose OMA: 80-90 mg/kg/hari
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam) - Standar', timesPerDay: 3, intervalHours: 8 },
      { label: '2 kali sehari (Tiap 12 jam) - Dosis Terbagi 2', timesPerDay: 2, intervalHours: 12 },
      { label: 'Dosis Tinggi Otitis Media (80-90 mg/kg/hari terbagi 2-3x)', timesPerDay: 3, intervalHours: 8 }
    ],
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 3000,
    minAgeMonths: 1,
    maxAgeYears: 18,
    standardAdultDoseMg: 500,
    administrationNotes: 'Dapat diminum dengan atau tanpa makanan. WAJIB DIHABISKAN sesuai durasi terapi dokter (biasanya 5 - 10 hari) untuk mencegah resistensi antibiotik.',
    contraindications: 'Riwayat anafilaksis / hipersensitivitas penisilin.',
    redFlags: [
      'Sirup kering yang sudah dilarutkan air (sirup rekonstitusi) HANYA BERTAHAN MAKSIMAL 7 - 14 HARI (Beyond Use Date).',
      'Hentikan segera jika timbul ruam gatal luas atau bengkak bibir/saluran napas.'
    ],
    formulations: [
      { name: 'Amoxicillin Sirup Kering Rekonstitusi 125 mg', form: 'sirup', strengthPerUnit: 125, volumePerUnit: 5, unitLabel: '125 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 7 },
      { name: 'Amoxicillin Sirup Forte Kering 250 mg', form: 'sirup_forte', strengthPerUnit: 250, volumePerUnit: 5, unitLabel: '250 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 7 },
      { name: 'Amoxicillin Drops Kering (Tetes)', form: 'drops', strengthPerUnit: 100, volumePerUnit: 1, unitLabel: '100 mg / mL', bottleSizeMl: 15, budAfterOpenDays: 7 },
      { name: 'Amoxicillin Kaplet 500 mg', form: 'tablet', strengthPerUnit: 500, unitLabel: '500 mg / kaplet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer / sendok takar sesudah makan (HABISKAN)'
  },
  {
    id: 'ped-cefixime',
    name: 'Cefixime',
    genericName: 'Cefixime Trihydrate',
    category: 'Antibiotik Sefalosporin Generasi ke-3',
    atcCode: 'J01DD08',
    indications: ['Otitis Media Akut', 'Faringotonsilitis', 'Demam Tifoid', 'Infeksi Saluran Kemih'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 8,
    minDoseMgPerKgPerDay: 8,
    maxDoseMgPerKgPerDay: 12, // Tifoid: hingga 10-15 mg/kg/hari
    defaultFrequencyPerDay: 2,
    frequencyOptions: [
      { label: '2 kali sehari (Tiap 12 jam) - Standar', timesPerDay: 2, intervalHours: 12 },
      { label: '1 kali sehari (Tiap 24 jam)', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 200,
    maxDailyDoseMg: 400,
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 200,
    administrationNotes: 'Dapat diminum sebelum atau sesudah makan. Habiskan sesuai instruksi dokter (5 - 7 hari).',
    contraindications: 'Alergi berat terhadap antibiotik sefalosporin atau penisilin (syok anafilaksis).',
    redFlags: [
      'Sirup kering rekonstitusi Cefixime stabil selama 14 hari pada suhu ruang terkendali atau lemari pendingin.',
      'Efek samping umum: diare ringan, feses lunak, mual.'
    ],
    formulations: [
      { name: 'Cefixime Sirup Kering Rekonstitusi 100 mg/5 mL', form: 'sirup', strengthPerUnit: 100, volumePerUnit: 5, unitLabel: '100 mg / 5 mL', bottleSizeMl: 30, budAfterOpenDays: 14 },
      { name: 'Cefixime Drops Kering 30 mg/mL', form: 'drops', strengthPerUnit: 30, volumePerUnit: 1, unitLabel: '30 mg / mL', bottleSizeMl: 10, budAfterOpenDays: 14 },
      { name: 'Cefixime Kapsul 100 mg', form: 'kapsul', strengthPerUnit: 100, unitLabel: '100 mg / kapsul' },
      { name: 'Cefixime Kapsul 200 mg', form: 'kapsul', strengthPerUnit: 200, unitLabel: '200 mg / kapsul' }
    ],
    defaultSignaTemplate: '2 x sehari 1 bungkus puyer / sendok takar sesudah makan (HABISKAN)'
  },
  {
    id: 'ped-cefadroxil',
    name: 'Cefadroxil',
    genericName: 'Cefadroxil Monohydrate',
    category: 'Antibiotik Sefalosporin Generasi ke-1',
    atcCode: 'J01DB05',
    indications: ['Infeksi Kulit & Jaringan Lunak (Pioderma, Impetigo)', 'Faringitis Streptokokus', 'Infeksi Saluran Kemih'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 30,
    minDoseMgPerKgPerDay: 25,
    maxDoseMgPerKgPerDay: 50,
    defaultFrequencyPerDay: 2,
    frequencyOptions: [
      { label: '2 kali sehari (Tiap 12 jam) - Standar', timesPerDay: 2, intervalHours: 12 },
      { label: '1 kali sehari (Tiap 24 jam)', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 2000,
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 500,
    administrationNotes: 'Dapat diminum bersama makanan untuk mengurangi rasa mual atau iritasi lambung.',
    contraindications: 'Alergi sefalosporin.',
    redFlags: ['Sirup kering rekonstitusi bertahan hingga 14 hari di suhu sejuk.'],
    formulations: [
      { name: 'Cefadroxil Sirup Kering 125 mg/5 mL', form: 'sirup', strengthPerUnit: 125, volumePerUnit: 5, unitLabel: '125 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 14 },
      { name: 'Cefadroxil Sirup Forte Kering 250 mg/5 mL', form: 'sirup_forte', strengthPerUnit: 250, volumePerUnit: 5, unitLabel: '250 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 14 },
      { name: 'Cefadroxil Kapsul 500 mg', form: 'kapsul', strengthPerUnit: 500, unitLabel: '500 mg / kapsul' }
    ],
    defaultSignaTemplate: '2 x sehari 1 bungkus puyer / sendok takar sesudah makan (HABISKAN)'
  },
  {
    id: 'ped-azithromycin',
    name: 'Azithromycin',
    genericName: 'Azithromycin Dihydrate',
    category: 'Antibiotik Makrolida',
    atcCode: 'J01FA10',
    indications: ['Pneumonia Atipikal (Mycoplasma)', 'Faringitis (Alergi Penisilin)', 'Pertusis'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 10,
    minDoseMgPerKgPerDay: 5,
    maxDoseMgPerKgPerDay: 12,
    defaultFrequencyPerDay: 1,
    frequencyOptions: [
      { label: '1 kali sehari selama 3 - 5 hari (Hari 1: 10 mg/kg, Hari 2-5: 5 mg/kg)', timesPerDay: 1, intervalHours: 24 },
      { label: '1 kali sehari 10 mg/kg/hari selama 3 hari berturut-turut', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 500,
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 500,
    administrationNotes: 'Minum 1 jam sebelum makan atau 2 jam sesudah makan (perut kosong) dengan segelas air.',
    contraindications: 'Riwayat kolestasis / disfungsi hepar akibat azitromisin, perpanjangan interval QTc.',
    redFlags: ['Sirup suspensi rekonstitusi stabil selama 10 hari pada suhu ruang.'],
    formulations: [
      { name: 'Azithromycin Sirup Kering 200 mg/5 mL (Zithromax)', form: 'sirup', strengthPerUnit: 200, volumePerUnit: 5, unitLabel: '200 mg / 5 mL', bottleSizeMl: 15, budAfterOpenDays: 10 },
      { name: 'Azithromycin Tablet 500 mg', form: 'tablet', strengthPerUnit: 500, unitLabel: '500 mg / tablet' }
    ],
    defaultSignaTemplate: '1 x sehari 1 bungkus puyer / sendok takar 1 jam sebelum makan (HABISKAN)'
  },
  {
    id: 'ped-salbutamol',
    name: 'Salbutamol (Albuterol)',
    genericName: 'Salbutamol Sulfate',
    category: 'Bronkodilator SABA (Anti Asma & Batuk Spasme)',
    atcCode: 'R03CC02',
    indications: ['Serangan Asma Akut', 'Bronkospasme', 'Batuk rejan / batuk asmatik'],
    dosingType: 'per_kg_per_dose',
    singleDoseMinMgPerKg: 0.05,
    singleDoseMaxMgPerKg: 0.15,
    minDoseMgPerKgPerDay: 0.2,
    maxDoseMgPerKgPerDay: 0.4,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam)', timesPerDay: 3, intervalHours: 8 },
      { label: '4 kali sehari (Tiap 6 jam)', timesPerDay: 4, intervalHours: 6 }
    ],
    maxSingleDoseMg: 4,
    maxDailyDoseMg: 12,
    minAgeMonths: 24, // >=2 tahun
    maxAgeYears: 18,
    standardAdultDoseMg: 2,
    administrationNotes: 'Diminum 1 jam sebelum atau 2 jam sesudah makan. Dapat memicu tremor halus pada tangan dan jantung berdebar ringan.',
    contraindications: 'Tirotoksikosis, aritmia takikardia.',
    redFlags: [
      'Waspadai takikardia dan hipokalemia pada dosis tinggi.',
      'Sering diracik puyer bersama mukolitik dan antihistamin pada batuk spasme anak.'
    ],
    formulations: [
      { name: 'Salbutamol Sirup 2 mg/5 mL (Ventolin)', form: 'sirup', strengthPerUnit: 2, volumePerUnit: 5, unitLabel: '2 mg / 5 mL', bottleSizeMl: 100, budAfterOpenDays: 30 },
      { name: 'Salbutamol Tablet 2 mg', form: 'tablet', strengthPerUnit: 2, unitLabel: '2 mg / tablet' },
      { name: 'Salbutamol Tablet 4 mg', form: 'tablet', strengthPerUnit: 4, unitLabel: '4 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer sesudah makan'
  },
  {
    id: 'ped-cetirizine',
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antihistamin H1 Generasi ke-2 (Anti Alergi & Gatal)',
    atcCode: 'R06AE07',
    indications: ['Rinitis Alergi', 'Urtikaria / Biduran Akut', 'Dermatitis Atopik / Gatal'],
    dosingType: 'fixed_by_age',
    minDoseMgPerKgPerDay: 0.25,
    maxDoseMgPerKgPerDay: 0.5,
    defaultFrequencyPerDay: 1,
    frequencyOptions: [
      { label: '1 kali sehari malam hari (Standar)', timesPerDay: 1, intervalHours: 24 },
      { label: '2 kali sehari pagi dan malam (Dosis terbagi)', timesPerDay: 2, intervalHours: 12 }
    ],
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 10,
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 10,
    administrationNotes: 'Dapat diminum dengan atau tanpa makanan. Disarankan malam hari sebelum tidur karena sedikit menimbulkan kantuk.',
    contraindications: 'Gagal ginjal berat (eGFR <10 mL/min).',
    redFlags: [
      'Panduan Dosis Berdasarkan Usia:\n- 6 - 11 bulan: 2.5 mg sekali sehari\n- 12 - 23 bulan: 2.5 mg 1-2x sehari (maks 5 mg/hari)\n- 2 - 5 tahun: 2.5 - 5 mg sekali sehari (maks 5 mg/hari)\n- ≥6 tahun: 5 - 10 mg sekali sehari (maks 10 mg/hari)'
    ],
    formulations: [
      { name: 'Cetirizine Drops 10 mg/mL (Ryvel/Tiriz)', form: 'drops', strengthPerUnit: 10, volumePerUnit: 1, unitLabel: '10 mg / mL (0.1 mL = 1 mg)', bottleSizeMl: 10, budAfterOpenDays: 30 },
      { name: 'Cetirizine Sirup 5 mg/5 mL', form: 'sirup', strengthPerUnit: 5, volumePerUnit: 5, unitLabel: '5 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Cetirizine Tablet 10 mg', form: 'tablet', strengthPerUnit: 10, unitLabel: '10 mg / tablet' }
    ],
    defaultSignaTemplate: '1 x sehari 1 sendok takar / bungkus puyer malam hari'
  },
  {
    id: 'ped-ambroxol',
    name: 'Ambroxol',
    genericName: 'Ambroxol Hydrochloride',
    category: 'Mukolitik / Pengencer Dahak',
    atcCode: 'R05CB06',
    indications: ['Batuk Berdahak Produktif', 'Bronkitis Akut / Kronis', 'Asma Bronkial Eksaserbasi Berdahak'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 1.2,
    minDoseMgPerKgPerDay: 1.2,
    maxDoseMgPerKgPerDay: 1.6,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam) sesudah makan', timesPerDay: 3, intervalHours: 8 },
      { label: '2 kali sehari (Tiap 12 jam)', timesPerDay: 2, intervalHours: 12 }
    ],
    maxSingleDoseMg: 30,
    maxDailyDoseMg: 90,
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 30,
    administrationNotes: 'Diminum sesudah makan dengan banyak minum air hangat untuk membantu melarutkan sekret dahak kental.',
    contraindications: 'Ulkus peptikum aktif, hipersensitivitas ambroxol.',
    redFlags: [
      'Panduan Usia Standar:\n- <2 tahun: 7.5 mg (2.5 mL sirup 15mg/5mL) 2x sehari\n- 2 - 5 tahun: 7.5 mg 3x sehari\n- 6 - 12 tahun: 15 mg 2-3x sehari\n- >12 tahun: 30 mg 2-3x sehari'
    ],
    formulations: [
      { name: 'Ambroxol Drops 15 mg/mL (Mucopect)', form: 'drops', strengthPerUnit: 15, volumePerUnit: 1, unitLabel: '15 mg / mL', bottleSizeMl: 20, budAfterOpenDays: 30 },
      { name: 'Ambroxol Sirup 15 mg/5 mL', form: 'sirup', strengthPerUnit: 15, volumePerUnit: 5, unitLabel: '15 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Ambroxol Sirup 30 mg/5 mL (Forte)', form: 'sirup_forte', strengthPerUnit: 30, volumePerUnit: 5, unitLabel: '30 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Ambroxol Tablet 30 mg', form: 'tablet', strengthPerUnit: 30, unitLabel: '30 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer / sendok takar sesudah makan'
  },
  {
    id: 'ped-dexamethasone',
    name: 'Dexamethasone',
    genericName: 'Dexamethasone',
    category: 'Kortikosteroid Antiinflamasi Kuat',
    atcCode: 'H02AB02',
    indications: ['Croup (Laringotrakeobronkitis Akut)', 'Asma Bronkial Akut', 'Reaksi Alergi Berat'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 0.15,
    minDoseMgPerKgPerDay: 0.08,
    maxDoseMgPerKgPerDay: 0.3,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam) sesudah makan', timesPerDay: 3, intervalHours: 8 },
      { label: '2 kali sehari (Tiap 12 jam)', timesPerDay: 2, intervalHours: 12 },
      { label: 'Dosis Tunggal Croup Akut (0.15 - 0.6 mg/kg single dose)', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 16,
    minAgeMonths: 1,
    maxAgeYears: 18,
    standardAdultDoseMg: 0.5,
    administrationNotes: 'HARUS DIMINUM SESUDAH MAKAN untuk mencegah iritasi lambung. Gunakan durasi sesingkat mungkin (3-5 hari) tanpa perlu tapering jika durasi <7 hari.',
    contraindications: 'Infeksi jamur sistemik, herpes simpleks okular, vaksinasi virus hidup.',
    redFlags: [
      'Potensi imunosupresi dan hiperglikemia pada penggunaan jangka panjang.',
      'Sering digunakan dalam racikan puyer batuk asmatik anak.'
    ],
    formulations: [
      { name: 'Dexamethasone Tablet 0.5 mg', form: 'tablet', strengthPerUnit: 0.5, unitLabel: '0.5 mg / tablet' },
      { name: 'Dexamethasone Tablet 0.75 mg', form: 'tablet', strengthPerUnit: 0.75, unitLabel: '0.75 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer sesudah makan'
  },
  {
    id: 'ped-methylprednisolone',
    name: 'Methylprednisolone',
    genericName: 'Methylprednisolone',
    category: 'Kortikosteroid Antiinflamasi Oral',
    atcCode: 'H02AB04',
    indications: ['Asma Akut Eksaserbasi', 'Sindrom Nefrotik', 'Alergi Berat / Dermatitis Atopik Berat'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 1.0,
    minDoseMgPerKgPerDay: 0.5,
    maxDoseMgPerKgPerDay: 2.0,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam) sesudah makan', timesPerDay: 3, intervalHours: 8 },
      { label: '2 kali sehari (Tiap 12 jam)', timesPerDay: 2, intervalHours: 12 },
      { label: '1 kali sehari pagi hari (Dosis Tunggal)', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 20,
    maxDailyDoseMg: 60,
    minAgeMonths: 1,
    maxAgeYears: 18,
    standardAdultDoseMg: 4,
    administrationNotes: 'Diminum sesudah makan pagi/siang. Hindari penghentian mendadak bila penggunaan melebihi 2 minggu (lakukan tapering off).',
    contraindications: 'Infeksi sistemik tidak terkontrol, ulkus peptikum berat.',
    redFlags: ['Tersedia dalam tablet 4 mg, 8 mg, dan 16 mg. Pastikan kekuatan tablet yang diracik puyer sudah benar.'],
    formulations: [
      { name: 'Methylprednisolone Tablet 4 mg', form: 'tablet', strengthPerUnit: 4, unitLabel: '4 mg / tablet' },
      { name: 'Methylprednisolone Tablet 8 mg', form: 'tablet', strengthPerUnit: 8, unitLabel: '8 mg / tablet' },
      { name: 'Methylprednisolone Tablet 16 mg', form: 'tablet', strengthPerUnit: 16, unitLabel: '16 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer sesudah makan'
  },
  {
    id: 'ped-domperidone',
    name: 'Domperidone',
    genericName: 'Domperidone Maleate',
    category: 'Antiemetik & Prokinetik (Anti Mual Muntah)',
    atcCode: 'A03FA03',
    indications: ['Mual dan Muntah Akut', 'Dispepsia Fungsional / Kembung Anak'],
    dosingType: 'per_kg_per_dose',
    singleDoseMinMgPerKg: 0.25,
    singleDoseMaxMgPerKg: 0.5,
    minDoseMgPerKgPerDay: 0.75,
    maxDoseMgPerKgPerDay: 1.0,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari diminum 15 - 30 menit SEBELUM MAKAN', timesPerDay: 3, intervalHours: 8 },
      { label: 'Diberikan saat mual/muntah (p.r.n)', timesPerDay: 3, intervalHours: 8 }
    ],
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 30, // atau 0.75-1 mg/kg/hari
    minAgeMonths: 12,
    maxAgeYears: 18,
    standardAdultDoseMg: 10,
    administrationNotes: 'HARUS DIMINUM 15 - 30 MENIT SEBELUM MAKAN / SEBELUM MENYUSUI untuk efek antiemetik optimal.',
    contraindications: 'Perdarahan lambung usus, obstruksi mekanik GI, prolaktinoma, perpanjangan interval QT jantung.',
    redFlags: [
      'Gunakan durasi sesingkat mungkin (maksimal 7 hari).',
      'Hindari kombinasi dengan obat yang memperpanjang interval QTc (Azitromisin, Eritromisin, Ketokonazol).'
    ],
    formulations: [
      { name: 'Domperidone Drops 5 mg/mL (Vometa/Vomina)', form: 'drops', strengthPerUnit: 5, volumePerUnit: 1, unitLabel: '5 mg / mL', bottleSizeMl: 10, budAfterOpenDays: 30 },
      { name: 'Domperidone Sirup 5 mg/5 mL', form: 'sirup', strengthPerUnit: 5, volumePerUnit: 5, unitLabel: '5 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Domperidone Tablet 10 mg', form: 'tablet', strengthPerUnit: 10, unitLabel: '10 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 sendok takar / bungkus puyer 15-30 menit sebelum makan'
  },
  {
    id: 'ped-ondansetron',
    name: 'Ondansetron',
    genericName: 'Ondansetron Hydrochloride',
    category: 'Antagonis Reseptor 5-HT3 / Antiemetik Kuat',
    atcCode: 'A04AA01',
    indications: ['Muntah Akut Gastroenteritis (Mencegah Dehidrasi)', 'Mual Muntah Pasca Kemoterapi / Operasi'],
    dosingType: 'per_kg_per_dose',
    singleDoseMinMgPerKg: 0.1,
    singleDoseMaxMgPerKg: 0.15,
    minDoseMgPerKgPerDay: 0.3,
    maxDoseMgPerKgPerDay: 0.45,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam) sesuai kebutuhan muntah', timesPerDay: 3, intervalHours: 8 },
      { label: '2 kali sehari (Tiap 12 jam)', timesPerDay: 2, intervalHours: 12 },
      { label: 'Dosis Tunggal Oral saat rehidrasi oral awal', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 4, // untuk anak <30 kg
    maxDailyDoseMg: 12,
    minAgeMonths: 6,
    maxAgeYears: 18,
    standardAdultDoseMg: 4,
    administrationNotes: 'Dapat diminum sebelum atau sesudah makan.',
    contraindications: 'Penggunaan bersamaan dengan Apomorphine (hipotensi berat), sindrom long-QT bawaan.',
    redFlags: ['Sangat efektif meredakan muntah pada gastroenteritis akut agar anak dapat mentoleransi cairan oralit.'],
    formulations: [
      { name: 'Ondansetron Sirup 4 mg/5 mL (Narfoz/Vomceran)', form: 'sirup', strengthPerUnit: 4, volumePerUnit: 5, unitLabel: '4 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Ondansetron Tablet 4 mg', form: 'tablet', strengthPerUnit: 4, unitLabel: '4 mg / tablet' },
      { name: 'Ondansetron Tablet 8 mg', form: 'tablet', strengthPerUnit: 8, unitLabel: '8 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 sendok takar / bungkus puyer saat muntah'
  },
  {
    id: 'ped-zinc-sulfate',
    name: 'Zinc Sulfate (Suplemen Diare Anak)',
    genericName: 'Zinc Sulfate Monohydrate',
    category: 'Suplemen Mineral Esensial / Protokol Diare Kemenkes-WHO',
    atcCode: 'A12CB01',
    indications: ['Diare Akut Anak (Wajib Diberikan 10-14 Hari)', 'Diare Persisten'],
    dosingType: 'fixed_by_age',
    defaultFrequencyPerDay: 1,
    frequencyOptions: [
      { label: '1 kali sehari selama 10 - 14 hari penuh (HABISKAN MESKI SUDAH SEMBUH)', timesPerDay: 1, intervalHours: 24 }
    ],
    maxSingleDoseMg: 20,
    maxDailyDoseMg: 20,
    minAgeMonths: 1,
    maxAgeYears: 18,
    standardAdultDoseMg: 20,
    administrationNotes: 'Larutkan tablet dispersible dalam 1 sendok air matang/ASI, atau minum sirup sesudah makan. WAJIB DIMINUM 10 HARI BERTURUT-TURUT untuk regenerasi epitel usus dan mencegah kekambuhan diare selama 2-3 bulan ke depan.',
    contraindications: 'Hipersensitivitas zinc.',
    redFlags: [
      'Panduan Dosis WHO / Kemenkes RI:\n- Bayi <6 bulan: 10 mg (1/2 tablet dispersible atau 2.5 mL sirup 20mg/5mL) sekali sehari selama 10 hari.\n- Anak ≥6 bulan: 20 mg (1 tablet dispersible atau 5 mL sirup 20mg/5mL) sekali sehari selama 10 hari.'
    ],
    formulations: [
      { name: 'Zinc Tablet Dispersible 20 mg (Zinkid/L-Bio Zinc)', form: 'tablet', strengthPerUnit: 20, unitLabel: '20 mg / tablet dispersible' },
      { name: 'Zinc Sirup 20 mg/5 mL', form: 'sirup', strengthPerUnit: 20, volumePerUnit: 5, unitLabel: '20 mg / 5 mL (1 cth)', bottleSizeMl: 60, budAfterOpenDays: 30 }
    ],
    defaultSignaTemplate: '1 x sehari 1 tablet dispersible / sendok takar selama 10 hari (HABISKAN)'
  },
  {
    id: 'ped-ctm',
    name: 'Chlorpheniramine Maleate (CTM)',
    genericName: 'Chlorpheniramine Maleate',
    category: 'Antihistamin H1 Generasi Pertama',
    atcCode: 'R06AB04',
    indications: ['Bersin-bersin / Pilek Alergi', 'Gatal-gatal / Kalikata', 'Komponen Puyer Flu'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 0.35,
    minDoseMgPerKgPerDay: 0.25,
    maxDoseMgPerKgPerDay: 0.4,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam)', timesPerDay: 3, intervalHours: 8 },
      { label: '4 kali sehari (Tiap 6 jam)', timesPerDay: 4, intervalHours: 6 }
    ],
    maxSingleDoseMg: 2,
    maxDailyDoseMg: 8,
    minAgeMonths: 24, // >=2 tahun
    maxAgeYears: 18,
    standardAdultDoseMg: 4,
    administrationNotes: 'Dapat diminum bersama atau sesudah makan. Menyebabkan rasa kantuk yang nyata.',
    contraindications: 'Bayi prematur / neonatus, glaukoma, asma akut berat.',
    redFlags: [
      'Hindari pemberian pada anak <2 tahun tanpa pengawasan dokter.',
      'Sering diracik dalam puyer batuk pilek anak (dosis rata-rata anak: 0.5 - 1 mg per bungkus).'
    ],
    formulations: [
      { name: 'CTM Tablet 4 mg', form: 'tablet', strengthPerUnit: 4, unitLabel: '4 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 bungkus puyer sesudah makan'
  },
  {
    id: 'ped-pseudoephedrine',
    name: 'Pseudoephedrine',
    genericName: 'Pseudoephedrine Hydrochloride',
    category: 'Dekongestan Oral Simpatomimetik (Pereda Hidung Tersumbat)',
    atcCode: 'R01BA02',
    indications: ['Kongesti Hidung / Hidung Tersumbat Parah', 'Otitis Media Serosa / Disfungsi Tuba'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 4.0,
    minDoseMgPerKgPerDay: 3.0,
    maxDoseMgPerKgPerDay: 5.0,
    defaultFrequencyPerDay: 3,
    frequencyOptions: [
      { label: '3 kali sehari (Tiap 8 jam)', timesPerDay: 3, intervalHours: 8 },
      { label: '4 kali sehari (Tiap 6 jam)', timesPerDay: 4, intervalHours: 6 }
    ],
    maxSingleDoseMg: 30,
    maxDailyDoseMg: 120,
    minAgeMonths: 24, // >=2 tahun
    maxAgeYears: 18,
    standardAdultDoseMg: 30,
    administrationNotes: 'Dapat diminum dengan atau tanpa makanan. Hindari minum menjelang tidur malam karena dapat memicu sulit tidur (insomnia).',
    contraindications: 'Hipertensi berat, aritmia kardiak, penggunaan bersamaan dengan MAOI.',
    redFlags: ['Tergolong Prekursor Farmasi. Pantau anak dari kegelisahan, insomnia, dan jantung berdebar.'],
    formulations: [
      { name: 'Pseudoephedrine Drops 7.5 mg/0.8 mL (Rhinos Neo)', form: 'drops', strengthPerUnit: 7.5, volumePerUnit: 0.8, unitLabel: '7.5 mg / 0.8 mL (pipet tetes)', bottleSizeMl: 10, budAfterOpenDays: 30 },
      { name: 'Pseudoephedrine Sirup 15 mg/5 mL', form: 'sirup', strengthPerUnit: 15, volumePerUnit: 5, unitLabel: '15 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 30 },
      { name: 'Pseudoephedrine Tablet 30 mg', form: 'tablet', strengthPerUnit: 30, unitLabel: '30 mg / tablet' }
    ],
    defaultSignaTemplate: '3 x sehari 1 sendok takar / bungkus puyer'
  },
  {
    id: 'ped-co-amoxiclav',
    name: 'Co-Amoxiclav (Amoxicillin + Clavulanic Acid)',
    genericName: 'Amoxicillin + Asam Klavulanat',
    category: 'Antibiotik Penicillin Inhibitor Beta-Laktamase',
    atcCode: 'J01CR02',
    indications: ['Otitis Media Berulang', 'Sinusitis Bakteri Akut', 'Infeksi Saluran Kemih Resisten'],
    dosingType: 'per_kg_per_day',
    standardDoseMgPerKgPerDay: 40,
    minDoseMgPerKgPerDay: 25,
    maxDoseMgPerKgPerDay: 45, // High-dose: hingga 90 mg amox/kg/hari
    defaultFrequencyPerDay: 2,
    frequencyOptions: [
      { label: '2 kali sehari (Tiap 12 jam) bersama makanan', timesPerDay: 2, intervalHours: 12 },
      { label: '3 kali sehari (Tiap 8 jam)', timesPerDay: 3, intervalHours: 8 }
    ],
    maxSingleDoseMg: 875,
    maxDailyDoseMg: 1750,
    minAgeMonths: 2,
    maxAgeYears: 18,
    standardAdultDoseMg: 625,
    administrationNotes: 'WAJIB DIMINUM DI AWAL MAKAN (bersama suapan pertama makanan) untuk meminimalkan efek samping mual/diare akibat asam klavulanat dan meningkatkan absorpsi.',
    contraindications: 'Riwayat ikterus kolestatik atau disfungsi hati terkait amoxicillin-clavulanate.',
    redFlags: [
      'Sirup kering rekonstitusi HARUS DISIMPAN DI LEMARI ES (2 - 8°C) dan hanya bertahan 7 HARI.',
      'Sering memicu diare ringan akibat klavulanat.'
    ],
    formulations: [
      { name: 'Co-Amoxiclav Sirup Kering (Claneksi/Augmentin 156.25 mg/5 mL)', form: 'sirup', strengthPerUnit: 125, volumePerUnit: 5, unitLabel: 'Amox 125 mg + Clav 31.25 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 7 },
      { name: 'Co-Amoxiclav Sirup Forte Kering 312.5 mg/5 mL', form: 'sirup_forte', strengthPerUnit: 250, volumePerUnit: 5, unitLabel: 'Amox 250 mg + Clav 62.5 mg / 5 mL', bottleSizeMl: 60, budAfterOpenDays: 7 },
      { name: 'Co-Amoxiclav Tablet 625 mg', form: 'tablet', strengthPerUnit: 500, unitLabel: 'Amox 500 mg + Clav 125 mg / kaplet' }
    ],
    defaultSignaTemplate: '2 x sehari 1 sendok takar bersama suapan pertama makan (HABISKAN)'
  }
];

/**
 * Calculates standard weight estimates based on age if weight is not provided (WHO / CDC guideline)
 */
export function estimateChildWeightKg(ageYears: number, ageMonths: number = 0): number {
  const totalYears = ageYears + ageMonths / 12;
  if (totalYears <= 0.25) return 4.5; // ~3 months
  if (totalYears <= 0.5) return 6.5; // ~6 months
  if (totalYears <= 1) return 9.5; // ~1 year
  if (totalYears <= 5) return 2 * totalYears + 8; // Weech formula 1-5 yo: 2 x Age + 8
  if (totalYears <= 12) return 3 * totalYears + 7; // Weech formula 6-12 yo: 3 x Age + 7
  return 45; // adolescent
}

/**
 * Calculates Body Surface Area (BSA) using Mosteller formula
 * BSA (m2) = sqrt( (Height(cm) * Weight(kg)) / 3600 )
 */
export function calculateMostellerBSA(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  return Math.sqrt((heightCm * weightKg) / 3600);
}

/**
 * Classic Pediatric Dosage Formulas compared to Standard Adult Dose
 */
export interface ClassicFormulaResult {
  formulaName: string;
  indication: string;
  calculatedDoseMg: number;
  formulaDescription: string;
}

export function calculateClassicFormulas(
  adultDoseMg: number,
  ageYears: number,
  ageMonths: number,
  weightKg: number,
  heightCm?: number
): ClassicFormulaResult[] {
  const totalMonths = ageYears * 12 + ageMonths;
  const weightLbs = weightKg * 2.20462;
  const bsa = (heightCm && heightCm > 0) ? calculateMostellerBSA(heightCm, weightKg) : Math.sqrt((100 * weightKg) / 3600);

  const results: ClassicFormulaResult[] = [];

  // 1. Rumus Young (Anak 1 - 8 tahun): (n / (n + 12)) * Dosis Dewasa
  if (ageYears >= 1 && ageYears <= 8) {
    const doseYoung = (ageYears / (ageYears + 12)) * adultDoseMg;
    results.push({
      formulaName: 'Rumus Young',
      indication: 'Anak usia 1 - 8 tahun',
      calculatedDoseMg: Math.round(doseYoung * 10) / 10,
      formulaDescription: `(Usia ${ageYears} th / (${ageYears} + 12)) × ${adultDoseMg} mg`
    });
  }

  // 2. Rumus Dilling (Anak >= 8 tahun): (n / 20) * Dosis Dewasa
  if (ageYears >= 8) {
    const doseDilling = (ageYears / 20) * adultDoseMg;
    results.push({
      formulaName: 'Rumus Dilling',
      indication: 'Anak usia ≥ 8 tahun',
      calculatedDoseMg: Math.round(doseDilling * 10) / 10,
      formulaDescription: `(Usia ${ageYears} th / 20) × ${adultDoseMg} mg`
    });
  }

  // 3. Rumus Fried (Bayi < 1 tahun / dalam bulan): (m / 150) * Dosis Dewasa
  if (totalMonths <= 12) {
    const doseFried = (totalMonths / 150) * adultDoseMg;
    results.push({
      formulaName: 'Rumus Fried',
      indication: 'Bayi usia < 1 tahun (dalam bulan)',
      calculatedDoseMg: Math.round(doseFried * 10) / 10,
      formulaDescription: `(${totalMonths} bulan / 150) × ${adultDoseMg} mg`
    });
  }

  // 4. Rumus Clark (Berdasarkan Berat Badan dalam pon/lbs): (BB_lbs / 150) * Dosis Dewasa
  const doseClark = (weightLbs / 150) * adultDoseMg;
  results.push({
    formulaName: 'Rumus Clark',
    indication: 'Berdasarkan Berat Badan (Pound/Lbs)',
    calculatedDoseMg: Math.round(doseClark * 10) / 10,
    formulaDescription: `(BB ${Math.round(weightLbs)} lbs / 150) × ${adultDoseMg} mg`
  });

  // 5. Rumus Cowling (Anak usia n tahun): ((n + 1) / 24) * Dosis Dewasa
  const doseCowling = ((ageYears + 1) / 24) * adultDoseMg;
  results.push({
    formulaName: 'Rumus Cowling',
    indication: 'Anak usia n tahun',
    calculatedDoseMg: Math.round(doseCowling * 10) / 10,
    formulaDescription: `((${ageYears} + 1) / 24) × ${adultDoseMg} mg`
  });

  // 6. Rumus Luas Permukaan Tubuh (BSA / Mosteller): (BSA / 1.73) * Dosis Dewasa
  if (bsa > 0) {
    const doseBSA = (bsa / 1.73) * adultDoseMg;
    results.push({
      formulaName: 'Rumus Luas Permukaan Tubuh (BSA)',
      indication: 'Berdasarkan Luas Permukaan Tubuh (Paling Akurat Farmakope)',
      calculatedDoseMg: Math.round(doseBSA * 10) / 10,
      formulaDescription: `(BSA ${bsa.toFixed(2)} m² / 1.73 m²) × ${adultDoseMg} mg`
    });
  }

  return results;
}
