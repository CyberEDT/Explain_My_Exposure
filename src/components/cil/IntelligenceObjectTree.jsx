import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Braces, AlignLeft, ShieldAlert, FileText, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const intelligenceSchema = [
  {
    id: 'asset',
    key: 'Asset',
    type: 'Object',
    icon: Database,
    color: 'text-gold',
    children: [
      { key: 'hostname', type: 'String', value: 'internal-db-01' },
      { key: 'ip', type: 'String', value: '10.0.50.22' },
      { key: 'os', type: 'String', value: 'Linux (Ubuntu)' },
    ]
  },
  {
    id: 'exposure',
    key: 'Exposure',
    type: 'Array',
    icon: AlignLeft,
    color: 'text-success',
    children: [
      { key: 'port', type: 'Number', value: '3306' },
      { key: 'service', type: 'String', value: 'MySQL' },
      { key: 'severity', type: 'String', value: 'High' },
    ]
  },
  {
    id: 'threat',
    key: 'Threat',
    type: 'Array',
    icon: ShieldAlert,
    color: 'text-danger',
    children: [
      { key: 'cveId', type: 'String', value: 'CVE-2024-XXXX' },
      { key: 'attackVector', type: 'String', value: 'Network' },
      { key: 'mitreTechniques', type: 'Array', value: '[T1190, T1059]' },
    ]
  },
  {
    id: 'risk',
    key: 'Risk',
    type: 'Object',
    icon: Activity => <span className="font-mono font-bold text-warn text-[10px]">RISK</span>,
    color: 'text-warn',
    children: [
      { key: 'score', type: 'Number', value: '85' },
      { key: 'level', type: 'String', value: 'Critical' },
    ]
  },
  {
    id: 'recommendations',
    key: 'Recommendations',
    type: 'Array',
    icon: FileText,
    color: 'text-[#38bdf8]',
    children: [
      { key: 'action', type: 'String', value: 'Restrict Port 3306 to internal subnet' },
      { key: 'priority', type: 'String', value: 'Immediate' },
    ]
  },
  {
    id: 'metadata',
    key: 'Metadata',
    type: 'Object',
    icon: Braces,
    color: 'text-muted-foreground',
    children: [
      { key: 'publishedAt', type: 'String', value: '2026-10-14T08:33:00Z' },
      { key: 'source', type: 'String', value: 'EME' },
    ]
  }
];

const TreeNode = ({ node, level = 0 }) => {
  const [expanded, setExpanded] = useState(level === 0);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = node.icon || Braces;

  return (
    <div className="flex flex-col font-mono text-[11px]">
      <div 
        className={`flex items-center gap-2 py-1.5 px-2 hover:bg-white/5 cursor-pointer rounded-md ${level === 0 ? 'mt-2' : ''}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="w-4 flex justify-center text-muted-foreground">
          {hasChildren ? (
            expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
          )}
        </span>
        
        {level === 0 && <Icon size={14} className={node.color} />}
        
        <span className={`${level === 0 ? 'font-bold text-foreground tracking-widest uppercase' : 'text-[#a5b4fc]'}`}>
          {node.key}
        </span>
        
        <span className="text-muted-foreground opacity-50 ml-1">
          {node.type}
        </span>

        {node.value && (
          <>
            <span className="text-muted-foreground mx-1">=</span>
            <span className={`${node.type === 'Number' ? 'text-[#facc15]' : 'text-[#86efac]'}`}>
              {node.type === 'String' ? `"${node.value}"` : node.value}
            </span>
          </>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {node.children.map((child, i) => (
              <TreeNode key={i} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function IntelligenceObjectTree() {
  return (
    <div className="w-full bg-[#0a0a0a] border border-border rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-warn/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
        </div>
        <span className="ml-4 text-[10px] text-muted-foreground tracking-widest uppercase font-mono">
          CyberEDT_Intelligence_Object.json
        </span>
      </div>
      <div className="p-4 overflow-y-auto max-h-[400px]">
        {intelligenceSchema.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
