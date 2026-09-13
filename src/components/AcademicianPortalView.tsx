import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  School,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  ExternalLink,
  Users,
  Sparkles,
  Calendar,
  FileCheck,
  ArrowRight,
  TrendingUp,
  Briefcase,
} from 'lucide-react';

export const AcademicianPortalView: React.FC = () => {
  const { student, updateStudentSkill } = useApp();

  const [activeTab, setActiveTab] = useState<'sabbaticals' | 'curriculum' | 'projects' | 'fdp'>('sabbaticals');
  const [endorsedSuccess, setEndorsedSuccess] = useState<string | null>(null);

  const facultySabbaticals = [
    {
      id: 'sab-1',
      title: 'Industry Immersion Sabbatical: Industrial Edge & Digital Twin',
      company: 'Siemens Technology India',
      duration: '8 Weeks (Summer 2026)',
      stipend: 'Sponsored Honorarium + Research Grant',
      location: 'Bengaluru & Virtual',
      domain: 'Cyber-Physical Systems & Automation',
      eligibility: 'Associate / Assistant Professors with research in IoT/Embedded/AI',
      status: 'Accepting Faculty Proposals',
      description:
        'Work directly with Siemens Principal Architects to build real-world digital twin simulators and align your university curriculum with contemporary industrial IoT communication protocols (OPC UA, MQTT).',
    },
    {
      id: 'sab-2',
      title: 'Cloud Native & Microservices Faculty Fellowship',
      company: 'Microsoft Azure Core Team',
      duration: '4 Weeks (Hybrid)',
      stipend: 'Full Travel Grant & Azure Credits ($5,000)',
      location: 'Hyderabad / Online',
      domain: 'Distributed Cloud Architecture',
      eligibility: 'Computer Science Faculty teaching Operating Systems & Cloud Computing',
      status: 'Open for Nomination',
      description:
        'Hands-on immersion with Azure Kubernetes Service engineering teams. Develop practical lab courseware for classroom deployment.',
    },
    {
      id: 'sab-3',
      title: 'Applied Generative AI & Foundation Models Research Residency',
      company: 'NVIDIA AI Tech Center',
      duration: '12 Weeks (Full-time / Sabbatical)',
      stipend: '₹1,50,000 / month + GPU compute cluster access',
      location: 'Pune / Remote',
      domain: 'High Performance Deep Learning',
      eligibility: 'Doctoral Faculty with active deep learning lab publications',
      status: 'Open for Nomination',
      description:
        'Collaborate on low-latency inference pipelines for autonomous vision systems. Co-author joint IEEE papers and train post-grad scholars.',
    },
  ];

  const curriculumAlignments = [
    {
      course: 'CS402: Advanced Operating Systems & Virtualization',
      currentCurriculum: 'POSIX Threads, Monolithic Kernels, Basic VM scheduling',
      industryDemand: 'Linux eBPF Observability, Container Runtimes (containerd), WASM sandboxing',
      alignmentScore: 68,
      recommendedModule: 'Integrate a 3-week hands-on lab on Docker namespaces and cgroups v2.',
      status: 'Revision Recommended',
    },
    {
      course: 'CS508: Database Management Systems',
      currentCurriculum: 'Relational Schema, SQL Joins, B+ Trees',
      industryDemand: 'Distributed Consensus (Raft/Paxos), Vector Databases, Spanner distributed storage',
      alignmentScore: 74,
      recommendedModule: 'Add practical vector embedding storage and retrieval labs.',
      status: 'Revision In-Progress',
    },
    {
      course: 'CS610: Cloud Computing & Web Services',
      currentCurriculum: 'SOAP/REST APIs, Basic AWS EC2 instance launch',
      industryDemand: 'Kubernetes Helm deployments, Terraform Infrastructure as Code, CI/CD observability',
      alignmentScore: 59,
      recommendedModule: 'Adopt the Microsoft Azure & Siemens open-source curriculum modules.',
      status: 'Critical Update Needed',
    },
  ];

  const handleEndorseSkill = (skillId: string, skillName: string) => {
    updateStudentSkill(skillId, 5);
    setEndorsedSuccess(skillName);
    setTimeout(() => setEndorsedSuccess(null), 2500);
  };

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
                Academician & Faculty Portal
              </h1>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
                Apex Faculty Guild
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-600">
              Industry sabbaticals, curriculum benchmark calibration, joint R&D grants, and student endorsement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
            Faculty ID: <strong className="font-mono text-slate-900">FAC-CS-8921</strong>
          </span>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('sabbaticals')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'sabbaticals'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Industry Sabbaticals & Fellowships ({facultySabbaticals.length})
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'curriculum'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Curriculum Industry Alignment ({curriculumAlignments.length})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Student Project & Skill Endorsement
        </button>
      </div>

      {/* Tab 1: Industry Sabbaticals */}
      {activeTab === 'sabbaticals' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-indigo-900 font-medium">
              <Sparkles className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span>
                <strong>Direct Industry Exposure:</strong> Spend 4-12 weeks in corporate R&D laboratories to bring real-world engineering paradigms directly into university lecture halls.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {facultySabbaticals.map((sab) => (
              <div
                key={sab.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between transition-all hover:border-indigo-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                      {sab.status}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">{sab.duration}</span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-slate-900 leading-snug">
                    {sab.title}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-indigo-600">{sab.company}</div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {sab.description}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-700 space-y-1">
                    <div><strong>Grant:</strong> {sab.stipend}</div>
                    <div><strong>Domain:</strong> {sab.domain}</div>
                    <div><strong>Eligibility:</strong> {sab.eligibility}</div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{sab.location}</span>
                  <button
                    onClick={() => alert(`Application for ${sab.title} initiated. Proposal template sent to your faculty email.`)}
                    className="rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-600 transition-colors"
                  >
                    Submit Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Curriculum Industry Alignment */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
              Curriculum Obsolescence & Industry Alignment Matrix
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              AI cross-referencing university syllabus syllabi against contemporary corporate job descriptions
            </p>

            <div className="space-y-5">
              {curriculumAlignments.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 p-5 transition-all hover:border-indigo-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="font-display text-sm font-bold text-slate-900">
                      {item.course}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">
                        Industry Relevance: <strong className="text-slate-900">{item.alignmentScore}%</strong>
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          item.alignmentScore < 65
                            ? 'bg-rose-100 text-rose-800'
                            : item.alignmentScore < 75
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                        Current Syllabus Focus:
                      </span>
                      <p className="text-slate-700">{item.currentCurriculum}</p>
                    </div>

                    <div className="rounded-xl bg-indigo-50/60 p-3 border border-indigo-100">
                      <span className="font-bold text-indigo-700 uppercase text-[10px] block mb-1">
                        Industry Demand (Siemens / MSFT / AWS):
                      </span>
                      <p className="text-indigo-950 font-medium">{item.industryDemand}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Sparkles className="h-4 w-4 text-indigo-600" />
                      <span>{item.recommendedModule}</span>
                    </div>
                    <button
                      onClick={() => alert(`Curriculum upgrade packet exported for Academic Board approval.`)}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 font-bold text-white hover:bg-indigo-700 whitespace-nowrap"
                    >
                      Export Upgrade Packet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Student Project Endorsement Console */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
              Faculty Endorsement & Capstone Audit Desk
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Review and cryptographically attest student capstone projects for placement dossiers
            </p>

            {endorsedSuccess && (
              <div className="mb-4 rounded-2xl bg-emerald-600 p-3 text-xs font-bold text-white flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="h-4 w-4" /> Endorsed {endorsedSuccess} on student's verified digital passport!
              </div>
            )}

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{student.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {student.department} • CGPA: {student.cgpa}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                    Readiness: {student.readinessScore}%
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-bold text-slate-700 uppercase">
                    Unverified Skills Seeking Faculty Attestation:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((sk) => (
                      <div
                        key={sk.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs flex items-center justify-between gap-3"
                      >
                        <div>
                          <span className="font-bold text-slate-800">{sk.name}</span>
                          <span className="text-slate-500 text-[10px] block">Level: {sk.currentLevel}/5</span>
                        </div>

                        <button
                          onClick={() => handleEndorseSkill(sk.id, sk.name)}
                          className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
                        >
                          Attest & Endorse
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
