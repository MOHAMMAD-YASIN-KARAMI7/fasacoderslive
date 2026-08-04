import React from 'react';
import { Logo } from './Logo';
import { TabType, WebinarConfig } from '../types';
import { Radio, Video, Settings, Home, Sparkles, UserCheck } from 'lucide-react';

interface NavbarProps {
  config: WebinarConfig;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  registeredCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeTab,
  setActiveTab,
  registeredCount = 0
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="cursor-pointer" onClick={() => setActiveTab('landing')}>
          <Logo logoUrl={config.logoUrl} />
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 glass-panel">
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing'
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>صفحه اصلی وبینار</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <Video className="w-4 h-4" />
            <span>اتاق پخش زنده</span>
          </button>
        </nav>

        {/* Left Action / Counter */}
        <div className="flex items-center gap-3">
          {registeredCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{registeredCount.toLocaleString('fa-IR')} شرکت‌کننده</span>
            </div>
          )}

          <button
            onClick={() => setActiveTab('live')}
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs sm:text-sm"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl group-hover:opacity-100 transition duration-300"></span>
            <span className="relative flex items-center gap-2 px-4 py-2 rounded-[11px] bg-slate-950 text-cyan-300 group-hover:bg-opacity-80 transition duration-200">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-bold">ورود به وبینار لایو</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800/80 py-2.5 px-2">
        <button
          onClick={() => setActiveTab('landing')}
          className={`flex flex-col items-center gap-1 text-xs ${
            activeTab === 'landing' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>صفحه اصلی</span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`flex flex-col items-center gap-1 text-xs relative ${
            activeTab === 'live' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <div className="relative">
            <Video className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <span>پخش زنده Jitsi</span>
        </button>
      </div>
    </header>
  );
};
