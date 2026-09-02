export type LabInteractionEffectType =
  | 'False Positive / Falsely High'
  | 'False Negative / Falsely Low'
  | 'Physiological Alteration';

export type LabCategory =
  | 'Kardiologi & Enzim Jantung'
  | 'Tiroid & Endokrin'
  | 'Fungsi Ginjal & Elektrolit'
  | 'Hematologi & Imunohematologi'
  | 'Glukosa & Metabolik'
  | 'Toksikologi & Narkoba Urin'
  | 'Gastrointestinal & Urinalisis';

export type LabSeverity = 'Kritis (Critical)' | 'Signifikan (Significant)' | 'Moderat (Moderate)';

export interface DrugLabInteraction {
  id: string;
  drugName: string;
  genericName: string;
  drugClass: string;
  labTestName: string;
  labCategory: LabCategory;
  effectType: LabInteractionEffectType;
  distortionDescription: string;
  biochemicalMechanism: string;
  clinicalImpact: string;
  managementRecommendation: string;
  severity: LabSeverity;
  references: string;
}

export interface LabPanelGuide {
  id: string;
  panelName: string;
  category: LabCategory;
  description: string;
  commonInterferingDrugs: {
    drugName: string;
    effect: string;
    mechanism: string;
    solution: string;
  }[];
  clinicalPearls: string[];
}

import { DRUG_LAB_EXTENDED_DATABASE } from './drugLabExtendedData';

