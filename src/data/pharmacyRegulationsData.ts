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
  }
];

