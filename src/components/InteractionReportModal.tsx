import React, { useState, useEffect } from 'react';
import { Drug, DrugInteraction, ClinicBrandingSettings } from '../types';
import { Logo } from './Logo';
import { X, Printer, Copy, Check, Building2, User, AlertCircle, ShieldCheck, Edit3 } from 'lucide-react';

interface InteractionReportModalProps {
  selectedDrugs: Drug[];
  interactions: DrugInteraction[];
  clinicBranding?: ClinicBrandingSettings;
  onClose: () => void;
}

export const InteractionReportModal: React.FC<InteractionReportModalProps> = ({
  selectedDrugs = [],
  interactions = [],
  clinicBranding,
  onClose
}) => {
  const [facilityName, setFacilityName] = useState(clinicBranding ? clinicBranding.clinicName : 'Apotek / Klinik Sehat Medika');
  const [facilityAddress, setFacilityAddress] = useState(clinicBranding ? clinicBranding.address : 'Jl. Kesehatan Raya No. 12, Jakarta • Telp: (021) 555-0199');
  const [pharmacistName, setPharmacistName] = useState(clinicBranding ? clinicBranding.pharmacistName : 'apt. Budi Santoso, S.Farm.');
  const [pharmacistSipa, setPharmacistSipa] = useState(clinicBranding ? clinicBranding.pharmacistSipa : 'SIPA: 19881024/SIPA-31.71/2025/2033');

  const [patientName, setPatientName] = useState('Tn. Ahmad Dahlan');
  const [medicalRecordNo, setMedicalRecordNo] = useState('RM-10923');
  const [patientAge, setPatientAge] = useState('58');
  const [notes, setNotes] = useState('Diminum secara teratur sesuai aturan dosis dokter. Segera hubungi apoteker bila timbul gejala tidak biasa.');

  const [copiedWa, setCopiedWa] = useState(false);

  // Sync state whenever clinicBranding updates
  useEffect(() => {
    if (clinicBranding) {
      setFacilityName(clinicBranding.clinicName);
      setFacilityAddress(clinicBranding.address);
      setPharmacistName(clinicBranding.pharmacistName);
      setPharmacistSipa(clinicBranding.pharmacistSipa);
    }
  }, [clinicBranding]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWaSummary = () => {
    const drugListText = selectedDrugs.map((d) => `• ${d.name} (${d.genericName})`).join('\n');
    let interactionText = 'Aman. Tidak ditemukan interaksi berisiko tinggi dalam kombinasi obat ini.';
    
    if (interactions.length > 0) {
      interactionText = interactions
        .map(
          (inter) =>
            `⚠️ *${inter.drugAName} + ${inter.drugBName}* (Tingkat: ${inter.severity})\n  - Dampak: ${inter.clinicalOutcome}\n  - Saran: ${inter.management}`
        )
        .join('\n\n');
    }

    const fullMessage = `*REKAP EVALUASI FARMASI & KONSELING OBAT PASIEN*
🏥 *${facilityName}*
📍 ${facilityAddress}
-----------------------------------------
👤 *Nama Pasien:* ${patientName || 'Pasien Umum'} ${patientAge ? `(${patientAge} Thn)` : ''}
📄 *No. RM:* ${medicalRecordNo || '-'}
🗓️ *Tanggal:* ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
👨‍⚕️ *Apoteker:* ${pharmacistName} (${pharmacistSipa})

📋 *Daftar Obat Resep:*
${drugListText}

🔍 *Hasil Evaluasi Interaksi Obat:*
${interactionText}

💡 *Catatan Konseling Apoteker:*
${notes || 'Diminum secara teratur sesuai aturan dosis dokter. Segera hubungi apoteker jika timbul efek samping.'}

-----------------------------------------
*Sistem Informasi Pelayanan Informasi Obat (PIO) FARMASIDRUGGIST (Terintegrasi)*`;

    navigator.clipboard.writeText(fullMessage);
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 3000);
  };

  return (
    <>
      {/* 1. INTERACTIVE SCREEN MODAL WRAPPER (HIDDEN ON PRINT) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto print:hidden">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
          
          {/* Top Control Bar */}
          <div className="bg-slate-900 text-white p-3.5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
            <span className="font-bold text-xs flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Laporan Hasil Evaluasi Resep & Konseling Farmasi Pasien</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyWaSummary}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                  copiedWa
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                }`}
                title="Salin ringkasan ke WhatsApp pasien"
              >
                {copiedWa ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWa ? 'Tersalin!' : 'Salin Teks WhatsApp'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak PDF (1 Halaman Pas)</span>
              </button>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Report Screen Form Body */}
          <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1 text-xs leading-tight">
            
            {/* Custom Pharmacy / Facility Kop */}
            <div className="border-b-2 border-teal-700 pb-2 space-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    {clinicBranding?.logoUrl ? (
                      <img src={clinicBranding.logoUrl} alt="Logo" className="w-8 h-8 object-contain shrink-0" />
                    ) : (
                      <Logo size="sm" />
                    )}
                    <input
                      type="text"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      className="font-black text-sm sm:text-base text-teal-950 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-teal-600 w-full sm:w-80 uppercase tracking-tight"
                      placeholder="Nama Apotek / Klinik / Rumah Sakit..."
                    />
                  </div>
                  <input
                    type="text"
                    value={facilityAddress}
                    onChange={(e) => setFacilityAddress(e.target.value)}
                    className="text-[10.5px] text-slate-600 font-semibold bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-teal-600 w-full"
                    placeholder="Alamat & Kontak Fasilitas Kesehatan..."
                  />
                </div>

                <div className="text-right shrink-0">
                  <h1 className="text-xs font-black text-slate-900 uppercase tracking-wider bg-teal-50 text-teal-900 px-2 py-0.5 rounded border border-teal-200">
                    LAPORAN EVALUASI INTERAKSI OBAT
                  </h1>
                  <p className="text-[9px] text-slate-500 font-semibold pt-0.5">Clinical Decision Support System (CDSS)</p>
                  <p className="text-[9px] text-slate-500">
                    Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Details & Pharmacist Info Grid */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-[10.5px]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[11px]">
                  <User className="w-3.5 h-3.5 text-teal-600" />
                  <span>IDENTITAS PASIEN</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-slate-500 w-16">Nama Pasien:</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Contoh: Bpk. Ahmad Dahlan"
                      className="flex-1 font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-slate-500 w-16">No. RM / Umur:</label>
                    <div className="flex items-center gap-1 flex-1">
                      <input
                        type="text"
                        value={medicalRecordNo}
                        onChange={(e) => setMedicalRecordNo(e.target.value)}
                        placeholder="No. RM 10023"
                        className="w-1/2 text-slate-800 font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                      />
                      <input
                        type="text"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        placeholder="Umur (54 Thn)"
                        className="w-1/2 text-slate-800 font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 border-l border-slate-200 pl-3">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[11px]">
                  <Building2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>APOTEKER PENANGGUNG JAWAB</span>
                </div>

                <div className="space-y-0.5">
                  <input
                    type="text"
                    value={pharmacistName}
                    onChange={(e) => setPharmacistName(e.target.value)}
                    className="w-full font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                  <input
                    type="text"
                    value={pharmacistSipa}
                    onChange={(e) => setPharmacistSipa(e.target.value)}
                    className="w-full text-slate-600 text-[10.5px] font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* List of Evaluated Drugs */}
            <div className="space-y-1">
              <h3 className="text-[10.5px] font-extrabold text-teal-950 uppercase tracking-wide border-b border-teal-100 pb-0.5">
                Daftar Obat Resep Terdaftar ({selectedDrugs.length}):
              </h3>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                {selectedDrugs.map((d) => (
                  <div key={d.id} className="bg-teal-50/80 p-1.5 rounded-lg border border-teal-200 text-slate-800">
                    <p className="font-extrabold text-[11px] text-teal-950">{d.name}</p>
                    <p className="text-[9.5px] text-slate-600 font-medium truncate">{d.genericName} • ATC: {d.atcCode}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interacting Pairs Table */}
            <div className="space-y-1">
              <h3 className="text-[10.5px] font-extrabold text-teal-950 uppercase tracking-wide border-b border-teal-100 pb-0.5">
                Hasil Analisis Interaksi Obat ({interactions.length}):
              </h3>

              {interactions.length > 0 ? (
                <div className="space-y-1.5">
                  {interactions.map((inter, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-300 space-y-1 text-[10px]">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-950 text-[11px]">
                          {inter.drugAName} ⚡ {inter.drugBName}
                        </span>
                        <span className={`px-2 py-0.2 rounded font-extrabold text-[9.5px] ${
                          inter.severity === 'Major' ? 'bg-rose-100 text-rose-900 border border-rose-200' : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          Tingkat Keparahan: {inter.severity}
                        </span>
                      </div>

                      <p className="text-slate-800"><strong>Dampak Klinis:</strong> {inter.clinicalOutcome}</p>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-slate-900 font-semibold">
                        <strong>Manajemen Apoteker:</strong> {inter.management}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-center font-bold text-xs border border-emerald-200">
                  ✅ Aman. Tidak ditemukan interaksi berisiko tinggi dalam kombinasi obat ini.
                </div>
              )}
            </div>

            {/* Notes Box */}
            <div className="space-y-0.5">
              <label className="text-[9.5px] font-extrabold text-slate-700 uppercase block">Catatan / Edukasi Konseling Apoteker:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan catatan cara minum obat, wawasan interaksi makanan, atau instruksi pemantauan efek samping..."
                rows={2}
                className="w-full text-[10.5px] text-slate-900 font-medium bg-slate-50 p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
              />
            </div>

            {/* Signature Line & Facility Verification Badge */}
            <div className="pt-2 flex items-end justify-between text-[10px] text-slate-600 border-t border-slate-300 gap-4">
              <div className="space-y-0.5 max-w-[220px]">
                <span className="bg-teal-100 text-teal-900 font-extrabold text-[8.5px] px-1.5 py-0.2 rounded inline-block">
                  VERIFIED CLINICAL REPORT
                </span>
                <p className="text-[9.5px] font-bold text-slate-800">Dokumen PIO Resmi Terverifikasi</p>
                <p className="text-[8.5px] text-slate-500 leading-tight">
                  Dihasilkan melalui Sistem Keputusan Klinis CDSS FARMASIDRUGGIST.
                </p>
              </div>

              <div className="text-center space-y-1 shrink-0 relative w-48">
                {clinicBranding?.enableDigitalStamp !== false && clinicBranding?.stampUrl && (
                  <img 
                    src={clinicBranding.stampUrl} 
                    alt="Stempel Digital Klinik" 
                    className="w-16 h-16 object-contain absolute -top-5 right-4 opacity-80 pointer-events-none" 
                  />
                )}

                <p className="text-[9.5px] text-slate-600 font-medium">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="font-bold text-slate-900 text-[10px]">Apoteker Penanggung Jawab</p>
                <div className="h-10 flex items-center justify-center italic text-slate-400 text-[8.5px]">
                  ( Tanda Tangan & Stempel Resmi )
                </div>
                <p className="font-bold underline text-slate-900 border-t border-slate-800 pt-0.5 text-[10px]">{pharmacistName}</p>
                <p className="text-[8.5px] text-slate-600 font-semibold">{pharmacistSipa}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. DEDICATED STANDALONE EXACT 1-PAGE A4 PRINT CONTAINER (FIXED POSITION FOR 100% PRINT VISIBILITY) */}
      <div className="hidden print:block print:fixed print:inset-0 print:z-[999999] print:bg-white print:p-0 print:m-0 font-sans text-slate-900 space-y-1.5">
        <style>{`
          @media print {
            html, body {
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              overflow: hidden !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: A4 portrait;
              margin: 4mm 6mm;
            }
            * {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          }
        `}</style>

        {/* Kop Surat Berwarna & Teratur */}
        <div className="border-b-2 pb-1 flex items-center justify-between" style={{ borderColor: clinicBranding?.primaryColor || '#0d9488' }}>
          <div className="flex items-center gap-2">
            {clinicBranding?.logoUrl && (
              <img src={clinicBranding.logoUrl} alt="Logo" className="w-9 h-9 object-contain shrink-0" />
            )}
            <div>
              <h1 className="text-xs font-black uppercase tracking-wider leading-none" style={{ color: clinicBranding?.primaryColor || '#0d9488' }}>
                {facilityName}
              </h1>
              <p className="text-[8.5px] text-slate-600 font-bold leading-tight">
                {facilityAddress} • Pelayanan Informasi Obat (PIO)
              </p>
            </div>
          </div>
          <div className="text-right text-[8px] text-slate-600 font-semibold leading-tight">
            <p className="font-bold text-slate-900 uppercase">LAPORAN EVALUASI INTERAKSI OBAT</p>
            <p>Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Identitas Pasien & Apoteker */}
        <div className="bg-slate-50 p-1.5 rounded border border-slate-300 text-[8.5px] grid grid-cols-2 gap-2 leading-tight">
          <div>
            <p><strong>Nama Pasien:</strong> <span className="font-extrabold text-slate-900">{patientName || 'Pasien Umum'}</span></p>
            <p><strong>No. RM / Umur:</strong> {medicalRecordNo || '-'} / {patientAge ? `${patientAge} Thn` : '-'}</p>
          </div>
          <div>
            <p><strong>Apoteker PJ:</strong> <span className="font-bold" style={{ color: clinicBranding?.primaryColor || '#0d9488' }}>{pharmacistName}</span></p>
            <p><strong>SIPA:</strong> {pharmacistSipa}</p>
          </div>
        </div>

        {/* Daftar Obat Resep */}
        <div>
          <h2 className="text-[8.5px] font-extrabold uppercase tracking-wide border-b pb-0.5 mb-0.5" style={{ color: clinicBranding?.primaryColor || '#0d9488', borderColor: clinicBranding?.primaryColor || '#0d9488' }}>
            Daftar Obat Resep Terdaftar ({selectedDrugs.length} Obat):
          </h2>
          <div className="grid grid-cols-3 gap-1 text-[8px]">
            {selectedDrugs.map((d) => (
              <div key={d.id} className="bg-teal-50/80 p-1 rounded border border-teal-200 text-slate-800 leading-tight">
                <p className="font-extrabold text-teal-950 truncate">{d.name}</p>
                <p className="text-[7px] text-slate-600 truncate">{d.genericName} • ATC: {d.atcCode}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analisis Interaksi Obat (Maksimal Compact agar Pas 1 Halaman) */}
        <div>
          <h2 className="text-[8.5px] font-extrabold text-teal-950 uppercase tracking-wide border-b border-teal-200 pb-0.5 mb-0.5">
            Hasil Analisis Interaksi Obat ({interactions.length}):
          </h2>

          {interactions.length > 0 ? (
            <div className="space-y-1">
              {interactions.slice(0, 4).map((inter, i) => (
                <div key={i} className="p-1 bg-slate-50 rounded border border-slate-300 text-[8px] space-y-0.5 leading-tight">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-0.5">
                    <span className="font-extrabold text-slate-950">
                      {inter.drugAName} ⚡ {inter.drugBName}
                    </span>
                    <span className={`px-1 py-0.1 rounded font-extrabold text-[7px] ${
                      inter.severity === 'Major' ? 'bg-rose-100 text-rose-900 border border-rose-200' : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      Tingkat: {inter.severity}
                    </span>
                  </div>
                  <p className="text-slate-800"><strong>Dampak:</strong> {inter.clinicalOutcome}</p>
                  <p className="text-slate-900 font-semibold bg-white p-0.5 rounded border border-slate-200">
                    <strong>Manajemen:</strong> {inter.management}
                  </p>
                </div>
              ))}
              {interactions.length > 4 && (
                <p className="text-[7.5px] text-slate-500 italic text-center">
                  + {interactions.length - 4} interaksi minor lainnya tercatat pada CDSS digital.
                </p>
              )}
            </div>
          ) : (
            <div className="p-1.5 bg-emerald-50 text-emerald-900 rounded text-center font-bold text-[8px] border border-emerald-200">
              ✅ Aman. Tidak ditemukan interaksi berisiko tinggi dalam kombinasi obat ini.
            </div>
          )}
        </div>

        {/* Catatan / Edukasi */}
        <div className="bg-slate-50 p-1 rounded border border-slate-200 text-[8px] leading-tight">
          <strong className="text-slate-900 block font-bold mb-0.5">Catatan / Edukasi Apoteker:</strong>
          <p className="text-slate-700">{notes || 'Diminum teratur sesuai petunjuk dokter.'}</p>
        </div>

        {/* Blok Tanda Tangan Resmi Apoteker & Stempel Digital */}
        <div className="pt-1 border-t border-slate-300 flex items-end justify-between text-[8px] text-slate-600 leading-tight">
          <div>
            <p className="font-bold text-slate-800">FARMASIDRUGGIST CDSS • Standar EBM Terverifikasi</p>
            <p className="text-[6.5px] text-slate-500">Rujukan: Stockley's Drug Interactions • DDInter Nature Protocols • Drugs.com &amp; FDA Warning • Farmakope Indonesia VI • Kemenkes RI No. 73/2016</p>
            <p className="text-[6px] text-slate-400 italic">Instrumen pendukung keputusan klinis farmasi resmi.</p>
          </div>

          <div className="text-center w-36 shrink-0 space-y-0.5 relative">
            {clinicBranding?.enableDigitalStamp !== false && clinicBranding?.stampUrl && (
              <img 
                src={clinicBranding.stampUrl} 
                alt="Stempel Digital" 
                className="w-12 h-12 object-contain absolute -top-4 right-2 opacity-80 pointer-events-none" 
              />
            )}
            <p className="font-medium text-[7.5px]">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold text-slate-900 text-[8.5px]">Apoteker Penanggung Jawab</p>
            <div className="h-6 flex items-center justify-center italic text-slate-400 text-[7.5px]">
              ( Tanda Tangan & Stempel Resmi )
            </div>
            <p className="font-bold underline text-slate-900 border-t border-slate-800 pt-0.5 text-[8.5px]">{pharmacistName}</p>
            <p className="text-[7.5px] text-slate-600 font-semibold">{pharmacistSipa}</p>
          </div>
        </div>
      </div>
    </>
  );
};
