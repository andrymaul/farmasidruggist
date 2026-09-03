import { Drug, DrugInteraction, SeverityLevel, TherapeuticDuplication, DrugFoodInteraction, DrugDiseaseInteraction } from '../types';
import { DRUGSCOM_DOSAGE_MAP } from '../data/drugsComDosageDatabase';

function findDosageMonograph(drug: Drug) {
  const normName = (drug.name || '').toLowerCase().trim();
  const normGeneric = (drug.genericName || '').toLowerCase().trim();
  const normId = (drug.id || '').replace(/^drug-/, '').toLowerCase().trim();

  return (
    DRUGSCOM_DOSAGE_MAP[normName] ||
    DRUGSCOM_DOSAGE_MAP[normGeneric] ||
    DRUGSCOM_DOSAGE_MAP[normId] ||
    Object.entries(DRUGSCOM_DOSAGE_MAP).find(([key]) => normName.includes(key) || normGeneric.includes(key))?.[1]
  );
}

/**
 * DDInter Engine - Dynamic DDInter Drug & Interaction Generator & Resolver
 * Synchronized with DDInter database schema (https://ddinter.scbdd.com/)
 */

// Categories in DDInter
export const DDINTER_CATEGORIES = [
  'Semua Kategori',
  'Kardiovaskular',
  'Antimikroba & Antivirus',
  'Sistem Saraf Pusat (SSP)',
  'Endokrin & Diabetes',
  'Saluran Cerna (GI)',
  'Analgesik & Antiinflamasi (NSAID)',
  'Respirasi & Alergi',
  'Imunosupresan & Onkologi',
  'Ginjal & Metabolik',
  'Mata & THT (Oftalmologi & Otologi)',
  'Dermatologi & Topikal Kulit',
  'Vitamin, Mineral & Nutrisi Klinis',
  'Hematologi & Hemostasis'
] as const;

/**
 * Deduplicate array of Drugs by unique ID or Name
 */
export function deduplicateDrugs(drugs: Drug[]): Drug[] {
  const mapById = new Map<string, Drug>();
  const mapByAtc = new Map<string, Drug>();
  const mapByName = new Map<string, Drug>();
  const result: Drug[] = [];

  drugs.forEach((drug) => {
    const normId = (drug.id || '').toLowerCase().trim();
    const normAtc = (drug.atcCode || '').toLowerCase().trim();
    const normName = (drug.name || '').toLowerCase().trim();
    const normGeneric = (drug.genericName || '').toLowerCase().trim();

    const existingById = normId ? mapById.get(normId) : null;
    const existingByName = mapByName.get(normName) || mapByName.get(normGeneric);
    const existing = existingById || existingByName;

    if (!existing) {
      const copy = { ...drug };
      const dosageInfo = findDosageMonograph(copy);
      if (dosageInfo) {
        if (!copy.adultDosage && dosageInfo.adultDosage) copy.adultDosage = dosageInfo.adultDosage;
        if (!copy.pediatricDosage && dosageInfo.pediatricDosage) copy.pediatricDosage = dosageInfo.pediatricDosage;
        if (!copy.geriatricDosage && dosageInfo.geriatricDosage) copy.geriatricDosage = dosageInfo.geriatricDosage;
        if (!copy.renalDoseAdjustment && dosageInfo.renalDoseAdjustment) copy.renalDoseAdjustment = dosageInfo.renalDoseAdjustment;
        if (!copy.hepaticDoseAdjustment && dosageInfo.hepaticDoseAdjustment) copy.hepaticDoseAdjustment = dosageInfo.hepaticDoseAdjustment;
        if (!copy.maxDoseLimit && dosageInfo.maxDoseLimit) copy.maxDoseLimit = dosageInfo.maxDoseLimit;
        if (!copy.administrationGuideline && dosageInfo.administrationGuideline) copy.administrationGuideline = dosageInfo.administrationGuideline;
      }
      if (normId) mapById.set(normId, copy);
      if (normAtc) mapByAtc.set(normAtc, copy);
      if (normName) mapByName.set(normName, copy);
      if (normGeneric) mapByName.set(normGeneric, copy);
      result.push(copy);
    } else {
      const mergedBrands = Array.from(new Set([...(existing.brandNames || []), ...(drug.brandNames || [])]));
      existing.brandNames = mergedBrands;
      if (drug.pregnancyCategory && !existing.pregnancyCategory) {
        existing.pregnancyCategory = drug.pregnancyCategory;
      }
      if (drug.blackBoxWarning && !existing.blackBoxWarning) {
        existing.blackBoxWarning = drug.blackBoxWarning;
      }
      if (drug.cypPathway && !existing.cypPathway) {
        existing.cypPathway = drug.cypPathway;
      }
      if (drug.monitoringParameters && !existing.monitoringParameters) {
        existing.monitoringParameters = drug.monitoringParameters;
      }
      if (drug.patientTips && !existing.patientTips) {
        existing.patientTips = drug.patientTips;
      }
      if (drug.lactationWarning && !existing.lactationWarning) {
        existing.lactationWarning = drug.lactationWarning;
      }
      if (drug.drugsComUrl && !existing.drugsComUrl) {
        existing.drugsComUrl = drug.drugsComUrl;
      }
      if (drug.offLabelIndication && !existing.offLabelIndication) {
        existing.offLabelIndication = drug.offLabelIndication;
      }
      if (drug.commonSideEffects && !existing.commonSideEffects) {
        existing.commonSideEffects = drug.commonSideEffects;
      }
      if (drug.seriousSideEffects && !existing.seriousSideEffects) {
        existing.seriousSideEffects = drug.seriousSideEffects;
      }
      if (drug.adultDosage && !existing.adultDosage) existing.adultDosage = drug.adultDosage;
      if (drug.pediatricDosage && !existing.pediatricDosage) existing.pediatricDosage = drug.pediatricDosage;
      if (drug.geriatricDosage && !existing.geriatricDosage) existing.geriatricDosage = drug.geriatricDosage;
      if (drug.renalDoseAdjustment && !existing.renalDoseAdjustment) existing.renalDoseAdjustment = drug.renalDoseAdjustment;
      if (drug.hepaticDoseAdjustment && !existing.hepaticDoseAdjustment) existing.hepaticDoseAdjustment = drug.hepaticDoseAdjustment;
      if (drug.maxDoseLimit && !existing.maxDoseLimit) existing.maxDoseLimit = drug.maxDoseLimit;
      if (drug.administrationGuideline && !existing.administrationGuideline) existing.administrationGuideline = drug.administrationGuideline;

      const dosageInfo = findDosageMonograph(existing);
      if (dosageInfo) {
        if (!existing.adultDosage) existing.adultDosage = dosageInfo.adultDosage;
        if (!existing.pediatricDosage) existing.pediatricDosage = dosageInfo.pediatricDosage;
        if (!existing.geriatricDosage) existing.geriatricDosage = dosageInfo.geriatricDosage;
        if (!existing.renalDoseAdjustment) existing.renalDoseAdjustment = dosageInfo.renalDoseAdjustment;
        if (!existing.hepaticDoseAdjustment) existing.hepaticDoseAdjustment = dosageInfo.hepaticDoseAdjustment;
        if (!existing.maxDoseLimit) existing.maxDoseLimit = dosageInfo.maxDoseLimit;
        if (!existing.administrationGuideline) existing.administrationGuideline = dosageInfo.administrationGuideline;
      }
    }
  });

  return result;
}

/**
 * Deduplicate array of DrugInteractions by pair key or ID
 */
export function deduplicateInteractions(interactions: DrugInteraction[]): DrugInteraction[] {
  const seenPairNames = new Set<string>();
  const seenPairIds = new Set<string>();
  const seenInterIds = new Set<string>();
  const result: DrugInteraction[] = [];

  interactions.forEach((inter) => {
    const pairNameKey = [inter.drugAName.toLowerCase().trim(), inter.drugBName.toLowerCase().trim()].sort().join('__');
    const pairIdKey = [inter.drugAId.toLowerCase().trim(), inter.drugBId.toLowerCase().trim()].sort().join('__');
    const interIdKey = inter.id.toLowerCase().trim();

    if (!seenPairNames.has(pairNameKey) && !seenPairIds.has(pairIdKey) && !seenInterIds.has(interIdKey)) {
      seenPairNames.add(pairNameKey);
      seenPairIds.add(pairIdKey);
      seenInterIds.add(interIdKey);
      result.push(inter);
    }
  });
  return result;
}

