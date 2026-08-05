import React from 'react';
import { ArrowLeft, Radio, Sparkles, Terminal, User, Code2, CheckCircle2 } from 'lucide-react';
import { WebinarConfig } from '../types';

interface HeroSectionProps {
  config: WebinarConfig;
  onRegisterClick: () => void;
  onLiveClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onRegisterClick,
  onLiveClick
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background Hero Artwork Image with Neon Gradient Mask */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/fasa_coders_hero_1785861064239.jpg"
          alt="Fasa Coders Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Top Live Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-xl glow-cyan-box">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>وبینار تخصصی آنلاین فساکدرز (پلتفرم فساکدرز لایو)</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.25] max-w-4xl mb-6">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {config.webinarTitle}
          </span>
        </h1>

        {/* Description requested */}
        <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mb-8 font-normal">
          {config.description}
        </p>

        {/* Instructor Brief Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm mb-10 text-slate-200">
          <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <User className="w-4 h-4" />
          </div>
          <span>
            ارائه‌دهنده: <strong className="text-cyan-300 font-bold">{config.instructor.name}</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">{config.instructor.role}</span>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href={config.registrationUrl || "https://t.me/fasacodersbot"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition duration-200 transform hover:scale-105 cursor-pointer no-underline"
          >
            <span>ثبت‌نام و رزرو صندلی</span>
            <ArrowLeft className="w-5 h-5" />
          </a>

          <button
            onClick={onLiveClick}
            className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 font-bold text-base border border-cyan-500/40 flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
          >
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>ورود به پخش زنده</span>
          </button>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full text-right text-xs text-slate-300">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>رایگان و بدون هزینه</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>ویژه افراد کاملاً مبتدی</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
            <span>بررسی نقشه راه بازار کار</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ارسال هدیه پس از رویداد</span>
          </div>
        </div>
      </div>
    </section>
  );
};
