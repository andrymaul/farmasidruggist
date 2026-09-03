import { Drug } from '../types';

export type BpomClassKey = 'bebas' | 'bebas-terbatas' | 'obat-keras' | 'oot' | 'prekursor' | 'psikotropika' | 'narkotika';

export function getBpomClassificationKey(drug: Drug): BpomClassKey {
  if (drug.bpomClassification) {
    switch (drug.bpomClassification) {
      case 'Obat Bebas': return 'bebas';
      case 'Obat Bebas Terbatas': return 'bebas-terbatas';
      case 'Obat Keras': return 'obat-keras';
      case 'Obat-Obat Tertentu': return 'oot';
      case 'Psikotropika': return 'psikotropika';
      case 'Prekursor Farmasi': return 'prekursor';
      case 'Narkotika': return 'narkotika';
    }
  }

  const str = (drug.name + ' ' + drug.genericName + ' ' + drug.category + ' ' + (drug.indication || '')).toLowerCase();

  // 1. NARKOTIKA (UU No. 35/2009 Golongan II & III)
  if (['kodein', 'codeine', 'morfin', 'morphine', 'fentanyl', 'pethidine', 'methadone', 'oxycodone', 'buprenorphine', 'narkotika'].some(k => str.includes(k))) {
    return 'narkotika';
  }

  // 2. PSIKOTROPIKA (UU No. 5/1997 Golongan II, III, IV)
  if (['diazepam', 'alprazolam', 'clonazepam', 'lorazepam', 'clobazam', 'midazolam', 'phenobarbital', 'nitrazepam', 'zolpidem', 'estazolam', 'chlordiazepoxide', 'methylphenidate', 'thiopental', 'tiopental', 'pentothal', 'psikotropika'].some(k => str.includes(k))) {
    return 'psikotropika';
  }

  // 3. PREKURSOR FARMASI (PP No. 44/2010 Tabel I & II)
  if (['pseudoephedrine', 'ephedrine', 'ergometrine', 'ergotamine', 'norepinephrine', 'epinephrine', 'kalium permanganat', 'prekursor'].some(k => str.includes(k))) {
    return 'prekursor';
  }

  // 4. OBAT-OBAT TERTENTU / OOT (PerBPOM No. 10/2019 & Regulasi OOT Khusus)
  if (['tramadol', 'trihexyphenidyl', 'chlorpromazine', 'amitriptyline', 'haloperidol', 'dextromethorphan', 'ketamine', 'ketamin', 'oot'].some(k => str.includes(k))) {
    return 'oot';
  }

  // 5. OBAT BEBAS TERBATAS (P.No. 1 s/d P.No. 6 - Lingkaran Biru Tepi Hitam)
  if (str.includes('terbatas') || ['cetirizine', 'loratadine', 'chlorpheniramine', 'ctm', 'dextromethorphan', 'bisacodyl', 'dimenhydrinate', 'guaifenesin', 'diphenhydramine', 'diphenhidramin', 'mebendazole', 'pyrantel', 'pirantel', 'ambroxol', 'bromhexine'].some(k => str.includes(k))) {
    return 'bebas-terbatas';
  }

  // 6. OBAT BEBAS (Lingkaran Hijau Tepi Hitam)
  if ((!str.includes('terbatas') && str.includes('bebas')) || ['paracetamol', 'sanmol', 'biogesic', 'antasida', 'antacid', 'vitamin c', 'vitamin b', 'asam folat', 'kalsium laktat'].some(k => str.includes(k))) {
    return 'bebas';
  }

  // 7. OBAT KERAS (Lingkaran Merah Huruf K Hitam) - Default untuk obat ber-resep
  return 'obat-keras';
}

