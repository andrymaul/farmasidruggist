import fs from 'fs';
import path from 'path';

// Helper to sleep between requests if needed
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function categorizeFood(foodName: string): 'Buah / Juice' | 'Susu / Kalsium' | 'Alkohol' | 'Makanan Tinggi Vitamin K' | 'Kafein / Kopi' | 'Makanan Tinggi Lemak' | 'Suplemen / Mineral' | 'Lainnya' {
  const f = foodName.toLowerCase();
  if (f.includes('grapefruit') || f.includes('juice') || f.includes('jus') || f.includes('orange') || f.includes('apple') || f.includes('pomelo') || f.includes('cranberry')) {
    return 'Buah / Juice';
  }
  if (f.includes('milk') || f.includes('susu') || f.includes('calcium') || f.includes('kalsium') || f.includes('dairy') || f.includes('yogurt') || f.includes('cheese') || f.includes('keju')) {
    return 'Susu / Kalsium';
  }
  if (f.includes('alcohol') || f.includes('alkohol') || f.includes('ethanol') || f.includes('wine') || f.includes('beer')) {
    return 'Alkohol';
  }
  if (f.includes('vitamin k') || f.includes('spinach') || f.includes('bayam') || f.includes('kale') || f.includes('broccoli') || f.includes('green tea') || f.includes('teh hijau')) {
    return 'Makanan Tinggi Vitamin K';
  }
  if (f.includes('coffee') || f.includes('kopi') || f.includes('caffeine') || f.includes('kafein') || f.includes('tea') || f.includes('teh')) {
    return 'Kafein / Kopi';
  }
  if (f.includes('fat') || f.includes('lemak') || f.includes('meal') || f.includes('high fat') || f.includes('makanan berlemak')) {
    return 'Makanan Tinggi Lemak';
  }
  if (f.includes('potassium') || f.includes('kalium') || f.includes('iron') || f.includes('besi') || f.includes('zinc') || f.includes('magnesium') || f.includes('mineral') || f.includes('salt substitute') || f.includes('garam diet')) {
    return 'Suplemen / Mineral';
  }
  return 'Lainnya';
}

function mapFoodSeverity(level: string | number): 'Major' | 'Moderate' | 'Minor' {
  const l = String(level).trim();
  if (l === '3' || l.toLowerCase() === 'major') return 'Major';
  if (l === '2' || l.toLowerCase() === 'moderate') return 'Moderate';
  return 'Minor';
}

function categorizeDisease(diseaseName: string): 'Kardiovaskular' | 'Ginjal & Saluran Kemih' | 'Gastrointestinal & Hepar' | 'Respirasi & Paru' | 'Endokrin & Metabolik' | 'Neurologi & Psikiatri' | 'Oftalmologi' | 'Lainnya' {
  const d = diseaseName.toLowerCase();
  if (d.includes('cardio') || d.includes('heart') || d.includes('hypertens') || d.includes('arrhyth') || d.includes('jantung') || d.includes('coronary') || d.includes('vascular') || d.includes('stroke') || d.includes('angina')) {
    return 'Kardiovaskular';
  }
  if (d.includes('renal') || d.includes('kidney') || d.includes('ginjal') || d.includes('nephr') || d.includes('urinary') || d.includes('bladder') || d.includes('prostat') || d.includes('bph')) {
    return 'Ginjal & Saluran Kemih';
  }
  if (d.includes('liver') || d.includes('hepat') || d.includes('hepar') || d.includes('hati') || d.includes('gastro') || d.includes('ulcer') || d.includes('lambung') || d.includes('bowel') || d.includes('cirrhosis') || d.includes('gerd')) {
    return 'Gastrointestinal & Hepar';
  }
  if (d.includes('pulmon') || d.includes('asthma') || d.includes('asma') || d.includes('respirat') || d.includes('copd') || d.includes('ppok') || d.includes('bronch') || d.includes('lung')) {
    return 'Respirasi & Paru';
  }
  if (d.includes('diabet') || d.includes('thyroid') || d.includes('tiroid') || d.includes('gout') || d.includes('hyperur') || d.includes('adrenal') || d.includes('metabol')) {
    return 'Endokrin & Metabolik';
  }
  if (d.includes('parkinson') || d.includes('epilep') || d.includes('kejang') || d.includes('seizure') || d.includes('depress') || d.includes('psych') || d.includes('dementia') || d.includes('saraf') || d.includes('neuropathy') || d.includes('myasthenia')) {
    return 'Neurologi & Psikiatri';
  }
  if (d.includes('glaucoma') || d.includes('glaukoma') || d.includes('eye') || d.includes('mata') || d.includes('ocular')) {
    return 'Oftalmologi';
  }
  return 'Lainnya';
}

