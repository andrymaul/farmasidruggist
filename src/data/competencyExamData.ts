// Database Komprehensif Pusat Belajar Uji Kompetensi Farmasi (UKMPPAI CBT, OSCE & UKTVF)

export interface CompetencyDomain {
  id: 'klinis' | 'manajemen' | 'teknologi' | 'bahan_alam';
  name: string;
  shortName: string;
  icon: string;
  color: string;
  badgeColor: string;
  description: string;
  weightPercentage: string;
}

export const COMPETENCY_DOMAINS: CompetencyDomain[] = [
  {
    id: 'klinis',
    name: 'Farmasi Klinis & Farmakoterapi',
    shortName: 'Klinis & Terapi',
    icon: 'Stethoscope',
    color: 'emerald',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Tata laksana farmakoterapi penyakit (Kardio, Endokrin, Infeksi, GI, Saraf/Jiwa, Ginjal, Onkologi, Pediatrik/Geriatrik), Drug-Related Problems (DRP), dan penyesuaian dosis.',
    weightPercentage: '50% - 60%'
  },
  {
    id: 'manajemen',
    name: 'Manajemen Farmasi, Farmakoekonomi & Hukum/Regulasi',
    shortName: 'Manajemen & Hukum',
    icon: 'Briefcase',
    color: 'blue',
    badgeColor: 'bg-blue-600 text-white',
    description: 'Perencanaan (Konsumsi, Morbiditas, VEN-ABC), Pengadaan (EOQ, ROP, Safety Stock), HJA, Margin, PPN, Surat Pesanan Narkotika/Psikotropika/Prekursor/OOT, dan Farmakoekonomi.',
    weightPercentage: '15% - 20%'
  },
  {
    id: 'teknologi',
    name: 'Teknologi Farmasi & Formulasi Industri (CPOB)',
    shortName: 'Teknologi & CPOB',
    icon: 'FlaskConical',
    color: 'violet',
    badgeColor: 'bg-violet-600 text-white',
    description: 'Eksipien & formulasi sediaan padat, cair, semipadat, ruang bersih steril Kelas A-E, sistem HVAC, uji disolusi S1-S3, uji stabilitas, dan sterilisasi.',
    weightPercentage: '15% - 20%'
  },
  {
    id: 'bahan_alam',
    name: 'Farmasi Bahan Alam & Fitofarmaka',
    shortName: 'Bahan Alam & Herbal',
    icon: 'Leaf',
    color: 'amber',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Kategori Jamu, OHT, Fitofarmaka, metode ekstraksi (maserasi, perkolasi, sokletasi, refluks), senyawa marker aktif tanaman obat, dan standardisasi simplisia/ekstrak.',
    weightPercentage: '10% - 15%'
  }
];

export interface HighYieldTopic {
  id: string;
  domainId: 'klinis' | 'manajemen' | 'teknologi' | 'bahan_alam';
  title: string;
  category: string;
  tags: string[];
  summary: string;
  keyPearls: string[];
  frequentExamPitfalls: string[];
  referenceStandard: string;
}

