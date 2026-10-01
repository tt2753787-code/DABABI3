import React, { useState } from 'react';
import { Product, CategoryId, ViewMode } from '../types';
import { PRESET_IMAGES } from '../data/initialProducts';
import { formatDisplayPhone } from '../utils/whatsapp';
import { Logo } from './Logo';
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
} from 'lucide-react';

interface SupplierAddViewProps {
  onAddProduct: (product: Product) => void;
  onNavigate: (view: ViewMode) => void;
}

export const SupplierAddView: React.FC<SupplierAddViewProps> = ({
  onAddProduct,
  onNavigate,
}) => {
  const [supplierName, setSupplierName] = useState('ورشة الأطلس');
  const [supplierCity, setSupplierCity] = useState('فاس');
  const [whatsappNumber, setWhatsappNumber] = useState('667889900');
  const [productName, setProductName] = useState('حقيبة جلدية أصلية مخدومة يدوياً');
  const [productPrice, setProductPrice] = useState('450');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('crafts');
  const [categoryLabel, setCategoryLabel] = useState('صناعة تقليدية وجلد');
  const [productDesc, setProductDesc] = useState(
    'جلد طبيعي مدبوغ بالطريقة الفاسية، متانة ممتازة وجيوب مريحة للتنقل والسفر.'
  );
  const [imageUrl, setImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyOymILKVCZrCRteazYCpS7gU92di06hadzboigfHeNL_67WCNYmRhi8Xc9wXDGrkNuhfEm5bwp1PS13MPFfme0RMGkn8zco8lgViaP1wSqyNlL4-ZZw55fL8ll3DqylPUQsVOPyOIOM7anEV7s9lW5mo9ngFM3SHAmyGnNpltLRtg9_UN4XmmmVd1XvZSTn8R4uyzPB9FyFR_3fSwYhB6G9p2rDJivV_EtCPOBhriniCOKbYfKbt'
  );
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: productName.trim() || 'منتج جديد',
      category: selectedCategory,
      categoryLabel: categoryLabel,
      price: priceNum,
      originalPrice: Math.round(priceNum * 1.25),
      supplierName: supplierName.trim() || 'مورد مستقل',
      supplierCity: supplierCity.trim() || 'المغرب',
      whatsappNumber: formattedPhone,
      description: productDesc.trim(),
      imageUrl: imageUrl,
      verified: true,
      createdAt: new Date().toISOString(),
      stockStatus: 'available',
      unit: 'حسب الطلب',
    };

    onAddProduct(newProduct);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 font-fluid">
      {/* Header strictly DABABI3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Logo size="lg" />
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              بوابة الموردين
            </span>
          </div>
          <p className="text-xs text-slate-500">
            أدخل معلومات السلعة — الزبون يتواصل معك مباشرة على رقمك الواتساب.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>مباشر 0% عمولة</span>
        </div>
      </div>

      {/* Simplified Split Screen: Clean Form Boxes + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Side - خانة كدا خانة كدا */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="font-bold text-base text-slate-900">معلومات السلعة</h2>
              <span className="text-[11px] text-slate-400">حقول سهلة وسريعة</span>
            </div>

            {/* خانة المتجر والمدينة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">اسم المتجر أو المورد *</label>
                <input
                  type="text"
                  required
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder="مثال: ورشة الأطلس"
                  className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">المدينة *</label>
                <input
                  type="text"
                  required
                  value={supplierCity}
                  onChange={(e) => setSupplierCity(e.target.value)}
                  placeholder="مثال: فاس، الدار البيضاء"
                  className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* خانة رقم واتساب المورد */}
            <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-300">
              <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                <span>رقم واتساب المورد (لتلقي طلبات الزبائن) *</span>
              </label>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-11 px-3 bg-white border border-slate-200 rounded-xl flex items-center text-xs font-mono font-bold text-slate-700" dir="ltr">
                  🇲🇦 +212
                </span>
                <input
                  type="tel"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="6 XX XX XX XX"
                  className="h-11 flex-1 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-sm font-bold tracking-wider outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* خانة اسم السلعة والثمن */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">اسم السلعة *</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="مثال: حقيبة جلدية أصلية"
                  className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">الثمن (درهم) *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="1"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="450"
                    className="h-11 w-full pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-display font-bold text-sm focus:bg-white focus:border-emerald-600 outline-none"
                  />
                  <span className="absolute left-3 top-3 text-[10px] font-bold text-slate-400">
                    د.م.
                  </span>
                </div>
              </div>
            </div>

            {/* خانة الفئة / التصنيف */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">الفئة</label>
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

            {/* خانة وصف السلعة */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700">وصف السلعة</label>
              <textarea
                rows={2}
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="أذكر الجودة، الألوان، المقاس، أو طريقة التوصيل..."
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-emerald-600 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* خانة صورة السلعة */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">صورة السلعة</label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{showUrlInput ? 'إلغاء الرابط' : 'إدخال رابط صورة'}</span>
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
                <span className="text-xs font-bold text-slate-700">اختر صورة من جهازك</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              {/* Ready Preset Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border transition-all ${
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

            {/* نشر المنتج */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <Rocket className="w-4 h-4" />
              <span>نشر السلعة فوراً على DABABI3</span>
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
              مباشر
            </span>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col">
            <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
              <img
                src={imageUrl}
                alt={productName}
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
                  {productName}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {productDesc}
                </p>
              </div>

              {/* WhatsApp Button Preview */}
              <div className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-xs shadow-md">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>اطلب عبر واتساب</span>
                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-black/20 font-mono" dir="ltr">
                  {whatsappNumber ? `+212 ${whatsappNumber}` : 'مباشرة'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">تم نشر السلعة بنجاح!</span>
          <button
            onClick={() => onNavigate('browse-products')}
            className="px-3 py-1 bg-emerald-500 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-600 transition-colors mr-2"
          >
            عرض بالمعرض
          </button>
        </div>
      )}
    </div>
  );
};