export function getBpomBadge(drug: Drug) {
  const key = getBpomClassificationKey(drug);
  switch (key) {
    case 'narkotika':
      return { label: '🛑 Narkotika (Gol. II/III)', style: 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800 font-extrabold shadow-2xs' };
    case 'psikotropika':
      return { label: '🧠 Psikotropika', style: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800 font-extrabold shadow-2xs' };
    case 'prekursor':
      return { label: '🧪 Prekursor Farmasi', style: 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800 font-bold shadow-2xs' };
    case 'oot':
      return { label: '⚠️ Obat-Obat Tertentu (OOT)', style: 'bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700 font-bold shadow-2xs' };
    case 'bebas-terbatas':
      return { label: '🔵 Bebas Terbatas (W)', style: 'bg-sky-100 dark:bg-sky-950/60 text-sky-950 dark:text-sky-200 border-sky-300 dark:border-sky-800 font-bold shadow-2xs' };
    case 'bebas':
      return { label: '🟢 Obat Bebas (OTC)', style: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 font-bold shadow-2xs' };
    case 'obat-keras':
    default:
      return { label: '🔴 Obat Keras (K)', style: 'bg-red-100 dark:bg-red-950/60 text-red-950 dark:text-red-200 border-red-300 dark:border-red-800 font-bold shadow-2xs' };
  }
}

export function getBpomLabel(key: string): string {
  switch (key) {
    case 'bebas': return '🟢 Obat Bebas (OTC)';
    case 'bebas-terbatas': return '🔵 Obat Bebas Terbatas (W)';
    case 'obat-keras': return '🔴 Obat Keras (K)';
    case 'oot': return '⚠️ Obat-Obat Tertentu (OOT)';
    case 'prekursor': return '🧪 Prekursor Farmasi';
    case 'psikotropika': return '🧠 Psikotropika';
    case 'narkotika': return '🛑 Narkotika (Gol. II/III)';
    default: return key;
  }
}

export function matchesCategoryFilter(drug: Drug, selectedCat: string): boolean {
  if (selectedCat === 'Semua Kategori') return true;
  const dStr = (drug.category + ' ' + drug.indication + ' ' + drug.name + ' ' + drug.genericName).toLowerCase();

  switch (selectedCat) {
    case 'Kardiovaskular':
      return ['kardiovaskular', 'hipertensi', 'jantung', 'statin', 'antikoagulan', 'antiplatelet', 'vasodilator', 'ace inhibitor', 'arb', 'arni', 'beta blocker', 'ccb', 'nitrat', 'if channel'].some(k => dStr.includes(k));
    case 'Antimikroba & Antivirus':
      return ['antimikroba', 'antibiotik', 'antivirus', 'antifungal', 'antijamur', 'sefalosporin', 'makrolida', 'aminoglikosida', 'quinolone', 'penisilin', 'karbapenem'].some(k => dStr.includes(k));
    case 'Sistem Saraf Pusat (SSP)':
      return ['ssp', 'saraf', 'psikiatri', 'antidepresan', 'antikejang', 'epilepsi', 'sedatif', 'ansiolitik', 'psikotropika', 'antipsikotik', 'ssri', 'snri', 'opioid', 'analgesik'].some(k => dStr.includes(k));
    case 'Endokrin & Diabetes':
      return ['endokrin', 'diabetes', 'insulin', 'tiroid', 'metformin', 'sulfonylurea', 'sglt-2', 'sglt2', 'dpp-4', 'dpp4', 'glp-1', 'glp1', 'gip', 'glukosa'].some(k => dStr.includes(k));
    case 'Saluran Cerna (GI)':
      return ['cerna', 'gi', 'gastrointestinal', 'ppi', 'antasid', 'antacid', 'lambung', 'ulkus', 'mual', 'antimuntah', 'laksatif', 'prokinetik'].some(k => dStr.includes(k));
    case 'Analgesik & Antiinflamasi (NSAID)':
      return ['analgesik', 'nsaid', 'antiinflamasi', 'nyeri', 'parasetamol', 'paracetamol', 'ibuprofen', 'asam mefenamat', 'cox-2', 'ketorolac', 'meloxicam', 'celecoxib'].some(k => dStr.includes(k));
    case 'Respirasi & Alergi':
      return ['respirasi', 'alergi', 'asma', 'antihistamin', 'bronkodilator', 'batuk', 'flu', 'rhinitis', 'laba', 'lama', 'sama', 'kortikosteroid inhalasi'].some(k => dStr.includes(k));
    case 'Imunosupresan & Onkologi':
      return ['imuno', 'onkologi', 'kanker', 'kemoterapi', 'antineoplastik', 'sitostatis', 'dmard', 'kalsineurin', 'antimetabolit'].some(k => dStr.includes(k));
    case 'Ginjal & Metabolik':
      return ['ginjal', 'metabolik', 'diuretik', 'asam urat', 'fibrat', 'trigliserida', 'kolesterol', 'hipolipidemik', 'mra'].some(k => dStr.includes(k));
    case 'Mata & THT (Oftalmologi & Otologi)':
      return ['mata', 'tht', 'oftalmologi', 'glaukoma', 'tetes mata', 'timolol', 'latanoprost', 'travoprost', 'brimonidine', 'kloramfenikol tetes', 'telinga', 'otitis', 'cendo', 'karbogliserin', 'polimiksin'].some(k => dStr.includes(k));
    case 'Dermatologi & Topikal Kulit':
      return ['dermatologi', 'kulit', 'topikal', 'salep', 'krim', 'gel', 'hidrokortison', 'betametason', 'mometason', 'desoksimetason', 'gentamisin krim', 'ketokonazol krim', 'mikonazol', 'klotrimazol', 'permetrin', 'acne', 'jerawat'].some(k => dStr.includes(k));
    case 'Vitamin, Mineral & Nutrisi Klinis':
      return ['vitamin', 'mineral', 'nutrisi', 'suplemen', 'asam folat', 'kalsium', 'calcium', 'besi', 'ferrous', 'b12', 'sianokobalamin', 'tiamin', 'piridoksin', 'asam askorbat', 'vitamin d', 'kolekalsiferol', 'zink', 'zinc'].some(k => dStr.includes(k));
    case 'Hematologi & Hemostasis':
      return ['hemostasis', 'hematologi', 'koagulasi', 'perdarahan', 'asam traneksamat', 'tranexamic', 'vitamin k', 'fitomenadion', 'faktor viii', 'fibrinogen', 'heparin', 'protamin'].some(k => dStr.includes(k));
    default:
      return dStr.includes(selectedCat.toLowerCase());
  }
}
