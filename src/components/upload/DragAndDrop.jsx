import React, { useRef } from 'react';
import { useExposureStore } from '../../store/exposureStore';
import { Upload } from 'lucide-react';

export default function DragAndDrop() {
  const fileInputRef = useRef();
  const { triggerAnalysis, loading } = useExposureStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const fileType = file.name.endsWith('.xml') ? 'xml' : 'text';
    const reader = new FileReader();
    reader.onload = (event) => {
      triggerAnalysis(event.target.result, fileType);
    };
    reader.readAsText(file);
  };

  return (
    <div className="border-2 border-dashed border-slate-300 bg-white rounded-lg p-12 text-center hover:border-amber-500/50 hover:bg-slate-50/50 transition-all duration-200 cursor-pointer"
         onClick={() => fileInputRef.current.click()}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xml,.txt,.log" />
      <div className="space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-slate-700 font-semibold">{loading ? 'Uploading & Analyzing...' : 'Click to select or drag and drop scan file'}</p>
        <p className="text-xs text-slate-400">Supports Nmap XML (.xml) and Text CLI log outputs (.txt, .log) up to 5MB</p>
      </div>
    </div>
  );
}
