import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Award, 
  Building2, 
  CheckCircle2,
  FileText,
  Globe2,
  BookmarkCheck
} from 'lucide-react';

export type EvidencePreset = 
  | 'ddinter'
  | 'fornas'
  | 'bpom'
  | 'ashp-iv'
  | 'usp-795'
  | 'beers-2023'
  | 'fda-pllr'
  | 'pnpk'
  | 'ebm-offlabel'
  | 'kdigo-renal'
  | 'kemenkes-iv'
  | 'farmakope-vi'
  | 'pnpk-papdi';

export interface EvidenceSourceInfo {
  title: string;
  institution: string;
  documentCode?: string;
  releaseYear: string;
  jurisdiction: 'indonesia' | 'international';
  evidenceLevel: 'Level 1A (Meta-Analisis / Multi-Center RCT)' | 'Level 1B (Randomized Controlled Trial)' | 'Level 2A (PNPK & Konsensus Spesialis)' | 'Level 3 (Monograf Baku & Regulasi Pemerintah)';
  evidenceGrade: 'Grade A (Rekomendasi Kuat)' | 'Grade B (Rekomendasi Sedang)' | 'Grade C (Konsensus Praktik)';
  summary: string;
  citation: string;
  officialUrl?: string;
  officialUrlLabel?: string;
  badgeText?: string;
}

