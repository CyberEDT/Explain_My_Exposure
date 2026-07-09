import { create } from 'zustand';

export const useExposureStore = create((set, get) => {
  let initialStoragePermission = 'prompt';
  if (typeof window !== 'undefined') {
    initialStoragePermission = localStorage.getItem('eme_storage_permission') || 'prompt';
  }

  let initialScanResult = null;
  if (initialStoragePermission === 'granted') {
    try {
      const saved = localStorage.getItem('eme_saved_scan');
      if (saved) initialScanResult = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved scan", e);
    }
  }

  return {
    storagePermission: initialStoragePermission,
    scanResult: initialScanResult,
    loading: false,
    error: null,

    handleSetStoragePermission: (status) => {
      set({ storagePermission: status });
      if (typeof window !== 'undefined') {
        localStorage.setItem('eme_storage_permission', status);
        if (status === 'denied') {
          localStorage.removeItem('eme_saved_scan');
        } else if (status === 'granted') {
          const currentScan = get().scanResult;
          if (currentScan) {
            try {
              localStorage.setItem('eme_saved_scan', JSON.stringify(currentScan));
            } catch (e) {
              console.error("Failed to save scan to local storage.", e);
            }
          }
        }
      }
    },

    triggerAnalysis: (fileContent, fileType, scanLevel = 'medium') => {
      set({ loading: true, error: null });

      // Use a Web Worker for heavy lifting
      const worker = new Worker(new URL('../workers/pipeline.worker.js', import.meta.url), { type: 'module' });

      worker.onmessage = (e) => {
        const { success, scanResult, error } = e.data;
        if (success) {
          set({ scanResult, loading: false });
          const { storagePermission } = get();
          if (storagePermission === 'granted') {
            try {
              localStorage.setItem('eme_saved_scan', JSON.stringify(scanResult));
            } catch (err) {
              console.error("Failed to save scan to local storage.", err);
            }
          }
        } else {
          set({ error, loading: false });
        }
        worker.terminate();
      };

      worker.onerror = (err) => {
        set({ error: 'Worker error occurred: ' + err.message, loading: false });
        worker.terminate();
      };

      worker.postMessage({ fileContent, fileType, scanLevel });
    },

    clearScan: () => {
      set({ scanResult: null, error: null });
      const { storagePermission } = get();
      if (storagePermission === 'granted') {
        localStorage.removeItem('eme_saved_scan');
      }
    }
  };
});
