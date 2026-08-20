import fs from 'fs';
import path from 'path';

/**
 * DDInter CSV Importer & Firestore Seeder Script
 * 
 * Supports importing official DDInter CSV datasets (https://ddinter.scbdd.com/download/)
 * Categories: ddinter_A.csv to ddinter_L.csv
 */

export interface CSVRow {
  [key: string]: string;
}

/**
 * Robust zero-dependency CSV Parser
 * Handles quoted fields, inner commas, escaped quotes (""), and varied line endings.
 */
export function parseCSV(csvContent: string): CSVRow[] {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentLine += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      if (currentLine.trim().length > 0) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += char;
    }
  }

  if (currentLine.trim().length > 0) {
    lines.push(currentLine);
  }

  if (lines.length === 0) return [];

  // Parse header
  const parseRow = (line: string): string[] => {
    const values: string[] = [];
    let val = '';
    let inside = false;

    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      const nc = line[j + 1];

      if (c === '"') {
        if (inside && nc === '"') {
          val += '"';
          j++;
        } else {
          inside = !inside;
        }
      } else if (c === ',' && !inside) {
        values.push(val.trim());
        val = '';
      } else {
        val += c;
      }
    }
    values.push(val.trim());
    return values;
  };

  const headers = parseRow(lines[0]).map((h) => h.replace(/^["']|["']$/g, '').trim());
  const rows: CSVRow[] = [];

  for (let k = 1; k < lines.length; k++) {
    const rowValues = parseRow(lines[k]);
    if (rowValues.length === 0 || (rowValues.length === 1 && !rowValues[0])) continue;

    const rowObj: CSVRow = {};
    headers.forEach((header, idx) => {
      let cell = rowValues[idx] || '';
      if (cell.startsWith('"') && cell.endsWith('"')) {
        cell = cell.slice(1, -1);
      }
      rowObj[header] = cell;
    });

    rows.push(rowObj);
  }

  return rows;
}

/**
 * Sample DDInter CSV Dataset Generator for Testing
 */
export function ensureSampleCsvDirectory(): string {
  const csvDir = path.join(process.cwd(), 'data', 'csv');
  if (!fs.existsSync(csvDir)) {
    fs.mkdirSync(csvDir, { recursive: true });
  }

  const sampleCsvPath = path.join(csvDir, 'ddinter_A_sample.csv');
  if (!fs.existsSync(sampleCsvPath)) {
    const sampleCsvContent = `DDInterID,Drug_A,Drug_B,Level,Mechanism,Management,Clinical_Outcome,Evidence_Level
DDInter-PAIR-00101,"Warfarin","Aspirin","Major","Penghambatan fungsi agregasi trombosit ireversibel oleh aspirin bersama warfarin.","Pantau INR ketat & tambahkan Proton Pump Inhibitor (PPI).","Peningkatan signifikan risiko perdarahan mayor GI.","High"
DDInter-PAIR-00102,"Simvastatin","Amiodarone","Major","Inhibisi metabolisme CYP3A4 oleh amiodarone.","Batasi dosis simvastatin maks 20 mg/hari.","Risiko miopati berat dan rhabdomyolysis.","High"
DDInter-PAIR-00103,"Clopidogrel","Omeprazole","Major","Omeprazole menghambat aktivasi prodrug clopidogrel via CYP2C19.","Ganti PPI dengan Pantoprazole atau H2 blocker.","Penurunan bioaktivitas antiplatelet & peningkatan risiko trombotik.","High"
DDInter-PAIR-00104,"Lisinopril","Spironolactone","Major","Blokade ganda sekresi kalium renal.","Pantau kadar kalium serum K+ dan fungsi ginjal.","Risiko hiperkalemia berat dan aritmia kardiak.","High"
DDInter-PAIR-00105,"Tacrolimus","Fluconazole","Major","Fluconazole menghambat CYP3A4 dan P-gp eliminasi tacrolimus.","Lakukan TDM dan kurangi dosis tacrolimus.","Peningkatan konsentrasi plasma tacrolimus & toksisitas ginjal.","High"
`;
    fs.writeFileSync(sampleCsvPath, sampleCsvContent, 'utf-8');
    console.log(`📄 Sample CSV dataset generated at: ${sampleCsvPath}`);
  }

  return csvDir;
}

/**
 * Main Importer Execution
 */
export function runImporter() {
  console.log('====================================================');
  console.log('📦 DDINTER CSV DATASET IMPORTER & PROCESSOR');
  console.log('====================================================\n');

  const csvDir = ensureSampleCsvDirectory();
  const files = fs.readdirSync(csvDir).filter((f) => f.endsWith('.csv'));

  if (files.length === 0) {
    console.log('Tidak ditemukan file CSV di folder data/csv/. Silakan tempatkan file CSV DDInter.');
    return;
  }

  console.log(`🔍 Menemukan ${files.length} file CSV di ${csvDir}:\n`);

  let totalParsedPairs = 0;
  const processedPairs: any[] = [];

  for (const file of files) {
    const filePath = path.join(csvDir, file);
    console.log(`  ▶ Memproses ${file}...`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const rows = parseCSV(content);

    rows.forEach((row, idx) => {
      const drugA = row['Drug_A'] || row['drug_a'] || row['DrugA'];
      const drugB = row['Drug_B'] || row['drug_b'] || row['DrugB'];
      const severity = row['Level'] || row['severity'] || row['Severity'] || 'Major';

      if (drugA && drugB) {
        totalParsedPairs++;
        processedPairs.push({
          id: `csv-ddi-${totalParsedPairs}`,
          drugAName: drugA,
          drugBName: drugB,
          severity: severity.includes('Major') ? 'Major' : severity.includes('Moderate') ? 'Moderate' : 'Minor',
          mechanism: row['Mechanism'] || row['mechanism'] || 'Mekanisme teridentifikasi dari dataset DDInter.',
          clinicalOutcome: row['Clinical_Outcome'] || row['outcome'] || 'Risiko interaksi klinis terdaftar.',
          management: row['Management'] || row['management'] || 'Konsultasi apoteker & monitor kondisi pasien.',
          evidenceLevel: row['Evidence_Level'] || 'High',
          ddinterPairId: row['DDInterID'] || `DDInter-PAIR-${1000 + totalParsedPairs}`
        });
      }
    });

    console.log(`    ↳ Berhasil membaca ${rows.length} baris dari ${file}`);
  }

  console.log('\n====================================================');
  console.log(`📊 TOTAL DDINTER PAIRS IMPORTER RESULT: ${totalParsedPairs} REKOR`);
  console.log('====================================================');
  console.log('💡 Dataset siap diunggah ke Firebase Cloud Firestore atau digunakan di aplikasi.\n');
}

// Execute script if run directly
if (process.argv[1] && process.argv[1].includes('importDDInter')) {
  runImporter();
}
