import { Drug } from '../types';

/**
 * Organ Toxicity System Definition
 */
export interface OrganToxicityCategory {
  id: string;
  name: string;
  shortName: string;
  icon: string; // Icon identifier
  color: string; // Tailwind color theme
  description: string;
  severityThresholds: {
    moderateCount: number;
    highCount: number;
    criticalCount: number;
  };
  keyMonitors: string[];
  clinicalManagement: string[];
  redFlags: string[];
}

export interface DrugToxicityProfile {
  drugId: string;
  drugName: string;
  toxicityCategory: string; // e.g., 'qtc_cardiac', 'hepatotoxicity', 'nephrotoxicity', 'cns_sedation', 'anticholinergic', 'gi_bleeding', 'electrolyte', 'ototoxicity', 'dermatology'
  severity: 'Mild' | 'Moderate' | 'High' | 'Critical';
  weightScore: number; // 1 (Mild), 2 (Moderate), 3 (High), 4 (Critical)
  mechanism: string;
  typicalOnset: string;
  riskFactors?: string[];
  preventionTip: string;
}

export interface AdrSymptom {
  id: string;
  symptomName: string;
  indonesianName: string;
  category: 'Kardiovaskular' | 'Saluran Cerna' | 'Sistem Saraf & Psikiatri' | 'Kulit & Alergi' | 'Respirasi' | 'Metabolik & Ginjal' | 'Telinga & Mata' | 'Muskuloskeletal' | 'Hematologi';
  description: string;
  commonCausativeDrugs: {
    drugName: string;
    genericMatch?: string;
    atcPrefix?: string;
    probability: 'Sangat Tinggi (Very High)' | 'Tinggi (High)' | 'Sedang (Moderate)';
    mechanism: string;
    onset: string;
    mitigation: string;
  }[];
  redFlagWarning?: string;
}

export interface NaranjoQuestion {
  id: number;
  question: string;
  indonesianQuestion: string;
  yesScore: number;
  noScore: number;
  unknownScore: number;
  explanation: string;
}

/**
 * 9 Organ Toxicity Categories
 */
export const ORGAN_TOXICITY_CATEGORIES: OrganToxicityCategory[] = [
  {
    id: 'qtc_cardiac',
    name: 'Kardiotoksisitas & Pemanjangan Interval QTc Jantung',
    shortName: 'Kardiotoksisitas (QTc)',
    icon: 'HeartPulse',
    color: 'rose',
    description: 'Blokade kanal ion kalium jantung (IKr/hERG) yang memperpanjang repolarisasi ventrikel miokard, melipatgandakan risiko aritmia ventrikel mematikan Torsades de Pointes (TdP) dan henti jantung mendadak.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['EKG 12 Lead (Interval QTc baseline & follow-up)', 'Elektrolit Serum (Target K+ > 4.0 mEq/L, Mg2+ > 2.0 mg/dL)', 'Denyut Jantung & Tekanan Darah'],
    clinicalManagement: [
      'Hindari peresepan multipel obat pemanjang QTc secara bersamaan.',
      'Koreksi hipokalemia (<4.0 mEq/L) dan hipomagnesemia (<2.0 mg/dL) sebelum memulai terapi.',
      'Waspadai bila QTc > 500 ms atau kenaikan > 60 ms dari baseline (Hentikan obat pemicu).'
    ],
    redFlags: ['Episode pingsan mendadak (Sinkop)', 'Palpitasi hebat / sensasi jantung berdegup kencang tak beraturan', 'Pusing berputar berat / pandangan gelap mendadak']
  },
  {
    id: 'hepatotoxicity',
    name: 'Hepatotoksisitas & Drug-Induced Liver Injury (DILI)',
    shortName: 'Beban Toksisitas Hati (DILI)',
    icon: 'Activity',
    color: 'amber',
    description: 'Beban metabolit reaktif hepatik atau reaksi kolestatik yang memicu nekrosis hepatoseluler akut, steatosis, atau hepatitis kolestatik terinduksi obat.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Liver Function Test (SGOT, SGPT, Bilirubin Total/Direk, Alkaline Phosphatase)', 'Masa Protrombin / INR', 'Kadar Albumin Serum'],
    clinicalManagement: [
      'Gunakan dosis efektif terendah pada pasien dengan riwayat penyakit hati kronis atau sirosis.',
      'Pantau SGOT/SGPT berkala (Hentikan obat bila SGPT > 3-5x batas atas normal disertai gejala klinis).',
      'Hindari konsumsi alkohol rutin selama pengobatan.'
    ],
    redFlags: ['Mata dan kulit menguning (Ikterus / Jaundice)', 'Urin berwarna pekat seperti air teh tua', 'Feses berwarna pucat seperti dempul', 'Mual muntah hebat dan nyeri perut kanan atas']
  },
  {
    id: 'nephrotoxicity',
    name: 'Nefrotoksisitas & Acute Kidney Injury (AKI)',
    shortName: 'Beban Toksisitas Ginjal (AKI)',
    icon: 'ShieldAlert',
    color: 'purple',
    description: 'Cedera tubular akut, vasokonstriksi mikrovaskular ginjal, nefritis interstisial akut, atau kristaluria yang menurunkan laju filtrasi glomerulus (eGFR).',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Serum Kreatinin & BUN serial', 'Laju Filtrasi Glomerulus (eGFR / CrCl Cockcroft-Gault)', 'Produksi Urin 24 Jam (Urine Output)', 'Urinalisis (Sedimen & Proteinuria)'],
    clinicalManagement: [
      'Pertahankan hidrasi cairan hidrasi adekuat (kecuali ada kontraindikasi gagal jantung berat).',
      'Lakukan penyesuaian dosis obat berdasarkan nilai eGFR / CrCl terkini.',
      'Hindari kombinasi berbahaya "Triple Whammy" (ACEi/ARB + Diuretik + NSAID).'
    ],
    redFlags: ['Produksi urine menurun drastis (<0.5 mL/kg/jam atau tidak kencing >12 jam)', 'Pembengkakan hebat pada kedua tungkai/wajah (Edema anasarka)', 'Sesak napas akibat overload cairan paru']
  },
  {
    id: 'cns_sedation',
    name: 'Depresi Sistem Saraf Pusat, Sedasi & Risiko Jatuh (*Fall Risk*)',
    shortName: 'Sedasi & Depresi SSP',
    icon: 'Moon',
    color: 'indigo',
    description: 'Potensiasi stimulasi transmisi GABAergik atau penekanan pusat respirasi di medula oblongata, meningkatkan risiko somnolen mendalam, ataksia, trauma jatuh fraktur tulang pada lansia, dan depresi pernapasan fatal.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Tingkat Kesadaran (Skala GCS / RASS)', 'Frekuensi Pernapasan (RR - waspadai <12x/menit)', 'Saturasi Oksigen SpO2', 'Skor Risiko Jatuh Morse / Hendrich'],
    clinicalManagement: [
      'Terapkan kriteria Beers Criteria untuk membatasi depresan SSP ganda pada pasien geriatri.',
      'Hindari kombinasi analgesik opioid dengan sedatif benzodiazepine (FDA Black Box Warning).',
      'Edukasi pasien untuk tidak mengemudi atau mengoperasikan mesin berat.'
    ],
    redFlags: ['Napas sangat lambat (<10 kali per menit) atau mendengkur tersedak (Apnea tidur berat)', 'Sangat sulit dibangunkan / penurunan kesadaran koma', 'Bibir dan ujung jari membiru (Sianosis / Hipoksia)']
  },
  {
    id: 'anticholinergic',
    name: 'Beban Kognitif Antikolinergik (*Anticholinergic Cognitive Burden*)',
    shortName: 'Beban Antikolinergik (ACB)',
    icon: 'Eye',
    color: 'orange',
    description: 'Blokade kompetitif reseptor muskarinik sentral dan perifer, memicu penurunan memori, konfusi delirium akut, mulut kering, konstipasi obstruktif, retensi urin akut, dan peningkatan tekanan intraokular.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Skor Anticholinergic Cognitive Burden (ACB Score)', 'Status Mental & Kognitif (MMSE / MoCA)', 'Volume Residu Urin Pasca Berkemih (PVR)', 'Tekanan Intraokular (TIO)'],
    clinicalManagement: [
      'Gantikan obat dengan skor ACB tinggi dengan alternatif yang ramah kognitif (misal: ganti CTM dengan Cetirizine/Loratadine).',
      'Hindari pada pasien pria dengan BPH dan riwayat demensia/Alzheimer.'
    ],
    redFlags: ['Delirium akut / disorientasi mendadak / halusinasi', 'Retensi urin total (tidak bisa buang air kecil sama sekali disertai nyeri perut bawah)', 'Nyeri hebat pada mata dengan mata merah dan penglihatan kabur (Glaukoma sudut tertutup akut)']
  },
  {
    id: 'gi_bleeding',
    name: 'Iritasi Mukosa & Risiko Perdarahan Gastrointestinal',
    shortName: 'Perdarahan Saluran Cerna (GI)',
    icon: 'AlertTriangle',
    color: 'red',
    description: 'Supresi sintesis prostaglandin protektif mukosa lambung (inhibisi COX-1) ditambah efek antikoagulasi/antiplatelet sistemik, meningkatkan risiko erosi lambung, ulkus peptikum, hematemesis, dan melena.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Hemoglobin & Hematokrit serial', 'Skrining Fecal Occult Blood Test (FOBT)', 'Tanda-tanda klinis melena / perdarahan saluran cerna'],
    clinicalManagement: [
      'Sertakan Gastroprotektor PPI (misal: Pantoprazole / Omeprazole) pada pasien risiko tinggi.',
      'Minum obat NSAID selalu bersamaan atau sesudah makan.',
      'Gunakan durasi terapi NSAID sesingkat mungkin dengan dosis efektif terendah.'
    ],
    redFlags: ['Buang air besar berwarna hitam pekat seperti aspal dan berbau amis menyengat (Melena)', 'Muntah cairan berwarna cokelat kehitaman seperti bubuk kopi (Hematemesis)', 'Pusing berputar hebat disertai pucat dan tensi drop']
  },
  {
    id: 'electrolyte',
    name: 'Gangguan Homeostasis Elektrolit (K+, Na+, Ca2+, Mg2+)',
    shortName: 'Gangguan Elektrolit',
    icon: 'Zap',
    color: 'emerald',
    description: 'Fluktuasi berbahaya ion tubuh akibat gangguan ekskresi renal atau pergeseran transeluler (Hiperkalemia fatal, Hipokalemia aritmogenik, atau Hiponatremia berat terinduksi SIADH).',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Kadar Kalium Serum (K+)', 'Kadar Natrium Serum (Na+)', 'Kadar Kalsium Ionik & Magnesium', 'EKG serial (Perubahan gelombang T & interval QT)'],
    clinicalManagement: [
      'Hindari kombinasi suplemen kalium dengan obat penahan kalium (Spironolakton, ACEi, ARB).',
      'Pantau ketat elektrolit pada pasien pengguna diuretik loop, tiazid, atau SSRI jangka panjang.'
    ],
    redFlags: ['Kelemahan otot ekstrem / kelumpuhan flaksid mendadak (Hiperkalemia)', 'Kram otot parah / kejang / spasme tangan dan kaki (Hipokalsemia/Hipomagnesemia)', 'Kebingungan mental / disorientasi berat / kejang (Hiponatremia berat <125 mEq/L)']
  },
  {
    id: 'ototoxicity',
    name: 'Ototoksisitas Koklear & Vestibular (Gangguan Pendengaran & Keseimbangan)',
    shortName: 'Ototoksisitas (Telinga)',
    icon: 'VolumeX',
    color: 'cyan',
    description: 'Kerusakan selektif sel rambut sensorik pada koklea dan apparatus vestibular telinga dalam, memicu tinitus menetap, gangguan keseimbangan vertigo parah, dan tuli saraf permanen bilateral.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Audiometri Nada Murni baseline & follow-up', 'Skrining Gejala Subjektif Tinitus / Pendengaran Berkurang', 'Pemeriksaan Keseimbangan Vestibular (Tes Romberg)'],
    clinicalManagement: [
      'Lakukan Therapeutic Drug Monitoring (TDM) kadar palung obat aminoglikosida.',
      'Hindari kombinasi aminoglikosida dengan diuretik loop dosis tinggi (Furosemide).',
      'Hentikan atau ganti obat segera jika timbul tinitus awal.'
    ],
    redFlags: ['Suara berdenging keras di telinga yang tidak kunjung hilang (Tinitus)', 'Penurunan kemampuan mendengar suara percakapan secara progresif', 'Sensasi ruangan berputar hebat hingga tidak mampu berdiri atau berjalan']
  },
  {
    id: 'dermatology',
    name: 'Reaksi Dermatologi Parah & Erupsi Mukokutan (SJS / TEN / DRESS)',
    shortName: 'Reaksi Kulit Berat (SJS/TEN)',
    icon: 'Flame',
    color: 'pink',
    description: 'Reaksi hipersensitivitas imunologis tipe lambat mematikan yang memicu pelepasan lapisan epidermis kulit, nekrosis keratinosit luas, dan sindrom DRESS dengan keterlibatan organ multiorgan.',
    severityThresholds: { moderateCount: 1, highCount: 2, criticalCount: 3 },
    keyMonitors: ['Inspeksi Visual Seluruh Permukaan Kulit & Mukosa (Mulut, Mata, Genital)', 'Hitung Darah Lengkap (Eosinofilia pada DRESS)', 'Fungsi Hati & Ginjal'],
    clinicalManagement: [
      'Skrining alel HLA-B*1502 (sebelum Carbamazepine) dan HLA-B*5801 (sebelum Allopurinol) pada populasi berisiko.',
      'SEGERA HENTIKAN OBAT bila timbul ruam kulit disertai demam atau keterlibatan mukosa bibir/mata.'
    ],
    redFlags: ['Bibir melepuh, mata merah berair perih, dan lesi pada selaput lendir', 'Kulit mengelupas / melepuh seperti luka bakar (Tanda Nikolsky positif)', 'Ruam merah menyebar cepat disertai demam tinggi dan pembengkakan kelenjar getah bening']
  }
];

