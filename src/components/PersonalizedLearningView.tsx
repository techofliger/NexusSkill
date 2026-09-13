import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Star,
  ExternalLink,
  Sparkles,
  PlayCircle,
  PlusCircle,
  Filter,
} from 'lucide-react';

export const PersonalizedLearningView: React.FC = () => {
  const { courses, enrollCourse, completeCourseStep, setActiveView } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'enrolled' | 'free'>('all');
  const [activeSearch, setActiveSearch] = useState('');

  const filteredCourses = courses.filter((c) => {
    if (selectedFilter === 'enrolled' && !c.enrolled) return false;
    if (selectedFilter === 'free' && !c.isFree) return false;
    if (activeSearch && !c.title.toLowerCase().includes(activeSearch.toLowerCase()) && !c.targetSkill.toLowerCase().includes(activeSearch.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <GraduationCap className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Personalized Learning & Skill Development
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Industry-published training programs, micro-credentials, and certification courses to bridge gaps
          </p>
        </div>

        {/* Action / Verified Certs Link */}
        <button
          onClick={() => setActiveView('portfolio')}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Award className="h-4 w-4 text-emerald-600" />
          <span>My Verified Certificates</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Recommended ({courses.length})
          </button>
          <button
            onClick={() => setSelectedFilter('enrolled')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedFilter === 'enrolled'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            In Progress ({courses.filter((c) => c.enrolled).length})
          </button>
          <button
            onClick={() => setSelectedFilter('free')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedFilter === 'free'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sponsored / Free ({courses.filter((c) => c.isFree).length})
          </button>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)}
            placeholder="Search by skill or topic (e.g. Docker, AWS)..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => {
          const isFinished = course.progress === 100;
          return (
            <div
              key={course.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={course.providerLogo}
                      alt={course.provider}
                      className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">{course.provider}</div>
                      <h3 className="font-display text-base font-bold text-slate-900 line-clamp-1">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      {course.certificationType}
                    </span>
                    {course.isFree ? (
                      <span className="text-[10px] font-bold text-indigo-600">Industry Sponsored</span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">Exam Voucher Req</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* Target Gap Badge */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
                    Bridges: <strong>{course.targetSkill}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 text-[11px] font-semibold">
                    <Star className="h-3.5 w-3.5 fill-amber-500" /> {course.rating}
                  </span>
                </div>
              </div>

              {/* Bottom Progress or Enroll Section */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                {course.enrolled ? (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700">Course Progress</span>
                      <span className="font-bold text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      {isFinished ? (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Certificate Issued & Skill Level Up!
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">
                          Complete all hands-on labs to verify
                        </span>
                      )}

                      {!isFinished ? (
                        <button
                          onClick={() => completeCourseStep(course.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-600 transition-colors"
                        >
                          <PlayCircle className="h-3.5 w-3.5" />
                          Simulate Lab (+25%)
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveView('portfolio')}
                          className="text-xs font-bold text-indigo-600 hover:underline"
                        >
                          View In Passport &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Level: <strong className="text-slate-800">{course.level}</strong>
                    </span>
                    <button
                      onClick={() => enrollCourse(course.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Enroll in Program
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