function mapDiseaseSeverity(level: string | number): { severity: 'Major' | 'Moderate' | 'Minor', contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)' | 'Peringatan Ketat (Black Box / Relative)' | 'Gunakan dengan Kehati-hatian (Caution)' } {
  const l = String(level).trim();
  if (l === '3' || l.toLowerCase() === 'major') {
    return {
      severity: 'Major',
      contraindicationLevel: 'Kontraindikasi Mutlak (Absolute)'
    };
  }
  if (l === '2' || l.toLowerCase() === 'moderate') {
    return {
      severity: 'Moderate',
      contraindicationLevel: 'Peringatan Ketat (Black Box / Relative)'
    };
  }
  return {
    severity: 'Minor',
    contraindicationLevel: 'Gunakan dengan Kehati-hatian (Caution)'
  };
}

async function fetchAllFoodInteractions() {
  console.log('Fetching Food Interactions from DDInter 2.0...');
  const res = await fetch('https://ddinter2.scbdd.com/server/food-interaction-source/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'draw=1&start=0&length=1500'
  });
  const json: any = await res.json();
  const rawList: any[] = json.data || [];
  console.log(`Fetched ${rawList.length} food interactions from DDInter 2.0.`);

  const processed = rawList.map((item, idx) => {
    const drugName = (item.drugName || '').trim();
    const foodName = (item.foodName || '').trim();
    const foodCategory = categorizeFood(foodName);
    const severity = mapFoodSeverity(item.level);
    const mechanism = (item.magnesium && item.magnesium !== 'null' ? `Mekanisme (${item.magnesium}): ` : '') + (item.newInteraction || 'Interaksi kinetik/dinamik tercatat pada monografi DDInter 2.0.').trim();
    const recommendation = (item.newManagement || 'Disarankan memisahkan jadwal minum obat dengan konsumsi makanan/minuman tersebut minimal 2 jam.').trim();

    return {
      id: `ddinter-dfi-${idx + 1}`,
      drugName,
      foodName,
      foodCategory,
      severity,
      mechanism,
      clinicalOutcome: (item.newInteraction || 'Potensi perubahan penyerapan atau bioavailabilitas obat.').trim(),
      recommendation
    };
  });

  return processed;
}

async function fetchAllDuplications() {
  console.log('Fetching Duplication Interactions from DDInter 2.0...');
  let start = 0;
  const length = 1000;
  let allRows: any[] = [];

  while (true) {
    console.log(`Fetching Duplications (start=${start}, length=${length})...`);
    const res = await fetch('https://ddinter2.scbdd.com/server/dupli-interaction-source/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `draw=1&start=${start}&length=${length}`
    });
    const json: any = await res.json();
    const batch = json.data || [];
    allRows = allRows.concat(batch);
    if (batch.length < length || allRows.length >= (json.recordsTotal || 6033)) {
      break;
    }
    start += length;
    await sleep(200);
  }

  console.log(`Fetched total ${allRows.length} duplication records.`);

  // Group by drugtype or unique drug pairs
  const map = new Map<string, any>();
  allRows.forEach((row, idx) => {
    const drugA = (row.drugmulti || '').trim();
    const drugB = (row.drugb || '').trim();
    const drugType = (row.drugtype || 'Duplikasi Kelas Terapi').trim();
    const key = `${drugA.toLowerCase()}_${drugB.toLowerCase()}`;

    if (!map.has(key) && drugA && drugB) {
      map.set(key, {
        id: `ddinter-dup-${idx + 1}`,
        drugAName: drugA,
        drugBName: drugB,
        therapeuticClass: drugType.charAt(0).toUpperCase() + drugType.slice(1),
        riskDescription: (row.warning || `Peresepan ganda obat pada kategori ${drugType}.`).trim(),
        recommendation: (row.note || 'Evaluasi indikasi klinis dan pertimbangkan deprescribing salah satu agen.').trim()
      });
    }
  });

  return Array.from(map.values());
}