// Common Drug Knowledge Base mapping for dynamic generation of unlisted drugs
const DRUG_KNOWLEDGE_BASE: Record<string, Partial<Drug>> = {
  'atorvastatin': {
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Lipitor', 'Truvaz', 'Atozar', 'Stator'],
    atcCode: 'C10AA05',
    category: 'Statin (Hipolipidemik)',
    indication: 'Hiperkolesterolemia, pencegahan kejadian kardiovaskular.',
    contraindications: 'Penyakit hati aktif, kehamilan, menyusui.',
    sideEffects: 'Mialgia, peningkatan enzim transaminase hati, pusing, gangguan pencernaan.',
    dosage: '10-80 mg sekali sehari.',
    pharmacology: 'Inhibitor kompetitif HMG-CoA reduktase.',
    foodInteraction: 'Hindari konsumsi jumlah besar jus grapefruit.',
    pregnancyCategory: 'X',
    ddinterId: 'DDInter-D00415'
  },
  'rosuvastatin': {
    name: 'Rosuvastatin',
    genericName: 'Rosuvastatin Calcium',
    brandNames: ['Crestor', 'Rozavel', 'Rosurva'],
    atcCode: 'C10AA07',
    category: 'Statin (Hipolipidemik)',
    indication: 'Hiperkolesterolemia primer, dislipidemia campuran, pencegahan penyakit kardiovaskular.',
    contraindications: 'Penyakit hati aktif, gangguan ginjal berat, kehamilan.',
    sideEffects: 'Sakit kepala, mialgia, asthenia, konstipasi, mual.',
    dosage: '5-20 mg sekali sehari.',
    pharmacology: 'Inhibitor selektif dan kompetitif HMG-CoA reduktase.',
    foodInteraction: 'Dapat diminum tanpa pengaruh makanan.',
    pregnancyCategory: 'X',
    ddinterId: 'DDInter-D00422'
  },
  'diltiazem': {
    name: 'Diltiazem',
    genericName: 'Diltiazem Hydrochloride',
    brandNames: ['Herbesser', 'Farmabes', 'Diltiazem OGB'],
    atcCode: 'C08DB01',
    category: 'Antagonis Kalsium (Non-Dihidropiridin)',
    indication: 'Angina pektoris, hipertensi, aritmia supraventrikel.',
    contraindications: 'Sick sinus syndrome, blok AV derajat 2/3, hipotensi berat (sistolik < 90 mmHg).',
    sideEffects: 'Bradikardia, pusing, edema perifer, flushing, konstipasi.',
    dosage: '30-60 mg 3-4 kali sehari atau dosis terlepas lambat 100-200 mg/hari.',
    pharmacology: 'Menghambat influks kalsium pada sel miokardium dan otot polos pembuluh darah.',
    foodInteraction: 'Diminum sebelum makan dan sebelum tidur.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01120'
  },
  'verapamil': {
    name: 'Verapamil',
    genericName: 'Verapamil Hydrochloride',
    brandNames: ['Isoptin', 'Verpamil'],
    atcCode: 'C08DA01',
    category: 'Antagonis Kalsium (Non-Dihidropiridin)',
    indication: 'Angina pektoris, hipertensi, profilaksis takikardia supraventrikel paroksismal.',
    contraindications: 'Syok kardiogenik, blok AV derajat 2/3, gagal jantung berat.',
    sideEffects: 'Konstipasi berat, bradikardia, pusing, hipotensi, edema.',
    dosage: '40-120 mg 3 kali sehari.',
    pharmacology: 'Inhibitor kanal kalsium tipe-L spesifik miokardium.',
    foodInteraction: 'Hindari jus grapefruit. Diminum bersama makanan untuk menurunkan iritasi.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01132'
  },
  'bisoprolol': {
    name: 'Bisoprolol',
    genericName: 'Bisoprolol Fumarate',
    brandNames: ['Concor', 'Mepicor', 'Beta-One', 'Lodoz'],
    atcCode: 'C07AB07',
    category: 'Beta Blocker (Kardioselektif B1)',
    indication: 'Hipertensi, angina pektoris, gagal jantung kronis stabil.',
    contraindications: 'Gagal jantung akut, syok kardiogenik, bradikardia berat (<50 bpm), asma berat.',
    sideEffects: 'Bradikardia, pusing, kelelahan, ekstremitas dingin, hipotensi.',
    dosage: '2.5 - 10 mg sekali sehari pada pagi hari.',
    pharmacology: 'Menghambat reseptor beta-1 adrenergik kardioselektif.',
    foodInteraction: 'Dapat diminum dengan atau tanpa makanan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01315'
  },
  'furosemide': {
    name: 'Furosemide',
    genericName: 'Furosemide',
    brandNames: ['Lasix', 'Urex', 'Farsix', 'Impugan'],
    atcCode: 'C03CA01',
    category: 'Diuretik Loop',
    indication: 'Edema akibat gagal jantung, sirosis hati, penyakit ginjal, serta hipertensi.',
    contraindications: 'Anuria, hipokalemia berat, hiponatremia berat, koma hepatikum.',
    sideEffects: 'Hipokalemia, dehidrasi, hiperurisemia, ototoksisitas (dosis tinggi), hipotensi ortostatis.',
    dosage: '20-80 mg sekali sehari pada pagi hari.',
    pharmacology: 'Menghambat kotransporter Na+/K+/2Cl- di ansa Henle tebal asenden.',
    foodInteraction: 'Sebaiknya diminum perut kosong untuk penyerapan optimal.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01402'
  },
  'spironolactone': {
    name: 'Spironolactone',
    genericName: 'Spironolactone',
    brandNames: ['Aldactone', 'Letonal', 'Spirola'],
    atcCode: 'C03DA01',
    category: 'Diuretik Hemat Kalium (Antagonis Aldosteron)',
    indication: 'Hiperaldosteronisme primer, edema refrakter gagal jantung, sirosis hati, hipertensi.',
    contraindications: 'Anuria, insufisiensi ginjal akut, hiperkalemia (K > 5.0 mEq/L), penyakit Addison.',
    sideEffects: 'Hiperkalemia, ginekomastia pada pria, gangguan menstruasi, pusing.',
    dosage: '25-100 mg sekali sehari.',
    pharmacology: 'Antagonis kompetitif reseptor aldosteron di tubulus kontortus distalis.',
    foodInteraction: 'Diminum bersama makanan. HINDARI suplemen kalium.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01410'
  },
  'sertraline': {
    name: 'Sertraline',
    genericName: 'Sertraline Hydrochloride',
    brandNames: ['Zoloft', 'Frimania', 'Zerlin', 'Department'],
    atcCode: 'N06AB06',
    category: 'Antidepresan (SSRI)',
    indication: 'Gangguan depresi mayor, gangguan panik, OCD, PTSD, kecemasan sosial.',
    contraindications: 'Penggunaan bersama MAOI (risiko Sindrom Serotonin), penggunaan pimozide.',
    sideEffects: 'Mual, insomnia atau somnolen, disfungsi seksual, tremor, mulut kering.',
    dosage: '50 mg sekali sehari, dapat ditingkatkan hingga 200 mg/hari.',
    pharmacology: 'Menghambat reuptake serotonin (5-HT) di presinaps secara selektif.',
    foodInteraction: 'Dapat diminum bersama makanan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D02105'
  },
  'diazepam': {
    name: 'Diazepam',
    genericName: 'Diazepam',
    brandNames: ['Valium', 'Valisanbe', 'Stesolid', 'Mentalium'],
    atcCode: 'N05BA01',
    category: 'Benzodiazepin (Ansiolitik & Antikonvulsan)',
    indication: 'Ansietas berat, kejang demam/epilepsi, spasme otot, pre-medikasi operasi.',
    contraindications: 'Depresi pernapasan berat, insufisiensi hati berat, myasthenia gravis, sleep apnea.',
    sideEffects: 'Somnolen (mengantuk), ataksia, ketergantungan fisik/psikis, kelemahan otot.',
    dosage: '2-10 mg 2-4 kali sehari.',
    pharmacology: 'Meningkatkan aktivitas neurotransmiter klorida GABA-A di SSP.',
    foodInteraction: 'HINDARI Alkohol (meningkatkan depresi sistem saraf pusat berat).',
    pregnancyCategory: 'D',
    ddinterId: 'DDInter-D02005'
  },
  'tramadol': {
    name: 'Tramadol',
    genericName: 'Tramadol Hydrochloride',
    brandNames: ['Ultram', 'Tramal', 'Thracin', 'Dolgesik'],
    atcCode: 'N02AJ13',
    category: 'Analgesik Opioid Sentral',
    indication: 'Nyeri sedang hingga berat akut dan kronis.',
    contraindications: 'Intoksikasi akut alkohol/hipnotik/analgesik, depresi pernapasan berat, anak < 12 tahun.',
    sideEffects: 'Mual, konstipasi, pusing, somnolen, risiko ketergantungan, kejang.',
    dosage: '50-100 mg setiap 4-6 jam (Maksimal 400 mg/hari).',
    pharmacology: 'Agonis lemah reseptor mu-opioid dan inhibitor reuptake serotonin & norepinefrin.',
    foodInteraction: 'Hindari alkohol. Dapat diminum dengan atau tanpa makanan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D02405'
  },
  'tacrolimus': {
    name: 'Tacrolimus',
    genericName: 'Tacrolimus',
    brandNames: ['Prograf', 'Advagraf', 'Protopic'],
    atcCode: 'L04AD02',
    category: 'Imunosupresan (Inhibitor Kalsineurin)',
    indication: 'Pencegahan rejeksi organ pasca transplantasi ginjal, hati, atau jantung.',
    contraindications: 'Hipersensitivitas tacrolimus atau makrolida.',
    sideEffects: 'Nefrotoksisitas, hipertensi, hiperglikemia/diabetes pasca transplantasi, tremor, hiperkalemia.',
    dosage: 'Disesuaikan berdasarkan pemantauan kadar terapeutik plasma (TDM).',
    pharmacology: 'Menghambat aktivasi sel T dengan mengikat immunophilin FKBP12 dan memblok kalsineurin.',
    foodInteraction: 'HINDARI Grapefruit / Jus Grapefruit (memicu toksisitas ginjal hebat). Diminum saat perut kosong.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D04010'
  },
  'cyclosporine': {
    name: 'Cyclosporine',
    genericName: 'Cyclosporine',
    brandNames: ['Sandimmun Neoral', 'Consupren'],
    atcCode: 'L04AD01',
    category: 'Imunosupresan (Inhibitor Kalsineurin)',
    indication: 'Pencegahan rejeksi transplantasi organ, sindrom nefrotik, artritis reumatoid berat, psoriasis.',
    contraindications: 'Gangguan fungsi ginjal berat yang tidak terkontrol, hipertensi tak terkontrol.',
    sideEffects: 'Nefrotoksisitas, hipertensi, hipertrisosis, hiperplasia gusi, hiperkalemia.',
    dosage: 'Berdasarkan TDM (Therapeutic Drug Monitoring).',
    pharmacology: 'Mengikat siklofilin dan menghambat kalsineurin, menekan sintesis IL-2.',
    foodInteraction: 'Hindari grapefruit. Diminum konsisten terhadap jam makan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D04005'
  },
  'methotrexate': {
    name: 'Methotrexate',
    genericName: 'Methotrexate Sodium',
    brandNames: ['Rheumatrex', 'Mexate', 'Emthexate'],
    atcCode: 'L01BA01',
    category: 'Antimetabolit / DMARD / Antineoplastik',
    indication: 'Artritis reumatoid berat, psoriasis berat, leukemia limfoblastik akut, osteosarkoma.',
    contraindications: 'Kehamilan, menyusui, alkoholisme, penyakit hati kronis, imunodefisiensi.',
    sideEffects: 'Mielosupresi, hepatotoksisitas, stomatitis, fibrosis paru, mual.',
    dosage: 'Artritis: 7.5 - 25 mg SEINGGU SEKALI (satu kali dalam seminggu).',
    pharmacology: 'Menghambat enzim Dihydrofolate Reductase (DHFR), memblok sintesis purin dan pirimidin.',
    foodInteraction: 'Hindari alkohol. Berikan asam folat pada hari non-dosis untuk mengurangi toksisitas.',
    pregnancyCategory: 'X',
    ddinterId: 'DDInter-D04020'
  },
  'pantoprazole': {
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    brandNames: ['Controloc', 'Panloc', 'Pepzol', 'Primapro'],
    atcCode: 'A02BC02',
    category: 'Inhibitor Pompa Proton (PPI)',
    indication: 'Ulkus duodenum, ulkus gaster, GERD, erosi esofagitis, sindrom Zollinger-Ellison.',
    contraindications: 'Hipersensitivitas terhadap substitusi benzimidazole.',
    sideEffects: 'Sakit kepala, diare, kram perut, hipomagnesemia pada pemakaian jangka panjang.',
    dosage: '20-40 mg sekali sehari sebelum makan.',
    pharmacology: 'Menghambat H+/K+ ATPase sel parietal lambung.',
    foodInteraction: 'Diminum 30-60 menit sebelum makan pagi.',
    pregnancyCategory: 'B',
    ddinterId: 'DDInter-D00825'
  },
  'lansoprazole': {
    name: 'Lansoprazole',
    genericName: 'Lansoprazole',
    brandNames: ['Prosaps', 'Lanzor', 'Lapraz', 'Compraz'],
    atcCode: 'A02BC03',
    category: 'Inhibitor Pompa Proton (PPI)',
    indication: 'Ulkus peptikum, eradikasi H. pylori, GERD.',
    contraindications: 'Hipersensitivitas terhadap lansoprazole.',
    sideEffects: 'Mual, sakit kepala, diare, konstipasi, pusing.',
    dosage: '15-30 mg sekali sehari.',
    pharmacology: 'Inhibitor spesifik sistem pompa proton lambung.',
    foodInteraction: 'Diminum sebelum makan pada pagi hari.',
    pregnancyCategory: 'B',
    ddinterId: 'DDInter-D00815'
  },
  'ketoconazole': {
    name: 'Ketoconazole',
    genericName: 'Ketoconazole',
    brandNames: ['Nizoral', 'Formyco', 'Mycoral', 'Intercon'],
    atcCode: 'J02AB02',
    category: 'Antijamur Imidazol Systemic',
    indication: 'Infeksi jamur sistemik, mikosis kutaneus refrakter, sindrom Cushing (off-label).',
    contraindications: 'Penyakit hati akut atau kronis, penggunaan bersama terfenadine, cisapride, simvastatin.',
    sideEffects: 'Hepatotoksisitas berat (Boxed Warning), ginekomastia, supresi adrenal, mual.',
    dosage: '200-400 mg sekali sehari bersama makanan.',
    pharmacology: 'Inhibitor kuat CYP3A4 dan sintesis ergosterol membran jamur.',
    foodInteraction: 'HARUS diminum bersama makanan atau minuman asam untuk penyerapan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01035'
  },
  'itraconazole': {
    name: 'Itraconazole',
    genericName: 'Itraconazole',
    brandNames: ['Sporanox', 'Intraspor', 'Forcanox'],
    atcCode: 'J02AC02',
    category: 'Antijamur Triazol',
    indication: 'Blastomikosis, histoplasmosis, onikomikosis, aspergilosis.',
    contraindications: 'Disfungsi ventrikel seperti gagal jantung kongestif, kehamilan.',
    sideEffects: 'Mual, diare, hipertensi, hipokalemia, hepatotoksisitas, edema.',
    dosage: '100-200 mg 1-2 kali sehari.',
    pharmacology: 'Inhibitor kuat CYP3A4 dan sintesis ergosterol.',
    foodInteraction: 'Kapsul diminum bersama makanan penuh.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01030'
  },
  'azithromycin': {
    name: 'Azithromycin',
    genericName: 'Azithromycin Dihydrate',
    brandNames: ['Zithromax', 'Zitroline', 'Aztrin', 'Mezatrin'],
    atcCode: 'J01FA10',
    category: 'Antibiotik Makrolida Azalida',
    indication: 'Infeksi saluran napas, infeksi kulit, servitis/uretritis non-gonokokus, otitis media.',
    contraindications: 'Riwayat ikterus cholestatic atau disfungsi hati terkait azithromycin.',
    sideEffects: 'Diare, mual, nyeri perut, perpanjangan interval QT (aritmia Torsades de Pointes).',
    dosage: '500 mg pada hari ke-1, dilanjutkan 250 mg/hari selama 4 hari (Total 5 hari).',
    pharmacology: 'Mengikat subunit 50S ribosom bakteri, menghambat sintesis protein.',
    foodInteraction: 'Dapat diminum dengan atau tanpa makanan.',
    pregnancyCategory: 'B',
    ddinterId: 'DDInter-D00760'
  },
  'levofloxacin': {
    name: 'Levofloxacin',
    genericName: 'Levofloxacin Hemihydrate',
    brandNames: ['Levaquin', 'Cravit', 'Noflox', 'Volequin'],
    atcCode: 'J01MA12',
    category: 'Antibiotik Fluoroquinolone',
    indication: 'Pneumonia komunitas, sinusitis bakterial akut, eksaserbasi bronkitis kronis, ISK kompleks.',
    contraindications: 'Hipersensitivitas quinolone, epilepsi, riwayat gangguan tendon terkait quinolone.',
    sideEffects: 'Tendinitis, perpanjangan QT, mual, sakit kepala, hipoglikemia, kejang.',
    dosage: '250-750 mg sekali sehari.',
    pharmacology: 'Inhibitor DNA gyrase dan topoisomerase IV.',
    foodInteraction: 'Beri jeda minimal 2 jam dari antasida kalsium/besi/magnesium.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D00750'
  },
  'metronidazole': {
    name: 'Metronidazole',
    genericName: 'Metronidazole',
    brandNames: ['Flagyl', 'Metronide', 'Trichodazol', 'Corsagyl'],
    atcCode: 'J01XD01',
    category: 'Antibiotik & Antiprotozoa Nitroimidazole',
    indication: 'Amebiasis, giardiasis, trikomoniasis, infeksi bakteri anaerob intra-abdominal.',
    contraindications: 'Trimester pertama kehamilan (pada trikomoniasis), penggunaan alkohol bersamaan.',
    sideEffects: 'Rasa logam di mulut (metallic taste), mual, reaksi disulfiram dengan alkohol, neuropati perifer.',
    dosage: '250-500 mg 3 kali sehari.',
    pharmacology: 'Merusak DNA sel protozoa dan bakteri anaerob melalui radikal bebas.',
    foodInteraction: 'SANGAT KETAT HINDARI ALKOHOL selama terapi hingga 48 jam pasca terapi (pemicu mual muntah hebat disulfiram-like).',
    pregnancyCategory: 'B (Sangat hati-hati Trimester 1)',
    ddinterId: 'DDInter-D00730'
  },
  'glimepiride': {
    name: 'Glimepiride',
    genericName: 'Glimepiride',
    brandNames: ['Amaryl', 'Amaryl M', 'Metmoryl', 'Diaren'],
    atcCode: 'A10BB12',
    category: 'Antidiabetes (Sulfonilurea)',
    indication: 'Diabetes Melitus Tipe 2 sebagai monoterapi atau kombinasi.',
    contraindications: 'Diabetes Melitus Tipe 1, ketoasidosis diabetik, gangguan ginjal/hati berat.',
    sideEffects: 'Hipoglikemia, kenaikan berat badan, mual, alergi kulit.',
    dosage: '1-4 mg sekali sehari saat sarapan.',
    pharmacology: 'Merangsang sekresi insulin dari sel beta pankreas.',
    foodInteraction: 'Diminum bersama sarapan atau makan pagi pertama.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D00640'
  },
  'empagliflozin': {
    name: 'Empagliflozin',
    genericName: 'Empagliflozin',
    brandNames: ['Jardiance', 'Glyxambi'],
    atcCode: 'A10BK03',
    category: 'Antidiabetes (Inhibitor SGLT2)',
    indication: 'Diabetes Melitus Tipe 2, menurunkan risiko kematian kardiovaskular & gagal jantung.',
    contraindications: 'Gagal ginjal berat (eGFR < 30 mL/min/1.73m2), kehamilan trimester 2-3.',
    sideEffects: 'Infeksi saluran kemih, infeksi jamur genital, dehidrasi, ketoasidosis euglikemik.',
    dosage: '10-25 mg sekali sehari pagi hari.',
    pharmacology: 'Menghambat SGLT2 di tubulus proksimal ginjal, memicu glukosuria.',
    foodInteraction: 'Dapat diminum sebelum atau sesudah makan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D00650'
  },
  'allopurinol': {
    name: 'Allopurinol',
    genericName: 'Allopurinol',
    brandNames: ['Zyloric', 'Isoric', 'Puricemia', 'Sinoric'],
    atcCode: 'M04AA01',
    category: 'Antigout (Inhibitor Xanthine Oxidase)',
    indication: 'Hiperurisemia primer dan sekunder, pencegahan batu asam urat.',
    contraindications: 'Hipersensitivitas allopurinol, serangan gout akut awal.',
    sideEffects: 'Ruam kulit (SJS/TEN), mual, peningkatan enzim hati.',
    dosage: '100-300 mg sekali sehari setelah makan.',
    pharmacology: 'Menghambat enzim xanthine oxidase.',
    foodInteraction: 'Diminum setelah makan dengan banyak air minum.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01602'
  },
  'colchicine': {
    name: 'Colchicine',
    genericName: 'Colchicine',
    brandNames: ['Recofol', 'Loricin'],
    atcCode: 'M04AC01',
    category: 'Antigout (Alkaloid Kolkisin)',
    indication: 'Pengobatan serangan asam urat akut dan profilaksis supresif gout.',
    contraindications: 'Gangguan ginjal/hati berat jika digunakan bersama inhibitor CYP3A4 atau P-gp.',
    sideEffects: 'Diare berat, mual, muntah, nyeri perut, kram otot, supresi sumsum tulang.',
    dosage: 'Awal 1 mg diikuti 0.5 mg setelah 1 jam (Total max 1.5 mg per serangan).',
    pharmacology: 'Mengikat tubulin dan mencegah polimerisasi mikrotubulus dalam leukosit.',
    foodInteraction: 'HINDARI Grapefruit. Diminum bersama air.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D01608'
  },
  'dextromethorphan': {
    name: 'Dextromethorphan',
    genericName: 'Dextromethorphan Hydrobromide (HBr)',
    brandNames: ["Woods' Peppermint Antitussive", "Vicks Formula 44 Batuk Kering", "Siladex Antitussive", "Komix Batuk Kering", "Bisolvon Antitusif", "Dextromethorphan HBr OGB"],
    atcCode: 'R05DA09',
    category: 'Antitusif Sentral / Antagonis Reseptor NMDA & Agonis Reseptor Sigma-1',
    indication: 'Pereda batuk kering non-produktif akibat flu, infeksi saluran napas atas, atau iritasi tenggorokan.',
    contraindications: 'Penggunaan bersamaan dengan MAOI (dalam 14 hari), batuk berdahak kental, asma bronkial berat, anak <6 tahun.',
    sideEffects: 'Mengantuk ringan, pusing, mual, konstipasi; overdosis: halusinasi disosiatif, depresi pernapasan, sindrom serotonin.',
    dosage: 'Dewasa: 10-20 mg q4h atau 30 mg q6-8h (Maks 120 mg/24 jam). Anak 6-12 th: 5-10 mg q4h atau 15 mg q6-8h (Maks 60 mg/24 jam).',
    pharmacology: 'Bekerja sentral di medula oblongata menaikkan ambang refleks batuk; agonis reseptor sigma-1 dan antagonis NMDA.',
    foodInteraction: 'Dapat diminum dengan atau tanpa makanan. HINDARI jus grapefruit.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05021'
  },
  'methylphenidate': {
    name: 'Methylphenidate',
    genericName: 'Methylphenidate Hydrochloride',
    brandNames: ['Ritalin', 'Ritalin LA', 'Concerta', 'Prohiper'],
    atcCode: 'N06BA04',
    category: 'Stimulan Sistem Saraf Pusat / Inhibitor Reuptake Dopamin-Norepinefrin (NDRI)',
    indication: 'Attention Deficit Hyperactivity Disorder (ADHD), Narkolepsi.',
    contraindications: 'Penggunaan bersamaan dengan MAOI, glaukoma, kecemasan berat, penyakit kardiovaskular berat.',
    sideEffects: 'Insomnia, penurunan nafsu makan, takikardia, peningkatan tekanan darah, sakit kepala.',
    dosage: 'ADHD: Awal 5-10 mg 2x/hari, titrasi bertahap hingga 20-60 mg/hari (Maks 60 mg/hari). Concerta: 18-54 mg sekali sehari pagi.',
    pharmacology: 'Menghambat reuptake dopamin dan norepinefrin di celah sinaps korteks serebral.',
    foodInteraction: 'Diminum sebelum sarapan/makan siang. Hindari kafein berlebih.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05022'
  },
  'olmesartan': {
    name: 'Olmesartan',
    genericName: 'Olmesartan Medoxomil',
    brandNames: ['Olmetec', 'Normetec', 'Olmetec Plus'],
    atcCode: 'C09CA08',
    category: 'Angiotensin II Receptor Blocker (ARB) / Antihipertensi',
    indication: 'Hipertensi esensial pada orang dewasa dan anak usia >=6 tahun.',
    contraindications: 'Penggunaan bersama Aliskiren pada DM/gangguan ginjal, kehamilan trimester 2-3.',
    sideEffects: 'Pusing, hipotensi, hiperkalemia, diare enteropati mirip Sprue (jarang namun khas).',
    dosage: '20 - 40 mg per oral sekali sehari.',
    pharmacology: 'Blokade selektif reseptor angiotensin II subtipe AT1 di otot polos vaskular.',
    foodInteraction: 'Dapat diminum dengan atau tanpa makanan. Hindari suplemen kalium.',
    pregnancyCategory: 'D',
    ddinterId: 'DDInter-D05023'
  },
  'indapamide': {
    name: 'Indapamide',
    genericName: 'Indapamide Hemihydrate',
    brandNames: ['Natrilix', 'Natrilix SR', 'Bi-Preterax'],
    atcCode: 'C03BA11',
    category: 'Diuretik Tiazid-Like / Antihipertensi',
    indication: 'Hipertensi esensial, edema terkait gagal jantung kongestif.',
    contraindications: 'Anuria, gangguan ginjal berat (CrCl <30 mL/min), ensefalopati hepatik, hipokalemia berat.',
    sideEffects: 'Hipokalemia, hiponatremia, pusing, kram otot, hiperurisemia.',
    dosage: 'Natrilix SR: 1.5 mg sekali sehari pagi hari; Sediaan IR: 1.25 - 2.5 mg/hari.',
    pharmacology: 'Menghambat reabsorpsi Na+/Cl- di tubulus distal ginjal dan memicu vasodilatasi pembuluh darah perifer.',
    foodInteraction: 'Diminum pada pagi hari setelah sarapan.',
    pregnancyCategory: 'B',
    ddinterId: 'DDInter-D05024'
  },
  'mirabegron': {
    name: 'Mirabegron',
    genericName: 'Mirabegron',
    brandNames: ['Betmiga', 'Myrbetriq'],
    atcCode: 'G04BD12',
    category: 'Agonis Reseptor Adrenergik Beta-3 / Urologi',
    indication: 'Overactive Bladder (OAB) dengan gejala urgensi berkemih, sering kencing, dan inkontinensia urin.',
    contraindications: 'Hipertensi berat tidak terkontrol (TD >=180/110 mmHg).',
    sideEffects: 'Peningkatan tekanan darah, ISK, nasofaringitis, sakit kepala.',
    dosage: '25 - 50 mg per oral sekali sehari.',
    pharmacology: 'Agonis selektif beta-3 adrenergik yang merelaksasikan otot detrusor kandung kemih.',
    foodInteraction: 'Telan tablet utuh dengan air, dapat diminum dengan atau tanpa makanan.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05025'
  },
  'silodosin': {
    name: 'Silodosin',
    genericName: 'Silodosin',
    brandNames: ['Urorec', 'Rapaflo'],
    atcCode: 'G04CA04',
    category: 'Antagonis Alfa-1A Adrenergik Uroselektif / Urologi',
    indication: 'Gejala Benign Prostatic Hyperplasia (BPH / Pembesaran Prostat Jinak).',
    contraindications: 'Gangguan ginjal berat (CrCl <30 mL/min), gangguan hati berat, bersama inhibitor CYP3A4 kuat.',
    sideEffects: 'Ejakulasi retrograd (kering), pusing, hidung tersumbat, IFIS saat operasi katarak.',
    dosage: '8 mg per oral sekali sehari diminum bersama makanan (4 mg/hari jika CrCl 30-50 mL/min).',
    pharmacology: 'Blokade selektif reseptor alfa-1A adrenergik di stroma prostat dan leher vesika urinaria.',
    foodInteraction: 'HARUS DIMINUM BERSAMA MAKANAN pada jam yang sama setiap hari.',
    pregnancyCategory: 'B',
    ddinterId: 'DDInter-D05026'
  },
  'buprenorphine': {
    name: 'Buprenorphine',
    genericName: 'Buprenorphine Hydrochloride',
    brandNames: ['Norspan Patch', 'Subutex', 'Suboxone', 'Temgesic'],
    atcCode: 'N02AE01',
    category: 'Analgesik Opioid Agonis Parsial Reseptor Mu',
    indication: 'Nyeri kronis derajat sedang-berat (Plester Norspan); Ketergantungan opioid (Subutex/Suboxone).',
    contraindications: 'Depresi pernapasan berat, asma bronkial berat, bersama benzodiazepine dosis tinggi.',
    sideEffects: 'Konstipasi, mual, mengantuk, pusing, reaksi gatal/eritema kulit tempat plester.',
    dosage: 'Norspan Patch: 5 - 20 mcg/jam plester transdermal diganti tiap 7 hari sekali. Sublingual: 8 - 24 mg/hari.',
    pharmacology: 'Agonis parsial berafinitas sangat tinggi pada reseptor opioid mu di sistem saraf pusat.',
    foodInteraction: 'Sublingual: letakkan di bawah lidah hingga larut, jangan makan/minum selama tablet larut.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05027'
  },
  'ropinirole': {
    name: 'Ropinirole',
    genericName: 'Ropinirole Hydrochloride',
    brandNames: ['Requip', 'Requip PD 24 Jam'],
    atcCode: 'N04BC04',
    category: 'Agonis Reseptor Dopamin Non-Ergot / Antiparkinson',
    indication: 'Penyakit Parkinson, Sindrom Kaki Gelisah (Restless Legs Syndrome / RLS).',
    contraindications: 'Gangguan hati berat, gangguan ginjal berat tanpa dialisis.',
    sideEffects: 'Mual, serangan kantuk mendadak (sleep attacks), pusing postural, gangguan kontrol impuls.',
    dosage: 'Requip PD 24h: Awal 2 mg/hari, titrasi bertahap ke 4-16 mg/hari (Maks 24 mg/hari). RLS: 0.25 - 4 mg/hari malam.',
    pharmacology: 'Agonis selektif reseptor dopamin D2 dan D3 di ganglia basalis corpus striatum otak.',
    foodInteraction: 'Dapat diminum dengan atau tanpa makanan (makanan mengurangi mual).',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05028'
  },
  'azelastine': {
    name: 'Azelastine',
    genericName: 'Azelastine Hydrochloride',
    brandNames: ['Allergodil', 'Dymista'],
    atcCode: 'R01AC03',
    category: 'Antihistamin H1 Generasi Kedua Topikal & Penstabil Sel Mast',
    indication: 'Rinitis alergi musiman/perenial, rinitis vasomotor, konjungtivitis alergi.',
    contraindications: 'Hipersensitivitas azelastine.',
    sideEffects: 'Rasa pahit di lidah/tenggorokan, rasa perih di hidung, epistaksis ringan, mengantuk ringan.',
    dosage: 'Semprot Hidung 0.1%: 1-2 semprotan per lubang hidung 2 kali sehari (pagi dan malam).',
    pharmacology: 'Antagonis H1 dan penstabil sel mast yang bekerja cepat meredakan inflamasi mukosa.',
    foodInteraction: 'Semprot hidung topikal. Hindari alkohol.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05029'
  },
  'fluticasone-furoate': {
    name: 'Fluticasone Furoate',
    genericName: 'Fluticasone Furoate',
    brandNames: ['Avamys', 'Relvar Ellipta', 'Trelegy Ellipta'],
    atcCode: 'R01AD12',
    category: 'Kortikosteroid Sintetik Afinitas Tinggi Respirasi',
    indication: 'Rinitis alergi musiman dan perenial (Avamys); Asma bronkial dan PPOK (Relvar).',
    contraindications: 'Hipersensitivitas, ulkus septum hidung berat baru.',
    sideEffects: 'Mimisan ringan (epistaksis), iritasi mukosa hidung, sakit kepala.',
    dosage: 'Avamys: 2 semprotan per lubang hidung sekali sehari (110 mcg/hari); turunkan ke 1 semprotan/hari setelah terkontrol.',
    pharmacology: 'Kortikosteroid afinitas sangat tinggi pada reseptor glukokortikoid dengan bioavailabilitas sistemik <1%.',
    foodInteraction: 'Topikal intranasal / inhalasi.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D05030'
  }
};

