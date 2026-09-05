export type HerbInteractionSeverity = 'Mayor (Tinggi)' | 'Moderat (Sedang)' | 'Minor (Ringan)';

export type HerbInteractionType =
  | 'Farmakokinetik (CYP/P-gp)'
  | 'Farmakodinamik (Sinergis)'
  | 'Farmakodinamik (Antagonis)';

export interface HerbDrugInteraction {
  id: string;
  herbName: string;
  latinName: string;
  herbActiveCompounds: string;
  drugName: string;
  drugClass: string;
  interactionType: HerbInteractionType;
  severity: HerbInteractionSeverity;
  clinicalEffect: string;
  mechanism: string;
  clinicalRecommendation: string;
  references: string;
}

import { FhiMonographDetails, getFhiMonograph } from './fhiMonographData';
export * from './fhiMonographData';

export interface HerbProfile {
  id: string;
  name: string;
  latinName: string;
  commonIndonesianNames: string[];
  activeCompounds: string;
  traditionalUses: string[];
  cypEffects: string;
  contraindicatedDrugs: string[];
  clinicalCautions: string[];
  fhiMonograph?: FhiMonographDetails;
}

export const HERB_DRUG_INTERACTIONS_DATABASE: HerbDrugInteraction[] = [
  // =========================================================================
  // 1. KUNYIT & TEMULAWAK (Curcuma longa & Curcuma xanthorrhiza)
  // =========================================================================
  {
    id: 'hdi-curcuma-warfarin',
    herbName: 'Kunyit & Temulawak',
    latinName: 'Curcuma longa / Curcuma xanthorrhiza',
    herbActiveCompounds: 'Curcuminoid (Curcumin, Desmethoxycurcumin), Xanthorrhizol',
    drugName: 'Warfarin / Antikoagulan Oral',
    drugClass: 'Antikoagulan (Antagonis Vitamin K)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Signifikan Risiko Perdarahan Masif (Perdarahan Saluran Cerna, Hematoma, Hematuria, atau Perdarahan Intrakranial).',
    mechanism: 'Kurkumin memiliki aktivitas antitrombotik alami melalui penghambatan agregasi platelet yang diinduksi ADP/kolagen, penghambatan sintesis tromboksan B2, serta penghambatan lemah enzim CYP2C9 (enzim utama pemetabolisme S-Warfarin).',
    clinicalRecommendation: 'HINDARI penggunaan bersamaan jamu/suplemen kurkuma dosis tinggi (>500 mg/hari) dengan Warfarin. Jika pasien rutin mengonsumsi kunyit, monitor nilai INR secara ketat tiap 1-2 minggu.',
    references: 'Formularium Obat Herbal Asli Indonesia Kemenkes RI & Natural Medicines Comprehensive Database'
  },
  {
    id: 'hdi-curcuma-antiplatelet',
    herbName: 'Kunyit & Temulawak',
    latinName: 'Curcuma longa / Curcuma xanthorrhiza',
    herbActiveCompounds: 'Curcuminoid, Minyak Atsiri',
    drugName: 'Aspirin (Aspilets/Thrombo Aspilet) & Clopidogrel',
    drugClass: 'Antiplatelet / Pengencer Darah',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Perpanjangan Waktu Perdarahan (Bleeding Time) & Risiko Ulserasi Mukosa Lambung Akut.',
    mechanism: 'Efek antiplatelet ganda: Kurkumin dan Aspirin sama-sama menghambat jalur siklooksigenase (COX) dan agregasi trombosit, memicu efek sinergis penghambatan hemostasis.',
    clinicalRecommendation: 'Edukasi pasien kardiovaskular pasca-PCI (pasang ring jantung) untuk tidak mengonsumsi jamu kunyit asam pekat atau ekstrak kurkumin tanpa konsultasi apoteker/dokter spesialis jantung.',
    references: 'WHO Monographs on Selected Medicinal Plants Vol 1 & British Journal of Clinical Pharmacology'
  },
  {
    id: 'hdi-curcuma-antidiabetic',
    herbName: 'Kunyit & Temulawak',
    latinName: 'Curcuma longa / Curcuma xanthorrhiza',
    herbActiveCompounds: 'Curcuminoid',
    drugName: 'Sulfonilurea (Glimepiride, Glibenclamide) & Insulin',
    drugClass: 'Antidiabetes Oral / Parenteral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Risiko Hipoglikemia Simptomatik (Keringat Dingin, Gemetar, Pusing, Penurunan Kesadaran).',
    mechanism: 'Kurkumin meningkatkan sensitivitas reseptor insulin perifer, stimulasi sekresi insulin sel beta pankreas, dan supresi glukoneogenesis hepar, memperkuat efek penurunan glukosa darah.',
    clinicalRecommendation: 'Monitor kadar gula darah mandiri (GDS/GDP) lebih sering. Sesuaikan dosis obat antidiabetes bila pasien mengonsumsi herbal temulawak/kunyit sebagai pendamping.',
    references: 'American Diabetes Association Herbal Interactions Guide'
  },
  {
    id: 'hdi-curcuma-nsaid',
    herbName: 'Kunyit & Temulawak',
    latinName: 'Curcuma longa / Curcuma xanthorrhiza',
    herbActiveCompounds: 'Curcuminoid, Minyak Atsiri',
    drugName: 'NSAID (Ibuprofen, Meloxicam, Kalium/Natrium Diklofenak, Ketorolac)',
    drugClass: 'Analgesik & Antiinflamasi Nonsteroid',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Peningkatan Risiko Iritasi Mukosa Lambung, Dispepsia Berat & Ulkus Peptikum.',
    mechanism: 'Meskipun kurkumin memiliki efek antiinflamasi, dosis kurkumin oral pekat merangsang asam empedu dan meningkatkan kepekaan mukosa lambung terhadap erosi prostaglandin yang dihambat oleh NSAID.',
    clinicalRecommendation: 'Minum obat setelah makan dengan jeda 2 jam. Pasien dengan riwayat gastritis/GERD disarankan menghindari ekstrak kunyit konsentrasi tinggi bersamaan dengan NSAID.',
    references: 'Fitofarmaka Indonesia & Journal of Gastroenterology'
  },
  {
    id: 'hdi-curcuma-chemo-paclitaxel',
    herbName: 'Kunyit & Temulawak',
    latinName: 'Curcuma longa / Curcuma xanthorrhiza',
    herbActiveCompounds: 'Curcuminoid',
    drugName: 'Kemoterapi Sitotoksik (Paclitaxel, Doxorubicin, Cyclophosphamide)',
    drugClass: 'Antineoplastik / Kemoterapi Kanker',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Efikasi Sitotoksik Kemoterapi atau Peningkatan Toksisitas Tidak Terduga.',
    mechanism: 'Kurkumin merupakan antioksidan poten yang dapat menangkal pembentukan Reactive Oxygen Species (ROS) yang dibutuhkan oleh zat kemoterapi tertentu untuk menginduksi apoptosis sel tumor.',
    clinicalRecommendation: 'Hentikan suplemen kurkumin selama siklus kemoterapi aktif kecuali disetujui secara eksplisit oleh Dokter Onkologi Medik (Sp.PD-KHOM).',
    references: 'Memorial Sloan Kettering Cancer Center (MSKCC) Integrative Medicine Database'
  },

  // =========================================================================
  // 2. SAMBILOTO (Andrographis paniculata)
  // =========================================================================
  {
    id: 'hdi-sambiloto-antihypertensive',
    herbName: 'Sambiloto ("Raja Pahit")',
    latinName: 'Andrographis paniculata',
    herbActiveCompounds: 'Andrographolide, Deoxyandrographolide, Neoandrographolide',
    drugName: 'Antihipertensi (Amlodipine, Captopril, Candesartan, Bisoprolol)',
    drugClass: 'Antihipertensi Berbagai Golongan (CCB, ACEI, ARB, Beta-Blocker)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Hipotensi Berlebihan, Pusing Postural, Melayang, hingga Pingsan (Sinkop).',
    mechanism: 'Andrographolide memiliki efek vasodilatasi pembuluh darah perifer melalui stimulasi sintesis Nitric Oxide (NO) endotel dan blokade kanal kalsium alami, menghasilkan penurunan tekanan darah aditif.',
    clinicalRecommendation: 'Beri jeda minimal 2-3 jam antara konsumsi jamu sambiloto dan obat antihipertensi. Monitor tekanan darah secara berkala dan waspadai gejala hipotensi saat berdiri mendadak.',
    references: 'PNPK Herbal Kemenkes RI & Phytomedicine Journal'
  },
  {
    id: 'hdi-sambiloto-immunosuppressant',
    herbName: 'Sambiloto',
    latinName: 'Andrographis paniculata',
    herbActiveCompounds: 'Andrographolide',
    drugName: 'Imunosupresan (Kortikosteroid, Cyclosporine, Tacrolimus, Mycophenolate)',
    drugClass: 'Imunosupresan Pasca-Transplantasi / Terapi Autoimun (Lupus/RA)',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Kegagalan Terapi Imunosupresi, Reaktivasi Flare-up Penyakit Autoimun, atau Risiko Rejeksi Organ Cangkok.',
    mechanism: 'Sambiloto merupakan imunostimulan kuat yang meningkatkan proliferasi limfosit T, aktivitas fagositik makrofag, dan sekresi sitokin IL-2 serta TNF-alfa, yang secara langsung melawan kerja imunosupresan.',
    clinicalRecommendation: 'KONTRAINDIKASI KERAS pada pasien pasca-transplantasi organ atau pasien dengan penyakit autoimun aktif yang sedang dalam terapi imunosupresif.',
    references: 'Formularium Fitofarmaka Kemenkes RI & Natural Standard Research Collaboration'
  },
  {
    id: 'hdi-sambiloto-theophylline',
    herbName: 'Sambiloto',
    latinName: 'Andrographis paniculata',
    herbActiveCompounds: 'Andrographolide',
    drugName: 'Teofilin / Aminofilin',
    drugClass: 'Bronkodilator Xantin (Asma & PPOK)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Kadar Teofilin Plasma & Risiko Toksisitas Xantin (Takikardia, Aritmia, Mual-Muntah, Kejang).',
    mechanism: 'Andrographolide menghambat aktivitas enzim sitokrom hepar CYP1A2 yang memetabolisme 90% eliminasi Teofilin, memperlambat klirens obat.',
    clinicalRecommendation: 'Hindari kombinasi rebusan sambiloto dengan Teofilin atau lakukan Therapeutic Drug Monitoring (TDM) kadar teofilin darah.',
    references: 'Phytotherapy Research & European Medicines Agency (EMA) Herbal Monographs'
  },

  // =========================================================================
  // 3. BAWANG PUTIH (Allium sativum)
  // =========================================================================
  {
    id: 'hdi-garlic-anticoagulant',
    herbName: 'Bawang Putih Tunggal / Ekstrak Bawang Putih',
    latinName: 'Allium sativum',
    herbActiveCompounds: 'Allicin, Ajoene, S-allylcysteine',
    drugName: 'Warfarin, Clopidogrel, Aspirin, NOAC (Rivaroxaban, Dabigatran)',
    drugClass: 'Antikoagulan & Antiplatelet',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Risiko Perdarahan Spontan dan Perdarahan Hebat Perioperatif saat Tindakan Bedah.',
    mechanism: 'Ajoene dalam bawang putih menghambat pengikatan fibrinogen ke reseptor glikoprotein IIb/IIIa pada trombosit secara ireversibel dan menghambat biosintesis tromboksan A2.',
    clinicalRecommendation: 'Wajib HENTIKAN konsumsi suplemen ekstrak bawang putih dosis tinggi minimal 7-10 hari sebelum menjalani operasi bedah mayor/minor atau pencabutan gigi.',
    references: 'American Society of Anesthesiologists (ASA) Guidelines on Herbal Discontinuation'
  },
  {
    id: 'hdi-garlic-saquinavir-arv',
    herbName: 'Bawang Putih',
    latinName: 'Allium sativum',
    herbActiveCompounds: 'Allicin',
    drugName: 'Protease Inhibitors (Saquinavir, Atazanavir, Lopinavir) & ARV',
    drugClass: 'Antiretroviral (HIV/AIDS)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Drastis Kadar Obat ARV Plasma (>50%), Memicu Kegagalan Terapi Antiretroviral dan Resistensi Virus HIV.',
    mechanism: 'Bawang putih menginduksi ekspresi transporter membran P-glikoprotein usus dan enzim CYP3A4 hepar, mempercepat klirens dan eliminasi obat protease inhibitor.',
    clinicalRecommendation: 'Pasien dengan terapi HIV lini 1/2 dilarang mengonsumsi kapsul minyak bawang putih atau suplemen allicin konsentrasi tinggi.',
    references: 'FDA Drug Safety Communication & NIH Guidelines for the Use of Antiretroviral Agents'
  },
  {
    id: 'hdi-garlic-isoniazid',
    herbName: 'Bawang Putih',
    latinName: 'Allium sativum',
    herbActiveCompounds: 'Allicin, Alliin',
    drugName: 'Isoniazid (INH)',
    drugClass: 'Obat Anti Tuberkulosis (OAT Lini 1)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Kadar Puncak Serum (Cmax) dan Area Under Curve (AUC) Isoniazid.',
    mechanism: 'Bawang putih mengurangi bioavailabilitas oral INH di saluran cerna dan meningkatkan laju asetilasi hepar.',
    clinicalRecommendation: 'Beri jeda waktu minimal 3-4 jam antara konsumsi OAT pagi hari dengan suplemen bawang putih.',
    references: 'Antimicrobial Agents and Chemotherapy & Kemenkes Pedoman TBC'
  },

  // =========================================================================
  // 4. GINKGO BILOBA
  // =========================================================================
  {
    id: 'hdi-ginkgo-anticoagulant',
    herbName: 'Ginkgo Biloba',
    latinName: 'Ginkgo biloba',
    herbActiveCompounds: 'Ginkgolides (A, B, C, J), Bilobalide, Flavonoid Glikosida',
    drugName: 'Warfarin, NOAC, Aspirin, Clopidogrel, NSAID (Ibuprofen)',
    drugClass: 'Antikoagulan, Antiplatelet & NSAID',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Perdarahan Intrakranial Spontan, Hematoma Subdural, Perdarahan Hifema Okular.',
    mechanism: 'Ginkgolide B merupakan antagonis spesifik dan poten terhadap reseptor Platelet-Activating Factor (PAF), memicu inhibisi agregasi platelet aditif yang berbahaya bila dikombinasikan dengan pengencer darah.',
    clinicalRecommendation: 'KONTRAINDIKASI KONSUMSI BERSAMAAN pada pasien yang mendapat terapi antikoagulan atau antiplatelet kronis. Hentikan ginkgo minimal 14 hari sebelum jadwal operasi.',
    references: 'WHO Monographs on Selected Medicinal Plants Vol 1 & Lancet Case Reports'
  },
  {
    id: 'hdi-ginkgo-antiepileptic',
    herbName: 'Ginkgo Biloba',
    latinName: 'Ginkgo biloba',
    herbActiveCompounds: '4\'-O-Methylpyridoxine (Ginkgotoxin)',
    drugName: 'Antiepilepsi / Antikonvulsan (Asam Valproat, Karbamazepin, Fenitoin)',
    drugClass: 'Antiepilepsi & Penstabil Mood',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Ambang Kejang (Seizure Threshold) dan Kekambuhan Bangkitan Kejang Berulang (Breakthrough Seizures).',
    mechanism: 'Ginkgotoksin menghambat enzim piridoksal kinase, menurunkan sintesis asam gamma-aminobutirat (GABA, neurotransmiter inhibitorik utama di otak), meniadakan efektivitas obat antikejang.',
    clinicalRecommendation: 'Pasien penderita epilepsi dilarang keras mengonsumsi produk suplemen memori/otak yang mengandung ekstrak Ginkgo biloba.',
    references: 'Epilepsia Journal & American Academy of Neurology Guidelines'
  },
  {
    id: 'hdi-ginkgo-omeprazole',
    herbName: 'Ginkgo Biloba',
    latinName: 'Ginkgo biloba',
    herbActiveCompounds: 'Ginkgo Flavonoids, Bilobalide',
    drugName: 'Omeprazole & Esomeprazole',
    drugClass: 'Proton Pump Inhibitor (PPI)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Signifikan Konsentrasi Plasma Omeprazole & Penurunan Efektivitas Penekanan Asam Lambung.',
    mechanism: 'Ginkgo biloba menginduksi aktivitas enzim CYP2C19 di hati, mempercepat metabolisme omeprazole menjadi hidroksi-omeprazole inaktif.',
    clinicalRecommendation: 'Tingkatkan dosis PPI atau ganti ke Rabeprazole/Pantoprazole yang metabolismenya lebih sedikit bergantung pada CYP2C19.',
    references: 'Clinical Pharmacology & Therapeutics'
  },

  // =========================================================================
  // 5. GINSENG (Panax ginseng & Som Jawa)
  // =========================================================================
  {
    id: 'hdi-ginseng-warfarin',
    herbName: 'Ginseng (Panax ginseng / Ginseng Korea)',
    latinName: 'Panax ginseng / Panax quinquefolius',
    herbActiveCompounds: 'Ginsenosides (Rg1, Rb1, Rd, Re)',
    drugName: 'Warfarin',
    drugClass: 'Antikoagulan Oral',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Nilai INR dan Penurunan Efek Antikoagulan Warfarin, Memicu Pembentukan Trombus / Emboli Fatal.',
    mechanism: 'Ginsenosides menginduksi aktivitas enzim sitokrom P450 hepar (CYP2C9 dan CYP3A4), meningkatkan metabolisme dan klirens eliminasi Warfarin dalam darah.',
    clinicalRecommendation: 'Hindari konsumsi ginseng bersamaan dengan Warfarin. Jika pasien mengonsumsi ginseng, lakukan pengecekan INR serial untuk penyesuaian dosis naik Warfarin.',
    references: 'Annals of Internal Medicine & European Medicines Agency (EMA) Monographs'
  },
  {
    id: 'hdi-ginseng-ssri-maoi',
    herbName: 'Ginseng',
    latinName: 'Panax ginseng',
    herbActiveCompounds: 'Ginsenosides',
    drugName: 'Antidepresan SSRI (Fluoxetine, Sertraline) & MAOI',
    drugClass: 'Antidepresan / Psikotropika',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sindrom Serotonin Ringan-Sedang, Tremor, Insomnia Berat, Gelisah (Agitasi), Sakit Kepala, Krisis Hipertensi.',
    mechanism: 'Ginseng menghambat ambilan kembali neurotransmiter monoamin (serotonin, dopamin, norepinefrin) di celah sinaps saraf pusat, memicu eksitasi berlebihan.',
    clinicalRecommendation: 'Beri jeda dan hindari kombinasi ginseng dosis tinggi pada pasien depresi atau gangguan kecemasan yang menggunakan terapi antidepresan.',
    references: 'Journal of Clinical Psychopharmacology'
  },
  {
    id: 'hdi-ginseng-antidiabetic',
    herbName: 'Ginseng',
    latinName: 'Panax ginseng / Talinum paniculatum',
    herbActiveCompounds: 'Panaxans, Ginsenoside Rb2',
    drugName: 'Metformin, Glimepiride, Gliklazid, Insulin',
    drugClass: 'Antidiabetes Oral / Injeksi',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Risiko Hipoglikemia Berat Tak Terduga.',
    mechanism: 'Ginsenosides meningkatkan sekresi insulin terstimulasi glukosa dan meningkatkan translokasi transporter GLUT4 ke membran sel otot rangka.',
    clinicalRecommendation: 'Pantau gula darah mandiri (SMBG) secara ketat, terutama saat memulai atau menghentikan konsumsi suplemen ginseng.',
    references: 'Diabetes Care & Phytotherapy Research'
  },

  // =========================================================================
  // 6. KUMIS KUCING (Orthosiphon aristatus) & KEJIBELING
  // =========================================================================
  {
    id: 'hdi-kumiskucing-diuretics',
    herbName: 'Kumis Kucing & Kejibeling',
    latinName: 'Orthosiphon aristatus / Strobilanthes crispus',
    herbActiveCompounds: 'Sinensetin, Eupatorin, Garam Kalium Alami Tinggi',
    drugName: 'Diuretik Loop (Furosemide) & Tiazid (Hydrochlorothiazide)',
    drugClass: 'Diuretik (Gagal Jantung / Hipertensi)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Diuresis Masif, Dehidrasi Akut, Hipotensi Ortostatik, dan Fluktuasi Elektrolit Darah.',
    mechanism: 'Flavonoid sinensetin merangsang ekskresi natrium dan air lewat tubulus ginjal (efek akuaretik), melipatgandakan efek diuresis obat modern.',
    clinicalRecommendation: 'Edukasi hidrasi cairan yang cukup bagi pasien dan monitor elektrolit serum berkala bila mengonsumsi rebusan kumis kucing sebagai peluruh batu ginjal bersama diuretik.',
    references: 'Formularium Ramuan Obat Tradisional Indonesia Kemenkes RI'
  },
  {
    id: 'hdi-kumiskucing-acei-spironolactone',
    herbName: 'Kumis Kucing',
    latinName: 'Orthosiphon aristatus',
    herbActiveCompounds: 'Kandungan Kalium Tinggi (>600 mg/100 g simplisia)',
    drugName: 'Spironolactone, Captopril, Ramipril, Candesartan',
    drugClass: 'Diuretik Hemat Kalium, ACE-Inhibitor & ARB',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Risiko Hiperkalemia Berbahaya (Kadar Kalium Serum > 5.5 mEq/L) yang Berpotensi Memicu Aritmia Jantung Fatal.',
    mechanism: 'Kombinasi obat penghambat aldosteron/RAAS dengan simplisia herbal kaya garam kalium menurunkan ekskresi kalium ginjal secara kumulatif.',
    clinicalRecommendation: 'Periksa kadar kalium serum pasien, terutama pada pasien usia lanjut atau penderita penyakit ginjal kronis (PGK).',
    references: 'Indonesian Journal of Pharmacy & Kidney International'
  },
  {
    id: 'hdi-kumiskucing-lithium',
    herbName: 'Kumis Kucing',
    latinName: 'Orthosiphon aristatus',
    herbActiveCompounds: 'Sinensetin, Kalium',
    drugName: 'Lithium Carbonate',
    drugClass: 'Mood Stabilizer (Bipolar Disorder)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Fluktuasi Kadar Serum Lithium & Risiko Toksisitas Lithium Akut (Ataksia, Tremor Kasar, Konfusi, Gagal Ginjal).',
    mechanism: 'Efek diuresis kumis kucing mengubah klirens natrium tubulus ginjal, memicu retensi kompensatori ion lithium di tubulus proksimal.',
    clinicalRecommendation: 'HINDARI penggunaan bersamaan herbal peluruh batu ginjal berbasis diuretik pada pasien yang sedang dalam terapi Lithium.',
    references: 'Journal of Clinical Psychiatry & Lexicomp Drug Interactions'
  },

  // =========================================================================
  // 7. DAUN SIRSAK (Annona muricata)
  // =========================================================================
  {
    id: 'hdi-sirsak-antihypertensive',
    herbName: 'Daun Sirsak',
    latinName: 'Annona muricata',
    herbActiveCompounds: 'Annonaceous Acetogenins, Anonaine, Asimilobine',
    drugName: 'Antihipertensi (Amlodipine, Nifedipine, Captopril)',
    drugClass: 'Antihipertensi',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Tekanan Darah Berlebihan (Hipotensi Berat), Bradikardia, Rasa Lemas Ekstrem.',
    mechanism: 'Alkaloid daun sirsak memblokir reseptor 5-HT1A dan kanal ion kalsium, menghasilkan efek vasodilatasi dan penurunan denyut jantung aditif.',
    clinicalRecommendation: 'Anjurkan pasien hipertensi untuk tidak meminum rebusan daun sirsak pekat bersamaan dengan obat resep antihipertensi dokter.',
    references: 'Journal of Ethnopharmacology & Balai Besar Litbang Tanaman Obat Kemenkes Tawangmangu'
  },
  {
    id: 'hdi-sirsak-levodopa-parkinson',
    herbName: 'Daun Sirsak',
    latinName: 'Annona muricata',
    herbActiveCompounds: 'Anonaine, Reticuline, Annonacin',
    drugName: 'Levodopa / Carbidopa & Pramipexole',
    drugClass: 'Antiparkinsonian Dopaminergik',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Perburukan Gejala Motorik Parkinsonisme (Rigiditas, Tremor, Diskinesia) dan Neurotoksisitas Ekstrapiramidal.',
    mechanism: 'Annonacin merupakan racun mitokondria kompleks I yang selektif merusak neuron dopaminergik di substansia nigra basal ganglia, mempercepat degenerasi saraf dopaminergik.',
    clinicalRecommendation: 'KONTRAINDIKASI KERAS pada pasien penderita Parkinson atau gangguan motorik ekstrapiramidal.',
    references: 'Movement Disorders Journal & French Agency for Food, Environmental and Occupational Health & Safety (ANSES)'
  },

  // =========================================================================
  // 8. KAYU MANIS (Cinnamomum burmannii)
  // =========================================================================
  {
    id: 'hdi-cinnamon-statin-hepatotoxic',
    herbName: 'Kayu Manis Indonesia (Cassia Cinnamon)',
    latinName: 'Cinnamomum burmannii',
    herbActiveCompounds: 'Cinnamaldehyde, Coumarin (Kadar Koumarin 1-2% b/b)',
    drugName: 'Statin (Simvastatin, Atorvastatin) & Paracetamol Kronis',
    drugClass: 'Hipolipidemik & Analgesik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Peningkatan Beban Toksisitas Hepar (Hepatotoksisitas) dan Kenaikan Enzim SGOT/SGPT.',
    mechanism: 'Spesies Kayu Manis Cassia khas Indonesia mengandung senyawa kumarin hepatotoksik dalam jumlah signifikan yang membebani mikrosom hepar saat dikombinasikan dengan obat berpotensi hepatotoksik.',
    clinicalRecommendation: 'Batasi konsumsi bubuk kayu manis harian maksimal 0.5 - 1 sendok teh per hari atau gunakan varietas Ceylon Cinnamon yang rendah kumarin.',
    references: 'European Food Safety Authority (EFSA) Coumarin Guidance & FDA Alerts'
  },
  {
    id: 'hdi-cinnamon-antidiabetic',
    herbName: 'Kayu Manis',
    latinName: 'Cinnamomum burmannii',
    herbActiveCompounds: 'Methylhydroxychalcone Polymer (MHCP), Cinnamaldehyde',
    drugName: 'Glimepiride, Metformin, Pioglitazone, Insulin',
    drugClass: 'Antidiabetes Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sinergisme Hipoglikemia (Penurunan Glukosa Darah Terlalu Cepat).',
    mechanism: 'Polimer kalkon pada kayu manis bertindak sebagai insulin-mimetic yang memicu autofosforilasi reseptor insulin intraseluler.',
    clinicalRecommendation: 'Monitor kadar gula darah secara teratur bila mengonsumsi rebusan kayu manis rutin.',
    references: 'Diabetes Care & Fitofarmaka Kemenkes'
  },

  // =========================================================================
  // 9. JAHE (Zingiber officinale)
  // =========================================================================
  {
    id: 'hdi-ginger-anticoagulant',
    herbName: 'Jahe Merah & Jahe Emprit',
    latinName: 'Zingiber officinale',
    herbActiveCompounds: 'Gingerol, Shogaol, Zingerone',
    drugName: 'Warfarin, Aspirin, Heparin, NSAID',
    drugClass: 'Antikoagulan & Antiplatelet',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Peningkatan Kecenderungan Perdarahan Mukosa & Memar Spontan (Ekimosis).',
    mechanism: 'Gingerol menghambat enzim tromboksan sintetase dan sintesis prostasiklin platelet, menurunkan kemampuan pembekuan darah normal.',
    clinicalRecommendation: 'Konsumsi jahe sebagai bumbu dapur normal aman. Hindari suplemen ekstrak jahe pekat dosis tinggi (>4 gram/hari) pada pengguna pengencer darah.',
    references: 'Natural Standard Herb & Supplement Guide & WHO Monographs'
  },
  {
    id: 'hdi-ginger-nifedipine',
    herbName: 'Jahe Merah',
    latinName: 'Zingiber officinale',
    herbActiveCompounds: 'Gingerol',
    drugName: 'Nifedipine',
    drugClass: 'Calcium Channel Blocker (Antihipertensi)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sinergisme Efek Antiagregasi Platelet & Hipotensi.',
    mechanism: 'Gingerol dan Nifedipine memiliki efek sinergis menghambat influks ion kalsium ke dalam trombosit dan otot polos vaskular.',
    clinicalRecommendation: 'Monitor tekanan darah dan tanda perdarahan gusi/saluran cerna.',
    references: 'American Journal of Chinese Medicine'
  },

  // =========================================================================
  // 10. MENIRAN (Phyllanthus niruri)
  // =========================================================================
  {
    id: 'hdi-meniran-immunosuppressant',
    herbName: 'Meniran Hijau (Fitofarmaka)',
    latinName: 'Phyllanthus niruri',
    herbActiveCompounds: 'Phyllanthin, Hypophyllanthin, Niranthin, Corilagin',
    drugName: 'Imunosupresan (Methylprednisolone, Dexamethasone, Tacrolimus)',
    drugClass: 'Imunosupresan & Antiinflamasi Steroid',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Efektivitas Terapi Imunosupresi Autoimun dan Risiko Eksaserbasi Inflamasi.',
    mechanism: 'Meniran merupakan imunostimulan resmi (Fitofarmaka Stimuno) yang mengaktifkan sel NK (Natural Killer), proliferasi limfosit B, dan sekresi antibodi IgM/IgG, menentang supresi imun obat.',
    clinicalRecommendation: 'Pasien lupus (LES), rheumatoid arthritis akut, atau pasca-transplantasi ginjal/hati DILARANG mengonsumsi ekstrak meniran.',
    references: 'Formularium Fitofarmaka Indonesia Kemenkes RI'
  },

  // =========================================================================
  // 11. PEGAGAN (Centella asiatica)
  // =========================================================================
  {
    id: 'hdi-pegagan-sedatives',
    herbName: 'Pegagan (Antanan / Gotu Kola)',
    latinName: 'Centella asiatica',
    herbActiveCompounds: 'Asiaticoside, Madecassoside, Asiatic Acid',
    drugName: 'Benzodiazepin (Diazepam, Alprazolam, Clonazepam) & Zolpidem',
    drugClass: 'Ansiolitik & Hipnotik-Sedatif',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sedasi Berlebihan, Rasa Kantuk Ekstrem, Gangguan Koordinasi Motorik, dan Depresi SSP.',
    mechanism: 'Senyawa triterpenoid pegagan memodulasi reseptor GABA-A di otak dan meningkatkan kadar GABA serebral, melipatgandakan efek penenang obat.',
    clinicalRecommendation: 'Hindari mengemudi atau mengoperasikan mesin bila mengonsumsi pegagan bersama obat penenang. Beri jeda minimal 3-4 jam.',
    references: 'WHO Monographs Vol 1 & Phytomedicine'
  },
  {
    id: 'hdi-pegagan-hepatotoxic',
    herbName: 'Pegagan',
    latinName: 'Centella asiatica',
    herbActiveCompounds: 'Asiaticoside (Dosis Tinggi Kronis)',
    drugName: 'Statin, Ketoconazole, Metotreksat',
    drugClass: 'Obat Berpotensi Hepatotoksik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Peningkatan Risiko Cedera Hati Terinduksi Obat (DILI) pada Penggunaan Jangka Panjang (>6 Minggu).',
    mechanism: 'Akumulasi metabolit saponin dosis tinggi pada hepar dapat memicu stres oksidatif hepatosit bila dikombinasikan dengan obat hepatotoksik.',
    clinicalRecommendation: 'Batasi penggunaan suplemen pegagan maksimal 4-6 minggu berturut-turut, lalu diselingi periode istirahat (washout) 2 minggu.',
    references: 'European Medicines Agency (EMA) Herbal Community Monograph on Centella asiatica'
  },

  // =========================================================================
  // 12. MAHKOTA DEWA (Phaleria macrocarpa)
  // =========================================================================
  {
    id: 'hdi-mahkotadewa-anticoagulant',
    herbName: 'Mahkota Dewa',
    latinName: 'Phaleria macrocarpa',
    herbActiveCompounds: 'Phalerin, Mahkoside A, Saponin, Polifenol',
    drugName: 'Aspirin, Clopidogrel, Warfarin',
    drugClass: 'Antiplatelet & Antikoagulan',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Waktu Pendarahan & Risiko Perdarahan Spontan Lambung.',
    mechanism: 'Ekstrak daging buah mahkota dewa menghambat agregasi trombosit dan sintesis tromboksan secara in vitro.',
    clinicalRecommendation: 'Pasien penyakit jantung koroner atau pengguna pengencer darah dilarang meminum rebusan buah mahkota dewa tanpa pemantauan.',
    references: 'Materia Medika Indonesia & Journal of Natural Medicines'
  },
  {
    id: 'hdi-mahkotadewa-nsaid-gastric',
    herbName: 'Mahkota Dewa',
    latinName: 'Phaleria macrocarpa',
    herbActiveCompounds: 'Saponin Toksik, Tanin Pekat',
    drugName: 'NSAID (Asam Mefenamat, Piroxicam, Natrium Diklofenak)',
    drugClass: 'NSAID / Analgesik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Iritasi Mukosa Saluran Cerna Berat, Hematemesis (Muntah Darah) & Melena.',
    mechanism: 'Kandungan saponin pekat pada biji/daging buah mahkota dewa bersifat iritatif terhadap sel epitel gaster, memperberat efek ulserogenik NSAID.',
    clinicalRecommendation: 'Wajib buang biji buah mahkota dewa (biji mengandung racun alkaloid) dan hindari konsumsi bersamaan dengan obat rematik NSAID.',
    references: 'Badan Pengawas Obat dan Makanan (BPOM RI) & Balai Litbang Tanaman Obat'
  },

  // =========================================================================
  // 13. DAUN KELOR (Moringa oleifera)
  // =========================================================================
  {
    id: 'hdi-kelor-levothyroxine',
    herbName: 'Daun Kelor (Moringa)',
    latinName: 'Moringa oleifera',
    herbActiveCompounds: 'Quercetin, Kaempferol, Isothiocyanates',
    drugName: 'Levothyroxine (Euthyrox / Thyrax)',
    drugClass: 'Hormon Tiroid Sintetik (Hipotiroidisme)',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Efikasi Hormon Tiroid, Kadar T3 Serum Menurun, Pasien Mengalami Gejala Hipotiroid (Kelelahan, Kenaikan BB, Kedinginan).',
    mechanism: 'Ekstrak daun kelor menghambat enzim 5\'-deiodinase di hati dan ginjal, menghambat konversi tiroksin inaktif (T4) menjadi triiodotironin aktif (T3).',
    clinicalRecommendation: 'HINDARI konsumsi suplemen kapsul ekstrak kelor dosis tinggi pada pasien penderita hipotiroidisme yang rutin mengonsumsi Levotiroksin.',
    references: 'Pharmacological Research & Endocrine Journal'
  },
  {
    id: 'hdi-kelor-antidiabetic',
    herbName: 'Daun Kelor',
    latinName: 'Moringa oleifera',
    herbActiveCompounds: 'Chlorogenic Acid, Quercetin-3-glucoside, Isothiocyanates',
    drugName: 'Metformin, Glimepiride, Insulin',
    drugClass: 'Antidiabetes Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sinergisme Hipoglikemik Cepat.',
    mechanism: 'Klorogenat dalam kelor menghambat absorpsi glukosa di usus halus via hambatan transporter SGLT-1 dan meningkatkan ambilan glukosa seluler.',
    clinicalRecommendation: 'Rutin cek kadar glukosa darah. Kurangi dosis obat antidiabetes secara bertahap jika pasien rutin mengonsumsi sayur/ekstrak kelor.',
    references: 'Journal of Food Science and Technology & FOHI Kemenkes'
  },

  // =========================================================================
  // 14. DAUN SALAM (Syzygium polyanthum)
  // =========================================================================
  {
    id: 'hdi-salam-acarbose-diabetes',
    herbName: 'Daun Salam',
    latinName: 'Syzygium polyanthum',
    herbActiveCompounds: 'Eugenol, Squalene, Flavonoid, Tanin Kondensasi',
    drugName: 'Acarbose & Antidiabetes Oral',
    drugClass: 'Inhibitor Alfa-Glukosidase & Antidiabetes',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Glukosa Postprandial Ekstrem, Perut Kembung (Meteorismus), Diare Osmotik.',
    mechanism: 'Ekstrak daun salam memiliki aktivitas penghambatan kuat terhadap enzim alfa-glukosidase dan alfa-amilase di lumen usus, memperkuat efek Acarbose.',
    clinicalRecommendation: 'Beri jeda konsumsi rebusan daun salam dengan waktu minum obat Acarbose.',
    references: 'Formularium Obat Herbal Asli Indonesia Kemenkes RI'
  },

  // =========================================================================
  // 15. LIDAH BUAYA (Aloe vera Oral)
  // =========================================================================
  {
    id: 'hdi-aloevera-digoxin-hypokalemia',
    herbName: 'Lidah Buaya (Jus / Getah Oral)',
    latinName: 'Aloe vera / Aloe barbadensis',
    herbActiveCompounds: 'Aloin, Barbaloin, Aloe-emodin (Antrakuinon)',
    drugName: 'Digoxin (Fargoxin)',
    drugClass: 'Glikosida Jantung (Gagal Jantung & Atrial Fibrilasi)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Drastis Toksisitas Fatal Digoksin (Aritmia Ventrikel Mengancam Nyawa, Blok Jantung, Gangguan Penglihatan Kuning/Xanthopsia).',
    mechanism: 'Getah antrakuinon lidah buaya adalah laksatif stimulan kuat yang memicu hilangnya ion Kalium (K+) masif melalui feses. Hipokalemia secara dramatis meningkatkan sensitivitas reseptor Na+/K+-ATPase miokard terhadap toksisitas Digoksin.',
    clinicalRecommendation: 'KONTRAINDIKASI KERAS: Pasien yang mengonsumsi Digoksin DILARANG meminum jus lidah buaya atau suplemen laksatif berbasis aloe.',
    references: 'FDA Drug Safety Alert & German Commission E Monographs'
  },
  {
    id: 'hdi-aloevera-furosemide-potassium',
    herbName: 'Lidah Buaya Oral',
    latinName: 'Aloe vera',
    herbActiveCompounds: 'Aloin, Antrakuinon',
    drugName: 'Furosemide & Hydrochlorothiazide (HCT)',
    drugClass: 'Diuretik Boros Kalium',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Hipokalemia Berat (K < 3.0 mEq/L), Kram Otot Hebat, Kelemahan Neuromuskular, dan Aritmia Kardiak.',
    mechanism: 'Kehilangan kalium ganda: pembuangan kalium melalui urin oleh diuretik diperparah oleh pembuangan kalium melalui saluran cerna oleh laksatif aloe vera.',
    clinicalRecommendation: 'Hindari konsumsi rutin produk aloe vera oral jika pasien sedang menjalani terapi diuretik loop/tiazid.',
    references: 'Natural Medicines Comprehensive Database'
  },

  // =========================================================================
  // 16. KULIT MANGGIS (Garcinia mangostana)
  // =========================================================================
  {
    id: 'hdi-manggis-anticoagulant',
    herbName: 'Kulit Manggis (Ekstrak Xanthone)',
    latinName: 'Garcinia mangostana',
    herbActiveCompounds: 'Alpha-Mangostin, Gamma-Mangostin, Garcinone',
    drugName: 'Warfarin, NOAC, Aspirin, Clopidogrel',
    drugClass: 'Antikoagulan & Antiplatelet',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Signifikan Risiko Perdarahan Saluran Cerna & Hematoma.',
    mechanism: 'Alpha-mangostin secara selektif menghambat enzim siklooksigenase-1 (COX-1) dan sintesis tromboksan B2 pada trombosit manusia, memicu efek antiagregasi platelet kuat.',
    clinicalRecommendation: 'Hentikan jus/ekstrak kulit manggis minimal 10-14 hari sebelum tindakan operasi bedah dan hindari bersamaan dengan terapi pengencer darah.',
    references: 'Phytomedicine & Journal of Natural Products'
  },

  // =========================================================================
  // 17. DAUN SIRIH & SIRIH MERAH (Piper betle & Piper crocatum)
  // =========================================================================
  {
    id: 'hdi-sirih-antidiabetic',
    herbName: 'Sirih Merah & Sirih Hijau',
    latinName: 'Piper crocatum / Piper betle',
    herbActiveCompounds: 'Eugenol, Chavicol, Piperin, Flavonoid, Tanin',
    drugName: 'Sulfonilurea (Glimepiride, Glibenclamide) & Metformin',
    drugClass: 'Antidiabetes Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Potensiasi Penurunan Glukosa Darah & Risiko Hipoglikemia.',
    mechanism: 'Flavonoid sirih merah menstimulasi sekresi insulin basal dan menghambat glukosa-6-fosfatase di hepar.',
    clinicalRecommendation: 'Edukasi pasien mengenali gejala awal hipoglikemia bila rutin mengonsumsi rebusan sirih merah sebagai jamu diabetes.',
    references: 'Formularium Obat Herbal Asli Indonesia Kemenkes RI'
  },

  // =========================================================================
  // 18. TEMU KUNCI & KENCUR (Boesenbergia rotunda & Kaempferia galanga)
  // =========================================================================
  {
    id: 'hdi-kencur-sedatives',
    herbName: 'Kencur & Temu Kunci',
    latinName: 'Kaempferia galanga / Boesenbergia rotunda',
    herbActiveCompounds: 'Ethyl p-methoxycinnamate (EPMS), Panduratin A, Borneol',
    drugName: 'Sedatif (Diazepam, Lorazepam, Alprazolam)',
    drugClass: 'Ansiolitik & Hipnotik-Sedatif',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sedasi Mendalam, Hilang Fokus, Kelemahan Otot Rangka, dan Waktu Reaksi Melambat.',
    mechanism: 'Senyawa etil p-metoksisinamat dalam kencur memiliki efek neuro-sedatif sentral melalui peningkatan tonus transmisi GABAergik di batang otak.',
    clinicalRecommendation: 'Jangan mengonsumsi jamu beras kencur kental sesaat sebelum berkendara jarak jauh bila sedang mengonsumsi obat penenang.',
    references: 'Materia Medika Indonesia & Journal of Ethnopharmacology'
  },
  // =========================================================================
  // 19. MENGKUDU (Morinda citrifolia - Farmakope Herbal Indonesia)
  // =========================================================================
  {
    id: 'hdi-mengkudu-raas',
    herbName: 'Jus Buah Mengkudu / Noni (Morindae Citrifoliae Fructus)',
    latinName: 'Morinda citrifolia',
    herbActiveCompounds: 'Scopoletin, Asam Kaprilat, Kalium Alami Sangat Tinggi (56 mEq/L)',
    drugName: 'Captopril, Ramipril, Candesartan, Valsartan, Spironolactone',
    drugClass: 'Antihipertensi Golongan ACEi, ARB & Diuretik Hemat Kalium',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'HIPERKALEMIA FATAL (K+ > 6.5 mEq/L), Blok Jantung, Aritmia Ventrikel Berat, dan Asistol pada Pasien Gangguan Ginjal.',
    mechanism: 'Jus buah mengkudu mengandung kalium alami sangat tinggi (56 mEq/L). Penggunaan bersama obat penahan kalium (ACEi/ARB/MRA) menghambat ekskresi kalium ginjal, memicu akumulasi serum kalium toksik.',
    clinicalRecommendation: 'KONTRAINDIKASI MUTLAK pada pasien gagal ginjal kronis (CKD Stadium 3-5) atau pengguna obat golongan ACEi/ARB/Spironolactone. Hindari konsumsi jus mengkudu pekat.',
    references: 'Farmakope Herbal Indonesia Edisi II (2017) & American Journal of Kidney Diseases'
  },
  // =========================================================================
  // 20. TEMULAWAK & SALURAN EMPEDU (FHI Edisi II Kontraindikasi)
  // =========================================================================
  {
    id: 'hdi-temulawak-cholelithiasis',
    herbName: 'Temulawak (Curcumae Xanthorrhizae Rhizoma)',
    latinName: 'Curcuma xanthorrhiza',
    herbActiveCompounds: 'Xanthorrhizol, Curcuminoid',
    drugName: 'Asam Ursodeoksikolat (UDCA) / Obat Hepatobilier',
    drugClass: 'Agen Kolagogum / Terapi Kolelitiasis',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Presipitasi Kolik Bilier Akut, Obstruksi Duktus Koledokus, Kolangitis Akut, atau Ruptur Vesika Fellea.',
    mechanism: 'Senyawa xantorizol dan kurkuminoid memiliki efek kolagogum poten yang menstimulasi kontraksi kuat kantung empedu. Pada batu empedu berukuran sedang-besar, kontraksi kuat mendorong batu masuk ke saluran sempit dan memicu sumbatan total.',
    clinicalRecommendation: 'KONTRAINDIKASI FHI: Pasien dengan kolelitiasis (batu empedu) terkonfirmasi USG dilarang mengonsumsi ekstrak temulawak/kunyit dosis tinggi tanpa konsultasi dokter spesialis bedah digestif/gastroenterologi.',
    references: 'Farmakope Herbal Indonesia Edisi II (2017) Hal. 235 & WHO Monographs on Selected Medicinal Plants Vol 1'
  },
  // =========================================================================
  // 21. BROTOWALI & SULFONILUREA (FHI Jamu Saintifik)
  // =========================================================================
  {
    id: 'hdi-brotowali-antidiabetic-hypo',
    herbName: 'Batang Brotowali (Tinosporae Crispae Caulis)',
    latinName: 'Tinospora crispa',
    herbActiveCompounds: 'Tinokrisposid, Kolombin, Pikroretin',
    drugName: 'Glibenclamide, Glimepiride, Gliclazide',
    drugClass: 'Antidiabetes Oral Golongan Sulfonilurea',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Hipoglikemia Akut Berat dan Berulang (Kadar Glukosa Darah < 50 mg/dL, Syok Hipoglikemik, Kejang, Penurunan Kesadaran).',
    mechanism: 'Senyawa tinokrisposid menstimulasi sekresi insulin sel beta pankreas secara langsung melalui jalur penutupan kanal K-ATP, memperkuat efek sekretagok insulin dari sulfonilurea.',
    clinicalRecommendation: 'Edukasi pasien diabetes agar tidak mengonsumsi jamu rebusan brotowali bersamaan dengan obat antidiabetes sulfonilurea. Jika dikonsumsi, dosis obat medis wajib dititrasi turun dan SMBG dipantau ketat.',
    references: 'Monografi Jamu Saintifik Kemenkes RI & FHI Edisi II'
  },
  // =========================================================================
  // 22. KUMIS KUCING & DIURETIK KUAT (FHI Nefroprotektor)
  // =========================================================================
  {
    id: 'hdi-kumiskucing-furosemide-dehydration',
    herbName: 'Kumis Kucing (Orthosiphonis Staminei Folium)',
    latinName: 'Orthosiphon stamineus',
    herbActiveCompounds: 'Sinensetin, Kalium, Asam Rosmarinat',
    drugName: 'Furosemide, Torsemide, Bumetanide',
    drugClass: 'Diuretik Kuat (Loop Diuretics)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Deplesi Volume Cairan Masif, Hipokalemia Berat, Dehidrasi Akut, dan Hipotensi Ortostatik.',
    mechanism: 'Sinensetin meningkatkan laju filtrasi glomerulus dan saluresis ginjal yang bersinergi aditif dengan penghambatan kotransporter Na-K-2Cl oleh furosemide di ansa Henle.',
    clinicalRecommendation: 'Batasi penggunaan bersamaan. Wajib monitoring elektrolit serum (K+, Na+) dan tekanan darah secara berkala bila pasien menggunakan herba kumis kucing bersama diuretik loop.',
    references: 'Farmakope Herbal Indonesia Edisi II (2017) Hal. 251 & FOHAI Kemenkes RI'
  },

  // =========================================================================
  // PENGAYAAN INTERAKSI FHI EDISI II & FOHAI KEMENKES RI (45 INTERAKSI BARU)
  // =========================================================================
  // =========================================================================
  // 23. DAUN JAMBU BIJI (Psidii Guajavae Folium - Fitofarmaka Diapet)
  // =========================================================================
  {
    id: 'hdi-jambubiji-digoxin',
    herbName: 'Daun Jambu Biji (Psidii Guajavae Folium)',
    latinName: 'Psidium guajava',
    herbActiveCompounds: 'Tanin Kondensasi (9%), Kuersetin',
    drugName: 'Digoxin (Fargoxin)',
    drugClass: 'Glikosida Jantung (Gagal Jantung)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Drastis Absorpsi dan Bioavailabilitas Digoksin (>50%), Risiko Kegagalan Terapi dan Eksaserbasi Dekompensasi Kordis Akut.',
    mechanism: 'Kandungan tanin polifenolat berkonsentrasi tinggi dalam ekstrak daun jambu biji membentuk kompleks khelat tak larut dengan molekul digoksin di lumen usus halus, menghalangi absorpsi melewati membran mukosa enterosit.',
    clinicalRecommendation: 'HINDARI pemberian jamu antidiare jambu biji bersamaan dengan obat indeks terapi sempit seperti Digoxin. Berikan jarak minum minimal 2 hingga 3 jam setelah obat dokter.',
    references: 'Fitofarmaka Indonesia, BPOM RI & British Journal of Clinical Pharmacology'
  },
  {
    id: 'hdi-jambubiji-ferrous-iron',
    herbName: 'Daun Jambu Biji',
    latinName: 'Psidium guajava',
    herbActiveCompounds: 'Tanin Katekat Tinggi',
    drugName: 'Suplemen Zat Besi (Ferrous Fumarate, Ferrous Sulfate, Sangobion)',
    drugClass: 'Suplemen Antianemia / Terapi Defisiensi Besi',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Presipitasi Kompleks Besi-Tanat Tidak Larut di Usus, Kegagalan Koreksi Anemia Defisiensi Besi, Feses Menjadi Sangat Hitam dan Konstipasi.',
    mechanism: 'Ion besi Fe2+/Fe3+ terikat kuat oleh gugus orto-dihidroksi tanin daun jambu membentuk garam ferri-tanat yang mengendap di saluran cerna dan tidak dapat diserap oleh transporter DMT-1 usus.',
    clinicalRecommendation: 'Beri jeda minimal 3 jam antara konsumsi ekstrak daun jambu biji dengan suplemen zat besi. Edukasi pasien agar tidak meminum tablet tambah darah dengan rebusan jamu.',
    references: 'WHO Guidelines on Iron Supplementation & FOHAI Kemenkes RI'
  },
  {
    id: 'hdi-jambubiji-oral-antibiotics',
    herbName: 'Daun Jambu Biji (Ekstrak Diapet)',
    latinName: 'Psidium guajava',
    herbActiveCompounds: 'Tanin, Flavonoid Kuersetin',
    drugName: 'Ciprofloxacin, Levofloxacin, Doksisiklin',
    drugClass: 'Antibakteri Kuinolon & Tetrasiklin',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Signifikan Kadar Puncak Antibiotik Plasma (Cmax), Risiko Kegagalan Eradikasi Bakteri Penyebab Infeksi Sistemik dan Resistensi Antimikroba.',
    mechanism: 'Khelasi kimia antara molekul kuinolon/tetrasiklin dengan tanin dan kation polivalen yang terkandung dalam simplisia daun jambu biji di saluran pencernaan.',
    clinicalRecommendation: 'Wajib memberikan selang waktu minimal 2 jam sebelum atau 4 jam sesudah minum antibiotik oral bila pasien mengonsumsi obat antidiare herbal.',
    references: 'Drug Metabolism and Pharmacokinetics & Clinical Pharmacokinetics'
  },

  // =========================================================================
  // 24. DAUN JATI BELANDA (Guazumae Ulmifoliae Folium - Pelangsing OHT)
  // =========================================================================
  {
    id: 'hdi-jatibelanda-statin',
    herbName: 'Daun Jati Belanda (Guazumae Ulmifoliae Folium)',
    latinName: 'Guazuma ulmifolia',
    herbActiveCompounds: 'Musilago (Lendir Serat Larut), Tanin',
    drugName: 'Atorvastatin, Simvastatin, Rosuvastatin',
    drugClass: 'Penurun Lipid Golongan Statin',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Absorpsi Statin di Usus Halus, Penurunan Efektivitas Penurunan Kolesterol LDL dan Ateroproteksi.',
    mechanism: 'Musilago daun jati belanda membentuk lapisan gel viskus hidrofilik di lumen usus yang menjerap (adsorpsi fisik) obat-obat lipofilik seperti statin dan menghambat difusi pasif menembus mukosa enterosit.',
    clinicalRecommendation: 'Konsumsi jamu pelangsing jati belanda minimal 2 jam sebelum atau 3 jam sesudah minum obat statin dokter (yang umumnya diminum malam hari).',
    references: 'Formularium Obat Herbal Asli Indonesia & Journal of Ethnopharmacology'
  },
  {
    id: 'hdi-jatibelanda-cyclosporine',
    herbName: 'Daun Jati Belanda',
    latinName: 'Guazuma ulmifolia',
    herbActiveCompounds: 'Musilago, Serat Gel Adsorptif',
    drugName: 'Cyclosporine (Sandimmun Neoral), Tacrolimus',
    drugClass: 'Imunosupresan Pasca Transplantasi',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Kadar Trough Darah Siklosporin (C0/C2) di Bawah Rentang Terapetik, Risiko Rejeksi Tandur Organ.',
    mechanism: 'Penjerapan fisik molekul imunosupresan lipofilik dalam massa lendir musilago jati belanda di saluran cerna menghambat absorpsi sistemik.',
    clinicalRecommendation: 'KONTRAINDIKASI bagi pasien pasca-transplantasi organ untuk mengonsumsi jamu pelangsing atau suplemen diet berbahan jati belanda.',
    references: 'Therapeutic Drug Monitoring & BPOM RI'
  },
  {
    id: 'hdi-jatibelanda-fat-soluble-vitamins',
    herbName: 'Daun Jati Belanda',
    latinName: 'Guazuma ulmifolia',
    herbActiveCompounds: 'Tanin, Musilago Lendir',
    drugName: 'Vitamin A, Vitamin D3, Vitamin E, Vitamin K',
    drugClass: 'Vitamin Larut Lemak',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Minor (Ringan)',
    clinicalEffect: 'Defisiensi Subklinis Vitamin Larut Lemak pada Penggunaan Jamu Pelangsing Jangka Panjang.',
    mechanism: 'Inhibisi enzim lipase dan pembentukan misel lipid oleh komponen serat jati belanda menghambat emulsifikasi dan penyerapan mikronutrien larut lemak.',
    clinicalRecommendation: 'Jangan mengonsumsi suplemen multivitamin bersamaan dengan seduhan jamu jati belanda.',
    references: 'European Journal of Clinical Nutrition'
  },

  // =========================================================================
  // 25. HERBA SELEDRI (Apii Graveolentis Herba - Fitofarmaka Tensigard)
  // =========================================================================
  {
    id: 'hdi-seledri-amlodipine',
    herbName: 'Herba Seledri (Apii Graveolentis Herba)',
    latinName: 'Apium graveolens',
    herbActiveCompounds: 'Apigenin, 3-n-Butilftalid (3nB)',
    drugName: 'Amlodipine, Nifedipine, Felodipine',
    drugClass: 'Antihipertensi Calcium Channel Blocker (CCB)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Hipotensi Simtomatik Akut, Pusing Ekstrem, Kelelahan Berat, dan Pingsan (Sinkop) saat Bangkit Berdiri (Hipotensi Ortostatik).',
    mechanism: 'Apigenin dan 3nB bekerja sebagai antagonis kanal kalsium alami pada otot polos pembuluh darah. Kombinasi dengan CCB sintetik memicu vasodilatasi arteriol perifer berlebih secara aditif.',
    clinicalRecommendation: 'Pantau tekanan darah mandiri secara berkala. Pasien dalam terapi obat antihipertensi wajib konsultasi dokter/apoteker sebelum rutin meminum jus seledri pekat atau Fitofarmaka Tensigard.',
    references: 'Formularium Fitofarmaka BPOM RI & American Journal of Hypertension'
  },
  {
    id: 'hdi-seledri-captopril-acei',
    herbName: 'Herba Seledri (Tensigard)',
    latinName: 'Apium graveolens',
    herbActiveCompounds: 'Apigenin, Flavonoid, Kalium',
    drugName: 'Captopril, Ramipril, Lisinopril, Candesartan',
    drugClass: 'Antihipertensi Golongan ACEi & ARB',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Potensiasi Efek Penurunan Tekanan Darah Berlebih dan Risiko Azotemia Prerenal bila Pasien Dehidrasi.',
    mechanism: 'Sinergisme vasodilatasi arteriol renal dan perifer yang memperkuat penurunan resistensi vaskular sistemik.',
    clinicalRecommendation: 'Monitor tekanan darah dan pertahankan hidrasi yang cukup.',
    references: 'Fitofarmaka Indonesia & Journal of Human Hypertension'
  },
  {
    id: 'hdi-seledri-bisoprolol',
    herbName: 'Herba Seledri',
    latinName: 'Apium graveolens',
    herbActiveCompounds: '3-n-Butilftalid (3nB)',
    drugName: 'Bisoprolol, Atenolol, Propranolol',
    drugClass: 'Antihipertensi Golongan Beta-Blocker',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Bradikardia Berlebihan (Denyut Nadi Istirahat < 50 bpm), Kelemahan Otot Rangka, dan Pusing Berputar.',
    mechanism: 'Efek relaksasi vaskular dan penenang simpatik sentral dari 3nB memperkuat penurunan laju denyut jantung dari obat penyekat beta.',
    clinicalRecommendation: 'Periksa denyut nadi secara berkala jika mengonsumsi ekstrak seledri terstandar bersamaan dengan bisoprolol.',
    references: 'Natural Medicines Comprehensive Database'
  },

  // =========================================================================
  // 26. KEJI BELING (Sericocalycis Crispi Folium - Peluruh Batu Ginjal)
  // =========================================================================
  {
    id: 'hdi-kejibeling-spironolactone',
    herbName: 'Keji Beling (Sericocalycis Crispi Folium)',
    latinName: 'Strobilanthes crispa / Sericocalyx crispus',
    herbActiveCompounds: 'Kalium Alami Sangat Tinggi (1,50%), Asam Silikat',
    drugName: 'Spironolactone, Eplerenone',
    drugClass: 'Diuretik Hemat Kalium (Aldosterone Antagonist)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'HIPERKALEMIA BERAT (K+ > 5.8 mEq/L), Parestesia Ekstremitas, Kelemahan Neuromuskular, dan Aritmia Kardiak.',
    mechanism: 'Kandungan ion kalium alami yang sangat tinggi pada simplisia keji beling ditambah hambatan sekresi kalium ginjal oleh spironolakton memicu penumpukan kalium dalam darah.',
    clinicalRecommendation: 'HINDARI kombinasi keji beling dengan obat diuretik hemat kalium atau suplemen kalium tanpa pemantauan elektrolit serum.',
    references: 'Farmakope Herbal Indonesia Edisi II (2017) & FOHAI Kemenkes RI'
  },
  {
    id: 'hdi-kejibeling-allopurinol',
    herbName: 'Keji Beling',
    latinName: 'Strobilanthes crispa',
    herbActiveCompounds: 'Kalium, Flavonoid Litotripik',
    drugName: 'Allopurinol, Febuxostat',
    drugClass: 'Agen Antihiperurisemia / Inhibitor Xantin Oksidase',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Lisis Kristal Asam Urat Masif yang Berpotensi Menyumbat Saluran Kemih Akut (Nefropati Asam Urat) bila Asupan Cairan Kurang.',
    mechanism: 'Allopurinol menekan sintesis asam urat sementara keji beling mengalkalisasi urin dan memicu pelepasan endapan kalkulus asam urat secara cepat.',
    clinicalRecommendation: 'Wajib minum air putih minimal 2,5 - 3 liter per hari untuk membilas saluran kemih saat mengonsumsi keji beling bersama allopurinol.',
    references: 'Indonesian Journal of Pharmacy & Materia Medika Indonesia'
  },

  // =========================================================================
  // 27. DAUN TEMPUYUNG (Sonchi Arvensidis Folium - Batugin Elixir OHT)
  // =========================================================================
  {
    id: 'hdi-tempuyung-allopurinol',
    herbName: 'Daun Tempuyung (Sonchi Arvensidis Folium)',
    latinName: 'Sonchus arvensis',
    herbActiveCompounds: 'Luteolin-7-O-glukosida, Apigenin, Kalium',
    drugName: 'Allopurinol',
    drugClass: 'Terapi Asam Urat & Gout Arthritis',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sinergisme Penurunan Asam Urat Plasma Cepat dan Peningkatan Pelarutan Batu Ginjal Asam Urat.',
    mechanism: 'Luteolin dalam tempuyung memiliki aktivitas penghambatan xantin oksidase lemah yang bersinergi dengan allopurinol serta mempercepat pembuangan kristal urat melalui diuresis.',
    clinicalRecommendation: 'Kombinasi bermanfaat secara klinis namun wajib dipantau agar pasien tidak mengalami dehidrasi atau hipourikemia berlebih.',
    references: 'Farmakope Herbal Indonesia Edisi II & Journal of Ethnopharmacology'
  },
  {
    id: 'hdi-tempuyung-potassium-sparing',
    herbName: 'Daun Tempuyung (Batugin)',
    latinName: 'Sonchus arvensis',
    herbActiveCompounds: 'Kalium Alami Tinggi',
    drugName: 'Triamterene, Amiloride, Captopril',
    drugClass: 'Obat Penahan Kalium Ginjal',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Akumulasi Kalium Serum Toksik pada Pasien dengan Penurunan Fungsi Ginjal (GFR < 60 mL/min).',
    mechanism: 'Kandungan kalium alami simplisia tempuyung diserap tubuh sementara ekskresi tubulus renalis dihambat oleh obat penahan kalium.',
    clinicalRecommendation: 'Pasien batu ginjal dengan gangguan fungsi ginjal wajib memeriksa kadar elektrolit berkala saat mengonsumsi sediaan tempuyung.',
    references: 'Badan Pengawas Obat dan Makanan (BPOM RI)'
  },

  // =========================================================================
  // 28. BIJI PALA (Myristicae Fragrantis Semen - Sedatif Alami)
  // =========================================================================
  {
    id: 'hdi-pala-maoi-crisis',
    herbName: 'Biji Pala (Myristicae Fragrantis Semen)',
    latinName: 'Myristica fragrans',
    herbActiveCompounds: 'Miristisin (Myristicin 1.0%), Elemisin, Safrol',
    drugName: 'Phenelzine, Tranylcypromine, Selegiline, Moclobemide',
    drugClass: 'Antidepresan Golongan MAOI (Monoamine Oxidase Inhibitor)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'KRISIS HIPERTENSI AKUT MENGANCAM NYAWA (Hypertensive Crisis), Takikardia Paroksismal, Hiperpireksia, dan Perdarahan Otak.',
    mechanism: 'Miristisin dimetabolisme menjadi turunan amfetaminil (3,4,5-trimetoksiamfetamin / TMA) dan menghambat pemecahan monoamin endogen. Bersama MAOI, degradasi katekolamin terhenti memicu badai simpatomimetik masif.',
    clinicalRecommendation: 'KONTRAINDIKASI MUTLAK: Pasien yang mengonsumsi obat antidepresan MAOI dilarang keras mengonsumsi olahan biji pala dosis pekat atau minyak pala.',
    references: 'Stockley’s Drug Interactions & Journal of Clinical Psychopharmacology'
  },
  {
    id: 'hdi-pala-ssri-serotonin',
    herbName: 'Biji Pala',
    latinName: 'Myristica fragrans',
    herbActiveCompounds: 'Miristisin, Elemisin',
    drugName: 'Fluoxetine, Sertraline, Escitalopram, Paroxetine',
    drugClass: 'Antidepresan Golongan SSRI',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'SINDROM SEROTONIN AKUT (Serotonin Syndrome): Tremor Hebat, Klonus Otot Rangka, Hiperrefleksia, Agitasi Berat, Demam Tinggi, dan Disorientasi.',
    mechanism: 'Potensiasi tonus neurotransmisi serotonergik sentral oleh metabolit miristisin yang menghambat ambilan ulang dan pemecahan serotonin.',
    clinicalRecommendation: 'HINDARI penggunaan suplemen herba insomnia berbasis pala dosis tinggi pada pasien yang sedang menjalani terapi SSRI.',
    references: 'British Journal of Psychiatry & FDA Drug Safety Communications'
  },
  {
    id: 'hdi-pala-benzodiazepine',
    herbName: 'Biji Pala',
    latinName: 'Myristica fragrans',
    herbActiveCompounds: 'Miristisin, Minyak Atsiri',
    drugName: 'Diazepam, Lorazepam, Alprazolam, Zolpidem',
    drugClass: 'Hipnotik-Sedatif & Ansiolitik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Depresi Sistem Saraf Pusat Berat, Hipotermia, Bradipnea (Depresi Pernapasan), Somnolen Berkepanjangan, dan Koma.',
    mechanism: 'Efek sedatif ganda pada jaras reseptor GABAergik di formasi retikularis batang otak.',
    clinicalRecommendation: 'Jangan mengombinasikan obat tidur medis dengan herbal penenang pala tanpa rekomendasi dokter spesialis kedokteran jiwa.',
    references: 'European Journal of Pharmacology & FHI Edisi II'
  },

  // =========================================================================
  // 29. KENCUR (Kaempferiae Galangae Rhizoma - Antitussif & Analgesik)
  // =========================================================================
  {
    id: 'hdi-kencur-antihistamine',
    herbName: 'Kencur (Kaempferiae Galangae Rhizoma)',
    latinName: 'Kaempferia galanga',
    herbActiveCompounds: 'Etil p-metoksisinamat (EPMS 4%), Borneol',
    drugName: 'CTM (Chlorpheniramine), Diphenhydramine, Promethazine',
    drugClass: 'Antihistamin Generasi Pertama (Efek Sedatif)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Kantuk Ekstrem, Gangguan Koordinasi Motorik Halus, Penurunan Konsentrasi Kerja, dan Risiko Kecelakaan Lalu Lintas.',
    mechanism: 'Senyawa EPMS memiliki aktivitas neurosedatif sentral melalui modulasi kanal ion klorida reseptor GABAA, memperkuat depresi SSP dari antihistamin generasi pertama.',
    clinicalRecommendation: 'Peringatkan pasien agar tidak mengemudikan kendaraan bermotor setelah meminum jamu beras kencur kental bersama obat batuk pilek CTM.',
    references: 'Farmakope Herbal Indonesia Edisi II & Journal of Ethnopharmacology'
  },
  {
    id: 'hdi-kencur-alcohol',
    herbName: 'Kencur',
    latinName: 'Kaempferia galanga',
    herbActiveCompounds: 'Etil p-metoksisinamat (EPMS)',
    drugName: 'Sirup Obat Mengandung Alkohol / Alkohol',
    drugClass: 'Pelarut Eliksir / Sedatif Sentral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Potensiasi Sedasi Mendalam dan Gangguan Keseimbangan Tubuh.',
    mechanism: 'Aktivasi sinergis transmisi GABAergik sentral di serebelum dan batang otak.',
    clinicalRecommendation: 'Hindari meminum jamu beras kencur berdekatan dengan sirup obat beralkohol tinggi.',
    references: 'Fitofarmaka Indonesia'
  },

  // =========================================================================
  // 30. DAUN SIRIH (Piperis Betle Folium - Antidiabetes & Antiseptik)
  // =========================================================================
  {
    id: 'hdi-sirih-fluconazole',
    herbName: 'Daun Sirih Hijau & Merah (Piperis Betle Folium)',
    latinName: 'Piper betle / Piper crocatum',
    herbActiveCompounds: 'Eugenol, Kavikol, Minyak Atsiri (0,80%)',
    drugName: 'Fluconazole, Ketoconazole, Itraconazole',
    drugClass: 'Antijamur Golongan Azol Oral',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Fluktuasi Kadar Plasma Obat Antijamur dan Risiko Peningkatan Beban Enzim Hepar.',
    mechanism: 'Eugenol dan kavikol dimetabolisme oleh enzim sitokrom CYP3A4 dan CYP2C9 hepar yang merupakan enzim pemetabolisme utama obat antijamur golongan azol.',
    clinicalRecommendation: 'Pantau fungsi hati (SGOT/SGPT) bila pasien rutin meminum rebusan sirih merah saat menjalani terapi antijamur sistemik jangka panjang.',
    references: 'FOHAI Kemenkes RI & Antimicrobial Agents and Chemotherapy'
  },
  {
    id: 'hdi-sirih-antidiabetic-synergy',
    herbName: 'Sirih Merah (Piper crocatum)',
    latinName: 'Piper crocatum',
    herbActiveCompounds: 'Flavonoid, Alkaloid, Tanin',
    drugName: 'Metformin, Glimepiride, Gliclazide',
    drugClass: 'Antidiabetes Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Potensiasi Penurunan Kadar Glukosa Darah Postprandial, Risiko Hipoglikemia Ringan-Sedang.',
    mechanism: 'Senyawa flavonoid sirih merah menstimulasi sekresi insulin basal dari sel beta pankreas dan menghambat enzim glukosa-6-fosfatase di hati.',
    clinicalRecommendation: 'Lakukan pemeriksaan gula darah mandiri (SMBG) secara berkala dan sesuaikan dosis obat medis bila perlu.',
    references: 'Monografi Jamu Saintifik Kemenkes RI'
  },

  // =========================================================================
  // 31. SAMBUNG NYAWA (Gynurae Procumbentis Folium - Kardiovaskular)
  // =========================================================================
  {
    id: 'hdi-sambungnyawa-amlodipine',
    herbName: 'Daun Sambung Nyawa (Gynurae Procumbentis Folium)',
    latinName: 'Gynura procumbens',
    herbActiveCompounds: 'Rutin, Kuersetin, Asam Klorogenat',
    drugName: 'Amlodipine, Captopril, Candesartan',
    drugClass: 'Antihipertensi Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Sinergisme Penurunan Tekanan Darah Berlebih, Pusing, Rasa Melayang, dan Kelelahan Akut.',
    mechanism: 'Ekstrak daun sambung nyawa merangsang pelepasan prostasiklin (PGI2) dan Nitric Oxide (NO) di endotel vaskular, memperkuat efek relaksasi pembuluh darah obat antihipertensi.',
    clinicalRecommendation: 'Edukasi pasien hipertensi agar memantau tensi secara rutin jika mengonsumsi jamu rebusan sambung nyawa sebagai terapi pendamping.',
    references: 'Journal of Ethnopharmacology & Farmakope Herbal Indonesia Edisi II'
  },
  {
    id: 'hdi-sambungnyawa-metformin',
    herbName: 'Daun Sambung Nyawa',
    latinName: 'Gynura procumbens',
    herbActiveCompounds: 'Asam Kafeat, Flavonoid',
    drugName: 'Metformin',
    drugClass: 'Antidiabetes Oral Golongan Biguanid',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Minor (Ringan)',
    clinicalEffect: 'Peningkatan Sensitivitas Insulin Perifer dan Pengendalian Gula Darah Puasa Lebih Cepat.',
    mechanism: 'Aktivasi jalur AMPK di sel otot rangka yang memperkuat mekanisme aksi metformin.',
    clinicalRecommendation: 'Kombinasi umumnya dapat ditoleransi dengan baik; pantau glukosa darah berkala.',
    references: 'Phytomedicine & FOHAI Kemenkes RI'
  },

  // =========================================================================
  // 32. TEMU KUNCI (Boesenbergiae Panduratae Rhizoma - Protease Modulator)
  // =========================================================================
  {
    id: 'hdi-temukunci-protease-inhibitors',
    herbName: 'Temu Kunci (Boesenbergiae Panduratae Rhizoma)',
    latinName: 'Boesenbergia rotunda / Boesenbergia pandurata',
    herbActiveCompounds: 'Panduratin A, Pinostrobin',
    drugName: 'Ritonavir, Lopinavir, Atazanavir',
    drugClass: 'Antiretroviral Protease Inhibitors (Terapi HIV)',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Fluktuasi Kadar Terapetik ARV Plasma, Potensi Kegagalan Supresi Viral Load HIV atau Peningkatan Toksisitas Obat.',
    mechanism: 'Panduratin A adalah inhibitor kompetitif enzim CYP3A4 dan P-glikoprotein intestinal sekaligus memiliki aktivitas penghambatan enzim protease, memicu interaksi metabolisme fase I kompleks.',
    clinicalRecommendation: 'Pasien dalam terapi ARV wajib menghindari konsumsi jamu atau ekstrak temu kunci dosis tinggi.',
    references: 'Antiviral Research & Journal of Natural Products'
  },

  // =========================================================================
  // 33. AKAR PURWOCENG (Pimpinellae Pruatjan Radix - Tonikum Vitalitas)
  // =========================================================================
  {
    id: 'hdi-purwoceng-testosterone-therapy',
    herbName: 'Akar Purwoceng (Pimpinellae Pruatjan Radix)',
    latinName: 'Pimpinella pruatjan',
    herbActiveCompounds: 'Furanokumarin (Bergapten, Pimpinellin), Stigmasterol',
    drugName: 'Testosterone Undecanoate (Nebido, Andriol)',
    drugClass: 'Terapi Sulih Hormon Androgen (HRT)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Kadar Hormon Testosteron Bebas Melonjak di Atas Batas Normal (Suprafisiologis), Risiko Polisitemia, Hipertrofi Prostat Akut, dan Gangguan Mood.',
    mechanism: 'Purwoceng menstimulasi sel Leydig mensekresi testosteron endogen via aksis hipofisis, bersinergi aditif dengan hormon eksogen.',
    clinicalRecommendation: 'Pasien yang sedang menjalani terapi sulih hormon testosteron dilarang mengonsumsi kapsul purwoceng tanpa pengawasan dokter spesialis andrologi/urologi.',
    references: 'Farmakope Herbal Indonesia Edisi II (2017) & FOHAI Kemenkes RI'
  },
  {
    id: 'hdi-purwoceng-anticoagulant',
    herbName: 'Akar Purwoceng',
    latinName: 'Pimpinella pruatjan',
    herbActiveCompounds: 'Furanokumarin (Bergapten)',
    drugName: 'Warfarin, Aspirin',
    drugClass: 'Antikoagulan & Antiplatelet',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Waktu Protrombin / INR dan Peningkatan Risiko Perdarahan Saluran Kemih (Hematuria).',
    mechanism: 'Senyawa furanokumarin memiliki aktivitas antitrombotik lemah dan menghambat enzim mikrosomal hepar pemetabolisme antikoagulan.',
    clinicalRecommendation: 'Hindari penggunaan bersama pengencer darah.',
    references: 'Fitofarmaka Indonesia'
  },

  // =========================================================================
  // 34. AKAR PASAK BUMI (Eurycomae Longifoliae Radix - Tongkat Ali)
  // =========================================================================
  {
    id: 'hdi-pasakbumi-antidiabetic',
    herbName: 'Akar Pasak Bumi / Tongkat Ali (Eurycomae Longifoliae Radix)',
    latinName: 'Eurycoma longifolia',
    herbActiveCompounds: 'Eurikomanon (Eurycomanone 0.8%), Kuasinoid',
    drugName: 'Glimepiride, Glibenclamide, Metformin, Insulin',
    drugClass: 'Antidiabetes Oral & Insulin',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Glukosa Darah Sinergis Cepat, Risiko Hipoglikemia Simtomatik.',
    mechanism: 'Ekstrak pasak bumi meningkatkan sensitivitas insulin seluler dan memfasilitasi translokasi GLUT-4 di jaringan adiposa dan otot.',
    clinicalRecommendation: 'Pantau gula darah mandiri secara berkala bila pasien diabetes mengonsumsi suplemen stamina tongkat ali.',
    references: 'Phytotherapy Research & WHO Monographs on Selected Medicinal Plants'
  },
  {
    id: 'hdi-pasakbumi-propranolol',
    herbName: 'Akar Pasak Bumi',
    latinName: 'Eurycoma longifolia',
    herbActiveCompounds: 'Kuasinoid, Eurikomanon',
    drugName: 'Propranolol, Bisoprolol',
    drugClass: 'Beta-Blocker Antihipertensi',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Fluktuasi Tekanan Darah dan Penurunan Efikasi Antihipertensi pada Penderita Hipertensi.',
    mechanism: 'Efek stimulasi tonik simpatis dan peningkatan laju metabolisme basal oleh pasak bumi dapat melawan efek bradikardi dan hipotensif beta-blocker.',
    clinicalRecommendation: 'Konsultasikan dengan dokter spesialis jantung sebelum mengonsumsi jamu kuat pasak bumi bila memiliki riwayat penyakit kardiovaskular.',
    references: 'Natural Medicines Comprehensive Database'
  },

  // =========================================================================
  // 35. LEMPUYANG WANGI (Zingiberis Zerumbeti Rhizoma - Antiinflamasi)
  // =========================================================================
  {
    id: 'hdi-lempuyang-nsaid',
    herbName: 'Lempuyang Wangi (Zingiberis Zerumbeti Rhizoma)',
    latinName: 'Zingiber zerumbet',
    herbActiveCompounds: 'Zerumbon (Zerumbone 0.5%)',
    drugName: 'Ketorolac, Meloxicam, Ibuprofen, Piroxicam',
    drugClass: 'Analgesik Antiinflamasi Nonsteroid (NSAID)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Peningkatan Risiko Erosi Mukosa Lambung dan Perdarahan Saluran Cerna Tersembunyi pada Konsumsi Dosis Tinggi.',
    mechanism: 'Zerumbon menghambat transkripsi enzim siklooksigenase COX-2 dan iNOS. Bersama NSAID, sintesis prostaglandin protektif lambung menurun drastis.',
    clinicalRecommendation: 'Minum obat dan seduhan lempuyang sesudah makan dengan jeda 2 jam.',
    references: 'Farmakope Herbal Indonesia Edisi II & Phytomedicine'
  },
  {
    id: 'hdi-lempuyang-antiplatelet',
    herbName: 'Lempuyang Wangi',
    latinName: 'Zingiber zerumbet',
    herbActiveCompounds: 'Zerumbon, Minyak Atsiri',
    drugName: 'Aspirin, Clopidogrel',
    drugClass: 'Antiplatelet',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penghambatan Agregasi Trombosit Ganda, Memperpanjang Waktu Perdarahan Bedah.',
    mechanism: 'Inhibisi sintesis tromboksan B2 trombosit oleh senyawa zerumbon.',
    clinicalRecommendation: 'Hentikan konsumsi minimal 7 hari sebelum tindakan bedah.',
    references: 'Planta Medica & FOHAI Kemenkes RI'
  },

  // =========================================================================
  // 36. MINYAK KAYU PUTIH (Melaleucae Leucadendrae Aetheroleum)
  // =========================================================================
  {
    id: 'hdi-kayuputih-cyp-drugs',
    herbName: 'Minyak Kayu Putih Oral (Melaleucae Leucadendrae Aetheroleum)',
    latinName: 'Melaleuca leucadendra',
    herbActiveCompounds: '1,8-Sineol (Cineole / Eucalyptol 50-65%)',
    drugName: 'Theophylline, Phenobarbital, Diazepam',
    drugClass: 'Obat Dimetabolisme Enzim Sitokrom CYP1A2 & CYP2B6',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Signifikan Kadar Obat Plasma, Kegagalan Kontrol Serangan Asma Bronkial atau Bangkitan Kejang Epilepsi.',
    mechanism: '1,8-Sineol yang tertelan merupakan induktor poten enzim hepar sitokrom P450 (terutama isoenzim CYP1A2, CYP2B6, dan CYP3A4), mempercepat metabolisme eliminasi obat dokter.',
    clinicalRecommendation: 'HINDARI menelan minyak kayu putih murni atau kapsul cineole oral dosis tinggi bersamaan dengan obat antiasma atau antikejang resep.',
    references: 'Farmakope Herbal Indonesia Edisi II & Drug Metabolism Reviews'
  },

  // =========================================================================
  // 37. BUAH KEMUKUS (Piperis Cubebae Fructus - Saluran Kemih)
  // =========================================================================
  {
    id: 'hdi-kemukus-diuretics',
    herbName: 'Buah Kemukus (Piperis Cubebae Fructus)',
    latinName: 'Piper cubeba',
    herbActiveCompounds: 'Kubebin (Cubebin), Minyak Atsiri (10%)',
    drugName: 'Furosemide, Hydrochlorothiazide (HCT)',
    drugClass: 'Diuretik Saluretik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Diuresis Berlebih, Risiko Dehidrasi Akut, Hipotensi, dan Iritasi Epitel Tubulus Ginjal.',
    mechanism: 'Senyawa kubebin dan minyak atsiri mengiritasi secara ringan parenkim ginjal untuk menstimulasi aliran urin, memperkuat efek diuresis obat medis.',
    clinicalRecommendation: 'Pastikan status hidrasi cukup dan hindari penggunaan jangka panjang tanpa indikasi infeksi saluran kemih yang jelas.',
    references: 'Farmakope Herbal Indonesia Edisi II (2017) Hal. 275 & Materia Medika Indonesia'
  },
  {
    id: 'hdi-kemukus-urinary-antiseptics',
    herbName: 'Buah Kemukus',
    latinName: 'Piper cubeba',
    herbActiveCompounds: 'Kubebin, Minyak Atsiri',
    drugName: 'Nitrofurantoin, Methenamine',
    drugClass: 'Antiseptik Saluran Kemih Sintetik',
    interactionType: 'Farmakokinetik (CYP/P-gp)',
    severity: 'Minor (Ringan)',
    clinicalEffect: 'Modulasi Efikasi Antiseptik Akibat Perubahan Keasaman (pH) Urin.',
    mechanism: 'Kandungan asam organik dan minyak atsiri kemukus memengaruhi pH urin yang krusial untuk hidrolisis methenamine menjadi formaldehid aktif.',
    clinicalRecommendation: 'Beri jeda konsumsi minimal 2 jam.',
    references: 'British Herbal Pharmacopoeia'
  },

  // =========================================================================
  // 38. INTERAKSI KRITIS LAIN DARI HERBAL EKSISTING (PENGAYAAN FHI)
  // =========================================================================
  {
    id: 'hdi-mengkudu-warfarin-antagonism',
    herbName: 'Jus Buah Mengkudu / Noni',
    latinName: 'Morinda citrifolia',
    herbActiveCompounds: 'Vitamin K Alami, Antrakuinon',
    drugName: 'Warfarin (Simarc-2)',
    drugClass: 'Antikoagulan Oral',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Penurunan Nilai INR Secara Signifikan (< 2.0), Kegagalan Antikoagulasi, dan Presipitasi Trombosis Katup Jantung / Stroke Iskemik.',
    mechanism: 'Jus buah mengkudu mengandung vitamin K alami yang bersaing langsung mengantagonis penghambatan enzim VKORC1 oleh warfarin di hati.',
    clinicalRecommendation: 'HINDARI konsumsi jus mengkudu rutin pada pasien pengguna Warfarin. Bila pasien tetap mengonsumsi, monitor nilai INR setiap minggu.',
    references: 'American Journal of Health-System Pharmacy & BPOM RI'
  },
  {
    id: 'hdi-brotowali-metformin-lactic',
    herbName: 'Batang Brotowali',
    latinName: 'Tinospora crispa',
    herbActiveCompounds: 'Tinokrisposid, Alkaloid Pahit',
    drugName: 'Metformin',
    drugClass: 'Antidiabetes Oral Golongan Biguanid',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Hipoglikemia Berat Disertai Risiko Asidosis Laktat pada Pasien Lansia atau Pasien Gangguan Ginjal.',
    mechanism: 'Brotowali meningkatkan ambilan glukosa dan glikolisis anaerobik perifer yang memperkuat efek penekanan glukoneogenesis oleh metformin.',
    clinicalRecommendation: 'Jangan mengonsumsi jamu pahitan brotowali pekat bersamaan dengan metformin tanpa pengawasan ketat kadar gula darah.',
    references: 'Monografi Jamu Saintifik Kemenkes RI'
  },
  {
    id: 'hdi-brotowali-hepatotoxic-drugs',
    herbName: 'Batang Brotowali',
    latinName: 'Tinospora crispa',
    herbActiveCompounds: 'Furanoditerpen Kolombin',
    drugName: 'Rifampisin, Isoniazid (OAT Tuberkulosis) & Statin',
    drugClass: 'Obat Berpotensi Hepatotoksik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Toksisitas Sel Hepar Kumulatif (Peningkatan Enzim SGOT/SGPT > 3x Batas Atas Normal, Ikterus / Penyakit Kuning Akut).',
    mechanism: 'Furanoditerpenoid dalam brotowali dosis tinggi dimetabolisme menjadi epoksida reaktif oleh CYP hepar yang membebani kapasitas antioksidan glutation hepatosit.',
    clinicalRecommendation: 'DILARANG mengonsumsi rebusan brotowali jangka panjang pada pasien yang sedang menjalani pengobatan TB fase intensif atau obat hepatotoksik lain.',
    references: 'Fitofarmaka Indonesia & Liver International'
  },
  {
    id: 'hdi-manggis-doac',
    herbName: 'Kulit Manggis (Ekstrak Xanthone)',
    latinName: 'Garcinia mangostana',
    herbActiveCompounds: 'Alfa-Mangostin',
    drugName: 'Rivaroxaban (Xarelto), Apixaban (Eliquis), Dabigatran (Pradaxa)',
    drugClass: 'Direct Oral Anticoagulant (DOAC)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Peningkatan Signifikan Risiko Perdarahan Internal Masif (Perdarahan Gastrointestinal Bawah, Hematoma Otot Spontan).',
    mechanism: 'Alfa-mangostin menghambat agregasi platelet secara ireversibel melalui hambatan jalur siklooksigenase, berinteraksi aditif dengan antikoagulan faktor Xa atau trombin.',
    clinicalRecommendation: 'KONTRAINDIKASI KERAS: Pasien dalam terapi DOAC dilarang mengonsumsi kapsul ekstrak kulit manggis pekat.',
    references: 'Phytomedicine & Journal of Thrombosis and Haemostasis'
  },
  {
    id: 'hdi-ginkgo-doac',
    herbName: 'Ginkgo Biloba',
    latinName: 'Ginkgo biloba',
    herbActiveCompounds: 'Ginkgolida, Bilobalida',
    drugName: 'Dabigatran, Rivaroxaban, Apixaban',
    drugClass: 'DOAC / Antikoagulan Baru',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Perdarahan Intrakranial Spontan (Hematoma Subdural) dan Perdarahan Saluran Cerna Masif.',
    mechanism: 'Penghambatan platelet-activating factor (PAF) oleh ginkgolid dikombinasikan dengan blokade kaskade koagulasi oleh DOAC.',
    clinicalRecommendation: 'Hentikan Ginkgo biloba bila pasien memulai terapi antikoagulan DOAC.',
    references: 'Neurology Journal & Stockley’s Drug Interactions'
  },
  {
    id: 'hdi-garlic-clopidogrel-pci',
    herbName: 'Bawang Putih (Garlic Oil Ekstrak)',
    latinName: 'Allium sativum',
    herbActiveCompounds: 'Ajoene, Allicin',
    drugName: 'Clopidogrel, Ticagrelor, Prasugrel',
    drugClass: 'Antiplatelet P2Y12 Inhibitor (Pasca Pasang Ring Jantung)',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Mayor (Tinggi)',
    clinicalEffect: 'Perdarahan Akses Vaskular Femoralis/Radialis Pasca-PCI, Hematoma Retroperitoneal, dan Memar Spontan.',
    mechanism: 'Ajoene menghambat penempelan fibrinogen pada reseptor GP IIb/IIIa platelet yang bersinergi kuat dengan hambatan reseptor P2Y12 oleh clopidogrel.',
    clinicalRecommendation: 'Wajib stop suplemen garlic oil minimal 7-10 hari sebelum prosedur kateterisasi jantung atau pembedahan.',
    references: 'Catheterization and Cardiovascular Interventions & FHI Edisi II'
  },
  {
    id: 'hdi-jahe-metronidazole',
    herbName: 'Jahe Merah Pekat',
    latinName: 'Zingiber officinale',
    herbActiveCompounds: 'Gingerol, Shogaol',
    drugName: 'Metronidazole',
    drugClass: 'Antibakteri & Antiprotozoa',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Minor (Ringan)',
    clinicalEffect: 'Reaksi Menyerupai Disulfiram Ringan (Flushing Wajah, Rasa Hangat Ekstrem di Dada, Mual, Sakit Kepala Berdenyut).',
    mechanism: 'Komponen terpenoid volatil jahe pekat dapat memicu vasodilatasi pembuluh darah kutan yang diperparah oleh metronidazol.',
    clinicalRecommendation: 'Beri jeda minum jamu jahe dengan metronidazol minimal 2 jam.',
    references: 'Herbal Medicines: A Guide for Healthcare Professionals'
  },
  {
    id: 'hdi-meniran-live-vaccine',
    herbName: 'Ekstrak Meniran Hijau (Stimuno)',
    latinName: 'Phyllanthus niruri',
    herbActiveCompounds: 'Phyllanthin, Hypophyllanthin',
    drugName: 'Vaksin Hidup (BCG, Polio Oral / OPV, MMR, Varicella, Yellow Fever)',
    drugClass: 'Vaksin Hidup yang Dilemahkan (Live Attenuated Vaccines)',
    interactionType: 'Farmakodinamik (Antagonis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Potensiasi Reaksi Inflamasi Pasca Imunisasi (Demam Tinggi, Pembengkakan Limfonodi) atau Replikasi Virus Vaksin Terganggu.',
    mechanism: 'Stimulasi masif sel NK dan pelepasan interferon-gamma oleh meniran dapat mengeliminasi kuman vaksin hidup sebelum pembentukan antibodi memori adekuat.',
    clinicalRecommendation: 'Hentikan konsumsi sirup/kapsul meniran minimal 3 hari sebelum dan 2 minggu sesudah pemberian vaksin hidup.',
    references: 'Clinical and Experimental Immunology & FOHAI Kemenkes RI'
  },
  {
    id: 'hdi-pegagan-antidiabetic',
    herbName: 'Pegagan (Centella asiatica)',
    latinName: 'Centella asiatica',
    herbActiveCompounds: 'Asiatikosida, Madekasosida',
    drugName: 'Glibenclamide, Glimepiride, Metformin',
    drugClass: 'Antidiabetes Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Minor (Ringan)',
    clinicalEffect: 'Peningkatan Kontrol Glukosa Darah dan Penurunan Kadar HbA1c.',
    mechanism: 'Aktivitas antioksidan dan perbaikan mikrosirkulasi pankreas oleh asiatikosida.',
    clinicalRecommendation: 'Dapat dikonsumsi sebagai pendamping dengan pemantauan gula darah berkala.',
    references: 'Fitofarmaka Indonesia'
  },
  {
    id: 'hdi-kelor-antihypertensive',
    herbName: 'Daun Kelor (Moringa oleifera)',
    latinName: 'Moringa oleifera',
    herbActiveCompounds: 'Isothiocyanates, Quercetin',
    drugName: 'Captopril, Candesartan, Amlodipine',
    drugClass: 'Antihipertensi Oral',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Penurunan Tekanan Darah Berlebih (Hipotensi), Pusing saat Perubahan Posisi Tubuh.',
    mechanism: 'Senyawa isotiosianat kelor memiliki efek vasodilatasi arteriol dan natriuresis ringan.',
    clinicalRecommendation: 'Awasi hipotensi bila mengonsumsi kapsul ekstrak kelor bersamaan dengan obat darah tinggi.',
    references: 'Journal of Hypertension & FOHAI Kemenkes RI'
  },
  {
    id: 'hdi-salam-statin',
    herbName: 'Daun Salam',
    latinName: 'Syzygium polyanthum',
    herbActiveCompounds: 'Flavonoid, Eugenol',
    drugName: 'Simvastatin, Atorvastatin',
    drugClass: 'Antihiperlipidemia Golongan Statin',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Minor (Ringan)',
    clinicalEffect: 'Sinergisme Positif Penurunan Kadar Kolesterol Total dan Trigliserida.',
    mechanism: 'Penghambatan absorpsi lipid lumen usus oleh polifenol salam bersinergi dengan penghambatan sintesis kolesterol di hati oleh statin.',
    clinicalRecommendation: 'Kombinasi bermanfaat; periksa profil lipid berkala tiap 3 bulan.',
    references: 'Formularium Obat Herbal Asli Indonesia Kemenkes RI'
  },
  {
    id: 'hdi-aloevera-oral-hypoglycemics',
    herbName: 'Lidah Buaya Oral (Aloe vera Gel)',
    latinName: 'Aloe vera',
    herbActiveCompounds: 'Acemannan, Aloin',
    drugName: 'Glibenclamide, Glimepiride, Insulin',
    drugClass: 'Antidiabetes Hipoglikemik',
    interactionType: 'Farmakodinamik (Sinergis)',
    severity: 'Moderat (Sedang)',
    clinicalEffect: 'Hipoglikemia Mendadak (Tremor, Palpitasi, Berkeringat Dingin, Glukosa Darah < 60 mg/dL).',
    mechanism: 'Gel aloe vera merangsang sekresi insulin dari sel beta pankreas dan meningkatkan pembersihan glukosa darah.',
    clinicalRecommendation: 'Pantau kadar gula darah mandiri jika pasien rutin mengonsumsi minuman gel lidah buaya.',
    references: 'Phytomedicine & Natural Medicines Comprehensive Database'
  }
];

