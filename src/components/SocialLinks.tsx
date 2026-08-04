import React, { useState } from 'react';
import { Send, Instagram, Github, ExternalLink, Copy, Check, Share2 } from 'lucide-react';
import { SocialLinks as SocialLinksType } from '../types';

interface SocialLinksProps {
  links: SocialLinksType;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const socialItems = [
    {
      key: 'telegram',
      title: 'کانال تلگرام فساکدرز',
      url: links.telegram || 'https://t.me/fasacoders',
      icon: <Send className="w-6 h-6 text-cyan-400" />,
      colorClass: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
      buttonBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
      description: 'اطلاع‌رسانی لایوها، آموزش‌های متنی و لینک‌های وبینار'
    },
    {
      key: 'instagram',
      title: 'صفحه اینستاگرام',
      url: links.instagram || 'https://instagram.com/fasacoders',
      icon: <Instagram className="w-6 h-6 text-pink-400" />,
      colorClass: 'border-pink-500/30 bg-pink-950/20 text-pink-300',
      buttonBg: 'bg-pink-500 hover:bg-pink-400 text-slate-950',
      description: 'پست‌ها و ویدیوهای کوتاه آموزشی مفاهیم برنامه‌نویسی'
    },
    {
      key: 'github',
      title: 'گیت‌هاب فساکدرز',
      url: links.github || 'https://github.com/fasacoders',
      icon: <Github className="w-6 h-6 text-purple-400" />,
      colorClass: 'border-purple-500/30 bg-purple-950/20 text-purple-300',
      buttonBg: 'bg-purple-500 hover:bg-purple-400 text-slate-950',
      description: 'کدهای پروژه، پروژه‌های اپن سورس و تمرین‌های وبینار'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
          <Share2 className="w-3.5 h-3.5 text-purple-400" />
          <span>شبکه‌های اجتماعی و ارتباطات</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          همراه فساکدرز باشید
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          برای دسترسی به فایل‌های آموزشی و اخبار وبینارها ما را در شبکه‌های اجتماعی دنبال کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {socialItems.map((item) => (
          <div
            key={item.key}
            className={`glass-card rounded-2xl p-6 border ${item.colorClass} flex flex-col justify-between transition-all hover:scale-[1.02]`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  {item.icon}
                </div>
                <button
                  onClick={() => handleCopy(item.url, item.key)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-xs flex items-center gap-1"
                  title="کپی لینک"
                >
                  {copiedKey === item.key ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md ${item.buttonBg}`}
            >
              <span>مشاهده و عضویت</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
