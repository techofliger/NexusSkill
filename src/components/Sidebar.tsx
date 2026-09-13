import React from 'react';
import { useApp } from '../context/AppContext';
import { NavView, UserRole } from '../types';
import {
  LayoutDashboard,
  Brain,
  BarChart3,
  Compass,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  LineChart,
  ClipboardList,
  Sparkles,
  ShieldCheck,
  Building2,
  BookOpenCheck,
  School,
  Flame,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, role, setRole, applications, opportunities } = useApp();

  const primaryNavItems: Array<{
    id: NavView;
    label: string;
    icon: any;
    badge?: string | number;
    color?: string;
  }> = [
    {
      id: 'overview',
      label: role === 'student' ? 'Student Dashboard' : role === 'industry' ? 'Industry Dashboard' : role === 'academician' ? 'Academician Portal' : 'Institution Dashboard',
      icon: LayoutDashboard,
      color: 'text-indigo-600',
    },
    {
      id: 'skill-assessment',
      label: 'Skill Assessment',
      icon: Brain,
      badge: 'Live',
      color: 'text-purple-600',
    },
    {
      id: 'skill-gap',
      label: 'Skill Gap Analysis',
      icon: BarChart3,
      color: 'text-blue-600',
    },
    {
      id: 'ai-mapping',
      label: 'AI Skill Mapping',
      icon: Compass,
      badge: 'Gemini AI',
      color: 'text-cyan-600',
    },
    {
      id: 'learning',
      label: 'Personalized Learning',
      icon: GraduationCap,
      color: 'text-emerald-600',
    },
    {
      id: 'opportunities',
      label: 'Internship & Jobs',
      icon: Briefcase,
      badge: `${opportunities.length}`,
      color: 'text-amber-600',
    },
    {
      id: 'portfolio',
      label: 'Digital Verified Portfolio',
      icon: Award,
      badge: 'Verified',
      color: 'text-emerald-600',
    },
    {
      id: 'collaboration',
      label: 'Mentorship & Collab',
      icon: Users,
      color: 'text-rose-600',
    },
    {
      id: 'institution-analytics',
      label: 'Institution Analytics',
      icon: LineChart,
      color: 'text-indigo-600',
    },
    {
      id: 'tracking',
      label: 'Application Tracking',
      icon: ClipboardList,
      badge: applications.length > 0 ? `${applications.length}` : undefined,
      color: 'text-violet-600',
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {/* Role Quick Indicator Banner */}
        <div className="rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 p-3.5 text-white shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Active Portal
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="mt-1 text-sm font-bold text-white capitalize">
            {role === 'student'
              ? 'Student Career Hub'
              : role === 'industry'
              ? 'Corporate Talent Hub'
              : role === 'academician'
              ? 'Faculty R&D & Training'
              : 'Institutional Analytics'}
          </p>
          <p className="text-[11px] text-slate-300">
            {role === 'student'
              ? 'Apex Institute of Technology'
              : role === 'industry'
              ? 'Siemens, MSFT, NVIDIA'
              : role === 'academician'
              ? 'Academic Sabbaticals & FDPs'
              : 'Placement & Accreditation'}
          </p>
        </div>

        {/* Navigation List */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200/80 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* AI Skill Engine Status Card */}
        <div className="rounded-xl border border-indigo-100 bg-gradient-to-tr from-indigo-50/50 via-white to-cyan-50/50 p-3">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>AI Matching Engine</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
            Real-time skill gap calibration synced with 120+ active industry partner job benchmarks.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-700">Database Sync:</span>
            <span className="font-mono font-bold text-emerald-600">99.8% Latency 14ms</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
