import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Application, ApplicationStatus } from '../types';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  ChevronRight,
  ExternalLink,
  Briefcase,
  FileCheck,
  AlertCircle,
  X,
} from 'lucide-react';

export const TrackingView: React.FC = () => {
  const { applications, opportunities, setActiveView } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<Application | null>(null);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-bold">Applied</span>;
      case 'screening':
        return <span className="rounded-full bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-bold">Profile Screened</span>;
      case 'assessment':
        return <span className="rounded-full bg-purple-100 text-purple-700 px-2.5 py-1 text-xs font-bold">Skill Test In-Progress</span>;
      case 'interview':
        return <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-1 text-xs font-bold">Technical Interview</span>;
      case 'offered':
        return <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 text-xs font-bold">Offer Issued 🎉</span>;
      case 'rejected':
        return <span className="rounded-full bg-rose-100 text-rose-800 px-2.5 py-1 text-xs font-bold">Closed</span>;
    }
  };

  const getStepProgress = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return 20;
      case 'screening':
        return 40;
      case 'assessment':
        return 60;
      case 'interview':
        return 80;
      case 'offered':
        return 100;
      default:
        return 10;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <ClipboardList className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Application & Opportunity Lifecycle Tracker
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            End-to-end transparent status of all internships, placements, and collaborative projects
          </p>
        </div>

        <button
          onClick={() => setActiveView('opportunities')}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
        >
          <Briefcase className="h-4 w-4" />
          Explore More Opportunities
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => {
          const progress = getStepProgress(app.status);
          const isOffered = app.status === 'offered';

          return (
            <div
              key={app.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600">{app.company}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                      ID: {app.id}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 mt-0.5">
                    {app.opportunityTitle}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>Applied: {app.appliedDate}</span>
                    <span>•</span>
                    <span>Comp: <strong>{app.salaryOrStipend}</strong></span>
                    <span>•</span>
                    <span>Skill Compatibility: <strong className="text-indigo-600">{app.matchScore}%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(app.status)}
                  {isOffered && (
                    <button
                      onClick={() => setSelectedOffer(app)}
                      className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                    >
                      <FileCheck className="h-4 w-4" /> View Offer Letter
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Steps Visualizer */}
              <div className="mb-4">
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isOffered
                        ? 'bg-emerald-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 text-center text-[11px] font-semibold text-slate-500">
                  <span className={progress >= 20 ? 'text-indigo-600 font-bold' : ''}>1. Applied</span>
                  <span className={progress >= 60 ? 'text-indigo-600 font-bold' : ''}>2. Assessment</span>
                  <span className={progress >= 80 ? 'text-indigo-600 font-bold' : ''}>3. Interview</span>
                  <span className={progress >= 100 ? 'text-emerald-600 font-bold' : ''}>4. Offer</span>
                </div>
              </div>

              {/* Feedback and Schedule notes */}
              {(app.feedbackNotes || app.interviewSchedule) && (
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    {app.interviewSchedule && (
                      <div className="flex items-center gap-1.5 text-indigo-900 font-semibold mb-1">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                        <span>Scheduled: {app.interviewSchedule}</span>
                      </div>
                    )}
                    {app.feedbackNotes && (
                      <p className="text-slate-600">
                        <strong>Recruiter Note:</strong> {app.feedbackNotes}
                      </p>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Verification Tag: 0x7E3F...
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {applications.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="font-display text-base font-bold text-slate-900">
              No active applications yet
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Explore corporate internships and placement drives mapped to your verified skill profile.
            </p>
            <button
              onClick={() => setActiveView('opportunities')}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
            >
              Browse Openings
            </button>
          </div>
        )}
      </div>

      {/* Offer Letter Inspection Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelectedOffer(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Official Corporate Offer Letter
                </h3>
                <p className="text-xs text-slate-500">{selectedOffer.company}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3 text-xs text-slate-700 font-sans mb-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900">Position Offered:</span>
                <span className="text-indigo-700 font-bold">{selectedOffer.opportunityTitle}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900">Annual CTC / Compensation:</span>
                <span className="text-emerald-700 font-bold text-sm">{selectedOffer.salaryOrStipend}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900">Target Joining Date:</span>
                <span>July 1, 2026</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900">Posting Location:</span>
                <span>Bengaluru R&D Center (Hybrid)</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-1">Corporate Evaluation Remarks:</span>
                <p className="text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                  {selectedOffer.feedbackNotes}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedOffer(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Offer accepted! Onboarding portal link dispatched to your student email.');
                  setSelectedOffer(null);
                }}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
              >
                Accept Offer Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
