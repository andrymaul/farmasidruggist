import React, { useState, useRef, useEffect } from 'react';
import { Drug, UserProfile } from '../types';
import { 
  askGeminiAssistant, 
  ChatMessage, 
  getStoredGeminiApiKey, 
  setStoredGeminiApiKey,
  AiModelType
} from '../utils/geminiAiService';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Key, 
  Trash2, 
  Copy, 
  Check, 
  ShieldAlert, 
  Pill, 
  HelpCircle,
  X,
  ExternalLink,
  MessageSquarePlus,
  Baby,
  Activity,
  Milk,
  FileCheck2,
  Cpu,
  Zap,
  Brain,
  Share2
} from 'lucide-react';

interface AiAssistantProps {
  drugs: Drug[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  drugs,
  currentUser,
  onOpenPricingModal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Halo ${currentUser ? currentUser.name : 'Apoteker / Dokter'}! 👋 

Saya **FARMASIDRUGGIST AI 3.0**, Asisten Kecerdasan Buatan Mahatahu (*Omniscient Clinical Drug AI*) spesialis Pelayanan Informasi Obat (PIO), Farmakologi Klinis, & Farmakoterapi Internasional.

Saya menguasai informasi **SELURUH OBAT-OBATAN DI DUNIA** (FDA, Medscape, AHFS, Lexicomp, BPOM). Anda dapat menanyakan tentang obat generik, paten, dosis pediatrik/ginjal, kehamilan, interaksi obat (DDI), interaksi makanan (DFI), penapisan resep, hingga draf konseling pasien.

Silakan pilih *Quick Prompt Chip* di bawah atau ketikkan pertanyaan klinis Anda!`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getStoredGeminiApiKey());
  const [selectedModel, setSelectedModel] = useState<AiModelType>('gemini-1.5-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const aiReplyText = await askGeminiAssistant(userMsg.text, messages, drugs.slice(0, 10), selectedModel);
      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'ai',
        text: '❌ Maaf, terjadi kesalahan saat menghubungi layanan Gemini AI. Silakan periksa koneksi internet atau API Key Anda.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    setStoredGeminiApiKey(apiKeyInput);
    setShowKeyModal(false);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'ai',
        text: 'Riwayat percakapan telah dibersihkan. Silakan ajukan pertanyaan klinis baru!',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickPrompts = [
    {
      label: '🛡️ Skrining Resep Medis',
      prompt: 'Lakukan penapisan resep klinis 5-dimensi untuk daftar obat pasien saat ini.',
      color: 'hover:border-teal-500 hover:bg-teal-50 text-teal-900'
    },
    {
      label: '🤰 Evaluasi Kehamilan (FDA)',
      prompt: 'Jelaskan evaluasi keamanan kategori kehamilan FDA (Kat. A, B, C, D, X) obat-obatan populer.',
      color: 'hover:border-rose-500 hover:bg-rose-50 text-rose-900'
    },
    {
      label: '🥛 Interaksi Obat vs Makanan',
      prompt: 'Berikan panduan interaksi obat-obat (DDI) & interaksi obat vs makanan/susu (DFI).',
      color: 'hover:border-amber-500 hover:bg-amber-50 text-amber-900'
    },
    {
      label: '📋 Draf Konseling Pasien',
      prompt: 'Buatkan draf teks kalimat edukasi konseling pasien yang ramah dan terstruktur untuk aturan pakai obat.',
      color: 'hover:border-emerald-500 hover:bg-emerald-50 text-emerald-900'
    },
    {
      label: '🧪 Dosis Ginjal (CrCl < 30)',
      prompt: 'Jelaskan penyesuaian dosis obat pada pasien gangguan fungsi ginjal dengan CrCl < 30 mL/min.',
      color: 'hover:border-purple-500 hover:bg-purple-50 text-purple-900'
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      
      {/* Top Bar Header */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-3xl p-5 text-white shadow-xl border border-[#143d47] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 shrink-0">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">FARMASIDRUGGIST AI 3.0</h1>
              <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/30">
                Google Gemini Powered
              </span>
            </div>
            <p className="text-xs text-teal-100/80 font-medium">
              Asisten Kecerdasan Buatan Spesialis Pelayanan Informasi Obat (PIO) & Klinis Farmasi
            </p>
          </div>
        </div>

        {/* Model Switcher & Key Settings */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Model Selector */}
          <div className="bg-[#06181c] p-1 rounded-2xl border border-[#14424e] flex items-center gap-1 text-xs">
            <button
              onClick={() => setSelectedModel('gemini-1.5-flash')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 cursor-pointer ${
                selectedModel === 'gemini-1.5-flash'
                  ? 'bg-[#0f766e] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>1.5 Flash</span>
            </button>

            <button
              onClick={() => setSelectedModel('gemini-1.5-pro')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
                selectedModel === 'gemini-1.5-pro'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>1.5 Pro</span>
            </button>
          </div>

          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">{getStoredGeminiApiKey() ? 'API Key Terpasang' : 'Set Gemini Key'}</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-rose-400 transition-all"
            title="Bersihkan Percakapan"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Prescription Context Indicator */}
      <div className="bg-teal-50/80 border border-teal-200 rounded-2xl px-4 py-2 flex items-center justify-between gap-3 text-xs shrink-0">
        <div className="flex items-center gap-2 text-teal-950 font-medium">
          <Pill className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Kontekstual Resep Aktif: <strong>{drugs.length} Obat Terhubung</strong> dari Database Farmasi Aplikasi</span>
        </div>
        <span className="bg-teal-200/60 text-teal-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
          Ready for Screening
        </span>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md overflow-y-auto custom-scrollbar space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-xs text-xs sm:text-sm space-y-2 ${
              msg.sender === 'user'
                ? 'bg-teal-600 text-white rounded-tr-none'
                : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
            }`}>
              <div className="flex items-center justify-between gap-4 border-b pb-2 border-slate-200/60 opacity-80">
                <span className="font-bold text-[10px] uppercase tracking-wider">
                  {msg.sender === 'user' ? 'Apoteker / Pengguna' : 'FARMASIDRUGGIST AI'}
                </span>
                <span className="text-[10px]">{msg.timestamp}</span>
              </div>

