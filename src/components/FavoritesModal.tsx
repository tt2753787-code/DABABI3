import React from 'react';
import { Product, Language } from '../types';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { getTranslation } from '../utils/translations';
import { X, Bookmark, Trash2, MessageCircle } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: Product[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  language?: Language;
  isDarkMode?: boolean;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  products,
  onToggleFavorite,
  onSelectProduct,
  language = 'ar',
  isDarkMode = false,
}) => {
  const t = getTranslation(language);
  if (!isOpen) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid"
      dir={language === 'fr' ? 'ltr' : 'rtl'}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className={`relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col border transition-colors ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-bold text-base">{t.favorites}</h2>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {favoriteProducts.length} {language === 'fr' ? 'articles enregistrés' : 'سلع محفوظة'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-500'
            }`}
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
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'border-slate-800 bg-slate-800/40 hover:border-emerald-700'
                    : 'border-slate-200 bg-slate-50/70 hover:border-emerald-300'
                }`}
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
                  <span className="text-[11px] text-slate-400 block truncate">
                    {prod.supplierCity} • {prod.supplierName}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="font-bold text-sm truncate hover:text-emerald-600 cursor-pointer"
                  >
                    {prod.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display font-black text-sm text-emerald-700 dark:text-emerald-400">
                      {prod.price.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      {t.currency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={buildWhatsAppLink(prod.whatsappNumber, prod.name, prod.price, prod.supplierName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                    title={t.orderOnWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>

                  <button
                    onClick={() => onToggleFavorite(prod.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="حذف من المحفوظات"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center flex flex-col items-center gap-2">
              <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700" />
              <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
                {t.noFavorites}
              </h3>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-end ${
            isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
