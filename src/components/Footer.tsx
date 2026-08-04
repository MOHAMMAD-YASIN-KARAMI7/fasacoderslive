import React from 'react';
import { Logo } from './Logo';
import { WebinarConfig, TabType } from '../types';
import { Send, Instagram, Github, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  config: WebinarConfig;
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, setActiveTab }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 mt-20 relative overflow-hidden text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo logoUrl={config.logoUrl} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              پلتفرم فساکدرز لایو (Fasa Coders Live) — رسانه و آکادمی تخصصی برنامه‌نویسی با هدف آموزش ساده، علمی و کاربردی برای ورود علاقه‌مندان به دنیای توسعه نرم‌افزار.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('landing')}
                  className="hover:text-cyan-400 transition"
                >
                  صفحه اصلی وبینار
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('live')}
                  className="hover:text-cyan-400 transition"
                >
                  اتاق پخش زنده (Jitsi Meet)
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200">شبکه‌های اجتماعی</h4>
            <div className="flex items-center gap-3">
              {config.socialLinks.telegram && (
                <a
                  href={config.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 transition"
                  title="تلگرام"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}

              {config.socialLinks.instagram && (
                <a
                  href={config.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 text-pink-400 transition"
                  title="اینستاگرام"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {config.socialLinks.github && (
                <a
                  href={config.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-purple-300 transition"
                  title="گیت‌هاب"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            کلیه حقوق این وبینار متعلق به برند <strong className="text-slate-300">Fasa Coders</strong> می‌باشد.
          </p>
          <div className="flex items-center gap-1">
            <span>طراحی و اجرا برای وبینار «{config.webinarTitle}» با تدریس {config.instructor.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
