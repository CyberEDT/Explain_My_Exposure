import React from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#1a1a1a', // Black
  '#991b1b', // Red
  '#3f3f46', // Grey
  '#b45309', // Gold
  '#065f46'  // Green
];

const CustomizedContent = (props) => {
  const { depth, x, y, width, height, name, index } = props;
  const boxColor = COLORS[index % COLORS.length];

  return (
    <g>
      <rect 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        style={{ 
          fill: depth < 2 ? boxColor : 'url(#treemapGrad)', 
          stroke: '#030303', 
          strokeWidth: 2, 
          strokeOpacity: 1, 
          transition: 'fill 0.3s ease' 
        }} 
      />
      {width > 30 && height > 20 && (
        <text 
          x={x + 8} 
          y={y + 20} 
          fill="#ffffff" 
          stroke="none"
          fontSize={12} 
          fontWeight="bold" 
          style={{ pointerEvents: 'none' }}
        >
          {name}
        </text>
      )}
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border border-border bg-card p-3 shadow-xl max-w-[250px]">
        <p className="text-xs font-bold text-foreground mb-1">{data.name} ({data.id})</p>
        <p className="text-[11px] text-gold mb-2">Exposed Surfaces: {data.size}</p>
        <p className="text-[10px] text-muted-foreground leading-relaxed">{data.desc}</p>
      </div>
    );
  }
  return null;
};

export default function MitreTacticsTreemap({ mitre }) {
  if (!mitre || mitre.length === 0) {
    return <div className="flex h-64 items-center justify-center text-xs text-muted-foreground border border-border bg-background">No MITRE tactics mapped.</div>;
  }

  const tacticCounts = {};
  mitre.forEach(m => {
    if (!tacticCounts[m.techniqueName]) {
      tacticCounts[m.techniqueName] = {
        name: m.techniqueName,
        id: m.techniqueId,
        desc: m.description,
        count: 0
      };
    }
    tacticCounts[m.techniqueName].count++;
  });

  const data = Object.values(tacticCounts).map(t => ({
    name: t.name,
    size: t.count,
    id: t.id,
    desc: t.desc
  }));

  return (
    <div className="h-72 w-full border border-border bg-background p-1">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="#030303"
          fill="#f59e0b"
          content={<CustomizedContent />}
        >
          <defs>
            <linearGradient id="treemapGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
