import React from 'react';
import { Code2, Compass, DollarSign, Layers, MapPin, Lightbulb, Rocket, CheckCircle2 } from 'lucide-react';
import { WebinarTopic } from '../types';

const topics: WebinarTopic[] = [
  {
    id: 'topic_1',
    title: 'برنامه‌نویسی چیست و چطور کار می‌کند؟',
    description: 'آشنایی با مفهوم الگوریتم، منطق برنامه‌نویسی و شیوه تفکر برنامه‌نویسانه به زبان بسیار ساده بدون فرضیات پیچیده.',
    iconName: 'Code2',
    tag: 'مفاهیم پایه'
  },
  {
    id: 'topic_2',
    title: 'چرا یادگیری برنامه‌نویسی ارزشمند است؟',
    description: 'بررسی قدرت حل مسئله، ساخت محصولات واقعی، انعطاف شغلی، کار ریموت و تأثیر شگرف برنامه‌نویسی در دنیای امروز.',
    iconName: 'Lightbulb',
    tag: 'مزایا و کاربرد'
  },
  {
    id: 'topic_3',
    title: 'شناخت حوزه‌های مختلف برنامه‌نویسی',
    description: 'بررسی جامع حوزه‌های وب (فرانت‌اند و بک‌اند)، هوش مصنوعی، موبایل، بازی‌سازی و دسکتاپ برای انتخاب بهترین مسیر.',
    iconName: 'Layers',
    tag: 'گرایش‌ها'
  },
  {
    id: 'topic_4',
    title: 'فرصت‌های شغلی و بازار کار در ایران و جهان',
    description: 'بررسی درآمد، ریموت‌کاری، فریلنسینگ و شیوه‌های ورود به بازار کار محلی و بین‌المللی برنامه‌نویسی.',
    iconName: 'DollarSign',
    tag: 'بازار کار'
  },
  {
    id: 'topic_5',
    title: 'چگونگی شروع و انتخاب اولین زبان',
    description: 'کدام زبان برنامه‌نویسی برای شروع مناسب‌تر است؟ پایتون، جاوااسکریپت یا C#؟ پاسخ علمی به بزرگ‌ترین سوال مبتدیان.',
    iconName: 'Compass',
    tag: 'نقطه شروع'
  },
  {
    id: 'topic_6',
    title: 'نقشه راه یادگیری از صفر تا ورود به بازار کار',
    description: 'قدم‌های علمی و عملی تبدیل شدن از یک فرد مبتدی بدون پیش‌زمینه به یک توسعه‌دهنده حرفه‌ای آماده استخدام.',
    iconName: 'Rocket',
    tag: 'نقشه راه'
  }
];

export const WebinarTopics: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-amber-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-emerald-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-pink-400" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-cyan-400" />;
      default: return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>سرفصل‌های اختصاصی رویداد</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          در این وبینار چه چیزهایی می‌آموزید؟
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl mx-auto">
          یک بررسی کلیدی و شفاف برای برداشتن اولین قدم‌های مطمئن در دنیای توسعه نرم‌افزار
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className="glass-card glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-cyan-500/40 transition">
                  {getIcon(topic.iconName)}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {topic.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                {index + 1}. {topic.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {topic.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>پوشش کامل در وبینار آنلاین</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
