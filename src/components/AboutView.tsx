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

  const faqs = language === 'fr' ? [
    {
      q: 'Comment un client achète-t-il sur DABABI3 ?',
      a: 'Le client choisit le produit, clique sur le bouton WhatsApp et démarre une conversation directe avec le fournisseur pour convenir du prix et de la livraison.',
    },
    {
      q: 'Y a-t-il des frais ou commissions ?',
      a: 'Non, 0% de commission. La plateforme est 100% gratuite pour les acheteurs et les fournisseurs.',
    },
    {
      q: 'Comment s’effectue le paiement ?',
      a: 'Le paiement se fait en espèces à la livraison (Cash on Delivery), après réception et vérification de la marchandise.',
    },
  ] : language === 'darija' ? [
    {
      q: 'كيفاش كيشري الزبون؟',
      a: 'كتختار المنتج، كتضغط على زر واتساب، كيطلع لك ميساج واجد فيه سمية المنتج والتمن، وكتفاهم نيشان مع المورد.',
    },
    {
      q: 'واش كاين شي اقتطاع ولا عمولة؟',
      a: 'لا، 0% عمولة. كلشي مجاني للمشتري وللمورد دائماً.',
    },
    {
      q: 'كيفاش كيتم الخلاص؟',
      a: 'كتفاهم مع المورد على التوصيل، والخلاص كاش عند الاستلام بعد معاينة السلعة.',
    },
  ] : [
    {
      q: 'كيف يشتري الزبون من المنصة؟',
      a: 'يختار الزبون المنتج المطلوب، ثم يضغط على زر واتساب، فيفتح تطبيق واتساب برسالة جاهزة تتضمن تفاصيل المنتج للتواصل المباشر مع المورد.',
    },
    {
      q: 'هل توجد أي عمولات أو اقتطاعات؟',
      a: 'لا، 0% عمولة دائماً وبشكل مجاني تماماً للمورد والمشتري.',
    },
    {
      q: 'كيف يتم الدفع والتوصيل؟',
      a: 'يتم الاتفاق بين الطرفين عبر واتساب، والدفع نقداً عند الاستلام بعد فحص ومعاينة المنتج.',
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
            <ArrowRight className={`w-3.5 h-3.5 ${language === 'fr' ? '' : 'rotate-180'}`} />
          </button>
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
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
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'fr' ? 'Sans frais ni intermédiaires bancaires.' : 'بدون أي مصاريف أو اقتطاعات بنكية.'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border border-amber-200 dark:border-slate-700 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.directWhatsApp}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'fr' ? 'Échangez et négociez directement avec le vendeur.' : 'تحدث وتفاوض مباشرة مع التاجر.'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border border-indigo-200 dark:border-slate-700 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'fr' ? 'Paiement à la livraison' : 'الدفع عند الاستلام'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'fr' ? 'Vérifiez votre colis avant de payer.' : 'عاين سلعتك قبل أداء الثمن.'}
            </p>
          </div>
        </div>
      </section>

      {/* Simplified FAQ */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col gap-3">
        <h2 className="font-bold text-base text-slate-900 dark:text-white">
          {language === 'fr' ? 'Questions fréquemment posées' : 'أسئلة متكررة'}
        </h2>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-right p-4 flex items-center justify-between font-bold text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact Banner (Phone digits hidden) */}
      <section className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm block">
              {language === 'fr' ? 'Vous êtes commerçant ou artisan ?' : 'هل أنت تاجر أو صانع تقليدي؟'}
            </span>
            <span className="text-xs text-emerald-100">
              {language === 'fr'
                ? 'Rejoignez la communauté DABABI3 et commencez à vendre directement sur WhatsApp.'
                : 'انضم إلى مجتمع DABABI3 واعرض منتجاتك مباشرة بدون وسيط.'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="px-4 py-2.5 bg-white text-emerald-950 font-bold text-xs rounded-xl shadow-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {t.addProduct}
          </button>
          <a
            href={SUPPORT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.contactSupport}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
