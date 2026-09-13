import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { StudentDashboard } from './components/StudentDashboard';
import { SkillAssessmentView } from './components/SkillAssessmentView';
import { SkillGapView } from './components/SkillGapView';
import { AIMappingView } from './components/AIMappingView';
import { PersonalizedLearningView } from './components/PersonalizedLearningView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { DigitalPortfolioView } from './components/DigitalPortfolioView';
import { IndustryDashboard } from './components/IndustryDashboard';
import { AcademicianPortalView } from './components/AcademicianPortalView';
import { MentorshipCollabView } from './components/MentorshipCollabView';
import { InstitutionAnalyticsView } from './components/InstitutionAnalyticsView';
import { TrackingView } from './components/TrackingView';
import { Shield, Sparkles, Building, School, Award, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, role } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        if (role === 'student') return <StudentDashboard />;
        if (role === 'industry') return <IndustryDashboard />;
        if (role === 'academician') return <AcademicianPortalView />;
        return <InstitutionAnalyticsView />;
      case 'skill-assessment':
        return <SkillAssessmentView />;
      case 'skill-gap':
        return <SkillGapView />;
      case 'ai-mapping':
        return <AIMappingView />;
      case 'learning':
        return <PersonalizedLearningView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'portfolio':
        return <DigitalPortfolioView />;
      case 'collaboration':
        return <MentorshipCollabView />;
      case 'institution-analytics':
        return <InstitutionAnalyticsView />;
      case 'tracking':
        return <TrackingView />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <main className="flex-1 min-w-0">
      {renderActiveView()}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Core Layout Container */}
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6 items-start">
            {/* Sidebar */}
            <Sidebar />

            {/* Dynamic Viewport */}
            <MainContent />
          </div>
        </div>

        {/* Futuristic Minimal White Footer */}
        <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-display font-bold text-slate-900">
                NexusSkill Platform
              </span>
              <span>• Unified Academia-Industry Intelligence Architecture</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> Blockchain Attestation Ledger Active
              </span>
              <span>•</span>
              <span>IEEE & ISO/IEC 17024 Compliant</span>
              <span>•</span>
              <span>v3.8 Production</span>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
