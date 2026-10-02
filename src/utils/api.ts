import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

export async function fetchProductsApi(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // Filter out any leftover mock demo IDs
        const realProducts = data.filter((p) => !p.id.startsWith('prod-') || p.id.startsWith('prod-17') || p.id.startsWith('prod-18') || p.id.length > 10);
        localStorage.setItem('dababi3_products', JSON.stringify(realProducts));
        return realProducts;
      }
    }
  } catch (err) {
    console.warn('Backend fetch failed, using local storage fallback:', err);
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('dababi3_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter((p: any) => !p.id || !['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7'].includes(p.id));
        return cleaned;
      }
    }
  } catch {}

  return INITIAL_PRODUCTS;
}

export async function saveProductApi(product: Product): Promise<void> {
  // Always update local cache first
  try {
    const saved = localStorage.getItem('dababi3_products');
    const list = saved ? JSON.parse(saved) : [];
    localStorage.setItem('dababi3_products', JSON.stringify([product, ...list]));
  } catch {}

  // Post to backend so ALL users on the website link see it immediately!
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  } catch (err) {
    console.warn('Failed to post product to backend:', err);
  }
}

export async function updateProductApi(product: Product): Promise<void> {
  try {
    const saved = localStorage.getItem('dababi3_products');
    if (saved) {
      const list = JSON.parse(saved);
      const updated = list.map((p: Product) => (p.id === product.id ? product : p));
      localStorage.setItem('dababi3_products', JSON.stringify(updated));
    }
  } catch {}

  try {
    await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  } catch (err) {
    console.warn('Failed to update product on backend:', err);
  }
}

export async function deleteProductApi(productId: string): Promise<void> {
  try {
    const saved = localStorage.getItem('dababi3_products');
    if (saved) {
      const list = JSON.parse(saved);
      const filtered = list.filter((p: Product) => p.id !== productId);
      localStorage.setItem('dababi3_products', JSON.stringify(filtered));
    }
  } catch {}

  try {
    await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('Failed to delete product from backend:', err);
  }
}

export async function saveSupplierApi(storeName: string, city: string, phone: string): Promise<void> {
  // Save locally
  try {
    localStorage.setItem(
      'dababi3_supplier_profile',
      JSON.stringify({ storeName, city, phone })
    );
  } catch {}

  // Save to backend
  try {
    await fetch('/api/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storeName, city, phone }),
    });
  } catch (err) {
    console.warn('Failed to save supplier profile to backend:', err);
  }
}
