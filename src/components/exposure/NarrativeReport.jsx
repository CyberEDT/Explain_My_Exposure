import React from 'react';
import Card from '../common/Card';

export default function NarrativeReport({ narrative }) {
  return (
    <Card>
      <h3 className="text-slate-500 text-xs font-semibold mb-4 tracking-wider uppercase">Attacker Perspective Intel</h3>
      <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded text-slate-700 leading-relaxed font-sans text-sm">
        {narrative}
      </div>
    </Card>
  );
}
