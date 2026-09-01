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
