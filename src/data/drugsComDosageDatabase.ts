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
  },

  'dextromethorphan': {
    adultDosage: `• Pereda Batuk Kering (Non-Produktif):\n  - Sediaan Standar (Sirup / Tablet IR): 10 - 20 mg per oral setiap 4 jam ATAU 30 mg per oral setiap 6 - 8 jam sesuai kebutuhan.\n  - Sediaan Lepas Lambat (Dextromethorphan Polistirex ER): 60 mg per oral dua kali sehari (setiap 12 jam).\n  - Dosis Maksimal Harian: 120 mg per 24 jam.`,
    pediatricDosage: `• Anak Usia 6 tahun hingga 11 tahun:\n  - 5 - 10 mg per oral setiap 4 jam ATAU 15 mg setiap 6 - 8 jam (Maksimal: 60 mg dalam 24 jam).\n• Anak Usia 4 tahun hingga 5 tahun:\n  - 2.5 - 5 mg per oral setiap 4 jam ATAU 7.5 mg setiap 6 - 8 jam (Maksimal: 30 mg dalam 24 jam).\n• Anak Usia <4 tahun: KONTRAINDIKASI / Tidak direkomendasikan penggunaan obat batuk OTC tanpa pengawasan dokter spesialis anak.`,
    geriatricDosage: `• Pasien Usia Lanjut (>=65 tahun): Dosis sama dengan dewasa (10-20 mg q4h), namun perhatikan efek samping sedasi atau pusing yang dapat meningkatkan risiko jatuh.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis spesifik pada gangguan ginjal ringan-sedang. Gunakan dengan hati-hati pada gagal ginjal berat.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati dan kurangi frekuensi pemberian pada gangguan hepar berat karena penurunan metabolisme CYP2D6/CYP3A4 hepar.`,
    maxDoseLimit: `• Dewasa & Remaja (>=12 tahun): 120 mg/24 jam; Anak 6-11 tahun: 60 mg/24 jam; Anak 4-5 tahun: 30 mg/24 jam.`,
    administrationGuideline: `• Gunakan sendok takar atau gelas takar khusus yang disertakan dalam kemasan sirup untuk memastikan ketepatan dosis.\n• Dapat diminum sebelum atau sesudah makan dengan air putih yang cukup.\n• HINDARI penggunaan bersamaan dengan jus grapefruit atau minuman beralkohol.\n• KONTRAINDIKASI MUTLAK bila pasien sedang mengonsumsi atau dalam 14 hari pasca-penghentian obat antidepresan golongan MAOI.`
  },

  'methylphenidate': {
    adultDosage: `• Attention Deficit Hyperactivity Disorder (ADHD) & Narkolepsi Dewasa:\n  - Sediaan Standar (Ritalin IR): Awal 10 mg/hari (5 mg dua kali sehari sebelum sarapan dan makan siang), titrasi bertahap 5-10 mg/minggu hingga dosis efektif rata-rata 20 - 30 mg/hari dibagi 2-3 dosis (Maksimal 60 mg/hari).\n  - Sediaan Lepas Lambat (Concerta OROS): Awal 18 mg atau 36 mg per oral sekali sehari pada pagi hari, dapat dititrasi bertahap tiap minggu (18 mg, 27 mg, 36 mg, hingga 54 mg sekali sehari). Maksimal: 72 mg/hari.`,
    pediatricDosage: `• Anak Usia >=6 tahun (ADHD):\n  - Sediaan IR (Ritalin): Awal 5 mg per oral dua kali sehari (sebelum sarapan dan makan siang). Tingkatkan dosis 5 - 10 mg tiap minggu sesuai respons klinis hingga maksimal 60 mg/hari (atau 2 mg/kgBB/hari).\n  - Sediaan ER (Concerta): Awal 18 mg sekali sehari pada pagi hari. Titrasi bertahap tiap minggu hingga maksimal 54 mg/hari (pada anak 6-12 tahun) atau 72 mg/hari (pada remaja 13-17 tahun).`,
    geriatricDosage: `• Pengalaman klinis terbatas pada lansia; mulai dari dosis terendah dengan pemantauan tekanan darah dan fungsi kardiovaskular.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal karena obat diekskresi sebagai metabolit inaktif asam ritalinat.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati pada gangguan fungsi hepar berat.`,
    maxDoseLimit: `• Sediaan IR Dewasa/Anak: 60 mg/hari; Concerta Dewasa: 72 mg/hari; Concerta Anak 6-12 th: 54 mg/hari.`,
    administrationGuideline: `• Sediaan IR: Minum 30-45 menit sebelum makan. Dosis terakhir diminum sebelum pukul 16.00 sore untuk mencegah insomnia di malam hari.\n• Sediaan Concerta OROS: TELAN UTUH DENGAN SE GELAS AIR pada pagi hari. JANGAN PERNAH DIKUNYAH, DIBELAH, ATAU DIGERUS karena akan merusak mekanisme pompa osmosis OROS.`
  },

  'olmesartan': {
    adultDosage: `• Hipertensi Esensial Dewasa:\n  - Dosis Awal Standar: 20 mg per oral sekali sehari.\n  - Titrasi Dosis: Dapat ditingkatkan hingga 40 mg sekali sehari setelah 2 minggu jika respons tekanan darah tambahan diperlukan.\n  - Pasien dengan Deplesi Volume Intravaskular (misal terapi diuretik sebelumnya): Dosis awal 10 mg sekali sehari di bawah pengawasan medis.`,
    pediatricDosage: `• Anak Usia 6 tahun hingga 16 tahun (Hipertensi):\n  - BB 20 kg hingga <35 kg: Awal 10 mg per oral sekali sehari; dapat ditingkatkan ke 20 mg sekali sehari setelah 2 minggu.\n  - BB >=35 kg: Awal 20 mg per oral sekali sehari; dapat ditingkatkan ke 40 mg sekali sehari.`,
    geriatricDosage: `• Pasien Usia Lanjut (>=65 tahun): Tidak diperlukan penyesuaian dosis awal spesifik (20 mg/hari), namun titrasi dosis harus dilakukan dengan hati-hati.`,
    renalDoseAdjustment: `• CrCl 20 - 60 mL/min (Gangguan Ginjal Ringan-Sedang): Dosis awal maksimal yang direkomendasikan adalah 20 mg sekali sehari;\n• CrCl <20 mL/min: Pengalaman klinis sangat terbatas, gunakan dosis awal 10 mg dengan pemantauan kalium dan kreatinin ketat.`,
    hepaticDoseAdjustment: `• Gangguan Hati Ringan (Child-Pugh A): Tidak perlu penyesuaian dosis;\n• Gangguan Hati Sedang (Child-Pugh B): Dosis maksimal 20 mg sekali sehari;\n• Gangguan Hati Berat (Child-Pugh C): Tidak direkomendasikan.`,
    maxDoseLimit: `• Dewasa: 40 mg per oral sekali sehari.`,
    administrationGuideline: `• Dapat diminum dengan atau tanpa makanan pada jam yang sama setiap hari.\n• KONTRAINDIKASI MUTLAK pada kehamilan trimester 2 & 3 (Hentikan segera jika hamil).\n• Laporkan ke dokter jika timbul diare berat berkepanjangan dengan penurunan berat badan drastis (skrining enteropati mirip Sprue).`
  },

  'indapamide': {
    adultDosage: `• Hipertensi Esensial Dewasa:\n  - Sediaan Lepas Lambat (Natrilix SR 1.5 mg): 1.5 mg per oral sekali sehari pada pagi hari.\n  - Sediaan Konvensional (IR 2.5 mg): 1.25 mg hingga 2.5 mg per oral sekali sehari pada pagi hari.\n  - Dosis >2.5 mg/hari (atau >1.5 mg SR) tidak menambah efikasi antihipertensi namun secara bermakna meningkatkan risiko hipokalemia dan gangguan metabolik.\n• Edema Akibat Gagal Jantung Kongestif:\n  - Awal 2.5 mg per oral sekali sehari pada pagi hari; dapat ditingkatkan hingga 5 mg sekali sehari setelah 1 minggu jika diperlukan.`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada populasi pediatrik (<18 tahun).`,
    geriatricDosage: `• Dosis sama dengan dewasa (1.5 mg SR atau 1.25-2.5 mg IR), namun pemantauan elektrolit (kalium dan natrium) wajib dilakukan lebih sering karena kerentanan lansia.`,
    renalDoseAdjustment: `• CrCl >=30 mL/min: Tidak diperlukan penyesuaian dosis;\n• CrCl <30 mL/min (Gangguan Ginjal Berat) atau Anuria: KONTRAINDIKASI (diuretik tiazid/tiazid-like tidak efektif bila GFR <30 mL/min).`,
    hepaticDoseAdjustment: `• Gangguan Hati Berat atau Ensefalopati Hepatik: KONTRAINDIKASI MUTLAK (perubahan elektrolit dapat memicu koma hepatikum).`,
    maxDoseLimit: `• Hipertensi: 1.5 mg/hari (SR) atau 2.5 mg/hari (IR); Edema: 5 mg/hari.`,
    administrationGuideline: `• Minum 1 tablet pada pagi hari setelah sarapan dengan segelas air untuk mencegah nokturia (terbangun kencing di malam hari).\n• Telan utuh tablet Natrilix SR 1.5 mg, jangan dikunyah atau digerus.`
  },

  'mirabegron': {
    adultDosage: `• Overactive Bladder (OAB) dengan Gejala Urgensi, Frekuensi, & Inkontinensia Urgensi:\n  - Dosis Awal: 25 mg per oral sekali sehari.\n  - Dosis Pemeliharaan / Titrasi: Dapat ditingkatkan ke 50 mg per oral sekali sehari setelah 4 - 8 minggu berdasarkan respons klinis dan tolerabilitas pasien.\n  - Terapi Kombinasi dengan Antimuskarinik (Solifenacin): Mirabegron 25 mg atau 50 mg sekali sehari dikombinasikan dengan Solifenacin 5 mg sekali sehari untuk gejala refrakter.`,
    pediatricDosage: `• Neurogenic Detrusor Overactivity (NDO) pada Anak Usia >=3 tahun (Sediaan Granul Oral Tertentu):\n  - BB 11 kg hingga <22 kg: Awal 24 mg/hari, Maks 48 mg/hari;\n  - BB 22 kg hingga <35 kg: Awal 32 mg/hari, Maks 64 mg/hari;\n  - BB >=35 kg: Awal 48 mg/hari, Maks 80 mg/hari.`,
    geriatricDosage: `• Pasien Usia Lanjut (>=65 tahun): Tidak diperlukan penyesuaian dosis awal (25-50 mg/hari), namun pantau tekanan darah secara berkala.`,
    renalDoseAdjustment: `• CrCl 30 - 89 mL/min (Ringan-Sedang): 25 mg hingga 50 mg sekali sehari;\n• CrCl 15 - 29 mL/min (Gangguan Ginjal Berat): Dosis maksimal 25 mg per oral sekali sehari;\n• CrCl <15 mL/min (ESRD) atau Hemodialisis: Tidak direkomendasikan.`,
    hepaticDoseAdjustment: `• Gangguan Hati Ringan (Child-Pugh A): 25 mg hingga 50 mg sekali sehari;\n• Gangguan Hati Sedang (Child-Pugh B): Dosis maksimal 25 mg per oral sekali sehari;\n• Gangguan Hati Berat (Child-Pugh C): KONTRAINDIKASI / Tidak direkomendasikan.`,
    maxDoseLimit: `• Dewasa dengan fungsi ginjal normal: 50 mg per oral sekali sehari.`,
    administrationGuideline: `• TELAN TABLET UTUH DENGAN AIR PUTIH. JANGAN DIKUNYAH, DIBELAH, ATAU DIGERUS.\n• Dapat diminum dengan atau tanpa makanan pada jam yang sama setiap hari.\n• Pantau tekanan darah secara teratur (KONTRAINDIKASI bila hipertensi berat tidak terkontrol TD >=180/110 mmHg).`
  },

  'silodosin': {
    adultDosage: `• Benign Prostatic Hyperplasia (BPH / Pembesaran Prostat Jinak):\n  - 8 mg per oral sekali sehari diminum BERSAMA MAKANAN (disarankan saat makan malam atau sarapan pagi secara konsisten).`,
    pediatricDosage: `• Tidak diindikasikan untuk populasi pediatrik.`,
    geriatricDosage: `• Pasien Usia Lanjut (>=65 tahun): Dosis standar 8 mg sekali sehari bersama makanan. Tidak diperlukan penyesuaian dosis berdasarkan usia saja.`,
    renalDoseAdjustment: `• CrCl 50 - 80 mL/min (Ringan): 8 mg sekali sehari bersama makanan;\n• CrCl 30 - 49 mL/min (Gangguan Ginjal Sedang): TURUNKAN DOSIS ke 4 mg per oral sekali sehari bersama makanan;\n• CrCl <30 mL/min (Gangguan Ginjal Berat): KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Gangguan Hati Ringan hingga Sedang (Child-Pugh A/B): Tidak perlu penyesuaian dosis;\n• Gangguan Hati Berat (Child-Pugh C): KONTRAINDIKASI MUTLAK (belum ada data keamanan).`,
    maxDoseLimit: `• 8 mg per oral sekali sehari (4 mg/hari pada gangguan ginjal sedang).`,
    administrationGuideline: `• HARUS DIMINUM BERSAMA DENGAN MAKANAN untuk memastikan absorpsi yang stabil dan mengurangi fluktuasi kadar plasma.\n• Edukasi pasien mengenai efek samping umum ejakulasi retrograd (ejakulasi kering tanpa cairan sperma ke luar) yang bersifat reversibel dan tidak berbahaya.\n• Beritahu dokter mata bila akan menjalani operasi katarak terkait risiko Intraoperative Floppy Iris Syndrome (IFIS).`
  },

  'buprenorphine': {
    adultDosage: `• Nyeri Kronis Sedang - Berat (Plester Transdermal Norspan):\n  - Pasien Opioid-Naïve (Belum Pernah Opioid Kuat): Awal 5 mcg/jam plester transdermal ditempelkan pada kulit utuh sekali setiap 7 hari (ganti plester tiap 7 hari).\n  - Titrasi Dosis: Dapat ditingkatkan bertahap ke 10 mcg/jam, 15 mcg/jam, hingga 20 mcg/jam dengan interval minimal 3-7 hari antar kenaikan dosis.\n  - Dosis Maksimal Norspan: 20 mcg/jam (penggunaan 2 plester 20 mcg/jam bersamaan berisiko memperpanjang interval QTc).\n• Terapi Ketergantungan Opioid (Tablet Sublingual Subutex / Suboxone):\n  - Dosis Induksi: 2 mg hingga 4 mg sublingual saat tanda putus zat objektif (skor COWS >=12) muncul.\n  - Dosis Pemeliharaan: Dititrasi bertahap hingga rentang terapeutik standar 8 mg - 24 mg sublingual sekali sehari (Maksimal 32 mg/hari).`,
    pediatricDosage: `• Keamanan dan efektivitas plester transdermal belum ditetapkan pada anak usia <18 tahun.`,
    geriatricDosage: `• Mulai dari dosis plester terendah (5 mcg/jam); pantau fungsi respirasi dan sedasi.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada gangguan ginjal karena eliminasi dominan non-renal via hepar dan feses.`,
    hepaticDoseAdjustment: `• Gangguan Hati Berat (Child-Pugh C): KONTRAINDIKASI / Tidak direkomendasikan.`,
    maxDoseLimit: `• Norspan Patch: 20 mcg/jam per 7 hari; Subutex Sublingual: 24 - 32 mg/hari.`,
    administrationGuideline: `• Plester Norspan: Tempelkan pada kulit bersih, kering, dan tidak berbulu di area dada atas, punggung atas, atau lengan luar. Ganti tiap 7 hari dan rotasikan lokasi tempelan (jangan gunakan area yang sama dalam 3-4 minggu). HINDARI SUMBER PANAS LANGSUNG (bantal pemanas/sauna).\n• Tablet Sublingual: LETAKKAN DI BAWAH LIDAH HINGGA LARUT LENGKAP (5-10 menit). DILARANG MENELAN UTUH, MENGUNYAH, ATAU MINUM AIR saat tablet sedang larut.`
  },

  'ropinirole': {
    adultDosage: `• Penyakit Parkinson (Sediaan Lepas Lambat Requip PD 24 Jam):\n  - Dosis Awal: 2 mg per oral sekali sehari pada pagi hari selama minggu ke-1.\n  - Titrasi Bertahap: Minggu ke-2 tingkatkan ke 4 mg/hari; Minggu ke-3 tingkatkan ke 6 mg/hari; Minggu ke-4 tingkatkan ke 8 mg/hari.\n  - Dosis Pemeliharaan: 8 mg hingga 16 mg sekali sehari (Dosis Maksimal: 24 mg per oral sekali sehari).\n• Sindrom Kaki Gelisah (Restless Legs Syndrome / RLS - Sediaan IR Standar):\n  - Awal 0.25 mg per oral sekali sehari diminum 1 hingga 3 jam sebelum tidur selama hari 1-2;\n  - Hari 3-7: 0.5 mg sekali sehari; Minggu ke-2: 1 mg sekali sehari; Minggu ke-3: 1.5 mg sekali sehari; Minggu ke-4: 2 mg sekali sehari (Maksimal RLS: 4 mg/hari).`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada populasi pediatrik (<18 tahun).`,
    geriatricDosage: `• Titrasi dosis lebih lambat pada pasien lansia (>=65 tahun) karena peningkatan risiko halusinasi visual dan hipotensi postural.`,
    renalDoseAdjustment: `• CrCl >=30 mL/min: Tidak perlu penyesuaian dosis;\n• CrCl <30 mL/min tanpa Hemodialisis: Tidak direkomendasikan;\n• Pasien Hemodialisis Kronis: Awal 2 mg/hari Requip PD (Maksimal 18 mg/hari).`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI pada gangguan fungsi hati berat.`,
    maxDoseLimit: `• Parkinson: 24 mg/hari (Requip PD); Restless Legs Syndrome: 4 mg/hari.`,
    administrationGuideline: `• Tablet Requip PD 24 Jam Lepas Lambat: TELAN UTUH DENGAN SE GELAS AIR. JANGAN DIKUNYAH, DIBELAH, ATAU DIGERUS.\n• Dapat diminum dengan atau tanpa makanan (diminum bersama makanan dapat mengurangi keluhan mual awal).\n• Waspadai efek samping tertidur mendadak (sleep attacks) saat mengemudi dan gangguan kontrol impuls (judi patologis, belanja kompulsif).`
  },

  'azelastine': {
    adultDosage: `• Rinitis Alergi Musiman, Perenial, & Rinitis Vasomotor Non-Alergi:\n  - Semprot Hidung (Nasal Spray 0.1% / 137 mcg per semprot): 1 hingga 2 semprotan pada masing-masing lubang hidung dua kali sehari (pagi dan malam).\n  - Semprot Hidung 0.15% (205.5 mcg per semprot): 1 atau 2 semprotan per lubang hidung dua kali sehari ATAU 2 semprotan sekali sehari.\n• Konjungtivitis Alergi (Tetes Mata 0.05%):\n  - 1 tetes pada masing-masing mata yang terkena 2 kali sehari (tiap 12 jam).`,
    pediatricDosage: `• Rinitis Alergi Anak Usia 6 tahun hingga 11 tahun:\n  - Semprot Hidung 0.1%: 1 semprotan pada masing-masing lubang hidung dua kali sehari.\n• Rinitis Alergi Anak Usia 2 tahun hingga 5 tahun:\n  - Semprot Hidung 0.1%: 1 semprotan pada masing-masing lubang hidung dua kali sehari (di bawah pengawasan medis).\n• Tetes Mata Alergi Anak Usia >=4 tahun: 1 tetes pada masing-masing mata 2 kali sehari.`,
    geriatricDosage: `• Dosis sama dengan dewasa. Perhatikan risiko rasa kantuk ringan pada pasien usia lanjut.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis untuk sediaan semprot hidung dan tetes mata topikal.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• Semprot Hidung: Maksimal 2 semprotan per lubang hidung dua kali sehari (Total 4 semprotan per lubang hidung/24 jam).`,
    administrationGuideline: `• Sebelum pemakaian pertama, kocok dan pompa semprotan 4-6 kali ke udara hingga kabut halus keluar.\n• TEKNIK PENYEMPROTAN YANG BENAR: Duduk tegak dengan kepala sedikit menunduk ke depan. Masukkan ujung aplikator ke lubang hidung mengarah ke dinding luar hidung (ke arah telinga/sudut mata luar). Semprotkan sambil menarik napas lembut melalui hidung.\n• JANGAN MENDONGAKKAN KEPALA KE BELAKANG untuk mencegah obat mengalir ke tenggorokan dan menimbulkan rasa pahit.`
  },

  'fluticasone furoate': {
    adultDosage: `• Rinitis Alergi Musiman & Perenial (Semprot Hidung Avamys 27.5 mcg/semprot):\n  - Dosis Awal Dewasa & Remaja (>=12 tahun): 2 semprotan pada masing-masing lubang hidung sekali sehari pada jam yang sama (Dosis Total Harian: 110 mcg/hari).\n  - Dosis Pemeliharaan: Setelah gejala alergi terkontrol optimal, turunkan dosis menjadi 1 semprotan pada masing-masing lubang hidung sekali sehari (Dosis Total: 55 mcg/hari).\n• Asma Bronkial & PPOK (Inhaler Serbuk Kering Relvar Ellipta 100/25 mcg atau 200/25 mcg):\n  - 1 inhalasi per oral sekali sehari pada jam yang sama setiap hari.`,
    pediatricDosage: `• Rinitis Alergi Anak Usia 2 tahun hingga 11 tahun (Avamys Nasal Spray):\n  - Dosis Awal: 1 semprotan pada masing-masing lubang hidung sekali sehari (Total: 55 mcg/hari).\n  - Jika respons tidak adekuat, dosis dapat ditingkatkan sementara menjadi 2 semprotan per lubang hidung sekali sehari (110 mcg/hari), lalu diturunkan kembali ke 1 semprotan/hari setelah terkontrol.\n• Anak Usia <2 tahun: Keamanan dan efektivitas belum ditetapkan.`,
    geriatricDosage: `• Dosis sama dengan dewasa. Tidak diperlukan penyesuaian dosis khusus pada lansia.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada pasien gangguan fungsi ginjal.`,
    hepaticDoseAdjustment: `• Gangguan Hati Ringan-Sedang: Gunakan dengan hati-hati;\n• Gangguan Hati Berat: Paparan sistemik dapat meningkat hingga 3 kali lipat; pantau tanda supresi adrenal.`,
    maxDoseLimit: `• Semprot Hidung Dewasa: 110 mcg/hari (2 semprotan per lubang hidung/hari); Anak 2-11 th: 110 mcg/hari.`,
    administrationGuideline: `• Semprot Hidung Avamys: Kocok botol dengan kuat selama minimal 10 detik sebelum digunakan. Buka tutup pelindung, arahkan ke luar septum hidung, dan tekan tuas samping secara mantap.\n• Bersihkan ujung aplikator dengan tisu kering bersih setelah digunakan (JANGAN MENCUCI DENGAN AIR).\n• Gunakan secara teratur setiap hari karena efek antiinflamasi maksimal dicapai setelah beberapa hari pemakaian rutin.`
  },

  'lactobacillus': {
    adultDosage: `• Pencegahan & Pengobatan Diare Akut, Disbiosis Pasca-Antibiotik, & Sindrom Iritasi Usus (IBS):\n  - 1 hingga 2 sachet per oral, 2 sampai 3 kali sehari (setara 1 - 2 miliar CFU/hari).\n• Pencegahan Diare Terkait Antibiotik (AAD):\n  - 1 sachet 2-3 kali sehari dimulai bersamaan terapi antibiotik hingga 7 hari pasca antibiotik selesai.`,
    pediatricDosage: `• Diare Akut & Pemulihan Flora Usus Pediatrik (Lacto-B / L-Bio):\n  - Anak Usia >=1 tahun: 1 sachet per oral, 2 hingga 3 kali sehari.\n  - Bayi Usia <1 tahun: 1 sachet per oral, 1 hingga 2 kali sehari.\n• Dapat dicampur ke dalam susu formula atau makanan lumat pada suhu dingin/ruang.`,
    geriatricDosage: `• 1 - 2 sachet per oral, 2 kali sehari. Tidak diperlukan penyesuaian dosis khusus pada lansia.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis (bekerja intraluminal tanpa absorpsi sistemik).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• 4 sachet per hari.`,
    administrationGuideline: `• Dapat dikonsumsi langsung atau dicampurkan ke dalam air putih, susu, atau makanan lunak pada suhu ruang/dingin.\n• DILARANG MENCAMPUR DENGAN AIR PANAS ATAU MENDIDIH (>40°C) karena akan mematikan kultur probiotik hidup.\n• Konsumsi bersama makanan atau segera setelah makan.\n• BERI JEDA WAKTU MINIMAL 2 JAM dari pemberian antibiotik oral apa pun.`
  },

  'oralit': {
    adultDosage: `• Pencegahan & Terapi Dehidrasi Diare Akut / Gastroenteritis:\n  - 1 hingga 2 gelas (200 - 400 mL larutan Oralit) per oral setiap kali buang air besar cair.\n  - Target Rehidrasi Ringan-Sedang 4 Jam Pertama: 2200 - 4000 mL sesuai derajat dehidrasi.`,
    pediatricDosage: `• Diare Akut Pediatrik (Formula Rendah Osmolaritas WHO):\n  - Anak Usia <1 tahun: 50 - 100 mL (1/4 - 1/2 gelas) setiap kali BAB cair.\n  - Anak Usia 1 - 4 tahun: 100 - 200 mL (1/2 - 1 gelas) setiap kali BAB cair.\n  - Anak Usia >=5 tahun: 200 - 300 mL (1 - 1,5 gelas) setiap kali BAB cair.\n• Diberikan perlahan dengan sendok makan setiap 1-2 menit pada anak balita.`,
    geriatricDosage: `• Diberikan sesuai volume cairan yang hilang. Pantau tanda kelebihan cairan pada pasien lansia dengan gagal jantung kongestif atau penyakit ginjal kronik.`,
    renalDoseAdjustment: `• Gunakan dengan pengawasan ketat pada gangguan fungsi ginjal berat / anuria (pantau risiko hiperkalemia dari kandungan KCl).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• Diberikan ad libitum sesuai toleransi dan volume kehilangan cairan pasien.`,
    administrationGuideline: `• Larutkan 1 sachet ke dalam TEPAT 200 mL air putih matang (Gunakan gelas ukur standar).\n• JANGAN melarutkan bubuk oralit dengan susu, jus buah manis, teh manis, atau sup kaldu kental karena akan merusak keseimbangan osmolaritas larutan.\n• Larutan yang sudah dibuat harus dihabiskan atau dibuang setelah 24 jam.`
  },

  'zinc-sulfate': {
    adultDosage: `• Suplementasi Defisiensi Seng Dewasa:\n  - 20 hingga 50 mg elemental zinc (setara 50 - 125 mg Zinc Sulfate) per oral sekali sehari sesudah makan.`,
    pediatricDosage: `• Terapi Diare Anak Standar Nasional Kemenkes RI / WHO (Diberikan 10-14 Hari Berturut-turut):\n  - Bayi Usia 2 hingga 6 bulan: 10 mg elemental zinc per oral sekali sehari selama 10 hari penuh.\n  - Bayi/Anak Usia 6 bulan hingga 5 tahun: 20 mg elemental zinc per oral sekali sehari selama 10 hari penuh.\n• PENTING: Lanjutkan pemberian selama 10 hari meskipun diare anak sudah berhenti.`,
    geriatricDosage: `• 20 mg sekali sehari sesudah makan.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis pada terapi durasi pendek (10 hari).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• Pediatrik: 20 mg/hari; Dewasa: 50 mg/hari.`,
    administrationGuideline: `• Tablet dispersibel larut dalam 5 mL (1 sendok teh) air matang atau ASI dalam beberapa detik.\n• Diminum bersama makanan atau segera sesudah makan untuk mencegah rasa mual.\n• Beri jeda minimal 2 jam dari konsumsi tablet Fe (Zat Besi), kalsium tinggi, atau antibiotik kuinolon.`
  },

  'eperisone': {
    adultDosage: `• Hipertonia Muskuloskeletal, Kaku Leher (Sindrom Servikal), Periartritis Bahu, & Nyeri Punggung Bawah (LBP):\n  - 50 mg per oral 3 kali sehari sesudah makan.\n  - Dosis disesuaikan dengan intensitas keparahan gejala klinis dan respons pasien.`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada populasi pediatrik (tidak direkomendasikan).`,
    geriatricDosage: `• 50 mg per oral 2 hingga 3 kali sehari. Disarankan memulai dengan dosis lebih rendah pada lansia yang frail.`,
    renalDoseAdjustment: `• Gunakan dengan kehati-hatian pada gangguan ginjal sedang-berat.`,
    hepaticDoseAdjustment: `• Gunakan dengan kehati-hatian; lakukan pemantauan enzim transaminase hepar (AST/ALT).`,
    maxDoseLimit: `• 150 mg per hari (3 tablet 50 mg).`,
    administrationGuideline: `• Wajib diminum segera SESUDAH MAKAN untuk meminimalkan efek samping dispepsia dan pusing.\n• Waspadai rasa kantuk; hindari mengoperasikan mesin atau mengemudi.`
  },

  'flunarizine': {
    adultDosage: `• Profilaksis Migrain (dengan/tanpa aura) & Terapi Simtomatik Vertigo Vestibular:\n  - Dewasa Usia <65 tahun: 5 - 10 mg per oral sekali sehari pada malam hari sebelum tidur.\n  - Evaluasi efikasi klinis setelah 2 bulan pemakaian (hentikan bila tidak ada penurunan frekuensi migrain).`,
    pediatricDosage: `• Remaja Usia >12 tahun: 5 mg per oral sekali sehari pada malam hari (di bawah supervisi spesialis neurologi).`,
    geriatricDosage: `• Usia >=65 tahun: 5 mg per oral sekali sehari pada malam hari sebelum tidur. Waspadai timbulnya gejala ekstrapiramidal dan depresi.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Metabolisme hepar ekstensif; gunakan dengan hati-hati pada gangguan fungsi hati.`,
    maxDoseLimit: `• 10 mg per hari.`,
    administrationGuideline: `• Minum pada malam hari sebelum tidur dengan segelas air untuk mengurangi kantuk siang hari.\n• HINDARI konsumsi alkohol atau obat sedatif lain secara bersamaan.`
  },

  'tizanidine': {
    adultDosage: `• Spasme Otot Akut yang Nyeri (Sindrom Servikal, Lumbago) & Spastisitas Neurologis Kronis:\n  - Dosis Awal: 2 mg per oral 3 kali sehari.\n  - Titrasi: Dapat ditingkatkan bertahap sebesar 2 mg tiap 3-4 hari sesuai respons klinis (rentang lazim: 12 - 24 mg/hari dalam 3-4 dosis terbagi).`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada anak <18 tahun.`,
    geriatricDosage: `• Awal 2 mg per oral sekali sehari pada malam hari; titrasi perlahan karena penurunan klirens ginjal fisiologis dan risiko hipotensi.`,
    renalDoseAdjustment: `• CrCl < 25 mL/min: Awal 2 mg sekali sehari pada malam hari; titrasi dosis secara individual dan pantau ketat.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI pada gangguan hepar berat. Pantau tes fungsi hepar rutin.`,
    maxDoseLimit: `• 36 mg per hari (Dosis tunggal maksimal: 16 mg).`,
    administrationGuideline: `• JAGA KONSISTENSI PEMBERIAN: Selalu konsumsi bersama makanan ATAU selalu perut kosong (makanan mengubah bioavailabilitas secara bermakna).\n• JANGAN menghentikan terapi secara mendadak (lakukan tapering off untuk mencegah takikardia dan lonjakan hipertensi rebound).`
  },

  'ergotamine-caffeine': {
    adultDosage: `• Terapi Serangan Migrain Akut & Sakit Kepala Kluster Vaskular (Ericaf / Cafergot):\n  - Dosis Awal: 1 hingga 2 tablet saat tanda/gejala pertama serangan nyeri muncul.\n  - Jika nyeri berlanjut, dapat diulang 1 tablet tiap 30 menit.\n  - MAKSIMAL: 4 tablet per serangan/24 jam; MAKSIMAL 6 - 10 tablet per minggu.`,
    pediatricDosage: `• Tidak direkomendasikan pada anak-anak.`,
    geriatricDosage: `• Hindari penggunaan pada lansia karena prevalensi tinggi penyakit vaskular perifer dan kardiovaskular aterosklerotik okult.`,
    renalDoseAdjustment: `• KONTRAINDIKASI MUTLAK pada gangguan ginjal sedang hingga berat.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI MUTLAK pada gangguan fungsi hati berat.`,
    maxDoseLimit: `• Maksimal 4 tablet per hari; maksimal 10 tablet per minggu.`,
    administrationGuideline: `• Minum segera pada tanda awal serangan migrain (jangan menunggu nyeri memuncak parah).\n• Telan utuh dengan segelas air putih.\n• JANGAN PERNAH DIGUNAKAN SEBAGAI TERAPI PENCEGAHAN HARIAN RUTIN.`
  },

  'permethrin': {
    adultDosage: `• Terapi Skabies (Kudis) Sarcoptes scabiei (Krim 5% - Scabimite):\n  - Oleskan tipis merata ke seluruh permukaan kulit tubuh dari leher ke bawah hingga ujung jari kaki (Gunakan 1 tube 30 gram untuk dewasa).\n  - Diamkan selama 8 hingga 14 jam (semalaman), lalu mandi bilas hingga bersih.\n  - Jika perlu, aplikasi dapat diulang 7 hari kemudian.`,
    pediatricDosage: `• Anak Usia >=2 bulan: Dioleskan ke seluruh tubuh termasuk kulit kepala, dahi, pelipis, dan leher (hindari area sekitar mata dan mulut). Diamkan 8-12 jam lalu bilas.\n• Bayi <2 bulan: Tidak direkomendasikan.`,
    geriatricDosage: `• Sama dengan dewasa; pastikan lipatan kulit, sela jari, dan area genital terolesi merata.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis (absorpsi sistemik perkutan <0.5%).`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• Aplikasi tunggal per sesi terapi (maksimal diulang 1 kali pada hari ke-7).`,
    administrationGuideline: `• Oleskan pada kulit yang dingin dan kering pada malam hari (JANGAN sesaat setelah mandi air hangat).\n• Pastikan sela jari tangan/kaki, lipatan ketiak, dan bawah kuku terolesi.\n• Cuci seluruh sprei, baju, dan handuk dengan air panas (>60°C). Obati seluruh anggota keluarga serumah secara serempak.`
  },

  'mupirocin': {
    adultDosage: `• Infeksi Bakteri Kulit Primer/Sekunder (Impetigo, Folikulitis, Furunkel, Luka Terinfeksi S. aureus / MRSA):\n  - Oleskan tipis pada area lesi yang terinfeksi 3 kali sehari selama 7 hingga 10 hari.`,
    pediatricDosage: `• Anak Usia >=2 bulan: Dosis sama dengan dewasa (oleskan tipis 3 kali sehari selama 7-10 hari).`,
    geriatricDosage: `• Dosis sama dengan dewasa. Hati-hati bila digunakan pada luka bakar terbuka luas jika terdapat penurunan fungsi ginjal (kandungan basis PEG).`,
    renalDoseAdjustment: `• Hindari pemakaian sediaan salep basis PEG pada luka terbuka luas pasien gagal ginjal.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal durasi terapi 10 hari berturut-turut.`,
    administrationGuideline: `• Bersihkan dan keringkan area lesi sebelum dioleskan.\n• Cuci tangan sebelum dan sesudah mengoleskan obat.\n• Area luka dapat ditutup dengan perban kassa steril jika diperlukan.`
  },

  'oxymetazoline': {
    adultDosage: `• Kongesti Hidung Akut / Rinitis Alergi / Sinusitis (Semprot/Tetes 0.05%):\n  - 2 hingga 3 semprotan/tetes pada masing-masing lubang hidung, 2 kali sehari (tiap 10-12 jam).\n  - DURASI PENGGUNAAN MAKSIMAL 3 HINGGA 5 HARI BERTURUT-TURUT.`,
    pediatricDosage: `• Anak Usia 6 - 12 tahun (0.05%): 2 semprotan tiap 12 jam (maksimal 3 hari).\n• Anak Usia 2 - 5 tahun (0.025% sediaan anak): 2 - 3 tetes tiap 12 jam.\n• Bayi <2 tahun: Hindari penggunaan.`,
    geriatricDosage: `• Dosis sama dengan dewasa. Pantau tekanan darah pada lansia dengan riwayat hipertensi.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• 2 kali sehari; DURASI MAKSIMAL 3 - 5 HARI (Pencegahan Rhinitis Medicamentosa).`,
    administrationGuideline: `• Bersihkan hidung perlahan sebelum pemakaian.\n• Duduk tegak dengan kepala sedikit menunduk ke depan, semprotkan ke arah dinding luar hidung sambil menarik napas perlahan.\n• JANGAN gunakan lebih dari 5 hari berturut-turut.`
  },

  'timolol-ophthalmic': {
    adultDosage: `• Glaukoma Sudut Terbuka Kronis & Hipertensi Okular (Cendo Timol 0.25% / 0.5%):\n  - Dosis Awal: 1 tetes larutan 0.25% pada mata yang sakit, 2 kali sehari (pagi dan malam).\n  - Jika respons belum adekuat: Ganti ke larutan 0.5% 1 tetes 2 kali sehari.\n  - Dosis Pemeliharaan: Turunkan ke 1 tetes sekali sehari jika tekanan intraokular (TIO) telah terkontrol stabil.`,
    pediatricDosage: `• Gunakan konsentrasi terendah (0.25%) 1 tetes dua kali sehari di bawah pengawasan dokter spesialis mata pediatrik. Wajib oklusi punctum lakrimalis.`,
    geriatricDosage: `• Dosis sama dengan dewasa. Pantau ketat denyut jantung (waspadai bradikardia).`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati pada sirosis hepar berat.`,
    maxDoseLimit: `• 1 tetes per mata, dua kali sehari.`,
    administrationGuideline: `• TEKNIK OKLUSI NASOLAKRIMALIS: Setelah penetesan, pejamkan mata dan tekan sudut mata bagian dalam dekat hidung selama 1-2 menit dengan jari bersih untuk mencegah penyerapan sistemik.\n• Lepas lensa kontak sebelum penetesan; pasang kembali minimal 15 menit setelahnya.`
  },

  'tobramycin-ophthalmic': {
    adultDosage: `• Infeksi Bakterial Eksternal Mata (Konjungtivitis, Blefaritis, Keratitis Bakterial):\n  - Infeksi Ringan-Sedang: 1 hingga 2 tetes pada mata yang sakit tiap 4 jam selama 7-10 hari.\n  - Infeksi Berat: 2 tetes pada mata yang sakit tiap 1 jam hingga membaik, lalu kurangi frekuensi.`,
    pediatricDosage: `• Anak Usia >=2 bulan: Dosis sama dengan dewasa.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak diperlukan penyesuaian dosis untuk sediaan tetes mata topikal.`,
    hepaticDoseAdjustment: `• Tidak diperlukan penyesuaian dosis.`,
    maxDoseLimit: `• Durasi terapi maksimal 7-10 hari berturut-turut.`,
    administrationGuideline: `• Cuci tangan sebelum penetesan. Tarik kelopak mata bawah membentuk kantung dan teteskan obat.\n• JANGAN menyentuhkan ujung penetes ke bola mata, bulu mata, atau kulit untuk menjaga sterilitas sediaan.`
  },

  'trimetazidine': {
    adultDosage: `• Terapi Tambahan Angina Pektoris Stabil Dewasa (Vastarel MR 35 mg):\n  - 1 tablet (35 mg) per oral dua kali sehari (saat sarapan dan makan malam bersama makanan).\n  - Evaluasi efikasi terapi setelah 3 bulan pemakaian.`,
    pediatricDosage: `• KONTRAINDIKASI pada anak dan remaja usia <18 tahun.`,
    geriatricDosage: `• Lansia dengan CrCl 30 - 60 mL/min: Turunkan dosis menjadi 1 tablet 35 mg sekali sehari pada pagi hari saat sarapan. Pantau gejala parkinsonisme.`,
    renalDoseAdjustment: `• CrCl 30 - 60 mL/min: 35 mg sekali sehari pada pagi hari;\n• CrCl < 30 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati pada gangguan fungsi hati sedang-berat.`,
    maxDoseLimit: `• 70 mg per hari (2 tablet MR 35 mg).`,
    administrationGuideline: `• Wajib diminum BERSAMA MAKANAN pada saat sarapan pagi dan makan malam.\n• Tablet Modified Release (MR) HARUS DITELAN UTUH DENGAN AIR. JANGAN DIKUNYAH, DIKUNYAH, ATAU DIGERUS.`
  },

  'ampicillin': {
    adultDosage: `• Sepsis & Infeksi Sistemik Berat: 1 - 2 g IV/IM tiap 4 hingga 6 jam.\n• Meningitis Bakterial (Listeria/GBS): 2 g IV tiap 4 jam.\n• Infeksi Saluran Kemih & Saluran Napas (Oral): 500 mg per oral tiap 6 jam saat perut kosong.`,
    pediatricDosage: `• Sepsis Neonatorum (Usia <7 hari): 50 - 100 mg/kgBB/hari IV terbagi tiap 12 jam (kombinasi Gentamicin).\n• Sepsis Neonatorum (Usia >7 hari): 100 - 150 mg/kgBB/hari IV terbagi tiap 8 jam.\n• Anak >1 bulan: 100 - 200 mg/kgBB/hari IV terbagi tiap 6 jam.`,
    geriatricDosage: `• Sesuaikan interval pemberian berdasarkan klirens kreatinin lansia.`,
    renalDoseAdjustment: `• CrCl 10 - 50 mL/min: Berikan tiap 6 - 12 jam;\n• CrCl < 10 mL/min: Berikan tiap 12 - 24 jam.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 12 gram per hari (injeksi IV).`,
    administrationGuideline: `• Oral: Diminum saat PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan).\n• Injeksi IV: Rekonstitusi hanya dengan NaCl 0.9% atau WFI. HINDARI cairan infus Dextrose 5% untuk stabilitas berkepanjangan.`
  },

  'atenolol': {
    adultDosage: `• Hipertensi Esensial: Dosis awal 25 - 50 mg per oral sekali sehari. Dapat ditingkatkan hingga 100 mg/hari jika belum terkontrol.\n• Angina Pektoris Stabil: 50 - 100 mg per oral sekali sehari.`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada populasi anak.`,
    geriatricDosage: `• Awal 25 mg per oral sekali sehari; titrasi perlahan sesuai laju filtrasi glomerulus.`,
    renalDoseAdjustment: `• CrCl 15 - 35 mL/min: Maksimal 50 mg/hari;\n• CrCl < 15 mL/min: Maksimal 25 mg/hari (atau 50 mg tiap 48 jam).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (eliminasi ginjal).`,
    maxDoseLimit: `• 100 mg per hari.`,
    administrationGuideline: `• Minum secara teratur tiap pagi pada jam yang sama.\n• HINDARI PENGHENTIAN MENDADAK (lakukan penurunan bertahap 1-2 minggu untuk mencegah iskemia miokard rebound).`
  },

  'artesunate': {
    adultDosage: `• Terapi Gawat Darurat Malaria Berat (Standar Kemenkes RI & WHO):\n  - Jam ke-0: 2.4 mg/kgBB IV bolus lambat.\n  - Jam ke-12: 2.4 mg/kgBB IV bolus lambat.\n  - Jam ke-24: 2.4 mg/kgBB IV bolus lambat.\n  - Selanjutnya: 2.4 mg/kgBB IV sekali sehari hingga pasien mampu minum per oral (minimal 3 dosis injeksi).\n  - Lanjutkan dengan 1 kurus penuh ACT oral (DHP + Primakuin) selama 3 hari.`,
    pediatricDosage: `• Anak BB <20 kg: 3.0 mg/kgBB IV/IM pada jam 0, 12, 24, lalu tiap 24 jam.\n• Anak BB >=20 kg: 2.4 mg/kgBB IV/IM pada jam 0, 12, 24, lalu tiap 24 jam.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat keseimbangan cairan dan fungsi ginjal.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Dosis sesuai berat badan (minimal 3 dosis IV pada 24 jam pertama).`,
    administrationGuideline: `• Larutkan serbuk artesunat dengan ampul pelarut Natrium Bikarbonat 5% hingga larut sempurna, lalu encerkan dengan 5 mL NaCl 0.9% atau Dextrose 5% sebelum disuntikkan secara IV bolus lambat (1-2 menit).`
  },

  'acetazolamide': {
    adultDosage: `• Glaukoma Sudut Tertutup Akut: 250 - 500 mg per oral dosis awal, dilanjutkan 250 mg tiap 6 jam.\n• Pencegahan Acute Mountain Sickness (AMS): 125 mg dua kali sehari, dimulai 24 jam sebelum pendakian dan dilanjutkan hingga 48 jam di ketinggian.`,
    pediatricDosage: `• Glaukoma Pediatrik: 10 - 15 mg/kgBB/hari per oral terbagi tiap 6 - 8 jam.`,
    geriatricDosage: `• Awali dengan dosis rendah; pantau elektrolit kalium dan natrium.`,
    renalDoseAdjustment: `• CrCl 10 - 50 mL/min: Berikan tiap 12 jam;\n• CrCl < 10 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI pada sirosis hepar (risiko ensefalopati).`,
    maxDoseLimit: `• 1000 mg per hari.`,
    administrationGuideline: `• Minum bersama makanan untuk mengurangi iritasi lambung.\n• Pastikan asupan cairan cukup (minimal 2 L/hari) untuk mencegah pembentukan batu ginjal kalsium fosfat.`
  },

  'human-albumin': {
    adultDosage: `• Hipoalbuminemia Berat (Albumin <2.0 - 2.5 g/dL) & Edema Anasarka Refrakter:\n  - 50 - 100 mL Albumin 20% atau 25% infus IV lambat (kecepatan 1 - 2 mL/menit).\n• Pasca Parasentesis Asites Volume Besar (>5 L) pada Sirosis:\n  - 8 gram Albumin intravena untuk setiap 1 liter cairan asites yang dikeluarkan.`,
    pediatricDosage: `• Syok Hipovolemik / Hipoalbuminemia: 0.5 - 1.0 g/kgBB IV perlahan.`,
    geriatricDosage: `• Dosis sama dengan dewasa dengan pemantauan ketat kardiopulmonal terhadap risiko edema paru hipervolemik.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian; pantau diuresis.`,
    hepaticDoseAdjustment: `• Merupakan indikasi terapi suportif utama sirosis dekompensata.`,
    maxDoseLimit: `• Maksimal 2 g/kgBB per 24 jam.`,
    administrationGuideline: `• Infus IV lambat (kecepatan sediaan 20% maksimal 1-2 mL/menit).\n• DILARANG MENGENCERKAN DENGAN WATER FOR INJECTION (memicu hemolisis masif mematikan akibat hipotonisitas).`
  },

  'ibandronic-acid': {
    adultDosage: `• Terapi & Pencegahan Osteoporosis Pasca-Menopause:\n  - Tablet Oral: 150 mg per oral SATU KALI SEBULAN pada tanggal yang sama setiap bulan.\n  - Injeksi IV: 3 mg IV bolus lambat (15-30 detik) setiap 3 bulan sekali.`,
    pediatricDosage: `• Tidak diindikasikan untuk anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa jika CrCl >= 30 mL/min.`,
    renalDoseAdjustment: `• CrCl < 30 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 150 mg per bulan (oral) atau 3 mg per 3 bulan (injeksi IV).`,
    administrationGuideline: `• PROTOKOL TEGAK 60 MENIT: Minum pagi hari saat perut kosong hanya dengan segelas penuh air putih biasa (180-240 mL). DILARANG berbaring minimal 60 menit setelah minum obat.`
  },

  'pipemidic-acid': {
    adultDosage: `• Infeksi Saluran Kemih (Sistitis, Pielonefritis Tanpa Komplikasi):\n  - 400 mg per oral dua kali sehari (tiap 12 jam) sesudah makan selama 7 - 10 hari.`,
    pediatricDosage: `• KONTRAINDIKASI pada anak dan remaja usia <18 tahun.`,
    geriatricDosage: `• 400 mg 1-2 kali sehari sesuai CrCl.`,
    renalDoseAdjustment: `• CrCl 10 - 30 mL/min: 400 mg sekali sehari;\n• CrCl < 10 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati pada sirosis hepar.`,
    maxDoseLimit: `• 800 mg per hari.`,
    administrationGuideline: `• Minum SESUDAH MAKAN dengan segelas air putih. Perbanyak minum air putih (minimal 2-2.5 L/hari). Lindungi kulit dari matahari terik.`
  },

  'retinoic-acid': {
    adultDosage: `• Acne Vulgaris (Jerawat Komedonal & Papulopustular) & Fotoaging Kulit:\n  - Oleskan tipis-tipis seukuran biji kacang polong (pea-sized) sekali sehari pada MALAM HARI sebelum tidur ke seluruh wajah yang telah dibersihkan.`,
    pediatricDosage: `• Anak usia >=12 tahun: Dosis sama dengan dewasa. Anak <12 tahun: Belum ditetapkan.`,
    geriatricDosage: `• Gunakan konsentrasi terendah (0.025%) pada kulit lansia yang kering.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 1 kali aplikasi per malam hari.`,
    administrationGuideline: `• Oleskan hanya pada malam hari saat kulit kering (tunggu 20 menit setelah cuci muka). Hindari area mata dan sudut bibir. Wajib tabir surya di siang hari. KONTRAINDIKASI KEHAMILAN.`
  },

  'acetic-acid': {
    adultDosage: `• Otitis Eksterna Akut (Swimmer's Ear - Tetes Telinga 2%):\n  - 3 hingga 5 tetes ke liang telinga yang sakit tiap 4 - 6 jam selama 7 hari.\n• Skrining Kanker Serviks (Inspeksi Visual Asam Asetat / IVA Test Kemenkes RI):\n  - Larutan 3-5% dioleskan pada portio serviks; evaluasi lesi putih acetowhite setelah 1 menit.`,
    pediatricDosage: `• Anak usia >=3 tahun: 3-4 tetes tiap 6 jam di bawah petunjuk dokter THT.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 4 kali sehari pada liang telinga.`,
    administrationGuideline: `• Hangatkan botol di telapak tangan 1-2 menit sebelum diteteskan ke telinga. Miringkan kepala 3-5 menit setelah penetesan.`
  },

  'bacitracin-polymyxin': {
    adultDosage: `• Infeksi Bakteri Kulit Superfisial, Impetigo, Luka Bakar Minor, & Perawatan Luka (Nebacetin / Enbacin):\n  - Bersihkan luka dan oleskan tipis salep atau taburkan serbuk 2 hingga 3 kali sehari.`,
    pediatricDosage: `• Anak usia >=2 tahun: Dosis sama dengan dewasa.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Hindari pemakaian pada luka terbuka yang sangat luas pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Durasi maksimal pemakaian 7 hari berturut-turut.`,
    administrationGuideline: `• Bersihkan area lesi sebelum dioleskan. Dapat ditutup kassa steril.`
  },

  'antihemorrhoid-fdc': {
    adultDosage: `• Hemoroid Interna/Eksterna Akut & Fisura Ani (Borraginol-N / Anusol):\n  - Suppositoria: Masukkan 1 suppositoria ke dalam anus 1 - 2 kali sehari (pagi dan malam sebelum tidur sesudah BAB).\n  - Salep: Oleskan tipis pada anus 2 - 3 kali sehari.`,
    pediatricDosage: `• Tidak direkomendasikan untuk anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 2-3 kali sehari; batasi durasi pengobatan hingga 7-14 hari.`,
    administrationGuideline: `• Masukkan suppositoria dalam posisi tidur miring setelah buang air besar. Konsumsi banyak serat dan air putih.`
  },

  'salicylic-acid-topical': {
    adultDosage: `• Mata Ikan (Clavus), Kalus (Kapalan Tebal), & Kutil Kulit (Kutilos / Callusol):\n  - Rendam lesi dalam air hangat 5 menit, keringkan. Oleskan cairan/salep HANYA TEPAT PADA MATA IKAN/KUTIL sekali sehari pada malam hari.`,
    pediatricDosage: `• Anak usia >=6 tahun: Gunakan dengan pengawasan orang tua. Balita: Tidak direkomendasikan.`,
    geriatricDosage: `• KONTRAINDIKASI bila ada ulkus diabetik atau insufisiensi vaskular perifer.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian pada lesi terbatas.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 1 kali aplikasi per malam hari.`,
    administrationGuideline: `• HANYA UNTUK OBAT LUAR. Oleskan vaselin pada kulit normal sekitar untuk melindungi dari iritasi cairan asam.`
  },

  'insulin-detemir': {
    adultDosage: `• Kontrol Glikemia Basal Diabetes Melitus (Levemir FlexPen):\n  - DM Tipe 2 (Belum Pernah Dapat Insulin): 10 Unit (atau 0.1 - 0.2 Unit/kgBB) subkutan sekali sehari pada malam hari atau waktu makan malam, dititrasi tiap 3-4 hari berdasarkan target GDP.\n  - DM Tipe 1: Digunakan sebagai insulin basal (sekitar 40-50% dari kebutuhan insulin total harian) 1-2 kali sehari dikombinasikan insulin prandial.`,
    pediatricDosage: `• Anak usia >=2 tahun: Dosis individual subkutan.`,
    geriatricDosage: `• Titrasi konservatif untuk mencegah hipoglikemia nocturnal.`,
    renalDoseAdjustment: `• Kebutuhan insulin menurun pada gagal ginjal; monitor glukosa darah mandiri lebih sering.`,
    hepaticDoseAdjustment: `• Kebutuhan insulin dapat menurun pada sirosis hepar.`,
    maxDoseLimit: `• Disesuaikan secara individual berdasarkan target glikemik.`,
    administrationGuideline: `• HANYA UNTUK SUNTIKAN SUBKUTAN. JANGAN DISUNTIKKAN SECARA IV/IM. JANGAN MENCAMPUR DENGAN INSULIN LAIN DALAM SATU SPUIT.`
  },

  'insulin-glulisine': {
    adultDosage: `• Kontrol Hiperglikemia Prandial Saat Makan (Apidra SoloStar):\n  - Diberikan secara subkutan 0 hingga 15 menit SEBELUM MAKAN atau segera SESUDAH MAKAN.\n  - Dosis disesuaikan dengan jumlah karbohidrat makanan (biasanya 5 - 10 Unit per kali makan besar).`,
    pediatricDosage: `• Anak usia >=6 tahun: Subkutan 0-15 menit sebelum atau sesudah makan.`,
    geriatricDosage: `• Titrasi hati-hati; waspada hipoglikemia unawareness.`,
    renalDoseAdjustment: `• Kebutuhan insulin menurun pada gagal ginjal.`,
    hepaticDoseAdjustment: `• Kebutuhan insulin dapat menurun pada gangguan fungsi hati.`,
    maxDoseLimit: `• Disesuaikan secara individual.`,
    administrationGuideline: `• Suntikkan subkutan 0-15 menit sebelum makan atau segera setelah makan. Pastikan makanan telah siap sebelum penyuntikan.`
  },

  'insulin-lispro': {
    adultDosage: `• Kontrol Hiperglikemia Prandial Saat Makan (Humalog KwikPen):\n  - Diberikan secara subkutan dalam waktu 15 menit SEBELUM MAKAN atau segera sesudah makan.\n  - Dosis dihitung berdasarkan rasio insulin terhadap karbohidrat (I:C ratio).`,
    pediatricDosage: `• Anak usia >=3 tahun: Diberikan secara subkutan 0-15 menit sebelum makan atau segera sesudah makan.`,
    geriatricDosage: `• Disesuaikan secara individual dengan target aman.`,
    renalDoseAdjustment: `• Kebutuhan insulin menurun pada gagal ginjal.`,
    hepaticDoseAdjustment: `• Kebutuhan insulin dapat menurun pada gangguan hepar.`,
    maxDoseLimit: `• Disesuaikan secara individual.`,
    administrationGuideline: `• Suntikkan subkutan 15 menit sebelum makan pada dinding perut, paha, atau lengan atas. Rotasikan lokasi suntikan.`
  },

  'insulin-biphasic': {
    adultDosage: `• Terapi Insulin Campuran Premix DM Tipe 2 (Humalog Mix 50/50, Novomix 30, Ryzodeg 70/30):\n  - Diberikan secara subkutan 1 - 2 kali sehari segera sebelum makan utama (sarapan pagi dan makan malam).\n  - Ryzodeg 70/30: Dosis awal 10 Unit per hari bersama makanan utama, titrasi bertahap tiap minggu.`,
    pediatricDosage: `• Belum ditetapkan keamanannya pada anak.`,
    geriatricDosage: `• Titrasi konservatif; monitor glukosa darah.`,
    renalDoseAdjustment: `• Kebutuhan insulin menurun pada gagal ginjal.`,
    hepaticDoseAdjustment: `• Kebutuhan insulin dapat menurun pada gangguan hepar.`,
    maxDoseLimit: `• Disesuaikan secara individual.`,
    administrationGuideline: `• Untuk suspensi berawan (Novomix / Humalog Mix), bolak-balikkan pena 10-20 kali hingga putih keruh merata sebelum suntik. Suntikkan subkutan segera sebelum makan.`
  },

  'anti-d-immunoglobulin': {
    adultDosage: `• Pencegahan Sensitisasi Rhesus Maternal (HyperRHO S/D / Rhesonativ):\n  - Pasca Persalinan Bayi Rh-Positif: 300 mcg (1500 IU) IM/IV diberikan SECEPATNYA DALAM WAKTU 72 JAM pasca persalinan.\n  - Profilaksis Antenatal Rutin: 300 mcg IM pada usia kehamilan 28 minggu.\n  - Pasca Abortus / KET / Amniosentesis (Usia <12 minggu): 50 mcg (250 IU) IM;\n  - Pasca Abortus / Trauma Abdomen (Usia >=12 minggu): 300 mcg (1500 IU) IM.`,
    pediatricDosage: `• Tidak diindikasikan untuk anak-anak (kecuali terapi ITP).`,
    geriatricDosage: `• Tidak diindikasikan.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Disesuaikan dengan volume perdarahan fetomaternal (tes Kleihauer-Betke).`,
    administrationGuideline: `• Suntikkan secara INTRAMUSKULAR (IM) pada otot deltoid ibu. JANGAN menyuntikkan obat ini kepada bayi baru lahir. Wajib diberikan dalam 72 jam.`
  },

  'abacavir': {
    adultDosage: `• Terapi Kombinasi Antiretroviral (cART) Infeksi HIV-1 Dewasa (Ziagen):\n  - 600 mg per oral sekali sehari (atau 300 mg per oral dua kali sehari) dikombinasikan dengan ARV lain.`,
    pediatricDosage: `• Anak usia >=3 bulan (BB >=25 kg): 600 mg sekali sehari atau 300 mg dua kali sehari.\n• Anak BB <25 kg: 8 mg/kgBB per oral dua kali sehari (maks 300 mg/dosis).`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Child-Pugh A: 200 mg dua kali sehari;\n• Child-Pugh B/C: KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• 600 mg per hari.`,
    administrationGuideline: `• WAJIB SKRINING HLA-B*5701 SEBELUM MEMULAI TERAPI (KONTRAINDIKASI BILA POSITIF). Dapat diminum bersama atau tanpa makanan. JANGAN PERNAH RECHALLENGE bila pernah timbul gejala alergi.`
  },

  'afatinib': {
    adultDosage: `• Kanker Paru Karsinoma Bukan Sel Kecil (NSCLC) Mutasi EGFR Positif (Giotrif):\n  - 40 mg per oral sekali sehari diminum saat PERUT KOSONG (minimal 1 jam sebelum makan atau 2 jam sesudah makan).\n  - Dosis dapat diturunkan tiap 10 mg (ke 30 mg lalu 20 mg/hari) bila terjadi toksisitas diare/ruam kulit derajat >=3.`,
    pediatricDosage: `• Belum ditetapkan keamanannya pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat diare dan hidrasi.`,
    renalDoseAdjustment: `• CrCl 30 - 50 mL/min: Awali dengan 30 mg sekali sehari;\n• CrCl < 30 mL/min: Tidak direkomendasikan.`,
    hepaticDoseAdjustment: `• Gangguan hepar berat: Tidak direkomendasikan.`,
    maxDoseLimit: `• 50 mg per hari.`,
    administrationGuideline: `• Wajib diminum saat PERUT KOSONG (1 jam sebelum sarapan). Telan utuh dengan air putih. Selalu siapkan loperamid untuk penanganan dini diare.`
  },

  'alectinib': {
    adultDosage: `• Kanker Paru Karsinoma Bukan Sel Kecil (NSCLC) Mutasi ALK Positif (Alecensa):\n  - 600 mg (4 kapsul 150 mg) per oral dua kali sehari BERSAMA MAKANAN (total 1200 mg per hari).`,
    pediatricDosage: `• Belum ditetapkan keamanannya pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor denyut jantung.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian pada gangguan ginjal ringan-sedang.`,
    hepaticDoseAdjustment: `• Gangguan hepar berat (Child-Pugh C): 450 mg per oral dua kali sehari bersama makanan.`,
    maxDoseLimit: `• 1200 mg per hari.`,
    administrationGuideline: `• WAJIB DIMINUM BERSAMA MAKANAN pada pagi dan malam hari. Telan kapsul utuh, jangan dibuka atau dikunyah.`
  },

  'asparaginase': {
    adultDosage: `• Leukemia Limfoblastik Akut (ALL) Dewasa (Leunase):\n  - 6,000 hingga 10,000 IU/m2 luas permukaan tubuh (LPT) intramuskular (IM) atau infus intravena lambat 3 kali seminggu sesuai protokol kemoterapi resmi.`,
    pediatricDosage: `• ALL Pediatrik (Protokol Induksi Remisi Nasional):\n  - 6,000 - 10,000 IU/m2 LPT IM 3 kali seminggu (misal: Senin, Rabu, Jumat) selama 3-4 minggu.`,
    geriatricDosage: `• Dosis individual ketat; risiko pankreatitis dan koagulopati sangat tinggi.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tunda terapi jika bilirubin total >3 kali batas atas normal.`,
    maxDoseLimit: `• Sesuai protokol kemoterapi hemato-onkologi.`,
    administrationGuideline: `• Lakukan skin test intradermal sebelum dosis pertama. Utamakan rute INTRAMUSKULAR (IM). Siapkan selalu obat resusitasi anafilaksis (Epinefrin) di dekat pasien.`
  },

  'benzathine penicillin': {
    adultDosage: `• Sifilis Primer, Sekunder, dan Laten Dini (<1 tahun):\n  - 2.4 Juta IU INTRAMUSKULAR (IM) sebagai dosis tunggal.\n  - Dapat disuntikkan terbagi 1.2 Juta IU pada gluteus kanan dan 1.2 Juta IU pada gluteus kiri.\n• Sifilis Laten Lanjut (>1 tahun), Durasi Tidak Diketahui, atau Sifilis Tersier Kardiovaskular:\n  - 2.4 Juta IU IM seminggu sekali selama 3 minggu berturut-turut (total kumulatif 7.2 Juta IU).\n• Profilaksis Sekunder Demam Rematik / Penyakit Jantung Rematik (PJR):\n  - 1.2 Juta IU IM setiap 3 hingga 4 minggu (tiap bulan).`,
    pediatricDosage: `• Sifilis Kongenital (Anak):\n  - 50,000 IU/kgBB IM dosis tunggal (maksimal 2.4 Juta IU).\n• Profilaksis Demam Rematik Anak:\n  - Berat Badan < 27 kg: 600,000 IU IM setiap 3-4 minggu;\n  - Berat Badan >= 27 kg: 1.2 Juta IU IM setiap 3-4 minggu.`,
    geriatricDosage: `• Dosis sama dengan dewasa jika tidak ada gangguan klirens ekstrem.`,
    renalDoseAdjustment: `• CrCl < 10 mL/min: Perpanjang interval penyuntikan.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 2.4 Juta IU per minggu.`,
    administrationGuideline: `• HANYA UNTUK PENYUNTIKAN INTRAMUSKULAR (IM) DALAM pada kuadran lateral atas gluteus maksimus atau ventrogluteal. JANGAN DISUNTIKKAN SECARA IV ATAU INTRAARTERIAL (risiko emboli kristal, infark neurovaskular, henti jantung mendadak). Wajib aspirasi sebelum injeksi.`
  },

  'salicyl powder': {
    adultDosage: `• Biang Keringat (Miliaria Rubra) & Gatal Keringat:\n  - Taburkan bedak secukupnya merata pada area kulit yang gatal atau berkeringat 2 hingga 3 kali sehari sehabis mandi.`,
    pediatricDosage: `• Anak usia >= 2 tahun: Taburkan tipis pada leher dan punggung sehabis mandi. Jauhkan dari wajah anak untuk menghindari terhirup ke saluran napas.\n• Bayi < 2 tahun: Tidak direkomendasikan.`,
    geriatricDosage: `• Gunakan secukupnya pada area lipatan kulit yang lembap.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai kebutuhan pemakaian luar.`,
    administrationGuideline: `• HANYA UNTUK PEMAKAIAN LUAR PADA KULIT. Bersihkan dan keringkan kulit dengan handuk sebelum ditaburkan. Jangan digunakan pada luka terbuka berdarah atau lesi basah bernanah.`
  },

  'betaxolol ophthalmic': {
    adultDosage: `• Glaukoma Sudut Terbuka & Hipertensi Okular:\n  - Larutan/Suspensi 0.5%: 1 tetes pada kantung konjungtiva mata yang sakit dua kali sehari (tiap 12 jam: pagi dan malam).`,
    pediatricDosage: `• Belum ditetapkan keamanannya pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor denyut nadi basal.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 1 tetes per mata, dua kali sehari.`,
    administrationGuideline: `• Kocok botol terlebih dahulu jika menggunakan sediaan suspensi (Betoptic S). Lakukan oklusi nasolakrimalis (tekan sudut dalam mata dekat hidung) selama 1-2 menit setelah diteteskan untuk meminimalkan penyerapan ke sirkulasi sistemik.`
  },

  'brinzolamide ophthalmic': {
    adultDosage: `• Glaukoma Sudut Terbuka & Hipertensi Okular (Azopt 1%):\n  - 1 tetes pada mata yang sakit 2 kali sehari (pagi dan malam) atau 3 kali sehari bila sebagai monoterapi.`,
    pediatricDosage: `• Belum ditetapkan keamanannya pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• CrCl < 30 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati pada sirosis hepar.`,
    maxDoseLimit: `• 1 tetes per mata, 3 kali sehari.`,
    administrationGuideline: `• KOCOK BOTOL TERLEBIH DAHULU SEBELUM DIGUNAKAN. Lepaskan lensa kontak sebelum penetesan (pasang kembali minimal 15 menit kemudian). Tekan sudut dalam mata selama 1-2 menit untuk mencegah rasa pahit di mulut.`
  },

  'bromocriptine': {
    adultDosage: `• Hiperprolaktinemia / Galaktorea / Prolaktinoma:\n  - Dosis Awal: 1.25 mg (setengah tablet) per oral sekali sehari pada malam hari bersama makanan.\n  - Titrasi: Naikkan 1.25 - 2.5 mg tiap 3-7 hari hingga tercapai kadar prolaktin normal (lazim 2.5 - 7.5 mg/hari dalam 2-3 dosis terbagi).\n• Penyakit Parkinson:\n  - Awal 1.25 mg dua kali sehari bersama makanan, titrasi bertahap tiap 2 minggu hingga dosis efektif (10 - 40 mg/hari).`,
    pediatricDosage: `• Prolaktinoma Pediatrik (Usia >= 11 tahun): Awal 1.25 - 2.5 mg/hari bersama makan, titrasi bertahap sesuai kadar prolaktin.`,
    geriatricDosage: `• Mulai dari dosis terendah 1.25 mg/hari; titrasi sangat perlahan. Waspada hipotensi ortostatik dan konfusi.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan dosis lebih rendah dan titrasi perlahan pada sirosis hepar berat.`,
    maxDoseLimit: `• Hiperprolaktinemia: 15 mg/hari; Parkinson: 40 mg/hari.`,
    administrationGuideline: `• WAJIB DIMINUM BERSAMA MAKANAN atau segelas susu pada malam hari sebelum tidur untuk mencegah mual hebat, muntah, dan pusing berputar mendadak.`
  },

  'barium sulfate': {
    adultDosage: `• Pemeriksaan Radiologi Traktus Gastrointestinal:\n  - Esofagus / Lambung (Barium Swallow / Meal): 150 hingga 300 mL suspensi oral konsentrasi 60% - 100% b/v sesaat sebelum pemindaian fluoroskopi.\n  - Kolon (Barium Enema): 500 hingga 1500 mL suspensi konsentrasi 20% - 60% b/v dimasukkan lewat kateter rektal.`,
    pediatricDosage: `• Disesuaikan oleh dokter spesialis radiologi berdasarkan berat badan dan usia anak.`,
    geriatricDosage: `• Waspada konstipasi dan impaksi fekal; wajib laksatif pasca pemeriksaan.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (tidak diserap secara sistemik).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai protokol diagnostik radiologi.`,
    administrationGuideline: `• HANYA DIBERIKAN DI RUANG RADIOLOGI RUMAH SAKIT. DILARANG DIBERIKAN JIKA DICURIGAI ADA KEBOCORAN/PERFORASI LAMBUNG/USUS (memicu peritonitis granulomatosa fatal). Pasca pemeriksaan, pasien wajib minum banyak air putih minimal 2-3 liter atau mengonsumsi laksatif.`
  },

  'bicalutamide': {
    adultDosage: `• Kanker Prostat Stadium Lanjut (Metastatik):\n  - 50 mg per oral satu kali sehari, pada waktu yang sama setiap hari (bersama atau tanpa makanan).\n  - Terapi dimulai bersamaan atau minimal 3 hari sebelum inisiasi analog LHRH untuk mencegah tumor flare.`,
    pediatricDosage: `• KONTRAINDIKASI pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; monitor enzim hati (SGOT/SGPT) berkala.`,
    maxDoseLimit: `• 50 mg per hari.`,
    administrationGuideline: `• Diminum secara teratur satu kali sehari pada waktu yang sama setiap hari. Telan tablet utuh dengan segelas air putih, dapat dikonsumsi sebelum atau sesudah makan.`
  },

  'bleomycin': {
    adultDosage: `• Limfoma Hodgkin (Regimen ABVD):\n  - 10 Unit/m2 luas permukaan tubuh (LPT) intravena (IV) pada hari ke-1 dan ke-15 dalam siklus 28 hari.\n• Kanker Testis Germ Cell (Regimen BEP):\n  - 30 Unit IV pada hari ke-1, 8, dan 15 (atau mingguan).\n• Efusi Pleura Maligna (Skleroterapi Pleurodesis):\n  - 60 Unit dilarutkan dalam 50-100 mL NaCl 0.9% dimasukkan ke rongga pleura lewat chest tube.\n• DOSIS KUMULATIF SEUMUR HIDUP: TIDAK BOLEH MELEBIHI 400 UNIT (risiko fatal fibrosis paru toksik).`,
    pediatricDosage: `• Sesuai protokol onkologi pediatrik resmi (misal Limfoma Hodgkin: 10 U/m2).`,
    geriatricDosage: `• Pasien usia >70 tahun memiliki kerentanan toksisitas paru sangat tinggi; pertimbangkan penurunan dosis kumulatif.`,
    renalDoseAdjustment: `• CrCl 40 - 50 mL/min: Berikan 70% dosis lazim;\n• CrCl 10 - 40 mL/min: Berikan 60% dosis lazim;\n• CrCl < 10 mL/min: Berikan 50% dosis lazim.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 400 Unit seumur hidup pasien.`,
    administrationGuideline: `• Berikan tes dosis 1-2 Unit sebelum dosis penuh pada pasien limfoma.\n• PERINGATAN OKSIGEN: Pasien pasca terapi bleomycin berisiko tinggi mengalami ARDS fatal jika terpapar oksigen konsentrasi tinggi (FiO2 >30%) saat operasi/anestesi.`
  },

  'bortezomib': {
    adultDosage: `• Mieloma Multipel & Limfoma Sel Mantel (Velcade):\n  - 1.3 mg/m2 luas permukaan tubuh (LPT) diberikan secara SUNTIKAN SUBKUTAN (SC) dua kali seminggu selama 2 minggu (hari 1, 4, 8, 11) diikuti 10 hari istirahat (hari 12-21) dalam siklus 21 hari.\n  - Rute SUBKUTAN (SC) SANGAT DIUTAMAKAN dibandingkan IV untuk meminimalkan risiko neuropati perifer berat.`,
    pediatricDosage: `• Keamanan dan efektivitas belum ditetapkan pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat parestesia kebas saraf dan hipotensi.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal maupun hemodialisis.`,
    hepaticDoseAdjustment: `• Gangguan hepar sedang-berat: Kurangi dosis awal menjadi 0.7 mg/m2 pada siklus pertama.`,
    maxDoseLimit: `• 1.3 mg/m2 per dosis (interval minimal 72 jam antar dosis).`,
    administrationGuideline: `• SUNTIKAN SUBKUTAN (SC) pada paha atau perut lebih diutamakan daripada IV bolus.\n• DILARANG KERAS DIBERIKAN SECARA INTRATEKAL (KONTRAINDIKASI MUTLAK - ENSEFALOPATI FATAL).\n• Wajib berikan profilaksis antivirus Acyclovir 400 mg 2x/hari selama terapi untuk mencegah cacar ular (Herpes Zoster).`
  },

  'brentuximab vedotin': {
    adultDosage: `• Limfoma Hodgkin CD30-Positif Relaps/Refrakter (Adcetris):\n  - 1.8 mg/kgBB (maksimal 180 mg) melalui infus intravena lambat selama 30 menit setiap 3 minggu sekali (siklus 21 hari) hingga maksimal 16 siklus.\n• Kombinasi Lini Pertama (dengan Rejimen AVD):\n  - 1.2 mg/kgBB IV setiap 2 minggu selama 6 siklus.`,
    pediatricDosage: `• Sesuai protokol limfoma Hodgkin anak CD30-positif.`,
    geriatricDosage: `• Dosis individual ketat; monitor toksisitas sumsum tulang dan neuropati.`,
    renalDoseAdjustment: `• CrCl < 30 mL/min: Turunkan dosis ke 1.2 mg/kgBB tiap 3 minggu atau hindari.`,
    hepaticDoseAdjustment: `• Gangguan fungsi hati ringan: 1.2 mg/kgBB tiap 3 minggu; gangguan sedang-berat: Hindari pemakaian.`,
    maxDoseLimit: `• Maksimal 180 mg per dosis (pada pasien dengan BB >100 kg).`,
    administrationGuideline: `• Diberikan melalui infus intravena lambat selama 30 menit. JANGAN dibolus IV.\n• PENGGUNAAN BERSAMA BLEOMYCIN ADALAH KONTRAINDIKASI MUTLAK (toksisitas paru fatal).`
  },

  'bendamustine': {
    adultDosage: `• Leukemia Limfositik Kronis (CLL - Ribomustin):\n  - 100 mg/m2 LPT infus intravena selama 30-60 menit pada hari ke-1 dan ke-2 dari setiap siklus 28 hari (hingga 6 siklus).\n• Limfoma Non-Hodgkin (NHL) Indolent Sel B Relaps:\n  - 120 mg/m2 LPT infus IV selama 30-60 menit pada hari ke-1 dan ke-2 dari setiap siklus 21 hari (hingga 6-8 siklus).`,
    pediatricDosage: `• Belum ditetapkan keamanannya pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat toksisitas mielosupresi dan infeksi.`,
    renalDoseAdjustment: `• CrCl 30 - 50 mL/min: Gunakan dengan hati-hati;\n• CrCl < 30 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Bilirubin > 3x batas atas normal: KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• 120 mg/m2 per hari pada hari 1 dan 2 tiap siklus.`,
    administrationGuideline: `• Encerkan hanya dengan NaCl 0.9% (Normal Saline). JANGAN gunakan larutan Dextrose.\n• Wajib berikan hidrasi adekuat dan Allopurinol sebelum kemoterapi untuk mencegah Tumor Lysis Syndrome (TLS).\n• Berikan profilaksis Kotrimoksazol untuk mencegah pneumonia oportunistik Pneumocystis jirovecii.`
  },

  'basiliximab': {
    adultDosage: `• Induksi Imunosupresi Transplantasi Ginjal Allogenik (Simulect):\n  - Total 40 mg terbagi dalam 2 dosis masing-masing 20 mg:\n    * Dosis 1: 20 mg IV infus lambat (20-30 menit) dalam waktu 2 jam sebelum operasi transplantasi ginjal dimulai.\n    * Dosis 2: 20 mg IV infus lambat pada hari ke-4 pasca transplantasi.`,
    pediatricDosage: `• Anak Berat Badan >= 35 kg: Dosis sama dengan dewasa (2 dosis @20 mg);\n• Anak Berat Badan < 35 kg: Total 20 mg terbagi dalam 2 dosis masing-masing 10 mg (dosis 1 pra-bedah, dosis 2 pada hari ke-4).`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (merupakan obat pencegah penolakan cangkok ginjal).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 2 dosis @20 mg per siklus transplantasi.`,
    administrationGuideline: `• Rekonstitusi 20 mg serbuk dengan 5 mL WFI, lalu encerkan ke dalam 50 mL NaCl 0.9% atau Dextrose 5%.\n• Berikan melalui infus IV lambat selama 20 hingga 30 menit.\n• Siapkan selalu obat resusitasi anafilaksis (Epinefrin) sebelum infus dimulai.`
  },

  'busulfan': {
    adultDosage: `• Regimen Conditioning Transplantasi Sel Punca (HSCT / BMT):\n  - Sediaan IV: 0.8 mg/kgBB infus IV selama 2 jam setiap 6 jam selama 4 hari berturut-turut (total 16 dosis), dikombinasikan dengan Cyclophosphamide atau Fludarabine.\n• Terapi Paliatif CML Fase Kronis (Oral Myleran):\n  - Dosis inisiasi: 4 hingga 8 mg per oral sekali sehari hingga hitung leukosit <15,000/mcL, lalu turunkan ke dosis pemeliharaan 1 - 3 mg/hari.`,
    pediatricDosage: `• Conditioning Pediatrik (IV): Dosis bertingkat 0.8 - 1.2 mg/kgBB tiap 6 jam dengan pemantauan Therapeutic Drug Monitoring (TDM) AUC plasma ketat.`,
    geriatricDosage: `• Disesuaikan secara individual dengan TDM.`,
    renalDoseAdjustment: `• CrCl < 50 mL/min: Monitor klirens secara ketat.`,
    hepaticDoseAdjustment: `• Pantau ketat enzim hati dan bilirubin; risiko VOD hepar meningkat tajam pada disfungsi hepar awal.`,
    maxDoseLimit: `• Sesuai protokol conditioning transplantasi sumsum tulang resmi.`,
    administrationGuideline: `• INFUS IV: Berikan melalui kateter vena sentral (CVC) menggunakan pompa infus selama tepat 2 jam.\n• PROFILAKSIS KEJANG ADALAH WAJIB: Mulai Levetiracetam atau Fenitoin minimal 12 jam sebelum dosis pertama busulfan hingga 24 jam setelah dosis terakhir.`
  },

  'cisapride': {
    adultDosage: `• Gastroparesis Diabetik & GERD Berat Refrakter:\n  - 5 mg per oral 3 hingga 4 kali sehari (15 menit sebelum makan dan sebelum tidur malam).\n  - Dapat dinaikkan ke 10 mg 3-4 kali sehari jika respons belum adekuat dan EKG normal.`,
    pediatricDosage: `• KONTRAINDIKASI pada anak dan neonatus.`,
    geriatricDosage: `• Mulai dari 5 mg 3 kali sehari; monitor EKG (QTc) berkala.`,
    renalDoseAdjustment: `• Gagal ginjal sedang-berat: Kurangi dosis sebesar 50%.`,
    hepaticDoseAdjustment: `• Gangguan hepar sedang-berat: Kurangi dosis sebesar 50%.`,
    maxDoseLimit: `• 40 mg per hari.`,
    administrationGuideline: `• Diminum 15 menit sebelum makan dan sebelum tidur. Rekam EKG baseline dan berkala (pastikan QTc <450 ms). Hindari jus grapefruit.`
  },

  'dacarbazine': {
    adultDosage: `• Limfoma Hodgkin (Rejimen ABVD):\n  - 375 mg/m2 luas permukaan tubuh (LPT) IV infus pada hari ke-1 dan ke-15 dalam siklus 28 hari.\n• Melanoma Maligna Metastatik:\n  - 250 mg/m2 LPT/hari IV infus selama 5 hari berturut-turut setiap 3 minggu (siklus 21 hari).`,
    pediatricDosage: `• Sesuai protokol kemoterapi onkologi pediatrik (Limfoma Hodgkin: 375 mg/m2 IV hari 1 dan 15).`,
    geriatricDosage: `• Disesuaikan dengan fungsi sumsum tulang dan organ eliminasi.`,
    renalDoseAdjustment: `• CrCl 10 - 50 mL/min: Berikan 75% dosis;\n• CrCl < 10 mL/min: Berikan 50% dosis lazim.`,
    hepaticDoseAdjustment: `• Turunkan dosis atau tunda bila transaminase meningkat berat.`,
    maxDoseLimit: `• 375 mg/m2 per dosis.`,
    administrationGuideline: `• Infus IV selama 30-60 menit. LINDUNGI DARI CAHAYA MATAHARI LANGSUNG selama infus. Wajib premedikasi antiemetik kuat (Ondansetron + Deksametason).`
  },

  'daclatasvir': {
    adultDosage: `• Hepatitis C Kronis (Kombinasi Sofosbuvir 400 mg):\n  - 60 mg per oral satu kali sehari selama 12 minggu (tanpa sirosis) atau 24 minggu (dengan sirosis).\n  - Ko-administrasi dengan inhibitor CYP3A4 kuat (Atazanavir/Ritonavir): Turunkan dosis ke 30 mg 1x/hari.\n  - Ko-administrasi dengan inducer CYP3A4 moderat (Efavirenz): Naikkan dosis ke 90 mg 1x/hari.`,
    pediatricDosage: `• Belum ditetapkan pada usia <18 tahun.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal tahap apa pun atau hemodialisis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada sirosis Child-Pugh A, B, atau C.`,
    maxDoseLimit: `• 90 mg per hari.`,
    administrationGuideline: `• Diminum satu kali sehari bersama atau tanpa makanan secara konsisten. JANGAN DIBERIKAN SEBAGAI MONOTERAPI.`
  },

  'dactinomycin': {
    adultDosage: `• Tumor Wilms, Rabdomiosarkoma, & Koriokarsinoma:\n  - 15 mcg/kgBB/hari (0.015 mg/kgBB) IV selama 5 hari berturut-turut setiap 3-4 minggu;\n  - Atau 45 mcg/kgBB IV dosis tunggal lambat tiap 3 minggu.\n  - Dosis harian maksimal: TIDAK BOLEH MELEBIHI 500 mcg (0.5 mg) PER HARI.`,
    pediatricDosage: `• Pediatrik: 15 mcg/kgBB/hari IV selama 5 hari (maksimal 500 mcg/hari) tiap 3-9 minggu sesuai protokol COG/NWTS. Pada BB <11 kg, gunakan dosis 0.05 mg/m2 LPT.`,
    geriatricDosage: `• Dosis disesuaikan secara hati-hati; monitor mielosupresi.`,
    renalDoseAdjustment: `• Monitor toksisitas sistemik; ekskresi ginjal 30%.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; monitor ketat bilirubin.`,
    maxDoseLimit: `• Maksimal 500 mcg (0.5 mg) per hari.`,
    administrationGuideline: `• VESIKAN KUAT: Hanya diberikan melalui infus IV yang mengalir bebas (side-arm). Hindari ekstravasasi. Lindungi dari cahaya langsung.`
  },

  'daunorubicin': {
    adultDosage: `• AML Dewasa (Rejimen Induksi 7+3):\n  - 45 hingga 60 mg/m2 LPT/hari IV infus cepat (10-15 menit) pada hari ke-1, 2, dan 3 dari siklus induksi.\n  - Dosis Kumulatif Seumur Hidup: TIDAK BOLEH MELEBIHI 550 mg/m2 (atau 400 mg/m2 jika ada riwayat radiasi mediastinum).`,
    pediatricDosage: `• ALL Pediatrik: 25 mg/m2 LPT IV seminggu sekali bersama vinkristin dan prednison. Dosis kumulatif maksimal anak: 300 mg/m2.`,
    geriatricDosage: `• Usia >60 tahun: Pertimbangkan reduksi dosis ke 30 - 45 mg/m2 untuk mencegah mortalitas kardiak dini.`,
    renalDoseAdjustment: `• Serum Kreatinin > 3.0 mg/dL: Berikan 50% dari dosis lazim.`,
    hepaticDoseAdjustment: `• Bilirubin 1.2 - 3.0 mg/dL: Berikan 75% dosis;\n• Bilirubin > 3.0 mg/dL: Berikan 50% dosis lazim.`,
    maxDoseLimit: `• 550 mg/m2 dosis kumulatif seumur hidup.`,
    administrationGuideline: `• Infus IV lambat selama 10-15 menit ke selang infus yang mengalir bebas. VESIKAN KUAT. Wajib evaluasi ekokardiografi LVEF baseline dan serial.`
  },

  'deferiprone': {
    adultDosage: `• Hemosiderosis Transfusi Thalassemia Mayor:\n  - Dosis awal: 25 mg/kgBB per oral 3 kali sehari (total 75 mg/kgBB/hari).\n  - Titrasi: Dapat ditingkatkan hingga maksimal 33 mg/kgBB 3 kali sehari (total 100 mg/kgBB/hari) berdasarkan kadar feritin dan MRI T2* kardiak.`,
    pediatricDosage: `• Anak usia >=8 tahun: 25 mg/kgBB per oral 3 kali sehari (75 mg/kgBB/hari), maksimal 100 mg/kgBB/hari.`,
    geriatricDosage: `• Disesuaikan dengan toleransi lambung dan ginjal.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian pada gangguan ginjal ringan-sedang.`,
    hepaticDoseAdjustment: `• Pantau transaminase hati bulanan; tunda jika kenaikan ALT >5x batas normal.`,
    maxDoseLimit: `• 100 mg/kgBB per hari.`,
    administrationGuideline: `• Diminum 3 kali sehari bersama makanan untuk mengurangi mual. PEMERIKSAAN HITUNG NEUTROFIL MUTLAK (ANC) WAJIB SETIAP MINGGU untuk skrining agranulositosis fatal.`
  },

  'deferoxamine': {
    adultDosage: `• Hemosiderosis Transfusi Kronis Talasemia:\n  - 20 hingga 40 mg/kgBB per hari (1000 - 2000 mg/hari) melalui infus subkutan kontinu lambat selama 8-12 jam menggunakan syringe pump portable, 5-7 hari seminggu.\n• Keracunan Besi Akut:\n  - Dosis awal 1000 mg IM atau IV infus lambat (kecepatan maksimal 15 mg/kgBB/jam), dilanjutkan 500 mg tiap 4-12 jam (maksimal 6000 mg/hari).`,
    pediatricDosage: `• Anak Talasemia Mayor: 20 - 40 mg/kgBB/hari infus SC lambat (maksimal 40 mg/kgBB/hari pada anak <3 tahun untuk mencegah gangguan tulang).\n• Keracunan Besi Akut Anak: 15 mg/kgBB/jam infus IV kontinu.`,
    geriatricDosage: `• Disesuaikan dengan fungsi ginjal; monitor penglihatan dan pendengaran.`,
    renalDoseAdjustment: `• Anuria / gagal ginjal berat: KONTRAINDIKASI MUTLAK tanpa hemodialisis simultan.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Kronis: 40-50 mg/kgBB/hari; Akut: 6000 mg per 24 jam.`,
    administrationGuideline: `• Infus subkutan lambat (SC) malam hari 8-12 jam adalah rute utama talasemia. DILARANG INFUS IV CEPAT (kecepatan maksimal 15 mg/kgBB/jam demi mencegah syok hipotensi).`
  },

  'delamanid': {
    adultDosage: `• Tuberkulosis Paru Resistan Obat (TB-MDR / XDR):\n  - 100 mg (2 tablet @50 mg) per oral dua kali sehari (tiap 12 jam) diminum bersama makanan lengkap selama total durasi 24 minggu (6 bulan).`,
    pediatricDosage: `• Anak usia >=3 tahun:\n  - BB 10 - 20 kg: 25 mg per oral 2x/hari;\n  - BB 20 - 35 kg: 50 mg per oral 2x/hari;\n  - BB >35 kg: 100 mg per oral 2x/hari.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor EKG berkala.`,
    renalDoseAdjustment: `• Gangguan ginjal ringan-sedang: Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gangguan hepar sedang-berat: HINDARI pemakaian.`,
    maxDoseLimit: `• 200 mg per hari.`,
    administrationGuideline: `• WAJIB DIMINUM BERSAMA MAKANAN LENGKAP untuk menjamin penyerapan optimal. WAJIB REKAM EKG BASELINE dan serial bulanan untuk memantau interval QTc.`
  },

  'desmopressin': {
    adultDosage: `• Diabetes Insipidus Kranial Sentral:\n  - Dosis awal 0.1 mg per oral 3 kali sehari; titrasi hingga rentang lazim 0.1 - 0.8 mg/hari terbagi 2-3 kali.\n• Nokturia Dewasa:\n  - 0.1 mg per oral sebelum tidur malam (batasi asupan cairan 1 jam sebelum hingga 8 jam sesudah konsumsi).`,
    pediatricDosage: `• Enuresis Nokturnal Primer (Anak usia >=5 tahun):\n  - 0.2 mg per oral (atau Minirin Melt 120 mcg sublingual) diminum 1 jam sebelum tidur malam. Maksimal 0.4 mg per malam. BATASI ASUPAN CAIRAN KETAT.`,
    geriatricDosage: `• Lansia >=65 tahun: Risiko hiponatremia berat tinggi; periksa natrium serum baseline dan hari ke-3, ke-7.`,
    renalDoseAdjustment: `• CrCl < 50 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Enuresis: 0.4 mg per malam; Diabetes insipidus: 1.2 mg per hari.`,
    administrationGuideline: `• PEMBATASAN CAIRAN ADALAH MUTLAK (terutama 1 jam sebelum tidur hingga 8 jam setelahnya) untuk mencegah intoksikasi air dan kejang hiponatremik fatal.`
  },

  'desogestrel': {
    adultDosage: `• Kontrasepsi Oral Progestogen Tunggal (Cerazette):\n  - 75 mcg (1 tablet) per oral sekali sehari pada jam yang sama persis tanpa terputus (28 tablet per blister, langsung lanjut blister baru tanpa jeda).`,
    pediatricDosage: `• Diindikasikan pada remaja pasca menarche.`,
    geriatricDosage: `• Tidak diindikasikan pasca menopause.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI pada penyakit hepar berat aktif.`,
    maxDoseLimit: `• 75 mcg per hari.`,
    administrationGuideline: `• Wajib diminum pada jam yang sama setiap hari. Toleransi keterlambatan minum pil maksimal 12 jam. Sangat aman untuk ibu menyusui.`
  },

  'desoximetasone': {
    adultDosage: `• Dermatosis Inflamasi & Psoriasis Berat (Krim/Salep 0.25%):\n  - Oleskan tipis merata pada lesi kulit yang sakit 1 hingga 2 kali sehari. Batasi durasi terapi maksimal 2-4 minggu.`,
    pediatricDosage: `• Anak usia >=1 tahun: Gunakan tipis pada area terbatas maksimal 5 hari; jangan gunakan balutan oklusi.`,
    geriatricDosage: `• Gunakan durasi sesingkat mungkin untuk mencegah atrofi kulit.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 45-50 gram per minggu.`,
    administrationGuideline: `• HANYA UNTUK PEMAKAIAN LUAR. Jangan dioleskan pada wajah, lipatan ketiak, atau selangkangan. Hindari balutan kedap udara (oklusi).`
  },

  'diethylcarbamazine': {
    adultDosage: `• Filariasis Limfatik (Wuchereria bancrofti):\n  - 6 mg/kgBB per hari per oral terbagi dalam 3 dosis sesudah makan selama 12 hari berturut-turut.\n• Filariasis Brugia malayi / timori:\n  - 5 mg/kgBB/hari per oral terbagi 3 kali selama 10 hari.\n• POPM Pencegahan Massal Kemenkes:\n  - 6 mg/kgBB dosis tunggal sekali setahun dikombinasikan dengan Albendazole 400 mg.`,
    pediatricDosage: `• Anak usia >=2 tahun: 3 hingga 6 mg/kgBB/hari sesudah makan terbagi 3 kali. Anak <2 tahun: Tidak direkomendasikan.`,
    geriatricDosage: `• Disesuaikan secara hati-hati.`,
    renalDoseAdjustment: `• Gangguan ginjal sedang-berat: Kurangi dosis sebesar 50%.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis khusus.`,
    maxDoseLimit: `• 6 mg/kgBB per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SEGERA SESUDAH MAKAN. Pada beban mikrofilaria tinggi, mulai dari dosis rendah pada hari ke-1 untuk mencegah reaksi Mazzotti anafilaktoid.`
  },

  'diflucortolone': {
    adultDosage: `• Dermatosis Inflamasi Responsif Steroid (Krim/Salep 0.1%):\n  - Oleskan tipis pada lesi 1-2 kali sehari pada awal terapi, lalu turunkan ke 1 kali sehari. Maksimal 2-3 minggu.`,
    pediatricDosage: `• Gunakan sesingkat mungkin (maksimal 5-7 hari) pada area terbatas.`,
    geriatricDosage: `• Gunakan durasi sesingkat mungkin.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 30-50 gram per minggu.`,
    administrationGuideline: `• Pemakaian topikal luar kulit saja. Jangan mengenai mata. Sediaan Salep Lemak untuk kulit bersisik kering, Krim untuk lesi lembap.`
  },

  'edetate disodium': {
    adultDosage: `• Krisis Hiperkalsemia Berat & Intoksikasi Digitalis Darurat:\n  - 50 mg/kgBB per hari (maksimal 3000 mg/hari) dilarutkan dalam 500 mL D5% atau NaCl 0.9%, diinfuskan IV lambat selama minimal 3 hingga 4 jam. Maksimal 5 hari berturut-turut.`,
    pediatricDosage: `• Darurat Pediatrik: 40 mg/kgBB/hari diinfuskan IV lambat selama 3-4 jam.`,
    geriatricDosage: `• Lansia sangat rentan terhadap nefrotoksisitas dan hipokalsemia akut; gunakan dosis konservatif.`,
    renalDoseAdjustment: `• Insufisiensi ginjal lanjut / anuria: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 3000 mg (3 gram) per 24 jam.`,
    administrationGuideline: `• INFUS INTRAVENA WAJIB SANGAT LAMBAT (minimal 3-4 jam). DILARANG BOLUS CEPAT (memicu tetani dan henti jantung fatal). Siapkan Kalsium Glukonat di samping tempat tidur.`
  },

  'clodronate': {
    adultDosage: `• Osteolisis Metastatik Kanker & Multipel Mieloma:\n  - Oral: 1600 mg per hari (4 kapsul @400 mg) dosis tunggal pagi hari saat perut kosong dengan segelas penuh air putih.\n• Hiperkalsemia Maligna (IV):\n  - 300 mg/hari (1 ampul 5 mL) diencerkan dalam 500 mL NaCl 0.9%, infus IV lambat selama minimal 2-4 jam selama 7 hingga 10 hari.`,
    pediatricDosage: `• Keamanan belum ditetapkan pada anak-anak.`,
    geriatricDosage: `• Disesuaikan dengan klirens kreatinin ginjal.`,
    renalDoseAdjustment: `• CrCl 50 - 80 mL/min: 1200 mg/hari oral;\n• CrCl 10 - 50 mL/min: 800 - 1200 mg/hari oral;\n• CrCl < 10 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 3200 mg per hari (oral).`,
    administrationGuideline: `• Kapsul oral diminum pagi hari saat perut kosong dengan segelas penuh air putih biasa. PASIEN WAJIB TETAP TEGAK MINIMAL 60 MENIT. Infus IV minimal 2 jam.`
  },

  'dimercaptosuccinic acid': {
    adultDosage: `• Keracunan Timbal (BLL >45 mcg/dL), Merkuri, & Arsenik:\n  - 10 mg/kgBB (atau 350 mg/m2 LPT) per oral setiap 8 jam (3x/hari) selama 5 hari pertama;\n  - Dilanjutkan 10 mg/kgBB setiap 12 jam (2x/hari) selama 14 hari berikutnya (total kurus 19 hari).`,
    pediatricDosage: `• Anak usia >=1 tahun: 10 mg/kgBB per oral tiap 8 jam selama 5 hari, lalu tiap 12 jam selama 14 hari. Kapsul dapat dibuka dan butiran dicampur ke makanan lunak.`,
    geriatricDosage: `• Disesuaikan dengan fungsi ginjal.`,
    renalDoseAdjustment: `• Gunakan dengan hati-hati; diekskresikan lewat ginjal.`,
    hepaticDoseAdjustment: `• Pantau enzim transaminase hati berkala.`,
    maxDoseLimit: `• 30 mg/kgBB per hari.`,
    administrationGuideline: `• Kapsul dapat ditelan utuh atau dibuka dan granul dicampur ke bubur apel/puding untuk anak kecil. Pastikan asupan cairan adekuat.`
  },

  'docetaxel': {
    adultDosage: `• Kanker Payudara / NSCLC / Kanker Lambung:\n  - 75 hingga 100 mg/m2 LPT infus intravena selama tepat 60 menit setiap 3 minggu sekali (siklus 21 hari).\n• Kanker Prostat Resistan Kastrasi (CRPC):\n  - 75 mg/m2 LPT IV tiap 3 minggu bersama Prednison 5 mg oral 2x/hari kontinu.`,
    pediatricDosage: `• Belum ditetapkan pada populasi anak-anak.`,
    geriatricDosage: `• Pasien >=65 tahun: Tingkat toksisitas neutropenia dan diare meningkat tajam; pertimbangkan reduksi dosis.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI MUTLAK pada gangguan hepar berat (bilirubin > batas atas normal).`,
    maxDoseLimit: `• 100 mg/m2 per siklus (21 hari).`,
    administrationGuideline: `• PREMEDIKASI DEKSAMETASON WAJIB: Dexamethasone 8 mg oral 2x/hari selama 3 hari (dimulai 1 hari sebelum kemoterapi) untuk mencegah retensi cairan masif dan anafilaksis. Infus IV tepat 60 menit.`
  },

  'dutasteride': {
    adultDosage: `• Benign Prostatic Hyperplasia (BPH) Simtomatik:\n  - 0.5 mg (1 kapsul lunak) per oral satu kali sehari pada waktu yang sama setiap hari (bersama atau tanpa makanan).`,
    pediatricDosage: `• KONTRAINDIKASI MUTLAK pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; metabolisme hepar ekstensif.`,
    maxDoseLimit: `• 0.5 mg per hari.`,
    administrationGuideline: `• Telan kapsul lunak UTUH dengan air putih. JANGAN DIKUNYAH ATAU DIBUKA (iritasi orofaring). Wanita hamil dilarang memegang kapsul bocor.`
  },

  'exemestane': {
    adultDosage: `• Kanker Payudara ER+ Pasca Menopause (Adjuvan atau Lanjut):\n  - 25 mg (1 tablet) per oral sekali sehari sesudah makan pada jam yang sama setiap hari.`,
    pediatricDosage: `• KONTRAINDIKASI MUTLAK pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 25 mg per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SESUDAH MAKAN untuk meningkatkan absorpsi bioavailabilitas oral hingga 40%.`
  },

  'eltrombopag': {
    adultDosage: `• Immune Thrombocytopenia (ITP) Kronis:\n  - Dosis awal: 25 mg per oral sekali sehari (populasi Asia) atau 50 mg (Kaukasia) saat perut kosong.\n  - Titrasi dosis setiap 2 minggu dengan kelipatan 25 mg untuk target trombosit >=50,000/mcL (maksimal 75 mg/hari).\n• Anemia Aplastik Berat (SAA):\n  - 25-50 mg sekali sehari dititrasi hingga maksimal 150 mg/hari.`,
    pediatricDosage: `• ITP Anak >=6 tahun: 25 mg oral 1x/hari. Anak 1-5 tahun: 12.5 - 25 mg oral 1x/hari.`,
    geriatricDosage: `• Mulai dengan 25 mg per oral sekali sehari; monitor ketat fungsi hepar.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gangguan hepar ringan-sedang (Child-Pugh A/B): Mulai 25 mg sekali sehari. Hentikan jika ALT >3x ULN dengan bilirubin naik.`,
    maxDoseLimit: `• 75 mg/hari (ITP); 150 mg/hari (SAA).`,
    administrationGuideline: `• DIMINUM SAAT PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan). HINDARI susu, antasida, kalsium, atau suplemen besi dalam rentang 2 jam sebelum atau 4 jam sesudahnya.`
  },

  'epirubicin': {
    adultDosage: `• Rejimen FEC Kanker Payudara:\n  - 75 - 100 mg/m2 LPT IV infus lambat (15-20 menit) setiap 21 hari selama 6 siklus.\n• Dosis Kumulatif Maksimal Seumur Hidup:\n  - 900 mg/m2 LPT (atau 650 mg/m2 bila ada riwayat radiasi mediastinum).`,
    pediatricDosage: `• Sesuai protokol onkologi pediatrik spesifik.`,
    geriatricDosage: `• Disesuaikan berdasarkan cadangan sumsum tulang dan kardiak.`,
    renalDoseAdjustment: `• Serum Kreatinin > 5 mg/dL: Kurangi dosis 50%.`,
    hepaticDoseAdjustment: `• Bilirubin 1.2 - 3.0 mg/dL: Berikan 50% dosis. Bilirubin > 3.0 mg/dL: Berikan 25% dosis. Disfungsi berat: KONTRAINDIKASI.`,
    maxDoseLimit: `• Dosis kumulatif seumur hidup 900 mg/m2 LPT.`,
    administrationGuideline: `• HANYA DIBERIKAN INTRAVENA BEBAS HAMBATAN melalui selang infus NaCl 0.9% mengalir bebas selama 15-20 menit. VESIKAN KUAT (waspadai ekstravasasi). Urin merah 1-2 hari adalah wajar.`
  },

  'eribulin': {
    adultDosage: `• Kanker Payudara Metastatik / Liposarkoma:\n  - 1.4 mg/m2 LPT disuntikkan secara intravena selama 2 hingga 5 menit pada hari ke-1 dan hari ke-8 setiap siklus 21 hari.`,
    pediatricDosage: `• Keamanan dan efikasi belum ditetapkan.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat neutropenia.`,
    renalDoseAdjustment: `• CrCl 30 - 49 mL/min: 1.1 mg/m2 pada hari 1 dan 8.\n• CrCl 15 - 29 mL/min: 0.7 mg/m2 pada hari 1 dan 8.`,
    hepaticDoseAdjustment: `• Child-Pugh A: 1.1 mg/m2 pada hari 1 dan 8.\n• Child-Pugh B: 0.7 mg/m2 pada hari 1 dan 8.\n• Child-Pugh C: Tidak direkomendasikan.`,
    maxDoseLimit: `• 1.4 mg/m2 per dosis (pada hari 1 dan 8).`,
    administrationGuideline: `• Berikan secara INTRAVENA BOLUS selama 2-5 menit langsung atau diencerkan dalam 100 mL NaCl 0.9%. JANGAN diencerkan dalam Dekstrosa. Tunda dosis bila ANC <1000/mcL.`
  },

  'epoetin-alfa': {
    adultDosage: `• Anemia PGK Hemodialisis:\n  - Inisiasi: 50 hingga 100 Unit/kgBB IV atau SC 3 kali seminggu.\n  - Titrasi bertahap tiap 4 minggu untuk target Hb 10.0 - 11.5 g/dL (DILARANG TARGETKAN HB >12 g/dL).`,
    pediatricDosage: `• Anak PGK usia >=1 bulan: 50 Unit/kgBB IV atau SC 3 kali seminggu.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat tekanan darah.`,
    renalDoseAdjustment: `• Indikasi utama; sesuaikan dosis dengan target hemoglobin 10-11 g/dL.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai titrasi mempertahankan Hb 10-11.5 g/dL.`,
    administrationGuideline: `• IV disukai untuk pasien hemodialisis; SC disukai untuk pra-dialisis / peritoneal dialisis. Cadangan besi WAJIB ADEKUAT (TSAT >=20% dan Feritin >=100 ng/mL).`
  },

  'erlotinib': {
    adultDosage: `• Kanker Paru NSCLC Mutasi EGFR Sensitif:\n  - 150 mg per oral sekali sehari diminum secara kontinu hingga progresi penyakit.\n• Kanker Pankreas Lanjut:\n  - 100 mg per oral sekali sehari bersama gemsitabin.`,
    pediatricDosage: `• Keamanan dan efikasi belum ditetapkan.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ringan-sedang.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; hentikan jika timbul disfungsi hepar berat.`,
    maxDoseLimit: `• 150 mg per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SAAT PERUT KOSONG (minimal 1 jam sebelum atau 2 jam sesudah makan). HINDARI obat penghambat asam lambung PPI (menurunkan absorpsi >60%). Berhenti merokok.`
  },

  'etoposide': {
    adultDosage: `• SCLC / Kanker Testis (IV):\n  - 50 - 100 mg/m2 LPT/hari IV infus selama 5 hari berturut-turut, atau 100 mg/m2/hari hari 1, 3, dan 5 setiap 3-4 minggu.\n• Kapsul Oral (Lastet):\n  - 100 - 200 mg/m2/hari oral selama 5 hari berturut-turut tiap 3-4 minggu.`,
    pediatricDosage: `• Sesuai protokol onkologi pediatrik resmi.`,
    geriatricDosage: `• Disesuaikan berdasarkan fungsi ginjal.`,
    renalDoseAdjustment: `• CrCl 15 - 50 mL/min: Berikan 75% dosis lazim.\n• CrCl < 15 mL/min: Berikan 50% dosis lazim.`,
    hepaticDoseAdjustment: `• Kurangi dosis pada disfungsi hepar sedang-berat.`,
    maxDoseLimit: `• Sesuai protokol onkologi resmi.`,
    administrationGuideline: `• INFUS INTRAVENA LAMBAT MINIMAL 30-60 MENIT dalam konsentrasi 0.2-0.4 mg/mL NaCl 0.9%. DILARANG BOLUS CEPAT (memicu hipotensi berat dan bronkospasme).`
  },

  'everolimus': {
    adultDosage: `• Onkologi (Kanker Payudara / NET / RCC):\n  - 10 mg per oral satu kali sehari pada waktu yang sama setiap hari (konsisten bersama atau tanpa makan).\n• Profilaksis Rejeksi Transplantasi Organ:\n  - 0.75 mg per oral 2 kali sehari dengan target palung darah (trough) 3-8 ng/mL.`,
    pediatricDosage: `• SEGA Anak >=1 tahun: 4.5 mg/m2/hari dititrasi target palung 5-15 ng/mL.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Child-Pugh A: 7.5 mg/hari; Child-Pugh B: 5 mg/hari; Child-Pugh C: 2.5 mg/hari.`,
    maxDoseLimit: `• 10 mg per hari (onkologi).`,
    administrationGuideline: `• Telan utuh dengan segelas air. JANGAN DIKUNYAH. HINDARI jeruk bali merah (grapefruit). Gunakan obat kumur deksametason oral untuk profilaksis sariawan stomatitis.`
  },

  'filgrastim': {
    adultDosage: `• Pencegahan Neutropenia Febril Kemoterapi:\n  - 5 mcg/kgBB (300 mcg untuk BB 60 kg) disuntikkan secara SUBKUTAN (SC) sekali sehari, dimulai minimal 24 jam setelah kemoterapi selesai, dilanjutkan hingga ANC >10,000/mcL pasca nadir.`,
    pediatricDosage: `• 5 mcg/kgBB/hari SC sekali sehari.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 10 mcg/kgBB/hari.`,
    administrationGuideline: `• SUNTIKAN SUBKUTAN (SC). WAJIB DIBERIKAN MINIMAL 24 JAM SETELAH KEMOTERAPI SELESAI dan minimal 24 jam sebelum kemoterapi berikutnya. Simpan di kulkas 2-8°C, jangan dikocok.`
  },

  'fludarabine': {
    adultDosage: `• Rejimen FCR Leukemia Limfositik Kronis (CLL):\n  - 25 mg/m2 LPT/hari IV infus selama 30 menit pada hari ke-1, 2, dan 3 dari siklus 28 hari hingga 6 siklus.`,
    pediatricDosage: `• Sesuai protokol transplantasi sel punca anak.`,
    geriatricDosage: `• Disesuaikan berdasarkan klirens kreatinin.`,
    renalDoseAdjustment: `• CrCl 30 - 70 mL/min: Kurangi dosis 20-50%.\n• CrCl < 30 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Gunakan dengan kehati-hatian.`,
    maxDoseLimit: `• 25 mg/m2 per hari.`,
    administrationGuideline: `• Infuskan IV selama 30 menit diencerkan dalam 100 mL NaCl 0.9%. Profilaksis Kotrimoksazol (PJP) dan Asiklovir (Herpes) WAJIB. Transfusi darah WAJIB DIIRADIASI GAMMA.`
  },

  'fluorouracil': {
    adultDosage: `• Rejimen FOLFOX / FOLFIRI Kolorektal:\n  - Bolus IV: 400 mg/m2 LPT pada hari ke-1.\n  - Infus IV Kontinu: 2400 mg/m2 LPT selama 46-48 jam menggunakan pompa infus portabel setiap 2 minggu.`,
    pediatricDosage: `• Sesuai protokol onkologi anak.`,
    geriatricDosage: `• Sesuaikan konservatif; lansia rentan stomatitis dan diare dehidrasi.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ringan-sedang.`,
    hepaticDoseAdjustment: `• Bilirubin > 5 mg/dL: KONTRAINDIKASI MUTLAK.`,
    maxDoseLimit: `• Sesuai protokol onkologi resmi (maksimal 1000 mg per dosis bolus).`,
    administrationGuideline: `• Infus kontinu 46-48 jam dengan pompa elastomeric memberikan efikasi lebih tinggi dan toksisitas lebih rendah. Antidotum overdosis: Uridine Triacetate oral dalam 96 jam.`
  },

  'fulvestrant': {
    adultDosage: `• Kanker Payudara HR+ Pasca Menopause:\n  - 500 mg intramuskular (IM) terbagi dalam 2 suntikan @250 mg pada bokong kiri dan kanan pada hari ke-1, 15, dan 29 (fase loading), lalu 500 mg sekali sebulan (tiap 28 hari).`,
    pediatricDosage: `• KONTRAINDIKASI MUTLAK pada anak-anak.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ringan-sedang.`,
    hepaticDoseAdjustment: `• Gangguan sedang (Child-Pugh B): 250 mg IM pemeliharaan. Gangguan berat: KONTRAINDIKASI.`,
    maxDoseLimit: `• 500 mg per pemberian.`,
    administrationGuideline: `• HANYA SUNTIKAN INTRAMUSKULAR (IM) PADA OTOT GLUTEUS BOKONG. SUNTIKKAN SANGAT PERLAHAN (1-2 menit per 5 mL) karena larutan minyak kental. Dilarang intravena.`
  },

  'factor-ix': {
    adultDosage: `• Hemofilia B (Defisiensi Faktor IX):\n  - Dosis (IU) = BB (kg) x Peningkatan Target (%) x 1.2.\n  - Perdarahan Ringan-Sedang: 20-30 IU/kgBB IV tiap 24 jam.\n  - Perdarahan Mayor / Bedah: 60-80 IU/kgBB IV tiap 24 jam.\n  - Profilaksis: 25-40 IU/kgBB IV dua kali seminggu.`,
    pediatricDosage: `• Anak memiliki klirens lebih cepat; sesuaikan dengan pemulihan in vivo.`,
    geriatricDosage: `• Disesuaikan target hemostasis; monitor trombosis.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; risiko trombosis meningkat pada sirosis.`,
    maxDoseLimit: `• Sesuai kalkulasi target pemulihan plasma.`,
    administrationGuideline: `• Rekonstitusi serbuk steril. Infus IV lambat maksimal 2-3 mL/menit. Sediakan Epinefrin untuk antisipasi anafilaksis.`
  },

  'prothrombin-complex': {
    adultDosage: `• Pembalikan Darurat Warfarin (Dosis berdasarkan INR dan BB maks 100 kg):\n  - INR 2.0 - <4.0: 25 IU/kgBB IV (maksimal 2500 IU).\n  - INR 4.0 - 6.0: 35 IU/kgBB IV (maksimal 3500 IU).\n  - INR > 6.0: 50 IU/kgBB IV (maksimal 5000 IU).\n  - Berikan bersama Vitamin K1 (Phytomenadione) 5-10 mg IV lambat.`,
    pediatricDosage: `• Belum ditetapkan untuk anak-anak.`,
    geriatricDosage: `• Disesuaikan berdasarkan INR dan berat badan.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati.`,
    maxDoseLimit: `• Maksimal 5000 IU per dosis tunggal.`,
    administrationGuideline: `• Infus IV lambat awal 1 mL/menit, dapat dinaikkan hingga maksimal 3 IU/kg/menit (maks 8.4 mL/menit). Cek ulang INR 30 menit pasca infus.`
  },

  'factor-viia': {
    adultDosage: `• Hemofilia dengan Antibodi Inhibitor:\n  - 90 mcg/kgBB IV bolus cepat tiap 2-3 jam hingga perdarahan berhenti.\n• Defisiensi Faktor VII Bawaan:\n  - 15 - 30 mcg/kgBB IV tiap 4-6 jam.\n• Perdarahan Pasca Persalinan Masif (PPH):\n  - 60 - 90 mcg/kgBB IV bolus tunggal.`,
    pediatricDosage: `• 90 hingga 120 mcg/kgBB IV bolus tiap 2 jam.`,
    geriatricDosage: `• Dosis terendah efektif; waspadai komplikasi tromboemboli.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai protokol perdarahan darurat.`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INTRAVENA BOLUS CEPAT selama 2-5 menit. DILARANG dicampur dengan cairan infus lain.`
  },

  'factor-viii': {
    adultDosage: `• Hemofilia A (Defisiensi Faktor VIII):\n  - Dosis (IU) = BB (kg) x Peningkatan Target (%) x 0.5.\n  - Perdarahan Sendi Awal: 10-20 IU/kgBB IV tiap 12-24 jam.\n  - Perdarahan Mayor / Bedah: 40-50 IU/kgBB IV awal, lalu 20-25 IU/kgBB tiap 8-12 jam.\n  - Profilaksis: 20-40 IU/kgBB IV tiap 2-3 hari.`,
    pediatricDosage: `• Anak <6 tahun: 25-50 IU/kgBB IV 3 kali seminggu.`,
    geriatricDosage: `• Disesuaikan target hemostasis.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai kalkulasi target persentase plasma.`,
    administrationGuideline: `• Suntikkan INTRAVENA LAMBAT dengan kecepatan maksimal 2-4 mL/menit. Skrining titer inhibitor antibodi (Bethesda) berkala.`
  },

  'feracrylum': {
    adultDosage: `• Hemostasis Topikal Perdarahan Luka:\n  - Basahi kasa steril dengan larutan feracrylum 1% atau oleskan gel 1%, tekan pada area luka berdarah selama 1 hingga 3 menit hingga darah mampet.`,
    pediatricDosage: `• Dosis topikal sama dengan dewasa.`,
    geriatricDosage: `• Dosis topikal sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai luas permukaan luka.`,
    administrationGuideline: `• HANYA UNTUK APLIKASI TOPIKAL LUAR PADA PERMUKAAN LUKA. DILARANG DISUNTIKKAN KE PEMBULUH DARAH.`
  },

  'ephedrine': {
    adultDosage: `• Hipotensi Akut Anestesi Spinal / Epidural:\n  - 5 hingga 10 mg IV bolus lambat (diencerkan menjadi 5 mg/mL), diulang tiap 3-5 menit sesuai kebutuhan hingga TD sistolik normal (maksimal 50 mg).`,
    pediatricDosage: `• 0.5 mg/kgBB per dosis IM, SC, atau IV lambat tiap 4-6 jam.`,
    geriatricDosage: `• Mulai dengan 2.5 - 5 mg IV bolus; lansia rentan aritmia takikardia.`,
    renalDoseAdjustment: `• Gunakan dengan hati-hati; eliminasi ginjal utama.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 50 mg per tindakan (atau 150 mg/24 jam).`,
    administrationGuideline: `• WAJIB DIENCERKAN SEBELUM DISUNTIKKAN IV: Ambil 1 mL ampul 50 mg dan encerkan dengan 9 mL NaCl 0.9% dalam spuit 10 mL (5 mg/mL). Berikan bolus 1-2 mL (5-10 mg).`
  },

  'phenylephrine': {
    adultDosage: `• Hipotensi Anestesi Spinal (IV Bolus):\n  - 50 hingga 100 mcg IV bolus (diencerkan), diulang tiap 2-5 menit sesuai MAP.\n• Syok Vasodilatasi (Infus Kontinu IV):\n  - 0.5 hingga 5 mcg/kg/menit (atau 20-50 mcg/menit) dititrasi target MAP >=65 mmHg.\n• Midriatikum Mata: 1 tetes Cendo Efrisel 10% sebelum tindakan.`,
    pediatricDosage: `• 5 hingga 20 mcg/kgBB IV bolus tiap 10-15 menit.`,
    geriatricDosage: `• Gunakan dosis konservatif; waspadai bradikardia refleks.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai titrasi target MAP ICU.`,
    administrationGuideline: `• WAJIB DIENCERKAN SEBELUM BOLUS: Encerkan 1 mL ampul 10 mg ke dalam 100 mL NaCl 0.9% (100 mcg/mL). Infus kontinu berikan via kateter vena sentral (CVC).`
  },

  'entecavir': {
    adultDosage: `• Hepatitis B Kronis (Naive Nukleosida):\n  - 0.5 mg per oral sekali sehari saat perut kosong.\n• Hepatitis B Resistan Lamivudin / Sirosis Dekompensata:\n  - 1.0 mg per oral sekali sehari saat perut kosong.`,
    pediatricDosage: `• Anak >=2 tahun dengan BB >=32.5 kg: 0.5 mg oral sekali sehari.`,
    geriatricDosage: `• Disesuaikan berdasarkan fungsi ginjal.`,
    renalDoseAdjustment: `• CrCl 30 - 49 mL/min: 0.25 mg/hari (atau 0.5 mg tiap 48 jam).\n• CrCl 10 - 29 mL/min: 0.15 mg/hari (atau 0.5 mg tiap 72 jam).\n• Hemodialisis / CrCl <10 mL/min: 0.05 mg/hari (atau 0.5 mg tiap 7 hari pasca dialisis).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 1.0 mg per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SAAT PERUT KOSONG (minimal 2 jam sebelum atau 2 jam sesudah makan). JANGAN PERNAH MENGHENTIKAN OBAT TIBA-TIBA (risiko hepatitis flare mematikan).`
  },

  'phenoxymethylpenicillin': {
    adultDosage: `• Faringitis Streptokokus Grup A:\n  - 500 mg per oral setiap 6 jam (4 kali sehari) saat perut kosong selama 10 HARI PENUH.\n• Profilaksis Sekunder Demam Rematik:\n  - 250 mg per oral dua kali sehari secara kontinu bertahun-tahun.`,
    pediatricDosage: `• Faringitis Anak: 25-50 mg/kgBB/hari oral terbagi 3-4 dosis selama 10 hari. Profilaksis demam rematik: BB <27 kg: 125 mg 2x/hari; BB >=27 kg: 250 mg 2x/hari.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Gangguan berat (CrCl < 10 mL/min): Perpanjang interval menjadi tiap 8-12 jam.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 2000 mg (2 gram) per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SAAT PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan) dengan air putih. Habiskan 10 hari penuh untuk mencegah demam rematik.`
  },

  'fosfomycin': {
    adultDosage: `• Sistitis Akut Tanpa Komplikasi (Wanita):\n  - 3 gram (1 sachet) per oral DOSIS TUNGGAL SEKALI SAJA.\n• Profilaksis Biopsi Prostat Pria: 3 gram 3 jam pra-tindakan, diulang 3 gram 24 jam pasca tindakan.`,
    pediatricDosage: `• Anak perempuan >=12 tahun: 3 gram oral dosis tunggal. Di bawah 12 tahun: Tidak direkomendasikan.`,
    geriatricDosage: `• 3 gram oral dosis tunggal.`,
    renalDoseAdjustment: `• CrCl >= 10 mL/min: Tidak ada penyesuaian;\n• CrCl < 10 mL/min: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 3 gram per dosis (dosis tunggal).`,
    administrationGuideline: `• Larutkan 1 sachet dalam setengah gelas air putih dingin. Minum saat perut kosong tepat sebelum tidur malam setelah mengosongkan kandung kemih.`
  },

  'framycetin': {
    adultDosage: `• Infeksi Luka Bakar / Trauma Topikal:\n  - Bersihkan luka dengan NaCl 0.9%, tempelkan 1 lembar kasa Sofra-Tulle 1% menutupi luka, tutup dengan kasa kering steril. Ganti perban tiap 24-72 jam.`,
    pediatricDosage: `• Dosis sama dengan dewasa pada area luka terbatas.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Hindari pemakaian pada area luka terbuka sangat luas jika ada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Batasi area aplikasi <20-30% luas permukaan tubuh.`,
    administrationGuideline: `• HANYA UNTUK PENGGUNAAN LUAR PADA PERMUKAAN LUKA BERSIH. Gunakan pinset steril untuk mengambil lembaran kasa perban berlapis parafin.`
  },

  'etanercept': {
    adultDosage: `• Artritis Reumatoid & Spondilitis Ankilosa:\n  - 50 mg disuntikkan secara SUBKUTAN (SC) sekali seminggu (atau 25 mg dua kali seminggu berjarak 72-96 jam).\n• Psoriasis Plak Dewasa:\n  - 50 mg SC dua kali seminggu selama 12 minggu pertama, lalu 50 mg SC sekali seminggu.`,
    pediatricDosage: `• JIA Poliartikular Anak >=2 tahun: 0.8 mg/kgBB SC seminggu sekali (maksimal 50 mg/minggu).`,
    geriatricDosage: `• Dosis sama dengan dewasa; waspadai infeksi serius.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 50 mg per minggu (hingga 100 mg/minggu pada inisiasi psoriasis).`,
    administrationGuideline: `• SUNTIKAN SUBKUTAN (SC) pada paha, perut, atau lengan atas. Rotasi lokasi suntik. Keluarkan dari kulkas 15-30 menit sebelum suntik. Skrining TB Mantoux/IGRA WAJIB NEGATIF sebelum inisiasi.`
  },

  'conjugated-estrogens': {
    adultDosage: `• Gejala Vasomotor Menopause:\n  - 0.3 hingga 0.625 mg per oral sekali sehari, gunakan dosis terendah efektif dengan durasi sesingkat mungkin.\n  - Uterus Utuh: WAJIB DITAMBAHKAN PROGESTIN (misal Medroksiprogesteron 2.5-5 mg/hari) minimal 12-14 hari/bulan untuk mencegah kanker endometrium.`,
    pediatricDosage: `• Hanya untuk induksi pubertas pada hipogonadisme wanita remaja (0.15 - 0.3 mg/hari).`,
    geriatricDosage: `• Gunakan dosis terendah efektif; evaluasi tahunan.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI MUTLAK pada penyakit hepar berat aktif.`,
    maxDoseLimit: `• 1.25 mg per hari.`,
    administrationGuideline: `• Diminum sekali sehari secara teratur (bersama atau tanpa makanan). Reevaluasi berkala setiap 3-6 bulan untuk penghentian atau penurunan dosis sesegera mungkin.`
  },

  'etonogestrel': {
    adultDosage: `• Kontrasepsi Subdermal Jangka Panjang (3 Tahun):\n  - 1 batang implan (68 mg) diinsersikan secara subdermal dangkal pada lengan atas bagian dalam antara hari ke-1 hingga ke-5 siklus menstruasi. Efektif selama 3 tahun penuh.`,
    pediatricDosage: `• Diindikasikan pada remaja pasca menarche.`,
    geriatricDosage: `• Tidak diindikasikan pasca menopause.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI pada penyakit hepar berat aktif.`,
    maxDoseLimit: `• 1 implan per 3 tahun.`,
    administrationGuideline: `• PEMASANGAN HANYA OLEH NAKES TERLATIH secara subdermal dangkal menggunakan aplikator steril. Wajib dipalpasi segera setelah insersi. Cabut atau ganti pada akhir tahun ke-3.`
  },

  'fenoterol': {
    adultDosage: `• Serangan Asma Akut (MDI 100 mcg):\n  - 1 semprotan dihirup saat serangan; dapat diulang 1 semprotan kedua setelah 5 menit bila belum membaik. Maksimal 8 semprotan/24 jam.\n• Larutan Nebulisasi: 0.5 - 1.0 mL diencerkan dalam 3-4 mL NaCl 0.9%.`,
    pediatricDosage: `• Anak >=6 tahun: 1 semprotan (100 mcg) saat sesak; nebulisasi 0.25 - 0.5 mL.`,
    geriatricDosage: `• Dosis sama dengan dewasa; monitor ketat takikardia.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 8 semprotan (800 mcg) per 24 jam.`,
    administrationGuideline: `• TEKNIK MDI: Kocok, hembuskan napas, letakkan corong di bibir, tekan sambil tarik napas dalam, dan tahan napas 10 detik. Gunakan spacer pada anak dan lansia.`
  },

  'fludrocortisone': {
    adultDosage: `• Penyakit Addison (Insufisiensi Adrenal Primer):\n  - 0.05 hingga 0.2 mg (setengah hingga 2 tablet @0.1 mg) per oral satu kali sehari di pagi hari bersama sarapan, wajib dikombinasikan dengan hidrokortison oral.\n• Salt-Losing CAH: 0.05 - 0.2 mg per oral sekali sehari.`,
    pediatricDosage: `• Bayi dan anak CAH: 0.05 hingga 0.15 mg per oral sekali sehari.`,
    geriatricDosage: `• Mulai dosis terendah; pantau ketat tekanan darah dan kalium.`,
    renalDoseAdjustment: `• Gunakan dengan hati-hati; risiko retensi natrium memperberat udem.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 0.2 mg per hari.`,
    administrationGuideline: `• Diminum pagi hari bersama sarapan untuk meminimalkan iritasi lambung. Pantau tensi harian dan kadar kalium darah. Jangan berhenti mendadak.`
  },

  'fluphenazine-decanoate': {
    adultDosage: `• Pemeliharaan Skizofrenia Kronis:\n  - 12.5 hingga 25 mg (0.5 - 1.0 mL) disuntikkan secara INTRAMUSKULAR (IM) DALAM pada otot gluteus bokong setiap 2 hingga 4 minggu sekali.`,
    pediatricDosage: `• KONTRAINDIKASI pada anak usia <12 tahun.`,
    geriatricDosage: `• Mulai 6.25 mg (0.25 mL) tiap 3-4 minggu; lansia rentan gejala ekstrapiramidal.`,
    renalDoseAdjustment: `• Gunakan dengan kehati-hatian.`,
    hepaticDoseAdjustment: `• KONTRAINDIKASI pada penyakit hepar berat.`,
    maxDoseLimit: `• 100 mg per injeksi (jarang melampaui 50 mg tiap 2-4 minggu).`,
    administrationGuideline: `• HANYA SUNTIKAN INTRAMUSKULAR DALAM (Z-track pada otot bokong gluteus). Dilarang intravena. Sediakan antikolinergik (Triheksifenidil) untuk distonia akut.`
  },

  'fluorometholone': {
    adultDosage: `• Inflamasi Mata Pasca Operasi:\n  - 1 tetes suspensi 0.1% pada kantung konjungtiva mata yang sakit 2 hingga 4 kali sehari (dapat dinaikkan tiap 2 jam pada 24-48 jam pertama inflamasi akut).`,
    pediatricDosage: `• Anak >=2 tahun: Dosis sama dengan dewasa. Di bawah 2 tahun: Belum ditetapkan.`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai petunjuk dokter spesialis mata.`,
    administrationGuideline: `• KOCOK DENGAN BAIK SEBELUM DIGUNAKAN (suspensi). Teteskan ke kantung kelopak mata bawah dan lakukan oklusi duktus nasolakrimalis selama 1-2 menit.`
  },

  'fluocinolone': {
    adultDosage: `• Dermatosis Inflamasi Sedang-Berat:\n  - Oleskan krim atau salep 0.025% tipis-tipis merata pada area lesi kulit yang sakit 2 hingga 3 kali sehari. Batasi maksimal 2-4 minggu berturut-turut.`,
    pediatricDosage: `• Anak >=1 tahun: Oleskan tipis 1-2 kali sehari maksimal 5-7 hari; hindari perban ketat/popok oklusif.`,
    geriatricDosage: `• Gunakan durasi sesingkat mungkin; kulit lansia tipis dan rentan memar.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Maksimal 45-50 gram per minggu.`,
    administrationGuideline: `• HANYA UNTUK PENGGUNAAN LUAR PADA KULIT. JANGAN dioleskan pada wajah, lipatan selangkangan, ketiak, atau mata. Jangan ditutup perban kedap udara tanpa resep.`
  },

  'fluticasone-propionate': {
    adultDosage: `• Profilaksis Pemeliharaan Asma Persisten Inhalasi:\n  - Asma Ringan: 100 - 250 mcg per inhalasi dua kali sehari (pagi dan malam).\n  - Asma Sedang-Berat: 250 - 500 mcg per inhalasi dua kali sehari (maks 1000 mcg 2x/hari).\n• Dermatosis Topikal (Cutivate): Oleskan tipis pada lesi 1-2 kali sehari.`,
    pediatricDosage: `• Anak usia 4-16 tahun: 50 hingga 100 mcg per inhalasi dua kali sehari (gunakan spacer).`,
    geriatricDosage: `• Dosis sama dengan dewasa.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Gunakan hati-hati pada disfungsi hepar berat.`,
    maxDoseLimit: `• 1000 mcg per inhalasi dua kali sehari (2000 mcg/hari).`,
    administrationGuideline: `• BUKAN OBAT PELEGA SESAK AKUT. Hirup teratur setiap hari. WAJIB BERKUMUR DAN MEMBUANG AIRNYA sesudah menghirup obat untuk mencegah sariawan jamur dan suara serak.`
  },

  'fluvoxamine': {
    adultDosage: `• Obsessive-Compulsive Disorder (OCD):\n  - Dosis awal: 50 mg per oral sekali sehari diminum malam hari sebelum tidur.\n  - Titrasi tiap 4-7 hari dengan kelipatan 50 mg hingga dosis efektif 100 - 300 mg/hari (bila >100 mg/hari, bagi 2 dosis terpisah).\n• Gangguan Depresi Mayor: 50 - 100 mg oral sekali sehari malam hari.`,
    pediatricDosage: `• OCD Anak 8-17 tahun: Mulai 25 mg oral malam hari, titrasi tiap 4-7 hari (maksimal 200 mg/hari).`,
    geriatricDosage: `• Mulai 25-50 mg malam hari; titrasi lebih lambat; monitor natrium serum.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Titrasi dosis lebih lambat; metabolisme hepar ekstensif.`,
    maxDoseLimit: `• 300 mg per hari.`,
    administrationGuideline: `• Telan tablet utuh sebelum tidur malam. JANGAN DIKUNYAH. Kurangi minum kopi/teh (inhibisi CYP1A2 menaikkan kadar kafein 5x lipat). Taper-off bertahap saat penghentian.`
  },

  'ganciclovir': {
    adultDosage: `• Induksi Retinitis CMV pada Pasien Immunocompromised:
  - 5 mg/kgBB infus IV dengan kecepatan konstan selama 60 menit tiap 12 jam selama 14-21 hari.
• Pemeliharaan Retinitis CMV:
  - 5 mg/kgBB infus IV selama 60 menit sekali sehari, 7 hari seminggu, atau 6 mg/kgBB sekali sehari 5 hari seminggu.
• Profilaksis Infeksi CMV Pasca Transplantasi Organ:
  - 5 mg/kgBB IV tiap 12 jam selama 7-14 hari, dilanjutkan 5 mg/kgBB IV sekali sehari hingga hari ke-100 pasca transplantasi.`,
    pediatricDosage: `• Neonatus dengan Penyakit CMV Kongenital Simtomatik:
  - 6 mg/kgBB IV tiap 12 jam selama 6 minggu (pantau hitung neutrofil ketat).`,
    geriatricDosage: `• Evaluasi klirens kreatinin dengan cermat; risiko toksisitas mielosupresi meningkat akibat penurunan fungsi ginjal fisiologis.`,
    renalDoseAdjustment: `• CrCl 50-69 mL/menit: Dosis induksi 2.5 mg/kgBB tiap 12 jam; pemeliharaan 2.5 mg/kgBB tiap 24 jam.
• CrCl 25-49 mL/menit: Dosis induksi 2.5 mg/kgBB tiap 24 jam; pemeliharaan 1.25 mg/kgBB tiap 24 jam.
• CrCl 10-24 mL/menit: Dosis induksi 1.25 mg/kgBB tiap 24 jam; pemeliharaan 0.625 mg/kgBB tiap 24 jam.
• CrCl <10 mL/menit / Hemodialisis: Dosis induksi 1.25 mg/kgBB 3x seminggu pasca hemodialisis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis spesifik (eliminasi ginjal dominan).`,
    maxDoseLimit: `• 10 mg/kgBB per hari (terbagi dalam 2 dosis induksi).`,
    administrationGuideline: `• HANYA DIBERIKAN MELALUI INFUS INTRAVENA SELAMA MINIMAL 60 MENIT. DILARANG BOLUS CEPAT ATAU INTRAMUSKULAR (pH basa 11 memicu flebitis nekrotik). Rekonstitusi dengan Water for Injection tanpa pengawet lalu encerkan dalam 100 mL NaCl 0.9% atau D5W. Pastikan hidrasi adekuat.`
  },

  'gefitinib': {
    adultDosage: `• Kanker Paru Bukan Sel Kecil (NSCLC) Mutasi EGFR Sensitif:
  - 250 mg per oral sekali sehari, diminum pada waktu yang sama setiap hari dengan atau tanpa makanan.
  - Lanjutkan terapi hingga progresivitas penyakit atau timbul toksisitas yang tidak dapat ditoleransi.`,
    pediatricDosage: `• Keamanan dan efikasi belum ditetapkan pada populasi pediatrik (tidak diindikasikan).`,
    geriatricDosage: `• Tidak memerlukan penyesuaian dosis awal berdasarkan usia lansia saja.`,
    renalDoseAdjustment: `• Gangguan Ginjal Ringan-Sedang: Tidak memerlukan penyesuaian dosis.
• CrCl <20 mL/menit / Penyakit Ginjal Tahap Akhir: Gunakan dengan sangat hati-hati (data klinis terbatas).`,
    hepaticDoseAdjustment: `• Gangguan Hepar Ringan-Sedang (Child-Pugh A-B): Tidak memerlukan penyesuaian dosis awal.
• Gangguan Hepar Berat (Child-Pugh C): Hindari atau gunakan dengan pengawasan ketat. Tunda jika ALT/AST >5x ULN.`,
    maxDoseLimit: `• 250 mg per hari. Dosis lebih tinggi tidak meningkatkan efikasi dan meningkatkan toksisitas secara bermakna.`,
    administrationGuideline: `• Telan tablet utuh dengan segelas air.
• Jika sulit menelan: larutkan tablet dalam setengah gelas air minum biasa (non-karbonasi), aduk selama 20 menit hingga terdispersi sempurna, segera minumkan, dan bilas gelas dengan setengah gelas air untuk memastikan seluruh dosis terminum.
• Hindari konsumsi bersama PPI (Omeprazole) karena menurunkan penyerapan obat hingga >40%.`
  },

  'gemcitabine': {
    adultDosage: `• Kanker Pankreas Stadium Lanjut / Metastatik:
  - 1000 mg/m2 LPT infus IV selama 30 menit sekali seminggu selama 7 minggu berturut-turut, diikuti 1 minggu istirahat (Siklus 8 minggu).
  - Siklus berikutnya: 1000 mg/m2 sekali seminggu selama 3 minggu berturut-turut tiap 4 minggu (Siklus 28 hari).
• Kanker Paru NSCLC:
  - 1000 mg/m2 IV hari 1, 8, dan 15 tiap 4 minggu (bersama Cisplatin hari 1), atau 1250 mg/m2 hari 1 dan 8 tiap 3 minggu.
• Kanker Payudara Metastatik:
  - 1250 mg/m2 IV hari 1 dan 8 tiap 21 hari (bersama Paclitaxel hari 1).
• Kanker Kandung Kemih:
  - 1000 mg/m2 IV hari 1, 8, dan 15 tiap 28 hari (bersama Cisplatin).`,
    pediatricDosage: `• Keamanan dan efikasi pada anak belum ditetapkan secara baku.`,
    geriatricDosage: `• Klirens gemcitabine menurun pada lansia; monitor toksisitas hematologik derajat 3/4 lebih ketat.`,
    renalDoseAdjustment: `• Serum Kreatinin >1.6 mg/dL: Gunakan dengan kehati-hatian; pantau sindrom uremik hemolitik (HUS).`,
    hepaticDoseAdjustment: `• Bilirubin 1.6 - 3.0 mg/dL: Pertimbangkan reduksi dosis awal menjadi 800 mg/m2. Bilirubin >3.0 mg/dL: Data klinis terbatas, pantau ketat.`,
    maxDoseLimit: `• Disesuaikan berdasarkan luas permukaan tubuh (LPT); durasi infus MAKSIMAL 60 MENIT (dilarang melebihi 60 menit).`,
    administrationGuideline: `• HANYA DIBERIKAN INFUS INTRAVENA SELAMA 30 MENIT.
• JANGAN MEMPERPANJANG WAKTU INFUS MELEBIHI 60 MENIT (memperpanjang waktu infus memicu peningkatan toksisitas mielosupresi parah).
• Rekonstitusi serbuk 200 mg dengan 5 mL NaCl 0.9% dan 1 g dengan 25 mL NaCl 0.9% tanpa pengawet.`
  },

  'glycopyrronium': {
    adultDosage: `• Terapi Pemeliharaan PPOK (Penyakit Paru Obstruktif Kronis):
  - 1 kapsul inhalasi (50 mcg glikopironium bromida) dihirup sekali sehari pada jam yang sama setiap hari menggunakan perangkat inhaler Breezhaler.`,
    pediatricDosage: `• Tidak diindikasikan untuk anak-anak (PPOK adalah penyakit dewasa).`,
    geriatricDosage: `• Tidak memerlukan penyesuaian dosis awal pada lansia.`,
    renalDoseAdjustment: `• CrCl >=30 mL/menit: Tidak memerlukan penyesuaian dosis.
• CrCl <30 mL/menit / Hemodialisis: Gunakan hanya jika manfaat melampaui risiko potensial efek samping antikolinergik sistemik.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (metabolisme hepar minimal).`,
    maxDoseLimit: `• 50 mcg (1 kapsul inhalasi) per hari.`,
    administrationGuideline: `• HANYA UNTUK DIHIRUP MENGGUNAKAN INHALER BREEZHALER. DILARANG DITELAN SEBAGAI KAPSUL ORAL.
• Masukkan kapsul ke ruang kapsul inhaler, tekan penindik sekali, lalu hirup serbuk napas dalam-dalam melalui corong mulut.
• BUKAN OBAT PELEGA SESAK AKUT; selalu siapkan SABA pelega terpisah.`
  },

  'glipizide': {
    adultDosage: `• Diabetes Melitus Tipe 2:
  - Dosis awal: 5 mg oral sekali sehari, diminum 30 menit sebelum sarapan pagi.
  - Pasien usia lanjut atau gangguan hepar/ginjal: Dosis awal 2.5 mg sekali sehari.
  - Titrasi: Naikkan 2.5-5 mg dengan interval beberapa hari sesuai respons glukosa darah puasa.
  - Dosis pemeliharaan: 5 - 20 mg per hari (dosis >15 mg/hari dapat dibagi 2 kali sehari).`,
    pediatricDosage: `• Keamanan dan efikasi pada populasi anak belum ditetapkan (tidak direkomendasikan).`,
    geriatricDosage: `• Mulai dari dosis konservatif 2.5 mg/hari; titrasi perlahan; risiko hipoglikemia berat meningkat pada lansia.`,
    renalDoseAdjustment: `• CrCl <50 mL/menit: Mulai dengan dosis awal 2.5 mg/hari; pantau glukosa darah ketat (risiko akumulasi dan hipoglikemia berkepanjangan).`,
    hepaticDoseAdjustment: `• Gangguan Hepar Ringan-Sedang: Mulai dengan dosis 2.5 mg/hari.
• Gangguan Hepar Berat: Kontraindikasi (sintesis glukosa terganggu dan klirens glipizide menurun).`,
    maxDoseLimit: `• 40 mg per hari (tablet konvensional); 20 mg per hari (tablet pelepasan lambat XL).`,
    administrationGuideline: `• WAJIB DIMINUM TEPAT 30 MENIT SEBELUM MAKAN PAGI (atau sebelum makan makanan utama pertama hari itu).
• Jangan melewatkan jadwal makan setelah meminum obat untuk mencegah hipoglikemia berat.`
  },

  'glycerol': {
    adultDosage: `• Konstipasi Akut Rektal:
  - 1 supositoria dewasa (2 - 3 gram) dimasukkan ke dalam rektum sekali saat dibutuhkan, atau 5 - 10 mL enema rektal gliserin. Efek evakuasi feses tercapai dalam 15-30 menit.
• Penurunan Tekanan Intraokular Glaukoma Akut (Rute Oral):
  - 1 - 1.5 g/kgBB oral (diberikan sebagai larutan 50% dingin dicampur perasan lemon) diminum 60-90 menit pra-tindakan bedah.`,
    pediatricDosage: `• Konstipasi Rektal Anak 2-6 tahun: 1 supositoria anak (1 - 1.5 g) rektal.
• Anak <2 tahun: Gunakan di bawah pengawasan dokter (enema gliserin bayi).`,
    geriatricDosage: `• Aman untuk rute rektal; hindari penggunaan oral dosis tinggi pada lansia dehidrasi atau gagal jantung.`,
    renalDoseAdjustment: `• Rektal: Tidak ada penyesuaian dosis.
• Oral: Kontraindikasi pada anuria / gagal ginjal oligurik akut.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Rektal: 1 supositoria per 24 jam (jangan digunakan terus menerus >7 hari berturut-turut).`,
    administrationGuideline: `• Supositoria Rektal: Basahi ujung supositoria dengan air dingin, masukkan sedalam mungkin ke dalam lubang dubur, dan tahan posisi berbaring selama 15-30 menit sampai timbul dorongan kuat buang air besar.
• Oral: Sajikan dingin dengan es batu dan tambahkan perasan jeruk lemon untuk menutupi rasa manis pekat yang memicu mual.`
  },

  'goserelin': {
    adultDosage: `• Kanker Prostat Stadium Lanjut:
  - Zoladex 3.6 mg: 1 implan silinder disuntikkan secara subkutan ke dinding abdomen anterior setiap 28 hari, ATAU
  - Zoladex 10.8 mg: 1 implan silinder subkutan setiap 12 minggu (3 bulan sekali).
• Kanker Payudara Sensitif Hormon Premenopause:
  - Zoladex 3.6 mg: 1 implan silinder subkutan setiap 28 hari.
• Endometriosis / Penipisan Endometrium / Mioma Uteri:
  - Zoladex 3.6 mg subkutan tiap 28 hari (durasi terapi maksimal 6 bulan untuk endometriosis).`,
    pediatricDosage: `• Tidak diindikasikan pada populasi pediatrik.`,
    geriatricDosage: `• Tidak memerlukan penyesuaian dosis berdasarkan usia lanjut.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan hepar.`,
    maxDoseLimit: `• 3.6 mg per 28 hari atau 10.8 mg per 12 minggu.`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA SUBKUTAN PADA DINDING PERUT ANTERIOR DI BAWAH GARIS PUSAT.
• Gunakan aplikator khusus bawaan pabrik dengan sudut suntikan 30-45 derajat.
• DILARANG INTRAVENA ATAU INTRAMUSKULAR. Berhati-hati pada pasien kurus untuk mencegah tusukan pada pembuluh darah dinding abdomen.`
  },

  'hepatitis-b-immunoglobulin': {
    adultDosage: `• Pajanan Jarum Suntik / Darah Terkontaminasi HBsAg (Needlestick Injury):
  - 0.06 mL/kgBB (lazimnya 3 - 5 mL) disuntikkan secara INTRAMUSKULAR (IM) sesegera mungkin dalam 24 jam pertama pasca pajanan, bersamaan dengan dosis pertama Vaksin Hepatitis B.
• Pajanan Seksual Akut dengan Penderita Hepatitis B:
  - 0.06 mL/kgBB IM dalam 14 hari pasca kontak seksual terakhir.`,
    pediatricDosage: `• Pencegahan Transmisi Perinatal pada Bayi Baru Lahir dari Ibu HBsAg+:
  - 0.5 mL disuntikkan secara INTRAMUSKULAR (IM) pada paha anterolateral sesegera mungkin DALAM WAKTU 12 JAM PERTAMA SETELAH PERSALINAN, bersamaan dengan dosis pertama Vaksin Hepatitis B di paha yang berseberangan.`,
    geriatricDosage: `• Dosis dewasa standar berdasarkan berat badan (0.06 mL/kgBB).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai berat badan dan protokol pajanan (biasanya 5 mL per dosis dewasa).`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INTRAMUSKULAR (IM). DILARANG KERAS INTRAVENA (memicu syok anafilaktoid).
• Pada bayi baru lahir: suntikkan pada otot paha anterolateral (vastus lateralis) dengan spuit terpisah dari vaksin hepatitis B aktif. Simpan di kulkas 2-8°C, jangan dibekukan.`
  },

  'hydroxyurea': {
    adultDosage: `• Trombositemia Esensial & Polisitemia Vera:
  - Dosis awal: 15 mg/kgBB/hari oral dosis tunggal, disesuaikan untuk mempertahankan hitung trombosit 400.000-500.000/mcL tanpa leukopenia berlebih.
• Leukemia Mieloid Kronis (CML):
  - 20 - 30 mg/kgBB/hari oral dosis tunggal harian.
• Anemia Sel Sabit (Sickle Cell Anemia):
  - Dosis awal: 15 mg/kgBB/hari oral dosis tunggal. Dapat dititrasi naik 5 mg/kgBB/hari tiap 12 minggu hingga dosis maksimal 35 mg/kgBB/hari yang dapat ditoleransi.`,
    pediatricDosage: `• Anemia Sel Sabit Anak (Usia >=9 bulan):
  - Dosis awal 20 mg/kgBB/hari oral dosis tunggal; titrasi naik bertahap tiap 8-12 minggu hingga maksimal 35 mg/kgBB/hari.`,
    geriatricDosage: `• Lebih rentan mengalami supresi sumsum tulang; gunakan dosis batas bawah dan monitor hitung darah lebih sering.`,
    renalDoseAdjustment: `• CrCl >=60 mL/menit: Dosis penuh normal.
• CrCl <60 mL/menit / Hemodialisis: Kurangi dosis sebesar 50% (berikan pasca dialisis pada hari dialisis).`,
    hepaticDoseAdjustment: `• Tidak ada rekomendasi penyesuaian dosis spesifik; pantau fungsi hepar berkala.`,
    maxDoseLimit: `• 35 mg/kgBB per hari (pada anemia sel sabit) atau 80 mg/kgBB per hari dosis intermiten tiap 3 hari.`,
    administrationGuideline: `• Telan kapsul utuh dengan segelas air. JANGAN DIBUKA ATAU DIKUNYAH.
• PETUGAS / PENGASUH WAJIB MENGENAKAN SARUNG TANGAN saat menangani kapsul. Cuci tangan sebelum dan sesudah memegang obat.
• Anjurkan pasien minum air putih dalam jumlah banyak untuk mencegah peningkatan asam urat.`
  },

  'homatropine': {
    adultDosage: `• Uveitis Anterior Akut / Iridosiklitis:
  - Teteskan 1 tetes larutan 2% ke dalam kantung konjungtiva mata yang sakit, 2 hingga 3 kali sehari (tiap 8-12 jam).
• Refraksi Sikloplegik Mata:
  - Teteskan 1 tetes larutan 2%, dapat diulang 1 kali setelah 5-10 menit sebelum pemeriksaan refraksi (onset sikloplegia 30-60 menit).`,
    pediatricDosage: `• Refraksi Sikloplegik Pediatrik:
  - Teteskan 1 tetes larutan 2% ke setiap mata, dapat diulang setelah 10 menit (lakukan oklusi sudut mata ketat untuk mencegah toksisitas sistemik).`,
    geriatricDosage: `• Periksa bilik mata depan sebelum penetesan; lansia lebih rentan terhadap serangan glaukoma sudut tertutup akut.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (aplikasi topikal mata).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 1 tetes per aplikasi, maksimal 3 kali sehari.`,
    administrationGuideline: `• Cuci tangan bersih. Miringkan kepala ke belakang dan teteskan 1 tetes ke dalam kelopak mata bawah.
• WAJIB LAKUKAN OKLUSI NASOLAKRIMALIS: Tekan sudut dalam mata dekat pangkal hidung selama 1-2 menit setelah meneteskan obat untuk mencegah penyerapan sistemik. Lepas lensa kontak sebelum penetesan.`
  },

  'insulin-nph': {
    adultDosage: `• Diabetes Melitus Tipe 1 dan Tipe 2:
  - Dosis sangat individual berdasarkan profil glukosa darah harian pasien.
  - DM Tipe 2 Belum Pernah Insulin: Dosis awal lazim 0.1 - 0.2 IU/kgBB/hari atau 10 IU subkutan sebelum tidur malam (bedtime NPH), dititrasi naik 2 IU tiap 3 hari hingga target GDP 80-130 mg/dL tercapai.
  - Rejimen 2 Kali Sehari: 2/3 dosis total diberikan sebelum sarapan pagi dan 1/3 dosis sebelum makan malam/tidur.`,
    pediatricDosage: `• Dosis individual di bawah bimbingan dokter endokrin anak (komponen basal sekitar 40-50% dari total kebutuhan insulin harian 0.5-1.0 IU/kgBB/hari).`,
    geriatricDosage: `• Titrasi sangat konservatif; target glikemik lebih longgar (GDP 100-150 mg/dL) untuk menghindari hipoglikemia yang fatal.`,
    renalDoseAdjustment: `• Penurunan fungsi ginjal mengurangi degradasi insulin (risiko hipoglikemia meningkat):
  - CrCl 10-50 mL/menit: Kurangi dosis total sekitar 25%.
  - CrCl <10 mL/menit: Kurangi dosis total sekitar 50%.`,
    hepaticDoseAdjustment: `• Kebutuhan insulin dapat menurun akibat penurunan glukoneogenesis hepar; pantau glukosa ketat.`,
    maxDoseLimit: `• Tidak ada batas dosis maksimal absolut (dititrasi sesuai kebutuhan kontrol glikemik tanpa memicu hipoglikemia).`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA SUBKUTAN (PERUT, PAHA, LENGAN ATAS). DILARANG KERAS INTRAVENA.
• HOMOGENISASI WAJIB: Putar dan balikkan pen insulin 10-20 kali hingga cairan keruh putih merata sebelum penyuntikan.
• Ganti jarum setiap kali suntik dan rotasikan lokasi suntikan untuk mencegah lipohipertrofi.`
  },

  'tetanus-immunoglobulin': {
    adultDosage: `• Profilaksis Pasca Pajanan Luka Berisiko Tetanus:
  - 250 IU disuntikkan secara INTRAMUSKULAR (IM) dosis tunggal sesegera mungkin pasca cedera.
  - Naikkan menjadi 500 IU jika luka sangat kotor, terkontaminasi tanah/feses/karat berat, terlambat diobati (>24 jam), atau pada pasien luka bakar/obesitas.
  - Berikan bersamaan dengan Vaksin Tetanus Toksoid (Td) di sisi tubuh yang berseberangan.
• Terapi Tetanus Aktif Klinis:
  - 3.000 hingga 6.000 IU IM dosis terbagi pada beberapa lokasi suntikan otot besar.`,
    pediatricDosage: `• Dosis profilaksis pediatrik sama dengan dosis dewasa: 250 IU IM dosis tunggal (karena kebutuhan penetralan toksin tidak bergantung pada berat badan).`,
    geriatricDosage: `• Dosis profilaksis dewasa standar (250 IU IM).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 500 IU untuk profilaksis; 6.000 IU untuk terapi kuratif.`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INTRAMUSKULAR DALAM (otot deltoid atau paha anterolateral). DILARANG INTRAVENA.
• Berikan vaksinasi aktif tetanus toksoid (Td / DTP) pada LOKASI TUBUH YANG BERLAWANAN menggunakan spuit terpisah. Simpan di kulkas 2-8°C.`
  },

  'idarubicin': {
    adultDosage: `• Leukemia Mieloid Akut (AML) - Rejimen Induksi 3+7:
  - 12 mg/m2 LPT per hari disuntikkan secara intravena lambat selama 10-15 menit selama 3 hari berturut-turut (Hari 1, 2, dan 3), dikombinasikan dengan Sitarabin infus kontinu 100 mg/m2/hari selama 7 hari berturut-turut.
• AML Konsolidasi:
  - 10 - 12 mg/m2 IV per hari selama 2 hari berturut-turut.`,
    pediatricDosage: `• AML Pediatrik: 10 - 12 mg/m2/hari IV selama 3 hari dalam protokol kemoterapi kombinasi leukemia anak.`,
    geriatricDosage: `• Pasien usia >60 tahun memiliki risiko kardiotoksisitas dan mielosupresi fatal lebih tinggi; evaluasi fraksi ejeksi ventrikel kiri (LVEF) sebelum inisiasi.`,
    renalDoseAdjustment: `• Serum Kreatinin >2.0 mg/dL: Pertimbangkan reduksi dosis sebesar 25%.`,
    hepaticDoseAdjustment: `• Bilirubin 1.5 - 3.0 mg/dL: Kurangi dosis sebesar 50%.
• Bilirubin >3.0 mg/dL: Kontraindikasi / tunda terapi (klirens empedu terhambat).`,
    maxDoseLimit: `• Batas Dosis Kumulatif Seumur Hidup: MAKSIMAL 137 mg/m2 pada dewasa (untuk mencegah kardiomiopati ireversibel fatal).`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INTRAVENA LAMBAT SELAMA 10-15 MENIT KE DALAM ALIRAN INFUS NACL 0.9% BEBAS HAMBATAN. DILARANG INTRAMUSKULAR ATAU SUBKUTAN.
• BAHAYA EKSTRAVASASI: Agen vesikan kuat. Jika terjadi ekstravasasi, segera hentikan infus, aspirasi sisa obat, beri kompres dingin, dan berikan antidotum Deksrazoksan (Savene) untuk mencegah nekrosis jaringan parah. Urin akan berwarna kemerahan selama 1-2 hari.`
  },

  'ifosfamide': {
    adultDosage: `• Kanker Testis / Sarkoma / Kanker Serviks / Limfoma:
  - 1.2 hingga 2.0 g/m2 LPT per hari secara infus IV selama 30-120 menit selama 3 hingga 5 hari berturut-turut, diulang setiap 3-4 minggu (Siklus 21-28 hari).
• WAJIB DIBERIKAN BERSAMA UROPROTEKTOR MESNA:
  - Dosis total Mesna minimal 60% dari dosis harian ifosfamid (diberikan sebagai 20% pada jam ke-0 bersamaan infus ifosfamid, 20% pada jam ke-4, dan 20% pada jam ke-8 pasca ifosfamid).`,
    pediatricDosage: `• Sarkoma Ewing / Rhabdomyosarcoma Pediatrik:
  - 1.2 hingga 1.8 g/m2/hari IV selama 3-5 hari berturut-turut bersama Mesna dan hidrasi cairan masif.`,
    geriatricDosage: `• Pasien lansia lebih rentan terhadap ensefalopati neurotoksik dan mielosupresi; evaluasi fungsi ginjal dengan cermat.`,
    renalDoseAdjustment: `• Serum Kreatinin >1.5 kali ULN atau CrCl <50 mL/menit: Tunda terapi atau reduksi dosis ifosfamid sebesar 20-30% (pantau sindrom Fanconi).`,
    hepaticDoseAdjustment: `• Bilirubin >1.5 kali ULN: Gunakan dengan sangat hati-hati; aktivasi prodrug terjadi di hepar.`,
    maxDoseLimit: `• Disesuaikan berdasarkan luas permukaan tubuh (LPT); lazimnya maksimal 2.0 g/m2 per hari.`,
    administrationGuideline: `• HANYA DIBERIKAN MELALUI INFUS INTRAVENA (30-120 menit).
• UROPROTEKSI WAJIB DENGAN MESNA untuk mengikat metabolit akrolein di kandung kemih dan mencegah sistitis hemoragika berdarah.
• HIDRASI CAIRAN MASIF: Berikan cairan infus minimal 2-3 Liter per hari dan anjurkan pasien buang air kecil tiap 2 jam.`
  },

  'iloprost': {
    adultDosage: `• Hipertensi Arteri Pulmonal (PAH NYHA Kelas III):
  - Dosis awal: 2.5 mcg per sesi inhalasi menggunakan nebulizer ultrasonik adaptif khusus (I-neb AAD).
  - Jika ditoleransi dengan baik, tingkatkan dosis menjadi 5.0 mcg per sesi inhalasi.
  - Frekuensi: 6 hingga 9 kali sehari (interval antar sesi minimal 2 jam, disesuaikan saat jam bangun tidur).`,
    pediatricDosage: `• Keamanan dan efikasi pada anak-anak belum ditetapkan secara klinis.`,
    geriatricDosage: `• Titrasi secara hati-hati; pantau tekanan darah sebelum setiap sesi inhalasi (risiko sinkop hipotensi).`,
    renalDoseAdjustment: `• Gangguan Ginjal Ringan-Sedang: Tidak memerlukan penyesuaian dosis.
• Gagal Ginjal Tahap Akhir / Hemodialisis: Eliminasi menurun; titrasi interval dosis lebih panjang.`,
    hepaticDoseAdjustment: `• Gangguan Hepar Ringan-Sedang: Mulai dengan dosis awal 2.5 mcg dengan interval antar inhalasi minimal 3-4 jam.
• Gangguan Hepar Berat (Child-Pugh C): Hindari penggunaan.`,
    maxDoseLimit: `• 45 mcg per hari (maksimal 9 sesi inhalasi @ 5.0 mcg per hari).`,
    administrationGuideline: `• HANYA UNTUK DIHIRUP MENGGUNAKAN NEBULIZER ultrasonik khusus (seperti sistem I-neb AAD). DILARANG DITELAN ATAU DISUNTIKKAN.
• Setiap sesi inhalasi membutuhkan waktu sekitar 4-10 menit. Pasien harus dalam posisi duduk santai. Jangan hirup jika tekanan darah sistolik <85 mmHg.`
  },

  'imidafenacin': {
    adultDosage: `• Overactive Bladder (OAB) / Kandung Kemih Hiperaktif:
  - 0.1 mg per oral 2 kali sehari, diminum setelah makan pagi dan setelah makan malam.
  - Dosis dapat ditingkatkan menjadi 0.2 mg 2 kali sehari jika respons perbaikan klinis belum memadai pada pasien tanpa gangguan hepar/ginjal.`,
    pediatricDosage: `• Keamanan dan efikasi pada anak-anak belum ditetapkan (tidak diindikasikan).`,
    geriatricDosage: `• Tidak memerlukan penyesuaian dosis awal; monitor efek samping retensi urin dan mulut kering.`,
    renalDoseAdjustment: `• Gangguan Ginjal Ringan-Sedang: Tidak memerlukan penyesuaian dosis.
• Gangguan Ginjal Berat: Batasi dosis maksimal 0.1 mg 2 kali sehari.`,
    hepaticDoseAdjustment: `• Gangguan Hepar Ringan-Sedang: Batasi dosis maksimal 0.1 mg 2 kali sehari.
• Gangguan Hepar Berat: Kontraindikasi (data klinis belum tersedia).`,
    maxDoseLimit: `• 0.4 mg per hari (0.2 mg 2 kali sehari).`,
    administrationGuideline: `• Telan tablet utuh dengan segelas air sesudah makan pagi dan malam. JANGAN DIKUNYAH ATAU DIHANCURKAN.
• Jika timbul kesulitan berkemih, segera hubungi dokter (waspadai retensi urin).`
  },

  'imidapril': {
    adultDosage: `• Hipertensi Esensial:
  - Dosis awal: 5 mg oral sekali sehari pada pagi hari sebelum sarapan.
  - Titrasi: Setelah 2-4 minggu, dosis dapat ditingkatkan menjadi 10 mg oral sekali sehari jika tekanan darah belum terkontrol.
  - Dosis pemeliharaan: 5 - 10 mg sekali sehari.
• Nefropati Diabetik Disertai Hipertensi:
  - 5 mg oral sekali sehari pada pagi hari.`,
    pediatricDosage: `• Keamanan dan efikasi pada populasi anak belum ditetapkan.`,
    geriatricDosage: `• Dosis awal 2.5 mg oral sekali sehari pagi hari; titrasi perlahan dengan pemantauan tekanan darah dan fungsi ginjal.`,
    renalDoseAdjustment: `• CrCl 30-80 mL/menit: Dosis awal 2.5 mg sekali sehari; dosis maksimal 10 mg/hari.
• CrCl 10-29 mL/menit: Dosis awal 2.5 mg sekali sehari; dosis maksimal 5 mg/hari.
• CrCl <10 mL/menit / Hemodialisis: Kontraindikasi atau gunakan di bawah pengawasan nefrologi ketat.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; hidrolisis prodrug imidapril menjadi imidaprilat dapat sedikit tertunda.`,
    maxDoseLimit: `• 20 mg per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SEKALI SEHARI PADA PAGI HARI SEKITAR 15 MENIT SEBELUM SARAPAN.
• Makanan menurunkan bioavailabilitas obat secara bermakna. KONTRAINDIKASI MUTLAK PADA WANITA HAMIL (toksisitas fetotoksik janin).`
  },

  'intravenous-immunoglobulin': {
    adultDosage: `• Immune Thrombocytopenia (ITP) Akut / Refrakter:
  - 1 g/kgBB/hari infus IV selama 1-2 hari berturut-turut, ATAU 0.4 g/kgBB/hari selama 2-5 hari berturut-turut.
• Sindrom Guillain-Barré (GBS):
  - 0.4 g/kgBB/hari infus IV selama 5 hari berturut-turut (total dosis kumulatif 2 g/kgBB).
• Polineuropati Demielinisasi Inflamatorik Kronis (CIDP):
  - Dosis muatan 2 g/kgBB terbagi dalam 2-4 hari, dilanjutkan dosis pemeliharaan 1 g/kgBB tiap 3 minggu.
• Defisiensi Imun Primer (PID):
  - 0.2 hingga 0.8 g/kgBB infus IV tiap 3-4 minggu untuk mempertahankan kadar IgG palung (trough) >500 mg/dL.`,
    pediatricDosage: `• Penyakit Kawasaki Anak:
  - Dosis tunggal 2 g/kgBB infus IV selama 10-12 jam, diberikan bersamaan dengan Aspirin dosis tinggi (80-100 mg/kgBB/hari) dalam 10 hari pertama awitan demam.
• ITP Akut Pediatrik: 0.8 - 1 g/kgBB dosis tunggal (dapat diulang 1 kali jika trombosit <20.000/mcL).`,
    geriatricDosage: `• Mulai dengan kecepatan infus paling lambat; pastikan hidrasi cukup untuk mencegah gagal ginjal nefrosis osmotik dan tromboemboli.`,
    renalDoseAdjustment: `• Pasien Gangguan Ginjal atau Risiko Gagal Ginjal Akut:
  - Kurangi konsentrasi larutan (gunakan larutan 5%), batasi kecepatan infus maksimal <2 mg/kgBB/menit, dan pastikan hidrasi cairan adekuat.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 2 g/kgBB per siklus terapi.`,
    administrationGuideline: `• HANYA DIBERIKAN MELALUI INFUS INTRAVENA MENGGUNAKAN INFUSION PUMP. DILARANG INTRAMUSKULAR ATAU SUBKUTAN.
• Mulai dengan kecepatan lambat (0.5 - 1.0 mg/kgBB/menit selama 30 menit pertama), lalu naikkan bertahap tiap 30 menit hingga maksimal 4 - 8 mg/kgBB/menit jika tidak timbul reaksi infus. Hidrasi pasien dengan baik sebelum infus.`
  },

  'indacaterol': {
    adultDosage: `• Terapi Pemeliharaan PPOK:
  - 1 kapsul inhalasi 150 mcg dihirup sekali sehari pada jam yang sama setiap hari menggunakan perangkat inhaler Breezhaler.
  - Pada kasus PPOK berat: Dosis dapat ditingkatkan menjadi 300 mcg sekali sehari di bawah bimbingan dokter spesialis paru.`,
    pediatricDosage: `• Tidak diindikasikan untuk anak-anak (PPOK adalah penyakit dewasa).`,
    geriatricDosage: `• Tidak memerlukan penyesuaian dosis awal pada pasien usia lanjut.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Gangguan Hepar Ringan-Sedang: Tidak memerlukan penyesuaian dosis.
• Gangguan Hepar Berat: Gunakan dengan hati-hati (data klinis terbatas).`,
    maxDoseLimit: `• 300 mcg per hari (1 kapsul 300 mcg sekali sehari).`,
    administrationGuideline: `• HANYA UNTUK DIHIRUP MENGGUNAKAN INHALER BREEZHALER. DILARANG KERAS MENELAN KAPSUL SECARA ORAL.
• Hirup serbuk obat dalam-dalam melalui corong mulut inhaler. Batuk ringan dalam 15 detik pertama pasca inhalasi adalah hal yang lazim dan tidak berbahaya.
• KONTRAINDIKASI PADA MONOTERAPI ASMA TANPA STEROID INHALASI.`
  },

  'irinotecan': {
    adultDosage: `• Kanker Kolorektal Stadium Lanjut / Metastatik:
  - Rejimen Kombinasi FOLFIRI: 180 mg/m2 LPT infus IV selama 90 menit setiap 2 minggu (Hari ke-1 siklus 14 hari), bersama 5-FU dan Leucovorin.
  - Monoterapi Tiap 3 Minggu: 350 mg/m2 infus IV selama 90 menit sekali setiap 3 minggu.
  - Monoterapi Mingguan: 125 mg/m2 infus IV selama 90 menit sekali seminggu selama 4 minggu berturut-turut diikuti 2 minggu istirahat (Siklus 6 minggu).`,
    pediatricDosage: `• Rhabdomyosarcoma / Neuroblastoma Refrakter Pediatrik:
  - 20 - 50 mg/m2/hari IV selama 5 hari berturut-turut dalam protokol kemoterapi onkologi anak khusus.`,
    geriatricDosage: `• Pasien usia >=70 tahun: Kurangi dosis awal monoterapi 3-mingguan menjadi 300 mg/m2; pantau toksisitas diare dan dehidrasi ketat.`,
    renalDoseAdjustment: `• Data klinis pada gangguan ginjal terbatas; gunakan dengan hati-hati.`,
    hepaticDoseAdjustment: `• Bilirubin 1.5 - 3.0 kali ULN: Kurangi dosis awal sebesar 25-30%.
• Bilirubin >3.0 kali ULN: Kontraindikasi (risiko toksisitas fatal meningkat drastis akibat gangguan eliminasi bilier SN-38).`,
    maxDoseLimit: `• Disesuaikan berdasarkan luas permukaan tubuh (LPT); lazimnya maksimal 350 mg/m2 per siklus 3 minggu.`,
    administrationGuideline: `• HANYA DIBERIKAN MELALUI INFUS INTRAVENA SELAMA 30-90 MENIT SETELAH DIENCERKAN DALAM 250-500 ML DEXTROSE 5% ATAU NACL 0.9%.
• PREMEDIKASI SINDROM KOLINERGIK AKUT (Dini): Berikan Atropin 0.25 - 1.0 mg SC/IV jika timbul diare dini, keringat dingin, kram perut dalam 24 jam.
• MANAJEMEN DIARE LAMBAT BERAT: Segera mulai LOPERAMID DOSIS TINGGI (4 mg pada buang air cair pertama, lalu 2 mg tiap 2 jam hingga bebas diare selama 12 jam penuh).`
  },

  'itraconazole': {
    adultDosage: `• Blastomikosis & Histoplasmosis:
  - 200 mg oral sekali sehari sesudah makan. Jika tidak membaik, naikkan bertahap dengan kelipatan 100 mg hingga maksimal 400 mg/hari (dosis >200 mg/hari dibagi 2 kali sehari).
• Aspergillosis Paru / Invasif:
  - 200 hingga 400 mg per hari oral sesudah makan selama minimal 2-5 bulan.
• Onikomikosis Kuku (Pulse Therapy):
  - 200 mg oral 2 kali sehari (400 mg/hari) selama 1 minggu, diikuti 3 minggu bebas obat (2 denyut siklus untuk kuku tangan, 3 denyut siklus untuk kuku kaki).
• Tinea Versikolor: 200 mg oral sekali sehari selama 7 hari.
• Kandidiasis Vulvovaginal: 200 mg oral 2 kali sehari selama 1 hari, atau 200 mg sekali sehari selama 3 hari.`,
    pediatricDosage: `• Infeksi Jamur Sistemik Berat Anak: 3 - 5 mg/kgBB/hari oral (maksimal 200 mg/hari) di bawah pengawasan dokter spesialis infeksi anak.`,
    geriatricDosage: `• Evaluasi fungsi hepar dan riwayat gagal jantung kongestif sebelum memulai terapi.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis untuk sediaan kapsul oral (eliminasi metabolit ginjal inaktif).`,
    hepaticDoseAdjustment: `• Metabolisme hepar ekstensif; pantau enzim transaminase hepar (ALT/AST). Tunda jika enzim hepar meningkat >3x ULN.`,
    maxDoseLimit: `• 400 mg per hari.`,
    administrationGuideline: `• KAPSUL ITRAKONAZOL WAJIB DIMINUM SEGERA SETELAH MAKAN LENGKAP DENGAN AIR PUTIH. Telan utuh.
• HINDARI OBAT PENIKAT ASAM LAMBUNG (Antasida, PPI, H2RA) karena menurunkan penyerapan obat hingga 80%. KONTRAINDIKASI BERSAMA SIMVASTATIN (risiko rabdomiolisis fatal).`
  },

  'levonorgestrel-iud': {
    adultDosage: `• Kontrasepsi Jangka Panjang & Pengobatan Menoragia Idiopatik:
  - 1 unit sistem intrauterin Mirena (52 mg) dipasang ke dalam kavum uteri oleh dokter spesialis obstetri ginekologi terlatih.
  - Melepaskan levonorgestrel awal sekitar 20 mcg/24 jam, menurun menjadi 10 mcg/24 jam setelah 5 tahun.
  - Efektif hingga 8 tahun untuk kontrasepsi dan hingga 5 tahun untuk indikasi menoragia.`,
    pediatricDosage: `• Diindikasikan untuk wanita usia reproduksi pasca menarche.`,
    geriatricDosage: `• Tidak diindikasikan pada wanita pascamenopause kecuali sebagai komponen proteksi endometrium pada terapi sulih hormon (HRT).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (bekerja lokal intrauterin).`,
    hepaticDoseAdjustment: `• Kontraindikasi pada tumor hepar atau penyakit hepar akut berat.`,
    maxDoseLimit: `• 1 sistem intrauterin per pemasangan.`,
    administrationGuideline: `• HANYA BOLEH DIPASANG OLEH DOKTER SPESIALIS KANDUNGAN (OBGYN) MENGGUNAKAN TEKNIK STERIL DAN INSERTER KHUSUS BAWAAN.
• Dipasang dalam waktu 7 hari pertama sejak hari pertama menstruasi. Periksa keberadaan benang spiral secara berkala.`
  },

  'ivermectin': {
    adultDosage: `• Skabies Berkrusta (Crusted / Norwegian Scabies) & Skabies Refrakter:
  - 200 mcg/kgBB (0.2 mg/kgBB) per oral dosis tunggal, diminum saat perut kosong dengan segelas air putih.
  - Dosis kedua WAJIB DIULANG 7 hingga 14 hari kemudian untuk membunuh tungau yang baru menetas dari telur.
• Strongyloidiasis Usus:
  - 200 mcg/kgBB oral dosis tunggal selama 1-2 hari berturut-turut.
• Onkoserkiasis (River Blindness):
  - 150 mcg/kgBB oral dosis tunggal setiap 6 hingga 12 bulan.`,
    pediatricDosage: `• Anak dengan Berat Badan >=15 kg:
  - Dosis sama dengan dewasa: 200 mcg/kgBB oral dosis tunggal (diulang 8-14 hari kemudian untuk skabies).
• Anak dengan Berat Badan <15 kg:
  - KONTRAINDIKASI / Keamanan belum ditetapkan (sawar darah otak belum matang sempurna).`,
    geriatricDosage: `• Dosis dewasa standar berdasarkan berat badan (200 mcg/kgBB).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (ekskresi ginjal <1%).`,
    hepaticDoseAdjustment: `• Metabolisme hepar ekstensif; gunakan dengan hati-hati pada gangguan hepar berat.`,
    maxDoseLimit: `• 200 mcg/kgBB per dosis tunggal.`,
    administrationGuideline: `• WAJIB DIMINUM SAAT PERUT KOSONG DENGAN SEGELAS AIR PUTIH (minimal 2 jam sebelum atau 2 jam sesudah makan).
• Pada skabies, seluruh anggota keluarga dan kontak erat serumah WAJIB DIOBATI SERENTAK dan cuci semua pakaian/sprei dengan air panas (>60°C).`
  }
,

  'caffeine-citrate': {
    adultDosage: `• Tidak diindikasikan untuk pasien dewasa (indikasi khusus apnea neonatus prematur).`,
    pediatricDosage: `• Apnea Prematuritas (Bayi Prematur Usia Gestasi 28 - <33 minggu):
  - Dosis Muatan (Loading Dose): 20 mg/kgBB (kafein sitrat) infus IV lambat selama 30 menit atau oral melalui NGT.
  - Dosis Pemeliharaan (Maintenance Dose): 5 mg/kgBB sekali sehari dimulai 24 jam pasca loading dose.
  - Titrasi: Dapat dinaikkan menjadi 10 mg/kgBB/hari jika episode apnea masih berlanjut.`,
    geriatricDosage: `• Tidak diindikasikan untuk lansia.`,
    renalDoseAdjustment: `• Eliminasi ginjal dominan pada neonatus; kurangi dosis pemeliharaan 50% pada disfungsi ginjal berat.`,
    hepaticDoseAdjustment: `• Pantau kadar serum kafein ketat.`,
    maxDoseLimit: `• Dosis muatan 20 mg/kgBB; dosis pemeliharaan 10 mg/kgBB per hari.`,
    administrationGuideline: `• HANYA DIBERIKAN DENGAN SYRINGE PUMP INFUS IV LAMBAT SELAMA 30 MENIT ATAU ORAL VIA PIPA NGT. 20 mg kafein sitrat setara dengan 10 mg kafein basa. Tahan dosis bila detak jantung >180 bpm.`
  },

  'calamine': {
    adultDosage: `• Pruritus Kulit, Biang Keringat, Gigitan Serangga Topikal:
  - Oleskan losio tipis-tipis pada area kulit yang gatal/teriritasi 2 hingga 4 kali sehari setelah kulit dibersihkan dan dikeringkan.`,
    pediatricDosage: `• Anak Usia >= 2 tahun: Oleskan tipis 2-4 kali sehari pada area kulit yang gatal.
• Anak Usia < 2 tahun: Konsultasikan dengan dokter spesialis anak.`,
    geriatricDosage: `• Dosis dewasa standar (tidak memerlukan penyesuaian dosis).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (aplikasi topikal lokal).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 4 kali aplikasi per hari.`,
    administrationGuideline: `• HANYA UNTUK PENGGUNAAN LUAR PADA KULIT. KOCOK DAHULU SEBELUM DIGUNAKAN. Jangan digunakan pada luka terbuka berdarah, luka bakar luas, mata, atau selaput lendir.`
  },

  'potassium-aspartate': {
    adultDosage: `• Suplementasi Hipokalemia / Aritmia Kardiak:
  - 1 hingga 3 tablet (300 - 900 mg setara 1.8 - 5.4 mEq K+) per oral 3 kali sehari sesudah makan bersama segelas air penuh.
  - Dosis harian total lazim: 900 hingga 2.700 mg per hari (5.4 - 16.2 mEq ion kalium).`,
    pediatricDosage: `• Keamanan dan dosis pada anak belum ditetapkan secara baku.`,
    geriatricDosage: `• Gunakan dosis batas bawah; risiko hiperkalemia meningkat akibat penurunan fungsi ginjal lansia.`,
    renalDoseAdjustment: `• GFR 10-50 mL/menit: Kurangi dosis sebesar 50%; pantau kalium serial.
• GFR <10 mL/menit / Anuria: KONTRAINDIKASI MUTLAK.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 2.700 mg (9 tablet @ 300 mg) per hari.`,
    administrationGuideline: `• WAJIB DIMINUM SESUDAH MAKAN BERSAMA SEGELAS AIR PUTIH PENUH. Telan utuh, jangan dihancurkan. Jangan berbaring minimal 30 menit setelah minum obat untuk mencegah iritasi esofagus.`
  },

  'calcitriol': {
    adultDosage: `• Osteodistrofi Ginjal pada Pasien Hemodialisis:
  - Dosis awal: 0.25 mcg per oral sekali sehari pada pagi hari (pasien dengan kalsium normal/sedikit rendah).
  - Titrasi: Naikkan 0.25 mcg/hari tiap 4-8 minggu hingga tercapai kadar kalsium serum 9 - 10 mg/dL dan supresi iPTH. Dosis lazim 0.5 - 1.0 mcg/hari.
• Hipoparatiroidisme:
  - Dosis awal: 0.25 mcg per oral sekali sehari pagi hari, dapat ditingkatkan hingga 0.5 - 2.0 mcg/hari.`,
    pediatricDosage: `• Hipoparatiroidisme Anak >=1 tahun: 0.25 - 0.75 mcg/hari.`,
    geriatricDosage: `• Dosis dewasa awal konservatif 0.25 mcg/hari; pantau kalsium darah ketat.`,
    renalDoseAdjustment: `• Diindikasikan khusus pada penyakit ginjal kronis; penyesuaian dosis dipandu oleh kadar kalsium, fosfat, dan hormon PTH serum.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (bentuk aktif langsung tanpa perlu hidroksilasi hepar).`,
    maxDoseLimit: `• 2.0 mcg per hari.`,
    administrationGuideline: `• Telan kapsul lunak utuh pada pagi hari dengan air putih. Pertahankan hidrasi adekuat. Hindari suplemen kalsium berlebih atau antasida berbasis magnesium.`
  },

  'calcium-folinate': {
    adultDosage: `• Penyelamat Metotreksat Dosis Tinggi ('Leucovorin Rescue'):
  - 15 mg (sekitar 10 mg/m2) IV/IM atau oral tiap 6 jam selama 72 jam (10 dosis), dimulai 24 jam pasca inisiasi infus metotreksat.
  - Dosis dinaikkan hingga 50-100 mg/m2 tiap 3 jam jika eliminasi metotreksat tertunda (MTX jam ke-48 >1 mcmol/L).
• Modulasi Kemoterapi Fluorouracil (5-FU) Kanker Kolorektal:
  - 200 mg/m2 IV lambat minimal 3 menit atau infus 2 jam, diikuti bolus/infus 5-FU sesuai rejimen mingguan atau bulanan.`,
    pediatricDosage: `• Leucovorin Rescue Pediatrik: 10 - 15 mg/m2 IV/IM/oral tiap 6 jam sesuai kadar MTX plasma serial.`,
    geriatricDosage: `• Dosis dewasa standar berdasarkan protokol onkologi.`,
    renalDoseAdjustment: `• Tingkatkan dosis rescue jika klirens kreatinin menurun (ekskresi MTX tertunda).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Disesuaikan berdasarkan kadar metotreksat plasma serial.`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INTRAVENA LAMBAT (kecepatan maksimal 160 mg/menit) ATAU INTRAMUSKULAR / ORAL. DILARANG KERAS INJEKSI INTRATEKAL (FATAL).`
  },

  'calcium-polystyrene-sulfonate': {
    adultDosage: `• Hiperkalemia pada Gagal Ginjal Akut & Kronis:
  - Oral: 15 hingga 30 gram per hari (1 sachet 5 g dilarutkan dalam 30-50 mL air diminum 3 kali sehari sesudah makan).
  - Enema Rektal: 30 gram serbuk dilarutkan dalam 100-200 mL air putih atau larutan glukosa 5%, dimasukkan melalui pipa rektal dan ditahan minimal 30-60 menit.`,
    pediatricDosage: `• Oral: 0.5 hingga 1.0 g/kgBB/hari terbagi dalam beberapa dosis.
• Enema: 0.5 hingga 1.0 g/kgBB per retensi enema.`,
    geriatricDosage: `• Lebih rentan konstipasi berat dan impaksi feses; pastikan asupan cairan adekuat.`,
    renalDoseAdjustment: `• Diindikasikan khusus pada gagal ginjal; tidak diserap sistemik.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 60 gram per hari.`,
    administrationGuideline: `• BUKAN TERAPI TUNGGAL EMERGENSI ARITMIA HIPERKALEMIA AKUT. Larutkan serbuk dalam air putih biasa. DILARANG MENCAMPUR DENGAN JUS BUAH KAYA KALIUM ATAU SORBITOL (risiko nekrosis usus fatal). Beri jarak minimal 2-3 jam dari obat oral lain.`
  },

  'carbimazole': {
    adultDosage: `• Hipertiroidisme (Penyakit Graves & Gondok Toksik):
  - Dosis Awal: 20 hingga 40 mg per oral per hari (terbagi dalam 2-3 dosis tiap 8 jam) hingga eutiroid (biasanya 4-8 minggu).
  - Dosis Pemeliharaan: 5 hingga 15 mg per oral sekali sehari pada pagi hari (durasi terapi 12-18 bulan).
• Persiapan Tiroidektomi: 20 - 40 mg/hari selama 3-4 minggu pra-operasi bersama larutan kalium iodida.`,
    pediatricDosage: `• Anak-anak: Dosis awal 0.75 mg/kgBB/hari terbagi tiap 8 jam; pemeliharaan disesuaikan respons klinis.`,
    geriatricDosage: `• Dosis awal 15-20 mg/hari; monitor gejala kardiovaskular.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Kurangi dosis pada gangguan hepar berat; kontraindikasi jika ada riwayat ikterus tionamida.`,
    maxDoseLimit: `• 60 mg per hari.`,
    administrationGuideline: `• Minum tablet secara teratur pada jam yang sama setiap hari. SEGERA LAPORKAN JIKA TIMBUL DEMAM MENDADAK, SAKIT TENGGOROKAN, ATAU SARIAWAN PARAH (waspadai agranulositosis).`
  },

  'carboglycerin': {
    adultDosage: `• Pelunak Serumen Telinga Mengeras (Serumen Obsturan):
  - Teteskan 2 hingga 3 tetes ke dalam liang telinga yang tersumbat 2 sampai 3 kali sehari selama 3-5 hari sebelum tindakan irigasi/ekstraksi serumen THT.`,
    pediatricDosage: `• Anak-anak: Teteskan 1-2 tetes ke liang telinga 2 kali sehari selama 3 hari sebelum pembersihan.`,
    geriatricDosage: `• Dosis dewasa standar (serumen lansia cenderung lebih kering dan mengeras).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (aplikasi topikal lokal).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 3 tetes per aplikasi, maksimal 3 kali sehari.`,
    administrationGuideline: `• HANYA UNTUK TETES TELINGA LUAR. DILARANG DITELAN ATAU KE MATA. KONTRAINDIKASI JIKA GENDANG TELINGA ROBEK / OMSK. Miringkan kepala 3-5 menit setelah penetesan agar obat meresap.`
  },

  'carboxymethylcellulose': {
    adultDosage: `• Sindrom Mata Kering & Iritasi Kornea:
  - Teteskan 1 hingga 2 tetes ke dalam kantung konjungtiva mata yang sakit 3 sampai 4 kali sehari, atau sesering yang dibutuhkan saat mata terasa kering/perih.`,
    pediatricDosage: `• Anak-anak: Teteskan 1 tetes 3-4 kali sehari jika diperlukan.`,
    geriatricDosage: `• Dosis dewasa standar (sangat bermanfaat pada mata kering senilis).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• Sesuai kebutuhan simtomatik.`,
    administrationGuideline: `• HANYA UNTUK TETES MATA. Tarik kelopak mata bawah dan teteskan tanpa menyentuhkan ujung botol ke mata. Sediaan minidose tanpa pengawet harus dibuang setelah 3 hari dibuka.`
  },

  'carboplatin': {
    adultDosage: `• Kanker Ovarium & Kanker Paru (NSCLC / SCLC):
  - Dosis Ditentukan Menggunakan FORMULA CALVERT:
    Total Dosis (mg) = Target AUC x (GFR + 25)
    - Target AUC monoterapi: 5 - 7 mg/mL.min.
    - Target AUC kombinasi (bersama Paclitaxel): AUC 5 - 6 mg/mL.min.
    - GFR dibatasi maksimal 125 mL/menit.
  - Diberikan melalui infus IV selama 15 hingga 60 menit sekali setiap 4 minggu (Siklus 28 hari).`,
    pediatricDosage: `• Neuroblastoma & Tumor Otak Pediatrik: Dihitung berdasarkan formula Calvert pediatrik atau luas permukaan tubuh (300-400 mg/m2).`,
    geriatricDosage: `• Evaluasi klirens kreatinin dengan cermat sebelum menghitung dosis Calvert.`,
    renalDoseAdjustment: `• Dosis WAJIB dikalkulasi menggunakan Formula Calvert berbasis GFR pasien; jika GFR <20 mL/menit, pertimbangkan tunda kemoterapi.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis spesifik.`,
    maxDoseLimit: `• Target AUC x (125 + 25) mg per siklus.`,
    administrationGuideline: `• HANYA DIBERIKAN INFUS INTRAVENA SELAMA 15-60 MENIT. DILARANG MENGGUNAKAN PERALATAN/JARUM YANG MENGANDUNG BAGIAN ALUMINIUM (bereaksi dengan platinum). Pantau hitung darah pada nadir hari ke-21.`
  },

  'cloxacillin': {
    adultDosage: `• Infeksi Stafilokokus Sensitif Metisilin (MSSA):
  - Oral: 500 mg per oral setiap 6 jam (4 kali sehari), diminum saat perut kosong minimal 1 jam sebelum atau 2 jam sesudah makan.
  - Injeksi IV Lambat / Infus: 1 hingga 2 gram IV tiap 6 jam (maksimal 8-12 g/hari pada endokarditis/osteomielitis).`,
    pediatricDosage: `• Anak BB < 20 kg: 50 hingga 100 mg/kgBB/hari terbagi tiap 6 jam (maksimal 4 g/hari).`,
    geriatricDosage: `• Dosis dewasa standar; monitor fungsi ginjal.`,
    renalDoseAdjustment: `• CrCl <10 mL/menit: Kurangi dosis menjadi 500 mg - 1 g tiap 8-12 jam.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; pantau enzim transaminase hepar.`,
    maxDoseLimit: `• Oral: 4 gram per hari; IV: 12 gram per hari.`,
    administrationGuideline: `• SEDIAAN ORAL WAJIB DIMINUM SAAT PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan dengan air putih penuh). Infus IV diberikan lambat selama 30-60 menit cegah tromboflebitis.`
  },

  'chloral-hydrate': {
    adultDosage: `• Sedatif / Insomnia Jangka Pendek Dewasa:
  - 500 mg hingga 1.000 mg per oral sebelum tidur malam (maksimal durasi terapi 1-2 minggu).`,
    pediatricDosage: `• Sedasi Pra-Prosedur Diagnostik / EEG Anak:
  - 25 hingga 50 mg/kgBB per oral atau rektal dosis tunggal, diberikan 30-60 menit sebelum prosedur (maksimal 1.000 mg per dosis tunggal pada anak kecil, atau 2.000 mg total).`,
    geriatricDosage: `• Mulai dosis konservatif 250 mg malam hari; risiko konfusi, ataksia, dan jatuh tinggi.`,
    renalDoseAdjustment: `• Gangguan Ginjal Berat: Kontraindikasi.`,
    hepaticDoseAdjustment: `• Gangguan Hepar Berat: Kontraindikasi.`,
    maxDoseLimit: `• 2.000 mg per dosis tunggal.`,
    administrationGuideline: `• Larutan berasa pahit menusuk: campurkan sirup dengan air es, susu, atau jus buah dingin untuk mencegah mual dan iritasi lambung. Pantau saturasi oksigen (SpO2) kontinu selama sedasi pediatrik.`
  },

  'chlorambucil': {
    adultDosage: `• Leukemia Limfositik Kronis (CLL) & Limfoma:
  - Terapi Intermiten Denyut: 0.4 hingga 0.8 mg/kgBB oral dosis tunggal setiap 2-4 minggu, ATAU
  - Terapi Kontinu Harian: 0.1 hingga 0.2 mg/kgBB/hari oral (lazimnya 4 - 10 mg/hari) selama 3-6 minggu hingga hitung leukosit turun, lalu pemeliharaan 2 - 4 mg/hari.`,
    pediatricDosage: `• Limfoma Pediatrik: 0.1 - 0.2 mg/kgBB/hari oral di bawah bimbingan onkologi anak.`,
    geriatricDosage: `• Dosis awal lebih konservatif; monitor mielosupresi lebih ketat.`,
    renalDoseAdjustment: `• Gunakan dengan hati-hati; ekskresi metabolit terutama melalui ginjal.`,
    hepaticDoseAdjustment: `• Kurangi dosis pada gangguan hepar berat.`,
    maxDoseLimit: `• Disesuaikan berdasarkan hitung darah tepi (ANC dan trombosit).`,
    administrationGuideline: `• TELAN TABLET UTUH SAAT PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan). PETUGAS WAJIB PAKAI SARUNG TANGAN saat memegang tablet. Simpan tablet di lemari es (suhu 2-8°C).`
  },

  'chloramphenicol': {
    adultDosage: `• Demam Tifoid & Infeksi Berat:
  - 50 mg/kgBB/hari per oral atau infus IV terbagi dalam 4 dosis (tiap 6 jam).
  - Pada meningitis bakterial berat: Dosis awal dapat dinaikkan hingga 100 mg/kgBB/hari, lalu segera diturunkan ke 50 mg/kgBB/hari begitu perbaikan klinis tercapai.
• Tetes / Salep Mata: 1-2 tetes tiap 2-4 jam; Salep mata dioleskan 1-3 kali sehari.`,
    pediatricDosage: `• Anak >1 bulan: 50 mg/kgBB/hari oral/IV terbagi tiap 6 jam.
• Neonatus / Bayi Prematur: KONTRAINDIKASI / Dosis maksimal 25 mg/kgBB/hari dengan pemantauan TDM ketat (cegah Gray Baby Syndrome).`,
    geriatricDosage: `• Dosis dewasa standar; monitor fungsi hepar dan ginjal.`,
    renalDoseAdjustment: `• Tidak memerlukan reduksi dosis pada gagal ginjal (metabolisme hepar dominan); metabolit inaktif diekskresi di urin.`,
    hepaticDoseAdjustment: `• Kurangi dosis 50% pada sirosis hepar / ikterus (pantau kadar serum puncak 10-20 mcg/mL).`,
    maxDoseLimit: `• 4 gram per hari pada dewasa (100 mg/kgBB/hari pada meningitis).`,
    administrationGuideline: `• HANYA DIGUNAKAN PADA INFEKSI BERAT DENGAN INDIKASI JELAS KETIKA ANTIBIOTIK LAIN TIDAK EFEKTIF. Minum saat perut kosong dengan air putih. KONTRAINDIKASI PADA TRIMESTER 3 KEHAMILAN & PERSALINAN.`
  },

  'chloroquine': {
    adultDosage: `• Terapi Malaria Sensitif (Plasmodium vivax / malariae):
  - Hari ke-1: 600 mg basa (4 tablet @ 150 mg basa), dilanjutkan 300 mg basa (2 tablet) setelah 6-8 jam.
  - Hari ke-2: 300 mg basa (2 tablet) dosis tunggal.
  - Hari ke-3: 300 mg basa (2 tablet) dosis tunggal (Total 1.500 mg basa / 2.500 mg fosfat dalam 3 hari).
• Amebiasis Ekstraintestinal / Abses Hepar: 600 mg basa/hari selama 2 hari, dilanjutkan 300 mg basa/hari selama 2-3 minggu.`,
    pediatricDosage: `• Malaria Anak: Hari 1: 10 mg basa/kgBB, lalu 5 mg basa/kgBB setelah 6 jam. Hari 2: 5 mg basa/kgBB. Hari 3: 5 mg basa/kgBB (total 25 mg basa/kgBB dlm 3 hari).`,
    geriatricDosage: `• Dosis dewasa standar; evaluasi lapang pandang mata dan EKG (QTc).`,
    renalDoseAdjustment: `• CrCl 10-50 mL/menit: Berikan 50-75% dari dosis standar.
• CrCl <10 mL/menit: Berikan 50% dari dosis standar.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; metabolisme dan akumulasi di hepar.`,
    maxDoseLimit: `• 1.500 mg basa dalam 3 hari terapi malaria.`,
    administrationGuideline: `• WAJIB DIMINUM BERSAMA MAKANAN ATAU SEGELAS SUSU untuk mengurangi rasa mual dan iritasi lambung. JAUHKAN DARI JANGKAUAN ANAK-ANAK (1-2 tablet fatal bagi balita). Beri jarak 4 jam dari antasida.`
  },

  'colestyramine': {
    adultDosage: `• Hiperkolesterolemia Primer & Pruritus Kolestasis:
  - Dosis awal: 4 gram (1 sachet) per oral sekali atau dua kali sehari sebelum makan.
  - Titrasi: Naikkan bertahap tiap 4 minggu hingga 8 - 16 gram per hari (terbagi dalam 2-4 dosis).
  - Dosis pemeliharaan: 12 - 24 gram per hari.`,
    pediatricDosage: `• Diare Asam Empedu / Pruritus Anak: 240 mg/kgBB/hari terbagi dalam 3 dosis bersama cairan.`,
    geriatricDosage: `• Dosis awal 4 g/hari; lebih rentan mengalami konstipasi parah.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis (tidak diserap sistemik).`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 24 gram (6 sachet) per hari.`,
    administrationGuideline: `• DILARANG MENELAN SERBUK DALAM KEADAAN KERING. Campurkan 1 sachet serbuk ke dalam minimal 100-150 mL air putih, susu, atau jus buah, aduk rata dan segera minum sebelum makan. Minum obat lain minimal 1 jam sebelum atau 4-6 jam sesudah kolestiramin.`
  },

  'quinine': {
    adultDosage: `• Malaria Falsiparum Tanpa Komplikasi (Oral):
  - 600 mg (sekitar 3 tablet @ 222 mg garam) per oral setiap 8 jam (3 kali sehari) selama 7 hari berturut-turut, dikombinasikan dengan Doksisiklin 100 mg 2x/hari (atau Klindamisin pada ibu hamil/anak).
• Malaria Berat (Infus IV):
  - Dosis muatan: 20 mg/kgBB kina dihidroklorida dilarutkan dalam 500 mL D5W diinfuskan selama 4 jam, diikuti dosis pemeliharaan 10 mg/kgBB infus selama 4 jam tiap 8 jam.`,
    pediatricDosage: `• Oral: 10 mg/kgBB per oral tiap 8 jam selama 7 hari bersama klindamisin.`,
    geriatricDosage: `• Dosis dewasa standar; monitor EKG (QTc) dan pendengaran serial.`,
    renalDoseAdjustment: `• CrCl <30 mL/menit / Gagal Ginjal: Kurangi dosis pemeliharaan sebesar 30-50% (dosis muatan awal tetap penuh).`,
    hepaticDoseAdjustment: `• Kurangi dosis pemeliharaan pada sirosis hepar lanjut (eliminasi CYP3A4 terganggu).`,
    maxDoseLimit: `• 1.800 mg garam per hari oral.`,
    administrationGuideline: `• WAJIB DIMINUM BERSAMA MAKANAN ATAU SETELAH MAKAN. DILARANG KERAS SUNTIKAN BOLUS IV CEPAT (fatal memicu henti jantung). Infus IV wajib diberikan lambat minimal 4 jam dengan larutan dekstrosa. Waspadai hipoglikemia mendadak.`
  },

  'artemether-lumefantrine': {
    adultDosage: `• Malaria Falsiparum Akut Tanpa Komplikasi (BB >= 35 kg):
  - REJIMEN STANDAR 6 DOSIS DALAM 3 HARI:
    * Hari ke-1: 4 tablet pada jam ke-0, dilanjutkan 4 tablet pada jam ke-8.
    * Hari ke-2: 4 tablet pada jam ke-24, dilanjutkan 4 tablet pada jam ke-36 (2x sehari berjarak 12 jam).
    * Hari ke-3: 4 tablet pada jam ke-48, dilanjutkan 4 tablet pada jam ke-60.
    (Total 24 tablet dalam 3 hari).`,
    pediatricDosage: `• Anak BB 5 - 14 kg: 1 tablet per waktu minum (total 6 tablet dalam 3 hari).
• Anak BB 15 - 24 kg: 2 tablet per waktu minum (total 12 tablet dalam 3 hari).
• Anak BB 25 - 34 kg: 3 tablet per waktu minum (total 18 tablet dalam 3 hari).`,
    geriatricDosage: `• Dosis dewasa standar berdasarkan berat badan.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Gangguan hepar ringan-sedang: Tidak memerlukan penyesuaian dosis; gangguan hepar berat: gunakan dengan hati-hati.`,
    maxDoseLimit: `• 4 tablet per waktu minum (8 tablet per hari).`,
    administrationGuideline: `• WAJIB DIMINUM BERSAMA MAKANAN ATAU MINUMAN BERLEMAK (seperti susu, keju, makanan santan) untuk meningkatkan penyerapan lumefantrine hingga 16 kali lipat. Jika muntah dalam 1 jam pasca minum obat, ulangi dosis penuh.`
  },

  'dihydroartemisinin-piperaquine': {
    adultDosage: `• Malaria Falsiparum & Vivaks Tanpa Komplikasi (Baku Emas Nasional):
  - BB >= 60 kg: 4 tablet per oral SEKALI SEHARI pada jam yang sama selama 3 HARI BERTURUT-TURUT.
  - BB 41 - 59 kg: 3 tablet sekali sehari selama 3 hari.
  *Selalu dikombinasikan dengan Primakuin pada hari pertama.`,
    pediatricDosage: `• BB 31 - 40 kg: 2 tablet sekali sehari selama 3 hari.
• BB 18 - 30 kg: 1.5 tablet sekali sehari selama 3 hari.
• BB 11 - 17 kg: 1 tablet sekali sehari selama 3 hari.
• BB 5 - 10 kg: 0.5 tablet sekali sehari selama 3 hari.`,
    geriatricDosage: `• Dosis standar berdasarkan berat badan; evaluasi EKG pada pasien dengan gangguan elektrolit.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati pada gangguan hepar berat.`,
    maxDoseLimit: `• 4 tablet per hari (dosis tunggal harian selama 3 hari).`,
    administrationGuideline: `• MINUM SATU KALI SEHARI DENGAN AIR PUTIH PADA JAM YANG SAMA PERSIS SELAMA 3 HARI BERTURUT-TURUT. Hindari makanan yang terlalu tinggi lemak jenuh tepat bersamaan untuk mencegah lonjakan Cmax piperakuin yang memperpanjang QTc. Tuntaskan 3 hari.`
  },

  'lopinavir-ritonavir': {
    adultDosage: `• Terapi ARV HIV-1 Lini Kedua Dewasa:
  - 400 mg Lopinavir / 100 mg Ritonavir (2 tablet Aluvia 200/50 mg) per oral DUA KALI SEHARI (tiap 12 jam), ATAU
  - 800 mg Lopinavir / 200 mg Ritonavir (4 tablet) per oral SEKALI SEHARI pada pasien belum pernah terapi PI tanpa mutasi resistensi.`,
    pediatricDosage: `• Anak Usia >= 14 hari: Dosis dihitung berdasarkan luas permukaan tubuh (LPT), lazimnya 230/57.5 mg/m2 dua kali sehari bersama makanan.`,
    geriatricDosage: `• Evaluasi fungsi hepar dan interaksi obat polifarmasi sebelum inisiasi.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Kontraindikasi pada gangguan hepar dekompensasi berat (Child-Pugh C).`,
    maxDoseLimit: `• 800 mg Lopinavir / 200 mg Ritonavir per hari.`,
    administrationGuideline: `• TELAN TABLET UTUH DENGAN AIR PUTIH DENGAN ATAU TANPA MAKANAN. DILARANG MENGUNYAH, MEMOTONG, ATAU MENGHANCURKAN TABLET. KONTRAINDIKASI MUTLAK BERSAMA SIMVASTATIN (rabdomiolisis fatal) DAN RIFAMPISIN.`
  },

  'cefoperazone-sulbactam': {
    adultDosage: `• Infeksi Nosokomial Bakteri Berat (HAP, Sepsis, Intraabdomen):
  - 2 hingga 4 gram per hari (rasio 1:1 cefoperazone:sulbactam) diberikan dalam 2 dosis terbagi setiap 12 jam melalui infus IV selama 30-60 menit.
  - Infeksi Pseudomonas / Acinetobacter Berat: Dosis dapat ditingkatkan hingga 8 gram per hari (4 g + 4 g) terbagi tiap 12 jam.`,
    pediatricDosage: `• Anak-anak: 40 hingga 80 mg/kgBB/hari (rasio 1:1) infus IV terbagi tiap 6 hingga 12 jam.`,
    geriatricDosage: `• Dosis dewasa standar; berikan profilaksis Vitamin K bila malnutrisi.`,
    renalDoseAdjustment: `• CrCl 15-30 mL/menit: Maksimal sulbactam 2 g/hari (terbagi tiap 12 jam).
• CrCl <15 mL/menit: Maksimal sulbactam 1 g/hari (terbagi tiap 12 jam).`,
    hepaticDoseAdjustment: `• Cefoperazone diekskresi via empedu; bila ada obstruksi empedu atau sirosis berat, batasi dosis maksimal cefoperazone 2 g/hari.`,
    maxDoseLimit: `• 8 gram (4 g Cefoperazone + 4 g Sulbactam) per hari.`,
    administrationGuideline: `• HANYA DIBERIKAN INFUS INTRAVENA INTERMITEN SELAMA MINIMAL 30-60 MENIT. DILARANG MENGONSUMSI MINUMAN BERALKOHOL selama terapi dan hingga 5 hari setelah selesai (memicu reaksi disulfiram fatal). Beri suplemen Vitamin K profilaksis.`
  },

  'ampicillin-sulbactam': {
    adultDosage: `• Infeksi Ginekologi, Intraabdomen, & Jaringan Lunak:
  - 1.5 gram hingga 3.0 gram (rasio 2:1 Ampicillin:Sulbactam) setiap 6 jam melalui infus IV selama 15-30 menit atau injeksi IM dalam.
  - Dosis harian total lazim: 6 hingga 12 gram per hari.`,
    pediatricDosage: `• Anak Usia >= 1 tahun: 150 hingga 300 mg/kgBB/hari IV terbagi tiap 6 jam.`,
    geriatricDosage: `• Disesuaikan berdasarkan fungsi ginjal.`,
    renalDoseAdjustment: `• CrCl >=50 mL/menit: 1.5 - 3 g tiap 6 jam.
• CrCl 15-49 mL/menit: 1.5 - 3 g tiap 12 jam.
• CrCl 5-14 mL/menit: 1.5 - 3 g tiap 24 jam.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis spesifik.`,
    maxDoseLimit: `• 12 gram per hari (setara 4 gram sulbactam/hari).`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INFUS INTRAVENA (15-30 menit) ATAU INTRAMUSKULAR DALAM. Larutan infus dalam NaCl 0.9% stabil hingga 8 jam, sedangkan dalam D5W hanya stabil 2 jam (habiskan segera).`
  },

  'sofosbuvir-velpatasvir': {
    adultDosage: `• Hepatitis C Kronik Pangenotipik (Genotipe 1 s.d. 6):
  - 1 tablet (400 mg Sofosbuvir / 100 mg Velpatasvir) per oral SEKALI SEHARI pada jam yang sama setiap hari dengan atau tanpa makanan selama 12 MINGGU PENUH.
  - Pada Sirosis Dekompensasi: 1 tablet sekali sehari + Ribavirin selama 12 minggu.`,
    pediatricDosage: `• Anak Usia >= 3 tahun: Dosis berdasarkan berat badan (tersedia granul oral untuk anak kecil).`,
    geriatricDosage: `• Tidak memerlukan penyesuaian dosis berdasarkan usia lanjut saja.`,
    renalDoseAdjustment: `• CrCl >=30 mL/menit atau <30 mL/menit / Hemodialisis: Tidak memerlukan penyesuaian dosis spesifik.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan hepar ringan, sedang, atau berat.`,
    maxDoseLimit: `• 1 tablet (400/100 mg) per hari.`,
    administrationGuideline: `• TELAN TABLET UTUH SETIAP HARI DENGAN AIR PUTIH. KONTRAINDIKASI MUTLAK BERSAMA AMIODARON (bradikardia fatal). HINDARI PENGGUNAAN BERSAMA OMEPRAZOLE / PPI (menurunkan absorpsi velpatasvir drastis). Skrining HBsAg sebelum terapi.`
  },

  'levodopa-carbidopa-entacapone': {
    adultDosage: `• Penyakit Parkinson Fluktuasi Motorik 'Wearing-Off':
  - 1 tablet per oral setiap kali jadwal minum levodopa harian (Stalevo 50, 100, atau 150 mg), disesuaikan dengan kebutuhan terapi penggantian dopamin pasien.
  - Maksimal 10 tablet per hari (dibatasi oleh dosis maksimal entacapone 2.000 mg/hari).`,
    pediatricDosage: `• Tidak diindikasikan untuk populasi pediatrik.`,
    geriatricDosage: `• Titrasi secara hati-hati; lansia lebih rentan mengalami halusinasi dan hipotensi ortostatik.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis pada gangguan ginjal.`,
    hepaticDoseAdjustment: `• Gunakan dengan hati-hati; kontraindikasi pada gangguan hepar berat.`,
    maxDoseLimit: `• Maksimal 10 tablet Stalevo per hari (2.000 mg entacapone/hari).`,
    administrationGuideline: `• Telan tablet utuh dengan segelas air. HINDARI MAKANAN SANGAT TINGGI PROTEIN BERSAMAAN (protein bersaing dengan levodopa pada absorpsi). BERI JARAK 2-3 JAM DARI SUPLEMEN BESI. Urin dapat berubah warna menjadi cokelat-oranye.`
  },

  'levonorgestrel-ethinylestradiol': {
    adultDosage: `• Pencegahan Kehamilan (Kontrasepsi Oral Kombinasi):
  - 1 tablet per oral diminum setiap hari pada jam yang sama persis selama 28 hari berturut-turut tanpa jeda (21 tablet aktif diikuti 7 tablet plasebo/besi).
  - Mulai tablet nomor 1 pada hari ke-1 menstruasi. Blister baru langsung dimulai pada hari ke-29.`,
    pediatricDosage: `• Diindikasikan untuk wanita usia reproduksi pasca menarche.`,
    geriatricDosage: `• Tidak diindikasikan pada wanita pascamenopause.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Kontraindikasi pada penyakit hepar aktif atau adenoma hepar.`,
    maxDoseLimit: `• 1 tablet per hari.`,
    administrationGuideline: `• MINUM SATU TABLET SETIAP HARI PADA JAM YANG SAMA PERSIS (misalnya malam sebelum tidur). Jika lupa 1 tablet, segera minum saat ingat. KONTRAINDIKASI MUTLAK PADA WANITA PEROKOK USIA >= 35 TAHUN.`
  },

  'medroxyprogesterone-estradiol': {
    adultDosage: `• Kontrasepsi Suntik Kombinasi Bulanan:
  - 1 mL disuntikkan secara INTRAMUSKULAR DALAM pada otot gluteus atau deltoid SEKALI SETIAP 28 HARI (setiap 4 minggu ± 3 hari).
  - Suntikan pertama diberikan dalam 5 hari pertama siklus menstruasi.`,
    pediatricDosage: `• Diindikasikan untuk wanita usia reproduksi pasca menarche.`,
    geriatricDosage: `• Tidak diindikasikan pada wanita pascamenopause.`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Kontraindikasi pada disfungsi hepar berat atau tumor hepar.`,
    maxDoseLimit: `• 1 mL per 28 hari.`,
    administrationGuideline: `• HANYA DISUNTIKKAN SECARA INTRAMUSKULAR DALAM PADA OTOT BOKONG ATAU LENGAN ATAS. DILARANG INTRAVENA. Kocok vial dengan kuat sebelum disuntikkan agar homogen. Jangan memijat lokasi suntikan.`
  },

  'paraffin-glycerin-phenolphthalein': {
    adultDosage: `• Konstipasi Akut & Pengosongan Usus Pra-Tindakan:
  - 1 hingga 2 sendok makan (15 - 30 mL) per oral sekali sehari, diminum pada malam hari sebelum tidur.
  - Efek evakuasi feses tercapai dalam waktu 6 hingga 8 jam setelah diminum.`,
    pediatricDosage: `• Anak Usia 6 - 12 Tahun: 0.5 hingga 1 sendok makan (7.5 - 15 mL) sekali sehari sebelum tidur malam.
• Anak < 6 Tahun: Tidak dianjurkan kecuali atas anjuran dokter.`,
    geriatricDosage: `• Hindari penggunaan pada lansia dengan gangguan menelan (risiko aspirasi pneumonia lipoid).`,
    renalDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    hepaticDoseAdjustment: `• Tidak memerlukan penyesuaian dosis.`,
    maxDoseLimit: `• 30 mL per hari.`,
    administrationGuideline: `• KOCOK BOTOL DENGAN BAIK SEBELUM DIMINUM. Diminum malam hari sebelum tidur. JANGAN DIGUNAKAN LEBIH DARI 7 HARI BERTURUT-TURUT (mencegah ketergantungan usus). Jangan diminum sambil berbaring telentang.`
  }

};

