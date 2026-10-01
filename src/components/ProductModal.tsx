import React from 'react';
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
  Clock,
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
  const [copiedPhone, setCopiedPhone] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1a1c1b] shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto">
          {/* Main Visual */}
          <div className="relative w-full aspect-[16/10] bg-[#eeeeec]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.verified && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-[#006c46] flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-[#00a86b]" />
                <span>مورد معتمد من DABABI3</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg">
              {product.categoryLabel}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 flex flex-col gap-6">
            {/* Header info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#707972]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00a86b]" />
                    {product.supplierCity}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-[#00a86b]" />
                    {product.supplierName}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-black text-3xl text-[#00422b]">
                    {product.price.toLocaleString('fr-FR')}
                  </span>
                  <span className="font-bold text-sm text-[#00422b]">درهم مغربي</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#a0a5a2] line-through mr-1 font-mono">
                      {product.originalPrice} د.م.
                    </span>
                  )}
                </div>
              </div>

              <h1 className="font-bold text-2xl text-[#1a1c1b] leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Product Meta Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#f9f9f7] border border-[#eeeeec] flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#006c46]" />
                <div className="text-xs">
                  <span className="text-[#707972] block">الكمية / التعبئة</span>
                  <span className="font-bold text-[#1a1c1b]">{product.unit || 'قطعة أصلية'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f9f9f7] border border-[#eeeeec] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#006c46]" />
                <div className="text-xs">
                  <span className="text-[#707972] block">طريقة الدفع</span>
                  <span className="font-bold text-[#1a1c1b]">عند الاستلام (Cash)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f9f9f7] border border-[#eeeeec] flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-[#006c46]" />
                <div className="text-xs">
                  <span className="text-[#707972] block">سرعة الرد</span>
                  <span className="font-bold text-[#1a1c1b]">مباشر على واتساب</span>
                </div>
              </div>
            </div>

            {/* Full Description */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-sm text-[#1a1c1b]">تفاصيل ومواصفات السلعة:</h3>
              <p className="text-sm text-[#404943] leading-relaxed whitespace-pre-line bg-[#f4f4f1]/50 p-4 rounded-2xl border border-[#eeeeec]">
                {product.description}
              </p>
            </div>

            {/* Supplier WhatsApp Direct Box */}
            <div className="p-4 rounded-2xl bg-[#00422b]/5 border border-[#00422b]/15 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#00422b] text-white flex items-center justify-center font-bold text-xs">
                    🇲🇦
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#00422b] block">مورد مباشر مسجل</span>
                    <span className="text-xs text-[#404943]">{product.supplierName} ({product.supplierCity})</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-white border border-[#00422b]/20 hover:bg-[#00422b]/5 transition-colors"
                >
                  <span dir="ltr">{product.whatsappNumber}</span>
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-[#00a86b]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#404943]" />
                  )}
                </button>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#00422b] hover:bg-[#006c46] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>مراسلة المورد وطلب السلعة عبر واتساب</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-[#707972] pt-1">
                <span>⚡ يتم تحويلك فوراً لتطبيق واتساب مع رسالة جاهزة تتضمن تفاصيل الطلب</span>
                <span className="font-semibold text-[#006c46]">0% عمولة</span>
              </div>
            </div>

            {/* Bottom Actions: Bookmark & Share */}
            <div className="flex items-center justify-between pt-2 border-t border-[#eeeeec]">
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                  isFavorite
                    ? 'bg-[#00422b] text-white'
                    : 'bg-[#eeeeec] text-[#404943] hover:text-[#1a1c1b]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                <span>{isFavorite ? 'تم الحفظ في المفضلة' : 'حفظ المنتج للمقارنة'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#404943] hover:text-[#00422b] p-2"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-[#00a86b]" />
                    <span>تم نسخ الرابط!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة السلعة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