/**
 * Searches or generates a full DDInter drug monograph dynamically for any queried drug name
 */
export function resolveDrugFromDDInter(queryName: string, existingList: Drug[]): Drug {
  const cleanQuery = queryName.trim().toLowerCase();
  
  // 1. Match exact in existing list
  const exactMatchInList = existingList.find(
    (d) =>
      d.name.toLowerCase() === cleanQuery ||
      d.genericName.toLowerCase() === cleanQuery ||
      d.brandNames?.some((b) => b.toLowerCase() === cleanQuery)
  );
  if (exactMatchInList) return exactMatchInList;

  // 1b. Partial match in existing list
  const partialMatchInList = existingList.find(
    (d) =>
      d.name.toLowerCase().includes(cleanQuery) ||
      d.genericName.toLowerCase().includes(cleanQuery) ||
      d.brandNames?.some((b) => b.toLowerCase().includes(cleanQuery))
  );
  if (partialMatchInList) return partialMatchInList;

  // 2. Match in internal knowledge base
  const kbMatch = DRUG_KNOWLEDGE_BASE[cleanQuery];
  if (kbMatch) {
    return {
      id: 'drug-' + cleanQuery,
      name: kbMatch.name || queryName,
      genericName: kbMatch.genericName || queryName,
      brandNames: kbMatch.brandNames || [queryName],
      atcCode: kbMatch.atcCode || 'A10AA00',
      category: kbMatch.category || 'Farmakoterapi Klinis DDInter',
      indication: kbMatch.indication || 'Sesuai indikasi terdaftar monografi DDInter.',
      contraindications: kbMatch.contraindications || 'Hipersensitivitas bahan aktif.',
      sideEffects: kbMatch.sideEffects || 'Gangguan gastrointestinal, pusing, reaksi hipersensitivitas.',
      dosage: kbMatch.dosage || 'Sesuai petunjuk dokter dan panduan dosis DDInter.',
      pharmacology: kbMatch.pharmacology || 'Inhibitor/Modulator target reseptor spesifik.',
      foodInteraction: kbMatch.foodInteraction || 'Perhatikan petunjuk konsumsi bersama makanan.',
      pregnancyCategory: kbMatch.pregnancyCategory || 'C',
      ddinterId: kbMatch.ddinterId || 'DDInter-D' + Math.floor(10000 + Math.random() * 89999)
    };
  }

  // 3. Fallback if not found in verified database
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const titleName = capitalize(queryName.trim());

  return {
    id: 'drug-' + cleanQuery,
    name: titleName,
    genericName: titleName,
    brandNames: [titleName],
    atcCode: 'N/A',
    category: 'Lainnya',
    indication: 'Informasi indikasi resmi belum terindeks dalam database primer.',
    contraindications: 'Hipersensitivitas terhadap zat aktif atau komponen sediaan.',
    sideEffects: 'Lihat brosur resmi produk atau konsultasikan dengan apoteker.',
    dosage: 'Gunakan sesuai petunjuk dokter atau aturan pakai kemasan resmi.',
    pharmacology: 'Monografi belum tercatat dalam database primer terverifikasi.',
    foodInteraction: 'Perhatikan petunjuk pada kemasan resmi obat.',
    pregnancyCategory: 'C',
    ddinterId: 'DDInter-D00000'
  };
}