export const HIGH_YIELD_TOPICS: HighYieldTopic[] = [
  // ==========================================
  // DOMAIN 1: KLINIS & TERAPI
  // ==========================================
  {
    id: 'top-ht-jnc8',
    domainId: 'klinis',
    title: 'Tata Laksana Hipertensi Komprehensif (JNC 8 / ISH / PERKI)',
    category: 'Kardiovaskular',
    tags: ['Hipertensi', 'ACEI', 'ARB', 'CCB', 'Diuretik', 'CKD', 'Diabetes'],
    summary: 'Pemilihan antihipertensi lini pertama berdasarkan populasi ras dan komorbiditas: Populasi non-kulit hitam (ACEI/ARB, CCB, atau Tiazid); Populasi kulit hitam (CCB atau Tiazid); Pasien CKD (dengan atau tanpa DM) WAJIB ACEI atau ARB sebagai nefroprotektor proteinuria.',
    keyPearls: [
      'Target TD umum: < 140/90 mmHg. Lansia >= 60 tahun tanpa DM/CKD: < 150/90 mmHg.',
      'Ibu Hamil: Obat pilihan utama adalah Metildopa, Labetalol, atau Nifedipin PO. KONTRAINDIKASI MUTLAK: ACEI & ARB (teratogenik gagal ginjal janin).',
      'Pasien DM tanpa CKD: ACEI, ARB, CCB, atau Tiazid.',
      'Pasien DM + Albuminuria / CKD: ACEI atau ARB (menurunkan tekanan intraglomerulus).',
      'Pasien Pasca-Infark Miokard (Post-MI) / Gagal Jantung: Beta Blocker (Bisoprolol, Carvedilol, Metoprolol Suksinat) + ACEI/ARB.',
      'Hipertensi Emergensi (TD > 180/120 mmHg + Target Organ Damage): Nikardipin IV, Nitrogliserin IV, atau Diltiazem IV. Turunkan MAP maksimal 20-25% pada 1 jam pertama.'
    ],
    frequentExamPitfalls: [
      'Jangan pernah mengombinasikan ACEI + ARB (meningkatkan risiko hiperkalemia dan gagal ginjal akut tanpa manfaat tambahan).',
      'Batuk kering persisten akibat ACEI (akumulasi bradikinin) solusinya adalah mengganti ke golongan ARB (misal: Valsartan/Candesartan), bukan menurunkan dosis ACEI.'
    ],
    referenceStandard: 'JNC 8 Guidelines & Konsensus PERKI'
  },
  {
    id: 'top-dm-perkeni',
    domainId: 'klinis',
    title: 'Diabetes Mellitus Tipe 2: Algoritma Terapi Oral & Insulin (PERKENI)',
    category: 'Endokrin & Metabolik',
    tags: ['Diabetes', 'Metformin', 'Sulfonilurea', 'SGLT2i', 'GLP-1 RA', 'Insulin'],
    summary: 'Metformin adalah monoterapi lini pertama jika tidak ada kontraindikasi (eGFR < 30 mL/min). Pemilihan obat kedua/ketiga disesuaikan dengan profil komorbiditas (ASCVD, CKD, Gagal Jantung, Obesitas, atau Risiko Hipoglikemia).',
    keyPearls: [
      'Lini Pertama: Metformin 500 mg - 2000 mg/hari bersama makan. Hentikan jika eGFR < 30 mL/min (risiko Asidosis Laktat).',
      'Komorbid Gagal Jantung (HF) atau CKD: Pilih SGLT2 Inhibitor (Empagliflozin, Dapagliflozin).',
      'Komorbid Penyakit Jantung Aterosklerotik (ASCVD): Pilih GLP-1 Receptor Agonist (Liraglutide) atau SGLT2 Inhibitor.',
      'Prioritas Menghindari Kenaikan BB / Target Penurunan BB: GLP-1 RA atau SGLT2i.',
      'Prioritas Biaya Ekonomis: Sulfonilurea Generik (Glimepiride/Gliclazide). Hindari Glibenklamid pada lansia (waktu paruh panjang -> risiko hipoglikemia berkepanjangan).',
      'Indikasi Memulai Insulin: HbA1c > 10% atau GDS > 300 mg/dL dengan gejala katabolik (BB turun drastis, poliuria, polidipsia), krisis hiperglikemia (KAD/HHS), gagal dengan kombinasi 3 OAD.'
    ],
    frequentExamPitfalls: [
      'Sulfonilurea diminum 15-30 menit SEBELUM MAKAN (pagi), sedangkan Metformin diminum BERSAMA atau SEGERA SETELAH MAKAN untuk mencegah gangguan lambung.',
      'Acarbose diminum pada SUAPAN PERTAMA MAKANAN untuk menghambat enzim alfa-glukosidase.',
      'Efek samping SGLT2i: Infeksi saluran kemih (ISK) dan mikosis genital karena glukosuria.'
    ],
    referenceStandard: 'Pedoman Pengelolaan DM Tipe 2 PERKENI & ADA Standards of Care'
  },
  {
    id: 'top-asthma-gina',
    domainId: 'klinis',
    title: 'Tata Laksana Asma & PPOK: SMART Therapy & Eksaserbasi (GINA & GOLD / PDPI)',
    category: 'Respiratori',
    tags: ['Asma', 'PPOK', 'GINA', 'GOLD', 'ICS-Formoterol', 'SABA', 'LAMA'],
    summary: 'Pedoman GINA terkini tidak lagi merekomendasikan SABA monoterapi untuk asma. Strategi utama adalah SMART/MART (Single Inhaler Maintenance and Reliever Therapy) menggunakan kombinasi ICS dosis rendah + Formoterol.',
    keyPearls: [
      'Jalur 1 GINA (Pilihan Utama): ICS Dosis Rendah + Formoterol digunakan sebagai pengontrol harian SEKALIGUS pereda saat timbul sesak (reliever).',
      'Jalur 2 GINA (Alternatif): ICS reguler harian + SABA (Salbutamol) sebagai pereda sesak saat dibutuhkan.',
      'Eksaserbasi Asma Akut: Oksigenasi target SpO2 93-95% + Inhalasi SABA (Salbutamol nebulisasi) + Ipratropium Bromida + Kortikosteroid Sistemik Oral/IV (Metilprednisolon / Deksametason).',
      'PPOK (GOLD): Terapi lini pertama berbasis LAMA (Tiotropium) atau LABA/LAMA (Indakaterol/Glikopironium). ICS hanya ditambahkan jika eosinofil darah >= 300 sel/uL atau riwayat eksaserbasi berulang.'
    ],
    frequentExamPitfalls: [
      'Inhaler yang mengandung steroid WAJIB diikuti edukasi berkumur air putih hangat dan membuangnya untuk mencegah kandidiasis oral (sariawan jamur) dan disfonia (suara serak).'
    ],
    referenceStandard: 'GINA 2024 Global Strategy for Asthma & Pedoman Diagnosis Asma PDPI'
  },
  {
    id: 'top-dyslipidemia-statin',
    domainId: 'klinis',
    title: 'Dislipidemia: Intensitas Terapi Statin & Manajemen Rhabdomyolysis (PERKI)',
    category: 'Kardiovaskular & Metabolik',
    tags: ['Dislipidemia', 'Statin', 'Atorvastatin', 'Rosuvastatin', 'Fibrat', 'Rhabdomyolysis'],
    summary: 'Statin adalah obat lini pertama penurun kolesterol LDL dan penstabil plak aterosklerosis. Dosis ditentukan berdasarkan tingkat risiko kardiovaskular pasien.',
    keyPearls: [
      'Statin Intensitas Tinggi (Menurunkan LDL >= 50%): Atorvastatin 40-80 mg atau Rosuvastatin 20-40 mg. Diindikasikan untuk pasien risiko sangat tinggi (pasca-ACS, stroke iskemik, DM dengan target organ damage).',
      'Statin Intensitas Sedang (Menurunkan LDL 30-49%): Simvastatin 20-40 mg, Atorvastatin 10-20 mg, Rosuvastatin 5-10 mg, Pravastatin 40 mg.',
      'Hipertrigliseridemia Berat (TG > 500 mg/dL): Terapi lini pertama adalah FIBRAT (Fenofibrat / Gemfibrozil) untuk mencegah pankreatitis akut.',
      'Interaksi Kritis Statin + Fibrat: KONTRAINDIKASI mengombinasikan Simvastatin + Gemfibrozil (meningkatkan risiko Myopathy & Rhabdomyolysis hingga 15x lipat). Jika butuh kombinasi statin + fibrat, pilih FENOFIBRAT.'
    ],
    frequentExamPitfalls: [
      'Simvastatin, Pravastatin, dan Fluvastatin paling baik diminum pada MALAM HARI menjelang tidur karena enzim HMG-CoA Reduktase di hepar paling aktif saat sintesis kolesterol nokturnal. Atorvastatin dan Rosuvastatin memiliki t1/2 panjang sehingga boleh diminum pagi/siang/malam.'
    ],
    referenceStandard: 'Panduan Tata Laksana Dislipidemia PERKI & NLA Recommendations'
  },
  {
    id: 'top-gi-peptic-h-pylori',
    domainId: 'klinis',
    title: 'Penyakit Saluran Cerna: GERD, Ulkus Peptikum & Eradikasi H. pylori (PGI/PAPDI)',
    category: 'Gastroenterologi',
    tags: ['GERD', 'Ulkus Peptikum', 'H. Pylori', 'PPI', 'Antasida', 'Sukralfat', 'Misoprostol'],
    summary: 'Protokol penatalaksanaan GERD, ulkus gaster/duodenum, dan regimen baku eradikasi infeksi Helicobacter pylori.',
    keyPearls: [
      'GERD: Terapi inisial adalah PPI dosis standar (Omeprazole 20 mg / Lansoprazole 30 mg / Esomeprazole 40 mg 1x sehari) selama 4-8 minggu, diminum 30-60 menit SEBELUM MAKAN PAGI.',
      'Regimen Eradikasi H. pylori (Triple Therapy 14 Hari): PPI Dosis Ganda (2x sehari) + Amoksisilin 1000 mg (2x sehari) + Klaritromisin 500 mg (2x sehari). Jika alergi penisilin: Ganti Amoksisilin dengan Metronidazol 500 mg (3x sehari).',
      'Ulkus Akibat NSAID (NSAID-induced Ulcer): Hentikan NSAID. Berikan PPI atau analog prostaglandin Misoprostol. Jika NSAID tetap mutlak dibutuhkan: Ganti dengan NSAID selektif COX-2 (Celecoxib) + PPI.',
      'Sukralfat: Memerlukan suasana asam lambung untuk membentuk pasta pelindung mukosa. Berikan 1 jam SEBELUM makan atau saat lambung kosong. JANGAN diminum bersamaan dengan antasida/PPI (beri jeda minimal 1-2 jam).'
    ],
    frequentExamPitfalls: [
      'Misoprostol adalah kontraindikasi mutlak pada wanita hamil karena memicu kontraksi uterus dan keguguran (efek oksitosik).'
    ],
    referenceStandard: 'Konsensus Nasional Penatalaksanaan Dispepsia dan Infeksi H. pylori PGI/PAPDI'
  },
  {
    id: 'top-ckd-anemia-bone',
    domainId: 'klinis',
    title: 'Penyakit Ginjal Kronik (CKD): Anemia & Gangguan Mineral Tulang (KDIGO)',
    category: 'Nefrologi & Ginjal',
    tags: ['CKD', 'Anemia', 'Eritropoietin', 'Pengikat Fosfat', 'Kalsitriol', 'Hiperkalemia'],
    summary: 'Tata laksana komplikasi CKD stadium lanjut meliputi anemia defisiensi relatif eritropoietin, hiperfosfatemia, hiperparatiroidisme sekunder, dan hiperkalemia.',
    keyPearls: [
      'Anemia pada CKD: Inisiasi ESA (Erythropoiesis-Stimulating Agent / Eritropoietin Alfa/Beta) diberikan jika Hb < 10 g/dL, DENGAN SYARAT status besi tercukupi (Saturasi Transferin / TSAT >= 20% dan Serum Feritin >= 100 ng/mL). Target Hb: 10 - 11,5 g/dL (hindari > 13 g/dL karena risiko stroke/trombosis).',
      'Hiperfosfatemia: Berikan Pengikat Fosfat (Phosphate Binder) Kalsium Karbonat / Kalsium Asetat BERSAMAAN DENGAN SUAPAN MAKANAN agar mengikat fosfat dari makanan di usus.',
      'Defisiensi Vitamin D Aktif: Berikan Kalsitriol (1,25-dihidroksivitamin D3) karena enzim 1-alfa-hidroksilase di ginjal telah rusak.',
      'Kegawatdaruratan Hiperkalemia (K+ > 6,5 mEq/L dengan perubahan EKG / Tall T Wave): 1. Kalsium Glukonat 10% IV (stabilisasi membran jantung); 2. Insulin Cepat 10 Unit + Dextrose 50% IV (menggeser K+ ke intrasel); 3. Inhalasi Salbutamol; 4. Kalium Binding Resin (Sodium Polystyrene Sulfonate / Kalitake) atau Hemodialisis.'
    ],
    frequentExamPitfalls: [
      'Kalsium Karbonat sebagai pengikat fosfat diminum BERSAMA MAKANAN, sedangkan jika difungsikan sebagai suplemen kalsium osteoporosis diminum SESUDAH MAKAN/PERUT KOSONG.'
    ],
    referenceStandard: 'KDIGO 2024 Clinical Practice Guideline for CKD Management'
  },
  {
    id: 'top-epilepsy-psychiatry',
    domainId: 'klinis',
    title: 'Sistem Saraf & Jiwa: Antiepilepsi & Antipsikotik (PERDOSSI & PDSKJI)',
    category: 'Neurologi & Psikiatri',
    tags: ['Epilepsi', 'Fenitoin', 'Valproat', 'Karbamazepin', 'Skizofrenia', 'Haloperidol', 'EPS'],
    summary: 'Pemilihan antiepilepsi berdasarkan tipe bangkitan kejang serta tata laksana efek samping ekstrapiramidal antipsikotik.',
    keyPearls: [
      'Kejang Fokal / Parsial: Lini pertama adalah Karbamazepin, Okskarbazepin, Lamotrigin, atau Fenitoin.',
      'Kejang Umum Tonik-Klonik: Lini pertama adalah Asam Valproat, Lamotrigin, atau Levetirasetam.',
      'Kejang Absans (Petit Mal): Lini pertama adalah ETOSUKSIMID atau ASAM VALPROAT. (Karbamazepin dan Fenitoin KONTRAINDIKASI karena dapat memperparah kejang absans).',
      'Status Epileptikus: Lini 1: Diazepam 10 mg IV lambat (atau Rektal jika belum ada jalur IV) / Midazolam IM; Lini 2 (jika kejang berlanjut 5-10 menit): Fenitoin IV 15-20 mg/kgBB dengan laju max 50 mg/menit.',
      'Efek Ekstrapiramidal (EPS) Antipsikotik Tipikal (Haloperidol): Distonia akut, parkinsonisme, akatisia $\rightarrow$ Berikan Antikolinergik Sentral TRIHEKSIFENIDIL (THP) atau Difenhidramin IM/IV.'
    ],
    frequentExamPitfalls: [
      'Asam Valproat adalah KONTRAINDIKASI RELATIF/MUTLAK pada wanita usia subur/hamil karena efek teratogenik spina bifida (neural tube defect). Suplementasi Asam Folat 4-5 mg/hari wajib diberikan.'
    ],
    referenceStandard: 'Pedoman Tata Laksana Epilepsi PERDOSSI & Panduan Praktik Klinis PDSKJI'
  },
  {
    id: 'top-tb-guidelines',
    domainId: 'klinis',
    title: 'Tata Laksana Tuberkulosis (OAT Kategori 1 & Efek Samping Spesifik)',
    category: 'Penyakit Infeksi',
    tags: ['TB', 'OAT', 'Rifampisin', 'Isoniazid', 'Pirazinamid', 'Etambutol', 'Vitamin B6'],
    summary: 'Pengobatan TB Kasus Baru menggunakan regimen 2RHZE / 4RH (2 bulan fase intensif 4 obat, dilanjutkan 4 bulan fase lanjutan 2 obat). Wajib memahami efek samping khas masing-masing obat dan solusinya.',
    keyPearls: [
      'Rifampisin (R): Efek samping urin/keringat berwarna merah/oranye (tidak berbahaya, edukasi pasien). Induktor kuat CYP3A4 (menurunkan efektivitas pil KB/ARV/Warfarin).',
      'Isoniazid (H): Efek samping Neuritis Perifer (kesemutan, kebas). Pencegahan/Tata laksana: Berikan Piridoksin (Vitamin B6) 10-25 mg/hari.',
      'Pirazinamid (Z): Paling hepatotoksik dan memicu Hiperurisemia (nyeri sendi/Gout).',
      'Etambutol (E): Efek samping Neuritis Optik (gangguan lapang pandang, buta warna merah-hijau). Kontraindikasi pada anak < 5 tahun yang belum bisa tes visus.',
      'Streptomisin (S): Nefrotoksik dan Ototoksik (tinnitus/gangguan pendengaran saraf kranial VIII). Kontraindikasi mutlak pada Ibu Hamil (cacat bawaan janin).'
    ],
    frequentExamPitfalls: [
      'Bila timbul ikterik/hepatitis imbas obat (SGOT/SGPT > 3-5x batas atas): Hentikan semua OAT hepatotoksik (R, H, Z). Berikan alternatif non-hepatotoksik (Streptomisin + Etambutol + Fluorokuinolon) hingga fungsi hati pulih.',
      'OAT diminum 1x sehari di pagi hari saat PERUT KOSONG (minimal 1 jam sebelum makan atau 2 jam setelah makan) untuk penyerapan optimal.'
    ],
    referenceStandard: 'PNPK Tuberkulosis Kemenkes RI & WHO TB Treatment Guidelines'
  },
  {
    id: 'top-antidote-tox',
    domainId: 'klinis',
    title: 'Toksikologi Klinis: Antidotum Spesifik Keracunan & Overdosis',
    category: 'Gawat Darurat & Toksikologi',
    tags: ['Antidotum', 'N-Asetilsistein', 'Nalokson', 'Flumazenil', 'Atropin', 'Vitamin K'],
    summary: 'Hafalan wajib antidotum spesifik pada kasus kegawatdaruratan keracunan obat dan zat kimia berbahaya di ruang IGD.',
    keyPearls: [
      'Paracetamol (Acetaminophen) -> N-Asetilsistein (NAC) (Mengisi kembali cadangan glutation hati untuk menetralkan metabolit toksik NAPQI).',
      'Opioid (Morfin, Petidin, Tramadol, Heroin) -> Nalokson IV (Antagonis murni reseptor opioid).',
      'Benzodiazepin (Diazepam, Alprazolam) -> Flumazenil IV (Antagonis reseptor GABA-A).',
      'Organofosfat & Insektisida Karbamat -> Atropin Sulfat IV (Antimuskarinik) + Pralidoksim / PAM.',
      'Warfarin / Coumarin -> Vitamin K1 (Fitomenadion) + FFP (Fresh Frozen Plasma).',
      'Heparin Tak Terfraksi (UFH) -> Protamin Sulfat (1 mg menetralkan 100 unit heparin).',
      'Metanol & Etilen Glikol -> Fomepizol atau Etanol oral/IV.',
      'Sianida -> Natrium Nitrit + Natrium Tiosulfat atau Hidroksokobalamin.',
      'Digoxin / Digitalis -> Digoxin Immune Fab (DigiFab).',
      'Beta Blocker -> Glukagon IV.',
      'Logam Berat (Timbal/Pb, Merkuri/Hg, Arsen/As) -> Dimercaprol (BAL), Succimer (DMSA), EDTA.'
    ],
    frequentExamPitfalls: [
      'Jangan tertukar antara antidot Warfarin (Vitamin K1) dan Heparin (Protamin Sulfat).',
      'Pada keracunan Paracetamol, waktu emas (golden period) pemberian NAC paling efektif adalah dalam 8 jam pertama pasca-ingesti.'
    ],
    referenceStandard: 'Pedoman Tatalaksana Keracunan BPOM & AHFS Toxicology'
  },
  {
    id: 'top-geriatric-beers',
    domainId: 'klinis',
    title: 'Geriatri: Kriteria Beers & Prinsip Preskripsi Lansia (AGS Beers Criteria)',
    category: 'Geriatri & Farmakoterapi Khusus',
    tags: ['Geriatri', 'Beers Criteria', 'STOPP/START', 'Antikolinergik', 'Polifarmasi'],
    summary: 'Panduan keamanan pemilihan obat pada populasi lansia (>= 65 tahun) untuk meminimalkan risiko jatuh, delirium, dan toksisitas polifarmasi.',
    keyPearls: [
      'Obat Antikolinergik Kuat (Difenhidramin, CTM, Amitriptilin, Triheksifenidil): Hindari pada lansia karena memicu retensi urin akut, konstipasi berat, mulut kering, dan delirium/gangguan memori.',
      'Benzodiazepin Kerja Panjang (Diazepam, Klordiazepoksid): Hindari karena meningkatkan risiko sedasi berkepanjangan, ataksia, dan FRAKTUR TULANG AKIBAT JATUH. Jika mutlak butuh sedatif: Pilih Lorazepam / Temazepam dosis rendah.',
      'Sulfonilurea Kerja Panjang (Glibenklamid): Hindari karena risiko HIPOGLIKEMIA BERKEPANJANGAN. Ganti dengan Glimepirid dosis rendah atau Gliklazid.',
      'NSAID Non-Selektif Kronis: Hindari karena meningkatkan risiko perdarahan saluran cerna fatal, gagal jantung akut, dan perburukan fungsi ginjal.'
    ],
    frequentExamPitfalls: [
      'Prinsip peresepan geriatri: "Start Low, Go Slow" (mulai dari dosis terkecil 1/3 - 1/2 dosis dewasa, titrasi bertahap).'
    ],
    referenceStandard: 'American Geriatrics Society (AGS) Beers Criteria 2023 Update'
  },

  // ==========================================
  // DOMAIN 2: MANAJEMEN FARMASI & HUKUM
  // ==========================================
  {
    id: 'top-ven-abc',
    domainId: 'manajemen',
    title: 'Analisis Perencanaan Obat: Matriks Kombinasi ABC - VEN',
    category: 'Manajemen Rantai Pasok',
    tags: ['VEN', 'ABC', 'Pareto', 'Perencanaan', 'Efisiensi Anggaran'],
    summary: 'Metode pengelompokan obat berdasarkan kepentingan klinis (Vital, Esensial, Non-esensial) dan nilai investasi keuangan (A: 70-80% biaya / 10-20% item; B: 15-20% biaya / 20-30% item; C: 5-10% biaya / 50-60% item).',
    keyPearls: [
      'Kategori Vital (V): Obat penyelamat nyawa (life saving), tidak boleh ada kekosongan sama sekali (misal: Epinefrin, Insulin, Antidotum, Oksigen, Vaksin Rabies).',
      'Kategori Esensial (E): Obat untuk penyakit terbanyak/kausal (Antibiotik, Antihipertensi, OAD, Analgesik).',
      'Kategori Non-esensial (N): Obat penunjang / suplemen / vitamin / kosmetik.',
      'Prioritas Pengurangan Anggaran jika dana terbatas: Mulai dari kategori NC -> NB -> NA -> EC -> EB -> EA -> VA -> VB -> VV (Kategori Vital TIDAK BOLEH dihapus).',
      'Kategori VA (Vital berbiaya tinggi) harus dikendalikan secara sangat ketat dengan safety stock minimal namun pesanan rutin bertahap.'
    ],
    frequentExamPitfalls: [
      'Jika ada soal kasus pemangkasan obat akibat defisit dana rumah sakit, JANGAN PERNAH memilih memangkas kelompok Vital (VA, VB, VC). Jawaban pertama yang dipangkas adalah kelompok N (Non-esensial) khususnya NC.'
    ],
    referenceStandard: 'Permenkes No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di RS'
  },
  {
    id: 'top-consumption-morbidity',
    domainId: 'manajemen',
    title: 'Metode Perencanaan Pengadaan: Konsumsi vs Morbiditas (Epidemiologi)',
    category: 'Perencanaan & Pengadaan',
    tags: ['Metode Konsumsi', 'Metode Morbiditas', 'Lead Time', 'Buffer Stock', 'Safety Stock'],
    summary: 'Teknik perhitungan estimasi kebutuhan riil perbekalan farmasi untuk periode tertentu di Apotek, Puskesmas, dan Rumah Sakit.',
    keyPearls: [
      '1. Metode Konsumsi: Dihitung berdasarkan data pemakaian riil obat periode lalu yang telah disesuaikan (dikoreksi terhadap kekosongan obat / out of stock days).',
      'Rumus Konsumsi: Rencana Pengadaan = (Pemakaian Rata-rata x Periode) + Safety Stock + Lead Time Stock - Sisa Stok.',
      '2. Metode Morbiditas (Epidemiologi): Dihitung berdasarkan jumlah insidensi kasus penyakit pada populasi dikalikan standar dosis pedoman pengobatan (Standard Treatment Guidelines). Sangat tepat untuk penyakit wabah/musiman (DBD, Diare, Malaria) atau rumah sakit baru yang belum memiliki histori data konsumsi.',
      '3. Metode Kombinasi: Menggabungkan metode konsumsi dan morbiditas untuk item obat kritis.'
    ],
    frequentExamPitfalls: [
      'Jika terjadi kekosongan obat selama 10 hari dalam 1 bulan (30 hari), maka pemakaian riil harus dikoreksi menjadi: Pemakaian Riil = (Jumlah Terpakai / 20 hari aktif) x 30 hari.'
    ],
    referenceStandard: 'Pedoman Manajemen Logistik Obat Kemenkes RI'
  },
  {
    id: 'top-pharmacoeconomics',
    domainId: 'manajemen',
    title: 'Prinsip Evaluasi Farmakoekonomi: CMA, CBA, CEA, CUA & ICER',
    category: 'Farmakoekonomi',
    tags: ['CMA', 'CBA', 'CEA', 'CUA', 'ICER', 'QALY'],
    summary: 'Empat metode utama analisis farmakoekonomi dalam pengambilan keputusan formularium dan reimbursement BPJS Kesehatan.',
    keyPearls: [
      '1. Cost-Minimization Analysis (CMA): Digunakan jika efikasi/outcome klinis DUA OBAT SAMA PERSIS (misal: Obat Generik Berlogo vs Obat Paten Originator). Parameter evaluasi: Cari biaya termurah.',
      '2. Cost-Effectiveness Analysis (CEA): Outcome diukur dalam satuan UNIT ALAMIAH NON-MONETER (misal: Penurunan mmHg tekanan darah, penurunan % HbA1c, tahun hidup yang diselamatkan / Life Years Gained). Parameter evaluasi: ICER (Incremental Cost-Effectiveness Ratio).',
      '3. Cost-Utility Analysis (CUA): Outcome diukur dalam satuan KUALITAS HIDUP yaitu QALY (Quality-Adjusted Life Years) atau DALY.',
      '4. Cost-Benefit Analysis (CBA): Biaya dan outcome KEDUANYA DIUKUR DALAM SATUAN MATA UANG (Rupiah/Dolar). Parameter evaluasi: Net Present Value (NPV) atau Rasio Benefit-to-Cost (BCR > 1).'
    ],
    frequentExamPitfalls: [
      'Rumus ICER: (Biaya Obat B - Biaya Obat A) / (Outcome Efektivitas B - Outcome Efektivitas A). Memilih obat baru bernilai cost-effective jika nilai ICER berada di bawah ambang batas (Willingness to Pay / WTP Threshold Kemenkes = 1-3x PDB per kapita).'
    ],
    referenceStandard: 'Pedoman Penerapan Farmakoekonomi Kemenkes RI'
  },
  {
    id: 'top-hja-margin',
    domainId: 'manajemen',
    title: 'Perhitungan Bisnis Apotek: HPP, HJA, Margin, Mark-Up, dan PPN 11%/12%',
    category: 'Farmakoekonomi & Bisnis',
    tags: ['HJA', 'HPP', 'Margin', 'Mark-Up', 'PPN', 'Laba Bersih'],
    summary: 'Kalkulasi penentuan harga jual apotek, konversi antara margin laba terhadap harga jual vs mark-up terhadap harga beli, dan perlakuan pajak PPN.',
    keyPearls: [
      'Harga Pokok Pembelian (HPP) = Harga Beli Bersih dari PBF + PPN (jika belum termasuk PPN).',
      'Rumus HJA = HPP x (1 + Mark Up %)',
      'Hubungan Margin dan Mark-up: Margin (%) = (Laba / HJA) x 100%; Mark-up (%) = (Laba / HPP) x 100%.',
      'Contoh: Jika Mark-up 25% pada HPP Rp 100.000 -> HJA = Rp 125.000. Maka Margin = 25.000 / 125.000 = 20%.',
      'Break Even Point (BEP) Rupiah = Biaya Tetap / (1 - (Biaya Variabel / Pendapatan)).',
      'Turnover Ratio (TOR) = HPP Tahunan / Rata-rata Nilai Persediaan. Semakin tinggi nilai TOR, semakin cepat perputaran modal barang.'
    ],
    frequentExamPitfalls: [
      'Perhatikan dengan teliti apakah harga dari distributor (PBF) di soal sudah termasuk PPN atau belum termasuk PPN. Jika belum, kalikan 1,11 (atau 1,12) terlebih dahulu sebelum dikalikan margin.'
    ],
    referenceStandard: 'Manajemen Keuangan Apotek & Ketentuan Perpajakan RI'
  },
  {
    id: 'top-special-storage-lasa',
    domainId: 'manajemen',
    title: 'Penyimpanan Obat Khusus: High Alert, LASA/NORUM & Cold Chain (CDOB)',
    category: 'Standar Mutu & Penyimpanan',
    tags: ['High Alert', 'LASA', 'NORUM', 'Cold Chain', 'Vaksin', 'VVM', 'Narkotika'],
    summary: 'Standar penyimpanan obat berisiko tinggi (High Alert), obat nama/rupa mirip (LASA/NORUM), vaksin rantai dingin, dan sediaan narkotika/psikotropika.',
    keyPearls: [
      'Obat High Alert (Elektrolit Konsentrat: KCl 7,46%, NaCl 3%, Dextrose 40%, Injeksi Insulin, Heparin, Sitostatika): Wajib diberi stiker merah "HIGH ALERT", disimpan di area terbatas dengan akses terkontrol, dan TIDAK BOLEH disimpan di ruang rawat inap biasa (hanya di ICU/Farmasi).',
      'Obat LASA / NORUM (Look Alike Sound Alike): Wajib diberi stiker "LASA", penataan diselingi minimal 2 obat lain (tidak boleh berdampingan), dan penulisan label menggunakan huruf TALL MAN LETTERING (misal: hidrOALAzina vs hidrOKSIzina, vinKRISin vs vinBLAStin).',
      'Penyimpanan Vaksin (Cold Chain): Suhu 2°C - 8°C (Vaksin BCG, DPT, Hepatitis B, TT, IPV, Campak). Suhu beku -15°C s.d. -25°C (Vaksin OPV / Polio Tetes).',
      'Indikator VVM (Vaccine Vial Monitor): Kondisi A (Segiempat putih, lingkaran biru -> Boleh pakai); Kondisi B (Segiempat agak gelap tapi lebih terang dari lingkaran -> Segera pakai); Kondisi C & D (Segiempat sama gelap atau lebih gelap dari lingkaran -> JANGAN DIPAKAI / RUSAK).',
      'Lemari Narkotika: Terbuat dari kayu kuat/besi, memiliki 2 pintu dengan DUA KUNCI BERBEDA (kunci dipegang oleh Apoteker Penanggung Jawab dan staf yang didelegasikan).'
    ],
    frequentExamPitfalls: [
      'Vaksin yang sensitif beku (Freeze-sensitive: Hepatitis B, TT, DPT, DT) TIDAK BOLEH diletakkan menempel pada dinding freezer kulkas (lakukan Shake Test jika dicurigai beku).'
    ],
    referenceStandard: 'Permenkes No. 72 & 73 Tahun 2016 serta Pedoman CDOB BPOM'
  },
  {
    id: 'top-dowa-regulations',
    domainId: 'manajemen',
    title: 'Daftar Obat Wajib Apotek (DOWA 1, 2, 3) & Batas Penyerahan Resmi',
    category: 'Regulasi Pelayanan Apotek',
    tags: ['DOWA 1', 'DOWA 2', 'DOWA 3', 'Swamedikasi', 'Obat Keras Tanpa Resep'],
    summary: 'Daftar obat keras yang dapat diserahkan oleh apoteker kepada pasien di apotek tanpa resep dokter beserta batas jumlah maksimalnya.',
    keyPearls: [
      'DOWA 1 (Kepmenkes No. 347/1990): Kontrasepsi Oral (1 siklus, untuk pasien akseptor lama), Asam Mefenamat (maksimal 20 tablet), Aminofilin Suppo (maksimal 3 suppo), Antasida kombinasi antispasmodik (maksimal 20 tablet).',
      'DOWA 2 (Kepmenkes No. 924/1993): Bacitracin Salep (1 tube), Clindamycin Gel (1 tube), Ibuprofen 400 mg (maksimal 10 tablet), Omeprazole (maksimal 7 tablet), Sukralfat (maksimal 20 tablet).',
      'DOWA 3 (Kepmenkes No. 1176/1999): Ranitidin 150 mg (maksimal 10 tablet), Asam Asetilsalisilat / Asetosal 500 mg (maksimal 20 tablet), Cetirizine (maksimal 10 tablet), Alopurinol 100 mg (maksimal 10 tablet).'
    ],
    frequentExamPitfalls: [
      'Apoteker WAJIB mencatat identitas pasien dan memberikan edukasi (PIO) saat penyerahan obat DOWA, serta memastikan pasien tidak memiliki riwayat kontraindikasi.'
    ],
    referenceStandard: 'Kepmenkes No. 347/1990, No. 924/1993, dan No. 1176/1999 tentang DOWA'
  },
  {
    id: 'top-surat-pesanan-reg',
    domainId: 'manajemen',
    title: 'Regulasi Surat Pesanan (SP): Narkotika, Psikotropika, Prekursor & OOT',
    category: 'Regulasi & Hukum Farmasi',
    tags: ['Surat Pesanan', 'SP Narkotika', 'SP Psikotropika', 'Prekursor', 'OOT', 'Permenkes'],
    summary: 'Aturan hukum pembuatan surat pesanan resmi apotek ke PBF berdasarkan Permenkes No. 3 Tahun 2015 dan PerBPOM terkait Narkotika, Psikotropika, Prekursor, dan Obat-Obat Tertentu (OOT).',
    keyPearls: [
      'SP Narkotika (Formulir N-9): Dibuat khusus 3-5 rangkap, 1 SP HANYA BOLEH berisi 1 JENIS ITEM ZAT NARKOTIKA (misal: Codein 10 mg saja). Wajib ditandatangani Apoteker Penanggung Jawab (APJ) dengan mencantumkan nomor SIPA & stempel apotek.',
      'SP Psikotropika: Boleh memesan LEBIH DARI 1 jenis sediaan psikotropika dalam 1 surat pesanan asalkan berada dalam kelompok psikotropika yang sama.',
      'SP Prekursor Farmasi (Pseudoefedrin, Efedrin, Ergometrin): Dibuat terpisah dari obat non-prekursor minimal 2 rangkap.',
      'SP Obat-Obat Tertentu (OOT - Tramadol, Triheksifenidil, Klorpromazin, Amitriptilin, Haloperidol, Dekstrometorfan): Dibuat khusus terpisah dari SP reguler.',
      'Penyimpanan Resep: Resep disimpan urut tanggal dan nomor urut minimal 5 TAHUN sebelum dimusnahkan dengan Berita Acara Pemusnahan.'
    ],
    frequentExamPitfalls: [
      'SP Narkotika HANYA boleh ditandatangani oleh APOTEKER PENANGGUNG JAWAB (APJ) atau Apoteker Pendamping yang didelegasikan secara sah, TIDAK BOLEH ditandatangani oleh Tenaga Teknis Kefarmasian (TTK).'
    ],
    referenceStandard: 'Permenkes No. 3 Tahun 2015 & PerBPOM Pengelolaan Narkotika/Psikotropika'
  },

  // ==========================================
  // DOMAIN 3: TEKNOLOGI FARMASI & CPOB
  // ==========================================
  {
    id: 'top-cpob-cleanroom',
    domainId: 'teknologi',
    title: 'CPOB 2018: Klasifikasi Ruang Bersih (Kelas A, B, C, D, E) & HVAC',
    category: 'CPOB & Sediaan Steril',
    tags: ['CPOB', 'Kelas A', 'Kelas B', 'Ruang Bersih', 'HVAC', 'Sediaan Steril'],
    summary: 'Standar ruang pembuatan sediaan farmasi steril dan non-steril menurut Pedoman CPOB BPOM terkini.',
    keyPearls: [
      'Kelas A (Zona Kritis ISO 4.8): Untuk kegiatan berisiko tinggi (pengisian aseptis, wadah terbuka, LAF/BSC dengan kecepatan aliran udara laminar 0,36 - 0,54 m/s). Jumlah partikel non-operasional 0,5 um <= 3.520 per m3.',
      'Kelas B (Latar Belakang Kelas A): Ruang penyangga latar belakang pembuatan aseptis Kelas A.',
      'Kelas C (ISO 7): Pembuatan larutan yang akan disterilisasi akhir (Terminal Sterilization).',
      'Kelas D (ISO 8): Penanganan bahan awal sediaan steril dan pencucian wadah sebelum sterilisasi.',
      'Kelas E (Non-Steril): Ruangan produksi sediaan padat (tablet/kapsul/sirup) dengan pengendalian partikel debu dan kelembaban udara (RH).',
      'Tekanan Udara: Ruang Pengolahan Steril Aseptis memiliki tekanan POSITIF terhadap ruang sekitar. Ruang Produksi Bahan Berbahaya/Antibiotik Betalaktam/Sitostatika memiliki tekanan NEGATIF (mencegah kontaminasi keluar).'
    ],
    frequentExamPitfalls: [
      'Produk Penisilin / Betalaktam / Sefalosporin WAJIB diproduksi di BANGUNAN & FASILITAS TERPISAH (Dedicated Facility) dengan sistem tata udara mandiri untuk mencegah syok anafilaksis akibat kontaminasi silang.'
    ],
    referenceStandard: 'Pedoman CPOB 2018 / 2024 BPOM RI'
  },
  {
    id: 'top-sterilization-methods',
    domainId: 'teknologi',
    title: 'Metode Sterilisasi Sediaan Farmasi (Farmakope Indonesia VI)',
    category: 'Teknologi Sediaan Steril',
    tags: ['Sterilisasi', 'Autoklaf', 'Panas Kering', 'Filtrasi Membran', 'Radiasi Gamma'],
    summary: 'Pemilihan metode sterilisasi sediaan farmasi berdasarkan ketahanan panas zat aktif dan pelarut.',
    keyPearls: [
      '1. Panas Basah (Autoklaf): Suhu 121°C selama 15 menit (atau 134°C selama 3 menit). Mekanisme: Denaturasi dan koagulasi protein mikroba secara ireversibel. Digunakan untuk larutan berair yang tahan panas.',
      '2. Panas Kering (Oven): Suhu 160°C - 170°C selama 1 - 2 jam. Mekanisme: Oksidasi komponen sel mikroba. Digunakan untuk alat gelas laboratorium, serbuk tahan panas (Talk, ZnO), dan zat berlemak/minyak (Oleum Sesami, Vaselin) yang tidak dapat ditembus uap air.',
      '3. Filtrasi Membran Aseptis (Bakteri Filter): Menggunakan membran pori 0,20 - 0,22 μm. Mekanisme: Penyaringan fisik mikroba. Digunakan KHUSUS UNTUK ZAT AKTIF TERMOLABIL / TIDAK TAHAN PANAS (misal: Vaksin, Protein, Insulin, Antibiotik injeksi tertentu).',
      '4. Radiasi Ionisasi (Sinar Gamma Co-60 / Elektron Berkas): Digunakan untuk bahan plastik sekali pakai (Syringe, IV catheter, Kassa bedah).',
      '5. Gas Etilen Oksida: Untuk sterilisasi alat medis yang sensitif panas dan kelembaban.'
    ],
    frequentExamPitfalls: [
      'Sediaan salep mata berbasis minyak/vaselin disterilkan dengan PANAS KERING (Oven 160°C), BUKAN autoklaf karena minyak tidak tembus uap air panas bertekanan.'
    ],
    referenceStandard: 'Farmakope Indonesia Edisi VI (FI VI) Lampiran Sterilisasi'
  },
  {
    id: 'top-dissolution-s1-s3',
    domainId: 'teknologi',
    title: 'Kriteria Penerimaan Uji Disolusi Tablet (Tahap S1, S2, S3 Farmakope)',
    category: 'Kendali Mutu (QC)',
    tags: ['Uji Disolusi', 'Farmakope', 'Tahap S1', 'Tahap S2', 'Tahap S3', 'Kriteria Q'],
    summary: 'Kriteria kelulusan uji disolusi sediaan padat konvensional pelepasan segera sesuai standar Farmakope Indonesia Edisi VI.',
    keyPearls: [
      'Tahap S1 (Jumlah Sampel: 6 tablet): Tiap unit tidak kurang dari Q + 5%. (LULUS jika SEMUA 6 tablet >= Q + 5%).',
      'Tahap S2 (Tambahan 6 tablet, Total: 12 tablet): Rata-rata dari 12 unit (S1 + S2) >= Q, DAN tidak boleh ada SATU PUN unit yang < Q - 15%.',
      'Tahap S3 (Tambahan 12 tablet, Total: 24 tablet): Rata-rata dari 24 unit (S1 + S2 + S3) >= Q, TIDAK LEBIH dari 2 unit yang < Q - 15%, dan TIDAK BOLEH ada satu pun unit yang < Q - 25%.'
    ],
    frequentExamPitfalls: [
      'Contoh soal: Jika nilai Q = 80%, pada tahap S1 maka keenam tablet harus berdisolusi minimal 85% (80% + 5%). Jika ada 1 tablet yang hanya 82%, uji HARUS dilanjutkan ke tahap S2.'
    ],
    referenceStandard: 'Farmakope Indonesia Edisi VI (FI VI) Lampiran Uji Disolusi'
  },
  {
    id: 'top-tablet-physical-testing',
    domainId: 'teknologi',
    title: 'Pengujian Mutu Fisik Tablet: Kerapuhan, Kekerasan, & Waktu Hancur',
    category: 'Kendali Mutu Fisik Tablet',
    tags: ['Kerapuhan', 'Friability', 'Waktu Hancur', 'Disintegration', 'Kekerasan', 'Hardness'],
    summary: 'Parameter evaluasi in-process control (IPC) dan finished goods tablet berdasarkan Farmakope Indonesia VI.',
    keyPearls: [
      '1. Uji Kerapuhan (Friability Test): Menggunakan alat Friabilator dengan kecepatan 25 rpm selama 4 menit (total 100 putaran). Syarat: Bobot yang hilang (kerapuhan) HARUS < 1,0%. Jika ada tablet yang pecah/retak -> otomatis GAGAL.',
      '2. Uji Waktu Hancur (Disintegration Test): Tablet tidak bersalut harus hancur SEMPURNA dalam waktu < 15 MENIT (medium air 37°C). Tablet bersalut gula/film: < 30 menit. Tablet salut enterik: Tahan dalam medium HCl 0,1 N selama 60 menit dan hancur dalam dapar fosfat pH 6,8 < 60 menit.',
      '3. Uji Keseragaman Bobot: Dievaluasi pada 20 tablet dengan menghitung penyimpangan bobot kolom A dan kolom B Farmakope.',
      '4. Uji Kekerasan (Hardness): Umumnya berkisar 4 - 8 kg/cm2 untuk tablet oral konvensional.'
    ],
    frequentExamPitfalls: [
      'Uji waktu hancur menyatakan tablet hancur menjadi partikel serbuk halus, BUKAN larut sempurna (uji kelarutan dievaluasi pada uji disolusi).'
    ],
    referenceStandard: 'Farmakope Indonesia Edisi VI (FI VI)'
  },
  {
    id: 'top-stability-zone4b',
    domainId: 'teknologi',
    title: 'Uji Stabilitas Sediaan Obat: Zona Iklim IVB & Real Time vs Accelerated',
    category: 'Stabilitas & Uji Mutu',
    tags: ['Stabilitas', 'Zona IVB', 'Accelerated Testing', 'Real Time', 'Climatic Zone'],
    summary: 'Regulasi pengujian stabilitas obat di Indonesia sebagai negara dengan iklim tropis panas-lembab (Zona Iklim IVB).',
    keyPearls: [
      'Zona Iklim IVB (Hot & Very Humid - Indonesia / ASEAN): Kondisi Uji Jangka Panjang (Real-Time Long Term): Suhu 30°C ± 2°C dengan Kelembaban Relatif (RH) 75% ± 5%.',
      'Uji Stabilitas Dipercepat (Accelerated Testing): Suhu 40°C ± 2°C dengan RH 75% ± 5% selama minimal 6 bulan (titik uji pada bulan ke-0, 3, 6).',
      'Uji Stabilitas Sediaan Semisolida/Larutan dalam Kulkas: Suhu 5°C ± 3°C.',
      'Perubahan Bermakna (Significant Change): Kehilangan kadar zat aktif >= 5% dari kadar awal, hasil degradasi melebihi batas spesifikasi, atau kegagalan uji disolusi.'
    ],
    frequentExamPitfalls: [
      'Jangan gunakan parameter zona iklim II Eropa (25°C/60% RH) pada soal registrasi obat BPOM RI, karena Indonesia WAJIB menggunakan standar Zona IVB (30°C/75% RH).'
    ],
    referenceStandard: 'Pedoman Uji Stabilitas Produk Farmasi BPOM RI & ASEAN Guidelines'
  },
  {
    id: 'top-bcs-classification',
    domainId: 'teknologi',
    title: 'Biopharmaceutics Classification System (BCS Class I - IV) & Peningkatan Disolusi',
    category: 'Biofarmasetika',
    tags: ['BCS Class I', 'BCS Class II', 'BCS Class III', 'BCS Class IV', 'Kelarutan', 'Permeabilitas'],
    summary: 'Klasifikasi obat berdasarkan kelarutan dalam air dan permeabilitas membran intestinal, serta strategi modifikasi formulasi.',
    keyPearls: [
      'BCS Kelas I: Kelarutan Tinggi, Permeabilitas Tinggi (Contoh: Paracetamol, Metoprolol). Bioavailabilitas sangat baik, laju disolusi bukan penentu laju absorbsi.',
      'BCS Kelas II: KELARUTAN RENDAH, Permeabilitas Tinggi (Contoh: Ketokonazol, Ibuprofen, Glibenklamid, Asam Mefenamat). Laju disolusi adalah rate-limiting step -> Strategi: Mikronisasi ukuran partikel, pembentukan Dispersi Padat (Solid Dispersion), penambahan Surfaktan/Kosolven, atau pembentukan garam.',
      'BCS Kelas III: Kelarutan Tinggi, PERMEABILITAS RENDAH (Contoh: Kaptopril, Metformin, Atenolol). Permeabilitas membran adalah rate-limiting step -> Strategi: Penambahan Absorption Enhancer.',
      'BCS Kelas IV: KELARUTAN RENDAH, PERMEABILITAS RENDAH (Contoh: Furosemid, Klorotiazid). Bioavailabilitas oral sangat buruk.'
    ],
    frequentExamPitfalls: [
      'Obat BCS Kelas II yang paling sering keluar di soal UKMPPAI adalah KETOKONAZOL, ASAM MEFENAMAT, dan GLIBENKLAMID (kelarutan rendah tapi mudah menembus membran usus).'
    ],
    referenceStandard: 'WHO & FDA Biopharmaceutics Classification System Guidance'
  },
  {
    id: 'top-excipient-tablet',
    domainId: 'teknologi',
    title: 'Eksipien Formulasi Tablet & Masalah Pencetakan Tablet',
    category: 'Formulasi Padat',
    tags: ['Eksipien', 'Binder', 'Disintegran', 'Glidan', 'Lubrikan', 'Capping', 'Mottling'],
    summary: 'Peran bahan pembantu formulasi tablet dan penelusuran akar masalah cacat fisik tablet saat kompresi mesin.',
    keyPearls: [
      'Pengisi (Diluent): Laktosa, Manitol (tablet hisap/kunyah rasa dingin), Avicel (MCC PH 101/102 - kompresi langsung).',
      'Pengikat (Binder): PVP (Polivinilpirolidon), Amilum pasta, Gelatin, HPMC.',
      'Penghancur (Disintegrant): Sodium Starch Glycolate (Primojel), Crospovidone, Croscarmellose Sodium.',
      'Pelincir (Lubricant): Magnesium Stearat (0,5-1%), Asam Stearat. (Jika berlebih -> hidrofobik -> disolusi turun).',
      'Pelincir Alir (Glidant): Talk, Aerosil (Silika Koloidal).',
      'Cacat Capping / Lamination (Kepala tablet terbelah/terkelupas): Akibat udara terjebak (air entrapment), fines berlebih, atau kadar air granul terlalu kering -> Solusi: Tambah pengikat / atur tekanan punch.',
      'Cacat Mottling (Warna tablet belang/tidak merata): Akibat migrasi zat warna saat pengeringan granul -> Solusi: Aduk rata zat warna / ubah suhu pengeringan.',
      'Cacat Sticking / Picking (Massa lengket di punch): Akibat granul terlalu basah atau kurang lubrikan -> Solusi: Tambah Mg Stearat atau keringkan granul hingga MC 1-3%.'
    ],
    frequentExamPitfalls: [
      'Perbedaan glidan vs lubrikan: Glidan meningkatkan daya alir serbuk/granul di hopper, sedangkan lubrikan mengurangi gesekan antara tablet dengan dinding die.'
    ],
    referenceStandard: 'Handbook of Pharmaceutical Excipients & Farmakope Indonesia'
  },

  // ==========================================
  // DOMAIN 4: BAHAN ALAM & FITOFARMAKA
  // ==========================================
  {
    id: 'top-herbal-classification',
    domainId: 'bahan_alam',
    title: 'Penggolongan Obat Bahan Alam: Jamu, OHT, dan Fitofarmaka',
    category: 'Regulasi Obat Tradisional',
    tags: ['Jamu', 'OHT', 'Fitofarmaka', 'Logo Herbal', 'Uji Praklinis', 'Uji Klinis'],
    summary: 'Kriteria pembuktian ilmiah, logo resmi, dan syarat registrasi obat bahan alam di Badan Pengawas Obat dan Makanan (BPOM).',
    keyPearls: [
      '1. Jamu (Logo: Pohon Ranting Hijau berlatar kuning lingkaran hijau): Pembuktian khasiat berdasarkan data empiris turun-temurun (minimal 3 generasi). Standar mutu sederhana.',
      '2. Obat Herbal Terstandar / OHT (Logo: Tiga Bintang Hijau lingkaran hijau): Telah dibuktikan khasiat dan keamanannya secara ilmiah melalui UJI PRAKLINIS (uji pada hewan coba) dan bahan baku telah terstandarisasi.',
      '3. Fitofarmaka (Logo: Kristal Salju/Jari-jari Hijau lingkaran hijau): Kasta tertinggi obat bahan alam. Telah dibuktikan khasiat dan keamanannya melalui UJI KLINIS pada manusia, bahan baku terstandar, dan diproduksi sesuai standar CPOTB.',
      'Metode Ekstraksi: Maserasi (perendaman dingin untuk senyawa termolabil), Perkolasi (aliran pelarut kontinu), Sokletasi (ekstraksi berulang dengan pelarut panas menguap), Refluks (ekstraksi panas dengan kondensor pendingin balik).'
    ],
    frequentExamPitfalls: [
      'Contoh produk OHT populer: Diapet, Mastin, Kiranti, Fitolac.',
      'Contoh produk Fitofarmaka resmi: Stimuno (Phyllanthus niruri), Tensigard (Apium graveolens + Orthosiphon stamineus), Nodiar, Rheumaneer, Inbumin.'
    ],
    referenceStandard: 'Peraturan BPOM RI tentang Standar Pelayanan Obat Tradisional & Herbal'
  },
  {
    id: 'top-herbal-standardization',
    domainId: 'bahan_alam',
    title: 'Standardisasi Parameter Spesifik & Non-Spesifik Simplisia dan Ekstrak',
    category: 'Kendali Mutu Herbal',
    tags: ['Standardisasi', 'Parameter Spesifik', 'Parameter Non-Spesifik', 'Kadar Air', 'Kadar Abu'],
    summary: 'Kriteria parameter mutu fisik, kimiawi, dan mikrobiologis bahan baku obat bahan alam sesuai Farmakope Herbal Indonesia.',
    keyPearls: [
      '1. Parameter Non-Spesifik (Fokus pada aspek keamanan & stabilitas lingkungan):',
      '• Kadar Air: Standar umumnya < 10% (diukur dengan metode Destilasi Toluen atau Titrasi Karl Fischer) untuk mencegah pertumbuhan jamur.',
      '• Kadar Abu Total: Mengukur sisa mineral anorganik internal dan eksternal.',
      '• Kadar Abu Tidak Larut Asam: Mengukur tingkat pencemaran mineral eksternal (PASIR, TANAH, SILIKAT).',
      '• Cemaran Logam Berat: Pb (Timbal) <= 10 ppm, Cd (Kadmium) <= 0,3 ppm, As (Arsen) <= 5 ppm, Hg (Merkuri) <= 0,5 ppm.',
      '• Cemaran Mikroba: Angka Lempeng Total (ALT), Angka Kapang Khamir (AKK), dan Bebas Patogen (E. coli, Salmonella, Pseudomonas, S. aureus).',
      '2. Parameter Spesifik (Fokus pada aspek identitas & zat aktif):',
      '• Identitas (Nama latin simplisia, bagian tanaman/tata nama botani).',
      '• Organoleptik (Bentuk, bau, rasa, warna khas).',
      '• Kadar Senyawa Marker Terlarut: Kadar sari larut air dan kadar sari larut etanol.',
      '• Kadar Senyawa Bioaktif Tertentu (misal: Kadar Kurkuminoid pada Curcuma).'
    ],
    frequentExamPitfalls: [
      'Kadar abu tidak larut asam mengindikasikan tingkat KEBERSIHAN PENCUCIAN simplisia dari kontaminasi tanah/pasir silikat.'
    ],
    referenceStandard: 'Farmakope Herbal Indonesia Edisi II & Monografi Ekstrak Tumbuhan Obat BPOM'
  },
  {
    id: 'top-marker-compounds',
    domainId: 'bahan_alam',
    title: 'Senyawa Marker Aktif Tanaman Obat Indonesia Populer',
    category: 'Fitokimia & Marker',
    tags: ['Kurkumin', 'Andrografolid', 'Sinensetin', 'Piperin', 'Kuersetin'],
    summary: 'Daftar senyawa penanda (marker compound) yang digunakan untuk standardisasi mutu ekstrak simplisia tanaman obat.',
    keyPearls: [
      'Temulawak (Curcuma xanthorrhiza) -> Xanthorrhizol & Kurkumin.',
      'Kunyit (Curcuma longa / domestica) -> Kurkuminoid (Kurkumin, Desmetoksikurkumin).',
      'Sambiloto (Andrographis paniculata) -> Andrografolid (imunomodulator, antidiabetes, pahit).',
      'Kumis Kucing (Orthosiphon stamineus) -> Sinensetin (diuretik, peluruh batu ginjal).',
      'Cabe Jawa / Lada Hitam (Piper retrofractum / Piper nigrum) -> Piperin (antiinflamasi, bioavailabilitas enhancer).',
      'Meniran (Phyllanthus niruri) -> Filantin & Hipofilantin (imunomodulator).',
      'Daun Jati Belanda (Guazuma ulmifolia) -> Tanin & Lendir (penurun lipid / antiobesitas).',
      'Daun Guava / Jambu Biji (Psidium guajava) -> Kuersetin & Tanin (antidiare, peningkat trombosit).'
    ],
    frequentExamPitfalls: [
      'Senyawa marker Temulawak yang KHAS dan TIDAK ADA pada kunyit adalah XANTHORRHIZOL.'
    ],
    referenceStandard: 'Materia Medika Indonesia & Farmakope Herbal Indonesia Edisi II'
  }
];

