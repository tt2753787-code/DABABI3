/**
 * DABABI3 - دبابيع
 * منصة التوريد المباشر بالمغرب
 */

import React, { useState, useEffect } from 'react';
import { Product, ViewMode } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowseView } from './components/BrowseView';
import { SupplierAddView } from './components/SupplierAddView';
import { AboutView } from './components/AboutView';
import { ProductModal } from './components/ProductModal';
import { FavoritesModal } from './components/FavoritesModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('browse-products');

  // Load products with fallback to initial catalog
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dababi3_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Load favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dababi3_favorites');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return ['prod-1', 'prod-3'];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Persist products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dababi3_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Persist favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dababi3_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Scroll to top on view change
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f7] text-[#1a1c1b] font-arabic antialiased" dir="rtl">
      {/* Top Fixed Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 pt-16">
        {currentView === 'browse-products' && (
          <BrowseView
            products={products}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView === 'supplier-add-product' && (
          <SupplierAddView
            onAddProduct={handleAddProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about-dababi3' && (
          <AboutView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Favorites Drawer/Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        products={products}
        onToggleFavorite={handleToggleFavorite}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
