import React from 'react';
import Card from '../common/Card';
import { useExposureStore } from '../../store/exposureStore';

export default function MitreMappingTable() {
  const { scanResult } = useExposureStore();
  const mappings = scanResult?.mitre || [];

  if (mappings.length === 0) {
    return (
      <Card>
        <p className="text-slate-500 text-sm font-mono text-center py-8">
          No active service nodes discovered to map to the MITRE ATT&CK framework.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0 border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4 border-r border-slate-200">Identified Node</th>
              <th className="p-4 border-r border-slate-200">MITRE Tactic</th>
              <th className="p-4 border-r border-slate-200">MITRE Technique</th>
              <th className="p-4">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
            {mappings.map((mapping, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-amber-700 border-r border-slate-100">{mapping.node}</td>
                <td className="p-4 text-slate-900 font-medium border-r border-slate-100">{mapping.techniqueName}</td>
                <td className="p-4 text-orange-600 font-bold border-r border-slate-100">{mapping.techniqueId}</td>
                <td className="p-4 text-slate-500">{mapping.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
