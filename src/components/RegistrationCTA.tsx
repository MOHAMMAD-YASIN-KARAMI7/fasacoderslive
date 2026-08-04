import React from 'react';
import { ArrowLeft, ExternalLink, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WebinarConfig } from '../types';

interface RegistrationCTAProps {
  config: WebinarConfig;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ config }) => {
  const regUrl = config.registrationUrl || config.socialLinks.telegram || 'https://t.me/fasacoders';

  return (
    <div id="registration-section" className="w-full max-w-2xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-cyan-500/30 relative overflow-hidden shadow-2xl text-center space-y-6">
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>ثبت‌نام رایگان و رزرو صندلی وبینار</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            جهت ثبت‌نام در وبینار فساکدرز کلیک کنید
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            برای تکمیل فرایند ثبت‌نام، دریافت لینک‌های اختصاصی، جزوه‌ها و هدیه انتهای رویداد، روی دکمه زیر کلیک کنید.
          </p>
        </div>

        {/* Big Action Button */}
        <div className="pt-2 max-w-md mx-auto">
          <a
            href={regUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:to-pink-600 text-white font-black text-base shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 transition duration-200 transform hover:scale-105 cursor-pointer no-underline"
          >
            <span>ورود به لینک ثبت‌نام وبینار</span>
            <ExternalLink className="w-5 h-5 text-cyan-200" />
          </a>
        </div>

        {/* Features Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>ثبت‌نام ۱۰۰٪ رایگان</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>پشتیبانی مستقیم</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>بدون نیاز به نصب برنامه‌های پیچیده</span>
          </div>
        </div>
      </div>
    </div>
  );
};
