import React, { useState, useEffect } from 'react';
import { Drug, DrugInteraction, UserProfile, SeverityLevel, PricingPlan, DrugFoodInteraction, TherapeuticDuplication, SystemAuditLog, AdminUser, ClinicBrandingSettings, PaymentMethodSettings } from '../types';
import {
  Settings,
  Pill,
  ShieldAlert,
  Database,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  Download,
  Sparkles,
  FileText,
  Users,
  CreditCard,
  Tag,
  Utensils,
  Activity,
  UserCheck,
  Printer,
  RotateCcw,
  Building2
} from 'lucide-react';
import { resolveDrugFromDDInter } from '../utils/ddinterEngine';
import { CustomerSubscriptionManager } from './CustomerSubscriptionManager';
import { PricingManager } from './PricingManager';
import { AdvancedDataEditor } from './AdvancedDataEditor';
import { AuditLogManager } from './AuditLogManager';
import { AdminTeamManager } from './AdminTeamManager';
import { ClinicBrandingManager } from './ClinicBrandingManager';
import { FirebaseSyncManager } from './FirebaseSyncManager';

type AdminSubTab = 'drugs' | 'interactions' | 'customers' | 'pricing-settings' | 'advanced-editor' | 'audit-log' | 'team-admin' | 'clinic-branding' | 'firebase-sync' | 'status';

