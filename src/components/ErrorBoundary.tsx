import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleResetCacheAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Tampilan Mengalami Kendala</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Terjadi kendala saat memuat komponen UI atau cache browser lama. Anda dapat memuat ulang atau mereset cache lokal aplikasi di bawah ini.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 text-[11px] text-rose-300 font-mono text-left overflow-x-auto max-h-28">
                {this.state.error.toString()}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Muat Ulang Halaman
              </button>

              <button
                onClick={this.handleResetCacheAndReload}
                className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Bersihkan Cache Lokal & Buka Halaman Utama
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
