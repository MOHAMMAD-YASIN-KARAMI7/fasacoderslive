/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { RegistrationCTA } from './components/RegistrationCTA';
import { WebinarTopics } from './components/WebinarTopics';
import { InstructorSection } from './components/InstructorSection';
import { SocialLinks } from './components/SocialLinks';
import { JitsiLiveRoom } from './components/JitsiLiveRoom';
import { Footer } from './components/Footer';
import { TabType, WebinarConfig } from './types';

// Default Fallback Config
const defaultConfig: WebinarConfig = {
  webinarTitle: "دروازه ورود به دنیای برنامه‌نویسی",
  subtitle: "مقدمه‌ای جامع و کاربردی برای علاقه‌مندان به شروع برنامه‌نویسی",
  description: "در این وبینار با دنیای برنامه‌نویسی آشنا می‌شوید؛ از اینکه برنامه‌نویسی چیست و چه کاربردهایی دارد تا مسیر یادگیری، انتخاب مسیر تخصصی و قدم‌های تبدیل شدن به یک برنامه‌نویس.",
  instructor: {
    name: "محمد یاسین کرمی",
    role: "مدرس و ارائه‌دهنده وبینار برنامه‌نویسی",
    bio: "برنامه‌نویس و ارائه‌دهنده دوره‌های آموزش برنامه‌نویسی با هدف ساده‌سازی مسیر یادگیری برای تازه‌کاران و توسعه‌دهندگان.",
    image: "/src/assets/images/instructor_portrait_1785861075193.jpg"
  },
  webinarDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  socialLinks: {
    telegram: "https://t.me/fasacoders",
    instagram: "https://instagram.com/fasacoders",
    github: "https://github.com/fasacoders"
  },
  logoUrl: "/logo.png",
  jitsiRoomName: "FasaCodersProgrammingGate",
  jitsiDomain: "meet.jit.si",
  giftMessage: "هدیه اختصاصی این وبینار پس از پایان رویداد برای شرکت‌کنندگان ارسال می‌شود.",
  registrationUrl: "https://t.me/fasacoders"
};

export default function App() {
  const [config, setConfig] = useState<WebinarConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<TabType>('landing');

  // Fetch webinar config on load
  const loadConfigAndStats = async () => {
    try {
      const cfgRes = await fetch('/api/config');
      if (cfgRes.ok) {
        const cfgData = await cfgRes.json();
        setConfig(cfgData);
      }
    } catch (err) {
      console.error('Error loading config:', err);
    }
  };

  useEffect(() => {
    loadConfigAndStats();
  }, []);

  const scrollToRegistration = () => {
    const el = document.getElementById('registration-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      {/* Sleek Background Glowing Orbs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow z-0" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow z-0" />

      {/* Navigation Bar */}
      <Navbar
        config={config}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Tab Content */}
      <main className="flex-1 relative z-10">
        {activeTab === 'landing' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <HeroSection
              config={config}
              onRegisterClick={scrollToRegistration}
              onLiveClick={() => setActiveTab('live')}
            />

            {/* Countdown Timer */}
            <div className="max-w-5xl mx-auto px-4">
              <CountdownTimer
                targetDateISO={config.webinarDate}
                onLiveClick={() => setActiveTab('live')}
              />
            </div>

            {/* Registration CTA Button Section */}
            <div className="py-6 px-4">
              <RegistrationCTA config={config} />
            </div>

            {/* Topics Covered */}
            <WebinarTopics />

            {/* Instructor Section */}
            <InstructorSection instructor={config.instructor} />

            {/* Social Links */}
            <SocialLinks links={config.socialLinks} />
          </div>
        )}

        {activeTab === 'live' && (
          <div className="py-4">
            <JitsiLiveRoom config={config} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer config={config} setActiveTab={setActiveTab} />
    </div>
  );
}