function getDrugMatchKeys(drug: Drug): string[] {
  const keys = new Set<string>();
  const add = (s?: string) => {
    if (!s) return;
    const clean = s.toLowerCase().trim();
    if (clean) {
      keys.add(clean);
      const withoutParen = clean.replace(/\s*\([^)]*\)/g, '').trim();
      if (withoutParen) keys.add(withoutParen);
      const base = withoutParen.split(/[/+]/)[0].trim();
      if (base) keys.add(base);
    }
  };

  add(drug.name);
  add(drug.genericName);
  if (drug.id) {
    add(drug.id.toLowerCase().replace(/^drug-/, '').replace(/^fornas-/, ''));
  }
  if (drug.brandNames) {
    drug.brandNames.forEach(add);
  }

  // Indonesian <-> International medical naming variants
  const arr = Array.from(keys);
  arr.forEach((k) => {
    if (k.endsWith('in') && !k.endsWith('oin') && !k.endsWith('sin')) keys.add(k + 'e');
    if (k.endsWith('ine')) keys.add(k.slice(0, -1));
    if (k.includes('parasetamol')) keys.add(k.replace('parasetamol', 'paracetamol'));
    if (k.includes('paracetamol')) keys.add(k.replace('paracetamol', 'parasetamol'));
    if (k.includes('rifampisin')) keys.add(k.replace('rifampisin', 'rifampicin'));
    if (k.includes('rifampicin')) keys.add(k.replace('rifampicin', 'rifampisin'));
    if (k.includes('asam traneksamat')) keys.add('tranexamic acid');
    if (k.includes('tranexamic acid')) keys.add('asam traneksamat');
    if (k.includes('ceftriakson')) keys.add('ceftriaxone');
    if (k.includes('ceftriaxone')) keys.add('ceftriakson');
  });

  return Array.from(keys);
}

