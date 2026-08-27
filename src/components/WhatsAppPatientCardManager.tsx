import React, { useState, useMemo } from 'react';
import { ClinicBrandingSettings, Drug } from '../types';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Printer, 
  Plus, 
  Trash2, 
  Sparkles, 
  Share2, 
  Clock, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Phone, 
  User, 
  Building2, 
  Pill, 
  Utensils, 
  ShieldAlert, 
  RotateCcw,
  ExternalLink,
  Smartphone,
  FileText
} from 'lucide-react';

interface PatientMedicationEntry {
  id: string;
  drugName: string;
  indicationLabel: string; // e.g. "Obat Tekanan Darah", "Antibiotik", "Obat Lambung"
  frequency: string; // "1 x sehari 1 tablet", "3 x sehari 1 kapsul"
  timing: string; // "Pagi hari", "Malam sebelum tidur", "Tiap 8 jam"
  mealRelation: 'sebelum' | 'bersama' | 'sesudah' | 'bebas';
  isAntibioticMustFinish: boolean;
  specialInstructions?: string; // e.g. "Kocok dahulu", "Simpan di kulkas"
  foodPrecautions?: string; // e.g. "Hindari susu/teh", "Kurangi makanan asin"
}

interface WhatsAppPatientCardManagerProps {
  clinicBranding: ClinicBrandingSettings;
  onOpenBrandingModal: () => void;
  drugs?: Drug[];
}