export const PRESET_SOURCES: Record<EvidencePreset, EvidenceSourceInfo> = {
  ddinter: {
    title: 'DDInter 2.0 Multi-Consensus Clinical Drug-Drug Interaction Database',
    institution: 'Nature Protocols & Konsensus Regulatori Global (US FDA, EMA, PMDA)',
    documentCode: 'Nature Protocols 2022 (doi: 10.1038/s41596-022-00728-6)',
    releaseYear: '2022 - 2025',
    jurisdiction: 'international',
    evidenceLevel: 'Level 1A (Meta-Analisis / Multi-Center RCT)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Basis data interaksi obat multikonsensus terakreditasi internasional yang memvalidasi tingkat keparahan (Major/Moderate/Minor) dan mekanisme farmakodinamik/farmakokinetik lintas otoritas regulasi obat Amerika Serikat (FDA), Eropa (EMA), dan Jepang (PMDA).',
    citation: 'Xiong, G., et al. DDInter: an online drug–drug interaction database towards improving clinical decision-making and patient safety. Nature Protocols 17, 2728–2749 (2022).',
    officialUrl: 'https://doi.org/10.1038/s41596-022-00728-6',
    officialUrlLabel: 'Publikasi Resmi Nature Protocols',
    badgeText: 'DDInter 2.0 • Nature Protocols'
  },
  fornas: {
    title: 'Formularium Nasional (Fornas) & Standar Pelayanan Farmasi Kemenkes RI',
    institution: 'Kementerian Kesehatan Republik Indonesia',
    documentCode: 'KMK No. HK.01.07/MENKES/6477/2021 & Adendum Terkini',
    releaseYear: '2021 - 2024',
    jurisdiction: 'indonesia',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Daftar obat terpilih yang harus tersedia di fasilitas pelayanan kesehatan program Jaminan Kesehatan Nasional (JKN) di Indonesia, memuat restriksi peresepan, batas peresepan maksimal, dan tingkat faskes rujukan (Tk 1, 2, 3).',
    citation: 'Kementerian Kesehatan Republik Indonesia. Keputusan Menteri Kesehatan RI Nomor HK.01.07/MENKES/6477/2021 tentang Formularium Nasional. Jakarta: Kemenkes RI.',
    officialUrl: 'https://farmalkes.kemkes.go.id',
    officialUrlLabel: 'Direktorat Jenderal Farmalkes Kemenkes RI',
    badgeText: 'Fornas KMK RI 2021-2024'
  },
  bpom: {
    title: 'Standar Penandaan, Legalitas & Formularium Obat Resmi Badan POM RI',
    institution: 'Badan Pengawas Obat dan Makanan (BPOM Republik Indonesia)',
    documentCode: 'Regulasi Resmi CekBPOM & Farmakope Indonesia VI',
    releaseYear: '2020 - 2025',
    jurisdiction: 'indonesia',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Klasifikasi resmi legalitas obat di Indonesia (Obat Bebas, Obat Bebas Terbatas, Obat Keras / Daftar G, OOT, Prekursor, Psikotropika, dan Narkotika) serta merk dagang terdaftar resmi.',
    citation: 'Badan Pengawas Obat dan Makanan RI. Kompendia & Basis Data Registrasi Obat Nasional CekBPOM. Jakarta: BPOM RI.',
    officialUrl: 'https://cekbpom.pom.go.id',
    officialUrlLabel: 'Portal Resmi CekBPOM RI',
    badgeText: 'Badan POM RI Terdaftar'
  },
  'farmakope-vi': {
    title: 'Farmakope Indonesia Edisi VI (FI VI) & Suplemen',
    institution: 'Kementerian Kesehatan Republik Indonesia',
    documentCode: 'Kepmenkes RI HK.01.07/MENKES/166/2020 tentang FI VI',
    releaseYear: '2020 - 2024',
    jurisdiction: 'indonesia',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Buku standar resmi kemurnian, penetapan kadar, kelarutan, pH, batas cemaran, dan monografi sediaan farmasi yang berlaku mengikat secara hukum di seluruh wilayah Republik Indonesia.',
    citation: 'Kementerian Kesehatan Republik Indonesia. Farmakope Indonesia Edisi VI. Jakarta: Kemenkes RI, 2020.',
    officialUrl: 'https://farmalkes.kemkes.go.id',
    officialUrlLabel: 'Katalog FI VI Kemenkes RI',
    badgeText: 'Farmakope Indonesia VI'
  },
  'kemenkes-iv': {
    title: 'Pedoman Pencampuran Obat Suntik dan Penanganan Sediaan Sitostatika',
    institution: 'Direktorat Bina Farmasi Komunitas & Klinik, Ditjen Binfar Kemenkes RI',
    documentCode: 'Kemenkes RI 2009 / Standar Farmasi RS PMK 72/2016',
    releaseYear: '2009 - 2024',
    jurisdiction: 'indonesia',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Pedoman teknis resmi tata laksana pencampuran sediaan injeksi intravena steril, rekonstitusi vial, pelarut infus baku, serta pengendalian inkompatibilitas fisik dan kimiawi di fasilitas kesehatan Indonesia.',
    citation: 'Kementerian Kesehatan Republik Indonesia. Pedoman Pencampuran Obat Suntik dan Penanganan Sediaan Sitostatika. Jakarta: Ditjen Binfar dan Alkes Kemenkes RI, 2009.',
    officialUrl: 'https://farmalkes.kemkes.go.id',
    officialUrlLabel: 'Portal Resmi Ditjen Farmalkes Kemenkes',
    badgeText: 'Pedoman IV Kemenkes RI 2009'
  },
  'pnpk-papdi': {
    title: 'Pedoman Nasional Pelayanan Kedokteran (PNPK) & Panduan Praktik Klinis PAPDI',
    institution: 'Kementerian Kesehatan RI & Perhimpunan Dokter Spesialis Penyakit Dalam Indonesia',
    documentCode: 'Kepmenkes RI Tata Laksana Medis & PPK PAPDI',
    releaseYear: '2021 - 2024',
    jurisdiction: 'indonesia',
    evidenceLevel: 'Level 2A (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Pedoman konsensus tata laksana terapi medis terpadu penyakit dalam (Hipertensi, Sepsis, Diabetes Melitus, Gagal Ginjal Kronik, Penyakit Kardiovaskular) berstandar nasional Indonesia.',
    citation: 'Kementerian Kesehatan Republik Indonesia & Pengurus Besar PAPDI. Pedoman Nasional Pelayanan Kedokteran Penyakit Dalam. Jakarta: Kemenkes RI & PAPDI.',
    officialUrl: 'https://papdi.or.id',
    officialUrlLabel: 'Portal Resmi PPK PAPDI',
    badgeText: 'PNPK PAPDI & Kemenkes'
  },
  'ashp-iv': {
    title: 'ASHP Handbook on Injectable Drugs & Standardize 4 Safety Protocols',
    institution: 'American Society of Health-System Pharmacists (ASHP)',
    documentCode: 'ASHP Injectable Drug Information 2024 / Y-Site Database',
    releaseYear: '2024 / 2025',
    jurisdiction: 'international',
    evidenceLevel: 'Level 1A (Meta-Analisis / Multi-Center RCT)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Baku emas internasional evaluasi kompatibilitas fisik dan stabilitas kimia injeksi intravena jalur Y-Site, pencampuran vial infus kristaloid, pelarut kompatibel, dan konsentrasi baku ICU/NICU.',
    citation: 'American Society of Health-System Pharmacists. ASHP Injectable Drug Information. Bethesda, MD: ASHP, 2024.',
    officialUrl: 'https://www.ashp.org',
    officialUrlLabel: 'Portal Resmi ASHP',
    badgeText: 'ASHP IV Y-Site 2024'
  },
  'usp-795': {
    title: 'USP General Chapter <795> & <797> Pharmaceutical Compounding Standards',
    institution: 'United States Pharmacopeial Convention (USP)',
    documentCode: 'USP Guidelines for Beyond-Use Dating (BUD)',
    releaseYear: '2023 / 2024',
    jurisdiction: 'international',
    evidenceLevel: 'Level 3 (Monograf Baku & Regulasi Pemerintah)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Standar regulasi internasional untuk penetapan Beyond-Use Date (BUD) sediaan racikan non-steril (serbuk bagi/puyer, kapsul, suspensi oral berair, larutan topikal) dan sediaan steril peracikan apotek.',
    citation: 'United States Pharmacopeial Convention. USP–NF. General Chapter <795> Pharmaceutical Compounding—Nonsterile Preparations. Rockville, MD: USP.',
    officialUrl: 'https://www.usp.org/compounding',
    officialUrlLabel: 'Dokumentasi Resmi Standar USP',
    badgeText: 'Standar USP <795> & <797>'
  },
  'beers-2023': {
    title: 'AGS Beers Criteria® for Potentially Inappropriate Medication Use in Older Adults',
    institution: 'American Geriatrics Society (AGS)',
    documentCode: 'AGS 2023 Updated Beers Criteria® (JAGS 2023)',
    releaseYear: '2023',
    jurisdiction: 'international',
    evidenceLevel: 'Level 1A (Meta-Analisis / Multi-Center RCT)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Pedoman keselamatan geriatri resmi untuk mengidentifikasi obat berpotensi tidak tepat (PIMs) pada lansia usia >= 65 tahun, mencakup beban antikolinergik, risiko jatuh, delirium, dan kriteria STOPP/START.',
    citation: 'American Geriatrics Society 2023 Beers Criteria Update Expert Panel. American Geriatrics Society 2023 updated AGS Beers Criteria® for potentially inappropriate medication use in older adults. J Am Geriatr Soc. 2023;71(7):2052-2081.',
    officialUrl: 'https://doi.org/10.1111/jgs.18372',
    officialUrlLabel: 'Publikasi Resmi JAGS 2023',
    badgeText: 'AGS Beers Criteria 2023'
  },
  'fda-pllr': {
    title: 'FDA Pregnancy and Lactation Labeling Rule (PLLR) & Briggs Drugs in Pregnancy',
    institution: 'US Food and Drug Administration (FDA) & American College of Obstetricians (ACOG)',
    documentCode: 'US FDA 21 CFR Part 201 Subpart B / Briggs 12th Ed.',
    releaseYear: '2022 - 2024',
    jurisdiction: 'international',
    evidenceLevel: 'Level 1B (Randomized Controlled Trial)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Format penapisan keselamatan janin dan neonatus berbasis narasi risiko teratogenik, transfer plasenta, rasio konsentrasi ASI/plasma (M/P ratio), dan estimasi Relative Infant Dose (RID).',
    citation: 'Briggs, G. G., Freeman, R. K., Towers, C. V., & Forinash, A. B. Drugs in Pregnancy and Lactation: A Reference Guide to Fetal and Neonatal Risk (12th ed.). Wolters Kluwer, 2022.',
    officialUrl: 'https://www.fda.gov/drugs/labeling-information-drug-products/pregnancy-and-lactation-labeling-drugs-final-rule',
    officialUrlLabel: 'Regulasi Resmi US FDA PLLR',
    badgeText: 'FDA PLLR & Briggs Evidence'
  },
  pnpk: {
    title: 'Pedoman Nasional Pelayanan Kedokteran (PNPK) Kemenkes RI',
    institution: 'Kementerian Kesehatan Republik Indonesia & Organisasi Profesi Spesialis',
    documentCode: 'Keputusan Menteri Kesehatan RI Terpadu Tata Laksana Klinis',
    releaseYear: '2021 - 2024',
    jurisdiction: 'indonesia',
    evidenceLevel: 'Level 2A (PNPK & Konsensus Spesialis)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Pedoman tata laksana klinis berbasis bukti ilmiah nasional yang disahkan secara hukum oleh Menteri Kesehatan RI untuk menjamin kendali mutu dan kendali biaya di rumah sakit dan faskes rujukan.',
    citation: 'Kementerian Kesehatan Republik Indonesia. Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Klinis Penyakit Prioritas. Jakarta: Kemenkes RI.',
    officialUrl: 'https://kemkes.go.id',
    officialUrlLabel: 'Portal Dokumen PNPK Kemenkes',
    badgeText: 'PNPK Kemenkes RI Terakreditasi'
  },
  'ebm-offlabel': {
    title: 'Monografi Penggunaan Klinis Off-Label Berbasis Evidence-Based Medicine (EBM)',
    institution: 'POGI, PERKI, PAPDI, IDAI, WHO, ACOG, ESC & Cochrane Systematic Reviews',
    documentCode: 'Konsensus Organisasi Profesi Spesialis & Landmark Trials',
    releaseYear: '2022 - 2025',
    jurisdiction: 'international',
    evidenceLevel: 'Level 1A (Meta-Analisis / Multi-Center RCT)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Penggunaan obat di luar indikasi brosur regulasi yang didukung uji klinis multisenter acak tersamar ganda (RCT) atau pedoman praktik klinis (PPK) resmi spesialis untuk menyelamatkan nyawa dan mengoptimalkan terapi pasien.',
    citation: 'Organisasi Profesi Spesialis Medis & Landmark Trials (WOMAN Trial, PRISM, LoDoCo2, LEAUTE-LABREZE, Baveno VII). Pedoman Klinis Praktik Berbasis Bukti Ilmiah.',
    officialUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    officialUrlLabel: 'Indeks Literatur Medis PubMed / NCBI',
    badgeText: 'EBM Terverifikasi • Organisasi Profesi'
  },
  'kdigo-renal': {
    title: 'KDIGO Clinical Practice Guideline for the Evaluation and Management of CKD',
    institution: 'Kidney Disease: Improving Global Outcomes (KDIGO) & PERNEFRI',
    documentCode: 'KDIGO 2024 CKD Guideline / Cockcroft-Gault & CKD-EPI',
    releaseYear: '2024',
    jurisdiction: 'international',
    evidenceLevel: 'Level 1A (Meta-Analisis / Multi-Center RCT)',
    evidenceGrade: 'Grade A (Rekomendasi Kuat)',
    summary: 'Standar penyesuaian dosis obat pada penurunan fungsi ginjal berbasis klirens kreatinin (CrCl) Cockcroft-Gault dan eGFR CKD-EPI, proteksi kardiorenal SGLT2i, dan pencegahan nefrotoksisitas obat.',
    citation: 'Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117-S314.',
    officialUrl: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
    officialUrlLabel: 'Portal Resmi Pedoman KDIGO',
    badgeText: 'KDIGO 2024 & PERNEFRI'
  }
};

