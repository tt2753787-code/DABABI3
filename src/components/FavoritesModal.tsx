import React from 'react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { X, Bookmark, Trash2, MessageCircle, ArrowRight } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: Product[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  products,
  onToggleFavorite,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#eeeeec] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00422b]/10 text-[#00422b] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#1a1c1b]">المنتجات المحفوظة في المفضلة</h2>
              <span className="text-xs text-[#707972]">{favoriteProducts.length} منتجات</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#eeeeec] text-[#707972] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex flex-col gap-3">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-[#e2e3e0] hover:border-[#00422b]/40 transition-all bg-[#f9f9f7]"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl object-cover cursor-pointer shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-[#707972] block truncate">
                    {prod.supplierCity} • {prod.supplierName}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="font-bold text-sm text-[#1a1c1b] truncate hover:text-[#00422b] cursor-pointer"
                  >
                    {prod.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display font-black text-sm text-[#00422b]">
                      {prod.price.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-[11px] font-bold text-[#00422b]">درهم</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={buildWhatsAppLink(prod.whatsappNumber, prod.name, prod.price, prod.supplierName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#00422b] hover:bg-[#006c46] text-white transition-colors"
                    title="طلب عبر واتساب"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>

                  <button
                    onClick={() => onToggleFavorite(prod.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    title="حذف من المحفوظات"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center flex flex-col items-center gap-2">
              <Bookmark className="w-12 h-12 text-[#bfc9c1]" />
              <h3 className="font-bold text-base text-[#1a1c1b]">لا توجد سلع محفوظة حالياً</h3>
              <p className="text-xs text-[#707972]">
                يمكنك الضغط على علامة الحفظ في أي منتج للعودة إليه لاحقاً ومراسلته عبر واتساب.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eeeeec] bg-[#f4f4f1] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-[#e2e3e0] text-xs font-bold text-[#1a1c1b] hover:bg-[#eeeeec] transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
