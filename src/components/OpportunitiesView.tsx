import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityType } from '../types';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Send,
  X,
  Users,
} from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { opportunities, applications, applyToOpportunity, student, role, setActiveView } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'internship' | 'placement' | 'project'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteFilter, setRemoteFilter] = useState<'all' | 'Remote' | 'Hybrid' | 'On-site'>('all');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [showApplySuccess, setShowApplySuccess] = useState(false);

  const filtered = opportunities.filter((opp) => {
    if (activeTab !== 'all' && opp.type !== activeTab) return false;
    if (remoteFilter !== 'all' && opp.remoteType !== remoteFilter) return false;
    if (
      searchQuery &&
      !opp.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opp.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opp.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleApply = (oppId: string) => {
    const success = applyToOpportunity(oppId, customNote);
    if (success) {
      setShowApplySuccess(true);
      setTimeout(() => {
        setShowApplySuccess(false);
        setSelectedOpp(null);
        setCustomNote('');
      }, 1800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Briefcase className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Internship & Placement Marketplace
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Real-time industry opportunities dynamically matched to student verified skill profiles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('tracking')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <span>My Applications ({applications.length})</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 overflow-x-auto">
          {(['all', 'internship', 'placement', 'project'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'all' ? 'All Openings' : tab === 'project' ? 'R&D Projects' : tab}
            </button>
          ))}
        </div>

        {/* Search & Location Filter */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, company..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <select
            value={remoteFilter}
            onChange={(e: any) => setRemoteFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Locations</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Opportunities List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((opp) => {
          const isApplied = applications.some((a) => a.opportunityId === opp.id);
          return (
            <div
              key={opp.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between transition-all hover:border-indigo-300 hover:shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={opp.companyLogo}
                      alt={opp.company}
                      className="h-11 w-11 rounded-2xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-500">{opp.company}</div>
                      <h3 className="font-display text-sm font-bold text-slate-900 line-clamp-1">
                        {opp.title}
                      </h3>
                    </div>
                  </div>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 flex-shrink-0">
                    {opp.matchScore}% Match
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 mb-3">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                    {opp.type.toUpperCase()}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" /> {opp.location}
                  </span>
                  <span className="rounded-md bg-emerald-50 text-emerald-800 px-2 py-0.5 font-bold">
                    {opp.stipendOrSalary}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {opp.description}
                </p>

                {/* Required Skills tags */}
                <div className="mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Required Skill Matching
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.requiredSkills.map((sk, i) => {
                      const studentSkill = student.skills.find(
                        (s) => s.name.toLowerCase() === sk.name.toLowerCase()
                      );
                      const isSatisfied = studentSkill && studentSkill.currentLevel >= sk.level;
                      return (
                        <span
                          key={i}
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1 ${
                            isSatisfied
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isSatisfied && '✓'} {sk.name.split('&')[0]} (L{sk.level})
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div className="text-[10px] text-slate-400">
                  <span>{opp.openings} Openings</span> • <span>{opp.applicantsCount} Applied</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Details
                  </button>

                  {isApplied ? (
                    <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedOpp(opp)}
                      className="rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Opportunity Detail & Application Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedOpp(null)}
              className="absolute top-5 right-5 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-5">
              <img
                src={selectedOpp.companyLogo}
                alt={selectedOpp.company}
                className="h-14 w-14 rounded-2xl object-cover ring-1 ring-slate-200 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600">{selectedOpp.company}</span>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                    {selectedOpp.matchScore}% Skill Compatibility
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-slate-900 mt-0.5">
                  {selectedOpp.title}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>{selectedOpp.location} ({selectedOpp.remoteType})</span>
                  <span>•</span>
                  <span>{selectedOpp.stipendOrSalary}</span>
                  <span>•</span>
                  <span>Duration: {selectedOpp.duration}</span>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-4 text-xs text-slate-700 border-y border-slate-100 py-4">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  Role Description & Corporate Mission
                </h4>
                <p className="leading-relaxed text-slate-600">{selectedOpp.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  Candidate Eligibility Criteria
                </h4>
                <p className="leading-relaxed text-slate-600">{selectedOpp.eligibility}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Verified Skill Compatibility Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedOpp.requiredSkills.map((sk, idx) => {
                    const studentSkill = student.skills.find(
                      (s) => s.name.toLowerCase() === sk.name.toLowerCase()
                    );
                    const isMet = studentSkill && studentSkill.currentLevel >= sk.level;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl p-2.5 border flex items-center justify-between ${
                          isMet ? 'border-emerald-200 bg-emerald-50/40' : 'border-amber-200 bg-amber-50/40'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900">{sk.name}</div>
                          <div className="text-[10px] text-slate-500">
                            Required: Level {sk.level} • You: Level {studentSkill?.currentLevel || 1}
                          </div>
                        </div>
                        {isMet ? (
                          <span className="text-emerald-700 font-bold text-xs flex items-center gap-0.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Match
                          </span>
                        ) : (
                          <span className="text-amber-700 font-bold text-[11px]">Minor Gap</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Digital Portfolio Attachment confirmation */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-600" />
                  <span className="text-[11px] font-semibold text-indigo-900">
                    Attached: Verified Digital Passport ({student.digitalPassportHash.slice(0, 14)}...)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Tamper-Proof</span>
              </div>

              {/* Optional Custom Cover Note */}
              <div>
                <label className="block font-bold text-slate-900 text-[11px] mb-1">
                  Personalized Statement / Faculty Recommendation (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Highlight your Kafka telemetry project or mention Dr. Iyer's recommendation..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Deadline: {selectedOpp.deadline}
              </span>

              {showApplySuccess ? (
                <div className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="h-4 w-4" /> Application Transmitted!
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOpp(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleApply(selectedOpp.id)}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Confirm Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
