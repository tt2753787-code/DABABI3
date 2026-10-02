import React from 'react';
import { ViewMode, Language } from '../types';
import { Logo } from './Logo';
import { SUPPORT_WHATSAPP_LINK } from '../data/initialProducts';
import { getTranslation } from '../utils/translations';
import { ShieldCheck, MessageCircle, Zap, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenPages?: () => void;
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPages, language = 'ar' }) => {
  const t = getTranslation(language);

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-slate-600 dark:text-slate-400 text-xs font-fluid transition-colors" dir={language === 'fr' ? 'ltr' : 'rtl'}>
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Logo size="md" />
            <span className="text-[11px] text-slate-400">
              {t.portalSubtitle}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onNavigate('browse-products')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {t.browseProducts}
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            {onOpenPages && (
              <>
                <button
                  onClick={onOpenPages}
                  className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{t.pages}</span>
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
              </>
            )}
            <button
              onClick={() => onNavigate('about-dababi3')}
              className="hover:text-indigo-700 transition-colors cursor-pointer"
            >
              {t.aboutUs}
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href={SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.supportWhatsApp}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <span dir="ltr">© {new Date().getFullYear()} DABABI3. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>{t.zeroCommission}</span>
            </span>
            <span className="flex items-center gap-1 text-teal-700 dark:text-teal-400 font-semibold">
              <MessageCircle className="w-3 h-3 text-teal-600" />
              <span>{t.directWhatsApp}</span>
            </span>
            <span className="flex items-center gap-1 text-indigo-700 dark:text-indigo-400 font-semibold">
              <ShieldCheck className="w-3 h-3 text-indigo-600" />
              <span>{t.deliveryPolicy}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