export const WhatsAppPatientCardManager: React.FC<WhatsAppPatientCardManagerProps> = ({
  clinicBranding,
  onOpenBrandingModal,
  drugs = []
}) => {
  // Patient details state
  const [patientName, setPatientName] = useState<string>('Bpk. Hendra Wijaya');
  const [patientPhone, setPatientPhone] = useState<string>('081234567890');
  const [patientGender, setPatientGender] = useState<'L' | 'P'>('L');
  const [patientAge, setPatientAge] = useState<string>('54 th');
  const [generalDoctorNotes, setGeneralDoctorNotes] = useState<string>('Kontrol kembali jika obat habis atau keluhan berlanjut.');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [activePreviewMode, setActivePreviewMode] = useState<'whatsapp' | 'card'>('whatsapp');

  // Medication list state
  const [medications, setMedications] = useState<PatientMedicationEntry[]>([
    {
      id: 'med-1',
      drugName: 'Amlodipine 10 mg',
      indicationLabel: 'Obat Penurun Tekanan Darah',
      frequency: '1 x sehari 1 tablet',
      timing: 'Pagi hari setelah sarapan (pada jam yang sama)',
      mealRelation: 'sesudah',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum teratur setiap hari walau tensi sudah normal',
      foodPrecautions: 'Kurangi konsumsi garam dan hindari jus grapefruit'
    },
    {
      id: 'med-2',
      drugName: 'Metformin 500 mg',
      indicationLabel: 'Obat Pengontrol Gula Darah',
      frequency: '3 x sehari 1 tablet',
      timing: 'Bersama suapan makan pagi, siang, dan malam',
      mealRelation: 'bersama',
      isAntibioticMustFinish: false,
      specialInstructions: 'Minum bersama makanan untuk mencegah rasa mual',
      foodPrecautions: 'Batasi asupan karbohidrat tinggi gula'
    },
    {
      id: 'med-3',
      drugName: 'Cefixime 100 mg',
      indicationLabel: 'Antibiotik Saluran Napas',
      frequency: '2 x sehari 1 kapsul',
      timing: 'Tiap 12 jam (pagi dan malam)',
      mealRelation: 'sesudah',
      isAntibioticMustFinish: true,
      specialInstructions: 'WAJIB DIHABISKAN selama 5 hari berturut-turut',
      foodPrecautions: 'Hindari konsumsi bersamaan dengan susu kalsium tinggi'
    }
  ]);

  // Clean and sanitize phone number to International Indonesian format 628xxx
  const sanitizedWhatsAppPhone = useMemo(() => {
    let cleaned = patientPhone.replace(/\D/g, ''); // strip non-digits
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8')) {
      cleaned = '62' + cleaned;
    }
    return cleaned;
  }, [patientPhone]);

  // Preset Template loader
  const handleLoadPreset = (presetType: 'hipertensi' | 'diabetes' | 'ispa' | 'gerd' | 'diare_anak') => {
    switch (presetType) {
      case 'hipertensi':
        setPatientName('Ibu Ratna (60 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Candesartan 16 mg',
            indicationLabel: 'Obat Penurun Tekanan Darah (ARB)',
            frequency: '1 x sehari 1 tablet',
            timing: 'Pagi hari sesudah sarapan',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Minum teratur setiap hari pada jam yang sama',
            foodPrecautions: 'Hindari suplemen kalium atau garam diet kalium tinggi'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Amlodipine 5 mg',
            indicationLabel: 'Obat Penurun Tekanan Darah (CCB)',
            frequency: '1 x sehari 1 tablet',
            timing: 'Malam hari sebelum tidur',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Dapat menimbulkan bengkak ringan di pergelangan kaki',
            foodPrecautions: 'Hindari jus grapefruit/jeruk bali'
          }
        ]);
        break;
      case 'diabetes':
        setPatientName('Bpk. Sugeng (52 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Metformin 500 mg',
            indicationLabel: 'Obat Gula Darah Utama',
            frequency: '2 x sehari 1 tablet',
            timing: 'Saat suapan pertama sarapan dan makan malam',
            mealRelation: 'bersama',
            isAntibioticMustFinish: false,
            specialInstructions: 'Minum bersama makanan untuk mencegah nyeri lambung',
            foodPrecautions: 'Hindari minuman manis berkalori tinggi'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Glimepiride 2 mg',
            indicationLabel: 'Pemicu Sekresi Insulin',
            frequency: '1 x sehari 1 tablet',
            timing: 'Sesaat sebelum sarapan pagi',
            mealRelation: 'sebelum',
            isAntibioticMustFinish: false,
            specialInstructions: 'Pastikan sarapan setelah minum obat untuk mencegah gula darah anjlok (hipoglikemia)',
            foodPrecautions: 'Siapkan permen manis jika timbul keringat dingin/gemetar'
          }
        ]);
        break;
      case 'ispa':
        setPatientName('An. Dimas (7 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Amoxicillin Sirup 125 mg/5 mL',
            indicationLabel: 'Antibiotik Infeksi Bakteri',
            frequency: '3 x sehari 1 sendok takar (5 mL)',
            timing: 'Tiap 8 jam (pagi, siang, malam)',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: true,
            specialInstructions: 'HABISKAN selama 5-7 hari meski gejala sudah membaik',
            foodPrecautions: 'Kocok botol dahulu sebelum diminum'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Paracetamol Sirup 120 mg/5 mL',
            indicationLabel: 'Pereda Demam & Nyeri',
            frequency: '3-4 x sehari 1 sendok takar (5 mL)',
            timing: 'Hanya diminum saat anak demam (>38°C)',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Beri jeda minimal 4 jam antar dosis',
            foodPrecautions: 'Perbanyak minum air putih hangat'
          },
          {
            id: `med-${Date.now()}-3`,
            drugName: 'Ambroxol Sirup 15 mg/5 mL',
            indicationLabel: 'Pengencer Dahak Batuk',
            frequency: '3 x sehari 1/2 sendok takar (2.5 mL)',
            timing: 'Pagi, siang, dan malam sesudah makan',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: false,
            specialInstructions: 'Bantu dengan banyak minum air hangat'
          }
        ]);
        break;
      case 'gerd':
        setPatientName('Ibu Maya (36 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Lansoprazole 30 mg',
            indicationLabel: 'Pencegah Produksi Asam Lambung (PPI)',
            frequency: '1 x sehari 1 kapsul',
            timing: 'Pagi hari 30 - 60 menit SEBELUM sarapan',
            mealRelation: 'sebelum',
            isAntibioticMustFinish: false,
            specialInstructions: 'Telan utuh kapsul dengan air putih, jangan dikunyah',
            foodPrecautions: 'Hindari kopi, makanan pedas, dan berlemak'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Sukralfat Suspensi 500 mg/5 mL',
            indicationLabel: 'Pelapis Dinding Lambung',
            frequency: '3 x sehari 2 sendok takar (10 mL)',
            timing: '1 jam sebelum makan atau 2 jam sesudah makan',
            mealRelation: 'sebelum',
            isAntibioticMustFinish: false,
            specialInstructions: 'Kocok dahulu sebelum diminum. Beri jeda 1 jam dengan obat lain'
          }
        ]);
        break;
      case 'diare_anak':
        setPatientName('An. Sifa (2 th)');
        setMedications([
          {
            id: `med-${Date.now()}-1`,
            drugName: 'Oralit Sachet (200 mL)',
            indicationLabel: 'Cairan Rehidrasi Pengganti Elektrolit',
            frequency: 'Setiap kali anak buang air cair',
            timing: 'Berikan 1/2 hingga 1 gelas (100-200 mL) bertahap dengan sendok',
            mealRelation: 'bebas',
            isAntibioticMustFinish: false,
            specialInstructions: 'Larutkan 1 sachet dalam 200 mL air matang'
          },
          {
            id: `med-${Date.now()}-2`,
            drugName: 'Zinc Dispersible Tablet 20 mg',
            indicationLabel: 'Regenerasi Dinding Usus Anak',
            frequency: '1 x sehari 1 tablet selama 10 hari',
            timing: 'Pagi hari sesudah makan',
            mealRelation: 'sesudah',
            isAntibioticMustFinish: true,
            specialInstructions: 'WAJIB DIMINUM 10 HARI BERTURUT-TURUT MESKI DIARE SUDAH BERHENTI',
            foodPrecautions: 'Larutkan tablet dalam 1 sendok air matang atau ASI'
          }
        ]);
        break;
    }
  };

  // Add Medication Row
  const handleAddMedication = () => {
    const newEntry: PatientMedicationEntry = {
      id: `med-${Date.now()}`,
      drugName: 'Nama Obat Baru',
      indicationLabel: 'Kegunaan Obat',
      frequency: '3 x sehari 1 tablet',
      timing: 'Pagi, siang, dan malam',
      mealRelation: 'sesudah',
      isAntibioticMustFinish: false
    };
    setMedications([...medications, newEntry]);
  };

  // Remove Medication Row
  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  // Update Medication Field
  const handleUpdateMedication = (id: string, field: keyof PatientMedicationEntry, value: any) => {
    setMedications(medications.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  // Generate WhatsApp Message Text
  const generatedWhatsAppText = useMemo(() => {
    const clinicName = clinicBranding?.clinicName || 'APOTEK & KLINIK SEHAT';
    const clinicPhone = clinicBranding?.phone || '';
    const pharmacistName = clinicBranding?.pharmacistName || 'Apoteker Penanggung Jawab';
    const sipaNumber = (clinicBranding?.pharmacistSipa || clinicBranding?.sipNumber) ? `SIPA: ${clinicBranding?.pharmacistSipa || clinicBranding?.sipNumber}` : '';
    const address = clinicBranding?.address || '';

    let text = `🏥 *${clinicName.toUpperCase()}*\n`;
    if (address) text += `📍 ${address}\n`;
    if (sipaNumber) text += `📜 ${sipaNumber}\n`;
    text += `👨‍⚕️ *Apoteker*: ${pharmacistName}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Halo *${patientName}* 👋\n`;
    text += `Terima kasih telah berkunjung ke fasilitas kami. Berikut adalah panduan dan pengingat resmi aturan minum obat Anda:\n\n`;

    text += `💊 *DAFTAR OBAT & ATURAN PAKAI:*\n\n`;

    medications.forEach((med, idx) => {
      text += `${idx + 1}. *${med.drugName}* ${med.indicationLabel ? `_(${med.indicationLabel})_` : ''}\n`;
      text += `   • *Aturan*: ${med.frequency}\n`;
      text += `   • *Waktu*: ${med.timing}\n`;

      let mealText = '';
      if (med.mealRelation === 'sebelum') mealText = 'Diminum 30-60 menit SEBELUM makan';
      else if (med.mealRelation === 'bersama') mealText = 'Diminum BERSAMA suapan makanan';
      else if (med.mealRelation === 'sesudah') mealText = 'Diminum SESUDAH makan';
      else mealText = 'Dapat diminum dengan atau tanpa makanan';
      text += `   • *Hubungan Makan*: ${mealText}\n`;

      if (med.isAntibioticMustFinish) {
        text += `   • ⚠️ *PERINGATAN: WAJIB DIHABISKAN sesuai durasi dokter!*\n`;
      }
      if (med.specialInstructions) {
        text += `   • 💡 *Petunjuk*: ${med.specialInstructions}\n`;
      }
      if (med.foodPrecautions) {
        text += `   • 🚫 *Pantangan*: ${med.foodPrecautions}\n`;
      }
      text += `\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🏠 *CARA PENYIMPANAN OBAT YANG BENAR:*\n`;
    text += `• Simpan di tempat sejuk (<25°C), kering, dan terhindar dari sinar matahari langsung.\n`;
    text += `• Jauhkan dari jangkauan anak-anak.\n`;
    text += `• Jangan simpan obat sirup/tablet di tempat lembap (seperti kamar mandi atau dekat kompor).\n\n`;

    if (generalDoctorNotes) {
      text += `📌 *Catatan Apoteker/Dokter*:\n${generalDoctorNotes}\n\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Jika ada pertanyaan mengenai aturan pakai atau timbul keluhan efek samping, silakan langsung membalas pesan WhatsApp ini.\n\n`;
    text += `Semoga lekas sembuh dan sehat selalu! 🙏✨`;

    return text;
  }, [clinicBranding, patientName, medications, generalDoctorNotes]);

  // Open Direct WhatsApp Link
  const handleOpenWhatsAppDirect = () => {
    const encodedText = encodeURIComponent(generatedWhatsAppText);
    const targetUrl = `https://wa.me/${sanitizedWhatsAppPhone}?text=${encodedText}`;
    window.open(targetUrl, '_blank');
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedWhatsAppText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Trigger Print View
  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
          <MessageSquare className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-100 backdrop-blur-md border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Pelayanan Informasi Obat (PIO) & Edukasi Digital
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
              Standar Permenkes 73/2016
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Kartu PIO Pasien Siap Kirim via WhatsApp
          </h1>
          <p className="mt-2 text-emerald-100 text-sm md:text-base leading-relaxed">
            Buat ringkasan jadwal aturan minum obat yang rapi, pantangan makanan, dan instruksi penyimpanan, lalu kirimkan langsung ke WhatsApp pasien hanya dengan 1 kali klik!
          </p>
        </div>
      </div>

      {/* QUICK TEMPLATES PRESETS */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Template Resep Cepat:
        </span>
        <button
          onClick={() => handleLoadPreset('hipertensi')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white transition"
        >
          🫀 Paket Hipertensi
        </button>
        <button
          onClick={() => handleLoadPreset('diabetes')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white transition"
        >
          🩸 Paket Diabetes
        </button>
        <button
          onClick={() => handleLoadPreset('ispa')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white transition"
        >
          🤧 Paket Batuk Pilek / ISPA
        </button>
        <button
          onClick={() => handleLoadPreset('gerd')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white transition"
        >
          🔥 Paket Maag / GERD
        </button>
        <button
          onClick={() => handleLoadPreset('diare_anak')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white transition"
        >
          👶 Paket Diare Anak (Zinc + Oralit)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: EDITOR FORM */}
        <div className="lg:col-span-6 space-y-6">
          {/* Patient Details Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Informasi Pasien Penerima Edukasi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nama Pasien</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="cth. Bpk. Hendra"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Nomor WhatsApp Pasien <span className="text-emerald-400 font-bold">*Wajib</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm font-semibold text-emerald-400 focus:outline-none focus:border-emerald-500"
                    placeholder="081234567890"
                  />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Format tujuan: <strong>+{sanitizedWhatsAppPhone}</strong>
                </span>
              </div>
            </div>

            {/* Clinic Branding Indicator */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <div className="text-xs">
                  <span className="text-slate-300 font-semibold">{clinicBranding.clinicName || 'Apotek Anda'}</span>
                  <span className="text-slate-500 block text-[11px]">{clinicBranding.pharmacistName || 'Apoteker Penanggung Jawab'} ({clinicBranding.pharmacistSipa || clinicBranding.sipNumber || 'SIPA'})</span>
                </div>
              </div>
              <button
                onClick={onOpenBrandingModal}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 transition"
              >
                Ubah Kop
              </button>
            </div>
          </div>

          {/* Medications Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-400" />
                Daftar Obat Pasien ({medications.length} Obat)
              </h3>
              <button
                onClick={handleAddMedication}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Obat
              </button>
            </div>

            <div className="space-y-4">
              {medications.map((med, idx) => (
                <div
                  key={med.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-emerald-400">
                      Obat #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveMedication(med.id)}
                      className="text-slate-500 hover:text-rose-400 transition p-1"
                      title="Hapus obat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Nama & Kekuatan Obat</label>
                      <input
                        type="text"
                        value={med.drugName}
                        onChange={(e) => handleUpdateMedication(med.id, 'drugName', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder="cth. Amlodipine 10 mg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Kegunaan / Indikasi Awam</label>
                      <input
                        type="text"
                        value={med.indicationLabel}
                        onChange={(e) => handleUpdateMedication(med.id, 'indicationLabel', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder="cth. Obat Darah Tinggi"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Aturan Pakai</label>
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) => handleUpdateMedication(med.id, 'frequency', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-300 font-semibold focus:outline-none focus:border-emerald-500"
                        placeholder="cth. 1 x sehari 1 tablet"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Hubungan dengan Makanan</label>
                      <select
                        value={med.mealRelation}
                        onChange={(e) => handleUpdateMedication(med.id, 'mealRelation', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="sesudah">Sesudah Makan</option>
                        <option value="sebelum">Sebelum Makan (30-60 mnt)</option>
                        <option value="bersama">Bersama Suapan Makan</option>
                        <option value="bebas">Bebas (Dapat dg/tanpa)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Waktu Minum Spesifik</label>
                      <input
                        type="text"
                        value={med.timing}
                        onChange={(e) => handleUpdateMedication(med.id, 'timing', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder="cth. Pagi hari"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={med.isAntibioticMustFinish}
                        onChange={(e) => handleUpdateMedication(med.id, 'isAntibioticMustFinish', e.target.checked)}
                        className="rounded accent-emerald-500 w-3.5 h-3.5"
                      />
                      <span className="text-amber-300 font-semibold text-[11px]">
                        ⚠️ Tandai sebagai Antibiotik (Wajib Dihabiskan)
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW & ACTION BAR */}
        <div className="lg:col-span-6 space-y-6">
          {/* Action Trigger Buttons */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Aksi Pengiriman Edukasi Pasien
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActivePreviewMode('whatsapp')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${activePreviewMode === 'whatsapp' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  <Smartphone className="w-3.5 h-3.5 inline mr-1" />
                  Format WA
                </button>
                <button
                  onClick={() => setActivePreviewMode('card')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${activePreviewMode === 'card' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Kartu Digital
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleOpenWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-xl shadow-emerald-950/60 transition transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                Kirim via WhatsApp (1-Klik)
              </button>

              <button
                onClick={handleCopyToClipboard}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Teks Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Pesan WhatsApp
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PREVIEW CONTAINER */}
          {activePreviewMode === 'whatsapp' ? (
            /* SMARTPHONE WHATSAPP CHAT MOCKUP */
            <div className="bg-[#0b141a] border border-slate-800 rounded-3xl p-4 shadow-2xl overflow-hidden max-w-md mx-auto relative">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pb-3 border-b border-[#202c33]">
                <span className="font-semibold text-emerald-400">WhatsApp Chat Pasien</span>
                <span>+{sanitizedWhatsAppPhone}</span>
              </div>

              {/* Chat Header */}
              <div className="flex items-center gap-2.5 py-3 px-2 border-b border-[#202c33] bg-[#202c33]/40 rounded-xl my-2">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {clinicBranding.clinicName ? clinicBranding.clinicName.charAt(0) : 'A'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{clinicBranding.clinicName || 'Apotek Sehat Medika'}</h4>
                  <span className="text-[10px] text-emerald-400">Online • Layanan Informasi Obat</span>
                </div>
              </div>

              {/* Chat Message Bubble */}
              <div className="my-3 bg-[#005c4b] text-white rounded-2xl rounded-tl-sm p-4 text-xs shadow-md space-y-2.5 font-sans leading-relaxed border border-emerald-700/40">
                <div className="whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed select-text">
                  {generatedWhatsAppText}
                </div>
                <div className="flex justify-end items-center gap-1 text-[10px] text-emerald-200/80 pt-1">
                  <span>10:00</span>
                  <Check className="w-3 h-3 text-sky-300 inline" />
                </div>
              </div>
            </div>
          ) : (
            /* PRINTABLE VISUAL PIO CARD */
            <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-emerald-800 uppercase tracking-tight">
                    {clinicBranding.clinicName || 'APOTEK SEHAT MEDIKA'}
                  </h3>
                  <p className="text-[11px] text-slate-600">{clinicBranding.address || 'Jl. Layanan Kesehatan No. 1'}</p>
                  <p className="text-[10px] text-slate-500">Apoteker: {clinicBranding.pharmacistName} | {clinicBranding.pharmacistSipa || clinicBranding.sipNumber}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    KARTU INFORMASI OBAT
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">Pasien: <strong>{patientName}</strong></span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-emerald-700">Jadwal Minum Obat:</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-emerald-50 text-emerald-900 border-b border-slate-200">
                      <tr>
                        <th className="p-2">Nama Obat</th>
                        <th className="p-2">Aturan</th>
                        <th className="p-2">Waktu & Hubungan Makan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {medications.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2 font-bold text-slate-900">
                            {m.drugName}
                            <span className="block text-[10px] text-slate-500 font-normal">{m.indicationLabel}</span>
                          </td>
                          <td className="p-2 font-semibold text-emerald-700">{m.frequency}</td>
                          <td className="p-2 text-[11px] text-slate-700">
                            {m.timing} ({m.mealRelation})
                            {m.isAntibioticMustFinish && <span className="block text-[10px] font-bold text-rose-600">⚠️ Habiskan</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                <span>Konsultasi WA: {clinicBranding.phone || '+62 812-xxxx-xxxx'}</span>
                <button
                  onClick={handlePrintCard}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition"
                >
                  <Printer className="w-3 h-3" />
                  Cetak Kartu Fisik
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