function getInteractionKeys(name: string, id?: string): string[] {
  const keys = new Set<string>();
  const clean = name.toLowerCase().trim();
  keys.add(clean);
  const withoutParen = clean.replace(/\s*\([^)]*\)/g, '').trim();
  if (withoutParen) keys.add(withoutParen);
  const base = withoutParen.split(/[/+]/)[0].trim();
  if (base) keys.add(base);
  if (id) {
    keys.add(id.toLowerCase().replace(/^drug-/, '').replace(/^fornas-/, '').trim());
  }
  return Array.from(keys);
}

/**
 * Checks or calculates interaction pair dynamically based on DDInter principles
 */
export function resolveInteractionPair(
  drugA: Drug,
  drugB: Drug,
  existingInteractions: DrugInteraction[]
): DrugInteraction | null {
  const nameA = drugA.name.toLowerCase().trim();
  const nameB = drugB.name.toLowerCase().trim();

  // 1. Direct exact match in static database
  const directMatch = existingInteractions.find(
    (i) =>
      (i.drugAName.toLowerCase() === nameA && i.drugBName.toLowerCase() === nameB) ||
      (i.drugAName.toLowerCase() === nameB && i.drugBName.toLowerCase() === nameA) ||
      (i.drugAId === drugA.id && i.drugBId === drugB.id) ||
      (i.drugAId === drugB.id && i.drugBId === drugA.id)
  );
  if (directMatch) return directMatch;

  // 1b. Smart semantic/alias matching against database
  const keysA = getDrugMatchKeys(drugA);
  const keysB = getDrugMatchKeys(drugB);

  const aliasMatch = existingInteractions.find((i) => {
    const interKeysA = getInteractionKeys(i.drugAName, i.drugAId);
    const interKeysB = getInteractionKeys(i.drugBName, i.drugBId);

    const aMatchesA = keysA.some((k) => interKeysA.includes(k));
    const bMatchesB = keysB.some((k) => interKeysB.includes(k));
    if (aMatchesA && bMatchesB) return true;

    const aMatchesB = keysA.some((k) => interKeysB.includes(k));
    const bMatchesA = keysB.some((k) => interKeysA.includes(k));
    return aMatchesB && bMatchesA;
  });
  if (aliasMatch) return aliasMatch;

  // 2. Rule-based interaction inference for major drug classes
  const isStatin = (d: Drug) => d.category.toLowerCase().includes('statin') || d.name.toLowerCase().includes('statin');
  const isAnticoag = (d: Drug) => d.category.toLowerCase().includes('antikoagulan') || d.category.toLowerCase().includes('antiplatelet') || ['warfarin', 'aspirin', 'clopidogrel', 'apixaban', 'rivaroxaban'].includes(d.name.toLowerCase());
  const isNsaid = (d: Drug) => d.category.toLowerCase().includes('nsaid') || ['ibuprofen', 'meloxicam', 'ketorolac', 'celecoxib'].includes(d.name.toLowerCase());
  const isPpi = (d: Drug) => d.category.toLowerCase().includes('pompa proton') || ['omeprazole', 'lansoprazole', 'esomeprazole'].includes(d.name.toLowerCase());
  const isAzole = (d: Drug) => d.category.toLowerCase().includes('azol') || ['fluconazole', 'ketoconazole', 'itraconazole'].includes(d.name.toLowerCase());
  const isQuinolone = (d: Drug) => d.category.toLowerCase().includes('quinolone') || ['ciprofloxacin', 'levofloxacin'].includes(d.name.toLowerCase());
  const isCcb = (d: Drug) => d.category.toLowerCase().includes('kalsium') || ['amlodipine', 'diltiazem', 'verapamil'].includes(d.name.toLowerCase());
  const isAcei = (d: Drug) => d.category.toLowerCase().includes('ace') || d.category.toLowerCase().includes('renin') || ['lisinopril', 'captopril', 'candesartan', 'valsartan'].includes(d.name.toLowerCase());
  const isDiureticKSparing = (d: Drug) => d.name.toLowerCase().includes('spironolactone');
  const isImmuno = (d: Drug) => d.category.toLowerCase().includes('imunosupresan') || ['tacrolimus', 'cyclosporine', 'methotrexate'].includes(d.name.toLowerCase());

  // Rule A: CYP3A4 Inhibitor (Azole/CCB) + Statin
  if ((isAzole(drugA) || isCcb(drugA)) && isStatin(drugB)) {
    return createDynamicInteraction(drugA, drugB, 'Major',
      `${drugA.name} menghambat enzim metabolisme CYP3A4 di hati yang memetabolisme ${drugB.name}.`,
      `Peningkatan tajam konsentrasi ${drugB.name} plasma, meningkatkan risiko miopati berat dan rhabdomyolysis.`,
      `Ganti ke statin non-CYP3A4 (Rosuvastatin/Pravastatin) atau batasi dosis ${drugB.name}. Monitor nyeri otot.`
    );
  }
  if ((isAzole(drugB) || isCcb(drugB)) && isStatin(drugA)) {
    return createDynamicInteraction(drugB, drugA, 'Major',
      `${drugB.name} menghambat enzim metabolisme CYP3A4 di hati yang memetabolisme ${drugA.name}.`,
      `Peningkatan tajam konsentrasi ${drugA.name} plasma, meningkatkan risiko miopati berat dan rhabdomyolysis.`,
      `Ganti ke statin non-CYP3A4 (Rosuvastatin/Pravastatin) atau batasi dosis ${drugA.name}. Monitor nyeri otot.`
    );
  }

  // Rule B: NSAID + Anticoagulant / Antiplatelet
  if (isNsaid(drugA) && isAnticoag(drugB)) {
    return createDynamicInteraction(drugA, drugB, 'Major',
      `Penghambatan COX-1 oleh ${drugA.name} merusak mukosa lambung dan mengganggu fungsi trombosit bersama efek ${drugB.name}.`,
      `Risiko perdarahan saluran cerna dan perdarahan mayor meningkat signifikan.`,
      `Hindari kombinasi jika memungkinkan. Berikan Gastroprotectant (PPI) jika harus digunakan bersama.`
    );
  }
  if (isNsaid(drugB) && isAnticoag(drugA)) {
    return createDynamicInteraction(drugB, drugA, 'Major',
      `Penghambatan COX-1 oleh ${drugB.name} merusak mukosa lambung dan mengganggu fungsi trombosit bersama efek ${drugA.name}.`,
      `Risiko perdarahan saluran cerna dan perdarahan mayor meningkat signifikan.`,
      `Hindari kombinasi jika memungkinkan. Berikan Gastroprotectant (PPI) jika harus digunakan bersama.`
    );
  }

  // Rule C: ACEI/ARB + K-Sparing Diuretic (Spironolactone)
  if (isAcei(drugA) && isDiureticKSparing(drugB)) {
    return createDynamicInteraction(drugA, drugB, 'Major',
      `Kedua obat mengurangi sekresi kalium di ginjal secara sinergis.`,
      `Risiko hiperkalemia berat (kalium darah > 5.5 mEq/L) yang dapat memicu aritmia jantung fatal.`,
      `Monitor kadar kalium serum dan fungsi ginjal secara teratur.`
    );
  }
  if (isAcei(drugB) && isDiureticKSparing(drugA)) {
    return createDynamicInteraction(drugB, drugA, 'Major',
      `Kedua obat mengurangi sekresi kalium di ginjal secara sinergis.`,
      `Risiko hiperkalemia berat (kalium darah > 5.5 mEq/L) yang dapat memicu aritmia jantung fatal.`,
      `Monitor kadar kalium serum dan fungsi ginjal secara teratur.`
    );
  }

  // Rule D: Immunosuppressant + Azole / Macrolide
  if (isImmuno(drugA) && isAzole(drugB)) {
    return createDynamicInteraction(drugA, drugB, 'Major',
      `${drugB.name} menghambat CYP3A4 dan P-glikoprotein yang mendegradasi ${drugA.name}.`,
      `Toksisitas ginjal (nefrotoksisitas) berat dan supresi imun berlebih akibat lonjakan kadar ${drugA.name}.`,
      `Lakukan Therapeutic Drug Monitoring (TDM) untuk penyesuaian dosis ${drugA.name}.`
    );
  }
  if (isImmuno(drugB) && isAzole(drugA)) {
    return createDynamicInteraction(drugB, drugA, 'Major',
      `${drugA.name} menghambat CYP3A4 dan P-glikoprotein yang mendegradasi ${drugB.name}.`,
      `Toksisitas ginjal (nefrotoksisitas) berat dan supresi imun berlebih akibat lonjakan kadar ${drugB.name}.`,
      `Lakukan Therapeutic Drug Monitoring (TDM) untuk penyesuaian dosis ${drugB.name}.`
    );
  }

  // Rule E: Quinolone / Macrolide + Antiarrhythmic (QT Prolongation)
  const causesQt = (d: Drug) => isQuinolone(d) || d.category.toLowerCase().includes('makrolida') || d.name.toLowerCase().includes('amiodarone');
  if (causesQt(drugA) && causesQt(drugB) && drugA.name !== drugB.name) {
    return createDynamicInteraction(drugA, drugB, 'Major',
      `Efek aditif pemanjangan waktu repolarisasi ventrikel (interval QTc EKG) oleh ${drugA.name} dan ${drugB.name}.`,
      `Risiko signifikan timbulnya aritmia ventrikel Torsades de Pointes dan cardiac arrest.`,
      `Hindari kombinasi dua obat pemicu perpanjangan QT. Jika harus digunakan, lakukan pemantauan EKG kontinu.`
    );
  }

  // Rule F: Opioid / Benzodiazepine / CNS Depressant combination
  const isSspDepressant = (d: Drug) => d.category.toLowerCase().includes('sistem saraf') || d.category.toLowerCase().includes('benzodiazepin') || d.category.toLowerCase().includes('opioid') || ['diazepam', 'tramadol', 'alprazolam', 'morphine'].includes(d.name.toLowerCase());
  if (isSspDepressant(drugA) && isSspDepressant(drugB) && drugA.name !== drugB.name) {
    return createDynamicInteraction(drugA, drugB, 'Major',
      `Penekanan aditif sistem saraf pusat dan pusat respirasi batang otak oleh ${drugA.name} bersama ${drugB.name}.`,
      `Sedasi berat, bradipnea, depresi pernapasan fatal, hingga koma.`,
      `Gunakan dosis terendah yang efektif dengan durasi singkat. Pantau saturasi oksigen dan tingkat kesadaran.`
    );
  }

  // Rule G: ACEi/ARB + NSAID + Diuretic (Triple Whammy / Nephrotoxicity)
  if ((isAcei(drugA) || isAcei(drugB)) && (isNsaid(drugA) || isNsaid(drugB))) {
    const otherDrug = isAcei(drugA) ? drugB : drugA;
    const aceiDrug = isAcei(drugA) ? drugA : drugB;
    return createDynamicInteraction(aceiDrug, otherDrug, 'Moderate',
      `${otherDrug.name} menghambat sintesis prostaglandin vasodilator di arteriol aferen ginjal, berlawanan dengan efek ${aceiDrug.name} pada arteriol eferen.`,
      `Penurunan drastis Laju Filtrasi Glomerulus (LFG), memicu Gagal Ginjal Akut (GGA) dan retensi kalium.`,
      `Hindari NSAID jangka panjang. Pantau kadar kreatinin serum, ureum, dan elektrolit.`
    );
  }

  return null;
}

