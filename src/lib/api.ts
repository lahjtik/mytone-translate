const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export type ToneType =
  | 'friendly'
  | 'professional'
  | 'enthusiastic'
  | 'diplomatic'
  | 'direct';

export interface TransformRequest {
  text: string;
  tone: ToneType;
  targetLanguage?: string;
}

export interface TransformResponse {
  original: string;
  transformed: string;
  tone: string;
  toneDescription: string;
}

const toneInstructions: Record<ToneType, { instruction: string; emoji: string }> = {
  friendly: {
    instruction: 'Transform this text into a warm, friendly, and approachable tone. Keep it conversational but professional. Use friendly language while maintaining clarity.',
    emoji: '😊'
  },
  professional: {
    instruction: 'Transform this text into a formal, professional business tone. Make it suitable for workplace communication, corporate emails, or official correspondence.',
    emoji: '💼'
  },
  enthusiastic: {
    instruction: 'Transform this text with high energy and excitement. Make it inspiring and motivating while still being clear and understandable.',
    emoji: '🚀'
  },
  diplomatic: {
    instruction: 'Transform this text into a tactful, diplomatic tone. Handle sensitive topics carefully, be polite but firm, and maintain good relationships.',
    emoji: '🤝'
  },
  direct: {
    instruction: 'Transform this text into a concise, clear, and direct message. Get straight to the point without unnecessary words or fluff.',
    emoji: '⚡'
  }
};

export async function transformText(request: TransformRequest): Promise<TransformResponse> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const { text, tone, targetLanguage } = request;
  const toneConfig = toneInstructions[tone];

  let systemPrompt = `You are a professional communication expert and text transformation AI. Your role is to transform text while preserving the original meaning and intent.

${toneConfig.instruction}

Important rules:
1. ALWAYS preserve the original meaning and intent of the text
2. Keep the transformed text natural and fluent
3. Maintain any specific details, names, or technical terms from the original
4. Do not add information that wasn't in the original
5. The output should feel like a native speaker wrote it in the requested tone
6. Return ONLY the transformed text, nothing else`;

  if (targetLanguage && targetLanguage !== 'auto') {
    systemPrompt += `
7. Translate the text to ${targetLanguage} while applying the requested tone
8. The final output should be in ${targetLanguage}`;
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to transform text');
  }

  const data = await response.json();
  const transformed = data.choices[0]?.message?.content?.trim() || '';

  return {
    original: text,
    transformed,
    tone: tone,
    toneDescription: `${toneConfig.emoji} ${tone.charAt(0).toUpperCase() + tone.slice(1)}`
  };
}

export const tones: { id: ToneType; name: string; emoji: string; description: string; nameAr: string; descriptionAr: string }[] = [
  {
    id: 'friendly',
    name: 'Friendly & Warm',
    emoji: '😊',
    description: 'Warm, approachable, and conversational',
    nameAr: 'ودود ودافئ',
    descriptionAr: 'دافئ، سهل التعامل، ومحادثي'
  },
  {
    id: 'professional',
    name: 'Professional',
    emoji: '💼',
    description: 'Formal and business-appropriate',
    nameAr: 'احترافي',
    descriptionAr: 'رسمي ومناسب للأعمال'
  },
  {
    id: 'enthusiastic',
    name: 'Enthusiastic',
    emoji: '🚀',
    description: 'Exciting, inspiring, and motivating',
    nameAr: 'متحمس',
    descriptionAr: 'مثير، ملهم، ومحفز'
  },
  {
    id: 'diplomatic',
    name: 'Diplomatic',
    emoji: '🤝',
    description: 'Tactful and carefully worded',
    nameAr: 'دبلوماسي',
    descriptionAr: 'حكيم وحريص في الاختيار'
  },
  {
    id: 'direct',
    name: 'Direct & Clear',
    emoji: '⚡',
    description: 'Concise and to-the-point',
    nameAr: 'مباشر وواضح',
    descriptionAr: 'موجز ومباشر للنقطة'
  }
];

export const languages = [
  { code: 'auto', name: 'Auto Detect', nameAr: 'تحديد تلقائي' },
  { code: 'en', name: 'English', nameAr: 'الإنجليزية' },
  { code: 'ar', name: 'Arabic', nameAr: 'العربية' },
  { code: 'es', name: 'Spanish', nameAr: 'الإسبانية' },
  { code: 'fr', name: 'French', nameAr: 'الفرنسية' },
  { code: 'de', name: 'German', nameAr: 'الألمانية' },
  { code: 'it', name: 'Italian', nameAr: 'الإيطالية' },
  { code: 'pt', name: 'Portuguese', nameAr: 'البرتغالية' },
  { code: 'zh', name: 'Chinese', nameAr: 'الصينية' },
  { code: 'ja', name: 'Japanese', nameAr: 'اليابانية' },
  { code: 'ko', name: 'Korean', nameAr: 'الكورية' },
  { code: 'ru', name: 'Russian', nameAr: 'الروسية' },
  { code: 'hi', name: 'Hindi', nameAr: 'الهندية' },
  { code: 'tr', name: 'Turkish', nameAr: 'التركية' },
  { code: 'nl', name: 'Dutch', nameAr: 'الهولندية' },
  { code: 'pl', name: 'Polish', nameAr: 'البولندية' },
  { code: 'sv', name: 'Swedish', nameAr: 'السويدية' },
  { code: 'da', name: 'Danish', nameAr: 'الدنماركية' },
  { code: 'no', name: 'Norwegian', nameAr: 'النرويجية' },
  { code: 'fi', name: 'Finnish', nameAr: 'الفنلندية' }
];
    
