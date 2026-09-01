export interface RegulationItem {
  id: string;
  regNumber: string;
  title: string;
  type: 'uu' | 'pp' | 'permenkes' | 'perbpom' | 'dowa';
  typeLabel: string;
  year: number;
  issuingAuthority: string;
  status: 'Berlaku' | 'Perubahan' | 'Dicabut Sebagian';
  summary: string;
  scope: string;
  keyArticles: {
    articleNumber: string;
    topic: string;
    content: string;
    clinicalImplication: string;
  }[];
  drugListsOrSchedules?: {
    category: string;
    items: string[];
    rules: string;
  }[];
  sanctionsOrPenalties: string[];
  notes: string;
}

export const PHARMACY_REGULATIONS_DATA: RegulationItem[] = [
  {
    id: 'reg-uu-17-2023',
    regNumber: 'UU No. 17 Tahun 2023',
    title: 'Undang-Undang RI Nomor 17 Tahun 2023 tentang Kesehatan',
    type: 'uu',
    typeLabel: 'Undang-Undang (UU)',
    year: 2023,
    issuingAuthority: 'Pemerintah RI & DPR RI',
    status: 'Berlaku',
    summary: 'Landasan hukum utama (Omnibus Law) penyelenggaraan kesehatan di Indonesia, mengatur tata kelola sediaan farmasi, standardisasi mutu, kualifikasi tenaga medis & kefarmasian, penerbitan Surat Izin Praktik (SIP), serta perlindungan hukum bagi tenaga kesehatan.',
    scope: 'Seluruh fasilitas pelayanan kesehatan, industri farmasi, apotek, klinik, puskesmas, dan rumah sakit di wilayah Republik Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 138 - 145',
        topic: 'Ketentuan Sediaan Farmasi, Alat Kesehatan & PKRT',
        content: 'Sediaan farmasi dan alat kesehatan yang diproduksi dan diedarkan wajib memenuhi standar keamanan, khasiat/kemanfaatan, dan mutu resmi (Farmakope Indonesia) serta memiliki izin edar resmi dari BPOM RI.',
        clinicalImplication: 'Larangan mutlak pengadaan atau peredaran obat tanpa izin edar (TIE) atau obat palsu di fasilitas pelayanan kefarmasian.'
      },
      {
        articleNumber: 'Pasal 197 - 205',
        topic: 'Praktik Tenaga Medis & Tenaga Kefarmasian',
        content: 'Tenaga kefarmasian (Apoteker dan Tenaga Vokasi Farmasi) wajib memiliki Surat Tanda Registrasi (STR) yang berlaku seumur hidup dan Surat Izin Praktik (SIP) yang diterbitkan oleh Pemerintah Daerah Kabupaten/Kota.',
        clinicalImplication: 'Apoteker berhak menjalankan pekerjaan kefarmasian secara mandiri dan bertanggung jawab penuh atas penyerahan obat kepada pasien.'
      },
      {
        articleNumber: 'Pasal 435 - 438',
        topic: 'Ketentuan Pidana Sediaan Farmasi Ilegal',
        content: 'Setiap orang yang memproduksi atau mengedarkan sediaan farmasi dan/atau alat kesehatan yang tidak memenuhi standar atau persyaratan keamanan, khasiat/kemanfaatan, dan mutu dipidana dengan pidana penjara paling lama 12 (dua belas) tahun atau denda paling banyak Rp 5.000.000.000,00.',
        clinicalImplication: 'Pertanggungjawaban hukum pidana yang sangat berat bagi pelaku pemalsuan, penyelundupan, atau peredaran obat kedaluwarsa/rusak.'
      }
    ],
    sanctionsOrPenalties: [
      'Pencabutan Surat Izin Praktik (SIP) dan Surat Izin Apotek (SIA).',
      'Pidana penjara hingga 12 tahun dan denda hingga Rp 5 Miliar untuk sediaan farmasi tanpa izin edar/tidak memenuhi standar mutu.',
      'Sanksi administratif berupa peringatan tertulis, penghentian sementara kegiatan, dan penutupan fasilitas.'
    ],
    notes: 'UU No. 17 Tahun 2023 mencabut dan menggantikan UU No. 36 Tahun 2009 tentang Kesehatan dan UU No. 36 Tahun 2014 tentang Tenaga Kesehatan.'
  },
  {
    id: 'reg-uu-35-2009',
    regNumber: 'UU No. 35 Tahun 2009',
    title: 'Undang-Undang RI Nomor 35 Tahun 2009 tentang Narkotika',
    type: 'uu',
    typeLabel: 'Undang-Undang (UU)',
    year: 2009,
    issuingAuthority: 'Pemerintah RI & DPR RI',
    status: 'Berlaku',
    summary: 'Mengatur ketersediaan narkotika untuk kepentingan pelayanan medis dan pengembangan ilmu pengetahuan sekaligus mencegah, melindungi, dan menyelamatkan bangsa Indonesia dari penyalahgunaan narkotika.',
    scope: 'Produksi, impor, ekspor, peredaran, penyimpanan, dan penyerahan sediaan farmasi narkotika di seluruh Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 6 - 8',
        topic: 'Penggolongan Narkotika (Golongan I, II, dan III)',
        content: 'Narkotika Golongan I dilarang digunakan untuk kepentingan pelayanan kesehatan (hanya untuk IPTEK terbatas). Narkotika Golongan II dan III berkhasiat pengobatan dan digunakan sebagai pilihan terakhir dalam terapi medis.',
        clinicalImplication: 'Fasilitas farmasi hanya berhak mengelola dan melayani Narkotika Golongan II (Morfin, Fentanil, Petidin, Metadon) dan Golongan III (Kodein).'
      },
      {
        articleNumber: 'Pasal 39 - 43',
        topic: 'Peredaran & Penyerahan Narkotika',
        content: 'Penyerahan narkotika hanya dapat dilakukan oleh apotek, rumah sakit, pusat kesehatan masyarakat, klinik, dan dokter berdasarkan resep dokter asli yang sah.',
        clinicalImplication: 'Resep narkotika tidak boleh diserahkan atas dasar salinan resep (copy resep) bila obat belum pernah diambil di apotek yang bersangkutan.'
      },
      {
        articleNumber: 'Pasal 111 - 126',
        topic: 'Ketentuan Pidana Penyalahgunaan & Peredaran Gelap',
        content: 'Sanksi pidana penjara mulai dari 4 tahun hingga pidana mati dan denda hingga Rp 10 Miliar bagi setiap orang yang tanpa hak memiliki, menyimpan, menguasai, atau menyerahkan narkotika.',
        clinicalImplication: 'Kewajiban pengamanan lemari khusus kunci ganda dan pencatatan mutasi kartu stok secara ketat dan tertib.'
      }
    ],
    drugListsOrSchedules: [
      {
        category: 'Narkotika Golongan II (Digunakan dalam Medis / Sangat Poten)',
        items: ['Morphine (Morfin)', 'Fentanyl (Fentanil)', 'Pethidine (Petidin)', 'Sufentanil', 'Alfentanil', 'Methadone (Metadon)', 'Oxycodone', 'Hydromorphone'],
        rules: 'Wajib resep dokter asli bertanda tangan lengkap, SP Khusus Narkotika, penyimpanan lemari kunci ganda terbaut, pelaporan SIPNAP bulanan.'
      },
      {
        category: 'Narkotika Golongan III (Potensi Ketergantungan Ringan-Sedang)',
        items: ['Codeine (Kodein Fosfat / HCl)', 'Dextropropoxyphene', 'Buprenorphine'],
        rules: 'Hanya dilayani dengan resep dokter, dipisahkan pencatatan kartu stok, pelaporan SIPNAP rutin.'
      }
    ],
    sanctionsOrPenalties: [
      'Pidana penjara minimal 4 tahun hingga seumur hidup / hukuman mati untuk peredaran gelap.',
      'Pencabutan izin apotek dan izin praktik apoteker bila terbukti lalai/sengaja menyalurkan narkotika secara ilegal.'
    ],
    notes: 'Setiap resep yang mengandung Narkotika wajib digarisbawahi dengan tinta merah oleh apoteker/tenaga farmasi.'
  },
  {
    id: 'reg-uu-5-1997',
    regNumber: 'UU No. 5 Tahun 1997',
    title: 'Undang-Undang RI Nomor 5 Tahun 1997 tentang Psikotropika',
    type: 'uu',
    typeLabel: 'Undang-Undang (UU)',
    year: 1997,
    issuingAuthority: 'Pemerintah RI & DPR RI',
    status: 'Berlaku',
    summary: 'Mengatur peredaran zat atau obat psikoaktif yang berkhasiat selektif pada susunan saraf pusat yang menyebabkan perubahan khas pada aktivitas mental dan perilaku, guna menjamin ketersediaan terapi medis terstandar.',
    scope: 'Pabrik farmasi, Pedagang Besar Farmasi (PBF), Apotek, Rumah Sakit, Klinik, dan Puskesmas.',
    keyArticles: [
      {
        articleNumber: 'Pasal 2 - 4',
        topic: 'Ruang Lingkup & Penggolongan Psikotropika',
        content: 'Psikotropika digolongkan menjadi Golongan I, II, III, dan IV. Psikotropika Golongan II, III, dan IV berkhasiat pengobatan dan digunakan secara luas dalam terapi medis (sedatif, hipnotik, antiansietas, antikonvulsan).',
        clinicalImplication: 'Obat seperti Diazepam, Alprazolam, Clonazepam, Clobazam, Midazolam, dan Fenobarbital wajib dikelola sesuai standar psikotropika.'
      },
      {
        articleNumber: 'Pasal 14',
        topic: 'Penyerahan Psikotropika Berdasarkan Resep',
        content: 'Penyerahan psikotropika oleh apotek hanya dapat dilakukan kepada pasien berdasarkan resep dokter yang sah.',
        clinicalImplication: 'Dilarang keras melayani psikotropika tanpa resep dokter atau melalui resep yang dicurigai palsu.'
      }
    ],
    drugListsOrSchedules: [
      {
        category: 'Psikotropika Golongan II, III & IV (Resmi Medis)',
        items: [
          'Diazepam (Valium, Stesolid)',
          'Alprazolam (Xanax, Alganax, Zypraz)',
          'Clonazepam (Rivotril)',
          'Clobazam (Frisium, Asabium)',
          'Lorazepam (Ativan, Merlopam)',
          'Midazolam (Dormicum, Miloz)',
          'Phenobarbital (Luminal)',
          'Nitrazepam (Dumolid)',
          'Zolpidem (Stilnox)',
          'Estazolam (Esilgan)'
        ],
        rules: 'Surat Pesanan Psikotropika khusus, penyimpanan terpisah dan terkunci, pelaporan SIPNAP rutin bulanan.'
      }
    ],
    sanctionsOrPenalties: [
      'Pidana penjara hingga 15 tahun dan denda hingga Rp 750 Juta bagi yang menyalurkan psikotropika di luar ketentuan peraturan perundang-undangan.',
      'Sanksi pencabutan izin sarana apotek/klinik dan SIPA Apoteker.'
    ],
    notes: 'Istilah "Psikofarmaka" adalah terminologi farmakologi umum, sedangkan terminologi yuridis formal di Indonesia adalah PSIKOTROPIKA.'
  },
  {
    id: 'reg-pp-51-2009',
    regNumber: 'PP No. 51 Tahun 2009',
    title: 'Peraturan Pemerintah RI Nomor 51 Tahun 2009 tentang Pekerjaan Kefarmasian',
    type: 'pp',
    typeLabel: 'Peraturan Pemerintah (PP)',
    year: 2009,
    issuingAuthority: 'Presiden Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mengatur pelaksanaan Pekerjaan Kefarmasian dalam pengadaan, produksi, distribusi, dan pelayanan sediaan farmasi, penjaminan mutu, serta perlindungan masyarakat terhadap sediaan farmasi yang aman dan bermanfaat.',
    scope: 'Seluruh tenaga kefarmasian (Apoteker dan Tenaga Teknis Kefarmasian) di fasilitas produksi, distribusi, dan pelayanan kefarmasian.',
    keyArticles: [
      {
        articleNumber: 'Pasal 21',
        topic: 'Kewenangan Penyerahan dan Pelayanan Obat Resep',
        content: 'Dalam menjalankan pekerjaan kefarmasian pada fasilitas pelayanan kefarmasian, Apoteker dapat mengangkat Tenaga Teknis Kefarmasian (TTK) yang bertugas di bawah supervisi dan tanggung jawab Apoteker.',
        clinicalImplication: 'Penyerahan obat resep dan konseling farmasi adalah wewenang klinis eksklusif Apoteker.'
      },
      {
        articleNumber: 'Pasal 24',
        topic: 'Kewenangan Penggantian Obat Generik',
        content: 'Apoteker berhak mengganti obat merek dagang dengan obat generik yang sama komponen aktifnya atau obat merek dagang lain atas persetujuan dokter dan/atau pasien.',
        clinicalImplication: 'Apoteker memiliki hak profesional untuk mengadvokasi obat generik yang lebih terjangkau bagi pasien tanpa mengurangi mutu terapi.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis dari Menteri Kesehatan / Kepala Dinas Kesehatan.',
      'Penghentian sementara kegiatan pekerjaan kefarmasian.',
      'Pencabutan STRA atau SIPA bagi tenaga kefarmasian yang melanggar kode etik dan ketentuan hukum.'
    ],
    notes: 'PP No. 51/2009 menjadi dasar utama perlindungan profesi dan kemandirian praktik Apoteker di Indonesia.'
  },
  {
    id: 'reg-pmk-73-2016',
    regNumber: 'Permenkes No. 73 Tahun 2016',
    title: 'Peraturan Menteri Kesehatan RI No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2016,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Pedoman operasional terlengkap pelayanan kefarmasian di apotek yang mencakup 2 pilar utama: (1) Pengelolaan Sediaan Farmasi, Alat Kesehatan, dan BMHP; serta (2) Pelayanan Farmasi Klinis yang berorientasi langsung kepada keselamatan pasien (*Patient-Centered Care*).',
    scope: 'Seluruh Apotek mandiri, apotek jejaring, dan fasilitas pelayanan obat rawat jalan di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Bab II - Pengelolaan Sediaan Farmasi',
        topic: 'Perencanaan, Pengadaan, Penerimaan, Penyimpanan, Pemusnahan & Pengendalian',
        content: 'Penyimpanan obat wajib menerapkan prinsip FIFO (First In First Out) dan FEFO (First Expire First Out), pemisahan obat High Alert/LASA, pemantauan suhu ruang (15-25°C) dan chiller (2-8°C), serta stock opname periodik.',
        clinicalImplication: 'Kewajiban pencatatan suhu kulkas 2 kali sehari dan dokumentasi kartu stok mutasi fisik realtime.'
      },
      {
        articleNumber: 'Bab III - Pelayanan Farmasi Klinis',
        topic: '7 Standar Pelayanan Klinis Apoteker',
        content: 'Pelayanan farmasi klinis meliputi: (1) Pengkajian Resep, (2) Dispensing & Peracikan, (3) Pelayanan Informasi Obat (PIO), (4) Konseling Farmasi, (5) Pelayanan Kefarmasian di Rumah (Home Pharmacy Care), (6) Pemantauan Terapi Obat (PTO), dan (7) Monitoring Efek Samping Obat (MESO).',
        clinicalImplication: 'Apoteker wajib melakukan skrining administratif, farmasetik, klinis (DDI/duplikasi) serta memberikan konseling dengan metode 3 Prime Questions.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis oleh Dinas Kesehatan Kabupaten/Kota atau BPOM.',
      'Penghentian sementara operasional apotek.',
      'Pencabutan izin operasional Surat Izin Apotek (SIA).'
    ],
    notes: 'Dilengkapi lampiran teknis form dokumentasi skrining resep, form konseling, form MESO kuning, dan form catatan pengobatan pasien.'
  },
  {
    id: 'reg-dowa-kepmenkes',
    regNumber: 'Kepmenkes DOWA No. 1, 2 & 3',
    title: 'Daftar Obat Wajib Apotek (DOWA No. 1, 2, dan 3)',
    type: 'dowa',
    typeLabel: 'Daftar Obat Wajib Apotek (DOWA)',
    year: 1999,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Ketentuan hukum resmi yang memberi wewenang legal kepada Apoteker untuk menyerahkan Obat Keras tertentu TANPA resep dokter kepada pasien, dengan batas jumlah maksimal dan kewajiban edukasi/pemberian informasi obat secara langsung.',
    scope: 'Pelayanan swamedikasi (Self-Medication) yang dilakukan oleh Apoteker di Apotek.',
    keyArticles: [
      {
        articleNumber: 'Kepmenkes No. 347/1990 (DOWA 1)',
        topic: 'Daftar Obat Wajib Apotek Nomor 1',
        content: 'Apoteker berwenang menyerahkan kontrasepsi oral (1 siklus untuk akseptor lama), antasid kombinasi antispasmodik, analgesik antipiretik tertentu (Asam Mefenamat maks 20 tab), antihistamin, mukolitik (Asetilsistein, Karbosistein), dan obat cacing.',
        clinicalImplication: 'Wajib menanyakan riwayat penggunaan sebelumnya dan memastikan pasien bukan akseptor baru/pertama kali.'
      },
      {
        articleNumber: 'Kepmenkes No. 924/1993 (DOWA 2)',
        topic: 'Daftar Obat Wajib Apotek Nomor 2',
        content: 'Penyerahan obat keras tanpa resep meliputi: Bisakodil suppositoria (maks 3 supp), Klindamisin topikal 1% (maks 1 tube), Ketokonazol topikal/sampo, Ibuprofen tablet 400 mg (maks 10 tab), Piroksikam gel, dan Sukralfat suspensi.',
        clinicalImplication: 'Hanya untuk pengobatan gejala akut superfisial dan tidak boleh diulang tanpa evaluasi.'
      },
      {
        articleNumber: 'Kepmenkes No. 1176/1999 (DOWA 3)',
        topic: 'Daftar Obat Wajib Apotek Nomor 3',
        content: 'Penyerahan Ranitidin tablet 150 mg (maks 10 tablet), Famotidin tablet (maks 10 tab), Setirizin tablet (maks 10 tab), Asiklovir topikal 5% (maks 1 tube), Gentamisin sulfat salep kulit (maks 1 tube), dan Kloramfenikol tetes mata.',
        clinicalImplication: 'Wajib mencatat identitas pasien, keluhan penyakit, dan memastikan pasien dirujuk ke dokter bila gejala berlanjut > 3 hari.'
      }
    ],
    drugListsOrSchedules: [
      {
        category: 'DOWA 1 (Kepmenkes 347/Menkes/SK/VII/1990)',
        items: ['Asam Mefenamat (Maks 20 tablet)', 'Metoklopramid (Maks 20 tablet)', 'Bisakodil tab (Maks 3 tab)', 'Pil KB Kontrasepsi Oral (Maks 1 strip/siklus untuk akseptor aktif)', 'Aminofilin suppositoria (Maks 3 supp)'],
        rules: 'Wajib dicatat nama pasien dan riwayat penyakit; berikan informasi aturan minum sesudah makan.'
      },
      {
        category: 'DOWA 2 (Kepmenkes 924/Menkes/Per/X/1993)',
        items: ['Ibuprofen 400 mg (Maks 10 tab / 600 mg maks 10 tab)', 'Ketokonazol krim 2% (Maks 1 tube 5g/10g)', 'Klindamisin gel 1% (Maks 1 tube)', 'Piroksikam gel 0.5% (Maks 1 tube)'],
        rules: 'Khusus pemakaian topikal luar atau pereda nyeri jangka pendek.'
      },
      {
        category: 'DOWA 3 (Kepmenkes 1176/Menkes/SK/X/1999)',
        items: ['Ranitidin 150 mg (Maks 10 tablet)', 'Cetirizine 10 mg (Maks 10 tablet)', 'Asiklovir krim 5% (Maks 1 tube)', 'Gentamisin salep kulit 0.1% (Maks 1 tube)', 'Kloramfenikol salep mata/tetes mata (Maks 1 tube/botol)'],
        rules: 'Batasi jumlah maksimal dan wajib edukasi durasi terapi maksimal 3-5 hari.'
      }
    ],
    sanctionsOrPenalties: [
      'Pelanggaran penyerahan obat keras melebihi jumlah batas DOWA atau penyerahan oleh selain Apoteker dikategorikan sebagai pelanggaran izin peredaran obat keras.'
    ],
    notes: 'Penyerahan DOWA WAJIB dilakukan langsung oleh Apoteker dan dicatat dalam Buku Catatan Penyerahan DOWA.'
  },
  {
    id: 'reg-perbpom-24-2021',
    regNumber: 'PerBPOM No. 24 Tahun 2021',
    title: 'Peraturan BPOM RI No. 24 Tahun 2021 tentang Pengawasan Pengelolaan Obat, Narkotika, Psikotropika & Prekursor',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2021,
    issuingAuthority: 'Badan Pengawas Obat dan Makanan (BPOM RI)',
    status: 'Berlaku',
    summary: 'Standar regulasi pengawasan inspeksi BPOM terkait tata cara pengadaan melalui Surat Pesanan resmi, penyimpanan terkunci, pencatatan mutasi kartu stok fisik-digital yang sinkron, pengelolaan obat kedaluwarsa, dan pencegahan diversi obat-obat yang sering disalahgunakan.',
    scope: 'Seluruh fasilitas pelayanan kefarmasian (Apotek, Instalasi Farmasi RS, Klinik, Puskesmas, dan Toko Obat Berizin).',
    keyArticles: [
      {
        articleNumber: 'Pasal 4 - 8',
        topic: 'Format Surat Pesanan (SP) Resmi',
        content: 'Surat Pesanan wajib ditandatangani oleh Apoteker Penanggung Jawab (APJ) dengan mencantumkan nama lengkap, nomor SIPA, stempel sarana, nomor urut SP, serta nama PBF tujuan. SP Narkotika dibuat 4 rangkap (1 obat per SP). SP Psikotropika & Prekursor dibuat minimal 2-3 rangkap.',
        clinicalImplication: 'Dilarang menandatangani Surat Pesanan kosong (blanko SP bertanda tangan) atau diparaf oleh staf non-Apoteker.'
      },
      {
        articleNumber: 'Pasal 15 - 20',
        topic: 'Penyimpanan & Pengamanan Fisik Sediaan',
        content: 'Narkotika wajib disimpan dalam lemari khusus berukuran minimal 40x80x100 cm dengan 2 kunci ganda yang berbeda dan menempel mati pada dinding/lantai. Psikotropika dan Prekursor disimpan di lemari terkunci tersendiri.',
        clinicalImplication: 'Kunci lemari narkotika tidak boleh ditinggalkan tergantung di pintu lemari.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan keras / Peringatan tertulis BPOM.',
      'Penghentian Sementara Kegiatan (PSK) pelayanan farmasi.',
      'Rekomendasi pencabutan izin sarana apotek/klinik kepada Pemda/Dinas Kesehatan.'
    ],
    notes: 'PerBPOM No. 24 Tahun 2021 merupakan instrumen checklist audit utama petugas Balai Besar POM saat melakukan inspeksi mendadak (sidak).'
  },
  {
    id: 'reg-perbpom-10-2019-oot',
    regNumber: 'PerBPOM No. 10 Tahun 2019',
    title: 'Peraturan BPOM RI No. 10 Tahun 2019 tentang Pedoman Pengelolaan Obat-Obat Tertentu (OOT)',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2019,
    issuingAuthority: 'Badan Pengawas Obat dan Makanan (BPOM RI)',
    status: 'Berlaku',
    summary: 'Mengatur secara ketat kriteria dan tata kelola sediaan farmasi yang bekerja pada sistem saraf pusat selain narkotika dan psikotropika, yang dalam dosis tertentu atau penggunaan berlebih dapat menyebabkan ketergantungan dan perubahan khas pada aktivitas mental serta perilaku (*Obat-Obat Tertentu / OOT*).',
    scope: 'PBF distributor, Apotek, Instalasi Farmasi RS, Klinik, dan Puskesmas.',
    keyArticles: [
      {
        articleNumber: 'Pasal 2 - 3',
        topic: 'Daftar 6 Zat Aktif Obat-Obat Tertentu (OOT)',
        content: 'Kriteria OOT mencakup sediaan obat yang mengandung zat aktif: (1) Tramadol, (2) Trihexyphenidyl, (3) Chlorpromazine, (4) Amitriptyline, (5) Haloperidol, dan (6) Dextromethorphan (serta sediaan anestetik disosiatif Ketamin).',
        clinicalImplication: 'Semua obat OOT wajib disimpan terpisah, dicatat kartu stok mutasi harian, dan hanya diserahkan dengan resep dokter asli yang sah.'
      },
      {
        articleNumber: 'Pasal 12 - 16',
        topic: 'Larangan Pelayanan & Batas Keabsahan Resep OOT',
        content: 'Apotek dilarang melayani resep OOT yang dicurigai tidak sah, resep berulang (iterasi) tanpa resep baru dari dokter, atau penyerahan dalam jumlah tidak wajar.',
        clinicalImplication: 'Wajib melakukan konfirmasi ke dokter penulis resep jika menemukan peresepan OOT dalam jumlah besar atau indikasi kecurigaan penyalahgunaan remaja.'
      }
    ],
    drugListsOrSchedules: [
      {
        category: 'Daftar Resmi Obat-Obat Tertentu (OOT)',
        items: [
          'Tramadol HCl (Analgesik Opioid Sintetik Lemak)',
          'Trihexyphenidyl / THP (Antikolinergik Antiparkinson)',
          'Chlorpromazine / CPZ (Antipsikotik Fenotiazin)',
          'Amitriptyline HCl (Antidepresan Trisiklik)',
          'Haloperidol (Antipsikotik Butirofenon)',
          'Dextromethorphan HBr Tunggal/Kombinasi (Antitusif Sentral)',
          'Ketamine (Anestetik Disosiatif)'
        ],
        rules: 'Surat Pesanan Khusus OOT, penyimpanan di lemari terkunci terpisah, pencatatan mutasi kartu stok realtime.'
      }
    ],
    sanctionsOrPenalties: [
      'Penyitaan produk OOT ilegal oleh Penyidik Pegawai Negeri Sipil (PPNS) BPOM.',
      'Sanksi administratif penutupan sarana apotek.',
      'Tuntutan pidana bagi oknum yang menyalurkan OOT untuk penyalahgunaan jalanan.'
    ],
    notes: 'Ketamin diklasifikasikan sebagai OOT berisiko tinggi penyalahgunaan di fasilitas pelayanan kesehatan.'
  },
  {
    id: 'reg-pmk-72-2016',
    regNumber: 'Permenkes No. 72 Tahun 2016',
    title: 'Peraturan Menteri Kesehatan RI No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2016,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Pedoman baku penyelenggaraan pelayanan kefarmasian di rumah sakit (tipe A, B, C, dan D) yang mencakup manajemen rantai pasok sediaan farmasi (KFT, Formularium RS, Unit Dose Dispensing / UDD) serta pelayanan farmasi klinis spesifik (visite, pemantauan kadar obat dalam darah / PKOD, dan dispensing sediaan steril).',
    scope: 'Instalasi Farmasi Rumah Sakit (IFRS), Depo Rawat Inap, Depo Rawat Jalan, Depo Bedah/IGD, Ruang Cleanroom IV Admixture, dan Komite Farmasi dan Terapi (KFT) Rumah Sakit.',
    keyArticles: [
      {
        articleNumber: 'Pasal 3 - 4',
        topic: 'Komite Farmasi dan Terapi (KFT) & Formularium Rumah Sakit',
        content: 'Rumah sakit wajib membentuk Komite Farmasi dan Terapi (KFT) yang bertugas menyusun dan mengevaluasi Formularium Rumah Sakit secara berkala berdasarkan bukti efikasi dan efisiensi biaya (Farmakoekonomi).',
        clinicalImplication: 'Seluruh dokter DPJP wajib meresepkan obat yang tercantum dalam Formularium Rumah Sakit yang berlaku.'
      },
      {
        articleNumber: 'Bab II - Sistem Distribusi Obat Rawat Inap',
        topic: 'Unit Dose Dispensing (UDD) & Desentralisasi Pelayanan',
        content: 'Distribusi obat untuk pasien rawat inap harus menerapkan sistem resep per unit dosis (Unit Dose Dispensing / UDD) yang disiapkan untuk pemakaian 24 jam atau satu kali waktu minum.',
        clinicalImplication: 'Sistem UDD terbukti menurunkan angka kesalahan pemberian obat (Medication Error) dan menghindari penumpukan obat berlebih di ruang rawat.'
      },
      {
        articleNumber: 'Bab III - Pelayanan Farmasi Klinis Steril',
        topic: 'Dispensing Sediaan Steril (Aseptic Dispensing, Sitostatika & TPN)',
        content: 'Pencampuran obat suntik, rekonstitusi sitostatika kemoterapi, dan penyiapan Nutrisi Parenteral Total (TPN) wajib dilakukan secara terpusat di Instalasi Farmasi dengan fasilitas ruang bersih (cleanroom) dan kabinet LAF/BSC.',
        clinicalImplication: 'Menjamin sterilitas sediaan injeksi dan melindungi petugas kesehatan dari keterpaparan uap obat karsinogenik.'
      }
    ],
    sanctionsOrPenalties: [
      'Penurunan predikat akreditasi rumah sakit pada penilaian standar STARKES/KARS (Bab PKPO).',
      'Teguran tertulis dan sanksi administratif dari Dinas Kesehatan Provinsi / Kementerian Kesehatan.'
    ],
    notes: 'Permenkes No. 72/2016 merupakan dasar hukum tertinggi operasional seluruh Apoteker Rumah Sakit di Indonesia.'
  },
  {
    id: 'reg-pmk-14-2021',
    regNumber: 'Permenkes No. 14 Tahun 2021',
    title: 'Peraturan Menteri Kesehatan RI No. 14 Tahun 2021 tentang Standar Usaha & Perizinan Berusaha Berbasis Risiko Sektor Kesehatan (OSS-RBA Apotek)',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2021,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Standar perizinan berusaha berbasis risiko terintegrasi sistem Online Single Submission (OSS-RBA) untuk sarana Apotek (KBLI 47721) dan Toko Obat (KBLI 47722), menetapkan persyaratan sarana, prasarana, peralatan kefarmasian, struktur organisasi SDM Apoteker, serta instrumen sertifikat standar.',
    scope: 'Seluruh pendirian apotek baru, perpanjangan Surat Izin Apotek (SIA), perubahan Apoteker Penanggung Jawab (APJ), dan relokasi sarana apotek di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Lampiran KBLI 47721 (Apotek)',
        topic: 'Persyaratan Sarana, Bangunan & Tata Ruang Apotek',
        content: 'Apotek wajib memiliki ruang penerimaan resep, ruang pelayanan resep dan peracikan, ruang penyerahan obat, ruang konseling khusus privat berpartisi, ruang penyimpanan sediaan farmasi dengan pengatur suhu (AC & chiller), dan ruang arsip dokumen.',
        clinicalImplication: 'Apotek dilarang beroperasi tanpa ruangan konseling dan tanpa pemantau suhu ruangan yang terkalibrasi.'
      },
      {
        articleNumber: 'Lampiran KBLI 47721 (SDM Apotek)',
        topic: 'Persyaratan Tenaga Apoteker & Waktu Pelayanan',
        content: 'Apotek harus dipimpin oleh 1 (satu) orang Apoteker Penanggung Jawab (APJ) berkewarganegaraan Indonesia dengan SIPA aktif. Jika apotek buka 24 jam atau lebih dari 1 shift, wajib didampingi oleh Apoteker Pendamping (Aping) dan/atau Tenaga Vokasi Farmasi.',
        clinicalImplication: 'Pelayanan obat keras resep hanya boleh berlangsung saat ada Apoteker yang bertugas di tempat.'
      }
    ],
    sanctionsOrPenalties: [
      'Penolakan penerbitan Sertifikat Standar Perizinan Apotek pada sistem OSS-RBA.',
      'Pembekuan sementara izin operasional apotek oleh Dinas Penanaman Modal & Pelayanan Terpadu Satu Pintu (DPMPTSP).'
    ],
    notes: 'Permenkes No. 14/2021 menyederhanakan birokrasi izin apotek melalui pengawasan post-audit berbasis matriks risiko.'
  },
  {
    id: 'reg-pp-44-2010',
    regNumber: 'PP No. 44 Tahun 2010',
    title: 'Peraturan Pemerintah RI Nomor 44 Tahun 2010 tentang Prekursor',
    type: 'pp',
    typeLabel: 'Peraturan Pemerintah (PP)',
    year: 2010,
    issuingAuthority: 'Presiden Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mengatur pengadaan, penyimpanan, peredaran, penyaluran, dan pencatatan zat atau bahan pemula/kimiawi (Prekursor Farmasi) yang dapat digunakan untuk pembuatan Narkotika dan Psikotropika secara ilegal.',
    scope: 'Industri farmasi, Pedagang Besar Farmasi (PBF), Apotek, Rumah Sakit, Puskesmas, dan Klinik.',
    keyArticles: [
      {
        articleNumber: 'Pasal 2 - 4 & Lampiran Tabel I',
        topic: 'Daftar Prekursor Farmasi Tabel I (Zat Aktif Obat Flu/Batuk/Kebidanan)',
        content: 'Prekursor Tabel I mencakup: Ephedrine, Pseudoephedrine, Norephedrine/Phenylpropanolamine (PPA), Ergometrine, Ergotamine, dan Potassium Permanganate (PK).',
        clinicalImplication: 'Obat flu/dekongestan yang mengandung Pseudoefedrin atau Efedrin wajib dikelola dengan pengawasan ketat untuk mencegah ekstraksi bahan baku metamfetamin (shabu).'
      },
      {
        articleNumber: 'Pasal 11 - 15',
        topic: 'Surat Pesanan Khusus & Pelaporan Prekursor',
        content: 'Pemesanan prekursor farmasi wajib menggunakan Surat Pesanan (SP) Prekursor khusus yang terpisah dan ditandatangani oleh Apoteker Penanggung Jawab dengan mencantumkan nomor SIPA.',
        clinicalImplication: 'Apoteker bertanggung jawab penuh atas kewajaran jumlah pesanan dan pencegahan kebocoran stok prekursor.'
      }
    ],
    drugListsOrSchedules: [
      {
        category: 'Prekursor Farmasi Tabel I (Bahan Obat Resmi)',
        items: [
          'Pseudoephedrine HCl (Dekongestan Oral)',
          'Ephedrine HCl (Bronkodilator / Vasopresor Injeksi)',
          'Phenylpropanolamine / PPA (Dekongestan)',
          'Ergometrine Maleate (Uterotonika Pendarahan Kebidanan)',
          'Ergotamine Tartrate (Antimigrain)',
          'Potassium Permanganate / PK (Antiseptik Kristal)'
        ],
        rules: 'Surat Pesanan Khusus Prekursor Farmasi, kartu stok mutasi realtime, pelaporan SIPNAP rutin bulanan.'
      }
    ],
    sanctionsOrPenalties: [
      'Pidana penjara dan denda sesuai UU No. 35/2009 bila prekursor dialihkan untuk pembuatan narkotika ilegal.',
      'Sanksi administratif berupa penutupan sarana dan pencabutan izin bagi apotek yang menjual prekursor dalam jumlah tidak wajar.'
    ],
    notes: 'Penyerahan obat flu bebas terbatas yang mengandung Pseudoephedrine/Ephedrine harus dibatasi kewajaran jumlah pembeliannya.'
  },
  {
    id: 'reg-perbpom-cdob-2020',
    regNumber: 'PerBPOM No. 6 Tahun 2020',
    title: 'Peraturan BPOM RI No. 6 Tahun 2020 tentang Perubahan atas PerBPOM No. 9 Tahun 2019 tentang Pedoman Teknis Cara Distribusi Obat yang Baik (CDOB)',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2020,
    issuingAuthority: 'Badan Pengawas Obat dan Makanan (BPOM RI)',
    status: 'Berlaku',
    summary: 'Standar penjaminan mutu rantai distribusi obat dari industri hingga sarana pelayanan farmasi guna memastikan integritas kualitas, keamanan, dan keabsahan obat tidak terdegradasi selama penyimpanan dan transportasi.',
    scope: 'Pedagang Besar Farmasi (PBF), Instalasi Farmasi Pemerintah, Gudang Farmasi Rumah Sakit, dan Apotek.',
    keyArticles: [
      {
        articleNumber: 'Bab Manajemen Mutu & Penyimpanan',
        topic: 'Kontrol Suhu, Kalibrasi Termometer & Validasi Ruangan',
        content: 'Penyimpanan obat wajib dikelompokkan sesuai bentuk sediaan dan dipantau menggunakan termohigrometer yang terkalibrasi berkala oleh laboratorium terakreditasi KAN.',
        clinicalImplication: 'Menjamin obat tidak rusak akibat paparan panas, kelembaban ekstrem, atau sinar matahari langsung.'
      },
      {
        articleNumber: 'Aneks Produk Rantai Dingin (Cold Chain Products)',
        topic: 'Spesifikasi Chiller Vaksin & Cold Chain Monitoring',
        content: 'Produk termolabil (Vaksin, Insulin, Oksitosin, Imunoglobulin) wajib disimpan pada chiller suhu 2-8°C dengan sistem alarm darurat dan genset otomatis jika terjadi pemadaman listrik.',
        clinicalImplication: 'Wajib melakukan verifikasi kondisi suhu ice pack dan indikator VVM saat menerima kiriman vaksin dari PBF.'
      }
    ],
    sanctionsOrPenalties: [
      'Penerbitan Surat Peringatan Keras (SPK) dari BPOM.',
      'Penghentian Sementara Kegiatan (PSK) distribusi/pelayanan.',
      'Pencabutan Sertifikat CDOB dan rekomendasi pencabutan izin PBF/Apotek.'
    ],
    notes: 'Standar CDOB wajib dipahami oleh Apoteker yang bertugas di bagian penerimaan logistik gudang farmasi.'
  },
  {
    id: 'reg-pmk-11-2017',
    regNumber: 'Permenkes No. 11 Tahun 2017',
    title: 'Peraturan Menteri Kesehatan RI No. 11 Tahun 2017 tentang Keselamatan Pasien (Patient Safety & SKP)',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2017,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Pedoman nasional keselamatan pasien di fasilitas pelayanan kesehatan, mengatur implementasi 6 Sasaran Keselamatan Pasien (SKP) dengan fokus khusus pada Sasaran 3 (Peningkatan Keamanan Obat yang Perlu Diwaspadai / High-Alert Medications) serta sistem pelaporan insiden tanpa rasa takut (*No Blame Culture*).',
    scope: 'Seluruh Rumah Sakit, Puskesmas, Klinik, dan Apotek di wilayah Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Sasaran 3 - SKP (Sasaran Keselamatan Pasien)',
        topic: 'Peningkatan Keamanan Obat High Alert & LASA/NORUM',
        content: 'Fasilitas pelayanan kesehatan wajib menetapkan daftar obat High Alert, memberi stiker penanda khusus (merah untuk High Alert, kuning untuk LASA), menata terpisah di rak, dan menerapkan verifikasi ganda mandiri (independent double check).',
        clinicalImplication: 'Elektrolit konsentrat tinggi (KCl 7.46%, NaCl 3%) tidak boleh disimpan di ruang perawatan umum kecuali di ICU/Kamar Operasi dengan pengawasan ketat.'
      },
      {
        articleNumber: 'Bab Sistem Pelaporan Insiden Keselamatan Pasien',
        topic: 'Pelaporan KNC, KTC, KTD & Kejadian Sentinel',
        content: 'Setiap insiden kesalahan obat (Medication Error) wajib dilaporkan secara tertulis dalam waktu 2x24 jam kepada Komite Keselamatan Pasien untuk dilakukan investigasi grading matriks risiko dan Root Cause Analysis (RCA).',
        clinicalImplication: 'Pelaporan bertujuan untuk perbaikan sistem prosedur secara berkelanjutan, bukan untuk menghukum staf.'
      }
    ],
    sanctionsOrPenalties: [
      'Penurunan tingkat kelulusan akreditasi fasilitas kesehatan.',
      'Audit investigasi khusus keselamatan pasien oleh Kementerian Kesehatan / Dinas Kesehatan.'
    ],
    notes: 'Kewaspadaan obat High Alert dan LASA adalah indikator mutu keselamatan pasien nomor satu di Instalasi Farmasi.'
  },
  {
    id: 'reg-fornas-kmk-2023',
    regNumber: 'KMK No. HK.01.07/MENKES/2000/2023',
    title: 'Keputusan Menteri Kesehatan RI tentang Formularium Nasional (FORNAS) BPJS Kesehatan',
    type: 'permenkes',
    typeLabel: 'Keputusan Menteri Kesehatan (KMK / FORNAS)',
    year: 2023,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Daftar obat terpilih yang wajib tersedia dan dijamin pembiayaannya dalam program Jaminan Kesehatan Nasional (JKN/BPJS Kesehatan), menetapkan restriksi indikasi medis, fasilitas peresepan (Faskes 1, 2, atau 3), serta batas maksimal jumlah peresepan per episode pelayanan.',
    scope: 'Fasilitas Kesehatan Tingkat Pertama (FKTP - Puskesmas/Klinik Pratama) dan Fasilitas Kesehatan Rujukan Tingkat Lanjutan (FKRTL - RS Tipe A, B, C, D) yang bekerjasama dengan BPJS Kesehatan.',
    keyArticles: [
      {
        articleNumber: 'Ketentuan Umum Restriksi Obat FORNAS',
        topic: 'Kepatuhan Restriksi Indikasi & Kewenangan Peresepan',
        content: 'Obat yang diresepkan untuk peserta BPJS Kesehatan harus sesuai dengan indikasi medis yang tercantum dalam FORNAS. Peresepan di luar restriksi FORNAS tidak dapat ditagihkan klaimnya ke BPJS.',
        clinicalImplication: 'Apoteker berperan menyaring resep obat BPJS agar tidak terjadi penolakan klaim (dispute klaim) akibat peresepan obat off-label atau melampaui kuota restriksi.'
      },
      {
        articleNumber: 'Tingkat Fasilitas Pelayanan (Faskes 1 vs Faskes 2/3)',
        topic: 'Jenjang Kompetensi Penggunaan Obat',
        content: 'Obat Faskes 1 dapat diresepkan oleh dokter umum di Puskesmas/Klinik (misal Metformin, Amlodipine, Captopril). Obat Faskes 2/3 khusus diresepkan oleh dokter spesialis/subspesialis di rumah sakit rujukan (misal Insulin Analog, Clopidogrel, ARB, Statin poten).',
        clinicalImplication: 'Menjaga kesinambungan rujukan balik (Program Rujuk Balik / PRB) untuk kestabilan penyakit kronis di faskes primer.'
      }
    ],
    drugListsOrSchedules: [
      {
        category: 'Contoh Restriksi Obat FORNAS Penyakit Kronis',
        items: [
          'Amlodipine (Hipertensi Faskes 1 - Maks 30 tab/bulan)',
          'Atorvastatin (Dislipidemia Faskes 2/3 - Pasien PJK / DM pasca infark - Maks 30 tab/bulan)',
          'Clopidogrel (Pasca Pasang Ring Jantung / Stroke Iskemik Akut - Maks 1 tahun pertama)',
          'Insulin Glargine / Detemir (DM Tipe 2 gagal terapi oral ganda HbA1c > 8%)'
        ],
        rules: 'Wajib mencocokkan diagnosa ICD-10 dan lampiran hasil lab klinis saat verifikasi resep BPJS.'
      }
    ],
    sanctionsOrPenalties: [
      'Penolakan klaim pembiayaan obat (klaim unapproved) oleh verifikator BPJS Kesehatan.',
      'Beban pembiayaan obat menjadi tanggung jawab rumah sakit bila melanggar restriksi FORNAS.'
    ],
    notes: 'FORNAS diperbarui secara berkala oleh Komite Nasional Formularium Nasional berbasis Evidence-Based Medicine (EBM).'
  },
  {
    id: 'reg-perbpom-telefarmasi-2020',
    regNumber: 'PerBPOM No. 8 Tahun 2020 jo No. 32 Tahun 2020',
    title: 'Peraturan BPOM RI tentang Pengawasan Obat dan Makanan yang Diedarkan Secara Daring (Telefarmasi & E-Pharmacy)',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2020,
    issuingAuthority: 'Badan Pengawas Obat dan Makanan (BPOM RI)',
    status: 'Berlaku',
    summary: 'Mengatur standar hukum pelayanan kefarmasian berbasis elektronik/daring (Telefarmasi), legalitas sistem elektronik farmasi (PSEF), tata cara penyerahan obat melalui kurir pengantaran, serta daftar obat yang DILARANG KERAS diperjualbelikan secara online.',
    scope: 'Apotek yang menyelenggarakan layanan pesan-antar obat online, Penyelenggara Sistem Elektronik Farmasi (PSEF), dan platform telemedicine.',
    keyArticles: [
      {
        articleNumber: 'Pasal 3 - 5',
        topic: 'Legalitas Sarana Pelayanan Obat Daring (PSEF)',
        content: 'Penjualan obat secara online hanya boleh dilakukan oleh Apotek resmi yang terdaftar pada sistem Penyelenggara Sistem Elektronik Farmasi (PSEF) Kementerian Kesehatan RI.',
        clinicalImplication: 'Toko obat atau marketplace non-farmasi dilarang menjual obat keras secara bebas.'
      },
      {
        articleNumber: 'Pasal 27',
        topic: 'Daftar Obat yang DILARANG Diedarkan Secara Daring',
        content: 'Apotek dilarang mengedarkan secara daring obat golongan: (1) Narkotika, (2) Psikotropika, (3) Obat-Obat Tertentu (OOT), (4) Obat keras sediaan injeksi/parenteral, (5) Obat keras sediaan implan, dan (6) Obat penggugur kandungan (Mifepriston, Misoprostol).',
        clinicalImplication: 'Obat narkotika/psikotropika/injeksi hanya boleh dilayani dan diserahkan secara tatap muka fisik di apotek.'
      }
    ],
    sanctionsOrPenalties: [
      'Take down (pemblokiran) tautan situs web atau toko online oleh Kementerian Kominfo dan BPOM.',
      'Pencabutan izin Penyelenggara Sistem Elektronik Farmasi (PSEF) dan Surat Izin Apotek (SIA).'
    ],
    notes: 'Pengantaran obat resep online wajib menggunakan wadah tertutup kedap dan segel pengaman berlogo Apotek pengirim.'
  },
  {
    id: 'reg-pmk-generik-2014',
    regNumber: 'Permenkes No. 28 Tahun 2014 & Permenkes No. 068/2010',
    title: 'Permenkes tentang Kewajiban Menggunakan Obat Generik di Fasilitas Pelayanan Kesehatan Pemerintah',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2014,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mewajibkan dokter dan dokter gigi di fasilitas pelayanan kesehatan pemerintah (RSUD, RSUP, Puskesmas) untuk meresepkan Obat Generik Berlogo (OGB) serta memberikan hak substitusi obat generik kepada Apoteker demi keterjangkauan akses obat nasional.',
    scope: 'Seluruh Rumah Sakit Pemerintah, Puskesmas, Balai Kesehatan, dan Apotek penyedia layanan BPJS.',
    keyArticles: [
      {
        articleNumber: 'Pasal 4 - 7 (Permenkes 068/2010)',
        topic: 'Kewajiban Penulisan Resep Generik',
        content: 'Dokter di faskes pemerintah wajib menuliskan resep dengan nama generik (INN - International Nonproprietary Names). Dilarang menuliskan nama dagang kecuali obat tersebut belum tersedia bentuk generiknya.',
        clinicalImplication: 'Memastikan efisiensi anggaran belanja obat pemerintah dan keterjangkauan terapi pasien.'
      },
      {
        articleNumber: 'Pasal 8',
        topic: 'Hak Substitusi Generik oleh Apoteker',
        content: 'Apoteker berwenang mengganti obat merk dagang yang tertulis pada resep dengan obat generik yang setara secara bioekivalen dengan menginformasikan kepada pasien.',
        clinicalImplication: 'Mendukung kemandirian klinis Apoteker dalam mengoptimalkan biaya terapi pasien tanpa menurunkan khasiat.'
      }
    ],
    sanctionsOrPenalties: [
      'Teguran lisan dan peringatan tertulis dari pimpinan fasilitas kesehatan.',
      'Sanksi administratif kepegawaian bagi tenaga medis yang menolak meresepkan generik tanpa alasan ilmiah.'
    ],
    notes: 'Obat generik wajib memenuhi standar Cara Pembuatan Obat yang Baik (CPOB) dan uji Bioekivalensi (BE) BPOM yang setara dengan obat inovator/paten.'
  },
  {
    id: 'reg-pp-28-2024',
    regNumber: 'PP No. 28 Tahun 2024',
    title: 'Peraturan Pemerintah RI Nomor 28 Tahun 2024 tentang Peraturan Pelaksanaan UU No. 17 Tahun 2023 tentang Kesehatan',
    type: 'pp',
    typeLabel: 'Peraturan Pemerintah (PP)',
    year: 2024,
    issuingAuthority: 'Presiden Republik Indonesia',
    status: 'Berlaku',
    summary: 'Peraturan pelaksana komprehensif dari Omnibus Law UU Kesehatan No. 17/2023, memuat ketentuan detail terkait tata kelola ketahanan kefarmasian nasional, kemandirian bahan baku obat (BBO), tata cara registrasi STR seumur hidup, penerbitan SIP tenaga medis & kefarmasian, dan sistem pengawasan terintegrasi.',
    scope: 'Seluruh fasyankes, industri farmasi, PBF distributor, apotek, klinik, puskesmas, dan organisasi profesi kesehatan di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 312 - 325',
        topic: 'Kemandirian & Ketahanan Sediaan Farmasi',
        content: 'Pemerintah memprioritaskan penggunaan bahan baku obat dalam negeri dan produk farmasi hasil riset domestik dalam katalog pengadaan barang pemerintah.',
        clinicalImplication: 'Fasyankes diwajibkan memprioritaskan obat produksi dalam negeri yang telah memiliki sertifikat Tingkat Komponen Dalam Negeri (TKDN).'
      },
      {
        articleNumber: 'Pasal 680 - 695',
        topic: 'Tata Cara Penerbitan SIP & Registrasi Tenaga Kesehatan',
        content: 'Surat Izin Praktik (SIP) diterbitkan oleh Pemerintah Daerah Kabupaten/Kota berdasarkan STR yang masih aktif dan surat keterangan tempat praktik (maksimal 3 tempat praktik untuk dokter dan Apoteker).',
        clinicalImplication: 'Apoteker wajib memiliki SIPA aktif di setiap sarana tempat menjalankan pekerjaan kefarmasian (maksimal 3 sarana).'
      },
      {
        articleNumber: 'Pasal 1040 - 1055',
        topic: 'Sanksi Administratif Berjenjang',
        content: 'Pelanggaran terhadap standar pelayanan kefarmasian dikenakan sanksi administratif berupa: teguran tertulis, denda administratif, penghentian sementara kegiatan, hingga pencabutan izin berusaha.',
        clinicalImplication: 'Kewajiban kepatuhan penuh terhadap SOP pelayanan kefarmasian dan standar akreditasi fasilitas kesehatan.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis dan denda administratif.',
      'Penghentian sementara operasional sarana farmasi.',
      'Pencabutan izin berusaha (SIA/SIFRS) dan pembekuan SIPA Apoteker.'
    ],
    notes: 'PP No. 28/2024 mengintegrasikan puluhan peraturan pemerintah sektor kesehatan sebelumnya menjadi satu kesatuan regulasi tunggal.'
  },
  {
    id: 'reg-pmk-74-2016-puskesmas',
    regNumber: 'Permenkes No. 74/2016 & PMK No. 26/2020',
    title: 'Permenkes RI tentang Standar Pelayanan Kefarmasian di Pusat Kesehatan Masyarakat (Puskesmas)',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2016,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mengatur standar manajerial pengelolaan sediaan farmasi & BMHP serta pelayanan farmasi klinis di Puskesmas rawat jalan, Puskesmas rawat inap, Puskesmas Pembantu (Pustu), dan Posyandu.',
    scope: 'Seluruh Pusat Kesehatan Masyarakat (Puskesmas) dan jaringannya di seluruh Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 3 Ayat (1) - (2)',
        topic: 'Pengelolaan Obat Publik & LPLPO',
        content: 'Pengelolaan sediaan farmasi dan BMHP di Puskesmas meliputi perencanaan, permintaan melalui Laporan Pemakaian dan Lembar Permintaan Obat (LPLPO) ke Dinas Kesehatan, penerimaan, penyimpanan, pendistribusian ke sub-unit (Pustu/Polindes), dan pengendalian.',
        clinicalImplication: 'LPLPO wajib disusun secara tertib setiap bulan berdasarkan metode konsumsi dan morbiditas pola penyakit.'
      },
      {
        articleNumber: 'Pasal 3 Ayat (3)',
        topic: 'Pelayanan Farmasi Klinis di Puskesmas',
        content: 'Pelayanan farmasi klinis meliputi: pengkajian resep, penyerahan obat dan pemberian informasi, Pelayanan Informasi Obat (PIO), konseling, ronde/visite pasien (pada Puskesmas rawat inap), pemantauan terapi obat (PTO), dan Monitoring Efek Samping Obat (MESO).',
        clinicalImplication: 'Apoteker Puskesmas wajib hadir memberikan konseling langsung pada pasien kronis (Program Pengelolaan Penyakit Kronis / Prolanis).'
      }
    ],
    sanctionsOrPenalties: [
      'Penurunan skor akreditasi Puskesmas oleh Lembaga Penyelenggara Akreditasi Pelayanan Kesehatan Primer (LPA PKP).',
      'Teguran administratif dari Kepala Dinas Kesehatan Kabupaten/Kota.'
    ],
    notes: 'Permenkes No. 26 Tahun 2020 mempertegas kewajiban penempatan minimal 1 orang Apoteker di setiap Puskesmas di Indonesia.'
  },
  {
    id: 'reg-pmk-34-2021-klinik',
    regNumber: 'Permenkes No. 34 Tahun 2021',
    title: 'Permenkes RI tentang Standar Pelayanan Kefarmasian di Klinik',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2021,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Menetapkan standar baku penyelenggaraan ruang farmasi di Klinik Pratama dan Klinik Utama, kewajiban penanggung jawab teknis kefarmasian, serta batasan pengelolaan obat.',
    scope: 'Seluruh Klinik Pratama (rawat jalan/inap) dan Klinik Utama di wilayah Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 3 - 5',
        topic: 'Penyelenggaraan Pelayanan Farmasi di Klinik',
        content: 'Klinik rawat inap wajib memiliki Instalasi/Ruang Farmasi yang dipimpin oleh seorang Apoteker yang memiliki SIPA. Klinik Pratama rawat jalan dapat menyelenggarakan pelayanan farmasi jika memiliki Apoteker penanggung jawab.',
        clinicalImplication: 'Klinik rawat inap dilarang beroperasi tanpa penanggung jawab Apoteker.'
      },
      {
        articleNumber: 'Pasal 6',
        topic: 'Pengelolaan Sediaan Farmasi & Darurat Medis',
        content: 'Klinik yang tidak memiliki ruang farmasi mandiri hanya dapat mengelola obat emergensi medis dalam jumlah terbatas dan wajib bekerjasama dengan Apotek terdekat.',
        clinicalImplication: 'Dilarang menyimpan stok obat bebas dan obat keras dalam jumlah besar di klinik tanpa adanya ruang farmasi berizin.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis dan pembekuan izin operasional klinik oleh Dinas Kesehatan.',
      'Pencabutan izin operasional klinik.'
    ],
    notes: 'Klinik wajib mematuhi Formularium Nasional dan Formularium Klinik yang ditetapkan oleh penanggung jawab medis bersama Apoteker.'
  },
  {
    id: 'reg-pmk-3-2015-narkotika',
    regNumber: 'Permenkes No. 3 Tahun 2015',
    title: 'Permenkes RI tentang Peredaran, Penyimpanan, Pemusnahan, dan Pelaporan Narkotika, Psikotropika, dan Prekursor Farmasi',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2015,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Regulasi teknis operasional paling krusial bagi Apoteker mengenai tata cara pemesanan dengan SP khusus, spesifikasi lemari penyimpanan berkunci ganda, tata cara pemusnahan bersama saksi resmi, dan pelaporan bulanan.',
    scope: 'Industri Farmasi, PBF Distributor, Instalasi Farmasi RS, Apotek, Klinik, dan Puskesmas.',
    keyArticles: [
      {
        articleNumber: 'Pasal 9 - 14',
        topic: 'Ketentuan Surat Pesanan (SP) Narkotika & Psikotropika',
        content: 'Surat Pesanan Narkotika hanya boleh memuat 1 (satu) jenis obat narkotika per lembar SP (Form N-9) dan dibuat dalam rangkap 4. Surat Pesanan Psikotropika dibuat minimal rangkap 3 dan boleh memuat lebih dari 1 jenis obat psikotropika.',
        clinicalImplication: 'Larangan mutlak mencampur pesanan narkotika dengan obat lain dalam satu lembar SP.'
      },
      {
        articleNumber: 'Pasal 25 - 30',
        topic: 'Spesifikasi Lemari Khusus Penyimpanan Narkotika',
        content: 'Lemari penyimpanan narkotika wajib: 1) Terbuat dari bahan kuat/kayu tebal atau besi, 2) Memiliki 2 (dua) buah kunci yang berbeda, 3) Diletakkan di tempat aman dan tidak terlihat umum, 4) Menempel permanen pada dinding atau lantai (dibaut/ditanam).',
        clinicalImplication: 'Anak kunci lemari narkotika dipegang oleh Apoteker Penanggung Jawab dan pegawai lain yang dikuasakan secara tertulis.'
      },
      {
        articleNumber: 'Pasal 37 - 42',
        topic: 'Tata Cara Pemusnahan Narkotika & Psikotropika',
        content: 'Pemusnahan narkotika/psikotropika wajib disaksikan oleh petugas Dinas Kesehatan Kabupaten/Kota dan/atau Balai Besar POM setempat, serta dibuatkan Berita Acara Pemusnahan Narkotika rangkap 4.',
        clinicalImplication: 'Dilarang membuang sisa atau sediaan narkotika kedaluwarsa ke saluran pembuangan umum tanpa prosedur pemusnahan resmi.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis dan penghentian sementara kegiatan sarana.',
      'Pencabutan izin sarana kefarmasian dan rekomendasi sanksi pidana narkotika.'
    ],
    notes: 'Kewajiban pelaporan SIPNAP elektronik paling lambat tanggal 10 setiap bulan diatur secara mengikat pada peraturan ini.'
  },
  {
    id: 'reg-perbpom-cpob-2024',
    regNumber: 'Peraturan BPOM No. 13 Tahun 2024',
    title: 'Peraturan BPOM tentang Standar Cara Pembuatan Obat yang Baik (CPOB 2024 / Annex 1 Produk Steril)',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2024,
    issuingAuthority: 'Kepala Badan Pengawas Obat dan Makanan RI',
    status: 'Berlaku',
    summary: 'Pedoman standar mutu industri farmasi yang mengadopsi standar internasional PIC/S GMP terkini, khususnya revisi komprehensif Annex 1 mengenai pembuatan produk steril, strategi pengendalian kontaminasi (CCS), klasifikasi ruang bersih (Cleanroom Grade A-D), dan manajemen risiko mutu (QRM).',
    scope: 'Seluruh Industri Farmasi, Fasilitas Produksi Radiofarmaka, dan Unit Produksi Steril di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Annex 1 Butir 4.1 - 4.10',
        topic: 'Klasifikasi Ruang Bersih Steril (Kelas A, B, C, D)',
        content: 'Zona Kelas A (LAF/RABS/Isolator) memiliki batas partikel >= 0.5 μm maksimal 3.520 partikel/m³ baik kondisi non-operasional (at rest) maupun operasional (in operation). Kelas B merupakan latar belakang Kelas A untuk pengisian aseptis.',
        clinicalImplication: 'Penyiapan sediaan steril intravena dan rekonstitusi sitostatika di RS wajib mengacu pada prinsip ruang bersih CPOB.'
      },
      {
        articleNumber: 'Annex 1 Butir 8.1 - 8.25',
        topic: 'Sistem Pengolahan Air Farmasi (Water for Injection / WFI)',
        content: 'Water for Injection (WFI) wajib diproduksi melalui proses destilasi uap multi-efek dari Purified Water (PW) dan disirkulasikan secara kontinu pada suhu loop >= 80°C untuk mencegah pembentukan biofilm bakteri dan endotoksin.',
        clinicalImplication: 'Pelarut injeksi wajib bebas pirogen (< 0.25 EU/mL) dan teruji sterilitasnya.'
      }
    ],
    sanctionsOrPenalties: [
      'Pemberian sanksi Peringatan Keras (Warning Letter) BPOM.',
      'Pembekuan sementara Izin Edar dan Sertifikat CPOB (Suspension of GMP Certificate).',
      'Penarikan produk dari seluruh peredaran (Mandatory Recall) dan penghentian produksi.'
    ],
    notes: 'Industri farmasi wajib menyusun dokumen Contamination Control Strategy (CCS) yang mencakup evaluasi berkala terhadap personel, fasilitas, utilitas, dan bahan baku.'
  },
  {
    id: 'reg-perbpom-obat-tradisional-2022',
    regNumber: 'Peraturan BPOM No. 32 Tahun 2022',
    title: 'Peraturan BPOM tentang Kriteria dan Tata Laksana Registrasi Obat Bahan Alam (Jamu, OHT, Fitofarmaka)',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2022,
    issuingAuthority: 'Kepala Badan Pengawas Obat dan Makanan RI',
    status: 'Berlaku',
    summary: 'Mengatur persyaratan teknis registrasi, pembuktian klaim khasiat, standardisasi mutu simplisia dan ekstrak, serta logo resmi kategori Jamu, Obat Herbal Terstandar (OHT), dan Fitofarmaka.',
    scope: 'Industri Obat Tradisional (IOT), Industri Ekstrak Bahan Alam (IEBA), Usaha Kecil Obat Tradisional (UKOT), dan Usaha Mikro Obat Tradisional (UMOT).',
    keyArticles: [
      {
        articleNumber: 'Pasal 6 - 9',
        topic: 'Kategori Obat Bahan Alam & Pembuktian Khasiat',
        content: '1) Jamu: Klaim khasiat berdasarkan data empiris turun-temurun (logo ranting daun hijau). 2) OHT: Telah dibuktikan keamanan dan khasiatnya melalui uji pra-klinis pada hewan dan bahan baku terstandar (logo 3 bintang hijau). 3) Fitofarmaka: Telah dibuktikan melalui uji klinis pada manusia (Fase I-III) dan bahan baku terstandar (logo kristal es hijau).',
        clinicalImplication: 'Apoteker wajib mengedukasi masyarakat bahwa hanya Fitofarmaka yang telah teruji klinis setara obat konvensional.'
      },
      {
        articleNumber: 'Pasal 18',
        topic: 'Larangan Mutlak Penambahan Bahan Kimia Obat (BKO)',
        content: 'Obat bahan alam dilarang keras mengandung Bahan Kimia Obat (BKO) seperti Deksametason, Fenilbutazon, Paracetamol, Sildenafil, atau zat aktif sintetik lainnya.',
        clinicalImplication: 'Produk jamu yang mengandung BKO berstatus ILEGAL dan wajib segera ditarik dari etalase apotek.'
      }
    ],
    sanctionsOrPenalties: [
      'Pembatalan dan pencabutan Nomor Izin Edar (NIE) produk (TR/HT/FF).',
      'Pemberian Peringatan Publik (Public Warning) resmi oleh BPOM.',
      'Sanksi pidana penjara bagi produsen yang sengaja mencampur BKO.'
    ],
    notes: 'Klaim khasiat jamu dilarang menggunakan istilah medis penyakit berat (misal: "Mengobati Kanker/Diabetes/Gagal Ginjal") dan hanya boleh mencantumkan klaim promotif/preventif.'
  },
  {
    id: 'reg-perbpom-farmakovigilans-2022',
    regNumber: 'Peraturan BPOM No. 15 Tahun 2022',
    title: 'Peraturan BPOM tentang Penerapan Farmakovigilans bagi Industri Farmasi dan Fasilitas Pelayanan Kesehatan',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2022,
    issuingAuthority: 'Kepala Badan Pengawas Obat dan Makanan RI',
    status: 'Berlaku',
    summary: 'Mewajibkan pemantauan keamanan obat pasca-pemasaran (post-market safety surveillance), deteksi Kejadian Tidak Diinginkan (KTD) / Reaksi Obat yang Tidak Diinginkan (ROTD), analisis kausalitas Naranjo, dan pelaporan elektronik ke Pusat Farmakovigilans Nasional BPOM.',
    scope: 'Industri Farmasi, Rumah Sakit, Apotek, Klinik, Puskesmas, dan Tenaga Kesehatan di seluruh Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 4 - 8',
        topic: 'Kewajiban Pelaporan KTD Serius',
        content: 'Setiap KTD Serius (menyebabkan kematian, mengancam jiwa, cacat permanen, kelainan kongenital janin, atau rawat inap diperpanjang) WAJIB dilaporkan ke BPOM selambat-lambatnya dalam waktu 15 (lima belas) HARI KALENDER sejak informasi diterima.',
        clinicalImplication: 'Apoteker wajib mendokumentasikan ROTD pasien pada formulir Kuning MESO dan mengirimkannya ke BPOM via portal e-MESO.'
      },
      {
        articleNumber: 'Pasal 12',
        topic: 'Analisis Kausalitas Hubungan Kausal Obat-KTD',
        content: 'Penetapan tingkat kemungkinan hubungan kausal antara obat yang dicurigai dengan gejala KTD menggunakan Algoritma Naranjo atau Kategori Kausalitas WHO-UMC (Certain, Probable, Possible, Unlikely, Conditional, Unassessable).',
        clinicalImplication: 'Apoteker melakukan asesmen re-challenge dan de-challenge obat sebelum menyimpulkan efek samping obat.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis dari BPOM.',
      'Kewajiban revisi informasi keamanan pada brosur/leaflet obat.',
      'Pembatasan indikasi obat atau pencabutan izin edar produk yang terbukti memiliki profil keamanan buruk.'
    ],
    notes: 'Pelaporan MESO secara sukarela oleh Apoteker sangat dilindungi dan menjadi kontribusi vital bagi keselamatan pasien nasional.'
  },
  {
    id: 'reg-perbpom-penandaan-etiket-2021',
    regNumber: 'Peraturan BPOM No. 31 Tahun 2021',
    title: 'Peraturan BPOM tentang Pengawasan Informasi Produk, Penandaan, dan Label Obat',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2021,
    issuingAuthority: 'Kepala Badan Pengawas Obat dan Makanan RI',
    status: 'Berlaku',
    summary: 'Menetapkan standar logo lingkaran golongan obat, batas peringatan khusus (P.No. 1 s/d P.No. 6) pada obat bebas terbatas, format informasi etiket kemasan primer/sekunder, dan leaflet informasi pasien.',
    scope: 'Industri Farmasi, Distributor PBF, Apotek, Rumah Sakit, dan Toko Obat Berizin.',
    keyArticles: [
      {
        articleNumber: 'Pasal 5 - 12',
        topic: 'Logo Golongan Obat & Penandaan Visual',
        content: '1) Obat Keras: Lingkaran bulat merah bergaris tepi hitam dengan huruf K hitam di tengah. 2) Obat Bebas Terbatas: Lingkaran biru bergaris tepi hitam. 3) Obat Bebas: Lingkaran hijau bergaris tepi hitam. 4) Narkotika: Lingkaran palang medali merah.',
        clinicalImplication: 'Apoteker memastikan seluruh obat yang diserahkan memiliki penandaan visual golongan yang jelas dan benar.'
      },
      {
        articleNumber: 'Pasal 15',
        topic: 'Tanda Peringatan Khusus Obat Bebas Terbatas (P.No. 1 - P.No. 6)',
        content: 'Kotak persegi panjang hitam dengan tulisan putih: P.No. 1 (Awas! Obat Keras. Bacalah aturan memakainya), P.No. 2 (Awas! Obat Keras. Hanya untuk kumur, jangan ditelan), P.No. 3 (Awas! Obat Keras. Hanya untuk bagian luar badan), P.No. 4 (Awas! Obat Keras. Hanya untuk dibakar), P.No. 5 (Awas! Obat Keras. Tidak boleh ditelan), P.No. 6 (Awas! Obat Keras. Obat wasir, jangan ditelan).',
        clinicalImplication: 'Wajib memberikan edukasi khusus pada obat dengan tanda peringatan P.No. 2 dan P.No. 3 agar pasien tidak salah menelan sediaan luar.'
      }
    ],
    sanctionsOrPenalties: [
      'Peringatan tertulis dan perintah penarikan kemasan yang salah cetak.',
      'Penghentian sementara kegiatan peredaran produk obat.'
    ],
    notes: 'Kemasan obat di Indonesia wajib memuat 2D Barcode (QR Code) BPOM untuk verifikasi keaslian produk melalui aplikasi BPOM Mobile.'
  },
  {
    id: 'reg-pmk-24-2022-rme',
    regNumber: 'Permenkes No. 24 Tahun 2022',
    title: 'Permenkes RI tentang Rekam Medis Elektronik (RME) & Resep Elektronik Terintegrasi SatuSehat',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2022,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mewajibkan seluruh fasilitas pelayanan kesehatan menyelenggarakan Rekam Medis Elektronik (RME), mengatur keabsahan resep elektronik (e-Prescribing), dan integrasi data kefarmasian dengan platform SatuSehat Kemenkes RI.',
    scope: 'Seluruh Rumah Sakit, Puskesmas, Klinik, Apotek, dan Praktik Mandiri Nakes di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Pasal 15 - 20',
        topic: 'Keabsahan Resep Elektronik & Tanda Tangan Digital',
        content: 'Resep elektronik yang diterbitkan melalui sistem RME terverifikasi memiliki kekuatan hukum yang sah setara dengan resep kertas, asalkan memuat identitas dokter ber-SIP dan Tanda Tangan Elektronik (TTE) tersertifikasi.',
        clinicalImplication: 'Apoteker berhak memproses dan menyerahkan obat berdasarkan resep elektronik yang sah tanpa meminta resep kertas fisik.'
      },
      {
        articleNumber: 'Pasal 28 - 32',
        topic: 'Kerahasiaan & Keamanan Data Medis Pasien',
        content: 'Tenaga kefarmasian wajib menjaga kerahasiaan data resep dan riwayat pengobatan pasien dalam sistem elektronik. Pembukaan data hanya untuk kepentingan pengobatan, rujukan, atau penegakan hukum.',
        clinicalImplication: 'Dilarang menyebarluaskan foto resep atau data identitas pengobatan pasien ke media sosial tanpa izin tertulis.'
      }
    ],
    sanctionsOrPenalties: [
      'Teguran tertulis dan pembekuan integrasi platform SatuSehat.',
      'Sanksi administratif dan hukum pelanggaran Undang-Undang Perlindungan Data Pribadi (UU PDP).'
    ],
    notes: 'Kewajiban penyelenggaraan RME bagi seluruh sarana kefarmasian berlaku efektif sejak 31 Desember 2023.'
  },
  {
    id: 'reg-pmk-28-2014-jkn-bpjs',
    regNumber: 'Permenkes No. 28 Tahun 2014 & Permenkes No. 3 Tahun 2023',
    title: 'Permenkes RI tentang Pedoman Pelaksanaan Program Jaminan Kesehatan Nasional (JKN / BPJS Kesehatan & PRB)',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2014,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mengatur tata laksana klaim paket INA-CBGs di Rumah Sakit, tarif kapitasi FKTP, restriksi peresepan Formularium Nasional (Fornas), serta Program Rujuk Balik (PRB) obat kronis 30 hari untuk peserta BPJS Kesehatan.',
    scope: 'Seluruh Fasilitas Kesehatan Tingkat Pertama (FKTP), Fasilitas Kesehatan Rujukan Tingkat Lanjutan (FKRTL), dan Apotek Jejaring PRB BPJS.',
    keyArticles: [
      {
        articleNumber: 'Bab IV Butir 3',
        topic: 'Pelayanan Program Rujuk Balik (PRB) Obat Kronis 30 Hari',
        content: 'Peserta BPJS dengan 9 penyakit kronis stabil (Diabetes Mellitus, Hipertensi, Jantung Koroner, PPOK, Asma Bronkial, Stroke, Epilepsi, Skizofrenia, dan Lupus SLE) dilayani di Apotek PRB/FKTP dengan pemberian obat kronis untuk durasi 30 (tiga puluh) hari.',
        clinicalImplication: 'Apoteker Apotek PRB wajib memastikan obat kronis diberikan tepat dosis 30 hari dan melakukan monitoring kepatuhan minum obat.'
      },
      {
        articleNumber: 'Bab IV Butir 5',
        topic: 'Kepatuhan Restriksi Formularium Nasional (Fornas)',
        content: 'Pemberian obat untuk peserta JKN wajib mengacu pada restriksi kuantitas dan kriteria diagnosis spesifik yang tercantum dalam Formularium Nasional (misal: Statin hanya untuk LDL > 130 mg/dL, Insulin analog hanya untuk HbA1c > 7.5%).',
        clinicalImplication: 'Apoteker bertugas menapis resep agar klaim obat BPJS tidak ditolak (verifikasi kesesuaian restriksi Fornas).'
      }
    ],
    sanctionsOrPenalties: [
      'Penolakan klaim (Unclaimable / Dispute) pembiayaan obat oleh verifikator BPJS Kesehatan.',
      'Sanksi pemutusan kerjasama fasilitas kesehatan rujukan dengan BPJS Kesehatan.'
    ],
    notes: 'Obat di luar Formularium Nasional hanya dapat disetujui melalui mekanisme persetujuan khusus Komite Medis / Tim Pembina Farmasi RS.'
  },
  {
    id: 'reg-perbpom-recall-obat-2021',
    regNumber: 'Peraturan BPOM No. 14 Tahun 2021',
    title: 'Peraturan BPOM tentang Penarikan (Recall) dan Pemusnahan Obat yang Tidak Memenuhi Standar Mutu',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2021,
    issuingAuthority: 'Kepala Badan Pengawas Obat dan Makanan RI',
    status: 'Berlaku',
    summary: 'Mengatur klasifikasi penarikan obat (Kelas I, II, dan III), batas waktu eksekusi karantina stok, alur penarikan dari distributor/apotek, dan pelaporan pemusnahan obat yang tidak memenuhi syarat (TMS).',
    scope: 'Industri Farmasi, Pedagang Besar Farmasi (PBF), Instalasi Farmasi RS, Apotek, Klinik, dan Toko Obat.',
    keyArticles: [
      {
        articleNumber: 'Pasal 4 - 8',
        topic: 'Klasifikasi Derajat Penarikan Obat (Recall Class)',
        content: '1) Penarikan Kelas I: Obat berpotensi besar menimbulkan efek samping serius yang mengancam jiwa atau kematian (misal: kontaminasi cemaran etilen glikol/dietilen glikol beracun, salah zat aktif, sediaan steril terkontaminasi mikroba patogen) - Wajib ditarik dalam waktu 1x24 JAM hingga tingkat konsumen. 2) Penarikan Kelas II: Obat berpotensi menimbulkan efek samping temporer/reversibel - Ditarik dalam 72 JAM. 3) Penarikan Kelas III: Cacat mutu teknis non-kritis (label pudar/volume kurang).',
        clinicalImplication: 'Saat menerima surat edaran Recall Kelas I, Apoteker SEGERA menghentikan penyerahan obat, menarik seluruh stok dari etalase, memindahkannya ke lemari karantina berstiker merah, dan mengembalikan ke PBF.'
      },
      {
        articleNumber: 'Pasal 15',
        topic: 'Pemisahan & Karantina Fisik Obat Recall',
        content: 'Fasilitas farmasi wajib memisahkan obat yang ditarik di lemari/ruang karantina khusus bertanda jelas "OBAT KARANTINA / DITARIK - JANGAN DIJUAL" agar tidak terambil secara tidak sengaja oleh petugas.',
        clinicalImplication: 'Mengunci akses fisik stok obat recall di sistem komputer SIMRS/Apotek.'
      }
    ],
    sanctionsOrPenalties: [
      'Pemberian sanksi penutupan fasilitas bagi distributor/apotek yang sengaja tetap menjual obat recall.',
      'Sanksi pidana kejahatan perlindungan konsumen dan kesehatan.'
    ],
    notes: 'Industri Farmasi wajib menyampaikan Laporan Kemajuan Penarikan Produk (Recall Progress Report) secara berkala kepada BPOM.'
  },
  {
    id: 'reg-pmk-7-2019-limbah-b3',
    regNumber: 'Permenkes No. 7 Tahun 2019',
    title: 'Permenkes RI tentang Kesehatan Lingkungan Rumah Sakit & Pengelolaan Limbah Farmasi B3',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2019,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Mengatur standar baku mutu kesehatan lingkungan, pemilahan limbah medis padat/cair, pengelolaan limbah sitotoksik/sitostatika berkode warna ungu, dan metode pemusnahan limbah B3 farmasi.',
    scope: 'Seluruh Rumah Sakit, Puskesmas, Laboratorium Kesehatan, dan Klinik di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Lampiran Bab V',
        topic: 'Pemilahan Limbah Farmasi & Pengkodean Warna Kantong',
        content: '1) Limbah Sitotoksik/Kanker: Kantong plastik tebal warna UNGU dengan simbol limbah sitotoksik. 2) Limbah Farmasi Kedaluwarsa/Terkontaminasi: Kantong plastik warna COKELAT. 3) Limbah Infeksius: Kantong warna KUNING. 4) Limbah Benda Tajam (jarum/spuit/ampul pecah): Safety Box tahan tusukan warna kuning.',
        clinicalImplication: 'Petugas farmasi dan perawat wajib membuang spuit sitostatika ke safety box dan kantong ungu khusus.'
      },
      {
        articleNumber: 'Lampiran Bab V Butir 4',
        topic: 'Metode Pengolahan Akhir Limbah Farmasi',
        content: 'Limbah sitostatika dan antibiotik wajib diolah melalui Insinerator suhu tinggi (> 1000°C - 1200°C) atau diserahkan kepada pihak ketiga pengolah limbah B3 berizin resmi KLHK. Obat cair tidak boleh dibuang langsung ke saluran pembuangan domestik.',
        clinicalImplication: 'Pemusnahan limbah farmasi wajib disertai dokumen Manifest Pengangkutan Limbah B3 resmi.'
      }
    ],
    sanctionsOrPenalties: [
      'Sanksi pidana pencemaran lingkungan hidup menurut UU No. 32 Tahun 2009.',
      'Pencabutan izin operasional pengolahan limbah dan denda administratif.'
    ],
    notes: 'Sisa vial sitostatika tergolong limbah sangat berbahaya dan dilarang dicampur dengan limbah medis umum.'
  },
  {
    id: 'reg-perbpom-oot-19-2023',
    regNumber: 'Peraturan BPOM No. 19 Tahun 2023',
    title: 'Peraturan BPOM tentang Pedoman Pengelolaan Obat-Obat Tertentu (OOT) yang Sering Disalahgunakan',
    type: 'perbpom',
    typeLabel: 'Peraturan BPOM (PerBPOM)',
    year: 2023,
    issuingAuthority: 'Kepala Badan Pengawas Obat dan Makanan RI',
    status: 'Berlaku',
    summary: 'Pembaruan regulasi pengawasan ketat terhadap obat-obat tertentu yang sering disalahgunakan (Tramadol, Triheksifenidil, Klorpromazin, Amitriptilin, Haloperidol, dan Dekstrometorfan tunggal), pembatasan peresepan, dan larangan iterasi resep.',
    scope: 'Industri Farmasi, PBF Distributor, Instalasi Farmasi RS, Apotek, dan Klinik.',
    keyArticles: [
      {
        articleNumber: 'Pasal 3 - 6',
        topic: 'Daftar Bahan Aktif Obat-Obat Tertentu (OOT)',
        content: 'OOT yang diawasi ketat mencakup sediaan tunggal maupun kombinasi: 1) Tramadol, 2) Triheksifenidil, 3) Klorpromazin, 4) Amitriptilin, 5) Haloperidol, dan 6) Dekstrometorfan sediaan tunggal.',
        clinicalImplication: 'Seluruh penerimaan dan penyerahan obat OOT wajib dicatat secara tertib pada kartu stok tersendiri.'
      },
      {
        articleNumber: 'Pasal 14 - 18',
        topic: 'Larangan Salinan Resep (Iterasi) Obat OOT',
        content: 'Penyerahan OOT kepada pasien hanya boleh dilayani berdasarkan RESEP ASLI DOKTER. DILARANG MENYERAHKAN OBAT OOT BERDASARKAN SALINAN RESEP (COPY RESEP) ATAU RESEP DENGAN TANDA ITERASI (PENGULANGAN).',
        clinicalImplication: 'Apoteker wajib menolak penyerahan Tramadol/Triheksifenidil jika pasien membawa copy resep dari sarana lain.'
      }
    ],
    sanctionsOrPenalties: [
      'Penghentian sementara kegiatan pelayanan obat OOT.',
      'Rekomendasi pencabutan izin sarana apotek/klinik ke Dinas Kesehatan.',
      'Sanksi pidana peredaran obat keras tanpa keahlian.'
    ],
    notes: 'Surat Pesanan (SP) OOT dibuat terpisah dari obat biasa dan ditandatangani oleh Apoteker Penanggung Jawab dengan nomor SIPA dan stempel resmi.'
  },
  {
    id: 'reg-kmk-ppk-antibiotik-aware',
    regNumber: 'Kepmenkes No. HK.01.07/MENKES/2021',
    title: 'Kepmenkes RI tentang Panduan Praktik Klinis Penggunaan Antibiotik Rasional (Kategori AWaRe WHO)',
    type: 'permenkes',
    typeLabel: 'Peraturan Menteri Kesehatan (Permenkes)',
    year: 2021,
    issuingAuthority: 'Menteri Kesehatan Republik Indonesia',
    status: 'Berlaku',
    summary: 'Menetapkan pedoman pengendalian resistensi antimikroba (PPRA), restriksi peresepan antibiotik berbasis bukti, dan klasifikasi AWaRe WHO (Access, Watch, Reserve) di fasilitas pelayanan kesehatan.',
    scope: 'Seluruh Dokter, Apoteker, Komite Pengendalian Resistensi Antimikroba (KPRA), dan Fasyankes di Indonesia.',
    keyArticles: [
      {
        articleNumber: 'Lampiran Bab II',
        topic: 'Klasifikasi Antibiotik AWaRe (Access, Watch, Reserve)',
        content: '1) Kelompok ACCESS: Antibiotik lini pertama untuk infeksi umum dengan potensi resistensi rendah (Amoksisilin, Doksisiklin, Kotrimoksazol). 2) Kelompok WATCH: Antibiotik dengan risiko resistensi tinggi, hanya untuk indikasi spesifik (Siprofloksasin, Seftriakson, Meropenem). 3) Kelompok RESERVE: Pilihan terakhir untuk kuman MDR (Kolistin, Linezolid, Tigesiklin, Ceftazidime-Avibactam) yang memerlukan persetujuan Tim KPRA.',
        clinicalImplication: 'Apoteker melakukan evaluasi restriksi form Automatic Stop Order (ASO) dan kaji uji kepekaan kultur kuman sebelum dispensing antibiotik Reserve.'
      },
      {
        articleNumber: 'Lampiran Bab III',
        topic: 'Kriteria Evaluasi Kerasionalan Antibiotik (Metode Gyssens)',
        content: 'Audit penggunaan antibiotik dilakukan secara berkala menggunakan Alur Gyssens: Kategori 0 (Tepat/Rasional), Kategori I (Tidak tepat waktu), Kategori II (Tidak tepat dosis/interval), Kategori III (Tidak tepat durasi), Kategori IV (Ada alternatif lebih efektif/kurang toksik/lebih murah), Kategori V (Tidak ada indikasi antibiotik), Kategori VI (Data rekam medis tidak lengkap).',
        clinicalImplication: 'Apoteker melaporkan profil kuantitatif DDD (Defined Daily Dose) dan kualitas Gyssens kepada Komite Medik.'
      }
    ],
    sanctionsOrPenalties: [
      'Pembatasan wewenang peresepan antibiotik cadangan bagi dokter yang tidak patuh panduan klinis.',
      'Penurunan penilaian akreditasi rumah sakit pada bab Program Nasional (Prognas PPRA).'
    ],
    notes: 'Durasi pemberian antibiotik profilaksis bedah dibatasi maksimal 24 jam pasca-operasi untuk mencegah resistensi kuman rumah sakit.'
  }
];

