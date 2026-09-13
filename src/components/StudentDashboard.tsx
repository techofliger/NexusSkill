import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  Award,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Brain,
  Calendar,
  ChevronRight,
  BookOpen,
  MapPin,
  FileCheck,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { student, opportunities, applications, setActiveView, applyToOpportunity } = useApp();

  const matchedOpps = opportunities.slice(0, 3);
  const scheduledApp = applications.find((a) => a.status === 'interview');
  const offeredApp = applications.find((a) => a.status === 'offered');

  return (
    <div className="space-y-6">
      {/* Top Banner / Student Greeting */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-100/60 to-cyan-100/40 blur-2xl" />
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-slate-900">
                  Welcome back, {student.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Verified Portfolio
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {student.department} • {student.year} • {student.institution}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                  Target Role: <strong className="text-indigo-600">{student.targetRole}</strong>
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                  CGPA: <strong className="text-slate-900">{student.cgpa}</strong>
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700 font-mono">
                  ID: {student.rollNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveView('skill-assessment')}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-md"
            >
              <Brain className="h-4 w-4" />
              Take Skill Assessment
            </button>
            <button
              onClick={() => setActiveView('portfolio')}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <FileCheck className="h-4 w-4 text-indigo-600" />
              Digital Passport
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Readiness Score */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-hover hover:border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Employability Readiness
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-slate-900">
              {student.readinessScore}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">+4% this month</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700"
              style={{ width: `${student.readinessScore}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Tier-1 Placement Cutoff: 80%</span>
            <span className="font-semibold text-emerald-600">Qualified</span>
          </div>
        </div>

        {/* Metric 2: Verified Skills */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-hover hover:border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Verified Skills
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-slate-900">
              {student.skills.filter((s) => s.verified).length} / {student.skills.length}
            </span>
            <span className="text-xs font-semibold text-slate-500">Skills Audited</span>
          </div>
          <p className="mt-3 text-xs text-slate-600 line-clamp-1">
            Endorsed by Siemens Labs & Apex Faculty
          </p>
          <button
            onClick={() => setActiveView('portfolio')}
            className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Audit Skill Ledger <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Metric 3: Active Applications */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-hover hover:border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Application Pipeline
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-slate-900">
              {applications.length}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {applications.filter((a) => a.status === 'offered').length} Offer Received
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            1 Interview • 1 Assessment Pending
          </p>
          <button
            onClick={() => setActiveView('tracking')}
            className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Track Pipeline <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Metric 4: Digital Passport Credential */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-hover hover:border-purple-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Digital Passport ID
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-mono text-xs font-bold text-slate-800 break-all bg-slate-100 px-2 py-1 rounded-md block">
              {student.digitalPassportHash.slice(0, 16)}...
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Cryptographic SHA-256 Ledger Verified
          </p>
          <button
            onClick={() => setActiveView('portfolio')}
            className="mt-2 text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
          >
            View Full Passport <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Critical Status Highlights (Scheduled Interview & Offer Received) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {offeredApp && (
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-emerald-50/40 to-white p-5 shadow-xs flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  Offer Issued
                </span>
                <span className="text-xs font-bold text-slate-900">{offeredApp.salaryOrStipend}</span>
              </div>
              <h4 className="mt-1 text-sm font-bold text-slate-900">
                {offeredApp.opportunityTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">{offeredApp.company}</p>
              <p className="mt-2 text-xs text-emerald-900 bg-emerald-100/60 p-2 rounded-lg leading-relaxed">
                {offeredApp.feedbackNotes}
              </p>
            </div>
          </div>
        )}

        {scheduledApp && (
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/80 via-indigo-50/40 to-white p-5 shadow-xs flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800">
                  Upcoming Interview
                </span>
                <span className="text-xs font-semibold text-slate-600">Match: {scheduledApp.matchScore}%</span>
              </div>
              <h4 className="mt-1 text-sm font-bold text-slate-900">
                {scheduledApp.opportunityTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">{scheduledApp.company}</p>
              <p className="mt-2 text-xs text-indigo-900 bg-indigo-100/60 p-2 rounded-lg leading-relaxed">
                📅 {scheduledApp.interviewSchedule}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Skill Gap Matrix Snapshot + AI Matched Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Skill Gap Visualizer Snapshot */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                Skill Mapping vs Industry Benchmark
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {student.targetRole}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against Microsoft, Siemens, & NVIDIA hiring rubrics
              </p>
            </div>
            <button
              onClick={() => setActiveView('skill-gap')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Deep Gap Analysis <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {student.skills.slice(0, 5).map((skill) => {
              const gap = skill.benchmarkLevel - skill.currentLevel;
              return (
                <div key={skill.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{skill.name}</span>
                      {skill.verified ? (
                        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                          Audit Pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">
                        Current: <strong className="text-slate-900">{skill.currentLevel}/5</strong>
                      </span>
                      <span className="text-slate-500">
                        Benchmark: <strong className="text-indigo-700">{skill.benchmarkLevel}/5</strong>
                      </span>
                      {gap > 0 ? (
                        <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700">
                          Gap: -{gap} Lvl
                        </span>
                      ) : (
                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          Benchmark Met
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Level Bars */}
                  <div className="grid grid-cols-2 gap-3 items-center">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium mb-1">Your Proficiency</div>
                      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all"
                          style={{ width: `${(skill.currentLevel / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium mb-1">Industry Requirement</div>
                      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-cyan-600 transition-all"
                          style={{ width: `${(skill.benchmarkLevel / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-50/70 border border-indigo-100 p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-900">
                AI Recommendation: Complete the 4-week Docker & Kubernetes Sprint to close your primary gap.
              </span>
            </div>
            <button
              onClick={() => setActiveView('learning')}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
            >
              Start Course
            </button>
          </div>
        </div>

        {/* Right 1 Col: Top AI-Matched Opportunities */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Matched Opportunities
              </h3>
              <button
                onClick={() => setActiveView('opportunities')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-3.5">
              {matchedOpps.map((opp) => {
                const isApplied = applications.some((a) => a.opportunityId === opp.id);
                return (
                  <div
                    key={opp.id}
                    className="rounded-2xl border border-slate-200/80 p-3.5 transition-all hover:border-indigo-300 hover:shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={opp.companyLogo}
                          alt={opp.company}
                          className="h-9 w-9 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {opp.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">{opp.company}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                        {opp.matchScore}% Match
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{opp.stipendOrSalary}</span>
                      <span>{opp.remoteType}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400">{opp.deadline} deadline</span>
                      {isApplied ? (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => applyToOpportunity(opp.id)}
                          className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-600 transition-colors"
                        >
                          1-Click Apply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-3 text-center">
            <p className="text-xs text-slate-600">
              Looking for faculty research sabbaticals or FDPs?
            </p>
            <button
              onClick={() => setActiveView('collaboration')}
              className="mt-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              Explore Industry Collaboration Hub &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
