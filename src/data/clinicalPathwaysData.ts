export interface PathwayStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  timeline: string;
  category: 'inisiasi' | 'evaluasi' | 'kombinasi' | 'eskalasi' | 'rujukan';
  description: string;
  drugs: {
    name: string;
    dosage: string;
    role: string;
    fornasTier?: string;
  }[];
  targetCriteria: string[];
  triggersForNextStep: string;
  clinicalNotes: string;
}

export interface ClinicalPathway {
  id: string;
  guidelineId: string;
  diseaseName: string;
  category: string;
  organization: string;
  shortSummary: string;
  steps: PathwayStep[];
}

export const CLINICAL_PATHWAYS_DATABASE: ClinicalPathway[] = [
  // 1. DIABETES MELITUS TIPE 2
  {
    id: 'pathway-t2dm',
    guidelineId: 'guideline-t2dm',
    diseaseName: 'Diabetes Melitus Tipe 2 (DMT2) Dewasa',
    category: 'Endokrin & Metabolik',
    organization: 'PERKENI 2024 / ADA',
    shortSummary: 'Algoritma pengelolaan bertahap DMT2 dari monoterapi, kombinasi ganda, kombinasi tiga obat hingga inisiasi insulin basal.',
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Inisiasi Monoterapi & Modifikasi Gaya Hidup',
        subtitle: 'Tahap Awal Terapi Pasca Diagnosis (HbA1c < 7.5% atau 7.5 - 9.0%)',
        timeline: 'Bulan ke 0 - 3',
        category: 'inisiasi',
        description: 'Mulai terapi lini pertama bersamaan dengan edukasi Terapi Nutrisi Medis (TNM) seimbang dan aktivitas fisik aerobik minimal 150 menit per minggu.',
        drugs: [
          {
            name: 'Metformin',
            dosage: '500 mg PO 1-2x/hari bersama makan, titrasi bertahap tiap 1-2 minggu hingga 1000 mg 2x/hari',
            role: 'Lini Pertama Pilihan',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Target Kadar HbA1c < 7.0% (atau < 6.5% pada usia muda tanpa risiko hipoglikemia)',
          'Glukosa Darah Puasa (GDP) 80 - 130 mg/dL',
          'Glukosa Darah 2 Jam Post-Prandial (GD2PP) < 180 mg/dL'
        ],
        triggersForNextStep: 'Jika setelah 3 BULAN evaluasi kadar HbA1c TETAP >= 7.0%, WAJIB ESKALASI KE LANGKAH 2 (Kombinasi Ganda).',
        clinicalNotes: 'Metformin aman untuk ginjal selama eGFR >= 30 mL/min. Jika eGFR 30-45 mL/min, batasi dosis maksimal 1000 mg/hari.'
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Terapi Kombinasi Ganda (Dual Oral Therapy)',
        subtitle: 'Penambahan Obat Kedua Berbasis Karakteristik Komorbid Pasien',
        timeline: 'Bulan ke 3 - 6',
        category: 'kombinasi',
        description: 'Pilih obat kedua berdasarkan keberadaan komplikasi kardiovaskular, penyakit ginjal kronik, atau gagal jantung.',
        drugs: [
          {
            name: 'Metformin + Empagliflozin / Dapagliflozin',
            dosage: 'Metformin 1000 mg 2x/hari + Empagliflozin 10-25 mg 1x/hari pagi (SGLT2-i)',
            role: 'Prioritas bila ada ASCVD / Gagal Jantung / CKD',
            fornasTier: 'Faskes 2/3'
          },
          {
            name: 'Metformin + Glimepiride',
            dosage: 'Metformin 1000 mg 2x/hari + Glimepiride 1-4 mg 1x/hari sebelum makan pagi',
            role: 'Alternatif Terjangkau (FORNAS Faskes 1)',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Metformin + Linagliptin / Vildagliptin',
            dosage: 'Metformin 1000 mg 2x/hari + Linagliptin 5 mg 1x/hari (DPP-4i)',
            role: 'Pilihan Aman Tanpa Risiko Hipoglikemia & Ramah Ginjal',
            fornasTier: 'Faskes 2/3'
          }
        ],
        targetCriteria: [
          'Kadar HbA1c < 7.0%',
          'Penurunan berat badan dan perbaikan tekanan darah (pada pemakaian SGLT2-i)',
          'Bebas episode hipoglikemia berulang (< 70 mg/dL)'
        ],
        triggersForNextStep: 'Jika setelah 3 BULAN terapi kombinasi ganda HbA1c MASIH >= 7.0%, lanjutkan ke Langkah 3 (Kombinasi Tiga Obat atau Inisiasi Insulin Basal).',
        clinicalNotes: 'SGLT2-Inhibitor (Empagliflozin/Dapagliflozin) memberikan manfaat kardio-renal independen yang menurunkan risiko kematian kardiovaskular dan memperlambat progresi gagal ginjal.'
      },
      {
        stepNumber: 3,
        title: 'Langkah 3: Terapi Kombinasi Tiga Obat atau Inisiasi Insulin Basal',
        subtitle: 'Intensifikasi Kontrol Glikemik Pasien Refrakter',
        timeline: 'Bulan ke 6 - 9',
        category: 'eskalasi',
        description: 'Jika kombinasi 2 obat gagal mencapai target atau HbA1c awal >= 9.0% disertai gejala dekompensasi metabolik, tambahkan obat ketiga atau mulai Insulin Basal malam.',
        drugs: [
          {
            name: 'Metformin + SGLT2-i + DPP-4i / Sulfonilurea',
            dosage: 'Kombinasi tiga obat oral dosis optimal',
            role: 'Triple Oral Therapy',
            fornasTier: 'Faskes 2/3'
          },
          {
            name: 'Insulin Basal (Glargine / Degludec)',
            dosage: 'Inisiasi 10 Unit (atau 0.1 - 0.2 Unit/kgBB) subkutan SEKALI SEHARI pada jam yang sama malam hari',
            role: 'Insulin Basal Lini Pertama',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Kadar HbA1c < 7.0% - 7.5%',
          'GDP pagi hari stabil 80 - 130 mg/dL setelah titrasi insulin basal (titrasi naik 2 Unit tiap 3 hari hingga GDP puasa normal)'
        ],
        triggersForNextStep: 'Jika dosis insulin basal sudah mencapai > 0.5 U/kgBB/hari atau HbA1c belum tercapai meski GDP normal (terjadi lonjakan post-prandial), masuk ke Langkah 4 (Intensifikasi Insulin Basal-Bolus).',
        clinicalNotes: 'Saat inisiasi insulin basal malam, obat pemacu sekresi insulin sulfonilurea (Glibenklamid/Glimepirid) sebaiknya diturunkan dosisnya atau dihentikan untuk mencegah hipoglikemia nokturnal.'
      },
      {
        stepNumber: 4,
        title: 'Langkah 4: Intensifikasi Regimen Insulin Kompleks & Rujukan Subspesialis',
        subtitle: 'Regimen Basal-Bolus atau Insulin Premix Harian',
        timeline: 'Jangka Panjang / Kasus Lanjut',
        category: 'rujukan',
        description: 'Diindikasikan pada kegagalan sel beta pankreas lanjut untuk mengontrol glukosa darah post-prandial.',
        drugs: [
          {
            name: 'Insulin Basal-Bolus (MDI)',
            dosage: 'Insulin Basal Glargine (40-50% TDD malam) + Insulin Kerja Cepat Aspart/Lispro (50-60% TDD terbagi 3 kali sebelum makan)',
            role: 'Regimen Baku Emas Intensif',
            fornasTier: 'Faskes 2/3'
          },
          {
            name: 'Insulin Premix (Biphasic Aspart 30/70)',
            dosage: 'Diberikan 2 kali sehari subkutan tepat sebelum makan pagi dan makan malam',
            role: 'Alternatif Praktis',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'HbA1c individual (<7.0% s/d <8.0% pada geriatri komorbid kompleks)',
          'Pencegahan komplikasi makrovaskular (PJK, Stroke) dan mikrovaskular (Nefropati, Retinopati, Neuropati)'
        ],
        triggersForNextStep: 'Evaluasi berkala fungsi ginjal (eGFR/UACR), skrining retina mata tahunan, dan evaluasi kaki diabetik berkala.',
        clinicalNotes: 'Edukasi tanda dan penanganan mandiri hipoglikemia (aturan Rule of 15 dengan 15 gram glukosa murni) wajib dipahami pasien dan keluarga.'
      }
    ]
  },

  // 2. HIPERTENSI PRIMER DEWASA
  {
    id: 'pathway-hypertension',
    guidelineId: 'guideline-hypertension',
    diseaseName: 'Hipertensi Primer / Esensial Dewasa',
    category: 'Kardiovaskular',
    organization: 'PERKI 2023 / ISH / ESC (KMK 303/2026)',
    shortSummary: 'Algoritma tatalaksana bertahap hipertensi: Inisiasi kombinasi ganda dosis rendah, titrasi dosis penuh, kombinasi tiga obat, hingga tatalaksana hipertensi resisten.',
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Inisiasi Terapi Kombinasi Ganda Dosis Rendah',
        subtitle: 'Rekomendasi Utama bagi Sebagian Besar Pasien Hipertensi (Derajat 1 & 2)',
        timeline: 'Bulan ke 0 - 1',
        category: 'inisiasi',
        description: 'Mulai terapi kombinasi 2 obat dosis rendah (Single Pill Combination jika tersedia) untuk efikasi kontrol tensi cepat dan perlindungan organ target.',
        drugs: [
          {
            name: 'Candesartan / Valsartan + Amlodipine',
            dosage: 'Candesartan 8 mg PO 1x/hari + Amlodipine 5 mg PO 1x/hari pagi/malam',
            role: 'Kombinasi ARB + CCB (Lini Pertama Pilihan Utama)',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Amlodipine (Monoterapi)',
            dosage: '5 - 10 mg PO 1x/hari (Khusus lansia frailty > 80 tahun atau hipertensi derajat 1 risiko sangat rendah)',
            role: 'Monoterapi Selektif',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Target Tekanan Darah < 140/90 mmHg dalam 1-3 bulan pertama',
          'Target Optimal < 130/80 mmHg pada usia 18-65 tahun jika dapat ditoleransi dengan baik'
        ],
        triggersForNextStep: 'Jika setelah 1 BULAN evaluasi tensi MASIH >= 140/90 mmHg, NAIKKAN KE LANGKAH 2 (Kombinasi Dosis Penuh).',
        clinicalNotes: 'Kombinasi ARB + CCB memiliki sinergi hemodinamik sangat baik; vasodilatasi arteriol dari ARB sekaligus mengurangi efek samping edema pergelangan kaki yang dipicu oleh Amlodipine.'
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Eskalasi ke Kombinasi Ganda Dosis Penuh',
        subtitle: 'Optimalisasi Dosis Regimen ARB + CCB',
        timeline: 'Bulan ke 1 - 2',
        category: 'kombinasi',
        description: 'Titrasi dosis komponen kombinasi ganda hingga dosis terapeutik maksimal yang aman.',
        drugs: [
          {
            name: 'Candesartan + Amlodipine (Dosis Maksimal)',
            dosage: 'Candesartan 16 mg PO 1x/hari + Amlodipine 10 mg PO 1x/hari',
            role: 'Dosis Penuh Kombinasi Ganda',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Tekanan Darah Terkontrol < 130/80 mmHg',
          'Tidak terdapat keluhan pusing ortostatik atau edema perifer berat'
        ],
        triggersForNextStep: 'Jika setelah 1 BULAN pada dosis penuh tensi TETAP >= 140/90 mmHg, LANJUTKAN KE LANGKAH 3 (Kombinasi Tiga Obat / Triple Therapy).',
        clinicalNotes: 'Pastikan kepatuhan minum obat harian pasien dan evaluasi asupan garam natrium diet harian (target < 2 gram natrium atau < 1 sendok teh garam dapur per hari).'
      },
      {
        stepNumber: 3,
        title: 'Langkah 3: Terapi Kombinasi Tiga Obat (Triple Therapy)',
        subtitle: 'Kombinasi ARB/ACEi + CCB + Diuretik Thiazide',
        timeline: 'Bulan ke 2 - 3',
        category: 'eskalasi',
        description: 'Tambahkan diuretik tiazid untuk mengatasi retensi natrium dan volume cairan intravaskular.',
        drugs: [
          {
            name: 'Candesartan + Amlodipine + HCT (Hydrochlorothiazide)',
            dosage: 'Candesartan 16 mg + Amlodipine 10 mg + HCT 12.5 - 25 mg PO 1x/hari pagi hari',
            role: 'Triple Combination Baku Emas',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Tekanan Darah Target < 130/80 mmHg',
          'Elektrolit serum (Kalium dan Natrium) serta asam urat stabil'
        ],
        triggersForNextStep: 'Jika tensi TETAP >= 140/90 mmHg meski telah menggunakan 3 obat dosis optimal termasuk diuretik, pasien didiagnosis HIPERTENSI RESISTEN → Masuk ke Langkah 4.',
        clinicalNotes: 'HCT diminum pagi hari untuk mencegah nokturia (sering terbangun buang air kecil di malam hari). Monitor kadar kalium serum berkala.'
      },
      {
        stepNumber: 4,
        title: 'Langkah 4: Tatalaksana Hipertensi Resisten & Rujukan Spesialis',
        subtitle: 'Penambahan Antagonis Reseptor Mineralokortikoid (MRA) atau Beta Blocker',
        timeline: 'Bulan ke 3 seterusnya',
        category: 'rujukan',
        description: 'Spironolactone adalah obat pilihan lini keempat paling efektif untuk hipertensi resisten.',
        drugs: [
          {
            name: 'Spironolactone',
            dosage: '25 - 50 mg PO sekali sehari pagi/siang',
            role: 'Lini Keempat Hipertensi Resisten',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Bisoprolol',
            dosage: '5 - 10 mg PO sekali sehari (terutama jika ada riwayat PJK, gagal jantung, atau resting HR > 80 bpm)',
            role: 'Alternatif / Indikasi Khusus',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Tekanan Darah Target < 130/80 mmHg',
          'Skrining penyebab hipertensi sekunder (hiperaldosteronisme primer, stenosis arteri renalis, OSA)'
        ],
        triggersForNextStep: 'Rujuk ke Dokter Spesialis Jantung (Sp.JP) atau Spesialis Penyakit Dalam (Sp.PD) untuk evaluasi lanjutan dan investigasi hipertensi sekunder.',
        clinicalNotes: 'Sebelum memulai Spironolactone, pastikan kadar Kalium serum < 4.5 mEq/L dan eGFR >= 30 mL/min untuk menghindari risiko hiperkalemia fatal.'
      }
    ]
  },

  // 3. ASMA BRONKIAL DEWASA
  {
    id: 'pathway-asthma',
    guidelineId: 'guideline-asthma',
    diseaseName: 'Asma Bronkial Dewasa & Remaja (Pedoman GINA 2024)',
    category: 'Respirasi & Alergi',
    organization: 'GINA 2024 / PDPI',
    shortSummary: 'Alur terapi GINA Track 1 berbasis anti-inflamasi pelega (MART: Budesonide-Formoterol) dari Step 1 hingga Step 5.',
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1 - 2: Gejala Asma Ringan / Kurang dari 4-5 Hari per Minggu',
        subtitle: 'Kombinasi Dosis Rendah ICS-Formoterol HANYA Saat Timbul Gejala',
        timeline: 'Sesuai Kebutuhan (As-Needed)',
        category: 'inisiasi',
        description: 'GINA Track 1 merekomendasikan Budesonide-Formoterol dosis rendah sebagai pelega anti-inflamasi tunggal tanpa perlu inhaler SABA terpisah.',
        drugs: [
          {
            name: 'Budesonide-Formoterol Turbuhaler (160/4.5 mcg)',
            dosage: '1 hisapan saat timbul sesak / batuk (dapat diulang setelah beberapa menit bila perlu, maksimal 8-12 hisapan/hari)',
            role: 'Anti-Inflammatory Reliever (Pilihan Utama)',
            fornasTier: 'Faskes 2/3'
          }
        ],
        targetCriteria: [
          'Skor Asthma Control Test (ACT) = 25 (Terkontrol Penuh)',
          'Tidak pernah mengalami eksaserbasi akut yang membutuhkan kortikosteroid oral',
          'Bebas dari aktivitas yang terbatasi oleh asma'
        ],
        triggersForNextStep: 'Jika gejala timbul sebagian besar hari (>= 4-5 hari/minggu) atau terbangun malam akibat asma >= 1x/minggu (Skor ACT 20-24), NAIKKAN KE STEP 3.',
        clinicalNotes: 'Penggunaan SABA monoterapi (Salbutamol saja tanpa steroid inhalasi) SUDAH TIDAK DIREKOMENDASIKAN oleh GINA karena meningkatkan risiko serangan asma fatal dan remodeling saluran napas permanen.'
      },
      {
        stepNumber: 2,
        title: 'Step 3: Gejala Sebagian Besar Hari atau Terbangun Malam >= 1x/Minggu',
        subtitle: 'Terapi Pemeliharaan Rumatan Harian + Pelega (MART Protocol)',
        timeline: 'Penggunaan Harian Berkelanjutan',
        category: 'kombinasi',
        description: 'Gunakan ICS-Formoterol dosis rendah sebagai obat rumatan harian pagi dan malam, DITAMBAH hisapan ekstra jika timbul sesak.',
        drugs: [
          {
            name: 'Budesonide-Formoterol Turbuhaler (160/4.5 mcg)',
            dosage: 'Rumatan: 1 hisap 2 kali sehari (pagi dan malam) + 1 hisap ekstra saat timbul gejala sesak',
            role: 'MART (Maintenance and Reliever Therapy)',
            fornasTier: 'Faskes 2/3'
          }
        ],
        targetCriteria: [
          'Skor ACT >= 20 - 25',
          'Penggunaan inhaler pelega ekstra < 2 kali per minggu',
          'Fungsi paru FEV1 / APE membaik mendekati nilai prediksi normal'
        ],
        triggersForNextStep: 'Jika setelah 1-3 bulan kepatuhan dan teknik inhalasi baik namun asma TETAP TIDAK TERKONTROL (Skor ACT < 20), NAIKKAN KE STEP 4.',
        clinicalNotes: 'Wajib mengedukasi pasien untuk selalu berkumur dengan air putih dan membuangnya setelah menghisap steroid inhaler untuk mencegah infeksi jamur kandidiasis oral dan suara serak.'
      },
      {
        stepNumber: 3,
        title: 'Step 4: Asma Belum Terkontrol pada Dosis Rendah',
        subtitle: 'Eskalasi ke Dosis Medium ICS-Formoterol Rumatan Harian',
        timeline: 'Evaluasi tiap 1 - 3 Bulan',
        category: 'eskalasi',
        description: 'Tingkatkan dosis harian inhaler kombinasi untuk mengatasi inflamasi eosinofilik saluran napas yang lebih berat.',
        drugs: [
          {
            name: 'Budesonide-Formoterol (160/4.5 mcg)',
            dosage: 'Rumatan: 2 hisap 2 kali sehari (total 4 hisap rumatan/hari) + hisap ekstra jika timbul sesak',
            role: 'Medium-Dose MART',
            fornasTier: 'Faskes 2/3'
          }
        ],
        targetCriteria: [
          'Skor ACT >= 20',
          'Remisi eksaserbasi dan stabilitas fungsi paru APE'
        ],
        triggersForNextStep: 'Jika tetap sering mengalami kekambuhan berat atau faal paru rendah, masuk ke Step 5 (Asma Berat Refrakter).',
        clinicalNotes: 'Evaluasi faktor komorbid pemicu: Rhinitis alergi, GERD, obesitas, merokok pasif, atau konsumsi obat penghambat beta / NSAID.'
      },
      {
        stepNumber: 4,
        title: 'Step 5: Asma Berat Refrakter & Evaluasi Terapi Biologis',
        subtitle: 'Penambahan LAMA (Tiotropium) & Konsultasi Spesialis Paru',
        timeline: 'Rujukan Subspesialis Paru (Sp.P)',
        category: 'rujukan',
        description: 'Tatalaksana asma berat dengan terapi kombinasi tiga inhaler (Triple Inhaled Therapy: ICS + LABA + LAMA) atau terapi antibodi monoklonal biologis.',
        drugs: [
          {
            name: 'Tiotropium Respimat (LAMA)',
            dosage: '5 mcg (2 semprotan 2.5 mcg) inhalasi SEKALI SEHARI',
            role: 'Terapi Tambahan Antikolinergik Kerja Panjang',
            fornasTier: 'Faskes 2/3'
          },
          {
            name: 'Terapi Biologis Anti-IgE / Anti-IL5 (Omalizumab / Mepolizumab)',
            dosage: 'Injeksi subkutan berkala sesuai fenotipe asma berat eosinofilik / alergik',
            role: 'Terapi Target Subspesialistik',
            fornasTier: 'Faskes 3'
          }
        ],
        targetCriteria: [
          'Penurunan kebutuhan kortikosteroid sistemik oral',
          'Pencegahan rawat inap IGD dan penurunan morbiditas asma berat'
        ],
        triggersForNextStep: 'Pemantauan berkala setiap 3-6 bulan di poliklinik asma terpadu rumah sakit rujukan.',
        clinicalNotes: 'Hindari ketergantungan kortikosteroid oral harian jangka panjang karena risiko osteoporosis, katarak, diabetes, dan penekanan aksis adrenal.'
      }
    ]
  },

  // 4. GAGAL JANTUNG FRAKSI EJEKSI MENURUN (HFrEF)
  {
    id: 'pathway-hfref',
    guidelineId: 'guideline-hfref',
    diseaseName: 'Gagal Jantung Fraksi Ejeksi Menurun (HFrEF / LVEF <= 40%)',
    category: 'Kardiovaskular',
    organization: 'PERKI 2023 / ESC Heart Failure Guidelines',
    shortSummary: 'Algoritma inisiasi cepat 4 Pilar Terapi Baku Emas (Fantastic Four) dan protokol titrasi dosis optimal.',
    steps: [
      {
        stepNumber: 1,
        title: 'Fase 1: Inisiasi Cepat 4 Pilar Baku Emas (*The Fantastic Four*)',
        subtitle: 'Memulai Seluruh 4 Obat Sejak Awal Diagnosis secara Bersamaan atau Sekuens Cepat',
        timeline: 'Minggu ke 0 - 2 Pasca Diagnosis / Stabilisasi',
        category: 'inisiasi',
        description: 'Empat kelas obat ini terbukti secara klinis menurunkan angka kematian kardiovaskular dan re-hospitalisasi hingga > 60%.',
        drugs: [
          {
            name: 'Sacubitril/Valsartan (ARNI) atau Ramipril/Captopril',
            dosage: 'Sacubitril/Valsartan 24/26 mg atau 49/51 mg PO 2x/hari (atau Ramipril 2.5 mg 1x/hari)',
            role: 'Pilar 1: Modulator Neurohormonal RAS',
            fornasTier: 'Faskes 2/3'
          },
          {
            name: 'Bisoprolol / Carvedilol',
            dosage: 'Bisoprolol mulai 1.25 - 2.5 mg PO 1x/hari pagi (diberikan saat kondisi euvolemik/kering)',
            role: 'Pilar 2: Beta Blocker Kardioselektif',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Spironolactone',
            dosage: '25 mg PO sekali sehari pagi/siang',
            role: 'Pilar 3: Antagonis Reseptor Mineralokortikoid (MRA)',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Dapagliflozin / Empagliflozin',
            dosage: '10 mg PO SEKALI SEHARI pagi hari dosis tetap (tidak perlu titrasi dosis)',
            role: 'Pilar 4: SGLT2 Inhibitor',
            fornasTier: 'Faskes 2/3'
          }
        ],
        targetCriteria: [
          'Pasien mencapai kondisi klinis euvolemik (tidak ada ronki paru, edema tungkai, atau JVP meningkat)',
          'Toleransi hemodinamik baik (Tensi Sistolik >= 95-100 mmHg, Laju Nadi 60-70 bpm)'
        ],
        triggersForNextStep: 'Lanjutkan ke Fase 2 (Titrasi Naik Dosis Bertahap) setiap 2 - 4 minggu.',
        clinicalNotes: 'Furosemide (diuretik loop) diberikan HANYA jika terdapat tanda kongesti/edema cairan, dan diturunkan dosisnya segera setelah pasien kering (euvolemik).'
      },
      {
        stepNumber: 2,
        title: 'Fase 2: Titrasi Naik Dosis Bertahap Menuju Dosis Target Maksimal',
        subtitle: 'Optimalisasi Dosis Setiap 2 - 4 Minggu Sesuai Panduan Klinis',
        timeline: 'Bulan ke 1 - 3',
        category: 'eskalasi',
        description: 'Tingkatkan dosis ARNI dan Beta Blocker secara bertahap hingga mencapai dosis target uji klinis yang memberikan proteksi mortalitas tertinggi.',
        drugs: [
          {
            name: 'Sacubitril/Valsartan (Target Dosis Penuh)',
            dosage: 'Titrasi naik hingga target 97/103 mg PO 2 KALI SEHARI',
            role: 'Dosis Target ARNI',
            fornasTier: 'Faskes 2/3'
          },
          {
            name: 'Bisoprolol (Target Dosis Penuh)',
            dosage: 'Titrasi naik bertahap (1.25 → 2.5 → 5 → 7.5 → 10 mg 1x/hari, target resting HR 55-60 bpm)',
            role: 'Dosis Target Beta Blocker',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Spironolactone (Target Dosis Penuh)',
            dosage: '25 - 50 mg PO sekali sehari',
            role: 'Dosis Target MRA',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Perbaikan Kelas Fungsional NYHA (dari NYHA III/IV membaik ke NYHA I/II)',
          'Penurunan kadar biomarker NT-proBNP > 30% dari basal',
          'Peningkatan Fraksi Ejeksi Ventrikel Kiri (LVEF) pada evaluasi ekokardiografi 3-6 bulan'
        ],
        triggersForNextStep: 'Jika LVEF tetap <= 35% dan timbul aritmia ventrikel atau QRS lebar > 130 ms, evaluasi untuk pemasangan terapi alat (ICD / CRT).',
        clinicalNotes: 'Pantau ketat Kreatinin Serum (eGFR) dan Kalium serum 1-2 minggu pasca setiap kenaikan dosis ARNI atau MRA. Kenaikan kreatinin hingga 30% dari basal masih dianggap respons hemodinamik aman.'
      }
    ]
  },

  // 5. DISLIPIDEMIA & PENCEGAHAN KARDIOVASKULAR (ASCVD)
  {
    id: 'pathway-dyslipidemia',
    guidelineId: 'guideline-dyslipidemia',
    diseaseName: 'Dislipidemia & Pencegahan Kardiovaskular (ASCVD)',
    category: 'Kardiovaskular',
    organization: 'PERKI 2023 / ESC Lipid Guidelines',
    shortSummary: 'Alur terapi intensitas Statin, penambahan Ezetimibe, hingga terapi target PCSK9 Inhibitor sesuai kategori risiko.',
    steps: [
      {
        stepNumber: 1,
        title: 'Langkah 1: Stratifikasi Risiko & Inisiasi Statin Intensitas Tinggi/Sedang',
        subtitle: 'Pemilihan Dosis Statin Awal Berdasarkan Kategori Risiko Kardiovaskular',
        timeline: 'Bulan ke 0 - 2',
        category: 'inisiasi',
        description: 'Pasien risiko tinggi/sangat tinggi (pasca serangan jantung, stroke, DM + komorbid) wajib langsung memulai Statin Intensitas Tinggi.',
        drugs: [
          {
            name: 'Atorvastatin / Rosuvastatin (Statin Intensitas Tinggi)',
            dosage: 'Atorvastatin 40 - 80 mg atau Rosuvastatin 20 - 40 mg PO 1x/hari malam hari',
            role: 'Lini Pertama Risiko Tinggi / Sekunder (Target Turun LDL >= 50%)',
            fornasTier: 'Faskes 1'
          },
          {
            name: 'Simvastatin / Atorvastatin (Statin Intensitas Sedang)',
            dosage: 'Simvastatin 20 - 40 mg atau Atorvastatin 20 mg PO 1x/hari malam hari',
            role: 'Lini Pertama Risiko Menengah (Target Turun LDL 30-49%)',
            fornasTier: 'Faskes 1'
          }
        ],
        targetCriteria: [
          'Risiko Sangat Tinggi / Ekstrem: Target LDL < 55 mg/dL (dan turun >= 50%)',
          'Risiko Tinggi: Target LDL < 70 mg/dL',
          'Risiko Menengah: Target LDL < 100 mg/dL'
        ],
        triggersForNextStep: 'Lakukan evaluasi profil lipid ulang setelah 4 - 12 MINGGU. Jika target angka LDL BELUM TERCAPAI pada dosis statin maksimal yang ditoleransi, NAIKKAN KE LANGKAH 2 (Kombinasi Ezetimibe).',
        clinicalNotes: 'Pemeriksaan enzim transaminase SGOT/SGPT awal direkomendasikan. Nyeri otot mialgia ringan jarang berkembang menjadi rhabdomyolysis.'
      },
      {
        stepNumber: 2,
        title: 'Langkah 2: Terapi Kombinasi Statin Dosis Maksimal + Ezetimibe',
        subtitle: 'Penghambatan Ganda: Sintesis Kolesterol di Hepar + Absorpsi Kolesterol di Usus',
        timeline: 'Bulan ke 2 - 4',
        category: 'kombinasi',
        description: 'Penambahan Ezetimibe memberikan penurunan tambahan kadar LDL sebesar 15 - 20%.',
        drugs: [
          {
            name: 'Atorvastatin 40 mg + Ezetimibe',
            dosage: 'Atorvastatin 40 mg + Ezetimibe 10 mg PO SEKALI SEHARI malam hari',
            role: 'Kombinasi Statin + Ezetimibe Baku Emas',
            fornasTier: 'Faskes 2/3'
          }
        ],
        targetCriteria: [
          'Tercapainya target agresif LDL < 55 mg/dL pada pasien pasca Sindrom Koroner Akut atau riwayat PCI/CABG',
          'Tidak terdapat kenaikan enzim hepar > 3x batas atas normal'
        ],
        triggersForNextStep: 'Jika pada pasien risiko sangat tinggi target LDL tetap belum tercapai dengan Statin dosis maksimal + Ezetimibe, pertimbangkan Langkah 3 (Inhibitor PCSK9).',
        clinicalNotes: 'Ezetimibe bekerja spesifik menghambat transporter protein Niemann-Pick C1-Like 1 (NPC1L1) di brush border epitel usus halus.'
      }
    ]
  }
];