export const INDONESIAN_HERB_PROFILES: HerbProfile[] = [
  {
    id: 'herb-curcuma-longa',
    name: 'Kunyit & Temulawak',
    latinName: 'Curcuma longa / Curcuma xanthorrhiza',
    commonIndonesianNames: ['Kunyit', 'Kunir', 'Temulawak', 'Koneng Gede', 'Curcuma'],
    activeCompounds: 'Curcuminoid (Curcumin 3-5%), Desmethoxycurcumin, Xanthorrhizol, Minyak Atsiri (Turmerone)',
    traditionalUses: [
      'Gangguan lambung (Maag / Dispepsia / Gastritis)',
      'Hepatoprotektor (Penyakit Kuning / Hepatitis / Fatty Liver)',
      'Penambah nafsu makan anak (Temulawak)',
      'Antiinflamasi sendi (Osteoarthritis)'
    ],
    cypEffects: 'Inhibitor lemah CYP2C9, CYP3A4, dan P-glikoprotein',
    contraindicatedDrugs: [
      'Warfarin / NOAC (Risiko perdarahan mayor)',
      'Aspirin / Clopidogrel (Perdarahan ganda)',
      'Obat kemoterapi tertentu (Paclitaxel, Doxorubicin)'
    ],
    clinicalCautions: [
      'Waspadai perdarahan saluran cerna bila dikombinasikan dengan NSAID.',
      'Dapat menurunkan gula darah; awasi hipoglikemia bila diminum bersama obat diabetes.',
      'Hentikan minimal 2 minggu sebelum tindakan operasi bedah.'
    ]
  },
  {
    id: 'herb-sambiloto',
    name: 'Sambiloto ("King of Bitters")',
    latinName: 'Andrographis paniculata',
    commonIndonesianNames: ['Sambiloto', 'Ki Pait', 'Bidara', 'Sadilata', 'Raja Pahit'],
    activeCompounds: 'Andrographolide (min. 1.0%), Deoxyandrographolide, Neoandrographolide, Flavonoid',
    traditionalUses: [
      'Demam & Flu / ISPA (Herbal anti-viral & antibakteri)',
      'Diabetes Melitus (Penurun gula darah tradisi)',
      'Hipertensi',
      'Imunostimulan daya tahan tubuh'
    ],
    cypEffects: 'Inhibisi moderat CYP1A2, CYP2C9, CYP3A4',
    contraindicatedDrugs: [
      'Imunosupresan (Tacrolimus, Cyclosporine, Steroid dosis tinggi)',
      'Warfarin & Antiplatelet',
      'Teofilin (Peningkatan kadar toksisitas teofilin)'
    ],
    clinicalCautions: [
      'KONTRAINDIKASI KERAS pada kehamilan (efek abortifasien / kontraksi uterus).',
      'Dilarang pada pasien penyakit autoimun aktif atau pasca-transplantasi.',
      'Dapat menyebabkan rasa tidak nyaman di lambung dan reaksi alergi anafilaksis pada individu sensitif.'
    ]
  },
  {
    id: 'herb-garlic',
    name: 'Bawang Putih / Bawang Hitam',
    latinName: 'Allium sativum',
    commonIndonesianNames: ['Bawang Putih Tunggal', 'Black Garlic', 'Bawang Lanang'],
    activeCompounds: 'Allicin, Alliin, Ajoene, S-allyl-L-cysteine (SAC)',
    traditionalUses: [
      'Hiperlipidemia & Dislipidemia (Penurun kolesterol)',
      'Hipertensi ringan-sedang',
      'Pencegahan aterosklerosis kardiovaskular',
      'Antimikroba & antioksidan'
    ],
    cypEffects: 'Induktor P-glikoprotein & CYP3A4 (ekstrak minyak)',
    contraindicatedDrugs: [
      'Protease Inhibitors ARV (Saquinavir, Atazanavir - level obat turun >50%)',
      'Warfarin & Clopidogrel (Risiko perdarahan masif)',
      'Isoniazid (Penurunan bioavailabilitas OAT)'
    ],
    clinicalCautions: [
      'Wajib dihentikan 7-10 hari sebelum prosedur bedah atau cabut gigi.',
      'Kombinasi dengan obat diabetes dapat memicu hipoglikemia sinergis.'
    ]
  },
  {
    id: 'herb-ginkgo',
    name: 'Ginkgo Biloba',
    latinName: 'Ginkgo biloba',
    commonIndonesianNames: ['Ginkgo', 'Pohon Rambut Perawan', 'Ekstrak Daun Ginkgo'],
    activeCompounds: 'Ginkgolides A, B, C, J, Bilobalide, Ginkgo Flavonoid Glikosida (24%), Ginkgotoksin',
    traditionalUses: [
      'Gangguan sirkulasi darah perifer (Claudicatio intermittens)',
      'Peningkatan memori, konsentrasi & pencegahan demensia',
      'Tinnitus (Telinga berdenging) & Vertigo'
    ],
    cypEffects: 'Inhibitor CYP2C9 & CYP2C19; Induktor CYP3A4',
    contraindicatedDrugs: [
      'Warfarin, NOAC, Aspirin (Risiko perdarahan intrakranial fatal)',
      'Antiepilepsi (Asam Valproat, Fenitoin, Karbamazepin - memicu kejang)',
      'Omeprazole (Efek penekan asam lambung menurun)'
    ],
    clinicalCautions: [
      'Ginkgotoksin dapat memicu bangkitan kejang pada pasien dengan riwayat epilepsi.',
      'Hentikan minimal 14 hari sebelum tindakan operasi elektif.'
    ]
  },
  {
    id: 'herb-ginseng',
    name: 'Ginseng (Panax & Som Jawa)',
    latinName: 'Panax ginseng / Talinum paniculatum',
    commonIndonesianNames: ['Ginseng Korea', 'Som Jawa', 'Kolesom', 'Ginseng Merah'],
    activeCompounds: 'Ginsenosides (Rg1, Rb1, Rd, Re), Panaxans, Poliasetilen',
    traditionalUses: [
      'Adaptogen (Mengatasi kelelahan kronis & stres fisik)',
      'Tonikum stamina & vitalitas pria',
      'Pemulihan pasca sakit'
    ],
    cypEffects: 'Induktor CYP2C9 & CYP3A4 hepar',
    contraindicatedDrugs: [
      'Warfarin (Menurunkan INR & efektivitas antikoagulan)',
      'Antidepresan SSRI & MAOI (Sindrom serotonin / mania)',
      'Imunosupresan pasca-transplantasi'
    ],
    clinicalCautions: [
      'Waspadai insomnia, palpitasi, dan kenaikan tekanan darah transien pada dosis berlebih.',
      'Hentikan minimal 7 hari sebelum tindakan operasi.'
    ]
  },
  {
    id: 'herb-kumis-kucing',
    name: 'Kumis Kucing & Kejibeling',
    latinName: 'Orthosiphon aristatus / Strobilanthes crispus',
    commonIndonesianNames: ['Kumis Kucing', 'Giri-giri Marah', 'Rempujang', 'Kejibeling', 'Enic-enic'],
    activeCompounds: 'Sinensetin, Eupatorin, Orthosiphol, Garam Kalium Tinggi (>600 mg/100g), Kalium Sitrat',
    traditionalUses: [
      'Peluruh batu saluran kemih (Nefrolitiasis)',
      'Infeksi Saluran Kemih (ISK) & Diuretik alami',
      'Asam urat tinggi (Gout)',
      'Hipertensi'
    ],
    cypEffects: 'Inhibisi minimal sitokrom hepar',
    contraindicatedDrugs: [
      'Spironolactone & Diuretik Hemat Kalium (Risiko Hiperkalemia)',
      'ACE-Inhibitor & ARB (Beban kalium tinggi)',
      'Lithium (Perubahan klirens ginjal lithium)'
    ],
    clinicalCautions: [
      'Pastikan pasien minum air putih minimal 2.5 liter per hari untuk mencegah dehidrasi.',
      'Dilarang pada pasien gagal jantung atau gagal ginjal dengan retensi cairan/oliguria tanpa pengawasan nefrolog.'
    ]
  },
  {
    id: 'herb-daun-sirsak',
    name: 'Daun Sirsak',
    latinName: 'Annona muricata',
    commonIndonesianNames: ['Daun Sirsak', 'Nangka Belanda', 'Srikaya Jawa', 'Graviola'],
    activeCompounds: 'Annonaceous Acetogenins (Annonacin, Bullatacin), Anonaine, Asimilobine',
    traditionalUses: [
      'Terapi komplementer tumor/kanker',
      'Antihipertensi tradisional',
      'Antidiabetes & antiinflamasi asam urat'
    ],
    cypEffects: 'Inhibisi CYP3A4 & P-glikoprotein',
    contraindicatedDrugs: [
      'Levodopa & Obat Parkinson (Memperberat neurodegenerasi motorik)',
      'Antihipertensi kombinasi (Hipotensi & bradikardia berat)',
      'Sedatif Benzodiazepin'
    ],
    clinicalCautions: [
      'Senyawa Annonacin memiliki neurotoksisitas dopaminergik pada penggunaan dosis tinggi jangka panjang.',
      'Kontraindikasi pada wanita hamil (efek stimulasi kontraksi uterus).'
    ]
  },
  {
    id: 'herb-kayu-manis',
    name: 'Kayu Manis Indonesia (Cassia)',
    latinName: 'Cinnamomum burmannii',
    commonIndonesianNames: ['Kayu Manis', 'Manis Jangan', 'Cinnamon Cassia'],
    activeCompounds: 'Cinnamaldehyde (65-80%), Coumarin (1-2%), Eugenol, Tanin',
    traditionalUses: [
      'Pengontrol gula darah (Diabetes Melitus tipe 2)',
      'Pereda perut kembung & karminatif',
      'Penyedap aroma jamu & antioksidan'
    ],
    cypEffects: 'Modulasi enzim CYP2A6 & CYP2E1',
    contraindicatedDrugs: [
      'Statin & Obat Hepatotoksik (Beban hepatotoksisitas koumarin)',
      'Antidiabetes Oral (Sinergisme hipoglikemia)'
    ],
    clinicalCautions: [
      'Spesies Cassia Indonesia mengandung kumarin hepatotoksik jauh lebih tinggi dibanding Ceylon cinnamon.',
      'Batasi asupan bubuk kayu manis harian maksimal 1 sendok teh per hari.'
    ]
  },
  {
    id: 'herb-jahe',
    name: 'Jahe Merah & Jahe Gajah',
    latinName: 'Zingiber officinale',
    commonIndonesianNames: ['Jahe Merah', 'Jahe Emprit', 'Jahe Gajah', 'Halia', 'Lia'],
    activeCompounds: 'Gingerol ([6]-gingerol), Shogaol, Zingerone, Zingiberene',
    traditionalUses: [
      'Mual-muntah (Morning sickness, motion sickness, pasca operasi)',
      'Masuk angin, batuk pilek, dan penghangat tubuh',
      'Nyeri sendi rematik (Osteoarthritis)'
    ],
    cypEffects: 'Inhibisi lemah CYP2C9',
    contraindicatedDrugs: [
      'Antikoagulan Warfarin / NOAC (Risiko perdarahan)',
      'Antiplatelet Aspirin / Clopidogrel'
    ],
    clinicalCautions: [
      'Aman dikonsumsi sebagai bumbu kuliner. Ekstrak suplemen pekat >4 g/hari berisiko memicu perdarahan mukosa.',
      'Dapat merangsang asam lambung jika diminum dalam keadaan perut kosong.'
    ]
  },
  {
    id: 'herb-meniran',
    name: 'Meniran Hijau (Fitofarmaka)',
    latinName: 'Phyllanthus niruri',
    commonIndonesianNames: ['Meniran', 'Memeniran', 'Gosau Madungi', 'Stimuno'],
    activeCompounds: 'Phyllanthin, Hypophyllanthin, Niranthin, Corilagin, Geraniin, Rutin',
    traditionalUses: [
      'Imunomodulator (Meningkatkan daya tahan tubuh saat sakit)',
      'Hepatoprotektor pada infeksi Hepatitis B',
      'Peluruh batu ginjal (Chanca Piedra / Stone Breaker)'
    ],
    cypEffects: 'Inhibisi CYP1A2 dan CYP2C9',
    contraindicatedDrugs: [
      'Imunosupresan Pasca-Cangkok & Obat Penyakit Autoimun (Lupus, RA, Psoriasis)',
      'Antidiabetes Oral (Efek hipoglikemik aditif)'
    ],
    clinicalCautions: [
      'Dilarang dikonsumsi secara terus-menerus >6 minggu tanpa evaluasi fungsi ginjal/hepar.',
      'Kontraindikasi pada wanita hamil (efek relaksasi otot polos uterus yang tidak terprediksi).'
    ]
  },
  {
    id: 'herb-pegagan',
    name: 'Pegagan (Gotu Kola)',
    latinName: 'Centella asiatica',
    commonIndonesianNames: ['Pegagan', 'Antanan Gede', 'Daun Kaki Kuda', 'Pegaga'],
    activeCompounds: 'Asiaticoside, Madecassoside, Asiatic acid, Madecassic acid, Triterpenoid',
    traditionalUses: [
      'Meningkatkan daya ingat, fungsi kognitif & konsentrasi (Brain tonic)',
      'Penyembuhan luka & keloid kulit',
      'Pereda kecemasan (Ansiolitik alami)'
    ],
    cypEffects: 'Inhibisi CYP2C9, CYP2C19, CYP2D6',
    contraindicatedDrugs: [
      'Sedatif & Benzodiazepin (Depresi SSP berat)',
      'Obat Hepatotoksik (Penggunaan kronis >6 minggu)'
    ],
    clinicalCautions: [
      'Dapat menyebabkan rasa kantuk; hindari mengemudi setelah konsumsi.',
      'Hentikan penggunaan setelah 6 minggu untuk mencegah beban enzim hepar.'
    ]
  },
  {
    id: 'herb-mahkota-dewa',
    name: 'Mahkota Dewa',
    latinName: 'Phaleria macrocarpa',
    commonIndonesianNames: ['Mahkota Dewa', 'Pusaka Dewa', 'Makuto Rojo', 'Simalakama'],
    activeCompounds: 'Phalerin, Mahkoside A, Saponin, Polifenol, Alkaloid',
    traditionalUses: [
      'Terapi komplementer asam urat & rematik',
      'Diabetes Melitus & Hipertensi',
      'Kanker & Mioma'
    ],
    cypEffects: 'Inhibisi CYP3A4 moderat',
    contraindicatedDrugs: [
      'Pengencer Darah (Warfarin, Aspirin)',
      'NSAID (Iritasi saluran cerna akut)'
    ],
    clinicalCautions: [
      'BIJI BUAH BERACUN (mengandung alkaloid toksik); hanya gunakan daging buah kering yang telah diolah higienis.',
      'Kontraindikasi pada wanita hamil.'
    ]
  },
  {
    id: 'herb-daun-kelor',
    name: 'Daun Kelor (Moringa)',
    latinName: 'Moringa oleifera',
    commonIndonesianNames: ['Daun Kelor', 'Moringga', 'Kelor Jawa', 'Marunggai'],
    activeCompounds: 'Quercetin, Kaempferol, Isothiocyanates, Chlorogenic Acid, Kalium & Kalsium Tinggi',
    traditionalUses: [
      'Nutrisi tinggi gizi & ASI Booster (Laktogagum)',
      'Antidiabetes & penurun kolesterol',
      'Antioksidan & antiinflamasi'
    ],
    cypEffects: 'Inhibisi CYP3A4 & CYP1A2',
    contraindicatedDrugs: [
      'Levothyroxine (Menghambat konversi T4 menjadi T3 aktif)',
      'Antidiabetes Oral (Hipoglikemia sinergis)'
    ],
    clinicalCautions: [
      'Waspadai pada pasien dengan gangguan fungsi tiroid yang menjalani terapi hormon sulih tiroid.',
      'Dosis ekstrak pekat yang berlebihan dapat memicu efek pencahar/diare ringan.'
    ]
  },
  {
    id: 'herb-daun-salam',
    name: 'Daun Salam',
    latinName: 'Syzygium polyanthum',
    commonIndonesianNames: ['Daun Salam', 'Ubar Serai', 'Mantang', 'Meselangan'],
    activeCompounds: 'Eugenol, Squalene, Flavonoid, Tanin Kondensasi',
    traditionalUses: [
      'Penurun kadar asam urat darah (Hiperurisemia)',
      'Pengontrol gula darah (Diabetes Melitus)',
      'Penurun tekanan darah tinggi'
    ],
    cypEffects: 'Inhibisi minimal sitokrom hepar',
    contraindicatedDrugs: [
      'Acarbose & Sulfonilurea (Sinergisme penurunan glukosa)',
      'Allopurinol (Sinergisme penurunan asam urat)'
    ],
    clinicalCautions: [
      'Konsumsi air rebusan dalam jumlah sangat banyak dapat memicu sembelit (konstipasi) akibat kadar tanin tinggi.',
      'Minum air putih yang cukup.'
    ]
  },
  {
    id: 'herb-aloe-vera',
    name: 'Lidah Buaya (Aloe vera)',
    latinName: 'Aloe vera / Aloe barbadensis',
    commonIndonesianNames: ['Lidah Buaya', 'Jadam Arab', 'Aloe'],
    activeCompounds: 'Aloin, Barbaloin, Aloe-emodin, Acemannan (Polisakarida)',
    traditionalUses: [
      'Pencahar alami pada konstipasi kronis (Getah latex kuning)',
      'Pereda radang lambung (Gel daging bening)',
      'Penyubur rambut & perawatan kulit luka bakar'
    ],
    cypEffects: 'Modulasi absorpsi obat di usus',
    contraindicatedDrugs: [
      'Digoxin (Hipokalemia pemicu toksisitas fatal)',
      'Diuretik Furosemide / HCT (Kehilangan kalium masif)',
      'Warfarin (Risiko perdarahan mukosa usus)'
    ],
    clinicalCautions: [
      'Getah kuning (latex) mengandung antrakuinon pencahar yang memicu kram perut hebat dan kehilangan elektrolit kalium jika dikonsumsi jangka panjang.',
      'Dilarang pada penderita radang usus akut (IBD/Crohn), ileus obstruktif, dan kehamilan.'
    ]
  },
  {
    id: 'herb-kulit-manggis',
    name: 'Kulit Manggis (Xanthone)',
    latinName: 'Garcinia mangostana',
    commonIndonesianNames: ['Kulit Manggis', 'Xanthone Manggis', 'Ratu Buah'],
    activeCompounds: 'Alpha-Mangostin, Gamma-Mangostin, Xanthones (Antioksidan Kuat)',
    traditionalUses: [
      'Antioksidan penangkal radikal bebas & anti-aging',
      'Terapi komplementer kanker & tumor',
      'Antiinflamasi & kesehatan kardiovaskular'
    ],
    cypEffects: 'Inhibisi CYP1A2, CYP2C9, CYP3A4',
    contraindicatedDrugs: [
      'Antikoagulan Warfarin & Antiplatelet (Inhibisi COX-1 & platelet)',
      'Kemoterapi Pro-Oksidan (Antagonisme efek sitotoksik)'
    ],
    clinicalCautions: [
      'Hentikan suplemen ekstrak kulit manggis minimal 14 hari sebelum jadwal operasi elektif.',
      'Konsultasikan dengan dokter spesialis onkologi bila dikonsumsi bersama kemoterapi.'
    ]
  },
  {
    id: 'herb-curcuma-xanthorrhiza',
    name: 'Temulawak (Curcuma Asli Indonesia)',
    latinName: 'Curcuma xanthorrhiza',
    commonIndonesianNames: ['Temulawak', 'Koneng Gede', 'Temu Labak'],
    activeCompounds: 'Xanthorrhizol, Curcuminoid (Curcumin, Desmethoxycurcumin), Minyak Atsiri (Germacrene, Turmerone)',
    traditionalUses: [
      'Hepatoprotektor (Penyakit Kuning, Hepatitis Kronik, Fatty Liver)',
      'Koleretik & Kolagogum (Peningkat sekresi empedu)',
      'Penambah nafsu makan & tonikum daya tahan tubuh',
      'Perbaikan metabolisme lipid darah'
    ],
    cypEffects: 'Inhibitor lemah CYP2C9, CYP3A4, dan P-glikoprotein',
    contraindicatedDrugs: [
      'Kolelitiasis obstruktif (batu empedu besar berisiko kolik bilier akut)',
      'Warfarin / NOAC (Risiko perdarahan mayor)',
      'Antiplatelet Aspirin / Clopidogrel'
    ],
    clinicalCautions: [
      'KONTRAINDIKASI FHI: Dilarang keras pada pasien dengan batu empedu simptomatik tanpa konsultasi bedah digestif.',
      'Hentikan minimal 14 hari sebelum pembedahan elektif.',
      'Awasi potensi hipoglikemia bila dikombinasikan dengan obat diabetes.'
    ]
  },
  {
    id: 'herb-mengkudu',
    name: 'Mengkudu / Buah Noni (Pace)',
    latinName: 'Morinda citrifolia',
    commonIndonesianNames: ['Mengkudu', 'Pace', 'Cengkudu', 'Tibah', 'Noni'],
    activeCompounds: 'Skopoletin (Scopoletin), Kalium Konsentrasi Tinggi (56 mEq/L), Asam Kaprilat, Damnacanthal',
    traditionalUses: [
      'Hipertensi esensial derajat 1-2',
      'Diabetes melitus (penurun glukosa darah)',
      'Kolesterol tinggi & arteriosklerosis',
      'Antiinflamasi sendi & antibakteri'
    ],
    cypEffects: 'Modulasi CYP3A4 dan glutathione S-transferase',
    contraindicatedDrugs: [
      'ACE Inhibitor (Captopril, Ramipril)',
      'ARB (Candesartan, Valsartan)',
      'Diuretik hemat kalium (Spironolactone, Eplerenone)',
      'Warfarin (kandungan vitamin K mengantagonis efek antikoagulan)'
    ],
    clinicalCautions: [
      'KONTRAINDIKASI MUTLAK pada pasien gagal ginjal kronis (CKD Stadium 3-5) karena risiko aritmia mematikan akibat hiperkalemia.',
      'Hindari konsumsi jus pekat bila fungsi hati terganggu.'
    ]
  },
  {
    id: 'herb-brotowali',
    name: 'Batang Brotowali ("Raja Jamu Pahit")',
    latinName: 'Tinospora crispa',
    commonIndonesianNames: ['Brotowali', 'Antawali', 'Andawali', 'Putrawali'],
    activeCompounds: 'Tinokrisposid (Tinocrisposide), Kolombin, Pikroretin, Palmatin, Berberin',
    traditionalUses: [
      'Diabetes melitus (stimulasi sekresi insulin alami)',
      'Demam berkala & malaria tradisi',
      'Pembersih darah kotor & gatal-gatal alergi',
      'Nafsu makan & tonikum pencernaan'
    ],
    cypEffects: 'Inhibitor CYP2D6 dan induktor enzim konjugasi hati',
    contraindicatedDrugs: [
      'Sulfonilurea (Glimepiride, Glibenclamide - risiko syok hipoglikemik berat)',
      'Metformin (risiko hipoglikemia & asidosis)',
      'Obat hepatotoksik (Rifampisin, INH OAT Tuberkulosis)'
    ],
    clinicalCautions: [
      'KONTRAINDIKASI pada penyakit hati aktif/hepatitis karena potensi toksisitas sel hepar pada konsumsi pekat jangka panjang.',
      'Dilarang untuk wanita hamil dan menyusui.',
      'Wajib monitor gula darah mandiri (SMBG) secara ketat.'
    ]
  },
  {
    id: 'herb-jambu-biji',
    name: 'Daun Jambu Biji (Antidiare Fitofarmaka)',
    latinName: 'Psidium guajava',
    commonIndonesianNames: ['Jambu Biji', 'Jambu Klutuk', 'Jambu Batu', 'Psidii Folium'],
    activeCompounds: 'Kuersetin (Quercetin min. 0.14%), Tanin Katekat (min. 9%), Minyak Atsiri (Caryophyllene, Cineol)',
    traditionalUses: [
      'Diare akut non-spesifik (adstringen mukosa usus)',
      'Trombositopenia demam berdarah dengue (DHF / DBD)',
      'Sariawan & radang gusi (kumur)',
      'Antimikroba patogen enterik (E. coli, Shigella)'
    ],
    cypEffects: 'Inhibisi P-glikoprotein & khelasi fisik obat di lumen saluran cerna',
    contraindicatedDrugs: [
      'Digoxin (penurunan absorpsi drastis >50%)',
      'Suplemen zat besi oral (pembentukan kompleks besi-tanat tidak larut)',
      'Antibiotik Kuinolon & Tetrasiklin (khelasi absorpsi sistemik)'
    ],
    clinicalCautions: [
      'Wajib diberi selang waktu minimal 2 hingga 3 jam dari obat dokter mana pun.',
      'Dilarang pada diare berdarah (disentri) atau ileus obstruktif.'
    ]
  },
  {
    id: 'herb-kejibeling',
    name: 'Keji Beling (Peluruh Batu Ginjal)',
    latinName: 'Strobilanthes crispa / Sericocalyx crispus',
    commonIndonesianNames: ['Keji Beling', 'Kecibeling', 'Enicostema', 'Daun Pecah Beling'],
    activeCompounds: 'Kalium Larut Air Sangat Tinggi (min. 1.50%), Asam Silikat, Flavonoid, Polifenol',
    traditionalUses: [
      'Nefrolitiasis & Urolitiasis (Batu ginjal dan saluran kemih)',
      'Diuretik pelancar air seni',
      'Diabetes melitus tradisi',
      'Wasir / hemoroid'
    ],
    cypEffects: 'Minimal terhadap enzim CYP, dominan efek farmakodinamik elektrolit kalium',
    contraindicatedDrugs: [
      'Diuretik hemat kalium (Spironolactone, Eplerenone)',
      'ACE Inhibitor & ARB dosis tinggi',
      'Suplemen kalium oral'
    ],
    clinicalCautions: [
      'Wajib minum air putih minimal 2.5 - 3 liter sehari untuk mencegah dehidrasi bilas batu.',
      'Dilarang pada batu ginjal berukuran > 10 mm yang memerlukan tindakan bedah.',
      'Kontraindikasi pada gagal ginjal anuria.'
    ]
  },
  {
    id: 'herb-tempuyung',
    name: 'Daun Tempuyung (Penghancur Batu Urat)',
    latinName: 'Sonchus arvensis',
    commonIndonesianNames: ['Tempuyung', 'Lombang-Lombang', 'Rayana', 'Galibug'],
    activeCompounds: 'Luteolin-7-O-glukosida, Apigenin, Kalium Alami Tinggi, Taraksasterol',
    traditionalUses: [
      'Meluruhkan kalkulus batu ginjal kalsium oksalat & asam urat',
      'Hiperurisemia & artritis gout',
      'Hipertensi ringan (efek natriuretik)',
      'Radang kandung kemih (sistitis)'
    ],
    cypEffects: 'Inhibisi lemah xantin oksidase hepar/usus',
    contraindicatedDrugs: [
      'Diuretik penahan kalium (Triamterene, Amiloride)',
      'ACE Inhibitor pada pasien gagal ginjal'
    ],
    clinicalCautions: [
      'Sinergis positif dengan Allopurinol namun perlu hidrasi sangat banyak.',
      'Hentikan jika terjadi kolik ginjal mendadak akibat pergeseran batu besar.'
    ]
  },
  {
    id: 'herb-sambung-nyawa',
    name: 'Daun Sambung Nyawa',
    latinName: 'Gynura procumbens',
    commonIndonesianNames: ['Sambung Nyawa', 'Daun Dewa Sambung', 'Ki Sambung'],
    activeCompounds: 'Kuersetin, Rutin, Asam Klorogenat, Asam Kafeat, Flavonoid Total (min. 0.14%)',
    traditionalUses: [
      'Hipertensi (stimulasi pelepasan prostasiklin & NO endotel)',
      'Diabetes melitus (aktivasi translokasi GLUT-4)',
      'Hiperlipidemia & aterosklerosis',
      'Antiinflamasi dan antioksidan'
    ],
    cypEffects: 'Modulasi CYP3A4 lemah',
    contraindicatedDrugs: [
      'Antihipertensi sintetik (Amlodipine, Captopril - risiko hipotensi ortostatik)',
      'Antidiabetes oral'
    ],
    clinicalCautions: [
      'Pantau tekanan darah berkala agar tidak terjadi hipotensi simtomatik.',
      'Hindari konsumsi berlebih pada wanita hamil.'
    ]
  },
  {
    id: 'herb-kencur',
    name: 'Kencur (Antitusif & Spasmolitik)',
    latinName: 'Kaempferia galanga',
    commonIndonesianNames: ['Kencur', 'Cikur', 'Kencor', 'Ceuko'],
    activeCompounds: 'Etil p-metoksisinamat (EPMS min. 4.0%), Borneol, Kamfer, Sineol',
    traditionalUses: [
      'Batuk berdahak & radang tenggorokan (antitusif ekspektoran)',
      'Nyeri perut / kolik lambung (spasmolitik carminative)',
      'Pegal linu & relaksasi otot (beras kencur)',
      'Sedatif ringan pereda stres'
    ],
    cypEffects: 'Inhibitor lemah CYP2E1 dan modulasi reseptor GABA-A sentral',
    contraindicatedDrugs: [
      'Obat penenang sedatif-hipnotik (Benzodiazepin, Zolpidem)',
      'Antihistamin generasi pertama (CTM, Diphenhydramine)',
      'Alkohol / eliksir obat'
    ],
    clinicalCautions: [
      'EPMS memperkuat sedasi obat penenang; hindari mengemudi kendaraan setelah minum jamu beras kencur kental bersama obat flu/alergi.'
    ]
  },
  {
    id: 'herb-sirih',
    name: 'Daun Sirih Hijau & Merah',
    latinName: 'Piper betle / Piper crocatum',
    commonIndonesianNames: ['Sirih', 'Seureuh', 'Sirih Merah', 'Suri', 'Sedah'],
    activeCompounds: 'Minyak Atsiri (min. 0.80% mengandung Kavikol, Kavibetol, Eugenol), Flavonoid, Tanin',
    traditionalUses: [
      'Antiseptik sariawan & kesehatan rongga mulut (kumur)',
      'Keputihan & kandidiasis vulvovaginitis (antijamur)',
      'Diabetes melitus tradisi (sirih merah)',
      'Hemostatik mimisan (daun digulung)'
    ],
    cypEffects: 'Inhibisi moderat CYP2C9 dan CYP3A4 oleh eugenol',
    contraindicatedDrugs: [
      'Antidiabetes oral (Metformin, Glimepiride - sinergis hipoglikemia)',
      'Antikoagulan oral dosis tinggi (eugenol memperpanjang masa perdarahan)',
      'Antijamur azol sistemik'
    ],
    clinicalCautions: [
      'Dilarang meneteskan air rebusan sirih pekat ke mata (risiko iritasi dan erosi epitel kornea).',
      'Pantau kadar gula darah mandiri bila rutin meminum jamu sirih merah.'
    ]
  },
  {
    id: 'herb-jati-belanda',
    name: 'Daun Jati Belanda (Pelangsing Herbal OHT)',
    latinName: 'Guazuma ulmifolia',
    commonIndonesianNames: ['Jati Belanda', 'Jati Londo', 'Bastard Cedar'],
    activeCompounds: 'Musilago (Lendir Serat Larut), Tanin Katekat (min. 11.0%), Damar, Triterpenoid',
    traditionalUses: [
      'Penurun berat badan & anti-obesitas (inhibisi lipase)',
      'Hiperkolesterolemia & dislipidemia',
      'Adstringen diare ringan',
      'Perut kembung'
    ],
    cypEffects: 'Adsorpsi fisik molekul obat di lumen usus (penurunan bioavailabilitas)',
    contraindicatedDrugs: [
      'Statin (Atorvastatin, Simvastatin - absorpsi obat dihambat serat)',
      'Imunosupresan lipofilik (Cyclosporine, Tacrolimus)',
      'Suplemen vitamin larut lemak (A, D, E, K)'
    ],
    clinicalCautions: [
      'Wajib diminum dengan jeda 2-3 jam dari obat dokter apa pun.',
      'Dilarang pada penderita malnutrisi, kaheksia, atau gagal ginjal.'
    ]
  },
  {
    id: 'herb-seledri',
    name: 'Herba Seledri (Antihipertensi Fitofarmaka)',
    latinName: 'Apium graveolens',
    commonIndonesianNames: ['Seledri', 'Sledri', 'Saladri', 'Celery'],
    activeCompounds: 'Apigenin (min. 0.15%), 3-n-Butilftalid (3nB), Flavonoid, Kalium Alami',
    traditionalUses: [
      'Hipertensi esensial ringan-sedang (Fitofarmaka Tensigard)',
      'Diuretik pelancar air seni & asam urat',
      'Pembersih darah',
      'Rematik & radang sendi'
    ],
    cypEffects: 'Inhibitor CYP1A2 lemah dan Ca-antagonis vaskular alami',
    contraindicatedDrugs: [
      'Calcium Channel Blocker (Amlodipine, Nifedipine - hipotensi ortostatik berat)',
      'ACE Inhibitor / ARB',
      'Beta-blocker (Bisoprolol - bradikardia berlebih)'
    ],
    clinicalCautions: [
      'Pantau tensi darah secara ketat saat mengonsumsi Fitofarmaka Tensigard bersama obat medis dokter.',
      'Kontraindikasi pada wanita hamil (biji seledri dosis tinggi merangsang kontraksi uterus).'
    ]
  },
  {
    id: 'herb-pala',
    name: 'Biji Pala (Sedatif Alami & Karminatif)',
    latinName: 'Myristica fragrans',
    commonIndonesianNames: ['Pala', 'Fai', 'Pala Banda', 'Nutmeg'],
    activeCompounds: 'Miristisin (Myristicin min. 1.0%), Elemisin, Safrol, Minyak Atsiri Volatil',
    traditionalUses: [
      'Insomnia & gangguan tidur gelisah (sedatif alami)',
      'Karminatif perut kembung & mual',
      'Spasmolitik saluran cerna',
      'Analgesik rematik topikal (minyak pala)'
    ],
    cypEffects: 'Inhibitor MAO lemah sentral dan inhibitor CYP2D6/CYP3A4',
    contraindicatedDrugs: [
      'Antidepresan MAOI (Phenelzine, Selegiline - KRISIS HIPERTENSI FATAL)',
      'Antidepresan SSRI (Fluoxetine, Sertraline - SINDROM SEROTONIN)',
      'Benzodiazepin & sedatif sistem saraf pusat'
    ],
    clinicalCautions: [
      'BAHAYA TOKSISITAS: Dilarang mengonsumsi serbuk biji pala melebihi 5 gram (mempercepat takikardia, halusinasi antikolinergik, delirium, dan koma).',
      'KONTRAINDIKASI KERAS pada kehamilan (pemicu keguguran abortifasien).'
    ]
  },
  {
    id: 'herb-temu-kunci',
    name: 'Temu Kunci (Protease Inhibitor Alami)',
    latinName: 'Boesenbergia rotunda / Boesenbergia pandurata',
    commonIndonesianNames: ['Temu Kunci', 'Kunci', 'Konci', 'Fingerroot'],
    activeCompounds: 'Panduratin A (min. 0.50%), Pinostrobin, Cardamonin, Minyak Atsiri',
    traditionalUses: [
      'Gangguan lambung (anti-Helicobacter pylori)',
      'Pelancar ASI & tonikum nifas wanita',
      'Antivirus & antibakteri saluran napas',
      'Penyegar badan & karminatif'
    ],
    cypEffects: 'Inhibitor CYP3A4 dan P-glikoprotein',
    contraindicatedDrugs: [
      'Protease Inhibitor ARV (Ritonavir, Lopinavir)',
      'Imunosupresan allograft'
    ],
    clinicalCautions: [
      'Hindari dosis tinggi pada wanita hamil trimester pertama.',
      'Beri jeda dari konsumsi obat dokter.'
    ]
  },
  {
    id: 'herb-purwoceng',
    name: 'Akar Purwoceng (Ginseng Asli Jawa)',
    latinName: 'Pimpinella pruatjan',
    commonIndonesianNames: ['Purwoceng', 'Suripandak Wangi', 'Pruatjan Dieng'],
    activeCompounds: 'Furanokumarin (Bergapten min. 0.10%, Pimpinellin), Stigmasterol, Kumarin',
    traditionalUses: [
      'Afrodisiak & tonikum vitalitas pria (stimulasi testosteron endogen)',
      'Adaptogen kelelahan fisik & stamina',
      'Diuretik & tonikum ginjal',
      'Pereda nyeri sendi'
    ],
    cypEffects: 'Inhibitor enzim mikrosomal hepar via furanokumarin',
    contraindicatedDrugs: [
      'Karsinoma prostat (sensitif terhadap kenaikan hormon androgen)',
      'Terapi sulih hormon testosteron eksogen (HRT)',
      'Warfarin & antikoagulan'
    ],
    clinicalCautions: [
      'Dilarang pada pria dengan riwayat kanker prostat atau hipertrofi prostat berat.',
      'Kontraindikasi pada hipertensi berat tidak terkontrol.'
    ]
  },
  {
    id: 'herb-pasak-bumi',
    name: 'Akar Pasak Bumi (Tongkat Ali)',
    latinName: 'Eurycoma longifolia',
    commonIndonesianNames: ['Pasak Bumi', 'Tongkat Ali', 'Bidara Laut', 'Malaysian Ginseng'],
    activeCompounds: 'Eurikomanon (Eurycomanone min. 0.80%), Kuasinoid, Eurycolactone, Alkaloid',
    traditionalUses: [
      'Tonikum stamina & disfungsi ereksi pria',
      'Peningkatan massa otot & penurunan kortisol stres',
      'Demam & tonikum pemulihan pasca sakit',
      'Antimalaria tradisi'
    ],
    cypEffects: 'Inhibitor CYP2C9 & CYP2D6 lemah',
    contraindicatedDrugs: [
      'Antidiabetes oral & insulin (sinergisme hipoglikemia)',
      'Obat antihipertensi Beta-blocker',
      'Imunosupresan'
    ],
    clinicalCautions: [
      'Awasi takikardia dan gangguan tidur bila dikonsumsi malam hari.',
      'Pantau kadar gula darah mandiri secara berkala.'
    ]
  },
  {
    id: 'herb-lempuyang',
    name: 'Lempuyang Wangi (Antiinflamasi Zerumbon)',
    latinName: 'Zingiber zerumbet',
    commonIndonesianNames: ['Lempuyang Wangi', 'Lempuyang Gajah', 'Zingiberis Zerumbeti'],
    activeCompounds: 'Zerumbon (Zerumbone min. 0.50%), Kampfen, Kariofilen',
    traditionalUses: [
      'Osteoarthritis & nyeri rematik (inhibisi COX-2 & iNOS)',
      'Hepatoprotektor & pembersih darah',
      'Penambah nafsu makan & dispepsia',
      'Antialergi & antipruritus'
    ],
    cypEffects: 'Modulasi ekspresi sitokrom CYP dan enzim glutation transferase',
    contraindicatedDrugs: [
      'NSAID (Ketorolac, Meloxicam - sinergis iritasi mukosa lambung)',
      'Antiplatelet & antikoagulan'
    ],
    clinicalCautions: [
      'Hindari penggunaan bersama pengencer darah pada pasien pra-bedah.',
      'Konsumsi sesudah makan.'
    ]
  },
  {
    id: 'herb-kayu-putih',
    name: 'Minyak Kayu Putih (Cineole Terstandar)',
    latinName: 'Melaleuca leucadendra',
    commonIndonesianNames: ['Kayu Putih', 'Galam', 'Cajuput', 'Minyak Kayu Putih'],
    activeCompounds: '1,8-Sineol (Cineole 50.0 - 65.0%), L-Pinen, Terpineol',
    traditionalUses: [
      'Ekspektoran mukolitik batuk & rinosinusitis (inhalasi uap)',
      'Spasmolitik bronkus & perut kembung (topikal/oral formulasi khusus)',
      'Antiseptik luka & gigitan serangga',
      'Analgesik hangat sendi'
    ],
    cypEffects: 'Induktor poten CYP1A2, CYP2B6, dan CYP3A4 jika tertelan',
    contraindicatedDrugs: [
      'Teofilin (kadar teofilin turun akibat induksi CYP1A2)',
      'Antikejang (Phenobarbital, Diazepam)'
    ],
    clinicalCautions: [
      'Minyak murni TIDAK BOLEH ditelan langsung pada anak-anak (risiko kejang dan depresi pernapasan).',
      'Jangan dioleskan pada wajah atau hidung bayi < 2 tahun.'
    ]
  },
  {
    id: 'herb-kemukus',
    name: 'Buah Kemukus (Antiseptik Saluran Kemih)',
    latinName: 'Piper cubeba',
    commonIndonesianNames: ['Kemukus', 'Lada Berekor', 'Rinu', 'Cubeb'],
    activeCompounds: 'Kubebin (Cubebin min. 1.20%), Minyak Atsiri (min. 10.0%), Asam Kubebat',
    traditionalUses: [
      'Antiseptik saluran kemih & radang kandung kemih',
      'Ekspektoran batuk berdahak obstruktif',
      'Karminatif perut kembung & kolik usus',
      'Penyegar nafas'
    ],
    cypEffects: 'Inhibitor lemah P-glikoprotein',
    contraindicatedDrugs: [
      'Diuretik kuat (Furosemide - diuresis berlebih)',
      'Antiseptik saluran kemih sintetik'
    ],
    clinicalCautions: [
      'Dilarang pada nefritis ginjal akut atau glomerulonefritis.',
      'Banyak minum air putih selama penggunaan sediaan kemukus.'
    ]
  }
];
