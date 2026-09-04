import { DrugDiseaseInteraction } from '../types';
import { DRUG_DISEASE_EXTENDED_DATABASE } from './drugDiseaseExtendedData';
import { DDINTER_OFFICIAL_DISEASE_INTERACTIONS } from './ddinterDiseaseInteractionsData';

const BASE_DRUG_DISEASE_INTERACTIONS: DrugDiseaseInteraction[] = [
  // =========================================================================
  // 1. RESPIRASI & PARU (ASMA & PPOK)
  // =========================================================================
  {
    id: 'ddsi-propranolol-asthma',
    drugName: 'Propranolol',
    diseaseName: 'Asma Bronkial & PPOK (Penyakit Paru Obstruktif Kronis)',
    diseaseCategory: 'Respirasi & Paru',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Propranolol adalah beta-blocker non-selektif yang memblokade reseptor beta-2 adrenergik pada otot polos bronkus.',
    clinicalRisk: 'BRONKOSPASME FATAL, SERANGAN ASMA AKUT BERAT REFRAKTER, DAN GAGAL NAPAS AKUT.',
    recommendation: 'KONTRAINDIKASI MUTLAK. Jangan gunakan beta-blocker non-selektif pada penderita asma/PPOK. Jika mutlak diperlukan beta-blocker kardiologis, pilih beta-1 selektif (Bisoprolol, Metoprolol suksinat, Nebivolol) dengan titrasi dosis sangat hati-hati.',
    references: 'GINA Guidelines & FDA Boxed Warning'
  },
  {
    id: 'ddsi-timolol-asthma',
    drugName: 'Timolol (Tetes Mata / Oral)',
    diseaseName: 'Asma Bronkial & PPOK',
    diseaseCategory: 'Respirasi & Paru',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Penyerapan sistemik timolol tetes mata via mukosa duktus nasolakrimalis memblokade reseptor beta-2 bronkial tanpa melewati metabolisme lintas pertama hati.',
    clinicalRisk: 'Eksaserbasi Asma Akut Parah yang Mengancam Jiwa pada Pasien Glaukoma.',
    recommendation: 'KONTRAINDIKASI pada pasien asma. Ganti obat glaukoma ke golongan Prostaglandin Analog (Latanoprost) atau Carbonic Anhydrase Inhibitor (Dorzolamide).',
    references: 'FDA Prescribing Info'
  },
  {
    id: 'ddsi-aspirin-asthma',
    drugName: 'Aspirin (Asam Asetilsalisilat)',
    diseaseName: 'Aspirin-Exacerbated Respiratory Disease (AERD / Asma Sensitif Aspirin)',
    diseaseCategory: 'Respirasi & Paru',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Inhibisi COX-1 mengalihkan metabolisme asam arakidonat ke jalur 5-lipoksigenase, memicu produksi berlebih leukotrien sisteinil bronkokonstriktor kuat (LTC4, LTD4, LTE4).',
    clinicalRisk: 'Trias Samter / Serangan Bronkospasme Akut Hebat Disertai Rinitis Berat, Polip Hidung, dan Syok Hipoksia.',
    recommendation: 'KONTRAINDIKASI MUTLAK pada pasien riwayat alergi salisilat / triad asma. Gunakan Parasetamol dosis rendah (<=500 mg) sebagai analgesik alternatif.',
    references: 'AAAAI Practice Guidelines'
  },

  // =========================================================================
  // 2. GINJAL & SALURAN KEMIH (CKD, GAGAL GINJAL & BPH)
  // =========================================================================
  {
    id: 'ddsi-nsaid-ckd',
    drugName: 'Ibuprofen / Ketorolac / Diclofenac / Meloxicam / Mefenamic Acid',
    diseaseName: 'Penyakit Ginjal Kronis (CKD Stadium 3-5 / Gagal Ginjal Akut)',
    diseaseCategory: 'Ginjal & Saluran Kemih',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'NSAID menghambat sintesis prostaglandin renal (PGE2 dan PGI2) yang bertindak sebagai vasodilator arteriol aferen glomerulus ginjal.',
    clinicalRisk: 'PENURUNAN DRASTIS LAJU FILTRASI GLOMERULUS (GFR), NEKROSIS PAPILER GINJAL, GAGAL GINJAL TERMINAL CEPAT, RETENSI CAIRAN MASIF, DAN HIPERKALEMIA.',
    recommendation: 'KONTRAINDIKASI pada eGFR <30 mL/min/1.73m2 dan hindari pada eGFR <60. Gunakan Parasetamol atau opioid dosis rendah sebagai pereda nyeri.',
    references: 'KDIGO Clinical Practice Guideline for CKD'
  },
  {
    id: 'ddsi-metformin-ckd',
    drugName: 'Metformin',
    diseaseName: 'Gagal Ginjal Berat (eGFR < 30 mL/min/1.73m2)',
    diseaseCategory: 'Ginjal & Saluran Kemih',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Metformin diekskresikan 100% utuh via ginjal; disfungsi ginjal berat memicu akumulasi metformin sistemik yang memblokade glukoneogenesis hepar dan oksidasi laktat mitokondria.',
    clinicalRisk: 'ASIDOSIS LAKTAT METFORMIN (MALA) YANG MEMATIKAN DENGAN ANGKA MORTALITAS > 50%.',
    recommendation: 'KONTRAINDIKASI MUTLAK jika eGFR < 30 mL/min. Jika eGFR 30-44 mL/min, batasi dosis maksimal 1000 mg/hari. Pantau eGFR minimal tiap 3-6 bulan.',
    references: 'ADA Standards of Care & FDA Black Box Warning'
  },
  {
    id: 'ddsi-pseudoephedrine-bph',
    drugName: 'Pseudoephedrine / Fenilefrin',
    diseaseName: 'Hiperplasia Prostat Jinak (BPH) & Obstruksi Saluran Kemih',
    diseaseCategory: 'Ginjal & Saluran Kemih',
    severity: 'Major',
    contraindicationLevel: 'Peringatan Ketat (Black Box / Relative)',
    mechanism: 'Stimulasi reseptor alfa-1 adrenergik memicu konstriksi otot polos leher kandung kemih dan kapsul prostat.',
    clinicalRisk: 'RETENSI URIN AKUT TOTAL YANG MEMBUTUHKAN PEMASANGAN KATETER DARURAT.',
    recommendation: 'HINDARI dekongestan oral pada pria dengan BPH bergejala. Gunakan nasal spray salin atau antihistamin topikal jika mengalami hidung tersumbat.',
    references: 'AUA Guidelines on BPH Management'
  },
  {
    id: 'ddsi-trihexyphenidyl-bph',
    drugName: 'Trihexyphenidyl / Amitriptyline / Diphenhydramine',
    diseaseName: 'Hiperplasia Prostat Jinak (BPH) & Retensi Urin',
    diseaseCategory: 'Ginjal & Saluran Kemih',
    severity: 'Major',
    contraindicationLevel: 'Peringatan Ketat (Black Box / Relative)',
    mechanism: 'Blokade reseptor muskarinik M3 melemahkan tonus kontraksi otot detrusor kandung kemih.',
    clinicalRisk: 'Retensi Urin Akut, Overdistensi Buli, dan Peningkatan Risiko Urosepsis.',
    recommendation: 'HINDARI obat antikolinergik kuat pada pasien retensi urin atau BPH berat.',
    references: 'Beers Criteria 2023'
  },

  // =========================================================================
  // 3. KARDIOVASKULAR (GAGAL JANTUNG, ARITMIA, HIPERTENSI BERAT)
  // =========================================================================
  {
    id: 'ddsi-verapamil-chf',
    drugName: 'Verapamil / Diltiazem (Non-DHP CCB)',
    diseaseName: 'Gagal Jantung dengan Fraksi Ejeksi Menurun (HFrEF NYHA II-IV)',
    diseaseCategory: 'Kardiovaskular',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Efek inotropik negatif kuat menurunkan kontraktilitas miokardium ventrikel kiri secara langsung.',
    clinicalRisk: 'DEKOMPENSASI GAGAL JANTUNG AKUT BERAT, EDEMA PARU AKUT, DAN PENINGKATAN ANGKA KEMATIAN KARDIOVASKULAR.',
    recommendation: 'KONTRAINDIKASI MUTLAK pada HFrEF (LVEF <=40%). Jika membutuhkan CCB untuk hipertensi/angina, gunakan Dihidropiridin generasi lanjut (Amlodipine).',
    references: 'ACC/AHA/HFSA Heart Failure Guidelines'
  },
  {
    id: 'ddsi-pioglitazone-chf',
    drugName: 'Pioglitazone (Tiazolidinedion / TZD)',
    diseaseName: 'Gagal Jantung Kongestif Simtomatik (NYHA Kelas I-IV)',
    diseaseCategory: 'Kardiovaskular',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Aktivasi PPAR-gamma meningkatkan reabsorpsi natrium dan cairan di tubulus distal ginjal via saluran ENaC.',
    clinicalRisk: 'Retensi Cairan Masif, Eksaserbasi Gagal Jantung Kongestif Akut, dan Edema Paru Bilateral.',
    recommendation: 'KONTRAINDIKASI MUTLAK (FDA Black Box Warning) pada NYHA kelas III-IV, dan tidak direkomendasikan pada NYHA I-II.',
    references: 'FDA Black Box Warning & ADA-EASD Consensus'
  },
  {
    id: 'ddsi-nsaid-chf',
    drugName: 'Ibuprofen / Diclofenac / Meloxicam / Celecoxib',
    diseaseName: 'Gagal Jantung Kongestif (CHF)',
    diseaseCategory: 'Kardiovaskular',
    severity: 'Major',
    contraindicationLevel: 'Peringatan Ketat (Black Box / Relative)',
    mechanism: 'Inhibisi prostaglandin renal memicu retensi natrium/air dan peningkatan resistensi vaskular sistemik (afterload).',
    clinicalRisk: 'Rawat Inap Ulang Akibat Dekompensasi Gagal Jantung dan Resistensi Terapi Diuretik Furosemid.',
    recommendation: 'HINDARI penggunaan NSAID pada seluruh pasien gagal jantung. Pilih alternatif analgesik non-NSAID.',
    references: 'ESC Heart Failure Guidelines'
  },
  {
    id: 'ddsi-pseudoephedrine-hypertension',
    drugName: 'Pseudoephedrine / Fenilefrin / Efedrin',
    diseaseName: 'Hipertensi Berat / Hipertensi Tidak Terkontrol',
    diseaseCategory: 'Kardiovaskular',
    severity: 'Major',
    contraindicationLevel: 'Peringatan Ketat (Black Box / Relative)',
    mechanism: 'Agonisme alfa-1 dan beta-1 adrenergik memicu vasokonstriksi arteriol sistemik dan takikardia.',
    clinicalRisk: 'KRISIS HIPERTENSI AKUT (TD > 180/120 mmHg), STROKE HEMORAGIK, ATAU INFARK MIOKARD.',
    recommendation: 'KONTRAINDIKASI pada hipertensi berat / tidak terkontrol. Gunakan dekongestan topikal (Oxymetazoline maks 3 hari) atau terapi non-farmakologi.',
    references: 'AHA/ACC Hypertension Guidelines'
  },
  {
    id: 'ddsi-amiodarone-bradycardia',
    drugName: 'Amiodarone / Digoxin / Beta-Blockers',
    diseaseName: 'Bradikardia Berat (<50 bpm) & Blok AV Derajat II-III Tanpa Pacemaker',
    diseaseCategory: 'Kardiovaskular',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Depresi konduksi impuls nodus sinoatrial (SA node) dan perpanjangan periode refrakter nodus atrioventrikular (AV node).',
    clinicalRisk: 'HENTI SINUS (SINUS ARREST), ASISTOL, SINKOP, DAN HENTI JANTUNG.',
    recommendation: 'KONTRAINDIKASI MUTLAK kecuali pasien telah terpasang alat pacu jantung permanen (pacemaker).',
    references: 'AHA/ACC/HRS Guidelines'
  },

  // =========================================================================
  // 4. GASTROINTESTINAL & HEPAR (ULKUS, GERD, SIROSIS & GANGGUAN HATI)
  // =========================================================================
  {
    id: 'ddsi-nsaid-peptic-ulcer',
    drugName: 'Ketorolac / Ibuprofen / Diclofenac / Piroxicam / Mefenamic Acid',
    diseaseName: 'Ulkus Peptikum Aktif, Tukak Lambung & Riwayat Perdarahan Saluran Cerna',
    diseaseCategory: 'Gastrointestinal & Hepar',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Inhibisi enzim COX-1 mukosa lambung menekan sintesis prostaglandin sitoprotektif (PGE2/PGI2), mengurangi sekresi bikarbonat dan mukus serta memicu erosi epitel lambung langsung.',
    clinicalRisk: 'PERFORASI LAMBUNG AKUT, PERDARAHAN SALURAN CERNA MASIF (HEMATEMESIS / MELENA), SYOK HIPOVOLEMIK, DAN KEMATIAN.',
    recommendation: 'KONTRAINDIKASI MUTLAK pada ulkus peptikum aktif. Jika mutlak membutuhkan analgesik pada riwayat ulkus lama, gunakan COX-2 selektif (Celecoxib) wajib dikombinasi dengan PPI (Omeprazole/Lansoprazole).',
    references: 'ACG Clinical Guideline on Ulcer Bleeding'
  },
  {
    id: 'ddsi-paracetamol-cirrhosis',
    drugName: 'Paracetamol (Dosis Tinggi > 2 g/hari)',
    diseaseName: 'Sirosis Hepar Berat / Gagal Hati Akut / Hepatitis Aktif',
    diseaseCategory: 'Gastrointestinal & Hepar',
    severity: 'Major',
    contraindicationLevel: 'Peringatan Ketat (Black Box / Relative)',
    mechanism: 'Deplesi glutation hepar pada sirosis mempercepat akumulasi metabolit reaktif hepatotoksik NAPQI.',
    clinicalRisk: 'Presipitasi Ensefalopati Hepatikum dan Nekrosis Hepatoseluler Fatal.',
    recommendation: 'BATASI DOSIS MAKSIMAL PARASETAMOL 2000 MG/HARI (2 g/hari) pada pasien sirosis hepar kronis stabil. Hindari pada gagal hati akut.',
    references: 'AASLD Practice Guidelines'
  },
  {
    id: 'ddsi-valproate-liver-failure',
    drugName: 'Asam Valproat / Natrium Divalproex',
    diseaseName: 'Penyakit Hati Aktif atau Disfungsi Hepar Signifikan',
    diseaseCategory: 'Gastrointestinal & Hepar',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Metabolit 4-ene-valproat menghambat beta-oksidasi asam lemak mitokondria hepatosit, memicu mikrovesikular steatosis dan nekrosis.',
    clinicalRisk: 'GAGAL HATI AKUT FATAL TERUTAMA PADA 6 BULAN PERTAMA TERAPI.',
    recommendation: 'KONTRAINDIKASI MUTLAK (FDA Black Box Warning). Monitor LFT baseline dan berkala.',
    references: 'FDA Black Box Warning'
  },
  {
    id: 'ddsi-alendronate-gerd',
    drugName: 'Alendronate / Risedronate (Bifosfonat Oral)',
    diseaseName: 'Striktur Esofagus, Akalasia & Disfagia / GERD Berat',
    diseaseCategory: 'Gastrointestinal & Hepar',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Iritasi kimia korosif langsung pada mukosa esofagus bila tablet mengalami kontak berkepanjangan.',
    clinicalRisk: 'Ulkus Esofagus Perforatif Berat, Esofagitis Erosif, dan Striktur Esofagus.',
    recommendation: 'KONTRAINDIKASI bila pasien tidak mampu berdiri/duduk tegak minimal 30 menit. Pertimbangkan bifosfonat intravena (Zoledronic Acid).',
    references: 'FDA Prescribing Information'
  },

  // =========================================================================
  // 5. OFTALMOLOGI (GLAUKOMA)
  // =========================================================================
  {
    id: 'ddsi-amitriptyline-glaucoma',
    drugName: 'Amitriptyline / Trihexyphenidyl / Hyoscine / Atropine',
    diseaseName: 'Glaukoma Sudut Tertutup (Narrow-Angle Glaucoma)',
    diseaseCategory: 'Oftalmologi',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Blokade kolinergik memicu dilatasi pupil (midriasis), mendesak iris perifer ke jalinan trabekular dan menyumbat sudut bilik mata depan.',
    clinicalRisk: 'LONJAKAN TEKANAN INTRAOKULAR (TIO) AKUT EKSTREM, KEBUTAAN PERMANEN MENDADAK, DAN NYERI MATA HEBAT.',
    recommendation: 'KONTRAINDIKASI MUTLAK pada glaukoma sudut tertutup yang belum diiridotomi.',
    references: 'American Academy of Ophthalmology Preferred Practice Pattern'
  },

  // =========================================================================
  // 6. ENDOKRIN & METABOLIK (DIABETES & GOUT)
  // =========================================================================
  {
    id: 'ddsi-corticosteroids-diabetes',
    drugName: 'Dexamethasone / Methylprednisolone / Prednisone',
    diseaseName: 'Diabetes Melitus Tipe 1 & Tipe 2',
    diseaseCategory: 'Endokrin & Metabolik',
    severity: 'Moderate',
    contraindicationLevel: 'Gunakan dengan Kehati-hatian (Caution)',
    mechanism: 'Kortikosteroid meningkatkan glukoneogenesis hepar, menekan translokasi transporter GLUT4, dan memicu resistensi insulin perifer.',
    clinicalRisk: 'HIPERGLIKEMIA BERAT REFRAKTER, KETOASIDOSIS DIABETIK (DKA), ATAU SINDROM HHS.',
    recommendation: 'Pantau profil gula darah serial. Wajib lakukan eskalasi dosis insulin/antidiabetes selama terapi steroid dan turunkan kembali saat steroid di-taper off.',
    references: 'ADA Standards of Care'
  },
  {
    id: 'ddsi-thiazide-gout',
    drugName: 'Hydrochlorothiazide (HCT) / Furosemide',
    diseaseName: 'Gout Artritis Kronis & Riwayat Hiperurisemia Berat',
    diseaseCategory: 'Endokrin & Metabolik',
    severity: 'Moderate',
    contraindicationLevel: 'Gunakan dengan Kehati-hatian (Caution)',
    mechanism: 'Diuretik berkompetisi dengan asam urat pada transporter sekresi anion tubulus ginjal (URAT1/OAT) dan meningkatkan reabsorpsi asam urat di tubulus proksimal akibat deplesi volume.',
    clinicalRisk: 'Presipitasi Serangan Artritis Gout Akut Hebat dan Pembentukan Tophi Sendi.',
    recommendation: 'Ganti obat antihipertensi ke golongan ARB Losartan (yang memiliki efek urikosurik unik) atau CCB.',
    references: 'ACR Guideline for the Management of Gout'
  },

  // =========================================================================
  // 7. NEUROLOGI & PSIKIATRI (EPILEPSI, PARKINSON, MIASTENIA GRAVIS)
  // =========================================================================
  {
    id: 'ddsi-tramadol-epilepsy',
    drugName: 'Tramadol / Bupropion / Clozapine',
    diseaseName: 'Epilepsi & Riwayat Gangguan Kejang',
    diseaseCategory: 'Neurologi & Psikiatri',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Penurunan ambang kejang (seizure threshold) di korteks serebri via modulasi reseptor GABA dan monoamina.',
    clinicalRisk: 'SERANGAN KEJANG STATUS EPILEPTIKUS YANG MENGANCAM JIWA.',
    recommendation: 'KONTRAINDIKASI pada pasien epilepsi tidak terkontrol. Gunakan analgesik atau antidepresan alternatif yang tidak memicu kejang.',
    references: 'FDA Boxed Warning & ILAE Epilepsy Guidelines'
  },
  {
    id: 'ddsi-metoclopramide-parkinson',
    drugName: 'Metoclopramide / Haloperidol / Risperidone',
    diseaseName: 'Penyakit Parkinson & Gangguan Ekstrapiramidal',
    diseaseCategory: 'Neurologi & Psikiatri',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Antagonisme kuat reseptor dopamin D2 di jalur nigrostriatal basal ganglia otak.',
    clinicalRisk: 'KRISIS AKINESIA AKUT, RIGIDITAS EKSTREM, DAN PERBURUKAN DRAMATIS GEJALA PARKINSON.',
    recommendation: 'KONTRAINDIKASI MUTLAK. Sebagai antiemetik pada pasien Parkinson, gunakan Domperidone (yang tidak menembus sawar darah otak) atau Ondansetron.',
    references: 'Movement Disorder Society Guidelines'
  },
  {
    id: 'ddsi-gentamicin-myasthenia',
    drugName: 'Gentamicin / Amikacin / Ciprofloxacin / Levofloxacin',
    diseaseName: 'Miastenia Gravis',
    diseaseCategory: 'Neurologi & Psikiatri',
    severity: 'Major',
    contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)',
    mechanism: 'Blokade neuromuskular presinaptik (menghambat pelepasan asetilkolin) dan pascasinaptik pada neuromuscular junction.',
    clinicalRisk: 'KRISIS MIASTENIK AKUT DENGAN PARALISIS OTOT PERNAPASAN DAN GAGAL NAPAS TOTAL.',
    recommendation: 'KONTRAINDIKASI MUTLAK (FDA Black Box Warning). Gunakan golongan antibiotik alternatif (Beta-laktam / Makrolida).',
    references: 'Myasthenia Gravis Foundation of America & FDA Black Box'
  }
];

