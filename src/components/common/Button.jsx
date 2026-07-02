import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseStyle = "px-4 py-2 rounded text-sm font-semibold transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/10",
    danger: "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/10",
    accent: "bg-slate-800 hover:bg-slate-700 text-white shadow-md",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
