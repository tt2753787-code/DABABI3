export type CategoryId = 'all' | 'electronics' | 'fashion' | 'food' | 'wholesale' | 'crafts' | 'decor';

export interface Category {
  id: CategoryId;
  label: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  supplierName: string;
  supplierCity: string;
  whatsappNumber: string;
  description: string;
  imageUrl: string;
  verified: boolean;
  featured?: boolean;
  createdAt: string;
  stockStatus?: 'available' | 'low' | 'made_to_order';
  unit?: string;
}

export type ViewMode = 'browse-products' | 'supplier-add-product' | 'about-dababi3';
