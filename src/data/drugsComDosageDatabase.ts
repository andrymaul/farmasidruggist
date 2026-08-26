import { Drug } from '../types';

/**
 * Drugs.com Comprehensive Dosage & Administration Monograph Database
 * Sourced directly from www.drugs.com dosage guidelines and FDA Package Inserts.
 */

export interface DrugDosageMonograph {
  adultDosage: string;
  pediatricDosage?: string;
  geriatricDosage?: string;
  renalDoseAdjustment?: string;
  hepaticDoseAdjustment?: string;
  maxDoseLimit?: string;
  administrationGuideline?: string;
}

export const DRUGSCOM_DOSAGE_MAP: Record<string, DrugDosageMonograph> = {
  // === KARDIOVASKULAR & ANTITROMBOTIK ===
  'warfarin': {
    adultDosage: `• Profilaksis & Terapi Tromboemboli Vena (DVT / Emboli Paru), Fibrilasi Atrium, & Katup Prostetik:\n  - Dosis Awal: 2 - 5 mg per oral sekali sehari pada malam hari selama 1-2 hari pertama (atau 5-10 mg pada pasien muda/sehat tanpa komorbiditas).\n  - Dosis Pemeliharaan: 2 - 10 mg per oral sekali sehari, dititrasi ketat berdasarkan pemantauan International Normalized Ratio (INR).\n  - Target INR: 2.0 - 3.0 (untuk DVT, PE, AF, katup jaringan bioprostetik); Target INR 2.5 - 3.5 (untuk katup mekanik prostetik mitral).`,
    pediatricDosage: `• Bayi & Anak: Awal 0.1 - 0.2 mg/kgBB/hari per oral (Maks 5 mg). Dosis pemeliharaan disesuaikan dengan INR target (0.05 - 0.34 mg/kgBB/hari). Bayi membutuhkan dosis per kgBB lebih tinggi karena metabolisme cepat.`,
    geriatricDosage: `• Pasien Usia Lanjut (>=65 tahun) / Frail / Malnutrisi: Dosis awal lebih rendah: 1.5 - 2.5 mg per oral sekali sehari untuk mencegah lonjakan INR tak terduga.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis spesifik pada gangguan ginjal ringan hingga berat, namun pantau INR lebih sering karena risiko perdarahan uremik.`,
    hepaticDoseAdjustment: `• Gunakan dosis awal lebih rendah pada gangguan hepar karena penurunan sintesis faktor pembekuan darah endogen dan perlambatan metabolisme warfarin.`,
    maxDoseLimit: `• Dosis bersifat individual sesuai respons target INR pasien.`,
    administrationGuideline: `• Minum pada waktu/jam yang sama setiap hari (disarankan malam hari pukul 18.00-20.00). Dapat diminum dengan atau tanpa makanan. Pertahankan konsistensi asupan sayuran hijau bervitamin K.`
  },

  'aspirin': {
    adultDosage: `• Pencegahan Sekunder Kardiovaskular & Serebrovaskular (CAD, Pasca-PCI, Stroke Iskemik/TIA, Angina Pektoris Stabil):\n  - 75 - 100 mg per oral sekali sehari (rekomendasi standar: 81 - 100 mg/hari).\n• Sindrom Koroner Akut (SKA / STEMI / NSTEMI):\n  - Dosis Muatan (Loading): 160 - 325 mg per oral (tablet non-enteric coated HARUS DIKUNYAH SEGERA saat serangan akut).\n  - Dosis Pemeliharaan: 75 - 100 mg per oral sekali sehari tanpa batas waktu.\n• Analgesik / Antipiretik:\n  - 325 - 650 mg per oral setiap 4 - 6 jam sesuai kebutuhan.\n• Artritis Reumatoid / Osteoarthritis:\n  - 3.0 - 4.5 gram/hari per oral dibagi dalam beberapa dosis terbagi.`,
    pediatricDosage: `• KONTRAINDIKASI pada anak & remaja (<19 tahun) dengan demam/infeksi virus (cacar air/flu) karena risiko fatal Sindrom Reye.\n• Penyakit Kawasaki:\n  - Fase Akut Demam: 80 - 100 mg/kgBB/hari per oral dibagi 4 dosis bersama IVIG.\n  - Fase Konvalesen (setelah demam turun 48 jam): 3 - 5 mg/kgBB/hari dosis tunggal selama 6-8 minggu.`,
    geriatricDosage: `• Gunakan dosis efektif terendah (75-81 mg/hari) untuk profilaksis kardiovaskular. Pertimbangkan penambahan Gastroprotektor PPI pada lansia.`,
    renalDoseAdjustment: `• CrCl 10 - 50 mL/min: Berikan dosis biasa tiap 6 - 8 jam;\n• CrCl <10 mL/min: HINDARI penggunaan (risiko penurunan fungsi ginjal akut dan retensi cairan).`,
    hepaticDoseAdjustment: `• Hindari penggunaan pada penyakit hati berat dengan gangguan koagulasi.`,
    maxDoseLimit: `• Antiplatelet: 100 - 325 mg/hari;\n• Analgesik/Antipiretik: Maksimal 4000 mg (4 gram) dalam 24 jam.`,
    administrationGuideline: `• Minum bersama makanan atau segelas penuh air putih untuk mengurangi iritasi lambung. Jangan berbaring selama 15-30 menit setelah minum obat. Telan utuh sediaan enteric-coated.`
  },

  'clopidogrel': {
    adultDosage: `• Sindrom Koroner Akut (NSTEMI / UAP / STEMI) & Pasca PCI Stenting Koroner:\n  - Dosis Muatan (Loading Dose): 300 - 600 mg per oral dosis tunggal (600 mg dianjurkan sebelum tindakan PCI primer).\n  - Dosis Pemeliharaan: 75 mg per oral sekali sehari dikombinasikan dengan Aspirin 75-100 mg/hari (DAPT) selama 12 bulan.\n• Stroke Iskemik Terbaru, Penyakit Arteri Perifer (PAD), atau Riwayat Infark Miokard:\n  - 75 mg per oral sekali sehari.\n• Stroke Iskemik Akut Minor (NIHSS <=3) / TIA Risiko Tinggi (ABCD2 >=4):\n  - Loading 300 mg pada hari ke-1, dilanjutkan 75 mg/hari kombinasi Aspirin selama 21 hari pertama.`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada populasi pediatrik (<18 tahun).`,
    geriatricDosage: `• Dosis sama dengan dewasa (75 mg/hari). Tidak diperlukan loading dose pada pasien usia >=75 tahun dengan STEMI yang menerima fibrinolitik.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada pasien gangguan ginjal ringan hingga berat.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan hepar ringan-sedang. Pengalaman terbatas pada gangguan hepar berat (waspada diatesis perdarahan).`,
    maxDoseLimit: `• Dosis pemeliharaan: 75 mg/hari (Loading maksimal: 600 mg).`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan pada jam yang sama setiap hari. Hindari konsumsi bersamaan dengan Omeprazole atau Esomeprazole (gunakan Pantoprazole bila perlu PPI).`
  },

  'apixaban': {
    adultDosage: `• Fibrilasi Atrium Non-Valvular (Pencegahan Stroke & Emboli Sistemik):\n  - 5 mg per oral dua kali sehari (BID / tiap 12 jam).\n  - Kriteria Reduksi Dosis (2.5 mg BID): Turunkan dosis ke 2.5 mg BID jika pasien memenuhi minimal 2 dari 3 kriteria: (1) Usia >=80 tahun, (2) Berat Badan <=60 kg, atau (3) Serum Kreatinin >=1.5 mg/dL.\n• Pengobatan DVT Akut & Emboli Paru (PE):\n  - 10 mg per oral dua kali sehari selama 7 hari pertama, dilanjutkan 5 mg per oral dua kali sehari selama minimal 3 - 6 bulan.\n• Pencegahan Kekambuhan DVT / PE (Extended Therapy):\n  - 2.5 mg per oral dua kali sehari setelah menyelesaikan terapi antikoagulan terapeutik minimal 6 bulan.\n• Profilaksis DVT Pasca-Operasi Penggantian Sendi Panggul atau Lutut:\n  - 2.5 mg per oral dua kali sehari, dimulai 12-24 jam pasca-operasi. Durasi: 12 hari (lutut) atau 35 hari (panggul).`,
    pediatricDosage: `• Belum direkomendasikan untuk pasien pediatrik usia <18 tahun.`,
    geriatricDosage: `• Lihat kriteria reduksi dosis (2.5 mg BID bila usia >=80 th ditambah kriteria BB <=60 kg atau kreatinin >=1.5 mg/dL).`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis berdasarkan fungsi ginjal semata, kecuali jika memenuhi kriteria reduksi dosis AF (Serum Kreatinin >=1.5 mg/dL bersamaan dengan usia/BB);\n• Pasien Hemodialisis (ESRD): 5 mg BID (atau 2.5 mg BID jika usia >=80 th atau BB <=60 kg).`,
    hepaticDoseAdjustment: `• Child-Pugh A (Ringan): Tidak perlu penyesuaian dosis;\n• Child-Pugh B (Sedang): Gunakan dengan hati-hati;\n• Child-Pugh C (Berat / Koagulopati): KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• Dosis inisiasi DVT/PE: 20 mg/hari (10 mg BID selama 7 hari); Dosis pemeliharaan: 10 mg/hari (5 mg BID).`,
    administrationGuideline: `• Minum 2 kali sehari setiap 12 jam dengan atau tanpa makanan. Bila pasien kesulitan menelan, tablet dapat digerus dan disuspensikan dalam 30 mL air putih atau jus apel segera sebelum diminum.`
  },

  'dabigatran': {
    adultDosage: `• Fibrilasi Atrium Non-Valvular:\n  - 150 mg per oral dua kali sehari (BID).\n  - Pasien Usia >=80 tahun / Risiko Tinggi Perdarahan: 110 mg per oral dua kali sehari (rekomendasi pedoman ESC/internasional).\n• Pengobatan & Pencegahan Sekunder DVT dan Emboli Paru:\n  - 150 mg per oral dua kali sehari setelah minimal 5 hari pengobatan dengan antikoagulan parenteral (Heparin/LMWH).\n• Profilaksis DVT Pasca-Operasi Penggantian Sendi Total:\n  - Hari ke-1: 110 mg dosis tunggal 1-4 jam pasca operasi, dilanjutkan 220 mg sekali sehari (2 kapsul 110 mg) selama 10 hari (lutut) atau 28-35 hari (panggul).`,
    geriatricDosage: `• Usia >=80 tahun: Pertimbangkan 110 mg dua kali sehari. Usia 75-80 tahun: 150 mg BID atau 110 mg BID bergantung risiko perdarahan vs tromboemboli.`,
    renalDoseAdjustment: `• CrCl >50 mL/min: 150 mg BID;\n• CrCl 30 - 50 mL/min: 150 mg BID atau turunkan ke 110 mg BID (bila bersama inhibitor P-gp seperti dronedarone/ketokonazol: 75 mg BID);\n• CrCl 15 - 30 mL/min: 75 mg BID (FDA US) / KONTRAINDIKASI pada pedoman Eropa (EMA);\n• CrCl <15 mL/min atau Dialisis: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Kontraindikasi pada gangguan hepar berat atau penyakit hati yang mempengaruhi masa protrombin/koagulasi.`,
    maxDoseLimit: `• 300 mg/hari (150 mg BID).`,
    administrationGuideline: `• TELAN KAPSUL UTUH DENGAN SEGLAS AIR PENUH. DILARANG MEMBUKA, MENGUNYAH, ATAU MENGGERUS KAPSUL (dapat meningkatkan bioavailabilitas hingga 75% dan memicu perdarahan fatal). Simpan di dalam botol asli untuk melindungi dari kelembapan udara.`
  },

  'ticagrelor': {
    adultDosage: `• Sindrom Koroner Akut (UAP / NSTEMI / STEMI) / Pasca PCI:\n  - Dosis Muatan (Loading Dose): 180 mg per oral dosis tunggal.\n  - Dosis Pemeliharaan: 90 mg per oral dua kali sehari (tiap 12 jam) dikombinasikan dengan Aspirin dosis rendah (75 - 100 mg/hari) selama minimal 12 bulan.\n• Pencegahan Kejadian Kardiovaskular Sekunder Jangka Panjang (Riwayat Infark Miokard >1 tahun lalu):\n  - 60 mg per oral dua kali sehari bersama Aspirin 75-100 mg/hari.`,
    pediatricDosage: `• Belum ditetapkan keamanan dan efikasi pada anak <18 tahun.`,
    geriatricDosage: `• Tidak diperlukan penyesuaian dosis pada pasien lanjut usia.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal (termasuk pasien hemodialisis).`,
    hepaticDoseAdjustment: `• Gangguan hepar ringan: Tidak perlu penyesuaian;\n• Gangguan hepar sedang-berat: KONTRAINDIKASI.`,
    maxDoseLimit: `• Dosis muatan: 180 mg; Dosis pemeliharaan: 180 mg/hari (90 mg BID) pada tahun pertama.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan. WAJIB diminum bersama aspirin dosis rendah <=100 mg/hari (dosis aspirin >100 mg menurunkan efektivitas ticagrelor). Tablet dapat digerus dan dilarutkan dalam air bila perlu.`
  },

  'sacubitril-valsartan': {
    adultDosage: `• Gagal Jantung Kronis Fraksi Ejeksi Berkurang (HFrEF, NYHA Kelas II - IV):\n  - Dosis Awal Standar (Pasien sebelumnya menggunakan ACEi/ARB dosis sedang-tinggi): 49/51 mg (Sacubitril 49 mg / Valsartan 51 mg) per oral dua kali sehari.\n  - Dosis Awal Rendah (Pasien belum pernah menggunakan ACEi/ARB atau dosis rendah, lansia >=75 th, atau eGFR 30-59 mL/min): 24/26 mg per oral dua kali sehari.\n  - Titrasi Dosis: Gandakan dosis tiap 2 - 4 minggu sesuai toleransi pasien hingga mencapai Dosis Target Pemeliharaan: 97/103 mg (Sacubitril 97 mg / Valsartan 103 mg) per oral dua kali sehari.`,
    pediatricDosage: `• Gagal Jantung Pediatrik (usia >=1 tahun):\n  - BB 40 - 50 kg: Awal 24/26 mg BID, titrasi ke 49/51 mg BID, target 72/78 mg BID.\n  - BB >=50 kg: Awal 49/51 mg BID, target 97/103 mg BID.`,
    geriatricDosage: `• Pasien usia >=75 tahun: Disarankan memulai dari dosis awal rendah 24/26 mg BID.`,
    renalDoseAdjustment: `• eGFR >=30 mL/min: Tidak perlu penyesuaian dosis awal (49/51 mg BID);\n• eGFR <30 mL/min: Dosis awal 24/26 mg BID, titrasi perlahan;\n• Dialisis: Pengalaman klinis sangat terbatas.`,
    hepaticDoseAdjustment: `• Child-Pugh A (Ringan): Tidak perlu penyesuaian;\n• Child-Pugh B (Sedang): Dosis awal 24/26 mg BID;\n• Child-Pugh C (Berat): KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• 97/103 mg dua kali sehari (Total harian: Sacubitril 194 mg / Valsartan 206 mg).`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan. WAJIB JEDA 36 JAM (washout period) setelah dosis terakhir ACE Inhibitor (Captopril/Lisinopril/Ramipril) sebelum tablet Entresto pertama diminum guna mencegah Angioedema fatal.`
  },

  'simvastatin': {
    adultDosage: `• Hiperkolesterolemia & Reduksi Risiko Kardiovaskular (PJK/Stroke):\n  - Dosis Awal: 10 - 20 mg per oral sekali sehari pada malam hari (atau 40 mg/hari untuk pasien risiko kardiovaskular sangat tinggi).\n  - Rentang Dosis Pemeliharaan: 10 - 40 mg per oral sekali sehari pada malam hari.\n  - Dosis 80 mg/hari DIBATASI KETAT oleh FDA dan hanya boleh dilanjutkan pada pasien yang telah mengonsumsinya >=12 bulan tanpa bukti toksisitas otot (miopati).`,
    pediatricDosage: `• Heterozygous Familial Hypercholesterolemia (Anak usia 10 - 17 tahun):\n  - Awal 10 mg sekali sehari pada malam hari (Rentang: 10 - 40 mg/hari).`,
    geriatricDosage: `• Inisiasi dengan dosis 5 - 10 mg/hari pada pasien usia lanjut (>65 tahun).`,
    renalDoseAdjustment: `• Gangguan ginjal berat (CrCl <30 mL/min): Dosis awal 5 mg sekali sehari pada malam hari, pantau ketat.`,
    hepaticDoseAdjustment: `• Penyakit hati aktif / peningkatan enzim transaminase persisten tidak jelas: KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• 40 mg/hari (Maksimal 10 mg/hari bila bersama Diltiazem/Verapamil/Dronedarone; Maksimal 20 mg/hari bila bersama Amlodipine/Amiodarone/Ranolazine).`,
    administrationGuideline: `• Minum pada malam hari menjelang tidur (sintesis kolesterol hepatik memuncak pada malam hari). Hindari konsumsi jus grapefruit lebih dari 1 liter/hari.`
  },

  'atorvastatin': {
    adultDosage: `• Hiperkolesterolemia Primer, Dislipidemia Campuran, & Pencegahan Kardiovaskular:\n  - Dosis Awal: 10 - 20 mg per oral sekali sehari (atau 40 mg/hari untuk reduksi LDL-C >45%).\n  - Rentang Dosis: 10 - 80 mg per oral sekali sehari.\n  - Terapi Statin Intensitas Tinggi (Pasca-SKA / PJK Akut): 40 - 80 mg per oral sekali sehari.`,
    pediatricDosage: `• Heterozygous Familial Hypercholesterolemia (usia 10 - 17 tahun):\n  - Awal 10 mg per oral sekali sehari (Maksimal 20 mg/hari).`,
    geriatricDosage: `• Tidak diperlukan penyesuaian dosis berbasis usia semata.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal (tidak diekskresi via ginjal).`,
    hepaticDoseAdjustment: `• Penyakit hati aktif atau peningkatan transaminase >=3x ULN: KONTRAINDIKASI.`,
    maxDoseLimit: `• 80 mg sekali sehari.`,
    administrationGuideline: `• Dapat diminum kapan saja (pagi, siang, atau malam) dengan atau tanpa makanan karena waktu paruh panjang (~14 jam). Pertahankan jadwal konsumsi yang konsisten.`
  },

  'bisoprolol': {
    adultDosage: `• Hipertensi & Angina Pektoris:\n  - Awal 2.5 - 5 mg per oral sekali sehari pada pagi hari. Dapat ditingkatkan ke 10 mg sekali sehari (Maks 20 mg/hari bila diperlukan).\n• Gagal Jantung Kronis Stabil (HFrEF):\n  - Titrasi Bertahap (Regimen CIBIS-II): Minggu 1: 1.25 mg/hari $\rightarrow$ Minggu 2: 2.5 mg/hari $\rightarrow$ Minggu 3: 3.75 mg/hari $\rightarrow$ Minggu 4-7: 5 mg/hari $\rightarrow$ Minggu 8-11: 7.5 mg/hari $\rightarrow$ Dosis Target Pemeliharaan: 10 mg sekali sehari.`,
    pediatricDosage: `• Keamanan dan efikasi belum ditetapkan pada anak.`,
    geriatricDosage: `• Awal 2.5 mg sekali sehari; titrasi perlahan sesuai laju denyut jantung (target HR istirahat 55-60 bpm).`,
    renalDoseAdjustment: `• CrCl <20 mL/min: Dosis maksimal tidak boleh melebihi 10 mg sekali sehari.`,
    hepaticDoseAdjustment: `• Gangguan hepar berat (sirosis): Dosis maksimal 10 mg sekali sehari.`,
    maxDoseLimit: `• Hipertensi: 20 mg/hari; Gagal Jantung: 10 mg/hari.`,
    administrationGuideline: `• Minum di pagi hari sebelum atau sesudah sarapan dengan air putih. Jangan menghentikan obat mendadak (lakukan tapering off selama 1-2 minggu).`
  },

  'amlodipine': {
    adultDosage: `• Hipertensi:\n  - Awal 5 mg per oral sekali sehari. Dapat ditingkatkan hingga 10 mg sekali sehari setelah 1-2 minggu evaluasi respons tekanan darah.\n• Angina Pektoris Kronis Stabil & Angina Vasospastik (Prinzmetal):\n  - 5 - 10 mg per oral sekali sehari (kebanyakan pasien membutuhkan 10 mg/hari).`,
    pediatricDosage: `• Hipertensi Pediatrik (usia 6 - 17 tahun):\n  - 2.5 mg hingga 5 mg per oral sekali sehari. Dosis >5 mg/hari belum diteliti pada anak.`,
    geriatricDosage: `• Pasien Usia Lanjut / Frail / Pasien Bertubuh Kecil: Dosis awal 2.5 mg per oral sekali sehari.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Gangguan hepar berat: Dosis awal 2.5 mg per oral sekali sehari.`,
    maxDoseLimit: `• 10 mg sekali sehari.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan. Konsumsi pada jam yang sama setiap hari.`
  },

  'furosemide': {
    adultDosage: `• Edema Terkait Gagal Jantung, Sirosis Hati, atau Penyakit Ginjal:\n  - Dosis Oral Awal: 20 - 80 mg sebagai dosis tunggal di pagi hari. Jika respons belum adekuat, tingkatkan 20 - 40 mg tiap 6-8 jam hingga respons diuresis tercapai. Dosis pemeliharaan diberikan 1 - 2 kali sehari.\n  - Dosis Intravena (IV): Awal 20 - 40 mg bolus IV perlahan (1-2 menit). Pada gagal jantung akut berat dapat ditingkatkan atau diberikan infus kontinu.\n• Hipertensi:\n  - 40 mg per oral dua kali sehari (dapat dikombinasikan dengan antihipertensi lain).`,
    pediatricDosage: `• Edema Anak:\n  - Oral: Awal 1 - 2 mg/kgBB dosis tunggal (Maks 6 mg/kgBB/hari);\n  - IV / IM: Awal 1 mg/kgBB diberikan perlahan (Maks 6 mg/kgBB/hari).`,
    geriatricDosage: `• Inisiasi dengan dosis terendah (20 mg/hari) dan titrasi perlahan untuk mencegah deplesi volume akut dan hipotensi ortostatik.`,
    renalDoseAdjustment: `• Pada gagal ginjal berat / sindrom nefrotik resisten, dosis harian tinggi hingga 250 - 1000 mg/hari mungkin diperlukan (pantau ototoksisitas).`,
    hepaticDoseAdjustment: `• Sirosis hepatik dengan asites: Gunakan bersama Spironolactone (rasio standar 40 mg Furosemide : 100 mg Spironolactone) di bawah pengawasan ketat.`,
    maxDoseLimit: `• Oral: Hingga 600 mg/hari pada kondisi edema refrakter berat (Maksimal IV bolus: 4 mg/menit untuk mencegah ketulian ototoksik).`,
    administrationGuideline: `• Minum di pagi hari (dan siang hari jika dosis terbagi) untuk menghindari terbangun di malam hari untuk buang air kecil (nokturia). Disarankan diminum saat perut kosong.`
  },

  'spironolactone': {
    adultDosage: `• Gagal Jantung Kronis (HFrEF NYHA III - IV / RALES Regimen):\n  - Awal 12.5 - 25 mg per oral sekali sehari. Dapat ditingkatkan hingga 50 mg sekali sehari setelah 8 minggu jika Kalium serum <5.0 mEq/L dan eGFR stabil.\n• Hipertensi Resisten (Add-on):\n  - 25 - 50 mg per oral sekali sehari.\n• Asites Akibat Sirosis Hati:\n  - 100 mg per oral sekali sehari (rentang 100 - 400 mg/hari, biasanya dikombinasi Furosemide 40 mg).\n• Hiperaldosteronisme Primer:\n  - 100 - 400 mg/hari dalam dosis terbagi sebelum operasi.`,
    pediatricDosage: `• Edema / Hipertensi Pediatrik: Awal 1 - 3 mg/kgBB/hari per oral dibagi dalam 1 - 2 dosis.`,
    geriatricDosage: `• Dosis awal 12.5 - 25 mg sekali sehari; pantau kalium dan kreatinin pada hari ke-3, ke-7, dan tiap bulan.`,
    renalDoseAdjustment: `• eGFR 30 - 50 mL/min: Dosis awal 12.5 mg/hari atau 25 mg selang sehari;\n• eGFR <30 mL/min atau Kalium >5.0 mEq/L: KONTRAINDIKASI MUTLAK (risiko hiperkalemia fatal).`,
    hepaticDoseAdjustment: `• Lakukan titrasi hati-hati pada sirosis berat untuk mencegah ensefalopati hepatikum.`,
    maxDoseLimit: `• Gagal Jantung: 50 mg/hari; Asites Sirosis: 400 mg/hari.`,
    administrationGuideline: `• Minum bersama makanan atau segera setelah makan pagi untuk meningkatkan bioavailabilitas dan mengurangi iritasi lambung. Hindari suplemen kalium atau pengganti garam rendah natrium.`
  },

  // === ANTIMIKROBA & ANTIVIRUS ===
  'paxlovid': {
    adultDosage: `• Pengobatan COVID-19 Ringan-Sedang pada Pasien Risiko Tinggi (Dewasa & Remaja >=12 th, BB >=40 kg):\n  - Fungsi Ginjal Normal (eGFR >=60 mL/min): Nirmatrelvir 300 mg (2 tablet pink 150 mg) BERSAMAAN DENGAN Ritonavir 100 mg (1 tablet putih 100 mg) diminum DUA KALI SEHARI (tiap 12 jam) selama 5 HARI BERTURUT-TURUT.\n  - Wajib dimulai dalam 5 hari pertama sejak onset gejala pertama COVID-19.`,
    pediatricDosage: `• Anak <12 tahun atau BB <40 kg: Keamanan dan efektivitas belum ditetapkan (EUA membatasi hanya untuk usia >=12 th dengan BB >=40 kg).`,
    geriatricDosage: `• Dosis disesuaikan berdasarkan fungsi ginjal (eGFR). Wajib skrining interaksi polifarmasi.`,
    renalDoseAdjustment: `• eGFR >=60 mL/min: Dosis standar (Nirmatrelvir 300 mg + Ritonavir 100 mg BID);\n• eGFR 30 - 59 mL/min (Gangguan Sedang): Kurangi Nirmatrelvir menjadi 150 mg (1 tab pink) + Ritonavir 100 mg (1 tab putih) diminum bersamaan DUA KALI SEHARI selama 5 hari;\n• eGFR <30 mL/min (Gangguan Berat / Dialisis): KONTRAINDIKASI / Tidak direkomendasikan.`,
    hepaticDoseAdjustment: `• Child-Pugh A & B (Ringan-Sedang): Tidak perlu penyesuaian dosis;\n• Child-Pugh C (Berat): KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• Nirmatrelvir 600 mg + Ritonavir 200 mg per 24 jam selama maksimal 5 hari.`,
    administrationGuideline: `• Telan kedua tablet (pink dan putih) secara bersamaan utuh dengan air. Jangan digerus atau dikunyah. Dapat diminum dengan atau tanpa makanan.`
  },

  'amoxicillin': {
    adultDosage: `• Infeksi Saluran Napas Ringan - Sedang, Kulit & Jaringan Lunak, Genitourinaria:\n  - 250 - 500 mg per oral setiap 8 jam ATAU 500 - 875 mg per oral setiap 12 jam selama 7 - 10 hari.\n• Infeksi Saluran Napas Berat / Pneumonia Komunitas (CAP):\n  - 875 mg per oral setiap 12 jam ATAU 500 mg setiap 8 jam selama 7 - 14 hari.\n• Eradikasi Helicobacter pylori (Regimen Tripel):\n  - 1000 mg (1 gram) per oral dua kali sehari (dikombinasikan dengan PPI + Klaritromisin 500 mg BID) selama 14 hari.`,
    pediatricDosage: `• Bayi & Anak (>3 bulan, BB <40 kg):\n  - Infeksi Ringan-Sedang: 25 - 45 mg/kgBB/hari per oral dibagi setiap 12 jam (atau 20 - 40 mg/kgBB/hari dibagi q8h);\n  - Otitis Media Akut Dosis Tinggi / Pneumonia: 80 - 90 mg/kgBB/hari dibagi setiap 12 jam (Maksimal 2000 - 3000 mg/hari).`,
    geriatricDosage: `• Dosis sama dengan dewasa; sesuaikan jika ada penurunan fungsi ginjal.`,
    renalDoseAdjustment: `• GFR 10 - 30 mL/min: 250 - 500 mg per oral setiap 12 jam;\n• GFR <10 mL/min: 250 - 500 mg per oral setiap 24 jam;\n• Hemodialisis: 250 - 500 mg q24h + dosis tambahan pasca dialisis.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan hepar.`,
    maxDoseLimit: `• Dewasa: 4000 mg (4 gram) per hari.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan (makanan tidak mengganggu penyerapan). Kocok suspensi rekonstitusi dengan baik sebelum diminum dan habiskan seluruh antibiotik sesuai anjuran dokter.`
  },

  'ciprofloxacin': {
    adultDosage: `• Infeksi Saluran Kemih (Sistitis Akut Tanpa Komplikasi):\n  - 250 - 500 mg per oral setiap 12 jam selama 3 hari.\n• Pielonefritis Akut / UTI Terkomplikasi:\n  - 500 mg per oral setiap 12 jam selama 7 - 14 hari.\n• Pneumonia Nosokomial, Infeksi Tulang & Sendi (Osteomielitis), Prostatitis Kronis:\n  - 500 - 750 mg per oral setiap 12 jam selama 14 hari hingga 4 - 6 minggu (osteomielitis/prostatitis).\n• Diare Infeksius Akut / Demam Tifoid:\n  - 500 mg per oral setiap 12 jam selama 5 - 7 hari.`,
    pediatricDosage: `• Umumnya TIDAK DIREKOMENDASIKAN pada anak <18 tahun karena risiko artropati kartilago sendi, KECUALI untuk UTI Terkomplikasi / Pielonefritis (10 - 20 mg/kgBB per oral q12h, maks 750 mg/dosis) atau inhalasi Antraks pasca paparan.`,
    geriatricDosage: `• Dosis disesuaikan berdasarkan klirens kreatinin ginjal. Waspada risiko ruptur tendon dan delirium.`,
    renalDoseAdjustment: `• CrCl 30 - 50 mL/min: 250 - 500 mg per oral setiap 12 jam;\n• CrCl <30 mL/min: 250 - 500 mg per oral setiap 18 - 24 jam;\n• Hemodialisis: 250 - 500 mg q24h (diberikan setelah sesi dialisis).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan hepar.`,
    maxDoseLimit: `• Oral: 1500 mg/hari (750 mg BID); IV: 1200 mg/hari (400 mg TID).`,
    administrationGuideline: `• Minum dengan segelas penuh air putih dan pertahankan hidrasi adekuat untuk mencegah kristaluria. BERIKAN JEDA MINIMAL 2 JAM SEBELUM ATAU 6 JAM SETELAH antasida, susu/kalsium, suplemen besi, atau multivitamin.`
  },

  'linezolid': {
    adultDosage: `• Pneumonia Nosokomial & Komunitas (MRSA / VRE / S. pneumoniae resisten multi-obat):\n  - 600 mg per oral atau infus intravena setiap 12 jam (q12h) selama 10 - 14 hari.\n• Infeksi Kulit & Struktur Kulit Terkomplikasi (cSSSI akibat MRSA):\n  - 600 mg per oral atau IV setiap 12 jam selama 10 - 14 hari.\n• Infeksi Enterococcus faecium Resisten Vankomisin (VRE) dengan Bakteremia:\n  - 600 mg per oral atau IV setiap 12 jam selama 14 - 28 hari.`,
    pediatricDosage: `• Bayi & Anak (usia 0 - 11 tahun): 10 mg/kgBB per oral atau IV setiap 8 jam (q8h) selama 10 - 14 hari.\n• Anak >=12 tahun: Dosis dewasa 600 mg per oral atau IV setiap 12 jam.`,
    geriatricDosage: `• Tidak diperlukan penyesuaian dosis berbasis usia semata. Pantau hitung darah serial.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis awal; berikan dosis pasca sesi hemodialisis (30% tereliminasi saat dialisis).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan hepar ringan-sedang.`,
    maxDoseLimit: `• 1200 mg/hari (600 mg BID). Durasi >28 hari meningkatkan risiko neuropati ireversibel.`,
    administrationGuideline: `• Bioavailabilitas oral mendekati 100% (dosis oral sama dengan IV). Dapat diminum dengan atau tanpa makanan. Hindari makanan/minuman kaya tiramin.`
  },

  'voriconazole': {
    adultDosage: `• Aspergillosis Invasif & Infeksi Jamur Berat (Scedosporium / Fusarium):\n  - Dosis Muatan (Loading Dose - Hari ke-1): 400 mg per oral setiap 12 jam (untuk 2 dosis pertama) ATAU 6 mg/kgBB IV setiap 12 jam.\n  - Dosis Pemeliharaan (Mulai Hari ke-2): 200 mg per oral dua kali sehari (dapat ditingkatkan ke 300 mg BID bila respon suboptimal; atau 100 mg BID untuk BB <40 kg).\n• Kandidemia pada Pasien Non-Neutropenik:\n  - Dosis muatan sama, dilanjutkan pemeliharaan 200 mg BID.`,
    pediatricDosage: `• Anak usia 2 - 11 tahun dan Remaja (12-14 th, BB <50 kg):\n  - Loading Dose: 9 mg/kgBB IV q12h untuk 2 dosis pertama;\n  - Maintenance: 8 mg/kgBB IV q12h ATAU 9 mg/kgBB per oral q12h (Maks 350 mg BID).`,
    geriatricDosage: `• Tidak diperlukan penyesuaian dosis khusus; pantau fungsi ginjal dan EKG interval QTc.`,
    renalDoseAdjustment: `• Oral: Tidak memerlukan penyesuaian dosis pada gangguan ginjal;\n• IV: Pelarut SBECD dapat terakumulasi bila CrCl <50 mL/min (prioritaskan sediaan oral bila CrCl <50 mL/min).`,
    hepaticDoseAdjustment: `• Sirosis Ringan-Sedang (Child-Pugh A/B): Berikan loading dose standar, namun TURUNKAN DOSIS PEMELIHARAAN SEBESAR 50% (misal 100 mg BID);\n• Child-Pugh C: Gunakan hanya jika manfaat melebihi risiko.`,
    maxDoseLimit: `• Dosis pemeliharaan: 300 mg dua kali sehari (600 mg/hari).`,
    administrationGuideline: `• HARUS DIMINUM SAAT PERUT KOSONG (minimal 1 jam sebelum atau 1 jam setelah makan). Lakukan pemantauan kadar obat terapeutik palung (TDM target 1.0 - 5.5 mcg/mL).`
  },

  // === ENDOKRIN & DIABETES ===
  'semaglutide': {
    adultDosage: `• Diabetes Melitus Tipe 2 (Subkutan / Ozempic):\n  - Inisiasi (Adaptasi GI): 0.25 mg SC sekali seminggu selama 4 minggu pertama (bukan dosis terapeutik glikemik).\n  - Dosis Pemeliharaan Awal: Tingkatkan ke 0.5 mg SC sekali seminggu pada minggu ke-5.\n  - Eskalasi Lanjutan: Jika kontrol HbA1c belum tercapai setelah minimal 4 minggu pada dosis 0.5 mg, tingkatkan ke 1.0 mg SC sekali seminggu. Dapat ditingkatkan hingga maksimal 2.0 mg SC sekali seminggu.\n• Manajemen Berat Badan / Obesitas (Subkutan / Wegovy):\n  - Skema Titrasi Bulanan: Bulan 1: 0.25 mg/minggu $\rightarrow$ Bulan 2: 0.5 mg/minggu $\rightarrow$ Bulan 3: 1.0 mg/minggu $\rightarrow$ Bulan 4: 1.7 mg/minggu $\rightarrow$ Dosis Target Pemeliharaan (Bulan 5+): 2.4 mg SC sekali seminggu.\n• Diabetes Melitus Tipe 2 (Oral / Rybelsus):\n  - Inisiasi: 3 mg per oral sekali sehari pagi hari selama 30 hari pertama.\n  - Peningkatan: Tingkatkan ke 7 mg per oral sekali sehari. Dapat ditingkatkan ke 14 mg per oral sekali sehari setelah minimal 30 hari jika perlu kontrol glikemik tambahan.`,
    pediatricDosage: `• Obesitas Pediatrik (usia >=12 tahun, Wegovy): Titrasi bertahap sama dengan dewasa hingga dosis target 2.4 mg SC sekali seminggu (atau 1.7 mg/minggu bila tidak toleran).`,
    geriatricDosage: `• Tidak diperlukan penyesuaian dosis berbasis usia; perhatikan status hidrasi dan fungsi ginjal.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal ringan, sedang, hingga berat (termasuk ESRD), namun pantau hidrasi karena muntah/diare dapat memicu gagal ginjal akut prerenal.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan fungsi hepar.`,
    maxDoseLimit: `• DM Tipe 2 (Ozempic): 2.0 mg/minggu; Obesitas (Wegovy): 2.4 mg/minggu; Oral (Rybelsus): 14 mg/hari.`,
    administrationGuideline: `• Sediaan Subkutan: Suntikkan seminggu sekali pada hari yang sama kapan saja di perut, paha, atau lengan atas. Sediaan Oral (Rybelsus): HARUS diminum saat bangun tidur saat perut kosong dengan maksimal 120 mL air putih; puasa makan/minum/obat oral lain minimal 30 menit.`
  },

  'tirzepatide': {
    adultDosage: `• Diabetes Melitus Tipe 2 & Manajemen Berat Badan Kronis (Mounjaro / Zepbound):\n  - Dosis Inisiasi: 2.5 mg subkutan sekali seminggu selama 4 minggu pertama (tahap inisiasi adaptasi gastrointestinal).\n  - Peningkatan Pertama: Tingkatkan ke 5 mg subkutan sekali seminggu pada minggu ke-5.\n  - Eskalasi Dosis: Jika diperlukan kontrol glikemik atau penurunan berat badan tambahan, dosis dapat ditingkatkan dengan kenaikan 2.5 mg setiap minimal 4 minggu.\n  - Dosis Pemeliharaan yang Dianjurkan: 5 mg, 10 mg, atau 15 mg subkutan sekali seminggu.`,
    pediatricDosage: `• Belum disetujui untuk pasien pediatrik <18 tahun.`,
    geriatricDosage: `• Tidak diperlukan penyesuaian dosis pada pasien usia lanjut.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal (termasuk penyakit ginjal kronis stadium akhir).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan fungsi hepar.`,
    maxDoseLimit: `• 15 mg subkutan sekali seminggu.`,
    administrationGuideline: `• Suntikkan subkutan sekali seminggu di area abdomen, paha, atau deltoid. Dapat diberikan kapan saja dengan atau tanpa makanan. Ganti area penyuntikan setiap minggu.`
  },

  'empagliflozin': {
    adultDosage: `• Diabetes Melitus Tipe 2:\n  - Awal 10 mg per oral sekali sehari pada pagi hari. Pada pasien yang mentoleransi dengan baik dan membutuhkan kontrol glikemik tambahan (dengan eGFR >=30 mL/min), dosis dapat ditingkatkan ke 25 mg sekali sehari.\n• Gagal Jantung Kronis (HFrEF / HFpEF) & Penyakit Ginjal Kronis (CKD):\n  - 10 mg per oral sekali sehari pada pagi hari.`,
    pediatricDosage: `• DM Tipe 2 Anak (usia >=10 tahun): Awal 10 mg sekali sehari, dapat ditingkatkan ke 25 mg/hari.`,
    geriatricDosage: `• Dosis 10 mg/hari; pantau deplesi volume cairan dan hipotensi ortostatik.`,
    renalDoseAdjustment: `• eGFR >=30 mL/min: Tidak perlu penyesuaian dosis;\n• eGFR 20 - 29 mL/min: 10 mg sekali sehari (diindikasikan untuk memperlambat perburukan CKD dan gagal jantung, efikasi penurunan HbA1c berkurang);\n• eGFR <20 mL/min atau Dialisis: Tidak disarankan inisiasi baru / hentikan bila menjalani dialisis.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan hepar ringan hingga berat.`,
    maxDoseLimit: `• 25 mg sekali sehari pada pagi hari.`,
    administrationGuideline: `• Minum satu kali sehari pada pagi hari dengan atau tanpa makanan. Jaga kecukupan cairan tubuh. Hentikan sementara minimal 3 hari sebelum operasi besar.`
  },

  'metformin': {
    adultDosage: `• Diabetes Melitus Tipe 2:\n  - Tablet Lepas Cepat (IR): Awal 500 mg per oral dua kali sehari atau 850 mg sekali sehari bersama makanan. Tingkatkan bertahap 500 mg tiap 1-2 minggu hingga dosis efektif 1500 - 2000 mg/hari dibagi 2 - 3 dosis (Maks 2550 mg/hari).\n  - Tablet Lepas Lambat (XR): Awal 500 - 1000 mg per oral sekali sehari saat makan malam. Tingkatkan 500 mg tiap minggu hingga dosis target 1500 - 2000 mg sekali sehari (Maks 2000 mg/hari).`,
    pediatricDosage: `• DM Tipe 2 Anak (usia >=10 tahun, Sediaan IR): Awal 500 mg dua kali sehari bersama makanan (Maksimal 2000 mg/hari dibagi 2 dosis).`,
    geriatricDosage: `• Inisiasi dengan dosis rendah (500 mg/hari). Periksa eGFR secara berkala; hindari jika eGFR <30 mL/min.`,
    renalDoseAdjustment: `• eGFR >=60 mL/min: Dosis maksimal 2000 - 2550 mg/hari;\n• eGFR 45 - 59 mL/min: Dosis maksimal 1000 - 1500 mg/hari;\n• eGFR 30 - 44 mL/min: Dosis maksimal 500 - 1000 mg/hari (tidak direkomendasikan memulai inisiasi baru);\n• eGFR <30 mL/min: KONTRAINDIKASI MUTLAK (risiko fatal Asidosis Laktat).`,
    hepaticDoseAdjustment: `• Hindari penggunaan pada gangguan fungsi hepar berat (faktor risiko asidosis laktat).`,
    maxDoseLimit: `• Sediaan IR: 2550 mg/hari; Sediaan XR: 2000 mg/hari.`,
    administrationGuideline: `• HARUS DIMINUM BERSAMA ATAU SEGERA SETELAH MAKAN untuk meminimalkan efek samping mual, kembung, dan diare. Telan utuh sediaan XR, jangan digerus atau dikunyah.`
  },

  // === SSP, PSIKIATRI & ANALGESIK ===
  'duloxetine': {
    adultDosage: `• Gangguan Depresi Mayor (MDD):\n  - Awal 40 - 60 mg/hari per oral (diberikan 20-30 mg dua kali sehari atau 60 mg sekali sehari). Dosis efektif 60 mg/hari (Maksimal 120 mg/hari).\n• Gangguan Kecemasan Umum (GAD):\n  - Awal 30 mg per oral sekali sehari selama 1 minggu, lalu tingkatkan ke 60 mg sekali sehari (Rentang 60 - 120 mg/hari).\n• Nyeri Neuropati Diabetik Perifer, Fibromialgia, & Nyeri Muskuloskeletal Kronis:\n  - 60 mg per oral sekali sehari (dapat dimulai 30 mg/hari selama 1 minggu untuk adaptasi mual).`,
    pediatricDosage: `• GAD Anak (usia 7 - 17 tahun): Awal 30 mg sekali sehari selama 2 minggu, dapat ditingkatkan ke 60 mg sekali sehari (Maks 120 mg/hari).`,
    geriatricDosage: `• Awal 30 mg sekali sehari selama minimal 2 minggu sebelum ditingkatkan ke 60 mg/hari.`,
    renalDoseAdjustment: `• CrCl >=30 mL/min: Tidak perlu penyesuaian dosis;\n• CrCl <30 mL/min atau ESRD: HINDARI PENGGUNAAN (kadar metabolit melonjak).`,
    hepaticDoseAdjustment: `• Penyakit hati kronis atau sirosis hepar: KONTRAINDIKASI / HINDARI PENGGUNAAN.`,
    maxDoseLimit: `• 120 mg per hari.`,
    administrationGuideline: `• Telan kapsul utuh dengan air. JANGAN MENGUNYAH, MENGGERUS, ATAU MEMBUKA ISI KAPSUL. Dapat diminum dengan atau tanpa makanan. Jangan hentikan obat mendadak.`
  },

  'quetiapine': {
    adultDosage: `• Skizofrenia (Sediaan Lepas Cepat / IR):\n  - Hari 1: 25 mg BID (50 mg/hari) $\rightarrow$ Hari 2: 50 mg BID (100 mg) $\rightarrow$ Hari 3: 100 mg BID (200 mg) $\rightarrow$ Hari 4: 150 mg BID (300 mg). Rentang terapeutik pemeliharaan: 300 - 750 mg/hari dibagi 2 dosis (Maks 800 mg/hari).\n• Skizofrenia (Sediaan Lepas Lambat / XR):\n  - Hari 1: 300 mg sekali sehari pada malam hari $\rightarrow$ Hari 2: 600 mg malam hari. Rentang dosis 400 - 800 mg/hari.\n• Bipolar I Mania Akut (IR):\n  - Hari 1: 100 mg/hari $\rightarrow$ Hari 2: 200 mg $\rightarrow$ Hari 3: 300 mg $\rightarrow$ Hari 4: 400 mg/hari. Rentang 400 - 800 mg/hari dibagi 2 dosis.\n• Depresi Bipolar (IR / XR):\n  - Hari 1: 50 mg malam $\rightarrow$ Hari 2: 100 mg $\rightarrow$ Hari 3: 200 mg $\rightarrow$ Dosis Target (Hari 4+): 300 mg sekali sehari sebelum tidur.\n• Terapi Ajuvan Depresi Mayor Resisten (XR):\n  - Awal 50 mg malam (Hari 1-2), 150 mg malam (Hari 3-4), rentang 150 - 300 mg/hari.`,
    pediatricDosage: `• Skizofrenia Remaja (13 - 17 th): Awal 50 mg/hari, titrasi hingga 400 - 800 mg/hari.\n• Bipolar Mania Remaja (10 - 17 th): Awal 50 mg/hari, titrasi hingga 400 - 600 mg/hari.`,
    geriatricDosage: `• Awal 25 - 50 mg/hari; tingkatkan perlahan dengan kenaikan 25-50 mg/hari untuk mencegah sedasi berat dan hipotensi ortostatik.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Awal 25 mg/hari; tingkatkan dosis 25-50 mg/hari berdasarkan respons klinis.`,
    maxDoseLimit: `• 800 mg per hari.`,
    administrationGuideline: `• Sediaan IR: Diminum 2 kali sehari dengan atau tanpa makanan. Sediaan XR: Diminum sekali sehari pada malam hari saat perut kosong atau bersama makanan ringan (<300 kalori). Telan utuh.`
  },

  'clozapine': {
    adultDosage: `• Skizofrenia Resisten Terapi & Reduksi Perilaku Bunuh Diri:\n  - Hari 1: 12.5 mg per oral 1 - 2 kali sehari.\n  - Hari 2: 25 mg 1 - 2 kali sehari.\n  - Titrasi: Tingkatkan dosis harian sebesar 25 - 50 mg/hari hingga mencapai 300 - 450 mg/hari (biasanya dibagi 2-3 dosis, dengan porsi terbesar malam hari) dalam 2-3 minggu.\n  - Rentang Dosis Pemeliharaan: 300 - 600 mg/hari (Maksimal 900 mg/hari).\n  - Wajib pemeriksaan hitung neutrofil absolut (ANC >=1500/mcL sebelum inisiasi).`,
    pediatricDosage: `• Belum disetujui untuk pasien usia <18 tahun.`,
    geriatricDosage: `• Awal 12.5 mg sekali sehari pada hari pertama; titrasi dengan kenaikan maksimal 25 mg/hari.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis formal; gunakan dengan hati-hati pada gagal ginjal berat.`,
    hepaticDoseAdjustment: `• Hindari penggunaan pada penyakit hati berat atau ikterus aktif.`,
    maxDoseLimit: `• 900 mg per hari.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan. WAJIB mematuhi jadwal pemeriksaan darah rutin ANC untuk mencegah agranulositosis fatal.`
  },

  'methotrexate': {
    adultDosage: `• Artritis Reumatoid (RA):\n  - Dosis Awal: 7.5 mg PER ORAL SEKALI SEMINGGU (diberikan sebagai dosis tunggal 7.5 mg atau 2.5 mg tiap 12 jam untuk 3 dosis dalam 24 jam sekali seminggu).\n  - Eskalasi Dosis: Tingkatkan 2.5 mg tiap 4 - 6 minggu hingga respons klinis optimal (Rentang biasa: 15 - 25 mg SEKALI SEMINGGU).\n  - PERINGATAN KERAS: HANYA DIMINUM 1 KALI DALAM SEMINGGU, BUKAN SETIAP HARI!\n• Psoriasis Vulgaris Parah & Artritis Psoriatik:\n  - 10 - 25 mg PER ORAL SEKALI SEMINGGU.\n• Suplementasi Asam Folat Wajib:\n  - Asam Folat 1 - 5 mg per oral sekali sehari pada 6 hari dalam seminggu (kecuali pada hari konsumsi methotrexate).`,
    pediatricDosage: `• Juvenile Idiopathic Arthritis (JIA, usia 2 - 16 tahun):\n  - 10 - 15 mg/m² luas permukaan tubuh PER ORAL SEKALI SEMINGGU (Maks 20-25 mg/minggu).`,
    geriatricDosage: `• Mulai dari dosis terendah (5 - 7.5 mg/minggu) karena penurunan klirens ginjal dan cadangan folat.`,
    renalDoseAdjustment: `• CrCl 60 - 80 mL/min: Gunakan 75% dari dosis standar;\n• CrCl 30 - 59 mL/min: Gunakan 50% dari dosis standar;\n• CrCl <30 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Bilirubin 3 - 5 mg/dL atau AST >180 IU: Turunkan dosis 25%; Bilirubin >5 mg/dL: KONTRAINDIKASI.`,
    maxDoseLimit: `• RA / Psoriasis: 25 - 30 mg SEKALI SEMINGGU.`,
    administrationGuideline: `• Tandai hari spesifik setiap minggu (misal: "Hanya setiap hari Minggu pagi"). Minum banyak air putih. Jangan minum alkohol sama sekali.`
  },

  'colchicine': {
    adultDosage: `• Serangan Artritis Gout Akut (Regimen Modern FDA / EULAR):\n  - Dosis Awal: 1.2 mg (atau 1.0 mg) per oral saat tanda pertama serangan gout, DILANJUTKAN 0.6 mg (atau 0.5 mg) 1 jam kemudian.\n  - Total Dosis Serangan Akut: Maksimal 1.8 mg dalam kurun waktu 1 jam pertama.\n  - JANGAN ULANGI dosis terapi serangan akut dalam kurun waktu minimal 3 hari.\n• Profilaksis Serangan Gout (Saat Memulai Allopurinol / Febuxostat):\n  - 0.5 - 0.6 mg per oral 1 - 2 kali sehari selama 3 - 6 bulan pertama.\n• Familial Mediterranean Fever (FMF):\n  - 1.2 - 2.4 mg per oral per hari (dosis tunggal atau dibagi 2 dosis).`,
    pediatricDosage: `• FMF Anak:\n  - Usia 4 - 11 tahun: 0.6 - 1.2 mg/hari;\n  - Usia >=12 tahun: 1.2 - 2.4 mg/hari.`,
    geriatricDosage: `• Profilaksis: Mulai dari 0.3 - 0.5 mg/hari. Evaluasi fungsi ginjal sebelum inisiasi.`,
    renalDoseAdjustment: `• CrCl 30 - 50 mL/min: Profilaksis 0.3 mg sekali sehari;\n• CrCl <30 mL/min: Profilaksis 0.3 mg selang sehari (tiap 2 hari). Terapi serangan akut: dosis tunggal 0.6 mg tanpa pengulangan dalam 2 minggu;\n• Pasien Dialisis: KONTRAINDIKASI penggunaan bersama inhibitor CYP3A4/P-gp.`,
    hepaticDoseAdjustment: `• Gangguan hepar berat: Turunkan dosis atau perpanjang interval pemberian. Kontraindikasi jika ada komorbiditas gagal ginjal bersamaan inhibitor CYP3A4.`,
    maxDoseLimit: `• Serangan Akut: 1.8 mg dalam 1 jam; Profilaksis: 1.2 mg/hari.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan. HENTIKAN OBAT SEGERA jika timbul diare berat, mual hebat, atau nyeri kram perut melilit.`
  },

  'sildenafil': {
    adultDosage: `• Disfungsi Ereksi (Viagra):\n  - Dosis Awal: 50 mg per oral diminum kira-kira 1 jam sebelum aktivitas seksual (rentang 25 - 100 mg sesuai efikasi dan toleransi).\n  - Frekuensi Maksimal: 1 kali sehari (1 dosis dalam kurun waktu 24 jam).\n• Hipertensi Arteri Pulmonal / PAH (Revatio):\n  - 20 mg per oral TIGA KALI SEHARI (TID), berjarak 4 - 6 jam dengan atau tanpa makanan.`,
    pediatricDosage: `• PAH Pediatrik (usia 1 - 17 tahun): 10 mg TID (BB <=20 kg) atau 20 mg TID (BB >20 kg). Dosis tinggi tidak direkomendasikan pada anak.`,
    geriatricDosage: `• Usia >65 tahun: Disarankan memulai dengan dosis 25 mg untuk disfungsi ereksi.`,
    renalDoseAdjustment: `• CrCl <30 mL/min: Dosis awal 25 mg untuk disfungsi ereksi.`,
    hepaticDoseAdjustment: `• Gangguan hepar (sirosis): Dosis awal 25 mg untuk disfungsi ereksi.`,
    maxDoseLimit: `• Disfungsi Ereksi: 100 mg sekali sehari; PAH: 20 mg 3 kali sehari.`,
    administrationGuideline: `• Minum 30 - 60 menit sebelum aktivitas seksual. Makanan tinggi lemak menunda onset kerja obat. KONTRAINDIKASI MUTLAK BERSAMA NITRAT (ISDN/Nitrogliserin).`
  },

  'paracetamol': {
    adultDosage: `• Nyeri Ringan - Sedang & Demam:\n  - 500 - 1000 mg per oral setiap 4 - 6 jam sesuai kebutuhan.\n  - Dosis Maksimal Harian: 4000 mg (4 gram) dalam 24 jam untuk dewasa sehat (batasi hingga 2000 - 3000 mg/hari pada lansia, malnutrisi, atau riwayat alkohol).`,
    pediatricDosage: `• Bayi & Anak (usia 1 bulan - 12 tahun):\n  - 10 - 15 mg/kgBB per oral setiap 4 - 6 jam sesuai kebutuhan.\n  - Maksimal 5 dosis atau 75 mg/kgBB dalam kurun waktu 24 jam.`,
    geriatricDosage: `• Dosis maksimal 2000 - 3000 mg/hari untuk mencegah risiko toksisitas hepar kronis.`,
    renalDoseAdjustment: `• GFR 10 - 50 mL/min: Berikan dosis biasa tiap 6 jam;\n• GFR <10 mL/min: Berikan dosis biasa tiap 8 jam.`,
    hepaticDoseAdjustment: `• Penyakit hati aktif / sirosis dekompensata: Batasi maksimal 2000 mg/hari atau hindari penggunaan kronis.`,
    maxDoseLimit: `• Dewasa: 4000 mg/24 jam; Pediatrik: 75 mg/kgBB/24 jam.`,
    administrationGuideline: `• Dapat diminum sebelum atau sesudah makan. Hindari mengonsumsi bersama obat flu kombinasi yang juga mengandung parasetamol.`
  },

  'ibuprofen': {
    adultDosage: `• Analgesik / Antipiretik / Dismenore Primer:\n  - 200 - 400 mg per oral setiap 4 - 6 jam sesuai kebutuhan (Maks OTC: 1200 mg/hari).\n• Artritis Reumatoid & Osteoarthritis:\n  - 400 - 800 mg per oral 3 - 4 kali sehari (dosis resep dokter: 1200 - 3200 mg/hari).`,
    pediatricDosage: `• Bayi & Anak (usia >=6 bulan - 12 tahun):\n  - 5 - 10 mg/kgBB per oral setiap 6 - 8 jam sesuai kebutuhan (Maksimal 40 mg/kgBB/hari atau 2400 mg/hari).`,
    geriatricDosage: `• Mulai dari dosis efektif terendah (200 mg TID); pantau tekanan darah, fungsi ginjal, dan risiko perdarahan lambung.`,
    renalDoseAdjustment: `• eGFR <30 mL/min: HINDARI penggunaan NSAID karena memicu vasokonstriksi arteriol ginjal dan gagal ginjal akut.`,
    hepaticDoseAdjustment: `• Hindari penggunaan pada sirosis hepar berat (risiko tinggi sindrom hepatorenal).`,
    maxDoseLimit: `• Nyeri OTC: 1200 mg/hari; Nyeri Inflamasi Resep: 3200 mg/hari.`,
    administrationGuideline: `• HARUS DIMINUM BERSAMA MAKANAN ATAU SUSU untuk mengurangi iritasi lambung dan risiko ulkus peptikum.`
  },

  // === RESPIRASI, ALERGI & ANTIHISTAMIN ===
  'cetirizine': {
    adultDosage: `• Rinitis Alergi Musiman (Hay Fever), Rinitis Alergi Perenial, & Urtikaria Idiopatik Kronis:\n  - Dosis Standar Dewasa & Remaja (usia >=12 tahun): 5 mg hingga 10 mg per oral sekali sehari (disarankan pada malam hari).\n  - Sebagian besar pasien merasakan kontrol gejala optimal pada dosis 10 mg per oral sekali sehari.\n  - Gejala Ringan: Dosis awal 5 mg sekali sehari dapat memberikan respons terapeutik yang memadai.`,
    pediatricDosage: `• Bayi & Anak Usia 6 bulan hingga 23 bulan:\n  - Awal 2.5 mg per oral sekali sehari (sediaan tetes oral / drops atau sirup).\n  - Usia 12 - 23 bulan dengan rinitis alergi / urtikaria kronis membandel: Dosis dapat ditingkatkan hingga maksimal 2.5 mg setiap 12 jam (Total 5 mg/hari).\n• Anak Usia 2 tahun hingga 5 tahun:\n  - Awal 2.5 mg per oral sekali sehari (1/2 sendok takar sirup 5 mg/5 mL).\n  - Dosis dapat ditingkatkan hingga 5 mg per oral per hari (diberikan sebagai 5 mg sekali sehari atau 2.5 mg setiap 12 jam).\n• Anak Usia 6 tahun hingga 11 tahun:\n  - 5 mg hingga 10 mg per oral sekali sehari bergantung pada tingkat keparahan gejala alergi.`,
    geriatricDosage: `• Pasien Usia Lanjut (>=65 tahun): Dosis awal yang direkomendasikan adalah 5 mg per oral sekali sehari karena penurunan klirens ginjal fisiologis pada lansia.`,
    renalDoseAdjustment: `• CrCl >=50 mL/min (Fungsi Ginjal Normal/Ringan): 10 mg per oral sekali sehari;\n• CrCl 10 - 49 mL/min (Gangguan Ginjal Sedang): 5 mg per oral sekali sehari (turunkan dosis 50%);\n• CrCl <10 mL/min (Gangguan Ginjal Berat) atau Pasien Hemodialisis: 5 mg per oral selang sehari (setiap 48 jam) ATAU KONTRAINDIKASI pada beberapa formulasi sediaan lepas lambat.`,
    hepaticDoseAdjustment: `• Pasien dengan Gangguan Fungsi Hati (Insufisiensi Hepatik): Dosis yang direkomendasikan adalah 5 mg per oral sekali sehari.`,
    maxDoseLimit: `• Dewasa & Remaja: 10 mg per 24 jam; Anak 2-5 th: 5 mg/24 jam; Anak 6-23 bln: 5 mg/24 jam.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan (makanan tidak mempengaruhi tingkat absorpsi, hanya sedikit memperlambat Tmax).\n• Disarankan diminum pada malam hari sebelum tidur karena dapat memicu rasa kantuk ringan pada sebagian pasien (~14%).\n• Hindari mengemudi, mengoperasikan mesin berbahaya, atau mengonsumsi alkohol dan obat penenang depresan SSP saat menggunakan obat ini.`
  }
};
