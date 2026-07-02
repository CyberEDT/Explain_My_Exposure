import React from 'react';
import Card from '../common/Card';
import { useExposure } from '../../contexts/ExposureContext';

export default function AttackPathVisualizer() {
  const { scanResult } = useExposure();
  const paths = scanResult?.paths || [];

  if (paths.length === 0) {
    return (
      <Card>
        <p className="text-slate-500 text-sm font-mono text-center py-8">
          No exposed service pathways identified in the active profile to map attack chains.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {paths.map((path, idx) => (
        <Card key={path.id || idx} className="hover:shadow-premium-hover transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-slate-800 text-sm font-bold font-mono">
              Scenario {idx + 1}: Pivot Vector via {path.node}
            </h4>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
              path.likelihood === 'Critical' ? 'bg-amber-50 text-amber-800 border-amber-300' :
              path.likelihood === 'High' ? 'bg-orange-50 text-orange-800 border-orange-200' :
              'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              {path.likelihood} Likelihood
            </span>
          </div>
          
          <div className="border border-slate-100 rounded bg-slate-50 p-6 overflow-x-auto">
            <div className="flex items-center gap-4 text-xs font-mono min-w-max">
              {path.steps.map((step, sIdx) => (
                <React.Fragment key={sIdx}>
                  {sIdx > 0 && (
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                  <div className={`p-3 rounded border font-medium ${
                    sIdx === 0 ? 'bg-slate-100 border-slate-300 text-slate-700' :
                    sIdx === path.steps.length - 1 ? 'bg-orange-50 border-orange-300 text-orange-800 shadow-sm' :
                    'bg-amber-50 border-amber-300 text-amber-800 shadow-sm'
                  }`}>
                    {step}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
