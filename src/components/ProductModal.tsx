import React, { useState, useEffect } from 'react';
import { Product, Language } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { getTranslation } from '../utils/translations';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  language?: Language;
  isDarkMode?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  language = 'ar',
  isDarkMode = false,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const t = getTranslation(language);

  useEffect(() => {
    setActiveImgIdx(0);
  }, [product]);

  if (!product) return null;

  const allPhotos = product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl];

  const currentDisplayImage = allPhotos[activeImgIdx] || product.imageUrl;

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

  const handlePrev = () => {
    setActiveImgIdx((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImgIdx((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid"
      dir={language === 'fr' ? 'ltr' : 'rtl'}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className={`relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col border transition-colors ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Visual with multiple photos support */}
          <div className="flex flex-col bg-slate-100 dark:bg-slate-800">
            <div className="relative w-full aspect-[16/10] overflow-hidden group">
              <img
                src={currentDisplayImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {allPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <span className="absolute top-4 left-14 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-xl backdrop-blur-sm">
                    {activeImgIdx + 1}/{allPhotos.length}
                  </span>
                </>
              )}

              {product.verified && (
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.supplierVerified}</span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg">
                {product.categoryLabel}
              </div>
            </div>

            {/* Thumbnail carousel if product has multiple photos */}
            {allPhotos.length > 1 && (
              <div className="flex items-center gap-2 p-3 bg-slate-200/60 dark:bg-slate-950/60 overflow-x-auto">
                {allPhotos.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImgIdx === idx
                        ? 'border-emerald-600 ring-2 ring-emerald-500/40 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6 flex flex-col gap-4">
            {/* Header info */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.supplierCity} • {product.supplierName}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-display font-black text-2xl text-emerald-800 dark:text-emerald-400">
                    {product.price.toLocaleString('fr-FR')}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{t.currency}</span>
                </div>
              </div>

              <h1 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">
                {product.name}
              </h1>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.productDesc}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Store & Direct Contact Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">{product.supplierName}</span>
                  <span className="text-slate-500 dark:text-slate-400">مورد مباشر في {product.supplierCity}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200" dir="ltr">
                  {product.whatsappNumber}
                </span>
                <button
                  onClick={handleCopyPhone}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors cursor-pointer"
                  title={t.copyPhone}
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Actions: Direct WhatsApp CTA + Bookmark & Share */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.orderOnWhatsApp}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`h-12 px-4 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                  <span>{isFavorite ? 'محفوظ' : 'حفظ'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="h-12 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
                  title="مشاركة الرابط"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'تم النسخ!' : 'مشاركة'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
