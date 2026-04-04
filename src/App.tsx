import { useState, useRef } from 'react';
import { transformText, tones, languages, ToneType } from './lib/api';
import { Send, Copy, Check, RefreshCw, Sparkles, Languages, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

// Wave animation component
const WaveAnimation = () => (
  <div className="flex items-center justify-center gap-1 h-4">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full animate-pulse"
        style={{
          height: `${Math.random() * 16 + 8}px`,
          animationDelay: `${i * 0.1}s`,
          animationDuration: '0.6s'
        }}
      />
    ))}
  </div>
);

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [showTones, setShowTones] = useState(false);
  const [history, setHistory] = useState<{ original: string; transformed: string; tone: string }[]>([]);
  const [isArabic, setIsArabic] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTransform = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError('');
    setOutputText('');

    // Track translate_click event in Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'translate_click', {
        event_category: 'engagement',
        event_label: selectedTone,
        value: inputText.length
      });
    }

    try {
      const result = await transformText({
        text: inputText,
        tone: selectedTone,
        targetLanguage: selectedLanguage === 'auto' ? undefined : selectedLanguage
      });

      setOutputText(result.transformed);
      setHistory(prev => [{
        original: result.original,
        transformed: result.transformed,
        tone: result.toneDescription
      }, ...prev.slice(0, 4)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleTransform();
    }
  };

  const selectedToneData = tones.find(t => t.id === selectedTone);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mytone Translate</h1>
                <p className="text-sm text-white/60">{isArabic ? 'مترجم النبرة' : 'Tone Translator'}</p>
              </div>
            </div>

            <button
              onClick={() => setIsArabic(!isArabic)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{isArabic ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {isArabic ? (
              <>اكتب بثقة. عبّر عن <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">نفسك</span> بوضوح.</>
            ) : (
              <>Write with confidence. Express your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">true self</span> clearly.</>
            )}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {isArabic
              ? 'حوّل أفكارك إلى رسائل احترافية دون فقدان صوتك ونبرتك الأصلية'
              : 'Transform your thoughts into professional messages without losing your authentic voice and tone'}
          </p>
        </div>

                {/* Main Editor Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-8">
          {/* Tone Selector */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-white/80">
                {isArabic ? 'اختر النبرة:' : 'Select Tone:'}
              </label>
              <button
                onClick={() => setShowTones(!showTones)}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {showTones ? (isArabic ? 'إخفاء' : 'Hide') : (isArabic ? 'عرض الكل' : 'Show All')}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    selectedTone === tone.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 scale-105'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tone.emoji}</span>
                  <span className="font-medium">{isArabic ? tone.nameAr : tone.name}</span>
                </button>
              ))}
            </div>

            {showTones && (
              <div className="mt-4 p-4 bg-white/5 rounded-xl">
                <p className="text-white/60 text-sm mb-2">{selectedToneData?.descriptionAr || selectedToneData?.description}</p>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="text-sm font-medium text-white/80">
                {isArabic ? 'اللغة المطلوبة:' : 'Target Language:'}
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-800">
                    {isArabic ? lang.nameAr : lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Input */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white/80">
                  {isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                </label>
                <span className={`text-xs ${inputText.length > 500 ? 'text-amber-400' : 'text-white/40'}`}>
                  {inputText.length}/500
                </span>
              </div>
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder={isArabic
                  ? 'مثال: أريد أن أتحدث معك عن المشروع...'
                  : 'Example: I want to talk about the project with you...'}
                className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                dir="auto"
              />
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={handleClear}
                  className="text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {isArabic ? 'مسح' : 'Clear'}
                </button>
                <div className="text-xs text-white/40">
                  {isArabic ? 'اضغط Ctrl+Enter للتحويل' : 'Press Ctrl+Enter to transform'}
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="p-4 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white/80">
                  {isArabic ? 'النتيجة:' : 'Result:'}
                </label>
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        {isArabic ? 'تم النسخ!' : 'Copied!'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {isArabic ? 'نسخ' : 'Copy'}
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 overflow-y-auto">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <WaveAnimation />
                  </div>
                ) : error ? (
                  <p className="text-red-400 text-sm">{error}</p>
                ) : outputText ? (
                  <p className="text-white/90 leading-relaxed whitespace-pre-wrap" dir="auto">
                    {outputText}
                  </p>
                ) : (
                  <p className="text-white/30 text-center py-12">
                    {isArabic ? 'النتيجة ستظهر هنا...' : 'Result will appear here...'}
                  </p>
                )}
              </div>
            </div>
          </div>

                    {/* Transform Button */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <button
              onClick={handleTransform}
              disabled={!inputText.trim() || isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                inputText.trim() && !isLoading
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {isArabic ? 'جارٍ التحويل...' : 'Transforming...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {isArabic ? 'حوّل الآن' : 'Transform Now'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {isArabic ? 'التحويلات الأخيرة' : 'Recent Transformations'}
            </h3>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                      {item.tone}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/40 mb-1">{isArabic ? 'الأصلي:' : 'Original:'}</p>
                      <p className="text-white/70 line-clamp-2" dir="auto">{item.original}</p>
                    </div>
                    <div>
                      <p className="text-white/40 mb-1">{isArabic ? 'المحوّل:' : 'Transformed:'}</p>
                      <p className="text-white/90 line-clamp-2" dir="auto">{item.transformed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: '🎯',
              title: isArabic ? 'نبرة دقيقة' : 'Precise Tone',
              desc: isArabic ? 'اختر من بين 5 نبرات مختلفة تناسب كل موقف' : 'Choose from 5 different tones for any situation'
            },
            {
              icon: '🌍',
              title: isArabic ? '20+ لغة' : '20+ Languages',
              desc: isArabic ? 'حوّل نصك لأي لغة مع الحفاظ على النبرة' : 'Transform to any language while keeping the tone'
            },
            {
              icon: '⚡',
              title: isArabic ? 'فوري ومجاني' : 'Instant & Free',
              desc: isArabic ? 'احصل على النتيجة في ثوانٍ بدون أي تكلفة' : 'Get results in seconds without any cost'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <span className="text-4xl mb-3 block">{feature.icon}</span>
              <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-white/40 text-sm">
          <p>
            {isArabic
              ? 'صُنع بـ ❤️ باستخدام Groq AI • '
              : 'Made with ❤️ using Groq AI • '}
            <span className="text-indigo-400">Mytone Translate</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
    
