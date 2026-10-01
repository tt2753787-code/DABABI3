import React, { useState } from 'react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import {
  X,
  MessageCircle,
  CheckCircle2,
  Bookmark,
  Share2,
  Copy,
  Check,
  MapPin,
  Store,
  ShieldCheck,
  Package,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const whatsappLink = buildWhatsAppLink(
    product.whatsappNumber,
    product.name,
    product.price,
    product.supplierName
  );

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(product.whatsappNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid" dir="rtl">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Visual */}
          <div className="relative w-full aspect-[16/10] bg-slate-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.verified && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>مورد معتمد</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg">
              {product.categoryLabel}
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4">
            {/* Header info */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.supplierCity} • {product.supplierName}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-display font-black text-2xl text-emerald-800">
                    {product.price.toLocaleString('fr-FR')}
                  </span>
                  <span className="font-bold text-xs text-emerald-700">درهم</span>
                </div>
              </div>

              <h1 className="font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-slate-400 block text-[10px]">الكمية</span>
                  <span className="font-bold text-slate-800">{product.unit || 'حسب الطلب'}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-slate-400 block text-[10px]">الدفع</span>
                  <span className="font-bold text-slate-800">عند الاستلام (Cash)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </div>

            {/* Supplier WhatsApp Direct Box with mixed gradient */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {product.supplierName} ({product.supplierCity})
                </span>

                <button
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200"
                >
                  <span dir="ltr">{product.whatsappNumber}</span>
                  {copiedPhone ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>طلب السلعة عبر واتساب</span>
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                  isFavorite
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
                <span>{isFavorite ? 'محفوظ في المفضلة' : 'حفظ في المفضلة'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 p-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'تم النسخ!' : 'مشاركة'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

