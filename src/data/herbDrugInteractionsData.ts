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
  }
,
  {
      "id": "hdi-garlic-anticoagulant",
      "herbName": "Ekstrak Bawang Putih (Garlic)",
      "latinName": "Allium sativum",
      "herbActiveCompounds": "Allicin, Ajoene, S-allyl-L-cysteine",
      "drugName": "Warfarin, DOAC (Rivaroxaban, Apixaban), Aspirin",
      "drugClass": "Antikoagulan & Antiplatelet",
      "interactionType": "Farmakodinamik (Sinergis)",
      "severity": "Mayor (Tinggi)",
      "clinicalEffect": "Peningkatan Drastis Risiko Perdarahan Spontan, Hematoma Luas, Epistaksis, dan Perdarahan Saluran Cerna.",
      "mechanism": "Ajoene dalam bawang putih menghambat agregasi trombosit via penghambatan sintetase tromboksan A2 dan mengantagonisasi reseptor fibrinogen GPIIb/IIIa secara irreversibel.",
      "clinicalRecommendation": "HENTIKAN konsumsi suplemen ekstrak bawang putih dosis tinggi minimal 7-10 hari sebelum tindakan operasi elektif. Batasi konsumsi suplemen garlic pada pasien yang mendapat terapi antikoagulan/antiplatelet.",
      "references": "Formularium Obat Herbal Asli Indonesia (FOHI) Kemenkes RI & Natural Medicines Comprehensive Database"
  },
  {
      "id": "hdi-ginkgo-antiplatelet",
      "herbName": "Ginkgo Biloba",
      "latinName": "Ginkgo biloba",
      "herbActiveCompounds": "Ginkgolide B, Bilobalide, Flavonol Glikosida",
      "drugName": "Aspirin, Clopidogrel, Cilostazol, Warfarin",
      "drugClass": "Antiplatelet & Antikoagulan",
      "interactionType": "Farmakodinamik (Sinergis)",
      "severity": "Mayor (Tinggi)",
      "clinicalEffect": "Perdarahan Spontan Berbahaya: Kasus Hematoma Subdural Spontan, Hifema Perdarahan Bilik Depan Mata, dan Perdarahan Pasca-Operasi.",
      "mechanism": "Ginkgolide B adalah antagonis poten Platelet-Activating Factor (PAF) yang memblokade agregasi trombosit yang diinduksi PAF.",
      "clinicalRecommendation": "KONTRAINDIKASI BERSAMAAN pada pasien dengan riwayat perdarahan aktif. Hentikan suplemen ginkgo minimal 14 hari sebelum pembedahan atau tindakan invasif.",
      "references": "WHO Monographs on Selected Medicinal Plants & CPIC Guidelines"
  },
  {
      "id": "hdi-ginseng-antidiabetic",
      "herbName": "Ginseng Korea / Ginseng Asia",
      "latinName": "Panax ginseng",
      "herbActiveCompounds": "Ginsenoside (Rb1, Rg1, Re)",
      "drugName": "Glibenclamide, Glimepiride, Metformin, Insulin",
      "drugClass": "Antidiabetes Oral & Insulin",
      "interactionType": "Farmakodinamik (Sinergis)",
      "severity": "Moderat (Sedang)",
      "clinicalEffect": "Hipoglikemia Akut Simtomatik (Keringat Dingin, Palpitasi, Tremor, Pusing Berputar hingga Penurunan Kesadaran).",
      "mechanism": "Ginsenosida meningkatkan sekresi insulin dari sel beta pankreas dan meningkatkan ekspresi transporter glukosa GLUT4 di otot rangka.",
      "clinicalRecommendation": "Pantau kadar glukosa darah mandiri (SMBG) secara lebih sering saat mengonsumsi ginseng. Sesuaikan dosis obat antidiabetes jika terjadi tren penurunan gula darah berlebih.",
      "references": "Formularium Obat Herbal Asli Indonesia Kemenkes RI"
  },
  {
      "id": "hdi-mengkudu-raas",
      "herbName": "Jus Buah Mengkudu / Noni",
      "latinName": "Morinda citrifolia",
      "herbActiveCompounds": "Scopoletin, Asam Kaprilat, Kalium Konsentrasi Tinggi (56 mEq/L)",
      "drugName": "Captopril, Ramipril, Candesartan, Spironolactone",
      "drugClass": "Antihipertensi Golongan ACEi, ARB & Diuretik Hemat Kalium",
      "interactionType": "Farmakodinamik (Sinergis)",
      "severity": "Mayor (Tinggi)",
      "clinicalEffect": "HIPERKALEMIA FATAL (K+ > 6.5 mEq/L), Blok Jantung, Aritmia Ventrikel, dan Asistol Jantung pada Pasien Gangguan Ginjal.",
      "mechanism": "Jus mengkudu mengandung konsentrasi kalium alami yang sangat tinggi yang bila dikombinasikan dengan obat penahan kalium memicu akumulasi kalium serum toksik.",
      "clinicalRecommendation": "KONTRAINDIKASI MUTLAK pada pasien gagal ginjal kronis (CKD) atau pengguna ACEi/ARB/Spironolactone. Hindari konsumsi jus mengkudu pekat.",
      "references": "American Journal of Kidney Diseases & Badan POM RI"
  },
  {
      "id": "hdi-meniran-immunosuppressant",
      "herbName": "Ekstrak Meniran Hijau",
      "latinName": "Phyllanthus niruri",
      "herbActiveCompounds": "Phyllanthin, Hypophyllanthin, Flavonoid Rutin",
      "drugName": "Tacrolimus, Cyclosporine, Mycophenolate Mofetil, Kortikosteroid",
      "drugClass": "Imunosupresan Pasca Transplantasi Organ & Autoimun",
      "interactionType": "Farmakodinamik (Antagonis)",
      "severity": "Mayor (Tinggi)",
      "clinicalEffect": "Kegagalan Imunosupresi, Presipitasi Rejeksi Allograft Transplantasi Organ, dan Kekambuhan Flare Penyakit Autoimun (Lupus).",
      "mechanism": "Ekstrak meniran adalah imunostimulan poten yang meningkatkan proliferasi sel T helper, sitokin IL-2/IFN-gamma, dan fagositosis makrofag yang menentang langsung kerja obat imunosupresif.",
      "clinicalRecommendation": "KONTRAINDIKASI MUTLAK bagi pasien penerima transplantasi organ atau pasien penyakit autoimun aktif yang sedang menjalani terapi imunosupresi.",
      "references": "Formularium Obat Herbal Asli Indonesia (FOHI) Kemenkes RI"
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
  }
];
