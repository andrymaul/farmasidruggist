import { Drug, DrugInteraction, PricingPlan, DrugFoodInteraction, TherapeuticDuplication, DDInterDatasetInfo } from '../types';
import { EXTENDED_DRUGS_DATABASE } from './ddinterDrugs';
import { EXTENDED_INTERACTIONS_DATABASE } from './ddinterInteractions';

export const INITIAL_DRUGS: Drug[] = EXTENDED_DRUGS_DATABASE;
export const INITIAL_INTERACTIONS: DrugInteraction[] = EXTENDED_INTERACTIONS_DATABASE;

export const DDINTER_DATASET_INFO: DDInterDatasetInfo = {
  version: 'DDInter 2.0 & Medscape Drug Interaction Checker (2026 Reference Integrated)',
  totalDDI: 302516,
  totalApprovedDrugs: 2290,
  totalDFI: 857,
  totalDDSI: 8359,
  totalDuplications: 6033,
  lastSyncDate: '2026-08-14',
  sourceUrl: 'https://reference.medscape.com/drug-interactionchecker',
  categories: [
    { code: 'ddinter_A', name: 'Obat Kardiovaskular & Antikoagulan', recordCount: 42150, description: 'Interaksi antikoagulan, statin, antihipertensi, antiaritmia, dan antiplatelet.' },
    { code: 'ddinter_B', name: 'Anti-infeksi & Antimikroba', recordCount: 38920, description: 'Interaksi antibiotik, antifungal azole, antivirus, dan antituberkulosis.' },
    { code: 'ddinter_C', name: 'Sistem Saraf Pusat (SSP) & Psikiatri', recordCount: 48600, description: 'Interaksi benzodiazepine, antipsikotik, antidepresan SSRI/SNRI, dan antikejang.' },
    { code: 'ddinter_D', name: 'Endokrin, Metabolik & Diabetes', recordCount: 29400, description: 'Interaksi antidiabetes oral/insulin, hormon tiroid, dan kortikosteroid.' },
    { code: 'ddinter_E', name: 'Gastrointestinal & Metoklopramid', recordCount: 22100, description: 'Interaksi PPI, Antagonis H2, antasida, dan obat motilitas saluran cerna.' },
    { code: 'ddinter_F', name: 'Analgesik, NSAID & Antigout', recordCount: 31200, description: 'Interaksi NSAID, opioid, parasetamol, dan obat penurun asam urat.' },
    { code: 'ddinter_G', name: 'Antineoplastik & Imunosupresan', recordCount: 26800, description: 'Interaksi inhibitor kalsineurin, antimetabolit, dan kemoterapi kanker.' },
    { code: 'ddinter_H', name: 'Sistem Pernapasan (Respirasi)', recordCount: 18400, description: 'Interaksi bronkodilator, antikolinergik, teofilin, dan antihistamin.' },
    { code: 'ddinter_I', name: 'Obat Musculoskeletal & Dermatologi', recordCount: 15300, description: 'Interaksi relaksan otot, agen topikal sistemik, dan imunomodulator kulit.' },
    { code: 'ddinter_L', name: 'Darah, Organ Pembentuk Darah & Lainnya', recordCount: 29646, description: 'Interaksi preparat besi, suplemen elektrolit, dan agen hematologi khusus.' }
  ]
};

