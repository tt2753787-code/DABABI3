import React, { useState } from 'react';
import { ViewMode } from '../types';
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
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيفاش كيشري الزبون؟',
      a: 'كتختار السلعة، كتضغط على زر واتساب، كيطلع لك ميساج واجد فيه سمية السلعة والتمن، وكتفاهم نيشان مع المورد.',
    },
    {
      q: 'واش كاين شي اقتطاع ولا عمولة؟',
      a: 'لا، 0% عمولة. كلشي مجاني للمشتري وللمورد.',
    },
    {
      q: 'كيفاش كيتم الخلاص؟',
      a: 'كتفاهم مع المورد على التوصيل، والخلاص كاش عند الاستلام بعد معاينة السلعة.',
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-8 font-fluid">
      {/* Hero strictly DABABI3 */}
      <section className="text-center flex flex-col items-center gap-3 py-6">
        <Logo size="xl" />
        <p className="text-sm font-semibold text-slate-600 max-w-md leading-relaxed">
          سوق مباشر بين المورد والزبون عبر واتساب بضغطة زر واحدة بدون تعقيدات.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('browse-products')}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>تصفح السلع</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </button>
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="px-5 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all"
          >
            إضافة سلعة كمورد
          </button>
        </div>
      </section>

      {/* 3 Simple Direct Cards with Mixed Vibrant Colors */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900">0% عمولة</h3>
            <p className="text-xs text-slate-500">بدون أي مصاريف أو اقتطاعات بنكية.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900">واتساب مباشر</h3>
            <p className="text-xs text-slate-500">تحدث وتفاوض مباشرة مع التاجر.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900">الدفع عند الاستلام</h3>
            <p className="text-xs text-slate-500">عاين سلعتك قبل أداء الثمن.</p>
          </div>
        </div>
      </section>

      {/* Simplified FAQ */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 flex flex-col gap-3">
        <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
          أسئلة متكررة
        </h3>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-right p-3.5 font-bold text-xs text-slate-800 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 bg-slate-50/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* WhatsApp Contact */}
      <section className="p-5 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-right">
          <h4 className="font-bold text-sm">بغيتي مساعدة أو عندك استفسار؟</h4>
          <p className="text-xs text-slate-400">تواصل معنا مباشرة عبر واتساب.</p>
        </div>
        <a
          href="https://wa.me/212600000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20DABABI3"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>واتساب الدعم</span>
        </a>
      </section>
    </div>
  );
};
