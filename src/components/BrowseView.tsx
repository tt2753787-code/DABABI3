import React, { useState, useMemo } from 'react';
import { Product, CategoryId, ViewMode, Language } from '../types';
import { CATEGORIES, MOROCCAN_CITIES, SUPPORT_WHATSAPP_LINK } from '../data/initialProducts';
import { ProductCard } from './ProductCard';
import { Logo } from './Logo';
import { UserSession } from './AuthScreen';
import { getTranslation } from '../utils/translations';
import {
  Search,
  CheckCircle2,
  Zap,
  X,
  MapPin,
  ArrowUpDown,
  ShoppingBag,
  PlusCircle,
  Store,
  Grid,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

interface BrowseViewProps {
  products: Product[];
  onNavigate: (view: ViewMode) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  userSession?: UserSession | null;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  language?: Language;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  products,
  onNavigate,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  userSession,
  onEditProduct,
  onDeleteProduct,
  language = 'ar',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedCity, setSelectedCity] = useState<string>('الكل');
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc'>('latest');
  const [sellerOnlyTab, setSellerOnlyTab] = useState(false);

  const t = getTranslation(language);
  const cleanPhone = (phone?: string) => (phone ? phone.replace(/\D/g, '') : '');

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // If supplier viewing only their products
        if (sellerOnlyTab && userSession?.role === 'supplier') {
          const userP = cleanPhone(userSession.phone);
          const prodP = cleanPhone(p.whatsappNumber);
          const isMatchPhone = userP && prodP && (userP.includes(prodP.slice(-8)) || prodP.includes(userP.slice(-8)));
          const isMatchName = userSession.storeName && p.supplierName.toLowerCase().includes(userSession.storeName.toLowerCase());
          if (!isMatchPhone && !isMatchName) {
            return false;
          }
        }

        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (selectedCity !== 'الكل' && p.supplierCity !== selectedCity) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const query = searchQuery.trim().toLowerCase();
          return (
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.supplierName.toLowerCase().includes(query) ||
            p.supplierCity.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedCategory, selectedCity, searchQuery, sortBy, sellerOnlyTab, userSession]);

  // Check how many items belong to the logged-in supplier
  const myProductsCount = useMemo(() => {
    if (!userSession || userSession.role !== 'supplier') return 0;
    const userP = cleanPhone(userSession.phone);
    return products.filter((p) => {
      const prodP = cleanPhone(p.whatsappNumber);
      const isMatchPhone = userP && prodP && (userP.includes(prodP.slice(-8)) || prodP.includes(userP.slice(-8)));
      const isMatchName = userSession.storeName && p.supplierName.toLowerCase().includes(userSession.storeName.toLowerCase());
      return isMatchPhone || isMatchName;
    }).length;
  }, [products, userSession]);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 font-fluid" dir={language === 'fr' ? 'ltr' : 'rtl'}>
      {/* Top Hero: Pure DABABI3 with multilingual copy */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Logo size="xl" />
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-300 text-emerald-950 dark:text-emerald-300">
              {t.portalSubtitle}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {t.zeroCommission}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {t.heroTagline}
          </p>
        </div>

        <button
          onClick={() => onNavigate('supplier-add-product')}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.addProduct}</span>
        </button>
      </section>

      {/* Supplier Store Filter Tabs (if logged in as supplier) */}
      {userSession?.role === 'supplier' && (
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setSellerOnlyTab(false)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              !sellerOnlyTab
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{t.allProducts} ({products.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setSellerOnlyTab(true)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              sellerOnlyTab
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{t.myProducts} ({myProductsCount})</span>
            {myProductsCount > 0 && (
              <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                تحكم
              </span>
            )}
          </button>
        </div>
      )}

      {/* Search & Filter Boxes */}
      <section className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 w-full">
          {/* خانة البحث */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full h-11 pr-10 pl-9 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-medium shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* خانة المدينة */}
          <div className="sm:col-span-3 relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-emerald-600">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="المدينة"
              className="w-full h-11 pr-9 pl-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-sm outline-none cursor-pointer focus:border-emerald-600 appearance-none"
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city === 'الكل' ? t.allCities : city}
                </option>
              ))}
            </select>
          </div>

          {/* خانة الترتيب */}
          <div className="sm:col-span-3 relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="الترتيب"
              className="w-full h-11 pr-9 pl-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-sm outline-none cursor-pointer focus:border-emerald-600 appearance-none"
            >
              <option value="latest">{t.sortLatest}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border ${
                  isSelected
                    ? `${cat.activeBg} border-transparent shadow-md scale-105`
                    : `${cat.badgeBg} ${cat.badgeText} ${cat.borderClass} hover:opacity-90 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700`
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Meta Row */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="font-bold text-slate-800 dark:text-slate-200">
          {sellerOnlyTab ? `${t.myProducts} (${filteredProducts.length})` : `${t.allProducts} (${filteredProducts.length})`}
        </span>
        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.directWhatsApp} {t.zeroCommission}</span>
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const userP = cleanPhone(userSession?.phone);
            const prodP = cleanPhone(product.whatsappNumber);
            const isOwner =
              userSession?.role === 'supplier' &&
              ((userP && prodP && (userP.includes(prodP.slice(-8)) || prodP.includes(userP.slice(-8)))) ||
                (userSession.storeName && product.supplierName.toLowerCase().includes(userSession.storeName.toLowerCase())));

            return (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProduct={onSelectProduct}
                isSellerMode={isOwner || (userSession?.role === 'supplier' && sellerOnlyTab)}
                onEditProduct={onEditProduct}
                onDeleteProduct={onDeleteProduct}
                language={language}
              />
            );
          })}
        </div>
      ) : (
        /* Clean Fresh Empty State - No demo products */
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-6 sm:p-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {searchQuery || selectedCategory !== 'all' || selectedCity !== 'الكل'
              ? t.emptySearch
              : t.emptyProducts}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            {searchQuery || selectedCategory !== 'all' || selectedCity !== 'الكل'
              ? 'جرّب البحث بكلمات أخرى أو تصفير الفلاتر.'
              : t.emptyProductsSub}
          </p>

          <div className="flex items-center gap-3 pt-2">
            {searchQuery || selectedCategory !== 'all' || selectedCity !== 'الكل' ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCity('الكل');
                }}
                className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {t.resetSearch}
              </button>
            ) : null}

            <button
              onClick={() => onNavigate('supplier-add-product')}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.addFirstProduct}</span>
            </button>
          </div>
        </div>
      )}

      {/* Support Banner (Phone digits hidden as required) */}
      <section className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-emerald-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">DABABI3 بدون عمولة وبدون وساطة</span>
            <span className="text-slate-500 dark:text-slate-400">تفاهم على السعر وطريقة الاستلام مباشرة مع المورد على الواتساب.</span>
          </div>
        </div>
        <a
          href={SUPPORT_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-slate-700 rounded-xl font-bold text-xs transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
          <span>{t.supportWhatsApp}</span>
        </a>
      </section>
    </div>
  );
};