/**
 * High-Risk Drug Toxicity Profiles Database
 */
export const DRUG_TOXICITY_PROFILES: DrugToxicityProfile[] = [
  // 1. QTc Prolongation
  {
    drugId: 'drug-amiodarone',
    drugName: 'Amiodarone',
    toxicityCategory: 'qtc_cardiac',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Inhibisi poten kanal IKr repolarisasi miokard ventrikel dengan waktu paruh sangat panjang (50-100 hari).',
    typicalOnset: 'Hari hingga minggu (efek bertahan berbulan-bulan pasca-penghentian)',
    riskFactors: ['Hipokalemia', 'Hipomagnesemia', 'Bradikardia', 'Usia lanjut', 'Jenis kelamin wanita'],
    preventionTip: 'Rekam EKG baseline dan berkala; pertahankan K+ > 4.0 mEq/L dan Mg2+ > 2.0 mg/dL.'
  },
  {
    drugId: 'drug-haloperidol',
    drugName: 'Haloperidol',
    toxicityCategory: 'qtc_cardiac',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Blokade kanal kalium hERG; risiko melonjak sangat tajam pada pemberian IV cepat dosis tinggi.',
    typicalOnset: 'Menit (IV) hingga hari (Oral)',
    riskFactors: ['Pemberian rute intravena (IV)', 'Dosis > 5 mg/hari', 'Kombinasi obat pemanjang QTc lain'],
    preventionTip: 'Gunakan rute oral bila memungkinkan; pantau EKG strip kontinu pada pemberian IV di ICU/IGD.'
  },
  {
    drugId: 'drug-azithromycin',
    drugName: 'Azithromycin',
    toxicityCategory: 'qtc_cardiac',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Makrolida yang memperpanjang durasi potensial aksi miokardium ventrikel.',
    typicalOnset: 'Hari ke-1 hingga ke-3 terapi',
    riskFactors: ['Penyakit jantung koroner dasar', 'Riwayat aritmia', 'Usia > 65 tahun'],
    preventionTip: 'Pertimbangkan antibiotik alternatif non-makrolida pada pasien dengan QTc baseline > 450 ms.'
  },
  {
    drugId: 'drug-ondansetron',
    drugName: 'Ondansetron',
    toxicityCategory: 'qtc_cardiac',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Antagonis 5-HT3 dengan efek blokade kanal natrium dan kalium kardiak bergantung dosis.',
    typicalOnset: 'Menit (IV) pasca-injeksi',
    riskFactors: ['Dosis tunggal IV > 16 mg', 'Kombinasi dengan obat anestesi/psikotropika'],
    preventionTip: 'Batasi dosis tunggal IV maksimal 16 mg; suntikkan lambat minimal selama 2-5 menit.'
  },
  {
    drugId: 'drug-ciprofloxacin',
    drugName: 'Ciprofloxacin',
    toxicityCategory: 'qtc_cardiac',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Inhibisi kanal hERG oleh fluorokuinolon.',
    typicalOnset: '24 - 48 jam pasca inisiasi',
    preventionTip: 'Hindari peresepan bersamaan dengan amiodarone, haloperidol, atau azithromycin.'
  },
  {
    drugId: 'drug-levofloxacin',
    drugName: 'Levofloxacin',
    toxicityCategory: 'qtc_cardiac',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Pemanjangan repolarisasi kardiak oleh molekul fluorokuinolon.',
    typicalOnset: 'Hari ke-1 hingga ke-5 terapi',
    preventionTip: 'Pantau EKG pada pasien ICU dengan penyakit kardiovaskular.'
  },

  // 2. Hepatotoxicity (DILI)
  {
    drugId: 'drug-paracetamol',
    drugName: 'Paracetamol',
    toxicityCategory: 'hepatotoxicity',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Konversi CYP2E1 menjadi metabolit reaktif toksik N-acetyl-p-benzoquinone imine (NAPQI) yang menguras glutation hepar dan memicu nekrosis hepatosit.',
    typicalOnset: '24 - 72 jam pasca konsumsi dosis tinggi/overdose',
    riskFactors: ['Dosis > 4000 mg/24 jam', 'Alkoholisme kronis', 'Malnutrisi / Puasa lama'],
    preventionTip: 'Batasi dosis harian maksimal 4000 mg (atau 2000-3000 mg pada pasien gangguan hati/lansia). Sediakan antidotum N-Acetylcysteine.'
  },
  {
    drugId: 'drug-co-amoxiclav',
    drugName: 'Amoxicillin / Clavulanate (Co-Amoxiclav)',
    toxicityCategory: 'hepatotoxicity',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Reaksi hepatotoksisitas kolestatik diperantarai imunologis terutama terpicu oleh komponen asam klavulanat.',
    typicalOnset: '1 hingga 6 minggu (dapat timbul berminggu-minggu setelah antibiotik selesai)',
    riskFactors: ['Usia > 55 tahun', 'Jenis kelamin pria', 'Durasi terapi > 14 hari'],
    preventionTip: 'Batasi durasi terapi maksimal 10-14 hari; periksa LFT jika timbul urin gelap atau kulit kuning pasca-terapi.'
  },
  {
    drugId: 'drug-atorvastatin',
    drugName: 'Atorvastatin',
    toxicityCategory: 'hepatotoxicity',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Peningkatan permeabilitas membran hepatosit dan inflamasi transien terinduksi statin.',
    typicalOnset: '1 hingga 3 bulan pasca inisiasi',
    preventionTip: 'Periksa SGOT/SGPT baseline; evaluasi jika pasien mengeluh urin pekat atau kelelahan ekstrim.'
  },
  {
    drugId: 'drug-ketoconazole',
    drugName: 'Ketoconazole',
    toxicityCategory: 'hepatotoxicity',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Inhibisi enzim biosintesis sterol hepar yang memicu nekrosis hepatoseluler masif (FDA Black Box Warning).',
    typicalOnset: 'Minggu ke-2 hingga ke-8 terapi oral',
    preventionTip: 'Sediaan oral HANYA digunakan bila tidak ada alternatif antijamur lain; periksa LFT setiap minggu.'
  },
  {
    drugId: 'drug-methotrexate',
    drugName: 'Methotrexate',
    toxicityCategory: 'hepatotoxicity',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Akumulasi poliglutamat intraseluler hepar yang memicu fibrosis hati dan sirosis pada penggunaan kronis.',
    typicalOnset: 'Bulan hingga tahun (dosis kumulatif > 1.5 - 3 gram)',
    preventionTip: 'Suplementasi Asam Folat 1 mg/hari (kecuali di hari minum MTX) dan periksa LFT berkala tiap 4-8 minggu.'
  },

  // 3. Nephrotoxicity (AKI)
  {
    drugId: 'drug-gentamicin',
    drugName: 'Gentamicin',
    toxicityCategory: 'nephrotoxicity',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Endositosis pinositotik ke dalam sel epitel tubulus proksimal ginjal, memicu disfungsi lisosom, nekrosis tubulus akut (ATN), dan penurunan GFR.',
    typicalOnset: 'Hari ke-5 hingga ke-10 terapi',
    riskFactors: ['Kadar trough > 1 mcg/mL', 'Durasi terapi > 7 hari', 'Kombinasi dengan Furosemide / Vancomycin'],
    preventionTip: 'Terapkan Extended-Interval Dosing sekali sehari; Therapeutic Drug Monitoring (TDM) kadar palung < 1 mcg/mL.'
  },
  {
    drugId: 'drug-amikacin',
    drugName: 'Amikacin',
    toxicityCategory: 'nephrotoxicity',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Akumulasi selektif di tubulus ginjal memicu nekrosis tubulus akut non-oligourik.',
    typicalOnset: 'Hari ke-7 hingga ke-14 terapi',
    preventionTip: 'Pertahankan kadar palung (trough) < 2.5 - 5 mcg/mL; periksa Serum Kreatinin tiap 2-3 hari.'
  },
  {
    drugId: 'drug-vancomycin',
    drugName: 'Vancomycin',
    toxicityCategory: 'nephrotoxicity',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Stres oksidatif dan nekrosis sel tubulus ginjal, terutama bila kadar palung darah > 15-20 mcg/mL.',
    typicalOnset: 'Hari ke-4 hingga ke-8 terapi',
    preventionTip: 'Targetkan AUC/MIC 400-600; hindari kombinasi simultan dengan Piperacillin/Tazobactam bila memungkinkan.'
  },
  {
    drugId: 'drug-piperacillin-tazobactam',
    drugName: 'Piperacillin / Tazobactam',
    toxicityCategory: 'nephrotoxicity',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Nefritis interstisial akut dan sinergisme toksisitas mikrovaskular ginjal saat dikombinasi Vancomycin.',
    typicalOnset: 'Hari ke-3 hingga ke-7',
    preventionTip: 'Pantau fungsi ginjal harian bila dikombinasikan dengan Vancomycin di ICU.'
  },
  {
    drugId: 'drug-ibuprofen',
    drugName: 'Ibuprofen',
    toxicityCategory: 'nephrotoxicity',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Inhibisi sintesis PGE2 dan PGI2 ginjal yang menyebabkan vasokonstriksi arteriol aferen glomerulus dan penurunan laju filtrasi ginjal akut.',
    typicalOnset: 'Hari ke-1 hingga ke-5 terapi',
    riskFactors: ['CKD', 'Gagal Jantung', 'Dehidrasi', 'Penggunaan ACEi/ARB'],
    preventionTip: 'Hindari NSAID pada pasien dengan eGFR < 30 mL/min atau pasien pengguna ACEi + Diuretik.'
  },

  // 4. CNS Sedation & Fall Risk
  {
    drugId: 'drug-alprazolam',
    drugName: 'Alprazolam',
    toxicityCategory: 'cns_sedation',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Modulasi alosterik positif subunit alfa reseptor GABAA, melipatgandakan influks ion klorida hiperpolarisasi neuron SSP.',
    typicalOnset: '30 - 60 menit pasca konsumsi',
    preventionTip: 'Gunakan dosis efektif terendah sesingkat mungkin; jangan dikombinasikan dengan opioid atau alkohol.'
  },
  {
    drugId: 'drug-diazepam',
    drugName: 'Diazepam',
    toxicityCategory: 'cns_sedation',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Agonis GABAA berdurasi panjang dengan metabolit aktif (desmethyldiazepam) yang terakumulasi berhari-hari.',
    typicalOnset: '15 - 30 menit',
    preventionTip: 'Hindari pada lansia karena risiko tinggi sedasi berkepanjangan dan patah tulang panggul akibat jatuh.'
  },
  {
    drugId: 'drug-tramadol',
    drugName: 'Tramadol',
    toxicityCategory: 'cns_sedation',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Agonis reseptor mu-opioid dan penghambat reuptake serotonin/norepinefrin sentral.',
    typicalOnset: '1 - 2 jam',
    preventionTip: 'Waspadai penurunan kesadaran dan depresi pernapasan; siapkan antidot Naloxone bila terjadi intoksikasi.'
  },
  {
    drugId: 'drug-chlorpheniramine',
    drugName: 'Chlorpheniramine (CTM)',
    toxicityCategory: 'cns_sedation',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Menembus sawar darah otak secara bebas dan memblokir reseptor H1 histaminergik sentral pengatur kewaspadaan.',
    typicalOnset: '30 - 60 menit',
    preventionTip: 'Gantikan dengan antihistamin generasi ke-2 (Cetirizine / Loratadine / Fexofenadine) untuk penggunaan siang hari.'
  },

  // 5. Anticholinergic Burden (ACB)
  {
    drugId: 'drug-amitriptyline',
    drugName: 'Amitriptyline',
    toxicityCategory: 'anticholinergic',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Antagonis poten reseptor muskarinik M1-M5 sentral dan perifer (Skor ACB = 3).',
    typicalOnset: 'Jam hingga hari',
    riskFactors: ['Usia > 65 tahun', 'Polifarmasi', 'BPH', 'Glaukoma sudut sempit'],
    preventionTip: 'Hindari pada pasien lansia dengan gangguan kognitif; ganti dengan SSRI (Sertraline/Escitalopram).'
  },
  {
    drugId: 'drug-trihexyphenidyl',
    drugName: 'Trihexyphenidyl (THP)',
    toxicityCategory: 'anticholinergic',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Antikolinergik sentral murni dengan skor ACB = 3.',
    typicalOnset: '1 - 2 jam',
    preventionTip: 'Titrasi dosis bertahap; pantau status kognitif dan retensi urin secara ketat.'
  },
  {
    drugId: 'drug-diphenhydramine',
    drugName: 'Diphenhydramine',
    toxicityCategory: 'anticholinergic',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Blokade muskarinik kuat (Skor ACB = 3) memicu mulut kering, konstipasi, dan rasa bingung.',
    typicalOnset: '1 jam',
    preventionTip: 'Jangan digunakan sebagai obat tidur jangka panjang pada pasien usia lanjut.'
  },

  // 6. GI Bleeding
  {
    drugId: 'drug-aspirin',
    drugName: 'Aspirin',
    toxicityCategory: 'gi_bleeding',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Asetilasi ireversibel enzim COX-1 trombosit dan mukosa lambung, melumpuhkan proteksi mukosa dan hemostasis primer.',
    typicalOnset: 'Hari hingga minggu terapi rutin',
    preventionTip: 'Gunakan sediaan salut enterik (Enteric-coated) dan kombinasikan dengan PPI pada pasien berisiko tinggi perdarahan.'
  },
  {
    drugId: 'drug-meloxicam',
    drugName: 'Meloxicam',
    toxicityCategory: 'gi_bleeding',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Inhibisi sintesis prostaglandin mukosa gastrointestinal.',
    typicalOnset: 'Hari ke-3 hingga ke-7',
    preventionTip: 'Minum segera setelah makan; jangan gabungkan dengan NSAID lain atau steroid.'
  },
  {
    drugId: 'drug-dexamethasone',
    drugName: 'Dexamethasone',
    toxicityCategory: 'gi_bleeding',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Kortikosteroid menekan regenerasi epitel mukosa lambung dan sintesis mukus protektif.',
    typicalOnset: 'Minggu ke-1 hingga ke-2',
    preventionTip: 'Berikan bersama PPI jika digunakan bersamaan dengan NSAID atau antiplatelet.'
  },

  // 7. Electrolyte Imbalance
  {
    drugId: 'drug-spironolactone',
    drugName: 'Spironolactone',
    toxicityCategory: 'electrolyte',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Antagonis reseptor aldosteron di tubulus distal ginjal yang menghentikan sekresi ion K+ ke dalam urin, memicu hiperkalemia berat.',
    typicalOnset: 'Hari ke-3 hingga ke-7',
    preventionTip: 'KONTRAINDIKASI dikombinasikan dengan suplemen kalium; periksa kalium darah berkala.'
  },
  {
    drugId: 'drug-potassium-chloride',
    drugName: 'Potassium Chloride',
    toxicityCategory: 'electrolyte',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Penambahan beban kalium eksogen pekat yang dapat memicu lonjakan kalium darah fatal bila ekskresi renal terganggu.',
    typicalOnset: 'Menit (IV) hingga jam (Oral)',
    preventionTip: 'DILARANG bolus IV pekat langsung; encerkan sempurna dan pantau EKG serta kadar kalium.'
  },
  {
    drugId: 'drug-furosemide',
    drugName: 'Furosemide',
    toxicityCategory: 'electrolyte',
    severity: 'High',
    weightScore: 3,
    mechanism: 'Inhibisi kotransporter Na+/K+/2Cl- di ansa Henle tebal yang memicu ekskresi masif kalium, natrium, magnesium, dan kalsium ke urin.',
    typicalOnset: 'Jam pertama pasca dosis',
    preventionTip: 'Pantau elektrolit berkala; berikan suplemen kalium atau kombinasikan dengan spironolactone pada terapi jangka panjang.'
  },

  // 8. Ototoxicity
  {
    drugId: 'drug-gentamicin',
    drugName: 'Gentamicin',
    toxicityCategory: 'ototoxicity',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Akumulasi di endolimfe dan perilimfe telinga dalam merusak sel rambut koklea dan organ vestibular secara ireversibel.',
    typicalOnset: 'Hari ke-7 hingga minggu ke-2',
    preventionTip: 'Hentikan segera jika pasien mengeluh tinitus berdenging atau pusing melayang.'
  },
  {
    drugId: 'drug-amikacin',
    drugName: 'Amikacin',
    toxicityCategory: 'ototoxicity',
    severity: 'Critical',
    weightScore: 4,
    mechanism: 'Kerusakan saraf akustik permanen terutama pada frekuensi suara tinggi.',
    typicalOnset: 'Minggu ke-1 hingga ke-3 terapi intensif',
    preventionTip: 'Lakukan tes audiometri serial pada terapi jangka panjang.'
  },
  {
    drugId: 'drug-furosemide',
    drugName: 'Furosemide',
    toxicityCategory: 'ototoxicity',
    severity: 'Moderate',
    weightScore: 2,
    mechanism: 'Perubahan komposisi elektrolit endolimfe pada stria vaskularis koklea pada injeksi IV bolus cepat dosis tinggi (>240 mg/jam).',
    typicalOnset: 'Menit pasca injeksi IV cepat',
    preventionTip: 'Berikan infus IV lambat dengan kecepatan maksimal 4 mg/menit pada dosis tinggi.'
  }
];

