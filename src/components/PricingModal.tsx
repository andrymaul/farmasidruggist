import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/ddinterData';
import { UserProfile, PricingPlan } from '../types';
import { X, Check, Sparkles, MessageCircle, CheckCircle2, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
  currentUser: UserProfile | null;
  pricingPlans?: PricingPlan[];
  paymentSettings?: any;
  onSubscribeSuccess?: (planName: any) => void;
  onOpenAuthModal: () => void;
}

const WHATSAPP_NUMBER = '6287778402266';
const WHATSAPP_DISPLAY = '0877-7840-2266';

export const PricingModal: React.FC<PricingModalProps> = ({
  onClose,
  currentUser,
  pricingPlans = PRICING_PLANS,
  onOpenAuthModal
}) => {
  const [hasRedirected, setHasRedirected] = useState(false);

  const activePlans = pricingPlans && pricingPlans.length > 0 ? pricingPlans : PRICING_PLANS;
  const proPlan = activePlans.find((p) => p.id === 'pro') || activePlans[1] || activePlans[0];

  const getWhatsAppUrl = () => {
    const userName = currentUser?.name || 'Pengguna Baru';
    const userEmail = currentUser?.email || '-';
    const message = `Halo Admin Farmasi Druggist, saya ingin melakukan aktivasi pembayaran manual untuk Paket Pro Tahunan (Promo Rp 199.000 / tahun).\n\n• Nama: ${userName}\n• Email Akun: ${userEmail}\n\nMohon instruksi nomor rekening pembayaran manual dan konfirmasi aktivasinya. Terima kasih!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleActivateViaWhatsApp = () => {
    if (!currentUser) {
      onClose();
      onOpenAuthModal();
      return;
    }

    setHasRedirected(true);
    window.open(getWhatsAppUrl(), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#071c21] rounded-3xl shadow-2xl border border-slate-200 dark:border-teal-500/20 p-6 sm:p-7 space-y-5 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {hasRedirected ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-800 shadow-md">
              <MessageCircle className="w-9 h-9" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Menghubungkan ke WhatsApp...</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto font-medium leading-relaxed">
                Kami telah membuka tautan WhatsApp ke nomor Admin (<strong>{WHATSAPP_DISPLAY}</strong>). Silakan kirim pesan konfirmasi pembayaran Anda.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 space-y-2 text-left font-medium">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Tahapan Aktivasi Manual:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-emerald-800/90 dark:text-emerald-200/90">
                <li>Kirim pesan WhatsApp yang sudah disiapkan otomatis.</li>
                <li>Admin akan mengirimkan rincian nomor rekening transfer.</li>
                <li>Kirim bukti transfer, dan akun Anda akan langsung diaktifkan menjadi Pro.</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buka WhatsApp Kembali</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-[11px] font-black uppercase tracking-wider border border-amber-300 dark:border-amber-800">
                <Sparkles className="w-3.5 h-3.5 fill-amber-900 dark:fill-amber-300" />
                <span>Promo Spesial Terbatas (Diskon 80%)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Upgrade ke Paket Pro Tahunan</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Buka akses penuh seluruh data klinis, DFI, kalkulator dosis, panduan PNPK & cetak PDF
              </p>
            </div>

            {/* Price Banner with Strike-Through Price */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50/80 via-emerald-50/80 to-teal-50/80 dark:from-teal-950/40 dark:via-emerald-950/40 dark:to-teal-950/40 border-2 border-teal-500 dark:border-teal-600/80 shadow-sm space-y-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs line-through text-slate-400 font-bold decoration-rose-500 decoration-2">
                  Rp 999.000 / tahun
                </span>
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                  Hemat 80%
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-black text-teal-800 dark:text-teal-200">
                  Rp 199.000
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  / tahun
                </span>
              </div>
              <p className="text-[11px] text-teal-700 dark:text-teal-300 font-bold">
                Hanya ~Rp 16.500 / bulan (Aktif 365 Hari Penuh)
              </p>
            </div>

            {/* Selected Plan Features */}
            <div className="bg-slate-50 dark:bg-[#06191c] p-4 rounded-2xl border border-slate-200 dark:border-teal-500/20 space-y-2 text-xs">
              <p className="font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Fitur Lengkap yang Langsung Terbuka:</span>
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                {proPlan.features.slice(1).map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Manual Payment Notice & WhatsApp Action */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Metode Pembayaran Manual via WhatsApp:</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Pembayaran saat ini diproses secara manual melalui kontak resmi WhatsApp Admin (<strong>{WHATSAPP_DISPLAY}</strong>). Klik tombol di bawah untuk langsung terhubung dan mendapatkan rincian rekening pembayaran.
              </p>
            </div>

            {/* Total and Checkout CTA */}
            <div className="pt-1 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-700 dark:text-slate-200">Total Tarif Promo:</span>
                <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">{proPlan.priceFormatted}</span>
              </div>

              <button
                onClick={handleActivateViaWhatsApp}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-white font-black rounded-2xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Hubungi WhatsApp untuk Aktivasi ({WHATSAPP_DISPLAY})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

