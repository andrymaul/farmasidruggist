import fs from 'fs';
import path from 'path';
import { DDINTER_OFFICIAL_DISEASE_INTERACTIONS } from '../src/data/ddinterDiseaseInteractionsData';
import { DrugDiseaseInteraction, SeverityLevel } from '../src/types';

console.log('--- MEMULAI DEDUPLIKASI STATIS DDINTER DISEASE INTERACTIONS ---');
console.log(`Total awal: ${DDINTER_OFFICIAL_DISEASE_INTERACTIONS.length} rekor.`);

const SEVERITY_WEIGHT: Record<SeverityLevel, number> = {
  Major: 3,
  Moderate: 2,
  Minor: 1
};

const map = new Map<string, DrugDiseaseInteraction>();

DDINTER_OFFICIAL_DISEASE_INTERACTIONS.forEach((item) => {
  const key = `${item.drugName.toLowerCase().trim()}__${item.diseaseName.toLowerCase().trim()}`;
  if (!map.has(key)) {
    map.set(key, item);
  } else {
    const existing = map.get(key)!;
    const existingWeight = SEVERITY_WEIGHT[existing.severity] || 1;
    const newWeight = SEVERITY_WEIGHT[item.severity] || 1;

    // Prioritize higher severity, or richer description if same severity
    if (newWeight > existingWeight) {
      map.set(key, item);
    } else if (newWeight === existingWeight) {
      // Keep the one with longer recommendation or clinical risk
      if ((item.clinicalRisk || '').length > (existing.clinicalRisk || '').length) {
        map.set(key, item);
      }
    }
  }
});

const deduplicatedList = Array.from(map.values()).map((item, idx) => ({
  ...item,
  id: `ddinter-ddsi-${idx + 1}`
}));

console.log(`Total setelah deduplikasi: ${deduplicatedList.length} rekor unik.`);

const targetFile = path.join(process.cwd(), 'src', 'data', 'ddinterDiseaseInteractionsData.ts');
const fileContent = `import { DrugDiseaseInteraction } from '../types';

/**
 * Basis Data Resmi Kontraindikasi Obat terhadap Penyakit (DDSI) DDInter 2.0 (Bahasa Indonesia)
 * Standar Penapisan Komorbiditas & Keamanan Pasien Klinis (Terdeduplikasi Bersih)
 * Total Rekor: ${deduplicatedList.length}
 */
export const DDINTER_OFFICIAL_DISEASE_INTERACTIONS: DrugDiseaseInteraction[] = ${JSON.stringify(deduplicatedList, null, 2)};
`;

fs.writeFileSync(targetFile, fileContent, 'utf-8');
console.log(`✅ File ${targetFile} berhasil diperbarui dengan ${deduplicatedList.length} rekor bersih!\n`);
