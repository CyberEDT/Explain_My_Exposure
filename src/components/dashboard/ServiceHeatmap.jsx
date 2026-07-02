import React from 'react';
import Card from '../common/Card';

export default function ServiceHeatmap() {
  return (
    <Card>
      <h3 className="text-slate-500 text-xs font-semibold mb-2 tracking-wider uppercase">Attacker Focus Heatmap</h3>
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="px-3 py-1 bg-amber-50 border border-amber-300 text-amber-800 rounded text-xs font-mono font-medium">Port 445 (SMB) - CRITICAL</span>
        <span className="px-3 py-1 bg-orange-50 border border-orange-300 text-orange-800 rounded text-xs font-mono font-medium">Port 22 (SSH) - HIGH</span>
        <span className="px-3 py-1 bg-slate-100 border border-slate-300 text-slate-600 rounded text-xs font-mono font-medium">Port 80 (HTTP) - LOW</span>
      </div>
    </Card>
  );
}
