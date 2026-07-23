import React, { useState } from 'react';
import { publishExposureIntelligence } from '../services/cil/publishExposure';
import { CILNavigator } from '../integrations/cil';
import { Share2, ExternalLink, Shield, Eye, Target, AlertCircle } from 'lucide-react';

/**
 * CILExportButton — EME Theme
 */
export default function CILExportButton({ scanResult }) {
  const [sessionId, setSessionId] = useState(null);
  const [published, setPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Read configurations
  const cilEnabled = import.meta.env?.VITE_CIL_ENABLED !== 'false';
  const ethUrl = import.meta.env?.VITE_ETH_URL;
  const etdUrl = import.meta.env?.VITE_ETD_URL;

  if (!cilEnabled || !scanResult) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    const id = await publishExposureIntelligence(scanResult);
    if (id) {
      setSessionId(id);
      setPublished(true);
    }
    setIsPublishing(false);
  };

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
              disabled={isPublishing}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors ${
                isPublishing 
                  ? 'bg-transparent text-muted-foreground border-border cursor-not-allowed'
                  : 'bg-gold text-black hover:bg-transparent hover:text-gold border-gold'
              }`}
            >
              <Share2 size={14} /> {isPublishing ? 'PUBLISHING...' : 'PUBLISH_INTELLIGENCE'}
            </button>
          ) : (
            <>
              {ethUrl ? (
                <button
                  onClick={() => CILNavigator.openInETH(sessionId)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-danger/40 text-danger hover:bg-danger/10 transition-colors"
                >
                  <Target size={12} /> ANALYZE_IN_ETH
                </button>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-border text-muted-foreground bg-black/40" title="ETH Integration Unavailable">
                  <AlertCircle size={12} /> ETH_UNAVAILABLE
                </span>
              )}

              {etdUrl ? (
                <button
                  onClick={() => CILNavigator.openInETD(sessionId)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors"
                  style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Shield size={12} /> OPEN_IN_ETD
                </button>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-border text-muted-foreground bg-black/40" title="ETD Integration Unavailable">
                  <AlertCircle size={12} /> ETD_UNAVAILABLE
                </span>
              )}

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
