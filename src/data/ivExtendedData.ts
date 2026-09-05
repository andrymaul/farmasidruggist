// =====================================================================
// IV COMPATIBILITY & ONCOLOGY CHEMOTHERAPY EXTENDED DATABASE (TRISSEL'S / ASHP)
// Standar Resmi: Formularium Nasional Kemenkes RI, PIONAS BPOM RI & ASHP Handbook
// Total Obat Baru: 42 Obat Injeksi RS, Sitotoksik Onkologi, Antidotum & ICU
// =====================================================================

import type { IvDrugProfile } from './ivCompatibilityData';

export const IV_EXTENDED_DRUGS: IvDrugProfile[] = [
  {
    "id": "iv-cisplatin",
    "name": "Cisplatin",
    "genericName": "Cisplatin Injection 50 mg/50 mL / 100 mg/100 mL",
    "brandNames": [
      "Platinol",
      "Cisplatin Kalbe",
      "Cisplatin Sanbe"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "3.5 - 5.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% (WAJIB mengandung NaCl minimal 0.2% - 0.9% untuk mencegah degradasi kompleks platinum)",
      "volumeToReconstitute": "Larutkan 50 mg ke dalam 500 - 1000 mL NaCl 0.9%",
      "resultantConcentration": "0.05 - 0.1 mg/mL",
      "instructions": "JANGAN PERNAH melarutkan dalam D5W murni tanpa natrium klorida karena molekul cisplatin akan terhidrolisis menjadi metabolit toksik inaktif."
    },
    "diluents": {
      "ns": true,
      "d5w": false,
      "rl": false,
      "wfi": false,
      "d5ns": true,
      "notes": "Wajib dilarutkan dalam larutan mengandung klorida (NS atau D5/0.45% NS) untuk stabilitas."
    },
    "stability": {
      "roomTemp25C": "24 Jam pada suhu kamar (20 - 25°C)",
      "refrigerated2to8C": "JANGAN DISIMPAN DI KULKAS (Presipitasi kristal platinum terjadi di bawah 15°C)",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.5 mg/mL",
      "maxCentralConcentration": "1 mg/mL",
      "standardInfusionRate": "Infus IV diberikan dalam waktu 6 - 8 jam bersama hidrasi agresif",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "WAJIB HIDRASI AGRESIF: Berikan 1 - 2 Liter cairan intravena sebelum dan sesudah infus cisplatin untuk mencegah nekrosis tubular ginjal akut.",
        "HINDARI penggunaan jarum atau set infus yang mengandung komponen ALUMINIUM karena akan bereaksi membentuk endapan hitam platinum dan kehilangan potensi.",
        "Sangat emetogenik berat: Wajib premedikasi antiemetik kombinasi tripel (Ondansetron/Granisetron + Dexamethasone + Aprepitant)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan jarum/alat suntik berbahan aluminium.",
      "Inkompatibel dengan D5W murni (hidrolisis platinum).",
      "Inkompatibel dengan Sodium Bicarbonate."
    ]
  },
  {
    "id": "iv-carboplatin",
    "name": "Carboplatin",
    "genericName": "Carboplatin Injection 150 mg / 450 mg",
    "brandNames": [
      "Paraplatin",
      "Carboplatin DBL"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "5.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "D5W atau Normal Saline 0.9%",
      "volumeToReconstitute": "Larutkan hingga konsentrasi 0.5 - 2 mg/mL dalam 250 - 500 mL pelarut",
      "resultantConcentration": "0.5 - 2 mg/mL",
      "instructions": "Infus intravena perlahan dalam 15 - 60 menit. Dosis dihitung berdasarkan rumus Calvert (Target AUC x [GFR + 25])."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "2 mg/mL",
      "maxCentralConcentration": "4 mg/mL",
      "standardInfusionRate": "Infus IV dalam waktu 15 - 60 menit",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "Jangan menggunakan set infus atau jarum suntik yang mengandung bagian aluminium.",
        "Toksisitas pembatas dosis utama adalah mielosupresi berat (khususnya trombositopenia).",
        "Hitung dosis akurat menggunakan rumus Calvert berdasarkan laju filtrasi glomerulus (GFR)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Aluminium (presipitasi hitam).",
      "Sodium Bicarbonate (degradasi basa)."
    ]
  },
  {
    "id": "iv-oxaliplatin",
    "name": "Oxaliplatin",
    "genericName": "Oxaliplatin Serbuk / Larutan Injeksi 50 mg / 100 mg",
    "brandNames": [
      "Eloxatin",
      "Oxaliplatin Kalbe"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "4.0 - 6.0",
    "reconstitution": {
      "recommendedDiluent": "Dextrose 5% (D5W) MURNI (KONTRAINDIKASI MUTLAK NORMAL SALINE / NaCl)",
      "volumeToReconstitute": "Larutkan 50 - 100 mg ke dalam 250 - 500 mL D5W murni",
      "resultantConcentration": "0.2 - 0.7 mg/mL",
      "instructions": "KONTRAINDIKASI MUTLAK pelarutan dengan larutan mengandung klorida (NaCl 0.9% / Saline). Ion klorida mendegradasi oxaliplatin seketika!"
    },
    "diluents": {
      "ns": false,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "HANYA BOLEH dilarutkan dalam D5W murni. Saline/klorida menyebabkan degradasi obat seketika."
    },
    "stability": {
      "roomTemp25C": "6 Jam dalam kantong D5W",
      "refrigerated2to8C": "24 Jam dalam kantong D5W",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.7 mg/mL",
      "maxCentralConcentration": "2 mg/mL",
      "standardInfusionRate": "Infus IV diberikan selama 2 - 6 jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "HINDARI PAPARAN DINGIN: Edukasi pasien untuk menghindari meminum air es, menyentuh benda dingin, atau udara AC dingin selama 48 jam pasca infus karena memicu neuropati sensorik laringofaringeal akut (sensasi tercekik/spasme pita suara).",
        "JANGAN PERNAH dibilas dengan larutan NaCl sebelum atau sesudah infus oxaliplatin; gunakan D5W untuk membilas jalur infus.",
        "Hindari peralatan injeksi berbahan aluminium."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI MUTLAK NaCl 0.9% / Larutan Klorida.",
      "Inkompatibel dengan larutan basa (Fluorouracil, Diazepam).",
      "Aluminium."
    ]
  },
  {
    "id": "iv-paclitaxel",
    "name": "Paclitaxel",
    "genericName": "Paclitaxel Injection 30 mg / 100 mg / 300 mg",
    "brandNames": [
      "Taxol",
      "Paclitaxel DBL",
      "Ebetaxel"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "4.4 - 4.8",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Dextrose 5% (D5W)",
      "volumeToReconstitute": "Encerkan hingga konsentrasi akhir 0.3 - 1.2 mg/mL dalam botol kaca atau kantong non-PVC (Polyolefin/EVA)",
      "resultantConcentration": "0.3 - 1.2 mg/mL",
      "instructions": "WAJIB menggunakan wadah dan set infus BEBAS PVC (non-PVC tubing) serta filter in-line 0.22 mikron untuk mencegah pelarutan plastisiser DEHP toksik oleh surfaktan Cremophor EL."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Gunakan wadah kaca atau plastik non-PVC (Polyolefin)."
    },
    "stability": {
      "roomTemp25C": "27 Jam pada suhu kamar",
      "refrigerated2to8C": "JANGAN DISIMPAN DI KULKAS (dapat terjadi presipitasi)",
      "lightProtectionRequired": true,
      "filterRequired": true,
      "filterType": "In-line filter 0.22 mikron membran hidrofilik"
    },
    "administration": {
      "maxPeripheralConcentration": "1.2 mg/mL",
      "maxCentralConcentration": "1.2 mg/mL",
      "standardInfusionRate": "Infus IV diberikan selama 3 jam (regimen standar)",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "WAJIB PREMEDIKASI: Deksametason 20 mg oral/IV (12 & 6 jam sebelum infus), Difenhidramin 50 mg IV, dan Ranitidine 50 mg IV 30 menit sebelum infus untuk mencegah anafilaksis berat akibat Cremophor EL.",
        "WAJIB menggunakan selang infus NON-PVC dan in-line filter 0.22 mikron.",
        "Bila diberikan bersama Cisplatin, berikan PACLITAXEL TERLEBIH DAHULU sebelum Cisplatin untuk mencegah mielosupresi berlebih."
      ]
    },
    "blackBoxIncompatibilities": [
      "Set infus berbahan PVC (ekstraksi DEHP toksik).",
      "Inkompatibel tanpa filter in-line 0.22 mikron."
    ]
  },
  {
    "id": "iv-docetaxel",
    "name": "Docetaxel",
    "genericName": "Docetaxel Injection 20 mg / 80 mg",
    "brandNames": [
      "Taxotere",
      "Brexel",
      "Docetaxel Sanbe"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "3.0 - 4.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Encerkan hingga konsentrasi 0.3 - 0.74 mg/mL dalam kantong non-PVC (maksimal 0.9 mg/mL)",
      "resultantConcentration": "0.3 - 0.74 mg/mL",
      "instructions": "Kocok perlahan dengan membalikkan botol secara manual selama 15 detik. Biarkan busa mereda sebelum dimasukkan ke kantong infus."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Wadah kaca atau kantong non-PVC (Polypropylene)."
    },
    "stability": {
      "roomTemp25C": "4 Jam (dalam kantong infus non-PVC)",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.74 mg/mL",
      "maxCentralConcentration": "0.9 mg/mL",
      "standardInfusionRate": "Infus IV diberikan selama 1 jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "PREMEDIKASI STEROID: Deksametason 8 mg oral 2 kali sehari selama 3 hari (dimulai 1 hari sebelum infus) untuk mencegah retensi cairan berat dan reaksi hipersensitivitas.",
        "Pantau fungsi hati (bilirubin, SGOT/SGPT); dosis harus dikurangi drastis jika ada disfungsi hepar."
      ]
    },
    "blackBoxIncompatibilities": [
      "Set infus PVC konsentrasi tinggi.",
      "Inkompatibel dengan larutan alkali/basa."
    ]
  },
  {
    "id": "iv-doxorubicin",
    "name": "Doxorubicin",
    "genericName": "Doxorubicin Hydrochloride Injeksi 10 mg / 50 mg",
    "brandNames": [
      "Adriamycin",
      "Doxorubicin Kalbe",
      "Doxorubicin DBL"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "2.5 - 3.5 (Merah menyala)",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Larutkan 50 mg dalam 25 mL WFI/NS (2 mg/mL), lalu encerkan ke dalam 100 mL NS/D5W",
      "resultantConcentration": "0.5 - 2 mg/mL",
      "instructions": "Larutan berwarna merah jingga menyala. Berikan perlahan via side-arm set infus yang sedang mengalir lancar dalam 15 - 30 menit."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "48 Jam (terlindung cahaya)",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "2 mg/mL (side-arm)",
      "maxCentralConcentration": "2 mg/mL",
      "standardInfusionRate": "IV push lambat via side-arm dalam 15 - 30 menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "VESIKAN KUAT EKSTREM: Ekstravasasi menyebabkan nekrosis ulseratif jaringan yang luas. Bila terjadi ekstravasasi, SEGERA HENTIKAN infus, aspirasi cairan, berikan kompres DINGIN/ES dan antidotum Dexrazoxane.",
        "KARDIOVALVULAR KUMULATIF: Dosis kumulatif seumur hidup MAKSIMAL 450 - 550 mg/m2 untuk mencegah kardiomiopati dilatasi fatal.",
        "Edukasi pasien: Urin akan berwarna kemerahan selama 24 - 48 jam pasca infus (bukan darah/hematuria)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel Y-Site dengan Heparin (presipitasi langsung).",
      "Inkompatibel dengan Fluorouracil (presipitasi).",
      "Dexamethasone."
    ]
  },
  {
    "id": "iv-cyclophosphamide",
    "name": "Cyclophosphamide",
    "genericName": "Cyclophosphamide Serbuk Injeksi 500 mg / 1000 mg",
    "brandNames": [
      "Endoxan",
      "Cyclophosphamide Kalbe"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "4.0 - 6.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Water for Injection (WFI)",
      "volumeToReconstitute": "Larutkan 500 mg dalam 25 mL WFI (20 mg/mL), encerkan dalam 250 - 500 mL NS/D5W",
      "resultantConcentration": "2 - 20 mg/mL",
      "instructions": "Kocok kuat hingga serbuk larut sempurna. Larutan harus jernih tak berwarna."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "6 Hari",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "20 mg/mL",
      "maxCentralConcentration": "20 mg/mL",
      "standardInfusionRate": "Infus IV dalam waktu 30 - 60 menit",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "SISTITIS HEMORAGIK: Metabolit akrolein diekskresikan ke vesika urinaria dan memicu perdarahan kandung kemih masif. WAJIB hidrasi oral/IV minimal 2 - 3 Liter/hari.",
        "Pada dosis tinggi (> 1 g/m2), WAJIB diberikan protektor urothelium MESNA bersamaan dengan siklofosfamid.",
        "Anjurkan pasien sering berkemih (setiap 2 jam)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan larutan alkali kuat."
    ]
  },
  {
    "id": "iv-fluorouracil",
    "name": "5-Fluorouracil (5-FU)",
    "genericName": "Fluorouracil Injection 500 mg/10 mL",
    "brandNames": [
      "Curacil",
      "Adrucil",
      "Fluorouracil Ebewe"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "8.6 - 9.4 (Alkali)",
    "reconstitution": {
      "recommendedDiluent": "Dextrose 5% (D5W) atau Normal Saline 0.9%",
      "volumeToReconstitute": "Encerkan dosis ke dalam 500 - 1000 mL D5W atau NS, atau gunakan pompa infus portabel (elastomeric pump)",
      "resultantConcentration": "0.5 - 10 mg/mL",
      "instructions": "Larutan bersifat basa. Jangan gunakan jika larutan berubah warna menjadi gelap atau timbul endapan kristal."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dalam D5W dan NS."
    },
    "stability": {
      "roomTemp25C": "72 Jam (dalam pompa infus kontinu elastometrik)",
      "refrigerated2to8C": "JANGAN DISIMPAN DI KULKAS (memicu presipitasi kristal)",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mg/mL",
      "maxCentralConcentration": "50 mg/mL (pompa kontinu)",
      "standardInfusionRate": "IV bolus lambat (3-5 menit) atau infus kontinu 24 - 48 jam via CVC",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "Defisiensi enzim Dihydropyrimidine Dehydrogenase (DPD): Pasien dengan defisiensi DPD mengalami toksisitas mematikan (mukositis berat, diare masif, pansitopenia).",
        "Karena pH basa (8.6-9.4), inkompatibel fatal bila dicampur obat asam (Doxorubicin, Cisplatin, Ondansetron)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel asam: Doxorubicin, Cisplatin, Ondansetron, Morphine.",
      "Diazepam."
    ]
  },
  {
    "id": "iv-methotrexate",
    "name": "Methotrexate IV",
    "genericName": "Methotrexate Sodium Injection 50 mg / 500 mg / 1 g",
    "brandNames": [
      "Metoject",
      "Methotrexate Ebewe",
      "Emthexate"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "7.5 - 9.0",
    "reconstitution": {
      "recommendedDiluent": "D5W atau Normal Saline 0.9%",
      "volumeToReconstitute": "Encerkan dosis tinggi ke dalam 500 - 1000 mL D5W atau NS dengan tambahan Sodium Bicarbonate",
      "resultantConcentration": "1 - 25 mg/mL",
      "instructions": "Pada dosis tinggi (HD-MTX ≥ 500 mg/m2), WAJIB melakukan hidrasi dan alkalinisasi urin dengan Sodium Bicarbonate hingga target pH urin ≥ 7.0."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "25 mg/mL",
      "maxCentralConcentration": "50 mg/mL",
      "standardInfusionRate": "Infus IV dalam waktu 4 - 24 jam tergantung protokol",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "ALKALINISASI URIN: Urin asam menyebabkan presipitasi kristal metotreksat di tubulus ginjal, memicu gagal ginjal anuria akut. Pertahankan pH urin ≥ 7.0.",
        "LEUCOVORIN RESCUE (Asam Folinat): WAJIB diberikan tepat waktu (biasanya 24 jam setelah inisiasi MTX) untuk menyelamatkan sel normal dari kematian.",
        "KONTRAINDIKASI NSAID & Salisilat: Menghambat klirens ginjal MTX hingga memicu toksisitas fatal."
      ]
    },
    "blackBoxIncompatibilities": [
      "NSAID (Ketorolac, Ibuprofen) - menghambat eliminasi ginjal.",
      "Inkompatibel dengan larutan asam kuat."
    ]
  },
  {
    "id": "iv-gemcitabine",
    "name": "Gemcitabine",
    "genericName": "Gemcitabine Hydrochloride 200 mg / 1000 mg",
    "brandNames": [
      "Gemzar",
      "Gemcitabine Kalbe",
      "Fonogem"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "2.7 - 3.3",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% MURNI",
      "volumeToReconstitute": "Larutkan 200 mg dalam 5 mL NS atau 1 g dalam 25 mL NS (Konsentrasi rekonstitusi: 38 mg/mL)",
      "resultantConcentration": "0.1 - 38 mg/mL (encerkan ke dalam 100 - 500 mL NS)",
      "instructions": "Kocok kuat untuk melarutkan. Rekonstitusi maksimal 38 mg/mL. Jangan disimpan di kulkas karena memicu kristalisasi."
    },
    "diluents": {
      "ns": true,
      "d5w": false,
      "rl": false,
      "wfi": true,
      "notes": "Gunakan Normal Saline 0.9% murni sebagai pelarut utama."
    },
    "stability": {
      "roomTemp25C": "24 Jam pada suhu kamar",
      "refrigerated2to8C": "JANGAN DISIMPAN DI KULKAS (memicu presipitasi kristal)",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "38 mg/mL",
      "maxCentralConcentration": "38 mg/mL",
      "standardInfusionRate": "Infus IV diberikan tepat dalam waktu 30 MENIT",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "WAKTU INFUS KETAT 30 MENIT: Memperpanjang waktu infus > 60 menit atau frekuensi lebih dari sekali seminggu melipatgandakan toksisitas hematologi mielosupresi berat.",
        "Bukan vesikan, tetapi iritan ringan."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan Acyclovir, Furosemide, Piperacillin/Tazobactam."
    ]
  },
  {
    "id": "iv-etoposid",
    "name": "Etoposide (VP-16)",
    "genericName": "Etoposide Injection 100 mg/5 mL",
    "brandNames": [
      "Vepesid",
      "Eposin",
      "Etoposide DBL"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "3.0 - 4.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Encerkan hingga konsentrasi 0.2 - 0.4 mg/mL ke dalam 250 - 500 mL pelarut",
      "resultantConcentration": "0.2 - 0.4 mg/mL",
      "instructions": "KONSENTRASI KRITIS: Konsentrasi > 0.4 mg/mL SANGAT TIDAK STABIL dan dapat mengalami presipitasi kristal mendadak dalam hitungan menit!"
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Konsentrasi 0.2 mg/mL stabil 96 jam; konsentrasi 0.4 mg/mL stabil 24 jam."
    },
    "stability": {
      "roomTemp25C": "24 Jam pada konsentrasi 0.4 mg/mL (96 jam pada 0.2 mg/mL)",
      "refrigerated2to8C": "JANGAN DISIMPAN DI KULKAS (memicu kristalisasi cepat)",
      "lightProtectionRequired": false,
      "filterRequired": true,
      "filterType": "In-line filter 0.22 mikron"
    },
    "administration": {
      "maxPeripheralConcentration": "0.4 mg/mL",
      "maxCentralConcentration": "0.4 mg/mL",
      "standardInfusionRate": "Infus IV diberikan minimal selama 30 - 60 menit",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "BAHAYA HIPOTENSI: Infus cepat (< 30 menit) memicu kolaps kardiovaskular dan hipotensi berat atau bronkospasme akut. JANGAN PERNAH bolus IV cepat.",
        "Wadah infus non-PVC lebih disukai.",
        "Inspeksi visual berkala terhadap terbentuknya endapan kristal mikro."
      ]
    },
    "blackBoxIncompatibilities": [
      "Konsentrasi infus > 0.4 mg/mL (presipitasi kristal).",
      "Inkompatibel IV Bolus cepat."
    ]
  },
  {
    "id": "iv-vincristine",
    "name": "Vincristine",
    "genericName": "Vincristine Sulfate Injection 1 mg / 2 mg",
    "brandNames": [
      "Oncovin",
      "Vincristine Kalbe",
      "Vincristine DBL"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "3.5 - 5.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Larutkan dosis ke dalam 50 mL kantong mini-bag NS (JANGAN berikan dalam spuit spuit-injeksi biasa untuk mencegah salah rute)",
      "resultantConcentration": "0.02 - 0.1 mg/mL",
      "instructions": "WHO Alert: Wajib disiapkan dalam kantong infus mini-bag (50 mL) berlabel KHUSUS \"FOR INTRAVENOUS USE ONLY - FATAL IF GIVEN BY OTHER ROUTES\"."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam (terlindung cahaya)",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "1 mg/mL (hanya via mini-bag drip)",
      "maxCentralConcentration": "1 mg/mL",
      "standardInfusionRate": "Infus IV drip lambat dalam waktu 5 - 10 menit via jalur yang sedang mengalir",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "FDA BOXED WARNING: FATAL JIKA DIBERIKAN INTRATEKAL (kematian akibat paralisis asendens ireversibel). HANYA UNTUK INTRAVENA!",
        "VESIKAN KUAT: Ekstravasasi menyebabkan nekrosis jaringan. Bila terjadi ekstravasasi, berikan kompres HANGAT (bukan dingin!) dan antidotum Hialuronidase.",
        "DOSIS TUNGGAL MAKSIMAL: Dibatasi maksimal 2 mg per pemberian untuk meminimalkan neuropati sensorimotor perifer berat dan ileus paralitik."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI MUTLAK INTRA-TEKAL (KEMATIAN FATAL).",
      "Inkompatibel dengan larutan alkali kuat."
    ]
  },
  {
    "id": "iv-mesna",
    "name": "Mesna (Uroprotektor)",
    "genericName": "Mesna (Sodium 2-Mercaptoethanesulfonate) 400 mg/4 mL",
    "brandNames": [
      "Uromitexan",
      "Mesna Kalbe"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "6.5 - 8.5",
    "reconstitution": {
      "recommendedDiluent": "D5W atau Normal Saline 0.9%",
      "volumeToReconstitute": "Dapat diberikan bolus IV langsung atau diencerkan dalam 50 - 250 mL NS/D5W",
      "resultantConcentration": "1 - 20 mg/mL",
      "instructions": "Diberikan pada jam 0 (bersamaan siklofosfamid/ifosfamid), jam ke-4, dan jam ke-8 dengan total dosis 60 - 100% dari dosis obat kemoterapi."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan sebagian besar pelarut infus."
    },
    "stability": {
      "roomTemp25C": "24 Jam (dalam kantong infus)",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "20 mg/mL",
      "maxCentralConcentration": "100 mg/mL",
      "standardInfusionRate": "IV bolus lambat dalam 15 menit atau infus kontinu 24 jam",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "Gugus tiol bebas menginaktivasi akrolein secara langsung di kandung kemih.",
        "Dapat menyebabkan reaksi positif palsu pada tes keton urin (dipstick).",
        "Inkompatibel jika dicampur langsung dalam satu wadah dengan Cisplatin (menginaktivasi cisplatin)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Cisplatin (inaktivasi timbal balik jika dicampur langsung)."
    ]
  },
  {
    "id": "iv-trastuzumab",
    "name": "Trastuzumab",
    "genericName": "Trastuzumab Serbuk Liofilisasi 440 mg",
    "brandNames": [
      "Herceptin",
      "Kanjinti",
      "Herzuma"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "6.0",
    "reconstitution": {
      "recommendedDiluent": "Bacteriostatic Water for Injection (BWFI) atau WFI steril 20 mL",
      "volumeToReconstitute": "Larutkan 440 mg dengan 20 mL pelarut (Konsentrasi: 21 mg/mL). Encerkan dosis ke dalam 250 mL Normal Saline 0.9%",
      "resultantConcentration": "0.8 - 3.2 mg/mL dalam 250 mL NS",
      "instructions": "KONTRAINDIKASI MUTLAK DEXTROSE (D5W): Dekstrosa menyebabkan agregasi protein antibodi monoklonal! Putar perlahan vial saat rekonstitusi; JANGAN DIKOCOK untuk mencegah pembentukan busa denaturasi protein."
    },
    "diluents": {
      "ns": true,
      "d5w": false,
      "rl": false,
      "wfi": true,
      "notes": "HANYA BOLEH dilarutkan dalam Normal Saline 0.9%. Dextrose memicu presipitasi/agregasi protein."
    },
    "stability": {
      "roomTemp25C": "24 Jam (dalam kantong NS)",
      "refrigerated2to8C": "28 Hari (vial rekonstitusi dengan BWFI)",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "3.2 mg/mL",
      "maxCentralConcentration": "3.2 mg/mL",
      "standardInfusionRate": "Loading dose (8 mg/kg) diberikan dalam 90 menit; dosis rumatan (6 mg/kg) dalam 30 menit",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "KARDIOVALVULAR: Evaluasi fraksi ejeksi ventrikel kiri (LVEF) baseline dengan ekokardiografi sebelum terapi dan setiap 3 bulan; hentikan jika terjadi penurunan LVEF signifikan.",
        "JANGAN PERNAH diberikan sebagai IV push atau bolus cepat."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI Dextrose 5% (D5W) - agregasi protein.",
      "JANGAN dikocok keras."
    ]
  },
  {
    "id": "iv-rituximab",
    "name": "Rituximab",
    "genericName": "Rituximab Injeksi 100 mg/10 mL / 500 mg/50 mL",
    "brandNames": [
      "MabThera",
      "Ruxience",
      "Truxima"
    ],
    "category": "Kemoterapi Onkologi & Imunologi",
    "phRange": "6.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Dextrose 5% (D5W)",
      "volumeToReconstitute": "Encerkan hingga konsentrasi 1 - 4 mg/mL ke dalam 250 - 500 mL kantong infus NS/D5W",
      "resultantConcentration": "1 - 4 mg/mL",
      "instructions": "Balikkan kantong infus perlahan untuk mencampur; JANGAN DIKOCOK. Larutan harus jernih tak berwarna."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dalam NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "12 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "4 mg/mL",
      "maxCentralConcentration": "4 mg/mL",
      "standardInfusionRate": "Mulai 50 mg/jam, eskalasi 50 mg/jam tiap 30 menit hingga maksimal 400 mg/jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "CYTOKINE RELEASE SYNDROME (CRS) & SINDROM LISIS TUMOR: Wajib premedikasi Paracetamol 1000 mg oral + Difenhidramin 50 mg IV 30 menit sebelum infus.",
        "Waspada reaktivasi Hepatitis B fatal: Skrining HBsAg dan Anti-HBc wajib sebelum memulai terapi rituximab."
      ]
    },
    "blackBoxIncompatibilities": [
      "IV Push / Bolus cepat (KONTRAINDIKASI - memicu kolaps anafilaksis).",
      "Inkompatibel larutan alkali."
    ]
  },
  {
    "id": "iv-cefoperazone-sulbactam",
    "name": "Cefoperazone / Sulbactam",
    "genericName": "Cefoperazone Sodium + Sulbactam Sodium 1 g / 2 g",
    "brandNames": [
      "Sulperazone",
      "Bactraz",
      "Cefbactam"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "4.5 - 6.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W atau WFI",
      "volumeToReconstitute": "Larutkan 1 g dalam 5 mL WFI, encerkan dalam 50 - 100 mL NS/D5W",
      "resultantConcentration": "10 - 20 mg/mL",
      "instructions": "Kocok kuat hingga larut sempurna. Infus intermiten dalam waktu 30 - 60 menit."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS, D5W, dan WFI."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "5 Hari",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "20 mg/mL",
      "maxCentralConcentration": "40 mg/mL",
      "standardInfusionRate": "Infus IV intermiten dalam 30 - 60 menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "EFEK DISULFIRAM: Mengandung cincin N-methylthiotetrazole (NMTT). Konsumsi alkohol selama terapi dan hingga 5 hari setelahnya memicu mual muntah hebat, takikardia, dan keringat dingin.",
        "HIPOPROTROMBINEMIA: NMTT menghambat vitamin K epoksida reduktase, memicu pemanjangan PT/INR dan risiko perdarahan. Pantau koagulasi dan berikan profilaksis Vitamin K1 pada pasien malnutrisi/sirosis."
      ]
    },
    "blackBoxIncompatibilities": [
      "Aminoglikosida (Gentamicin, Amikacin) - inkompatibel langsung (presipitasi)."
    ]
  },
  {
    "id": "iv-doripenem",
    "name": "Doripenem",
    "genericName": "Doripenem Serbuk Injeksi 500 mg",
    "brandNames": [
      "Doribax",
      "Finibax"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "4.5 - 5.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Larutkan 500 mg dengan 10 mL WFI/NS, lalu encerkan ke dalam 100 mL NS atau D5W",
      "resultantConcentration": "4.5 mg/mL",
      "instructions": "STABILITAS PENDEK DALAM D5W: Larutan dalam D5W hanya stabil 1 jam pada suhu kamar. Normal Saline 0.9% lebih disukai karena stabil 4 jam pada suhu kamar."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "NS stabil 4 jam; D5W hanya stabil 1 jam pada suhu kamar."
    },
    "stability": {
      "roomTemp25C": "4 Jam (dalam NS) / 1 Jam (dalam D5W)",
      "refrigerated2to8C": "24 Jam (dalam NS)",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "5 mg/mL",
      "maxCentralConcentration": "5 mg/mL",
      "standardInfusionRate": "Infus IV dalam waktu 1 jam (atau 4 jam extended infusion pada infeksi Pseudomonas berat)",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "KONTRAINDIKASI PADA PNEUMONIA VENTILATOR (VAP): Uji klinis menunjukkan peningkatan mortalitas pada pasien VAP dibanding imipenem.",
        "Menurunkan konsentrasi asam valproat serum hingga di bawah batas terapeutik, memicu kejang berulang."
      ]
    },
    "blackBoxIncompatibilities": [
      "Sodium Valproate (menurunkan kadar valproat secara drastis).",
      "Diazepam."
    ]
  },
  {
    "id": "iv-aztreonam",
    "name": "Aztreonam",
    "genericName": "Aztreonam Serbuk Injeksi 1 g",
    "brandNames": [
      "Azactam",
      "Cayston"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "4.5 - 7.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9%, D5W, atau Ringer Lactate",
      "volumeToReconstitute": "Larutkan 1 g dalam 3 mL WFI (untuk bolus) atau encerkan dalam 50 - 100 mL pelarut (untuk infus)",
      "resultantConcentration": "10 - 20 mg/mL",
      "instructions": "Kocok kuat. Larutan jernih tak berwarna hingga kuning jerami muda."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan NS, D5W, dan Ringer Laktat."
    },
    "stability": {
      "roomTemp25C": "48 Jam",
      "refrigerated2to8C": "7 Hari",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "20 mg/mL",
      "maxCentralConcentration": "40 mg/mL",
      "standardInfusionRate": "IV bolus perlahan dalam 3 - 5 menit atau infus IV dalam 20 - 60 menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "AMAN PADA ALERGI PENISILIN: Struktur cincin monobaktam tidak memiliki reaktivitas silang dengan alergi penisilin atau sefalosporin (KECUALI Ceftazidime karena memiliki rantai samping identik).",
        "Hanya aktif terhadap bakteri Gram-negatif aerobik (tidak aktif terhadap Gram-positif dan anaerob)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Ampicillin, Metronidazole, Nafcillin."
    ]
  },
  {
    "id": "iv-fosfomycin",
    "name": "Fosfomycin Disodium IV",
    "genericName": "Fosfomycin Disodium Serbuk Injeksi 2 g / 4 g",
    "brandNames": [
      "Fosmidex",
      "Invanz-alt",
      "Fosfocina"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "9.0 - 10.5 (Sangat Basa)",
    "reconstitution": {
      "recommendedDiluent": "Water for Injection (WFI) atau D5W atau NS",
      "volumeToReconstitute": "Larutkan 2 g dalam 10 mL WFI, lalu encerkan ke dalam 100 - 250 mL D5W atau NS",
      "resultantConcentration": "20 - 40 mg/mL",
      "instructions": "Reaksi eksotermik ringan saat rekonstitusi. Larutan harus diencerkan minimal dalam 100 mL pelarut dan diinfus lambat dalam waktu minimal 60 menit untuk mencegah flebitis dan hipokalemia akut."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dalam NS dan D5W. D5W lebih disukai untuk meminimalkan beban natrium."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "40 mg/mL",
      "maxCentralConcentration": "80 mg/mL (CVC)",
      "standardInfusionRate": "Infus IV lambat selama 60 - 120 menit",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "BEBAN NATRIUM TINGGI: Setiap 1 gram fosfomisin disodium mengandung 14.5 mEq (330 mg) natrium. Dosis 12-24 g/hari menyumbang beban natrium masif; pantau ketat gagal jantung kongestif dan edema paru.",
        "HIPOKALEMIA BERAT: Ekskresi anion fosfomisin non-reabsorbable di tubulus ginjal memicu pembuangan kalium masif. Pantau elektrolit kalium harian."
      ]
    },
    "blackBoxIncompatibilities": [
      "Kalsium glukonat, Ciprofloxacin, Midazolam."
    ]
  },
  {
    "id": "iv-voriconazole",
    "name": "Voriconazole IV",
    "genericName": "Voriconazole Serbuk Injeksi 200 mg",
    "brandNames": [
      "Vfend IV",
      "Vorikaf"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "5.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Water for Injection (WFI) 19 mL",
      "volumeToReconstitute": "Larutkan 200 mg dengan 19 mL WFI (Konsentrasi: 10 mg/mL). Encerkan ke dalam kantong 100 - 250 mL NS atau D5W",
      "resultantConcentration": "0.5 - 5 mg/mL (standar: 2 - 4 mg/mL)",
      "instructions": "Kocok hingga larut sempurna. JANGAN PERNAH diberikan sebagai IV bolus. Infus IV diberikan dengan kecepatan konstan maksimal 3 mg/kg/jam selama 1 - 2 jam."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dalam NS, D5W, dan Ringer Laktat."
    },
    "stability": {
      "roomTemp25C": "24 Jam pada suhu 2 - 8°C (setelah pengenceran)",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "5 mg/mL",
      "maxCentralConcentration": "5 mg/mL",
      "standardInfusionRate": "Kecepatan infus maksimal 3 mg/kg/jam selama 1 - 2 jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "AKUMULASI SBECD PADA GAGAL GINJAL: Formulasi IV mengandung bahan pembawa sulfobutileter beta-siklodekstrin (SBECD) yang diekskresikan lewat ginjal. Pada pasien dengan CrCl < 50 mL/min, SBECD dapat berakumulasi toksik pada tubulus ginjal; ganti ke bentuk oral.",
        "Waspada gangguan penglihatan transien (fotofobia, penglihatan kabur/berpendar warna-warni) pada 30 menit pasca infus."
      ]
    },
    "blackBoxIncompatibilities": [
      "Bikarbonat, Elektrolit pekat, Larutan infus nutrisi parenteral total (TPN)."
    ]
  },
  {
    "id": "iv-caspofungin",
    "name": "Caspofungin",
    "genericName": "Caspofungin Acetate Serbuk Injeksi 50 mg / 70 mg",
    "brandNames": [
      "Cancidas",
      "Caspofungin Kalbe"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "5.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Water for Injection (KONTRAINDIKASI MUTLAK DEXTROSE)",
      "volumeToReconstitute": "Larutkan 50/70 mg dalam 10.5 mL WFI/NS, lalu encerkan ke dalam 250 mL Normal Saline 0.9%",
      "resultantConcentration": "0.2 - 0.5 mg/mL",
      "instructions": "KONTRAINDIKASI MUTLAK PELARUT DEXTROSE (D5W): Kaspofungin terdegradasi dan tidak stabil dalam larutan yang mengandung glukosa/dekstrosa."
    },
    "diluents": {
      "ns": true,
      "d5w": false,
      "rl": false,
      "wfi": true,
      "notes": "HANYA BOLEH dilarutkan dalam Normal Saline 0.9% murni. Dextrose memicu degradasi obat."
    },
    "stability": {
      "roomTemp25C": "24 Jam (dalam kantong NS)",
      "refrigerated2to8C": "48 Jam (dalam kantong NS)",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.5 mg/mL",
      "maxCentralConcentration": "0.5 mg/mL",
      "standardInfusionRate": "Infus IV lambat diberikan selama 1 jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "JANGAN PERNAH dicampur dengan larutan mengandung dekstrosa.",
        "Bukan substrat enzim CYP450, namun inducer rifampisin dapat menurunkan kadar kaspofungin serum hingga 30% (tingkatkan dosis rumatan menjadi 70 mg/hari)."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI Dextrose (D5W).",
      "Inkompatibel dengan larutan asam."
    ]
  },
  {
    "id": "iv-micafungin",
    "name": "Micafungin",
    "genericName": "Micafungin Sodium Serbuk Injeksi 50 mg / 100 mg",
    "brandNames": [
      "Mycamine",
      "Fungitac"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "5.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Dextrose 5% (D5W)",
      "volumeToReconstitute": "Larutkan 50 mg atau 100 mg dengan 5 mL NS/D5W, lalu encerkan ke dalam 100 mL NS/D5W",
      "resultantConcentration": "0.5 - 1 mg/mL",
      "instructions": "Putar perlahan vial untuk melarutkan; JANGAN DIKOCOK untuk menghindari pembentukan busa."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam pada suhu kamar bila terlindung dari cahaya",
      "refrigerated2to8C": "24 Jam (terlindung cahaya)",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "1.5 mg/mL",
      "maxCentralConcentration": "1.5 mg/mL",
      "standardInfusionRate": "Infus IV lambat diberikan selama 1 jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "WAJIB PERLINDUNGAN CAHAYA: Tutup kantong infus dengan penutup buram/aluminium foil pelindung cahaya selama pemberian.",
        "Tidak memerlukan dosis muat (loading dose); tidak terpengaruh oleh gangguan ginjal atau hepar ringan-sedang."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan kalsium glukonat, furosemid, omeprazol."
    ]
  },
  {
    "id": "iv-anidulafungin",
    "name": "Anidulafungin",
    "genericName": "Anidulafungin Serbuk Injeksi 100 mg",
    "brandNames": [
      "Eraxis"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "3.5 - 5.5",
    "reconstitution": {
      "recommendedDiluent": "Water for Injection (WFI) 30 mL",
      "volumeToReconstitute": "Larutkan 100 mg dengan 30 mL WFI (3.33 mg/mL), lalu encerkan ke dalam 100 - 250 mL NS atau D5W",
      "resultantConcentration": "0.77 mg/mL",
      "instructions": "Larutan hasil rekonstitusi harus diencerkan lebih lanjut sebelum digunakan. Kecepatan infus maksimal 1.1 mg/menit."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "48 Jam (dalam kantong infus)",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.77 mg/mL",
      "maxCentralConcentration": "0.77 mg/mL",
      "standardInfusionRate": "Kecepatan infus maksimal 1.1 mg/menit (dosis 100 mg minimal 90 menit; 200 mg minimal 180 menit)",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "DEGRADASI KIMIAWI MURNI: Tidak dimetabolisme oleh hepar dan tidak diekskresikan oleh ginjal (terdegradasi secara enzimatik spontan pada pH tubuh). Sangat aman tanpa penyesuaian dosis pada gagal ginjal maupun sirosis berat.",
        "Infus cepat memicu reaksi terkait pelepasan histamin (flushing, pruritus, hipotensi)."
      ]
    },
    "blackBoxIncompatibilities": [
      "IV Push / Bolus cepat (memicu anafilaktoid histaminik)."
    ]
  },
  {
    "id": "iv-clarithromycin",
    "name": "Clarithromycin IV",
    "genericName": "Clarithromycin Lactobionate Serbuk Injeksi 500 mg",
    "brandNames": [
      "Klacid IV",
      "Biclar IV"
    ],
    "category": "Antibiotik / Antijamur",
    "phRange": "4.8 - 6.0",
    "reconstitution": {
      "recommendedDiluent": "Water for Injection (WFI) 10 mL (KONTRAINDIKASI SALINE / AIR LAIN SAAT REKONSTITUSI AWAL)",
      "volumeToReconstitute": "Larutkan 500 mg dengan 10 mL WFI murni. Encerkan ke dalam 250 mL Normal Saline 0.9%, D5W, atau Ringer Lactate",
      "resultantConcentration": "2 mg/mL",
      "instructions": "Wajib direkonstitusi HANYA dengan WFI murni; jangan gunakan pelarut mengandung garam anorganik pada tahap awal karena memicu presipitasi laktobionat."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Rekonstitusi awal hanya WFI; pengenceran lanjutan kompatibel dengan NS, D5W, RL."
    },
    "stability": {
      "roomTemp25C": "6 Jam pada suhu kamar",
      "refrigerated2to8C": "48 Jam (dalam kantong infus)",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "2 mg/mL (KONSENTRASI MAKSIMAL untuk mencegah flebitis berat)",
      "maxCentralConcentration": "5 mg/mL (hanya via CVC)",
      "standardInfusionRate": "Infus IV diberikan minimal selama 60 MENIT",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "FLEBITIS LOKAL PARAH: Iritan pembuluh darah vena yang sangat kuat. JANGAN PERNAH diberikan bolus IV atau konsentrasi > 2 mg/mL pada vena perifer.",
        "Inhibitor kuat CYP3A4 dan memicu pemanjangan interval QTc."
      ]
    },
    "blackBoxIncompatibilities": [
      "IV Bolus / Push (KONTRAINDIKASI MUTLAK).",
      "Cisapride, Terfenadine, Astemizole."
    ]
  },
  {
    "id": "iv-urapidil",
    "name": "Urapidil IV",
    "genericName": "Urapidil Hydrochloride Injeksi 25 mg/5 mL / 50 mg/10 mL",
    "brandNames": [
      "Ebrantil"
    ],
    "category": "Antikoagulan & Kardiovaskular",
    "phRange": "5.6 - 6.6",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Diberikan bolus IV lambat atau diencerkan 100 - 250 mg ke dalam 500 mL pelarut (Konsentrasi: 4 mg/mL)",
      "resultantConcentration": "0.5 - 4 mg/mL",
      "instructions": "Obat pilihan utama pada krisis hipertensi emergensi perioperatif dan preeklampsia/eklampsia."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "4 mg/mL",
      "maxCentralConcentration": "5 mg/mL",
      "standardInfusionRate": "Bolus awal 25 mg IV lambat dalam 20 detik, dilanjutkan infus rumatan 9 - 30 mg/jam",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "Bekerja ganda melalui blokade reseptor alfa-1 perifer dan stimulasi reseptor serotonin 5-HT1A sentral, menurunkan tekanan darah tanpa takikardia refleks paradoksikal.",
        "Pantau tekanan darah invasif/non-invasif secara kontinu."
      ]
    },
    "blackBoxIncompatibilities": [
      "Larutan basa / alkali kuat (presipitasi kristal)."
    ]
  },
  {
    "id": "iv-clonidine",
    "name": "Clonidine Hydrochloride IV",
    "genericName": "Clonidine Hydrochloride Injeksi 150 mcg/mL",
    "brandNames": [
      "Catapres Injeksi"
    ],
    "category": "Antikoagulan & Kardiovaskular",
    "phRange": "5.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Encerkan 150 mcg (1 mL) ke dalam 10 - 20 mL NS atau dalam 100 - 500 mL untuk infus",
      "resultantConcentration": "7.5 - 15 mcg/mL",
      "instructions": "Wajib diencerkan dan diberikan infus sangat lambat dalam waktu minimal 10 - 15 menit."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan NS, D5W, dan RL."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "15 mcg/mL",
      "maxCentralConcentration": "30 mcg/mL",
      "standardInfusionRate": "Infus IV lambat dalam waktu 10 - 15 menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "PARADOXICAL HYPERTENSION BILA BOLUS CEPAT: Injeksi IV bolus cepat merangsang reseptor alfa-2 perifer pembuluh darah perifer yang memicu lonjakan tekanan darah mendadak sebelum efek sentral hipotensi tercapai. SELALU INFUS LAMBAT.",
        "Dapat memicu bradikardia berat dan sedasi mendalam."
      ]
    },
    "blackBoxIncompatibilities": [
      "IV Push cepat (KONTRAINDIKASI MUTLAK).",
      "Inkompatibel dengan Diazepam."
    ]
  },
  {
    "id": "iv-alprostadil",
    "name": "Alprostadil (PGE1)",
    "genericName": "Alprostadil Injeksi 20 mcg / 500 mcg",
    "brandNames": [
      "Prostavasin",
      "Prostin VR Pediatric"
    ],
    "category": "Antikoagulan & Kardiovaskular",
    "phRange": "4.5 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Dextrose 5% (D5W)",
      "volumeToReconstitute": "Pediatrik: Larutkan 500 mcg ke dalam 50 - 100 mL NS/D5W (Konsentrasi: 5 - 10 mcg/mL)",
      "resultantConcentration": "2 - 20 mcg/mL",
      "instructions": "Siapkan larutan baru setiap 24 jam. Jangan gunakan jika larutan keruh."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mcg/mL",
      "maxCentralConcentration": "20 mcg/mL",
      "standardInfusionRate": "Dosis awal neonatus: 0.05 - 0.1 mcg/kgBB/menit titrasi kontinu via syringe pump",
      "infusionRoute": "IV Syringe Pump",
      "specialPrecautions": [
        "MEMPERTAHANKAN PATENSI DUKTUS ARTERIOSUS: Terapi penyelamat nyawa darurat pada neonatus dengan penyakit jantung bawaan sianotik duktus dependen (Transposisi Arteri Besar, Tetralogi Fallot, Koarktasio Aorta).",
        "APNEA PADA NEONATUS: Apnea terjadi pada 10-12% neonatus (terutama berat lahir < 2 kg); pastikan fasilitas intubasi endotrakeal dan ventilator mekanik siap siaga di samping tempat tidur."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan larutan alkali/basa."
    ]
  },
  {
    "id": "iv-ephedrine",
    "name": "Ephedrine Hydrochloride IV",
    "genericName": "Ephedrine Hydrochloride Injeksi 50 mg/mL",
    "brandNames": [
      "Ephedrin HCl Indofarma"
    ],
    "category": "Vasoaktif / Inotropik",
    "phRange": "4.5 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Encerkan 50 mg (1 mL) dengan 9 mL NS ke dalam spuit 10 mL (Konsentrasi: 5 mg/mL)",
      "resultantConcentration": "5 mg/mL",
      "instructions": "Wajib diencerkan menjadi 5 mg/mL sebelum disuntikkan. Diberikan secara titrasi bolus 5 - 10 mg setiap 3-5 menit sesuai kebutuhan."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan sebagian besar pelarut infus standar."
    },
    "stability": {
      "roomTemp25C": "24 Jam dalam spuit (terlindung cahaya)",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "5 mg/mL",
      "maxCentralConcentration": "10 mg/mL",
      "standardInfusionRate": "IV bolus titrasi 5 - 10 mg per pemberian (maksimal 50 mg per sesi)",
      "infusionRoute": "IV Bolus",
      "specialPrecautions": [
        "HIPOTENSI ANESTESI SPINAL: Vasopresor pilihan utama untuk mengatasi hipotensi maternal pasca anestesi spinal pada seksio sesarea karena tidak menurunkan aliran darah uteroplasenta secara drastis.",
        "Takifilaksis (penurunan respons setelah dosis berulang) dapat terjadi akibat deplesi simpanan norepinefrin vesikular."
      ]
    },
    "blackBoxIncompatibilities": [
      "Phenobarbital, Thiopental, Hydrocortisone."
    ]
  },
  {
    "id": "iv-phenylephrine",
    "name": "Phenylephrine Hydrochloride IV",
    "genericName": "Phenylephrine Hydrochloride Injeksi 10 mg/mL",
    "brandNames": [
      "Neo-Synephrine"
    ],
    "category": "Vasoaktif / Inotropik",
    "phRange": "3.0 - 5.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Encerkan 10 mg ke dalam 100 mL NS (100 mcg/mL) untuk bolus, atau 20 - 40 mg dalam 250 mL NS untuk infus kontinu (80 - 160 mcg/mL)",
      "resultantConcentration": "100 mcg/mL (bolus) / 80 - 160 mcg/mL (infus)",
      "instructions": "Agonis alfa-1 murni tanpa stimulasi beta-adrenergik. Meningkatkan resistensi vaskular sistemik tanpa efek takikardia."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "100 mcg/mL",
      "maxCentralConcentration": "200 mcg/mL (CVC)",
      "standardInfusionRate": "Bolus 50 - 100 mcg IV lambat atau infus kontinu 0.5 - 2 mcg/kgBB/menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "BRADIKARDIA REFLEKS: Vasokonstriksi alfa-1 murni yang kuat memicu stimulasi baroreseptor vagal dan bradikardia refleks yang nyata; hindari pada pasien dengan bradikardia berat atau disfungsi miokard.",
        "Pilihan utama pada syok septik dengan takiaritma atau hipotensi anestesi obstetri."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan larutan alkali (Furosemide, Phenytoin)."
    ]
  },
  {
    "id": "iv-dipyridamole",
    "name": "Dipyridamole IV",
    "genericName": "Dipyridamole Injeksi 10 mg/2 mL (5 mg/mL)",
    "brandNames": [
      "Persantin IV"
    ],
    "category": "Antikoagulan & Kardiovaskular",
    "phRange": "2.7 - 3.3",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Encerkan dosis (0.56 mg/kg) minimal dalam rasio 1:2 dengan pelarut (biasanya dalam 50 mL)",
      "resultantConcentration": "2.5 mg/mL",
      "instructions": "Diberikan infus IV dalam waktu 4 menit untuk uji stres perfusi miokard farmakologis (Thallium/SPECT myocardial imaging)."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dalam NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "2.5 mg/mL",
      "maxCentralConcentration": "5 mg/mL",
      "standardInfusionRate": "Infus IV diberikan tepat dalam waktu 4 MENIT (0.142 mg/kg/menit)",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "BRONKOSPASME BERAT PADA ASMA: KONTRAINDIKASI MUTLAK pada pasien asma bronkial atau PPOK berat karena akumulasi adenosin memicu bronkospasme fatal.",
        "ANTIDOTUM WAJIB SIAP: Siapkan injeksi Aminofilin 125 - 250 mg IV untuk membalikkan iskemia miokard atau bronkospasme yang dipicu dipiridamol."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI pada asma aktif.",
      "Inkompatibel dengan larutan alkali kuat."
    ]
  },
  {
    "id": "iv-protamine",
    "name": "Protamine Sulfate",
    "genericName": "Protamine Sulfate Injeksi 50 mg/5 mL (10 mg/mL)",
    "brandNames": [
      "Protamine DBL"
    ],
    "category": "Lainnya",
    "phRange": "6.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Diberikan tanpa pengenceran (undiluted) atau diencerkan dalam 50 mL Normal Saline 0.9%",
      "volumeToReconstitute": "1 mg protamin menetralkan ~100 unit heparin natrium",
      "resultantConcentration": "10 mg/mL",
      "instructions": "Injeksi IV sangat lambat dalam waktu minimal 10 menit (kecepatan maksimal 5 mg/menit)."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam setelah dibuka",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mg/mL",
      "maxCentralConcentration": "10 mg/mL",
      "standardInfusionRate": "Injeksi IV sangat lambat maksimal 5 mg/menit (tidak boleh melebihi 50 mg dalam 10 menit)",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "KOLAPS KARDIOVASKULAR / HIPOTENSI FATAL: Injeksi cepat memicu pelepasan histamin masif, hipotensi berat refrakter, bradikardia, dan edema paru non-kardiogenik mematikan.",
        "Risiko anafilaksis tinggi pada pasien dengan alergi ikan, vasektomi, atau riwayat paparan protamin seng insulin (NPH)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel Y-Site dengan Ceftriaxone, Diazepam, Furosemide."
    ]
  },
  {
    "id": "iv-phytomenadione",
    "name": "Phytomenadione (Vitamin K1)",
    "genericName": "Phytomenadione Injeksi 10 mg/mL / 2 mg/mL (Neonatus)",
    "brandNames": [
      "Phytonadione",
      "Konakion MM",
      "Neo-K"
    ],
    "category": "Lainnya",
    "phRange": "5.0 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Dextrose 5% (D5W) atau Normal Saline 0.9%",
      "volumeToReconstitute": "Encerkan 10 mg ke dalam 50 mL D5W atau NS",
      "resultantConcentration": "0.2 mg/mL",
      "instructions": "Infus IV diberikan sangat lambat (kecepatan maksimal 1 mg/menit)."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dalam D5W dan NS."
    },
    "stability": {
      "roomTemp25C": "24 Jam (terlindung cahaya)",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.2 mg/mL",
      "maxCentralConcentration": "1 mg/mL",
      "standardInfusionRate": "Kecepatan infus IV MAKSIMAL 1 mg/menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "FDA BLACK BOX WARNING: REAKSI ANAFILAKTOID FATAL dilaporkan pada pemberian IV cepat (bronkospasme, syok kolaps, henti jantung). Rute IV HANYA digunakan bila darurat perdarahan masif dan rute IM/SC/Oral tidak memungkinkan.",
        "Wajib terlindung dari cahaya (tutup spuit/infus)."
      ]
    },
    "blackBoxIncompatibilities": [
      "IV Bolus cepat (KONTRAINDIKASI - Black Box).",
      "Dobutamine."
    ]
  },
  {
    "id": "iv-deferoxamine",
    "name": "Deferoxamine Mesylate",
    "genericName": "Deferoxamine Mesylate Serbuk Injeksi 500 mg",
    "brandNames": [
      "Desferal"
    ],
    "category": "Lainnya",
    "phRange": "4.0 - 6.0",
    "reconstitution": {
      "recommendedDiluent": "Water for Injection (WFI) 5 mL",
      "volumeToReconstitute": "Larutkan 500 mg dengan 5 mL WFI (Konsentrasi: 100 mg/mL). Encerkan dalam 150 - 500 mL NS atau D5W",
      "resultantConcentration": "1 - 10 mg/mL",
      "instructions": "Larutan harus jernih tak berwarna hingga sedikit kekuningan. Infus lambat kontinu."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "7 Hari",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mg/mL",
      "maxCentralConcentration": "100 mg/mL (pompa SC)",
      "standardInfusionRate": "Infus IV kecepatan maksimal 15 mg/kgBB/jam",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "Khelator besi untuk hemokromatosis dan kelebihan beban besi transfusi pada talasemia.",
        "Infus IV cepat memicu kolaps hipotensi, urtikaria masif, dan syok anafilaktoid.",
        "Urin pasien dapat berubah warna menjadi merah anggur kemerahan (*vin rosé*) akibat ekskresi kompleks ferrioxamine."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan larutan alkali kuat."
    ]
  },
  {
    "id": "iv-calcium-chloride",
    "name": "Calcium Chloride 10%",
    "genericName": "Calcium Chloride Dihydrate 10% Injeksi (100 mg/mL)",
    "brandNames": [
      "Kalsium Klorida 10% Otsuka"
    ],
    "category": "Elektrolit & Koreksi",
    "phRange": "5.5 - 7.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau D5W",
      "volumeToReconstitute": "Dapat diberikan tanpa pengenceran via CVC dalam henti jantung, atau diencerkan 1 g dalam 100 mL NS/D5W",
      "resultantConcentration": "10 - 100 mg/mL",
      "instructions": "Mengandung 27.2 mg kalsium elementer per mL (3 KALI LEBIH TINGGI dari Kalsium Glukonat). WAJIB DIBERIKAN VIA JALUR VENA SENTRAL (CVC)."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "20 mg/mL (HANYA DARURAT RESUSITASI JANTUNG)",
      "maxCentralConcentration": "100 mg/mL (Wajib via CVC)",
      "standardInfusionRate": "IV push lambat via CVC maksimal 1 mL (100 mg) per menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "NEKROSIS JARINGAN EKSTREM: Ekstravasasi kalsium klorida ke jaringan subkutan memicu vasospasme berat, selulitis nekrotikan, dan nekrosis kulit luas (sloughing). HINDARI VENA PERIFER KECIL.",
        "KONTRAINDIKASI MUTLAK INTRAKARDIAK / JALUR RINGER LAKTAT / CEFRIAXONE."
      ]
    },
    "blackBoxIncompatibilities": [
      "Ceftriaxone (presipitasi kristal kalsium-seftriakson fatal).",
      "Sodium Bicarbonate, Fosfat, Sulfat."
    ]
  },
  {
    "id": "iv-octreotide",
    "name": "Octreotide",
    "genericName": "Octreotide Acetate Injeksi 100 mcg / 500 mcg",
    "brandNames": [
      "Sandostatin",
      "Octride"
    ],
    "category": "Gastrointestinal",
    "phRange": "3.9 - 4.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Dextrose 5% (D5W)",
      "volumeToReconstitute": "Larutkan 500 mcg dalam 50 - 100 mL NS untuk infus kontinu (Konsentrasi: 5 - 10 mcg/mL)",
      "resultantConcentration": "5 - 10 mcg/mL",
      "instructions": "Bolus awal 50 mcg IV lambat dalam 3-5 menit, diikuti infus kontinu 25 - 50 mcg/jam selama 2-5 hari untuk perdarahan varises esofagus."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam (dalam kantong infus)",
      "refrigerated2to8C": "Simpan ampul di kulkas (2-8°C)",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "50 mcg/mL",
      "maxCentralConcentration": "100 mcg/mL",
      "standardInfusionRate": "Infus IV kontinu 25 - 50 mcg/jam via syringe pump",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "Baveno VII Consensus: Vasokonstriktor splanknikus pilihan utama untuk perdarahan varises esofagus akut pada sirosis hepatis.",
        "Dapat memicu fluktuasi kadar glukosa darah (hipoglikemia atau hiperglikemia akibat inhibisi glukagon dan insulin)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan emulsi lipid nutrisi parenteral total (TPN)."
    ]
  },
  {
    "id": "iv-terlipressin",
    "name": "Terlipressin",
    "genericName": "Terlipressin Acetate Serbuk Injeksi 1 mg",
    "brandNames": [
      "Glypressin",
      "Terlipressin Kalbe"
    ],
    "category": "Vasoaktif / Inotropik",
    "phRange": "3.0 - 5.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% atau Water for Injection (WFI)",
      "volumeToReconstitute": "Larutkan 1 mg dengan 5 mL pelarut pelengkap. Dapat diberikan IV bolus lambat atau infus kontinu",
      "resultantConcentration": "0.2 mg/mL",
      "instructions": "Perdarahan varises: 1 - 2 mg IV bolus lambat tiap 4 jam. Sindrom Hepatorenal (HRS): 1 mg IV tiap 4-6 jam atau infus kontinu 2 - 4 mg/hari bersama Albumin."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "12 Jam setelah rekonstitusi",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.2 mg/mL",
      "maxCentralConcentration": "0.4 mg/mL",
      "standardInfusionRate": "IV bolus perlahan dalam waktu minimal 2 menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "EASL / AASLD Lini Pertama: Terapi lini 1 untuk Sindrom Hepatorenal-Acute Kidney Injury (HRS-AKI) pada sirosis bila dikombinasikan dengan Human Albumin.",
        "ISKEMIA PERIFER & MIYOKARD: Pantau tanda iskemia digital jari tangan/kaki, nekrosis kulit, kram perut, dan iskemia miokard."
      ]
    },
    "blackBoxIncompatibilities": [
      "Larutan alkali kuat."
    ]
  },
  {
    "id": "iv-levetiracetam",
    "name": "Levetiracetam IV",
    "genericName": "Levetiracetam Injection 500 mg/5 mL (100 mg/mL)",
    "brandNames": [
      "Keppra IV",
      "Lepsy IV"
    ],
    "category": "Sedasi & Anestesi",
    "phRange": "5.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9%, Dextrose 5% (D5W), atau Ringer Lactate",
      "volumeToReconstitute": "Encerkan 500 - 1500 mg ke dalam 100 mL pelarut",
      "resultantConcentration": "5 - 15 mg/mL",
      "instructions": "Infus IV diberikan selama 15 menit. Tidak memerlukan dosis muat lambat bertahap."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Sangat kompatibel dengan NS, D5W, dan RL."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "15 mg/mL",
      "maxCentralConcentration": "15 mg/mL",
      "standardInfusionRate": "Infus IV diberikan selama 15 MENIT",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "ANTIKONVULSAN ICU TERAMAN: Tidak berinteraksi dengan enzim sitokrom P450 hepar (ekskresi ginjal murni); menjadi pilihan utama kejang pada pasien dengan penyakit hati atau polifarmasi ICU.",
        "Dapat memicu iritabilitas, agresi, dan somnolen."
      ]
    },
    "blackBoxIncompatibilities": [
      "Inkompatibel dengan Diazepam, Furosemide."
    ]
  },
  {
    "id": "iv-valproate-sodium",
    "name": "Sodium Valproate IV",
    "genericName": "Sodium Valproate Serbuk Injeksi 400 mg",
    "brandNames": [
      "Depakine IV"
    ],
    "category": "Sedasi & Anestesi",
    "phRange": "7.5 - 8.5",
    "reconstitution": {
      "recommendedDiluent": "Water for Injection (WFI) 4 mL",
      "volumeToReconstitute": "Larutkan 400 mg dengan 4 mL WFI (100 mg/mL). Encerkan ke dalam 100 - 500 mL NS atau D5W",
      "resultantConcentration": "4 - 10 mg/mL",
      "instructions": "Bolus IV lambat dalam 3 - 5 menit (dosis muat 15-30 mg/kg) atau infus kontinu."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dengan NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mg/mL",
      "maxCentralConcentration": "20 mg/mL",
      "standardInfusionRate": "IV push lambat dalam 3 - 5 menit atau infus 1 - 2 mg/kg/jam",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "FDA BLACK BOX: Hepatotoksisitas fatal dan pankreatitis akut mematikan.",
        "KONTRAINDIKASI MUTLAK bersama antibiotik Karbapenem (Meropenem, Doripenem) karena karbapenem menurunkan kadar valproat hingga 80% dalam hitungan jam, memicu status epileptikus refrakter."
      ]
    },
    "blackBoxIncompatibilities": [
      "Meropenem, Doripenem, Imipenem (KONTRAINDIKASI MUTLAK - penurunan drastis kadar valproat).",
      "Amiodarone."
    ]
  },
  {
    "id": "iv-dexketoprofen",
    "name": "Dexketoprofen Trometamol IV",
    "genericName": "Dexketoprofen Trometamol Injeksi 50 mg/2 mL (25 mg/mL)",
    "brandNames": [
      "Ketesse IV",
      "Tafen IV"
    ],
    "category": "Analgesik & Antiinflamasi",
    "phRange": "6.5 - 8.5",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9%, D5W, atau Ringer Lactate",
      "volumeToReconstitute": "Diberikan bolus IV lambat minimal 15 detik atau diencerkan dalam 100 mL pelarut (infus 10-30 menit)",
      "resultantConcentration": "0.5 mg/mL (infus)",
      "instructions": "Kocok perlahan. Lindungi dari cahaya alami langsung setelah pengenceran."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan NS, D5W, dan Ringer Laktat."
    },
    "stability": {
      "roomTemp25C": "24 Jam (terlindung cahaya)",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": true,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "0.5 mg/mL (infus) / 25 mg/mL (bolus)",
      "maxCentralConcentration": "25 mg/mL",
      "standardInfusionRate": "IV bolus lambat dalam minimal 15 detik atau infus dalam 10 - 30 menit",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "Enansiomer S-(+) aktif murni dari ketoprofen dengan onset analgesik pasca operasi sangat cepat.",
        "KONTRAINDIKASI pada ulkus peptikum aktif, gagal ginjal berat, perdarahan aktif, dan dehidrasi."
      ]
    },
    "blackBoxIncompatibilities": [
      "Dopamine, Promethazine, Pentazocine (presipitasi)."
    ]
  },
  {
    "id": "iv-pethidine",
    "name": "Pethidine Hydrochloride",
    "genericName": "Pethidine Hydrochloride Injeksi 50 mg/mL (100 mg/2 mL)",
    "brandNames": [
      "Pethidin Kimia Farma"
    ],
    "category": "Analgesik & Antiinflamasi",
    "phRange": "3.5 - 6.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9%, D5W, atau WFI",
      "volumeToReconstitute": "Encerkan 50 mg (1 mL) ke dalam 9 mL NS (Konsentrasi: 5 mg/mL) untuk injeksi IV perlahan",
      "resultantConcentration": "5 - 10 mg/mL",
      "instructions": "Wajib diencerkan sebelum injeksi IV dan disuntikkan sangat lambat minimal 3-5 menit."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": true,
      "wfi": true,
      "notes": "Kompatibel dengan NS, D5W, dan RL."
    },
    "stability": {
      "roomTemp25C": "24 Jam",
      "refrigerated2to8C": "48 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mg/mL",
      "maxCentralConcentration": "10 mg/mL",
      "standardInfusionRate": "Injeksi IV sangat lambat dalam 3 - 5 menit",
      "infusionRoute": "IV Bolus",
      "specialPrecautions": [
        "AKUMULASI NORPETHIDINE NEUROTOKSIK: Metabolit norpethidine memiliki waktu paruh panjang (15-30 jam) dan memicu eksitasi SSP, tremor, mioklonus, dan kejang grand mal. HINDARI PENGGUNAAN > 48 JAM atau pada gagal ginjal.",
        "ANTI-SHIVERING: Merupakan obat pilihan baku untuk mengatasi menggigil pasca-anestesi spinal (post-operative shivering) dosis 12.5 - 25 mg IV."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI MUTLAK bersama MAOI (krisis serotonin fatal & hiperpireksia).",
      "Thiopental, Furosemide, Heparin."
    ]
  },
  {
    "id": "iv-somatostatin",
    "name": "Somatostatin",
    "genericName": "Somatostatin Serbuk Liofilisasi 3 mg",
    "brandNames": [
      "Modustatin",
      "Somatostatin UCB"
    ],
    "category": "Gastrointestinal",
    "phRange": "4.5 - 7.0",
    "reconstitution": {
      "recommendedDiluent": "Normal Saline 0.9% pelarut pelengkap",
      "volumeToReconstitute": "Larutkan 3 mg dalam 1 mL pelarut, lalu encerkan ke dalam 500 mL NS atau D5W",
      "resultantConcentration": "6 mcg/mL",
      "instructions": "Bolus awal 250 mcg IV lambat dalam 3-5 menit, diikuti infus kontinu 250 mcg/jam (setara 3.5 mcg/kg/jam) selama 48 - 72 jam."
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": true,
      "notes": "Kompatibel dalam NS dan D5W."
    },
    "stability": {
      "roomTemp25C": "24 Jam (dalam kantong infus)",
      "refrigerated2to8C": "24 Jam",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "10 mcg/mL",
      "maxCentralConcentration": "20 mcg/mL",
      "standardInfusionRate": "Infus kontinu 250 mcg/jam tanpa terputus",
      "infusionRoute": "IV Bolus & Drip",
      "specialPrecautions": [
        "WAKTU PARUH SANGAT PENDEK (1-3 MENIT): Infus tidak boleh terputus atau terhambat; penggantian kantong infus harus dilakukan secara cepat untuk mencegah kekambuhan perdarahan.",
        "Menghambat sekresi asam lambung, pepsin, gastrin, dan enzim pankreas eksokrin (efektif untuk fistula pankreas)."
      ]
    },
    "blackBoxIncompatibilities": [
      "Larutan nutrisi parenteral asam amino murni."
    ]
  },
  {
    "id": "iv-albumin",
    "name": "Human Albumin 20% / 25%",
    "genericName": "Human Albumin Larutan Infus 20% (100 mL) / 25% (50 mL)",
    "brandNames": [
      "Flexbumin",
      "AlbuMAX",
      "Octalbin",
      "Plasbumin"
    ],
    "category": "Elektrolit & Koreksi",
    "phRange": "6.4 - 7.4",
    "reconstitution": {
      "recommendedDiluent": "Diberikan langsung (undiluted) atau diencerkan HANYA dalam Normal Saline 0.9% atau D5W (KONTRAINDIKASI MUTLAK WATER FOR INJECTION)",
      "volumeToReconstitute": "Botol infus 50 mL / 100 mL diberikan langsung dengan set infus khusus berventilasi",
      "resultantConcentration": "200 mg/mL (20%) / 250 mg/mL (25%)",
      "instructions": "KONTRAINDIKASI MUTLAK DILUTE DENGAN WATER FOR INJECTION (WFI): Mengencerkan albumin pekat dengan WFI menghasilkan larutan sangat hipotonik yang memicu HEMOLISIS INTRAVASKULAR MASIF dan GAGAL GINJAL AKUT FATAL!"
    },
    "diluents": {
      "ns": true,
      "d5w": true,
      "rl": false,
      "wfi": false,
      "notes": "Bila perlu diencerkan, HANYA gunakan NS 0.9% atau D5W. JANGAN PERNAH gunakan WFI!"
    },
    "stability": {
      "roomTemp25C": "4 Jam setelah botol ditusuk (harus segera dihabiskan)",
      "refrigerated2to8C": "JANGAN DIBEKUKAN (simpan pada suhu 2 - 25°C)",
      "lightProtectionRequired": false,
      "filterRequired": false
    },
    "administration": {
      "maxPeripheralConcentration": "200 - 250 mg/mL (undiluted)",
      "maxCentralConcentration": "200 - 250 mg/mL",
      "standardInfusionRate": "Kecepatan infus maksimal 1 - 2 mL/menit (20%); pada syok hipovolemik dapat dipercepat",
      "infusionRoute": "IV Drip / Infus Kontinu",
      "specialPrecautions": [
        "EASL / AASLD GUIDELINES PADA PARASENTESIS VOLUME BESAR (LVP): Pada sirosis dengan asites yang diaspirasi > 5 Liter, WAJIB diberikan albumin 8 gram per liter asites yang dikeluarkan untuk mencegah Post-Paracentesis Circulatory Dysfunction (PPCD) dan sindrom hepatorenal.",
        "Terapi baku kombinasi bersama Terlipressin pada Sindrom Hepatorenal-AKI (1 g/kg pada hari 1, diikuti 20-40 g/hari).",
        "OVERLOAD CAIRAN & EDEMA PARU: Menarik cairan intravaskular 4-5 kali volumenya dalam 15 menit; pantau CVP dan tanda gagal jantung kiri."
      ]
    },
    "blackBoxIncompatibilities": [
      "KONTRAINDIKASI MUTLAK Water for Injection (WFI) - HEMOLISIS FATAL.",
      "Inkompatibel dengan Vancomycin, Verapamil."
    ]
  }
];
