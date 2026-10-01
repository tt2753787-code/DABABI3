import React, { useState } from 'react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { CATEGORIES } from '../data/initialProducts';
import { CheckCircle2, MessageCircle, Bookmark, Copy, Check, Eye, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
}) => {
  const [copied, setCopied] = useState(false);

  const categoryConfig = CATEGORIES.find((c) => c.id === product.category) || {
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    borderClass: 'border-emerald-200',
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

  return (
    <article className="group bg-white rounded-3xl flex flex-col overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 font-fluid">
      {/* Product Image Box */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Verified Badge */}
        {product.verified && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-800 flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>مورد معتمد</span>
          </div>
        )}

        {/* Category Pill Tag with vibrant color */}
        <div
          className={`absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border backdrop-blur-md ${categoryConfig.badgeBg} ${categoryConfig.badgeText} ${categoryConfig.borderClass}`}
        >
          {product.categoryLabel}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>معاينة سريعة</span>
          </span>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md shadow-sm transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? 'محفوظ في المفضلة' : 'حفظ'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          {/* City / Store & Price Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{product.supplierCity} • {product.supplierName}</span>
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-xl text-emerald-800">
                {product.price.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs font-bold text-emerald-700">درهم</span>
            </div>
          </div>

          {/* Title */}
          <h2
            onClick={() => onSelectProduct(product)}
            className="font-bold text-sm md:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h2>

          {/* Description - clean and simplified */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* WhatsApp Button & Phone */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>واتساب المورد:</span>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-slate-800 text-[11px]" dir="ltr">
                {product.whatsappNumber}
              </span>
              <button
                onClick={handleCopyPhone}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                title="نسخ الرقم"
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
            <span>طلب عبر واتساب المورد</span>
          </a>
        </div>
      </div>
    </article>
  );
};
