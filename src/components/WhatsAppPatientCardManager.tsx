import React, { useState, useMemo, useEffect } from 'react';
import { ClinicBrandingSettings, Drug } from '../types';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Printer, 
  Plus, 
  Trash2, 
  Sparkles, 
  Share2, 
  Clock, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Phone, 
  User, 
  Building2, 
  Pill, 
  Utensils, 
  ShieldAlert, 
  RotateCcw,
  ExternalLink,
  Smartphone,
  FileText,
  Search,
  Zap,
  ChevronDown,
  ChevronUp,
  BookOpen,
  X,
  Layers,
  ShieldCheck
} from 'lucide-react';

export interface PatientMedicationEntry {
  id: string;
  drugName: string;
  indicationLabel: string; // e.g. "Obat Tekanan Darah", "Antibiotik", "Obat Lambung"
  frequency: string; // "1 x sehari 1 tablet", "3 x sehari 1 kapsul"
  timing: string; // "Pagi hari", "Malam sebelum tidur", "Tiap 8 jam"
  mealRelation: 'sebelum' | 'bersama' | 'sesudah' | 'bebas';
  isAntibioticMustFinish: boolean;
  specialInstructions?: string; // e.g. "Kocok dahulu", "Simpan di kulkas"
  foodPrecautions?: string; // e.g. "Hindari susu/teh", "Kurangi makanan asin"
}

export interface PioDrugCategory {
  id: string;
  label: string;
  icon: string;
  keywords: string[];
}

export const PIO_DRUG_CATEGORIES: PioDrugCategory[] = [
  { id: 'populer', label: '⭐ Populer', icon: '⭐', keywords: [] },
  { id: 'hipertensi', label: '🫀 Hipertensi & Jantung', icon: '🫀', keywords: ['hipertensi', 'amlodipine', 'candesartan', 'captopril', 'bisoprolol', 'valsartan', 'furosemide', 'diltiazem', 'digoxin', 'spironolactone', 'kardiovaskular', 'cardiovascular', 'antihipertensi'] },
  { id: 'diabetes', label: '🩸 Diabetes Melitus', icon: '🩸', keywords: ['diabetes', 'metformin', 'glimepiride', 'gliclazide', 'acarbose', 'pioglitazone', 'vildagliptin', 'sitagliptin', 'empagliflozin', 'antidiabetes'] },
  { id: 'lambung', label: '🔥 Lambung & PPI / GERD', icon: '🔥', keywords: ['lambung', 'maag', 'gerd', 'omeprazole', 'lansoprazole', 'esomeprazole', 'pantoprazole', 'antasida', 'antacid', 'sukralfat', 'sucralfate', 'domperidone', 'gastro', 'mukoprotektor'] },
  { id: 'antibiotik', label: '🦠 Antibiotik & Infeksi', icon: '🦠', keywords: ['antibiotik', 'antibakteri', 'amoxicillin', 'cefixime', 'cefadroxil', 'ciprofloxacin', 'levofloxacin', 'azithromycin', 'cotrimoxazole', 'doxycycline', 'metronidazole', 'anti-infeksi'] },
  { id: 'analgesik', label: '⚡ Analgesik & Anti-Nyeri', icon: '⚡', keywords: ['analgesik', 'nyeri', 'nsaid', 'oains', 'paracetamol', 'mefenamat', 'ibuprofen', 'diklofenak', 'meloxicam', 'ketorolac', 'celecoxib', 'antiinflamasi'] },
  { id: 'kolesterol', label: '🧪 Kolesterol & Asam Urat', icon: '🧪', keywords: ['kolesterol', 'statin', 'simvastatin', 'atorvastatin', 'rosuvastatin', 'fenofibrate', 'allopurinol', 'febuxostat', 'asam urat', 'gout', 'lipid'] },
  { id: 'respirasi', label: '🫁 Respirasi, Batuk & Alergi', icon: '🫁', keywords: ['asma', 'batuk', 'alergi', 'cetirizine', 'loratadine', 'salbutamol', 'ambroxol', 'dextromethorphan', 'acetylcysteine', 'antihistamin', 'respirasi'] },
  { id: 'semua', label: '💊 Semua Obat Monografi', icon: '💊', keywords: [] }
];

export const POPULAR_PIO_DRUGS = [
  'Amlodipine 10 mg',
  'Metformin 500 mg',
  'Omeprazole 20 mg',
  'Cefixime 100 mg',
  'Paracetamol 500 mg',
  'Simvastatin 20 mg',
  'Asam Mefenamat 500 mg',
  'Candesartan 8 mg',
  'Allopurinol 100 mg',
  'Cetirizine 10 mg',
  'Amoxicillin 500 mg',
  'Sukralfat Suspensi'
];

