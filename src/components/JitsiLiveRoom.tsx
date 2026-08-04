import React, { useEffect, useRef, useState } from 'react';
import { Radio, ShieldCheck, RefreshCw, AlertCircle, Video } from 'lucide-react';
import { WebinarConfig } from '../types';

interface JitsiLiveRoomProps {
  config: WebinarConfig;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export const JitsiLiveRoom: React.FC<JitsiLiveRoomProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  const [displayName, setDisplayName] = useState(() => {
    return localStorage.getItem('fasa_user_name') || '';
  });
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (!hasJoined || !containerRef.current) return;

    // Save display name for future visits
    if (displayName) {
      localStorage.setItem('fasa_user_name', displayName);
    }

    const domain = config.jitsiDomain || 'meet.jit.si';
    const roomName = config.jitsiRoomName || 'FasaCodersProgrammingGate';

    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        initJitsi();
      } else {
        const script = document.createElement('script');
        script.src = `https://${domain}/external_api.js`;
        script.async = true;
        script.onload = initJitsi;
        document.body.appendChild(script);
      }
    };

    const initJitsi = () => {
      if (!containerRef.current || jitsiApiRef.current) return;

      containerRef.current.innerHTML = '';

      const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: containerRef.current,
        userInfo: {
          displayName: displayName || 'شرکت‌کننده فساکدرز'
        },
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          readOnlyName: false
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants-pane',
            'tileview',
            'fullscreen',
            'hangup',
            'etherpad'
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          DEFAULT_BACKGROUND: '#050505',
          MOBILE_APP_PROMO: false
        }
      };

      try {
        const api = new window.JitsiMeetExternalAPI(domain, options);
        jitsiApiRef.current = api;

        api.addEventListener('videoConferenceJoined', () => {
          console.log('User joined Fasa Coders Live room');
        });
      } catch (err) {
        console.error('Failed to initialize Jitsi Meet External API:', err);
      }
    };

    loadJitsiScript();

    return () => {
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch {
          // ignore
        }
        jitsiApiRef.current = null;
      }
    };
  }, [hasJoined, config, displayName]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setHasJoined(true);
  };

  if (!hasJoined) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 px-4">
        <div className="glass-panel rounded-3xl p-8 border border-cyan-500/30 relative overflow-hidden text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 mb-4 glow-cyan-box">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            ورود به پلتفرم فساکدرز لایو (Jitsi Meet)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
            وبینار به صورت اختصاصی در بستر Jitsi Meet برگزار می‌شود. چت زنده، دست گرفتن و اشتراک‌گذاری تصویر به صورت خودکار داخل پلتفرم Jitsi فعال است.
          </p>

          <form onSubmit={handleJoin} className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-right text-xs font-semibold text-slate-300 mb-1.5">
                نام و نام خانوادگی شما در وبینار:
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="مثال: علی محمدی"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm text-right"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:to-pink-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
            >
              <Video className="w-4 h-4 text-cyan-200" />
              <span>اتصال مستقیم به وبینار لایو</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>وبینار اختصاصی Fasa Coders با کیفیت بالا و قابلیت چت زنده در Jitsi</span>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setHasJoined(false)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
            <span>تغییر نام</span>
          </button>
        </div>
      </div>

      {/* Full Width Jitsi Room Player Container */}
      <div className="flex flex-col gap-4 w-full">
        <div className="glass-card rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl relative bg-slate-950 w-full h-[650px] sm:h-[720px]">
          <div ref={containerRef} className="w-full h-full min-h-[650px]" />
        </div>

        {/* Info Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>امکانات چت زنده، گفتگو، دست گرفتن و لیست شرکت‌کنندگان به صورت کامل در منوی Jitsi Meet فعال است.</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">پلتفرم فساکدرز لایو (Fasa Coders)</span>
        </div>
      </div>
    </div>
  );
};
