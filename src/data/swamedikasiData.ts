import { SwamedikasiProtocol, SwamedikasiCategoryKey } from '../types';

export const SWAMEDIKASI_PROTOCOLS: SwamedikasiProtocol[] = [
  // ============================================================================
  // 1. DEMAM & NYERI (PAIN & FEVER)
  // ============================================================================
  {
    id: 'swam-demam-dewasa',
    title: 'Demam & Panas Dingin (Meriang Dewasa)',
    category: 'pain-fever',
    categoryLabel: 'Demam & Nyeri',
    iconName: 'Flame',
    quickSummary: 'Peningkatan suhu tubuh di atas 37.5°C disertai meriang, menggigil ringan, atau pegal-pegal yang umumnya dipicu infeksi virus saluran napas atau kelelahan.',
    laymanKeywords: ['demam', 'panas', 'meriang', 'panas dingin', 'menggigil', 'sumeng', 'badan anget'],
    typicalSymptoms: [
      'Suhu tubuh terukur 37.5°C – 38.5°C',
      'Badan terasa meriang atau menggigil ringan',
      'Pegal-pegal pada persendian dan otot',
      'Nafsu makan sedikit menurun',
      'Sakit kepala ringan'
    ],
    redFlags: [
      'Demam tinggi > 39°C yang tidak turun dengan obat penurun panas',
      'Demam sudah berlangsung > 3 hari berturut-turut tanpa perbaikan',
      'Disertai kaku kuduk / leher kaku tidak bisa ditekuk ke dada',
      'Disertai ruam bintik-bintik merah di kulit yang tidak hilang saat ditekan gelas kaca',
      'Disertai kejang, linglung, mengigau, atau penurunan kesadaran',
      'Disertai sesak napas berat atau muntah terus menerus tidak bisa masuk cairan'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Parasetamol (Acetaminophen)',
        brandExamples: ['Panadol', 'Sanmol', 'Biogesic', 'Dumin', 'Paracetamol Kimia Farma'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 500 mg – 1000 mg tiap 4–6 jam bila demam. Maksimal 4000 mg (4 gram) per 24 jam.',
        timing: 'Dapat diminum sebelum atau sesudah makan.',
        cautionNotes: 'Paling aman untuk lambung dan ibu hamil. Hindari konsumsi berlebih bila ada riwayat gangguan fungsi hati.',
        targetDrugId: 'drug-paracetamol'
      },
      {
        genericName: 'Ibuprofen 200 mg / 400 mg',
        brandExamples: ['Proris', 'Farsifen', 'Ibuprofen Kimia Farma', 'Bodrex Extra (kombinasi)'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 200 mg – 400 mg tiap 6–8 jam bila demam tidak mereda dengan parasetamol.',
        timing: 'WAJIB diminum SEGERA SESUDAH MAKAN atau bersama makanan.',
        cautionNotes: 'Hindari bila ada riwayat sakit maag kronis, tukak lambung aktif, atau dicurigai demam berdarah dengue (DBD).',
        targetDrugId: 'drug-ibuprofen'
      }
    ],
    nonPharmacolTherapy: [
      'Kompres hangat pada dahi, ketiak, dan lipat paha (JANGAN gunakan kompres air es atau alkohol).',
      'Minum banyak air putih hangat (minimal 2 - 2.5 liter per hari) untuk mencegah dehidrasi.',
      'Kenakan pakaian tipis dan menyerap keringat, jangan berselimut terlalu tebal.',
      'Istirahat tirah baring yang cukup (tidur 7-8 jam).'
    ],
    contraindicatedForSelfMed: [
      'JANGAN mengonsumsi Antibiotik (seperti Amoksisilin) secara mandiri karena demam akut mayoritas disebabkan oleh virus yang tidak mempan antibiotik.',
      'JANGAN gunakan Aspirin pada anak/remaja karena risiko Sindrom Reye yang mematikan.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Parasetamol adalah pilihan obat lini pertama yang paling aman selama kehamilan (Kategori B). Hindari Ibuprofen terutama pada trimester ke-3.',
      pediatricWarning: 'Gunakan sediaan sirup atau drop dengan penakar dosis berbasis berat badan anak (10-15 mg/kgBB).',
      geriatricWarning: 'Perhatikan fungsi ginjal dan hepar; prioritaskan Parasetamol dosis terendah efektif.'
    },
    whenToSeeDoctor: [
      'Demam belum reda setelah 3 hari swamedikasi.',
      'Suhu tubuh melonjak melebihi 39.5°C.',
      'Muncul tanda perdarahan (gusi berdarah, mimisan, bintik merah petekie).'
    ],
    gemaCermatTips: [
      'DA: Dapatkan obat hanya di Apotek resmi atau Toko Obat berizin.',
      'GU: Gunakan termometer digital untuk mengukur suhu secara obyektif.',
      'SI: Simpan obat di tempat kering dan sejuk terhindar dari sinar matahari langsung.',
      'BU: Buang sediaan yang telah kadaluarsa atau mengalami perubahan bau dan warna.'
    ]
  },
  {
    id: 'swam-sakit-kepala',
    title: 'Sakit Kepala Tegang & Pusing Ringan (Tension Headache)',
    category: 'pain-fever',
    categoryLabel: 'Demam & Nyeri',
    iconName: 'Activity',
    quickSummary: 'Nyeri tumpul seperti diikat tali di sekeliling kepala atau tengkuk leher, sering dipicu oleh kelelahan, kurang tidur, stres, atau menatap layar gadget terlalu lama.',
    laymanKeywords: ['sakit kepala', 'pusing', 'nyut nyutan', 'kepala berat', 'migrain', 'tengkuk kaku'],
    typicalSymptoms: [
      'Rasa tertekan atau diikat kencang di dahi atau belakang kepala',
      'Nyeri terasa di kedua sisi kepala dengan intensitas ringan-sedang',
      'Tidak disertai mual atau muntah hebat',
      'Sensitif terhadap suara bising atau cahaya terang'
    ],
    redFlags: [
      'Sakit kepala mendadak yang sangat hebat seperti tersambar petir ("Thunderclap Headache")',
      'Disertai kelemahan separuh badan, bicara pelo, atau pandangan kabur mendadak (tanda Stroke)',
      'Disertai demam tinggi mendadak dan leher kaku tidak bisa digerakkan',
      'Sakit kepala pasca cedera benturan kepala',
      'Sakit kepala yang semakin memberat dari hari ke hari pada usia > 50 tahun'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Parasetamol 500 mg',
        brandExamples: ['Panadol Biru', 'Sanmol', 'Biogesic', 'Paramol'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 1 – 2 tablet (500 mg – 1000 mg) tiap 6 jam bila nyeri.',
        timing: 'Dapat diminum sebelum atau sesudah makan.',
        cautionNotes: 'Pilihan teraman untuk sakit kepala tanpa iritasi lambung.',
        targetDrugId: 'drug-paracetamol'
      },
      {
        genericName: 'Parasetamol + Kafein',
        brandExamples: ['Panadol Extra', 'Bodrex', 'Paramex', 'Saridon'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 1 kaplet tiap 6–8 jam bila sakit kepala terasa berdenyut.',
        timing: 'Diminum sesudah makan.',
        cautionNotes: 'Kafein meningkatkan efek antinyeri (analgesic booster). Hindari diminum sebelum tidur karena dapat menyebabkan susah tidur.',
        targetDrugId: 'drug-paracetamol'
      },
      {
        genericName: 'Ibuprofen 200 mg / 400 mg',
        brandExamples: ['Proris', 'Bodrex Extra', 'Farsifen'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 200 mg – 400 mg bila nyeri kepala disertai ketegangan otot leher.',
        timing: 'WAJIB sesudah makan.',
        cautionNotes: 'Hindari bila ada riwayat sakit maag / tukak lambung.',
        targetDrugId: 'drug-ibuprofen'
      }
    ],
    nonPharmacolTherapy: [
      'Istirahat di ruangan yang tenang, gelap, dan sejuk.',
      'Pijat relaksasi lembut pada otot pelipis, dahi, dan tengkuk leher.',
      'Kompres hangat pada leher belakang atau kompres dingin pada dahi.',
      'Cukupi kebutuhan cairan (dehidrasi adalah pemicu utama sakit kepala tegang).',
      'Batasi waktu menatap layar smartphone/komputer setiap 20 menit (aturan 20-20-20).'
    ],
    contraindicatedForSelfMed: [
      'Jangan mengonsumsi obat sakit kepala kombinasi secara terus-menerus > 10 hari per bulan untuk mencegah sakit kepala ketergantungan obat (Medication-Overuse Headache).'
    ],
    specialPopulations: {
      pregnancyWarning: 'Parasetamol adalah pilihan tunggal yang aman. Jangan gunakan sediaan kombinasi kafein tinggi atau ibuprofen pada kehamilan.',
      pediatricWarning: 'Gunakan Parasetamol sirup dosis anak. Hindari aspirin.',
      geriatricWarning: 'Waspadai hipertensi tidak terkontrol sebagai penyebab sakit kepala pada lansia; cek tekanan darah.'
    },
    whenToSeeDoctor: [
      'Nyeri kepala tidak berkurang setelah 3 hari minum obat.',
      'Frekuensi sakit kepala terjadi lebih dari 3 kali dalam seminggu.',
      'Nyeri kepala disertai gangguan penglihatan atau kebas wajah.'
    ]
  },
  {
    id: 'swam-sakit-gigi',
    title: 'Sakit Gigi & Nyeri Gusi Sementara',
    category: 'pain-fever',
    categoryLabel: 'Demam & Nyeri',
    iconName: 'Smile',
    quickSummary: 'Nyeri berdenyut pada gigi berlubang atau gusi meradang. Obat swamedikasi HANYA pereda nyeri darurat sementara sebelum pemeriksaan ke Dokter Gigi.',
    laymanKeywords: ['sakit gigi', 'gigi ngilu', 'gusi bengkak', 'gigi bolong', 'gigi berdenyut'],
    typicalSymptoms: [
      'Nyeri berdenyut pada gigi saat mengunyah atau terkena makanan manis/dingin',
      'Gusi di sekitar gigi berlubang tampak kemerahan atau agak bengkak',
      'Nyeri menjalar hingga ke rahang atau pelipis'
    ],
    redFlags: [
      'Bengkak pipi/wajah meluas hingga mata atau bawah leher (tanda abses menyebar)',
      'Sulit membuka mulut (trismus) atau sulit menelan air liur',
      'Disertai demam tinggi menggigil',
      'Sesak napas akibat pembengkakan dasar mulut (Angina Ludwig - DARURAT MEDIS)'
    ],
    maxSelfMedDays: 2,
    recommendedDrugs: [
      {
        genericName: 'Asam Mefenamat 500 mg',
        brandExamples: ['Ponstan', 'Mefinal', 'Asam Mefenamat Kimia Farma'],
        bpomClass: 'Obat Wajib Apotek (OWA)',
        dosageGuideline: 'Dewasa: Dosis awal 500 mg, dilanjutkan 250 - 500 mg tiap 6 jam bila nyeri hebat (maksimal 7 hari).',
        timing: 'WAJIB diminum SEGERA SESUDAH MAKAN dengan segelas air.',
        cautionNotes: 'Dapat diperoleh melalui Apoteker (Maksimal 20 tablet OWA). KONTRAINDIKASI pada tukak lambung aktif dan asma sensitif NSAID.',
        targetDrugId: 'drug-mefenamic-acid'
      },
      {
        genericName: 'Parasetamol 500 mg',
        brandExamples: ['Panadol', 'Sanmol', 'Dumin'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 500 mg – 1000 mg tiap 6 jam sebagai alternatif aman bagi penderita maag.',
        timing: 'Sebelum atau sesudah makan.',
        cautionNotes: 'Aman untuk lambung.',
        targetDrugId: 'drug-paracetamol'
      },
      {
        genericName: 'Obat Kumur Povidone Iodine 1% / Chlorhexidine 0.2%',
        brandExamples: ['Betadine Obat Kumur', 'Minosep Gargle'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Kumur 10–15 mL selama 30 detik pada area gigi berlubang 3–4 kali sehari. JANGAN DITELAN.',
        timing: 'Sesudah sikat gigi.',
        cautionNotes: 'Membunuh bakteri patogen penyebab radang gusi dan bau busuk.',
        targetDrugId: 'drug-fornas-povidone-iodine'
      }
    ],
    nonPharmacolTherapy: [
      'Kumur air garam hangat (1/2 sendok teh garam dalam segelas air hangat) untuk meredakan radang gusi.',
      'Kompres dingin pada pipi luar yang sakit (15 menit on / 15 menit off).',
      'Tinggikan posisi kepala saat tidur menggunakan bantal ganda untuk mengurangi tekanan denyutan di gigi.',
      'Hindari makanan/minuman terlalu manis, terlalu panas, atau terlalu dingin.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN menaruh tablet obat (seperti aspirin atau puyer) langsung ke dalam lubang gigi karena asamnya akan membakar mukosa gusi!',
      'JANGAN membeli antibiotik (Amoksisilin/Siprofloksasin) sendiri tanpa resep dokter gigi.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Gunakan Parasetamol. Hindari Asam Mefenamat pada trimester 3.',
      pediatricWarning: 'Parasetamol sirup dosis sesuai berat badan.',
      geriatricWarning: 'Waspadai riwayat perdarahan lambung bila menggunakan Asam Mefenamat.'
    },
    whenToSeeDoctor: [
      'Segera buat janji temu dengan Dokter Gigi karena obat hanya menutupi rasa sakit, tidak menyembuhkan lubang gigi.',
      'Pipi mulai tampak bengkak atau keluar nanah dari gusi.'
    ]
  },
  {
    id: 'swam-dismenore',
    title: 'Nyeri Haid Primer (Dismenore)',
    category: 'pain-fever',
    categoryLabel: 'Demam & Nyeri',
    iconName: 'HeartHandshake',
    quickSummary: 'Kram perut bawah saat menstruasi akibat pelepasan prostaglandin alami rahim tanpa kelainan organ panggul.',
    laymanKeywords: ['nyeri haid', 'kram menstruasi', 'dismenore', 'perut kram datang bulan', 'senggugut'],
    typicalSymptoms: [
      'Kram berdenyut di perut bagian bawah menjelang atau 1-2 hari pertama menstruasi',
      'Nyeri menjalar ringan ke punggung bawah atau paha',
      'Dapat disertai lemas, pegal, atau sedikit mual'
    ],
    redFlags: [
      'Nyeri haid yang sangat ekstrem hingga pingsan atau tidak bisa bangun tidur',
      'Nyeri haid yang baru pertama kali muncul pada usia > 25 tahun',
      'Disertai perdarahan haid yang sangat banyak (ganti pembalut tiap 1 jam)',
      'Nyeri saat buang air besar atau berhubungan intim (curiga Endometriosis)'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Ibuprofen 200 mg / 400 mg',
        brandExamples: ['Proris 200', 'Farsifen 400', 'Feminax (kombinasi parasetamol+ekstrak hiosiamin)'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 200 mg – 400 mg diminum pada awal terasa kram, dilanjutkan tiap 6-8 jam bila perlu.',
        timing: 'Diminum SEGERA SESUDAH MAKAN.',
        cautionNotes: 'Pilihan lini pertama paling efektif karena menghambat sintesis prostaglandin rahim secara langsung.',
        targetDrugId: 'drug-ibuprofen'
      },
      {
        genericName: 'Asam Mefenamat 500 mg',
        brandExamples: ['Ponstan', 'Mefinal'],
        bpomClass: 'Obat Wajib Apotek (OWA)',
        dosageGuideline: 'Dewasa: 500 mg diminum 3 kali sehari sesudah makan.',
        timing: 'WAJIB sesudah makan.',
        cautionNotes: 'Maksimal penggunaan 3 hari pertama masa haid.',
        targetDrugId: 'drug-mefenamic-acid'
      }
    ],
    nonPharmacolTherapy: [
      'Kompres hangat (bantal pemanas / botol air hangat) di atas perut bawah.',
      'Minum air jahe hangat atau teh chamomile untuk merilekskan otot rahim.',
      'Lakukan peregangan ringan (yoga child pose atau jalan santai).',
      'Kurangi asupan garam dan kafein selama masa haid untuk mengurangi kembung.'
    ],
    contraindicatedForSelfMed: [
      'Hindari penggunaan NSAID bila memiliki riwayat tukak lambung akut.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Hanya terjadi pada wanita tidak hamil. Bila sedang terlambat haid dan nyeri perut hebat, lakukan tes kehamilan (curiga kehamilan ektopik).',
      pediatricWarning: 'Aman untuk remaja putri usia menarche > 12 tahun dengan dosis sesuai BB.',
      geriatricWarning: 'Tidak relevan (pasca menopause).'
    },
    whenToSeeDoctor: [
      'Nyeri tidak reda meski telah meminum obat antinyeri maksimal.',
      'Nyeri haid bertambah parah dari siklus ke siklus.'
    ]
  },

  // ============================================================================
  // 2. SALURAN CERNA (DIGESTIVE & GI)
  // ============================================================================
  {
    id: 'swam-maag-dispepsia',
    title: 'Maag Akut, Perut Perih & Asam Lambung (Dispepsia)',
    category: 'digestive',
    categoryLabel: 'Saluran Cerna',
    iconName: 'ShieldAlert',
    quickSummary: 'Rasa terbakar atau perih di ulu hati, mual, dan rasa cepat kenyang yang dipicu oleh asam lambung berlebih, telat makan, stres, atau makanan pedas/kopi.',
    laymanKeywords: ['maag', 'asam lambung', 'ulu hati perih', 'nyeri lambung', 'gerd', 'perut perih'],
    typicalSymptoms: [
      'Rasa perih, panas, atau nyeri menusuk di ulu hati (tengah atas perut)',
      'Rasa cepat kenyang atau begah setelah makan',
      'Mual ringan terutama saat perut kosong atau terlambat makan',
      'Sering bersendawa asam'
    ],
    redFlags: [
      'Muntah darah berwarna merah segar atau muntah hitam seperti ampas kopi',
      'Buang air besar berwarna hitam pekat lengket seperti aspal (Melena)',
      'Nyeri ulu hati yang menjalar ke dada kiri, bahu, atau rahang disertai keringat dingin (TANDA SERANGAN JANTUNG - SEGERA KE UGD)',
      'Sulit menelan makanan atau makanan terasa tersangkut di kerongkongan',
      'Penurunan berat badan drastis tanpa sebab yang jelas'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Antasida DOEN (Aluminium Hidroksida + Magnesium Hidroksida + Simetikon)',
        brandExamples: ['Mylanta', 'Promag', 'Polysilane', 'Gastrucid', 'Antasida DOEN Generik'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 1–2 tablet kunyah ATAU 1–2 sendok takar (5–10 mL) suspensi 3–4 kali sehari.',
        timing: 'WAJIB DIMINUM SAAT PERUT KOSONG: 1 jam SEBELUM makan atau 2 jam SESUDAH makan dan menjelang tidur malam. Tablet WAJIB DIKUNYAH sampai halus sebelum ditelan.',
        cautionNotes: 'Bekerja cepat menetralkan asam lambung secara lokal dalam 15-30 menit.',
        targetDrugId: 'drug-antacid'
      },
      {
        genericName: 'Famotidin 20 mg / 40 mg',
        brandExamples: ['Famocid', 'H2-Blocker Famotidine'],
        bpomClass: 'Obat Wajib Apotek (OWA)',
        dosageGuideline: 'Dewasa: 20 mg diminum 1-2 kali sehari bila antasida kunyah kurang mempan.',
        timing: 'Diminum 30-60 menit sebelum makan.',
        cautionNotes: 'Penghambat reseptor H2 yang menurunkan produksi asam lambung hingga 10-12 jam. Maksimal 10 tablet per penyerahan OWA.',
        targetDrugId: 'drug-famotidine'
      }
    ],
    nonPharmacolTherapy: [
      'Makan teratur dengan porsi kecil namun sering (small frequent meals: 4-5 kali sehari).',
      'Hindari makanan pemicu: makanan pedas, asam (jeruk/tomat), gorengan berlemak, cokelat, kopi, dan minuman bersoda.',
      'Jangan langsung berbaring tidur minimal 2–3 jam setelah selesai makan untuk mencegah asam lambung naik ke kerongkongan.',
      'Tinggikan posisi kepala saat tidur sekitar 15-20 cm (gunakan bantal baji).',
      'Kelola stres dan hindari merokok.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN mengonsumsi obat antinyeri NSAID (seperti Asam Mefenamat, Ibuprofen, Natrium Diklofenak, Aspirin) karena akan memperparah luka lambung secara drastis!'
    ],
    specialPopulations: {
      pregnancyWarning: 'Antasida sediaan aluminium/magnesium aman untuk ibu hamil pada dosis anjuran. Hindari antasida berbasis natrium bikarbonat.',
      pediatricWarning: 'Konsultasikan ke dokter spesialis anak bila anak mengeluh sakit perut berulang.',
      geriatricWarning: 'Waspadai efek samping sembelit (dari aluminium) atau diare (dari magnesium).'
    },
    whenToSeeDoctor: [
      'Keluhan lambung tidak membaik setelah 3 hari swamedikasi.',
      'Nyeri perut sangat hebat mendadak seperti ditusuk jarum.',
      'Timbul tanda muntah darah atau BAB hitam.'
    ]
  },
  {
    id: 'swam-kembung-masuk-angin',
    title: 'Perut Kembung, Begah & "Masuk Angin"',
    category: 'digestive',
    categoryLabel: 'Saluran Cerna',
    iconName: 'Wind',
    quickSummary: 'Penumpukan gas berlebih di dalam saluran pencernaan yang menyebabkan perut terasa membesar, kencang, bersendawa terus menerus, atau sering buang angin.',
    laymanKeywords: ['kembung', 'masuk angin', 'perut begah', 'perut penuh', 'gas lambung', 'sendawa'],
    typicalSymptoms: [
      'Perut terasa padat, kencang, dan berbunyi gemuruh (borborygmi)',
      'Sering bersendawa atau buang angin namun rasa begah belum plong',
      'Rasa mual ringan tanpa muntah'
    ],
    redFlags: [
      'Perut membuncit keras seperti papan disertai tidak bisa buang angin dan tidak bisa BAB sama sekali (curiga Ileus Obstruksi - DARURAT)',
      'Nyeri perut yang sangat tajam dan mendadak',
      'Disertai muntah berwarna kehijauan atau feses berdarah'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Simetikon (Dimetikon Aktif)',
        brandExamples: ['Disflatyl', 'Polysilane (kombinasi)', 'Gazero'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 1–2 tablet kunyah (40 mg – 80 mg) dikunyah setelah makan dan sebelum tidur.',
        timing: 'Diminum/dikunyah sesudah makan.',
        cautionNotes: 'Memecah gelembung gas di usus sehingga gas mudah dikeluarkan lewat sendawa atau flatus.',
        targetDrugId: 'drug-antacid'
      },
      {
        genericName: 'Minyak Kayu Putih / Minyak Telon / Aromaterapi Herbal',
        brandExamples: ['Minyak Kayu Putih Cap Lang', 'FreshCare', 'Tolak Angin'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Oleskan dan pijat lembut searah jarum jam pada area perut, punggung, dan dada.',
        timing: 'Kapan saja saat perut terasa kembung.',
        cautionNotes: 'Hanya untuk pemakaian luar.',
        targetDrugId: 'drug-herbal'
      }
    ],
    nonPharmacolTherapy: [
      'Minum air rebusan jahe hangat atau teh peppermint hangat untuk merelaksasi otot usus.',
      'Berjalan santai kaki selama 10-15 menit untuk membantu pergerakan peristaltik gas usus keluar.',
      'Hindari makan terburu-buru, jangan berbicara saat mengunyah makanan, dan hindari minum menggunakan sedotan (aerofagia).',
      'Batasi makanan penghasil gas: kol, kubis, brokoli, ubi, nangka, durian, dan minuman berkarbonasi.'
    ],
    contraindicatedForSelfMed: [
      'Hindari konsumsi minuman bersoda karena akan menambah volume gas di lambung.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Simetikon aman untuk ibu hamil karena bekerja secara fisik lokal tanpa diserap ke peredaran darah.',
      pediatricWarning: 'Gunakan minyak telon atau tetes simetikon khusus bayi/anak.',
      geriatricWarning: 'Aman digunakan pada lansia.'
    },
    whenToSeeDoctor: [
      'Kembung menetap lebih dari 3 hari.',
      'Perut tampak membengkak keras dan tidak bisa buang angin.'
    ]
  },
  {
    id: 'swam-diare-dewasa',
    title: 'Diare Akut Ringan Dewasa (Mencret Non-Spesifik)',
    category: 'digestive',
    categoryLabel: 'Saluran Cerna',
    iconName: 'Droplet',
    quickSummary: 'BAB cair lebih dari 3 kali dalam 24 jam tanpa lendir dan tanpa darah, umumnya akibat salah makan, keracunan makanan ringan, atau infeksi virus saluran cerna.',
    laymanKeywords: ['diare', 'mencret', 'buang air cair', 'murus', 'keracunan makanan'],
    typicalSymptoms: [
      'Feses bertekstur lembek atau cair frekuensi 3–5 kali sehari',
      'Mules atau kram perut sesaat sebelum BAB',
      'Rasa haus yang meningkat',
      'Badan terasa agak lemas'
    ],
    redFlags: [
      'Feses bercampur DARAH segar atau berlendir pekat (Tanda Disentri / Kolitis)',
      'Tanda dehidrasi sedang-berat: mata cekung, kulit dicubit lambat kembali, bibir sangat kering pecah-pecah, urin sangat pekat/tidak kencing > 8 jam',
      'Disertai demam tinggi menggigil > 38.5°C',
      'Muntah terus-menerus hingga tidak ada cairan yang bisa masuk',
      'Diare tidak berhenti setelah 2 hari'
    ],
    maxSelfMedDays: 2,
    recommendedDrugs: [
      {
        genericName: 'Oralit (Oral Rehydration Salts / ORS)',
        brandExamples: ['Oralit Generik Kemenkes', 'Pharolit', 'Corsalit'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 1 sachet dilarutkan dalam 200 mL air matang, diminum SETIAP KALI SELESAI BAB CAIR (minimal 1-2 gelas tiap BAB).',
        timing: 'Segera diminum perlahan sedikit demi sedikit.',
        cautionNotes: 'PILAR UTAMA SWAMEDIKASI DIARE. Mencegah dehidrasi yang mengancam jiwa.',
        targetDrugId: 'drug-oral-rehydration-salts'
      },
      {
        genericName: 'Attapulgite Aktif / Karbon Aktif (Norit)',
        brandExamples: ['Entrostop', 'New Diatabs', 'Norit', 'Biodiar'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 2 tablet setelah BAB cair pertama, lalu 2 tablet setiap selesai BAB cair berikutnya. Maksimal 12 tablet per 24 jam.',
        timing: 'Diminum dengan air putih.',
        cautionNotes: 'Bekerja menyerap racun dan bakteri di lumen usus serta memadatkan konsistensi tinja.',
        targetDrugId: 'drug-antidiarrheal'
      }
    ],
    nonPharmacolTherapy: [
      'Minum banyak cairan elektrolit: Oralit, kuah sup kaldu bening, air kelapa muda, atau air tajin.',
      'Terapkan pola makan BRAT diet (Banana/Pisang, Rice/Nasi putih, Applesauce/Saus apel, Toast/Roti tawar panggang).',
      'Hindari susu sapi, makanan pedas, gorengan berminyak, kopi, dan sayuran berserat kasar sementara waktu.',
      'Cuci tangan dengan sabun dan air mengalir sebelum makan dan setelah dari toilet.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN gunakan Loperamid (Imodium) secara sembarangan jika diare disertai demam atau darah, karena akan menahan racun bakteri di dalam usus!',
      'JANGAN minum Antibiotik (seperti Kotrimoksazol, Ciprofloxacin) tanpa anjuran dokter.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Oralit SANGAT AMAN dan wajib diberikan. Hindari obat anti-motilitas loperamid.',
      pediatricWarning: 'PADA ANAK WAJIB MENGGUNAKAN PROTOKOL ZINC + ORALIT (Lihat modul Diare Anak).',
      geriatricWarning: 'Lansia sangat cepat mengalami dehidrasi dan gangguan elektrolit; pantau frekuensi kencing.'
    },
    whenToSeeDoctor: [
      'Diare berlangsung > 48 jam (2 hari).',
      'Timbul tanda dehidrasi (pusing melayang, lemas tidak bertenaga).',
      'Feses berwarna merah darah atau hitam.'
    ]
  },
  {
    id: 'swam-sembelit-konstipasi',
    title: 'Konstipasi / Sembelit Ringan (Susah Buang Air Besar)',
    category: 'digestive',
    categoryLabel: 'Saluran Cerna',
    iconName: 'Archive',
    quickSummary: 'Frekuensi BAB kurang dari 3 kali seminggu dengan feses yang keras, kering, dan sulit atau sakit saat dikeluarkan.',
    laymanKeywords: ['sembelit', 'susah bab', 'konstipasi', 'feses keras', 'bebelen', 'buang air besar keras'],
    typicalSymptoms: [
      'Frekuensi buang air besar < 3 kali dalam seminggu',
      'Feses berbentuk bulat kecil keras seperti kotoran kambing (Bristol Stool Type 1-2)',
      'Harus mengejan kuat saat buang air besar',
      'Sensasi tidak tuntas setelah buang air besar'
    ],
    redFlags: [
      'Disertai perdarahan rektal merah segar dalam jumlah banyak',
      'Disertai nyeri perut melilit yang sangat hebat dan perut membuncit tegang',
      'Konstipasi mendadak pada usia > 50 tahun yang tidak pernah dialami sebelumnya',
      'Disertai penurunan berat badan drastis tanpa sebab'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Bisakodil Suppositoria (Rektal)',
        brandExamples: ['Dulcolax Suppositoria Dewasa / Anak', 'Stolax'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 1 suppositoria (10 mg) dimasukkan ke dalam anus / dubur sekali sehari.',
        timing: 'Bekerja cepat merangsang BAB dalam waktu 15–60 menit setelah dimasukkan.',
        cautionNotes: 'Buka kemasan foil dan basahi sedikit ujung suppositoria dengan air sebelum dimasukkan perlahan ke dubur.',
        targetDrugId: 'drug-laxative'
      },
      {
        genericName: 'Sirup Laktulosa',
        brandExamples: ['Duphalac', 'Lactulax', 'Constipen'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 15–30 mL per hari diminum sekali sehari di pagi hari.',
        timing: 'Diminum saat sarapan pagi atau sebelum tidur.',
        cautionNotes: 'Pencahar osmotik alami yang melunakkan feses. Bekerja lembut dalam 24–48 jam tanpa memicu kram perut.',
        targetDrugId: 'drug-lactulose'
      },
      {
        genericName: 'Bisakodil Tablet Oral',
        brandExamples: ['Dulcolax Tablet', 'Laxana'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 1–2 tablet (5–10 mg) diminum malam hari sebelum tidur.',
        timing: 'Telan utuh dengan segelas air putih. JANGAN DIKUNYAH dan JANGAN DIMINUM BERSAMAAN DENGAN SUSU/ANTASIDA.',
        cautionNotes: 'Bekerja dalam 6–12 jam (efek BAB terasa keesokan paginya).',
        targetDrugId: 'drug-laxative'
      }
    ],
    nonPharmacolTherapy: [
      'Tingkatkan konsumsi makanan tinggi serat: pepaya matang, apel, pir, oatmeal, sayuran hijau, dan agar-agar.',
      'Minum air putih minimal 2 - 2.5 liter per hari (serat butuh banyak air agar tidak menggumpal keras).',
      'Gunakan posisi jongkok saat buang air besar (atau gunakan bangku kecil di bawah kaki saat duduk di kloset duduk) untuk meluruskan poros rektum.',
      'Jangan menunda keinginan untuk buang air besar.',
      'Lakukan aktivitas fisik jalan kaki 30 menit per hari untuk menstimulasi peristaltik usus.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN menggunakan pencahar stimulan (bisakodil) lebih dari 7 hari berturut-turut untuk mencegah ketergantungan usus (Lazy Bowel Syndrome).'
    ],
    specialPopulations: {
      pregnancyWarning: 'Laktulosa atau suplemen serat adalah pilihan paling aman untuk ibu hamil. Hindari pencahar stimulan yang memicu kontraksi rahim.',
      pediatricWarning: 'Gunakan sediaan sirup laktulosa atau Dulcolax suppositoria anak (5 mg).',
      geriatricWarning: 'Laktulosa sangat cocok untuk lansia karena tidak memicu dehidrasi mendadak.'
    },
    whenToSeeDoctor: [
      'Sembelit tidak kunjung teratasi setelah 7 hari terapi.',
      'Muncul darah merah segar pada kloset atau feses.'
    ]
  },

  // ============================================================================
  // 3. SALURAN NAPAS & THT (RESPIRATORY & FLU)
  // ============================================================================
  {
    id: 'swam-flu-hidung-tersumbat',
    title: 'Flu, Bersin & Hidung Tersumbat (Common Cold)',
    category: 'respiratory',
    categoryLabel: 'Saluran Napas / THT',
    iconName: 'CloudRain',
    quickSummary: 'Infeksi virus saluran napas atas akut yang ditandai dengan hidung mampet, ingus encer mengalir, bersin-bersin, dan kepala agak pusing.',
    laymanKeywords: ['flu', 'pilek', 'hidung tersumbat', 'bersin bersin', 'hidung mampet', 'meler', 'common cold'],
    typicalSymptoms: [
      'Hidung tersumbat bergantian kiri dan kanan',
      'Cairan ingus encer bening mengalir (rinorea)',
      'Bersin-bersin berulang terutama pagi hari atau saat udara dingin',
      'Mata berair dan rasa tidak nyaman di tenggorokan'
    ],
    redFlags: [
      'Sesak napas, napas berbunyi mengi (wheezing), atau napas cepat terengah-engah',
      'Ingus kental berbau busuk disertai nyeri tekan hebat di pipi/dahi > 10 hari (curiga Sinusitis Bakterial Akut)',
      'Batuk darah atau dahak bercampur darah segar',
      'Demam tinggi > 38.5°C yang berlangsung lebih dari 3 hari'
    ],
    maxSelfMedDays: 5,
    recommendedDrugs: [
      {
        genericName: 'Pseudoefedrin + Klorfeniramin (CTM) / Parasetamol',
        brandExamples: ['Rhinos Junior', 'Decolgen', 'Neozep Forte', 'Procold Flu', 'Bodrex Flu & Batuk'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 1 kaplet diminum 3 kali sehari.',
        timing: 'Diminum sesudah makan.',
        cautionNotes: 'Pseudoefedrin melegakan hidung mampet, CTM meredakan bersin dan ingus meler. Waspadai efek mengantuk.',
        targetDrugId: 'drug-chlorpheniramine-maleate'
      },
      {
        genericName: 'Semprot Hidung Air Laut Alami (Nasal Saline Spray)',
        brandExamples: ['Sterimar Nasal Spray', 'Aqua Maris', 'Breathy Tetes Hidung NaCl'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Semprotkan 1–2 kali semprot ke masing-masing lubang hidung 3–4 kali sehari.',
        timing: 'Kapan saja saat hidung mampet atau kering.',
        cautionNotes: 'Sangat aman tanpa efek samping obat; mengencerkan lendir dan membersihkan alergen di rongga hidung.',
        targetDrugId: 'drug-fornas-sodium-chloride'
      },
      {
        genericName: 'Oksimetazolin Semprot Hidung 0.05%',
        brandExamples: ['Iliadin Spray / Drop', 'Afrin'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 2-3 semprot pada tiap lubang hidung, maksimal 2 kali sehari (pagi dan malam).',
        timing: 'Sebelum tidur atau saat hidung sangat mampet.',
        cautionNotes: 'SANGAT MELEGAKAN HIDUNG DALAM HITUNGAN MENIT. PERINGATAN KERAS: JANGAN GUNAKAN LEBIH DARI 3 HARI BERTURUT-TURUT untuk mencegah Rhinitis Medicamentosa (hidung tambah mampet parah).',
        targetDrugId: 'drug-nasal-decongestant'
      }
    ],
    nonPharmacolTherapy: [
      'Menghirup uap air panas dari mangkuk (bisa diteteskan minyak kayu putih / menthol) dengan kepala ditutup handuk.',
      'Minum banyak air putih hangat, teh jahe madu, atau sup ayam hangat.',
      'Gunakan pelembap udara ruangan (humidifier) bila udara kamar ber-AC kering.',
      'Tidur dengan bantal lebih tinggi untuk melancarkan saluran napas.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN mengonsumsi Antibiotik! Flu disebabkan oleh Virus (Rhinovirus, Influenza), antibiotik TIDAK AKAN membunuh virus dan hanya merusak bakteri baik usus.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Gunakan Nasal Saline Spray (Sterimar/Breathy) yang 100% aman tanpa bahan kimia obat. Hindari Pseudoefedrin oral pada trimester pertama.',
      pediatricWarning: 'Gunakan sediaan tetes hidung NaCl fisiologis (Breathy Drops) atau sirup flu anak berlabel resmi.',
      geriatricWarning: 'Hati-hati Pseudoefedrin oral dapat menaikkan tekanan darah dan retensi urin pada lansia dengan pembesaran prostat (BPH).'
    },
    whenToSeeDoctor: [
      'Gejala flu tidak kunjung membaik setelah 7-10 hari.',
      'Muncul nyeri telinga hebat atau nyeri di sekitar mata dan dahi.'
    ]
  },
  {
    id: 'swam-batuk-berdahak',
    title: 'Batuk Berdahak (Productive Cough)',
    category: 'respiratory',
    categoryLabel: 'Saluran Napas / THT',
    iconName: 'Activity',
    quickSummary: 'Batuk yang disertai dahak/lendir kental di tenggorokan atau saluran napas, membutuhkan obat pengencer dan pengeluar dahak (mukolitik & ekspektoran).',
    laymanKeywords: ['batuk berdahak', 'batuk lendir', 'dahak kental', 'tenggorokan ganjel', 'batuk basah'],
    typicalSymptoms: [
      'Batuk berbunyi basah/grok-grok',
      'Dahak putih atau kekuningan yang terasa mengganjal di tenggorokan',
      'Dada terasa berat akibat tumpukan lendir'
    ],
    redFlags: [
      'Dahak bercampur DARAH segar atau berwarna kecokelatan berkarat',
      'Batuk berlangsung lebih dari 2 minggu (curiga Tuberkulosis / TB Paru)',
      'Disertai sesak napas berat atau bunyi mengi',
      'Disertai penurunan berat badan dan keringat malam hari'
    ],
    maxSelfMedDays: 5,
    recommendedDrugs: [
      {
        genericName: 'Guaifenesin (Glyceryl Guaiacolate / GG)',
        brandExamples: ['Guaifenesin Generik Kimia Farma', 'Bisolvon Extra', 'OBH Combi Batuk Berdahak'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 100 mg – 200 mg tiap 4–6 jam. Maksimal 1200 mg per hari.',
        timing: 'Diminum sesudah makan dengan segelas penuh air putih.',
        cautionNotes: 'Ekspektoran yang merangsang aliran cairan saluran napas sehingga dahak mudah dibatukkan keluar.',
        targetDrugId: 'drug-guaifenesin'
      },
      {
        genericName: 'Bromheksin HCl 8 mg',
        brandExamples: ['Bisolvon Tablet / Sirup', 'Hustab', 'Mucohexin'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 1 tablet (8 mg) 3 kali sehari.',
        timing: 'Diminum sesudah makan.',
        cautionNotes: 'Mukolitik yang memutus ikatan serat mukopolisakarida sehingga dahak menjadi encer.',
        targetDrugId: 'drug-bromhexine'
      },
      {
        genericName: 'Asetilsistein 200 mg',
        brandExamples: ['Fluimucil', 'N-Ace', 'Acetin'],
        bpomClass: 'Obat Wajib Apotek (OWA)',
        dosageGuideline: 'Dewasa: 1 kapsul / sachet effervescent 200 mg diminum 3 kali sehari sesudah makan.',
        timing: 'Larutkan dalam 1/2 gelas air putih sesudah makan.',
        cautionNotes: 'Mukolitik poten pengencer lendir kental (Maksimal 20 kapsul OWA Apotek).',
        targetDrugId: 'drug-acetylcysteine'
      }
    ],
    nonPharmacolTherapy: [
      'MINUM BANYAK AIR HANGAT (minimal 2.5 - 3 liter sehari) — air putih hangat adalah pengencer dahak alami terbaik di dunia.',
      'Minum air madu hangat perasan lemon (1-2 sendok makan madu terbukti klinis meredakan frekuensi batuk).',
      'Lakukan fisioterapi dada tepuk punggung lembut saat posisi tengkurap untuk membantu melepaskan dahak anak.',
      'Hindari rokok, paparan asap rokok, debu, dan es.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN minum obat penekan batuk kering (seperti Dekstrometorfan) untuk batuk berdahak, karena dahak akan tertahan di paru-paru dan memicu infeksi radang paru (Pneumonia).'
    ],
    specialPopulations: {
      pregnancyWarning: 'Guaifenesin dan Bromheksin dapat digunakan dengan anjuran dokter. Utamakan minum banyak air hangat dan madu.',
      pediatricWarning: 'JANGAN berikan madu pada bayi usia < 1 tahun karena risiko Botulisme bayi. Gunakan sirup tetes pengencer dahak dosis anak.',
      geriatricWarning: 'Pastikan asupan cairan cukup saat meminum obat mukolitik.'
    },
    whenToSeeDoctor: [
      'Batuk berdahak tidak kunjung sembuh setelah 2 minggu.',
      'Dahak bercampur darah atau berbau busuk.'
    ]
  },
  {
    id: 'swam-batuk-kering',
    title: 'Batuk Kering & Gatal Tenggorokan (Non-Productive Cough)',
    category: 'respiratory',
    categoryLabel: 'Saluran Napas / THT',
    iconName: 'MicOff',
    quickSummary: 'Batuk tanpa lendir/dahak yang terasa menggelitik atau gatal di tenggorokan, seringkali timbul malam hari dan mengganggu tidur.',
    laymanKeywords: ['batuk kering', 'batuk gatal', 'batuk malam', 'batuk terus terusan', 'tenggorokan gatal'],
    typicalSymptoms: [
      'Batuk tanpa keluar dahak',
      'Sensasi geli atau gatal menusuk di pangkal tenggorokan',
      'Batuk bertambah parah saat berbaring atau terpapar udara dingin AC'
    ],
    redFlags: [
      'Batuk menggonggong melengking tajam pada anak (Croup / Pertusis)',
      'Disertai sesak napas atau bibir tampak membiru',
      'Batuk yang muncul setelah minum obat darah tinggi golongan ACE-Inhibitor (Captopril, Ramipril)',
      'Batuk kering kronis > 3 minggu'
    ],
    maxSelfMedDays: 5,
    recommendedDrugs: [
      {
        genericName: 'Dekstrometorfan HBr 15 mg',
        brandExamples: ['Bisolvon Antitusif', 'Vicks Formula 44 Batuk Kering', 'Dextromethorphan HBr Generik'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 15 mg – 30 mg tiap 6–8 jam bila batuk kering mengganggu tidur.',
        timing: 'Diminum sebelum atau sesudah makan.',
        cautionNotes: 'Antitusif yang menekan refleks batuk di pusat saraf otak. Dapat menimbulkan kantuk ringan.',
        targetDrugId: 'drug-antitussive'
      },
      {
        genericName: 'Madu Murni Alami (Clinical Honey Therapy)',
        brandExamples: ['Madu Uray', 'Madu Nusantara', 'TJ Madu Murni'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: '1 - 2 sendok teh (5 - 10 mL) diminum 30 menit sebelum tidur malam.',
        timing: 'Sebelum tidur atau saat tenggorokan terasa gatal.',
        cautionNotes: 'Rekomendasi WHO dan American Academy of Pediatrics (AAP) yang terbukti sama efektifnya dengan obat kimia dalam meredakan batuk malam.',
        targetDrugId: 'drug-herbal'
      }
    ],
    nonPharmacolTherapy: [
      'Hisap permen pelega tenggorokan (lozenges) atau permen herbal untuk merangsang produksi air liur melumasi tenggorokan.',
      'Minum air hangat sedikit-sedikit namun sering.',
      'Gunakan humidifier ruangan untuk mencegah tenggorokan kering saat tidur.',
      'Hindari makanan berminyak, gorengan krispi, dan makanan manis berlebih yang memicu gatal.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN berikan Madu pada bayi di bawah usia 1 tahun (risiko spora Clostridium botulinum).'
    ],
    specialPopulations: {
      pregnancyWarning: 'Utamakan terapi non-obat madu hangat dan uap air. Konsultasikan bila butuh antitusif.',
      pediatricWarning: 'Madu sangat baik untuk anak usia > 1 tahun.',
      geriatricWarning: 'Periksa apakah pasien mengonsumsi obat Captopril; jika ya, batuk kering adalah efek samping obat yang harus dikonsultasikan ke dokter untuk diganti.'
    },
    whenToSeeDoctor: [
      'Batuk kering tidak reda setelah 5 hari.',
      'Batuk menyebabkan sesak napas atau muntah.'
    ]
  },
  {
    id: 'swam-radang-tenggorokan',
    title: 'Radang Tenggorokan Ringan (Sore Throat)',
    category: 'respiratory',
    categoryLabel: 'Saluran Napas / THT',
    iconName: 'Thermometer',
    quickSummary: 'Tenggorokan terasa perih, sakit saat menelan makanan/minuman, dan kering yang umumnya dipicu infeksi virus faringitis akut.',
    laymanKeywords: ['radang tenggorokan', 'sakit menelan', 'tenggorokan sakit', 'tenggorokan perih', 'faringitis'],
    typicalSymptoms: [
      'Rasa sakit atau perih saat menelan',
      'Tenggorokan tampak agak kemerahan',
      'Suara sedikit serak',
      'Demam sumeng-sumeng ringan'
    ],
    redFlags: [
      'Tampak bercak putih/nanah (eksudat) pada amandel atau dinding tenggorokan (curiga Faringitis Streptokokus)',
      'Sangat sulit menelan air liur hingga air liur menetes keluar (Drooling)',
      'Leher bengkak besar di salah satu sisi',
      'Mulut sulit dibuka lebar'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Dequalinium Klorida / Fradiomisin Tablet Hisap (Lozenges)',
        brandExamples: ['Degirol', 'FG Troches', 'Strepsils', 'SP Troches'],
        bpomClass: 'Obat Bebas / Bebas Terbatas',
        dosageGuideline: 'Dewasa: 1 tablet dihisap perlahan di dalam mulut tiap 3–4 jam. Maksimal 6–8 tablet hisap per hari.',
        timing: 'Dihisap perlahan di mulut seperti permen, JANGAN DIKUNYAH ATAU DITELAN UTUH.',
        cautionNotes: 'Antiseptik lokal yang membunuh kuman di rongga mulut dan tenggorokan.',
        targetDrugId: 'drug-lozenges'
      },
      {
        genericName: 'Obat Kumur Povidone Iodine 1%',
        brandExamples: ['Betadine Obat Kumur', 'Gargle Antiseptik'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Tuang 15 mL ke tutup botol, kumur dan tengadahkan kepala ke atas sambil berucap "ahhh" (gargling) selama 30 detik, 3 kali sehari. BUANG / JANGAN DITELAN.',
        timing: 'Sesudah sikat gigi.',
        cautionNotes: 'Membunuh 99% virus dan kuman di area orofaring.',
        targetDrugId: 'drug-fornas-povidone-iodine'
      },
      {
        genericName: 'Parasetamol 500 mg',
        brandExamples: ['Panadol', 'Sanmol'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Dewasa: 500 mg diminum tiap 6 jam bila nyeri menelan terasa mengganggu.',
        timing: 'Sesudah makan.',
        cautionNotes: 'Meredakan rasa sakit dan nyeri saat menelan.',
        targetDrugId: 'drug-paracetamol'
      }
    ],
    nonPharmacolTherapy: [
      'Kumur air garam hangat 3-4 kali sehari (1/2 sdt garam dalam 200 mL air hangat).',
      'Konsumsi makanan yang bertekstur lembut dan berkuah hangat (bubur, sup ayam, puding).',
      'Minum banyak air putih hangat dan hindari gorengan renyah, kerupuk, atau makanan yang menggores tenggorokan.',
      'Istirahatkan suara / jangan berteriak atau bicara terlalu banyak.'
    ],
    contraindicatedForSelfMed: [
      'SANGAT PENTING: JANGAN MEMBELI ANTIBIOTIK SENDIRI! Mayoritas radang tenggorokan akut (85-90%) disebabkan oleh VIRUS. Antibiotik tidak akan mempercepat kesembuhan dan justru memicu resistensi kuman kebal obat.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Aman menggunakan tablet hisap Dequalinium dan kumur air garam.',
      pediatricWarning: 'Hati-hati tablet hisap pada balita karena berisiko tersedak.',
      geriatricWarning: 'Aman digunakan.'
    },
    whenToSeeDoctor: [
      'Sakit menelan sangat berat hingga tidak bisa minum air.',
      'Demam tinggi > 38.5°C tidak turun setelah 3 hari.',
      'Amandel tampak membengkak besar dengan bercak nanah putih.'
    ]
  },

  // ============================================================================
  // 4. KULIT & ALERGI (SKIN & ALLERGY)
  // ============================================================================
  {
    id: 'swam-biduran-alergi',
    title: 'Biduran, Bentol & Gatal Alergi (Urtikaria Akut)',
    category: 'skin-allergy',
    categoryLabel: 'Kulit & Alergi',
    iconName: 'Sparkles',
    quickSummary: 'Bercak bentol kemerahan yang gatal dan menonjol di kulit akibat pelepasan histamin yang dipicu makanan (seafood, telur), udara dingin, atau gigitan serangga.',
    laymanKeywords: ['biduran', 'kaligata', 'bentol gatal', 'alergi kulit', 'gatal kemerahan', 'urtikaria'],
    typicalSymptoms: [
      'Bentol-bentol merah menonjol berbatas tegas (plak urtika) di berbagai bagian tubuh',
      'Rasa gatal yang sangat intens dan panas',
      'Bentol dapat berpindah-pindah lokasi dan menghilang dalam beberapa jam'
    ],
    redFlags: [
      'Bibir, kelopak mata, lidah, atau tenggorokan membengkak mendadak (Angioedema)',
      'Disertai SESAK NAPAS, mengi, atau dada terasa tercekik (TANDA REAKSI ANAFILAKSIS - SEGERA KE UGD)',
      'Disertai pusing melayang hebat, pingsan, atau tensi anjlok mendadak'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Setirizin HCl 10 mg',
        brandExamples: ['Incidal-OD', 'Ryvel', 'Cerini', 'Cetirizine Kimia Farma'],
        bpomClass: 'Obat Wajib Apotek (OWA)',
        dosageGuideline: 'Dewasa & Anak > 12 tahun: 1 tablet (10 mg) diminum SEKALI SEHARI pada malam hari.',
        timing: 'Diminum sebelum tidur.',
        cautionNotes: 'Antihistamin generasi ke-2 yang cepat menghentikan gatal bentol dengan efek mengantuk yang lebih minimal dibanding CTM.',
        targetDrugId: 'drug-cetirizine'
      },
      {
        genericName: 'Klorfeniramin Maleat (CTM) 4 mg',
        brandExamples: ['CTM Generik', 'Chlorpheniramine'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Dewasa: 1 tablet (4 mg) 3 kali sehari.',
        timing: 'Diminum sesudah makan.',
        cautionNotes: 'Sangat efektif namun MENYEBABKAN KANTUK BERAT. DILARANG MENGEMUDI atau mengoperasikan mesin setelah minum obat ini.',
        targetDrugId: 'drug-chlorpheniramine-maleate'
      },
      {
        genericName: 'Losio Calamine / Bedak Salisil 2%',
        brandExamples: ['Caladine Lotion', 'Bedak Salicyl KF', 'Herocyn'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Oleskan atau taburkan tipis merata pada kulit yang gatal setelah mandi.',
        timing: 'Kapan saja saat kulit terasa gatal.',
        cautionNotes: 'Memberikan efek sejuk dingin (cooling effect) lokal yang menenangkan rasa gatal.',
        targetDrugId: 'drug-salicyl-powder'
      }
    ],
    nonPharmacolTherapy: [
      'Kompres dingin dengan handuk basah pada area kulit yang bentol untuk meredakan rasa terbakar dan gatal.',
      'Identifikasi dan hindari pemicu alergi (misal seafood udang/kepiting, debu, tungau, dingin).',
      'Gunakan pakaian longgar berbahan katun lembut yang menyerap keringat.',
      'JANGAN MENGGARUK kulit yang bentol karena dapat menyebabkan luka lecet dan infeksi bakteri sekunder.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN mengoleskan balsem panas atau minyak panas pada biduran karena vasodilatasi panas akan memperparah rasa gatal dan bengkak.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Klorfeniramin (CTM) dan Loratadin/Setirizin tergolong aman pada kehamilan setelah konsultasi.',
      pediatricWarning: 'Gunakan Setirizin sirup dosis anak sesuai berat badan.',
      geriatricWarning: 'Hindari CTM pada lansia karena risiko jatuh akibat kantuk dan kebingungan; prioritaskan Setirizin.'
    },
    whenToSeeDoctor: [
      'Biduran tidak kunjung membaik setelah 3 hari.',
      'Muncul pembengkakan di bibir atau kesulitan bernapas (SEGERA KE UGD).'
    ]
  },
  {
    id: 'swam-jamur-kadas-kurap',
    title: 'Kadas, Kurap & Kutu Air (Tinea / Infeksi Jamur Kulit)',
    category: 'skin-allergy',
    categoryLabel: 'Kulit & Alergi',
    iconName: 'ShieldCheck',
    quickSummary: 'Infeksi jamur dermatofita superfisial pada kulit yang menimbulkan bercak melingkar kemerahan berbatas tegas dengan tepi aktif yang sangat gatal terutama saat berkeringat.',
    laymanKeywords: ['kadas', 'kurap', 'kutu air', 'jamur kulit', 'panu', 'tinea', 'gatal selangkangan'],
    typicalSymptoms: [
      'Bercak kemerahan berbentuk cincin melingkar dengan tepi lebih merah dan bersisik (central clearing)',
      'Gatal hebat terutama saat badan berkeringat atau lembap',
      'Pada kutu air: kulit sela-sela jari kaki mengelupas, memutih basah, dan perih'
    ],
    redFlags: [
      'Area infeksi membengkak merah panas keluar nanah (infeksi bakteri sekunder selulitis)',
      'Terjadi pada pasien diabetes melitus yang memiliki luka di kaki',
      'Ruam jamur meluas ke seluruh tubuh dengan daya tahan tubuh menurun'
    ],
    maxSelfMedDays: 7,
    recommendedDrugs: [
      {
        genericName: 'Krim Mikonazol Nitrat 2%',
        brandExamples: ['Daktarin Krim', 'Kalpanax Krim', 'Miconazole OGB'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Oleskan tipis merata pada area kulit yang berjamur 2 kali sehari (pagi dan malam) setelah mandi.',
        timing: 'Sesudah mandi saat kulit sudah kering bersih.',
        cautionNotes: 'SANGAT PENTING: Teruskan pemakaian selama minimal 1-2 minggu SETELAH gejalanya hilang untuk memastikan spora jamur mati tuntas dan tidak kambuh lagi.',
        targetDrugId: 'drug-antifungal-topical'
      },
      {
        genericName: 'Krim Klotrimazol 1%',
        brandExamples: ['Canesten Krim', 'Clotrimazole Generik'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Oleskan tipis 2-3 kali sehari pada lesi jamur.',
        timing: 'Sesudah mandi.',
        cautionNotes: 'Pilihan antijamur topikal spektrum luas yang aman.',
        targetDrugId: 'drug-antifungal-topical'
      }
    ],
    nonPharmacolTherapy: [
      'Jaga area kulit selalu kering dan bersih. Keringkan sela-sela jari kaki dan selangkangan dengan handuk bersih setelah mandi.',
      'Gunakan pakaian dalam dan pakaian yang longgar menyerap keringat (katun).',
      'Ganti pakaian dan kaus kaki setiap hari; jangan gunakan pakaian yang masih lembap.',
      'Hindari berbagi handuk, pakaian, atau sandal dengan orang lain.',
      'Jemur sepatu di bawah sinar matahari secara berkala.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN PERNAH MENGGUNAKAN SALEP STEROID (seperti Deksametason atau Betametason) untuk kadas/kurap! Steroid akan menyuburkan jamur sehingga kurap menjadi tidak berbatas tegas dan tambah ganas (Tinea Incognito).'
    ],
    specialPopulations: {
      pregnancyWarning: 'Krim Mikonazol dan Klotrimazol topikal aman digunakan pada ibu hamil.',
      pediatricWarning: 'Aman untuk anak-anak dengan olesan tipis.',
      geriatricWarning: 'Aman digunakan.'
    },
    whenToSeeDoctor: [
      'Infeksi jamur tidak membaik setelah 2 minggu pemakaian rutin salep antijamur.',
      'Timbul luka bernanah atau nyeri membengkak di sekitar lesi.'
    ]
  },
  {
    id: 'swam-luka-bakar-lecet',
    title: 'Luka Bakar Ringan & Luka Lecet Teriris',
    category: 'skin-allergy',
    categoryLabel: 'Kulit & Alergi',
    iconName: 'Bandage',
    quickSummary: 'Luka bakar derajat 1 (kulit merah perih tanpa melepuh besar akibat cipratan minyak panas atau knalpot) dan luka lecet teriris pisau dapur.',
    laymanKeywords: ['luka bakar', 'luka lecet', 'kena knalpot', 'kena minyak panas', 'teriris pisau', 'luka gores'],
    typicalSymptoms: [
      'Luka bakar derajat 1: Kulit memerah, perih, dan sedikit bengkak tanpa ada luka robek',
      'Luka lecet: Lapisan kulit ari terkelupas dengan bintik darah sedikit'
    ],
    redFlags: [
      'Luka bakar derajat 2-3: Kulit melepuh luas berisi cairan atau kulit tampak putih pucat gosong hangus',
      'Luka bakar mengenai area wajah, sendi utama, selangkangan, atau melingkar di tangan/kaki',
      'Luka tusukan paku berkarat (risiko infeksi Tetanus - SEGERA SUNTIK ATS / TT)',
      'Luka kotor berdarah hebat yang tidak berhenti setelah ditekan 10 menit'
    ],
    maxSelfMedDays: 5,
    recommendedDrugs: [
      {
        genericName: 'Gel Ekstrak Plasenta + Neomisin Sulfat',
        brandExamples: ['Bioplacenton Gel'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Oleskan tipis merata pada area luka 4–6 kali sehari.',
        timing: 'Setelah luka dicuci bersih dengan air mengalir.',
        cautionNotes: 'Gel berbasis air yang sejuk, mempercepat granulasi penyembuhan jaringan luka dan mencegah infeksi bakteri.',
        targetDrugId: 'drug-topical-wound'
      },
      {
        genericName: 'Povidone Iodine 10% Antiseptik Luka',
        brandExamples: ['Betadine Larutan Antiseptik', 'Antisep'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Teteskan pada kasa steril lalu usapkan lembut pada luka lecet bersih.',
        timing: 'Saat membersihkan luka.',
        cautionNotes: 'Membunuh bakteri pada luka lecet terbuka.',
        targetDrugId: 'drug-fornas-povidone-iodine'
      }
    ],
    nonPharmacolTherapy: [
      'PERTOLONGAN PERTAMA LUKA BAKAR: SEGERA SIRAM / ALIRKAN AIR BERSIH SUHU RUANG SELAMA 15–20 MENIT! Hal ini menghentikan proses kerusakan panas ke jaringan dalam.',
      'JANGAN mengoleskan pasta gigi (odol), mentega, kecap, atau tepung pada luka bakar karena memicu infeksi berat dan menjebak panas!',
      'Jangan memecahkan gelembung luka bakar (bula) karena lapisan kulit melepuh adalah perban alami pelindung dari kuman.',
      'Tutup luka dengan kasa steril kering bila perlu.'
    ],
    contraindicatedForSelfMed: [
      'DILARANG menaburkan serbuk kopi atau odol ke luka terbuka.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Bioplacenton gel dan Povidone Iodine aman untuk luka ringan.',
      pediatricWarning: 'Hati-hati pencegahan anak menyentuh luka bakar.',
      geriatricWarning: 'Penyembuhan luka pada lansia dan penderita diabetes lebih lambat; pantau ketat tanda infeksi.'
    },
    whenToSeeDoctor: [
      'Luka bakar tampak melepuh besar berdiameter > 5 cm.',
      'Luka bernanah, berbau, atau terasa berdenyut sangat sakit.'
    ]
  },

  // ============================================================================
  // 5. MATA & TELINGA (EYE & EAR)
  // ============================================================================
  {
    id: 'swam-mata-merah-iritasi',
    title: 'Mata Merah Iritasi Ringan & Kering (Mata Lelah Gadget)',
    category: 'eye-ear',
    categoryLabel: 'Mata & Telinga',
    iconName: 'Eye',
    quickSummary: 'Mata merah, perih, berpasir, atau gatal akibat paparan debu, asap kendaraan, angin, klorin kolam renang, atau menatap layar gadget terlalu lama.',
    laymanKeywords: ['mata merah', 'mata perih', 'mata kelilipan', 'mata kering', 'mata lelah', 'iritasi mata'],
    typicalSymptoms: [
      'Mata tampak kemerahan pada bagian putihnya (sklera)',
      'Terasa mengganjal seperti ada pasir atau kelilipan',
      'Mata berair namun tidak mengeluarkan belek nanah hijau',
      'Pandangan tidak kabur'
    ],
    redFlags: [
      'Penurunan tajam ketajaman penglihatan (pandangan mendadak buram/kabur)',
      'Nyeri bola mata yang sangat hebat menusuk hingga ke kepala',
      'Keluar kotoran belek kental berwarna kuning kehijauan yang membuat kelopak mata menempel saat bangun tidur (Konjungtivitis Bakterial)',
      'Mata sangat sensitif terhadap cahaya hingga tidak bisa membuka mata (Fotofobia hebat - curiga Ulkus Kornea)',
      'Mata terkena cipratan bahan kimia asam/basa (DARURAT SEGERA BILAS AIR 15 MENIT LALU KE RS)'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Tetes Mata Tetrahidrozolin HCl 0.05%',
        brandExamples: ['Insto Regular', 'Visine', 'Rohto Tetes Mata'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: 'Teteskan 1–2 tetes pada mata yang merah 2–3 kali sehari.',
        timing: 'Saat mata merah iritasi.',
        cautionNotes: 'Dekongestan mata yang menyempitkan pembuluh darah konjungtiva sehingga mata cepat putih kembali. PERINGATAN: Jangan gunakan lebih dari 3 hari berturut-turut.',
        targetDrugId: 'drug-eye-drops'
      },
      {
        genericName: 'Tetes Mata Air Mata Buatan (Artificial Tears: Carboxymethylcellulose / HPMC)',
        brandExamples: ['Cendo Cenfresh', 'Insto Dry Eyes', 'Rohto Dryfresh', 'Tears Naturale'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Teteskan 1–2 tetes pada masing-masing mata 3–4 kali sehari atau kapan saja saat mata terasa kering mengganjal.',
        timing: 'Kapan saja.',
        cautionNotes: '100% aman melumasi bola mata tanpa bahan kimia vasokonstriktor; sangat dianjurkan untuk pekerja komputer.',
        targetDrugId: 'drug-artificial-tears'
      }
    ],
    nonPharmacolTherapy: [
      'Lepaskan lensa kontak (softlens) saat mata sedang merah atau iritasi.',
      'Kompres dingin dengan kapas basah pada kelopak mata terpejam selama 5-10 menit untuk meredakan rasa panas.',
      'Terapkan aturan 20-20-20: Setiap 20 menit menatap layar, alihkan pandangan ke objek sejauh 20 kaki (6 meter) selama 20 detik.',
      'Hindari mengucek mata dengan tangan.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN menggunakan tetes mata yang mengandung Antibiotik atau Kortikosteroid (seperti Cendo Xitrol) tanpa resep dokter spesialis mata karena dapat memicu Kebutaan Glaukoma dan Katarak!'
    ],
    specialPopulations: {
      pregnancyWarning: 'Tetes mata air mata buatan (Artificial tears) sangat aman untuk ibu hamil.',
      pediatricWarning: 'Gunakan sediaan air mata buatan dosis anak; hindari tetes mata vasokonstriktor.',
      geriatricWarning: 'Waspadai gejala glaukoma sudut tertutup pada lansia; jangan gunakan tetes mata tetrahidrozolin bila ada riwayat glaukoma.'
    },
    whenToSeeDoctor: [
      'Mata merah tidak membaik setelah 3 hari pemakaian tetes mata.',
      'Penglihatan menjadi buram atau timbul rasa nyeri hebat di bola mata.'
    ]
  },

  // ============================================================================
  // 6. MULUT & BIBIR (ORAL & MOUTH)
  // ============================================================================
  {
    id: 'swam-sariawan-mulut',
    title: 'Sariawan & Bibir Pecah-Pecah (Stomatitis Aftosa Ringan)',
    category: 'mouth-oral',
    categoryLabel: 'Mulut & Bibir',
    iconName: 'Smile',
    quickSummary: 'Luka ulkus kecil dangkal berwarna putih kekuningan dengan pinggiran merah meradang di bibir dalam, pipi dalam, atau lidah yang perih saat makan makanan asin/pedas.',
    laymanKeywords: ['sariawan', 'bibir pecah pecah', 'panas dalam', 'sariawan lidah', 'sakit sariawan'],
    typicalSymptoms: [
      'Luka cekung bulat kecil diameter < 1 cm di dinding mukosa mulut',
      'Rasa perih menyengat saat makan makanan asin, pedas, atau asam',
      'Bibir kering mengelupas dan pecah-pecah'
    ],
    redFlags: [
      'Sariawan berukuran besar > 1 cm yang tidak sembuh-sembuh lebih dari 2 minggu (curiga Keganasan / Kanker Mulut)',
      'Sariawan berjumlah sangat banyak menyebar hingga ke langit-langit mulut dan tenggorokan',
      'Disertai demam tinggi dan pembengkakan kelenjar getah bening leher',
      'Sariawan disertai luka serupa di area kelamin (Sindrom Behcet)'
    ],
    maxSelfMedDays: 7,
    recommendedDrugs: [
      {
        genericName: 'Triamsinolon Asetonida Salep Mulut 0.1% (Oral Paste)',
        brandExamples: ['Kenalog in Orabase', 'Triamcinolone Acetonide Pasta Oral'],
        bpomClass: 'Obat Wajib Apotek (OWA)',
        dosageGuideline: 'Oleskan sedikit tipis pasta pada luka sariawan sebelum tidur malam (dan 2-3 kali sehari sesudah makan). JANGAN DIGOSOK, cukup ditepuk lembut hingga membentuk lapisan pelindung.',
        timing: 'Sesudah makan dan sebelum tidur malam.',
        cautionNotes: 'Pasta perekat khusus mukosa mulut yang meredakan radang dan melindungi luka dari gesekan makanan.',
        targetDrugId: 'drug-topical-oral'
      },
      {
        genericName: 'Gel Asam Hialuronat / Ekstrak Lidah Buaya',
        brandExamples: ['Aloclair Plus Gel / Spray', 'Enkasari'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Oleskan 1–2 tetes gel langsung pada luka sariawan 3–4 kali sehari.',
        timing: 'Kapan saja saat terasa perih.',
        cautionNotes: 'Membentuk lapisan pelindung transparan di atas saraf sariawan sehingga rasa perih langsung hilang.',
        targetDrugId: 'drug-topical-oral'
      },
      {
        genericName: 'Petroleum Jelly Murni / Lip Balm Pelembap Bibir',
        brandExamples: ['Vaseline Petroleum Jelly', 'Sebamed Lip Defense'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Oleskan merata pada bibir yang kering pecah-pecah sesering mungkin.',
        timing: 'Kapan saja bibir terasa kering.',
        cautionNotes: 'Mengunci kelembapan alami bibir dan mempercepat penyembuhan kulit bibir yang terkelupas.',
        targetDrugId: 'drug-topical-skin'
      }
    ],
    nonPharmacolTherapy: [
      'Kumur air garam hangat 2-3 kali sehari untuk menjaga kebersihan rongga mulut.',
      'Gunakan sikat gigi berbulu ekstra lembut (soft/ultra-soft) agar tidak melukai dinding mulut.',
      'Hindari makanan pedas, asam, asin menyengat, dan keripik tajam yang memperparah sariawan.',
      'Perbanyak konsumsi makanan tinggi Vitamin C, Vitamin B12, Asam Folat, dan Zat Besi.',
      'Cukupi minum air putih 2 liter sehari.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN MENETESKAN ALBOTHYL (Policresulen konsentrat) pada sariawan! BPOM RI telah membekukan izinnya karena bahan kaustik tersebut membakar jaringan sehat dan memperdalam luka sariawan.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Aloclair gel dan kumur air garam sangat aman untuk ibu hamil.',
      pediatricWarning: 'Aloclair gel aman untuk anak-anak karena tidak perih dan aman bila tertelan sedikit.',
      geriatricWarning: 'Periksa apakah ada kawat gigi atau gigi palsu yang tajam menggesek mukosa.'
    },
    whenToSeeDoctor: [
      'Sariawan tidak kunjung sembuh dalam waktu 2 minggu.',
      'Sariawan sangat sakit hingga tidak bisa makan dan minum sama sekali.'
    ]
  },

  // ============================================================================
  // 7. PENCERNAAN & KESEHATAN ANAK (PEDIATRIC HEALTH)
  // ============================================================================
  {
    id: 'swam-diare-anak-zinc',
    title: 'Diare Balita & Anak (Protokol Nasional Kemenkes RI)',
    category: 'pediatric',
    categoryLabel: 'Kesehatan Anak & Pediatrik',
    iconName: 'Baby',
    quickSummary: 'Tata laksana resmi wajib diare anak sesuai standar Kemenkes RI dan WHO menggunakan kombinasi ORALIT dan ZINC SELAMA 10 HARI PENUH untuk mencegah kematian akibat dehidrasi.',
    laymanKeywords: ['diare anak', 'mencret anak', 'diare balita', 'zinc diare', 'oralit anak'],
    typicalSymptoms: [
      'Anak BAB cair lebih sering dari biasanya (> 3 kali sehari)',
      'Anak tampak rewel dan kehausan',
      'Nafsu makan berkurang'
    ],
    redFlags: [
      'TANDA DEHIDRASI BERAT: Anak lemas lunglai terkulai tidak sadar, mata sangat cekung, tidak keluar air mata saat menangis, cubitan kulit perut kembali sangat lambat (> 2 detik) - SEGERA KE UGD/RS!',
      'Anak tidak mau minum sama sekali atau muntah setiap kali minum',
      'Tinja bercampur DARAH segar',
      'Disertai kejang atau demam sangat tinggi > 39°C'
    ],
    maxSelfMedDays: 2,
    recommendedDrugs: [
      {
        genericName: 'Zinc Sulfat 20 mg Tablet Dispersible (Zink Elemental)',
        brandExamples: ['Zinkid 20 mg', 'Zincpro Dispersible', 'L-Zinc Sirup', 'Zinc Sulfat Kemenkes Generik'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: '• Bayi usia < 6 bulan: 10 mg (1/2 tablet) sekali sehari selama 10 HARI PENUH.\n• Anak usia >= 6 bulan – 5 tahun: 20 mg (1 tablet utuh) sekali sehari selama 10 HARI PENUH berturut-turut.',
        timing: 'Larutkan tablet dalam 1 sendok makan air matang, ASI, atau larutan oralit. WAJIB DIMINUMKAN SELAMA 10 HARI PENUH MESKIPUN DIARE SUDAH BERHENTI.',
        cautionNotes: 'Merupakan pilar wajib Kemenkes & WHO: Zink memperbaiki epitel vili usus yang rusak dan mencegah kekambuhan diare selama 2-3 bulan ke depan.',
        targetDrugId: 'drug-zinc-sulfate'
      },
      {
        genericName: 'Oralit Osmolaritas Rendah (Low Osmolarity ORS)',
        brandExamples: ['Oralit Kemenkes', 'Pharolit Rasa Jeruk', 'Pedialyte'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: '• Anak < 1 tahun: Berikan 50 - 100 mL setiap kali BAB cair.\n• Anak 1 - 5 tahun: Berikan 100 - 200 mL setiap kali BAB cair.',
        timing: 'Berikan sedikit-sedikit tapi sering dengan sendok atau cangkir.',
        cautionNotes: 'Mencegah dan mengatasi dehidrasi. Jika anak muntah, tunggu 10 menit lalu berikan kembali perlahan.',
        targetDrugId: 'drug-oral-rehydration-salts'
      }
    ],
    nonPharmacolTherapy: [
      'TERUSKAN PEMBERIAN ASI DAN MAKANAN: Jangan pernah memuasakan anak yang sedang diare! ASI memberikan antibodi perlindungan alami.',
      'Berikan cairan rumah tangga tambahan: kuah sup kaldu bening, air tajin, atau air matang.',
      'Jaga kebersihan botol susu, rebus dot dengan air mendidih, dan cuci tangan sebelum menyiapkan makanan anak.',
      'Ganti popok sesering mungkin dan oleskan petroleum jelly atau baby cream untuk mencegah lecet bokong.'
    ],
    contraindicatedForSelfMed: [
      'DILARANG KERAS MEMBERIKAN OBAT MAMPET DIARE (seperti Loperamid / Imodium) pada bayi dan balita karena dapat memicu kelumpuhan usus fatal (Ileus Paralitik)!',
      'JANGAN memberikan antibiotik sendiri tanpa pemeriksaan feses oleh dokter.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Protokol khusus untuk anak balita.',
      pediatricWarning: 'Patuhi dosis zink 10 hari berturut-turut sampai tuntas.',
      geriatricWarning: 'Tidak relevan.'
    },
    whenToSeeDoctor: [
      'Anak tampak sangat lemas, mengantuk terus, dan tidak mau minum.',
      'Mata anak menjadi sangat cekung dan tidak kencing lebih dari 6 jam.',
      'Diare tidak membaik dalam waktu 2 hari.'
    ],
    gemaCermatTips: [
      'Ingat 5 Langkah Tuntaskan Diare Kemenkes RI (LINTAS DIARE): 1. Oralit, 2. Zinc 10 hari, 3. Teruskan ASI/Makan, 4. Antibiotik HANYA atas indikasi dokter, 5. Nasihat ibu/pengasuh.'
    ]
  },
  {
    id: 'swam-ruam-popok-bayi',
    title: 'Ruam Popok pada Bayi (Diaper Rash)',
    category: 'pediatric',
    categoryLabel: 'Kesehatan Anak & Pediatrik',
    iconName: 'Baby',
    quickSummary: 'Kulit bokong, lipat paha, dan area popok bayi tampak kemerahan, lecet, dan perih akibat kelembapan urin/feses dan gesekan popok.',
    laymanKeywords: ['ruam popok', 'pantat bayi merah', 'diaper rash', 'kulit selangkangan lecet bayi'],
    typicalSymptoms: [
      'Kulit area tertutup popok berwarna merah meradang',
      'Bayi menangis atau rewel saat area popok dibersihkan atau diganti',
      'Kulit terasa hangat saat disentuh'
    ],
    redFlags: [
      'Bercak merah meluas disertai bintik-bintik nanah kecil (Pustula)',
      'Ruam sangat merah terang di lipatan kulit dengan bintik satelit (Infeksi Jamur Candida)',
      'Bayi mengalami demam',
      'Ruam melepuh atau kulit terkelupas parah berdarah'
    ],
    maxSelfMedDays: 3,
    recommendedDrugs: [
      {
        genericName: 'Salep Zinc Oxide + Dexpanthenol',
        brandExamples: ['Zwitsal Baby Rash Cream', 'Bepanthen Salep Ruam Popok', 'SudoCream', 'Cussons Baby Diaper Rash'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Oleskan tipis merata pada seluruh area kulit bokong dan lipat paha yang bersih dan kering SETIAP KALI MENGGANTI POPOK.',
        timing: 'Setelah bokong dibersihkan dan dikeringkan.',
        cautionNotes: 'Membentuk lapisan perisai pelindung tahan air (waterproof barrier) dari kontak langsung dengan asam urin dan feses.',
        targetDrugId: 'drug-zinc-oxide'
      }
    ],
    nonPharmacolTherapy: [
      'GANTI POPOK LEBIH SERING (setiap 2-3 jam atau segera setelah bayi BAB).',
      'Bersihkan bokong bayi dengan AIR HANGAT BERSIH dan kapas bulat. Hindari penggunaan tisu basah yang mengandung alkohol atau pewangi yang menyengat.',
      'Keringkan kulit dengan cara DITEPUK-TEPUK LEMBUT menggunakan handuk katun halus, JANGAN DIGOSOK.',
      'Biarkan bokong bayi diangin-anginkan bebas tanpa popok selama 15-30 menit beberapa kali sehari (Diaper-Free Time).',
      'Pilih ukuran popok yang pas, jangan terlalu ketat.'
    ],
    contraindicatedForSelfMed: [
      'JANGAN menaburkan bedak tabur (talcum powder) pada area selangkangan bayi yang lecet karena partikel bedak dapat terhirup ke paru-paru bayi dan memperparah iritasi bila terkena urin.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Khusus untuk bayi dan anak.',
      pediatricWarning: 'Sangat aman digunakan sejak bayi baru lahir (newborn).',
      geriatricWarning: 'Dapat juga digunakan untuk lansia tirah baring yang memakai popok dewasa.'
    },
    whenToSeeDoctor: [
      'Ruam popok tidak membaik setelah 3 hari perawatan mandiri.',
      'Ruam tampak melepuh, bernanah, atau bayi mengalami demam.'
    ]
  },

  // ============================================================================
  // 8. KEBUGARAN & PERJALANAN (MOTION & TRAVEL)
  // ============================================================================
  {
    id: 'swam-mabuk-perjalanan',
    title: 'Mabuk Perjalanan (Motion Sickness: Mobil, Kapal, Pesawat)',
    category: 'motion-fatigue',
    categoryLabel: 'Kebugaran & Perjalanan',
    iconName: 'Compass',
    quickSummary: 'Rasa pusing berputar, mual, keringat dingin, dan muntah saat bepergian akibat ketidaksesuaian sinyal gerak antara mata dan cairan telinga bagian dalam.',
    laymanKeywords: ['mabuk perjalanan', 'mabuk mobil', 'mabuk laut', 'mual perjalanan', 'antimo', 'mual di jalan'],
    typicalSymptoms: [
      'Pusing melayang dan rasa tidak nyaman di perut',
      'Mual dan muntah saat kendaraan melaju atau bergoyang',
      'Keringat dingin dan wajah tampak pucat',
      'Sering menguap dan mengantuk'
    ],
    redFlags: [
      'Muntah terus-menerus hingga lemas parah dan dehidrasi',
      'Pusing berputar hebat (Vertigo) yang menetap berhari-hari setelah perjalanan selesai',
      'Disertai telinga berdenging hebat atau gangguan pendengaran mendadak'
    ],
    maxSelfMedDays: 2,
    recommendedDrugs: [
      {
        genericName: 'Dimenhidrinat 50 mg',
        brandExamples: ['Antimo Tablet', 'Dimenhydrinate OGB'],
        bpomClass: 'Obat Bebas Terbatas (Biru)',
        dosageGuideline: '• Dewasa & Anak > 12 tahun: 1 tablet (50 mg) diminum 30 MENIT SEBELUM BERANGKAT PERJALANAN. Jika perjalanan panjang, dapat diulang tiap 4–6 jam (maksimal 400 mg/hari).\n• Anak 8–12 tahun: 1/2 tablet (25 mg).',
        timing: 'WAJIB DIMINUM 30–60 MENIT SEBELUM MEMULAI PERJALANAN (bukan setelah muntah di jalan).',
        cautionNotes: 'SANGAT MENYEBABKAN KANTUK. DILARANG MENGEMUDIKAN KENDARAAN.',
        targetDrugId: 'drug-dimenhydrinate'
      },
      {
        genericName: 'Permen Jahe / Minyak Aromaterapi Kayu Putih',
        brandExamples: ['Permen Jahe Ting-Ting', 'FreshCare Minyak Angin', 'Aromaterapi Roll-on'],
        bpomClass: 'Obat Bebas (Hijau)',
        dosageGuideline: 'Hisap permen jahe atau hirup aroma minyak angin pada hidung saat mulai terasa mual.',
        timing: 'Selama perjalanan.',
        cautionNotes: 'Jahe terbukti secara klinis menenangkan motilitas lambung dan mengurangi rasa mual.',
        targetDrugId: 'drug-herbal'
      }
    ],
    nonPharmacolTherapy: [
      'PILIH POSISI DUDUK DENGAN GUNCANGAN PALING MINIMAL: Duduk di kursi depan pada mobil/bus, di area sayap pada pesawat, atau di dek tengah pada kapal laut.',
      'Arahkan pandangan ke luar jendela melihat garis cakrawala yang stabil di kejauhan. JANGAN MEMBACA BUKU ATAU BERMAIN SMARTPHONE saat kendaraan melaju.',
      'Pastikan ventilasi udara mengalir segar (buka sedikit jendela atau arahkan AC ke wajah).',
      'Makan makanan ringan sebelum berangkat, jangan bepergian dengan perut yang benar-benar kosong atau terlalu kenyang makanan berlemak.'
    ],
    contraindicatedForSelfMed: [
      'Hindari konsumsi alkohol atau makanan porsi sangat besar sebelum melakukan perjalanan.'
    ],
    specialPopulations: {
      pregnancyWarning: 'Minyak aromaterapi dan permen jahe sangat aman untuk ibu hamil. Dimenhidrinat tergolong Kategori B (cukup aman) bila sangat dibutuhkan.',
      pediatricWarning: 'Gunakan Antimo Anak sediaan sachet cair rasa stroberi (dosis 1 sachet untuk anak usia 2-6 tahun).',
      geriatricWarning: 'Waspadai efek mengantuk dan retensi urin pada lansia.'
    },
    whenToSeeDoctor: [
      'Muntah tidak berhenti berjam-jam setelah perjalanan selesai.',
      'Disertai kelemahan tubuh atau telinga berdenging berat.'
    ]
  }
];

export const SWAMEDIKASI_CATEGORIES = [
  { key: 'all', label: 'Semua Keluhan', icon: 'Sparkles', count: 12 },
  { key: 'pain-fever', label: 'Demam & Nyeri', icon: 'Flame', count: 4 },
  { key: 'digestive', label: 'Saluran Cerna & Maag', icon: 'ShieldAlert', count: 4 },
  { key: 'respiratory', label: 'Flu, Batuk & THT', icon: 'CloudRain', count: 4 },
  { key: 'skin-allergy', label: 'Kulit & Alergi', icon: 'Sparkles', count: 3 },
  { key: 'eye-ear', label: 'Mata & Telinga', icon: 'Eye', count: 1 },
  { key: 'mouth-oral', label: 'Mulut & Sariawan', icon: 'Smile', count: 1 },
  { key: 'pediatric', label: 'Kesehatan Anak (Balita)', icon: 'Baby', count: 2 },
  { key: 'motion-fatigue', label: 'Mabuk & Perjalanan', icon: 'Compass', count: 1 }
];

export function searchSwamedikasiProtocols(query: string): SwamedikasiProtocol[] {
  if (!query || !query.trim()) return SWAMEDIKASI_PROTOCOLS;
  const q = query.toLowerCase().trim();
  return SWAMEDIKASI_PROTOCOLS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.quickSummary.toLowerCase().includes(q) ||
      p.laymanKeywords.some((k) => k.toLowerCase().includes(q)) ||
      p.typicalSymptoms.some((s) => s.toLowerCase().includes(q)) ||
      p.recommendedDrugs.some(
        (d) =>
          d.genericName.toLowerCase().includes(q) ||
          d.brandExamples.some((b) => b.toLowerCase().includes(q))
      )
    );
  });
}

export function getProtocolsByCategory(category: SwamedikasiCategoryKey): SwamedikasiProtocol[] {
  return SWAMEDIKASI_PROTOCOLS.filter((p) => p.category === category);
}

