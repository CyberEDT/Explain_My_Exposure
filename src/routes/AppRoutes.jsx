import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Lazy loaded page components for Code Splitting (Improves LCP and Performance)
const LandingPage = lazy(() => import('../pages/LandingPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const ExposureChainPage = lazy(() => import('../pages/ExposureChainPage'));
const EnginePage = lazy(() => import('../pages/EnginePage'));
const MitrePage = lazy(() => import('../pages/MitrePage'));
const ReportPage = lazy(() => import('../pages/ReportPage'));
const RulesPage = lazy(() => import('../pages/RulesPage'));
const KnowledgeBasePage = lazy(() => import('../pages/KnowledgeBasePage'));
const ChangelogPage = lazy(() => import('../pages/ChangelogPage'));
const RoadmapPage = lazy(() => import('../pages/RoadmapPage'));
const StatusPage = lazy(() => import('../pages/StatusPage'));
const CILPage = lazy(() => import('../pages/CILPage'));

// A simple fallback component while chunk is loading
const PageLoader = () => (
  <div className="min-h-[80vh] flex items-center justify-center bg-[#030303]">
    <div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
      <span className="h-1.5 w-1.5 bg-gold animate-pulse-dot rounded-full"></span>
      LOADING_MODULE...
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
      {/* Root Landing Page */}
      <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
      
      {/* Single-Page Console Dashboard */}
      <Route path="/scanner" element={<MainLayout><DashboardPage /></MainLayout>} />
      
      {/* Privacy Policy */}
      <Route path="/privacy" element={<MainLayout><PrivacyPage /></MainLayout>} />
      
      {/* Exposure Model / Framework */}
      <Route path="/exposure-model" element={<MainLayout><ExposureChainPage /></MainLayout>} />
      
      {/* Intelligence Engine Docs */}
      <Route path="/engine" element={<MainLayout><EnginePage /></MainLayout>} />
      
      {/* MITRE Grid Docs */}
      <Route path="/mitre" element={<MainLayout><MitrePage /></MainLayout>} />
      
      {/* Report Showcase Docs */}
      <Route path="/report" element={<MainLayout><ReportPage /></MainLayout>} />
      
      {/* Host Rules Docs */}
      <Route path="/rules" element={<MainLayout><RulesPage /></MainLayout>} />
      
      {/* Knowledge Base Docs */}
      <Route path="/kb" element={<MainLayout><KnowledgeBasePage /></MainLayout>} />
      
      {/* Changelog Docs */}
      <Route path="/changelog" element={<MainLayout><ChangelogPage /></MainLayout>} />
      
      {/* Roadmap Docs */}
      <Route path="/roadmap" element={<MainLayout><RoadmapPage /></MainLayout>} />
      
      {/* Status Page */}
      <Route path="/status" element={<MainLayout><StatusPage /></MainLayout>} />
      
      {/* CIL Ecosystem Page */}
      <Route path="/cil" element={<MainLayout><CILPage /></MainLayout>} />
      
      {/* Fallbacks / Legacy Route Redirects */}
      <Route path="/upload" element={<Navigate to="/scanner#upload" replace />} />
      <Route path="/paths" element={<Navigate to="/scanner#upload" replace />} />
      <Route path="/settings" element={<Navigate to="/scanner" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
  );
}