/**
 * 35+ Common ADR Patient Complaints & Reverse Causative Mapping Database
 */
export const ADR_SYMPTOM_DATABASE: AdrSymptom[] = [
  {
    id: 'symptom-dry-cough',
    symptomName: 'Dry Cough (Batuk Kering Menggelitik)',
    indonesianName: 'Batuk Kering Kronis Tanpa Dahak',
    category: 'Respirasi',
    description: 'Batuk kering menggelitik di tenggorokan yang timbul terus menerus, tidak membaik dengan obat batuk standar, dan sering memburuk saat berbaring.',
    commonCausativeDrugs: [
      {
        drugName: 'Captopril / Ramipril / Lisinopril / Enalapril (Golongan ACE Inhibitor)',
        genericMatch: 'captopril, ramipril, lisinopril, enalapril',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Inhibisi enzim ACE mencegah degradasi bradikinin dan substansi P di saluran napas atas, memicu akumulasi lokal dan refleks batuk kering persisten (terjadi pada 5-20% pasien).',
        onset: '1 minggu hingga 6 bulan pasca inisiasi',
        mitigation: 'Gantikan obat dengan golongan Angiotensin Receptor Blocker (ARB) seperti Candesartan, Valsartan, atau Telmisartan (tidak mempengaruhi bradikinin).'
      },
      {
        drugName: 'Amlodipine (CCB)',
        genericMatch: 'amlodipine',
        probability: 'Sedang (Moderate)',
        mechanism: 'Relaksasi sfingter esofagus bawah yang memicu refluks asam lambung mikro ke laring (LPR / GERD).',
        onset: 'Minggu ke-2 hingga ke-4',
        mitigation: 'Evaluasi gejala refluks lambung; tambahkan PPI bila perlu.'
      }
    ],
    redFlagWarning: 'Waspadai bila batuk disertai sesak napas berat, bibir membengkak (Angioedema), atau batuk berdarah.'
  },
  {
    id: 'symptom-ankle-edema',
    symptomName: 'Peripheral Edema (Bengkak Kaki / Pergelangan Kaki)',
    indonesianName: 'Kaki / Pergelangan Kaki Bengkak (Edema Perifer)',
    category: 'Kardiovaskular',
    description: 'Pembengkakan pada kedua pergelangan kaki atau punggung kaki tanpa disertai tanda gagal jantung akut.',
    commonCausativeDrugs: [
      {
        drugName: 'Amlodipine / Nifedipine (CCB Dihidropiridin)',
        genericMatch: 'amlodipine, nifedipine',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Vasodilatasi arteriol prekapiler yang lebih kuat dibanding venula pascakapiler, meningkatkan tekanan hidrostatik kapiler dan memicu ekstravasasi cairan ke interstisial.',
        onset: '2 hingga 6 minggu pasca inisiasi dosis 5-10 mg',
        mitigation: 'Turunkan dosis Amlodipine ke 2.5-5 mg, atau kombinasikan dengan ACEi/ARB (yang merelaksasi venula eferen), atau ganti ke antihipertensi lain.'
      },
      {
        drugName: 'Meloxicam / Ibuprofen / Ketorolac (NSAID)',
        genericMatch: 'meloxicam, ibuprofen, ketorolac, diclofenac, piroxicam',
        probability: 'Tinggi (High)',
        mechanism: 'Retensi natrium dan air di tubulus ginjal akibat penurunan sintesis prostaglandin renal.',
        onset: 'Hari ke-3 hingga minggu ke-2',
        mitigation: 'Hentikan NSAID; ganti ke Parasetamol untuk pereda nyeri.'
      },
      {
        drugName: 'Dexamethasone / Methylprednisolone (Kortikosteroid)',
        genericMatch: 'dexamethasone, methylprednisolone, prednisone, hydrocortisone',
        probability: 'Tinggi (High)',
        mechanism: 'Aktivitas mineralokortikoid menahan garam natrium dan cairan di intravaskular.',
        onset: '1 hingga 2 minggu',
        mitigation: 'Batasi asupan garam meja dan turunkan dosis steroid bertahap.'
      }
    ],
    redFlagWarning: 'Bila bengkak hanya pada 1 kaki disertai betis merah nyeri hangat (curiga DVT) atau disertai sesak napas berat berbaring (curiga gagal jantung akut).'
  },
  {
    id: 'symptom-dry-mouth',
    symptomName: 'Xerostomia (Mulut Kering & Haus Ekstrem)',
    indonesianName: 'Mulut dan Tenggorokan Kering Parah',
    category: 'Saluran Cerna',
    description: 'Penurunan sekresi saliva kelenjar ludah yang menyebabkan mulut terasa sangat kering, lengket, dan sulit menelan makanan kering.',
    commonCausativeDrugs: [
      {
        drugName: 'Amitriptyline / Trihexyphenidyl / CTM / Diphenhydramine',
        genericMatch: 'amitriptyline, trihexyphenidyl, chlorpheniramine, diphenhydramine, clozapine',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Blokade reseptor muskarinik M3 pada kelenjar ludah parotis dan submandibularis.',
        onset: '1 hingga 3 jam pasca konsumsi',
        mitigation: 'Minum air putih sedikit-sedikit secara sering, kunyah permen karet bebas gula, atau gunakan obat kumur pelembab mulut.'
      },
      {
        drugName: 'Ipratropium Bromide (Inhalasi/Nebulisasi)',
        genericMatch: 'ipratropium',
        probability: 'Tinggi (High)',
        mechanism: 'Efek antikolinergik lokal pada mukosa orofaring pasca inhalasi aerosol.',
        onset: 'Segera setelah inhalasi',
        mitigation: 'Kumur mulut dengan air bersih dan buang setelah selesai menggunakan nebulizer/inhaler.'
      }
    ]
  },
  {
    id: 'symptom-gingival-bleeding',
    symptomName: 'Gingival Bleeding & Easy Bruising (Gusi Berdarah & Mudah Memar)',
    indonesianName: 'Gusi Berdarah, Mimisan & Kulit Mudah Memar Lebam',
    category: 'Hematologi',
    description: 'Bercak memar kebiruan spontan di kulit tanpa benturan, gusi berdarah saat sikat gigi, atau darah sukar membeku saat luka kecil.',
    commonCausativeDrugs: [
      {
        drugName: 'Warfarin / Simarc',
        genericMatch: 'warfarin',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Supresi pembentukan faktor pembekuan darah vitamin K-dependent (INR memanjang > 3.0-4.0).',
        onset: 'Hari ke-2 hingga ke-5 terapi',
        mitigation: 'Segera periksa nilai INR darah laboratorium; sesuaikan dosis warfarin; siapkan Vitamin K1 oral/IV jika INR terlalu tinggi.'
      },
      {
        drugName: 'Aspirin / Clopidogrel / Ticagrelor (Antiplatelet)',
        genericMatch: 'aspirin, clopidogrel, ticagrelor',
        probability: 'Tinggi (High)',
        mechanism: 'Inhibisi agregasi platelet darah yang memperpanjang waktu perdarahan primer.',
        onset: 'Hari ke-1 terapi',
        mitigation: 'Gunakan sikat gigi berbulu halus; hindari olahraga kontak fisik benturan keras.'
      },
      {
        drugName: 'Apixaban / Rivaroxaban / Dabigatran (DOAC)',
        genericMatch: 'apixaban, rivaroxaban, dabigatran',
        probability: 'Tinggi (High)',
        mechanism: 'Inhibisi langsung Faktor Xa atau Trombin.',
        onset: '2 hingga 4 jam pasca dosis',
        mitigation: 'Pantau tanda perdarahan occult; sesuaikan dosis pada gangguan ginjal.'
      }
    ],
    redFlagWarning: 'Waspadai bila disertai buang air besar hitam (melena), muntah darah, urin merah, atau sakit kepala hebat mendadak (perdarahan intrakranial).'
  },
  {
    id: 'symptom-muscle-pain',
    symptomName: 'Myalgia & Muscle Weakness (Nyeri Otot & Pegal Berat)',
    indonesianName: 'Nyeri Otot, Pegal-Pegal Linu & Lemas Otot',
    category: 'Muskuloskeletal',
    description: 'Nyeri otot simetris pada paha, betis, atau bahu disertai rasa lemas dan pegal hebat tanpa riwayat olahraga berlebih.',
    commonCausativeDrugs: [
      {
        drugName: 'Simvastatin / Atorvastatin / Rosuvastatin (Statin)',
        genericMatch: 'simvastatin, atorvastatin, rosuvastatin',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Penurunan sintesis koenzim Q10 (CoQ10) dan kolesterol membran sel miosit otot skelet, memicu miopati atau rabdomiolisis.',
        onset: '2 minggu hingga 3 bulan pasca inisiasi/kenaikan dosis',
        mitigation: 'Periksa kadar enzim Creatine Kinase (CK) serum; bila CK > 5-10x normal atau nyeri hebat, hentikan statin; ganti ke statin hidrofilik (Rosuvastatin/Pravastatin dosis rendah) atau Ezetimibe.'
      },
      {
        drugName: 'Furosemide / Hydrochlorothiazide (Diuretik)',
        genericMatch: 'furosemide, hydrochlorothiazide, indapamide',
        probability: 'Tinggi (High)',
        mechanism: 'Hipokalemia (<3.5 mEq/L) dan hipomagnesemia memicu kram dan spasme otot skelet.',
        onset: 'Hari ke-2 hingga minggu ke-1',
        mitigation: 'Koreksi kadar kalium dan magnesium serum; berikan suplemen KSR.'
      }
    ],
    redFlagWarning: 'Jika nyeri otot sangat parah disertai urin berubah warna menjadi gelap kecokelatan seperti teh (Rabdomiolisis & Mioglobinuria AKI).'
  },
  {
    id: 'symptom-tinnitus',
    symptomName: 'Tinnitus (Telinga Berdenging)',
    indonesianName: 'Telinga Berdenging / Suara Nging di Telinga',
    category: 'Telinga & Mata',
    description: 'Sensasi suara berdenging, mendesis, atau berdengung terus menerus di salah satu atau kedua telinga.',
    commonCausativeDrugs: [
      {
        drugName: 'Gentamicin / Amikacin (Aminoglikosida)',
        genericMatch: 'gentamicin, amikacin',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Kerusakan sel rambut luar sensorik organ Corti koklea telinga dalam.',
        onset: 'Hari ke-5 hingga ke-10',
        mitigation: 'Tanda bahaya awal ototoksisitas permanen! Segera hentikan atau ganti antibiotik non-aminoglikosida.'
      },
      {
        drugName: 'Aspirin (Dosis Tinggi Antiinflamasi >3 g/hari)',
        genericMatch: 'aspirin',
        probability: 'Tinggi (High)',
        mechanism: 'Peningkatan konsentrasi salisilat plasma menekan konduktansi membran sel saraf koklea.',
        onset: 'Beberapa jam pasca dosis tinggi',
        mitigation: 'Turunkan dosis aspirin; tinitus salisilat umumnya reversibel.'
      },
      {
        drugName: 'Furosemide (Injeksi IV Cepat Dosis Tinggi)',
        genericMatch: 'furosemide',
        probability: 'Sedang (Moderate)',
        mechanism: 'Gangguan potensial endokoklear stria vaskularis.',
        onset: 'Segera pasca injeksi IV bolus cepat',
        mitigation: 'Infuskan Furosemide secara lambat (kecepatan maksimal 4 mg/menit).'
      }
    ]
  },
  {
    id: 'symptom-hyperkalemia-fatigue',
    symptomName: 'Severe Fatigue & Palpitations (Lemas Ekstrem & Jantung Berdebar)',
    indonesianName: 'Lemas Ekstrem, Otot Lunglai & Jantung Berdebar Lambat',
    category: 'Metabolik & Ginjal',
    description: 'Rasa lemas luar biasa pada kedua tungkai, kesemutan di sekitar bibir/tangan, dan denyut nadi teraba sangat lambat atau ireguler.',
    commonCausativeDrugs: [
      {
        drugName: 'Spironolactone + ACEi / ARB / Suplemen Kalium',
        genericMatch: 'spironolactone, captopril, ramipril, candesartan, valsartan, potassium',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Hiperkalemia berat (K+ > 5.5 - 7.0 mEq/L) yang mendepolarisasi membran istirahat sel miokard dan otot.',
        onset: 'Hari ke-3 hingga minggu ke-2',
        mitigation: 'Periksa kalium darah & EKG darurat; hentikan obat penahan kalium; terapi dengan Kalsium Glukonat IV + Insulin Regular/D50W jika darurat.'
      }
    ],
    redFlagWarning: 'Kondisi gawat darurat! Segera lakukan EKG untuk mendeteksi gelombang T lancip, pemanjangan PR, atau henti jantung asistol.'
  },
  {
    id: 'symptom-constipation',
    symptomName: 'Severe Constipation (Sembelit / Sulit BAB Parah)',
    indonesianName: 'Konstipasi / Sembelit Parah & Perut Begah',
    category: 'Saluran Cerna',
    description: 'Frekuensi buang air besar menurun drastis, tinja sangat keras dan sulit dikeluarkan, disertai kembung dan nyeri perut.',
    commonCausativeDrugs: [
      {
        drugName: 'Morphine / Tramadol / Codeine / Fentanyl (Opioid)',
        genericMatch: 'morphine, tramadol, codeine, fentanyl, oxycodone',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Aktivasi reseptor mu-opioid pada pleksus mienterik usus menghambat gerakan peristaltik dan meningkatkan reabsorpsi air feses.',
        onset: 'Hari ke-1 terapi',
        mitigation: 'Rutin berikan laksatif stimulan (Bisacodyl / Senna) + pelunak feses (Lactulose) bersamaan dengan inisiasi opioid.'
      },
      {
        drugName: 'Verapamil / Diltiazem (CCB Non-Dihidropiridin)',
        genericMatch: 'verapamil, diltiazem',
        probability: 'Tinggi (High)',
        mechanism: 'Relaksasi otot polos sirkular kolon yang memperlambat waktu transit usus.',
        onset: 'Minggu ke-1',
        mitigation: 'Tingkatkan asupan serat harian dan cairan; pertimbangkan beralih ke Amlodipine.'
      },
      {
        drugName: 'Amitriptyline / Trihexyphenidyl (Antikolinergik)',
        genericMatch: 'amitriptyline, trihexyphenidyl',
        probability: 'Tinggi (High)',
        mechanism: 'Hambatan saraf parasimpatis kolon.',
        onset: 'Hari ke-2',
        mitigation: 'Banyak minum air putih dan gunakan laksatif osmotik.'
      }
    ]
  },
  {
    id: 'symptom-insomnia-tremor',
    symptomName: 'Insomnia, Tremor & Palpitations (Gemetar, Susah Tidur & Berdebar)',
    indonesianName: 'Tangan Gemetar (Tremor), Jantung Berdebar & Susah Tidur',
    category: 'Sistem Saraf & Psikiatri',
    description: 'Tremor halus pada jari tangan, rasa cemas gelisah, jantung berdegup kencang, dan sulit memulai tidur malam.',
    commonCausativeDrugs: [
      {
        drugName: 'Salbutamol / Albuterol (Beta-2 Agonis)',
        genericMatch: 'salbutamol, terbutaline, formoterol',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Stimulasi reseptor beta-2 adrenergik pada otot skelet (tremor) dan stimulasi silang beta-1 kardiak (takikardia).',
        onset: '15 hingga 30 menit pasca konsumsi oral/nebulisasi',
        mitigation: 'Gunakan sediaan inhaler MDI dengan teknik yang benar untuk meminimalkan paparan sistemik dibanding sirup/tablet oral.'
      },
      {
        drugName: 'Pseudoephedrine / Ephedrine (Dekongestan)',
        genericMatch: 'pseudoephedrine, ephedrine',
        probability: 'Tinggi (High)',
        mechanism: 'Pelepasan norepinefrin sentral dan stimulasi simpatis.',
        onset: '1 jam',
        mitigation: 'Hindari minum obat flu dekongestan sebelum tidur malam; ganti dengan semprot hidung saline.'
      },
      {
        drugName: 'Levothyroxine (Dosis Berlebih)',
        genericMatch: 'levothyroxine',
        probability: 'Tinggi (High)',
        mechanism: 'Tirotoksikosis iatrogenik terinduksi hormon tiroid eksogen berlebih.',
        onset: '1 hingga 2 minggu',
        mitigation: 'Periksa TSH dan FT4 serum; turunkan dosis levothyroxine.'
      }
    ]
  },
  {
    id: 'symptom-rash-itching',
    symptomName: 'Pruritic Maculopapular Rash (Ruam Merah Gatal & Biduran)',
    indonesianName: 'Ruam Merah Gatal, Biduran (Urtikaria) & Bercak Kulit',
    category: 'Kulit & Alergi',
    description: 'Bercak kemerahan yang gatal menyebar di lengan, dada, atau seluruh tubuh sesaat setelah memulai obat baru.',
    commonCausativeDrugs: [
      {
        drugName: 'Amoxicillin / Ampicillin / Ceftriaxone (Antibiotik Beta-Laktam)',
        genericMatch: 'amoxicillin, ampicillin, ceftriaxone, cefixime',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Reaksi hipersensitivitas imunologis tipe I (IgE-mediated) atau tipe IV terhadap cincin beta-laktam.',
        onset: 'Menit hingga hari ke-7',
        mitigation: 'Hentikan antibiotik segera; berikan antihistamin/kortikosteroid; catat riwayat alergi pada rekam medis.'
      },
      {
        drugName: 'Allopurinol',
        genericMatch: 'allopurinol',
        probability: 'Tinggi (High)',
        mechanism: 'Hipersensitivitas terhadap oxypurinol; waspadai Sindrom Hipersensitivitas Allopurinol (AHS/DRESS).',
        onset: 'Minggu ke-2 hingga ke-6',
        mitigation: 'SEGERA HENTIKAN ALLOPURINOL jika muncul ruam sekecil apapun untuk mencegah progresi ke SJS/TEN.'
      },
      {
        drugName: 'Cotrimoxazole (Sulfamethoxazole + Trimethoprim)',
        genericMatch: 'cotrimoxazole, sulfamethoxazole',
        probability: 'Sangat Tinggi (Very High)',
        mechanism: 'Reaksi alergi terhadap gugus sulfonamida.',
        onset: 'Hari ke-3 hingga ke-10',
        mitigation: 'Hentikan cotrimoxazole dan hindari seluruh obat derivat sulfa.'
      }
    ],
    redFlagWarning: 'Bila ruam disertai demam, bibir melepuh, mata merah perih, atau kulit mengelupas (Segera bawa ke IGD - Dugaan SJS/TEN).'
  }
];

