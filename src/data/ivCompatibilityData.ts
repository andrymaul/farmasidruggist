export type CompatibilityStatus = 'compatible' | 'incompatible' | 'conditional' | 'no_data';

export interface DiluentCompatibility {
  ns: boolean; // Normal Saline 0.9%
  d5w: boolean; // Dextrose 5% in Water
  rl: boolean; // Ringer Lactate
  wfi: boolean; // Water for Injection
  d10w?: boolean; // Dextrose 10%
  d5ns?: boolean; // Dextrose 5% in 0.9% Saline
  notes?: string;
}

export interface IvDrugProfile {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  category: 'Vasoaktif / Inotropik' | 'Antibiotik / Antijamur' | 'Sedasi & Anestesi' | 'Analgesik & Antiinflamasi' | 'Gastrointestinal' | 'Elektrolit & Koreksi' | 'Antikoagulan & Kardiovaskular' | 'Lainnya';
  phRange: string;
  reconstitution: {
    recommendedDiluent: string;
    volumeToReconstitute: string;
    resultantConcentration: string;
    instructions: string;
  };
  diluents: DiluentCompatibility;
  stability: {
    roomTemp25C: string;
    refrigerated2to8C: string;
    frozen?: string;
    lightProtectionRequired: boolean;
    filterRequired: boolean;
    filterType?: string;
  };
  administration: {
    maxPeripheralConcentration?: string;
    maxCentralConcentration?: string;
    standardInfusionRate?: string;
    infusionRoute: 'IV Bolus' | 'IV Drip / Infus Kontinu' | 'IV Bolus & Drip' | 'IV Syringe Pump';
    specialPrecautions: string[];
  };
  blackBoxIncompatibilities?: string[];
}

export interface YSiteCompatibilityPair {
  drugAId: string;
  drugBId: string;
  status: CompatibilityStatus;
  evidence: 'Trissel\'s 2024' | 'ASHP Injectable Drugs' | 'FDA Labeling' | 'Clinical Study';
  mechanism?: string;
  clinicalEffect?: string;
  recommendation: string;
}