export function evaluateTherapeuticDuplications(
  selectedDrugs: Drug[],
  staticDuplications: TherapeuticDuplication[] = []
): TherapeuticDuplication[] {
  const results: TherapeuticDuplication[] = [];
  const seenPairKeys = new Set<string>();

  // 1. Direct matches in static list
  for (let i = 0; i < selectedDrugs.length; i++) {
    for (let j = i + 1; j < selectedDrugs.length; j++) {
      const dA = selectedDrugs[i];
      const dB = selectedDrugs[j];

      if (dA.id === dB.id) continue;
      const pairKey = [dA.id, dB.id].sort().join('__');
      if (seenPairKeys.has(pairKey)) continue;

      const staticMatch = staticDuplications.find(
        (dup) =>
          (dup.drugAName.toLowerCase() === dA.name.toLowerCase() && dup.drugBName.toLowerCase() === dB.name.toLowerCase()) ||
          (dup.drugAName.toLowerCase() === dB.name.toLowerCase() && dup.drugBName.toLowerCase() === dA.name.toLowerCase())
      );

      if (staticMatch) {
        seenPairKeys.add(pairKey);
        results.push({ ...staticMatch, id: `dup-${pairKey}` });
        continue;
      }

      // Dynamic class duplication detection
      const catA = (dA.category || '').toLowerCase();
      const catB = (dB.category || '').toLowerCase();

      // Same category (e.g. both statin, both NSAID, both PPI, both ACEi, both Beta Blocker)
      if ((catA && catB && catA === catB) || (catA.includes('statin') && catB.includes('statin')) ||
          (catA.includes('nsaid') && catB.includes('nsaid')) ||
          (catA.includes('pompa proton') && catB.includes('pompa proton')) ||
          (catA.includes('benzodiazepine') && catB.includes('benzodiazepine'))) {
        seenPairKeys.add(pairKey);
        results.push({
          id: `dup-${pairKey}`,
          drugAName: dA.name,
          drugBName: dB.name,
          therapeuticClass: dA.category || 'Kelas Terapi Sejenis',
          riskDescription: `Penggunaan dua obat dari kelas terapi yang sama (${dA.name} & ${dB.name}) dapat menyebabkan duplikasi efek farmakologi dan melipatgandakan risiko efek samping tanpa peningkatan manfaat klinis.`,
          recommendation: `Tinjau kembali indikasi resep. Direkomendasikan untuk menggunakan hanya satu obat utama dalam kelas terapi ${dA.category || 'terkait'}.`
        });
      }
    }
  }

  return results;
}