/**
 * 10 Official Naranjo Adverse Drug Reaction (ADR) Probability Scale Questions
 */
export const NARANJO_QUESTIONS: NaranjoQuestion[] = [
  {
    id: 1,
    question: 'Are there previous conclusive reports on this reaction?',
    indonesianQuestion: 'Apakah sudah ada laporan atau publikasi sebelumnya yang membuktikan reaksi efek samping ini?',
    yesScore: 1,
    noScore: 0,
    unknownScore: 0,
    explanation: 'Reaksi efek samping sudah tercantum resmi pada monografi obat (Medscape, FDA, BPOM).'
  },
  {
    id: 2,
    question: 'Did the adverse event appear after the suspected drug was administered?',
    indonesianQuestion: 'Apakah efek samping tersebut timbul setelah obat yang dicurigai mulai dikonsumsi?',
    yesScore: 2,
    noScore: -1,
    unknownScore: 0,
    explanation: 'Hubungan temporal: gejala timbul setelah obat masuk ke dalam tubuh pasien.'
  },
  {
    id: 3,
    question: 'Did the adverse reaction improve when the drug was discontinued or a specific antagonist was administered?',
    indonesianQuestion: 'Apakah efek samping membaik / hilang setelah obat dihentikan (Dechallenge) atau saat diberikan antidot spesifik?',
    yesScore: 1,
    noScore: 0,
    unknownScore: 0,
    explanation: 'Dechallenge positif: penghentian obat meredakan keluhan pasien secara nyata.'
  },
  {
    id: 4,
    question: 'Did the adverse reaction reappear when the drug was readministered?',
    indonesianQuestion: 'Apakah efek samping muncul kembali saat obat diberikan ulang (Rechallenge)?',
    yesScore: 2,
    noScore: -1,
    unknownScore: 0,
    explanation: 'Rechallenge positif: bukti terkuat bahwa obat tersebut adalah agen kausatif langsung.'
  },
  {
    id: 5,
    question: 'Are there alternative causes that on their own could have caused the reaction?',
    indonesianQuestion: 'Apakah ada penyebab alternatif lain (misal: penyakit dasar pasien) yang dapat memicu gejala ini?',
    yesScore: -1,
    noScore: 2,
    unknownScore: 0,
    explanation: 'Jika tidak ada komorbiditas atau infeksi lain yang menjelaskan gejala, skor kausalitas obat meningkat.'
  },
  {
    id: 6,
    question: 'Did the reaction appear when a placebo was given?',
    indonesianQuestion: 'Apakah reaksi tersebut muncul saat pasien diberikan plasebo?',
    yesScore: -1,
    noScore: 1,
    unknownScore: 0,
    explanation: 'Reaksi tidak muncul dengan plasebo menunjukkan efek farmakologis spesifik zat aktif.'
  },
  {
    id: 7,
    question: 'Was the drug detected in the blood (or other fluids) in concentrations known to be toxic?',
    indonesianQuestion: 'Apakah kadar obat dalam darah terukur pada konsentrasi toksik / melebihi batas terapeutik?',
    yesScore: 1,
    noScore: 0,
    unknownScore: 0,
    explanation: 'Therapeutic Drug Monitoring (TDM) mengonfirmasi kadar toksik (misal: Digoxin, Gentamicin, Theophylline, Phenytoin).'
  },
  {
    id: 8,
    question: 'Was the reaction more severe when the dose was increased, or less severe when the dose was decreased?',
    indonesianQuestion: 'Apakah reaksi bertambah parah saat dosis dinaikkan, atau berkurang saat dosis diturunkan?',
    yesScore: 1,
    noScore: 0,
    unknownScore: 0,
    explanation: 'Hubungan dosis-respons (Dose-dependent adverse effect).'
  },
  {
    id: 9,
    question: 'Did the patient have a similar reaction to the same or similar drugs in any previous exposure?',
    indonesianQuestion: 'Apakah pasien pernah mengalami reaksi serupa terhadap obat yang sama atau segolongan di masa lalu?',
    yesScore: 1,
    noScore: 0,
    unknownScore: 0,
    explanation: 'Riwayat alergi atau intoleransi sebelumnya memperkuat diagnosis.'
  },
  {
    id: 10,
    question: 'Was the adverse event confirmed by any objective evidence?',
    indonesianQuestion: 'Apakah kejadian efek samping dikonfirmasi oleh bukti objektif laboratorium / penunjang medis (EKG, LFT, Kreatinin, Rontgen)?',
    yesScore: 1,
    noScore: 0,
    unknownScore: 0,
    explanation: 'Bukti objektif laboratorium atau diagnostik memperkuat kepastian KTD dibanding keluhan subjektif semata.'
  }
];

