import React, { useState, useEffect } from 'react';
import { Product, CategoryId, ViewMode, Language } from '../types';
import { MOROCCAN_CITIES } from '../data/initialProducts';
import { formatDisplayPhone } from '../utils/whatsapp';
import { saveSupplierApi } from '../utils/api';
import { Logo } from './Logo';
import { UserSession } from './AuthScreen';
import { getTranslation, getCategoryLabel, getCityLabel } from '../utils/translations';
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
  Trash2,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface SupplierAddViewProps {
  onAddProduct: (product: Product) => void;
  onNavigate: (view: ViewMode) => void;
  userSession: UserSession | null;
  onUpdateSession?: (session: UserSession) => void;
  language?: Language;
}

export const SupplierAddView: React.FC<SupplierAddViewProps> = ({
  onAddProduct,
  onNavigate,
  userSession,
  onUpdateSession,
  language = 'ar',
}) => {
  const t = getTranslation(language);

  // Helper to load persistent supplier data from userSession or localStorage
  const getInitialStore = () => {
    if (userSession?.storeName) return userSession.storeName;
    if (userSession?.name && userSession.role === 'supplier') return userSession.name;
    try {
      const savedStore = localStorage.getItem('dababi3_saved_store');
      if (savedStore) return savedStore;
      const savedProfile = localStorage.getItem('dababi3_supplier_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.storeName) return p.storeName;
        if (p.name) return p.name;
      }
    } catch {}
    return '';
  };

  const getInitialCity = () => {
    if (userSession?.city) return userSession.city;
    try {
      const savedCity = localStorage.getItem('dababi3_saved_city');
      if (savedCity) return savedCity;
      const savedProfile = localStorage.getItem('dababi3_supplier_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.city) return p.city;
      }
    } catch {}
    return 'الدار البيضاء';
  };

  const getInitialPhone = () => {
    if (userSession?.phone) return userSession.phone;
    try {
      const savedPhone = localStorage.getItem('dababi3_saved_phone');
      if (savedPhone) return savedPhone;
      const savedProfile = localStorage.getItem('dababi3_supplier_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.phone) return p.phone;
      }
    } catch {}
    return '';
  };

  // 1. Supplier personal info states - ALWAYS REMEMBERED
  const [supplierName, setSupplierName] = useState(getInitialStore);
  const [supplierCity, setSupplierCity] = useState(getInitialCity);
  const [whatsappNumber, setWhatsappNumber] = useState(getInitialPhone);

  // Sync state if userSession changes
  useEffect(() => {
    const sName = getInitialStore();
    const sCity = getInitialCity();
    const sPhone = getInitialPhone();
    if (sName && !supplierName) setSupplierName(sName);
    if (sCity && !supplierCity) setSupplierCity(sCity);
    if (sPhone && !whatsappNumber) setWhatsappNumber(sPhone);
  }, [userSession]);

  // Persist supplier fields immediately as user types
  const handleStoreNameChange = (val: string) => {
    setSupplierName(val);
    try {
      localStorage.setItem('dababi3_saved_store', val);
      const prev = localStorage.getItem('dababi3_supplier_profile');
      const parsed = prev ? JSON.parse(prev) : {};
      localStorage.setItem('dababi3_supplier_profile', JSON.stringify({ ...parsed, storeName: val, name: val }));
    } catch {}
    if (userSession && onUpdateSession) {
      onUpdateSession({ ...userSession, storeName: val, name: val });
    }
  };

  const handleCityChange = (val: string) => {
    setSupplierCity(val);
    try {
      localStorage.setItem('dababi3_saved_city', val);
      const prev = localStorage.getItem('dababi3_supplier_profile');
      const parsed = prev ? JSON.parse(prev) : {};
      localStorage.setItem('dababi3_supplier_profile', JSON.stringify({ ...parsed, city: val }));
    } catch {}
    if (userSession && onUpdateSession) {
      onUpdateSession({ ...userSession, city: val });
    }
  };

  const handlePhoneChange = (val: string) => {
    setWhatsappNumber(val);
    try {
      localStorage.setItem('dababi3_saved_phone', val);
      const prev = localStorage.getItem('dababi3_supplier_profile');
      const parsed = prev ? JSON.parse(prev) : {};
      localStorage.setItem('dababi3_supplier_profile', JSON.stringify({ ...parsed, phone: val }));
    } catch {}
    if (userSession && onUpdateSession) {
      onUpdateSession({ ...userSession, phone: val });
    }
  };

  // 2. Product specific inputs
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('crafts');
  const [categoryLabel, setCategoryLabel] = useState('صناعة تقليدية وجلد');
  const [productDesc, setProductDesc] = useState('');
  
  // Multiple images state
  const [images, setImages] = useState<string[]>([]);
  const [previewActiveImgIdx, setPreviewActiveImgIdx] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastAddedName, setLastAddedName] = useState('');

  const categoryOptions: { id: CategoryId; label: string; color: string }[] = [
    { id: 'crafts', label: 'صناعة تقليدية وجلد', color: 'from-orange-500 to-amber-600' },
    { id: 'food', label: 'زيوت ومواد غذائية', color: 'from-amber-500 to-yellow-600' },
    { id: 'decor', label: 'زرابي وديكور', color: 'from-teal-500 to-emerald-600' },
    { id: 'wholesale', label: 'سلع بالجملة', color: 'from-purple-500 to-indigo-600' },
    { id: 'electronics', label: 'أجهزة وإلكترونيات', color: 'from-blue-500 to-cyan-600' },
    { id: 'fashion', label: 'ملابس وأزياء', color: 'from-rose-500 to-pink-600' },
  ];

  // Upload multiple images from local storage/camera
  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const dataUrl = event.target.result as string;
            setImages((prev) => [...prev, dataUrl]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Add image by direct URL
  const handleAddDirectUrl = () => {
    if (inputUrl.trim()) {
      setImages((prev) => [...prev, inputUrl.trim()]);
      setInputUrl('');
      setShowUrlInput(false);
    }
  };

  // Remove single image
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => {
      const filtered = prev.filter((_, i) => i !== indexToRemove);
      if (previewActiveImgIdx >= filtered.length) {
        setPreviewActiveImgIdx(Math.max(0, filtered.length - 1));
      }
      return filtered;
    });
  };

  // Make an image primary (swap to index 0)
  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
    setPreviewActiveImgIdx(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(productPrice) || 0;
    const formattedPhone = formatDisplayPhone(whatsappNumber.trim());

    // Permanently remember supplier info
    saveSupplierApi(supplierName.trim(), supplierCity.trim(), whatsappNumber.trim());
    try {
      localStorage.setItem('dababi3_saved_store', supplierName.trim());
      localStorage.setItem('dababi3_saved_city', supplierCity.trim());
      localStorage.setItem('dababi3_saved_phone', whatsappNumber.trim());
      localStorage.setItem(
        'dababi3_supplier_profile',
        JSON.stringify({
          storeName: supplierName.trim(),
          name: supplierName.trim(),
          city: supplierCity.trim(),
          phone: whatsappNumber.trim(),
        })
      );
    } catch {}

    if (userSession && onUpdateSession) {
      onUpdateSession({
        ...userSession,
        storeName: supplierName.trim(),
        name: supplierName.trim(),
        city: supplierCity.trim(),
        phone: whatsappNumber.trim(),
      });
    }

    // Default placeholder image if none uploaded
    const defaultPlaceholder = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
    const allImages = images.length > 0 ? images : [defaultPlaceholder];
    const mainImg = allImages[0];

    const newProduct: Product = {
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: productName.trim() || 'سلعة معروضة',
      category: selectedCategory,
      categoryLabel: categoryLabel,
      price: priceNum,
      originalPrice: Math.round(priceNum * 1.25),
      supplierName: supplierName.trim() || 'متجر المورد',
      supplierCity: supplierCity.trim() || 'المغرب',
      whatsappNumber: formattedPhone,
      description: productDesc.trim() || 'سلعة معروضة للطلب المباشر عبر واتساب بدون وساطة وبدون عمولة.',
      imageUrl: mainImg,
      images: allImages,
      verified: true,
      createdAt: new Date().toISOString(),
      stockStatus: 'available',
      unit: 'حسب الطلب',
    };

    onAddProduct(newProduct);
    setLastAddedName(newProduct.name);
    setShowSuccessToast(true);

    // Reset product fields ONLY — Keep personal supplier data completely remembered!
    setProductName('');
    setProductPrice('');
    setProductDesc('');
    setImages([]);
    setPreviewActiveImgIdx(0);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  // Preview photos list
  const currentPreviewImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'];
  const displayPreviewImg = currentPreviewImages[previewActiveImgIdx] || currentPreviewImages[0];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 font-fluid" dir={language === 'fr' ? 'ltr' : 'rtl'}>
      {/* Header strictly DABABI3 with portal subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Logo size="lg" />
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-300 text-emerald-950 dark:text-emerald-300">
              {t.portalSubtitle}
            </span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
              {t.addProduct}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.savedAutomatically} — أدخل تفاصيل سلعتك وارفع أكثر من صورة واضغط نشر!
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 self-start sm:self-auto">
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
            className="flex flex-col gap-5 bg-white dark:bg-slate-900 p-5 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
          >
            {/* 1. قسم بيانات المتجر والهاتف (المعلومات مسجلة مسبقاً في الخانات) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/80 border border-emerald-300 dark:border-emerald-700/60 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>معلومات المورد والمتجر (مسجلة ومحفوظة بحسابك):</span>
                </span>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  ✓ مسجلة وجاهزة
                </span>
              </div>

              {/* الخانات مسجلة ومملوءة بالبيانات مسبقاً */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {t.storeName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={(e) => handleStoreNameChange(e.target.value)}
                    placeholder="اسم متجرك الخاص"
                    className="h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-600 text-slate-900 dark:text-white text-xs font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 shadow-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {t.city} *
                  </label>
                  <select
                    value={supplierCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-600 text-slate-900 dark:text-white text-xs font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 shadow-xs cursor-pointer"
                  >
                    {MOROCCAN_CITIES.filter((c) => c !== 'الكل').map((c) => (
                      <option key={c} value={c}>
                        {getCityLabel(c, language)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {t.whatsappPhone} *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute right-3 text-xs text-slate-500 font-mono font-bold" dir="ltr">
                    🇲🇦 +212
                  </span>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="06XXXXXXXX"
                    className="h-11 w-full pr-20 pl-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-600 text-slate-900 dark:text-white text-xs font-mono font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. قسم بيانات المنتج المراد إضافته */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                <h2 className="font-bold text-base text-slate-900 dark:text-white">
                  {language === 'fr' ? 'Détails du produit' : 'بيانات المنتج'}
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">
                {language === 'fr' ? 'Visible par tous sur le même lien' : 'يظهر للجميع بنفس الرابط'}
              </span>
            </div>

            {/* اسم المنتج والثمن */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.productName} *
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={language === 'fr' ? 'Ex: Sac de voyage en cuir artisanal' : 'مثال: حقيبة سفر جلد طبيعي أصيل'}
                  className="h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-600 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.productPrice} *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="1"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="350"
                    className="h-11 w-full pl-10 pr-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-display font-bold text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-600 outline-none transition-all"
                  />
                  <span className="absolute left-3 top-3 text-[10px] font-bold text-slate-400">
                    {t.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* الفئات بأزرار ملونة */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.productCategory} *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(opt.id);
                      setCategoryLabel(getCategoryLabel(opt.id, language));
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      selectedCategory === opt.id
                        ? `bg-gradient-to-r ${opt.color} text-white border-transparent shadow-sm scale-[1.01]`
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {getCategoryLabel(opt.id, language)}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. إدخال أكثر من صورة منتج (الميزة المطلوبة بدقة) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>{t.productImages}</span>
                </label>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  {images.length > 0 ? `${images.length} صور مضافة` : 'يمكنك رفع أكثر من صورة'}
                </span>
              </div>

              {/* Upload area with multiple files support */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center bg-slate-50/70 dark:bg-slate-800/40 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultipleFiles}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  {t.uploadImages}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  اختر عدة صور من هاتفك دفعة واحدة (JPEG, PNG, WebP)
                </span>
              </div>

              {/* Thumbnails of added images with primary selector and delete */}
              {images.length > 0 && (
                <div className="flex flex-col gap-2 mt-1 p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    الصور المرفوعة (اضغط على أي صورة لجعلها الرئيسية):
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {images.map((img, idx) => {
                      const isPrimary = idx === 0;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleSetPrimary(idx)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer group transition-all ${
                            isPrimary
                              ? 'border-emerald-600 ring-2 ring-emerald-500/40 shadow-md'
                              : 'border-white dark:border-slate-700 hover:border-emerald-300'
                          }`}
                        >
                          <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />

                          {isPrimary ? (
                            <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                              {t.primaryPhoto}
                            </span>
                          ) : (
                            <span className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-900/80 text-white text-[8px] px-1 py-0.5 rounded transition-opacity">
                              رئيسية؟
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(idx);
                            }}
                            className="absolute top-1 left-1 p-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="حذف هذه الصورة"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* URL Direct Add Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{showUrlInput ? 'إخفاء خانة الرابط' : t.orEnterUrl}</span>
                </button>
              </div>

              {showUrlInput && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDirectUrl}
                    className="px-4 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    {t.addImageUrl}
                  </button>
                </div>
              )}
            </div>

            {/* الوصف */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.productDesc}
              </label>
              <textarea
                rows={3}
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="اكتب وصفاً جذاباً للسلعة، القياسات، الجودة، شروط التوصيل..."
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-600 outline-none transition-all resize-none"
              />
            </div>

            {/* زر النشر الفوري */}
            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 active:scale-[0.99] transition-all cursor-pointer mt-2"
            >
              <Rocket className="w-5 h-5" />
              <span>{t.publishProduct}</span>
            </button>
          </form>

          {/* إشعار النجاح */}
          {showSuccessToast && (
            <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between gap-3 shadow-lg animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">
                    {language === 'fr'
                      ? `Le produit "${lastAddedName}" a été publié avec succès !`
                      : `تم نشر منتج "${lastAddedName}" بنجاح!`}
                  </span>
                  <span>
                    {language === 'fr'
                      ? 'Il est maintenant visible par tous les visiteurs sur le même lien.'
                      : 'أصبح معروضاً الآن لجميع الزوار على نفس رابط الموقع.'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('browse-products')}
                className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 text-xs font-bold shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Voir dans le catalogue' : 'مشاهدة في قائمة المنتجات'}
              </button>
            </div>
          )}
        </div>

        {/* Live Preview Side (Sticky) with interactive multiple photos preview */}
        <div className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {language === 'fr'
                  ? 'Aperçu en direct du produit dans le catalogue :'
                  : 'معاينة حية لشكل المنتج في قائمة المنتجات:'}
              </span>
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              {language === 'fr' ? 'En direct' : 'تحديث فوري'}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md transition-colors flex flex-col">
            {/* Image box with carousel navigation if multiple photos */}
            <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden group">
              <img
                src={displayPreviewImg}
                alt="معاينة"
                className="w-full h-full object-cover transition-transform duration-300"
              />

              {/* Prev / Next photo controls */}
              {currentPreviewImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewActiveImgIdx((prev) =>
                        prev === 0 ? currentPreviewImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewActiveImgIdx((prev) =>
                        prev === currentPreviewImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Photo indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {currentPreviewImages.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i === previewActiveImgIdx ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm">
                    {previewActiveImgIdx + 1}/{currentPreviewImages.length}
                  </span>
                </>
              )}

              <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.supplierVerified}</span>
              </div>

              <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm">
                {categoryLabel}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{supplierCity || 'المدينة'} • {supplierName || 'اسم المتجر'}</span>
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-black text-xl text-emerald-800 dark:text-emerald-400">
                    {productPrice ? parseFloat(productPrice).toLocaleString('fr-FR') : '0'}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{t.currency}</span>
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                {productName || 'اسم السلعة المعروضة'}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {productDesc || 'وصف السلعة...'}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{t.supplierWhatsApp}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                    {whatsappNumber || '06XXXXXXXX'}
                  </span>
                </div>

                <div className="w-full h-10 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 opacity-90">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.orderOnWhatsApp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
