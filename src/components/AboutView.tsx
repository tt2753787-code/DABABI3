import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Logo } from './Logo';
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Store,
  Users,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Phone,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف تعمل منصة DABABI3 بالضبط؟',
      a: 'DABABI3 هي دليل وسوق مباشر يربط بين المورد المغربي والمشتري. عند اختيار أي سلعة، تضغط على زر "طلب عبر واتساب المورد"، فتنتقل فوراً إلى محادثة واتساب خاصة مع صاحب السلعة مع رسالة جاهزة باسم وثمن المنتج. تتفقان مباشرة على مكان التسليم وطريقة الأداء.',
    },
    {
      q: 'هل DABABI3 تقتطع أي عمولة من المبيعات؟',
      a: 'لا، بتاتاً! عمولة المنصة هي 0%. DABABI3 لا تتدخل في المدفوعات ولا تطلب أي نسب مئوية من التجار أو المشترين، مما يسمح بالحصول على أفضل الأسعار مباشرة من المصدر.',
    },
    {
      q: 'كيف تتم عملية الأداء والتسليم؟',
      a: 'يتم الاتفاق بحرية تامة بينك وبين المورد عبر واتساب. الغالبية العظمى من المعاملات في المغرب تعتمد على خيار "الدفع عند الاستلام" (Cash on Delivery)، حيث تعاين سلعتك وتتأكد من جودتها قبل دفع المبلغ لعامل التوصيل.',
    },
    {
      q: 'هل يمكن لأي صانع تقليدي أو تاجر جملة إضافة منتجاته؟',
      a: 'نعم! يمكن لأي مورد في المغرب إضافة منتجاته خلال أقل من دقيقة عبر الضغط على "إضافة منتج كمورد"، وتحديد المدينة ورقم واتساب المباشر والصورة، ليظهر منتجه فوراً لآلاف المشترين.',
    },
    {
      q: 'كيف تضمنون موثوقية الموردين؟',
      a: 'تخضع أرقام الموردين للتحقق المسبق للتأكد من وجود حساب واتساب نشط ومطابق للمدينة المذكورة، مع إمكانية إبلاغ المشترين عن أي مخالفة يتم معالجتها فوراً لحماية الجميع.',
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-12">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#98f2c0]/30 text-[#005234] font-bold text-xs">
          <Sparkles className="w-4 h-4 text-[#00a86b]" />
          <span>ثورة التجارة المباشرة في المغرب</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Logo size="lg" showSubtitle />
        </div>

        <h1 className="font-black text-2xl sm:text-3xl md:text-4xl text-[#00422b] max-w-2xl leading-tight">
          سوق مباشر يربط بين المورد والزبون عبر واتساب بضغطة زر واحدة بدون تعقيدات
        </h1>

        <p className="text-base text-[#404943] max-w-2xl leading-relaxed">
          أنشئت منصة DABABI3 (دبابيع) لكسر الحواجز بين الحرفيين والتجار المغاربة وبين الزبائن، مستفيدة من التطبيق الأكثر استخداماً في المغرب: تطبيق واتساب.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('browse-products')}
            className="px-6 py-3 bg-[#00422b] text-white rounded-xl font-bold text-sm hover:bg-[#006c46] shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span>استكشف المنتجات الآن</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="px-6 py-3 bg-white text-[#00422b] border border-[#00422b]/30 rounded-xl font-bold text-sm hover:bg-[#f4f4f1] transition-all"
          >
            سجل كتاجر أو مورد مجاناً
          </button>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#98f2c0]/40 text-[#005234] flex items-center justify-center">
            <Zap className="w-6 h-6 fill-current text-[#00a86b]" />
          </div>
          <h3 className="font-bold text-lg text-[#1a1c1b]">0% عمولة واقتطاعات</h3>
          <p className="text-xs text-[#404943] leading-relaxed">
            لا نأخذ أي نسبة من أرباح التاجر ولا نفرض رسوماً على الزبون. التجارة الحرة بنسبة 100%.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00422b]/10 text-[#00422b] flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-bold text-lg text-[#1a1c1b]">محادثة واتساب فورية</h3>
          <p className="text-xs text-[#404943] leading-relaxed">
            تحدث مباشرة مع البائع: اسأل عن المقاس، فاوض في السعر، أو اطلب تفاصيل إضافية بكل أريحية.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#98f2c0]/40 text-[#005234] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#00a86b]" />
          </div>
          <h3 className="font-bold text-lg text-[#1a1c1b]">أمان الدفع عند الاستلام</h3>
          <p className="text-xs text-[#404943] leading-relaxed">
            لا حاجة لإدخال بطاقتك البنكية في المنصة. ادفع كاش نقداً حين تصلك السلعة إلى باب بيتك.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00422b]/10 text-[#00422b] flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#1a1c1b]">دعم المنتوج المغربي</h3>
          <p className="text-xs text-[#404943] leading-relaxed">
            ندعم ورشات فاس ومراكش، مزارع سوس وتادلة، وتعاونيات الأطلس والصحراء لبيع سلعهم مباشرة.
          </p>
        </div>
      </section>

      {/* How it works for both parties */}
      <section className="bg-white rounded-3xl border border-[#e2e3e0] p-6 md:p-10 flex flex-col gap-8 shadow-sm">
        <div className="text-center flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-[#1a1c1b]">كيف تسير المعاملة على DABABI3؟</h2>
          <p className="text-sm text-[#707972]">بساطة فائقة في 3 خطوات واضحة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Customers */}
          <div className="p-6 rounded-2xl bg-[#f9f9f7] border border-[#eeeeec] flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#00422b] font-bold text-base">
              <Users className="w-5 h-5 text-[#00a86b]" />
              <span>للمشتري والزبون:</span>
            </div>
            <ul className="flex flex-col gap-3 text-xs md:text-sm text-[#404943]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00422b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <span>تصفح المنتجات واختر السلعة المناسبة لك وللمدينة القريبة منك.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00422b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <span>اضغط على زر "طلب عبر واتساب المورد" لتفتح لك محادثة جاهزة مع التاجر.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00422b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <span>أرسل عنوانك واستلم طلبيتك وأدِّ الثمن نقداً عند الاستلام.</span>
              </li>
            </ul>
          </div>

          {/* For Suppliers */}
          <div className="p-6 rounded-2xl bg-[#00422b]/5 border border-[#00422b]/15 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#00422b] font-bold text-base">
              <Store className="w-5 h-5 text-[#00a86b]" />
              <span>للتاجر والمورد:</span>
            </div>
            <ul className="flex flex-col gap-3 text-xs md:text-sm text-[#404943]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00422b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <span>انقر على "إضافة منتج كمورد" واملأ اسم المنتج وثمنه ورقم هاتفك الواتساب.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00422b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <span>اختر صورة واضحة للسلعة وانقر على "نشر المنتج فوراً".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00422b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <span>توصل بطلبات الزبائن فوراً على هاتفك دون أي عمولة أو وساطة.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white rounded-3xl border border-[#e2e3e0] p-6 md:p-8 flex flex-col gap-6 shadow-sm">
        <div className="flex items-center gap-2 text-[#00422b] pb-2 border-b border-[#eeeeec]">
          <HelpCircle className="w-5 h-5" />
          <h2 className="font-bold text-xl text-[#1a1c1b]">الأسئلة الشائعة حول DABABI3</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#e2e3e0] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-right p-4 font-bold text-sm sm:text-base text-[#1a1c1b] flex items-center justify-between gap-4 hover:bg-[#f9f9f7] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#707972] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#00422b]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#404943] leading-relaxed bg-[#f9f9f7]/50 border-t border-[#eeeeec]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="p-8 rounded-3xl bg-[#00422b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex flex-col gap-1.5 text-center sm:text-right">
          <h3 className="font-bold text-xl">هل أنت تعاونية أو تاجر جملة وترغب في شراكة؟</h3>
          <p className="text-xs sm:text-sm text-[#8bd1ac]">
            فريق DABABI3 رهن إشارتك لمساعدتك في رفع كتالوج كامل من السلع والتأكد من اعتماد حسابك.
          </p>
        </div>
        <a
          href="https://wa.me/212600000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20DABABI3"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-6 py-3 bg-[#00a86b] hover:bg-[#008f5a] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>تواصل مع إدارة DABABI3</span>
        </a>
      </section>
    </div>
  );
};
