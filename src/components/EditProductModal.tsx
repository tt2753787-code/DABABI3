import React, { useState, useEffect } from 'react';
import { Product, CategoryId, Language } from '../types';
import { CATEGORIES } from '../data/initialProducts';
import { getTranslation } from '../utils/translations';
import { X, Check, Save, Image as ImageIcon, Upload, Link as LinkIcon, Trash2 } from 'lucide-react';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Product) => void;
  isDarkMode?: boolean;
  language?: Language;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  isDarkMode = false,
  language = 'ar',
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<CategoryId>('crafts');
  const [categoryLabel, setCategoryLabel] = useState('صناعة تقليدية وجلد');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const t = getTranslation(language);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setCategoryLabel(product.categoryLabel);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
      setImages(product.images && product.images.length > 0 ? product.images : [product.imageUrl]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const dataUrl = event.target.result as string;
            setImages((prev) => [...prev, dataUrl]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (idxToRemove: number) => {
    setImages((prev) => {
      const filtered = prev.filter((_, i) => i !== idxToRemove);
      if (filtered.length > 0 && imageUrl === prev[idxToRemove]) {
        setImageUrl(filtered[0]);
      }
      return filtered;
    });
  };

  const handleAddDirectUrl = () => {
    if (inputUrl.trim()) {
      setImages((prev) => [...prev, inputUrl.trim()]);
      setInputUrl('');
      setShowUrlInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allImages = images.length > 0 ? images : [imageUrl];
    const mainImg = imageUrl || allImages[0];

    const updated: Product = {
      ...product,
      name: name.trim() || product.name,
      price: parseFloat(price) || product.price,
      category,
      categoryLabel,
      description: description.trim(),
      imageUrl: mainImg,
      images: allImages,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid"
      dir={language === 'fr' ? 'ltr' : 'rtl'}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col border ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <h2 className="font-bold text-base flex items-center gap-2">
            <span>{t.edit}</span>
            <span className="text-xs text-slate-400 font-normal">({product.name})</span>
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDarkMode
                ? 'hover:bg-slate-800 text-slate-400'
                : 'hover:bg-slate-200 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t.productName}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-11 px-3.5 rounded-xl border text-xs outline-none focus:border-emerald-600 transition-all ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.productPrice}
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`h-11 w-full pl-10 pr-3.5 rounded-xl border text-xs font-bold outline-none focus:border-emerald-600 transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <span className="absolute left-3 top-3 text-[10px] text-slate-400 font-bold">
                  {t.currency}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.productCategory}
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as CategoryId;
                  setCategory(val);
                  const found = CATEGORIES.find((c) => c.id === val);
                  if (found) setCategoryLabel(found.label);
                }}
                className={`h-11 px-3 rounded-xl border text-xs font-bold outline-none focus:border-emerald-600 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Multiple Photos Edit & Management */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.productImages}
              </label>
              <span className="text-[11px] text-slate-400">{images.length} صور</span>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 group"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {t.primaryPhoto}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 left-1 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-xs cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <label className="flex-1 py-2 px-3 rounded-xl border border-dashed border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{t.addMorePhotos}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultipleFiles}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {showUrlInput && (
              <div className="flex gap-2">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className={`flex-1 h-9 px-3 rounded-xl border text-xs outline-none ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddDirectUrl}
                  className="px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t.productDesc}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`p-3 rounded-xl border text-xs outline-none focus:border-emerald-600 transition-all resize-none ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
