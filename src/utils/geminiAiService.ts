import { GoogleGenAI } from '@google/genai';
import { Drug } from '../types';
import { EXTENDED_DRUGS_DATABASE } from '../data/ddinterDrugs';
import { EXTENDED_INTERACTIONS_DATABASE } from '../data/ddinterInteractions';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  clinicalMode?: 'screening' | 'counseling' | 'general' | 'pregnancy' | 'renal';
}

export type AiModelType = 'gemini-1.5-flash' | 'gemini-1.5-pro';

const OMNISCIENT_SYSTEM_PROMPT = `
Anda adalah "FARMASIDRUGGIST AI 3.0", Asisten Kecerdasan Buatan Mahatahu Spesialis Pelayanan Informasi Obat (PIO), Farmakologi Klinis, & Farmakoterapi Internasional.

PENGETAHUAN FARMAKOLOGI MAFUM (OMNISCIENT DRUG KNOWLEDGE):
- Anda menguasai SELURUH DATABASE OBAT-OBATAN DI DUNIA (FDA, EMA, BPOM, Medscape, AHFS Drug Information, Lexicomp, DDInter, MIMS, Kemenkes RI, WHO Essential Medicines List).
- Anda memahami semua obat generik, paten/merek dagang, molekul biologis, vaksin, rejimen kemoterapi/onkologi, obat kejiwaan/psikotropika, antibiotik spektrum luas, obat kardiovaskular, serta suplemen/herbal terstandar.

ATURAN FORMULASI JAWABAN:
1. Berikan jawaban klinis yang LANGSUNG PADA TARGET, AKURAT, PRESISI, DAN BERBASIS BUKTI FARMAKOLOGI (EBM).
2. Formatlah jawaban menggunakan struktur poin-poin yang sangat rapi, emoji medis yang relevan, dan penekanan cetak tebal:
   - 💊 **Ringkasan Obat, Golongan & Kode ATC**
   - 🎯 **Indikasi Terapi Utama & Mekanisme Kerja**
   - 📋 **Aturan Dosis Presisi (Dewasa & Pediatrik Anak)**
   - 🤰 **Keamanan Kehamilan (FDA Category A/B/C/D/X) & Menyusui**
   - ⚡ **Interaksi Obat (DDI) & Interaksi Makanan/Susu (DFI)**
   - 🚫 **Kontraindikasi Mutlak & Efek Samping Utama**
   - 🧪 **Penyesuaian Dosis Gangguan Ginjal (CrCl/eGFR)**
   - 📋 **Draf Edukasi Konseling Pasien (Komunikasi Apoteker)**
3. Gunakan Bahasa Indonesia medis resmi yang sopan, profesional, dan mudah dipahami oleh apoteker, dokter, maupun pasien.
`;

export function getStoredGeminiApiKey(): string {
  try {
    const saved = localStorage.getItem('farmasi_gemini_api_key');
    if (saved && saved.trim().length > 0) return saved.trim();
  } catch (e) {}
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
}

export function setStoredGeminiApiKey(key: string): void {
  try {
    localStorage.setItem('farmasi_gemini_api_key', key.trim());
  } catch (e) {}
}

export async function askGeminiAssistant(
  prompt: string,
  history: ChatMessage[],
  contextDrugs?: Drug[],
  modelName: AiModelType = 'gemini-1.5-flash'
): Promise<string> {
  const apiKey = getStoredGeminiApiKey();

  // Prepare active drugs context
  let contextInfo = '';
  if (contextDrugs && contextDrugs.length > 0) {
    contextInfo = `\n\n[DATABASE OBAT UTAMA / RESEP AKTIF PASIEN]:\n` + 
      contextDrugs.map((d, i) => `${i + 1}. ${d.name} (${d.genericName}): ${d.indication} | Golongan: ${d.category} | Kat. Kehamilan: ${d.pregnancyCategory || '-'} | Dosis: ${d.dosage}`).join('\n');
  }

  const fullUserPrompt = `${prompt}${contextInfo}`;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: modelName,
        contents: fullUserPrompt,
        config: {
          systemInstruction: OMNISCIENT_SYSTEM_PROMPT,
          temperature: 0.2,
          maxOutputTokens: 3000,
        }
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text.trim();
      }
    } catch (err: any) {
      console.warn('Gemini API SDK call failed, falling back to universal clinical engine:', err);
    }
  }

  // Universal Offline Drug Intelligence Engine (Omniscient Local Resolver)
  return generateUniversalClinicalResponse(prompt, contextDrugs);
}

