import React from 'react';
import { ViewMode } from '../types';
import { Logo } from './Logo';
import { ShieldCheck, MessageCircle, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 text-slate-600 text-xs font-fluid">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Logo size="md" />
            <span className="text-[11px] text-slate-400">
              سوق المعاملات المباشرة عبر واتساب
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
            <button
              onClick={() => onNavigate('browse-products')}
              className="hover:text-emerald-700 transition-colors"
            >
              المنتجات
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onNavigate('supplier-add-product')}
              className="hover:text-amber-700 transition-colors"
            >
              إضافة منتج
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onNavigate('about-dababi3')}
              className="hover:text-indigo-700 transition-colors"
            >
              عن المنصة
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <span dir="ltr">© {new Date().getFullYear()} DABABI3. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>0% عمولة</span>
            </span>
            <span className="flex items-center gap-1 text-teal-700 font-semibold">
              <MessageCircle className="w-3 h-3 text-teal-600" />
              <span>واتساب مباشر</span>
            </span>
            <span className="flex items-center gap-1 text-indigo-700 font-semibold">
              <ShieldCheck className="w-3 h-3 text-indigo-600" />
              <span>أداء عند الاستلام</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

