import React from 'react';

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-mono text-slate-500 animate-pulse">COMPUTING PATHS...</span>
    </div>
  );
}
