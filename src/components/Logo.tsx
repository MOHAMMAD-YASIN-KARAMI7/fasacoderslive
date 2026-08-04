import React from 'react';
import { Code2, Terminal, Sparkles } from 'lucide-react';

interface LogoProps {
  logoUrl?: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  logoUrl,
  className = '',
  showText = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-14 text-lg'
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const hasCustomLogo = logoUrl && logoUrl.trim().length > 0 && logoUrl !== '/logo.jpg' && logoUrl !== '/logo.png';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {hasCustomLogo ? (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
          <img
            src={logoUrl}
            alt="Fasa Coders Logo"
            referrerPolicy="no-referrer"
            className={`relative object-contain rounded-xl bg-slate-950 border border-cyan-500/30 p-1 ${iconSizes[size]}`}
            onError={(e) => {
              // Fallback to SVG badge if image fails to load
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) (fallback as HTMLElement).style.display = 'flex';
            }}
          />
          <div className={`hidden relative rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 items-center justify-center glow-cyan-box ${iconSizes[size]}`}>
            <Code2 className="text-cyan-400 w-3/5 h-3/5" />
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <div className={`relative rounded-2xl bg-slate-950/90 border border-cyan-500/40 flex items-center justify-center ${iconSizes[size]} glow-cyan-box`}>
            <div className="relative flex items-center justify-center">
              <Terminal className="text-cyan-400 w-1/2 h-1/2 animate-pulse" />
              <Sparkles className="text-purple-400 w-1/3 h-1/3 absolute -top-1 -right-1" />
            </div>
          </div>
        </div>
      )}

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-purple-400 bg-clip-text text-transparent drop-shadow-sm font-black text-xl">
              Fasa Coders
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              LIVE
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 tracking-normal">
            فساکدرز | رسانه تخصصی برنامه‌نویسی
          </span>
        </div>
      )}
    </div>
  );
};
