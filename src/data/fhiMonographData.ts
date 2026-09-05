// =====================================================================
// FARMAKOPE HERBAL INDONESIA (FHI) EDISI II & SUPLEMEN KEMENKES RI
// Standar Resmi Mutu, Senyawa Penanda (Marker), Posologi & Fitofarmaka
// ZERO DATA DUPLICATION CLINICAL LAYER
// Kepmenkes RI No. HK.01.07/MENKES/187/2017 & FOHAI Kemenkes RI
// =====================================================================

export interface FhiMarkerStandard {
  markerName: string;
  minimumContent: string;
  assayMethod: string;
  therapeuticRole: string;
}

export interface FhiPosology {
  simplisiaDailyDose: string;
  extractStandardDose: string;
  administrationInstructions: string;
}

export interface FhiQualityParameters {
  lossOnDrying?: string;
  totalAsh?: string;
  acidInsolubleAsh?: string;
  waterSolubleExtract?: string;
  ethanolSolubleExtract?: string;
}

export type FhiOrganSystemCategory =
  | 'Hepatoprotektor'
  | 'Imunomodulator'
  | 'Antidiabetes & Metabolik'
  | 'Kardiovaskular & Sirkulasi'
  | 'Nefroprotektor & Saluran Kemih'
  | 'Gastroprotektor'
  | 'Analgesik & Antiinflamasi'
  | 'Sistem Pernapasan'
  | 'Sistem Saraf & Sedatif'
  | 'Tonikum & Vitalitas';

export type FhiStandardizationCategory =
  | 'Fitofarmaka'
  | 'Obat Herbal Terstandar (OHT)'
  | 'Jamu Terstandar FHI';

export interface FhiMonographDetails {
  herbId: string;
  officialSimplisiaName: string;
  officialExtractName: string;
  botanicalFamily: string;
  plantPartUsed: string;
  organSystemCategory: FhiOrganSystemCategory;
  standardizationCategory: FhiStandardizationCategory;
  registeredCommercialProducts: string[];
  fhiMarkers: FhiMarkerStandard[];
  fhiPosology: FhiPosology;
  fhiQualityParameters: FhiQualityParameters;
  clinicalEvidenceLevel: string;
  contraindicationsFhi: string[];
  officialMonographSource: string;
}

