export interface DrugClinicalProfile {
  keys: string[];
  strengths: string[];
  defaultStrength: string;
  defaultFrequency: string; // e.g. "1x1 Pagi (08:00)", "1x1 Malam (21:00 Sebelum Tidur)", "2x1 (Tiap 12 jam: 08:00 & 20:00)", "3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)"
  defaultTiming: 'Sebelum Makan' | 'Sesudah Makan' | 'Bersama Makanan' | 'Perut Kosong' | 'Bebas';
  preferredTimes: string[];
  clinicalReason: string;
  acbScore?: number; // Anticholinergic Cognitive Burden (1, 2, 3)
  beersWarning?: string; // AGS Beers 2023 Warning
  prescribingCascade?: {
    sideEffect: string;
    oftenFollowedBy: string;
    clinicalAdvice: string;
  };
}

export const CLINICAL_DRUG_PROFILES: DrugClinicalProfile[] = [
  // --- GASTROINTESTINAL & PPI / MUKOPROTEKTOR ---
  {
    keys: ['omeprazole', 'lokev', 'ozid', 'prilos'],
    strengths: ['20 mg', '40 mg Injeksi'],
    defaultStrength: '20 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 30-60 menit Sebelum Makan pagi. Pompa proton sel parietal diaktifkan oleh asupan makanan, sehingga PPI perlu ada sebelum makan untuk inhibisi maksimal.'
  },
  {
    keys: ['lansoprazole', 'prosogan', 'inazol', 'lapraz'],
    strengths: ['30 mg', '30 mg Injeksi'],
    defaultStrength: '30 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 30-60 menit Sebelum Makan pagi (atau malam sebelum makan malam bila dosis ganda).'
  },
  {
    keys: ['esomeprazole', 'nexium'],
    strengths: ['20 mg', '40 mg', '40 mg Injeksi'],
    defaultStrength: '40 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 30-60 menit Sebelum Makan pagi dengan segelas air.'
  },
  {
    keys: ['pantoprazole', 'pantozol', 'panloc'],
    strengths: ['20 mg', '40 mg', '40 mg Injeksi'],
    defaultStrength: '40 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 30-60 menit Sebelum Makan pagi, jangan digerus/dikunyah.'
  },
  {
    keys: ['rabeprazole', 'pariet'],
    strengths: ['10 mg', '20 mg'],
    defaultStrength: '20 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 30 menit Sebelum Makan pagi.'
  },
  {
    keys: ['antasida', 'antacid', 'promag', 'mylanta', 'polysilane', 'magnesium hydroxide', 'aluminium hydroxide'],
    strengths: ['200 mg/200 mg Kunyah', 'Suspensi Oral 60ml'],
    defaultStrength: '200 mg/200 mg Kunyah',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum 1 jam sebelum makan atau 2 jam setelah makan & sebelum tidur saat perut kosong untuk menetralkan asam lambung.'
  },
  {
    keys: ['sucralfate', 'inpepsa', 'necra', 'episan'],
    strengths: ['500 mg/5ml Suspensi', '500 mg Tablet'],
    defaultStrength: '500 mg/5ml Suspensi',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Perut Kosong',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Wajib diminum 1 jam Sebelum Makan atau 2 jam sesudah makan pada Perut Kosong agar dapat membentuk lapisan polimer pelindung ulkus lambung/duodenum.'
  },
  {
    keys: ['domperidone', 'vometa', 'vosedon', 'motilium'],
    strengths: ['10 mg', '5 mg/5ml Sirup'],
    defaultStrength: '10 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum 15-30 menit Sebelum Makan dan sebelum tidur malam agar motilitas lambung siap saat makanan masuk.'
  },
  {
    keys: ['metoclopramide', 'primperan', 'sotatic'],
    strengths: ['10 mg', '5 mg/5ml Sirup', '10 mg/2ml Injeksi'],
    defaultStrength: '10 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum 30 menit Sebelum Makan.',
    prescribingCascade: {
      sideEffect: 'Tremor / Gejala Ekstrapiramidal (EPS)',
      oftenFollowedBy: 'Trihexyphenidyl',
      clinicalAdvice: 'Pertimbangkan ganti ke Domperidone yang tidak menembus sawar darah otak dibanding menambah obat antikolinergik.'
    }
  },
  {
    keys: ['hyoscine', 'buscopan', 'scopolamine'],
    strengths: ['10 mg', '20 mg/ml Injeksi'],
    defaultStrength: '10 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sebelum makan atau saat timbul kram/kejang otot perut.',
    acbScore: 3
  },
  {
    keys: ['ondansetron', 'narfoz', 'cedantron'],
    strengths: ['4 mg', '8 mg', '4 mg/2ml Injeksi'],
    defaultStrength: '4 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Dapat diminum 30 menit sebelum kemoterapi/tindakan atau bersama/tanpa makanan.'
  },
  {
    keys: ['ranitidine', 'acran', 'zantac', 'radin'],
    strengths: ['150 mg', '50 mg/2ml Injeksi'],
    defaultStrength: '150 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum 30-60 menit sebelum makan atau bersama makanan/sebelum tidur malam.',
    acbScore: 1
  },
  {
    keys: ['bisacodyl', 'dulcolax', 'custodiol'],
    strengths: ['5 mg Tablet Salut Enterik', '10 mg Supositoria'],
    defaultStrength: '5 mg Tablet Salut Enterik',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur dengan segelas air putih. JANGAN bersamaan dengan susu atau antasida (beri jeda 1 jam agar salut enterik tidak rusak di lambung).'
  },
  {
    keys: ['lactulose', 'duphalac', 'lantulos', 'opilax'],
    strengths: ['3.33 g/5ml Sirup 60ml', '3.33 g/5ml Sirup 120ml'],
    defaultStrength: '3.33 g/5ml Sirup 60ml',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Dapat dicampur dengan air putih, jus buah, atau susu sesudah makan pagi.'
  },
  {
    keys: ['loperamide', 'imodium', 'renamid', 'lopamid'],
    strengths: ['2 mg'],
    defaultStrength: '2 mg',
    defaultFrequency: 'PRN / Bila Perlu (Kebutuhan Saja)',
    defaultTiming: 'Bebas',
    preferredTimes: [],
    clinicalReason: 'Diberikan 2 tablet awal sesudah buang air besar cair pertama, dilanjutkan 1 tablet tiap BAB cair berikutnya (maksimal 8 tablet / 16 mg per hari).'
  },
  {
    keys: ['attapulgite', 'new diatabs', 'biodiar'],
    strengths: ['600 mg', '650 mg'],
    defaultStrength: '600 mg',
    defaultFrequency: 'PRN / Bila Perlu (Kebutuhan Saja)',
    defaultTiming: 'Bebas',
    preferredTimes: [],
    clinicalReason: 'Diminum sesudah buang air besar cair. Beri jeda 2 jam dengan obat lain karena sifat adsorbennya.'
  },

  // --- ANTIDIABETES ORAL & INSULIN ---
  {
    keys: ['metformin', 'glucophage', 'glumin', 'gludepatic'],
    strengths: ['500 mg', '850 mg', '1000 mg XR'],
    defaultStrength: '500 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Wajib diminum Bersama Makanan atau segera sesudah makan (pada suapan pertama) untuk mengurangi keluhan iritasi lambung, mual, dan diare.'
  },
  {
    keys: ['glimepiride', 'amaryl', 'glimpid', 'metrix'],
    strengths: ['1 mg', '2 mg', '3 mg', '4 mg'],
    defaultStrength: '2 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 15-30 menit Sebelum Makan pagi (atau sebelum suapan makan pertama) untuk merangsang sekresi insulin tepat saat glukosa makanan diserap.'
  },
  {
    keys: ['glibenclamide', 'daonil', 'renabetic'],
    strengths: ['5 mg'],
    defaultStrength: '5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum 15-30 menit Sebelum Makan pagi.',
    beersWarning: 'Kriteria Beers: HINDARI PADA LANSIA >= 65 TAHUN karena risiko hipoglikemia berkepanjangan yang fatal. Ganti ke Glimepiride atau DPP-4i.'
  },
  {
    keys: ['acarbose', 'glucobay', 'acarb'],
    strengths: ['50 mg', '100 mg'],
    defaultStrength: '50 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Wajib dikunyah bersama suapan pertama makanan besar agar enzim alfa-glukosidase usus terhambat optimal dalam memecah karbohidrat.'
  },
  {
    keys: ['empagliflozin', 'jardiance'],
    strengths: ['10 mg', '25 mg'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari dengan segelas air putih, dengan atau tanpa makanan.'
  },
  {
    keys: ['dapagliflozin', 'forxiga'],
    strengths: ['10 mg', '5 mg'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari dengan segelas air putih.'
  },
  {
    keys: ['linagliptin', 'trajenta'],
    strengths: ['5 mg'],
    defaultStrength: '5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Dapat diminum bersama atau tanpa makanan. Tidak memerlukan penyesuaian dosis pada gangguan ginjal.'
  },
  {
    keys: ['vildagliptin', 'galvus'],
    strengths: ['50 mg'],
    defaultStrength: '50 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum pagi dan malam hari dengan atau tanpa makanan.'
  },

  // --- KARDIOVASKULAR & ANTIHIPERTENSI ---
  {
    keys: ['captopril', 'tensobon', 'capoten'],
    strengths: ['12.5 mg', '25 mg', '50 mg'],
    defaultStrength: '25 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Perut Kosong',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Makanan menurunkan penyerapan Captopril hingga 30-40%. Wajib diminum 1 jam Sebelum Makan atau 2 jam sesudah makan pada Perut Kosong.',
    acbScore: 1,
    prescribingCascade: {
      sideEffect: 'Batuk Kering Persisten (Bradikinin)',
      oftenFollowedBy: 'Sirup Antitusif (Dextromethorphan/Codeine)',
      clinicalAdvice: 'Ganti kelas terapi ke ARB (Candesartan/Valsartan) daripada menambah obat batuk.'
    }
  },
  {
    keys: ['candesartan', 'canderin', 'blopress'],
    strengths: ['8 mg', '16 mg'],
    defaultStrength: '8 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sekali sehari pada jam yang sama pagi hari, dengan atau tanpa makanan.'
  },
  {
    keys: ['amlodipine', 'norvask', 'amlocor', 'divask'],
    strengths: ['5 mg', '10 mg'],
    defaultStrength: '5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pada jam yang sama setiap pagi atau malam. Hindari bersama jus grapefruit.',
    prescribingCascade: {
      sideEffect: 'Edema Perifer / Bengkak Pergelangan Kaki',
      oftenFollowedBy: 'Furosemide',
      clinicalAdvice: 'Turunkan dosis CCB atau kombinasikan dengan ARB/ACEi yang meredakan edema pre-kapiler dibanding menambah diuretik loop.'
    }
  },
  {
    keys: ['valsartan', 'diovan'],
    strengths: ['80 mg', '160 mg'],
    defaultStrength: '80 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari pada jam yang sama setiap hari.'
  },
  {
    keys: ['losartan', 'cozaar', 'acetensa'],
    strengths: ['50 mg', '100 mg'],
    defaultStrength: '50 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah sarapan.'
  },
  {
    keys: ['telmisartan', 'micardis'],
    strengths: ['40 mg', '80 mg'],
    defaultStrength: '40 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sekali sehari pada jam yang sama.'
  },
  {
    keys: ['bisoprolol', 'concor', 'lodoz', 'bipro'],
    strengths: ['2.5 mg', '5 mg', '10 mg'],
    defaultStrength: '2.5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah sarapan. Jangan dihentikan mendadak untuk mencegah rebound hipertensi/takikardia.'
  },
  {
    keys: ['carvedilol', 'dilatrend', 'blorec'],
    strengths: ['6.25 mg', '12.5 mg', '25 mg'],
    defaultStrength: '6.25 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum Bersama Makanan untuk memperlambat laju penyerapan dan mencegah hipotensi ortostatik mendadak.'
  },
  {
    keys: ['propranolol', 'farmadral'],
    strengths: ['10 mg', '40 mg'],
    defaultStrength: '10 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sebelum makan atau saat perut kosong.'
  },
  {
    keys: ['furosemide', 'lasix', 'farsix', 'impugan'],
    strengths: ['40 mg', '20 mg/2ml Injeksi'],
    defaultStrength: '40 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Wajib diminum pagi hari sesudah sarapan agar efek diuresis (buang air kecil) tidak mengganggu tidur di malam hari.',
    acbScore: 1
  },
  {
    keys: ['spironolactone', 'aldactone', 'letonal'],
    strengths: ['25 mg', '100 mg'],
    defaultStrength: '25 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum bersama makanan atau segera sesudah makan untuk meningkatkan bioavailabilitas dan mencegah mual.'
  },
  {
    keys: ['hydrochlorothiazide', 'hct'],
    strengths: ['25 mg', '12.5 mg'],
    defaultStrength: '25 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah sarapan.'
  },
  {
    keys: ['digoxin', 'fargoxin'],
    strengths: ['0.25 mg'],
    defaultStrength: '0.25 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pada jam yang sama setiap hari.',
    acbScore: 2,
    beersWarning: 'Kriteria Beers: Batasi dosis maksimal <= 0.125 mg/hari pada lansia karena risiko toksisitas digitalis fatal.'
  },
  {
    keys: ['diltiazem', 'herbesser'],
    strengths: ['30 mg', '60 mg', '100 mg SR', '200 mg SR'],
    defaultStrength: '30 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sebelum makan dan sebelum tidur.'
  },
  {
    keys: ['verapamil', 'isoptin'],
    strengths: ['80 mg', '240 mg SR'],
    defaultStrength: '80 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum bersama makanan untuk mencegah iritasi lambung.'
  },

  // --- STATIN & DISLIPIDEMIA ---
  {
    keys: ['simvastatin', 'zocor', 'mersivas', 'cholastin'],
    strengths: ['10 mg', '20 mg', '40 mg'],
    defaultStrength: '20 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Wajib diminum malam hari sebelum tidur karena enzim HMG-CoA reduktase hati paling aktif mensintesis kolesterol pada malam hari. Hindari jus grapefruit.'
  },
  {
    keys: ['atorvastatin', 'lipitor', 'atoris', 'truvaz'],
    strengths: ['10 mg', '20 mg', '40 mg', '80 mg'],
    defaultStrength: '20 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Waktu paruh panjang (14 jam), dianjurkan diminum malam hari atau pada jam yang sama setiap hari.'
  },
  {
    keys: ['rosuvastatin', 'crestor', 'rosuvast'],
    strengths: ['10 mg', '20 mg', '40 mg'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum sekali sehari malam hari dengan atau tanpa makanan.'
  },
  {
    keys: ['ezetimibe', 'ezetrol'],
    strengths: ['10 mg'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari bersama atau tanpa makanan, dapat diminum bersamaan dengan statin.'
  },
  {
    keys: ['fenofibrate', 'tricor', 'evothyl'],
    strengths: ['100 mg', '200 mg', '300 mg', '145 mg Nanopartikel'],
    defaultStrength: '100 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Wajib diminum Bersama Makanan (makanan meningkatkan penyerapan fenofibrate).'
  },
  {
    keys: ['gemfibrozil', 'lopid'],
    strengths: ['300 mg', '600 mg'],
    defaultStrength: '600 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum 30 menit Sebelum Makan pagi dan makan malam.'
  },

  // --- ANTIPLATELET & ANTIKOAGULAN ---
  {
    keys: ['aspirin', 'asetosal', 'aspilets', 'thrombo aspilets', 'cardioaspirin', 'miniash'],
    strengths: ['80 mg', '100 mg', '500 mg'],
    defaultStrength: '80 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan dengan segelas air untuk mencegah erosi dan iritasi lambung.'
  },
  {
    keys: ['clopidogrel', 'plavix', 'clopisan', 'plagrel'],
    strengths: ['75 mg', '300 mg Loading'],
    defaultStrength: '75 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sekali sehari pada jam yang sama sesudah sarapan pagi.'
  },
  {
    keys: ['warfarin', 'simarc'],
    strengths: ['1 mg', '2 mg', '5 mg'],
    defaultStrength: '2 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum pada jam yang sama setiap malam hari. Jaga kestabilan asupan sayuran hijau berkadar Vitamin K tinggi.'
  },

  // --- MINERAL & SUPLEMEN (CALCIUM CARBONATE, CALCIUM LACTATE, ZINC, BESI, VITAMIN) ---
  {
    keys: ['calcium carbonate', 'kalsium karbonat', 'cal-95', 'calcichew', 'calos'],
    strengths: ['500 mg', '1000 mg', '1500 mg'],
    defaultStrength: '500 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Wajib diminum Bersama Makanan karena Kalsium Karbonat membutuhkan asam lambung yang disekresi saat makan agar dapat larut dan diserap optimal.'
  },
  {
    keys: ['calcium lactate', 'kalsium laktat', 'kalk', 'calcium'],
    strengths: ['500 mg'],
    defaultStrength: '500 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan. Beri jeda minimal 2 jam dari konsumsi antibiotik siprofloksasin / tetrasiklin.'
  },
  {
    keys: ['zinc', 'zink', 'zinkid', 'darya-zinc'],
    strengths: ['20 mg', '10 mg/5ml Sirup'],
    defaultStrength: '20 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sesudah makan untuk menghindari rasa mual / iritasi lambung.'
  },
  {
    keys: ['ferrous', 'zat besi', 'sangobion', 'sakatonik', 'sulfas ferrosus', 'iron'],
    strengths: ['300 mg Tablet Tambah Darah', '60 mg Elemental Iron'],
    defaultStrength: '300 mg Tablet Tambah Darah',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Perut Kosong',
    preferredTimes: ['08:00'],
    clinicalReason: 'Penyerapan paling maksimal pada Perut Kosong bersama Vitamin C (jus jeruk). Bila timbul mual, dapat diminum sesudah makan. Jangan bersama teh, kopi, atau susu (polifenol & kalsium menghambat penyerapan besi).'
  },
  {
    keys: ['vitamin d3', 'cholecalciferol', 'd3', 'prove d3'],
    strengths: ['1000 IU', '5000 IU', '400 IU'],
    defaultStrength: '1000 IU',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Vitamin larut lemak, penyerapan maksimal bila dikonsumsi bersama makanan yang mengandung lemak.'
  },
  {
    keys: ['folic acid', 'asam folat', 'folavit', 'afolat'],
    strengths: ['400 mcg', '1 mg', '5 mg'],
    defaultStrength: '400 mcg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah sarapan.'
  },
  {
    keys: ['mecobalamin', 'vitamin b12', 'methycobal', 'lapibal'],
    strengths: ['500 mcg', '500 mcg/ml Injeksi'],
    defaultStrength: '500 mcg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan.'
  },
  {
    keys: ['vitamin b complex', 'neurobion', 'neurotropic', 'b1 b6 b12'],
    strengths: ['100 mg/100 mg/5000 mcg', '50 mg/100 mg/100 mcg'],
    defaultStrength: '100 mg/100 mg/5000 mcg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah makan.'
  },

  // --- ANALGESIK, OAINS & KORTIKOSTEROID ---
  {
    keys: ['paracetamol', 'acetaminophen', 'panadol', 'sanmol', 'pamol', 'dumin'],
    strengths: ['500 mg', '650 mg', '120 mg/5ml Sirup', '250 mg/100ml Infus'],
    defaultStrength: '500 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Dapat diminum sesudah makan. Batasi dosis maksimal 4000 mg/hari (2000 mg/hari pada geriatri/gangguan hati).'
  },
  {
    keys: ['ibuprofen', 'proris', 'brufen', 'bufect'],
    strengths: ['200 mg', '400 mg', '100 mg/5ml Sirup'],
    defaultStrength: '400 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan atau bersama makanan untuk mencegah dispepsia dan iritasi lambung.',
    beersWarning: 'Kriteria Beers: HINDARI penggunaan jangka panjang pada lansia karena risiko perdarahan saluran cerna & gagal ginjal.'
  },
  {
    keys: ['mefenamic', 'asam mefenamat', 'ponstan', 'mefinal'],
    strengths: ['500 mg', '250 mg'],
    defaultStrength: '500 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan. Jangan gunakan lebih dari 7 hari berturut-turut.'
  },
  {
    keys: ['diklofenak', 'diclofenac', 'voltaren', 'cataflam', 'flamar'],
    strengths: ['25 mg', '50 mg', '75 mg Injeksi'],
    defaultStrength: '50 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan untuk mencegah luka lambung.'
  },
  {
    keys: ['meloxicam', 'mobic', 'moxam', 'ostelox'],
    strengths: ['7.5 mg', '15 mg'],
    defaultStrength: '7.5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sekali sehari Sesudah Makan pagi dengan segelas air.'
  },
  {
    keys: ['ketorolac', 'toradol', 'fartor'],
    strengths: ['10 mg', '30 mg/ml Injeksi'],
    defaultStrength: '10 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan. Maksimal durasi pemakaian 5 HARI karena risiko tinggi perdarahan lambung dan nefrotoksisitas.'
  },
  {
    keys: ['dexamethasone', 'kalmethasone', 'oradexon', 'cortidex'],
    strengths: ['0.5 mg', '0.75 mg', '5 mg/ml Injeksi'],
    defaultStrength: '0.5 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan untuk mencegah iritasi lambung.'
  },
  {
    keys: ['prednisone', 'pehacort'],
    strengths: ['5 mg'],
    defaultStrength: '5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum Sesudah Makan pagi mengikuti ritme sirkadian kortisol alami tubuh.'
  },
  {
    keys: ['methylprednisolone', 'medixon', 'advancort', 'sanexon'],
    strengths: ['4 mg', '8 mg', '16 mg', '125 mg Injeksi'],
    defaultStrength: '4 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan.'
  },

  // --- GOUT / ASAM URAT ---
  {
    keys: ['allopurinol', 'zyloric', 'isoric', 'sinoric'],
    strengths: ['100 mg', '300 mg'],
    defaultStrength: '100 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Wajib diminum Sesudah Makan dengan banyak minum air putih (2-3 liter/hari) untuk mencegah iritasi lambung dan pembentukan batu ginjal.'
  },
  {
    keys: ['colchicine', 'kolkisin', 'reucid'],
    strengths: ['0.5 mg'],
    defaultStrength: '0.5 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sesudah makan.'
  },

  // --- ANTIBIOTIK & ANTIMIKROBA ---
  {
    keys: ['amoxicillin', 'amoxil', 'opimox', 'kalmoxillin'],
    strengths: ['250 mg', '500 mg', '125 mg/5ml Sirup Dry'],
    defaultStrength: '500 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan teratur tiap 8 jam hingga tuntas.'
  },
  {
    keys: ['ciprofloxacin', 'ciflox', 'baquinor', 'quinobiotic'],
    strengths: ['250 mg', '500 mg', '200 mg/100ml Infus'],
    defaultStrength: '500 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum 2 jam sesudah makan. HINDARI bersama susu, kalsium, yoghurt, suplemen besi, atau antasida (beri jeda 2 jam).'
  },
  {
    keys: ['azithromycin', 'zithromax', 'zycin'],
    strengths: ['250 mg', '500 mg'],
    defaultStrength: '500 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sekali sehari sesudah makan pada jam yang sama.'
  },
  {
    keys: ['cefixime', 'cepsel', 'cefilat', 'spancef'],
    strengths: ['100 mg', '200 mg', '100 mg/5ml Sirup'],
    defaultStrength: '100 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum sesudah makan tiap 12 jam hingga tuntas.'
  },
  {
    keys: ['cefadroxil', 'lapicef', 'qidocef'],
    strengths: ['250 mg', '500 mg', '125 mg/5ml Sirup'],
    defaultStrength: '500 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum sesudah makan.'
  },
  {
    keys: ['cotrimoxazole', 'bactrim', 'sanprima', 'primadex'],
    strengths: ['480 mg', '960 mg Forte'],
    defaultStrength: '480 mg',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum sesudah makan dengan segelas penuh air putih.'
  },
  {
    keys: ['metronidazole', 'flagyl', 'tismazol'],
    strengths: ['250 mg', '500 mg', '500 mg/100ml Infus'],
    defaultStrength: '500 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan. HINDARI alkohol selama terapi hingga 48 jam sesudah selesai (memicu reaksi disulfiram mual muntah berat).'
  },

  // --- ANTIHISTAMIN & RESPIRASI ---
  {
    keys: ['cetirizine', 'incidal', 'ryvel', 'cerini', 'ozen'],
    strengths: ['10 mg', '5 mg/5ml Sirup'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur karena dapat menyebabkan kantuk ringan.',
    acbScore: 2
  },
  {
    keys: ['loratadine', 'claritin', 'cronitin', 'alloris'],
    strengths: ['10 mg', '5 mg/5ml Sirup'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum sekali sehari pagi atau malam hari, non-sedatif.'
  },
  {
    keys: ['chlorpheniramine', 'ctm', 'chlorphenamine'],
    strengths: ['4 mg'],
    defaultStrength: '4 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan. Efek sedasi kuat, hindari mengemudi.',
    acbScore: 3,
    beersWarning: 'Kriteria Beers: HINDARI PADA LANSIA karena sifat antikolinergik kuat (retensi urin, konstipasi, delirium).'
  },
  {
    keys: ['salbutamol', 'ventolin', 'lasal', 'astrasal'],
    strengths: ['2 mg', '4 mg', '100 mcg/dose Inhaler'],
    defaultStrength: '2 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum 1 jam sebelum makan atau 2 jam sesudah makan (atau sesudah makan bila timbul mual).'
  },
  {
    keys: ['acetylcysteine', 'fluimucil', 'nytex'],
    strengths: ['200 mg Kapsul', '600 mg Effervescent'],
    defaultStrength: '200 mg Kapsul',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan dengan banyak air putih.'
  },
  {
    keys: ['ambroxol', 'mucos', 'epexol', 'mucopect'],
    strengths: ['30 mg', '15 mg/5ml Sirup'],
    defaultStrength: '30 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan.'
  },

  // --- PSIKIATRI & SISTEM SARAF ---
  {
    keys: ['sertraline', 'zoloft', 'fridep', 'nudep'],
    strengths: ['50 mg'],
    defaultStrength: '50 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah sarapan untuk mencegah insomnia dan mual.'
  },
  {
    keys: ['fluoxetine', 'prozac', 'kalxetin', 'nopres'],
    strengths: ['20 mg', '10 mg'],
    defaultStrength: '20 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari sesudah sarapan.'
  },
  {
    keys: ['amitriptyline', 'laroxyl'],
    strengths: ['25 mg'],
    defaultStrength: '25 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur karena efek sedasi kuat.',
    acbScore: 3,
    beersWarning: 'Kriteria Beers: HINDARI PADA LANSIA karena sifat antikolinergik tinggi, hipotensi ortostatik, dan aritmia.'
  },
  {
    keys: ['trihexyphenidyl', 'artane', 'arkine'],
    strengths: ['2 mg'],
    defaultStrength: '2 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum sesudah makan.',
    acbScore: 3,
    beersWarning: 'Kriteria Beers: HINDARI PADA LANSIA karena risiko delirium, glaukoma, retensi urin, dan demensia.'
  },
  {
    keys: ['diazepam', 'valisanbe', 'stesolid'],
    strengths: ['2 mg', '5 mg', '10 mg Rektal'],
    defaultStrength: '2 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur.',
    acbScore: 1,
    beersWarning: 'Kriteria Beers: HINDARI Benzodiazepin kerja panjang pada lansia karena risiko jatuh, fraktur, dan sedasi berlebih.'
  },
  {
    keys: ['alprazolam', 'xanax', 'alganax', 'calmlet'],
    strengths: ['0.25 mg', '0.5 mg', '1 mg'],
    defaultStrength: '0.5 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur.',
    beersWarning: 'Kriteria Beers: HINDARI Benzodiazepin pada lansia.'
  },
  {
    keys: ['gabapentin', 'neurontin', 'alpentin', 'sipentin'],
    strengths: ['100 mg', '300 mg'],
    defaultStrength: '300 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur untuk mengurangi pusing awal. Perlu penyesuaian dosis pada gangguan ginjal.'
  },
  {
    keys: ['levothyroxine', 'euthyrox', 'thyrax'],
    strengths: ['50 mcg', '100 mcg'],
    defaultStrength: '50 mcg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Perut Kosong',
    preferredTimes: ['06:00'],
    clinicalReason: 'Wajib diminum 30-60 menit Sebelum Sarapan pagi dengan segelas penuh air putih pada Perut Kosong. Beri jeda minimal 4 jam dari kalsium, antasida, atau suplemen besi.'
  },
  {
    keys: ['lactobacillus', 'lacto-b', 'l-bio', 'lacbon', 'probiokid', 'interlac', 'probiotik'],
    strengths: ['1 Sachet (1 g)', 'Kapsul Probiotik'],
    defaultStrength: '1 Sachet (1 g)',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum Bersama Makanan atau segera sesudah makan. Jangan dicampur air panas (>40°C). Beri jeda minimal 2 jam dari konsumsi antibiotik.'
  },
  {
    keys: ['oralit', 'ors', 'corsalit', 'pharolit'],
    strengths: ['1 Sachet (200 mL)', '1 Sachet (1000 mL)'],
    defaultStrength: '1 Sachet (200 mL)',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '14:00', '20:00'],
    clinicalReason: 'Dilarutkan dalam tepat 200 mL air matang. Diberikan setiap kali selesai buang air besar cair atau muntah.'
  },
  {
    keys: ['zinc', 'zinc sulfate', 'zinkid', 'zincpro', 'l-zinc'],
    strengths: ['20 mg Tablet Dispersibel', 'Sirup 20 mg/5 mL', 'Drop 10 mg/mL'],
    defaultStrength: '20 mg Tablet Dispersibel',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum Sesudah Makan selama 10-14 hari berturut-turut pada anak diare. Beri jeda 2 jam dari susu formula/suplemen besi.'
  },
  {
    keys: ['eperisone', 'myonal', 'forres', 'eprinoc', 'estalex'],
    strengths: ['50 mg'],
    defaultStrength: '50 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Diminum segera sesudah makan untuk mengurangi dispepsia dan pusing. Waspadai rasa kantuk.'
  },
  {
    keys: ['flunarizine', 'sibelium', 'frego', 'degrium', 'flunarin'],
    strengths: ['5 mg', '10 mg'],
    defaultStrength: '10 mg',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diminum malam hari sebelum tidur untuk meminimalkan kantuk siang hari. Evaluasi respons setelah 2 bulan pemakaian.'
  },
  {
    keys: ['tizanidine', 'sirdalud'],
    strengths: ['2 mg', '4 mg'],
    defaultStrength: '2 mg',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Jaga konsistensi pola minum (selalu bersama makan atau selalu saat perut kosong). KONTRAINDIKASI MUTLAK dengan Ciprofloxacin.'
  },
  {
    keys: ['ergotamine', 'ericaf', 'cafergot'],
    strengths: ['1 mg Ergotamine / 50 mg Caffeine'],
    defaultStrength: '1 mg Ergotamine / 50 mg Caffeine',
    defaultFrequency: 'Sesuai Kebutuhan (Maks 4 tab/hari)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Minum segera saat tanda pertama serangan migrain. Maksimal 4 tablet per serangan, maksimal 10 tablet per minggu.'
  },
  {
    keys: ['permethrin', 'scabimite'],
    strengths: ['Krim 5% (Tube 30 g)', 'Krim 5% (Tube 10 g)'],
    defaultStrength: 'Krim 5% (Tube 30 g)',
    defaultFrequency: '1x Pemakaian Malam Hari (Diamkan 8-14 jam)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Dioleskan merata ke seluruh tubuh dari leher ke bawah pada malam hari. Bilas setelah 8-14 jam. Obati seluruh keluarga serumah.'
  },
  {
    keys: ['mupirocin', 'bactoderm', 'pibaksin', 'bactroban'],
    strengths: ['Salep 2% (Tube 5 g)', 'Krim 2% (Tube 10 g)'],
    defaultStrength: 'Salep 2% (Tube 5 g)',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Oleskan tipis pada lesi kulit yang terinfeksi 3 kali sehari selama 7-10 hari. Bersihkan area luka sebelum dioleskan.'
  },
  {
    keys: ['oxymetazoline', 'afrin', 'iliadin', 'breathy nasal'],
    strengths: ['Semprot Hidung 0.05%', 'Tetes Hidung Anak 0.025%'],
    defaultStrength: 'Semprot Hidung 0.05%',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Gunakan maksimal 3-5 hari berturut-turut untuk mencegah rhinitis medicamentosa (rebound congestion parah).'
  },
  {
    keys: ['timolol', 'cendo timol', 'timoph'],
    strengths: ['Tetes Mata 0.25%', 'Tetes Mata 0.5%'],
    defaultStrength: 'Tetes Mata 0.5%',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Tekan sudut dalam mata selama 1-2 menit setelah penetesan (oklusi nasolakrimalis) untuk mencegah penyerapan sistemik dan bradikardia.'
  },
  {
    keys: ['tobramycin', 'cendo tobroson', 'tobradex', 'brecin'],
    strengths: ['Tetes Mata 0.3%', 'Salep Mata 0.3%'],
    defaultStrength: 'Tetes Mata 0.3%',
    defaultFrequency: '4x1 (Tiap 4 jam: 06:00, 10:00, 14:00, 18:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '10:00', '14:00', '18:00'],
    clinicalReason: 'Teteskan pada mata yang sakit tiap 4 jam selama 7-10 hari. Jaga sterilitas ujung botol penetes.'
  },
  {
    keys: ['trimetazidine', 'vastarel', 'angioten', 'carditrim'],
    strengths: ['35 mg Modified Release (MR)'],
    defaultStrength: '35 mg Modified Release (MR)',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Wajib diminum bersama sarapan pagi dan makan malam. Tablet MR harus ditelan utuh, jangan digerus atau dikunyah.'
  },
  {
    keys: ['ampicillin', 'viccillin', 'sanpicillin', 'kalpicillin'],
    strengths: ['500 mg Kapsul', 'Vial 1 g Serbuk Injeksi', 'Sirup Kering 125 mg/5 mL'],
    defaultStrength: '500 mg Kapsul',
    defaultFrequency: '4x1 (Tiap 6 jam: 06:00, 12:00, 18:00, 24:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '12:00', '18:00', '24:00'],
    clinicalReason: 'Wajib diminum saat perut kosong (1 jam sebelum atau 2 jam sesudah makan) dengan segelas penuh air putih.'
  },
  {
    keys: ['atenolol', 'betablok', 'farnormin', 'tenoretic'],
    strengths: ['50 mg', '100 mg'],
    defaultStrength: '50 mg',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum pagi hari pada jam yang sama. JANGAN menghentikan terapi secara mendadak.'
  },
  {
    keys: ['artesunate', 'artesunat', 'malastop'],
    strengths: ['Vial 60 mg Serbuk Injeksi + Pelarut NaHCO3 5%'],
    defaultStrength: 'Vial 60 mg Serbuk Injeksi',
    defaultFrequency: 'Sesuai Protokol Malaria Berat Kemenkes (Jam 0, 12, 24, lalu tiap 24 jam)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diberikan intravena bolus lambat (1-2 menit). Wajib dilanjutkan 1 kurus penuh ACT oral 3 hari saat pasien sadar.'
  },
  {
    keys: ['acetazolamide', 'diamox', 'glauseta'],
    strengths: ['250 mg'],
    defaultStrength: '250 mg',
    defaultFrequency: '4x1 (Tiap 6 jam: 06:00, 12:00, 18:00, 24:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['06:00', '12:00', '18:00', '24:00'],
    clinicalReason: 'Diminum sesudah makan dengan banyak air putih. Waspada parestesia ringan kesemutan jari tangan dan bibir.'
  },
  {
    keys: ['human albumin', 'plasbumin', 'albapure', 'octalbin'],
    strengths: ['Botol 50 mL Larutan 20%', 'Botol 100 mL Larutan 20%', 'Botol 50 mL Larutan 25%'],
    defaultStrength: 'Botol 50 mL Larutan 20%',
    defaultFrequency: '1x Infus IV Lambat',
    defaultTiming: 'Bebas',
    preferredTimes: ['10:00'],
    clinicalReason: 'Kecepatan infus maksimal 1-2 mL/menit. DILARANG diencerkan dengan WFI (risiko hemolisis masif).'
  },
  {
    keys: ['ibandronic', 'ibandronate', 'bonviva'],
    strengths: ['150 mg Tablet Selaput', 'Spuit Pre-filled 3 mg/3 mL IV'],
    defaultStrength: '150 mg Tablet Selaput',
    defaultFrequency: '1x Sebulan (Tanggal yang sama tiap bulan)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['07:00'],
    clinicalReason: 'Diminum pagi hari saat perut kosong dengan segelas penuh air putih biasa. WAJIB TETAP TEGAK MINIMAL 60 MENIT.'
  },
  {
    keys: ['pipemidic', 'urotractin', 'urinter'],
    strengths: ['400 mg Kapsul'],
    defaultStrength: '400 mg Kapsul',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Diminum sesudah makan dengan banyak air putih (minimal 2 L/hari). Hindari paparan sinar matahari terik.'
  },
  {
    keys: ['retinoic', 'tretinoin', 'vitacid', 'retin-a'],
    strengths: ['Krim 0.025%', 'Krim 0.05%', 'Gel 0.05%'],
    defaultStrength: 'Krim 0.025%',
    defaultFrequency: '1x1 Malam (Sebelum Tidur)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Oleskan tipis seukuran biji kacang polong pada malam hari ke wajah kering. Wajib sunscreen di siang hari. KONTRAINDIKASI HAMIL.'
  },
  {
    keys: ['acetic acid', 'asam asetat', 'vosol'],
    strengths: ['Tetes Telinga 2% (Botol 10 mL)', 'Larutan IVA 3-5% (Botol 100 mL)'],
    defaultStrength: 'Tetes Telinga 2% (Botol 10 mL)',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Hangatkan botol di tangan sebelum diteteskan ke liang telinga. Miringkan kepala 3-5 menit.'
  },
  {
    keys: ['bacitracin', 'nebacetin', 'enbacin', 'polysporin'],
    strengths: ['Salep Kulit 5 g', 'Serbuk Tabur Kulit 5 g'],
    defaultStrength: 'Salep Kulit 5 g',
    defaultFrequency: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Oleskan tipis pada lesi kulit yang terinfeksi 2-3 kali sehari selama maksimal 7 hari.'
  },
  {
    keys: ['antihemorrhoid', 'borraginol', 'anusol', 'faktu'],
    strengths: ['Suppositoria Rektal', 'Salep Rektal Tube 15 g'],
    defaultStrength: 'Suppositoria Rektal',
    defaultFrequency: '2x1 (Pagi & Malam sesudah BAB)',
    defaultTiming: 'Bebas',
    preferredTimes: ['07:00', '21:00'],
    clinicalReason: 'Masukkan ke dalam anus dalam posisi tidur miring sesudah buang air besar. Perbanyak konsumsi serat.'
  },
  {
    keys: ['salicylic acid topical', 'kutilos', 'callusol', 'asam salisilat'],
    strengths: ['Cairan Obat Luar 10 mL', 'Salep 10% (Pot 15 g)'],
    defaultStrength: 'Cairan Obat Luar 10 mL',
    defaultFrequency: '1x1 Malam (Sebelum Tidur)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Oleskan hanya pada mata ikan/kapalan setelah direndam air hangat. Lindungi kulit normal sekitar dengan vaselin.'
  },
  {
    keys: ['detemir', 'levemir'],
    strengths: ['100 Unit/mL FlexPen (3 mL)'],
    defaultStrength: '100 Unit/mL FlexPen (3 mL)',
    defaultFrequency: '1x1 Malam (21:00 Sebelum Tidur)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Suntikkan subkutan pada jam yang sama setiap malam. JANGAN mencampur dengan insulin lain dalam satu spuit.'
  },
  {
    keys: ['glulisine', 'glulisin', 'apidra'],
    strengths: ['100 Unit/mL SoloStar (3 mL)'],
    defaultStrength: '100 Unit/mL SoloStar (3 mL)',
    defaultFrequency: '3x1 (Segera sebelum makan besar: 07:00, 12:00, 18:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['07:00', '12:00', '18:00'],
    clinicalReason: 'Suntikkan subkutan 0-15 menit SEBELUM MAKAN atau segera sesudah makan. Selalu siapkan sumber glukosa cepat.'
  },
  {
    keys: ['lispro', 'humalog kwikpen'],
    strengths: ['100 Unit/mL KwikPen (3 mL)'],
    defaultStrength: '100 Unit/mL KwikPen (3 mL)',
    defaultFrequency: '3x1 (15 menit sebelum makan: 07:00, 12:00, 18:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['07:00', '12:00', '18:00'],
    clinicalReason: 'Suntikkan subkutan dalam waktu 15 menit sebelum makan. Rotasikan lokasi penyuntikan.'
  },
  {
    keys: ['humalog mix', 'novomix', 'ryzodeg', 'insulin biphasic'],
    strengths: ['Novomix 30 Flexpen', 'Humalog Mix 50/50 Kwikpen', 'Ryzodeg 70/30 FlexTouch'],
    defaultStrength: 'Novomix 30 Flexpen',
    defaultFrequency: '2x1 (Sesaat sebelum sarapan & makan malam)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['07:00', '18:00'],
    clinicalReason: 'Bolak-balikkan pena 10-20 kali hingga putih keruh merata sebelum suntik (khusus sediaan suspensi). Suntikkan tepat sebelum makan.'
  },
  {
    keys: ['anti-d', 'rhod', 'hyperrho', 'rhesonativ', 'rhophylac'],
    strengths: ['Spuit Prefilled 300 mcg (1500 IU) IM/IV'],
    defaultStrength: 'Spuit Prefilled 300 mcg (1500 IU)',
    defaultFrequency: '1x Suntikan IM (Dalam 72 Jam Pasca Persalinan)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Suntikkan intramuskular pada ibu Rh-negatif dalam waktu maksimal 72 jam setelah melahirkan bayi Rh-positif. JANGAN disuntikkan ke bayi.'
  },
  {
    keys: ['abacavir', 'ziagen', 'kivexa'],
    strengths: ['300 mg Tablet', '600 mg Tablet'],
    defaultStrength: '600 mg Tablet',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'WAJIB SKRINING HLA-B*5701 NEGATIF SEBELUM TERAPI. Jika timbul demam dan ruam, segera ke IGD dan JANGAN RECHALLENGE.'
  },
  {
    keys: ['afatinib', 'giotrif'],
    strengths: ['20 mg', '30 mg', '40 mg'],
    defaultStrength: '40 mg',
    defaultFrequency: '1x1 Pagi (Perut Kosong: 07:00)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['07:00'],
    clinicalReason: 'Wajib diminum saat perut kosong (minimal 1 jam sebelum sarapan). Sediakan Loperamide di rumah untuk antisipasi dini diare.'
  },
  {
    keys: ['alectinib', 'alecensa'],
    strengths: ['150 mg Kapsul'],
    defaultStrength: '150 mg Kapsul (Dosis 4 Kapsul = 600 mg)',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Wajib diminum bersama sarapan pagi dan makan malam. Telan kapsul utuh dengan segelas air putih.'
  },
  {
    keys: ['asparaginase', 'leunase', 'kidrolase'],
    strengths: ['Vial 10,000 IU Serbuk Injeksi'],
    defaultStrength: 'Vial 10,000 IU Serbuk Injeksi',
    defaultFrequency: '3x Seminggu (Senin, Rabu, Jumat) Sesuai Protokol ALL',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'Wajib skin test intradermal sebelum dosis awal. Siapkan selalu Epinefrin di samping pasien. Pantau enzim amilase/lipase (pankreatitis).'
  },
  {
    keys: ['benzathine', 'benzatin', 'penadur', 'bicillin'],
    strengths: ['Vial 1.2 Juta IU', 'Vial 2.4 Juta IU'],
    defaultStrength: 'Vial 2.4 Juta IU',
    defaultFrequency: '1x Suntikan IM Dalam (Dosis Tunggal atau Tiap Minggu)',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'HANYA INTRAMUSKULAR (IM) DALAM pada gluteus. DILARANG KERAS IV (emboli kristal & henti jantung). Wajib aspirasi jarum.'
  },
  {
    keys: ['salicyl powder', 'bedak salisil', 'salicyl talk'],
    strengths: ['Bedak Tabur 50 g (2%)', 'Bedak Tabur 100 g (2%)'],
    defaultStrength: 'Bedak Tabur 50 g (2%)',
    defaultFrequency: '2-3x Sehari (Sehabis Mandi)',
    defaultTiming: 'Bebas',
    preferredTimes: ['07:00', '17:00'],
    clinicalReason: 'Taburkan pada kulit kering yang mengalami biang keringat. Jauhkan dari wajah anak-anak agar serbuk tidak terhirup.'
  },
  {
    keys: ['betaxolol', 'betoptima', 'betoptic'],
    strengths: ['Tetes Mata 0.5% (Botol 5 mL)'],
    defaultStrength: 'Tetes Mata 0.5% (Botol 5 mL)',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Teteskan 1 tetes ke mata. Tekan sudut dalam mata dekat hidung (oklusi punctum) selama 1-2 menit pasca penetesan.'
  },
  {
    keys: ['brinzolamide', 'azopt', 'simbrinza'],
    strengths: ['Tetes Mata Suspensi 1% (Botol 5 mL)'],
    defaultStrength: 'Tetes Mata Suspensi 1% (Botol 5 mL)',
    defaultFrequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Kocok botol suspensi sebelum diteteskan. Tekan sudut dalam mata 1-2 menit untuk mencegah sensasi pahit di lidah.'
  },
  {
    keys: ['bromocriptine', 'parlodel', 'cripsa'],
    strengths: ['2.5 mg Tablet'],
    defaultStrength: '2.5 mg Tablet (Awal 1.25 mg)',
    defaultFrequency: '1x1 Malam (Sebelum Tidur Bersama Makanan)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['21:00'],
    clinicalReason: 'WAJIB DIMINUM BERSAMA MAKANAN/SUSU pada malam hari untuk meminimalkan efek samping mual, muntah, dan hipotensi ortostatik.'
  },
  {
    keys: ['barium sulfate', 'barium sulfat', 'e-z-paque'],
    strengths: ['Suspensi Oral/Rektal Radiologi'],
    defaultStrength: 'Suspensi Oral Radiologi',
    defaultFrequency: '1x Saat Prosedur Radiologi',
    defaultTiming: 'Perut Kosong',
    preferredTimes: ['08:00'],
    clinicalReason: 'Hanya digunakan di ruang radiologi. KONTRAINDIKASI BILA ADA CURIGA BOCOR LAMBUNG/USUS. Wajib minum banyak air pasca tindakan.'
  },
  {
    keys: ['bicalutamide', 'casodex', 'bicastra'],
    strengths: ['50 mg Tablet Selaput'],
    defaultStrength: '50 mg Tablet Selaput',
    defaultFrequency: '1x1 Pagi (08:00)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Diminum teratur pada jam yang sama setiap hari. Waspada keluhan pembesaran/nyeri pada dada (ginekomastia) dan hot flashes.'
  },
  {
    keys: ['bleomycin', 'blenoxane', 'bleocin'],
    strengths: ['Vial 15 mg (15 Unit) Serbuk Injeksi'],
    defaultStrength: 'Vial 15 mg (15 Unit) Serbuk Injeksi',
    defaultFrequency: '1-2x Seminggu Sesuai Siklus Protokol Onkologi',
    defaultTiming: 'Bebas',
    preferredTimes: ['10:00'],
    clinicalReason: 'Maksimal dosis kumulatif seumur hidup 400 Unit. Laporkan segera bila ada batuk kering / sesak napas. Hindari FiO2 tinggi perioperatif.'
  },
  {
    keys: ['bortezomib', 'velcade', 'bortecad'],
    strengths: ['Vial 3.5 mg Serbuk Injeksi'],
    defaultStrength: 'Vial 3.5 mg Serbuk Injeksi',
    defaultFrequency: '2x Seminggu (Hari 1, 4, 8, 11 Siklus 21 Hari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'Rute SUBKUTAN (SC) lebih diutamakan untuk mencegah neuropati. DILARANG INTRATEKAL (FATAL). Wajib profilaksis Acyclovir.'
  },
  {
    keys: ['brentuximab', 'adcetris'],
    strengths: ['Vial 50 mg Serbuk Konsentrat Infus'],
    defaultStrength: 'Vial 50 mg Serbuk Konsentrat Infus',
    defaultFrequency: '1x Tiap 3 Minggu (Siklus 21 Hari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'Diberikan infus IV 30 menit. KONTRAINDIKASI MUTLAK BERSAMA BLEOMYCIN (toksisitas paru mematikan). Pantau kebas jari dan demam.'
  },
  {
    keys: ['bendamustine', 'ribomustin', 'treanda'],
    strengths: ['Vial 25 mg', 'Vial 100 mg Serbuk Infus'],
    defaultStrength: 'Vial 100 mg Serbuk Infus',
    defaultFrequency: 'Hari 1 & 2 Tiap Siklus 21-28 Hari',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'Hanya dilarutkan dalam NaCl 0.9% (JANGAN Dextrose). Wajib hidrasi dan allopurinol (cegah TLS) serta profilaksis Kotrimoksazol.'
  },
  {
    keys: ['basiliximab', 'simulect'],
    strengths: ['Vial 20 mg Serbuk Injeksi'],
    defaultStrength: 'Vial 20 mg Serbuk Injeksi',
    defaultFrequency: '2 Dosis (Hari Operasi & Hari ke-4 Pasca Transplantasi)',
    defaultTiming: 'Bebas',
    preferredTimes: ['07:00'],
    clinicalReason: 'Dosis 1 diberikan dalam 2 jam sebelum operasi transplantasi ginjal, dosis 2 pada hari ke-4. Siapkan selalu Epinefrin (risiko anafilaksis).'
  },
  {
    keys: ['busulfan', 'myleran', 'busilvex'],
    strengths: ['2 mg Tablet', 'Vial 60 mg/10 mL Konsentrat Infus'],
    defaultStrength: 'Vial 60 mg/10 mL Konsentrat Infus',
    defaultFrequency: 'Tiap 6 Jam selama 4 Hari (Total 16 Dosis)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '12:00', '18:00', '24:00'],
    clinicalReason: 'PROFILAKSIS KEJANG ADALAH WAJIB (mulai antikonvulsan 12 jam sebelum dosis 1). Pantau ketat bilirubin serial (risiko VOD hepar).'
  },
  {
    keys: ['cisapride', 'acpulsif'],
    strengths: ['5 mg Tablet', '10 mg Tablet'],
    defaultStrength: '5 mg Tablet',
    defaultFrequency: '3x Sehari (Sebelum Makan)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:45', '11:45', '17:45'],
    clinicalReason: 'Diminum 15 menit sebelum makan. WAJIB REKAM EKG BASELINE (pantau QTc <450 ms). Kontraindikasi bersamaan dengan makrolida/azol.'
  },
  {
    keys: ['dacarbazine', 'dtic', 'dacin'],
    strengths: ['Vial 200 mg Serbuk Injeksi'],
    defaultStrength: 'Vial 200 mg Serbuk Injeksi',
    defaultFrequency: 'Hari ke-1 dan ke-15 (Siklus 28 Hari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Komponen rejimen ABVD Limfoma Hodgkin. Wajib premedikasi antiemetik kuat. Lindungi botol & selang infus dari cahaya matahari langsung.'
  },
  {
    keys: ['daclatasvir', 'daklinza'],
    strengths: ['60 mg Tablet'],
    defaultStrength: '60 mg Tablet',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Wajib dikombinasikan dengan Sofosbuvir 400 mg. Skrining serologi Hepatitis B wajib sebelum memulai terapi (risiko reaktivasi HBV fatal).'
  },
  {
    keys: ['dactinomycin', 'actinomycin d', 'cosmegen'],
    strengths: ['Vial 0.5 mg Serbuk Injeksi'],
    defaultStrength: 'Vial 0.5 mg Serbuk Injeksi',
    defaultFrequency: '1x Sehari selama 5 Hari berturut-turut',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'VESIKAN KUAT: Berikan melalui infus intravena yang mengalir bebas (side-arm). Pantau ketat sariawan mulut (stomatitis) dan radiation recall.'
  },
  {
    keys: ['daunorubicin', 'daunocin', 'cerubidine'],
    strengths: ['Vial 20 mg Serbuk Injeksi'],
    defaultStrength: 'Vial 20 mg Serbuk Injeksi',
    defaultFrequency: '1x Sehari (Hari 1, 2, dan 3 Induksi AML)',
    defaultTiming: 'Bebas',
    preferredTimes: ['09:00'],
    clinicalReason: 'KARDIOTOKSISITAS KUMULATIF: Batas maksimal seumur hidup 550 mg/m2. Wajib periksa fraksi ejeksi LVEF baseline. Urin berwarna kemerahan adalah normal.'
  },
  {
    keys: ['deferiprone', 'ferriprox'],
    strengths: ['500 mg Tablet', '100 mg/mL Larutan Oral'],
    defaultStrength: '500 mg Tablet',
    defaultFrequency: '3x Sehari (Bersama Makanan)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['07:00', '12:00', '19:00'],
    clinicalReason: 'PEMERIKSAAN HITUNG NEUTROFIL MUTLAK (ANC) WAJIB SETIAP MINGGU untuk skrining dini agranulositosis fatal. Diminum bersama makanan.'
  },
  {
    keys: ['deferoxamine', 'desferal', 'desferrioxamine'],
    strengths: ['Vial 500 mg Serbuk Injeksi'],
    defaultStrength: 'Vial 500 mg Serbuk Injeksi',
    defaultFrequency: 'Infus SC Lambat 8-12 Jam per Malam (5-7x Seminggu)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Diberikan melalui infus subkutan lambat menggunakan pompa suntik portabel. Dilarang bolus IV cepat. Urin merah anggur adalah tanda eliminasi besi.'
  },
  {
    keys: ['delamanid', 'deltyba'],
    strengths: ['50 mg Tablet'],
    defaultStrength: '50 mg Tablet',
    defaultFrequency: '2x Sehari (Bersama Makanan)',
    defaultTiming: 'Bersama Makanan',
    preferredTimes: ['07:00', '19:00'],
    clinicalReason: 'WAJIB DIMINUM BERSAMA MAKANAN LENGKAP untuk absorpsi optimal. Rekam EKG bulanan untuk memantau interval QTc (hindari kombinasi pemanjang QTc).'
  },
  {
    keys: ['desmopressin', 'minirin', 'octostim'],
    strengths: ['0.1 mg Tablet', '0.2 mg Tablet', 'Melt 120 mcg', 'Semprot Hidung 0.1 mg/mL'],
    defaultStrength: '0.2 mg Tablet',
    defaultFrequency: '1x Sehari (1 Jam Sebelum Tidur Malam)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'BATASI ASUPAN CAIRAN KETAT (1 jam sebelum tidur hingga 8 jam sesudahnya) untuk mencegah intoksikasi air dan kejang hiponatremik berat.'
  },
  {
    keys: ['desogestrel', 'cerazette'],
    strengths: ['75 mcg Tablet'],
    defaultStrength: '75 mcg Tablet',
    defaultFrequency: '1x Sehari (Jam Sama Persis)',
    defaultTiming: 'Bebas',
    preferredTimes: ['20:00'],
    clinicalReason: 'Minum pada jam yang sama setiap hari tanpa hari libur (28 tablet/blister). Sangat aman bagi ibu menyusui karena tidak mengganggu volume ASI.'
  },
  {
    keys: ['desoximetasone', 'inerson', 'esperson'],
    strengths: ['0.25% Krim', '0.25% Salep'],
    defaultStrength: '0.25% Krim',
    defaultFrequency: '1-2x Sehari (Oles Tipis)',
    defaultTiming: 'Bebas',
    preferredTimes: ['07:00', '19:00'],
    clinicalReason: 'Kortikosteroid poten tinggi (Kelas II). Oles tipis pada lesi plak tebal. Jangan dioleskan di wajah atau lipatan; jangan dibebat perban oklusi.'
  },
  {
    keys: ['diethylcarbamazine', 'hetrazan', 'filarzan', 'dec'],
    strengths: ['100 mg Tablet'],
    defaultStrength: '100 mg Tablet',
    defaultFrequency: '3x Sehari (Sesudah Makan)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['07:30', '12:30', '19:30'],
    clinicalReason: 'Baku emas filariasis limfatik (kaki gajah). Wajib diminum sesudah makan. Gejala mirip flu/demam 1-2 hari pertama merupakan reaksi lisis parasit.'
  },
  {
    keys: ['diflucortolone', 'nerisona'],
    strengths: ['0.1% Krim', '0.1% Salep Lemak'],
    defaultStrength: '0.1% Krim',
    defaultFrequency: '1-2x Sehari (Oles Tipis)',
    defaultTiming: 'Bebas',
    preferredTimes: ['07:00', '19:00'],
    clinicalReason: 'Kortikosteroid poten. Oles tipis pada area dermatosis meradang; sediaan salep berlemak sangat cocok untuk lesi kulit kering bersisik kronis.'
  },
  {
    keys: ['edetate disodium', 'endrate', 'sodium edetate', 'edta disodium'],
    strengths: ['Vial 150 mg/mL Injeksi'],
    defaultStrength: 'Vial 150 mg/mL Injeksi',
    defaultFrequency: 'Infus IV Lambat selama Minimal 3-4 Jam',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Darurat krisis hiperkalsemia. INFUS WAJIB SANGAT LAMBAT (minimal 3-4 jam) dengan monitor EKG kontinu dan sedia Kalsium Glukonat di samping ranjang.'
  },
  {
    keys: ['clodronate', 'bonefos'],
    strengths: ['400 mg Kapsul', 'Ampul 300 mg/5 mL Injeksi'],
    defaultStrength: '400 mg Kapsul',
    defaultFrequency: '1x Sehari Pagi (Perut Kosong)',
    defaultTiming: 'Perut Kosong',
    preferredTimes: ['06:00'],
    clinicalReason: 'Diminum pagi hari saat perut kosong dengan segelas penuh air putih biasa. PASIEN WAJIB TETAP TEGAK MINIMAL 60 MENIT (cegah iritasi esofagus).'
  },
  {
    keys: ['dimercaptosuccinic acid', 'dmsa', 'succimer', 'chemet'],
    strengths: ['100 mg Kapsul'],
    defaultStrength: '100 mg Kapsul',
    defaultFrequency: 'Tiap 8 Jam (5 Hari Pertama)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '14:00', '22:00'],
    clinicalReason: 'Antidotum oral keracunan timbal (Pb >45 mcg/dL). Kapsul dapat dibuka dan butiran dicampur ke makanan lunak untuk anak. Bau belerang adalah wajar.'
  },
  {
    keys: ['docetaxel', 'taxotere', 'brexel'],
    strengths: ['Vial 20 mg Konsentrat Infus', 'Vial 80 mg Konsentrat Infus'],
    defaultStrength: 'Vial 80 mg Konsentrat Infus',
    defaultFrequency: 'Infus IV 60 Menit Tiap 3 Minggu (Siklus 21 Hari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'PREMEDIKASI DEKSAMETASON WAJIB (mulai 1 hari sebelum kemoterapi) untuk mencegah retensi cairan masif (efusi pleura/asites) dan syok anafilaksis.'
  },
  {
    keys: ['dutasteride', 'avodart', 'duodart'],
    strengths: ['0.5 mg Kapsul Lunak'],
    defaultStrength: '0.5 mg Kapsul Lunak',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['20:00'],
    clinicalReason: 'Dual inhibitor 5-alfa reduktase untuk BPH. Telan kapsul utuh, jangan dikunyah. Wanita hamil dilarang memegang kapsul bocor. Nilai PSA terkoreksi 2x lipat.'
  },
  {
    keys: ['exemestane', 'aromasin'],
    strengths: ['25 mg Tablet Salut Selaput'],
    defaultStrength: '25 mg Tablet Salut Selaput',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00'],
    clinicalReason: 'Inaktivator aromatase kanker payudara pasca menopause. Wajib diminum sesudah makan untuk meningkatkan absorpsi bioavailabilitas oral hingga 40%.'
  },
  {
    keys: ['eltrombopag', 'revolade', 'promacta'],
    strengths: ['25 mg Tablet', '50 mg Tablet'],
    defaultStrength: '25 mg Tablet',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00'],
    clinicalReason: 'Agonis reseptor TPO oral ITP kronis & SAA. Minum saat perut kosong. Beri jeda 2 jam sebelum atau 4 jam sesudah konsumsi susu, kalsium, antasida, atau besi.'
  },
  {
    keys: ['epirubicin', 'pharmorubicin'],
    strengths: ['10 mg Vial Injeksi', '50 mg Vial Injeksi'],
    defaultStrength: '50 mg Vial Injeksi',
    defaultFrequency: 'Infus IV Tiap 3 Minggu (Siklus 21 Hari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antrasiklin sitotoksik kanker payudara & lambung. Infus IV lambat bebas hambatan 15-20 menit. Batas kumulatif seumur hidup 900 mg/m2. Urin merah 1-2 hari.'
  },
  {
    keys: ['eribulin', 'halaven'],
    strengths: ['1 mg / 2 mL Vial Injeksi'],
    defaultStrength: '1 mg / 2 mL Vial Injeksi',
    defaultFrequency: 'Injeksi IV Hari 1 dan 8 Tiap 21 Hari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Inhibitor mikrotubulus halikondrin B kanker payudara metastatik. Suntik IV bolus 2-5 menit. Tunda jika ANC <1000/mcL. Rekam EKG monitor interval QTc.'
  },
  {
    keys: ['epoetin alfa', 'epoetin beta', 'erythropoietin', 'hemapo', 'recormon', 'eprex'],
    strengths: ['2000 IU Prefilled Syringe', '3000 IU Prefilled Syringe', '4000 IU Prefilled Syringe'],
    defaultStrength: '2000 IU Prefilled Syringe',
    defaultFrequency: '3x Seminggu (Senin-Rabu-Jumat)',
    defaultTiming: 'Bebas',
    preferredTimes: ['10:00'],
    clinicalReason: 'Hormon ESA anemia gagal ginjal kronis hemodialisis. Target Hb hanya 10-11.5 g/dL (jangan >12 g/dL - risiko stroke/infark). Pastikan TSAT >=20% dan Feritin >=100.'
  },
  {
    keys: ['erlotinib', 'tarceva'],
    strengths: ['100 mg Tablet', '150 mg Tablet'],
    defaultStrength: '150 mg Tablet',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00'],
    clinicalReason: 'TKI EGFR kanker paru NSCLC mutasi sensitif. Wajib diminum saat perut kosong. Hindari obat penekan asam PPI (menurunkan absorpsi >60%). Anjurkan berhenti merokok.'
  },
  {
    keys: ['etoposide', 'lastet', 'posid'],
    strengths: ['50 mg Kapsul', '100 mg / 5 mL Ampul Injeksi'],
    defaultStrength: '100 mg / 5 mL Ampul Injeksi',
    defaultFrequency: 'Infus IV Tiap 3-4 Minggu (Siklus)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Inhibitor topoisomerase II kanker testis & SCLC. Infus IV lambat minimal 30-60 menit (dilarang bolus cepat - risiko kolaps kardiovaskular hipotensi fatal).'
  },
  {
    keys: ['everolimus', 'afinitor', 'certican'],
    strengths: ['0.5 mg Tablet', '5 mg Tablet', '10 mg Tablet'],
    defaultStrength: '10 mg Tablet',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Inhibitor mTORC1 kanker payudara & transplantasi. Telan utuh, jangan dikunyah. Hindari jeruk bali merah (grapefruit). Profilaksis obat kumur steroid cegah stomatitis.'
  },
  {
    keys: ['filgrastim', 'neupogen', 'leucogen', 'granocyte'],
    strengths: ['300 mcg / 0.5 mL Prefilled Syringe'],
    defaultStrength: '300 mcg / 0.5 mL Prefilled Syringe',
    defaultFrequency: '1x Sehari Subkutan',
    defaultTiming: 'Bebas',
    preferredTimes: ['10:00'],
    clinicalReason: 'G-CSF pencegah neutropenia febril kemoterapi. Suntik subkutan minimal 24 jam SETELAH kemoterapi selesai. Hentikan jika ANC >10,000/mcL. Simpan kulkas 2-8°C.'
  },
  {
    keys: ['fludarabine', 'fludara'],
    strengths: ['50 mg Vial Serbuk Injeksi', '10 mg Tablet'],
    defaultStrength: '50 mg Vial Serbuk Injeksi',
    defaultFrequency: 'Infus IV Hari 1-3 Tiap 28 Hari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Analog purin leukemia CLL rejimen FCR. Infus IV 30 menit. Profilaksis wajib Kotrimoksazol (PJP) & Asiklovir. Transfusi darah wajib diiradiasi gamma cegah TA-GvHD.'
  },
  {
    keys: ['fluorouracil', '5-fu', 'curacil', 'efudix'],
    strengths: ['500 mg / 10 mL Ampul Injeksi', 'Krim Topikal 5%'],
    defaultStrength: '500 mg / 10 mL Ampul Injeksi',
    defaultFrequency: 'Infus IV Kontinu 48 Jam Tiap 2 Minggu',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antimetabolit fluoropirimidin pilar kanker kolorektal rejimen FOLFOX/FOLFIRI. Skrining defisiensi DPD. Waspadai Hand-Foot Syndrome, diare, dan angina vasospasme.'
  },
  {
    keys: ['fulvestrant', 'faslodex'],
    strengths: ['250 mg / 5 mL Prefilled Syringe'],
    defaultStrength: '250 mg / 5 mL Prefilled Syringe',
    defaultFrequency: '2 Suntikan IM Gluteus Tiap Bulan (28 Hari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'SERD murni kanker payudara metastatik HR+. Hanya suntikan IM pada kedua belah otot bokong (2x 5 mL). Suntikkan sangat perlahan (1-2 menit/spuit) karena berbasis minyak.'
  },
  {
    keys: ['factor ix', 'octanine', 'koate-dvi', 'immunine'],
    strengths: ['500 IU Vial Serbuk Injeksi', '1000 IU Vial Serbuk Injeksi'],
    defaultStrength: '500 IU Vial Serbuk Injeksi',
    defaultFrequency: 'Infus IV Sesuai Kebutuhan Hemostasis',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Konsentrat faktor IX hemofilia B. Infus IV lambat maksimal 2-3 mL/menit. Pantau titer antibodi inhibitor faktor IX berkala dan sediakan obat darurat anafilaksis.'
  },
  {
    keys: ['prothrombin complex', '4f-pcc', 'cofact', 'octaplex', 'kcentra'],
    strengths: ['500 IU Vial Serbuk Injeksi'],
    defaultStrength: '500 IU Vial Serbuk Injeksi',
    defaultFrequency: 'Infus IV Dosis Tunggal Darurat',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Pembalikan darurat warfarin saat perdarahan mengancam jiwa. Dosis berdasarkan INR & BB. Berikan bersama Phytomenadione (Vit K1) IV. Pantau risiko tromboemboli.'
  },
  {
    keys: ['factor viia', 'novoseven', 'eptacog alfa'],
    strengths: ['1 mg (50 KUI) Vial', '2 mg (100 KUI) Vial'],
    defaultStrength: '1 mg (50 KUI) Vial',
    defaultFrequency: 'Injeksi IV Bolus Tiap 2-3 Jam',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Bypass agent hemofilia dengan inhibitor & perdarahan postpartum masif. Hanya disuntikkan secara IV bolus cepat 2-5 menit tanpa campuran cairan infus lain.'
  },
  {
    keys: ['factor viii', 'antihemophilic factor', 'haemoctin', 'koate'],
    strengths: ['250 IU Vial', '500 IU Vial', '1000 IU Vial'],
    defaultStrength: '500 IU Vial',
    defaultFrequency: 'Infus IV Sesuai Protokol / Profilaksis 3x Seminggu',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Faktor VIII hemofilia A. Infus IV lambat 2-4 mL/menit. Profilaksis rutin mencegah artropati sendi anak. Skrining antibodi inhibitor faktor VIII (Bethesda) berkala.'
  },
  {
    keys: ['feracrylum', 'hemolok'],
    strengths: ['1% Larutan Botol 100 mL', '1% Gel Tube 15 g'],
    defaultStrength: '1% Larutan Botol 100 mL',
    defaultFrequency: 'Aplikasi Topikal Saat Perdarahan',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Hemostatik topikal & antiseptik perdarahan luka bedah/trauma. Basahi kasa dan tekan pada luka selama 1-3 menit. HANYA UNTUK TOPIKAL LUAR, DILARANG INTRAVENA.'
  },
  {
    keys: ['ephedrine', 'efedrin'],
    strengths: ['50 mg / mL Ampul Injeksi'],
    defaultStrength: '50 mg / mL Ampul Injeksi',
    defaultFrequency: 'Injeksi IV Bolus Titrasi Saat Hipotensi',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Vasopresor simpatomimetik hipotensi spinal anestesi. WAJIB DIENCERKAN menjadi 5 mg/mL (1 ampul + 9 mL NaCl 0.9%). Berikan bolus 1-2 mL (5-10 mg). Waspadai takifilaksis.'
  },
  {
    keys: ['phenylephrine', 'cendo efrisel', 'vazculep'],
    strengths: ['10 mg / mL Ampul Injeksi', '10% Tetes Mata'],
    defaultStrength: '10 mg / mL Ampul Injeksi',
    defaultFrequency: 'Injeksi IV / Tetes Mata',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Agonis alfa-1 vasopresor syok & midriatikum mata. Wajib diencerkan sebelum bolus IV (100 mcg/mL). Infus kontinu berikan via vena sentral. Waspadai bradikardia refleks.'
  },
  {
    keys: ['entecavir', 'baraclude'],
    strengths: ['0.5 mg Tablet', '1.0 mg Tablet'],
    defaultStrength: '0.5 mg Tablet',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00'],
    clinicalReason: 'Antivirus HBV polimerase inhibitor Hepatitis B kronis. Wajib diminum saat perut kosong (2 jam sebelum/sesudah makan). JANGAN PERNAH BERHENTI MENDADAK (hepatitis flare).'
  },
  {
    keys: ['phenoxymethylpenicillin', 'penicillin v', 'fenoksimetilpenisilin', 'ospen'],
    strengths: ['125 mg Tablet', '250 mg Tablet', '500 mg Tablet'],
    defaultStrength: '500 mg Tablet',
    defaultFrequency: '4x Sehari (Tiap 6 Jam)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00', '12:00', '18:00', '24:00'],
    clinicalReason: 'Penisilin oral baku emas faringitis streptokokus & pencegahan demam rematik. Minum saat perut kosong dengan air putih. Terapi faringitis WAJIB 10 HARI PENUH.'
  },
  {
    keys: ['fosfomycin', 'monuril', 'fosfocil'],
    strengths: ['3 g Sachet Granul Oral'],
    defaultStrength: '3 g Sachet Granul Oral',
    defaultFrequency: 'Dosis Tunggal (1 Kali Saja)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['22:00'],
    clinicalReason: 'Antibiotik bakterisida ISK sistitis akut wanita dosis tunggal. Larutkan dalam 1/2 gelas air dingin. Minum malam hari sebelum tidur sesudah buang air kecil sampai tuntas.'
  },
  {
    keys: ['framycetin', 'sofra-tulle', 'sofracort'],
    strengths: ['1% Kasa Pembalut Steril (10x10 cm)'],
    defaultStrength: '1% Kasa Pembalut Steril (10x10 cm)',
    defaultFrequency: 'Ganti Perban Tiap 24-72 Jam',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Kasa steril antibiotik aminoglikosida luka bakar & trauma. Gunakan pinset steril, tempelkan menutupi luka bersih lalu lapisi kasa kering. Mencegah perban lengket.'
  },
  {
    keys: ['etanercept', 'enbrel'],
    strengths: ['25 mg Prefilled Syringe', '50 mg Prefilled Pen'],
    defaultStrength: '50 mg Prefilled Pen',
    defaultFrequency: '1x Seminggu Subkutan',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Anti-TNF biologis artritis reumatoid & psoriasis. Suntik subkutan seminggu sekali pada hari yang sama. Keluarkan kulkas 30 menit pra-suntik. Skrining TB Mantoux wajib negatif.'
  },
  {
    keys: ['conjugated estrogens', 'premarin'],
    strengths: ['0.3 mg Tablet', '0.625 mg Tablet', 'Krim Vagina'],
    defaultStrength: '0.625 mg Tablet',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Estrogen sulih hormon menopause. Pada wanita dengan rahim utuh, WAJIB DITAMBAHKAN PROGESTIN (misal Medroksiprogesteron) minimal 12-14 hari/bulan untuk cegah kanker endometrium.'
  },
  {
    keys: ['etonogestrel', 'implanon', 'nexplanon'],
    strengths: ['68 mg Batang Subdermal'],
    defaultStrength: '68 mg Batang Subdermal',
    defaultFrequency: '1 Implan Tiap 3 Tahun',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Susuk KB progestin subdermal 3 tahun efektivitas >99%. Sangat aman untuk ibu menyusui (tidak ganggu ASI). Dipasang oleh nakes terlatih pada lengan atas non-dominan.'
  },
  {
    keys: ['fenoterol', 'berotec', 'berodual'],
    strengths: ['100 mcg MDI Inhaler', '0.1% Larutan Inhalasi'],
    defaultStrength: '100 mcg MDI Inhaler',
    defaultFrequency: '1-2 Semprotan Saat Sesak Napas Akut',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'SABA pelega sesak napas akut asma & PPOK. Hirup dalam-dalam dan tahan napas 10 detik. Jika butuh inhaler >2-3x seminggu, kontrol ulang ke dokter untuk tambah kontroler.'
  },
  {
    keys: ['fludrocortisone', 'florinef'],
    strengths: ['0.1 mg Tablet'],
    defaultStrength: '0.1 mg Tablet',
    defaultFrequency: '1x Sehari Pagi Hari',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['07:00'],
    clinicalReason: 'Mineralokortikoid poten penyakit Addison. Diminum pagi hari bersama sarapan untuk jaga tensi dan kadar garam darah. Pantau tensi harian dan kadar kalium darah.'
  },
  {
    keys: ['fluphenazine decanoate', 'sikzonoate', 'prolixin'],
    strengths: ['25 mg / mL Ampul Depo'],
    defaultStrength: '25 mg / mL Ampul Depo',
    defaultFrequency: 'Injeksi IM Tiap 2-4 Minggu',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antipsikotik tipikal long-acting skizofrenia kronis. Hanya suntikan IM dalam pada otot bokong gluteus. Waspadai gejala ekstrapiramidal kaku otot (sediakan triheksifenidil).'
  },
  {
    keys: ['fluorometholone', 'flamar', 'cendo posop', 'fml'],
    strengths: ['0.1% Tetes Mata Suspensi'],
    defaultStrength: '0.1% Tetes Mata Suspensi',
    defaultFrequency: '2-4x Sehari (Tiap 6-8 Jam)',
    defaultTiming: 'Bebas',
    preferredTimes: ['06:00', '12:00', '18:00', '22:00'],
    clinicalReason: 'Kortikosteroid tetes mata pasca bedah dengan risiko lonjakan tekanan bola mata (TIO) minimal. Kocok botol sebelum dipakai dan tekan sudut hidung selama 1-2 menit.'
  },
  {
    keys: ['fluocinolone', 'synalar', 'kalcinol'],
    strengths: ['0.025% Krim', '0.025% Salep'],
    defaultStrength: '0.025% Krim',
    defaultFrequency: '2x Sehari Pagi dan Malam',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Kortikosteroid topikal poten dermatosis. Oleskan tipis pada lesi 2x/hari. Jangan gunakan di wajah, lipatan selangkangan, atau area popok. Batasi maksimal 2-4 minggu.'
  },
  {
    keys: ['fluticasone propionate', 'flixotide', 'cutivate', 'seretide'],
    strengths: ['50 mcg Inhaler', '125 mcg Inhaler', '0.05% Krim Topikal'],
    defaultStrength: '125 mcg Inhaler',
    defaultFrequency: '2x Sehari (Pagi dan Malam)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Kortikosteroid inhalasi kontroler asma. Hirup teratur tiap hari. WAJIB BERKUMUR DAN MEMBUANG AIRNYA sehabis menghirup obat untuk mencegah sariawan jamur dan suara serak.'
  },
  {
    keys: ['fluvoxamine', 'luvox'],
    strengths: ['50 mg Tablet', '100 mg Tablet'],
    defaultStrength: '50 mg Tablet',
    defaultFrequency: '1x Sehari Sebelum Tidur Malam',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'SSRI baku emas OCD & depresi. Minum malam sebelum tidur. Kurangi minum kopi/teh (inhibisi CYP1A2 menaikkan efek kafein 5x lipat). Taper-off bertahap saat penghentian.'
  },
  {
    keys: ['ganciclovir', 'cymevene'],
    strengths: ['500 mg Vial Serbuk Injeksi'],
    defaultStrength: '500 mg Vial Serbuk Injeksi',
    defaultFrequency: 'Infus IV Tiap 12 Jam (Induksi) / 1x Sehari (Rumatan)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Antivirus CMV retinitis & transplantasi. Hanya infus lambat minimal 60 menit (dilarang bolus IV). Monitor neutrofil dan kreatinin serial.'
  },
  {
    keys: ['gefitinib', 'iressa'],
    strengths: ['250 mg Tablet Salut Selaput'],
    defaultStrength: '250 mg Tablet Salut Selaput',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'TKI EGFR kanker paru NSCLC. Telan utuh pada jam yang sama. Hindari konsumsi bersama PPI (Omeprazole) karena menurunkan absorpsi hingga >40%.'
  },
  {
    keys: ['gemcitabine', 'gemzar'],
    strengths: ['200 mg Vial Serbuk Injeksi', '1 g (1000 mg) Vial Serbuk Injeksi'],
    defaultStrength: '1 g (1000 mg) Vial Serbuk Injeksi',
    defaultFrequency: 'Infus IV 30 Menit Sekali Seminggu (Siklus)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antimetabolit pirimidin kanker pankreas & paru. DURASI INFUS MAKSIMAL 30-60 MENIT (memperpanjang durasi infus melipatgandakan toksisitas mielosupresi).'
  },
  {
    keys: ['glycopyrronium', 'seebri', 'ultibro'],
    strengths: ['50 mcg Kapsul Inhalasi'],
    defaultStrength: '50 mcg Kapsul Inhalasi',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'LAMA bronkodilator PPOK 24 jam. Kapsul KHUSUS DIHIRUP BREEZHALER (dilarang ditelan). Bukan pelega sesak akut. Selalu sediakan SABA terpisah.'
  },
  {
    keys: ['glipizide', 'glucotrol', 'minidiab'],
    strengths: ['5 mg Tablet', '10 mg Tablet XL'],
    defaultStrength: '5 mg Tablet',
    defaultFrequency: '1x Sehari Pagi Hari',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:30'],
    clinicalReason: 'Sulfonilurea DM tipe 2. WAJIB DIMINUM TEPAT 30 MENIT SEBELUM SARAPAN. Jangan melewatkan waktu makan setelah minum obat untuk mencegah hipoglikemia.'
  },
  {
    keys: ['glycerol', 'gliserin'],
    strengths: ['Supositoria Dewasa 2 g', 'Supositoria Anak 1 g', 'Enema 5 mL', 'Larutan 50% Oral'],
    defaultStrength: 'Supositoria Dewasa 2 g',
    defaultFrequency: '1 Aplikasi Rektal Saat Konstipasi Akut',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Laksatif osmotik rektal konstipasi. Masukkan sedalam mungkin ke dubur dan tahan 15-30 menit. Tidak untuk pemakaian rutin harian berkepanjangan.'
  },
  {
    keys: ['goserelin', 'zoladex'],
    strengths: ['3.6 mg Implan Depo 28 Hari', '10.8 mg Implan Depo 12 Minggu'],
    defaultStrength: '3.6 mg Implan Depo 28 Hari',
    defaultFrequency: '1 Implan Subkutan Abdomen Tiap 28 Hari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Agonis LHRH kanker prostat & payudara. Hanya suntik subkutan dinding perut anterior (bawah pusar). Pada kanker prostat, beri antiandrogen pendamping cegah tumor flare.'
  },
  {
    keys: ['hepatitis b immunoglobulin', 'hbig', 'hyperhep', 'hepabig'],
    strengths: ['0.5 mL Spuit Neonatus', '100 IU / mL Vial', '200 IU / mL Vial'],
    defaultStrength: '0.5 mL Spuit Neonatus',
    defaultFrequency: 'Dosis Tunggal Intramuskular Segera',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Imunoglobulin anti-HBs pasif. SUNTIKKAN IM DALAM 12 JAM PERTAMA PASCA LAHIR PADA PAHA BERSEBERANGAN DENGAN VAKSIN HEP B. Dilarang intravena.'
  },
  {
    keys: ['hydroxyurea', 'hydrea', 'cytodrox'],
    strengths: ['500 mg Kapsul'],
    defaultStrength: '500 mg Kapsul',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antineoplastik ribonukleotida reduktase CML & anemia sel sabit. Telan utuh, jangan dikunyah. PETUGAS WAJIB PAKAI SARUNG TANGAN saat memegang kapsul. Banyak minum air.'
  },
  {
    keys: ['homatropine', 'homatropin'],
    strengths: ['2% Tetes Mata'],
    defaultStrength: '2% Tetes Mata',
    defaultFrequency: '2-3x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '16:00', '22:00'],
    clinicalReason: 'Midriatikum & sikloplegik uveitis anterior. Teteskan 1 tetes, lalu TEKAN SUDUT MATA DALAM (OKLUSI PUNCTUM) 1-2 MENIT cegah absorpsi sistemik. Mata akan silau 1-3 hari.'
  },
  {
    keys: ['insulin nph', 'isophane', 'insulatard', 'humulin n'],
    strengths: ['100 IU / mL Cartridge Pen 3 mL', '100 IU / mL Vial 10 mL'],
    defaultStrength: '100 IU / mL Cartridge Pen 3 mL',
    defaultFrequency: '1x Sehari Malam Sebelum Tidur (atau 2x Sehari)',
    defaultTiming: 'Bebas',
    preferredTimes: ['21:00'],
    clinicalReason: 'Insulin basal kerja menengah keruh. PUTAR/HOMOGENKAN PEN 10-20 KALI HINGGA KERUH PUTIH MERATA SEBELUM DISUNTIKKAN. Hanya subkutan, DILARANG INTRAVENA.'
  },
  {
    keys: ['tetanus immunoglobulin', 'htig', 'tetagam', 'hypertet'],
    strengths: ['250 IU Prefilled Syringe'],
    defaultStrength: '250 IU Prefilled Syringe',
    defaultFrequency: 'Dosis Tunggal Intramuskular',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antitoksin tetanus manusia imunisasi pasif luka kotor. HANYA SUNTIKAN IM (DILARANG INTRAVENA). Berikan bersama vaksin Td pada lengan berseberangan.'
  },
  {
    keys: ['idarubicin', 'zavedos'],
    strengths: ['5 mg Vial Serbuk Injeksi', '10 mg Vial Serbuk Injeksi'],
    defaultStrength: '10 mg Vial Serbuk Injeksi',
    defaultFrequency: 'Injeksi IV Lambat Hari 1-3 (Rejimen 3+7 AML)',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Antrasiklin sitotoksik leukemia AML. Infus IV lambat 10-15 menit aliran lancar. BATAS KUMULATIF MAKSIMAL 137 mg/m2 (kardiotoksisitas fatal). Vesikan kuat: waspadai ekstravasasi.'
  },
  {
    keys: ['ifosfamide', 'holoxan'],
    strengths: ['1 g Vial Serbuk Injeksi', '2 g Vial Serbuk Injeksi'],
    defaultStrength: '1 g Vial Serbuk Injeksi',
    defaultFrequency: 'Infus IV Hari 1-5 Tiap 3-4 Minggu',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Agen alkilasi sarkoma & limfoma. WAJIB DIBERIKAN BERSAMA UROPROTEKTOR MESNA (minimal 60% dosis ifosfamid) dan hidrasi cairan masif minimal 2-3 L/hari cegah sistitis hemoragika.'
  },
  {
    keys: ['iloprost', 'ventavis', 'ilomedin'],
    strengths: ['10 mcg / mL Larutan Inhalasi', '20 mcg / mL Larutan Inhalasi'],
    defaultStrength: '10 mcg / mL Larutan Inhalasi',
    defaultFrequency: '6-9x Sehari Inhalasi Nebulizer Adaptif',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    clinicalReason: 'Analog PGI2 inhalasi hipertensi arteri pulmonal (PAH). Hirup via nebulizer I-neb AAD 6-9 kali sehari saat bangun. Jangan gunakan jika tekanan darah sistolik <85 mmHg (sinkop).'
  },
  {
    keys: ['imidafenacin', 'staybla', 'uritos'],
    strengths: ['0.1 mg Tablet'],
    defaultStrength: '0.1 mg Tablet',
    defaultFrequency: '2x Sehari Pagi dan Malam',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Antimuskarinik selektif M1/M3 overactive bladder (OAB). Diminum sesudah makan pagi dan malam. Efek mulut kering minimal. Kontraindikasi glaukoma sudut tertutup.'
  },
  {
    keys: ['imidapril', 'tanapress'],
    strengths: ['5 mg Tablet', '10 mg Tablet'],
    defaultStrength: '5 mg Tablet',
    defaultFrequency: '1x Sehari Pagi Hari',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:30'],
    clinicalReason: 'ACE inhibitor hipertensi & nefropati diabetik. WAJIB DIMINUM 15 MENIT SEBELUM SARAPAN PAGI (makanan menurunkan absorpsi). KONTRAINDIKASI MUTLAK PADA WANITA HAMIL.'
  },
  {
    keys: ['intravenous immunoglobulin', 'ivig', 'gamunex', 'privigen', 'intragam'],
    strengths: ['5% Larutan Infus (50 mL, 100 mL)', '10% Larutan Infus (50 mL, 100 mL, 200 mL)'],
    defaultStrength: '10% Larutan Infus 100 mL',
    defaultFrequency: 'Infus IV Lambat Sesuai Protokol Indikasi',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'IgG polivalen ITP, Kawasaki, GBS. HANYA INFUS IV LAMBAT dengan infusion pump. Mulai kecepatan rendah 0.5-1 mg/kgBB/menit. Hidrasi adekuat cegah nefropati osmotik & trombosis.'
  },
  {
    keys: ['indacaterol', 'onbrez'],
    strengths: ['150 mcg Kapsul Inhalasi', '300 mcg Kapsul Inhalasi'],
    defaultStrength: '150 mcg Kapsul Inhalasi',
    defaultFrequency: '1x Sehari',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Ultra-LABA bronkodilator PPOK onset 5 menit durasi 24 jam. Kapsul KHUSUS DIHIRUP BREEZHALER (dilarang ditelan). Batuk ringan sesaat pasca hirup normal. Bukan pelega sesak akut.'
  },
  {
    keys: ['irinotecan', 'campto'],
    strengths: ['40 mg / 2 mL Vial Injeksi', '100 mg / 5 mL Vial Injeksi'],
    defaultStrength: '100 mg / 5 mL Vial Injeksi',
    defaultFrequency: 'Infus IV 90 Menit Tiap 2 atau 3 Minggu',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'Topoisomerase I inhibitor kanker kolorektal FOLFIRI. Waspadai diare dini kolinergik (atasi dengan Atropin) dan diare lambat berat (SEGERA ATASI DENGAN LOPERAMID DOSIS TINGGI).'
  },
  {
    keys: ['itraconazole', 'sporanox', 'itzol', 'sporacid'],
    strengths: ['100 mg Kapsul'],
    defaultStrength: '100 mg Kapsul',
    defaultFrequency: '1-2x Sehari (atau Terapi Denyut)',
    defaultTiming: 'Sesudah Makan',
    preferredTimes: ['08:00', '20:00'],
    clinicalReason: 'Antijamur triazol spektrum luas mikosis sistemik & kuku. WAJIB DIMINUM SEGERA SESUDAH MAKAN LENGKAP. Hindari antasida/PPI. KONTRAINDIKASI BERSAMA SIMVASTATIN & PASIEN GAGAL JANTUNG.'
  },
  {
    keys: ['levonorgestrel iud', 'mirena'],
    strengths: ['52 mg Sistem Intrauterin'],
    defaultStrength: '52 mg Sistem Intrauterin',
    defaultFrequency: '1 AKDR Tiap 5-8 Tahun',
    defaultTiming: 'Bebas',
    preferredTimes: ['08:00'],
    clinicalReason: 'AKDR hormonal pelepasan lokal levonorgestrel 20 mcg/hari kontrasepsi 8 tahun & menoragia. Dipasang dokter spesialis kandungan. Sangat aman untuk ibu menyusui (tidak ganggu ASI).'
  },
  {
    keys: ['ivermectin', 'ivermax', 'scabimite tablet'],
    strengths: ['6 mg Tablet', '12 mg Tablet'],
    defaultStrength: '12 mg Tablet',
    defaultFrequency: 'Dosis Tunggal (Diulang 7-14 Hari Kemudian untuk Skabies)',
    defaultTiming: 'Sebelum Makan',
    preferredTimes: ['06:00'],
    clinicalReason: 'Antiparasit avermectin skabies krustosa & strongyloidiasis. WAJIB DIMINUM SAAT PERUT KOSONG DENGAN AIR PUTIH. Pada skabies, ulangi dosis ke-2 pada 7-14 hari kemudian dan obati kontak serumah.'
  },
{
    "keys": [
        "caffeine citrate",
        "peyona",
        "kafein sitrat"
    ],
    "strengths": [
        "20 mg / mL Ampul Injeksi (setara 10 mg/mL kafein basa)"
    ],
    "defaultStrength": "20 mg / mL Ampul Injeksi",
    "defaultFrequency": "Infus IV Lambat 30 Menit Sekali Sehari",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00"
    ],
    "clinicalReason": "Psikostimulan apnea prematuritas bayi prematur. 20 mg kafein sitrat setara 10 mg kafein basa. Loading 20 mg/kgBB lalu rumatan 5 mg/kgBB/hari. Pantau HR (tahan jika >180 bpm)."
},
{
    "keys": [
        "calamine",
        "caladine",
        "kalamin"
    ],
    "strengths": [
        "Losio 60 mL Botol",
        "Losio 95 mL Botol"
    ],
    "defaultStrength": "Losio 60 mL Botol",
    "defaultFrequency": "2-4x Sehari Dioleskan Tipis",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00",
        "12:00",
        "16:00",
        "20:00"
    ],
    "clinicalReason": "Antipruritus topikal biang keringat & gigitan serangga. Kocok botol sebelum dioleskan pada kulit bersih dan kering. Dilarang pada luka terbuka berdarah atau selaput lendir."
},
{
    "keys": [
        "potassium aspartate",
        "aspar-k",
        "kalium aspartat"
    ],
    "strengths": [
        "300 mg Tablet Salut Selaput (setara 1.8 mEq K+)"
    ],
    "defaultStrength": "300 mg Tablet Salut Selaput",
    "defaultFrequency": "3x Sehari 1-3 Tablet",
    "defaultTiming": "Sesudah Makan",
    "preferredTimes": [
        "08:00",
        "13:00",
        "19:00"
    ],
    "clinicalReason": "Suplemen kalium organik hipokalemia. WAJIB DIMINUM SESUDAH MAKAN dengan segelas air penuh. Jangan berbaring minimal 30 menit pasca minum obat. Pantau kalium serum berkala."
},
{
    "keys": [
        "calcitriol",
        "rocaltrol",
        "kolkatriol"
    ],
    "strengths": [
        "0.25 mcg Kapsul Lunak",
        "0.5 mcg Kapsul Lunak"
    ],
    "defaultStrength": "0.25 mcg Kapsul Lunak",
    "defaultFrequency": "1x Sehari Pagi Hari",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "07:00"
    ],
    "clinicalReason": "Metabolit aktif vitamin D3 osteodistrofi ginjal hemodialisis. Langsung aktif tanpa hidroksilasi ginjal. Telan utuh pagi hari. Pantau kalsium dan fosfat serum serial (cegah hiperkalsemia)."
},
{
    "keys": [
        "calcium folinate",
        "leucovorin",
        "folinat"
    ],
    "strengths": [
        "15 mg Tablet",
        "50 mg Vial Serbuk Injeksi"
    ],
    "defaultStrength": "15 mg Tablet",
    "defaultFrequency": "Tiap 6 Jam Sesuai Protokol Penyelamat MTX",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "06:00",
        "12:00",
        "18:00",
        "24:00"
    ],
    "clinicalReason": "Penyelamat metotreksat dosis tinggi (MTX rescue) & modulasi 5-FU. HANYA IV/IM/ORAL (KONTRAINDIKASI MUTLAK INTRAREKAL KARENA FATAL). Wajib tepat waktu sesuai jadwal serial."
},
{
    "keys": [
        "calcium polystyrene sulfonate",
        "kalitake"
    ],
    "strengths": [
        "5 g Sachet Serbuk"
    ],
    "defaultStrength": "5 g Sachet Serbuk",
    "defaultFrequency": "3x Sehari 1 Sachet (15 g/hari)",
    "defaultTiming": "Sesudah Makan",
    "preferredTimes": [
        "08:00",
        "13:00",
        "19:00"
    ],
    "clinicalReason": "Resin pengikat kalium hiperkalemia gagal ginjal. Larutkan dalam 30-50 mL air putih. DILARANG DICAMPUR JUS BUAH / SORBITOL (nekrosis usus fatal). Beri jarak 2-3 jam dari obat lain."
},
{
    "keys": [
        "carbimazole",
        "neo-mercazole",
        "karbimazol"
    ],
    "strengths": [
        "5 mg Tablet"
    ],
    "defaultStrength": "5 mg Tablet",
    "defaultFrequency": "3x Sehari (Inisiasi) / 1x Sehari Pagi (Pemeliharaan)",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00",
        "14:00",
        "20:00"
    ],
    "clinicalReason": "Antitiroid tionamida hipertiroidisme Graves. Prodrug tiamazol. Telan teratur tiap hari. SEGERA KE IGD BILA DEMAM / SAKIT TENGGOROKAN MENDADAK (skrining agranulositosis fatal)."
},
{
    "keys": [
        "carboglycerin",
        "karbogliserin"
    ],
    "strengths": [
        "10% Tetes Telinga 10 mL"
    ],
    "defaultStrength": "10% Tetes Telinga 10 mL",
    "defaultFrequency": "2-3x Sehari 2-3 Tetes",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00",
        "14:00",
        "20:00"
    ],
    "clinicalReason": "Pelunak serumen telinga mengeras pra-irigasi THT. Teteskan 2-3 tetes lalu miringkan kepala 3-5 menit. KONTRAINDIKASI BILA GENDANG TELINGA ROBEK / OMSK."
},
{
    "keys": [
        "carboxymethylcellulose",
        "cenfresh",
        "refresh tears"
    ],
    "strengths": [
        "0.5% Tetes Mata Minidose Catchcover",
        "0.5% Tetes Mata Botol 5 mL"
    ],
    "defaultStrength": "0.5% Tetes Mata Minidose Catchcover",
    "defaultFrequency": "3-4x Sehari 1-2 Tetes",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00",
        "12:00",
        "16:00",
        "20:00"
    ],
    "clinicalReason": "Air mata buatan polimer mukoadhesif pelumas mata kering. Teteskan 1-2 tetes ke kantung kelopak mata bawah. Minidose bebas pengawet harus dibuang setelah 3 hari dibuka."
},
{
    "keys": [
        "carboplatin",
        "paraplatin"
    ],
    "strengths": [
        "150 mg / 15 mL Vial Injeksi",
        "450 mg / 45 mL Vial Injeksi"
    ],
    "defaultStrength": "450 mg / 45 mL Vial Injeksi",
    "defaultFrequency": "Infus IV 15-60 Menit Sekali Tiap 4 Minggu (Siklus)",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00"
    ],
    "clinicalReason": "Kemoterapi sitotoksik platinum kanker ovarium & paru. Dosis dihitung dengan Formula Calvert (Target AUC x [GFR + 25]). Dilarang alat suntik aluminium. Waspadai nadir trombosit hari ke-21."
},
{
    "keys": [
        "cloxacillin",
        "kloksasilin"
    ],
    "strengths": [
        "500 mg Kapsul",
        "500 mg / 1 g Vial Injeksi"
    ],
    "defaultStrength": "500 mg Kapsul",
    "defaultFrequency": "4x Sehari Tiap 6 Jam",
    "defaultTiming": "Sebelum Makan",
    "preferredTimes": [
        "06:00",
        "12:00",
        "18:00",
        "24:00"
    ],
    "clinicalReason": "Penisilin antistafilokokus MSSA. WAJIB DIMINUM SAAT PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan). Makanan menurunkan penyerapan hingga 50%. Habiskan antibiotik."
},
{
    "keys": [
        "chloral hydrate",
        "kloral hidrat"
    ],
    "strengths": [
        "Sirup 500 mg / 5 mL (10%)"
    ],
    "defaultStrength": "Sirup 500 mg / 5 mL",
    "defaultFrequency": "Dosis Tunggal 30-60 Menit Pra-Prosedur",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00"
    ],
    "clinicalReason": "Sedatif hipnotik non-BZD pra-pemeriksaan EEG/scan anak. Campur sirup dengan air es/susu dingin cegah iritasi lambung. Pantau saturasi oksigen (SpO2) kontinu hingga sadar penuh."
},
{
    "keys": [
        "chlorambucil",
        "leukeran",
        "klorambusil"
    ],
    "strengths": [
        "2 mg Tablet Salut Selaput"
    ],
    "defaultStrength": "2 mg Tablet Salut Selaput",
    "defaultFrequency": "1x Sehari (Harian) atau Dosis Denyut Intermiten",
    "defaultTiming": "Sebelum Makan",
    "preferredTimes": [
        "06:00"
    ],
    "clinicalReason": "Alkilasi sitotoksik leukemia CLL. WAJIB DIMINUM SAAT PERUT KOSONG dengan air putih. PETUGAS WAJIB SARUNG TANGAN saat memegang tablet. Simpan di kulkas 2-8°C (jangan beku)."
},
{
    "keys": [
        "chloramphenicol",
        "kloramfenikol",
        "colme",
        "kemicetine",
        "chloramex",
        "fenicol"
    ],
    "strengths": [
        "500 mg Kapsul",
        "1 g Vial Injeksi (Na Suksinat)",
        "0.5% Tetes Mata",
        "1% Salep Mata",
        "10% Tetes Telinga"
    ],
    "defaultStrength": "500 mg Kapsul",
    "defaultFrequency": "4x Sehari Tiap 6 Jam",
    "defaultTiming": "Sebelum Makan",
    "preferredTimes": [
        "06:00",
        "12:00",
        "18:00",
        "24:00"
    ],
    "clinicalReason": "Antibiotik fenikol demam tifoid berat. Minum saat perut kosong. KONTRAINDIKASI PADA NEONATUS (GRAY BABY SYNDROME) & TRIMESTER 3. Waspadai risiko anemia aplastik idiosinkratik."
},
{
    "keys": [
        "chloroquine",
        "klorokuin",
        "resochin"
    ],
    "strengths": [
        "250 mg Tablet (setara 150 mg klorokuin basa)"
    ],
    "defaultStrength": "250 mg Tablet",
    "defaultFrequency": "Sesuai Protokol 3 Hari Malaria",
    "defaultTiming": "Bersama Makanan",
    "preferredTimes": [
        "08:00",
        "20:00"
    ],
    "clinicalReason": "4-Aminokinolin malaria P. vivax & amebiasis hepar. WAJIB DIMINUM BERSAMA MAKANAN/SUSU cegah mual. JAUHKAN DARI ANAK-ANAK (1-2 tablet fatal). Waspadai retinopati pada dosis kumulatif."
},
{
    "keys": [
        "colestyramine",
        "questran",
        "kolestiramin"
    ],
    "strengths": [
        "4 g Sachet Serbuk Oral"
    ],
    "defaultStrength": "4 g Sachet Serbuk Oral",
    "defaultFrequency": "1-2x Sehari Sebelum Makan",
    "defaultTiming": "Sebelum Makan",
    "preferredTimes": [
        "07:00",
        "18:00"
    ],
    "clinicalReason": "Resin pengikat asam empedu hiperkolesterolemia & pruritus kolestasis. LARUTKAN DALAM MINIMAL 150 ML AIR (DILARANG KERING). Beri jarak 1 jam sebelum / 4-6 jam sesudah dari obat lain."
},
{
    "keys": [
        "quinine",
        "kina",
        "chinin"
    ],
    "strengths": [
        "222 mg Tablet (setara 200 mg kina sulfat)",
        "500 mg / 2 mL Ampul Injeksi"
    ],
    "defaultStrength": "222 mg Tablet",
    "defaultFrequency": "3x Sehari Tiap 8 Jam Selama 7 Hari",
    "defaultTiming": "Sesudah Makan",
    "preferredTimes": [
        "06:00",
        "14:00",
        "22:00"
    ],
    "clinicalReason": "Alkaloid kina malaria falciparum resisten. Diminum sesudah makan selama 7 hari bersama doksisiklin/klindamisin. DILARANG BOLUS IV CEPAT. Waspadai hipoglikemia & cinchonism."
},
{
    "keys": [
        "artemether + lumefantrine",
        "coartem"
    ],
    "strengths": [
        "20/120 mg Tablet FDC"
    ],
    "defaultStrength": "20/120 mg Tablet FDC",
    "defaultFrequency": "Rejimen 6 Dosis Terstandar Dalam 3 Hari",
    "defaultTiming": "Bersama Makanan",
    "preferredTimes": [
        "08:00",
        "20:00"
    ],
    "clinicalReason": "ACT lini pertama malaria falciparum (Coartem). WAJIB DIMINUM BERSAMA MAKANAN BERLEMAK / SUSU (meningkatkan absorpsi lumefantrine 16x lipat). Ulangi dosis penuh bila muntah dlm 1 jam."
},
{
    "keys": [
        "dihydroartemisinin + piperaquine",
        "dhp",
        "arterakine",
        "d-artepp"
    ],
    "strengths": [
        "40/320 mg Tablet FDC"
    ],
    "defaultStrength": "40/320 mg Tablet FDC",
    "defaultFrequency": "1x Sehari Pada Jam Yang Sama Selama 3 Hari",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00"
    ],
    "clinicalReason": "ACT baku emas program nasional eliminasi malaria Indonesia. Diminum 1x sehari selama 3 hari berturut-turut pada jam yang sama bersama Primakuin hari ke-1. Hindari lemak jenuh berlebih."
},
{
    "keys": [
        "lopinavir + ritonavir",
        "aluvia",
        "kaletra"
    ],
    "strengths": [
        "200/50 mg Tablet Salut Selaput",
        "100/25 mg Pediatrik"
    ],
    "defaultStrength": "200/50 mg Tablet Salut Selaput",
    "defaultFrequency": "2x Sehari Tiap 12 Jam (2 Tablet Tiap Minum)",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00",
        "20:00"
    ],
    "clinicalReason": "Inhibitor protease lini kedua ARV HIV Kemenkes RI. TELAN UTUH DILARANG DIKUNYAH/DIGERUS. KONTRAINDIKASI MUTLAK BERSAMA SIMVASTATIN (rabdomiolisis fatal) & RIFAMPISIN. Pantau profil lipid."
},
{
    "keys": [
        "cefoperazone + sulbactam",
        "sulperazon"
    ],
    "strengths": [
        "1 g (500 mg + 500 mg) Vial Injeksi",
        "2 g (1 g + 1 g) Vial Injeksi"
    ],
    "defaultStrength": "1 g Vial Injeksi",
    "defaultFrequency": "Infus IV Tiap 12 Jam Selama 30-60 Menit",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00",
        "20:00"
    ],
    "clinicalReason": "Sefalosporin antipseudomonal + inhibitor beta-laktamase infeksi nosokomial berat. DILARANG MENGONSUMSI ALKOHOL (reaksi disulfiram fatal). Beri vitamin K profilaksis bila malnutrisi."
},
{
    "keys": [
        "ampicillin + sulbactam",
        "bactesyn",
        "viccillin-sx"
    ],
    "strengths": [
        "0.75 g (500 mg + 250 mg) Vial Injeksi",
        "1.5 g (1 g + 500 mg) Vial Injeksi"
    ],
    "defaultStrength": "1.5 g Vial Injeksi",
    "defaultFrequency": "Injeksi IV/IM Tiap 6 Jam",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "06:00",
        "12:00",
        "18:00",
        "24:00"
    ],
    "clinicalReason": "Aminopenisilin + sulbactam infeksi ginekologi, intraabdomen, & jaringan lunak. Larutan infus dalam NaCl 0.9% stabil 8 jam, dalam D5W hanya 2 jam (segera habiskan). Dosis sesuai CrCl."
},
{
    "keys": [
        "sofosbuvir + velpatasvir",
        "epclusa"
    ],
    "strengths": [
        "400/100 mg Tablet Salut Selaput"
    ],
    "defaultStrength": "400/100 mg Tablet Salut Selaput",
    "defaultFrequency": "1x Sehari Selama 12 Minggu Penuh",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00"
    ],
    "clinicalReason": "DAA pangenotipik kuratif Hepatitis C (genotipe 1-6) SVR12 >95%. Telan 1 tablet utuh tiap hari selama 12 minggu. KONTRAINDIKASI AMIODARON (bradikardia fatal). HINDARI PPI (OMEPRAZOLE)."
},
{
    "keys": [
        "levodopa + carbidopa + entacapone",
        "stalevo"
    ],
    "strengths": [
        "Stalevo 50 (50/12.5/200 mg)",
        "Stalevo 100 (100/25/200 mg)",
        "Stalevo 150 (150/37.5/200 mg)"
    ],
    "defaultStrength": "Stalevo 100 Tablet",
    "defaultFrequency": "Sesuai Jadwal Levodopa Harian Pasien Parkinson",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "07:00",
        "11:00",
        "15:00",
        "19:00"
    ],
    "clinicalReason": "Kombinasi triple Parkinson fluktuasi motorik wearing-off. Telan utuh. HINDARI MAKANAN SANGAT TINGGI PROTEIN BERSAMAAN. Beri jarak 2-3 jam dari suplemen besi. Urin dapat kemerahan."
},
{
    "keys": [
        "levonorgestrel + ethinylestradiol",
        "microgynon",
        "pil kb 1",
        "andalan 28"
    ],
    "strengths": [
        "Blister 28 Tablet (21 Aktif + 7 Plasebo/Besi)"
    ],
    "defaultStrength": "Blister 28 Tablet",
    "defaultFrequency": "1x Sehari Pada Jam Yang Sama Persis",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "21:00"
    ],
    "clinicalReason": "Kontrasepsi oral kombinasi monofasik. Minum 1 tablet tiap hari pada jam yang sama (malam hari) tanpa jeda. KONTRAINDIKASI MUTLAK PADA WANITA PEROKOK USIA >= 35 TAHUN (trombosis fatal)."
},
{
    "keys": [
        "medroxyprogesterone + estradiol",
        "cyclofem",
        "gestin f1"
    ],
    "strengths": [
        "1 mL Vial / Ampul Suspensi Injeksi IM (25 mg MPA + 5 mg Estradiol)"
    ],
    "defaultStrength": "1 mL Vial Suspensi Injeksi IM",
    "defaultFrequency": "Injeksi IM Dalam Sekali Setiap 28 Hari",
    "defaultTiming": "Bebas",
    "preferredTimes": [
        "08:00"
    ],
    "clinicalReason": "Kontrasepsi suntik kombinasi bulanan. Suntikkan IM dalam pada bokong/lengan tiap 28 hari (toleransi ±3 hari). KOCOK VIAL HINGGA HOMOGEN sebelum suntik. Siklus haid tetap datang tiap bulan."
},
{
    "keys": [
        "paraffin + glycerin + phenolphthalein",
        "laxadine"
    ],
    "strengths": [
        "Emulsi 30 mL",
        "Emulsi 60 mL",
        "Emulsi 110 mL"
    ],
    "defaultStrength": "Emulsi 60 mL",
    "defaultFrequency": "1x Sehari Malam Sebelum Tidur (1-2 Sendok Makan)",
    "defaultTiming": "Sebelum Makan",
    "preferredTimes": [
        "21:00"
    ],
    "clinicalReason": "Laksatif emulsi pelunak, pelicin, & stimulan peristaltik konstipasi. Minum 1-2 sendok makan malam hari sebelum tidur (BAB lancar pagi). KOCOK DAHULU. JANGAN DIGUNAKAN LEBIH DARI 7 HARI."
}
];;

export function getDrugClinicalProfile(drugNameOrGeneric: string): DrugClinicalProfile | null {
  if (!drugNameOrGeneric) return null;
  const target = drugNameOrGeneric.toLowerCase();

  for (const profile of CLINICAL_DRUG_PROFILES) {
    for (const key of profile.keys) {
      if (target.includes(key.toLowerCase())) {
        return profile;
      }
    }
  }
  return null;
}
