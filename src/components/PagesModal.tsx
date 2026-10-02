import React, { useState } from 'react';
import { SUPPORT_WHATSAPP_LINK } from '../data/initialProducts';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import {
  X,
  FileText,
  ShieldCheck,
  Truck,
  HelpCircle,
  MessageCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface PagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  isDarkMode?: boolean;
}

export const PagesModal: React.FC<PagesModalProps> = ({
  isOpen,
  onClose,
  language = 'ar',
  isDarkMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'delivery' | 'charter' | 'faq'>('privacy');
  const t = getTranslation(language);

  if (!isOpen) return null;

  const pagesList = [
    {
      id: 'privacy',
      title: t.privacyPolicy,
      icon: <Lock className="w-4 h-4 text-emerald-600" />,
    },
    {
      id: 'terms',
      title: t.termsAndConditions,
      icon: <FileText className="w-4 h-4 text-indigo-600" />,
    },
    {
      id: 'delivery',
      title: t.deliveryPolicy,
      icon: <Truck className="w-4 h-4 text-amber-600" />,
    },
    {
      id: 'charter',
      title: t.supplierCharter,
      icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
    },
    {
      id: 'faq',
      title: language === 'fr' ? 'FAQ & Support' : 'الأسئلة الشائعة والدعم الفني',
      icon: <HelpCircle className="w-4 h-4 text-rose-600" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid"
      dir={language === 'fr' ? 'ltr' : 'rtl'}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col border transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base">{t.pages} - DABABI3</h2>
              <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {language === 'fr' ? 'Informations, conditions et politiques' : 'الوثائق والسياسات القانونية للمنصة'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Layout: Sidebar Tabs + Content View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sidebar */}
          <div
            className={`w-full md:w-64 border-b md:border-b-0 md:border-l p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0 ${
              isDarkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/60'
            }`}
          >
            {pagesList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-right p-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap md:whitespace-normal cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'hover:bg-slate-800 text-slate-300'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className={activeTab === item.id ? 'text-white' : ''}>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* Page Details Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 leading-relaxed text-xs sm:text-sm">
            {activeTab === 'privacy' && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <h3 className="text-base font-bold text-emerald-600">
                  {language === 'fr' ? 'Politique de confidentialité et protection des données' : 'سياسة الخصوصية وحماية البيانات'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {language === 'fr'
                    ? 'Chez DABABI3, nous accordons la plus grande importance à la confidentialité et à la sécurité de nos utilisateurs, fournisseurs et clients.'
                    : 'نحن في DABABI3 نولي أقصى درجات الاهتمام لخصوصية وأمان مستخدمينا سواء كانوا موردين أو زبائن.'}
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col gap-2">
                  <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-300">
                    {language === 'fr' ? 'Engagements de confidentialité :' : 'بنود حماية الخصوصية:'}
                  </h4>
                  <ul className="list-disc pr-4 space-y-1 text-slate-600 dark:text-slate-300 text-xs">
                    {language === 'fr' ? (
                      <>
                        <li>Nous ne vendons ni ne partageons vos numéros WhatsApp avec des tiers.</li>
                        <li>Les informations enregistrées servent uniquement à faciliter la prise de contact directe sur WhatsApp.</li>
                        <li>Les conversations commerciales se font de gré à gré de façon chiffrée sur WhatsApp.</li>
                      </>
                    ) : (
                      <>
                        <li>لا نقوم بمشاركة أو بيع أرقام هواتف الموردين أو الزبائن لأي طرف ثالث.</li>
                        <li>المعلومات المسجلة تُستخدم حصراً لتمكين المشتري من التواصل مع المورد مباشرة عبر تطبيق واتساب.</li>
                        <li>المحادثات وتفاصيل الصفقات تتم مباشرة على تطبيق واتساب مشفرة بين الطرفين.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <h3 className="text-base font-bold text-indigo-600">
                  {language === 'fr' ? 'Conditions Générales d’Utilisation' : 'الشروط والأحكام العامة'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {language === 'fr'
                    ? 'La plateforme DABABI3 est un espace direct et libre reliant fournisseurs indépendants et clients, sans intermédiaire et sans commission.'
                    : 'منصة DABABI3 هي سوق تقني حر يربط بين المورد المستقل والزبون بدون وساطة تجارية وبدون أي اقتطاعات بنكية.'}
                </p>
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col gap-2">
                  <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300">
                    {language === 'fr' ? 'Règles fondamentales :' : 'القواعد الأساسية:'}
                  </h4>
                  <ul className="list-disc pr-4 space-y-1 text-slate-600 dark:text-slate-300 text-xs">
                    {language === 'fr' ? (
                      <>
                        <li>Commission de 0% pour toutes les parties, de manière permanente.</li>
                        <li>Le fournisseur est garant de la conformité des articles présentés.</li>
                        <li>Toute marchandise illicite ou contrefaite est strictement interdite.</li>
                      </>
                    ) : (
                      <>
                        <li>عمولة المعاملات هي 0% لجميع الأطراف دائماً.</li>
                        <li>يتحمل المورد كامل المسؤولية القانونية عن مطابقة السلع المعروضة للمواصفات الحقيقية.</li>
                        <li>يُمنع منعاً باتاً عرض أي مواد مخالفة للقوانين المغربية أو منتهكة لحقوق الملكية.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <h3 className="text-base font-bold text-amber-600">
                  {t.deliveryPolicy}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {language === 'fr'
                    ? 'Pour garantir sérénité et confiance, les transactions reposent sur le paiement à la livraison (Cash on Delivery).'
                    : 'لتوفير أعلى درجات الطمأنينة والأمان للمشتري، تعتمد منصة DABABI3 مبدأ الدفع عند الاستلام (Cash on Delivery).'}
                </p>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col gap-2">
                  <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300">
                    {language === 'fr' ? 'Modalités :' : 'كيف يتم الاستلام والأداء؟'}
                  </h4>
                  <ul className="list-disc pr-4 space-y-1 text-slate-600 dark:text-slate-300 text-xs">
                    {language === 'fr' ? (
                      <>
                        <li>Le client et le fournisseur conviennent du transporteur et des délais sur WhatsApp.</li>
                        <li>Le client a le droit de vérifier son colis lors de la livraison.</li>
                        <li>Paiement en espèces lors de la réception conforme.</li>
                      </>
                    ) : (
                      <>
                        <li>يتفق المورد والزبون عبر واتساب على شركة الإرسال وسعر التوصيل ومدة الوصول.</li>
                        <li>يحق للزبون فحص ومعاينة السلعة عند وصول الموزع قبل أداء المبلغ المتفق عليه.</li>
                        <li>في حال عدم مطابقة السلعة، يتم التفاهم فوراً عبر محادثة الواتساب مع المورد.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'charter' && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <h3 className="text-base font-bold text-teal-600">
                  {t.supplierCharter}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {language === 'fr'
                    ? 'La communauté DABABI3 est fondée sur la confiance mutuelle, le professionnalisme et le soutien aux artisans et commerçants marocains.'
                    : 'يقوم مجتمع DABABI3 على الثقة المتبادلة والصدق والشفافية لدعم المنتوج المحلي والصناع والتجار المغاربة.'}
                </p>
                <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex flex-col gap-2">
                  <ul className="list-disc pr-4 space-y-1 text-slate-600 dark:text-slate-300 text-xs">
                    {language === 'fr' ? (
                      <>
                        <li>Respect des engagements et réactivité sur WhatsApp.</li>
                        <li>Transparence totale sur les prix sans frais cachés.</li>
                        <li>Qualité et authenticité des produits présentés.</li>
                      </>
                    ) : (
                      <>
                        <li>احترام المواعيد وسرعة التجاوب على رسائل الزبائن في واتساب.</li>
                        <li>الوضوح التام في تحديد أسعار المنتجات دون أي رسوم خفية.</li>
                        <li>الحفاظ على المعاملة الراقية والاحترافية بين البائع والمشتري.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <h3 className="text-base font-bold text-rose-600">
                  {language === 'fr' ? 'Foire Aux Questions & Support Client' : 'الأسئلة الشائعة والدعم الفني'}
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-xs block mb-1">
                      {language === 'fr' ? 'Comment passer commande ?' : 'كيف أطلب منتجاً؟'}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">
                      {language === 'fr'
                        ? 'Cliquez simplement sur « Commander via WhatsApp » sous n’importe quel article pour démarrer un échange direct avec le fournisseur.'
                        : 'اضغط على زر "طلب عبر واتساب المورد" أسفل أي سلعة، وستفتح محادثة واتساب جاهزة مباشرة مع صاحب السلعة.'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-xs block mb-1">
                      {language === 'fr' ? 'Y a-t-il des commissions sur les ventes ?' : 'هل الموقع يقتطع أي نسبة من أرباحي؟'}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">
                      {language === 'fr'
                        ? 'Non, les transactions sont 100% sans commission (0%).'
                        : 'لا، المعاملات مجانية 100% وبدون أي عمولة أو اقتطاع.'}
                    </span>
                  </div>
                </div>

                {/* Support WhatsApp Action (Phone digits strictly hidden as required!) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-3 mt-2 shadow-md">
                  <div>
                    <span className="font-bold text-xs block">
                      {language === 'fr' ? 'Besoin d’aide ou d’une assistance ?' : 'هل تحتاج إلى مساعدة أو لديك استفسار؟'}
                    </span>
                    <span className="text-[11px] text-emerald-100">
                      {language === 'fr' ? 'L’équipe de support DABABI3 est à votre écoute.' : 'فريق الدعم الفني لـ DABABI3 في خدمتكم مباشرة.'}
                    </span>
                  </div>
                  <a
                    href={SUPPORT_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-emerald-900 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                    <span>{t.contactSupport}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
