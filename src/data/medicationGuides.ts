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
  {
    id: 'tetes-mata',
    title: 'Tetes Mata (Eye Drops)',
    category: 'Mata & Telinga',
    iconName: 'Eye',
    shortDesc: 'Panduan tata cara penggunaan obat tetes mata steril secara benar dan mencegah kontaminasi.',
    preparationSteps: [
      'Cuci tangan dengan air bersih mengalir dan sabun selama 20 detik.',
      'Periksa tanggal kedaluwarsa obat tetes mata (maksimal 28 hari setelah segel botol dibuka).',
      'Pastikan ujung penetes botol bersih dan tidak tersentuh tangan atau benda lain.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala',
        description: 'Tengadahkan kepala ke belakang dan tatap ke arah atas.',
        importantNote: 'Jangan menyentuh mata dengan ujung botol penetes.'
      },
      {
        stepNumber: 2,
        title: 'Tarik Kelopak Mata',
        description: 'Tarik kelopak mata bawah perlahan menggunakan jari telunjuk hingga membentuk kantung (pouch).'
      },
      {
        stepNumber: 3,
        title: 'Penetesan Obat',
        description: 'Pegang botol tetes tepat di atas mata dan teteskan 1 tetes obat ke dalam kantung kelopak mata bawah.',
        importantNote: 'Jika dosis 2 tetes, tunggu jeda 5 menit sebelum meneteskan tetes kedua.'
      },
      {
        stepNumber: 4,
        title: 'Tutup Mata & Tekan Sudut Mata',
        description: 'Tutup mata secara perlahan selama 1-2 menit. Tekan lembut sudut mata dekat hidung (duktus nasolakrimalis) dengan jari bersih.',
        importantNote: 'Menekan sudut mata mencegah obat mengalir ke saluran hidung/tenggorokan dan mengurangi efek samping sistemik.'
      }
    ],
    importantWarnings: [
      'Jangan mengedipkan mata berulang kali atau mengucek mata setelah diteteskan.',
      'Lepas lensa kontak sebelum meneteskan obat mata dan tunggu minimal 15 menit sebelum memasangnya kembali.',
      'Jika menggunakan lebih dari satu jenis obat mata (misal tetes + salep), gunakan tetes mata terlebih dahulu, tunggu 10 menit, baru gunakan salep mata.'
    ],
    dosAndDonts: {
      dos: [
        'Selalu cuci tangan sebelum dan sesudah penggunaan.',
        'Simpan obat di tempat sejuk & terhindar dari sinar matahari langsung.',
        'Beri label tanggal pertama kali botol dibuka.'
      ],
      donts: [
        'Jangan menyentuh ujung penetes botol dengan jari, mata, atau permukaan apa pun.',
        'Jangan berbagi obat tetes mata dengan orang lain.',
        'Jangan gunakan tetes mata yang sudah berubah warna atau keruh.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15-25°C) terhindar dari cahaya matahari. Buang sisa obat 28 hari setelah segel botol pertama kali dibuka.',
    commonMistakes: [
      'Meneteskan langsung ke kornea (hitam mata) yang menyebabkan refleks mengedip kencang.',
      'Menggunakan tetes mata yang sudah dibuka lebih dari 28 hari.',
      'Tidak memberi jeda saat menggunakan dua jenis obat tetes mata yang berbeda.'
    ]
  },
  {
    id: 'tetes-telinga',
    title: 'Tetes Telinga (Ear Drops)',
    category: 'Mata & Telinga',
    iconName: 'Ear',
    shortDesc: 'Tata cara penggunaan tetes telinga untuk dewasa dan anak-anak agar cairan obat meresap sempurna.',
    preparationSteps: [
      'Cuci tangan dengan sabun dan air mengalir.',
      'Hangatkan botol obat dengan menggenggamnya di telapak tangan selama beberapa menit.',
      'Bersihkan telinga luar dari kotoran secara lembut (jangan gunakan cotton bud ke dalam liang telinga).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala Miring',
        description: 'Miringkan kepala ke samping atau berbaring miring sehingga telinga yang sakit menghadap ke atas.'
      },
      {
        stepNumber: 2,
        title: 'Posisikan Daun Telinga',
        description: 'Untuk DEWASA: Tarik daun telinga ke ATAS dan ke BELAKANG. Untuk ANAK (<3 tahun): Tarik daun telinga ke BAWAH dan ke BELAKANG.',
        importantNote: 'Posisi ini meluruskan saluran telinga agar cairan tetes dapat masuk dengan lancar.'
      },
      {
        stepNumber: 3,
        title: 'Penetesan Obat',
        description: 'Teteskan obat sesuai dosis ke dalam saluran telinga.',
        importantNote: 'Ujung botol penetes tidak boleh menyentuh telinga.'
      },
      {
        stepNumber: 4,
        title: 'Pertahankan Posisi Miring',
        description: 'Tetap dalam posisi miring selama 3-5 menit agar obat meresap ke dalam liang telinga.',
        importantNote: 'Tekan lembut tragus (bagian depan telinga) beberapa kali untuk membantu cairan mengalir ke dalam.'
      }
    ],
    importantWarnings: [
      'Jangan gunakan obat tetes telinga jika gendang telinga Anda robek atau bocor (kecuali atas instruksi dokter).',
      'Jangan menjejalkan kapas terlalu dalam ke dalam telinga.'
    ],
    dosAndDonts: {
      dos: [
        'Hangatkan obat ke suhu tubuh sebelum diteteskan agar tidak pusing/vertigo.',
        'Tetap miringkan kepala minimal 3 menit setelah diteteskan.'
      ],
      donts: [
        'Jangan meneteskan cairan yang terlalu dingin langsung dari kulkas.',
        'Jangan menusukkan ujung pipet ke dalam lubang telinga.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15-30°C). Jauhkan dari jangkauan anak-anak dan cahaya matahari langsung.',
    commonMistakes: [
      'Langsung menegakkan kepala setelah meneteskan obat sehingga cairan keluar kembali.',
      'Tetes obat terlalu dingin yang memicu refleks nyeri / vertigo (kalori respon).'
    ]
  },
  {
    id: 'salep-mata',
    title: 'Salep Mata (Eye Ointment)',
    category: 'Mata & Telinga',
    iconName: 'Sparkles',
    shortDesc: 'Panduan penggunaan salep mata steril untuk infeksi atau iritasi jaringan mata.',
    preparationSteps: [
      'Cuci tangan hingga bersih dengan air dan sabun.',
      'Duduk di depan cermin atau minta bantuan orang lain jika kesulitan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tengadahkan Kepala',
        description: 'Tengadahkan kepala sedikit ke belakang dan tarik kelopak mata bawah ke bawah hingga membentuk pita/kantung.'
      },
      {
        stepNumber: 2,
        title: 'Oleskan Salep',
        description: 'Pencet tube salep perlahan dan oleskan lapisan tipis salep (sekitar 0.5 - 1 cm) sepanjang bagian dalam kelopak mata bawah.',
        importantNote: 'Pegang tube tanpa menyentuhkan tip tube ke mata, bulu mata, atau mata.'
      },
      {
        stepNumber: 3,
        title: 'Kedipkan Mata Pelan',
        description: 'Lepaskan kelopak mata, tutuplah mata perlahan selama 1-2 menit dan kedipkan mata pelan-pelan agar salep merata di permukaan mata.'
      },
      {
        stepNumber: 4,
        title: 'Bersihkan Sisa Salep',
        description: 'Usap sisa salep berlebih di sekitar kelopak mata luar menggunakan tisu bersih.'
      }
    ],
    importantWarnings: [
      'Salep mata dapat menyebabkan pandangan kabur sementara. Sebaiknya digunakan menjelang tidur malam.',
      'Jangan mengemudi atau mengoperasikan mesin sampai pandangan kembali jernih.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan menjelang tidur jika menyebabkan pandangan kabur.',
        'Gunakan tetes mata dulu baru salep mata jika ada kombinasi obat.'
      ],
      donts: [
        'Jangan menyentuhkan tip tube ke mata atau jari tangan.',
        'Jangan mengucek mata setelah dioleskan salep.'
      ]
    },
    storageAdvice: 'Simpan tube tertutup rapat pada suhu kamar. Buang sisa salep 28 hari setelah kemasan pertama kali dibuka.',
    commonMistakes: [
      'Menyentuhkan tip tube ke bulu mata atau kelopak mata yang mengkontaminasi sisa isi tube.',
      'Langsung mengemudi kendaraan saat pandangan masih buram oleh salep.'
    ]
  },
  {
    id: 'insulin-pen',
    title: 'Insulin (Pen Insulin)',
    category: 'Injeksi',
    iconName: 'Syringe',
    shortDesc: 'Panduan teknik penyuntikan insulin mandiri dengan pen insulin secara aman dan steril.',
    preparationSteps: [
      'Cuci tangan dengan sabun dan air mengalir.',
      'Persiapkan pen insulin, jarum pen baru, alkohol swab, dan wadah limbah tajam.',
      'Jika menggunakan insulin keruh (NPH/Premix), putar pen di antara kedua telapak tangan 10 kali dan bolak-balikkan 10 kali hingga homogen.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pasang Jarum Baru & Uji Aliran (Priming)',
        description: 'Buka segel jarum baru, pasang ke pen insulin. Putar dosis ke 2 unit (priming dose), arahkan jarum ke atas dan tekan tombol hingga cairan insulin keluar di ujung jarum.',
        importantNote: 'Priming memastikan udara keluar dari jarum dan dosis tepat terhantar.'
      },
      {
        stepNumber: 2,
        title: 'Atur Dosis & Pilih Lokasi Suntik',
        description: 'Putar pemutar dosis sesuai unit yang diresepkan dokter. Pilih lokasi suntik (perut/abdomen minimal 2 cm dari pusar, paha luar, atau lengan atas). Bersihkan dengan alkohol swab dan biarkan mengering.'
      },
      {
        stepNumber: 3,
        title: 'Suntikkan Insulin',
        description: 'Cubit lipatan kulit (bila perlu), posisikan pen 90 derajat terhadap permukaan kulit, lalu tekan tombol dosis hingga angka kembali ke 0.',
        importantNote: 'Tahan tombol dan biarkan jarum tetap di dalam kulit selama hitungan 10 DETIK sebelum dicabut.'
      },
      {
        stepNumber: 4,
        title: 'Cabut & Buang Jarum',
        description: 'Cabut jarum dari kulit lurus ke atas. Pasang penutup luar jarum, lepaskan jarum dari pen, lalu buang jarum ke wadah limbah tajam (sharp container).'
      }
    ],
    importantWarnings: [
      'Rotasi lokasi penyuntikan secara teratur untuk mencegah lipohipertrofi (gumpalan lemak keras di bawah kulit).',
      'Jangan pernah membagikan pen insulin atau jarum pen kepada orang lain!'
    ],
    dosAndDonts: {
      dos: [
        'Selalu gunakan jarum baru untuk setiap kali suntik.',
        'Hitung 10 detik saat menekan tombol suntik sebelum menarik jarum.',
        'Rotasi tempat penyuntikan.'
      ],
      donts: [
        'Jangan menyimpan pen insulin dengan jarum masih terpasang.',
        'Jangan mengocok keras botol/pen insulin.',
        'Jangan menyuntikkan insulin yang sudah menggumpal/beku.'
      ]
    },
    storageAdvice: 'Pen insulin yang BELUM DIBUKA disimpan di kulkas (2-8°C, jangan dibekukan). Pen insulin yang SEDANG DIGUNAKAN dapat disimpan pada suhu kamar (<30°C) bertahan hingga 28 hari (tergantung jenis merk insulin).',
    commonMistakes: [
      'Langsung mencabut jarum tanpa menunggu 10 detik sehingga cairan insulin menetes keluar.',
      'Suntik di titik lokasi yang sama terus menerus (lipohipertrofi).',
      'Menyimpan insulin di dalam freezer sampai beku.'
    ]
  },
  {
    id: 'inhaler-mdi',
    title: 'Inhaler MDI (Metered Dose Inhaler)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Cara penggunaan inhaler semprot (pMDI) dengan koordinasi nafas yang tepat.',
    preparationSteps: [
      'Buka penutup mouthpiece inhaler.',
      'Kocok inhaler secara vertikal sebanyak 4-5 kali.',
      'Duduk tegak atau berdiri tegak.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hembuskan Nafas Maksimal',
        description: 'Hembuskan nafas perlahan dan dalam menjauhi mouthpiece inhaler.'
      },
      {
        stepNumber: 2,
        title: 'Posisikan Mouthpiece',
        description: 'Rapatkan bibir mengelilingi mouthpiece inhaler hingga kedap udara (jangan digigit dengan gigi).'
      },
      {
        stepNumber: 3,
        title: 'Tekan Kanister & Hirup Dalam',
        description: 'Mulailah menghirup nafas perlahan dan dalam melalui mulut, LALU tekan bagian atas kanister 1 kali sambil terus menghirup dalam selama 3-5 detik.',
        importantNote: 'Kunci keberhasilan MDI: koordinasi menekan tabung bersamaan dengan mulai menghirup nafas.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik',
        description: 'Lepaskan inhaler dari mulut, tutuplah mulut dan tahan nafas selama 10 detik (atau senyaman Anda), lalu hembuskan nafas perlahan.',
        importantNote: 'Jika butuh semprotan kedua, tunggu jeda 1 menit sebelum mengulangi langkah.'
      }
    ],
    importantWarnings: [
      'Jika obat mengandung KORTIKOSTEROID (misal: Fluticasone, Budesonide), wajib KUMUR-KUMUR AIR PUTIH dan buang airnya setelah penggunaan untuk mencegah jamur mulut (candidiasis) dan suara serak.'
    ],
    dosAndDonts: {
      dos: [
        'Kocok inhaler sebelum digunakan.',
        'Gunakan spacer (tabung perantara) terutama untuk anak-anak & lansia.',
        'Kumur air putih setelah hirup steroid inhaler.'
      ],
      donts: [
        'Jangan menghirup melalui hidung.',
        'Jangan menelan air kumuran steroid inhaler.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar (15-30°C). Jauhkan dari panas tinggi atau sinar matahari karena kanister bertekanan tinggi.',
    commonMistakes: [
      'Tekan kanister duluan baru menghirup, atau menghirup dulu baru menekan (tidak sinkron).',
      'Tidak menahan nafas selama 10 detik.',
      'Lupa berkumur setelah inhaler kortikosteroid.'
    ]
  },
  {
    id: 'turbuhaler',
    title: 'Turbuhaler (DPI Turbuhaler)',
    category: 'Inhalasi & Respirasi',
    iconName: 'CircleDot',
    shortDesc: 'Panduan penggunaan inhaler serbuk kering tipe Turbuhaler (misal: Symbicort / Pulmicort).',
    preparationSteps: [
      'Putar dan lepaskan tutup Turbuhaler.',
      'Pegang Turbuhaler tegak lurus dengan pemutar grip di bagian bawah.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Isi Dosis (Isi Serbuk)',
        description: 'Putar grip merah/bawah ke KANAN sejauh mungkin, lalu putar kembali ke KIRI sampai terdengar bunyi "KLIK".',
        importantNote: 'Dosis obat kini sudah siap di dalam chamber.'
      },
      {
        stepNumber: 2,
        title: 'Hembuskan Nafas Menjauhi Alat',
        description: 'Hembuskan nafas dalam-dalam ke arah luar (JANGAN menghembuskan nafas ke dalam mouthpiece Turbuhaler).'
      },
      {
        stepNumber: 3,
        title: 'Hirup Cepat & Dalam',
        description: 'Rapatkan bibir pada mouthpiece Turbuhaler, lalu hirup nafas melaui mulut SECEPAT dan SEDALAM mungkin.',
        importantNote: 'Turbuhaler memerlukan kekuatan isapan nafas yang kuat karena berbentuk serbuk kering.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas 10 Detik',
        description: 'Keluarkan Turbuhaler dari mulut, tahan nafas selama 5-10 detik, lalu hembuskan nafas perlahan.',
        importantNote: 'Jangan lupa berkumur dengan air putih setelah selesai jika mengandung steroid.'
      }
    ],
    importantWarnings: [
      'Jangan menghembuskan nafas ke dalam mouthpiece Turbuhaler karena kelembaban nafas dapat menggumpalkan serbuk obat.',
      'Pembersihan: Lap mouthpiece dengan tisu kering. JANGAN dicuci dengan air!'
    ],
    dosAndDonts: {
      dos: [
        'Hirup nafas dengan KUAT dan CEPAT.',
        'Pastikan terdengar bunyi KLIK saat mengisi dosis.',
        'Kumur air putih setelah pemakaian.'
      ],
      donts: [
        'Jangan mencuci alat Turbuhaler dengan air.',
        'Jangan meniupkan udara ke dalam alat.'
      ]
    },
    storageAdvice: 'Simpan di tempat kering pada suhu kamar (<30°C) dengan penutup terpasang rapat.',
    commonMistakes: [
      'Menghirup terlalu lambat/pelan sehingga serbuk tidak masuk ke paru-paru.',
      'Meniup ke dalam mouthpiece sehingga serbuk di dalam alat menjadi basah/menggumpal.'
    ]
  },
  {
    id: 'diskus-accuhaler',
    title: 'Diskus / Accuhaler (DPI Diskus)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Disc',
    shortDesc: 'Cara penggunaan inhaler bentuk piringan Diskus/Accuhaler (misal: Seretide Diskus).',
    preparationSteps: [
      'Pegang bagian luar casing Diskus dengan satu tangan.',
      'Letakkan ibu jari tangan lainnya pada lekukan ibu jari, lalu dorong hingga terdengar bunyi KLIK untuk membuka mouthpiece.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Kokang Tuas Dosis',
        description: 'Pegang Diskus secara mendatar. Geser tuas pengokang ke arah luar sampai terdengar bunyi "KLIK".',
        importantNote: 'Dosis obat sudah terbuka dan siap dihirup. Jangan memainkan tuas.'
      },
      {
        stepNumber: 2,
        title: 'Hembuskan Nafas',
        description: 'Hembuskan nafas perlahan menjauhi alat Diskus.'
      },
      {
        stepNumber: 3,
        title: 'Hirup Cepat & Dalam',
        description: 'Posisikan mouthpiece ke bibir secara rapat. Hirup nafas melalui mulut dengan CEPAT dan DALAM.',
        importantNote: 'Pegang alat selalu dalam posisi mendatar (horizontal).'
      },
      {
        stepNumber: 4,
        title: 'Tahan Nafas & Tutup Alat',
        description: 'Lepaskan alat dari mulut, tahan nafas 10 detik. Tutup Diskus dengan menggeser lekukan ibu jari kembali ke posisi awal. Kumur air putih.'
      }
    ],
    importantWarnings: [
      'Perhatikan angka konter dosis pada bagian atas Diskus (angka merah menandakan sisa dosis tinggal sedikit).',
      'Selalu berkumur setelah menghirup obat.'
    ],
    dosAndDonts: {
      dos: [
        'Pegang Diskus secara horizontal saat menghirup.',
        'Hirup dengan mantap, cepat, dan dalam.'
      ],
      donts: [
        'Jangan menggeser tuas kokang berulang kali karena akan membuang dosis obat.',
        'Jangan mencuci Diskus dengan air.'
      ]
    },
    storageAdvice: 'Simpan di tempat kering dan sejuk (<30°C). Jauhkan dari lingkungan lembab seperti kamar mandi.',
    commonMistakes: [
      'Mengocok alat Diskus (Diskus tidak perlu dikocok).',
      'Memainkan tuas pengokang sehingga dosis terbuang percuma.'
    ]
  },
  {
    id: 'suppositoria',
    title: 'Suppositoria (Rektal Suppositoria)',
    category: 'Suppositoria & Vaginal',
    iconName: 'ShieldAlert',
    shortDesc: 'Panduan tata cara memasukkan obat suppositoria melalui anus/rektum secara higienis dan nyaman.',
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Bila suppositoria terasa lembek, masukkan ke dalam kulkas atau rendam dalam air dingin sebentar sebelum dibuka bungkusnya.',
      'Buka pembungkus suppositoria tepat sebelum dimasukkan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Tubuh',
        description: 'Berbaring miring ke satu sisi (misal miring kiri), tekuk kaki bagian atas ke arah dada, sedangkan kaki bawah diluruskan.'
      },
      {
        stepNumber: 2,
        title: 'Basahi Pelumas',
        description: 'Basahi ujung runcing suppositoria dengan sedikit air bersih atau lubrikan berbasis air (water-based lubricant).',
        importantNote: 'Jangan gunakan vaseline/petroleum jelly karena mengganggu penyerapan obat.'
      },
      {
        stepNumber: 3,
        title: 'Masukan Suppositoria',
        description: 'Dorong bagian ujung runcing suppositoria secara perlahan ke dalam anus menggunakan jari telunjuk hingga melewati otot spingter (sekitar 2-3 cm untuk dewasa, 1.5-2 cm untuk anak).',
        importantNote: 'Pastikan obat masuk cukup dalam agar tidak terdorong keluar kembali.'
      },
      {
        stepNumber: 4,
        title: 'Tahan Posisi Berbaring',
        description: 'Rapatkan kedua tungkai dan tetap berbaring miring selama 15-20 menit agar obat meleleh dan terserap sempurna.',
        importantNote: 'Cuci tangan kembali setelah selesai.'
      }
    ],
    importantWarnings: [
      'Jangan menunda memasukkan suppositoria setelah pembungkus dibuka agar obat tidak meleleh di tangan.',
      'Kosongkan buang air besar (BAB) terlebih dahulu sebelum menggunakan suppositoria bila memungkinkan.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan air bersih untuk melumasi ujung suppositoria.',
        'Tetap berbaring miring minimal 15 menit setelah penggunaan.'
      ],
      donts: [
        'Jangan memotong suppositoria kecuali atas arahan apoteker/dokter.',
        'Jangan menelan obat suppositoria melalui mulut!'
      ]
    },
    storageAdvice: 'Simpan di tempat sejuk (<25°C) atau dalam kulkas (2-8°C, jangan dibekukan) agar suppositoria tetap padat.',
    commonMistakes: [
      'Memasukkan obat kurang dalam sehingga suppositoria terdorong keluar lagi saat otot anus berkontraksi.',
      'Lupa membuka pembungkus aluminium foil/plastik suppositoria.'
    ]
  },
  {
    id: 'ovula',
    title: 'Ovula (Vaginal Ovules / Suppositoria Vaginal)',
    category: 'Suppositoria & Vaginal',
    iconName: 'ShieldAlert',
    shortDesc: 'Panduan cara penggunaan tablet/sisipan vagina (ovula) dengan atau tanpa aplikator.',
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Kosongkan kandung kemih (buang air kecil) terlebih dahulu.',
      'Keluarkan ovula dari kemasan foil kemasan.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Persiapkan Aplikator (Bila Ada)',
        description: 'Letakkan ovula pada ujung aplikator khusus yang disediakan dalam kemasan.'
      },
      {
        stepNumber: 2,
        title: 'Posisikan Tubuh',
        description: 'Berbaring terlentang dengan kedua lutut ditekuk dan kedua kaki dibuka sedikit lebar (posisi litotomi) atau berdiri dengan satu kaki di atas bangku.'
      },
      {
        stepNumber: 3,
        title: 'Masukan Ovula',
        description: 'Masukkan ovula (atau ujung aplikator) perlahan ke dalam vagina sedalam mungkin tanpa memaksa atau menyebabkan nyeri.',
        importantNote: 'Jika menggunakan aplikator, dorong pendorong aplikator untuk melepaskan obat, lalu tarik aplikator keluar.'
      },
      {
        stepNumber: 4,
        title: 'Istirahat & Bersihkan Aplikator',
        description: 'Tetap berbaring terlentang selama 10-15 menit agar obat meleleh dan tidak keluar. Cuci aplikator (jika reusable) dan cuci tangan.',
        importantNote: 'Disarankan digunakan tepat menjelang tidur malam.'
      }
    ],
    importantWarnings: [
      'Gunakan pembalut tipis (panty liner) setelah penggunaan karena sisa lelehan obat mungkin mengalir keluar.',
      'Jangan menggunakan tampon selama masa pengobatan ovula vaginal.',
      'Konsultasikan dengan dokter jika sedang dalam masa haid/menstruasi.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan menjelang tidur malam untuk hasil penyerapan optimal.',
        'Pakai panty liner untuk menampung lelehan sisa obat.'
      ],
      donts: [
        'Jangan berhubungan intim selama periode pengobatan infeksi vaginal.',
        'Jangan menelan obat ovula.'
      ]
    },
    storageAdvice: 'Simpan di tempat sejuk (<25°C) terhindar dari panas dan cahaya matahari. Beberapa produk perlu ditaruh di kulkas.',
    commonMistakes: [
      'Menggunakan ovula siang hari saat beraktivitas jalan sehingga lelehan obat keluar sebelum terserap.',
      'Menggunakan tampon yang justru menyerap obat dari organ vagina.'
    ]
  },
  {
    id: 'semprot-hidung',
    title: 'Semprot Hidung (Nasal Spray)',
    category: 'Inhalasi & Respirasi',
    iconName: 'Wind',
    shortDesc: 'Panduan tepat penggunaan aerosol/semprot hidung untuk rinitis alergi dan kongesti sinus.',
    preparationSteps: [
      'Tiup hidung perlahan untuk membersihkan lender/kotoran dari rongga hidung.',
      'Cuci tangan dengan sabun dan air mengalir.',
      'Kocok botol semprot hidung dan buka penutup pengaman.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Posisikan Kepala Tunduk',
        description: 'Duduk tegak dan tundukkan kepala sedikit ke depan melihat ke arah ibu jari kaki.'
      },
      {
        stepNumber: 2,
        title: 'Masukan Ujung Semprotan',
        description: 'Tutup salah satu lubang hidung dengan jari telunjuk. Masukkan ujung penyemprot ke lubang hidung sebelah.',
        importantNote: 'Arahkan ujung semprotan sedikit miring ke arah luar (menuju sudut mata luar), JAUHI dinding tengah/septum hidung.'
      },
      {
        stepNumber: 3,
        title: 'Semprot & Hirup Perlahan',
        description: 'Tekan pompa semprotan sekali sambil menghirup napas PERLAHAN dan lembut melalui hidung.',
        importantNote: 'Jangan menghirup terlalu kuat agar cairan obat tidak langsung tertelan ke tenggorokan.'
      },
      {
        stepNumber: 4,
        title: 'Hembuskan Lewat Mulut',
        description: 'Keluarkan alat dari hidung dan hembuskan napas melalui mulut. Ulangi untuk lubang hidung sebelahnya.',
        importantNote: 'Lap ujung penyemprot dengan tisu bersih pasca pemakaian.'
      }
    ],
    importantWarnings: [
      'Jangan menyemprotkan obat langsung ke septum (dinding tengah) hidung karena memicu iritasi & perdarahan (mimisan).',
      'Penggunaan decongestant nasal spray (oxymetazoline) maksimal 3-5 hari berturut-turut untuk mencegah rebound congestion (rhinitis medicamentosa).'
    ],
    dosAndDonts: {
      dos: [
        'Arahkan penyemprot miring ke sudut mata luar.',
        'Hirup lembut perlahan melalui hidung.'
      ],
      donts: [
        'Jangan mendongakkan kepala ke belakang saat menyemprot.',
        'Jangan mengendus keras sesudah disemprot.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk terhindar dari panas. Jaga katup penyemprot tetap bersih dan terpasang tutup pengaman.',
    commonMistakes: [
      'Menengadahkan kepala ke belakang sehingga obat mengalir ke tenggorokan dan terasa pahit.',
      'Menyemprot tepat ke septum hidung memicu iritasi dan mimisan.'
    ]
  },
  {
    id: 'patch-transdermal',
    title: 'Koyo Medis Transdermal (Transdermal Patch)',
    category: 'Suppositoria & Vaginal',
    iconName: 'Disc',
    shortDesc: 'Panduan penempelan patch obat terukur (Nitrogliserin, Fentanyl, Nicotine, Estrogen) pada kulit.',
    preparationSteps: [
      'Cuci tangan dengan air bersih dan sabun.',
      'Pilih area kulit yang bersih, kering, tidak berbulu lebat, dan bebas dari luka/iritasi (misal: dada atas, lengan atas, atau punggung).',
      'Buka kemasan pelindung patch secara hati-hati.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lepas Lapisan Pelindung',
        description: 'Lepas setengah bagian lapisan pelindung plastik transparan tanpa menyentuh bagian lengket obat.'
      },
      {
        stepNumber: 2,
        title: 'Tempelkan pada Kulit',
        description: 'Tempelkan bagian lengket ke area kulit yang telah dipilih, lalu tarik sisa pelindung dan ratakan seluruh permukaan patch.'
      },
      {
        stepNumber: 3,
        title: 'Tekan Kuat 30 Detik',
        description: 'Tekan patch secara kuat menggunakan telapak tangan selama 30 detik untuk memastikan semua pinggiran menempel sempurna.',
        importantNote: 'Pastikan tidak ada gelembung udara atau kerutan pada patch.'
      },
      {
        stepNumber: 4,
        title: 'Rotasi Lokasi & Buang Aman',
        description: 'Saat melepas patch lama, lipat patch bekas hingga bagian lengket saling menempel dan buang ke tempat sampah tertutup. Rotasi lokasi penempelan patch baru.',
        importantNote: 'Jangan menempelkan patch baru pada lokasi bekas patch lama yang sama secara berturut-turut.'
      }
    ],
    importantWarnings: [
      'Jauhkan patch bekas dari jangkauan anak-anak dan hewan peliharaan (sisa zat aktif masih berbahaya).',
      'Jangan memotong atau menggunting patch reservoir karena memicu overdosis obat mendadak.'
    ],
    dosAndDonts: {
      dos: [
        'Rotasi lokasi penempelan kulit setiap kali mengganti patch baru.',
        'Lipat patch bekas sebelum dibuang.'
      ],
      donts: [
        'Jangan memotong/menggunting patch transdermal.',
        'Jangan menempel pada kulit berbulu lebat, iritasi, atau terbentur.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk dalam kemasan foil utuh. Jauhkan dari panas tinggi atau sinar matahari langsung.',
    commonMistakes: [
      'Memotong patch obat yang menyebabkan pelepasan dosis obat mendadak (overdosis).',
      'Lupa melepas patch lama sebelum menempelkan patch baru.'
    ]
  },
  {
    id: 'sirup-kering-rekonstitusi',
    title: 'Sirup Kering & Suspensi Oral (Dry Syrup)',
    category: 'Mata & Telinga',
    iconName: 'Sparkles',
    shortDesc: 'Panduan tata cara merekonstitusi sirup kering antibiotik dengan air matang dan batas waktu simpan.',
    preparationSteps: [
      'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
      'Kocok botol sirup kering agar serbuk di bagian dasar botol tidak menggumpal.',
      'Siapkan air minum matang pada suhu kamar (bukan air panas).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tambahkan Air Matang',
        description: 'Tuang air matang secara bertahap sampai sedikit di bawah tanda batas garis pada botol sirup.',
        importantNote: 'Gunakan air matang suhu biasa, JANGAN gunakan air panas karena merusak antibiotik.'
      },
      {
        stepNumber: 2,
        title: 'Kocok Hingga Homogen',
        description: 'Tutup rapat botol, lalu kocok botol dengan kuat hingga seluruh serbuk larut terdispersi merata.',
        importantNote: 'Biarkan busa mereda beberapa menit, lalu tambahkan air lagi tepat hingga tanda batas garis jika kurang.'
      },
      {
        stepNumber: 3,
        title: 'Gunakan Sendok Takar Presisi',
        description: 'Selalu gunakan sendok takar atau pipet tetes bawaan kemasan obat saat memberikan dosis pada anak.',
        importantNote: 'Selalu kocok botol sirup setiap kali sebelum diminumkan.'
      },
      {
        stepNumber: 4,
        title: 'Beri Label Tanggal & Simpan',
        description: 'Tuliskan tanggal pembuatan pada botol. Simpan sirup suspensi matang sesuai petunjuk (biasanya maksimal 7 - 14 hari).',
        importantNote: 'Buang sisa sirup antibiotik setelah 7-14 hari meskipun belum habis.'
      }
    ],
    importantWarnings: [
      'Batas kadaluwarsa sirup kering antibiotik matang maksimal 7 - 14 hari setelah dicampur air.',
      'Selalu kocok botol terlebih dahulu sebelum diminumkan.'
    ],
    dosAndDonts: {
      dos: [
        'Gunakan air matang suhu ruangan untuk melarutkan.',
        'Kocok botol setiap kali sebelum digunakan.',
        'Beri tanggal pelarutan pada botol.'
      ],
      donts: [
        'Jangan melarutkan sirup kering dengan air panas.',
        'Jangan menggunakan sendok makan rumah tangga yang ukurannya tidak presisi.'
      ]
    },
    storageAdvice: 'Simpan pada suhu kamar sejuk (<30°C) atau di dalam kulkas (2-8°C) sesuai petunjuk pabrik obat. Buang sisa sirup antibiotik setelah 7-14 hari.',
    commonMistakes: [
      'Melarutkan sirup kering dengan air panas yang merusak struktur aktif antibiotik.',
      'Menggunakan sendok makan makan biasa yang membuat dosis tidak presisi.'
    ]
  }
];

export const MEDICATION_GUIDES: MedicationGuide[] = deduplicateMedicationGuides(RAW_MEDICATION_GUIDES);
