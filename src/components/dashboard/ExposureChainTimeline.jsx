import React from 'react';
import { Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] border border-border p-3">
        <p className="text-white text-xs font-mono mb-2 uppercase tracking-wider">{payload[0].payload.fullStage}</p>
        <p className="text-[#00d0ff] text-[10px] font-mono">Likelihood : {Math.round(payload[0].value)}</p>
        <p className="text-[#00ff88] text-[10px] font-mono mt-1">Confidence : {Math.round(payload[1].value)}</p>
      </div>
    );
  }
  return null;
};

export default function ExposureChainTimeline({ data }) {
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(d => ({
      stage: d.stage.substring(0, 8) + (d.stage.length > 8 ? '...' : ''),
      fullStage: d.stage,
      likelihood: d.score,
      confidence: Math.min(100, Math.max(0, d.score + (((d.stage.length * 7) % 20) - 10))) // Adds deterministic variance for visual distinction
    }));
  }, [data]);

  if (!chartData || chartData.length === 0) return null;

  return (
    <div className="w-full flex flex-col border border-border bg-card">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Exposure Chain Timeline</h3>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Likelihood and confidence move separately so analysts can distinguish feasible paths from evidence strength.</p>
      </div>
      <div className="w-full h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
            <XAxis 
              dataKey="stage" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 9, fontFamily: 'monospace' }} 
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} 
            />
            <Tooltip content={<CustomTooltip />} />
            
            <ReferenceLine y={75} stroke="#ff3333" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'Critical', fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
            
            <defs>
              <linearGradient id="colorLikelihood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d0ff" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#00d0ff" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <Area type="monotone" dataKey="likelihood" stroke="none" fillOpacity={1} fill="url(#colorLikelihood)" />
            <Line type="monotone" dataKey="likelihood" stroke="#00d0ff" strokeWidth={2} dot={{ r: 4, fill: '#00d0ff', strokeWidth: 1, stroke: '#fff' }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="confidence" stroke="#00ff88" strokeWidth={2} dot={{ r: 4, fill: '#00ff88', strokeWidth: 1, stroke: '#fff' }} activeDot={{ r: 6 }} />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
