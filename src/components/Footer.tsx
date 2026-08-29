import React from 'react';
import { Logo } from './Logo';
import { ShieldAlert, Database, Stethoscope, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#071c21] text-slate-300 pt-16 pb-12 border-t border-[#143d47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" variant="dark" />
            <p className="text-xs text-teal-100/70 leading-relaxed max-w-sm">
              FARMASIDRUGGIST adalah platform database informasi obat, evaluasi polifarmasi, dan pemeriksa interaksi obat terpercaya untuk Apoteker, Dokter, Klinik, dan Fasilitas Pelayanan Kesehatan Indonesia.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-bold">
              <Database className="w-4 h-4 text-teal-400" />
              <span>Database Interaksi Klinis Terintegrasi</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Menu Navigasi</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('landing')} className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300">
                  Beranda & Tentang
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('drugs')} className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300">
                  Menu Informasi Obat (Monografi)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('polypharmacy')} className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300">
                  Evaluasi Polifarmasi & Jadwal Pasien
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('interactions')} className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300">
                  Cek Interaksi Obat (Evaluasi Klinis)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('literature')} className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300">
                  Literatur & Bukti Ilmiah (EBM)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pricing')} className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300">
                  Harga Layanan Apps
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Sertifikasi & Layanan Backend</h3>
            <p className="text-xs text-teal-100/70 leading-relaxed">
              Tersinkronisasi secara real-time dengan Firebase Firestore Cloud Database. Mendukung pencetakan laporan keselamatan medis resep berstempel klinik.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#0b2b33] px-3.5 py-2 rounded-xl text-xs text-teal-300 font-bold border border-teal-500/30">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Standar Keselamatan Medis Pasien</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#143d47] text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FARMASIDRUGGIST. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 text-teal-300/80">
            <span>Dirancang untuk Standar Pelayanan Kefarmasian Indonesia</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