export const IV_DRUGS_DATABASE: IvDrugProfile[] = [
  {
    id: 'iv-norepinephrine',
    name: 'Norepinephrine (Noradrenalin)',
    genericName: 'Norepinephrine Bitartrate',
    brandNames: ['Vascon', 'Raivas', 'Levophed', 'N-Epi'],
    category: 'Vasoaktif / Inotropik',
    phRange: '3.0 - 4.5 (Asam)',
    reconstitution: {
      recommendedDiluent: 'D5W atau D5NS (HINDARI Normal Saline murni tanpa dekstrosa untuk penyimpanan panjang)',
      volumeToReconstitute: 'Larutkan 4 mg (4 mL) ke dalam 50 mL D5W (Konsentrasi: 80 mcg/mL) atau 100 mL D5W (Konsentrasi: 40 mcg/mL)',
      resultantConcentration: '40 - 80 mcg/mL',
      instructions: 'Gunakan Dextrose 5% untuk melindungi obat dari oksidasi. Jangan gunakan jika larutan berubah warna menjadi cokelat kemerahan atau terdapat endapan.'
    },
    diluents: {
      ns: false, // Dextrose lebih disukai untuk mencegah oksidasi
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: 'Dekstrosa (D5W/D5NS) wajib digunakan untuk mencegah degradasi oksidatif norepinefrin.'
    },
    stability: {
      roomTemp25C: '24 Jam (dalam kantong D5W)',
      refrigerated2to8C: '24 Jam',
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: '16 mcg/mL (Hanya darurat sementara)',
      maxCentralConcentration: '64 - 128 mcg/mL (Wajib via Vena Sentral / CVC)',
      standardInfusionRate: '0.01 - 3 mcg/kgBB/menit (titrasi sesuai target MAP ≥65 mmHg)',
      infusionRoute: 'IV Syringe Pump',
      specialPrecautions: [
        'WAJIB diberikan melalui jalur VENA SENTRAL (CVC) untuk mencegah ekstravasasi nekrosis jaringan parah.',
        'Jika terjadi ekstravasasi, segera infiltrasi Phentolamine 5-10 mg dalam 10 mL NS ke area sekitar.',
        'Wajib terlindung dari cahaya (tutup spuit/syringe dengan kantong pelindung hitam).'
      ]
    },
    blackBoxIncompatibilities: ['Inkompatibel fatal dengan larutan basa (Furosemide, Sodium Bicarbonate, Thiopental, Aminophylline).']
  },
  {
    id: 'iv-dobutamine',
    name: 'Dobutamine',
    genericName: 'Dobutamine Hydrochloride',
    brandNames: ['Dobutrex', 'Inotrop', 'Dobutamin OGB'],
    category: 'Vasoaktif / Inotropik',
    phRange: '2.5 - 5.5 (Asam)',
    reconstitution: {
      recommendedDiluent: 'D5W atau NaCl 0.9% (NS)',
      volumeToReconstitute: 'Larutkan 250 mg (20 mL) ke dalam 50 mL spuit (Konsentrasi: 5000 mcg/mL) atau 250 mL D5W/NS (1000 mcg/mL)',
      resultantConcentration: '1000 - 5000 mcg/mL',
      instructions: 'Larutan dapat sedikit berwarna merah muda (oksidasi ringan tanpa penurunan potensi bermakna).'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      notes: 'Kompatibel dengan NS, D5W, dan RL.'
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: '48 Jam',
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: '2500 mcg/mL',
      maxCentralConcentration: '5000 mcg/mL',
      standardInfusionRate: '2.5 - 20 mcg/kgBB/menit',
      infusionRoute: 'IV Syringe Pump',
      specialPrecautions: [
        'Pantau tekanan darah, denyut jantung, dan EKG kontinu (risiko takiaritmia).',
        'Koreksi hipovolemia terlebih dahulu sebelum inisiasi dobutamine.'
      ]
    },
    blackBoxIncompatibilities: ['Inkompatibel dengan Sodium Bicarbonate 8.4%, Furosemide, Heparin, Cefepime, dan Piperacillin-Tazobactam.']
  },
  {
    id: 'iv-dopamine',
    name: 'Dopamine',
    genericName: 'Dopamine Hydrochloride',
    brandNames: ['Cetadop', 'Dopac', 'Dopamin OGB'],
    category: 'Vasoaktif / Inotropik',
    phRange: '2.5 - 5.0 (Asam)',
    reconstitution: {
      recommendedDiluent: 'D5W atau NaCl 0.9% (NS)',
      volumeToReconstitute: 'Larutkan 200 mg (5 mL) ke dalam 50 mL spuit (Konsentrasi: 4000 mcg/mL) atau 250 mL D5W/NS (800 mcg/mL)',
      resultantConcentration: '800 - 4000 mcg/mL',
      instructions: 'Jangan gunakan jika larutan berubah warna lebih gelap dari kuning pucat.'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: '48 Jam',
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxCentralConcentration: '3200 - 4000 mcg/mL',
      standardInfusionRate: 'Dosis Inotropik (Beta): 5 - 10 mcg/kg/menit; Dosis Vasopresor (Alfa): 10 - 20 mcg/kg/menit',
      infusionRoute: 'IV Syringe Pump',
      specialPrecautions: [
        'Gunakan jalur Vena Sentral untuk mencegah iskemia perifer dan gangren akibat ekstravasasi.',
        'Inkompatibel dengan larutan alkali/basa.'
      ]
    },
    blackBoxIncompatibilities: ['Sodium Bicarbonate, Furosemide, Acyclovir, Amphotericin B.']
  },
  {
    id: 'iv-amiodarone',
    name: 'Amiodarone',
    genericName: 'Amiodarone Hydrochloride',
    brandNames: ['Cordarone', 'Kendaron', 'Tiaryt'],
    category: 'Antikoagulan & Kardiovaskular',
    phRange: '3.5 - 4.5 (Asam)',
    reconstitution: {
      recommendedDiluent: 'DEXTROSE 5% (D5W) SAJA (KONTRAINDIKASI DENGAN NaCl 0.9%)',
      volumeToReconstitute: 'Loading dose: 150 - 300 mg dalam 100 mL D5W habis dalam 10-20 menit. Maintenance: 900 mg dalam 500 mL D5W infus kontinu 24 jam.',
      resultantConcentration: '1.0 - 6.0 mg/mL',
      instructions: 'HANYA BOLEH DILARUTKAN DENGAN D5W. Penggunaan NaCl 0.9% memicu pembentukan presipitasi garam tidak larut.'
    },
    diluents: {
      ns: false, // Inkompatibel! Memicu presipitasi
      d5w: true,
      rl: false,
      wfi: false,
      notes: 'HANYA D5W yang boleh digunakan. Pengenceran dengan NS memicu presipitasi fisika.'
    },
    stability: {
      roomTemp25C: '24 Jam (dalam kantong non-PVC atau botol kaca)',
      refrigerated2to8C: '24 Jam',
      lightProtectionRequired: true,
      filterRequired: true,
      filterType: 'In-line filter 0.22 mikron untuk infus kontinu'
    },
    administration: {
      maxPeripheralConcentration: '2 mg/mL (Konsentrasi >2 mg/mL memicu flebitis perifer berat)',
      maxCentralConcentration: '6 mg/mL (Gunakan CVC jika infus >1 jam)',
      standardInfusionRate: 'Loading 150 mg/10 menit, dilanjutkan 1 mg/menit (6 jam) lalu 0.5 mg/menit (18 jam)',
      infusionRoute: 'IV Drip / Infus Kontinu',
      specialPrecautions: [
        'Gunakan set infus BEBAS PVC (Poliolefin / Kaca) karena amiodarone menyerap senyawa plastisizer DEHP dari PVC.',
        'Wajib in-line filter 0.22 mikron untuk mencegah mikro-kristal masuk ke sirkulasi.'
      ]
    },
    blackBoxIncompatibilities: ['NaCl 0.9% (NS), Heparin (presipitasi instan), Sodium Bicarbonate, Furosemide, Ceftriaxone.']
  },
  {
    id: 'iv-furosemide',
    name: 'Furosemide',
    genericName: 'Furosemide',
    brandNames: ['Lasix', 'Farsix', 'Uresix'],
    category: 'Antikoagulan & Kardiovaskular',
    phRange: '8.0 - 9.3 (SANGAT BASA / ALKALI)',
    reconstitution: {
      recommendedDiluent: 'NaCl 0.9% (NS) atau Ringer Lactate (RL). HINDARI Dextrose 5% asam!',
      volumeToReconstitute: 'Dapat diberikan bolus IV murni (10 mg/mL) perlahan (maks 4 mg/menit) atau dilarutkan dalam 50-100 mL NS untuk infus kontinu.',
      resultantConcentration: '1 - 10 mg/mL',
      instructions: 'Larutan bersifat basa kuat (pH ~9). Pencampuran dengan larutan obat asam (pH <7) akan langsung menyebabkan presipitasi putih kristal furosemide tak larut.'
    },
    diluents: {
      ns: true,
      d5w: false, // pH asam D5W (<5.0) dapat memicu presipitasi kristal furosemide
      rl: true,
      wfi: true,
      notes: 'Gunakan NaCl 0.9% atau RL. Hindari D5W murni dengan pH asam.'
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: 'HINDARI PENDINGINAN (suhu dingin memicu kristalisasi garam)',
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: '10 mg/mL',
      standardInfusionRate: 'Bolus: Maks 4 mg/menit (mencegah ototoksisitas/tuli sensorineural). Infus: 2.5 - 20 mg/jam.',
      infusionRoute: 'IV Bolus & Drip',
      specialPrecautions: [
        'JANGAN DISIMPAN DI LEMARI ES karena suhu <15°C memicu pengendapan kristal.',
        'Kecepatan bolus IV tidak boleh melebihi 4 mg/menit untuk mencegah kerusakan koklea telinga permanen.'
      ]
    },
    blackBoxIncompatibilities: ['Midazolam (presipitasi instan), Dobutamine, Norepinephrine, Nicardipine, Morphine, Ondansetron, Amiodarone, Ciprofloxacin.']
  },
  {
    id: 'iv-ceftriaxone',
    name: 'Ceftriaxone',
    genericName: 'Ceftriaxone Sodium',
    brandNames: ['Rocephin', 'Broadced', 'Terzicef', 'Ceftriaxone OGB'],
    category: 'Antibiotik / Antijamur',
    phRange: '6.0 - 8.0',
    reconstitution: {
      recommendedDiluent: 'Water for Injection (WFI), NaCl 0.9% (NS), D5W. KONTRAINDIKASI MUTLAK DENGAN RINGER LACTATE ATAU LARUTAN KALSIUM LAINNYA!',
      volumeToReconstitute: '1 gram serbuk dilarutkan dalam 9.6 mL WFI/NS (Konsentrasi: 100 mg/mL untuk bolus IV lambat 2-4 menit) atau diencerkan ke 50-100 mL NS/D5W untuk infus 30 menit.',
      resultantConcentration: '20 - 100 mg/mL',
      instructions: 'KONTRAINDIKASI MUTLAK DICAMPUR ATAU DIBERIKAN SEJALUR DENGAN LARUTAN MENGANDUNG KALSIUM (Ringer Lactate, Calcium Gluconate, Nutrisi Parenteral TPN).'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false, // KONTRAINDIKASI MUTLAK! Kalsium mengikat Ceftriaxone membentuk presipitasi maut
      wfi: true,
      notes: 'KONTRAINDIKASI MUTLAK BERSAMA RINGER LACTATE / LARUTAN KALSIUM.'
    },
    stability: {
      roomTemp25C: '24 Jam (setelah rekonstitusi)',
      refrigerated2to8C: '72 Jam (3 Hari)',
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      standardInfusionRate: 'Bolus IV lambat 2-4 menit atau Infus Intermiten 30 menit',
      infusionRoute: 'IV Bolus & Drip',
      specialPrecautions: [
        'KONTRAINDIKASI FATAL PADA NEONATUS (≤28 HARI) yang menerima kalsium (presipitasi garam kalsium-seftriakson di paru dan ginjal yang menyebabkan kematian mendadak).',
        'Pada pasien anak/dewasa, bila jalur yang sama harus dipakai berturut-turut, BILAS SELANG SECARA MENYELURUH DENGAN 20-50 mL NS sebelum dan sesudah infus.'
      ]
    },
    blackBoxIncompatibilities: ['Ringer Lactate (RL), Calcium Gluconate, Calcium Chloride, Aminophylline, Fluconazole, Vancomycin, Amiodarone.']
  },
  {
    id: 'iv-vancomycin',
    name: 'Vancomycin',
    genericName: 'Vancomycin Hydrochloride',
    brandNames: ['Vancocin', 'Vancep', 'Vancomycin OGB'],
    category: 'Antibiotik / Antijamur',
    phRange: '2.5 - 4.5 (Sangat Asam)',
    reconstitution: {
      recommendedDiluent: 'Rekonstitusi vial 500 mg dengan 10 mL WFI (Konsentrasi: 50 mg/mL). WAJIB DIENCERKAN LAGI ke minimal 100 mL NS atau D5W per 500 mg.',
      volumeToReconstitute: '1 gram dilarutkan ke minimal 200 - 250 mL NS atau D5W (Konsentrasi akhir: ≤5 mg/mL).',
      resultantConcentration: '2.5 - 5.0 mg/mL',
      instructions: 'Dilarang bolus IV! Harus diinfuskan lambat minimal 60 menit per 1 gram (kecepatan maksimal 10 mg/menit) untuk mencegah Red Man Syndrome.'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: '14 Hari (dalam kantong NS/D5W)',
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: '5 mg/mL',
      maxCentralConcentration: '10 mg/mL (hanya pada restriksi cairan ketat via CVC)',
      standardInfusionRate: 'Minimal 60 menit per 1000 mg (kecepatan infus ≤10 mg/menit)',
      infusionRoute: 'IV Drip / Infus Kontinu',
      specialPrecautions: [
        'Red Man Syndrome (kemerahan masif, gatal, hipotensi, spasme dada) terjadi jika infus terlalu cepat. Turunkan kecepatan infus dan berikan antihistamin.',
        'Wajib pantau kadar palung (trough level) sebelum dosis ke-4 (target 15-20 mcg/mL pada infeksi berat).'
      ]
    },
    blackBoxIncompatibilities: ['Heparin (presipitasi instan), Ceftriaxone, Piperacillin-Tazobactam, Furosemide, Dexamethasone, Sodium Bicarbonate.']
  },
  {
    id: 'iv-meropenem',
    name: 'Meropenem',
    genericName: 'Meropenem Trihydrate',
    brandNames: ['Meronem', 'Ronem', 'Meropenem OGB'],
    category: 'Antibiotik / Antijamur',
    phRange: '7.3 - 8.3 (Netral-Alkali Lemah)',
    reconstitution: {
      recommendedDiluent: 'Water for Injection (WFI) atau NaCl 0.9% (NS)',
      volumeToReconstitute: '1 gram dilarutkan dalam 20 mL WFI untuk bolus IV 3-5 menit, atau dilarutkan dalam 100 mL NS/D5W untuk infus intermiten / prolonged infusion 3 jam.',
      resultantConcentration: '10 - 50 mg/mL',
      instructions: 'Lebih stabil dalam NaCl 0.9% dibanding Dextrose 5%.'
    },
    diluents: {
      ns: true,
      d5w: true, // Kurang stabil dibanding NS (hanya bertahan 1-2 jam di D5W)
      rl: true,
      wfi: true,
      notes: 'Paling stabil dalam NaCl 0.9% (bertahan hingga 4 jam pada suhu kamar vs 1 jam di D5W).'
    },
    stability: {
      roomTemp25C: '4 Jam (dalam NS), 1 Jam (dalam D5W)',
      refrigerated2to8C: '24 Jam (dalam NS), 4 Jam (dalam D5W)',
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      standardInfusionRate: 'Infus Standar: 30 menit; Prolonged Infusion (Sepsis Berat): 3 - 4 jam',
      infusionRoute: 'IV Bolus & Drip',
      specialPrecautions: [
        'Metode Prolonged Infusion (infus 3-4 jam) memaksimalkan parameter farmakodinamik T>MIC pada kuman resisten MDR.',
        'KONTRAINDIKASI BERSAMA ASAM VALPROAT (menurunkan kadar valproat hingga 90% memicu kejang).'
      ]
    },
    blackBoxIncompatibilities: ['Metronidazole, Ondansetron, Nicardipine, Calcium Gluconate (konsentrasi tinggi).']
  },
  {
    id: 'iv-midazolam',
    name: 'Midazolam',
    genericName: 'Midazolam Hydrochloride',
    brandNames: ['Miloz', 'Sedacum', 'Midazolam OGB', 'Dormicum'],
    category: 'Sedasi & Anestesi',
    phRange: '3.0 - 3.6 (Sangat Asam)',
    reconstitution: {
      recommendedDiluent: 'NaCl 0.9% (NS) atau D5W',
      volumeToReconstitute: 'Dapat diberikan murni (1 mg/mL atau 5 mg/mL) atau diencerkan dalam 50 mL NS (Konsentrasi: 1 mg/mL) untuk syringe pump.',
      resultantConcentration: '0.5 - 5 mg/mL',
      instructions: 'Bersifat asam kuat. Akan segera mengendap menjadi kristal putih jika bercampur dengan larutan basa seperti Furosemide atau Thiopental.'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: '72 Jam',
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      standardInfusionRate: 'Sedasi ICU: 0.02 - 0.1 mg/kg/jam (titrasi sesuai skor RASS -2 hingga -3)',
      infusionRoute: 'IV Bolus & Drip',
      specialPrecautions: [
        'Wajib pemantauan saturasi oksigen (SpO2), laju napas, dan kesiapan bagging/intubasi karena risiko depresi pernapasan dan apnea.',
        'Sediakan antidotum Flumazenil untuk membalikkan sedasi darurat.'
      ]
    },
    blackBoxIncompatibilities: ['Furosemide (inkompatibilitas presipitasi instan pH), Sodium Bicarbonate, Thiopental, Ampicillin, Dexamethasone.']
  },
  {
    id: 'iv-pantoprazole',
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    brandNames: ['Pantozol', 'Panloc', 'Pumpitor', 'Pantoprazole OGB'],
    category: 'Gastrointestinal',
    phRange: '9.0 - 10.5 (SANGAT BASA / ALKALI)',
    reconstitution: {
      recommendedDiluent: 'NaCl 0.9% (NS) atau D5W',
      volumeToReconstitute: 'Vial 40 mg dilarutkan dengan 10 mL NS (Konsentrasi: 4 mg/mL untuk bolus IV lambat >2 menit), atau diencerkan dalam 100 mL NS/D5W untuk infus intermiten 15 menit.',
      resultantConcentration: '0.4 - 4.0 mg/mL',
      instructions: 'Gunakan filter reconstitution yang disertakan jika ada. Larutan sangat basa, hindari pencampuran dengan obat asam.'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false, // Kurang stabil
      wfi: false,
      notes: 'Paling stabil dalam NaCl 0.9% (NS).'
    },
    stability: {
      roomTemp25C: '12 Jam',
      refrigerated2to8C: '24 Jam',
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      standardInfusionRate: 'Bolus IV: 2-5 menit; Drip Perdarahan Saluran Cerna Akut: Loading 80 mg dilanjutkan 8 mg/jam infus kontinu selama 72 jam.',
      infusionRoute: 'IV Bolus & Drip',
      specialPrecautions: [
        'Bilas selang infus dengan NS sebelum dan sesudah pemberian pantoprazole jika menggunakan jalur yang sama dengan obat lain.',
        'Warna larutan berubah menjadi merah muda/kuning kecokelatan jika terdegradasi.'
      ]
    },
    blackBoxIncompatibilities: ['Midazolam, Dobutamine, Nicardipine, Ondansetron, Morphine, Fentanyl, Ciprofloxacin, Ringer Lactate.']
  },
  {
    id: 'iv-nicardipine',
    name: 'Nicardipine',
    genericName: 'Nicardipine Hydrochloride',
    brandNames: ['Perdipine', 'Tensilo', 'Nicardipine OGB'],
    category: 'Vasoaktif / Inotropik',
    phRange: '3.5 - 4.5 (Asam)',
    reconstitution: {
      recommendedDiluent: 'D5W, D5NS, atau NaCl 0.9% (NS)',
      volumeToReconstitute: 'Larutkan 10 mg (10 mL) ke dalam 40 mL D5W/NS spuit (Konsentrasi: 0.2 mg/mL atau 200 mcg/mL) atau 25 mg dalam 250 mL (0.1 mg/mL).',
      resultantConcentration: '0.1 - 0.2 mg/mL',
      instructions: 'Konsentrasi >0.2 mg/mL melalui vena perifer berisiko tinggi memicu flebitis dan iritasi vena hebat.'
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: '24 Jam',
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: '0.2 mg/mL (Ganti lokasi infus perifer tiap 12 jam)',
      maxCentralConcentration: '0.5 mg/mL (via CVC)',
      standardInfusionRate: 'Awal 5 mg/jam, dapat dititrasi naik 2.5 mg/jam tiap 5-15 menit hingga target tekanan darah tercapai (Maks 15 mg/jam).',
      infusionRoute: 'IV Syringe Pump',
      specialPrecautions: [
        'Rotasi lokasi penusukan kanula perifer setiap 12 jam untuk meminimalkan risiko tromboflebitis kimiawi.',
        'Hindari penurunan tekanan darah yang terlalu cepat (maks penurunan 25% MAP dalam 1-2 jam pertama krisis hipertensi).'
      ]
    },
    blackBoxIncompatibilities: ['Furosemide (presipitasi instan), Sodium Bicarbonate, Heparin, Ampicillin, Pantoprazole.']
  },
  {
    id: 'iv-potassium-chloride',
    name: 'Potassium Chloride (KCl 7.46%)',
    genericName: 'Potassium Chloride',
    brandNames: ['KCl 7.46% Otsuka', 'Potassium Chloride Injection'],
    category: 'Elektrolit & Koreksi',
    phRange: '4.0 - 8.0',
    reconstitution: {
      recommendedDiluent: 'NaCl 0.9% (NS) atau Ringer Lactate (RL). HINDARI Dekstrosa pekat pada awal koreksi!',
      volumeToReconstitute: 'HARUS DIENCERKAN! DILARANG KERAS MENYUNTIKKAN KCL PEKAT LANGSUNG (BOLUS IV PEKAT MEMATIKAN!).',
      resultantConcentration: 'Perifer: Maks 40 mEq/L (20 mEq dalam 500 mL NS); Sentral (CVC): Maks 80 - 100 mEq/L.',
      instructions: 'Kocok labu infus hingga tercampur merata sempurna setelah KCl disuntikkan ke dalam cairan infus untuk mencegah bolus gravitasi kalium pekat di dasar kantong.'
    },
    diluents: {
      ns: true,
      d5w: true, // Namun NS lebih disukai karena D5W merangsang insulin yang menurunkan K+ intrasel
      rl: true,
      wfi: false,
      notes: 'Gunakan NaCl 0.9% sebagai cairan pembawa utama. Hindari Dextrose saat koreksi hipokalemia akut.'
    },
    stability: {
      roomTemp25C: '24 Jam',
      refrigerated2to8C: '48 Jam',
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: '40 mEq/L (0.04 mEq/mL)',
      maxCentralConcentration: '80 - 100 mEq/L (via CVC dengan monitoring EKG ketat)',
      standardInfusionRate: 'Perifer: Maks 10 mEq/jam; CVC Darurat: Maks 20 mEq/jam (Wajib Bedside EKG Monitor)',
      infusionRoute: 'IV Drip / Infus Kontinu',
      specialPrecautions: [
        'PERINGATAN KOTAK HITAM (HIGH ALERT DEADLY): PEMBERIAN BOLUS KCL PEKAT SECARA LANGSUNG MENYEBABKAN HENTI JANTUNG ASISTOL DAN KEMATIAN MENDADAK DALAM HITUNGAN DETIK.',
        'Wajib diverifikasi ganda (double-check independent) oleh dua perawat sebelum pemasangan infus.'
      ]
    },
    blackBoxIncompatibilities: ['Diazepam, Dobutamine (konsentrasi tinggi), Phenytoin, Lipid emulsion.']
  },
  {
    id: 'iv-propofol',
    name: 'Propofol 1%',
    genericName: 'Propofol Emulsion',
    brandNames: ['Fresofol 1%', 'Diprivan', 'Recofol', 'Propofol OGB'],
    category: 'Sedasi & Anestesi',
    phRange: '6.0 - 8.5 (Emulsi Lemak Lipid Putih Susu)',
    reconstitution: {
      recommendedDiluent: 'Diberikan murni (10 mg/mL) tanpa pengenceran, atau diencerkan hanya dengan D5W (minimal rasio 1:4 / 2 mg/mL).',
      volumeToReconstitute: 'Diberikan langsung via Syringe Pump atau Infusion Pump.',
      resultantConcentration: '10 mg/mL (Murni)',
      instructions: 'Kocok perlahan sebelum digunakan. Mengandung emulsi minyak kedelai dan fosfatida telur yang merupakan media subur pertumbuhan bakteri.'
    },
    diluents: {
      ns: false, // Jangan diencerkan dengan NS (merusak emulsi lipid)
      d5w: true, // Hanya D5W yang boleh untuk pengenceran terbatas
      rl: false,
      wfi: false
    },
    stability: {
      roomTemp25C: '12 Jam (maksimal infus dari spuit/botol yang sama harus dibuang dalam 12 jam)',
      refrigerated2to8C: 'HINDARI MEMBEKUKAN (pembekuan merusak droplet emulsi)',
      lightProtectionRequired: false,
      filterRequired: true,
      filterType: 'Filter membran khusus lipid (pori ≥1.2 mikron; filter 0.22 mikron akan tersumbat)'
    },
    administration: {
      standardInfusionRate: 'Sedasi ICU: 0.3 - 4.0 mg/kg/jam; Induksi Anestesi: 1.5 - 2.5 mg/kg bolus lambat.',
      infusionRoute: 'IV Syringe Pump',
      specialPrecautions: [
        'Ganti set infus dan spuit propofol SETIAP 12 JAM untuk mencegah sepsis bakterial kateter.',
        'Waspadai Sindrom Infus Propofol (PRIS): asidosis metabolik berat, rhabdomyolysis, hiperkalemia, gagal jantung pada dosis >4-5 mg/kg/jam >48 jam.'
      ]
    },
    blackBoxIncompatibilities: ['Inkompatibel dengan hampir seluruh obat injeksi lain jika dicampur dalam satu jalur (merusak droplet emulsi dan memicu emboli minyak). Sediakan jalur IV khusus (Dedicated Line).']
  }
,
  {
    id: "iv-epinephrine",
    name: "Epinephrine (Adrenalin)",
    genericName: "Epinephrine Hydrochloride",
    brandNames: [
      "Epinephrine OGB",
      "Adrenalin",
      "EpiPen"
    ],
    category: "Vasoaktif / Inotropik",
    phRange: "2.2 - 5.0 (Asam)",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan 1 mg (1 mL) ke dalam 100 mL - 250 mL D5W/NS (Konsentrasi: 4 - 10 mcg/mL) atau 4 mg dalam 50 mL NS/D5W via syringe pump (80 mcg/mL)",
      resultantConcentration: "4 - 80 mcg/mL",
      instructions: "Lindungi dari cahaya dan panas. Jangan gunakan jika larutan berubah warna menjadi merah muda, cokelat, atau terdapat presipitat."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan D5W, NS, dan D5NS. Dekstrosa melindungi dari oksidasi pada infus jangka panjang."
    },
    stability: {
      roomTemp25C: "24 Jam setelah pelarutan",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "16 mcg/mL (Hanya dalam situasi darurat/resusitasi)",
      maxCentralConcentration: "64 - 80 mcg/mL (Dianjurkan via Vena Sentral / CVC)",
      standardInfusionRate: "0.01 - 1 mcg/kgBB/menit (titrasi respons hemodinamik / syok anafilaksis / sepsis)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Wajib terlindung dari cahaya (tutup syringe/infus dengan kantong pelindung gelap).",
        "Pemberian via vena perifer berisiko ekstravasasi nekrosis jaringan; gunakan vena sentral untuk infus kontinu.",
        "Inkompatibel fatal dengan larutan alkali/basa (Sodium Bicarbonate, Furosemide, Aminophylline)."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate (degradasi oksidatif katekolamin cepat)",
      "Furosemide (presipitasi asam-basa seketika)",
      "Aminophylline"
    ]
  },
  {
    id: "iv-vasopressin",
    name: "Vasopressin (ADH)",
    genericName: "Arginine Vasopressin",
    brandNames: [
      "Pitressin",
      "Vasostrict",
      "Fustab"
    ],
    category: "Vasoaktif / Inotropik",
    phRange: "2.5 - 4.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 20 Unit (1 mL) ke dalam 100 mL NS (Konsentrasi: 0.2 Unit/mL) atau 40 Unit dalam 50 mL NS (Konsentrasi: 0.8 Unit/mL via syringe pump)",
      resultantConcentration: "0.1 - 1 Unit/mL",
      instructions: "Campur perlahan tanpa pengocokan keras untuk mencegah denaturasi peptida."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Stabil dalam larutan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "18 Jam pada suhu ruang",
      refrigerated2to8C: "24 Jam pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "0.2 Unit/mL",
      maxCentralConcentration: "1 Unit/mL (Jalur Vena Sentral)",
      standardInfusionRate: "0.01 - 0.04 Unit/menit (dosis tetap kontinu pada syok septik refrakter)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Dosis infus syok septik bersifat fixed-dose (0.03-0.04 Unit/menit) dan BUKAN untuk dititrasi cepat.",
        "Dapat menyebabkan vasokonstriksi koroner dan iskemia splanknikus/mesenterika pada dosis >0.04 Unit/menit."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Phenytoin Sodium"
    ]
  },
  {
    id: "iv-nitroglycerin",
    name: "Nitroglycerin (NTG)",
    genericName: "Glyceryl Trinitrate",
    brandNames: [
      "Nitrokaf",
      "Nitrocine",
      "Nitronal",
      "Tridil"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "3.5 - 6.0",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan 50 mg (10 mL) ke dalam 250 mL D5W/NS (Konsentrasi: 200 mcg/mL) atau 50 mg dalam 50 mL (1000 mcg/mL via syringe pump)",
      resultantConcentration: "100 - 400 mcg/mL (infus) atau 1000 mcg/mL (syringe pump)",
      instructions: "Wajib menggunakan botol kaca / kantong non-PVC (Polyolefin/EVA) dan selang infus non-PVC untuk mencegah adsorpsi NTG hingga 80% ke plastik PVC standar."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W. Wajib wadah dan selang khusus Non-PVC."
    },
    stability: {
      roomTemp25C: "24 Jam (dalam wadah kaca/non-PVC)",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "400 mcg/mL",
      maxCentralConcentration: "1000 mcg/mL",
      standardInfusionRate: "5 - 200 mcg/menit (titrasi tiap 3-5 menit sesuai target penurunan tekanan darah / nyeri dada)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Absorpsi ke plastik PVC konvensional sangat tinggi; gunakan set infus non-PVC (polyethylene).",
        "Kontraindikasi mutlak bersamaan dengan inhibitor PDE-5 (Sildenafil, Tadalafil, Vardenafil) dalam 24-48 jam terakhir karena risiko hipotensi kolaps fatal."
      ]
    },
    blackBoxIncompatibilities: [
      "Inhibitor PDE-5 oral (Sildenafil/Tadalafil)",
      "Sodium Bicarbonate",
      "Furosemide"
    ]
  },
  {
    id: "iv-heparin",
    name: "Heparin Sodium",
    genericName: "Heparin Sodium Injection",
    brandNames: [
      "Inviclot",
      "Heparin OGB",
      "Liquaemin"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "5.0 - 8.0",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 25.000 Unit (5 mL) ke dalam 250 mL NS/D5W (Konsentrasi: 100 Unit/mL) atau 20.000 Unit dalam 50 mL NS (Konsentrasi: 400 Unit/mL via syringe pump)",
      resultantConcentration: "50 - 400 Unit/mL",
      instructions: "Inversi kantong perlahan untuk memastikan homogenitas larutan."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, RL, dan D5NS."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "7 Hari",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "100 Unit/mL",
      maxCentralConcentration: "400 Unit/mL",
      standardInfusionRate: "Bolus awal 60-80 Unit/kgBB dilanjutkan infus 12-18 Unit/kgBB/jam (titrasi aPTT target 1.5 - 2.5x kontrol)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Wajib pemantauan aPTT serial tiap 6 jam pasca titrasi dan hitung trombosit harian (waspada Heparin-Induced Thrombocytopenia / HIT).",
        "Inkompatibel fatal dengan Vancomycin, Amiodarone, Gentamicin, Ciprofloxacin, Cefotaxime (membentuk presipitat garam kompleks insoluble)."
      ]
    },
    blackBoxIncompatibilities: [
      "Vancomycin",
      "Amiodarone",
      "Ciprofloxacin",
      "Gentamicin",
      "Tobramycin",
      "Haloperidol"
    ]
  },
  {
    id: "iv-morphine",
    name: "Morphine Sulfate",
    genericName: "Morphine Sulfate Injection",
    brandNames: [
      "Morphine OGB",
      "MST Continus (oral)",
      "Morfin Kimia Farma"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "2.5 - 6.0 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%), D5W, atau WFI",
      volumeToReconstitute: "Larutkan 10-50 mg ke dalam 50 mL NS (Konsentrasi: 0.2 - 1 mg/mL) via syringe pump / PCA",
      resultantConcentration: "0.2 - 5 mg/mL",
      instructions: "Lindungi dari cahaya matahari langsung. Jangan gunakan jika larutan berubah warna menjadi lebih gelap dari kuning pucat."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan sebagian besar pelarut kristaloid standar."
    },
    stability: {
      roomTemp25C: "24 Jam",
      refrigerated2to8C: "7 Hari",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "1 - 5 mg/mL",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "Bolus IV lambat 2 - 5 mg tiap 5-15 menit atau infus kontinu 1 - 10 mg/jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Wajib monitor saturasi oksigen, laju pernapasan, dan refleks sedasi (siapkan antagonis Nalokson IV).",
        "Inkompatibel dengan larutan alkali (Furosemide, Sodium Bicarbonate, Aminophylline, Thiopental)."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Sodium Bicarbonate",
      "Aminophylline",
      "Thiopental",
      "Phenytoin"
    ]
  },
  {
    id: "iv-fentanyl",
    name: "Fentanyl Citrate",
    genericName: "Fentanyl Citrate Injection",
    brandNames: [
      "Fentanyl OGB",
      "Sublimaze",
      "Durogesic (patch)"
    ],
    category: "Sedasi & Anestesi",
    phRange: "4.0 - 7.5",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 500 mcg (10 mL) ke dalam 40 mL NS (Konsentrasi akhir: 10 mcg/mL) via syringe pump 50 mL",
      resultantConcentration: "10 - 50 mcg/mL",
      instructions: "Kompatibel dan stabil dalam spuit polipropilen dan kantong infus NS/D5W."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam (dalam spuit syringe pump)",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "10 - 50 mcg/mL",
      maxCentralConcentration: "50 mcg/mL",
      standardInfusionRate: "Bolus 25 - 100 mcg IV lambat; infus sedasi ICU: 0.5 - 2 mcg/kgBB/jam (25 - 150 mcg/jam)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Injeksi bolus terlalu cepat (<1 menit) dapat memicu spasme otot dinding dada (wooden chest syndrome) yang menghambat ventilasi.",
        "Wajib monitor depresi pernapasan; siapkan Naloxone."
      ]
    },
    blackBoxIncompatibilities: [
      "Thiopental Sodium",
      "Methohexital"
    ]
  },
  {
    id: "iv-ketamine",
    name: "Ketamine Hydrochloride",
    genericName: "Ketamine HCl",
    brandNames: [
      "KTM",
      "Ketanest",
      "Ketalar",
      "Ivanes"
    ],
    category: "Sedasi & Anestesi",
    phRange: "3.5 - 5.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 500 mg (10 mL sediaan 50 mg/mL) ke dalam 40 mL NS/D5W (Konsentrasi: 10 mg/mL) atau ke dalam 500 mL D5W (Konsentrasi: 1 mg/mL)",
      resultantConcentration: "1 - 10 mg/mL",
      instructions: "Jangan gunakan bersamaan dalam spuit yang sama dengan barbiturat atau diazepam karena langsung membentuk endapan."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 - 10 mg/mL",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "Induksi anestesi: 1-2 mg/kgBB IV bolus lambat (60 detik); Infus sedasi/analgesia: 0.15 - 0.5 mg/kgBB/jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Injeksi cepat dapat memicu apnea sementara dan lonjakan tekanan darah/detak jantung.",
        "Inkompatibel kimiawi dengan Barbiturat (Thiopental) dan Diazepam."
      ]
    },
    blackBoxIncompatibilities: [
      "Thiopental Sodium",
      "Diazepam"
    ]
  },
  {
    id: "iv-dexmedetomidine",
    name: "Dexmedetomidine",
    genericName: "Dexmedetomidine Hydrochloride",
    brandNames: [
      "Precedex",
      "Dexmedetomidine OGB"
    ],
    category: "Sedasi & Anestesi",
    phRange: "4.5 - 7.0",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan 200 mcg (2 mL vial) ke dalam 48 mL NS 0.9% (Konsentrasi: 4 mcg/mL)",
      resultantConcentration: "4 mcg/mL",
      instructions: "Kocok perlahan agar homogen. Konsentrasi standar 4 mcg/mL adalah konsentrasi wajib untuk mencegah overdosis."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Pelarut utama adalah Normal Saline 0.9%."
    },
    stability: {
      roomTemp25C: "24 Jam (dalam spuit/kantong)",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "4 mcg/mL",
      maxCentralConcentration: "4 mcg/mL",
      standardInfusionRate: "Maintenance: 0.2 - 1.4 mcg/kgBB/jam (hindari bolus loading dose pada pasien kritis untuk mencegah bradikardia/hipotensi berat)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Wajib monitor kontinyu denyut jantung dan tekanan darah (risiko bradikardia sinus dan henti jantung sementara).",
        "Tidak menyebabkan depresi napas signifikan (keunggulan dibanding opioid/benzodiazepin)."
      ]
    },
    blackBoxIncompatibilities: [
      "Amphotericin B",
      "Diazepam"
    ]
  },
  {
    id: "iv-ciprofloxacin",
    name: "Ciprofloxacin IV",
    genericName: "Ciprofloxacin Lactate",
    brandNames: [
      "Baquinor IV",
      "Ciflox IV",
      "Ciproxin"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "3.5 - 4.6 (Asam)",
    reconstitution: {
      recommendedDiluent: "Tersedia dalam bentuk larutan siap infus (Premixed 200 mg/100 mL atau 400 mg/200 mL dalam NS/D5W)",
      volumeToReconstitute: "Larutan siap pakai (tidak memerlukan rekonstitusi serbuk)",
      resultantConcentration: "2 mg/mL",
      instructions: "Infus IV lambat selama minimal 60 menit (untuk 400 mg) guna mencegah flebitis dan sensasi terbakar pada vena."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Bentuk premixed stabil pada NS dan D5W."
    },
    stability: {
      roomTemp25C: "Stabil hingga tanggal kedaluwarsa jika terlindung dari cahaya (setelah dibuka gunakan dalam 24 jam)",
      refrigerated2to8C: "Dapat mengendap pada suhu dingin (refrigerated); SIMPAN PADA SUHU RUANG (15-30°C)",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL",
      maxCentralConcentration: "2 mg/mL",
      standardInfusionRate: "200 mg habis dalam 30-60 menit; 400 mg habis dalam 60 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "JANGAN DISIMPAN DI KULKAS karena suhu <15°C memicu presipitasi kristal siprofloksasin.",
        "Inkompatibel fatal pada percabangan Y-site dengan Furosemide, Heparin, Sodium Bicarbonate, Aminophylline, Methylprednisolone (presipitasi instan)."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Heparin",
      "Sodium Bicarbonate",
      "Aminophylline",
      "Methylprednisolone",
      "Cefepime"
    ]
  },
  {
    id: "iv-levofloxacin",
    name: "Levofloxacin IV",
    genericName: "Levofloxacin",
    brandNames: [
      "Cravit IV",
      "Levovid IV",
      "Lequin IV",
      "Levofloxacin OGB"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "3.8 - 5.8",
    reconstitution: {
      recommendedDiluent: "Premixed siap infus 500 mg/100 mL atau 750 mg/150 mL (5 mg/mL)",
      volumeToReconstitute: "Sediaan siap infus",
      resultantConcentration: "5 mg/mL",
      instructions: "Infus IV lambat selama minimal 60 menit (500 mg) atau 90 menit (750 mg). Lindungi dari paparan cahaya matahari langsung."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam setelah segel dibuka",
      refrigerated2to8C: "72 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "500 mg diberikan selama 60 menit; 750 mg selama 90 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Infus terlalu cepat dapat menyebabkan hipotensi mendadak dan takikardia.",
        "Inkompatibel dengan larutan alkali dan kation polivalen (Aluminium, Magnesium)."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Sodium Bicarbonate",
      "Heparin",
      "Acyclovir"
    ]
  },
  {
    id: "iv-metronidazole",
    name: "Metronidazole IV",
    genericName: "Metronidazole Injection",
    brandNames: [
      "Flagyl IV",
      "Metronidazole OGB",
      "Trichodazol IV"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "5.0 - 7.0",
    reconstitution: {
      recommendedDiluent: "Tersedia dalam botol infus siap pakai 500 mg/100 mL (5 mg/mL)",
      volumeToReconstitute: "Sediaan siap infus",
      resultantConcentration: "5 mg/mL",
      instructions: "JANGAN DISIMPAN DI DALAM KULKAS / LEMARI ES. Suhu dingin menyebabkan pembentukan kristal metronidazol yang tidak larut kembali."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Premixed siap infus."
    },
    stability: {
      roomTemp25C: "Stabil pada suhu ruang (15 - 25°C) terlindung dari cahaya",
      refrigerated2to8C: "KONTRAINDIKASI REFRIGERASI (Memicu Presipitasi Kristal)",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "500 mg diberikan secara IV drip selama 30 - 60 menit tiap 8 jam",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Dilarang menyimpan di kulkas (presipitasi kristal).",
        "Inkompatibel dengan jarum/set infus berbahan aluminium."
      ]
    },
    blackBoxIncompatibilities: [
      "Amphotericin B",
      "Aztreonam",
      "Dopamine (konsentrasi tinggi)"
    ]
  },
  {
    id: "iv-piperacillin-tazobactam",
    name: "Piperacillin / Tazobactam",
    genericName: "Piperacillin Sodium and Tazobactam Sodium",
    brandNames: [
      "Tazocin",
      "Bactacin",
      "Tazam",
      "Piptaz"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "5.5 - 6.8",
    reconstitution: {
      recommendedDiluent: "WFI atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan vial 4.5 g dengan 20 mL WFI/NS (kocok kuat hingga larut bening), lalu encerkan ke dalam 50-100 mL NS/D5W",
      resultantConcentration: "20 - 45 mg/mL",
      instructions: "Infus intermiten selama 30 menit atau extended infusion selama 3-4 jam untuk optimalisasi farmakokinetik/farmakodinamik (PK/PD T>MIC)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan WFI. Inkompatibel dengan Ringer Lactate."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang (25°C)",
      refrigerated2to8C: "48 Jam (2-8°C)",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "45 mg/mL",
      maxCentralConcentration: "45 mg/mL",
      standardInfusionRate: "Standard: 30 menit; Extended Infusion: 3 - 4 jam",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Inkompatibel Y-Site dengan Vancomycin pada banyak formulasi generik (terjadi presipitasi partikulat keruh seketika). Bilas jalur infus dengan 20 mL NS sebelum & sesudah!",
        "Inkompatibel langsung jika dicampur dengan Aminoglikosida (Gentamicin/Amikacin) karena inaktivasi cincin beta-laktam."
      ]
    },
    blackBoxIncompatibilities: [
      "Vancomycin (kondisional/inkompatibel pada banyak konsentrasi)",
      "Acyclovir",
      "Amphotericin B",
      "Gentamicin (inaktivasi langsung)"
    ]
  },
  {
    id: "iv-ampicillin-sulbactam",
    name: "Ampicillin / Sulbactam",
    genericName: "Ampicillin Sodium and Sulbactam Sodium",
    brandNames: [
      "Bactesyn",
      "Vicilin-SX",
      "Sulbacef",
      "Ampicillin-Sulbactam OGB"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "8.0 - 10.0 (Alkali/Basa)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau WFI (HINDARI D5W UNTUK INFUS LAMA)",
      volumeToReconstitute: "Larutkan vial 1.5 g dengan 3.2 mL WFI/NS, lalu encerkan ke dalam 50-100 mL NS 0.9%",
      resultantConcentration: "15 - 30 mg/mL",
      instructions: "Wajib menggunakan Normal Saline 0.9%. JANGAN gunakan D5W/Dextrose untuk infus berkepanjangan karena ampicillin terhidrolisis sangat cepat dalam larutan dekstrosa (stabilitas <1-2 jam)."
    },
    diluents: {
      ns: true,
      d5w: false,
      rl: false,
      wfi: true,
      d5ns: false,
      notes: "Normal Saline 0.9% adalah pelarut pilihan mutlak. Dalam D5W obat rusak dalam 1 jam."
    },
    stability: {
      roomTemp25C: "8 Jam dalam Normal Saline (dalam D5W hanya stabil 1 Jam)",
      refrigerated2to8C: "48 Jam dalam Normal Saline",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "30 mg/mL",
      maxCentralConcentration: "45 mg/mL",
      standardInfusionRate: "Diberikan secara IV drip lambat selama 15 - 30 menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Jangan dicampur dengan sediaan darah atau cairan yang mengandung lipid.",
        "Inkompatibel dengan aminoglikosida dalam satu wadah/spuit."
      ]
    },
    blackBoxIncompatibilities: [
      "Dextrose 5% (degradasi hidrolisis cepat)",
      "Gentamicin",
      "Amikacin",
      "Ciprofloxacin",
      "Midazolam"
    ]
  },
  {
    id: "iv-gentamicin",
    name: "Gentamicin Sulfate",
    genericName: "Gentamicin Sulfate",
    brandNames: [
      "Garamycin IV/IM",
      "Gentamicin OGB",
      "Ottogenta"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "3.0 - 5.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan dosis terhitung (misal 5-7 mg/kgBB) ke dalam 50 - 100 mL NS atau D5W",
      resultantConcentration: "1 - 2 mg/mL",
      instructions: "Infus selama 30 - 60 menit. Jangan diberikan secara IV bolus cepat karena memicu blokade neuromuskular dan nefrotoksisitas."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "7 Hari",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL",
      maxCentralConcentration: "2 mg/mL",
      standardInfusionRate: "Diberikan secara IV drip selama 30 - 60 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Wajib monitor fungsi ginjal (Serum Kreatinin) dan fungsi pendengaran (Ototoksisitas vestibular/koklear).",
        "Inkompatibel kimiawi dengan Heparin dan Penicillin/Beta-laktam jika dicampur dalam satu wadah infus."
      ]
    },
    blackBoxIncompatibilities: [
      "Heparin",
      "Furosemide",
      "Ampicillin",
      "Piperacillin (jika tercampur langsung dalam botol/spuit yang sama)",
      "Propofol"
    ]
  },
  {
    id: "iv-fluconazole",
    name: "Fluconazole IV",
    genericName: "Fluconazole",
    brandNames: [
      "Diflucan IV",
      "Fluconazole OGB",
      "Flucoral"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "3.5 - 6.5",
    reconstitution: {
      recommendedDiluent: "Tersedia premixed 200 mg/100 mL dalam NS 0.9% (2 mg/mL)",
      volumeToReconstitute: "Sediaan siap infus",
      resultantConcentration: "2 mg/mL",
      instructions: "Kecepatan infus maksimum tidak boleh melebihi 200 mg/jam (100 mL/jam)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan Ringer Lactate."
    },
    stability: {
      roomTemp25C: "Stabil hingga batas kedaluwarsa pada suhu ruang (15-30°C)",
      refrigerated2to8C: "Dapat disimpan pada 2-8°C, jangan dibekukan",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL",
      maxCentralConcentration: "2 mg/mL",
      standardInfusionRate: "Maksimal 200 mg/jam (infus 200 mg habis dalam minimal 60 menit)",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Infus cepat dapat memicu kemerahan kulit, hipotensi, dan aritmia.",
        "Inkompatibel Y-Site dengan Furosemide, Diazepam, Ceftriaxone, dan Pantoprazole."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Diazepam",
      "Pantoprazole",
      "Amphotericin B"
    ]
  },
  {
    id: "iv-acyclovir",
    name: "Acyclovir Sodium",
    genericName: "Acyclovir Sodium",
    brandNames: [
      "Zovirax IV",
      "Acyclovir OGB",
      "Clovir"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "10.5 - 11.5 (Sangat Basa / Alkali Kuat)",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI) atau NS 0.9%",
      volumeToReconstitute: "Larutkan vial 250 mg atau 500 mg dengan 10 mL WFI (Konsentrasi: 25 - 50 mg/mL), lalu ENCERKAN ke dalam 100 mL NS/D5W hingga konsentrasi ≤7 mg/mL",
      resultantConcentration: "≤ 7 mg/mL (wajib diencerkan untuk mencegah flebitis berat dan kristaluria)",
      instructions: "Wajib diinfuskan lambat selama minimal 60 menit dengan hidrasi cairan yang cukup untuk mencegah nefropati kristal akut di tubulus ginjal."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Gunakan WFI untuk rekonstitusi awal, lalu encerkan dengan NS/D5W."
    },
    stability: {
      roomTemp25C: "12 Jam setelah rekonstitusi & pengenceran pada suhu ruang 15-25°C",
      refrigerated2to8C: "KONTRAINDIKASI REFRIGERASI (Suhu dingin memicu presipitasi kristal acyclovir)",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "7 mg/mL",
      maxCentralConcentration: "7 mg/mL",
      standardInfusionRate: "Diberikan melalui infus IV lambat selama minimal 60 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "pH larutan sangat basa (10.5 - 11.5); ekstravasasi dapat menyebabkan nekrosis jaringan parah.",
        "Wajib hidrasi cairan adekuat sebelum & sesudah infus untuk mencegah presipitasi kristal di ginjal.",
        "Inkompatibel Y-Site dengan hampir semua obat asam (Dopamine, Dobutamine, Midazolam, Morphine, Vancomycin, Ondansetron)."
      ]
    },
    blackBoxIncompatibilities: [
      "Dopamine",
      "Dobutamine",
      "Norepinephrine",
      "Midazolam",
      "Morphine",
      "Vancomycin",
      "Ondansetron",
      "Fentanyl"
    ]
  },
  {
    id: "iv-sodium-bicarbonate",
    name: "Sodium Bicarbonate 8.4% (Meylon)",
    genericName: "Sodium Bicarbonate 8.4% (1 mEq/mL)",
    brandNames: [
      "Meylon 8.4%",
      "Bicnat",
      "Sodium Bicarbonate OGB"
    ],
    category: "Elektrolit & Koreksi",
    phRange: "7.0 - 8.5 (Basa)",
    reconstitution: {
      recommendedDiluent: "D5W atau WFI (Dapat diberikan murni via vena sentral pada henti jantung / resusitasi)",
      volumeToReconstitute: "Sediaan 8.4% mengandung 1 mEq/mL (Osmolaritas ~2000 mOsm/L; sangat hipertonik)",
      resultantConcentration: "1 mEq/mL (8.4%) atau diencerkan 1:1 dengan D5W/WFI menjadi 4.2% (0.5 mEq/mL)",
      instructions: "Infus perifer wajib diencerkan untuk mencegah flebitis kimiawi berat. Jangan pernah mencampur dengan kalsium!"
    },
    diluents: {
      ns: false,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: false,
      notes: "D5W dan WFI adalah pelarut pengencer utama."
    },
    stability: {
      roomTemp25C: "24 Jam setelah dibuka",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "4.2% (0.5 mEq/mL - wajib diencerkan dengan D5W)",
      maxCentralConcentration: "8.4% (1 mEq/mL - Vena Sentral)",
      standardInfusionRate: "Resusitasi henti jantung: Bolus IV 1 mEq/kg; Koreksi asidosis metabolik: drip selama 2-4 jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "KONTRAINDIKASI MUTLAK DICAMPUR DENGAN KALSIUM: Langsung membentuk endapan kapur kalsium karbonat (chalky white precipitate).",
        "Inkompatibel dengan semua katekolamin vasoaktif (Norepinephrine, Epinephrine, Dopamine, Dobutamine) karena memicu inaktivasi oksidatif basa seketika."
      ]
    },
    blackBoxIncompatibilities: [
      "Calcium Gluconate",
      "Calcium Chloride",
      "Norepinephrine",
      "Epinephrine",
      "Dopamine",
      "Dobutamine",
      "Amiodarone",
      "Ciprofloxacin"
    ]
  },
  {
    id: "iv-calcium-gluconate",
    name: "Calcium Gluconate 10%",
    genericName: "Calcium Gluconate 10% (0.465 mEq Ca2+/mL)",
    brandNames: [
      "Calcium Gluconate OGB",
      "Calcii Gluconas"
    ],
    category: "Elektrolit & Koreksi",
    phRange: "6.0 - 8.2",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "1 Ampul (10 mL = 1 g) diencerkan ke dalam 50 - 100 mL D5W/NS (Konsentrasi: 10 - 20 mg/mL)",
      resultantConcentration: "10 - 20 mg/mL (infus) atau 100 mg/mL (bolus darurat sangat lambat)",
      instructions: "Infus IV lambat selama 20 - 60 menit. Pada darurat hiperkalemia dengan perubahan EKG, bolus 10 mL diberikan minimal selama 3-5 menit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam setelah diencerkan",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "50 mg/mL",
      maxCentralConcentration: "100 mg/mL",
      standardInfusionRate: "Bolus darurat: 10 mL selama 3 - 5 menit; Infus kontinu: 1 - 2 g selama 1 - 2 jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "BLACK BOX WARNING FDA: KONTRAINDIKASI FATAL BERSAMA CEFTRIAXONE PADA NEONATUS/BAYI (presipitasi kristal kalsium-seftriakson di paru & ginjal).",
        "KONTRAINDIKASI BERSAMA SODIUM BICARBONATE & FOSFAT (Presipitasi Kalsium Karbonat / Kalsium Fosfat tak larut).",
        "Injeksi bolus terlalu cepat dapat menyebabkan vasodilatasi mendadak, bradikardia parah, aritmia, dan henti jantung."
      ]
    },
    blackBoxIncompatibilities: [
      "Ceftriaxone (FATAL)",
      "Sodium Bicarbonate (FATAL)",
      "Potassium Phosphate",
      "Amphotericin B",
      "Fluconazole"
    ]
  },
  {
    id: "iv-magnesium-sulfate",
    name: "Magnesium Sulfate (MgSO4 20% / 40%)",
    genericName: "Magnesium Sulfate Heptahydrate",
    brandNames: [
      "MgSO4 20%",
      "MgSO4 40% Otsuka",
      "Magnesium Sulfate OGB"
    ],
    category: "Elektrolit & Koreksi",
    phRange: "5.5 - 7.0",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan 4 g MgSO4 40% (10 mL) ke dalam 100 mL NS/D5W untuk loading dose, atau 10 g dalam 500 mL NS untuk maintenance",
      resultantConcentration: "20 - 40 mg/mL (maksimal 200 mg/mL untuk IV bolus sangat lambat)",
      instructions: "Wajib diencerkan hingga konsentrasi ≤20% sebelum pemberian IV."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam setelah pelarutan",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "200 mg/mL (20%)",
      maxCentralConcentration: "200 mg/mL (20%)",
      standardInfusionRate: "Eklamsia loading dose: 4 g IV selama 15-20 menit; Maintenance: 1 - 2 g/jam via syringe pump",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Wajib monitor refleks patella, laju pernapasan (minimal ≥16x/menit), dan produksi urin (minimal ≥30 mL/jam).",
        "Siapkan antidotum Kalsium Glukonat 10% di dekat tempat tidur pasien jika terjadi tanda intoksikasi magnesium."
      ]
    },
    blackBoxIncompatibilities: [
      "Calcium Gluconate (konsentrasi pekat)",
      "Sodium Bicarbonate",
      "Salicylates",
      "Clindamycin"
    ]
  },
  {
    id: "iv-ondansetron",
    name: "Ondansetron Hydrochloride",
    genericName: "Ondansetron HCl",
    brandNames: [
      "Narfoz IV",
      "Zofran IV",
      "Cendantron IV",
      "Ondansetron OGB"
    ],
    category: "Gastrointestinal",
    phRange: "3.3 - 4.0 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Dapat diberikan bolus perlahan tanpa pengenceran (4-8 mg dalam 2-4 mL) atau diencerkan ke dalam 50 mL NS/D5W",
      resultantConcentration: "0.08 - 2 mg/mL",
      instructions: "Injeksi IV bolus lambat selama 2 - 5 menit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "48 Jam pada suhu ruang terlindung dari cahaya",
      refrigerated2to8C: "7 Hari",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL",
      maxCentralConcentration: "2 mg/mL",
      standardInfusionRate: "Bolus IV lambat selama 2 - 5 menit; Infus kemoterapi: 15 menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Dapat memicu perpanjangan interval QT pada EKG; gunakan dengan hati-hati pada pasien dengan sindrom QT panjang.",
        "Inkompatibel Y-Site dengan Furosemide, Lorazepam, Methylprednisolone, Ampicillin, dan Acyclovir."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Methylprednisolone",
      "Lorazepam",
      "Acyclovir",
      "Sodium Bicarbonate"
    ]
  },
  {
    id: "iv-metoclopramide",
    name: "Metoclopramide (Primperan)",
    genericName: "Metoclopramide Hydrochloride",
    brandNames: [
      "Primperan IV",
      "Sotatic IV",
      "Tomit",
      "Metoclopramide OGB"
    ],
    category: "Gastrointestinal",
    phRange: "2.5 - 6.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%), D5W, atau RL",
      volumeToReconstitute: "Dapat diberikan bolus lambat (10 mg / 2 mL) atau diencerkan ke dalam 50 mL NS/D5W",
      resultantConcentration: "0.2 - 5 mg/mL",
      instructions: "Injeksi IV bolus wajib diberikan secara perlahan selama minimal 1-2 menit untuk mencegah rasa cemas/gelisah ekstrem (akathisia)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan semua pelarut kristaloid standar."
    },
    stability: {
      roomTemp25C: "24 Jam terlindung dari cahaya",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "Bolus lambat minimal 1 - 2 menit per 10 mg",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Pemberian bolus cepat menyebabkan disforia, agitasi motorik, dan reaksi ekstrapiramidal (distonia akut).",
        "Inkompatibel dengan Furosemide, Calcium Gluconate, Ampicillin, dan Sodium Bicarbonate."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Sodium Bicarbonate",
      "Ampicillin",
      "Cefepime"
    ]
  },
  {
    id: "iv-ranitidine",
    name: "Ranitidine Hydrochloride",
    genericName: "Ranitidine HCl Injection",
    brandNames: [
      "Acran IV",
      "Rantin IV",
      "Ranitidine OGB",
      "Zantac IV"
    ],
    category: "Gastrointestinal",
    phRange: "6.7 - 7.3",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 50 mg (2 mL) dengan 18 mL NS hingga 20 mL untuk IV bolus, atau dalam 50-100 mL NS untuk infus",
      resultantConcentration: "0.5 - 2.5 mg/mL",
      instructions: "Injeksi IV bolus wajib diencerkan hingga minimal 20 mL dan disuntikkan lambat selama 5 menit untuk mencegah bradikardia."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "48 Jam pada suhu ruang",
      refrigerated2to8C: "7 Hari",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2.5 mg/mL",
      maxCentralConcentration: "2.5 mg/mL",
      standardInfusionRate: "Bolus IV lambat minimal 5 menit; Infus kontinu: 6.25 mg/jam (150 mg/24 jam)",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Injeksi bolus cepat dapat memicu bradikardia transien dan hipotensi.",
        "Inkompatibel dengan Amphotericin B dan Diazepam."
      ]
    },
    blackBoxIncompatibilities: [
      "Amphotericin B",
      "Diazepam",
      "Midazolam (konsentrasi tinggi)"
    ]
  },
  {
    id: "iv-tranexamic-acid",
    name: "Tranexamic Acid (Asam Traneksamat)",
    genericName: "Tranexamic Acid Injection",
    brandNames: [
      "Transamin IV",
      "Kalnex IV",
      "Plasil IV",
      "Asam Traneksamat OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "6.5 - 8.0",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%), D5W, atau RL",
      volumeToReconstitute: "Larutkan 500 mg - 1000 mg (5 - 10 mL) ke dalam 50 - 100 mL NS/D5W/RL",
      resultantConcentration: "5 - 20 mg/mL",
      instructions: "Infus IV lambat dengan kecepatan tidak melebihi 100 mg/menit (1 g habis dalam minimal 10-15 menit)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9%, D5W, RL, dan larutan elektrolit seimbang."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "20 mg/mL",
      maxCentralConcentration: "50 mg/mL",
      standardInfusionRate: "Loading dose: 1 g IV selama 10 - 20 menit; Maintenance: 1 g IV drip selama 8 jam (protokol trauma CRASH-2)",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Penyuntikan IV terlalu cepat dapat memicu hipotensi akut dan mual/muntah hebat.",
        "Jangan dicampur bersamaan dengan sediaan darah atau larutan yang mengandung penisilin."
      ]
    },
    blackBoxIncompatibilities: [
      "Urokinase",
      "Streptokinase",
      "Dopamine (konsentrasi tinggi)"
    ]
  },
  {
    id: "iv-aminophylline",
    name: "Aminophylline",
    genericName: "Aminophylline (Theophylline Ethylenediamine)",
    brandNames: [
      "Phyllocontin",
      "Aminophylline OGB",
      "Pharkan"
    ],
    category: "Lainnya",
    phRange: "8.6 - 9.0 (Basa Kuat)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 250 mg (10 mL) ke dalam 100 - 250 mL NS/D5W (Konsentrasi: 1 - 2.5 mg/mL)",
      resultantConcentration: "1 - 2.5 mg/mL",
      instructions: "Kecepatan infus tidak boleh melebihi 25 mg/menit untuk mencegah aritmia ventrikel dan kejang toksik."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2.5 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "Loading dose: 5-6 mg/kgBB IV selama 20-30 menit; Maintenance: 0.4 - 0.7 mg/kgBB/jam",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Rentang terapi sempit (10 - 20 mcg/mL); toksisitas menyebabkan takiaritmia fatal dan kejang refrakter.",
        "pH sangat basa; inkompatibel fatal dengan katekolamin (Epinephrine, Norepinephrine, Dopamine, Dobutamine), Morphine, Ciprofloxacin, dan Ondansetron."
      ]
    },
    blackBoxIncompatibilities: [
      "Epinephrine",
      "Norepinephrine",
      "Dobutamine",
      "Dopamine",
      "Morphine",
      "Ciprofloxacin",
      "Ondansetron",
      "Ceftriaxone"
    ]
  },
  {
    id: "iv-dexamethasone",
    name: "Dexamethasone Sodium Phosphate",
    genericName: "Dexamethasone Sodium Phosphate",
    brandNames: [
      "Kalmethasone IV",
      "Indexon IV",
      "Dexamethasone OGB",
      "Decadron"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "7.0 - 8.5",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Dapat diberikan bolus IV langsung (4-10 mg dalam 1-2 mL) atau diencerkan ke dalam 50 mL NS/D5W",
      resultantConcentration: "0.1 - 5 mg/mL",
      instructions: "Injeksi IV bolus lambat selama 2-5 menit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "Bolus lambat 2-5 menit atau infus intermiten 15 menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Injeksi bolus terlalu cepat dapat memicu sensasi terbakar/nyeri perianal sementara yang intens.",
        "Inkompatibel Y-Site dengan Ciprofloxacin, Midazolam, Ondansetron, dan Vancomycin."
      ]
    },
    blackBoxIncompatibilities: [
      "Ciprofloxacin",
      "Midazolam",
      "Vancomycin (konsentrasi pekat)",
      "Haloperidol"
    ]
  },
  {
    id: "iv-methylprednisolone",
    name: "Methylprednisolone (Solu-Medrol)",
    genericName: "Methylprednisolone Sodium Succinate",
    brandNames: [
      "Solu-Medrol",
      "Lameson IV",
      "Toras",
      "Methylprednisolone OGB"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "7.0 - 8.0",
    reconstitution: {
      recommendedDiluent: "Bacteriostatic Water for Injection atau WFI khusus yang disertakan dalam Act-O-Vial",
      volumeToReconstitute: "Tekan tombol Act-O-Vial untuk melarutkan 125 mg, 500 mg, atau 1000 mg serbuk dengan pelarut, lalu encerkan ke dalam 50-250 mL D5W/NS",
      resultantConcentration: "2.5 - 20 mg/mL",
      instructions: "Dosis pulse / tinggi (>250 mg) wajib diinfuskan selama minimal 30 - 60 menit untuk mencegah henti jantung dan aritmia fatal."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan D5W dan NS 0.9%."
    },
    stability: {
      roomTemp25C: "48 Jam setelah rekonstitusi pada suhu ruang 20-25°C",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "20 mg/mL",
      maxCentralConcentration: "20 mg/mL",
      standardInfusionRate: "Dosis rendah (≤125 mg): IV bolus lambat 5 menit; Dosis tinggi (≥500 mg): infus minimal 30 - 60 menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Penyuntikan bolus cepat dosis tinggi (>500 mg dalam <10 menit) dilaporkan menyebabkan aritmia ventrikel dan kolaps kardiovaskular fatal.",
        "Inkompatibel Y-Site dengan Ciprofloxacin, Diltiazem, Ondansetron, Promethazine, dan Potassium Chloride."
      ]
    },
    blackBoxIncompatibilities: [
      "Ciprofloxacin",
      "Diltiazem",
      "Ondansetron",
      "Promethazine",
      "Calcium Gluconate"
    ]
  },
  {
    id: "iv-diazepam",
    name: "Diazepam (Valium / Stesolid)",
    genericName: "Diazepam Injection",
    brandNames: [
      "Valium IV",
      "Stesolid IV",
      "Diazepam OGB"
    ],
    category: "Sedasi & Anestesi",
    phRange: "6.2 - 6.9 (Mengandung pelarut Propilen Glikol & Etanol)",
    reconstitution: {
      recommendedDiluent: "DIBERIKAN MURNI TANPA PENGENCERAN (Injeksi IV bolus langsung lambat)",
      volumeToReconstitute: "Sediaan 5 mg/mL mengandung pelarut hidrofobik",
      resultantConcentration: "5 mg/mL",
      instructions: "JANGAN DIENCERKAN ke dalam kantong infus cairan kristaloid biasa karena segera memicu presipitasi kabut putih susu partikulat tak larut."
    },
    diluents: {
      ns: false,
      d5w: false,
      rl: false,
      wfi: false,
      d5ns: false,
      notes: "Inkompatibel untuk pencampuran infus kristaloid rutin (mengendap). Diberikan bolus langsung."
    },
    stability: {
      roomTemp25C: "Segera gunakan setelah spuit disiapkan",
      refrigerated2to8C: "Tidak dianjurkan disimpan dalam spuit plastik",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "IV bolus lambat tidak melebihi 5 mg/menit (2-5 menit per 10 mg)",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "Injeksi langsung ke vena besar; hindari vena kecil di punggung tangan (risiko tromboflebitis tinggi karena pelarut propilen glikol).",
        "INKOMPATIBEL Y-SITE DENGAN HAMPIR SEMUA OBAT LAIN (Langsung presipitasi putih keruh). Wajib bilas jalur infus sebelum dan sesudah dengan 10-20 mL NS."
      ]
    },
    blackBoxIncompatibilities: [
      "Semua obat infus kristaloid (Presipitasi instan)",
      "Furosemide",
      "Morphine",
      "Fentanyl",
      "Potassium Chloride",
      "Ceftriaxone",
      "Dobutamine"
    ]
  },
  {
    id: "iv-diltiazem",
    name: "Diltiazem Hydrochloride",
    genericName: "Diltiazem HCl Injection",
    brandNames: [
      "Herbesser IV",
      "Farmabes IV",
      "Diltiazem OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "3.7 - 4.4 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan vial 50 mg serbuk dengan 5 mL NS/WFI, lalu encerkan ke dalam 100 - 250 mL NS/D5W (Konsentrasi: 0.5 - 1 mg/mL) atau 50 mg dalam 50 mL via syringe pump (1 mg/mL)",
      resultantConcentration: "0.5 - 1 mg/mL",
      instructions: "Infus titrasi untuk kontrol laju ventrikel pada AF/Atrial Flutter atau krisis hipertensi."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang (25°C)",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "1 mg/mL",
      maxCentralConcentration: "1 mg/mL",
      standardInfusionRate: "Bolus awal 0.25 mg/kgBB selama 2 menit; dilanjutkan infus 5 - 15 mg/jam (titrasi respons denyut jantung)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Kontraindikasi pada syok kardiogenik, blok AV derajat 2/3 tanpa pacemaker, dan sindrom WPW dengan AF.",
        "Inkompatibel Y-Site dengan Furosemide, Thiopental, Diazepam, dan Phenytoin."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide (Presipitasi instan)",
      "Sodium Bicarbonate",
      "Diazepam",
      "Methylprednisolone"
    ]
  },
  {
    id: "iv-ketorolac",
    name: "Ketorolac Tromethamine",
    genericName: "Ketorolac Tromethamine",
    brandNames: [
      "Toradol IV",
      "Ketolac IV",
      "Remopain IV",
      "Ketorolac OGB"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "6.9 - 7.9",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Dapat diberikan bolus IV langsung (30 mg / 1 mL) secara lambat atau diencerkan ke dalam 50-100 mL NS/D5W",
      resultantConcentration: "0.3 - 30 mg/mL",
      instructions: "Pemberian IV bolus disuntikkan perlahan selama minimal 15 detik. Durasi total terapi maksimal 5 hari untuk mencegah gagal ginjal akut & perdarahan lambung masif."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan Ringer Lactate."
    },
    stability: {
      roomTemp25C: "48 Jam terlindung dari cahaya",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "30 mg/mL",
      maxCentralConcentration: "30 mg/mL",
      standardInfusionRate: "Bolus IV lambat minimal 15-30 detik (15 - 30 mg tiap 6-8 jam; maks 120 mg/hari; lansia maks 60 mg/hari)",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "DURASI MAKSIMAL 5 HARI (risiko ulserasi gastrointestinal dan nefrotoksisitas akut berat).",
        "Inkompatibel Y-Site dengan Morphine Sulfate, Haloperidol, Hydroxyzine, dan Promethazine (presipitasi garam)."
      ]
    },
    blackBoxIncompatibilities: [
      "Morphine (konsentrasi pekat)",
      "Haloperidol",
      "Promethazine",
      "Azithromycin"
    ]
  },
  {
    id: "iv-tramadol",
    name: "Tramadol Hydrochloride",
    genericName: "Tramadol HCl Injection",
    brandNames: [
      "Tramal IV",
      "Centrasic IV",
      "Tramadol OGB",
      "Tradyl"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "5.0 - 7.0",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 100 mg (2 mL) ke dalam 50 - 100 mL NS/D5W (Konsentrasi: 1 - 2 mg/mL)",
      resultantConcentration: "1 - 2 mg/mL",
      instructions: "Infus perlahan selama 15 - 30 menit atau bolus IV sangat lambat selama 2-3 menit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9%, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "50 - 100 mg IV diberikan perlahan selama 15 - 30 menit tiap 6-8 jam (maksimal 400 mg/hari)",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Injeksi bolus cepat memicu mual hebat, muntah, pusing berputar, dan berkeringat dingin.",
        "Waspada risiko sindrom serotonin dan penurunan ambang kejang."
      ]
    },
    blackBoxIncompatibilities: [
      "Diazepam",
      "Midazolam (kondisional)",
      "Acyclovir"
    ]
  },
  {
    id: "iv-insulin-regular",
    name: "Insulin Regular (Human)",
    genericName: "Regular Human Insulin Injection",
    brandNames: [
      "Actrapid HM",
      "Humulin R",
      "Novolin R",
      "Insulatard"
    ],
    category: "Elektrolit & Koreksi",
    phRange: "7.0 - 7.8 (Netral)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan 50 Unit (0.5 mL sediaan 100 IU/mL) ke dalam 50 mL NS 0.9% (Konsentrasi tepat: 1 Unit/mL)",
      resultantConcentration: "1 Unit/mL (infus kontinu)",
      instructions: "Wajib priming (bilas dan buang 20-50 mL larutan pertama yang melewati selang infus) karena molekul insulin menempel kuat (teradsorpsi) pada permukaan dinding plastik selang/syringe."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Normal Saline 0.9% adalah pelarut standar definitif untuk koreksi DKA/HHS."
    },
    stability: {
      roomTemp25C: "24 Jam setelah dicampur dalam NS pada suhu ruang",
      refrigerated2to8C: "24 Jam (Vial belum dibuka stabil pada 2-8°C hingga kedaluwarsa)",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "1 Unit/mL",
      maxCentralConcentration: "1 Unit/mL",
      standardInfusionRate: "Protokol DKA: Bolus 0.1 Unit/kg dilanjutkan infus kontinu 0.1 Unit/kgBB/jam (titrasi penurunan GDS 50-75 mg/dL/jam)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Wajib monitor GDS berkala tiap 1 jam dan Kalium darah tiap 2-4 jam (insulin memicu perpindahan kalium intraseluler / hipokalemia berat).",
        "Inkompatibel dengan larutan asam kuat dan pemanasan."
      ]
    },
    blackBoxIncompatibilities: [
      "Dopamine (konsentrasi pekat)",
      "Dobutamine",
      "Phenytoin",
      "Sodium Bicarbonate"
    ]
  }