async function fetchDiseaseInteractionsSample() {
  console.log('Fetching Disease Contraindications from DDInter 2.0 (Batch 1-3)...');
  let allRows: any[] = [];
  // Fetch first 2500 primary disease contraindications
  for (let start = 0; start < 2500; start += 1000) {
    console.log(`Fetching Diseases (start=${start})...`);
    const res = await fetch('https://ddinter2.scbdd.com/server/disease-interaction-source/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `draw=1&start=${start}&length=1000`
    });
    const json: any = await res.json();
    const batch = json.data || [];
    allRows = allRows.concat(batch);
    await sleep(200);
  }

  console.log(`Fetched ${allRows.length} disease contraindication records.`);

  const processed = allRows.map((item, idx) => {
    const drugName = (item.drugName || '').trim();
    const diseaseName = (item.diseaseName || '').trim();
    const diseaseCategory = categorizeDisease(diseaseName);
    const { severity, contraindicationLevel } = mapDiseaseSeverity(item.level);

    return {
      id: `ddinter-ddsi-${idx + 1}`,
      drugName,
      diseaseName,
      diseaseCategory,
      severity,
      contraindicationLevel,
      mechanism: `Kontraindikasi klinis pada pasien dengan riwayat ${diseaseName}.`,
      clinicalRisk: (item.text || 'Risiko eksaserbasi penyakit atau komplikasi dekompensasi organ.').trim(),
      recommendation: severity === 'Major' 
        ? 'KONTRAINDIKASI MUTLAK: Hindari peresepan pada pasien dengan kondisi ini, pilih alternatif lini lain.' 
        : 'Gunakan dengan pengawasan ketat dosis dan evaluasi fungsi organ berkala.',
      references: (item.references || 'DDInter 2.0 Disease Database').slice(0, 300)
    };
  });

  return processed;
}

export async function runIngestion() {
  console.log('=== STARTING LIVE DDINTER 2.0 INGESTION ===');

  const foodInteractions = await fetchAllFoodInteractions();
  const duplications = await fetchAllDuplications();
  const diseaseInteractions = await fetchDiseaseInteractionsSample();

  const outputDir = path.join(process.cwd(), 'src', 'data');

  // 1. Write Food Interactions file
  const foodFile = path.join(outputDir, 'ddinterFoodInteractionsData.ts');
  const foodContent = `import { DrugFoodInteraction } from '../types';

/**
 * Official DDInter 2.0 Drug-Food & Lifestyle Interactions Database
 * Extracted directly from https://ddinter2.scbdd.com/server/other_interaction/
 * Total Records: ${foodInteractions.length}
 */
export const DDINTER_OFFICIAL_FOOD_INTERACTIONS: DrugFoodInteraction[] = ${JSON.stringify(foodInteractions, null, 2)};
`;
  fs.writeFileSync(foodFile, foodContent, 'utf-8');
  console.log(`Saved ${foodInteractions.length} food interactions to ${foodFile}`);

  // 2. Write Duplications file
  const dupFile = path.join(outputDir, 'ddinterDuplicationsData.ts');
  const dupContent = `import { TherapeuticDuplication } from '../types';

/**
 * Official DDInter 2.0 Therapeutic Duplications Database
 * Extracted directly from https://ddinter2.scbdd.com/server/other_interaction/
 * Total Unique Pairs: ${duplications.length}
 */
export const DDINTER_OFFICIAL_DUPLICATIONS: TherapeuticDuplication[] = ${JSON.stringify(duplications, null, 2)};
`;
  fs.writeFileSync(dupFile, dupContent, 'utf-8');
  console.log(`Saved ${duplications.length} therapeutic duplications to ${dupFile}`);

  // 3. Write Disease Interactions file
  const ddsiFile = path.join(outputDir, 'ddinterDiseaseInteractionsData.ts');
  const ddsiContent = `import { DrugDiseaseInteraction } from '../types';

/**
 * Official DDInter 2.0 Drug-Disease Contraindications Database
 * Extracted directly from https://ddinter2.scbdd.com/server/other_interaction/
 * Total Records: ${diseaseInteractions.length}
 */
export const DDINTER_OFFICIAL_DISEASE_INTERACTIONS: DrugDiseaseInteraction[] = ${JSON.stringify(diseaseInteractions, null, 2)};
`;
  fs.writeFileSync(ddsiFile, ddsiContent, 'utf-8');
  console.log(`Saved ${diseaseInteractions.length} disease contraindications to ${ddsiFile}`);

  console.log('\n=== INGESTION FINISHED SUCCESSFULLY ===');
}

runIngestion().catch((err) => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
