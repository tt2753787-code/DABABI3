import React, { useState } from 'react';
import { ViewMode, Language } from '../types';
import { SUPPORT_WHATSAPP_LINK } from '../data/initialProducts';
import { getTranslation } from '../utils/translations';
import { Logo } from './Logo';
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Store,
  ChevronDown,
  ArrowRight,
  Phone,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
  language?: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, language = 'ar' }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = getTranslation(language);

  const faqs = [
    {
      q: 'كيفاش كيشري الزبون؟',
      a: 'كتختار السلعة، كتضغط على زر واتساب، كيطلع لك ميساج واجد فيه سمية السلعة والتمن، وكتفاهم نيشان مع المورد.',
    },
    {
      q: 'واش كاين شي اقتطاع ولا عمولة؟',
      a: 'لا، 0% عمولة. كلشي مجاني للمشتري وللمورد دائماً.',
    },
    {
      q: 'كيفاش كيتم الخلاص؟',
      a: 'كتفاهم مع المورد على التوصيل، والخلاص كاش عند الاستلام بعد معاينة السلعة.',
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-8 font-fluid" dir={language === 'fr' ? 'ltr' : 'rtl'}>
      {/* Hero strictly DABABI3 */}
      <section className="text-center flex flex-col items-center gap-3 py-6">
        <Logo size="xl" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
          {t.heroTagline}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('browse-products')}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.browseProducts}</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </button>
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            {t.addProduct}
          </button>
        </div>
      </section>

      {/* 3 Simple Direct Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 border border-emerald-200 dark:border-slate-700 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.zeroCommission}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">بدون أي مصاريف أو اقتطاعات بنكية.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border border-amber-200 dark:border-slate-700 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.directWhatsApp}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">تحدث وتفاوض مباشرة مع التاجر.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border border-indigo-200 dark:border-slate-700 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">الدفع عند الاستلام</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">عاين سلعتك قبل أداء الثمن.</p>
          </div>
        </div>
      </section>

      {/* Simplified FAQ */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col gap-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          أسئلة متكررة
        </h3>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-right p-3.5 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* WhatsApp Contact without exposing phone digits */}
      <section className="p-5 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-right">
          <h4 className="font-bold text-sm">بغيتي مساعدة أو عندك استفسار؟</h4>
          <p className="text-xs text-slate-400">تواصل معنا مباشرة عبر واتساب الدعم الفني.</p>
        </div>
        <a
          href={SUPPORT_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>{t.supportWhatsApp}</span>
        </a>
      </section>
    </div>
  );
};