const BASE_DRUG_LAB_INTERACTIONS: DrugLabInteraction[] = [
  // ==========================================
  // KARDIOLOGI & ENZIM JANTUNG
  // ==========================================
  {
    id: 'dli-biotin-troponin',
    drugName: 'Biotin (Vitamin B7 / Vitamin H dosis tinggi)',
    genericName: 'Biotin (>= 5 mg - 300 mg/hari)',
    drugClass: 'Vitamin & Suplemen Rambut/Kuku/Saraf',
    labTestName: 'Cardiac Troponin I & Troponin T (cTnI / cTnT)',
    labCategory: 'Kardiologi & Enzim Jantung',
    effectType: 'False Negative / Falsely Low',
    distortionDescription: 'Hasil Troponin Jantung Menjadi NEGATIF PALSU / SANGAT RENDAH PALSU pada pasien Sindrom Koroner Akut (STEMI / NSTEMI).',
    biochemicalMechanism: 'Biotin bebas dalam serum berikatan secara kompetitif dengan reagen streptavidin pada immunoassay sistem sandwich dua-sisi, mencegah pembentukan kompleks sinyal fluoresens sehingga sinyal terbaca rendah palsu.',
    clinicalImpact: 'SANGAT FATAL: Pasien serangan jantung infark miokard akut (IMA) salah didiagnosis normal / non-kardiak, menyebabkan penundaan reperfusi darurat dan kematian pasien.',
    managementRecommendation: 'Hentikan konsumsi suplemen Biotin minimal 48-72 jam sebelum pemeriksaan lab rutin. Pada kondisi darurat ACS, gunakan metode uji Troponin non-biotinylated atau informasikan segera ke laboratorium untuk teknik netralisasi streptavidin.',
    severity: 'Kritis (Critical)',
    references: 'FDA Safety Communication: Biotin Interference with Troponin Lab Tests & AACC Guidance'
  },
  {
    id: 'dli-statin-ck',
    drugName: 'Statin (Atorvastatin, Simvastatin, Rosuvastatin)',
    genericName: 'HMG-CoA Reductase Inhibitors',
    drugClass: 'Hipolipidemik (Kardiovaskular)',
    labTestName: 'Creatine Kinase / Creatine Phosphokinase (CK / CPK)',
    labCategory: 'Kardiologi & Enzim Jantung',
    effectType: 'Physiological Alteration',
    distortionDescription: 'Peningkatan Riil Enzim CK Serum (>5x hingga >50x Batas Atas Normal).',
    biochemicalMechanism: 'Miopati statin dan rabdomiolisis menyebabkan kerusakan integritas membran sel miosit otot rangka, memicu kebocoran enzim intraseluler Creatine Kinase ke dalam sirkulasi darah.',
    clinicalImpact: 'Menandakan miopati toksik atau rabdomiolisis berat yang berisiko memicu gagal ginjal akut akibat mioglobinuria (terutama jika dikombinasikan dengan Gemfibrozil).',
    managementRecommendation: 'Periksa CK baseline. Jika pasien mengalami nyeri otot (mialgia) berat dan kadar CK >5-10x ULN, segera hentikan terapi statin dan hidrasi cairan intravena adekuat.',
    severity: 'Signifikan (Significant)',
    references: 'ACC/AHA Cholesterol Clinical Practice Guidelines & PNPK Dislipidemia Kemenkes'
  },

  // ==========================================
  // TIROID & ENDOKRIN
  // ==========================================
  {
    id: 'dli-biotin-tsh-ft4',
    drugName: 'Biotin (Vitamin B7)',
    genericName: 'Biotin',
    drugClass: 'Vitamin & Suplemen Kecantikan/Saraf',
    labTestName: 'Thyroid Stimulating Hormone (TSH) & Free T4 (FT4)',
    labCategory: 'Tiroid & Endokrin',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'TSH Terbaca RENDAH PALSU dan FT4/FT3 Terbaca TINGGI PALSU (Menyerupai Pola Penyakit Graves / Hipertiroidisme Palsu).',
    biochemicalMechanism: 'Pada uji kompetitif FT4/FT3, biotin bebas menyebabkan sinyal emisi tinggi palsu. Pada uji immunometrik sandwich TSH, biotin menghambat penangkapan antibodi sehingga sinyal rendah palsu.',
    clinicalImpact: 'Pasien eutiroid salah didiagnosis sebagai Hipertiroidisme / Graves Disease, memicu peresepan obat antitiroid (PTU/Thiamazole) yang tidak perlu dan membahayakan pasien.',
    managementRecommendation: 'Edukasi pasien menghentikan suplemen multivitamin kecantikan mengandung biotin tinggi minimal 3-7 hari sebelum uji fungsi tiroid berkala.',
    severity: 'Kritis (Critical)',
    references: 'American Thyroid Association (ATA) Alert on Biotin Lab Interference'
  },
  {
    id: 'dli-heparin-ft4',
    drugName: 'Heparin (Unfractionated Heparin & LMWH)',
    genericName: 'Heparin Sodium / Enoxaparin',
    drugClass: 'Antikoagulan Parenteral',
    labTestName: 'Free Thyroxine (FT4)',
    labCategory: 'Tiroid & Endokrin',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Kadar FT4 Bebas dalam Serum Terbaca TINGGI PALSU in vitro.',
    biochemicalMechanism: 'Heparin menstimulasi enzim lipoprotein lipase endotel yang memecah trigliserida serum menjadi Asam Lemak Bebas (Non-Esterified Fatty Acids / NEFA) in vitro. NEFA mendesak ikatan T4 dari protein TBG, meningkatkan fraksi FT4 bebas saat sampel didiamkan.',
    clinicalImpact: 'Diagnosis hipertiroidisme palsu pada pasien rawat inap yang menerima antikoagulan infus.',
    managementRecommendation: 'Ambil sampel darah sebelum dosis heparin berikutnya atau segera proses sentrifugasi dan analisis serum dalam waktu <30 menit pasca flebotomi.',
    severity: 'Moderat (Moderate)',
    references: 'Tietz Clinical Guide to Laboratory Tests 4th Edition'
  },
  {
    id: 'dli-amiodarone-thyroid',
    drugName: 'Amiodarone',
    genericName: 'Amiodarone Hydrochloride',
    drugClass: 'Antiaritmia Kelas III (Kandungan Iodin 37% b/b)',
    labTestName: 'Panel Tiroid Lengkap (TSH, FT4, Total T3, Reverse T3)',
    labCategory: 'Tiroid & Endokrin',
    effectType: 'Physiological Alteration',
    distortionDescription: 'Perubahan Nyata Fisiologis: Peningkatan TSH & FT4 transien pada awal terapi, atau memicu Amiodarone-Induced Hypothyroidism (AIH) / Amiodarone-Induced Thyrotoxicosis (AIT).',
    biochemicalMechanism: 'Beban iodin masif (75 mg iodin per 200 mg tablet) memicu efek Wolff-Chaikoff (hambatan sintesis hormon tiroid) atau efek Jod-Basedow (hiperfungsi tiroid otonom), serta menghambat enzim 5\'-deiodinase perifer.',
    clinicalImpact: 'Memicu disfungsi tiroid klinis berat pada 15-20% pasien aritmia kronis.',
    managementRecommendation: 'Wajib periksa TSH dan FT4 baseline sebelum memulai Amiodarone, lalu evaluasi berkala tiap 3-6 bulan selama terapi.',
    severity: 'Signifikan (Significant)',
    references: 'European Thyroid Association (ETA) Guidelines for Amiodarone-Induced Thyroid Dysfunction'
  },

  // ==========================================
  // FUNGSI GINJAL & ELEKTROLIT
  // ==========================================
  {
    id: 'dli-trimethoprim-creatinine',
    drugName: 'Trimethoprim (dalam Cotrimoxazole)',
    genericName: 'Trimethoprim + Sulfamethoxazole',
    drugClass: 'Antibakteri Antifolat',
    labTestName: 'Serum Creatinine (Kreatinin Serum) & Estimasi eGFR',
    labCategory: 'Fungsi Ginjal & Elektrolit',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Kadar Kreatinin Serum Naik 20-35% (Pseudo-Renal Failure) Tanpa Adanya Penurunan Laju Filtrasi Glomerulus (GFR) yang Sebenarnya.',
    biochemicalMechanism: 'Trimethoprim merupakan basa organik yang secara kompetitif menghambat transporter kation organik (OCT2 & MATE) pada tubulus proksimal ginjal yang memediasi sekresi aktif kreatinin ke urin.',
    clinicalImpact: 'Dokter salah menduga terjadi Acute Kidney Injury (AKI) atau nefrotoksisitas akut, menyebabkan penghentian obat esensial yang keliru.',
    managementRecommendation: 'Konfirmasi fungsi ginjal sejati menggunakan Blood Urea Nitrogen (BUN) atau Cystatin-C yang tidak dipengaruhi oleh transporter sekresi tubulus.',
    severity: 'Signifikan (Significant)',
    references: 'Kidney International Reports on Drug-Induced Pseudonephrotoxicity'
  },
  {
    id: 'dli-cimetidine-creatinine',
    drugName: 'Cimetidine',
    genericName: 'Cimetidine',
    drugClass: 'Antagonis Reseptor H2 (H2RA)',
    labTestName: 'Kreatinin Serum & Klirens Kreatinin (CrCl)',
    labCategory: 'Fungsi Ginjal & Elektrolit',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Kreatinin Serum Meningkat Palsu (CrCl Terbaca Lebih Rendah).',
    biochemicalMechanism: 'Inhibisi kompetitif sekresi tubulus ginjal terhadap kreatinin melalui transporter OCT2 pada membran basolateral sel tubulus proksimal.',
    clinicalImpact: 'Penyesuaian dosis obat lain menjadi terlalu rendah akibat estimasi eGFR palsu yang turun.',
    managementRecommendation: 'Ganti ke Famotidine atau Ranitidine yang memiliki afinitas inhibisi OCT2 jauh lebih minimal.',
    severity: 'Moderat (Moderate)',
    references: 'Winter’s Basic Clinical Pharmacokinetics & Tietz'
  },
  {
    id: 'dli-spironolactone-digoxin-assay',
    drugName: 'Spironolactone',
    genericName: 'Spironolactone',
    drugClass: 'Diuretik Hemat Kalium (Antagonis Aldosteron)',
    labTestName: 'Serum Digoxin Level Immunoassay',
    labCategory: 'Fungsi Ginjal & Elektrolit',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Kadar Digoksin Serum Terbaca TINGGI PALSU pada Therapeutic Drug Monitoring (TDM).',
    biochemicalMechanism: 'Metabolit aktif spironolakton (Canrenone) memiliki kemiripan struktur steroid glikosida dan bereaksi silang (cross-reactivity) dengan antibodi pada immunoassay Digoksin fluoresens/enzimatik.',
    clinicalImpact: 'Dosis Digoksin diturunkan secara keliru padahal kadar terapeutik sesungguhnya masih suboptimal, memicu perburukan gagal jantung atau AF.',
    managementRecommendation: 'Gunakan metode pemeriksaan Digoksin berteknologi Kromatografi Cair Kinerja Tinggi (HPLC-MS/MS) atau immunoassay generasi terbaru yang bebas reaktivitas silang canrenone.',
    severity: 'Signifikan (Significant)',
    references: 'Clinical Chemistry & Pharmacotherapy: A Pathophysiologic Approach'
  },

  // ==========================================
  // HEMATOLOGI & IMUNOHEMATOLOGI
  // ==========================================
  {
    id: 'dli-ceftriaxone-coombs',
    drugName: 'Sefalosporin (Ceftriaxone, Cefotaxime, Cefazolin)',
    genericName: 'Cephalosporin Antibiotics',
    drugClass: 'Antibakteri Beta-Laktam',
    labTestName: 'Direct Antiglobulin Test (Direct Coombs Test)',
    labCategory: 'Hematologi & Imunohematologi',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Uji Coombs Langsung Menjadi POSITIF PALSU (Hingga 3-5% Pasien Rawat Inap).',
    biochemicalMechanism: 'Molekul sefalosporin berikatan dengan membran eritrosit secara non-imunologis dan mengadsorpsi protein plasma (imunoglobulin IgG dan komplemen C3) ke permukaan sel darah merah.',
    clinicalImpact: 'Salah didiagnosis sebagai Anemia Hemolitik Autoimun (AIHA) atau reaksi transfusi hemolitik akut.',
    managementRecommendation: 'Korelasikan dengan parameter hemolisis sejati (Kadar Hemoglobin, Retikulosit, Haptoglobin, dan Bilirubin Indirek). Positif palsu Coombs akibat sefalosporin umumnya tidak disertai hemolisis klinis.',
    severity: 'Signifikan (Significant)',
    references: 'AABB Technical Manual & British Journal of Haematology Guidelines'
  },
  {
    id: 'dli-methyldopa-coombs',
    drugName: 'Methyldopa',
    genericName: 'Methyldopa',
    drugClass: 'Antihipertensi Sentral',
    labTestName: 'Direct Coombs Test (DAT) & Skrining Antibodi Eritrosit',
    labCategory: 'Hematologi & Imunohematologi',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Uji Coombs Positif pada 10-20% Pasien Penggunaan Kronis >6 Bulan.',
    biochemicalMechanism: 'Methyldopa mengubah antigen permukaan eritrosit atau menekan sel T-supresor, merangsang produksi autoantibodi IgG sejati anti-Rh (Warm Autoantibody).',
    clinicalImpact: 'Menyulitkan uji kecocokan silang (Crossmatch) darah saat pasien membutuhkan transfusi darah darurat.',
    managementRecommendation: 'Lakukan uji elusi antibodi di Bank Darah / PMI untuk membedakan autoantibodi methyldopa dengan alloantibodi klinis signifikan.',
    severity: 'Signifikan (Significant)',
    references: 'AABB Guidelines on Drug-Induced Immune Hemolytic Anemia'
  },

  // ==========================================
  // GLUKOSA & METABOLIK
  // ==========================================
  {
    id: 'dli-vitaminc-glucose',
    drugName: 'Vitamin C (Asam Askorbat dosis tinggi)',
    genericName: 'Ascorbic Acid (>= 500 mg - 2000 mg/hari)',
    drugClass: 'Antioksidan & Suplemen Imun',
    labTestName: 'Glukosa Darah Strip (Glukometer Enzimatik) & Darah Samar Feses (FOBT)',
    labCategory: 'Glukosa & Metabolik',
    effectType: 'False Negative / Falsely Low',
    distortionDescription: 'Kadar Gula Darah Strip Terbaca RENDAH PALSU dan Uji Darah Samar Feses (FOBT Guaiac) Menjadi NEGATIF PALSU.',
    biochemicalMechanism: 'Asam askorbat adalah agen pereduksi kuat yang mengonsumsi hidrogen peroksida (H2O2) perantara pada reaksi kromogenik enzim Glucose Oxidase dan reaksi Guaiac FOBT.',
    clinicalImpact: 'Menutupi kondisi hiperglikemia berbahaya pada pasien diabetes dan menutupi perdarahan lesi kanker kolorektal dini pada skrining feses.',
    managementRecommendation: 'Gunakan metode heksokinase laboratorium sentral untuk pemeriksaan glukosa akurat. Hentikan vitamin C dosis tinggi minimal 3 hari sebelum tes skrining FOBT feses.',
    severity: 'Signifikan (Significant)',
    references: 'Clinical Chemistry & Tietz Laboratory Guide'
  },
  {
    id: 'dli-paracetamol-cgm',
    drugName: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol / Acetaminophen',
    drugClass: 'Analgesik & Antipiretik',
    labTestName: 'Continuous Glucose Monitoring (CGM Sensor Glukosa Kontinu)',
    labCategory: 'Glukosa & Metabolik',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Sensor Glukosa Interstitial CGM Terbaca TINGGI PALSU (Falsely High Glucose Readings).',
    biochemicalMechanism: 'Paracetamol mengalami elektro-oksidasi langsung pada permukaan elektroda sensor enzimatik CGM generasi lama, menghasilkan arus listrik tambahan yang diinterpretasikan sebagai konsentrasi glukosa tinggi.',
    clinicalImpact: 'Pasien diabetes dapat keliru menginjeksi dosis bolus insulin berlebihan yang berujung pada Hipoglikemia Berat yang mengancam nyawa.',
    managementRecommendation: 'Pasien pengguna CGM generasi lama wajib melakukan konfirmasi glukosa darah kapiler (fingerstick) sebelum koreksi dosis insulin jika sedang mengonsumsi Paracetamol.',
    severity: 'Kritis (Critical)',
    references: 'FDA Safety Communication on Acetaminophen Interference with CGM Systems'
  },
  {
    id: 'dli-levodopa-urine-glucose',
    drugName: 'Levodopa / Carbidopa',
    genericName: 'Levodopa',
    drugClass: 'Antiparkinsonian Dopaminergik',
    labTestName: 'Uji Reduksi Glukosa Urin (Benedict / Fehling / Clinitest) & Keton Urin',
    labCategory: 'Glukosa & Metabolik',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Tes Glukosa Urin Reduksi dan Keton Urin Menjadi POSITIF PALSU.',
    biochemicalMechanism: 'Metabolit katekolamin levodopa mereduksi ion tembaga (Cu2+ -> Cu+) pada reagen Benedict dan bereaksi dengan natrium nitroprusida pada uji keton strip.',
    clinicalImpact: 'Kecurigaan keliru adanya glikosuria atau ketoasidosis diabetikum pada pasien geriatri Parkinson.',
    managementRecommendation: 'Gunakan tes urin strip berbasis enzim glukosa oksidase murni (dipstick spesifik) yang tidak bereaksi dengan zat pereduksi non-glukosa.',
    severity: 'Moderat (Moderate)',
    references: 'Tietz Clinical Guide to Laboratory Tests'
  },

  // ==========================================
  // TOKSIKOLOGI & SKRINING NARKOBA URIN
  // ==========================================
  {
    id: 'dli-quinolone-opiate',
    drugName: 'Fluoroquinolone (Levofloxacin, Ofloxacin, Ciprofloxacin)',
    genericName: 'Levofloxacin / Ofloxacin',
    drugClass: 'Antibiotik Fluoroquinolone',
    labTestName: 'Urine Drug Screen: Panel Opiat / Morfin (UDS Opiates)',
    labCategory: 'Toksikologi & Narkoba Urin',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Hasil Uji Skrining Narkoba Urin Opiat Terbaca POSITIF PALSU.',
    biochemicalMechanism: 'Struktur cincin kuinolon bereaksi silang (cross-reactivity) dengan antibodi monoklonal/poliklonal immunoassay opiat pada strip tes narkoba cepat.',
    clinicalImpact: 'Tuduhan hukum keliru atau diskualifikasi seleksi kerja terhadap pasien yang baru saja menyelesaikan terapi antibiotik infeksi paru/saluran kemih.',
    managementRecommendation: 'Wajib lakukan uji konfirmasi baku emas Kromatografi Gas - Spektrometri Massa (GC-MS) atau LC-MS/MS yang spesifik sebelum penetapan vonis positif narkoba.',
    severity: 'Signifikan (Significant)',
    references: 'Substance Abuse and Mental Health Services Administration (SAMHSA) & Mayo Clinic Proceedings'
  },
  {
    id: 'dli-rifampicin-opiate',
    drugName: 'Rifampisin',
    genericName: 'Rifampicin',
    drugClass: 'Obat Anti Tuberkulosis (OAT)',
    labTestName: 'Skrining Opiat Urin & Urinalisis Spektrofotometri',
    labCategory: 'Toksikologi & Narkoba Urin',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Skrining Opiat Urin Positif Palsu dan Urinalisis Bilirubin/Protein Terganggu.',
    biochemicalMechanism: 'Ekskresi metabolit rifampisin berwarna merah-oranye kuat mengganggu pembacaan optik spektrofotometri dan bereaksi silang pada enzim immunoassay opiat.',
    clinicalImpact: 'Hasil positif palsu pada pasien TBC yang sedang menjalani program pengobatan resmi OAT Kemenkes.',
    managementRecommendation: 'Lampirkan riwayat pengobatan OAT pada form laboratorium dan gunakan konfirmasi GC-MS.',
    severity: 'Signifikan (Significant)',
    references: 'CDC TB Treatment Guidelines & Clinical Chemistry'
  },
  {
    id: 'dli-pseudoephedrine-amphetamine',
    drugName: 'Pseudoephedrine / Ephedrine',
    genericName: 'Pseudoephedrine Hydrochloride',
    drugClass: 'Dekongestan Oral (Obat Flu & Batuk Pilek)',
    labTestName: 'Urine Drug Screen: Panel Amfetamin / Metamfetamin (Sabu)',
    labCategory: 'Toksikologi & Narkoba Urin',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Skrining Narkoba Urin Amfetamin Terbaca POSITIF PALSU.',
    biochemicalMechanism: 'Kemiripan struktur fenetilamin antara pseudoefedrin dan d-amfetamin memicu pengikatan silang pada reagen immunoassay skrining cepat.',
    clinicalImpact: 'Pasien yang meminum obat flu bebas (OTC) disangka sebagai penyalahguna narkotika amfetamin.',
    managementRecommendation: 'Uji konfirmasi definitif dengan metode kromatografi GC-MS membedakan enantiomer d/l amfetamin sejati dari pseudoefedrin.',
    severity: 'Signifikan (Significant)',
    references: 'SAMHSA Drug-Testing Advisory & Journal of Analytical Toxicology'
  },
  {
    id: 'dli-ibuprofen-barbiturate-marijuana',
    drugName: 'NSAID (Ibuprofen, Naproxen dosis tinggi)',
    genericName: 'Ibuprofen',
    drugClass: 'Analgesik & Antiinflamasi Nonsteroid',
    labTestName: 'Urine Drug Screen: Panel Barbiturat & Kanabinoid (THC / Ganja)',
    labCategory: 'Toksikologi & Narkoba Urin',
    effectType: 'False Positive / Falsely High',
    distortionDescription: 'Skrining Barbiturat atau Cannabinoid THC Urin Positif Palsu pada immunoassay kit tertentu.',
    biochemicalMechanism: 'Inhibisi kompetitif pengikatan enzim-ligan oleh metabolit asam karboksilat NSAID in vitro.',
    clinicalImpact: 'Kekeliruan identifikasi penyalahgunaan zat sedatif pada pasien nyeri rematik.',
    managementRecommendation: 'Gunakan kit immunoassay generasi baru dengan spesifisitas tinggi atau konfirmasi GC-MS.',
    severity: 'Moderat (Moderate)',
    references: 'Journal of Analytical Toxicology'
  }
,
  {
      "id": "dli-fluoroquinolone-opiate-screen",
      "drugName": "Levofloxacin & Ciprofloxacin (Florokuinolon)",
      "genericName": "Levofloxacin / Ciprofloxacin",
      "drugClass": "Antibiotik Florokuinolon",
      "labTestName": "Opiate Urine Drug Screen (UDS Narkoba Urin)",
      "labCategory": "Toksikologi & Narkoba Urin",
      "effectType": "False Positive / Falsely High",
      "distortionDescription": "Hasil Skrining Narkoba Urin Menjadi POSITIF PALSU OPIAT / OPIOID pada Pasien yang Tidak Mengonsumsi Narkotika.",
      "biochemicalMechanism": "Struktur cincin kuinolon florokuinolon memiliki reaktivitas silang (cross-reactivity) dengan antibodi immunoassay opiat pada strip uji skrining urin.",
      "clinicalImpact": "Tuduhan salah penyalahgunaan narkotika pada uji skrining kerja atau medikolegal.",
      "managementRecommendation": "Konfirmasi hasil positif skrining urin menggunakan metode kromatografi gas spektrometri massa (GC-MS) atau LC-MS konfirmatori yang spesifik dan tidak dipengaruhi antibiotik.",
      "severity": "Signifikan (Significant)",
      "references": "Clinical Chemistry Journal & Mayo Clinic Laboratories Drug Interference Guide"
  },
  {
      "id": "dli-vitaminc-glucose-megadose",
      "drugName": "Vitamin C Dosis Tinggi (Asam Askorbat >= 1000 mg/hari)",
      "genericName": "Ascorbic Acid (Injeksi IV / Oral Megadose)",
      "drugClass": "Vitamin & Antioksidan",
      "labTestName": "Glukosa Darah Strip Point-of-Care & Glukosa Urin (Dipstick)",
      "labCategory": "Glukosa & Metabolik",
      "effectType": "False Negative / Falsely Low",
      "distortionDescription": "Hasil Glukosa Urin dan Strip Darah Glukosa Oksidase Menjadi NEGATIF PALSU / RENDAH PALSU pada Pasien Diabetes.",
      "biochemicalMechanism": "Asam askorbat konsentrasi tinggi adalah agen pereduksi kuat yang berkompetisi dengan kromogen, mereduksi hidrogen peroksida (H2O2) yang dihasilkan oleh reaksi enzim glukosa oksidase, mencegah perubahan warna strip uji.",
      "clinicalImpact": "Kegagalan deteksi hiperglikemia berat atau ketoasidosis diabetik pada pasien rawat intensif.",
      "managementRecommendation": "Gunakan metode uji laboratorium enzimatik heksokinase di laboratorium sentral (yang tidak dipengaruhi vitamin C) untuk evaluasi glikemik akurat.",
      "severity": "Kritis (Critical)",
      "references": "FDA Safety Communication & Clinical Chemistry"
  },
  {
      "id": "dli-rifampicin-bilirubin",
      "drugName": "Rifampicin (OAT / Tuberkulosis)",
      "genericName": "Rifampicin",
      "drugClass": "Antibiotik Rifamisin",
      "labTestName": "Total Bilirubin & Direct Bilirubin Serum",
      "labCategory": "Gastrointestinal & Urinalisis",
      "effectType": "False Positive / Falsely High",
      "distortionDescription": "Peningkatan PALSU Signifikan Kadar Bilirubin Total dan Direk Serum.",
      "biochemicalMechanism": "Warna oranye-merah terang rifampisin dan metabolitnya mengganggu spektrofotometri pada panjang gelombang pembacaan uji diazo bilirubin serta berkompetisi sementara pada transporter serapan hepar OATP1B1.",
      "clinicalImpact": "Kekhawatiran keliru terjadinya hepatotoksisitas ikterik berat yang memicu penghentian OAT yang tidak perlu.",
      "managementRecommendation": "Ambil sampel darah sebelum dosis harian rifampisin diminum (saat kadar palung obat), dan evaluasi enzim transaminase SGOT/SGPT sebagai indikator kerusakan hepar sejati.",
      "severity": "Signifikan (Significant)",
      "references": "Sanford Guide to Antimicrobial Therapy & Tietz Textbook of Clinical Chemistry"
  }
];

