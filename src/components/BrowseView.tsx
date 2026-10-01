import React, { useState, useMemo } from 'react';
import { Product, CategoryId, ViewMode } from '../types';
import { CATEGORIES, MOROCCAN_CITIES } from '../data/initialProducts';
import { ProductCard } from './ProductCard';
import {
  Search,
  CheckCircle2,
  Zap,
  SlidersHorizontal,
  X,
  MapPin,
  ArrowUpDown,
  ShoppingBag,
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
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // City filter
        if (selectedCity !== 'الكل' && p.supplierCity !== selectedCity) {
          return false;
        }

        // Search query
        if (searchQuery.trim() !== '') {
          const query = searchQuery.trim().toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchSupplier = p.supplierName.toLowerCase().includes(query);
          const matchCity = p.supplierCity.toLowerCase().includes(query);
          const matchCategory = p.categoryLabel.toLowerCase().includes(query);
          return matchName || matchDesc || matchSupplier || matchCity || matchCategory;
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
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-10">
      {/* Hero / Headline Section matching Mockup */}
      <section className="flex flex-col items-start gap-2 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#98f2c0]/30 text-[#006c46] font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-[#00a86b] animate-pulse" />
          <span>منصة التوريد المباشر بالمغرب</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#00422b] tracking-tight">
          DABABI3
        </h1>

        <p className="font-semibold text-lg md:text-xl text-[#404943] max-w-2xl leading-relaxed">
          سوق مباشر يربط بين المورد والزبون عبر واتساب بضغطة زر واحدة بدون تعقيدات وبدون عمولة.
        </p>
      </section>

      {/* Controls / Search & Category Filters */}
      <section className="flex flex-col gap-4">
        {/* Search Bar & City Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Search Input Container */}
          <div className="relative w-full flex-1">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#707972]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج، علامة، أو صنف..."
              className="w-full h-12 pr-11 pl-10 bg-white text-[#1a1c1b] rounded-2xl border border-[#e2e3e0] text-sm shadow-sm outline-none placeholder:text-[#707972] focus:border-[#00422b] focus:ring-2 focus:ring-[#00422b]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#707972] hover:text-[#1a1c1b]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Selector */}
          <div className="relative w-full sm:w-56 shrink-0">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#006c46]">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="تصفية حسب المدينة"
              className="w-full h-12 pr-10 pl-4 bg-white text-[#1a1c1b] rounded-2xl border border-[#e2e3e0] text-sm font-semibold shadow-sm outline-none cursor-pointer focus:border-[#00422b] appearance-none"
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city === 'الكل' ? '📍 جميع المدن المغربية' : `📍 ${city}`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative w-full sm:w-48 shrink-0">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#707972]">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="ترتيب المنتجات"
              className="w-full h-12 pr-10 pl-4 bg-white text-[#1a1c1b] rounded-2xl border border-[#e2e3e0] text-xs font-semibold shadow-sm outline-none cursor-pointer focus:border-[#00422b] appearance-none"
            >
              <option value="latest">الأحدث إضافة</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  isSelected
                    ? 'bg-[#00422b] text-white shadow-md'
                    : 'bg-white text-[#404943] hover:text-[#1a1c1b] hover:bg-[#eeeeec] border border-[#e2e3e0]/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Counter Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#707972] border-b border-[#e2e3e0] pb-3">
        <span className="font-bold text-[#1a1c1b]">
          المعروضات المتوفرة ({filteredProducts.length} منتجات مؤكدة)
        </span>
        <span className="flex items-center gap-1.5 text-[#006c46] font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#00a86b]" />
          <span>جميع الموردين خاضعون للتحقق المسبق والتواصل المباشر</span>
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
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
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4 bg-white rounded-3xl border border-dashed border-[#bfc9c1] p-8">
          <div className="w-16 h-16 rounded-full bg-[#eeeeec] flex items-center justify-center text-[#707972]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-[#1a1c1b]">لم نجد أي منتجات تطابق بحثك</h3>
            <p className="text-sm text-[#707972]">
              جرب كلمة دلالية مختلفة أو اختر تصنيفاً آخر أو قم بتصفير المدينة.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCity('الكل');
            }}
            className="px-5 py-2.5 bg-[#00422b] text-white rounded-xl text-xs font-bold hover:bg-[#006c46] transition-colors"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}

      {/* Direct Value Proposition Strip matching Mockup */}
      <section className="mt-4 p-6 md:p-8 bg-[#f4f4f1] border border-[#e2e3e0] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#98f2c0] text-[#047149] flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#1a1c1b]">لماذا DABABI3؟</h4>
            <p className="text-sm text-[#404943] leading-relaxed">
              تواصل مباشر 100% بدون عمولات خفية، بدون حسابات بنكية إجبارية وبدون وسيط تجاري. اتفق مباشرة مع المورد على الواتساب.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('supplier-add-product')}
          className="whitespace-nowrap px-6 py-3 bg-white hover:bg-[#eeeeec] text-[#00422b] border border-[#00422b]/20 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 shrink-0"
        >
          سجل منتجك كمورد الآن
        </button>
      </section>
    </div>
  );
};
