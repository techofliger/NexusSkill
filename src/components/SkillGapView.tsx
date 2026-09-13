import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Layers,
  Target,
  Zap,
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { student, courses, setActiveView } = useApp();

  const [selectedRole, setSelectedRole] = useState('Full Stack Cloud & AI Engineer');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);

  // Trigger Gemini API Skill Gap Analysis
  const handleRunAiAnalysis = async () => {
    setIsAiAnalyzing(true);
    try {
      const response = await fetch('/api/ai/skill-gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSkills: student.skills.map((s) => ({
            name: s.name,
            currentLevel: s.currentLevel,
            benchmarkLevel: s.benchmarkLevel,
          })),
          targetRole: selectedRole,
          industryDomain: 'Cloud & AI Systems',
        }),
      });
      const data = await response.json();
      setAiAnalysisResult(data);
    } catch (err) {
      console.error('Error analyzing skill gap:', err);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const criticalGaps = student.skills.filter((s) => s.benchmarkLevel - s.currentLevel >= 2);
  const minorGaps = student.skills.filter((s) => s.benchmarkLevel - s.currentLevel === 1);
  const masteredSkills = student.skills.filter((s) => s.currentLevel >= s.benchmarkLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <BarChart3 className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Industry Skill Gap & Benchmark Analysis
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Real-time differential between student verified competencies and corporate job criteria
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Target Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setAiAnalysisResult(null);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-xs focus:border-indigo-500 focus:outline-none"
          >
            <option value="Full Stack Cloud & AI Engineer">Full Stack Cloud & AI Engineer</option>
            <option value="Machine Learning & Edge AI Specialist">Machine Learning & Edge AI Specialist</option>
            <option value="DevOps & Site Reliability Engineer (SRE)">DevOps & Site Reliability Engineer</option>
            <option value="Autonomous Embedded Systems Engineer">Autonomous Embedded Systems Engineer</option>
            <option value="Cybersecurity Infrastructure Architect">Cybersecurity Infrastructure Architect</option>
          </select>

          <button
            onClick={handleRunAiAnalysis}
            disabled={isAiAnalyzing}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {isAiAnalyzing ? 'Calibrating AI...' : 'Run AI Gap Analysis'}
          </button>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              Critical Skill Gaps
            </span>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
              High Priority
            </span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-rose-900">
            {criticalGaps.length} Skills
          </div>
          <p className="mt-1 text-xs text-rose-700/80">
            {criticalGaps.map((c) => c.name.split('&')[0]).join(', ')}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Minor Gaps (-1 Level)
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
              Quick Bridge
            </span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-amber-900">
            {minorGaps.length} Skills
          </div>
          <p className="mt-1 text-xs text-amber-700/80">
            {minorGaps.map((c) => c.name.split('&')[0]).join(', ')}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Industry Benchmark Met
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
              Placement Ready
            </span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-emerald-900">
            {masteredSkills.length} Skills
          </div>
          <p className="mt-1 text-xs text-emerald-700/80">
            Strong foundations in {masteredSkills.map((c) => c.name.split('&')[0]).join(', ')}
          </p>
        </div>
      </div>

      {/* AI Analysis Card (If triggered or default preview) */}
      {aiAnalysisResult && (
        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-cyan-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h3 className="font-display text-base font-bold text-slate-900">
              Gemini AI Industry Skill Assessment Summary
            </h3>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800">
              Role Match: {aiAnalysisResult.readinessScore}%
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed mb-4">
            {aiAnalysisResult.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-4 border border-indigo-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Recommended Remediation Roadmap
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {aiAnalysisResult.recommendedActionPlan?.map((plan: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="rounded-md bg-indigo-100 px-1.5 py-0.5 font-bold text-[10px] text-indigo-700 mt-0.5">
                      {plan.phase}
                    </span>
                    <span>{plan.action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-4 border border-indigo-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Suggested Industry Capstone Projects
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {aiAnalysisResult.recommendedProjects?.map((proj: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Comparative Gap Matrix */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Skill-by-Skill Differential Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Scale 1 (Novice) to 5 (Production Expert / Architect)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-indigo-600" />
              <span className="text-slate-700">Your Current Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-cyan-500" />
              <span className="text-slate-700">Industry Requirement</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {student.skills.map((skill) => {
            const gap = skill.benchmarkLevel - skill.currentLevel;
            const isCritical = gap >= 2;
            const isMinor = gap === 1;

            return (
              <div
                key={skill.id}
                className="rounded-2xl border border-slate-200/90 p-4 transition-all hover:border-indigo-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{skill.name}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        {skill.category}
                      </span>
                    </div>
                    {skill.verifiedBy && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Verified by: {skill.verifiedBy}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCritical && (
                      <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-800 flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5" /> Critical Gap (-{gap})
                      </span>
                    )}
                    {isMinor && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                        Minor Gap (-1)
                      </span>
                    )}
                    {gap <= 0 && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Benchmark Met
                      </span>
                    )}

                    {gap > 0 && (
                      <button
                        onClick={() => setActiveView('learning')}
                        className="rounded-xl bg-slate-900 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-600 transition-colors"
                      >
                        Bridge Gap
                      </button>
                    )}
                  </div>
                </div>

                {/* Level visualization bars */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-24 text-slate-500 font-medium">Your Level:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{ width: `${(skill.currentLevel / 5) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 font-bold text-slate-900 text-right">{skill.currentLevel} / 5</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-24 text-slate-500 font-medium">Industry Req:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-cyan-500"
                        style={{ width: `${(skill.benchmarkLevel / 5) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 font-bold text-cyan-700 text-right">{skill.benchmarkLevel} / 5</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
