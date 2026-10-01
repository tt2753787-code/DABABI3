import React, { useState, useMemo } from 'react';
import { Product, CategoryId, ViewMode } from '../types';
import { CATEGORIES, MOROCCAN_CITIES } from '../data/initialProducts';
import { ProductCard } from './ProductCard';
import { Logo } from './Logo';
import {
  Search,
  CheckCircle2,
  Zap,
  X,
  MapPin,
  ArrowUpDown,
  ShoppingBag,
  PlusCircle,
} from 'lucide-react';

interface BrowseViewProps {
  products: Product[];
  onNavigate: (view: ViewMode) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  products,
  onNavigate,
  favorites,
  onToggleFavorite,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedCity, setSelectedCity] = useState<string>('الكل');
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc'>('latest');

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
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
  }, [products, selectedCategory, selectedCity, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 font-fluid">
      {/* Top Hero: Pure DABABI3 with sleek mixed colors */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Logo size="xl" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              مباشر 0% عمولة
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            طلب مباشر من المورد عبر واتساب بضغطة زر واحدة.
          </p>
        </div>

        <button
          onClick={() => onNavigate('supplier-add-product')}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>أضف منتجك الآن</span>
        </button>
      </section>

      {/* Simplified Search & Filter Boxes: خانة البحث، خانة المدينة، خانة الترتيب */}
      <section className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 w-full">
          {/* خانة البحث (Search Box) */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج أو مورد..."
              className="w-full h-11 pr-10 pl-9 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-medium shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* خانة المدينة (City Box) */}
          <div className="sm:col-span-3 relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-emerald-600">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="المدينة"
              className="w-full h-11 pr-9 pl-3 bg-white text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold shadow-sm outline-none cursor-pointer focus:border-emerald-600 appearance-none"
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city === 'الكل' ? 'جميع المدن' : city}
                </option>
              ))}
            </select>
          </div>

          {/* خانة الترتيب (Sort Box) */}
          <div className="sm:col-span-3 relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="الترتيب"
              className="w-full h-11 pr-9 pl-3 bg-white text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold shadow-sm outline-none cursor-pointer focus:border-emerald-600 appearance-none"
            >
              <option value="latest">الأحدث</option>
              <option value="price-asc">الأقل سعراً</option>
              <option value="price-desc">الأعلى سعراً</option>
            </select>
          </div>
        </div>

        {/* Categories Pills with rich mixed colors */}
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
                    : `${cat.badgeBg} ${cat.badgeText} ${cat.borderClass} hover:opacity-90`
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Compact Meta Row */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
        <span className="font-bold text-slate-800">
          المعروضات ({filteredProducts.length})
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>تواصل مباشر عبر واتساب</span>
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3 bg-white rounded-3xl border border-dashed border-slate-300 p-6">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
          <h3 className="text-base font-bold text-slate-800">لا توجد نتائج مطابقة</h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCity('الكل');
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            تصفير البحث
          </button>
        </div>
      )}

      {/* Simple Direct Banner */}
      <section className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 block">DABABI3 بدون عمولة وبدون وساطة</span>
            <span className="text-slate-500">تفاهم على السعر وطريقة الاستلام مباشرة مع المورد على الواتساب.</span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('supplier-add-product')}
          className="whitespace-nowrap px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-xs transition-all shadow-sm shrink-0"
        >
          أضف سلعتك
        </button>
      </section>
    </div>
  );
};
