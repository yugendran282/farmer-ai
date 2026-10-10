import React, { useState, useEffect } from 'react';
import { Bot, Send, User, HelpCircle, Loader2 } from 'lucide-react';
import { farmingAssistantService, QAResponse } from '../services/farmingAssistantService';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  source?: string;
  disclaimer?: string;
}

export const FarmingAssistantSection: React.FC = () => {
  const { language, t } = useLanguage();

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text:
          language === 'ta'
            ? 'வணக்கம்! நான் FARMERS AI விவசாய ஆலோசகர். பயிர் பராமரிப்பு, பூச்சி மேலாண்மை மற்றும் உரங்கள் பற்றிய கேள்விகளைக் கேட்கவும்.'
            : 'Welcome! I am FARMERS AI assistant. Ask me anything about crop protection, fertilizer dosage, irrigation schedules, or organic farming.',
        source: t('assistant_name', 'FARMERS AI Assistant', 'விவசாயி AI ஆலோசகர்'),
      },
    ]);
  }, [language]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim() || loading) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: inputQuestion.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQ = inputQuestion;
    setInputQuestion('');
    setLoading(true);

    try {
      const response: QAResponse = await farmingAssistantService.askQuestion(currentQ, language);
      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: response.answer,
        source: response.source,
        disclaimer: response.disclaimer,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Assistant error:', err);
    } finally {
      setLoading(false);
    }
  };

  const suggestQuestion = (qTextEn: string, qTextTa: string) => {
    setInputQuestion(language === 'ta' ? qTextTa : qTextEn);
  };

  return (
    <section id="farming-assistant" className="py-16 bg-[#F7F6EF] border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143D2B]/10 text-[#143D2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Bot className="w-4 h-4 text-[#1B5E20]" />
            <span>{t('ai_advisory_badge', 'AI Agricultural Advisory', 'வேளாண் செயற்கை நுண்ணறிவு ஆலோசனை')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17251D] tracking-tight">
            {t('assistant_title', 'FARMERS AI Advisory Assistant', 'விவசாயி AI ஆலோசனைக் குழு')}
          </h2>
          <p className="mt-3 text-base text-[#17251D]/70">
            {t(
              'assistant_subtitle',
              'Ask questions about pest control, fertilizer calculation, organic farming, or weather precautions.',
              'பூச்சி கட்டுப்பாடு, உர மேலாண்மை மற்றும் இயற்கை விவசாயம் பற்றிய கேள்விகளைக் கேட்கவும்.'
            )}
          </p>
        </div>

        {/* Suggested Quick Questions */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-[#143D2B] flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#F2C14E]" /> {t('quick_queries', 'Quick Queries:', 'மாதிரி கேள்விகள்:')}
          </span>
          <button
            onClick={() =>
              suggestQuestion(
                'How to control stem borer in paddy crop?',
                'நெல் பயிரில் தண்டு துளைப்பானை எவ்வாறு கட்டுப்படுத்துவது?'
              )
            }
            className="text-xs bg-white hover:bg-emerald-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 shadow-xs transition-colors cursor-pointer"
          >
            {t('q1_btn', 'Paddy Stem Borer Control', 'நெல் தண்டு துளைப்பான்')}
          </button>
          <button
            onClick={() =>
              suggestQuestion(
                'What is the recommended NPK fertilizer ratio for tomato?',
                'தக்காளிக்கு பரிந்துரைக்கப்படும் NPK உர அளவு என்ன?'
              )
            }
            className="text-xs bg-white hover:bg-emerald-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 shadow-xs transition-colors cursor-pointer"
          >
            {t('q2_btn', 'Tomato Fertilizer Schedule', 'தக்காளி உர அளவு')}
          </button>
          <button
            onClick={() =>
              suggestQuestion(
                'How to prepare organic Panchagavya fertilizer?',
                'பஞ்சகவ்யா இயற்கை உரம் தயாரிப்பது எப்படி?'
              )
            }
            className="text-xs bg-white hover:bg-emerald-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 shadow-xs transition-colors cursor-pointer"
          >
            {t('q3_btn', 'Panchagavya Preparation', 'பஞ்சகவ்யா தயாரிப்பு')}
          </button>
        </div>

        {/* Chat Console */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#143D2B]/15 shadow-sm overflow-hidden flex flex-col h-[520px]">
          {/* Header Bar */}
          <div className="bg-[#143D2B] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-[#F2C14E]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  {t('chat_header_title', 'FARMERS AI Advisor', 'விவசாயி AI ஆலோசகர்')}
                </h3>
                <span className="text-[11px] text-emerald-200">
                  {t('chat_status', 'Online • ICAR & Gemini AI Advisory', 'இணைப்பில் உள்ளது • ICAR & Gemini AI')}
                </span>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#143D2B] text-[#F2C14E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-[#143D2B] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line text-sm">{m.text}</p>
                  {m.source && (
                    <span className="block text-[10px] text-gray-400 mt-2 font-semibold border-t border-gray-100 pt-1.5">
                      {t('source_label', 'Source:', 'மூலம்:')} {m.source}
                    </span>
                  )}
                  {m.disclaimer && (
                    <span className="block text-[10px] text-amber-700 mt-1 italic">
                      {m.disclaimer}
                    </span>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-[#143D2B]" />
                <span>
                  {t('searching_kb', 'Searching agricultural knowledge base...', 'வேளாண் தரவுத்தளத்தில் தேடுகிறது...')}
                </span>
              </div>
            )}
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              placeholder={
                language === 'ta'
                  ? 'உங்கள் விவசாயக் கேள்வியைத் தட்டச்சு செய்க...'
                  : 'Ask your agricultural question...'
              }
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim() || loading}
              className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 text-sm cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{t('btn_send', 'Send', 'அனுப்பு')}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