,
  {
    id: "iv-omeprazole",
    name: "Omeprazole Sodium IV",
    genericName: "Omeprazole Sodium",
    brandNames: [
      "Losec IV",
      "Ozid IV",
      "Gastrofer IV",
      "Omeprazole OGB"
    ],
    category: "Gastrointestinal",
    phRange: "9.0 - 10.0 (Basa Kuat)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W (Tersedia pelarut khusus bawaan pabrik 10 mL untuk bolus)",
      volumeToReconstitute: "Larutkan vial 40 mg dengan 10 mL pelarut khusus bawaan / NS untuk bolus lambat (4 mg/mL), atau larutkan dalam 100 mL NS / D5W untuk drip (0.4 mg/mL)",
      resultantConcentration: "0.4 mg/mL (infus) atau 4 mg/mL (bolus)",
      instructions: "Infus IV bolus diberikan perlahan minimal 2.5 - 5 menit. Jika menggunakan D5W, infus harus dihabiskan dalam waktu MAKSIMAL 6 JAM karena omeprazole terdegradasi cepat pada pH asam D5W. Dalam NS stabil hingga 12 jam."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: false,
      notes: "Normal Saline 0.9% lebih disukai (stabil 12 jam). Dalam D5W hanya stabil 6 jam karena sifat asam dekstrosa."
    },
    stability: {
      roomTemp25C: "12 Jam dalam NS 0.9%; 6 Jam dalam D5W",
      refrigerated2to8C: "24 Jam dalam NS 0.9%",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "4 mg/mL (bolus) / 0.4 mg/mL (infus)",
      maxCentralConcentration: "4 mg/mL",
      standardInfusionRate: "Bolus IV lambat selama 2.5 - 5 menit; Drip kontinu perdarahan saluran cerna: bolus 80 mg dilanjutkan 8 mg/jam selama 72 jam via syringe pump",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Wajib terlindung dari cahaya (larutan dapat menguning/kecokelatan jika teroksidasi). Jangan gunakan jika warna berubah menjadi gelap.",
        "pH larutan sangat basa (9.0 - 10.0); inkompatibel seketika dengan larutan asam (Dopamine, Dobutamine, Midazolam, Ondansetron, Morphine, Fentanyl)."
      ]
    },
    blackBoxIncompatibilities: [
      "Dopamine",
      "Dobutamine",
      "Norepinephrine",
      "Midazolam",
      "Ondansetron",
      "Morphine",
      "Fentanyl",
      "Ciprofloxacin"
    ]
  },
  {
    id: "iv-esomeprazole",
    name: "Esomeprazole Sodium IV",
    genericName: "Esomeprazole Sodium",
    brandNames: [
      "Nexium IV",
      "Esomeprazole OGB",
      "Inexium"
    ],
    category: "Gastrointestinal",
    phRange: "9.0 - 11.0 (Basa Kuat)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan vial 40 mg dengan 5 mL NS/D5W untuk IV bolus, atau dalam 100 mL NS/D5W untuk infus intermiten (0.4 mg/mL)",
      resultantConcentration: "0.4 - 8 mg/mL",
      instructions: "Injeksi IV bolus diberikan minimal selama 3 menit. Untuk perdarahan ulkus peptikum berat: bolus 80 mg dalam 30 menit, dilanjutkan infus kontinu 8 mg/jam selama 71.5 jam."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9%, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "12 Jam dalam NS 0.9%; 6 Jam dalam D5W",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "8 mg/mL",
      maxCentralConcentration: "8 mg/mL",
      standardInfusionRate: "Bolus lambat minimal 3 menit; Infus kontinu perdarahan: 8 mg/jam via syringe pump",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Larutan bersifat basa; hindari pencampuran dengan sediaan obat yang bersifat asam pada jalur infus yang sama.",
        "Inkompatibel Y-Site dengan Ondansetron, Midazolam, dan Katekolamin."
      ]
    },
    blackBoxIncompatibilities: [
      "Ondansetron",
      "Midazolam",
      "Dopamine",
      "Dobutamine",
      "Morphine"
    ]
  },
  {
    id: "iv-paracetamol",
    name: "Paracetamol IV (Infus 1000 mg/100 mL)",
    genericName: "Acetaminophen / Paracetamol",
    brandNames: [
      "Sanmol IV",
      "Perfalgan",
      "Farmadol IV",
      "Paracetamol OGB Infus",
      "Tamoliv"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "5.5 - 6.5 (Netral)",
    reconstitution: {
      recommendedDiluent: "Sediaan siap infus premixed (1000 mg/100 mL / 10 mg/mL)",
      volumeToReconstitute: "Larutan siap infus (tidak perlu rekonstitusi serbuk)",
      resultantConcentration: "10 mg/mL",
      instructions: "Infus IV diberikan selama 15 menit. Pada pasien dengan BB <50 kg, dosis harus disesuaikan secara ketat 15 mg/kgBB (jangan berikan 1 botol penuh 100 mL)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Dapat diencerkan lebih lanjut dengan NS 0.9% atau D5W jika diperlukan (hingga 1:10)."
    },
    stability: {
      roomTemp25C: "Segera gunakan setelah botol dibuka (maksimal 6 jam)",
      refrigerated2to8C: "Simpan pada suhu ruang (15-30°C); jangan disimpan di kulkas",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "10 mg/mL",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "Diberikan secara IV drip selama 15 menit tiap 6 jam (maksimal 4 g/hari pada dewasa ≥50 kg)",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Waspada kesalahan dosis 10-kali lipat pada pasien pediatrik/BB rendah: gunakan satuan mg dan volume mL yang tepat.",
        "Inkompatibel jika dicampur langsung dengan Diazepam, Chlorpromazine, dan Sodium Bicarbonate."
      ]
    },
    blackBoxIncompatibilities: [
      "Diazepam",
      "Sodium Bicarbonate",
      "Chlorpromazine"
    ]
  },
  {
    id: "iv-cefotaxime",
    name: "Cefotaxime Sodium",
    genericName: "Cefotaxime Sodium",
    brandNames: [
      "Claforan",
      "Taxegram",
      "Cefotaxime OGB",
      "Kalfoxim"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "4.5 - 6.5",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI), NS 0.9%, atau D5W",
      volumeToReconstitute: "Larutkan vial 1 g dengan 4 mL WFI untuk bolus IV (kocok kuat), lalu encerkan ke dalam 50-100 mL NS/D5W untuk infus",
      resultantConcentration: "10 - 200 mg/mL",
      instructions: "Injeksi IV bolus lambat selama 3 - 5 menit atau infus intermiten selama 20 - 30 menit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, RL, dan WFI."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang (25°C)",
      refrigerated2to8C: "7 Hari pada 2-8°C",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "100 mg/mL",
      maxCentralConcentration: "200 mg/mL",
      standardInfusionRate: "Bolus IV lambat 3-5 menit atau infus drip 20-30 menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Warna larutan dapat menggelap menjadi kuning jerami/cokelat pucat saat penyimpanan (tidak mempengaruhi potensi selama dalam rentang BUD).",
        "Inkompatibel fisiko-kimiawi langsung dengan Aminoglikosida dan Sodium Bicarbonate."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate",
      "Gentamicin (dalam botol/spuit yang sama)",
      "Amikacin",
      "Allopurinol"
    ]
  },
  {
    id: "iv-ceftazidime",
    name: "Ceftazidime",
    genericName: "Ceftazidime Pentahydrate",
    brandNames: [
      "Fortum",
      "Ceptik",
      "Thidim",
      "Ceftazidime OGB"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "5.0 - 7.5",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI) atau NS 0.9%",
      volumeToReconstitute: "Larutkan 1 g dengan 10 mL WFI (atau 50 mL NS untuk infus). PERINGATAN TEKANAN: Rekonstitusi melepaskan gas CO2 yang meningkatkan tekanan internal vial secara signifikan.",
      resultantConcentration: "20 - 100 mg/mL",
      instructions: "Setelah memasukkan pelarut, biarkan vial beberapa saat hingga buih gelembung CO2 menghilang dan larutan menjadi jernih kekuningan."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "18 Jam pada suhu ruang (25°C)",
      refrigerated2to8C: "7 Hari pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "40 mg/mL",
      maxCentralConcentration: "100 mg/mL",
      standardInfusionRate: "Infus intermiten selama 30 menit atau extended infusion selama 3-4 jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Waspadai lonjakan tekanan gas CO2 di dalam vial saat menusukkan jarum rekonstitusi.",
        "Inkompatibel Y-Site dengan Vancomycin (membentuk presipitat keruh), Aminophylline, dan Fluconazole."
      ]
    },
    blackBoxIncompatibilities: [
      "Vancomycin",
      "Aminophylline",
      "Fluconazole",
      "Midazolam"
    ]
  },
  {
    id: "iv-cefepime",
    name: "Cefepime Hydrochloride",
    genericName: "Cefepime HCl",
    brandNames: [
      "Maxipime",
      "Cefepime OGB",
      "Dipsin",
      "Interpime"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "4.0 - 6.0",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI), NS 0.9%, atau D5W",
      volumeToReconstitute: "Larutkan vial 1 g dengan 10 mL WFI/NS, lalu encerkan ke dalam 50-100 mL NS/D5W (Konsentrasi: 10 - 40 mg/mL)",
      resultantConcentration: "10 - 40 mg/mL",
      instructions: "Diberikan secara IV drip selama 30 menit atau extended infusion selama 3-4 jam (optimalisasi PK/PD Time above MIC)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9%, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang (25°C)",
      refrigerated2to8C: "7 Hari pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "40 mg/mL",
      maxCentralConcentration: "40 mg/mL",
      standardInfusionRate: "Infus standar: 30 menit; Extended infusion ICU: 3 - 4 jam",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Waspadai neurotoksisitas (ensefalopati, mioklonus, status epileptikus non-konvulsif) pada pasien dengan gangguan ginjal tanpa penyesuaian dosis.",
        "Inkompatibel Y-Site dengan Vancomycin, Aminophylline, Ciprofloxacin, dan Metronidazole."
      ]
    },
    blackBoxIncompatibilities: [
      "Vancomycin",
      "Aminophylline",
      "Ciprofloxacin",
      "Metronidazole",
      "Diazepam"
    ]
  },
  {
    id: "iv-cefazolin",
    name: "Cefazolin Sodium",
    genericName: "Cefazolin Sodium",
    brandNames: [
      "Ancef",
      "Kefzol",
      "Cefazolin OGB",
      "Zolicef"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "4.5 - 6.0",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI), NS 0.9%, atau D5W",
      volumeToReconstitute: "Larutkan 1 g dengan 10 mL WFI untuk bolus lambat (100 mg/mL), atau encerkan dalam 50-100 mL NS/D5W untuk infus",
      resultantConcentration: "10 - 100 mg/mL",
      instructions: "Standar emas profilaksis bedah: Diberikan IV dalam waktu 30-60 menit SEBELUM insisi kulit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan semua kristaloid standar termasuk Ringer Lactate."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "10 Hari pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "100 mg/mL",
      maxCentralConcentration: "100 mg/mL",
      standardInfusionRate: "Bolus lambat 3-5 menit atau infus intermiten 20-30 menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Pemberian profilaksis bedah wajib diulang (*re-dosing*) intraoperatif tiap 4 jam jika operasi berlangsung lama atau perdarahan >1500 mL.",
        "Inkompatibel dengan Amiodarone, Bleomycin, dan Pentobarbital."
      ]
    },
    blackBoxIncompatibilities: [
      "Amiodarone",
      "Bleomycin",
      "Pentobarbital"
    ]
  },
  {
    id: "iv-amikacin",
    name: "Amikacin Sulfate",
    genericName: "Amikacin Sulfate Injection",
    brandNames: [
      "Amikin IV",
      "Alostil IV",
      "Amikacin OGB",
      "Mikasin"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "3.5 - 5.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 500 mg - 1000 mg (15 mg/kgBB) ke dalam 100 - 200 mL NS atau D5W (Konsentrasi: 2.5 - 5 mg/mL)",
      resultantConcentration: "2.5 - 5 mg/mL",
      instructions: "Infus IV diberikan selama 30 - 60 menit. Jangan diberikan secara bolus cepat untuk mencegah kelumpuhan otot pernapasan (neuromuscular blockade)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9%, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang (25°C)",
      refrigerated2to8C: "60 Hari pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "Diberikan secara IV drip selama 30 - 60 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Wajib Therapeutic Drug Monitoring (TDM) kadar puncak (Peak: 20-30 mcg/mL) dan palung (Trough: <5 mcg/mL) untuk mencegah nefrotoksisitas & ototoksisitas permanen.",
        "Inkompatibel jika dicampur langsung dalam satu botol infus bersama Penisilin/Beta-laktam atau Heparin."
      ]
    },
    blackBoxIncompatibilities: [
      "Heparin",
      "Ampicillin",
      "Piperacillin (pencampuran langsung)",
      "Propofol",
      "Phenytoin"
    ]
  },
  {
    id: "iv-colistin",
    name: "Colistin (Colistimethate Sodium / CMS)",
    genericName: "Colistimethate Sodium",
    brandNames: [
      "Colistimethate OGB",
      "Colomycin",
      "Tadacol",
      "Coly-Mycin M"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "7.0 - 8.0",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI) atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan vial 1.000.000 IU (atau 2.000.000 IU / ~66.6 mg kolistin basa) dengan 2 - 4 mL WFI perlahan tanpa dikocok keras untuk mencegah busa berlebih, lalu encerkan ke dalam 50-100 mL NS",
      resultantConcentration: "10.000 - 50.000 IU/mL",
      instructions: "WAJIB SEGERA DIGUNAKAN SETELAH REKONSTITUSI. Prodrug CMS secara bertahap terhidrolisis menjadi kolistin bebas yang jauh lebih toksik jika disimpan dalam bentuk terlarut."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Normal Saline 0.9% dan WFI adalah pelarut pilihan."
    },
    stability: {
      roomTemp25C: "Gunakan dalam waktu 24 jam setelah rekonstitusi (anjuran segera diberikan)",
      refrigerated2to8C: "24 Jam pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "50.000 IU/mL",
      maxCentralConcentration: "50.000 IU/mL",
      standardInfusionRate: "Loading dose: 9.000.000 IU infus selama 60 menit; Maintenance: 4.500.000 IU tiap 12 jam selama 60 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Nefrotoksisitas akut (ATN) sangat tinggi; monitor serum kreatinin dan ureum harian di ICU.",
        "Hindari penggunaan bersamaan dengan relaksan otot depolarisasi/non-depolarisasi (potensiasi blokade neuromuskular)."
      ]
    },
    blackBoxIncompatibilities: [
      "Erythromycin",
      "Hydrocortisone",
      "Parenteral Nutrition (Lipid)"
    ]
  },
  {
    id: "iv-tigecycline",
    name: "Tigecycline",
    genericName: "Tigecycline",
    brandNames: [
      "Tygacil",
      "Tigecycline OGB",
      "Tigecil",
      "Tygat"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "7.0 - 8.0 (Larutan Warna Kuning-Oranye Khas)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan vial 50 mg dengan 5.3 mL NS/D5W (Konsentrasi: 10 mg/mL), kocok perlahan hingga larut sempurna berwarna kuning-oranye, lalu encerkan ke dalam 100 mL NS/D5W",
      resultantConcentration: "0.5 - 1 mg/mL",
      instructions: "Infus IV diberikan selama 30 - 60 menit. Warna larutan harus kuning hingga jingga; buang jika berwarna hijau tua atau keruh."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9%, D5W, dan Ringer Lactate."
    },
    stability: {
      roomTemp25C: "24 Jam (dalam kantong infus pada 25°C)",
      refrigerated2to8C: "48 Jam pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "1 mg/mL",
      maxCentralConcentration: "1 mg/mL",
      standardInfusionRate: "Loading dose: 100 mg IV selama 30-60 menit; Maintenance: 50 mg tiap 12 jam selama 30-60 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Mual dan muntah berat dilaporkan pada >30% pasien (dapat diberikan profilaksis antiemetik).",
        "Inkompatibel Y-Site dengan Amphotericin B, Diazepam, dan Omeprazole."
      ]
    },
    blackBoxIncompatibilities: [
      "Amphotericin B",
      "Diazepam",
      "Omeprazole",
      "Piperacillin/Tazobactam (konsentrasi tertentu)"
    ]
  },
  {
    id: "iv-linezolid",
    name: "Linezolid IV",
    genericName: "Linezolid",
    brandNames: [
      "Zyvox IV",
      "Linezolid OGB",
      "Linospan IV",
      "Lizolid IV"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "4.4 - 5.2",
    reconstitution: {
      recommendedDiluent: "Premixed siap infus 600 mg/300 mL (2 mg/mL)",
      volumeToReconstitute: "Sediaan siap infus dalam kantong foil pelindung cahaya",
      resultantConcentration: "2 mg/mL",
      instructions: "Infus IV diberikan selama 30 - 120 menit. Jangan membuka kantong pelindung foil luar sampai saat akan diinfuskan ke pasien."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Sediaan premixed siap pakai."
    },
    stability: {
      roomTemp25C: "Stabil hingga tanggal kedaluwarsa dalam kantong foil pembungkus",
      refrigerated2to8C: "SIMPAN PADA SUHU RUANG (15-30°C); jangan disimpan di kulkas/dibekukan",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL",
      maxCentralConcentration: "2 mg/mL",
      standardInfusionRate: "600 mg diberikan secara IV drip selama 30 - 120 menit tiap 12 jam",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Inhibitor MAO reversibel non-selektif: risiko SINDROM SEROTONIN fatal jika digabung bersama SSRI/SNRI/Opioid serotonergik.",
        "Wajib monitor hitung darah lengkap (CBC) mingguan: risiko mielosupresi (trombositopenia/anemia) pada pemakaian >14 hari.",
        "Inkompatibel Y-Site dengan Ceftriaxone, Diazepam, Phenytoin, dan Amphotericin B."
      ]
    },
    blackBoxIncompatibilities: [
      "Ceftriaxone",
      "Diazepam",
      "Phenytoin Sodium",
      "Amphotericin B"
    ]
  },
  {
    id: "iv-milrinone",
    name: "Milrinone Lactate",
    genericName: "Milrinone Lactate",
    brandNames: [
      "Primacor IV",
      "Inovad",
      "Milrinone OGB"
    ],
    category: "Vasoaktif / Inotropik",
    phRange: "3.2 - 4.0 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%), 0.45% Saline, atau D5W",
      volumeToReconstitute: "Larutkan 10 mg (10 mL) ke dalam 40 mL NS/D5W (Konsentrasi: 200 mcg/mL) via syringe pump",
      resultantConcentration: "200 mcg/mL",
      instructions: "Diberikan via syringe pump kontinu untuk terapi jangka pendek gagal jantung dekompensasi akut (ADHF)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W."
    },
    stability: {
      roomTemp25C: "72 Jam dalam kantong atau spuit plastik",
      refrigerated2to8C: "72 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "200 mcg/mL",
      maxCentralConcentration: "200 mcg/mL",
      standardInfusionRate: "Loading dose (opsional): 50 mcg/kg selama 10 menit; Maintenance: 0.375 - 0.75 mcg/kgBB/menit",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "Wajib monitor EKG kontinyu dan tekanan darah (risiko aritmia ventrikel dan hipotensi sekunder akibat vasodilatasi sistemik).",
        "INKOMPATIBEL FATAL DENGAN FUROSEMIDE (segera terbentuk presipitat kristal seketika pada Y-Site)."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide (Presipitasi Instan)",
      "Sodium Bicarbonate",
      "Procainamide"
    ]
  },
  {
    id: "iv-isdn",
    name: "Isosorbide Dinitrate (ISDN) IV",
    genericName: "Isosorbide Dinitrate",
    brandNames: [
      "Cedocard IV",
      "Fasorbid IV",
      "Isoket IV",
      "ISDN OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "5.0 - 7.0",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 10 mg (10 mL sediaan 1 mg/mL) atau 50 mg ke dalam 50 mL NS/D5W (Konsentrasi: 0.2 - 1 mg/mL) via syringe pump",
      resultantConcentration: "0.1 - 1 mg/mL",
      instructions: "Wajib menggunakan spuit dan set infus berbahan Non-PVC (Polietilen/Kaca) untuk mencegah kehilangan zat aktif akibat adsorpsi ke plastik PVC."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS 0.9% dan D5W. Gunakan set infus non-PVC."
    },
    stability: {
      roomTemp25C: "24 Jam dalam wadah non-PVC",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "1 mg/mL",
      maxCentralConcentration: "1 mg/mL",
      standardInfusionRate: "2 - 10 mg/jam (dapat dititrasi hingga 20 mg/jam sesuai respons tekanan darah & edema paru)",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "KONTRAINDIKASI MUTLAK BERSAMA INHIBITOR PDE-5 (Sildenafil, Tadalafil) dalam 24-48 jam terakhir karena risiko kolaps kardiovaskular fatal.",
        "Wajib monitor tekanan darah secara ketat; hentikan/turunkan laju jika TDS <90 mmHg."
      ]
    },
    blackBoxIncompatibilities: [
      "Inhibitor PDE-5 (Sildenafil/Tadalafil)",
      "Sodium Bicarbonate",
      "Furosemide"
    ]
  },
  {
    id: "iv-lidocaine",
    name: "Lidocaine Hydrochloride (Lidokain 2%)",
    genericName: "Lidocaine HCl 2% (20 mg/mL)",
    brandNames: [
      "Lidocain 2% OGB",
      "Xylocaine IV",
      "Extracaine"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "5.0 - 7.0",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Untuk infus anti-aritmia: Larutkan 1 g (50 mL sediaan 2%) ke dalam 500 mL D5W (Konsentrasi: 2 mg/mL) atau 1 g dalam 50 mL via syringe pump (20 mg/mL)",
      resultantConcentration: "2 - 20 mg/mL",
      instructions: "Bolus awal 1 - 1.5 mg/kgBB IV lambat selama 2-3 menit pada VT/VF tanpa nadi."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan D5W, NS, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam pada suhu ruang",
      refrigerated2to8C: "48 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "4 mg/mL (infus) / 20 mg/mL (bolus)",
      maxCentralConcentration: "20 mg/mL",
      standardInfusionRate: "Bolus awal 1 - 1.5 mg/kg; dilanjutkan infus maintenance 1 - 4 mg/menit (30 - 120 mL/jam sediaan 2 mg/mL)",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Waspada tanda toksisitas SSP (baal perioral, tinitus, disorientasi, kejang, hingga henti jantung).",
        "Inkompatibel dengan Phenytoin, Thiopental, Ampicillin, dan Sodium Bicarbonate."
      ]
    },
    blackBoxIncompatibilities: [
      "Phenytoin Sodium",
      "Thiopental Sodium",
      "Sodium Bicarbonate",
      "Ampicillin"
    ]
  },
  {
    id: "iv-atropine",
    name: "Atropine Sulfate",
    genericName: "Atropine Sulfate Injection",
    brandNames: [
      "Atropin Sulfat OGB",
      "Atropine Ethica"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "3.0 - 6.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Dapat diberikan bolus IV langsung tanpa pengenceran (0.25 mg/mL atau 1 mg/mL)",
      volumeToReconstitute: "Sediaan ampul 0.25 mg/mL atau 1 mg/mL",
      resultantConcentration: "0.25 - 1 mg/mL",
      instructions: "Diberikan secara IV bolus cepat. Dosis <0.5 mg pada dewasa dapat memicu efek paradoksal bradikardia sentral."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam setelah dibuka",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "1 mg/mL",
      maxCentralConcentration: "1 mg/mL",
      standardInfusionRate: "Bradikardia simtomatik: Bolus IV cepat 0.5 - 1 mg tiap 3-5 menit (maksimal total 3 mg); Antidotum pestisida organofosfat: 2 - 5 mg IV tiap 10-15 menit hingga atropinisasi tercapai",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "Jangan berikan dosis bolus <0.5 mg pada orang dewasa (risiko perburukan bradikardia paradoksal).",
        "Inkompatibel dengan larutan alkali (Sodium Bicarbonate, Furosemide, Thiopental)."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate",
      "Furosemide",
      "Thiopental",
      "Diazepam"
    ]
  },
  {
    id: "iv-digoxin",
    name: "Digoxin Injection",
    genericName: "Digoxin Injection (0.25 mg/mL)",
    brandNames: [
      "Fargoxin IV",
      "Lanoxin IV",
      "Digoxin OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "6.8 - 7.2",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%), D5W, atau WFI (dengan pengenceran minimal 1:4)",
      volumeToReconstitute: "1 Ampul (0.5 mg / 2 mL) diencerkan dengan minimal 8 mL NS/D5W menjadi 10 mL (0.05 mg/mL)",
      resultantConcentration: "0.05 - 0.25 mg/mL",
      instructions: "Wajib diencerkan minimal 4x lipat untuk mencegah presipitasi dan iritasi vena. Suntikkan secara IV bolus sangat lambat selama minimal 5 menit."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Pengenceran dengan NS atau D5W minimal 4x volume ampul."
    },
    stability: {
      roomTemp25C: "Gunakan segera setelah diencerkan (maksimal 6 jam)",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "0.05 - 0.1 mg/mL",
      maxCentralConcentration: "0.25 mg/mL",
      standardInfusionRate: "Loading dose digitalisasi: 0.25 - 0.5 mg IV sangat lambat selama minimal 5 - 10 menit",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "KONTRAINDIKASI PEMBERIAN BERSAMA KALSIUM IV (Kalsium Glukonat/Klorida) karena memicu aritmia fatal seketika.",
        "Waspadai intoksikasi digitalis jika kadar Kalium darah rendah (hipokalemia memperparah toksisitas digoksin)."
      ]
    },
    blackBoxIncompatibilities: [
      "Calcium Gluconate (FATAL)",
      "Calcium Chloride",
      "Dobutamine (konsentrasi tinggi)",
      "Furosemide"
    ]
  },
  {
    id: "iv-atracurium",
    name: "Atracurium Besylate",
    genericName: "Atracurium Besylate Injection",
    brandNames: [
      "Tracrium IV",
      "Notrixum",
      "Atracurium OGB",
      "Tramus"
    ],
    category: "Sedasi & Anestesi",
    phRange: "3.2 - 3.7 (Asam Kuat)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan 50 mg (5 mL sediaan 10 mg/mL) ke dalam 45 mL NS/D5W (Konsentrasi: 1 mg/mL) via syringe pump",
      resultantConcentration: "0.5 - 2 mg/mL (infus) atau 10 mg/mL (bolus murni)",
      instructions: "Wajib disimpan di kulkas (2-8°C). Inaktivasi terjadi spontan melalui degradasi Hofmann pada suhu hangat dan suasana basa."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: true,
      notes: "Normal Saline 0.9% dan D5W adalah pelarut pilihan."
    },
    stability: {
      roomTemp25C: "24 Jam dalam NS 0.9% pada suhu ruang (25°C)",
      refrigerated2to8C: "Vial utuh wajib pada 2-8°C hingga tanggal kedaluwarsa",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "2 mg/mL (infus) / 10 mg/mL (bolus intubasi)",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "Intubasi: 0.4 - 0.5 mg/kg bolus IV; Maintenance ICU: 0.3 - 0.6 mg/kgBB/jam via syringe pump",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "KONTRAINDIKASI DIBERIKAN SEJALUR DENGAN LARUTAN BASA (Thiopental, Furosemide, Sodium Bicarbonate): Langsung rusak dan memicu presipitasi asam bebas.",
        "Wajib pasien dalam kondisi terintubasi dan tersedasi penuh (tidak memiliki efek analgesia/sedasi)."
      ]
    },
    blackBoxIncompatibilities: [
      "Thiopental Sodium",
      "Sodium Bicarbonate",
      "Furosemide",
      "Diazepam",
      "Propofol (jalur tertentu)"
    ]
  },
  {
    id: "iv-rocuronium",
    name: "Rocuronium Bromide",
    genericName: "Rocuronium Bromide Injection",
    brandNames: [
      "Esmeron IV",
      "Roculax",
      "Rocuronium OGB"
    ],
    category: "Sedasi & Anestesi",
    phRange: "3.8 - 4.2 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Diberikan bolus murni 10 mg/mL atau diencerkan ke dalam NS/D5W menjadi 1 - 5 mg/mL untuk infus kontinu ICU",
      resultantConcentration: "1 - 10 mg/mL",
      instructions: "Standar emas Rapid Sequence Intubation (RSI). Simpan pada suhu 2-8°C (stabil pada suhu ruang hingga 12 minggu sebelum dibuka)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam setelah diencerkan dalam NS/D5W",
      refrigerated2to8C: "2-8°C hingga tanggal kedaluwarsa",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL (infus) / 10 mg/mL (bolus RSI)",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "RSI Intubasi: 0.6 - 1.2 mg/kg bolus IV cepat; Infus ICU: 0.3 - 0.6 mg/kgBB/jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Reversal spesifik cepat tersedia: Sugammadex (Bridion) berikatan 1:1 dengan rocuronium.",
        "Inkompatibel dengan larutan alkali (Furosemide, Thiopental, Bicarbonate)."
      ]
    },
    blackBoxIncompatibilities: [
      "Furosemide",
      "Thiopental Sodium",
      "Sodium Bicarbonate",
      "Dexamethasone"
    ]
  },
  {
    id: "iv-phenytoin",
    name: "Phenytoin Sodium (Fenitoin)",
    genericName: "Phenytoin Sodium Injection",
    brandNames: [
      "Dilantin IV",
      "Curelep IV",
      "Phenytoin OGB",
      "Decatona"
    ],
    category: "Sedasi & Anestesi",
    phRange: "12.0 (SANGAT BASA / ALKALI EKSTREM)",
    reconstitution: {
      recommendedDiluent: "HANYA BOLEH NORMAL SALINE (NS 0.9%) - KONTRAINDIKASI MUTLAK D5W / DEKSTROSA!",
      volumeToReconstitute: "Larutkan 250 - 1000 mg (sediaan 50 mg/mL) HANYA ke dalam 50 - 100 mL NS 0.9% (Konsentrasi akhir tidak boleh melebihi 10 mg/mL)",
      resultantConcentration: "1 - 10 mg/mL (dalam NS 0.9%)",
      instructions: "KONTRAINDIKASI MUTLAK DENGAN D5W: Dekstrosa memiliki pH asam yang seketika memicu kristalisasi mikro masif fenitoin bebas tak larut yang mematikan. Wajib gunakan inline filter 0.22 mikron. Kecepatan infus maksimal 50 mg/menit."
    },
    diluents: {
      ns: true,
      d5w: false,
      rl: false,
      wfi: false,
      d5ns: false,
      notes: "HANYA Normal Saline 0.9% yang diizinkan. Dextrose / Glukosa menyebabkan presipitasi kristal instan."
    },
    stability: {
      roomTemp25C: "Maksimal 1 - 4 Jam dalam NS 0.9% (segera infuskannya setelah pencampuran)",
      refrigerated2to8C: "KONTRAINDIKASI REFRIGERASI (Memicu kristalisasi)",
      lightProtectionRequired: false,
      filterRequired: true,
      filterType: "Filter inline 0.22 - 1.2 mikron wajib digunakan untuk menangkap mikrokristal"
    },
    administration: {
      maxPeripheralConcentration: "10 mg/mL (dalam NS 0.9%)",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "Status epileptikus loading: 15 - 20 mg/kgBB dengan kecepatan MAKSIMAL 50 mg/menit (25 mg/menit pada lansia/kardiak)",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "PURPLE GLOVE SYNDROME: Ekstravasasi fenitoin (pH 12) memicu iskemia jaringan berat, edema, sianosis, hingga amputasi ekstremitas.",
        "Infus terlalu cepat (>50 mg/menit) memicu kolaps kardiovaskular, hipotensi berat, dan blok AV total.",
        "Wajib membilas selang infus dengan minimal 20 mL NS sebelum & sesudah pemberian. INKOMPATIBEL DENGAN HAMPIR SEMUA OBAT LAIN."
      ]
    },
    blackBoxIncompatibilities: [
      "Dextrose 5% (Kristalisasi Fatal)",
      "Semua larutan selain NS 0.9%",
      "Morphine",
      "Fentanyl",
      "Midazolam",
      "Norepinephrine",
      "Dobutamine",
      "Propofol"
    ]
  },
  {
    id: "iv-potassium-phosphate",
    name: "Potassium Phosphate (K-Phos / Kalium Fosfat)",
    genericName: "Potassium Phosphate Injection (3 mmol Phosphate & 4.4 mEq K+ per mL)",
    brandNames: [
      "K-Phos IV",
      "Potassium Phosphate Fresenius"
    ],
    category: "Elektrolit & Koreksi",
    phRange: "6.5 - 7.5",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Larutkan dosis terhitung (misal 15 - 30 mmol fosfat) ke dalam 250 - 500 mL NS atau D5W",
      resultantConcentration: "0.06 - 0.12 mmol fosfat/mL",
      instructions: "Wajib diencerkan dengan volume besar. Kecepatan infus fosfat tidak boleh melebihi 10 - 15 mmol/jam (dan Kalium tidak boleh melebihi 20 mEq/jam)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam setelah diencerkan",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "15 mmol fosfat (22 mEq K+) / 250 mL",
      maxCentralConcentration: "30 mmol fosfat (44 mEq K+) / 250 mL",
      standardInfusionRate: "Infus IV lambat selama minimal 4 - 6 jam",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "KONTRAINDIKASI FATAL BERSAMA KALSIUM (Kalsium Glukonat / Kalsium Klorida): Segera membentuk endapan kristal kalsium fosfat tak larut yang memicu emboli paru.",
        "Wajib hitung ganda kandungan ion Kalium (1 mL mengandung 4.4 mEq K+ dan 3 mmol fosfat)."
      ]
    },
    blackBoxIncompatibilities: [
      "Calcium Gluconate (FATAL)",
      "Calcium Chloride (FATAL)",
      "Magnesium Sulfate",
      "Dextrose pekat tanpa pengencer"
    ]
  },
  {
    id: "iv-mannitol",
    name: "Mannitol 20% (Infus 250 mL / 500 mL)",
    genericName: "Mannitol 20% Injection (200 mg/mL - 1100 mOsm/L)",
    brandNames: [
      "Mannitol 20% Otsuka",
      "Mannitol Ecosol",
      "Infusan M20",
      "Mannitol Sanbe"
    ],
    category: "Elektrolit & Koreksi",
    phRange: "4.5 - 7.0 (Larutan Hiperosmolar 1100 mOsm/L)",
    reconstitution: {
      recommendedDiluent: "Sediaan siap infus tanpa pengenceran tambahan",
      volumeToReconstitute: "Botol infus 250 mL atau 500 mL (20% w/v)",
      resultantConcentration: "200 mg/mL (20%)",
      instructions: "KRISTALISASI: Pada suhu <20°C dapat terjadi presipitasi kristal mannitol. Hangatkan botol infus dalam water bath hangat hingga kristal larut sempurna dan dinginkan ke suhu tubuh sebelum diberikan. Wajib gunakan inline filter 5 mikron."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: true,
      notes: "Sediaan siap infus steril."
    },
    stability: {
      roomTemp25C: "Stabil pada suhu 20-25°C hingga tanggal kedaluwarsa",
      refrigerated2to8C: "HINDARI KULKAS (Memicu kristalisasi masif)",
      lightProtectionRequired: false,
      filterRequired: true,
      filterType: "Inline filter 5 mikron wajib terpasang pada set infus"
    },
    administration: {
      maxPeripheralConcentration: "20% (wajib kanula vena besar)",
      maxCentralConcentration: "20%",
      standardInfusionRate: "Edema serebral / Peningkatan TIK: 0.25 - 1.0 g/kg (1.25 - 5 mL/kg mannitol 20%) diinfuskan selama 20 - 30 menit",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "KONTRAINDIKASI SEJALUR DENGAN PRODUK DARAH (Packed Red Cells / Whole Blood): Memicu pseudoaglutinasi dan hemolisis sel darah merah.",
        "Pantau osmolalitas serum (hentikan jika osmolalitas serum >320 mOsm/kg atau osmolal gap >20) untuk mencegah nekrosis ginjal osmotik."
      ]
    },
    blackBoxIncompatibilities: [
      "Produk Darah Lengkap / PRC (Pseudoaglutinasi)",
      "Ceftriaxone",
      "Filgrastim",
      "Furosemide pekat"
    ]
  },
  {
    id: "iv-oxytocin",
    name: "Oxytocin (Oksitosin 10 IU/mL)",
    genericName: "Oxytocin Synthetic Injection",
    brandNames: [
      "Pitocin",
      "Syntocinon",
      "Induxin",
      "Oxytocin OGB",
      "Santocyn"
    ],
    category: "Lainnya",
    phRange: "3.0 - 5.0 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau Ringer Lactate (RL)",
      volumeToReconstitute: "Induksi persalinan: 10 IU (1 mL) diencerkan ke dalam 1000 mL NS/RL (Konsentrasi: 10 mU/mL). PPH: 20 - 40 IU dalam 1000 mL RL/NS",
      resultantConcentration: "10 - 40 mU/mL (infus titrasi)",
      instructions: "KONTRAINDIKASI PEMBERIAN IV BOLUS CEPAT TIDAK TERENCER: Memicu hipotensi refrakter berat, takikardia kompensatori, iskemia miokard, dan henti jantung."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "RL dan NS adalah pelarut pilihan untuk induksi dan manajemen PPH."
    },
    stability: {
      roomTemp25C: "24 Jam setelah diencerkan dalam NS/RL",
      refrigerated2to8C: "2 - 8°C hingga tanggal kedaluwarsa (stabil 3 bulan pada suhu kamar <25°C)",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "40 mU/mL (infus kontinu)",
      maxCentralConcentration: "40 mU/mL",
      standardInfusionRate: "Induksi: Mulai 1 - 2 mU/menit (6 - 12 mL/jam), titrasi naik tiap 30 menit hingga kontraksi adekuat (maks 20 mU/menit)",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Wajib pemantauan denyut jantung janin (KTG / Cardiotocography) dan tonus kontraksi uterus kontinu.",
        "Inkompatibel dengan larutan alkali (Sodium Bicarbonate)."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate",
      "Fibrinolysin",
      "Norepinephrine (konsentrasi tertentu)"
    ]
  },
  {
    id: "iv-adenosine",
    name: "Adenosine (Adenosin 6 mg/2 mL)",
    genericName: "Adenosine Injection (3 mg/mL)",
    brandNames: [
      "Adenocor",
      "Adenoscan",
      "Adenosine OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "4.5 - 7.5",
    reconstitution: {
      recommendedDiluent: "Sediaan siap suntik murni tanpa pengenceran (Undiluted)",
      volumeToReconstitute: "Vial/Ampul 6 mg/2 mL",
      resultantConcentration: "3 mg/mL",
      instructions: "TEKNIK ULTRA-RAPID PUSH (1 - 2 DETIK): Wajib disuntikkan secara bolus IV sangat cepat dalam 1-2 detik pada port vena paling proksimal (vena antekubiti), SEGERA DIIKUTI flush kilat 20 mL Normal Saline 0.9% dan elevasi lengan pasien."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Diberikan murni tanpa pengenceran, diikuti flush NS."
    },
    stability: {
      roomTemp25C: "Simpan pada suhu ruang 15 - 30°C. HINDARI KULKAS (dapat mengkristal)",
      refrigerated2to8C: "KONTRAINDIKASI REFRIGERASI",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "3 mg/mL (undiluted)",
      maxCentralConcentration: "3 mg/mL",
      standardInfusionRate: "Dosis 1: 6 mg bolus cepat 1-2s + 20 mL NS flush; Jika belum konversi dalam 1-2 menit, Dosis 2: 12 mg bolus cepat 1-2s + 20 mL NS flush",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "Wajib rekam EKG strip kontinu saat penyuntikan: Terjadi asistol transien normal selama 2 - 6 detik sebelum sinus rhythm pulih.",
        "Edukasi sensasi rasa tercekik/panas dada sesaat (flushing/dyspnea) yang berlangsung <1 menit."
      ]
    },
    blackBoxIncompatibilities: [
      "Dipyridamole (Potensiasi asistol 4x lipat - turunkan dosis adenosin 75%)",
      "Theophylline / Aminophylline (Antagonisme kompetitif - butuh dosis adenosin lebih tinggi)"
    ]
  },
  {
    id: "iv-hydrocortisone",
    name: "Hydrocortisone (Solu-Cortef 100 mg)",
    genericName: "Hydrocortisone Sodium Succinate for Injection",
    brandNames: [
      "Solu-Cortef",
      "Fartison IV",
      "Hydrocortisone OGB"
    ],
    category: "Analgesik & Antiinflamasi",
    phRange: "7.0 - 8.0",
    reconstitution: {
      recommendedDiluent: "Pelarut khusus bawaan vial atau Water for Injection / NS 0.9%",
      volumeToReconstitute: "Larutkan vial 100 mg dengan 2 mL WFI (Konsentrasi: 50 mg/mL). Untuk infus, campurkan ke dalam 100 - 500 mL NS atau D5W",
      resultantConcentration: "0.1 - 1 mg/mL (infus) atau 50 mg/mL (bolus lambat)",
      instructions: "Suntikkan IV bolus lambat selama minimal 3 - 5 menit, atau berikan secara infus kontinu."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, RL, dan WFI."
    },
    stability: {
      roomTemp25C: "24 Jam setelah rekonstitusi pada suhu ruang 25°C",
      refrigerated2to8C: "72 Jam pada 2-8°C",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "50 mg/mL (bolus) / 1 mg/mL (infus)",
      maxCentralConcentration: "50 mg/mL",
      standardInfusionRate: "Krisis Adrenal: 100 mg bolus IV segera, lanjut 100-200 mg/24 jam; Syok Septik Refrakter: 200 mg/hari (50 mg tiap 6 jam atau infus kontinu)",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Inkompatibel fisikokimia dengan Midazolam, Ciprofloxacin, dan Diazepam.",
        "Pantau kadar glukosa darah dan elektrolit (retensi natrium & hipokalemia)."
      ]
    },
    blackBoxIncompatibilities: [
      "Midazolam",
      "Ciprofloxacin",
      "Diazepam",
      "Phenytoin Sodium",
      "Amiodarone"
    ]
  },
  {
    id: "iv-amphotericin-b",
    name: "Amphotericin B Deoxycholate (Fungizone 50 mg)",
    genericName: "Amphotericin B for Injection",
    brandNames: [
      "Fungizone IV",
      "Amphotret",
      "Amphotericin B OGB",
      "AmBisome (Liposomal Form)"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "5.0 - 7.0",
    reconstitution: {
      recommendedDiluent: "HANYA DEXTROSE 5% (D5W) MURNI - KONTRAINDIKASI MUTLAK SEMUA LARUTAN SALINE / ELEKTROLIT!",
      volumeToReconstitute: "Tahap 1: Larutkan vial 50 mg dengan 10 mL Steril Water for Injection (WFI) murni tanpa bakteriostatik (Konsentrasi: 5 mg/mL), kocok hingga koloid jernih. Tahap 2: Encerkan ke dalam 500 mL D5W (Konsentrasi: 0.1 mg/mL)",
      resultantConcentration: "0.1 mg/mL (maks 0.25 mg/mL via vena sentral)",
      instructions: "KONTRAINDIKASI MUTLAK DENGAN NaCl / SALINE: Ion natrium dan klorida memicu presipitasi agregat koloid masif yang menyumbat kapiler paru dan ginjal. Selang infus wajib dibilas dengan D5W sebelum & sesudah pemberian."
    },
    diluents: {
      ns: false,
      d5w: true,
      rl: false,
      wfi: true,
      d5ns: false,
      notes: "HANYA D5W murni dengan pH > 4.2 yang diizinkan untuk infus."
    },
    stability: {
      roomTemp25C: "24 Jam dalam D5W terlindung cahaya",
      refrigerated2to8C: "Vial utuh simpan pada 2 - 8°C terlindung cahaya",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "0.1 mg/mL",
      maxCentralConcentration: "0.25 mg/mL",
      standardInfusionRate: "Infus IV lambat selama minimal 4 - 6 jam (Premedikasi: Parasetamol + Difenhidramin + Hidrokortison 30 menit sebelum infus untuk mencegah reaksi demam menggigil 'Shake and Bake')",
      infusionRoute: "IV Drip / Infus Kontinu",
      specialPrecautions: [
        "Hidrasi pra dan pasca-infus dengan 500-1000 mL Normal Saline (via jalur terpisah) untuk mereduksi nefrotoksisitas akut.",
        "Pantau ketat Serum Kreatinin, Kalium (hipokalemia berat), dan Magnesium serial."
      ]
    },
    blackBoxIncompatibilities: [
      "Normal Saline 0.9% (Presipitasi Masif Fatal)",
      "Ringer Lactate",
      "Semua larutan mengandung elektrolit / NaCl",
      "Heparin Sodium",
      "Furosemide",
      "Ranitidine",
      "Midazolam",
      "Potassium Chloride"
    ]
  },
  {
    id: "iv-labetalol",
    name: "Labetalol Hydrochloride IV (5 mg/mL)",
    genericName: "Labetalol HCl Injection",
    brandNames: [
      "Trandate IV",
      "Normodyne",
      "Labetalol OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "3.5 - 4.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "D5W atau Normal Saline (NS 0.9%)",
      volumeToReconstitute: "Suntikkan bolus langsung 20 mg (4 mL) atau encerkan 200 mg (40 mL) ke dalam 160 mL D5W/NS menjadi 200 mL (Konsentrasi: 1 mg/mL)",
      resultantConcentration: "1 - 5 mg/mL",
      instructions: "Pilihan utama krisis hipertensi pada kehamilan (preeklampsia/eklampsia) dan diseksi aorta."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam dalam NS/D5W",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "5 mg/mL (bolus) / 2 mg/mL (infus)",
      maxCentralConcentration: "5 mg/mL",
      standardInfusionRate: "Bolus: 20 mg IV lambat 2 menit, dapat diulang 40-80 mg tiap 10 menit (maks 300 mg); Infus kontinu: 1 - 2 mg/menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Inkompatibel dengan Sodium Bicarbonate dan Furosemide (suasana basa memicu presipitasi labetalol).",
        "Pasien harus dalam posisi berbaring selama dan 3 jam pasca pemberian untuk mencegah hipotensi ortostatik berat."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate",
      "Furosemide",
      "Thiopental Sodium",
      "Ceftriaxone"
    ]
  },
  {
    id: "iv-esmolol",
    name: "Esmolol Hydrochloride (Brevibloc 10 mg/mL)",
    genericName: "Esmolol HCl Injection",
    brandNames: [
      "Brevibloc IV",
      "Esmolol OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "4.5 - 5.5",
    reconstitution: {
      recommendedDiluent: "Sediaan siap pakai 10 mg/mL atau encerkan ampul pekat (2500 mg/10 mL) ke dalam 250 mL D5W/NS",
      volumeToReconstitute: "Konsentrasi akhir 10 mg/mL",
      resultantConcentration: "10 mg/mL",
      instructions: "Beta-1 blocker kardioselektif ultra-short acting (waktu paruh eliminasi 9 menit). Pemulihan cepat dalam 15-20 menit pasca penghentian."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam setelah pengenceran",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "10 mg/mL (konsentrasi >10 mg/mL memicu tromboflebitis vena)",
      maxCentralConcentration: "20 mg/mL",
      standardInfusionRate: "Loading dose: 500 mcg/kgBB selama 1 menit, lanjut maintenance 50 mcg/kgBB/menit; titrasi naik tiap 5 menit hingga maks 200 - 300 mcg/kgBB/menit",
      infusionRoute: "IV Syringe Pump",
      specialPrecautions: [
        "KONTRAINDIKASI DIBERIKAN SEJALUR DENGAN SODIUM BICARBONATE: Esmolol terdegradasi cepat pada suasana basa.",
        "Pantau tekanan darah dan denyut jantung tiap 5 menit selama titrasi."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate",
      "Diazepam",
      "Furosemide",
      "Thiopental Sodium"
    ]
  },
  {
    id: "iv-co-amoxiclav",
    name: "Co-Amoxiclav IV (Amoxicillin / Clavulanate 1.2 g)",
    genericName: "Amoxicillin Sodium 1000 mg + Potassium Clavulanate 200 mg for Injection",
    brandNames: [
      "Augmentin IV",
      "Clavamox IV",
      "Amoxiclav OGB",
      "Betamox IV"
    ],
    category: "Antibiotik / Antijamur",
    phRange: "8.0 - 9.0 (Basa)",
    reconstitution: {
      recommendedDiluent: "Water for Injection (WFI) atau Normal Saline (NS 0.9%) - HINDARI D5W / DEKSTROSA!",
      volumeToReconstitute: "Larutkan vial 1.2 g dengan 20 mL WFI (Konsentrasi: 60 mg/mL) untuk bolus IV lambat 3-4 menit, atau tambahkan ke dalam 100 mL NS 0.9% untuk infus drip 30-40 menit",
      resultantConcentration: "12 - 60 mg/mL",
      instructions: "STABILITAS SANGAT PENDEK: Asam klavulanat terdegradasi sangat cepat. Larutan dalam WFI harus disuntikkan dalam 20 MENIT; larutan dalam NS 0.9% harus dihabiskan dalam 60 MENIT. HINDARI pelarut D5W/Dekstrosa karena mempercepat degradasi hidrolisis obat."
    },
    diluents: {
      ns: true,
      d5w: false,
      rl: false,
      wfi: true,
      d5ns: false,
      notes: "HANYA WFI (habiskan dalam 20 menit) atau NS 0.9% (habiskan dalam 60 menit)."
    },
    stability: {
      roomTemp25C: "20 Menit (dalam WFI) / 60 Menit (dalam NS 0.9%)",
      refrigerated2to8C: "Maksimal 4 Jam dalam NS pada 2-8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "60 mg/mL (bolus lambat) / 12 mg/mL (infus)",
      maxCentralConcentration: "60 mg/mL",
      standardInfusionRate: "1.2 g IV bolus lambat 3-4 menit atau infus 30-40 menit tiap 8 jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Inkompatibel dengan sediaan darah, cairan lipid nutrisi parenteral, dan aminoglikosida.",
        "Waspadai reaksi kolestatik / ikterus terinduksi asam klavulanat."
      ]
    },
    blackBoxIncompatibilities: [
      "Dextrose 5% (Degradasi Hidrolisis Cepat)",
      "Gentamicin / Amikacin",
      "Ciprofloxacin",
      "Midazolam"
    ]
  },
  {
    id: "iv-naloxone",
    name: "Naloxone Hydrochloride (Narcan 0.4 mg/mL)",
    genericName: "Naloxone HCl Injection",
    brandNames: [
      "Narcan IV",
      "Noxon",
      "Naloxone OGB"
    ],
    category: "Lainnya",
    phRange: "3.0 - 4.5 (Asam)",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Diberikan bolus murni 0.4 mg/mL (1 mL) atau encerkan 2 mg (5 ampul) ke dalam 500 mL D5W/NS (Konsentrasi: 4 mcg/mL) untuk infus kontinu",
      resultantConcentration: "4 - 400 mcg/mL",
      instructions: "Antidotum spesifik intoksikasi opioid. Waktu paruh naloxone (30-90 menit) LEBIH PENDEK dibanding sebagian besar opioid (morfin/metadon), sehingga berisiko terjadi depresi pernapasan rekuren (renarkotisasi)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam setelah diencerkan dalam NS/D5W",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "0.4 mg/mL",
      maxCentralConcentration: "0.4 mg/mL",
      standardInfusionRate: "Overdosis opioid darurat: 0.04 - 0.4 mg IV bolus tiap 2-3 menit hingga respirasi adekuat (maks 10 mg); Infus kontinu: 2/3 dosis inisial efektif per jam",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Pemberian terlalu cepat dosis tinggi dapat memicu sindrom putus obat akut (withdrawal), edema paru akut, dan takikardia ventrikel.",
        "Inkompatibel dengan larutan alkali."
      ]
    },
    blackBoxIncompatibilities: [
      "Sodium Bicarbonate",
      "Thiopental Sodium",
      "Alkaline Solutions"
    ]
  },
  {
    id: "iv-flumazenil",
    name: "Flumazenil (Anexate 0.5 mg/5 mL)",
    genericName: "Flumazenil Injection (0.1 mg/mL)",
    brandNames: [
      "Anexate",
      "Flumazenil OGB"
    ],
    category: "Sedasi & Anestesi",
    phRange: "3.5 - 4.5",
    reconstitution: {
      recommendedDiluent: "D5W, Normal Saline (NS 0.9%), atau Ringer Lactate",
      volumeToReconstitute: "Suntikkan bolus langsung 0.2 mg (2 mL) atau encerkan dalam syringe pump",
      resultantConcentration: "0.1 mg/mL",
      instructions: "Antagonis kompetitif reseptor GABAA untuk reversal overdosis benzodiazepin. Waktu paruh singkat (40-80 menit); waspadai resedasi berulang."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "24 Jam setelah dibuka/diencerkan",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "0.1 mg/mL",
      maxCentralConcentration: "0.1 mg/mL",
      standardInfusionRate: "Awal: 0.2 mg IV lambat selama 15-30 detik; jika belum sadar dalam 60 detik, berikan 0.3 mg, lalu 0.5 mg tiap 60 detik (maks total 3 mg)",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "KONTRAINDIKASI PADA INTRAVENA OVERDOSIS ANTIDEPRESAN TRISIKLIK (TCA): Reversal benzodiazepin dapat mencetuskan kejang status epileptikus dan aritmia fatal tak terkendali.",
        "Gunakan dengan hati-hati pada pasien epilepsi kronis pengguna benzodiazepin rutin."
      ]
    },
    blackBoxIncompatibilities: [
      "Alkaline Solutions",
      "Sodium Bicarbonate"
    ]
  },
  {
    id: "iv-thiopental",
    name: "Thiopental Sodium (Pentothal 500 mg / 1 g)",
    genericName: "Thiopental Sodium for Injection",
    brandNames: [
      "Pentothal IV",
      "Tiopol",
      "Thiopental OGB"
    ],
    category: "Sedasi & Anestesi",
    phRange: "10.5 - 11.5 (SANGAT BASA / ALKALI KUAT)",
    reconstitution: {
      recommendedDiluent: "HANYA Water for Injection (WFI) atau Normal Saline (NS 0.9%) - HINDARI D5W!",
      volumeToReconstitute: "Larutkan vial 500 mg dengan 20 mL WFI/NS (Konsentrasi: 25 mg/mL atau 2.5%)",
      resultantConcentration: "25 mg/mL (2.5%)",
      instructions: "Larutan 2.5% bersifat sangat basa (pH 10.5). Injeksi intra-arterial tak sengaja menyebabkan vasospasme masif, trombosis, dan gangren ekstremitas. HINDARI larutan asam."
    },
    diluents: {
      ns: true,
      d5w: false,
      rl: false,
      wfi: true,
      d5ns: false,
      notes: "HANYA WFI atau NS 0.9% yang menghasilkan larutan jernih stabil."
    },
    stability: {
      roomTemp25C: "24 Jam setelah rekonstitusi pada suhu ruang 25°C",
      refrigerated2to8C: "7 Hari pada 2-8°C (larutan harus tetap jernih tanpa endapan)",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "25 mg/mL (2.5%) - Jangan gunakan konsentrasi >2.5%",
      maxCentralConcentration: "25 mg/mL",
      standardInfusionRate: "Induksi anestesi: 3 - 5 mg/kg IV bolus lambat; Status epileptikus / Koma TIK: 1 - 5 mg/kg/jam via syringe pump",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "INKOMPATIBEL MASIF DENGAN SEMUA OBAT ASAM: Pelumpuh otot (Atracurium, Rocuronium, Vecuronium), Opioid (Morphine, Fentanyl), dan Sedatif (Midazolam) langsung membentuk endapan kristal asam bebas putih pekat yang menyumbat kateter!",
        "Wajib bilas kateter dengan minimal 20 mL NS sebelum & sesudah penyuntikan pelumpuh otot."
      ]
    },
    blackBoxIncompatibilities: [
      "Atracurium Besylate (Presipitasi Putih Pekat Instan)",
      "Rocuronium Bromide",
      "Vecuronium",
      "Midazolam",
      "Morphine Sulfate",
      "Fentanyl Citrate",
      "Norepinephrine",
      "Dobutamine",
      "D5W"
    ]
  },
  {
    id: "iv-sugammadex",
    name: "Sugammadex (Bridion 100 mg/mL)",
    genericName: "Sugammadex Sodium Injection",
    brandNames: [
      "Bridion IV",
      "Sugammadex OGB"
    ],
    category: "Sedasi & Anestesi",
    phRange: "7.0 - 8.0 (Netral)",
    reconstitution: {
      recommendedDiluent: "Sediaan siap suntik 100 mg/mL (vial 2 mL = 200 mg, vial 5 mL = 500 mg)",
      volumeToReconstitute: "Suntikkan IV bolus murni dalam waktu 10 detik",
      resultantConcentration: "100 mg/mL",
      instructions: "Agen pengkapsul selektif (Modified gamma-cyclodextrin) yang mengikat rocuronium dan vecuronium dengan afinitas sangat tinggi untuk reversal blokade neuromuskular seketika."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: false,
      d5ns: true,
      notes: "Kompatibel dengan NS, D5W, dan RL."
    },
    stability: {
      roomTemp25C: "Vial utuh stabil pada suhu 2-30°C hingga tanggal kedaluwarsa terlindung cahaya",
      refrigerated2to8C: "2 - 8°C",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "100 mg/mL (bolus cepat 10s)",
      maxCentralConcentration: "100 mg/mL",
      standardInfusionRate: "Reversal rutin (reappearance of T2): 2 mg/kg; Reversal dalam (1-2 PTC): 4 mg/kg; Reversal darurat segera (3 menit pasca 1.2 mg/kg rocuronium): 16 mg/kg bolus cepat",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "Inkompatibel secara fisikokimia dengan Verapamil, Ondansetron, dan Ranitidine (memicu presipitasi mikro).",
        "Dapat mengikat hormon progesteron: Edukasi wanita pengguna kontrasepsi hormonal untuk menggunakan metode kontrasepsi non-hormonal tambahan selama 7 hari."
      ]
    },
    blackBoxIncompatibilities: [
      "Verapamil",
      "Ondansetron",
      "Ranitidine"
    ]
  },
  {
    id: "iv-enoxaparin",
    name: "Enoxaparin Sodium (Lovenox 100 mg/mL)",
    genericName: "Enoxaparin Sodium Injection (Low Molecular Weight Heparin - LMWH)",
    brandNames: [
      "Lovenox",
      "Clexane",
      "Inviclot LMWH",
      "Enoxaparin OGB"
    ],
    category: "Antikoagulan & Kardiovaskular",
    phRange: "5.5 - 7.5",
    reconstitution: {
      recommendedDiluent: "Spuit prefilled siap suntik (Hanya diberikan via port IV bolus pada STEMI)",
      volumeToReconstitute: "Sediaan siap pakai 30 mg / 0.3 mL, 40 mg / 0.4 mL, 60 mg / 0.6 mL",
      resultantConcentration: "100 mg/mL",
      instructions: "HANYA indikasi STEMI akut yang menggunakan single bolus IV 30 mg di awal, diikuti dosis subkutan (SC). HINDARI pencampuran sejalur dengan infus obat lain."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: false,
      wfi: false,
      d5ns: false,
      notes: "Diberikan bolus murni ke dalam port IV line yang sedang dialiri NS atau D5W."
    },
    stability: {
      roomTemp25C: "Simpan pada suhu ruang <25°C. Jangan dibekukan",
      refrigerated2to8C: "2 - 8°C",
      lightProtectionRequired: false,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "100 mg/mL (bolus)",
      maxCentralConcentration: "100 mg/mL",
      standardInfusionRate: "STEMI inisial: 30 mg IV bolus tunggal + 1 mg/kg SC dosis pertama",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "Wajib bilas port IV line dengan minimal 10 mL NS sebelum & sesudah injeksi.",
        "KONTRAINDIKASI DICAMPUR BERSAMA INFUS LAIN."
      ]
    },
    blackBoxIncompatibilities: [
      "Campuran infus berkelanjutan",
      "Streptokinase",
      "Blood Products"
    ]
  },
  {
    id: "iv-leucovorin",
    name: "Leucovorin Calcium (Asam Folinat / Folinic Acid 10 mg/mL)",
    genericName: "Leucovorin Calcium Injection",
    brandNames: [
      "Leucovorin IV",
      "Rescuvolin",
      "Folinate OGB",
      "Leucovorin DBL"
    ],
    category: "Lainnya",
    phRange: "6.5 - 8.5",
    reconstitution: {
      recommendedDiluent: "Normal Saline (NS 0.9%) atau D5W",
      volumeToReconstitute: "Larutkan vial 50 mg atau 100 mg dengan NS/D5W ke dalam 100 - 250 mL",
      resultantConcentration: "0.5 - 2 mg/mL",
      instructions: "Rescue therapy untuk menyelamatkan sel normal dari toksisitas letal Methotrexate dosis tinggi. KONTRAINDIKASI MUTLAK RUTE INTRA-TEKAL (FATAL)."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W."
    },
    stability: {
      roomTemp25C: "24 Jam setelah diencerkan dalam NS/D5W",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "10 mg/mL (bolus lambat) / 2 mg/mL (infus)",
      maxCentralConcentration: "10 mg/mL",
      standardInfusionRate: "Methotrexate rescue: 15 mg (sekitar 10 mg/m2) IV tiap 6 jam selama 72 jam hingga kadar methotrexate serum <0.05 mikromolar; Kecepatan infus maksimal 160 mg/menit",
      infusionRoute: "IV Bolus & Drip",
      specialPrecautions: [
        "Inkompatibel dengan Droperidol dan Foscarnet.",
        "KONTRAINDIKASI PEMBERIAN INTRATEKAL (Hanya untuk IV atau IM)."
      ]
    },
    blackBoxIncompatibilities: [
      "Droperidol",
      "Foscarnet Sodium",
      "Sodium Bicarbonate pekat"
    ]
  },
  {
    id: "iv-neostigmine",
    name: "Neostigmine Methylsulfate (Prostigmin 0.5 mg/mL)",
    genericName: "Neostigmine Methylsulfate Injection",
    brandNames: [
      "Prostigmin IV",
      "Neostigmine OGB"
    ],
    category: "Lainnya",
    phRange: "5.0 - 6.5",
    reconstitution: {
      recommendedDiluent: "Sediaan siap suntik (0.5 mg/mL dalam ampul 1 mL)",
      volumeToReconstitute: "Suntikkan bolus IV lambat",
      resultantConcentration: "0.5 mg/mL",
      instructions: "Inhibitor asetilkolinesterase untuk reversal pelumpuh otot non-depolarisasi (Atracurium/Vecuronium). WAJIB DIBERIKAN BERSAMA ATROPIN SULFATE (0.4 - 0.6 mg atropin per 1 mg neostigmin) untuk mencegah bradikardia berat, henti jantung, dan bronkospasme kolinergik."
    },
    diluents: {
      ns: true,
      d5w: true,
      rl: true,
      wfi: true,
      d5ns: true,
      notes: "Kompatibel dengan NS dan D5W."
    },
    stability: {
      roomTemp25C: "Stabil pada suhu 15-30°C terlindung cahaya",
      refrigerated2to8C: "24 Jam",
      lightProtectionRequired: true,
      filterRequired: false
    },
    administration: {
      maxPeripheralConcentration: "0.5 mg/mL",
      maxCentralConcentration: "0.5 mg/mL",
      standardInfusionRate: "Reversal pelumpuh otot: 0.03 - 0.07 mg/kgBB (maks 5 mg) IV lambat selama minimal 1 menit BERSAMAAN ATAU DIDAHULUI Atropin 0.6 - 1.2 mg IV",
      infusionRoute: "IV Bolus",
      specialPrecautions: [
        "KONTRAINDIKASI PEMBERIAN TUNGGAL TANPA ANTIKOLINERGIK (Atropin): Memicu bradikardia ekstrim dan asistol.",
        "Inkompatibel dengan larutan alkali."
      ]
    },
    blackBoxIncompatibilities: [
      "Alkaline Solutions",
      "Thiopental Sodium"
    ]
  }
];

