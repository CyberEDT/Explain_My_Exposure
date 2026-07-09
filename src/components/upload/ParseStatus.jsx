import React from 'react';
import { useExposureStore } from '../../store/exposureStore';

export default function ParseStatus() {
  const { loading, error, scanResult } = useExposureStore();

  if (loading) return <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center text-sm font-mono text-slate-500 animate-pulse">PROCESSING ENGINES DEPLOYED...</div>;
  if (error) return <div className="p-4 bg-orange-50 border border-orange-200 rounded text-orange-800 text-sm font-mono">{error}</div>;
  if (scanResult) return <div className="p-4 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm font-mono">SCAN ANALYZED SUCCESSFULLY. REDIRECTING TO WORKSPACE.</div>;
  
  return null;
}
