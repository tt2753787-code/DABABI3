import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg tracking-tight',
    md: 'text-2xl md:text-3xl tracking-tight',
    lg: 'text-3xl md:text-4xl tracking-tight',
    xl: 'text-4xl md:text-5xl tracking-tight',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <span
        className={`font-black font-display text-[#00422b] uppercase tracking-wider ${sizeClasses[size]}`}
        style={{ letterSpacing: '0.04em' }}
      >
        DABABI3
      </span>
      <span
        className={`inline-block rounded-full bg-gradient-to-r from-[#00a86b] to-[#10b981] shadow-[0_0_10px_rgba(0,168,107,0.5)] ${dotSizes[size]} translate-y-[-2px]`}
      />
    </div>
  );
};

