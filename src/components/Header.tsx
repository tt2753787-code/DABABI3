import React, { useState } from 'react';
import { ViewMode, Language } from '../types';
import { Logo } from './Logo';
import { UserSession } from './AuthScreen';
import { getTranslation } from '../utils/translations';
import {
  Bookmark,
  Store,
  Info,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  FileText,
  PlusCircle,
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  userSession: UserSession | null;
  onLogout: () => void;
  onOpenSettings: () => void;
  onOpenPages: () => void;
  language?: Language;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenFavorites,
  userSession,
  onLogout,
  onOpenSettings,
  onOpenPages,
  language = 'ar',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const t = getTranslation(language);

  const navItems = [
    {
      id: 'browse-products' as ViewMode,
      label: t.browseProducts,
      icon: <Store className="w-4 h-4 ml-1.5" />,
      action: () => onNavigate('browse-products'),
    },
    {
      id: 'pages' as ViewMode,
      label: t.pages,
      icon: <FileText className="w-4 h-4 ml-1.5 text-indigo-600" />,
      action: onOpenPages,
    },
    {
      id: 'about-dababi3' as ViewMode,
      label: t.aboutUs,
      icon: <Info className="w-4 h-4 ml-1.5" />,
      action: () => onNavigate('about-dababi3'),
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm font-fluid transition-colors">
      <div className="h-16 w-full max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand strictly DABABI3 with portal subtitle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('browse-products')}
            className="flex items-center group transition-transform hover:scale-[1.01] focus:outline-none cursor-pointer"
          >
            <Logo size="md" />
          </button>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-300 text-emerald-950 dark:text-emerald-300 whitespace-nowrap">
            {t.portalSubtitle}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & User Session */}
        <div className="flex items-center gap-2">
          {/* Button "أضف منتج جديد" in place of duplicate Pages button */}
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.addProduct}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="المفضلة"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                <User className="w-3.5 h-3.5" />
              </div>
              {userSession && (
                <div className="hidden lg:flex flex-col text-right leading-tight">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                    {userSession.name}
                  </span>
                  <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    {userSession.role === 'supplier' ? 'مورد' : 'زبون'}
                  </span>
                </div>
              )}
            </button>

            {profileOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-50 animate-fadeIn text-xs">
                {userSession && (
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{userSession.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono" dir="ltr">{userSession.phone}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                      {userSession.role === 'supplier' ? 'حساب مورد' : 'حساب مشتري'}
                    </span>
                  </div>
                )}
                {userSession?.role === 'supplier' && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate('supplier-add-product');
                    }}
                    className="w-full text-right p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.addProduct}</span>
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenPages();
                  }}
                  className="w-full text-right p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-between cursor-pointer"
                >
                  <span>{t.pages}</span>
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full text-right p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-between cursor-pointer"
                >
                  <span>{t.settings}</span>
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full text-right p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/60 text-rose-600 font-bold flex items-center justify-between cursor-pointer"
                >
                  <span>{t.logout}</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-lg flex flex-col gap-1.5 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.action();
                setMobileMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <span className="flex items-center">
                {item.icon}
                {item.label}
              </span>
            </button>
          ))}
          {userSession?.role === 'supplier' && (
            <button
              onClick={() => {
                onNavigate('supplier-add-product');
                setMobileMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-colors bg-emerald-50 text-emerald-800 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                {t.addProduct}
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