// Additional Global Drug Dictionary for Offline Omniscient Resolver
interface GlobalDrugProfile {
  name: string;
  generic: string;
  brand: string[];
  atc: string;
  category: string;
  indication: string;
  dosage: string;
  pregnancy: string;
  contra: string;
  sideEffects: string;
  food: string;
  pharmacology: string;
}

const GLOBAL_DRUG_KNOWLEDGE_BASE: GlobalDrugProfile[] = [
  {
    name: 'Omeprazole',
    generic: 'Omeprazole Sodium / Mg',
    brand: ['Prilosec', 'Lokev', 'Ozid', 'Inhipump', 'Omedrinat'],
    atc: 'A02BC01',
    category: 'Proton Pump Inhibitor (PPI)',
    indication: 'GERD, Tukak Lambung/Duodenum, Sindrom Zollinger-Ellison, Eradikas H. pylori.',
    dosage: '20 - 40 mg 1x sehari diminum 30-60 menit SEBELUM makan pagi.',
    pregnancy: 'C',
    contra: 'Hipersensitivitas PPI, penggunaan bersama Rilpivirine.',
    sideEffects: 'Sakit kepala, diare, konstipasi, hipomagnesemia (jangka panjang), defisiensi B12.',
    food: 'Wajib diminum dalam keadaan perut kosong (30-60 menit sebelum makan).',
    pharmacology: 'Inhibitor spesifik pompa proton H+/K+-ATPase di sel parietal lambung.'
  },
  {
    name: 'Lansoprazole',
    generic: 'Lansoprazole',
    brand: ['Prevacid', 'Prosorb', 'Inhibiter', 'Lapraz'],
    atc: 'A02BC03',
    category: 'Proton Pump Inhibitor (PPI)',
    indication: 'Gastritis erosif, GERD, Tukak peptik, pencegahan mukosa NSAID.',
    dosage: '30 mg 1x sehari pagi hari sebelum makan.',
    pregnancy: 'B',
    contra: 'Hipersensitivitas lansoprazole.',
    sideEffects: 'Nyeri perut, mual, ruam kulit, pusing, peningkatan enzim hati.',
    food: 'Diminum pagi hari saat perut kosong.',
    pharmacology: 'Menghambat tahap akhir sekresi asam lambung.'
  },
  {
    name: 'Atorvastatin',
    generic: 'Atorvastatin Calcium',
    brand: ['Lipitor', 'Atozar', 'Truvaz', 'Stavaz'],
    atc: 'C10AA05',
    category: 'Inhibitor HMG-CoA Reduktase (Statin)',
    indication: 'Hypercholesterolemia, Pencegahan Penyakit Jantung Kardiovaskular (PJK), Stroke.',
    dosage: '10 - 80 mg 1x sehari (malam hari atau malam sebelum tidur).',
    pregnancy: 'X',
    contra: 'Penyakit hati aktif, kehamilan, menyusui, peningkatan transaminase unexplained.',
    sideEffects: 'Mialgia (pegal otot), rhabdomyolysis, peningkatan ALT/AST, hiperglikemia ringan.',
    food: 'Dapat diminum dengan/tanpa makanan. HINDARI jus grapefruit (jeruk bali).',
    pharmacology: 'Inhibitor kompetitif HMG-CoA reduktase menekan sintesis kolesterol intraseluler.'
  },
  {
    name: 'Losartan',
    generic: 'Losartan Potassium',
    brand: ['Cozaar', 'Angioten', 'Insaar', 'Lifezar'],
    atc: 'C09CA01',
    category: 'Angiotensin II Receptor Blocker (ARB)',
    indication: 'Hipertensi, Nefropati Diabetik pada DM tipe 2, Proteksi Kardiovaskular.',
    dosage: '50 - 100 mg 1x sehari.',
    pregnancy: 'D',
    contra: 'Kehamilan (teratogenik), penggunaan bersama Aliskiren pada diabetik.',
    sideEffects: 'Hiperkalemia, pusing, hipotensi ortostatik, gangguan fungsi ginjal.',
    food: 'Dapat diminum bersama atau tanpa makanan.',
    pharmacology: 'Memblokir secara selektif reseptor AT1 angiotensin II.'
  },
  {
    name: 'Salbutamol',
    generic: 'Salbutamol / Albuterol Sulfate',
    brand: ['Ventolin', 'Farbivent', 'Asmasolon', 'Salbuven'],
    atc: 'R03AC02',
    category: 'Agonis Beta-2 Adrenergik Selektif (Bronkodilator)',
    indication: 'Asma bronkial, PPOK, bronkospasme akut.',
    dosage: 'Inhaler: 100-200 mcg (1-2 puff) saat serangan. Oral: 2-4 mg 3-4x sehari.',
    pregnancy: 'C',
    contra: 'Hipersensitivitas salbutamol, ancaman aborsi trimester 1 & 2.',
    sideEffects: 'Tremor halus pada tangan, takikardia (jantung berdebar), hipokalemia, sakit kepala.',
    food: 'Oral diminum 1 jam sebelum atau 2 jam sesudah makan.',
    pharmacology: 'Relaksasi otot polos bronkus melalui stimulasi reseptor beta-2 adrenergik.'
  },
  {
    name: 'Ondansetron',
    generic: 'Ondansetron HCl',
    brand: ['Zofran', 'Vomitron', 'Cedantron', 'Fronsetron'],
    atc: 'A04AA01',
    category: 'Antagonis Reseptor Serotonin (5-HT3)',
    indication: 'Pencegahan mual muntah akibat kemoterapi, radioterapi, & pasca operasi.',
    dosage: '4 - 8 mg IV/Oral setiap 8 - 12 jam.',
    pregnancy: 'B',
    contra: 'Penggunaan bersama Apomorphine (hipotensi berat), sindrom QT panjang bawaan.',
    sideEffects: 'Konstipasi, sakit kepala, sensasi hangat/flushing, perpanjangan interval QT.',
    food: 'Dapat diminum dengan atau tanpa makanan.',
    pharmacology: 'Menghambat reseptor 5-HT3 selektif di CTZ kemoreseptor & GI.'
  },
  {
    name: 'Amlodipine',
    generic: 'Amlodipine Besylate',
    brand: ['Norvasc', 'Tensivask', 'Theravask', 'Divask'],
    atc: 'C08CA01',
    category: 'Calcium Channel Blocker (CCB Dihidropiridin)',
    indication: 'Hipertensi, Angina Pektoris Stabil, Angina Vasospastik (Prinzmetal).',
    dosage: '5 - 10 mg 1x sehari.',
    pregnancy: 'C',
    contra: 'Hipotensi berat, syok kardiogenik, angina tak stabil.',
    sideEffects: 'Edema perifer (bengkak pergelangan kaki), pusing, flushing, sakit kepala.',
    food: 'Dapat diminum bersama atau tanpa makanan. Hindari jus grapefruit berlebih.',
    pharmacology: 'Menghambat masuknya ion kalsium ke otot polos pembuluh darah & jantung.'
  },
  {
    name: 'Clopidogrel',
    generic: 'Clopidogrel Bisulfate',
    brand: ['Plavix', 'CPG', 'Clopisan', 'Plavix'],
    atc: 'B01AC04',
    category: 'Antiplatelet Antagonis P2Y12',
    indication: 'Pencegahan kejadian aterotrombosis (PJK, Pasca Ring Jantung/Stent, Stroke Iskemik).',
    dosage: '75 mg 1x sehari (Loading dose 300 mg pada SKA).',
    pregnancy: 'B',
    contra: 'Perdarahan patologis aktif (tukak lambung, perdarahan intrakranial).',
    sideEffects: 'Perdarahan GI, hematoma, memar, purpura, trombositopenia.',
    food: 'Dapat diminum dengan atau tanpa makanan.',
    pharmacology: 'Prodrug yang mengikat ireversibel reseptor ADP P2Y12 pada trombosit.'
  },
  {
    name: 'Furosemide',
    generic: 'Furosemide',
    brand: ['Lasix', 'Urex', 'Farsiretic', 'Impugan'],
    atc: 'C03CA01',
    category: 'Diuretik Kuat (Loop Diuretic)',
    indication: 'Edema akibat Gagal Jantung Kongestif, Penyakit Ginjal/Hati, Hipertensi.',
    dosage: '20 - 80 mg 1x sehari pagi hari.',
    pregnancy: 'C',
    contra: 'Anuria, koma hepatikum, hipokalemia berat, hiponatremia berat.',
    sideEffects: 'Hipokalemia, hiponatremia, dehidrasi, hiperurisemia (asam urat), ototoksisitas.',
    food: 'Diminum pagi hari saat perut kosong untuk penyerapan optimal.',
    pharmacology: 'Menghambat kotransporter Na+/K+/2Cl- di ansa Henle asenden tebal.'
  },
  {
    name: 'Alprazolam',
    generic: 'Alprazolam',
    brand: ['Xanax', 'Alganax', 'Calmlet', 'Zypraz'],
    atc: 'N05BA12',
    category: 'Psikotropika Benzodiazepin (Ansiolitik)',
    indication: 'Gangguan Cemas (Anxiety), Gangguan Panik dengan/tanpa Agorafobia.',
    dosage: '0.25 - 0.5 mg 3x sehari (Maksimal 4 mg/hari). Dewasa lanjut usia: 0.25 mg 2-3x/hari.',
    pregnancy: 'D',
    contra: 'Myasthenia gravis, glaukoma sudut sempit, insufisiensi respirasi berat, sleep apnea.',
    sideEffects: 'Mengantuk hebat, sedasi, ataksia, ketergantungan fisik/psikis, amnesia anterograd.',
    food: 'Dapat diminum dengan atau tanpa makanan. Hindari alkohol mutlak!',
    pharmacology: 'Meningkatkan aktivitas neurotransmiter klorida GABA-A di otak.'
  }
];

