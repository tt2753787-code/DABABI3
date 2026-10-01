import React, { useState } from 'react';
import { Product, CategoryId, ViewMode } from '../types';
import { PRESET_IMAGES } from '../data/initialProducts';
import { cleanMoroccanPhone, formatDisplayPhone } from '../utils/whatsapp';
import {
  Store,
  MessageCircle,
  Rocket,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Check,
  Eye,
  Info,
  Flashlight,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';

interface SupplierAddViewProps {
  onAddProduct: (product: Product) => void;
  onNavigate: (view: ViewMode) => void;
}

export const SupplierAddView: React.FC<SupplierAddViewProps> = ({
  onAddProduct,
  onNavigate,
}) => {
  // Form State initialized with realistic placeholder values from the mockup
  const [supplierName, setSupplierName] = useState('ورشة الأطلس للصناعات');
  const [supplierCity, setSupplierCity] = useState('فاس');
  const [whatsappNumber, setWhatsappNumber] = useState('667889900');
  const [productName, setProductName] = useState('حقيبة جلدية أصلية مخدومة يدوياً');
  const [productPrice, setProductPrice] = useState('450');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('crafts');
  const [categoryLabel, setCategoryLabel] = useState('صناعة تقليدية وجلد');
  const [productDesc, setProductDesc] = useState(
    'جلد طبيعي مدبوغ بالطريقة الفاسية التقليدية، متانة استثنائية وجيوب مريحة للتنقل اليومي والسفر مع أقفال نحاسية متينة.'
  );
  const [imageUrl, setImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyOymILKVCZrCRteazYCpS7gU92di06hadzboigfHeNL_67WCNYmRhi8Xc9wXDGrkNuhfEm5bwp1PS13MPFfme0RMGkn8zco8lgViaP1wSqyNlL4-ZZw55fL8ll3DqylPUQsVOPyOIOM7anEV7s9lW5mo9ngFM3SHAmyGnNpltLRtg9_UN4XmmmVd1XvZSTn8R4uyzPB9FyFR_3fSwYhB6G9p2rDJivV_EtCPOBhriniCOKbYfKbt'
  );
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  const categoryOptions: { id: CategoryId; label: string }[] = [
    { id: 'crafts', label: 'صناعة تقليدية وجلد' },
    { id: 'food', label: 'زيوت وطبيعي' },
    { id: 'decor', label: 'زرابي ونسيج' },
    { id: 'wholesale', label: 'سلع بالجملة' },
    { id: 'electronics', label: 'أجهزة وإلكترونيات' },
    { id: 'fashion', label: 'ملابس وأزياء' },
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
      description: productDesc.trim() || 'منتج عالي الجودة معروض للتواصل والطلب المباشر.',
      imageUrl: imageUrl,
      verified: true,
      createdAt: new Date().toISOString(),
      stockStatus: 'available',
      unit: 'حسب الاتفاق',
    };

    onAddProduct(newProduct);
    setLastCreatedId(newProduct.id);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Background ambient lighting matching mockup */}
      <div className="absolute -top-32 -left-28 w-96 h-96 rounded-full bg-[#98f2c0]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-36 w-80 h-80 rounded-full bg-[#8fd5b0]/20 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 w-full relative z-10 flex flex-col gap-10">
        {/* Header matching Mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-lg bg-[#98f2c0]/40 text-[#005234] font-bold text-xs">
              <Store className="w-3.5 h-3.5" />
              <span>بوابة الموردين والتجار المباشرين</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#00422b] tracking-tight">
              DABABI3 للموردين
            </h1>
            <p className="text-base md:text-lg text-[#404943] font-normal leading-relaxed">
              اعرض سلعك بكل بساطة — الزبون سيتواصل معك مباشرة على رقم هاتفك الواتساب بدون وساطة أو اقتطاع.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f4f4f1] px-4 py-2 rounded-xl border border-[#e2e3e0] shadow-sm self-start md:self-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00a86b] animate-ping" />
            <span className="text-xs font-bold text-[#005234]">
              الربط المباشر مع الزبون 0% عمولة
            </span>
          </div>
        </div>

        {/* Main Grid: Form (7 cols) + Sticky Live Preview (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-3xl border border-[#e2e3e0] shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#eeeeec]">
                <h2 className="text-xl font-bold text-[#1a1c1b]">بيانات العرض التجاري</h2>
                <span className="text-xs text-[#707972]">الحقول المؤشرة مطلوبة</span>
              </div>

              {/* Row 1: Store name & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1a1c1b] flex items-center gap-1">
                    <span>اسم المتجر أو المورد</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="مثال: ورشة الأطلس للصناعات"
                    className="h-11 px-4 rounded-xl bg-[#f4f4f1] text-[#1a1c1b] placeholder:text-[#707972] text-sm focus:bg-white focus:ring-2 focus:ring-[#00422b]/20 focus:border-[#00422b] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1a1c1b] flex items-center gap-1">
                    <span>المدينة / الإقليم</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={supplierCity}
                    onChange={(e) => setSupplierCity(e.target.value)}
                    placeholder="مثال: فاس، مراكش، الدار البيضاء"
                    className="h-11 px-4 rounded-xl bg-[#f4f4f1] text-[#1a1c1b] placeholder:text-[#707972] text-sm focus:bg-white focus:ring-2 focus:ring-[#00422b]/20 focus:border-[#00422b] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Crucial WhatsApp Phone Field Box */}
              <div className="p-4 md:p-5 rounded-2xl bg-[#00422b]/5 border-2 border-[#00422b]/20 flex flex-col gap-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-[#00422b]">
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span className="font-bold text-sm md:text-base">
                    الحقل الجوهري: رقم هاتف الواتساب للمورد
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#404943] leading-relaxed">
                  هذا هو الرقم الذي سيتوصل مباشرة برسائل وطلبات الشراء من الزبائن فور ضغطهم على زر واتساب أسفل منتجك دون وسطاء.
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="h-12 px-3.5 bg-[#eeeeec] rounded-xl flex items-center justify-center text-xs font-bold text-[#1a1c1b] font-mono shrink-0"
                    dir="ltr"
                  >
                    🇲🇦 +212
                  </div>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="6 XX XX XX XX"
                    className="h-12 flex-1 px-4 rounded-xl bg-white text-[#1a1c1b] placeholder:text-[#707972] font-mono text-base md:text-lg font-bold tracking-wider outline-none border border-[#00422b]/30 focus:ring-2 focus:ring-[#00422b]/20 transition-all"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#006c46] pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00a86b]" />
                  <span>الرقم مشفر ومحمي ومخصص فقط لتحويل المشتري إلى محادثتك الفورية</span>
                </div>
              </div>

              {/* Row 2: Product Name & Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1a1c1b] flex items-center gap-1">
                    <span>اسم المنتج</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="مثال: حقيبة جلدية أصلية مخدومة يدوياً"
                    className="h-11 px-4 rounded-xl bg-[#f4f4f1] text-[#1a1c1b] placeholder:text-[#707972] text-sm focus:bg-white focus:ring-2 focus:ring-[#00422b]/20 focus:border-[#00422b] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1a1c1b] flex items-center gap-1">
                    <span>ثمن البيع بالدرهم</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="450"
                      className="h-11 w-full pl-12 pr-4 rounded-xl bg-[#f4f4f1] text-[#1a1c1b] placeholder:text-[#707972] font-display font-bold text-base focus:bg-white focus:ring-2 focus:ring-[#00422b]/20 focus:border-[#00422b] outline-none transition-all"
                    />
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-[#707972]">
                      د.م.
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Chips */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#1a1c1b]">الفئة / التصنيف</label>
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
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#00422b] text-white shadow-sm'
                            : 'bg-[#eeeeec] text-[#404943] hover:text-[#1a1c1b] hover:bg-[#e2e3e0]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1a1c1b]">وصف مختصر للسلعة</label>
                <textarea
                  rows={3}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  placeholder="أذكر الجودة، الأبعاد، الألوان المتوفرة، أو شروط التوصيل..."
                  className="p-3.5 rounded-xl bg-[#f4f4f1] text-[#1a1c1b] placeholder:text-[#707972] text-sm focus:bg-white focus:ring-2 focus:ring-[#00422b]/20 focus:border-[#00422b] outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Real Image Selection */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1a1c1b]">صورة المنتج الحقيقية</label>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-xs text-[#006c46] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{showUrlInput ? 'إخفاء رابط الصورة' : 'إدخال رابط مباشر (URL)'}</span>
                  </button>
                </div>

                {showUrlInput && (
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="h-10 px-3 rounded-lg border border-[#e2e3e0] text-xs font-mono text-left focus:border-[#00422b] outline-none"
                    dir="ltr"
                  />
                )}

                {/* Dropzone Upload */}
                <label className="relative bg-[#f4f4f1] hover:bg-[#eeeeec] border-2 border-dashed border-[#bfc9c1] hover:border-[#00422b] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#eeeeec] group-hover:bg-[#98f2c0]/40 flex items-center justify-center mb-2 text-[#00422b] transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-[#1a1c1b]">
                    اضغط لاختيار صورة السلعة من جهازك أو اسحبها هنا
                  </span>
                  <span className="text-xs text-[#707972] mt-1">
                    ندعم JPG و PNG بدقة واضحة تبرز أصالة المعروض
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Quick Preset Images Picker */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-[#707972]">أو اختر من صور الكتالوج الجاهزة:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                          imageUrl === preset.url
                            ? 'bg-[#00422b] text-white border-[#00422b]'
                            : 'bg-white text-[#404943] border-[#e2e3e0] hover:bg-[#eeeeec]'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-[#00422b] hover:bg-[#006c46] text-white font-bold text-base md:text-lg flex items-center justify-center gap-2.5 shadow-lg shadow-[#00422b]/20 active:scale-[0.99] transition-all cursor-pointer mt-2"
              >
                <Rocket className="w-5 h-5" />
                <span>نشر المنتج فوراً على DABABI3</span>
              </button>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[#404943] text-xs pt-1 border-t border-[#eeeeec]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00a86b]" />
                  <span>ظهور فوري في المعرض</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00a86b]" />
                  <span>لا وساطة مالية 0%</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00a86b]" />
                  <span>محادثة مباشرة مع المشتري عبر واتساب</span>
                </span>
              </div>
            </form>
          </div>

          {/* Live Preview Side (Sticky on Desktop) matching Screen 2 */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-[#1a1c1b] font-bold text-base">
                <Eye className="w-5 h-5 text-[#00422b]" />
                <span>معاينة حية كما يراها الزبون</span>
              </div>
              <span className="text-xs font-bold text-[#006c46] bg-[#98f2c0]/40 px-2.5 py-1 rounded-md">
                مباشر ومفعل
              </span>
            </div>

            {/* Live Preview Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#e2e3e0] flex flex-col">
              <div className="relative w-full aspect-square bg-[#f4f4f1] overflow-hidden">
                <img
                  src={imageUrl}
                  alt={productName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm flex items-center gap-1 text-xs font-bold text-[#00422b]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00a86b]" />
                  <span>{supplierCity || 'المدينة'}</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium">
                  {categoryLabel}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#707972]">
                      {supplierName || 'اسم المتجر / المورد'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-2xl text-[#00422b]">
                        {productPrice || '0'}
                      </span>
                      <span className="text-xs font-bold text-[#00422b]">د.م.</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-[#1a1c1b] leading-tight">
                    {productName || 'اسم المنتج'}
                  </h3>

                  <p className="text-xs text-[#404943] line-clamp-3 leading-relaxed">
                    {productDesc || 'وصف السلعة كما يظهر للمشترين عبر المنصة.'}
                  </p>
                </div>

                {/* WhatsApp Button Preview */}
                <div className="pt-2">
                  <div className="w-full h-12 bg-[#00422b] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>اطلب عبر واتساب</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded bg-[#0f5b3e] text-[#8bd1ac] font-mono"
                      dir="ltr"
                    >
                      {whatsappNumber ? `+212 ${whatsappNumber}` : 'مباشرة'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#f4f4f1] p-3 rounded-xl flex items-center justify-between text-[#404943] text-xs">
                  <span className="flex items-center gap-1 text-[#006c46] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#00a86b]" />
                    <span>محادثة فورية وسريعة</span>
                  </span>
                  <span className="font-bold">لا توجد رسوم خفية</span>
                </div>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="p-4 rounded-2xl bg-[#eeeeec]/80 border border-[#e2e3e0] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#00422b] shrink-0 mt-0.5" />
              <p className="text-xs text-[#404943] leading-relaxed">
                بمجرد نقر المشتري على زر الطلب، يُفتح تطبيق واتساب برسالة جاهزة تتضمن اسم المنتج والثمن ورابطه في منصة{' '}
                <strong className="text-[#1a1c1b]">DABABI3</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast matching mockup */}
      {showSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#00422b] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
          <div className="w-9 h-9 rounded-full bg-[#00a86b] flex items-center justify-center text-white shrink-0">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm md:text-base">تم نشر المنتج بنجاح!</span>
            <span className="text-xs text-[#8bd1ac]">
              أصبح معروضاً للزبائن مع زر التواصل المباشر لواتساب الخاص بك.
            </span>
          </div>
          <button
            onClick={() => onNavigate('browse-products')}
            className="px-3.5 py-1.5 bg-white text-[#00422b] text-xs font-bold rounded-lg hover:bg-[#8bd1ac] transition-colors mr-2 whitespace-nowrap"
          >
            عرض في المعرض
          </button>
        </div>
      )}
    </div>
  );
};