              <div className="prose prose-xs max-w-none whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>

              {msg.sender === 'ai' && (
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopyText(msg.id, msg.text)}
                    className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-[11px] font-bold transition-all flex items-center gap-1 shadow-2xs"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Salin Jawaban</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <User className="w-5 h-5 text-teal-400" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-bounce">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl px-4 py-3 text-xs font-bold text-slate-600 flex items-center gap-2 shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
              <span>Menganalisis data farmakologi klinis...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 shrink-0">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.prompt)}
            disabled={loading}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 bg-white transition-all whitespace-nowrap shrink-0 shadow-2xs ${qp.color}`}
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div className="bg-white rounded-3xl p-2.5 border border-slate-200 shadow-lg flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tanyakan farmakologi obat, aturan dosis, kehamilan, interaksi makanan, atau konseling..."
          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
          disabled={loading}
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputPrompt.trim() || loading}
          className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          <span>Kirim</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-extrabold text-slate-900">Pengaturan API Key Gemini</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Masukkan Google Gemini API Key Anda dari Google AI Studio untuk pemrosesan AI generatif secara langsung (*Live Production Inference*).
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Gemini API Key (`AIzaSy...`)</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Tempelkan Gemini API Key Anda di sini..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="bg-teal-50 p-3 rounded-2xl border border-teal-100 flex items-start gap-2 text-xs text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Belum memiliki API Key? Dapatkan gratis di{' '}
                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-teal-700 hover:text-teal-900 inline-flex items-center gap-0.5"
                >
                  Google AI Studio <ExternalLink className="w-3 h-3 inline" />
                </a>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all"
              >
                Simpan API Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
