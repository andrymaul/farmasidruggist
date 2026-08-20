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
  }
];
