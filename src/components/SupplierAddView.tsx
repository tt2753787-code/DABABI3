import React, { useState, useEffect } from 'react';
import { Product, CategoryId, ViewMode } from '../types';
import { PRESET_IMAGES } from '../data/initialProducts';
import { formatDisplayPhone } from '../utils/whatsapp';
import { saveSupplierApi } from '../utils/api';
import { Logo } from './Logo';
import { UserSession } from './AuthScreen';
import {
  Store,
  MessageCircle,
  Rocket,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Check,
  Eye,
  Link as LinkIcon,
  Sparkles,
  MapPin,
  ShieldCheck,
  Plus,
} from 'lucide-react';

interface SupplierAddViewProps {
  onAddProduct: (product: Product) => void;
  onNavigate: (view: ViewMode) => void;
  userSession: UserSession | null;
  onUpdateSession?: (session: UserSession) => void;
}

export const SupplierAddView: React.FC<SupplierAddViewProps> = ({
  onAddProduct,
  onNavigate,
  userSession,
  onUpdateSession,
}) => {
  // Helper to load persistent supplier data from userSession or localStorage
  const getSavedStore = () => {
    if (userSession?.storeName) return userSession.storeName;
    if (userSession?.name && userSession.role === 'supplier') return userSession.name;
    try {
      const saved = localStorage.getItem('dababi3_supplier_profile');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.storeName) return p.storeName;
        if (p.name) return p.name;
      }
    } catch {}
    return 'ورشة الأطلس للصناعات';
  };

  const getSavedCity = () => {
    if (userSession?.city) return userSession.city;
    try {
      const saved = localStorage.getItem('dababi3_supplier_profile');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.city) return p.city;
      }
    } catch {}
    return 'فاس';
  };

  const getSavedPhone = () => {
    if (userSession?.phone) return userSession.phone;
    try {
      const saved = localStorage.getItem('dababi3_supplier_profile');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.phone) return p.phone;
      }
    } catch {}
    return '0667889900';
  };

  // 1. Supplier personal info states - ALWAYS PRE-FILLED from account
  const [supplierName, setSupplierName] = useState(getSavedStore());
  const [supplierCity, setSupplierCity] = useState(getSavedCity());
  const [whatsappNumber, setWhatsappNumber] = useState(getSavedPhone());

  // Automatically update whenever userSession or storage updates
  useEffect(() => {
    const sName = getSavedStore();
    const sCity = getSavedCity();
    const sPhone = getSavedPhone();
    if (sName) setSupplierName(sName);
    if (sCity) setSupplierCity(sCity);
    if (sPhone) setWhatsappNumber(sPhone);
  }, [userSession]);

  // 2. Product specific inputs
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('crafts');
  const [categoryLabel, setCategoryLabel] = useState('صناعة تقليدية وجلد');
  const [productDesc, setProductDesc] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyOymILKVCZrCRteazYCpS7gU92di06hadzboigfHeNL_67WCNYmRhi8Xc9wXDGrkNuhfEm5bwp1PS13MPFfme0RMGkn8zco8lgViaP1wSqyNlL4-ZZw55fL8ll3DqylPUQsVOPyOIOM7anEV7s9lW5mo9ngFM3SHAmyGnNpltLRtg9_UN4XmmmVd1XvZSTn8R4uyzPB9FyFR_3fSwYhB6G9p2rDJivV_EtCPOBhriniCOKbYfKbt'
  );
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastAddedName, setLastAddedName] = useState('');

  const categoryOptions: { id: CategoryId; label: string; color: string }[] = [
    { id: 'crafts', label: 'صناعة تقليدية وجلد', color: 'from-orange-500 to-amber-600' },
    { id: 'food', label: 'زيوت وطبيعي', color: 'from-amber-500 to-yellow-600' },
    { id: 'decor', label: 'زرابي وديكور', color: 'from-teal-500 to-emerald-600' },
    { id: 'wholesale', label: 'سلع بالجملة', color: 'from-purple-500 to-indigo-600' },
    { id: 'electronics', label: 'أجهزة وإلكترونيات', color: 'from-blue-500 to-cyan-600' },
    { id: 'fashion', label: 'ملابس وأزياء', color: 'from-rose-500 to-pink-600' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(productPrice) || 0;
    const formattedPhone = formatDisplayPhone(whatsappNumber);

    // Save and sync supplier info permanently
    saveSupplierApi(supplierName.trim(), supplierCity.trim(), whatsappNumber.trim());
    if (userSession && onUpdateSession) {
      onUpdateSession({
        ...userSession,
        storeName: supplierName.trim(),
        name: supplierName.trim(),
        city: supplierCity.trim(),
        phone: whatsappNumber.trim(),
      });
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: productName.trim() || 'سلعة جديدة',
      category: selectedCategory,
      categoryLabel: categoryLabel,
      price: priceNum,
      originalPrice: Math.round(priceNum * 1.25),
      supplierName: supplierName.trim() || 'متجر المورد',
      supplierCity: supplierCity.trim() || 'المغرب',
      whatsappNumber: formattedPhone,
      description: productDesc.trim() || 'سلعة معروضة للطلب المباشر عبر واتساب.',
      imageUrl: imageUrl,
      verified: true,
      createdAt: new Date().toISOString(),
      stockStatus: 'available',
      unit: 'حسب الطلب',
    };

    onAddProduct(newProduct);
    setLastAddedName(newProduct.name);
    setShowSuccessToast(true);

    // Reset product specific fields only, KEEPING supplierName, supplierCity, whatsappNumber completely intact!
    setProductName('');
    setProductPrice('');
    setProductDesc('');

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 font-fluid" dir="rtl">
      {/* Header strictly DABABI3 with portal subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Logo size="lg" />
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-300 text-emerald-950">
              بوابة الموردين والمشترين
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              إضافة سلعة
            </span>
          </div>
          <p className="text-xs text-slate-500">
            معلومات متجرك وهاتفك مسجلة ومحفوظة مسبقاً في الخانات — فقط أدخل تفاصيل السلعة واضغط نشر!
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>تخزين سحابي مشترك 0% عمولة</span>
        </div>
      </div>

      {/* Main Grid: Clean Form + Sticky Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Side */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm"
          >
            {/* 1. قسم بيانات المتجر والهاتف (المعلومات مسجلة مسبقاً في الخانات) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-emerald-700" />
                  <span>معلومات المورد والمتجر (مسجلة تلقائياً من حسابك):</span>
                </span>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  ✓ مسجلة وجاهزة
                </span>
              </div>

              {/* الخانات مسجلة ومملوءة بالبيانات مسبقاً */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-700">
                    اسم المتجر / الورشة (مسجل تلقائياً)
                  </label>
                  <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="اسم المتجر"
                    className="h-11 px-3.5 rounded-xl bg-white border border-emerald-300 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 shadow-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-700">
                    المدينة (مسجلة تلقائياً)
                  </label>
                  <input
                    type="text"
                    required
                    value={supplierCity}
                    onChange={(e) => setSupplierCity(e.target.value)}
                    placeholder="المدينة"
                    className="h-11 px-3.5 rounded-xl bg-white border border-emerald-300 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 shadow-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-700">
                  رقم هاتف الواتساب للمورد (مسجل تلقائياً لتلقي الطلبات)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute right-3 text-xs text-slate-500 font-mono font-bold" dir="ltr">
                    🇲🇦 +212
                  </span>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="6 XX XX XX XX"
                    className="h-11 w-full pr-20 pl-3 rounded-xl bg-white border border-emerald-300 text-slate-900 text-xs font-mono font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. قسم بيانات السلعة المراد إضافتها */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                <h2 className="font-bold text-base text-slate-900">بيانات السلعة</h2>
              </div>
              <span className="text-[11px] text-slate-400">تظهر للجميع بنفس الرابط</span>
            </div>

            {/* اسم السلعة والثمن */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">اسم السلعة المعروضة *</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="مثال: حقيبة سفر جلدية أصيلة"
                  className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">ثمن البيع (درهم) *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="1"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="350"
                    className="h-11 w-full pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-display font-bold text-sm focus:bg-white focus:border-emerald-600 outline-none transition-all"
                  />
                  <span className="absolute left-3 top-3 text-[10px] font-bold text-slate-400">
                    د.م.
                  </span>
                </div>
              </div>
            </div>

            {/* الفئة / التصنيف */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">الفئة / التصنيف</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoryOptions.map((opt) => {
                  const isSelected = selectedCategory === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(opt.id);
                        setCategoryLabel(opt.label);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                        isSelected
                          ? `bg-gradient-to-r ${opt.color} text-white border-transparent shadow-sm scale-[1.02]`
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* وصف السلعة */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700">وصف مختصر للسلعة</label>
              <textarea
                rows={2}
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="أذكر الجودة، الأبعاد، الألوان، أو شروط التوصيل..."
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* صورة السلعة */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">صورة السلعة الحقيقية</label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{showUrlInput ? 'إلغاء الرابط' : 'إدخال رابط مباشر'}</span>
                </button>
              </div>

              {showUrlInput && (
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="h-10 px-3 rounded-xl border border-slate-200 text-xs font-mono text-left focus:border-emerald-600 outline-none"
                  dir="ltr"
                />
              )}

              <label className="bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 hover:border-emerald-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-700">اضغط لاختيار صورة السلعة أو اسحبها هنا</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              {/* Ready Preset Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border transition-all cursor-pointer ${
                      imageUrl === preset.url
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* زر النشر الفوري */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <Rocket className="w-4 h-4" />
              <span>نشر السلعة فوراً على DABABI3 لجميع الزوار</span>
            </button>
          </form>
        </div>

        {/* Live Preview Side (معاينة حية كما يراها الزبون) */}
        <div className="lg:col-span-5 flex flex-col gap-3 sticky top-24">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>معاينة حية للسلعة</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              مباشر للزبائن
            </span>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col">
            <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
              <img
                src={imageUrl}
                alt={productName || 'معاينة السلعة'}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{supplierCity}</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-lg text-[10px] font-medium">
                {categoryLabel}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    {supplierName}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-xl text-emerald-800">
                      {productPrice || '0'}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">د.م.</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-tight">
                  {productName || 'اسم السلعة المعروضة'}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {productDesc || 'وصف السلعة كما يظهر للمشترين عبر المنصة.'}
                </p>
              </div>

              {/* WhatsApp Button Preview */}
              <div className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-xs shadow-md">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>اطلب عبر واتساب المورد</span>
                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-black/20 font-mono" dir="ltr">
                  {whatsappNumber ? `+212 ${whatsappNumber}` : 'مباشرة'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Bar */}
      {showSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-lg w-[90%] sm:w-auto">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold">تم نشر "{lastAddedName || 'سلعتك'}" وحفظها في الموقع!</span>
            <span className="text-[10px] text-slate-400">ستظهر لأي زائر يدخل إلى رابط الموقع فوراً.</span>
          </div>
          <button
            onClick={() => onNavigate('browse-products')}
            className="px-3 py-1 bg-emerald-500 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-600 transition-colors mr-auto shrink-0 cursor-pointer"
          >
            مشاهدة في المتجر
          </button>
        </div>
      )}
    </div>
  );
};
