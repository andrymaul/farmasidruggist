import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/ddinterData';
import { DEFAULT_PAYMENT_SETTINGS } from '../data/defaultPaymentSettings';
import { UserProfile, PricingPlan, PaymentMethodSettings } from '../types';
import { X, Check, CreditCard, Sparkles, QrCode, ShieldCheck, CheckCircle2, Copy, Landmark, Smartphone } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
  currentUser: UserProfile | null;
  pricingPlans?: PricingPlan[];
  paymentSettings?: PaymentMethodSettings;
  onSubscribeSuccess: (planName: 'Pro' | 'Klinik') => void;
  onOpenAuthModal: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  onClose,
  currentUser,
  pricingPlans = PRICING_PLANS,
  paymentSettings = DEFAULT_PAYMENT_SETTINGS,
  onSubscribeSuccess,
  onOpenAuthModal
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'pro' | 'klinik'>('pro');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank' | 'ewallet'>('qris');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activePlans = pricingPlans && pricingPlans.length > 0 ? pricingPlans : PRICING_PLANS;
  const selectedPlan = activePlans.find((p) => p.id === selectedPlanId) || activePlans[1];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      onClose();
      onOpenAuthModal();
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onSubscribeSuccess(selectedPlanId === 'pro' ? 'Pro' : 'Klinik');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-5 my-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Pembayaran Berhasil!</h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Akun Anda telah aktif sebagai <strong>Paket {selectedPlan.name}</strong>. Anda kini dapat menikmati akses penuh database interaksi obat & laporan PDF.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-teal-50 text-teal-700 text-[11px] font-semibold uppercase">
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Aktivasi Layanan</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Pilih Paket Langganan</h2>
              <p className="text-xs text-slate-500">
                Akses Penuh Database Interaksi Obat & Evaluasi Klinis
              </p>
            </div>

            {/* Plan Selector Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlanId('pro')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedPlanId === 'pro'
                    ? 'border-2 border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-teal-200'
                }`}
              >
                <span className="text-xs font-bold text-teal-700 block">Pro Farmasis</span>
                <span className="text-base font-extrabold text-slate-900 block mt-0.5">Rp 99.000<span className="text-[10px] text-slate-500 font-normal">/bln</span></span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlanId('klinik')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedPlanId === 'klinik'
                    ? 'border-2 border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-teal-200'
                }`}
              >
                <span className="text-xs font-bold text-teal-700 block">Klinik & Apotek</span>
                <span className="text-base font-extrabold text-slate-900 block mt-0.5">Rp 249.000<span className="text-[10px] text-slate-500 font-normal">/bln</span></span>
              </button>
            </div>

            {/* Selected Plan Features */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <p className="font-bold text-slate-800">Fitur Paket {selectedPlan.name}:</p>
              <ul className="space-y-1 text-slate-600 font-medium">
                {selectedPlan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Metode Pembayaran:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-2.5 rounded-lg border font-semibold flex flex-col items-center gap-1 transition-colors ${
                    paymentMethod === 'qris' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span className="text-[11px]">QRIS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-2.5 rounded-lg border font-semibold flex flex-col items-center gap-1 transition-colors ${
                    paymentMethod === 'bank' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px]">Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ewallet')}
                  className={`p-2.5 rounded-lg border font-semibold flex flex-col items-center gap-1 transition-colors ${
                    paymentMethod === 'ewallet' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[11px]">E-Wallet</span>
                </button>
              </div>

              {/* DYNAMIC PAYMENT METHOD DETAILS DISPLAY */}
              <div className="bg-slate-900 text-white rounded-xl p-3.5 text-xs space-y-2.5">
                
                {/* QRIS DETAILS */}
                {paymentMethod === 'qris' && (
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[11px]">
                      <span className="font-bold text-teal-400">{paymentSettings.qris.merchantName}</span>
                      <span className="font-mono text-slate-400 text-[10px]">NMID: {paymentSettings.qris.nmid}</span>
                    </div>

                    <div className="w-36 h-36 bg-white p-1.5 rounded-xl mx-auto border border-slate-200">
                      <img
                        src={paymentSettings.qris.qrImageUrl}
                        alt="QRIS Code"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                    <p className="text-[10px] text-slate-300 leading-tight">
                      {paymentSettings.qris.notes}
                    </p>
                  </div>
                )}

                {/* BANK TRANSFER DETAILS */}
                {paymentMethod === 'bank' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[11px]">
                      <span className="font-bold text-teal-400">{paymentSettings.bank.bankName}</span>
                      {paymentSettings.bank.bankCode && (
                        <span className="font-mono text-slate-400 text-[10px]">Kode: {paymentSettings.bank.bankCode}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                      <div>
                        <span className="text-[9.5px] text-slate-400 block font-semibold">Nomor Rekening:</span>
                        <span className="font-mono font-bold text-white text-xs">{paymentSettings.bank.accountNumber}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(paymentSettings.bank.accountNumber, 'rekening')}
                        className="px-2 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedText === 'rekening' ? 'Tersalin!' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-[10.5px]">
                      <span className="text-slate-400">Atas Nama (a.n.): </span>
                      <strong className="text-white font-bold">{paymentSettings.bank.accountName}</strong>
                    </div>

                    <p className="text-[10px] text-slate-300 leading-tight italic">
                      {paymentSettings.bank.notes}
                    </p>
                  </div>
                )}

                {/* E-WALLET DETAILS */}
                {paymentMethod === 'ewallet' && (
                  <div className="space-y-2">
                    <div className="border-b border-slate-800 pb-1 text-[11px] font-bold text-teal-400">
                      Pilihan Dompet Digital (E-Wallet)
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-emerald-400 block">GoPay</span>
                          <span className="font-mono text-white text-[10px]">{paymentSettings.ewallet.gopayNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(paymentSettings.ewallet.gopayNumber, 'gopay')}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Salin Nomor GoPay"
                        >
                          {copiedText === 'gopay' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-purple-400 block">OVO</span>
                          <span className="font-mono text-white text-[10px]">{paymentSettings.ewallet.ovoNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(paymentSettings.ewallet.ovoNumber, 'ovo')}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Salin Nomor OVO"
                        >
                          {copiedText === 'ovo' ? <Check className="w-3 h-3 text-purple-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sky-400 block">DANA</span>
                          <span className="font-mono text-white text-[10px]">{paymentSettings.ewallet.danaNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(paymentSettings.ewallet.danaNumber, 'dana')}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Salin Nomor DANA"
                        >
                          {copiedText === 'dana' ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-orange-400 block">ShopeePay</span>
                          <span className="font-mono text-white text-[10px]">{paymentSettings.ewallet.shopeepayNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(paymentSettings.ewallet.shopeepayNumber, 'shopeepay')}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Salin Nomor ShopeePay"
                        >
                          {copiedText === 'shopeepay' ? <Check className="w-3 h-3 text-orange-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-300 leading-tight">
                      a.n. <strong>{paymentSettings.ewallet.gopayName}</strong> • {paymentSettings.ewallet.notes}
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Total and Checkout CTA */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-700">Total:</span>
                <span className="font-extrabold text-lg text-teal-600">{selectedPlan.priceFormatted}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Bayar & Aktifkan Paket</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

