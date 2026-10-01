import React from 'react';
import { ViewMode } from '../types';
import { Logo } from './Logo';
import { Bookmark, PlusCircle, Store, Info, Menu, X, User } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
      id: 'browse-products',
      label: 'المنتجات والمعروضات',
      icon: <Store className="w-4 h-4 ml-1.5" />,
    },
    {
      id: 'supplier-add-product',
      label: 'إضافة منتج كمورد',
      icon: <PlusCircle className="w-4 h-4 ml-1.5" />,
    },
    {
      id: 'about-dababi3',
      label: 'عن المنصة',
      icon: <Info className="w-4 h-4 ml-1.5" />,
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9f7]/95 backdrop-blur-md border-b border-[#e2e3e0]/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 w-full max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('browse-products')}
          className="flex items-center gap-2 group transition-transform hover:scale-[1.01] focus:outline-none"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 bg-[#eeeeec]/70 p-1 rounded-xl border border-[#e2e3e0]/60">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all duration-200 flex items-center cursor-pointer ${
                  isActive
                    ? 'bg-[#00422b] text-white shadow-sm'
                    : 'text-[#404943] hover:text-[#1a1c1b] hover:bg-white/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl text-[#404943] hover:text-[#00422b] hover:bg-[#eeeeec] transition-colors"
            title="المنتجات المحفوظة"
          >
            <Bookmark className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00a86b] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Supplier Quick Badge / Button */}
          <button
            onClick={() => onNavigate('supplier-add-product')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#98f2c0]/40 text-[#005234] hover:bg-[#98f2c0]/70 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a86b] animate-ping" />
            <span>بوابة المورد</span>
          </button>

          {/* Profile / Avatar indicator as in mockup */}
          <div
            className="w-9 h-9 rounded-full bg-[#00422b] text-white flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            title="حساب التاجر / الزبون"
          >
            <User className="w-4 h-4" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1a1c1b] hover:bg-[#eeeeec] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e2e3e0] bg-[#f9f9f7] px-4 py-3 shadow-lg flex flex-col gap-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#00422b] text-white'
                    : 'text-[#404943] hover:bg-[#eeeeec]'
                }`}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.label}
                </span>
                {isActive && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">مفعل</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