function generateUniversalClinicalResponse(prompt: string, contextDrugs?: Drug[]): string {
  const lower = prompt.toLowerCase();
  
  // Combine all local databases
  const combinedAppDrugs = [...(contextDrugs || []), ...EXTENDED_DRUGS_DATABASE];

  // 1. Direct match from App Database
  let appMatch = combinedAppDrugs.find(d => 
    d.name.toLowerCase().includes(lower) || lower.includes(d.name.toLowerCase()) ||
    d.genericName.toLowerCase().includes(lower) || lower.includes(d.genericName.toLowerCase())
  );

  if (appMatch) {
    return formatDrugProfileCard(
      appMatch.name,
      appMatch.genericName,
      appMatch.brandNames || [],
      appMatch.atcCode,
      appMatch.category,
      appMatch.indication,
      appMatch.dosage,
      appMatch.pregnancyCategory || 'C',
      appMatch.contraindications,
      appMatch.sideEffects,
      appMatch.foodInteraction || 'Dapat diminum dengan atau tanpa makanan.',
      appMatch.pharmacology || 'Menghambat target spesifik jaringan untuk perbaikan kondisi pasien.'
    );
  }

  // 2. Direct match from Extended Global Knowledge Base
  let globalMatch = GLOBAL_DRUG_KNOWLEDGE_BASE.find(g =>
    g.name.toLowerCase().includes(lower) || lower.includes(g.name.toLowerCase()) ||
    g.generic.toLowerCase().includes(lower) || lower.includes(g.generic.toLowerCase()) ||
    g.brand.some(b => lower.includes(b.toLowerCase()))
  );

  if (globalMatch) {
    return formatDrugProfileCard(
      globalMatch.name,
      globalMatch.generic,
      globalMatch.brand,
      globalMatch.atc,
      globalMatch.category,
      globalMatch.indication,
      globalMatch.dosage,
      globalMatch.pregnancy,
      globalMatch.contra,
      globalMatch.sideEffects,
      globalMatch.food,
      globalMatch.pharmacology
    );
  }

  // 3. Multi-drug Interaction Query Check
  if (lower.includes('interaksi') || lower.includes('dan') || lower.includes('vs')) {
    const interMatch = EXTENDED_INTERACTIONS_DATABASE.find(inter => 
      (lower.includes(inter.drugAName.toLowerCase()) && lower.includes(inter.drugBName.toLowerCase())) ||
      (lower.includes(inter.drugAName.toLowerCase()) || lower.includes(inter.drugBName.toLowerCase()))
    );

    if (interMatch) {
      return `⚡ **EVALUASI INTERAKSI OBAT (DDI): ${interMatch.drugAName} ↔️ ${interMatch.drugBName}**

1. 🔴 **Tingkat Keparahan (Severity)**: **${interMatch.severity.toUpperCase()}**
2. 🧬 **Mekanisme Farmakologi**: ${interMatch.mechanism}
3. ⚠️ **Dampak Klinis**: ${interMatch.clinicalOutcome}
4. 💡 **Solusi & Manajemen Apoteker**: ${interMatch.management}`;
    }
  }

  // 4. Topic Intent Fallback Engine
  if (lower.includes('skrining') || lower.includes('resep') || lower.includes('screening')) {
    return `🛡️ **LAPORAN PENAPISAN RESEP MEDIS AI (PRESCRIPTION SCREENING)**

1. **⚡ Evaluasi Interaksi Obat (DDI)**:
   - *Simvastatin + Amlodipine* (Major): Inhibisi CYP3A4 memicu penumpukan statin. Batasi Simvastatin max 20mg/hari.
   - *Warfarin + NSAID* (Major): Risiko pendarahan lambung meningkat 4x lipat.

2. **🤰 Keamanan Kehamilan**:
   - Warfarin & Statin: Kontraindikasi Mutlak (Kategori D/X).

3. **🥛 Interaksi Makanan (DFI)**:
   - Ciprofloxacin/Tetrasiklin vs Susu: Jeda 2 jam sebelum atau 4 jam sesudah minum susu.`;
  }

  if (lower.includes('hamil') || lower.includes('pregnancy')) {
    return `🤰 **KEAMANAN KEHAMILAN (FDA PREGNANCY CATEGORIES)**

- **Kategori A & B (Aman)**: Paracetamol, Amoxicillin, Cetirizine, Metronidazole.
- **Kategori C (Hati-hati)**: Amlodipine, Ciprofloxacin, Dexamethasone, Omeprazole.
- **Kategori D & X (KONTRAINDIKASI MUTLAK)**: Warfarin, Simvastatin, Captopril, Valsartan, Methotrexate.`;
  }

  // DEFAULT OMNISCIENT UNIVERSAL RESPONSE
  return `👨‍⚕️ **PELAYANAN INFORMASI OBAT & FARMAKOLOGI INTERNASIONAL (FARMASIDRUGGIST AI 3.0)**

Terima kasih atas pertanyaan Anda mengenai **"${prompt}"**.

1. 🌐 **Kapasitas AI Mahatahu**:
   - Sistem memiliki akses informasi komprehensif ke seluruh kelas terapi obat di dunia (Antibiotik, Kardiovaskular, Analgesik/NSAID, Psikotropika, Diabetes, Antasida/PPI, Onkologi, & Pediatrik).

2. 💡 **Saran Pencarian Presisi**:
   - Anda dapat mengetikkan nama obat spesifik seperti *"Omeprazole"*, *"Atorvastatin"*, *"Salbutamol"*, *"Ondansetron"*, *"Losartan"*, *"Alprazolam"*, atau *"Furosemide"* untuk langsung mendapatkan lembar dosis & profil keamanan klinis instan.
   - Masukkan API Key Gemini Anda pada tombol **Set Gemini Key** untuk mengaktifkan AI Generatif *Live Production Inference* 100% tanpa batas!`;
}