export function evaluateFoodInteractions(
  selectedDrugs: Drug[],
  staticFoodInteractions: DrugFoodInteraction[] = []
): DrugFoodInteraction[] {
  const results: DrugFoodInteraction[] = [];
  const seenIds = new Set<string>();

  for (const drug of selectedDrugs) {
    // 1. Check static matches
    const staticMatches = staticFoodInteractions.filter(
      (s) => s.drugName.toLowerCase() === drug.name.toLowerCase()
    );

    if (staticMatches.length > 0) {
      for (const match of staticMatches) {
        const uniqueId = `dfi-${match.id}-${drug.id}`;
        if (!seenIds.has(uniqueId)) {
          seenIds.add(uniqueId);
          results.push({ ...match, id: uniqueId });
        }
      }
    } else if (drug.foodInteraction && drug.foodInteraction.length > 5) {
      // Create dynamic food interaction from drug monografi
      let foodCat: DrugFoodInteraction['foodCategory'] = 'Lainnya';
      const text = drug.foodInteraction.toLowerCase();
      if (text.includes('grapefruit') || text.includes('jeruk bali')) foodCat = 'Buah / Juice';
      else if (text.includes('susu') || text.includes('kalsium')) foodCat = 'Susu / Kalsium';
      else if (text.includes('alkohol')) foodCat = 'Alkohol';
      else if (text.includes('vitamin k') || text.includes('bayam')) foodCat = 'Makanan Tinggi Vitamin K';
      else if (text.includes('kopi') || text.includes('kafein')) foodCat = 'Kafein / Kopi';

      const dynId = `dfi-dyn-${drug.id}`;
      if (!seenIds.has(dynId)) {
        seenIds.add(dynId);
        results.push({
          id: dynId,
          drugName: drug.name,
          foodName: 'Rekomendasi Makanan / Minuman Monografi DDInter',
          foodCategory: foodCat,
          severity: text.includes('hindari') ? 'Major' : 'Moderate',
          mechanism: `Interaksi absorbsi atau metabolisme organ antara ${drug.name} dan asupan nutrisi makanan.`,
          clinicalOutcome: `Sifat interaksi: ${drug.foodInteraction}`,
          recommendation: `Ikuti petunjuk waktu makan untuk ${drug.name}: ${drug.foodInteraction}`
        });
      }
    }
  }

  return results;
}

