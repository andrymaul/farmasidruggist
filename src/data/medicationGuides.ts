import { MedicationGuide } from '../types';

export function deduplicateMedicationGuides(guides: MedicationGuide[]): MedicationGuide[] {
  const mapById = new Map<string, MedicationGuide>();
  const mapByTitle = new Map<string, MedicationGuide>();
  const result: MedicationGuide[] = [];

  guides.forEach((g) => {
    const normId = (g.id || '').toLowerCase().trim();
    const normTitle = (g.title || '').toLowerCase().trim();

    const existing = (normId ? mapById.get(normId) : null) || mapByTitle.get(normTitle);

    if (!existing) {
      const copy = { ...g };
      if (normId) mapById.set(normId, copy);
      if (normTitle) mapByTitle.set(normTitle, copy);
      result.push(copy);
    }
  });

  return result;
}

const RAW_MEDICATION_GUIDES: MedicationGuide[] = [
  // =========================================================================
  // 1. MATA & TELINGA
  // =========================================================================
  {
    id: 'tetes-mata',
    title: 'Tetes Mata Botol Multidose (Eye Drops)',
    category: 'Mata & Telinga',
    iconName: 'Eye',
    shortDesc: 'Panduan tata cara penggunaan obat tetes mata steril multi-dose secara benar dan mencegah kontaminasi mikroba.',
    popularBrands: ['Cendo Tobroson', 'Cendo Xitrol', 'Rohto', 'Insto', 'Alcon Tears Naturale', 'Cendo Timol'],
    preparationSteps: [
      'Cuci tangan dengan air bersih mengalir dan sabun selama minimal 20 detik.',
      'Periksa tanggal kedaluwarsa dan label tanggal pertama kali botol dibuka (BUD maksimal 28 hari).',
      'Pastikan ujung penetes botol bersih, tidak retak, dan tidak tersentuh jari atau benda lain.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala',
        description: 'Duduk tegak, tengadahkan kepala ke belakang dan arahkan pandangan mata ke atas.',
        importantNote: 'Jangan menyentuhkan ujung botol penetes ke bola mata atau bulu mata.'
      },
      {
        stepNumber: 2,
        title: 'Tarik Kelopak Mata Bawah',
        description: 'Gunakan jari telunjuk bersih untuk menarik kelopak mata bawah perlahan ke arah bawah hingga membentuk kantung (conjunctival sac).'
      },
      {
        stepNumber: 3,
        title: 'Teteskan Obat Tepat 1 Tetes',
        description: 'Pegang botol di atas mata dan tekan perlahan hingga 1 tetes obat jatuh tepat ke dalam kantung kelopak mata bawah.',
        importantNote: 'Kapasitas kantung mata hanya menampung 1 tetes. Tetesan kedua akan terbuang meluber. Jika dokter meresepkan 2 tetes, beri jeda 5 menit.'
      },
      {
        stepNumber: 4,
        title: 'Tutup Mata & Tekan Sudut Mata (Nasolakrimal)',
        description: 'Tutup mata secara perlahan selama 1-2 menit (jangan pejamkan kencang). Tekan lembut sudut mata dekat hidung (duktus nasolakrimalis) dengan jari bersih.',
        importantNote: 'Oklusi nasolakrimalis mencegah obat terserap ke pembuluh darah sistemik, meminimalkan efek samping jantung/paru (misal pada tetes mata beta-bloker).'
      }
    ],
    importantWarnings: [
      'Jangan mengedipkan mata secara cepat atau mengucek mata setelah diteteskan karena akan memompa obat keluar dari mata.',
      'Lepaskan lensa kontak (soft lens) sebelum meneteskan obat mata. Tunggu minimal 15-20 menit sebelum memasangnya kembali.',
      'Jika menggunakan kombinasi obat mata (misal tetes A + tetes B): beri jeda minimal 5 menit. Jika kombinasi tetes mata + salep mata: gunakan tetes mata terlebih dahulu, tunggu 10 menit, baru gunakan salep mata.'
    ],
    dosAndDonts: {
      dos: [
        'Selalu cuci tangan sebelum dan sesudah meneteskan obat.',
        'Simpan obat pada suhu sejuk terhindar dari panas dan sinar matahari.',
        'Beri label tanggal pertama kali botol dibuka pada kemasan botol.'
      ],
      donts: [
        'Jangan menyentuhkan ujung penetes ke mata, jari, atau permukaan meja.',
        'Jangan berbagi obat tetes mata dengan orang lain.',
        'Jangan gunakan tetes mata yang sudah berubah warna, keruh, atau melewati batas waktu simpan.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar terkontrol (15°C - 25°C) terhindar dari cahaya langsung. Buang sisa obat 28 hari setelah segel botol pertama kali dibuka.',
    commonMistakes: [
      'Meneteskan langsung ke tengah kornea (bagian hitam mata) yang memicu rasa perih dan refleks kedip kencang.',
      'Menggunakan tetes mata yang sudah terbuka berbulan-bulan.',
      'Tidak menekan sudut mata dekat hidung sehingga obat mengalir ke tenggorokan dan terasa pahit.'
    ],
    clinicalPearls: [
      'Volume 1 tetes obat mata rata-rata 25-50 µL, sedangkan kapasitas retensi kantung mata hanya ~10 µL.',
      'Penekanan duktus nasolakrimalis meningkatkan bioavailabilitas obat di bilik anterior mata hingga 30-40%.'
    ]
  },
  {
    id: 'tetes-mata-minidose',
    title: 'Tetes Mata Minidose Bebas Pengawet (Non-Preserved Single-Dose Units)',
    category: 'Mata & Telinga',
    iconName: 'Eye',
    shortDesc: 'Panduan penggunaan tetes mata kemasan botol mini sekali pakai / tanpa pengawet dengan masa simpan khusus 3x24 jam.',
    popularBrands: ['Cendo Cenfresh Minidose', 'Cendo Augentonic Minidose', 'Cendo Eyefresh', 'Refresh Tears Minidose'],
    preparationSteps: [
      'Cuci tangan bersih dengan sabun dan air mengalir.',
      'Ambil 1 botol strip minidose dari kemasan amplop foil, putar penutup bagian atas hingga lepas.',
      'Pastikan wadah penutup disimpan di tempat bersih untuk menutup kembali sisa cairan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Buka Segel & Posisikan Kepala',
        description: 'Tengadahkan kepala ke belakang dan tarik kelopak mata bawah membentuk kantung.'
      },
      {
        stepNumber: 2,
        title: 'Teteskan Cairan Minidose',
        description: 'Pencet badan botol mini perlahan dan teteskan 1-2 tetes cairan ke kantung mata.',
        importantNote: 'Ujung tube plastik jangan sampai menyentuh kornea atau bulu mata.'
      },
      {
        stepNumber: 3,
        title: 'Tutup Rapat Kembali Penutup',
        description: 'Pasang kembali bagian tutup yang telah diputar dengan posisi terbalik dan tekan kuat hingga rapat.',
        importantNote: 'Karena bebas bahan pengawet (preservative-free), sediaan ini sangat rentan kontaminasi bakteri.'
      }
    ],
    importantWarnings: [
      'Batas waktu penyimpanan sediaan minidose yang telah dibuka adalah MAKSIMAL 3x24 JAM (72 Jam).',
      'Buang sisa cairan setelah 3 hari meskipun masih bersisa.'
    ],
    dosAndDonts: {
      dos: [
        'Tutup kembali botol minidose segera setelah digunakan.',
        'Sangat cocok dan aman untuk mata kering kronis serta pengguna lensa kontak.'
      ],
      donts: [
        'Jangan menyimpan sediaan minidose terbuka lebih dari 3 hari.',
        'Jangan menggunakan larutan yang tampak keruh atau berubah warna.'
      ]
    },
    storageAdvice: 'Simpan pada suhu sejuk (15°C - 25°C) terhindar dari sinar matahari langsung. Buang wadah minidose 3 hari (72 jam) setelah tutup pertama kali dibuka.',
    commonMistakes: [
      'Menyimpan botol minidose selama berminggu-minggu seperti botol tetes biasa.',
      'Membiarkan tutup botol terbuka di meja tanpa ditutup kembali.'
    ]
  },
  {
    id: 'salep-mata',
    title: 'Salep Mata Steril (Eye Ointment)',
    category: 'Mata & Telinga',
    iconName: 'Sparkles',
    shortDesc: 'Panduan cara pengaplikasian salep mata steril untuk infeksi, erosi kornea, atau pelumas mata malam hari.',
    popularBrands: ['Cendo Xitrol Salep Mata', 'Cendo Gentamycin Salep', 'Chloramphenicol Salep Mata', 'Alcon Duratears'],
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Duduk di depan cermin atau minta bantuan orang lain jika kesulitan.',
      'Bersihkan sisa kotoran mata dengan kapas basah steril.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tengadahkan Kepala & Tarik Kelopak',
        description: 'Tengadahkan kepala ke belakang, tarik kelopak mata bawah perlahan hingga membentuk pita/kantung terbuka.'
      },
      {
        stepNumber: 2,
        title: 'Oleskan Pita Salep (0.5 - 1 cm)',
        description: 'Pencet tube salep perlahan dan oleskan lapisan tipis salep sepanjang kira-kira 1 cm pada kantung mata bawah.',
        importantNote: 'Pegang tube secara mendatar dan jangan biarkan ujung tube menyentuh mata atau bulu mata.'
      },
      {
        stepNumber: 3,
        title: 'Tutup Mata & Kedipkan Perlahan',
        description: 'Lepaskan kelopak mata, pejamkan mata selama 1-2 menit, lalu kedipkan mata perlahan agar salep merata ke seluruh permukaan bola mata.'
      },
      {
        stepNumber: 4,
        title: 'Bersihkan Sisa Salep Luar',
        description: 'Usap kelebihan salep di sekitar kelopak mata luar menggunakan tisu bersih. Lap ujung tube dengan tisu bersih sebelum menutupnya.'
      }
    ],
    importantWarnings: [
      'Salep mata menyebabkan PANDANGAN BURAM SEMENTARA (15-30 menit). Sangat disarankan digunakan tepat menjelang tidur malam.',
      'Jangan mengemudi atau mengoperasikan mesin sampai pandangan mata kembali jernih total.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan menjelang tidur malam untuk kenyamanan maksimal.',
        'Gunakan tetes mata terlebih dahulu, tunggu 10 menit, baru gunakan salep mata.'
      ],
      donts: [
        'Jangan menyentuhkan ujung tube ke jari, mata, atau bulu mata.',
        'Jangan mengucek mata setelah dioleskan salep.'
      ]
    },
    storageAdvice: 'Simpan tube tertutup rapat pada suhu kamar (15°C - 25°C). Buang sisa salep 28 hari setelah segel tube pertama kali dibuka.',
    commonMistakes: [
      'Menyentuhkan ujung tube ke kelopak mata yang mengkontaminasi seluruh isi obat dalam tube.',
      'Mengoleskan salep tebal-tebal di siang hari sebelum berkendara.'
    ]
  },
  {
    id: 'tetes-telinga',
    title: 'Tetes Telinga (Ear Drops / Otic Solutions)',
    category: 'Mata & Telinga',
    iconName: 'Ear',
    shortDesc: 'Tata cara penggunaan tetes telinga untuk dewasa dan anak-anak agar cairan obat meresap sempurna ke liang telinga.',
    popularBrands: ['Otopain', 'Tarivid Otic', 'Vital Ear Drops', 'Forumen', 'Otilon', 'Santadex'],
    preparationSteps: [
      'Cuci tangan dengan sabun dan air mengalir.',
      'Hangatkan botol obat dengan menggenggamnya di telapak tangan selama 2-3 menit agar suhunya mendekati suhu tubuh.',
      'Bersihkan telinga luar dari kotoran secara lembut (jangan menusukkan cotton bud ke dalam liang telinga).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala Miring',
        description: 'Miringkan kepala ke samping atau berbaring miring sehingga telinga yang sakit menghadap ke atas.'
      },
      {
        stepNumber: 2,
        title: 'Posisikan Daun Telinga (Sesuai Usia)',
        description: 'DEWASA & ANAK > 3 TAHUN: Tarik daun telinga ke ATAS dan ke BELAKANG. ANAK < 3 TAHUN: Tarik daun telinga ke BAWAH dan ke BELAKANG.',
        importantNote: 'Posisi ini meluruskan liang telinga yang melengkung agar cairan tetes dapat mengalir lancar sampai ke gendang telinga.'
      },
      {
        stepNumber: 3,
        title: 'Teteskan Obat Sesuai Dosis',
        description: 'Teteskan obat ke dinding liang telinga sesuai dosis resep dokter.',
        importantNote: 'Arahkan tetesan ke dinding liang telinga, bukan langsung ke tengah lubang, agar udara dapat keluar dan cairan tidak tertahan.'
      },
      {
        stepNumber: 4,
        title: 'Pertahankan Posisi & Tekan Tragus',
        description: 'Tetap dalam posisi miring selama 3-5 menit. Tekan lembut tragus (tonjolan kecil di depan lubang telinga) beberapa kali.',
        importantNote: 'Gerakan memijat tragus membantu mendorong cairan masuk ke liang telinga bagian dalam.'
      }
    ],
    importantWarnings: [
      'Jangan meneteskan cairan obat yang dingin langsung dari kulkas karena memicu rasa pusing hebat, mual, dan vertigo (respons refleks kalorik).',
      'Jangan gunakan obat tetes telinga jika gendang telinga robek/perforasi (kecuali sediaan khusus yang disetujui dokter THT seperti Ofloksasin).'
    ],
    dosAndDonts: {
      dos: [
        'Hangatkan obat di telapak tangan sebelum diteteskan.',
        'Tetap miringkan kepala minimal 3-5 menit setelah penetesan.'
      ],
      donts: [
        'Jangan langsung menegakkan kepala setelah diteteskan.',
        'Jangan menjejalkan sumbatan kapas terlalu padat ke dalam lubang telinga.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk (15°C - 30°C) terhindar dari sinar matahari langsung. Jauhkan dari jangkauan anak-anak.',
    commonMistakes: [
      'Meneteskan obat dingin dari kulkas sehingga pasien mendadak vertigo dan muntah.',
      'Salah menarik daun telinga anak dan dewasa sehingga liang telinga tetap tersumbat.'
    ]
  },

  // =========================================================================
  // 2. INHALASI, RESPIRASI & HIDUNG
  // =========================================================================
  {
    id: 'inhaler-mdi',
    title: 'Inhaler MDI Tanpa Spacer (Pressurized Metered-Dose Inhaler)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan teknik inhalasi semprot aerosol (pMDI) dengan sinkronisasi tekan-hisap nafas yang presisi.',
    popularBrands: ['Ventolin Inhaler', 'Berotec MDI', 'Seretide Inhaler', 'Atrovent MDI', 'Flixotide MDI'],
    preparationSteps: [
      'Buka penutup mouthpiece inhaler.',
      'Kocok inhaler secara vertikal sebanyak 4-5 kali agar obat dan propelan tercampur homogen.',
      'Duduk tegak atau berdiri tegak agar rongga dada dapat mengembang maksimal.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hembuskan Nafas Maksimal',
        description: 'Hembuskan nafas perlahan dan dalam menjauhi mouthpiece inhaler sampai paru-paru terasa kosong.'
      },
      {
        stepNumber: 2,
        title: 'Posisikan Mouthpiece Rapat',
        description: 'Masukkan mouthpiece ke dalam mulut di antara gigi dan rapatkan kedua bibir mengelilinginya (jangan digigit dan jangan ditutup lidah).'
      },
      {
        stepNumber: 3,
        title: 'Tekan Kanister & Hirup Perlahan-Dalam',
        description: 'Mulai hisap nafas PERLAHAN dan DALAM melalui mulut, BERSAMAAN dengan itu tekan bagian atas kanister 1 kali. Lanjutkan menghirup nafas dalam selama 3-5 detik.',
        importantNote: 'Kunci keberhasilan MDI: hisapan nafas harus dimulai sepersekian detik sebelum atau tepat bersamaan dengan penekanan kanister.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik',
        description: 'Lepaskan inhaler dari mulut, tahan nafas selama 10 detik (atau senyaman Anda), lalu hembuskan nafas perlahan melalui mulut/hidung.',
        importantNote: 'Jika dokter meresepkan 2 semprotan (2 puffs), tunggu jeda 1 menit sebelum mengulangi langkah dari awal.'
      }
    ],
    importantWarnings: [
      'Jika inhaler mengandung KORTIKOSTEROID (Fluticasone, Budesonide, Beclometasone), WAJIB KUMUR-KUMUR DENGAN AIR PUTIH dan buang airnya setelah pemakaian untuk mencegah jamur mulut (oral candidiasis) dan suara serak (dysphonia).'
    ],
    dosAndDonts: {
      dos: [
        'Kocok inhaler sebelum setiap kali semprotan.',
        'Tahan nafas 10 detik setelah menghirup.',
        'Kumur air putih setelah inhaler steroid.'
      ],
      donts: [
        'Jangan menghirup melalui hidung.',
        'Jangan menekan kanister lebih dari 1 kali dalam 1 tarikan nafas.',
        'Jangan menelan air kumuran steroid.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15°C - 30°C). Jauhkan dari suhu panas tinggi karena tabung kanister bertekanan gas.',
    commonMistakes: [
      'Tekan kanister duluan baru menghirup, atau menghirup selesai baru menekan (tidak sinkron sehingga obat hanya menempel di lidah/tenggorokan).',
      'Menghirup terlalu cepat dan pendek (seperti meniup sedotan).',
      'Lupa berkumur air putih setelah obat steroid.'
    ]
  },
  {
    id: 'inhaler-mdi-spacer',
    title: 'Inhaler MDI dengan Spacer / Valved Holding Chamber (AeroChamber)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan penggunaan inhaler aerosol menggunakan tabung spacer untuk anak-anak, lansia, dan pasien asma akut.',
    popularBrands: ['AeroChamber Plus Flow-Vu', 'OptiChamber Diamond', 'Space Chamber Plus'],
    preparationSteps: [
      'Periksa tabung spacer dari debu atau benda asing di dalamnya.',
      'Lepas tutup inhaler MDI, kocok inhaler 4-5 kali, lalu pasang mouthpiece inhaler ke lubang karet belakang spacer.',
      'Pasang masker spacer ke wajah menutupi hidung & mulut secara rapat (atau gunakan mouthpiece untuk anak besar/dewasa).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Spacer Rapat',
        description: 'Pasang masker rapat-rapat pada wajah (tidak boleh ada celah udara di pipi/hidung) atau rapatkan bibir di sekeliling mouthpiece spacer.'
      },
      {
        stepNumber: 2,
        title: 'Semprotkan 1 Dosis ke Dalam Spacer',
        description: 'Tekan tabung inhaler 1 kali untuk menyemprotkan obat ke dalam tabung spacer.',
        importantNote: 'Jangan menekan 2 semprotan sekaligus ke dalam tabung spacer.'
      },
      {
        stepNumber: 3,
        title: 'Bernafas Melalui Spacer (5-6 Kali Nafas)',
        description: 'Bernafaslah secara normal dan teratur melalui mulut selama 5-6 kali tarikan nafas (sekitar 10-15 detik) untuk menghirup seluruh kabut obat.',
        importantNote: 'Pada anak-anak, pastikan katup masker terlihat bergerak membuka dan menutup setiap kali anak bernafas.'
      },
      {
        stepNumber: 4,
        title: 'Lepaskan & Beri Jeda',
        description: 'Lepaskan masker dari wajah. Jika membutuhkan semprotan kedua, tunggu 1 menit lalu ulangi langkah dari awal. Kumur air putih bila obat mengandung steroid.'
      }
    ],
    importantWarnings: [
      'Pembersihan spacer: Cuci tabung spacer seminggu sekali dengan air hangat dan sedikit sabun cair lembut. Biarkan KERING ANGIN (jangan dilap dengan kain/tisu untuk mencegah listrik statis yang menahan obat).'
    ],
    dosAndDonts: {
      dos: [
        'Semprotkan hanya 1 puff per siklus penghirupan spacer.',
        'Pastikan masker menempel kedap di wajah tanpa celah.'
      ],
      donts: [
        'Jangan menggosok bagian dalam spacer dengan kain lap (memicu muatan elektrostatis).',
        'Jangan menyemprotkan beberapa dosis sekaligus ke dalam chamber.'
      ]
    },
    storageAdvice: 'Simpan spacer di tempat bersih dan kering. Cuci berkala dan ganti katup spacer bila sudah longgar atau robek.',
    commonMistakes: [
      'Menyemprotkan 2-3 dosis sekaligus ke dalam spacer sehingga partikel obat saling bertabrakan dan menempel di dinding tabung.',
      'Mengeringkan spacer dengan handuk kain yang menimbulkan statis.'
    ]
  },
  {
    id: 'turbuhaler',
    title: 'Turbuhaler DPI (Dry Powder Inhaler Turbuhaler)',
    category: 'Inhalasi & Respirasi',
    iconName: 'CircleDot',
    shortDesc: 'Panduan penggunaan inhaler serbuk kering tipe Turbuhaler dengan mekanisme putar-klik (Symbicort, Pulmicort).',
    popularBrands: ['Symbicort Turbuhaler (Budesonide/Formoterol)', 'Pulmicort Turbuhaler', 'Bricasma Turbuhaler'],
    preparationSteps: [
      'Buka tutup pelindung Turbuhaler dengan memutarnya berlawanan arah jarum jam.',
      'Pegang Turbuhaler tegak lurus vertikal dengan pemutar berwarna (grip) di bagian bawah.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Isi Dosis Serbuk (Putar Kanan - Putar Kiri "KLIK")',
        description: 'Putar grip bawah ke KANAN sejauh mungkin, lalu putar kembali ke KIRI sampai terdengar bunyi "KLIK".',
        importantNote: 'Bunyi KLIK menandakan 1 dosis serbuk mikro telah terisi ke dalam ruang hisap.'
      },
      {
        stepNumber: 2,
        title: 'Hembuskan Nafas Menjauhi Alat',
        description: 'Hembuskan nafas dalam-dalam ke arah luar menjauhi Turbuhaler.',
        importantNote: 'JANGAN PERNAH menghembuskan nafas ke dalam mouthpiece Turbuhaler karena uap nafas akan membasahi dan menggumpalkan serbuk obat.'
      },
      {
        stepNumber: 3,
        title: 'Hisap Kuat, Cepat & Dalam',
        description: 'Letakkan mouthpiece di antara bibir dan rapatkan. Hisap nafas melalui mulut SEKUAT, SECEPAT, dan SEDALAM mungkin.',
        importantNote: 'Turbuhaler digerakkan oleh aliran udara hisapan pasien (breath-actuated). Diperlukan tarikan nafas cepat agar serbuk terpecah masuk ke saluran paru.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik & Pasang Tutup',
        description: 'Keluarkan Turbuhaler dari mulut, tahan nafas selama 5-10 detik, lalu hembuskan nafas perlahan. Pasang kembali tutup Turbuhaler dan kumur air putih.'
      }
    ],
    importantWarnings: [
      'Jangan mencuci Turbuhaler dengan air! Jika mouthpiece kotor, cukup bersihkan bagian luar mouthpiece dengan tisu kering.',
      'Wajib berkumur dengan air putih dan buang airnya setelah menghirup Turbuhaler steroid (Symbicort/Pulmicort).'
    ],
    dosAndDonts: {
      dos: [
        'Hisap nafas dengan KUAT, CEPAT, dan DALAM.',
        'Pastikan terdengar bunyi KLIK saat mengisi dosis.',
        'Kumur air putih setelah selesai.'
      ],
      donts: [
        'Jangan mencuci Turbuhaler dengan air.',
        'Jangan meniup atau menghembuskan nafas ke dalam mouthpiece.',
        'Jangan memutar grip bawah berulang-ulang tanpa menghirup.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (<30°C) di tempat kering dengan penutup terpasang rapat. Perhatikan jendela indikator dosis (tanda merah = sisa <20 dosis).',
    commonMistakes: [
      'Menghisap terlalu pelan sehingga serbuk obat tidak terangkat ke bronkus paru.',
      'Meniup ke dalam mouthpiece sehingga serbuk di dalam chamber menggumpal lembap.'
    ]
  },
  {
    id: 'diskus-accuhaler',
    title: 'Diskus / Accuhaler DPI (Piringan Serbuk Kering)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Disc',
    shortDesc: 'Cara pemakaian inhaler serbuk kering bentuk piringan Diskus/Accuhaler dengan tuas kokang (Seretide Diskus).',
    popularBrands: ['Seretide Diskus (Salmeterol/Fluticasone)', 'Flixotide Diskus', 'Serevent Diskus'],
    preparationSteps: [
      'Pegang bagian luar casing Diskus dengan satu tangan.',
      'Letakkan ibu jari tangan lainnya pada lekukan ibu jari, lalu dorong lekukan ke arah luar sampai terdengar bunyi KLIK untuk membuka mouthpiece.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Kokang Tuas Dosis Mendatar',
        description: 'Pegang Diskus secara horizontal (mendatar). Geser tuas pengokang ke arah luar sejauh mungkin sampai terdengar bunyi "KLIK".',
        importantNote: 'Dosis obat sudah terbuka di atas blister strip dan siap dihirup. Jangan memainkan tuas.'
      },
      {
        stepNumber: 2,
        title: 'Hembuskan Nafas Menjauhi Diskus',
        description: 'Hembuskan nafas perlahan dan dalam ke arah luar menjauhi alat Diskus.'
      },
      {
        stepNumber: 3,
        title: 'Hisap Cepat, Kuat & Dalam',
        description: 'Posisikan mouthpiece ke bibir secara rapat. Posisikan alat tetap mendatar, lalu hisap nafas melalui mulut secara CEPAT, KUAT, dan DALAM.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik & Tutup Alat',
        description: 'Lepaskan alat dari mulut, tahan nafas selama 10 detik. Tutup Diskus dengan menggeser lekukan ibu jari kembali ke posisi semula. Kumur air putih.'
      }
    ],
    importantWarnings: [
      'Perhatikan angka konter dosis pada bagian atas Diskus (angka 5 sampai 0 berwarna merah = dosis hampir habis).',
      'Jangan memainkan tuas pengokang bolak-balik karena akan membuang strip obat di dalamnya.'
    ],
    dosAndDonts: {
      dos: [
        'Pegang Diskus selalu dalam posisi datar/horizontal saat menghirup.',
        'Kumur air putih setelah menghirup Seretide Diskus.'
      ],
      donts: [
        'Jangan mengocok alat Diskus.',
        'Jangan mencuci Diskus dengan air.'
      ]
    },
    storageAdvice: 'Simpan di tempat kering dan sejuk (<30°C). Jauhkan dari tempat lembab seperti kamar mandi.',
    commonMistakes: [
      'Mengocok Diskus (Diskus berisi blister strip serbuk yang tidak boleh dikocok).',
      'Memainkan tuas kokang berulang kali.'
    ]
  },
  {
    id: 'respimat',
    title: 'Respimat Soft Mist Inhaler (SMI Kabut Halus)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan penggunaan inhaler kabut halus Respimat berkecepatan rendah (Spiriva Respimat, Berodual Respimat).',
    popularBrands: ['Spiriva Respimat (Tiotropium)', 'Berodual Respimat', 'Spiolto Respimat', 'Combivent Respimat'],
    preparationSteps: [
      'Pegang Respimat tegak dengan penutup hijau/oranye tertutup.',
      'Ingat rumus TOP: Turn (Putar), Open (Buka), Press (Tekan).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'T - Turn (Putar Dasar Bawah Setengah Putaran)',
        description: 'Putar bagian dasar transparan ke arah panah (setengah putaran) sampai terdengar bunyi "KLIK".'
      },
      {
        stepNumber: 2,
        title: 'O - Open (Buka Penutup Flip)',
        description: 'Buka penutup hijau sampai terbuka penuh dan terkunci ke belakang.'
      },
      {
        stepNumber: 3,
        title: 'P - Press (Tekan Tombol Pelepasan Dosis & Hisap Lambat)',
        description: 'Hembuskan nafas menjauhi alat. Masukkan mouthpiece ke mulut, rapatkan bibir. Mulailah menghirup nafas PERLAHAN dan DALAM, lalu TEKAN tombol pelepasan dosis sambil terus menghirup kabut halus.',
        importantNote: 'Kabut Respimat bergerak lambat selama 1.2 detik sehingga sangat mudah disinkronkan dengan pernafasan lambat.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik',
        description: 'Lepaskan alat dari mulut, tahan nafas 10 detik, lalu hembuskan nafas perlahan. Tutup kembali penutup Respimat. Jika resep 2 hisapan, ulangi langkah TOP.'
      }
    ],
    importantWarnings: [
      'Saat perakitan pertama: pasang cartridge logam ke dalam Respimat, tekan di atas meja hingga masuk sempurna, lalu lakukan priming semprot 3 kali ke udara sampai kabut terlihat jelas.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan rumus T-O-P (Turn, Open, Press).',
        'Tarik nafas secara perlahan dan dalam (berbeda dengan DPI serbuk yang harus cepat).'
      ],
      donts: [
        'Jangan menyentuh tombol press sebelum mouthpiece berada di dalam mulut.',
        'Jangan melepas cartridge setelah terpasang.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15°C - 30°C). Buang Respimat 3 bulan setelah cartridge pertama kali dipasang.',
    commonMistakes: [
      'Lupa memutar dasar bawah (Turn) sehingga tombol Press tidak dapat ditekan.',
      'Menghisap terlalu cepat dan tergesa-gesa.'
    ]
  },
  {
    id: 'breezhaler-handihaler',
    title: 'Breezhaler & HandiHaler (Inhaler Kapsul DPI)',
    category: 'Inhalasi & Respirasi',
    iconName: 'CircleDot',
    shortDesc: 'Panduan penggunaan inhaler kapsul serbuk kering DPI dengan mekanisme tindik jarum (Onbrez, Spiriva HandiHaler).',
    popularBrands: ['Onbrez Breezhaler (Indacaterol)', 'Ultibro Breezhaler', 'Spiriva HandiHaler', 'Seebri Breezhaler'],
    preparationSteps: [
      'Buka penutup alat inhaler dan buka mouthpiece untuk mengakses ruang kapsul (capsule chamber).',
      'Pastikan tangan kering saat mengambil 1 kapsul dari blister foil tepat sebelum digunakan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Masukkan Kapsul & Tutup Mouthpiece',
        description: 'Masukkan 1 kapsul ke dalam ruang kapsul (posisi horizontal/vertikal sesuai alat), lalu tutup kembali mouthpiece sampai terdengar bunyi "KLIK".',
        importantNote: 'Kapsul TIDAK BOLEH DITELAN melalui mulut! Kapsul hanya untuk dimasukkan ke dalam alat inhaler.'
      },
      {
        stepNumber: 2,
        title: 'Tindik Kapsul (Tekan Tombol Samping)',
        description: 'Pegang alat tegak, tekan kedua tombol samping (atau tombol samping HandiHaler) 1 kali secara bersamaan hingga menusuk kapsul, lalu lepaskan tombol.',
        importantNote: 'Jangan menusuk kapsul lebih dari 1 kali agar cangkang kapsul tidak pecah berkeping-keping.'
      },
      {
        stepNumber: 3,
        title: 'Hisap Nafas Kuat & Dengarkan Bunyi Desisan',
        description: 'Hembuskan nafas menjauhi alat. Masukkan mouthpiece ke mulut, rapatkan bibir. Hisap nafas melalui mulut secara CEPAT, KUAT, dan MANTAP.',
        importantNote: 'Saat menghirup, Anda harus mendengar dan merasakan getaran bunyi desisan putaran kapsul (whirring sound) di dalam chamber.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas & Periksa Kapsul Kosong',
        description: 'Tahan nafas 10 detik. Buka mouthpiece, periksa apakah serbuk di dalam kapsul sudah habis (jika masih ada sisa, hirup kembali sekali lagi). Buang cangkang kapsul kosong ke tempat sampah.'
      }
    ],
    importantWarnings: [
      'PERINGATAN KRITIS: Kapsul obat ini KHUSUS INHALASI, JANGAN DITELAN seperti kapsul minum biasa!',
      'Gunakan kapsul baru untuk setiap kali pemakaian.'
    ],
    dosAndDonts: {
      dos: [
        'Dengarkan bunyi putaran kapsul saat menghirup.',
        'Pastikan kapsul kosong setelah pemakaian.'
      ],
      donts: [
        'Jangan menelan kapsul obat melalui mulut!',
        'Jangan mencuci bagian dalam chamber dengan air.'
      ]
    },
    storageAdvice: 'Simpan kapsul dalam blister foil tertutup rapat pada suhu kamar (<30°C) kering. Jangan membuka kapsul jika belum akan digunakan.',
    commonMistakes: [
      'Pasien menelan kapsul obat dengan air minum (karena mengira kapsul oral).',
      'Menekan tombol penusuk berkali-kali sehingga serpihan cangkang kapsul hancur.'
    ]
  },
  {
    id: 'ellipta',
    title: 'Ellipta Inhaler DPI (Dry Powder Inhaler Ellipta)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Disc',
    shortDesc: 'Panduan penggunaan inhaler serbuk kering praktis tipe Ellipta (Relvar Ellipta, Anoro Ellipta, Trelegy Ellipta).',
    popularBrands: ['Relvar Ellipta (Fluticasone/Vilanterol)', 'Trelegy Ellipta', 'Anoro Ellipta', 'Incruse Ellipta'],
    preparationSteps: [
      'Pegang Ellipta pada posisi tegak mendatar.',
      'Jangan membuka penutup penutup geser sampai Anda benar-benar siap menghirup dosis obat.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Buka Penutup Geser Hingga Bunyi "KLIK"',
        description: 'Geser penutup ke bawah sejauh mungkin sampai terdengar bunyi "KLIK" yang mantap. Konter dosis akan berkurang 1 angka.',
        importantNote: 'Dosis kini telah siap dihirup. Jika Anda membuka dan menutupnya tanpa menghirup, dosis obat akan terbuang di dalam chamber.'
      },
      {
        stepNumber: 2,
        title: 'Hembuskan Nafas Menjauhi Alat',
        description: 'Hembuskan nafas perlahan dan dalam menjauhi alat inhaler.'
      },
      {
        stepNumber: 3,
        title: 'Hisap Panjang, Mantap & Dalam',
        description: 'Masukkan mouthpiece melengkung ke mulut di antara bibir. Tarik nafas melalui mulut secara PANJANG, MANTAP, dan DALAM (jangan menutup lubang ventilasi udara dengan jari).',
        importantNote: 'Jangan menghirup melalui hidung.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik & Geser Tutup',
        description: 'Lepaskan alat dari mulut, tahan nafas selama 10 detik. Geser penutup kembali ke atas hingga menutupi mouthpiece. Kumur air putih.'
      }
    ],
    importantWarnings: [
      'Jangan membuka dan menutup penutup geser jika belum siap menghirup, karena setiap kali penutup dibuka sampai bunyi klik, 1 dosis obat akan terbuang permanen.',
      'Wajib kumur air putih setelah menghirup inhaler kombinasi steroid (Relvar / Trelegy).'
    ],
    dosAndDonts: {
      dos: [
        'Buka penutup hanya saat siap menghirup.',
        'Kumur air putih setelah selesai.'
      ],
      donts: [
        'Jangan menghalangi lubang ventilasi udara samping dengan jari.',
        'Jangan mencuci alat Ellipta dengan air.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (<30°C) kering. Buang sisa alat 6 minggu setelah kantung pembungkus foil pertama kali dibuka.',
    commonMistakes: [
      'Menutup lubang ventilasi udara samping dengan jari tangan saat menghirup.',
      'Membuka-tutup penutup main-main sehingga dosis obat habis terbuang.'
    ]
  },
  {
    id: 'nebulizer',
    title: 'Nebulizer (Kompresor & Mesh Portable)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan terapi uap nebulasi untuk serangan sesak asma, PPOK, dan pengenceran dahak bronkitis.',
    popularBrands: ['Omron CompAIR Nebulizer', 'Beurer Mesh Nebulizer', 'Philips Respironics Innospire', 'Ventolin Nebules', 'Combivent Respules', 'Pulmicort Respules'],
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Pasang selang udara dari mesin kompresor ke bagian bawah cangkir obat (medication cup).',
      'Buka ampul obat (Nebules/Respules) dan tuang seluruh cairan obat ke dalam cangkir nebulizer sesuai resep dokter. Tambahkan NaCl 0.9% jika diinstruksikan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pasang Mouthpiece atau Masker',
        description: 'Pasang masker aerosol atau mouthpiece ke bagian atas cangkir nebulizer. Duduk tegak di kursi yang nyaman.'
      },
      {
        stepNumber: 2,
        title: 'Nyalakan Mesin & Posisikan Tegak',
        description: 'Nyalakan tombol ON pada mesin kompresor. Pastikan uap kabut halus keluar dari masker/mouthpiece. Pegang cangkir obat selalu dalam posisi tegak lurus agar cairan tidak tumpah.'
      },
      {
        stepNumber: 3,
        title: 'Bernafas Perlahan & Dalam (10-15 Menit)',
        description: 'Pasang masker rapat di wajah (atau hisap mouthpiece). Bernafaslah secara perlahan dan dalam melalui mulut, sesekali tahan nafas 2-3 detik sebelum menghembuskan nafas.',
        importantNote: 'Lanjutkan nebulasi sampai cairan obat di dalam cangkir habis dan terdengar bunyi mendesis/gelembung (sputtering sound), biasanya sekitar 10-15 menit.'
      },
      {
        stepNumber: 4,
        title: 'Matikan Mesin & Cuci Alat',
        description: 'Matikan mesin. Lepaskan cangkir dan masker, cuci dengan air hangat mengalir, lalu biarkan kering angin. Jika menggunakan steroid (Pulmicort), basuh wajah dan kumur mulut.'
      }
    ],
    importantWarnings: [
      'Jangan mencuci selang udara (tubing) dengan air karena sulit kering dan dapat berjamur di dalamnya.',
      'Cuci cangkir nebulizer dan masker setiap kali selesai pemakaian untuk mencegah infeksi bakteri paru.'
    ],
    dosAndDonts: {
      dos: [
        'Duduk tegak selama proses penguapan nebulizer.',
        'Bernafas dalam melalui mulut.'
      ],
      donts: [
        'Jangan memiringkan cangkir obat lebih dari 45 derajat.',
        'Jangan menggunakan air keran untuk melarutkan obat nebulizer (hanya gunakan NaCl 0.9% steril).'
      ]
    },
    storageAdvice: 'Simpan mesin nebulizer dan aksesoris di tempat bersih dan kering terbebas dari debu.',
    commonMistakes: [
      'Membaringkan cangkir nebulizer sehingga cairan obat tumpah dan tidak menghasilkan uap.',
      'Tidak mencuci masker dan cangkir nebulizer pasca pakai.'
    ]
  },
  {
    id: 'semprot-hidung',
    title: 'Semprot Hidung (Nasal Spray)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan tepat penggunaan semprot hidung untuk rinitis alergi, polip hidung, dan kongesti sinus.',
    popularBrands: ['Avamys Nasal Spray (Fluticasone)', 'Nasonex (Mometasone)', 'Afrin (Oxymetazoline)', 'Iliadin Nasal Spray', 'Sterimar Nasal Hygiene', 'Flixonase'],
    preparationSteps: [
      'Hembuskan udara hidung perlahan (tiup hidung) untuk membersihkan lendir/kotoran dari rongga hidung.',
      'Cuci tangan dengan sabun dan air mengalir.',
      'Kocok botol semprot hidung dan buka penutup pengaman.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala Menunduk (Lihat Jari Kaki)',
        description: 'Duduk tegak dan tundukkan kepala sedikit ke depan melihat ke arah jari kaki (JANGAN menengadahkan kepala ke belakang).'
      },
      {
        stepNumber: 2,
        title: 'Tutup Satu Lubang Hidung & Arahkan Ujung Semprotan',
        description: 'Tutup salah satu lubang hidung dengan jari telunjuk. Masukkan ujung penyemprot ke lubang hidung sebelah.',
        importantNote: 'Arahkan ujung semprotan sedikit miring ke arah sudut mata luar (menjauhi dinding tengah / septum hidung).'
      },
      {
        stepNumber: 3,
        title: 'Semprot & Hirup Lembut Melalui Hidung',
        description: 'Tekan pompa semprotan 1 kali sambil menghirup napas SECARA LEMBUT dan PERLAHAN melalui hidung.',
        importantNote: 'Jangan menghirup terlalu kuat (mengendus keras) agar obat tidak langsung tertelan masuk ke tenggorokan.'
      },
      {
        stepNumber: 4,
        title: 'Hembuskan Nafas Lewat Mulut',
        description: 'Keluarkan alat dari hidung, hembuskan nafas melalui mulut. Ulangi untuk lubang hidung sebelahnya. Lap ujung semprotan dengan tisu bersih.'
      }
    ],
    importantWarnings: [
      'Jangan menyemprotkan obat langsung ke septum (dinding tengah hidung) karena memicu iritasi berat, kekeringan, dan mimisan (epistaksis).',
      'Penggunaan semprot dekongestan hidung (Oxymetazoline/Iliadin/Afrin) MAKSIMAL 3 - 5 HARI berturut-turut untuk mencegah hidung tersumbat berulang yang lebih parah (Rhinitis Medicamentosa).'
    ],
    dosAndDonts: {
      dos: [
        'Arahkan ujung semprotan miring ke arah luar (ke sudut mata/telinga luar).',
        'Tundukkan kepala sedikit ke depan.'
      ],
      donts: [
        'Jangan mendongakkan kepala ke belakang saat menyemprot.',
        'Jangan mengendus keras setelah disemprot.',
        'Jangan menggunakan dekongestan lebih dari 5 hari berturut-turut.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk terhindar dari panas. Pasang selalu tutup pelindung.',
    commonMistakes: [
      'Menengadahkan kepala ke atas sehingga cairan obat langsung tertelan ke tenggorokan dan terasa pahit.',
      'Menyemprot tepat ke septum tengah hidung memicu luka dan mimisan.'
    ]
  },
  {
    id: 'tetes-hidung',
    title: 'Tetes Hidung (Nasal Drops)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan posisi kepala khusus untuk penetesan obat tetes hidung bayi, anak, dan dewasa.',
    popularBrands: ['Iliadin Drop Anak', 'Breathy Nasal Drop (NaCl 0.9%)', 'Otrivin Drop'],
    preparationSteps: [
      'Bersihkan kotoran/lendir hidung anak/dewasa secara lembut.',
      'Cuci tangan bersih dengan air dan sabun.',
      'Buka botol penetes hidung.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala Menggantung (Head-Low Position)',
        description: 'Berbaringlah di tempat tidur dengan kepala menggantung ke belakang di tepi tempat tidur (posisi Proetz), atau letakkan bantal di bawah bahu.'
      },
      {
        stepNumber: 2,
        title: 'Teteskan Obat ke Lubang Hidung',
        description: 'Teteskan obat sesuai dosis resep ke masing-masing lubang hidung tanpa menyentuhkan ujung pipet ke dalam hidung.'
      },
      {
        stepNumber: 3,
        title: 'Pertahankan Posisi 2-3 Menit',
        description: 'Tetap dalam posisi kepala menggantung selama 2-3 menit sambil memutar kepala perlahan ke kiri dan ke kanan agar cairan obat melapisi rongga sinus dan mukosa hidung secara merata.'
      }
    ],
    importantWarnings: [
      'Gunakan pipet tetes khusus bawaan obat.',
      'Pada bayi/anak, tetes hidung NaCl 0.9% dapat digunakan untuk mengencerkan lendir sebelum disedot dengan aspirator hidung.'
    ],
    dosAndDonts: {
      dos: [
        'Gantungkan kepala ke tepi ranjang saat meneteskan.',
        'Pertahankan posisi 2 menit.'
      ],
      donts: [
        'Jangan meneteskan dalam posisi duduk tegak (obat akan langsung mengalir keluar).'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15°C - 25°C). Tutup rapat botol setelah digunakan.',
    commonMistakes: [
      'Meneteskan dalam posisi duduk sehingga cairan obat langsung tumpah keluar dari lubang hidung.'
    ]
  },

  // =========================================================================
  // 3. INJEKSI SUBKUTAN & AUTO-INJECTOR
  // =========================================================================
  {
    id: 'insulin-pen',
    title: 'Pen Insulin (Basal, Rapid-Acting & Premix)',
    category: 'Injeksi',
    iconName: 'Syringe',
    shortDesc: 'Panduan teknik penyuntikan insulin subkutan mandiri dengan pen insulin secara aman, steril, dan bebas nyeri.',
    popularBrands: ['Lantus Solostar (Glargine)', 'Novorapid FlexPen (Aspart)', 'Apidra Solostar (Glulisine)', 'Levemir FlexPen', 'Novomix 30 FlexPen', 'Ryzodeg FlexTouch', 'Sansulin Log-G'],
    preparationSteps: [
      'Cuci tangan dengan sabun dan air mengalir.',
      'Persiapkan pen insulin, jarum pen baru (ukuran 4mm/5mm/6mm), alkohol swab, dan wadah limbah benda tajam.',
      'Jika menggunakan insulin keruh (NPH / Premix Novomix): putar pen di antara kedua telapak tangan 10 kali dan bolak-balikkan 10 kali secara perlahan hingga larutan menjadi putih susu homogen.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pasang Jarum Baru & Lakukan Priming (Uji Aliran 2 Unit)',
        description: 'Buka segel jarum baru, pasang tegak lurus pada pen insulin. Putar pemutar dosis ke 2 unit (priming dose), arahkan jarum ke atas, ketuk tabung insulin agar gelembung udara naik, lalu tekan tombol dosis sampai tetesan insulin muncul di ujung jarum.',
        importantNote: 'Priming memastikan udara keluar dari jarum dan jarum tidak tersumbat, menjamin ketepatan dosis yang disuntikkan.'
      },
      {
        stepNumber: 2,
        title: 'Atur Dosis & Pilih Lokasi Suntik (Rotasi)',
        description: 'Putar pemutar dosis sesuai unit yang diresepkan dokter. Pilih lokasi suntik: PERUT (minimal 2 cm dari pusar), PAHA LUAR, atau LENGAN ATAS. Bersihkan kulit dengan alkohol swab dan biarkan kering.',
        importantNote: 'Wajib melakukan ROTASI TITIK SUNTIK secara teratur untuk mencegah lipohipertrofi (gumpalan lemak keras di bawah kulit yang mengganggu penyerapan insulin).'
      },
      {
        stepNumber: 3,
        title: 'Suntikkan Insulin Tegak Lurus 90 Derajat',
        description: 'Posisikan jarum tegak lurus 90 derajat terhadap permukaan kulit (atau 45 derajat bila menggunakan jarum panjang pada pasien sangat kurus), tancapkan jarum, lalu tekan tombol dosis dengan ibu jari sampai angka pemutar kembali ke angka 0.',
        importantNote: 'Setelah angka dosis mencapai 0, TAHAN TOMBOL dan BIARKAN JARUM TETAP MENANCAP DI KULIT SELAMA HITUNGAN 10 DETIK sebelum mencabut jarum.'
      },
      {
        stepNumber: 4,
        title: 'Cabut Jarum & Buang Jarum Bekas',
        description: 'Cabut jarum dari kulit lurus ke atas (jangan menggosok bekas suntikan). Pasang penutup luar jarum, lepaskan jarum dari pen, lalu buang jarum ke wadah limbah tajam (sharp container). Pasang kembali penutup pen insulin.'
      }
    ],
    importantWarnings: [
      'JANGAN PERNAH MENYIMPAN PEN INSULIN DENGAN JARUM MASIH TERPASANG karena memicu kebocoran insulin, masuknya gelembung udara, dan penyumbatan jarum.',
      'Satu jarum hanya untuk SATU KALI SUNTIK. Menggunakan jarum berulang kali menumpulkan ujung jarum mikro dan merusak jaringan kulit.',
      'Jangan pernah membagikan pen insulin atau jarum pen kepada orang lain!'
    ],
    dosAndDonts: {
      dos: [
        'Hitung 10 detik saat tombol dosis ditekan sebelum mencabut jarum.',
        'Gunakan jarum baru setiap kali suntik.',
        'Rotasi titik penyuntikan di perut/paha.'
      ],
      donts: [
        'Jangan menyimpan pen insulin di freezer (insulin beku rusak permanen).',
        'Jangan menyimpan pen insulin dengan jarum terpasang.',
        'Jangan menggosok area kulit setelah disuntik.'
      ]
    },
    storageAdvice: 'Pen insulin yang BELUM DIBUKA disimpan di kulkas (2°C - 8°C, jangan dibekukan). Pen insulin yang SEDANG DIGUNAKAN disimpan pada suhu kamar sejuk (<30°C) terhindar dari panas dan bertahan hingga 28 hari (atau 42-56 hari untuk merk tertentu seperti Toujeo/Tresiba).',
    commonMistakes: [
      'Langsung mencabut jarum begitu angka 0 sehingga cairan insulin menetes keluar di kulit (dosis kurang).',
      'Suntik di titik yang sama terus menerus menyebabkan benjolan keras (lipohipertrofi).',
      'Menyimpan pen yang sedang dipakai di dalam kulkas (insulin dingin memicu rasa perih saat disuntikkan).'
    ]
  },
  {
    id: 'glp1-pen',
    title: 'Pen GLP-1 Receptor Agonist (Ozempic / Victoza / Saxenda)',
    category: 'Injeksi',
    iconName: 'Syringe',
    shortDesc: 'Panduan teknik penyuntikan pen inkretin GLP-1 RA mingguan (Ozempic) atau harian (Victoza/Saxenda) untuk diabetes tipe 2 dan manajemen BB.',
    popularBrands: ['Ozempic (Semaglutide 0.25mg/0.5mg/1mg)', 'Victoza (Liraglutide 6mg/mL)', 'Saxenda (Liraglutide 3mg)', 'Trulicity (Dulaglutide)', 'Mounjaro (Tirzepatide)'],
    preparationSteps: [
      'Cuci tangan dengan sabun dan air mengalir.',
      'Periksa tanggal dan cairan obat di jendela pen (harus jernih dan tidak berwarna).',
      'Pasang jarum NovoFine/NovoTwist baru pada pen.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pemeriksaan Aliran Obat (Priming Pen Baru)',
        description: 'Untuk pen baru: putar dosis ke simbol aliran obat (titik aliran), tekan tombol dosis sampai setetes cairan muncul di ujung jarum.'
      },
      {
        stepNumber: 2,
        title: 'Pilih Dosis Mingguan / Harian',
        description: 'Putar pemutar dosis hingga angka dosis yang diresepkan (misal: 0.25 mg, 0.5 mg, atau 1 mg) sejajar dengan garis penunjuk dosis.'
      },
      {
        stepNumber: 3,
        title: 'Suntikkan Subkutan & Tahan Hitungan 6 Detik',
        description: 'Tancapkan jarum ke kulit perut, paha, atau lengan atas pada sudut 90 derajat. Tekan dan tahan tombol dosis sampai konter dosis kembali ke 0. TAHAN SELAMA HITUNGAN 6 DETIK sebelum mencabut jarum.',
        importantNote: 'Menahan 6 detik memastikan seluruh dosis obat GLP-1 kental terhantar penuh ke jaringan lemak subkutan.'
      },
      {
        stepNumber: 4,
        title: 'Cabut & Lepas Jarum',
        description: 'Cabut jarum dari kulit, lepaskan jarum dari pen, dan buang ke wadah limbah tajam. Pasang kembali penutup pen.'
      }
    ],
    importantWarnings: [
      'Ozempic disuntikkan SATU KALI SEMINGGU pada hari yang sama setiap minggunya, dapat dilakukan kapan saja dengan atau tanpa makanan.',
      'Efek samping mual ringan dapat terjadi pada awal pemakaian, disarankan makan dalam porsi kecil.'
    ],
    dosAndDonts: {
      dos: [
        'Suntikkan pada hari yang sama setiap minggu (Ozempic).',
        'Tahan tombol selama 6 detik sebelum mencabut jarum.'
      ],
      donts: [
        'Jangan menyimpan pen dengan jarum terpasang.',
        'Jangan membekukan pen obat di freezer.'
      ]
    },
    storageAdvice: 'Pen belum dibuka disimpan di kulkas (2°C - 8°C). Setelah dibuka, pen Ozempic dapat disimpan di suhu kamar (<30°C) atau di kulkas, bertahan hingga 56 HARI (8 minggu).',
    commonMistakes: [
      'Lupa hari suntik mingguan.',
      'Menyimpan pen dengan jarum terpasang yang memicu kebocoran obat.'
    ]
  },
  {
    id: 'lmwh-enoxaparin',
    title: 'Prefilled Syringe LMWH / Enoxaparin (Lovenox / Inviclot)',
    category: 'Injeksi',
    iconName: 'Syringe',
    shortDesc: 'Panduan teknik penyuntikan antikoagulan subkutan prefilled syringe tanpa membuang gelembung udara (air-lock technique).',
    popularBrands: ['Lovenox (Enoxaparin Sodium 20mg/40mg/60mg)', 'Inviclot', 'Arixtra (Fondaparinux)', 'Fragmin (Dalteparin)'],
    preparationSteps: [
      'Cuci tangan bersih dengan air dan sabun.',
      'Posisikan pasien duduk bersandar atau berbaring terlentang.',
      'Keluarkan spuit prefilled dari kemasan blister. Lepaskan penutup karet jarum dengan menariknya lurus ke depan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'JANGAN KELUARKAN GELEMBUNG UDARA (Air-Lock)',
        description: 'Spuit Lovenox sudah berisi gelembung udara kecil yang sengaja dirancang pabrik. JANGAN MENEKAN PLUNGER untuk membuang gelembung udara sebelum suntik!',
        importantNote: 'Gelembung udara berfungsi sebagai "kunci udara" (air-lock) yang mendorong seluruh tetes obat masuk ke jaringan dan mencegah obat merembes ke lapisan kulit luar yang memicu lebam/hematoma.'
      },
      {
        stepNumber: 2,
        title: 'Pilih Lokasi Perut Kiri atau Kanan Bawah',
        description: 'Pilih area dinding perut anterolateral atau posterolateral (minimal 5 cm di sebelah kiri atau kanan pusar). Bersihkan kulit dengan alkohol swab dan biarkan kering.'
      },
      {
        stepNumber: 3,
        title: 'Cubit Lipatan Kulit & Suntikkan 90 Derajat',
        description: 'Cubit lipatan kulit tebal dengan ibu jari dan telunjuk. Masukkan seluruh jarum tegak lurus 90 derajat ke dalam lipatan kulit. Tekan pendorong (plunger) perlahan sampai seluruh obat dan gelembung udara masuk.',
        importantNote: 'Pertahankan cubitan kulit selama proses penyuntikan sampai jarum selesai dicabut.'
      },
      {
        stepNumber: 4,
        title: 'Cabut Jarum & JANGAN GOSOK AREA SUNTIKAN',
        description: 'Cabut jarum lurus ke atas. Sistem pengaman otomatis (safety shield) akan menutup jarum. JANGAN MENGGOSOK atau memijat area bekas suntikan karena akan memicu lebam/memar kebiruan (hematoma).'
      }
    ],
    importantWarnings: [
      'JANGAN MENGELUARKAN GELEMBUNG UDARA dari spuit prefilled sebelum suntik.',
      'JANGAN MENGGOSOK AREA SUNTIKAN setelah disuntik.',
      'Rotasi lokasi penyuntikan bergantian antara sisi perut kiri dan sisi perut kanan.'
    ],
    dosAndDonts: {
      dos: [
        'Pertahankan cubitan kulit selama menyuntik.',
        'Suntikkan pada sudut 90 derajat di area perut samping.'
      ],
      donts: [
        'Jangan membuang gelembung udara dalam spuit sebelum suntik.',
        'Jangan menggosok area bekas suntikan (memicu lebam parah).'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar terkontrol (15°C - 25°C). Jangan disimpan di lemari pendingin/kulkas dan jangan dibekukan.',
    commonMistakes: [
      'Menekan spuit dan membuang gelembung udara sehingga dosis obat berkurang dan terjadi rembesan obat ke kulit subkutan luar.',
      'Menggosok bekas suntikan dengan kapas alkohol yang menimbulkan memar darah besar di perut.'
    ]
  },
  {
    id: 'epipen',
    title: 'EpiPen / Epinefrin Auto-Injector (Penanganan Darurat Anafilaksis)',
    category: 'Injeksi',
    iconName: 'Syringe',
    shortDesc: 'Panduan darurat penggunaan auto-injector epinefrin untuk syok anafilaksis akibat alergi berat (makanan, obat, sengatan lebah).',
    popularBrands: ['EpiPen Auto-Injector (0.3 mg)', 'EpiPen Jr (0.15 mg)', 'Jext Auto-Injector', 'Emerade'],
    preparationSteps: [
      'Genggam EpiPen dengan satu tangan di bagian tengah (ibu jari dan jari-jari menggenggam badan pen).',
      'Ingat pedoman cepat: "Biru ke Langit, Oranye ke Paha" (Blue to the Sky, Orange to the Thigh).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cabut Tutup Pengaman Biru Lurus ke Atas',
        description: 'Gunakan tangan lainnya untuk mencabut tutup pengaman biru (safety release) lurus ke atas. Alat kini siap bekerja.'
      },
      {
        stepNumber: 2,
        title: 'Hentakkan Ujung Oranye ke Paha Luar (90 Derajat)',
        description: 'Pegang ujung oranye menghadap paha. Hentakkan ujung oranye dengan kuat pada sudut 90 derajat ke bagian luar paha tengah (bisa menembus pakaian tebal/celana jeans) sampai terdengar bunyi "KLIK".',
        importantNote: 'Penyuntikan HANYA BOLEH dilakukan di bagian paha luar (vastus lateralis), TIDAK BOLEH di pantat atau lengan.'
      },
      {
        stepNumber: 3,
        title: 'Tahan Kuat Selama 3 Detik (atau 10 Detik)',
        description: 'Tekan dan tahan EpiPen dengan kuat pada paha selama HITUNGAN 3 DETIK (model baru) atau 10 DETIK agar seluruh dosis epinefrin terinjeksi sempurna.'
      },
      {
        stepNumber: 4,
        title: 'Cabut Pen & Pijat Area Suntikan 10 Detik',
        description: 'Cabut EpiPen lurus dari paha (penutup oranye akan memanjang menutupi jarum). Pijat area bekas suntikan selama 10 detik. SEGERA HUBUNGI IGD / AMBULANS DARURAT 118/119.'
      }
    ],
    importantWarnings: [
      'SEGERA KE IGD RUMAH SAKIT SETELAH MENGGUNAKAN EPIPEN karena efek epinefrin dapat mereda dalam 15-20 menit dan reaksi anafilaksis bifasik dapat kambuh.',
      'JANGAN meletakkan ibu jari atau jari tangan di atas ujung oranye jarum untuk mencegah suntikan tidak sengaja ke jari (memicu iskemia pembuluh darah jari).'
    ],
    dosAndDonts: {
      dos: [
        'Hentakkan ke paha bagian luar (bisa menembus celana).',
        'Segera bawa pasien ke IGD Rumah Sakit terdekat pasca penyuntikan.'
      ],
      donts: [
        'Jangan menaruh jari di atas ujung jarum oranye.',
        'Jangan menyuntikkan ke pembuluh darah vena atau bokong.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15°C - 25°C) di dalam tabung pelindungnya. JANGAN disimpan di kulkas dan lindungi dari panas matahari mobil.',
    commonMistakes: [
      'Memegang terbalik sehingga menusuk jari tangan sendiri.',
      'Tidak segera ke IGD rumah sakit setelah penyuntikan darurat.'
    ]
  },

  // =========================================================================
  // 4. SUPPOSITORIA, REKTAL & VAGINAL
  // =========================================================================
  {
    id: 'suppositoria',
    title: 'Suppositoria Rektal (Anus / Rektum)',
    category: 'Suppositoria & Vaginal',
    iconName: 'ShieldAlert',
    shortDesc: 'Panduan tata cara memasukkan obat suppositoria melalui anus secara higienis, nyaman, dan efektif.',
    popularBrands: ['Dumin Suppositoria (Paracetamol)', 'Stesolid Suppositoria (Diazepam)', 'Dulcolax Suppositoria (Bisacodyl)', 'Pronalges Supp (Ketoprofen)', 'Superhoid', 'Faktu Supp'],
    preparationSteps: [
      'Cuci tangan bersih dengan sabun dan air mengalir.',
      'Bila suppositoria terasa lembek, masukkan ke dalam kulkas selama beberapa menit atau basahi kemasan foil dengan air dingin sebelum dibuka.',
      'Buka pembungkus aluminium foil suppositoria tepat sebelum dimasukkan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Tubuh Berbaring Miring (Posisi Sims)',
        description: 'Berbaringlah miring ke satu sisi (misal miring kiri), tekuk kaki bagian atas ke arah dada, sedangkan kaki bawah dibiarkan lurus.'
      },
      {
        stepNumber: 2,
        title: 'Basahi Ujung Suppositoria dengan Air Bersih',
        description: 'Basahi ujung runcing suppositoria dengan sedikit air bersih atau pelumas berbasis air (water-soluble lubricant) agar licin.',
        importantNote: 'JANGAN menggunakan Vaseline, petroleum jelly, atau minyak mineral karena dapat mengganggu pelelehan dan penyerapan zat aktif obat.'
      },
      {
        stepNumber: 3,
        title: 'Masukkan Suppositoria Melewati Sfingter Anus',
        description: 'Dorong bagian ujung runcing suppositoria secara perlahan ke dalam lubang anus menggunakan jari telunjuk hingga melewati otot cincin sfingter anus (kedalaman sekitar 2 - 3 cm untuk dewasa, 1.5 - 2 cm untuk anak).',
        importantNote: 'Pastikan obat masuk cukup dalam melewati otot sfingter agar suppositoria tidak terdorong keluar kembali.'
      },
      {
        stepNumber: 4,
        title: 'Rapatkan Kaki & Tetap Berbaring 15-20 Menit',
        description: 'Rapatkan kedua tungkai dan tetaplah dalam posisi berbaring miring selama 15 - 20 menit agar suppositoria meleleh sempurna dan tidak keluar. Cuci tangan kembali.'
      }
    ],
    importantWarnings: [
      'KOSONGKAN BAB (buang air besar) terlebih dahulu sebelum menggunakan suppositoria bila memungkinkan (kecuali suppositoria pencahar pencahar BAB seperti Dulcolax).',
      'OBAT INI KHUSUS UNTUK ANUS/REKTUM, JANGAN PERNAH DITELAN MELALUI MULUT!'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan air bersih untuk melicinkan ujung suppositoria.',
        'Tetap berbaring miring minimal 15 menit setelah pemakaian.'
      ],
      donts: [
        'Jangan menelan suppositoria melalui mulut!',
        'Jangan memotong suppositoria sembarangan tanpa petunjuk apoteker.'
      ]
    },
    storageAdvice: 'Simpan di tempat sejuk (<25°C) atau di dalam lemari pendingin/kulkas (2°C - 8°C, jangan dibekukan) agar suppositoria tetap padat berbentuk peluru.',
    commonMistakes: [
      'Memasukkan obat kurang dalam sehingga terdorong keluar lagi saat otot sfingter berkontraksi.',
      'Lupa membuka pembungkus aluminium foil.'
    ]
  },
  {
    id: 'enema-microlax',
    title: 'Enema Rektal Mini (Microlax / Klysma Rektal)',
    category: 'Suppositoria & Vaginal',
    iconName: 'ShieldAlert',
    shortDesc: 'Panduan penggunaan obat pencahar enema pipa rektal mini untuk konstipasi/sembelit akut.',
    popularBrands: ['Microlax Enema (5 mL)', 'Fleet Enema', 'Yal Enema'],
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Buka penutup pipa aplikator Microlax.',
      'Tekan badan tube perlahan sampai setetes cairan obat keluar untuk melumasi seluruh ujung pipa aplikator.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Tubuh Berbaring Miring atau Jongkok',
        description: 'Berbaring miring dengan kedua lutut ditekuk atau dalam posisi jongkok yang nyaman.'
      },
      {
        stepNumber: 2,
        title: 'Masukkan Pipa Aplikator ke Anus',
        description: 'Masukkan pipa aplikator secara perlahan ke dalam anus (DEWASA: masukkan seluruh panjang pipa; ANAK < 3 TAHUN: masukkan hanya setengah panjang pipa).'
      },
      {
        stepNumber: 3,
        title: 'Pencet Tube & Keluarkan Pipa dalam Keadaan Terpencet',
        description: 'Pencet seluruh badan tube hingga cairan obat masuk ke dalam rektum. PENTING: Cabut pipa aplikator keluar dari anus DALAM KEADAAN TUBE TETAP TERPENCET.',
        importantNote: 'Jika tube dilepas sebelum dicabut, cairan obat akan tersedot kembali ke dalam tabung tube.'
      },
      {
        stepNumber: 4,
        title: 'Tahan BAB Selama 5 - 15 Menit',
        description: 'Rapatkan bokong dan tahan dorongan buang air besar selama 5-15 menit agar kotoran mengeras melunak sempurna, lalu buang air besar di toilet.'
      }
    ],
    importantWarnings: [
      'Cabut pipa dalam keadaan tube masih terpencet rapat.',
      'Efek buang air besar biasanya terjadi dalam waktu 5 hingga 15 menit setelah obat dimasukkan.'
    ],
    dosAndDonts: {
      dos: [
        'Lumasi leher pipa dengan cairan obat sebelum dimasukkan.',
        'Cabut pipa sambil tetap memencet tube.'
      ],
      donts: [
        'Jangan menggunakan enema pencahar setiap hari secara terus menerus (memicu ketergantungan usus).'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk (<30°C) terhindar dari sinar matahari langsung.',
    commonMistakes: [
      'Melepas pencetan tube saat pipa masih di dalam anus sehingga cairan tersedot balik ke tube.'
    ]
  },
  {
    id: 'ovula',
    title: 'Ovula / Tablet Vagina (Vaginal Suppositories & Tablets)',
    category: 'Suppositoria & Vaginal',
    iconName: 'ShieldAlert',
    shortDesc: 'Panduan tata cara penggunaan ovula atau tablet vagina dengan atau tanpa aplikator untuk keputihan dan infeksi ginekologi.',
    popularBrands: ['Flagystatin Ovula (Metronidazole/Nystatin)', 'Neo Gynoxa Ovula', 'Vagistin Ovula', 'Canesten Vaginal Tablet (Clotrimazole)', 'Albothyl Ovula', 'Nystatin Vaginal Tablet'],
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Kosongkan kandung kemih (buang air kecil) terlebih dahulu.',
      'Buka kemasan foil ovula/tablet vagina tepat sebelum digunakan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Persiapkan Aplikator (Bila Ada)',
        description: 'Letakkan ovula atau tablet pada ujung aplikator khusus yang disediakan dalam kemasan.'
      },
      {
        stepNumber: 2,
        title: 'Posisikan Tubuh Berbaring Terlentang (Litotomi)',
        description: 'Berbaringlah terlentang di tempat tidur dengan kedua lutut ditekuk dan kedua kaki dibuka sedikit lebar.'
      },
      {
        stepNumber: 3,
        title: 'Masukkan Ovula Sedalam Mungkin',
        description: 'Masukkan ovula (atau ujung aplikator) perlahan ke dalam liang vagina sedalam mungkin tanpa memaksakan atau menimbulkan rasa sakit.',
        importantNote: 'Jika menggunakan aplikator, dorong tangkai pendorong untuk melepaskan obat, lalu tarik aplikator perlahan keluar.'
      },
      {
        stepNumber: 4,
        title: 'Tetap Berbaring 15 Menit & Pasang Panty Liner',
        description: 'Tetap dalam posisi berbaring selama 15 menit agar obat meleleh dan terserap merata. Pasang pembalut tipis (panty liner) pada pakaian dalam untuk menampung sisa lelehan obat. Cuci aplikator (jika tipe reusable) dan cuci tangan.',
        importantNote: 'Sangat disarankan digunakan tepat menjelang tidur malam.'
      }
    ],
    importantWarnings: [
      'Gunakan pembalut tipis (panty liner) setelah pemakaian karena lelehan sisa basis obat akan keluar saat beraktivitas keesokan paginya.',
      'JANGAN menggunakan tampon selama periode pengobatan infeksi vagina.',
      'HINDARI hubungan intim selama masa pengobatan infeksi keputihan vagina.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan tepat sebelum tidur malam untuk penyerapan optimal.',
        'Gunakan panty liner untuk menjaga pakaian dalam tetap bersih.'
      ],
      donts: [
        'Jangan menggunakan ovula pada siang hari saat banyak berjalan.',
        'Jangan menelan obat ovula melalui mulut!'
      ]
    },
    storageAdvice: 'Simpan di tempat sejuk (<25°C) atau di dalam lemari pendingin (2°C - 8°C) agar sediaan ovula tetap padat.',
    commonMistakes: [
      'Menggunakan ovula di pagi/siang hari sehingga lelehan obat langsung keluar sebelum diserap dinding vagina.',
      'Menggunakan tampon yang menyerap obat dari organ vagina.'
    ]
  },
  {
    id: 'patch-transdermal',
    title: 'Koyo Medis Transdermal (Transdermal Patch)',
    category: 'Suppositoria & Vaginal',
    iconName: 'Disc',
    shortDesc: 'Panduan penempelan plester/koyo obat pelepasan terukur pada kulit untuk nyeri kronis, angina jantung, atau berhenti merokok.',
    popularBrands: ['Durogesic (Fentanyl Patch 25/50 mcg)', 'Nitroderm TTS (Nitroglycerin Patch)', 'Nicorette Patch', 'Climara (Estradiol)', 'Salonpas Koyo Medis', 'Exelon Patch (Rivastigmine)'],
    preparationSteps: [
      'Cuci tangan bersih dengan air dan sabun.',
      'Pilih area kulit yang bersih, kering, tidak berbulu lebat, dan tidak ada luka/iritasi (misal: dada atas, lengan atas, panggul, atau punggung atas).',
      'Gunting kantung foil pelindung patch secara hati-hati (jangan menggunting koyo di dalamnya).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lepas Separuh Lapisan Pelindung Plastik',
        description: 'Kupas setengah bagian lapisan pelindung plastik transparan tanpa menyentuh bagian permukaan perekat obat dengan jari.'
      },
      {
        stepNumber: 2,
        title: 'Tempelkan pada Kulit Bersih',
        description: 'Tempelkan bagian perekat ke area kulit yang telah dipilih, lalu kupas sisa pelindung plastik dan ratakan seluruh permukaan patch.'
      },
      {
        stepNumber: 3,
        title: 'Tekan Kuat dengan Telapak Tangan Selama 30 Detik',
        description: 'Tekan permukaan patch secara kuat menggunakan telapak tangan selama 30 detik untuk memastikan seluruh pinggiran patch menempel sempurna tanpa ada gelembung udara.'
      },
      {
        stepNumber: 4,
        title: 'Rotasi Titik Tempel & Lipat Sebelum Dibuang',
        description: 'Saat melepas patch lama, lipat patch bekas menjadi dua hingga bagian perekat saling menempel kuat, lalu buang ke tempat sampah tertutup. Tempelkan patch baru pada lokasi kulit yang BERBEDA (rotasi lokasi).',
        importantNote: 'Jangan menempelkan patch baru pada lokasi bekas patch sebelumnya selama minimal 7 hari.'
      }
    ],
    importantWarnings: [
      'JANGAN PERNAH MEMOTONG ATAU MENGGUNTING KOYO TRANSDERMAL RESERVOIR (Fentanyl/Nitrogliserin) karena akan menyebabkan pelepasan seluruh zat aktif obat secara mendadak yang memicu overdosis fatal!',
      'Hindari paparan panas langsung pada area patch (seperti berendam air panas, sauna, heating pad) karena panas meningkatkan penyerapan obat secara berbahaya.',
      'Jauhkan patch bekas dari jangkauan anak-anak dan hewan peliharaan.'
    ],
    dosAndDonts: {
      dos: [
        'Rotasi lokasi penempelan kulit setiap kali mengganti patch baru.',
        'Lipat dua patch bekas sebelum dibuang.'
      ],
      donts: [
        'Jangan memotong/menggunting koyo transdermal.',
        'Jangan menempel pada kulit yang luka, iritasi, atau berbulu lebat.',
        'Jangan menempelkan koyo baru sebelum melepas koyo lama.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk (<25°C) di dalam kemasan foil utuh. Lindungi dari panas tinggi.',
    commonMistakes: [
      'Memotong koyo menjadi dua yang menyebabkan pelepasan obat berlebih (toksisitas overdosis).',
      'Lupa melepas koyo lama sehingga terjadi penumpukan dosis (double dosing).'
    ]
  },

  // =========================================================================
  // 5. TOPIKAL & ORAL KHUSUS
  // =========================================================================
  {
    id: 'krim-ftu',
    title: 'Krim & Salep Kulit (Aturan Takaran Fingertip Unit / FTU)',
    category: 'Topikal & Oral Khusus',
    iconName: 'Sparkles',
    shortDesc: 'Panduan takaran standar medis Fingertip Unit (FTU) untuk pengolesan krim/salep kortikosteroid kulit secara aman dan terukur.',
    popularBrands: ['Dermovate (Clobetasol)', 'Elocon (Mometasone)', 'Hydrocortisone Krim', 'Betametason Krim', 'Desolex', 'Inerson'],
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Pastikan area kulit yang akan diobati bersih dan kering.',
      'Pahami konsep 1 FTU (Fingertip Unit).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Takaran 1 FTU (Fingertip Unit)',
        description: 'Pencet tube salep/krim sepanjang ruas ujung jari telunjuk dewasa (dari lipatan sendi ujung jari sampai ke ujung jari telunjuk).',
        importantNote: '1 FTU setara dengan sekitar 0.5 gram krim, cukup untuk mengobati area kulit seluas DUA TELAPAK TANGAN DEWASA.'
      },
      {
        stepNumber: 2,
        title: 'Pedoman Dosis Berdasarkan Luas Area Kulit',
        description: 'Wajah & Leher: 2.5 FTU | Satu Lengan Tangan: 3 FTU | Satu Kaki Tungkai: 6 FTU | Dada & Perut: 7 FTU | Punggung & Bokong: 7 FTU.',
        importantNote: 'Gunakan lapisan tipis merata sesuai kebutuhan FTU. Mengoleskan terlalu tebal tidak mempercepat penyembuhan dan memicu penipisan kulit (atrofi kulit).'
      },
      {
        stepNumber: 3,
        title: 'Oleskan Tipis Merata',
        description: 'Oleskan krim secara perlahan dan usap lembut searah pertumbuhan rambut kulit sampai krim terserap transparan.'
      },
      {
        stepNumber: 4,
        title: 'Cuci Tangan Selesai Penggunaan',
        description: 'Cuci tangan Anda setelah mengoleskan obat (kecuali jika area tangan yang sedang diobati).'
      }
    ],
    importantWarnings: [
      'Jangan menggunakan kortikosteroid potensi kuat (Dermovate/Clobetasol) pada area wajah, lipatan ketiak, atau selangkangan tanpa resep dokter spesialis kulit.',
      'Jangan menutup area olesan dengan perban kedap udara (oklusi) kecuali atas instruksi dokter.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan standar takaran FTU untuk mencegah pemakaian berlebih.',
        'Oleskan tipis-tipis merata.'
      ],
      donts: [
        'Jangan mengoleskan salep steroid tebal-tebal seperti masker.',
        'Jangan menggunakan salep steroid pada infeksi jamur murni tanpa kombinasi antijamur.'
      ]
    },
    storageAdvice: 'Simpan tube tertutup rapat pada suhu kamar (<30°C). Jauhkan dari jangkauan anak-anak.',
    commonMistakes: [
      'Mengoleskan krim steroid sangat tebal yang menyebabkan penipisan kulit, pelebaran pembuluh darah (telangiektasia), dan stretch mark.'
    ]
  },
  {
    id: 'sirup-kering-rekonstitusi',
    title: 'Sirup Kering Antibiotik Rekonstitusi (Dry Syrup)',
    category: 'Topikal & Oral Khusus',
    iconName: 'Sparkles',
    shortDesc: 'Panduan tata cara merekonstitusi sirup kering antibiotik dengan air matang dan batas waktu simpan aman.',
    popularBrands: ['Amoxicillin Dry Syrup', 'Cefixime Dry Syrup (Cefspan/Fixacep)', 'Cefadroxil Dry Syrup', 'Erythromycin Dry Syrup', 'Azithromycin Sirup (Zithromax)'],
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Ketuk atau kocok botol sirup kering yang masih berupa serbuk agar gumpalan serbuk di dasar botol terurai gembur.',
      'Siapkan air minum matang pada suhu kamar (JANGAN AIR PANAS).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tambahkan Air Matang Bertahap',
        description: 'Tuangkan air matang suhu ruangan secara bertahap sampai sedikit di bawah tanda batas garis tera pada botol sirup.',
        importantNote: 'WAJIB menggunakan air matang suhu biasa. JANGAN PERNAH MENGGUNAKAN AIR PANAS ATAU AIR DISPENSER HANGAT karena panas akan merusak cincin beta-laktam antibiotik!'
      },
      {
        stepNumber: 2,
        title: 'Tutup Rapat & Kocok Kuat Hingga Homogen',
        description: 'Tutup botol rapat-rapat, lalu kocok botol dengan kuat ke atas dan ke bawah hingga seluruh serbuk terdispersi larut sempurna tanpa ada endapan di dasar.'
      },
      {
        stepNumber: 3,
        title: 'Sesuaikan Tepat di Garis Batas Tera',
        description: 'Biarkan busa mereda beberapa menit. Periksa permukaan cairan: jika masih di bawah garis batas tera, tambahkan sedikit air matang lagi tepat hingga tanda garis, lalu kocok kembali.'
      },
      {
        stepNumber: 4,
        title: 'Beri Label Tanggal & Gunakan Sendok Takar Presisi',
        description: 'Tuliskan tanggal pelarutan pada botol sirup. Gunakan sendok takar obat / pipet ukur resmi (bukan sendok makan rumah tangga). Selalu kocok botol sebelum diminumkan.',
        importantNote: 'Buang sisa sirup antibiotik setelah 7 - 14 hari (sesuai petunjuk brosur) meskipun sirup belum habis.'
      }
    ],
    importantWarnings: [
      'Batas kadaluarsa sirup kering antibiotik yang sudah dicampur air adalah MAKSIMAL 7 - 14 HARI.',
      'Selalu kocok botol sirup setiap kali sebelum diminumkan pada anak.',
      'Habiskan antibiotik sesuai durasi hari yang diresepkan dokter.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan air matang dingin/suhu kamar untuk melarutkan.',
        'Kocok botol setiap kali sebelum diminumkan.',
        'Tulis tanggal pelarutan pada botol.'
      ],
      donts: [
        'Jangan melarutkan dengan air panas/dispenser.',
        'Jangan menggunakan sendok makan makan rumah tangga biasa.',
        'Jangan menyimpan sirup antibiotik lebih dari 14 hari.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk (<25°C) atau di dalam kulkas (2°C - 8°C) tergantung jenis obat (misal: Cefixime/Amoksisilin lebih stabil di kulkas). Buang sisa obat setelah 7-14 hari.',
    commonMistakes: [
      'Melarutkan sirup kering dengan air panas mendidih yang merusak struktur aktif antibiotik.',
      'Menggunakan sendok makan makan rumah tangga yang takarannya bervariasi 3 mL sampai 10 mL (dosis tidak akurat).'
    ]
  },
  {
    id: 'tablet-sublingual',
    title: 'Tablet Sublingual (ISDN / Nitrogliserin Angina)',
    category: 'Topikal & Oral Khusus',
    iconName: 'Activity',
    shortDesc: 'Panduan penggunaan tablet di bawah lidah saat serangan nyeri dada jantung (angina pectoris) akut.',
    popularBrands: ['Cedocard Sublingual (ISDN 5mg/10mg)', 'Fasorbid Sublingual', 'Nitrokaf Sublingual', 'Nitroglycerin Sublingual'],
    preparationSteps: [
      'Segera duduk beristirahat saat merasakan nyeri dada/sesak menjalar (posisi duduk mencegah pusing/pingsan akibat penurunan tekanan darah mendadak).',
      'Keluarkan 1 tablet sublingual dari kemasan strip/botol kaca.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Letakkan Tablet Tepat di Bawah Lidah',
        description: 'Angkat lidah ke atas dan letakkan 1 tablet tepat di bawah lidah, lalu turunkan kembali lidah dan tutup mulut.',
        importantNote: 'JANGAN DITELAN dan JANGAN DIKUNYAH! Tablet sublingual dirancang diserap langsung oleh pembuluh darah vena kaya di bawah lidah menuju jantung.'
      },
      {
        stepNumber: 2,
        title: 'Biarkan Larut Sempurna (1 - 2 Menit)',
        description: 'Biarkan tablet larut secara alami dengan air liur. Jangan makan, minum air, atau merokok sampai tablet larut sempurna.'
      },
      {
        stepNumber: 3,
        title: 'Aturan Pengulangan Dosis Saat Serangan Akut',
        description: 'Jika nyeri dada belum mereda setelah 5 MENIT, letakkan tablet ke-2 di bawah lidah. Jika masih nyeri setelah 5 menit berikutnya, letakkan tablet ke-3 (maksimal 3 tablet dalam 15 menit).',
        importantNote: 'JIKA NYERI DADA TIDAK MEREDA SETELAH 15 MENIT (3 TABLET), SEGERA MINTA BANTUAN KE IGD RUMAH SAKIT TERDEKAT KARENA MERUPAKAN INDIKASI SERANGAN JANTUNG AKUT (INFARK MIOKARD).'
      }
    ],
    importantWarnings: [
      'Jangan berdiri mendadak setelah minum tablet sublingual karena obat menyebabkan pelebaran pembuluh darah cepat yang memicu hipotensi ortostatik, pusing, dan pingsan.',
      'KONTRAINDIKASI MUTLAK: Jangan menggunakan ISDN/Nitrogliserin jika Anda mengonsumsi obat disfungsi ereksi (Sildenafil/Viagra, Tadalafil/Cialis) dalam 24-48 jam terakhir karena memicu penurunan tensi drastis yang fatal.'
    ],
    dosAndDonts: {
      dos: [
        'Duduk saat meletakkan tablet di bawah lidah.',
        'Simpan obat selalu dekat dengan jangkauan pasien penderita PJK.'
      ],
      donts: [
        'Jangan menelan atau mengunyah tablet sublingual.',
        'Jangan minum bersamaan dengan obat kuat Viagra/Cialis.'
      ]
    },
    storageAdvice: 'Simpan dalam kemasan strip kedap udara atau botol kaca gelap tertutup rapat pada suhu kamar (<25°C) terhindar dari panas dan kelembapan.',
    commonMistakes: [
      'Menelan tablet langsung dengan air minum seperti tablet biasa (efek obat onset menjadi sangat lambat karena melewati metabolisme lintas pertama hati).'
    ]
  },
  {
    id: 'tablet-salut-jangan-digerus',
    title: 'Peringatan Khusus Sediaan Jangan Digerus (Do Not Crush / Break)',
    category: 'Topikal & Oral Khusus',
    iconName: 'ShieldAlert',
    shortDesc: 'Daftar dan alasan klinis sediaan tablet salut enterik, pelepasan lambat (SR/XR/CR/OROS), dan sublingual yang tidak boleh digerus atau dibelah.',
    popularBrands: ['Adalat OROS (Nifedipine GITS)', 'Glucophage XR (Metformin XR)', 'Voltaren Enteric (Diclofenac)', 'Nexium / Inpepsa', 'Dulcolax Tablet', 'MST Continus (Morphine SR)'],
    preparationSteps: [
      'Periksa kode singkatan di belakang nama merk obat: EC/EN (Enteric Coated), SR/XR/ER/CR (Sustained/Extended/Controlled Release), OROS (Osmotic Release), MR (Modified Release).',
      'Konsultasikan dengan apoteker jika pasien kesulitan menelan tablet utuh.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tablet Salut Enterik (Enteric Coated / EC)',
        description: 'Contoh: Aspirin Enteric, Voltaren EC, Dulcolax Tablet. Lapisan salut dirancang tahan asam lambung agar obat tidak pecah di lambung dan baru larut di usus halus.',
        importantNote: 'Jika digerus: obat rusak oleh asam lambung atau menyebabkan iritasi/tukak pendarahan lambung parah.'
      },
      {
        stepNumber: 2,
        title: 'Tablet Pelepasan Lambat (SR / XR / ER / CR / OROS)',
        description: 'Contoh: Glucophage XR, Adalat OROS, Xanax XR, Tamsulosin MR. Matriks polimer dirancang melepaskan dosis obat perlahan selama 12-24 jam.',
        importantNote: 'Jika digerus: terjadi PELEPASAN DOSIS MENDADAK (Dose Dumping), seluruh dosis 24 jam masuk ke darah sekaligus yang memicu toksisitas fatal (hipoglikemia berat, hipotensi syok, overdosis).'
      },
      {
        stepNumber: 3,
        title: 'Kapsul Berisi Pelet Mikro (Micro-pellet Capsules)',
        description: 'Contoh: Lansoprazole kapsul, Omeprazole kapsul. Cangkang kapsul boleh dibuka, TETAPI butiran pelet mikro di dalamnya JANGAN DIHANCURKAN/DIGERUS karena pelet telah dilapisi pelindung enterik.',
        importantNote: 'Bila perlu diberikan via selang NGT, campurkan pelet utuh dengan cairan jus apel atau air sedikit asam tanpa digerus.'
      },
      {
        stepNumber: 4,
        title: 'Alternatif Solusi untuk Pasien Disfagia / NGT',
        description: 'Jika pasien tidak bisa menelan: mintalah apoteker mengganti ke bentuk sediaan sirup, suspensi, puyer dari zat aktif biasa (Immediate Release), atau tablet dispersible/ODT.'
      }
    ],
    importantWarnings: [
      'Menggerus tablet XR/OROS memicu "DOSE DUMPING" (overdosis mendadak mematikan).',
      'Menggerus tablet Enteric Coated memicu tukak dan iritasi lambung berat.'
    ],
    dosAndDonts: {
      dos: [
        'Telan tablet salut dan tablet XR secara utuh dengan segelas air.',
        'Tanyakan pada apoteker sebelum menggerus obat racikan puyer.'
      ],
      donts: [
        'Jangan menggerus, membelah, atau mengunyah tablet berkode EC, XR, SR, CR, OROS.'
      ]
    },
    storageAdvice: 'Simpan dalam kemasan blister asli pada suhu kamar terkontrol (<30°C) kering.',
    commonMistakes: [
      'Menggerus tablet Metformin XR atau Adalat OROS ke dalam puyer racikan.',
      'Mengunyah tablet Dulcolax yang menyebabkan kram perut dan mual muntah lambung.'
    ]
  }
];

export const MEDICATION_GUIDES: MedicationGuide[] = deduplicateMedicationGuides(RAW_MEDICATION_GUIDES);
