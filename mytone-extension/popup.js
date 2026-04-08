// ============================================
// Mytone Translate - Chrome Extension (Secure Version)
// ============================================

let isArabic = true;
let selectedTone = 'professional';
let currentResult = '';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// دالة جلب المفتاح من ذاكرة المتصفح
async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['groqApiKey'], (result) => {
      resolve(result.groqApiKey || null);
    });
  });
}

const toneInstructions = {
  friendly: { instruction: 'Transform this text into a warm, friendly, and approachable tone.', nameAr: 'ودود', nameEn: 'Friendly' },
  professional: { instruction: 'Transform this text into a formal, professional business tone.', nameAr: 'احترافي', nameEn: 'Professional' },
  enthusiastic: { instruction: 'Transform this text with high energy and excitement.', nameAr: 'متحمس', nameEn: 'Enthusiastic' },
  diplomatic: { instruction: 'Transform this text into a tactful, diplomatic tone.', nameAr: 'دبلوماسي', nameEn: 'Diplomatic' },
  direct: { instruction: 'Transform this text into a concise, clear, and direct message.', nameAr: 'مباشر', nameEn: 'Direct' }
};

const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');
const transformBtn = document.getElementById('transformBtn');
const resultContainer = document.getElementById('resultContainer');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');
const langToggle = document.getElementById('langToggle');
const toneButtons = document.querySelectorAll('.tone-btn');

function updateLanguage() {
  const elements = {
    subtitle: isArabic ? 'مترجم النبرة' : 'Tone Translator',
    toneTitle: isArabic ? 'اختر النبرة:' : 'Select Tone:',
    langLabel: isArabic ? 'اللغة المطلوبة:' : 'Target Language:',
    inputLabel: isArabic ? 'اكتب رسالتك:' : 'Write your message:',
    btnText: isArabic ? 'حوّل الآن' : 'Transform Now',
    resultLabel: isArabic ? 'النتيجة:' : 'Result:',
    copyText: isArabic ? 'نسخ' : 'Copy',
    langToggle: isArabic ? 'EN' : 'AR'
  };
  for (const [id, text] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}

async function transformText(text, tone, targetLang) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error(isArabic ? 'يرجى وضع مفتاح الـ API في الخانة بالأسفل أولاً' : 'Please enter API Key in the box below first');
  }

  const toneConfig = toneInstructions[tone];
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `Transform text to ${toneConfig.instruction}. Return ONLY result.` },
        { role: 'user', content: text }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error('API Error');
  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || '';
}

inputText.addEventListener('input', () => {
  charCount.textContent = inputText.value.length;
  transformBtn.disabled = inputText.value.trim().length === 0;
});

toneButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    toneButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedTone = btn.dataset.tone;
  });
});

langToggle.addEventListener('click', () => {
  isArabic = !isArabic;
  updateLanguage();
});

transformBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  if (!text) return;
  transformBtn.disabled = true;
  errorMsg.style.display = 'none';
  try {
    const targetLang = document.getElementById('targetLang').value;
    currentResult = await transformText(text, selectedTone, targetLang);
    resultText.textContent = currentResult;
    resultContainer.style.display = 'block';
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.style.display = 'block';
  } finally {
    transformBtn.disabled = false;
  }
});

// كود حفظ المفتاح من واجهة الإضافة
document.getElementById('saveKeyBtn').addEventListener('click', () => {
  const key = document.getElementById('apiKeyInput').value;
  if (key) {
    chrome.storage.sync.set({ groqApiKey: key }, () => {
      alert(isArabic ? 'تم حفظ المفتاح!' : 'Key Saved!');
    });
  }
});

updateLanguage();
