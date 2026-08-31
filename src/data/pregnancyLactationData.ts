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
  relativeInfantDosePercent: number | string; // RID % (<10% is typically considered compatible)
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
  // ==========================================
  // KARDIOVASKULAR & ANTIHIPERTENSI
  // ==========================================
  {
    id: 'preg-methyldopa',
    name: 'Methyldopa',
    genericName: 'Methyldopa',
    category: 'Kardiovaskular (Antihipertensi)',
    brandNames: ['Dopamet', 'Methyldopa Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Obat pilihan lini pertama (first-line) untuk hipertensi kronis dan hipertensi gestasional pada kehamilan dengan riwayat keamanan klinis terlama.',
    trimesterRisks: {
      trimester1: 'Aman, tidak ditemukan peningkatan risiko malformasi kongenital.',
      trimester2: 'Aman, mempertahankan perfusi uteroplasenta secara adekuat.',
      trimester3: 'Aman, dapat digunakan hingga persalinan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.5,
    breastfeedingSummary: 'Terekskresi dalam ASI dalam jumlah sangat minimal (<2% RID). Kompatibel dengan menyusui.',
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
    pllrSummary: 'Calcium Channel Blocker (CCB) dihidropiridin yang efektif sebagai antihipertensi lini pertama dan tokolitik (penunda persalinan prematur).',
    trimesterRisks: {
      trimester1: 'Data manusia menunjukkan tidak ada peningkatan risiko teratogenisitas signifikan.',
      trimester2: 'Aman dan efektif mengontrol tekanan darah.',
      trimester3: 'Aman. Bermanfaat sebagai tokolitik penekan kontraksi uterus prematur.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 2.3,
    breastfeedingSummary: 'Ekskresi ke ASI sangat rendah. Tidak ada efek samping buruk dilaporkan pada bayi menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Labetalol'],
    clinicalRecommendations: 'Gunakan sediaan lepas lambat (Adalat OROS 30-60 mg/hari). Hindari sediaan sublingual short-acting karena memicu hipotensi mendadak dan hipoksia janin.',
    references: 'Briggs Drugs in Pregnancy and Lactation & Konsensus PERKI/POGI Hipertensi Kehamilan'
  },
  {
    id: 'preg-captopril',
    name: 'Captopril',
    genericName: 'Captopril',
    category: 'Kardiovaskular (ACE Inhibitor)',
    brandNames: ['Capoten', 'Captopril Generik', 'Tensobon'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Trimester 2 & 3 Kehamilan. Menyebabkan fetotoksisitas berat, oligohidramnion, gagal ginjal janin, dan kematian perinatal.',
    trimesterRisks: {
      trimester1: 'Kategori C/D: Potensi peningkatan risiko defek kardiovaskular dan susunan saraf pusat.',
      trimester2: 'KATEGORI D: Menyebabkan oligohidramnion, hipoplasia paru janin, gagal ginjal janin anuria.',
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
    id: 'preg-furosemide',
    name: 'Furosemide',
    genericName: 'Furosemide',
    category: 'Kardiovaskular (Diuretik Loop)',
    brandNames: ['Lasix', 'Farsix', 'Uresix'],
    fdaCategory: 'C',
    pllrSummary: 'Diuretik dapat menurunkan volume plasma maternal dan menurunkan perfusi darah ke plasenta janin. Hanya digunakan jika ada indikasi edema paru akut maternal.',
    trimesterRisks: {
      trimester1: 'Studi hewan menunjukkan potensi toksisitas skeletal; data manusia terbatas.',
      trimester2: 'Dapat menurunkan aliran darah uteroplasenta.',
      trimester3: 'Dapat menurunkan volume cairan amnion (oligohidramnion) dan dehidrasi maternal.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 2.0,
    breastfeedingSummary: 'Dapat menekan produksi ASI (laktasi) karena efek diuretik deplesi cairan. Gunakan dosis terendah.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Retriksi garam non-farmakologis', 'Posisi miring ke kiri (Left lateral tilt)'],
    clinicalRecommendations: 'Jangan digunakan untuk edema fisiologis kehamilan. Batasi penggunaan hanya untuk gagal jantung kongestif atau edema paru akut.',
    references: 'ACOG Practice Bulletin & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-spironolactone',
    name: 'Spironolactone',
    genericName: 'Spironolactone',
    category: 'Kardiovaskular (Antagonis Aldosteron / Diuretik Hemat Kalium)',
    brandNames: ['Aldactone', 'Spirolacton', 'Carpiaton'],
    fdaCategory: 'C',
    pllrSummary: 'Memiliki efek antiandrogenik. Berpotensi menyebabkan feminisasi genitalia eksterna pada janin laki-laki.',
    trimesterRisks: {
      trimester1: 'Risiko feminisasi janin laki-laki (hipospadia, ambiguitas genital).',
      trimester2: 'Risiko gangguan endokrin janin dan penurunan perfusi plasenta.',
      trimester3: 'Risiko deplesi volume plasma dan gangguan elektrolit neonatal.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.7,
    breastfeedingSummary: 'Kadar metabolit canrenone dalam ASI sangat rendah. Kompatibel dengan menyusui.',
    teratogenicAlert: 'Feminisasi genital pada janin laki-laki akibat blokade reseptor androgen.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methyldopa', 'Nifedipine ER', 'Labetalol'],
    clinicalRecommendations: 'Hindari penggunaannya selama kehamilan, terutama pada trimester pertama.',
    references: 'Briggs Drugs in Pregnancy & Hale’s Medications and Mothers’ Milk'
  },
  {
    id: 'preg-simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    category: 'Kardiovaskular (Statin / HMG-CoA Reduktase Inhibitor)',
    brandNames: ['Zocor', 'Simvask', 'Selvim'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Kehamilan (FDA Kategori X). Kolesterol sangat krusial untuk perkembangan membran sel, mielinisasi saraf, dan sintesis steroid janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Peningkatan risiko anomali kongenital VACTERL (Vertebral, Anal, Cardiac, Tracheoesophageal, Renal, Limb).',
      trimester2: 'KATEGORI X: Gangguan sintesis hormon steroid dan perkembangan otak janin.',
      trimester3: 'KATEGORI X: Penurunan kolesterol plasma janin yang merugikan.'
    },
    halesLactationRating: 'L4',
    relativeInfantDosePercent: 'Tidak diketahui',
    breastfeedingSummary: 'Potensi mengganggu metabolisme lipid bayi. Kontraindikasi selama masa menyusui.',
    teratogenicAlert: 'Asosiasi malformasi kongenital VACTERL dan holoprosensefali.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Diet rendah lemak & modifikasi gaya hidup', 'Bile acid sequestrant (Kolesevelam / Kolestiramin) jika dislipidemia familial ekstrem'],
    clinicalRecommendations: 'Hentikan statin minimal 1-2 bulan sebelum merencanakan kehamilan. Terapi statin dapat ditunda sementara selama kehamilan karena risiko aterosklerosis maternal jangka pendek sangat rendah.',
    references: 'FDA Drug Safety Communication on Statins in Pregnancy & Briggs'
  },
  {
    id: 'preg-warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin Sodium',
    category: 'Kardiovaskular (Antikoagulan Antagonis Vitamin K)',
    brandNames: ['Coumadin', 'Simarc-2', 'Warfarin Generik'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI pada Trimester 1 Kehamilan (Sindrom Warfarin Fetal). Menembus sawar plasenta dan menyebabkan perdarahan janin serta malformasi tulang rawan.',
    trimesterRisks: {
      trimester1: 'KATEGORI X (Minggu 6-12): Sindrom Warfarin Janin (Fetal Warfarin Syndrome) berupa hipoplasia hidung dan stippled epiphyses (kondrodisplasia punktata).',
      trimester2: 'Kategori D: Risiko kelainan susunan saraf pusat, atrofi optik, mikrosefali.',
      trimester3: 'KATEGORI X: Risiko perdarahan intrakranial janin fatal saat persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'TIDAK TERDETEKSI dalam ASI. Sangat aman (L1) untuk ibu menyusui pasca persalinan.',
    teratogenicAlert: 'Fetal Warfarin Syndrome: Hipoplasia nasal, kelainan tulang epifisis (stippled epiphyses), mikrosefali, retardasi mental, atrofi saraf mata.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Low Molecular Weight Heparin / LMWH (Enoxaparin)', 'Unfractionated Heparin (UFH)'],
    clinicalRecommendations: 'Ganti warfarin ke LMWH (Enoxaparin) sebelum konsepsi atau segera saat tes kehamilan positif. LMWH tidak menembus plasenta sehingga aman.',
    references: 'ACOG Practice Bulletin on Thromboembolism in Pregnancy & Chest Guidelines'
  },
  {
    id: 'preg-enoxaparin',
    name: 'Enoxaparin',
    genericName: 'Enoxaparin Sodium',
    category: 'Kardiovaskular (LMWH / Antikoagulan)',
    brandNames: ['Lovenox', 'Inviclot', 'Enoxaparin Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Antikoagulan pilihan utama (Gold Standard) selama kehamilan. Molekul besar tidak menembus sawar plasenta sehingga aman bagi janin.',
    trimesterRisks: {
      trimester1: 'Aman, tidak teratogenik.',
      trimester2: 'Aman, tidak menembus plasenta.',
      trimester3: 'Aman. Hentikan 12-24 jam sebelum rencana persalinan atau anestesi epidural untuk mencegah hematoma spinal.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.05,
    breastfeedingSummary: 'Molekul besar tidak diserap secara oral oleh saluran cerna bayi. Sangat aman saat menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Heparin Standar / UFH'],
    clinicalRecommendations: 'Pilihan utama profilaksis & terapi DVT/PE pada kehamilan atau pasien dengan katup jantung mekanik.',
    references: 'RCOG Green-top Guideline on Thromboembolism in Pregnancy & Briggs'
  },

  // ==========================================
  // ANALGESIK, ANTIPIRETIK & NSAID
  // ==========================================
  {
    id: 'preg-paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol',
    category: 'Analgesik & Antipiretik',
    brandNames: ['Panadol', 'Sanmol', 'Pamol', 'Biogesic', 'Dumin'],
    fdaCategory: 'B',
    pllrSummary: 'Analgesik dan antipiretik lini pertama paling aman di seluruh trimester kehamilan dan selama masa menyusui.',
    trimesterRisks: {
      trimester1: 'Aman pada dosis terapeutik lazim (500-1000 mg tiap 4-6 jam, maks 4 g/hari).',
      trimester2: 'Aman.',
      trimester3: 'Aman. Tidak mempengaruhi ductus arteriosus atau fungsi ginjal janin.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 2.0,
    breastfeedingSummary: 'Ekskresi ke ASI sangat rendah. Sangat aman dan menjadi pilihan utama analgesik saat menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol adalah lini 1'],
    clinicalRecommendations: 'Gunakan dosis efektif terendah dengan durasi sesingkat mungkin. Hindari kombinasi dengan kafein dosis tinggi.',
    references: 'FDA Drug Safety Communication & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'Analgesik & Antiinflamasi (NSAID)',
    brandNames: ['Proris', 'Brufen', 'Bufect', 'Farsifen'],
    fdaCategory: 'C',
    pllrSummary: 'Kategori C pada Trimester 1 & 2. KONTRAINDIKASI MUTLAK pada Trimester 3 (≥20-30 minggu kehamilan) karena risiko penutupan prematur ductus arteriosus dan oligohidramnion.',
    trimesterRisks: {
      trimester1: 'Kategori C: Penggunaan terus-menerus dikaitkan dengan sedikit peningkatan risiko keguguran spontan.',
      trimester2: 'Kategori C: Gunakan hanya jika sangat diperlukan dan hindari setelah usia kehamilan 20 minggu.',
      trimester3: 'KATEGORI D (Kontraindikasi): Penutupan prematur duktus arteriosus janin, hipertensi pulmonal neonatal, oligohidramnion, perpanjangan masa persalinan.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.38,
    breastfeedingSummary: 'Kadar dalam ASI sangat rendah (<0.5% RID). Pilihan NSAID paling aman untuk ibu menyusui pasca melahirkan.',
    teratogenicAlert: 'Penutupan prematur Ductus Arteriosus janin dan disfungsi ginjal janin (Oligohidramnion) pada trimester 3.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol (Lini 1 Kehamilan)'],
    clinicalRecommendations: 'Hindari NSAID pada usia kehamilan ≥20 minggu (FDA Warning 2020). Jika membutuhkan analgesik saat hamil, selalu utamakan Paracetamol.',
    references: 'FDA Warning on NSAIDs in Pregnancy from 20 Weeks & Briggs'
  },
  {
    id: 'preg-asam-mefenamat',
    name: 'Asam Mefenamat',
    genericName: 'Mefenamic Acid',
    category: 'Analgesik & Antiinflamasi (NSAID)',
    brandNames: ['Ponstan', 'Mefinal', 'Asmef Generik'],
    fdaCategory: 'C',
    pllrSummary: 'NSAID dengan sifat inhibisi prostaglandin perifer. Kontraindikasi pada trimester ketiga kehamilan.',
    trimesterRisks: {
      trimester1: 'Kategori C: Potensi peningkatan risiko keguguran.',
      trimester2: 'Kategori C: Potensi oligohidramnion jika digunakan >48 jam.',
      trimester3: 'KATEGORI D (Kontraindikasi): Penutupan prematur ductus arteriosus dan perdarahan postpartum.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.8,
    breastfeedingSummary: 'Jumlah minimal terekskresi ke ASI. Kompatibel untuk masa menyusui singkat.',
    teratogenicAlert: 'Penutupan dini duktus arteriosus dan gangguan hemostasis neonatal.',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Paracetamol'],
    clinicalRecommendations: 'Hindari pada trimester ketiga kehamilan. Ganti dengan Paracetamol.',
    references: 'Briggs Drugs in Pregnancy and Lactation'
  },
  {
    id: 'preg-aspirin-low',
    name: 'Aspirin Dosis Rendah (Low-Dose Aspirin)',
    genericName: 'Acetylsalicylic Acid (80-150 mg/hari)',
    category: 'Antiplatelet & Profilaksis Preeklampsia',
    brandNames: ['Aspilets', 'Cardio Aspirin', 'Miniaspi', 'Thrombo Aspilets'],
    fdaCategory: 'C',
    pllrSummary: 'Dosis rendah (80-150 mg/hari) DIREKOMENDASIKAN oleh POGI, ACOG, dan WHO untuk pencegahan preeklampsia pada ibu hamil risiko tinggi.',
    trimesterRisks: {
      trimester1: 'Aman jika dimulai pada akhir trimester 1 (minggu ke-12 s.d. 16) untuk profilaksis preeklampsia.',
      trimester2: 'Aman dan efektif meningkatkan aliran vaskular plasenta.',
      trimester3: 'Aman pada dosis rendah (<150 mg). Hentikan pada usia kehamilan 36-37 minggu untuk mencegah risiko perdarahan persalinan.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 2.5,
    breastfeedingSummary: 'Dosis rendah (antiplatelet) kompatibel dengan menyusui. Hindari aspirin dosis analgesik tinggi (>1000 mg/hari) karena risiko Sindrom Reye.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Calcium suplementasi 1.5-2 g/hari'],
    clinicalRecommendations: 'Diresepkan mulai usia kehamilan 12-16 minggu hingga minggu ke-36 bagi wanita dengan riwayat preeklampsia, hipertensi kronis, diabetes pregestasional, atau penyakit ginjal.',
    references: 'USPSTF 2021 & POGI Guideline on Low-Dose Aspirin for Preeclampsia Prevention'
  },

  // ==========================================
  // ANTIMIKROBA & ANTIBIOTIK
  // ==========================================
  {
    id: 'preg-amoxicillin',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antimikroba (Beta-Laktam Penicillin)',
    brandNames: ['Amoxil', 'Amoxsan', 'Kalmoxillin', 'Yusimox'],
    fdaCategory: 'B',
    pllrSummary: 'Antibiotik lini pertama paling aman untuk ISPA, infeksi saluran kemih (ISK), dan infeksi gigi selama kehamilan dan menyusui.',
    trimesterRisks: {
      trimester1: 'Aman, data surveilans ribuan kehamilan tidak menunjukkan efek teratogenik.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.5,
    breastfeedingSummary: 'Kadar dalam ASI sangat kecil. Pantau potensi diare ringan atau kandidiasis oral pada bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cefalexin', 'Cefixime', 'Erythromycin'],
    clinicalRecommendations: 'Antibiotik pilihan utama untuk infeksi bakteri umum pada kehamilan. Dosis lazim 500 mg tiap 8 jam.',
    references: 'CDC Guidelines for Perinatal Infections & Briggs'
  },
  {
    id: 'preg-cefixime',
    name: 'Cefixime',
    genericName: 'Cefixime Trihydrate',
    category: 'Antimikroba (Sefalosporin Generasi ke-3)',
    brandNames: ['Cefspan', 'Cefila', 'Fixacep', 'Cefixime Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Sefalosporin oral generasi ke-3 yang sangat aman dan efektif untuk infeksi saluran kemih (ISK), bakteriuria asimtomatik, dan gonore pada kehamilan.',
    trimesterRisks: {
      trimester1: 'Aman, tidak teratogenik.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.0,
    breastfeedingSummary: 'Ekskresi ke ASI minimal. Aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Amoxicillin-Clavulanate', 'Cephalexin'],
    clinicalRecommendations: 'Pilihan utama terapi ISK kehamilan (100-200 mg 2 kali sehari selama 5-7 hari) untuk mencegah pielonefritis dan persalinan prematur.',
    references: 'ACOG Practice Bulletin on Antimicrobial Therapy in Pregnancy'
  },
  {
    id: 'preg-ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin Hydrochloride',
    category: 'Antimikroba (Fluoroquinolone)',
    brandNames: ['Ciproxin', 'Baquinor', 'Ciflox'],
    fdaCategory: 'C',
    pllrSummary: 'Golongan Quinolone berikatan dengan tulang rawan dan memicu artropati sendi serta erosi kartilago pada sendi penopang berat badan janin.',
    trimesterRisks: {
      trimester1: 'Kategori C: Potensi artropati kartilago dan toksisitas skeletal janin.',
      trimester2: 'Kategori C: Risiko kerusakan kartilago sendi janin.',
      trimester3: 'Kategori C: Risiko artropati sendi neonatal dan tendinopati.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 2.1,
    breastfeedingSummary: 'Dapat diekskresikan dalam ASI. Jika ada alternatif (Sefalosporin/Makrolida), hindari quinolone saat menyusui.',
    teratogenicAlert: 'Artropati dan kerusakan kartilago sendi pada studi hewan muda.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cefixime', 'Ceftriaxone', 'Amoxicillin-Clavulanate', 'Nitrofurantoin (Trimester 2)'],
    clinicalRecommendations: 'HINDARI selama kehamilan kecuali tidak ada alternatif antibiotik lain untuk infeksi resisten berat yang mengancam jiwa.',
    references: 'FDA Drug Information on Fluoroquinolones & Briggs'
  },
  {
    id: 'preg-doxycycline',
    name: 'Doxycycline',
    genericName: 'Doxycycline Hyclate',
    category: 'Antimikroba (Tetrasiklin)',
    brandNames: ['Vibramycin', 'Dohixat', 'Interdoxin'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Trimester 2 & 3. Berikatan dengan kalsium memicu diskolorasi permanen gigi janin (kuning-kecoklatan) dan hipoplasia enamel serta retardasi pertumbuhan tulang.',
    trimesterRisks: {
      trimester1: 'Kategori D: Penggunaan singkat (<14 hari) memiliki risiko minimal, namun tetap dihindari.',
      trimester2: 'KATEGORI D: Pewarnaan kuning-coklat permanen pada gigi sulung janin dan hambatan osteogenesis tulang.',
      trimester3: 'KATEGORI D: Diskolorasi gigi permanen, hipoplasia email gigi, depresi pertumbuhan tulang fibula.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 3.5,
    breastfeedingSummary: 'Penggunaan jangka pendek (<= 14 hari) relatif aman karena kalsium dalam ASI mengikat doksisiklin dan menghambat absorpsi di saluran cerna bayi.',
    teratogenicAlert: 'Pewarnaan permanen gigi (yellow-gray-brown discoloration) dan hipoplasia email gigi janin.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Azithromycin', 'Erythromycin', 'Amoxicillin'],
    clinicalRecommendations: 'Ganti dengan Azithromycin atau Eritromisin untuk infeksi Chlamydia atau infeksi saluran napas pada kehamilan.',
    references: 'CDC STI Treatment Guidelines & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-cotrimoxazole',
    name: 'Cotrimoxazole (Trimethoprim + Sulfamethoxazole)',
    genericName: 'Sulfamethoxazole + Trimethoprim',
    category: 'Antimikroba (Sulfonamida & Antifolat)',
    brandNames: ['Bactrim', 'Sanprim', 'Bactrizol', 'Cotrimoxazole Generik'],
    fdaCategory: 'D',
    pllrSummary: 'Hindari pada Trimester 1 (Trimethoprim adalah antagonis asam folat -> risiko Neural Tube Defect) dan Hindari pada Akhir Trimester 3 (Sulfonamida mendesak bilirubin -> risiko Kernikterus neonatal).',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Antagonis asam folat meningkatkan risiko cacat tabung saraf (spina bifida), celah bibir, dan defek jantung.',
      trimester2: 'Kategori C: Relatif lebih aman jika tidak ada alternatif, namun pantau ketat.',
      trimester3: 'KATEGORI D: Sulfonamida menggeser ikatan bilirubin dari albumin memicu Hiperbilirubinemia & Kernikterus (kerusakan otak) pada neonatus.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 3.0,
    breastfeedingSummary: 'Hindari pada ibu yang menyusui bayi prematur, bayi sakit kuning (ikterus), atau bayi defisiensi enzim G6PD.',
    teratogenicAlert: 'Neural Tube Defect (Trimester 1) dan Kernikterus Neonatal (Trimester 3).',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Cefixime', 'Amoxicillin-Clavulanate', 'Fosfomycin'],
    clinicalRecommendations: 'Kontraindikasi pada trimester 1 dan minggu-minggu menjelang persalinan. Jika terpaksa digunakan di trimester 1, berikan suplementasi Asam Folat dosis tinggi (4-5 mg/hari).',
    references: 'ACOG Practice Bulletin & Briggs Drugs in Pregnancy'
  },
  {
    id: 'preg-metronidazole',
    name: 'Metronidazole',
    genericName: 'Metronidazole',
    category: 'Antimikroba & Antiprotozoa (Nitroimidazole)',
    brandNames: ['Flagyl', 'Trichodazol', 'Metronidazole Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Aman untuk tatalaksana Trikomoniasis, Vaginosis Bakterial (BV), dan infeksi anaerob. Pengobatan BV pada kehamilan mencegah persalinan prematur.',
    trimesterRisks: {
      trimester1: 'Data meta-analisis terbaru menunjukkan tidak ada peningkatan risiko teratogenisitas.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 8.5,
    breastfeedingSummary: 'Dapat memberikan rasa pahit pada ASI. Pada dosis tinggi oral tunggal 2 g, dapat jeda menyusui 12-24 jam.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Clindamycin oral/topikal'],
    clinicalRecommendations: 'Pilihan utama untuk Trichomonas vaginalis dan Bacterial Vaginosis simtomatik pada wanita hamil.',
    references: 'CDC STI Treatment Guidelines & ACOG'
  },

  // ==========================================
  // SALURAN CERNA & ANTIEMETIK
  // ==========================================
  {
    id: 'preg-ondansetron',
    name: 'Ondansetron',
    genericName: 'Ondansetron Hydrochloride',
    category: 'Antiemetik (Antagonis Reseptor 5-HT3)',
    brandNames: ['Zofran', 'Narfoz', 'Cendansetron', 'Ondansetron Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Antiemetik pilihan kedua/ketiga yang sangat efektif untuk Hiperemesis Gravidarum berat yang refrakter terhadap Vitamin B6 dan antihistamin.',
    trimesterRisks: {
      trimester1: 'Data besar menunjukkan profil keamanan baik, sedikit asosiasi celah bibir/palatum pada studi lama namun tidak terbukti konsisten.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.2,
    breastfeedingSummary: 'Ekskresi ke ASI minimal. Kompatibel dengan menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Pyridoxine (Vitamin B6 - Lini 1)', 'Doxylamine', 'Metoclopramide'],
    clinicalRecommendations: 'Gunakan jika mual-muntah kehamilan berat (NVP / Hiperemesis Gravidarum) gagal diatasi dengan Vitamin B6 10-25 mg 3-4x/hari.',
    references: 'ACOG Practice Bulletin No. 189 (Nausea and Vomiting of Pregnancy)'
  },
  {
    id: 'preg-pyridoxine',
    name: 'Pyridoxine (Vitamin B6)',
    genericName: 'Pyridoxine Hydrochloride',
    category: 'Vitamin & Antiemetik Lini Pertama',
    brandNames: ['Vitamin B6 Generik', 'Anvomer B6', 'Mediamer B6'],
    fdaCategory: 'A',
    pllrSummary: 'Terapi lini pertama (Gold Standard) paling aman untuk mengatasi mual dan muntah pada kehamilan (Morning Sickness).',
    trimesterRisks: {
      trimester1: 'KATEGORI A: Sangat aman, tidak ada risiko janin.',
      trimester2: 'Kategori A: Sangat aman.',
      trimester3: 'Kategori A: Sangat aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.1,
    breastfeedingSummary: 'Komponen vitamin alami ASI. Sangat aman.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Pyridoxine adalah Lini 1'],
    clinicalRecommendations: 'Dosis 10-25 mg per oral 3-4 kali sehari. Dapat dikombinasikan dengan antihistamin Doxylamine 10-12.5 mg.',
    references: 'ACOG Practice Bulletin on Nausea and Vomiting of Pregnancy & PNPK Kemenkes'
  },
  {
    id: 'preg-omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole Magnesium',
    category: 'Saluran Cerna (Proton Pump Inhibitor / PPI)',
    brandNames: ['Prilosec', 'Ozid', 'Pumpitor', 'Omeprazole Generik'],
    fdaCategory: 'C',
    pllrSummary: 'PPI yang paling banyak diteliti pada kehamilan. Aman digunakan untuk GERD refrakter dan tukak peptikum pada ibu hamil.',
    trimesterRisks: {
      trimester1: 'Data meta-analisis tidak menunjukkan peningkatan risiko malformasi kongenital.',
      trimester2: 'Aman.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.1,
    breastfeedingSummary: 'Sebagian besar terdegradasi oleh asam lambung bayi. Kompatibel dengan menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Antasida (Aluminium/Magnesium Hidroksida - Lini 1)', 'Famotidine / Ranitidine (H2RA)'],
    clinicalRecommendations: 'Lini pertama GERD kehamilan adalah modifikasi diet & Antasida. Jika gejala persisten, PPI Omeprazole 20 mg/hari aman diberikan.',
    references: 'ACG Guidelines for the Management of GERD in Pregnancy & Briggs'
  },
  {
    id: 'preg-misoprostol',
    name: 'Misoprostol',
    genericName: 'Misoprostol',
    category: 'Saluran Cerna (Analog Prostaglandin E1) / Uterotonika',
    brandNames: ['Cytotec', 'Gastrul', 'Invitec', 'Misotab'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Kehamilan (kecuali untuk indikasi terminasi medis/induksi persalinan resmi). Memicu kontraksi uterus kuat, aborsi, dan Sindrom Moebius.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Memicu keguguran spontan, perdarahan hebat, dan Sindrom Moebius (kelumpuhan saraf kranial VI & VII pada janin).',
      trimester2: 'KATEGORI X: Ruptur uteri dan kematian janin.',
      trimester3: 'Kategori X untuk ulkus lambung. Digunakan secara medis khusus di RS untuk induksi persalinan aterm / penanganan perdarahan postpartum.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 0.2,
    breastfeedingSummary: 'Waktu paruh sangat singkat (<30 menit). Aman untuk pendarahan pasca salin saat laktasi.',
    teratogenicAlert: 'Sindrom Moebius (kelumpuhan saraf fasialis & abdusen bilateral janin, ekspresi wajah topeng), kelainan reduksi tungkai (arthrogryposis).',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Antasida', 'Sucralfate', 'Omeprazole'],
    clinicalRecommendations: 'DILARANG KERAS digunakan sebagai obat maag pada wanita hamil karena efek uterotonik aborsi dan teratogenik berat.',
    references: 'FDA Black Box Warning on Misoprostol & POGI Guideline'
  },

  // ==========================================
  // ENDOKRIN & DIABETES
  // ==========================================
  {
    id: 'preg-insulin-regular',
    name: 'Insulin Human (Reguler / NPH)',
    genericName: 'Recombinant Human Insulin',
    category: 'Endokrin (Insulin Lini Pertama Kehamilan)',
    brandNames: ['Actrapid', 'Humulin R', 'Humulin N', 'Insulatard'],
    fdaCategory: 'B',
    pllrSummary: 'PILIHAN EMAS UTAMA (Gold Standard) untuk Diabetes Melitus Gestasional (GDM) dan Diabetes Pregestasional selama kehamilan.',
    trimesterRisks: {
      trimester1: 'Aman, tidak menembus sawar plasenta. Mengontrol glukosa mencegah malformasi jantung kongenital janin.',
      trimester2: 'Aman, titrasi dosis sesuai kenaikan resistensi insulin kehamilan.',
      trimester3: 'Aman, mencegah makrosomia (bayi besar >4 kg) dan hipoglikemia neonatal pasca lahir.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.0,
    breastfeedingSummary: 'Molekul protein besar terdegradasi di saluran cerna bayi. Sangat aman dan merupakan hormon alami tubuh.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Human adalah lini 1'],
    clinicalRecommendations: 'Target gula darah puasa pada bumil <95 mg/dL, 1 jam postprandial <140 mg/dL, 2 jam postprandial <120 mg/dL (PERKENI / ADA 2024).',
    references: 'ADA Standards of Care in Pregnancy 2024 & Konsensus PERKENI GDM'
  },
  {
    id: 'preg-metformin',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'Endokrin (Antidiabetes Oral Biguanide)',
    brandNames: ['Glucophage', 'Formin', 'Metformin Generik'],
    fdaCategory: 'B',
    pllrSummary: 'Alternatif oral lini kedua untuk Diabetes Gestasional atau sindrom ovarium polikistik (PCOS). Menembus plasenta namun tidak teratogenik.',
    trimesterRisks: {
      trimester1: 'Aman, sering dilanjutkan pada pasien PCOS untuk mencegah keguguran awal.',
      trimester2: 'Aman, namun sekitar 30-40% pasien tetap membutuhkan tambahan insulin.',
      trimester3: 'Aman.'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.4,
    breastfeedingSummary: 'Kadar dalam ASI sangat rendah (<0.5% RID). Kompatibel dan aman untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Human (Lini 1 Utama)'],
    clinicalRecommendations: 'Dapat digunakan jika pasien menolak terapi insulin atau kesulitan akses penyimpanan rantai dingin insulin.',
    references: 'NICE Guidelines on Diabetes in Pregnancy & ADA 2024'
  },
  {
    id: 'preg-glibenclamide',
    name: 'Glibenclamide (Glyburide)',
    genericName: 'Glibenclamide',
    category: 'Endokrin (Antidiabetes Sulfonilurea)',
    brandNames: ['Daonil', 'Glucovance', 'Glibenclamide Generik'],
    fdaCategory: 'C',
    pllrSummary: 'Menembus plasenta dalam jumlah signifikan dan memicu hiperinsulinemia janin, makrosomia janin, serta hipoglikemia neonatal berat.',
    trimesterRisks: {
      trimester1: 'Kategori C: Risiko fluktuasi glikemik.',
      trimester2: 'Kategori C: Risiko makrosomia janin lebih tinggi dibanding Insulin/Metformin.',
      trimester3: 'Kategori C: Risiko hipoglikemia berat berkepanjangan pada neonatus pasca lahir.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.5,
    breastfeedingSummary: 'Kompatibel saat laktasi, namun pantau tanda hipoglikemia pada bayi.',
    teratogenicAlert: 'Makrosomia janin dan hipoglikemia neonatal refrakter.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Insulin Human (Actrapid/Humulin)', 'Metformin'],
    clinicalRecommendations: 'TIDAK DIREKOMENDASIKAN untuk Diabetes Gestasional oleh ADA dan POGI karena luaran neonatal lebih buruk dibanding Insulin.',
    references: 'ADA Guidelines & ACOG Practice Bulletin on Gestational Diabetes'
  },
  {
    id: 'preg-propylthiouracil',
    name: 'Propylthiouracil (PTU)',
    genericName: 'Propylthiouracil',
    category: 'Endokrin (Antitiroid Tiourea)',
    brandNames: ['PTU Generik', 'Propiltiourasil'],
    fdaCategory: 'D',
    pllrSummary: 'Obat antitiroid pilihan pertama (Lini 1) pada TRIMESTER PERTAMA Kehamilan karena risiko malformasi kongenital jauh lebih rendah dibanding Methimazole.',
    trimesterRisks: {
      trimester1: 'PILIHAN UTAMA untuk Hipertiroidisme Trimester 1.',
      trimester2: 'Dapat diganti ke Methimazole untuk menghindari risiko hepatotoksisitas maternal PTU.',
      trimester3: 'Dapat digunakan pada dosis minimal untuk mencegah hipotiroidisme dan goiter janin.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.8,
    breastfeedingSummary: 'Ekskresi ke ASI minimal karena ikatan protein tinggi. Pilihan utama antitiroid saat menyusui.',
    teratogenicAlert: 'Goiter janin dan hipotiroidisme neonatal jika dosis berlebihan (target FT4 pada batas atas normal).',
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Methimazole (Hanya pada Trimester 2 & 3)'],
    clinicalRecommendations: 'Gunakan PTU pada Trimester 1 (minggu 1-12), lalu pertimbangkan beralih ke Methimazole pada Trimester 2 & 3 untuk mengurangi risiko hepatitis maternal (American Thyroid Association).',
    references: 'ATA Guidelines for the Management of Thyroid Disease During Pregnancy'
  },
  {
    id: 'preg-methimazole',
    name: 'Methimazole (Thiamazole)',
    genericName: 'Thiamazole / Methimazole',
    category: 'Endokrin (Antitiroid)',
    brandNames: ['Thyrozol', 'Tapazole'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI pada Trimester Pertama Kehamilan karena menyebabkan Embriopati Methimazole (Aplasia Cutis Congenita & Atresia Koana). Pilihan utama pada Trimester 2 & 3.',
    trimesterRisks: {
      trimester1: 'KATEGORI D (Kontraindikasi): Embriopati Methimazole (Aplasia Cutis, Atresia Esofagus/Koana, dismorfisme wajah).',
      trimester2: 'Pilihan utama (lebih aman bagi hepar ibu dibanding PTU).',
      trimester3: 'Pilihan utama pada dosis terendah.'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 6.0,
    breastfeedingSummary: 'Dapat digunakan dengan dosis moderat (maks 20 mg/hari). Pantau fungsi tiroid bayi.',
    teratogenicAlert: 'Embriopati Methimazole: Aplasia Cutis Congenita (kulit kepala tidak terbentuk), Atresia Koana, Atresia Esofagus.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Propylthiouracil / PTU (Lini 1 Trimester 1)'],
    clinicalRecommendations: 'Gunakan PTU pada Trimester 1. Methimazole digunakan mulai Trimester 2 ke atas.',
    references: 'American Thyroid Association (ATA) Guidelines on Pregnancy & Briggs'
  },

  // ==========================================
  // SISTEM SARAF PUSAT & PSIKIATRI
  // ==========================================
  {
    id: 'preg-asam-valproat',
    name: 'Asam Valproat (Valproic Acid / Divalproex)',
    genericName: 'Sodium Valproate / Valproic Acid',
    category: 'Sistem Saraf (Antiepilepsi & Mood Stabilizer)',
    brandNames: ['Depakote', 'Depakene', 'Ikalep', 'Divalproex Generik'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI TERTINGGI untuk Epilepsi/Bipolar pada Kehamilan (FDA Boxed Warning). Menyebabkan risiko malformasi mayor tertinggi (10%) dan penurunan skor IQ anak 8-11 poin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Neural Tube Defect (Spina Bifida) 1-2%, kelainan jantung kraniofasial, hipospadia, limb defect.',
      trimester2: 'KATEGORI X: Gangguan perkembangan neurokognitif, spektrum autisme (ASD), penurunan skor IQ.',
      trimester3: 'KATEGORI X: Gangguan koagulopati dan hipoglikemia neonatal.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 1.5,
    breastfeedingSummary: 'Ekskresi ke ASI rendah karena ikatan protein tinggi. Kompatibel saat menyusui dengan pemantauan hepar bayi.',
    teratogenicAlert: 'Fetal Valproate Syndrome: Spina Bifida (Neural Tube Defect), Cleft Lip/Palate, Craniosynostosis, Autisme, Penurunan IQ permanen.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Lamotrigine (Lini 1 Epilepsi Bumil)', 'Levetiracetam (Lini 1)', 'Suplementasi Asam Folat 4-5 mg/hari'],
    clinicalRecommendations: 'Dilarang keras diresepkan untuk wanita usia subur tanpa kontrasepsi efektif. Ganti ke Lamotrigine atau Levetiracetam sebelum konsepsi.',
    references: 'FDA Safety Alert on Valproate in Pregnancy & ILAE Guidelines'
  },
  {
    id: 'preg-lamotrigine',
    name: 'Lamotrigine',
    genericName: 'Lamotrigine',
    category: 'Sistem Saraf (Antiepilepsi Lini Pertama Kehamilan)',
    brandNames: ['Lamictal', 'Lamiros'],
    fdaCategory: 'C',
    pllrSummary: 'Antiepilepsi pilihan lini pertama paling aman pada kehamilan dengan angka kejadian malformasi terendah di register kehamilan internasional.',
    trimesterRisks: {
      trimester1: 'Profil teratogenisitas terendah di antara semua antiepilepsi (<2-3% sebanding baseline populasi normal).',
      trimester2: 'Klirens obat meningkat 50-100% akibat induksi glukuronidasi estrogen kehamilan -> monitor kadar darah dan naikkan dosis.',
      trimester3: 'Titrasi dosis meningkat, lalu turunkan kembali pasca persalinan untuk mencegah toksisitas.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 9.0,
    breastfeedingSummary: 'Kadar dalam ASI moderat (RID ~9%). Aman untuk ibu menyusui dengan pemantauan ruam kulit dan sedasi pada bayi.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Levetiracetam (Keppra)'],
    clinicalRecommendations: 'Antiepilepsi pilihan utama untuk wanita hamil. Wajib disertai suplementasi Asam Folat 4 mg/hari.',
    references: 'ILAE Guidelines on Epilepsy in Pregnancy & Briggs'
  },
  {
    id: 'preg-phenytoin',
    name: 'Phenytoin',
    genericName: 'Phenytoin Sodium',
    category: 'Sistem Saraf (Antiepilepsi Hidantoin)',
    brandNames: ['Dilantin', 'Kutoin', 'Phenytoin Generik'],
    fdaCategory: 'D',
    pllrSummary: 'KONTRAINDIKASI RELATIF. Menyebabkan Fetal Hydantoin Syndrome (kelainan bentuk kraniofasial dan hipoplasia kuku jari).',
    trimesterRisks: {
      trimester1: 'KATEGORI D: Fetal Hydantoin Syndrome (hipoplasia jari & kuku, celah bibir/langit-langit, mikrosefali).',
      trimester2: 'Kategori D: Gangguan pertumbuhan janin.',
      trimester3: 'Kategori D: Perdarahan neonatal akibat defisiensi vitamin K dependent clotting factor.'
    },
    halesLactationRating: 'L2',
    relativeInfantDosePercent: 3.5,
    breastfeedingSummary: 'Ekskresi ke ASI rendah. Kompatibel untuk ibu menyusui.',
    teratogenicAlert: 'Fetal Hydantoin Syndrome: Hipoplasia falang distal & kuku jari tangan/kaki, celah bibir/palatum, jembatan hidung datar, mikrosefali.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Lamotrigine', 'Levetiracetam'],
    clinicalRecommendations: 'Jika terpaksa digunakan, berikan Vitamin K1 10 mg/hari oral pada ibu di bulan terakhir kehamilan dan 1 mg IM pada bayi baru lahir.',
    references: 'ACOG Practice Bulletin on Epilepsy in Pregnancy & Briggs'
  },
  {
    id: 'preg-diazepam',
    name: 'Diazepam',
    genericName: 'Diazepam',
    category: 'Sistem Saraf (Benzodiazepin / Ansiolitik)',
    brandNames: ['Valium', 'Valisanbe', 'Stesolid'],
    fdaCategory: 'D',
    pllrSummary: 'Penggunaan jangka panjang atau dosis tinggi menjelang persalinan memicu Floppy Infant Syndrome (hipotonia, depresi pernapasan, hipotermia, gejala putus obat neonatal).',
    trimesterRisks: {
      trimester1: 'Kategori D: Asosiasi dengan celah bibir dan langit-langit (cleft palate) pada penggunaan trimester awal.',
      trimester2: 'Kategori D: Depresi SSP janin.',
      trimester3: 'KATEGORI D: Floppy Infant Syndrome (lemas lunglai, hipotermia, refleks hisap buruk, apneu, withdrawal neonatus).'
    },
    halesLactationRating: 'L3',
    relativeInfantDosePercent: 7.0,
    breastfeedingSummary: 'Metabolit aktif (desmethyldiazepam) memiliki waktu paruh panjang dan dapat terakumulasi pada bayi (sedasi berlebih). Hindari penggunaan rutin.',
    teratogenicAlert: 'Floppy Infant Syndrome dan Cleft Palate.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Sertraline (untuk ansietas/depresi)', 'Konseling psikoterapi non-farmakologis'],
    clinicalRecommendations: 'Hindari benzodiazepin kerja panjang. Jika sangat mendesak untuk kejang akut/status epileptikus, gunakan dosis tunggal darurat terendah.',
    references: 'FDA Drug Information on Benzodiazepines in Pregnancy & Briggs'
  },
  {
    id: 'preg-sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline Hydrochloride',
    category: 'Sistem Saraf (Antidepresan SSRI)',
    brandNames: ['Zoloft', 'Fridep', 'Nudep'],
    fdaCategory: 'C',
    pllrSummary: 'Antidepresan SSRI pilihan pertama (Lini 1) paling aman pada kehamilan dan masa menyusui dengan tingkat transfer ASI paling rendah.',
    trimesterRisks: {
      trimester1: 'Profil keamanan teratogenisitas organogenesis terbaik di antara seluruh SSRI.',
      trimester2: 'Aman.',
      trimester3: 'Risiko ringan Neonatal Adaptation Syndrome (iritabilitas transien 24-48 jam pasca lahir yang sembuh spontan).'
    },
    halesLactationRating: 'L1',
    relativeInfantDosePercent: 0.5,
    breastfeedingSummary: 'Kadar dalam ASI hampir tidak terdeteksi (<0.5% RID). Pilihan SSRI nomor 1 untuk ibu menyusui.',
    teratogenicAlert: null,
    isContraindicatedInPregnancy: false,
    isContraindicatedInLactation: false,
    safeAlternatives: ['Sertraline adalah Lini 1 SSRI', 'Fluoxetine'],
    clinicalRecommendations: 'Pilihan utama depresi mayor & gangguan kecemasan maternal. Mengobati depresi perinatal sangat krusial untuk mencegah depresi postpartum dan morbiditas bayi.',
    references: 'APA & ACOG Guidelines on Perinatal Depression & Briggs'
  },

  // ==========================================
  // DERMATOLOGI & RETINOID
  // ==========================================
  {
    id: 'preg-isotretinoin',
    name: 'Isotretinoin (Oral)',
    genericName: 'Isotretinoin (13-cis-retinoic acid)',
    category: 'Dermatologi (Retinoid Akne Berat)',
    brandNames: ['Roaccutane', 'Accutane', 'Isotretinoin Generik'],
    fdaCategory: 'X',
    pllrSummary: 'TERATOGEN PALING KUAT DALAM SEJARAH MEDIS (Kategori X Ekstrem). Menyebabkan malformasi kraniofasial, jantung, dan otak berat pada >35% janin yang terpapar.',
    trimesterRisks: {
      trimester1: 'KATEGORI X EKSTREM: Sindrom Embriopati Retinoid (anotia/mikrotia, kelainan jantung konotrunkal, hidrosefalus, mikrosefali).',
      trimester2: 'KATEGORI X EKSTREM: Kerusakan susunan saraf pusat dan retardasi mental berat.',
      trimester3: 'KATEGORI X EKSTREM: Abortus spontan dan kematian janin.'
    },
    halesLactationRating: 'L5',
    relativeInfantDosePercent: 'Sangat Berbahaya',
    breastfeedingSummary: 'KONTRAINDIKASI MUTLAK saat menyusui.',
    teratogenicAlert: 'Retinoid Embryopathy Syndrome: Anotia/Mikrotia (telinga tidak terbentuk), Cleft Palate, Truncus Arteriosus, Tetralogy of Fallot, Hidrosefalus, Hipoplasia Timus.',
    isContraindicatedInPregnancy: true,
    isContraindicatedInLactation: true,
    safeAlternatives: ['Erythromycin topikal', 'Benzoyl Peroxide topikal', 'Clindamycin topikal', 'Azelaic Acid'],
    clinicalRecommendations: 'Wajib program pencegahan kehamilan iPLEDGE (tes kehamilan negatif ganda dan 2 metode kontrasepsi efektif minimal 1 bulan sebelum, selama, dan 1 bulan setelah terapi).',
    references: 'FDA Boxed Warning on Isotretinoin & iPLEDGE Pregnancy Prevention Program'
  },

  // ==========================================
  // ONKOLOGI & IMUNOSUPRESAN
  // ==========================================
  {
    id: 'preg-methotrexate',
    name: 'Methotrexate',
    genericName: 'Methotrexate',
    category: 'Onkologi & Reumatologi (Antifolat Antineoplastik)',
    brandNames: ['Emthexate', 'Methotrexate Generik'],
    fdaCategory: 'X',
    pllrSummary: 'KONTRAINDIKASI MUTLAK pada Kehamilan. Merupakan agen teratogenik kuat dan abortifasien yang menghambat sintesis DNA purin janin.',
    trimesterRisks: {
      trimester1: 'KATEGORI X: Fetal Methotrexate Syndrome (kraniofasial abnormal, kraniosinostosis, hipoplasia paru dan tungkai).',
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
        fdaCategory: 'B (Aman)',
        dosageNote: '250-500 mg 2-3x/hari (Maks 3 g/hari)',
        safetyProfile: 'Obat lini pertama terlama dengan rekam jejak keamanan janin paling luas.'
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
        dosageNote: '100-400 mg 2x/hari',
        safetyProfile: 'Kombinasi alfa & beta blocker pilihan utama di standar internasional.'
      }
    ],
    secondLineAlternativeDrugs: [
      {
        drugName: 'Hydralazine',
        fdaCategory: 'C',
        dosageNote: '5-10 mg IV bolus lambat untuk krisis hipertensi',
        safetyProfile: 'Digunakan khusus untuk kedaruratan hipertensi maternal di IGD/VK.'
      }
    ],
    strictlyContraindicatedDrugs: [
      {
        drugName: 'ACE Inhibitor (Captopril, Lisinopril, Ramipril)',
        riskReason: 'Fetopati ACEI: Oligohidramnion berat, anuria, gagal ginjal janin, kematian perinatal.'
      },
      {
        drugName: 'Angiotensin Receptor Blocker / ARB (Losartan, Candesartan, Valsartan)',
        riskReason: 'Sama seperti ACEI: Gagal ginjal neonatal dan deformitas tengkorak janin.'
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
        drugName: 'Insulin Human (Reguler Actrapid / NPH Insulatard)',
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
      }
    ],
    clinicalPearls: [
      'Target glukosa darah GDM (ADA 2024): Puasa <95 mg/dL, 1 jam postprandial <140 mg/dL, 2 jam postprandial <120 mg/dL.',
      'Kontrol glikemik yang ketat mencegah malformasi jantung kongenital janin dan distosia bahu saat persalinan.'
    ]
  },
  {
    id: 'cond-infeksi-isk',
    conditionName: 'Infeksi Saluran Kemih (ISK) & ISPA Kehamilan',
    category: 'Infeksi',
    firstLineSafeDrugs: [
      {
        drugName: 'Amoxicillin & Amoxicillin-Clavulanate',
        fdaCategory: 'B (Lini 1)',
        dosageNote: '500 mg tiap 8 jam selama 5-7 hari',
        safetyProfile: 'Sangat aman, teruji pada puluhan ribu kehamilan tanpa risiko teratogenik.'
      },
      {
        drugName: 'Cefixime / Cephalexin',
        fdaCategory: 'B (Lini 1 ISK)',
        dosageNote: '100-200 mg 2x/hari selama 5-7 hari',
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
        drugName: 'Erythromycin / Azithromycin',
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
        fdaCategory: 'A (Lini 1)',
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
        fdaCategory: 'B',
        dosageNote: '4-8 mg 2-3x/hari (Oral/IV)',
        safetyProfile: 'Pilihan untuk Hiperemesis Gravidarum berat yang refrakter.'
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
  }
];
