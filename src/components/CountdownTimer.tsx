import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Radio, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDateISO: string;
  onLiveClick?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateISO,
  onLiveClick
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDateISO).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  const toPersianDigits = (num: number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num
      .toString()
      .padStart(2, '0')
      .replace(/\d/g, (x) => persianDigits[parseInt(x)]);
  };

  const formattedDate = () => {
    try {
      const d = new Date(targetDateISO);
      return d.toLocaleDateString('fa-IR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'تاریخ در حال تنظیم';
    }
  };

  if (timeLeft.isExpired) {
    return (
      <div className="w-full glass-card rounded-2xl p-6 border-2 border-red-500/40 bg-gradient-to-r from-red-950/40 via-purple-950/30 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 glow-purple-box">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <div className="relative p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/50">
              <Radio className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>وبینار هم‌اکنون در حال برگزاری است!</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              فرصت را از دست ندهید و همین حالا وارد پخش زنده شوید.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://t.me/fasacodersbot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-105 no-underline"
          >
            ثبت‌نام در وبینار
          </a>
          {onLiveClick && (
            <button
              onClick={onLiveClick}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold transition cursor-pointer"
            >
              ورود به وبینار
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-4">
          <Clock className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>شمارش معکوس تا شروع وبینار</span>
        </div>

        {/* Date Display */}
        <div className="flex items-center justify-center gap-2 text-slate-300 text-sm sm:text-base font-medium mb-6">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>زمان برگزاری: <strong className="text-cyan-300 font-bold">{formattedDate()}</strong></span>
        </div>

        {/* Timer Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-2xl">
          {/* Days */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-inner">
            <span className="text-2xl sm:text-4xl md:text-5xl font-black text-cyan-400 tracking-tight font-mono">
              {toPersianDigits(timeLeft.days)}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">روز</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-inner">
            <span className="text-2xl sm:text-4xl md:text-5xl font-black text-cyan-300 tracking-tight font-mono">
              {toPersianDigits(timeLeft.hours)}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">ساعت</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-inner">
            <span className="text-2xl sm:text-4xl md:text-5xl font-black text-purple-400 tracking-tight font-mono">
              {toPersianDigits(timeLeft.minutes)}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">دقیقه</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-inner">
            <span className="text-2xl sm:text-4xl md:text-5xl font-black text-pink-400 tracking-tight font-mono animate-pulse">
              {toPersianDigits(timeLeft.seconds)}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">ثانیه</span>
          </div>
        </div>
      </div>
    </div>
  );
};
