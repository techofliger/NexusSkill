import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity, ApplicationStatus } from '../types';
import {
  Building2,
  PlusCircle,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Award,
  Filter,
  ArrowUpRight,
  Briefcase,
  X,
  Send,
  Eye,
} from 'lucide-react';

export const IndustryDashboard: React.FC = () => {
  const {
    opportunities,
    addOpportunity,
    applications,
    updateApplicationStatus,
    student,
    setActiveView,
  } = useApp();

  const [showPostModal, setShowPostModal] = useState(false);
  const [minMatchFilter, setMinMatchFilter] = useState(70);

  // New posting form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<Opportunity['type']>('internship');
  const [newStipend, setNewStipend] = useState('₹75,000 / month');
  const [newLocation, setNewLocation] = useState('Bengaluru / Remote');
  const [newRemote, setNewRemote] = useState<Opportunity['remoteType']>('Hybrid');
  const [newDuration, setNewDuration] = useState('6 Months');
  const [newOpenings, setNewOpenings] = useState(5);
  const [newDesc, setNewDesc] = useState('');
  const [newElig, setNewElig] = useState('B.Tech 3rd/4th year with strong system programming fundamentals');

  const handleCreatePosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addOpportunity({
      title: newTitle,
      company: 'Siemens Industrial AI Lab',
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
      type: newType,
      department: ['Computer Science', 'Artificial Intelligence'],
      location: newLocation,
      remoteType: newRemote,
      stipendOrSalary: newStipend,
      duration: newDuration,
      requiredSkills: [
        { name: 'React.js & Frontend Architecture', level: 3 },
        { name: 'Node.js & Microservices', level: 4 },
        { name: 'Distributed Systems & Cloud (AWS/GCP)', level: 3 },
      ],
      deadline: 'May 15, 2026',
      description: newDesc || 'High-impact engineering opportunity working directly on next-gen industrial edge intelligence systems.',
      eligibility: newElig,
      openings: newOpenings,
      matchScore: 90,
    });

    setShowPostModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-slate-900">
                Industry Partner & Talent Gateway
              </h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                Siemens & Tech Alliance
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-600">
              Post internships, source verified candidates, and manage campus recruitment pipelines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
          >
            <PlusCircle className="h-4 w-4" />
            Post New Opportunity
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Openings</span>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900">{opportunities.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Across 4 university hubs</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Verified Talent Pool</span>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900">1,280+</div>
          <span className="text-[11px] text-indigo-600 font-semibold">Audit Score &gt; 80%</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Candidates</span>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900">{applications.length}</div>
          <span className="text-[11px] text-slate-500">In interview / assessment</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Offers Issued</span>
          <div className="mt-2 font-display text-2xl font-bold text-emerald-600">
            {applications.filter((a) => a.status === 'offered').length}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">100% Acceptance Rate</span>
        </div>
      </div>

      {/* Candidate Pipeline Management (ATS Kanban) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Corporate Candidate Recruitment Pipeline
            </h3>
            <p className="text-xs text-slate-500">
              Review verified student profiles, trigger technical rounds, and issue offers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter Min Compatibility:</span>
            <input
              type="range"
              min="50"
              max="95"
              value={minMatchFilter}
              onChange={(e) => setMinMatchFilter(Number(e.target.value))}
              className="accent-indigo-600"
            />
            <span className="text-xs font-bold text-indigo-600 font-mono">{minMatchFilter}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(['applied', 'assessment', 'interview', 'offered'] as ApplicationStatus[]).map((col) => {
            const colApps = applications.filter(
              (a) => a.status === col && a.matchScore >= minMatchFilter
            );
            const colTitles: Record<ApplicationStatus, { label: string; color: string }> = {
              applied: { label: 'New Applicants', color: 'bg-slate-100 text-slate-700' },
              screening: { label: 'Screening', color: 'bg-blue-100 text-blue-700' },
              assessment: { label: 'Tech Assessment', color: 'bg-purple-100 text-purple-700' },
              interview: { label: 'Architecture Interview', color: 'bg-amber-100 text-amber-800' },
              offered: { label: 'Offer Issued', color: 'bg-emerald-100 text-emerald-800' },
              rejected: { label: 'Archived', color: 'bg-slate-100 text-slate-500' },
            };

            return (
              <div key={col} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${colTitles[col].color}`}>
                    {colTitles[col].label}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{colApps.length}</span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-slate-900">{app.studentName}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {app.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{app.opportunityTitle}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{app.appliedDate}</p>

                      {app.feedbackNotes && (
                        <p className="mt-2 text-[10px] text-indigo-900 bg-indigo-50/70 p-1.5 rounded line-clamp-2">
                          {app.feedbackNotes}
                        </p>
                      )}

                      {/* Transition controls */}
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Move:</span>
                        <div className="flex items-center gap-1">
                          {col !== 'applied' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'applied')}
                              className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 hover:bg-slate-100"
                            >
                              &larr;
                            </button>
                          )}
                          {col !== 'assessment' && col !== 'interview' && col !== 'offered' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'assessment')}
                              className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 hover:bg-purple-100"
                            >
                              Test
                            </button>
                          )}
                          {col !== 'interview' && col !== 'offered' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'interview')}
                              className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 hover:bg-amber-100"
                            >
                              Interview
                            </button>
                          )}
                          {col !== 'offered' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'offered')}
                              className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-emerald-700"
                            >
                              Offer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400">
                      No candidates in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Post New Opportunity */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-display text-xl font-bold text-slate-900 mb-1">
              Publish New Industry Opening
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Specify technical skill weights to enable instant AI candidate matching
            </p>

            <form onSubmit={handleCreatePosting} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Cloud Systems Intern"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opportunity Type</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="internship">Internship</option>
                    <option value="placement">Full-time Placement</option>
                    <option value="project">R&D Capstone Project</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Workplace Mode</label>
                  <select
                    value={newRemote}
                    onChange={(e: any) => setNewRemote(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stipend / CTC</label>
                  <input
                    type="text"
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Open Positions</label>
                  <input
                    type="number"
                    value={newOpenings}
                    onChange={(e) => setNewOpenings(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe core engineering responsibilities, tech stacks, and team mission..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2 font-bold text-white hover:bg-emerald-700 shadow-sm"
                >
                  Publish to Talent Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