export const generatePioAutoFill = (
  rawQuery: string,
  drugObj?: Drug
): Partial<PatientMedicationEntry> => {
  const query = (rawQuery + ' ' + (drugObj?.name || '') + ' ' + (drugObj?.genericName || '') + ' ' + (drugObj?.category || '')).toLowerCase();

  // 1. PPI & Lambung
  if (query.includes('omeprazole') || query.includes('lokev') || query.includes('ozid')) {
    return {
      drugName: drugObj?.name || 'Omeprazole 20 mg',
      indicationLabel: 'Obat Lambung / Tukak Maag & GERD',
      frequency: '1 x sehari 1 kapsul',
      mealRelation: 'sebelum',
      timing: 'Pagi hari (30-60 menit SEBELUM sarapan)',
      isAntibioticMustFinish: false,
      specialInstructions: 'Telan utuh kapsul dengan air putih, jangan digerus atau dikunyah',
      foodPrecautions: 'Hindari kopi, minuman bersoda, makanan pedas, asam, dan bersantan'
    };
  }
  if (query.includes('lansoprazole') || query.includes('prosogan') || query.includes('inazol') || query.includes('lapraz')) {
    return {
      drugName: drugObj?.name || 'Lansoprazole 30 mg',
      indicationLabel: 'Pencegah Asam Lambung & Tukak Lambung (PPI)',
      frequency: '1 x sehari 1 kapsul',
      mealRelation: 'sebelum',
      timing: 'Pagi hari 30 - 60 menit SEBELUM sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Telan utuh kapsul dengan segelas air matang',
      foodPrecautions: 'Hindari makanan pedas, berminyak, dan asam'
    };
  }
  if (query.includes('esomeprazole') || query.includes('nexium')) {
    return {
      drugName: drugObj?.name || 'Esomeprazole 40 mg',
      indicationLabel: 'Obat Pengontrol Asam Lambung & GERD',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sebelum',
      timing: 'Pagi hari 30 menit sebelum sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Ditelan utuh dengan segelas air putih',
      foodPrecautions: 'Hindari kopi dan makanan pemicu asam lambung'
    };
  }
  if (query.includes('pantoprazole') || query.includes('pantozol') || query.includes('panloc')) {
    return {
      drugName: drugObj?.name || 'Pantoprazole 40 mg',
      indicationLabel: 'Obat Penekan Asam Lambung (PPI)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sebelum',
      timing: 'Pagi hari 30 menit sebelum sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Jangan dikunyah atau dihancurkan',
      foodPrecautions: 'Hindari konsumsi makanan pedas & asam'
    };
  }
  if (query.includes('antasida') || query.includes('antacid') || query.includes('promag') || query.includes('mylanta') || query.includes('polysilane')) {
    return {
      drugName: drugObj?.name || 'Antasida Doen Tablet Kunyah',
      indicationLabel: 'Pereda Nyeri Lambung & Penetral Asam Maag',
      frequency: '3 x sehari 1 tablet kunyah',
      mealRelation: 'sebelum',
      timing: '1 jam sebelum makan atau 2 jam sesudah makan & sebelum tidur',
      isAntibioticMustFinish: false,
      specialInstructions: 'WAJIB dikunyah sampai halus sebelum ditelan. Beri jeda 2 jam dengan obat lain.',
      foodPrecautions: 'Hindari makanan terlalu asam, pedas, dan berlemak'
    };
  }
  if (query.includes('sucralfate') || query.includes('sukralfat') || query.includes('inpepsa') || query.includes('necra') || query.includes('episan')) {
    return {
      drugName: drugObj?.name || 'Sukralfat Suspensi 500 mg/5 mL',
      indicationLabel: 'Cairan Pelapis Dinding Lambung & Usus',
      frequency: '3 x sehari 2 sendok takar (10 mL)',
      mealRelation: 'sebelum',
      timing: '1 jam SEBELUM makan saat perut kosong & sebelum tidur',
      isAntibioticMustFinish: false,
      specialInstructions: 'Kocok botol dahulu sebelum diminum. Beri jeda minimal 2 jam dengan obat oral lain.',
      foodPrecautions: 'Hindari konsumsi bersamaan dengan susu atau suplemen'
    };
  }
  if (query.includes('domperidone') || query.includes('vometa') || query.includes('vosedon')) {
    return {
      drugName: drugObj?.name || 'Domperidone 10 mg',
      indicationLabel: 'Obat Pereda Mual, Kembung & Muntah',
      frequency: '3 x sehari 1 tablet',
      mealRelation: 'sebelum',
      timing: '15 - 30 menit SEBELUM makan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum sebelum makan agar saluran cerna siap menerima makanan'
    };
  }

  // 2. Antihipertensi
  if (query.includes('amlodipine') || query.includes('norvask') || query.includes('divask')) {
    return {
      drugName: drugObj?.name || 'Amlodipine 10 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah (Antihipertensi)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Pagi hari setelah sarapan (pada jam yang sama)',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap hari pada jam yang sama walau tensi sudah terasa normal',
      foodPrecautions: 'Kurangi konsumsi garam dan hindari jus grapefruit/jeruk bali'
    };
  }
  if (query.includes('candesartan') || query.includes('blopress') || query.includes('canderin')) {
    return {
      drugName: drugObj?.name || 'Candesartan 8 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah & Proteksi Ginjal (ARB)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Pagi hari setelah sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap hari pada jam yang sama',
      foodPrecautions: 'Hindari suplemen kalium tinggi atau garam diet kalium'
    };
  }
  if (query.includes('valsartan') || query.includes('diovan')) {
    return {
      drugName: drugObj?.name || 'Valsartan 80 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah (ARB)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Pagi hari setelah sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap hari pada jam yang sama',
      foodPrecautions: 'Batasi asupan garam dan makanan tinggi kalium'
    };
  }
  if (query.includes('captopril')) {
    return {
      drugName: drugObj?.name || 'Captopril 25 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah (ACE Inhibitor)',
      frequency: '2 x sehari 1 tablet',
      mealRelation: 'sebelum',
      timing: 'Pagi dan malam, 1 jam SEBELUM makan saat perut kosong',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum saat perut kosong agar penyerapan optimal. Jika timbul batuk kering, konsultasikan ke apoteker.',
      foodPrecautions: 'Kurangi asupan garam harian'
    };
  }
  if (query.includes('bisoprolol') || query.includes('concor') || query.includes('maintate')) {
    return {
      drugName: drugObj?.name || 'Bisoprolol 2.5 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah & Pengatur Detak Jantung (Beta-Blocker)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Pagi hari setelah sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap pagi. Jangan menghentikan obat secara mendadak.',
      foodPrecautions: 'Hindari minuman berenergi atau kafein berlebih'
    };
  }
  if (query.includes('furosemide') || query.includes('lasix') || query.includes('farsix')) {
    return {
      drugName: drugObj?.name || 'Furosemide 40 mg',
      indicationLabel: 'Obat Pembuang Cairan Berlebih (Diuretik Pelancar Kencing)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'PAGI HARI setelah sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum di pagi hari agar tidak mengganggu tidur malam karena buang air kecil',
      foodPrecautions: 'Kurangi konsumsi garam dan pantau asupan cairan'
    };
  }

  // 3. Antidiabetes
  if (query.includes('metformin') || query.includes('glucophage') || query.includes('glumin')) {
    return {
      drugName: drugObj?.name || 'Metformin 500 mg',
      indicationLabel: 'Obat Pengontrol Gula Darah Utama (Biguanida)',
      frequency: '2 x sehari 1 tablet',
      mealRelation: 'bersama',
      timing: 'Bersama suapan makan pagi dan makan malam',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum bersama suapan makanan untuk mencegah rasa mual dan perih lambung',
      foodPrecautions: 'Batasi asupan karbohidrat tinggi gula dan minuman manis'
    };
  }
  if (query.includes('glimepiride') || query.includes('amaryl') || query.includes('glimpid')) {
    return {
      drugName: drugObj?.name || 'Glimepiride 2 mg',
      indicationLabel: 'Pemicu Pengeluaran Insulin Tubuh (Sulfonilurea)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sebelum',
      timing: 'Sesaat sebelum sarapan pagi (atau saat suapan pertama)',
      isAntibioticMustFinish: false,
      specialInstructions: 'Wajib langsung sarapan setelah minum obat untuk mencegah gula darah anjlok (hipoglikemia)',
      foodPrecautions: 'Siapkan permen manis jika timbul keringat dingin, gemetar, atau pusing'
    };
  }
  if (query.includes('acarbose') || query.includes('glucobay')) {
    return {
      drugName: drugObj?.name || 'Acarbose 50 mg',
      indicationLabel: 'Penghambat Penyerapan Gula Karbohidrat Makanan',
      frequency: '3 x sehari 1 tablet',
      mealRelation: 'bersama',
      timing: 'Bersama SUAPAN PERTAMA setiap makan besar',
      isAntibioticMustFinish: false,
      specialInstructions: 'Kunyah bersama suapan pertama makanan utama agar efektif menghambat gula'
    };
  }

  // 4. Antibiotik
  if (query.includes('amoxicillin') || query.includes('amoksisilin') || query.includes('amoxsan') || query.includes('clamoxyl')) {
    return {
      drugName: drugObj?.name || 'Amoxicillin 500 mg',
      indicationLabel: 'Antibiotik Pengobatan Infeksi Bakteri',
      frequency: '3 x sehari 1 kaplet (tiap 8 jam)',
      mealRelation: 'sesudah',
      timing: 'Tiap 8 jam (pagi 07:00, siang 15:00, malam 23:00) sesudah makan',
      isAntibioticMustFinish: true,
      specialInstructions: '⚠️ WAJIB DIHABISKAN selama durasi hari yang diresepkan walau gejala sudah sembuh',
      foodPrecautions: 'Beri jeda dengan susu atau suplemen kalsium'
    };
  }
  if (query.includes('cefixime') || query.includes('cepanat') || query.includes('spancef') || query.includes('fixef')) {
    return {
      drugName: drugObj?.name || 'Cefixime 100 mg',
      indicationLabel: 'Antibiotik Saluran Pernapasan & Infeksi Bakteri',
      frequency: '2 x sehari 1 kapsul (tiap 12 jam)',
      mealRelation: 'sesudah',
      timing: 'Tiap 12 jam (pagi dan malam) sesudah makan',
      isAntibioticMustFinish: true,
      specialInstructions: '⚠️ WAJIB DIHABISKAN selama 5 hari berturut-turut untuk mencegah resistensi kuman',
      foodPrecautions: 'Hindari konsumsi bersamaan dengan susu kalsium tinggi'
    };
  }
  if (query.includes('cefadroxil') || query.includes('lapicef') || query.includes('sedrofen')) {
    return {
      drugName: drugObj?.name || 'Cefadroxil 500 mg',
      indicationLabel: 'Antibiotik Infeksi Kulit & Saluran Napas',
      frequency: '2 x sehari 1 kapsul (tiap 12 jam)',
      mealRelation: 'sesudah',
      timing: 'Tiap 12 jam (pagi dan malam) sesudah makan',
      isAntibioticMustFinish: true,
      specialInstructions: '⚠️ WAJIB DIHABISKAN sesuai anjuran dokter/apoteker'
    };
  }
  if (query.includes('ciprofloxacin') || query.includes('baquinor') || query.includes('ciflox')) {
    return {
      drugName: drugObj?.name || 'Ciprofloxacin 500 mg',
      indicationLabel: 'Antibiotik Infeksi Saluran Kemih & Bakteri',
      frequency: '2 x sehari 1 tablet (tiap 12 jam)',
      mealRelation: 'sesudah',
      timing: 'Tiap 12 jam (pagi dan malam) sesudah makan',
      isAntibioticMustFinish: true,
      specialInstructions: '⚠️ WAJIB DIHABISKAN. Minum banyak air putih (minimal 2 liter/hari).',
      foodPrecautions: 'JANGAN diminum bersamaan dengan susu, antasida, atau zat besi (beri jeda 2 jam)'
    };
  }
  if (query.includes('azithromycin') || query.includes('zithromax')) {
    return {
      drugName: drugObj?.name || 'Azithromycin 500 mg',
      indicationLabel: 'Antibiotik Saluran Pernapasan & Infeksi',
      frequency: '1 x sehari 1 tablet (selama 3-5 hari)',
      mealRelation: 'sebelum',
      timing: '1 jam sebelum makan atau 2 jam sesudah makan pada jam yang sama',
      isAntibioticMustFinish: true,
      specialInstructions: '⚠️ WAJIB DIHABISKAN selama 3-5 hari berturut-turut'
    };
  }

  // 5. Analgesik & Antiinflamasi
  if (query.includes('paracetamol') || query.includes('panadol') || query.includes('sanmol') || query.includes('pamol') || query.includes('dumin')) {
    return {
      drugName: drugObj?.name || 'Paracetamol 500 mg',
      indicationLabel: 'Pereda Demam & Nyeri Ringan-Sedang',
      frequency: '3 x sehari 1 tablet (bila perlu)',
      mealRelation: 'sesudah',
      timing: 'Pagi, siang, dan malam sesudah makan (bila demam/nyeri)',
      isAntibioticMustFinish: false,
      specialInstructions: 'Hentikan jika demam dan nyeri sudah reda. Jeda antar dosis minimal 4-6 jam.',
      foodPrecautions: 'Hindari konsumsi alkohol selama meminum obat ini'
    };
  }
  if (query.includes('mefenamic') || query.includes('mefenamat') || query.includes('ponstan') || query.includes('mefinal')) {
    return {
      drugName: drugObj?.name || 'Asam Mefenamat 500 mg',
      indicationLabel: 'Pereda Nyeri Gigi, Sakit Kepala & Nyeri Haid (OAINS)',
      frequency: '3 x sehari 1 kaplet',
      mealRelation: 'sesudah',
      timing: 'Segera SESUDAH makan (atau bersama makanan)',
      isAntibioticMustFinish: false,
      specialInstructions: 'Wajib diminum segera sesudah makan untuk mencegah nyeri lambung. Hentikan bila nyeri reda.',
      foodPrecautions: 'Hindari minum bersamaan dengan obat pereda nyeri lain atau alkohol'
    };
  }
  if (query.includes('ibuprofen') || query.includes('proris') || query.includes('bufect')) {
    return {
      drugName: drugObj?.name || 'Ibuprofen 400 mg',
      indicationLabel: 'Pereda Nyeri, Radang & Demam (OAINS)',
      frequency: '3 x sehari 1 tablet sesudah makan',
      mealRelation: 'sesudah',
      timing: 'Pagi, siang, dan malam sesudah makan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Wajib diminum sesudah makan dengan segelas air putih'
    };
  }
  if (query.includes('diclofenac') || query.includes('diklofenak') || query.includes('voltaren') || query.includes('cataflam')) {
    return {
      drugName: drugObj?.name || 'Natrium Diklofenak 50 mg',
      indicationLabel: 'Pereda Nyeri Sendi & Radang Akut (OAINS)',
      frequency: '2-3 x sehari 1 tablet sesudah makan',
      mealRelation: 'sesudah',
      timing: 'Pagi dan malam segera SESUDAH makan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Ditelan utuh dengan segelas air setelah makan'
    };
  }

  // 6. Kolesterol & Statin
  if (query.includes('simvastatin') || query.includes('zocor') || query.includes('cholestat') || query.includes('valemia')) {
    return {
      drugName: drugObj?.name || 'Simvastatin 20 mg',
      indicationLabel: 'Obat Penurun Kolesterol Jahat (LDL & Trigliserida)',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Malam hari sebelum tidur (pukul 20:00 - 21:00)',
      isAntibioticMustFinish: false,
      specialInstructions: 'Sintesis kolesterol tubuh aktif di malam hari. Minum teratur setiap malam.',
      foodPrecautions: 'Kurangi konsumsi gorengan, santan, jeroan, dan hindari jus grapefruit'
    };
  }
  if (query.includes('atorvastatin') || query.includes('lipitor') || query.includes('atoris')) {
    return {
      drugName: drugObj?.name || 'Atorvastatin 20 mg',
      indicationLabel: 'Obat Penurun Kolesterol & Pencegah Plak Pembuluh Darah',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Malam hari pada jam yang sama',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap hari. Lakukan kontrol profil lipid rutin.',
      foodPrecautions: 'Kurangi makanan tinggi lemak jenuh'
    };
  }

  // 7. Asam Urat
  if (query.includes('allopurinol') || query.includes('zyloric') || query.includes('puricemia')) {
    return {
      drugName: drugObj?.name || 'Allopurinol 100 mg',
      indicationLabel: 'Obat Penurun Kadar Asam Urat Darah',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Pagi hari sesudah sarapan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum banyak air putih (minimal 2-3 liter/hari) untuk membantu ekskresi asam urat',
      foodPrecautions: 'Hindari emping/melinjo, jeroan, kacang-kacangan, daging merah, dan seafood tinggi purin'
    };
  }

  // 8. Batuk & Alergi
  if (query.includes('cetirizine') || query.includes('incidal') || query.includes('ryvel') || query.includes('cerini')) {
    return {
      drugName: drugObj?.name || 'Cetirizine 10 mg',
      indicationLabel: 'Obat Pereda Alergi, Gatal, Bersin & Biduran',
      frequency: '1 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Malam hari sebelum tidur',
      isAntibioticMustFinish: false,
      specialInstructions: 'Dapat menimbulkan rasa kantuk ringan. Hindari mengemudi setelah minum obat.',
      foodPrecautions: 'Hindari konsumsi alkohol'
    };
  }
  if (query.includes('ambroxol') || query.includes('mucos') || query.includes('mucopect')) {
    return {
      drugName: drugObj?.name || 'Ambroxol 30 mg',
      indicationLabel: 'Obat Pengencer Dahak Batuk Berdahak',
      frequency: '3 x sehari 1 tablet',
      mealRelation: 'sesudah',
      timing: 'Pagi, siang, dan malam sesudah makan',
      isAntibioticMustFinish: false,
      specialInstructions: 'Bantu efektivitas pengencer dahak dengan banyak minum air putih hangat'
    };
  }

  // Fallback: extract directly from deep Drug monograph fields
  if (drugObj) {
    let cleanIndication = drugObj.indication || (drugObj.category ? `Obat Golongan ${drugObj.category}` : 'Sesuai Anjuran Dokter');
    if (cleanIndication.includes('.')) {
      cleanIndication = cleanIndication.split('.')[0].trim();
    }
    if (cleanIndication.length > 55) {
      cleanIndication = cleanIndication.substring(0, 52) + '...';
    }

    let foodPrec = drugObj.foodInteraction || drugObj.patientTips || '';
    let specialInst = drugObj.administrationGuideline || drugObj.contraindications || drugObj.contraindication || '';
    let mealRel: 'sebelum' | 'bersama' | 'sesudah' | 'bebas' = 'sesudah';
    let defTiming = 'Pagi hari sesudah makan';

    const fullDesc = (foodPrec + ' ' + specialInst + ' ' + (drugObj.dosage || '')).toLowerCase();
    if (fullDesc.includes('sebelum makan') || fullDesc.includes('perut kosong') || fullDesc.includes('30 menit sebelum')) {
      mealRel = 'sebelum';
      defTiming = '30-60 menit SEBELUM sarapan / makan';
    } else if (fullDesc.includes('bersama makanan') || fullDesc.includes('suapan')) {
      mealRel = 'bersama';
      defTiming = 'Bersama suapan makanan besar';
    } else if (fullDesc.includes('malam') || fullDesc.includes('sebelum tidur')) {
      defTiming = 'Malam hari sebelum tidur';
    }

    const isAnti = (drugObj.category || '').toLowerCase().includes('antibiotik') ||
      (drugObj.category || '').toLowerCase().includes('antibakteri') ||
      (drugObj.category || '').toLowerCase().includes('anti-infeksi');

    return {
      drugName: drugObj.name,
      indicationLabel: cleanIndication,
      frequency: drugObj.adultDosage ? drugObj.adultDosage.split('\n')[0].substring(0, 30) : (drugObj.dosage ? drugObj.dosage.split('\n')[0].substring(0, 30) : '1 x sehari 1 tablet'),
      mealRelation: mealRel,
      timing: defTiming,
      isAntibioticMustFinish: isAnti,
      specialInstructions: specialInst.length > 80 ? specialInst.substring(0, 77) + '...' : specialInst,
      foodPrecautions: foodPrec.length > 80 ? foodPrec.substring(0, 77) + '...' : foodPrec
    };
  }

  // Default Fallback
  return {
    drugName: rawQuery || 'Obat Baru',
    indicationLabel: 'Sesuai Anjuran Dokter',
    frequency: '1 x sehari 1 tablet',
    mealRelation: 'sesudah',
    timing: 'Pagi hari sesudah makan',
    isAntibioticMustFinish: query.includes('antibiotik') || query.includes('antibakteri')
  };
};

