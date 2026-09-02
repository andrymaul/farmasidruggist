export type FdaPregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X';
export type HalesLactationRating = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export interface PregnancyLactationDrug {
  id: string;
  name: string;
  genericName: string;
  category: string;
  brandNames?: string[];
  fdaCategory: FdaPregnancyCategory;
  pllrSummary: string;
  trimesterRisks: {
    trimester1: string;
    trimester2: string;
    trimester3: string;
  };
  halesLactationRating: HalesLactationRating;
  relativeInfantDosePercent: number | string; // RID % (<10% is considered compatible)
  breastfeedingSummary: string;
  teratogenicAlert: string | null;
  isContraindicatedInPregnancy: boolean;
  isContraindicatedInLactation: boolean;
  safeAlternatives: string[];
  clinicalRecommendations: string;
  references: string;
}

export interface SafePregnancyConditionGuide {
  id: string;
  conditionName: string;
  category: string;
  firstLineSafeDrugs: {
    drugName: string;
    fdaCategory: string;
    dosageNote: string;
    safetyProfile: string;
  }[];
  secondLineAlternativeDrugs: {
    drugName: string;
    fdaCategory: string;
    dosageNote: string;
    safetyProfile: string;
  }[];
  strictlyContraindicatedDrugs: {
    drugName: string;
    riskReason: string;
  }[];
  clinicalPearls: string[];
}

