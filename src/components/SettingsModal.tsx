import React, { useState } from 'react';
import { UserSession } from './AuthScreen';
import { saveSupplierApi } from '../utils/api';
import {
  X,
  Settings,
  Store,
  User,
  Phone,
  MapPin,
  Moon,
  Sun,
  Globe,
  MessageSquare,
  ShieldCheck,
  Check,
  LogOut,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession | null;
  onUpdateSession: (updated: UserSession) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: (dark: boolean) => void;
  language: string;
  onSelectLanguage: (lang: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userSession,
  onUpdateSession,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
  language,
  onSelectLanguage,
}) => {
  const [storeName, setStoreName] = useState(userSession?.storeName || userSession?.name || '');
  const [phone, setPhone] = useState(userSession?.phone || '');
  const [city, setCity] = useState(userSession?.city || 'فاس');
  const [role, setRole] = useState<'buyer' | 'supplier'>(userSession?.role || 'supplier');
  const [whatsappTemplate, setWhatsappTemplate] = useState('مرحباً، أرغب في طلب هذه السلعة عبر منصة DABABI3');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state if userSession updates
  React.useEffect(() => {
    if (userSession) {
      setStoreName(userSession.storeName || userSession.name || '');
      setPhone(userSession.phone || '');
      setCity(userSession.city || 'فاس');
      setRole(userSession.role || 'supplier');
    }
  }, [userSession]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSession) return;

    const updated: UserSession = {
      ...userSession,
      storeName: storeName.trim(),
      name: storeName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      role,
    };

    onUpdateSession(updated);
    saveSupplierApi(storeName.trim(), city.trim(), phone.trim());

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid" dir="rtl">
      <div className="fixed inset-0" onClick={onClose} />

      <div className={`relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col border transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50/80'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-sm">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base">إعدادات الحساب والموقع</h2>
              <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                تخصيص الحساب، المظهر، واللغة في DABABI3
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex flex-col gap-6">
          {/* 1. Account / Store Info Form */}
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs flex items-center gap-1.5 text-emerald-600">
                <Store className="w-4 h-4" />
                <span>معلومات الحساب والمتجر (تُحفظ تلقائياً)</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                تطبق على كل سلعة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  اسم المتجر / البائع
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="مثال: ورشة الأطلس"
                  className={`h-11 px-3.5 rounded-xl border text-xs outline-none focus:border-emerald-600 transition-all ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  المدينة
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="مثال: فاس، الدار البيضاء"
                  className={`h-11 px-3.5 rounded-xl border text-xs outline-none focus:border-emerald-600 transition-all ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                رقم هاتف الواتساب لتلقي طلبات الزبائن
              </label>
              <div className="relative flex items-center">
                <span className="absolute right-3 text-xs text-slate-400 font-mono" dir="ltr">
                  🇲🇦 +212
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="6 XX XX XX XX"
                  className={`h-11 w-full pr-20 pl-3 rounded-xl border text-xs font-mono font-bold outline-none focus:border-emerald-600 transition-all ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer mt-1"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم حفظ وتحديث بيانات المتجر بنجاح!</span>
                </>
              ) : (
                <span>حفظ بيانات المتجر في النظام</span>
              )}
            </button>
          </form>

          {/* 2. Dark / Light Theme Toggle */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <Sun className="w-4 h-4" />
              <span>المظهر (الوضع المضيء / الوضع المظلم)</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onToggleDarkMode(false)}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>الوضع المضيء (نهاري)</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleDarkMode(true)}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-indigo-950 border-indigo-500 text-indigo-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>الوضع المظلم (ليلي)</span>
              </button>
            </div>
          </div>

          {/* 3. Language Selection */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
              <Globe className="w-4 h-4" />
              <span>لغة الموقع (Language)</span>
            </span>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ar', label: 'العربية', flag: '🇲🇦' },
                { id: 'darija', label: 'الدارجة', flag: '🇲🇦' },
                { id: 'fr', label: 'Français', flag: '🇫🇷' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onSelectLanguage(lang.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    language === lang.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950 dark:border-emerald-600 dark:text-emerald-200 shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. WhatsApp Order Template */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs flex items-center gap-1.5 text-emerald-600">
              <MessageSquare className="w-4 h-4" />
              <span>صيغة رسالة الواتساب الجاهزة</span>
            </span>
            <input
              type="text"
              value={whatsappTemplate}
              onChange={(e) => setWhatsappTemplate(e.target.value)}
              className={`h-10 px-3.5 rounded-xl border text-xs outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
            <span className="text-[10px] text-slate-400">
              يتم إرسال هذا النص تلقائياً عند ضغط الزبون على زر واتساب أسفل منتجك.
            </span>
          </div>

          {/* 5. Account Logout & Danger zone */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج من الحساب</span>
            </button>

            <span className="text-[10px] text-slate-400">
              DABABI3 v2.4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