export const DRUG_LAB_INTERACTIONS_DATABASE: DrugLabInteraction[] = [
  ...BASE_DRUG_LAB_INTERACTIONS,
  ...DRUG_LAB_EXTENDED_DATABASE
];

export const LAB_PANEL_GUIDES: LabPanelGuide[] = [
  {
    id: 'panel-kardiologi',
    panelName: 'Panel Enzim Jantung & Kardiologi',
    category: 'Kardiologi & Enzim Jantung',
    description: 'Pemeriksaan biomarker iskemia miokard, kerusakan otot jantung, dan gangguan ritme (Troponin I/T, CK-MB, CK Total, BNP/NT-proBNP).',
    commonInterferingDrugs: [
      {
        drugName: 'Biotin (Vitamin B7)',
        effect: 'Negatif Palsu Troponin I & T',
        mechanism: 'Inhibisi ikatan streptavidin pada immunoassay',
        solution: 'Gunakan uji non-biotinylated atau tunda 48 jam'
      },
      {
        drugName: 'Statin (Simvastatin/Atorvastatin)',
        effect: 'Elevasi Riil CK Total',
        mechanism: 'Miopati & rabdomiolisis skeletal',
        solution: 'Evaluasi gejala mialgia dan hidrasi bila CK >5x ULN'
      }
    ],
    clinicalPearls: [
      'Biotin adalah penyebab nomor 1 kasus kematian akibat terlewatnya diagnosis serangan jantung (NSTEMI) di seluruh dunia (FDA Warning).',
      'Selalu tanyakan riwayat suplemen rambut/kuku sebelum interpretasi hasil Troponin darurat di IGD.'
    ]
  },
  {
    id: 'panel-tiroid',
    panelName: 'Panel Fungsi Tiroid (TSH, FT4, FT3)',
    category: 'Tiroid & Endokrin',
    description: 'Evaluasi hipotiroidisme, hipertiroidisme, dan monitoring terapi sulih hormon tiroid.',
    commonInterferingDrugs: [
      {
        drugName: 'Biotin Dosis Tinggi',
        effect: 'TSH Rendah Palsu + FT4 Tinggi Palsu (Mirip Graves)',
        mechanism: 'Gangguan immunoassay kompetitif & sandwich',
        solution: 'Stop suplemen biotin 3-7 hari sebelum tes tiroid'
      },
      {
        drugName: 'Heparin IV / LMWH',
        effect: 'FT4 Tinggi Palsu in vitro',
        mechanism: 'Lipase melepas FFA yang mendesak T4 dari TBG',
        solution: 'Sentrifugasi serum segera <30 menit'
      },
      {
        drugName: 'Amiodarone',
        effect: 'Disfungsi Tiroid Riil (AIH/AIT)',
        mechanism: 'Beban iodin masif 37% & efek Wolff-Chaikoff',
        solution: 'Monitor berkala TSH/FT4 tiap 3-6 bulan'
      }
    ],
    clinicalPearls: [
      'Kombinasi TSH sangat rendah (<0.01) dengan FT4 tinggi pada pasien tanpa gejala hipertiroid hampir selalu merupakan interferensi Biotin in vitro.'
    ]
  },
  {
    id: 'panel-ginjal',
    panelName: 'Panel Fungsi Ginjal & Elektrolit (Kreatinin, eGFR, BUN)',
    category: 'Fungsi Ginjal & Elektrolit',
    description: 'Penilaian laju filtrasi glomerulus, penyesuaian dosis obat nefrotoksik, dan status hidrasi.',
    commonInterferingDrugs: [
      {
        drugName: 'Trimethoprim (Cotrimoxazole)',
        effect: 'Kreatinin Naik 20-35% (Pseudo-AKI)',
        mechanism: 'Inhibisi transporter sekresi tubulus OCT2',
        solution: 'Ukur Cystatin-C atau BUN yang tidak terganggu'
      },
      {
        drugName: 'Cimetidine',
        effect: 'Kreatinin Naik Palsu',
        mechanism: 'Kompetisi sekresi tubulus proksimal',
        solution: 'Ganti ke Famotidine'
      },
      {
        drugName: 'Spironolactone',
        effect: 'Digoksin Serum Terbaca Tinggi Palsu',
        mechanism: 'Reaktivitas silang metabolit canrenone',
        solution: 'Gunakan uji HPLC-MS/MS'
      }
    ],
    clinicalPearls: [
      'Peningkatan kreatinin serum pasca pemberian Cotrimoxazole tanpa kenaikan BUN adalah fenomena benigna pseudonefrotoksisitas.'
    ]
  },
  {
    id: 'panel-toksikologi',
    panelName: 'Panel Skrining Narkoba Urin (Urine Drug Screen / UDS)',
    category: 'Toksikologi & Narkoba Urin',
    description: 'Skrining cepat panel 5-6 zat: Opiat, Amfetamin, Benzodiazepin, Kanabinoid (THC), Kokain, Barbiturat.',
    commonInterferingDrugs: [
      {
        drugName: 'Fluoroquinolone (Levofloxacin)',
        effect: 'Opiat Urin Positif Palsu',
        mechanism: 'Cross-reactivity dengan antibodi opiat',
        solution: 'Wajib konfirmasi definitif dengan GC-MS'
      },
      {
        drugName: 'Rifampisin',
        effect: 'Opiat Urin Positif Palsu',
        mechanism: 'Interferensi kromogenik & antibodi',
        solution: 'Konfirmasi GC-MS'
      },
      {
        drugName: 'Pseudoefedrin (Obat Flu)',
        effect: 'Amfetamin Urin Positif Palsu',
        mechanism: 'Kemiripan struktur fenetilamin',
        solution: 'Konfirmasi GC-MS'
      }
    ],
    clinicalPearls: [
      'Uji skrining cepat narkoba urin (strip immunoassay) HANYA bersifat presumtif. Semua hasil positif WAJIB dikonfirmasi dengan metode baku emas GC-MS atau LC-MS/MS sebelum memiliki konsekuensi hukum/administratif.'
    ]
  }
];
