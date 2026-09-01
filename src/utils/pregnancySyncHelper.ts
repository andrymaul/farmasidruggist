import { Drug } from '../types';
import { 
  PREGNANCY_LACTATION_DATABASE, 
  PregnancyLactationDrug, 
  FdaPregnancyCategory, 
  HalesLactationRating 
} from '../data/pregnancyLactationData';

/**
 * Normalizes drug name strings for accurate cross-database matching.
 * Strips salts, dosage notations, parentheses, and common generic prefixes.
 */
export function normalizeDrugNameForMatching(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // remove (Extended Release), (Oral), etc.
    .replace(/\b(hydrochloride|hcl|sodium|potassium|calcium|maleate|sulfate|succinate|trihydrate|hydrate|dipropionate|propionate|besylate|mesylate|tartrate|fumarate|er|xr|sr|oros|cr|mdi)\b/gi, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intelligently retrieves the verified Pregnancy & Lactation profile for a given Drug monograph.
 */
export function getPregnancySafetyProfile(drug: Drug | null | undefined): PregnancyLactationDrug | null {
  if (!drug) return null;

  // 1. Direct ID match
  const directId = `preg-${drug.id.replace(/^drug-/, '')}`;
  const matchById = PREGNANCY_LACTATION_DATABASE.find(
    (d) => d.id === directId || d.id === drug.id || d.id === drug.ddinterId
  );
  if (matchById) return matchById;

  const normalizedDrugName = normalizeDrugNameForMatching(drug.name);
  const normalizedGenericName = normalizeDrugNameForMatching(drug.genericName);

  // 2. Direct Name / Generic Match
  for (const item of PREGNANCY_LACTATION_DATABASE) {
    const itemNormName = normalizeDrugNameForMatching(item.name);
    const itemNormGeneric = normalizeDrugNameForMatching(item.genericName);

    if (
      normalizedDrugName === itemNormName ||
      normalizedGenericName === itemNormGeneric ||
      normalizedDrugName === itemNormGeneric ||
      normalizedGenericName === itemNormName
    ) {
      return item;
    }

    // 3. Check within brand names
    if (drug.brandNames && drug.brandNames.length > 0) {
      const matchBrand = drug.brandNames.some((b) => {
        const bNorm = normalizeDrugNameForMatching(b);
        return bNorm === itemNormName || item.brandNames?.some((ib) => normalizeDrugNameForMatching(ib) === bNorm);
      });
      if (matchBrand) return item;
    }

    // 4. Substring / Token matching for complex generics (e.g. "Amoxicillin + Clavulanate" vs "Amoxicillin-Clavulanate")
    if (
      (itemNormName.includes(normalizedGenericName) && normalizedGenericName.length > 4) ||
      (normalizedGenericName.includes(itemNormName) && itemNormName.length > 4)
    ) {
      return item;
    }
  }

  return null;
}

/**
 * Returns color-coded visual styling for FDA Pregnancy Categories.
 */
export function getFdaCategoryBadgeStyle(category?: string | null): {
  bg: string;
  text: string;
  border: string;
  badgeLabel: string;
  riskDescription: string;
} {
  const cat = (category || '').toUpperCase().trim();
  switch (cat) {
    case 'A':
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-950/80',
        text: 'text-emerald-900 dark:text-emerald-200',
        border: 'border-emerald-300 dark:border-emerald-700',
        badgeLabel: 'Kategori A (Aman Terbukti)',
        riskDescription: 'Studi terkontrol pada wanita hamil tidak menunjukkan risiko pada janin di semua trimester.'
      };
    case 'B':
      return {
        bg: 'bg-teal-100 dark:bg-teal-950/80',
        text: 'text-teal-900 dark:text-teal-200',
        border: 'border-teal-300 dark:border-teal-700',
        badgeLabel: 'Kategori B (Aman / Lini 1)',
        riskDescription: 'Studi reproduksi hewan tidak menunjukkan risiko janin; data manusia menunjukkan keamanan tinggi.'
      };
    case 'C':
      return {
        bg: 'bg-amber-100 dark:bg-amber-950/80',
        text: 'text-amber-900 dark:text-amber-200',
        border: 'border-amber-300 dark:border-amber-700',
        badgeLabel: 'Kategori C (Perhatian / Manfaat > Risiko)',
        riskDescription: 'Gunakan jika potensi manfaat klinis maternal melebihi potensi risiko pada janin.'
      };
    case 'D':
      return {
        bg: 'bg-orange-100 dark:bg-orange-950/80',
        text: 'text-orange-950 dark:text-orange-200',
        border: 'border-orange-400 dark:border-orange-700',
        badgeLabel: 'Kategori D (Bukti Positif Risiko Janin)',
        riskDescription: 'Ada bukti risiko pada janin manusia. Hindari kecuali dalam situasi gawat darurat yang mengancam jiwa.'
      };
    case 'X':
      return {
        bg: 'bg-rose-100 dark:bg-rose-950/90',
        text: 'text-rose-950 dark:text-rose-200',
        border: 'border-rose-400 dark:border-rose-800',
        badgeLabel: 'Kategori X (KONTRAINDIKASI MUTLAK)',
        riskDescription: 'Teratogen terbukti. Risiko penggunaan jelas melebihi manfaat apapun. DILARANG KERAS PADA WANITA HAMIL.'
      };
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-800 dark:text-slate-200',
        border: 'border-slate-300 dark:border-slate-600',
        badgeLabel: `Kategori ${category || 'N/A'}`,
        riskDescription: 'Konsultasikan rasio manfaat dan risiko dengan dokter spesialis obgyn / apoteker.'
      };
  }
}

