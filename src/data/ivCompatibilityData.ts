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
