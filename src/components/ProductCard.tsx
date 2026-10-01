import React from 'react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { CheckCircle2, MessageCircle, Bookmark, Copy, Check, Eye } from 'lucide-react';

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
  const [copied, setCopied] = React.useState(false);

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
    <article className="group bg-white rounded-2xl flex flex-col overflow-hidden border border-[#e2e3e0]/80 shadow-sm hover:shadow-xl hover:border-[#00422b]/30 transition-all duration-300">
      {/* Product Image Box */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[4/3] bg-[#eeeeec] overflow-hidden cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Verified Badge */}
        {product.verified && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-[#006c46] flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00a86b]" />
            <span>مورد معتمد</span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-medium text-white">
          {product.categoryLabel}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 backdrop-blur-md text-[#00422b] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>عرض التفاصيل</span>
          </span>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'bg-[#00422b] text-white'
              : 'bg-white/90 text-[#404943] hover:text-[#00422b] hover:bg-white'
          }`}
          title={isFavorite ? 'إزالة من المحفوظات' : 'حفظ المنتج'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 md:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Location and Price Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#707972]">
              {product.supplierCity} • {product.supplierName}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-xl text-[#00422b]">
                {product.price.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs font-bold text-[#00422b]">درهم</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#a0a5a2] line-through mr-1 font-mono">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h2
            onClick={() => onSelectProduct(product)}
            className="font-bold text-base md:text-lg text-[#1a1c1b] group-hover:text-[#00422b] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-xs md:text-sm text-[#404943] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer actions: Phone info and WhatsApp Button */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-[#eeeeec]">
          {/* Supplier Direct Phone with copy action */}
          <div className="flex items-center justify-between text-xs text-[#707972]">
            <span>رقم المورد المباشر:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-[#1a1c1b] text-xs" dir="ltr">
                {product.whatsappNumber}
              </span>
              <button
                onClick={handleCopyPhone}
                className="p-1 rounded hover:bg-[#eeeeec] text-[#404943] transition-colors"
                title="نسخ رقم الهاتف"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#00a86b]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Order via WhatsApp Direct Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-[#00422b] hover:bg-[#006c46] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>طلب عبر واتساب المورد</span>
          </a>
        </div>
      </div>
    </article>
  );
};
