import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default webinar configuration
const defaultConfig = {
  webinarTitle: "دروازه ورود به دنیای برنامه‌نویسی",
  subtitle: "مقدمه‌ای جامع و کاربردی برای علاقه‌مندان به شروع برنامه‌نویسی",
  description: "در این وبینار با دنیای برنامه‌نویسی آشنا می‌شوید؛ از اینکه برنامه‌نویسی چیست و چه کاربردهایی دارد تا مسیر یادگیری، انتخاب مسیر تخصصی و قدم‌های تبدیل شدن به یک برنامه‌نویس.",
  instructor: {
    name: "محمد یاسین کرمی",
    role: "مدرس و ارائه‌دهنده وبینار برنامه‌نویسی",
    bio: "برنامه‌نویس و ارائه‌دهنده دوره‌های آموزش برنامه‌نویسی با هدف ساده‌سازی مسیر یادگیری برای تازه‌کاران و توسعه‌دهندگان.",
    image: "/instructor.png"
  },
  // Default scheduled date: Tuesday 20 Mordad 1405 at 19:00 IRST (2026-08-11 15:30 UTC)
  webinarDate: "2026-08-11T15:30:00.000Z",
  socialLinks: {
    telegram: "https://t.me/fasacoders",
    instagram: "https://instagram.com/fasacoders",
    github: "https://github.com/fasacoders"
  },
  logoUrl: "/logo.png",
  jitsiRoomName: "FasaCodersProgrammingGate",
  jitsiDomain: "meet.jit.si",
  giftMessage: "هدیه اختصاصی این وبینار پس از پایان رویداد به صورت دستی توسط مدیریت برای شما ارسال خواهد شد.",
  registrationUrl: "https://t.me/fasacodersbot"
};

// Initialize config file if absent
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
}

// Initialize registrations file if absent
if (!fs.existsSync(REGISTRATIONS_FILE)) {
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([], null, 2));
}

function getConfig() {
  try {
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultConfig;
  }
}

