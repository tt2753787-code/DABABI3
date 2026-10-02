import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { LogIn, Sparkles, User, Store, ShieldCheck, ArrowLeft, Phone, Lock, Eye, EyeOff, MapPin } from 'lucide-react';

export interface UserSession {
  name: string;
  storeName?: string;
  phone: string;
  role: 'buyer' | 'supplier';
  city: string;
}

interface AuthScreenProps {
  onLogin: (session: UserSession) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<'buyer' | 'supplier'>('supplier');
  const [showPassword, setShowPassword] = useState(false);

  // Initialize with persisted supplier profile if exists
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('فاس');
  const [password, setPassword] = useState('');

  // Load saved profile on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('dababi3_supplier_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.storeName) setStoreName(parsed.storeName);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.city) setCity(parsed.city);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalStoreName = storeName.trim() || name.trim() || 'متجر المورد';
    const finalPhone = phone.trim() || '0661849201';
    const finalCity = city || 'فاس';

    const session: UserSession = {
      name: role === 'supplier' ? finalStoreName : (name.trim() || 'مشتري'),
      storeName: finalStoreName,
      phone: finalPhone,
      role,
      city: finalCity,
    };

    // Persist supplier credentials for future logins
    if (role === 'supplier') {
      try {
        localStorage.setItem(
          'dababi3_supplier_profile',
          JSON.stringify({
            storeName: finalStoreName,
            name: name.trim() || finalStoreName,
            phone: finalPhone,
            city: finalCity,
          })
        );
      } catch {
        // ignore
      }
    }

    onLogin(session);
  };

  const handleQuickLogin = (selectedRole: 'buyer' | 'supplier') => {
    // Check if supplier profile already saved
    let profileStore = 'ورشة الأطلس للصناعات';
    let profilePhone = '0667889900';
    let profileCity = 'فاس';

    try {
      const saved = localStorage.getItem('dababi3_supplier_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.storeName) profileStore = parsed.storeName;
        if (parsed.phone) profilePhone = parsed.phone;
        if (parsed.city) profileCity = parsed.city;
      }
    } catch {
      // ignore
    }

    const session: UserSession = {
      name: selectedRole === 'supplier' ? profileStore : 'مشتري معتمد',
      storeName: profileStore,
      phone: selectedRole === 'supplier' ? profilePhone : '0678901234',
      role: selectedRole,
      city: selectedRole === 'supplier' ? profileCity : 'الدار البيضاء',
    };

    onLogin(session);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#f9f9f7] relative overflow-hidden font-fluid" dir="rtl">
      {/* Mixed vibrant atmospheric color blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/25 to-teal-400/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-400/20 to-orange-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white shadow-2xl shadow-emerald-950/5 relative z-10 flex flex-col gap-6">
        {/* Brand Header with "بوابة الموردين والمشترين" */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Logo size="lg" />
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-300 text-emerald-900">
              بوابة الموردين والمشترين
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            {isRegister ? 'أنشئ حسابك وسيحفظ النظام بيانات متجرك تلقائياً' : 'سجل الدخول للمتابعة إلى المنصة'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              !isRegister
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              isRegister
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Role Toggle */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-slate-500">نوع الحساب:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('supplier')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                role === 'supplier'
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-500 text-amber-950 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Store className="w-4 h-4 text-amber-600" />
              <span>مورد / تاجر</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                role === 'buyer'
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 text-emerald-950 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>مشتري / زبون</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Supplier Store Name (persistent) */}
          {role === 'supplier' && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>اسم المتجر / الورشة (يُحفظ تلقائياً)</span>
                <span className="text-[10px] text-emerald-700 font-semibold">دائم</span>
              </label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="مثال: ورشة الأطلس للصناعات"
                className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
              />
            </div>
          )}

          {/* Personal name if buyer or registering */}
          {(role === 'buyer' || isRegister) && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-700">
                {role === 'supplier' ? 'اسم صاحب المتجر' : 'الاسم الكامل'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'supplier' ? 'مثال: يوسف التازي' : 'مثال: كريم العلمي'}
                className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
              />
            </div>
          )}

          {/* WhatsApp Phone Field (persistent) */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
              <span>رقم هاتف الواتساب (يُحفظ تلقائياً)</span>
              <span className="text-[10px] text-emerald-700 font-semibold">دائم</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute right-3 text-xs text-slate-500 font-mono" dir="ltr">
                🇲🇦 +212
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="6 XX XX XX XX"
                className="h-11 w-full pr-20 pl-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* City Field (persistent) */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
              <span>المدينة / الإقليم (تُحفظ تلقائياً)</span>
              <span className="text-[10px] text-emerald-700 font-semibold">دائم</span>
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:bg-white focus:border-emerald-600 outline-none"
            >
              <option value="فاس">فاس</option>
              <option value="الدار البيضاء">الدار البيضاء</option>
              <option value="الرباط">الرباط</option>
              <option value="مراكش">مراكش</option>
              <option value="طنجة">طنجة</option>
              <option value="أكادير">أكادير</option>
              <option value="قلعة السراغنة">قلعة السراغنة</option>
              <option value="مكناس">مكناس</option>
              <option value="وجدة">وجدة</option>
              <option value="تطوان">تطوان</option>
              <option value="خنيفرة">خنيفرة</option>
              <option value="آسفي">آسفي</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-700">كلمة المرور</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full px-3.5 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="h-12 mt-1 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{isRegister ? 'تسجيل الحساب والدخول' : 'دخول إلى DABABI3'}</span>
          </button>
        </form>

        {/* Quick test login */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <span className="text-[10px] text-center text-slate-400 font-medium">
            أو دخول فوري بضغطة واحدة:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('supplier')}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-200 text-amber-950 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>دخول كمورد</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('buyer')}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-200 text-emerald-950 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>دخول كزبون</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>تواصل مباشر عبر واتساب 0% عمولة</span>
        </div>
      </div>
    </div>
  );
};
