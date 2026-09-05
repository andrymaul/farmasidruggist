// =====================================================================
// SYRINGE-DRIVER ADMIXTURE COMPATIBILITY DATABASE (PENCAMPURAN 1 SPUIT)
// Standar Referensi: Dickman Palliative Care 5th Ed, ASHP Injectable Drugs 2024,
// Trissel's Handbook on Injectable Drugs 2024 & PCF8 (Palliative Care Formulary)
// ZERO DATA DUPLICATION CLINICAL LAYER
// =====================================================================

export interface SyringeAdmixturePair {
  id: string;
  drugAId: string;
  drugBId: string;
  status: 'compatible' | 'incompatible' | 'conditional';
  stabilityHours: number;
  diluent: string;
  evidence: string;
  clinicalContext: string;
  physicalObservations: string;
  clinicalNotes: string;
}

export const SYRINGE_ADMIXTURE_DATABASE: SyringeAdmixturePair[] = [
  {
    "id": "adm-morphine-midazolam",
    "drugAId": "iv-morphine",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Aqua pro injeksi",
    "evidence": "Dickman Palliative Care 5th Ed & ASHP 2024",
    "clinicalContext": "Paliatif & Agitasi Terminal (CSCI / Syringe Driver)",
    "physicalObservations": "Larutan tetap jernih, bebas partikel presipitasi selama 24 jam pada suhu 20-25°C.",
    "clinicalNotes": "Kombinasi baku emas (gold standard) untuk penanganan nyeri refrakter disertai kecemasan atau sesak napas (dyspnea) pada perawatan paliatif kontinu 24 jam."
  },
  {
    "id": "adm-morphine-metoclopramide",
    "drugAId": "iv-morphine",
    "drugBId": "iv-metoclopramide",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Aqua pro injeksi",
    "evidence": "Dickman Palliative Care 5th Ed & Trissel's 2024",
    "clinicalContext": "Nyeri Paliatif disertai Mual/Gastroparesis",
    "physicalObservations": "Stabil dan jernih, lindungi dari paparan cahaya matahari langsung.",
    "clinicalNotes": "Sangat umum digunakan pada pompa infus subkutan kontinu (CSCI) 24 jam. Kontraindikasi jika dicurigai adanya obstruksi mekanik saluran cerna total."
  },
  {
    "id": "adm-morphine-ondansetron",
    "drugAId": "iv-morphine",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "ASHP Injectable Drugs 2024",
    "clinicalContext": "Nyeri Onkologi & Mual Refrakter Opioid",
    "physicalObservations": "Stabil secara fisiko-kimiawi pada konsentrasi morfin hingga 20 mg/mL dan ondansetron 0.5 mg/mL.",
    "clinicalNotes": "Kombinasi efektif untuk pencegahan emetogenik pada pasien onkologi paliatif dengan syringe pump."
  },
  {
    "id": "adm-morphine-ketamine",
    "drugAId": "iv-morphine",
    "drugBId": "iv-ketamine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Dextrose 5%",
    "evidence": "Dickman Palliative Care 5th Ed & PCF8",
    "clinicalContext": "Nyeri Neuropatik Kanker Refrakter & Toleransi Opioid",
    "physicalObservations": "Larutan bening tanpa degradasi potensi kedua analgetik selama 24 jam.",
    "clinicalNotes": "Ketamin dosis sub-anestesi (adjuvan NMDA receptor antagonist) memulihkan sensitivitas reseptor opioid dan mengendalikan hiperalgesia terpusat."
  },
  {
    "id": "adm-morphine-ketorolac",
    "drugAId": "iv-morphine",
    "drugBId": "iv-ketorolac",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Trissel's 2024 & Clinical Study",
    "clinicalContext": "Patient-Controlled Analgesia (PCA) Post-Operative",
    "physicalObservations": "Larutan jernih tanpa perubahan warna atau presipitasi dalam spuit polypropylene selama 24 jam.",
    "clinicalNotes": "Analgesia multimodal pasca bedah ortopedi/mayor, menurunkan kebutuhan total opioid (opioid-sparing effect). Pantau fungsi ginjal dan perdarahan luka bedah."
  },
  {
    "id": "adm-morphine-dexamethasone",
    "drugAId": "iv-morphine",
    "drugBId": "iv-dexamethasone",
    "status": "conditional",
    "stabilityHours": 12,
    "diluent": "NaCl 0.9%",
    "evidence": "Dickman Palliative Care 5th Ed",
    "clinicalContext": "Paliatif (Nyeri Metastasis Tulang / Kompresi Saraf)",
    "physicalObservations": "Rentan terbentuk kristal presipitasi mikroskopik jika konsentrasi deksametason > 1 mg/mL atau didiamkan melebihi 12 jam.",
    "clinicalNotes": "Pencampuran dalam 1 spuit hanya boleh dilakukan jika volume pelarut cukup encer (spuit 50 mL dengan NaCl 0.9%) dan digunakan segera. Periksa visual secara berkala."
  },
  {
    "id": "adm-morphine-furosemide",
    "drugAId": "iv-morphine",
    "drugBId": "iv-furosemide",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024 & ASHP 2024",
    "clinicalContext": "Gagal Jantung / Edema Refrakter Paliatif",
    "physicalObservations": "Presipitasi kristal putih masif seketika dalam hitungan detik.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran dalam 1 spuit atau jalur. Furosemide adalah larutan alkali kuat (pH 8.5-9.3) sedangkan morfin sulfat bersifat asam (pH 2.5-6.0). Reaksi asam-basa langsung mengendapkan furosemide bebas."
  },
  {
    "id": "adm-fentanyl-midazolam",
    "drugAId": "iv-fentanyl",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Dextrose 5%",
    "evidence": "ASHP Injectable Drugs 2024 & Trissel's 2024",
    "clinicalContext": "Sedasi-Analgesia ICU / Prosedural / Syringe Pump",
    "physicalObservations": "Kompatibel sempurna secara fisikokimiawi dalam spuit perfusor selama 24 jam pada suhu ruang terkendali.",
    "clinicalNotes": "Pasangan sedatif-analgetik paling umum di ruang rawat intensif pasien berventilator. Wajib monitoring ketat depresi napas dan hemodinamik."
  },
  {
    "id": "adm-fentanyl-ketamine",
    "drugAId": "iv-fentanyl",
    "drugBId": "iv-ketamine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Trissel's 2024 & Anesthesia Practice",
    "clinicalContext": "Analgesia Intensif / Pasca Trauma / Luka Bakar",
    "physicalObservations": "Jernih tanpa pembentukan partikulat, stabil pada suhu 20-25°C.",
    "clinicalNotes": "Memberikan analgesia seimbang, stabilitas hemodinamik yang lebih superior dibandingkan dengan dosis tunggal opioid tinggi."
  },
  {
    "id": "adm-fentanyl-dexmedetomidine",
    "drugAId": "iv-fentanyl",
    "drugBId": "iv-dexmedetomidine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "ASHP Injectable Drugs 2024",
    "clinicalContext": "Sedasi Kooperatif ICU & Weaning Ventilator",
    "physicalObservations": "Larutan homogen jernih tanpa tanda-tanda inkompatibilitas fisiko-kimiawi selama 24 jam.",
    "clinicalNotes": "Mempermudah ekstubasi dini dan menurunkan insiden delirium ICU tanpa depresi napas dalam."
  },
  {
    "id": "adm-midazolam-ketamine",
    "drugAId": "iv-midazolam",
    "drugBId": "iv-ketamine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Dextrose 5%",
    "evidence": "Dickman Palliative Care 5th Ed & Trissel's 2024",
    "clinicalContext": "Sedasi Disosiatif / Agitasi Refrakter / Sedasi Paliatif",
    "physicalObservations": "Stabil dan jernih, kompatibel dalam spuit kaca maupun polypropylene selama 24 jam.",
    "clinicalNotes": "Midazolam secara efektif meniadakan halusinasi disosiatif dan mimpi buruk (emergence phenomena) yang dipicu oleh ketamin."
  },
  {
    "id": "adm-propofol-lidocaine",
    "drugAId": "iv-propofol",
    "drugBId": "iv-lidocaine",
    "status": "conditional",
    "stabilityHours": 0.5,
    "diluent": "Tanpa pengencer (campuran langsung vial)",
    "evidence": "ASHP Injectable Drugs 2024 & Trissel's 2024",
    "clinicalContext": "Pencegahan Nyeri Suntik Induksi Anestesi",
    "physicalObservations": "Penambahan lidokain HCl (> 20 mg/200 mg propofol) menurunkan stabilitas emulsi lipid. Terjadi koalesensi droplet minyak setelah 30-60 menit.",
    "clinicalNotes": "Hanya boleh dicampur SESAAT sebelum induksi (maksimal 30 menit). DILARANG KERAS disimpan berjam-jam dalam spuit syringe pump karena risiko emboli droplet minyak bebas dan pemecahan emulsi."
  },
  {
    "id": "adm-ondansetron-dexamethasone",
    "drugAId": "iv-ondansetron",
    "drugBId": "iv-dexamethasone",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Dextrose 5%",
    "evidence": "Trissel's 2024 & ASHP Injectable Drugs",
    "clinicalContext": "Profilaksis Mual-Muntah Kemoterapi Akut (CINV)",
    "physicalObservations": "Tetap stabil dan jernih selama 24 jam pada suhu ruang dan terlindung dari cahaya.",
    "clinicalNotes": "Kombinasi sinergis baku emas antiemetik profilaksis pada kemoterapi emetogenik sedang-tinggi. Dapat dicampur dalam 1 spuit 20-50 mL."
  },
  {
    "id": "adm-metoclopramide-dexamethasone",
    "drugAId": "iv-metoclopramide",
    "drugBId": "iv-dexamethasone",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Dickman Palliative Care 5th Ed & Trissel's 2024",
    "clinicalContext": "Mual-Muntah Paliatif / Obstruksi Parsial Usus",
    "physicalObservations": "Larutan homogen tanpa presipitasi selama 24 jam bila terlindung dari paparan cahaya langsung.",
    "clinicalNotes": "Kombinasi prokinetik dan anti-inflamasi untuk mengurangi edema usus dan stimulasi pengosongan lambung pada pasien paliatif."
  },
  {
    "id": "adm-metoclopramide-ranitidine",
    "drugAId": "iv-metoclopramide",
    "drugBId": "iv-ranitidine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Aqua pro injeksi",
    "evidence": "Trissel's 2024 & Clinical Practice",
    "clinicalContext": "Gastritis Akut / Profilaksis Stres Ulkus",
    "physicalObservations": "Jernih stabil tanpa pembentukan partikulat dalam spuit selama 24 jam.",
    "clinicalNotes": "Aman dicampur dalam syringe driver untuk continuous gastric symptom control."
  },
  {
    "id": "adm-tramadol-metoclopramide",
    "drugAId": "iv-tramadol",
    "drugBId": "iv-metoclopramide",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Trissel's 2024 & Clinical Study",
    "clinicalContext": "Analgesia Pasca Bedah + Antiemetik Profilaksis",
    "physicalObservations": "Kompatibel dan stabil secara kimiawi selama 24 jam.",
    "clinicalNotes": "Metoclopramide secara efektif mencegah mual dan muntah yang diinduksi oleh pemberian infus tramadol kontinu."
  },
  {
    "id": "adm-tramadol-ketorolac",
    "drugAId": "iv-tramadol",
    "drugBId": "iv-ketorolac",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Clinical Study & ASHP 2024",
    "clinicalContext": "PCA Nyeri Akut Pasca Bedah Ortopedi/Ginekologi",
    "physicalObservations": "Larutan tetap jernih tanpa pembentukan partikulat selama 24 jam.",
    "clinicalNotes": "Kombinasi analgesik multimodal opioid lemah + NSAID poten, menurunkan skor nyeri secara cepat dengan sparing effect pada opioid kuat."
  },
  {
    "id": "adm-tramadol-ondansetron",
    "drugAId": "iv-tramadol",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Trissel's 2024",
    "clinicalContext": "Nyeri Pasca Bedah dengan Mual Refrakter",
    "physicalObservations": "Larutan jernih stabil selama 24 jam.",
    "clinicalNotes": "Kompatibel fisiko-kimiawi dalam spuit. Catatan farmakodinamik: ondansetron dapat sedikit mengurangi efikasi analgesik tramadol melalui blokade reseptor 5-HT3."
  },
  {
    "id": "adm-dexmedetomidine-ketamine",
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-ketamine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "ASHP Injectable Drugs 2024 & Clinical Study",
    "clinicalContext": "'Ketodex' Sedasi ICU & Prosedural Intervensi",
    "physicalObservations": "Stabil pada suhu ruang tanpa perubahan warna atau partikulat selama 24 jam.",
    "clinicalNotes": "Kombinasi 'Ketodex' populer memberikan sedasi kooperatif dan analgesia kuat dengan stabilitas hemodinamik prima."
  },
  {
    "id": "adm-dexmedetomidine-midazolam",
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "ASHP Injectable Drugs 2024",
    "clinicalContext": "Sedasi Kooperatif Ruang Intensif (ICU)",
    "physicalObservations": "Kompatibel dalam spuit syringe pump selama 24 jam.",
    "clinicalNotes": "Menurunkan kebutuhan dosis benzodiazepine kumulatif dan mempercepat pemulihan neurologis."
  },
  {
    "id": "adm-pantoprazole-morphine",
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-morphine",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "ASHP Injectable Drugs 2024 & Trissel's 2024",
    "clinicalContext": "Gastroproteksi & Analgesia Nyeri Berat",
    "physicalObservations": "Larutan berubah keruh kecokelatan seketika, terjadi hidrolisis cepat cincin sulfonil pantoprazole.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK. Pantoprazole membutuhkan pH basa (>9.0). Lingkungan asam morfin (pH 2.5-6.0) memicu presipitasi dan dekomposisi aktif."
  },
  {
    "id": "adm-pantoprazole-midazolam",
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-midazolam",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "ASHP Injectable Drugs 2024",
    "clinicalContext": "Sedasi ICU & Profilaksis Ulkus Lambung",
    "physicalObservations": "Presipitasi partikulat putih dan perubahan warna larutan.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran dalam 1 spuit syringe pump."
  },
  {
    "id": "adm-pantoprazole-fentanyl",
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-fentanyl",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "ASHP Injectable Drugs 2024",
    "clinicalContext": "ICU Analgesia & Gastroproteksi",
    "physicalObservations": "Presipitasi cepat akibat inkompatibilitas rentang pH ekstrem.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran dalam spuit. Wajib diberikan terpisah."
  },
  {
    "id": "adm-furosemide-midazolam",
    "drugAId": "iv-furosemide",
    "drugBId": "iv-midazolam",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024",
    "clinicalContext": "Sedasi & Terapi Deplesi Cairan",
    "physicalObservations": "Pembentukan kristal mikroskopik dan presipitasi segera.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran 1 spuit karena disparitas pH (furosemide basa kuat vs midazolam asam hidrochlorida)."
  },
  {
    "id": "adm-furosemide-dobutamine",
    "drugAId": "iv-furosemide",
    "drugBId": "iv-dobutamine",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024 & ASHP 2024",
    "clinicalContext": "Syok Kardiogenik Akut dengan Kongesti Paru",
    "physicalObservations": "Presipitasi kristal putih masif seketika, larutan berubah keruh pekat.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran dalam 1 spuit. Reaksi asam-basa langsung merusak kedua senyawa."
  },
  {
    "id": "adm-furosemide-dopamine",
    "drugAId": "iv-furosemide",
    "drugBId": "iv-dopamine",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024 & ASHP 2024",
    "clinicalContext": "Dukungan Inotropik & Diuresis Gagal Ginjal/Jantung",
    "physicalObservations": "Terbentuk endapan kristal seketika saat kontak.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran 1 spuit. Wajib menggunakan syringe pump dan jalur terpisah."
  },
  {
    "id": "adm-furosemide-norepinephrine",
    "drugAId": "iv-furosemide",
    "drugBId": "iv-norepinephrine",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024",
    "clinicalContext": "Syok Septik & Penurunan Beban Cairan",
    "physicalObservations": "Presipitasi asam-basa instan.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran 1 spuit perfusor."
  },
  {
    "id": "adm-dobutamine-dopamine",
    "drugAId": "iv-dobutamine",
    "drugBId": "iv-dopamine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "Dextrose 5% atau NaCl 0.9%",
    "evidence": "Trissel's 2024 & ASHP Injectable Drugs",
    "clinicalContext": "Syok Kardiogenik Berat (Double Inotrope Infusion)",
    "physicalObservations": "Larutan tetap jernih tanpa perubahan warna selama 24 jam dalam spuit perfusor.",
    "clinicalNotes": "Keduanya memiliki pH asam yang cocok (pH 2.5-5.0). Kompatibel dalam 1 spuit jika keterbatasan lumen CVC pada situasi darurat."
  },
  {
    "id": "adm-norepinephrine-dopamine",
    "drugAId": "iv-norepinephrine",
    "drugBId": "iv-dopamine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "Dextrose 5% atau NaCl 0.9%",
    "evidence": "Trissel's 2024",
    "clinicalContext": "Dukungan Vasopresor & Inotropik Gawat Darurat",
    "physicalObservations": "Stabil secara fisiko-kimiawi selama 24 jam terlindung dari cahaya.",
    "clinicalNotes": "Kompatibel dalam 1 spuit darurat, namun pemisahan jalur tetap diutamakan demi kemudahan titrasi independen masing-masing obat."
  },
  {
    "id": "adm-amiodarone-heparin",
    "drugAId": "iv-amiodarone",
    "drugBId": "iv-heparin",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024 & ASHP 2024",
    "clinicalContext": "Sindrom Koroner Akut dengan Fibrilasi Atrium Cepat",
    "physicalObservations": "Presipitasi partikulat keruh putih susu seketika.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran dalam 1 spuit driver. Heparin polianionik bereaksi membentuk kompleks garam tak larut dengan amiodarone kationik."
  },
  {
    "id": "adm-heparin-insulin-regular",
    "drugAId": "iv-heparin",
    "drugBId": "iv-insulin-regular",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "ASHP Injectable Drugs 2024 & Clinical Study",
    "clinicalContext": "Profilaksis Trombosis Jalur Kateter & Kontrol Glikemik",
    "physicalObservations": "Jernih homogen tanpa presipitasi selama 24 jam.",
    "clinicalNotes": "Kompatibel dalam spuit syringe driver pada konsentrasi terapeutik standar."
  },
  {
    "id": "adm-atropine-morphine",
    "drugAId": "iv-atropine",
    "drugBId": "iv-morphine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9% atau Aqua pro injeksi",
    "evidence": "Dickman Palliative Care 5th Ed & Trissel's 2024",
    "clinicalContext": "Death Rattle (Sekresi Terminal) & Nyeri Paliatif",
    "physicalObservations": "Larutan stabil jernih selama 24 jam pada suhu ruang.",
    "clinicalNotes": "Kombinasi klasik perawatan akhir hayat untuk mengeringkan sekresi bronkial berlebih dan mengendalikan nyeri secara simultan."
  },
  {
    "id": "adm-atropine-midazolam",
    "drugAId": "iv-atropine",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Trissel's 2024 & Anesthesia Practice",
    "clinicalContext": "Premedikasi Anestesi & Sedasi Prosedural",
    "physicalObservations": "Jernih stabil tanpa interaksi fisiko-kimiawi selama 24 jam.",
    "clinicalNotes": "Kompatibel dalam 1 spuit untuk premedikasi pra-bedah atau sedasi prosedur bronkoskopi/endoskopi."
  },
  {
    "id": "adm-atropine-metoclopramide",
    "drugAId": "iv-atropine",
    "drugBId": "iv-metoclopramide",
    "status": "conditional",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Stockley's Drug Interactions & Trissel's 2024",
    "clinicalContext": "Penatalaksanaan Gejala Saluran Cerna",
    "physicalObservations": "Secara fisikokimiawi larutan jernih dan stabil selama 24 jam.",
    "clinicalNotes": "PERINGATAN FARMAKODINAMIK: Secara fisik jernih dan kompatibel, namun atropin adalah antagonis muskarinik yang meniadakan efek prokinetik metoclopramide pada lambung. Tidak dianjurkan kecuali ada indikasi khusus."
  },
  {
    "id": "adm-ketorolac-ondansetron",
    "drugAId": "iv-ketorolac",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Trissel's 2024 & Clinical Practice",
    "clinicalContext": "PCA Bedah Rawat Jalan (Day Surgery Analgesia)",
    "physicalObservations": "Stabil dan jernih tanpa perubahan warna selama 24 jam.",
    "clinicalNotes": "Aman dan praktis dicampur dalam spuit PCA untuk kontrol nyeri non-opioid serta profilaksis mual pasca bedah."
  },
  {
    "id": "adm-paracetamol-fentanyl",
    "drugAId": "iv-paracetamol",
    "drugBId": "iv-fentanyl",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "Paracetamol Infus 1000 mg/100 mL",
    "evidence": "Clinical Practice & Trissel's 2024",
    "clinicalContext": "Analgesia Multimodal Perioperatif",
    "physicalObservations": "Larutan jernih stabil tanpa perubahan konsentrasi.",
    "clinicalNotes": "Fentanyl dapat ditambahkan ke dalam botol/spuit infus paracetamol untuk continuous background pain management."
  },
  {
    "id": "adm-paracetamol-morphine",
    "drugAId": "iv-paracetamol",
    "drugBId": "iv-morphine",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "Paracetamol Infus 1000 mg/100 mL",
    "evidence": "Clinical Practice & Trissel's 2024",
    "clinicalContext": "Analgesia Multimodal Bangsal Bedah / ICU",
    "physicalObservations": "Jernih stabil tanpa partikulat.",
    "clinicalNotes": "Analgesia sinergis yang signifikan menekan konsumsi kumulatif opioid pasca bedah ortopedi maupun laparotomi."
  },
  {
    "id": "adm-clonidine-fentanyl",
    "drugAId": "iv-clonidine",
    "drugBId": "iv-fentanyl",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Anesthesia Guidelines & Trissel's 2024",
    "clinicalContext": "Analgesia Epidural / Spuit Syringe Pump",
    "physicalObservations": "Larutan tetap jernih stabil selama 24 jam.",
    "clinicalNotes": "Sinergis poten pada kornu posterior medula spinalis; memperpanjang masa kerja analgesia tanpa menambah risiko depresi respirasi."
  },
  {
    "id": "adm-clonidine-midazolam",
    "drugAId": "iv-clonidine",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "stabilityHours": 24,
    "diluent": "NaCl 0.9%",
    "evidence": "Clinical Practice & ASHP",
    "clinicalContext": "Sedasi Pra-Anestesi / Weaning Agitasi ICU",
    "physicalObservations": "Stabil dan homogen selama 24 jam dalam spuit syringe driver.",
    "clinicalNotes": "Memberikan sedasi halus dan ansiolisis dengan menstabilkan fluktuasi tekanan darah autonom."
  },
  {
    "id": "adm-calcium-gluconate-furosemide",
    "drugAId": "iv-calcium-gluconate",
    "drugBId": "iv-furosemide",
    "status": "incompatible",
    "stabilityHours": 0,
    "diluent": "Tidak diperbolehkan",
    "evidence": "Trissel's 2024 & ASHP 2024",
    "clinicalContext": "Hiperkalemia dengan Volume Overload",
    "physicalObservations": "Presipitasi kalsium tidak larut segera terbentuk dalam spuit.",
    "clinicalNotes": "KONTRAINDIKASI MUTLAK pencampuran dalam 1 spuit atau jalur yang sama. Ion kalsium bereaksi dengan furosemide membentuk endapan kalsium furosemide tak larut."
  }
];

/**
 * Evaluates compatibility of two IV drugs mixed together in a single syringe (Syringe Driver / PCA / CSCI)
 */
export function checkSyringeAdmixture(drugAId: string, drugBId: string): SyringeAdmixturePair | null {
  const match = SYRINGE_ADMIXTURE_DATABASE.find(
    p => (p.drugAId === drugAId && p.drugBId === drugBId) || (p.drugAId === drugBId && p.drugBId === drugAId)
  );
  return match || null;
}