interface WhatsAppPatientCardManagerProps {
  clinicBranding: ClinicBrandingSettings;
  drugs?: Drug[];
  onSelectDrugForDetail?: (drug: Drug) => void;
  preselectedDrug?: Drug | null;
}

export const WhatsAppPatientCardManager: React.FC<WhatsAppPatientCardManagerProps> = ({
  clinicBranding,
  drugs = [],
  onSelectDrugForDetail,
  preselectedDrug
}) => {
  // Patient details state
  const [patientName, setPatientName] = useState<string>('Bpk. Hendra Wijaya');
  const [patientPhone, setPatientPhone] = useState<string>('081234567890');
  const [patientGender, setPatientGender] = useState<'L' | 'P'>('L');
  const [patientAge, setPatientAge] = useState<string>('54 th');
  const [generalDoctorNotes, setGeneralDoctorNotes] = useState<string>('Kontrol kembali jika obat habis atau keluhan berlanjut.');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [activePreviewMode, setActivePreviewMode] = useState<'whatsapp' | 'card'>('whatsapp');

  // Monograph Category Selector & Fast Filter
  const [selectedPioCategory, setSelectedPioCategory] = useState<string>('populer');
  const [pioCategorySearch, setPioCategorySearch] = useState<string>('');
  const [showMonographModal, setShowMonographModal] = useState<boolean>(false);
  const [addedToastMessage, setAddedToastMessage] = useState<string | null>(null);

  // Autocomplete dropdown state
  const [activeSearchMedId, setActiveSearchMedId] = useState<string | null>(null);
  const [autoFillNotice, setAutoFillNotice] = useState<{ [medId: string]: string }>({});

  // Medication list state
  const [medications, setMedications] = useState<PatientMedicationEntry[]>([
    {
      id: 'med-1',
      drugName: 'Amlodipine 10 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah (Antihipertensi)',
      frequency: '1 x sehari 1 tablet',
      timing: 'Pagi hari setelah sarapan (pada jam yang sama)',
      mealRelation: 'sesudah',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap hari walau tensi sudah normal',
      foodPrecautions: 'Kurangi konsumsi garam dan hindari jus grapefruit'
    },
    {
      id: 'med-2',
      drugName: 'Metformin 500 mg',
      indicationLabel: 'Obat Pengontrol Gula Darah Utama',
      frequency: '2 x sehari 1 tablet',
      timing: 'Bersama suapan makan pagi dan malam',
      mealRelation: 'bersama',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum bersama makanan untuk mencegah rasa mual',
      foodPrecautions: 'Batasi asupan karbohidrat tinggi gula'
    },
    {
      id: 'med-3',
      drugName: 'Cefixime 100 mg',
      indicationLabel: 'Antibiotik Saluran Napas & Infeksi',
      frequency: '2 x sehari 1 kapsul',
      timing: 'Tiap 12 jam (pagi dan malam)',
      mealRelation: 'sesudah',
      isAntibioticMustFinish: true,
      specialInstructions: 'WAJIB DIHABISKAN selama 5 hari berturut-turut',
      foodPrecautions: 'Hindari konsumsi bersamaan dengan susu kalsium tinggi'
    }
  ]);

  // Clean and sanitize phone number to International Indonesian format 628xxx
  const sanitizedWhatsAppPhone = useMemo(() => {
    let cleaned = patientPhone.replace(/\D/g, ''); // strip non-digits
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8')) {
      cleaned = '62' + cleaned;
    }
    return cleaned;
  }, [patientPhone]);

  // Preset Template loader
  const handleLoadPreset = (presetType: 'hipertensi' | 'diabetes' | 'ispa' | 'gerd' | 'diare_anak') => {
    switch (presetType) {
      case 'hipertensi':
        setPatientName('Ibu Ratna (60 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Candesartan 16 mg',
            indicationLabel: 'Obat Penurun Tekanan Darah (ARB)',
            frequency: '1 x sehari 1 tablet',
            timing: 'Pagi hari sesudah sarapan',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Minum teratur setiap hari pada jam yang sama',
            foodPrecautions: 'Hindari suplemen kalium atau garam diet kalium tinggi'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Amlodipine 5 mg',
            indicationLabel: 'Obat Penurun Tekanan Darah (CCB)',
            frequency: '1 x sehari 1 tablet',
            timing: 'Malam hari sebelum tidur',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Dapat menimbulkan bengkak ringan di pergelangan kaki',
            foodPrecautions: 'Hindari jus grapefruit/jeruk bali'
          }
        ]);
        break;
      case 'diabetes':
        setPatientName('Bpk. Sugeng (52 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Metformin 500 mg',
            indicationLabel: 'Obat Gula Darah Utama',
            frequency: '2 x sehari 1 tablet',
            timing: 'Saat suapan pertama sarapan dan makan malam',
            mealRelation: 'bersama',
            isAntibioticMustFinish: false,
            specialInstructions: 'Minum bersama makanan untuk mencegah nyeri lambung',
            foodPrecautions: 'Hindari minuman manis berkalori tinggi'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Glimepiride 2 mg',
            indicationLabel: 'Pemicu Sekresi Insulin',
            frequency: '1 x sehari 1 tablet',
            timing: 'Sesaat sebelum sarapan pagi',
            mealRelation: 'sebelum',
            isAntibioticMustFinish: false,
            specialInstructions: 'Pastikan sarapan setelah minum obat untuk mencegah gula darah anjlok (hipoglikemia)',
            foodPrecautions: 'Siapkan permen manis jika timbul keringat dingin/gemetar'
          }
        ]);
        break;
      case 'ispa':
        setPatientName('An. Dimas (7 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Amoxicillin Sirup 125 mg/5 mL',
            indicationLabel: 'Antibiotik Infeksi Bakteri',
            frequency: '3 x sehari 1 sendok takar (5 mL)',
            timing: 'Tiap 8 jam (pagi, siang, malam)',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: true,
            specialInstructions: 'HABISKAN selama 5-7 hari meski gejala sudah membaik',
            foodPrecautions: 'Kocok botol dahulu sebelum diminum'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Paracetamol Sirup 120 mg/5 mL',
            indicationLabel: 'Pereda Demam & Nyeri',
            frequency: '3-4 x sehari 1 sendok takar (5 mL)',
            timing: 'Hanya diminum saat anak demam (>38°C)',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Beri jeda minimal 4 jam antar dosis',
            foodPrecautions: 'Perbanyak minum air putih hangat'
          },
          {
            id: `med-${Date.now()}-3`,
            drugName: 'Ambroxol Sirup 15 mg/5 mL',
            indicationLabel: 'Pengencer Dahak Batuk',
            frequency: '3 x sehari 1/2 sendok takar (2.5 mL)',
            timing: 'Pagi, siang, dan malam sesudah makan',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Bantu dengan banyak minum air hangat'
          }
        ]);
        break;
      case 'gerd':
        setPatientName('Ibu Maya (36 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Lansoprazole 30 mg',
            indicationLabel: 'Pencegah Produksi Asam Lambung (PPI)',
            frequency: '1 x sehari 1 kapsul',
            timing: 'Pagi hari 30 - 60 menit SEBELUM sarapan',
            mealRelation: 'sebelum',
            isAntibioticMustFinish: false,
            specialInstructions: 'Telan utuh kapsul dengan air putih, jangan dikunyah',
            foodPrecautions: 'Hindari kopi, makanan pedas, dan berlemak'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Sukralfat Suspensi 500 mg/5 mL',
            indicationLabel: 'Pelapis Dinding Lambung',
            frequency: '3 x sehari 2 sendok takar (10 mL)',
            timing: '1 jam sebelum makan atau 2 jam sesudah makan',
            mealRelation: 'sebelum',
            isAntibioticMustFinish: false,
            specialInstructions: 'Kocok dahulu sebelum diminum. Beri jeda 1 jam dengan obat lain'
          }
        ]);
        break;
      case 'diare_anak':
        setPatientName('An. Sifa (2 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Oralit Sachet (200 mL)',
            indicationLabel: 'Cairan Rehidrasi Pengganti Elektrolit',
            frequency: 'Setiap kali anak buang air cair',
            timing: 'Berikan 1/2 hingga 1 gelas (100-200 mL) bertahap dengan sendok',
            mealRelation: 'bebas',
            isAntibioticMustFinish: false,
            specialInstructions: 'Larutkan 1 sachet dalam 200 mL air matang'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Zinc Dispersible Tablet 20 mg',
            indicationLabel: 'Regenerasi Dinding Usus Anak',
            frequency: '1 x sehari 1 tablet selama 10 hari',
            timing: 'Pagi hari sesudah makan',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: true,
            specialInstructions: 'WAJIB DIMINUM 10 HARI BERTURUT-TURUT MESKI DIARE SUDAH BERHENTI',
            foodPrecautions: 'Larutkan tablet dalam 1 sendok air matang atau ASI'
          }
        ]);
        break;
    }
  };

  // Auto-Fill single medication from database
  const handleAutoFillMedication = (medId: string, searchVal: string, matchedDrug?: Drug) => {
    const autoFilled = generatePioAutoFill(searchVal, matchedDrug);

    setMedications(prev => prev.map(m => {
      if (m.id === medId) {
        return {
          ...m,
          drugName: autoFilled.drugName || m.drugName,
          indicationLabel: autoFilled.indicationLabel || m.indicationLabel,
          frequency: autoFilled.frequency || m.frequency,
          mealRelation: autoFilled.mealRelation || m.mealRelation,
          timing: autoFilled.timing || m.timing,
          isAntibioticMustFinish: autoFilled.isAntibioticMustFinish !== undefined ? autoFilled.isAntibioticMustFinish : m.isAntibioticMustFinish,
          specialInstructions: autoFilled.specialInstructions || m.specialInstructions,
          foodPrecautions: autoFilled.foodPrecautions || m.foodPrecautions
        };
      }
      return m;
    }));

    setActiveSearchMedId(null);
    setAutoFillNotice(prev => ({ ...prev, [medId]: `✅ Terisi: ${autoFilled.indicationLabel}` }));
    setTimeout(() => {
      setAutoFillNotice(prev => {
        const copy = { ...prev };
        delete copy[medId];
        return copy;
      });
    }, 3500);
  };

  // Quick add a popular drug with full auto-fill
  const handleQuickAddPopularDrug = (drugName: string) => {
    const matchedDrug = drugs.find(d => d.name.toLowerCase().includes(drugName.toLowerCase()));
    const autoFilled = generatePioAutoFill(drugName, matchedDrug);

    const newEntry: PatientMedicationEntry = {
      id: `med-${Date.now()}`,
      drugName: autoFilled.drugName || drugName,
      indicationLabel: autoFilled.indicationLabel || 'Sesuai Resep',
      frequency: autoFilled.frequency || '1 x sehari 1 tablet',
      timing: autoFilled.timing || 'Pagi hari sesudah makan',
      mealRelation: autoFilled.mealRelation || 'sesudah',
      isAntibioticMustFinish: Boolean(autoFilled.isAntibioticMustFinish),
      specialInstructions: autoFilled.specialInstructions || '',
      foodPrecautions: autoFilled.foodPrecautions || ''
    };

    setMedications(prev => [...prev, newEntry]);
    setAddedToastMessage(drugName);
    setTimeout(() => {
      setAddedToastMessage(null);
    }, 2500);
  };

  // Automatically insert drug when sent from Monograph / Directory
  useEffect(() => {
    if (preselectedDrug) {
      handleQuickAddPopularDrug(preselectedDrug.name);
    }
  }, [preselectedDrug]);

  // Add Medication Row
  const handleAddMedication = () => {
    const newEntry: PatientMedicationEntry = {
      id: `med-${Date.now()}`,
      drugName: '',
      indicationLabel: '',
      frequency: '1 x sehari 1 tablet',
      timing: 'Pagi hari sesudah sarapan',
      mealRelation: 'sesudah',
      isAntibioticMustFinish: false
    };
    setMedications([...medications, newEntry]);
    setActiveSearchMedId(newEntry.id);
  };

  // Remove Medication Row
  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  // Update Medication Field
  const handleUpdateMedication = (id: string, field: keyof PatientMedicationEntry, value: any) => {
    setMedications(medications.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  // Generate WhatsApp Message Text
  const generatedWhatsAppText = useMemo(() => {
    const clinicName = clinicBranding?.clinicName || 'APOTEK & KLINIK SEHAT';
    const clinicPhone = clinicBranding?.phone || '';
    const pharmacistName = clinicBranding?.pharmacistName || 'Apoteker Penanggung Jawab';
    const sipaNumber = (clinicBranding?.pharmacistSipa || clinicBranding?.sipNumber) ? `SIPA: ${clinicBranding?.pharmacistSipa || clinicBranding?.sipNumber}` : '';
    const address = clinicBranding?.address || '';

    let text = `🏥 *${clinicName.toUpperCase()}*\n`;
    if (address) text += `📍 ${address}\n`;
    if (sipaNumber) text += `📜 ${sipaNumber}\n`;
    text += `👨‍⚕️ *Apoteker*: ${pharmacistName}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Halo *${patientName}* 👋\n`;
    text += `Terima kasih telah berkunjung ke fasilitas kami. Berikut adalah panduan dan pengingat resmi aturan minum obat Anda:\n\n`;

    text += `💊 *DAFTAR OBAT & ATURAN PAKAI:*\n\n`;

    medications.forEach((med, idx) => {
      text += `${idx + 1}. *${med.drugName}* ${med.indicationLabel ? `_(${med.indicationLabel})_` : ''}\n`;
      text += `   • *Aturan*: ${med.frequency}\n`;
      text += `   • *Waktu*: ${med.timing}\n`;

      let mealText = '';
      if (med.mealRelation === 'sebelum') mealText = 'Diminum 30-60 menit SEBELUM makan';
      else if (med.mealRelation === 'bersama') mealText = 'Diminum BERSAMA suapan makanan';
      else if (med.mealRelation === 'sesudah') mealText = 'Diminum SESUDAH makan';
      else mealText = 'Dapat diminum dengan atau tanpa makanan';
      text += `   • *Hubungan Makan*: ${mealText}\n`;

      if (med.isAntibioticMustFinish) {
        text += `   • ⚠️ *PERINGATAN: WAJIB DIHABISKAN sesuai durasi dokter!*\n`;
      }
      if (med.specialInstructions) {
        text += `   • 💡 *Petunjuk*: ${med.specialInstructions}\n`;
      }
      if (med.foodPrecautions) {
        text += `   • 🚫 *Pantangan*: ${med.foodPrecautions}\n`;
      }
      text += `\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🏠 *CARA PENYIMPANAN OBAT YANG BENAR:*\n`;
    text += `• Simpan di tempat sejuk (<25°C), kering, dan terhindar dari sinar matahari langsung.\n`;
    text += `• Jauhkan dari jangkauan anak-anak.\n`;
    text += `• Jangan simpan obat sirup/tablet di tempat lembap (seperti kamar mandi atau dekat kompor).\n\n`;

    if (generalDoctorNotes) {
      text += `📌 *Catatan Apoteker/Dokter*:\n${generalDoctorNotes}\n\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Jika ada pertanyaan mengenai aturan pakai atau timbul keluhan efek samping, silakan langsung membalas pesan WhatsApp ini.\n\n`;
    text += `Semoga lekas sembuh dan sehat selalu! 🙏✨`;

    return text;
  }, [clinicBranding, patientName, medications, generalDoctorNotes]);

  // Open Direct WhatsApp Link
  const handleOpenWhatsAppDirect = () => {
    const encodedText = encodeURIComponent(generatedWhatsAppText);
    const targetUrl = `https://wa.me/${sanitizedWhatsAppPhone}?text=${encodedText}`;
    window.open(targetUrl, '_blank');
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedWhatsAppText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Trigger Print View
  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HERO BANNER - STANDARDIZED CLINICAL DEEP TEAL GRADIENT */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2f35] via-[#10424a] to-[#18444a] p-6 sm:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <MessageSquare className="w-48 h-48 text-teal-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold font-outfit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pelayanan Informasi Obat (PIO) &amp; Edukasi Digital Standar Permenkes 73/2016</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Kartu PIO Pasien Siap Kirim WhatsApp
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/80 font-medium">
                  Buat ringkasan jadwal aturan minum obat yang rapi, pantangan makanan, dan instruksi penyimpanan, lalu kirimkan langsung ke WhatsApp pasien hanya dengan 1 kali klik!
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                <Layers className="w-3.5 h-3.5 text-[#3dbfd1]" />
                <span>Jadwal &amp; Aturan Minum Presisi</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pantangan Makanan &amp; Interaksi</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                <Smartphone className="w-3.5 h-3.5 text-cyan-300" />
                <span>Kirim 1-Klik ke WhatsApp Pasien</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Format Edukasi PIO:</span>
              <span className="text-lg font-black text-teal-300">WhatsApp &amp; Kartu Cetak</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK TEMPLATES PRESETS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mr-1 font-outfit">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          Template Resep Cepat:
        </span>
        <button
          onClick={() => handleLoadPreset('hipertensi')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition cursor-pointer"
        >
          🫀 Paket Hipertensi
        </button>
        <button
          onClick={() => handleLoadPreset('diabetes')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition cursor-pointer"
        >
          🩸 Paket Diabetes
        </button>
        <button
          onClick={() => handleLoadPreset('ispa')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition cursor-pointer"
        >
          🤧 Paket Batuk Pilek / ISPA
        </button>
        <button
          onClick={() => handleLoadPreset('gerd')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition cursor-pointer"
        >
          🔥 Paket Maag / GERD
        </button>
        <button
          onClick={() => handleLoadPreset('diare_anak')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition cursor-pointer"
        >
          👶 Paket Diare Anak (Zinc + Oralit)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: EDITOR FORM */}
        <div className="lg:col-span-6 space-y-6">
          {/* Patient Details Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 font-outfit">
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Informasi Pasien Penerima Edukasi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-1">Nama Pasien</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  placeholder="cth. Bpk. Hendra"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-1">
                  Nomor WhatsApp Pasien <span className="text-emerald-600 dark:text-emerald-400 font-bold">*Wajib</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none focus:border-emerald-500"
                    placeholder="081234567890"
                  />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Format tujuan: <strong>+{sanitizedWhatsAppPhone}</strong>
                </span>
              </div>
            </div>

            {/* Clinic Branding Indicator */}
            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <div className="text-xs">
                  <span className="text-slate-900 dark:text-slate-300 font-bold">{clinicBranding.clinicName || 'Apotek Anda'}</span>
                  <span className="text-slate-500 block text-[11px]">{clinicBranding.pharmacistName || 'Apoteker Penanggung Jawab'} ({clinicBranding.pharmacistSipa || clinicBranding.sipNumber || 'SIPA'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medications Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 font-outfit">
                  <Pill className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Daftar Obat Pasien ({medications.length} Obat)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Ketik nama obat untuk mendapatkan saran aturan pakai & edukasi otomatis.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowMonographModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-500/15 hover:bg-amber-100 dark:hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 transition shadow-2xs cursor-pointer shrink-0"
                  title="Buka katalog monografi obat cepat"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>⚡ Katalog Monografi</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Obat
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {medications.map((med, idx) => {
                const searchQ = (med.drugName || '').toLowerCase().trim();
                const matchingSuggestions = searchQ.length > 0 && activeSearchMedId === med.id
                  ? (drugs.length > 0 ? drugs : []).filter(d => 
                      d.name.toLowerCase().includes(searchQ) || 
                      (d.genericName && d.genericName.toLowerCase().includes(searchQ)) ||
                      (d.category && d.category.toLowerCase().includes(searchQ))
                    ).slice(0, 6)
                  : [];

                const matchedMasterDrug = (drugs || []).find(d => 
                  d.name.toLowerCase() === (med.drugName || '').toLowerCase() || 
                  (d.genericName && (med.drugName || '').toLowerCase().includes(d.genericName.toLowerCase())) ||
                  ((med.drugName || '').toLowerCase().includes(d.name.toLowerCase()))
                );

                return (
                  <div
                    key={med.id}
                    className="bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          Obat #{idx + 1}
                        </span>
                        {autoFillNotice[med.id] && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full animate-in fade-in">
                            {autoFillNotice[med.id]}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {matchedMasterDrug && onSelectDrugForDetail && (
                          <button
                            type="button"
                            onClick={() => onSelectDrugForDetail(matchedMasterDrug)}
                            className="px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 transition flex items-center gap-1 cursor-pointer"
                            title="Buka monografi farmakologi klinis lengkap obat ini"
                          >
                            <BookOpen className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                            <span>Monografi</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleAutoFillMedication(med.id, med.drugName, matchedMasterDrug)}
                          className="px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition flex items-center gap-1 cursor-pointer"
                          title="Auto-isi edukasi & aturan minum berdasarkan nama obat"
                        >
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>Auto-Isi PIO</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(med.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                          title="Hapus obat"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Nama & Kekuatan Obat (dengan Autocomplete Dropdown) */}
                      <div className="relative">
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-400 mb-1">
                          Nama & Kekuatan Obat <span className="text-emerald-600 dark:text-emerald-400 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          value={med.drugName}
                          onFocus={() => setActiveSearchMedId(med.id)}
                          onChange={(e) => {
                            handleUpdateMedication(med.id, 'drugName', e.target.value);
                            setActiveSearchMedId(med.id);
                          }}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-bold shadow-2xs"
                          placeholder="Ketik cth. Amlodipine 10 mg / Metformin"
                        />

                        {/* Floating Autocomplete Suggestions */}
                        {activeSearchMedId === med.id && matchingSuggestions.length > 0 && (
                          <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-900 border border-emerald-500 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                            <div className="p-1.5 bg-slate-50 dark:bg-slate-950 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                              <span>Pilih Obat Untuk Auto-Fill Otomatis:</span>
                              <button
                                type="button"
                                onClick={() => setActiveSearchMedId(null)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              >
                                ✕
                              </button>
                            </div>
                            {matchingSuggestions.map((d) => (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => handleAutoFillMedication(med.id, d.name, d)}
                                className="w-full p-2.5 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition flex items-center justify-between cursor-pointer group/item"
                              >
                                <div>
                                  <span className="font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-300 block">
                                    {d.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {d.genericName} • {d.category}
                                  </span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                                  ⚡ Terapkan
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Kegunaan / Indikasi Awam */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-400 mb-1">
                          Kegunaan / Indikasi Awam Pasien
                        </label>
                        <input
                          type="text"
                          value={med.indicationLabel}
                          onChange={(e) => handleUpdateMedication(med.id, 'indicationLabel', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-2xs"
                          placeholder="cth. Obat Penurun Tekanan Darah"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-400 mb-1">Aturan Pakai</label>
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => handleUpdateMedication(med.id, 'frequency', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-bold focus:outline-none focus:border-emerald-500 shadow-2xs"
                          placeholder="cth. 1 x sehari 1 tablet"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-400 mb-1">Hubungan dengan Makanan</label>
                        <select
                          value={med.mealRelation}
                          onChange={(e) => handleUpdateMedication(med.id, 'mealRelation', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold shadow-2xs"
                        >
                          <option value="sesudah">Sesudah Makan</option>
                          <option value="sebelum">Sebelum Makan (30-60 mnt)</option>
                          <option value="bersama">Bersama Suapan Makan</option>
                          <option value="bebas">Bebas (Dapat dg/tanpa makanan)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-400 mb-1">Waktu Minum Spesifik</label>
                        <input
                          type="text"
                          value={med.timing}
                          onChange={(e) => handleUpdateMedication(med.id, 'timing', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-2xs"
                          placeholder="cth. Pagi hari setelah sarapan"
                        />
                      </div>
                    </div>

                    {/* Petunjuk Khusus & Pantangan Makanan / Minuman */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 dark:text-slate-400 mb-1">
                          Petunjuk Khusus & Cara Pakai (Opsional)
                        </label>
                        <input
                          type="text"
                          value={med.specialInstructions || ''}
                          onChange={(e) => handleUpdateMedication(med.id, 'specialInstructions', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-300 focus:outline-none focus:border-emerald-500 shadow-2xs"
                          placeholder="cth. Minum teratur pada jam yang sama"
                        />
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 dark:text-slate-400 mb-1">
                          Pantangan Makanan / Minuman (Opsional)
                        </label>
                        <input
                          type="text"
                          value={med.foodPrecautions || ''}
                          onChange={(e) => handleUpdateMedication(med.id, 'foodPrecautions', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-800 dark:text-amber-200/90 focus:outline-none focus:border-emerald-500 shadow-2xs"
                          placeholder="cth. Kurangi garam dan hindari jus grapefruit"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200 dark:border-slate-900">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={med.isAntibioticMustFinish}
                          onChange={(e) => handleUpdateMedication(med.id, 'isAntibioticMustFinish', e.target.checked)}
                          className="rounded accent-emerald-600 w-3.5 h-3.5"
                        />
                        <span className="text-amber-700 dark:text-amber-300 font-bold text-[11px]">
                          ⚠️ Tandai sebagai Antibiotik (Wajib Dihabiskan)
                        </span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW & ACTION BAR */}
        <div className="lg:col-span-6 space-y-6">
          {/* Action Trigger Buttons */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-outfit">
                Aksi Pengiriman Edukasi Pasien
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActivePreviewMode('whatsapp')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${activePreviewMode === 'whatsapp' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  <Smartphone className="w-3.5 h-3.5 inline mr-1" />
                  Format WA
                </button>
                <button
                  onClick={() => setActivePreviewMode('card')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${activePreviewMode === 'card' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Kartu Digital
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleOpenWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-md shadow-emerald-600/20 transition transform active:scale-95 cursor-pointer font-outfit"
              >
                <Send className="w-4 h-4" />
                Kirim via WhatsApp (1-Klik)
              </button>

              <button
                onClick={handleCopyToClipboard}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer font-outfit"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Teks Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Pesan WhatsApp
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PREVIEW CONTAINER */}
          {activePreviewMode === 'whatsapp' ? (
            /* SMARTPHONE WHATSAPP CHAT MOCKUP */
            <div className="bg-[#0b141a] border border-slate-800 rounded-3xl p-4 shadow-2xl overflow-hidden max-w-md mx-auto relative">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pb-3 border-b border-[#202c33]">
                <span className="font-semibold text-emerald-400">WhatsApp Chat Pasien</span>
                <span>+{sanitizedWhatsAppPhone}</span>
              </div>

              {/* Chat Header */}
              <div className="flex items-center gap-2.5 py-3 px-2 border-b border-[#202c33] bg-[#202c33]/40 rounded-xl my-2">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {clinicBranding.clinicName ? clinicBranding.clinicName.charAt(0) : 'A'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{clinicBranding.clinicName || 'Apotek Sehat Medika'}</h4>
                  <span className="text-[10px] text-emerald-400">Online • Layanan Informasi Obat</span>
                </div>
              </div>

              {/* Chat Message Bubble */}
              <div className="my-3 bg-[#005c4b] text-white rounded-2xl rounded-tl-sm p-4 text-xs shadow-md space-y-2.5 font-sans leading-relaxed border border-emerald-700/40">
                <div className="whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed select-text">
                  {generatedWhatsAppText}
                </div>
                <div className="flex justify-end items-center gap-1 text-[10px] text-emerald-200/80 pt-1">
                  <span>10:00</span>
                  <Check className="w-3 h-3 text-sky-300 inline" />
                </div>
              </div>
            </div>
          ) : (
            /* PRINTABLE VISUAL PIO CARD */
            <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-emerald-800 uppercase tracking-tight">
                    {clinicBranding.clinicName || 'APOTEK SEHAT MEDIKA'}
                  </h3>
                  <p className="text-[11px] text-slate-600">{clinicBranding.address || 'Jl. Layanan Kesehatan No. 1'}</p>
                  <p className="text-[10px] text-slate-500">Apoteker: {clinicBranding.pharmacistName} | {clinicBranding.pharmacistSipa || clinicBranding.sipNumber}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    KARTU INFORMASI OBAT
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">Pasien: <strong>{patientName}</strong></span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-emerald-700">Jadwal Minum Obat:</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-emerald-50 text-emerald-900 border-b border-slate-200">
                      <tr>
                        <th className="p-2">Nama Obat</th>
                        <th className="p-2">Aturan</th>
                        <th className="p-2">Waktu & Hubungan Makan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {medications.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2 font-bold text-slate-900">
                            {m.drugName}
                            <span className="block text-[10px] text-slate-500 font-normal">{m.indicationLabel}</span>
                          </td>
                          <td className="p-2 font-semibold text-emerald-700">{m.frequency}</td>
                          <td className="p-2 text-[11px] text-slate-700">
                            {m.timing} ({m.mealRelation})
                            {m.isAntibioticMustFinish && <span className="block text-[10px] font-bold text-rose-600">⚠️ Habiskan</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                <span>Konsultasi WA: {clinicBranding.phone || '+62 812-xxxx-xxxx'}</span>
                <button
                  onClick={handlePrintCard}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition"
                >
                  <Printer className="w-3 h-3" />
                  Cetak Kartu Fisik
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Monograph Catalog Popover / Modal */}
      {showMonographModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-outfit">
                    Katalog Cepat Monografi Obat (Auto-Fill PIO)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pilih obat untuk langsung mengisi 7 kolom aturan pakai & edukasi pasien secara otomatis
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMonographModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Category Tabs */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={pioCategorySearch}
                  onChange={(e) => setPioCategorySearch(e.target.value)}
                  placeholder="Cari nama obat, generik, atau indikasi..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-2xs"
                />
                {pioCategorySearch && (
                  <button
                    type="button"
                    onClick={() => setPioCategorySearch('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {PIO_DRUG_CATEGORIES.map((cat) => {
                  const isActive = selectedPioCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedPioCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drug Grid Content */}
            <div className="p-4 overflow-y-auto max-h-[45vh] space-y-2">
              {addedToastMessage && (
                <div className="p-2.5 mb-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Obat <strong>"{addedToastMessage}"</strong> berhasil ditambahkan ke daftar pasien!</span>
                </div>
              )}

              {(() => {
                const currentCat = PIO_DRUG_CATEGORIES.find(c => c.id === selectedPioCategory) || PIO_DRUG_CATEGORIES[0];
                let displayedItems: { name: string; drugObj?: Drug }[] = [];

                if (selectedPioCategory === 'populer') {
                  displayedItems = POPULAR_PIO_DRUGS
                    .filter(name => !pioCategorySearch || name.toLowerCase().includes(pioCategorySearch.toLowerCase()))
                    .map(name => {
                      const match = (drugs || []).find(d => d.name.toLowerCase().includes(name.toLowerCase()) || (d.genericName && name.toLowerCase().includes(d.genericName.toLowerCase())));
                      return { name, drugObj: match };
                    });
                } else if (selectedPioCategory === 'semua') {
                  displayedItems = (drugs || [])
                    .filter(d => !pioCategorySearch || d.name.toLowerCase().includes(pioCategorySearch.toLowerCase()) || (d.genericName && d.genericName.toLowerCase().includes(pioCategorySearch.toLowerCase())))
                    .slice(0, 50)
                    .map(d => ({ name: d.name, drugObj: d }));
                } else {
                  const kws = currentCat.keywords || [];
                  displayedItems = (drugs || [])
                    .filter(d => {
                      const combined = (d.name + ' ' + (d.genericName || '') + ' ' + (d.category || '')).toLowerCase();
                      const matchesCat = kws.some(kw => combined.includes(kw));
                      const matchesSearch = !pioCategorySearch || combined.includes(pioCategorySearch.toLowerCase());
                      return matchesCat && matchesSearch;
                    })
                    .slice(0, 50)
                    .map(d => ({ name: d.name, drugObj: d }));
                }

                if (displayedItems.length === 0) {
                  return (
                    <div className="py-8 text-center text-xs text-slate-500">
                      Tidak ditemukan obat monografi yang cocok dengan "{pioCategorySearch}".
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {displayedItems.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickAddPopularDrug(item.name)}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700/60 transition cursor-pointer flex items-center justify-between gap-2 group/card"
                      >
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/card:text-emerald-700 dark:group-hover/card:text-emerald-300 block truncate">
                            {item.name}
                          </span>
                          {item.drugObj?.category && (
                            <span className="text-[10px] text-slate-500 group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400/80 block truncate">
                              {item.drugObj.category}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-200 dark:bg-slate-900 group-hover/card:bg-emerald-600 text-slate-700 dark:text-slate-400 group-hover/card:text-white transition shrink-0">
                          <Plus className="w-3 h-3" />
                          Pilih
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                💡 Anda dapat memilih beberapa obat sekaligus.
              </span>
              <button
                type="button"
                onClick={() => setShowMonographModal(false)}
                className="px-4 py-1.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
              >
                Selesai ({medications.length} Obat di Resep)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