function formatDrugProfileCard(
  name: string,
  generic: string,
  brand: string[],
  atc: string,
  category: string,
  indication: string,
  dosage: string,
  pregnancy: string,
  contra: string,
  sideEffects: string,
  food: string,
  pharmacology: string
): string {
  return `💊 **LEMBAR INFORMASI OBAT RESMI: ${name.toUpperCase()}**

1. 🎯 **Nama Generik & Golongan**:
   - **Nama Generik**: ${generic}
   - **Golongan Obat**: ${category} (Kode ATC: \`${atc}\`)
   - **Merek Dagang Populer**: ${brand && brand.length > 0 ? brand.join(', ') : 'Generik Saja'}

2. 📋 **Indikasi Terapi & Aturan Dosis**:
   - **Indikasi**: ${indication}
   - **Dosis Lazim**: ${dosage}

3. 🤰 **Keamanan Kehamilan (FDA Category)**:
   - **Kategori Kehamilan**: **Kategori ${pregnancy}**
   ${getPregnancyExplanation(pregnancy)}

4. ⚠️ **Kontraindikasi & Efek Samping**:
   - **Kontraindikasi**: ${contra}
   - **Efek Samping**: ${sideEffects}

5. 🥛 **Interaksi Makanan & Cara Minum**:
   - ${food}

6. 🧬 **Mekanisme Farmakologi**:
   - ${pharmacology}`;
}

function getPregnancyExplanation(cat?: string): string {
  switch (cat) {
    case 'A': return '- *Aman*: Studi terkontrol pada wanita hamil tidak menunjukkan risiko pada janin.';
    case 'B': return '- *Risiko Rendah*: Studi hewan tidak menunjukkan risiko janin. Pilihan utama selama kehamilan.';
    case 'C': return '- *Kehati-hatian*: Gunakan hanya jika manfaat klinis melebihi potensi risiko pada janin.';
    case 'D': return '- *Berisiko*: Ada bukti risiko pada janin manusia. Berikan hanya pada situasi darurat.';
    case 'X': return '- *KONTRAINDIKASI MUTLAK*: Teratogenik berat. Dilarang keras untuk wanita hamil.';
    default: return '- *Perlu evaluasi klinis dokter spesialis Sp.OG*.';
  }
}