export function interpretNaranjoScore(score: number): {
  category: 'Pasti (Definite)' | 'Besar Kemungkinan (Probable)' | 'Mungkin (Possible)' | 'Ragu-ragu (Doubtful)';
  color: string;
  badgeBg: string;
  description: string;
  recommendation: string;
} {
  if (score >= 9) {
    return {
      category: 'Pasti (Definite)',
      color: 'text-red-700 dark:text-red-300',
      badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-200 border-red-300 dark:border-red-800',
      description: 'Hubungan kausalitas KTD dengan obat telah terbukti pasti secara temporal, dechallenge/rechallenge positif, dan terkonfirmasi bukti objektif.',
      recommendation: 'Hentikan obat secara permanen. Laporkan ke Pusat MESO / Farmakovigilans BPOM RI dan catat alergi/KTD permanen pada rekam medis pasien.'
    };
  } else if (score >= 5) {
    return {
      category: 'Besar Kemungkinan (Probable)',
      color: 'text-amber-700 dark:text-amber-300',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-800',
      description: 'Reaksi efek samping sangat mungkin disebabkan oleh obat ini berdasarkan hubungan waktu dan perbaikan setelah obat dihentikan.',
      recommendation: 'Disarankan menghentikan atau mengganti obat dengan golongan alternatif. Evaluasi resolusi gejala dan laporkan formulir MESO.'
    };
  } else if (score >= 1) {
    return {
      category: 'Mungkin (Possible)',
      color: 'text-blue-700 dark:text-blue-300',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-200 border-blue-300 dark:border-blue-800',
      description: 'Obat ini mungkin berkontribusi terhadap keluhan pasien, namun penyakit dasar atau faktor lain juga dapat menjadi penyebab alternatif.',
      recommendation: 'Lakukan pemantauan klinis ketat dan uji laboratorium penunjang. Pertimbangkan penurunan dosis sebelum penghentian total.'
    };
  } else {
    return {
      category: 'Ragu-ragu (Doubtful)',
      color: 'text-slate-700 dark:text-slate-300',
      badgeBg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
      description: 'Kecil kemungkinan reaksi disebabkan oleh obat ini. Penyebab utama kemungkinan besar berasal dari perjalanan penyakit pasien atau faktor lingkungan.',
      recommendation: 'Evaluasi kembali diagnosis diferensial penyakit pasien. Terapi obat dapat dilanjutkan dengan pengawasan wajar.'
    };
  }
}