export const FHI_MONOGRAPHS_DATABASE: Record<string, FhiMonographDetails> = {
  "herb-curcuma-longa": {
    "herbId": "herb-curcuma-longa",
    "officialSimplisiaName": "Curcumae Domesticae Rhizoma",
    "officialExtractName": "Curcumae Domesticae Rhizomatis Extractum Siccum",
    "botanicalFamily": "Zingiberaceae",
    "plantPartUsed": "Rhizoma (Rimpang dikeringkan)",
    "organSystemCategory": "Hepatoprotektor",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Curcuma FCT (Fitofarmaka)",
      "Heparmin (OHT)",
      "Curvit Sirup",
      "Kunyit Kapsul"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kurkuminoid Total dihitung sebagai Kurkumin",
        "minimumContent": "Tidak kurang dari 6,90% w/w",
        "assayMethod": "KCKT / HPLC fase balik detektor UV 425 nm atau Spektrofotometri",
        "therapeuticRole": "Inhibisi transkripsi faktor proinflamasi NF-kB, stimulasi sekresi asam empedu (koleretik), dan proteksi hepatosit dari nekrosis radikal bebas."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 9 gram rimpang kering direbus dalam 3 gelas air hingga tersisa 1 gelas, dibagi 2-3 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg (mengandung kurkuminoid setara 100 mg), diminum 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum 30 menit sebelum makan (untuk dispepsia) atau 1 jam sesudah makan. Beri jeda minimal 2 jam dari konsumsi obat sintetik."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,2%",
      "acidInsolubleAsh": "Tidak lebih dari 0,9%",
      "waterSolubleExtract": "Tidak kurang dari 11,5%",
      "ethanolSolubleExtract": "Tidak kurang dari 11,4%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis Acak Terkontrol / RCT pada Pasien Hepatitis & Dispepsia)",
    "contraindicationsFhi": [
      "Obstruksi saluran empedu total (Kolelitiasis obstruktif / Kolangitis akut)",
      "Ulkus lambung aktif fase perdarahan masif",
      "Pasien pra-operasi elektif (hentikan 14 hari sebelum operasi akibat potensi antiagregasi platelet)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 235-242 & FOHAI Kemenkes RI"
  },
  "herb-curcuma-xanthorrhiza": {
    "herbId": "herb-curcuma-xanthorrhiza",
    "officialSimplisiaName": "Curcumae Xanthorrhizae Rhizoma",
    "officialExtractName": "Curcumae Xanthorrhizae Rhizomatis Extractum Spissum",
    "botanicalFamily": "Zingiberaceae",
    "plantPartUsed": "Rhizoma (Rimpang dikeringkan)",
    "organSystemCategory": "Hepatoprotektor",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Curcuma Plus",
      "Curcuma Force",
      "Hepasil OHT",
      "Temulawak SOHO"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kurkuminoid Total dihitung sebagai Kurkumin",
        "minimumContent": "Tidak kurang dari 4,00% w/w",
        "assayMethod": "KCKT detektor UV 425 nm",
        "therapeuticRole": "Hepatoprotektor poten, stimulasi regenerasi sel parenkim hati, dan perbaikan metabolisme lipid hepar."
      },
      {
        "markerName": "Xantorizol (Xanthorrhizol)",
        "minimumContent": "Kadar terdeteksi spesifik (penanda pembeda dari Kunyit)",
        "assayMethod": "Kromatografi Gas - Spektrometri Massa (GC-MS)",
        "therapeuticRole": "Agen kolagogum kuat yang menstimulasi kontraksi kandung empedu serta aktivitas antibakteri spektrum luas."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 gram rimpang kering direbus dengan 3 gelas air hingga 1 gelas, diminum 2 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum setelah makan. Jeda 2 jam dari konsumsi obat medis."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 4,4%",
      "acidInsolubleAsh": "Tidak lebih dari 0,6%",
      "waterSolubleExtract": "Tidak kurang dari 10,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,5%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis pada Hepatitis Kronik & Dislipidemia)",
    "contraindicationsFhi": [
      "Batu empedu (Kolelitiasis) - risiko presipitasi kolik bilier akut akibat kontraksi vesika fellea",
      "Obstruksi duktus biliaris total",
      "Kehamilan trimester pertama dosis ekstrak tinggi"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 243-250 & FOHAI Kemenkes RI"
  },
  "herb-sambiloto": {
    "herbId": "herb-sambiloto",
    "officialSimplisiaName": "Andrographidis Paniculatae Herba",
    "officialExtractName": "Andrographidis Paniculatae Herbae Extractum Siccum",
    "botanicalFamily": "Acanthaceae",
    "plantPartUsed": "Herba (Seluruh bagian tanaman di atas tanah saat berbunga)",
    "organSystemCategory": "Imunomodulator",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Stimuno Forte (Fitofarmaka)",
      "Andro Kapsul OHT",
      "Sambiloto Borobudur",
      "Inlacin OHT"
    ],
    "fhiMarkers": [
      {
        "markerName": "Andrografolid (Andrographolide)",
        "minimumContent": "Tidak kurang dari 1,50% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 223 nm",
        "therapeuticRole": "Menstimulasi proliferasi sel limfosit T helper, meningkatkan fagositosis makrofag, inhibisi enzim alfa-glukosidase usus, dan supresi replikasi virus RNA."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 6 gram herba kering direbus dengan 2 gelas air hingga 1 gelas, dibagi 2-3 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 100 - 300 mg (setara andrografolid 30-50 mg), 3 kali sehari.",
      "administrationInstructions": "Diminum 30 menit sesudah makan. Jangan diminum bersamaan dengan obat resep dalam waktu yang sama."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 12,0%",
      "acidInsolubleAsh": "Tidak lebih dari 2,2%",
      "waterSolubleExtract": "Tidak kurang dari 18,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,2%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis Terkontrol pada Pasien ISPA, Influenza & Terapi Diabetes)",
    "contraindicationsFhi": [
      "Wanita hamil (efek abortifasien & pemicu kontraksi uterus kuat)",
      "Ibu menyusui",
      "Pasien pasca-transplantasi organ yang bergantung pada obat imunosupresif (Tacrolimus/Cyclosporine)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 22-29 & Formularium Obat Herbal Asli Indonesia (FOHAI)"
  },
  "herb-jahe": {
    "herbId": "herb-jahe",
    "officialSimplisiaName": "Zingiberis Officinalis Rhizoma",
    "officialExtractName": "Zingiberis Officinalis Rhizomatis Extractum Siccum",
    "botanicalFamily": "Zingiberaceae",
    "plantPartUsed": "Rhizoma (Rimpang segar / dikeringkan)",
    "organSystemCategory": "Gastroprotektor",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Tolak Angin OHT",
      "Antangin JRG OHT",
      "HerbaKOF OHT",
      "Jahe Merah Habbatussauda"
    ],
    "fhiMarkers": [
      {
        "markerName": "6-Gingerol & 6-Shogaol",
        "minimumContent": "Kadar 6-Gingerol tidak kurang dari 0,40% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 282 nm",
        "therapeuticRole": "Antagonis reseptor serotonin 5-HT3 perifer (antiemetik poten), supresi sintesis prostaglandin melalui inhibisi COX-2, dan vasodilatasi perifer."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "2 - 4 gram rimpang kering diseduh air panas, 2 - 3 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg, 2 kali sehari sesudah makan.",
      "administrationInstructions": "Diminum hangat sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 5,6%",
      "acidInsolubleAsh": "Tidak lebih dari 1,5%",
      "waterSolubleExtract": "Tidak kurang dari 15,6%",
      "ethanolSolubleExtract": "Tidak kurang dari 4,3%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Nausea/Mual Pasca Bedah & Morning Sickness)",
    "contraindicationsFhi": [
      "Kolelitiasis (batu empedu simptomatik)",
      "Pasien dalam terapi antikoagulan dosis tinggi"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 132-139"
  },
  "herb-meniran": {
    "herbId": "herb-meniran",
    "officialSimplisiaName": "Phyllanthi Niruri Herba",
    "officialExtractName": "Phyllanthi Niruri Herbae Extractum Siccum",
    "botanicalFamily": "Phyllanthaceae (Euphorbiaceae)",
    "plantPartUsed": "Herba (Seluruh tanaman di atas akar)",
    "organSystemCategory": "Imunomodulator",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Stimuno Kapsul / Sirup (Fitofarmaka)",
      "Niruri Ekstrak OHT"
    ],
    "fhiMarkers": [
      {
        "markerName": "Filantin (Phyllanthin) & Hipofilantin",
        "minimumContent": "Kadar Filantin tidak kurang dari 0,10% w/w",
        "assayMethod": "KCKT detektor UV 230 nm",
        "therapeuticRole": "Modulasi jalur imun spesifik dan non-spesifik, stimulasi sel NK (Natural Killer), peningkatan titer antibodi IgM/IgG, dan inhibisi kristalisasi kalsium oksalat urin."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 6 gram herba kering direbus dalam 3 gelas air hingga 1 gelas, diminum 2 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 50 mg (setara ekstrak kering Stimuno), 3 kali sehari untuk dewasa.",
      "administrationInstructions": "Diminum sesudah makan. Pemakaian tidak dianjurkan melebihi 8 minggu berturut-turut tanpa jeda."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 7,2%",
      "acidInsolubleAsh": "Tidak lebih dari 1,1%",
      "waterSolubleExtract": "Tidak kurang dari 12,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,0%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis RCT pada Pasien Tuberkulosis, Hepatitis B, & ISPA)",
    "contraindicationsFhi": [
      "Penyakit autoimun aktif (Lupus Eritematosus Sistemik, Multiple Sclerosis, Rheumatoid Arthritis berat)",
      "Penerima allograft transplantasi ginjal / hati",
      "Kehamilan"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 297-304 & FOHAI Kemenkes RI"
  },
  "herb-garlic": {
    "herbId": "herb-garlic",
    "officialSimplisiaName": "Alii Sativi Bulbus",
    "officialExtractName": "Alii Sativi Bulbi Extractum Oleosum / Siccum",
    "botanicalFamily": "Amaryllidaceae (Alliaceae)",
    "plantPartUsed": "Bulbus (Umbi lapis)",
    "organSystemCategory": "Kardiovaskular & Sirkulasi",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Kyolic Garlic",
      "Black Garlic OHT",
      "Garlic Oil Kapsul",
      "Tensigard OHT Komposisi"
    ],
    "fhiMarkers": [
      {
        "markerName": "Alisin (Allicin) / S-Alil-L-Sistein (SAC)",
        "minimumContent": "Potensi Alisin tidak kurang dari 0,45% w/w atau SAC min 0,10%",
        "assayMethod": "KCKT fase balik C18 atau Spektrofotometri",
        "therapeuticRole": "Penghambatan enzim HMG-CoA reduktase hati, stimulasi produksi Nitric Oxide (NO) endotel, dan penghambatan ireversibel agregasi platelet."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "2 - 4 gram umbi segar dikunyah/dihaluskan, atau 1-2 siung per hari.",
      "extractStandardDose": "Ekstrak terstandar 300 - 600 mg (mengandung alisin 4-8 mg), diminum 2 kali sehari.",
      "administrationInstructions": "Diminum bersama atau sesudah makan untuk meminimalkan iritasi pirosis lambung."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 8,0%",
      "totalAsh": "Tidak lebih dari 5,0%",
      "acidInsolubleAsh": "Tidak lebih dari 0,5%",
      "waterSolubleExtract": "Tidak kurang dari 5,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 4,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Hipertensi Ringan & Hiperkolesterolemia)",
    "contraindicationsFhi": [
      "Periode perioperatif: Wajib stop 7-10 hari sebelum prosedur bedah atau pencabutan gigi",
      "Pasien pengguna Protease Inhibitor ARV (Saquinavir/Darunavir) - level plasma ARV turun >50%",
      "Ulkus peptikum aktif fase pendarahan"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 52-59 & WHO Monographs Vol 1"
  },
  "herb-ginkgo": {
    "herbId": "herb-ginkgo",
    "officialSimplisiaName": "Ginkgo Bilobae Folium",
    "officialExtractName": "Ginkgo Bilobae Folii Extractum Siccum Terstandar (EGb 761)",
    "botanicalFamily": "Ginkgoaceae",
    "plantPartUsed": "Folium (Daun kering)",
    "organSystemCategory": "Kardiovaskular & Sirkulasi",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Tebokan Spesial Fitofarmaka",
      "Tanakan Fitofarmaka",
      "Ginkgo Biloba OHT"
    ],
    "fhiMarkers": [
      {
        "markerName": "Ginkgo Flavonoid Glikosida & Terpenoid Lakton",
        "minimumContent": "Flavonoid Glikosida 22,0% - 27,0% dan Terpenoid Lakton (Ginkgolid, Bilobalid) 5,0% - 7,0%",
        "assayMethod": "KCKT detektor UV 360 nm & Refractive Index (RI)",
        "therapeuticRole": "Antagonis Platelet-Activating Factor (PAF) poten, vasodilator mikrosirkulasi serebral, dan proteksi neuron dari iskemia."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "Ekstrak terstandar (EGb 761) 120 - 240 mg per hari terbagi dalam 2 - 3 dosis.",
      "extractStandardDose": "Tablet 40 mg atau 80 mg terstandar, 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan secara rutin minimal 4-8 minggu untuk evaluasi efikasi mikrosirkulasi."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 5,0%",
      "totalAsh": "Tidak lebih dari 1,2%",
      "acidInsolubleAsh": "Tidak lebih dari 0,2%",
      "waterSolubleExtract": "Tidak kurang dari 20,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 25,0%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis Fase III pada Demensia Ringan-Sedang, Tinnitus, & Insufisiensi Serebrovaskular)",
    "contraindicationsFhi": [
      "Riwayat epilepsi atau gangguan kejang (kandungan ginkgotoksin)",
      "Pasien pra-bedah elektif (wajib dihentikan minimal 14 hari sebelum operasi)",
      "Pasien pengguna antikoagulan oral / antiplatelet ganda"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 101-108 & European Pharmacopoeia 10.0"
  },
  "herb-ginseng": {
    "herbId": "herb-ginseng",
    "officialSimplisiaName": "Panacis Ginseng Radix",
    "officialExtractName": "Panacis Ginseng Radicis Extractum Siccum",
    "botanicalFamily": "Araliaceae",
    "plantPartUsed": "Radix (Akar yang telah berumur minimal 4-6 tahun)",
    "organSystemCategory": "Tonikum & Vitalitas",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Ginseng Kapsul",
      "Kuku Bima Ginseng",
      "Ginsana OHT",
      "Pharmaton Ginseng G115"
    ],
    "fhiMarkers": [
      {
        "markerName": "Ginsenosida Total dihitung sebagai Ginsenoside Rb1 dan Rg1",
        "minimumContent": "Tidak kurang dari 1,50% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 203 nm",
        "therapeuticRole": "Modulasi aksis Hipotalamus-Hipofisis-Adrenal (HPA), meningkatkan sintesis NO endotel, meningkatkan ambilan glukosa seluler, dan stimulasi imunitas adaptif."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "1 - 2 gram serbuk akar kering, diseduh air mendidih.",
      "extractStandardDose": "Ekstrak terstandar 100 - 200 mg (G115 setara ginsenosida 4%), 1 - 2 kali sehari pagi hari.",
      "administrationInstructions": "Diminum pagi hari sesudah sarapan. Hindari minum malam hari karena dapat memicu insomnia."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 5,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,0%",
      "waterSolubleExtract": "Tidak kurang dari 14,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 12,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis Adaptogen Kelelahan Kronis & Performa Kognitif)",
    "contraindicationsFhi": [
      "Hipertensi tidak terkontrol (stadium 2-3)",
      "Pasien gangguan bipolar / mania akut",
      "Pasien pra-bedah (hentikan 7 hari sebelum operasi)",
      "Kombinasi dengan obat MAOI (risiko krisis hipertensi)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II & WHO Monographs on Selected Medicinal Plants Vol 1"
  },
  "herb-kumis-kucing": {
    "herbId": "herb-kumis-kucing",
    "officialSimplisiaName": "Orthosiphonis Staminei Folium",
    "officialExtractName": "Orthosiphonis Staminei Folii Extractum Siccum",
    "botanicalFamily": "Lamiaceae",
    "plantPartUsed": "Folium (Daun kering)",
    "organSystemCategory": "Nefroprotektor & Saluran Kemih",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Batugin Elixir OHT",
      "Kumis Kucing Kapsul",
      "Nephrolit OHT",
      "Enatin Kapsul"
    ],
    "fhiMarkers": [
      {
        "markerName": "Sinensetin (Sinensetin) & Asam Rosmarinat",
        "minimumContent": "Kadar Sinensetin tidak kurang dari 0,10% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 344 nm",
        "therapeuticRole": "Saluresis diuretik selektif (ekskresi natrium dan air tanpa kehilangan kalium berlebihan), inhibisi pembentukan kristal kalsium oksalat, dan antibakteri saluran kemih."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "6 - 12 gram daun kering direbus dengan 3 gelas air hingga tersisa 1,5 gelas, dibagi 3 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan dengan banyak minum air putih (minimal 2 liter/hari) untuk memperlancar diuresis bilas saluran kemih."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 10,2%",
      "acidInsolubleAsh": "Tidak lebih dari 2,4%",
      "waterSolubleExtract": "Tidak kurang dari 10,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 5,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Nefrolitiasis / Batu Ginjal & Infeksi Saluran Kemih)",
    "contraindicationsFhi": [
      "Edema akibat gagal jantung kongestif berat (CHF NYHA III-IV) atau gagal ginjal anuria",
      "Obstruksi total saluran kemih oleh kalkulus berukuran besar (>10 mm)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 251-258 & FOHAI Kemenkes RI"
  },
  "herb-daun-sirsak": {
    "herbId": "herb-daun-sirsak",
    "officialSimplisiaName": "Annonae Muricatae Folium",
    "officialExtractName": "Annonae Muricatae Folii Extractum Siccum",
    "botanicalFamily": "Annonaceae",
    "plantPartUsed": "Folium (Daun kering tua)",
    "organSystemCategory": "Analgesik & Antiinflamasi",
    "standardizationCategory": "Jamu Terstandar FHI",
    "registeredCommercialProducts": [
      "Sirsak Kapsul OHT",
      "Graviola Kapsul",
      "Bio Sirsak Herbal"
    ],
    "fhiMarkers": [
      {
        "markerName": "Anonain (Annonacin) & Asetogenin Total",
        "minimumContent": "Asetogenin terdeteksi khas (penanda kemurnian Annonaceae)",
        "assayMethod": "KLT-Densitometri dan KCKT",
        "therapeuticRole": "Inhibitor kompleks mitokondria I (NADH:ubiquinone oxidoreductase), modulasi respons inflamasi, dan efek hipotensif vasodilatasi perifer."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 lembar daun tua direbus dalam 3 gelas air hingga 1 gelas, diminum 1 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg per hari.",
      "administrationInstructions": "Diminum sesudah makan malam. Tidak dianjurkan pemakaian kontinyu lebih dari 30 hari tanpa masa istirahat (washout period)."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,2%",
      "waterSolubleExtract": "Tidak kurang dari 10,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 7,0%"
    },
    "clinicalEvidenceLevel": "Jamu Terstandar FHI (Uji Praklinis In Vivo Toksisitas & Aktivitas Antiproliferatif)",
    "contraindicationsFhi": [
      "Penyakit Parkinson atau gangguan ekstrapiramidal (Anonain bersifat neurotoksik pada ganglia basalis)",
      "Hipotensi ortostatik simtomatik",
      "Kehamilan dan menyusui"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 367-372"
  },
  "herb-kayu-manis": {
    "herbId": "herb-kayu-manis",
    "officialSimplisiaName": "Cinnamomi Burmannii Cortex",
    "officialExtractName": "Cinnamomi Burmannii Corticis Extractum Siccum",
    "botanicalFamily": "Lauraceae",
    "plantPartUsed": "Cortex (Kulit batang dikeringkan)",
    "organSystemCategory": "Antidiabetes & Metabolik",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Inlacin (Kombinasi OHT)",
      "Cinnamon Kapsul",
      "Diabemix Herbal"
    ],
    "fhiMarkers": [
      {
        "markerName": "Sinamaldehid (Cinnamaldehyde) & Kumarin",
        "minimumContent": "Kadar Sinamaldehid tidak kurang dari 1,50% v/b; Kadar Kumarin tidak lebih dari 0,20% w/w",
        "assayMethod": "Kromatografi Gas (GC-FID) / KCKT",
        "therapeuticRole": "Aktivasi reseptor tirosin kinase insulin, translokasi transporter glukosa GLUT-4, dan penurunan resistensi insulin perifer."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "1 - 3 gram serbuk kulit batang direbus atau dicampur air hangat per hari.",
      "extractStandardDose": "Ekstrak fraksi air terstandar 100 - 250 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum sesaat sebelum atau bersamaan makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 4,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,0%",
      "waterSolubleExtract": "Tidak kurang dari 4,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 8,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Pasien Diabetes Tipe 2 & Sindrom Metabolik)",
    "contraindicationsFhi": [
      "Penyakit hati aktif / sirosis (risiko toksisitas kumulatif kumarin)",
      "Kehamilan trimester awal dosis pekat"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 156-163"
  },
  "herb-pegagan": {
    "herbId": "herb-pegagan",
    "officialSimplisiaName": "Centellae Asiaticae Herba",
    "officialExtractName": "Centellae Asiaticae Herbae Extractum Siccum",
    "botanicalFamily": "Apiaceae (Umbelliferae)",
    "plantPartUsed": "Herba (Seluruh bagian tanaman di atas tanah)",
    "organSystemCategory": "Kardiovaskular & Sirkulasi",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Madecassol (Fitofarmaka)",
      "Centella Kapsul OHT",
      "Tebokan Komposisi",
      "Antanan Herbal"
    ],
    "fhiMarkers": [
      {
        "markerName": "Asiatikosida (Asiaticoside) & Madekasosida",
        "minimumContent": "Kadar Asiatikosida tidak kurang dari 0,90% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 214 nm",
        "therapeuticRole": "Stimulasi sintesis kolagen tipe I dan fibronektin, perbaikan mikrosirkulasi venosa, antioksidan saraf serebral, dan penurunan kecemasan."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "2 - 4 gram herba kering direbus dalam 2 gelas air hingga 1 gelas, diminum 2 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 30 - 60 mg (mengandung total triterpen 40-70%), 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum setelah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 16,6%",
      "acidInsolubleAsh": "Tidak lebih dari 4,0%",
      "waterSolubleExtract": "Tidak kurang dari 14,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,5%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis pada Insufisiensi Vena Kronik, Ulkus Diabetikum, & Penyembuhan Luka)",
    "contraindicationsFhi": [
      "Gagal hati berat (penggunaan dosis tinggi jangka panjang)",
      "Kehamilan (efek emenagog)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 288-296 & WHO Monographs Vol 1"
  },
  "herb-mahkota-dewa": {
    "herbId": "herb-mahkota-dewa",
    "officialSimplisiaName": "Phaleriae Macrocarpae Fructus",
    "officialExtractName": "Phaleriae Macrocarpae Fructus Extractum Siccum",
    "botanicalFamily": "Thymelaeaceae",
    "plantPartUsed": "Fructus (Daging buah tanpa biji)",
    "organSystemCategory": "Analgesik & Antiinflamasi",
    "standardizationCategory": "Jamu Terstandar FHI",
    "registeredCommercialProducts": [
      "Mahkota Dewa Kapsul OHT",
      "Phaleria Herbal",
      "Salep Mahkota Dewa"
    ],
    "fhiMarkers": [
      {
        "markerName": "Mahkosida A (Mahcoside A) & Falerin",
        "minimumContent": "Kadar Mahkosida A terdeteksi khas",
        "assayMethod": "KCKT detektor UV 280 nm",
        "therapeuticRole": "Inhibisi sintesis mediator prostaglandin, regulasi tekanan darah, dan penangkal radikal bebas."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 5 gram irisan daging buah kering (tanpa biji) direbus dalam 3 gelas air hingga 1 gelas.",
      "extractStandardDose": "Ekstrak terstandar 100 - 200 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan. PENTING: Biji wajib dibuang karena mengandung toksin alkaloid phalerin mematikan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 6,5%",
      "acidInsolubleAsh": "Tidak lebih dari 0,8%",
      "waterSolubleExtract": "Tidak kurang dari 11,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 8,0%"
    },
    "clinicalEvidenceLevel": "Jamu Terstandar FHI (Uji Praklinis Toksisitas Akut & Subkronis Toksisitas Biji vs Daging Buah)",
    "contraindicationsFhi": [
      "Wanita hamil dan menyusui (kontraindikasi mutlak)",
      "Biji mahkota dewa dilarang keras dikonsumsi (toksisitas jantung dan muntah darah)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 182-188 & BPOM RI"
  },
  "herb-daun-kelor": {
    "herbId": "herb-daun-kelor",
    "officialSimplisiaName": "Moringae Oleiferae Folium",
    "officialExtractName": "Moringae Oleiferae Folii Extractum Siccum",
    "botanicalFamily": "Moringaceae",
    "plantPartUsed": "Folium (Daun hijau muda-sedang dikeringkan)",
    "organSystemCategory": "Antidiabetes & Metabolik",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Moringa Kapsul OHT",
      "Kelorina OHT",
      "Herba Moringa"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kuersetin (Quercetin) & Asam Klorogenat",
        "minimumContent": "Kadar Kuersetin tidak kurang dari 0,15% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 370 nm",
        "therapeuticRole": "Antioksidan nutrisional tinggi, peningkatan sensitivitas insulin perifer, dan supresi enzim alfa-glukosidase usus."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 gram serbuk daun kering diseduh air hangat atau dikonsumsi sebagai teh.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum bersamaan atau sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 11,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,5%",
      "waterSolubleExtract": "Tidak kurang dari 16,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 8,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Malnutrisi, Dislipidemia, & Hiperglikemia)",
    "contraindicationsFhi": [
      "Pasien hipotiroidisme dalam terapi Levotiroksin (kelor menghambat konversi hormon T4 ke T3)",
      "Kehamilan (ekstrak akar/kulit batang kelor bersifat abortifasien; daun aman dalam batas diet kuliner)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 195-202 & FOHAI Kemenkes RI"
  },
  "herb-daun-salam": {
    "herbId": "herb-daun-salam",
    "officialSimplisiaName": "Syzygii Polyanthi Folium",
    "officialExtractName": "Syzygii Polyanthi Folii Extractum Siccum",
    "botanicalFamily": "Myrtaceae",
    "plantPartUsed": "Folium (Daun tua)",
    "organSystemCategory": "Antidiabetes & Metabolik",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Daun Salam Kapsul OHT",
      "Diabetasol Jamu Salam",
      "Fitodiabet Salam"
    ],
    "fhiMarkers": [
      {
        "markerName": "Flavonoid Total dihitung sebagai Kuersetin & Eugenol",
        "minimumContent": "Kadar Flavonoid Total tidak kurang dari 0,60% w/w",
        "assayMethod": "Spektrofotometri UV-Vis 425 nm",
        "therapeuticRole": "Penghambatan enzim alfa-glukosidase usus halus, menurunkan absorpsi glukosa postprandial, dan antihiperurisemia."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "10 - 15 lembar daun segar/kering direbus dalam 3 gelas air hingga 1 gelas, diminum 2 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum 15-30 menit sebelum makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 5,0%",
      "acidInsolubleAsh": "Tidak lebih dari 0,7%",
      "waterSolubleExtract": "Tidak kurang dari 12,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis Terkontrol pada Pasien Diabetes Melitus Tipe 2)",
    "contraindicationsFhi": [
      "Hipotensi berat",
      "Pasien pra-operasi (hentikan 7 hari sebelum bedah)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 312-319 & FOHAI Kemenkes RI"
  },
  "herb-aloe-vera": {
    "herbId": "herb-aloe-vera",
    "officialSimplisiaName": "Aloe Barbadensis Folium / Aloe Vera Gel",
    "officialExtractName": "Aloes Extractum Spissum / Gel Siccum",
    "botanicalFamily": "Asphodelaceae (Liliaceae)",
    "plantPartUsed": "Gel lendir daun bagian dalam (parenkim)",
    "organSystemCategory": "Gastroprotektor",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Lidah Buaya Kapsul OHT",
      "Aloevera Drink",
      "Gel Aloe Farmasi"
    ],
    "fhiMarkers": [
      {
        "markerName": "Aloin (Barbaloin) & Polimanosa (Acemannan)",
        "minimumContent": "Kadar Barbaloin diatur ketat: < 10 ppm pada gel pangan/obat oral; Acemannan min. 5,0%",
        "assayMethod": "KCKT detektor UV 354 nm",
        "therapeuticRole": "Pelindung mukosa lambung (sitoprotektif), stimulasi sekresi musin gaster, dan antiinflamasi saluran cerna."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "30 - 60 ml gel lidah buaya murni tanpa getah kuning (aloin) per hari.",
      "extractStandardDose": "Ekstrak gel terstandar 100 - 200 mg, 2 kali sehari sebelum makan.",
      "administrationInstructions": "PENTING: Hanya gunakan gel transparan dalam. Getah kuning pahit (lateks aloin) wajib dibuang untuk menghindari diare berdarah."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 3,0%",
      "acidInsolubleAsh": "Tidak lebih dari 0,4%",
      "waterSolubleExtract": "Tidak kurang dari 20,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 15,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Dispepsia Fungsional & Erosi Mukosa Lambung)",
    "contraindicationsFhi": [
      "Lateks aloin getah kuning: KONTRAINDIKASI KERAS bersama Digoxin (risiko hipokalemia fatal)",
      "Kehamilan (efek kontraksi uterus oleh getah aloin)",
      "Gagal ginjal dengan deplesi elektrolit kalium"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 211-218 & WHO Monographs Vol 1"
  },
  "herb-kulit-manggis": {
    "herbId": "herb-kulit-manggis",
    "officialSimplisiaName": "Garciniae Mangostanae Pericarpium",
    "officialExtractName": "Garciniae Mangostanae Pericarpii Extractum Siccum",
    "botanicalFamily": "Clusiaceae (Guttiferae)",
    "plantPartUsed": "Pericarpium (Kulit buah matang dikeringkan)",
    "organSystemCategory": "Analgesik & Antiinflamasi",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Mastin Kapsul OHT",
      "Garcia Kulit Manggis",
      "Xamthone Plus OHT"
    ],
    "fhiMarkers": [
      {
        "markerName": "Alfa-Mangostin (Alpha-Mangostin) & Santon Total",
        "minimumContent": "Kadar Alfa-Mangostin tidak kurang dari 1,20% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 317 nm",
        "therapeuticRole": "Penangkap radikal bebas kuat (ORAC tinggi), inhibisi enzim siklooksigenase (COX-1/COX-2), supresi jalur transduksi sinyal inflamasi NF-kB, dan apoptosis sel abnormal."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 6 gram kulit buah kering direbus dengan 3 gelas air hingga 1,5 gelas, dibagi 2 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 400 - 600 mg (setara 50-100 mg alfa-mangostin), 2 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 5,0%",
      "acidInsolubleAsh": "Tidak lebih dari 0,8%",
      "waterSolubleExtract": "Tidak kurang dari 10,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 15,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Praklinis Toksisitas Subkronis & Uji Klinis Antioksidan / Inflamasi)",
    "contraindicationsFhi": [
      "Pasien pra-operasi: Wajib dihentikan 14 hari sebelum pembedahan elektif (alfa-mangostin menginhibisi agregasi platelet)",
      "Pasien pengguna antikoagulan/antiplatelet tanpa konsultasi dokter spesialis"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 267-274 & FOHAI Kemenkes RI"
  },
  "herb-mengkudu": {
    "herbId": "herb-mengkudu",
    "officialSimplisiaName": "Morindae Citrifoliae Fructus",
    "officialExtractName": "Morindae Citrifoliae Fructus Extractum Siccum",
    "botanicalFamily": "Rubiaceae",
    "plantPartUsed": "Fructus (Buah masak dikeringkan / jus murni)",
    "organSystemCategory": "Kardiovaskular & Sirkulasi",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Noni Juice Terstandar",
      "Mengkudu Kapsul OHT",
      "Morinda Citrifolia Kapsul"
    ],
    "fhiMarkers": [
      {
        "markerName": "Skopoletin (Scopoletin) & Kalium Alami",
        "minimumContent": "Kadar Skopoletin tidak kurang dari 0,05% w/w; Kadar Kalium tinggi (50-60 mEq/L)",
        "assayMethod": "KCKT fase balik C18 detektor fluorosens / UV 340 nm",
        "therapeuticRole": "Vasodilatasi pembuluh darah perifer melalui pelepasan NO, inhibisi reseptor serotonin, dan penurunan tekanan darah sistolik-diastolik."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "30 - 60 ml jus buah mengkudu murni per hari, atau 3-6 gram simplisia kering direbus.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum 30 menit sebelum makan pagi dan malam."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,2%",
      "waterSolubleExtract": "Tidak kurang dari 15,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 10,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Pasien Hipertensi Esensial Stadium 1)",
    "contraindicationsFhi": [
      "Gagal ginjal kronis (CKD Stadium 3-5) - risiko fatal hiperkalemia karena tingginya kalium alami",
      "Pasien yang mengonsumsi obat penahan kalium (ACEi, ARB, Spironolakton)",
      "Hepatopati berat (riwayat toksisitas hepar pada konsumsi jus mengkudu pekat non-terstandar)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 227-234 & FOHAI Kemenkes RI"
  },
  "herb-brotowali": {
    "herbId": "herb-brotowali",
    "officialSimplisiaName": "Tinosporae Crispae Caulis",
    "officialExtractName": "Tinosporae Crispae Caulis Extractum Siccum",
    "botanicalFamily": "Menispermaceae",
    "plantPartUsed": "Caulis (Batang tanaman dikeringkan)",
    "organSystemCategory": "Antidiabetes & Metabolik",
    "standardizationCategory": "Jamu Terstandar FHI",
    "registeredCommercialProducts": [
      "Brotowali Kapsul OHT",
      "Jamu Saintifik Brotowali",
      "Diabetin Brotowali"
    ],
    "fhiMarkers": [
      {
        "markerName": "Tinokrisposid (Tinocrisposide), Kolombin, & Pikroretin",
        "minimumContent": "Kadar Tinokrisposid terdeteksi spesifik",
        "assayMethod": "KLT-Densitometri dan KCKT",
        "therapeuticRole": "Stimulasi sekresi insulin dari sel beta pulau Langerhans melalui penutupan kanal K-ATP membran sel serta peningkatan utilisasi glukosa jaringan perifer."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 5 gram batang kering direbus dengan 3 gelas air hingga tersisa 1 gelas, dibagi 2 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 100 - 200 mg, 2 kali sehari sesudah makan.",
      "administrationInstructions": "Diminum sesudah makan untuk mengurangi rasa pahit tajam dan mencegah dispepsia."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 7,5%",
      "acidInsolubleAsh": "Tidak lebih dari 1,0%",
      "waterSolubleExtract": "Tidak kurang dari 11,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 7,0%"
    },
    "clinicalEvidenceLevel": "Jamu Terstandar FHI (Uji Klinis Jamu Saintifik Kemenkes RI pada Pasien Pradiabetes & DM Tipe 2)",
    "contraindicationsFhi": [
      "Pasien diabetes yang mengonsumsi sulfonilurea dosis penuh tanpa pemantauan (risiko hipoglikemia berat)",
      "Penyakit hati aktif / sirosis (senyawa furanoditerpenoid bersifat hepatotoksik pada dosis tinggi jangka panjang)",
      "Wanita hamil dan menyusui"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 331-338 & Monografi Jamu Saintifik Kemenkes RI"
  },
  "herb-jambu-biji": {
    "herbId": "herb-jambu-biji",
    "officialSimplisiaName": "Psidii Guajavae Folium",
    "officialExtractName": "Psidii Guajavae Folii Extractum Siccum",
    "botanicalFamily": "Myrtaceae",
    "plantPartUsed": "Folium (Daun muda dikeringkan)",
    "organSystemCategory": "Gastroprotektor",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Diapet Fitofarmaka",
      "Diapet NR",
      "Psidii Kapsul Fitofarmaka (DBD)",
      "Guava Leaf Kapsul"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kuersetin (Quercetin) & Tanin Kondensasi",
        "minimumContent": "Kadar Kuersetin tidak kurang dari 0,14% w/w dan Tanin Total tidak kurang dari 9,0%",
        "assayMethod": "KCKT fase balik C18 detektor UV 370 nm",
        "therapeuticRole": "Adstringen lumen usus (mempresipitasi protein enterosit untuk menurunkan peristaltik diare), antibakteri Escherichia coli, dan stimulasi trombopoietin sumsum tulang."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 gram daun kering direbus dalam 3 gelas air hingga 1 gelas, dibagi 2-3 kali minum saat diare akut.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg, 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum segera setelah buang air besar cair. Beri jeda minimal 2-3 jam dari obat medis apa pun karena kandungan tanin dapat mengikat dan mengendapkan obat dokter."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,5%",
      "acidInsolubleAsh": "Tidak lebih dari 1,2%",
      "waterSolubleExtract": "Tidak kurang dari 15,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 12,0%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis Terkontrol Multicenter pada Diare Akut Non-Spesifik & Trombositopenia DHF)",
    "contraindicationsFhi": [
      "Diare berdarah (Disentri amuba / basiler) atau demam tifoid tanpa terapi antibiotik kausatif",
      "Konstipasi kronik atau obstruksi mekanik usus (ileus obstruktif)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 125-131 & FOHAI Kemenkes RI"
  },
  "herb-kejibeling": {
    "herbId": "herb-kejibeling",
    "officialSimplisiaName": "Sericocalycis Crispi Folium (Strobilanthis Crispi Folium)",
    "officialExtractName": "Sericocalycis Crispi Folii Extractum Siccum",
    "botanicalFamily": "Acanthaceae",
    "plantPartUsed": "Folium (Daun kering)",
    "organSystemCategory": "Nefroprotektor & Saluran Kemih",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Keji Beling Kapsul OHT",
      "Batugin Elixir (Kombinasi OHT)",
      "Enatin",
      "Galanston Kapsul"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kalium Alami Tinggi, Asam Silikat, & Flavonoid",
        "minimumContent": "Kadar Kalium Larut Air tidak kurang dari 1,50% w/w",
        "assayMethod": "Spektrofotometri Serapan Atom (SSA / AAS)",
        "therapeuticRole": "Diuretik osmotik kuat, alkalinisasi urin (meningkatkan kelarutan asam urat dan kalsium), serta efek litotripik peluruh kalkulus ginjal."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 gram daun kering direbus dengan 3 gelas air hingga 1 gelas, dibagi 2 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 kali sehari sesudah makan.",
      "administrationInstructions": "Diminum sesudah makan dengan asupan air minimal 2,5 liter per hari untuk mencegah dehidrasi bilas batu."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 18,0% (tinggi karena kandungan silikat alami)",
      "acidInsolubleAsh": "Tidak lebih dari 5,0%",
      "waterSolubleExtract": "Tidak kurang dari 12,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 6,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Nefrolitiasis Kalsium Oksalat & Asam Urat)",
    "contraindicationsFhi": [
      "Batu ginjal berukuran lebih dari 10 mm (harus melalui tindakan ESWL / PNL / URS)",
      "Gagal ginjal kronik stadium terminal (GFR < 15 ml/mnt)",
      "Hiperkalemia aktif"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 140-147 & FOHAI Kemenkes RI"
  },
  "herb-tempuyung": {
    "herbId": "herb-tempuyung",
    "officialSimplisiaName": "Sonchi Arvensidis Folium",
    "officialExtractName": "Sonchi Arvensidis Folii Extractum Siccum",
    "botanicalFamily": "Asteraceae (Compositae)",
    "plantPartUsed": "Folium (Daun segar atau dikeringkan)",
    "organSystemCategory": "Nefroprotektor & Saluran Kemih",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Batugin Elixir OHT (Fitofarmaka/OHT)",
      "Tempuyung Kapsul OHT",
      "Kalkurenal Herbal"
    ],
    "fhiMarkers": [
      {
        "markerName": "Luteolin-7-O-glukosida, Apigenin, & Kalium Alami",
        "minimumContent": "Kadar Flavonoid Total dihitung sebagai Luteolin tidak kurang dari 0,25% w/w",
        "assayMethod": "KCKT detektor UV 350 nm",
        "therapeuticRole": "Menghancurkan ikatan kalsium oksalat kalkulus ginjal (senyawa kalium menukar kalsium membentuk kalium oksalat larut air) dan inhibisi enzim xantin oksidase."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "6 - 15 gram daun kering direbus dengan 3 gelas air hingga tersisa 1 gelas, dibagi 2-3 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg (atau 30 ml eliksir terstandar), 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan dengan banyak air putih."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 14,0%",
      "acidInsolubleAsh": "Tidak lebih dari 2,5%",
      "waterSolubleExtract": "Tidak kurang dari 18,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 8,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Pasien Batu Saluran Kemih Ringan-Sedang)",
    "contraindicationsFhi": [
      "Gagal ginjal anuria",
      "Obstruksi total ureter akut dengan hidronefrosis berat"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 320-327 & Formularium Obat Herbal Asli Indonesia"
  },
  "herb-sambung-nyawa": {
    "herbId": "herb-sambung-nyawa",
    "officialSimplisiaName": "Gynurae Procumbentis Folium",
    "officialExtractName": "Gynurae Procumbentis Folii Extractum Siccum",
    "botanicalFamily": "Asteraceae",
    "plantPartUsed": "Folium (Daun segar atau kering)",
    "organSystemCategory": "Kardiovaskular & Sirkulasi",
    "standardizationCategory": "Jamu Terstandar FHI",
    "registeredCommercialProducts": [
      "Sambung Nyawa Kapsul",
      "Gynura Kapsul OHT",
      "Daun Dewa Sambung Nyawa"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kuersetin-3-O-rutinosida (Rutin) & Asam Kafeat",
        "minimumContent": "Kadar Flavonoid Total tidak kurang dari 0,14% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 370 nm",
        "therapeuticRole": "Inhibisi enzim pengonversi angiotensin (ACE alami lemah), stimulasi produksi prostaglandin I2 pembuluh darah, dan regulasi glikemia postprandial."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 7 lembar daun segar dimakan lalap atau 5 gram kering direbus dengan 2 gelas air hingga 1 gelas.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 11,5%",
      "acidInsolubleAsh": "Tidak lebih dari 1,8%",
      "waterSolubleExtract": "Tidak kurang dari 14,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 7,5%"
    },
    "clinicalEvidenceLevel": "Jamu Terstandar FHI (Uji Praklinis Terkontrol Antihipertensi & Antihiperglikemik)",
    "contraindicationsFhi": [
      "Hipotensi ortostatik simtomatik",
      "Kehamilan"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 116-123 & FOHAI Kemenkes RI"
  },
  "herb-kencur": {
    "herbId": "herb-kencur",
    "officialSimplisiaName": "Kaempferiae Galangae Rhizoma",
    "officialExtractName": "Kaempferiae Galangae Rhizomatis Extractum Siccum",
    "botanicalFamily": "Zingiberaceae",
    "plantPartUsed": "Rhizoma (Rimpang dikeringkan)",
    "organSystemCategory": "Sistem Pernapasan",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Beras Kencur Sido Muncul",
      "HerbaKOF Komposisi OHT",
      "Kencur Kapsul",
      "Minyak Kencur"
    ],
    "fhiMarkers": [
      {
        "markerName": "Etil p-metoksisinamat (EPMS)",
        "minimumContent": "Tidak kurang dari 4,00% w/w",
        "assayMethod": "Kromatografi Gas (GC-MS) atau KCKT detektor UV 308 nm",
        "therapeuticRole": "Antitusif sentral, antiinflamasi non-narkotik (inhibisi enzim COX), analgesik perifer, dan efek sedatif ringan via reseptor GABA."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 6 gram rimpang diparut dan diperas, atau direbus dalam 1 gelas air.",
      "extractStandardDose": "Ekstrak terstandar 150 - 300 mg, 2 - 3 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan atau dicampur sedikit madu untuk batuk berdahak/radang tenggorokan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,0%",
      "acidInsolubleAsh": "Tidak lebih dari 2,0%",
      "waterSolubleExtract": "Tidak kurang dari 14,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 12,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis Ekspektoran & Antitusif pada Bronkitis Ringan)",
    "contraindicationsFhi": [
      "Pasien yang sedang mengemudi kendaraan berat bila dikombinasikan dengan obat sedatif (EPMS memperkuat sedasi GABA)",
      "Hipersensitivitas terhadap Zingiberaceae"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 148-155 & FOHAI Kemenkes RI"
  },
  "herb-sirih": {
    "herbId": "herb-sirih",
    "officialSimplisiaName": "Piperis Betle Folium / Piperis Crocati Folium",
    "officialExtractName": "Piperis Betle Folii Extractum Spissum",
    "botanicalFamily": "Piperaceae",
    "plantPartUsed": "Folium (Daun segar atau dikeringkan)",
    "organSystemCategory": "Antidiabetes & Metabolik",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Sirih Merah Kapsul OHT",
      "Resik V Khusus Sirih",
      "Herba Betle",
      "Diabetea Sirih"
    ],
    "fhiMarkers": [
      {
        "markerName": "Minyak Atsiri (Kavibetol, Eugenol) & Flavonoid",
        "minimumContent": "Kadar Minyak Atsiri tidak kurang dari 0,80% v/b; Flavonoid min 0,25%",
        "assayMethod": "Destilasi Stahl & KCKT detektor UV 280 nm",
        "therapeuticRole": "Antiseptik kuat merusak dinding sel bakteri dan jamur Candida albicans, penurun glukosa darah via hambatan glukoneogenesis hati, dan antioksidan."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 5 lembar daun direbus dalam 2 gelas air hingga 1 gelas untuk minum, atau 10 lembar untuk obat kumur/cebokan luar.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 kali sehari sesudah makan.",
      "administrationInstructions": "Diminum sesudah makan. Jangan menggunakan rebusan sirih pekat secara terus menerus untuk mukosa mata karena risiko erosi kornea."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 14,0%",
      "acidInsolubleAsh": "Tidak lebih dari 2,5%",
      "waterSolubleExtract": "Tidak kurang dari 12,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Kandidiasis Vulvovaginitis & Adjuvan Diabetes Melitus)",
    "contraindicationsFhi": [
      "Gagal ginjal terminal",
      "Pasien pengguna antikoagulan tanpa pengawasan (eugenol memperpanjang waktu perdarahan)"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 305-311 & FOHAI Kemenkes RI"
  },
  "herb-jati-belanda": {
    "herbId": "herb-jati-belanda",
    "officialSimplisiaName": "Guazumae Ulmifoliae Folium",
    "officialExtractName": "Guazumae Ulmifoliae Folii Extractum Siccum",
    "botanicalFamily": "Malvaceae (Sterculiaceae)",
    "plantPartUsed": "Folium (Daun kering)",
    "organSystemCategory": "Antidiabetes & Metabolik",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Jati Belanda Kapsul OHT",
      "Slimming Tea Mustika Ratu",
      "Jati Cina & Belanda Jamu",
      "Fitocare Slim"
    ],
    "fhiMarkers": [
      {
        "markerName": "Musilago, Tanin Katekat, & Triterpenoid",
        "minimumContent": "Kadar Tanin Total tidak kurang dari 11,0% w/w",
        "assayMethod": "Spektrofotometri UV-Vis Folin-Ciocalteu",
        "therapeuticRole": "Inhibisi enzim lipase pankreas di usus halus, menurunkan absorpsi lipid dan kolesterol lumen usus, serta efek adstringen mukosa lambung-usus."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 gram daun kering direbus dalam 3 gelas air hingga tersisa 1 gelas, diminum hangat.",
      "extractStandardDose": "Ekstrak terstandar 250 - 500 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum 30 menit sebelum makan siang dan malam. PENTING: Wajib jeda 2-3 jam dari obat dokter dan vitamin larut lemak."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,5%",
      "waterSolubleExtract": "Tidak kurang dari 16,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 10,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Obesitas & Profil Lipid Dislipidemia)",
    "contraindicationsFhi": [
      "Pasien dengan malnutrisi, kaheksia, atau berat badan kurang",
      "Gagal ginjal berat dan nefropati proteinik",
      "Kehamilan dan masa menyusui"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 109-115 & FOHAI Kemenkes RI"
  },
  "herb-seledri": {
    "herbId": "herb-seledri",
    "officialSimplisiaName": "Apii Graveolentis Herba / Semen",
    "officialExtractName": "Apii Graveolentis Herbae Extractum Siccum",
    "botanicalFamily": "Apiaceae (Umbelliferae)",
    "plantPartUsed": "Herba (Seluruh tanaman) dan Biji kering",
    "organSystemCategory": "Kardiovaskular & Sirkulasi",
    "standardizationCategory": "Fitofarmaka",
    "registeredCommercialProducts": [
      "Tensigard Fitofarmaka (Ekstrak Seledri + Kumis Kucing)",
      "Seledri Kapsul OHT",
      "Celery 3000"
    ],
    "fhiMarkers": [
      {
        "markerName": "Apigenin & 3-n-Butilftalid (3nB)",
        "minimumContent": "Kadar Apigenin tidak kurang dari 0,15% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 340 nm",
        "therapeuticRole": "Relaksasi otot polos vaskular via antagonisme kanal kalsium (Ca-antagonis alami), diuresis natriuretik, dan supresi vasokonstriksi simpatik."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "15 - 30 gram herba segar dijus atau 5-10 gram herba kering direbus.",
      "extractStandardDose": "Kapsul Tensigard (ekstrak herba seledri terstandar 100 mg), 3 kali 1 kapsul sehari untuk hipertensi ringan-sedang.",
      "administrationInstructions": "Diminum sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 18,0%",
      "acidInsolubleAsh": "Tidak lebih dari 2,5%",
      "waterSolubleExtract": "Tidak kurang dari 12,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,0%"
    },
    "clinicalEvidenceLevel": "Fitofarmaka (Uji Klinis Fase III Multicenter Terkontrol pada Pasien Hipertensi Esensial Derajat 1-2)",
    "contraindicationsFhi": [
      "Hipotensi ortostatik simtomatik",
      "Kehamilan (biji seledri dosis tinggi menstimulasi kontraksi uterus)",
      "Nefritis ginjal akut"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 30-37 & Formularium Fitofarmaka BPOM RI"
  },
  "herb-pala": {
    "herbId": "herb-pala",
    "officialSimplisiaName": "Myristicae Fragrantis Semen",
    "officialExtractName": "Myristicae Fragrantis Seminis Extractum Siccum",
    "botanicalFamily": "Myristicaceae",
    "plantPartUsed": "Semen (Biji kering tanpa arilus)",
    "organSystemCategory": "Sistem Saraf & Sedatif",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Pala Kapsul Sedatif",
      "Minyak Pala Farmasi",
      "Herba Tidur Pala"
    ],
    "fhiMarkers": [
      {
        "markerName": "Miristisin (Myristicin), Elemisin, & Safrol",
        "minimumContent": "Kadar Miristisin tidak kurang dari 1,00% w/w",
        "assayMethod": "Kromatografi Gas - FID / GC-MS",
        "therapeuticRole": "Inhibitor monoamine oxidase (MAO) lemah sentral, modulasi neurotransmisi serotonergik dan dopaminergik di hipotalamus, serta induksi tidur gelombang lambat."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "0,5 - 1 gram serbuk biji pala diseduh air hangat sebelum tidur malam.",
      "extractStandardDose": "Ekstrak terstandar 100 - 250 mg, 1 kali sehari pada malam hari.",
      "administrationInstructions": "Diminum 30-60 menit sebelum waktu tidur yang diinginkan. DILARANG mengonsumsi dosis berlebih (>5 gram) karena memicu sindrom toksisitas halusinogen antikolinergik."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 8,0%",
      "totalAsh": "Tidak lebih dari 3,5%",
      "acidInsolubleAsh": "Tidak lebih dari 0,5%",
      "waterSolubleExtract": "Tidak kurang dari 6,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 10,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis pada Insomnia Non-Organik & Gangguan Ansietas)",
    "contraindicationsFhi": [
      "Pasien pengguna antidepresan golongan MAOI (risiko fatal krisis hipertensi) atau SSRI (risiko sindrom serotonin)",
      "Kehamilan (efek emenagog dan stimulasi kontraksi uterus masif)",
      "Anak-anak di bawah 12 tahun"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 259-266 & British Herbal Pharmacopoeia"
  },
  "herb-temu-kunci": {
    "herbId": "herb-temu-kunci",
    "officialSimplisiaName": "Boesenbergiae Panduratae Rhizoma",
    "officialExtractName": "Boesenbergiae Panduratae Rhizomatis Extractum Siccum",
    "botanicalFamily": "Zingiberaceae",
    "plantPartUsed": "Rhizoma (Rimpang dikeringkan)",
    "organSystemCategory": "Gastroprotektor",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Temu Kunci Kapsul",
      "Herba Kunci OHT",
      "Kapsul Sehat Wanita"
    ],
    "fhiMarkers": [
      {
        "markerName": "Panduratin A & Pinostrobin",
        "minimumContent": "Kadar Panduratin A tidak kurang dari 0,50% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 290 nm",
        "therapeuticRole": "Penghambatan enzim protease virus Dengue & HIV, antibakteri Helicobacter pylori lambung, dan antiinflamasi anti-NF-kB."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 6 gram rimpang kering direbus dalam 2 gelas air hingga 1 gelas, dibagi 2 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 150 - 300 mg, 2 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 7,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,2%",
      "waterSolubleExtract": "Tidak kurang dari 11,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 8,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Praklinis & Klinis Pilot Anti-Helicobacter & Dispepsia)",
    "contraindicationsFhi": [
      "Kehamilan dan menyusui",
      "Obstruksi saluran empedu aktif"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 85-92 & FOHAI Kemenkes RI"
  },
  "herb-purwoceng": {
    "herbId": "herb-purwoceng",
    "officialSimplisiaName": "Pimpinellae Pruatjan Radix",
    "officialExtractName": "Pimpinellae Pruatjan Radicis Extractum Siccum",
    "botanicalFamily": "Apiaceae (Umbelliferae)",
    "plantPartUsed": "Radix (Akar tanaman pegunungan Dieng dikeringkan)",
    "organSystemCategory": "Tonikum & Vitalitas",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Purwoceng Kapsul OHT Dieng",
      "Purwoceng Kopi Herbal",
      "Neo Horovits Purwoceng"
    ],
    "fhiMarkers": [
      {
        "markerName": "Berapten (Bergapten) & Pimpinelin (Furanokumarin)",
        "minimumContent": "Kadar Bergapten tidak kurang dari 0,10% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 310 nm",
        "therapeuticRole": "Stimulasi sekresi luteinizing hormone (LH), peningkatan biosintesis testosteron endogen di sel Leydig testis, dan relaksasi korpus kavernosum penis."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "3 - 5 gram akar kering direbus dalam 2 gelas air hingga 1 gelas, diminum 1 kali sehari malam hari.",
      "extractStandardDose": "Ekstrak terstandar 100 - 250 mg, 1 kali sehari.",
      "administrationInstructions": "Diminum sesudah makan malam."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 8,5%",
      "acidInsolubleAsh": "Tidak lebih dari 1,5%",
      "waterSolubleExtract": "Tidak kurang dari 10,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 9,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis Adaptogen Androgenik pada Pria Andropause & Disfungsi Ereksi Ringan)",
    "contraindicationsFhi": [
      "Karsinoma prostat (kanker prostat sensitif androgen)",
      "Hipertensi maligna",
      "Wanita hamil dan anak-anak"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 164-171 & FOHAI Kemenkes RI"
  },
  "herb-pasak-bumi": {
    "herbId": "herb-pasak-bumi",
    "officialSimplisiaName": "Eurycomae Longifoliae Radix",
    "officialExtractName": "Eurycomae Longifoliae Radicis Extractum Siccum",
    "botanicalFamily": "Simaroubaceae",
    "plantPartUsed": "Radix (Akar pohon dikeringkan)",
    "organSystemCategory": "Tonikum & Vitalitas",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Tongkat Ali Kapsul OHT",
      "Pasak Bumi Kapsul",
      "Herba Perkasa Tongkat Ali"
    ],
    "fhiMarkers": [
      {
        "markerName": "Eurikomanon (Eurycomanone) & Kuasinoid Total",
        "minimumContent": "Kadar Eurikomanon tidak kurang dari 0,80% w/w",
        "assayMethod": "KCKT fase balik C18 detektor UV 254 nm",
        "therapeuticRole": "Inhibisi aromatase dan globulin pengikat hormon seks (SHBG) sehingga meningkatkan fraksi testosteron bebas aktif, peningkatan motilitas sperma, dan penurunan kortisol stres."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "2 - 5 gram serutan akar direbus dengan 2 gelas air hingga tersisa 1 gelas.",
      "extractStandardDose": "Ekstrak terstandar 100 - 200 mg (mengandung eurycomanone 1%), 1 - 2 kali sehari.",
      "administrationInstructions": "Diminum pagi dan sore sesudah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 5,0%",
      "acidInsolubleAsh": "Tidak lebih dari 0,8%",
      "waterSolubleExtract": "Tidak kurang dari 8,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 6,0%"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis Acak Terkontrol pada Defisiensi Androgen & Kualitas Sperma)",
    "contraindicationsFhi": [
      "Kanker prostat atau riwayat tumor sensitif hormon",
      "Penyakit kardiovaskular akut / infark miokard",
      "Pasien dalam terapi imunosupresi allograft"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 93-100 & WHO Monographs on Medicinal Plants"
  },
  "herb-lempuyang": {
    "herbId": "herb-lempuyang",
    "officialSimplisiaName": "Zingiberis Zerumbeti Rhizoma",
    "officialExtractName": "Zingiberis Zerumbeti Rhizomatis Extractum Siccum",
    "botanicalFamily": "Zingiberaceae",
    "plantPartUsed": "Rhizoma (Rimpang lempuyang wangi/gajah)",
    "organSystemCategory": "Analgesik & Antiinflamasi",
    "standardizationCategory": "Jamu Terstandar FHI",
    "registeredCommercialProducts": [
      "Lempuyang Wangi Kapsul",
      "Jamu Tradisi Lempuyang",
      "Herba Rematik Lempuyang"
    ],
    "fhiMarkers": [
      {
        "markerName": "Zerumbon (Zerumbone)",
        "minimumContent": "Kadar Zerumbon tidak kurang dari 0,50% w/w",
        "assayMethod": "KCKT detektor UV 250 nm atau Kromatografi Gas",
        "therapeuticRole": "Inhibisi spesifik enzim proinflamasi iNOS dan COX-2, supresi sitokin proinflamasi TNF-alfa dan IL-1beta, serta sitoprotektif hepatoseluler."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "5 - 10 gram rimpang kering direbus dalam 3 gelas air hingga 1 gelas, dibagi 2 kali minum.",
      "extractStandardDose": "Ekstrak terstandar 200 - 400 mg, 2 kali sehari sesudah makan.",
      "administrationInstructions": "Diminum hangat setelah makan."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 7,0%",
      "acidInsolubleAsh": "Tidak lebih dari 1,2%",
      "waterSolubleExtract": "Tidak kurang dari 11,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 8,0%"
    },
    "clinicalEvidenceLevel": "Jamu Terstandar FHI (Uji Praklinis & Uji Terkontrol Terbatas Osteoarthritis & Nyeri Sendi)",
    "contraindicationsFhi": [
      "Obstruksi saluran empedu aktif",
      "Ulkus lambung aktif fase perdarahan"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 172-181 & FOHAI Kemenkes RI"
  },
  "herb-kayu-putih": {
    "herbId": "herb-kayu-putih",
    "officialSimplisiaName": "Melaleucae Leucadendrae Aetheroleum (Minyak Kayu Putih)",
    "officialExtractName": "Melaleucae Leucadendrae Folii Aetheroleum Destillatum",
    "botanicalFamily": "Myrtaceae",
    "plantPartUsed": "Aetheroleum (Minyak atsiri hasil destilasi uap daun segar)",
    "organSystemCategory": "Sistem Pernapasan",
    "standardizationCategory": "Obat Herbal Terstandar (OHT)",
    "registeredCommercialProducts": [
      "Minyak Kayu Putih Cap Elang",
      "Minyak Kayu Putih Konicare",
      "Kayu Putih Aromaterapi Farmasi"
    ],
    "fhiMarkers": [
      {
        "markerName": "1,8-Sineol (Cineole / Eucalyptol)",
        "minimumContent": "Kadar 1,8-Sineol tidak kurang dari 50,0% - 65,0% v/v",
        "assayMethod": "Kromatografi Gas (GC-FID) sesuai SNI 06-3954-2006 & FHI",
        "therapeuticRole": "Ekspektoran mukolitik (mengencerkan lendir trakeobronkial), spasmolitik saluran napas, analgesik counter-irritant topikal, dan antiseptik inhalasi."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "Penggunaan luar: Oleskan secukupnya pada dada/punggung; Inhalasi uap: 2-3 tetes dalam air panas dihirup uapnya.",
      "extractStandardDose": "Kapsul oral terstandar (apabila diformulasikan khusus): 100 mg cineole, 2-3 kali sehari sesudah makan.",
      "administrationInstructions": "Utamakan penggunaan inhalasi dan topikal. Minyak murni TIDAK BOLEH ditelan langsung tanpa formulasi khusus karena toksisitas neurologis."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak berlaku (zat cair atsiri)",
      "totalAsh": "Bobot Jenis 20°C: 0,900 - 0,930; Indeks Bias 20°C: 1,460 - 1,472",
      "acidInsolubleAsh": "Kelarutan dalam etanol 80%: 1 volume larut dalam 1 volume etanol 80%",
      "waterSolubleExtract": "Tidak boleh ada minyak lemak asing",
      "ethanolSolubleExtract": "Rotasi optik: -4° sampai 0°"
    },
    "clinicalEvidenceLevel": "Obat Herbal Terstandar (Uji Klinis Inhalasi Terkontrol pada Rinosinusitis & Batuk Pilek Akut)",
    "contraindicationsFhi": [
      "Tertelan langsung minyak murni pada anak-anak (risiko depresi pernapasan & kejang)",
      "Olesan pada area wajah bayi di bawah 2 tahun",
      "Pasien asma bronkial berat yang sensitif uap atsiri"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 219-226 & FOHAI Kemenkes RI"
  },
  "herb-kemukus": {
    "herbId": "herb-kemukus",
    "officialSimplisiaName": "Piperis Cubebae Fructus",
    "officialExtractName": "Piperis Cubebae Fructus Extractum Siccum",
    "botanicalFamily": "Piperaceae",
    "plantPartUsed": "Fructus (Buah bertangkai dikeringkan)",
    "organSystemCategory": "Nefroprotektor & Saluran Kemih",
    "standardizationCategory": "Jamu Terstandar FHI",
    "registeredCommercialProducts": [
      "Kemukus Kapsul",
      "Jamu Saluran Kemih Kemukus",
      "Herba Urinaria"
    ],
    "fhiMarkers": [
      {
        "markerName": "Kubebin (Cubebin) & Minyak Atsiri",
        "minimumContent": "Kadar Kubebin tidak kurang dari 1,20% w/w; Minyak Atsiri min 10,0% v/b",
        "assayMethod": "KCKT fase balik C18 detektor UV 280 nm",
        "therapeuticRole": "Antiseptik saluran kemih, stimulasi epitel bronkus sebagai ekspektoran batuk, dan antiinflamasi saluran urogenital."
      }
    ],
    "fhiPosology": {
      "simplisiaDailyDose": "2 - 4 gram buah kering ditumbuk dan diseduh air panas, diminum 2 kali sehari.",
      "extractStandardDose": "Ekstrak terstandar 150 - 300 mg, 2 kali sehari sesudah makan.",
      "administrationInstructions": "Diminum sesudah makan dengan banyak air putih."
    },
    "fhiQualityParameters": {
      "lossOnDrying": "Tidak lebih dari 10,0%",
      "totalAsh": "Tidak lebih dari 6,5%",
      "acidInsolubleAsh": "Tidak lebih dari 1,0%",
      "waterSolubleExtract": "Tidak kurang dari 10,0%",
      "ethanolSolubleExtract": "Tidak kurang dari 12,0%"
    },
    "clinicalEvidenceLevel": "Jamu Terstandar FHI (Uji Praklinis Aktivitas Antibakteri Saluran Urogenital & Antiinflamasi)",
    "contraindicationsFhi": [
      "Penyakit inflamasi ginjal akut (Glomerulonefritis akut)",
      "Kehamilan"
    ],
    "officialMonographSource": "Farmakope Herbal Indonesia Edisi II (2017) Hal. 275-282"
  }
};

/**
 * Retrieves official Farmakope Herbal Indonesia (FHI) Monograph details for a given herbId
 */
export function getFhiMonograph(herbId: string): FhiMonographDetails | undefined {
  if (FHI_MONOGRAPHS_DATABASE[herbId]) {
    return FHI_MONOGRAPHS_DATABASE[herbId];
  }
  // Fallback aliases for seamless resolution
  const aliases: Record<string, string> = {
    'herb-bawang-putih': 'herb-garlic',
    'herb-kelor': 'herb-daun-kelor',
    'herb-salam': 'herb-daun-salam',
    'herb-sirsak': 'herb-daun-sirsak',
    'herb-manggis': 'herb-kulit-manggis'
  };
  const target = aliases[herbId];
  return target ? FHI_MONOGRAPHS_DATABASE[target] : undefined;
}
