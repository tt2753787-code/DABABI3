/**
 * DABABI3
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
import { AuthScreen, UserSession } from './components/AuthScreen';

export default function App() {
  // Authentication session - Login page shown first before entering
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('dababi3_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

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

  // Persist session
  const handleLogin = (session: UserSession) => {
    setUserSession(session);
    try {
      localStorage.setItem('dababi3_session', JSON.stringify(session));
    } catch {
      // ignore
    }
    if (session.role === 'supplier') {
      setCurrentView('supplier-add-product');
    } else {
      setCurrentView('browse-products');
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    try {
      localStorage.removeItem('dababi3_session');
    } catch {
      // ignore
    }
  };

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

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. First condition: Show login page first before entering DABABI3
  if (!userSession) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // 2. Main site once logged in
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f7] text-slate-900 font-fluid antialiased" dir="rtl">
      {/* Top Header strictly DABABI3 */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        userSession={userSession}
        onLogout={handleLogout}
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

      {/* Persistent Footer strictly DABABI3 */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
