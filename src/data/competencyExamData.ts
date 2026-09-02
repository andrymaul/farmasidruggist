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
  },
  {
    id: 'top-cap-hap-pneumonia',
    domainId: 'klinis',
    title: 'Pneumonia Komunitas (CAP) & Nosokomial (HAP/VAP): Stratifikasi CURB-65 & Antibiotik (PDPI / ATS-IDSA)',
    category: 'Infeksi & Respiratori',
    tags: ['Pneumonia', 'CAP', 'HAP', 'CURB-65', 'Makrolida', 'Beta-Laktam', 'Fluorokuinolon'],
    summary: 'Penatalaksanaan pneumonia berdasarkan tempat transmisi (komunitas vs rumah sakit) dan stratifikasi keparahan klinis CURB-65 untuk menentukan rawat jalan, rawat inap non-ICU, atau ICU.',
    keyPearls: [
      'Skor CURB-65: Confusion, Uremia (BUN > 19 mg/dL / Urea > 7 mmol/L), Respiratory rate >= 30x/menit, Blood pressure (SBP < 90 atau DBP <= 60 mmHg), Age >= 65 tahun.',
      'Interpretasi CURB-65: Skor 0-1 (Rawat Jalan / Outpatient); Skor 2 (Rawat Inap Bangsal); Skor >= 3 (Rawat Inap Intensif / ICU).',
      'CAP Rawat Jalan (Tanpa Komorbid): Amoksisilin oral dosis tinggi (3 x 1 g) ATAU Doksisiklin 2 x 100 mg ATAU Makrolida (Azitromisin 1 x 500 mg).',
      'CAP Rawat Jalan (Dengan Komorbid Kardio/DM/Paru): Kombinasi Beta-Laktam (Amoksisilin-Klavulanat / Sefuroksim) + Makrolida (Azitromisin) ATAU Monoterapi Fluorokuinolon Respirasi (Levofloksasin 750 mg / Moksifloksasin 400 mg).',
      'CAP Rawat Inap Non-ICU: Seftriakson 1 x 2 g IV + Azitromisin 1 x 500 mg IV/oral ATAU Levofloksasin IV.',
      'HAP/VAP (Onset >= 48 jam pasca-rawat): Risiko Pseudomonas aeruginosa & MRSA. Terapi empiris antipseudomonal: Piperasilin-Tazobaktam (PipTaz) / Meropenem / Seftazidim + Vankomisin / Linezolid (bila suspek MRSA).'
    ],
    frequentExamPitfalls: [
      'Siprofloksasin BUKAN fluorokuinolon respirasi (aktivitas terhadap Streptococcus pneumoniae sangat lemah). Pilih Levofloksasin atau Moksifloksasin untuk infeksi paru.',
      'Azitromisin dan Fluorokuinolon sama-sama dapat memperpanjang interval QT (risiko Torsades de Pointes), hindari polifarmasi dengan antiaritmia Kelas IA/III.'
    ],
    referenceStandard: 'Pedoman Diagnosis & Penatalaksanaan CAP PDPI & ATS/IDSA Guidelines'
  },
  {
    id: 'top-heart-failure-gdmt',
    domainId: 'klinis',
    title: 'Gagal Jantung dengan Penurunan Fraksi Ejeksi (HFrEF): 4 Pilar Terapi GDMT (PERKI / ESC)',
    category: 'Kardiovaskular',
    tags: ['Gagal Jantung', 'HFrEF', 'GDMT', 'ARNI', 'Sacubitril-Valsartan', 'Bisoprolol', 'Spironolakton', 'SGLT2i'],
    summary: 'Guideline-Directed Medical Therapy (GDMT) untuk HFrEF (LVEF <= 40%) mewajibkan inisiasi 4 pilar farmakoterapi penurun mortalitas sedini mungkin tanpa menunggu dosis maksimal masing-masing obat.',
    keyPearls: [
      'Pilar 1 - ARNI (Sacubitril/Valsartan) atau ACEI/ARB: Mengurangi mortalitas kardiovaskular. PENTING: Wajib masa henti (washout period) minimal 36 JAM saat transisi dari ACEI ke ARNI untuk mencegah Angioedema yang fatal.',
      'Pilar 2 - Beta Blocker Tertentu Terbukti Menurunkan Mortalitas: HANYA 3 jenis obat yang terbukti (Bisoprolol, Carvedilol, Metoprolol Suksinat). Jangan gunakan Atenolol atau Propranolol untuk gagal jantung kronis.',
      'Pilar 3 - Mineralocorticoid Receptor Antagonist (MRA): Spironolakton (12,5 - 50 mg) atau Eplerenon. Syarat inisiasi: Serum Kalium < 5.0 mEq/L dan eGFR > 30 mL/min.',
      'Pilar 4 - SGLT2 Inhibitor: Dapagliflozin 10 mg atau Empagliflozin 10 mg 1x sehari (efektif menurunkan mortalitas dan hospitalisasi gagal jantung BAIK PADA PASIEN DM MAUPUN NON-DM).',
      'Diuretik Loop (Furosemid): HANYA untuk meredakan gejala kongesti / retensi cairan (edema, ronki, JVP naik), TIDAK menurunkan mortalitas jangka panjang.'
    ],
    frequentExamPitfalls: [
      'Jangan pernah memulai atau menaikkan dosis Beta Blocker pada saat pasien mengalami dekompensasi akut / edema paru masif (tunggu kondisi euvolemik/kering).',
      'Kombinasi ARNI/ACEI + Spironolakton berisiko HIPERKALEMIA. Pantau ketat kalium serum dan kreatinin pada minggu ke-1, 4, dan tiap 3-6 bulan.'
    ],
    referenceStandard: 'Pedoman Tatalaksana Gagal Jantung PERKI & ESC Heart Failure Guidelines'
  },
  {
    id: 'top-hiv-opportunistic',
    domainId: 'klinis',
    title: 'Tata Laksana Terapi ARV HIV/AIDS & Pencegahan Infeksi Oportunistik (Kemenkes RI / WHO)',
    category: 'Infeksi Menular',
    tags: ['HIV', 'ARV', 'TLD', 'Dolutegravir', 'Tenofovir', 'Lamivudin', 'Kotrimoksazol', 'PCP'],
    summary: 'Regimen lini pertama ART di Indonesia menggunakan kombinasi dosis tetap FDC TLD (Tenofovir + Lamivudin + Dolutegravir). Diberikan prinsip Treat All (segera mulai tanpa menunggu nilai CD4).',
    keyPearls: [
      'Regimen Lini Pertama Utama (TLD): Tenofovir Disoproxil Fumarate (TDF) 300 mg + Lamivudin (3TC) 300 mg + Dolutegravir (DTG) 50 mg diminum 1x sehari malam hari.',
      'Koinfeksi TB-HIV dengan OAT Rifampisin: Rifampisin adalah inducer kuat enzim CYP3A4 dan UGT1A1 yang menurunkan kadar Dolutegravir secara signifikan. SOLUSI: Tambahkan dosis Dolutegravir 50 mg tambahan berjarak 12 jam (Dolutegravir 50 mg 2x sehari).',
      'Profilaksis Infeksi Oportunistik: Kotrimoksazol (TMP-SMX 960 mg 1x sehari) WAJIB diberikan pada semua pasien HIV stadium klinis 2, 3, 4 atau CD4 < 200 sel/uL untuk mencegah Pneumocystis jirovecii pneumonia (PCP) dan Toksoplasmosis serebral.',
      'Ibu Hamil HIV (+): Regimen TLD tetap aman dan direkomendasikan. Bayi baru lahir diberikan profilaksis Zidovudin sirup (atau kombinasi ZDV + NVP tergantung risiko pajanan) selama 6 minggu.',
      'Efek samping Khas Zidovudin (AZT): Anemia berat dan neutropenia (pantau Hb berkala). Tenofovir (TDF): Nefrotoksisitas (pantau Serum Kreatinin) dan penurunan densitas tulang.'
    ],
    frequentExamPitfalls: [
      'Pada koinfeksi TB-HIV: Mulai OAT terlebih dahulu. ART dimulai dalam waktu 2 hingga 8 minggu setelah OAT ditoleransi dengan baik untuk mencegah Immune Reconstitution Inflammatory Syndrome (IRIS).',
      'Efavirenz (EFV) diminum MALAM HARI sebelum tidur saat lambung kosong untuk meminimalkan efek samping SSP (mimpi buruk, pusing, halusinasi).'
    ],
    referenceStandard: 'Pedoman Nasional Pelayanan Kedokteran Tata Laksana HIV Kemenkes RI & WHO HIV Guidelines'
  },
  {
    id: 'top-chemo-supportive-oncology',
    domainId: 'klinis',
    title: 'Kemoterapi Kanker: Toksisitas Organ Spesifik & Protokol Antiemetika CINV (ASCO / NCCN)',
    category: 'Onkologi & Terapi Suportif',
    tags: ['Kemoterapi', 'CINV', 'Antiemetik', 'Ondansetron', 'Aprepitant', 'Doksorubisin', 'Sisplatin', 'Siklofosfamid'],
    summary: 'Penanganan komplikasi toksisitas sitotoksika spesifik dan tata laksana mual muntah akibat kemoterapi (Chemotherapy-Induced Nausea and Vomiting / CINV) berdasarkan potensi emetogenik obat.',
    keyPearls: [
      'Kemoterapi Emetogenik Tinggi (HEC - risiko mual muntah > 90%, misal: Sisplatin, Siklofosfamid dosis tinggi, Doksorubisin + Siklofosfamid / AC regimen): Wajib regimen 3 atau 4 obat: Antagonis NK1 (Aprepitant) + Antagonis 5-HT3 (Ondansetron/Granisetron) + Deksametason +/- Olanzapin.',
      'Toksisitas Khas Doksorubisin / Daunorubisin (Antrasiklin): KARDIOIKSIKOTAS dosis kumulatif (kardiomiopati dilatasi). Antidotum protektor kardiovaskular: Deksrazoksan.',
      'Toksisitas Khas Sisplatin: NEFROTOKSISITAS berat & Ototoksisitas. Protokol wajib: Hidrasi agresif pra dan pasca-kemoterapi dengan NaCl 0,9% 1-2 Liter + Manitol. Antidotum protektor: Amifostin.',
      'Toksisitas Khas Siklofosfamid & Ifosfamid: SISTITIS HEMORAGIK (perdarahan kandung kemih akibat metabolit Akrolein). Pencegahan WAJIB: MESNA (2-Mercaptoethane sulfonate Na) + hidrasi adekuat.',
      'Toksisitas Khas Bleomisin: TOKSISITAS PARU (Fibrosis pulmonal). Batasi dosis kumulatif total < 400 unit.',
      'Toksisitas Khas Vinkristin (Vinca Alkaloid): NEUROPATI PERIFER (kesemutan, mati rasa jari tangan/kaki, konstipasi/ileus paralitik). KONTRAINDIKASI MUTLAK: Injeksi intratekal (fatal mematikan, hanya boleh IV!).'
    ],
    frequentExamPitfalls: [
      'Vinkristin HANYA BOLEH diberikan secara INTRAVENA (IV). Pemberian Intratekal (ke dalam cairan serebrospinal) berakibat kematian 100% akibat ascending myeloradiculopathy.',
      'Metotreksat (MTX) dosis tinggi wajib disertai penyelamatan (Rescue Therapy) dengan LEUKOVORIN (Asam Folinat) untuk mencegah toksisitas fatal sumsum tulang.'
    ],
    referenceStandard: 'NCCN Clinical Practice Guidelines in Oncology: Antiemesis & PNPK Kanker Kemenkes RI'
  },
  {
    id: 'top-cpob-hvac-water',
    domainId: 'teknologi',
    title: 'Sistem Penunjang Kritis CPOB: HVAC, Diferensial Tekanan & Sistem Pengolahan Air (BPOM)',
    category: 'Teknologi & CPOB Industri',
    tags: ['CPOB', 'HVAC', 'Tekanan Udara', 'Airlock', 'WFI', 'Purified Water', 'Kelas Bersih'],
    summary: 'Sistem penunjang kritis industri farmasi: Pengendalian kontaminasi silang melalui tata udara (HVAC), kaskade tekanan ruang, serta spesifikasi mutu air farmasetik (PW, WFI).',
    keyPearls: [
      'Prinsip Pola Tekanan Udara Ruangan: Ruang bertekanan LEBIH TINGGI mencegah partikel dari luar masuk; Ruang bertekanan LEBIH RENDAH mencegah debu produk menyebar keluar.',
      'Produksi Sediaan Padat (Tablet/Kapsul) yang Berdebu: Ruang proses dibuat bertekanan LEBIH RENDAH (Negatif) terhadap koridor (Sink Airlock) untuk mencegah kontaminasi silang ke ruangan lain.',
      'Produksi Sediaan Steril (Injeksi/Aseptis): Ruang proses bersih Kelas A/B dibuat bertekanan LEBIH TINGGI (Positif minimal +10 hingga +15 Pascal) terhadap ruang sekitarnya (Cascade/Bubble Airlock) untuk mencegah mikroba masuk.',
      'Perbedaan Purified Water (PW) vs Water for Injection (WFI): PW digunakan untuk sediaan non-steril (konduktivitas <= 5,1 μS/cm pada 25°C, batas mikroba <= 100 CFU/mL). WFI digunakan untuk sediaan injeksi steril (konduktivitas <= 1,3 μS/cm, batas mikroba <= 10 CFU/100 mL, endotoksin bakteri < 0,25 EU/mL).',
      'Metode Pembuatan WFI Resmi: Destilasi bertingkat (Multi-effect water still) atau Reverse Osmosis (RO) dua tahap yang digabung dengan Elektrodeionisasi (EDI) dan Ultrafiltrasi.'
    ],
    frequentExamPitfalls: [
      'WFI disimpan dan disirkulasikan secara kontinu pada suhu TINGGI (suhu >= 70°C atau 80°C) dengan sistem perpipaan tertutup (looping system) tanpa sambungan mati (dead-leg) untuk mencegah pembentukan biofilm bakteri.'
    ],
    referenceStandard: 'Petunjuk Operasional Penerapan Pedoman CPOB BPOM RI Jilid I & II & Farmakope Indonesia VI'
  },
  {
    id: 'top-accounting-inventory-bep-rop',
    domainId: 'manajemen',
    title: 'Akuntansi Finansial Apotek & Pengendalian Persediaan Lanjutan (BEP, ROI, ROP & Safety Stock)',
    category: 'Manajemen & Finansial Apotek',
    tags: ['BEP', 'ROI', 'Payback Period', 'ROP', 'Safety Stock', 'Lead Time', 'EOQ'],
    summary: 'Kalkulasi kelayakan finansial apotek/instalasi farmasi dan pengendalian pengadaan obat untuk mencegah stock-out serta pemborosan modal kerja.',
    keyPearls: [
      'Break-Even Point (BEP): Titik impas di mana Total Pendapatan = Total Biaya (Laba = 0).',
      'Rumus BEP (Rupiah) = Biaya Tetap / [1 - (Biaya Variabel / Total Penjualan)]. Biaya Tetap (Fixed Cost): Gaji karyawan, sewa gedung, listrik, PBB. Biaya Variabel: HPP obat, kemasan.',
      'Return on Investment (ROI): Mengukur efisiensi pemanfaatan modal. ROI (%) = (Laba Bersih Setelah Pajak / Total Modal Investasi) × 100%.',
      'Payback Period (PP): Waktu yang dibutuhkan untuk mengembalikan modal investasi awal. PP = Total Nilai Investasi Awal / Arus Kas Bersih Tahunan.',
      'Safety Stock (SS): Cadangan pengaman untuk mengantisipasi keterlambatan kirim atau lonjakan resep. SS = Lead Time (waktu tunggu pengiriman) × Rata-rata Konsumsi Harian.',
      'Reorder Point (ROP): Titik pemesanan kembali ke PBF saat stok mencapai batas tertentu. ROP = (Lead Time × Rata-rata Konsumsi) + Safety Stock = 2 × Safety Stock (jika periode lead time simetris).'
    ],
    frequentExamPitfalls: [
      'Jika stok di apotek menyentuh angka ROP, pesanan ke PBF HARUS SEGERA DITERBITKAN hari itu juga, jangan menunggu sampai obat habis menyentuh angka nol.',
      'Margin Penjualan (%) = (Laba Kotor / Harga Jual) × 100%. Markup (%) = (Laba Kotor / Harga Beli/HPP) × 100%. Nilai Margin selalu LEBIH KECIL daripada nilai Markup.'
    ],
    referenceStandard: 'Standar Manajemen Pelayanan Kefarmasian Kemenkes RI & Modul Manajemen Farmasi AIPTLI'
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
  },
  {
    id: 'q-021',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria berusia 64 tahun didiagnosis gagal jantung fraksi ejeksi rendah (HFrEF, LVEF 32%, NYHA Kelas III). Pasien saat ini rutin meminum Ramipril 10 mg 1x sehari, Bisoprolol 5 mg 1x sehari, dan Spironolakton 25 mg 1x sehari. Dokter berencana mengganti Ramipril dengan Sakubitril/Valsartan (ARNI).',
    question: 'Instruksi krusial manakah yang wajib disampaikan apoteker mengenai jeda waktu (washout period) penghentian Ramipril sebelum memulai dosis pertama ARNI?',
    options: [
      { key: 'A', text: 'Dapat langsung diminum bersamaan pada hari yang sama' },
      { key: 'B', text: 'Harus ada jeda minimal 12 jam setelah dosis terakhir Ramipril' },
      { key: 'C', text: 'Harus ada jeda minimal 36 jam setelah dosis terakhir Ramipril' },
      { key: 'D', text: 'Harus ada jeda minimal 7 hari setelah dosis terakhir Ramipril' },
      { key: 'E', text: 'Tidak perlu jeda jika dosis Ramipril diturunkan bertahap' }
    ],
    correctAnswer: 'C',
    explanation: 'Saat melakukan peralihan dari golongan ACEI (Ramipril, Kaptopril, Lisinopril) ke ARNI (Sakubitril/Valsartan), WAJIB diberlakukan jeda waktu (washout period) MINIMAL 36 JAM setelah dosis ACEI terakhir. Hal ini bertujuan untuk mencegah risiko fatal ANGIOEDEMA berat akibat akumulasi bradikinin ganda.',
    clinicalReference: 'AHA/ACC/HFSA Heart Failure Guidelines & Konsensus PERKI Gagal Jantung',
    difficulty: 'Sedang'
  },
  {
    id: 'q-022',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria 58 tahun dengan STEMI akut baru saja menjalani Percutaneous Coronary Intervention (PCI) dengan pemasangan Drug-Eluting Stent (DES). Dokter meresepkan terapi antiplatelet ganda (DAPT) Aspirin 100 mg 1x sehari dan Klopidogrel 75 mg 1x sehari. Pasien diketahui memiliki polimorfisme genetik CYP2C19 *2/*2 (poor metabolizer).',
    question: 'Rekomendasi modifikasi terapi antiplatelet manakah yang paling tepat diajukan apoteker?',
    options: [
      { key: 'A', text: 'Mengganti Klopidogrel dengan Tikagrelor 90 mg 2x sehari atau Prasugrel 10 mg 1x sehari' },
      { key: 'B', text: 'Menaikkan dosis Klopidogrel menjadi 150 mg 1x sehari' },
      { key: 'C', text: 'Menghentikan Aspirin dan melanjutkan Klopidogrel tunggal' },
      { key: 'D', text: 'Menambahkan Warfarin 2 mg pada regimen terapi' },
      { key: 'E', text: 'Mengganti Klopidogrel dengan Cilostazol 100 mg 2x sehari' }
    ],
    correctAnswer: 'A',
    explanation: 'Klopidogrel adalah prodrug yang memerlukan bioaktivasi oleh enzim hepatik CYP2C19 menjadi metabolit aktifnya. Pasien dengan status Poor Metabolizer (alel *2/*2) memiliki kegagalan aktivasi Klopidogrel sehingga berisiko tinggi mengalami trombosis stent berulang. Pedoman CPIC merekomendasikan penggantian ke TIKAGRELOR atau PRASUGREL yang tidak bergantung pada bioaktivasi CYP2C19.',
    clinicalReference: 'CPIC Guideline for Clopidogrel and CYP2C19 & ESC/PERKI NSTEMI-STEMI Guidelines',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-023',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita 70 tahun dengan gagal jantung kongestif dan fibrilasi atrium rutin meminum Digoksin 0,25 mg 1x sehari dan Furosemid 40 mg 1x sehari. Pasien datang ke IGD mengeluh mual, muntah hebat, pandangan tampak kekuningan (xanthopsia), dan pusing berputar. Hasil lab: Kalium 2,8 mEq/L (hipokalemia), Digoksin serum 3,2 ng/mL (toksik > 2,0 ng/mL), EKG menunjukkan ventrikular takikardia.',
    question: 'Tindakan farmakologis spesifik manakah yang paling tepat sebagai antidotum lini pertama?',
    options: [
      { key: 'A', text: 'Pemberian Kalsium Glukonat 10% IV bolus' },
      { key: 'B', text: 'Pemberian Digoxin Immune Fab (Digibind) IV dan koreksi Kalium IV' },
      { key: 'C', text: 'Pemberian Atropin Sulfat 0,5 mg IV bolus cepat' },
      { key: 'D', text: 'Pemberian Natrium Bikarbonat 8,4% IV drip' },
      { key: 'E', text: 'Pemberian Furosemid dosis tinggi untuk mempercepat ekskresi' }
    ],
    correctAnswer: 'B',
    explanation: 'Toksisitas Digoksin sering dipicu oleh hipokalemia akibat diuretik loop (Furosemid). Antidotum definitif untuk intoksikasi Digoksin berat yang mengancam jiwa dengan aritmia ventrikel adalah DIGOXIN IMMUNE FAB (DIGIBIND) yang mengikat molekul digoksin bebas di sirkulasi, disertai koreksi kadar Kalium serum secara hati-hati.',
    clinicalReference: 'AHA Toxicological Emergencies & Clinical Pharmacokinetics of Digoxin',
    difficulty: 'Sedang'
  },
  {
    id: 'q-024',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria 24 tahun penderita Diabetes Mellitus Tipe 1 dibawa ke IGD dalam kondisi penurunan kesadaran dengan pernapasan Kussmaul (cepat dan dalam) serta bau nafas seperti aseton/buah. Hasil lab: GDS 480 mg/dL, pH darah 7,15, Bikarbonat (HCO3-) 10 mEq/L, Keton urin (+++), Kalium serum 4,2 mEq/L. Diagnosis: Ketoasidosis Diabetik (KAD).',
    question: 'Protokol penatalaksanaan awal cairan dan insulin manakah yang paling tepat sesuai standar PERKENI/ADA?',
    options: [
      { key: 'A', text: 'Insulin Glargin subkutan 30 Unit segera tanpa cairan infus' },
      { key: 'B', text: 'Rehidrasi cairan NaCl 0,9% IV 1000 mL pada jam pertama + Infus kontinu Insulin Reguler 0,1 Unit/kgBB/jam IV' },
      { key: 'C', text: 'Infus Dextrose 50% IV 2 flakon segera' },
      { key: 'D', text: 'Injeksi Insulin Aspart subkutan tiap 2 jam tanpa infus' },
      { key: 'E', text: 'Pemberian Natrium Bikarbonat bolus IV tanpa insulin' }
    ],
    correctAnswer: 'B',
    explanation: 'Penanganan pilar pertama KAD adalah REHIDRASI CAIRAN (NaCl 0,9% IV 1-1,5 Liter pada jam pertama) untuk memulihkan perfusi jaringan, dilanjutkan dengan INSULIN REGULER (Short-Acting) intravena kontinu 0,1 Unit/kgBB/jam setelah memastikan kalium >= 3,3 mEq/L. Target penurunan glukosa adalah 50-75 mg/dL per jam.',
    clinicalReference: 'Pedoman Penatalaksanaan Ketoasidosis Diabetik PERKENI & ADA Standards of Care',
    difficulty: 'Sedang'
  },
  {
    id: 'q-025',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita berusia 27 tahun yang sedang hamil trimester pertama (usia kehamilan 7 minggu) didiagnosis menderita Penyakit Graves (Hipertiroidisme aktif) dengan gejala tremor, takikardia, dan penurunan berat badan. Nilai FT4 tinggi dan TSH tersupresi.',
    question: 'Obat antitiroid pilihan pertama manakah yang paling aman direkomendasikan pada trimester pertama kehamilan?',
    options: [
      { key: 'A', text: 'Metimazol 10 mg 1x sehari' },
      { key: 'B', text: 'Propiltiourasil (PTU) 100 mg 3x sehari' },
      { key: 'C', text: 'Larutan Lugol (Kalium Iodida) 5 tetes 3x sehari' },
      { key: 'D', text: 'Radioaktif Iodium-131 terapi ablasio' },
      { key: 'E', text: 'Karbimazol 20 mg 1x sehari' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada TRIMESTER PERTAMA kehamilan (organogenesis), PROPILTIOURASIL (PTU) adalah obat antitiroid lini pertama pilihan utama karena memiliki ikatan protein lebih tinggi sehingga transfer plasenta lebih rendah dan risiko embriopati (aplasia cutis, atresia koana) jauh lebih rendah daripada Metimazol/Karbimazol. Memasuki trimester kedua dan ketiga, terapi dapat dipertimbangkan beralih ke Metimazol untuk menghindari risiko hepatotoksisitas berat PTU.',
    clinicalReference: 'American Thyroid Association (ATA) Guidelines on Thyroid Disease in Pregnancy & PERKENI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-026',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria berusia 54 tahun dirawat di bangsal rawat inap non-ICU dengan diagnosis Community-Acquired Pneumonia (CAP) derajat sedang. Pasien mengeluh demam tinggi, batuk produktif purulen, dan sesak nafas. Pasien tidak memiliki riwayat alergi obat.',
    question: 'Regimen terapi antibiotik empiris lini pertama manakah yang direkomendasikan oleh pedoman PDPI / IDSA?',
    options: [
      { key: 'A', text: 'Siprofloksasin 500 mg oral monoterapi' },
      { key: 'B', text: 'Seftriakson 2 g IV 1x sehari + Azitromisin 500 mg IV/oral 1x sehari' },
      { key: 'C', text: 'Gentamisin 80 mg IV 3x sehari monoterapi' },
      { key: 'D', text: 'Vankomisin 1 g IV 2x sehari + Meropenem 1 g IV 3x sehari' },
      { key: 'E', text: 'Kotrimoksazol 960 mg oral 2x sehari' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan pedoman PDPI dan IDSA/ATS, regimen antibiotik empiris standar untuk pasien CAP rawat inap non-ICU adalah kombinasi BETALAKTAM (Seftriakson 1-2 g IV atau Ampisilin/Sulbaktam) PLUS MAKROLIDA (Azitromisin/Klaritromisin) untuk mencakup bakteri tipikal (S. pneumoniae) dan atipikal (Mycoplasma/Legionella), ATAU monoterapi Fluoroquinolon Respirasi (Levofloksasin / Moksifloksasin).',
    clinicalReference: 'Pedoman Diagnosis & Penatalaksanaan Pneumonia Komunitas PDPI & IDSA/ATS CAP Guidelines',
    difficulty: 'Sedang'
  },
  {
    id: 'q-027',
    domainId: 'klinis',
    vignette: 'Seorang pasien laki-laki 32 tahun dibawa ke IGD dengan demam tinggi, nyeri kepala hebat, kaku kuduk positif, dan penurunan kesadaran. Hasil lumbal pungsi menunjukkan cairan serebrospinal keruh, leukosit polimorfonuklear meningkat tajam, glukosa CSF rendah. Diagnosis: Meningitis Bakterial Akut. Dokter merencanakan pemberian antibiotik empiris Seftriakson 2 g IV tiap 12 jam dan Vankomisin.',
    question: 'Terapi ajuvan manakah yang wajib diberikan 10-20 menit SEBELUM atau BERSAMAAN dengan dosis antibiotik pertama untuk mencegah komplikasi ketulian dan gejala sisa neurologis?',
    options: [
      { key: 'A', text: 'Deksametason 10 mg IV' },
      { key: 'B', text: 'Manitol 20% infus cepat' },
      { key: 'C', text: 'Furosemid 40 mg IV' },
      { key: 'D', text: 'Paracetamol 1000 mg infus' },
      { key: 'E', text: 'Fenitoin 100 mg IV' }
    ],
    correctAnswer: 'A',
    explanation: 'Pemberian DEKSAMETASON 10 mg IV (0,15 mg/kgBB) yang diberikan SEBELUM atau BERSAMAAN dengan dosis antibiotik pertama terbukti secara signifikan menurunkan respon inflamasi meningeal akibat lisis bakteri, menurunkan mortalitas, dan mencegah komplikasi tuli sensorineural serta sekuel neurologis permanen.',
    clinicalReference: 'IDSA Clinical Practice Guidelines for Bacterial Meningitis & ESCMID Guidelines',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-028',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria berusia 30 tahun yang baru terdiagnosis HIV stadium 2 dengan jumlah CD4 180 sel/uL akan memulai terapi Antiretroviral (ARV). Pasien juga mengalami infeksi oportunistik Tuberkulosis paru dan sedang menjalani terapi OAT 2RHZE yang mengandung Rifampisin.',
    question: 'Penyesuaian regimen ARV lini pertama berbasis Dolutegravir (TLD) manakah yang wajib dilakukan apoteker terkait interaksi dengan Rifampisin?',
    options: [
      { key: 'A', text: 'Menghentikan sementara OAT sampai ARV selesai' },
      { key: 'B', text: 'Menaikkan dosis Dolutegravir menjadi 50 mg DUA KALI SEHARI (bid) dengan jeda 12 jam dari OAT' },
      { key: 'C', text: 'Menurunkan dosis Rifampisin menjadi setengahnya' },
      { key: 'D', text: 'Mengganti Tenofovir dengan Zidovudin' },
      { key: 'E', text: 'Tidak perlu penyesuaian dosis karena tidak ada interaksi' }
    ],
    correctAnswer: 'B',
    explanation: 'Rifampisin adalah inducer kuat enzim CYP3A4 dan UGT1A1 yang menurunkan konsentrasi serum Dolutegravir secara drastis hingga 70%. Untuk mengatasi induksi ini, DOSIS DOLUTEGRAVIR WAJIB DITINGKATKAN MENJADI 50 MG 2X SEHARI (dua kali sehari dengan interval 12 jam) selama pasien mengonsumsi Rifampisin dan dilanjutkan hingga 2 minggu setelah OAT Rifampisin selesai.',
    clinicalReference: 'Pedoman Nasional Pelayanan Kedokteran Tata Laksana HIV Kemenkes RI & WHO HIV Guidelines',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-029',
    domainId: 'klinis',
    vignette: 'Seorang petani berusia 45 tahun dibawa ke IGD dalam kondisi pingsan setelah menyemprot tanaman padi tanpa APD. Tanda klinis: Miosis pupil pin-point, hipersalivasi, bronkospasme berat dengan ronki basah kasar, lakrimasi, bradikardia (HR 42 bpm), dan fasikulasi otot. Diagnosis: Keracunan Akut Insektisida Organofosfat.',
    question: 'Kombinasi regimen antidotum spesifik manakah yang wajib diberikan segera?',
    options: [
      { key: 'A', text: 'Nalokson 0,4 mg IV + Flumazenil 0,2 mg IV' },
      { key: 'B', text: 'Atropin Sulfat IV dititrasi hingga sekresi jalan napas kering + Pralidoksim (2-PAM) IV' },
      { key: 'C', text: 'N-Asetilsistein 150 mg/kgBB IV drip' },
      { key: 'D', text: 'Natrium Tiosulfat 25% IV + Natrium Nitrit' },
      { key: 'E', text: 'Piridoksin (Vitamin B6) 5 gram IV' }
    ],
    correctAnswer: 'B',
    explanation: 'Insektisida organofosfat menghambat enzim asetilkolinesterase secara ireversibel, memicu krisis kolinergik (SLUDGE). Terapi antidotum mencakup: 1) ATROPIN SULFAT IV (antagonis reseptor muskarinik) yang dititrasi berulang hingga tercapai target atropinisasi (sekresi bronkus kering, tidak bradikardia), dan 2) PRALIDOKSIM (2-PAM, reaktivator enzim kolinesterase) sebelum ikatan organofosfat-enzim mengalami penuaan (aging).',
    clinicalReference: 'Goldfrank’s Toxicologic Emergencies & Pedoman Keracunan Pestisida Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-030',
    domainId: 'klinis',
    vignette: 'Seorang pemuda 22 tahun dibawa ke IGD setelah mengonsumsi minuman keras oplosan 12 jam yang lalu. Pasien mengeluh pandangan kabur seperti melihat badai salju (snowstorm vision), nyeri perut hebat, dan nafas cepat. Analisis Gas Darah menunjukkan Asidosis Metabolik Anion Gap Tinggi yang berat dengan peningkatan asam format darah. Diagnosis: Keracunan Akut Metanol.',
    question: 'Terapi antidotum spesifik yang bekerja menghambat enzim Alkohol Dehidrogenase (ADH) manakah yang harus segera diberikan?',
    options: [
      { key: 'A', text: 'Fomepizol IV atau Etanol oral/IV' },
      { key: 'B', text: 'Dimerkaprol (BAL) intramuskular' },
      { key: 'C', text: 'Kalsium Glukonat IV bolus' },
      { key: 'D', text: 'Metilen Biru IV' },
      { key: 'E', text: 'D-Penisilamin oral' }
    ],
    correctAnswer: 'A',
    explanation: 'Metanol dimetabolisme oleh enzim Alkohol Dehidrogenase (ADH) menjadi formaldehida dan asam format yang sangat toksik terhadap saraf optik (kebutaan) dan memicu asidosis berat. FOMEPIZOL (atau ETANOL) bekerja sebagai inhibitor kompetitif enzim ADH dengan afinitas jauh lebih tinggi sehingga pembentukan metabolit toksik asam format dapat dicegah.',
    clinicalReference: 'American Academy of Clinical Toxicology Practice Guidelines on Toxic Alcohol Ingestion',
    difficulty: 'Sedang'
  },
  {
    id: 'q-031',
    domainId: 'klinis',
    vignette: 'Seorang pasien anak dengan leukemia limfoblastik akut sedang menjalani kemoterapi infus Vinkristin. Di tengah tetesan infus, terjadi ekstravasasi cairan obat keluar ke jaringan subkutan lengan pasien yang menimbulkan nyeri dan eritema lokal.',
    question: 'Prosedur penanganan non-farmakologis dan farmakologis manakah yang paling tepat untuk ekstravasasi golongan Vinka Alkaloid (Vinkristin)?',
    options: [
      { key: 'A', text: 'Kompres DINGIN + Injeksi Deksrazoksan' },
      { key: 'B', text: 'Kompres HANGAT + Injeksi Hialuronidase subkutan di sekitar area ekstravasasi' },
      { key: 'C', text: 'Kompres DINGIN + Aplikasi DMSO 99% topikal' },
      { key: 'D', text: 'Kompres ES + Injeksi Natrium Tiosulfat' },
      { key: 'E', text: 'Massase kuat pada area bengkak tanpa kompres' }
    ],
    correctAnswer: 'B',
    explanation: 'Ekstravasasi golongan Vinka Alkaloid (Vinkristin, Vinblastin, Vinorelbin) WAJIB ditangani dengan KOMPRES HANGAT (untuk vasodilatasi dan memfasilitasi penyerapan/dispersi obat) serta injeksi HIALURONIDASE subkutan untuk memecah asam hialuronat jaringan. Kompres dingin KONTRAINDIKASI karena memperparah ulserasi nekrosis jaringan pada vinka alkaloid.',
    clinicalReference: 'ESMO-EONS Clinical Practice Guidelines on Extravasation of Systemic Anticancer Therapy',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-032',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita 28 tahun dengan anemia defisiensi besi diresepkan tablet Ferro Sulfat 300 mg 3x sehari. Pasien mengeluhkan tinja berwarna kehitaman dan mual ringan. Apoteker memberikan edukasi cara konsumsi obat untuk memaksimalkan absorpsi besi di saluran cerna.',
    question: 'Edukasi konsumsi obat manakah yang paling tepat disampaikan apoteker?',
    options: [
      { key: 'A', text: 'Diminum bersama segelas susu sapi hangat' },
      { key: 'B', text: 'Diminum bersama segelas teh manis pekat' },
      { key: 'C', text: 'Diminum dalam keadaan perut kosong bersama jus jeruk / Vitamin C' },
      { key: 'D', text: 'Diminum bersamaan dengan antasida suspensi' },
      { key: 'E', text: 'Diminum bersama suplemen kalsium karbonat' }
    ],
    correctAnswer: 'C',
    explanation: 'Absorpsi zat besi (Fe2+ / ferro) paling optimal dalam suasana asam lambung dan ditingkatkan oleh VITAMIN C (Asam Askorbat) yang mereduksi Fe3+ menjadi Fe2+. Sebaliknya, Kalsium (susu), Tanin (teh), Fitat, dan Antasida mengkelat zat besi dan menurunkan absorpsinya secara signifikan. Feses berwarna hitam adalah efek samping normal dan tidak berbahaya.',
    clinicalReference: 'WHO Guideline on Iron Supplementation & British Society of Gastroenterology',
    difficulty: 'Mudah'
  },
  {
    id: 'q-033',
    domainId: 'klinis',
    vignette: 'Seorang pasien pria berusia 67 tahun dengan penyakit Parkinson telah mengonsumsi Levodopa/Karbidopa 100/25 mg 3x sehari selama 4 tahun. Pasien mengeluhkan tremor dan kekakuan otot mulai kambuh kembali 1 jam sebelum jadwal minum obat berikutnya (fenomena Wearing-Off / End-of-Dose Deterioration).',
    question: 'Strategi penambahan terapi kombinasi manakah yang paling tepat untuk memperpanjang waktu kerja Levodopa di perifer?',
    options: [
      { key: 'A', text: 'Menambahkan Entakapon (COMT Inhibitor) 200 mg bersama setiap dosis Levodopa' },
      { key: 'B', text: 'Mengganti Levodopa dengan Triheksifenidil dosis tinggi' },
      { key: 'C', text: 'Menambahkan Haloperidol 5 mg 1x sehari' },
      { key: 'D', text: 'Menghentikan Levodopa dan beralih ke Risperidon' },
      { key: 'E', text: 'Menurunkan frekuensi minum obat menjadi 2x sehari' }
    ],
    correctAnswer: 'A',
    explanation: 'Fenomena Wearing-Off terjadi karena penurunan durasi efikasi levodopa akibat degenerasi neuron dopaminergik lanjutan. Penambahan ENTAKAPON (Inhibitor Enzim Catechol-O-Methyltransferase / COMT) menghambat degradasi levodopa perifer menjadi 3-OMD sehingga memperpanjang waktu paruh eliminasi dan bioavailabilitas levodopa ke otak tanpa fluktuasi motorik.',
    clinicalReference: 'Movement Disorder Society (MDS) Evidence-Based Guidelines for Parkinson Disease',
    difficulty: 'Sedang'
  },
  {
    id: 'q-034',
    domainId: 'klinis',
    vignette: 'Seorang pasien laki-laki 34 tahun dengan Skizofrenia resisten pengobatan (telah gagal dengan Haloperidol dan Olanzapin) akan dimulai terapi antipsikotik atipikal Klozapin. Apoteker mengingatkan dokter mengenai protokol pemantauan laboratorium berkala terkait efek samping hematologi fatal.',
    question: 'Pemeriksaan laboratorium parameter hematologi spesifik manakah yang wajib dipantau rutin tiap minggu pada awal terapi Klozapin?',
    options: [
      { key: 'A', text: 'Hitung Absolut Neutrofil (Absolute Neutrophil Count / ANC) & Leukosit total' },
      { key: 'B', text: 'Kadar Trombosit dan D-Dimer' },
      { key: 'C', text: 'Kadar Serum Kreatinin dan Asam Urat' },
      { key: 'D', text: 'Kadar Enzim SGOT dan SGPT' },
      { key: 'E', text: 'Kadar Hemoglobin dan Hematokrit' }
    ],
    correctAnswer: 'A',
    explanation: 'Klozapin memiliki risiko efek samping langka namun mengancam jiwa berupa AGRANULOSITOSIS (penurunan drastis leukosit dan neutrofil). Protokol keselamatan mewajibkan pemantauan ABSOLUTE NEUTROPHIL COUNT (ANC) mingguan selama 6 bulan pertama. Jika ANC < 1000/uL, Klozapin harus segera dihentikan.',
    clinicalReference: 'FDA Clozapine Risk Evaluation and Mitigation Strategy (REMS) & PMK Pelayanan Jiwa',
    difficulty: 'Sedang'
  },
  {
    id: 'q-035',
    domainId: 'klinis',
    vignette: 'Seorang pasien kanker stadium lanjut menerima terapi paliatif Morfin Sulfat tablet lepas lambat (MST Continus) 30 mg 2x sehari untuk mengatasi nyeri kanker kronis. Apoteker melakukan peresepan pendamping profilaksis efek samping saluran cerna yang pasti terjadi pada pemakaian opioid jangka panjang.',
    question: 'Obat laksatif lini pertama manakah yang wajib diresepkan secara rutin bersamaan dengan inisiasi opioid?',
    options: [
      { key: 'A', text: 'Loperamid 2 mg' },
      { key: 'B', text: 'Laksatif Stimulan (Bisakodil atau Senna) + Laksatif Osmotik (Laktulosa)' },
      { key: 'C', text: 'Attapulgite 600 mg' },
      { key: 'D', text: 'Arang Aktif (Norit)' },
      { key: 'E', text: 'Oralit sachet' }
    ],
    correctAnswer: 'B',
    explanation: 'Konstipasi terinduksi opioid (Opioid-Induced Constipation / OIC) terjadi pada hampir semua pasien karena penurunan motilitas dan peristaltik usus. Berbeda dengan efek samping mual dan sedasi yang mengalami toleransi, KONSTIPASI TIDAK PERNAH MENGALAMI TOLERANSI. Oleh karena itu, profilaksis rutin dengan LAKSATIF STIMULAN (Bisakodil / Senna) wajib diberikan sejak hari pertama terapi opioid.',
    clinicalReference: 'ESMO Clinical Practice Guidelines for Management of Constipation in Advanced Cancer',
    difficulty: 'Mudah'
  },
  {
    id: 'q-036',
    domainId: 'manajemen',
    vignette: 'Apoteker di instalasi farmasi rumah sakit menghitung titik pemesanan kembali (Reorder Point / ROP) untuk Cefoperazone injeksi. Rata-rata penggunaan per hari (d) adalah 20 vial, waktu tunggu pengiriman PBF (Lead Time / LT) adalah 3 hari, dan persediaan pengaman (Safety Stock / SS) ditetapkan sebesar 40 vial.',
    question: 'Berapakah nilai Reorder Point (ROP) untuk obat tersebut?',
    options: [
      { key: 'A', text: '60 vial' },
      { key: 'B', text: '80 vial' },
      { key: 'C', text: '100 vial' },
      { key: 'D', text: '120 vial' },
      { key: 'E', text: '140 vial' }
    ],
    correctAnswer: 'C',
    explanation: 'Rumus ROP = (Penggunaan Harian × Lead Time) + Safety Stock = (20 vial/hari × 3 hari) + 40 vial = 60 vial + 40 vial = 100 vial. Jadi, apoteker harus membuat Surat Pesanan baru saat stok tersisa 100 vial.',
    clinicalReference: 'Petunjuk Teknis Standar Pelayanan Kefarmasian di Rumah Sakit Kemenkes RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-037',
    domainId: 'manajemen',
    vignette: 'Kebutuhan tahunan tablet Amoksisilin 500 mg di sebuah Apotek adalah 10.000 strip (D). Biaya setiap kali pemesanan adalah Rp 50.000 (S), dan biaya penyimpanan per strip per tahun adalah Rp 1.000 (H).',
    question: 'Berapakah jumlah pemesanan paling ekonomis (Economic Order Quantity / EOQ) setiap kali pesan?',
    options: [
      { key: 'A', text: '500 strip' },
      { key: 'B', text: '1.000 strip' },
      { key: 'C', text: '1.500 strip' },
      { key: 'D', text: '2.000 strip' },
      { key: 'E', text: '2.500 strip' }
    ],
    correctAnswer: 'B',
    explanation: 'Rumus EOQ = √[ (2 × D × S) / H ] = √[ (2 × 10.000 × 50.000) / 1.000 ] = √[ 1.000.000.000 / 1.000 ] = √1.000.000 = 1.000 strip.',
    clinicalReference: 'Manajemen Farmasi Apotek & Logistik Farmasi',
    difficulty: 'Mudah'
  },
  {
    id: 'q-038',
    domainId: 'manajemen',
    vignette: 'Instalasi Farmasi Rumah Sakit mengalami defisit anggaran obat sebesar 20%. Komite Farmasi dan Terapi (KFT) bersama Apoteker melakukan evaluasi perencanaan pengadaan menggunakan analisis matriks gabungan ABC-VEN.',
    question: 'Kelompok obat manakah yang menjadi PRIORITAS UTAMA UNTUK DIELIMINASI atau dikurangi alokasi anggarannya?',
    options: [
      { key: 'A', text: 'Kelompok VA (Vital - Nilai Investasi Tinggi)' },
      { key: 'B', text: 'Kelompok EA (Esensial - Nilai Investasi Tinggi)' },
      { key: 'C', text: 'Kelompok NA (Non-Esensial - Nilai Investasi Tinggi)' },
      { key: 'D', text: 'Kelompok VB (Vital - Nilai Investasi Sedang)' },
      { key: 'E', text: 'Kelompok VC (Vital - Nilai Investasi Rendah)' }
    ],
    correctAnswer: 'C',
    explanation: 'Pada matriks VEN-ABC: Kategori V (Vital) pantang dikurangi karena menyelamatkan nyawa. Kategori NA (Non-Esensial dengan serapan dana tinggi / Pareto A) adalah prioritas pertama yang harus dipangkas atau dieliminasi untuk efisiensi anggaran tanpa mengganggu keselamatan pasien.',
    clinicalReference: 'Pedoman Pengelolaan Obat Publik dan Perbekalan Kesehatan Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-039',
    domainId: 'manajemen',
    vignette: 'Apoteker membeli Cefixime sirup kering dari PBF dengan Harga Netto Apotek (HNA) Rp 30.000 per botol belum termasuk PPN 11%. PBF memberikan diskon reguler 10%. Apotek menetapkan margin keuntungan 20%.',
    question: 'Berapakah Harga Jual Apotek (HJA) per botol sirup Cefixime tersebut?',
    options: [
      { key: 'A', text: 'Rp 32.400' },
      { key: 'B', text: 'Rp 35.964' },
      { key: 'C', text: 'Rp 39.960' },
      { key: 'D', text: 'Rp 42.120' },
      { key: 'E', text: 'Rp 45.000' }
    ],
    correctAnswer: 'B',
    explanation: '1) HNA setelah diskon 10% = Rp 30.000 - (10% × Rp 30.000) = Rp 27.000. 2) Harga Beli termasuk PPN 11% = Rp 27.000 × 1,11 = Rp 29.970. 3) HJA dengan margin 20% = Rp 29.970 × 1,20 = Rp 35.964.',
    clinicalReference: 'Kalkulasi Farmasi Praktis & Akuntansi Apotek',
    difficulty: 'Sedang'
  },
  {
    id: 'q-040',
    domainId: 'manajemen',
    vignette: 'Sebuah apotek baru memiliki Biaya Tetap (Fixed Cost) operasional sebesar Rp 15.000.000 per bulan. Rata-rata margin laba kotor terhadap omzet adalah 25%.',
    question: 'Berapakah target omzet penjualan bulanan minimum yang harus dicapai apotek untuk mencapai Titik Impas (Break-Even Point / BEP)?',
    options: [
      { key: 'A', text: 'Rp 30.000.000' },
      { key: 'B', text: 'Rp 45.000.000' },
      { key: 'C', text: 'Rp 60.000.000' },
      { key: 'D', text: 'Rp 75.000.000' },
      { key: 'E', text: 'Rp 90.000.000' }
    ],
    correctAnswer: 'C',
    explanation: 'Rumus BEP Rupiah = Biaya Tetap / Margin Kontribusi % = Rp 15.000.000 / 0,25 = Rp 60.000.000 per bulan.',
    clinicalReference: 'Studi Kelayakan Apotek & Akuntansi Keuangan Apotek',
    difficulty: 'Mudah'
  },
  {
    id: 'q-041',
    domainId: 'manajemen',
    vignette: 'Dalam laporan tahunan, Harga Pokok Penjualan (HPP) apotek tercatat Rp 600.000.000 dengan nilai persediaan awal tahun Rp 60.000.000 dan persediaan akhir tahun Rp 40.000.000.',
    question: 'Berapakah nilai Turn Over Ratio (TOR / Perputaran Persediaan) apotek tersebut dalam satu tahun?',
    options: [
      { key: 'A', text: '6 kali / tahun' },
      { key: 'B', text: '8 kali / tahun' },
      { key: 'C', text: '10 kali / tahun' },
      { key: 'D', text: '12 kali / tahun' },
      { key: 'E', text: '15 kali / tahun' }
    ],
    correctAnswer: 'D',
    explanation: '1) Rerata Persediaan = (Persediaan Awal + Persediaan Akhir) / 2 = (Rp 60 jt + Rp 40 jt) / 2 = Rp 50 jt. 2) TOR = HPP / Rerata Persediaan = Rp 600 jt / Rp 50 jt = 12 kali per tahun.',
    clinicalReference: 'Analisis Finansial & Manajemen Rantai Pasok Apotek',
    difficulty: 'Mudah'
  },
  {
    id: 'q-042',
    domainId: 'manajemen',
    vignette: 'Apoteker Penanggung Jawab Apotek (APA) akan memesan obat Fentanyl Injeksi 0,05 mg/mL, Morfin Tablet 10 mg, dan Kodein Tablet 10 mg ke Pedagang Besar Farmasi (PBF) Kimia Farma.',
    question: 'Berapakah jumlah lembar Surat Pesanan (SP) Narkotika Formulir N-9 yang wajib dibuat oleh apoteker?',
    options: [
      { key: 'A', text: '1 lembar SP untuk semua item obat' },
      { key: 'B', text: '2 lembar SP' },
      { key: 'C', text: '3 lembar SP (masing-masing 1 jenis obat, dibuat rangkap 4)' },
      { key: 'D', text: '3 lembar SP (dibuat rangkap 2)' },
      { key: 'E', text: 'Cukup menggunakan SP Psikotropika biasa' }
    ],
    correctAnswer: 'C',
    explanation: 'Berdasarkan Permenkes No. 3 Tahun 2015 dan PerBPOM, Surat Pesanan NARKOTIKA (Formulir Khusus N-9) HANYA BOLEH MEMUAT SATU (1) JENIS SEDIAAN NARKOTIKA per lembar SP dan WAJIB dibuat dalam RANGKAP 4 (asli dan 3 copy). Karena ada 3 item obat narkotika, dibutuhkan 3 lembar SP N-9.',
    clinicalReference: 'Peraturan Menteri Kesehatan RI No. 3 Tahun 2015 tentang Peredaran Narkotika & Psikotropika',
    difficulty: 'Mudah'
  },
  {
    id: 'q-043',
    domainId: 'manajemen',
    vignette: 'Apoteker di Apotek menerima resep berulang (iter 2x) yang mengandung Tramadol Kapsul 50 mg. Pasien ingin menebus seluruh sisa resep sekaligus.',
    question: 'Bagaimanakah ketentuan regulasi PerBPOM mengenai pengulangan (iterasi) resep untuk Obat-Obat Tertentu (OOT) seperti Tramadol?',
    options: [
      { key: 'A', text: 'Boleh diulang sesuai permintaan dokter tanpa batasan' },
      { key: 'B', text: 'Resep yang mengandung OOT (Tramadol) TIDAK BOLEH DIBERIKAN TANDA ITER / DILARANG DIULANG' },
      { key: 'C', text: 'Boleh diulang maksimal 1 kali dengan persetujuan apoteker' },
      { key: 'D', text: 'Boleh diulang jika pasien membayar tunai' },
      { key: 'E', text: 'Boleh diulang hanya di apotek rumah sakit' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan Peraturan BPOM No. 10 Tahun 2019 tentang Pengelolaan Obat-Obat Tertentu (OOT: Tramadol, Triheksifenidil, Klorpromazin, Amitriptilin, Haloperidol, Dekstrometorfan), RESEP YANG MENGANDUNG OOT TIDAK BOLEH DILAYANI DENGAN SALINAN RESEP (COPY RESEP) ATAU DIBERIKAN TANDA ITERASI (PENGULANGAN). Penyerahan harus berdasarkan resep asli baru.',
    clinicalReference: 'Peraturan BPOM No. 10 Tahun 2019 tentang Pengelolaan Obat-Obat Tertentu',
    difficulty: 'Sedang'
  },
  {
    id: 'q-044',
    domainId: 'manajemen',
    vignette: 'Sebuah apotek memiliki resep-resep dari tahun 2018 yang menumpuk di lemari arsip. Apoteker berencana melakukan pemusnahan berkas resep yang telah melewati batas masa simpan wajib.',
    question: 'Berapa tahun masa simpan minimal berkas resep di apotek sebelum boleh dimusnahkan menurut peraturan perundang-undangan?',
    options: [
      { key: 'A', text: '1 tahun' },
      { key: 'B', text: '2 tahun' },
      { key: 'C', text: '3 tahun' },
      { key: 'D', text: '5 tahun' },
      { key: 'E', text: '10 tahun' }
    ],
    correctAnswer: 'D',
    explanation: 'Berdasarkan Permenkes No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek dan Permenkes No. 3 Tahun 2015, resep yang telah tersimpan di apotek selama MINIMAL 5 TAHUN dapat dimusnahkan oleh Apoteker Penanggung Jawab dengan membuat Berita Acara Pemusnahan Resep.',
    clinicalReference: 'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
    difficulty: 'Mudah'
  },
  {
    id: 'q-045',
    domainId: 'manajemen',
    vignette: 'Dalam studi farmakoekonomi, Terapi A (Standar) membutuhkan biaya Rp 12.000.000 dengan efektivitas penurunan tekanan darah tercapai pada 60% pasien (0,60). Terapi B (Baru) membutuhkan biaya Rp 18.000.000 dengan efektivitas tercapai pada 85% pasien (0,85).',
    question: 'Berapakah nilai Incremental Cost-Effectiveness Ratio (ICER) Terapi B dibandingkan Terapi A?',
    options: [
      { key: 'A', text: 'Rp 16.000.000 per penambahan outcome efektivitas' },
      { key: 'B', text: 'Rp 20.000.000 per penambahan outcome efektivitas' },
      { key: 'C', text: 'Rp 24.000.000 per penambahan outcome efektivitas' },
      { key: 'D', text: 'Rp 30.000.000 per penambahan outcome efektivitas' },
      { key: 'E', text: 'Rp 36.000.000 per penambahan outcome efektivitas' }
    ],
    correctAnswer: 'C',
    explanation: 'Rumus ICER = (Biaya B - Biaya A) / (Efektivitas B - Efektivitas A) = (Rp 18.000.000 - Rp 12.000.000) / (0,85 - 0,60) = Rp 6.000.000 / 0,25 = Rp 24.000.000 per penambahan satuan efektivitas.',
    clinicalReference: 'Pedoman Penerapan Kajian Farmakoekonomi Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-046',
    domainId: 'manajemen',
    vignette: 'Seorang pasien penderita kanker stadium lanjut menerima terapi suportif yang berhasil memperpanjang masa hidupnya selama 4 tahun dengan skor kualitas hidup (Utility Value) terukur sebesar 0,75.',
    question: 'Berapakah nilai Quality-Adjusted Life Years (QALY) yang diperoleh pasien dari terapi tersebut?',
    options: [
      { key: 'A', text: '2,0 QALY' },
      { key: 'B', text: '2,5 QALY' },
      { key: 'C', text: '3,0 QALY' },
      { key: 'D', text: '3,5 QALY' },
      { key: 'E', text: '4,0 QALY' }
    ],
    correctAnswer: 'C',
    explanation: 'Rumus QALY = Utility Value × Jumlah Tahun Hidup Tambahan = 0,75 × 4 tahun = 3,0 QALY.',
    clinicalReference: 'Cost-Utility Analysis & Pharmacoeconomics Principles',
    difficulty: 'Mudah'
  },
  {
    id: 'q-047',
    domainId: 'manajemen',
    vignette: 'Apoteker di Puskesmas sedang menyortir vaksin yang baru datang dari Dinas Kesehatan untuk disimpan ke dalam lemari pendingin imunisasi.',
    question: 'Di antara vaksin berikut, manakah vaksin yang tergolong FREEZE-SENSITIVE (SENSITIF BEKU) yang TIDAK BOLEH MEMBEKU dan harus disimpan pada suhu 2°C hingga 8°C (tidak boleh di freezer)?',
    options: [
      { key: 'A', text: 'Polio Oral (bOPV)' },
      { key: 'B', text: 'Campak / Measles-Rubella (MR)' },
      { key: 'C', text: 'BCG Vaksin' },
      { key: 'D', text: 'DTP-HB-Hib (Pentavalen) dan Vaksin Hepatitis B' },
      { key: 'E', text: 'Yellow Fever Vaksin' }
    ],
    correctAnswer: 'D',
    explanation: 'Vaksin DTP-HB-Hib, Hepatitis B, Td, DT, dan TT adalah VAKSIN SENSITIF BEKU (Freeze-sensitive) yang mengandung ajuvan aluminium. Jika membeku, ikatan ajuvan akan rusak membentuk gumpalan dan kehilangan potensi antigenik. Vaksin polio OPV, Campak/MR, dan BCG adalah vaksin sensitif panas (Heat-sensitive) yang stabil dibekukan.',
    clinicalReference: 'WHO Vaccine Management Guidelines & Petunjuk Teknis Cold Chain Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-048',
    domainId: 'manajemen',
    vignette: 'Seorang pasien datang ke Apotek ingin membeli kontrasepsi oral kombinasi (Pil KB) tanpa resep dokter. Pasien menyampaikan bahwa sebelumnya sudah pernah menggunakan pil tersebut atas resep dokter dan meminta 1 strip untuk siklus bulan ini.',
    question: 'Bagaimanakah tindakan apoteker yang sesuai dengan ketentuan DOWA 1?',
    options: [
      { key: 'A', text: 'Menolak dan mewajibkan resep dokter baru setiap bulan' },
      { key: 'B', text: 'Menyerahkan maksimal 1 siklus/strip dengan mencatat identitas dan memberikan edukasi kepatuhan' },
      { key: 'C', text: 'Menyerahkan 3 strip sekaligus untuk stok 3 bulan' },
      { key: 'D', text: 'Menyarankan suntik KB sendiri di rumah' },
      { key: 'E', text: 'Mengganti dengan obat suntik tanpa resep' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan Kepmenkes No. 347/MenKes/SK/VII/1990 tentang DOWA 1, Kontrasepsi Oral dapat diserahkan oleh Apoteker tanpa resep dokter dengan syarat: PASIEN TELAH PERNAH BEROBAT SEBELUMNYA DAN MEMPUNYAI KARTU/BUKTI PENGGUNAAN RESEP DOKTER, dengan jumlah maksimal PENYERAHAN 1 SIKLUS (STRIP).',
    clinicalReference: 'Keputusan Menteri Kesehatan RI tentang Obat Wajib Apotek (DOWA 1)',
    difficulty: 'Mudah'
  },
  {
    id: 'q-049',
    domainId: 'teknologi',
    vignette: 'Pada proses pencetakan tablet Paracetamol 500 mg pada mesin rotary tablet press, teramati bagian mahkota atas tablet terlepas dan terpisah dari badan utama tablet sesaat setelah keluar dari die (fenomena Capping).',
    question: 'Tindakan formulasi manakah yang paling tepat untuk mengatasi masalah Capping tersebut?',
    options: [
      { key: 'A', text: 'Menambahkan bahan pengikat (binder) seperti larutan PVP atau pasta amilum dan memperlambat kecepatan kompresi' },
      { key: 'B', text: 'Menambah bahan pelincir Magnesium Stearat hingga 10%' },
      { key: 'C', text: 'Mengeringkan granul hingga kadar air 0%' },
      { key: 'D', text: 'Meningkatkan tekanan kompresi cetak setinggi mungkin' },
      { key: 'E', text: 'Memperbesar ukuran punch die' }
    ],
    correctAnswer: 'A',
    explanation: 'Capping (terlepasnya mahkota atas tablet) disebabkan oleh: 1) Udara yang terjebak di dalam masa granul selama kompresi cepat, 2) Granul terlalu kering (< 1% MC), atau 3) Kurangnya daya ikat antar partikel. Solusinya adalah MENAMBAH BAHAN PENGIKAT (binder), menjaga kelembaban optimum granul (2-4%), serta menurunkan kecepatan putaran punch mesin.',
    clinicalReference: 'Pharmaceutical Dosage Forms: Tablets & Ansel’s Pharmaceutical Dosage Forms',
    difficulty: 'Sedang'
  },
  {
    id: 'q-050',
    domainId: 'teknologi',
    vignette: 'Dalam proses kompresi tablet Ibuprofen, massa tablet menempel kuat pada permukaan punch atas sehingga permukaan tablet menjadi bopeng dan tidak rata (fenomena Picking / Sticking).',
    question: 'Modifikasi eksipien manakah yang paling efektif mengatasi masalah tersebut?',
    options: [
      { key: 'A', text: 'Menambahkan bahan pelincir/lubrikan (Magnesium Stearat / Asam Stearat) dan memastikan granul cukup kering' },
      { key: 'B', text: 'Menambahkan bahan pengisi laktosa' },
      { key: 'C', text: 'Menyemprotkan air ke dalam hopper' },
      { key: 'D', text: 'Menurunkan suhu ruang produksi menjadi 15°C' },
      { key: 'E', text: 'Menambah konsentrasi pewarna larut air' }
    ],
    correctAnswer: 'A',
    explanation: 'Sticking/Picking terjadi karena gaya adhesi massa cetak ke permukaan punch logam lebih besar daripada gaya kohesi tablet, sering dipicu oleh kelembaban granul yang terlalu tinggi atau kurangnya lubrikan. Penambahan LUBRIKAN HIDROFOBIK (Magnesium Stearat 0,5 - 1%) dan pengeringan granul yang memadai adalah solusi utama.',
    clinicalReference: 'Modern Pharmaceutics: Tableting Technology & Excipient Compatibility',
    difficulty: 'Mudah'
  },
  {
    id: 'q-051',
    domainId: 'teknologi',
    vignette: 'Pengujian disolusi Tahap 1 (S1) dilakukan pada 6 tablet lepas cepat Furosemid 40 mg (Kriteria Q = 80% pada 30 menit). Hasil disolusi masing-masing tablet adalah: 86%, 88%, 82%, 84%, 81%, dan 83%.',
    question: 'Bagaimanakah kesimpulan status kelulusan uji disolusi Tahap 1 (S1) tersebut menurut Farmakope Indonesia Edisi VI?',
    options: [
      { key: 'A', text: 'LULUS Tahap S1 karena semua unit >= Q + 5% (>= 85%)' },
      { key: 'B', text: 'TIDAK LULUS Tahap S1 karena ada unit yang bernilai < 85% (Q + 5%), sehingga wajib dilanjutkan ke Tahap S2 dengan menambah 6 tablet lagi' },
      { key: 'C', text: 'TIDAK LULUS dan seluruh batch harus dimusnahkan' },
      { key: 'D', text: 'LULUS karena rerata > 80%' },
      { key: 'E', text: 'LULUS karena tidak ada unit < 75%' }
    ],
    correctAnswer: 'B',
    explanation: 'Syarat kelulusan Uji Disolusi Tahap S1 (6 unit) menurut Farmakope Indonesia VI dan USP adalah: TIAP UNIT HARUS >= Q + 5%. Jika Q = 80%, maka tiap unit minimal harus 85%. Karena ada 4 unit yang bernilai < 85% (82%, 84%, 81%, 83%), maka S1 TIDAK LULUS dan WAJIB DILANJUTKAN KE TAHAP S2 dengan menguji 6 tablet tambahan (total 12 tablet).',
    clinicalReference: 'Farmakope Indonesia Edisi VI (Lampiran <1231> Uji Disolusi) & USP Dissolution Standards',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-052',
    domainId: 'teknologi',
    vignette: 'Ruang bersih industri farmasi untuk pengisian aseptis larutan injeksi steril (Aseptic Filling) disyaratkan memenuhi klasifikasi Ruang Bersih Kelas A menurut CPOB 2024.',
    question: 'Berapakah batas maksimum jumlah partikel ukuran >= 0,5 μm per meter kubik udara pada Ruang Bersih Kelas A dalam kondisi operasional (in operation)?',
    options: [
      { key: 'A', text: '3.520 partikel / m³' },
      { key: 'B', text: '352.000 partikel / m³' },
      { key: 'C', text: '3.520.000 partikel / m³' },
      { key: 'D', text: '20 partikel / m³' },
      { key: 'E', text: 'Tidak ada batasan partikel' }
    ],
    correctAnswer: 'A',
    explanation: 'Menurut Pedoman CPOB 2024 / PIC/S GMP Annex 1: Pada Ruang Bersih KELAS A (zona kritis pengisian aseptis dengan Laminar Air Flow / LAF), batas maksimum partikel ukuran >= 0,5 μm adalah 3.520 PARTIKEL / m³ baik pada kondisi non-operasional (at rest) maupun kondisi operasional (in operation).',
    clinicalReference: 'Pedoman Cara Pembuatan Obat yang Baik (CPOB) BPOM RI & PIC/S GMP Annex 1',
    difficulty: 'Sedang'
  },
  {
    id: 'q-053',
    domainId: 'teknologi',
    vignette: 'Dalam fasilitas produksi industri farmasi, ruang penimbangan serbuk antibiotik penisilin dan ruang penanganan bahan aktif sitostatika memerlukan desain tekanan udara khusus.',
    question: 'Sistem tekanan udara manakah yang wajib diterapkan pada ruang penanganan bahan aktif berbahaya tersebut terhadap koridor di luarnya?',
    options: [
      { key: 'A', text: 'Tekanan udara POSITIF (lebih tinggi dari koridor)' },
      { key: 'B', text: 'Tekanan udara NEGATIF (lebih rendah dari koridor) untuk mencegah debu obat menyebar ke luar' },
      { key: 'C', text: 'Tekanan udara sama persis (0 Pascal)' },
      { key: 'D', text: 'Tanpa sistem ventilasi udara' },
      { key: 'E', text: 'Aliran udara turbulen tanpa filter HEPA' }
    ],
    correctAnswer: 'B',
    explanation: 'Untuk area penanganan bahan aktif berbahaya, berpotensi alergenik tinggi (Penisilin/Sefalosporin), atau sitotoksik/hormon, ruangan harus bertekanan NEGATIF terhadap ruang penyangga (airlock) dan koridor sekitarnya. Hal ini memastikan aliran udara selalu mengarah ke dalam ruangan penimbangan sehingga debu zat aktif berbahaya tidak mencemari lingkungan luar.',
    clinicalReference: 'Pedoman Teknis CPOB: Sistem Tata Udara (HVAC) Fasilitas Industri Farmasi',
    difficulty: 'Sedang'
  },
  {
    id: 'q-054',
    domainId: 'teknologi',
    vignette: 'Air untuk Injeksi (Water for Injection / WFI) adalah eksipien pelarut sediaan steril parenteral yang harus bebas pirogen dan memenuhi persyaratan Farmakope Indonesia.',
    question: 'Metode pengolahan air manakah yang merupakan STANDAR EMAS CPOB untuk memproduksi Water for Injection (WFI)?',
    options: [
      { key: 'A', text: 'Destilasi uap multi-efek (Multi-Effect Water Still) dari Purified Water' },
      { key: 'B', text: 'Filtrasi pasir silika biasa' },
      { key: 'C', text: 'Penambahan klorin aktif 5%' },
      { key: 'D', text: 'Pendidihan air kran sederhana selama 5 menit' },
      { key: 'E', text: 'Aerasi kontak udara bebas' }
    ],
    correctAnswer: 'A',
    explanation: 'Menurut Farmakope Indonesia VI dan CPOB, Water for Injection (WFI) diproduksi melalui proses DESTILASI UAP BERULANG (Multi-Effect Still / Vapor Compression Distillation) dari air murni (Purified Water). WFI disimpan dalam sistem loop sirkulasi panas kontinu pada suhu >= 80°C untuk mencegah proliferasi mikroba dan endotoksin (pirogen).',
    clinicalReference: 'Farmakope Indonesia Edisi VI & WHO Good Manufacturing Practices for Water for Pharmaceutical Use',
    difficulty: 'Sedang'
  },
  {
    id: 'q-055',
    domainId: 'teknologi',
    vignette: 'Industri farmasi di Indonesia melakukan Uji Stabilitas Dipercepat (Accelerated Stability Testing) untuk pendaftaran produk obat baru ke BPOM.',
    question: 'Kondisi suhu dan kelembaban relatif (RH) manakah yang dipersyaratkan untuk Uji Stabilitas Dipercepat di Indonesia (Zona Iklim IVb)?',
    options: [
      { key: 'A', text: '25°C ± 2°C / 60% RH ± 5% RH selama 12 bulan' },
      { key: 'B', text: '30°C ± 2°C / 65% RH ± 5% RH selama 6 bulan' },
      { key: 'C', text: '40°C ± 2°C / 75% RH ± 5% RH selama 6 bulan' },
      { key: 'D', text: '50°C ± 2°C / 85% RH ± 5% RH selama 3 bulan' },
      { key: 'E', text: '60°C ± 2°C / 90% RH ± 5% RH selama 1 bulan' }
    ],
    correctAnswer: 'C',
    explanation: 'Berdasarkan ASEAN Stability Guidelines dan PerBPOM, kondisi UJI STABILITAS DIPERCEPAT (Accelerated) untuk Zona IVb (Iklim Panas & Lembab Tinggi seperti Indonesia) adalah SUHU 40°C ± 2°C dengan KELEMBABAN 75% RH ± 5% RH selama MINIMAL 6 BULAN (titik pengujian bulan ke-0, 1, 2, 3, dan 6).',
    clinicalReference: 'ASEAN Guideline on Stability Study of Drug Product & Peraturan BPOM RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-056',
    domainId: 'teknologi',
    vignette: 'Dalam sistem klasifikasi biofarmasetika (Biopharmaceutics Classification System / BCS), molekul Diltiazem tergolong ke dalam BCS Kelas I.',
    question: 'Apakah karakteristik kelarutan dalam air dan permeabilitas membran biologis dari obat BCS Kelas I?',
    options: [
      { key: 'A', text: 'Kelarutan Tinggi, Permeabilitas Tinggi' },
      { key: 'B', text: 'Kelarutan Rendah, Permeabilitas Tinggi' },
      { key: 'C', text: 'Kelarutan Tinggi, Permeabilitas Rendah' },
      { key: 'D', text: 'Kelarutan Rendah, Permeabilitas Rendah' },
      { key: 'E', text: 'Tidak dapat diprediksi secara in vitro' }
    ],
    correctAnswer: 'A',
    explanation: 'BCS membagi zat aktif ke dalam 4 kelas: Kelas I (Kelarutan Tinggi, Permeabilitas Tinggi), Kelas II (Kelarutan Rendah, Permeabilitas Tinggi), Kelas III (Kelarutan Tinggi, Permeabilitas Rendah), dan Kelas IV (Kelarutan Rendah, Permeabilitas Rendah). Obat BCS Kelas I memenuhi syarat untuk biowaiver uji disolusi terbanding.',
    clinicalReference: 'FDA BCS Guidance for Industry & Farmakope Indonesia VI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-057',
    domainId: 'teknologi',
    vignette: 'Seorang formulator membuat emulsi minyak ikan tipe O/W (Minyak dalam Air) dengan nilai HLB butuh 12. Surfaktan yang tersedia adalah Tween 80 (HLB = 15,0) dan Span 80 (HLB = 4,3). Total surfaktan yang dibutuhkan adalah 10 gram.',
    question: 'Berapakah jumlah Tween 80 dan Span 80 yang harus ditimbang?',
    options: [
      { key: 'A', text: 'Tween 80 = 7,2 gram ; Span 80 = 2,8 gram' },
      { key: 'B', text: 'Tween 80 = 5,0 gram ; Span 80 = 5,0 gram' },
      { key: 'C', text: 'Tween 80 = 2,8 gram ; Span 80 = 7,2 gram' },
      { key: 'D', text: 'Tween 80 = 8,5 gram ; Span 80 = 1,5 gram' },
      { key: 'E', text: 'Tween 80 = 6,0 gram ; Span 80 = 4,0 gram' }
    ],
    correctAnswer: 'A',
    explanation: 'Gunakan aligasi HLB: Bagian Tween 80 = |12 - 4,3| = 7,7 bagian. Bagian Span 80 = |15,0 - 12| = 3,0 bagian. Total bagian = 7,7 + 3,0 = 10,7 bagian. Berat Tween 80 = (7,7 / 10,7) × 10 g = 7,20 gram. Berat Span 80 = (3,0 / 10,7) × 10 g = 2,80 gram.',
    clinicalReference: 'Teknologi Sediaan Emulsi & Teori Nilai HLB Martin',
    difficulty: 'Sedang'
  },
  {
    id: 'q-058',
    domainId: 'teknologi',
    vignette: 'Dalam pembuatan tablet orodispersibel (Orally Disintegrating Tablet / ODT), formulator memerlukan bahan penghancur super (superdisintegrant) yang mampu menghancurkan tablet di rongga mulut dalam waktu kurang dari 30 detik tanpa air.',
    question: 'Eksipien manakah yang termasuk golongan Superdisintegrant?',
    options: [
      { key: 'A', text: 'Kroskarmelosa Natrium (Crosslinked Na-CMC) / Sodium Starch Glycolate' },
      { key: 'B', text: 'Magnesium Stearat' },
      { key: 'C', text: 'Laktosa Anhidrat' },
      { key: 'D', text: 'Talcum Venetum' },
      { key: 'E', text: 'Etil Selulosa' }
    ],
    correctAnswer: 'A',
    explanation: 'Superdisintegrant seperti KROSKARMELOSA NATRIUM (Ac-Di-Sol), SODIUM STARCH GLYCOLATE (Explotab), dan KROSPOLIVIDON (Polyplasdone XL) bekerja melalui mekanisme penyerapan air yang sangat cepat disertai pengembangan volume (swelling) masif dan wicking sehingga tablet pecah seketika dalam hitungan detik.',
    clinicalReference: 'Handbook of Pharmaceutical Excipients (Rowe) & Fast Dissolving Tablet Tech',
    difficulty: 'Sedang'
  },
  {
    id: 'q-059',
    domainId: 'bahan_alam',
    vignette: 'Sebuah produk obat tradisional di Indonesia mencantumkan klaim "Secara klinis terbukti menurunkan tekanan darah sistolik rata-rata 15 mmHg". Kemasan produk memiliki logo lingkaran hijau dengan gambar KRISTAL ES / SALJU HIJAU di dalamnya.',
    question: 'Termasuk dalam golongan obat bahan alam manakah produk tersebut?',
    options: [
      { key: 'A', text: 'Jamu Empiris' },
      { key: 'B', text: 'Obat Herbal Terstandar (OHT)' },
      { key: 'C', text: 'Fitofarmaka' },
      { key: 'D', text: 'Obat Kuasi' },
      { key: 'E', text: 'Suplemen Makanan Impor' }
    ],
    correctAnswer: 'C',
    explanation: 'Logo KRISTAL ES/SALJU berwarna hijau adalah logo resmi FITOFARMAKA. Fitofarmaka adalah obat bahan alam yang telah dibuktikan KEAMANAN DAN KHASIATNYA MELALUI UJI KLINIS PADA MANUSIA (Fase I-III) serta bahan baku simplisia dan ekstraknya telah terstandarisasi.',
    clinicalReference: 'Peraturan BPOM RI tentang Kriteria dan Tata Laksana Registrasi Obat Bahan Alam',
    difficulty: 'Mudah'
  },
  {
    id: 'q-060',
    domainId: 'bahan_alam',
    vignette: 'Apoteker di laboratorium litbang mengekstraksi senyawa alkaloid termolabil dari daun Tapak Dara (Catharanthus roseus). Senyawa aktif mudah terdegradasi pada pemanasan di atas 45°C.',
    question: 'Metode ekstraksi dingin manakah yang paling tepat dipilih?',
    options: [
      { key: 'A', text: 'Sokletasi dengan pelarut mendidih' },
      { key: 'B', text: 'Refluks panas kontinu' },
      { key: 'C', text: 'Perkolasi atau Maserasi pada suhu kamar' },
      { key: 'D', text: 'Dekoksi 90°C selama 30 menit' },
      { key: 'E', text: 'Infusa 90°C selama 15 menit' }
    ],
    correctAnswer: 'C',
    explanation: 'Untuk senyawa aktif yang termolabil (rusak oleh panas), metode ekstraksi yang wajib digunakan adalah METODE EKSTRAKSI DINGIN yaitu MASERASI (perendaman) atau PERKOLASI (aliran pelarut perlahan) pada suhu kamar (25°C). Sokletasi, refluks, infusa, dan dekokta menggunakan pemanasan tinggi yang merusak senyawa termolabil.',
    clinicalReference: 'Farmakope Herbal Indonesia & Parameter Standar Umum Ekstrak Tumbuhan Obat',
    difficulty: 'Mudah'
  },
  {
    id: 'q-061',
    domainId: 'bahan_alam',
    vignette: 'Dalam standardisasi ekstrak etanol daun Meniran (Phyllanthus niruri), dilakukan penetapan kadar senyawa marker aktif yang bertanggung jawab atas aktivitas imunomodulatornya.',
    question: 'Senyawa marker spesifik manakah yang ditetapkan kadarnya pada ekstrak Meniran?',
    options: [
      { key: 'A', text: 'Filantin dan Hipofilantin' },
      { key: 'B', text: 'Andrografolid' },
      { key: 'C', text: 'Kuersetin' },
      { key: 'D', text: 'Sinensetin' },
      { key: 'E', text: 'Kurkuminoid' }
    ],
    correctAnswer: 'A',
    explanation: 'Berdasarkan Farmakope Herbal Indonesia Edisi II, senyawa penanda (marker compound) spesifik untuk herba Meniran (Phyllanthus niruri) adalah golongan lignan yaitu FILANTIN dan HIPOFILANTIN yang memiliki khasiat imunomodulator (meningkatkan fagositosis makrofag).',
    clinicalReference: 'Farmakope Herbal Indonesia Edisi II Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-062',
    domainId: 'bahan_alam',
    vignette: 'Industri obat tradisional melakukan isolasi minyak atsiri dari bunga Cengkeh (Syzygium aromaticum). Minyak atsiri diketahui memiliki titik didih tinggi dan tidak larut dalam air, namun mudah menguap bersama uap air mendidih.',
    question: 'Metode pemisahan manakah yang menjadi standar baku untuk isolasi minyak atsiri tersebut?',
    options: [
      { key: 'A', text: 'Destilasi Uap-Air (Steam-Water Distillation)' },
      { key: 'B', text: 'Maserasi dengan etil asetat' },
      { key: 'C', text: 'Sokletasi dengan n-heksana' },
      { key: 'D', text: 'Kristalisasi bertingkat' },
      { key: 'E', text: 'Kromatografi kolom basah' }
    ],
    correctAnswer: 'A',
    explanation: 'Minyak atsiri (Volatile Oils) diisolasi menggunakan metode DESTILASI UAP ATAU DESTILASI AIR (metode Stahl). Tekanan parsial uap air menurunkan titik didih campuran minyak atsiri sehingga minyak menguap di bawah titik didih aslinya dan terkondensasi di buret penampung pemisah air.',
    clinicalReference: 'Farmakope Herbal Indonesia Edisi II: Penetapan Kadar Minyak Atsiri',
    difficulty: 'Mudah'
  },
  {
    id: 'q-063',
    domainId: 'bahan_alam',
    vignette: 'Pada pengujian mutu ekstrak rimpang Temulawak (Curcuma xanthorrhiza), dilakukan uji penetapan kadar abu tidak larut asam menggunakan instrumen tanur dan asam klorida encer.',
    question: 'Informasi mutu spesifik apakah yang diperoleh dari pengujian kadar abu tidak larut asam tersebut?',
    options: [
      { key: 'A', text: 'Tingkat cemaran silikat/pasir anorganik dari tanah' },
      { key: 'B', text: 'Kadar senyawa fenolik total' },
      { key: 'C', text: 'Jumlah minyak atsiri yang menguap' },
      { key: 'D', text: 'Tingkat keasaman pH simplisia' },
      { key: 'E', text: 'Kadar air residual ekstrak' }
    ],
    correctAnswer: 'A',
    explanation: 'KADAR ABU TIDAK LARUT ASAM mengukur jumlah mineral silikat atau pasir yang berasal dari tanah atau debu yang tidak larut dalam asam klorida encer. Parameter ini mencerminkan kebersihan proses pencucian dan pemanenan rimpang dari kontaminasi tanah.',
    clinicalReference: 'Parameter Standar Umum Ekstrak Tumbuhan Obat BPOM RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-064',
    domainId: 'bahan_alam',
    vignette: 'Hasil uji cemaran mikotoksin pada simplisia biji pala dan kacang menunjukkan adanya metabolit sekunder berbahaya yang dihasilkan oleh jamur Aspergillus flavus yang berpotensi karsinogenik pada hati.',
    question: 'Mikotoksin spesifik manakah yang dimaksud dengan batas maksimal regulasi BPOM sebesar <= 20 μg/kg?',
    options: [
      { key: 'A', text: 'Aflatoksin Total (B1, B2, G1, G2)' },
      { key: 'B', text: 'Okratoksin A' },
      { key: 'C', text: 'Patulin' },
      { key: 'D', text: 'Zearalenon' },
      { key: 'E', text: 'Fumonisin' }
    ],
    correctAnswer: 'A',
    explanation: 'AFLATOKSIN (terutama Aflatoksin B1 yang diproduksi Aspergillus flavus dan A. parasiticus) adalah mikotoksin hepatokarsinogenik paling berbahaya pada simplisia nabati. Peraturan BPOM membatasi cemaran Aflatoksin Total maksimal 20 μg/kg (ppb) dan Aflatoksin B1 maksimal 5 μg/kg.',
    clinicalReference: 'Peraturan BPOM RI tentang Batas Maksimum Cemaran Mikroba dan Kimia dalam Obat Tradisional',
    difficulty: 'Sedang'
  },
  {
    id: 'q-065',
    domainId: 'bahan_alam',
    vignette: 'Dalam pembuatan jamu serbuk instan, produsen dilarang keras menambahkan bahan kimia obat (BKO). BPOM melakukan sidak pengujian BKO pada jamu pegal linu.',
    question: 'Bahan Kimia Obat (BKO) analgesik antiinflamasi manakah yang paling sering disalahgunakan dalam jamu pegal linu ilegal?',
    options: [
      { key: 'A', text: 'Fenilbutazon, Deksametason, dan Paracetamol' },
      { key: 'B', text: 'Amoksisilin dan Seftriakson' },
      { key: 'C', text: 'Metformin dan Glimepirid' },
      { key: 'D', text: 'Sildenafil dan Tadalafil' },
      { key: 'E', text: 'Siproheptadin dan Klorfeniramin' }
    ],
    correctAnswer: 'A',
    explanation: 'BKO yang paling sering ditemukan secara ilegal pada jamu pegal linu/rematik adalah FENILBUTAZON, DEKSAMETASON, PREDNISON, PIROKSIKAM, dan PARACETAMOL. Penambahan BKO ini sangat berbahaya karena memicu tukak lambung berdarah, perforasi saluran cerna, dan Sindrom Cushing (moon face).',
    clinicalReference: 'Public Warning / Peringatan BPOM RI tentang Obat Tradisional Mengandung Bahan Kimia Obat (BKO)',
    difficulty: 'Mudah'
  },
  {
    id: 'q-066',
    domainId: 'klinis',
    vignette: 'Seorang pasien laki-laki berusia 58 tahun dengan gagal jantung fraksi ejeksi rendah (HFrEF, LVEF 32%) telah rutin mengonsumsi Ramipril 10 mg 1x sehari dan Bisoprolol 5 mg 1x sehari. Dokter spesialis jantung berencana mengganti Ramipril dengan golongan ARNI (Sacubitril/Valsartan 49/51 mg bid) untuk mengoptimalkan terapi GDMT.',
    question: 'Instruksi krusial apakah yang wajib disampaikan apoteker kepada dokter dan pasien mengenai jadwal peralihan dari Ramipril ke Sacubitril/Valsartan?',
    options: [
      { key: 'A', text: 'Wajib memberikan masa henti (washout period) minimal 36 jam setelah dosis terakhir Ramipril sebelum memulai Sacubitril/Valsartan' },
      { key: 'B', text: 'Sacubitril/Valsartan dapat langsung diminum bersamaan dengan Ramipril pada hari pertama peralihan' },
      { key: 'C', text: 'Dosis Ramipril harus dinaikkan dua kali lipat selama 3 hari sebelum dihentikan' },
      { key: 'D', text: 'Sacubitril/Valsartan diminum 12 jam setelah dosis terakhir Ramipril' },
      { key: 'E', text: 'Hanya perlu menghentikan Bisoprolol selama 36 jam tanpa perlu menghentikan Ramipril' }
    ],
    correctAnswer: 'A',
    explanation: 'Ketika mengalihkan pasien dari golongan ACEI (seperti Ramipril, Captopril, Lisinopril) ke golongan ARNI (Sacubitril/Valsartan), WAJIB diberlakukan jeda waktu penghentian (WASHOUT PERIOD) MINIMAL 36 JAM setelah dosis terakhir ACEI. Hal ini karena penghambatan simultan enzim Neprilysin (oleh Sacubitril) dan enzim ACE (oleh Ramipril) menyebabkan akumulasi masif bradikinin yang meningkatkan risiko terjadinya ANGIOEDEMA yang berpotensi fatal dan mengancam jalan napas. Jika beralih dari ARB ke ARNI, washout period 36 jam tidak diwajibkan.',
    clinicalReference: 'Pedoman Tatalaksana Gagal Jantung PERKI & 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-067',
    domainId: 'klinis',
    vignette: 'Seorang wanita berusia 68 tahun dibawa ke IGD dengan keluhan demam tinggi, batuk berdahak purulen kecokelatan, dan sesak napas berat sejak 2 hari lalu. Pemeriksaan fisik dan laboratorium menunjukkan: Pasien mengalami disorientasi (bingung), Frekuensi Napas (RR) 32x/menit, Tekanan Darah 85/50 mmHg, Blood Urea Nitrogen (BUN) 26 mg/dL. Foto rontgen toraks mengonfirmasi infiltrat lobaris pada paru kanan.',
    question: 'Berapakah skor stratifikasi keparahan CURB-65 pada pasien tersebut dan di manakah lokasi perawatan yang paling tepat direkomendasikan?',
    options: [
      { key: 'A', text: 'Skor 4 - Rawat inap intensif (ICU)' },
      { key: 'B', text: 'Skor 1 - Rawat jalan dengan Amoksisilin oral' },
      { key: 'C', text: 'Skor 2 - Rawat jalan dengan Azitromisin oral' },
      { key: 'D', text: 'Skor 2 - Rawat inap di bangsal umum non-ICU' },
      { key: 'E', text: 'Skor 0 - Observasi IGD 6 jam lalu dipulangkan' }
    ],
    correctAnswer: 'A',
    explanation: 'Skor CURB-65 dihitung berdasarkan 5 parameter kriteria (masing-masing 1 poin):\\n1. C (Confusion/Disorientasi mental): Ya (+1)\\n2. U (Uremia/BUN > 19 mg/dL): 26 mg/dL -> Ya (+1)\\n3. R (Respiratory rate >= 30x/menit): 32x/menit -> Ya (+1)\\n4. B (Blood pressure: SBP < 90 atau DBP <= 60 mmHg): 85/50 mmHg -> Ya (+1)\\n5. 65 (Usia >= 65 tahun): 68 tahun -> Ya (+1)\\nTotal skor pasien adalah 5 (atau minimal 4 poin). Berdasarkan pedoman ATS/IDSA dan PDPI, pasien dengan skor CURB-65 >= 3 tergolong pneumonia berat dengan mortalitas tinggi dan WAJIB DIRAWAT DI RUANG INTENSIF (ICU) dengan antibiotik parenteral kombinasi Beta-Laktam IV (Seftriakson/Ampisilin-Sulbaktam) + Makrolida IV (Azitromisin) atau Fluorokuinolon respirasi IV.',
    clinicalReference: 'Pedoman Diagnosis dan Penatalaksanaan Pneumonia Komunitas (CAP) PDPI & ATS/IDSA Guidelines',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-068',
    domainId: 'klinis',
    vignette: 'Seorang pasien laki-laki berusia 34 tahun dengan infeksi HIV stadium klinis 2 telah menjalani terapi ARV lini pertama kombinasi TLD (Tenofovir 300 mg + Lamivudin 300 mg + Dolutegravir 50 mg FDC 1x sehari malam). Tiga bulan kemudian, pasien terdiagnosis Tuberkulosis Paru BTA (+) dan dokter hendak meresepkan OAT Kategori 1 FDC (Rifampisin, Isoniazid, Pirazinamid, Etambutol).',
    question: 'Rekomendasi penyesuaian dosis apakah yang wajib diajukan apoteker terkait interaksi antara Rifampisin dan Dolutegravir?',
    options: [
      { key: 'A', text: 'Tambahkan Dolutegravir tunggal 50 mg berjarak 12 jam (sehingga Dolutegravir diminum 50 mg 2x sehari)' },
      { key: 'B', text: 'Hentikan Dolutegravir dan ganti dengan Efavirenz tanpa penyesuaian dosis' },
      { key: 'C', text: 'Turunkan dosis Dolutegravir menjadi 25 mg karena Rifampisin menghambat eliminasi obat' },
      { key: 'D', text: 'Ganti Rifampisin dengan Streptomisin suntik agar tidak memengaruhi ARV' },
      { key: 'E', text: 'Tidak diperlukan penyesuaian dosis karena TLD adalah kombinasi dosis tetap yang stabil' }
    ],
    correctAnswer: 'A',
    explanation: 'Rifampisin adalah INDUCER KUAT enzim sitokrom CYP3A4 dan enzim glukuronidasi UGT1A1 di hati, yang menurunkan konsentrasi plasma Dolutegravir hingga sekitar 54-75%. Untuk mengatasi interaksi ini dan mencegah kegagalan virologis atau resistensi HIV, pedoman Kemenkes RI dan WHO merekomendasikan penambahan dosis Dolutegravir tunggal 50 mg yang diminum berjarak 12 jam dari dosis kombinasi TLD (yaitu menjadi DOLUTEGRAVIR 50 MG DUA KALI SEHARI). Dosis ganda ini dilanjutkan hingga 2 minggu setelah terapi Rifampisin selesai.',
    clinicalReference: 'Petunjuk Teknis Tata Laksana Klinis Ko-infeksi TB-HIV Kemenkes RI & WHO Consolidated Guidelines on HIV',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-069',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita berusia 45 tahun penderita Limfoma Non-Hodgkin menjalani kemoterapi siklus pertama dengan protokol CHOP yang mengandung Siklofosfamid dosis tinggi (750 mg/m2 IV). Apoteker di unit pencampuran sitostatika menyiapkan obat protektif untuk mencegah toksisitas metabolit Akrolein pada saluran kemih.',
    question: 'Agen kemoprotektif spesifik manakah yang wajib diberikan bersamaan dengan Siklofosfamid untuk mencegah terjadinya sistitis hemoragik?',
    options: [
      { key: 'A', text: 'MESNA (2-Mercaptoethane sulfonate sodium)' },
      { key: 'B', text: 'Deksrazoksan' },
      { key: 'C', text: 'Leukovorin (Asam Folinat)' },
      { key: 'D', text: 'Amifostin' },
      { key: 'E', text: 'N-Asetilsistein' }
    ],
    correctAnswer: 'A',
    explanation: 'Siklofosfamid dan Ifosfamid dimetabolisme menghasilkan metabolit toksik bernama AKROLEIN (Acrolein) yang diekskresikan melalui urin dan mengiritasi uroepitel mukosa kandung kemih, menyebabkan SISTITIS HEMORAGIK (perdarahan kandung kemih akut). MESNA (Natrium 2-merkaptoetanasulfonat) mengikat akrolein di saluran kemih membentuk senyawa tioeter nontoksik yang larut air. Deksrazoksan adalah kardioprotektor untuk doksorubisin; Leukovorin adalah penyelamat metotreksat; Amifostin adalah nefroprotektor sisplatin.',
    clinicalReference: 'ASCO Guidelines on Chemoprotective Agents & Pedoman Sitostatika Farmasi Kemenkes RI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-070',
    domainId: 'klinis',
    vignette: 'Seorang pria berusia 52 tahun dengan kanker paru karsinoma bukan sel kecil (NSCLC) dijadwalkan menjalani kemoterapi berbasis Sisplatin dosis 75 mg/m2 IV. Diketahui Sisplatin tergolong obat sitotoksik dengan potensi emetogenik tinggi (High Emetic Risk / HEC > 90%).',
    question: 'Kombinasi regimen profilaksis antiemetik manakah yang direkomendasikan panduan klinis internasional (ASCO / MASCC / NCCN) untuk mencegah CINV akut dan lambat pada pasien tersebut?',
    options: [
      { key: 'A', text: 'Antagonis Neurokinin-1 (Aprepitant) + Antagonis 5-HT3 (Ondansetron) + Deksametason' },
      { key: 'B', text: 'Metoklopramid oral monoterapi dosis 10 mg' },
      { key: 'C', text: 'Domperidon tablet + Antasida suspensi' },
      { key: 'D', text: 'Dimenhidrinat oral + Vitamin B6' },
      { key: 'E', text: 'Ondansetron intravena monoterapi tanpa kortikosteroid' }
    ],
    correctAnswer: 'A',
    explanation: 'Untuk kemoterapi berisiko emetogenik tinggi (High Emetogenic Chemotherapy / HEC, risiko mual muntah > 90%) seperti Sisplatin dosis tinggi, pedoman ASCO/NCCN mewajibkan regimen 3 atau 4 obat: 1) Antagonis Reseptor NK-1 (misal Aprepitant atau Fosaprepitant), 2) Antagonis Reseptor 5-HT3 (misal Ondansetron, Granisetron, atau Palonosetron), 3) Deksametason, dan dapat ditambahkan Olanzapin. Monoterapi Ondansetron atau Metoklopramid tidak adekuat untuk regimen HEC.',
    clinicalReference: 'Antiemetics: ASCO Guideline Update & NCCN Clinical Practice Guidelines in Oncology: Antiemesis',
    difficulty: 'Sedang'
  },
  {
    id: 'q-071',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita berusia 60 tahun dirawat di ICU dengan Syok Septik akibat urosepsis. Pasien telah menerima resusitasi cairan kristaloid isotonis (NaCl 0,9%) sebanyak 30 mL/kgBB dalam 3 jam pertama, namun tekanan darah masih 75/45 mmHg (Mean Arterial Pressure / MAP < 65 mmHg) dan kadar laktat serum 4,2 mmol/L.',
    question: 'Vasopresor lini pertama pilihan utama manakah yang direkomendasikan pedoman Surviving Sepsis Campaign (SSC) untuk menaikkan MAP mencapai target >= 65 mmHg?',
    options: [
      { key: 'A', text: 'Norepinefrin intravena titrasi infus kontinu' },
      { key: 'B', text: 'Dopamin intravena dosis rendah' },
      { key: 'C', text: 'Efedrin bolus intravena' },
      { key: 'D', text: 'Fenilefrin oral tablet' },
      { key: 'E', text: 'Dobutamin monoterapi' }
    ],
    correctAnswer: 'A',
    explanation: 'Berdasarkan pedoman Surviving Sepsis Campaign (SSC), NOREPINEFRIN adalah vasopresor lini pertama pilihan utama pada syok septik untuk mencapai target Mean Arterial Pressure (MAP) >= 65 mmHg. Norepinefrin memiliki efek agonis alfa-1 adrenergik yang sangat kuat (vasokonstriksi perifer kuat) dengan efek beta-1 sedang, terbukti memiliki efikasi lebih unggul dan risiko aritmia/kematian yang jauh lebih rendah dibandingkan Dopamin.',
    clinicalReference: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock',
    difficulty: 'Sedang'
  },
  {
    id: 'q-072',
    domainId: 'klinis',
    vignette: 'Seorang pria berusia 71 tahun penderita fibrilasi atrium non-valvular yang rutin mengonsumsi antikoagulan oral langsung (DOAC) Dabigatran eteksilat 150 mg 2x sehari, dilarikan ke ruang bedah darurat karena mengalami perdarahan masif intrakranial akibat kecelakaan lalu lintas.',
    question: 'Reversal agent (antidotum spesifik) manakah yang bekerja cepat mengikat Dabigatran dengan afinitas 350x lebih kuat daripada trombin untuk menghentikan perdarahan?',
    options: [
      { key: 'A', text: 'Idarucizumab (Praxbind)' },
      { key: 'B', text: 'Andexanet alfa' },
      { key: 'C', text: 'Protamin Sulfat' },
      { key: 'D', text: 'Fitomenadion (Vitamin K1)' },
      { key: 'E', text: 'Asam Traneksamat oral' }
    ],
    correctAnswer: 'A',
    explanation: 'IDARUCIZUMAB adalah fragmen antibodi monoklonal terhumanisasi (Fab) spesifik yang dirancang khusus untuk membalikkan (reversal) efek antikoagulan DABIGATRAN secara cepat dan sempurna dalam hitungan menit pada kasus perdarahan mayor darurat. Sebaliknya, ANDEXANET ALFA adalah reversal agent untuk penghambat faktor Xa (Rivaroxaban, Apixaban); PROTAMIN SULFAT adalah antidotum Heparin/LMWH; dan VITAMIN K1 adalah antidotum Warfarin.',
    clinicalReference: 'ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants',
    difficulty: 'Sedang'
  },
  {
    id: 'q-073',
    domainId: 'klinis',
    vignette: 'Seorang pria berusia 48 tahun datang ke apotek dengan keluhan nyeri hebat, bengkak, kemerahan, dan rasa panas pada sendi pangkal ibu jari kaki kanan (podagra) yang muncul tiba-tiba tadi malam setelah menghadiri jamuan makan seafood. Pasien belum pernah mengonsumsi obat asam urat sebelumnya dan meminta Apoteker memberikan Alopurinol 300 mg untuk segera menurunkan asam uratnya.',
    question: 'Bagaimanakah respons dan rekomendasi apoteker yang paling tepat mengenai inisiasi Alopurinol pada saat serangan gout akut?',
    options: [
      { key: 'A', text: 'Menjelaskan bahwa Alopurinol tidak boleh dimulai saat serangan akut memuncak karena fluktuasi asam urat dapat memperparah dan memperpanjang radang sendi; sarankan Kolkisin atau NSAID terlebih dahulu' },
      { key: 'B', text: 'Menyetujui permintaan pasien dan memberikan Alopurinol 300 mg dosis ganda untuk mempercepat penyembuhan' },
      { key: 'C', text: 'Memberikan kombinasi Alopurinol dan Probenesid tanpa obat antiinflamasi' },
      { key: 'D', text: 'Memberikan Paracetamol dosis 500 mg sebagai terapi tunggal penurun asam urat' },
      { key: 'E', text: 'Menyarankan kompres air hangat tanpa memerlukan obat analgesik' }
    ],
    correctAnswer: 'A',
    explanation: 'Pada serangan Gout Artritis Akut, terapi utama bertujuan meredakan inflamasi sendi secepatnya menggunakan KOLKISIN, NSAID (seperti Natrium Diklofenak / Ibuprofen), atau Kortikosteroid oral/intraartikular. Pemberian obat penurun asam urat (Urate-Lowering Therapy / ULT) seperti ALOPURINOL TIDAK BOLEH BARU DIMULAI saat serangan akut sedang terjadi, karena penurunan drastis asam urat serum akan memicu mobilisasi dan disolusi parsial kristal monosodium urat (MSU) dari tofus yang justru memperparah dan memperpanjang episode inflamasi akut.',
    clinicalReference: 'Pedoman Diagnosis dan Pengelolaan Artritis Gout IRA & 2020 American College of Rheumatology Guideline for Gout',
    difficulty: 'Sedang'
  },
  {
    id: 'q-074',
    domainId: 'manajemen',
    vignette: 'Apoteker penanggung jawab apotek (APA) sedang melakukan evaluasi laporan keuangan triwulan. Data menunjukkan Biaya Tetap (Fixed Cost) apotek per bulan sebesar Rp 15.000.000. Rata-rata total omzet penjualan per bulan adalah Rp 50.000.000 dengan Biaya Variabel (HPP obat dan kemasan) sebesar Rp 35.000.000 per bulan.',
    question: 'Berapakah target omzet penjualan minimal per bulan (Break-Even Point / BEP Rupiah) agar apotek berada pada titik impas (tidak rugi dan tidak untung)?',
    options: [
      { key: 'A', text: 'Rp 50.000.000' },
      { key: 'B', text: 'Rp 35.000.000' },
      { key: 'C', text: 'Rp 25.000.000' },
      { key: 'D', text: 'Rp 15.000.000' },
      { key: 'E', text: 'Rp 70.000.000' }
    ],
    correctAnswer: 'A',
    explanation: 'Rumus BEP (Rupiah) = Biaya Tetap / [1 - (Biaya Variabel / Total Penjualan)].\\n1. Rasio Biaya Variabel = Rp 35.000.000 / Rp 50.000.000 = 0,70 (70%)\\n2. Margin Kontribusi = 1 - 0,70 = 0,30 (30%)\\n3. BEP (Rupiah) = Rp 15.000.000 / 0,30 = Rp 50.000.000.\\nArtinya, apotek harus mencapai penjualan minimal Rp 50.000.000 per bulan agar seluruh biaya tetap dan biaya variabel tertutupi tanpa menderita kerugian finansial.',
    clinicalReference: 'Modul Manajemen Farmasi & Kewirausahaan AIPTLI & Standar Pelayanan Kefarmasian di Apotek',
    difficulty: 'Sedang'
  },
  {
    id: 'q-075',
    domainId: 'manajemen',
    vignette: 'Apotek rawat jalan melayani resep Amoksisilin 500 mg dengan rata-rata konsumsi sebanyak 30 strip per hari. Waktu tunggu (lead time) pengiriman barang dari PBF rekanan membutuhkan waktu 3 hari kerja. Apoteker menetapkan jumlah stok pengaman (safety stock) sebanyak 60 strip untuk mengantisipasi keterlambatan kirim.',
    question: 'Pada saat sisa stok di apotek menyentuh angka berapakah (Reorder Point / ROP) apoteker harus segera menerbitkan Surat Pesanan (SP) baru ke PBF?',
    options: [
      { key: 'A', text: '150 strip' },
      { key: 'B', text: '90 strip' },
      { key: 'C', text: '60 strip' },
      { key: 'D', text: '180 strip' },
      { key: 'E', text: '120 strip' }
    ],
    correctAnswer: 'A',
    explanation: 'Rumus Reorder Point (ROP) = (Lead Time × Pemakaian Rata-rata) + Safety Stock.\\n1. Penggunaan selama Lead Time (Lead Time Stock) = 3 hari × 30 strip/hari = 90 strip.\\n2. Safety Stock (Stok Pengaman) = 60 strip.\\n3. ROP = 90 strip + 60 strip = 150 strip.\\nJadi, saat sisa stok Amoksisilin di lemari mencapai 150 strip, apoteker harus langsung melakukan pemesanan ulang ke PBF agar barang tiba tepat saat stok pengaman belum terpakai.',
    clinicalReference: 'Pedoman Pengelolaan Obat dan Alat Kesehatan di Fasilitas Pelayanan Kefarmasian Kemenkes RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-076',
    domainId: 'manajemen',
    vignette: 'Apoteker di apotek komunitas menyusun Surat Pesanan (SP) untuk pengadaan obat influenza yang mengandung zat aktif Pseudoefedrin HCl 30 mg dan Triprolidin HCl 2,5 mg ke Pedagang Besar Farmasi (PBF).',
    question: 'Berdasarkan regulasi Permenkes RI terkait tata kelola dan penyaluran Prekursor Farmasi, bagaimanakah ketentuan pembuatan format Surat Pesanan (SP) yang sah?',
    options: [
      { key: 'A', text: 'Surat Pesanan harus dibuat terpisah khusus Prekursor Farmasi, ditandatangani Apoteker (SIPA), dan minimal dibuat dalam rangkap 2 (dua)' },
      { key: 'B', text: 'Boleh digabung dalam satu lembar SP dengan obat bebas dan suplemen makanan asalkan rangkap 1' },
      { key: 'C', text: 'Wajib menggunakan SP Narkotika rangkap 4 dengan persetujuan Dinkes Kabupaten/Kota' },
      { key: 'D', text: 'Hanya boleh ditandatangani oleh Tenaga Teknis Kefarmasian (TTK) tanpa nomor SIPA' },
      { key: 'E', text: 'Tidak memerlukan SP resmi, cukup memesan melalui pesan singkat WhatsApp tanpa arsip faktur' }
    ],
    correctAnswer: 'A',
    explanation: 'Berdasarkan Permenkes No. 5 Tahun 2023 tentang Narkotika, Psikotropika, dan Prekursor Farmasi (serta Permenkes 3/2015), pemesanan obat yang mengandung PREKURSOR FARMASI (seperti Pseudoefedrin, Efedrin, Norefedrin) WAJIB menggunakan Surat Pesanan (SP) KHUSUS PREKURSOR yang terpisah dari komoditas obat lainnya, dicantumkan nama distributor PBF tujuan, ditandatangani langsung oleh Apoteker Penanggung Jawab (APJ) dengan mencantumkan nomor SIPA/stempel apotek, serta dibuat sekurang-kurangnya dalam RANGKAP 2 (dua): 1 lembar asli untuk PBF dan 1 lembar salinan sebagai arsip apotek.',
    clinicalReference: 'Permenkes RI No. 5 Tahun 2023 tentang Narkotika, Psikotropika, dan Prekursor Farmasi',
    difficulty: 'Mudah'
  },
  {
    id: 'q-077',
    domainId: 'teknologi',
    vignette: 'Pada fasilitas industri manufaktur sediaan padat (solid oral dosage form), debu serbuk zat aktif beterbangan saat proses penimbangan dan pencampuran awal. Apoteker bagian teknik HVAC mengatur perbedaan tekanan udara antar ruangan.',
    question: 'Prinsip tata udara (HVAC) dan pola diferensial tekanan manakah yang tepat diterapkan pada ruang penimbangan berdebu tersebut terhadap koridor di sekitarnya?',
    options: [
      { key: 'A', text: 'Tekanan ruang penimbangan dibuat LEBIH RENDAH (Negatif) terhadap koridor (Sink Airlock) untuk menahan debu agar tidak mencemari koridor' },
      { key: 'B', text: 'Tekanan ruang penimbangan dibuat LEBIH TINGGI (Positif) terhadap koridor (Bubble Airlock) agar udara dari ruang timbang menyembur ke koridor' },
      { key: 'C', text: 'Tekanan udara ruang penimbangan dan koridor dibuat sama persis (0 Pascal) tanpa sirkulasi' },
      { key: 'D', text: 'Aliran udara diatur tanpa filter HEPA untuk membiarkan partikel tersirkulasi bebas' },
      { key: 'E', text: 'Pintu ruang penimbangan harus selalu dibuka selama proses penimbangan berlangsung' }
    ],
    correctAnswer: 'A',
    explanation: 'Berdasarkan Petunjuk Operasional Penerapan Pedoman CPOB BPOM RI, untuk area pengolahan sediaan yang menimbulkan banyak partikel debu (seperti ruang timbang serbuk, ruang granulasi, dan ruang cetak tablet), tekanan udara di dalam ruangan HARUS DIBUAT LEBIH RENDAH (TEKANAN NEGATIF) dibandingkan tekanan di koridor sekitarnya (konsep Sink Airlock / palung tekanan). Hal ini bertujuan agar aliran udara mengalir dari koridor bersih MASUK ke dalam ruang timbang, sehingga debu zat aktif terkungkung dan tidak mengontaminasi silang produk lain di koridor.',
    clinicalReference: 'Petunjuk Operasional Penerapan Pedoman CPOB BPOM RI: Sistem Tata Udara (HVAC)',
    difficulty: 'Sedang'
  },
  {
    id: 'q-078',
    domainId: 'teknologi',
    vignette: 'Sebuah industri farmasi memproduksi sediaan injeksi antibiotik sefalosporin steril. Air untuk Injeksi (Water for Injection / WFI) dialirkan melalui sistem perpipaan distribusi baja tahan karat (SS 316L) berputar tertutup (looping system) menuju titik-titik pengguna (points of use).',
    question: 'Berapakah suhu sirkulasi panas kontinu yang wajib dipertahankan pada sistem distribusi WFI tersebut untuk mencegah pertumbuhan mikroorganisme dan pembentukan biofilm bakteri?',
    options: [
      { key: 'A', text: 'Suhu sirkulasi konstan >= 70°C hingga 80°C' },
      { key: 'B', text: 'Suhu ruang terkendali 20°C - 25°C' },
      { key: 'C', text: 'Suhu dingin 2°C - 8°C tanpa pemanasan' },
      { key: 'D', text: 'Suhu beku di bawah 0°C' },
      { key: 'E', text: 'Suhu fluktuatif antara 15°C hingga 35°C' }
    ],
    correctAnswer: 'A',
    explanation: 'CPOB dan Farmakope Indonesia VI menetapkan bahwa Air untuk Injeksi (WFI) yang disimpan dalam tangki penampung dan didistribusikan melalui sistem sirkulasi kontinu (looping system) harus dijaga pada SUHU TINGGI (SELF-SANITIZING TEMPERATURE) YAITU MINIMAL >= 70°C HINGGA 80°C secara terus-menerus 24 jam dengan kecepatan aliran turbulen. Suhu tinggi ini mencegah bakteri menempel pada dinding pipa dan mencegah pembentukan biofilm serta pelepasan endotoksin bakteri (pirogen).',
    clinicalReference: 'Pedoman CPOB BPOM RI Jilid I: Sistem Pengolahan Air Farmasi (Water Systems) & Farmakope Indonesia VI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-079',
    domainId: 'teknologi',
    vignette: 'Dalam proses pencetakan tablet vitamin C pada mesin rotary tablet press berkecepatan tinggi, apoteker supervisor QC menemukan adanya pemisahan sebagian atau seluruh mahkota permukaan atas tablet dari badan tablet saat keluar dari die punch.',
    question: 'Apakah nama kerusakan fisik tablet tersebut dan langkah formulasi manakah yang dapat mengatasi masalah tersebut?',
    options: [
      { key: 'A', text: 'Capping; solusinya meningkatkan konsentrasi zat pengikat atau mengurangi udara terjebak dengan memperlambat kecepatan kompresi' },
      { key: 'B', text: 'Mottling; solusinya mengganti bahan pengisi dengan laktosa anhidrat' },
      { key: 'C', text: 'Sticking; solusinya menambahkan konsentrasi pewarna larut air' },
      { key: 'D', text: 'Lamination; solusinya meningkatkan kadar pelincir talkum hingga 10%' },
      { key: 'E', text: 'Chipping; solusinya meningkatkan kelembapan ruangan hingga 90%' }
    ],
    correctAnswer: 'A',
    explanation: 'CAPPING adalah cacat fisik tablet di mana bagian mahkota atas atau bawah tablet terpisah atau terlepas dari badan tablet utama. Capping terutama disebabkan oleh: 1) Udara yang terjebak di dalam massa granul saat kompresi cepat, 2) Kurangnya zat pengikat (binder) atau granul terlalu kering, 3) Kelebihan lubrikan hidrofobik (Magnesium Stearat). Solusinya adalah: meningkatkan konsentrasi bahan pengikat (misal PVP/Povidon, Musilago amili), menurunkan kecepatan mesin punch agar udara sempat keluar, dan menjaga kelembapan optimum granul (LOD 1-3%).',
    clinicalReference: 'Lachman’s Theory and Practice of Industrial Pharmacy & Farmakope Indonesia VI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-080',
    domainId: 'bahan_alam',
    vignette: 'Dalam pengujian mutu ekstrak terstandarisasi daun jambu biji (Psidium guajava) di laboratorium QC industri obat tradisional, dilakukan pengujian parameter non-spesifik berupa pemijaran abu dengan penambahan asam klorida encer (HCl) untuk mendapatkan kadar abu yang tidak larut asam.',
    question: 'Apakah interpretasi utama dari penetapan parameter kadar abu yang tidak larut asam tersebut?',
    options: [
      { key: 'A', text: 'Menggambarkan tingkat pengotoran mineral anorganik atau silikat seperti tanah, debu, dan pasir yang tertinggal akibat proses pencucian simplisia yang tidak sempurna' },
      { key: 'B', text: 'Mengukur kadar air bebas yang terkandung di dalam ekstrak kental' },
      { key: 'C', text: 'Mengukur kandungan total flavonoid kuersetin di dalam ekstrak' },
      { key: 'D', text: 'Menentukan sisa pelarut etanol hasil proses maserasi' },
      { key: 'E', text: 'Menguji efektivitas daya antibakteri ekstrak terhadap Escherichia coli' }
    ],
    correctAnswer: 'A',
    explanation: 'Pada standardisasi parameter non-spesifik simplisia dan ekstrak bahan alam berdasarkan Farmakope Herbal Indonesia, penetapan KADAR ABU TIDAK LARUT ASAM bertujuan untuk mengevaluasi jumlah silikat atau senyawa mineral anorganik yang tidak dapat dicerna oleh asam klorida. Mineral ini berasal dari kontaminasi tanah, pasir, debu jalanan, atau batuan silika yang menempel pada tanaman obat dan mengindikasikan TINGKAT KEBERSIHAN PROSES PENCUCIAN simplisia sebelum diekstraksi.',
    clinicalReference: 'Farmakope Herbal Indonesia Edisi II & Monografi Ekstrak Tumbuhan Obat BPOM RI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-081',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita berusia 65 tahun dengan berat badan 54 kg dirawat di bangsal penyakit dalam dengan infeksi saluran kemih sepsis. Hasil pemeriksaan fungsi ginjal menunjukkan Serum Kreatinin (Scr) 1,6 mg/dL. Dokter hendak meresepkan antibiotik Cefepime yang memerlukan penyesuaian dosis berdasarkan klirens kreatinin.',
    question: 'Berapakah estimasi Klirens Kreatinin (CrCl) pasien berdasarkan rumus Cockcroft-Gault dan bagaimanakah penyesuaian dosis yang diperlukan?',
    options: [
      { key: 'A', text: '29,9 mL/min; dosis Cefepime harus diturunkan atau interval diperpanjang karena pasien mengalami gangguan ginjal derajat sedang-berat' },
      { key: 'B', text: '35,2 mL/min; dosis Cefepime tetap dosis normal tanpa penyesuaian' },
      { key: 'C', text: '55,0 mL/min; Cefepime dapat diberikan dosis maksimal' },
      { key: 'D', text: '18,5 mL/min; Cefepime merupakan kontraindikasi absolut' },
      { key: 'E', text: '72,4 mL/min; fungsi ginjal pasien masih dalam batas normal' }
    ],
    correctAnswer: 'A',
    explanation: 'Rumus Cockcroft-Gault:\\nCrCl (Pria) = [(140 - Usia) × BB (kg)] / [72 × Scr (mg/dL)]\\nCrCl (Wanita) = CrCl (Pria) × 0,85\\n1. CrCl (dasar) = [(140 - 65) × 54] / [72 × 1,6] = (75 × 54) / 115,2 = 4050 / 115,2 = 35,16 mL/min.\\n2. Koreksi faktor wanita = 35,16 × 0,85 = 29,88 mL/min (dibulatkan 29,9 mL/min).\\nDengan CrCl < 30-50 mL/min, ekskresi Cefepime di ginjal menurun drastis sehingga akumulasi obat dapat memicu neurotoksisitas (ensefalopati, mioklonus, kejang). Dosis Cefepime wajib disesuaikan (diturunkan dosis per kali pemberian atau interval pemberian diperpanjang dari tiap 8-12 jam menjadi tiap 24 jam).',
    clinicalReference: 'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine & FDA Renal Dosing Guidelines',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-082',
    domainId: 'klinis',
    vignette: 'Seorang pekerja industri pelapisan logam (electroplating) berusia 30 tahun dilarikan ke IGD dalam keadaan tidak sadar setelah terhirup uap beracun. Pemeriksaan menunjukkan tanda hipoksia jaringan berat: takikardia, takipnea, kulit kemerahan, tercium aroma khas menyerupai almond pahit (bitter almond) dari pernapasan, dan asidosis laktat berat (pH darah 7,10, laktat 12 mmol/L). Pasien didiagnosis keracunan Sianida akut.',
    question: 'Antidotum pilihan utama (Cyanokit) manakah yang bekerja langsung mengikat ion sianida bebas membentuk senyawa nontoksik stabil yang diekskresikan lewat urin?',
    options: [
      { key: 'A', text: 'Hidroksokobalamin intravena (membentuk Sianokobalamin / Vitamin B12)' },
      { key: 'B', text: 'N-Asetilsistein intravena' },
      { key: 'C', text: 'Atropin Sulfat intravena dosis tinggi' },
      { key: 'D', text: 'Nalokson intravena' },
      { key: 'E', text: 'Kalsium Glukonat intravena' }
    ],
    correctAnswer: 'A',
    explanation: 'HIDROKSOKOBALAMIN (Cyanokit) adalah antidotum lini pertama pilihan utama untuk keracunan SIANIDA akut. Molekul hidroksokobalamin mengikat ion sianida bebas dengan afinitas sangat tinggi untuk membentuk SIANOKOBALAMIN (Vitamin B12) yang tidak beracun dan diekskresikan secara aman melalui ginjal ke dalam urin. Keuntungan utamanya adalah tidak memicu pembentukan methemoglobinemia, sehingga aman pada pasien dengan kecurigaan inhalasi asap kebakaran (kombinasi CO + Sianida). Alternatif klasik lainnya adalah kombinasi Natrium Nitrit dan Natrium Tiosulfat.',
    clinicalReference: 'Goldfrank’s Toxicologic Emergencies & WHO Guidelines for the Management of Cyanide Poisoning',
    difficulty: 'Sedang'
  },
  {
    id: 'q-083',
    domainId: 'klinis',
    vignette: 'Seorang pasien wanita berusia 38 tahun penderita Penyakit Graves dilarikan ke ICU dengan Krisis Tiroid (Thyroid Storm) yang dipicu oleh infeksi saluran kemih. Pasien mengalami demam 40°C, takikardia 160x/menit, agitasi, dan aritmia fibrilasi atrium. Dokter meminta apoteker menyiapkan Propiltiourasil (PTU) oral dan Larutan Lugol (Kalium Iodida).',
    question: 'Bagaimanakah urutan waktu pemberian kedua obat tersebut yang benar sesuai prinsip farmakologi klinis tiroid?',
    options: [
      { key: 'A', text: 'Berikan PTU terlebih dahulu, kemudian Larutan Lugol diberikan minimal 1 jam setelah PTU' },
      { key: 'B', text: 'Berikan Larutan Lugol terlebih dahulu, kemudian PTU diberikan 2 jam setelahnya' },
      { key: 'C', text: 'Campurkan Larutan Lugol dan serbuk PTU untuk diminum bersamaan dalam satu gelas' },
      { key: 'D', text: 'Larutan Lugol diberikan secara infus IV kontinu bersamaan dengan injeksi insulin' },
      { key: 'E', text: 'Hanya berikan Larutan Lugol karena PTU dikontraindikasikan pada krisis tiroid' }
    ],
    correctAnswer: 'A',
    explanation: 'Pada tata laksana Krisis Tiroid (Thyroid Storm), tionamid (PROPILTIOURASIL / PTU) HARUS DIBERIKAN TERLEBIH DAHULU minimal 1 JAM SEBELUM pemberian sediaan IODIDA (Larutan Lugol atau SSKI). Alasannya: PTU bekerja menghambat sintesis hormon tiroid baru dengan memblokir enzim tiroid peroksidase (TPO) serta menghambat konversi T4 ke T3 di perifer. Jika iodida diberikan sebelum atau bersamaan dengan tionamid, asupan iodida anorganik dosis tinggi tersebut justru akan dimanfaatkan kelenjar tiroid yang hiperaktif sebagai bahan baku (substrat) sintesis hormon tiroid baru (efek Jod-Basedow), yang memperparah badai tiroid.',
    clinicalReference: 'American Thyroid Association (ATA) Guidelines for Diagnosis and Management of Hyperthyroidism & Konsensus Endokrin PERKENI',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-084',
    domainId: 'klinis',
    vignette: 'Seorang wanita berusia 31 tahun yang sedang hamil usia gestasi 8 minggu (trimester pertama) memiliki riwayat pemasangan katup jantung mekanik dan trombosis vena dalam (DVT). Sebelum hamil pasien mengonsumsi Warfarin oral.',
    question: 'Terapi antikoagulan manakah yang paling tepat dan aman direkomendasikan apoteker untuk menggantikan Warfarin selama kehamilan trimester pertama?',
    options: [
      { key: 'A', text: 'Low Molecular Weight Heparin (LMWH / Enoksaparin) subkutan dengan pemantauan kadar Anti-Xa' },
      { key: 'B', text: 'Warfarin oral dosis dinaikkan dua kali lipat' },
      { key: 'C', text: 'Rivaroxaban oral tablet 20 mg 1x sehari' },
      { key: 'D', text: 'Dabigatran eteksilat oral 150 mg 2x sehari' },
      { key: 'E', text: 'Aspirin dosis tinggi 500 mg 3x sehari' }
    ],
    correctAnswer: 'A',
    explanation: 'WARFARIN memiliki sifat teratogenik berat dan bersifat KONTRAINDIKASI MUTLAK pada kehamilan trimester pertama (terutama minggu ke-6 hingga ke-12) karena menembus plasenta dan memicu Warfarin Embryopathy (hipoplasia nasal, kelainan tulang chondrodysplasia punctata, mikrosefali, dan perdarahan janin). DOAC (Rivaroxaban, Apixaban, Dabigatran) belum memiliki data keamanan yang memadai pada kehamilan. Pilihan utama yang terbukti aman adalah HEPARIN / LMWH (seperti ENOKSAPARIN subkutan) karena molekulnya yang berukuran besar bermuatan negatif tidak dapat menembus sawar plasenta.',
    clinicalReference: 'ESC Guidelines on the Management of Cardiovascular Diseases during Pregnancy & ACCP Antithrombotic Guidelines',
    difficulty: 'Sedang'
  },
  {
    id: 'q-085',
    domainId: 'klinis',
    vignette: 'Seorang pasien laki-laki berusia 24 tahun penderita skizofrenia fase akut mendapatkan injeksi Haloperidol 5 mg intramuskular. Tiga puluh menit kemudian, pasien mengalami kontraksi otot leher kaku memutar ke samping yang sangat nyeri (akut tortikolis), bola mata melotot ke atas tidak dapat turun (krisis okulogirik), dan lidah menjulur kaku.',
    question: 'Gejala distonia akut (bagian dari sindrom ekstrapiramidal / EPS) akibat blokade reseptor dopamin D2 tersebut harus segera ditangani dengan pemberian obat parenteral manakah?',
    options: [
      { key: 'A', text: 'Difenhidramin HCl 50 mg injeksi intravena/intramuskular' },
      { key: 'B', text: 'Klorpromazin 100 mg injeksi intramuskular' },
      { key: 'C', text: 'Risperidon 2 mg tablet oral' },
      { key: 'D', text: 'Klozapin 25 mg sublingual' },
      { key: 'E', text: 'Flumazenil 0,5 mg intravena' }
    ],
    correctAnswer: 'A',
    explanation: 'DISTONIA AKUT adalah spasme otot involunter mendadak dan nyeri (krisis okulogirik, tortikolis, trismus) yang merupakan bentuk Sindrom Ekstrapiramidal (EPS) onset cepat akibat blokade masif reseptor Dopamin D2 di jalur nigrostriatal oleh antipsikotik tipikal potensi tinggi (seperti Haloperidol). Hal ini menyebabkan ketidakseimbangan relatif dominasi aktivitas kolinergik. Terapi lini pertama darurat adalah agen antikolinergik kerja cepat, yaitu DIFENHIDRAMIN 50 mg IV/IM atau SULFAT ATROPIN / BENZTROPIN. Pasien yang sudah stabil dapat dilanjutkan dengan Triheksifenidil (THP) oral.',
    clinicalReference: 'Maudsley Prescribing Guidelines in Psychiatry & Panduan Praktik Klinis Psikiatri PDSKJI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-086',
    domainId: 'klinis',
    vignette: 'Seorang wanita berusia 27 tahun datang ke dokter spesialis gastroenterologi dengan keluhan diare berdarah disertai lendir, nyeri perut kram, dan tenesmus selama 4 minggu. Hasil kolonoskopi dan biopsi menegakkan diagnosis Kolitis Ulseratif (Ulcerative Colitis) aktif derajat ringan hingga sedang pada kolon distal.',
    question: 'Senyawa derivat asam 5-aminosalisilat (5-ASA) lini pertama manakah yang direkomendasikan untuk menginduksi dan mempertahankan remisi klinis pada pasien tersebut?',
    options: [
      { key: 'A', text: 'Mesalazin (atau Sulfasalazin) oral dikombinasikan dengan sediaan topikal rektal' },
      { key: 'B', text: 'Infliximab intravena infus monoterapi' },
      { key: 'C', text: 'Metronidazol oral dosis tinggi selama 6 bulan' },
      { key: 'D', text: 'Loperamid tablet 4 mg setiap habis buang air besar' },
      { key: 'E', text: 'Ketoprofen tablet salut enterik 200 mg' }
    ],
    correctAnswer: 'A',
    explanation: 'Pada Kolitis Ulseratif derajat ringan hingga sedang, terapi lini pertama untuk menginduksi remisi dan pemeliharaan adalah derivat 5-ASA (5-aminosalicylic acid), yaitu MESALAZIN atau SULFASALAZIN. Kombinasi sediaan oral dan sediaan rektal (enema/supositoria) terbukti secara klinis memberikan efikasi penutupan lesi mukosa yang lebih unggul dibandingkan monoterapi oral saja. NSAID konvensional (seperti Ketoprofen) dikontraindikasikan karena memperparah inflamasi saluran cerna; sedangkan agen biologis Anti-TNF (Infliximab) dicadangkan untuk kasus derajat berat atau yang refrakter terhadap 5-ASA dan steroid.',
    clinicalReference: 'ACG Clinical Guideline: Ulcerative Colitis in Adults & Panduan Nasional Pelayanan Kedokteran Gastroenterologi',
    difficulty: 'Sedang'
  },
  {
    id: 'q-087',
    domainId: 'klinis',
    vignette: 'Seorang ibu membawa balita laki-laki berusia 2 tahun dengan berat badan 11 kg ke klinik darurat karena mengalami kejang kelojotan seluruh tubuh disertai demam tinggi 39,2°C sejak 4 menit yang lalu. Kejang masih berlangsung saat anak tiba di ruang tindakan.',
    question: 'Obat lini pertama darurat manakah yang harus segera diberikan via rektal untuk menghentikan kejang demam tersebut?',
    options: [
      { key: 'A', text: 'Diazepam rektal tube dosis 5 mg' },
      { key: 'B', text: 'Diazepam rektal tube dosis 10 mg' },
      { key: 'C', text: 'Fenobarbital oral tablet 30 mg' },
      { key: 'D', text: 'Paracetamol sirup dosis 120 mg via oral' },
      { key: 'E', text: 'Asam Valproat sirup 250 mg via oral' }
    ],
    correctAnswer: 'A',
    explanation: 'Tatalaksana lini pertama kejang demam yang masih berlangsung adalah DIAZEPAM REKTAL. Berdasarkan Rekomendasi IDAI (Ikatan Dokter Anak Indonesia), dosis diazepam rektal ditentukan berdasarkan berat badan anak:\\n- Berat Badan < 12 kg: Dosis 5 mg rektal tube.\\n- Berat Badan >= 12 kg: Dosis 10 mg rektal tube.\\nKarena anak memiliki BB 11 kg (< 12 kg), maka dosis yang tepat adalah Diazepam Rektal 5 mg. Jangan memberikan obat per oral pada anak yang sedang kejang tidak sadar karena risiko aspirasi paru yang mematikan.',
    clinicalReference: 'Konsensus Penatalaksanaan Kejang Demam Ikatan Dokter Anak Indonesia (IDAI)',
    difficulty: 'Mudah'
  },
  {
    id: 'q-088',
    domainId: 'manajemen',
    vignette: 'Tim Farmasi dan Terapi (TFT) rumah sakit melakukan kajian Farmakoekonomi analisis Utilitas Biaya (Cost-Utility Analysis / CUA) untuk memasukkan obat antikanker baru ke dalam formularium. Terapi Standar Lama (Obat A) menelan biaya total Rp 25.000.000 dan menghasilkan luaran kualitas hidup 3 QALY. Terapi Inovator Baru (Obat B) menelan biaya total Rp 55.000.000 dan menghasilkan 5 QALY.',
    question: 'Berapakah nilai Rasio Inkremental Efektivitas Biaya (ICER) per QALY obat baru (B) dibandingkan obat standar (A)?',
    options: [
      { key: 'A', text: 'Rp 15.000.000 per QALY' },
      { key: 'B', text: 'Rp 30.000.000 per QALY' },
      { key: 'C', text: 'Rp 10.000.000 per QALY' },
      { key: 'D', text: 'Rp 40.000.000 per QALY' },
      { key: 'E', text: 'Rp 80.000.000 per QALY' }
    ],
    correctAnswer: 'A',
    explanation: 'Rumus ICER = (Biaya Obat B - Biaya Obat A) / (Luaran Efek B - Luaran Efek A).\\n1. Selisih Biaya (ΔC) = Rp 55.000.000 - Rp 25.000.000 = Rp 30.000.000.\\n2. Selisih QALY (ΔE) = 5 QALY - 3 QALY = 2 QALY.\\n3. ICER = Rp 30.000.000 / 2 QALY = Rp 15.000.000 per QALY.\\nNilai ICER Rp 15 juta/QALY ini selanjutnya dibandingkan dengan batas kesediaan membayar (Cost-Effectiveness Threshold) Indonesia (biasanya 1 hingga 3 kali PDB per kapita) untuk menentukan apakah obat baru tersebut cost-effective.',
    clinicalReference: 'Pedoman Penerapan Kajian Farmakoekonomi Kemenkes RI & ISPOR Guidelines for Cost-Utility Analysis',
    difficulty: 'Sedang'
  },
  {
    id: 'q-089',
    domainId: 'manajemen',
    vignette: 'Apoteker mendirikan apotek mandiri dengan total nilai modal investasi awal (capital investment) sebesar Rp 250.000.000. Pada akhir penutupan buku tahun pertama, apotek membukukan pendapatan bersih (laba bersih setelah pajak) sebesar Rp 50.000.000.',
    question: 'Berapakah persentase Return on Investment (ROI) apotek pada tahun pertama tersebut?',
    options: [
      { key: 'A', text: '20%' },
      { key: 'B', text: '25%' },
      { key: 'C', text: '15%' },
      { key: 'D', text: '10%' },
      { key: 'E', text: '50%' }
    ],
    correctAnswer: 'A',
    explanation: 'Rumus Return on Investment (ROI):\\nROI (%) = (Laba Bersih Setelah Pajak / Total Modal Investasi) × 100%\\nROI = (Rp 50.000.000 / Rp 250.000.000) × 100% = 0,20 × 100% = 20%.\\nNilai ROI 20% menunjukkan bahwa setiap Rp 100 modal yang ditanamkan menghasilkan laba bersih sebesar Rp 20 per tahun.',
    clinicalReference: 'Modul Manajemen Farmasi, Akuntansi & Bisnis Apotek AIPTLI',
    difficulty: 'Mudah'
  },
  {
    id: 'q-090',
    domainId: 'manajemen',
    vignette: 'Instalasi Farmasi Rumah Sakit (IFRS) menghadapi pemotongan anggaran pengadaan obat sebesar 25% dari manajemen direksi. Apoteker kepala instalasi harus melakukan efisiensi anggaran menggunakan analisis matriks gabungan VEN (Vital, Essensial, Non-essensial) dan ABC (berdasarkan nilai investasi serapan dana).',
    question: 'Kelompok obat manakah pada matriks VEN-ABC yang menjadi prioritas utama untuk dieliminasi atau dikurangi volumenya terlebih dahulu tanpa membahayakan keselamatan nyawa pasien?',
    options: [
      { key: 'A', text: 'Kelompok NC (Non-Essensial dengan Nilai Investasi Rendah C)' },
      { key: 'B', text: 'Kelompok VA (Vital dengan Nilai Investasi Tinggi A)' },
      { key: 'C', text: 'Kelompok EA (Essensial dengan Nilai Investasi Tinggi A)' },
      { key: 'D', text: 'Kelompok VB (Vital dengan Nilai Investasi Sedang B)' },
      { key: 'E', text: 'Kelompok VC (Vital dengan Nilai Investasi Rendah C)' }
    ],
    correctAnswer: 'A',
    explanation: 'Pada matriks VEN-ABC kombinasi sembilan kuadran (VA, VB, VC, EA, EB, EC, NA, NB, NC):\\n1. Obat kelompok VITAL (VA, VB, VC) seperti obat emergensi syok, insulin, dan antibisa ular TIDAK BOLEH DIHAPUS sama sekali karena ketiadaannya mengancam nyawa pasien.\\n2. Jika efisiensi pemotongan anggaran harus dilakukan, langkah pertama adalah MENGELIMINASI OBAT KELOMPOK NC (Non-essensial nilai C, seperti suplemen penunjang/vitamin adjuvan), kemudian mengevaluasi kuadran NB dan NA, atau mencari substitusi generik pada kelompok EA/EB.',
    clinicalReference: 'Petunjuk Teknis Standar Pelayanan Kefarmasian di Rumah Sakit Kemenkes RI & WHO Managing Drug Supply',
    difficulty: 'Sedang'
  },
  {
    id: 'q-091',
    domainId: 'teknologi',
    vignette: 'Bagian Pemastian Mutu (QA) di industri farmasi sedang melakukan validasi dan kualifikasi terhadap mesin cetak tablet multi-punch berkecepatan tinggi yang baru saja dibeli dari pabrik Jerman.',
    question: 'Tahapan kualifikasi manakah yang memverifikasi dan mendokumentasikan bahwa mesin tersebut tiba dalam kondisi utuh, terpasang sesuai tata letak ruangan, perpipaan utilitas dan perkabelan listrik terhubung sesuai gambar teknik pabrikan?',
    options: [
      { key: 'A', text: 'Kualifikasi Instalasi (Installation Qualification / IQ)' },
      { key: 'B', text: 'Kualifikasi Desain (Design Qualification / DQ)' },
      { key: 'C', text: 'Kualifikasi Operasional (Operational Qualification / OQ)' },
      { key: 'D', text: 'Kualifikasi Kinerja (Performance Qualification / PQ)' },
      { key: 'E', text: 'Validasi Pembersihan (Cleaning Validation)' }
    ],
    correctAnswer: 'A',
    explanation: 'Sesuai Pedoman CPOB BPOM RI Bab Kualifikasi dan Validasi:\\n1. Kualifikasi Desain (DQ): Memastikan rancangan fasilitas/peralatan sesuai prinsip CPOB dan kebutuhan pengguna (URS).\\n2. KUALIFIKASI INSTALASI (IQ): Memverifikasi bahwa peralatan, instrumen, dan utilitas telah dipasang secara benar sesuai dengan gambar teknik pabrikan dan spesifikasi yang disetujui.\\n3. Kualifikasi Operasional (OQ): Memverifikasi bahwa sistem/mesin beroperasi sesuai batasan operasional yang diinginkan (parameter kecepatan, suhu, tekanan).\\n4. Kualifikasi Kinerja (PQ): Memverifikasi bahwa mesin secara konsisten menghasilkan produk memenuhi spesifikasi saat dijalankan dengan beban proses nyata.',
    clinicalReference: 'Pedoman Cara Pembuatan Obat yang Baik (CPOB) BPOM RI: Kualifikasi dan Validasi',
    difficulty: 'Sedang'
  },
  {
    id: 'q-092',
    domainId: 'teknologi',
    vignette: 'Dalam uji stabilitas fisik sediaan emulsi minyak ikan tipe O/W (minyak dalam air), apoteker R&D mendapati terbentuknya lapisan tetesan minyak yang mengapung dan berkumpul di bagian atas botol setelah penyimpanan selama 1 bulan. Namun, setelah botol dikocok perlahan selama 5 detik, sediaan kembali menyatu menjadi emulsi yang homogen sempurna.',
    question: 'Apakah nama fenomena ketidakstabilan fisik sediaan emulsi tersebut dan faktor fisik manakah yang menyebabkannya?',
    options: [
      { key: 'A', text: 'Creaming (upward creaming); disebabkan oleh perbedaan massa jenis (densitas minyak lebih rendah dari air)' },
      { key: 'B', text: 'Cracking (Breaking); disebabkan oleh pecahnya lapisan film surfaktan secara permanen' },
      { key: 'C', text: 'Inversi Fase; disebabkan oleh perubahan emulsi O/W menjadi W/O' },
      { key: 'D', text: 'Flokulasi ireversibel; disebabkan oleh peningkatan muatan potensial zeta' },
      { key: 'E', text: 'Koalesensi; disebabkan oleh penggabungan tetesan cairan yang tidak dapat dikocok ulang' }
    ],
    correctAnswer: 'A',
    explanation: 'CREAMING adalah fenomena ketidakstabilan fisik emulsi yang bersifat REVERSIBEL (dapat didispersikan kembali secara homogen dengan pengocokan ringan). Pada emulsi minyak dalam air (O/W), karena massa jenis (densitas) fase minyak lebih kecil daripada air, tetesan minyak akan bergerak naik ke permukaan atas (Upward Creaming) sesuai Hukum Stokes: v = d²(ρ₁ - ρ₂)g / 18η. Sebaliknya, CRACKING/BREAKING dan KOALESENSI adalah ketidakstabilan IREVERSIBEL di mana lapisan pelindung antarmuka emulgator telah rusak permanen sehingga minyak dan air memisah total dan tidak bisa homogen kembali dengan pengocokan.',
    clinicalReference: 'Farmakope Indonesia Edisi VI & Martin’s Physical Pharmacy and Pharmaceutical Sciences',
    difficulty: 'Mudah'
  },
  {
    id: 'q-093',
    domainId: 'teknologi',
    vignette: 'Industri farmasi memproduksi sediaan tetes mata steril yang mengandung zat aktif termolabil. Sterilisasi dilakukan menggunakan metode filtrasi membran steril ukuran pori 0,22 mikron ke dalam wadah steril di ruang bersih Kelas A.',
    question: 'Metode pengujian non-destruktif manakah yang wajib dilakukan terhadap membran filter sebelum dan sesudah proses filtrasi aseptis untuk memverifikasi keutuhan (integritas) pori filter?',
    options: [
      { key: 'A', text: 'Uji Titik Gelembung (Bubble Point Test)' },
      { key: 'B', text: 'Uji Disolusi Tipe 2' },
      { key: 'C', text: 'Uji Kerapuhan (Friability Test)' },
      { key: 'D', text: 'Uji Waktu Hancur (Disintegration Test)' },
      { key: 'E', text: 'Uji Batas Mikroba dengan media cawan tuang' }
    ],
    correctAnswer: 'A',
    explanation: 'Berdasarkan CPOB dan Farmakope Indonesia VI, integritas filter membran steril (ukuran pori nominal 0,22 μm) WAJIB DIUJI sebelum dan segera setelah proses penyaringan steril selesai. Metode uji integritas fisik yang paling umum dan terstandarisasi adalah BUBBLE POINT TEST (Uji Titik Gelembung) atau Uji Aliran Difusi (Diffusion Flow Test). Uji titik gelembung mengukur tekanan gas minimum yang dibutuhkan untuk mendesak keluar cairan pembasah dari pori-pori membran terbesar. Jika tekanan titik gelembung memenuhi spesifikasi validasi pabrikan filter, maka membran terbukti utuh dan mampu menahan mikroorganisme (seperti Brevundimonas diminuta).',
    clinicalReference: 'Petunjuk Operasional Penerapan Pedoman CPOB BPOM RI: Pembuatan Produk Steril & Farmakope Indonesia VI',
    difficulty: 'Sedang'
  },
  {
    id: 'q-094',
    domainId: 'bahan_alam',
    vignette: 'Di laboratorium ekstraksi fitofarmaka, apoteker hendak mengisolasi senyawa kurkuminoid dari rimpang kunyit kering. Alat ekstraksi yang digunakan terdiri dari labu alas bulat pemanas, klonsong (timbel) tempat simplisia, pipa sifon pengalir cairan, dan kondensor pendingin bola yang bekerja secara berulang menyari simplisia dengan uap pelarut etanol yang terkondensasi.',
    question: 'Apakah nama metode ekstraksi panas bersinambung (kontinu) tersebut?',
    options: [
      { key: 'A', text: 'Sokletasi (Soxhlet Extraction)' },
      { key: 'B', text: 'Maserasi kinetik berulang' },
      { key: 'C', text: 'Perkolasi dingin kontinu' },
      { key: 'D', text: 'Dekoktasi' },
      { key: 'E', text: 'Destilasi uap air' }
    ],
    correctAnswer: 'A',
    explanation: 'SOKLETASI adalah metode ekstraksi panas bersinambung (kontinu) menggunakan alat Soxhlet. Prinsip kerjanya: pelarut di labu alas bulat dipanaskan hingga mendidih, uap pelarut naik melalui pipa samping menuju pendingin (kondensor), uap mencair dan menetes ke dalam klonsong (timbel) yang berisi simplisia. Ketika cairan pelarut di timbel mencapai ketinggian pipa sifon, seluruh cairan ekstrak akan tersifon kembali turun ke labu didih. Proses ini berlangsung berulang-ulang secara efisien menggunakan volume pelarut yang relatif sedikit untuk senyawa tahan panas (termostabil).',
    clinicalReference: 'Farmakope Herbal Indonesia Edisi II & Buku Ajar Fitokimia dan Metode Ekstraksi Bahan Alam',
    difficulty: 'Mudah'
  },
  {
    id: 'q-095',
    domainId: 'bahan_alam',
    vignette: 'Seorang pria berusia 46 tahun pasca-transplantasi ginjal mengonsumsi imunosupresan Siklosporin untuk mencegah reaksi rejeksi organ. Pasien juga rutin meminum teh herbal St. John’s Wort (Hypericum perforatum) yang dibeli secara mandiri untuk meredakan stres. Dua bulan kemudian, pasien mengalami penurunan fungsi ginjal akut dan biopsi membuktikan terjadinya rejeksi cangkok ginjal karena kadar Siklosporin darah turun di bawah rentang terapi.',
    question: 'Mekanisme interaksi herbal-obat farmakokinetik apakah yang menyebabkan penurunan drastis kadar plasma Siklosporin tersebut?',
    options: [
      { key: 'A', text: 'St. John’s Wort adalah inducer poten enzim sitokrom CYP3A4 dan transporter P-glikoprotein (P-gp), yang mempercepat metabolisme dan eliminasi Siklosporin' },
      { key: 'B', text: 'St. John’s Wort menghambat secara kompetitif absorpsi Siklosporin di lambung' },
      { key: 'C', text: 'St. John’s Wort adalah inhibitor kuat CYP3A4 yang menyebabkan nefrotoksisitas langsung' },
      { key: 'D', text: 'St. John’s Wort mengkelat molekul Siklosporin membentuk endapan di usus halus' },
      { key: 'E', text: 'St. John’s Wort meningkatkan ikatan protein plasma Siklosporin hingga 100%' }
    ],
    correctAnswer: 'A',
    explanation: 'Herba ST. JOHN’S WORT (Hypericum perforatum, mengandung zat aktif hiperforin) adalah INDUCER POTEN dari enzim pemetabolisme hati sitokrom CYP3A4 dan protein efluks P-glikoprotein (P-gp) di usus dan ginjal. Ketika dikonsumsi bersamaan dengan SIKLOSPORIN (yang merupakan substrat utama CYP3A4 dan P-gp), pembersihan (klirens) Siklosporin meningkat drastis dan bioavailabilitasnya anjlok hingga 50-70%. Akibatnya kadar darah Siklosporin menjadi sub-terapeutik yang berakibat fatal berupa REJEKSI AKUT ORGAN TRANSPLANTASI. Interaksi serupa juga terjadi pada kontrasepsi oral (kegagalan KB), warfarin, dan obat antiretroviral HIV.',
    clinicalReference: 'Stockley’s Drug Interactions & Natural Medicines Comprehensive Database: St. John’s Wort Interactions',
    difficulty: 'Sedang'
  }
];

export interface FormulaCalculatorGuide {
  id: string;
  category: 'pk' | 'alligation' | 'hlb' | 'tonicity' | 'management' | 'pediatric' | 'pharmacoeconomics' | 'crcl' | 'rop';
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
  },
  {
    id: 'f-crcl-cockcroft',
    category: 'crcl',
    title: 'Klirens Kreatinin & Penyesuaian Dosis Ginjal (Cockcroft-Gault)',
    formulaDisplay: 'CrCl (Pria) = [(140 - Usia) × BB (kg)] / [72 × Scr]  ;  Wanita = CrCl Pria × 0,85',
    description: 'Metode baku emas estimasi laju filtrasi glomerulus untuk penyesuaian dosis obat-obat eliminasi ginjal (antibiotik, antidiabetik, kardiovaskular).',
    sampleProblem: 'Wanita usia 65 tahun, berat badan 54 kg, Serum Kreatinin 1,6 mg/dL. Berapakah nilai estimasi Klirens Kreatinin (CrCl)?',
    stepByStepSolution: [
      '1. CrCl Dasar = [(140 - 65) × 54] / [72 × 1,6] = (75 × 54) / 115,2 = 4050 / 115,2 = 35,16 mL/min.',
      '2. Faktor Pengali Wanita = 35,16 × 0,85 = 29,88 mL/min.',
      '3. Kesimpulan: CrCl = 29,9 mL/min (Gangguan ginjal derajat berat Stage 4 KDIGO, dosis obat nefrotoksik harus disesuaikan).'
    ]
  },
  {
    id: 'f-reorder-point-inventory',
    category: 'rop',
    title: 'Pengendalian Persediaan: Reorder Point (ROP) & Safety Stock',
    formulaDisplay: 'ROP = (Lead Time × Konsumsi Harian) + Safety Stock',
    description: 'Titik pemesanan kembali sediaan farmasi ke PBF untuk memastikan stok tidak pernah kosong (zero stock-out).',
    sampleProblem: 'Apotek menjual rata-rata 30 strip Amoksisilin/hari. Lead time PBF 3 hari kerja, Safety Stock ditetapkan 60 strip. Pada sisa stok berapa SP baru diterbitkan?',
    stepByStepSolution: [
      '1. Kebutuhan masa tunggu (Lead Time Stock) = 3 hari × 30 strip/hari = 90 strip.',
      '2. Safety Stock (Cadangan Pengaman) = 60 strip.',
      '3. Reorder Point (ROP) = 90 strip + 60 strip = 150 strip.',
      '4. Kesimpulan: Terbitkan SP baru saat sisa stok di rak tersisa 150 strip.'
    ]
  }
];

export interface OsceStationGuide {
  id: string;
  title: string;
  stationType: 'Konseling & PIO' | 'Swamedikasi' | 'Skrining Resep' | 'Manajemen & CDOB' | 'Steril & Sitostatika' | 'Teknologi & CPOB' | 'Manajemen & Regulasi' | 'Formulasi & Dispensing';
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
  },
  {
    id: 'osce-cytotoxic-handling',
    title: 'Stasi 7: Aseptic Dispensing Sitostatika & Penanganan Tumpahan (Spill Kit)',
    stationType: 'Steril & Sitostatika',
    durationMinutes: 10,
    candidateTask: 'Sebagai Apoteker di Ruang Rekonstitusi Obat Kanker Rumah Sakit, terjadi insiden tumpahan larutan Doksorubisin 10 mL di lantai area cleanroom penyiapan sitostatika. Demonstrasikan prosedur penggunaan Spill Kit Sitostatika dan pengelolaan limbah berbahaya sitotoksik secara benar.',
    simulatedPatientScript: 'Penguji berperan sebagai observer yang menilai ketepatan urutan langkah pembatasan area dan pembersihan tumpahan.',
    criticalChecklist: [
      { step: 'Isolasi Area & Pemasangan Rambu Bahaya', description: 'Segera memasang rambu peringatan "BAHAYA TUMPAHAN SITOSTATIKA" dan melarang petugas lain melintasi area tumpahan.', points: 20 },
      { step: 'Pemakaian APD Khusus Sitostatika (PPE)', description: 'Mengenakan gaun pelindung non-permeabel tertutup belakang, masker respirator N95, kacamata goggle, penutup kepala, pelindung sepatu, dan sarung tangan ganda (double gloves) bebas bedak khusus karsinogenik.', points: 25 },
      { step: 'Aplikasi Absorben Spill Kit & Pembersihan Konsentris', description: 'Menutup tumpahan cairan dengan kain/kertas absorben penyerap dari arah LUAR KE DALAM (konsentris) untuk mencegah meluasnya tumpahan. Angkat pecahan vial dengan pinset/penjepit (bukan tangan).', points: 30 },
      { step: 'Dekontaminasi & Netralisasi Permukaan', description: 'Membersihkan lantai dengan larutan deterjen/dekontaminan khusus (misal: NaOCl encer) dan bilas dengan air bersih sebanyak 3 kali.', points: 15 },
      { step: 'Pembuangan Limbah ke Kantong Ungu Berlogo Sitotoksik', description: 'Memasukkan seluruh sisa pembersihan dan APD ke dalam kantong plastik tebal KHUSUS BERWARNA UNGU dengan simbol limbah sitotoksik untuk diinsinerasi suhu tinggi (> 1000°C).', points: 10 }
    ],
    examinerTips: [
      'Perhatikan bahwa pecahan kaca dilarang diambil dengan tangan langsung.',
      'Warna kantong limbah sitostatika wajib UNGU berlogo sitotoksik (bukan kuning infeksius biasa).'
    ]
  },
  {
    id: 'osce-tb-counseling',
    title: 'Stasi 8: Konseling Pasien Tuberkulosis Paru Kategori 1 & Peran PMO',
    stationType: 'Konseling & PIO',
    durationMinutes: 10,
    candidateTask: 'Seorang pasien pria 38 tahun baru pertama kali didiagnosis TB Paru BTA Positif Sensitif Obat dan diresepkan OAT KDT (Kombinasi Dosis Tetap) 4KDT (Rifampisin, Isoniazid, Pirazinamid, Etambutol) 1x sehari 4 tablet pagi hari. Lakukan konseling komprehensif terkait aturan pakai, efek samping khas, dan kepatuhan minum obat bersama Pengawas Menelan Obat (PMO).',
    simulatedPatientScript: 'Pasien datang bersama istrinya. Pasien tampak khawatir dan bertanya: "Berapa lama saya harus minum obat ini? Apakah air kencing saya yang berubah warna merah adalah tanda ginjal saya rusak?"',
    criticalChecklist: [
      { step: 'Perkenalan Diri & Edukasi Durasi Fase Terapi', description: 'Menjelaskan fase intensif (2 bulan 4KDT tiap hari) dilanjutkan fase lanjutan (4 bulan 2KDT). Menegaskan durasi total minimal 6 BULAN dan TIDAK BOLEH PUTUS OBAT.', points: 25 },
      { step: 'Edukasi Aturan Minum Obat Optimal', description: 'Menjelaskan obat diminum sekaligus 4 tablet pada PAGI HARI DALAM KEADAAN PERUT KOSONG (1 jam sebelum makan atau 2 jam setelah makan) dengan segelas air putih untuk absorpsi maksimal Rifampisin.', points: 20 },
      { step: 'Edukasi Efek Samping Khas & Menenangkan Pasien', description: 'Menjelaskan bahwa urin, keringat, dan air mata berwarna MERAH-ORANYE adalah efek samping normal tidak berbahaya dari Rifampisin. Jelaskan tanda efek samping hati berat (kuning/ikterus) dan segera periksa jika timbul.', points: 25 },
      { step: 'Pemberian Piridoksin (Vit B6) & Pencegahan Penularan', description: 'Menjelaskan fungsi Vitamin B6 untuk mencegah kesemutan/neuritis perifer akibat Isoniazid. Edukasi etika batuk dan ventilasi rumah.', points: 15 },
      { step: 'Pelibatan Istri sebagai Pengawas Menelan Obat (PMO)', description: 'Mengedukasi istri untuk memastikan pasien menelan obat setiap hari tepat waktu dan menandai kalender kepatuhan minum obat.', points: 15 }
    ],
    examinerTips: [
      'Kandidat harus menenangkan pasien bahwa urin merah adalah normal akibat Rifampisin.',
      'Kandidat wajib menegaskan bahaya resistensi kuman TB MDR jika putus obat.'
    ]
  },
  {
    id: 'osce-tablet-qc',
    title: 'Stasi 9: Quality Control Industri: Penanganan Masalah Capping & Uji Disolusi S1-S3',
    stationType: 'Teknologi & CPOB',
    durationMinutes: 10,
    candidateTask: 'Sebagai Apoteker QC di Industri Farmasi, hasil uji disolusi Tahap S1 tablet Ciprofloxacin 500 mg menunjukkan dari 6 tablet: 88%, 86%, 82%, 84%, 81%, dan 85% (Q = 80%). Selain itu, teramati 2 tablet mengalami Capping saat uji kerapuhan. Berikan analisis teknis, status kelulusan, dan rekomendasi formulasi.',
    simulatedPatientScript: 'Penguji berperan sebagai Manajer Pemastian Mutu (QA) yang menanyakan justifikasi kelulusan dan langkah perbaikan mesin/formulasi.',
    criticalChecklist: [
      { step: 'Evaluasi Kriteria Disolusi Tahap S1', description: 'Menyimpulkan bahwa Tahap S1 TIDAK LULUS karena ada 3 tablet yang bernilai < 85% (syarat tiap unit >= Q + 5% = 85%).', points: 25 },
      { step: 'Rekomendasi Uji Lanjutan Tahap S2', description: 'Menjelaskan prosedur pengujian Tahap S2 dengan menambah 6 tablet lagi (total 12 tablet) dengan kriteria: rerata 12 unit >= 80% (Q) dan TIDAK ADA satu pun unit yang < 65% (Q - 15%).', points: 25 },
      { step: 'Analisis Akar Masalah Capping Tablet', description: 'Mengidentifikasi penyebab capping: udara terjebak (air entrapment) saat kompresi berkecepatan tinggi, kelembaban granul terlalu rendah (< 1%), atau kurangnya bahan pengikat (binder).', points: 25 },
      { step: 'Solusi Formulasi & Pengaturan Mesin Cetak', description: 'Merekomendasikan penambahan pengikat (PVP/HPMC), penyesuaian moisture content granul ke 2-3%, pembersihan ventilasi punch die, dan penurunan kecepatan putaran mesin cetak rotary.', points: 25 }
    ],
    examinerTips: [
      'Kandidat wajib menghafal kriteria Farmakope Indonesia VI untuk disolusi S1 dan S2.'
    ]
  },
  {
    id: 'osce-narcotics-po',
    title: 'Stasi 10: Pengadaan & Skrining Surat Pesanan Narkotika N-9 & Prekursor di PBF',
    stationType: 'Manajemen & Regulasi',
    durationMinutes: 10,
    candidateTask: 'Sebagai Apoteker Penanggung Jawab di PBF, Anda menerima berkas Surat Pesanan (SP) dari sebuah Apotek yang memesan: Morfin Injeksi, Fentanyl Patch, Pseudoefedrin Tab, dan Tramadol Kapsul dalam 1 lembar SP biasa. Lakukan penelaahan legalitas dan berikan edukasi kepada apoteker pemesan.',
    simulatedPatientScript: 'Penguji berperan sebagai kurir/apoteker pemesan yang menanyakan mengapa SP tersebut ditolak/dikembalikan.',
    criticalChecklist: [
      { step: 'Identifikasi Kesalahan SP Narkotika', description: 'Menjelaskan bahwa pemesanan Narkotika (Morfin, Fentanyl) WAJIB menggunakan FORMULIR KHUSUS SP N-9 RANGKAP 4 dan HANYA BOLEH 1 JENIS NARKOTIKA per lembar SP.', points: 30 },
      { step: 'Pemisahan SP Prekursor & Obat-Obat Tertentu (OOT)', description: 'Menjelaskan bahwa Pseudoefedrin (Prekursor) dan Tramadol (OOT) harus menggunakan lembar SP Prekursor dan SP OOT terpisah minimal rangkap 3.', points: 25 },
      { step: 'Pemeriksaan Legalitas Keabsahan Berkas', description: 'Memeriksa keabsahan SIPA Apoteker, SIA Apotek, alamat jelas, stempel resmi apotek, dan nomor izin PBF tujuan.', points: 25 },
      { step: 'Komunikasi Profesional & Solusi Pemesanan Ulang', description: 'Menolak SP secara santun dengan membuat Berita Penolakan SP dan memandu cara penerbitan SP yang sah sesuai Permenkes No. 3/2015 dan PerBPOM.', points: 20 }
    ],
    examinerTips: [
      'Kandidat wajib menegaskan aturan: 1 lembar SP N-9 HANYA untuk 1 jenis sediaan narkotika.'
    ]
  },
  {
    id: 'osce-eye-ear-drops',
    title: 'Stasi 11: Konseling & Edukasi Teknik Pemakaian Obat Tetes Mata & Tetes Telinga',
    stationType: 'Konseling & PIO',
    durationMinutes: 10,
    candidateTask: 'Seorang pasien wanita berusia 35 tahun datang membawa resep Ciprofloxacin tetes mata (1 tetes tiap 4 jam mata kanan) dan Otopain tetes telinga (3 tetes tiap 8 jam telinga kiri). Berikan konseling komprehensif mengenai cara pemakaian yang benar, pencegahan kontaminasi, posisi tubuh, penekanan nasolakrimal, dan Beyond Use Date (BUD).',
    simulatedPatientScript: 'Pasien bertanya apakah kedua obat boleh diteteskan bersamaan, mengapa telinga terasa berdengung/pusing saat diteteskan obat dingin, dan berapa lama obat masih boleh disimpan setelah dibuka.',
    criticalChecklist: [
      { step: 'Teknik Higienitas & Penetesan Tetes Mata', description: 'Mencuci tangan 6 langkah, mendongakkan kepala, menarik kelopak mata bawah membentuk kantung konjungtiva, meneteskan obat tanpa menyentuh ujung penetes ke mata/bulu mata/tangan.', points: 25 },
      { step: 'Oklusi Punctum Nasolakrimal', description: 'Mengedukasi pasien untuk menutup mata perlahan selama 1-2 menit dan menekan sudut dalam mata (nasolakrimal punctum) agar obat tidak mengalir ke tenggorokan dan mencegah efek sistemik.', points: 25 },
      { step: 'Teknik Tetes Telinga & Penghangatan Botol', description: 'Menghangatkan botol di genggaman tangan selama 1-2 menit sebelum diteteskan (mencegah pusing/nistagmus vestibular akibat cairan dingin), memiringkan kepala, menarik daun telinga DEWASA ke arah ATAS DAN BELAKANG, lalu menahan posisi miring 2-3 menit.', points: 25 },
      { step: 'Jeda Waktu Sediaan & Beyond Use Date (BUD)', description: 'Memberi jeda minimal 5-10 menit jika menggunakan sediaan mata lain; menjelaskan bahwa sediaan tetes mata multidose dengan pengawet memiliki BUD maksimal 28 HARI (1 bulan) setelah segel dibuka; mencatat tanggal buka pada botol.', points: 25 }
    ],
    examinerTips: [
      'Kandidat wajib membedakan anatomi penarikan daun telinga: Dewasa (ke atas & ke belakang), sedangkan anak/balita (ke bawah & ke belakang).',
      'Kandidat wajib menyebutkan oklusi punctum nasolakrimal selama 1-2 menit.'
    ]
  },
  {
    id: 'osce-dry-syrup-bud',
    title: 'Stasi 12: Rekonstitusi Suspensi Kering Amoksisilin & Penentuan Beyond Use Date (BUD)',
    stationType: 'Formulasi & Dispensing',
    durationMinutes: 10,
    candidateTask: 'Anda menerima resep Amoksisilin Sirup Kering 125 mg/5 mL (volume 60 mL) untuk pasien anak dengan otitis media. Lakukan prosedur rekonstitusi suspensi kering secara aseptis dan benar, tentukan Beyond Use Date (BUD), tuliskan etiket, dan berikan informasi cara pakai serta penyimpanan kepada orang tua pasien.',
    simulatedPatientScript: 'Ibu pasien bertanya berapa banyak air yang ditambahkan, apakah boleh menggunakan air dispenser panas, berapa lama sirup ini boleh disimpan, dan mengapa warnanya berubah jika dibiarkan lama.',
    criticalChecklist: [
      { step: 'Penyiapan Serbuk Kering Awal', description: 'Mengetuk-ngetuk botol sirup kering terlebih dahulu agar gumpalan serbuk terurai merata sebelum ditambahkan air.', points: 20 },
      { step: 'Pemilihan Pelarut & Larangan Air Panas', description: 'Menegaskan penggunaan Aquades atau air minum matang bersuhu RUANG/DINGIN, dan melarang keras menggunakan air panas karena dapat merusak cincin beta-laktam antibiotik amoksisilin.', points: 25 },
      { step: 'Teknik Penambahan Air Dua Tahap', description: 'Menuangkan air separuh volume terlebih dahulu, mengocok kuat hingga serbuk tersuspensi homogen tanpa gumpalan, lalu menambahkan air kembali tepat hingga tanda batas/tanda tera botol dan mengocok ulang.', points: 25 },
      { step: 'Penetapan BUD & Edukasi Etiket', description: 'Menetapkan BUD maksimal 7 HARI pada suhu ruang (20-25°C) atau 14 HARI di lemari pendingin (2-8°C); menuliskan label "Kocok Dahulu Sebelum Diminum" dan mengedukasi antibiotik wajib dihabiskan.', points: 30 }
    ],
    examinerTips: [
      'Kandidat wajib menekankan: Dilarang menggunakan air panas/mendidih untuk rekonstitusi sirup kering amoksisilin.',
      'Kandidat wajib memastikan label Kocok Dahulu dan tanggal BUD tertera jelas pada etiket.'
    ]
  }
];

export interface FlashcardItem {
  id: string;
  category: 'Antidotum' | 'Efek Samping Khas' | 'Nilai Normal Lab' | 'Mekanisme Obat (MoA)' | 'Interaksi Kritis' | 'Regulasi & DOWA' | 'Singkatan Latin & BUD';
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
  },
  {
    id: 'fc-19',
    category: 'Antidotum',
    frontText: 'Antidotum Keracunan Metanol / Etilen Glikol',
    backText: 'Fomepizol IV atau Etanol Oral/IV\n\n• Mekanisme: Menghambat enzim Alkohol Dehidrogenase (ADH) secara kompetitif untuk mencegah pembentukan asam format / asam oksalat.',
    hint: 'Penghambat enzim metabolisme alkohol'
  },
  {
    id: 'fc-20',
    category: 'Antidotum',
    frontText: 'Antidotum Intoksikasi Isoniazid (INH) Dosis Tinggi (Kejang)',
    backText: 'Piridoksin (Vitamin B6) Intravena\n\n• Dosis: Diberikan gram per gram sesuai estimasi dosis INH yang tertelan (atau 5 gram IV empiris).',
    hint: 'Vitamin neuroprotektor'
  },
  {
    id: 'fc-21',
    category: 'Antidotum',
    frontText: 'Antidotum Keracunan Logam Berat Timbal (Pb) & Merkuri (Hg)',
    backText: 'Dimercaprol (BAL), Succimer (DMSA), atau Calcium Disodium EDTA\n\n• Mekanisme: Agen pengkhelat (chelating agent) yang mengikat ion logam berat bebas dan memfasilitasi ekskresi ginjal.',
    hint: 'Senyawa khelat dengan gugus sulfhidril'
  },
  {
    id: 'fc-22',
    category: 'Efek Samping Khas',
    frontText: 'Efek Samping Khas OAT: Rifampisin vs Isoniazid vs Pirazinamid vs Etambutol',
    backText: '• Rifampisin: Cairan tubuh (urin, keringat, air mata) merah-oranye.\n• Isoniazid: Neuritis perifer & hepatotoksisitas (cegah dg Vit B6).\n• Pirazinamid: Hiperurisemia (nyeri sendi gout) & hepatotoksisitas.\n• Etambutol: Neuritis retrobulbar (gangguan visus & buta warna merah-hijau).',
    hint: '4 Pilar OAT Lini Pertama'
  },
  {
    id: 'fc-23',
    category: 'Efek Samping Khas',
    frontText: 'Efek Samping Khas Golongan Statin & Pemantauan Enzim',
    backText: 'Miopati / Rabdomiolisis (Nyeri otot hebat + Urin warna teh gelap) & Peningkatan enzim SGPT/SGOT.\n\n• Pantau: Kadar Creatine Kinase (CK) serum jika pasien mengeluh nyeri otot simetris.',
    hint: 'Penghambat HMG-CoA Reduktase'
  },
  {
    id: 'fc-24',
    category: 'Efek Samping Khas',
    frontText: 'Efek Samping Khas Antipsikotik Tipikal (Haloperidol / Klorpromazin)',
    backText: 'Extrapyramidal Symptoms (EPS): Distonia akut, Akatisia, Parkinsonisme, dan Tardive Dyskinesia.\n\n• Antidotum EPS: Triheksifenidil (THP) atau Difenhidramin parenteral.',
    hint: 'Blokade reseptor Dopamin D2 jalur nigrostriatal'
  },
  {
    id: 'fc-25',
    category: 'Mekanisme Obat (MoA)',
    frontText: 'Mekanisme Kerja SGLT-2 Inhibitor (Empagliflozin / Dapagliflozin)',
    backText: 'Menghambat reabsorpsi glukosa dan natrium di tubulus proksimal ginjal -> Membuang glukosa lewat urin (glukosuria) dan menurunkan beban awal jantung (kardioprotektor & nefroprotektor).',
    hint: 'Obat antidiabetes modern dengan proteksi jantung & ginjal'
  },
  {
    id: 'fc-26',
    category: 'Mekanisme Obat (MoA)',
    frontText: 'Mekanisme Kerja ARNI (Sacubitril / Valsartan)',
    backText: '• Sacubitril: Menghambat enzim Neprilisin -> Mencegah degradasi peptida natriuretik (BNP).\n• Valsartan: Memblok reseptor Angiotensin II tipe 1 (AT1).\n• Washout Period: Wajib jeda 36 jam dari ACEI.',
    hint: 'Pilar utama terapi gagal jantung HFrEF'
  },
  {
    id: 'fc-27',
    category: 'Interaksi Kritis',
    frontText: 'Interaksi Mayor Statin (Simvastatin) + Gemfibrozil / Klaritromisin',
    backText: 'Meningkatkan kadar serum Simvastatin secara drastis -> Risiko fatal RABDOMIOLISIS & Gagal Ginjal Akut.\n\n• Solusi: Gunakan Fenofibrat (jika butuh fibrat) atau ganti dengan Atorvastatin / Rosuvastatin dosis rendah.',
    hint: 'Penghambatan enzim CYP3A4 & glukuronidasi'
  },
  {
    id: 'fc-28',
    category: 'Interaksi Kritis',
    frontText: 'Interaksi Kritis Warfarin + Antibiotik Fluoroquinolon / Kotrimoksazol',
    backText: 'Menghambat metabolisme hepatik Warfarin dan mengeliminasi flora normal usus penghasil Vitamin K -> Nilai INR melonjak tinggi -> RISIKO PERDARAHAN MAYOR.',
    hint: 'Pemantauan ketat nilai PT / INR'
  },
  {
    id: 'fc-29',
    category: 'Nilai Normal Lab',
    frontText: 'Nilai Normal & Kritis: Kalium Serum (K+)',
    backText: '• Normal: 3,5 - 5,0 mEq/L\n• Hipokalemia (< 3,5): Aritmia, kelemahan otot, meningkatkan toksisitas Digoksin.\n• Hiperkalemia (> 5,5): Gelombang T tinggi (peaked T wave), aritmia fatal ventrikel.',
    hint: 'Kation intraseluler utama'
  },
  {
    id: 'fc-30',
    category: 'Nilai Normal Lab',
    frontText: 'Kategori Laju Filtrasi Glomerulus (eGFR) KDIGO G1 - G5',
    backText: '• G1: eGFR >= 90 mL/min (Normal/Tinggi)\n• G2: eGFR 60 - 89 (Penurunan Ringan)\n• G3a: eGFR 45 - 59 (Penurunan Ringan-Sedang)\n• G3b: eGFR 30 - 44 (Penurunan Sedang-Berat)\n• G4: eGFR 15 - 29 (Penurunan Berat)\n• G5: eGFR < 15 (Gagal Ginjal Terminal / Dialisis)',
    hint: 'Klasifikasi stadium penyakit ginjal kronis'
  },
  {
    id: 'fc-31',
    category: 'Regulasi & DOWA',
    frontText: 'Perbedaan Surat Pesanan Narkotika vs Psikotropika vs Prekursor vs OOT',
    backText: '• SP Narkotika: Form khusus N-9, RANGKAP 4, HANYA 1 JENIS OBAT per lembar.\n• SP Psikotropika: Rangkap 3, boleh > 1 jenis obat psikotropika.\n• SP Prekursor: Rangkap 3, khusus obat mengandung pseudoefedrin/efedrin.\n• SP OOT: Rangkap 3, khusus Tramadol, Triheksifenidil, Klorpromazin, Amitriptilin, Haloperidol, Dekstrometorfan.',
    hint: 'Permenkes No. 3/2015 & PerBPOM'
  },
  {
    id: 'fc-32',
    category: 'Regulasi & DOWA',
    frontText: 'Masa Simpan Berkas Resep dan Ketentuan Pemusnahan',
    backText: '• Berkas resep disimpan MINIMAL 5 TAHUN.\n• Pemusnahan dilakukan oleh Apoteker Penanggung Jawab dengan membuat Berita Acara Pemusnahan Resep disaksikan petugas apotek.',
    hint: 'Permenkes Standar Pelayanan Apotek'
  },
  {
    id: 'fc-33',
    category: 'Mekanisme Obat (MoA)',
    frontText: 'Perbedaan Kerja Diuretik Furosemid vs Hidroklorotiazid (HCT) vs Spironolakton',
    backText: '• Furosemid (Loop Diuretic): Menghambat symporter Na+/K+/2Cl- di ansa Henle asenden tebal (efek diuresis paling kuat).\n• HCT (Thiazide): Menghambat symporter Na+/Cl- di tubulus kontortus distal.\n• Spironolakton (MRA): Antagonis reseptor aldosteron di duktus koligentes (hemat kalium).',
    hint: 'Lokasi nefron tempat kerja obat'
  },
  {
    id: 'fc-34',
    category: 'Efek Samping Khas',
    frontText: 'Efek Samping Batuk Kering Golongan ACEI & Solusinya',
    backText: 'Disebabkan oleh hambatan degradasi BRADIKININ dan substansi P di saluran napas.\n\n• Solusi: Ganti ke golongan ARB (Kandesartan, Valsartan, Telmisartan) yang tidak mempengaruhi jalur bradikinin.',
    hint: 'Kaptopril, Ramipril, Lisinopril'
  },
  {
    id: 'fc-35',
    category: 'Nilai Normal Lab',
    frontText: 'Target Tekanan Darah JNC 8 & Konsensus PERKI',
    backText: '• Usia < 60 tahun / Komorbid DM / CKD: Target < 140/90 mmHg (atau < 130/80 mmHg menurut AHA 2017).\n• Usia >= 60 tahun tanpa DM/CKD: Target < 150/90 mmHg.',
    hint: 'Pedoman penanganan hipertensi dewasa'
  },
  {
    id: 'fc-36',
    category: 'Singkatan Latin & BUD',
    frontText: 'Arti Singkatan Latin: a.c., d.c., p.c., o.u., o.d., o.s., a.u., a.d., a.s.',
    backText: '• a.c. (ante coenam) = Sebelum makan\n• d.c. (durante coenam) = Pada saat makan\n• p.c. (post coenam) = Sesudah makan\n• o.d. (oculo dextro) = Mata kanan\n• o.s. (oculo sinistro) = Mata kiri\n• o.u. (oculo utro) = Kedua mata\n• a.d. (auri dextrae) = Telinga kanan\n• a.s. (auri sinistrae) = Telinga kiri\n• a.u. (auri utriusque) = Kedua telinga.',
    hint: 'Singkatan rute mata, telinga, dan waktu makan'
  },
  {
    id: 'fc-37',
    category: 'Singkatan Latin & BUD',
    frontText: 'Beyond Use Date (BUD) USP <795> Sediaan Cair Oral Racikan Mengandung Air',
    backText: 'Maksimal 14 HARI pada suhu dingin terkendali (2°C - 8°C).\n\n• Contoh: Suspensi racikan puyer dalam sirup/air, larutan oral yang mengandung air.',
    hint: 'Racikan oral berbahan air, wajib disimpan di lemari pendingin'
  },
  {
    id: 'fc-38',
    category: 'Singkatan Latin & BUD',
    frontText: 'Beyond Use Date (BUD) Sediaan Racikan Semi-Padat Bebas Air (Salep / Basis Lemak)',
    backText: 'Maksimal 6 BULAN atau tidak lebih dari waktu kadaluwarsa (ED) terpendek bahan obat penyusunnya pada suhu kamar terkendali (20°C - 25°C).\n\n• Contoh: Salep basis vaselin/parafin tanpa kandungan fase air.',
    hint: 'Sediaan topikal non-air menurut standar USP <795>'
  },
  {
    id: 'fc-39',
    category: 'Mekanisme Obat (MoA)',
    frontText: 'Mekanisme Kerja Antibiotik Utama: Dinding Sel vs Protein 30S vs Protein 50S vs DNA Girase',
    backText: '• Sintesis Dinding Sel: Golongan Beta-Laktam (Penisilin, Sefalosporin, Karbapenem) & Vankomisin.\n• Subunit Ribosom 30S: Aminoglikosida (Gentamisin) & Tetrasiklin (Doksisiklin).\n• Subunit Ribosom 50S: Makrolida (Azitromisin, Eritromisin) & Kloramfenikol & Klindamisin.\n• Replikasi DNA (DNA Girase / Topoisomerase IV): Golongan Fluorokuinolon (Siprofloksasin, Levofloksasin).',
    hint: 'Klasifikasi target molekuler antibakteri'
  },
  {
    id: 'fc-40',
    category: 'Interaksi Kritis',
    frontText: 'Interaksi Fatal Klopidogrel (Clopidogrel) + Omeprazol',
    backText: 'Omeprazol adalah INHIBITOR KUAT CYP2C19 yang menghambat bioaktivasi Klopidogrel (prodrug) menjadi metabolit aktifnya.\n\n• Akibat: Efek antiplatelet Klopidogrel anjlok drastis (risiko serangan jantung / trombosis stent berulang).\n• Solusi: Ganti ke Pantoprazol yang memiliki hambatan CYP2C19 paling minimal.',
    hint: 'Kombinasi antiplatelet dan PPI asam lambung'
  },
  {
    id: 'fc-41',
    category: 'Interaksi Kritis',
    frontText: 'Interaksi Fatal Sildenafil (Viagra) + Nitrogliserin / ISDN',
    backText: 'KONTRAINDIKASI MUTLAK! Menyebabkan vasodilatasi arteri masif dan HIPOTENSI REFRAKTER EKSTREM yang dapat memicu kematian mendadak akibat syok sirkulasi.\n\n• Mekanisme: Nitrogliserin merangsang pembentukan cGMP via Nitric Oxide, sedangkan Sildenafil menghambat enzim PDE-5 yang memecah cGMP.',
    hint: 'Obat disfungsi ereksi dan vasodilator nitrat angina'
  },
  {
    id: 'fc-42',
    category: 'Efek Samping Khas',
    frontText: 'Efek Samping Toksisitas Khas Digoksin & Tanda Intoksikasi Digitalis',
    backText: '1. Penglihatan tampak kuning-kehijauan (XANTHOPSIA) dan melihat lingkaran cahaya (halo vision).\n2. Gangguan ritme jantung: Aritmia ventrikel & bradikardia berat.\n3. Saluran cerna: Mual muntah hebat dan anoreksia.\n\n• Catatan: Hipokalemia meningkatkan risiko intoksikasi Digoksin. Antidotum: Digoxin Immune Fab (DigiFab).',
    hint: 'Glikosida jantung indeks terapi sempit'
  },
  {
    id: 'fc-43',
    category: 'Efek Samping Khas',
    frontText: 'Efek Samping Khas Etambutol (OAT Lini 1 TB)',
    backText: 'NEURITIS OPTIK (Retrobulbar Optic Neuritis) yang ditandai dengan penurunan tajam penglihatan dan BUTA WARNA MERAH-HIJAU.\n\n• Monitoring: Uji ketajaman penglihatan (Snellen chart) dan uji buta warna (Ishihara chart) berkala.',
    hint: 'Obat antituberkulosis huruf E'
  },
  {
    id: 'fc-44',
    category: 'Antidotum',
    frontText: 'Antidotum Toksisitas Overdosis Beta Blocker (Propranolol / Bisoprolol)',
    backText: 'GLUKAGON Intravena (Glucagon IV)\n\n• Mekanisme: Mengaktifkan reseptor glukagon di miokardium yang menstimulasi adenilat siklase secara independen tanpa melalui reseptor beta-adrenergik, meningkatkan kadar cAMP intrakardiak dan memulihkan kontraktilitas jantung (efek inotropik & kronotropik positif).',
    hint: 'Hormon polipeptida pankreas antagonis insulin'
  },
  {
    id: 'fc-45',
    category: 'Regulasi & DOWA',
    frontText: 'Daftar Obat Wajib Apotek (DOWA 2 & 3) untuk Masalah Asam Lambung',
    backText: '• Omeprazole (DOWA 2): Maksimal 7 TABLET (20 mg) per pasien.\n• Ranitidin 150 mg (DOWA 3): Maksimal 10 TABLET per pasien.\n• Sukralfat (DOWA 2): Maksimal 20 TABLET per pasien.\n\n• Syarat: Apoteker memberikan konseling dan memastikan pasien sudah pernah menggunakan obat tersebut sebelumnya.',
    hint: 'Kepmenkes No. 924/1993 dan No. 1176/1999'
  }
];

// ==========================================
// EDUKASI & PENJELASAN RUMUS LENGKAP UKMPPAI & UKTVF
// ==========================================

export interface CalculationFormulaDetail {
  id: 'alligation' | 'hlb' | 'tonicity' | 'pk' | 'hja' | 'icer' | 'consumption' | 'friability' | 'bsa' | 'crcl' | 'rop';
  title: string;
  categoryName: string;
  badgeDomain: string;
  mathFormula: string[];
  variableExplanations: { symbol: string; meaning: string }[];
  conceptExplanation: string;
  stepByStepGuide: string[];
  exampleCase: {
    vignette: string;
    question: string;
    stepByStepCalculation: string[];
    finalAnswer: string;
  };
  examKeyPearls: string[];
  referenceStandard: string;
}

export const CALCULATION_FORMULA_DETAILS: Record<string, CalculationFormulaDetail> = {
  alligation: {
    id: 'alligation',
    title: 'Aligasi Silang (Alligation Alternate Method)',
    categoryName: 'Teknologi & Farmasetika Dasar',
    badgeDomain: 'Farmasetika',
    mathFormula: [
      'Bagian Larutan Konsentrasi Tinggi (A) = |Konsentrasi Tinggi - Konsentrasi Target|',
      'Bagian Larutan Konsentrasi Rendah / Pelarut (B) = |Konsentrasi Target - Konsentrasi Rendah|',
      'Total Bagian Campuran = Bagian A + Bagian B',
      'Volume Larutan A yang Diambil = (Bagian A / Total Bagian) × Volume Akhir Target',
      'Volume Larutan B yang Diambil = (Bagian B / Total Bagian) × Volume Akhir Target'
    ],
    variableExplanations: [
      { symbol: 'Konsentrasi Tinggi (A)', meaning: 'Kadar larutan stok pekat yang tersedia di instalasi/apotek (misal: Alkohol 96%).' },
      { symbol: 'Konsentrasi Rendah (B)', meaning: 'Kadar larutan encer atau pelarut murni seperti Aquades (dihitung 0%).' },
      { symbol: 'Konsentrasi Target (C)', meaning: 'Kadar larutan akhir yang diinginkan pada resep/formulasi (misal: Alkohol 70%).' },
      { symbol: 'Volume Akhir Target (V)', meaning: 'Jumlah total volume sediaan yang diminta (misal: 500 mL).' }
    ],
    conceptExplanation: 'Metode Aligasi Silang adalah teknik matematika farmasetika cepat untuk menentukan perbandingan proporsi pencampuran dua atau lebih sediaan berkonsentrasi berbeda untuk memperoleh konsentrasi campuran tertentu tanpa memerlukan persamaan aljabar bertingkat.',
    stepByStepGuide: [
      'Langkah 1: Tuliskan Konsentrasi Target tepat di posisi tengah skema aligasi.',
      'Langkah 2: Tuliskan Konsentrasi Tinggi di kiri atas, dan Konsentrasi Rendah (atau 0% untuk pelarut) di kiri bawah.',
      'Langkah 3: Kurangkan secara diagonal (silang) dengan nilai mutlak positif untuk mendapatkan jumlah bagian masing-masing komponen.',
      'Langkah 4: Jumlahkan seluruh bagian untuk mendapatkan Total Bagian campuran.',
      'Langkah 5: Kalikan fraksi tiap bagian dengan Volume Total sediaan yang akan dibuat.'
    ],
    exampleCase: {
      vignette: 'Seorang apoteker di rumah sakit diminta menyiapkan 500 mL larutan Alkohol 70% untuk kebutuhan desinfeksi ruang steril. Di gudang farmasi hanya tersedia stok Alkohol 96% dan Aquades steril (0%).',
      question: 'Berapakah volume Alkohol 96% dan Aquades yang harus diambil dan dicampurkan?',
      stepByStepCalculation: [
        '1. Bagian Alkohol 96% = |70% - 0%| = 70 bagian',
        '2. Bagian Aquades 0% = |96% - 70%| = 26 bagian',
        '3. Total Bagian Campuran = 70 + 26 = 96 bagian',
        '4. Volume Alkohol 96% yang diambil = (70 / 96) × 500 mL = 364,58 mL',
        '5. Volume Aquades yang diambil = (26 / 96) × 500 mL = 135,42 mL'
      ],
      finalAnswer: 'Ambil 364,58 mL Alkohol 96% dan tambahkan Aquades steril sebanyak 135,42 mL (atau ad 500 mL).'
    },
    examKeyPearls: [
      'Jika pelarut yang digunakan adalah air murni/aquades/basis salep putih polos, konsentrasinya selalu bernilai 0%.',
      'Untuk pengenceran sederhana dengan air tanpa zat aktif lain, rumus V1 × C1 = V2 × C2 juga dapat digunakan dan menghasilkan nilai yang identik.',
      'Metode aligasi juga berlaku untuk sediaan semi-padat (salep/krim) dalam satuan gram.'
    ],
    referenceStandard: 'Ansel’s Pharmaceutical Calculations & Farmakope Indonesia VI'
  },
  hlb: {
    id: 'hlb',
    title: 'Penentuan Nilai HLB Campuran Emulgator Surfaktan',
    categoryName: 'Teknologi Sediaan Cair & Semisolid',
    badgeDomain: 'Teknologi Farmasi',
    mathFormula: [
      'RHLB Campuran = (Fraksi A × HLB A) + (Fraksi B × HLB B)',
      'Bobot Surfaktan A = [(RHLB Target - HLB B) / (HLB A - HLB B)] × Bobot Total Emulgator',
      'Bobot Surfaktan B = Bobot Total Emulgator - Bobot Surfaktan A'
    ],
    variableExplanations: [
      { symbol: 'RHLB Target', meaning: 'Required HLB dari fase minyak yang akan diemulsikan (misal: Parafin cair RHLB = 12).' },
      { symbol: 'HLB A', meaning: 'Nilai HLB dari surfaktan pertama yang lebih hidrofilik (misal: Tween 80 dengan HLB 15).' },
      { symbol: 'HLB B', meaning: 'Nilai HLB dari surfaktan kedua yang lebih lipofilik (misal: Span 80 dengan HLB 4,3).' },
      { symbol: 'Bobot Total Emulgator', meaning: 'Total gram kombinasi surfaktan yang tertulis pada formula resep (misal: 5 gram).' }
    ],
    conceptExplanation: 'Sistem Griffin (skala 1–20) mengukur keseimbangan gugus hidrofilik (suka air) dan lipofilik (suka minyak) pada molekul surfaktan. Menggabungkan surfaktan hidrofilik (Tween) dan lipofilik (Span) menghasilkan lapisan film monomolekular yang jauh lebih elastis dan kokoh pada antarmuka fase minyak-air dibandingkan surfaktan tunggal.',
    stepByStepGuide: [
      'Langkah 1: Identifikasi nilai RHLB dari minyak yang akan diemulsikan.',
      'Langkah 2: Tentukan nilai HLB dari masing-masing surfaktan yang digunakan (misal Tween dan Span).',
      'Langkah 3: Gunakan rumus alokasi fraksi aljabar atau aligasi untuk menghitung fraksi bobot surfaktan A.',
      'Langkah 4: Kalikan fraksi tersebut dengan total bobot campuran emulgator pada resep untuk mendapatkan gram penimbangan riil.'
    ],
    exampleCase: {
      vignette: 'R/ Parafin Cair 20 g, Emulgator Campuran 5 g (Kombinasi Tween 80 HLB 15 dan Span 80 HLB 4,3), Aquades ad 100 mL. Nilai RHLB Parafin cair adalah 12.',
      question: 'Berapakah gram Tween 80 dan Span 80 yang harus ditimbang oleh apoteker?',
      stepByStepCalculation: [
        '1. Selisih nilai HLB kedua surfaktan = 15 - 4,3 = 10,7',
        '2. Bobot Tween 80 = [(12 - 4,3) / 10,7] × 5 g = (7,7 / 10,7) × 5 g = 3,60 gram',
        '3. Bobot Span 80 = 5 g - 3,60 g = 1,40 gram'
      ],
      finalAnswer: 'Ditimbang Tween 80 sebanyak 3,60 gram dan Span 80 sebanyak 1,40 gram.'
    },
    examKeyPearls: [
      'TWEEN selalu bersifat HIDROFILIK (larut air, HLB tinggi > 10, contoh Tween 80 = 15).',
      'SPAN selalu bersifat LIPOFILIK (larut minyak, HLB rendah < 10, contoh Span 80 = 4,3).',
      'Emulsi tipe M/A (Minyak dalam Air) membutuhkan RHLB tinggi (8–16), sedangkan emulsi A/M (Air dalam Minyak) butuh RHLB rendah (3–6).'
    ],
    referenceStandard: 'Martin’s Physical Pharmacy & Pharmaceutical Sciences & Ansel'
  },
  tonicity: {
    id: 'tonicity',
    title: 'Tonisitas & Ekivalensi NaCl (Metode E-NaCl Sprowls)',
    categoryName: 'Teknologi Sediaan Steril (Injeksi & Tetes Mata)',
    badgeDomain: 'Farmasi Steril',
    mathFormula: [
      'Kebutuhan NaCl Isotonis Murni = (0,9 / 100) × Volume Sediaan (mL) = 0,009 × V',
      'Kontribusi Tonisitas Zat Aktif (Setara NaCl) = Bobot Zat Aktif (gram) × Nilai E',
      'Kekurangan NaCl yang Wajib Ditambahkan = Kebutuhan NaCl Murni - ∑(Bobot Zat Aktif × E)',
      'Jika Pengisotonis Menggunakan Dekstrosa = Kekurangan NaCl / E Dekstrosa (E Dekstrosa = 0,18)'
    ],
    variableExplanations: [
      { symbol: 'V', meaning: 'Volume total larutan steril yang akan dibuat dalam satuan mililiter (mL).' },
      { symbol: 'Nilai E (Ekivalensi NaCl)', meaning: 'Jumlah gram NaCl yang memiliki efek osmotik setara dengan 1 gram zat aktif tersebut.' },
      { symbol: '0,9%', meaning: 'Konsentrasi larutan NaCl fisiologis isotonis terhadap cairan tubuh dan plasma darah manusia.' }
    ],
    conceptExplanation: 'Sediaan injeksi, infus, dan tetes mata (oftalmik) wajib memiliki tekanan osmosis yang setara dengan larutan NaCl 0,9% b/v (penurunan titik beku ΔTf = -0,52°C). Larutan hipotonis dapat menyebabkan hemolisis sel darah merah atau rasa perih menyengat pada mukosa mata, sehingga kekurangan tonisitas harus digenapi dengan penambahan NaCl atau Dekstrosa.',
    stepByStepGuide: [
      'Langkah 1: Hitung total bobot NaCl murni yang dibutuhkan agar volume sediaan isotonis (0,9 g per 100 mL).',
      'Langkah 2: Hitung bobot masing-masing zat aktif dalam gram, lalu kalikan dengan nilai ekivalensi NaCl (E) masing-masing zat.',
      'Langkah 3: Kurangkan total kebutuhan NaCl dengan jumlah tonisitas yang telah disumbangkan oleh zat aktif.',
      'Langkah 4: Selisih positif adalah bobot NaCl yang wajib ditambahkan ke dalam formula.'
    ],
    exampleCase: {
      vignette: 'R/ Ranitidin HCl 1% (Nilai E = 0,16), m.f. sol. isot. ad 100 mL. Apoteker diminta menambahkan pengisotonis NaCl.',
      question: 'Berapa gram NaCl yang harus ditambahkan ke dalam larutan tersebut?',
      stepByStepCalculation: [
        '1. Kebutuhan NaCl isotonis 100 mL = (0,9 / 100) × 100 mL = 0,90 gram',
        '2. Bobot Ranitidin HCl = 1% × 100 mL = 1,00 gram',
        '3. Kontribusi tonisitas Ranitidin = 1,00 g × 0,16 = 0,16 gram setara NaCl',
        '4. Kekurangan NaCl = 0,90 g - 0,16 g = 0,74 gram'
      ],
      finalAnswer: 'Ditambahkan NaCl murni sebanyak 0,74 gram ke dalam sediaan.'
    },
    examKeyPearls: [
      'Jika hasil pengurangan bernilai negatif atau nol, sediaan tersebut telah HIPERTONIS (tidak boleh ditambahkan NaCl lagi).',
      'Jika soal meminta zat pengisotonis berupa Glukosa/Dekstrosa, bagi kekurangan NaCl dengan E-Glukosa (0,18) -> 0,74 / 0,18 = 4,11 gram Dekstrosa.',
      'Metode penurunan titik beku (ΔTf): Larutan isotonis memiliki ΔTf = 0,52°C.'
    ],
    referenceStandard: 'Farmakope Indonesia Edisi VI & Remington: The Science and Practice of Pharmacy'
  },
  pk: {
    id: 'pk',
    title: 'Farmakokinetika Klinis (Loading Dose, Maintenance Dose, Kel, t½)',
    categoryName: 'Farmakokinetika Klinis & TDM',
    badgeDomain: 'Farmasi Klinis',
    mathFormula: [
      'Loading Dose (LD) = (Css × Vd) / F',
      'Maintenance Dose (MD) = (Css × Cl) / F = [Css × (Kel × Vd)] / F',
      'Konstanta Eliminasi (Kel) = Cl / Vd = ln(2) / t½ = 0,693 / t½',
      'Waktu Paruh Eliminasi (t½) = 0,693 / Kel'
    ],
    variableExplanations: [
      { symbol: 'Css', meaning: 'Target kadar tunak obat dalam plasma darah pada rentang terapeutik (mg/L atau mcg/mL).' },
      { symbol: 'Vd', meaning: 'Volume distribusi obat semu di dalam tubuh pasien (Liter atau L/kg).' },
      { symbol: 'Cl', meaning: 'Klirens total pembersihan obat dari tubuh oleh organ ginjal dan hepar (L/jam atau mL/menit).' },
      { symbol: 'Kel', meaning: 'Konstanta laju eliminasi fraksi obat per satuan waktu (jam⁻¹).' },
      { symbol: 'F', meaning: 'Fraksi bioavailabilitas sediaan (F = 1,0 untuk rute Intravena / IV).' }
    ],
    conceptExplanation: 'Loading Dose (Dosis Muatan) diberikan untuk mempercepat tercapainya konsentrasi terapeutik efektif (Css) sesegera mungkin pada kondisi darurat klinis. Maintenance Dose (Dosis Pemeliharaan) diberikan secara berkala atau infus kontinu untuk mengimbangi laju eliminasi obat sehingga kadar tunak stabil tidak fluktuatif.',
    stepByStepGuide: [
      'Langkah 1: Tentukan target konsentrasi plasma terapeutik (Css) dan volume distribusi (Vd) pasien.',
      'Langkah 2: Hitung Loading Dose (LD) dengan mengalikan Css × Vd.',
      'Langkah 3: Hitung Maintenance Dose (MD) dengan mengalikan Css × Klirens total (Cl).',
      'Langkah 4: Hitung konstanta eliminasi Kel = Cl / Vd, lalu cari waktu paruh t½ = 0,693 / Kel.'
    ],
    exampleCase: {
      vignette: 'Seorang pasien pria 60 kg di ICU mengalami serangan asma akut berat dan membutuhkan terapi infus Aminofilin. Parameter klinis: Target Css = 10 mg/L, Vd = 30 Liter, dan Klirens total = 2 L/jam (Bioavailabilitas IV F = 1).',
      question: 'Berapakah Dosis Muatan (LD) dan Dosis Pemeliharaan (MD) Aminofilin yang harus diberikan?',
      stepByStepCalculation: [
        '1. Loading Dose (LD) = Css × Vd = 10 mg/L × 30 L = 300 mg (diberikan bolus IV lambat)',
        '2. Maintenance Dose (MD) = Css × Cl = 10 mg/L × 2 L/jam = 20 mg/jam (laju infus syringe pump)',
        '3. Kel = Cl / Vd = 2 L/jam / 30 L = 0,0667 jam⁻¹',
        '4. Waktu paruh t½ = 0,693 / 0,0667 = 10,39 jam'
      ],
      finalAnswer: 'Loading Dose = 300 mg bolus IV, Maintenance Dose = 20 mg/jam infus kontinu.'
    },
    examKeyPearls: [
      'Waktu untuk mencapai kondisi tunak (Steady State) dari awal infus tanpa Loading Dose adalah 4 - 5 kali waktu paruh (4–5 × t½).',
      'Jika obat diberikan per oral, JANGAN LUPA membagi hasil perhitungan dengan bioavailabilitas oral F (Dosis Oral = Dosis IV / F).',
      'Aminofilin mengandung sekitar 80–85% Teofilin anhidrat aktif (faktor konversi S = 0,8–0,85).'
    ],
    referenceStandard: 'Shargel Applied Biopharmaceutics & Pharmacokinetics 8th Ed & Winter’s Basic Clinical Pharmacokinetics'
  },
  hja: {
    id: 'hja',
    title: 'Harga Jual Apotek (HJA), Margin, Mark-Up, & Pajak PPN',
    categoryName: 'Manajemen Farmasi & Akuntansi Apotek',
    badgeDomain: 'Manajemen & Farmakoekonomi',
    mathFormula: [
      'HPP Termasuk PPN = Harga Netto Faktur PBF × (1 + Tarif PPN%)',
      'HJA (Berdasarkan Target Margin Laba) = HPP Termasuk PPN / (1 - Margin%)',
      'HJA (Berdasarkan Mark-Up Factor) = HPP Termasuk PPN × (1 + Mark-Up%)',
      'Laba Kotor (Gross Profit) = HJA - HPP Termasuk PPN'
    ],
    variableExplanations: [
      { symbol: 'HPP Netto PBF', meaning: 'Harga beli bersih obat dari Pedagang Besar Farmasi sebelum pajak/diskon.' },
      { symbol: 'Tarif PPN', meaning: 'Pajak Pertambahan Nilai sesuai ketentuan perpajakan resmi Indonesia (11% atau 12%).' },
      { symbol: 'Margin Laba (%)', meaning: 'Persentase keuntungan dihitung dari HARGA JUAL (HJA) sebagai penyebut: (Laba / HJA) × 100%.' },
      { symbol: 'Mark-Up (%)', meaning: 'Persentase kenaikan harga dihitung dari HARGA POKOK (HPP) sebagai penyebut: (Laba / HPP) × 100%.' }
    ],
    conceptExplanation: 'Perhitungan HJA adalah kompetensi esensial manajerial apoteker untuk menjamin keberlanjutan finansial apotek dengan memperhitungkan biaya pokok perolehan (HPP), kewajiban pajak PPN negara, biaya operasional, dan target profitabilitas yang sehat.',
    stepByStepGuide: [
      'Langkah 1: Hitung HPP riil dengan menambahkan tarif PPN (misal dikali 1,11).',
      'Langkah 2: Cermati apakah soal menggunakan istilah "Margin" atau "Mark-Up".',
      'Langkah 3: Jika menggunakan target MARGIN X%, bagi HPP dengan (1 - X/100).',
      'Langkah 4: Jika menggunakan faktor MARK-UP Y%, kalikan HPP dengan (1 + Y/100).'
    ],
    exampleCase: {
      vignette: 'Apoteker memesan 1 box Cefixime 100 mg (isi 30 kapsul) dari PBF dengan harga netto Rp 90.000. Faktur dikenakan PPN 11%. Apoteker menetapkan target margin keuntungan sebesar 20% dari harga jual.',
      question: 'Berapakah Harga Jual Apotek (HJA) untuk 1 box dan per kapsul Cefixime tersebut?',
      stepByStepCalculation: [
        '1. HPP termasuk PPN = Rp 90.000 × 1,11 = Rp 99.900 per box',
        '2. HJA per box (Margin 20%) = Rp 99.900 / (1 - 0,20) = Rp 99.900 / 0,80 = Rp 124.875 per box',
        '3. HJA per kapsul = Rp 124.875 / 30 kapsul = Rp 4.162,50 (dibulatkan Rp 4.200 per kapsul)',
        '4. Laba kotor per box = Rp 124.875 - Rp 99.900 = Rp 24.975 (tepat 20% dari HJA)'
      ],
      finalAnswer: 'HJA 1 Box = Rp 124.875, HJA per Kapsul = Rp 4.163.'
    },
    examKeyPearls: [
      'JANGAN TERTUKAR: Margin 20% BUKAN dikali 1,20! Margin 20% berarti dibagi 0,80.',
      'Jika soal menyebutkan "faktor pengali / mark-up 1,25x", barulah HPP dikalikan 1,25.',
      'Jika pada faktur PBF tertulis harga "sudah termasuk PPN", jangan dikalikan PPN lagi.'
    ],
    referenceStandard: 'Modul Manajemen Farmasi Komunitas IAI & Asosiasi Pendidikan Farmasi Indonesia (APFI)'
  },
  icer: {
    id: 'icer',
    title: 'Farmakoekonomi (Incremental Cost-Effectiveness Ratio / ICER)',
    categoryName: 'Farmakoekonomi & Penilaian Teknologi Kesehatan (HTA)',
    badgeDomain: 'Farmakoekonomi',
    mathFormula: [
      'ICER = ΔCost / ΔEffect = (Biaya Terapi Baru B - Biaya Terapi Standar A) / (Efektivitas Terapi B - Efektivitas Terapi A)',
      'Threshold WTP (Willingness-to-Pay) Kemenkes RI = 1 s.d. 3 × Produk Domestik Bruto (PDB) per Kapita Indonesia'
    ],
    variableExplanations: [
      { symbol: 'ΔCost (Selisih Biaya)', meaning: 'Tambahan biaya moneter langsung pengobatan terapi baru dibandingkan komparator (Rp).' },
      { symbol: 'ΔEffect (Selisih Efektivitas)', meaning: 'Tambahan luaran klinis yang diperoleh (misal: per % HbA1c, per mmHg tensi turun, per tahun usia hidup QALY).' },
      { symbol: 'WTP Threshold', meaning: 'Batas maksimal dana yang bersedia dibayarkan negara/pembayar untuk 1 unit efektivitas tambahan.' }
    ],
    conceptExplanation: 'ICER adalah parameter kuantitatif utama dalam analisis Cost-Effectiveness Analysis (CEA) dan Cost-Utility Analysis (CUA) untuk membantu pengambil kebijakan obat nasional (Kemenkes/BPJS) memutuskan apakah obat baru yang lebih mahal layak masuk Formularium Nasional (FORNAS) karena memberikan efektivitas ekstra yang sebanding.',
    stepByStepGuide: [
      'Langkah 1: Hitung selisih biaya antara kelompok terapi baru (B) dan terapi pembanding standar (A).',
      'Langkah 2: Hitung selisih luaran efektivitas antara kelompok terapi B dan A.',
      'Langkah 3: Bagi selisih biaya (ΔCost) dengan selisih efektivitas (ΔEffect).',
      'Langkah 4: Bandingkan nilai ICER dengan ambang batas WTP (1–3x PDB per kapita nasional).'
    ],
    exampleCase: {
      vignette: 'Dalam studi farmakoekonomi antihipertensi, Regimen A (Standar) berbiaya Rp 1.500.000 dengan persentase pasien mencapai target tensi 60%. Regimen B (Kombinasi Baru) berbiaya Rp 4.000.000 dengan capaian target tensi 85%.',
      question: 'Berapakah nilai rasio inkremental biaya-efektivitas (ICER) Regimen B terhadap Regimen A?',
      stepByStepCalculation: [
        '1. ΔCost = Rp 4.000.000 - Rp 1.500.000 = Rp 2.500.000',
        '2. ΔEffect = 85% - 60% = 25% (atau 0,25)',
        '3. ICER = Rp 2.500.000 / 25% = Rp 100.000 per 1% kenaikan efektivitas (atau Rp 10.000.000 per penambahan 1 pasien terkontrol penuh)'
      ],
      finalAnswer: 'Nilai ICER = Rp 100.000 per 1% peningkatan efektivitas klinis.'
    },
    examKeyPearls: [
      '4 Tipe Evaluasi Farmakoekonomi:',
      '• CMA (Cost-Minimization): Efektivitas sama persis, hanya pilih biaya terendah.',
      '• CBA (Cost-Benefit): Biaya dan hasil diukur dalam satuan moneter (Rupiah/Dolar).',
      '• CEA (Cost-Effectiveness): Hasil diukur dalam unit klinis alami (mmHg, HbA1c).',
      '• CUA (Cost-Utility): Hasil diukur dalam QALY (Quality Adjusted Life Years).'
    ],
    referenceStandard: 'Pedoman Penerapan Farmakoekonomi Kementerian Kesehatan Republik Indonesia'
  },
  consumption: {
    id: 'consumption',
    title: 'Perencanaan Pengadaan Obat: Metode Konsumsi Terkoreksi',
    categoryName: 'Manajemen Pengadaan & Rantai Pasok Farmasi',
    badgeDomain: 'Manajemen Farmasi',
    mathFormula: [
      'Kebutuhan Total = (Konsumsi Rata-Rata × Periode Rencana) + (Konsumsi Rata-Rata × Lead Time) + Safety Stock',
      'Kuantitas Surat Pesanan (SP) = Kebutuhan Total - Sisa Stok Gudang - Stok Sedang Dipesan (Open Order)',
      'Reorder Point (ROP) = (Konsumsi Rata-Rata × Lead Time) + Safety Stock'
    ],
    variableExplanations: [
      { symbol: 'Konsumsi Rata-Rata (CA)', meaning: 'Rerata pemakaian obat riil per bulan (atau per hari) pada periode sebelumnya.' },
      { symbol: 'Periode Rencana (T)', meaning: 'Berapa bulan kebutuhan obat yang akan diadakan pada siklus pengadaan ini.' },
      { symbol: 'Lead Time (LT)', meaning: 'Waktu tunggu dari SP diterbitkan hingga barang fisik tiba di gudang farmasi (dalam bulan/hari).' },
      { symbol: 'Safety Stock (SS)', meaning: 'Stok pengaman/penyangga untuk mengantisipasi lonjakan kasus penyakit atau keterlambatan PBF.' },
      { symbol: 'Sisa Stok (Sisa)', meaning: 'Stok fisik riil yang masih ada di gudang saat perhitungan perencanaan dilakukan.' }
    ],
    conceptExplanation: 'Metode konsumsi adalah metode perencanaan pengadaan obat paling umum di Rumah Sakit, Puskesmas, dan Apotek karena berbasis data pemakaian riil historis. Perhitungan yang tepat mencegah terjadinya stock-out (kekosongan obat berbahaya bagi pasien) maupun over-stock (penumpukan stok yang memicu obat kadaluwarsa/ED).',
    stepByStepGuide: [
      'Langkah 1: Hitung kebutuhan selama periode rencana (Konsumsi/bln × Jumlah bln rencana).',
      'Langkah 2: Hitung kebutuhan selama lead time (Konsumsi/bln × Lead time dlm bln).',
      'Langkah 3: Jumlahkan kebutuhan periode + kebutuhan lead time + safety stock.',
      'Langkah 4: Kurangkan dengan sisa stok yang masih ada di gudang untuk mendapatkan jumlah riil yang harus dipesan.'
    ],
    exampleCase: {
      vignette: 'Instalasi Farmasi Rumah Sakit mencatat rata-rata pemakaian Amoxicillin 500 mg sebanyak 2.000 strip per bulan. Waktu tunggu PBF (lead time) adalah 0,5 bulan. Buffer stock ditetapkan 500 strip. Sisa persediaan saat ini 300 strip.',
      question: 'Berapa strip Amoxicillin yang harus dipesan dalam Surat Pesanan untuk periode 6 bulan ke depan?',
      stepByStepCalculation: [
        '1. Kebutuhan 6 bulan = 2.000 strip × 6 bulan = 12.000 strip',
        '2. Kebutuhan lead time = 2.000 strip × 0,5 bulan = 1.000 strip',
        '3. Safety stock = 500 strip',
        '4. Total Kebutuhan Pengadaan = 12.000 + 1.000 + 500 = 13.500 strip',
        '5. Jumlah yang dipesan = 13.500 strip - 300 strip (sisa stok) = 13.200 strip'
      ],
      finalAnswer: 'Jumlah Amoxicillin yang harus dipesan pada Surat Pesanan adalah 13.200 strip.'
    },
    examKeyPearls: [
      'Samakan selalu satuan waktu antara Lead Time dan Konsumsi Rata-Rata (jika konsumsi per bulan dan lead time 6 hari, maka LT = 6/30 = 0,2 bulan).',
      'Reorder Point (ROP) adalah titik batas minimum stok di mana apoteker harus segera membuat pesanan ulang ke PBF.',
      'Jika ada hari kekosongan obat (stock-out days), hitung dulu konsumsi terkoreksi = (Konsumsi Riil × Total Hari Sebulan) / (Total Hari Sebulan - Hari Kosong).'
    ],
    referenceStandard: 'Pedoman Pengelolaan Obat Publik dan Perbekalan Kesehatan Kemenkes RI & Permenkes 73/2016'
  },
  friability: {
    id: 'friability',
    title: 'Uji Kerapuhan Tablet (Friability Test) Farmakope Indonesia',
    categoryName: 'Kendali Mutu Fisik Sediaan Padat (QC Industri)',
    badgeDomain: 'Teknologi & Industri CPOB',
    mathFormula: [
      '% Kerapuhan Tablet (% F) = [(W1 - W2) / W1] × 100%',
      'Syarat Penerimaan Resmi FI VI = Nilai Kerapuhan (% F) HARUS < 1,0%'
    ],
    variableExplanations: [
      { symbol: 'W1 (Bobot Awal)', meaning: 'Bobot gabungan seluruh tablet sampel uji sebelum dimasukkan ke alat friabilator (gram).' },
      { symbol: 'W2 (Bobot Akhir)', meaning: 'Bobot gabungan tablet setelah diputar 100 kali dan dibersihkan dari debu tergerus (gram).' },
      { symbol: 'Standar Putaran', meaning: '25 putaran per menit (rpm) selama 4 menit = total 100 putaran pada drum Roche Friabilator.' }
    ],
    conceptExplanation: 'Uji kerapuhan (friabilitas) mengukur ketahanan permukaan tablet terhadap gesekan mekanis dan bantingan selama proses penyalutan (coating), pengemasan blister/strip, serta distribusi transportasi logistik. Tablet yang rapuh akan menghasilkan banyak serbuk debu dan dosis zat aktif yang tidak seragam.',
    stepByStepGuide: [
      'Langkah 1: Ambil sampel 20 tablet (atau tablet dengan bobot total minimal 6,5 gram jika bobot satuan tablet < 650 mg).',
      'Langkah 2: Bersihkan tablet dari debu awal dan timbang dengan seksama (W1).',
      'Langkah 3: Masukkan tablet ke dalam drum alat friabilator, setel 100 putaran (25 rpm selama 4 menit).',
      'Langkah 4: Keluarkan tablet, bersihkan kembali sisa debu halus dengan kuas atau hembusan udara, lalu timbang bobot akhir (W2).',
      'Langkah 5: Hitung persentase kehilangan bobot. Pastikan tidak ada tablet yang pecah/retak.'
    ],
    exampleCase: {
      vignette: 'Bagian Quality Control (QC) industri farmasi menguji kerapuhan 20 tablet Paracetamol 500 mg. Bobot awal tablet bersih sebelum uji adalah 6,520 gram. Setelah 100 putaran pada alat friabilator dan dibebasdebukan, bobot akhir tablet adalah 6,465 gram.',
      question: 'Berapakah persentase kerapuhan tablet tersebut dan bagaimana status kelulusannya menurut Farmakope Indonesia?',
      stepByStepCalculation: [
        '1. Selisih bobot hilang (W1 - W2) = 6,520 g - 6,465 g = 0,055 gram',
        '2. % Kerapuhan = (0,055 g / 6,520 g) × 100% = 0,8435% (atau 0,84%)',
        '3. Evaluasi syarat: 0,84% < 1,0% dan tidak ada tablet yang terbelah/patah'
      ],
      finalAnswer: 'Kerapuhan = 0,84% -> Status: MEMENUHI SYARAT / LULUS UJI Kerapuhan FI VI.'
    },
    examKeyPearls: [
      'Batas maksimal kerapuhan tablet menurut Farmakope Indonesia VI dan USP adalah KURANG DARI 1,0% (< 1,0%).',
      'Jika tablet terbelah (capping) atau patah selama uji, tablet otomatis TIDAK LULUS terlepas dari berapa pun persentase bobot hilangnya.',
      'Solusi formulasi jika tablet terlalu rapuh: Tingkatkan konsentrasi pengikat (binder) atau tingkatkan gaya kompresi mesin cetak tablet.'
    ],
    referenceStandard: 'Farmakope Indonesia Edisi VI (Lampiran <1216> Uji Kerapuhan Tablet) & United States Pharmacopeia (USP)'
  },
  bsa: {
    id: 'bsa',
    title: 'Luas Permukaan Tubuh (Body Surface Area / BSA Formula Mosteller)',
    categoryName: 'Dosis Onkologi, Sitostatika & Pediatrik Kritis',
    badgeDomain: 'Farmasi Klinis & Onkologi',
    mathFormula: [
      'BSA (m²) = √ [ (Tinggi Badan dlm cm × Berat Badan dlm kg) / 3600 ]',
      'Dosis Individual Pasien (mg) = BSA Pasien (m²) × Dosis Standar Protokol (mg/m²)'
    ],
    variableExplanations: [
      { symbol: 'Tinggi Badan (cm)', meaning: 'Tinggi badan aktual pasien dalam sentimeter.' },
      { symbol: 'Berat Badan (kg)', meaning: 'Berat badan aktual pasien dalam kilogram.' },
      { symbol: '3600', meaning: 'Konstanta pembagi matematis baku formula Mosteller.' },
      { symbol: 'BSA Rata-Rata Normal', meaning: 'Nilai BSA standar acuan orang dewasa fisiologis normal adalah 1,73 m².' }
    ],
    conceptExplanation: 'Luas Permukaan Tubuh (BSA) adalah metode kalkulasi dosis paling akurat dan berkorelasi langsung dengan laju metabolisme basal, curah jantung, dan laju filtrasi glomerulus ginjal. Digunakan secara wajib pada regimen obat sitostatika kemoterapi kanker dan obat-obat toksik indeks terapi sempit.',
    stepByStepGuide: [
      'Langkah 1: Kalikan Tinggi Badan (cm) dengan Berat Badan (kg).',
      'Langkah 2: Bagi hasil perkalian tersebut dengan angka 3600.',
      'Langkah 3: Tarik akar kuadrat (√) dari hasil pembagian untuk memperoleh nilai BSA dalam satuan meter persegi (m²).',
      'Langkah 4: Kalikan nilai BSA dengan dosis standar protokol kemoterapi (mg/m²).'
    ],
    exampleCase: {
      vignette: 'Seorang pasien wanita penderita kanker payudara dengan Tinggi Badan 155 cm dan Berat Badan 50 kg diresepkan kemoterapi Siklofosfamid dengan dosis protokol 500 mg/m².',
      question: 'Berapakah Luas Permukaan Tubuh (BSA) pasien dan dosis total Siklofosfamid yang harus disiapkan apoteker?',
      stepByStepCalculation: [
        '1. (Tinggi × Berat) / 3600 = (155 × 50) / 3600 = 7.750 / 3600 = 2,1528',
        '2. BSA = √2,1528 = 1,467 m²',
        '3. Dosis Siklofosfamid = 1,467 m² × 500 mg/m² = 733,5 mg'
      ],
      finalAnswer: 'BSA Pasien = 1,47 m², Dosis Siklofosfamid yang disiapkan = 733,5 mg.'
    },
    examKeyPearls: [
      'Rumus Mosteller adalah rumus resmi yang paling sering diujikan di UKMPPAI karena paling praktis dihitung secara manual.',
      'Pembagi di bawah akar selalu bernilai 3600 (jika tinggi dalam cm dan berat dalam kg).',
      'Pada pasien obesitas ekstrem (BMI > 30), beberapa protokol onkologi menggunakan Berat Badan Disesuaikan (Adjusted Body Weight) untuk menghitung BSA.'
    ],
    referenceStandard: 'Mosteller RD. Simplified Calculation of Body-Surface Area. N Engl J Med & Panduan Kemoterapi Kemenkes RI'
  },
  crcl: {
    id: 'crcl',
    title: 'Klirens Kreatinin Cockcroft-Gault & Evaluasi Fungsi Ginjal',
    categoryName: 'Farmakokinetika Klinis & Penyesuaian Dosis',
    badgeDomain: 'Farmasi Klinis',
    mathFormula: [
      'CrCl Pria (mL/min) = [ (140 - Usia dalam tahun) × Berat Badan Aktual (kg) ] / [ 72 × Serum Kreatinin (mg/dL) ]',
      'CrCl Wanita (mL/min) = CrCl Pria × 0,85 (karena massa otot wanita rata-rata 15% lebih kecil)',
      'Penyesuaian Dosis = Dosis Normal × (CrCl Pasien / CrCl Normal 100-120 mL/min) atau perpanjangan interval pemberian'
    ],
    variableExplanations: [
      { symbol: 'Usia (tahun)', meaning: 'Usia pasien saat ini. Klirens fisiologis ginjal menurun rata-rata 1 mL/min/tahun setelah usia 40 tahun.' },
      { symbol: 'Berat Badan (kg)', meaning: 'Berat badan aktual pasien (gunakan Ideal Body Weight / IBW jika pasien obesitas BMI > 30).' },
      { symbol: 'Serum Kreatinin (mg/dL)', meaning: 'Kadar kreatinin serum dari hasil laboratorium darah perifer.' },
      { symbol: '0,85', meaning: 'Faktor koreksi fisiologis massa otot relatif pada wanita.' }
    ],
    conceptExplanation: 'Kreatinin adalah produk sisa metabolisme kreatin fosfat otot yang dieliminasi hampir 100% melalui filtrasi glomerulus ginjal tanpa reabsorpsi signifikan. Formula Cockcroft-Gault adalah acuan resmi yang digunakan pada sebagian besar monografi obat (FDA, BPOM, Farmakope) untuk menentukan modifikasi dosis obat-obat eliminasi ginjal (seperti Aminoglikosida, Vankomisin, Sefalosporin, Digoksin, dan Metformin).',
    stepByStepGuide: [
      'Langkah 1: Kurangkan angka 140 dengan Usia pasien (140 - Usia).',
      'Langkah 2: Kalikan hasil tersebut dengan Berat Badan (kg).',
      'Langkah 3: Kalikan 72 dengan nilai Serum Kreatinin pasien.',
      'Langkah 4: Bagi pembilang (Langkah 2) dengan penyebut (Langkah 3) untuk mendapatkan CrCl pria.',
      'Langkah 5: Jika pasien wanita, kalikan hasilnya dengan konstanta 0,85.'
    ],
    exampleCase: {
      vignette: 'Seorang pasien wanita berusia 65 tahun dengan Berat Badan 54 kg dirawat dengan infeksi berat. Hasil laboratorium menunjukkan Serum Kreatinin 1,6 mg/dL. Dokter hendak memberikan antibiotik nefrotoksik Cefepime.',
      question: 'Berapakah estimasi nilai Klirens Kreatinin (CrCl) pasien dan rekomendasi klinisnya?',
      stepByStepCalculation: [
        '1. Pembilang = (140 - 65) × 54 kg = 75 × 54 = 4.050',
        '2. Penyebut = 72 × 1,6 mg/dL = 115,2',
        '3. CrCl Dasar = 4.050 / 115,2 = 35,156 mL/min',
        '4. Koreksi Wanita = 35,156 × 0,85 = 29,88 mL/min'
      ],
      finalAnswer: 'CrCl pasien = 29,9 mL/min. Pasien tergolong Gagal Ginjal Derajat Sedang-Berat (CKD Stadium 4). Dosis Cefepime wajib diturunkan 50% atau interval diperpanjang menjadi tiap 24 jam.'
    },
    examKeyPearls: [
      'Jangan pernah lupa mengalikan dengan 0,85 jika pasien adalah PEREMPUAN!',
      'Jika pasien lansia memiliki Serum Kreatinin sangat rendah (< 0,6 mg/dL akibat atrofi otot), beberapa praktisi membulatkan Scr menjadi 0,8-1,0 mg/dL untuk menghindari overestimasi CrCl.',
      'Jika pasien tergolong Obesitas (TBW > 120% IBW), gunakan Adjusted Body Weight (ABW = IBW + 0.4 × [TBW - IBW]).',
      'Metformin KONTRAINDIKASI MUTLAK jika eGFR / CrCl < 30 mL/min karena risiko Asidosis Laktat fatal.'
    ],
    referenceStandard: 'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron & KDIGO Clinical Practice Guideline for CKD'
  },
  rop: {
    id: 'rop',
    title: 'Reorder Point (ROP) & Safety Stock Manajemen Persediaan',
    categoryName: 'Manajemen Farmasi & Pengadaan Obat',
    badgeDomain: 'Manajemen Farmasi',
    mathFormula: [
      'Reorder Point (ROP) = (Lead Time × Rata-Rata Pemakaian Harian) + Safety Stock',
      'Lead Time Stock (LTS) = Waktu Tunggu Pengiriman (hari) × Konsumsi Rata-Rata per Hari',
      'Safety Stock (SS) = Lead Time × Konsumsi Rata-Rata per Hari (jika buffer 100% lead time) atau deviasi konsumsi'
    ],
    variableExplanations: [
      { symbol: 'Lead Time (LT)', meaning: 'Rentang waktu dalam satuan hari yang dibutuhkan PBF mulai dari penerimaan Surat Pesanan (SP) hingga obat fisik tiba di gudang apotek.' },
      { symbol: 'Konsumsi Harian (CA)', meaning: 'Rata-rata jumlah unit sediaan (tablet/strip/botol) yang dikeluarkan apotek per hari.' },
      { symbol: 'Safety Stock (SS)', meaning: 'Jumlah stok cadangan pengaman yang disimpan untuk melindungi apotek dari risiko lonjakan resep mendadak atau keterlambatan pengiriman PBF.' },
      { symbol: 'Reorder Point (ROP)', meaning: 'Batas level kuantitas stok minimum di mana Apoteker WAJIB menerbitkan Surat Pesanan (SP) baru ke distributor.' }
    ],
    conceptExplanation: 'Pengendalian persediaan farmasi bertujuan ganda: mencegah kekosongan obat (stock-out) yang dapat membahayakan terapi pasien, sekaligus menghindari penumpukan stok berlebih (overstock) yang membebani modal kerja dan meningkatkan risiko obat kedaluwarsa. ROP adalah instrumen pemicu pemesanan otomatis berbasis data riil.',
    stepByStepGuide: [
      'Langkah 1: Tentukan rata-rata konsumsi obat per hari dari kartu stok atau data histori SIM Apotek.',
      'Langkah 2: Tentukan waktu tunggu (lead time) pengiriman PBF rekanan dalam hari.',
      'Langkah 3: Hitung kebutuhan obat selama masa tunggu: Kalikan Lead Time dengan Konsumsi Harian.',
      'Langkah 4: Tambahkan nilai Safety Stock yang telah ditetapkan ke hasil perkalian tersebut untuk mendapatkan angka ROP.'
    ],
    exampleCase: {
      vignette: 'Apotek melayani resep Amoksisilin 500 mg dengan rata-rata penjualan 30 strip per hari. Waktu pengiriman PBF adalah 3 hari kerja. Apoteker menetapkan safety stock sebanyak 60 strip.',
      question: 'Kapan apoteker harus menerbitkan Surat Pesanan baru ke PBF?',
      stepByStepCalculation: [
        '1. Lead Time Stock = 3 hari × 30 strip/hari = 90 strip',
        '2. Safety Stock = 60 strip',
        '3. ROP = 90 strip + 60 strip = 150 strip'
      ],
      finalAnswer: 'Pemesanan ulang harus segera dilakukan saat sisa stok di rak apotek menyentuh angka 150 strip.'
    },
    examKeyPearls: [
      'Jika soal ujian menyebutkan "Safety stock sebesar waktu tunggu (lead time)", maka SS = Lead Time × Konsumsi, sehingga rumus ROP = 2 × (Lead Time × Konsumsi).',
      'Jangan pernah menunggu stok obat habis (0 strip) baru melakukan pemesanan, karena pasti terjadi kekosongan obat selama masa lead time berlangsung.',
      'Reorder Point berbanding lurus dengan panjangnya lead time; semakin jauh jarak PBF, semakin tinggi nilai ROP yang harus dipasang.'
    ],
    referenceStandard: 'Petunjuk Teknis Standar Pelayanan Kefarmasian di Apotek Kemenkes RI & WHO Managing Drug Supply'
  }
};

