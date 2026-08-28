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
  }
];

