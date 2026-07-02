import React from 'react';
import Card from '../common/Card';

export default function PortDistribution({ metrics }) {
  return (
    <Card>
      <h3 className="text-slate-500 text-xs font-semibold mb-4 tracking-wider uppercase">Threat Metrics</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Open Ports</span>
            <span className="font-mono font-bold text-amber-600">{metrics?.openPorts || 0}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${Math.min((metrics?.openPorts || 0) * 10, 100)}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Critical Focus Vectors</span>
            <span className="font-mono font-bold text-orange-600">{metrics?.criticalServices || 0}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${Math.min((metrics?.criticalServices || 0) * 20, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