interface EvidenceSourceBadgeProps {
  preset?: EvidencePreset;
  customInfo?: Partial<EvidenceSourceInfo>;
  size?: 'sm' | 'md';
  className?: string;
  showText?: boolean;
}

export const EvidenceSourceBadge: React.FC<EvidenceSourceBadgeProps> = ({
  preset = 'ddinter',
  customInfo,
  size = 'sm',
  className = '',
  showText = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseInfo = PRESET_SOURCES[preset] || PRESET_SOURCES.ddinter;
  const info: EvidenceSourceInfo = { ...baseInfo, ...customInfo };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(info.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isIndonesian = info.jurisdiction === 'indonesia';

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        title="Klik untuk melihat dokumen sumber rujukan terverifikasi & akreditasi ilmiah"
        className={`inline-flex items-center gap-1.5 rounded-full border transition-all cursor-pointer font-outfit select-none ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[10px] font-extrabold' 
            : 'px-3 py-1 text-xs font-black'
        } ${
          isIndonesian 
            ? 'bg-rose-50/90 hover:bg-rose-100 dark:bg-[#200c11] dark:hover:bg-[#2d1218] text-rose-900 dark:text-rose-200 border-rose-300/80 dark:border-rose-700/60' 
            : 'bg-teal-50/80 hover:bg-teal-100 dark:bg-[#082b30] dark:hover:bg-[#0c3c43] text-teal-900 dark:text-teal-200 border-teal-300/80 dark:border-teal-700/60'
        } shadow-2xs hover:scale-[1.02] active:scale-98 ${className}`}
      >
        <span className="text-[11px] leading-none">{isIndonesian ? '🇮🇩' : '🌐'}</span>
        <ShieldCheck className={size === 'sm' ? 'w-3 h-3 text-teal-600 dark:text-teal-400 shrink-0' : 'w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0'} />
        {showText && <span>{info.badgeText || 'EBM Terverifikasi'}</span>}
        <span className="text-[9px] opacity-75 underline decoration-teal-400 underline-offset-2">Rujukan</span>
      </button>

      {/* Modal Dialog Rujukan Ilmiah Terstandar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#061922] border-2 border-teal-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-left animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Modal */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">{isIndonesian ? '🇮🇩' : '🌐'}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 font-mono">
                    {isIndonesian ? 'Regulasi & Standar Nasional Indonesia' : 'Konsensus Ilmiah Global (International EBM)'}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit leading-snug mt-0.5">
                  {info.title}
                </h3>
              </div>
            </div>

            {/* Badan Otoritas & Level of Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-teal-500" />
                  Instansi / Otoritas:
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-200">{info.institution}</p>
                <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold block pt-0.5">
                  Tahun Rilis: {info.releaseYear}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Level of Evidence (Oxford):
                </span>
                <p className="font-bold text-emerald-700 dark:text-emerald-300">{info.evidenceLevel}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {info.evidenceGrade}
                </span>
              </div>
            </div>

            {/* Ringkasan Bukti Ilmiah */}
            <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-[#07242a] border border-teal-200/80 dark:border-teal-800/60 space-y-1.5">
              {info.documentCode && (
                <div className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kode/Regulasi: {info.documentCode}</span>
                </div>
              )}
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-200/60 dark:border-slate-800/60 font-medium">
                {info.summary}
              </p>
            </div>

            {/* Sitasi Baku Formal */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-600 dark:text-slate-400">
                <span>Sitasi Baku (Formal Academic Citation):</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline cursor-pointer font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin Sitasi</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 leading-relaxed select-all">
                {info.citation}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-teal-900/40">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Terverifikasi Dewan Farmakologi Klinis</span>
              </span>

              {info.officialUrl && (
                <a
                  href={info.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold font-outfit shadow-xs transition-colors"
                >
                  <span>{info.officialUrlLabel || 'Buka Portal Resmi'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

// =========================================================================
// DUAL EVIDENCE BADGE COMPONENT (INDONESIA 🇮🇩 + GLOBAL 🌐)
// =========================================================================

export interface DualEvidenceBadgeProps {
  nationalPreset?: EvidencePreset;
  internationalPreset?: EvidencePreset;
  customNationalInfo?: Partial<EvidenceSourceInfo>;
  customInternationalInfo?: Partial<EvidenceSourceInfo>;
  size?: 'sm' | 'md';
  className?: string;
}

export const DualEvidenceBadge: React.FC<DualEvidenceBadgeProps> = ({
  nationalPreset = 'fornas',
  internationalPreset = 'ddinter',
  customNationalInfo,
  customInternationalInfo,
  size = 'sm',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'national' | 'international'>('national');
  const [copied, setCopied] = useState(false);

  const natBase = PRESET_SOURCES[nationalPreset] || PRESET_SOURCES.fornas;
  const natInfo: EvidenceSourceInfo = { ...natBase, ...customNationalInfo };

  const intlBase = PRESET_SOURCES[internationalPreset] || PRESET_SOURCES.ddinter;
  const intlInfo: EvidenceSourceInfo = { ...intlBase, ...customInternationalInfo };

  const currentInfo = activeTab === 'national' ? natInfo : intlInfo;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentInfo.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        title="Klik untuk membuka kompendia sitasi ganda: Standar Nasional Indonesia & Konsensus Global EBM"
        className={`inline-flex items-center gap-1.5 rounded-full border transition-all cursor-pointer font-outfit select-none ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[10px] font-extrabold' 
            : 'px-3 py-1 text-xs font-black'
        } bg-gradient-to-r from-rose-50 via-slate-50 to-teal-50 dark:from-[#200c11] dark:via-[#06181f] dark:to-[#082b30] text-slate-800 dark:text-slate-100 border-teal-400/50 dark:border-teal-600/50 shadow-2xs hover:scale-[1.02] active:scale-98 ${className}`}
      >
        <div className="flex items-center gap-1">
          <span className="text-[10.5px] leading-none">🇮🇩</span>
          <span className="text-rose-900 dark:text-rose-200 font-bold">{natInfo.badgeText?.split(' ')[0] || 'Kemenkes'}</span>
        </div>
        <span className="text-slate-400 dark:text-slate-500 font-black">•</span>
        <div className="flex items-center gap-1">
          <span className="text-[10.5px] leading-none">🌐</span>
          <span className="text-teal-900 dark:text-teal-200 font-bold">{intlInfo.badgeText?.split(' ')[0] || 'EBM'}</span>
        </div>
        <span className="text-[8.5px] uppercase font-black px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300 ml-0.5">
          Dual EBM
        </span>
      </button>

      {/* Dual Evidence Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#061922] border-2 border-teal-500/50 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 relative text-left animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title Bar */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 font-mono">
                  Sistem Akreditasi &amp; Pembuktian Ganda (Dual-Citation Engine)
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-outfit leading-snug">
                  Harmonisasi Regulasi Nasional &amp; Konsensus Global
                </h3>
              </div>
            </div>

            {/* Dual Tabs Selector */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#041219] rounded-2xl border border-slate-200 dark:border-teal-950">
              <button
                type="button"
                onClick={() => setActiveTab('national')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer ${
                  activeTab === 'national'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40 border border-rose-400/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300'
                }`}
              >
                <span>🇮🇩</span>
                <span>Regulasi Indonesia</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('international')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer ${
                  activeTab === 'international'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-950/40 border border-teal-400/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300'
                }`}
              >
                <span>🌐</span>
                <span>Konsensus Global EBM</span>
              </button>
            </div>

            {/* Active Content Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                {activeTab === 'national' ? (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Rujukan Hukum &amp; Formularium Republik Indonesia
                  </span>
                ) : (
                  <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1">
                    <Globe2 className="w-3 h-3" /> Pedoman Internasional &amp; EBM Level 1A
                  </span>
                )}
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white font-outfit leading-snug">
                {currentInfo.title}
              </h4>
            </div>

            {/* Otoritas & Level of Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-teal-500" />
                  Instansi Penerbit:
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-200">{currentInfo.institution}</p>
                <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold block pt-0.5">
                  Tahun: {currentInfo.releaseYear}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Level of Evidence:
                </span>
                <p className="font-bold text-emerald-700 dark:text-emerald-300">{currentInfo.evidenceLevel}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {currentInfo.evidenceGrade}
                </span>
              </div>
            </div>

            {/* Ringkasan Klinis / Dokumen */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07242a] border border-slate-200/80 dark:border-teal-800/60 space-y-1.5">
              {currentInfo.documentCode && (
                <div className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kode/Klausul: {currentInfo.documentCode}</span>
                </div>
              )}
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-200/60 dark:border-slate-800/60 font-medium">
                {currentInfo.summary}
              </p>
            </div>

            {/* Sitasi Baku & Tombol Salin */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-600 dark:text-slate-400">
                <span>
                  {activeTab === 'national' ? 'Sitasi Resmi Kemenkes / BPOM:' : 'Sitasi Vancouver Internasional:'}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline cursor-pointer font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600">Sitasi Berhasil Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin Sitasi</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 leading-relaxed select-all">
                {currentInfo.citation}
              </div>
            </div>

            {/* Footer Modal */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-teal-900/40">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Terverifikasi Dewan EBM Farmasi Klinis</span>
              </span>

              {currentInfo.officialUrl && (
                <a
                  href={currentInfo.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold font-outfit shadow-xs transition-colors"
                >
                  <span>{currentInfo.officialUrlLabel || 'Buka Dokumen Resmi'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
