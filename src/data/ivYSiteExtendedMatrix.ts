// =====================================================================
// IV Y-SITE EXTENDED COMPATIBILITY MATRIX - BATCH 2
// Sumber Resmi: ASHP Injectable Drugs 2024, Trissel's 2024, Stockley's
// ZERO DATA DUPLICATION CLINICAL LAYER
// =====================================================================

import type { YSiteCompatibilityPair } from './ivCompatibilityData';

export const Y_SITE_EXTENDED_MATRIX: YSiteCompatibilityPair[] = [
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-gentamicin",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Inaktivasi kimiawi langsung ikatan cincin beta-laktam dengan gugus amino aminoglikosida membentuk konjugat amida inaktif.",
    "clinicalEffect": "Hilangnya potensi antibakteri gentamisin hingga 50% dan risiko presipitasi garam.",
    "recommendation": "KONTRAINDIKASI percabangan Y-site. Berikan pada vena terpisah atau beri jeda minimal 1 jam dengan pembilasan tuntas."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-ciprofloxacin",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Presipitasi kristal putih kekuningan instan akibat perbedaan pH dan inkompatibilitas kelarutan garam.",
    "clinicalEffect": "Emboli partikulat dan oklusi kateter kanula.",
    "recommendation": "Inkompatibel mutlak. Wajib jalur IV berbeda."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-amiodarone",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Presipitasi amiodarone seketika akibat pH netral/basa dari piperacillin-tazobactam.",
    "clinicalEffect": "Kekeruhan masif dan kegagalan kontrol aritmia.",
    "recommendation": "Gunakan jalur CVC terpisah."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-pantoprazole",
    "status": "incompatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Presipitasi akibat ketidakstabilan pantoprazole pada larutan asam-sedang piperacillin.",
    "clinicalEffect": "Perubahan warna menjadi cokelat keruh dan degradasi obat.",
    "recommendation": "Bilas kateter dengan 20 mL NaCl 0.9% di antara pemberian."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-fentanyl",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Tidak ada interaksi fisiko-kimiawi yang teramati selama 4 jam waktu kontak.",
    "clinicalEffect": "Kedua obat mempertahankan potensi dan kejernihan larutan.",
    "recommendation": "Kompatibel via percabangan Y-site pada konsentrasi standar ICU."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Larutan tetap jernih tanpa perubahan warna atau penurunan kadar selama kontak Y-site.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site pada konsentrasi klinis biasa."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-norepinephrine",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Stabilitas terjaga selama waktu transit Y-site dalam D5W atau Normal Saline.",
    "clinicalEffect": "Tidak ada presipitasi maupun kehilangan efek vasopresor.",
    "recommendation": "Kompatibel via Y-site jika infus norepinefrin dalam pelarut D5W/NS."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-propofol",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Pemisahan fase dan agregasi partikel globul lipid emulsi propofol.",
    "clinicalEffect": "Risiko emboli lemak kapiler paru dan hilangnya efek sedasi.",
    "recommendation": "Jangan pernah mencampur emulsi propofol dengan larutan berpelarut kompleks di Y-site."
  },
  {
    "drugAId": "iv-piperacillin-tazobactam",
    "drugBId": "iv-fluconazole",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak ada presipitasi dan konsentrasi kedua obat stabil.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-dobutamine",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak ada reaksi presipitasi fisik selama 4 jam uji simulasi Y-site.",
    "clinicalEffect": "Larutan jernih dan stabil.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-propofol",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Emulsi lemak propofol tetap stabil dan tidak mengalami 'cracking' selama transit Y-site.",
    "clinicalEffect": "Aman dialirkan bersamaan pada titrasi sedasi ICU.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-amiodarone",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Kekeruhan kabut putih terbentuk dalam 1 jam kontak.",
    "clinicalEffect": "Presipitasi partikulat menyumbat lumen kanula.",
    "recommendation": "Inkompatibel via Y-site. Berikan pada jalur terpisah."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-furosemide",
    "status": "conditional",
    "evidence": "Clinical Study",
    "mechanism": "Furosemide memiliki pH sangat basa (> 8.5) sedangkan dexmedetomidine memiliki pH asam (4.5–7.0).",
    "clinicalEffect": "Potensi presipitasi kristal jika rasio pencampuran tidak seimbang.",
    "recommendation": "Waspada: disarankan jalur terpisah atau bilas kanula sebelum injeksi bolus furosemide."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-potassium-chloride",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Larutan elektrolit kalium klorida encer tidak mempengaruhi stabilitas deksmedetomidin.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-vancomycin",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Larutan tetap jernih dan stabil selama 4 jam kontak.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-dexmedetomidine",
    "drugBId": "iv-meropenem",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak ada dekomposisi atau presipitasi fisik.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-morphine",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Pantoprazole basa (pH 9.0–10.5) menetralkan garam morfin sulfat asam, memicu presipitasi basa bebas morfin yang tidak larut air.",
    "clinicalEffect": "Pembentukan endapan putih seketika di Y-site.",
    "recommendation": "KONTRAINDIKASI Y-SITE. Bilas jalur dengan 20 mL NS sebelum dan sesudah injeksi pantoprazole."
  },
  {
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-fentanyl",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Perbedaan pH memicu presipitasi kristal fentanyl sitrat.",
    "clinicalEffect": "Penyumbatan kateter dan hilangnya analgesia.",
    "recommendation": "Inkompatibel mutlak via Y-site."
  },
  {
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-ondansetron",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Ondansetron HCl membutuhkan pH asam (< 4.5) untuk larut; pH basa pantoprazole memicu presipitasi ondansetron instan.",
    "clinicalEffect": "Endapan putih seperti susu seketika.",
    "recommendation": "Inkompatibel mutlak. Selalu bilas selang infus."
  },
  {
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-nicardipine",
    "status": "incompatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Nicardipine terpresipitasi pada pH > 6.0.",
    "clinicalEffect": "Kristalisasi nicardipine padat.",
    "recommendation": "Inkompatibel via Y-site."
  },
  {
    "drugAId": "iv-pantoprazole",
    "drugBId": "iv-vancomycin",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Vancomycin sangat asam (pH 2.5–4.5) bereaksi dengan pantoprazole membentuk presipitasi keruh masif.",
    "clinicalEffect": "Oklusi total kanula infus.",
    "recommendation": "Inkompatibel via Y-site."
  },
  {
    "drugAId": "iv-omeprazole",
    "drugBId": "iv-furosemide",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Kedua sediaan memiliki pH basa tinggi sehingga tidak memicu reaksi presipitasi asam-basa.",
    "clinicalEffect": "Larutan jernih dan stabil.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-heparin",
    "drugBId": "iv-fentanyl",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak ada presipitasi yang teramati pada pengenceran standar ICU.",
    "clinicalEffect": "Kedua larutan tetap jernih.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-heparin",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Larutan stabil dan jernih selama waktu kontak Y-site.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-heparin",
    "drugBId": "iv-propofol",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Heparin konsentrasi rendah tidak merusak stabilitas emulsi lipid propofol selama transit Y-site.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site pada konsentrasi heparin profilaksis/terapeutik."
  },
  {
    "drugAId": "iv-heparin",
    "drugBId": "iv-potassium-chloride",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel sempurna dalam larutan kristaloid.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-insulin-regular",
    "drugBId": "iv-dobutamine",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Larutan tetap jernih dan stabil.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-insulin-regular",
    "drugBId": "iv-furosemide",
    "status": "conditional",
    "evidence": "Clinical Study",
    "mechanism": "Furosemide memiliki pH basa tinggi sedangkan insulin stabil pada pH netral 7.0–7.8. pH di atas 8.5 dapat mempercepat agregasi molekul insulin.",
    "clinicalEffect": "Potensi hilangnya potensi hipoglikemik insulin pada kontak berkepanjangan.",
    "recommendation": "Disarankan jalur terpisah atau bilas kanula sebelum injeksi bolus furosemide."
  },
  {
    "drugAId": "iv-insulin-regular",
    "drugBId": "iv-propofol",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak mempengaruhi kestabilan emulsi propofol pada waktu kontak singkat Y-site.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-calcium-gluconate",
    "drugBId": "iv-furosemide",
    "status": "conditional",
    "evidence": "Clinical Study",
    "mechanism": "Potensi pembentukan garam kalsium furosemid tergantung pada konsentrasi kalsium bebas.",
    "clinicalEffect": "Kekeruhan samar pada konsentrasi pekat.",
    "recommendation": "Bilas kanula sebelum dan sesudah injeksi kalsium."
  },
  {
    "drugAId": "iv-calcium-gluconate",
    "drugBId": "iv-magnesium-sulfate",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kation divalen stabil bersama dalam pelarut kristaloid encer pada laju infus standar.",
    "clinicalEffect": "Aman dialirkan bersamaan pada protokol tokolitik/resusitasi.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-calcium-gluconate",
    "drugBId": "iv-potassium-chloride",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel sempurna dalam larutan infus kristaloid.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-calcium-chloride",
    "drugBId": "iv-sodium-bicarbonate",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Presipitasi masif kalsium karbonat padat.",
    "clinicalEffect": "Oklusi kateter seketika dan risiko emboli partikulat.",
    "recommendation": "Inkompatibel mutlak via Y-site."
  },
  {
    "drugAId": "iv-calcium-chloride",
    "drugBId": "iv-ceftriaxone",
    "status": "incompatible",
    "evidence": "FDA Labeling",
    "mechanism": "Presipitasi kalsium-seftriakson mematikan.",
    "clinicalEffect": "Presipitasi kristal kapiler organ vital.",
    "recommendation": "KONTRAINDIKASI MUTLAK via Y-site."
  },
  {
    "drugAId": "iv-paracetamol",
    "drugBId": "iv-ceftriaxone",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Kompatibel fisikokimiawi selama waktu infus Y-site.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-paracetamol",
    "drugBId": "iv-meropenem",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Larutan tetap stabil tanpa penurunan potensi antimikroba.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-ketorolac",
    "drugBId": "iv-fentanyl",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak ada presipitasi fisik.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-ketorolac",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Kompatibel stabil pada suhu ruangan.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-ketorolac",
    "drugBId": "iv-amiodarone",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Ketorolac memicu presipitasi amiodarone.",
    "clinicalEffect": "Kekeruhan larutan dan risiko sumbatan selang.",
    "recommendation": "Inkompatibel via Y-site."
  },
  {
    "drugAId": "iv-nitroglycerin",
    "drugBId": "iv-heparin",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel secara fisiko-kimiawi pada jalur Y-site.",
    "clinicalEffect": "Perlu pemantauan aPTT karena NTG dosis tinggi dapat menurunkan efikasi antikoagulan heparin secara farmakodinamik.",
    "recommendation": "Kompatibel fisiko-kimiawi via Y-site, monitor aPTT ketat."
  },
  {
    "drugAId": "iv-nitroglycerin",
    "drugBId": "iv-norepinephrine",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Larutan stabil selama transit Y-site.",
    "clinicalEffect": "Aman via CVC.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-nitroglycerin",
    "drugBId": "iv-dobutamine",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak ada interaksi fisikokimiawi.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-nitroglycerin",
    "drugBId": "iv-furosemide",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Stabil dan jernih pada konsentrasi standar ICU.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-nitroglycerin",
    "drugBId": "iv-morphine",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel sempurna dalam terapi sindrom koroner akut.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-nicardipine",
    "drugBId": "iv-heparin",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Stabil dan tidak ada pembentukan partikel.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-nicardipine",
    "drugBId": "iv-propofol",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Tidak memecah emulsi propofol pada waktu transit Y-site singkat.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-tranexamic-acid",
    "drugBId": "iv-fentanyl",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Larutan tetap jernih dan stabil.",
    "clinicalEffect": "Aman via Y-site pada bedah ortopedi/trauma.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-tranexamic-acid",
    "drugBId": "iv-propofol",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Tidak mengganggu stabilitas emulsi propofol.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-tranexamic-acid",
    "drugBId": "iv-ceftriaxone",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Tidak ada interaksi presipitasi.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-midazolam",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kedua larutan memiliki pH asam dan kompatibel sempurna.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-morphine",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Larutan jernih dan stabil.",
    "clinicalEffect": "Aman dialirkan bersamaan.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-fentanyl",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel stabil.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-propofol",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Tidak merusak emulsi lipid pada transit Y-site.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-ketamine",
    "drugBId": "iv-midazolam",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Kedua agen kompatibel stabil secara fisiko-kimiawi.",
    "clinicalEffect": "Kombinasi sedasi disosiatif ICU dan prosedur darurat yang aman.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-ketamine",
    "drugBId": "iv-propofol",
    "status": "compatible",
    "evidence": "Clinical Study",
    "mechanism": "Ketofol stabil pada waktu kontak Y-site.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-ketamine",
    "drugBId": "iv-furosemide",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Furosemide basa memicu presipitasi ketamin asam.",
    "clinicalEffect": "Endapan kristal instan.",
    "recommendation": "Inkompatibel via Y-site."
  },
  {
    "drugAId": "iv-cisplatin",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Kompatibel stabil dalam pelarut NaCl 0.9%.",
    "clinicalEffect": "Aman dalam kemoterapi sangat emetogenik.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-cisplatin",
    "drugBId": "iv-furosemide",
    "status": "conditional",
    "evidence": "Clinical Study",
    "mechanism": "Kombinasi furosemide dosis tinggi dengan cisplatin meningkatkan risiko ototoksisitas permanen secara farmakodinamik.",
    "clinicalEffect": "Risiko ketulian sensorineural ireversibel.",
    "recommendation": "Hindari kombinasi bersamaan jika hidrasi adekuat dapat dicapai tanpa diuretik."
  },
  {
    "drugAId": "iv-carboplatin",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Larutan jernih dan stabil.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-oxaliplatin",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Kompatibel dalam pelarut D5W.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site (pastikan cairan pembawa adalah D5W, bukan Saline)."
  },
  {
    "drugAId": "iv-doxorubicin",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel stabil tanpa penurunan kadar obat.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-doxorubicin",
    "drugBId": "iv-furosemide",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Presipitasi dan perubahan warna merah doxorubicin akibat pH basa furosemide.",
    "clinicalEffect": "Inaktivasi doxorubicin dan pembentukan endapan.",
    "recommendation": "Inkompatibel via Y-site."
  },
  {
    "drugAId": "iv-paclitaxel",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Kompatibel dengan set infus non-PVC bebas DEHP.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site (wajib set infus non-PVC)."
  },
  {
    "drugAId": "iv-cyclophosphamide",
    "drugBId": "iv-mesna",
    "status": "compatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Mesna adalah uroprotektor spesifik yang kompatibel sempurna dengan siklofosfamid.",
    "clinicalEffect": "Pencegahan sistitis hemoragik tanpa inaktivasi sitotoksik.",
    "recommendation": "Kompatibel via Y-site dan kompatibel dicampur dalam satu kantong infus."
  },
  {
    "drugAId": "iv-fluorouracil",
    "drugBId": "iv-ondansetron",
    "status": "compatible",
    "evidence": "ASHP Injectable Drugs",
    "mechanism": "Kompatibel stabil pada waktu transit Y-site.",
    "clinicalEffect": "Aman via Y-site.",
    "recommendation": "Kompatibel via Y-site."
  },
  {
    "drugAId": "iv-fluorouracil",
    "drugBId": "iv-morphine",
    "status": "incompatible",
    "evidence": "Trissel's 2024",
    "mechanism": "Presipitasi morfin akibat pH basa 5-FU (pH 8.6–9.4).",
    "clinicalEffect": "Pembentukan kristal padat.",
    "recommendation": "Inkompatibel via Y-site."
  }
];
