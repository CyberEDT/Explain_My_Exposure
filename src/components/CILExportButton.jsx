import React, { useState } from 'react';
import { publishExposureIntelligence, CILNavigator } from '../services/cilPublisher';
import { Share2, ExternalLink, Shield, Eye, Target } from 'lucide-react';

/**
 * CILExportButton — EME Theme
 */
export default function CILExportButton({ scanResult }) {
  const [sessionId, setSessionId] = useState(null);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    const id = publishExposureIntelligence(scanResult);
    setSessionId(id);
    setPublished(true);
  };

  if (!scanResult) return null;

  return (
    <div className="border border-border bg-card p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold animate-pulse-dot" />
            <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase">CIL_SESSION</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-success/30 text-success bg-success/10">
              <Eye size={10} /> EME [OK]
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-border text-muted-foreground bg-black/40">
              <Target size={10} /> ETH [WAIT]
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-border text-muted-foreground bg-black/40">
              <Shield size={10} /> ETD [WAIT]
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!published ? (
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-gold text-black hover:bg-transparent hover:text-gold border border-gold transition-colors"
            >
              <Share2 size={14} /> PUBLISH_INTELLIGENCE
            </button>
          ) : (
            <>
              <button
                onClick={() => CILNavigator.openInETH(sessionId)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-danger/40 text-danger hover:bg-danger/10 transition-colors"
              >
                <Target size={12} /> ANALYZE_IN_ETH
              </button>
              <button
                onClick={() => CILNavigator.openInETD(sessionId)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors"
                style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Shield size={12} /> OPEN_IN_ETD
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-border text-muted-foreground">
                <Share2 size={12} /> {sessionId.slice(-8)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
