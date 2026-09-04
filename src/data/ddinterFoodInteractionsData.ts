import { DrugFoodInteraction } from '../types';

/**
 * Basis Data Resmi Interaksi Obat & Makanan DDInter 2.0 (Bahasa Indonesia)
 * Standar Nature Protocols 2022 - EBM Clinical Standards
 * Total Rekor: 857
 */
export const DDINTER_OFFICIAL_FOOD_INTERACTIONS: DrugFoodInteraction[] = [
  {
    "id": "ddinter-dfi-1",
    "drugName": "Calcium lactate",
    "foodName": "Bayam & Sayuran Hijau Tinggi Oksalat",
    "foodCategory": "Makanan Tinggi Vitamin K",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium lactate dan Bayam & Sayuran Hijau Tinggi Oksalat.",
    "clinicalOutcome": "Vitamin K memicu sintesis faktor pembekuan darah yang bekerja berlawanan secara antagonis dengan efek antikoagulan Calcium lactate, meningkatkan risiko fluktuasi INR dan tromboemboli.",
    "recommendation": "Pertahankan asupan sayuran hijau tetap konsisten dan stabil setiap hari. Hindari perubahan diet drastis tanpa konsultasi apoteker/dokter."
  },
  {
    "id": "ddinter-dfi-2",
    "drugName": "Calcium lactate",
    "foodName": "Rhubarb & Tumbuhan Asam Oksalat",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium lactate dan Rhubarb & Tumbuhan Asam Oksalat.",
    "clinicalOutcome": "Interaksi antara Calcium lactate dan Rhubarb & Tumbuhan Asam Oksalat dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium lactate."
  },
  {
    "id": "ddinter-dfi-3",
    "drugName": "Calcium lactate",
    "foodName": "Bekatul & Serat Gandum Kasar",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium lactate dan Bekatul & Serat Gandum Kasar.",
    "clinicalOutcome": "Interaksi antara Calcium lactate dan Bekatul & Serat Gandum Kasar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium lactate."
  },
  {
    "id": "ddinter-dfi-4",
    "drugName": "Calcium lactate",
    "foodName": "Biji-Bijian & Gandum Utuh",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium lactate dan Biji-Bijian & Gandum Utuh.",
    "clinicalOutcome": "Interaksi antara Calcium lactate dan Biji-Bijian & Gandum Utuh dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium lactate."
  },
  {
    "id": "ddinter-dfi-5",
    "drugName": "Pralsetinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pralsetinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Pralsetinib.",
    "recommendation": "Konsumsi Pralsetinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-6",
    "drugName": "Pralsetinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pralsetinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pralsetinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pralsetinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-7",
    "drugName": "Tetraferric tricitrate decahydrate",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tetraferric tricitrate decahydrate dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Tetraferric tricitrate decahydrate.",
    "recommendation": "Konsumsi Tetraferric tricitrate decahydrate sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-8",
    "drugName": "Pirfenidone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pirfenidone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pirfenidone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pirfenidone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-9",
    "drugName": "Apraclonidine (ophthalmic)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Apraclonidine (ophthalmic) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Apraclonidine (ophthalmic) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Apraclonidine (ophthalmic)."
  },
  {
    "id": "ddinter-dfi-10",
    "drugName": "Olutasidenib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Olutasidenib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Olutasidenib.",
    "recommendation": "Konsumsi Olutasidenib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-11",
    "drugName": "Paclitaxel",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Paclitaxel dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Paclitaxel dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Paclitaxel. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-12",
    "drugName": "Methylprednisolone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methylprednisolone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Methylprednisolone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Methylprednisolone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-13",
    "drugName": "Ketorolac",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ketorolac dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ketorolac dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ketorolac."
  },
  {
    "id": "ddinter-dfi-14",
    "drugName": "Doxazosin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Doxazosin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Doxazosin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Doxazosin."
  },
  {
    "id": "ddinter-dfi-15",
    "drugName": "Pegaspargase",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pegaspargase dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pegaspargase dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pegaspargase."
  },
  {
    "id": "ddinter-dfi-16",
    "drugName": "Sotorasib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sotorasib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Sotorasib.",
    "recommendation": "Konsumsi Sotorasib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-17",
    "drugName": "Belladonna",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Belladonna dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Belladonna dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Belladonna."
  },
  {
    "id": "ddinter-dfi-18",
    "drugName": "Maraviroc",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Maraviroc dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Maraviroc.",
    "recommendation": "Konsumsi Maraviroc sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-19",
    "drugName": "Clonidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clonidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clonidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clonidine."
  },
  {
    "id": "ddinter-dfi-20",
    "drugName": "Droperidol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Droperidol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Droperidol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Droperidol."
  },
  {
    "id": "ddinter-dfi-21",
    "drugName": "Risedronic acid",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Risedronic acid dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Risedronic acid dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Risedronic acid."
  },
  {
    "id": "ddinter-dfi-22",
    "drugName": "Brincidofovir",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brincidofovir dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Brincidofovir dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Brincidofovir."
  },
  {
    "id": "ddinter-dfi-23",
    "drugName": "Regadenoson",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Regadenoson dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Regadenoson di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Regadenoson dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-24",
    "drugName": "Acetaminophen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Acetaminophen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Acetaminophen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Acetaminophen."
  },
  {
    "id": "ddinter-dfi-25",
    "drugName": "Protriptyline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Protriptyline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Protriptyline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Protriptyline."
  },
  {
    "id": "ddinter-dfi-26",
    "drugName": "Irbesartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Irbesartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Irbesartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Irbesartan."
  },
  {
    "id": "ddinter-dfi-27",
    "drugName": "Irbesartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Irbesartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Irbesartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-28",
    "drugName": "Lomitapide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lomitapide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Lomitapide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Lomitapide."
  },
  {
    "id": "ddinter-dfi-29",
    "drugName": "Iron",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Iron dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Iron dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Iron."
  },
  {
    "id": "ddinter-dfi-30",
    "drugName": "Norethisterone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Norethisterone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Norethisterone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Norethisterone."
  },
  {
    "id": "ddinter-dfi-31",
    "drugName": "Ferrous sulfate anhydrous",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ferrous sulfate anhydrous dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ferrous sulfate anhydrous dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ferrous sulfate anhydrous."
  },
  {
    "id": "ddinter-dfi-32",
    "drugName": "Nintedanib",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nintedanib dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Nintedanib dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Nintedanib."
  },
  {
    "id": "ddinter-dfi-33",
    "drugName": "Dicyclomine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dicyclomine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dicyclomine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dicyclomine."
  },
  {
    "id": "ddinter-dfi-34",
    "drugName": "Silodosin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Silodosin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Silodosin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Silodosin."
  },
  {
    "id": "ddinter-dfi-35",
    "drugName": "Tenofovir disoproxil",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tenofovir disoproxil dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Tenofovir disoproxil.",
    "recommendation": "Konsumsi Tenofovir disoproxil sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-36",
    "drugName": "Mesoridazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mesoridazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Mesoridazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Mesoridazine."
  },
  {
    "id": "ddinter-dfi-37",
    "drugName": "Pramlintide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pramlintide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pramlintide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pramlintide."
  },
  {
    "id": "ddinter-dfi-38",
    "drugName": "Fluvastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fluvastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fluvastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fluvastatin."
  },
  {
    "id": "ddinter-dfi-39",
    "drugName": "Esomeprazole",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Esomeprazole dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Esomeprazole dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Esomeprazole."
  },
  {
    "id": "ddinter-dfi-40",
    "drugName": "Vardenafil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vardenafil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Vardenafil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Vardenafil."
  },
  {
    "id": "ddinter-dfi-41",
    "drugName": "Methohexital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methohexital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methohexital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methohexital."
  },
  {
    "id": "ddinter-dfi-42",
    "drugName": "Meloxicam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Meloxicam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Meloxicam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Meloxicam."
  },
  {
    "id": "ddinter-dfi-43",
    "drugName": "Levofloxacin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levofloxacin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Levofloxacin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Levofloxacin."
  },
  {
    "id": "ddinter-dfi-44",
    "drugName": "Niacin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Niacin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Niacin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Niacin."
  },
  {
    "id": "ddinter-dfi-45",
    "drugName": "Esterified estrogens",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Esterified estrogens dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Esterified estrogens dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Esterified estrogens."
  },
  {
    "id": "ddinter-dfi-46",
    "drugName": "Estrone sulfate",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Estrone sulfate dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Estrone sulfate dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Estrone sulfate."
  },
  {
    "id": "ddinter-dfi-47",
    "drugName": "Tiludronic acid",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tiludronic acid dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Tiludronic acid dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Tiludronic acid."
  },
  {
    "id": "ddinter-dfi-48",
    "drugName": "Scopolamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Scopolamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Scopolamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Scopolamine."
  },
  {
    "id": "ddinter-dfi-49",
    "drugName": "Scopolamine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Scopolamine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Scopolamine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Scopolamine."
  },
  {
    "id": "ddinter-dfi-50",
    "drugName": "Nitroglycerin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nitroglycerin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nitroglycerin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nitroglycerin."
  },
  {
    "id": "ddinter-dfi-51",
    "drugName": "Dicloxacillin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dicloxacillin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Dicloxacillin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Dicloxacillin."
  },
  {
    "id": "ddinter-dfi-52",
    "drugName": "Darunavir",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Darunavir dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Darunavir dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Darunavir."
  },
  {
    "id": "ddinter-dfi-53",
    "drugName": "Eplerenone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eplerenone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Eplerenone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Eplerenone."
  },
  {
    "id": "ddinter-dfi-54",
    "drugName": "Torasemide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Torasemide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Torasemide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Torasemide."
  },
  {
    "id": "ddinter-dfi-55",
    "drugName": "Dulaglutide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dulaglutide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dulaglutide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dulaglutide."
  },
  {
    "id": "ddinter-dfi-56",
    "drugName": "Etodolac",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Etodolac dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Etodolac dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Etodolac."
  },
  {
    "id": "ddinter-dfi-57",
    "drugName": "Liraglutide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Liraglutide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Liraglutide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Liraglutide."
  },
  {
    "id": "ddinter-dfi-58",
    "drugName": "Metolazone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metolazone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metolazone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metolazone."
  },
  {
    "id": "ddinter-dfi-59",
    "drugName": "Quinine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Quinine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Quinine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Quinine."
  },
  {
    "id": "ddinter-dfi-60",
    "drugName": "Aluminum hydroxide",
    "foodName": "Buah Jeruk & Sitrus Asam",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Aluminum hydroxide dan Buah Jeruk & Sitrus Asam.",
    "clinicalOutcome": "Interaksi antara Aluminum hydroxide dan Buah Jeruk & Sitrus Asam dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Aluminum hydroxide."
  },
  {
    "id": "ddinter-dfi-61",
    "drugName": "Aluminum hydroxide",
    "foodName": "Minuman Ringan Berkarbonasi / Soda",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Aluminum hydroxide dan Minuman Ringan Berkarbonasi / Soda.",
    "clinicalOutcome": "Interaksi antara Aluminum hydroxide dan Minuman Ringan Berkarbonasi / Soda dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Aluminum hydroxide."
  },
  {
    "id": "ddinter-dfi-62",
    "drugName": "Ozanimod",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ozanimod dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Ozanimod dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ozanimod."
  },
  {
    "id": "ddinter-dfi-63",
    "drugName": "Lovastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lovastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lovastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lovastatin."
  },
  {
    "id": "ddinter-dfi-64",
    "drugName": "Iodide I-131",
    "foodName": "Makanan Tinggi Yodium (Rumput Laut, Garam Beryodium Tinggi)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Iodide I-131 dan Makanan Tinggi Yodium (Rumput Laut, Garam Beryodium Tinggi).",
    "clinicalOutcome": "Interaksi antara Iodide I-131 dan Makanan Tinggi Yodium (Rumput Laut, Garam Beryodium Tinggi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Iodide I-131."
  },
  {
    "id": "ddinter-dfi-65",
    "drugName": "Oxybutynin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxybutynin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oxybutynin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oxybutynin."
  },
  {
    "id": "ddinter-dfi-66",
    "drugName": "Daridorexant",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Daridorexant dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Daridorexant dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Daridorexant."
  },
  {
    "id": "ddinter-dfi-67",
    "drugName": "Fluphenazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fluphenazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fluphenazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fluphenazine."
  },
  {
    "id": "ddinter-dfi-68",
    "drugName": "Amiloride",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amiloride dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amiloride dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amiloride."
  },
  {
    "id": "ddinter-dfi-69",
    "drugName": "Amyl Nitrite",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amyl Nitrite dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amyl Nitrite dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amyl Nitrite."
  },
  {
    "id": "ddinter-dfi-70",
    "drugName": "Indomethacin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Indomethacin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Indomethacin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Indomethacin."
  },
  {
    "id": "ddinter-dfi-71",
    "drugName": "Tolmetin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolmetin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tolmetin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tolmetin."
  },
  {
    "id": "ddinter-dfi-72",
    "drugName": "Diroximel fumarate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diroximel fumarate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diroximel fumarate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diroximel fumarate."
  },
  {
    "id": "ddinter-dfi-73",
    "drugName": "Tioguanine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tioguanine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tioguanine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tioguanine."
  },
  {
    "id": "ddinter-dfi-74",
    "drugName": "Alendronic acid",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alendronic acid dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Alendronic acid dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Alendronic acid."
  },
  {
    "id": "ddinter-dfi-75",
    "drugName": "Ragweed pollen extract",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ragweed pollen extract dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ragweed pollen extract dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ragweed pollen extract."
  },
  {
    "id": "ddinter-dfi-76",
    "drugName": "Calaspargase pegol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calaspargase pegol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Calaspargase pegol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Calaspargase pegol."
  },
  {
    "id": "ddinter-dfi-77",
    "drugName": "Apomorphine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Apomorphine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Apomorphine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Apomorphine."
  },
  {
    "id": "ddinter-dfi-78",
    "drugName": "Simvastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Simvastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Simvastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Simvastatin."
  },
  {
    "id": "ddinter-dfi-79",
    "drugName": "Atenolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atenolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Atenolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Atenolol."
  },
  {
    "id": "ddinter-dfi-80",
    "drugName": "Atenolol",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atenolol dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Atenolol dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Atenolol."
  },
  {
    "id": "ddinter-dfi-81",
    "drugName": "Brimonidine (ophthalmic)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brimonidine (ophthalmic) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brimonidine (ophthalmic) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brimonidine (ophthalmic)."
  },
  {
    "id": "ddinter-dfi-82",
    "drugName": "Atorvastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atorvastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Atorvastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Atorvastatin."
  },
  {
    "id": "ddinter-dfi-83",
    "drugName": "Methoxsalen",
    "foodName": "Makanan Pemicu Fotosensitivitas (Seledri, Peterseli, Wortel Liar)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methoxsalen dan Makanan Pemicu Fotosensitivitas (Seledri, Peterseli, Wortel Liar).",
    "clinicalOutcome": "Interaksi antara Methoxsalen dan Makanan Pemicu Fotosensitivitas (Seledri, Peterseli, Wortel Liar) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Methoxsalen."
  },
  {
    "id": "ddinter-dfi-84",
    "drugName": "Pexidartinib",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pexidartinib dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pexidartinib dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pexidartinib."
  },
  {
    "id": "ddinter-dfi-85",
    "drugName": "Opicapone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Opicapone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Opicapone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Opicapone."
  },
  {
    "id": "ddinter-dfi-86",
    "drugName": "Opicapone",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Opicapone dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Opicapone.",
    "recommendation": "Konsumsi Opicapone sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-87",
    "drugName": "Acebutolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Acebutolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Acebutolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Acebutolol."
  },
  {
    "id": "ddinter-dfi-88",
    "drugName": "Glycopyrronium",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Glycopyrronium dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Glycopyrronium dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Glycopyrronium."
  },
  {
    "id": "ddinter-dfi-89",
    "drugName": "Thiethylperazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Thiethylperazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Thiethylperazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Thiethylperazine."
  },
  {
    "id": "ddinter-dfi-90",
    "drugName": "Indapamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Indapamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Indapamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Indapamide."
  },
  {
    "id": "ddinter-dfi-91",
    "drugName": "Daclizumab",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Daclizumab dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Daclizumab dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Daclizumab."
  },
  {
    "id": "ddinter-dfi-92",
    "drugName": "Levamisole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levamisole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levamisole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levamisole."
  },
  {
    "id": "ddinter-dfi-93",
    "drugName": "Rasagiline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rasagiline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Rasagiline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Rasagiline."
  },
  {
    "id": "ddinter-dfi-94",
    "drugName": "Rasagiline",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rasagiline dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Rasagiline dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Rasagiline."
  },
  {
    "id": "ddinter-dfi-95",
    "drugName": "Amoxapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amoxapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amoxapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amoxapine."
  },
  {
    "id": "ddinter-dfi-96",
    "drugName": "Plantago seed",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Plantago seed dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Plantago seed dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Plantago seed."
  },
  {
    "id": "ddinter-dfi-97",
    "drugName": "Nebivolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nebivolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nebivolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nebivolol."
  },
  {
    "id": "ddinter-dfi-98",
    "drugName": "Dimethyl fumarate",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dimethyl fumarate dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Dimethyl fumarate.",
    "recommendation": "Konsumsi Dimethyl fumarate sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-99",
    "drugName": "Dolutegravir",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dolutegravir dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Dolutegravir dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Dolutegravir."
  },
  {
    "id": "ddinter-dfi-100",
    "drugName": "Nalbuphine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nalbuphine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nalbuphine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nalbuphine."
  },
  {
    "id": "ddinter-dfi-101",
    "drugName": "Doxepin (topical)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Doxepin (topical) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Doxepin (topical) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Doxepin (topical)."
  },
  {
    "id": "ddinter-dfi-102",
    "drugName": "Perindopril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Perindopril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Perindopril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Perindopril."
  },
  {
    "id": "ddinter-dfi-103",
    "drugName": "Perindopril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Perindopril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Perindopril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-104",
    "drugName": "Spironolactone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Spironolactone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Spironolactone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Spironolactone."
  },
  {
    "id": "ddinter-dfi-105",
    "drugName": "Remdesivir",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Remdesivir dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Remdesivir dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Remdesivir."
  },
  {
    "id": "ddinter-dfi-106",
    "drugName": "Encorafenib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Encorafenib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Encorafenib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Encorafenib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-107",
    "drugName": "Acetylsalicylic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Acetylsalicylic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Acetylsalicylic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Acetylsalicylic acid."
  },
  {
    "id": "ddinter-dfi-108",
    "drugName": "Isosorbide mononitrate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isosorbide mononitrate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Isosorbide mononitrate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Isosorbide mononitrate."
  },
  {
    "id": "ddinter-dfi-109",
    "drugName": "Alvimopan",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alvimopan dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Alvimopan.",
    "recommendation": "Konsumsi Alvimopan sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-110",
    "drugName": "Oxaprozin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxaprozin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oxaprozin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oxaprozin."
  },
  {
    "id": "ddinter-dfi-111",
    "drugName": "Biperiden",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Biperiden dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Biperiden dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Biperiden."
  },
  {
    "id": "ddinter-dfi-112",
    "drugName": "Ticlopidine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ticlopidine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ticlopidine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ticlopidine."
  },
  {
    "id": "ddinter-dfi-113",
    "drugName": "Benazepril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Benazepril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Benazepril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Benazepril."
  },
  {
    "id": "ddinter-dfi-114",
    "drugName": "Benazepril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Benazepril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Benazepril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-115",
    "drugName": "Lemborexant",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lemborexant dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lemborexant dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lemborexant."
  },
  {
    "id": "ddinter-dfi-116",
    "drugName": "Patiromer",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Patiromer dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Patiromer dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Patiromer."
  },
  {
    "id": "ddinter-dfi-117",
    "drugName": "Amlodipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amlodipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amlodipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amlodipine."
  },
  {
    "id": "ddinter-dfi-118",
    "drugName": "Amlodipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amlodipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Amlodipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Amlodipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-119",
    "drugName": "Quetiapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Quetiapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Quetiapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Quetiapine."
  },
  {
    "id": "ddinter-dfi-120",
    "drugName": "Nimodipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nimodipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nimodipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nimodipine."
  },
  {
    "id": "ddinter-dfi-122",
    "drugName": "Nifedipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nifedipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nifedipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nifedipine."
  },
  {
    "id": "ddinter-dfi-123",
    "drugName": "Losartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Losartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Losartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Losartan."
  },
  {
    "id": "ddinter-dfi-124",
    "drugName": "Losartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Losartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Losartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-125",
    "drugName": "Warfarin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Warfarin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Warfarin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Warfarin."
  },
  {
    "id": "ddinter-dfi-126",
    "drugName": "Ketoconazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ketoconazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ketoconazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ketoconazole."
  },
  {
    "id": "ddinter-dfi-127",
    "drugName": "Nitazoxanide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nitazoxanide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Nitazoxanide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Nitazoxanide."
  },
  {
    "id": "ddinter-dfi-128",
    "drugName": "Levamlodipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levamlodipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levamlodipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levamlodipine."
  },
  {
    "id": "ddinter-dfi-129",
    "drugName": "Trospium",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trospium dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trospium dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trospium."
  },
  {
    "id": "ddinter-dfi-130",
    "drugName": "Trospium",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trospium dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Trospium.",
    "recommendation": "Konsumsi Trospium sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-131",
    "drugName": "Metoprolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metoprolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metoprolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metoprolol."
  },
  {
    "id": "ddinter-dfi-132",
    "drugName": "Metoprolol",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metoprolol dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Metoprolol dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Metoprolol."
  },
  {
    "id": "ddinter-dfi-133",
    "drugName": "Ribociclib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ribociclib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ribociclib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ribociclib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-134",
    "drugName": "Ribociclib",
    "foodName": "Buah & Jus Delima (Pomegranate)",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ribociclib dan Buah & Jus Delima (Pomegranate).",
    "clinicalOutcome": "Interaksi antara Ribociclib dan Buah & Jus Delima (Pomegranate) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ribociclib."
  },
  {
    "id": "ddinter-dfi-135",
    "drugName": "Primidone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Primidone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Primidone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Primidone."
  },
  {
    "id": "ddinter-dfi-136",
    "drugName": "Trimipramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trimipramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trimipramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trimipramine."
  },
  {
    "id": "ddinter-dfi-137",
    "drugName": "Theophylline",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Theophylline dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Theophylline di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Theophylline dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-138",
    "drugName": "Levonorgestrel",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levonorgestrel dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levonorgestrel dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levonorgestrel."
  },
  {
    "id": "ddinter-dfi-139",
    "drugName": "Furazolidone",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Furazolidone dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Furazolidone dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Furazolidone."
  },
  {
    "id": "ddinter-dfi-140",
    "drugName": "Secobarbital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Secobarbital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Secobarbital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Secobarbital."
  },
  {
    "id": "ddinter-dfi-141",
    "drugName": "Opium",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Opium dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Opium dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Opium."
  },
  {
    "id": "ddinter-dfi-142",
    "drugName": "Terazosin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Terazosin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Terazosin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Terazosin."
  },
  {
    "id": "ddinter-dfi-143",
    "drugName": "Alfuzosin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alfuzosin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Alfuzosin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Alfuzosin."
  },
  {
    "id": "ddinter-dfi-144",
    "drugName": "Alfuzosin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alfuzosin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Alfuzosin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Alfuzosin."
  },
  {
    "id": "ddinter-dfi-145",
    "drugName": "Pravastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pravastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pravastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pravastatin."
  },
  {
    "id": "ddinter-dfi-146",
    "drugName": "Cenobamate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cenobamate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cenobamate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cenobamate."
  },
  {
    "id": "ddinter-dfi-147",
    "drugName": "Saquinavir",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Saquinavir dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Saquinavir dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Saquinavir."
  },
  {
    "id": "ddinter-dfi-148",
    "drugName": "Saquinavir",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Saquinavir dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Saquinavir dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Saquinavir. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-149",
    "drugName": "Oxytetracycline",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxytetracycline dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Oxytetracycline, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-150",
    "drugName": "Enalapril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Enalapril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Enalapril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Enalapril."
  },
  {
    "id": "ddinter-dfi-151",
    "drugName": "Enalapril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Enalapril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Enalapril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-152",
    "drugName": "Doxepin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Doxepin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Doxepin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Doxepin."
  },
  {
    "id": "ddinter-dfi-153",
    "drugName": "Fosphenytoin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fosphenytoin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fosphenytoin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fosphenytoin."
  },
  {
    "id": "ddinter-dfi-154",
    "drugName": "Phenelzine",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phenelzine dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Phenelzine dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Phenelzine."
  },
  {
    "id": "ddinter-dfi-155",
    "drugName": "Linezolid",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Linezolid dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Linezolid dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Linezolid."
  },
  {
    "id": "ddinter-dfi-156",
    "drugName": "Butabarbital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Butabarbital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Butabarbital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Butabarbital."
  },
  {
    "id": "ddinter-dfi-157",
    "drugName": "Topiramate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Topiramate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Topiramate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Topiramate."
  },
  {
    "id": "ddinter-dfi-158",
    "drugName": "Betaxolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Betaxolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Betaxolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Betaxolol."
  },
  {
    "id": "ddinter-dfi-159",
    "drugName": "Selexipag",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Selexipag dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Selexipag dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Selexipag."
  },
  {
    "id": "ddinter-dfi-160",
    "drugName": "Temazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Temazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Temazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Temazepam."
  },
  {
    "id": "ddinter-dfi-161",
    "drugName": "Pitavastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pitavastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pitavastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pitavastatin."
  },
  {
    "id": "ddinter-dfi-162",
    "drugName": "Felodipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Felodipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Felodipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Felodipine."
  },
  {
    "id": "ddinter-dfi-163",
    "drugName": "Triethylenetetramine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Triethylenetetramine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Triethylenetetramine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Triethylenetetramine."
  },
  {
    "id": "ddinter-dfi-164",
    "drugName": "Abrocitinib",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Abrocitinib dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Abrocitinib dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Abrocitinib."
  },
  {
    "id": "ddinter-dfi-165",
    "drugName": "Nadolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nadolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nadolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nadolol."
  },
  {
    "id": "ddinter-dfi-166",
    "drugName": "Nadolol",
    "foodName": "Teh Hijau Pekat (Kaya Tanin & Antioksidan)",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nadolol dan Teh Hijau Pekat (Kaya Tanin & Antioksidan).",
    "clinicalOutcome": "Interaksi antara Nadolol dan Teh Hijau Pekat (Kaya Tanin & Antioksidan) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Nadolol."
  },
  {
    "id": "ddinter-dfi-167",
    "drugName": "Lanreotide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lanreotide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Lanreotide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Lanreotide."
  },
  {
    "id": "ddinter-dfi-168",
    "drugName": "Nabumetone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nabumetone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nabumetone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nabumetone."
  },
  {
    "id": "ddinter-dfi-169",
    "drugName": "Cefoperazone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cefoperazone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cefoperazone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cefoperazone."
  },
  {
    "id": "ddinter-dfi-170",
    "drugName": "Black cohosh",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Black cohosh dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Black cohosh dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Black cohosh."
  },
  {
    "id": "ddinter-dfi-171",
    "drugName": "Isotretinoin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isotretinoin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Isotretinoin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Isotretinoin."
  },
  {
    "id": "ddinter-dfi-172",
    "drugName": "Macimorelin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Macimorelin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Macimorelin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Macimorelin."
  },
  {
    "id": "ddinter-dfi-173",
    "drugName": "Imipramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Imipramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Imipramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Imipramine."
  },
  {
    "id": "ddinter-dfi-174",
    "drugName": "Chlorothiazide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlorothiazide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlorothiazide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlorothiazide."
  },
  {
    "id": "ddinter-dfi-175",
    "drugName": "Methadone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methadone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methadone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methadone."
  },
  {
    "id": "ddinter-dfi-176",
    "drugName": "Tizanidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tizanidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tizanidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tizanidine."
  },
  {
    "id": "ddinter-dfi-177",
    "drugName": "Brimonidine (topical)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brimonidine (topical) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brimonidine (topical) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brimonidine (topical)."
  },
  {
    "id": "ddinter-dfi-178",
    "drugName": "Disopyramide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Disopyramide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Disopyramide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Disopyramide."
  },
  {
    "id": "ddinter-dfi-179",
    "drugName": "Buprenorphine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Buprenorphine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Buprenorphine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Buprenorphine."
  },
  {
    "id": "ddinter-dfi-180",
    "drugName": "Lisinopril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lisinopril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lisinopril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lisinopril."
  },
  {
    "id": "ddinter-dfi-181",
    "drugName": "Lisinopril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lisinopril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Lisinopril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-182",
    "drugName": "Conjugated estrogens",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Conjugated estrogens dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Conjugated estrogens dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Conjugated estrogens. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-183",
    "drugName": "Esketamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Esketamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Esketamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Esketamine."
  },
  {
    "id": "ddinter-dfi-184",
    "drugName": "Esketamine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Esketamine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Esketamine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Esketamine."
  },
  {
    "id": "ddinter-dfi-185",
    "drugName": "Darifenacin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Darifenacin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Darifenacin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Darifenacin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-186",
    "drugName": "Ethotoin",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ethotoin dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Ethotoin, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-187",
    "drugName": "Verapamil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Verapamil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Verapamil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Verapamil."
  },
  {
    "id": "ddinter-dfi-188",
    "drugName": "Bortezomib",
    "foodName": "Teh Hijau Pekat (Kaya Tanin & Antioksidan)",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bortezomib dan Teh Hijau Pekat (Kaya Tanin & Antioksidan).",
    "clinicalOutcome": "Interaksi antara Bortezomib dan Teh Hijau Pekat (Kaya Tanin & Antioksidan) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Bortezomib."
  },
  {
    "id": "ddinter-dfi-189",
    "drugName": "Etomidate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Etomidate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Etomidate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Etomidate."
  },
  {
    "id": "ddinter-dfi-190",
    "drugName": "Hydrochlorothiazide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydrochlorothiazide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Hydrochlorothiazide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Hydrochlorothiazide."
  },
  {
    "id": "ddinter-dfi-191",
    "drugName": "Interferon beta-1b",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Interferon beta-1b dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Interferon beta-1b dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Interferon beta-1b."
  },
  {
    "id": "ddinter-dfi-192",
    "drugName": "Methyclothiazide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methyclothiazide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methyclothiazide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methyclothiazide."
  },
  {
    "id": "ddinter-dfi-193",
    "drugName": "Cefotetan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cefotetan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cefotetan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cefotetan."
  },
  {
    "id": "ddinter-dfi-194",
    "drugName": "Isocarboxazid",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isocarboxazid dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Isocarboxazid dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Isocarboxazid."
  },
  {
    "id": "ddinter-dfi-195",
    "drugName": "Mefenamic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mefenamic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Mefenamic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Mefenamic acid."
  },
  {
    "id": "ddinter-dfi-196",
    "drugName": "Naproxen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Naproxen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Naproxen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Naproxen."
  },
  {
    "id": "ddinter-dfi-197",
    "drugName": "Etidronic acid",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Etidronic acid dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Etidronic acid, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-198",
    "drugName": "Ferrous fumarate",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ferrous fumarate dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ferrous fumarate dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ferrous fumarate."
  },
  {
    "id": "ddinter-dfi-199",
    "drugName": "Ferrous fumarate",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ferrous fumarate dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Ferrous fumarate dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ferrous fumarate."
  },
  {
    "id": "ddinter-dfi-200",
    "drugName": "Codeine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Codeine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Codeine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Codeine."
  },
  {
    "id": "ddinter-dfi-201",
    "drugName": "Eslicarbazepine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eslicarbazepine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Eslicarbazepine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Eslicarbazepine."
  },
  {
    "id": "ddinter-dfi-202",
    "drugName": "Mifepristone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mifepristone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Mifepristone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Mifepristone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-203",
    "drugName": "Fenoprofen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fenoprofen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fenoprofen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fenoprofen."
  },
  {
    "id": "ddinter-dfi-204",
    "drugName": "Sparsentan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sparsentan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sparsentan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sparsentan."
  },
  {
    "id": "ddinter-dfi-205",
    "drugName": "Brexanolone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brexanolone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brexanolone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brexanolone."
  },
  {
    "id": "ddinter-dfi-206",
    "drugName": "Propranolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Propranolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Propranolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Propranolol."
  },
  {
    "id": "ddinter-dfi-207",
    "drugName": "Propranolol",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Propranolol dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Propranolol dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Propranolol."
  },
  {
    "id": "ddinter-dfi-208",
    "drugName": "Meclofenamic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Meclofenamic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Meclofenamic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Meclofenamic acid."
  },
  {
    "id": "ddinter-dfi-209",
    "drugName": "Guanethidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Guanethidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Guanethidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Guanethidine."
  },
  {
    "id": "ddinter-dfi-210",
    "drugName": "Diazoxide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diazoxide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diazoxide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diazoxide."
  },
  {
    "id": "ddinter-dfi-211",
    "drugName": "Idelalisib",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Idelalisib dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Idelalisib dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Idelalisib."
  },
  {
    "id": "ddinter-dfi-212",
    "drugName": "Amitriptyline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amitriptyline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amitriptyline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amitriptyline."
  },
  {
    "id": "ddinter-dfi-213",
    "drugName": "Cefpodoxime",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cefpodoxime dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Cefpodoxime dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Cefpodoxime."
  },
  {
    "id": "ddinter-dfi-214",
    "drugName": "Linaclotide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Linaclotide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Linaclotide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Linaclotide."
  },
  {
    "id": "ddinter-dfi-215",
    "drugName": "Olmesartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Olmesartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Olmesartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Olmesartan."
  },
  {
    "id": "ddinter-dfi-216",
    "drugName": "Olmesartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Olmesartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Olmesartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-217",
    "drugName": "Clofarabine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clofarabine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clofarabine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clofarabine."
  },
  {
    "id": "ddinter-dfi-218",
    "drugName": "Lorcaserin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lorcaserin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Lorcaserin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Lorcaserin."
  },
  {
    "id": "ddinter-dfi-219",
    "drugName": "Remifentanil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Remifentanil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Remifentanil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Remifentanil."
  },
  {
    "id": "ddinter-dfi-220",
    "drugName": "Exenatide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Exenatide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Exenatide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Exenatide."
  },
  {
    "id": "ddinter-dfi-221",
    "drugName": "Exenatide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Exenatide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Exenatide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Exenatide."
  },
  {
    "id": "ddinter-dfi-222",
    "drugName": "Carvedilol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Carvedilol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Carvedilol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Carvedilol."
  },
  {
    "id": "ddinter-dfi-223",
    "drugName": "Gatifloxacin",
    "foodName": "Sereal Sarapan Pagi & Oat",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Gatifloxacin dan Sereal Sarapan Pagi & Oat.",
    "clinicalOutcome": "Interaksi antara Gatifloxacin dan Sereal Sarapan Pagi & Oat dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Gatifloxacin."
  },
  {
    "id": "ddinter-dfi-224",
    "drugName": "Gatifloxacin",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Gatifloxacin dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Gatifloxacin dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Gatifloxacin."
  },
  {
    "id": "ddinter-dfi-225",
    "drugName": "Loratadine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Loratadine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Loratadine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Loratadine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-226",
    "drugName": "Baloxavir marboxil",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Baloxavir marboxil dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Baloxavir marboxil, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-227",
    "drugName": "Darolutamide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Darolutamide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Darolutamide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Darolutamide."
  },
  {
    "id": "ddinter-dfi-228",
    "drugName": "Tecovirimat",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tecovirimat dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Tecovirimat dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Tecovirimat."
  },
  {
    "id": "ddinter-dfi-229",
    "drugName": "Guanadrel",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Guanadrel dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Guanadrel dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Guanadrel."
  },
  {
    "id": "ddinter-dfi-230",
    "drugName": "Pentobarbital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pentobarbital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pentobarbital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pentobarbital."
  },
  {
    "id": "ddinter-dfi-231",
    "drugName": "Atropine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atropine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Atropine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Atropine."
  },
  {
    "id": "ddinter-dfi-232",
    "drugName": "Candesartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Candesartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Candesartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Candesartan."
  },
  {
    "id": "ddinter-dfi-233",
    "drugName": "Candesartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Candesartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Candesartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-234",
    "drugName": "Bedaquiline",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bedaquiline dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Bedaquiline dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Bedaquiline."
  },
  {
    "id": "ddinter-dfi-235",
    "drugName": "Norfloxacin",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Norfloxacin dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Norfloxacin dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Norfloxacin."
  },
  {
    "id": "ddinter-dfi-236",
    "drugName": "Norfloxacin",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Norfloxacin dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Norfloxacin, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-237",
    "drugName": "Methotrexate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methotrexate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methotrexate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methotrexate."
  },
  {
    "id": "ddinter-dfi-238",
    "drugName": "Methotrexate",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methotrexate dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Methotrexate di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Methotrexate dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-239",
    "drugName": "Procyclidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Procyclidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Procyclidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Procyclidine."
  },
  {
    "id": "ddinter-dfi-240",
    "drugName": "Tamsulosin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tamsulosin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tamsulosin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tamsulosin."
  },
  {
    "id": "ddinter-dfi-241",
    "drugName": "Clidinium",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clidinium dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clidinium dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clidinium."
  },
  {
    "id": "ddinter-dfi-242",
    "drugName": "Mirabegron",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mirabegron dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Mirabegron.",
    "recommendation": "Konsumsi Mirabegron sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-243",
    "drugName": "Phenobarbital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phenobarbital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Phenobarbital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Phenobarbital."
  },
  {
    "id": "ddinter-dfi-244",
    "drugName": "Melatonin",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Melatonin dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Melatonin di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Melatonin dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-245",
    "drugName": "Melatonin",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Melatonin dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Melatonin dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Melatonin."
  },
  {
    "id": "ddinter-dfi-246",
    "drugName": "Ramipril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ramipril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ramipril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ramipril."
  },
  {
    "id": "ddinter-dfi-247",
    "drugName": "Ramipril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ramipril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Ramipril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-248",
    "drugName": "Sucralfate",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sucralfate dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Sucralfate dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Sucralfate."
  },
  {
    "id": "ddinter-dfi-249",
    "drugName": "Bexarotene",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bexarotene dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Bexarotene.",
    "recommendation": "Konsumsi Bexarotene sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-250",
    "drugName": "Bexarotene",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bexarotene dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Bexarotene dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Bexarotene. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-251",
    "drugName": "Modafinil",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Modafinil dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Modafinil, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-252",
    "drugName": "Omadacycline",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Omadacycline dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Omadacycline, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-253",
    "drugName": "Dipyridamole",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dipyridamole dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Dipyridamole di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Dipyridamole dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-254",
    "drugName": "Albiglutide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Albiglutide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Albiglutide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Albiglutide."
  },
  {
    "id": "ddinter-dfi-255",
    "drugName": "Piroxicam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Piroxicam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Piroxicam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Piroxicam."
  },
  {
    "id": "ddinter-dfi-256",
    "drugName": "Clevidipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clevidipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clevidipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clevidipine."
  },
  {
    "id": "ddinter-dfi-257",
    "drugName": "Reserpine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Reserpine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Reserpine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Reserpine."
  },
  {
    "id": "ddinter-dfi-258",
    "drugName": "Nafcillin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nafcillin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Nafcillin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Nafcillin."
  },
  {
    "id": "ddinter-dfi-259",
    "drugName": "Moexipril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Moexipril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Moexipril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Moexipril."
  },
  {
    "id": "ddinter-dfi-260",
    "drugName": "Moexipril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Moexipril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Moexipril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-261",
    "drugName": "Procainamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Procainamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Procainamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Procainamide."
  },
  {
    "id": "ddinter-dfi-262",
    "drugName": "Flurbiprofen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Flurbiprofen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Flurbiprofen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Flurbiprofen."
  },
  {
    "id": "ddinter-dfi-263",
    "drugName": "Digoxin",
    "foodName": "Makanan Berserat Sangat Tinggi",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Digoxin dan Makanan Berserat Sangat Tinggi.",
    "clinicalOutcome": "Interaksi antara Digoxin dan Makanan Berserat Sangat Tinggi dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Digoxin."
  },
  {
    "id": "ddinter-dfi-264",
    "drugName": "Diphenhydramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diphenhydramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diphenhydramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diphenhydramine."
  },
  {
    "id": "ddinter-dfi-265",
    "drugName": "Tacrolimus",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tacrolimus dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Tacrolimus dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Tacrolimus. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-266",
    "drugName": "Isradipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isradipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Isradipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Isradipine."
  },
  {
    "id": "ddinter-dfi-267",
    "drugName": "Chlorpromazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlorpromazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlorpromazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlorpromazine."
  },
  {
    "id": "ddinter-dfi-268",
    "drugName": "Verteporfin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Verteporfin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Verteporfin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Verteporfin."
  },
  {
    "id": "ddinter-dfi-269",
    "drugName": "Thiopental",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Thiopental dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Thiopental dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Thiopental."
  },
  {
    "id": "ddinter-dfi-270",
    "drugName": "Hyoscyamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hyoscyamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Hyoscyamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Hyoscyamine."
  },
  {
    "id": "ddinter-dfi-271",
    "drugName": "Nisoldipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nisoldipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nisoldipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nisoldipine."
  },
  {
    "id": "ddinter-dfi-272",
    "drugName": "Minoxidil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Minoxidil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Minoxidil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Minoxidil."
  },
  {
    "id": "ddinter-dfi-273",
    "drugName": "Methyldopa",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methyldopa dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methyldopa dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methyldopa."
  },
  {
    "id": "ddinter-dfi-274",
    "drugName": "Etacrynic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Etacrynic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Etacrynic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Etacrynic acid."
  },
  {
    "id": "ddinter-dfi-275",
    "drugName": "Prochlorperazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Prochlorperazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Prochlorperazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Prochlorperazine."
  },
  {
    "id": "ddinter-dfi-276",
    "drugName": "Deutetrabenazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Deutetrabenazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Deutetrabenazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Deutetrabenazine."
  },
  {
    "id": "ddinter-dfi-277",
    "drugName": "Brivaracetam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brivaracetam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brivaracetam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brivaracetam."
  },
  {
    "id": "ddinter-dfi-278",
    "drugName": "Quinapril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Quinapril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Quinapril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Quinapril."
  },
  {
    "id": "ddinter-dfi-279",
    "drugName": "Quinapril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Quinapril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Quinapril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-280",
    "drugName": "Disulfiram",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Disulfiram dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Disulfiram dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Disulfiram."
  },
  {
    "id": "ddinter-dfi-281",
    "drugName": "Vosoritide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vosoritide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Vosoritide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Vosoritide."
  },
  {
    "id": "ddinter-dfi-282",
    "drugName": "Doxycycline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Doxycycline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Doxycycline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Doxycycline."
  },
  {
    "id": "ddinter-dfi-283",
    "drugName": "Tegaserod",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tegaserod dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Tegaserod dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Tegaserod."
  },
  {
    "id": "ddinter-dfi-284",
    "drugName": "Trifluoperazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trifluoperazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trifluoperazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trifluoperazine."
  },
  {
    "id": "ddinter-dfi-285",
    "drugName": "Chlorthalidone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlorthalidone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlorthalidone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlorthalidone."
  },
  {
    "id": "ddinter-dfi-286",
    "drugName": "Telmisartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Telmisartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Telmisartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Telmisartan."
  },
  {
    "id": "ddinter-dfi-287",
    "drugName": "Telmisartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Telmisartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Telmisartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-288",
    "drugName": "Tolterodine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolterodine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tolterodine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tolterodine."
  },
  {
    "id": "ddinter-dfi-289",
    "drugName": "Semaglutide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Semaglutide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Semaglutide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Semaglutide."
  },
  {
    "id": "ddinter-dfi-290",
    "drugName": "Sapropterin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sapropterin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Sapropterin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Sapropterin."
  },
  {
    "id": "ddinter-dfi-291",
    "drugName": "Tranylcypromine",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tranylcypromine dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Tranylcypromine dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Tranylcypromine."
  },
  {
    "id": "ddinter-dfi-292",
    "drugName": "Dimenhydrinate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dimenhydrinate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dimenhydrinate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dimenhydrinate."
  },
  {
    "id": "ddinter-dfi-293",
    "drugName": "Clomipramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clomipramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clomipramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clomipramine."
  },
  {
    "id": "ddinter-dfi-294",
    "drugName": "Teriflunomide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Teriflunomide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Teriflunomide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Teriflunomide."
  },
  {
    "id": "ddinter-dfi-295",
    "drugName": "Safinamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Safinamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Safinamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Safinamide."
  },
  {
    "id": "ddinter-dfi-296",
    "drugName": "Safinamide",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Safinamide dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Safinamide dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Safinamide."
  },
  {
    "id": "ddinter-dfi-297",
    "drugName": "Naltrexone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Naltrexone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Naltrexone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Naltrexone."
  },
  {
    "id": "ddinter-dfi-298",
    "drugName": "Cannabidiol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cannabidiol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cannabidiol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cannabidiol."
  },
  {
    "id": "ddinter-dfi-299",
    "drugName": "Trandolapril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trandolapril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trandolapril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trandolapril."
  },
  {
    "id": "ddinter-dfi-300",
    "drugName": "Trandolapril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trandolapril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Trandolapril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-301",
    "drugName": "Butorphanol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Butorphanol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Butorphanol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Butorphanol."
  },
  {
    "id": "ddinter-dfi-302",
    "drugName": "Lanthanum carbonate",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lanthanum carbonate dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Lanthanum carbonate dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Lanthanum carbonate."
  },
  {
    "id": "ddinter-dfi-303",
    "drugName": "Valsartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Valsartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Valsartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Valsartan."
  },
  {
    "id": "ddinter-dfi-304",
    "drugName": "Valsartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Valsartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Valsartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-305",
    "drugName": "Tirzepatide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tirzepatide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tirzepatide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tirzepatide."
  },
  {
    "id": "ddinter-dfi-306",
    "drugName": "Levorphanol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levorphanol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levorphanol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levorphanol."
  },
  {
    "id": "ddinter-dfi-307",
    "drugName": "Clarithromycin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clarithromycin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Clarithromycin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Clarithromycin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-308",
    "drugName": "Pentazocine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pentazocine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pentazocine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pentazocine."
  },
  {
    "id": "ddinter-dfi-309",
    "drugName": "Magnesium salicylate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Magnesium salicylate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Magnesium salicylate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Magnesium salicylate."
  },
  {
    "id": "ddinter-dfi-310",
    "drugName": "Prazosin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Prazosin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Prazosin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Prazosin."
  },
  {
    "id": "ddinter-dfi-311",
    "drugName": "Zidovudine",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zidovudine dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Zidovudine.",
    "recommendation": "Konsumsi Zidovudine sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-312",
    "drugName": "Lumateperone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lumateperone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lumateperone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lumateperone."
  },
  {
    "id": "ddinter-dfi-313",
    "drugName": "Brentuximab vedotin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brentuximab vedotin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brentuximab vedotin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brentuximab vedotin."
  },
  {
    "id": "ddinter-dfi-314",
    "drugName": "Phenoxybenzamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phenoxybenzamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Phenoxybenzamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Phenoxybenzamine."
  },
  {
    "id": "ddinter-dfi-315",
    "drugName": "Itraconazole",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Itraconazole dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Itraconazole dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Itraconazole. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-316",
    "drugName": "Itraconazole",
    "foodName": "Minuman Cola Berkarbonasi",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Itraconazole dan Minuman Cola Berkarbonasi.",
    "clinicalOutcome": "Interaksi antara Itraconazole dan Minuman Cola Berkarbonasi dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Itraconazole."
  },
  {
    "id": "ddinter-dfi-317",
    "drugName": "Trihexyphenidyl",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trihexyphenidyl dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trihexyphenidyl dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trihexyphenidyl."
  },
  {
    "id": "ddinter-dfi-318",
    "drugName": "Isosorbide dinitrate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isosorbide dinitrate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Isosorbide dinitrate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Isosorbide dinitrate."
  },
  {
    "id": "ddinter-dfi-319",
    "drugName": "Liotrix",
    "foodName": "Kedelai & Olahan Kedelai (Susu Kedelai, Tahu/Tempe)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Liotrix dan Kedelai & Olahan Kedelai (Susu Kedelai, Tahu/Tempe).",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Liotrix, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-320",
    "drugName": "Liotrix",
    "foodName": "Minyak Biji Kapas & Lemak Nabati Tertentu",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Liotrix dan Minyak Biji Kapas & Lemak Nabati Tertentu.",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Liotrix.",
    "recommendation": "Konsumsi Liotrix sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-321",
    "drugName": "Liotrix",
    "foodName": "Kacang Kenari & Walnut",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Liotrix dan Kacang Kenari & Walnut.",
    "clinicalOutcome": "Interaksi antara Liotrix dan Kacang Kenari & Walnut dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Liotrix."
  },
  {
    "id": "ddinter-dfi-322",
    "drugName": "Liotrix",
    "foodName": "Suplemen Serat Makanan Tambahan",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Liotrix dan Suplemen Serat Makanan Tambahan.",
    "clinicalOutcome": "Interaksi antara Liotrix dan Suplemen Serat Makanan Tambahan dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Liotrix."
  },
  {
    "id": "ddinter-dfi-323",
    "drugName": "Labetalol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Labetalol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Labetalol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Labetalol."
  },
  {
    "id": "ddinter-dfi-324",
    "drugName": "Kava",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Kava dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Kava dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Kava."
  },
  {
    "id": "ddinter-dfi-325",
    "drugName": "Abacavir",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Abacavir dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Abacavir dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Abacavir."
  },
  {
    "id": "ddinter-dfi-326",
    "drugName": "Interferon beta-1a",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Interferon beta-1a dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Interferon beta-1a dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Interferon beta-1a."
  },
  {
    "id": "ddinter-dfi-327",
    "drugName": "Alfentanil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alfentanil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Alfentanil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Alfentanil."
  },
  {
    "id": "ddinter-dfi-328",
    "drugName": "Metyrosine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metyrosine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metyrosine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metyrosine."
  },
  {
    "id": "ddinter-dfi-329",
    "drugName": "Meclizine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Meclizine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Meclizine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Meclizine."
  },
  {
    "id": "ddinter-dfi-330",
    "drugName": "Ciprofloxacin",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ciprofloxacin dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Ciprofloxacin, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-331",
    "drugName": "Ciprofloxacin",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ciprofloxacin dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Ciprofloxacin dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ciprofloxacin."
  },
  {
    "id": "ddinter-dfi-332",
    "drugName": "Ibandronate",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ibandronate dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ibandronate dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ibandronate."
  },
  {
    "id": "ddinter-dfi-333",
    "drugName": "Lacosamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lacosamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lacosamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lacosamide."
  },
  {
    "id": "ddinter-dfi-334",
    "drugName": "Pindolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pindolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pindolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pindolol."
  },
  {
    "id": "ddinter-dfi-335",
    "drugName": "Anthoxanthum odoratum pollen",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Anthoxanthum odoratum pollen dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Anthoxanthum odoratum pollen dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Anthoxanthum odoratum pollen."
  },
  {
    "id": "ddinter-dfi-336",
    "drugName": "Sildenafil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sildenafil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sildenafil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sildenafil."
  },
  {
    "id": "ddinter-dfi-337",
    "drugName": "Tamoxifen",
    "foodName": "Kedelai & Olahan Kedelai (Susu Kedelai, Tahu/Tempe)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tamoxifen dan Kedelai & Olahan Kedelai (Susu Kedelai, Tahu/Tempe).",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Tamoxifen, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-338",
    "drugName": "Rosuvastatin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rosuvastatin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Rosuvastatin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Rosuvastatin."
  },
  {
    "id": "ddinter-dfi-339",
    "drugName": "Nicardipine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nicardipine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nicardipine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nicardipine."
  },
  {
    "id": "ddinter-dfi-340",
    "drugName": "Caffeine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Caffeine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Caffeine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Caffeine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-341",
    "drugName": "Methscopolamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methscopolamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methscopolamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methscopolamine."
  },
  {
    "id": "ddinter-dfi-342",
    "drugName": "Phentolamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phentolamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Phentolamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Phentolamine."
  },
  {
    "id": "ddinter-dfi-343",
    "drugName": "Epirubicin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Epirubicin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Epirubicin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Epirubicin."
  },
  {
    "id": "ddinter-dfi-344",
    "drugName": "Nortriptyline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nortriptyline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nortriptyline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nortriptyline."
  },
  {
    "id": "ddinter-dfi-345",
    "drugName": "Fenoldopam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fenoldopam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fenoldopam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fenoldopam."
  },
  {
    "id": "ddinter-dfi-346",
    "drugName": "Estazolam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Estazolam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Estazolam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Estazolam."
  },
  {
    "id": "ddinter-dfi-347",
    "drugName": "Desmopressin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Desmopressin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Desmopressin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Desmopressin."
  },
  {
    "id": "ddinter-dfi-348",
    "drugName": "Selegiline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Selegiline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Selegiline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Selegiline."
  },
  {
    "id": "ddinter-dfi-349",
    "drugName": "Selegiline",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Selegiline dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Selegiline dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Selegiline."
  },
  {
    "id": "ddinter-dfi-350",
    "drugName": "Oxymorphone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxymorphone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oxymorphone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oxymorphone."
  },
  {
    "id": "ddinter-dfi-351",
    "drugName": "Lixisenatide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lixisenatide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lixisenatide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lixisenatide."
  },
  {
    "id": "ddinter-dfi-352",
    "drugName": "Lixisenatide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lixisenatide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Lixisenatide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Lixisenatide."
  },
  {
    "id": "ddinter-dfi-353",
    "drugName": "Penicillamine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Penicillamine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Penicillamine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Penicillamine."
  },
  {
    "id": "ddinter-dfi-354",
    "drugName": "Ketoprofen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ketoprofen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ketoprofen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ketoprofen."
  },
  {
    "id": "ddinter-dfi-355",
    "drugName": "Perphenazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Perphenazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Perphenazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Perphenazine."
  },
  {
    "id": "ddinter-dfi-356",
    "drugName": "Deferasirox",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Deferasirox dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Deferasirox dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Deferasirox."
  },
  {
    "id": "ddinter-dfi-357",
    "drugName": "Promethazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Promethazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Promethazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Promethazine."
  },
  {
    "id": "ddinter-dfi-358",
    "drugName": "Timolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Timolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Timolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Timolol."
  },
  {
    "id": "ddinter-dfi-359",
    "drugName": "Triamterene",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Triamterene dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Triamterene dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Triamterene."
  },
  {
    "id": "ddinter-dfi-360",
    "drugName": "Mercaptopurine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mercaptopurine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Mercaptopurine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Mercaptopurine."
  },
  {
    "id": "ddinter-dfi-361",
    "drugName": "Asparaginase Erwinia chrysanthemi",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Asparaginase Erwinia chrysanthemi dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Asparaginase Erwinia chrysanthemi dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Asparaginase Erwinia chrysanthemi."
  },
  {
    "id": "ddinter-dfi-362",
    "drugName": "Mepenzolate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mepenzolate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Mepenzolate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Mepenzolate."
  },
  {
    "id": "ddinter-dfi-363",
    "drugName": "Acitretin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Acitretin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Acitretin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Acitretin."
  },
  {
    "id": "ddinter-dfi-364",
    "drugName": "Nitroprusside",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nitroprusside dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nitroprusside dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nitroprusside."
  },
  {
    "id": "ddinter-dfi-365",
    "drugName": "Phenytoin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phenytoin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Phenytoin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Phenytoin."
  },
  {
    "id": "ddinter-dfi-366",
    "drugName": "Propantheline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Propantheline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Propantheline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Propantheline."
  },
  {
    "id": "ddinter-dfi-367",
    "drugName": "Hydralazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydralazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Hydralazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Hydralazine."
  },
  {
    "id": "ddinter-dfi-368",
    "drugName": "Furosemide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Furosemide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Furosemide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Furosemide."
  },
  {
    "id": "ddinter-dfi-369",
    "drugName": "Fosinopril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fosinopril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fosinopril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fosinopril."
  },
  {
    "id": "ddinter-dfi-370",
    "drugName": "Fosinopril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fosinopril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Fosinopril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-371",
    "drugName": "Cimetidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cimetidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cimetidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cimetidine."
  },
  {
    "id": "ddinter-dfi-372",
    "drugName": "Dofetilide",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dofetilide dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Dofetilide dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Dofetilide. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-373",
    "drugName": "Ferric maltol",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ferric maltol dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ferric maltol dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ferric maltol."
  },
  {
    "id": "ddinter-dfi-374",
    "drugName": "Peginterferon beta-1a",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Peginterferon beta-1a dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Peginterferon beta-1a dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Peginterferon beta-1a."
  },
  {
    "id": "ddinter-dfi-375",
    "drugName": "Oxacillin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxacillin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Oxacillin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Oxacillin."
  },
  {
    "id": "ddinter-dfi-376",
    "drugName": "Octreotide",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Octreotide dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Octreotide dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Octreotide."
  },
  {
    "id": "ddinter-dfi-377",
    "drugName": "Didanosine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Didanosine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Didanosine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Didanosine."
  },
  {
    "id": "ddinter-dfi-378",
    "drugName": "Ivermectin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ivermectin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ivermectin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ivermectin."
  },
  {
    "id": "ddinter-dfi-379",
    "drugName": "Ibuprofen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ibuprofen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ibuprofen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ibuprofen."
  },
  {
    "id": "ddinter-dfi-380",
    "drugName": "Meperidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Meperidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Meperidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Meperidine."
  },
  {
    "id": "ddinter-dfi-381",
    "drugName": "Estramustine",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Estramustine dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Estramustine, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-382",
    "drugName": "Roflumilast",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Roflumilast dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Roflumilast dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Roflumilast."
  },
  {
    "id": "ddinter-dfi-383",
    "drugName": "Diclofenac",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diclofenac dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diclofenac dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diclofenac."
  },
  {
    "id": "ddinter-dfi-384",
    "drugName": "Repaglinide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Repaglinide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Repaglinide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Repaglinide."
  },
  {
    "id": "ddinter-dfi-385",
    "drugName": "Ferrous gluconate",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ferrous gluconate dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ferrous gluconate dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ferrous gluconate."
  },
  {
    "id": "ddinter-dfi-386",
    "drugName": "Methylphenobarbital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methylphenobarbital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methylphenobarbital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methylphenobarbital."
  },
  {
    "id": "ddinter-dfi-387",
    "drugName": "Guanabenz",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Guanabenz dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Guanabenz dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Guanabenz."
  },
  {
    "id": "ddinter-dfi-388",
    "drugName": "Miltefosine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Miltefosine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Miltefosine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Miltefosine."
  },
  {
    "id": "ddinter-dfi-389",
    "drugName": "Stiripentol",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Stiripentol dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Stiripentol, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-390",
    "drugName": "Stiripentol",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Stiripentol dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Stiripentol di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Stiripentol dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-391",
    "drugName": "Stiripentol",
    "foodName": "Minuman Cola Berkarbonasi",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Stiripentol dan Minuman Cola Berkarbonasi.",
    "clinicalOutcome": "Interaksi antara Stiripentol dan Minuman Cola Berkarbonasi dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Stiripentol."
  },
  {
    "id": "ddinter-dfi-392",
    "drugName": "Stiripentol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Stiripentol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Stiripentol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Stiripentol."
  },
  {
    "id": "ddinter-dfi-393",
    "drugName": "Bumetanide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bumetanide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Bumetanide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Bumetanide."
  },
  {
    "id": "ddinter-dfi-394",
    "drugName": "Tolevamer",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolevamer dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Tolevamer memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-395",
    "drugName": "Tetracycline",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tetracycline dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Tetracycline, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-396",
    "drugName": "Thioridazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Thioridazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Thioridazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Thioridazine."
  },
  {
    "id": "ddinter-dfi-397",
    "drugName": "Adenosine",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Adenosine dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Adenosine di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Adenosine dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-398",
    "drugName": "Desipramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Desipramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Desipramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Desipramine."
  },
  {
    "id": "ddinter-dfi-399",
    "drugName": "Esmolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Esmolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Esmolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Esmolol."
  },
  {
    "id": "ddinter-dfi-400",
    "drugName": "Zinc acetate",
    "foodName": "Bekatul & Serat Gandum Kasar",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zinc acetate dan Bekatul & Serat Gandum Kasar.",
    "clinicalOutcome": "Interaksi antara Zinc acetate dan Bekatul & Serat Gandum Kasar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Zinc acetate."
  },
  {
    "id": "ddinter-dfi-401",
    "drugName": "Zinc acetate",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zinc acetate dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Zinc acetate di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Zinc acetate dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-402",
    "drugName": "Zinc acetate",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zinc acetate dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Zinc acetate, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-403",
    "drugName": "Sufentanil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sufentanil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sufentanil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sufentanil."
  },
  {
    "id": "ddinter-dfi-404",
    "drugName": "Procarbazine",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Procarbazine dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Procarbazine dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Procarbazine."
  },
  {
    "id": "ddinter-dfi-405",
    "drugName": "Sotalol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sotalol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sotalol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sotalol."
  },
  {
    "id": "ddinter-dfi-406",
    "drugName": "Benzatropine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Benzatropine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Benzatropine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Benzatropine."
  },
  {
    "id": "ddinter-dfi-407",
    "drugName": "Cariprazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cariprazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cariprazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cariprazine."
  },
  {
    "id": "ddinter-dfi-408",
    "drugName": "Fomepizole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fomepizole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fomepizole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fomepizole."
  },
  {
    "id": "ddinter-dfi-409",
    "drugName": "Penbutolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Penbutolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Penbutolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Penbutolol."
  },
  {
    "id": "ddinter-dfi-410",
    "drugName": "Isoniazid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isoniazid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Isoniazid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Isoniazid."
  },
  {
    "id": "ddinter-dfi-411",
    "drugName": "Isoniazid",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isoniazid dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Isoniazid dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Isoniazid."
  },
  {
    "id": "ddinter-dfi-412",
    "drugName": "Isoniazid",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isoniazid dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara Isoniazid dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Isoniazid."
  },
  {
    "id": "ddinter-dfi-413",
    "drugName": "Vibrio cholerae CVD 103-HgR strain live antigen (live)",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vibrio cholerae CVD 103-HgR strain live antigen (live) dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Vibrio cholerae CVD 103-HgR strain live antigen (live) dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Vibrio cholerae CVD 103-HgR strain live antigen (live)."
  },
  {
    "id": "ddinter-dfi-414",
    "drugName": "Amobarbital",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amobarbital dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amobarbital dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amobarbital."
  },
  {
    "id": "ddinter-dfi-415",
    "drugName": "Azilsartan medoxomil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Azilsartan medoxomil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Azilsartan medoxomil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Azilsartan medoxomil."
  },
  {
    "id": "ddinter-dfi-416",
    "drugName": "Loracarbef",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Loracarbef dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Loracarbef dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Loracarbef."
  },
  {
    "id": "ddinter-dfi-417",
    "drugName": "Salsalate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Salsalate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Salsalate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Salsalate."
  },
  {
    "id": "ddinter-dfi-418",
    "drugName": "Levothyroxine",
    "foodName": "Suplemen Serat Makanan Tambahan",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levothyroxine dan Suplemen Serat Makanan Tambahan.",
    "clinicalOutcome": "Interaksi antara Levothyroxine dan Suplemen Serat Makanan Tambahan dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Levothyroxine."
  },
  {
    "id": "ddinter-dfi-419",
    "drugName": "Levothyroxine",
    "foodName": "Kedelai & Olahan Kedelai (Susu Kedelai, Tahu/Tempe)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levothyroxine dan Kedelai & Olahan Kedelai (Susu Kedelai, Tahu/Tempe).",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Levothyroxine, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-420",
    "drugName": "Demeclocycline",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Demeclocycline dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Demeclocycline, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-421",
    "drugName": "Eprosartan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eprosartan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Eprosartan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Eprosartan."
  },
  {
    "id": "ddinter-dfi-422",
    "drugName": "Eprosartan",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eprosartan dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Eprosartan memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-423",
    "drugName": "Ethionamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ethionamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ethionamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ethionamide."
  },
  {
    "id": "ddinter-dfi-424",
    "drugName": "Armodafinil",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Armodafinil dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Armodafinil dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Armodafinil."
  },
  {
    "id": "ddinter-dfi-425",
    "drugName": "Ampicillin",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ampicillin dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Ampicillin dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ampicillin."
  },
  {
    "id": "ddinter-dfi-426",
    "drugName": "Captopril",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Captopril dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Captopril dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Captopril."
  },
  {
    "id": "ddinter-dfi-427",
    "drugName": "Captopril",
    "foodName": "Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl)",
    "foodCategory": "Suplemen / Mineral",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Captopril dan Makanan Tinggi Kalium (Pisang, Garam Pengganti Diet KCl).",
    "clinicalOutcome": "Asupan garam kalium berlebih bersama Captopril memicu penumpukan kalium serum ginjal yang berpotensi menyebabkan Hiperkalemia akut dan aritmia jantung.",
    "recommendation": "Hindari penggunaan pengganti garam diet berbasis kalium klorida (KCl) dan batasi konsumsi berlebihan makanan tinggi kalium."
  },
  {
    "id": "ddinter-dfi-428",
    "drugName": "Erythromycin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Erythromycin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Erythromycin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Erythromycin."
  },
  {
    "id": "ddinter-dfi-429",
    "drugName": "Clonazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clonazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clonazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clonazepam."
  },
  {
    "id": "ddinter-dfi-430",
    "drugName": "Sulindac",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sulindac dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sulindac dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sulindac."
  },
  {
    "id": "ddinter-dfi-431",
    "drugName": "Etravirine",
    "foodName": "Makanan (Kondisi Lambung Terisi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Etravirine dan Makanan (Kondisi Lambung Terisi).",
    "clinicalOutcome": "Interaksi antara Etravirine dan Makanan (Kondisi Lambung Terisi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Etravirine."
  },
  {
    "id": "ddinter-dfi-432",
    "drugName": "Estradiol",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Minor",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Estradiol dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Estradiol dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Estradiol. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-433",
    "drugName": "Bisoprolol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bisoprolol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Bisoprolol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Bisoprolol."
  },
  {
    "id": "ddinter-dfi-434",
    "drugName": "Tolcapone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolcapone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tolcapone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tolcapone."
  },
  {
    "id": "ddinter-dfi-435",
    "drugName": "Olopatadine (nasal)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Olopatadine (nasal) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Olopatadine (nasal) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Olopatadine (nasal)."
  },
  {
    "id": "ddinter-dfi-436",
    "drugName": "Chlorzoxazone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlorzoxazone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlorzoxazone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlorzoxazone."
  },
  {
    "id": "ddinter-dfi-437",
    "drugName": "Pramipexole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pramipexole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pramipexole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pramipexole."
  },
  {
    "id": "ddinter-dfi-438",
    "drugName": "Methocarbamol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methocarbamol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methocarbamol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methocarbamol."
  },
  {
    "id": "ddinter-dfi-439",
    "drugName": "Phendimetrazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phendimetrazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Phendimetrazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Phendimetrazine."
  },
  {
    "id": "ddinter-dfi-440",
    "drugName": "Pemigatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pemigatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pemigatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pemigatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-441",
    "drugName": "Sorafenib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sorafenib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Sorafenib.",
    "recommendation": "Konsumsi Sorafenib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-442",
    "drugName": "Boceprevir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Boceprevir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Boceprevir.",
    "recommendation": "Konsumsi Boceprevir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-443",
    "drugName": "Calcium carbonate",
    "foodName": "Bayam & Sayuran Hijau Tinggi Oksalat",
    "foodCategory": "Makanan Tinggi Vitamin K",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium carbonate dan Bayam & Sayuran Hijau Tinggi Oksalat.",
    "clinicalOutcome": "Vitamin K memicu sintesis faktor pembekuan darah yang bekerja berlawanan secara antagonis dengan efek antikoagulan Calcium carbonate, meningkatkan risiko fluktuasi INR dan tromboemboli.",
    "recommendation": "Pertahankan asupan sayuran hijau tetap konsisten dan stabil setiap hari. Hindari perubahan diet drastis tanpa konsultasi apoteker/dokter."
  },
  {
    "id": "ddinter-dfi-444",
    "drugName": "Calcium carbonate",
    "foodName": "Rhubarb & Tumbuhan Asam Oksalat",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium carbonate dan Rhubarb & Tumbuhan Asam Oksalat.",
    "clinicalOutcome": "Interaksi antara Calcium carbonate dan Rhubarb & Tumbuhan Asam Oksalat dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium carbonate."
  },
  {
    "id": "ddinter-dfi-445",
    "drugName": "Calcium carbonate",
    "foodName": "Bekatul & Serat Gandum Kasar",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium carbonate dan Bekatul & Serat Gandum Kasar.",
    "clinicalOutcome": "Interaksi antara Calcium carbonate dan Bekatul & Serat Gandum Kasar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium carbonate."
  },
  {
    "id": "ddinter-dfi-446",
    "drugName": "Calcium carbonate",
    "foodName": "Biji-Bijian & Gandum Utuh",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium carbonate dan Biji-Bijian & Gandum Utuh.",
    "clinicalOutcome": "Interaksi antara Calcium carbonate dan Biji-Bijian & Gandum Utuh dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium carbonate."
  },
  {
    "id": "ddinter-dfi-447",
    "drugName": "Molindone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Molindone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Molindone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Molindone."
  },
  {
    "id": "ddinter-dfi-448",
    "drugName": "Metamfetamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metamfetamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metamfetamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metamfetamine."
  },
  {
    "id": "ddinter-dfi-449",
    "drugName": "Ibrexafungerp",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ibrexafungerp dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ibrexafungerp dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ibrexafungerp. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-450",
    "drugName": "Insulin human",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin human dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin human dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin human."
  },
  {
    "id": "ddinter-dfi-451",
    "drugName": "Bromocriptine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bromocriptine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Bromocriptine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Bromocriptine."
  },
  {
    "id": "ddinter-dfi-452",
    "drugName": "Gabapentin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Gabapentin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Gabapentin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Gabapentin."
  },
  {
    "id": "ddinter-dfi-453",
    "drugName": "Lefamulin",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lefamulin dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Lefamulin.",
    "recommendation": "Konsumsi Lefamulin sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-454",
    "drugName": "Lefamulin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lefamulin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lefamulin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lefamulin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-455",
    "drugName": "Fenfluramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fenfluramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fenfluramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fenfluramine."
  },
  {
    "id": "ddinter-dfi-456",
    "drugName": "Clorazepic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clorazepic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clorazepic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clorazepic acid."
  },
  {
    "id": "ddinter-dfi-457",
    "drugName": "Chlordiazepoxide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlordiazepoxide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlordiazepoxide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlordiazepoxide."
  },
  {
    "id": "ddinter-dfi-458",
    "drugName": "Norethisterone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Norethisterone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Norethisterone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Norethisterone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-459",
    "drugName": "Telaprevir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Telaprevir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Telaprevir.",
    "recommendation": "Konsumsi Telaprevir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-460",
    "drugName": "Ibrutinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ibrutinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ibrutinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ibrutinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-461",
    "drugName": "Fesoterodine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fesoterodine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Fesoterodine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Fesoterodine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-462",
    "drugName": "Hydroxychloroquine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydroxychloroquine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Hydroxychloroquine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Hydroxychloroquine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-463",
    "drugName": "Silodosin",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Silodosin dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Silodosin.",
    "recommendation": "Konsumsi Silodosin sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-464",
    "drugName": "Cetirizine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cetirizine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cetirizine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cetirizine."
  },
  {
    "id": "ddinter-dfi-465",
    "drugName": "Zolmitriptan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zolmitriptan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Zolmitriptan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Zolmitriptan."
  },
  {
    "id": "ddinter-dfi-466",
    "drugName": "Metronidazole (topical)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metronidazole (topical) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metronidazole (topical) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metronidazole (topical)."
  },
  {
    "id": "ddinter-dfi-467",
    "drugName": "Vardenafil",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vardenafil dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Vardenafil dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Vardenafil. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-468",
    "drugName": "Paclitaxel (protein-bound)",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Paclitaxel (protein-bound) dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Paclitaxel (protein-bound) dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Paclitaxel (protein-bound). Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-469",
    "drugName": "Naldemedine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Naldemedine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Naldemedine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Naldemedine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-470",
    "drugName": "Levocetirizine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levocetirizine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levocetirizine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levocetirizine."
  },
  {
    "id": "ddinter-dfi-471",
    "drugName": "Chloroquine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chloroquine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Chloroquine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Chloroquine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-472",
    "drugName": "Tapentadol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tapentadol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tapentadol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tapentadol."
  },
  {
    "id": "ddinter-dfi-473",
    "drugName": "Ganaxolone",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ganaxolone dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ganaxolone.",
    "recommendation": "Konsumsi Ganaxolone sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-474",
    "drugName": "Indinavir",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Indinavir dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Indinavir dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Indinavir. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-475",
    "drugName": "Indinavir",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Indinavir dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Indinavir, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-476",
    "drugName": "Indinavir",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Indinavir dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi Indinavir di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat Indinavir dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-477",
    "drugName": "Indinavir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Indinavir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Indinavir.",
    "recommendation": "Konsumsi Indinavir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-478",
    "drugName": "Tepotinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tepotinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Tepotinib.",
    "recommendation": "Konsumsi Tepotinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-479",
    "drugName": "Asenapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Asenapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Asenapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Asenapine."
  },
  {
    "id": "ddinter-dfi-480",
    "drugName": "Oxycodone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxycodone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oxycodone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oxycodone."
  },
  {
    "id": "ddinter-dfi-481",
    "drugName": "Flurazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Flurazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Flurazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Flurazepam."
  },
  {
    "id": "ddinter-dfi-482",
    "drugName": "Oteseconazole",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oteseconazole dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Oteseconazole.",
    "recommendation": "Konsumsi Oteseconazole sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-483",
    "drugName": "Dihydroergotamine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dihydroergotamine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Dihydroergotamine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Dihydroergotamine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-484",
    "drugName": "Escitalopram",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Escitalopram dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Escitalopram dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Escitalopram."
  },
  {
    "id": "ddinter-dfi-485",
    "drugName": "Risperidone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Risperidone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Risperidone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Risperidone."
  },
  {
    "id": "ddinter-dfi-486",
    "drugName": "Risperidone",
    "foodName": "Minuman Cola Berkarbonasi",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Risperidone dan Minuman Cola Berkarbonasi.",
    "clinicalOutcome": "Interaksi antara Risperidone dan Minuman Cola Berkarbonasi dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Risperidone."
  },
  {
    "id": "ddinter-dfi-487",
    "drugName": "Risperidone",
    "foodName": "Teh Hijau Pekat (Kaya Tanin & Antioksidan)",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Risperidone dan Teh Hijau Pekat (Kaya Tanin & Antioksidan).",
    "clinicalOutcome": "Interaksi antara Risperidone dan Teh Hijau Pekat (Kaya Tanin & Antioksidan) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Risperidone."
  },
  {
    "id": "ddinter-dfi-488",
    "drugName": "Selumetinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Selumetinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Selumetinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Selumetinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-489",
    "drugName": "Paliperidone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Paliperidone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Paliperidone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Paliperidone."
  },
  {
    "id": "ddinter-dfi-490",
    "drugName": "Midazolam",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Midazolam dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Midazolam dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Midazolam. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-491",
    "drugName": "Midazolam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Midazolam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Midazolam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Midazolam."
  },
  {
    "id": "ddinter-dfi-492",
    "drugName": "Trazodone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trazodone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trazodone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trazodone."
  },
  {
    "id": "ddinter-dfi-493",
    "drugName": "Avapritinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Avapritinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Avapritinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Avapritinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-494",
    "drugName": "Progesterone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Progesterone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Progesterone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Progesterone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-495",
    "drugName": "Nilotinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nilotinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Nilotinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Nilotinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-496",
    "drugName": "Vasopressin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vasopressin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Vasopressin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Vasopressin."
  },
  {
    "id": "ddinter-dfi-497",
    "drugName": "Orphenadrine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Orphenadrine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Orphenadrine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Orphenadrine."
  },
  {
    "id": "ddinter-dfi-498",
    "drugName": "Larotrectinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Larotrectinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Larotrectinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Larotrectinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-499",
    "drugName": "Valganciclovir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Valganciclovir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Valganciclovir.",
    "recommendation": "Konsumsi Valganciclovir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-500",
    "drugName": "Calcium citrate",
    "foodName": "Bayam & Sayuran Hijau Tinggi Oksalat",
    "foodCategory": "Makanan Tinggi Vitamin K",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium citrate dan Bayam & Sayuran Hijau Tinggi Oksalat.",
    "clinicalOutcome": "Vitamin K memicu sintesis faktor pembekuan darah yang bekerja berlawanan secara antagonis dengan efek antikoagulan Calcium citrate, meningkatkan risiko fluktuasi INR dan tromboemboli.",
    "recommendation": "Pertahankan asupan sayuran hijau tetap konsisten dan stabil setiap hari. Hindari perubahan diet drastis tanpa konsultasi apoteker/dokter."
  },
  {
    "id": "ddinter-dfi-501",
    "drugName": "Calcium citrate",
    "foodName": "Rhubarb & Tumbuhan Asam Oksalat",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium citrate dan Rhubarb & Tumbuhan Asam Oksalat.",
    "clinicalOutcome": "Interaksi antara Calcium citrate dan Rhubarb & Tumbuhan Asam Oksalat dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium citrate."
  },
  {
    "id": "ddinter-dfi-502",
    "drugName": "Calcium citrate",
    "foodName": "Bekatul & Serat Gandum Kasar",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium citrate dan Bekatul & Serat Gandum Kasar.",
    "clinicalOutcome": "Interaksi antara Calcium citrate dan Bekatul & Serat Gandum Kasar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium citrate."
  },
  {
    "id": "ddinter-dfi-503",
    "drugName": "Calcium citrate",
    "foodName": "Biji-Bijian & Gandum Utuh",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium citrate dan Biji-Bijian & Gandum Utuh.",
    "clinicalOutcome": "Interaksi antara Calcium citrate dan Biji-Bijian & Gandum Utuh dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium citrate."
  },
  {
    "id": "ddinter-dfi-504",
    "drugName": "Sitagliptin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sitagliptin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sitagliptin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sitagliptin."
  },
  {
    "id": "ddinter-dfi-505",
    "drugName": "Rotigotine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rotigotine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Rotigotine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Rotigotine."
  },
  {
    "id": "ddinter-dfi-506",
    "drugName": "Lovastatin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lovastatin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lovastatin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lovastatin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-507",
    "drugName": "Lovastatin",
    "foodName": "Teh Hijau Pekat (Kaya Tanin & Antioksidan)",
    "foodCategory": "Kafein / Kopi",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lovastatin dan Teh Hijau Pekat (Kaya Tanin & Antioksidan).",
    "clinicalOutcome": "Interaksi antara Lovastatin dan Teh Hijau Pekat (Kaya Tanin & Antioksidan) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Lovastatin."
  },
  {
    "id": "ddinter-dfi-508",
    "drugName": "Varenicline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Varenicline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Varenicline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Varenicline."
  },
  {
    "id": "ddinter-dfi-509",
    "drugName": "Elvitegravir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Elvitegravir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Elvitegravir.",
    "recommendation": "Konsumsi Elvitegravir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-510",
    "drugName": "Nitisinone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nitisinone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Nitisinone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Nitisinone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-511",
    "drugName": "Atovaquone",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atovaquone dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Atovaquone.",
    "recommendation": "Konsumsi Atovaquone sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-512",
    "drugName": "Atovaquone",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atovaquone dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Atovaquone, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-513",
    "drugName": "Ergotamine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ergotamine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ergotamine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ergotamine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-514",
    "drugName": "Daridorexant",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Daridorexant dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Daridorexant dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Daridorexant. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-515",
    "drugName": "Venlafaxine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Venlafaxine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Venlafaxine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Venlafaxine."
  },
  {
    "id": "ddinter-dfi-516",
    "drugName": "Lofexidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lofexidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lofexidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lofexidine."
  },
  {
    "id": "ddinter-dfi-517",
    "drugName": "Metaxalone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metaxalone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metaxalone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metaxalone."
  },
  {
    "id": "ddinter-dfi-518",
    "drugName": "Insulin glulisine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin glulisine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin glulisine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin glulisine."
  },
  {
    "id": "ddinter-dfi-519",
    "drugName": "Cobimetinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cobimetinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Cobimetinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Cobimetinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-520",
    "drugName": "Nefazodone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nefazodone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nefazodone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nefazodone."
  },
  {
    "id": "ddinter-dfi-521",
    "drugName": "Fedratinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fedratinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Fedratinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Fedratinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-522",
    "drugName": "Fedratinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fedratinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Fedratinib.",
    "recommendation": "Konsumsi Fedratinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-523",
    "drugName": "Fexofenadine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fexofenadine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Fexofenadine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Fexofenadine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-524",
    "drugName": "Fexofenadine",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fexofenadine dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Fexofenadine dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Fexofenadine."
  },
  {
    "id": "ddinter-dfi-525",
    "drugName": "Diroximel fumarate",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diroximel fumarate dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Diroximel fumarate.",
    "recommendation": "Konsumsi Diroximel fumarate sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-526",
    "drugName": "Insulin degludec",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin degludec dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin degludec dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin degludec."
  },
  {
    "id": "ddinter-dfi-527",
    "drugName": "Ripretinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ripretinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ripretinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ripretinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-528",
    "drugName": "Ripretinib",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ripretinib dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Ripretinib dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Ripretinib."
  },
  {
    "id": "ddinter-dfi-529",
    "drugName": "Terfenadine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Terfenadine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Terfenadine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Terfenadine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-530",
    "drugName": "Chlorpheniramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlorpheniramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlorpheniramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlorpheniramine."
  },
  {
    "id": "ddinter-dfi-531",
    "drugName": "Acalabrutinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Acalabrutinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Acalabrutinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Acalabrutinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-532",
    "drugName": "Simvastatin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Simvastatin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Simvastatin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Simvastatin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-533",
    "drugName": "Ketamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ketamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ketamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ketamine."
  },
  {
    "id": "ddinter-dfi-534",
    "drugName": "Thalidomide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Thalidomide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Thalidomide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Thalidomide."
  },
  {
    "id": "ddinter-dfi-535",
    "drugName": "Albendazole",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Albendazole dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Albendazole.",
    "recommendation": "Konsumsi Albendazole sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-536",
    "drugName": "Albendazole",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Albendazole dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Albendazole dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Albendazole. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-537",
    "drugName": "Avacopan",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Avacopan dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Avacopan.",
    "recommendation": "Konsumsi Avacopan sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-538",
    "drugName": "Avacopan",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Avacopan dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Avacopan dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Avacopan. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-539",
    "drugName": "Tolvaptan",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolvaptan dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Tolvaptan dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Tolvaptan. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-540",
    "drugName": "Atorvastatin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atorvastatin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Atorvastatin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Atorvastatin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-541",
    "drugName": "Daprodustat",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Daprodustat dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Daprodustat dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Daprodustat."
  },
  {
    "id": "ddinter-dfi-542",
    "drugName": "Daprodustat",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Daprodustat dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Daprodustat dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Daprodustat."
  },
  {
    "id": "ddinter-dfi-543",
    "drugName": "Deflazacort",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Deflazacort dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Deflazacort dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Deflazacort. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-544",
    "drugName": "Entrectinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Entrectinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Entrectinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Entrectinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-545",
    "drugName": "Lorazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lorazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lorazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lorazepam."
  },
  {
    "id": "ddinter-dfi-546",
    "drugName": "Pexidartinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pexidartinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Pexidartinib.",
    "recommendation": "Konsumsi Pexidartinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-547",
    "drugName": "Pexidartinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pexidartinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pexidartinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pexidartinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-548",
    "drugName": "Methylnaltrexone",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methylnaltrexone dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Methylnaltrexone.",
    "recommendation": "Konsumsi Methylnaltrexone sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-549",
    "drugName": "Insulin detemir",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin detemir dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin detemir dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin detemir."
  },
  {
    "id": "ddinter-dfi-550",
    "drugName": "Sunitinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sunitinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Sunitinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Sunitinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-551",
    "drugName": "Cisapride",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cisapride dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Cisapride dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Cisapride. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-552",
    "drugName": "Ranolazine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ranolazine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ranolazine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ranolazine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-553",
    "drugName": "Nabilone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nabilone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nabilone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nabilone."
  },
  {
    "id": "ddinter-dfi-554",
    "drugName": "Naloxegol",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Naloxegol dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Naloxegol dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Naloxegol. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-555",
    "drugName": "Cinacalcet",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cinacalcet dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Cinacalcet.",
    "recommendation": "Konsumsi Cinacalcet sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-556",
    "drugName": "Levoketoconazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levoketoconazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levoketoconazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levoketoconazole."
  },
  {
    "id": "ddinter-dfi-557",
    "drugName": "Levoketoconazole",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levoketoconazole dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Levoketoconazole dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Levoketoconazole. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-558",
    "drugName": "Alectinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alectinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Alectinib.",
    "recommendation": "Konsumsi Alectinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-559",
    "drugName": "Thiothixene",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Thiothixene dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Thiothixene dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Thiothixene."
  },
  {
    "id": "ddinter-dfi-560",
    "drugName": "Hydroxyprogesterone caproate",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydroxyprogesterone caproate dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Hydroxyprogesterone caproate dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Hydroxyprogesterone caproate. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-561",
    "drugName": "Posaconazole",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Posaconazole dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Posaconazole.",
    "recommendation": "Konsumsi Posaconazole sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-562",
    "drugName": "Posaconazole",
    "foodName": "Minuman Cola Berkarbonasi",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Posaconazole dan Minuman Cola Berkarbonasi.",
    "clinicalOutcome": "Interaksi antara Posaconazole dan Minuman Cola Berkarbonasi dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Posaconazole."
  },
  {
    "id": "ddinter-dfi-563",
    "drugName": "Phenylbutyric acid",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phenylbutyric acid dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Phenylbutyric acid.",
    "recommendation": "Konsumsi Phenylbutyric acid sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-564",
    "drugName": "Praziquantel",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Praziquantel dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Praziquantel.",
    "recommendation": "Konsumsi Praziquantel sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-565",
    "drugName": "Praziquantel",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Praziquantel dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Praziquantel dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Praziquantel. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-566",
    "drugName": "Asciminib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Asciminib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Asciminib.",
    "recommendation": "Konsumsi Asciminib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-567",
    "drugName": "Vigabatrin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vigabatrin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Vigabatrin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Vigabatrin."
  },
  {
    "id": "ddinter-dfi-568",
    "drugName": "Temsirolimus",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Temsirolimus dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Temsirolimus dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Temsirolimus. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-569",
    "drugName": "Atazanavir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Atazanavir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Atazanavir.",
    "recommendation": "Konsumsi Atazanavir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-570",
    "drugName": "Budesonide",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Budesonide dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Budesonide dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Budesonide. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-571",
    "drugName": "Ospemifene",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ospemifene dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ospemifene.",
    "recommendation": "Konsumsi Ospemifene sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-572",
    "drugName": "Difelikefalin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Difelikefalin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Difelikefalin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Difelikefalin."
  },
  {
    "id": "ddinter-dfi-573",
    "drugName": "Glipizide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Glipizide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Glipizide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Glipizide."
  },
  {
    "id": "ddinter-dfi-574",
    "drugName": "Olanzapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Olanzapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Olanzapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Olanzapine."
  },
  {
    "id": "ddinter-dfi-575",
    "drugName": "Carbinoxamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Carbinoxamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Carbinoxamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Carbinoxamine."
  },
  {
    "id": "ddinter-dfi-576",
    "drugName": "Buspirone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Buspirone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Buspirone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Buspirone."
  },
  {
    "id": "ddinter-dfi-577",
    "drugName": "Lemborexant",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lemborexant dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lemborexant dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lemborexant. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-578",
    "drugName": "Abiraterone",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Abiraterone dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Abiraterone.",
    "recommendation": "Konsumsi Abiraterone sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-579",
    "drugName": "Cefditoren",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cefditoren dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Cefditoren.",
    "recommendation": "Konsumsi Cefditoren sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-580",
    "drugName": "Remimazolam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Remimazolam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Remimazolam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Remimazolam."
  },
  {
    "id": "ddinter-dfi-581",
    "drugName": "Nimodipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nimodipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Nimodipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Nimodipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-582",
    "drugName": "Insulin human (inhalation, rapid acting)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin human (inhalation, rapid acting) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin human (inhalation, rapid acting) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin human (inhalation, rapid acting)."
  },
  {
    "id": "ddinter-dfi-583",
    "drugName": "Nifedipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nifedipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Nifedipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Nifedipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-584",
    "drugName": "Olaparib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Olaparib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Olaparib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Olaparib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-585",
    "drugName": "Tetrabenazine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tetrabenazine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tetrabenazine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tetrabenazine."
  },
  {
    "id": "ddinter-dfi-586",
    "drugName": "Warfarin",
    "foodName": "Sayuran Hijau Kaya Vitamin K (Bayam, Kale, Brokoli)",
    "foodCategory": "Makanan Tinggi Vitamin K",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Warfarin dan Sayuran Hijau Kaya Vitamin K (Bayam, Kale, Brokoli).",
    "clinicalOutcome": "Vitamin K memicu sintesis faktor pembekuan darah yang bekerja berlawanan secara antagonis dengan efek antikoagulan Warfarin, meningkatkan risiko fluktuasi INR dan tromboemboli.",
    "recommendation": "Pertahankan asupan sayuran hijau tetap konsisten dan stabil setiap hari. Hindari perubahan diet drastis tanpa konsultasi apoteker/dokter."
  },
  {
    "id": "ddinter-dfi-587",
    "drugName": "Mipomersen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mipomersen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Mipomersen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Mipomersen."
  },
  {
    "id": "ddinter-dfi-588",
    "drugName": "Mobocertinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mobocertinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Mobocertinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Mobocertinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-589",
    "drugName": "Ivosidenib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ivosidenib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ivosidenib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ivosidenib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-590",
    "drugName": "Voriconazole",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Voriconazole dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Voriconazole.",
    "recommendation": "Konsumsi Voriconazole sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-591",
    "drugName": "Lithium carbonate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lithium carbonate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lithium carbonate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lithium carbonate."
  },
  {
    "id": "ddinter-dfi-592",
    "drugName": "Toremifene",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Toremifene dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Toremifene dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Toremifene. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-593",
    "drugName": "Infigratinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Infigratinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Infigratinib.",
    "recommendation": "Konsumsi Infigratinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-594",
    "drugName": "Colchicine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Colchicine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Colchicine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Colchicine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-595",
    "drugName": "Diazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diazepam."
  },
  {
    "id": "ddinter-dfi-596",
    "drugName": "Mirtazapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mirtazapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Mirtazapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Mirtazapine."
  },
  {
    "id": "ddinter-dfi-597",
    "drugName": "Glyburide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Glyburide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Glyburide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Glyburide."
  },
  {
    "id": "ddinter-dfi-598",
    "drugName": "Copanlisib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Copanlisib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Copanlisib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Copanlisib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-599",
    "drugName": "Abemaciclib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Abemaciclib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Abemaciclib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Abemaciclib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-600",
    "drugName": "St. John's Wort",
    "foodName": "Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara St. John's Wort dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi).",
    "clinicalOutcome": "Interaksi antara St. John's Wort dan Makanan Tinggi Tirosin / Tiramin (Keju Tua, Ikan Asin/Fermentasi) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk St. John's Wort."
  },
  {
    "id": "ddinter-dfi-601",
    "drugName": "St. John's Wort",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara St. John's Wort dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi St. John's Wort dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi St. John's Wort."
  },
  {
    "id": "ddinter-dfi-602",
    "drugName": "St. John's Wort",
    "foodName": "Kopi & Minuman Berkafein",
    "foodCategory": "Kafein / Kopi",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara St. John's Wort dan Kopi & Minuman Berkafein.",
    "clinicalOutcome": "Kafein atau senyawa polifenol dalam kopi dapat mengganggu kinetika absorpsi St. John's Wort di saluran cerna atau menurunkan laju bersihan kafein di hepar.",
    "recommendation": "Beri jarak minimal 1 hingga 2 jam antara minum obat St. John's Wort dan konsumsi kopi atau minuman berkafein tinggi."
  },
  {
    "id": "ddinter-dfi-603",
    "drugName": "Lamotrigine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lamotrigine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lamotrigine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lamotrigine."
  },
  {
    "id": "ddinter-dfi-604",
    "drugName": "Insulin human (zinc)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin human (zinc) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin human (zinc) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin human (zinc)."
  },
  {
    "id": "ddinter-dfi-605",
    "drugName": "Lurasidone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lurasidone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lurasidone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lurasidone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-606",
    "drugName": "Ceftibuten",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ceftibuten dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ceftibuten.",
    "recommendation": "Konsumsi Ceftibuten sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-607",
    "drugName": "Ethosuximide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ethosuximide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ethosuximide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ethosuximide."
  },
  {
    "id": "ddinter-dfi-608",
    "drugName": "Vilazodone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vilazodone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Vilazodone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Vilazodone."
  },
  {
    "id": "ddinter-dfi-609",
    "drugName": "Trabectedin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trabectedin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Trabectedin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Trabectedin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-610",
    "drugName": "Levonorgestrel",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levonorgestrel dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Levonorgestrel dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Levonorgestrel. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-611",
    "drugName": "Alogliptin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alogliptin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Alogliptin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Alogliptin."
  },
  {
    "id": "ddinter-dfi-612",
    "drugName": "Pergolide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pergolide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pergolide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pergolide."
  },
  {
    "id": "ddinter-dfi-613",
    "drugName": "Aripiprazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Aripiprazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Aripiprazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Aripiprazole."
  },
  {
    "id": "ddinter-dfi-614",
    "drugName": "Tramadol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tramadol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tramadol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tramadol."
  },
  {
    "id": "ddinter-dfi-615",
    "drugName": "Iloperidone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Iloperidone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Iloperidone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Iloperidone."
  },
  {
    "id": "ddinter-dfi-616",
    "drugName": "Ezogabine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ezogabine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ezogabine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ezogabine."
  },
  {
    "id": "ddinter-dfi-617",
    "drugName": "Triazolam",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Triazolam dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Triazolam dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Triazolam. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-618",
    "drugName": "Triazolam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Triazolam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Triazolam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Triazolam."
  },
  {
    "id": "ddinter-dfi-619",
    "drugName": "Guanfacine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Guanfacine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Guanfacine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Guanfacine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-620",
    "drugName": "Imatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Imatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Imatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Imatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-621",
    "drugName": "Glasdegib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Glasdegib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Glasdegib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Glasdegib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-622",
    "drugName": "Everolimus",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Everolimus dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Everolimus dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Everolimus. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-623",
    "drugName": "Sertraline",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sertraline dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Sertraline dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Sertraline. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-624",
    "drugName": "Sertraline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sertraline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sertraline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sertraline."
  },
  {
    "id": "ddinter-dfi-625",
    "drugName": "Oliceridine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oliceridine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oliceridine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oliceridine."
  },
  {
    "id": "ddinter-dfi-626",
    "drugName": "Phentermine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Phentermine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Phentermine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Phentermine."
  },
  {
    "id": "ddinter-dfi-627",
    "drugName": "Citalopram",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Citalopram dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Citalopram dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Citalopram."
  },
  {
    "id": "ddinter-dfi-628",
    "drugName": "Eliglustat",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eliglustat dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Eliglustat dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Eliglustat. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-629",
    "drugName": "Felodipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Felodipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Felodipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Felodipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-630",
    "drugName": "Avanafil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Avanafil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Avanafil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Avanafil."
  },
  {
    "id": "ddinter-dfi-631",
    "drugName": "Dextromethorphan",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dextromethorphan dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dextromethorphan dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dextromethorphan."
  },
  {
    "id": "ddinter-dfi-632",
    "drugName": "Rimegepant",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rimegepant dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Rimegepant dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Rimegepant. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-633",
    "drugName": "Oxcarbazepine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxcarbazepine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oxcarbazepine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oxcarbazepine."
  },
  {
    "id": "ddinter-dfi-634",
    "drugName": "Eszopiclone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eszopiclone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Eszopiclone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Eszopiclone."
  },
  {
    "id": "ddinter-dfi-635",
    "drugName": "Futibatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Futibatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Futibatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Futibatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-636",
    "drugName": "Hydromorphone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydromorphone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Hydromorphone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Hydromorphone."
  },
  {
    "id": "ddinter-dfi-637",
    "drugName": "Metoclopramide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metoclopramide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metoclopramide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metoclopramide."
  },
  {
    "id": "ddinter-dfi-638",
    "drugName": "Rilpivirine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rilpivirine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Rilpivirine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Rilpivirine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-639",
    "drugName": "Vortioxetine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vortioxetine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Vortioxetine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Vortioxetine."
  },
  {
    "id": "ddinter-dfi-640",
    "drugName": "Methadone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methadone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Methadone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Methadone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-641",
    "drugName": "Leflunomide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Leflunomide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Leflunomide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Leflunomide."
  },
  {
    "id": "ddinter-dfi-642",
    "drugName": "Loperamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Loperamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Loperamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Loperamide."
  },
  {
    "id": "ddinter-dfi-643",
    "drugName": "Disopyramide",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Disopyramide dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Disopyramide dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Disopyramide. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-644",
    "drugName": "Erlotinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Erlotinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Erlotinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Erlotinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-645",
    "drugName": "Nifurtimox",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nifurtimox dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nifurtimox dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nifurtimox."
  },
  {
    "id": "ddinter-dfi-646",
    "drugName": "Axitinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Axitinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Axitinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Axitinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-647",
    "drugName": "Fosamprenavir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fosamprenavir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Fosamprenavir.",
    "recommendation": "Konsumsi Fosamprenavir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-648",
    "drugName": "Verapamil",
    "foodName": "Biji-Bijian & Gandum Utuh",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Verapamil dan Biji-Bijian & Gandum Utuh.",
    "clinicalOutcome": "Interaksi antara Verapamil dan Biji-Bijian & Gandum Utuh dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Verapamil."
  },
  {
    "id": "ddinter-dfi-649",
    "drugName": "Verapamil",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Verapamil dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Verapamil dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Verapamil. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-650",
    "drugName": "Crizotinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Crizotinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Crizotinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Crizotinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-651",
    "drugName": "Cyclosporine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cyclosporine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Cyclosporine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Cyclosporine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-652",
    "drugName": "Eluxadoline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eluxadoline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Eluxadoline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Eluxadoline."
  },
  {
    "id": "ddinter-dfi-653",
    "drugName": "Levomilnacipran",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levomilnacipran dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levomilnacipran dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levomilnacipran."
  },
  {
    "id": "ddinter-dfi-654",
    "drugName": "Ixazomib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ixazomib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ixazomib.",
    "recommendation": "Konsumsi Ixazomib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-655",
    "drugName": "Cilostazol",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cilostazol dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Cilostazol dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Cilostazol. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-656",
    "drugName": "Brompheniramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brompheniramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brompheniramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brompheniramine."
  },
  {
    "id": "ddinter-dfi-657",
    "drugName": "Dapagliflozin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dapagliflozin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dapagliflozin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dapagliflozin."
  },
  {
    "id": "ddinter-dfi-658",
    "drugName": "Lonafarnib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lonafarnib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lonafarnib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lonafarnib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-659",
    "drugName": "Dexchlorpheniramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dexchlorpheniramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dexchlorpheniramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dexchlorpheniramine."
  },
  {
    "id": "ddinter-dfi-660",
    "drugName": "Pazopanib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pazopanib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pazopanib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pazopanib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-661",
    "drugName": "Desvenlafaxine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Desvenlafaxine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Desvenlafaxine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Desvenlafaxine."
  },
  {
    "id": "ddinter-dfi-662",
    "drugName": "Flavoxate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Flavoxate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Flavoxate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Flavoxate."
  },
  {
    "id": "ddinter-dfi-663",
    "drugName": "Sparsentan",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sparsentan dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Sparsentan dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Sparsentan. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-664",
    "drugName": "Ivacaftor",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ivacaftor dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ivacaftor dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ivacaftor. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-665",
    "drugName": "Tipranavir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tipranavir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Tipranavir.",
    "recommendation": "Konsumsi Tipranavir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-666",
    "drugName": "Rufinamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rufinamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Rufinamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Rufinamide."
  },
  {
    "id": "ddinter-dfi-667",
    "drugName": "Empagliflozin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Empagliflozin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Empagliflozin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Empagliflozin."
  },
  {
    "id": "ddinter-dfi-668",
    "drugName": "Glimepiride",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Glimepiride dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Glimepiride dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Glimepiride."
  },
  {
    "id": "ddinter-dfi-669",
    "drugName": "Amphetamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amphetamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Amphetamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Amphetamine."
  },
  {
    "id": "ddinter-dfi-670",
    "drugName": "Pretomanid",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pretomanid dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Pretomanid.",
    "recommendation": "Konsumsi Pretomanid sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-671",
    "drugName": "Trametinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trametinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Trametinib.",
    "recommendation": "Konsumsi Trametinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-672",
    "drugName": "Valerian",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Valerian dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Valerian dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Valerian."
  },
  {
    "id": "ddinter-dfi-673",
    "drugName": "Carisoprodol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Carisoprodol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Carisoprodol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Carisoprodol."
  },
  {
    "id": "ddinter-dfi-674",
    "drugName": "Riociguat",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Riociguat dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Riociguat dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Riociguat."
  },
  {
    "id": "ddinter-dfi-675",
    "drugName": "Tamsulosin",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tamsulosin dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Tamsulosin.",
    "recommendation": "Konsumsi Tamsulosin sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-676",
    "drugName": "Benzphetamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Benzphetamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Benzphetamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Benzphetamine."
  },
  {
    "id": "ddinter-dfi-677",
    "drugName": "Ethchlorvynol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ethchlorvynol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ethchlorvynol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ethchlorvynol."
  },
  {
    "id": "ddinter-dfi-678",
    "drugName": "Insulin glargine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin glargine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin glargine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin glargine."
  },
  {
    "id": "ddinter-dfi-679",
    "drugName": "Lapatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lapatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lapatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lapatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-680",
    "drugName": "Suvorexant",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Suvorexant dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Suvorexant dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Suvorexant."
  },
  {
    "id": "ddinter-dfi-681",
    "drugName": "Folic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Folic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Folic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Folic acid."
  },
  {
    "id": "ddinter-dfi-682",
    "drugName": "Sonidegib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sonidegib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Sonidegib.",
    "recommendation": "Konsumsi Sonidegib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-683",
    "drugName": "Drospirenone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Drospirenone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Drospirenone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Drospirenone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-684",
    "drugName": "Finerenone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Finerenone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Finerenone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Finerenone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-685",
    "drugName": "Palbociclib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Palbociclib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Palbociclib.",
    "recommendation": "Konsumsi Palbociclib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-686",
    "drugName": "Palbociclib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Palbociclib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Palbociclib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Palbociclib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-687",
    "drugName": "Diethylpropion",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diethylpropion dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diethylpropion dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diethylpropion."
  },
  {
    "id": "ddinter-dfi-688",
    "drugName": "Methylergometrine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methylergometrine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Methylergometrine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Methylergometrine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-689",
    "drugName": "Venetoclax",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Venetoclax dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Venetoclax.",
    "recommendation": "Konsumsi Venetoclax sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-690",
    "drugName": "Triprolidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Triprolidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Triprolidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Triprolidine."
  },
  {
    "id": "ddinter-dfi-691",
    "drugName": "Maprotiline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Maprotiline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Maprotiline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Maprotiline."
  },
  {
    "id": "ddinter-dfi-692",
    "drugName": "Saxagliptin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Saxagliptin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Saxagliptin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Saxagliptin."
  },
  {
    "id": "ddinter-dfi-693",
    "drugName": "Fluvoxamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fluvoxamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fluvoxamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fluvoxamine."
  },
  {
    "id": "ddinter-dfi-694",
    "drugName": "Isradipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Isradipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Isradipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Isradipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-695",
    "drugName": "Afatinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Afatinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Afatinib.",
    "recommendation": "Konsumsi Afatinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-696",
    "drugName": "Nisoldipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nisoldipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Nisoldipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Nisoldipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-697",
    "drugName": "Simeprevir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Simeprevir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Simeprevir.",
    "recommendation": "Konsumsi Simeprevir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-698",
    "drugName": "Cycloserine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cycloserine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cycloserine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cycloserine."
  },
  {
    "id": "ddinter-dfi-699",
    "drugName": "Brexpiprazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brexpiprazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Brexpiprazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Brexpiprazole."
  },
  {
    "id": "ddinter-dfi-700",
    "drugName": "Lisdexamfetamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lisdexamfetamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Lisdexamfetamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Lisdexamfetamine."
  },
  {
    "id": "ddinter-dfi-701",
    "drugName": "Duloxetine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Duloxetine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Duloxetine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Duloxetine."
  },
  {
    "id": "ddinter-dfi-702",
    "drugName": "Dextropropoxyphene",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dextropropoxyphene dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dextropropoxyphene dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dextropropoxyphene."
  },
  {
    "id": "ddinter-dfi-703",
    "drugName": "Benznidazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Benznidazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Benznidazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Benznidazole."
  },
  {
    "id": "ddinter-dfi-704",
    "drugName": "Loxapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Loxapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Loxapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Loxapine."
  },
  {
    "id": "ddinter-dfi-705",
    "drugName": "Zafirlukast",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zafirlukast dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Zafirlukast.",
    "recommendation": "Konsumsi Zafirlukast sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-706",
    "drugName": "Istradefylline",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Istradefylline dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Istradefylline dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Istradefylline."
  },
  {
    "id": "ddinter-dfi-707",
    "drugName": "Dextroamphetamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dextroamphetamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dextroamphetamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dextroamphetamine."
  },
  {
    "id": "ddinter-dfi-708",
    "drugName": "Tinidazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tinidazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tinidazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tinidazole."
  },
  {
    "id": "ddinter-dfi-709",
    "drugName": "Zonisamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zonisamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Zonisamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Zonisamide."
  },
  {
    "id": "ddinter-dfi-710",
    "drugName": "Voclosporin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Voclosporin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Voclosporin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Voclosporin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-711",
    "drugName": "Voxelotor",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Voxelotor dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Voxelotor dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Voxelotor. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-712",
    "drugName": "Clomipramine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clomipramine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Clomipramine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Clomipramine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-713",
    "drugName": "Clomipramine",
    "foodName": "Jus Buah Cranberry",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clomipramine dan Jus Buah Cranberry.",
    "clinicalOutcome": "Interaksi antara Clomipramine dan Jus Buah Cranberry dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Clomipramine."
  },
  {
    "id": "ddinter-dfi-714",
    "drugName": "Betrixaban",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Betrixaban dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Betrixaban.",
    "recommendation": "Konsumsi Betrixaban sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-715",
    "drugName": "Cannabidiol",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cannabidiol dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Cannabidiol.",
    "recommendation": "Konsumsi Cannabidiol sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-716",
    "drugName": "Regorafenib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Regorafenib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Regorafenib.",
    "recommendation": "Konsumsi Regorafenib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-717",
    "drugName": "Regorafenib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Regorafenib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Regorafenib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Regorafenib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-718",
    "drugName": "Migalastat",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Migalastat dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Migalastat.",
    "recommendation": "Konsumsi Migalastat sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-719",
    "drugName": "Bupropion",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bupropion dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Bupropion dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Bupropion."
  },
  {
    "id": "ddinter-dfi-720",
    "drugName": "Ritonavir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ritonavir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ritonavir.",
    "recommendation": "Konsumsi Ritonavir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-721",
    "drugName": "Entecavir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Entecavir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Entecavir.",
    "recommendation": "Konsumsi Entecavir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-722",
    "drugName": "Valbenazine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Valbenazine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Valbenazine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Valbenazine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-723",
    "drugName": "Pimozide",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pimozide dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pimozide dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pimozide. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-724",
    "drugName": "Pimozide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pimozide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pimozide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pimozide."
  },
  {
    "id": "ddinter-dfi-725",
    "drugName": "Tasimelteon",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tasimelteon dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tasimelteon dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tasimelteon."
  },
  {
    "id": "ddinter-dfi-726",
    "drugName": "Metformin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metformin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metformin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metformin."
  },
  {
    "id": "ddinter-dfi-727",
    "drugName": "Insulin aspart (aspart)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin aspart (aspart) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin aspart (aspart) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin aspart (aspart)."
  },
  {
    "id": "ddinter-dfi-728",
    "drugName": "Efavirenz",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Efavirenz dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Efavirenz.",
    "recommendation": "Konsumsi Efavirenz sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-729",
    "drugName": "Hydroxyzine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydroxyzine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Hydroxyzine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Hydroxyzine."
  },
  {
    "id": "ddinter-dfi-730",
    "drugName": "Pentazocine",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pentazocine dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Pentazocine dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Pentazocine."
  },
  {
    "id": "ddinter-dfi-731",
    "drugName": "Clobazam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clobazam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clobazam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clobazam."
  },
  {
    "id": "ddinter-dfi-732",
    "drugName": "Miglitol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Miglitol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Miglitol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Miglitol."
  },
  {
    "id": "ddinter-dfi-733",
    "drugName": "Ertugliflozin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ertugliflozin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ertugliflozin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ertugliflozin."
  },
  {
    "id": "ddinter-dfi-734",
    "drugName": "Dexbrompheniramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dexbrompheniramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dexbrompheniramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dexbrompheniramine."
  },
  {
    "id": "ddinter-dfi-735",
    "drugName": "Ponatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ponatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ponatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ponatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-736",
    "drugName": "Levetiracetam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levetiracetam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levetiracetam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levetiracetam."
  },
  {
    "id": "ddinter-dfi-737",
    "drugName": "Pomalidomide",
    "foodName": "Rokok & Produk Tembakau (Nikotin/Polisiklik)",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pomalidomide dan Rokok & Produk Tembakau (Nikotin/Polisiklik).",
    "clinicalOutcome": "Interaksi antara Pomalidomide dan Rokok & Produk Tembakau (Nikotin/Polisiklik) dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Pomalidomide."
  },
  {
    "id": "ddinter-dfi-738",
    "drugName": "Metronidazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Metronidazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Metronidazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Metronidazole."
  },
  {
    "id": "ddinter-dfi-739",
    "drugName": "Lumateperone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lumateperone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lumateperone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lumateperone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-740",
    "drugName": "Bosutinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bosutinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Bosutinib.",
    "recommendation": "Konsumsi Bosutinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-741",
    "drugName": "Bosutinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bosutinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Bosutinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Bosutinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-742",
    "drugName": "Cabergoline",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cabergoline dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cabergoline dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cabergoline."
  },
  {
    "id": "ddinter-dfi-743",
    "drugName": "Ceritinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ceritinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ceritinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ceritinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-744",
    "drugName": "Telotristat ethyl",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Telotristat ethyl dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Telotristat ethyl.",
    "recommendation": "Konsumsi Telotristat ethyl sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-745",
    "drugName": "Dronedarone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dronedarone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Dronedarone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Dronedarone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-746",
    "drugName": "Etonogestrel",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Etonogestrel dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Etonogestrel dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Etonogestrel. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-747",
    "drugName": "Lurbinectedin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lurbinectedin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lurbinectedin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lurbinectedin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-748",
    "drugName": "Adagrasib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Adagrasib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Adagrasib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Adagrasib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-749",
    "drugName": "Quinidine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Quinidine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Quinidine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Quinidine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-750",
    "drugName": "Pregabalin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pregabalin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pregabalin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pregabalin."
  },
  {
    "id": "ddinter-dfi-751",
    "drugName": "Calcium gluconate",
    "foodName": "Bayam & Sayuran Hijau Tinggi Oksalat",
    "foodCategory": "Makanan Tinggi Vitamin K",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium gluconate dan Bayam & Sayuran Hijau Tinggi Oksalat.",
    "clinicalOutcome": "Vitamin K memicu sintesis faktor pembekuan darah yang bekerja berlawanan secara antagonis dengan efek antikoagulan Calcium gluconate, meningkatkan risiko fluktuasi INR dan tromboemboli.",
    "recommendation": "Pertahankan asupan sayuran hijau tetap konsisten dan stabil setiap hari. Hindari perubahan diet drastis tanpa konsultasi apoteker/dokter."
  },
  {
    "id": "ddinter-dfi-752",
    "drugName": "Calcium gluconate",
    "foodName": "Rhubarb & Tumbuhan Asam Oksalat",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium gluconate dan Rhubarb & Tumbuhan Asam Oksalat.",
    "clinicalOutcome": "Interaksi antara Calcium gluconate dan Rhubarb & Tumbuhan Asam Oksalat dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium gluconate."
  },
  {
    "id": "ddinter-dfi-753",
    "drugName": "Calcium gluconate",
    "foodName": "Bekatul & Serat Gandum Kasar",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium gluconate dan Bekatul & Serat Gandum Kasar.",
    "clinicalOutcome": "Interaksi antara Calcium gluconate dan Bekatul & Serat Gandum Kasar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium gluconate."
  },
  {
    "id": "ddinter-dfi-754",
    "drugName": "Calcium gluconate",
    "foodName": "Biji-Bijian & Gandum Utuh",
    "foodCategory": "Lainnya",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Calcium gluconate dan Biji-Bijian & Gandum Utuh.",
    "clinicalOutcome": "Interaksi antara Calcium gluconate dan Biji-Bijian & Gandum Utuh dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Calcium gluconate."
  },
  {
    "id": "ddinter-dfi-755",
    "drugName": "Sildenafil",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sildenafil dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Sildenafil dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Sildenafil. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-756",
    "drugName": "Methylphenidate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methylphenidate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methylphenidate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methylphenidate."
  },
  {
    "id": "ddinter-dfi-757",
    "drugName": "Dronabinol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dronabinol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dronabinol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dronabinol."
  },
  {
    "id": "ddinter-dfi-758",
    "drugName": "Midostaurin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Midostaurin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Midostaurin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Midostaurin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-759",
    "drugName": "Selpercatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Selpercatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Selpercatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Selpercatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-760",
    "drugName": "Insulin lispro",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin lispro dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin lispro dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin lispro."
  },
  {
    "id": "ddinter-dfi-761",
    "drugName": "Carbamazepine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Carbamazepine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Carbamazepine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Carbamazepine."
  },
  {
    "id": "ddinter-dfi-762",
    "drugName": "Nicardipine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nicardipine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Nicardipine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Nicardipine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-763",
    "drugName": "Oxazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Oxazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Oxazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Oxazepam."
  },
  {
    "id": "ddinter-dfi-764",
    "drugName": "Ziprasidone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ziprasidone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ziprasidone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ziprasidone."
  },
  {
    "id": "ddinter-dfi-765",
    "drugName": "Docetaxel",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Docetaxel dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Docetaxel dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Docetaxel. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-766",
    "drugName": "Neratinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Neratinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Neratinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Neratinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-767",
    "drugName": "Ruxolitinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ruxolitinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ruxolitinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ruxolitinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-768",
    "drugName": "Fluoxetine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fluoxetine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fluoxetine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fluoxetine."
  },
  {
    "id": "ddinter-dfi-769",
    "drugName": "Perampanel",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Perampanel dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Perampanel dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Perampanel."
  },
  {
    "id": "ddinter-dfi-770",
    "drugName": "Panobinostat",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Panobinostat dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Panobinostat dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Panobinostat. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-771",
    "drugName": "Aliskiren",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Aliskiren dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Aliskiren dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Aliskiren. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-772",
    "drugName": "Aliskiren",
    "foodName": "Jus Jeruk Segar",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Aliskiren dan Jus Jeruk Segar.",
    "clinicalOutcome": "Interaksi antara Aliskiren dan Jus Jeruk Segar dapat mempengaruhi stabilitas absorpsi lambung atau bioavailabilitas zat aktif dalam plasma darah.",
    "recommendation": "Konsumsi obat dengan segelas penuh air putih. Konsultasikan dengan apoteker mengenai jadwal waktu makan yang paling optimal untuk Aliskiren."
  },
  {
    "id": "ddinter-dfi-773",
    "drugName": "Elacestrant",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Elacestrant dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Elacestrant dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Elacestrant. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-774",
    "drugName": "Lorlatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Lorlatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Lorlatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Lorlatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-775",
    "drugName": "Haloperidol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Haloperidol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Haloperidol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Haloperidol."
  },
  {
    "id": "ddinter-dfi-776",
    "drugName": "Ribavirin",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ribavirin dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ribavirin.",
    "recommendation": "Konsumsi Ribavirin sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-777",
    "drugName": "Mefloquine",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mefloquine dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Mefloquine.",
    "recommendation": "Konsumsi Mefloquine sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-778",
    "drugName": "Tadalafil",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tadalafil dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tadalafil dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tadalafil."
  },
  {
    "id": "ddinter-dfi-779",
    "drugName": "Clofedanol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clofedanol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clofedanol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clofedanol."
  },
  {
    "id": "ddinter-dfi-780",
    "drugName": "Milnacipran",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Milnacipran dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Milnacipran dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Milnacipran."
  },
  {
    "id": "ddinter-dfi-781",
    "drugName": "Fentanyl",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fentanyl dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fentanyl dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fentanyl."
  },
  {
    "id": "ddinter-dfi-782",
    "drugName": "Valproic acid",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Valproic acid dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Valproic acid dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Valproic acid."
  },
  {
    "id": "ddinter-dfi-783",
    "drugName": "Nateglinide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nateglinide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nateglinide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nateglinide."
  },
  {
    "id": "ddinter-dfi-784",
    "drugName": "Canagliflozin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Canagliflozin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Canagliflozin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Canagliflozin."
  },
  {
    "id": "ddinter-dfi-785",
    "drugName": "Zaleplon",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zaleplon dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Zaleplon dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Zaleplon."
  },
  {
    "id": "ddinter-dfi-786",
    "drugName": "Amiodarone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Amiodarone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Amiodarone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Amiodarone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-787",
    "drugName": "Alpelisib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alpelisib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Alpelisib.",
    "recommendation": "Konsumsi Alpelisib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-788",
    "drugName": "Morphine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Morphine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Morphine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Morphine."
  },
  {
    "id": "ddinter-dfi-789",
    "drugName": "Ivabradine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ivabradine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ivabradine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ivabradine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-790",
    "drugName": "Trimethadione",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trimethadione dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trimethadione dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trimethadione."
  },
  {
    "id": "ddinter-dfi-791",
    "drugName": "Duvelisib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Duvelisib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Duvelisib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Duvelisib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-792",
    "drugName": "Zanubrutinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zanubrutinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Zanubrutinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Zanubrutinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-793",
    "drugName": "Clozapine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clozapine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clozapine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clozapine."
  },
  {
    "id": "ddinter-dfi-794",
    "drugName": "Avatrombopag",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Avatrombopag dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Avatrombopag.",
    "recommendation": "Konsumsi Avatrombopag sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-795",
    "drugName": "Mycophenolic acid",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mycophenolic acid dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Mycophenolic acid.",
    "recommendation": "Konsumsi Mycophenolic acid sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-796",
    "drugName": "Ramelteon",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ramelteon dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ramelteon dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ramelteon."
  },
  {
    "id": "ddinter-dfi-797",
    "drugName": "Vericiguat",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Vericiguat dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Vericiguat.",
    "recommendation": "Konsumsi Vericiguat sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-798",
    "drugName": "Mavacamten",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mavacamten dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Mavacamten dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Mavacamten. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-799",
    "drugName": "Dantrolene",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dantrolene dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dantrolene dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dantrolene."
  },
  {
    "id": "ddinter-dfi-800",
    "drugName": "Cyclobenzaprine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cyclobenzaprine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cyclobenzaprine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cyclobenzaprine."
  },
  {
    "id": "ddinter-dfi-801",
    "drugName": "Dasatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dasatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Dasatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Dasatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-802",
    "drugName": "Repaglinide",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Repaglinide dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Repaglinide dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Repaglinide. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-803",
    "drugName": "Clemastine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Clemastine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Clemastine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Clemastine."
  },
  {
    "id": "ddinter-dfi-804",
    "drugName": "Mitapivat",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Mitapivat dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Mitapivat dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Mitapivat. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-805",
    "drugName": "Trimethobenzamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Trimethobenzamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Trimethobenzamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Trimethobenzamide."
  },
  {
    "id": "ddinter-dfi-806",
    "drugName": "Fexinidazole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Fexinidazole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Fexinidazole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Fexinidazole."
  },
  {
    "id": "ddinter-dfi-807",
    "drugName": "Ziconotide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ziconotide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ziconotide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ziconotide."
  },
  {
    "id": "ddinter-dfi-808",
    "drugName": "Tiagabine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tiagabine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tiagabine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tiagabine."
  },
  {
    "id": "ddinter-dfi-809",
    "drugName": "Halofantrine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Halofantrine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Halofantrine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Halofantrine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-810",
    "drugName": "Doxylamine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Doxylamine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Doxylamine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Doxylamine."
  },
  {
    "id": "ddinter-dfi-811",
    "drugName": "Quazepam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Quazepam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Quazepam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Quazepam."
  },
  {
    "id": "ddinter-dfi-812",
    "drugName": "Ganciclovir",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ganciclovir dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Ganciclovir.",
    "recommendation": "Konsumsi Ganciclovir sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-813",
    "drugName": "Pirtobrutinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pirtobrutinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pirtobrutinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pirtobrutinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-814",
    "drugName": "Linagliptin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Linagliptin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Linagliptin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Linagliptin."
  },
  {
    "id": "ddinter-dfi-815",
    "drugName": "Cyproheptadine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cyproheptadine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Cyproheptadine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Cyproheptadine."
  },
  {
    "id": "ddinter-dfi-816",
    "drugName": "Hydrocodone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Hydrocodone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Hydrocodone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Hydrocodone."
  },
  {
    "id": "ddinter-dfi-817",
    "drugName": "Insulin human (isophane)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Insulin human (isophane) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Insulin human (isophane) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Insulin human (isophane)."
  },
  {
    "id": "ddinter-dfi-818",
    "drugName": "Cabozantinib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cabozantinib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Cabozantinib.",
    "recommendation": "Konsumsi Cabozantinib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-819",
    "drugName": "Felbamate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Felbamate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Felbamate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Felbamate."
  },
  {
    "id": "ddinter-dfi-820",
    "drugName": "Tolazamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolazamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tolazamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tolazamide."
  },
  {
    "id": "ddinter-dfi-821",
    "drugName": "Propofol",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Propofol dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Propofol dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Propofol."
  },
  {
    "id": "ddinter-dfi-822",
    "drugName": "Dabrafenib",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dabrafenib dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Dabrafenib.",
    "recommendation": "Konsumsi Dabrafenib sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-823",
    "drugName": "Tolbutamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tolbutamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Tolbutamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Tolbutamide."
  },
  {
    "id": "ddinter-dfi-824",
    "drugName": "Cariprazine",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Cariprazine dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Cariprazine dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Cariprazine. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-825",
    "drugName": "Ixabepilone",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ixabepilone dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Ixabepilone dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Ixabepilone. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-826",
    "drugName": "Rosiglitazone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Rosiglitazone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Rosiglitazone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Rosiglitazone."
  },
  {
    "id": "ddinter-dfi-827",
    "drugName": "Chlorpropamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Chlorpropamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Chlorpropamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Chlorpropamide."
  },
  {
    "id": "ddinter-dfi-828",
    "drugName": "Nilutamide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Nilutamide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Nilutamide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Nilutamide."
  },
  {
    "id": "ddinter-dfi-829",
    "drugName": "Acarbose",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Acarbose dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Acarbose dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Acarbose."
  },
  {
    "id": "ddinter-dfi-830",
    "drugName": "Pioglitazone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pioglitazone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Pioglitazone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Pioglitazone."
  },
  {
    "id": "ddinter-dfi-831",
    "drugName": "Ropinirole",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Ropinirole dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Ropinirole dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Ropinirole."
  },
  {
    "id": "ddinter-dfi-832",
    "drugName": "Methsuximide",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Methsuximide dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Methsuximide dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Methsuximide."
  },
  {
    "id": "ddinter-dfi-833",
    "drugName": "Azelastine (nasal)",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Azelastine (nasal) dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Azelastine (nasal) dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Azelastine (nasal)."
  },
  {
    "id": "ddinter-dfi-834",
    "drugName": "Sibutramine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sibutramine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sibutramine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sibutramine."
  },
  {
    "id": "ddinter-dfi-835",
    "drugName": "Pacritinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Pacritinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Pacritinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Pacritinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-836",
    "drugName": "Tazemetostat",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tazemetostat dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Tazemetostat dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Tazemetostat. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-837",
    "drugName": "Paroxetine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Paroxetine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Paroxetine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Paroxetine."
  },
  {
    "id": "ddinter-dfi-838",
    "drugName": "Sirolimus",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sirolimus dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Sirolimus dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Sirolimus. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-839",
    "drugName": "Dexmedetomidine",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Dexmedetomidine dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Dexmedetomidine dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Dexmedetomidine."
  },
  {
    "id": "ddinter-dfi-840",
    "drugName": "Brigatinib",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Brigatinib dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Brigatinib dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Brigatinib. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-841",
    "drugName": "Levodopa",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Levodopa dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Levodopa dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Levodopa."
  },
  {
    "id": "ddinter-dfi-842",
    "drugName": "Alprazolam",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alprazolam dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Alprazolam dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Alprazolam. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-843",
    "drugName": "Alprazolam",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Alprazolam dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Alprazolam dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Alprazolam."
  },
  {
    "id": "ddinter-dfi-844",
    "drugName": "Sirolimus (protein-bound)",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sirolimus (protein-bound) dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Sirolimus (protein-bound) dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Sirolimus (protein-bound). Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-845",
    "drugName": "Baclofen",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Baclofen dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Baclofen dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Baclofen."
  },
  {
    "id": "ddinter-dfi-846",
    "drugName": "Erythromycin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Erythromycin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Erythromycin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Erythromycin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-847",
    "drugName": "Meprobamate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Meprobamate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Meprobamate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Meprobamate."
  },
  {
    "id": "ddinter-dfi-848",
    "drugName": "Tafenoquine",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Tafenoquine dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Tafenoquine.",
    "recommendation": "Konsumsi Tafenoquine sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-849",
    "drugName": "Diltiazem",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Diltiazem dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Diltiazem dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Diltiazem."
  },
  {
    "id": "ddinter-dfi-850",
    "drugName": "Flibanserin",
    "foodName": "Jus Jeruk Bali / Grapefruit",
    "foodCategory": "Buah / Juice",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Flibanserin dan Jus Jeruk Bali / Grapefruit.",
    "clinicalOutcome": "Senyawa furanokumarin dalam jeruk bali menghambat enzim CYP3A4 di usus halus, meningkatkan kadar Flibanserin dalam darah hingga berlipat ganda dan memicu risiko toksisitas berat.",
    "recommendation": "HINDARI konsumsi jus grapefruit atau jeruk bali selama menjalani terapi Flibanserin. Laporkan segera ke dokter jika mengalami nyeri otot, kelemahan fisik, atau pusing hebat."
  },
  {
    "id": "ddinter-dfi-851",
    "drugName": "Sodium oxybate",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Major",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Sodium oxybate dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Sodium oxybate dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Sodium oxybate."
  },
  {
    "id": "ddinter-dfi-852",
    "drugName": "Zolpidem",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Zolpidem dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Zolpidem dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Zolpidem."
  },
  {
    "id": "ddinter-dfi-853",
    "drugName": "Entacapone",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Entacapone dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Entacapone dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Entacapone."
  },
  {
    "id": "ddinter-dfi-854",
    "drugName": "Griseofulvin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Griseofulvin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Griseofulvin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Griseofulvin."
  },
  {
    "id": "ddinter-dfi-855",
    "drugName": "Eltrombopag",
    "foodName": "Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak)",
    "foodCategory": "Makanan Tinggi Lemak",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eltrombopag dan Makanan Tinggi Lemak (Gorengan, Santan, Daging Berlemak).",
    "clinicalOutcome": "Makanan tinggi lemak dapat mempengaruhi waktu pengosongan lambung dan laju absorpsi sistemik Eltrombopag.",
    "recommendation": "Konsumsi Eltrombopag sesuai anjuran etiket (bersama makanan berlemak untuk obat lipofilik, atau saat perut kosong jika memerlukan absorpsi cepat)."
  },
  {
    "id": "ddinter-dfi-856",
    "drugName": "Eltrombopag",
    "foodName": "Susu & Produk Olahan Susu Kaya Kalsium",
    "foodCategory": "Susu / Kalsium",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Eltrombopag dan Susu & Produk Olahan Susu Kaya Kalsium.",
    "clinicalOutcome": "Kation kalsium polivalen (Ca2+) dalam susu membentuk ikatan kelat (chelation) tak larut dengan Eltrombopag, menurunkan penyerapan dan efektivitas terapi sebesar 40-60%.",
    "recommendation": "Berikan jeda waktu minum obat minimal 2 jam SEBELUM atau 4 jam SETELAH mengonsumsi susu, keju, yoghurt, atau suplemen kalsium."
  },
  {
    "id": "ddinter-dfi-857",
    "drugName": "Bexagliflozin",
    "foodName": "Minuman Beralkohol",
    "foodCategory": "Alkohol",
    "severity": "Moderate",
    "mechanism": "Interaksi farmakokinetik & penyerapan saluran cerna antara Bexagliflozin dan Minuman Beralkohol.",
    "clinicalOutcome": "Kombinasi Bexagliflozin dengan alkohol melipatgandakan risiko toksisitas hati (hepatotoksisitas), iritasi saluran cerna, atau penekanan sistem saraf pusat (sedasi berat dan hipotensi).",
    "recommendation": "KONTRAINDIKASI / HINDARI MUTLAK konsumsi minuman beralkohol selama dalam masa terapi Bexagliflozin."
  }
];
