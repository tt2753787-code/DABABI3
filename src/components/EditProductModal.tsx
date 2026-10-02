import React, { useState, useEffect } from 'react';
import { Product, CategoryId } from '../types';
import { CATEGORIES, PRESET_IMAGES } from '../data/initialProducts';
import { X, Check, Save, Image as ImageIcon, Upload, Link as LinkIcon } from 'lucide-react';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Product) => void;
  isDarkMode?: boolean;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  isDarkMode = false,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<CategoryId>('crafts');
  const [categoryLabel, setCategoryLabel] = useState('صناعة تقليدية وجلد');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setCategoryLabel(product.categoryLabel);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Product = {
      ...product,
      name: name.trim() || product.name,
      price: parseFloat(price) || product.price,
      category,
      categoryLabel,
      description: description.trim(),
      imageUrl: imageUrl || product.imageUrl,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-fluid" dir="rtl">
      <div className="fixed inset-0" onClick={onClose} />

      <div className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col border ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'
        }`}>
          <div>
            <h2 className="font-bold text-base">تعديل بيانات السلعة</h2>
            <span className="text-[11px] text-slate-500">تحديث فوري في المتجر العام</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">اسم السلعة *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-11 px-3.5 rounded-xl border text-xs outline-none focus:border-emerald-600 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold">الثمن بالدرهم *</label>
              <input
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`h-11 px-3.5 rounded-xl border text-xs font-display font-bold outline-none focus:border-emerald-600 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold">الفئة</label>
              <select
                value={category}
                onChange={(e) => {
                  const catId = e.target.value as CategoryId;
                  setCategory(catId);
                  const found = CATEGORIES.find((c) => c.id === catId);
                  if (found) setCategoryLabel(found.label);
                }}
                className={`h-11 px-3 rounded-xl border text-xs font-bold outline-none focus:border-emerald-600 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
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

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">الوصف</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`p-3 rounded-xl border text-xs outline-none focus:border-emerald-600 resize-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Photo */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold">صورة السلعة</label>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <LinkIcon className="w-3 h-3" />
                <span>{showUrlInput ? 'إلغاء' : 'رابط مباشر'}</span>
              </button>
            </div>

            {showUrlInput && (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className={`h-10 px-3 rounded-xl border text-xs font-mono ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                dir="ltr"
              />
            )}

            <div className="flex items-center gap-3">
              <img
                src={imageUrl}
                alt="معاينة"
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <label className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center gap-2 cursor-pointer text-xs font-bold">
                <Upload className="w-4 h-4" />
                <span>تغيير الصورة من الجهاز</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات فوراً</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
