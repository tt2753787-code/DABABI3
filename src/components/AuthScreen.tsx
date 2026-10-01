import React, { useState } from 'react';
import { Logo } from './Logo';
import { LogIn, Sparkles, User, Store, ShieldCheck, ArrowLeft, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export interface UserSession {
  name: string;
  phone: string;
  role: 'buyer' | 'supplier';
  city?: string;
}

interface AuthScreenProps {
  onLogin: (session: UserSession) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'supplier'>('buyer');
  const [city, setCity] = useState('الدار البيضاء');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: name.trim() || (role === 'supplier' ? 'تاجر DABABI3' : 'زبون DABABI3'),
      phone: phone.trim() || '0661234567',
      role,
      city,
    });
  };

  const handleQuickLogin = (selectedRole: 'buyer' | 'supplier') => {
    onLogin({
      name: selectedRole === 'supplier' ? 'ورشة الأطلس' : 'مشتري',
      phone: selectedRole === 'supplier' ? '0661849201' : '0678901234',
      role: selectedRole,
      city: selectedRole === 'supplier' ? 'فاس' : 'الدار البيضاء',
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#f9f9f7] relative overflow-hidden font-fluid" dir="rtl">
      {/* Mixed vibrant atmospheric color blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/25 to-teal-400/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-400/20 to-orange-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white shadow-2xl shadow-emerald-950/5 relative z-10 flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <Logo size="lg" />
          <p className="text-xs font-medium text-slate-500">
            {isRegister ? 'أنشئ حسابك للوصول الفوري' : 'سجل الدخول للمتابعة إلى الموقع'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
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
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              isRegister
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Quick Role Selection (Buyer vs Supplier) */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-slate-500">نوع الحساب:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                role === 'buyer'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>مشتري / زبون</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('supplier')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                role === 'supplier'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Store className="w-4 h-4 text-amber-600" />
              <span>مورد / تاجر</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Name Field (if registering) */}
          {isRegister && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-700">
                {role === 'supplier' ? 'اسم المتجر / الورشة' : 'الاسم الكامل'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'supplier' ? 'مثال: تعاونية الأطلس' : 'مثال: كريم العلمي'}
                className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
              />
            </div>
          )}

          {/* WhatsApp / Phone Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-700">
              رقم الهاتف (واتساب)
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
                className="h-11 w-full pr-20 pl-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:border-emerald-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-700">كلمة المرور</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full px-3.5 pr-3.5 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
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

          {/* City field (if registering) */}
          {isRegister && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-700">المدينة</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="الدار البيضاء">الدار البيضاء</option>
                <option value="الرباط">الرباط</option>
                <option value="مراكش">مراكش</option>
                <option value="فاس">فاس</option>
                <option value="طنجة">طنجة</option>
                <option value="أكادير">أكادير</option>
                <option value="وجدة">وجدة</option>
                <option value="مكناس">مكناس</option>
              </select>
            </div>
          )}

          {/* Primary Submit Button with mixed vibrant gradient */}
          <button
            type="submit"
            className="h-12 mt-1 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-lg shadow-emerald-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{isRegister ? 'إنشاء الحساب والدخول للموقع' : 'دخول إلى DABABI3'}</span>
          </button>
        </form>

        {/* Divider with Fast Entry Buttons for immediate frictionless access */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-center">
            <span className="text-[11px] text-slate-400 font-medium px-2 bg-white">
              أو دخول سريع بضغطة واحدة:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('buyer')}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-200 text-emerald-800 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>دخول كزبون</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('supplier')}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-200 text-amber-900 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>دخول كمورد</span>
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