function deduplicateDrugDiseaseInteractions(list: DrugDiseaseInteraction[]): DrugDiseaseInteraction[] {
  const map = new Map<string, DrugDiseaseInteraction>();
  const SEVERITY_WEIGHT: Record<string, number> = { Major: 3, Moderate: 2, Minor: 1 };

  list.forEach((item) => {
    const key = (item.drugName.toLowerCase().trim() + '__' + item.diseaseName.toLowerCase().trim());
    if (!map.has(key)) {
      map.set(key, item);
    } else {
      const existing = map.get(key)!;
      const existingWeight = SEVERITY_WEIGHT[existing.severity] || 1;
      const newWeight = SEVERITY_WEIGHT[item.severity] || 1;
      if (newWeight > existingWeight) {
        map.set(key, item);
      }
    }
  });
  return Array.from(map.values());
}

export const DRUG_DISEASE_INTERACTIONS_DATABASE: DrugDiseaseInteraction[] = deduplicateDrugDiseaseInteractions([
  ...BASE_DRUG_DISEASE_INTERACTIONS,
  ...DRUG_DISEASE_EXTENDED_DATABASE,
  ...DDINTER_OFFICIAL_DISEASE_INTERACTIONS
]);

export interface ComorbidityProfile {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  contraindicatedDrugClasses: string[];
}

