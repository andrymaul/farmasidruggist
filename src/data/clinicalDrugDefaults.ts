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
  }
];

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
