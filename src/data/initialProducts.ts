import { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    label: 'الكل',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    borderClass: 'border-slate-300',
    activeBg: 'bg-gradient-to-r from-slate-900 to-slate-800 text-white',
  },
  {
    id: 'electronics',
    label: 'أجهزة وإلكترونيات',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    borderClass: 'border-indigo-200',
    activeBg: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white',
  },
  {
    id: 'fashion',
    label: 'ملابس وأزياء',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    borderClass: 'border-rose-200',
    activeBg: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white',
  },
  {
    id: 'food',
    label: 'مواد غذائية',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    borderClass: 'border-amber-200',
    activeBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  },
  {
    id: 'wholesale',
    label: 'سلع بالجملة',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    borderClass: 'border-purple-200',
    activeBg: 'bg-gradient-to-r from-purple-600 to-violet-700 text-white',
  },
  {
    id: 'crafts',
    label: 'صناعة تقليدية وجلد',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-800',
    borderClass: 'border-orange-200',
    activeBg: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white',
  },
  {
    id: 'decor',
    label: 'زرابي وديكور',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-800',
    borderClass: 'border-teal-200',
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

// Completely wiped demo products as requested by user
export const INITIAL_PRODUCTS: Product[] = [];

// Support WhatsApp link without displaying raw phone digits
export const SUPPORT_WHATSAPP_LINK = 'https://wa.me/212632336160?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%AF%D8%B9%D9%85%20%D9%85%D9%86%D8%B5%D8%A9%20DABABI3';

export const PRESET_IMAGES = [
  {
    label: 'جلد تقليدي',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMyOymILKVCZrCRteazYCpS7gU92di06hadzboigfHeNL_67WCNYmRhi8Xc9wXDGrkNuhfEm5bwp1PS13MPFfme0RMGkn8zco8lgViaP1wSqyNlL4-ZZw55fL8ll3DqylPUQsVOPyOIOM7anEV7s9lW5mo9ngFM3SHAmyGnNpltLRtg9_UN4XmmmVd1XvZSTn8R4uyzPB9FyFR_3fSwYhB6G9p2rDJivV_EtCPOBhriniCOKbYfKbt',
  },
  {
    label: 'سماعات إلكترونية',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUSZQz3nCUvkSCFuEzT6wV020mIADZzqZ0pum9kJ0bI0Q-WPR2OEba1dAngq0YQWh-0gOyk0Gda-YXUMhlX-VO1eSMs3jym6pYiNIgr5oSTXvdma7ZgIQVqbfV-c5o8QspZvrqpXb1dMSrbLwnnoxqSRVRFrT74Dbg0Izt1ttD_J8x68VjvxujcluT34stMfhLyDpwkXKjPQUtyV_ZuSomi1Q8GqIzcB53rO0aS4t65ggCWIrCBoVO',
  },
  {
    label: 'زيت طبيعي',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIbH70tNkkLHA8rqrI15ZAv3NNMbnVDPgR2jps4c8PNqiqmun9m0eHgUzb2PYifgZ1nyrxc2cTIhhg3cz-kw-cnl_2jO8dUJWO_qC-jBut5KZTrF9xpPf7K_DTuMOquxtM7CJJ5cXLVMQPAVMZKrz87Sn7B-XFeG3BNIFddOs0SWfz_xA4GC0C7v2ETpDTXchmmTEi6KWjRDi3NiMd1AnWyBWr8H6sednhus7EuXr2XQ6dRhU6Moyj',
  },
  {
    label: 'شاي وجملة',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2j-mN0F8xJVis5LSQTDJMFvEuCqXzRnUGoXoQxkw7WeFeYuQ7-ebz6Rz8plEpthwivKE54i-mJT_A2krQZy8fhEaDm631l9khiWclhR42D45c-DmSULKOfUx4QRbbF-FFVmJDW3uMs2rDJeIoiTtgSCHlVWwBj9n9HfANOfhxf4OJxduJtPxhr8MwRo41gGlXd-gvm6zWvWOTFhXWIfpbOrc1aBElor55HcN1kyIccckhIUt_XQQw',
  },
];
