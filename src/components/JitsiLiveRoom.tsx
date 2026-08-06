import React from 'react';
import { AlertCircle, ShieldCheck, Video } from 'lucide-react';
import { WebinarConfig } from '../types';

interface JitsiLiveRoomProps {
  config: WebinarConfig;
}

export const JitsiLiveRoom: React.FC<JitsiLiveRoomProps> = ({ config }) => {
  const roomName = config.jitsiRoomName || 'FasaCodersProgrammingGate';
  const roomUrl = `https://meet.jit.si/${roomName}`;

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-2 sm:px-4 space-y-6">
      {/* Live Header Status */}
      <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{config.webinarTitle}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/40 font-mono">
                JITSI MEET LIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              مدرس: <strong className="text-cyan-300">{config.instructor.name}</strong> | برند: <strong className="text-purple-300">فساکدرز (Fasa Coders)</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={roomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Video className="w-3.5 h-3.5" />
            <span>باز کردن در پنجره جدید</span>
          </a>
        </div>
      </div>

      {/* Full Width Standard Iframe Jitsi Room */}
      <div className="flex flex-col gap-4 w-full">
        <div className="glass-card rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl relative bg-slate-950 w-full h-[680px] sm:h-[750px]">
          <iframe
            src={roomUrl}
            title="FasaCoders Live Webinar Room"
            className="w-full h-full border-0"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen; speaker; geolocation"
            allowFullScreen
          />
        </div>

        {/* Info Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>امکانات چت زنده، گفتگو، دست گرفتن و اشتراک‌گذاری تصویر به صورت کامل فعال است.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[11px]">FasaCoders Programming Gate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

