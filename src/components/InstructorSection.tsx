import React from 'react';
import { Award, BookOpen, Sparkles, UserCheck, Terminal, Code2 } from 'lucide-react';
import { Instructor } from '../types';

interface InstructorSectionProps {
  instructor: Instructor;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ instructor }) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden">
        {/* Glow accent background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          {/* Instructor Emblem Icon (No Photo) */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-md opacity-70 animate-pulse-slow"></div>
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl border-2 border-cyan-400/50 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
                <Code2 className="w-12 h-12" />
              </div>
              <span className="text-xs font-bold text-slate-300">ارائه‌دهنده وبینار</span>
            </div>
            
            {/* Educator Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold whitespace-nowrap shadow-lg flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>مدرس برنامه‌نویسی</span>
            </div>
          </div>

          {/* Info Details */}
          <div className="flex-1 text-center lg:text-right space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>مدرس و ارائه‌دهنده وبینار</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {instructor.name}
            </h2>

            <p className="text-cyan-400 font-bold text-sm sm:text-base">
              {instructor.role}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {instructor.bio}
            </p>

            {/* Quick stats/highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">تخصص</div>
                  <div className="text-xs font-bold text-slate-200">برنامه‌نویس و مدرس و هوش مصنوعی</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">سادگی بیان</div>
                  <div className="text-xs font-bold text-slate-200">ویژه تازه‌کاران</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">هدف</div>
                  <div className="text-xs font-bold text-slate-200">هدایت نقشه راه</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