export const PREGNANCY_LACTATION_DATABASE: PregnancyLactationDrug[] = [
  // =========================================================================
  // 1. KARDIOVASKULAR & ANTIHIPERTENSI
  // =========================================================================
  {
    id: 'preg-methyldopa',
    name: 'Methyldopa',
    genericName: 'Methyldopa',
    category: 'Kardiovaskular (Antihipertensi Sentral)',
    brandNames: ['Dopamet', 'Methyldopa Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Obat pilihan lini pertama (first-line) untuk hipertensi kronis dan hipertensi gestasional pada kehamilan dengan rekam jejak keamanan klinis terlama.',
    trimesterRisks: {
      trimester1: 'Aman, tidak ditemukan peningkatan risiko malformasi kongenital pada studi kohort prospektif.',
      trimester2: 'Aman, mempertahankan aliran darah dan perfusi uteroplasenta secara adekuat.',
      trimester3: 'Aman, dapat digunakan hingga persalinan tanpa efek merugikan pada neonatus.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.5,
    breastfeedingSummary: 'Terekskresi dalam ASI dalam jumlah sangat minimal (<2% RID). Sangat kompatibel dengan menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Labetalol', 'Nifedipine (Extended Release)'],
    clinicalRecommendations: 'Pilihan utama terapi hipertensi pada kehamilan. Dosis lazim 250-500 mg 2-3 kali sehari (Maksimal 2-3 g/hari). Pantau potensi efek sedasi dan fungsi hepar.',
    references: 'POGI 2023 & ACOG Practice Bulletin No. 222 (Gestational Hypertension and Preeclampsia)'
  },
  {
    id: 'preg-nifedipine',
    name: 'Nifedipine',
    genericName: 'Nifedipine (Extended Release)',
    category: 'Kardiovaskular (Calcium Channel Blocker)',
    brandNames: ['Adalat OROS', 'Nifecard', 'Cordalat'],
    fdaCategory: 'C',
    pllrSummary: 'Calcium Channel Blocker (CCB) dihidropiridin yang sangat efektif sebagai antihipertensi lini pertama dan agen tokolitik (penunda persalinan prematur).',
    trimesterRisks: {
      trimester1: 'Data manusia menunjukkan tidak ada peningkatan risiko teratogenisitas mayor.',
      trimester2: 'Aman dan efektif mengontrol tekanan darah maternal.',
      trimester3: 'Aman. Bermanfaat sebagai tokolitik penekan kontraksi uterus prematur.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 2.3,
    breastfeedingSummary: 'Ekskresi ke ASI sangat rendah. Tidak ada efek samping buruk dilaporkan pada bayi menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Labetalol'],
    clinicalRecommendations: 'Gunakan sediaan lepas lambat (Adalat OROS 30-60 mg/hari). HINDARI sediaan sublingual short-acting karena memicu hipotensi mendadak dan hipoksia janin.',
    references: 'Briggs Drugs in Pregnancy and Lactation & Konsensus PERKI/POGI Hipertensi Kehamilan'
  },
  {
    id: 'preg-labetalol',
    name: 'Labetalol',
    genericName: 'Labetalol Hydrochloride',
    category: 'Kardiovaskular (Alfa & Beta Blocker)',
    brandNames: ['Trandate', 'Labetalol Generik'],
    fdaCategory: 'C',
    pllrSummary: 'Pilihan lini pertama antihipertensi kehamilan standar internasional (ACOG/NICE). Menurunkan resistensi perifer tanpa menurunkan curah jantung atau aliran darah plasenta.',
    trimesterRisks: {
      trimester1: 'Tidak ditemukan bukti peningkatan malformasi kongenital mayor.',
      trimester2: 'Aman, efektif mengontrol tekanan darah dan mencegah krisis hipertensi.',
      trimester3: 'Aman. Pantau neonatus 48 jam pasca lahir terhadap potensi bradikardia transien atau hipoglikemia.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.8,
    breastfeedingSummary: 'Kadar dalam ASI sangat rendah (<1% RID). Pilihan beta-blocker paling aman saat menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Nifedipine ER'],
    clinicalRecommendations: 'Dosis oral: 100-400 mg 2 kali sehari. Pada krisis hipertensi preeklampsia di IGD, berikan secara bolus IV bertahap 20 mg, 40 mg, lalu 80 mg.',
    references: 'ACOG Practice Bulletin No. 222 & NICE Clinical Guideline [NG133]'
  },
  {
    id: 'preg-captopril',
    name: 'Captopril',
    genericName: 'Captopril',
    category: 'Kardiovaskular (ACE Inhibitor)',
    brandNames: ['Capoten', 'Captopril Generik', 'Tensobon'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Trimester 2 & 3 Kehamilan. Menyebabkan fetotoksisitas berat, oligohidramnion, anuria/gagal ginjal janin, hipoplasia paru, dan kematian perinatal.',
    trimesterRisks: {
      trimester1: 'Kategori C/D: Potensi peningkatan risiko defek kardiovaskular dan susunan saraf pusat.',
      trimester2: 'KATEGORI D: Menyebabkan oligohidramnion berat, hipoplasia paru janin, gagal ginjal janin anuria.',
      trimester3: 'KATEGORI D: Menyebabkan gagal ginjal neonatal persisten, deformitas kraniofasial, kontraktur sendi, kematian intrauterin.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.03,
    breastfeedingSummary: 'Ekskresi ke ASI sangat rendah (<0.1% RID). Kompatibel dan aman untuk ibu menyusui (pasca salin).',
    teratogenicAlert: 'Fetopati ACE-Inhibitor: Oligohidramnion berat, gagal ginjal neonatal anuria, hipoplasia tengkorak/tulang kranium, hipoplasia paru, IUGR.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Labetalol', 'Nifedipine ER'],
    clinicalRecommendations: 'SEGERA HENTIKAN jika pasien terkonfirmasi hamil. Ganti segera ke Methyldopa atau Nifedipine lepas lambat.',
    references: 'FDA Black Box Warning on ACE Inhibitors in Pregnancy & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-losartan',
    name: 'Losartan',
    genericName: 'Losartan Potassium',
    category: 'Kardiovaskular (Angiotensin Receptor Blocker)',
    brandNames: ['Cozaar', 'Acetensa', 'Insaar'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Trimester 2 & 3 Kehamilan. Menghambat sistem renin-angiotensin janin dan memicu kematian janin serta oligohidramnion.',
    trimesterRisks: {
      trimester1: 'Kategori C: Risiko malformasi kongenital organogenesis.',
      trimester2: 'KATEGORI D: Oligohidramnion berat, disgenesis tubulus ginjal janin.',
      trimester3: 'KATEGORI D: Gagal ginjal janin, hipoplasia kranium, kematian perinatal.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 1.8,
    breastfeedingSummary: 'Data terbatas pada laktasi. Pilih Enalapril atau Captopril jika membutuhkan antihipertensi pasca melahirkan.',
    teratogenicAlert: 'Sindrom Fetopati ARB: Gagal ginjal janin, anuria, oligohidramnion, hipoplasia paru-paru janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Labetalol', 'Nifedipine ER'],
    clinicalRecommendations: 'Hentikan segera pada wanita usia subur yang merencanakan kehamilan atau terkonfirmasi positif hamil.',
    references: 'FDA Boxed Warning on ARBs in Pregnancy & Briggs'
  },
  {
    id: 'preg-spironolactone',
    name: 'Spironolactone',
    genericName: 'Spironolactone',
    category: 'Kardiovaskular (Antagonis Aldosteron)',
    brandNames: ['Aldactone', 'Spirolacton', 'Carpiaton'],
    fdaCategory: 'C',
    pllrSummary: 'Memiliki efek antiandrogenik potensial yang dapat menyebabkan feminisasi genitalia eksterna pada janin laki-laki.',
    trimesterRisks: {
      trimester1: 'Risiko feminisasi janin laki-laki (hipospadia, ambiguitas genital) akibat blokade reseptor androgen.',
      trimester2: 'Risiko gangguan endokrin janin dan penurunan perfusi plasenta.',
      trimester3: 'Dapat mengganggu elektrolit janin dan menekan volume cairan amnion.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.7,
    breastfeedingSummary: 'Metabolit aktif canrenone diekskresikan dalam ASI dalam jumlah sangat kecil. Kompatibel dengan menyusui pasca melahirkan.',
    teratogenicAlert: 'Feminisasi fetus laki-laki (hipospadia, mikropenis).',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Nifedipine ER', 'Labetalol'],
    clinicalRecommendations: 'Hindari pada kehamilan kecuali pada kondisi sindrom Bartter/Gitelman yang sangat refrakter.',
    references: 'Briggs Drugs in Pregnancy and Lactation & LactMed'
  },
  {
    id: 'preg-simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    category: 'Kardiovaskular (Inhibitor HMG-CoA Reduktase / Statin)',
    brandNames: ['Zocor', 'Simvastatin Generik', 'Vytorin'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI PADA KEHAMILAN. Kolesterol dan produk biosintesis jalur mevalonat sangat esensial untuk perkembangan membran sel janin dan organogenesis otak.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Potensi defek kongenital VACTERL (vertebra, anus, jantung, trakea, esofagus, ginjal, tungkai).',
      trimester2: 'KATEGORI X: Gangguan sintesis steroid janin dan myelinisasi saraf pusat.',
      trimester3: 'KATEGORI X: Gangguan pertumbuhan janin intrauterin (IUGR).'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Potensial Berbahaya',
    breastfeedingSummary: 'Dapat mengganggu metabolisme lipid esensial bayi menyusui. HINDARI saat menyusui.',
    teratogenicAlert: 'Sindrom VACTERL & Malformasi SSP janin akibat deplesi kolesterol embrionik.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Diet rendah lemak', 'Bile Acid Sequestrant (Cholestyramine) jika hiperlipidemia familial berat'],
    clinicalRecommendations: 'Hentikan statin minimal 1-2 bulan sebelum merencanakan konsepsi. Hiperlipidemia maternal sementara selama 9 bulan kehamilan bersifat fisiologis.',
    references: 'FDA Drug Safety Communication on Statins & Briggs'
  },

  // =========================================================================
  // 2. ANTITROMBOTIK & ANTIKOAGULAN
  // =========================================================================
  {
    id: 'preg-enoxaparin',
    name: 'Enoxaparin (LMWH)',
    genericName: 'Enoxaparin Sodium',
    category: 'Hematologi (Low Molecular Weight Heparin / LMWH)',
    brandNames: ['Lovenox', 'Inviclot LMWH'],
    fdaCategory: 'B',
    pllrSummary: 'ANTIKOAGULAN PILIHAN UTAMA (GOLD STANDARD) pada kehamilan dan menyusui. Molekul berukuran besar tidak dapat menembus barier plasenta dan tidak masuk ke ASI.',
    trimesterRisks: {
      trimester1: 'Aman, tidak menembus plasenta, tidak ada risiko teratogenik.',
      trimester2: 'Aman, pilihan lini 1 untuk trombofilia maternal, DVT, atau katup jantung mekanik.',
      trimester3: 'Aman. Hentikan 12-24 jam sebelum rencana persalinan/anestesi epidural untuk mencegah hematoma spinal.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'Tidak diserap secara oral oleh saluran cerna bayi karena berat molekul tinggi. 100% aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Heparin Tak Terfraksi (UFH)'],
    clinicalRecommendations: 'Dosis profilaksis: 20-40 mg SC sekali sehari. Dosis terapeutik DVT/PE: 1 mg/kg SC tiap 12 jam. Tidak memerlukan pemantauan rutin aPTT kecuali anti-Xa pada kasus khusus.',
    references: 'ASH Guideline on VTE in Pregnancy & ACOG Practice Bulletin No. 196'
  },
  {
    id: 'preg-warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin Sodium',
    category: 'Hematologi (Antagonis Vitamin K)',
    brandNames: ['Coumadin', 'Simarc-2'],
    fdaCategory: 'X',
    pllrSummary: 'TERATOGENIK KUAT (Kategori X). Menembus plasenta dengan bebas dan menyebabkan Fetal Warfarin Syndrome serta perdarahan intrakranial janin fatal.',
    trimesterRisks: {
      trimester1: 'KATEGORI X (Minggu 6-12): Warfarin Embryopathy (hipoplasia nasal berat, stippled epiphyses, agenesis korpus kalosum).',
      trimester2: 'KATEGORI D/X: Mikrosefali, hidrosefalus, atrofi optik, kebutaan, retardasi mental.',
      trimester3: 'KATEGORI X: Perdarahan intrakranial janin masif saat persalinan dan kematian perinatal.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'Berikatan protein 99% dan tidak diekskresikan dalam ASI dalam jumlah aktif. AMAN untuk ibu menyusui pasca persalinan.',
    teratogenicAlert: 'Fetal Warfarin Syndrome (Kondrodisplasia punctata, hidung pelana hipoplastik, mikrosefali, atrofi optik, kebutaan, retardasi mental berat).',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['LMWH (Enoxaparin)', 'Heparin UFH'],
    clinicalRecommendations: 'Ganti segera ke Enoxaparin (LMWH) sebelum minggu ke-6 kehamilan. Pengecualian khusus hanya pada wanita dengan katup jantung mekanik risiko sangat tinggi (dosis <5 mg/hari).',
    references: 'ACC/AHA Guidelines for the Management of Patients With Valvular Heart Disease & Briggs'
  },
  {
    id: 'preg-aspirin-low-dose',
    name: 'Aspirin (Dosis Rendah / 80-150 mg)',
    genericName: 'Acetylsalicylic Acid (Low Dose)',
    category: 'Hematologi (Antiplatelet / Prevensi Preeklampsia)',
    brandNames: ['Aspilets', 'Miniaspi', 'Thrombo Aspilets'],
    fdaCategory: 'C',
    pllrSummary: 'STANDAR EMAS PENCEGAHAN PREEKLAMPSIA pada ibu hamil risiko tinggi. Dosis rendah (80-150 mg) aman dan tidak menyebabkan penutupan dini duktus arteriosus.',
    trimesterRisks: {
      trimester1: 'Aman jika dimulai pada akhir trimester 1 (minggu ke-12) untuk prevensi preeklampsia.',
      trimester2: 'Aman, meningkatkan perfusi arteri uterina dan mencegah vasospasme plasenta.',
      trimester3: 'Aman pada dosis rendah. Hentikan pada minggu ke-36 kehamilan menjelang persalinan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 2.5,
    breastfeedingSummary: 'Dosis rendah (<150 mg/hari) aman untuk ibu menyusui. Hindari aspirin dosis analgesik tinggi (>1000 mg/hari) karena risiko Sindrom Reye.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Diberikan khusus untuk indikasi prevensi preeklampsia'],
    clinicalRecommendations: 'POGI 2023 & USPSTF: Berikan 80-150 mg malam hari dimulai usia kehamilan 12-16 minggu hingga minggu ke-36 pada ibu dengan faktor risiko preeklampsia tinggi/sedang.',
    references: 'POGI Panduan Preeklampsia 2023 & USPSTF Aspirin for Preeclampsia Prevention'
  },

  // =========================================================================
  // 3. ANALGESIK, ANTIPIRETIK & NSAID
  // =========================================================================
  {
    id: 'preg-paracetamol',
    name: 'Paracetamol',
    genericName: 'Paracetamol / Acetaminophen',
    category: 'Analgesik & Antipiretik',
    brandNames: ['Panadol', 'Sanmol', 'Pamol', 'Dumin'],
    fdaCategory: 'B',
    pllrSummary: 'ANALGESIK & ANTIPIRETIK PILIHAN PERTAMA (LINI 1) TERAMAN di seluruh trimester kehamilan dan selama masa menyusui.',
    trimesterRisks: {
      trimester1: 'Aman, tidak teratogenik pada dosis terapi.',
      trimester2: 'Aman, pilihan utama untuk sakit kepala, nyeri gigi, dan demam.',
      trimester3: 'Aman, tidak mempengaruhi duktus arteriosus atau kontraksi persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 1.8,
    breastfeedingSummary: 'Kadar dalam ASI sangat minimal (<2% RID). Pilihan analgesik nomor 1 untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol adalah pilihan lini 1'],
    clinicalRecommendations: 'Gunakan dosis efektif terendah (500-1000 mg tiap 6-8 jam bila perlu, maksimal 3-4 g/hari). Mengobati demam tinggi pada trimester 1 sangat penting untuk mencegah neural tube defect akibat hipertermia maternal.',
    references: 'ACOG Practice Advisory on Acetaminophen & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'Analgesik (Antiinflamasi Non-Steroid / NSAID)',
    brandNames: ['Proris', 'Brufen', 'Ibuprofen Generik'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada usia kehamilan >= 20 MINGGU (Trimester 2 akhir & Trimester 3). Menyebabkan penutupan dini duktus arteriosus janin dan oligohidramnion nefrotoksik.',
    trimesterRisks: {
      trimester1: 'Kategori B/C: Beberapa studi mengindikasikan potensi peningkatan risiko keguguran dan defek septum ventrikel.',
      trimester2: 'KATEGORI D (>=20 minggu): Menyebabkan disfungsi ginjal janin yang memicu oligohidramnion (penurunan cairan ketuban).',
      trimester3: 'KATEGORI D (>=28 minggu): KONTRAINDIKASI MUTLAK. Penutupan dini duktus arteriosus botalli janin, hipertensi pulmonal persisten pada neonatus (PPHN), serta penundaan persalinan dan perdarahan postpartum.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.6,
    breastfeedingSummary: 'Ekskresi ke ASI sangat rendah (<1% RID). Merupakan NSAID PILIHAN UTAMA untuk ibu menyusui pasca salin.',
    teratogenicAlert: 'Penutupan dini duktus arteriosus janin intrauterin, hipertensi pulmonal persisten neonatus (PPHN), dan oligohidramnion berat.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol (seluruh trimester)'],
    clinicalRecommendations: 'Hindari penggunaan seluruh NSAID sejak usia kehamilan 20 minggu ke atas (FDA Drug Safety Warning 2020).',
    references: 'FDA Drug Safety Warning on NSAIDs in Pregnancy & Briggs'
  },
  {
    id: 'preg-mefenamic-acid',
    name: 'Asam Mefenamat',
    genericName: 'Mefenamic Acid',
    category: 'Analgesik (Antiinflamasi Non-Steroid / NSAID)',
    brandNames: ['Ponstan', 'Mefinal', 'Asmef Generik'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada usia kehamilan >= 20 minggu. Efek samping identik dengan ibuprofen pada duktus arteriosus dan fungsi ginjal janin.',
    trimesterRisks: {
      trimester1: 'Hindari penggunaan rutin.',
      trimester2: 'Kategori D (>=20 minggu): Risiko oligohidramnion dan gagal ginjal janin.',
      trimester3: 'Kategori D: Penutupan prematur duktus arteriosus janin dan komplikasi perdarahan perinatal.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.2,
    breastfeedingSummary: 'Terekskresi dalam ASI dalam jumlah kecil. Dapat digunakan jangka pendek pasca salin, namun Ibuprofen lebih disukai.',
    teratogenicAlert: 'Penutupan prematur duktus arteriosus dan oligohidramnion.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol'],
    clinicalRecommendations: 'Ganti ke Paracetamol untuk sakit kepala atau nyeri gigi pada ibu hamil.',
    references: 'FDA Drug Safety Communication & Briggs Drugs in Pregnancy'
  },

  // =========================================================================
  // 4. ANTIBIOTIK & ANTIMIKROBA
  // =========================================================================
  {
    id: 'preg-amoxicillin-clavulanate',
    name: 'Amoxicillin-Clavulanate',
    genericName: 'Amoxicillin + Clavulanic Acid',
    category: 'Anti-infeksi (Penisilin Spektrum Luas)',
    brandNames: ['Augmentin', 'Clavamox', 'Amoxiclav'],
    fdaCategory: 'B',
    pllrSummary: 'Antibiotik lini pertama yang aman dan sangat efektif untuk infeksi bakteri saluran kemih (ISK), sinusitis, dan ISPA pada kehamilan.',
    trimesterRisks: {
      trimester1: 'Aman, tidak ditemukan peningkatan malformasi kongenital.',
      trimester2: 'Aman dan efektif.',
      trimester3: 'Aman. Hindari penggunaan profilaksis rutin pada Ketuban Pecah Dini (KPD) preterm karena potensi peningkatan risiko Necrotizing Enterocolitis (NEC) neonatal.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 1.0,
    breastfeedingSummary: 'Ekskresi ke ASI minimal. Kompatibel dengan menyusui (pantau potensi diare ringan pada bayi).',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cephalexin', 'Cefixime', 'Erythromycin (bila alergi penisilin)'],
    clinicalRecommendations: 'Dosis lazim: 625 mg (500/125) tiap 8 jam atau 1000 mg (875/125) tiap 12 jam selama 5-7 hari.',
    references: 'ACOG Practice Bulletin on Antimicrobial Therapy in Pregnancy & Briggs'
  },
  {
    id: 'preg-cefixime',
    name: 'Cefixime',
    genericName: 'Cefixime Trihydrate',
    category: 'Anti-infeksi (Sefalosporin Generasi ke-3)',
    brandNames: ['Cefspan', 'Fixacep', 'Cefixime Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Pilihan utama (first-line) terapi oral untuk Bakteriuria Asimtomatik dan Infeksi Saluran Kemih (ISK) akut pada ibu hamil.',
    trimesterRisks: {
      trimester1: 'Aman, rekam jejak keamanan luas tanpa efek teratogenik.',
      trimester2: 'Aman dan sangat efektif membasmi E. coli resisten.',
      trimester3: 'Aman hingga persalinan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.4,
    breastfeedingSummary: 'Konsentrasi dalam ASI sangat rendah. Sangat aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Amoxicillin-Clavulanate', 'Fosfomycin'],
    clinicalRecommendations: 'Dosis: 100-200 mg 2 kali sehari selama 5-7 hari. Bakteriuria asimtomatik pada ibu hamil WAJIB diobati tuntas untuk mencegah Pielonefritis.',
    references: 'POGI ISK Panduan 2023 & IDSA Guidelines'
  },
  {
    id: 'preg-doxycycline',
    name: 'Doxycycline',
    genericName: 'Doxycycline Hyclate',
    category: 'Anti-infeksi (Tetrasiklin)',
    brandNames: ['Vibramycin', 'Dohixat', 'Doxycycline Generik'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Trimester 2 & 3 Kehamilan. Berikatan dengan kalsium pada jaringan tulang dan gigi janin yang sedang berkembang.',
    trimesterRisks: {
      trimester1: 'Kategori D: Potensi efek pada tulang; penggunaan jangka pendek darurat (misal scrub typhus) dapat dipertimbangkan jika tidak ada alternatif.',
      trimester2: 'KATEGORI D (>16 minggu): Diskolorasi permanen gigi sulung dan permanen janin (kuning-abu-coklat) dan hipoplasia enamel gigi.',
      trimester3: 'KATEGORI D: Hambatan pertumbuhan tulang panjang janin dan pewarnaan gigi permanen.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 4.5,
    breastfeedingSummary: 'Penggunaan jangka pendek (<=14 hari) kompatibel karena kalsium dalam ASI mengikat doksisiklin dan menghambat absorpsi bayi. Hindari penggunaan kronis.',
    teratogenicAlert: 'Diskolorasi permanen gigi janin (Yellow-Brown Tooth Staining) dan Hipoplasia Enamel Gigi.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Azithromycin', 'Amoxicillin', 'Erythromycin'],
    clinicalRecommendations: 'Ganti segera ke Azithromycin atau Sefalosporin pada wanita hamil.',
    references: 'FDA Drug Safety Warning & AAP Committee on Drugs'
  },
  {
    id: 'preg-ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin Hydrochloride',
    category: 'Anti-infeksi (Fluoroquinolone)',
    brandNames: ['Ciproxin', 'Baquinor', 'Ciprofloxacin Generik'],
    fdaCategory: 'C',
    pllrSummary: 'Hindari penggunaan lini pertama pada kehamilan karena potensi toksisitas kartilago dan artropati sendi janin pada studi hewan primata.',
    trimesterRisks: {
      trimester1: 'Hindari; studi hewan menunjukkan artropati kartilago sendi penopang berat badan.',
      trimester2: 'Gunakan hanya jika tidak ada alternatif antibiotik lain yang sensitif.',
      trimester3: 'Hindari penggunaan rutin.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 3.5,
    breastfeedingSummary: 'Terekskresi dalam ASI. Lebih disukai antibiotik alternatif (seperti Sefalosporin) saat menyusui.',
    teratogenicAlert: 'Artropati tulang rawan sendi dan erosi kartilago (data hewan).',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cefixime', 'Ceftriaxone', 'Amoxicillin-Clavulanate', 'Fosfomycin'],
    clinicalRecommendations: 'Batasi hanya untuk infeksi resisten berat yang tidak respons terhadap beta-laktam.',
    references: 'Briggs Drugs in Pregnancy and Lactation & LactMed'
  },
  {
    id: 'preg-cotrimoxazole',
    name: 'Cotrimoxazole',
    genericName: 'Sulfamethoxazole + Trimethoprim',
    category: 'Anti-infeksi (Sulfonamida & Antifolat)',
    brandNames: ['Bactrim', 'Sanprima', 'Cotrimoxazole Generik'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Trimester 1 (antagonis asam folat) dan Trimester 3 Aterm (risiko Kernikterus otak janin).',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Trimethoprim adalah inhibitor folat yang melipatgandakan risiko Neural Tube Defects (Spina Bifida), celah bibir, dan defek kardiovaskular.',
      trimester2: 'Kategori C: Dapat digunakan hati-hati dengan suplementasi asam folat dosis tinggi jika mutlak diperlukan.',
      trimester3: 'KATEGORI D (Aterm / Menjelang Persalinan): Sulfamethoxazole mendesak ikatan bilirubin pada albumin neonatal, memicu KERNEKTERUS OTAK FATAL dan hiperbilirubinemia berat.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 4.0,
    breastfeedingSummary: 'Kompatibel pada bayi sehat aterm usia >2 bulan. KONTRAINDIKASI pada bayi prematur, hiperbilirubinemia, atau defisiensi enzim G6PD (memicu hemolisis).',
    teratogenicAlert: 'Neural Tube Defects (Spina Bifida) pada Trimester 1; Kernikterus Ensefalopati Bilirubin pada Trimester 3 akhir.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cefixime', 'Amoxicillin-Clavulanate', 'Nitrofurantoin (Trimester 2)'],
    clinicalRecommendations: 'Hindari pada trimester 1 dan minggu ke-32 ke atas.',
    references: 'ACOG Practice Bulletin & CDC Guidelines on Antibiotics in Pregnancy'
  },

  // =========================================================================
  // 5. GASTROINTESTINAL, MUAL & MUNTAH
  // =========================================================================
  {
    id: 'preg-pyridoxine',
    name: 'Vitamin B6 (Pyridoxine)',
    genericName: 'Pyridoxine Hydrochloride',
    category: 'Vitamin & Antiemetik Maternal',
    brandNames: ['Vitamin B6 Generik', 'Anvomer B6', 'Premesis'],
    fdaCategory: 'A',
    pllrSummary: 'TERAPI LINI PERTAMA (GOLD STANDARD) Kategori A FDA untuk Mual Muntah Kehamilan (Nausea & Vomiting of Pregnancy / Morning Sickness).',
    trimesterRisks: {
      trimester1: 'Aman, kategori A FDA, sangat terbukti mengurangi mual tanpa risiko teratogenik.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 1.0,
    breastfeedingSummary: 'Vitamin esensial normal dalam ASI. Sangat aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Pilihan lini pertama'],
    clinicalRecommendations: 'ACOG & POGI: Berikan 10-25 mg per oral 3-4 kali sehari. Dapat dikombinasikan dengan Doxylamine 10-12.5 mg malam hari untuk efikasi maksimal.',
    references: 'ACOG Practice Bulletin No. 189 (Nausea and Vomiting of Pregnancy)'
  },
  {
    id: 'preg-ondansetron',
    name: 'Ondansetron',
    genericName: 'Ondansetron Hydrochloride',
    category: 'Gastrointestinal (Antagonis Reseptor 5-HT3)',
    brandNames: ['Zofran', 'Narfoz', 'Ondansetron Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Pilihan kedua untuk Hiperemesis Gravidarum berat yang refrakter terhadap vitamin B6 dan antihistamin. Paling aman diberikan pasca minggu ke-10 kehamilan.',
    trimesterRisks: {
      trimester1: 'Kategori B/C: Studi kohort besar menunjukkan risiko absolut celah bibir/langit-langit (cleft palate) sangat kecil (~3 per 10.000 kehamilan). Utamakan inisiasi pasca minggu ke-10.',
      trimester2: 'Aman dan sangat efektif mengatasi muntah hebat dan dehidrasi.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 2.0,
    breastfeedingSummary: 'Ekskresi ke ASI rendah. Kompatibel dengan menyusui.',
    teratogenicAlert: 'Potensi risiko minimal celah bibir/langit-langit bila diberikan sebelum usia kehamilan 10 minggu.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Vitamin B6 (Pyridoxine)', 'Doxylamine', 'Metoclopramide'],
    clinicalRecommendations: 'Dosis: 4-8 mg oral/IV tiap 8 jam untuk Hiperemesis Gravidarum yang tidak membaik dengan terapi lini pertama.',
    references: 'ACOG Practice Bulletin No. 189 & UpToDate Management of Nausea and Vomiting of Pregnancy'
  },
  {
    id: 'preg-misoprostol',
    name: 'Misoprostol',
    genericName: 'Misoprostol',
    category: 'Gastrointestinal & Uterotonik (Analog Prostaglandin E1)',
    brandNames: ['Cytotec', 'Gastrul', 'Misotab', 'Invotec'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK SEBAGAI OBAT LAMBUNG PADA KEHAMILAN. Merupakan uterotonik kuat yang memicu kontraksi miometrium, aborsi janin, dan cacat lahir parah.',
    trimesterRisks: {
      trimester1: 'KATEGORI X EKSTREM: Abortus spontan, perdarahan masif maternal, dan Sindrom Moebius (kelumpuhan saraf kranial VI & VII janin, dismorfisme wajah, defek reduksi tungkai/jari).',
      trimester2: 'KATEGORI X: Kematian janin dan ruptur uteri.',
      trimester3: 'KATEGORI X: Ruptur uteri, asfiksia janin berat, gawat janin.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.2,
    breastfeedingSummary: 'Waktu paruh sangat singkat (<30 menit). Kompatibel jika digunakan pasca persalinan untuk penanganan perdarahan postpartum (HPP).',
    teratogenicAlert: 'Sindrom Moebius (Paralisis fasialis bilateral, strabismus, mikrotia, artrogriposis ekstremitas).',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Antasida (Al/Mg)', 'Sukralfat', 'Famotidine', 'Omeprazole'],
    clinicalRecommendations: 'JANGAN PERNAH meresepkan misoprostol untuk terapi tukak lambung/gastritis pada wanita hamil atau usia subur tanpa kontrasepsi.',
    references: 'FDA Black Box Warning on Misoprostol & WHO Medical Abortion Protocols'
  },
  {
    id: 'preg-sucralfate',
    name: 'Sukralfat',
    genericName: 'Sucralfate',
    category: 'Gastrointestinal (Mukoprotektor Lambung)',
    brandNames: ['Inpepsa', 'Ulsafate', 'Episan'],
    fdaCategory: 'B',
    pllrSummary: 'Pilihan lini pertama paling aman untuk gastritis, GERD, dan tukak lambung pada kehamilan karena bekerja lokal di mukosa lambung dan tidak diserap secara sistemik (<1-3%).',
    trimesterRisks: {
      trimester1: 'Aman, absorpsi sistemik minimal sehingga tidak mencapai janin.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'Tidak masuk ke ASI dalam jumlah bermakna. Sangat aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Antasida (Aluminium & Magnesium Hidroksida)'],
    clinicalRecommendations: 'Dosis: 1 gram (suspensi) 3-4 kali sehari saat perut kosong (1 jam sebelum makan atau 2 jam sesudah makan).',
    references: 'ACG Guidelines for the Management of GERD in Pregnancy & Briggs'
  },

  // =========================================================================
  // 6. ENDOKRIN, DIABETES & TIROID
  // =========================================================================
  {
    id: 'preg-insulin-human',
    name: 'Insulin Human / Analog (Aspart, Lispro, Detemir)',
    genericName: 'Insulin Human / Insulin Aspart / Insulin Lispro / Insulin Detemir',
    category: 'Endokrin (Antidiabetes Hormonal)',
    brandNames: ['Actrapid', 'Novorapid', 'Humalog', 'Levemir', 'Lantus'],
    fdaCategory: 'B',
    pllrSummary: 'STANDAR EMAS NOMOR 1 DI SELURUH DUNIA untuk Diabetes Melitus Gestasional (GDM) dan DM Pre-gestasional. Molekul protein besar yang 100% TIDAK MENEMBUS PLASENTA.',
    trimesterRisks: {
      trimester1: 'Aman, kontrol glikemik ketat mencegah malformasi jantung kongenital janin dan anomali kaudal.',
      trimester2: 'Aman, mencegah makrosomia janin (>4 kg) dan polihidramnion.',
      trimester3: 'Aman, mencegah distosia bahu saat partus dan hipoglikemia neonatal pasca lahir.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'Merupakan komponen protein alami. Molekul insulin yang masuk ke ASI akan terdegradasi di saluran cerna bayi. 100% aman untuk menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin adalah terapi standar emas lini 1'],
    clinicalRecommendations: 'Target glikemik GDM (ADA 2024 / POGI): Glukosa puasa <95 mg/dL, 1 jam postprandial <140 mg/dL, 2 jam postprandial <120 mg/dL.',
    references: 'ADA Standards of Care in Diabetes 2024 & POGI Konsensus GDM'
  },
  {
    id: 'preg-metformin',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'Endokrin (Biguanid Antidiabetes)',
    brandNames: ['Glucophage', 'Glumin', 'Metformin Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Dapat digunakan sebagai alternatif pada GDM jika pasien menolak atau kesulitan injeksi insulin, namun metformin menembus plasenta dan 30-40% pasien tetap membutuhkan insulin tambahan.',
    trimesterRisks: {
      trimester1: 'Aman pada wanita dengan Sindrom Ovarium Polikistik (PCOS) untuk mencegah abortus dini.',
      trimester2: 'Aman, membantu kontrol glikemik.',
      trimester3: 'Aman, namun efikasi lebih rendah dibanding insulin dalam mencegah komplikasi makrosomia.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.6,
    breastfeedingSummary: 'Kadar dalam ASI sangat rendah (<1% RID). Aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Human (Pilihan Lini 1)'],
    clinicalRecommendations: 'Dosis: 500-1000 mg 2 kali sehari bersama makanan. Jika target gula darah tidak tercapai dalam 1-2 minggu, tambahkan terapi insulin.',
    references: 'ADA Standards of Care in Diabetes 2024 & NICE Guideline [NG3]'
  },
  {
    id: 'preg-levothyroxine',
    name: 'Levothyroxine',
    genericName: 'Levothyroxine Sodium (T4)',
    category: 'Endokrin (Hormon Tiroid)',
    brandNames: ['Euthyrox', 'Thyrax Duotab'],
    fdaCategory: 'A',
    pllrSummary: 'KATEGORI A FDA (SANGAT AMAN & MUTLAK DIBUTUHKAN). Hormon tiroid maternal sangat krusial untuk perkembangan otak dan mielinisasi susunan saraf janin pada trimester 1.',
    trimesterRisks: {
      trimester1: 'KATEGORI A: Sangat esensial. Janin belum memiliki kelenjar tiroid mandiri dan 100% bergantung pada hormon T4 ibu.',
      trimester2: 'KATEGORI A: Mendukung perkembangan kognitif dan pertumbuhan janin.',
      trimester3: 'KATEGORI A: Menjaga metabolisme maternal-fetal normal.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'Komponen alami ASI. Wajib dilanjutkan selama menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Levothyroxine adalah terapi esensial Kategori A'],
    clinicalRecommendations: 'Kebutuhan levotiroksin MENINGKAT 30-50% segera setelah terjadi kehamilan. Lakukan skrining TSH serum setiap 4-6 minggu dengan target TSH < 2.5 mIU/L pada Trimester 1.',
    references: 'ATA (American Thyroid Association) Guidelines on Thyroid Disease in Pregnancy'
  },
  {
    id: 'preg-propylthiouracil',
    name: 'Propylthiouracil (PTU)',
    genericName: 'Propylthiouracil',
    category: 'Endokrin (Antitiroid Tionamid)',
    brandNames: ['PTU Generik', 'Propiltiourasil'],
    fdaCategory: 'D',
    pllrSummary: 'PILIHAN PERTAMA UNTUK HIPERTIROIDISME PADA TRIMESTER 1 KEHAMILAN karena transfer plasenta dan risiko teratogenik embrionik lebih rendah dibanding Methimazole.',
    trimesterRisks: {
      trimester1: 'PILIHAN UTAMA TRIMESTER 1. Risiko malformasi kongenital jauh lebih rendah dibanding Methimazole.',
      trimester2: 'Pertimbangkan beralih ke Methimazole untuk mencegah risiko hepatotoksisitas maternal berat PTU.',
      trimester3: 'Pertahankan dosis terendah yang efektif untuk mencegah hipotiroidisme janin dan goiter kongenital.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.5,
    breastfeedingSummary: 'Berikatan protein 80% dan sedikit diekskresikan dalam ASI. Aman untuk ibu menyusui pada dosis <=300 mg/hari.',
    teratogenicAlert: 'Struma / Goiter tiroid janin dan hipotiroidisme janin bila dosis berlebih.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methimazole (pada Trimester 2 & 3)'],
    clinicalRecommendations: 'Gunakan PTU pada Trimester 1, lalu beralih ke Methimazole pada Trimester 2 & 3 (ATA Guidelines). Targetkan kadar Free T4 pada batas atas rentang normal.',
    references: 'ATA Thyroid Guidelines & Endocrine Society Clinical Practice Guideline'
  },
  {
    id: 'preg-methimazole',
    name: 'Methimazole (Thiamazole)',
    genericName: 'Methimazole / Thiamazole',
    category: 'Endokrin (Antitiroid Tionamid)',
    brandNames: ['Thyrozol', 'Tapazole'],
    fdaCategory: 'D',
    pllrSummary: 'PILIHAN UTAMA PADA TRIMESTER 2 & 3 KEHAMILAN. Hindari pada Trimester 1 karena risiko Embriopati Methimazole (Aplasia Cutis Congenita & Atresia Koana).',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Methimazole Embryopathy (Aplasia Cutis / tidak terbentuknya kulit kepala, atresia esofagus/koana, dismorfisme wajah).',
      trimester2: 'PILIHAN UTAMA TRIMESTER 2 (profil keamanan hepar lebih baik dibanding PTU).',
      trimester3: 'PILIHAN UTAMA TRIMESTER 3.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 2.0,
    breastfeedingSummary: 'Aman pada dosis pemeliharaan (<=20 mg/hari). Kompatibel dengan menyusui.',
    teratogenicAlert: 'Methimazole Embryopathy: Aplasia Cutis Congenita (defek kulit kepala), Atresia Koana, Atresia Esofagus.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['PTU (pada Trimester 1)'],
    clinicalRecommendations: 'Ganti dari PTU ke Methimazole saat memasuki Trimester 2 untuk meminimalkan risiko gagal hati maternal akibat PTU.',
    references: 'ATA Guidelines & ACOG Committee Opinion on Thyroid Disease'
  },

  // =========================================================================
  // 7. SISTEM SARAF PUSAT, PSIKIATRI & EPILEPSI
  // =========================================================================
  {
    id: 'preg-valproic-acid',
    name: 'Asam Valproat (Valproate)',
    genericName: 'Valproic Acid / Divalproex Sodium',
    category: 'Sistem Saraf (Antikonvulsan & Mood Stabilizer)',
    brandNames: ['Depakene', 'Depakote', 'Divalproex', 'Ikalep'],
    fdaCategory: 'X',
    pllrSummary: 'TERATOGENIK PALING BERBAHAYA DI BIDANG NEUROLOGI (Kategori X untuk migrain, Kategori D untuk epilepsi refrakter). Memicu Neural Tube Defects (Spina Bifida) dan penurunan IQ kognitif anak.',
    trimesterRisks: {
      trimester1: 'KATEGORI X EKSTREM: Neural Tube Defects (Spina Bifida 1-2%), Fetal Valproate Syndrome, kelainan jantung kongenital, celah bibir, hipospadia.',
      trimester2: 'KATEGORI X: Penurunan IQ anak sebesar 8-11 poin pada usia sekolah, peningkatan risiko spektrum autisme (ASD) hingga 3-5 kali lipat.',
      trimester3: 'KATEGORI X: Keterlambatan perkembangan motorik saraf dan supresi sumsum tulang neonatal.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.5,
    breastfeedingSummary: 'Berikatan protein 90% dan ekskresi ke ASI rendah (<2% RID). Aman untuk ibu menyusui pasca persalinan.',
    teratogenicAlert: 'Fetal Valproate Syndrome: Spina Bifida, Meningomielokel, Craniosynostosis, Cleft Lip/Palate, Autisme, Defisit IQ Permanen.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Lamotrigine', 'Levetiracetam (Keppra)'],
    clinicalRecommendations: 'KONTRAINDIKASI MUTLAK pada wanita usia subur tanpa kontrasepsi efektif ganda. Jika terpaksa digunakan untuk epilepsi refrakter, berikan asam folat dosis tinggi (4-5 mg/hari).',
    references: 'FDA Boxed Warning on Valproate & ILAE (International League Against Epilepsy) Guidelines'
  },
  {
    id: 'preg-lamotrigine',
    name: 'Lamotrigine',
    genericName: 'Lamotrigine',
    category: 'Sistem Saraf (Antiepilepsi Spektrum Luas)',
    brandNames: ['Lamictal', 'Lamiros'],
    fdaCategory: 'C',
    pllrSummary: 'ANTIEPILEPSI LINI PERTAMA TERAMAN PADA KEHAMILAN bersama Levetiracetam. Angka kejadian malformasi kongenital terendah di antara seluruh antikonvulsan.',
    trimesterRisks: {
      trimester1: 'Profil keamanan teratogenik terbaik di antara antikonvulsan (risiko malformasi setara populasi umum ~2%).',
      trimester2: 'Klirens lamotrigine meningkat drastis akibat induksi glukuronidasi estrogen kehamilan (kadar darah turun 50%).',
      trimester3: 'Wajib penyesuaian dosis naik untuk mencegah kejang berulang.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 9.0,
    breastfeedingSummary: 'Kadar dalam ASI sedikit lebih tinggi dibanding antiepilepsi lain (~9% RID). Kompatibel dengan menyusui (pantau bayi terhadap sedasi atau ruam kulit).',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Levetiracetam (Keppra)'],
    clinicalRecommendations: 'Pantau kadar plasma lamotrigine setiap bulan selama kehamilan; dosis seringkali perlu ditingkatkan 50-100% dan segera diturunkan kembali pasca melahirkan.',
    references: 'AAN (American Academy of Neurology) & ILAE Pregnancy Guidelines'
  },
  {
    id: 'preg-sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline Hydrochloride',
    category: 'Sistem Saraf (Antidepresan SSRI)',
    brandNames: ['Zoloft', 'Fridep', 'Nudep', 'Sertraline Generik'],
    fdaCategory: 'C',
    pllrSummary: 'ANTIDEPRESAN SSRI PILIHAN NOMOR 1 PALING AMAN pada kehamilan dan selama masa menyusui. Tingkat transfer ke ASI paling rendah di antara seluruh SSRI.',
    trimesterRisks: {
      trimester1: 'Profil keamanan teratogenisitas organogenesis terbaik di antara seluruh SSRI.',
      trimester2: 'Aman, mengobati depresi perinatal sangat krusial untuk mencegah depresi postpartum.',
      trimester3: 'Risiko ringan Neonatal Behavioral Adaptation Syndrome (iritabilitas transien 24-48 jam yang sembuh spontan).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.5,
    breastfeedingSummary: 'Kadar dalam ASI hampir tidak terdeteksi (<0.5% RID). Pilihan SSRI nomor 1 untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Sertraline adalah pilihan lini 1 SSRI'],
    clinicalRecommendations: 'Dosis awal: 25-50 mg sekali sehari. Mengobati depresi maternal sangat penting untuk luaran kehamilan yang sehat.',
    references: 'ACOG Practice Bulletin on Perinatal Depression & LactMed'
  },
  {
    id: 'preg-alprazolam',
    name: 'Alprazolam',
    genericName: 'Alprazolam',
    category: 'Sistem Saraf (Benzodiazepine Ansiolitik)',
    brandNames: ['Xanax', 'Alganax', 'Zypraz', 'Alprazolam Generik'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI PADA KEHAMILAN. Menembus plasenta dan memicu sindrom penarikan obat neonatal (Neonatal Withdrawal Syndrome) dan Floppy Infant Syndrome.',
    trimesterRisks: {
      trimester1: 'Kategori D: Potensi peningkatan risiko celah bibir dan langit-langit (cleft lip/palate).',
      trimester2: 'Kategori D: Depresi sistem saraf pusat janin.',
      trimester3: 'KATEGORI D: Floppy Infant Syndrome (hipotonia berat, hipotermia, refleks hisap buruk) dan gejala putus obat neonatal (tremor, iritabilitas).'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 3.5,
    breastfeedingSummary: 'Dapat menyebabkan sedasi berlebih dan kesulitan menyusu pada bayi. Hindari penggunaan rutin saat menyusui.',
    teratogenicAlert: 'Floppy Infant Syndrome dan Neonatal Drug Withdrawal Syndrome.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Sertraline (untuk ansietas kronis)', 'Psikoterapi CBT non-farmakologis'],
    clinicalRecommendations: 'Hindari benzodiazepin pada kehamilan. Lakukan penghentian bertahap (tapering off) sebelum konsepsi.',
    references: 'FDA Drug Information on Benzodiazepines & Briggs'
  },

  // =========================================================================
  // 8. RESPIRASI, ASMA & ALERGI
  // =========================================================================
  {
    id: 'preg-budesonide-inhaler',
    name: 'Budesonide (Inhaler & Nasal)',
    genericName: 'Budesonide',
    category: 'Respirasi (Kortikosteroid Inhalasi)',
    brandNames: ['Pulmicort Turbuhaler', 'Pulmicort Respules', 'Rhinocort Aqua'],
    fdaCategory: 'B',
    pllrSummary: 'KORTIKOSTEROID INHALASI PILIHAN NOMOR 1 (GOLD STANDARD) untuk Asma dan Rinitis Alergi pada Kehamilan. Bekerja lokal di bronkus dengan absorpsi sistemik minimal.',
    trimesterRisks: {
      trimester1: 'Kategori B FDA, data register kehamilan Swedia (>2000 kehamilan) membuktikan 100% aman tanpa peningkatan risiko teratogenik.',
      trimester2: 'Aman, mempertahankan oksigenasi darah maternal-fetal secara optimal.',
      trimester3: 'Aman, mencegah serangan asma akut saat persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.3,
    breastfeedingSummary: 'Absorpsi sistemik minimal; kadar dalam ASI hampir tidak terdeteksi. Sangat aman untuk menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Pilihan lini 1 asma kehamilan'],
    clinicalRecommendations: 'GINA (Global Initiative for Asthma): Kontrol asma maternal sangat krusial karena hipoksia akibat serangan asma jauh lebih berbahaya bagi janin dibanding obat inhalasi.',
    references: 'GINA Guidelines on Asthma in Pregnancy & Briggs'
  },
  {
    id: 'preg-salbutamol-inhaler',
    name: 'Salbutamol (Inhaler MDI)',
    genericName: 'Salbutamol / Albuterol Sulfate',
    category: 'Respirasi (Beta-2 Agonis Kerja Singkat / SABA)',
    brandNames: ['Ventolin Inhaler', 'Astharol MDI', 'Salbuven'],
    fdaCategory: 'C',
    pllrSummary: 'BRONKODILATOR RELIEVER PILIHAN UTAMA untuk pereda sesak nafas akut pada asma kehamilan.',
    trimesterRisks: {
      trimester1: 'Aman untuk pereda sesak akut.',
      trimester2: 'Aman.',
      trimester3: 'Aman pada dosis inhalasi standar. (Dosis IV tinggi dapat menghambat kontraksi uterus).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.5,
    breastfeedingSummary: 'Kadar dalam ASI sangat minimal setelah inhalasi. Aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Pilihan lini 1 pelega asma'],
    clinicalRecommendations: 'Gunakan 1-2 semprotan saat sesak nafas. Jika membutuhkan >2 kali per minggu, tambahkan pengontrol Budesonide inhaler.',
    references: 'GINA 2024 & British Thoracic Society Guidelines on Asthma in Pregnancy'
  },
  {
    id: 'preg-cetirizine',
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Alergi (Antihistamin H1 Generasi ke-2)',
    brandNames: ['Ryvel', 'Incidal-OD', 'Cetirizine Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Antihistamin generasi kedua pilihan utama untuk alergi, rinitis, dan urtikaria pada kehamilan dengan efek kantuk minimal.',
    trimesterRisks: {
      trimester1: 'Aman, studi meta-analisis kohort tidak menunjukkan peningkatan risiko anomali kongenital.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.8,
    breastfeedingSummary: 'Ekskresi ke ASI rendah. Aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Loratadine (Kategori B, L1)'],
    clinicalRecommendations: 'Dosis: 10 mg sekali sehari pada malam hari.',
    references: 'EAACI Guidelines & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-loratadine',
    name: 'Loratadine',
    genericName: 'Loratadine',
    category: 'Alergi (Antihistamin H1 Generasi ke-2 Non-Sedatif)',
    brandNames: ['Claritin', 'Cronitin', 'Loratadine Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Antihistamin non-sedatif pilihan nomor 1 bersama Cetirizine untuk rinitis alergi dan gatal-gatal pada kehamilan dan menyusui.',
    trimesterRisks: {
      trimester1: 'Aman, data register prospektif membuktikan tidak ada risiko teratogenik.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.4,
    breastfeedingSummary: 'Ekskresi ke ASI sangat rendah (<0.5% RID). Pilihan antihistamin terbaik untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cetirizine'],
    clinicalRecommendations: 'Dosis: 10 mg sekali sehari.',
    references: 'Briggs Drugs in Pregnancy and Lactation & LactMed'
  },

  // =========================================================================
  // 9. DERMATOLOGI & RETINOID
  // =========================================================================
  {
    id: 'preg-isotretinoin',
    name: 'Isotretinoin (Oral)',
    genericName: 'Isotretinoin (13-cis-retinoic acid)',
    category: 'Dermatologi (Retinoid Akne Berat)',
    brandNames: ['Roaccutane', 'Accutane', 'Isotretinoin Generik'],
    fdaCategory: 'X',
    pllrSummary: 'TERATOGEN PALING KUAT DALAM SEJARAH MEDIS (Kategori X Ekstrem). Menyebabkan malformasi kraniofasial, jantung, dan otak berat pada >35% janin yang terpapar.',
    trimesterRisks: {
      trimester1: 'KATEGORI X EKSTREM: Sindrom Embriopati Retinoid (anotia/mikrotia, kelainan jantung konotrunkal, hidrosefalus, mikrosefali, celah langit-langit).',
      trimester2: 'KATEGORI X EKSTREM: Kerusakan susunan saraf pusat dan retardasi mental berat permanen.',
      trimester3: 'KATEGORI X EKSTREM: Abortus spontan dan kematian janin.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Sangat Berbahaya',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui.',
    teratogenicAlert: 'Retinoid Embryopathy Syndrome: Anotia/Mikrotia (telinga tidak terbentuk), Cleft Palate, Truncus Arteriosus, Tetralogy of Fallot, Hidrosefalus, Hipoplasia Timus.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Erythromycin topikal', 'Benzoyl Peroxide topikal', 'Clindamycin topikal', 'Azelaic Acid topikal'],
    clinicalRecommendations: 'Wajib program pencegahan kehamilan iPLEDGE (tes kehamilan negatif ganda dan 2 metode kontrasepsi efektif minimal 1 bulan sebelum, selama, dan 1 bulan setelah terapi).',
    references: 'FDA Boxed Warning on Isotretinoin & iPLEDGE Pregnancy Prevention Program'
  },

  // =========================================================================
  // 10. ONKOLOGI & IMUNOSUPRESAN
  // =========================================================================
  {
    id: 'preg-methotrexate',
    name: 'Methotrexate',
    genericName: 'Methotrexate',
    category: 'Onkologi & Reumatologi (Antifolat Antineoplastik)',
    brandNames: ['Emthexate', 'Methotrexate Generik'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Kehamilan. Merupakan agen teratogenik kuat dan abortifasien yang menghambat sintesis DNA purin janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Fetal Methotrexate Syndrome (kraniosinostosis, dismorfisme kraniofasial, hipoplasia paru dan tungkai).',
      trimester2: 'KATEGORI X: Aborsi janin dan supresi sumsum tulang janin.',
      trimester3: 'KATEGORI X: Kematian intrauterin dan anomali kongenital multipel.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'Dapat menekan sistem imun bayi dan menyebabkan supresi sumsum tulang. Kontraindikasi mutlak saat menyusui.',
    teratogenicAlert: 'Fetal Methotrexate/Aminopterin Syndrome: Kraniosinostosis, dismorfisme kraniofasial, retardasi pertumbuhan berat, kelainan skeletal tulang panjang.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Sulfasalazine (dengan asam folat dosis tinggi)', 'Hydroxychloroquine (untuk SLE/RA)'],
    clinicalRecommendations: 'Hentikan minimal 3-6 bulan sebelum merencanakan kehamilan pada wanita maupun pria.',
    references: 'FDA Black Box Warning on Methotrexate & Briggs'
  },
  {
    id: 'preg-lactobacillus',
    name: 'Lactobacillus & Probiotik Kompleks',
    genericName: 'Lactobacillus acidophilus, Bifidobacterium longum, Streptococcus thermophilus',
    category: 'Gastrointestinal & Probiotik',
    brandNames: ['Lacto-B', 'L-Bio', 'Lacbon', 'Probiokid', 'Interlac', 'Liprolac'],
    fdaCategory: 'A',
    pllrSummary: 'Aman digunakan pada seluruh trimester kehamilan. Tidak diabsorpsi secara sistemik dan bekerja secara lokal di intralumen saluran pencernaan.',
    trimesterRisks: {
      trimester1: 'KATEGORI A: Aman. Tidak ada risiko malformasi janin.',
      trimester2: 'KATEGORI A: Aman. Menjaga keseimbangan flora usus.',
      trimester3: 'KATEGORI A: Aman. Bermanfaat mengurangi risiko diare gestasional dan mendukung kolonisasi flora usus sehat.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0,
    breastfeedingSummary: 'Kompatibel dan Sangat Aman. Bakteri probiotik tidak masuk ke dalam sirkulasi darah sistemik dan tidak diekskresikan ke dalam ASI.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Pilihan aman dan lini pertama untuk terapi pemulihan flora usus dan diare akut pada wanita hamil dan menyusui.',
    references: 'American Gastroenterological Association (AGA) Guidelines & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-oralit',
    name: 'Oralit (Oral Rehydration Salts)',
    genericName: 'Natrium Klorida, Kalium Klorida, Trisodium Sitrat Dihidrat, Glukosa Anhidrat',
    category: 'Gastrointestinal & Rehidrasi Oral',
    brandNames: ['Oralit Phapros', 'Corsalit', 'Pharolit', 'Bioralit'],
    fdaCategory: 'A',
    pllrSummary: 'Aman pada kehamilan. Menggantikan kehilangan cairan fisiologis dan elektrolit esensial tanpa efek teratogenik.',
    trimesterRisks: {
      trimester1: 'KATEGORI A: Aman. Sangat penting untuk hidrasi pada hiperemesis gravidarum atau diare.',
      trimester2: 'KATEGORI A: Aman untuk rehidrasi.',
      trimester3: 'KATEGORI A: Aman. Mencegah oligohidramnion akibat dehidrasi berat maternal.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0,
    breastfeedingSummary: 'Sangat Aman. Menjaga hidrasi ibu menyusui dan mempertahankan volume produksi ASI.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Lini pertama rehidrasi oral pada diare atau muntah selama kehamilan dan menyusui.',
    references: 'WHO Rehydration Guidelines & Briggs'
  },
  {
    id: 'preg-zinc-sulfate',
    name: 'Zinc Sulfat',
    genericName: 'Zinc Sulfate Monohydrate',
    category: 'Mikronutrien & Terapi Diare',
    brandNames: ['Zinkid', 'Zincpro', 'L-Zinc', 'Daryazinc'],
    fdaCategory: 'A',
    pllrSummary: 'Aman pada dosis kecukupan harian (RDA) atau terapi jangka pendek diare. Seng merupakan mikronutrien esensial untuk pembelahan sel janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI A: Aman pada dosis standar. Defisiensi zinc justru berisiko menimbulkan kelainan kongenital.',
      trimester2: 'KATEGORI A: Aman.',
      trimester3: 'KATEGORI A: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel. Zinc secara alami disekresikan dalam ASI untuk pertumbuhan bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Aman digunakan sesuai dosis anjuran.',
    references: 'WHO / UNICEF Diarrhea Management Guidelines & Hale Medications and Mothers Milk'
  },
  {
    id: 'preg-eperisone',
    name: 'Eperisone',
    genericName: 'Eperisone Hydrochloride',
    category: 'Musculoskeletal & Relaksan Otot',
    brandNames: ['Myonal', 'Forres', 'Eprinoc'],
    fdaCategory: 'C',
    pllrSummary: 'Data klinis pada wanita hamil terbatas. Hindari penggunaan kecuali potensi manfaat terapeutik melebihi risiko potensial pada janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Data keamanan terbatas. Pertimbangkan terapi non-farmakologis.',
      trimester2: 'KATEGORI C: Gunakan hanya jika ada indikasi neurologis/spasme berat.',
      trimester3: 'KATEGORI C: Hindari menjelang persalinan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Data terbatas',
    breastfeedingSummary: 'Tidak diketahui apakah eperisone diekskresikan ke dalam ASI. Sebaiknya hindari selama menyusui atau hentikan menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol', 'Fisioterapi / Kompres Hangat'],
    clinicalRecommendations: 'Gunakan alternatif yang lebih mapan keamanannya pada wanita hamil.',
    references: 'MIMS Indonesia & Japanese PMDA Monograph on Eperisone'
  },
  {
    id: 'preg-flunarizine',
    name: 'Flunarizine',
    genericName: 'Flunarizine Hydrochloride',
    category: 'SSP / Profilaksis Migrain',
    brandNames: ['Sibelium', 'Frego'],
    fdaCategory: 'C',
    pllrSummary: 'Studi pada hewan menunjukkan toksisitas reproduksi pada dosis tinggi. Tidak direkomendasikan untuk profilaksis migrain pada kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari penggunaan pada trimester pertama.',
      trimester2: 'KATEGORI C: Gunakan alternatif lini pertama yang lebih aman.',
      trimester3: 'KATEGORI C: Waktu paruh sangat panjang (18-24 hari).'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Diekskresikan tinggi di ASI',
    breastfeedingSummary: 'Kadar flunarizine dalam ASI dapat melampaui kadar plasma ibu. HINDARI pada ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Magnesium oral', 'Propranolol (di bawah pengawasan spesialis)'],
    clinicalRecommendations: 'Gunakan terapi non-farmakologis atau suplemen magnesium untuk profilaksis migrain gestasional.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-tizanidine',
    name: 'Tizanidine',
    genericName: 'Tizanidine Hydrochloride',
    category: 'Musculoskeletal & Relaksan Otot',
    brandNames: ['Sirdalud'],
    fdaCategory: 'C',
    pllrSummary: 'Studi hewan menunjukkan penurunan berat badan janin dan peningkatan mortalitas perinatal. Tidak direkomendasikan pada kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Data klinis terbatas.',
      trimester2: 'KATEGORI C: Risiko hipotensi maternal dan hipoperfusi plasenta.',
      trimester3: 'KATEGORI C: Risiko bradikardia dan sedasi neonatal.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Data terbatas',
    breastfeedingSummary: 'Diekskresikan dalam jumlah kecil ke dalam ASI hewan; gunakan dengan kehati-hatian ketat.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol', 'Fisioterapi'],
    clinicalRecommendations: 'Pertimbangkan alternatif non-farmakologis.',
    references: 'FDA Package Insert on Tizanidine'
  },
  {
    id: 'preg-ergotamine',
    name: 'Ergotamine & Caffeine',
    genericName: 'Ergotamine Tartrate, Caffeine',
    category: 'SSP / Antimigrain Vaskular',
    brandNames: ['Ericaf', 'Cafergot'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Seluruh Trimester Kehamilan. Memiliki efek oksitosik yang memicu kontraksi uterus hebat, spasme vaskular plasenta, dan kematian janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Abortifasien poten dan teratogenik vaskular.',
      trimester2: 'KATEGORI X: Iskemia plasenta berat dan kematian janin intrauterin.',
      trimester3: 'KATEGORI X: Kontraksi miometrium tetanik dan solusio plasenta akut.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Dapat memicu gejala ergotisme pada bayi (muntah, diare, nadi lemah, kejang) dan menekan sekresi prolaktin.',
    teratogenicAlert: 'Sindrom Disrupsi Vaskular Janin: Konstriksi vaskular ekstrem memicu amputasi tungkai janin intrauterin dan anomali kraniofasial parah.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Paracetamol', 'Sumatriptan (di bawah pengawasan spesialis)'],
    clinicalRecommendations: 'KONTRAINDIKASI MUTLAK pada wanita hamil atau yang merencanakan kehamilan.',
    references: 'FDA Boxed Warning on Ergotamine Tartrate & Briggs'
  },
  {
    id: 'preg-permethrin',
    name: 'Permethrin 5%',
    genericName: 'Permethrin',
    category: 'Dermatologi & Skabisida',
    brandNames: ['Scabimite'],
    fdaCategory: 'B',
    pllrSummary: 'Obat lini pertama pilihan paling aman untuk pengobatan skabies pada wanita hamil. Penyerapan perkutan sistemik minimal (<0.5%).',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman. Lini pertama terapi skabies.',
      trimester2: 'KATEGORI B: Aman.',
      trimester3: 'KATEGORI B: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel dan Sangat Aman. Tidak terdeteksi secara bermakna di ASI. Bersihkan area payudara sebelum menyusui bila digunakan di area dada.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Terapi baku emas skabies untuk ibu hamil dan menyusui.',
    references: 'CDC Scabies Treatment Guidelines & Hale Medications and Mothers Milk'
  },
  {
    id: 'preg-mupirocin',
    name: 'Mupirocin 2%',
    genericName: 'Mupirocin Calcium',
    category: 'Dermatologi & Antibiotik Topikal',
    brandNames: ['Bactoderm', 'Pibaksin'],
    fdaCategory: 'B',
    pllrSummary: 'Aman digunakan pada kehamilan. Penyerapan sistemik melalui kulit utuh tidak terdeteksi secara klinis.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman.',
      trimester2: 'KATEGORI B: Aman.',
      trimester3: 'KATEGORI B: Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel / Aman. Cuci bersih area puting sebelum menyusui bila salep mengenai payudara.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Lini pertama antibiotik topikal untuk impetigo pada wanita hamil.',
    references: 'FDA Package Insert on Mupirocin & Briggs'
  },
  {
    id: 'preg-oxymetazoline',
    name: 'Oxymetazoline',
    genericName: 'Oxymetazoline Hydrochloride',
    category: 'Respirasi & Dekongestan Nasal',
    brandNames: ['Afrin', 'Iliadin'],
    fdaCategory: 'C',
    pllrSummary: 'Dapat digunakan jangka pendek (maksimal 3 hari) pada rinitis berat jika terapi saline gagal. Hindari pemakaian berlebihan karena risiko vasokonstriksi arteri uterus.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Gunakan larutan saline steril nasal sebagai pilihan pertama.',
      trimester2: 'KATEGORI C: Batasi pemakaian maksimal 3 hari.',
      trimester3: 'KATEGORI C: Batasi pemakaian.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 'Minimal',
    breastfeedingSummary: 'Kompatibel pada penggunaan jangka pendek (2-3 hari) pada dosis anjuran.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Nasal Saline Spray (Breathy)', 'Uap Hangat'],
    clinicalRecommendations: 'Pilihan pertama untuk kongesti hidung hamil adalah semprotan NaCl fisiologis.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-timolol',
    name: 'Timolol Tetes Mata',
    genericName: 'Timolol Maleate',
    category: 'Oftalmologi & Antiglaukoma',
    brandNames: ['Cendo Timol'],
    fdaCategory: 'C',
    pllrSummary: 'Dapat diserap secara sistemik. Lakukan oklusi punctum lakrimalis selama 2 menit setelah penetesan untuk meminimalkan paparan pada janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Gunakan dengan oklusi nasolakrimalis ketat.',
      trimester2: 'KATEGORI C: Monitor pertumbuhan janin.',
      trimester3: 'KATEGORI C: Risiko bradikardia dan aritmia pada neonatus bila dipakai aterm.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Dapat disekresikan ke dalam ASI. Lakukan oklusi nasolakrimalis ketat saat penetesan atau pantau denyut jantung bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Konsultasikan dengan dokter spesialis mata dan kandungan untuk pemilihan terapi glaukoma gestasional.',
    references: 'American Academy of Ophthalmology (AAO) & Briggs'
  },
  {
    id: 'preg-tobramycin',
    name: 'Tobramycin Tetes Mata',
    genericName: 'Tobramycin',
    category: 'Oftalmologi & Antibiotik Okular',
    brandNames: ['Cendo Tobroson', 'Tobradex'],
    fdaCategory: 'B',
    pllrSummary: 'Aman untuk sediaan tetes mata topikal. Penyerapan sistemik dari mata sangat minimal dan tidak menimbulkan risiko ototoksisitas pada janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman untuk tetes mata.',
      trimester2: 'KATEGORI B: Aman.',
      trimester3: 'KATEGORI B: Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman untuk sediaan oftalmik topikal.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Pilihan aman untuk infeksi bakterial mata pada ibu hamil.',
    references: 'FDA Package Insert on Tobramycin Ophthalmic & Briggs'
  },
  {
    id: 'preg-trimetazidine',
    name: 'Trimetazidine',
    genericName: 'Trimetazidine Dihydrochloride',
    category: 'Kardiovaskular & Antiangina',
    brandNames: ['Vastarel MR'],
    fdaCategory: 'C',
    pllrSummary: 'Data klinis pada wanita hamil tidak mencukupi. HINDARI penggunaan pada kehamilan sebagai tindakan pencegahan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak direkomendasikan.',
      trimester2: 'KATEGORI C: Tidak direkomendasikan.',
      trimester3: 'KATEGORI C: Tidak direkomendasikan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Data terbatas',
    breastfeedingSummary: 'Tidak diketahui apakah diekskresikan ke dalam ASI. Tidak direkomendasikan untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Aspirin dosis rendah', 'Metoprolol / Bisoprolol (sesuai anjuran Sp.JP)'],
    clinicalRecommendations: 'Gunakan terapi antiangina lini pertama yang lebih mapan pada kehamilan.',
    references: 'European Medicines Agency (EMA) Summary of Product Characteristics on Trimetazidine'
  },
  {
    id: 'preg-ampicillin',
    name: 'Ampicillin',
    genericName: 'Ampicillin Sodium / Trihydrate',
    category: 'Anti-Infeksi & Antibiotik',
    brandNames: ['Viccillin', 'Sanpicillin'],
    fdaCategory: 'B',
    pllrSummary: 'Lini pertama antibiotik yang sangat aman digunakan pada seluruh trimester kehamilan. Merupakan standar profilaksis transmisi vertikal Streptococcus Grup B (GBS) dan infeksi ketuban pecah dini (KPD).',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman. Tidak meningkatkan risiko malformasi kongenital.',
      trimester2: 'KATEGORI B: Aman.',
      trimester3: 'KATEGORI B: Aman. Regimen baku intrapartum profilaksis GBS.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman. Masuk ke ASI dalam jumlah minimal. Pantau kemungkinan tinja lunak atau ruam popok pada bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Antibiotik lini pertama pilihan pada wanita hamil.',
    references: 'ACOG Practice Bulletin on Prophylaxis of Early-Onset GBS & Briggs'
  },
  {
    id: 'preg-atenolol',
    name: 'Atenolol',
    genericName: 'Atenolol',
    category: 'Kardiovaskular & Antihipertensi',
    brandNames: ['Betablok', 'Farnormin'],
    fdaCategory: 'D',
    pllrSummary: 'Penggunaan jangka panjang selama kehamilan terbukti berkaitan dengan restriksi pertumbuhan intrauterin (IUGR) dan penurunan berat lahir bayi. HINDARI sebagai obat lini pertama hipertensi kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Hubungan potensial dengan defek kraniofasial/jantung jika dipakai aterm.',
      trimester2: 'KATEGORI D: Risiko tinggi IUGR (Intrauterine Growth Restriction).',
      trimester3: 'KATEGORI D: Risiko bradikardia, hipotensi, dan hipoglikemia pada neonatus.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '6% - 19%',
    breastfeedingSummary: 'Terkonsentrasi tinggi dalam ASI karena sifat hidrofilik dan ikatan protein rendah. Pantau ketat denyut jantung bayi atau ganti dengan Labetalol / Propranolol.',
    teratogenicAlert: 'Restriksi Pertumbuhan Janin (IUGR): Paparan atenolol pada trimester kedua dan ketiga berkaitan dengan penurunan berat plasenta dan berat lahir bayi.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Labetalol', 'Nifedipine GITS'],
    clinicalRecommendations: 'Ganti dengan Methyldopa atau Labetalol untuk penanganan hipertensi pada wanita hamil.',
    references: 'FDA Label on Atenolol & ACOG Hypertension in Pregnancy Guidelines'
  },
  {
    id: 'preg-artesunate',
    name: 'Artesunate',
    genericName: 'Artesunate',
    category: 'Anti-Infeksi & Antimalaria',
    brandNames: ['Artesunat Injeksi Kemenkes'],
    fdaCategory: 'C',
    pllrSummary: 'WHO dan Kemenkes RI merekomendasikan Artesunate IV sebagai terapi penyelamat jiwa lini pertama untuk malaria berat P. falciparum pada SELURUH TRIMESTER KEHAMILAN tanpa menunda.',
    trimesterRisks: {
      trimester1: 'KATEGORI C (WHO Lini Pertama Malaria Berat): Manfaat penyelamatan jiwa ibu dan janin melampaui risiko embriotoksisitas potensial.',
      trimester2: 'KATEGORI C: Aman dan sangat efektif membersihkan parasitemia.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel. WHO merekomendasikan ibu menyusui dengan malaria berat tetap mendapatkan terapi artesunate.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Jangan pernah menunda pemberian artesunate injeksi pada ibu hamil dengan malaria berat.',
    references: 'WHO Guidelines for Malaria 2023 & Buku Saku Penatalaksanaan Malaria Kemenkes RI'
  },
  {
    id: 'preg-acetazolamide',
    name: 'Acetazolamide',
    genericName: 'Acetazolamide',
    category: 'Oftalmologi & Neurologi',
    brandNames: ['Diamox', 'Glauseta'],
    fdaCategory: 'C',
    pllrSummary: 'Studi hewan menunjukkan efek teratogenik defek ekstremitas pada dosis tinggi. Gunakan hanya jika ada indikasi darurat penurunan TIO glaukoma akut yang mengancam penglihatan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari penggunaan pada trimester pertama.',
      trimester2: 'KATEGORI C: Gunakan dosis efektif terendah jangka pendek.',
      trimester3: 'KATEGORI C: Risiko asidosis metabolik dan hipokalemia pada janin.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '1% - 3%',
    breastfeedingSummary: 'Diekskresikan dalam jumlah kecil ke ASI; kompatibel pada pemakaian jangka pendek dengan pemantauan elektrolit bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Brimonidine (trimester 1-2)', 'Terapi laser'],
    clinicalRecommendations: 'Konsultasikan bersama dokter spesialis mata dan fetomaternal.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-human-albumin',
    name: 'Human Albumin',
    genericName: 'Human Albumin Serum',
    category: 'Darah & Cairan Pengganti',
    brandNames: ['Plasbumin', 'Albapure'],
    fdaCategory: 'C',
    pllrSummary: 'Merupakan protein fisiologis alami tubuh manusia. Aman digunakan bila terdapat indikasi hipoalbuminemia kritis atau sindrom hiperstimulasi ovarium berat.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman secara fisiologis.',
      trimester2: 'KATEGORI C: Aman; pantau status volume intravaskular.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 'Fisiologis',
    breastfeedingSummary: 'Kompatibel dan Sangat Aman. Komponen alami plasma dan ASI.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Aman digunakan sesuai indikasi klinis hemodinamik.',
    references: 'FDA Prescribing Information on Human Albumin'
  },
  {
    id: 'preg-ibandronic-acid',
    name: 'Ibandronic Acid',
    genericName: 'Ibandronate Sodium',
    category: 'Musculoskeletal & Tulang',
    brandNames: ['Bonviva'],
    fdaCategory: 'C',
    pllrSummary: 'Bisfosfonat terakumulasi dalam matriks tulang bertahun-tahun dan dapat dilepaskan kembali ke sirkulasi janin. Tidak diindikasikan pada kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Risiko hipokalsemia fetal dan gangguan osifikasi tulang janin.',
      trimester2: 'KATEGORI C: Tidak direkomendasikan.',
      trimester3: 'KATEGORI C: Risiko distosia dan hipokalsemia neonatal.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Data terbatas',
    breastfeedingSummary: 'Tidak diketahui apakah diekskresikan ke dalam ASI; hindari penggunaan selama menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Kalsium + Vitamin D oral'],
    clinicalRecommendations: 'Hentikan penggunaan bisfosfonat sebelum merencanakan kehamilan.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-pipemidic-acid',
    name: 'Pipemidic Acid',
    genericName: 'Pipemidic Acid',
    category: 'Anti-Infeksi Saluran Kemih',
    brandNames: ['Urotractin', 'Urinter'],
    fdaCategory: 'C',
    pllrSummary: 'Kuinolon menyebabkan artropati sendi penumpu beban dan kerusakan kartilago pada hewan imatur. KONTRAINDIKASI pada wanita hamil.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari penggunaan.',
      trimester2: 'KATEGORI C: Risiko toksisitas kartilago artikular janin.',
      trimester3: 'KATEGORI C: Hindari penggunaan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Terekspresi di ASI',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI; sebaiknya hindari atau gunakan antibiotik alternatif.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Fosfomycin trometamol', 'Cefixime', 'Nitrofurantoin (hindari aterm)'],
    clinicalRecommendations: 'Gunakan antibiotik beta-laktam atau fosfomisin untuk ISK gestasional.',
    references: 'MIMS Indonesia & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-retinoic-acid',
    name: 'Retinoic Acid Topikal',
    genericName: 'Tretinoin',
    category: 'Dermatologi & Anti-Acne',
    brandNames: ['Vitacid', 'Retin-A'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Wanita Hamil. Derivat retinoid memiliki potensi teratogenik yang sangat tinggi (sindrom embriopati retinoid).',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Malformasi kraniofasial, anomali kardiovaskular, dan mikrosefali.',
      trimester2: 'KATEGORI X: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI X: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Penyerapan perkutan minimal pada kulit utuh; namun hindari pemakaian di area dada/payudara ibu menyusui.',
    teratogenicAlert: 'Sindrom Embriopati Retinoid: Anomali telinga (mikrotia/anotia), mikrosefali, kelainan arkus aorta, dan defek tabung saraf.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Azelaic Acid topikal', 'Erythromycin topikal', 'Salicylic acid konsentrasi rendah (<2%)'],
    clinicalRecommendations: 'Hentikan pemakaian tretinoin segera jika mencurigai kehamilan.',
    references: 'FDA Boxed Warning on Retinoids & Teratology Society Guidelines'
  },
  {
    id: 'preg-acetic-acid',
    name: 'Acetic Acid Otic',
    genericName: 'Acetic Acid Non-Aqueous',
    category: 'THT & Diagnostik',
    brandNames: ['Tetes Telinga Asam Asetat 2%', 'Larutan IVA 3-5%'],
    fdaCategory: 'C',
    pllrSummary: 'Aman untuk pemakaian tetes telinga lokal dan aplikasi serviks pada skrining IVA Kemenkes RI. Penyerapan sistemik tidak bermakna.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk pemakaian otik lokal.',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '0%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Aman digunakan pada otitis eksterna ibu hamil.',
    references: 'CDC & WHO Guidelines'
  },
  {
    id: 'preg-bacitracin-polymyxin',
    name: 'Bacitracin & Polymyxin B Topikal',
    genericName: 'Bacitracin Zinc, Polymyxin B Sulfate',
    category: 'Dermatologi & Antibiotik Topikal',
    brandNames: ['Nebacetin', 'Enbacin'],
    fdaCategory: 'C',
    pllrSummary: 'Aman digunakan untuk infeksi kulit superfisial terbatas. Penyerapan perkutan sistemik sangat minimal.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk aplikasi luka superfisial.',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel / Aman. Bersihkan area payudara sebelum menyusui bila digunakan di sekitar dada.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan pada luka lecet/infeksi kulit minor.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-antihemorrhoid-fdc',
    name: 'Antihemorrhoid FDC',
    genericName: 'Bismuth Subgallate, Lidocaine, Zinc Oxide',
    category: 'Gastrointestinal & Proktologi',
    brandNames: ['Borraginol-N', 'Anusol'],
    fdaCategory: 'C',
    pllrSummary: 'Dapat digunakan jangka pendek (maksimal 7 hari) untuk meredakan nyeri hemoroid gestasional. Prioritaskan asupan tinggi serat dan hidrasi.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Utamakan terapi gaya hidup dan pelembut feses.',
      trimester2: 'KATEGORI C: Aman untuk jangka pendek.',
      trimester3: 'KATEGORI C: Aman untuk jangka pendek.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 'Minimal',
    breastfeedingSummary: 'Kompatibel pada penggunaan rektal jangka pendek.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Psyllium husk / suplemen serat', 'Kompres dingin sitz bath'],
    clinicalRecommendations: 'Pencegahan konstipasi adalah pilar utama hemoroid hamil.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-salicylic-acid-topical',
    name: 'Salicylic Acid Topikal Murni',
    genericName: 'Salicylic Acid',
    category: 'Dermatologi & Keratolitik',
    brandNames: ['Kutilos', 'Callusol'],
    fdaCategory: 'C',
    pllrSummary: 'Aman untuk pemakaian pada area sangat terbatas (mata ikan/kutil kecil). HINDARI pemakaian pada area kulit luas atau oklusi karena risiko penyerapan sistemik salisilat.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk lesi mata ikan tunggal.',
      trimester2: 'KATEGORI C: Aman untuk lesi kecil.',
      trimester3: 'KATEGORI C: Hindari pemakaian area luas menjelang persalinan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel pada pemakaian lesi terbatas. Jangan oleskan di area dada ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cryotherapy lokal'],
    clinicalRecommendations: 'Batasi pemakaian hanya tepat pada lesi kutil/mata ikan.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-insulin-detemir',
    name: 'Insulin Detemir',
    genericName: 'Insulin Detemir',
    category: 'Endokrin & Diabetes Melitus',
    brandNames: ['Levemir FlexPen'],
    fdaCategory: 'B',
    pllrSummary: 'Kategori B FDA. Uji klinis acak prospektif luas membuktikan insulin detemir memiliki efikasi kontrol glikemia yang setara dengan insulin NPH tanpa meningkatkan risiko hipoglikemia nocturnal atau anomali kongenital pada kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman. Lini pertama insulin basal pada diabetes gestasional & pregestasional.',
      trimester2: 'KATEGORI B: Aman. Titrasi dosis seiring peningkatan resistensi insulin plasenta.',
      trimester3: 'KATEGORI B: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel dan Sangat Aman. Molekul insulin terdegradasi di saluran cerna bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Pilihan insulin basal yang sangat direkomendasikan pada diabetes dalam kehamilan.',
    references: 'ADA Standards of Care in Diabetes & European Medicines Agency'
  },
  {
    id: 'preg-insulin-glulisine',
    name: 'Insulin Glulisine',
    genericName: 'Insulin Glulisine',
    category: 'Endokrin & Diabetes Melitus',
    brandNames: ['Apidra SoloStar'],
    fdaCategory: 'C',
    pllrSummary: 'Data klinis pada kehamilan lebih terbatas dibandingkan Insulin Aspart atau Lispro. Gunakan jika pasien sudah stabil sebelumnya atau atas pertimbangan spesialis endokrin.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Kontrol glikemik yang ketat mencegah malformasi janin.',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Lispro', 'Insulin Aspart'],
    clinicalRecommendations: 'Insulin Lispro atau Aspart lebih banyak memiliki data uji klinis pada kehamilan.',
    references: 'FDA Package Insert on Insulin Glulisine'
  },
  {
    id: 'preg-insulin-lispro',
    name: 'Insulin Lispro',
    genericName: 'Insulin Lispro',
    category: 'Endokrin & Diabetes Melitus',
    brandNames: ['Humalog KwikPen'],
    fdaCategory: 'B',
    pllrSummary: 'Kategori B FDA. Merupakan baku emas insulin prandial kerja cepat pada kehamilan. Tidak menembus sawar plasenta secara bermakna dan sangat efektif mengontrol lonjakan glukosa postprandial.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Sangat aman. Menurunkan risiko malformasi kongenital melalui kendali glukosa optimal.',
      trimester2: 'KATEGORI B: Sangat aman.',
      trimester3: 'KATEGORI B: Sangat aman. Menurunkan risiko makrosomia janin.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel dan Sangat Aman bagi ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Pilihan utama insulin prandial pada kehamilan.',
    references: 'ADA Standards of Medical Care in Diabetes & ACOG Guidelines'
  },
  {
    id: 'preg-insulin-biphasic',
    name: 'Insulin Biphasic / Premix',
    genericName: 'Biphasic Insulin Aspart / Lispro',
    category: 'Endokrin & Diabetes Melitus',
    brandNames: ['Humalog Mix', 'Novomix 30', 'Ryzodeg'],
    fdaCategory: 'B',
    pllrSummary: 'Aman digunakan pada kehamilan bila regimen basal-bolus terpisah sulit diterapkan. Komponen insulin analog tidak menembus plasenta.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman.',
      trimester2: 'KATEGORI B: Aman.',
      trimester3: 'KATEGORI B: Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Regimen basal-bolus terpisah umumnya lebih fleksibel untuk penyesuaian dosis trimester ketiga.',
    references: 'ADA Guidelines on Diabetes in Pregnancy'
  },
  {
    id: 'preg-anti-d-immunoglobulin',
    name: 'Anti-D (Rho(D)) Immunoglobulin',
    genericName: 'Rho(D) Immune Globulin',
    category: 'Imunologi & Kebidanan',
    brandNames: ['HyperRHO S/D', 'Rhesonativ'],
    fdaCategory: 'C',
    pllrSummary: 'Merupakan terapi profilaksis standar wajib bagi wanita hamil Rh-negatif pada usia gestasi 28 minggu dan pasca persalinan untuk mencegah penyakit hemolitik bayi baru lahir (Eritroblastosis fetalis) yang mematikan pada kehamilan berikutnya.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Diberikan pasca abortus atau kehamilan ektopik wanita Rh-negatif.',
      trimester2: 'KATEGORI C: Diberikan pasca amniosentesis atau trauma abdomen.',
      trimester3: 'KATEGORI C: Wajib diberikan pada usia kehamilan 28 minggu dan dalam 72 jam pasca persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel dan Sangat Aman. Tidak ada kontraindikasi menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Wajib diberikan pada seluruh ibu hamil dengan Rhesus negatif yang belum tersensitisasi.',
    references: 'ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization'
  },
  {
    id: 'preg-abacavir',
    name: 'Abacavir',
    genericName: 'Abacavir Sulfate',
    category: 'Anti-Infeksi & Antiretroviral HIV',
    brandNames: ['Ziagen', 'Kivexa'],
    fdaCategory: 'C',
    pllrSummary: 'Data dari Antiretroviral Pregnancy Registry (APR) menunjukkan abacavir tidak meningkatkan risiko cacat lahir bermakna. Direkomendasikan sebagai komponen cART alternatif pada wanita hamil yang toleran dan HLA-B*5701 negatif.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Prevalensi cacat lahir setara populasi umum (2.8%).',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '5% - 8%',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI. Pedoman pencegahan penularan HIV merekomendasikan susu formula jika tersedia aman.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Tenofovir Disoproxil Fumarate (TDF) + Emtricitabine'],
    clinicalRecommendations: 'Wajib skrining HLA-B*5701 negatif sebelum pemberian pada wanita hamil.',
    references: 'DHHS Perinatal HIV Guidelines & Antiretroviral Pregnancy Registry'
  },
  {
    id: 'preg-afatinib',
    name: 'Afatinib',
    genericName: 'Afatinib Dimaleate',
    category: 'Onkologi & Antineoplastik',
    brandNames: ['Giotrif'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan. Menghambat pensinyalan ErbB/EGFR yang sangat penting bagi perkembangan embrio dan implantasi plasenta. Dapat menyebabkan kematian embrio-fetal dan malformasi janin berat.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Toksisitas embrio fatal dan keguguran.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan menyusui selama terapi dan hingga 2 minggu setelah dosis terakhir.',
    teratogenicAlert: 'Toksisitas Embriofetal Berat: Penghambatan reseptor ErbB memicu kegagalan organogenesis dan kematian janin intrauterin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan kontrasepsi efektif selama terapi dan minimal 1 bulan setelah penghentian.',
    references: 'FDA Prescribing Information on Giotrif'
  },
  {
    id: 'preg-alectinib',
    name: 'Alectinib',
    genericName: 'Alectinib Hydrochloride',
    category: 'Onkologi & Antineoplastik',
    brandNames: ['Alecensa'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan. Berdasarkan mekanisme kerja dan data studi hewan, alectinib menyebabkan kematian janin intrauterin dan anomali visceral serta skeletal berat.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Keguguran dan malformasi organogenesis masif.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Jangan menyusui selama terapi dan hingga 1 minggu setelah dosis terakhir.',
    teratogenicAlert: 'Malformasi Visceral dan Skeletal: Studi hewan menunjukkan resorpsi embrio 100% dan kelainan bentuk tulang kranium serta organ dalam.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Wajib tes kehamilan negatif sebelum memulai terapi dan gunakan kontrasepsi ganda efektif.',
    references: 'FDA Prescribing Information on Alecensa'
  },
  {
    id: 'preg-asparaginase',
    name: 'Asparaginase',
    genericName: 'L-Asparaginase',
    category: 'Onkologi & Kemoterapi ALL',
    brandNames: ['Leunase', 'Kidrolase'],
    fdaCategory: 'C',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan. Deplesi sistemik asam amino asparagin menghentikan pembelahan sel embrio secara masif dan memicu malformasi skeletal fetal berat serta koagulopati maternal.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Embriotoksisitas berat dan malformasi kraniofasial/ekstremitas.',
      trimester2: 'KATEGORI C: Risiko kematian janin dan koagulopati/pankreatitis maternal.',
      trimester3: 'KATEGORI C: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI selama kemoterapi.',
    teratogenicAlert: 'Kelainan Bentuk Skeletal dan Gastroskisis Janin: Deplesi asam amino asparagin menginduksi hambatan pertumbuhan seluler masif pada janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Konsultasikan dengan tim onkologi ginekologi untuk evaluasi kelanjutan kehamilan bila kemoterapi leukemia mutlak diperlukan.',
    references: 'Briggs Drugs in Pregnancy and Lactation & FDA Label on Elspar'
  },
  {
    id: 'preg-benzathine-penicillin',
    name: 'Benzathine Benzylpenicillin',
    genericName: 'Benzathine Penicillin G',
    category: 'Anti-Infeksi & Antibiotik Sifilis',
    brandNames: ['Benzatin Penisilin G', 'Penadur LA'],
    fdaCategory: 'B',
    pllrSummary: 'Lini pertama baku emas wajib yang SANGAT DIREKOMENDASIKAN untuk pengobatan sifilis pada kehamilan guna mencegah sifilis kongenital, stillbirth, dan kematian neonatal. Tidak ada bukti teratogenisitas.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman. Terapi baku emas sifilis maternal.',
      trimester2: 'KATEGORI B: Aman. Waspadai reaksi Jarisch-Herxheimer (dapat memicu kontraksi rahim singkat).',
      trimester3: 'KATEGORI B: Aman dan efektif mencegah transmisi vertikal ke janin.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman. Masuk ke dalam ASI dalam jumlah sangat kecil.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Satu-satunya terapi sifilis terbukti efektif mencegah sifilis kongenital pada kehamilan (ibu hamil alergi penisilin wajib menjalani desensitisasi penisilin).',
    references: 'CDC STI Treatment Guidelines 2021 & WHO Syphilis in Pregnancy Guidelines'
  },
  {
    id: 'preg-salicyl-powder',
    name: 'Salicyl Powder / Bedak Salisil',
    genericName: 'Salicylic Acid 2%, Talcum',
    category: 'Dermatologi & Antipruritus Topikal',
    brandNames: ['Bedak Salisil Kimia Farma'],
    fdaCategory: 'C',
    pllrSummary: 'Aman untuk pemakaian luar terbatas pada biang keringat. Penyerapan perkutan sangat minimal pada kulit utuh.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk aplikasi luar tubuh.',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<0.1%',
    breastfeedingSummary: 'Kompatibel / Aman. Hindari area areola payudara agar bayi tidak menelan serbuk saat menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan secukupnya pada area punggung dan dada yang berkeringat.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-betaxolol-ophthalmic',
    name: 'Betaxolol Tetes Mata',
    genericName: 'Betaxolol Hydrochloride',
    category: 'Oftalmologi & Glaukoma',
    brandNames: ['Betoptima 0.5%'],
    fdaCategory: 'C',
    pllrSummary: 'Penyekat beta kardioselektif oftalmik. Penyerapan sistemik dapat diminimalkan dengan oklusi nasolakrimalis selama 2 menit.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Gunakan jika manfaat melampaui risiko.',
      trimester2: 'KATEGORI C: Aman dengan penekanan punctum lakrimal.',
      trimester3: 'KATEGORI C: Pantau potensi bradikardia neonatal jika digunakan menjelang persalinan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<3%',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI konsentrasi rendah; lakukan oklusi nasolakrimalis untuk meminimalkan paparan pada bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Brimonidine (trimester 1-2)', 'Terapi laser trabekuloplasti'],
    clinicalRecommendations: 'Lakukan oklusi punctum lakrimalis minimal 2 menit pasca tetes mata.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-brinzolamide-ophthalmic',
    name: 'Brinzolamide Tetes Mata',
    genericName: 'Brinzolamide',
    category: 'Oftalmologi & Glaukoma',
    brandNames: ['Azopt 1%'],
    fdaCategory: 'C',
    pllrSummary: 'Studi hewan dosis oral tinggi menunjukkan toksisitas reproduksi, namun penyerapan sistemik dari sediaan tetes mata topikal sangat rendah.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari jika ada alternatif yang lebih mapan.',
      trimester2: 'KATEGORI C: Gunakan dengan oklusi nasolakrimalis.',
      trimester3: 'KATEGORI C: Aman dengan oklusi punctum lakrimal.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Data terbatas',
    breastfeedingSummary: 'Tidak diketahui apakah diekskresikan ke dalam ASI; pertimbangkan alternatif lain atau lakukan penekanan sudut mata.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Brimonidine (trimester 1-2)'],
    clinicalRecommendations: 'Konsultasikan bersama dokter spesialis mata dan fetomaternal.',
    references: 'FDA Package Insert on Azopt & Briggs'
  },
  {
    id: 'preg-bromocriptine',
    name: 'Bromocriptine',
    genericName: 'Bromocriptine Mesylate',
    category: 'Endokrinologi & Prolaktinoma',
    brandNames: ['Parlodel', 'Cripsa'],
    fdaCategory: 'B',
    pllrSummary: 'Data pada lebih dari 2000 kehamilan membuktikan bromokriptin tidak meningkatkan insiden aborsi spontan atau malformasi kongenital. Umumnya dihentikan saat kehamilan terkonfirmasi kecuali ada tanda ekspansi makroprolaktinoma hipofisis.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman. Hentikan begitu tes kehamilan positif kecuali dokter menyarankan kelanjutan.',
      trimester2: 'KATEGORI B: Dipantau bila terjadi pembesaran tumor hipofisis simtomatik.',
      trimester3: 'KATEGORI B: Digunakan hanya jika terjadi gangguan lapang pandang tumor.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Hambatan Laktasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK bagi ibu yang ingin menyusui bayinya karena bromokriptin secara kuat menghambat sekresi hormon prolaktin dan menghentikan produksi ASI.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hentikan pemakaian saat konsepsi tercapai, kecuali diinstruksikan khusus oleh endokrinologis.',
    references: 'Endocrine Society Clinical Practice Guideline on Hyperprolactinemia'
  },
  {
    id: 'preg-barium-sulfate',
    name: 'Barium Sulfate Radiologi',
    genericName: 'Barium Sulfate',
    category: 'Diagnostik & Media Kontras',
    brandNames: ['Barium Sulfat Radiologi'],
    fdaCategory: 'C',
    pllrSummary: 'Barium sulfat tidak diserap secara sistemik dari saluran cerna utuh. Namun, pemeriksaan fluoroskopi dengan sinar-X umumnya dihindari pada kehamilan trimester pertama demi melindungi janin dari radiasi ionisasi.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari akibat paparan radiasi sinar-X fluoroskopi diagnostik.',
      trimester2: 'KATEGORI C: Gunakan pelindung perisai timbal (lead apron) bila prosedur mutlak diperlukan.',
      trimester3: 'KATEGORI C: Utamakan modalitas non-radiasi (USG / MRI).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '0%',
    breastfeedingSummary: 'Kompatibel dan Sangat Aman. Tidak diserap ke dalam darah maupun ASI.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Ultrasonografi (USG)', 'Endoskopi saluran cerna'],
    clinicalRecommendations: 'Pertimbangkan pemeriksaan diagnostik alternatif tanpa radiasi ionisasi (USG/MRI).',
    references: 'American College of Radiology (ACR) Manual on Contrast Media'
  },
  {
    id: 'preg-bicalutamide',
    name: 'Bicalutamide',
    genericName: 'Bicalutamide',
    category: 'Onkologi & Antiandrogen',
    brandNames: ['Casodex'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Wanita Hamil. Menghambat reseptor androgen secara poten yang memicu gangguan diferensiasi genital pria, feminisasi janin laki-laki, dan hipospadia berat.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Feminisasi janin laki-laki, hipospadia, dan anomali urogenital.',
      trimester2: 'KATEGORI X: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI X: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK pada wanita menyusui.',
    teratogenicAlert: 'Feminisasi Fetal Maskulin: Hambatan total aksi androgen memicu kegagalan pembentukan penis, skrotum bifida, dan ambiguitas genital janin laki-laki.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Obat khusus pria; wanita hamil dilarang menyentuh tablet yang hancur.',
    references: 'FDA Boxed Warning and Prescribing Information on Casodex'
  },
  {
    id: 'preg-bleomycin',
    name: 'Bleomycin',
    genericName: 'Bleomycin Sulfate',
    category: 'Onkologi & Kemoterapi',
    brandNames: ['Blenoxane', 'Bleocin'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan Trimester Pertama. Bersifat sitotoksik dan teratogenik memicu pemutusan untai DNA janin dan toksisitas paru fatal. Bila terpaksa digunakan pada trimester 2-3 untuk limfoma lanjut, pantau ketat fungsi paru janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Malformasi kongenital berat dan keguguran.',
      trimester2: 'KATEGORI D: Risiko toksisitas paru janin dan oligohidramnion.',
      trimester3: 'KATEGORI D: Risiko distres pernapasan neonatal.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI selama terapi.',
    teratogenicAlert: 'Toksisitas Genetik dan Paru Janin: Pemutusan rantai DNA memicu kematian sel organogenesis dan fibrosis paru dini pada janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Tunda kemoterapi hingga trimester kedua atau pasca persalinan bila kondisi onkologis memungkinkan.',
    references: 'Briggs Drugs in Pregnancy and Lactation & FDA Label'
  },
  {
    id: 'preg-bortezomib',
    name: 'Bortezomib',
    genericName: 'Bortezomib',
    category: 'Onkologi & Inhibitor Proteasom',
    brandNames: ['Velcade'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan. Menghambat kompleks proteasom 26S yang vital untuk kelangsungan hidup dan pembelahan seluler embrio. Studi hewan membuktikan kematian embrio-fetal dini dan anomali skeletal.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Kematian embrio-fetal dan keguguran total.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan menyusui selama terapi dan hingga 2 bulan setelah dosis terakhir.',
    teratogenicAlert: 'Letalitas Embriofetal dan Anomali Skeletal: Menghambat jalur proteasom ubiquitin yang esensial bagi diferensiasi jaringan embrional.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan kontrasepsi efektif ganda selama terapi dan minimal 7 bulan setelah penghentian.',
    references: 'FDA Prescribing Information on Velcade'
  },
  {
    id: 'preg-brentuximab-vedotin',
    name: 'Brentuximab Vedotin',
    genericName: 'Brentuximab Vedotin',
    category: 'Onkologi & ADC Anti-CD30',
    brandNames: ['Adcetris'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan. Agen antimitotik MMAE menghambat pembentukan gelendong mikrotubulus selama mitosis sel janin yang sedang berkembang pesat, memicu embriotoksisitas fatal.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Resorpsi embrio, defek tabung saraf, dan malformasi multipel.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI selama terapi.',
    teratogenicAlert: 'Hambatan Mitosis Embrio: Pelepasan racun MMAE menghentikan pembelahan seluler janin pada fase metafase/anafase.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Wajib tes kehamilan negatif sebelum infus pertama dan kontrasepsi efektif.',
    references: 'FDA Prescribing Information on Adcetris'
  },
  {
    id: 'preg-bendamustine',
    name: 'Bendamustine',
    genericName: 'Bendamustine Hydrochloride',
    category: 'Onkologi & Alkilating Agent',
    brandNames: ['Ribomustin', 'Treanda'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Kehamilan. Agen pengalkilasi bifungsional yang menyebabkan ikatan silang DNA permanen, memicu kematian sel embrio masif dan anomali kongenital kraniofasial serta skeletal.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Malformasi organogenesis berat dan keguguran.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Jangan menyusui selama terapi dan hingga minimal 1 minggu setelah dosis terakhir.',
    teratogenicAlert: 'Alkilasi DNA Embrio Masif: Menyebabkan kerusakan kromosom fetal permanen dan malformasi organ multipel.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan kontrasepsi efektif selama terapi dan 6 bulan pasca penghentian.',
    references: 'FDA Prescribing Information on Treanda'
  },
  {
    id: 'preg-basiliximab',
    name: 'Basiliximab',
    genericName: 'Basiliximab',
    category: 'Imunologi & Transplantasi Ginjal',
    brandNames: ['Simulect'],
    fdaCategory: 'B',
    pllrSummary: 'Antibodi monoklonal IgG1 yang dapat menembus sawar plasenta pada trimester kedua dan ketiga. Data klinis pada kehamilan terbatas, namun antibodi penekan IL-2R ini digunakan pada wanita hamil penerima cangkok ginjal bila mutlak diperlukan.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Transfer plasenta sangat rendah pada awal gestasi.',
      trimester2: 'KATEGORI B: Penekanan sementara pada limfosit T janin.',
      trimester3: 'KATEGORI B: Pantau status imunologi neonatus pasca persalinan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Sebagai molekul protein imunoglobulin besar, ekskresi ke dalam ASI sangat minimal dan terdegradasi di saluran cerna bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan atas rekomendasi ketat tim dokter transplantasi ginjal dan fetomaternal.',
    references: 'FDA Prescribing Information on Simulect & Briggs'
  },
  {
    id: 'preg-busulfan',
    name: 'Busulfan',
    genericName: 'Busulfan',
    category: 'Onkologi & Alkilating Agent HSCT',
    brandNames: ['Myleran', 'Busilvex'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Kehamilan. Terkenal memicu Sindrom Busulfan Fetal yang mencakup hambatan pertumbuhan intrauterin berat, mikrosefali, agenesis ginjal bilateral, hipoplasia ovarium/testis permanen, dan defek kraniofasial.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Sindrom Busulfan Fetal, keguguran, dan kematian janin intrauterin.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI secara permanen.',
    teratogenicAlert: 'Sindrom Busulfan Fetal: Mikrosefali, distrofi kornea katarak kongenital, agenesis renal, agenesis gonad janin, dan IUGR ekstrem.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Wajib skrining kehamilan negatif sebelum kondisioning transplantasi dan kontrasepsi efektif seumur hidup terapi.',
    references: 'Briggs Drugs in Pregnancy and Lactation & FDA Label on Busulfan'
  },
  {
    id: 'preg-cisapride',
    name: 'Cisapride',
    genericName: 'Cisapride',
    category: 'Saluran Cerna / Prokinetik Agonis 5-HT4',
    brandNames: ['Acpulsif'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Hindari pemakaian kecuali manfaat melampaui risiko aritmia.',
      trimester2: 'Kategori C: Potensi aritmia ventrikel maternal/fetal.',
      trimester3: 'Kategori C: Pemantauan denyut jantung janin jika digunakan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<2%',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI dalam jumlah sangat kecil; sebaiknya pertimbangkan alternatif prokinetik yang lebih aman (seperti metoklopramid atau domperidon).',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas mayor pada hewan, namun risiko elektrofisiologi jantung fatal pada ibu.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Metoclopramide', 'Omeprazole', 'Sucralfate'],
    clinicalRecommendations: 'Hindari penggunaan rutin pada kehamilan dan laktasi karena risiko aritmia ventrikel fatal.',
    references: 'Briggs Drugs in Pregnancy and Lactation & FDA Cisapride Label'
  },
  {
    id: 'preg-dacarbazine',
    name: 'Dacarbazine',
    genericName: 'Dacarbazine',
    category: 'Onkologi / Agen Pengalkilasi Sitotoksik',
    brandNames: ['DTIC-Dome', 'Dacin'],
    fdaCategory: 'D',
    pllrSummary: 'Bukti Positif Risiko Janin (Positive Evidence of Risk)',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Mutagenik dan teratogenik kuat.',
      trimester2: 'KATEGORI D: Mielosupresi janin dan retardasi pertumbuhan intrauterin (IUGR).',
      trimester3: 'KATEGORI D: Pansitopenia neonatus berat.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI selama masa kemoterapi.',
    teratogenicAlert: 'Teratogenik dan embriotoksik poten: Malformasi skeletal, defek kraniofasial, dan kematian janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Kontrasepsi efektif wajib digunakan selama terapi dan hingga minimal 6 bulan setelah dosis terakhir.',
    references: 'FDA Dacarbazine Label & NCCN Guidelines'
  },
  {
    id: 'preg-daclatasvir',
    name: 'Daclatasvir',
    genericName: 'Daclatasvir',
    category: 'Anti-Infeksi / Antivirus Hepatitis C (DAA)',
    brandNames: ['Daklinza'],
    fdaCategory: 'B',
    pllrSummary: 'Tidak Ada Bukti Risiko pada Manusia (No Demonstrated Risk in Pregnancy)',
    trimesterRisks: {
      trimester1: 'Kategori B: Data manusia terbatas; tidak teratogenik pada hewan.',
      trimester2: 'Kategori B: Pertimbangkan tunda terapi kuratif HCV hingga pasca persalinan.',
      trimester3: 'Kategori B: Aman jika ada indikasi mendesak hepar dekompensata.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Tidak Diketahui',
    breastfeedingSummary: 'Tidak diketahui apakah diekskresikan ke dalam ASI manusia. Pertimbangkan manfaat terapi bagi ibu terhadap potensi paparan bayi.',
    teratogenicAlert: 'Tidak ada efek teratogenik mayor pada hewan uji. PERHATIAN: Jika dikombinasikan dengan Ribavirin, KONTRAINDIKASI MUTLAK (Kategori X).',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Sofosbuvir'],
    clinicalRecommendations: 'Terapi HCV umumnya ditunda hingga setelah persalinan kecuali ada dekompensasi hepar akut.',
    references: 'AASLD/IDSA HCV Guidance & FDA Daklinza Label'
  },
  {
    id: 'preg-dactinomycin',
    name: 'Dactinomycin',
    genericName: 'Dactinomycin / Actinomycin D',
    category: 'Onkologi / Antibiotik Antineoplastik Sitotoksik',
    brandNames: ['Cosmegen'],
    fdaCategory: 'D',
    pllrSummary: 'Bukti Positif Risiko Janin (Positive Evidence of Risk)',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Teratogenik ekstrem.',
      trimester2: 'KATEGORI D: Mielosupresi janin berat dan hambatan pertumbuhan.',
      trimester3: 'KATEGORI D: Pansitopenia neonatus mematikan.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI selama masa pengobatan kanker.',
    teratogenicAlert: 'Teratogenik kuat: Deformitas ekstremitas, bibir sumbing, mikrosefali, dan kematian embrio intrauterin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Wajib tes kehamilan negatif sebelum kemoterapi dan kontrasepsi ganda efektif.',
    references: 'FDA Cosmegen Label & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-daunorubicin',
    name: 'Daunorubicin',
    genericName: 'Daunorubicin Hydrochloride',
    category: 'Onkologi / Antrasiklin Sitotoksik',
    brandNames: ['Daunocin', 'Cerubidine'],
    fdaCategory: 'D',
    pllrSummary: 'Bukti Positif Risiko Janin (Positive Evidence of Risk)',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Mutagenik dan abortifasien.',
      trimester2: 'KATEGORI D: Kardiotoksisitas fetal dan IUGR berat.',
      trimester3: 'KATEGORI D: Mielosupresi berat neonatus.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI.',
    teratogenicAlert: 'Kardiotoksisitas miokardium janin, malformasi skeletal, dan kematian fetal.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan kontrasepsi efektif selama terapi induksi leukemia dan hingga minimal 6 bulan pasca kemoterapi.',
    references: 'FDA Daunorubicin Label & Briggs'
  },
  {
    id: 'preg-deferiprone',
    name: 'Deferiprone',
    genericName: 'Deferiprone',
    category: 'Antidotum & Kelator Logam / Kelator Besi Oral',
    brandNames: ['Ferriprox'],
    fdaCategory: 'D',
    pllrSummary: 'Bukti Positif Risiko Janin (Positive Evidence of Risk)',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Teratogenik skeletal.',
      trimester2: 'KATEGORI D: Malformasi tulang dan sendi janin.',
      trimester3: 'KATEGORI D: Agranulositosis janin/neonatus.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Potensial Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui karena risiko agranulositosis fatal pada bayi.',
    teratogenicAlert: 'Teratogenik mayor: Malformasi ekstremitas, hipoplasia mandibular, dan omfalokel pada studi praklinis.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Skrining kehamilan wajib negatif sebelum memulai terapi kelator deferiprone.',
    references: 'FDA Ferriprox Label & EMA Summary of Product Characteristics'
  },
  {
    id: 'preg-deferoxamine',
    name: 'Deferoxamine',
    genericName: 'Deferoxamine Mesylate',
    category: 'Antidotum & Kelator Logam / Kelator Besi Parenteral',
    brandNames: ['Desferal'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Displasia skeletal dilaporkan pada hewan uji; hindari trimester 1 kecuali intoksikasi besi akut mengancam jiwa.',
      trimester2: 'Kategori C: Dapat digunakan pada hemosiderosis berat dengan pemantauan ultrasonografi.',
      trimester3: 'Kategori C: Terapi penyelamat pada intoksikasi besi akut maternal.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Molekul besar larut air; penyerapan oral oleh saluran cerna bayi sangat buruk sehingga risiko sistemik minimal. Gunakan dengan kehati-hatian.',
    teratogenicAlert: 'Retardasi osifikasi skeletal dilaporkan pada hewan dosis toksik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Pada keracunan besi akut maternal, desferal adalah obat penyelamat jiwa dan harus diberikan tanpa memandang usia kehamilan.',
    references: 'Briggs Drugs in Pregnancy and Lactation & FDA Desferal Label'
  },
  {
    id: 'preg-delamanid',
    name: 'Delamanid',
    genericName: 'Delamanid',
    category: 'Anti-Infeksi / Antituberkulosis Lini Kedua',
    brandNames: ['Deltyba'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Data keamanan pada kehamilan manusia sangat terbatas.',
      trimester2: 'Kategori C: Gunakan jika manfaat terapi TB-MDR lebih besar dibanding risiko.',
      trimester3: 'Kategori C: Pemantauan denyut jantung janin jika ada risiko perpanjangan QTc.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Diekskresikan pada Hewan',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI pada hewan dengan konsentrasi tinggi; WHO menyarankan evaluasi manfaat menyusui terhadap terapi TB resisten.',
    teratogenicAlert: 'Tidak ada teratogenisitas terbukti pada hewan, namun toksisitas embrio terjadi pada dosis maternal toksik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'WHO merekomendasikan delamanid dapat dipertimbangkan pada wanita hamil dengan TB-MDR bila rejimen aman lain tidak tersedia.',
    references: 'WHO Consolidated Guidelines on Tuberculosis & Deltyba EMA Assessment'
  },
  {
    id: 'preg-desmopressin',
    name: 'Desmopressin',
    genericName: 'Desmopressin Acetate',
    category: 'Endokrinologi / Analog Sintetis Hormon Vasopresin V2',
    brandNames: ['Minirin'],
    fdaCategory: 'B',
    pllrSummary: 'Tidak Ada Bukti Risiko pada Manusia (No Demonstrated Risk in Pregnancy)',
    trimesterRisks: {
      trimester1: 'Kategori B: Terapi baku emas diabetes insipidus gestasional yang aman.',
      trimester2: 'Kategori B: Aman; pantau kadar natrium serum dan osmolalitas urin.',
      trimester3: 'Kategori B: Aman; tidak memicu kontraksi uterus (tanpa efek oksitosin).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<0.05%',
    breastfeedingSummary: 'Sangat Aman (L1). Jumlah yang masuk ke dalam ASI sangat minimal dan peptida ini diuraikan oleh enzim protease saluran cerna bayi.',
    teratogenicAlert: 'Tidak teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Merupakan terapi pilihan utama (drug of choice) untuk diabetes insipidus kranial selama kehamilan.',
    references: 'Briggs Drugs in Pregnancy and Lactation & FDA Minirin Label'
  },
  {
    id: 'preg-desogestrel',
    name: 'Desogestrel',
    genericName: 'Desogestrel',
    category: 'Endokrinologi & Kontrasepsi / Progestogen Oral Tunggal (Minipill)',
    brandNames: ['Cerazette'],
    fdaCategory: 'X',
    pllrSummary: 'Kontraindikasi pada Kehamilan (Hormon Kontrasepsi)',
    trimesterRisks: {
      trimester1: 'Kategori X: Kontraindikasi karena tidak ada indikasi medis penggunaan kontrasepsi saat sudah hamil.',
      trimester2: 'Kategori X: Kontraindikasi.',
      trimester3: 'Kategori X: Kontraindikasi.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Sangat Aman dan Pilihan Utama (L1). Tidak mempengaruhi volume, laktogenesis, atau komposisi nutrisi ASI. Dapat dimulai segera 6 minggu postpartum.',
    teratogenicAlert: 'Paparan tidak disengaja pada awal kehamilan tidak terbukti meningkatkan risiko cacat lahir mayor.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Kontrasepsi oral lini pertama yang paling direkomendasikan untuk ibu menyusui (progestin-only pill).',
    references: 'WHO Medical Eligibility Criteria for Contraceptive Use & Briggs'
  },
  {
    id: 'preg-desoximetasone',
    name: 'Desoximetasone',
    genericName: 'Desoximetasone',
    category: 'Dermatologi / Kortikosteroid Topikal Poten Tinggi (Kelas II)',
    brandNames: ['Inerson', 'Esperson'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Gunakan jangka pendek pada area terbatas.',
      trimester2: 'Kategori C: Hindari pemakaian luas (>10% LPT) atau balutan oklusif.',
      trimester3: 'Kategori C: Hindari pemakaian berlebih untuk mencegah IUGR.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Fraksi sistemik sangat rendah. Jangan dioleskan pada puting susu atau area payudara sebelum menyusui.',
    teratogenicAlert: 'Steroid topikal poten dosis tinggi pada hewan memicu celah langit-langit (cleft palate).',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Hydrocortisone Topical', 'Emollients'],
    clinicalRecommendations: 'Pilih kortikosteroid topikal potensi rendah-sedang (hidrokortison) terlebih dahulu selama kehamilan.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-diethylcarbamazine',
    name: 'Diethylcarbamazine',
    genericName: 'Diethylcarbamazine Citrate',
    category: 'Anti-Infeksi / Antelmintik Antifilaria',
    brandNames: ['DEC KF', 'Filarzan'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Tunda pengobatan filariasis kuratif hingga pasca persalinan.',
      trimester2: 'Kategori C: Hindari POPM massal pada ibu hamil.',
      trimester3: 'Kategori C: Reaksi Mazzotti demam tinggi dapat memicu kontraksi uterus prematur.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Diekskresikan ke dalam ASI',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI; sebaiknya tunda pemberian pada ibu menyusui kecuali risiko penularan filariasis sangat mendesak.',
    teratogenicAlert: 'Tidak ada bukti teratogenik langsung, namun badai sitokin reaksi Mazzotti berbahaya bagi kehamilan.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Kemenkes RI dan WHO mengecualikan ibu hamil dari program Pemberian Obat Pencegahan Massal (POPM) filariasis tahunan.',
    references: 'WHO Lymphatic Filariasis Elimination Guidelines & Kemenkes RI'
  },
  {
    id: 'preg-diflucortolone',
    name: 'Diflucortolone Valerate',
    genericName: 'Diflucortolone Valerate',
    category: 'Dermatologi / Kortikosteroid Topikal Poten',
    brandNames: ['Nerisona'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Gunakan jangka pendek pada area terbatas.',
      trimester2: 'Kategori C: Hindari pemakaian luas tanpa instruksi dokter.',
      trimester3: 'Kategori C: Batasi durasi sesingkat mungkin.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Penyerapan sistemik minimal; hindari aplikasi langsung pada area dada/payudara sebelum menyusui.',
    teratogenicAlert: 'Kortikosteroid dosis tinggi dapat memicu bibir sumbing pada studi hewan.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Hydrocortisone Topical'],
    clinicalRecommendations: 'Gunakan sesingkat mungkin (maksimal 1-2 minggu) pada lesi inflamasi berat.',
    references: 'Nerisona SmPC & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-edetate-disodium',
    name: 'Disodium Edetate',
    genericName: 'Disodium Edetate / Na2-EDTA',
    category: 'Antidotum & Kelator Logam / Kelator Kalsium',
    brandNames: ['Endrate'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Gangguan mineralisasi embrional.',
      trimester2: 'Kategori C: Hipokalsemia akut janin.',
      trimester3: 'Kategori C: Risiko henti jantung dan tetani janin.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Potensial Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI saat menyusui karena risiko hipokalsemia akut berat pada bayi.',
    teratogenicAlert: 'Kelasi mineral esensial (kalsium, seng) dapat mengganggu organogenesis.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Calcitonin', 'Hydration'],
    clinicalRecommendations: 'Hanya digunakan dalam krisis hiperkalsemia darurat ekstrem yang mengancam nyawa ibu.',
    references: 'FDA Endrate Label'
  },
  {
    id: 'preg-clodronate',
    name: 'Clodronate Disodium',
    genericName: 'Clodronate Disodium',
    category: 'Muskuloskeletal & Onkologi / Bisfosfonat Non-Nitrogen',
    brandNames: ['Bonefos'],
    fdaCategory: 'D',
    pllrSummary: 'Bukti Positif Risiko Janin (Positive Evidence of Risk)',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Inkorporasi bisfosfonat ke dalam tulang janin yang sedang berkembang.',
      trimester2: 'KATEGORI D: Hipokalsemia janin dan hambatan pemanjangan tulang.',
      trimester3: 'KATEGORI D: Hipokalsemia neonatus berat.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Diekskresikan dalam ASI',
    breastfeedingSummary: 'KONTRAINDIKASI saat menyusui. Hentikan pemberian ASI.',
    teratogenicAlert: 'Retensi matriks skeletal jangka panjang dan gangguan mineralisasi tulang janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hindari pemakaian bisfosfonat pada wanita usia subur kecuali keganasan onkologi mendesak.',
    references: 'Bonefos SmPC & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-dmsa',
    name: 'Dimercaptosuccinic Acid (DMSA)',
    genericName: 'Succimer / DMSA',
    category: 'Antidotum & Kelator Logam / Kelator Timbal Oral',
    brandNames: ['Chemet'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko Tidak Dapat Dikesampingkan (Risk Cannot Be Ruled Out)',
    trimesterRisks: {
      trimester1: 'Kategori C: Gunakan jika kadar timbal darah maternal sangat tinggi (>45 mcg/dL) karena timbal itu sendiri teratogenik dan abortifasien kuat.',
      trimester2: 'Kategori C: Kelasi menurunkan transmisi timbal transplasental.',
      trimester3: 'Kategori C: Mencegah ensefalopati timbal neonatus.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Tidak Diketahui',
    breastfeedingSummary: 'Timbal diekskresikan ke dalam ASI. Bila kadar timbal darah ibu tinggi, menyusui harus ditunda dan kelasi diberikan.',
    teratogenicAlert: 'Tidak ada efek teratogenik langsung terbukti; keracunan timbal maternal jauh lebih membahayakan janin.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: [],
    clinicalRecommendations: 'Pada keracunan timbal berat maternal, terapi kelasi succimer diindikasikan untuk melindungi ibu dan janin dari toksisitas neuro-kognitif timbal permanen.',
    references: 'CDC Guidelines for the Identification and Management of Lead Exposure in Pregnant and Lactating Women & FDA Chemet Label'
  },
  {
    id: 'preg-docetaxel',
    name: 'Docetaxel',
    genericName: 'Docetaxel',
    category: 'Onkologi / Taxane Sitotoksik',
    brandNames: ['Taxotere', 'Brexel'],
    fdaCategory: 'D',
    pllrSummary: 'Bukti Positif Risiko Janin (Positive Evidence of Risk)',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Racun mitosis dan teratogenik kuat.',
      trimester2: 'KATEGORI D: Mielosupresi janin berat dan IUGR.',
      trimester3: 'KATEGORI D: Supresi sumsum tulang neonatus fatal.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Toksik',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan pemberian ASI secara permanen.',
    teratogenicAlert: 'Embriotoksik dan fetotoksik berat: Malformasi kraniofasial, agenesis organ, dan kematian embrio.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Kontrasepsi efektif wajib digunakan selama terapi dan hingga 6 bulan pasca dosis kemoterapi terakhir.',
    references: 'FDA Taxotere Label & ESMO Guidelines on Cancer in Pregnancy'
  },
  {
    id: 'preg-dutasteride',
    name: 'Dutasteride',
    genericName: 'Dutasteride',
    category: 'Urologi / Dual 5-Alfa Reduktase Inhibitor Tipe 1 & 2',
    brandNames: ['Avodart', 'Duodart'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA KEHAMILAN (Teratogenik Janin Laki-Laki)',
    trimesterRisks: {
      trimester1: 'KATEGORI X: KONTRAINDIKASI MUTLAK. Memicu feminisasi dan ambiguitas genital janin laki-laki.',
      trimester2: 'KATEGORI X: KONTRAINDIKASI MUTLAK. Malformasi genitalia eksterna pria.',
      trimester3: 'KATEGORI X: KONTRAINDIKASI MUTLAK. Hipospadia dan kriptorkidisme janin laki-laki.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK pada wanita menyusui.',
    teratogenicAlert: 'SINDROM ANTIANDROGENIK FETAL: Menghambat perkembangan normal genitalia eksterna janin laki-laki, menyebabkan hipospadia, mikropenis, ambiguitas seksual, dan agenesis prostat janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'KONTRAINDIKASI MUTLAK PADA WANITA. Wanita hamil dilarang menyentuh kapsul bocor karena obat diserap melalui kulit. Pria yang minum dutasteride dilarang mendonorkan darah.',
    references: 'FDA Avodart Label & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-exemestane',
    name: 'Exemestane',
    genericName: 'Exemestane',
    category: 'Onkologi / Inaktivator Aromatase',
    brandNames: ['Aromasin 25 mg'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA KEHAMILAN. Penurunan drastis sintesis estrogen memicu abortus spontan dan kematian janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Toksisitas embriofetal berat, abortus spontan, kelainan pembentukan organ.',
      trimester2: 'KATEGORI X: Hambatan pertumbuhan janin intrauterin berat (IUGR) dan kematian janin.',
      trimester3: 'KATEGORI X: Kematian intrauterin dan gangguan hemostasis plasenta.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Menekan laktasi dan memicu efek toksik pada bayi.',
    teratogenicAlert: 'Penekanan estrogen maternal-fetal masif menyebabkan keguguran embrio spontan dan malformasi kongenital.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'KONTRAINDIKASI MUTLAK. Pastikan tes kehamilan negatif sebelum memulai terapi. Gunakan kontrasepsi non-hormonal efektif.',
    references: 'FDA Aromasin Label & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-eltrombopag',
    name: 'Eltrombopag',
    genericName: 'Eltrombopag Olamine',
    category: 'Hematologi / Agonis Reseptor TPO',
    brandNames: ['Revolade 25 mg / 50 mg'],
    fdaCategory: 'C',
    pllrSummary: 'Data manusia terbatas. Penelitian hewan menunjukkan embrioleptalitas dan penurunan berat badan janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Risiko potensial embriotoksisitas; gunakan hanya bila manfaat melampaui risiko perdarahan maternal.',
      trimester2: 'KATEGORI C: Pemantauan USG pertumbuhan janin serial.',
      trimester3: 'KATEGORI C: Pantau hitung trombosit janin/neonatus pasca persalinan.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Tidak diketahui',
    breastfeedingSummary: 'Sebaiknya hindari menyusui karena potensi efek samping hepatotoksisitas dan tromboemboli pada bayi.',
    teratogenicAlert: 'Penurunan berat badan janin dan kematian embrio pasca implantasi pada hewan coba.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Kortikosteroid Oral (Prednison)', 'IVIG (Intravenous Immunoglobulin)'],
    clinicalRecommendations: 'Pada ITP kehamilan, IVIG dan prednison adalah lini pertama yang aman. Eltrombopag hanya dipertimbangkan jika ITP refrakter mengancam jiwa.',
    references: 'FDA Revolade Label & ASH Guidelines on ITP in Pregnancy'
  },
  {
    id: 'preg-epirubicin',
    name: 'Epirubicin',
    genericName: 'Epirubicin Hydrochloride',
    category: 'Onkologi / Antrasiklin Sitotoksik',
    brandNames: ['Pharmorubicin 10 mg / 50 mg'],
    fdaCategory: 'D',
    pllrSummary: 'BUKTI POSITIF RISIKO JANIN. Mielosupresi dan kardiotoksisitas embriofetal berat.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Risiko malformasi jantung, kraniofasial, dan abortus spontan sangat tinggi.',
      trimester2: 'KATEGORI D: Dapat dipertimbangkan jika kanker payudara agresif mengancam nyawa ibu (pasca organogenesis).',
      trimester3: 'KATEGORI D: Hindari pemberian setelah usia kehamilan 35 minggu untuk mencegah neutropenia dan kardiotoksisitas neonatal saat lahir.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Menembus ke dalam ASI dan memicu supresi sumsum tulang berat pada bayi.',
    teratogenicAlert: 'Antrasiklin sitotoksik memicu kematian seluler janin, kardiomiopati kongenital, dan mikrosefali.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Jika terpaksa diberikan pada trimester 2-3 untuk kanker payudara lanjut, jadwalkan persalinan minimal 3-4 minggu pasca siklus terakhir untuk pemulihan sumsum tulang janin.',
    references: 'FDA Pharmorubicin Label & ESMO Guidelines on Cancer in Pregnancy'
  },
  {
    id: 'preg-eribulin',
    name: 'Eribulin',
    genericName: 'Eribulin Mesylate',
    category: 'Onkologi / Inhibitor Mikrotubulus',
    brandNames: ['Halaven 1 mg / 2 mL'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI PADA KEHAMILAN. Racun mikrotubulus sitotoksik kuat yang memicu kematian embrio.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Malformasi struktural multipel dan kematian embrio dini.',
      trimester2: 'KATEGORI D: Hambatan pertumbuhan janin berat dan supresi hematopoietik.',
      trimester3: 'KATEGORI D: Neutropenia neonatal parah dan kematian perinatal.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan menyusui permanen.',
    teratogenicAlert: 'Inhibitor polimerisasi mikrotubulus merusak pembelahan mitosis seluler embrio.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Wajib verifikasi kehamilan negatif sebelum terapi. Gunakan kontrasepsi barrier ganda selama terapi dan 2 minggu setelahnya.',
    references: 'FDA Halaven Label'
  },
  {
    id: 'preg-epoetin-alfa',
    name: 'Epoetin Alfa',
    genericName: 'Epoetin Alfa / Erythropoietin',
    category: 'Hematologi / ESA',
    brandNames: ['Hemapo', 'Recormon', 'Eprex'],
    fdaCategory: 'C',
    pllrSummary: 'Molekul protein glikoprotein besar tidak menembus barier plasenta dalam jumlah bermakna. Aman bila diindikasikan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak menunjukkan efek teratogenik bermakna. Aman jika anemia GGK berat.',
      trimester2: 'KATEGORI C: Pantau tekanan darah ketat (skrining preeklampsia).',
      trimester3: 'KATEGORI C: Targetkan Hb 10-11 g/dL untuk mencegah komplikasi plasenta.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Aman saat menyusui. Hormon alami ini terdapat dalam kolostrum ASI dan terdegradasi di lambung bayi.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas langsung pada manusia.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Zat Besi Sukrosa Parenteral', 'Transfusi PRC jika darurat'],
    clinicalRecommendations: 'Dapat digunakan pada ibu hamil dengan anemia Penyakit Ginjal Kronis berat. Pantau tekanan darah ketat karena ESA dapat memicu lonjakan tensi.',
    references: 'Briggs Drugs in Pregnancy and Lactation & KDIGO Guidelines'
  },
  {
    id: 'preg-erlotinib',
    name: 'Erlotinib',
    genericName: 'Erlotinib Hydrochloride',
    category: 'Onkologi / TKI EGFR',
    brandNames: ['Tarceva 100 mg / 150 mg'],
    fdaCategory: 'D',
    pllrSummary: 'Penghambatan EGFR mengganggu perkembangan plasenta dan organogenesis janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Abortus spontan dini dan defek embriogenesis.',
      trimester2: 'KATEGORI D: Oligohidramnion dan gangguan pertumbuhan janin intrauterin.',
      trimester3: 'KATEGORI D: Kematian perinatal dan prematuritas ekstrem.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan menyusui selama terapi dan 2 minggu pasca dosis terakhir.',
    teratogenicAlert: 'Pensinyalan EGFR esensial untuk implantasi plasenta dan maturasi epitel janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hindari kehamilan selama terapi. Tes kehamilan wajib negatif sebelum memulai obat.',
    references: 'FDA Tarceva Prescribing Information'
  },
  {
    id: 'preg-etoposide',
    name: 'Etoposide',
    genericName: 'Etoposide / VP-16',
    category: 'Onkologi / Topoisomerase II Inhibitor',
    brandNames: ['Lastet 50 mg', 'Etoposide 100 mg Injeksi'],
    fdaCategory: 'D',
    pllrSummary: 'BUKTI TERATOGENIK DAN EMBRIOTOKSIK KUAT PADA MANUSIA. Merusak DNA janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi kraniofasial, skeletal, dan kematian janin.',
      trimester2: 'KATEGORI D: Hambatan pertumbuhan janin dan supresi sumsum tulang berat.',
      trimester3: 'KATEGORI D: Pansitopenia neonatal parah dan risiko leukemia kongenital.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Obat sitotoksik kuat yang diekskresikan ke dalam ASI.',
    teratogenicAlert: 'Pemutusan untai ganda DNA memicu mutasi aberasi kromosom dan malformasi kongenital luas.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hindari kehamilan secara mutlak selama kemoterapi etoposide.',
    references: 'FDA Etoposide Label & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-everolimus',
    name: 'Everolimus',
    genericName: 'Everolimus',
    category: 'Onkologi & Imunosupresan / Inhibitor mTOR',
    brandNames: ['Afinitor', 'Certican'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI PADA KEHAMILAN. Penghambatan mTOR melumpuhkan proliferasi seluler embrio.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Embriotoksisitas dini, keguguran spontan, dan kelainan skeletal.',
      trimester2: 'KATEGORI D: Hambatan pertumbuhan janin parah dan oligohidramnion.',
      trimester3: 'KATEGORI D: Supresi imun janin dan prematuritas.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui.',
    teratogenicAlert: 'Penghambatan mTORC1 mengganggu diferensiasi sel punca dan angiogenesis plasenta.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Azathioprine (pada transplantasi)', 'Kortikosteroid'],
    clinicalRecommendations: 'Gunakan kontrasepsi efektif selama terapi dan hingga 8 minggu pasca dosis terakhir.',
    references: 'FDA Afinitor / Certican Prescribing Information'
  },
  {
    id: 'preg-filgrastim',
    name: 'Filgrastim',
    genericName: 'Filgrastim / G-CSF',
    category: 'Hematologi / G-CSF',
    brandNames: ['Neupogen', 'Leucogen'],
    fdaCategory: 'C',
    pllrSummary: 'Protein rekombinan menembus plasenta secara minimal pada trimester 1, meningkat di trimester 3.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak menunjukkan pola malformasi kongenital pada kasus terbatas.',
      trimester2: 'KATEGORI C: Dapat digunakan jika ibu mengalami sepsis neutropenia berat.',
      trimester3: 'KATEGORI C: Transient leukositosis neonatal dapat terjadi.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Cukup Aman. Molekul protein besar terdegradasi di saluran cerna bayi.',
    teratogenicAlert: 'Tidak ada bukti teratogenesis mayor pada manusia.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Antibiotik Profilaksis Spektrum Luas'],
    clinicalRecommendations: 'Dapat digunakan untuk menyelamatkan nyawa ibu hamil dengan neutropenia febril berat atau anemia aplastik.',
    references: 'Briggs Drugs in Pregnancy and Lactation & Reprotox'
  },
  {
    id: 'preg-fludarabine',
    name: 'Fludarabine',
    genericName: 'Fludarabine Phosphate',
    category: 'Onkologi / Antimetabolit Analog Purin',
    brandNames: ['Fludara 50 mg'],
    fdaCategory: 'D',
    pllrSummary: 'TERATOGENIK DAN EMBRIOLEPTAL BERAT. Mengacaukan sintesis DNA seluler janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi anggota gerak, kraniofasial, dan abortus.',
      trimester2: 'KATEGORI D: Pansitopenia janin intrauterin dan hambatan pertumbuhan parah.',
      trimester3: 'KATEGORI D: Supresi sumsum tulang neonatal dan infeksi oportunistik mematikan.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Supresi imun fatal pada bayi.',
    teratogenicAlert: 'Analog purin sitotoksik menghentikan replikasi DNA jaringan janin yang sedang berkembang.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Kontrasepsi efektif wajib digunakan selama terapi dan minimal 6 bulan setelah terapi selesai.',
    references: 'FDA Fludara Prescribing Information'
  },
  {
    id: 'preg-fluorouracil',
    name: 'Fluorouracil',
    genericName: '5-Fluorouracil / 5-FU',
    category: 'Onkologi / Antimetabolit Pirimidin',
    brandNames: ['Curacil 500 mg', '5-FU Generik'],
    fdaCategory: 'D',
    pllrSummary: 'TERATOGENIK DAN EMBRIOTOKSIK KUAT PADA TRIMESTER PERTAMA.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi kraniofasial, bibir sumbing, defek jantung, dan abortus.',
      trimester2: 'KATEGORI D: Dapat dipertimbangkan jika kanker kolorektal/payudara stadium lanjut mengancam nyawa ibu.',
      trimester3: 'KATEGORI D: Hindari dalam 3-4 minggu menjelang taksiran persalinan (cegah sepsis neonatal).'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Obat sitotoksik menembus ke dalam ASI.',
    teratogenicAlert: 'Menghambat sintesis DNA via timidilat sintase memicu anomali kongenital multipel.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Trimester 1 kontraindikasi mutlak. Jika digunakan pada trimester 2-3, monitor ketat pertumbuhan janin via USG Doppler serial.',
    references: 'FDA 5-FU Label & ESMO Clinical Guidelines'
  },
  {
    id: 'preg-fulvestrant',
    name: 'Fulvestrant',
    genericName: 'Fulvestrant',
    category: 'Onkologi / SERD Murni',
    brandNames: ['Faslodex 250 mg / 5 mL'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA KEHAMILAN. Degradasi reseptor estrogen memicu keguguran spontan dan anomali janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Kematian embrio pasca implantasi dan malformasi tulang.',
      trimester2: 'KATEGORI X: Hambatan pertumbuhan janin berat dan kematian intrauterin.',
      trimester3: 'KATEGORI X: Kematian janin dan gangguan diferensiasi genital.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui.',
    teratogenicAlert: 'Penghancuran reseptor estrogen menghentikan sinyal endokrin esensial bagi kelangsungan plasenta dan janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Pastikan status tidak hamil sebelum penyuntikan. Gunakan kontrasepsi efektif selama terapi dan 1 tahun setelah dosis terakhir (waktu paruh sangat panjang).',
    references: 'FDA Faslodex Prescribing Information'
  },
  {
    id: 'preg-factor-ix',
    name: 'Coagulation Factor IX',
    genericName: 'Factor IX Complex (Human)',
    category: 'Hematologi / Faktor Pembekuan IX',
    brandNames: ['Octanine F', 'Koate-DVI'],
    fdaCategory: 'C',
    pllrSummary: 'Protein plasma alami manusia. Tidak menembus barier plasenta karena bobot molekul besar.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak bersifat teratogenik. Aman jika dibutuhkan untuk hemostasis ibu.',
      trimester2: 'KATEGORI C: Aman digunakan untuk profilaksis perdarahan.',
      trimester3: 'KATEGORI C: Sangat penting untuk persiapan persalinan pada carrier hemofilia B dengan defisiensi faktor IX.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui. Molekul protein besar terdegradasi di lambung bayi.',
    teratogenicAlert: 'Tidak ada risiko teratogenisitas.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Asam Traneksamat (bila perdarahan mukosa ringan)'],
    clinicalRecommendations: 'Pemberian faktor IX aman dan krusial selama kehamilan dan persalinan pada wanita carrier hemofilia B simtomatik.',
    references: 'World Federation of Hemophilia (WFH) Guidelines'
  },
  {
    id: 'preg-prothrombin-complex',
    name: 'Prothrombin Complex Concentrate (PCC)',
    genericName: '4-Factor PCC',
    category: 'Hematologi / Konsentrat Kompleks Protrombin',
    brandNames: ['Cofact', 'Octaplex', 'Kcentra'],
    fdaCategory: 'C',
    pllrSummary: 'Konsentrat faktor pembekuan darah plasma manusia. Digunakan darurat untuk perdarahan mayor mengancam jiwa.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman jika diindikasikan darurat.',
      trimester2: 'KATEGORI C: Aman untuk pembalikan darurat antikoagulan.',
      trimester3: 'KATEGORI C: Penyelamat jiwa pada perdarahan postpartum masif atau bedah sesar darurat.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Cukup Aman saat menyusui jika diperlukan darurat.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Fresh Frozen Plasma (FFP)', 'Phytomenadione (Vit K1)'],
    clinicalRecommendations: 'PCC 4-faktor adalah terapi baku emas darurat untuk perdarahan mayor akibat warfarin atau defisiensi faktor pembekuan berat pada kehamilan.',
    references: 'ACOG Practice Bulletin on Critical Care in Pregnancy'
  },
  {
    id: 'preg-factor-viia',
    name: 'Factor VIIa Recombinant',
    genericName: 'Eptacog Alfa (Activated)',
    category: 'Hematologi / Faktor VIIa Rekombinan',
    brandNames: ['NovoSeven 1 mg / 2 mg'],
    fdaCategory: 'C',
    pllrSummary: 'Protein rekombinan hemostatik darurat. Sangat efektif untuk perdarahan postpartum (PPH) refrakter.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak menembus plasenta secara bermakna.',
      trimester2: 'KATEGORI C: Aman jika diindikasikan darurat.',
      trimester3: 'KATEGORI C: Terapi penyelamat rahim dan jiwa pada syok hemoragik PPH persalinan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel saat menyusui pasca persalinan darurat.',
    teratogenicAlert: 'Tidak ada risiko teratogenesis.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Uterotonika (Oksitosin, Metilergometrin)', 'Asam Traneksamat IV'],
    clinicalRecommendations: 'Digunakan sebagai bypass agent hemostatik darurat pada PPH masif refrakter sebelum tindakan histerektomi darurat.',
    references: 'FIGO Guidelines on Prevention and Treatment of Postpartum Hemorrhage'
  },
  {
    id: 'preg-factor-viii',
    name: 'Antihemophilic Factor VIII',
    genericName: 'Factor VIII Concentrate (Human)',
    category: 'Hematologi / Faktor VIII Konsentrat',
    brandNames: ['Haemoctin', 'Koate', 'Octanate'],
    fdaCategory: 'C',
    pllrSummary: 'Protein plasma pembekuan darah alami manusia. Tidak menembus plasenta.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman jika diperlukan untuk menghentikan perdarahan.',
      trimester2: 'KATEGORI C: Aman untuk profilaksis tindakan invasif.',
      trimester3: 'KATEGORI C: Wajib diberikan pada carrier hemofilia A dengan kadar faktor VIII rendah menjelang persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui.',
    teratogenicAlert: 'Tidak bersifat teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Desmopressin (pada Hemofilia A ringan)'],
    clinicalRecommendations: 'Periksa kadar faktor VIII pada trimester 3 kehamilan pada wanita carrier hemofilia A untuk merencanakan persalinan aman (target >50 IU/dL).',
    references: 'WFH Guidelines for the Management of Hemophilia'
  },
  {
    id: 'preg-feracrylum',
    name: 'Feracrylum',
    genericName: 'Feracrylum',
    category: 'Hematologi / Hemostatik Topikal',
    brandNames: ['Hemolok 1%'],
    fdaCategory: 'B',
    pllrSummary: 'Aplikasi topikal luar permukaan luka. Absorpsi sistemik dapat diabaikan.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman untuk aplikasi luka luar.',
      trimester2: 'KATEGORI B: Aman untuk luka operasi / trauma.',
      trimester3: 'KATEGORI B: Aman untuk luka episiotomi atau bedah sesar.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel untuk aplikasi luka luar non-payudara.',
    teratogenicAlert: 'Tidak ada efek teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Tekanan Kasa Steril Langsung'],
    clinicalRecommendations: 'Aman digunakan secara topikal untuk hemostasis luka bedah atau cabut gigi pada ibu hamil.',
    references: 'Clinical Pharmacology & Safety Data'
  },
  {
    id: 'preg-ephedrine',
    name: 'Ephedrine',
    genericName: 'Ephedrine Hydrochloride',
    category: 'Kardiovaskular & Anestesi / Vasopresor Simpatomimetik',
    brandNames: ['Efedrin Injeksi 50 mg/mL'],
    fdaCategory: 'C',
    pllrSummary: 'Menembus plasenta secara cepat. Vasopresor baku emas historis pada anestesi spinal seksio sesarea.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari pemakaian kronis (vasokonstriksi utero-plasenta).',
      trimester2: 'KATEGORI C: Gunakan hanya untuk hipotensi akut darurat.',
      trimester3: 'KATEGORI C: Aman dan efektif untuk hipotensi anestesi spinal seksio sesarea (dosis tinggi dapat memicu asidosis janin ringan transien).'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '1-3%',
    breastfeedingSummary: 'Dapat diekskresikan ke dalam ASI; dapat memicu iritabilitas pada bayi; gunakan dengan hati-hati.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas pada pemakaian anestesi akut.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Phenylephrine IV (lebih disukai untuk cegah asidosis janin)'],
    clinicalRecommendations: 'Vasopresor lini pertama/kedua bersama Phenylephrine untuk mempertahankan tekanan darah ibu saat operasi sesar bius separuh badan.',
    references: 'SOAP Consensus Statement on Management of Hypotension during Spinal Anesthesia for Cesarean Delivery'
  },
  {
    id: 'preg-phenylephrine',
    name: 'Phenylephrine',
    genericName: 'Phenylephrine Hydrochloride',
    category: 'Kardiovaskular & Anestesi / Vasopresor Alfa-1 Murni',
    brandNames: ['Phenylephrine Injeksi', 'Cendo Efrisel'],
    fdaCategory: 'C',
    pllrSummary: 'VASOPRESOR PILIHAN UTAMA KONSENSUS INTERNASIONAL untuk hipotensi anestesi spinal seksio sesarea.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari penggunaan oral dekongestan trimester 1.',
      trimester2: 'KATEGORI C: Aman untuk hipotensi akut anestesi.',
      trimester3: 'KATEGORI C: Vasopresor lini pertama pilihan seksio sesarea (mempertahankan pH tali pusat janin lebih baik dibanding efedrin).'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Cukup Aman untuk penggunaan akut perioperatif atau tetes mata dengan oklusi sudut mata.',
    teratogenicAlert: 'Tidak teratogenik pada penggunaan vasopresor akut.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Ephedrine IV'],
    clinicalRecommendations: 'Phenylephrine infus atau bolus adalah vasopresor baku emas pilihan pertama pada operasi sesar karena tidak menurunkan pH darah janin.',
    references: 'SOAP Guidelines & British Journal of Anaesthesia'
  },
  {
    id: 'preg-entecavir',
    name: 'Entecavir',
    genericName: 'Entecavir',
    category: 'Anti-Infeksi / Antivirus Hepatitis B',
    brandNames: ['Baraclude 0.5 mg / 1 mg'],
    fdaCategory: 'C',
    pllrSummary: 'Data kehamilan terbatas. Tenofovir disoproxil (TDF) lebih disukai sebagai pilihan pertama Hepatitis B pada kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Jika pasien hamil saat minum entecavir, diskusikan penggantian ke Tenofovir (TDF).',
      trimester2: 'KATEGORI C: Pertimbangkan beralih ke Tenofovir TDF untuk pencegahan transmisi vertikal.',
      trimester3: 'KATEGORI C: Beralih ke Tenofovir (TDF) yang memiliki profil keamanan kehamilan Kategori B luas.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 'Tidak diketahui',
    breastfeedingSummary: 'Sebaiknya hindari menyusui atau ganti ke Tenofovir yang telah terbukti aman saat menyusui.',
    teratogenicAlert: 'Toksisitas skeletal pada dosis maternal toksik hewan coba.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Tenofovir Disoproxil Fumarate (TDF - Kategori B, Pilihan Utama Kehamilan)'],
    clinicalRecommendations: 'Pada wanita hamil dengan Hepatitis B kronis, TENOFOVIR (TDF) adalah obat pilihan utama (rekomendasi WHO & PPHI). Jika hamil saat memakai entecavir, segera konsultasikan penggantian ke TDF.',
    references: 'WHO Guidelines on Hepatitis B & AASLD Practice Guidance'
  },
  {
    id: 'preg-phenoxymethylpenicillin',
    name: 'Phenoxymethylpenicillin',
    genericName: 'Penicillin V Potassium',
    category: 'Anti-Infeksi / Antibiotik Penisilin Oral',
    brandNames: ['Fenoksimetilpenisilin KF', 'Ospen 500 mg'],
    fdaCategory: 'B',
    pllrSummary: 'ANTIBIOTIK SANGAT AMAN PADA KEHAMILAN. Telah digunakan luas selama puluhan tahun tanpa efek teratogenik.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Sangat aman. Tidak meningkatkan risiko malformasi kongenital.',
      trimester2: 'KATEGORI B: Sangat aman untuk faringitis dan profilaksis demam rematik.',
      trimester3: 'KATEGORI B: Sangat aman hingga waktu persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui. Masuk ke ASI dalam jumlah sangat kecil.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Amoxicillin', 'Cephalexin', 'Erythromycin (bila alergi penisilin)'],
    clinicalRecommendations: 'Pilihan antibiotik yang sangat aman untuk faringitis streptokokus dan profilaksis demam rematik pada ibu hamil.',
    references: 'Briggs Drugs in Pregnancy and Lactation & CDC Guidelines'
  },
  {
    id: 'preg-fosfomycin',
    name: 'Fosfomycin',
    genericName: 'Fosfomycin Trometamol',
    category: 'Anti-Infeksi / Antibiotik ISK Dosis Tunggal',
    brandNames: ['Monuril 3 g Sachet'],
    fdaCategory: 'B',
    pllrSummary: 'ANTIBIOTIK LINI PERTAMA SANGAT AMAN UNTUK SISTITIS AKUT KEHAMILAN DOSIS TUNGGAL.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Sangat aman. Dosis tunggal meminimalkan paparan janin.',
      trimester2: 'KATEGORI B: Pilihan utama ISK tanpa komplikasi dan bakteriuria asimtomatik pada kehamilan.',
      trimester3: 'KATEGORI B: Sangat aman hingga akhir kehamilan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui. Dosis tunggal sangat membatasi ekskresi ke ASI.',
    teratogenicAlert: 'Tidak bersifat teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Nitrofurantoin (hindari aterm)', 'Cefuroxime Axetil', 'Amoxicillin-Clavulanate'],
    clinicalRecommendations: 'Fosfomycin trometamol 3 gram dosis tunggal adalah salah satu lini pertama paling direkomendasikan untuk sistitis akut dan bakteriuria asimtomatik pada kehamilan (EAU & ACOG).',
    references: 'ACOG Practice Bulletin on UTI in Pregnancy & EAU Urological Infections Guidelines'
  },
  {
    id: 'preg-framycetin',
    name: 'Framycetin',
    genericName: 'Framycetin Sulphate',
    category: 'Dermatologi / Kasa Steril Antibiotik Topikal',
    brandNames: ['Sofra-Tulle 1%'],
    fdaCategory: 'C',
    pllrSummary: 'Aplikasi topikal luar kasa steril. Absorpsi sistemik minimal kecuali luka bakar sangat luas.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk luka luar terbatas.',
      trimester2: 'KATEGORI C: Aman untuk luka bakar atau luka jahitan.',
      trimester3: 'KATEGORI C: Hindari aplikasi pada area luka bakar sangat luas (>20% LPT).'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel pada luka luar non-payudara.',
    teratogenicAlert: 'Tidak ada teratogenisitas pada penggunaan topikal normal.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Salep Bacitracin-Polymyxin', 'Mupirocin Topikal'],
    clinicalRecommendations: 'Aman digunakan untuk balutan luka bakar atau lecet pada ibu hamil.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-etanercept',
    name: 'Etanercept',
    genericName: 'Etanercept',
    category: 'Imunologi / Anti-TNF Biologis',
    brandNames: ['Enbrel 25 mg / 50 mg'],
    fdaCategory: 'B',
    pllrSummary: 'Transfer plasenta minimal pada trimester 1 dan 2, meningkat pada trimester 3 via reseptor Fc.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman untuk konsepsi dan organogenesis. Tidak meningkatkan risiko cacat lahir.',
      trimester2: 'KATEGORI B: Dapat dilanjutkan untuk menjaga remisi penyakit autoimun ibu.',
      trimester3: 'KATEGORI B: Pertimbangkan penghentian pada minggu ke 30-32 untuk mencegah imunosupresi neonatal, atau tunda vaksin hidup pada bayi hingga usia 6 bulan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui. Molekul protein besar terdegradasi di lambung bayi.',
    teratogenicAlert: 'Tidak ada bukti teratogenesis mayor pada manusia.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Certolizumab Pegol (Anti-TNF tanpa fragmen Fc, paling disukai pada kehamilan)'],
    clinicalRecommendations: 'Dapat dilanjutkan selama kehamilan jika diperlukan untuk mengendalikan Artritis Reumatoid aktif. Jika dipakai di trimester 3 akhir, vaksin hidup (BCG, Rotavirus) pada bayi WAJIB DITUNDA hingga usia 6 bulan.',
    references: 'ACR Guidelines for the Management of Reproductive Health in Rheumatic Diseases'
  },
  {
    id: 'preg-conjugated-estrogens',
    name: 'Conjugated Estrogens',
    genericName: 'Conjugated Estrogens',
    category: 'Endokrinologi / Estrogen Terkonjugasi',
    brandNames: ['Premarin 0.625 mg'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA KEHAMILAN. Tidak ada indikasi medis dan berisiko anomali urogenital janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: KONTRAINDIKASI MUTLAK. Risiko feminisasi genital janin laki-laki dan kelainan kardiovaskular.',
      trimester2: 'KATEGORI X: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI X: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Tidak direkomendasikan',
    breastfeedingSummary: 'KONTRAINDIKASI saat menyusui. Estrogen menekan hormon prolaktin dan melumpuhkan produksi ASI.',
    teratogenicAlert: 'Gangguan diferensiasi seksual organ genitalia janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'KONTRAINDIKASI MUTLAK selama kehamilan dan masa menyusui.',
    references: 'FDA Premarin Prescribing Information'
  },
  {
    id: 'preg-etonogestrel',
    name: 'Etonogestrel',
    genericName: 'Etonogestrel',
    category: 'Kontrasepsi / Implan Progestin Subdermal',
    brandNames: ['Implanon NXT 68 mg'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI SAAT HAMIL (tidak ada indikasi KB saat hamil). SANGAT AMAN UNTUK IBU MENYUSUI.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Lepas implan jika kehamilan terkonfirmasi (meskipun data menunjukkan tidak ada cacat lahir mayor).',
      trimester2: 'KATEGORI X: Tidak diindikasikan.',
      trimester3: 'KATEGORI X: Tidak diindikasikan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'KOMPATIBEL DAN SANGAT AMAN UNTUK IBU MENYUSUI. Merupakan pilihan kontrasepsi baku emas pasca persalinan.',
    teratogenicAlert: 'Tidak ada bukti teratogenik bermakna jika terjadi kehamilan aksidental.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Kondom Barrier', 'IUD Tembaga (Cu-IUD)'],
    clinicalRecommendations: 'Pilihan kontrasepsi ideal yang dapat dipasang segera pasca persalinan (hari ke-21-28) pada ibu menyusui karena tidak mengganggu volume atau kualitas ASI.',
    references: 'WHO Medical Eligibility Criteria for Contraceptive Use & CDC US MEC'
  },
  {
    id: 'preg-fenoterol',
    name: 'Fenoterol',
    genericName: 'Fenoterol Hydrobromide',
    category: 'Respirasi / SABA Inhalasi',
    brandNames: ['Berotec 100 mcg MDI'],
    fdaCategory: 'B',
    pllrSummary: 'Inhalasi topikal paru dengan absorpsi sistemik rendah. Aman untuk serangan asma akut saat hamil.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Aman untuk pereda sesak napas akut. Mencegah hipoksia maternal-fetal.',
      trimester2: 'KATEGORI B: Aman digunakan bila timbul serangan sesak.',
      trimester3: 'KATEGORI B: Aman (dosis sangat tinggi parenteral dapat memiliki efek tokolitik merelaksasikan rahim).'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Aman saat menyusui pada dosis inhalasi lazim.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Salbutamol Inhaler (SABA paling banyak data kehamilan)'],
    clinicalRecommendations: 'Hipoksia akibat serangan asma ibu jauh lebih berbahaya bagi janin dibanding obat inhalasi. Gunakan segera saat sesak napas akut.',
    references: 'GINA Guidelines on Asthma in Pregnancy & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-fludrocortisone',
    name: 'Fludrocortisone',
    genericName: 'Fludrocortisone Acetate',
    category: 'Endokrinologi / Mineralokortikoid',
    brandNames: ['Florinef 0.1 mg'],
    fdaCategory: 'C',
    pllrSummary: 'TERAPI SULIH FISIOLOGIS WAJIB DILANJUTKAN PADA PENYAKIT ADDISON SAAT HAMIL.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman dan esensial untuk mencegah krisis adrenal maternal dan syok.',
      trimester2: 'KATEGORI C: Lanjutkan terapi; dosis dapat perlu sedikit dinaikkan di akhir kehamilan.',
      trimester3: 'KATEGORI C: Esensial untuk mempertahankan volume sirkulasi darah dan elektrolit.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel pada dosis terapi sulih fisiologis.',
    teratogenicAlert: 'Tidak teratogenik pada dosis pengganti fisiologis.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Hydrocortisone Oral / IV'],
    clinicalRecommendations: 'JANGAN PERNAH MENGHENTIKAN fludrokortison pada ibu hamil dengan Penyakit Addison atau CAH karena dapat memicu krisis adrenal fatal bagi ibu dan janin.',
    references: 'Endocrine Society Clinical Practice Guideline on Adrenal Insufficiency'
  },
  {
    id: 'preg-fluphenazine-decanoate',
    name: 'Fluphenazine Decanoate',
    genericName: 'Fluphenazine Decanoate',
    category: 'Psikiatri / Antipsikotik Tipikal Depo',
    brandNames: ['Sikzonoate 25 mg / mL Ampul Depo'],
    fdaCategory: 'C',
    pllrSummary: 'Risiko gejala ekstrapiramidal dan sindrom putus obat neonatal pada paparan trimester ketiga.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Data manusia terbatas; evaluasi risiko relaps psikosis versus potensi anomali kongenital ringan.',
      trimester2: 'KATEGORI C: Dapat dilanjutkan jika stabilitas mental ibu tergantung suntikan depo.',
      trimester3: 'KATEGORI C: Risiko gejala ekstrapiramidal neonatal (tremor, hipertonia, gangguan menyusu) pasca lahir.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '1-3%',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI; dapat memicu somnolen pada bayi; monitor ketat.',
    teratogenicAlert: 'Tidak ada bukti teratogenesis mayor konsisten.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Haloperidol Oral', 'Olanzapine Oral (lebih mudah dititrasi dibanding sediaan depo)'],
    clinicalRecommendations: 'Jika memungkinkan, pertimbangkan beralih ke antipsikotik oral yang dapat dititrasi mendekati persalinan untuk meminimalkan EPS pada bayi baru lahir.',
    references: 'FDA Sikzonoate Label & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-fluorometholone',
    name: 'Fluorometholone',
    genericName: 'Fluorometholone',
    category: 'Oftalmologi / Kortikosteroid Tetes Mata',
    brandNames: ['Flamar', 'Cendo Posop 0.1%'],
    fdaCategory: 'C',
    pllrSummary: 'Aplikasi tetes mata lokal dengan absorpsi sistemik sangat rendah bila dilakukan oklusi nasolakrimalis.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk terapi mata pasca bedah dengan oklusi nasolakrimalis.',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Aman saat menyusui dengan menekan sudut mata saat meneteskan.',
    teratogenicAlert: 'Tidak ada bukti teratogenesis pada pemakaian oftalmik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Loteprednol Tetes Mata'],
    clinicalRecommendations: 'Aman digunakan untuk mata pasca operasi. Anjurkan ibu menekan sudut mata dekat hidung selama 1-2 menit setelah meneteskan obat.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-fluocinolone',
    name: 'Fluocinolone Acetonide',
    genericName: 'Fluocinolone Acetonide',
    category: 'Dermatologi / Kortikosteroid Topikal Poten',
    brandNames: ['Synalar 0.025%'],
    fdaCategory: 'C',
    pllrSummary: 'Kortikosteroid topikal poten. Hindari pemakaian luas jangka panjang pada kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk area kulit terbatas. Hindari pemakaian luas di perut.',
      trimester2: 'KATEGORI C: Gunakan jangka pendek (<2 minggu) pada lesi terbatas.',
      trimester3: 'KATEGORI C: Pemakaian sangat luas (>300 g) dikaitkan dengan berat badan lahir rendah (BBLR).'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel jika diaplikasikan pada area kulit terbatas non-payudara.',
    teratogenicAlert: 'Tidak teratogenik pada dosis topikal normal.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Hydrocortisone Topikal 1-2.5% (Steroid Lemak Lini Pertama Kehamilan)'],
    clinicalRecommendations: 'Gunakan steroid potensi ringan (Hidrokortison) terlebih dahulu. Jika butuh fluocinolone, batasi durasi maksimal 1-2 minggu pada area kecil.',
    references: 'RCOG Green-top Guideline on Skin Conditions in Pregnancy'
  },
  {
    id: 'preg-fluticasone-propionate',
    name: 'Fluticasone Propionate',
    genericName: 'Fluticasone Propionate',
    category: 'Respirasi / Kortikosteroid Inhalasi Kontroler Asma',
    brandNames: ['Flixotide', 'Cutivate'],
    fdaCategory: 'C',
    pllrSummary: 'Bioavailabilitas sistemik inhalasi sangat rendah (<1%). Sangat aman dan efektif untuk mengontrol asma kehamilan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman. Mencegah eksaserbasi asma dan hipoksia janin.',
      trimester2: 'KATEGORI C: Sangat aman sebagai terapi pemeliharaan harian.',
      trimester3: 'KATEGORI C: Sangat aman hingga persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui. Kadar dalam ASI tidak terdeteksi.',
    teratogenicAlert: 'Tidak ada bukti teratogenesis pada pemakaian inhalasi.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Budesonide Inhaler (Kategori B, steroid inhalasi paling banyak data kehamilan)'],
    clinicalRecommendations: 'Ibu hamil dengan asma persisten WAJIB melanjutkan steroid inhalasi pengontrol untuk mencegah serangan asma yang membahayakan janin.',
    references: 'GINA Guidelines on Asthma in Pregnancy & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-fluvoxamine',
    name: 'Fluvoxamine',
    genericName: 'Fluvoxamine Maleate',
    category: 'Psikiatri / SSRI Baku Emas OCD',
    brandNames: ['Luvox 50 mg / 100 mg'],
    fdaCategory: 'C',
    pllrSummary: 'SSRI baku emas OCD. Risiko Poor Neonatal Adaptation Syndrome (PNAS) ringan transien pada paparan trimester akhir.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak menunjukkan peningkatan risiko malformasi kardiovaskular mayor secara bermakna.',
      trimester2: 'KATEGORI C: Pertahankan remisi OCD dan depresi ibu.',
      trimester3: 'KATEGORI C: Risiko PNAS (iritabilitas ringan, gangguan menyusu transien) dan PPHN (sangat jarang).'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: '<1.5%',
    breastfeedingSummary: 'Kompatibel / Aman saat menyusui. Kadar ekskresi ke dalam ASI sangat rendah dibanding SSRI lain.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas mayor.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Sertraline (SSRI paling banyak data kehamilan dan laktasi)'],
    clinicalRecommendations: 'Pada pasien dengan OCD berat yang stabil dengan fluvoxamine, terapi dapat dilanjutkan selama kehamilan karena risiko relaps OCD berat lebih berbahaya bagi kehamilan.',
    references: 'ACOG Practice Bulletin on Psychiatric Medications in Pregnancy & LactMed'
  },
  {
    id: 'preg-ganciclovir',
    name: 'Ganciclovir',
    genericName: 'Ganciclovir Sodium',
    category: 'Anti-Infeksi / Antivirus CMV',
    brandNames: ['Cymevene 500 mg'],
    fdaCategory: 'C',
    pllrSummary: 'TERATOGENIK DAN EMBRIOTOKSIK KUAT PADA HEWAN. Potensi mutagenik dan karsinogenik tinggi.',
    trimesterRisks: {
      trimester1: 'KATEGORI C / D: KONTRAINDIKASI. Malformasi kraniofasial, skeletal, dan kematian embrio.',
      trimester2: 'KATEGORI C: Pertimbangkan hanya jika retinitis CMV maternal mengancam kebutaan permanen.',
      trimester3: 'KATEGORI C: Mielosupresi janin intrauterin berat.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Potensi karsinogenik dan toksisitas hematologik berat pada bayi.',
    teratogenicAlert: 'Penghambatan sintesis DNA memicu kematian seluler embrio dan anomali kongenital luas.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Gunakan hanya jika infeksi CMV maternal mengancam jiwa atau penglihatan. Kontrasepsi efektif wajib bagi wanita dan pria (hingga 90 hari pasca terapi).',
    references: 'FDA Cymevene Label & Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-gefitinib',
    name: 'Gefitinib',
    genericName: 'Gefitinib',
    category: 'Onkologi / TKI EGFR',
    brandNames: ['Iressa 250 mg'],
    fdaCategory: 'D',
    pllrSummary: 'PENGHAMBATAN EGFR MENGGANGGU IMPLANTASI PLASENTA DAN EMBRIOGENESIS.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI. Kematian embrio pasca implantasi dan abortus spontan.',
      trimester2: 'KATEGORI D: Hambatan pertumbuhan janin intrauterin berat.',
      trimester3: 'KATEGORI D: Penurunan berat lahir dan kematian perinatal.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Hentikan menyusui selama terapi.',
    teratogenicAlert: 'Pensinyalan EGFR esensial untuk diferensiasi epitel dan vaskularisasi plasenta.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Tes kehamilan wajib negatif sebelum inisiasi terapi. Gunakan kontrasepsi efektif selama pengobatan dan minimal 2 minggu setelahnya.',
    references: 'FDA Iressa Prescribing Information'
  },
  {
    id: 'preg-gemcitabine',
    name: 'Gemcitabine',
    genericName: 'Gemcitabine Hydrochloride',
    category: 'Onkologi / Antimetabolit Sitotoksik',
    brandNames: ['Gemzar 200 mg & 1 g'],
    fdaCategory: 'D',
    pllrSummary: 'BUKTI POSITIF TERATOGENIK DAN EMBRIOLEPTAL PADA MANUSIA DAN HEWAN.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi kraniofasial berat, ketiadaan osifikasi tulang, dan abortus.',
      trimester2: 'KATEGORI D: Supresi sumsum tulang janin dan hambatan pertumbuhan parah.',
      trimester3: 'KATEGORI D: Neutropenia dan trombositopenia neonatal parah saat lahir.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Obat sitotoksik kuat menembus ke ASI.',
    teratogenicAlert: 'Inkorporasi ke dalam DNA menghentikan replikasi seluler janin secara ireversibel.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hindari kehamilan secara mutlak selama kemoterapi gemcitabine.',
    references: 'FDA Gemzar Label & ESMO Guidelines'
  },
  {
    id: 'preg-glycopyrronium',
    name: 'Glycopyrronium Bromide',
    genericName: 'Glycopyrronium Bromide',
    category: 'Respirasi / LAMA Inhalasi Bronkodilator',
    brandNames: ['Seebri Breezhaler 50 mcg'],
    fdaCategory: 'B',
    pllrSummary: 'Senyawa amin kuaterner polar dengan absorpsi sistemik inhalasi rendah, tidak menembus barier plasenta secara bermakna.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Studi hewan tidak menunjukkan toksisitas teratogenik.',
      trimester2: 'KATEGORI B: Aman untuk kontrol bronkodilatasi pemeliharaan PPOK.',
      trimester3: 'KATEGORI B: Aman hingga persalinan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Cukup Aman saat menyusui pada dosis inhalasi lazim.',
    teratogenicAlert: 'Tidak ada bukti efek teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Ipratropium Inhaler (SAMA pilihan baku kehamilan)', 'Tiotropium Inhaler'],
    clinicalRecommendations: 'Dapat dilanjutkan pada wanita hamil dengan PPOK simtomatik jika manfaat klinis melebihi potensi risiko.',
    references: 'Briggs Drugs in Pregnancy and Lactation & GOLD Guidelines'
  },
  {
    id: 'preg-glipizide',
    name: 'Glipizide',
    genericName: 'Glipizide',
    category: 'Endokrinologi / Sulfonilurea Oral',
    brandNames: ['Glucotrol 5 mg', 'Minidiab 5 mg'],
    fdaCategory: 'C',
    pllrSummary: 'Menembus barier plasenta. Risiko hipoglikemia neonatal berat berkepanjangan jika diminum menjelang aterm.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak teratogenik mayor; namun kontrol glikemik buruk lebih berbahaya bagi organogenesis.',
      trimester2: 'KATEGORI C: Beralih ke INSULIN (baku emas kehamilan).',
      trimester3: 'KATEGORI C: Risiko hipoglikemia berat memanjang dan hiperinsulinemia pada neonatus.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1.5%',
    breastfeedingSummary: 'Kompatibel dengan pemantauan; ekskresi ke ASI minimal, pantau tanda hipoglikemia pada bayi.',
    teratogenicAlert: 'Tidak teratogenik langsung pada manusia.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Human (NPH & Reguler - Baku Emas Kehamilan)', 'Metformin'],
    clinicalRecommendations: 'Pada diabetes gestasional atau DM tipe 2 dalam kehamilan, INSULIN adalah pilihan lini pertama paling direkomendasikan (ACOG & ADA). Hentikan glipizide minimal 2 minggu pra-persalinan.',
    references: 'ADA Standards of Care in Diabetes & ACOG Practice Bulletin on Gestational Diabetes'
  },
  {
    id: 'preg-glycerol',
    name: 'Glycerol',
    genericName: 'Glycerol / Gliserin',
    category: 'Saluran Cerna / Laksatif Osmotik Rektal',
    brandNames: ['Gliserin Supositoria', 'Gliserin Enema'],
    fdaCategory: 'C',
    pllrSummary: 'Sangat aman untuk pemakaian rektal lokal jangka pendek konstipasi. Absorpsi sistemik dapat diabaikan.',
    trimesterRisks: {
      trimester1: 'KATEGORI C / B-Rektal: Sangat aman untuk konstipasi rektal.',
      trimester2: 'KATEGORI C: Pilihan aman evakuasi feses konstipasi kehamilan.',
      trimester3: 'KATEGORI C: Aman digunakan menjelang persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel dan sangat aman saat menyusui.',
    teratogenicAlert: 'Tidak ada risiko teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Laktulosa Sirup', 'Psyllium Serat', 'Polietilen Glikol (PEG)'],
    clinicalRecommendations: 'Pilihan supositoria rektal yang sangat aman untuk konstipasi akut pada ibu hamil bila terapi serat oral belum memadai.',
    references: 'Briggs Drugs in Pregnancy and Lactation & ACOG Guidelines'
  },
  {
    id: 'preg-goserelin',
    name: 'Goserelin',
    genericName: 'Goserelin Acetate',
    category: 'Endokrinologi / Agonis LHRH Depo',
    brandNames: ['Zoladex 3.6 mg & 10.8 mg'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA KEHAMILAN. Supresi poros hipofisis-ovarium memicu abortus spontan dan kematian janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: KONTRAINDIKASI MUTLAK. Abortus spontan dan anomali hormonal janin.',
      trimester2: 'KATEGORI X: KONTRAINDIKASI MUTLAK.',
      trimester3: 'KATEGORI X: KONTRAINDIKASI MUTLAK.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Menekan hormon laktasi prolaktin.',
    teratogenicAlert: 'Gangguan diferensiasi seksual janin dan kematian embrio intrauterin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'KONTRAINDIKASI MUTLAK. Pastikan tes kehamilan negatif sebelum insersi implan. Gunakan kontrasepsi non-hormonal barrier selama terapi.',
    references: 'FDA Zoladex Prescribing Information'
  },
  {
    id: 'preg-hbig',
    name: 'Hepatitis B Immunoglobulin (Human)',
    genericName: 'Hepatitis B Immunoglobulin (Human)',
    category: 'Imunologi / Imunisasi Pasif Anti-HBs',
    brandNames: ['HyperHEP B 0.5 mL', 'Hepabig'],
    fdaCategory: 'C',
    pllrSummary: 'SANGAT AMAN PADA KEHAMILAN. Protein imunoglobulin manusia alami; diindikasikan untuk profilaksis darurat.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman jika terpajan jarum suntik/darah terinfeksi.',
      trimester2: 'KATEGORI C: Aman untuk profilaksis pasca pajanan.',
      trimester3: 'KATEGORI C: Aman; SANGAT KRUSIAL DIBERIKAN PADA BAYI BARU LAHIR <12 JAM PASCA PERSALINAN.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Sangat Aman saat menyusui. Ibu HBsAg positif tetap BOLEH MENYUSUI setelah bayi menerima HBIG dan vaksin Hep B dosis 1.',
    teratogenicAlert: 'Tidak ada risiko teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Vaksinasi Aktif Hepatitis B'],
    clinicalRecommendations: 'Sangat aman diberikan pada ibu hamil yang mengalami pajanan jarum suntik terkontaminasi. Pada bayi yang lahir dari ibu HBsAg+, pemberian HBIG 0.5 mL IM bersama vaksin hepatitis B dalam 12 jam pertama adalah baku emas mutlak pencegahan penularan.',
    references: 'CDC Guidelines for Prevention of Hepatitis B Virus Infection & WHO'
  },
  {
    id: 'preg-hydroxyurea',
    name: 'Hydroxyurea',
    genericName: 'Hydroxyurea / Hydroxycarbamide',
    category: 'Onkologi & Hematologi / Penghambat Ribonukleotida Reduktase',
    brandNames: ['Hydrea 500 mg'],
    fdaCategory: 'D',
    pllrSummary: 'TERATOGENIK DAN EMBRIOTOKSIK KUAT PADA TRIMESTER PERTAMA.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi kraniofasial, skeletal, jantung, dan abortus.',
      trimester2: 'KATEGORI D: Pertimbangkan penghentian kecuali anemia sel sabit maternal krisis mengancam nyawa.',
      trimester3: 'KATEGORI D: Supresi sumsum tulang janin dan berat lahir rendah.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Diekskresikan ke dalam ASI dalam jumlah signifikan.',
    teratogenicAlert: 'Inhibisi sintesis DNA seluler memicu kecacatan organogenesis multipel.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Transfusi Tukar / Transfusi Darah Sederhana (pada Anemia Sel Sabit)', 'Interferon Alfa (pada CML/Trombositemia)'],
    clinicalRecommendations: 'Hentikan hidroksiurea minimal 3-6 bulan sebelum merencanakan kehamilan. Pada wanita hamil dengan anemia sel sabit, manajemen transfusi darah adalah alternatif pilihan yang aman.',
    references: 'FDA Hydrea Label & ASH Guidelines on Sickle Cell Disease in Pregnancy'
  },
  {
    id: 'preg-homatropine',
    name: 'Homatropine',
    genericName: 'Homatropine Hydrobromide',
    category: 'Oftalmologi / Sikloplegik & Midriatikum Tetes Mata',
    brandNames: ['Homatropin 2% Cendo'],
    fdaCategory: 'C',
    pllrSummary: 'Aplikasi tetes mata lokal. Absorpsi sistemik dapat diabaikan jika dilakukan oklusi nasolakrimalis.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman untuk uveitis anterior dengan oklusi punctum.',
      trimester2: 'KATEGORI C: Aman.',
      trimester3: 'KATEGORI C: Aman.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel jika oklusi sudut mata dilakukan; monitor penurunan produksi ASI teoritis pada dosis tinggi.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas pada pemakaian oftalmik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Tropicamide (durasi lebih singkat untuk refraksi)'],
    clinicalRecommendations: 'Aman untuk mengobati uveitis mata pada ibu hamil. WAJIB menekan sudut dalam mata (dekat hidung) selama 1-2 menit setelah meneteskan obat.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-insulin-nph',
    name: 'Insulin NPH (Isophane)',
    genericName: 'Human Insulin Isophane (NPH)',
    category: 'Endokrinologi / Insulin Basal Manusia',
    brandNames: ['Insulatard', 'Humulin N'],
    fdaCategory: 'B',
    pllrSummary: 'BAKU EMAS TERAPI INSULIN BASAL PADA KEHAMILAN. Tidak menembus plasenta dan sangat aman bagi janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI B: Sangat aman. Menormalkan glukosa darah puasa mencegah malformasi kongenital.',
      trimester2: 'KATEGORI B: Sangat aman sebagai komponen basal.',
      trimester3: 'KATEGORI B: Sangat aman; dosis insulin dititrasi naik seiring resistensi plasenta (human placental lactogen). Pantau ketat pasca salin (kebutuhan insulin anjlok).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'KOMPATIBEL DAN SANGAT AMAN SAAT MENYUSUI. Molekul protein besar terdegradasi di lambung bayi.',
    teratogenicAlert: 'Tidak ada efek teratogenik sama sekali.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Detemir (Analog Basal Kategori B)', 'Insulin Reguler (Prandial)'],
    clinicalRecommendations: 'PILIHAN BAKU EMAS KONSENSUS DUNIA untuk kontrol glukosa basal pada Diabetes Gestasional dan DM Pragestasional (ACOG, ADA, PERKENI).',
    references: 'ACOG Practice Bulletin on Gestational Diabetes & ADA Standards of Care'
  },
  {
    id: 'preg-tetanus-immunoglobulin',
    name: 'Tetanus Immunoglobulin (Human)',
    genericName: 'Human Tetanus Immunoglobulin (HTIG)',
    category: 'Imunologi / Imunisasi Pasif Antitoksin Tetanus',
    brandNames: ['Tetagam P 250 IU', 'HyperTET'],
    fdaCategory: 'C',
    pllrSummary: 'SANGAT AMAN DAN ESENSIAL PADA KEHAMILAN UNTUK LUKA KOTOR BERISIKO TETANUS.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Aman dan menyelamatkan nyawa.',
      trimester2: 'KATEGORI C: Aman untuk profilaksis luka berisiko.',
      trimester3: 'KATEGORI C: Sangat aman untuk pencegahan tetanus maternal dan tetanus neonatorum.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel dan sangat aman saat menyusui.',
    teratogenicAlert: 'Tidak ada efek teratogenik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Vaksin Tetanus Toksoid (Td)'],
    clinicalRecommendations: 'Pemberian HTIG 250 IU IM aman dan wajib diberikan pada ibu hamil dengan luka kotor rentan tetanus yang belum memiliki riwayat vaksinasi lengkap.',
    references: 'CDC Guidelines on Tetanus Prophylaxis in Wound Management & WHO'
  },
  {
    id: 'preg-idarubicin',
    name: 'Idarubicin',
    genericName: 'Idarubicin Hydrochloride',
    category: 'Onkologi / Antrasiklin Sitotoksik Leukemia',
    brandNames: ['Zavedos 5 mg & 10 mg'],
    fdaCategory: 'D',
    pllrSummary: 'BUKTI POSITIF RISIKO JANIN. Mielosupresi dan kardiotoksisitas embriofetal berat.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi kardiak, kraniofasial, dan abortus spontan.',
      trimester2: 'KATEGORI D: Dapat dipertimbangkan pada leukemia AML akut mengancam nyawa ibu (rejimen 3+7).',
      trimester3: 'KATEGORI D: Hindari dalam 3-4 minggu menjelang taksiran persalinan (cegah sepsis neonatal dan kardiotoksisitas).'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Supresi sumsum tulang parah pada bayi.',
    teratogenicAlert: 'Antrasiklin sitotoksik memicu apoptosis seluler janin dan kardiomiopati fetal.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Daunorubicin (lebih banyak data historis pada kehamilan)'],
    clinicalRecommendations: 'Jika leukemia AML akut terdiagnosis saat hamil, kemoterapi induksi tidak boleh ditunda demi keselamatan nyawa ibu; jadwalkan persalinan saat hitung darah janin telah pulih.',
    references: 'ELN Guidelines on AML in Pregnancy & ESMO'
  },
  {
    id: 'preg-ifosfamide',
    name: 'Ifosfamide',
    genericName: 'Ifosfamide',
    category: 'Onkologi / Agen Alkilasi Sitotoksik',
    brandNames: ['Holoxan 1 g & 2 g'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA TRIMESTER PERTAMA. Alkilasi DNA merusak embriogenesis.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi skeletal berat, kraniofasial, dan kematian embrio.',
      trimester2: 'KATEGORI D: Hambatan pertumbuhan janin berat intrauterin (IUGR).',
      trimester3: 'KATEGORI D: Supresi hematopoietik janin dan nefrotoksisitas neonatal.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui.',
    teratogenicAlert: 'Cross-linking DNA memicu kematian seluler jaringan embrio yang berdiferensiasi.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hindari kehamilan selama kemoterapi ifosfamid. Kontrasepsi efektif wajib digunakan.',
    references: 'FDA Holoxan Prescribing Information'
  },
  {
    id: 'preg-iloprost',
    name: 'Iloprost',
    genericName: 'Iloprost Trometamol',
    category: 'Kardiovaskular / Analog Prostasiklin Inhalasi',
    brandNames: ['Ventavis 10 mcg/mL'],
    fdaCategory: 'C',
    pllrSummary: 'Data manusia terbatas. Hipertensi Arteri Pulmonal (PAH) pada kehamilan memiliki mortalitas maternal sangat tinggi (30-50%).',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Tidak teratogenik pada hewan uji; evaluasi risiko kehamilan dengan PAH.',
      trimester2: 'KATEGORI C: Digunakan untuk mempertahankan hemodinamik ibu.',
      trimester3: 'KATEGORI C: Esensial untuk mencegah gagal jantung kanan saat persalinan.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Tidak diketahui',
    breastfeedingSummary: 'Sebaiknya hindari menyusui; data ekskresi ke ASI manusia belum lengkap.',
    teratogenicAlert: 'Tidak ada bukti teratogenisitas mayor.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Sildenafil (PDE-5 Inhibitor)', 'Epoprostenol IV'],
    clinicalRecommendations: 'Kehamilan sangat tidak dianjurkan pada pasien PAH berat (mortalitas maternal tinggi). Jika pasien hamil dan mempertahankan kehamilannya, terapi prostasiklin inhalasi dapat menyelamatkan nyawa ibu.',
    references: 'ESC Guidelines on the Management of Cardiovascular Diseases during Pregnancy'
  },
  {
    id: 'preg-imidafenacin',
    name: 'Imidafenacin',
    genericName: 'Imidafenacin',
    category: 'Urologi / Antimuskarinik Selektif OAB',
    brandNames: ['Staybla 0.1 mg'],
    fdaCategory: 'C',
    pllrSummary: 'Data kehamilan manusia belum tersedia. Penelitian hewan menunjukkan ekskresi ke dalam air susu.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Data terbatas; utamakan terapi non-farmakologis senam kegel.',
      trimester2: 'KATEGORI C: Gunakan hanya jika gejala inkontinensia sangat berat.',
      trimester3: 'KATEGORI C: Waspadai retensi urin pasca salin.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Tidak diketahui',
    breastfeedingSummary: 'KONTRAINDIKASI saat menyusui; terbukti diekskresikan ke dalam air susu pada hewan coba.',
    teratogenicAlert: 'Tidak ada teratogenisitas pada dosis non-maternal toksik hewan.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Terapi Perilaku (Latihan Otot Dasar Panggul / Kegel)', 'Oxybutynin (bila mutlak butuh obat)'],
    clinicalRecommendations: 'Utamakan latihan otot dasar panggul (senam Kegel) dan modifikasi asupan cairan selama kehamilan dan menyusui.',
    references: 'Staybla Japan PMDA Package Insert'
  },
  {
    id: 'preg-imidapril',
    name: 'Imidapril',
    genericName: 'Imidapril Hydrochloride',
    category: 'Kardiovaskular / ACE Inhibitor',
    brandNames: ['Tanapress 5 mg & 10 mg'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK PADA TRIMESTER 2 DAN 3 (Sindrom Fetopati ACE Inhibitor).',
    trimesterRisks: {
      trimester1: 'KATEGORI C / D: Hindari; potensi peningkatan risiko defek kardiovaskular dan SSP.',
      trimester2: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Oligohidramnion, hipoplasia paru janin, deformitas tengkorak kraniofasial.',
      trimester3: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Anuria neonatal, gagal ginjal janin ireversibel, dan kematian perinatal.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI saat menyusui; risiko hipotensi dan oliguria pada bayi baru lahir.',
    teratogenicAlert: 'FETOPATI ACE INHIBITOR: Hipotensi janin berat menyebabkan iskemia ginjal janin, anuria, oligohidramnion, dan hipoplasia paru mematikan.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Methyldopa (Lini Pertama Hipertensi Kehamilan)', 'Labetalol Oral', 'Nifedipine GITS'],
    clinicalRecommendations: 'HENTIKAN IMIDAPRIL SEGERA saat merencanakan kehamilan atau segera setelah tes kehamilan positif. Beralih ke Methyldopa atau Nifedipine.',
    references: 'FDA Boxed Warning on ACE Inhibitors & ACOG Practice Bulletin on Chronic Hypertension in Pregnancy'
  },
  {
    id: 'preg-ivig',
    name: 'Intravenous Immunoglobulin (IVIG)',
    genericName: 'Human Normal Immunoglobulin (IVIG)',
    category: 'Imunologi & Hematologi / IgG Polivalen Manusia',
    brandNames: ['Gamunex 10%', 'Privigen 10%'],
    fdaCategory: 'C',
    pllrSummary: 'SANGAT AMAN DAN TELAH DIGUNAKAN LUAS PADA KEHAMILAN untuk ITP gestasional berat, sindrom antifosfolipid (APS), dan miastenia gravis.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Sangat aman. Tidak meningkatkan risiko malformasi kongenital.',
      trimester2: 'KATEGORI C: Aman dan efektif untuk menaikkan hitung trombosit ITP.',
      trimester3: 'KATEGORI C: Pilihan terapi utama ITP gestasional refrakter menjelang persalinan (target trombosit aman >50.000/mcL).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'KOMPATIBEL DAN SANGAT AMAN SAAT MENYUSUI. Antibodi IgG alami terdapat dalam ASI kolostrum.',
    teratogenicAlert: 'Tidak ada risiko teratogenisitas.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Kortikosteroid Oral (Prednison)'],
    clinicalRecommendations: 'IVIG adalah terapi lini pertama yang sangat aman untuk menaikkan hitung trombosit secara cepat menjelang persalinan pada ibu hamil dengan ITP berat.',
    references: 'ASH Guidelines on ITP in Pregnancy & RCOG Green-top Guideline'
  },
  {
    id: 'preg-indacaterol',
    name: 'Indacaterol',
    genericName: 'Indacaterol Maleate',
    category: 'Respirasi / Ultra-LABA Inhalasi Bronkodilator PPOK',
    brandNames: ['Onbrez Breezhaler 150 & 300 mcg'],
    fdaCategory: 'C',
    pllrSummary: 'Data kehamilan manusia terbatas. Agonis beta-2 dapat merelaksasikan otot rahim (tokolitik) pada dosis tinggi parenteral menjelang aterm.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Absorpsi sistemik inhalasi rendah; tidak teratogenik pada hewan uji.',
      trimester2: 'KATEGORI C: Aman untuk pemeliharaan fungsi paru ibu.',
      trimester3: 'KATEGORI C: Dosis inhalasi lazim tidak mengganggu kontraksi persalinan.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'Kompatibel / Cukup Aman saat menyusui pada dosis inhalasi terapi.',
    teratogenicAlert: 'Tidak ada bukti teratogenesis mayor.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Salmeterol Inhaler', 'Formoterol Inhaler (LABA paling banyak data kehamilan)'],
    clinicalRecommendations: 'Dapat dilanjutkan pada wanita hamil dengan PPOK stabil; jika timbul sesak akut, gunakan Salbutamol inhaler.',
    references: 'Briggs Drugs in Pregnancy and Lactation & GOLD'
  },
  {
    id: 'preg-irinotecan',
    name: 'Irinotecan',
    genericName: 'Irinotecan Hydrochloride Trihydrate',
    category: 'Onkologi / Topoisomerase I Inhibitor',
    brandNames: ['Campto 40 & 100 mg'],
    fdaCategory: 'D',
    pllrSummary: 'TERATOGENIK DAN EMBRIOTOKSIK KUAT PADA MANUSIA DAN HEWAN.',
    trimesterRisks: {
      trimester1: 'KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi skeletal multipel dan kematian embrio.',
      trimester2: 'KATEGORI D: Hambatan pertumbuhan janin intrauterin parah dan mielosupresi.',
      trimester3: 'KATEGORI D: Pansitopenia neonatal berat dan risiko sepsis neonatal fatal.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Kontraindikasi',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui. Menembus ke dalam ASI dan memicu supresi sumsum tulang berat.',
    teratogenicAlert: 'Pemutusan untai DNA memicu kematian seluler embrio yang sedang tumbuh pesat.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: [],
    clinicalRecommendations: 'Hindari kehamilan secara mutlak selama terapi kemoterapi irinotecan. Kontrasepsi efektif wajib digunakan.',
    references: 'FDA Campto Label & ESMO Guidelines on Cancer in Pregnancy'
  },
  {
    id: 'preg-itraconazole',
    name: 'Itraconazole',
    genericName: 'Itraconazole',
    category: 'Anti-Infeksi / Antijamur Triazol',
    brandNames: ['Sporanox 100 mg'],
    fdaCategory: 'C',
    pllrSummary: 'HINDARI PADA KEHAMILAN (terutama untuk onikomikosis kuku). Penelitian hewan menunjukkan toksisitas embrio dan defek skeletal.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari pada trimester 1 (potensi anomali kraniofasial dan skeletal pada dosis tinggi).',
      trimester2: 'KATEGORI C: Gunakan hanya untuk infeksi mikosis sistemik yang mengancam nyawa ibu.',
      trimester3: 'KATEGORI C: Hindari kecuali tidak ada alternatif antijamur lain.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: '1-3%',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI; sebaiknya hindari menyusui atau tunda terapi jamur kuku non-darurat.',
    teratogenicAlert: 'Ensefalokel dan defek skeletal vertebra pada hewan coba dosis tinggi.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Amfoterisin B (Kategori B, pilihan baku mikosis sistemik kehamilan)', 'Klotrimazol Topikal / Nistatin (untuk Kandidiasis)'],
    clinicalRecommendations: 'Untuk onikomikosis atau infeksi jamur kulit superfisial, TUNDA TERAPI ORAL HINGGA PASCA PERSALINAN DAN MENYUSUI. Pada mikosis sistemik berat yang mengancam nyawa, Amfoterisin B lebih disukai.',
    references: 'FDA Sporanox Prescribing Information & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-levonorgestrel-iud',
    name: 'Levonorgestrel IUD',
    genericName: 'Levonorgestrel Intrauterine Device (LNG-IUD)',
    category: 'Kontrasepsi / Sistem AKDR Hormonal Intrauterin',
    brandNames: ['Mirena 52 mg'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI PADA KEHAMILAN (tidak diindikasikan saat hamil). PILIHAN EMAS PASCA PERSALINAN & IBU MENYUSUI.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Jika terjadi kehamilan aksidental dengan AKDR in situ, cabut AKDR segera untuk mencegah abortus septik atau korioamnionitis.',
      trimester2: 'KATEGORI X: Tidak diindikasikan.',
      trimester3: 'KATEGORI X: Tidak diindikasikan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: '<1%',
    breastfeedingSummary: 'KOMPATIBEL DAN SANGAT AMAN UNTUK IBU MENYUSUI. Merupakan pilihan kontrasepsi baku emas pasca persalinan.',
    teratogenicAlert: 'Tidak ada bukti efek teratogenik langsung jika kehamilan berlanjut.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['AKDR Tembaga (Cu-IUD)', 'Kondom'],
    clinicalRecommendations: 'Pilihan kontrasepsi reversibel jangka panjang ideal (LARC) yang sangat aman dipasang pada ibu menyusui karena tidak mengganggu volume atau komposisi ASI.',
    references: 'WHO Medical Eligibility Criteria for Contraceptive Use & CDC US MEC'
  },
  {
    id: 'preg-ivermectin',
    name: 'Ivermectin',
    genericName: 'Ivermectin',
    category: 'Anti-Infeksi / Antelmintik & Antiparasit',
    brandNames: ['Ivermax 12 mg', 'Scabimite Tablet'],
    fdaCategory: 'C',
    pllrSummary: 'Data kehamilan terbatas. Studi hewan menunjukkan celah langit-langit (cleft palate) pada dosis maternal toksik.',
    trimesterRisks: {
      trimester1: 'KATEGORI C: Hindari pada trimester pertama; gunakan terapi topikal Permethrin 5% untuk skabies.',
      trimester2: 'KATEGORI C: Gunakan hanya jika skabies krustosa refrakter parah gagal dengan topikal.',
      trimester3: 'KATEGORI C: Permethrin topikal tetap merupakan lini pertama yang aman.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: '<1.5%',
    breastfeedingSummary: 'Diekskresikan ke dalam ASI dalam konsentrasi sangat rendah; tunda menyusui selama 24 jam pasca dosis jika memungkinkan.',
    teratogenicAlert: 'Celah palatum (cleft palate) pada hewan uji dosis toksik.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Permethrin Krim 5% Topikal (Kategori B, Lini Pertama Skabies Kehamilan)'],
    clinicalRecommendations: 'Pada wanita hamil dengan skabies, PERMETHRIN KRIM 5% TOPIKAL adalah lini pertama yang aman. Ivermectin oral hanya dipertimbangkan pada skabies berkrusta Norwegia berat yang mengancam nyawa.',
    references: 'CDC Parasitic Diseases Guidelines & Briggs Drugs in Pregnancy and Lactation'
  },
{
    "id": "preg-caffeine-citrate",
    "name": "Caffeine Citrate",
    "genericName": "Caffeine Citrate",
    "category": "Sistem Saraf Pusat / Terapi Apnea Neonatus",
    "brandNames": [
        "Peyona 20 mg/mL"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Diindikasikan khusus untuk neonatus prematur. Pada wanita hamil, konsumsi kafein berlebih meningkatkan risiko berat lahir rendah.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Kafein dosis tinggi dikaitkan dengan abortus spontan; batasi asupan kafein <200 mg/hari.",
        "trimester2": "KATEGORI C: Metabolisme kafein maternal melambat secara fisiologis.",
        "trimester3": "KATEGORI C: Takikardia dan aritmia janin pada konsumsi kafein berlebih."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "5-10%",
    "breastfeedingSummary": "Kompatibel pada asupan moderat; kafein diekskresikan ke ASI dan dapat memicu iritabilitas dan insomnia pada bayi menyusui.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas mayor pada dosis normal.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [],
    "clinicalRecommendations": "Sediaan kafein sitrat digunakan khusus untuk bayi prematur di NICU. Wanita hamil harus membatasi asupan kafein harian.",
    "references": "ACOG Committee Opinion on Moderate Caffeine Consumption in Pregnancy & Briggs"
},
{
    "id": "preg-calamine",
    "name": "Calamine",
    "genericName": "Calamine",
    "category": "Dermatologi / Antipruritus Topikal",
    "brandNames": [
        "Caladine Lotion"
    ],
    "fdaCategory": "A",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN. Bekerja lokal di permukaan kulit tanpa absorpsi sistemik.",
    "trimesterRisks": {
        "trimester1": "KATEGORI A: Sangat aman untuk gatal biang keringat dan alergi kulit.",
        "trimester2": "KATEGORI A: Sangat aman.",
        "trimester3": "KATEGORI A: Pilihan lini pertama pruritus gravidarum / PUPPP."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "<0.1%",
    "breastfeedingSummary": "KOMPATIBEL DAN SANGAT AMAN SAAT MENYUSUI. Hindari pengolesan pada puting susu.",
    "teratogenicAlert": "Tidak ada efek teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [],
    "clinicalRecommendations": "Pilihan lini pertama yang sangat aman untuk meredakan gatal pada wanita hamil dengan biang keringat atau PUPPP.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-potassium-aspartate",
    "name": "Potassium L-Aspartate",
    "genericName": "Potassium L-Aspartate",
    "category": "Nutrisi & Elektrolit / Suplemen Kalium",
    "brandNames": [
        "Aspar-K 300 mg"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Elektrolit esensial alami tubuh. Aman bila digunakan untuk mengoreksi hipokalemia dengan pemantauan kadar kalium serum.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C / A-fisiologis: Sangat aman pada hipokalemia terdokumentasi.",
        "trimester2": "KATEGORI C: Aman; hindari hiperkalemia.",
        "trimester3": "KATEGORI C: Aman; pantau kadar kalium serial."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Kompatibel dan sangat aman saat menyusui (komponen alami ASI).",
    "teratogenicAlert": "Tidak ada risiko teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Potassium Chloride Oral"
    ],
    "clinicalRecommendations": "Aman digunakan untuk mengobati hipokalemia selama kehamilan; pantau kadar kalium serum secara berkala.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-calcitriol",
    "name": "Calcitriol",
    "genericName": "Calcitriol",
    "category": "Endokrin / Bentuk Aktif Vitamin D3",
    "brandNames": [
        "Rocaltrol 0.25 mcg",
        "Kolkatriol"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Bentuk aktif vitamin D menembus plasenta. Hiperkalsemia maternal yang diinduksi overdosis dapat memicu stenosis aorta supravalvular janin.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Hindari hiperkalsemia; pertahankan kalsium serum dalam batas normal.",
        "trimester2": "KATEGORI C: Esensial pada ibu dengan hipoparatiroidisme atau hemodialisis.",
        "trimester3": "KATEGORI C: Pantau kalsium darah ketat menjelang persalinan."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "<2%",
    "breastfeedingSummary": "Kompatibel; diekskresikan ke dalam ASI dalam jumlah sangat kecil, pantau kalsium serum bayi.",
    "teratogenicAlert": "Hiperkalsemia berat memicu kalsifikasi jaringan lunak janin dan stenosis aorta supravalvular.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Cholecalciferol (Vitamin D3 standar)"
    ],
    "clinicalRecommendations": "Gunakan hanya pada hipoparatiroidisme atau gagal ginjal saat hamil; pantau kalsium serum ibu secara ketat.",
    "references": "Briggs Drugs in Pregnancy and Lactation & Endocrine Society Guidelines"
},
{
    "id": "preg-calcium-folinate",
    "name": "Calcium Folinate",
    "genericName": "Calcium Folinate (Leucovorin)",
    "category": "Antidotum & Toksikologi / Penyelamat Folat",
    "brandNames": [
        "Leucovorin Ca 15 mg & 50 mg"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Bentuk aktif asam folat tereduksi. Tidak teratogenik dan esensial menyelamatkan nyawa pada toksisitas antagonis folat.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Aman; folat justru protektif terhadap defek tabung saraf (NTD).",
        "trimester2": "KATEGORI C: Aman untuk indikasi penyelamat sitotoksik atau toksisitas pirimetamin.",
        "trimester3": "KATEGORI C: Aman."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Kompatibel dan aman saat menyusui; metabolit folat alami tubuh.",
    "teratogenicAlert": "Tidak ada efek teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Asam Folat Oral"
    ],
    "clinicalRecommendations": "Sangat aman diberikan pada wanita hamil yang membutuhkan penyelamatan folat (rescue) atau toksisitas trimetoprim/pirimetamin.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-calcium-polystyrene-sulfonate",
    "name": "Calcium Polystyrene Sulfonate",
    "genericName": "Calcium Polystyrene Sulfonate",
    "category": "Nutrisi & Elektrolit / Resin Pengikat Kalium",
    "brandNames": [
        "Kalitake 5 g"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Tidak diserap ke dalam sirkulasi sistemik. Bekerja murni di dalam lumen usus sehingga paparan terhadap janin nihil.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C / B-nonabsorbable: Tidak menembus plasenta.",
        "trimester2": "KATEGORI C: Aman untuk hiperkalemia gagal ginjal.",
        "trimester3": "KATEGORI C: Aman; hindari dehidrasi dan konstipasi berat."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "0%",
    "breastfeedingSummary": "Kompatibel dan sangat aman saat menyusui karena tidak diserap ke dalam ASI.",
    "teratogenicAlert": "Tidak ada risiko teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [],
    "clinicalRecommendations": "Aman digunakan untuk tatalaksana hiperkalemia pada wanita hamil dengan penyakit ginjal karena tidak diserap ke aliran darah.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-carbimazole",
    "name": "Carbimazole",
    "genericName": "Carbimazole",
    "category": "Endokrin / Antitiroid Tionamida",
    "brandNames": [
        "Neo-Mercazole 5 mg"
    ],
    "fdaCategory": "D",
    "pllrSummary": "EMBRIOPATI METIMAZOL PADA TRIMESTER PERTAMA. Dihidrolisis menjadi metimazol yang menembus plasenta.",
    "trimesterRisks": {
        "trimester1": "KATEGORI D: KONTRAINDIKASI TRIMESTER 1. Aplasia kutis kongenital, atresia koana, dan atresia esofagus (Gunakan Propiltiourasil / PTU).",
        "trimester2": "KATEGORI D: Pilihan terapi lini kedua (dapat beralih dari PTU untuk mencegah hepatotoksisitas PTU).",
        "trimester3": "KATEGORI D: Gunakan dosis terendah efektif untuk mencegah goiter dan hipotiroidisme janin."
    },
    "halesLactationRating": "L3",
    "relativeInfantDosePercent": "2-5%",
    "breastfeedingSummary": "Kompatibel pada dosis moderat (maksimal 20 mg/hari); pantau fungsi tiroid bayi.",
    "teratogenicAlert": "Embriopati Metimazol: Aplasia kutis kepala, atresia koana, dan defek dinding abdomen.",
    "isContraindicatedInPregnancy": true,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Propylthiouracil / PTU (Lini Pertama Mutlak Trimester 1 Kehamilan)"
    ],
    "clinicalRecommendations": "KONTRAINDIKASI PADA TRIMESTER PERTAMA KEHAMILAN; gunakan Propiltiourasil (PTU) pada trimester 1. Carbimazole dapat dipertimbangkan pada trimester 2 dan 3 dengan dosis terendah.",
    "references": "ATA Guidelines on Thyroid Disease in Pregnancy & Endocrine Society"
},
{
    "id": "preg-carboglycerin",
    "name": "Carboglycerin",
    "genericName": "Glycerol and Phenol Ear Drops",
    "category": "THT / Pelunak Serumen Telinga",
    "brandNames": [
        "Karbogliserin 10% Tetes Telinga"
    ],
    "fdaCategory": "A",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN. Bekerja lokal di liang telinga luar tanpa absorpsi sistemik.",
    "trimesterRisks": {
        "trimester1": "KATEGORI A: Aman untuk serumen obsturan telinga.",
        "trimester2": "KATEGORI A: Aman.",
        "trimester3": "KATEGORI A: Aman."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "<0.1%",
    "breastfeedingSummary": "Kompatibel dan sangat aman saat menyusui.",
    "teratogenicAlert": "Tidak ada risiko teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [],
    "clinicalRecommendations": "Aman digunakan untuk melunakkan kotoran telinga selama kehamilan dan menyusui jika membran timpani utuh.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-carboxymethylcellulose",
    "name": "Carboxymethylcellulose Sodium",
    "genericName": "Carmellose Sodium",
    "category": "Oftalmologi / Air Mata Buatan",
    "brandNames": [
        "Cendo Cenfresh 0.5%"
    ],
    "fdaCategory": "A",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN. Pelumas mata fisik topikal tanpa penyerapan ke peredaran darah.",
    "trimesterRisks": {
        "trimester1": "KATEGORI A: Aman untuk mata kering.",
        "trimester2": "KATEGORI A: Aman.",
        "trimester3": "KATEGORI A: Aman (mata kering sering meningkat pada trimester akhir)."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "0%",
    "breastfeedingSummary": "Kompatibel dan sangat aman saat menyusui.",
    "teratogenicAlert": "Tidak ada risiko teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [],
    "clinicalRecommendations": "Pilihan lini pertama paling aman untuk mata kering pada ibu hamil dan menyusui.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-carboplatin",
    "name": "Carboplatin",
    "genericName": "Carboplatin",
    "category": "Onkologi / Kemoterapi Platinum",
    "brandNames": [
        "Paraplatin 150 & 450 mg"
    ],
    "fdaCategory": "D",
    "pllrSummary": "TERATOGENIK DAN EMBRIOTOKSIK KUAT PADA TRIMESTER PERTAMA.",
    "trimesterRisks": {
        "trimester1": "KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi skeletal, kraniofasial, dan kematian embrio.",
        "trimester2": "KATEGORI D: Dapat dipertimbangkan pada kanker ovarium maternal stadium lanjut yang mengancam nyawa.",
        "trimester3": "KATEGORI D: Hentikan minimal 3-4 minggu pra-persalinan untuk mencegah mielosupresi neonatal saat lahir."
    },
    "halesLactationRating": "L5",
    "relativeInfantDosePercent": "Kontraindikasi",
    "breastfeedingSummary": "KONTRAINDIKASI MUTLAK saat menyusui; obat sitotoksik platinum diekskresikan ke dalam ASI.",
    "teratogenicAlert": "Cross-linking DNA menghambat mitosis dan memicu apoptosis seluler embrio luas.",
    "isContraindicatedInPregnancy": true,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [],
    "clinicalRecommendations": "KONTRAINDIKASI TRIMESTER PERTAMA. Jika kemoterapi mutlak diperlukan pada trimester 2 atau 3, karboplatin dapat diberikan dengan pemantauan ketat pertumbuhan janin.",
    "references": "ESMO Guidelines on Cancer in Pregnancy & Briggs"
},
{
    "id": "preg-cloxacillin",
    "name": "Cloxacillin",
    "genericName": "Cloxacillin Sodium",
    "category": "Anti-Infeksi / Penisilin Antistafilokokus",
    "brandNames": [
        "Cloxacillin 500 mg"
    ],
    "fdaCategory": "B",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN. Antibiotik penisilin tidak menunjukkan toksisitas reproduksi pada manusia.",
    "trimesterRisks": {
        "trimester1": "KATEGORI B: Aman untuk infeksi stafilokokus.",
        "trimester2": "KATEGORI B: Aman.",
        "trimester3": "KATEGORI B: Aman hingga persalinan."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "<1.5%",
    "breastfeedingSummary": "Kompatibel dan aman saat menyusui; obat pilihan utama mastitis stafilokokus pada ibu menyusui.",
    "teratogenicAlert": "Tidak ada efek teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Cefalexin",
        "Amoxicillin-Clavulanate"
    ],
    "clinicalRecommendations": "Pilihan lini pertama yang aman untuk mengobati infeksi kulit stafilokokus pada kehamilan dan mastitis laktasi saat menyusui.",
    "references": "Briggs Drugs in Pregnancy and Lactation & ABM Clinical Protocol on Mastitis"
},
{
    "id": "preg-chloral-hydrate",
    "name": "Chloral Hydrate",
    "genericName": "Chloral Hydrate",
    "category": "Sistem Saraf Pusat / Sedatif Hipnotik",
    "brandNames": [
        "Kloral Hidrat Larutan Oral"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Menembus plasenta. Penggunaan dosis tinggi berulang menjelang persalinan dapat memicu depresi napas dan hiperbilirubinemia neonatal.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Hindari penggunaan jangka panjang.",
        "trimester2": "KATEGORI C: Gunakan hanya dosis tunggal jika mutlak diperlukan.",
        "trimester3": "KATEGORI C: Risiko hipotonia neonatal dan ikterus neonatorum."
    },
    "halesLactationRating": "L3",
    "relativeInfantDosePercent": "2-5%",
    "breastfeedingSummary": "Diekskresikan ke dalam ASI; dapat memicu sedasi pada bayi, tunda menyusui 24 jam pasca dosis.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas mayor.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Diphenhydramine (Kategori B untuk sedasi jangka pendek)"
    ],
    "clinicalRecommendations": "Hindari penggunaan rutin pada kehamilan; jika diperlukan sedasi pra-prosedur pada anak, pantau pernapasan ketat.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-chlorambucil",
    "name": "Chlorambucil",
    "genericName": "Chlorambucil",
    "category": "Onkologi / Agen Alkilasi Sitotoksik",
    "brandNames": [
        "Leukeran 2 mg"
    ],
    "fdaCategory": "D",
    "pllrSummary": "TERATOGENIK DAN EMBRIOLEPTAL KUAT PADA MANUSIA.",
    "trimesterRisks": {
        "trimester1": "KATEGORI D: KONTRAINDIKASI MUTLAK. Malformasi ginjal unilateral, defek skeletal, kraniofasial, dan abortus.",
        "trimester2": "KATEGORI D: Supresi hematopoietik janin intrauterin berat.",
        "trimester3": "KATEGORI D: Mielosupresi dan pansitopenia neonatal saat lahir."
    },
    "halesLactationRating": "L5",
    "relativeInfantDosePercent": "Kontraindikasi",
    "breastfeedingSummary": "KONTRAINDIKASI MUTLAK saat menyusui; zat sitotoksik dan karsinogenik menembus ke ASI.",
    "teratogenicAlert": "Alkilasi DNA embrio memicu kelainan kongenital berat dan kematian janin.",
    "isContraindicatedInPregnancy": true,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [],
    "clinicalRecommendations": "KONTRAINDIKASI MUTLAK SELAMA KEHAMILAN. Wanita dan pria wajib menggunakan kontrasepsi efektif selama terapi.",
    "references": "FDA Leukeran Label & Briggs Drugs in Pregnancy"
},
{
    "id": "preg-chloramphenicol",
    "name": "Chloramphenicol",
    "genericName": "Chloramphenicol",
    "category": "Anti-Infeksi / Antibiotik Fenikol",
    "brandNames": [
        "Colme",
        "Kemicetine",
        "Chloramex"
    ],
    "fdaCategory": "C",
    "pllrSummary": "KONTRAINDIKASI PADA TRIMESTER 3 DAN PERSALINAN (Risiko Fatal Gray Baby Syndrome pada Neonatus).",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Gunakan hanya jika infeksi berat mengancam nyawa ibu tanpa alternatif lain.",
        "trimester2": "KATEGORI C: Pertimbangkan antibiotik alternatif yang lebih aman (seperti Ceftriaxone untuk tifoid).",
        "trimester3": "KATEGORI C / X-aterm: KONTRAINDIKASI MUTLAK MENJELANG PERSALINAN (Gray Baby Syndrome mematikan pada bayi baru lahir)."
    },
    "halesLactationRating": "L5",
    "relativeInfantDosePercent": "Kontraindikasi",
    "breastfeedingSummary": "KONTRAINDIKASI MUTLAK saat menyusui; risiko supresi sumsum tulang dan Gray Baby Syndrome.",
    "teratogenicAlert": "Menghambat sintesis protein mitokondria janin dan melumpuhkan sistem kardiovaskular neonatus.",
    "isContraindicatedInPregnancy": true,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [
        "Ceftriaxone (Lini Pertama Tifoid Kehamilan)",
        "Azithromycin (Kategori B, Aman)"
    ],
    "clinicalRecommendations": "HINDARI PENGGUNAAN PADA KEHAMILAN (terutama trimester 3 dan persalinan). Untuk demam tifoid pada wanita hamil, Ceftriaxone atau Azithromycin adalah pilihan baku emas yang aman.",
    "references": "Briggs Drugs in Pregnancy and Lactation & WHO Guidelines on Typhoid Fever"
},
{
    "id": "preg-chloroquine",
    "name": "Chloroquine",
    "genericName": "Chloroquine Phosphate",
    "category": "Antiparasit / Antimalaria 4-Aminokinolin",
    "brandNames": [
        "Resochin 250 mg",
        "Klorokuin KF"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Menembus plasenta. Aman untuk terapi dan profilaksis malaria sensitif pada wanita hamil; toksisitas retina janin hanya pada dosis sangat tinggi.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Pilihan aman untuk malaria P. vivax sensitif (keuntungan terapi malaria melebihi risiko obat).",
        "trimester2": "KATEGORI C: Aman untuk tatalaksana malaria vivaks.",
        "trimester3": "KATEGORI C: Aman hingga persalinan."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "2-4%",
    "breastfeedingSummary": "Kompatibel dengan menyusui; kadar dalam ASI rendah dan aman untuk bayi.",
    "teratogenicAlert": "Dosis sangat tinggi berulang memicu kerusakan retina dan koklea janin.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Quinine + Clindamycin (pada Trimester 1)",
        "DHP (pada Trimester 2 & 3)"
    ],
    "clinicalRecommendations": "Aman digunakan untuk pengobatan malaria P. vivax sensitif pada seluruh trimester kehamilan sesuai pedoman WHO.",
    "references": "CDC Guidelines for Treatment of Malaria & WHO Guidelines"
},
{
    "id": "preg-colestyramine",
    "name": "Colestyramine",
    "genericName": "Colestyramine",
    "category": "Kardiovaskular / Resin Pengikat Asam Empedu",
    "brandNames": [
        "Questran 4 g"
    ],
    "fdaCategory": "B",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN KARENA TIDAK DISERAP SISTEMIK. Pilihan baku kolestasis intrahepatik kehamilan (ICP).",
    "trimesterRisks": {
        "trimester1": "KATEGORI B: Tidak diserap ke dalam darah; sangat aman bagi organogenesis.",
        "trimester2": "KATEGORI B: Pilihan efektif untuk meredakan pruritus kolestasis kehamilan.",
        "trimester3": "KATEGORI B: Berikan suplemen Vitamin K maternal (cegah hipoprotrombinemia dan perdarahan pasca salin)."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "0%",
    "breastfeedingSummary": "KOMPATIBEL DAN SANGAT AMAN SAAT MENYUSUI; tidak diserap ke dalam ASI.",
    "teratogenicAlert": "Tidak ada efek teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Ursodeoxycholic Acid / UDCA (Lini Pertama ICP)"
    ],
    "clinicalRecommendations": "Aman digunakan untuk kolestasis kehamilan; berikan suplemen vitamin K pada trimester ketiga untuk mencegah perdarahan persalinan.",
    "references": "ACOG Practice Bulletin on Intrahepatic Cholestasis of Pregnancy & Briggs"
},
{
    "id": "preg-quinine",
    "name": "Quinine",
    "genericName": "Quinine Sulfate & Dihydrochloride",
    "category": "Antiparasit / Alkaloid Kina Antimalaria",
    "brandNames": [
        "Kina Tablet 222 mg KF"
    ],
    "fdaCategory": "C",
    "pllrSummary": "BAKU EMAS TERAPI MALARIA PADA TRIMESTER PERTAMA KEHAMILAN (bersama Klindamisin). Risiko hipoglikemia maternal berat.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: LINI PERTAMA REKOMENDASI WHO & KEMENKES RI untuk malaria pada trimester 1 (bersama Klindamisin).",
        "trimester2": "KATEGORI C: Aman jika ACT tidak tersedia.",
        "trimester3": "KATEGORI C: PANTAU GULA DARAH SECARA KETAT (risiko hipoglikemia berat yang membahayakan janin)."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "1-3%",
    "breastfeedingSummary": "Kompatibel dengan menyusui; pantau bayi terhadap risiko hemolisis jika memiliki defisiensi G6PD.",
    "teratogenicAlert": "Dosis sangat tinggi masif (dosis abortifasien ilegal) memicu malformasi kraniofasial dan kematian janin; dosis terapeutik aman.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Klindamisin (kombinasi sinergis baku kina pada kehamilan)"
    ],
    "clinicalRecommendations": "PILIHAN BAKU EMAS LINI PERTAMA MALARIA FALCIPARUM TRIMESTER 1 KEHAMILAN (Kemenkes RI & WHO). Pantau kadar glukosa darah ibu secara ketat untuk mencegah hipoglikemia berat.",
    "references": "WHO Guidelines for the Treatment of Malaria in Pregnancy & Pedoman Kemenkes RI"
},
{
    "id": "preg-artemether-lumefantrine",
    "name": "Artemether + Lumefantrine",
    "genericName": "Artemether and Lumefantrine",
    "category": "Antiparasit / ACT Antimalaria FDC",
    "brandNames": [
        "Coartem 20/120 mg"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Direkomendasikan oleh WHO untuk pengobatan malaria falciparum tanpa komplikasi pada trimester kedua dan ketiga kehamilan.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Data makin banyak menunjukkan keamanan; gunakan Kina + Klindamisin sebagai lini 1 trimester 1.",
        "trimester2": "KATEGORI B/C: Lini pertama yang sangat efektif dan aman (WHO 2022).",
        "trimester3": "KATEGORI B/C: Aman hingga persalinan; bersihkan parasitemia dengan cepat."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "<2%",
    "breastfeedingSummary": "Kompatibel; ekskresi ke ASI minimal, teruskan menyusui di bawah pengawasan.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas pada manusia.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Kina + Klindamisin (pada Trimester 1)"
    ],
    "clinicalRecommendations": "Pilihan terapi lini pertama yang aman dan direkomendasikan WHO pada trimester kedua dan ketiga kehamilan untuk malaria falciparum.",
    "references": "WHO Guidelines for Malaria 2022 & CDC"
},
{
    "id": "preg-dihydroartemisinin-piperaquine",
    "name": "Dihydroartemisinin + Piperaquine",
    "genericName": "Dihydroartemisinin and Piperaquine",
    "category": "Antiparasit / ACT Baku Emas Program Nasional",
    "brandNames": [
        "DHP / Arterakine Tablet"
    ],
    "fdaCategory": "B",
    "pllrSummary": "BAKU EMAS PROGRAM KEMENKES RI PADA TRIMESTER 2 DAN 3 KEHAMILAN. Sangat efektif dan aman membersihkan malaria.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Trimester 1 gunakan Kina + Klindamisin (Pedoman Kemenkes RI).",
        "trimester2": "KATEGORI B: LINI PERTAMA BAKU EMAS KEMENKES RI (DHP 1x sehari selama 3 hari tanpa primakuin).",
        "trimester3": "KATEGORI B: Lini pertama; primakuin KONTRAINDIKASI pada wanita hamil (risiko hemolisis janin)."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "<2%",
    "breastfeedingSummary": "Kompatibel dengan menyusui; aman pada bayi usia >= 6 bulan.",
    "teratogenicAlert": "Tidak teratogenik pada manusia pada dosis terapeutik baku.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Kina + Klindamisin (pada Trimester 1)"
    ],
    "clinicalRecommendations": "LINI PERTAMA MUTLAK MALARIA PADA TRIMESTER 2 DAN 3 DI INDONESIA (Pedoman Kemenkes RI). Berikan DHP selama 3 hari berturut-turut TANPA PRIMAKUIN (primakuin kontraindikasi pada kehamilan).",
    "references": "Pedoman Penatalaksanaan Malaria Kementerian Kesehatan RI & WHO"
},
{
    "id": "preg-lopinavir-ritonavir",
    "name": "Lopinavir + Ritonavir",
    "genericName": "Lopinavir and Ritonavir",
    "category": "Anti-Infeksi / Antiretroviral Protease Inhibitor",
    "brandNames": [
        "Aluvia 200/50 mg"
    ],
    "fdaCategory": "C",
    "pllrSummary": "TELAH DIGUNAKAN LUAS PADA KEHAMILAN UNTUK PENCEGAHAN TRANSMISI HIV DARI IBU KE ANAK (PMTCT). Tidak teratogenik.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Data registri kehamilan menunjukkan tidak ada peningkatan malformasi kongenital.",
        "trimester2": "KATEGORI C: Aman; farmakokinetik stabil.",
        "trimester3": "KATEGORI C: Kadar lopinavir plasma dapat sedikit menurun pada trimester 3 (pertimbangkan peningkatan dosis bila viral load terdeteksi)."
    },
    "halesLactationRating": "L3",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Ibu dengan infeksi HIV dianjurkan untuk tidak menyusui bayinya guna mencegah penularan vertikal virus HIV melalui ASI.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas mayor.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [
        "Dolutegravir (Lini Pertama Alternatif PMTCT)"
    ],
    "clinicalRecommendations": "Sangat aman dan efektif untuk terapi ARV lini kedua pada wanita hamil yang terinfeksi HIV untuk melindungi kesehatan ibu dan mencegah penularan ke janin.",
    "references": "DHHS Guidelines for the Use of Antiretroviral Agents in Pediatric & Pregnant Patients"
},
{
    "id": "preg-cefoperazone-sulbactam",
    "name": "Cefoperazone + Sulbactam",
    "genericName": "Cefoperazone and Sulbactam",
    "category": "Anti-Infeksi / Sefalosporin Kombinasi",
    "brandNames": [
        "Sulperazon 1 g"
    ],
    "fdaCategory": "B",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN. Sefalosporin dan inhibitor beta-laktamase tidak menunjukkan risiko teratogenik.",
    "trimesterRisks": {
        "trimester1": "KATEGORI B: Aman untuk infeksi nosokomial berat.",
        "trimester2": "KATEGORI B: Aman.",
        "trimester3": "KATEGORI B: Aman; pantau status pembekuan darah ibu (berikan Vitamin K profilaksis jika perlu)."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "<2%",
    "breastfeedingSummary": "Kompatibel dengan menyusui; konsentrasi dalam ASI rendah.",
    "teratogenicAlert": "Tidak ada efek teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Ceftriaxone",
        "Meropenem"
    ],
    "clinicalRecommendations": "Pilihan aman untuk infeksi bakteri gram negatif nosokomial berat pada kehamilan; berikan suplemen vitamin K bila terapi berlangsung lama.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
},
{
    "id": "preg-ampicillin-sulbactam",
    "name": "Ampicillin + Sulbactam",
    "genericName": "Ampicillin and Sulbactam",
    "category": "Anti-Infeksi / Aminopenisilin Kombinasi",
    "brandNames": [
        "Bactesyn 1.5 g"
    ],
    "fdaCategory": "B",
    "pllrSummary": "SANGAT AMAN PADA KEHAMILAN. Pilihan baku infeksi korioamnionitis, endometritis pasca salin, dan infeksi intraabdomen.",
    "trimesterRisks": {
        "trimester1": "KATEGORI B: Sangat aman.",
        "trimester2": "KATEGORI B: Sangat aman.",
        "trimester3": "KATEGORI B: Pilihan baku emas korioamnionitis intrauterin."
    },
    "halesLactationRating": "L1",
    "relativeInfantDosePercent": "<1.5%",
    "breastfeedingSummary": "KOMPATIBEL DAN SANGAT AMAN SAAT MENYUSUI.",
    "teratogenicAlert": "Tidak ada efek teratogenik.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Amoxicillin-Clavulanate"
    ],
    "clinicalRecommendations": "Pilihan lini pertama yang sangat aman untuk infeksi korioamnionitis dan infeksi obstetri pada kehamilan dan pasca persalinan.",
    "references": "ACOG Practice Bulletin on Intrapartum Infection & Briggs"
},
{
    "id": "preg-sofosbuvir-velpatasvir",
    "name": "Sofosbuvir + Velpatasvir",
    "genericName": "Sofosbuvir and Velpatasvir",
    "category": "Anti-Infeksi / DAA Hepatitis C",
    "brandNames": [
        "Epclusa 400/100 mg"
    ],
    "fdaCategory": "B",
    "pllrSummary": "Penelitian hewan tidak menunjukkan efek toksisitas reproduksi. Data manusia menunjukkan tingkat kesembuhan tinggi tanpa teratogenisitas.",
    "trimesterRisks": {
        "trimester1": "KATEGORI B: Tidak teratogenik; namun bila tanpa sirosis dekompensasi, terapi lazimnya ditunda hingga pasca salin.",
        "trimester2": "KATEGORI B: Aman jika terapi Hepatitis C akut mutlak diperlukan.",
        "trimester3": "KATEGORI B: Aman."
    },
    "halesLactationRating": "L2",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Kompatibel; ekskresi ke dalam ASI minimal, pertimbangkan terapi setelah masa menyusui bila non-urgens.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [],
    "clinicalRecommendations": "Pada wanita hamil dengan Hepatitis C tanpa sirosis lanjut, terapi DAA umumnya ditunda hingga selesai persalinan dan menyusui.",
    "references": "AASLD-IDSA HCV Guidance & Briggs Drugs in Pregnancy"
},
{
    "id": "preg-levodopa-carbidopa-entacapone",
    "name": "Levodopa + Carbidopa + Entacapone",
    "genericName": "Levodopa, Carbidopa, and Entacapone",
    "category": "Sistem Saraf Pusat / Anti-Parkinson Triple",
    "brandNames": [
        "Stalevo Tablet"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Menembus plasenta. Penyakit Parkinson jarang terjadi pada usia kehamilan; levodopa menekan prolaktin laktasi.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Data manusia terbatas; tidak menunjukkan peningkatan malformasi mayor.",
        "trimester2": "KATEGORI C: Pertahankan kontrol motorik ibu.",
        "trimester3": "KATEGORI C: Aman dengan pemantauan pertumbuhan janin."
    },
    "halesLactationRating": "L4",
    "relativeInfantDosePercent": "Tidak diketahui",
    "breastfeedingSummary": "KONTRAINDIKASI / Sebaiknya dihindari; dopamin menekan sekresi prolaktin dan melumpuhkan produksi ASI.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas mayor.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [
        "Levodopa-Carbidopa standar (tanpa entacapone)"
    ],
    "clinicalRecommendations": "Dapat dilanjutkan pada wanita hamil dengan Parkinson motorik parah; hindari menyusui karena produksi ASI terhambat.",
    "references": "Briggs Drugs in Pregnancy and Lactation & Movement Disorders Society"
},
{
    "id": "preg-levonorgestrel-ethinylestradiol",
    "name": "Levonorgestrel + Ethinylestradiol",
    "genericName": "Levonorgestrel and Ethinylestradiol",
    "category": "Kontrasepsi / Pil KB Kombinasi",
    "brandNames": [
        "Microgynon 28",
        "Pil KB 1"
    ],
    "fdaCategory": "X",
    "pllrSummary": "KONTRAINDIKASI MUTLAK PADA KEHAMILAN (tidak diindikasikan saat hamil). Namun paparan tidak disengaja awal kehamilan tidak memicu malformasi mayor.",
    "trimesterRisks": {
        "trimester1": "KATEGORI X: KONTRAINDIKASI MUTLAK. Hentikan segera jika kehamilan terkonfirmasi.",
        "trimester2": "KATEGORI X: Tidak diindikasikan.",
        "trimester3": "KATEGORI X: Tidak diindikasikan."
    },
    "halesLactationRating": "L3",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Estrogen menekan volume dan kualitas produksi ASI; hindari penggunaan pada ibu menyusui eksklusif <6 bulan pasca salin.",
    "teratogenicAlert": "Tidak ada bukti teratogenisitas bermakna jika terjadi kehamilan aksidental.",
    "isContraindicatedInPregnancy": true,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [
        "Pil Progestin Tunggal / Mini-Pil (Aman Menyusui)",
        "AKDR Tembaga"
    ],
    "clinicalRecommendations": "KONTRAINDIKASI PADA KEHAMILAN. Pada ibu menyusui, gunakan kontrasepsi non-estrogen (seperti Mini-Pil Progestin atau IUD) agar produksi ASI tidak terganggu.",
    "references": "CDC US MEC for Contraceptive Use & WHO"
},
{
    "id": "preg-medroxyprogesterone-estradiol",
    "name": "Medroxyprogesterone + Estradiol",
    "genericName": "Medroxyprogesterone Acetate and Estradiol Cypionate",
    "category": "Kontrasepsi / KB Suntik Bulanan",
    "brandNames": [
        "Cyclofem 1 mL Injeksi"
    ],
    "fdaCategory": "X",
    "pllrSummary": "KONTRAINDIKASI PADA KEHAMILAN. Estrogen dapat mengurangi volume produksi ASI.",
    "trimesterRisks": {
        "trimester1": "KATEGORI X: KONTRAINDIKASI MUTLAK.",
        "trimester2": "KATEGORI X: Tidak diindikasikan.",
        "trimester3": "KATEGORI X: Tidak diindikasikan."
    },
    "halesLactationRating": "L3",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Komponen estrogen dapat menurunkan kuantitas ASI; hindari pada 6 bulan pertama menyusui eksklusif.",
    "teratogenicAlert": "Tidak ada teratogenisitas langsung pada paparan awal tidak sengaja.",
    "isContraindicatedInPregnancy": true,
    "isContraindicatedInLactation": true,
    "safeAlternatives": [
        "KB Suntik 3 Bulan DMPA (Depo Progestin Murni, Aman Menyusui)"
    ],
    "clinicalRecommendations": "KONTRAINDIKASI PADA KEHAMILAN. Untuk ibu yang sedang menyusui eksklusif, KB suntik 3 bulan (DMPA) lebih direkomendasikan karena tidak mengandung estrogen.",
    "references": "CDC US MEC & WHO"
},
{
    "id": "preg-paraffin-glycerin-phenolphthalein",
    "name": "Paraffin + Glycerin + Phenolphthalein",
    "genericName": "Liquid Paraffin, Glycerin, and Phenolphthalein",
    "category": "Saluran Cerna / Laksatif Emulsi",
    "brandNames": [
        "Laxadine Emulsi"
    ],
    "fdaCategory": "C",
    "pllrSummary": "Fenolftalein dapat diserap sistemik dan memicu kontraksi uterus pada dosis tinggi. Parafin cair menurunkan absorpsi vitamin K.",
    "trimesterRisks": {
        "trimester1": "KATEGORI C: Utamakan terapi serat dan banyak minum air.",
        "trimester2": "KATEGORI C: Gunakan Laktulosa atau Gliserin supositoria jika perlu.",
        "trimester3": "KATEGORI C: Hindari parafin cair jangka panjang (risiko defisiensi vitamin K pada neonatus)."
    },
    "halesLactationRating": "L3",
    "relativeInfantDosePercent": "<1%",
    "breastfeedingSummary": "Fenolftalein dapat masuk ke dalam ASI dan menyebabkan diare pada bayi; gunakan laksatif alternatif selama menyusui.",
    "teratogenicAlert": "Tidak ada bukti efek teratogenik mayor.",
    "isContraindicatedInPregnancy": false,
    "isContraindicatedInLactation": false,
    "safeAlternatives": [
        "Lactulose Sirup (Kategori B, Pilihan Baku Laksatif Kehamilan & Menyusui)",
        "Psyllium Serat"
    ],
    "clinicalRecommendations": "Pada wanita hamil atau menyusui dengan konstipasi, Laktulosa sirup atau serat makanan adalah pilihan pertama yang jauh lebih aman.",
    "references": "Briggs Drugs in Pregnancy and Lactation"
}
];

export const SAFE_PREGNANCY_CONDITIONS: SafePregnancyConditionGuide[] = [
  {
    id: 'cond-hipertensi',
    conditionName: 'Hipertensi Gestasional & Preeklampsia',
    category: 'Kardiovaskular',
    firstLineSafeDrugs: [
      {
        drugName: 'Methyldopa (Dopamet)',
        fdaCategory: 'B (Aman Lini 1)',
        dosageNote: '250-500 mg 2-3x/hari (Maksimal 2-3 g/hari)',
        safetyProfile: 'Obat lini pertama terlama dengan rekam jejak keamanan janin paling luas di dunia.'
      },
      {
        drugName: 'Nifedipine Extended Release (Adalat OROS)',
        fdaCategory: 'C (Aman Lini 1)',
        dosageNote: '30-60 mg sekali sehari',
        safetyProfile: 'Sangat efektif mengontrol tekanan darah dan mencegah krisis hipertensi.'
      },
      {
        drugName: 'Labetalol',
        fdaCategory: 'C (Aman Lini 1)',
        dosageNote: '100-400 mg 2x/hari oral (atau IV untuk krisis)',
        safetyProfile: 'Kombinasi alfa & beta blocker pilihan utama di standar internasional (ACOG/NICE).'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Hydralazine',
        fdaCategory: 'C',
        dosageNote: '5-10 mg IV bolus lambat untuk krisis hipertensi di IGD',
        safetyProfile: 'Digunakan khusus untuk kedaruratan hipertensi maternal di kamar bersalin/VK.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'ACE Inhibitor (Captopril, Lisinopril, Ramipril)',
        riskReason: 'Fetopati ACEI: Oligohidramnion berat, anuria, gagal ginjal janin, kematian perinatal.'
      },
      {
        drugName: 'Angiotensin Receptor Blocker / ARB (Losartan, Candesartan, Valsartan)',
        riskReason: 'Sama seperti ACEI: Gagal ginjal neonatal dan deformitas tengkorak kranium janin.'
      },
      {
        drugName: 'Spironolactone',
        riskReason: 'Efek antiandrogenik memicu feminisasi genitalia pada janin laki-laki.'
      }
    ],
    clinicalPearls: [
      'Target tekanan darah pada kehamilan adalah 110-140 / 80-85 mmHg.',
      'Aspirin dosis rendah (80-150 mg/hari) wajib diberikan mulai minggu ke-12 s.d. 36 untuk mencegah preeklampsia pada ibu risiko tinggi (POGI 2023).'
    ]
  },
  {
    id: 'cond-diabetes',
    conditionName: 'Diabetes Melitus Gestasional (GDM)',
    category: 'Endokrin',
    firstLineSafeDrugs: [
      {
        drugName: 'Insulin Human / Analog (Reguler Actrapid, NPH, Aspart, Lispro, Detemir)',
        fdaCategory: 'B (Gold Standard)',
        dosageNote: 'Sesuai profil glukosa darah (Titrasi basal-bolus)',
        safetyProfile: 'Pilihan nomor 1 di seluruh dunia. Tidak menembus plasenta sehingga 100% aman untuk janin.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Metformin',
        fdaCategory: 'B (Alternatif)',
        dosageNote: '500-1000 mg 2x/hari bersama makanan',
        safetyProfile: 'Dapat digunakan jika pasien menolak injeksi insulin, namun 30-40% tetap membutuhkan tambahan insulin.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Sulfonilurea (Glibenklamid / Glimepirid)',
        riskReason: 'Menembus plasenta memicu hiperinsulinemia janin, makrosomia (>4 kg), dan hipoglikemia neonatal refrakter.'
      },
      {
        drugName: 'SGLT2 Inhibitor (Empagliflozin, Dapagliflozin)',
        riskReason: 'Toksisitas perkembangan ginjal janin pada studi praklinis.'
      },
      {
        drugName: 'GLP-1 RA (Semaglutide, Tirzepatide)',
        riskReason: 'Hentikan minimal 2 bulan sebelum kehamilan; data keamanan janin belum memadai.'
      }
    ],
    clinicalPearls: [
      'Target glukosa darah GDM (ADA 2024 / POGI): Puasa <95 mg/dL, 1 jam postprandial <140 mg/dL, 2 jam postprandial <120 mg/dL.',
      'Kontrol glikemik yang ketat mencegah malformasi jantung kongenital janin dan distosia bahu saat persalinan.'
    ]
  },
  {
    id: 'cond-infeksi-isk',
    conditionName: 'Infeksi Saluran Kemih (ISK) & ISPA Kehamilan',
    category: 'Infeksi',
    firstLineSafeDrugs: [
      {
        drugName: 'Amoxicillin-Clavulanate (Augmentin)',
        fdaCategory: 'B (Lini 1)',
        dosageNote: '625 mg tiap 8 jam selama 5-7 hari',
        safetyProfile: 'Sangat aman, teruji pada puluhan ribu kehamilan tanpa risiko teratogenik.'
      },
      {
        drugName: 'Cefixime / Cephalexin',
        fdaCategory: 'B (Lini 1 ISK)',
        dosageNote: 'Cefixime 100-200 mg 2x/hari selama 5-7 hari',
        safetyProfile: 'Sefalosporin generasi ke-3 sangat ampuh untuk bakteriuria asimtomatik dan ISK bumil.'
      },
      {
        drugName: 'Fosfomycin Trometamol',
        fdaCategory: 'B',
        dosageNote: '3 gram single dose sachet dilarutkan air',
        safetyProfile: 'Sangat praktis (dosis tunggal) dengan kepatuhan terapi 100% untuk sistitis akut.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Azithromycin / Erythromycin',
        fdaCategory: 'B (Untuk Alergi Penicillin)',
        dosageNote: 'Azithromycin 500 mg hari ke-1, 250 mg hari 2-5',
        safetyProfile: 'Pilihan aman untuk infeksi Chlamydia atau ISPA pada bumil dengan alergi beta-laktam.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Tetrasiklin & Doksisiklin',
        riskReason: 'Diskolorasi permanen gigi janin (kuning-coklat) dan hambatan osteogenesis tulang (Trimester 2 & 3).'
      },
      {
        drugName: 'Fluoroquinolone (Ciprofloxacin, Levofloxacin)',
        riskReason: 'Artropati kartilago dan kerusakan tulang rawan sendi janin.'
      },
      {
        drugName: 'Cotrimoxazole (Trimester 1 & Trimester 3 Akhir)',
        riskReason: 'Neural Tube Defect (TM 1) dan Kernikterus Otak Janin (TM 3 akhir).'
      }
    ],
    clinicalPearls: [
      'Bakteriuria asimtomatik pada ibu hamil WAJIB diobati tuntas karena berisiko tinggi menjadi Pielonefritis akut dan persalinan prematur.'
    ]
  },
  {
    id: 'cond-mual-muntah',
    conditionName: 'Emesis & Hiperemesis Gravidarum (Morning Sickness)',
    category: 'Gastrointestinal',
    firstLineSafeDrugs: [
      {
        drugName: 'Pyridoxine (Vitamin B6)',
        fdaCategory: 'A (Lini 1 Gold Standard)',
        dosageNote: '10-25 mg 3-4x/hari',
        safetyProfile: 'Kategori A FDA. Pilihan lini pertama paling aman untuk morning sickness.'
      },
      {
        drugName: 'Doxylamine + Pyridoxine',
        fdaCategory: 'A',
        dosageNote: '10 mg Doxylamine + 10 mg B6 sebelum tidur',
        safetyProfile: 'Kombinasi standar resmi FDA untuk mual muntah kehamilan.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Metoclopramide',
        fdaCategory: 'B',
        dosageNote: '10 mg 3x/hari 30 menit sebelum makan',
        safetyProfile: 'Aman untuk motilitas lambung jika B6 belum memadai.'
      },
      {
        drugName: 'Ondansetron',
        fdaCategory: 'B (Pasca TM 1)',
        dosageNote: '4-8 mg 2-3x/hari (Oral/IV)',
        safetyProfile: 'Pilihan untuk Hiperemesis Gravidarum berat yang refrakter pasca minggu ke-10.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Misoprostol',
        riskReason: 'Uterotonik kuat yang memicu keguguran spontan dan Sindrom Moebius.'
      }
    ],
    clinicalPearls: [
      'Anjurkan makan porsi kecil tapi sering (small frequent meals) dan hindari makanan berminyak/berbau tajam.'
    ]
  },
  {
    id: 'cond-nyeri-demam',
    conditionName: 'Demam, Nyeri Akut & Sakit Kepala',
    category: 'Analgesik & Antipiretik',
    firstLineSafeDrugs: [
      {
        drugName: 'Paracetamol (Acetaminophen)',
        fdaCategory: 'B (Lini 1 Teraman)',
        dosageNote: '500-1000 mg tiap 6-8 jam bila perlu (Maks 3-4 g/hari)',
        safetyProfile: 'Pilihan teraman di seluruh trimester kehamilan dan selama masa menyusui.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Kompres hangat & Hidrasi cairan adekuat',
        fdaCategory: 'Non-Farmakologis',
        dosageNote: 'Minum air putih 2-3 liter/hari',
        safetyProfile: 'Membantu menurunkan suhu tubuh secara alami.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'NSAID (Ibuprofen, Asam Mefenamat, Ketorolac, Diklofenak) pada Usia Kehamilan >=20 Minggu',
        riskReason: 'Penutupan prematur duktus arteriosus janin, hipertensi pulmonal neonatal (PPHN), dan oligohidramnion.'
      },
      {
        drugName: 'Aspirin Dosis Tinggi (>300 mg)',
        riskReason: 'Pendarahan intrakranial perinatal dan penutupan duktus arteriosus.'
      }
    ],
    clinicalPearls: [
      'Demam tinggi maternal (>38.5°C) pada trimester 1 harus segera diturunkan dengan parasetamol karena hipertermia memicu defek tabung saraf janin.'
    ]
  },
  {
    id: 'cond-asma',
    conditionName: 'Asma Bronkial Maternal',
    category: 'Respirasi',
    firstLineSafeDrugs: [
      {
        drugName: 'Budesonide Inhaler (Pulmicort Turbuhaler)',
        fdaCategory: 'B (Lini 1 Pengontrol)',
        dosageNote: '200-400 mcg dihirup 2x/hari',
        safetyProfile: 'Steroid inhalasi teraman dengan data registri kehamilan paling luas di dunia.'
      },
      {
        drugName: 'Salbutamol Inhaler (Ventolin MDI)',
        fdaCategory: 'C (Lini 1 Pelega Akut)',
        dosageNote: '1-2 semprotan saat sesak nafas kambuh',
        safetyProfile: 'Pelega bronkodilator SABA pilihan utama saat serangan asma akut.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Ipratropium Inhaler',
        fdaCategory: 'B',
        dosageNote: '2 semprotan 3-4x/hari',
        safetyProfile: 'Antikolinergik inhalasi aman sebagai tambahan jika SABA belum optimal.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Dekongestan Oral (Pseudoephedrine) pada Trimester 1',
        riskReason: 'Vasokonstriksi pembuluh darah memicu Gastroschisis (dinding perut janin terbuka).'
      }
    ],
    clinicalPearls: [
      'Aturan 1/3 pada asma kehamilan: 1/3 pasien membaik, 1/3 menetap, dan 1/3 memburuk. Mencegah hipoksia janin jauh lebih penting dibanding risiko obat inhalasi.'
    ]
  },
  {
    id: 'cond-gerd-dispepsia',
    conditionName: 'GERD, Heartburn & Dispepsia Kehamilan',
    category: 'Gastrointestinal',
    firstLineSafeDrugs: [
      {
        drugName: 'Antasida (Aluminium & Magnesium Hidroksida)',
        fdaCategory: 'B (Lini 1 Cepat)',
        dosageNote: '1-2 sendok takar sesudah makan dan sebelum tidur',
        safetyProfile: 'Bekerja lokal menetralkan asam lambung dengan penyerapan sistemik minimal.'
      },
      {
        drugName: 'Sukralfat (Inpepsa)',
        fdaCategory: 'B (Lini 1 Mukoprotektor)',
        dosageNote: '1 gram (1 sendok) 3-4x/hari saat perut kosong',
        safetyProfile: 'Melapisi dinding lambung yang teriritasi; tidak diserap ke dalam darah.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Famotidine / Ranitidine',
        fdaCategory: 'B (Antagonis H2)',
        dosageNote: '20-40 mg 2x/hari',
        safetyProfile: 'Aman jika antasida dan sukralfat belum mencukupi.'
      },
      {
        drugName: 'Omeprazole',
        fdaCategory: 'C (PPI)',
        dosageNote: '20 mg sekali sehari pagi hari',
        safetyProfile: 'Digunakan untuk esofagitis erosif refrakter.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Sodium Bikarbonat (Baking Soda / Antasida Basa Natrium)',
        riskReason: 'Memicu alkalosis metabolik maternal dan retensi cairan / edema preeklampsia.'
      },
      {
        drugName: 'Misoprostol',
        riskReason: 'Memicu kontraksi uterus dan keguguran spontan.'
      }
    ],
    clinicalPearls: [
      'Heartburn pada trimester 3 dipicu oleh relaksasi sfingter esofagus bawah akibat hormon progesteron dan penekanan mekanik rahim.'
    ]
  },
  {
    id: 'cond-tiroid',
    conditionName: 'Gangguan Tiroid Gestasional (Hipotiroid & Hipertiroid)',
    category: 'Endokrin',
    firstLineSafeDrugs: [
      {
        drugName: 'Levothyroxine (Euthyrox)',
        fdaCategory: 'A (Untuk Hipotiroidisme)',
        dosageNote: 'Titrasi sesuai TSH (target TSH <2.5 mIU/L pada TM 1)',
        safetyProfile: 'Kategori A FDA. Mutlak wajib diberikan untuk perkembangan IQ dan otak janin.'
      },
      {
        drugName: 'Propylthiouracil / PTU (Trimester 1)',
        fdaCategory: 'D (Untuk Hipertiroidisme TM 1)',
        dosageNote: '50-100 mg 3x/hari pada Trimester 1',
        safetyProfile: 'Pilihan lini pertama pada Trimester 1 (risiko teratogenik lebih rendah dibanding Methimazole).'
      },
      {
        drugName: 'Methimazole / Thiamazole (Trimester 2 & 3)',
        fdaCategory: 'D (Untuk Hipertiroidisme TM 2 & 3)',
        dosageNote: '5-15 mg/hari pada Trimester 2 & 3',
        safetyProfile: 'Pilihan lini pertama pada Trimester 2 & 3 (profil hepar lebih aman dibanding PTU).'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Propranolol',
        fdaCategory: 'C',
        dosageNote: '10-20 mg 2-3x/hari jangka pendek',
        safetyProfile: 'Untuk mengontrol gejala palpitasi tirotoksikosis akut maternal.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Radioiodine (Iodium Radioaktif I-131)',
        riskReason: 'KONTRAINDIKASI MUTLAK. Merusak dan mengablasi permanen kelenjar tiroid janin.'
      }
    ],
    clinicalPearls: [
      'Kebutuhan Levotiroksin meningkat 30-50% saat hamil; lakukan pemeriksaan TSH berkala tiap 4-6 minggu.'
    ]
  },
  {
    id: 'cond-tromboembolisme',
    conditionName: 'Tromboembolisme Vena (DVT & Emboli Paru)',
    category: 'Hematologi',
    firstLineSafeDrugs: [
      {
        drugName: 'Enoxaparin (LMWH / Lovenox)',
        fdaCategory: 'B (Gold Standard)',
        dosageNote: 'Profilaksis: 40 mg SC q24h; Terapi DVT: 1 mg/kg SC q12h',
        safetyProfile: 'Molekul besar 100% tidak menembus barier plasenta. Standar emas dunia.'
      },
      {
        drugName: 'Heparin Tak Terfraksi (UFH)',
        fdaCategory: 'C',
        dosageNote: 'Titrasi infus IV dengan target aPTT 1.5-2.5 kali kontrol',
        safetyProfile: 'Pilihan saat persalinan aterm karena waktu paruh singkat dan reversibel dengan Protamin.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Stoking Kompresi Elastis Gradien (GCS)',
        fdaCategory: 'Non-Farmakologis',
        dosageNote: 'Dipakai sepanjang hari saat beraktivitas',
        safetyProfile: 'Membantu venous return tanpa efek samping sistemik.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'Warfarin',
        riskReason: 'Fetal Warfarin Syndrome (Kondrodisplasia punctata, mikrosefali, atrofi optik).'
      },
      {
        drugName: 'DOAC (Rivaroxaban, Apixaban, Dabigatran)',
        riskReason: 'Menembus plasenta; data keamanan manusia belum ada; risiko perdarahan janin.'
      }
    ],
    clinicalPearls: [
      'Ibu hamil memiliki risiko DVT 4-5 kali lipat lebih tinggi dibanding wanita tidak hamil akibat status hiperkoagulabilitas fisiologis.'
    ]
  }
];