interface AdminPanelProps {
  drugs: Drug[];
  interactions: DrugInteraction[];
  currentUser: UserProfile | null;
  pricingPlans: PricingPlan[];
  paymentSettings?: PaymentMethodSettings;
  foodInteractions: DrugFoodInteraction[];
  duplicationRules: TherapeuticDuplication[];
  auditLogs: SystemAuditLog[];
  adminUsers: AdminUser[];
  clinicBranding: ClinicBrandingSettings;
  customers?: UserProfile[];
  onUpdateCustomers?: (customers: UserProfile[]) => void;
  initialSubTab?: AdminSubTab;
  onSaveDrug: (drug: Drug) => Promise<void>;
  onDeleteDrug: (drugId: string) => Promise<void>;
  onSaveInteraction: (interaction: DrugInteraction) => Promise<void>;
  onSeedFirebase: () => Promise<void>;
  onUpdatePricingPlans: (updatedPlans: PricingPlan[]) => void;
  onSavePaymentSettings?: (updated: PaymentMethodSettings) => void;
  onSaveFoodInteraction: (dfi: DrugFoodInteraction) => Promise<void>;
  onDeleteFoodInteraction: (id: string) => Promise<void>;
  onSaveDuplicationRule: (rule: TherapeuticDuplication) => Promise<void>;
  onDeleteDuplicationRule: (id: string) => Promise<void>;
  onSaveAdminUser: (admin: AdminUser) => void;
  onDeleteAdminUser: (adminId: string) => void;
  onSaveBranding: (updated: ClinicBrandingSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  drugs,
  interactions,
  currentUser,
  pricingPlans,
  paymentSettings,
  foodInteractions,
  duplicationRules,
  auditLogs,
  adminUsers,
  clinicBranding,
  customers,
  onUpdateCustomers,
  initialSubTab = 'drugs',
  onSaveDrug,
  onDeleteDrug,
  onSaveInteraction,
  onSeedFirebase,
  onUpdatePricingPlans,
  onSavePaymentSettings,
  onSaveFoodInteraction,
  onDeleteFoodInteraction,
  onSaveDuplicationRule,
  onDeleteDuplicationRule,
  onSaveAdminUser,
  onDeleteAdminUser,
  onSaveBranding
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTab>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // CSV Importer state
  const [csvFileName, setCsvFileName] = useState('');
  const [parsedCsvPairs, setParsedCsvPairs] = useState<DrugInteraction[]>([]);
  const [importingCount, setImportingCount] = useState(0);

  // New Drug Form state
  const [showDrugModal, setShowDrugModal] = useState(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [drugForm, setDrugForm] = useState({
    name: '',
    genericName: '',
    brandNamesText: '',
    atcCode: '',
    category: '',
    indication: '',
    contraindications: '',
    sideEffects: '',
    dosage: '',
    pharmacology: '',
    foodInteraction: '',
    pregnancyCategory: 'C',
    ddinterId: ''
  });

  // New Interaction Form state
  const [showInterModal, setShowInterModal] = useState(false);
  const [interForm, setInterForm] = useState({
    drugAName: '',
    drugBName: '',
    severity: 'Major' as SeverityLevel,
    mechanism: '',
    clinicalOutcome: '',
    management: '',
    evidenceLevel: 'High' as 'High' | 'Moderate' | 'Low',
    ddinterPairId: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // CSV Parsing Client Logic
  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
      if (lines.length === 0) return;

      const parseRow = (line: string): string[] => {
        const values: string[] = [];
        let val = '';
        let inside = false;

        for (let j = 0; j < line.length; j++) {
          const c = line[j];
          const nc = line[j + 1];

          if (c === '"') {
            if (inside && nc === '"') {
              val += '"';
              j++;
            } else {
              inside = !inside;
            }
          } else if (c === ',' && !inside) {
            values.push(val.trim());
            val = '';
          } else {
            val += c;
          }
        }
        values.push(val.trim());
        return values;
      };

      const headers = parseRow(lines[0]).map((h) => h.replace(/^["']|["']$/g, '').trim());
      const parsedList: DrugInteraction[] = [];

      for (let k = 1; k < lines.length; k++) {
        const rowValues = parseRow(lines[k]);
        if (rowValues.length === 0 || (rowValues.length === 1 && !rowValues[0])) continue;

        const rowObj: Record<string, string> = {};
        headers.forEach((header, idx) => {
          let cell = rowValues[idx] || '';
          if (cell.startsWith('"') && cell.endsWith('"')) {
            cell = cell.slice(1, -1);
          }
          rowObj[header] = cell;
        });

        const drugA = rowObj['Drug_A'] || rowObj['drug_a'] || rowObj['DrugA'] || rowObj['Obat_A'];
        const drugB = rowObj['Drug_B'] || rowObj['drug_b'] || rowObj['DrugB'] || rowObj['Obat_B'];
        const severityStr = rowObj['Level'] || rowObj['severity'] || rowObj['Severity'] || 'Major';

        if (drugA && drugB) {
          const matchedA = drugs.find((d) => d.name.toLowerCase() === drugA.toLowerCase());
          const matchedB = drugs.find((d) => d.name.toLowerCase() === drugB.toLowerCase());

          parsedList.push({
            id: `csv-pair-${Date.now()}-${k}`,
            drugAId: matchedA ? matchedA.id : `drug-${drugA.toLowerCase().replace(/\s+/g, '-')}`,
            drugBId: matchedB ? matchedB.id : `drug-${drugB.toLowerCase().replace(/\s+/g, '-')}`,
            drugAName: drugA,
            drugBName: drugB,
            severity: severityStr.includes('Major') ? 'Major' : severityStr.includes('Moderate') ? 'Moderate' : 'Minor',
            mechanism: rowObj['Mechanism'] || rowObj['mechanism'] || 'Mekanisme interaksi dari dataset DDInter CSV.',
            clinicalOutcome: rowObj['Clinical_Outcome'] || rowObj['outcome'] || 'Risiko klinis terdaftar pada dataset DDInter.',
            management: rowObj['Management'] || rowObj['management'] || 'Konsultasi apoteker & monitor efek samping.',
            evidenceLevel: (rowObj['Evidence_Level'] as any) || 'High',
            ddinterPairId: rowObj['DDInterID'] || `DDInter-PAIR-${1000 + k}`
          });
        }
      }

      setParsedCsvPairs(parsedList);
      setMessage(`Berhasil membaca file ${file.name}! Ditemukan ${parsedList.length} rekor pasangan interaksi.`);
    };

    reader.readAsText(file);
  };

  const handleBulkUploadParsedCsv = async () => {
    if (parsedCsvPairs.length === 0) return;
    setLoading(true);
    setImportingCount(0);
    try {
      let count = 0;
      for (const pair of parsedCsvPairs) {
        // Ensure Drug A monograph exists
        const drugA = resolveDrugFromDDInter(pair.drugAName, drugs);
        await onSaveDrug(drugA);

        // Ensure Drug B monograph exists
        const drugB = resolveDrugFromDDInter(pair.drugBName, drugs);
        await onSaveDrug(drugB);

        // Save interaction pair
        await onSaveInteraction(pair);
        count++;
        setImportingCount(count);
      }

      setMessage(`Sukses mengimpor ${count} rekor interaksi DDInter ke Cloud Firebase Firestore!`);
      setParsedCsvPairs([]);
      setCsvFileName('');
    } catch (err) {
      setMessage('Gagal mengunggah beberapa rekor CSV.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSampleCsv = () => {
    const sampleCsvContent = `DDInterID,Drug_A,Drug_B,Level,Mechanism,Management,Clinical_Outcome,Evidence_Level
DDInter-PAIR-00101,"Warfarin","Aspirin","Major","Penghambatan fungsi agregasi trombosit ireversibel oleh aspirin bersama warfarin.","Pantau INR ketat & tambahkan Proton Pump Inhibitor (PPI).","Peningkatan signifikan risiko perdarahan mayor GI.","High"
DDInter-PAIR-00102,"Simvastatin","Amiodarone","Major","Inhibisi metabolisme CYP3A4 oleh amiodarone.","Batasi dosis simvastatin maks 20 mg/hari.","Risiko miopati berat dan rhabdomyolysis.","High"
DDInter-PAIR-00103,"Clopidogrel","Omeprazole","Major","Omeprazole menghambat aktivasi prodrug clopidogrel via CYP2C19.","Ganti PPI dengan Pantoprazole atau H2 blocker.","Penurunan bioaktivitas antiplatelet & peningkatan risiko trombotik.","High"
DDInter-PAIR-00104,"Lisinopril","Spironolactone","Major","Blokade ganda sekresi kalium renal.","Pantau kadar kalium serum K+ dan fungsi ginjal.","Risiko hiperkalemia berat dan aritmia kardiak.","High"
DDInter-PAIR-00105,"Tacrolimus","Fluconazole","Major","Fluconazole menghambat CYP3A4 dan P-gp eliminasi tacrolimus.","Lakukan TDM dan kurangi dosis tacrolimus.","Peningkatan konsentrasi plasma tacrolimus & toksisitas ginjal.","High"
`;
    const blob = new Blob([sampleCsvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ddinter_sample_dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-3">
        <Settings className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Akses Terbatas Administrator</h2>
        <p className="text-xs text-slate-500">
          Gunakan akun Administrator (`admin@farmasidruggist.com`) untuk mengakses panel pengelolaan ini.
        </p>
      </div>
    );
  }

  const handleOpenNewDrug = () => {
    setEditingDrug(null);
    setDrugForm({
      name: '',
      genericName: '',
      brandNamesText: '',
      atcCode: '',
      category: '',
      indication: '',
      contraindications: '',
      sideEffects: '',
      dosage: '',
      pharmacology: '',
      foodInteraction: '',
      pregnancyCategory: 'C',
      ddinterId: 'DDInter-D' + Math.floor(10000 + Math.random() * 90000)
    });
    setShowDrugModal(true);
  };

  const handleEditDrugClick = (drug: Drug) => {
    setEditingDrug(drug);
    setDrugForm({
      name: drug.name,
      genericName: drug.genericName,
      brandNamesText: drug.brandNames ? drug.brandNames.join(', ') : '',
      atcCode: drug.atcCode,
      category: drug.category,
      indication: drug.indication,
      contraindications: drug.contraindications,
      sideEffects: drug.sideEffects,
      dosage: drug.dosage,
      pharmacology: drug.pharmacology || '',
      foodInteraction: drug.foodInteraction || '',
      pregnancyCategory: drug.pregnancyCategory || 'C',
      ddinterId: drug.ddinterId
    });
    setShowDrugModal(true);
  };

  const handleSaveDrugSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = drugForm.name.trim();
    if (!cleanName) {
      setMessage('Nama obat wajib diisi.');
      return;
    }

    // Validation: Check duplicate name when adding new drug
    if (!editingDrug) {
      const existing = drugs.find((d) => d.name.toLowerCase() === cleanName.toLowerCase());
      if (existing) {
        setMessage(`Peringatan: Obat "${cleanName}" sudah terdaftar di katalog!`);
        return;
      }
    }

    setLoading(true);
    try {
      const drugObj: Drug = {
        id: editingDrug ? editingDrug.id : 'drug-' + Date.now(),
        name: cleanName,
        genericName: drugForm.genericName.trim() || cleanName,
        brandNames: drugForm.brandNamesText.split(',').map((s) => s.trim()).filter(Boolean),
        atcCode: drugForm.atcCode.trim() || 'A10AA00',
        category: drugForm.category.trim() || 'Farmakoterapi',
        indication: drugForm.indication.trim(),
        contraindications: drugForm.contraindications.trim(),
        sideEffects: drugForm.sideEffects.trim(),
        dosage: drugForm.dosage.trim(),
        pharmacology: drugForm.pharmacology.trim(),
        foodInteraction: drugForm.foodInteraction.trim(),
        pregnancyCategory: drugForm.pregnancyCategory,
        ddinterId: drugForm.ddinterId || 'DDInter-D00' + Math.floor(Math.random() * 900)
      };

      await onSaveDrug(drugObj);
      setMessage(`Obat "${cleanName}" berhasil disimpan!`);
      setShowDrugModal(false);
    } catch (err) {
      setMessage('Gagal menyimpan obat.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDrugClick = async (id: string) => {
    if (confirm('Yakin ingin menghapus obat ini dari database Firebase?')) {
      setLoading(true);
      try {
        await onDeleteDrug(id);
        setMessage('Obat berhasil dihapus.');
      } catch (e) {
        setMessage('Gagal menghapus obat.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveInteractionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameA = interForm.drugAName.trim();
    const nameB = interForm.drugBName.trim();

    if (!nameA || !nameB) {
      setMessage('Nama Obat A dan Obat B wajib diisi.');
      return;
    }

    if (nameA.toLowerCase() === nameB.toLowerCase()) {
      setMessage('Peringatan: Obat A dan Obat B tidak boleh sama!');
      return;
    }

    setLoading(true);
    try {
      const matchedA = drugs.find((d) => d.name.toLowerCase() === nameA.toLowerCase());
      const matchedB = drugs.find((d) => d.name.toLowerCase() === nameB.toLowerCase());

      const interObj: DrugInteraction = {
        id: 'int-' + Date.now(),
        drugAId: matchedA ? matchedA.id : 'drug-' + nameA.toLowerCase().replace(/\s+/g, '-'),
        drugBId: matchedB ? matchedB.id : 'drug-' + nameB.toLowerCase().replace(/\s+/g, '-'),
        drugAName: nameA,
        drugBName: nameB,
        severity: interForm.severity,
        mechanism: interForm.mechanism.trim(),
        clinicalOutcome: interForm.clinicalOutcome.trim(),
        management: interForm.management.trim(),
        evidenceLevel: interForm.evidenceLevel,
        ddinterPairId: interForm.ddinterPairId || 'DDInter-PAIR-' + Math.floor(1000 + Math.random() * 9000)
      };

      await onSaveInteraction(interObj);
      setMessage(`Pasangan interaksi ${nameA} ⚡ ${nameB} berhasil ditambahkan!`);
      setShowInterModal(false);
    } catch (err) {
      setMessage('Gagal menambah interaksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedClick = async () => {
    setLoading(true);
    try {
      await onSeedFirebase();
      setMessage('Data awal DDInter berhasil disinkronkan ke Cloud Firebase Firestore!');
    } catch (e) {
      setMessage('Proses sync selesai.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-2xl p-6 text-white shadow-xl border border-[#143d47] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#0a2f38] px-3 py-1 rounded-full text-[10px] font-black text-amber-300 uppercase tracking-wider mb-1.5 border border-teal-500/30">
            <Settings className="w-3.5 h-3.5" />
            <span>Panel Administrator</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Admin Management Dashboard</h1>
          <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed font-medium">
            Pengelolaan Database Obat, Aturan Interaksi, dan Cloud Firebase.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={onSeedFirebase}
            className="bg-[#0a2f38] hover:bg-[#0e3c47] text-teal-300 border border-teal-600/50 px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Initial Data</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-teal-50 text-teal-900 border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-between shadow-2xs">
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
        </div>
      )}

      {/* TAB FIREBASE SYNC */}
      {activeSubTab === 'firebase-sync' && (
        <FirebaseSyncManager
          drugs={drugs}
          interactions={interactions}
          foodInteractions={foodInteractions}
          duplicationRules={duplicationRules}
          onSeedFirebase={onSeedFirebase}
          onSaveDrug={onSaveDrug}
          onSaveInteraction={onSaveInteraction}
        />
      )}

      {/* TAB 1: DRUGS */}
      {activeSubTab === 'drugs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Katalog Obat di Firestore</h2>
            <button
              onClick={handleOpenNewDrug}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg font-semibold text-xs flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Obat</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Nama / Generik</th>
                    <th className="p-3">Kode ATC</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Merk Indonesia</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {drugs.map((drug) => (
                    <tr key={drug.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{drug.name}</p>
                        <p className="text-[10px] text-slate-500">{drug.genericName}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-mono text-slate-800">{drug.atcCode}</p>
                      </td>
                      <td className="p-3 text-slate-700">{drug.category}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {drug.brandNames?.slice(0, 2).map((b, i) => (
                            <span key={i} className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">{b}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleEditDrugClick(drug)}
                          className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDrugClick(drug.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIONS */}
      {activeSubTab === 'interactions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Pasangan Interaksi Obat</h2>
            <button
              onClick={() => setShowInterModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg font-semibold text-xs flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Interaksi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interactions.map((inter) => (
              <div key={inter.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">{inter.drugAName} ⚡ {inter.drugBName}</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${inter.severity === 'Major' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                    {inter.severity}
                  </span>
                </div>
                <p className="text-slate-600"><strong>Mekanisme:</strong> {inter.mechanism}</p>
                <p className="text-slate-600"><strong>Solusi:</strong> {inter.management}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STATUS */}
      {activeSubTab === 'status' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl border border-teal-100">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Firebase Firestore Connection</h2>
              <p className="text-xs text-slate-500">Project Cloud Database Status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-semibold text-slate-500">Koleksi "drugs"</p>
              <p className="text-xl font-bold text-teal-600 mt-1">{drugs.length} Document</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-semibold text-slate-500">Koleksi "interactions"</p>
              <p className="text-xl font-bold text-teal-600 mt-1">{interactions.length} Document</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-semibold text-slate-500">Sync Status</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">Connected</p>
            </div>
          </div>

          {onSeedFirebase && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Sinkronisasi & Inisialisasi Database</p>
                <p className="text-[11px] text-slate-500">Jalankan pengisian ulang (*seeding*) dataset obat DDInter standar ke Firestore Cloud.</p>
              </div>
              <button
                onClick={async () => {
                  await onSeedFirebase();
                  alert('Database Firestore berhasil disemaikan dan diperbarui!');
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Semai Ulang Database Otomatis</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB: MANAJEMEN SUBSKRIPSI CUSTOMER */}
      {activeSubTab === 'customers' && (
        <CustomerSubscriptionManager
          currentUser={currentUser}
          customers={customers}
          onUpdateCustomers={onUpdateCustomers}
        />
      )}

      {/* TAB: PENGATURAN TARIF & FITUR PAKET */}
      {activeSubTab === 'pricing-settings' && (
        <PricingManager
          pricingPlans={pricingPlans}
          paymentSettings={paymentSettings}
          onUpdatePricingPlans={onUpdatePricingPlans}
          onSavePaymentSettings={onSavePaymentSettings}
        />
      )}

      {/* TAB: EDITOR INTERAKSI MAKANAN & DUPLIKASI TERAPI */}
      {activeSubTab === 'advanced-editor' && (
        <AdvancedDataEditor
          foodInteractions={foodInteractions}
          duplicationRules={duplicationRules}
          onSaveFoodInteraction={onSaveFoodInteraction}
          onDeleteFoodInteraction={onDeleteFoodInteraction}
          onSaveDuplicationRule={onSaveDuplicationRule}
          onDeleteDuplicationRule={onDeleteDuplicationRule}
        />
      )}

      {/* TAB: AUDIT LOG SYSTEM */}
      {activeSubTab === 'audit-log' && (
        <AuditLogManager auditLogs={auditLogs} />
      )}

      {/* TAB: MANAJEMEN TIM ADMIN & HAK AKSES */}
      {activeSubTab === 'team-admin' && (
        <AdminTeamManager
          adminUsers={adminUsers}
          onSaveAdminUser={onSaveAdminUser}
          onDeleteAdminUser={onDeleteAdminUser}
        />
      )}

      {/* TAB: KUSTOMISASI KOP & BRANDING CETAK LAPORAN */}
      {activeSubTab === 'clinic-branding' && (
        <ClinicBrandingManager
          branding={clinicBranding}
          onSaveBranding={onSaveBranding}
        />
      )}

      {/* Modals */}
      {showDrugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full space-y-3 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">
              {editingDrug ? 'Edit Monografi Obat' : 'Tambah Obat Baru'}
            </h3>

            <form onSubmit={handleSaveDrugSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Utama *</label>
                  <input
                    type="text"
                    required
                    value={drugForm.name}
                    onChange={(e) => setDrugForm({ ...drugForm, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Generik *</label>
                  <input
                    type="text"
                    required
                    value={drugForm.genericName}
                    onChange={(e) => setDrugForm({ ...drugForm, genericName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kode ATC</label>
                  <input
                    type="text"
                    value={drugForm.atcCode}
                    onChange={(e) => setDrugForm({ ...drugForm, atcCode: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <input
                    type="text"
                    value={drugForm.category}
                    onChange={(e) => setDrugForm({ ...drugForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Merk Indonesia (Pisah Koma)</label>
                <input
                  type="text"
                  value={drugForm.brandNamesText}
                  onChange={(e) => setDrugForm({ ...drugForm, brandNamesText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Indikasi</label>
                <textarea
                  rows={2}
                  value={drugForm.indication}
                  onChange={(e) => setDrugForm({ ...drugForm, indication: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowDrugModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-semibold bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showInterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-3">
            <h3 className="text-base font-bold text-slate-900">Tambah Pasangan Interaksi</h3>

            <form onSubmit={handleSaveInteractionSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Obat A *</label>
                  <input
                    type="text"
                    required
                    value={interForm.drugAName}
                    onChange={(e) => setInterForm({ ...interForm, drugAName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Obat B *</label>
                  <input
                    type="text"
                    required
                    value={interForm.drugBName}
                    onChange={(e) => setInterForm({ ...interForm, drugBName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tingkat Keparahan</label>
                <select
                  value={interForm.severity}
                  onChange={(e) => setInterForm({ ...interForm, severity: e.target.value as SeverityLevel })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-semibold"
                >
                  <option value="Major">Major</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Minor">Minor</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mekanisme</label>
                <textarea
                  rows={2}
                  required
                  value={interForm.mechanism}
                  onChange={(e) => setInterForm({ ...interForm, mechanism: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Solusi Klinis</label>
                <textarea
                  rows={2}
                  required
                  value={interForm.management}
                  onChange={(e) => setInterForm({ ...interForm, management: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInterModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-semibold bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700"
                >
                  Simpan Interaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