export const SAMPLE_FOOD_INTERACTIONS: DrugFoodInteraction[] = [
  {
    "id": "dfi-simvastatin-grapefruit",
    "drugName": "Simvastatin",
    "foodName": "Jus Grapefruit (Jeruk Bali)",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Furanokumarin dalam grapefruit menghambat enzim CYP3A4 di usus halus.",
    "clinicalOutcome": "Kadar simvastatin plasma melonjak hingga 300-1000%, memicu Rhabdomyolysis akut.",
    "recommendation": "HINDARI meminum jus grapefruit selama dalam terapi simvastatin."
  },
  {
    "id": "dfi-warfarin-vitamin-k",
    "drugName": "Warfarin",
    "foodName": "Sayuran Hijau Kaya Vitamin K (Bayam, Kale, Brokoli)",
    "foodCategory": "Makanan Tinggi Vitamin K",
    "severity": "Major",
    "mechanism": "Vitamin K merangsang sintesis faktor pembekuan darah, berlawanan dengan kerja warfarin.",
    "clinicalOutcome": "Fluktuasi nilai INR dan penurunan efektivitas antikoagulan.",
    "recommendation": "Jaga asupan sayuran hijau tetap konsisten setiap hari, jangan melakukan perubahan pola makan drastis."
  },
  {
    "id": "dfi-ciprofloxacin-susu",
    "drugName": "Ciprofloxacin",
    "foodName": "Susu / Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Kation Kalsium (Ca2+) membentuk kelat kompleks yang tidak dapat larut dengan ciprofloxacin.",
    "clinicalOutcome": "Penurunan bioavailabilitas antibiotik hingga 40-60%, menyebabkan kegagalan terapi infeksi.",
    "recommendation": "Berikan jeda minimal 2 jam SEBELUM atau 4 jam SETELAH minum susu/kalsium."
  },
  {
    "id": "dfi-doxycycline-susu",
    "drugName": "Doxycycline",
    "foodName": "Susu, Yoghurt & Suplemen Kalsium/Besi/Magnesium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Major",
    "mechanism": "Kation polivalen membentuk kelat khelasi tak larut dengan cincin tetrasiklin.",
    "clinicalOutcome": "Penyerapan doksisiklin anjlok > 80%, memicu kegagalan eradikasi infeksi bakteri.",
    "recommendation": "Minum Doxycycline dengan segelas penuh air putih minimal 2 jam sebelum atau 4 jam setelah produk susu atau suplemen mineral."
  },
  {
    "id": "dfi-metronidazole-alkohol",
    "drugName": "Metronidazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Metronidazole menghambat enzim Aldehida Dehidrogenase (ALDH).",
    "clinicalOutcome": "Penumpukan asetaldehida memicu Reaksi Disulfiram (muntah hebat, pusing, kemerahan wajah, palpitasi).",
    "recommendation": "Hindari alkohol secara mutlak saat minum obat dan hingga 48 jam pasca dosis terakhir."
  },
  {
    "id": "dfi-isoniazid-tyramine-histamine",
    "drugName": "Isoniazid",
    "foodName": "Makanan Tinggi Tiramin (Keju Tua, Ikan Asin, Ragi) & Histamin (Ikan Tuna/Tongkol)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Isoniazid menghambat enzim monoamine oxidase (MAO) dan diamine oxidase (histaminase) intestinal.",
    "clinicalOutcome": "Krisis Hipertensi akut, sakit kepala berdenyut hebat, takikardia palpitasi, kemerahan wajah (flushing), dan diaphoresis.",
    "recommendation": "HINDARI keju matang terfermentasi dan ikan scombroid (tuna, tongkol, cakalang) yang tidak segar selama dalam pengobatan OAT Isoniazid."
  },
  {
    "id": "dfi-methotrexate-kafein",
    "drugName": "Methotrexate",
    "foodName": "Kopi Pekat & Minuman Berkafein Tinggi",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Kafein adalah antagonis reseptor adenosin yang menentang efek antiinflamasi methotrexate pada artritis reumatoid.",
    "clinicalOutcome": "Penurunan efektivitas antiinflamasi dan peredaan nyeri pada pasien penyakit autoimun.",
    "recommendation": "Batasi asupan kopi dan minuman berkafein tinggi terutama pada hari konsumsi dosis mingguan Methotrexate."
  },
  {
    "id": "dfi-griseofulvin-lemak",
    "drugName": "Griseofulvin",
    "foodName": "Makanan Tinggi Lemak (Susu, Keju, Gorengan)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Lipid makanan merangsang sekresi asam empedu yang meningkatkan solubilisasi misel griseofulvin lipofilik.",
    "clinicalOutcome": "Peningkatan bioavailabilitas penyerapan oral hingga 2 kali lipat (efek positif penunjang terapi).",
    "recommendation": "HARUS diminum bersama makanan tinggi lemak (seperti susu penuh atau makanan berlemak) untuk penyerapan optimal."
  },
  {
    "id": "dfi-spironolactone-salt-substitute",
    "drugName": "Spironolactone",
    "foodName": "Pengganti Garam Rendah Natrium (Salt Substitute Tinggi Kalium K+)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Major",
    "mechanism": "Efek hemat kalium dari spironolakton diperparah oleh asupan garam kalium klorida eksogen.",
    "clinicalOutcome": "Hiperkalemia berat (> 6.5 mEq/L) yang memicu henti jantung mendadak.",
    "recommendation": "HINDARI penggunaan pengganti garam diet berbasis kalium selama terapi hemat-kalium."
  },
  {
    "id": "dfi-sildenafil-lemak",
    "drugName": "Sildenafil",
    "foodName": "Makanan Berat Tinggi Lemak",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Makanan berlemak memperlambat pengosongan lambung dan menunda waktu mencapai kadar puncak (Tmax) lebih dari 60 menit serta menurunkan Cmax sebesar 29%.",
    "clinicalOutcome": "Onset kerja obat terlambat dan efikasi erektil menurun secara signifikan.",
    "recommendation": "Minum sildenafil saat perut kosong atau bersama makanan ringan minimal 1 jam sebelum aktivitas."
  },
  {
    "id": "dfi-metformin-alkohol",
    "drugName": "Metformin",
    "foodName": "Konsumsi Alkohol Akut / Berlebih",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Metabolisme etanol menghabiskan cadangan NAD+ hepar, menghambat glukoneogenesis laktat bersamaan dengan aksi metformin.",
    "clinicalOutcome": "Peningkatan drastis risiko Asidosis Laktat (MALA) dengan angka mortalitas tinggi (> 30%).",
    "recommendation": "HINDARI konsumsi alkohol berlebih saat dalam terapi rutin Metformin."
  },
  {
    "id": "dfi-levothyroxine-kopi",
    "drugName": "Levothyroxine",
    "foodName": "Kopi / Kafein Pagi",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Kopi mengurangi penyerapan levothyroxine di usus halus.",
    "clinicalOutcome": "Kadar hormon tiroid darah tidak tercapai dan gejala hipotiroid tetap bertahan.",
    "recommendation": "Minum levothyroxine hanya dengan air putih. Tunda minum kopi minimal 60 menit."
  },
  {
    "id": "dfi-ferrous-teh",
    "drugName": "Ferrous Sulfate",
    "foodName": "Teh Pekat & Kopi (Tannin & Polifenol)",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Tannin berikatan dengan besi kation membentuk ikatan tidak larut.",
    "clinicalOutcome": "Penurunan penyerapan zat besi hingga 70%.",
    "recommendation": "Tunda minum teh/kopi minimal 2 jam dari konsumsi suplemen besi."
  },
  {
    "id": "dfi-colchicine-grapefruit",
    "drugName": "Colchicine",
    "foodName": "Jus Grapefruit (Jeruk Bali)",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Furanokumarin menghambat usus CYP3A4 dan P-glycoprotein.",
    "clinicalOutcome": "Peningkatan drastis kadar colchicine darah memicu toksisitas mematikan (rhabdomyolysis & miopatotoksisitas).",
    "recommendation": "HINDARI mutlak minum jus grapefruit selama terapi colchicine."
  },
  {
    "id": "dfi-tacrolimus-grapefruit",
    "drugName": "Tacrolimus",
    "foodName": "Jus Grapefruit / Jeruk Bali",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Penghambatan irreversible CYP3A4 presistemik usus halus.",
    "clinicalOutcome": "Kadar darah tacrolimus melonjak 3x lipat memicu nefrotoksisitas akut.",
    "recommendation": "Hindari konsumsi grapefruit atau produk olahannya saat terapi pasca-transplantasi."
  },
  {
    "id": "dfi-captopril-pisang",
    "drugName": "Captopril",
    "foodName": "Pisang & Makanan Tinggi Kalium",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Captopril menekan sekresi aldosteron sehingga ginjal meretensi kalium.",
    "clinicalOutcome": "Peningkatan kalium darah (Hiperkalemia) yang memicu palpitasi & aritmia kardiak.",
    "recommendation": "Batasi konsumsi berlebihan makanan sangat tinggi kalium seperti pisang dalam jumlah besar sekaligus."
  },
  {
    "id": "dfi-paracetamol-alkohol",
    "drugName": "Paracetamol",
    "foodName": "Minuman Beralkohol Kronis",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Alkohol menginduksi enzim CYP2E1 hati yang mengonversi parasetamol menjadi NAPQI reaktif toksik.",
    "clinicalOutcome": "Peningkatan risiko Hepatotoksisitas & Kerusakan Hati Akut.",
    "recommendation": "Hindari konsumsi alkohol saat menggunakan obat parasetamol dosis terapi maupun tinggi."
  },
  {
    "id": "dfi-alprazolam-alkohol",
    "drugName": "Alprazolam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Sinergisme potensiasi penekanan reseptor GABAA dan pusat respirasi di batang otak.",
    "clinicalOutcome": "Sedasi mendalam, kehilangan kesadaran, depresi pernapasan berat, koma, dan kematian mendadak.",
    "recommendation": "KONTRAINDIKASI MUTLAK mengonsumsi alkohol bersamaan dengan obat golongan benzodiazepine."
  }
];