export interface ExamQuestion {
  id: string;
  domainId: 'klinis' | 'manajemen' | 'teknologi' | 'bahan_alam';
  vignette: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  clinicalReference: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tinggi';
}

export const EXAM_QUESTION_BANK: ExamQuestion[] = [
  {
    id: 'q-001',
    domainId: 'klinis',
    vignette: 'Seorang pasien laki-laki berusia 56 tahun penderita hipertensi dan diabetes mellitus tipe 2 datang ke poli penyakit dalam dengan hasil laboratorium: TD 155/95 mmHg, HbA1c 7,8%, Serum Kreatinin 1,8 mg/dL (eGFR 42 mL/min), dan rasio albumin-kreatinin urin (UACR) 320 mg/g (makroalbuminuria). Selama ini pasien hanya mengonsumsi Metformin 500 mg bid.',
    question: 'Obat antihipertensi lini pertama manakah yang paling tepat direkomendasikan apoteker untuk memberikan efek nefroprotektor pada pasien tersebut?',
    options: [
      { key: 'A', text: 'Amlodipin 10 mg 1x sehari' },
      { key: 'B', text: 'Kandesartan 8 mg 1x sehari' },
      { key: 'C', text: 'Hidroklorotiazid 25 mg 1x sehari' },
      { key: 'D', text: 'Bisoprolol 5 mg 1x sehari' },
      { key: 'E', text: 'Furosemid 40 mg 1x sehari' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada pasien hipertensi dengan komorbiditas Diabetes Mellitus dan Penyakit Ginjal Kronis (CKD) yang disertai albuminuria (UACR > 30 mg/g), obat antihipertensi lini pertama pilihan utama adalah golongan ARB (Kandesartan, Valsartan) atau ACEI (Kaptopril, Ramipril). Golongan ini merelaksasi arteriol eferen ginjal, menurunkan tekanan intraglomerular, dan memperlambat perburukan kerusakan nefron (efek nefroprotektor).',
    clinicalReference: 'JNC 8 Guidelines & KDIGO 2024 Clinical Practice Guideline for Diabetes Management in CKD',
    difficulty: 'Sedang'
  },
  {
    id: 'q-002',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita berusia 29 tahun hamil trimester pertama (usia gestasi 8 minggu) didiagnosis menderita tuberkulosis paru BTA positif kasus baru. Dokter berdiskusi dengan apoteker di ruang konseling mengenai keamanan pemilihan obat antituberkulosis (OAT).',
    question: 'Obat OAT manakah yang merupakan KONTRAINDIKASI MUTLAK pada pasien tersebut karena berisiko menyebabkan ototoksisitas dan ketulian permanen pada janin?',
    options: [
      { key: 'A', text: 'Rifampisin' },
      { key: 'B', text: 'Isoniazid' },
      { key: 'C', text: 'Pirazinamid' },
      { key: 'D', text: 'Etambutol' },
      { key: 'E', text: 'Streptomisin' }
    ],
    correctAnswer: 'E',
    explanation: 'Streptomisin (golongan aminoglikosida) adalah kontraindikasi mutlak pada ibu hamil (Kategori Kehamilan D) karena dapat menembus plasenta dan merusak saraf kranial VIII janin, menyebabkan ototoksisitas bawaan (tuli permanen) dan nefrotoksisitas. Regimen OAT standar (RHZE) aman diberikan pada ibu hamil dengan suplementasi Piridoksin (Vit B6).',
    clinicalReference: 'Pedoman Nasional Pelayanan Kedokteran Tata Laksana Tuberkulosis Kemenkes RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-003',
    domainId: 'klinis',
    vignette: 'Seorang pria 45 tahun dibawa ke IGD setelah mengonsumsi 30 tablet Paracetamol 500 mg (total 15 gram) sekaligus dalam upaya percobaan bunuh diri 4 jam yang lalu. Pasien mengeluh mual, muntah, dan nyeri perut kuadran kanan atas.',
    question: 'Antidotum spesifik manakah yang harus segera diberikan apoteker sebelum terjadi nekrosis hati masif?',
    options: [
      { key: 'A', text: 'Nalokson intravena' },
      { key: 'B', text: 'Flumazenil intravena' },
      { key: 'C', text: 'N-Asetilsistein (NAC)' },
      { key: 'D', text: 'Atropin Sulfat' },
      { key: 'E', text: 'Natrium Tiosulfat' }
    ],
    correctAnswer: 'C',
    explanation: 'Overdosis Paracetamol (> 10-12 gram) menyebabkan deplesi glutation hepar, sehingga metabolit toksik NAPQI menumpuk dan berikatan kovalen dengan hepatosit memicu nekrosis sentrilobular hati. N-Asetilsistein (NAC) bekerja sebagai prekursor sistein untuk meregenerasi simpanan glutation dan mengikat langsung NAPQI.',
    clinicalReference: 'AHFS Clinical Drug Information & Pedoman Penatalaksanaan Keracunan BPOM RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-004',
    domainId: 'manajemen',
    vignette: 'Apoteker penanggung jawab di Instalasi Farmasi Rumah Sakit sedang melakukan evaluasi anggaran belanja obat tahunan. Dari hasil analisis ABC didapatkan data bahwa obat kelompok A menyerap 72% dari total anggaran dengan jumlah item obat sebanyak 15% dari total seluruh formularium.',
    question: 'Langkah manakah yang paling tepat dilakukan apoteker untuk mengendalikan pengeluaran kelompok obat A tersebut?',
    options: [
      { key: 'A', text: 'Membeli obat dalam jumlah sangat besar sekaligus untuk mendapat diskon' },
      { key: 'B', text: 'Menerapkan sistem pengadaan berkala bertahap (Just in Time) dengan safety stock ketat' },
      { key: 'C', text: 'Menghapus seluruh obat kelompok A dari formularium rumah sakit' },
      { key: 'D', text: 'Menyerahkan pengadaan obat kelompok A kepada pasien secara mandiri' },
      { key: 'E', text: 'Mengalihkan pesanan ke PBF non-resmi yang menawarkan tempo panjang' }
    ],
    correctAnswer: 'B',
    explanation: 'Kelompok A dalam analisis Pareto adalah kelompok obat bernilai investasi sangat tinggi (70-80% biaya) dengan jumlah item sedikit (10-20%). Pengendaliannya harus sangat ketat melalui pengadaan bertahap dengan frekuensi lebih sering (Just In Time) dan safety stock minimal untuk menghindari pembengkakan modal mati (capital tie-up) serta risiko kerugian akibat obat rusak/kadaluarsa.',
    clinicalReference: 'Pedoman Pengelolaan Perbekalan Farmasi di Rumah Sakit Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-005',
    domainId: 'manajemen',
    vignette: 'Sebuah apotek membeli Injeksi Enoxaparin dari PBF dengan harga Rp 100.000 per vial (belum termasuk PPN 11%). Apotek menetapkan margin keuntungan yang diinginkan sebesar 20% dari harga jual apotek (HJA).',
    question: 'Berapakah Harga Jual Apotek (HJA) per vial obat tersebut kepada pasien?',
    options: [
      { key: 'A', text: 'Rp 120.000' },
      { key: 'B', text: 'Rp 133.200' },
      { key: 'C', text: 'Rp 138.750' },
      { key: 'D', text: 'Rp 142.500' },
      { key: 'E', text: 'Rp 150.000' }
    ],
    correctAnswer: 'C',
    explanation: '1. Harga Beli + PPN (HPP) = Rp 100.000 x 1,11 = Rp 111.000.\n2. Margin 20% terhadap HJA artinya: HJA = HPP / (1 - Margin) = Rp 111.000 / (1 - 0,20) = Rp 111.000 / 0,80 = Rp 138.750.',
    clinicalReference: 'Prinsip Akuntansi & Manajemen Keuangan Farmasi Komunitas',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-006',
    domainId: 'teknologi',
    vignette: 'Departemen Pengawasan Mutu (QC) industri farmasi sedang melakukan uji disolusi tahap pertama (S1) terhadap 6 tablet Paracetamol 500 mg. Nilai penerimaan Q yang dipersyaratkan oleh Farmakope Indonesia adalah 80% dalam waktu 30 menit. Hasil disolusi ke-6 tablet berturut-turut adalah: 86%, 88%, 91%, 85%, 87%, dan 82%.',
    question: 'Berdasarkan kriteria penerimaan Farmakope Indonesia Edisi VI, tindakan manakah yang harus diambil oleh analis QC?',
    options: [
      { key: 'A', text: 'Meluluskan bets karena nilai rata-rata lebih dari 80%' },
      { key: 'B', text: 'Menolak bets karena ada tablet yang berada di bawah 85%' },
      { key: 'C', text: 'Melanjutkan pengujian ke tahap S2 dengan menambah 6 tablet lagi' },
      { key: 'D', text: 'Melanjutkan pengujian langsung ke tahap S3 dengan menambah 18 tablet' },
      { key: 'E', text: 'Mengulang kembali pengujian tahap S1 dengan 6 tablet baru' }
    ],
    correctAnswer: 'C',
    explanation: 'Kriteria penerimaan Tahap S1 (6 tablet) adalah: Tiap unit TIDAK KURANG dari Q + 5%. Dengan Q = 80%, maka batas minimal tiap tablet adalah 85% (80% + 5%). Karena terdapat 1 tablet dengan hasil 82% (< 85%), maka tahap S1 tidak memenuhi syarat dan WAJIB dilanjutkan ke tahap S2 dengan menambah 6 tablet tambahan (total 12 tablet dievaluasi).',
    clinicalReference: 'Farmakope Indonesia Edisi VI (FI VI) Lampiran Uji Disolusi',
    difficulty: 'Sedang'
  },
  {
    id: 'q-007',
    domainId: 'teknologi',
    vignette: 'Dalam proses pencetakan tablet Asam Mefenamat 500 mg pada mesin cetak rotari berkecepatan tinggi, operator menemukan bagian atas permukaan tablet terbelah dan terlepas dari badan tablet (capping). Hasil pemeriksaan menunjukkan massa granul terlalu kering dengan kadar air (Moisture Content) hanya 0,4%.',
    question: 'Solusi formulasi dan proses manakah yang paling tepat untuk mengatasi masalah capping tersebut?',
    options: [
      { key: 'A', text: 'Meningkatkan konsentrasi Magnesium Stearat' },
      { key: 'B', text: 'Menyemprotkan air/pelarut pengikat untuk meningkatkan kelembaban granul hingga 1-3%' },
      { key: 'C', text: 'Meningkatkan kecepatan putaran mesin cetak' },
      { key: 'D', text: 'Mengganti bahan pengisi dengan kalsium fosfat dibasa' },
      { key: 'E', text: 'Menambah konsentrasi zat pelincir Aerosil' }
    ],
    correctAnswer: 'B',
    explanation: 'Capping adalah pemisahan bagian atas/bawah tablet dari badan utama. Salah satu penyebab utamanya adalah granul yang terlalu kering (kelembaban < 1%) sehingga daya kohesi antar partikel saat penekanan punch berkurang dan udara terjebak (air entrapment). Solusinya adalah menjaga kelembaban optimum granul pada rentang 1-3% atau meningkatkan bahan pengikat.',
    clinicalReference: 'Pharmaceutical Dosage Forms: Tablets (Lieberman & Lachman)',
    difficulty: 'Sedang'
  },
  {
    id: 'q-008',
    domainId: 'bahan_alam',
    vignette: 'Sebuah industri obat tradisional (IOT) ingin mengembangkan produk herbal terstandarisasi untuk membantu memelihara daya tahan tubuh (imunomodulator). Formula menggunakan ekstrak herba Meniran (Phyllanthus niruri).',
    question: 'Senyawa marker aktif manakah yang dipersyaratkan oleh Farmakope Herbal Indonesia sebagai penanda standardisasi ekstrak herba Meniran?',
    options: [
      { key: 'A', text: 'Filantin dan Hipofilantin' },
      { key: 'B', text: 'Andrografolid' },
      { key: 'C', text: 'Xanthorrhizol' },
      { key: 'D', text: 'Sinensetin' },
      { key: 'E', text: 'Asam Klorogenat' }
    ],
    correctAnswer: 'A',
    explanation: 'Berdasarkan Farmakope Herbal Indonesia (FHI), senyawa penanda (marker compound) untuk standardisasi mutu simplisia dan ekstrak herba Meniran (Phyllanthus niruri) adalah golongan lignan yaitu Filantin (Phyllanthin) dan Hipofilantin (Hypophyllanthin) yang berkhasiat sebagai imunomodulator.',
    clinicalReference: 'Farmakope Herbal Indonesia Edisi II Kemenkes RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-009',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria berusia 58 tahun dengan riwayat dislipidemia campuran (Kolesterol Total 260 mg/dL, LDL 170 mg/dL, Trigliserida 380 mg/dL) diresepkan Simvastatin 20 mg 1x sehari dan Gemfibrozil 600 mg 2x sehari. Apoteker melakukan penapisan resep sebelum dispensing.',
    question: 'Masalah terkait obat (DRP) kritis apakah yang diidentifikasi oleh apoteker terkait kombinasi tersebut?',
    options: [
      { key: 'A', text: 'Gemfibrozil menurunkan efektivitas penyerapan Simvastatin' },
      { key: 'B', text: 'Peningkatan risiko rhabdomyolysis dan gagal ginjal akut fatal akibat inhibisi glukuronidasi statin' },
      { key: 'C', text: 'Penurunan klirens ginjal Simvastatin yang memicu nefrolitiasis' },
      { key: 'D', text: 'Risiko hipoglikemia berat mendadak' },
      { key: 'E', text: 'Penurunan drastis kadar HDL plasma' }
    ],
    correctAnswer: 'B',
    explanation: 'Gemfibrozil menghambat konjugasi glukuronidasi Simvastatin acid melalui enzim UGT1A1/1A3 dan menghambat transporter OATP1B1, sehingga kadar Simvastatin plasma melonjak tajam memicu toksisitas otot berat (Myopathy & Rhabdomyolysis masif dengan lonjakan Creatine Kinase). Jika kombinasi statin + fibrat mutlak diperlukan, pilihan yang aman adalah FENOFIBRAT.',
    clinicalReference: 'Pedoman Tata Laksana Dislipidemia PERKI & FDA Drug Safety Communication',
    difficulty: 'Sedang'
  },
  {
    id: 'q-010',
    domainId: 'klinis',
    vignette: 'Seorang wanita 26 tahun datang ke IGD dengan serangan asma akut sedang. Pasien mengeluh sesak nafas berbunyi mengi (wheezing), frekuensi nafas 28 x/menit, SpO2 91% pada udara ruangan. Pasien dapat berbicara dalam kalimat terputus.',
    question: 'Kombinasi terapi inhalasi inisial manakah yang paling tepat diberikan segera di ruang gawat darurat?',
    options: [
      { key: 'A', text: 'Inhalasi Salmeterol + Deksametason oral' },
      { key: 'B', text: 'Inhalasi Salbutamol (SABA) + Ipratropium Bromida nebulisasi + Oksigenasi' },
      { key: 'C', text: 'Teofilin tablet lepas lambat oral' },
      { key: 'D', text: 'Injeksi Aminofilin bolus cepat tanpa oksigen' },
      { key: 'E', text: 'Inhalasi Tiotropium (LAMA) monoterapi' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada serangan asma akut eksaserbasi, tata laksana lini pertama adalah oksigenasi (target SpO2 93-95%) disertai nebulisasi bronkodilator kerja cepat yaitu SABA (Salbutamol 2,5-5 mg) yang dikombinasikan dengan antikolinergik kerja cepat (Ipratropium Bromida 0,5 mg) setiap 20 menit pada jam pertama, serta pemberian kortikosteroid sistemik.',
    clinicalReference: 'GINA 2024 Global Strategy for Asthma Management in Acute Exacerbation',
    difficulty: 'Mudah'
  },
  {
    id: 'q-011',
    domainId: 'klinis',
    vignette: 'Seorang pasien lansia wanita berusia 72 tahun dengan riwayat osteoartritis lutut kronis dan riwayat ulkus lambung berdarah 6 bulan lalu membutuhkan terapi analgesik antiinflamasi harian untuk mengatasi nyeri hebat.',
    question: 'Strategi farmakoterapi NSAID manakah yang paling aman untuk melindungi mukosa lambung pasien?',
    options: [
      { key: 'A', text: 'Natrium Diklofenak 50 mg + Antasida suspensi' },
      { key: 'B', text: 'Ketorolak 10 mg oral 3x sehari' },
      { key: 'C', text: 'Celecoxib 200 mg 1x sehari + Esomeprazole 20 mg 1x sehari' },
      { key: 'D', text: 'Asam Mefenamat 500 mg 3x sehari sesudah makan' },
      { key: 'E', text: 'Piroksikam 20 mg 1x sehari' }
    ],
    correctAnswer: 'C',
    explanation: 'Pada pasien dengan risiko gastrointestinal sangat tinggi (usia > 65 tahun + riwayat ulkus berdarah), pedoman merekomendasikan penggunaan NSAID selektif COX-2 (Celecoxib) yang DITAMBAH DENGAN PPI (Esomeprazole/Omeprazole) atau Misoprostol untuk memberikan proteksi mukosa lambung maksimal.',
    clinicalReference: 'American College of Gastroenterology (ACG) Guidelines on Prevention of NSAID-Related Ulcer',
    difficulty: 'Sedang'
  },
  {
    id: 'q-012',
    domainId: 'manajemen',
    vignette: 'Komite Farmasi dan Terapi (KFT) Rumah Sakit sedang membandingkan dua rejimen kemoterapi baru untuk kanker kolorektal. Rejimen A membutuhkan biaya Rp 50.000.000 dengan rerata angka harapan hidup (Life Years Gained / LYG) 2,0 tahun. Rejimen B membutuhkan biaya Rp 80.000.000 dengan rerata angka harapan hidup 3,5 tahun.',
    question: 'Berapakah nilai Incremental Cost-Effectiveness Ratio (ICER) Rejimen B dibandingkan Rejimen A?',
    options: [
      { key: 'A', text: 'Rp 15.000.000 per LYG' },
      { key: 'B', text: 'Rp 20.000.000 per LYG' },
      { key: 'C', text: 'Rp 25.000.000 per LYG' },
      { key: 'D', text: 'Rp 30.000.000 per LYG' },
      { key: 'E', text: 'Rp 40.000.000 per LYG' }
    ],
    correctAnswer: 'B',
    explanation: 'Rumus ICER = (Biaya B - Biaya A) / (Outcome B - Outcome A) = (Rp 80.000.000 - Rp 50.000.000) / (3,5 tahun - 2,0 tahun) = Rp 30.000.000 / 1,5 tahun = Rp 20.000.000 per tambahan tahun hidup (LYG).',
    clinicalReference: 'Pedoman Penerapan Kajian Farmakoekonomi Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-013',
    domainId: 'manajemen',
    vignette: 'Apoteker di Puskesmas melakukan pemeriksaan rutin terhadap kondisi vaksin polio di cold chain. Pada salah satu vial vaksin teramati indikator Vaccine Vial Monitor (VVM) menunjukkan bujur sangkar di bagian dalam sudah berubah warna menjadi sama gelap dengan lingkaran biru di luarnya (Kondisi C).',
    question: 'Tindakan manakah yang wajib diambil oleh apoteker sesuai standar CDOB?',
    options: [
      { key: 'A', text: 'Menggunakan vaksin tersebut paling pertama pada hari itu' },
      { key: 'B', text: 'Menyimpan kembali vaksin di freezer selama 24 jam sebelum digunakan' },
      { key: 'C', text: 'Menolak dan memisahkan vaksin untuk dimusnahkan karena potensi antigen sudah rusak' },
      { key: 'D', text: 'Menggandakan dosis vaksin saat disuntikkan ke pasien' },
      { key: 'E', text: 'Melakukan Shake Test (uji kocok) terlebih dahulu' }
    ],
    correctAnswer: 'C',
    explanation: 'Pada indikator VVM: Kondisi A (segiempat putih) dan Kondisi B (segiempat lebih terang dari lingkaran) masih boleh digunakan. Kondisi C (segiempat sama gelap dengan lingkaran) dan Kondisi D (segiempat lebih gelap dari lingkaran) MENUNJUKKAN VAKSIN TELAH TERPAPAR SUHU PANAS MELEBIHI BATAS AMAN DAN WAJIB DIBUANG / TIDAK BOLEH DIGUNAKAN.',
    clinicalReference: 'WHO Guidelines on Vaccine Vial Monitor & Petunjuk Teknis Imunisasi Kemenkes RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-014',
    domainId: 'manajemen',
    vignette: 'Seorang pasien datang ke apotek mengeluhkan nyeri gigi berdenyut dan meminta obat Asam Mefenamat 500 mg sebanyak 30 tablet tanpa membawa resep dokter.',
    question: 'Berapakah jumlah maksimal tablet Asam Mefenamat yang boleh diserahkan apoteker secara legal berdasarkan ketentuan Daftar Obat Wajib Apotek (DOWA 1)?',
    options: [
      { key: 'A', text: '5 tablet' },
      { key: 'B', text: '10 tablet' },
      { key: 'C', text: '20 tablet' },
      { key: 'D', text: '30 tablet' },
      { key: 'E', text: 'Tidak boleh diberikan sama sekali' }
    ],
    correctAnswer: 'C',
    explanation: 'Berdasarkan Kepmenkes No. 347/MenKes/SK/VII/1990 tentang Obat Wajib Apotek No. 1 (DOWA 1), obat keras Asam Mefenamat dapat diserahkan oleh Apoteker di apotek tanpa resep dokter dengan jumlah maksimal 20 TABLET per pasien disertai edukasi aturan pakai dan peringatan efek samping lambung.',
    clinicalReference: 'Keputusan Menteri Kesehatan RI No. 347/MenKes/SK/VII/1990 tentang DOWA 1',
    difficulty: 'Mudah'
  },
  {
    id: 'q-015',
    domainId: 'teknologi',
    vignette: 'Bagian RnD industri farmasi sedang merancang proses produksi larutan injeksi antibiotik sefalosporin generasi ketiga yang bersifat sangat termolabil (terurai pada suhu di atas 50°C). Sediaan ditujukan untuk pemberian intravena.',
    question: 'Metode sterilisasi manakah yang wajib diterapkan untuk sediaan tersebut?',
    options: [
      { key: 'A', text: 'Autoklaf 121°C selama 15 menit' },
      { key: 'B', text: 'Oven panas kering 170°C selama 1 jam' },
      { key: 'C', text: 'Filtrasi membran steril ukuran pori 0,22 μm secara aseptis' },
      { key: 'D', text: 'Penyinaran radiasi gelombang mikro' },
      { key: 'E', text: 'Gas etilen oksida langsung ke dalam larutan' }
    ],
    correctAnswer: 'C',
    explanation: 'Untuk zat aktif yang termolabil (tidak tahan panas seperti protein, vaksin, antibiotik betalaktam/sefalosporin), metode sterilisasi akhir dengan panas tidak dapat digunakan. Metode yang dipersyaratkan adalah FILTRASI MEMBRAN STERIL ukuran pori 0,20 - 0,22 μm yang dikerjakan secara aseptis di Ruang Bersih Kelas A latar belakang Kelas B.',
    clinicalReference: 'Pedoman CPOB BPOM RI & Farmakope Indonesia Edisi VI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-016',
    domainId: 'teknologi',
    vignette: 'Seorang formulator sedang mengembangkan tablet generik Ketokonazol 200 mg. Senyawa aktif diketahui memiliki permeabilitas usus yang sangat tinggi namun kelarutannya dalam air sangat buruk (BCS Kelas II). Hasil uji disolusi awal menunjukkan laju pelepasan obat sangat lambat.',
    question: 'Pendekatan formulasi manakah yang paling tepat untuk meningkatkan laju disolusi tablet Ketokonazol tersebut?',
    options: [
      { key: 'A', text: 'Menambah bahan pelincir Magnesium Stearat hingga 5%' },
      { key: 'B', text: 'Membuat sistem Dispersi Padat (Solid Dispersion) dengan polimer hidrofilik PVP' },
      { key: 'C', text: 'Meningkatkan ukuran partikel bahan baku menjadi lebih kasar' },
      { key: 'D', text: 'Mengganti bahan pengisi dengan kalsium fosfat dibasa anhidrat' },
      { key: 'E', text: 'Meningkatkan tekanan kompresi cetak punch mesin' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada obat BCS Kelas II, laju disolusi adalah langkah penentu absorpsi (rate-limiting step). Pembentukan Dispersi Padat (Solid Dispersion) menggunakan polimer hidrofilik pembawa seperti PVP (Povidone) atau PEG menurunkan energi kisi kristal dan meningkatkan luas permukaan kontak zat aktif dengan medium air sehingga kelarutan dan disolusi meningkat drastis.',
    clinicalReference: 'Modern Pharmaceutics: Solid Dispersion Technology & Biopharmaceutics',
    difficulty: 'Sedang'
  },
  {
    id: 'q-017',
    domainId: 'teknologi',
    vignette: 'Analis QC melakukan uji kerapuhan terhadap 20 tablet Ibuprofen 400 mg menggunakan alat friabilator dengan kecepatan 25 rpm selama 4 menit. Bobot awal 20 tablet sebelum pengujian adalah 10,00 gram, dan bobot setelah dibersihkan dari debu pasca-pengujian adalah 9,92 gram. Tidak ditemukan tablet yang pecah.',
    question: 'Berapakah persentase kerapuhan tablet tersebut dan bagaimanakah status kelulusannya menurut Farmakope Indonesia VI?',
    options: [
      { key: 'A', text: '0,08% (Lulus, karena < 0,1%)' },
      { key: 'B', text: '0,80% (Lulus, karena < 1,0%)' },
      { key: 'C', text: '1,20% (Tidak Lulus, karena > 1,0%)' },
      { key: 'D', text: '8,00% (Tidak Lulus, karena > 1,0%)' },
      { key: 'E', text: '0,008% (Lulus)' }
    ],
    correctAnswer: 'B',
    explanation: 'Persentase Kerapuhan (% F) = [(Bobot Awal - Bobot Akhir) / Bobot Awal] x 100% = [(10,00 g - 9,92 g) / 10,00 g] x 100% = (0,08 / 10,00) x 100% = 0,80%. Syarat penerimaan Farmakope Indonesia VI adalah kerapuhan HARUS < 1,0%, sehingga tablet dinyatakan LULUS.',
    clinicalReference: 'Farmakope Indonesia Edisi VI (FI VI) Lampiran Uji Kerapuhan Tablet',
    difficulty: 'Mudah'
  },
  {
    id: 'q-018',
    domainId: 'bahan_alam',
    vignette: 'Departemen QC industri jamu melakukan pengujian parameter mutu terhadap simplisia rimpang Jahe Merah (Zingiber officinale var. rubrum). Hasil pengujian parameter kadar abu tidak larut asam menunjukkan nilai yang melebihi batas standar Farmakope Herbal Indonesia.',
    question: 'Kondisi ketidaksesuaian manakah yang diindikasikan oleh tingginya kadar abu tidak larut asam tersebut?',
    options: [
      { key: 'A', text: 'Kadar air simplisia terlalu tinggi sehingga berjamur' },
      { key: 'B', text: 'Tingginya cemaran mineral silikat, pasir, atau tanah akibat pencucian yang tidak bersih' },
      { key: 'C', text: 'Kadar minyak atsiri gingerol telah menguap sempurna' },
      { key: 'D', text: 'Penggunaan pelarut ekstraksi yang tidak sesuai' },
      { key: 'E', text: 'Tingginya cemaran logam berat merkuri di atas batas toleransi' }
    ],
    correctAnswer: 'B',
    explanation: 'Kadar abu total mengukur sisa garam anorganik fisiologis dan non-fisiologis. Namun, KADAR ABU TIDAK LARUT ASAM (yang larut dalam asam klorida encer) secara spesifik mengukur CEMARAN SILIKAT EKSTERNAL yang berasal dari tanah, pasir, atau debu lingkungan akibat proses pencucian rimpang yang kurang bersih.',
    clinicalReference: 'Farmakope Herbal Indonesia Edisi II Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-019',
    domainId: 'klinis',
    vignette: 'Seorang anak perempuan berusia 8 tahun dibawa orang tuanya ke dokter spesialis saraf anak karena sering mengalami episode melamun mendadak, tatapan kosong selama 5-10 detik tanpa disertai kejang kelojotan, dan langsung sadar kembali tanpa kebingungan. Hasil EEG mengonfirmasi bangkitan kejang absans (absence seizure).',
    question: 'Obat antiepilepsi lini pertama manakah yang paling tepat direkomendasikan?',
    options: [
      { key: 'A', text: 'Karbamazepin' },
      { key: 'B', text: 'Fenitoin' },
      { key: 'C', text: 'Etosuksimid' },
      { key: 'D', text: 'Fenobarbital' },
      { key: 'E', text: 'Gabapentin' }
    ],
    correctAnswer: 'C',
    explanation: 'Pada kejang absans (petit mal), obat lini pertama pilihan utama adalah ETOSUKSIMID atau ASAM VALPROAT yang bekerja menghambat kanal kalsium tipe T di talamus. Karbamazepin, Fenitoin, dan Gabapentin KONTRAINDIKASI karena dapat memperparah frekuensi kejang absans.',
    clinicalReference: 'Pedoman Tata Laksana Epilepsi Anak & PERDOSSI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-020',
    domainId: 'klinis',
    vignette: 'Seorang pasien gagal ginjal kronik stadium 5 on-hemodialisis rutin mengeluh lemas dan pucat. Hasil lab: Hb 8,2 g/dL, Serum Feritin 280 ng/mL, Saturasi Transferin (TSAT) 24%. Dokter berencana memulai terapi Erythropoiesis-Stimulating Agent (ESA) Eritropoietin Alfa 4000 IU subkutan.',
    question: 'Parameter target kadar Hemoglobin (Hb) manakah yang tepat ditetapkan oleh apoteker untuk memantau keamanan terapi ESA tersebut?',
    options: [
      { key: 'A', text: 'Hb target 8,5 - 9,5 g/dL' },
      { key: 'B', text: 'Hb target 10,0 - 11,5 g/dL' },
      { key: 'C', text: 'Hb target 13,5 - 15,0 g/dL' },
      { key: 'D', text: 'Hb target > 16,0 g/dL' },
      { key: 'E', text: 'Hb normal wanita dewasa (> 12 g/dL tanpa batas atas)' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan pedoman KDIGO dan PERNEFRI, target kadar hemoglobin pada terapi ESA untuk pasien CKD anemia adalah 10,0 - 11,5 g/dL (tidak direkomendasikan melebihi 13,0 g/dL secara sengaja karena meningkatkan risiko kejadian kardiovaskular mayor, trombosis vaskular akses, hipertensi berat, dan stroke).',
    clinicalReference: 'KDIGO Clinical Practice Guideline for Anemia in Chronic Kidney Disease',
    difficulty: 'Sedang'
  }
];

export interface FormulaCalculatorGuide {
  id: string;
  category: 'pk' | 'alligation' | 'hlb' | 'tonicity' | 'management' | 'pediatric' | 'pharmacoeconomics';
  title: string;
  formulaDisplay: string;
  description: string;
  sampleProblem: string;
  stepByStepSolution: string[];
}

export const FORMULA_GUIDES: FormulaCalculatorGuide[] = [
  {
    id: 'f-alligation',
    category: 'alligation',
    title: 'Metode Aligasi Silang (Alligation Alternate)',
    formulaDisplay: 'Bagian A = |% Target - % B|  ;  Bagian B = |% A - % Target|',
    description: 'Digunakan untuk mencampur dua sediaan dengan konsentrasi berbeda untuk menghasilkan sediaan dengan konsentrasi perantara tertentu.',
    sampleProblem: 'Apoteker diminta membuat 100 mL Alkohol 70% dari Alkohol 96% dan Aquadest (Alkohol 0%). Berapakah volume Alkohol 96% dan Aquadest yang dibutuhkan?',
    stepByStepSolution: [
      '1. Letakkan konsentrasi tinggi (96%) di kiri atas, konsentrasi rendah (0%) di kiri bawah, dan konsentrasi target (70%) di tengah.',
      '2. Hitung selisih silang: Bagian Alkohol 96% = |70 - 0| = 70 bagian.',
      '3. Hitung selisih silang: Bagian Aquadest = |96 - 70| = 26 bagian.',
      '4. Total bagian campuran = 70 + 26 = 96 bagian.',
      '5. Volume Alkohol 96% = (70 / 96) x 100 mL = 72,92 mL.',
      '6. Volume Aquadest = (26 / 96) x 100 mL = 27,08 mL (atau ad 100 mL).'
    ]
  },
  {
    id: 'f-hlb-mix',
    category: 'hlb',
    title: 'Perhitungan HLB Campuran Surfaktan Emulsi',
    formulaDisplay: 'HLB Campuran = (%A x HLB A) + (%B x HLB B)',
    description: 'Menghitung proporsi dua jenis emulgator (misal: Span dan Tween) untuk mencapai nilai Required HLB (RHLB) minyak fase dalam.',
    sampleProblem: 'Dibutuhkan 10 gram kombinasi Tween 80 (HLB = 15) dan Span 80 (HLB = 4,3) untuk membuat emulsi dengan RHLB = 12. Berapa gram Tween 80 dan Span 80 yang harus ditimbang?',
    stepByStepSolution: [
      '1. Misalkan bobot Tween 80 = x gram, maka bobot Span 80 = (10 - x) gram.',
      '2. Persamaan: (x * 15) + ((10 - x) * 4,3) = 10 * 12',
      '3. 15x + 43 - 4,3x = 120  ==>  10,7x = 77',
      '4. x (Tween 80) = 77 / 10,7 = 7,20 gram.',
      '5. Bobot Span 80 = 10 - 7,20 = 2,80 gram.'
    ]
  },
  {
    id: 'f-tonicity-enacl',
    category: 'tonicity',
    title: 'Tonisitas & Ekivalensi NaCl (Metode E-NaCl)',
    formulaDisplay: 'Bobot Tambahan NaCl (g) = (0,9% x V/100) - (Bobot Obat x E)',
    description: 'Menghitung jumlah NaCl murni yang harus ditambahkan agar larutan injeksi/tetes mata menjadi isotonis (setara NaCl 0,9% b/v).',
    sampleProblem: 'Dibuat 100 mL tetes mata mengandung Atropin Sulfat 1% (E = 0,13). Berapa gram NaCl yang harus ditambahkan agar larutan isotonis?',
    stepByStepSolution: [
      '1. Kebutuhan NaCl untuk 100 mL larutan isotonis murni = 0,9 gram.',
      '2. Bobot Atropin Sulfat dalam 100 mL = 1% x 100 mL = 1,0 gram.',
      '3. Tonisitas yang sudah disumbangkan Atropin Sulfat = 1,0 gram x 0,13 = 0,13 gram setara NaCl.',
      '4. Kekurangan NaCl yang wajib ditambahkan = 0,90 gram - 0,13 gram = 0,77 gram NaCl.'
    ]
  },
  {
    id: 'f-pk-clearance',
    category: 'pk',
    title: 'Farmakokinetika: Loading Dose, Maintenance Dose & t1/2',
    formulaDisplay: 'LD = (Css x Vd) / F  ;  MD = (Css x Cl) / F  ;  t1/2 = 0,693 / Kel',
    description: 'Parameter dasar penentuan regimen dosis obat dengan indeks terapi sempit (Digoksin, Teofilin, Fenitoin, Aminoglikosida).',
    sampleProblem: 'Pasien diberikan Teofilin IV (F = 1) dengan target kadar plasma tunak (Css) 15 mg/L. Diketahui Vd = 35 L dan Klirens (Cl) = 2,8 L/jam. Berapakah Loading Dose (dosis muatan) dan Maintenance Dose (dosis pemeliharaan per jam)?',
    stepByStepSolution: [
      '1. Loading Dose (LD) = (Css x Vd) / F = (15 mg/L x 35 L) / 1 = 525 mg IV bolus lambat.',
      '2. Maintenance Dose (Laju Infus) = (Css x Cl) / F = (15 mg/L x 2,8 L/jam) / 1 = 42 mg/jam kontinu.',
      '3. Waktu paruh eliminasi: Kel = Cl / Vd = 2,8 / 35 = 0,08 jam^-1. Maka t1/2 = 0,693 / 0,08 = 8,66 jam.'
    ]
  },
  {
    id: 'f-rop-eoq',
    category: 'management',
    title: 'Pengendalian Persediaan: ROP (Reorder Point) & Safety Stock',
    formulaDisplay: 'ROP = (Lead Time x Pemakaian Rata-rata) + Safety Stock',
    description: 'Menentukan titik batas minimal stok di gudang apotek untuk segera menerbitkan Surat Pesanan baru ke PBF.',
    sampleProblem: 'Pemakaian Cefixime 100 mg rata-rata 20 kapsul/hari. Waktu tunggu pengiriman (Lead Time) PBF adalah 3 hari. Apotek menetapkan Safety Stock sebesar 50 kapsul. Pada sisa stok berapa apoteker harus memesan ulang (ROP)?',
    stepByStepSolution: [
      '1. Kebutuhan selama Lead Time = 3 hari x 20 kapsul/hari = 60 kapsul.',
      '2. Safety Stock = 50 kapsul.',
      '3. Reorder Point (ROP) = 60 + 50 = 110 kapsul.',
      '4. Kesimpulan: Saat stok Cefixime di apotek tersisa 110 kapsul, SP harus segera diterbitkan.'
    ]
  },
  {
    id: 'f-icer-calc',
    category: 'pharmacoeconomics',
    title: 'Farmakoekonomi: ICER (Incremental Cost-Effectiveness Ratio)',
    formulaDisplay: 'ICER = (Biaya Terapi B - Biaya Terapi A) / (Outcome B - Outcome A)',
    description: 'Menghitung rasio tambahan biaya yang diperlukan untuk mendapatkan satu unit tambahan efektivitas klinis.',
    sampleProblem: 'Obat Antihipertensi A berbiaya Rp 200.000/bulan dengan penurunan TD 10 mmHg. Obat B berbiaya Rp 500.000/bulan dengan penurunan TD 16 mmHg. Berapakah ICER Obat B terhadap Obat A?',
    stepByStepSolution: [
      '1. Selisih Biaya (Delta C) = Rp 500.000 - Rp 200.000 = Rp 300.000.',
      '2. Selisih Efektivitas (Delta E) = 16 mmHg - 10 mmHg = 6 mmHg.',
      '3. ICER = Rp 300.000 / 6 mmHg = Rp 50.000 per 1 mmHg penurunan tekanan darah.'
    ]
  },
  {
    id: 'f-consumption-planning',
    category: 'management',
    title: 'Perencanaan Pengadaan: Metode Konsumsi Terkoreksi',
    formulaDisplay: 'Rencana Pengadaan = (CA x Periode) + SS + LT - Sisa Stok',
    description: 'Menghitung jumlah unit obat yang harus dipesan berdasarkan rata-rata pemakaian bulanan (CA), safety stock (SS), dan lead time (LT).',
    sampleProblem: 'Pemakaian Amlodipin 10 mg di RS rata-rata 3.000 tablet/bulan. Waktu tunggu PBF 0,5 bulan (15 hari). Safety stock ditetapkan 1.500 tablet. Sisa stok saat ini di gudang 800 tablet. Berapa tablet yang harus diadakan untuk periode 1 bulan?',
    stepByStepSolution: [
      '1. Kebutuhan Periode = 3.000 tablet.',
      '2. Kebutuhan Lead Time = 3.000 x 0,5 = 1.500 tablet.',
      '3. Safety Stock = 1.500 tablet.',
      '4. Total Kebutuhan = 3.000 + 1.500 + 1.500 = 6.000 tablet.',
      '5. Rencana Pengadaan = 6.000 - Sisa Stok (800) = 5.200 tablet.'
    ]
  },
  {
    id: 'f-friability-test',
    category: 'tonicity',
    title: 'Uji Mutu Tablet: Persentase Kerapuhan (Friability %)',
    formulaDisplay: '% Kerapuhan = [(Bobot Awal - Bobot Akhir) / Bobot Awal] x 100%',
    description: 'Evaluasi ketahanan tablet terhadap gesekan mekanis saat proses pengemasan dan distribusi (Syarat: < 1,0%).',
    sampleProblem: 'Bobot 20 tablet sebelum diuji friabilitas adalah 6,50 gram. Setelah 100 putaran di friabilator, bobotnya menjadi 6,44 gram. Berapakah kerapuhan tablet?',
    stepByStepSolution: [
      '1. Selisih bobot = 6,50 g - 6,44 g = 0,06 gram.',
      '2. % Kerapuhan = (0,06 / 6,50) x 100% = 0,923%.',
      '3. Kesimpulan: LULUS karena 0,923% < 1,0%.'
    ]
  },
  {
    id: 'f-bsa-mosteller',
    category: 'pediatric',
    title: 'Dosis Pediatrik/Sitostatika: Luas Permukaan Tubuh (BSA Mosteller)',
    formulaDisplay: 'BSA (m²) = √ [ (Tinggi Badan (cm) x Berat Badan (kg)) / 3600 ]',
    description: 'Rumus baku emas penentuan dosis obat sitostatika dan dosis anak berbasis luas permukaan tubuh.',
    sampleProblem: 'Seorang pasien anak memiliki tinggi badan 120 cm dan berat badan 25 kg. Berapakah nilai BSA pasien tersebut?',
    stepByStepSolution: [
      '1. Perkalian TB x BB = 120 x 25 = 3.000.',
      '2. Pembagian dengan 3600 = 3.000 / 3.600 = 0,8333.',
      '3. Akar kuadrat = √ 0,8333 = 0,913 m².'
    ]
  }
];

export interface OsceStationGuide {
  id: string;
  title: string;
  stationType: 'Konseling & PIO' | 'Swamedikasi' | 'Skrining Resep' | 'Manajemen & CDOB';
  durationMinutes: number;
  candidateTask: string;
  simulatedPatientScript: string;
  criticalChecklist: {
    step: string;
    description: string;
    points: number;
  }[];
  examinerTips: string[];
}

export const OSCE_STATIONS: OsceStationGuide[] = [
  {
    id: 'osce-inhaler',
    title: 'Stasi 1: Konseling Teknik Penggunaan Inhaler Asma (MDI)',
    stationType: 'Konseling & PIO',
    durationMinutes: 10,
    candidateTask: 'Seorang pasien pria 35 tahun baru pertama kali diresepkan Salbutamol Inhaler (MDI) untuk mengatasi serangan asma akut. Lakukan konseling dan demonstrasikan langkah-langkah penggunaan MDI dengan benar kepada pasien.',
    simulatedPatientScript: 'Pasien tampak cemas dan belum pernah memakai inhaler sebelumnya. Pasien bertanya: "Apakah saya harus langsung menyemprotkannya ke lidah saya? Berapa lama saya harus menahan nafas?"',
    criticalChecklist: [
      { step: 'Perkenalan Diri & Three Prime Questions', description: 'Memperkenalkan diri sebagai apoteker, memastikan identitas pasien, menanyakan apa yang dokter sampaikan tentang obat, cara pakai, dan harapan terapi.', points: 15 },
      { step: 'Persiapan Alat Inhaler', description: 'Buka tutup mouthpiece, periksa kebersihan corong, kocok inhaler 4-5 kali dengan posisi tegak.', points: 20 },
      { step: 'Teknik Ekspirasi Awal', description: 'Instruksikan pasien berdiri/duduk tegak, hembuskan nafas maksimal ke luar menjauhi corong inhaler.', points: 15 },
      { step: 'Teknik Inhalasi & Aktuasi Simultan', description: 'Letakkan mouthpiece di antara gigi tanpa digigit, rapatkan bibir. Mulai tarik nafas perlahan dan dalam MELALUI MULUT bersamaan dengan menekan tabung kanister 1 kali.', points: 25 },
      { step: 'Menahan Nafas (Breath-holding)', description: 'Tahan nafas selama 10 detik (atau senyaman mungkin) sebelum menghembuskan nafas perlahan melalui hidung.', points: 15 },
      { step: 'Dosis Kedua & Kumur-kumur', description: 'Jika butuh hisapan ke-2, tunggu jeda 1 menit. Jika mengandung kortikosteroid, ingatkan WAJIB kumur air hangat dan buang airnya untuk mencegah sariawan/candidiasis.', points: 10 }
    ],
    examinerTips: [
      'Perhatikan apakah kandidat menjelaskan jeda 1 menit jika resep memerlukan 2 puff.',
      'Perhatikan apakah kandidat mengingatkan untuk berkumur-kumur jika memakai inhaler kombinasi steroid.'
    ]
  },
  {
    id: 'osce-insulin-pen',
    title: 'Stasi 2: Konseling Penggunaan Pen Insulin Flexpen & Penyimpanan',
    stationType: 'Konseling & PIO',
    durationMinutes: 10,
    candidateTask: 'Seorang pasien laki-laki 52 tahun dengan DM Tipe 2 baru pertama kali diresepkan Insulin Glargin (Lantus SoloStar) 10 Unit malam hari. Lakukan konseling langkah demi langkah penggunaan pen insulin dan edukasi cara penyimpanannya.',
    simulatedPatientScript: 'Pasien takut jarum suntik dan bertanya: "Apakah obat ini harus disimpan di freezer kulkas? Di mana saya harus menyuntikkannya?"',
    criticalChecklist: [
      { step: 'Perkenalan & Verifikasi Identitas', description: 'Menjelaskan peran apoteker, memastikan nama pasien, dan melakukan Three Prime Questions.', points: 15 },
      { step: 'Persiapan Pen & Priming 2 Unit (Safety Test)', description: 'Buka tutup pen, pasang jarum baru, putar dial ke 2 unit, arahkan jarum ke atas, tekan tombol dosis hingga terlihat setitik cairan insulin di ujung jarum (membuang gelembung udara).', points: 25 },
      { step: 'Pengaturan Dosis & Lokasi Injeksi', description: 'Putar dial dosis sesuai resep (10 unit). Jelaskan area penyuntikan: Perut (2 jari dari pusar), paha atas, atau lengan atas. Edukasi WAJIB ROTASI lokasi suntik untuk mencegah lipohipertrofi.', points: 25 },
      { step: 'Teknik Injeksi Subkutan & Tahan 10 Detik', description: 'Usap alkohol swab, cubit kulit jika kurus, tusukkan jarum tegak lurus 90° secara subkutan, tekan tombol dosis penuh hingga kembali ke angka 0, TAHAN 10 DETIK sebelum mencabut jarum.', points: 25 },
      { step: 'Edukasi Penyimpanan & Tanda Hipoglikemia', description: 'Pen insulin yang BELUM DIBUKA disimpan di kulkas (2-8°C, jangan di freezer). Pen yang SEDANG DIGUNAKAN disimpan di suhu ruang (<= 30°C) tahan hingga 28 hari. Edukasi penanganan hipoglikemia dengan permen manis.', points: 10 }
    ],
    examinerTips: [
      'Kandidat wajib mendemonstrasikan penahanan jarum selama 10 detik sebelum dicabut agar seluruh dosis insulin masuk sempurna.'
    ]
  },
  {
    id: 'osce-swamedikasi-diare',
    title: 'Stasi 3: Swamedikasi Pasien Diare Akut Dewasa (WWHAM)',
    stationType: 'Swamedikasi',
    durationMinutes: 10,
    candidateTask: 'Seorang ibu datang ke apotek mengeluhkan buang air besar cair 4 kali sejak tadi pagi setelah makan makanan pedas. Pasien tidak demam, tidak ada lendir/darah di feses. Berikan rekomendasi swamedikasi yang tepat.',
    simulatedPatientScript: 'Pasien meminta antibiotik Ampisilin/Ciprofloxacin karena ingin diare cepat sembuh. Pasien tidak memiliki riwayat alergi obat.',
    criticalChecklist: [
      { step: 'Penggalian Informasi (Metode WWHAM)', description: 'Who (untuk siapa), What symptoms (gejala penyerta), How long (sejak kapan), Action taken (sudah minum apa), Medication (riwayat obat/alergi).', points: 20 },
      { step: 'Penolakan Edukatif Antibiotik', description: 'Menjelaskan dengan sopan bahwa diare tanpa demam dan tanpa darah umumnya bukan infeksi bakteri invasif sehingga TIDAK MEMERLUKAN ANTIBIOTIK oral.', points: 20 },
      { step: 'Rekomendasi Terapi Utama (Rehidrasi & Adsorben)', description: 'Merekomendasikan Oralit (1 sachet dilarutkan dalam 200 mL air setiap kali BAB cair) + Attapulgite atau Karbo Adsorben (2 tablet setiap setelah BAB, max 12 tab/hari).', points: 30 },
      { step: 'Terapi Tambahan Probiotik / Zink', description: 'Menjelaskan manfaat zink (jika ada) dan probiotik untuk mempercepat pemulihan mukosa usus.', points: 15 },
      { step: 'Tanda Bahaya & Rujukan (Red Flags)', description: 'Edukasi pasien untuk segera ke dokter jika dalam 2-3 hari diare tidak membaik, muncul demam tinggi, tinja berdarah, atau tanda dehidrasi berat (lemas, mata cekung).', points: 15 }
    ],
    examinerTips: [
      'Kandidat GAGAL jika mengiyakan permintaan antibiotik bebas tanpa resep dokter.',
      'Oralit harus selalu disebut sebagai pilar pertama terapi diare.'
    ]
  },
  {
    id: 'osce-suppositoria',
    title: 'Stasi 4: Konseling Penggunaan Suppositoria & Ovula',
    stationType: 'Konseling & PIO',
    durationMinutes: 10,
    candidateTask: 'Seorang pasien wanita diresepkan Bisakodil Suppositoria 10 mg untuk konstipasi parah pasca-operasi. Demonstrasikan cara pemakaian suppositoria yang benar kepada pasien.',
    simulatedPatientScript: 'Pasien bertanya: "Apakah obat ini ditelan dengan air hangat? Bagaimana jika obatnya agak lembek saat kemasannya dibuka?"',
    criticalChecklist: [
      { step: 'Verifikasi & Three Prime Questions', description: 'Memastikan identitas dan mengonfirmasi bahwa obat ini adalah OBAT LUAR untuk dimasukkan ke dalam dubur (anus), BUKAN diminum.', points: 20 },
      { step: 'Persiapan Sediaan (Jika Lembek)', description: 'Jika suppositoria terlalu lembek, masukkan ke dalam lemari es atau celupkan ke air dingin sebentar dalam kemasan tertutup sebelum dibuka.', points: 20 },
      { step: 'Higienitas & Pelumasan', description: 'Cuci tangan dengan sabun, buka bungkus aluminium foil, basahi ujung runcing suppositoria dengan sedikit air bersih atau pelumas berbasis air (jangan minyak/vaselin).', points: 20 },
      { step: 'Posisi Tubuh & Insersi Rektal', description: 'Berbaring miring ke salah satu sisi (posisi Sims) dengan kaki bawah lurus dan kaki atas ditekuk ke arah dada. Masukkan suppositoria dengan ujung runcing terlebih dahulu menggunakan jari sedalam 2-3 cm melewati sfingter anus.', points: 25 },
      { step: 'Retensi Posisi & Cuci Tangan', description: 'Rapatkan kedua kaki dan tetap berbaring miring selama 10-15 menit agar obat tidak keluar kembali. Cuci tangan kembali setelah selesai.', points: 15 }
    ],
    examinerTips: [
      'Pastikan kandidat menegaskan bahwa obat ini tidak boleh ditelan dan posisi berbaring miring dipertahankan selama 15 menit.'
    ]
  },
  {
    id: 'osce-skrining-resep',
    title: 'Stasi 5: Skrining Resep Klinis & DRP Interaksi Kritis (Warfarin + Ciprofloxacin)',
    stationType: 'Skrining Resep',
    durationMinutes: 10,
    candidateTask: 'Lakukan kajian administratif, farmasetik, dan klinis terhadap resep dokter spesialis jantung untuk pasien Tn. Budi (62 tahun): R/ Warfarin 2 mg tab No. XXX (S 1 dd 1 tab malam) dan R/ Simvastatin 40 mg tab No. XXX (S 1 dd 1 tab malam) serta R/ Ciprofloxacin 500 mg No. X (S 2 dd 1 tab). Temukan DRP dan berikan solusi kepada dokter penulis resep.',
    simulatedPatientScript: 'Dokter dapat dihubungi melalui telepon simulasi. Dokter menanyakan alasan apoteker menghubungi.',
    criticalChecklist: [
      { step: 'Kajian Administratif & Farmasetik', description: 'Memeriksa kelengkapan nama dokter, SIP, paraf, nama pasien, umur, BB, dosis, bentuk sediaan, dan aturan pakai.', points: 20 },
      { step: 'Identifikasi DRP Interaksi Kritis (Warfarin + Ciprofloxacin)', description: 'Mengidentifikasi bahwa Ciprofloxacin menghambat enzim CYP1A2 & CYP3A4 dan menggeser ikatan protein Warfarin, meningkatkan kadar bebas Warfarin dan risiko PERDARAHAN FATAL (INR melonjak).', points: 30 },
      { step: 'Komunikasi SBAR dengan Dokter', description: 'Menghubungi dokter dengan metode Situation, Background, Assessment, Recommendation secara profesional dan jelas.', points: 25 },
      { step: 'Rekomendasi Alternatif Antibiotik yang Aman', description: 'Merekomendasikan penggantian antibiotik yang tidak berinteraksi berat dengan Warfarin (misal: Sefalosporin atau Amoksisilin/Klavulanat) serta menyarankan pemantauan nilai INR.', points: 25 }
    ],
    examinerTips: [
      'Apoteker harus mampu menjelaskan mekanisme interaksi farmakokinetik secara ringkas kepada dokter.'
    ]
  },
  {
    id: 'osce-coldchain-warehouse',
    title: 'Stasi 6: Manajemen Cold Chain & Penanganan Pemadaman Listrik Gudang Farmasi',
    stationType: 'Manajemen & CDOB',
    durationMinutes: 10,
    candidateTask: 'Sebagai Apoteker Penanggung Jawab di Gudang Farmasi, terjadi pemadaman listrik darurat selama 4 jam pada freezer dan chiller vaksin. Lakukan Standar Operasional Prosedur (SOP) pengamanan rantai dingin (Cold Chain) dan evaluasi kelayakan vaksin.',
    simulatedPatientScript: 'Petugas logistik melapor bahwa genset otomatis gagal menyala dan suhu chiller naik menjadi 12°C.',
    criticalChecklist: [
      { step: 'Tindakan Tanggap Darurat Awal', description: 'Jangan membuka pintu kulkas vaksin secara sembarangan untuk menjaga suhu dingin tetap terperangkap. Segera nyalakan genset manual atau pindahkan vaksin ke Cold Box dengan Ice Pack beku.', points: 25 },
      { step: 'Pencatatan Log Termometer & Durasi Suhu', description: 'Mencatat suhu tertinggi yang tercapai pada termometer digital min-max data logger serta durasi keterpaparan suhu.', points: 25 },
      { step: 'Pemeriksaan Indikator VVM & Shake Test', description: 'Memeriksa VVM pada tiap vial vaksin (Kondisi A/B masih aman; Kondisi C/D wajib dikarantina). Lakukan Shake Test (uji kocok) untuk vaksin freeze-sensitive yang dicurigai beku.', points: 25 },
      { step: 'Pelaporan & Berita Acara Karantina', description: 'Membuat Berita Acara Insiden Suhu dan memisahkan vaksin rusak di lemari karantina terpisah bertanda merah sebelum dimusnahkan/diklaim ke distributor.', points: 25 }
    ],
    examinerTips: [
      'Kandidat harus mampu membaca dan membedakan tahapan VVM A, B, C, dan D dengan tepat.'
    ]
  }
];

export interface FlashcardItem {
  id: string;
  category: 'Antidotum' | 'Efek Samping Khas' | 'Nilai Normal Lab' | 'Mekanisme Obat (MoA)' | 'Interaksi Kritis' | 'Regulasi & DOWA';
  frontText: string;
  backText: string;
  hint: string;
}

export const FLASHCARD_DECK: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'Antidotum',
    frontText: 'Antidotum Keracunan Paracetamol (Acetaminophen)',
    backText: 'N-Asetilsistein (NAC) / Acetylcysteine\n\n• Mekanisme: Meregenerasi cadangan glutation hepar untuk menetralkan metabolit reaktif toksik NAPQI.',
    hint: 'Senyawa mukolitik dengan gugus sulfhidril (-SH)'
  },
  {
    id: 'fc-2',
    category: 'Antidotum',
    frontText: 'Antidotum Overdosis Opioid (Morfin / Tramadol / Petidin / Fentanil)',
    backText: 'Nalokson IV (Naloxone)\n\n• Mekanisme: Antagonis kompetitif murni pada reseptor opioid Mu (μ), Kappa, dan Delta.',
    hint: 'Diberikan cepat pada depresi pernafasan akibat overdosis narkotika'
  },
  {
    id: 'fc-3',
    category: 'Antidotum',
    frontText: 'Antidotum Overdosis Benzodiazepin (Diazepam / Alprazolam)',
    backText: 'Flumazenil IV\n\n• Mekanisme: Antagonis reseptor Benzodiazepin pada kompleks GABA-A di sistem saraf pusat.',
    hint: 'Awali huruf F, antagonis reseptor GABA-A'
  },
  {
    id: 'fc-4',
    category: 'Antidotum',
    frontText: 'Antidotum Pendarahan Akibat Heparin Tak Terfraksi (UFH)',
    backText: 'Protamin Sulfat (Protamine Sulfate)\n\n• Dosis: 1 mg Protamin Sulfat menetralkan sekitar 100 Unit Heparin.',
    hint: 'Protein polikationik basa kuat berasal dari sperma ikan salmon'
  },
  {
    id: 'fc-5',
    category: 'Antidotum',
    frontText: 'Antidotum Toksisitas Warfarin / Kumarin (INR Memanjang)',
    backText: 'Fitomenadion / Vitamin K1 (Phytonadione) + FFP\n\n• Mekanisme: Mengaktifkan kembali faktor pembekuan darah dependen vitamin K (II, VII, IX, X).',
    hint: 'Vitamin larut lemak penting untuk sintesis protrombin'
  },
  {
    id: 'fc-6',
    category: 'Efek Samping Khas',
    frontText: 'Red Man Syndrome (Kemerahan hebat di leher/dada bagian atas)',
    backText: 'Vankomisin IV (Vancomycin)\n\n• Penyebab: Akibat infus terlalu cepat yang memicu pelepasan histamin masif non-imunologis. Solusi: Perlambat laju infus minimal 60 menit + Antihistamin.',
    hint: 'Antibiotik glikopeptida untuk MRSA'
  },
  {
    id: 'fc-7',
    category: 'Efek Samping Khas',
    frontText: 'Grey Baby Syndrome (Sianosis keabu-abuan & kolaps sirkulasi pada neonatus)',
    backText: 'Kloramfenikol (Chloramphenicol)\n\n• Penyebab: Enzim UDP-Glukuronil Transferase pada hati bayi belum matang sehingga akumulasi kloramfenikol bebas.',
    hint: 'Antibiotik spektrum luas yang juga memicu anemia aplastik'
  },
  {
    id: 'fc-8',
    category: 'Efek Samping Khas',
    frontText: 'Batuk Kering Persisten Tanpa Dahak',
    backText: 'Golongan ACE Inhibitor (Kaptopril, Ramipril, Lisinopril)\n\n• Penyebab: Penghambatan degradasi Bradikinin & Substansi P di saluran nafas. Solusi: Ganti ke golongan ARB.',
    hint: 'Antihipertensi penghambat konversi Angiotensin I ke II'
  },
  {
    id: 'fc-9',
    category: 'Efek Samping Khas',
    frontText: 'Gingival Hyperplasia (Pembesaran gusi berlebih)',
    backText: 'Fenitoin (Phenytoin) & Nifedipin (CCB Dihidropiridin)\n\n• Edukasi: Wajib menjaga kebersihan rongga mulut (oral hygiene) secara ekstra.',
    hint: 'Obat antiepilepsi lini pertama untuk kejang tonik-klonik'
  },
  {
    id: 'fc-10',
    category: 'Nilai Normal Lab',
    frontText: 'Nilai Normal Serum Kreatinin & Batas Uji Klirens Kreatinin (CrCl)',
    backText: 'Serum Kreatinin Normal: 0,6 - 1,2 mg/dL\n\n• Rumus Cockcroft-Gault: CrCl = [(140 - Umur) x BB] / (72 x Scr) (* kalikan 0,85 untuk wanita).\n• Penyesuaian dosis obat umumnya dimulai saat CrCl < 50 mL/min.',
    hint: 'Biomarker utama fungsi filtrasi ginjal'
  },
  {
    id: 'fc-11',
    category: 'Nilai Normal Lab',
    frontText: 'Nilai Normal Target HbA1c & Glukosa Darah Pasien Diabetes (PERKENI)',
    backText: 'Target HbA1c: < 7,0% (pada pasien umum)\n• GDP (Gula Darah Puasa): 80 - 130 mg/dL\n• GD2PP (Gula Darah 2 Jam Postprandial): < 180 mg/dL',
    hint: 'Persentase hemoglobin yang terglikasi selama 3 bulan terakhir'
  },
  {
    id: 'fc-12',
    category: 'Mekanisme Obat (MoA)',
    frontText: 'Mekanisme Aksi Golongan SGLT-2 Inhibitor (Empagliflozin, Dapagliflozin)',
    backText: 'Menghambat reabsorpsi glukosa di Tubulus Proksimal Ginjal sehingga meningkatkan ekskresi glukosa melalui urin (Glukosuria).\n\n• Manfaat ekstra: Proteksi gagal jantung dan memperlambat perburukan CKD.',
    hint: 'Antidiabetes oral yang bekerja langsung di tubulus nefron'
  },
  {
    id: 'fc-13',
    category: 'Interaksi Kritis',
    frontText: 'Inhibitor Kuat Enzim CYP3A4 (Meningkatkan Kadar Statin/Warfarin)',
    backText: 'Ketokonazol, Itrakonazol, Klaritromisin, Eritromisin, Ritonavir, Jus Grapefruit.\n\n• Dampak: Menghambat metabolisme substrat CYP3A4 sehingga kadar plasma melonjak dan risiko toksisitas meningkat.',
    hint: 'Antijamur azol dan antibiotik makrolida'
  },
  {
    id: 'fc-14',
    category: 'Interaksi Kritis',
    frontText: 'Induktor Kuat Enzim CYP450 (Menurunkan Efektivitas Pil KB & ARV)',
    backText: 'Rifampisin, Karbamazepin, Fenitoin, Fenobarbital, St. John\'s Wort.\n\n• Dampak: Mempercepat metabolisme substrat sehingga kadar obat dalam darah drop di bawah level terapeutik.',
    hint: 'OAT utama dan obat antiepilepsi klasik'
  },
  {
    id: 'fc-15',
    category: 'Regulasi & DOWA',
    frontText: 'Jumlah Maksimal Penyerahan DOWA 1 untuk Asam Mefenamat',
    backText: 'Maksimal 20 Tablet (500 mg)\n\n• Kategori: Obat Keras yang dapat diserahkan tanpa resep dokter oleh Apoteker di apotek (DOWA 1).',
    hint: 'Analgesik NSAID terpopuler'
  },
  {
    id: 'fc-16',
    category: 'Regulasi & DOWA',
    frontText: 'Jumlah Maksimal Penyerahan DOWA 2 untuk Omeprazole & Ibuprofen',
    backText: 'Omeprazole: Maksimal 7 Tablet (20 mg)\nIbuprofen 400 mg: Maksimal 10 Tablet\n\n• Kepmenkes No. 924/1993 tentang DOWA 2.',
    hint: 'PPI dan NSAID'
  },
  {
    id: 'fc-17',
    category: 'Antidotum',
    frontText: 'Antidotum Ekstravasasi Sitostatika Vinkristin vs Doksorubisin',
    backText: 'Vinkristin (Vinka Alkaloid): Kompres HANGAT + Injeksi Hialuronidase.\nDoksorubisin (Antrasiklin): Kompres DINGIN + Deksrazoksan (atau DMSO topikal).',
    hint: 'Alkaloid vinka butuh vasodilatasi hangat, antrasiklin butuh vasokonstriksi dingin'
  },
  {
    id: 'fc-18',
    category: 'Nilai Normal Lab',
    frontText: 'Batas Syarat Uji Kerapuhan Tablet (Friability Test) Farmakope VI',
    backText: 'Kerapuhan (% F) HARUS < 1,0%\n\n• Alat: Friabilator (25 rpm x 4 menit = 100 putaran). Tidak boleh ada tablet yang pecah/retak.',
    hint: 'Persentase kehilangan bobot tablet'
  }
];
