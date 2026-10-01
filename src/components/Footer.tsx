import React from 'react';
import { ViewMode } from '../types';
import { ShieldCheck, MessageCircle, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#f4f4f1] border-t border-[#e2e3e0] py-10 text-[#404943] text-sm">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#e2e3e0]/60">
          <div className="flex flex-col gap-1.5 text-right">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl text-[#00422b] tracking-wider">
                DABABI3
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00a86b]" />
              <span className="font-bold text-[#00422b] font-arabic text-lg">
                دبابيع
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#98f2c0]/40 text-[#005234] font-semibold mr-2">
                🇲🇦 المغرب
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#404943]">
              سوق المعاملات المباشرة والتجارة الحرة عبر واتساب — بدون وسيط تجاري وبدون عمولات.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => onNavigate('browse-products')}
              className="hover:text-[#00422b] transition-colors"
            >
              المنتجات والمعروضات
            </button>
            <span className="text-[#bfc9c1]">•</span>
            <button
              onClick={() => onNavigate('supplier-add-product')}
              className="hover:text-[#00422b] transition-colors"
            >
              إضافة منتج كمورد
            </button>
            <span className="text-[#bfc9c1]">•</span>
            <button
              onClick={() => onNavigate('about-dababi3')}
              className="hover:text-[#00422b] transition-colors"
            >
              عن المنصة وميثاق الأمان
            </button>
          </div>
        </div>

        {/* Feature Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/60">
            <MessageCircle className="w-4 h-4 text-[#00a86b] shrink-0" />
            <div>
              <span className="font-bold text-[#1a1c1b] block">محادثة واتساب فورية</span>
              <span className="text-[#707972]">طلب السلعة والتفاهم على التوصيل مباشرة</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/60">
            <Zap className="w-4 h-4 text-[#00a86b] shrink-0" />
            <div>
              <span className="font-bold text-[#1a1c1b] block">0% عمولة للمشتري والمورد</span>
              <span className="text-[#707972]">لا توجد أي رسوم أو اقتطاعات بنكية خفية</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/60">
            <ShieldCheck className="w-4 h-4 text-[#00a86b] shrink-0" />
            <div>
              <span className="font-bold text-[#1a1c1b] block">أمان الدفع عند الاستلام</span>
              <span className="text-[#707972]">تحقق من سلعتك قبل أداء الثمن للموزع</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707972] pt-2">
          <span dir="ltr">© {new Date().getFullYear()} DABABI3. All rights reserved.</span>
          <span>منصة مغربية حرة لدعم المنتوج المحلي والصناع والتجار المباشرين</span>
        </div>
      </div>
    </footer>
  );
};