export const SAMPLE_THERAPEUTIC_DUPLICATIONS: TherapeuticDuplication[] = [
  {
    "id": "dup-nsaid-double",
    "drugAName": "Ibuprofen",
    "drugBName": "Aspirin (Dosis Tinggi) / Mefenamic Acid / Ketorolac / Ketoprofen / Diclofenac",
    "therapeuticClass": "NSAID / Antiinflamasi Non-Steroid",
    "riskDescription": "Penggunaan dua obat golongan NSAID secara bersamaan tidak meningkatkan efek analgesik, namun melipatgandakan risiko toksisitas lambung, perdarahan saluran cerna, dan gagal ginjal akut.",
    "recommendation": "Hentikan salah satu NSAID. Gunakan kombinasi NSAID + Parasetamol jika membutuhkan efek pereda nyeri tambahan."
  },
  {
    "id": "dup-statin-double",
    "drugAName": "Simvastatin",
    "drugBName": "Atorvastatin / Rosuvastatin / Pitavastatin / Pravastatin",
    "therapeuticClass": "Inhibitor HMG-CoA Reduktase (Statin)",
    "riskDescription": "Duplikasi ganda golongan statin tanpa indikasi spesifik memicu risiko tinggi miopati, peningkatan enzim transaminase hati, dan rabdomiolisis.",
    "recommendation": "Gunakan hanya satu jenis statin pada dosis terapi yang tepat dan terukur."
  },
  {
    "id": "dup-ppi-double",
    "drugAName": "Omeprazole",
    "drugBName": "Lansoprazole / Pantoprazole / Esomeprazole / Dexlansoprazole",
    "therapeuticClass": "Proton Pump Inhibitor (PPI)",
    "riskDescription": "Dua obat penekan asam lambung golongan PPI bekerja pada target reseptor H+/K+ ATPase yang sama tanpa manfaat aditif.",
    "recommendation": "Gunakan satu jenis PPI dengan dosis harian yang terukur 30-60 menit sebelum sarapan pagi."
  },
  {
    "id": "dup-benzo-double",
    "drugAName": "Diazepam",
    "drugBName": "Alprazolam / Clobazam / Clonazepam / Lorazepam / Midazolam",
    "therapeuticClass": "Benzodiazepine Ansiolitik / Sedatif",
    "riskDescription": "Kombinasi dua obat golongan benzodiazepine melipatgandakan risiko adiksi ketergantungan, ataksia jatuh pada lansia, dan depresi sistem saraf pusat.",
    "recommendation": "Gunakan satu jenis benzodiazepine sesuai indikasi spesifik (misal: Clobazam untuk kejang, Alprazolam untuk panik)."
  },
  {
    "id": "dup-sglt2-double",
    "drugAName": "Empagliflozin",
    "drugBName": "Dapagliflozin / Canagliflozin",
    "therapeuticClass": "Inhibitor SGLT2 Antidiabetes",
    "riskDescription": "Duplikasi ganda inhibitor SGLT2 tidak memberikan efikasi penurunan HbA1c tambahan namun melipatgandakan risiko deplesi volume cairan, hipotensi ortostatik, dan ketoasidosis diabetik euglikemik (euDKA).",
    "recommendation": "Pilih satu regimen SGLT2 inhibitor dosis tunggal harian."
  },
  {
    "id": "dup-sulfonylurea-double",
    "drugAName": "Glimepiride",
    "drugBName": "Glibenclamide / Gliclazide",
    "therapeuticClass": "Sulfonilurea Sekretagog Insulin",
    "riskDescription": "Peresepan bersamaan dua obat golongan sulfonilurea memicu stimulasi sel beta pankreas berlebih yang menyebabkan Hipoglikemia Berat Berkepanjangan dan kerusakan neurologis.",
    "recommendation": "Hentikan salah satu sulfonilurea. Kombinasikan dengan antidiabetes ber-mekanisme kerja berbeda (misal Metformin atau SGLT2i)."
  },
  {
    "id": "dup-doac-double",
    "drugAName": "Rivaroxaban",
    "drugBName": "Apixaban / Dabigatran / Edoxaban",
    "therapeuticClass": "Antikoagulan Oral Langsung (DOAC)",
    "riskDescription": "Penggunaan bersamaan dua obat antikoagulan DOAC melipatgandakan blokade kaskade koagulasi, memicu pendarahan mayor spontan yang berakibat fatal.",
    "recommendation": "KONTRAINDIKASI MUTLAK. Gunakan tepat satu jenis DOAC yang disesuaikan dengan fungsi ginjal pasien."
  },
  {
    "id": "dup-arb-double",
    "drugAName": "Candesartan",
    "drugBName": "Valsartan / Losartan / Telmisartan / Irbesartan",
    "therapeuticClass": "Angiotensin Receptor Blocker (ARB)",
    "riskDescription": "Blokade ganda reseptor AT1 oleh dua ARB berbeda memicu hipotensi simtomatik, sinkop, penurunan perfusi ginjal, dan hiperkalemia tanpa manfaat kardiovaskular tambahan.",
    "recommendation": "Gunakan monoterapi ARB tunggal dengan titrasi dosis optimal."
  },
  {
    "id": "dup-acei-arb",
    "drugAName": "Captopril / Lisinopril / Ramipril / Enalapril (ACEi)",
    "drugBName": "Candesartan / Valsartan / Telmisartan (ARB)",
    "therapeuticClass": "Dual RAS Blockade (ACEi + ARB)",
    "riskDescription": "Kombinasi ACE Inhibitor dan ARB (Dual RAS Blockade) dilarang secara panduan pedoman klinis (ESC/AHA) karena meningkatkan sinkop, hiperkalemia berat, dan gagal ginjal akut tanpa manfaat penurunan mortalitas.",
    "recommendation": "Hentikan salah satu. Gunakan monoterapi ACEi atau ARB."
  },
  {
    "id": "dup-glp1-double",
    "drugAName": "Semaglutide",
    "drugBName": "Liraglutide / Dulaglutide / Tirzepatide",
    "therapeuticClass": "Agonis Reseptor GLP-1 & GIP (Inkretin)",
    "riskDescription": "Penggunaan dua agen inkretin mimetik melipatgandakan efek samping gastrointestinal parah (muntah hebat, dehidrasi, gastroparesis, dan risiko pankreatitis akut).",
    "recommendation": "Hentikan salah satu agen agonis GLP-1."
  },
  {
    "id": "dup-dpp4-double",
    "drugAName": "Sitagliptin",
    "drugBName": "Vildagliptin / Linagliptin",
    "therapeuticClass": "Inhibitor Dipeptidil Peptidase-4 (DPP-4)",
    "riskDescription": "Saturasi enzim DPP-4 terjadi penuh pada dosis tunggal sehingga penambahan DPP-4 inhibitor kedua tidak memberikan manfaat kontrol glikemik sama sekali.",
    "recommendation": "Gunakan hanya satu jenis inhibitor DPP-4."
  },
  {
    "id": "dup-gout-double",
    "drugAName": "Allopurinol",
    "drugBName": "Febuxostat",
    "therapeuticClass": "Inhibitor Xantin Oksidase Antigout",
    "riskDescription": "Penggunaan bersama dua inhibitor xantin oksidase adalah duplikasi kontradiktif dengan risiko hepatotoksisitas dan penurunan asam urat terlalu drastis yang memicu serangan gout akut.",
    "recommendation": "Gunakan hanya satu jenis inhibitor xantin oksidase."
  },
  {
    "id": "dup-antihistamine-sedative",
    "drugAName": "Diphenhydramine",
    "drugBName": "Dimenhydrinate / Chlorpheniramine (CTM)",
    "therapeuticClass": "Antihistamin H1 Generasi Pertama Sedatif",
    "riskDescription": "Kombinasi dua antihistamin sedatif melipatgandakan efek mengantuk berat, gangguan koordinasi motorik, dan sindrom antikolinergik (retensi urin, takikardia, konfusi pada lansia).",
    "recommendation": "Pilih satu antihistamin sedatif untuk malam hari atau ganti ke antihistamin non-sedatif (Cetirizine / Loratadine)."
  },
  {
    "id": "dup-opioid-double",
    "drugAName": "Morphine",
    "drugBName": "Fentanyl / Pethidine / Sufentanil / Tramadol",
    "therapeuticClass": "Analgesik Opioid Agonis Reseptor Mu",
    "riskDescription": "Kombinasi multipel opioid kuat melipatgandakan penekanan pusat pernapasan di batang otak, risiko apnea, konstipasi obstruktif berat, dan overdosis fatal.",
    "recommendation": "Gunakan satu regimen opioid primer terhitung dengan protokol dosis penyelamat (breakthrough dose) yang terstruktur."
  },
  {
    "id": "dup-steroid-double",
    "drugAName": "Dexamethasone",
    "drugBName": "Methylprednisolone / Prednisone",
    "therapeuticClass": "Kortikosteroid Glukokortikoid Sistemik",
    "riskDescription": "Duplikasi 2 kortikosteroid sistemik melipatgandakan supresi aksis HPA, ulkus lambung, hiperglikemia, dan supresi kekebalan tubuh.",
    "recommendation": "Gunakan satu jenis kortikosteroid sesuai potensi & durasi kerja yang ditargetkan."
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Akses Dasar / Pemula',
    priceFormatted: 'Rp 0',
    priceValue: 0,
    period: 'Selamanya',
    description: 'Untuk mahasiswa farmasi, pasien, dan penelusuran informasi obat tingkat dasar.',
    features: [
      'Pencarian Katalog Monografi Obat Dasar',
      'Cek Interaksi Maksimal 2 Obat Sekaligus',
      'Ringkasan Keparahan (Major, Moderate, Minor)',
      'Akses Terbatas 5x Pemeriksaan per Hari',
      'Dukungan Komunitas & FAQ'
    ],
    isPopular: false,
    ctaText: 'Mulai Gratis',
    permissions: {
      maxDrugsPerCheck: 2,
      canPrintPdfReport: false,
      canAccessFoodInteractions: false,
      canAccessTherapeuticDuplications: false,
      canSaveCloudHistory: true,
      maxHistoryRecords: 3,
      canAccessClinicBranding: false,
      canExportExcelCsv: false
    }
  },
  {
    id: 'pro',
    name: 'Profesional (Farmasis & Dokter)',
    badge: 'Paling Populer',
    priceFormatted: 'Rp 99.000',
    priceValue: 99000,
    period: 'per bulan (Rp 79rb/bln jika tahunan)',
    description: 'Solusi lengkap klinis untuk Apoteker Pengelola Apotek, Dokter Praktik, dan Tenaga Medis.',
    features: [
      'Akses FULL Monografi & Brand Obat Indonesia',
      'Cek Interaksi Multi-Obat TANPA BATAS (>10 obat sekaligus)',
      'Analisis Mekanisme Farmakologi & Solusi Manajemen Klinis',
      'Fitur Interaksi Obat-Makanan (DFI) & Duplikasi Terapi',
      'Cetak & Ekspor Laporan PDF Kustomisasi Pasien',
      'Simpan Riwayat Pemeriksaan Resep di Cloud Firebase',
      'Dukungan Konsultasi Klinis Prioritas'
    ],
    isPopular: true,
    ctaText: 'Langganan Paket Pro',
    permissions: {
      maxDrugsPerCheck: 99,
      canPrintPdfReport: true,
      canAccessFoodInteractions: true,
      canAccessTherapeuticDuplications: true,
      canSaveCloudHistory: true,
      maxHistoryRecords: 999,
      canAccessClinicBranding: false,
      canExportExcelCsv: true
    }
  },
  {
    id: 'klinik',
    name: 'Klinik, Apotek & Faskes Enterprise',
    badge: 'Solusi Tim',
    priceFormatted: 'Rp 249.000',
    priceValue: 249000,
    period: 'per bulan (Rp 199rb/bln jika tahunan)',
    description: 'Didesain untuk Manajemen Apotek, Klinik Pratama, Rumah Sakit, dan Puskesmas.',
    features: [
      'Semua Fitur Paket Profesional Pro',
      'Lisensi Multi-Akun Staf (Hingga 5-10 Akun Apoteker/Dokter)',
      'Sinkronisasi Real-Time Database Resep Cloud',
      'Ekspor Rekapitulasi Data Resep & Interaksi ke Excel/CSV',
      'Laporan Audit Keamanan Penggunaan Obat Bulanan (Patient Safety)',
      'Akses Integrasi API & Pelatihan Staf 24/7'
    ],
    isPopular: false,
    ctaText: 'Langganan Paket Klinik',
    permissions: {
      maxDrugsPerCheck: 99,
      canPrintPdfReport: true,
      canAccessFoodInteractions: true,
      canAccessTherapeuticDuplications: true,
      canSaveCloudHistory: true,
      maxHistoryRecords: 999,
      canAccessClinicBranding: true,
      canExportExcelCsv: true
    }
  }
];