export const Y_SITE_COMPATIBILITY_MATRIX: YSiteCompatibilityPair[] = [
  // Ceftriaxone Incompatibilities
  {
    drugAId: 'iv-ceftriaxone',
    drugBId: 'iv-furosemide',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Inkompatibilitas fisikokimia larutan membentuk presipitasi keruh putih kekuningan.',
    clinicalEffect: 'Penyumbatan kateter infus, hilangnya efikasi antibakteri dan diuretik.',
    recommendation: 'Gunakan jalur IV terpisah atau bilas kateter dengan minimal 20 mL NS sebelum dan sesudah pemberian.'
  },
  {
    drugAId: 'iv-ceftriaxone',
    drugBId: 'iv-amiodarone',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Presipitasi partikulat kristal amiodarone tak larut seketika.',
    clinicalEffect: 'Risiko emboli partikulat mikrovaskular dan flebitis parah.',
    recommendation: 'KONTRAINDIKASI SEJALUR. Pasang jalur vena kedua (*separate dedicated IV line*).'
  },
  {
    drugAId: 'iv-ceftriaxone',
    drugBId: 'iv-vancomycin',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Presipitasi garam tidak larut antara kation glikopeptida vancomycin dan anion beta-laktam ceftriaxone.',
    clinicalEffect: 'Kristalisasi putih susu di dalam lumen selang infus.',
    recommendation: 'Bilas selang dengan minimal 20 mL NaCl 0.9% secara menyeluruh jika harus memakai jalur yang sama bergantian.'
  },

  // Furosemide (pH basa ~9) Incompatibilities
  {
    drugAId: 'iv-furosemide',
    drugBId: 'iv-midazolam',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Inkompatibilitas asam-basa ekstrem: Furosemide (pH ~9) menetralkan buffer asam Midazolam (pH ~3.3), memicu presipitasi kristal putih seketika.',
    clinicalEffect: 'Kristalisasi masif menyumbat kateter infus dan risiko emboli kristal ke paru.',
    recommendation: 'KONTRAINDIKASI MUTLAK DALAM SATU JALUR. Berikan melalui lumen CVC yang berbeda atau bilas bersih.'
  },
  {
    drugAId: 'iv-furosemide',
    drugBId: 'iv-dobutamine',
    status: 'incompatible',
    evidence: 'ASHP Injectable Drugs',
    mechanism: 'Presipitasi fisikokimia dan degradasi katekolamin akibat pH alkali furosemide.',
    clinicalEffect: 'Inaktivasi inotropik dobutamin dan pengendapan partikulat.',
    recommendation: 'Pisahkan jalur infus. Jangan pernah menyuntikkan Furosemide ke dalam jalur infus kontinu Dobutamine.'
  },
  {
    drugAId: 'iv-furosemide',
    drugBId: 'iv-norepinephrine',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Degradasi oksidatif dan presipitasi asam-basa norepinefrin dalam suasana basa.',
    clinicalEffect: 'Inaktivasi vasopresor norepinefrin yang memicu penurunan tekanan darah / kolaps hemodinamik mendadak.',
    recommendation: 'KONTRAINDIKASI MUTLAK pada jalur vasopresor. Gunakan jalur IV perifer terpisah untuk bolus Furosemide.'
  },
  {
    drugAId: 'iv-furosemide',
    drugBId: 'iv-nicardipine',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Presipitasi garam nicardipine tidak larut pada pH tinggi.',
    clinicalEffect: 'Penyumbatan kateter dan emboli mikrokristal.',
    recommendation: 'Pisahkan jalur infus secara total.'
  },
  {
    drugAId: 'iv-furosemide',
    drugBId: 'iv-pantoprazole',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Keduanya memiliki rentang pH basa yang saling kompatibel (pH 8-10).',
    clinicalEffect: 'Tidak terjadi presipitasi atau degradasi kimiawi bermakna dalam 4 jam.',
    recommendation: 'Kompatibel pada percabangan Y-Site (namun tetap disarankan pembilasan rutin).'
  },

  // Norepinephrine & Vasoactive pairings
  {
    drugAId: 'iv-norepinephrine',
    drugBId: 'iv-dobutamine',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Keduanya larutan asam stabil dalam pembawa D5W pada rentang konsentrasi standar ICU.',
    clinicalEffect: 'Stabil secara fisik dan kimiawi selama kontak Y-Site.',
    recommendation: 'Dapat dialirkan bersamaan pada percabangan Y-Site jalur sentral (CVC).'
  },
  {
    drugAId: 'iv-norepinephrine',
    drugBId: 'iv-dopamine',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel secara fisikokimiawi dalam cairan dekstrosa.',
    clinicalEffect: 'Tidak ada penurunan potensi atau presipitasi.',
    recommendation: 'Kompatibel Y-Site.'
  },
  {
    drugAId: 'iv-norepinephrine',
    drugBId: 'iv-midazolam',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kedua zat aktif berada dalam pH asam stabil.',
    clinicalEffect: 'Stabil dan kompatibel pada percabangan Y-Site.',
    recommendation: 'Kompatibel Y-Site via lumen CVC.'
  },
  {
    drugAId: 'iv-norepinephrine',
    drugBId: 'iv-pantoprazole',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Alkalinitas tinggi pantoprazole (pH >9) merusak molekul norepinefrin.',
    clinicalEffect: 'Kehilangan efek vasopresor dan perubahan warna larutan.',
    recommendation: 'HINDARI PEMBERIAN SEJALUR. Jangan bolus pantoprazole pada jalur vasopresor aktif.'
  },

  // Amiodarone pairings
  {
    drugAId: 'iv-amiodarone',
    drugBId: 'iv-furosemide',
    status: 'incompatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Presipitasi garam amiodarone instan.',
    clinicalEffect: 'Pembentukan endapan putih tebal di lumen selang.',
    recommendation: 'KONTRAINDIKASI MUTLAK.'
  },
  {
    drugAId: 'iv-amiodarone',
    drugBId: 'iv-norepinephrine',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel dalam pembawa D5W.',
    clinicalEffect: 'Stabil selama 4 jam kontak Y-Site.',
    recommendation: 'Kompatibel Y-Site dengan cairan pembawa D5W.'
  },
  {
    drugAId: 'iv-amiodarone',
    drugBId: 'iv-dobutamine',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Stabil dalam larutan D5W.',
    clinicalEffect: 'Kompatibel secara fisik.',
    recommendation: 'Kompatibel Y-Site.'
  },

  // Potassium Chloride (KCl) pairings
  {
    drugAId: 'iv-potassium-chloride',
    drugBId: 'iv-norepinephrine',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel pada konsentrasi standar infus.',
    clinicalEffect: 'Stabil tanpa presipitasi.',
    recommendation: 'Kompatibel Y-Site.'
  },
  {
    drugAId: 'iv-potassium-chloride',
    drugBId: 'iv-midazolam',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel dalam larutan NS/D5W.',
    clinicalEffect: 'Stabil secara fisik.',
    recommendation: 'Kompatibel Y-Site.'
  },
  {
    drugAId: 'iv-potassium-chloride',
    drugBId: 'iv-furosemide',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel dalam larutan saline/infus.',
    clinicalEffect: 'Stabil secara fisik.',
    recommendation: 'Kompatibel Y-Site.'
  },

  // Propofol pairings
  {
    drugAId: 'iv-propofol',
    drugBId: 'iv-norepinephrine',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Stabil pada Y-site jika konsentrasi propofol murni tidak terganggu.',
    clinicalEffect: 'Tidak terjadi pemisahan fase emulsi lipid.',
    recommendation: 'Kompatibel pada Y-Site CVC (pantau emulsi jangan sampai pecah).'
  },
  {
    drugAId: 'iv-propofol',
    drugBId: 'iv-midazolam',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel secara fisik pada konsentrasi standar ICU.',
    clinicalEffect: 'Stabil.',
    recommendation: 'Kompatibel Y-Site.'
  },
  {
    drugAId: 'iv-propofol',
    drugBId: 'iv-furosemide',
    status: 'incompatible',
    evidence: 'ASHP Injectable Drugs',
    mechanism: 'Perubahan pH memecah droplet emulsi lipid emulsi propofol.',
    clinicalEffect: 'Pemisahan fase minyak dan pembentukan droplet lemak besar berbahaya (fat embolism).',
    recommendation: 'KONTRAINDIKASI BERSAMAAN DALAM SATU JALUR.'
  },

  // Meropenem & Antibiotics
  {
    drugAId: 'iv-meropenem',
    drugBId: 'iv-vancomycin',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Kompatibel pada konsentrasi standar Y-site dalam NaCl 0.9%.',
    clinicalEffect: 'Stabil tanpa presipitasi dalam 4 jam.',
    recommendation: 'Kompatibel pada percabangan Y-Site.'
  },
  {
    drugAId: 'iv-meropenem',
    drugBId: 'iv-potassium-chloride',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Stabil secara fisik.',
    clinicalEffect: 'Kompatibel.',
    recommendation: 'Kompatibel Y-Site.'
  },
  {
    drugAId: 'iv-meropenem',
    drugBId: 'iv-furosemide',
    status: 'compatible',
    evidence: 'Trissel\'s 2024',
    mechanism: 'Keduanya stabil pada pH netral-basa.',
    clinicalEffect: 'Stabil tanpa presipitasi.',
    recommendation: 'Kompatibel Y-Site.'
  }
,
  {
    drugAId: "iv-ceftriaxone",
    drugBId: "iv-calcium-gluconate",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi mikrokristal kalsium-seftriakson tak larut yang mengendap di mikrovaskular paru dan ginjal.",
    clinicalEffect: "FATAL: Emboli kristal paru dan gagal ginjal akut dilaporkan pada neonatus dan pasien dewasa.",
    recommendation: "KONTRAINDIKASI MUTLAK: Dilarang diberikan bersamaan dalam jalur infus atau set Y-site yang sama. Beri jeda minimal 48 jam pada neonatus."
  },
  {
    drugAId: "iv-sodium-bicarbonate",
    drugBId: "iv-calcium-gluconate",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Reaksi pembentukan garam Kalsium Karbonat yang tidak larut dalam air (endapan kapur putih susu).",
    clinicalEffect: "Presipitasi langsung partikulat kristal kapur yang menyumbat jalur kateter dan memicu flebitis/emboli.",
    recommendation: "KONTRAINDIKASI: Wajib gunakan jalur IV terpisah atau bilas kateter dengan minimal 20 mL NS sebelum beralih obat."
  },
  {
    drugAId: "iv-furosemide",
    drugBId: "iv-epinephrine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi asam-basa seketika dan degradasi oksidatif epinefrin dalam suasana basa.",
    clinicalEffect: "Larutan berubah keruh dengan pembentukan kristal partikulat.",
    recommendation: "KONTRAINDIKASI Y-SITE: Berikan melalui jalur infus terpisah."
  },
  {
    drugAId: "iv-furosemide",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi garam morfin basa bebas akibat peningkatan pH oleh furosemide.",
    clinicalEffect: "Presipitasi langsung partikulat kristal putih pada percabangan Y-site.",
    recommendation: "KONTRAINDIKASI: Berikan injeksi morfin pada jalur terpisah atau lakukan flushing komprehensif."
  },
  {
    drugAId: "iv-furosemide",
    drugBId: "iv-ondansetron",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi kristal putih halus tak larut dalam hitungan detik setelah kontak.",
    clinicalEffect: "Oklusi kateter IV dan embolisasi mikropartikel ke sirkulasi vena.",
    recommendation: "KONTRAINDIKASI: Wajib bilas selang infus dengan 15-20 mL NS sebelum dan sesudah injeksi ondansetron."
  },
  {
    drugAId: "iv-furosemide",
    drugBId: "iv-ciprofloxacin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi kristal siprofloksasin zwitterionik tak larut pada pergeseran pH netral/basa.",
    clinicalEffect: "Presipitasi keruh putih masif seketika.",
    recommendation: "KONTRAINDIKASI MUTLAK Y-SITE: Dilarang co-infus. Bilas jalur dengan 20 mL NS."
  },
  {
    drugAId: "iv-heparin",
    drugBId: "iv-vancomycin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Ikatan elektrostatik anionik heparin dengan kation vankomisin membentuk kompleks presipitat tidak larut.",
    clinicalEffect: "Presipitat kental keruh yang menyumbat filter dan kateter infus.",
    recommendation: "KONTRAINDIKASI Y-SITE: Berikan melalui lumen CVC berbeda atau lakukan pembilasan dengan NS."
  },
  {
    drugAId: "iv-heparin",
    drugBId: "iv-ciprofloxacin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi kompleks garam fluoroquinolon-heparin.",
    clinicalEffect: "Kekeruhan dan hilangnya potensi antikoagulan serta antibiotik.",
    recommendation: "KONTRAINDIKASI: Berikan via jalur terpisah."
  },
  {
    drugAId: "iv-heparin",
    drugBId: "iv-amiodarone",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi segera surfaktan dan garam kompleks.",
    clinicalEffect: "Emboli partikulat dan penurunan bioavailabilitas obat.",
    recommendation: "KONTRAINDIKASI: Gunakan jalur infus terpisah."
  },
  {
    drugAId: "iv-sodium-bicarbonate",
    drugBId: "iv-norepinephrine",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Oksidasi katekolamin yang sangat cepat dalam suasana alkali/basa (pH >7.5) menjadi kuinon inaktif berwarna cokelat.",
    clinicalEffect: "Inaktivasi total efek vasopresor norepinefrin (kegagalan kontrol tekanan darah).",
    recommendation: "KONTRAINDIKASI MUTLAK: Jangan pernah memasukkan bikarbonat ke dalam jalur infus norepinefrin."
  },
  {
    drugAId: "iv-sodium-bicarbonate",
    drugBId: "iv-dobutamine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Oksidasi cincin katekol dobutamin menghasilkan senyawa inaktif berwarna merah muda/cokelat.",
    clinicalEffect: "Hilangnya daya inotropik obat.",
    recommendation: "KONTRAINDIKASI: Berikan melalui jalur terpisah."
  },
  {
    drugAId: "iv-sodium-bicarbonate",
    drugBId: "iv-epinephrine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Degradasi oksidatif epinefrin menjadi adrenokrom.",
    clinicalEffect: "Kehilangan aktivitas simpatomimetik resusitasi.",
    recommendation: "KONTRAINDIKASI: Dilarang mencampur dalam spuit atau jalur Y-site yang sama."
  },
  {
    drugAId: "iv-sodium-bicarbonate",
    drugBId: "iv-dopamine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Inaktivasi basa cepat terhadap gugus katekolamin dopamin.",
    clinicalEffect: "Larutan berubah warna menjadi gelap dan kehilangan efek hemodinamik.",
    recommendation: "KONTRAINDIKASI: Wajib jalur IV terpisah."
  },
  {
    drugAId: "iv-acyclovir",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Perbedaan pH ekstrem (Acyclovir pH 11.0 vs Midazolam pH 3.0) memicu penutupan cincin diazepin dan presipitasi masif kedua obat.",
    clinicalEffect: "Presipitasi putih susu tebal seketika.",
    recommendation: "KONTRAINDIKASI: Jalur terpisah mutlak diperlukan."
  },
  {
    drugAId: "iv-acyclovir",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi asam-basa masif.",
    clinicalEffect: "Presipitat partikulat padat.",
    recommendation: "KONTRAINDIKASI Y-SITE."
  },
  {
    drugAId: "iv-acyclovir",
    drugBId: "iv-vancomycin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi garam vankomisin dalam pH sangat basa.",
    clinicalEffect: "Penggumpalan partikulat di selang infus.",
    recommendation: "KONTRAINDIKASI: Wajib bilas 20 mL NS di antara pemberian."
  },
  {
    drugAId: "iv-vancomycin",
    drugBId: "iv-piperacillin-tazobactam",
    status: "conditional",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Inkompatibilitas fisiko-kimiawi tergantung pada konsentrasi dan merek dagang formulasi generik.",
    clinicalEffect: "Risiko kekeruhan dan presipitasi sub-visual yang dapat menyumbat membran dialisis/kateter.",
    recommendation: "WASPADA: Dianjurkan memberikan secara terpisah atau membilas jalur kateter dengan 20 mL NS sebelum & sesudah."
  },
  {
    drugAId: "iv-norepinephrine",
    drugBId: "iv-epinephrine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Sama-sama katekolamin dengan stabilitas pH asam yang selaras.",
    clinicalEffect: "Larutan jernih tanpa perubahan kimiawi selama 24 jam.",
    recommendation: "KOMPATIBEL: Aman diberikan bersamaan via Y-site pada syok refrakter."
  },
  {
    drugAId: "iv-norepinephrine",
    drugBId: "iv-vasopressin",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil secara fisika dan kimia pada pH asam.",
    clinicalEffect: "Kombinasi standar lini pertama syok septik.",
    recommendation: "KOMPATIBEL: Aman diberikan co-infus via Y-site CVC."
  },
  {
    drugAId: "iv-norepinephrine",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel pada konsentrasi klinis ICU standar.",
    clinicalEffect: "Larutan jernih stabil tanpa presipitasi.",
    recommendation: "KOMPATIBEL: Aman co-infus pada pasien kritis terintubasi."
  },
  {
    drugAId: "iv-dobutamine",
    drugBId: "iv-dopamine",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Stabilitas pH asam saling kompatibel.",
    clinicalEffect: "Larutan stabil 24 jam.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-dobutamine",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil secara fisika dan kimia.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus di ICU."
  },
  {
    drugAId: "iv-propofol",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Emulsi lipid propofol tidak mengalami cracking saat bercampur dengan fentanil di Y-site.",
    clinicalEffect: "Kombinasi sedasi-analgesia ICU standar.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-midazolam",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibilitas fisiko-kimiawi sangat baik.",
    clinicalEffect: "Larutan stabil dan jernih.",
    recommendation: "KOMPATIBEL: Dapat diberikan dalam jalur yang sama."
  },
  {
    drugAId: "iv-morphine",
    drugBId: "iv-midazolam",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel pada pelarut NS dan D5W.",
    clinicalEffect: "Larutan stabil.",
    recommendation: "KOMPATIBEL: Aman co-infus / Y-site."
  },
  {
    drugAId: "iv-potassium-chloride",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel stabil.",
    clinicalEffect: "Tidak ada interaksi fisiko-kimiawi.",
    recommendation: "KOMPATIBEL: Aman co-infus."
  },
  {
    drugAId: "iv-diazepam",
    drugBId: "iv-potassium-chloride",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Pengenceran pelarut organik diazepam oleh larutan kristaloid menyebabkan presipitasi diazepam seketika.",
    clinicalEffect: "Presipitat kristal jarum putih tak larut.",
    recommendation: "KONTRAINDIKASI: Berikan diazepam melalui jalur IV terpisah atau bilas kateter sebelum & sesudah."
  },
  {
    drugAId: "iv-diazepam",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi instan kedua obat.",
    clinicalEffect: "Kekeruhan masif.",
    recommendation: "KONTRAINDIKASI Y-SITE."
  },
  {
    drugAId: "iv-diazepam",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi diazepam bebas.",
    clinicalEffect: "Presipitat putih.",
    recommendation: "KONTRAINDIKASI: Wajib jalur terpisah."
  },
  {
    drugAId: "iv-diazepam",
    drugBId: "iv-ceftriaxone",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi kristalisasi seketika.",
    clinicalEffect: "Kekeruhan tebal.",
    recommendation: "KONTRAINDIKASI: Berikan terpisah."
  },
  {
    drugAId: "iv-meropenem",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel pada kontak Y-site 4 jam.",
    clinicalEffect: "Larutan jernih stabil.",
    recommendation: "KOMPATIBEL: Aman diberikan bersamaan."
  },
  {
    drugAId: "iv-meropenem",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibilitas fisiko-kimiawi baik.",
    clinicalEffect: "Larutan stabil.",
    recommendation: "KOMPATIBEL: Aman co-infus."
  },
  {
    drugAId: "iv-dexmedetomidine",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kedua obat stabil dalam pelarut NS.",
    clinicalEffect: "Kombinasi sedasi-analgesia aman.",
    recommendation: "KOMPATIBEL: Aman co-infus di ruang intensif."
  },
  {
    drugAId: "iv-dexmedetomidine",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel pada konsentrasi standar syringe pump.",
    clinicalEffect: "Larutan stabil 24 jam.",
    recommendation: "KOMPATIBEL: Aman co-infus."
  },
  {
    drugAId: "iv-diltiazem",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi asam-basa instan.",
    clinicalEffect: "Terbentuk endapan putih keruh dalam beberapa detik.",
    recommendation: "KONTRAINDIKASI Y-SITE: Berikan melalui jalur infus berbeda."
  },
  {
    drugAId: "iv-ketorolac",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi garam kompleks pada konsentrasi pekat.",
    clinicalEffect: "Kekeruhan partikulat.",
    recommendation: "KONTRAINDIKASI DALAM SATU SPUT / Y-SITE PEKAT: Berikan secara terpisah atau bilas dengan NS."
  },
  {
    drugAId: "iv-tranexamic-acid",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil secara fisiko-kimiawi pada pelarut NS/D5W.",
    clinicalEffect: "Larutan jernih tanpa perubahan potensi.",
    recommendation: "KOMPATIBEL: Aman diberikan via Y-site pada manajemen syok hemoragik."
  },
  {
    drugAId: "iv-insulin-regular",
    drugBId: "iv-potassium-chloride",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Sangat kompatibel dalam larutan kristaloid infus.",
    clinicalEffect: "Kombinasi standar terapi DKA / Hiperkalemia.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site atau dalam kantong infus yang sama."
  },
  {
    drugAId: "iv-insulin-regular",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil pada konsentrasi standar ICU.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  }
,
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Inkompatibilitas asam-basa ekstrem: pH alkali omeprazole menetralkan buffer asam midazolam, memicu presipitasi keruh putih seketika.",
    clinicalEffect: "Presipitasi partikulat menyumbat lumen kateter.",
    recommendation: "KONTRAINDIKASI Y-SITE: Berikan melalui jalur terpisah atau bilas kateter dengan minimal 20 mL NS."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-ondansetron",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi kristal seketika akibat perbedaan pH.",
    clinicalEffect: "Terbentuk endapan putih kabut di selang infus.",
    recommendation: "KONTRAINDIKASI: Berikan terpisah."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-norepinephrine",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Degradasi oksidatif vasopresor dalam pH basa omeprazole.",
    clinicalEffect: "Inaktivasi norepinefrin dan penurunan tekanan darah mendadak.",
    recommendation: "KONTRAINDIKASI SEJALUR: Jangan memasukkan omeprazole ke dalam jalur kontinu vasopresor."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-dobutamine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi dan perubahan warna kecokelatan seketika.",
    clinicalEffect: "Hilangnya daya inotropik obat.",
    recommendation: "KONTRAINDIKASI Y-SITE."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi morfin basa bebas.",
    clinicalEffect: "Endapan kristal.",
    recommendation: "KONTRAINDIKASI: Jalur terpisah."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-fentanyl",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi fisiko-kimiawi.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI Y-SITE."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-ciprofloxacin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi zwitterionik siprofloksasin dalam pH tinggi.",
    clinicalEffect: "Presipitasi masif seketika.",
    recommendation: "KONTRAINDIKASI MUTLAK: Bilas selang dengan 20 mL NS."
  },
  {
    drugAId: "iv-omeprazole",
    drugBId: "iv-potassium-chloride",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel dalam larutan kristaloid NaCl 0.9%.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman diberikan via Y-site."
  },
  {
    drugAId: "iv-esomeprazole",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi asam-basa instan.",
    clinicalEffect: "Presipitat partikulat putih.",
    recommendation: "KONTRAINDIKASI: Wajib jalur terpisah."
  },
  {
    drugAId: "iv-esomeprazole",
    drugBId: "iv-ondansetron",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi seketika.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI."
  },
  {
    drugAId: "iv-phenytoin",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi masif kristal fenitoin bebas tak larut saat kontak dengan pH asam morfin.",
    clinicalEffect: "Kristalisasi jarum putih pekat seketika menyumbat jalur IV.",
    recommendation: "KONTRAINDIKASI MUTLAK: Wajib jalur IV tersendiri. Bilas dengan 20 mL NS sebelum & sesudah."
  },
  {
    drugAId: "iv-phenytoin",
    drugBId: "iv-fentanyl",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi kristal fenitoin.",
    clinicalEffect: "Oklusi kateter IV dan risiko emboli kristal.",
    recommendation: "KONTRAINDIKASI MUTLAK Y-SITE."
  },
  {
    drugAId: "iv-phenytoin",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi masif kedua zat aktif.",
    clinicalEffect: "Endapan putih susu tebal.",
    recommendation: "KONTRAINDIKASI MUTLAK."
  },
  {
    drugAId: "iv-phenytoin",
    drugBId: "iv-norepinephrine",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi fenitoin dan destruksi kimia katekolamin.",
    clinicalEffect: "Hilangnya kontrol vasopresor dan sumbatan selang.",
    recommendation: "KONTRAINDIKASI MUTLAK."
  },
  {
    drugAId: "iv-phenytoin",
    drugBId: "iv-potassium-chloride",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi fenitoin bebas akibat pergeseran ionik.",
    clinicalEffect: "Kekeruhan partikulat.",
    recommendation: "KONTRAINDIKASI."
  },
  {
    drugAId: "iv-potassium-phosphate",
    drugBId: "iv-calcium-gluconate",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Reaksi pengikatan ion Kalsium dan Fosfat membentuk Kalsium Fosfat (Dibasic / Tribasic Calcium Phosphate) yang praktis tidak larut dalam air.",
    clinicalEffect: "FATAL: Pembentukan mikrokristal di pembuluh darah perifer/paru yang memicu emboli paru masif dan kematian mendadak.",
    recommendation: "KONTRAINDIKASI MUTLAK DALAM SATU JALUR: Berikan melalui jalur infus terpisah atau bilas kateter dengan minimal 30 mL NS di antara pemberian."
  },
  {
    drugAId: "iv-milrinone",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi asam-basa seketika membentuk endapan kristal putih padat.",
    clinicalEffect: "Sumbatan kateter syringe pump dan emboli partikulat.",
    recommendation: "KONTRAINDIKASI MUTLAK: Gunakan jalur IV berbeda untuk bolus Furosemide pada pasien yang sedang menerima infus kontinu Milrinone."
  },
  {
    drugAId: "iv-milrinone",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kedua obat stabil pada pH asam dan kompatibel dalam D5W/NS.",
    clinicalEffect: "Kombinasi inodilator dan vasopresor aman diberikan via Y-site.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site jalur sentral (CVC)."
  },
  {
    drugAId: "iv-milrinone",
    drugBId: "iv-dobutamine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil dan jernih tanpa perubahan kimiawi.",
    clinicalEffect: "Kombinasi inotropik aman.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-milrinone",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil secara fisiko-kimiawi.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL."
  },
  {
    drugAId: "iv-paracetamol",
    drugBId: "iv-morphine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel stabil pada konsentrasi klinis Y-site.",
    clinicalEffect: "Kombinasi analgesia multimodal pascabedah standar.",
    recommendation: "KOMPATIBEL: Aman diberikan via Y-site."
  },
  {
    drugAId: "iv-paracetamol",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil dan kompatibel.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL."
  },
  {
    drugAId: "iv-paracetamol",
    drugBId: "iv-ketorolac",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel pada kontak Y-site kristaloid.",
    clinicalEffect: "Analgesia multimodal efektif.",
    recommendation: "KOMPATIBEL: Aman diberikan via Y-site."
  },
  {
    drugAId: "iv-paracetamol",
    drugBId: "iv-tramadol",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel fisiko-kimiawi.",
    clinicalEffect: "Larutan stabil.",
    recommendation: "KOMPATIBEL."
  },
  {
    drugAId: "iv-paracetamol",
    drugBId: "iv-ondansetron",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil tanpa presipitasi.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus."
  },
  {
    drugAId: "iv-ceftazidime",
    drugBId: "iv-vancomycin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi garam kation-anion membentuk kabut keruh partikulat.",
    clinicalEffect: "Penurunan bioavailabilitas antibiotik dan sumbatan kateter.",
    recommendation: "KONTRAINDIKASI Y-SITE: Berikan secara intermiten terpisah atau bilas dengan 20 mL NS."
  },
  {
    drugAId: "iv-cefepime",
    drugBId: "iv-vancomycin",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi fisikokimia tergantung konsentrasi.",
    clinicalEffect: "Kekeruhan larutan dan risiko nefrotoksisitas sinergis.",
    recommendation: "KONTRAINDIKASI Y-SITE: Bilas jalur kateter dengan 20 mL NS sebelum & sesudah."
  },
  {
    drugAId: "iv-rocuronium",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Presipitasi asam-basa seketika.",
    clinicalEffect: "Endapan putih keruh di selang infus.",
    recommendation: "KONTRAINDIKASI Y-SITE."
  },
  {
    drugAId: "iv-rocuronium",
    drugBId: "iv-fentanyl",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil dan kompatibel.",
    clinicalEffect: "Kombinasi RSI anestesi standar.",
    recommendation: "KOMPATIBEL: Aman diberikan via Y-site."
  },
  {
    drugAId: "iv-rocuronium",
    drugBId: "iv-propofol",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel pada kontak Y-site bolus induksi.",
    clinicalEffect: "Emulsi stabil.",
    recommendation: "KOMPATIBEL: Aman diberikan berurutan/Y-site."
  },
  {
    drugAId: "iv-atracurium",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Inaktivasi Hofmann cepat dan presipitasi asam bebas.",
    clinicalEffect: "Presipitat putih.",
    recommendation: "KONTRAINDIKASI."
  },
  {
    drugAId: "iv-digoxin",
    drugBId: "iv-calcium-gluconate",
    status: "incompatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Sinergisme toksisitas intraseluler: Kalsium IV meningkatkan konsentrasi kalsium sitosolik miokard yang sudah terhambat oleh inhibisi pompa Na+/K+-ATPase oleh digoksin.",
    clinicalEffect: "FATAL: Memicu aritmia ventrikel refrakter, takikardia ventrikel polimorfik, dan henti jantung asistol seketika (\"Stone Heart\").",
    recommendation: "KONTRAINDIKASI MUTLAK: Dilarang keras memberikan kalsium IV pada pasien dengan terapi digoksin kecuali pada darurat hiperkalemia ekstrim dengan pengawasan sangat ketat."
  },
  {
    drugAId: "iv-lidocaine",
    drugBId: "iv-amiodarone",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel secara fisikokimia dalam pelarut D5W/NS.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site pada tata laksana aritmia refrakter."
  },
  {
    drugAId: "iv-lidocaine",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Stabil pada pH asam.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-isdn",
    drugBId: "iv-heparin",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Kompatibel pada pelarut infus standar.",
    clinicalEffect: "Kombinasi standar sindrom koroner akut (ACS).",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  // Amphotericin B Incompatibilities & Compatibilities
  {
    drugAId: "iv-amphotericin-b",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi koloid masif spontan akibat ion elektrolit dan pH basa furosemid.",
    clinicalEffect: "Penyumbatan kateter infus, hilangnya bioavailabilitas, flebitis parah.",
    recommendation: "KONTRAINDIKASI MUTLAK SEJALUR. Pasang jalur infus terpisah."
  },
  {
    drugAId: "iv-amphotericin-b",
    drugBId: "iv-heparin",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi garam kompleks amfoterisin heparin tak larut.",
    clinicalEffect: "Kekeruhan larutan dan risiko emboli partikulat.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-amphotericin-b",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Perbedaan formulasi dan presipitasi koloid.",
    clinicalEffect: "Presipitasi partikulat mikro.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-amphotericin-b",
    drugBId: "iv-potassium-chloride",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Ion kalium dan klorida memecah agregat misel koloid amfoterisin deoksikolat.",
    clinicalEffect: "Presipitasi kristal amfoterisin bebas.",
    recommendation: "KONTRAINDIKASI SEJALUR: Berikan koreksi kalium via jalur terpisah."
  },
  {
    drugAId: "iv-amphotericin-b",
    drugBId: "iv-fluconazole",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel secara fisikokimia dalam pelarut D5W.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site pada pelarut D5W."
  },
  // Thiopental Sodium Incompatibilities
  {
    drugAId: "iv-thiopental",
    drugBId: "iv-atracurium",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi asam bebas instan akibat perbedaan pH ekstrim (Thiopental pH 10.5 vs Atracurium pH 3.5).",
    clinicalEffect: "FATAL: Penyumbatan kateter seketika, hilangnya efek relaksasi otot saat intubasi gawat darurat.",
    recommendation: "KONTRAINDIKASI MUTLAK: Bilas selang infus dengan minimal 20 mL NS sebelum & sesudah injeksi atracurium."
  },
  {
    drugAId: "iv-thiopental",
    drugBId: "iv-rocuronium",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi asam bebas putih pekat seketika.",
    clinicalEffect: "Penyumbatan kateter infus dan inaktivasi rocuronium.",
    recommendation: "KONTRAINDIKASI MUTLAK: Wajib pembilasan selang dengan 20 mL NS."
  },
  {
    drugAId: "iv-thiopental",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi cincin benzodiazepin tak larut dalam suasana alkali ekstrem.",
    clinicalEffect: "Kekeruhan putih susu instan.",
    recommendation: "KONTRAINDIKASI MUTLAK SEJALUR."
  },
  {
    drugAId: "iv-thiopental",
    drugBId: "iv-morphine",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi basa morfin bebas akibat alkalinitas thiopental.",
    clinicalEffect: "Presipitasi partikulat kristal.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-thiopental",
    drugBId: "iv-fentanyl",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi garam sitrat fentanil.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-thiopental",
    drugBId: "iv-norepinephrine",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Oksidasi dan degradasi instan norepinefrin dalam larutan alkali (pH >8).",
    clinicalEffect: "Larutan berubah cokelat kemerahan dan kehilangan efikasi vasopresor.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  // Mannitol 20% Pairs
  {
    drugAId: "iv-mannitol",
    drugBId: "iv-furosemide",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel pada pelarut standar.",
    clinicalEffect: "Kombinasi sinergis deplesi edema serebral refrakter.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-mannitol",
    drugBId: "iv-ceftriaxone",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi partikulat mikro tak larut.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI SEJALUR: Bilas selang dengan 20 mL NS."
  },
  {
    drugAId: "iv-mannitol",
    drugBId: "iv-potassium-chloride",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel secara fisikokimia.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  // Sugammadex Pairs
  {
    drugAId: "iv-sugammadex",
    drugBId: "iv-rocuronium",
    status: "compatible",
    evidence: "ASHP Injectable Drugs",
    mechanism: "Pengikatan khelasi molekuler 1:1 spesifik (Target Indikasi Reversal Blokade Neuromuskular).",
    clinicalEffect: "Reversal cepat blokade neuromuskular.",
    recommendation: "KOMPATIBEL: Standar emas pemulihan blokade neuromuskular."
  },
  {
    drugAId: "iv-sugammadex",
    drugBId: "iv-ondansetron",
    status: "incompatible",
    evidence: "FDA Labeling",
    mechanism: "Inkompatibilitas fisikokimia mikro.",
    clinicalEffect: "Kekeruhan mikroskopis dan potensi adsorpsi.",
    recommendation: "HINDARI SEJALUR: Bilas kateter dengan 10 mL NS sebelum injeksi."
  },
  {
    drugAId: "iv-sugammadex",
    drugBId: "iv-ranitidine",
    status: "incompatible",
    evidence: "FDA Labeling",
    mechanism: "Inkompatibilitas fisikokimia.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "HINDARI SEJALUR: Bilas kateter dengan NS."
  },
  // Oxytocin Pairs
  {
    drugAId: "iv-oxytocin",
    drugBId: "iv-sodium-bicarbonate",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Hidrolisis ikatan peptida oksitosin pada suasana alkali.",
    clinicalEffect: "Inaktivasi efikasi uterotonika, atonia uteri pasca persalinan.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-oxytocin",
    drugBId: "iv-tranexamic-acid",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel dalam pelarut infus RL / NS.",
    clinicalEffect: "Kombinasi standar penanganan Perdarahan Pasca Persalinan (PPH).",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-oxytocin",
    drugBId: "iv-magnesium-sulfate",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel dalam pelarut infus.",
    clinicalEffect: "Protokol Preeklampsia Berat + Induksi Persalinan.",
    recommendation: "KOMPATIBEL: Aman co-infus dengan monitoring kontraksi uterus dan TTV."
  },
  // Labetalol & Esmolol Pairs
  {
    drugAId: "iv-labetalol",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi kristal basa labetalol akibat suasana alkali furosemid.",
    clinicalEffect: "Presipitasi partikulat seketika.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-labetalol",
    drugBId: "iv-sodium-bicarbonate",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi labetalol pada pH >6.5.",
    clinicalEffect: "Presipitasi putih keruh.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-labetalol",
    drugBId: "iv-nicardipine",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel pada pelarut D5W/NS pada pH asam.",
    clinicalEffect: "Kombinasi tata laksana krisis hipertensi refrakter.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  {
    drugAId: "iv-esmolol",
    drugBId: "iv-sodium-bicarbonate",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Degradasi hidrolisis cepat cincin ester esmolol dalam suasana basa.",
    clinicalEffect: "Kehilangan bioaktivitas beta-blocker.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-esmolol",
    drugBId: "iv-furosemide",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Inkompatibilitas pH.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-esmolol",
    drugBId: "iv-propofol",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel via Y-site tanpa merusak kestabilan emulsi lipid.",
    clinicalEffect: "Larutan dan emulsi stabil.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  // Co-Amoxiclav Pairs
  {
    drugAId: "iv-co-amoxiclav",
    drugBId: "iv-gentamicin",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Inaktivasi kimiawi langsung cincin beta-laktam terhadap gugus amino aminoglikosida.",
    clinicalEffect: "Penurunan bioavailabilitas dan efikasi bakterisidal kedua antibiotik.",
    recommendation: "KONTRAINDIKASI SEJALUR: Berikan pada waktu terpisah dan bilas kateter dengan minimal 20 mL NS."
  },
  {
    drugAId: "iv-co-amoxiclav",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi midazolam bebas akibat pH basa co-amoxiclav (pH 8.5 vs pH 3.3).",
    clinicalEffect: "Presipitasi putih keruh instan.",
    recommendation: "KONTRAINDIKASI MUTLAK SEJALUR."
  },
  {
    drugAId: "iv-co-amoxiclav",
    drugBId: "iv-ciprofloxacin",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi asam-basa.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  // Hydrocortisone Pairs
  {
    drugAId: "iv-hydrocortisone",
    drugBId: "iv-midazolam",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi fisikokimia.",
    clinicalEffect: "Presipitasi partikulat mikro.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-hydrocortisone",
    drugBId: "iv-ciprofloxacin",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Presipitasi kristal ciprofloxacin.",
    clinicalEffect: "Kekeruhan larutan.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-hydrocortisone",
    drugBId: "iv-norepinephrine",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel pada pelarut infus standar.",
    clinicalEffect: "Kombinasi standar syok septik refrakter vasopresor.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  },
  // Naloxone Pairs
  {
    drugAId: "iv-naloxone",
    drugBId: "iv-sodium-bicarbonate",
    status: "incompatible",
    evidence: "Trissel's 2024",
    mechanism: "Inaktivasi dan penurunan potensi naloxone dalam larutan alkali.",
    clinicalEffect: "Kegagalan reversal overdosis opioid.",
    recommendation: "KONTRAINDIKASI SEJALUR."
  },
  {
    drugAId: "iv-naloxone",
    drugBId: "iv-midazolam",
    status: "compatible",
    evidence: "Trissel's 2024",
    mechanism: "Kompatibel pada pelarut NS/D5W.",
    clinicalEffect: "Larutan jernih.",
    recommendation: "KOMPATIBEL: Aman co-infus via Y-site."
  }
];

/**
 * Evaluates pairwise Y-Site compatibility between two IV drugs
 */
export function checkYSiteCompatibility(drugAId: string, drugBId: string): YSiteCompatibilityPair {
  const match = Y_SITE_COMPATIBILITY_MATRIX.find(
    p => (p.drugAId === drugAId && p.drugBId === drugBId) || (p.drugAId === drugBId && p.drugBId === drugAId)
  );

  if (match) return match;

  const drugA = IV_DRUGS_DATABASE.find(d => d.id === drugAId);
  const drugB = IV_DRUGS_DATABASE.find(d => d.id === drugBId);

  // Check if both exist
  if (!drugA || !drugB) {
    return {
      drugAId,
      drugBId,
      status: 'no_data',
      evidence: 'Clinical Study',
      recommendation: 'Data obat tidak ditemukan di database.'
    };
  }

  // Same drug
  if (drugAId === drugBId) {
    return {
      drugAId,
      drugBId,
      status: 'compatible',
      evidence: 'Trissel\'s 2024',
      recommendation: 'Obat yang sama kompatibel dengan dirinya sendiri.'
    };
  }

  // Predictive heuristic based on extreme pH differences
  const isAExtremeAcid = drugA.phRange.includes('3.') || drugA.phRange.includes('2.');
  const isBExtremeBase = drugB.phRange.includes('9.') || drugB.phRange.includes('8.');
  const isBExtremeAcid = drugB.phRange.includes('3.') || drugB.phRange.includes('2.');
  const isAExtremeBase = drugA.phRange.includes('9.') || drugA.phRange.includes('8.');

  if ((isAExtremeAcid && isBExtremeBase) || (isAExtremeBase && isBExtremeAcid)) {
    return {
      drugAId,
      drugBId,
      status: 'conditional',
      evidence: 'Clinical Study',
      mechanism: `Perbedaan pH ekstrem (${drugA.name}: pH ${drugA.phRange} vs ${drugB.name}: pH ${drugB.phRange}) berisiko memicu presipitasi garam tidak larut.`,
      clinicalEffect: 'Potensi presipitasi asam-basa tergantung konsentrasi dan waktu kontak.',
      recommendation: 'WASPADA: Lakukan pembilasan kateter dengan minimal 15-20 mL NaCl 0.9% di antara pemberian atau gunakan jalur infus terpisah.'
    };
  }

  return {
    drugAId,
    drugBId,
    status: 'no_data',
    evidence: 'Clinical Study',
    recommendation: 'Belum ada data uji kompatibilitas langsung di Trissel\'s 2024. Disarankan membilas kateter dengan 10-20 mL NS sebelum dan sesudah pemberian (*flush technique*).'
  };
}

/**
 * Calculates Syringe Pump Infusion Rate (mL/hr)
 * Rate (mL/hr) = [Dose (mcg/kg/min) * Weight (kg) * 60 min/hr] / [Concentration (mcg/mL)]
 */
export function calculateSyringePumpRate(
  doseMcgPerKgPerMin: number,
  patientWeightKg: number,
  totalDrugMgInSyringe: number,
  totalSyringeVolumeMl: number
): {
  rateMlPerHour: number;
  concentrationMcgPerMl: number;
  totalDoseMgPerHour: number;
  syringeDurationHours: number;
} {
  const totalDrugMcgInSyringe = totalDrugMgInSyringe * 1000;
  const concentrationMcgPerMl = totalDrugMcgInSyringe / totalSyringeVolumeMl;

  const mcgPerHour = doseMcgPerKgPerMin * patientWeightKg * 60;
  const rateMlPerHour = mcgPerHour / concentrationMcgPerMl;
  const totalDoseMgPerHour = mcgPerHour / 1000;
  const syringeDurationHours = totalSyringeVolumeMl / (rateMlPerHour || 1);

  return {
    rateMlPerHour: Math.round(rateMlPerHour * 100) / 100,
    concentrationMcgPerMl: Math.round(concentrationMcgPerMl * 10) / 10,
    totalDoseMgPerHour: Math.round(totalDoseMgPerHour * 100) / 100,
    syringeDurationHours: Math.round(syringeDurationHours * 10) / 10
  };
}

/**
 * Calculates Gravity IV Drip Rate (drops/min)
 * Drip Rate (gtt/min) = [Volume (mL) * Drop Factor (gtt/mL)] / [Duration (minutes)]
 */
export function calculateGravityDripRate(
  totalVolumeMl: number,
  durationHours: number,
  dropFactor: 20 | 15 | 60 = 20
): {
  dripRateGttPerMin: number;
  rateMlPerHour: number;
} {
  const durationMinutes = durationHours * 60;
  const dripRateGttPerMin = (totalVolumeMl * dropFactor) / durationMinutes;
  const rateMlPerHour = totalVolumeMl / durationHours;

  return {
    dripRateGttPerMin: Math.round(dripRateGttPerMin),
    rateMlPerHour: Math.round(rateMlPerHour * 10) / 10
  };
}
