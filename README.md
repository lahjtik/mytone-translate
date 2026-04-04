# Mytone Translate - مترجم النبرة

<div align="center">
  <h1>Mytone Translate</h1>
  <p><strong>مترجم النبرة</strong> - حافظ على نبرتك الأصلية في أي رسالة</p>
  <p>Transform your text while preserving your authentic voice and tone</p>
</div>

---

## 📋 الفهرس

- [نبذة عن المشروع](#نبذة-عن-المشروع)
- [المميزات](#المميزات)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [متطلبات التشغيل](#متطلبات-التشغيل)
- [التثبيت محلياً](#التثبيت-محلياً)
- [النشر على Vercel](#النشر-على-vercel)
- [متغيرات البيئة (Environment Variables)](#متغيرات-البيئة-environment-variables)
- [هيكل المشروع](#هيكل-المشروع)
- [كيف يعمل](#كيف-يعمل)
- [التخصيص](#التخصيص)
- [نماذج التسعير](#نماذج-التسعير)
- [الأسئلة الشائعة](#الأسئلة-الشائعة)
- [الرخصة](#الرخصة)

---

## نبذة عن المشروع

**Mytone Translate** هو أداة مدعومة بالذكاء الاصطناعي تحول أي نص مكتوب بشكل عشوائي إلى رسالة احترافية مع الحفاظ على شخصية الكاتب ونبرته الأصلية.

### المشكلة التي يحلها

- **1.5 مليار** شخص يكتبون باللغة الإنجليزية في العمل يومياً
- **85%** منهم يفتقرون للثقة في كتاباتهم
- **60%** يتجنبون كتابة رسائل مهمة بسبب الخوف من الظهور غير احترافي

### الحل

Mytone Translate يحول أي نص مكتوب بشكل عشوائي إلى رسالة احترافية مع الحفاظ على شخصية الكاتب ونبرته الأصلية.

---

## المميزات

| الميزة | الوصف |
|--------|-------|
| 🎯 **5 نبرات مختلفة** | ودود، احترافي، متحمس، دبلوماسي، مباشر |
| 🌍 **20+ لغة** | الإنجليزية، العربية، الإسبانية، الفرنسية، والألمانية... |
| ⚡ **فوري** | نتائج في ثوانٍ |
| 🔒 **آمن** | البيانات لا تُخزّن |
| 📱 **متجاوب** | يعمل على جميع الأجهزة |
| 🌐 **ثنائي اللغة** | واجهة عربية وإنجليزية |

---

## التقنيات المستخدمة

### Frontend (الواجهة الأمامية)

| التقنية | الغرض | الإصدار |
|--------|-------|---------|
| React 18 | إطار عمل الواجهة | 18.3.1 |
| TypeScript | لغة البرمجة | 5.6 |
| Tailwind CSS | تنسيق الموقع | 3.4 |
| Vite | بناء المشروع | 6.0 |
| Lucide React | أيقونات | 0.364 |

### Backend (الخادم الخلفي)

| التقنية | الغرض | الرابط |
|--------|-------|--------|
| Groq AI API | معالجة اللغة الطبيعية | https://console.groq.com |
| Llama 3.3 70B | نموذج الذكاء الاصطناعي | - |

### الاستضافة والنشر

| التقنية | الغرض | الرابط |
|--------|-------|--------|
| Vercel | الاستضافة | https://vercel.com |
| MiniMax Deploy | النشر السريع | https://agent.minimax.io |

---

## متطلبات التشغيل

| المتطلب | الحد الأدنى |
|--------|-----------|
| Node.js | 18.0.0+ |
| pnpm | 8.0.0+ |
| حساب Groq API | مجاني (trial) |
| حساب Vercel | مجاني |

---

## التثبيت محلياً

### الخطوة 1: استنساخ المشروع

```bash
# استنساخ من GitHub
git clone https://github.com/YOUR_USERNAME/mytone-translate.git
cd mytone-translate
```

أو قم باستخراج ملف ZIP الذي تم تحميله.

### الخطوة 2: تثبيت الاعتماديات

```bash
# باستخدام pnpm (موصى به)
pnpm install

# أو باستخدام npm
npm install

# أو باستخدام yarn
yarn install
```

### الخطوة 3: إعداد متغيرات البيئة

```bash
# أنشئ ملف .env في المجلد الرئيسي
cp .env.example .env
```

ثم أضف مفتاح API:
```env
VITE_GROQ_API_KEY=gsk_your_api_key_here
```

### الخطوة 4: تشغيل المشروع

```bash
# للتطوير
pnpm dev

# للإنتاج
pnpm build
pnpm preview
```

### الخطوة 5: فتح المشروع

افتح المتصفح على: http://localhost:5173

---

## النشر على Vercel

### الخطوة 1: إنشاء حساب Vercel

1. اذهب إلى https://vercel.com
2. سجّل باستخدام GitHub أو البريد الإلكتروني
3. فعّل حسابك

### الخطوة 2: استيراد المشروع

#### الطريقة الأولى: من GitHub

```bash
# ارفع المشروع إلى GitHub أولاً
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mytone-translate.git
git push -u origin main

# ثم في Vercel:
# 1. انقر على "New Project"
# 2. اختر المستودع من GitHub
# 3. اضغط "Import"
```

#### الطريقة الثانية: من CLI

```bash
# 1. ثبّت Vercel CLI
npm i -g vercel

# 2. سجل دخول
vercel login

# 3. انشر
cd mytone-translate
vercel

# 4. للإنتاج
vercel --prod
```

### الخطوة 3: إضافة Environment Variables

1. في لوحة تحكم Vercel، اذهب إلى **Project Settings**
2. انقر على **Environment Variables**
3. أضف المتغيرات التالية:

| الاسم | القيمة | ملاحظات |
|-------|-------|---------|
| `VITE_GROQ_API_KEY` | `gsk_your_key` | مفتاح Groq API |

### الخطوة 4: النشر

1. اضغط **Deploy**
2. انتظر حتى اكتمال البناء
3. ستحصل على رابط مثل: `mytone-translate.vercel.app`

### الخطوة 5: ربط الدومين المخصص (اختياري)

1. اذهب إلى **Settings** > **Domains**
2. أضف دومينك (مثل: `mytone-translate.com`)
3. حدّث DNS عند المسجّل:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel.com
```

---

## متغيرات البيئة (Environment Variables)

### متغيرات مطلوبة

| المتغير | الوصف | مطلوب | مثال |
|---------|-------|-------|------|
| `VITE_GROQ_API_KEY` | مفتاح Groq API للوصول إلى نموذج Llama 3.3 | ✅ نعم | `gsk_xxxxxxxxxxxxx` |

### كيفية الحصول على مفتاح Groq API

1. اذهب إلى https://console.groq.com
2. سجّل حساب جديد أو سجل دخول
3. اذهب إلى **API Keys**
4. اضغط **Create API Key**
5. انسخ المفتاح وأضفه لمتغيرات البيئة

### متغيرات اختيارية

| المتغير | الوصف | مطلوب | مثال |
|---------|-------|-------|------|
| `VITE_APP_NAME` | اسم التطبيق | لا | `Mytone Translate` |
| `VITE_GA_ID` | معرف Google Analytics | لا | `G-XXXXXXXXXX` |

### ملاحظات مهمة

> ⚠️ **تنبيه أمان:**
> - لا تشارك مفتاح API الخاص بك مع أي شخص
> - لا ترفع ملف `.env` إلى GitHub
> - أضف `.env` إلى `.gitignore`

```bash
# مثال على .gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

---

## هيكل المشروع

```
mytone-translate/
├── public/
│   └── (ملفات ثابتة عامة)
├── src/
│   ├── lib/
│   │   └── api.ts          # اتصال API الذكاء الاصطناعي
│   ├── App.tsx              # المكون الرئيسي للتطبيق
│   ├── App.css              # تنسيقات إضافية
│   ├── index.css            # تنسيقات Tailwind
│   └── main.tsx             # نقطة الدخول للتطبيق
├── dist/                     # الملفات المبنية (تُنشأ عند البناء)
├── index.html                # ملف HTML الرئيسي
├── package.json              # تعريف المشروع والاعتماديات
├── tsconfig.json             # إعدادات TypeScript
├── vite.config.ts            # إعدادات Vite
├── tailwind.config.js        # إعدادات Tailwind CSS
├── postcss.config.js         # إعدادات PostCSS
├── .env                      # متغيرات البيئة المحلية (لا يُرفع)
├── .env.example              # قالب متغيرات البيئة
├── .gitignore                # ملفات يتم تجاهلها في Git
├── README.md                 # هذا الملف
├── LICENSE                   # ملف الرخصة
└── GUIDE.md                  # دليل التشغيل والبيع
```

---

## كيف يعمل

### 1. المستخدم يكتب النص

```
مثال: "i want to talk about project maybe we can do better"
```

### 2. اختيار النبرة

| النبرة | الوصف | مثال على الاستخدام |
|--------|-------|-------------------|
| 😊 ودود | دافئ وسهل التعامل | للزملاء والأصدقاء |
| 💼 احترافي | رسمي ومهني | للبريد الإلكتروني الرسمي |
| 🚀 متحمس | مثير وملهم | للإقناع والتحفيز |
| 🤝 دبلوماسي | حكيم وحريص | للمواضيع الحساسة |
| ⚡ مباشر | موجز وواضح | للتقرير السريع |

### 3. المعالجة بالذكاء الاصطناعي

```typescript
// يتم إرسال النص إلى Groq API مع تعليمات النبرة
const result = await transformText({
  text: inputText,
  tone: selectedTone
});
```

### 4. النتيجة

```
النص الأصلي: "i want to talk about project maybe we can do better"
النتيجة: "I would like to discuss the project. I believe we have an opportunity to improve our approach."
```

---

## التخصيص

### تغيير الألوان

عدّل في `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo
        secondary: '#8b5cf6', // Purple
        accent: '#ec4899', // Pink
      }
    },
  },
  plugins: [],
}
```

### إضافة نبرة جديدة

عدّل في `src/lib/api.ts`:

```typescript
export type ToneType =
  | 'friendly'
  | 'professional'
  | 'enthusiastic'
  | 'diplomatic'
  | 'direct'
  | 'yourNewTone'; // أضف النبرة الجديدة هنا

const toneInstructions = {
  // ... النبرات الموجودة
  yourNewTone: {
    instruction: 'Description of the new tone...',
    emoji: '✨'
  }
};
```

### إضافة لغة جديدة

عدّل في `src/lib/api.ts`:

```typescript
export const languages = [
  // ... اللغات الموجودة
  { code: 'ur', name: 'Urdu', nameAr: 'الأردية' }
];
```

---

## نماذج التسعير

### للمستخدمين الأفراد

| الخطة | السعر | التحويلات | الميزات |
|-------|-------|----------|---------|
| مجاني | $0 | 5/شهر | 5 نبرات |
| أساسي | $9.99/شهر | 100/شهر | + جميع اللغات |
| احترافي | $19.99/شهر | غير محدود | + أولوية |

### للشركات

| الخطة | السعر | المستخدمين | الميزات |
|-------|-------|----------|---------|
| فريق | $99/شهر | 10 | + تقارير + API |
| شركة | $299/شهر | 50 | + مدير حساب + تخصيص |
| مؤسسات | $799/شهر | غير محدود | + SSO + SLA |

---

## الأسئلة الشائعة

### س: هل يمكنني استخدام Groq API مجاناً؟
ج: نعم، Groq يوفر استخدام مجاني كافي للبدء (trial).

### س: هل البيانات آمنة؟
ج: نعم، لا نخزّن أي بيانات نصية. كل المعالجة تتم في الوقت الفعلي.

### س: كم يستغرق البناء؟
ج: عادة 1-3 دقائق حسب حجم المشروع.

### س: هل يمكنني تخصيص الأداة؟
ج: نعم، الكود مفتوح المصدر ويمكنك تخصيصه حسب احتياجاتك.

### س: كيف أبدأ البيع؟
ج: راجع ملف `GUIDE.md` للحصول على استراتيجية البيع.

---

## الرخصة

هذا المشروع مرخص تحت MIT License.

---

## التواصل والدعم

| القناة | الرابط |
|-------|--------|
| الموقع | https://mytone-translate.com |
| GitHub | https://github.com/YOUR_USERNAME/mytone-translate |
| البريد | support@mytone-translate.com |

---

<div align="center">
  <p>صُنع بـ ❤️ باستخدام Groq AI</p>
  <p>© 2025 Mytone Translate. جميع الحقوق محفوظة.</p>
</div>
