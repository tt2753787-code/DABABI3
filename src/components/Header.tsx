import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Logo } from './Logo';
import { UserSession } from './AuthScreen';
import { Bookmark, PlusCircle, Store, Info, Menu, X, LogOut, User, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  userSession: UserSession | null;
  onLogout: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenFavorites,
  userSession,
  onLogout,
  onOpenSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'browse-products',
      label: 'المنتجات والمعروضات',
      icon: <Store className="w-4 h-4 ml-1.5" />,
      color: 'hover:text-emerald-700',
    },
    {
      id: 'supplier-add-product',
      label: 'إضافة منتج',
      icon: <PlusCircle className="w-4 h-4 ml-1.5" />,
      color: 'hover:text-amber-700',
    },
    {
      id: 'about-dababi3',
      label: 'عن المنصة',
      icon: <Info className="w-4 h-4 ml-1.5" />,
      color: 'hover:text-indigo-700',
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm font-fluid">
      <div className="h-16 w-full max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand / Logo strictly DABABI3 with portal subtitle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('browse-products')}
            className="flex items-center group transition-transform hover:scale-[1.01] focus:outline-none"
          >
            <Logo size="md" />
          </button>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-300 text-emerald-950 whitespace-nowrap">
            بوابة الموردين والمشترين
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-sm'
                    : `text-slate-600 ${item.color} hover:bg-white`
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
          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            title="الإعدادات (اللغة، الحساب، الوضع المظلم)"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            title="المفضلة"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Supplier Quick Button */}
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>إضافة سلعة</span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 transition-all border border-slate-200 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                <User className="w-3.5 h-3.5" />
              </div>
              {userSession && (
                <div className="hidden lg:flex flex-col text-right leading-tight">
                  <span className="text-[11px] font-bold text-slate-800 truncate max-w-[100px]">
                    {userSession.name}
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold">
                    {userSession.role === 'supplier' ? 'مورد' : 'زبون'}
                  </span>
                </div>
              )}
            </button>

            {profileOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-fadeIn text-xs">
                {userSession && (
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <p className="font-bold text-slate-800 truncate">{userSession.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono" dir="ltr">{userSession.phone}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                      {userSession.role === 'supplier' ? 'حساب مورد' : 'حساب مشتري'}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full text-right p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-between cursor-pointer"
                >
                  <span>إعدادات الحساب</span>
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full text-right p-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold flex items-center justify-between cursor-pointer"
                >
                  <span>تسجيل الخروج</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg flex flex-col gap-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.label}
                </span>
                {isActive && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">مفعل</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
