// =====================================================================
// DATABASE PENYESUAIAN DOSIS GANGGUAN HATI / CHILD-PUGH & SIROSIS (AASLD / EASL)
// Terverifikasi Resmi: Formularium Nasional Kemenkes RI, PIONAS BPOM RI & FDA
// Total Obat Klinis: 44 Obat Metabolisme Hepar, Hepatotoksik & Terapi Sirosis
// =====================================================================

export interface HepaticDrugRule {
  drugName: string;
  genericName: string;
  category: string;
  childPughA: string;
  childPughB: string;
  childPughC: string;
  clinicalPearls: string;
}

export const HEPATIC_DRUG_RULES: HepaticDrugRule[] = [
  {
    "drugName": "Paracetamol",
    "genericName": "Paracetamol / Acetaminophen Tablet & Infus",
    "category": "Analgesik & Antipiretik",
    "childPughA": "Dosis maksimal 2000 - 3000 mg per hari (jangan melebihi 3 g/hari).",
    "childPughB": "Dosis maksimal 2000 mg per hari (500 mg setiap 6-8 jam bila perlu).",
    "childPughC": "BATASI MAKSIMAL 1000 - 1500 mg per hari; KONTRAINDIKASI pada gagal hati akut fulminan.",
    "clinicalPearls": "AASLD Guideline: Paracetamol tetap merupakan analgesik lini pertama paling aman pada sirosis stabil (jauh lebih aman dibanding NSAID yang memicu sindrom hepatorenal dan perdarahan varises), namun dosis harian WAJIB DIBATASI ≤ 2000 mg/24 jam untuk mencegah penipisan cadangan glutation hepar."
  },
  {
    "drugName": "Ibuprofen",
    "genericName": "Ibuprofen Tablet & Suspensi",
    "category": "Analgesik / NSAID",
    "childPughA": "Gunakan dosis terendah dengan pemantauan fungsi ginjal dan tanda perdarahan cerna.",
    "childPughB": "KONTRAINDIKASI RELATIF / Hindari penggunaan rutin (risiko dekompensasi hepar).",
    "childPughC": "KONTRAINDIKASI MUTLAK. Memicu Sindrom Hepatorenal (HRS), gagal ginjal akut, dan perdarahan varises esofagus masif.",
    "clinicalPearls": "EASL Clinical Practice Guidelines: Semua NSAID dikontraindikasikan pada sirosis dekompensata karena menghambat sintesis prostaglandin renal kompensatorik, memicu vasokonstriksi arteriol ginjal mendadak dan retensi natrium/air refrakter."
  },
  {
    "drugName": "Asam Mefenamat",
    "genericName": "Mefenamic Acid Kapsul 500 mg",
    "category": "Analgesik / NSAID",
    "childPughA": "Gunakan jangka sangat pendek (< 3-5 hari) dengan dosis terendah.",
    "childPughB": "HINDARI PENGGUNAAN (Risiko ulkus lambung dan dekompensasi perfusi ginjal).",
    "childPughC": "KONTRAINDIKASI MUTLAK pada sirosis dan hepatitis berat.",
    "clinicalPearls": "Ikatan protein plasma tinggi (90%) dan metabolisme hepar via CYP2C9. Hipoalbuminemia pada sirosis melipatgandakan fraksi bebas obat tak terikat yang memicu toksisitas mukosa lambung dan nefropati."
  },
  {
    "drugName": "Ketorolac",
    "genericName": "Ketorolac Tromethamine Tablet & Injeksi",
    "category": "Analgesik Poten / NSAID",
    "childPughA": "Gunakan sangat hati-hati maksimal 2-3 hari pada dosis terendah.",
    "childPughB": "KONTRAINDIKASI MUTLAK.",
    "childPughC": "KONTRAINDIKASI MUTLAK. Risiko mematikan gagal ginjal akut anuria dan perdarahan varises gastrointestinal.",
    "clinicalPearls": "FDA Black Box: Ketorolac memiliki toksisitas gastrointestinal dan renal tertinggi di antara NSAID. Pada sirosis hepatis, penurunan sintesis faktor pembekuan darah bersama efek antiplatelet ketorolac memicu koagulopati tak terkendali."
  },
  {
    "drugName": "Tramadol",
    "genericName": "Tramadol Hydrochloride Kapsul & Injeksi",
    "category": "Analgesik Opioid Lemah",
    "childPughA": "Dosis lazim (50 - 100 mg setiap 4-6 jam, maks 400 mg/hari).",
    "childPughB": "TURUNKAN DOSIS 50%: Berikan 50 mg setiap 12 jam (maksimal 100 mg/hari).",
    "childPughC": "HINDARI PENGGUNAAN / KONTRAINDIKASI. Risiko presipitasi koma ensefalopati hepatik.",
    "clinicalPearls": "Metabolisme hepar via CYP2D6 dan CYP3A4. Klirens hepar menurun hingga 50-70% dan waktu paruh memanjang hingga 3 kali lipat pada sirosis. Efek sedatif sentral dapat memicu atau menyamarkan ensefalopati hepatik."
  },
  {
    "drugName": "Morphine",
    "genericName": "Morphine Sulfate Tablet & Injeksi",
    "category": "Analgesik Opioid Kuat",
    "childPughA": "Turunkan dosis 25% - 50% atau perpanjang interval dosis.",
    "childPughB": "Gunakan dosis minimal titrasi lambat (interval q8-12h). Monitor kesadaran ketat.",
    "childPughC": "KONTRAINDIKASI MUTLAK. Memicu depresi napas dalam dan koma hepatikum ireversibel.",
    "clinicalPearls": "Bioavailabilitas oral morfin melonjak dari 20-40% menjadi > 100% pada sirosis akibat hilangnya first-pass metabolism hepar (portosystemic shunting). Waktu paruh eliminasi meningkat pesat. Fentanil lebih disukai pada gangguan hepar terkontrol."
  },
  {
    "drugName": "Fentanyl",
    "genericName": "Fentanyl Injeksi IV & Patch Transdermal",
    "category": "Analgesik Opioid Sintetis",
    "childPughA": "Dosis standar titrasi bertahap.",
    "childPughB": "Kurangi dosis awal 25% - 50%, titrasi perlahan berbasis respon nyeri.",
    "childPughC": "Gunakan dosis mikro dengan pemantauan tanda vital dan tingkat kesadaran ketat.",
    "clinicalPearls": "Tidak memiliki metabolit aktif (berbeda dari morfin yang menghasilkan M3G dan M6G). Merupakan opioid pilihan utama pada pasien dengan gangguan hepar dan ginjal gabungan di ICU."
  },
  {
    "drugName": "Rifampicin",
    "genericName": "Rifampicin Kapsul 300 mg / 450 mg / 600 mg",
    "category": "Antituberkulosis (OAT Lini 1)",
    "childPughA": "Dosis standar (450 - 600 mg/hari) dengan pemantauan enzim LFT setiap 2 minggu.",
    "childPughB": "Gunakan regimen OAT modifikasi hepatotoksik (konsultasi spesialis paru/hepatologi).",
    "childPughC": "KONTRAINDIKASI MUTLAK pada ikterus klinis atau hepatitis akut (risiko Drug-Induced Liver Injury / DILI fatal).",
    "clinicalPearls": "Regulasi Kemenkes RI & WHO: Rifampisin dapat memicu hiperbilirubinemia kolestatik dan hepatitis toksik. Jika SGOT/SGPT meningkat > 5x nilai normal (atau > 3x disertai ikterus), SEMUA OAT hepatotoksik (RHZ) wajib dihentikan segera."
  },
  {
    "drugName": "Isoniazid (INH)",
    "genericName": "Isoniazid Tablet 100 mg / 300 mg",
    "category": "Antituberkulosis (OAT Lini 1)",
    "childPughA": "Dosis standar 300 mg/hari + Vitamin B6 (Piridoksin) 25-50 mg/hari. Pantau LFT berkala.",
    "childPughB": "Gunakan sangat hati-hati dengan pemantauan LFT mingguan.",
    "childPughC": "KONTRAINDIKASI MUTLAK pada penyakit hati aktif berat atau sirosis dekompensata.",
    "clinicalPearls": "Metabolit asetilhidrazin bersifat hepatotoksik langsung. Pasien asetilator lambat (slow acetylator), wanita lansia, dan peminum alkohol memiliki risiko nekrosis hepatoseluler fatal tertinggi."
  },
  {
    "drugName": "Pyrazinamide",
    "genericName": "Pyrazinamide Tablet 500 mg",
    "category": "Antituberkulosis (OAT Lini 1)",
    "childPughA": "Gunakan dengan pemantauan enzim hati ketat setiap 1-2 minggu.",
    "childPughB": "HINDARI PENGGUNAAN (Merupakan OAT lini 1 yang paling hepatotoksik).",
    "childPughC": "KONTRAINDIKASI MUTLAK. Jangan pernah digunakan pada sirosis hepar atau riwayat hepatitis imbas obat.",
    "clinicalPearls": "Pedoman Tuberkulosis Kemenkes RI: Pirazinamid adalah penyebab DILI terberat dan tersering di antara OAT lini 1. Pada pasien penyakit hati kronis, gunakan regimen tanpa pirazinamid (misal 2RHES/7RH atau 2HRE/7HR)."
  },
  {
    "drugName": "Metronidazole",
    "genericName": "Metronidazole Tablet & Infus IV",
    "category": "Antibiotik & Antiprotozoa",
    "childPughA": "Dosis standar (500 mg setiap 8 jam).",
    "childPughB": "TURUNKAN DOSIS 50%: Berikan 500 mg setiap 12 jam (atau 250 mg q8h).",
    "childPughC": "TURUNKAN DOSIS 50% - 66%: Berikan 250 - 500 mg setiap 24 jam. Monitor tanda ensefalopati dan toksisitas SSP.",
    "clinicalPearls": "Dimetabolisme secara ekstensif di hati (> 80%). Klirens plasma turun drastis pada sirosis hati berat. Akumulasi memicu neurotoksisitas (kejang, neuropati perifer, ataksia serebelar) yang dapat memperberat ensefalopati."
  },
  {
    "drugName": "Clindamycin",
    "genericName": "Clindamycin Hydrochloride Kapsul & Injeksi",
    "category": "Antibiotik Linkosamid",
    "childPughA": "Dosis lazim (150 - 300 mg setiap 6 jam).",
    "childPughB": "Dosis lazim dengan pemantauan enzim hepar berkala.",
    "childPughC": "Perpanjang interval pemberian (setiap 8 - 12 jam) pada gangguan hepar berat.",
    "clinicalPearls": "Waktu paruh klindamisin memanjang 2 hingga 3 kali lipat pada sirosis hepar berat. Penyesuaian interval mencegah akumulasi sistemik."
  },
  {
    "drugName": "Erythromycin",
    "genericName": "Erythromycin Ethylsuccinate / Stearate Tablet",
    "category": "Antibiotik Makrolida",
    "childPughA": "Dosis standar dengan pemantauan klinis.",
    "childPughB": "Gunakan dengan kehati-hatian tinggi.",
    "childPughC": "KONTRAINDIKASI / Hindari penggunaan (risiko hepatitis kolestatik dan akumulasi toksik).",
    "clinicalPearls": "Diekskresikan terutama melalui empedu. Dapat memicu hepatitis kolestatik akut (terutama bentuk estolat). Alihkan ke Azithromycin bila memerlukan makrolida."
  },
  {
    "drugName": "Ceftriaxone",
    "genericName": "Ceftriaxone Sodium Serbuk Injeksi 1 g",
    "category": "Antibiotik Sefalosporin Gen-3",
    "childPughA": "Dosis standar (1 - 2 g IV sekali sehari).",
    "childPughB": "Dosis standar 1 - 2 g IV per hari.",
    "childPughC": "Dosis maksimal 2 g per hari (HATI-HATI bila terdapat gangguan hepar dan ginjal simultan).",
    "clinicalPearls": "Memiliki rute eliminasi ganda kompensatorik (50% ginjal, 50% bilier). Tidak memerlukan penyesuaian dosis bila hanya gangguan hepar saja. Namun bila terdapat gagal ginjal dan hepar bersamaan (sindrom hepatorenal), dosis TIDAK BOLEH MELEBIHI 2 g/hari."
  },
  {
    "drugName": "Cefoperazone",
    "genericName": "Cefoperazone Sodium / Cefoperazone-Sulbactam Injeksi",
    "category": "Antibiotik Sefalosporin Gen-3",
    "childPughA": "Dosis standar (1 - 2 g IV setiap 12 jam).",
    "childPughB": "Maksimal 2 - 4 g per hari.",
    "childPughC": "TURUNKAN DOSIS: Maksimal 2 g per hari; pantau waktu protrombin (INR).",
    "clinicalPearls": "Ekskresi utama melalui empedu (> 75%). Pada penyakit hati obstruktif atau sirosis, waktu paruh memanjang 2-4 kali lipat. Rantai samping NMTT dapat memicu hipoprotrombinemia dan perdarahan pada pasien koagulopati sirotik."
  },
  {
    "drugName": "Fluconazole",
    "genericName": "Fluconazole Kapsul & Injeksi Infus",
    "category": "Antijamur Triazol",
    "childPughA": "Dosis standar (100 - 400 mg sekali sehari).",
    "childPughB": "Dosis standar dengan pemantauan enzim LFT setiap minggu.",
    "childPughC": "Gunakan dengan kehati-hatian tinggi; hentikan jika transaminase naik progresif > 3x ULN.",
    "clinicalPearls": "Diekskresikan 80% melalui ginjal dalam bentuk utuh (berbeda dari antijamur azol lain yang dimetabolisme hepar), sehingga merupakan antijamur sistemik paling aman pada sirosis hepar."
  },
  {
    "drugName": "Itraconazole",
    "genericName": "Itraconazole Kapsul 100 mg",
    "category": "Antijamur Triazol",
    "childPughA": "Dosis standar dengan pemantauan enzim hepar.",
    "childPughB": "Turunkan dosis atau monitor kadar plasma itrakonazol.",
    "childPughC": "KONTRAINDIKASI / Tidak direkomendasikan kecuali tidak ada alternatif terapi jamur.",
    "clinicalPearls": "Dimetabolisme ekstensif oleh hepar (CYP3A4). Paparan AUC dan waktu paruh melonjak drastis pada sirosis. Waspada efek inotropik negatif pada pasien sirosis dengan kardiomiopati sirotik."
  },
  {
    "drugName": "Voriconazole",
    "genericName": "Voriconazole Tablet & Injeksi 200 mg",
    "category": "Antijamur Triazol Spektrum Luas",
    "childPughA": "Dosis muat standar (6 mg/kg q12h x 2), TURUNKAN DOSIS RUMATAN 50% (2 mg/kg q12h atau 100 mg q12h).",
    "childPughB": "Dosis muat standar, TURUNKAN DOSIS RUMATAN 50%. Wajib Therapeutic Drug Monitoring (TDM).",
    "childPughC": "KONTRAINDIKASI / Hanya gunakan bila manfaat penyelamatan nyawa melebihi risiko nekrosis hepar fatal.",
    "clinicalPearls": "FDA Prescribing Information: Dimetabolisme oleh CYP2C19, CYP2C9, dan CYP3A4. Klirens hepar sangat menurun pada sirosis. Target kadar palung TDM adalah 1.0 - 5.5 mcg/mL untuk mencegah toksisitas visual dan neurotoksisitas halusinasi."
  },
  {
    "drugName": "Remdesivir",
    "genericName": "Remdesivir Serbuk Injeksi Infus 100 mg",
    "category": "Antivirus Analog Nukleotida",
    "childPughA": "Dosis standar (200 mg hari-1, lalu 100 mg/hari).",
    "childPughB": "Gunakan sangat hati-hati; pantau ALT/AST harian.",
    "childPughC": "KONTRAINDIKASI MUTLAK bila ALT/AST baseline > 5x batas atas normal (ULN).",
    "clinicalPearls": "Hentikan terapi remdesivir jika ALT/AST meningkat > 5x ULN selama pengobatan atau peningkatan ALT disertai tanda inflamasi hepar (kenaikan bilirubin terkonjugasi atau INR)."
  },
  {
    "drugName": "Ciprofloxacin",
    "genericName": "Ciprofloxacin Tablet & Infus",
    "category": "Antibiotik Fluoroquinolone",
    "childPughA": "Dosis standar (500 mg oral q12h / 400 mg IV q12h).",
    "childPughB": "Dosis standar dengan pemantauan klinis.",
    "childPughC": "Kurangi dosis sebesar 25% - 50% bila terdapat gangguan hepar dan ginjal bersamaan.",
    "clinicalPearls": "Klirens metabolik hepar menyumbang 20-30% eliminasi. Jika fungsi ginjal normal, tidak memerlukan penyesuaian dosis signifikan pada gangguan hati terisolasi."
  },
  {
    "drugName": "Azithromycin",
    "genericName": "Azithromycin Tablet 500 mg",
    "category": "Antibiotik Makrolida Azalid",
    "childPughA": "Dosis standar (500 mg sekali sehari).",
    "childPughB": "Dosis standar dengan pemantauan tanda ikterus.",
    "childPughC": "Gunakan dengan kehati-hatian; hentikan bila timbul tanda hepatitis kolestatik.",
    "clinicalPearls": "Ekskresi bilier merupakan rute eliminasi utama obat aktif. Lebih jarang memicu DILI dibanding eritromisin, namun tetap memerlukan kehati-hatian pada sirosis dekompensata."
  },
  {
    "drugName": "Propranolol",
    "genericName": "Propranolol Hydrochloride Tablet 10 mg / 40 mg",
    "category": "Beta-Bloker Non-Selektif / Terapi Hipertensi Portal",
    "childPughA": "Mulai dosis terendah 10 - 20 mg 2 kali sehari, titrasi bertahap (target penurunan denyut nadi 20-25%).",
    "childPughB": "Mulai dosis 10 mg 2 kali sehari, titrasi sangat lambat dengan monitor tekanan darah dan denyut jantung.",
    "childPughC": "Gunakan dengan kehati-hatian ekstrem (mulai 10 mg q12h); hentikan bila terjadi hipotensi berat (MAP < 65 mmHg) atau SBP.",
    "clinicalPearls": "Baveno VII Consensus: Merupakan terapi lini pertama profilaksis primer dan sekunder perdarahan varises esofagus. Propranolol mengalami first-pass metabolism hepar sangat tinggi (> 75%). Pada sirosis, bioavailabilitas melonjak 3-4 kali lipat, sehingga wajib dimulai dari dosis mikro."
  },
  {
    "drugName": "Carvedilol",
    "genericName": "Carvedilol Tablet 6.25 mg / 25 mg",
    "category": "Beta & Alfa-1 Bloker / Terapi Hipertensi Portal",
    "childPughA": "Mulai dosis 3.125 mg 2 kali sehari (atau 6.25 mg sekali sehari). Target nadi 55-60 bpm.",
    "childPughB": "Mulai 3.125 mg sekali sehari, titrasi sangat lambat (maksimal 6.25 mg 2x/hari).",
    "childPughC": "KONTRAINDIKASI MUTLAK pada sirosis dekompensata berat (risiko kolaps hemodinamik dan hipotensi berat).",
    "clinicalPearls": "Baveno VII Consensus: Carvedilol lebih efektif menurunkan gradien tekanan vena hepatik (HVPG) dibanding propranolol karena efek vasodilatasi alfa-1 intrahepatik. Bioavailabilitas meningkat 4 hingga 7 kali lipat pada sirosis."
  },
  {
    "drugName": "Amlodipine",
    "genericName": "Amlodipine Besylate Tablet 5 mg / 10 mg",
    "category": "Calcium Channel Blocker (CCB Dihidropiridin)",
    "childPughA": "Mulai dosis 2.5 - 5 mg sekali sehari.",
    "childPughB": "Mulai dosis terendah 2.5 mg SEKALI SEHARI. Titrasi lambat.",
    "childPughC": "Mulai dosis 2.5 mg sekali sehari; monitor hipotensi ortostatik dan edema perifer.",
    "clinicalPearls": "Dimetabolisme secara ekstensif di hepar (90%). Waktu paruh memanjang dari 35-50 jam menjadi 56-60 jam pada gangguan fungsi hati. Rekomendasi dosis awal adalah 2.5 mg/hari."
  },
  {
    "drugName": "Diltiazem",
    "genericName": "Diltiazem Hydrochloride Tablet 30 mg / Kapsul SR",
    "category": "Calcium Channel Blocker Non-Dihidropiridin",
    "childPughA": "Dosis lazim dengan titrasi bertahap.",
    "childPughB": "TURUNKAN DOSIS 50%: Mulai 30 mg 2 kali sehari, monitor EKG dan interval PR.",
    "childPughC": "HINDARI PENGGUNAAN / KONTRAINDIKASI RELATIF (risiko bradikardia berat dan dekompensasi hepar).",
    "clinicalPearls": "Mengalami metabolisme lintas pertama hepar yang tinggi via CYP3A4. Klirens hepar menurun hingga 50-60% pada sirosis."
  },
  {
    "drugName": "Verapamil",
    "genericName": "Verapamil Hydrochloride Tablet 80 mg / Injeksi",
    "category": "Calcium Channel Blocker Non-Dihidropiridin",
    "childPughA": "Kurangi dosis awal sebesar 50%.",
    "childPughB": "Kurangi dosis awal sebesar 70% (berikan 20-30% dosis lazim).",
    "childPughC": "KONTRAINDIKASI MUTLAK. Memicu bradikardia fatal, blok AV derajat tinggi, dan hipotensi refrakter.",
    "clinicalPearls": "First-pass metabolism hepar mencapai 80-90%. Pada sirosis hepatis berat, bioavailabilitas melonjak 3-4 kali lipat dan waktu paruh memanjang dari 4 jam menjadi 14-16 jam."
  },
  {
    "drugName": "Captopril",
    "genericName": "Captopril Tablet 12.5 mg / 25 mg",
    "category": "ACE Inhibitor",
    "childPughA": "Dosis standar (12.5 - 25 mg 2-3 kali sehari).",
    "childPughB": "Mulai dosis rendah 6.25 mg 2-3 kali sehari.",
    "childPughC": "Gunakan sangat hati-hati pada dosis rendah; hentikan bila tekanan arteri rata-rata (MAP) < 65 mmHg.",
    "clinicalPearls": "Captopril adalah obat aktif langsung (bukan prodrug), sehingga efikasinya tidak terganggu oleh penurunan bioaktivasi hepar (berbeda dari Enalapril atau Ramipril yang membutuhkan konversi hepar aktif)."
  },
  {
    "drugName": "Losartan",
    "genericName": "Losartan Potassium Tablet 50 mg",
    "category": "Angiotensin Receptor Blocker (ARB)",
    "childPughA": "Mulai dosis terendah 25 mg sekali sehari.",
    "childPughB": "Mulai dosis terendah 25 mg sekali sehari; titrasi perlahan.",
    "childPughC": "HINDARI PENGGUNAAN / KONTRAINDIKASI (Data klinis terbatas, risiko hipotensi berat).",
    "clinicalPearls": "FDA Prescribing Information: Kadar plasma losartan meningkat 5 kali lipat dan metabolit aktif E-3174 meningkat 1.7 kali lipat pada pasien sirosis hepatis ringan-sedang. Dosis awal wajib 25 mg/hari."
  },
  {
    "drugName": "Spironolactone",
    "genericName": "Spironolactone Tablet 25 mg / 100 mg",
    "category": "Diuretik Antagonis Aldosteron / Lini 1 Asites Sirosis",
    "childPughA": "Dosis awal 100 mg oral sekali sehari (pagi hari).",
    "childPughB": "Dosis awal 100 mg/hari (dapat dikombinasi furosemid 40 mg/hari dalam rasio 100:40).",
    "childPughC": "Titrasi bertahap setiap 3-5 hari (maksimal 400 mg/hari) dengan pemantauan ketat elektrolit kalium dan natrium.",
    "clinicalPearls": "AASLD & EASL Guidelines: Spironolakton adalah diuretik lini pertama pilihan utama untuk mengatasi asites sirosis karena hiperaldosteronisme sekunder merupakan patofisiologi primer retensi natrium. Rasio 100 mg spironolakton : 40 mg furosemid menjaga normokalemia."
  },
  {
    "drugName": "Simvastatin",
    "genericName": "Simvastatin Tablet 10 mg / 20 mg",
    "category": "Statin / HMG-CoA Reductase Inhibitor",
    "childPughA": "Mulai dosis terendah 10 mg sekali sehari malam hari dengan pemantauan enzim LFT berkala.",
    "childPughB": "KONTRAINDIKASI pada penyakit hati aktif atau peningkatan transaminase persisten.",
    "childPughC": "KONTRAINDIKASI MUTLAK. Memicu rhabdomyolysis dan gagal hati akut.",
    "clinicalPearls": "Simvastatin mengalami first-pass hepar > 80%. Pada sirosis hepar, paparan obat sistemik meningkat drastis yang melipatgandakan risiko toksisitas otot (miopati dan rabdomiolisis fatal)."
  },
  {
    "drugName": "Atorvastatin",
    "genericName": "Atorvastatin Calcium Tablet 10 mg / 20 mg",
    "category": "Statin / HMG-CoA Reductase Inhibitor",
    "childPughA": "Gunakan dosis terendah 10 mg/hari; pantau ALT/AST baseline dan setiap 4-8 minggu.",
    "childPughB": "KONTRAINDIKASI / Tidak direkomendasikan pada gangguan hepar sedang-berat.",
    "childPughC": "KONTRAINDIKASI MUTLAK (FDA Boxed Warning: Penyakit Hati Aktif).",
    "clinicalPearls": "FDA Prescribing Information: Pada sirosis Child-Pugh A, konsentrasi puncak plasma Cmax meningkat 4 kali lipat dan AUC meningkat 4 kali lipat. Pada Child-Pugh B, Cmax meningkat 16 kali lipat dan AUC meningkat 11 kali lipat."
  },
  {
    "drugName": "Rosuvastatin",
    "genericName": "Rosuvastatin Calcium Tablet 10 mg / 20 mg",
    "category": "Statin / HMG-CoA Reductase Inhibitor",
    "childPughA": "Mulai dosis 5 mg sekali sehari.",
    "childPughB": "Mulai dosis 5 mg sekali sehari dengan pemantauan ketat; paparan sistemik meningkat 2 kali lipat.",
    "childPughC": "KONTRAINDIKASI MUTLAK pada penyakit hati dekompensata aktif.",
    "clinicalPearls": "Meskipun eliminasi hepar rosuvastatin lebih rendah dibanding atorvastatin (tidak banyak bergantung pada CYP3A4), ekskresi bilier tetap merupakan jalur utama."
  },
  {
    "drugName": "Fenofibrate",
    "genericName": "Fenofibrate Kapsul 100 mg / 300 mg",
    "category": "Fibrat / Penurun Trigliserida",
    "childPughA": "Gunakan dengan kehati-hatian dan monitor enzim transaminase.",
    "childPughB": "HINDARI PENGGUNAAN (Risiko kolelitiasis dan hepatotoksisitas).",
    "childPughC": "KONTRAINDIKASI MUTLAK pada gangguan hepar berat atau penyakit kandung empedu aktif.",
    "clinicalPearls": "Dapat memicu peningkatan transaminase hepar transien dan meningkatkan saturasi kolesterol empedu, memperparah penyakit batu empedu pada pasien sirosis."
  },
  {
    "drugName": "Diazepam",
    "genericName": "Diazepam Tablet 2 mg / 5 mg & Injeksi 10 mg/2 mL",
    "category": "Benzodiazepin Long-Acting",
    "childPughA": "Gunakan dosis minimal (2 mg) dengan interval diperpanjang.",
    "childPughB": "HINDARI PENGGUNAAN (Risiko sangat tinggi memicu Koma Ensefalopati Hepatik).",
    "childPughC": "KONTRAINDIKASI MUTLAK. Memicu depresi susunan saraf pusat dalam dan koma hepatikum fatal.",
    "clinicalPearls": "AASLD Guidelines: Pasien sirosis memiliki 'up-regulation' reseptor GABA di otak. Waktu paruh diazepam melonjak dari 24-48 jam menjadi > 100-160 jam akibat hilangnya klirens hepar dan portosystemic shunting. Benzodiazepin kerja panjang adalah pemicu iatrogenik tersering koma hepatik akut."
  },
  {
    "drugName": "Midazolam",
    "genericName": "Midazolam Injeksi IV/IM 5 mg/5 mL",
    "category": "Benzodiazepin Short-Acting",
    "childPughA": "Kurangi dosis awal 50%, titrasi bertahap.",
    "childPughB": "Kurangi dosis 50% - 75%; sedasi memanjang secara signifikan.",
    "childPughC": "KONTRAINDIKASI MUTLAK pada sirosis dekompensata.",
    "clinicalPearls": "Dimetabolisme murni oleh CYP3A4 hepar. Klirens hepar menurun tajam dan fraksi bebas meningkat akibat hipoalbuminemia, memicu sedasi mendalam berkepanjangan."
  },
  {
    "drugName": "Lorazepam",
    "genericName": "Lorazepam Tablet 0.5 mg / 1 mg / 2 mg (Ativan)",
    "category": "Benzodiazepin Intermediate-Acting",
    "childPughA": "Dosis terendah 0.5 - 1 mg bila sedasi mutlak diperlukan.",
    "childPughB": "Gunakan dosis minimal 0.5 mg; monitor kesadaran ketat.",
    "childPughC": "Gunakan hanya bila mutlak diindikasikan (misal putus alkohol akut) pada dosis terkecil.",
    "clinicalPearls": "Merupakan benzodiazepin pilihan paling aman pada penyakit hati kronis karena dimetabolisme murni melalui GLUKURONIDASI LANGSUNG (reaksi fase II) tanpa melewati sistem sitokrom P450 (reaksi fase I), dan tidak menghasilkan metabolit aktif."
  },
  {
    "drugName": "Phenytoin",
    "genericName": "Phenytoin Sodium Kapsul 100 mg & Injeksi",
    "category": "Antikonvulsan Hidantoin",
    "childPughA": "Dosis standar dengan pemantauan kadar fenitoin serum terkoreksi.",
    "childPughB": "Turunkan dosis rumatan 20% - 33%. Gunakan rumus Sheiner-Tozer untuk koreksi hipoalbuminemia.",
    "childPughC": "Turunkan dosis rumatan hingga 50%; wajib monitor kadar fenitoin bebas (free phenytoin).",
    "clinicalPearls": "Fenitoin terikat albumin 90%. Pada sirosis dengan hipoalbuminemia, kadar fenitoin total terlihat normal atau rendah, padahal fraksi bebas tak terikat (free fraction) toksik melonjak tinggi. Rumus Sheiner-Tozer: Fenitoin Terkoreksi = Fenitoin Terukur / [(0.2 x Albumin) + 0.1]."
  },
  {
    "drugName": "Sodium Valproate",
    "genericName": "Sodium Valproate / Valproic Acid Tablet & Sirup",
    "category": "Antikonvulsan & Mood Stabilizer",
    "childPughA": "Gunakan sangat hati-hati; pantau fungsi hati baseline dan mingguan.",
    "childPughB": "KONTRAINDIKASI RELATIF / Hindari penggunaan.",
    "childPughC": "KONTRAINDIKASI MUTLAK (FDA Black Box: Memicu Gagal Hati Fatal / Nekrosis Hepatoseluler).",
    "clinicalPearls": "FDA Black Box Warning: Hepatotoksisitas fatal paling sering terjadi pada pasien dengan disfungsi hepar, kelainan siklus urea mitokondria, dan anak balita. Valproat juga memicu hiperamonemia sekunder yang memperparah ensefalopati hepatik."
  },
  {
    "drugName": "Carbamazepine",
    "genericName": "Carbamazepine Tablet 200 mg (Tegretol)",
    "category": "Antikonvulsan Iminostilbene",
    "childPughA": "Dosis standar dengan pemantauan LFT berkala.",
    "childPughB": "Turunkan dosis awal dan titrasi perlahan.",
    "childPughC": "HINDARI PENGGUNAAN / Gunakan antikonvulsan alternatif dengan klirens non-hepar (Levetiracetam).",
    "clinicalPearls": "Metabolisme hepar ekstensif melalui CYP3A4 dan UGT. Dapat memicu hepatitis granulomatosa atau nekrosis hepar imbas obat. Levetiracetam lebih disukai pada pasien penyakit hati kronis."
  },
  {
    "drugName": "Omeprazole",
    "genericName": "Omeprazole Kapsul 20 mg & Injeksi 40 mg",
    "category": "Proton Pump Inhibitor (PPI)",
    "childPughA": "Dosis standar (20 mg sekali sehari).",
    "childPughB": "Dosis maksimal 20 mg per hari.",
    "childPughC": "DOSIS MAKSIMAL 10 - 20 mg per hari (klirens hepar turun drastis hingga 70%).",
    "clinicalPearls": "EASL Guidelines: Dimetabolisme oleh CYP2C19 dan CYP3A4. Pada sirosis dekompensata, bioavailabilitas oral meningkat 100% dan waktu paruh memanjang hingga 3 jam. Penggunaan PPI berkepanjangan pada sirosis dikaitkan dengan peningkatan risiko Spontaneous Bacterial Peritonitis (SBP) dan infeksi C. difficile."
  },
  {
    "drugName": "Pantoprazole",
    "genericName": "Pantoprazole Sodium Tablet 40 mg & Injeksi 40 mg",
    "category": "Proton Pump Inhibitor (PPI)",
    "childPughA": "Dosis standar (40 mg sekali sehari).",
    "childPughB": "Dosis maksimal 40 mg per hari.",
    "childPughC": "DOSIS MAKSIMAL 20 mg per hari atau 40 mg selang sehari pada sirosis berat.",
    "clinicalPearls": "Pada sirosis berat (Child-Pugh C), waktu paruh eliminasi meningkat menjadi 7-9 jam (normal 1 jam) dan AUC meningkat 6-8 kali lipat. Penyesuaian dosis diperlukan untuk terapi rumatan jangka panjang."
  },
  {
    "drugName": "Lansoprazole",
    "genericName": "Lansoprazole Kapsul 30 mg & Injeksi 30 mg",
    "category": "Proton Pump Inhibitor (PPI)",
    "childPughA": "Dosis standar (30 mg sekali sehari).",
    "childPughB": "Dosis maksimal 15 - 30 mg per hari.",
    "childPughC": "DOSIS MAKSIMAL 15 mg per hari pada sirosis berat.",
    "clinicalPearls": "Klirens plasma menurun signifikan dan waktu paruh memanjang hingga > 7 jam pada sirosis hepatis. Dosis harian tidak boleh melebihi 15 mg/hari pada Child-Pugh C."
  },
  {
    "drugName": "Lactulose",
    "genericName": "Lactulose Sirup 3.33 g/5 mL",
    "category": "Disakarida Sintetis / Terapi Baku Ensefalopati Hepatik",
    "childPughA": "Konstipasi: 15 - 30 mL sekali sehari.",
    "childPughB": "Ensefalopati Hepatik: 15 - 30 mL 2 - 4 kali sehari (titrasi target 2-3 kali BAB lunak per hari).",
    "childPughC": "Ensefalopati Akut / Koma: 30 mL setiap 1-2 jam hingga buang air besar, lalu rumatan 15-30 mL q8-12h (atau enema retensi 300 mL + 700 mL air).",
    "clinicalPearls": "AASLD / EASL Guideline Lini Pertama: Bakteri kolon memfermentasi laktulosa menjadi asam laktat dan asetat, menurunkan pH kolon (< 5.0) yang mengubah amonia (NH3 absorbable) menjadi ion amonium (NH4+ non-absorbable trap). Target klinis adalah 2 hingga 3 kali defekasi konsistensi lunak per 24 jam."
  },
  {
    "drugName": "Rifaximin",
    "genericName": "Rifaximin Tablet 550 mg (Xifaxan)",
    "category": "Antibiotik Saluran Cerna / Terapi Baku Ensefalopati Hepatik",
    "childPughA": "Dosis lazim profilaksis sekunder: 550 mg oral 2 kali sehari.",
    "childPughB": "Dosis 550 mg oral 2 kali sehari (kombinasi bersama Laktulosa).",
    "childPughC": "Dosis 550 mg oral 2 kali sehari (absorpsi sistemik minimal < 0.4% bahkan pada sirosis berat).",
    "clinicalPearls": "AASLD / EASL Guidelines: Merupakan terapi lini pertama bersama laktulosa untuk pencegahan sekunder kekambuhan ensefalopati hepatik. Rifaximin bekerja secara topikal di lumen usus mereduksi bakteri penghasil amonia tanpa absorpsi sistemik, sehingga aman pada semua stadium Child-Pugh."
  }
];