/**
 * 2. WHO-UMC Causality Assessment System (Standar Resmi BPOM RI)
 */
export interface WhoUmcCategory {
  id: 'certain' | 'probable' | 'possible' | 'unlikely' | 'conditional' | 'unassessable';
  name: string;
  indonesianName: string;
  badgeBg: string;
  color: string;
  criteria: string[];
  explanation: string;
  officialBpomaAction: string;
}

export const WHO_UMC_CATEGORIES: WhoUmcCategory[] = [
  {
    id: 'certain',
    name: 'Certain (Pasti)',
    indonesianName: 'Pasti (Certain)',
    badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border-red-300 dark:border-red-800',
    color: 'text-red-600 dark:text-red-400',
    criteria: [
      'Hubungan waktu yang sangat masuk akal antara pemberian obat dan timbulnya gejala.',
      'Peristiwa klinis tidak dapat dijelaskan oleh penyakit yang mendasari atau obat lain.',
      'Respons terhadap penghentian obat secara klinis meyakinkan (Dechallenge positif).',
      'Gejala muncul kembali saat obat diberikan ulang (Rechallenge positif yang definitif).',
      'Mekanisme farmakologis atau imunologis telah terbukti dan terkonfirmasi bukti objektif/lab.'
    ],
    explanation: 'Hubungan kausalitas tidak terbantahkan. Reaksi KTD secara definitif dipicu oleh obat yang bersangkutan.',
    officialBpomaAction: 'Hentikan obat permanen, catat kontraindikasi mutlak di rekam medis pasien, dan kirim Laporan CITO Formulir Kuning ke Pusat Farmakovigilans BPOM RI.'
  },
  {
    id: 'probable',
    name: 'Probable / Likely (Besar Kemungkinan)',
    indonesianName: 'Besar Kemungkinan (Probable / Likely)',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800',
    color: 'text-amber-600 dark:text-amber-400',
    criteria: [
      'Hubungan waktu yang masuk akal antara inisiasi obat dan timbulnya reaksi KTD.',
      'Kecil kemungkinan dijelaskan oleh perjalanan penyakit pasien atau obat lain.',
      'Respons klinis membaik setelah obat dihentikan (Dechallenge positif).',
      'Uji pemberian ulang (Rechallenge) tidak dilakukan atau tidak diperlukan secara etis klinis.'
    ],
    explanation: 'Sangat mungkin disebabkan oleh obat, didukung oleh respons perbaikan saat obat dihentikan.',
    officialBpomaAction: 'Disarankan menghentikan obat atau beralih ke obat alternatif. Lengkapi laporan MESO BPOM RI.'
  },
  {
    id: 'possible',
    name: 'Possible (Mungkin)',
    indonesianName: 'Mungkin (Possible)',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 border-blue-300 dark:border-blue-800',
    color: 'text-blue-600 dark:text-blue-400',
    criteria: [
      'Hubungan waktu yang masuk akal antara pemberian obat dan timbulnya gejala.',
      'DAPAT dijelaskan oleh penyakit yang mendasari atau obat/terapi lain yang dikonsumsi bersamaan.',
      'Informasi mengenai penghentian obat (Dechallenge) tidak lengkap, belum jelas, atau tidak membaik spontan.'
    ],
    explanation: 'Obat ini berpotensi menjadi penyebab, namun kondisi penyakit pasien atau obat lain juga bisa menjadi pemicu alternatif.',
    officialBpomaAction: 'Pantau secara intensif, lakukan uji lab diferensial, dan pertimbangkan penyesuaian dosis.'
  },
  {
    id: 'unlikely',
    name: 'Unlikely (Kecil Kemungkinan)',
    indonesianName: 'Kecil Kemungkinan (Unlikely)',
    badgeBg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
    color: 'text-slate-600 dark:text-slate-400',
    criteria: [
      'Hubungan waktu tidak masuk akal atau meragukan (misal: timbul sebelum obat diminum).',
      'Penyakit yang mendasari atau obat lain memberikan penjelasan yang jauh lebih masuk akal dan meyakinkan.'
    ],
    explanation: 'Kecil kemungkinan reaksi disebabkan oleh obat ini. Penyebab utama kemungkinan besar adalah penyakit pasien.',
    officialBpomaAction: 'Terapi obat dapat dilanjutkan dengan evaluasi klinis wajar terhadap penyakit dasar.'
  },
  {
    id: 'conditional',
    name: 'Conditional / Unclassified (Bersyarat)',
    indonesianName: 'Bersyarat / Perlu Data Tambahan (Conditional)',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200 border-purple-300 dark:border-purple-800',
    color: 'text-purple-600 dark:text-purple-400',
    criteria: [
      'Kejadian efek samping telah dilaporkan namun diperlukan data tambahan yang lebih lengkap untuk evaluasi yang tepat.',
      'Data sedang dalam proses pengumpulan atau pemeriksaan laboratorium lanjutan.'
    ],
    explanation: 'Penilaian ditunda sementara menunggu hasil lab lanjutan (misal: biopsi, kadar obat dalam darah, atau LFT serial).',
    officialBpomaAction: 'Lakukan pemeriksaan diagnostik tambahan dan re-evaluasi setelah data lengkap.'
  },
  {
    id: 'unassessable',
    name: 'Unassessable / Unclassifiable',
    indonesianName: 'Tidak Dapat Dinilai (Unassessable)',
    badgeBg: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700',
    color: 'text-zinc-500',
    criteria: [
      'Laporan kejadian tidak memiliki data esensial yang memadai, atau terdapat informasi yang saling bertentangan.',
      'Informasi tidak dapat dilengkapi atau diverifikasi lagi.'
    ],
    explanation: 'Informasi KTD tidak mencukupi untuk dinilai secara kausalitas klinis.',
    officialBpomaAction: 'Mintakan konfirmasi data tambahan kepada pelapor jika memungkinkan.'
  }
];

