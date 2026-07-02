import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`p-6 rounded-lg bg-card border border-border text-foreground transition-all duration-300 hover:border-gold/30 ${className}`}>
      {children}
    </div>
  );
}