export const COMMON_CLINICAL_DISEASES: ComorbidityProfile[] = [
  {
    id: 'dis-asthma',
    name: 'Asma Bronkial & PPOK',
    category: 'Respirasi & Paru',
    icon: '🫁',
    description: 'Penyakit inflamasi kronis saluran napas dengan bronkokonstriksi reversibel.',
    contraindicatedDrugClasses: ['Beta-Blocker Non-Selektif (Propranolol, Timolol)', 'Aspirin & NSAID (Sensitivitas AERD)']
  },
  {
    id: 'dis-ckd',
    name: 'Penyakit Ginjal Kronis (CKD) / Gagal Ginjal',
    category: 'Ginjal & Saluran Kemih',
    icon: '🩺',
    description: 'Penurunan laju filtrasi glomerulus (eGFR < 60 mL/min).',
    contraindicatedDrugClasses: ['NSAID (Ibuprofen, Ketorolac, Meloxicam)', 'Metformin (eGFR < 30)', 'Aminoglikosida']
  },
  {
    id: 'dis-chf',
    name: 'Gagal Jantung Kongestif (CHF / HFrEF)',
    category: 'Kardiovaskular',
    icon: '❤️',
    description: 'Sindrom disfungsi kontraktilitas atau pengisian ventrikel miokardium.',
    contraindicatedDrugClasses: ['Non-DHP CCB (Verapamil, Diltiazem)', 'Tiazolidinedion (Pioglitazone)', 'NSAID']
  },
  {
    id: 'dis-ulcer',
    name: 'Ulkus Lambung & Riwayat Perdarahan GI',
    category: 'Gastrointestinal & Hepar',
    icon: '🩸',
    description: 'Tukak peptikum lambung/duodenum aktif atau riwayat perdarahan mukosa.',
    contraindicatedDrugClasses: ['NSAID Sistemik', 'Aspirin Dosis Tinggi', 'Kortikosteroid Dosis Tinggi']
  },
  {
    id: 'dis-glaucoma',
    name: 'Glaukoma Sudut Tertutup',
    category: 'Oftalmologi',
    icon: '👁️',
    description: 'Penyumbatan drainase sudut trabekular mata dengan risiko lonjakan TIO mendadak.',
    contraindicatedDrugClasses: ['Antikolinergik (Amitriptyline, Trihexyphenidyl, Hyoscine)', 'Dekongestan (Pseudoephedrine)']
  },
  {
    id: 'dis-bph',
    name: 'Hiperplasia Prostat Jinak (BPH)',
    category: 'Ginjal & Saluran Kemih',
    icon: '🚻',
    description: 'Pembesaran kelenjar prostat dengan risiko retensi urin akut.',
    contraindicatedDrugClasses: ['Dekongestan Alfa-1 (Pseudoephedrine)', 'Antikolinergik & Antihistamin Generasi 1']
  },
  {
    id: 'dis-liver',
    name: 'Penyakit Hati Aktif & Sirosis Hepar',
    category: 'Gastrointestinal & Hepar',
    icon: '🩹',
    description: 'Kerusakan parenkim hati kronis dengan penurunan kapasitas metabolisme hepar.',
    contraindicatedDrugClasses: ['Asam Valproat', 'Parasetamol Dosis Tinggi (>2 g/hari)', 'Statin Dosis Tinggi']
  },
  {
    id: 'dis-diabetes',
    name: 'Diabetes Melitus',
    category: 'Endokrin & Metabolik',
    icon: '🩸',
    description: 'Gangguan metabolisme glukosa dengan hiperglikemia kronis.',
    contraindicatedDrugClasses: ['Kortikosteroid Sistemik Dosis Tinggi', 'Beta-Blocker Non-Selektif (Masking Hipoglikemia)']
  },
  {
    id: 'dis-hypertension-severe',
    name: 'Hipertensi Berat / Tidak Terkontrol',
    category: 'Kardiovaskular',
    icon: '📈',
    description: 'Tekanan darah sistolik >=180 mmHg atau diastolik >=110 mmHg.',
    contraindicatedDrugClasses: ['Dekongestan Simpatomimetik (Pseudoephedrine, Fenilefrin)', 'Ergotamine']
  },
  {
    id: 'dis-gout',
    name: 'Gout Artritis & Hiperurisemia',
    category: 'Endokrin & Metabolik',
    icon: '🦶',
    description: 'Penumpukan kristal monosodium urat pada persendian akibat hiperurisemia.',
    contraindicatedDrugClasses: ['Diuretik Tiazid (HCT)', 'Loop Diuretic (Furosemide)']
  },
  {
    id: 'dis-parkinson',
    name: 'Penyakit Parkinson',
    category: 'Neurologi & Psikiatri',
    icon: '🧠',
    description: 'Gangguan neurodegeneratif akibat defisiensi dopamin di substansia nigra.',
    contraindicatedDrugClasses: ['Antagonis Dopamin Sentral (Metoclopramide, Haloperidol, Risperidone)']
  },
  {
    id: 'dis-myasthenia',
    name: 'Miastenia Gravis',
    category: 'Neurologi & Psikiatri',
    icon: '⚡',
    description: 'Gangguan transmisi neuromuskular autoimun dengan kelemahan otot fluktuatif.',
    contraindicatedDrugClasses: ['Aminoglikosida (Gentamicin, Amikacin)', 'Florokuinolon (Ciprofloxacin, Levofloxacin)']
  },
  {
    id: 'dis-epilepsy',
    name: 'Epilepsi & Riwayat Kejang',
    category: 'Neurologi & Psikiatri',
    icon: '⚡',
    description: 'Gangguan aktivitas listrik otak dengan kecenderungan kejang berulang.',
    contraindicatedDrugClasses: ['Tramadol', 'Bupropion', 'Clozapine']
  }
];