/**
 * 3. Hartwig & Siegel Severity Assessment Scale (Tingkat Keparahan KTD)
 */
export interface HartwigSeverityLevel {
  level: number;
  grade: 'Ringan (Mild)' | 'Sedang (Moderate)' | 'Berat (Severe)' | 'Fatal / Kematian';
  title: string;
  description: string;
  clinicalImpact: string;
  badgeBg: string;
  levelColor: string;
}

export const HARTWIG_SEVERITY_LEVELS: HartwigSeverityLevel[] = [
  {
    level: 1,
    grade: 'Ringan (Mild)',
    title: 'Level 1 - Efek Samping Ringan Tanpa Perubahan Terapi',
    description: 'Efek samping timbul pada pasien, namun TIDAK memerlukan perubahan terapi obat yang dicurigai (misal: rasa sedikit mual ringan transien, mulut agak kering).',
    clinicalImpact: 'Tidak ada intervensi medis khusus, terapi obat dilanjutkan seperti biasa.',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    levelColor: 'text-emerald-600'
  },
  {
    level: 2,
    grade: 'Ringan (Mild)',
    title: 'Level 2 - Penghentian / Penurunan Dosis Tanpa Terapi Tambahan',
    description: 'Efek samping memerlukan penghentian obat, penundaan pemberian, atau penurunan dosis, namun TIDAK memerlukan obat penawar/antidot tambahan dan TIDAK memperpanjang rawat inap.',
    clinicalImpact: 'Penyesuaian dosis atau penghentian obat saja sudah cukup meredakan gejala.',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300',
    levelColor: 'text-teal-600'
  },
  {
    level: 3,
    grade: 'Sedang (Moderate)',
    title: 'Level 3 - Memerlukan Terapi / Antidot Penawar Tambahan',
    description: 'Efek samping memerlukan penghentian/perubahan terapi obat DAN memerlukan pemberian obat penawar/antidot atau terapi medis tambahan, namun TIDAK memperpanjang rawat inap.',
    clinicalImpact: 'Pasien diberikan terapi simptomatik aktif (misal: antihistamin/steroid untuk alergi, PPI untuk iritasi gaster).',
    badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-300',
    levelColor: 'text-yellow-600'
  },
  {
    level: 4,
    grade: 'Sedang (Moderate)',
    title: 'Level 4 - Memerlukan Rawat Inap / Perpanjangan Masa Rawat (Hospitalisasi)',
    description: 'Efek samping menyebabkan pasien harus dirawat inap (hospitalisasi) minimal 1 hari ATAU memperpanjang lama rawat inap (Length of Stay) pasien yang sedang dirawat minimal 1 hari.',
    clinicalImpact: 'Beban perawatan rumah sakit meningkat (misal: hiperkalemia moderat, dehidrasi berat akibat diare terinduksi obat).',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
    levelColor: 'text-amber-600'
  },
  {
    level: 5,
    grade: 'Berat (Severe)',
    title: 'Level 5 - Menyebabkan Kerusakan Permanen / Perawatan Intensif (ICU)',
    description: 'Efek samping memerlukan perawatan intensif di ruang ICU / HCU atau menyebabkan disfungsi organ signifikan yang memerlukan monitoring ketat kontinu.',
    clinicalImpact: 'Pasien mengalami kerusakan organ berat (misal: AKI stadium 3, hepatotoksisitas berat dengan ensefalopati, aritmia TdP).',
    badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-300',
    levelColor: 'text-orange-600'
  },
  {
    level: 6,
    grade: 'Berat (Severe)',
    title: 'Level 6 - Mengancam Nyawa Secara Langsung (Life-Threatening)',
    description: 'Efek samping secara langsung mengancam nyawa pasien dan memerlukan intervensi medis darurat resusitasi segera untuk mencegah kematian (misal: Syok Anafilaksis, Henti Jantung, Apnea Berat).',
    clinicalImpact: 'Kondisi gawat darurat kritis yang memerlukan resusitasi hidup dasar dan lanjutan (CPR/Adrenalin/Intubasi).',
    badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300',
    levelColor: 'text-red-600'
  },
  {
    level: 7,
    grade: 'Fatal / Kematian',
    title: 'Level 7 - KTD Menyebabkan Kematian Pasien (Fatal)',
    description: 'Efek samping obat secara langsung atau tidak langsung menyebabkan kematian pasien.',
    clinicalImpact: 'Kejadian fatal yang wajib dilaporkan dalam waktu 1x24 jam ke Komite Keselamatan Pasien RS & Pusat Farmakovigilans BPOM RI.',
    badgeBg: 'bg-rose-950 text-rose-100 border-rose-800',
    levelColor: 'text-rose-500'
  }
];