function getRegistrations() {
  try {
    const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveRegistrations(items: any[]) {
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(items, null, 2));
}

function saveConfig(cfg: any) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API Routes
  
  // Healthcheck
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get webinar configuration
  app.get('/api/config', (_req, res) => {
    const config = getConfig();
    res.json(config);
  });

  // Update webinar configuration (Admin capability)
  app.post('/api/config', (req, res) => {
    try {
      const currentConfig = getConfig();
      const updatedConfig = { ...currentConfig, ...req.body };
      saveConfig(updatedConfig);
      res.json({ success: true, config: updatedConfig });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'خطا در به‌روزرسانی تنظیمات' });
    }
  });

  // Register participant
  app.post('/api/register', (req, res) => {
    try {
      const { name, phone, email } = req.body;

      if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ success: false, message: 'لطفاً نام و نام خانوادگی خود را وارد کنید.' });
      }

      if (!phone || typeof phone !== 'string' || !phone.trim()) {
        return res.status(400).json({ success: false, message: 'لطفاً شماره تلفن همراه خود را وارد کنید.' });
      }

      const cleanPhone = phone.trim().replace(/\s+/g, '');
      const registrations = getRegistrations();

      // Check duplicate phone
      const existing = registrations.find((r: any) => r.phone === cleanPhone);
      if (existing) {
        return res.json({
          success: true,
          alreadyRegistered: true,
          message: 'شماره شما قبلاً در این وبینار ثبت شده است.',
          registration: existing
        });
      }

      const newRecord = {
        id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: name.trim(),
        phone: cleanPhone,
        email: email ? email.trim() : '',
        registrationDate: new Date().toISOString()
      };

      registrations.push(newRecord);
      saveRegistrations(registrations);

      return res.status(201).json({
        success: true,
        message: 'ثبت‌نام شما با موفقیت انجام شد 🎉',
        registration: newRecord
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      return res.status(500).json({ success: false, message: 'خطا در ثبت اطلاعات، لطفاً مجدداً تلاش کنید.' });
    }
  });

  // Admin authentication check
  app.post('/api/admin/verify', (req, res) => {
    const { passcode } = req.body;
    // Accept "fasacoders2026", "fasa2026", or "admin123"
    const validPasscodes = ['fasacoders2026', 'fasa2026', 'admin123', 'admin'];
    if (validPasscodes.includes((passcode || '').trim().toLowerCase())) {
      return res.json({ success: true, message: 'دسترسی مجاز است.' });
    }
    return res.status(401).json({ success: false, message: 'رمز عبور پنل مدیریت نادرست است.' });
  });

  // Get list of registered participants
  app.get('/api/registrations', (_req, res) => {
    const list = getRegistrations();
    res.json({ count: list.length, registrations: list });
  });

  // Update gift status for a registration
  app.patch('/api/registrations/:id/gift', (req, res) => {
    try {
      const { id } = req.params;
      const { giftSent, giftNotes } = req.body;
      const list = getRegistrations();
      const index = list.findIndex((item: any) => item.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, message: 'کاربر یافت نشد.' });
      }

      const isSent = Boolean(giftSent);
      list[index].giftSent = isSent;
      list[index].giftSentAt = isSent ? new Date().toISOString() : undefined;
      if (giftNotes !== undefined) {
        list[index].giftNotes = giftNotes;
      }

      saveRegistrations(list);
      return res.json({
        success: true,
        message: isSent ? 'وضعیت هدیه به "ارسال شده" تغییر یافت.' : 'وضعیت هدیه به "در انتظار ارسال" تغییر یافت.',
        registration: list[index]
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Manually trigger gift sending to individual attendee
  app.post('/api/registrations/:id/send-gift', (req, res) => {
    try {
      const { id } = req.params;
      const { customNote } = req.body || {};
      const list = getRegistrations();
      const index = list.findIndex((item: any) => item.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, message: 'شرکت‌کننده مورد نظر یافت نشد.' });
      }

      const sentAt = new Date().toISOString();
      const note = customNote ? customNote.trim() : `کد هدیه: FASA-GIFT-${Math.floor(100000 + Math.random() * 900000)}`;

      list[index].giftSent = true;
      list[index].giftSentAt = sentAt;
      list[index].giftNotes = note;

      saveRegistrations(list);

      return res.json({
        success: true,
        message: `هدیه وبینار با موفقیت برای ${list[index].name} ارسال گردید 🎉`,
        registration: list[index]
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Batch trigger gift sending
  app.post('/api/registrations/batch-send-gifts', (req, res) => {
    try {
      const { ids, allPending } = req.body || {};
      const list = getRegistrations();
      let updatedCount = 0;
      const now = new Date().toISOString();

      list.forEach((item: any) => {
        const shouldSend = allPending ? !item.giftSent : (Array.isArray(ids) && ids.includes(item.id));
        if (shouldSend) {
          item.giftSent = true;
          item.giftSentAt = now;
          if (!item.giftNotes) {
            item.giftNotes = `ارسال گروهی هدیه وبینار (${new Date().toLocaleDateString('fa-IR')})`;
          }
          updatedCount++;
        }
      });

      if (updatedCount > 0) {
        saveRegistrations(list);
      }

      return res.json({
        success: true,
        message: `هدیه وبینار برای ${updatedCount} نفر با موفقیت ارسال شد.`,
        updatedCount
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Delete registration (admin feature)
  app.delete('/api/registrations/:id', (req, res) => {
    try {
      const { id } = req.params;
      let list = getRegistrations();
      const initialCount = list.length;
      list = list.filter((item: any) => item.id !== id);
      if (list.length === initialCount) {
        return res.status(404).json({ success: false, message: 'شناسه مورد نظر یافت نشد.' });
      }
      saveRegistrations(list);
      res.json({ success: true, message: 'ثبت‌نام حذف شد.', count: list.length });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Export registrations to CSV with Gift status
  app.get('/api/registrations/export', (_req, res) => {
    const list = getRegistrations();
    let csv = '\uFEFF'; // UTF-8 BOM for Excel Persian display
    csv += 'ردیف,نام و نام خانوادگی,شماره تماس,ایمیل,تاریخ ثبت نام,وضعیت هدیه,تاریخ ارسال هدیه,توضیحات هدیه\n';
    
    list.forEach((item: any, idx: number) => {
      const dateStr = new Date(item.registrationDate).toLocaleString('fa-IR');
      const giftStatus = item.giftSent ? 'ارسال شده' : 'در انتظار ارسال';
      const giftDateStr = item.giftSentAt ? new Date(item.giftSentAt).toLocaleString('fa-IR') : '—';
      const giftNotes = item.giftNotes ? item.giftNotes.replace(/"/g, '""') : '—';
      csv += `"${idx + 1}","${item.name || ''}","${item.phone || ''}","${item.email || ''}","${dateStr}","${giftStatus}","${giftDateStr}","${giftNotes}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=fasacoders_registrations_${Date.now()}.csv`);
    res.status(200).send(csv);
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fasa Coders Live Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