export interface FeatureComparison {
  featureName: string;
  free: string | boolean;
  pro: string | boolean;
  klinik: string | boolean;
}

export const PRICING_FEATURE_COMPARISON: FeatureComparison[] = [
  { featureName: 'Pencarian Katalog Monografi Obat', free: 'Terbatas (Dasar)', pro: 'Akses Penuh + Brand ID', klinik: 'Akses Penuh + Brand ID' },
  { featureName: 'Jumlah Obat Cek Interaksi', free: 'Maks. 2 Obat', pro: 'Tanpa Batas (>10 Obat)', klinik: 'Tanpa Batas (>10 Obat)' },
  { featureName: 'Batas Pemeriksaan Resep', free: '5x per Hari', pro: 'Tanpa Batas', klinik: 'Tanpa Batas' },
  { featureName: 'Analisis Mekanisme & Manajemen Klinis', free: 'Singkat', pro: 'Lengkap & Detail', klinik: 'Lengkap & Detail' },
  { featureName: 'Cek Interaksi Makanan (DFI) & Duplikasi', free: false, pro: true, klinik: true },
  { featureName: 'Ekspor & Cetak Laporan PDF Pasien', free: false, pro: true, klinik: true },
  { featureName: 'Penyimpanan Riwayat di Firebase Cloud', free: false, pro: true, klinik: true },
  { featureName: 'Jumlah Akun / Lisensi Pengguna', free: '1 Akun', pro: '1 Akun Pro', klinik: 'Hingga 5-10 Akun Staf' },
  { featureName: 'Ekspor Data Rekapitulasi Excel / CSV', free: false, pro: false, klinik: true },
  { featureName: 'Laporan Audit Keamanan Pasien (Patient Safety)', free: false, pro: false, klinik: true },
  { featureName: 'Dukungan Pelanggan & Layanan', free: 'Komunitas', pro: 'Prioritas Email/WA', klinik: '24/7 VIP Dedicated' }
];

export const PRICING_FAQS = [
  {
    q: 'Metode pembayaran apa saja yang didukung?',
    a: 'Kami menerima pembayaran melalui QRIS (GoPay, OVO, ShopeePay, DANA, BCA Mobile), Transfer Bank Virtual Account (BCA, Mandiri, BNI, BRI), serta Kartu Kredit/Debit.'
  },
  {
    q: 'Apakah saya bisa membatalkan langganan kapan saja?',
    a: 'Ya, Anda dapat membatalkan atau mengubah paket langganan kapan saja dari halaman profil akun tanpa biaya penalti.'
  },
  {
    q: 'Apakah tersedia faktur pajak / kuitansi resmi untuk Klinik/Apotek?',
    a: 'Ya, untuk Paket Klinik & Enterprise, sistem kami secara otomatis menerbitkan bukti pembayaran dan kuitansi resmi bertanda tangan digital untuk keperluan administrasi faskes.'
  },
  {
    q: 'Bagaimana jika saya memerlukan lisensi lebih dari 10 akun staf?',
    a: 'Hubungi tim dukungan enterprise kami untuk penawaran lisensi custom institusi, integrasi SIMRS/Sistem Apotek, atau pelatihan onsite.'
  }
];