/**
 * 4. Schumock & Thornton Preventability Scale (Skala Ketercegahan KTD)
 */
export interface SchumockQuestion {
  id: string;
  section: 'A' | 'B';
  sectionTitle: string;
  question: string;
  explanation: string;
}

export const SCHUMOCK_QUESTIONS: SchumockQuestion[] = [
  // Section A: Definitely Preventable (Jika ada jawaban 'Ya', maka Pasti Dapat Dicegah)
  {
    id: 'A1',
    section: 'A',
    sectionTitle: 'Section A (Pasti Dapat Dicegah - Definitely Preventable)',
    question: 'Apakah pemilihan obat tidak tepat untuk indikasi klinis pasien atau terdapat kontraindikasi mutlak?',
    explanation: 'Contoh: Peresepan obat yang dikontraindikasikan pada kehamilan, gagal ginjal terminal, atau alergi terdokumentasi.'
  },
  {
    id: 'A2',
    section: 'A',
    sectionTitle: 'Section A (Pasti Dapat Dicegah - Definitely Preventable)',
    question: 'Apakah dosis, frekuensi pemberian, atau rute obat tidak sesuai untuk usia, berat badan, atau fungsi ginjal/hati pasien?',
    explanation: 'Contoh: Dosis melebihi dosis maksimal harian atau tidak dilakukan penyesuaian dosis saat CrCl < 30 mL/min.'
  },
  {
    id: 'A3',
    section: 'A',
    sectionTitle: 'Section A (Pasti Dapat Dicegah - Definitely Preventable)',
    question: 'Apakah terdapat riwayat alergi atau reaksi efek samping serupa yang sudah terdokumentasi di rekam medis pasien sebelumnya?',
    explanation: 'Contoh: Pasien dengan riwayat alergi penisilin tetap diresepkan Amoxicillin.'
  },
  {
    id: 'A4',
    section: 'A',
    sectionTitle: 'Section A (Pasti Dapat Dicegah - Definitely Preventable)',
    question: 'Apakah terdapat interaksi obat bermakna secara klinis (Major DDI) yang terabaikan dalam resep?',
    explanation: 'Contoh: Pemberian Spironolactone bersamaan dengan suplemen KCl pekat tanpa pemantauan kalium.'
  },
  // Section B: Probably Preventable (Jika Section A 'Tidak', dan Section B ada 'Ya', maka Mungkin Dapat Dicegah)
  {
    id: 'B1',
    section: 'B',
    sectionTitle: 'Section B (Mungkin Dapat Dicegah - Probably Preventable)',
    question: 'Apakah pemantauan Therapeutic Drug Monitoring (TDM) atau uji laboratorium penunjang yang disyaratkan tidak dilakukan?',
    explanation: 'Contoh: Tidak dilakukan pemeriksaan kadar trough Gentamicin/Vancomycin atau nilai INR pada Warfarin.'
  },
  {
    id: 'B2',
    section: 'B',
    sectionTitle: 'Section B (Mungkin Dapat Dicegah - Probably Preventable)',
    question: 'Apakah terdapat ketidakpatuhan minum obat oleh pasien (misal: konsumsi berlebih atau salah jadwal)?',
    explanation: 'Contoh: Pasien meminum dosis dobel tanpa instruksi apoteker.'
  }
];

export function evaluateSchumockResult(answers: Record<string, boolean>): {
  result: 'Definitely Preventable (Pasti Dapat Dicegah)' | 'Probably Preventable (Mungkin Dapat Dicegah)' | 'Not Preventable (Tidak Dapat Dicegah)';
  badgeBg: string;
  color: string;
  summary: string;
  recommendation: string;
} {
  const hasSectionAYes = ['A1', 'A2', 'A3', 'A4'].some(k => answers[k] === true);
  if (hasSectionAYes) {
    return {
      result: 'Definitely Preventable (Pasti Dapat Dicegah)',
      badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border-red-300 dark:border-red-800',
      color: 'text-red-600 dark:text-red-400',
      summary: 'KTD ini disebabkan oleh kesalahan peresepan, kekeliruan dosis/rute, pengabaian riwayat alergi, atau interaksi obat mayor yang seharusnya dapat dihindari sepenuhnya.',
      recommendation: 'Lakukan audit klinis peresepan, penapisan resep ketat oleh apoteker (skrining farmasi), dan update peringatan alergi pada sistem resep elektronik (CPOE).'
    };
  }

  const hasSectionBYes = ['B1', 'B2'].some(k => answers[k] === true);
  if (hasSectionBYes) {
    return {
      result: 'Probably Preventable (Mungkin Dapat Dicegah)',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800',
      color: 'text-amber-600 dark:text-amber-400',
      summary: 'KTD ini kemungkinan besar dapat dicegah apabila protokol pemantauan laboratorium (TDM/Lab rutin) atau edukasi kepatuhan pasien dijalankan secara optimal.',
      recommendation: 'Tingkatkan frekuensi pemantauan kadar obat terapeutik (TDM) dan berikan konseling PIO mendalam mengenai aturan minum obat.'
    };
  }

  return {
    result: 'Not Preventable (Tidak Dapat Dicegah)',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
    color: 'text-emerald-600 dark:text-emerald-400',
    summary: 'KTD ini tidak dapat dicegah secara wajar karena terjadi pada dosis terapi yang tepat, tanpa riwayat alergi sebelumnya, dan merupakan respons idiosinkratik biologis pasien.',
    recommendation: 'Tangani keluhan pasien secara suportif dan dokumentasikan reaksi KTD ini ke dalam rekam medis untuk pencegahan di masa depan.'
  };
}

/**
 * 5. BPOM Yellow Form (Formulir Kuning MESO BPOM RI) Data Model
 */
export interface BpomYellowFormReport {
  patient: {
    name: string;
    recordNo: string;
    gender: 'Laki-laki' | 'Perempuan';
    age: string;
    weightKg: string;
    ethnic: string;
    mainDiagnosis: string;
    otherConditions: string;
  };
  reaction: {
    manifestation: string;
    onsetDate: string;
    endDate: string;
    outcome: 'Sembuh Sempurna' | 'Sembuh dengan Cacat' | 'Belum Sembuh' | 'Meninggal Dunia' | 'Tidak Diketahui';
    medicalTreatmentGiven: string;
    labDataResults: string;
  };
  suspectedDrug: {
    tradeName: string;
    activeSubstance: string;
    dosageForm: string;
    batchNumber: string;
    dosageGiven: string;
    route: string;
    startDate: string;
    stopDate: string;
    indication: string;
    dechallengeResult: 'Gejala Membaik' | 'Gejala Tidak Berubah' | 'Obat Tidak Dihentikan' | 'Tidak Tahu';
    rechallengeResult: 'Gejala Muncul Kembali' | 'Gejala Tidak Muncul' | 'Rechallenge Tidak Dilakukan';
  };
  concomitantDrugs: {
    name: string;
    dosage: string;
    route: string;
    duration: string;
    indication: string;
  }[];
  reporter: {
    pharmacistName: string;
    sipaNumber: string;
    institutionName: string;
    institutionAddress: string;
    phone: string;
    email: string;
    reportDate: string;
  };
}

export const DEFAULT_BPOM_YELLOW_FORM: BpomYellowFormReport = {
  patient: {
    name: 'Tn. Budi Santoso',
    recordNo: 'RM-2026-09142',
    gender: 'Laki-laki',
    age: '56 Tahun',
    weightKg: '68 kg',
    ethnic: 'Jawa / Indonesia',
    mainDiagnosis: 'Hipertensi Grade 2 & Dislipidemia',
    otherConditions: 'Riwayat GERD'
  },
  reaction: {
    manifestation: 'Batuk kering parah terus-menerus tanpa dahak disertai rasa menggelitik di tenggorokan terutama saat malam hari dan berbaring.',
    onsetDate: '2026-08-15',
    endDate: '2026-08-25',
    outcome: 'Sembuh Sempurna',
    medicalTreatmentGiven: 'Penghentian Captopril dan penggantian terapi ke Candesartan 8 mg per oral 1x sehari.',
    labDataResults: 'Rontgen Thorax Normal (tidak ada infiltrat/infeksi paru), TTV TD 135/85 mmHg, HR 76x/m.'
  },
  suspectedDrug: {
    tradeName: 'Captopril Tablet 25 mg',
    activeSubstance: 'Captopril',
    dosageForm: 'Tablet Oral',
    batchNumber: 'CPT26A0891',
    dosageGiven: '25 mg 2x sehari',
    route: 'Oral (1 jam ac)',
    startDate: '2026-08-01',
    stopDate: '2026-08-20',
    indication: 'Hipertensi Esensial',
    dechallengeResult: 'Gejala Membaik',
    rechallengeResult: 'Rechallenge Tidak Dilakukan'
  },
  concomitantDrugs: [
    { name: 'Atorvastatin 20 mg', dosage: '20 mg 1x sehari malam', route: 'Oral', duration: '3 bulan', indication: 'Dislipidemia' },
    { name: 'Amlodipine 5 mg', dosage: '5 mg 1x sehari pagi', route: 'Oral', duration: '6 bulan', indication: 'Hipertensi' }
  ],
  reporter: {
    pharmacistName: 'apt. Rina Wati, S.Farm',
    sipaNumber: '19920814/SIPA_31.74/2023/2019',
    institutionName: 'Klinik & Apotek Medika Sejahtera',
    institutionAddress: 'Jl. Jendral Sudirman No. 45, Jakarta',
    phone: '0812-9988-7766',
    email: 'layanan.farmasi@medikasejahtera.co.id',
    reportDate: new Date().toISOString().split('T')[0]
  }
};

