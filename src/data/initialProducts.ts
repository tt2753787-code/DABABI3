import { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    label: 'الكل',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-800 dark:text-slate-200',
    borderClass: 'border-slate-300 dark:border-slate-700',
    activeBg: 'bg-gradient-to-r from-slate-900 to-slate-800 text-white',
  },
  {
    id: 'electronics',
    label: 'أجهزة وإلكترونيات',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    borderClass: 'border-indigo-200 dark:border-indigo-800',
    activeBg: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white',
  },
  {
    id: 'fashion',
    label: 'ملابس وأزياء',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    borderClass: 'border-rose-200 dark:border-rose-800',
    activeBg: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white',
  },
  {
    id: 'food',
    label: 'مواد غذائية',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800',
    activeBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  },
  {
    id: 'wholesale',
    label: 'سلع بالجملة',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-200 dark:border-purple-800',
    activeBg: 'bg-gradient-to-r from-purple-600 to-violet-700 text-white',
  },
  {
    id: 'crafts',
    label: 'صناعة تقليدية وجلد',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/60',
    badgeText: 'text-orange-800 dark:text-orange-300',
    borderClass: 'border-orange-200 dark:border-orange-800',
    activeBg: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white',
  },
  {
    id: 'decor',
    label: 'زرابي وديكور',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
    badgeText: 'text-teal-800 dark:text-teal-300',
    borderClass: 'border-teal-200 dark:border-teal-800',
    activeBg: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white',
  },
];

export const MOROCCAN_CITIES = [
  'الكل',
  'الدار البيضاء',
  'الرباط',
  'مراكش',
  'فاس',
  'طنجة',
  'أكادير',
  'قلعة السراغنة',
  'مكناس',
  'وجدة',
  'تطوان',
  'خنيفرة',
  'آسفي',
  'الصويرة',
];

// Completely clean: 0 initial products (user and suppliers will add their real products)
export const INITIAL_PRODUCTS: Product[] = [];

// Support WhatsApp link without displaying raw phone digits on the screen
export const SUPPORT_WHATSAPP_LINK = 'https://wa.me/212632336160?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%AF%D8%B9%D9%85%20%D9%85%D9%86%D8%B5%D8%A9%20DABABI3';