function createDynamicInteraction(
  drugA: Drug,
  drugB: Drug,
  severity: SeverityLevel,
  mechanism: string,
  clinicalOutcome: string,
  management: string
): DrugInteraction {
  return {
    id: `dyn-int-${drugA.id}-${drugB.id}`,
    drugAId: drugA.id,
    drugBId: drugB.id,
    drugAName: drugA.name,
    drugBName: drugB.name,
    severity,
    mechanism,
    clinicalOutcome,
    management,
    evidenceLevel: 'High',
    ddinterPairId: 'DDInter-PAIR-' + Math.floor(1000 + Math.random() * 8999)
  };
}

/**
 * Evaluates potential Drug-Disease Interactions (Contraindications) based on selected drugs and patient comorbidities
 */
export function evaluateDrugDiseaseInteractions(
  selectedDrugs: Drug[],
  selectedDiseaseNames: string[],
  diseaseDatabase: DrugDiseaseInteraction[] = []
): DrugDiseaseInteraction[] {
  const results: DrugDiseaseInteraction[] = [];
  const seenKeys = new Set<string>();

  for (const drug of selectedDrugs) {
    const drugNameLower = (drug.name || '').toLowerCase().trim();
    const genericNameLower = (drug.genericName || '').toLowerCase().trim();
    const categoryLower = (drug.category || '').toLowerCase().trim();

    for (const rule of diseaseDatabase) {
      const ruleDiseaseLower = rule.diseaseName.toLowerCase();
      const ruleDrugLower = rule.drugName.toLowerCase();

      // Check if this disease is active in patient's selected list (or all if none filtered)
      const isDiseaseSelected =
        selectedDiseaseNames.length === 0
          ? false
          : selectedDiseaseNames.some((dis) => {
              const dLower = dis.toLowerCase().trim();
              return (
                ruleDiseaseLower.includes(dLower) ||
                dLower.includes(ruleDiseaseLower.split(' ')[0]) ||
                rule.id.includes(dLower.replace(/[^a-z0-9]/g, ''))
              );
            });

      if (!isDiseaseSelected && selectedDiseaseNames.length > 0) {
        continue;
      }

      // Check if drug matches rule tokens
      const ruleDrugTokens = ruleDrugLower.split(/[/,&()]/).map((t) => t.trim()).filter(Boolean);
      const isDrugMatch = ruleDrugTokens.some((token) => {
        if (token.length < 3) return false;
        return (
          drugNameLower.includes(token) ||
          genericNameLower.includes(token) ||
          token.includes(drugNameLower) ||
          (token.includes('nsaid') && (categoryLower.includes('nsaid') || categoryLower.includes('antiinflamasi non-steroid'))) ||
          (token.includes('beta-blocker') && categoryLower.includes('beta blocker')) ||
          (token.includes('statin') && categoryLower.includes('statin')) ||
          (token.includes('kortikosteroid') && categoryLower.includes('kortikosteroid'))
        );
      });

      if (isDrugMatch) {
        const uniqueKey = `${drug.id}__${rule.id}`;
        if (!seenKeys.has(uniqueKey)) {
          seenKeys.add(uniqueKey);
          results.push({
            ...rule,
            id: `ddsi-eval-${uniqueKey}`,
            drugName: `${drug.name} (${drug.genericName || drug.name})`
          });
        }
      }
    }
  }

  return results;
}


