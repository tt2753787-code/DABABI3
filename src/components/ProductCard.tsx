import React, { useState, useRef, useEffect } from 'react';
import { Product, Language } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { CATEGORIES } from '../data/initialProducts';
import { getTranslation } from '../utils/translations';
import {
  CheckCircle2,
  MessageCircle,
  Bookmark,
  Copy,
  Check,
  Eye,
  MapPin,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  isSellerMode?: boolean;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  language?: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  isSellerMode = false,
  onEditProduct,
  onDeleteProduct,
  language = 'ar',
}) => {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = getTranslation(language);

  const allImages = product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl];

  const currentDisplayImg = allImages[currentImgIdx] || product.imageUrl;

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const categoryConfig = CATEGORIES.find((c) => c.id === product.category) || {
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    borderClass: 'border-emerald-200 dark:border-emerald-800',
    activeBg: '',
  };

  const whatsappLink = buildWhatsAppLink(
    product.whatsappNumber,
    product.name,
    product.price,
    product.supplierName
  );

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-3xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 font-fluid relative">
      {/* Product Image Box with Multiple Photos Support */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
      >
        <img
          src={currentDisplayImg}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Multi-image navigation controls right on the card */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
              title="الصورة السابقة"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
              title="الصورة التالية"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Photo indicators dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-full backdrop-blur-sm z-10 pointer-events-none">
              {allImages.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentImgIdx ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Photo counter tag */}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20 z-10">
              📷 {currentImgIdx + 1}/{allImages.length}
            </div>
          </>
        )}

        {/* Verified Badge */}
        {product.verified && (
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 shadow-sm z-10">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.supplierVerified}</span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
          <div
            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border backdrop-blur-md ${categoryConfig.badgeBg} ${categoryConfig.badgeText} ${categoryConfig.borderClass}`}
          >
            {product.categoryLabel}
          </div>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.quickView}</span>
          </span>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md shadow-sm transition-all duration-200 cursor-pointer z-10 ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? t.savedInFavorites : t.favorites}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* 3-Dots Menu Button over the image for Sellers */}
        {isSellerMode && (
          <div className="absolute top-3 left-12 z-20" ref={menuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-2 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-white text-slate-700 dark:text-slate-200 shadow-md backdrop-blur-md transition-all cursor-pointer flex items-center justify-center"
              title="خيارات السلعة (تعديل / مسح)"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div
                className="absolute left-0 mt-1 w-32 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-1.5 z-30 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                {/* تعديل */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (onEditProduct) onEditProduct(product);
                  }}
                  className="w-full text-right px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{t.edit}</span>
                  <Edit2 className="w-3.5 h-3.5 text-emerald-600" />
                </button>

                {/* مسح */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (confirm(t.confirmDeleteProduct || `هل أنت متأكد من مسح سلعة "${product.name}" نهائياً من الموقع؟`)) {
                      if (onDeleteProduct) onDeleteProduct(product.id);
                    }
                  }}
                  className="w-full text-right px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{t.delete}</span>
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          {/* City / Store & Price Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{product.supplierCity} • {product.supplierName}</span>
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-xl text-emerald-800 dark:text-emerald-400">
                {product.price.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{t.currency}</span>
            </div>
          </div>

          {/* Title */}
          <h2
            onClick={() => onSelectProduct(product)}
            className="font-bold text-sm md:text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* WhatsApp Button & Phone */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>{t.supplierWhatsApp}</span>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px]" dir="ltr">
                {product.whatsappNumber}
              </span>
              <button
                onClick={handleCopyPhone}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title={t.copyPhone}
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>

          {/* Direct WhatsApp CTA Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.orderOnWhatsApp}</span>
          </a>
        </div>
      </div>
    </article>
  );
};
