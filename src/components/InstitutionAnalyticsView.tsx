import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  School,
  TrendingUp,
  Award,
  Users,
  AlertTriangle,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Building,
  BarChart2,
} from 'lucide-react';

export const InstitutionAnalyticsView: React.FC = () => {
  const { institutionStats } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
            <School className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-slate-900">
                Institutional Analytics & Outcome Dashboard
              </h1>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
                Apex Institute of Technology
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-600">
              Macro cohort analytics, batch skill deficits, placement trends, and NBA/NAAC accreditation compliance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting comprehensive NAAC/NBA Accreditation Report (PDF)...')}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Export Accreditation Dossier
          </button>
        </div>
      </div>

      {/* Top Level Metric KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Enrolled Scholars
          </span>
          <div className="mt-3 font-display text-3xl font-bold text-slate-900">
            {institutionStats.totalStudents.toLocaleString()}
          </div>
          <p className="mt-2 text-xs text-emerald-600 font-semibold">
            {institutionStats.assessedCount} Assessed (91% Participation)
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cohort Employability Avg
          </span>
          <div className="mt-3 font-display text-3xl font-bold text-indigo-600">
            {institutionStats.averageReadiness}%
          </div>
          <p className="mt-2 text-xs text-slate-500">
            +6.4% higher than national benchmark
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Batch Placement Conversion
          </span>
          <div className="mt-3 font-display text-3xl font-bold text-emerald-600">
            {institutionStats.placementRate}%
          </div>
          <p className="mt-2 text-xs text-emerald-700 font-semibold">
            Avg CTC: ₹14.8 LPA (Highest: ₹48 LPA)
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Industry MoUs & Lab Tie-ups
          </span>
          <div className="mt-3 font-display text-3xl font-bold text-slate-900">
            {institutionStats.industryPartnersCount} Active
          </div>
          <p className="mt-2 text-xs text-indigo-600 font-semibold">
            Siemens, Microsoft, NVIDIA, Bosch
          </p>
        </div>
      </div>

      {/* Grid: Departmental Breakdown & Batch-Wide Skill Deficits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Readiness Ranking */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-bold text-slate-900 mb-1">
            Departmental Employability Readiness
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Cross-discipline competency scores normalized to target industry job clusters
          </p>

          <div className="space-y-4">
            {institutionStats.departmentReadiness.map((dept, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{dept.department}</span>
                  <span className="font-bold text-indigo-600">{dept.score}% Readiness</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                    style={{ width: `${dept.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batch-Wide Skill Deficits */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-bold text-slate-900 mb-1">
            Top Macro Skill Gaps Across 2026 Batch
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Key areas where students fail the corporate recruitment threshold
          </p>

          <div className="space-y-3">
            {institutionStats.topGapsAcrossCohort.map((gap, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">{gap.skill}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Afflicts <strong className="text-rose-700">{gap.affectedPercentage}%</strong> of student cohort
                  </div>
                </div>

                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-800">
                  Deficit: -{gap.gapSeverity} Level
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-indigo-50 border border-indigo-100 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-indigo-900">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Recommended: Add mandatory Docker & K8s bootcamp in Sem 6.</span>
            </div>
            <button
              onClick={() => alert('Bootcamp curriculum draft sent to Academic Council')}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      {/* Accreditation Compliance Status Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-bold text-slate-900 mb-4">
          Accreditation & Quality Benchmark Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-900">NBA Tier-1 Criteria 4 & 5</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-emerald-800/80">
              Direct evidence of student industry internships and outcome-based education (OBE) skill mapping.
            </p>
            <div className="mt-3 font-bold text-emerald-700">Audit Status: 98% Met</div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-900">NAAC A++ Criterion 3</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-emerald-800/80">
              Research, industry consulting, and faculty sabbaticals tracked through verifiable cryptographic hashes.
            </p>
            <div className="mt-3 font-bold text-emerald-700">Audit Status: 95% Met</div>
          </div>

          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-indigo-900">ABET Engineering Criteria</span>
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
            </div>
            <p className="text-indigo-800/80">
              Student capability to apply modern engineering tools, techniques, and collaborative industrial practice.
            </p>
            <div className="mt-3 font-bold text-indigo-700">Audit Status: Ready for Inspection</div>
          </div>
        </div>
      </div>
    </div>
  );
};
