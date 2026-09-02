// =====================================================================
// DATABASE PENYESUAIAN DOSIS GANGGUAN GINJAL & HEMODIALISIS (KDIGO / SANFORD)
// Terverifikasi Resmi: Formularium Nasional Kemenkes RI, PIONAS BPOM RI & FDA
// Total Obat Klinis: 63 Obat Esensial Rumah Sakit & Puskesmas
// =====================================================================

export interface RenalDrugRule {
  drugName: string;
  genericName: string;
  atcCode: string;
  normalDose: string;
  rules: {
    minCrCl: number;
    maxCrCl: number;
    recommendation: string;
    status: 'Normal' | 'Adjust' | 'Contraindicated';
  }[];
  clinicalPearls: string;
  hemodialysisSupplement?: string;
}

export const RENAL_DRUG_RULES: RenalDrugRule[] = [
  {
    "drugName": "Meropenem",
    "genericName": "Meropenem Trihydrate Injeksi IV",
    "atcCode": "J01DH02",
    "normalDose": "1000 mg IV setiap 8 jam (infus 30 menit atau infus kontinu 3 jam)",
    "rules": [
      {
        "minCrCl": 51,
        "maxCrCl": 999,
        "recommendation": "Dosis normal: 1000 mg IV setiap 8 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 26,
        "maxCrCl": 50,
        "recommendation": "Berikan 1000 mg IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 25,
        "recommendation": "Berikan 500 mg IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Berikan 500 mg IV setiap 24 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Eliminasi utama melalui filtrasi glomerulus dan sekresi tubulus ginjal (70% obat utuh). Pada pasien Hemodialisis (HD): berikan 500 mg pasca-HD karena obat tereliminasi signifikan oleh dialisis.",
    "hemodialysisSupplement": "Berikan 500 mg IV pasca-sesi hemodialisis."
  },
  {
    "drugName": "Vancomycin",
    "genericName": "Vancomycin Hydrochloride Injeksi IV",
    "atcCode": "J01XA01",
    "normalDose": "15 - 20 mg/kgBB IV setiap 8 - 12 jam (target trough 15 - 20 mcg/mL pada infeksi berat MRSA)",
    "rules": [
      {
        "minCrCl": 80,
        "maxCrCl": 999,
        "recommendation": "15 - 20 mg/kgBB IV setiap 8 - 12 jam. Monitor kadar palung (trough) sebelum dosis ke-4.",
        "status": "Normal"
      },
      {
        "minCrCl": 50,
        "maxCrCl": 79,
        "recommendation": "15 - 20 mg/kgBB IV setiap 12 - 24 jam. Monitor kadar trough serum.",
        "status": "Adjust"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 49,
        "recommendation": "15 mg/kgBB IV setiap 24 - 48 jam berbasis pemantauan TDM ketat.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "Dosis muat (loading dose) 20 - 25 mg/kgBB sekali, dosis rumatan hanya diberikan bila kadar palung turun < 15-20 mcg/mL.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Nefrotoksik poten dan ototoksik. Ekskresi ginjal 80-90%. Wajib hidrasi adekuat dan Therapeutic Drug Monitoring (TDM) kadar serum. Pada Hemodialisis: berikan dosis muat, lalu cek kadar pra-HD dan beri suplemen 500-1000 mg pasca-HD.",
    "hemodialysisSupplement": "Dosis berbasis kadar trough serum pasca-HD (lazim 500 - 1000 mg pasca-HD)."
  },
  {
    "drugName": "Amikacin",
    "genericName": "Amikacin Sulfate Injeksi",
    "atcCode": "J01GB06",
    "normalDose": "15 mg/kgBB IV/IM sekali sehari (extended-interval) atau 7.5 mg/kgBB q12h",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "15 mg/kgBB IV sekali sehari (setiap 24 jam).",
        "status": "Normal"
      },
      {
        "minCrCl": 40,
        "maxCrCl": 59,
        "recommendation": "11 - 15 mg/kgBB IV setiap 24 jam, atau 7.5 mg/kgBB setiap 18 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 39,
        "recommendation": "7.5 - 10 mg/kgBB IV setiap 24 - 36 jam. Pantau kadar palung (< 5 mcg/mL).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "7.5 mg/kgBB IV setiap 48 jam atau berdasarkan kadar serum TDM.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Eliminasi ginjal > 90%. Sangat nefrotoksik dan ototoksik ireversibel. Hindari penggunaan bersama furosemid atau cisplatin. Pada pasien HD: berikan 5-7.5 mg/kgBB pasca-HD.",
    "hemodialysisSupplement": "Berikan 5 - 7.5 mg/kgBB pasca-HD."
  },
  {
    "drugName": "Gentamicin",
    "genericName": "Gentamicin Sulfate Injeksi",
    "atcCode": "J01GB03",
    "normalDose": "5 - 7 mg/kgBB IV sekali sehari (extended interval) atau 1.5 - 2 mg/kgBB q8h",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "5 - 7 mg/kgBB IV setiap 24 jam (atau 1.5 mg/kgBB q8h).",
        "status": "Normal"
      },
      {
        "minCrCl": 40,
        "maxCrCl": 59,
        "recommendation": "5 mg/kgBB IV setiap 36 jam (atau 1.5 mg/kgBB q12h).",
        "status": "Adjust"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 39,
        "recommendation": "5 mg/kgBB IV setiap 48 jam (atau 1 - 1.5 mg/kgBB q24h). Monitor trough < 1 mcg/mL.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "2 mg/kgBB loading dose, dosis lanjutan hanya berdasarkan TDM kadar serum.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Nekrosis tubular akut dan ototoksisitas kokleovestibular bilateral. Pastikan kadar palung (trough) < 1 mcg/mL sebelum dosis berikutnya untuk mencegah akumulasi toksik.",
    "hemodialysisSupplement": "Berikan 1 - 1.5 mg/kgBB pasca-dialisis."
  },
  {
    "drugName": "Cefepime",
    "genericName": "Cefepime Hydrochloride Injeksi IV",
    "atcCode": "J01DE01",
    "normalDose": "1000 - 2000 mg IV setiap 8 - 12 jam",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "1000 - 2000 mg IV setiap 8 - 12 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 59,
        "recommendation": "1000 - 2000 mg IV setiap 24 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 11,
        "maxCrCl": 29,
        "recommendation": "500 - 1000 mg IV setiap 24 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 10,
        "recommendation": "250 - 500 mg IV setiap 24 jam (WASPADA ENSEFALOPATI NEUROTOKSIK).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "FDA Black Box Warning untuk Neurotoksisitas: Penumpukan cefepime pada GGK memicu ensefalopati uremik, mioklonus, status epileptikus non-konvulsif, dan koma bila dosis tidak diturunkan. Pada HD: 500-1000 mg pasca-HD.",
    "hemodialysisSupplement": "Berikan 1000 mg pasca-HD pada hari dialisis."
  },
  {
    "drugName": "Ceftazidime",
    "genericName": "Ceftazidime Pentahydrate Injeksi IV",
    "atcCode": "J01DD02",
    "normalDose": "1000 - 2000 mg IV setiap 8 jam",
    "rules": [
      {
        "minCrCl": 51,
        "maxCrCl": 999,
        "recommendation": "1000 - 2000 mg IV setiap 8 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 31,
        "maxCrCl": 50,
        "recommendation": "1000 mg IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 16,
        "maxCrCl": 30,
        "recommendation": "1000 mg IV setiap 24 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 6,
        "maxCrCl": 15,
        "recommendation": "500 mg IV setiap 24 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 5,
        "recommendation": "500 mg IV setiap 48 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal 80-90% obat utuh. Dialyzable (50% terbuang saat HD). Berikan 1000 mg loading lalu 500-1000 mg pasca setiap sesi HD.",
    "hemodialysisSupplement": "Berikan 1000 mg pasca-HD."
  },
  {
    "drugName": "Cefotaxime",
    "genericName": "Cefotaxime Sodium Injeksi",
    "atcCode": "J01DD01",
    "normalDose": "1000 - 2000 mg IV/IM setiap 8 jam",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "1000 - 2000 mg IV setiap 8 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 49,
        "recommendation": "1000 - 2000 mg IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "Kurangi dosis sebesar 50% (1000 mg IV setiap 12 - 24 jam).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Metabolit aktif desasetilsefotaksim juga diekskresikan melalui urin. Pada HD: berikan 1000 mg pasca-HD.",
    "hemodialysisSupplement": "Berikan 1000 mg pasca-dialisis."
  },
  {
    "drugName": "Cefuroxime",
    "genericName": "Cefuroxime Axetil Oral / Cefuroxime Sodium Injeksi",
    "atcCode": "J01DC02",
    "normalDose": "Injeksi 750 - 1500 mg IV q8h; Oral 250 - 500 mg q12h",
    "rules": [
      {
        "minCrCl": 20,
        "maxCrCl": 999,
        "recommendation": "Dosis standar (IV 750-1500 mg q8h / Oral 250-500 mg q12h).",
        "status": "Normal"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 19,
        "recommendation": "IV 750 mg setiap 12 jam; Oral 250-500 mg setiap 24 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "IV 750 mg setiap 24 jam; Oral 250 mg setiap 24 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Waktu paruh memanjang dari 1.5 jam menjadi 15-22 jam pada gagal ginjal terminal.",
    "hemodialysisSupplement": "Berikan dosis tunggal 750 mg IV pasca-HD."
  },
  {
    "drugName": "Cefixime",
    "genericName": "Cefixime Trihydrate Kapsul / Sirup Kering",
    "atcCode": "J01DD08",
    "normalDose": "200 - 400 mg oral per hari (dosis tunggal atau terbagi 2)",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar: 200 - 400 mg per oral per hari.",
        "status": "Normal"
      },
      {
        "minCrCl": 21,
        "maxCrCl": 59,
        "recommendation": "Berikan maksimal 75% dari dosis standar (maksimal 300 mg/hari).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 20,
        "recommendation": "Berikan maksimal 50% dari dosis standar (maksimal 200 mg sekali sehari).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Cefixime tidak tereliminasi secara bermakna oleh hemodialisis maupun dialisis peritoneal (tidak memerlukan dosis tambahan pasca-HD).",
    "hemodialysisSupplement": "Tidak memerlukan dosis tambahan pasca-HD (maks 200 mg/hari)."
  },
  {
    "drugName": "Piperacillin + Tazobactam",
    "genericName": "Piperacillin Sodium + Tazobactam Sodium Injeksi (Tazocin)",
    "atcCode": "J01CR05",
    "normalDose": "4.5 g IV setiap 6 - 8 jam (infus 30 menit atau infus lambat 4 jam)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "4.5 g IV setiap 6 - 8 jam (infus standar).",
        "status": "Normal"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 49,
        "recommendation": "3.375 g IV setiap 6 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "2.25 g IV setiap 6 jam (atau 3.375 g q8h).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Sinergisme nefrotoksisitas berat bila dikombinasikan dengan Vancomycin (angka acute kidney injury / AKI meningkat hingga 3x lipat). Pada Hemodialisis: berikan 2.25 g q8h ditambah dosis suplemen 0.75 g pasca-HD.",
    "hemodialysisSupplement": "Berikan 0.75 g IV pasca-sesi hemodialisis."
  },
  {
    "drugName": "Ampicillin + Sulbactam",
    "genericName": "Ampicillin Sodium + Sulbactam Sodium Injeksi",
    "atcCode": "J01CR01",
    "normalDose": "1.5 g - 3 g IV/IM setiap 6 jam",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "1.5 g - 3 g IV setiap 6 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "1.5 g - 3 g IV setiap 8 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 29,
        "recommendation": "1.5 g - 3 g IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "1.5 g - 3 g IV setiap 24 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Sulbactam sangat bergantung pada ekskresi ginjal. Pada infeksi Acinetobacter baumannii dosis sulbactam tinggi membutuhkan pemantauan ketat.",
    "hemodialysisSupplement": "Berikan 1.5 g - 3 g pasca-dialisis."
  },
  {
    "drugName": "Co-Trimoxazole (TMP-SMX)",
    "genericName": "Sulfamethoxazole + Trimethoprim Tablet / Suspensi",
    "atcCode": "J01EE01",
    "normalDose": "1 - 2 tablet Forte (800/160 mg) setiap 12 jam",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 1 - 2 tablet Forte setiap 12 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 29,
        "recommendation": "Kurangi dosis 50% (1 tablet Forte setiap 24 jam atau 1 tablet reguler q12h).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "KONTRAINDIKASI MUTLAK / Tidak direkomendasikan (kecuali hemodialisis dengan TDM).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Trimethoprim menghambat sekresi kreatinin di tubulus ginjal, memicu kenaikan semu (pseudoelevasi) serum kreatinin sebesar 10-30% tanpa penurunan GFR sebenarnya. Risiko hiperkalemia berat.",
    "hemodialysisSupplement": "Pada pasien HD: 1 tab Forte pasca-HD."
  },
  {
    "drugName": "Ciprofloxacin",
    "genericName": "Ciprofloxacin Hydrochloride Tablet / Infus",
    "atcCode": "J01MA02",
    "normalDose": "Oral 500 - 750 mg q12h; IV 400 mg q8-12h",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar: Oral 500 mg q12h / IV 400 mg q12h.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "Oral 250 - 500 mg q12h / IV 200 - 400 mg q12h.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Oral 250 - 500 mg q18-24h / IV 200 - 400 mg q24h.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Klirens ginjal 40-50% dan metabolisme hepar 20-30%. Penumpukan pada GGK berat meningkatkan risiko stimulasi SSP (kejang, konfusi mental, tremor) dan tendinopati.",
    "hemodialysisSupplement": "Berikan 250 - 500 mg oral atau 200 - 400 mg IV pasca-HD."
  },
  {
    "drugName": "Levofloxacin",
    "genericName": "Levofloxacin Hemihydrate Tablet / Infus",
    "atcCode": "J01MA12",
    "normalDose": "500 - 750 mg oral/IV sekali sehari (setiap 24 jam)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "500 - 750 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 49,
        "recommendation": "Dosis awal 500 mg, selanjutnya 250 mg setiap 24 jam (bila dosis lazim 750 mg: 750 mg q48h).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "Dosis awal 500 mg, selanjutnya 250 mg setiap 48 jam (atau 750 mg awal, lalu 500 mg q48h).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal > 85% obat utuh. Waktu paruh melonjak dari 6 jam menjadi 28-35 jam pada gagal ginjal berat. Wajib penyesuaian interval dosis.",
    "hemodialysisSupplement": "Dosis pasca-HD: 250 mg setiap 48 jam setelah sesi hemodialisis."
  },
  {
    "drugName": "Fluconazole",
    "genericName": "Fluconazole Kapsul / Injeksi Infus",
    "atcCode": "J02AC01",
    "normalDose": "100 - 400 mg oral/IV sekali sehari (dosis muat hari-1 2x lipat)",
    "rules": [
      {
        "minCrCl": 51,
        "maxCrCl": 999,
        "recommendation": "Dosis penuh 100 - 400 mg setiap 24 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 11,
        "maxCrCl": 50,
        "recommendation": "Berikan 50% dari dosis lazim (atau interval diperpanjang setiap 48 jam).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 10,
        "recommendation": "Berikan 25% - 50% dari dosis lazim setiap 48 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi urin > 80% dalam bentuk utuh aktif. Fluconazole sangat mudah dibersihkan oleh dialisis (sekitar 50% tereliminasi dalam 3 jam HD); berikan 100% dosis penuh pasca-HD.",
    "hemodialysisSupplement": "Berikan dosis harian penuh (100%) segera setelah selesai sesi hemodialisis."
  },
  {
    "drugName": "Itraconazole",
    "genericName": "Itraconazole Kapsul 100 mg",
    "atcCode": "J02AC02",
    "normalDose": "100 - 200 mg oral 1-2 kali sehari bersama makanan",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 100 - 200 mg oral 1-2 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Kapsul oral tidak memerlukan penyesuaian dosis. SEDIAAN INFUS IV KONTRAINDIKASI (pelarut siklodekstrin menumpuk nefrotoksik).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Metabolisme hepar ekstensif (CYP3A4); ekskresi ginjal metabolit < 1%. Kapsul oral aman pada GGK. Larutan infus IV mengandung hidroksipropil-beta-siklodekstrin yang menumpuk pada CrCl < 30.",
    "hemodialysisSupplement": "Tidak memerlukan dosis tambahan (tidak dialisis)."
  },
  {
    "drugName": "Voriconazole",
    "genericName": "Voriconazole Tablet 200 mg / Serbuk Injeksi 200 mg",
    "atcCode": "J02AC03",
    "normalDose": "Loading 6 mg/kgBB q12h x 2 dosis, lalu rumatan 4 mg/kgBB q12h (Oral 200 mg q12h)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar IV dan Oral tanpa penyesuaian.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 49,
        "recommendation": "Beralih ke TABLET ORAL (tidak perlu penyesuaian dosis oral). Sediaan IV KONTRAINDIKASI relatif (pelarut SBECD menumpuk pada CrCl < 50).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Pelarut sediaan IV (sulfobutyl ether beta-cyclodextrin / SBECD) diekskresikan melalui filtrasi glomerulus dan menumpuk pada pasien GGK. Selalu prioritaskan tablet oral vorikonazol.",
    "hemodialysisSupplement": "Tablet oral: tidak perlu penyesuaian dosis; IV: hanya bila manfaat jauh melebihi risiko."
  },
  {
    "drugName": "Acyclovir",
    "genericName": "Acyclovir Tablet / Serbuk Injeksi Infus",
    "atcCode": "J05AB01",
    "normalDose": "IV 5 - 10 mg/kgBB q8h; Oral 200 - 800 mg 5x sehari",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar (IV q8h / Oral q4h 5x/hari).",
        "status": "Normal"
      },
      {
        "minCrCl": 25,
        "maxCrCl": 49,
        "recommendation": "IV 5 - 10 mg/kgBB setiap 12 jam; Oral 800 mg q8h (atau 200 mg q8h).",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 24,
        "recommendation": "IV 5 - 10 mg/kgBB setiap 24 jam; Oral 800 mg q12h.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "IV 2.5 - 5 mg/kgBB setiap 24 jam; Oral 800 mg q24h (WASPADAI NEFROPATI KRISTALURIA).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Dapat memicu nefropati obstruktif akibat pengendapan kristal asiklovir di tubulus ginjal (terutama infus bolus cepat atau dehidrasi). Wajib infus lambat minimal 1 jam dan hidrasi salin adekuat.",
    "hemodialysisSupplement": "Berikan dosis harian segera setelah sesi hemodialisis (60% terbuang saat HD)."
  },
  {
    "drugName": "Valacyclovir",
    "genericName": "Valacyclovir Hydrochloride Tablet 500 mg",
    "atcCode": "J05AB11",
    "normalDose": "Herpes Zoster: 1000 mg oral 3x sehari (setiap 8 jam) selama 7 hari",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "1000 mg setiap 8 jam selama 7 hari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "1000 mg setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 29,
        "recommendation": "1000 mg setiap 24 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "500 mg setiap 24 jam (setelah dialisis pada hari HD).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Prodrug L-valil asiklovir yang terhidrolisis menjadi asiklovir bebas. Penumpukan asiklovir memicu neurotoksisitas (konfusi, halusinasi, mioklonus, kejang) bila dosis tidak disesuaikan.",
    "hemodialysisSupplement": "Berikan 500 mg oral segera pasca-HD."
  },
  {
    "drugName": "Ganciclovir",
    "genericName": "Ganciclovir Sodium Serbuk Injeksi 500 mg",
    "atcCode": "J05AB06",
    "normalDose": "Induksi CMV: 5 mg/kgBB IV setiap 12 jam x 14-21 hari; Rumatan: 5 mg/kgBB q24h",
    "rules": [
      {
        "minCrCl": 70,
        "maxCrCl": 999,
        "recommendation": "Induksi 5 mg/kgBB q12h; Rumatan 5 mg/kgBB q24h.",
        "status": "Normal"
      },
      {
        "minCrCl": 50,
        "maxCrCl": 69,
        "recommendation": "Induksi 2.5 mg/kgBB q12h; Rumatan 2.5 mg/kgBB q24h.",
        "status": "Adjust"
      },
      {
        "minCrCl": 25,
        "maxCrCl": 49,
        "recommendation": "Induksi 2.5 mg/kgBB q24h; Rumatan 1.25 mg/kgBB q24h.",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 24,
        "recommendation": "Induksi 1.25 mg/kgBB q24h; Rumatan 0.625 mg/kgBB q24h.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Induksi 1.25 mg/kgBB 3x seminggu pasca-HD; Rumatan 0.625 mg/kgBB 3x seminggu.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Eliminasi ginjal > 90%. Penumpukan kadar plasma memicu supresi sumsum tulang berat (neutropenia refrakter ANC < 500/mm3). Wajib pemantauan hitung leukosit serial.",
    "hemodialysisSupplement": "Berikan 1.25 mg/kgBB pasca-HD 3 kali seminggu."
  },
  {
    "drugName": "Valganciclovir",
    "genericName": "Valganciclovir Hydrochloride Tablet 450 mg",
    "atcCode": "J05AB14",
    "normalDose": "Induksi Retinitis CMV: 900 mg oral 2x sehari bersama makanan x 21 hari",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Induksi 900 mg q12h; Rumatan 900 mg q24h.",
        "status": "Normal"
      },
      {
        "minCrCl": 40,
        "maxCrCl": 59,
        "recommendation": "Induksi 450 mg q12h; Rumatan 450 mg q24h.",
        "status": "Adjust"
      },
      {
        "minCrCl": 25,
        "maxCrCl": 39,
        "recommendation": "Induksi 450 mg q24h; Rumatan 450 mg setiap 48 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 24,
        "recommendation": "Induksi 450 mg setiap 48 jam; Rumatan 450 mg 2x seminggu.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "KONTRAINDIKASI / Tidak direkomendasikan pada HD (gunakan gansiklovir IV).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Kekuatan tablet 450 mg tidak dapat dibagi secara akurat untuk dosis di bawah 450 mg; gunakan gansiklovir IV bila CrCl < 10 mL/menit.",
    "hemodialysisSupplement": "Tidak direkomendasikan pada pasien hemodialisis rutin."
  },
  {
    "drugName": "Streptomycin",
    "genericName": "Streptomycin Sulfate Injeksi IM",
    "atcCode": "J01GA01",
    "normalDose": "15 mg/kgBB IM sekali sehari (maksimal 1000 mg/hari)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 15 mg/kgBB IM setiap 24 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "7.5 mg/kgBB IM setiap 24 jam (atau 15 mg/kgBB q48h).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "7.5 mg/kgBB IM setiap 48 - 72 jam (Waspada ototoksisitas tuli permanen).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ototoksisitas vestibular ireversibel dan nefrotoksisitas. Pada pasien TB dengan gagal ginjal, pertimbangkan penggantian ke regimen OAT lini kedua non-aminoglikosida.",
    "hemodialysisSupplement": "Berikan 7.5 mg/kgBB pasca-HD."
  },
  {
    "drugName": "Colistin (Colistimethate Sodium)",
    "genericName": "Colistimethate Sodium Injeksi (CMS)",
    "atcCode": "J01XB01",
    "normalDose": "Loading 9 juta IU IV, rumatan 4.5 juta IU setiap 12 jam",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Rumatan 4.5 juta IU IV setiap 12 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "Rumatan 2.75 - 3.5 juta IU IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 29,
        "recommendation": "Rumatan 1.5 - 2 juta IU IV setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Rumatan 1 - 1.5 juta IU IV setiap 24 - 48 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Sangat nefrotoksik (> 30-50% pasien mengalami AKI) dan neurotoksik (blokade neuromuskular/apnea). Selalu berikan dosis muat (loading dose) 9 juta IU terlepas dari fungsi ginjal untuk mencapai kadar bakterisida cepat.",
    "hemodialysisSupplement": "Pada HD: berikan 1.5 - 2 juta IU pasca-HD pada hari dialisis."
  },
  {
    "drugName": "Nitrofurantoin",
    "genericName": "Nitrofurantoin Makrokristal Kapsul 100 mg",
    "atcCode": "J01XE01",
    "normalDose": "100 mg oral setiap 12 jam bersama makanan selama 5 hari (ISK tanpa komplikasi)",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 100 mg setiap 12 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 59,
        "recommendation": "Dapat digunakan dengan hati-hati jangka pendek (maksimal 5 hari) jika tidak ada alternatif.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK (Beers Criteria / FDA Warning). Konsentrasi urin tidak memadai & risiko tinggi toksisitas fatal.",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Pada CrCl < 30 mL/min, filtrasi obat ke dalam urin tidak mencukupi untuk membunuh bakteri di kandung kemih, sementara metabolit toksik menumpuk memicu neuropati perifer berat dan fibrosis paru.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis."
  },
  {
    "drugName": "Clarithromycin",
    "genericName": "Clarithromycin Tablet 500 mg",
    "atcCode": "J01FA09",
    "normalDose": "500 mg oral setiap 12 jam",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 500 mg setiap 12 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Kurangi dosis sebesar 50% (250 mg setiap 12 jam atau 500 mg setiap 24 jam; maks 14 hari).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Waktu paruh klaritromisin dan metabolit aktif 14-hidroksi meningkat drastis pada GGK berat. Sediaan lepas lambat (XL) dikontraindikasikan pada CrCl < 30.",
    "hemodialysisSupplement": "Berikan 250 mg pasca-HD."
  },
  {
    "drugName": "Enoxaparin (LMWH)",
    "genericName": "Enoxaparin Sodium Injeksi Subkutan (Lovenox)",
    "atcCode": "B01AB05",
    "normalDose": "Terapi DVT/PE/ACS: 1 mg/kgBB SC q12h; Profilaksis: 40 mg SC q24h",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar: Terapi 1 mg/kgBB SC q12h; Profilaksis 40 mg SC q24h.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "TURUNKAN DOSIS 50%: Terapi 1 mg/kgBB SEKALI SEHARI (q24h); Profilaksis 20 mg SC q24h.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "LMWH dieliminasi murni oleh ginjal. Pada CrCl < 30 mL/min terjadi akumulasi anti-faktor Xa yang melipatgandakan risiko perdarahan fatal. Pantau kadar anti-Xa puncak (target 0.5-1.0 IU/mL untuk terapi). Beralih ke UFH (Unfractionated Heparin) bila memungkinkan.",
    "hemodialysisSupplement": "Gunakan UFH atau monitor anti-Xa ketat."
  },
  {
    "drugName": "Fondaparinux",
    "genericName": "Fondaparinux Sodium Injeksi Subkutan (Arixtra)",
    "atcCode": "B01AX05",
    "normalDose": "Terapi DVT/PE: 7.5 mg SC q24h (BB 50-100 kg); ACS: 2.5 mg SC q24h",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 2.5 mg (ACS) atau 7.5 mg (DVT) SC q24h.",
        "status": "Normal"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 49,
        "recommendation": "Gunakan sangat hati-hati. Pantau tanda perdarahan aktif.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "KONTRAINDIKASI MUTLAK (FDA Boxed Warning: Risiko perdarahan mayor masif tak terkendali).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Fondaparinux diekskresikan 77% utuh di urin tanpa penawar spesifik (protamin tidak membalikkan efek fondaparinux). Kontraindikasi mutlak pada CrCl < 20 mL/menit.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis."
  },
  {
    "drugName": "Rivaroxaban",
    "genericName": "Rivaroxaban Tablet (Xarelto)",
    "atcCode": "B01AF01",
    "normalDose": "Fibrilasi Atrium (NVAF): 20 mg oral sekali sehari bersama makanan malam",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 20 mg sekali sehari bersama makanan.",
        "status": "Normal"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 49,
        "recommendation": "Turunkan dosis menjadi 15 mg SEKALI SEHARI bersama makanan.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "KONTRAINDIKASI MUTLAK / Tidak direkomendasikan di Indonesia.",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Klirens ginjal sepertiga obat utuh. Penurunan fungsi ginjal meningkatkan paparan plasma AUC sebesar 44-64%. Pada terapi DVT akut: 15 mg 2x/hari x 21 hari, lalu 20 mg/hari (15 mg/hari jika CrCl 15-49).",
    "hemodialysisSupplement": "Tidak direkomendasikan pada hemodialisis rutin."
  },
  {
    "drugName": "Apixaban",
    "genericName": "Apixaban Tablet (Eliquis)",
    "atcCode": "B01AF02",
    "normalDose": "Fibrilasi Atrium (NVAF): 5 mg oral 2 kali sehari",
    "rules": [
      {
        "minCrCl": 25,
        "maxCrCl": 999,
        "recommendation": "5 mg 2 kali sehari (turunkan ke 2.5 mg q12h bila memenuhi 2 dari 3 kriteria dosis reduksi).",
        "status": "Normal"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 24,
        "recommendation": "2.5 mg 2 kali sehari.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "Gunakan sangat hati-hati pada dosis 2.5 mg q12h; monitor tanda perdarahan.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Kriteria Reduksi Dosis (Dose Reduction Criteria): Berikan 2.5 mg dua kali sehari HANYA BILA pasien memenuhi minimal 2 dari 3 kondisi: (1) Serum Kreatinin >= 1.5 mg/dL, (2) Usia >= 80 tahun, (3) Berat Badan <= 60 kg.",
    "hemodialysisSupplement": "Pada HD di US disetujui 5 mg q12h (2.5 mg jika usia >= 80 atau BB <= 60 kg)."
  },
  {
    "drugName": "Dabigatran",
    "genericName": "Dabigatran Etexilate Kapsul (Pradaxa)",
    "atcCode": "B01AE07",
    "normalDose": "150 mg oral 2 kali sehari",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "150 mg oral 2 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "Pertimbangkan dosis 110 mg oral 2 kali sehari pada pasien dengan risiko perdarahan tinggi.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK di Indonesia & Eropa (Ekskresi ginjal 80%).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Dabigatran memiliki ketergantungan eliminasi ginjal tertinggi (80%) di antara semua DOAC. Pada CrCl < 30 mL/min, waktu paruh melonjak hingga > 28 jam dengan risiko perdarahan masif tak terelakkan.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada hemodialisis."
  },
  {
    "drugName": "Atenolol",
    "genericName": "Atenolol Tablet",
    "atcCode": "C07AB03",
    "normalDose": "50 - 100 mg oral sekali sehari",
    "rules": [
      {
        "minCrCl": 35,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 50 - 100 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 34,
        "recommendation": "Dosis maksimal 50 mg per hari.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "Dosis maksimal 25 mg per hari atau 50 mg setiap 48 jam (WASPADAI BRADIKARDIA BERAT).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Merupakan beta-bloker hidrofilik yang diekskresikan 50-85% utuh melalui urin (berbeda dari bisoprolol/metoprolol yang memiliki eliminasi hepar). Penumpukan memicu bradikardia berat dan blok AV.",
    "hemodialysisSupplement": "Berikan 25 - 50 mg pasca-sesi hemodialisis (atenolol sangat dialyzable)."
  },
  {
    "drugName": "Captopril",
    "genericName": "Captopril Tablet",
    "atcCode": "C09AA01",
    "normalDose": "12.5 - 50 mg oral 2 - 3 kali sehari 1 jam sebelum makan",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 12.5 - 50 mg 2-3 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 49,
        "recommendation": "Berikan 75% dari dosis lazim (mulai 6.25 - 12.5 mg q12h).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Berikan 50% dari dosis lazim (mulai 6.25 mg q12-24h). Monitor ketat kalium.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal 50% obat utuh. Waktu paruh memanjang signifikan pada GGK. Pantau lonjakan kreatinin (> 30% dari baseline) dan hiperkalemia.",
    "hemodialysisSupplement": "Berikan dosis pasca-HD."
  },
  {
    "drugName": "Ramipril",
    "genericName": "Ramipril Tablet",
    "atcCode": "C09AA05",
    "normalDose": "2.5 - 10 mg oral sekali sehari",
    "rules": [
      {
        "minCrCl": 40,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 2.5 - 10 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 39,
        "recommendation": "Mulai dosis terendah 1.25 mg sekali sehari, titrasi bertahap hingga maksimal 5 mg/hari.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Metabolit aktif ramiprilat diekskresikan oleh ginjal. Titrasi dosis lambat untuk mencegah hipotensi dan penurunan perfusi ginjal mendadak.",
    "hemodialysisSupplement": "Mulai 1.25 mg sekali sehari pasca-HD."
  },
  {
    "drugName": "Lisinopril",
    "genericName": "Lisinopril Dihydrate Tablet",
    "atcCode": "C09AA03",
    "normalDose": "10 - 40 mg oral sekali sehari",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 10 - 40 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 29,
        "recommendation": "Mulai dosis 2.5 - 5 mg sekali sehari, titrasi bertahap (maksimal 20 mg/hari).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Mulai dosis 2.5 mg sekali sehari (dosis rumatan maksimal 5 mg/hari).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Lisinopril 100% diekskresikan utuh melalui ginjal tanpa metabolisme hepar. Dialyzable oleh hemodialisis.",
    "hemodialysisSupplement": "Berikan 2.5 mg pasca-HD pada hari dialisis."
  },
  {
    "drugName": "Digoxin",
    "genericName": "Digoxin Tablet 0.25 mg / Injeksi 0.5 mg/2 mL",
    "atcCode": "C01AA05",
    "normalDose": "0.125 - 0.25 mg oral sekali sehari",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 0.125 - 0.25 mg/hari.",
        "status": "Normal"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 49,
        "recommendation": "Kurangi dosis 25% - 50% (0.0625 - 0.125 mg per hari atau selang sehari).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "0.0625 mg setiap 48 jam (atau 0.0625 mg 2x seminggu). MONITOR KADAR DIGOXIN KETAT.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal 70-80%. Volume distribusi dan klirens menurun tajam pada GGK. Target kadar serum terapeutik gagal jantung: 0.5 - 0.9 ng/mL. Hipokalemia melipatgandakan aritmia toksik.",
    "hemodialysisSupplement": "Digoxin TIDAK dapat didialisis (tidak perlu dosis tambahan pasca-HD)."
  },
  {
    "drugName": "Spironolactone",
    "genericName": "Spironolactone Tablet 25 mg / 100 mg",
    "atcCode": "C03DA01",
    "normalDose": "25 - 50 mg oral sekali sehari",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 25 - 50 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "Mulai dosis 12.5 - 25 mg sekali sehari atau selang sehari. Wajib monitor kalium.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK (eGFR < 30 mL/min). Risiko hiperkalemia fatal dan aritmia henti jantung!",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "RALES Trial: Spironolakton dikontraindikasikan bila serum kreatinin > 2.5 mg/dL (pria) / > 2.0 mg/dL (wanita) atau eGFR < 30 mL/min. Wajib periksa kalium dalam 1 minggu.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien gagal ginjal terminal."
  },
  {
    "drugName": "Sacubitril Valsartan",
    "genericName": "Sacubitril + Valsartan Sodium Tablet (Entresto)",
    "atcCode": "C09DX04",
    "normalDose": "Target 200 mg (97/103 mg) oral 2 kali sehari",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Mulai dosis standar 50 mg (24/26 mg) atau 100 mg (49/51 mg) 2 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Mulai dosis terendah 50 mg (24/26 mg) 2 kali sehari, titrasi dosis secara sangat bertahap.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Data PARADIGM-HF: Pada gangguan ginjal berat (eGFR < 30), paparan metabolit aktif sakubitrilat meningkat lebih dari 2 kali lipat. Pantau fungsi ginjal dan kalium serum ketat.",
    "hemodialysisSupplement": "Gunakan dengan kehati-hatian tinggi pada hemodialisis (data terbatas)."
  },
  {
    "drugName": "Metformin",
    "genericName": "Metformin Hydrochloride Tablet",
    "atcCode": "A10BA02",
    "normalDose": "500 - 1000 mg oral 2-3 kali sehari bersama atau sesudah makan (maks 2000 mg/hari)",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis normal 1000 - 2000 mg/hari. Monitor fungsi ginjal tahunan.",
        "status": "Normal"
      },
      {
        "minCrCl": 45,
        "maxCrCl": 59,
        "recommendation": "Dosis maksimal 1500 mg/hari. Monitor fungsi ginjal setiap 3-6 bulan.",
        "status": "Adjust"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 44,
        "recommendation": "Dosis maksimal 1000 mg/hari. JANGAN memulai terapi baru jika pasien baru terdiagnosis.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK (eGFR < 30 mL/min). Risiko tinggi Asidosis Laktat (MALA) fatal!",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Metformin diekskresikan 90-100% utuh melalui sekresi tubulus ginjal. Penumpukan metformin menghambat kompleks I rantai respirasi mitokondria hepatik dan konversi laktat, memicu Metformin-Associated Lactic Acidosis (MALA) dengan mortalitas > 30-50%.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis (meskipun dialyzable saat intoksikasi akut)."
  },
  {
    "drugName": "Glimepiride",
    "genericName": "Glimepiride Tablet 1 mg, 2 mg, 3 mg, 4 mg",
    "atcCode": "A10BB12",
    "normalDose": "1 - 4 mg oral sekali sehari saat sarapan pagi (maks 8 mg/hari)",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 1 - 4 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 59,
        "recommendation": "Mulai dosis terendah 1 mg sekali sehari, titrasi dosis secara sangat perlahan.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI / Tidak direkomendasikan. Risiko hipoglikemia berat berkepanjangan akibat akumulasi metabolit M1 aktif.",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Metabolit aktif glimepirid (M1) diekskresikan 60% melalui urin. Pada GGK berat terjadi penumpukan metabolit aktif yang memicu koma hipoglikemia refrakter yang berlangsung berhari-hari. Alihkan ke insulin atau DPP-4i (linagliptin).",
    "hemodialysisSupplement": "KONTRAINDIKASI pada hemodialisis rutin."
  },
  {
    "drugName": "Gliclazide",
    "genericName": "Gliclazide Modified Release (MR) Tablet 30 mg / 60 mg",
    "atcCode": "A10BB09",
    "normalDose": "30 - 120 mg oral sekali sehari saat sarapan pagi",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 30 - 120 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 29,
        "recommendation": "Mulai dosis terendah 30 mg MR sekali sehari, monitor glukosa darah mandiri ketat.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "KONTRAINDIKASI MUTLAK (CrCl < 15 mL/min atau gagal ginjal terminal).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Merupakan sulfonilurea paling aman untuk gangguan ginjal ringan-sedang karena dimetabolisme hepar menjadi metabolit-metabolit inaktif tanpa aktivitas hipoglikemik.",
    "hemodialysisSupplement": "KONTRAINDIKASI pada pasien dialisis."
  },
  {
    "drugName": "Empagliflozin",
    "genericName": "Empagliflozin Tablet 10 mg / 25 mg (Jardiance)",
    "atcCode": "A10BK03",
    "normalDose": "10 - 25 mg oral sekali sehari pada pagi hari",
    "rules": [
      {
        "minCrCl": 45,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 10 - 25 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 44,
        "recommendation": "Gunakan dosis 10 mg SEKALI SEHARI untuk proteksi gagal jantung/CKD (efikasi glukosa berkurang, renoproteksi tetap superior).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 19,
        "recommendation": "KONTRAINDIKASI inisiasi baru (eGFR < 20 mL/min atau dialisis).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "EMPA-KIDNEY & EMPEROR-Reduced: Glukosuria menurun seiring penurunan eGFR, namun proteksi hemodinamik intraglomerular (penurunan tekanan kapiler glomerulus) memperlambat progresi CKD dan mortalitas CV. Jangan inisiasi pada eGFR < 20 mL/min.",
    "hemodialysisSupplement": "KONTRAINDIKASI pada pasien dialisis."
  },
  {
    "drugName": "Dapagliflozin",
    "genericName": "Dapagliflozin Propanediol Tablet 10 mg (Forxiga)",
    "atcCode": "A10BK01",
    "normalDose": "10 mg oral sekali sehari pada pagi hari",
    "rules": [
      {
        "minCrCl": 45,
        "maxCrCl": 999,
        "recommendation": "10 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 25,
        "maxCrCl": 44,
        "recommendation": "10 mg sekali sehari (diindikasikan untuk memperlambat laju penurunan eGFR pada CKD dan HFrEF).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 24,
        "recommendation": "KONTRAINDIKASI inisiasi baru jika eGFR < 25 mL/min (lanjutkan jika sudah mentoleransi hingga dialisis).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "DAPA-CKD: Memperlambat progresi gagal ginjal terminal dan kematian kardiovaskular. Penurunan awal eGFR (dip) 2-4 mL/min dalam 2 minggu pertama adalah reversibel dan menandakan penurunan hiperfiltrasi protektif.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis."
  },
  {
    "drugName": "Sitagliptin",
    "genericName": "Sitagliptin Phosphate Tablet (Januvia)",
    "atcCode": "A10BH01",
    "normalDose": "100 mg oral sekali sehari",
    "rules": [
      {
        "minCrCl": 45,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 100 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 44,
        "recommendation": "Turunkan dosis 50%: berikan 50 mg SEKALI SEHARI.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Turunkan dosis 75%: berikan 25 mg SEKALI SEHARI (termasuk pasien hemodialisis).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Diekskresikan 79% utuh melalui urin. Penyesuaian dosis bertahap (100 mg -> 50 mg -> 25 mg) menjaga paparan terapeutik tanpa meningkatkan risiko hipoglikemia.",
    "hemodialysisSupplement": "Berikan 25 mg sekali sehari tanpa memandang jadwal dialisis (dapat diberikan sebelum/sesudah HD)."
  },
  {
    "drugName": "Vildagliptin",
    "genericName": "Vildagliptin Tablet 50 mg (Galvus)",
    "atcCode": "A10BH02",
    "normalDose": "50 mg oral 2 kali sehari (100 mg/hari)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 50 mg 2 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 49,
        "recommendation": "TURUNKAN DOSIS 50%: Berikan 50 mg SEKALI SEHARI pada pagi hari (termasuk pasien GGK terminal & HD).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Metabolisme hepar menghasilkan metabolit inaktif LAY151 yang diekskresikan oleh ginjal. Pada CrCl < 50 mL/min, dosis tunggal 50 mg/hari pagi hari memberikan kontrol glikemik yang efektif dan aman.",
    "hemodialysisSupplement": "Berikan 50 mg sekali sehari pada pagi hari."
  },
  {
    "drugName": "Acarbose",
    "genericName": "Acarbose Tablet 50 mg / 100 mg (Glucobay)",
    "atcCode": "A10BF01",
    "normalDose": "50 - 100 mg oral 3 kali sehari bersama suapan pertama makanan",
    "rules": [
      {
        "minCrCl": 25,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 50 - 100 mg 3 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 24,
        "recommendation": "KONTRAINDIKASI MUTLAK (CrCl < 25 mL/min atau dialisis). Akumulasi obat dan metabolit meningkat tajam.",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Walaupun absorpsi sistemik akarobose rendah (< 2%), metabolit hasil degradasi bakteri usus diserap dan diekskresikan oleh ginjal. Kadar plasma melonjak 5 kali lipat pada gagal ginjal berat.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis."
  },
  {
    "drugName": "Allopurinol",
    "genericName": "Allopurinol Tablet 100 mg / 300 mg",
    "atcCode": "M04AA01",
    "normalDose": "100 - 300 mg oral sekali sehari sesudah makan (maksimal 600-800 mg/hari)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 100 - 300 mg/hari sesudah makan.",
        "status": "Normal"
      },
      {
        "minCrCl": 20,
        "maxCrCl": 49,
        "recommendation": "Dosis maksimal 100 - 200 mg/hari.",
        "status": "Adjust"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 19,
        "recommendation": "Dosis maksimal 100 mg/hari.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Dosis 100 mg setiap 2-3 hari (atau 50 mg/hari). Waspada Sindrom Hipersensitivitas Allopurinol (AHS/SJS).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Metabolit aktif oksipurinol diekskresikan murni melalui filtrasi ginjal (waktu paruh melonjak dari 15-20 jam menjadi > 100 jam pada GGK). Penumpukan oksipurinol memicu Allopurinol Hypersensitivity Syndrome (AHS) mematikan (demam, ruam SJS/TEN, eosinofilia, hepatitis).",
    "hemodialysisSupplement": "Berikan 100 - 200 mg pasca-HD pada hari dialisis (oksipurinol sangat dialyzable)."
  },
  {
    "drugName": "Febuxostat",
    "genericName": "Febuxostat Tablet 40 mg / 80 mg (Adenuric)",
    "atcCode": "M04AA03",
    "normalDose": "40 - 80 mg oral sekali sehari tanpa memandang makanan",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 40 - 80 mg sekali sehari (tidak perlu penyesuaian dosis).",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Gunakan dosis awal 40 mg SEKALI SEHARI dengan kehati-hatian tinggi (data klinis terbatas).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Dimetabolisme secara ekstensif oleh hepar (glukuronidasi UGT dan oksidasi sitokrom P450), ekskresi ginjal obat utuh < 5%. Merupakan alternatif allopurinol yang jauh lebih aman pada pasien CKD stadium 3.",
    "hemodialysisSupplement": "Gunakan 40 mg sekali sehari dengan pemantauan fungsi hati dan asam urat."
  },
  {
    "drugName": "Colchicine",
    "genericName": "Colchicine Tablet 0.5 mg (Recolfar)",
    "atcCode": "M04AC01",
    "normalDose": "Serangan gout akut: 1 mg diikuti 0.5 mg 1 jam kemudian (maks 1.5 mg/serangan)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar: 1 mg awal, lalu 0.5 mg 1 jam kemudian.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "Kurangi dosis atau perpanjang jeda pengulangan kursus (minimal jeda 14 hari sebelum siklus berikutnya).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK / Tidak direkomendasikan pada serangan berulang (risiko miopati & neuropati toksik fatal).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "FDA Black Box Warning: Eliminasi ginjal 40-50%. Penumpukan kolkisin memicu akumulasi mitotik toksik yang menyebabkan neuromiopati berat, rabdomiolisis, pansitopenia aplastik, dan kematian.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis (kolkisin tidak dapat didialisis)."
  },
  {
    "drugName": "Ketorolac",
    "genericName": "Ketorolac Tromethamine Tablet 10 mg / Injeksi 30 mg/mL",
    "atcCode": "M01AB15",
    "normalDose": "Oral 10 mg q4-6h (maks 40 mg/hari, maks 5 hari); IV 30 mg q6h (maks 120 mg/hari)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis lazim jangka pendek (maksimal penggunaan 5 hari).",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 49,
        "recommendation": "KONTRAINDIKASI MUTLAK (FDA Black Box: Memicu Gagal Ginjal Akut Oligurik dan Nekrosis Papilaris Ginjal).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Inhibitor prostaglandin renal poten yang memicu vasokonstriksi arteriol aferen ginjal secara mendadak. Kontraindikasi mutlak pada gangguan ginjal sedang-berat, lansia dehidrasi, atau pasca-operasi bedah mayor.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada hemodialisis."
  },
  {
    "drugName": "Meloxicam",
    "genericName": "Meloxicam Tablet 7.5 mg / 15 mg",
    "atcCode": "M01AC06",
    "normalDose": "7.5 - 15 mg oral sekali sehari sesudah makan",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 7.5 - 15 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK pada GGK berat tanpa dialisis. Pada pasien Hemodialisis: dosis maksimal 7.5 mg/hari.",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Inhibisi sintesis prostaglandin ginjal memicu dekompensasi perfusi ginjal dan retensi natrium/cairan berat. Pada pasien hemodialisis terminal, fraksi bebas meloxicam meningkat sehingga dosis dibatasi maksimal 7.5 mg/hari.",
    "hemodialysisSupplement": "Maksimal 7.5 mg per hari pada pasien hemodialisis."
  },
  {
    "drugName": "Tramadol",
    "genericName": "Tramadol Hydrochloride Kapsul 50 mg / Injeksi 50 mg/mL",
    "atcCode": "N02AX02",
    "normalDose": "50 - 100 mg oral/IV setiap 4 - 6 jam (maksimal 400 mg/hari)",
    "rules": [
      {
        "minCrCl": 30,
        "maxCrCl": 999,
        "recommendation": "Dosis lazim 50 - 100 mg setiap 4 - 6 jam (maks 400 mg/hari).",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "Perpanjang interval menjadi setiap 12 jam. Dosis MAKSIMAL 50 - 100 mg setiap 12 jam (maksimal 200 mg/hari).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Eliminasi ginjal tramadol dan metabolit aktif M1 (O-desmetiltramadol) mencapai 30%. Penumpukan memicu depresi pernapasan, kejang mioklonus, dan sindrom serotonin. Kurang dari 7% terbuang saat HD.",
    "hemodialysisSupplement": "Maksimal 50 mg setiap 12 jam pada hari dialisis."
  },
  {
    "drugName": "Morphine",
    "genericName": "Morphine Sulfate Tablet / Injeksi 10 mg/mL",
    "atcCode": "N02AA01",
    "normalDose": "Oral 10 - 30 mg q4h; IV titrasi individual 2.5 - 5 mg q3-4h",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar sesuai titrasi nyeri kanker/akut.",
        "status": "Normal"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 49,
        "recommendation": "Kurangi dosis 25% - 50% atau perpanjang interval dosis menjadi setiap 6 - 8 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "Kurangi dosis 50% - 75% atau hindari penggunaan (Gunakan Fentanil sebagai alternatif pilihan).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Morfin dimetabolisme di hepar menjadi Morphine-3-Glucuronide (M3G, neurotoksik pemicu allodynia dan kejang) dan Morphine-6-Glucuronide (M6G, analgesik sangat poten & sedatif kuat). Kedua metabolit diekskresikan oleh ginjal dan menumpuk pada GGK memicu depresi napas fatal dan koma. Fentanil adalah opioid pilihan pada GGK.",
    "hemodialysisSupplement": "Gunakan Fentanil sebagai pilihan utama; bila terpaksa morfin, berikan dosis mikro titrasi."
  },
  {
    "drugName": "Baclofen",
    "genericName": "Baclofen Tablet 10 mg (Lioresal)",
    "atcCode": "M03BX01",
    "normalDose": "5 mg 3 kali sehari, titrasi bertahap hingga 10 - 20 mg 3 kali sehari",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 5 - 20 mg 3 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "Mulai dosis 5 mg 1 - 2 kali sehari, titrasi sangat lambat.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK (FDA Alert: Memicu ensefalopati uremik, koma, depresi napas, dan henti jantung).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Baclofen diekskresikan 70-85% utuh oleh ginjal. Pada CrCl < 30 mL/min, dosis sekecil 5 mg sekalipun dapat memicu intoksikasi susunan saraf pusat berat menyerupai mati batang otak (flasiditas ekstrem, koma, bradikardia). Dialisis segera diperlukan untuk intoksikasi.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis rutin."
  },
  {
    "drugName": "Gabapentin",
    "genericName": "Gabapentin Kapsul 100 mg / 300 mg (Neurontin)",
    "atcCode": "N02BF01",
    "normalDose": "300 mg oral 3 kali sehari (900 - 1800 mg/hari)",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 300 - 600 mg 3 kali sehari (900 - 1800 mg/hari).",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 59,
        "recommendation": "200 - 700 mg oral 2 KALI SEHARI (maksimal 1400 mg/hari).",
        "status": "Adjust"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 29,
        "recommendation": "200 - 700 mg oral SEKALI SEHARI (maksimal 700 mg/hari).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "100 - 300 mg oral SEKALI SEHARI (maksimal 300 mg/hari).",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Gabapentin 100% dieliminasi utuh melalui ekskresi ginjal tanpa metabolisme hepar. Penumpukan kadar serum memicu toksisitas neurologis berat (somnolen ekstrem, ataksia, mioklonus, depresi napas). Pada HD: berikan dosis muat 300-400 mg, lalu suplemen 200-300 mg pasca setiap 4 jam sesi HD.",
    "hemodialysisSupplement": "Berikan 200 - 300 mg pasca-sesi hemodialisis."
  },
  {
    "drugName": "Pregabalin",
    "genericName": "Pregabalin Kapsul 50 mg, 75 mg, 150 mg (Lyrica)",
    "atcCode": "N02BF02",
    "normalDose": "75 - 150 mg oral 2 kali sehari (150 - 300 mg/hari)",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 75 - 150 mg 2 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 59,
        "recommendation": "75 - 150 mg per hari (terbagi dalam 2 atau 3 dosis).",
        "status": "Adjust"
      },
      {
        "minCrCl": 15,
        "maxCrCl": 29,
        "recommendation": "25 - 75 mg per hari (diberikan sekali sehari atau terbagi 2 dosis).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 14,
        "recommendation": "25 - 50 mg oral SEKALI SEHARI pada malam hari.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal > 90% obat utuh. Sekitar 50% pregabalin dibersihkan dalam 4 jam hemodialisis.",
    "hemodialysisSupplement": "Berikan dosis tambahan 25 - 100 mg segera setelah sesi hemodialisis."
  },
  {
    "drugName": "Topiramate",
    "genericName": "Topiramate Tablet 25 mg, 50 mg, 100 mg (Topamax)",
    "atcCode": "N03AX11",
    "normalDose": "50 - 200 mg oral 2 kali sehari (100 - 400 mg/hari)",
    "rules": [
      {
        "minCrCl": 70,
        "maxCrCl": 999,
        "recommendation": "Dosis lazim 50 - 200 mg 2 kali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 69,
        "recommendation": "Turunkan dosis awal dan rumatan sebesar 50% dari dosis lazim. Titrasi lebih perlahan.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Klirens ginjal menyumbang 50-80% eliminasi obat. Waktu paruh memanjang hingga dua kali lipat pada CrCl < 70 mL/min. Waspada efek inhibisi karbonik anhidrase (risiko nefrolitiasis batu ginjal dan asidosis metabolik non-anion gap).",
    "hemodialysisSupplement": "Berikan dosis suplemen pasca-HD (dialyzable)."
  },
  {
    "drugName": "Levetiracetam",
    "genericName": "Levetiracetam Tablet 500 mg / Sirup (Keppra)",
    "atcCode": "N03AX14",
    "normalDose": "500 - 1500 mg oral/IV setiap 12 jam (1000 - 3000 mg/hari)",
    "rules": [
      {
        "minCrCl": 80,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 500 - 1500 mg setiap 12 jam.",
        "status": "Normal"
      },
      {
        "minCrCl": 50,
        "maxCrCl": 79,
        "recommendation": "500 - 1000 mg setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 49,
        "recommendation": "250 - 750 mg setiap 12 jam.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "250 - 500 mg setiap 12 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal 66% obat utuh dan 24% metabolit inaktif. Levetiracetam sangat mudah didialisis (sekitar 50% terbuang dalam 4 jam sesi HD).",
    "hemodialysisSupplement": "Berikan 500 - 1000 mg setiap 24 jam dengan dosis suplemen 250 - 500 mg pasca-HD."
  },
  {
    "drugName": "Lithium",
    "genericName": "Lithium Carbonate Tablet 200 mg / 400 mg",
    "atcCode": "N05AN01",
    "normalDose": "300 - 600 mg oral 2-3 kali sehari (target serum 0.6 - 1.0 mEq/L)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar dengan monitor kadar serum litium mingguan.",
        "status": "Normal"
      },
      {
        "minCrCl": 10,
        "maxCrCl": 49,
        "recommendation": "Turunkan dosis 50% - 75% dari dosis lazim. Monitor kadar serum dan fungsi ginjal ketat.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 9,
        "recommendation": "KONTRAINDIKASI MUTLAK (Risiko toksisitas neurotoksik ireversibel fatal).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Litium difiltrasi murni oleh glomerulus ginjal dan direabsorpsi 80% di tubulus proksimal bersama natrium. Dehidrasi, diuretik tiazid, dan GGK memicu lonjakan kadar litium toksik (> 1.5-2.0 mEq/L) yang menyebabkan diabetes insipidus nefrogenik, ataksia berat, dan kejang.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK (hemodialisis darurat dilakukan saat intoksikasi litium akut)."
  },
  {
    "drugName": "Zonisamide",
    "genericName": "Zonisamide Kapsul 100 mg (Zonegran)",
    "atcCode": "N03AX15",
    "normalDose": "100 - 400 mg oral sekali sehari (atau terbagi 2)",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis lazim 100 - 400 mg sekali sehari.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 49,
        "recommendation": "KONTRAINDIKASI / Tidak direkomendasikan jika CrCl < 50 mL/min (klirens ginjal turun 35%, risiko asidosis dan batu ginjal).",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Zonisamid diekskresikan 62% melalui urin. Inhibisi karbonik anhidrase memicu presipitasi kalsium fosfat dan nefrolitiasis batu ginjal. Titrasi lambat dan hidrasi cairan minimal 1.5-2 L/hari diperlukan.",
    "hemodialysisSupplement": "Tidak direkomendasikan pada pasien hemodialisis rutin."
  },
  {
    "drugName": "Ranitidine",
    "genericName": "Ranitidine Hydrochloride Tablet 150 mg / Injeksi 50 mg/2 mL",
    "atcCode": "A02BA02",
    "normalDose": "Oral 150 mg 2 kali sehari; IV 50 mg setiap 6 - 8 jam",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis standar: Oral 150 mg q12h / IV 50 mg q8h.",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 49,
        "recommendation": "TURUNKAN DOSIS 50%: Oral 150 mg SEKALI SEHARI (q24h) / IV 50 mg setiap 18 - 24 jam.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Eliminasi ginjal 70% obat utuh. Penumpukan ranitidin pada pasien GGK (terutama lansia) sering memicu efek samping neuropsikiatri berat seperti konfusi mental akut, agitasi, delirium, dan halusinasi.",
    "hemodialysisSupplement": "Berikan 150 mg oral pasca-sesi hemodialisis."
  },
  {
    "drugName": "Famotidine",
    "genericName": "Famotidine Tablet 20 mg / 40 mg / Injeksi 20 mg/2 mL",
    "atcCode": "A02BA03",
    "normalDose": "Oral 20 - 40 mg sebelum tidur atau 20 mg 2 kali sehari; IV 20 mg q12h",
    "rules": [
      {
        "minCrCl": 50,
        "maxCrCl": 999,
        "recommendation": "Dosis lazim 20 - 40 mg sekali sehari sebelum tidur (atau 20 mg q12h).",
        "status": "Normal"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 49,
        "recommendation": "Turunkan dosis 50% (20 mg sekali sehari sebelum tidur) atau perpanjang interval q36-48h.",
        "status": "Adjust"
      }
    ],
    "clinicalPearls": "Ekskresi ginjal 65-70%. Waktu paruh memanjang hingga > 12 jam pada gagal ginjal terminal. Penyesuaian dosis mencegah depresi SSP dan interval QTc memanjang.",
    "hemodialysisSupplement": "Berikan 20 mg pasca-HD pada hari dialisis."
  },
  {
    "drugName": "Cisplatin",
    "genericName": "Cisplatin Serbuk Injeksi Infus 10 mg, 50 mg",
    "atcCode": "L01XA01",
    "normalDose": "50 - 100 mg/m2 IV per siklus (setiap 3 - 4 minggu) dengan hidrasi salin masif",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar 100% dengan protokol hidrasi salin hiperhidrasi dan manitol/furosemid.",
        "status": "Normal"
      },
      {
        "minCrCl": 46,
        "maxCrCl": 59,
        "recommendation": "Berikan 75% dari dosis lazim. Wajib hidrasi cairan ketat pra dan pasca-infus.",
        "status": "Adjust"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 45,
        "recommendation": "Berikan 50% dari dosis lazim. Pertimbangkan beralih ke Carboplatin (berbasis rumus Calvert).",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK (CrCl < 30 mL/min). Memicu Nekrosis Tubular Akut ireversibel dan anuria total!",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "Toksisitas pembatas dosis utama adalah nefrotoksisitas berat (nekrosis tubulus ginjal proksimal). Hidrasi minimal 2-3 liter NaCl 0.9% sebelum dan sesudah kemoterapi wajib dilakukan. Beralih ke Karboplatin yang dititrasi dengan rumus Calvert AUC.",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien hemodialisis rutin."
  },
  {
    "drugName": "Methotrexate",
    "genericName": "Methotrexate Tablet 2.5 mg / Injeksi 50 mg/2 mL",
    "atcCode": "L01BA01",
    "normalDose": "Artritis Reumatoid: 7.5 - 25 mg oral SEKALI SEMINGGU; Onkologi: dosis tinggi bertahap",
    "rules": [
      {
        "minCrCl": 60,
        "maxCrCl": 999,
        "recommendation": "Dosis standar (Catatan: AR diminum sekali seminggu, bukan setiap hari!).",
        "status": "Normal"
      },
      {
        "minCrCl": 30,
        "maxCrCl": 59,
        "recommendation": "Kurangi dosis sebesar 50% dari dosis lazim. Monitor hitung darah lengkap ketat.",
        "status": "Adjust"
      },
      {
        "minCrCl": 0,
        "maxCrCl": 29,
        "recommendation": "KONTRAINDIKASI MUTLAK (CrCl < 30 mL/min). Ekskresi terhambat memicu pansitopenia aplastik fatal dan mukositis masif.",
        "status": "Contraindicated"
      }
    ],
    "clinicalPearls": "FDA Black Box Warning: Ekskresi ginjal > 80-90% obat utuh melalui filtrasi glomerulus dan sekresi aktif tubulus. Penurunan fungsi ginjal memicu penumpukan metotreksat sistemik berhari-hari yang mematikan sumsum tulang (pansitopenia fatal).",
    "hemodialysisSupplement": "KONTRAINDIKASI MUTLAK pada pasien dialisis."
  }
];
