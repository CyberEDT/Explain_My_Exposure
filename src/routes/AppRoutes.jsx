import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import PrivacyPage from '../pages/PrivacyPage';
import ExposureChainPage from '../pages/ExposureChainPage';
import EnginePage from '../pages/EnginePage';
import MitrePage from '../pages/MitrePage';
import ReportPage from '../pages/ReportPage';
import RulesPage from '../pages/RulesPage';
import KnowledgeBasePage from '../pages/KnowledgeBasePage';
import ChangelogPage from '../pages/ChangelogPage';
import StatusPage from '../pages/StatusPage';

export default function AppRoutes() {
  return (
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
      
      {/* Status Page */}
      <Route path="/status" element={<MainLayout><StatusPage /></MainLayout>} />
      
      {/* Fallbacks / Legacy Route Redirects */}
      <Route path="/upload" element={<Navigate to="/scanner#upload" replace />} />
      <Route path="/paths" element={<Navigate to="/scanner#upload" replace />} />
      <Route path="/settings" element={<Navigate to="/scanner" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
