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
  }
];
