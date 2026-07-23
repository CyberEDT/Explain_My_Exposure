// ============================================================
// CIL — Inlined for EME (no monorepo yet)
// Copy of packages/cil/src — to be replaced with npm package
// when monorepo is set up.
// ============================================================

const CIL_KEY_PREFIX = 'cyberedt:cil:';
const CIL_ACTIVE_KEY = 'cyberedt:cil:active';

export const CILStore = {
  create(data) {
    const sessionId = `cil-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const session = { ...data, sessionId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    try {
      localStorage.setItem(`${CIL_KEY_PREFIX}${sessionId}`, JSON.stringify(session));
      localStorage.setItem(CIL_ACTIVE_KEY, sessionId);
    } catch (e) { console.error('[CIL] Save failed:', e); }
    return sessionId;
  },
  get(sessionId) {
    try {
      const raw = localStorage.getItem(`${CIL_KEY_PREFIX}${sessionId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },
  getActive() {
    const id = localStorage.getItem(CIL_ACTIVE_KEY);
    return id ? this.get(id) : null;
  },
  patch(sessionId, updates) {
    const existing = this.get(sessionId);
    if (!existing) return;
    const merged = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    try { localStorage.setItem(`${CIL_KEY_PREFIX}${sessionId}`, JSON.stringify(merged)); }
    catch (e) { console.error('[CIL] Patch failed:', e); }
  },
  setActive(sessionId) { localStorage.setItem(CIL_ACTIVE_KEY, sessionId); },
  clearAll() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(CIL_KEY_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  },
};

let _channel = null;
try { if (typeof BroadcastChannel !== 'undefined') _channel = new BroadcastChannel('cyberedt-cil'); } catch { /* ignore if not supported */ }
export const CILBus = {
  emit(event) { _channel?.postMessage(event); },
  on(handler) {
    if (!_channel) return () => {};
    const fn = e => handler(e.data);
    _channel.addEventListener('message', fn);
    return () => _channel?.removeEventListener('message', fn);
  },
};

const TOOL_URLS = {
  eth: import.meta.env?.VITE_ETH_URL || 'https://explainthehacker.cyberedt.com',
  etd: import.meta.env?.VITE_ETD_URL || 'https://explainthedefender.cyberedt.com',
  eme: import.meta.env?.VITE_EME_URL || 'https://explainmyexposure.cyberedt.com',
};
export const CILNavigator = {
  openInETH: (sessionId) => window.open(`${TOOL_URLS.eth}/lab?cil=${sessionId}`, '_blank', 'noopener,noreferrer'),
  openInETD: (sessionId) => window.open(`${TOOL_URLS.etd}?cil=${sessionId}`, '_blank', 'noopener,noreferrer'),
  getSessionIdFromURL: () => new URLSearchParams(window.location.search).get('cil'),
};
