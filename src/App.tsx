/**
 * DABABI3
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Product, ViewMode } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import {
  fetchProductsApi,
  saveProductApi,
  updateProductApi,
  deleteProductApi,
  saveSupplierApi,
} from './utils/api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowseView } from './components/BrowseView';
import { SupplierAddView } from './components/SupplierAddView';
import { AboutView } from './components/AboutView';
import { ProductModal } from './components/ProductModal';
import { FavoritesModal } from './components/FavoritesModal';
import { AuthScreen, UserSession } from './components/AuthScreen';
import { SettingsModal } from './components/SettingsModal';
import { EditProductModal } from './components/EditProductModal';

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

  // Load products from shared server storage with fallback to initial catalog
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

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings State: Dark Mode & Language
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dababi3_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [language, setLanguage] = useState<string>(() => {
    try {
      return localStorage.getItem('dababi3_lang') || 'ar';
    } catch {
      return 'ar';
    }
  });

  // Dark mode effect on HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('dababi3_dark_mode', isDarkMode ? 'true' : 'false');
    } catch {}
  }, [isDarkMode]);

  // Language persistence
  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang);
    try {
      localStorage.setItem('dababi3_lang', lang);
    } catch {}
  };

  // Sync shared products from server
  const syncProductsFromServer = useCallback(async () => {
    const list = await fetchProductsApi();
    if (list && list.length > 0) {
      setProducts(list);
    }
  }, []);

  // Fetch on mount and periodically so any product added by any user on the link appears immediately
  useEffect(() => {
    syncProductsFromServer();
    const interval = setInterval(syncProductsFromServer, 10000);
    return () => clearInterval(interval);
  }, [syncProductsFromServer]);

  // Persist session
  const handleLogin = (session: UserSession) => {
    setUserSession(session);
    try {
      localStorage.setItem('dababi3_session', JSON.stringify(session));
      localStorage.setItem('dababi3_supplier_profile', JSON.stringify(session));
    } catch {
      // ignore
    }

    if (session.role === 'supplier') {
      saveSupplierApi(session.storeName || session.name, session.city, session.phone);
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

  const handleUpdateSession = (updated: UserSession) => {
    setUserSession(updated);
    try {
      localStorage.setItem('dababi3_session', JSON.stringify(updated));
      localStorage.setItem('dababi3_supplier_profile', JSON.stringify(updated));
    } catch {}
    saveSupplierApi(updated.storeName || updated.name, updated.city, updated.phone);
  };

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

  // Add product and save to shared backend server storage so it appears for all visitors on the link
  const handleAddProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev.filter((p) => p.id !== newProduct.id)]);
    await saveProductApi(newProduct);
  };

  // Edit product
  const handleSaveEditedProduct = async (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    await updateProductApi(updated);
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    await deleteProductApi(productId);
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
    <div
      className={`min-h-screen flex flex-col font-fluid antialiased transition-colors ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f9f9f7] text-slate-900'
      }`}
      dir="rtl"
    >
      {/* Top Header strictly DABABI3 */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        userSession={userSession}
        onLogout={handleLogout}
        onOpenSettings={() => setIsSettingsOpen(true)}
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
            userSession={userSession}
            onEditProduct={(p) => setEditingProduct(p)}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {currentView === 'supplier-add-product' && (
          <SupplierAddView
            onAddProduct={handleAddProduct}
            onNavigate={handleNavigate}
            userSession={userSession}
            onUpdateSession={handleUpdateSession}
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

      {/* Edit Product Modal (accessed from 3-dots menu on product) */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEditedProduct}
        isDarkMode={isDarkMode}
      />

      {/* Settings Modal (Language, Account Info, Dark/Light Mode) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userSession={userSession}
        onUpdateSession={handleUpdateSession}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={setIsDarkMode}
        language={language}
        onSelectLanguage={handleSelectLanguage}
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
