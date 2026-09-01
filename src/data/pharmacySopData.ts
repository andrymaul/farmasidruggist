export interface PharmacySopItem {
  id: string;
  docNumber: string;
  title: string;
  category: 'logistik' | 'klinis' | 'khusus' | 'safety';
  categoryLabel: string;
  effectiveDate: string;
  revision: string;
  legalBasis: string[];
  purpose: string;
  scope: string;
  policy: string;
  responsiblePersons: string[];
  equipmentNeeded: string[];
  procedureSteps: {
    stepNumber: number;
    title: string;
    description: string;
    keyPoints?: string[];
  }[];
  criticalChecklist: string[];
  relatedForms: string[];
  notes: string;
}

export const PHARMACY_SOP_LIST: PharmacySopItem[] = [
  {
    id: 'sop-skrining-resep',
    docNumber: 'SOP/FAR-KLIN/001/2026',
    title: 'SOP Skrining & Pengkajian Resep Dokter',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'UU No. 17 Tahun 2023 tentang Kesehatan'
    ],
    purpose: 'Memastikan resep dokter memenuhi kelengkapan administratif, kesesuaian farmasetik, dan pertimbangan klinis guna mencegah terjadinya Medication Error dan menjamin keselamatan pasien (Patient Safety).',
    scope: 'Diterapkan pada setiap lembar resep (resep rawat jalan, rawat inap, maupun IGD) yang diterima di Instalasi Farmasi / Apotek.',
    policy: 'Setiap resep wajib dikaji oleh Apoteker yang memiliki STRA & SIPA aktif sebelum obat disiapkan dan diracik.',
    responsiblePersons: ['Apoteker Penanggung Jawab (APA)', 'Apoteker Pendamping (Aping)', 'Tenaga Medis Penulis Resep'],
    equipmentNeeded: ['Lembar resep asli', 'Buku Rekod Konsultasi / CPPT', 'Komputer SIA / Sistem Rekam Medis Elektronik', 'Database Interaksi Obat & MIMS'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerimaan & Verifikasi Administratif',
        description: 'Periksa kelengkapan format administratif resep dokter:',
        keyPoints: [
          'Nama, SIP, alamat, dan nomor kontak dokter penulis resep.',
          'Tanggal penulisan resep dan tanda tangan/paraf dokter.',
          'Identitas pasien: Nama lengkap, Nomor Rekam Medis (RM), Tanggal Lahir/Usia, Jenis Kelamin, dan Berat Badan (khusus pasien anak/pediatrik).',
          'Tanda R/ (superscriptio) pada tiap nama obat yang diresepkan.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Kajian Kesesuaian Farmasetik',
        description: 'Lakukan verifikasi kelayakan bentuk dan formula obat:',
        keyPoints: [
          'Nama obat generic / merk dagang, bentuk sediaan (tablet, sirup, salep, tetes, injeksi).',
          'Kekuatan sediaan (misal: Paracetamol 120mg/5mL atau 500mg tablet).',
          'Jumlah obat yang diminta dan aturan pemakaian (signa) yang jelas (frekuensi, waktu minum, dan durasi terapi).',
          'Stabilitas dan kompatibilitas fisikokimia (khusus sediaan racikan campur).'
        ]
      },
      {
        stepNumber: 3,
        title: 'Kajian Pertimbangan Klinis Komprehensif',
        description: 'Lakukan penapisan interaksi dan kesesuaian kondisi fisiologis pasien:',
        keyPoints: [
          'Ketepatan indikasi, dosis, dan durasi pengobatan.',
          'Ada tidaknya duplikasi terapi (misal 2 obat NSAID atau 2 obat PPI sekaligus).',
          'Pemeriksaan riwayat alergi obat pasien.',
          'Penapisan interaksi obat-obat (DDI) tingkat Major / Kontraindikasi dan interaksi obat-makanan.',
          'Penyesuaian dosis terhadap fungsi ginjal (CrCl/eGFR) atau hepar.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Konfirmasi & Rekonsiliasi Klinis dengan Dokter',
        description: 'Bila ditemukan keraguan, ketidaksesuaian dosis, duplikasi berbahaya, atau resep tidak terbaca, hubungi dokter penulis resep melalui metode SBAR (Situation, Background, Assessment, Recommendation) dan catat hasil konfirmasi pada lembar resep.'
      }
    ],
    criticalChecklist: [
      'Apakah berat badan anak sudah tertulis dan dosis terkonfirmasi aman?',
      'Apakah ada interaksi obat derajat Major yang belum disesuaikan?',
      'Apakah paraf pengkaji resep (Apoteker) sudah dibubuhkan?'
    ],
    relatedForms: ['Formulir Skrining Resep', 'Buku Catatan Konfirmasi Resep Dokter', 'Form Rekonsiliasi Obat'],
    notes: 'Jika dokter tidak dapat dihubungi dan kondisi darurat, berikan dosis minimal lazim atau tunda penyerahan bagian obat yang bermasalah dengan persetujuan pasien.'
  },
  {
    id: 'sop-high-alert-lasa',
    docNumber: 'SOP/FAR-LOG/002/2026',
    title: 'SOP Pengelolaan Obat High Alert & LASA / NORUM',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 11 Tahun 2017 tentang Keselamatan Pasien',
      'Standar Nasional Akreditasi Rumah Sakit (SNARS / STARKES)',
      'ISMP (Institute for Safe Medication Practices) High-Alert Medication Guidelines'
    ],
    purpose: 'Mencegah terjadinya kekeliruan fatal dalam penyimpanan, peresepan, penyiapan, dan pemberian obat yang berisiko tinggi memicu cedera serius atau kematian pasien.',
    scope: 'Berlaku di seluruh ruang Instalasi Farmasi, Gudang Farmasi, Ruang Rawat Inap, ICU/ICCU, Kamar Operasi, dan IGD.',
    policy: 'Semua obat kategori High Alert dan LASA (Look-Alike Sound-Alike / NORUM) harus diberi stiker penanda khusus, disimpan terpisah, dan melalui verifikasi ganda (Independent Double Check).',
    responsiblePersons: ['Apoteker Penanggung Jawab', 'Tenaga Vokasi Farmasi (TTK)', 'Perawat Ruangan', 'Dokter Penanggung Jawab Pasien (DPJP)'],
    equipmentNeeded: ['Stiker Merah HIGH ALERT', 'Stiker Kuning / Hijau LASA/NORUM', 'Label Tall Man Lettering', 'Lemari berkunci khusus elektrolit konsentrat'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Identifikasi & Penetapan Daftar Obat High Alert & LASA',
        description: 'Susun dan perbarui daftar obat High Alert meliputi elektrolit pekat (KCl 7.46%, NaCl 3%, Dextrose 40%), obat sitostatika, antikoagulan (Heparin, Warfarin), anestetik umum/sedatif kuat, insulin, dan agonis adrenergik (Epinephrine, Norepinephrine).'
      },
      {
        stepNumber: 2,
        title: 'Pemberian Label & Penulisan Tall Man Lettering',
        description: 'Terapkan teknik penulisan huruf kapital berbeda untuk obat berkemasan atau berbunyi mirip:',
        keyPoints: [
          'Contoh: efeDRIN vs epiNEFRIN, hidrOXYZIN vs hidrALAZIN, DOPAmine vs DOBUTamine.',
          'Tempelkan stiker segitiga kuning "LASA" pada rak obat dan kemasan sekunder.',
          'Tempelkan stiker merah berpendar bertuliskan "HIGH ALERT" pada setiap ampul/vial elektrolit pekat dan sitostatika.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Pemisahan Lokasi Penyimpanan',
        description: 'Jangan pernah meletakkan dua obat LASA secara berdampingan di rak yang sama; selingi dengan obat lain yang berlainan kemasan dan warna.'
      },
      {
        stepNumber: 4,
        title: 'Verifikasi Ganda Mandiri (Independent Double Check)',
        description: 'Sebelum obat diserahkan atau diinjeksikan, 2 petugas kesehatan berbeda (Apoteker/TTK/Perawat) wajib memverifikasi secara terpisah 5 Benar: Benar Pasien, Benar Obat, Benar Dosis, Benar Rute, dan Benar Waktu.'
      }
    ],
    criticalChecklist: [
      'Apakah elektrolit pekat (KCl 7.46% & NaCl 3%) tidak disimpan di ruang rawat umum?',
      'Apakah stiker HIGH ALERT telah terpasang pada vial/ampul?',
      'Apakah double check telah ditandatangani oleh 2 petugas berbeda?'
    ],
    relatedForms: ['Daftar Obat High Alert Resmi Fasilitas', 'Checklist Double Check High Alert', 'Laporan Insiden Medication Error'],
    notes: 'KCl 7.46% injeksi HARUS diencerkan dalam cairan infus sebelum diberikan dan TIDAK BOLEH diinjeksikan langsung bolus IV.'
  },
  {
    id: 'sop-narkotika-psikotropika',
    docNumber: 'SOP/FAR-REG/003/2026',
    title: 'SOP Pengelolaan Narkotika, Psikotropika & Prekursor Farmasi',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '04',
    legalBasis: [
      'UU RI No. 35 Tahun 2009 tentang Narkotika',
      'UU RI No. 5 Tahun 1997 tentang Psikotropika',
      'PP RI No. 44 Tahun 2010 tentang Prekursor',
      'PerBPOM No. 24 Tahun 2021 tentang Pengawasan Pengelolaan Obat Narkotika, Psikotropika, dan Prekursor Farmasi'
    ],
    purpose: 'Menjamin ketersediaan obat untuk pelayanan medis sekaligus mencegah penyalahgunaan (abuse), diversi ilegal, dan kebocoran rantai distribusi narkotika dan psikotropika.',
    scope: 'Gudang farmasi, ruang peracikan, dan depo rawat inap/IGD.',
    policy: 'Narkotika dan Psikotropika wajib disimpan di lemari khusus dengan kunci ganda (double lock), hanya dilayani dengan resep asli dokter yang sah, serta dicatat dalam kartu stok dan dilaporkan ke SIPNAP BPOM.',
    responsiblePersons: ['Apoteker Penanggung Jawab (APA/Kainst)', 'Apoteker yang Diberi Kuasa Kunci'],
    equipmentNeeded: ['Lemari Kayu/Besi Terpasang Mati di Dinding/Lantai berukuran minimal 40x80x100 cm', 'Kunci Ganda berbeda anak kunci', 'Buku Register Narkotika/Psikotropika', 'Sistem SIPNAP'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Pengadaan Resmi (Surat Pesanan Khusus)',
        description: 'Gunakan Surat Pesanan (SP) Narkotika format khusus 4 rangkap (1 SP hanya untuk 1 jenis obat). SP Psikotropika & Prekursor terpisah ditandatangani langsung oleh Apoteker Penanggung Jawab dengan mencantumkan nomor SIPA dan stempel resmi apotek/RS.'
      },
      {
        stepNumber: 2,
        title: 'Penerimaan & Penyimpanan Lemari Khusus',
        description: 'Barang diterima langsung oleh Apoteker Penanggung Jawab, dicek nomor batch dan tanggal kadaluarsa, lalu seketika disimpan di Lemari Khusus Narkotika:',
        keyPoints: [
          'Lemari terbuat dari bahan kuat, tidak mudah dipindahkan (terbaut pada dinding/lantai).',
          'Memiliki 2 pintu dengan kunci berbeda (kunci dipegang oleh 2 orang berbeda atau disimpan di brankas tersembunyi).',
          'Dilarang menyimpan barang selain sediaan farmasi narkotika/psikotropika.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Pelayanan Resep & Pencatatan Realtime',
        description: 'Hanya melayani resep asli (bukan salinan resep/copy resep jika obat belum pernah diambil sama sekali). Lakukan pencatatan mutasi pada Kartu Stok dan Buku Register (tanggal, nama pasien, alamat, nama dokter, jumlah masuk/keluar, sisa).'
      },
      {
        stepNumber: 4,
        title: 'Pelaporan SIPNAP Elektronik Bulanan',
        description: 'Apoteker wajib menyusun dan mengirimkan Laporan Narkotika & Psikotropika melalui sistem online SIPNAP (Kemenkes) selambat-lambatnya tanggal 10 setiap bulannya.'
      }
    ],
    criticalChecklist: [
      'Apakah lemari khusus dalam kondisi terkunci dan anak kunci dipegang Apoteker?',
      'Apakah resep narkotika dipisahkan dan digarisbawahi tinta merah?',
      'Apakah laporan SIPNAP bulan lalu telah berstatus TERKIRIM?'
    ],
    relatedForms: ['Surat Pesanan Narkotika/Psikotropika', 'Buku Register Harian Narkotika', 'Tanda Terima Laporan SIPNAP', 'Berita Acara Pemusnahan Narkotika'],
    notes: 'Resep yang mengandung Narkotika TIDAK BOLEH diulang (iter) tanpa resep baru dari dokter.'
  },
  {
    id: 'sop-peracikan-nonsteril',
    docNumber: 'SOP/FAR-KLIN/004/2026',
    title: 'SOP Penyiapan, Peracikan Sediaan Non-Steril & Penetapan Beyond-Use-Date (BUD)',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'USP <795> Pharmaceutical Compounding - Nonsterile Preparations',
      'Permenkes RI No. 73 Tahun 2016',
      'Farmakope Indonesia Edisi VI (2020)'
    ],
    purpose: 'Menghasilkan sediaan obat racikan (pulveres, kapsul, sirup kering, salep/krim) yang homogen, stabil secara farmasetik, bebas kontaminasi, serta memiliki tanggal kedaluwarsa racikan (BUD) yang tepat.',
    scope: 'Ruang peracikan obat non-steril di Apotek, Klinik, dan Rumah Sakit.',
    policy: 'Peracikan obat wajib menerapkan prinsip Good Compounding Practices (GCP), memakai APD lengkap, dan mencantumkan Beyond-Use-Date (BUD) pada etiket obat.',
    responsiblePersons: ['Apoteker', 'Tenaga Vokasi Farmasi (TTK) Racik'],
    equipmentNeeded: ['Lumpang & Alu Keramik/Kaca Bersih', 'Kertas Perkamen / Cangkang Kapsul', 'Sendok Tanduk / Spatula', 'Alat Sealer Puyer', 'Timbangan Digital Tera Kalibrasi', 'Sarung tangan, Masker, Hairnet'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Higiene Petugas & Sanitasi Ruang Racik',
        description: 'Cuci tangan 6 langkah, kenakan jas laboratorium bersih, masker medis, hairnet, dan sarung tangan lateks/nitril bersih sebelum menyentuh bahan obat.'
      },
      {
        stepNumber: 2,
        title: 'Pembersihan & Kalibrasi Alat Racik',
        description: 'Bersihkan mortir dan alu dengan alkohol 70% dan keringkan dengan tisu bebas serat. Pastikan timbangan digital menunjukkan angka 0.000 g.'
      },
      {
        stepNumber: 3,
        title: 'Perhitungan & Penggerusan Bahan Obat',
        description: 'Hitung kebutuhan bahan obat secara teliti. Gerus bahan obat dari dosis terkecil / serbuk teringan secara homogen (metode pengenceran geometris). Bagi serbuk secara visual merata pada kertas perkamen atau bungkus menggunakan mesin sealer.'
      },
      {
        stepNumber: 4,
        title: 'Penetapan Beyond-Use-Date (BUD) Standar USP <795>',
        description: 'Tentukan masa kedaluwarsa racikan berdasarkan sifat sediaan:',
        keyPoints: [
          'Sediaan Padat Non-Aqueous (Puyer / Kapsul): Maksimal 6 bulan atau 25% dari sisa waktu ED bahan baku (pilih yang lebih singkat).',
          'Sediaan Cair Oral Mengandung Air (Sirup Kering terlarut): Maksimal 14 hari bila disimpan di kulkas (suhu 2-8°C).',
          'Sediaan Topikal Mengandung Air (Krim / Losio / Gel): Maksimal 30 hari pada suhu ruang terkendali (15-25°C).'
        ]
      }
    ],
    criticalChecklist: [
      'Apakah alat mortir & stamper telah disanitasi sebelum meracik obat berikutnya?',
      'Apakah BUD tertulis jelas pada etiket putih sediaan racikan?',
      'Apakah sediaan puyer tertutup rapat dan kedap udara?'
    ],
    relatedForms: ['Logbook Peracikan Obat', 'Lembar Kerja Racikan Farmasi (Worksheet)', 'Kartu Kontrol Suhu Ruang Racik'],
    notes: 'Jangan pernah mencampur sediaan krim berbasis minyak dengan gel berbasis air tanpa emulgator yang sesuai.'
  },
  {
    id: 'sop-konseling-pio',
    docNumber: 'SOP/FAR-KLIN/005/2026',
    title: 'SOP Pelayanan Informasi Obat (PIO) & Konseling Pasien Farmasi',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
      'Petunjuk Teknis Standar Pelayanan Kefarmasian Kemenkes RI'
    ],
    purpose: 'Meningkatkan kepatuhan pasien (adherence), mencegah komplikasi obat, serta memastikan pasien dan keluarga memahami tujuan, cara pakai, dan hal yang harus dihindari selama pengobatan.',
    scope: 'Ruang Konseling Khusus Apotek / Rawat Jalan / Bed Pasien Rawat Inap.',
    policy: 'Konseling wajib diberikan kepada pasien risiko tinggi: pasien polifarmasi (≥ 5 jenis obat), geriatri/pediatrik, penyakit kronis (DM, Hipertensi, Asma, TB, HIV), obat indeks terapi sempit (Digoxin, Warfarin, Fenitoin), serta sediaan khusus (Inhaler, Insulin Pen, Suppositoria, Tetes Mata).',
    responsiblePersons: ['Apoteker Penanggung Jawab', 'Apoteker Pelayanan Konseling'],
    equipmentNeeded: ['Ruang Konseling Tenang & Privat', 'Dummy Sediaan Khusus (Inhaler, Insulin Pen, Suppositoria)', 'Brosur & Lembar Informasi Obat (LIO)', 'Buku Dokumentasi Konseling'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Membangun Hubungan & Verifikasi Identitas Pasien',
        description: 'Sambut pasien dengan ramah, perkenalkan diri sebagai Apoteker, dan konfirmasi minimal 2 identitas pasien (Nama dan Tanggal Lahir/No RM).'
      },
      {
        stepNumber: 2,
        title: 'Penerapan Metode Three Prime Questions',
        description: 'Gali pemahaman awal pasien mengenai obatnya:',
        keyPoints: [
          '1. "Apa yang telah dokter sampaikan mengenai kegunaan dan harapan dari pengobatan ini?"',
          '2. "Bagaimana cara minum dan aturan pakai obat yang dijelaskan oleh dokter?"',
          '3. "Apa saja hasil atau efek yang diharapkan setelah mengonsumsi obat ini?"'
        ]
      },
      {
        stepNumber: 3,
        title: 'Penjelasan Obat & Demonstrasi Alat Sediaan Khusus',
        description: 'Jelaskan indikasi, dosis, frekuensi, hubungan dengan makanan (sebelum/sesudah makan), efek samping umum dan cara mengatasinya. Demonstrasikan teknik penggunaan alat khusus (inhaler MDI/DPI atau pen insulin).'
      },
      {
        stepNumber: 4,
        title: 'Metode Verifikasi Pemahaman (Show-and-Tell / Teach-Back)',
        description: 'Minta pasien atau keluarga untuk mengulangi kembali aturan pakai atau mempraktikkan cara penggunaan alat khusus untuk memastikan tidak ada miskomunikasi.'
      },
      {
        stepNumber: 5,
        title: 'Dokumentasi Konseling',
        description: 'Catat poin-poin konseling, respon pasien, dan tanggal konseling pada formulir dokumentasi konseling farmasi.'
      }
    ],
    criticalChecklist: [
      'Apakah pasien telah memahami cara menyimpan obat (misal insulin yang belum dipakai di kulkas 2-8°C)?',
      'Apakah pasien mampu memperagakan ulang teknik penggunaan inhaler/insulin pen?',
      'Apakah formulir konseling telah ditandatangani oleh pasien dan Apoteker?'
    ],
    relatedForms: ['Formulir Dokumentasi Konseling Farmasi', 'Kartu Pasien Penyakit Kronis', 'Lembar Edukasi Pasien'],
    notes: 'Konseling dilakukan dalam suasana empati, mendengar aktif, dan menjaga kerahasiaan rekam medis pasien.'
  },
  {
    id: 'sop-cold-chain-vaccine',
    docNumber: 'SOP/FAR-LOG/006/2026',
    title: 'SOP Pengelolaan Rantai Dingin Obat & Vaksin (Cold Chain Management)',
    category: 'logistik',
    categoryLabel: 'Pengelolaan Logistik & Penyimpanan',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 12 Tahun 2017 tentang Penyelenggaraan Imunisasi',
      'Pedoman Teknis CDOB BPOM tentang Pengelolaan Produk Rantai Dingin (Cold Chain Products)',
      'WHO Guidelines on the International Packaging and Transportation of Vaccines'
    ],
    purpose: 'Menjaga potensi, stabilitas kimia, dan efikasi imunogenik vaksin serta obat termolabil (Insulin, Oksitosin, Albumin, Faktor Koagulasi) sejak diterima hingga diberikan kepada pasien.',
    scope: 'Gudang Farmasi, Ruang Imunisasi, Poli Vaksinasi, dan Ruang Bersalin.',
    policy: 'Suhu chiller wajib dipertahankan secara stabil pada rentang +2°C hingga +8°C dan dipantau minimal 2 kali sehari (pagi dan sore).',
    responsiblePersons: ['Apoteker Penanggung Jawab Cold Chain', 'Petugas Pengelola Vaksin / TTK'],
    equipmentNeeded: ['Kulkas Khusus Medis (Pharmaceutical Refrigerator / Ice Lined Refrigerator)', 'Termometer Digital Terkalibrasi / Data Logger', 'Freeze Tag / VVM (Vaccine Vial Monitor)', 'Vaccine Carrier & Cool Pack / Ice Pack', 'Kartu Kontrol Suhu Chiller Harian'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerimaan Produk Rantai Dingin',
        description: 'Segera periksa suhu cool box pengiriman dengan termometer inframerah (harus 2-8°C), kondisi ice pack, dan status VVM (Vaccine Vial Monitor kondisi A atau B). Catat waktu penerimaan dan langsung masukkan ke chiller.'
      },
      {
        stepNumber: 2,
        title: 'Penataan Produk di Dalam Kulkas Medis',
        description: 'Tata letak obat dan vaksin sesuai sensitivitas suhu:',
        keyPoints: [
          'Vaksin sensitif beku (Hepatitis B, DPT-HB-Hib, TT, DT, IPV) diletakkan di rak tengah/bawah (jauh dari evaporator/dinding pendingin).',
          'Vaksin sensitif panas (Polio OPV, BCG, Campak/MR) diletakkan di rak atas.',
          'Beri jarak minimal 2-5 cm antar boks agar sirkulasi udara dingin lancar.',
          'DILARANG meletakkan obat/makanan/minuman di pintu kulkas karena suhu pintu tidak stabil.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Pemantauan & Pencatatan Suhu Rutin',
        description: 'Baca dan catat suhu kulkas dua kali sehari (pukul 08.00 pagi dan 16.00 sore) pada grafik kartu kontrol suhu. Jika suhu berada di luar rentang 2-8°C, lakukan tindakan korektif darurat.'
      },
      {
        stepNumber: 4,
        title: 'Prosedur Darurat Pemadaman Listrik (Contingency Plan)',
        description: 'Jangan buka pintu kulkas. Jika pemadaman > 2 jam, pindahkan vaksin ke dalam Vaccine Carrier yang telah diisi Cold Pack dingin (bukan es batu beku langsung) dan hubungi teknisi genset.'
      }
    ],
    criticalChecklist: [
      'Apakah suhu chiller tercatat pagi dan sore di kartu suhu?',
      'Apakah vaksin sensitif beku (DPT/Hep B) bebas dari kristal es?',
      'Apakah ada botol air (ballast) di bagian bawah kulkas untuk menstabilkan suhu?'
    ],
    relatedForms: ['Kartu Pemantauan Suhu Kulkas 2-8°C', 'Logbook Pemeliharaan & Kalibrasi Kulkas', 'Berita Acara Kerusakan Vaksin'],
    notes: 'Lakukan Shake Test (Uji Kocok) jika dicurigai vaksin sensitif beku pernah membeku sebelum dinyatakan rusak.'
  },
  {
    id: 'sop-penarikan-obat-recall',
    docNumber: 'SOP/FAR-LOG/007/2026',
    title: 'SOP Penarikan Kembali Obat (Recall) & Karantina Obat Rusak/ED',
    category: 'logistik',
    categoryLabel: 'Pengelolaan Logistik & Penyimpanan',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'PerBPOM No. 14 Tahun 2019 tentang Penarikan dan Pemusnahan Obat yang Tidak Memenuhi Standar',
      'Permenkes RI No. 73 Tahun 2016'
    ],
    purpose: 'Menghentikan peredaran dan menarik secara cepat obat yang mengalami cacat mutu, tercemar, ditarik oleh BPOM/Produsen, atau mendekati kedaluwarsa guna melindungi keselamatan masyarakat.',
    scope: 'Gudang farmasi, ruang dispensing, dan seluruh unit pelayanan obat.',
    policy: 'Obat yang ditarik (recall) atau kadaluarsa wajib segera dikarantina di area khusus terpisah bersegel "DILARANG DIJUAL / DIGUNAKAN".',
    responsiblePersons: ['Apoteker Penanggung Jawab', 'Petugas Gudang Farmasi'],
    equipmentNeeded: ['Ruang / Lemari Karantina Terkunci Bersegel Merah', 'Label "OBAT RUSAK / KADALUARSA / RECALL"', 'Formulir Berita Acara Karantina & Retur PBF'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerimaan Surat Perintah Penarikan (Recall Notice)',
        description: 'Terima dan telaah surat resmi penarikan dari BPOM RI atau Pedagang Besar Farmasi (PBF) produsen mengenai nomor batch obat yang ditarik.'
      },
      {
        stepNumber: 2,
        title: 'Penelusuran Stok & Penghentian Penjualan',
        description: 'Lakukan inventarisasi cepat ke seluruh rak obat, depo, dan troli emergency untuk mengumpulkan semua obat dengan nomor batch terkait dalam waktu maksimal 1x24 jam.'
      },
      {
        stepNumber: 3,
        title: 'Karantina Fisik & Pencatatan',
        description: 'Pindahkan obat ke lemari karantina terkunci, beri label "OBAT RECALL - JANGAN DILAYANI", catat jumlah fisik pada Buku Retur, dan kunci aksesnya.'
      },
      {
        stepNumber: 4,
        title: 'Pengembalian (Retur) ke PBF atau Pemusnahan',
        description: 'Kirimkan kembali obat kepada PBF distributor resmi dengan melampirkan Surat Pengantar Retur dan Berita Acara Serah Terima, atau proses pemusnahan resmi.'
      }
    ],
    criticalChecklist: [
      'Apakah seluruh batch recall telah diisolasi dari rak pelayanan dalam 24 jam?',
      'Apakah lemari karantina dalam keadaan terkunci?',
      'Apakah berita acara retur ditandatangani oleh kurir PBF dan Apoteker?'
    ],
    relatedForms: ['Formulir Penarikan Obat (Recall Form)', 'Berita Acara Retur Obat', 'Surat Perintah Recall BPOM'],
    notes: 'Obat mendekati ED (3-6 bulan sebelum tanggal kedaluwarsa) dipindahkan ke rak khusus promo/retur sesuai perjanjian PBF.'
  },
  {
    id: 'sop-medication-error-meso',
    docNumber: 'SOP/FAR-SAF/008/2026',
    title: 'SOP Penanganan Medication Error, KNC, KTD & Monitoring Efek Samping Obat (MESO)',
    category: 'safety',
    categoryLabel: 'Keamanan Pasien & Quality Assurance',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 11 Tahun 2017 tentang Keselamatan Pasien',
      'Pedoman Monitoring Efek Samping Obat (MESO) Nasional BPOM RI',
      'Permenkes RI No. 72 Tahun 2016'
    ],
    purpose: 'Mendeteksi, melaporkan, menanggulangi, dan mengevaluasi insiden kesalahan obat (Medication Error) serta reaksi efek samping obat yang merugikan (Adverse Drug Reactions) untuk perbaikan sistem berkelanjutan (*No Blame Culture*).',
    scope: 'Seluruh unit pelayanan farmasi, rawat inap, rawat jalan, dan komite mutu/keselamatan pasien.',
    policy: 'Setiap insiden kesalahan obat (KNC/KTC/KTD/Sentinel) wajib dilaporkan dalam waktu maksimal 2x24 jam ke Tim Keselamatan Pasien dan dievaluasi dengan metode RCA (Root Cause Analysis). Efek samping berat dilaporkan ke BPOM dengan Form Kuning MESO.',
    responsiblePersons: ['Apoteker Klinis', 'Ketua Tim Mutu & Keselamatan Pasien', 'Dokter Penanggung Jawab Pasien'],
    equipmentNeeded: ['Formulir Laporan Insiden Keselamatan Pasien (IKP)', 'Formulir Kuning MESO BPOM RI', 'Algoritma Naranjo ADR Probability Scale'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penanganan Awal Pasien & Mitigasi Bahaya',
        description: 'Jika terjadi kesalahan pemberian obat atau reaksi efek samping berat (anafilaksis, ruam SJS, aritmia), hentikan obat seketika, laporkan kepada dokter jaga/DPJP, dan berikan tatalaksana suportif gawat darurat.'
      },
      {
        stepNumber: 2,
        title: 'Pengisian Formulir Laporan Insiden (IKP)',
        description: 'Petugas yang pertama kali mengetahui insiden mengisi Formulir Laporan Insiden Keselamatan Pasien secara objektif, kronologis, dan tanpa mencantumkan opini pribadi atau menyalahkan individu.'
      },
      {
        stepNumber: 3,
        title: 'Analisis Probabilitas Reaksi Obat (Algoritma Naranjo)',
        description: 'Apoteker melakukan evaluasi kausalitas efek samping obat menggunakan Skala Naranjo (Definite, Probable, Possible, Doubtful).'
      },
      {
        stepNumber: 4,
        title: 'Investigasi Sederhana & Root Cause Analysis (RCA)',
        description: 'Tim Farmasi dan Komite Keselamatan Pasien melakukan investigasi akar masalah sistemik (beban kerja, pencahayaan, kemasan mirip, komunikasi resep) dan menetapkan tindakan pencegahan (Corrective & Preventive Action / CAPA).'
      },
      {
        stepNumber: 5,
        title: 'Pelaporan ke Pusat MESO Nasional BPOM',
        description: 'Kirimkan data Kejadian Tidak Diinginkan (KTD) farmakovigilans melalui sistem elektronik e-MESO BPOM atau formulir kuning.'
      }
    ],
    criticalChecklist: [
      'Apakah laporan insiden diserahkan dalam kurun waktu < 48 jam?',
      'Apakah evaluasi kausalitas Naranjo telah dihitung?',
      'Apakah tindakan perbaikan sistem (CAPA) telah didokumentasikan?'
    ],
    relatedForms: ['Formulir Laporan Insiden Keselamatan Pasien (IKP)', 'Formulir Kuning MESO BPOM', 'Tabel Penilaian Kausalitas Naranjo', 'Lembar CAPA Mutu'],
    notes: 'Prinsip utama investigasi medication error adalah memperbaiki sistem keselamatan (system-based solution), bukan menghukum individu (no-blame culture).'
  },
  {
    id: 'sop-rekonsiliasi-obat',
    docNumber: 'SOP/FAR-KLIN/009/2026',
    title: 'SOP Rekonsiliasi Obat Saat Pasien Masuk, Transfer Antar Ruangan, dan Pulang (Discharge)',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Permenkes RI No. 11 Tahun 2017 tentang Keselamatan Pasien',
      'Standar Akreditasi Rumah Sakit (STARKES KARS 2022 - Sasaran Keselamatan Pasien SKP 2 & PKPO)'
    ],
    purpose: 'Memastikan kesinambungan terapi obat (continuity of care), mencegah diskrepansi yang tidak disengaja (unintended discrepancies seperti kelupaan obat rutin, duplikasi terapi, dan salah dosis), serta mendokumentasikan riwayat penggunaan obat pasien saat admisi, perpindahan ruangan, dan kepulangan.',
    scope: 'Seluruh pasien rawat inap yang masuk melalui IGD, Poli Rawat Jalan, kamar operasi, ICU/ICCU, hingga pasien pulang.',
    policy: 'Setiap pasien baru rawat inap wajib dilakukan rekonsiliasi obat oleh Apoteker dalam waktu maksimal 1x24 jam sejak admisi dan diverifikasi saat transfer antar unit serta saat discharge.',
    responsiblePersons: ['Apoteker Klinis', 'Dokter Penanggung Jawab Pasien (DPJP)', 'Perawat Ruangan'],
    equipmentNeeded: ['Formulir Rekonsiliasi Obat Masuk/Transfer/Pulang', 'Buku/Kantong Obat Bawaan Pasien', 'Rekam Medis Elektronik (RME) / CPPT'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Wawancara Riwayat Obat Saat Pasien Masuk (Admission Reconciliation)',
        description: 'Apoteker melakukan wawancara komprehensif kepada pasien atau keluarga dalam kurun waktu 24 jam pertama admisi:',
        keyPoints: [
          'Gali seluruh obat yang dikonsumsi 1-3 bulan terakhir: obat resep rutin, obat bebas (OTC), obat herbal/jamu, vitamin, dan suplemen.',
          'Catat nama obat, bentuk, kekuatan sediaan, dosis aktual, frekuensi minum, dan rute pemberian.',
          'Periksa riwayat alergi obat dan deskripsi manifestasi klinis reaksi alergi masa lalu.',
          'Amankan obat bawaan dari rumah dengan mengisi Formulir Serah Terima Obat Bawaan Pasien.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Komparasi & Identifikasi Diskrepansi dengan Instruksi Pengobatan Baru',
        description: 'Bandingkan daftar obat riwayat pasien dengan resep/instruksi pengobatan baru yang ditulis DPJP di lembar instruksi medis/CPPT. Identifikasi diskrepansi:',
        keyPoints: [
          'Omission: Obat rutin pasien yang terlewat tidak diresepkan kembali tanpa alasan klinis jelas.',
          'Commission: Obat yang tidak sengaja teresepkan ganda atau terjadi duplikasi terapi.',
          'Dosing discrepancy: Perbedaan dosis atau frekuensi tanpa pertimbangan klinis tertulis.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Klarifikasi & Rekonsiliasi dengan Dokter (DPJP)',
        description: 'Jika ditemukan diskrepansi yang belum terdokumentasi alasannya, Apoteker segera berdiskusi dengan DPJP untuk mengonfirmasi apakah obat lama dilanjutkan, dihentikan sementara (hold), diganti substitusinya, atau dihentikan permanen (discontinue).'
      },
      {
        stepNumber: 4,
        title: 'Rekonsiliasi Transfer Antar Ruangan',
        description: 'Saat pasien pindah ruangan (misal dari ICU ke Bangsal Umum atau dari IGD ke Rawat Inap), verifikasi kembali daftar obat aktif yang masih berjalan, obat yang distop, dan obat baru untuk mencegah kelalaian penulisan ulang.'
      },
      {
        stepNumber: 5,
        title: 'Rekonsiliasi Pemulangan Pasien (Discharge Reconciliation)',
        description: 'Saat pasien dinyatakan boleh pulang, susun Daftar Obat Pulang Terpadu. Bandingkan obat sebelum rawat inap dengan obat pulang, berikan edukasi mana obat lama yang boleh diteruskan dan mana yang HARUS DISETOP agar pasien tidak minum dobel di rumah.'
      }
    ],
    criticalChecklist: [
      'Apakah rekonsiliasi obat masuk diselesaikan dalam kurun waktu < 24 jam pertama?',
      'Apakah seluruh diskrepansi telah diklarifikasi dan disetujui DPJP?',
      'Apakah lembar instruksi obat pulang telah diserahkan dan dijelaskan kepada pasien?'
    ],
    relatedForms: ['Formulir Rekonsiliasi Obat Terpadu (Admisi/Transfer/Discharge)', 'Formulir Serah Terima Obat Bawaan Pasien', 'Lembar Catatan Perkembangan Pasien Terintegrasi (CPPT)'],
    notes: 'Pasien geriatri dengan polifarmasi (≥ 5 obat) dan pasien penyakit kronis merupakan prioritas utama rekonsiliasi obat.'
  },
  {
    id: 'sop-pemusnahan-obat-resep',
    docNumber: 'SOP/FAR-LOG/010/2026',
    title: 'SOP Pemusnahan Obat Kedaluwarsa/Rusak dan Pemusnahan Arsip Resep Farmasi',
    category: 'logistik',
    categoryLabel: 'Pengelolaan Logistik & Penyimpanan',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'UU No. 17 Tahun 2023 tentang Kesehatan',
      'Permenkes RI No. 73 Tahun 2016 (Pasal 8 tentang Pemusnahan Sediaan Farmasi dan Resep)',
      'PerBPOM No. 14 Tahun 2019 tentang Penarikan dan Pemusnahan Obat',
      'Permen LHK No. P.56/MENLHK-SETJEN/2015 tentang Tata Cara Pengelolaan Limbah B3 Fasyankes'
    ],
    purpose: 'Melakukan pemusnahan sediaan farmasi yang rusak/kadaluarsa serta arsip resep yang telah melampaui masa simpan 5 (lima) tahun secara legal, aman lingkungan, terhindar dari penyalahgunaan/daur ulang ilegal, dan sesuai ketentuan peraturan perundang-undangan.',
    scope: 'Gudang Farmasi, Ruang Arsip Resep, dan Unit Pengolahan Limbah Medis B3.',
    policy: 'Pemusnahan obat dan resep wajib dipimpin langsung oleh Apoteker Penanggung Jawab, disaksikan oleh petugas Dinas Kesehatan Kabupaten/Kota dan/atau Balai Besar POM, serta dibuatkan Berita Acara Pemusnahan.',
    responsiblePersons: ['Apoteker Penanggung Jawab (APA)', 'Saksi Petugas Dinkes Kab/Kota', 'Saksi Petugas Balai POM', 'Pihak Ketiga Pengolah Limbah B3 Berizin (Transporter/Incinerator)'],
    equipmentNeeded: ['Area Karantina Terkunci', 'Wadah Limbah B3 Medis', 'Alat Penghancur Kertas (Shredder)', 'Formulir Berita Acara Pemusnahan Sediaan Farmasi', 'Formulir Berita Acara Pemusnahan Resep'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Inventarisasi & Pemisahan Fisik Barang',
        description: 'Kumpulkan dan verifikasi seluruh obat kadaluarsa/rusak dari lemari karantina. Buat daftar inventaris rinci memuat: Nama obat, Bentuk sediaan, Kekuatan, Nomor batch, Tanggal ED, Jumlah fisik, dan Nama produsen/PBF.'
      },
      {
        stepNumber: 2,
        title: 'Pengelompokan & Seleksi Arsip Resep (> 5 Tahun)',
        description: 'Resep yang telah disimpan lebih dari 5 (lima) tahun ditimbang atau dihitung jumlah bundelnya. Pisahkan resep narkotika/psikotropika untuk pencatatan khusus.'
      },
      {
        stepNumber: 3,
        title: 'Pemberitahuan & Koordinasi Saksi Resmi',
        description: 'Kirimkan surat permohonan saksi pemusnahan kepada Dinas Kesehatan Kabupaten/Kota dan Balai Besar POM setempat minimal 14 hari sebelum jadwal pelaksanaan pemusnahan.'
      },
      {
        stepNumber: 4,
        title: 'Pelaksanaan Teknis Pemusnahan Ramah Lingkungan',
        description: 'Lakukan perusakan kemasan dan bentuk sediaan agar tidak dapat dimanfaatkan kembali:',
        keyPoints: [
          'Bentuk Padat (Tablet/Kapsul): Keluarkan dari blister/strip, gerus/hancurkan, dan larutkan/enkapsulasi dengan semen/pasir sebelum dikirim ke insinerator B3.',
          'Bentuk Cair (Sirup/Drop): Encerkan dengan air dalam jumlah besar dan alirkan ke IPAL (Instalasi Pengolahan Air Limbah) medis berizin, atau serahkan ke pihak ketiga limbah B3.',
          'Bentuk Ampul/Vial Injeksi: Pecahkan wadah kaca dalam drum khusus B3 tahan tusukan.',
          'Arsip Lembar Resep: Hancurkan menggunakan mesin pencacah kertas (shredder) atau dibakar di insinerator medis berizin sehingga identitas pasien musnah total.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Penyusunan & Pengiriman Berita Acara Pemusnahan',
        description: 'Apoteker Penanggung Jawab dan saksi menandatangani Berita Acara Pemusnahan rangkap 4 (Empat), lalu kirimkan tembusan kepada Kepala Dinas Kesehatan Kabupaten/Kota, Kepala Balai Besar POM, Kepala Dinkes Provinsi, dan 1 rangkap sebagai arsip Apotek/RS.'
      }
    ],
    criticalChecklist: [
      'Apakah Berita Acara Pemusnahan ditandatangani oleh Apoteker dan Saksi resmi?',
      'Apakah kemasan primer (botol/blister) telah dirusak agar tidak didaur ulang mafia obat palsu?',
      'Apakah tembusan Berita Acara telah dikirimkan ke Dinkes dan BPOM?'
    ],
    relatedForms: ['Berita Acara Pemusnahan Sediaan Farmasi', 'Berita Acara Pemusnahan Resep', 'Daftar Rincian Obat yang Dimusnahkan', 'Manifest Limbah B3 Medis'],
    notes: 'Resep yang terlibat dalam kasus sengketa hukum atau penyelidikan medikolegal TIDAK BOLEH dimusnahkan meskipun telah lewat 5 tahun sampai ada ketetapan hukum tetap.'
  },
  {
    id: 'sop-obat-obat-tertentu-oot',
    docNumber: 'SOP/FAR-REG/011/2026',
    title: 'SOP Pengelolaan Obat-Obat Tertentu (OOT) yang Sering Disalahgunakan',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'PerBPOM No. 10 Tahun 2019 tentang Pedoman Pengelolaan Obat-Obat Tertentu yang Sering Disalahgunakan',
      'UU No. 17 Tahun 2023 tentang Kesehatan',
      'PerBPOM No. 24 Tahun 2021 tentang Pengawasan Pengelolaan Obat'
    ],
    purpose: 'Mencegah terjadinya penyalahgunaan, peredaran gelap, dan diversi ilegal pada kelompok Obat-Obat Tertentu (OOT) yang bekerja pada sistem saraf pusat.',
    scope: 'Meliputi 6 (enam) zat aktif OOT: Tramadol, Triheksifenidil (THP), Klorpromazin, Amitriptilin, Haloperidol, dan Dekstrometorfan tunggal/kombinasi di Instalasi Farmasi, Gudang, dan Apotek.',
    policy: 'Pengadaan OOT wajib menggunakan Surat Pesanan (SP) khusus OOT bertandatangan Apoteker Penanggung Jawab, disimpan di rak khusus terpisah, dicatat pada Kartu Stok OOT tersendiri, dan hanya dilayani atas Resep Asli Dokter yang sah.',
    responsiblePersons: ['Apoteker Penanggung Jawab (APA)', 'Apoteker Pelayanan', 'Tenaga Teknis Kefarmasian (TTK)'],
    equipmentNeeded: ['Surat Pesanan Khusus OOT', 'Lemari / Rak Khusus Penyimpanan OOT', 'Kartu Stok Khusus OOT Realtime', 'Buku Register Pelayanan Resep OOT'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerbitan Surat Pesanan (SP) Khusus OOT',
        description: 'Gunakan form Surat Pesanan OOT resmi terpisah dari obat reguler (minimal 3 rangkap). SP harus mencantumkan nomor SIPA Apoteker, nama sarana berizin, stempel basah, dan nama PBF resmi penyalur.'
      },
      {
        stepNumber: 2,
        title: 'Penerimaan & Verifikasi Fisik Faktur',
        description: 'Barang diterima langsung oleh Apoteker Penanggung Jawab. Cocokkan nomor batch, tanggal kadaluarsa, jumlah fisik, dan kesesuaian dengan SP OOT sebelum menandatangani faktur penerimaan.'
      },
      {
        stepNumber: 3,
        title: 'Penyimpanan pada Area Khusus OOT',
        description: 'Simpan sediaan OOT (misal Tramadol tablet/injeksi, Trihexyphenidyl, Amitriptilin) di dalam lemari atau rak khusus yang aman, terlindung, dan di bawah pengawasan langsung Apoteker.'
      },
      {
        stepNumber: 4,
        title: 'Skrining Ketat Pelayanan Resep OOT',
        description: 'Hanya melayani OOT berdasarkan RESEP ASLI dokter (bukan copy resep tanpa legalisir dokter, bukan pesanan lisan/chat). Verifikasi keabsahan dokter penulis resep, kewajaran dosis, dan indikasi medis. Lakukan konfirmasi telepon bila ada kecurigaan resep palsu (doctor shopping).'
      },
      {
        stepNumber: 5,
        title: 'Pencatatan Kartu Stok & Pelaporan Pengawasan',
        description: 'Catat setiap mutasi keluar-masuk pada Kartu Stok OOT realtime (tanggal, nomor resep, nama pasien, nama dokter, jumlah masuk/keluar, sisa). Dokumentasikan arsip resep OOT tersendiri untuk kemudahan audit Badan POM.'
      }
    ],
    criticalChecklist: [
      'Apakah SP OOT dibuat terpisah dari obat biasa dan ditandatangani Apoteker?',
      'Apakah penyerahan OOT selalu diverifikasi menggunakan resep asli dokter yang sah?',
      'Apakah kartu stok OOT menunjukkan jumlah fisik yang sama persis (selisih nol)?'
    ],
    relatedForms: ['Format Surat Pesanan Khusus OOT', 'Kartu Stok OOT', 'Buku Register Resep OOT', 'Laporan Mutasi OOT Periodik'],
    notes: 'Dilarang keras menyerahkan obat golongan OOT secara bebas tanpa resep dokter atau melayani resep dengan indikasi ketergantungan non-medis.'
  },
  {
    id: 'sop-aseptic-dispensing-iv',
    docNumber: 'SOP/FAR-KLIN/012/2026',
    title: 'SOP Pencampuran Obat Suntik IV (Aseptic Dispensing & IV Admixture)',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'USP <797> Pharmaceutical Compounding - Sterile Preparations',
      'Pedoman Pencampuran Obat Suntik dan Penanganan Sediaan Sitostatika Kemenkes RI'
    ],
    purpose: 'Menghasilkan sediaan injeksi intravena rekonstitusi dan pencampuran infus yang steril, bebas pirogen/kontaminasi partikel mikroba, stabil secara fisikokimia, kompatibel dengan pelarut, serta memiliki etiket Beyond-Use-Date (BUD) steril yang akurat.',
    scope: 'Ruang Bersih (Cleanroom) Farmasi / Laminar Air Flow (LAF) Cabinet / Biosafety Cabinet di Instalasi Farmasi Rumah Sakit dan Klinik Rawat Inap.',
    policy: 'Pencampuran obat suntik dan cairan infus wajib dilakukan di ruang steril bertekanan positif dengan teknik aseptik oleh Apoteker/TTK yang telah bersertifikasi pelatihan aseptic dispensing.',
    responsiblePersons: ['Apoteker Klinis Penanggung Jawab Cleanroom', 'Tenaga Teknis Kefarmasian (TTK) Aseptic Operator'],
    equipmentNeeded: ['Laminar Air Flow (LAF) Cabinet Kelas ISO 5 / BSC', 'Spuit & Jarum Suntik Steril (berbagai ukuran 1-50 mL)', 'Alkohol Swab 70% Steril', 'Baju Kerja Steril (Tyvek suit/Coverall), Masker N95, Kacamata Goggle, Sarung Tangan Steril Bebas Bedak', 'Label Etiket Infus & BUD Steril'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Pengkajian Kompatibilitas & Perhitungan Dosis',
        description: 'Apoteker memeriksa kestabilan obat dan kompatibilitas pelarut infus (D5W, NaCl 0.9%, Ringer Lactat). Hitung volume pelarut dan konsentrasi akhir yang aman (misal infus Norepinephrine maksimal konsentrasi via perifer vs sentral).'
      },
      {
        stepNumber: 2,
        title: 'Prosedur Hand Hygiene & Penggunaan APD Steril (Gowning & Gloving)',
        description: 'Lepaskan perhiasan dan jam tangan. Cuci tangan bedah antiseptik 6 langkah hingga siku, kenakan baju coverall steril, masker, pelindung mata (goggle), penutup kepala, dan sarung tangan steril.'
      },
      {
        stepNumber: 3,
        title: 'Dekontaminasi LAF & Bahan Obat Masuk Pass-Box',
        description: 'Nyalakan LAF minimal 30 menit sebelum pengerjaan. Bersihkan dinding LAF dengan alkohol 70% steril satu arah dari atas ke bawah dan belakang ke depan. Seka seluruh permukaan ampul/vial sebelum dimasukkan ke LAF.'
      },
      {
        stepNumber: 4,
        title: 'Pencampuran Aseptik di Bawah Aliran Udara Laminar',
        description: 'Lakukan rekonstitusi dan pemindahan larutan di dalam zona steril LAF (minimal 15 cm dari tepian kabinet):',
        keyPoints: [
          'Buka ampul dengan mematahkan ke arah berlawanan dari aliran udara filter HEPA.',
          'Tusuk karet vial dengan sudut 45-60° lalu tegakkan 90° untuk mencegah *coring* (potongan karet masuk ke larutan).',
          'Campurkan ke dalam kantong infus secara perlahan, bolak-balikkan kantong perlahan tanpa mengocok keras agar tidak merusak struktur protein obat.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Inspeksi Visual, Pelabelan Etiket & Penetapan BUD Steril USP <797>',
        description: 'Periksa sediaan di bawah latar belakang hitam dan putih untuk memastikan tidak ada presipitasi kabut atau partikel asing. Tempelkan etiket infus khusus berisi: Nama pasien, No RM, Nama obat & pelarut, Volume akhir, Kecepatan tetes/titrasi, Tanggal-jam pengerjaan, dan Tanggal-jam BUD steril.'
      }
    ],
    criticalChecklist: [
      'Apakah sarung tangan disemprot alkohol 70% steril secara berkala?',
      'Apakah sediaan bebas dari partikel presipitasi pada inspeksi visual?',
      'Apakah etiket mencantumkan jam kedaluwarsa (BUD) secara spesifik?'
    ],
    relatedForms: ['Worksheet Aseptic Dispensing', 'Logbook Pembersihan & Sertifikasi Filter HEPA LAF', 'Form Kontrol Suhu & Partikel Cleanroom ISO 5-7'],
    notes: 'Untuk obat sitotoksik/kemoterapi, pencampuran WAJIB dilakukan di ruang bertekanan negatif menggunakan Biosafety Cabinet (BSC) Kelas II B2 dengan APD sitostatika lengkap.'
  },
  {
    id: 'sop-troli-emergency',
    docNumber: 'SOP/FAR-SAF/013/2026',
    title: 'SOP Pengelolaan Obat & Alat Kesehatan Emergensi (Kit / Troli Emergensi Resusitasi)',
    category: 'safety',
    categoryLabel: 'Keamanan Pasien & Quality Assurance',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Permenkes RI No. 47 Tahun 2018 tentang Pelayanan Kegawatdaruratan',
      'Standar Akreditasi Rumah Sakit (STARKES KARS 2022 - Standar PKPO 3.3)'
    ],
    purpose: 'Menjamin seluruh obat penyelamat jiwa (life-saving drugs) dan alat kesehatan resusitasi selalu tersedia dalam kondisi lengkap, siap pakai seketika, tersegel aman, dan bebas dari barang kadaluarsa di seluruh unit perawatan gawat darurat.',
    scope: 'Troli Emergensi dan Emergency Kit di IGD, ICU/ICCU/NICU/PICU, Kamar Operasi (OK), VK Bersalin, Hemodialisis, Ruang Rawat Inap, dan Poli Rawat Jalan.',
    policy: 'Troli emergensi wajib dikunci dengan Segel Bernomor Seri Sekali Pakai (disposable breakaway seal). Bila segel rusak/dibuka untuk resusitasi (Code Blue), Farmasi wajib mengisi ulang dan menyegel kembali dalam kurun waktu maksimal < 2 jam.',
    responsiblePersons: ['Apoteker Penanggung Jawab Ruangan / Depo', 'Kepala Ruangan Keperawatan / Tim Code Blue'],
    equipmentNeeded: ['Troli Emergensi Beroda dengan Kunci Segel Merah/Kuning Bernomor Seri', 'Daftar Standar Obat & Alkes Emergensi Resmi', 'Gunting Emergensi / Defibrillator / Suction Unit'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penetapan Standar Daftar Obat & Alkes Emergensi',
        description: 'Komite Farmasi dan Terapi (KFT) bersama Tim Medis Emergensi menetapkan jenis dan jumlah pasti obat resusitasi (Epinefrin 1mg/mL, Sulfas Atropin 0.25mg/mL, Amiodaron 150mg/3mL, Lidokain 2%, Natrium Bikarbonat 8.4%, Dextrose 40%, Kalsium Glukonat 10%, Diazepam rektal/injeksi).'
      },
      {
        stepNumber: 2,
        title: 'Penataan Rapi Berdasarkan Laci Kategori Resusitasi',
        description: 'Tata obat di dalam laci troli emergensi secara terstandar:',
        keyPoints: [
          'Laci 1 (Atas): Obat-obatan resusitasi kardiopulmoner & live-saving ampul.',
          'Laci 2: Spuit steril, iv-catheter (abocath), tourniquet, alcohol swab, dan three-way stopcock.',
          'Laci 3: Peralatan airway & breathing (Endotracheal Tube / ETT, Laryngoscope, OPA / Guedel, Bag-Valve-Mask / Ambu Bag).',
          'Laci 4 (Bawah): Cairan infus kristaloid (NaCl 0.9%, Ringer Lactat), blood set/infus set, dan suction catheter.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Penyegelan dengan Segel Plastik Bernomor Seri',
        description: 'Setelah diverifikasi kelengkapannya oleh Apoteker dan Perawat, kunci troli menggunakan Segel Plastik Bernomor Seri. Catat nomor segel pada Buku Kontrol Troli Emergensi.'
      },
      {
        stepNumber: 4,
        title: 'Inspeksi & Monitoring Rutin Berkala',
        description: 'Perawat ruangan memeriksa keutuhan nomor segel setiap pergantian shift. Apoteker melakukan audit fisik bulanan untuk memeriksa sisa masa kadaluarsa (ED minimal > 3-6 bulan; obat dengan sisa ED < 3 bulan wajib diganti segera).'
      },
      {
        stepNumber: 5,
        title: 'Prosedur Penggantian Pasca Code Blue (< 2 Jam)',
        description: 'Setelah tindakan resusitasi selesai, perawat mencatat obat yang digunakan pada Resep Emergensi / Lembar Pemakaian Emergensi. Petugas Farmasi segera mengantarkan obat pengganti, mengisi ulang laci troli, dan memasang segel baru bernomor seri dalam kurun waktu < 2 jam.'
      }
    ],
    criticalChecklist: [
      'Apakah nomor segel plastik sesuai persis dengan yang tercatat di buku kontrol?',
      'Apakah seluruh obat emergensi memiliki masa kadaluarsa (ED) minimal > 3 bulan?',
      'Apakah penggantian obat pasca tindakan selesai dalam tempo < 2 jam?'
    ],
    relatedForms: ['Daftar Standar Obat & Alkes Troli Emergensi', 'Buku Pemantauan & Pengecekan Segel Harian', 'Form Pemakaian Obat Emergensi Code Blue', 'Logbook Audit Farmasi Bulanan'],
    notes: 'DILARANG KERAS meminjam atau mengambil obat dari troli emergensi untuk keperluan terapi rutin harian tanpa kondisi kegawatdaruratan.'
  },
  {
    id: 'sop-stock-opname-feff',
    docNumber: 'SOP/FAR-LOG/014/2026',
    title: 'SOP Pengendalian Persediaan, Stock Opname & Penataan Obat Metode FEFO/FIFO',
    category: 'logistik',
    categoryLabel: 'Pengelolaan Logistik & Penyimpanan',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
      'Petunjuk Teknis Cara Distribusi Obat yang Baik (CDOB) BPOM RI',
      'Permenkes RI No. 72 Tahun 2016'
    ],
    purpose: 'Memastikan akurasi kesesuaian antara stok fisik nyata dengan data pencatatan sistem, mengendalikan perputaran logistik obat agar tidak terjadi kekosongan atau penumpukan (over-stock), serta meminimalkan kerugian finansial akibat obat rusak atau kadaluarsa.',
    scope: 'Gudang Farmasi Induk, Depo Farmasi Rawat Jalan, Depo Rawat Inap, Depo IGD/Bedah, dan Apotek.',
    policy: 'Pengeluaran obat WAJIB menggunakan prinsip First Expired First Out (FEFO) didukung First In First Out (FIFO). Stock Opname menyeluruh wajib dilaksanakan berkala (bulanan/triwulanan) oleh Tim Stock Opname independen.',
    responsiblePersons: ['Apoteker Penanggung Jawab', 'Kepala Gudang Farmasi', 'Tim Stock Opname / Tenaga Teknis Kefarmasian'],
    equipmentNeeded: ['Lembar Hasil Hitung Fisik (Count Sheet)', 'Scanner Barcode Handheld', 'Sistem Informasi Manajemen Farmasi (SIM/SIA)', 'Stiker Penanda ED Mendekati (Stiker Dot Merah/Kuning/Hijau)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penataan Fisik Berbasis FEFO & Alfabetis',
        description: 'Tata letak sediaan farmasi di rak obat berdasarkan bentuk sediaan, disusun alfabetis, dan menerapkan sistem FEFO:',
        keyPoints: [
          'Obat dengan masa kedaluwarsa paling dekat (First Expired) diletakkan di barisan paling depan/atas untuk diambil lebih dulu.',
          'Obat dengan masa kedaluwarsa lebih panjang diletakkan di bagian belakang.',
          'Pasang stiker penanda warna tahun ED pada boks obat (misal dot merah untuk ED < 6 bulan).'
        ]
      },
      {
        stepNumber: 2,
        title: 'Pencatatan Kartu Stok Manual & Elektronik (Double Tracking)',
        description: 'Setiap transaksi penerimaan, penyerahan resep, atau retur obat wajib seketika dicatat pada kartu stok fisik dan diposting di sistem komputer SIA/SIMRS.'
      },
      {
        stepNumber: 3,
        title: 'Persiapan Teknis Pelaksanaan Stock Opname',
        description: 'Hentikan sementara transaksi keluar-masuk (cut-off point) atau lakukan di luar jam pelayanan aktif. Cetak Lembar Hitung Fisik (Blind Count Sheet tanpa menampilkan jumlah saldo sistem) untuk menghindari bias hitung.'
      },
      {
        stepNumber: 4,
        title: 'Penghitungan Fisik Sediaan (Blind Physical Counting)',
        description: 'Petugas menghitung fisik obat secara riil per nomor batch dan per tanggal ED. Lakukan penghitungan ulang (re-count) oleh petugas kedua bila ditemukan selisih.'
      },
      {
        stepNumber: 5,
        title: 'Penyusunan Berita Acara & Analisis Selisih Stok (Variance Reconciliation)',
        description: 'Bandingkan total hitung fisik dengan saldo sistem. Jika ditemukan selisih (positif atau negatif), telusuri penyebabnya (salah input resep, salah ambil obat LASA, atau kelupaan input faktur). Buat Berita Acara Stock Opname ditandatangani Apoteker Penanggung Jawab dan Manajemen.'
      }
    ],
    criticalChecklist: [
      'Apakah obat yang masa kadaluarsanya lebih pendek berada di barisan terdepan?',
      'Apakah selisih stok fisik vs sistem bernilai 0% (atau dalam batas toleransi wajar < 0.1%)?',
      'Apakah obat yang mendekati ED 3-6 bulan telah terdata untuk diretur ke PBF?'
    ],
    relatedForms: ['Blind Count Sheet Stock Opname', 'Berita Acara Rekonsiliasi Hasil Stock Opname', 'Kartu Stok Obat', 'Laporan Monitoring Obat Mendekati ED'],
    notes: 'Stock opname untuk Narkotika dan Psikotropika wajib dilakukan setiap hari/mingguan, terpisah dari stok reguler.'
  },
  {
    id: 'sop-home-pharmacy-care',
    docNumber: 'SOP/FAR-KLIN/015/2026',
    title: 'SOP Pelayanan Kefarmasian di Rumah (Home Pharmacy Care / Visite Pasien Mandiri)',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
      'Petunjuk Teknis Standar Pelayanan Kefarmasian di Apotek Kemenkes RI',
      'Pedoman Pelayanan Farmasi Klinis di Rumah Kemenkes RI'
    ],
    purpose: 'Memberikan asuhan kefarmasian langsung di tempat tinggal pasien lansia, pasca rawat inap, atau pasien penyakit kronis guna memantau kepatuhan terapi, mengevaluasi efektivitas obat, memeriksa kesesuaian cara penyimpanan obat di rumah, serta mendeteksi dan menyelesaikan Masalah Terkait Obat (Drug Related Problems / DRP).',
    scope: 'Pasien yang memenuhi kriteria seleksi pelayanan di rumah (pasien geriatri usia > 65 tahun dengan ≥ 3 penyakit kronis, pasien pasca stroke/kanker/DM tidak mandiri, pasien dengan polifarmasi > 5 obat, atau pasien yang dirujuk dokter).',
    policy: 'Pelayanan Home Pharmacy Care dilakukan oleh Apoteker yang memiliki SIPA aktif dengan persetujuan tertulis (Informed Consent) dari pasien atau wali keluarga.',
    responsiblePersons: ['Apoteker Penanggung Jawab (APA)', 'Apoteker Pengasuh Pasien'],
    equipmentNeeded: ['Home Care Kit Bag (Tensimeter, Glukometer, Termometer, Alat Tulis, Alkohol Swab)', 'Pillbox / Kotak Pengingat Obat Harian 7 Hari', 'Formulir Informed Consent Home Care', 'Buku Catatan Pengobatan Pasien (Patient Medication Record / PMR)', 'Brosur Edukasi & Leaflet Pasien'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Seleksi Pasien & Penjadwalan Kunjungan',
        description: 'Apoteker mengidentifikasi pasien yang memerlukan asuhan di rumah melalui rekam medis atau permintaan keluarga. Lakukan kontak telepon untuk membuat janji kunjungan dan meminta kesediaan pasien.'
      },
      {
        stepNumber: 2,
        title: 'Persetujuan Tindakan (Informed Consent) & Pengkajian Awal',
        description: 'Setibanya di rumah pasien, perkenalkan diri, jelaskan tujuan kunjungan kefarmasian, dan minta pasien/keluarga menandatangani Formulir Informed Consent.'
      },
      {
        stepNumber: 3,
        title: 'Pemeriksaan Seluruh Obat di Rumah (Medicine Cabinet Inspection)',
        description: 'Minta pasien menunjukkan seluruh obat yang ada di rumah (obat resep aktif, sisa obat lama, obat bebas/herbal). Lakukan pemeriksaan menyeluruh:',
        keyPoints: [
          'Singkirkan dan amankan obat yang sudah kadaluarsa (ED) atau rusak/berubah warna.',
          'Pisahkan obat lama yang sudah distop oleh dokter agar tidak terminum kembali oleh pasien.',
          'Evaluasi tempat penyimpanan obat (hindari tempat lembap, panas, terkena sinar matahari langsung, atau terjangkau anak kecil).'
        ]
      },
      {
        stepNumber: 4,
        title: 'Penataan Jadwal Minum Obat & Pengisian Pillbox Harian',
        description: 'Susun Jadwal Pemberian Obat Harian yang terkoordinasi (Pagi, Siang, Sore, Malam, sebelum/sesudah makan). Masukkan obat ke dalam kotak obat bersekat (Pillbox) untuk mempermudah kepatuhan pasien.'
      },
      {
        stepNumber: 5,
        title: 'Edukasi, Penilaian Kepatuhan & Dokumentasi Laporan PMR',
        description: 'Berikan edukasi personal mengenai cara minum obat dan tanda efek samping berbahaya. Catat hasil temuan, parameter tanda vital (tekanan darah, gula darah), dan rencana tindak lanjut pada formulir Patient Medication Record (PMR). Lakukan pelaporan hasil visite ke dokter perujuk.'
      }
    ],
    criticalChecklist: [
      'Apakah lembar Informed Consent telah ditandatangani pasien/keluarga?',
      'Apakah obat kadaluarsa di rumah pasien telah disingkirkan dengan izin keluarga?',
      'Apakah jadwal minum obat tertulis telah ditempel di tempat yang mudah dilihat pasien?'
    ],
    relatedForms: ['Formulir Persetujuan Informed Consent Home Pharmacy Care', 'Dokumentasi Catatan Pengobatan Pasien (PMR)', 'Lembar Rekomendasi Apoteker untuk Dokter DPJP', 'Jadwal Pengingat Minum Obat Pasien'],
    notes: 'Kunjungan dilakukan dengan menjunjung tinggi etika kesopanan, menjaga privasi keluarga, dan berorientasi pada peningkatan kualitas hidup pasien.'
  },
  {
    id: 'sop-penyerahan-obat-swamedikasi',
    docNumber: 'SOP/FAR-KLIN/016/2026',
    title: 'SOP Pelayanan Swamedikasi (Self-Medication) & Penyerahan Obat Wajib Apotek (DOWA)',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Kepmenkes No. 347/Menkes/SK/VII/1990 tentang Obat Wajib Apotek (DOWA No. 1)',
      'Permenkes No. 919/Menkes/Per/X/1993 tentang Kriteria Obat yang Dapat Diserahkan Tanpa Resep (DOWA No. 2)',
      'Permenkes No. 1176/Menkes/SK/X/1999 tentang Daftar Obat Wajib Apotek No. 3',
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek'
    ],
    purpose: 'Memberikan pelayanan pengobatan mandiri (swamedikasi) yang rasional, aman, dan efektif untuk keluhan penyakit ringan (minor ailments), serta memastikan penyerahan Obat Keras Tertentu (DOWA) memenuhi batasan indikasi, jumlah maksimal, dan kewajiban pencatatan resmi.',
    scope: 'Area counter pelayanan farmasi di Apotek dan Klinik.',
    policy: 'Swamedikasi obat keras DOWA hanya boleh diserahkan langsung oleh Apoteker yang memiliki STRA/SIPA aktif. Apoteker wajib menolak penyerahan dan merujuk pasien ke dokter bila ditemukan tanda bahaya (Red Flags).',
    responsiblePersons: ['Apoteker Penanggung Jawab (APA)', 'Apoteker Pelayanan Swamedikasi'],
    equipmentNeeded: ['Daftar Resmi Obat Wajib Apotek (DOWA 1, 2, 3) beserta Batas Maksimal Jumlah Sediaan', 'Buku Register Penyerahan DOWA & Swamedikasi', 'Leaflet Edukasi Penyakit Ringan (Maag, Diare, Flu, Batuk, Alergi)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penggalian Informasi Pasien dengan Metode WWHAM',
        description: 'Apoteker melakukan anamnesa terstruktur kepada pasien yang datang tanpa resep dokter:',
        keyPoints: [
          'Who is the patient?: Untuk siapa obat ini ditujukan (pasien sendiri, anak-anak, ibu hamil, lansia)?',
          'What are the symptoms?: Apa saja gejala spesifik yang dirasakan?',
          'How long have the symptoms been present?: Sudah berapa lama keluhan berlangsung?',
          'Action taken already?: Obat atau tindakan apa yang sudah dicoba sebelumnya?',
          'Medication currently being taken?: Apakah sedang mengonsumsi obat rutin lain atau memiliki riwayat alergi?'
        ]
      },
      {
        stepNumber: 2,
        title: 'Skrining Tanda Bahaya (Red Flags) & Keputusan Rujukan',
        description: 'Evaluasi apakah keluhan aman untuk swamedikasi. Jika ditemukan tanda bahaya (misal: demam tinggi > 3 hari, nyeri dada menjalar, batuk darah, diare lendir darah/dehidrasi berat, sesak napas akut), SEGERA rujuk pasien ke Puskesmas/Dokter/UGD.'
      },
      {
        stepNumber: 3,
        title: 'Pemilihan Obat Rasional (OTC / DOWA Terpilih)',
        description: 'Pilih sediaan obat bebas, bebas terbatas, atau DOWA yang paling tepat dengan mempertimbangkan kontraindikasi dan batasan hukum (misal: Asam Mefenamat maksimal 20 tablet/pasien untuk sakit gigi/nyeri haid, Ranitidin maksimal 10 tablet untuk gastritis ringan, Cetirizine maksimal 10 tablet untuk alergi antihistamin).'
      },
      {
        stepNumber: 4,
        title: 'Pemberian Informasi Obat Lengkap & Edukasi Non-Farmakologi',
        description: 'Jelaskan dosis, aturan pakai, waktu minum, kemungkinan efek samping (misal mengantuk pada CTM/Cetirizine), serta terapi non-farmakologi (hidrasi cukup, istirahat, diet serat).'
      },
      {
        stepNumber: 5,
        title: 'Pencatatan Buku Catatan Pelayanan DOWA',
        description: 'Catat identitas pasien, keluhan, nama obat DOWA yang diserahkan, jumlah, aturan pakai, dan tanggal penyerahan pada Buku Register Resmi DOWA.'
      }
    ],
    criticalChecklist: [
      'Apakah penyerahan obat DOWA dilakukan langsung oleh Apoteker?',
      'Apakah jumlah obat DOWA yang diserahkan tidak melebihi batas maksimal regulasi Kemenkes?',
      'Apakah pasien diedukasi untuk memeriksakan diri ke dokter jika keluhan tidak membaik dalam 3 hari?'
    ],
    relatedForms: ['Buku Register Penyerahan Obat Wajib Apotek (DOWA)', 'Lembar Rekomendasi Rujukan Dokter', 'Buku Catatan Konsultasi Swamedikasi'],
    notes: 'DILARANG KERAS menyerahkan antibiotik oral/topikal (selain DOWA tertentu yang dibolehkan seperti Kloramfenikol salep kulit/mata tertentu dengan syarat ketat) secara swamedikasi bebas guna mencegah resistensi antimikroba (AMR).'
  },
  {
    id: 'sop-spill-kit-b3-sitostatika',
    docNumber: 'SOP/FAR-SAF/017/2026',
    title: 'SOP Penanganan Tumpahan Bahan Berbahaya & Beracun (B3), Sitostatika, dan Cairan Infus Kimia',
    category: 'safety',
    categoryLabel: 'Keamanan Pasien & Quality Assurance',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 66 Tahun 2016 tentang Keselamatan dan Kesehatan Kerja Rumah Sakit (K3RS)',
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di RS',
      'Peraturan Pemerintah RI No. 74 Tahun 2001 tentang Pengelolaan Bahan Berbahaya dan Beracun'
    ],
    purpose: 'Memberikan pedoman langkah cepat dan aman dalam mengisolasi, membersihkan, dan menetralkan tumpahan sediaan farmasi B3 (sitostatika, formalin, alkohol pekat, cairan kimia reagen) guna mencegah paparan toksik karsinogenik/mutagenik pada petugas, pasien, dan pencemaran lingkungan.',
    scope: 'Gudang Farmasi, Ruang Aseptic Dispensing Sitostatika, Bangsal Kemoterapi, Depo Farmasi, dan Area Pengiriman Obat.',
    policy: 'Setiap ruangan yang mengelola obat sitostatika/B3 wajib dilengkapi Spill Kit B3 siap pakai. Setiap tumpahan harus ditangani segera dalam tempo < 10 menit oleh petugas terlatih.',
    responsiblePersons: ['Petugas Farmasi Bersertifikasi K3/Sitostatika', 'Apoteker Klinis', 'Tim K3RS'],
    equipmentNeeded: ['Kotak Spill Kit Sitostatika/B3 Lengkap', 'Tanda Peringatan "AWAS TUMPAHAN B3 / DILARANG MELINTAS"', 'Bahan Penyerap Tumpahan (Spill Pad / Kertas Isap Serap Tinggi / Absorbent Granules)', 'Cairan Penetralisir (Natrium Hipoklorit 5% / Deterjen Enzimatik)', 'Kantong Plastik Kuning/Ungu Tebal Khusus Limbah Sitostatika Berlogo Biohazard', 'APD B3 Lengkap (Coverall Tyvek, Masker Respirator N95/FFP3, Goggle, Sarung Tangan Kemoterapi Ganda, Pelindung Sepatu)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Isolasi Area & Pemasangan Rambu Bahaya',
        description: 'Segera pasang papan peringatan bahaya "AWAS TUMPAHAN BAHAYA B3 / SITOSTATIKA" di sekitar area tumpahan dalam radius minimal 2 meter agar tidak ada orang melintas.'
      },
      {
        stepNumber: 2,
        title: 'Penggunaan APD Spill Kit Lengkap',
        description: 'Buka kotak Spill Kit, segera kenakan APD secara berurutan: penutup kepala, masker respirator N95/gas mask, goggle pelindung mata, jas pelindung tahan air (coverall), pelindung sepatu, dan sarung tangan dobel (sarung tangan kemo tebal di bagian luar).'
      },
      {
        stepNumber: 3,
        title: 'Pengambilan Pecahan Kaca & Penyerapan Cairan Tumpahan',
        description: 'Lakukan penanganan fisik tumpahan secara hati-hati:',
        keyPoints: [
          'Gunakan pinset/sekop plastik khusus untuk memungut pecahan kaca/ampul (JANGAN PERNAH mengambil pecahan dengan tangan kosong).',
          'Tutup tumpahan cairan dengan kain penyerap (absorbent pad) dari arah luar ke dalam agar tumpahan tidak meluas.',
          'Jika tumpahan berbentuk serbuk, tutupi perlahan dengan kain basah penyerap agar serbuk tidak beterbangan di udara.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Dekontaminasi & Netralisasi Permukaan Lantai',
        description: 'Seka lantai dengan cairan deterjen enzimatik dan cairan pemutih natrium hipoklorit 5% menggunakan lap sekali pakai. Bilas dengan air bersih hingga permukaan benar-benar bersih dan kering.'
      },
      {
        stepNumber: 5,
        title: 'Pengepakan Limbah & Pembuatan Laporan Insiden K3',
        description: 'Masukkan semua sampah absorbent pad, sarung tangan, lap, dan pecahan kaca ke dalam Kantong Plastik Kuning/Ungu Berlogo Sitotoksik/B3, ikat rapat dengan cable tie, dan serahkan ke TPS Limbah B3 berizin. Isi Formulir Laporan Tumpahan B3 kepada Tim K3RS.'
      }
    ],
    criticalChecklist: [
      'Apakah APD respirator dan goggle telah dikenakan sebelum mendekati tumpahan?',
      'Apakah pecahan ampul/vial diambil menggunakan pinset/sekop khusus tanpa tersentuh tangan?',
      'Apakah seluruh limbah tumpahan dibungkus plastik biohazard sitotoksik bertali rapat?'
    ],
    relatedForms: ['Formulir Laporan Insiden Tumpahan B3/Sitostatika', 'Kartu Kontrol Inventaris Isi Spill Kit', 'Safety Data Sheet (SDS) Bahan Terkait'],
    notes: 'Jika tumpahan mengenai mata atau kulit petugas, segera bilas pada stasiun darurat Eye Wash / Shower darurat selama minimal 15 menit dan laporkan ke UGD.'
  },
  {
    id: 'sop-obat-program-tbc-arv',
    docNumber: 'SOP/FAR-REG/018/2026',
    title: 'SOP Pengelolaan & Penyerahan Obat Program Nasional Pemerintah (OAT TB & ARV HIV)',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 67 Tahun 2016 tentang Penanggulangan Tuberkulosis',
      'Permenkes RI No. 23 Tahun 2022 tentang Penanggulangan HIV/AIDS',
      'Pedoman Manajemen Logistik Obat Program Nasional Kemenkes RI'
    ],
    purpose: 'Menjamin ketersediaan yang berkesinambungan, penyimpanan yang memenuhi syarat farmasetik, ketepatan regimen dosis, pencatatan pelaporan terintegrasi sistem nasional (SITB & SIHA), serta kepatuhan konsumsi obat jangka panjang bagi pasien TB dan HIV tanpa risiko putus obat (*lost to follow-up*).',
    scope: 'Instalasi Farmasi, Poli Dots TB, Poli VCT/PDP HIV, dan Gudang Logistik Program Pemerintah.',
    policy: 'Obat Anti Tuberkulosis (OAT) dan Anti Retroviral (ARV) program pemerintah diserahkan GRATIS kepada pasien yang telah terdaftar resmi, wajib dipantau kepatuhannya oleh Pengawas Menelan Obat (PMO), dan dilarang diperjualbelikan.',
    responsiblePersons: ['Apoteker Penanggung Jawab Obat Program', 'Dokter Poli DOTS/PDP', 'Petugas Pengelola SITB & SIHA'],
    equipmentNeeded: ['Lemari Penyimpanan Khusus OAT & ARV Terkunci', 'Aplikasi Sistem Informasi Tuberkulosis (SITB)', 'Aplikasi Sistem Informasi HIV/AIDS (SIHA)', 'Buku Register TB 01 & Form Ikhtisar Perawatan HIV', 'Kotak Pengingat Obat Pasien'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Pengelolaan Rantai Pasok & Penerimaan Logistik Program',
        description: 'Ajukan permintaan OAT KDT (Kombinasi Dosis Tetap Kategori 1, Kategori 2, Sisipan, dan Profilaksis TPT) serta ARV (TLD: Tenofovir-Lamivudine-Dolutegravir, Efavirenz, Zidovudine) ke Dinas Kesehatan melalui aplikasi SITB dan SIHA sebelum stok pengaman (buffer stock) habis.'
      },
      {
        stepNumber: 2,
        title: 'Penyimpanan Sesuai Suhu Stabilitas Farmasetik',
        description: 'Simpan OAT dan ARV pada suhu ruang terkontrol (< 25-30°C) kering dan terhindar dari kelembapan tinggi untuk menjaga keutuhan salut selaput tablet FDC/KDT.'
      },
      {
        stepNumber: 3,
        title: 'Skrining Berat Badan & Penetapan Jumlah Tablet KDT',
        description: 'Apoteker memverifikasi berat badan aktual pasien TB terkini untuk memastikan jumlah tablet FDC/KDT tepat (misal: BB 38-54 kg = 3 tablet 4KDT; BB 55-70 kg = 4 tablet 4KDT). Pada pasien ARV, verifikasi hasil laboratorium Viral Load (VL) dan CD4 terkini.'
      },
      {
        stepNumber: 4,
        title: 'Konseling Kepatuhan & Peran Pengawas Menelan Obat (PMO)',
        description: 'Edukasi pasien dan PMO bahwa OAT harus diminum rutin setiap hari pada jam yang sama (pagi saat perut kosong) selama minimal 6 bulan, serta ARV wajib diminum seumur hidup tanpa putus untuk mencegah resistensi obat ganda (MDR-TB / HIV Drug Resistance). Jelaskan efek samping lazim (air seni merah pada Rifampisin).'
      },
      {
        stepNumber: 5,
        title: 'Pencatatan & Pelaporan Elektronik SITB / SIHA',
        description: 'Catat setiap penyerahan obat pada Kartu Pasien (TB.01 / Ikhtisar HIV) dan input data mutasi obat pada sistem elektronik SITB/SIHA selambat-lambatnya setiap akhir pekan.'
      }
    ],
    criticalChecklist: [
      'Apakah dosis OAT FDC disesuaikan dengan penimbangan berat badan pasien terbaru?',
      'Apakah pasien dan PMO telah memahami jadwal minum obat tanpa putus?',
      'Apakah laporan mutasi SITB / SIHA telah terintegrasi dengan Dinkes?'
    ],
    relatedForms: ['Kartu Pengobatan Pasien TB (TB.01)', 'Lembar Register Penyerahan ARV', 'Form Laporan Bulanan Logistik SITB & SIHA', 'Formulir Pelacakan Pasien Mangkir (Lost to Follow Up)'],
    notes: 'Bila pasien tidak datang mengambil obat lebih dari 2 hari dari tanggal jadwal, Tim Farmasi segera berkoordinasi dengan petugas puskesmas untuk pelacakan kontak (*contact tracing*).'
  },
  {
    id: 'sop-pto-visite-rawat-inap',
    docNumber: 'SOP/FAR-KLIN/019/2026',
    title: 'SOP Pemantauan Terapi Obat (PTO) & Visite Farmasi Pasien Rawat Inap (Metode SOAP / FARM)',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Standar Akreditasi Rumah Sakit Kemenkes RI (STARKES) - Pokja Pelayanan Kefarmasian dan Penggunaan Obat (PKPO)',
      'Pedoman Pelayanan Farmasi Klinik Kemenkes RI'
    ],
    purpose: 'Memastikan efikasi dan keamanan terapi obat yang diterima pasien rawat inap, mendeteksi dan mencegah Drug Related Problems (DRP) secara dini, meminimalkan risiko reaksi obat yang tidak diinginkan (ROTD), serta memberikan rekomendasi terapi berbasis bukti kepada tim medis melalui Catatan Perkembangan Pasien Terintegrasi (CPPT).',
    scope: 'Seluruh bangsal rawat inap (Intensif ICU/ICCU, Bedah, Penyakit Dalam, Pediatrik, Kebidanan) dan Instalasi Farmasi.',
    policy: 'Pemantauan Terapi Obat (PTO) dan Visite dilakukan secara mandiri atau kolaboratif oleh Apoteker Klinis yang kompeten pada pasien dengan kriteria prioritas (ICU, polifarmasi > 5 obat, gangguan ginjal/hepar, geriatri/pediatrik, indeks terapi sempit).',
    responsiblePersons: ['Apoteker Klinis Penanggung Jawab Bangsal', 'Dokter Penanggung Jawab Pelayanan (DPJP)', 'Perawat Ruangan'],
    equipmentNeeded: ['Rekam Medis Pasien (RME / Manual)', 'Lembar Catatan Perkembangan Pasien Terintegrasi (CPPT)', 'Lembar Profil Pengobatan Pasien (Form PTO/FARM)', 'Aplikasi Referensi Interaksi Obat Klinis & Panduan Dosis Ginjal'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Seleksi Pasien Prioritas Pemantauan Terapi Obat',
        description: 'Setiap pagi hari, Apoteker menyeleksi pasien di bangsal dengan kriteria: menerima obat indeks terapi sempit (Digoksin, Teofilin, Vankomisin, Fenitoin, Warfarin), polifarmasi (>= 5 jenis obat), gangguan fungsi ginjal (eGFR < 50 mL/min) atau hepar berat, pediatrik, geriatri, serta pasien di ruang perawatan intensif (ICU/ICCU/HCU).'
      },
      {
        stepNumber: 2,
        title: 'Pengumpulan Data Klinis & Riwayat Pengobatan',
        description: 'Kumpulkan data subjektif pasien (keluhan utama, alergi, riwayat obat di rumah) dan data objektif (tanda vital, hasil lab darah lengkap, fungsi ginjal serum kreatinin, fungsi hati SGOT/SGPT, kultur mikrobiologi, hasil EKG/radiologi).'
      },
      {
        stepNumber: 3,
        title: 'Analisis Terapi & Identifikasi Drug Related Problems (DRP)',
        description: 'Lakukan kajian sistematis menggunakan kerangka kerja SOAP (Subjective, Objective, Assessment, Plan) atau FARM (Findings, Assessment, Resolution, Monitoring). Evaluasi: indikasi tanpa obat, obat tanpa indikasi, ketepatan pemilihan obat, ketidaktepatan dosis (underdose/overdose), interaksi obat berbahaya, dan efek samping potensial.'
      },
      {
        stepNumber: 4,
        title: 'Visite ke Pasien & Komunikasi Interprofesional DPJP',
        description: 'Lakukan kunjungan (visite) ke samping tempat tidur pasien untuk wawancara respon terapi dan kepatuhan. Diskusikan temuan DRP dan rekomendasi solusi alternatif terapi kepada DPJP secara langsung saat visite bersama atau melalui telepon/komunikasi SBAR.'
      },
      {
        stepNumber: 5,
        title: 'Dokumentasi Rekomendasi Farmasi di Lembar CPPT',
        description: 'Tuliskan hasil kajian pemantauan, asesmen klinis, dan rekomendasi farmasi secara ringkas dan terstruktur pada lembar Catatan Perkembangan Pasien Terintegrasi (CPPT) rekam medis dengan cap stempel profesi dan tanda tangan Apoteker.'
      }
    ],
    criticalChecklist: [
      'Apakah pasien berisiko tinggi (ICU, polifarmasi, gangguan ginjal) telah teridentifikasi untuk PTO harian?',
      'Apakah asesmen terdokumentasi rapi di lembar CPPT sesuai kaidah SOAP/FARM?',
      'Apakah rekomendasi penyesuaian dosis telah dikonfirmasikan kepada DPJP?'
    ],
    relatedForms: ['Formulir Pemantauan Terapi Obat (PTO)', 'Lembar CPPT Rekam Medis', 'Formulir Pelaporan Intervensi Apoteker', 'Lembar Profil Pengobatan Pasien (P3)'],
    notes: 'Rekomendasi perubahan dosis atau penghentian obat akibat toksisitas/interaksi mayor harus selalu diverifikasi kembali penerapannya pada lembar instruksi pengobatan dokter (CPO / e-Prescribing).'
  },
  {
    id: 'sop-farmasi-ugd-cito',
    docNumber: 'SOP/FAR-KLIN/020/2026',
    title: 'SOP Pelayanan Farmasi di Unit Gawat Darurat (UGD) & Penyiapan Resep Cito',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Kepmenkes RI tentang Standar Pelayanan Gawat Darurat',
      'Standar Akreditasi STARKES - Bab Akses dan Kesinambungan Pelayanan (AKP)'
    ],
    purpose: 'Menjamin kecepatan, ketepatan, dan keselamatan penyediaan perbekalan farmasi, antidotum keracunan, dan obat resusitasi kritis untuk pasien gawat darurat dengan waktu tunggu pelayanan resep CITO maksimal <= 15 menit.',
    scope: 'Depo Farmasi UGD, Ruang Triase, Ruang Resusitasi, dan Ruang Tindakan Gawat Darurat.',
    policy: 'Resep berlabel CITO / EMERGENCY mendapat prioritas mutlak di atas seluruh antrean resep reguler. Stok obat emergensi di UGD wajib selalu terisi penuh, terkunci dengan segel bernomor, dan siap pakai 24 jam.',
    responsiblePersons: ['Apoteker Depo Farmasi UGD', 'Tenaga Vokasi Farmasi (TTK) Jaga UGD', 'Dokter Jaga UGD', 'Perawat Triase'],
    equipmentNeeded: ['Troli Emergensi UGD Tersegel', 'Lemari Penyimpanan Khusus Antidotum', 'Sistem Komputer e-Prescribing Cito Alert', 'Lemari Pendingin Obat Emergensi Suhu 2-8°C'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerimaan & Triase Resep CITO',
        description: 'Saat resep bertanda CITO / URGENT diterima di depo farmasi UGD, petugas farmasi segera menghentikan sementara penyiapan resep non-darurat dan memprioritaskan resep CITO tersebut secara instan.'
      },
      {
        stepNumber: 2,
        title: 'Skrining Cepat & Verifikasi Alergi Akut',
        description: 'Lakukan telaah resep cepat (indikasi gawat, rute pemberian IV/injeksi, dosis emergensi, kompatibilitas pelarut infus, dan riwayat syok anafilaksis/alergi obat) dalam waktu < 2 menit.'
      },
      {
        stepNumber: 3,
        title: 'Penyiapan Cepat Obat Emergensi & Pelarut Sesuai Protokol',
        description: 'Ambil obat dari rak fast-moving atau troli emergensi (misal: Epinefrin 1:1000, Amiodaron, Norepinefrin, Dextrose 40%, Atropin, Furosemid injeksi). Sertakan pelarut infus kompatibel (NaCl 0.9% atau D5W) dan spuit jarum suntik steril yang sesuai.'
      },
      {
        stepNumber: 4,
        title: 'Double-Check Keamanan & Pemberian Label Cito Jelas',
        description: 'Lakukan verifikasi ganda (double-check) oleh dua staf farmasi untuk memastikan kebenaran: nama obat, konsentrasi sediaan, volume, dan tanggal kedaluwarsa. Tempelkan etiket darurat bertuliskan dosis dan kecepatan tetesan infus bila diperlukan.'
      },
      {
        stepNumber: 5,
        title: 'Serah Terima Langsung ke Tim Resusitasi UGD',
        description: 'Serahkan obat langsung kepada perawat/dokter resusitasi dengan konfirmasi verbal metode Read-Back (Baca Ulang). Catat waktu penyerahan untuk audit Standar Pelayanan Minimal (SPM waktu tunggu resep Cito <= 15 menit).'
      }
    ],
    criticalChecklist: [
      'Apakah waktu tunggu penyiapan resep Cito tidak melebihi 15 menit?',
      'Apakah verifikasi ganda nama dan konsentrasi obat telah dilakukan sebelum diserahkan?',
      'Apakah stok troli emergensi yang terpakai langsung diganti dan disegel ulang?'
    ],
    relatedForms: ['Formulir Pemakaian Obat Emergensi UGD', 'Buku Register Resep Cito', 'Log Indikator Waktu Tunggu Pelayanan Farmasi UGD'],
    notes: 'Dalam kondisi henti jantung (Cardiac Arrest / Code Blue), obat emergensi di troli resusitasi dapat langsung digunakan terlebih dahulu oleh dokter/perawat, dan peresepan administratif disusulkan setelah resusitasi selesai.'
  },
  {
    id: 'sop-konseling-khusus-geriatri-pediatrik',
    docNumber: 'SOP/FAR-KLIN/021/2026',
    title: 'SOP Konseling & Edukasi Khusus Pasien Pediatrik, Geriatri, dan Pasien Polifarmasi Kronis',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Pedoman Konseling Pelayanan Kefarmasian Kemenkes RI'
    ],
    purpose: 'Meningkatkan kepatuhan terapi, mencegah kesalahan pemberian dosis obat pada anak (pediatrik), meminimalkan risiko jatuh dan kebingungan minum obat pada lansia (geriatri), serta mencegah interaksi merugikan pada pasien polifarmasi.',
    scope: 'Ruang Konseling Khusus Farmasi Rawat Jalan, Poli Geriatri, Poli Anak, dan Bangsal Rawat Inap.',
    policy: 'Konseling kefarmasian intensif wajib diberikan oleh Apoteker kepada: pasien geriatri usia >= 60 tahun dengan >= 5 obat, orang tua pasien pediatrik dengan obat racikan/alat bantu dosis khusus, serta pasien dengan regimen obat indeks terapi sempit.',
    responsiblePersons: ['Apoteker Konseling', 'Pasien / Keluarga Pasien / Pendamping Pengasuh (Caregiver)'],
    equipmentNeeded: ['Ruang Konseling Farmasi Privat Nyaman', 'Alat Peraga Edukasi (Inhaler Dummy, Pen Insulin Trainer, Spuit Oral, Sendok Takar Obat)', 'Brosur & Lembar Informasi Obat (LIO)', 'Pillbox / Kotak Pengatur Obat Mingguan'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Identifikasi Pasien Kriteria Wajib Konseling',
        description: 'Petugas farmasi memanggil pasien rawat jalan dengan kriteria khusus dan mempersilakan masuk ke ruang konseling farmasi yang tenang dan tertutup.'
      },
      {
        stepNumber: 2,
        title: 'Penerapan Three Prime Questions & Bina Hubungan',
        description: 'Buka sesi dengan salam, perkenalan diri, dan ajukan 3 Pertanyaan Utama: 1) Apa yang dokter sampaikan tentang obat Anda?, 2) Bagaimana cara dokter menjelaskan cara minum obat ini?, 3) Apa harapan yang dokter sampaikan setelah minum obat ini?'
      },
      {
        stepNumber: 3,
        title: 'Konseling Khusus Pediatrik (Orang Tua / Pengasuh)',
        description: 'Edukasi cara pengukuran dosis cair menggunakan spuit oral mililiter (bukan sendok makan rumah tangga), cara rekonstitusi antibiotik kering dengan air matang dingin, kestabilan sirup pasca-buka (BUD), dan trik memberikan obat pada anak tanpa memicu muntah.'
      },
      {
        stepNumber: 4,
        title: 'Konseling Khusus Geriatri & Polifarmasi',
        description: 'Susun jadwal minum obat harian bergambar/warna yang mudah dibaca, pisahkan obat pagi/siang/malam, edukasi efek samping hipotensi ortostatik (bangun perlahan dari tidur), dan berikan rekomendasi penggunaan kotak obat bersekat (pillbox).'
      },
      {
        stepNumber: 5,
        title: 'Verifikasi Pemahaman dengan Metode Teach-Back & Show-and-Tell',
        description: 'Minta pasien atau orang tua untuk mengulang kembali instruksi utama cara minum obat, dosis, dan mendemonstrasikan cara pemakaian alat khusus (inhaler/insulin) hingga benar-benar fasih.'
      },
      {
        stepNumber: 6,
        title: 'Dokumentasi Konseling & Kontak Layanan Konsultasi',
        description: 'Catat kegiatan konseling pada Formulir Dokumentasi Konseling Farmasi dan berikan nomor kontak WhatsApp Apotek/RS untuk konsultasi obat lanjutan bila timbul keluhan di rumah.'
      }
    ],
    criticalChecklist: [
      'Apakah Three Prime Questions diajukan pada awal konseling?',
      'Apakah orang tua pasien pediatrik diedukasi menggunakan alat takar mililiter yang presisi?',
      'Apakah pemahaman pasien telah diverifikasi dengan metode Teach-Back?'
    ],
    relatedForms: ['Formulir Dokumentasi Konseling Farmasi', 'Kartu Jadwal Minum Obat Pasien', 'Lembar Kuesioner Kepuasan Konseling'],
    notes: 'Hindari penggunaan istilah medis asing (jargon). Gunakan bahasa yang sederhana, ramah, empatik, dan mudah dimengerti oleh pasien lansia dan keluarga.'
  },
  {
    id: 'sop-tpn-nutrisi-parenteral',
    docNumber: 'SOP/FAR-KLIN/022/2026',
    title: 'SOP Penyiapan Nutrisi Parenteral Total (TPN / Total Parenteral Nutrition) Aseptis',
    category: 'klinis',
    categoryLabel: 'Pelayanan Farmasi Klinis',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Pedoman Dasar Dispensing Sediaan Steril Kemenkes RI',
      'USP General Chapter <797> Pharmaceutical Compounding - Sterile Preparations'
    ],
    purpose: 'Menjamin sediaan nutrisi parenteral total (TPN) disiapkan secara aseptis bebas pirogen dan mikroba, mencegah presipitasi kalsium-fosfat yang mematikan, serta memenuhi kebutuhan makronutrien dan mikronutrien individual pasien yang tidak dapat menerima nutrisi enteral.',
    scope: 'Ruang Bersih Steril (Cleanroom Kelas A/B) Instalasi Farmasi Rumah Sakit dan Bangsal ICU/NICU/PICU.',
    policy: 'Pencampuran TPN wajib dilakukan di dalam Laminar Air Flow (LAF) horizontal/vertikal oleh Apoteker dan TTK yang telah tersertifikasi pelatihan Aseptic Dispensing resmi.',
    responsiblePersons: ['Apoteker Spesialis Nutrisi Parenteral / Steril', 'Tenaga Teknis Kefarmasian Terlatih Dispensing Steril', 'Dokter Spesialis Tim Terapi Nutrisi (KTGN)'],
    equipmentNeeded: ['Laminar Air Flow (LAF) ISO Class 5', 'Kantong TPN Khusus Bebas DEHP (EVA Bag)', 'Automated TPN Compounder / Spuit Dispensing Steril', 'Filter In-line 1.2 mikron (untuk emulsi lipid) & 0.22 mikron (larutan 2-in-1)', 'Bahan Baku Asam Amino, Dextrose Konsentrat, Emulsi Lipid, Elektrolit & Trace Elements'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Kajian Regimen Nutrisi & Kalkulasi Kompatibilitas Kimia',
        description: 'Apoteker menghitung total kalori harian, rasio kalori:nitrogen, osmolaritas larutan (jalur perifer < 900 mOsm/L; jalur sentral > 900 mOsm/L), serta mengevaluasi kurva kelarutan presipitasi Kalsium Glukonat dan Kalium Fosfat sebelum pencampuran.'
      },
      {
        stepNumber: 2,
        title: 'Preparasi Petugas & Cuci Tangan Aseptis',
        description: 'Petugas memakai baju steril terusan bebas serat (overall bunny suit), penutup kepala, masker bedah, kacamata goggle, penutup sepatu, dan sarung tangan steril bebas bedak di ruang antara (anteroom) setelah cuci tangan bedah 6 langkah.'
      },
      {
        stepNumber: 3,
        title: 'Desinfeksi LAF & Pengaturan Urutan Pencampuran Bahan',
        description: 'Bersihkan meja LAF dengan Alkohol 70% steril dari arah atas ke bawah dan belakang ke depan. Urutan pencampuran larutan 3-in-1 (All-in-One): 1) Masukkan Asam Amino dan Dextrose ke kantong EVA, 2) Tambahkan Fosfat terlebih dahulu ke asam amino lalu campur merata, 3) Tambahkan Kalsium di akhir dengan volume larutan maksimal untuk mencegah presipitasi, 4) Masukkan Emulsi Lipid di tahap paling akhir.'
      },
      {
        stepNumber: 4,
        title: 'Inspeksi Visual Partikel, Emulsi & Kebocoran',
        description: 'Lakukan inspeksi visual di bawah latar belakang hitam dan putih untuk mendeteksi adanya partikel asing, kristal presipitasi kalsium-fosfat, retakan emulsi (cracking/oiling out), dan periksa kekedapan segel kantong TPN.'
      },
      {
        stepNumber: 5,
        title: 'Pelabelan Lengkap, BUD & Penyimpanan Terlindung Cahaya',
        description: 'Tempelkan etiket steril memuat: nama pasien, nomor RM, komposisi lengkap tiap mikronutrien, osmolaritas, rute (Vena Sentral/Perifer), kecepatan infus (mL/jam), tanggal racik dan Beyond Use Date (BUD 24 jam pada suhu ruang atau 48-72 jam pada suhu 2-8°C). Bungkus kantong TPN dengan kantong pelindung UV kuning/amber.'
      }
    ],
    criticalChecklist: [
      'Apakah kompatibilitas kalsium-fosfat telah diverifikasi dengan kurva kelarutan?',
      'Apakah rute akses (Vena Sentral vs Perifer) sesuai dengan osmolaritas larutan?',
      'Apakah kantong TPN dibungkus penutup anti-cahaya (light-resistant bag)?'
    ],
    relatedForms: ['Lembar Permintaan & Perhitungan Nutrisi Parenteral (TPN Order Form)', 'Log Harian Pembersihan & Uji Partikel LAF', 'Form Kontrol Mutu Visual Sediaan Steril TPN'],
    notes: 'Jika terlihat tanda ketidakstabilan emulsi lipid berupa tetesan minyak mengapung di permukaan kantong (*phase separation/cracking*), TPN KONTRAINDIKASI MUTLAK DIBERIKAN KARENA DAPAT MEMICU EMBOLI PARU FATAL.'
  },
  {
    id: 'sop-perencanaan-pengadaan-ven-abc',
    docNumber: 'SOP/FAR-LOG/023/2026',
    title: 'SOP Perencanaan & Pengadaan Perbekalan Farmasi (Metode Konsumsi, Morbiditas & Analisis VEN-ABC)',
    category: 'logistik',
    categoryLabel: 'Pengelolaan & Logistik Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 & Permenkes No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian',
      'Pedoman Pengelolaan Obat Publik dan Perbekalan Kesehatan Kemenkes RI',
      'Petunjuk Teknis Standar Pelayanan Kefarmasian di Puskesmas & RS'
    ],
    purpose: 'Menjamin ketersediaan obat dan alat kesehatan yang bermutu tinggi, aman, rasional, dan terjangkau; mencegah kekosongan stok obat vital; serta mengoptimalkan efisiensi anggaran belanja farmasi melalui perencanaan terstruktur berbasis data historis dan epidemiologi.',
    scope: 'Gudang Farmasi, Instalasi Farmasi, Tim Komite Farmasi & Terapi (KFT), dan Bagian Keuangan/Pengadaan.',
    policy: 'Perencanaan pengadaan obat dilakukan secara periodik mengacu pada Formularium Nasional (Fornas) dan Formularium Rumah Sakit/Apotek dengan mengombinasikan Metode Konsumsi, Metode Morbiditas (Pola Penyakit), serta Analisis Matriks Matriks Gabungan VEN-ABC.',
    responsiblePersons: ['Apoteker Penanggung Jawab Pengadaan', 'Apoteker Kepala Gudang Farmasi', 'Pejabat Pembuat Komitmen (PPK) / Pemilik Sarana'],
    equipmentNeeded: ['Sistem Informasi Manajemen Rumah Sakit (SIMRS) / Software Farmasi Apotek', 'Data Laporan Mutasi Stok dan Laporan Pemakaian Obat Tahunan', 'Data 10 Besar Penyakit Terbanyak dari Rekam Medis', 'Formularium Rumah Sakit & Buku Daftar Harga Netto Apotek (HNA) PBF'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Rekapitulasi Data Pemakaian Riil (Metode Konsumsi)',
        description: 'Tarik data konsumsi rata-rata bulanan (Consumption Rate / CA) dari SIMRS selama periode 12 bulan terakhir. Bersihkan data dari bias kekosongan stok (*stock-out days*) untuk mendapatkan konsumsi riil normal.'
      },
      {
        stepNumber: 2,
        title: 'Penghitungan Stok Pengaman (Safety Stock) & Waktu Tunggu (Lead Time)',
        description: 'Hitung stok pengaman (Safety Stock = Lead Time × Konsumsi Rata-rata Harian) dan tentukan Titik Pemesanan Kembali (Reorder Point / ROP = [Lead Time × Konsumsi Harian] + Safety Stock) untuk setiap item obat.'
      },
      {
        stepNumber: 3,
        title: 'Integrasi Pola Epidemiologi Penyakit (Metode Morbiditas)',
        description: 'Lakukan penyesuaian kebutuhan terhadap potensi lonjakan kasus musiman (misal: Demam Berdarah Dengue pada musim hujan, ISPA, Diare) berdasarkan pedoman pengobatan baku klinis.'
      },
      {
        stepNumber: 4,
        title: 'Klasifikasi Matriks Gabungan VEN - ABC',
        description: 'Petakan perbekalan farmasi ke dalam 9 kuadran matriks VEN-ABC: Kategori V (Vital: Adrenalin, Insulin, Oksigen, Vaksin), E (Esensial: Antibiotik, Antihipertensi, Antidiabetes), N (Non-Esensial: Vitamin suplemen). Kategori A (Serapan dana 70%), B (20%), C (10%).'
      },
      {
        stepNumber: 5,
        title: 'Rasionalisasi & Penyesuaian Anggaran',
        description: 'Jika anggaran terbatas, terapkan prioritas alokasi: Pertahankan kelompok VA, VB, VC, EA, EB. Lakukan efisiensi atau eliminasi bertahap pada kelompok NA (Non-Esensial nilai investasi tinggi) dan NB.'
      },
      {
        stepNumber: 6,
        title: 'Penerbitan Rencana Kebutuhan Obat (RKO) & Surat Pesanan',
        description: 'Buat dokumen Rencana Anggaran Belanja (RAB) / Rencana Kebutuhan Obat (RKO) untuk disahkan oleh Pimpinan/KFT sebelum diterbitkan Surat Pesanan resmi ke PBF berizin CDOB.'
      }
    ],
    criticalChecklist: [
      'Apakah perhitungan konsumsi telah disesuaikan dengan stok pengaman dan lead time PBF?',
      'Apakah obat yang dipesan tercantum dalam Formularium resmi?',
      'Apakah analisis matriks VEN-ABC telah diterapkan dalam rasionalisasi anggaran?'
    ],
    relatedForms: ['Dokumen Rencana Kebutuhan Obat (RKO)', 'Lembar Matriks Analisis VEN-ABC', 'Formulir Evaluasi Usulan Obat Baru KFT'],
    notes: 'Evaluasi akurasi perencanaan pengadaan dilakukan setiap triwulan dengan membandingkan nilai *Turn Over Ratio* (TOR) dan persentase obat mati (*death stock* < 1%).'
  },
  {
    id: 'sop-penerimaan-faktur-pbf',
    docNumber: 'SOP/FAR-LOG/024/2026',
    title: 'SOP Penerimaan Barang, Pemeriksaan Fisik & Verifikasi Faktur PBF Berizin CDOB',
    category: 'logistik',
    categoryLabel: 'Pengelolaan & Logistik Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72/2016, Permenkes No. 73/2016, Permenkes No. 74/2016',
      'Peraturan BPOM tentang Penerapan Pedoman Cara Distribusi Obat yang Baik (CDOB)',
      'Permenkes RI No. 3 Tahun 2015 tentang Peredaran, Penyimpanan, Pemusnahan, dan Pelaporan Narkotika, Psikotropika, dan Prekursor Farmasi'
    ],
    purpose: 'Memastikan seluruh perbekalan farmasi yang diterima dari Pedagang Besar Farmasi (PBF) resmi sesuai dengan Surat Pesanan (SP), memiliki keutuhan fisik kemasan bermutu baik, nomor izin edar BPOM valid, nomor batch terverifikasi, tanggal kedaluwarsa (ED) aman, serta terbebas dari peredaran obat palsu/ilegal.',
    scope: 'Area Penerimaan Barang Gudang Farmasi, Apotek, Klinik, Puskesmas, dan Rumah Sakit.',
    policy: 'Penerimaan barang wajib dilakukan dan diverifikasi langsung oleh Apoteker Penanggung Jawab (APJ) atau Tenaga Teknis Kefarmasian (TTK) yang memiliki surat delegasi resmi.',
    responsiblePersons: ['Apoteker Penanggung Jawab Gudang/Apotek', 'Tenaga Teknis Kefarmasian Bagian Logistik', 'Kurir / Petugas Pengantar PBF'],
    equipmentNeeded: ['Arsip Surat Pesanan (SP) Asli / Salinan', 'Termometer Inframerah Digital / Calibrated Data Logger', 'Cutter & Meja Pemeriksaan Bersih', 'Cap Stempel Penerimaan Farmasi Resmi & Pulpen'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Verifikasi Legalitas Pengirim & Kecocokan Surat Pesanan (SP)',
        description: 'Periksa keabsahan identitas kurir dan legalitas PBF pengirim. Cocokkan Faktur / Surat Pengantar Barang (SPB) dengan arsip Surat Pesanan (SP) meliputi: nama sarana pemesan, jenis obat, bentuk sediaan, kekuatan dosis, dan jumlah kuantitas.'
      },
      {
        stepNumber: 2,
        title: 'Pemeriksaan Integritas Fisik Kemasan & Izin Edar BPOM',
        description: 'Periksa segel kemasan primer dan sekunder, pastikan tidak ada kebocoran, botol pecah, strip rusak, blister sobek, label pudar, atau perubahan warna/bentuk sediaan. Periksa keaslian Nomor Izin Edar (NIE) BPOM (misal: DKL/GKL untuk obat keras, DTL untuk bebas terbatas).'
      },
      {
        stepNumber: 3,
        title: 'Pemeriksaan Khusus Produk Rantai Dingin (Cold Chain)',
        description: 'Untuk vaksin, insulin, dan sediaan termolabil: SEGERA periksa suhu cool box sebelum kurir pergi. Pastikan es pendingin (ice pack) masih beku, indikator termometer berada pada rentang 2°C - 8°C (atau <= -20°C untuk vaksin beku), periksa Vaccine Vial Monitor (VVM kondisi A/B), dan lakukan uji kocok (shake test) jika dicurigai beku.'
      },
      {
        stepNumber: 4,
        title: 'Pemeriksaan Nomor Batch & Masa Kedaluwarsa (Expired Date)',
        description: 'Cocokkan nomor batch pada fisik sediaan dengan nomor batch yang tercetak di lembar faktur. Pastikan masa kedaluwarsa obat minimal 2 TAHUN (atau disetujui perjanjian khusus untuk sediaan fast moving / radiofarmaka).'
      },
      {
        stepNumber: 5,
        title: 'Penandatanganan Faktur & Legalisasi Stempel',
        description: 'Bila seluruh parameter sesuai, Apoteker menandatangani faktur asli dan salinan, mencantumkan nama lengkap, nomor SIPA, tanggal dan jam penerimaan, serta membubuhkan stempel resmi apotek/instansi farmasi. Berikan lembar faktur kembali kepada kurir dan simpan arsip faktur farmasi.'
      },
      {
        stepNumber: 6,
        title: 'Input Data Kartu Stok & Penyimpanan Cepat',
        description: 'Input data penerimaan barang ke dalam SIMRS/Sistem Kartu Stok Digital (nama obat, PBF, nomor batch, ED, jumlah masuk, harga beli). Segera pindahkan obat ke rak penyimpanan sesuai prinsip FIFO/FEFO dan regulasi khusus (LASA/Narkotika).'
      }
    ],
    criticalChecklist: [
      'Apakah penerimaan dilakukan langsung oleh Apoteker / TTK ber-SIPA?',
      'Apakah nomor batch dan ED pada fisik barang identik dengan faktur?',
      'Apakah produk rantai dingin (vaksin/insulin) suhunya diukur dan langsung disimpan di kulkas 2-8°C?'
    ],
    relatedForms: ['Buku Ekspedisi Penerimaan Barang Farmasi', 'Lembar Faktur Asli & Surat Pengantar Barang (SPB)', 'Formulir Berita Acara Ketidaksesuaian / Retur Barang'],
    notes: 'Jika barang rusak, suhu cold chain > 8°C, nomor batch tidak cocok, atau masa ED terlalu pendek, APOTEKER BERHAK DAN WAJIB MENOLAK PENERIMAAN BARANG dan menuliskan Berita Acara Retur Pengembalian.'
  },
  {
    id: 'sop-distribusi-udd-floorstock',
    docNumber: 'SOP/FAR-LOG/025/2026',
    title: 'SOP Distribusi Obat Sistem Unit Dose Dispensing (UDD) & Floor Stock Terbatas Rawat Inap',
    category: 'logistik',
    categoryLabel: 'Pengelolaan & Logistik Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Standar Akreditasi Rumah Sakit STARKES - Pokja PKPO Distribusi Obat',
      'Pedoman Sistem Distribusi Obat di Rumah Sakit Kemenkes RI'
    ],
    purpose: 'Meningkatkan keselamatan pasien (patient safety), mencegah kesalahan pemberian obat oleh perawat di bangsal rawat inap (wrong drug, wrong dose, wrong time), meminimalkan sisa obat retur yang terbuang, serta memastikan pencatatan pemakaian obat akurat dan transparan secara per-dosis minum.',
    scope: 'Depo Farmasi Rawat Inap, Ruang Peracikan UDD, dan Seluruh Ruang Perawatan Rawat Inap.',
    policy: 'Distribusi obat untuk pasien rawat inap dilaksanakan dengan Sistem Unit Dose Dispensing (UDD) untuk kebutuhan 24 jam yang dibagi per waktu konsumsi. Sistem Floor Stock (Persediaan Ruangan) hanya diperbolehkan sangat terbatas untuk cairan infus dasar dan obat emergensi resusitasi.',
    responsiblePersons: ['Apoteker Depo Farmasi Rawat Inap', 'Tenaga Teknis Kefarmasian Dispensing UDD', 'Perawat Penanggung Jawab Pasien (PPJP)'],
    equipmentNeeded: ['Troli Distribusi Obat UDD dengan Laci Berlabel Nama Pasien & No. Bed', 'Plastik Klip / Kemasan Strip UDD Khusus Bersekat', 'Mesin Pengemas Otomatis Unit Dose (Blister Sealer / Unit Dose Sachet)', 'Lembar Instruksi Pengobatan Elektronik (e-MAR / CPO)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Skrining & Verifikasi Instruksi Obat Harian (CPO / e-Prescribing)',
        description: 'Apoteker menelaah lembar Catatan Pemberian Obat (CPO) harian pasien yang divalidasi dokter. Pastikan tidak ada duplikasi terapi, interaksi obat baru, atau perubahan dosis akibat hasil laboratorium terkini.'
      },
      {
        stepNumber: 2,
        title: 'Penyiapan & Pengemasan Obat Per-Dosis Waktu Minum',
        description: 'Petugas farmasi mengambil obat dari rak penyimpanan dan mengemas obat ke dalam kantong unit dose tersendiri untuk setiap waktu minum spesifik: Pagi (07.00), Siang (12.00), Sore (18.00), dan Malam (21.00).'
      },
      {
        stepNumber: 3,
        title: 'Pemberian Labeling Etiket Lengkap pada Tiap Kantong Dosis',
        description: 'Tiap kantong dosis tunggal wajib memuat etiket: Nama Pasien, Nomor RM, Tanggal Lahir, Nama Bangsal/No. Bed, Nama Obat, Kekuatan Dosis, Rute, Jadwal Jam Minum, dan Tanggal Penyiapan.'
      },
      {
        stepNumber: 4,
        title: 'Penataan ke Dalam Laci Troli UDD Pasien',
        description: 'Masukkan paket obat unit dose 24 jam ke dalam laci troli UDD yang bertuliskan nama pasien dan nomor tempat tidur yang bersangkutan.'
      },
      {
        stepNumber: 5,
        title: 'Serah Terima & Verifikasi Ganda Bersama Perawat Ruangan',
        description: 'Petugas farmasi mengantar troli UDD ke bangsal perawatan. Lakukan serah terima dan *Double-Check* bersama perawat ruangan dengan mencocokkan fisik obat terhadap lembar CPO/e-MAR. Kedua pihak menandatangani buku serah terima UDD.'
      },
      {
        stepNumber: 6,
        title: 'Pengembalian & Rekonsiliasi Obat Sisa / Stop Terapi',
        description: 'Jika ada obat yang dihentikan (discontinue) oleh DPJP atau pasien pulang/meninggal, sisa obat unit dose yang belum terbuka diambil kembali oleh farmasi dan dilakukan retur mutasi pada sistem SIMRS.'
      }
    ],
    criticalChecklist: [
      'Apakah setiap kantong unit dose memiliki etiket identitas pasien dan jam minum yang jelas?',
      'Apakah serah terima troli UDD dilakukan verifikasi ganda bersama perawat ruangan?',
      'Apakah obat yang distop dokter langsung diretur ke farmasi?'
    ],
    relatedForms: ['Lembar Catatan Pemberian Obat (CPO / e-MAR)', 'Buku Ekspedisi Serah Terima Obat UDD', 'Formulir Retur Obat Rawat Inap'],
    notes: 'Sediaan sirup dan tetes mata/telinga diserahkan dalam kemasan botol utuh bertuliskan Beyond Use Date (BUD) dan tetap disimpan di laci pasien hingga terapi selesai.'
  },
  {
    id: 'sop-pengelolaan-gas-medis-oksigen',
    docNumber: 'SOP/FAR-LOG/026/2026',
    title: 'SOP Pengelolaan Tabung Gas Medis (Oksigen) & Sistem Instalasi Gas Medis Sentral',
    category: 'logistik',
    categoryLabel: 'Pengelolaan & Logistik Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 4 Tahun 2016 tentang Penggunaan Gas Medik dan Vakum Medik pada Fasilitas Pelayanan Kesehatan',
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Pedoman K3 Rumah Sakit & Standar Keselamatan Pasien'
    ],
    purpose: 'Menjamin ketersediaan gas medis (Oksigen O2, Nitrogen Oksida N2O, Udara Tekan Medis) yang berkesinambungan dengan kemurnian medis standar Farmakope (kemurnian O2 >= 99.5%), mencegah bahaya kebakaran dan ledakan tabung gas bertekanan tinggi, serta memastikan sistem alarm gas sentral berfungsi optimal.',
    scope: 'Gudang Tabung Gas Medis, Ruang Manifold Sentral Gas, Ruang Perawatan, UGD, OK Kamar Bedah, dan ICU.',
    policy: 'Gas medis adalah sediaan farmasi yang pengelolaannya berada di bawah pengawasan Instalasi Farmasi bekerjasama dengan Instalasi Pemeliharaan Sarana Rumah Sakit (IPSRS). Tabung gas medis wajib dipisahkan antara tabung isi dan tabung kosong, diberi rantai pengaman, dan dicatat tekanannya secara harian.',
    responsiblePersons: ['Apoteker Penanggung Jawab Logistik Gas Medis', 'Teknisi IPSRS / Petugas Gas Medis', 'Perawat Penanggung Jawab Ruangan'],
    equipmentNeeded: ['Ruang Manifold Gas Medis Berventilasi Terbuka', 'Rantai Pengikat Tabung / Rak Tabung Gas Anti-Roboh', 'Troli Pengangkut Tabung Khusus', 'Regulator Gas Medis & Flowmeter Oksigen', 'Alat Pemadam Api Ringan (APAR) CO2/Powder'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerimaan & Pemeriksaan Kualitas Tabung dari Distributor',
        description: 'Periksa sertifikat analisis kemurnian gas (Certificate of Analysis), warna standar tabung (Oksigen Medis = PUTIH atau HIJAU; N2O = BIRU), tutup pengaman katup (cap valve), masa uji hidrostatis tabung (Hydrotest tidak boleh kedaluwarsa), dan periksa tidak adanya bau/kebocoran pada katup menggunakan busa sabun.'
      },
      {
        stepNumber: 2,
        title: 'Penyimpanan Aman Sesuai Standar Keselamatan K3',
        description: 'Simpan tabung di ruangan khusus berventilasi baik, berlantai rata, terlindung dari panas sinar matahari langsung dan sumber api. PISAHKAN SECARA TEGAS DENGAN ZONA BERTANDA: 1) "TABUNG ISI" dan 2) "TABUNG KOSONG". Pasang rantai pengaman anti-roboh pada seluruh tabung yang berdiri.'
      },
      {
        stepNumber: 3,
        title: 'Pemantauan Tekanan Manifold Sistem Gas Sentral Harian',
        description: 'Petugas memeriksa dan mencatat tekanan manometer manifold sentral minimal 2 kali sehari (pagi dan sore). Pastikan tekanan kerja berada pada rentang standar (Oksigen: 4.0 - 5.0 bar atau 55-60 psi). Lakukan pergantian otomatis ke bank tabung cadangan bila tekanan turun di bawah batas kritis.'
      },
      {
        stepNumber: 4,
        title: 'Distribusi & Transportasi Tabung Gas ke Ruangan',
        description: 'Gunakan troli khusus tabung gas yang memiliki rantai pengikat saat memindahkan tabung ke bangsal atau UGD. DILARANG MENYERET, MENGGELINDINGKAN SECARA HORIZONTAL, ATAU MEMBANTING TABUNG GAS.'
      },
      {
        stepNumber: 5,
        title: 'Pemasangan Regulator & Humidifier Steril di Pasien',
        description: 'Pasang regulator dan flowmeter dengan tangan bersih bebas minyak/oli (pelumas minyak pada katup oksigen murni dapat memicu percikan api ledakan spontan). Isi botol humidifier dengan Water for Irrigation / Aquades steril hingga batas garis dan ganti cairan setiap 24 jam.'
      }
    ],
    criticalChecklist: [
      'Apakah seluruh tabung gas medis diikat dengan rantai pengaman?',
      'Apakah area tabung isi dan tabung kosong terpisah secara jelas?',
      'Apakah regulator oksigen bebas dari kontaminasi minyak/gemuk/oli?'
    ],
    relatedForms: ['Log Harian Tekanan Gas Medis Sentral', 'Kartu Kontrol Inventaris Tabung Oksigen', 'Formulir Pemeliharaan dan Uji Kebocoran Instalasi Gas'],
    notes: 'DILARANG KERAS merokok atau menyalakan sumber api di radius minimal 10 meter dari area penyimpanan gas medis. Pasang rambu "DILARANG MEROKOK - GAS MEDIS MUDAH TERBAKAR".'
  },
  {
    id: 'sop-pelaporan-sipnap-kemenkes',
    docNumber: 'SOP/FAR-REG/027/2026',
    title: 'SOP Pelaporan Narkotika, Psikotropika & Prekursor Elektronik Melalui SIPNAP Kemenkes RI',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Undang-Undang RI No. 35 Tahun 2009 tentang Narkotika',
      'Permenkes RI No. 3 Tahun 2015 tentang Peredaran, Penyimpanan, Pemusnahan, dan Pelaporan Narkotika, Psikotropika, dan Prekursor Farmasi',
      'Petunjuk Teknis Penggunaan Sistem Informasi Pelaporan Narkotika dan Psikotropika (SIPNAP) Kemenkes RI'
    ],
    purpose: 'Menjamin kepatuhan regulasi hukum pelaporan peredaran obat golongan Narkotika, Psikotropika, dan Prekursor Farmasi secara transparan, mencegah potensi penyalahgunaan dan diversi obat, serta menyinkronkan data pemakaian riil sarana farmasi dengan Kementerian Kesehatan dan BPOM.',
    scope: 'Instalasi Farmasi Rumah Sakit, Apotek, Klinik, dan Puskesmas.',
    policy: 'Pelaporan SIPNAP wajib dilakukan secara elektronik oleh Apoteker Penanggung Jawab (APJ) setiap 1 (satu) bulan sekali paling lambat tanggal 10 pada bulan berikutnya, termasuk pelaporan nihil jika tidak ada transaksi.',
    responsiblePersons: ['Apoteker Penanggung Jawab Sarana (APJ)', 'Dinas Kesehatan Kabupaten/Kota', 'Balai Besar POM Setempat'],
    equipmentNeeded: ['Komputer Terhubung Internet', 'Akun & Password Resmi Portal SIPNAP Kemenkes (sipnap.kemkes.go.id)', 'Buku Register Resep Narkotika/Psikotropika', 'Kartu Stok Fisik & Data SIMRS / Software Apotek'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Tutup Buku & Rekapitulasi Mutasi Stok Akhir Bulan',
        description: 'Pada hari terakhir setiap akhir bulan (tanggal 30/31), Apoteker melakukan tutup buku stok narkotika, psikotropika, dan prekursor. Hitung saldo awal, total penerimaan dari PBF (berdasarkan nomor faktur), total pengeluaran resep dokter, dan saldo akhir fisik.'
      },
      {
        stepNumber: 2,
        title: 'Stock Opname Fisik & Penyesuaian Selisih',
        description: 'Lakukan pemeriksaan fisik langsung ke dalam lemari khusus narkotika/psikotropika berpintu ganda terkunci. Pastikan jumlah fisik obat (tablet, ampul, patch, botol) sama persis dengan kartu stok. Jika ada selisih, telusuri resep dokter yang belum tercatat sebelum membuat laporan.'
      },
      {
        stepNumber: 3,
        title: 'Login ke Portal SIPNAP Kemenkes',
        description: 'Akses website resmi https://sipnap.kemkes.go.id menggunakan username nomor izin sarana (SIA/SIFRS) dan kata sandi resmi APJ.'
      },
      {
        stepNumber: 4,
        title: 'Input Data Penerimaan & Pengeluaran Perbekalan Farmasi',
        description: 'Input data transaksi bulanan: 1) Penerimaan: Masukkan nama PBF distributor, nomor faktur, tanggal faktur, nomor batch, dan jumlah masuk. 2) Pengeluaran: Masukkan jumlah obat yang diserahkan berdasarkan resep dokter, nama dokter peresep, dan data pasien (atau upload file Excel template SIPNAP).'
      },
      {
        stepNumber: 5,
        title: 'Verifikasi Validasi Data & Pengiriman Laporan (Submit)',
        description: 'Periksa kembali rekapitulasi data saldo akhir pada sistem SIPNAP untuk memastikan tidak ada kesalahan input angka atau satuan sediaan. Klik tombol "KIRIM / SUBMIT LAPORAN" selambat-lambatnya tanggal 10.'
      },
      {
        stepNumber: 6,
        title: 'Pencetakan Bukti Tanda Terima Laporan & Pengarsipan',
        description: 'Unduh dan cetak Lembar Bukti Tanda Terima Laporan SIPNAP yang memiliki barcode resmi Kemenkes. Simpan berkas bukti lapor bersama arsip resep narkotika/psikotropika selama minimal 3-5 tahun.'
      }
    ],
    criticalChecklist: [
      'Apakah laporan SIPNAP disubmit paling lambat tanggal 10 setiap bulan?',
      'Apakah saldo akhir pada laporan SIPNAP sama persis dengan stok fisik lemari narkotika?',
      'Apakah bukti tanda terima lapor elektronik telah dicetak dan diarsipkan?'
    ],
    relatedForms: ['Lembar Rekapitulasi Kartu Stok Narkotika & Psikotropika', 'Bukti Tanda Terima Lapor SIPNAP Elektronik Kemenkes', 'Buku Register Catatan Peresepan Narkotika'],
    notes: 'Keterlambatan atau kelalaian pelaporan SIPNAP dapat dikenakan sanksi administratif berupa peringatan tertulis, penghentian sementara kegiatan, hingga pencabutan izin sarana oleh Dinas Kesehatan / BPOM.'
  },
  {
    id: 'sop-elektrolit-konsentrat-tinggi',
    docNumber: 'SOP/FAR-REG/028/2026',
    title: 'SOP Pengelolaan Elektrolit Konsentrat Tinggi (High Alert Concentrated Electrolytes)',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '03',
    legalBasis: [
      'Permenkes RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
      'Standar Akreditasi Rumah Sakit STARKES - Sasaran Keselamatan Pasien (SKP 3: Peningkatan Keamanan Obat High Alert)',
      'Institute for Safe Medication Practices (ISMP) Guidelines on High-Alert Medications'
    ],
    purpose: 'Mencegah insiden kematian (sentinel event) dan henti jantung mendadak akibat kesalahan fatal penyuntikan elektrolit konsentrat pekat secara langsung (bolus IV tanpa pengenceran), membatasi akses penyimpanan hanya di unit kritis, serta memastikan verifikasi ganda (double-check) ketat sebelum pemberian.',
    scope: 'Instalasi Farmasi, Depo Farmasi Rawat Inap, ICU, ICCU, NICU, PICU, Kamar Operasi, dan UGD.',
    policy: 'Elektrolit konsentrat pekat (KCl 7.46%, NaCl 3%, MgSO4 20% & 40%, Natrium Bikarbonat 8.4%, Dextrose 40%) DILARANG DISIMPAN DI RUANG RAWAT INAP UMUM. Penyimpanan hanya diizinkan di Farmasi dan Unit Perawatan Intensif terkunci dengan penandaan stiker merah menyala.',
    responsiblePersons: ['Apoteker Penanggung Jawab High Alert', 'Perawat Ruang Intensif (ICU/NICU)', 'Dokter Spesialis Anestesi / Intensivis'],
    equipmentNeeded: ['Stiker Merah Menyala Bertuliskan "HIGH ALERT - ELEKTROLIT KONSENTRAT - HARUS DIENCERKAN SEBELUM DIGUNAKAN"', 'Lemari Terkunci Khusus High Alert', 'Syringe Pump / Infusion Pump Presisi', 'Pelarut Pengencer Steril (NaCl 0.9% / D5W)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Restriksi Lokasi Penyimpanan di Rumah Sakit',
        description: 'Terapkan kebijakan pembatasan: Elektrolit konsentrat tinggi TIDAK BOLEH berada di troli bangsal rawat inap biasa. Sediaan ini hanya disimpan di Instalasi Farmasi, ICU/ICCU, dan Kamar Operasi dalam lemari khusus bersegel/terkunci.'
      },
      {
        stepNumber: 2,
        title: 'Penempelan Label Peringatan Khusus High Alert',
        description: 'Setiap ampul/vial/flakon elektrolit pekat (KCl 7.46%, NaCl 3%, MgSO4 40%, D40%) WAJIB ditempeli stiker warna MERAH kontras dengan tulisan tebal: "HIGH ALERT - HARUS DIENCERKAN - TIDAK BOLEH BOLUS LANGSUNG".'
      },
      {
        stepNumber: 3,
        title: 'Skrining Peresepan & Perhitungan Kecepatan Infus Maksimal',
        description: 'Apoteker menelaah resep dokter: Verifikasi kadar kalium/natrium serum awal pasien, hitung volume pengenceran (misal: KCl maksimal 20-40 mEq dalam 500-1000 mL cairan infus), dan pastikan kecepatan infus tidak melebihi 10-20 mEq/jam melalui syringe pump atau vena sentral.'
      },
      {
        stepNumber: 4,
        title: 'Proses Pengenceran Homogen di Ruang Farmasi',
        description: 'Campurkan elektrolit pekat ke dalam kantong cairan infus secara aseptis, bolak-balik kantong infus minimal 5 kali agar larutan terdistribusi homogen sempurna (mencegah pooling kalium pekat di dasar kantong).'
      },
      {
        stepNumber: 5,
        title: 'Prosedur Verifikasi Ganda Independen (Independent Double-Check)',
        description: 'Sebelum diserahkan dan sebelum diinjeksikan ke pasien, dua petugas kesehatan (Apoteker-TTK atau 2 Perawat) melakukan double-check independen: mencocokkan identitas pasien, jenis obat, volume pengencer, kecepatan pompa syringe pump, dan rute pemberian.'
      }
    ],
    criticalChecklist: [
      'Apakah seluruh ampul/flakon elektrolit pekat memiliki label High Alert merah?',
      'Apakah sediaan KCl pekat dipastikan tidak berada di bangsal rawat inap umum?',
      'Apakah verifikasi ganda independen (independent double-check) dilakukan oleh 2 petugas?'
    ],
    relatedForms: ['Daftar Obat High Alert & Elektrolit Konsentrat Rumah Sakit', 'Lembar Verifikasi Double-Check Pemberian Obat High Alert', 'Formulir Pelaporan Kesalahan Obat (Medication Error)'],
    notes: 'Pemberian Injeksi Kalium Klorida (KCl) secara bolus intravena langsung KONTRAINDIKASI MUTLAK KARENA MENYEBABKAN ASISTOL / HENTI JANTUNG SEKETIKA DAN KEMATIAN.'
  },
  {
    id: 'sop-telefarmasi-pengantaran-obat',
    docNumber: 'SOP/FAR-REG/029/2026',
    title: 'SOP Pelayanan Resep Telefarmasi, Telemedicine & Pengantaran Obat ke Rumah Pasien',
    category: 'khusus',
    categoryLabel: 'Regulasi & Penanganan Khusus',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 24 Tahun 2022 tentang Rekam Medis (Rekam Medis Elektronik)',
      'Permenkes RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
      'Peraturan BPOM No. 8 Tahun 2020 tentang Pengawasan Obat dan Makanan yang Diedarkan Secara Daring (Online)'
    ],
    purpose: 'Menjamin pelayanan kefarmasian jarak jauh (Telefarmasi) dan pengantaran obat ke alamat pasien terlaksana secara legal, aman, tepat pasien, menjaga stabilitas mutu fisik sediaan selama perjalanan, serta memastikan pasien menerima konseling dan informasi penggunaan obat yang memadai.',
    scope: 'Pelayanan Farmasi Rawat Jalan, Apotek Daring/Telemedicine, dan Tim Ekspedisi Pengantaran Obat.',
    policy: 'Pelayanan resep telefarmasi hanya melayani resep elektronik dari dokter yang sah ber-SIP. Obat golongan Narkotika, Psikotropika, dan OOT terlarang keras dilayani melalui platform daring. Pengantaran obat wajib menggunakan kemasan tertutup bersegel aman.',
    responsiblePersons: ['Apoteker Pengelola Apotek (APA) / Apoteker Telefarmasi', 'Tenaga Teknis Kefarmasian', 'Kurir Khusus Pengantar Obat Farmasi'],
    equipmentNeeded: ['Sistem Informasi Telemedicine / Portal e-Prescription Terverifikasi', 'Aplikasi Chat & Video Call Konseling Telefarmasi Resmi', 'Kantong Pengemas Kedap Air & Segel Berstiker Pengaman (Security Seal)', 'Coolbox Pengantar Khusus Suhu 2-8°C dengan Ice Pack'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Verifikasi Keaslian Resep Elektronik & Identitas Pasien',
        description: 'Apoteker memeriksa validitas resep elektronik dari platform telemedicine resmi (nama dokter, nomor SIP, tanda tangan digital, tanggal resep, nama pasien, NIK, alamat lengkap, dan nomor WhatsApp aktif pasien).'
      },
      {
        stepNumber: 2,
        title: 'Skrining Farmasetik & Penapisan Obat Terlarang Daring',
        description: 'Lakukan pengkajian klinis. Pastikan resep TIDAK MENGANDUNG NARKOTIKA, PSIKOTROPIKA, ATAU OBAT GOLONGAN OOT (Tramadol/Triheksifenidil) yang dilarang diedarkan secara daring menurut PerBPOM.'
      },
      {
        stepNumber: 3,
        title: 'Penyiapan Obat & Pengemasan Tertutup Bersegel Keamanan',
        description: 'Siapkan obat dengan etiket jelas. Masukkan obat ke dalam kantong pengemas kedap air dan tempelkan Stiker Segel Pengaman (Security Seal) yang tidak dapat dibuka tanpa merusak segel. Untuk obat cold chain (misal: insulin), gunakan coolbox ber-icepack dengan termometer pemantau.'
      },
      {
        stepNumber: 4,
        title: 'Konseling Telefarmasi via Telepon / Video Call',
        description: 'Apoteker menghubungi pasien melalui panggilan suara/video call sebelum obat dikirimkan untuk menjelaskan: indikasi obat, aturan minum, cara pemakaian sediaan khusus, penyimpanan, serta konfirmasi alamat penerimaan.'
      },
      {
        stepNumber: 5,
        title: 'Pengantaran & Serah Terima dengan Bukti Foto / Tanda Tangan',
        description: 'Kurir mengantar paket obat ke alamat pasien, meminta penerima (pasien/keluarga serumah) menandatangani lembar serah terima, memeriksa keutuhan segel di depan kurir, dan mengambil foto bukti serah terima paket.'
      }
    ],
    criticalChecklist: [
      'Apakah resep telemedicine diverifikasi bebas dari Narkotika/Psikotropika/OOT?',
      'Apakah paket obat dikemas tertutup rapat dengan stiker segel pengaman?',
      'Apakah Apoteker telah melakukan konseling langsung kepada pasien via telepon/video?'
    ],
    relatedForms: ['Log Transaksi Resep Telefarmasi / Telemedicine', 'Lembar Bukti Serah Terima Pengantaran Obat ke Rumah', 'Formulir Catatan Konseling Telefarmasi'],
    notes: 'Pasien wajib diinstruksikan untuk menolak paket obat jika segel pengaman telah rusak atau robek saat diserahkan oleh kurir.'
  },
  {
    id: 'sop-higiene-sanitasi-cuci-tangan-apd',
    docNumber: 'SOP/FAR-SAF/030/2026',
    title: 'SOP Higiene Sanitasi, Kebersihan Tangan 6 Langkah WHO & Pemakaian APD Farmasi',
    category: 'safety',
    categoryLabel: 'Keselamatan Pasien & Mutu Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 27 Tahun 2017 tentang Pedoman Pencegahan dan Pengendalian Infeksi (PPI) di Fasilitas Pelayanan Kesehatan',
      'Pedoman Hand Hygiene World Health Organization (WHO)',
      'Standar Keselamatan dan Kesehatan Kerja (K3) Fasilitas Farmasi'
    ],
    purpose: 'Mencegah kontaminasi silang mikroorganisme pada sediaan obat racikan, melindungi tenaga kefarmasian dari paparan debu zat aktif farmasi kimia beracun, serta memutus rantai transmisi infeksi nosokomial di lingkungan pelayanan farmasi.',
    scope: 'Seluruh area Instalasi Farmasi, Ruang Peracikan Puyer, Ruang Aseptic Dispensing, Gudang Farmasi, dan Loket Penyerahan Obat.',
    policy: 'Seluruh staf farmasi wajib mematuhi kebersihan tangan 6 langkah WHO pada 5 momen cuci tangan (5 Moments of Hand Hygiene) dan mengenakan Alat Pelindung Diri (APD) yang sesuai dengan tingkat risiko tugas.',
    responsiblePersons: ['Apoteker Penanggung Jawab K3 & PPI Farmasi', 'Seluruh Staf Tenaga Teknis Kefarmasian', 'Petugas Kebersihan (Cleaning Service)'],
    equipmentNeeded: ['Wastafel Cuci Tangan dengan Kran Sensor / Siku', 'Sabun Antiseptik Cair (Chlorhexidine 2-4%) & Handrub Berbasis Alkohol 70%', 'Tisu Pengering Sekali Pakai (Paper Towel)', 'Alat Pelindung Diri (Jas Lab Farmasi, Masker Bedah, Sarung Tangan Nitril Bebas Bedak, Penutup Kepala, Kacamata Goggle)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Penerapan 5 Momen Kebersihan Tangan (5 Moments)',
        description: 'Staf farmasi wajib mencuci tangan: 1) Sebelum menyentuh bahan baku obat / peracikan, 2) Sebelum melakukan prosedur aseptis, 3) Setelah kontak dengan cairan tubuh/sediaan terkontaminasi, 4) Setelah menyentuh lingkungan kerja/peralatan farmasi, dan 5) Sebelum dan sesudah memakai sarung tangan.'
      },
      {
        stepNumber: 2,
        title: 'Prosedur Kebersihan Tangan 6 Langkah Standar WHO',
        description: 'Lakukan 6 langkah selama 20-30 detik (handrub) atau 40-60 detik (air mengalir & sabun): 1) Gosok telapak tangan, 2) Gosok punggung tangan bergantian, 3) Gosok sela-sela jari, 4) Gosok punggung jari dengan posisi mengunci, 5) Putar ibu jari dalam genggaman, 6) Putar ujung jari di telapak tangan.'
      },
      {
        stepNumber: 3,
        title: 'Pemakaian APD Standar Ruang Peracikan Non-Steril',
        description: 'Sebelum meracik puyer, kapsul, atau salep: Petugas wajib mengenakan jas lab bersih lengan panjang, penutup kepala, masker bedah (mencegah inhalasi debu obat), dan sarung tangan nitril bersih bebas bedak.'
      },
      {
        stepNumber: 4,
        title: 'Sanitasi Meja Racik & Alat Mortir-Stamper',
        description: 'Sebelum dan sesudah digunakan, bersihkan mortir dan stamper dengan air hangat dan deterjen, keringkan, lalu seka dengan Alkohol 70%. Bersihkan permukaan meja kerja racik dengan cairan disinfektan minimal 2 kali sehari.'
      },
      {
        stepNumber: 5,
        title: 'Pelepasan & Pembuangan APD Bekas Pakai',
        description: 'Lepaskan sarung tangan dari arah dalam ke luar tanpa menyentuh bagian luar yang terkontaminasi, lepaskan masker dengan memegang talinya, buang ke tempat sampah medis berplastik kuning, dan segera lakukan hand hygiene.'
      }
    ],
    criticalChecklist: [
      'Apakah seluruh staf menerapkan 6 langkah cuci tangan WHO secara benar?',
      'Apakah masker dan sarung tangan selalu digunakan saat peracikan puyer?',
      'Apakah mortir dan stamper didisinfeksi dengan alkohol 70% sebelum meracik obat berikutnya?'
    ],
    relatedForms: ['Log Harian Audit Kepatuhan Hand Hygiene Staf Farmasi', 'Jadwal Sanitasi & Disinfeksi Ruang Peracikan', 'Kartu Kontrol Stok APD Farmasi'],
    notes: 'Dilarang menggunakan perhiasan cincin, gelang, atau cat kuku saat bertugas meracik sediaan obat karena menjadi tempat persembunyian koloni bakteri.'
  },
  {
    id: 'sop-kesiapsiagaan-bencana-klb',
    docNumber: 'SOP/FAR-SAF/031/2026',
    title: 'SOP Kesiapsiagaan Penanganan Bencana Alam, Keracunan Massal & Kejadian Luar Biasa (KLB)',
    category: 'safety',
    categoryLabel: 'Keselamatan Pasien & Mutu Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Undang-Undang RI No. 24 Tahun 2007 tentang Penanggulangan Bencana',
      'Permenkes RI No. 72/2016 & Permenkes No. 74/2016 tentang Standar Pelayanan Kefarmasian',
      'Pedoman Kesiapsiagaan Krisis Kesehatan Kemenkes RI'
    ],
    purpose: 'Menjamin ketersediaan obat-obatan penyelamat nyawa (life-saving drugs), cairan rehidrasi massal, dan antidotum toksikologi secara cepat dan terorganisir saat terjadi bencana alam (gempa bumi, banjir), keracunan pangan massal, atau wabah Kejadian Luar Biasa (KLB).',
    scope: 'Instalasi Farmasi, Tim Tanggap Darurat Bencana Rumah Sakit (Hospital Disaster Plan), Posko Triase Lapangan, dan UGD.',
    policy: 'Farmasi wajib memiliki Paket Bencana (Disaster Kit) dan Paket Keracunan Massal yang selalu terisi lengkap dan diperbarui secara berkala, serta siap dimobilisasi dalam waktu kurang dari 30 menit.',
    responsiblePersons: ['Apoteker Koordinator Logistik Tim Bencana', 'Kepala Instalasi Farmasi', 'Ketua Komite K3 & Disaster RS'],
    equipmentNeeded: ['Kotak / Peti Logistik Bencana (Disaster Box) Tahan Air & Portabel', 'Stok Cairan Infus Kristaloid (RL, NaCl 0.9%) dan Set Infus Makro', 'Paket Antidotum Keracunan Massal (Atropin, Norit, Pralidoksim, NAC)', 'Genset Cadangan Khusus Cold Chain Kulkas Vaksin / Obat Termolabil', 'Megafon / HT Radio Komunikasi Darurat'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Aktivasi Status Siaga Bencana Farmasi',
        description: 'Saat status Bencana / KLB diumumkan oleh Pimpinan RS / Dinkes (Code Yellow / Code Orange), Apoteker Koordinator segera mengaktifkan Tim Logistik Farmasi Bencana dan membuka Posko Logistik Obat Darurat.'
      },
      {
        stepNumber: 2,
        title: 'Mobilisasi Paket Obat Bencana (Disaster Kit) ke Area Triase',
        description: 'Mobilisasi kotak logistik darurat ke zona triase gawat darurat berisi: cairan infus kristaloid dalam jumlah besar, analgesik injeksi, antibiotik gawat darurat, ATS/Serum Anti Tetanus, kasa steril, perban elastis, spuit jarum suntik, dan obat resusitasi.'
      },
      {
        stepNumber: 3,
        title: 'Penanganan Kasus Keracunan Massal',
        description: 'Siapkan paket antidotum toksikologi: Atropin Sulfat dosis tinggi (untuk insektisida/organofosfat), Karbo Adsorben / Norit oral (keracunan makanan/toksin), N-Asetilsistein, dan cairan rehidrasi elektrolit cepat.'
      },
      {
        stepNumber: 4,
        title: 'Pengamanan Cold Chain Saat Pemadaman Listrik Masif',
        description: 'Bila terjadi pemadaman listrik akibat bencana, pastikan genset darurat otomatis menyala untuk kulkas vaksin. Jika genset gagal, segera pindahkan vaksin dan insulin ke Cold Box yang telah diisi Ice Pack beku dengan pemantau termometer.'
      },
      {
        stepNumber: 5,
        title: 'Pencatatan Cepat & Koordinasi Permintaan Bantuan Logistik Dinkes',
        description: 'Gunakan sistem pencatatan manual darurat cepat untuk pemakaian obat korban bencana. Apoteker segera berkoordinasi dengan Dinas Kesehatan / BPBD untuk mengajukan tambahan pasokan obat bantuan darurat nasional (Buffer Stock Bencana).'
      }
    ],
    criticalChecklist: [
      'Apakah paket Disaster Kit terisi lengkap dan diperiksa masa kedaluwarsanya tiap bulan?',
      'Apakah genset darurat dan cold box siap siaga untuk pengamanan obat rantai dingin?',
      'Apakah jalur koordinasi darurat dengan Dinas Kesehatan / BPBD aktif?'
    ],
    relatedForms: ['Daftar Inventaris Paket Obat Bencana (Disaster Kit)', 'Formulir Penerimaan & Pengeluaran Obat Darurat Bencana', 'Berita Acara Kejadian Luar Biasa (KLB)'],
    notes: 'Seluruh perbekalan farmasi untuk korban bencana pada fase tanggap darurat diserahkan secara cuma-cuma (gratis) sesuai instruksi komandan penanggulangan bencana.'
  },
  {
    id: 'sop-audit-mutu-kepuasan-pasien',
    docNumber: 'SOP/FAR-SAF/032/2026',
    title: 'SOP Audit Internal Mutu Pelayanan Farmasi, Indikator Kinerja Utama (IKU) & Kepuasan Pasien',
    category: 'safety',
    categoryLabel: 'Keselamatan Pasien & Mutu Farmasi',
    effectiveDate: '01 Januari 2026',
    revision: '02',
    legalBasis: [
      'Permenkes RI No. 72/2016 & Permenkes No. 73/2016 tentang Standar Pelayanan Kefarmasian',
      'Permenkes RI No. 30 Tahun 2022 tentang Indikator Nasional Mutu Pelayanan Kesehatan',
      'Standar Akreditasi Rumah Sakit STARKES - Peningkatan Mutu dan Keselamatan Pasien (PMKP)'
    ],
    purpose: 'Mengevaluasi pencapaian standar pelayanan kefarmasian secara berkelanjutan (Continuous Quality Improvement), memastikan kepatuhan terhadap indikator mutu nasional (Indikator Nasional Mutu / INM), menekan angka kesalahan obat (zero medication error), serta meningkatkan indeks kepuasan pasien terhadap layanan farmasi.',
    scope: 'Seluruh Unit Pelayanan Farmasi (Rawat Jalan, Rawat Inap, UGD, Gudang Farmasi, Ruang Konseling).',
    policy: 'Audit internal mutu pelayanan farmasi dilakukan secara periodik setiap bulan oleh Tim Mutu Farmasi. Hasil audit dan Indikator Kinerja Utama (IKU) dilaporkan kepada Direktur/Kepala Instansi dan dibahas dalam rapat evaluasi mutu.',
    responsiblePersons: ['Apoteker Ketua Tim Mutu & Keselamatan Farmasi', 'Kepala Instalasi Farmasi / Pengelola Apotek', 'Seluruh Staf Tenaga Farmasi'],
    equipmentNeeded: ['Formulir Indikator Mutu Waktu Tunggu Pelayanan Obat', 'Kuesioner Survei Kepuasan Pasien (Kertas / QR Code Digital)', 'Software Pengolah Data Statistik Mutu (Excel / SIMRS Dashboard)', 'Format Laporan Audit Klinis & Penggunaan Obat (EPO)'],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Pengumpulan Data Indikator Nasional Mutu (INM) Harian',
        description: 'Kumpulkan data harian indikator mutu pelayanan: 1) Waktu Tunggu Pelayanan Obat Jadi (Standar <= 30 menit), 2) Waktu Tunggu Pelayanan Obat Racikan (Standar <= 60 menit), 3) Kepatuhan terhadap Formularium Nasional / RS (Standar >= 80%), 4) Angka Kejadian Kesalahan Pemberian Obat (Target 0%).'
      },
      {
        stepNumber: 2,
        title: 'Pengukuran Indeks Kepuasan Pasien / Pelanggan',
        description: 'Sebarkan kuesioner survei kepuasan pelanggan secara acak (minimal 50 responden per bulan) melalui form kertas di ruang tunggu atau scan QR-Code digital. Evaluasi parameter: keramahan petugas, kejelasan informasi obat dari apoteker, kenyamanan ruang tunggu, dan kecepatan layanan.'
      },
      {
        stepNumber: 3,
        title: 'Audit Klinis Evaluasi Penggunaan Obat (EPO)',
        description: 'Lakukan audit sampling rekam medis (minimal 30 resep per bulan) untuk mengevaluasi kerasionalan peresepan antibiotik (metode Gyssens), kesesuaian dosis pada geriatri/pediatrik, dan kelengkapan dokumentasi pengkajian resep.'
      },
      {
        stepNumber: 4,
        title: 'Analisis Data & Identifikasi Akar Masalah (RCA / Fishbone)',
        description: 'Jika ditemukan indikator mutu yang tidak mencapai target (misal: waktu tunggu obat racikan melebihi 60 menit), Tim Mutu melakukan analisis akar masalah menggunakan diagram tulang ikan (Fishbone Diagram) atau metode 5-Why.'
      },
      {
        stepNumber: 5,
        title: 'Penyusunan Rencana Tindak Lanjut (Plan-Do-Check-Action / PDCA)',
        description: 'Susun Rencana Tindak Lanjut (RTL) perbaikan proses (misal: penambahan blender puyer otomatis, perbaikan alur antrean e-Prescribing). Pantau efektivitas perbaikan pada siklus audit bulan berikutnya.'
      },
      {
        stepNumber: 6,
        title: 'Publikasi Dashboard Mutu & Rapat Evaluasi',
        description: 'Tampilkan grafik pencapaian indikator mutu pada papan informasi staf farmasi dan sampaikan laporan resmi kepada Komite Mutu RS / Dinas Kesehatan.'
      }
    ],
    criticalChecklist: [
      'Apakah waktu tunggu obat jadi (<= 30 mnt) dan racikan (<= 60 mnt) tercapai?',
      'Apakah persentase kepatuhan formularium mencapai minimal 80%?',
      'Apakah survei kepuasan pelanggan dilakukan dan ditindaklanjuti secara berkala?'
    ],
    relatedForms: ['Lembar Pencatatan Waktu Tunggu Resep Harian', 'Kuesioner Indeks Kepuasan Pelanggan Farmasi', 'Laporan Bulanan Indikator Mutu & Keselamatan Pasien Farmasi'],
    notes: 'Setiap staf yang berhasil mempertahankan rekor zero medication error dan kepuasan pasien tertinggi berhak mendapatkan apresiasi bintang mutu dari manajemen.'
  }
];