/**
 * Returns color-coded styling for Dr. Thomas Hale's Lactation Risk Scale (L1 to L5).
 */
export function getHaleBadgeStyle(rating?: HalesLactationRating | string | null): {
  bg: string;
  text: string;
  border: string;
  badgeLabel: string;
  safetyTitle: string;
} {
  const r = (rating || '').toUpperCase().trim();
  switch (r) {
    case 'L1':
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-950/80',
        text: 'text-emerald-900 dark:text-emerald-200',
        border: 'border-emerald-300 dark:border-emerald-700',
        badgeLabel: 'Hale L1 (Paling Aman / Safest)',
        safetyTitle: 'Kompatibel penuh dengan menyusui; transfer ke ASI sangat minimal (<2% RID).'
      };
    case 'L2':
      return {
        bg: 'bg-teal-100 dark:bg-teal-950/80',
        text: 'text-teal-900 dark:text-teal-200',
        border: 'border-teal-300 dark:border-teal-700',
        badgeLabel: 'Hale L2 (Aman / Safer)',
        safetyTitle: 'Studi pada ibu menyusui menunjukkan tidak ada peningkatan efek samping pada bayi.'
      };
    case 'L3':
      return {
        bg: 'bg-amber-100 dark:bg-amber-950/80',
        text: 'text-amber-900 dark:text-amber-200',
        border: 'border-amber-300 dark:border-amber-700',
        badgeLabel: 'Hale L3 (Cukup Aman / Moderately Safe)',
        safetyTitle: 'Data terbatas; berikan jika manfaat melebihi risiko; pantau bayi terhadap efek sedasi/diare.'
      };
    case 'L4':
      return {
        bg: 'bg-orange-100 dark:bg-orange-950/80',
        text: 'text-orange-950 dark:text-orange-200',
        border: 'border-orange-400 dark:border-orange-700',
        badgeLabel: 'Hale L4 (Kemungkinan Berbahaya / Hazardous)',
        safetyTitle: 'Ada bukti risiko pada bayi menyusui atau penurunan produksi ASI. Gunakan alternatif yang lebih aman.'
      };
    case 'L5':
      return {
        bg: 'bg-rose-100 dark:bg-rose-950/90',
        text: 'text-rose-950 dark:text-rose-200',
        border: 'border-rose-400 dark:border-rose-800',
        badgeLabel: 'Hale L5 (KONTRAINDIKASI MENYUSUI)',
        safetyTitle: 'Dilarang keras saat menyusui! Obat masuk ke ASI dalam jumlah toksik bagi bayi.'
      };
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-800 dark:text-slate-200',
        border: 'border-slate-300 dark:border-slate-600',
        badgeLabel: `Hale ${rating || 'N/A'}`,
        safetyTitle: 'Data keamanan laktasi belum terklasifikasi secara lengkap.'
      };
  }
}
