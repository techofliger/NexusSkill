import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Github,
  QrCode,
  Share2,
  Download,
  Copy,
  Check,
  FileText,
  School,
  Building2,
  UserCheck,
  BadgeCheck,
} from 'lucide-react';

export const DigitalPortfolioView: React.FC = () => {
  const { student } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);

  const handleCopy = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText(`https://nexus-verify.edu/passport/${student.digitalPassportHash}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Verification Certificate Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        {/* Subtle holographic tech glow backdrop */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-gradient-to-bl from-indigo-100/70 via-emerald-100/40 to-transparent blur-2xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white shadow-md"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-slate-900">
                  {student.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" /> Cryptographically Verified
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {student.department} • {student.institution}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-slate-700">
                  Roll: {student.rollNumber}
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">
                  CGPA: <strong>{student.cgpa} / 10.0</strong>
                </span>
                <span className="rounded-md bg-indigo-50 px-2.5 py-1 font-semibold text-indigo-700">
                  Employability Index: {student.readinessScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badge & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <button
              onClick={() => setShowLedgerModal(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Audit Verification Ledger
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copiedLink ? 'Link Copied!' : 'Share Public URL'}
            </button>
          </div>
        </div>

        {/* Cryptographic Passport Hash Band */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Verifiable Credential Hash (SHA-256)
              </span>
              <div className="font-mono text-xs font-bold text-slate-800 break-all">
                {student.digitalPassportHash}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Attested by Apex Deanery</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Siemens Tech Endorsed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Verified Skills Ledger + Capstone Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verified Skills Ledger */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-600" /> Verified Skills Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Skills confirmed via aptitude assessments and corporate evaluations
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              {student.skills.filter((s) => s.verified).length} Verified
            </span>
          </div>

          <div className="space-y-3">
            {student.skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                    <span className="rounded-md bg-white border border-slate-200 px-1.5 py-0.2 text-[10px] font-semibold text-slate-600">
                      {skill.category}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Level: <strong className="text-slate-900">{skill.currentLevel}/5</strong></span>
                    {skill.verifiedBy && (
                      <span>• Attested by: <strong className="text-indigo-600">{skill.verifiedBy}</strong></span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {skill.endorsementCount} Endorsements
                  </span>
                  {skill.verified ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">
                      Pending Audit
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty-Endorsed Capstone Projects */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" /> Capstone & Industry Projects
              </h3>
              <p className="text-xs text-slate-500">
                Production-grade software systems reviewed by academic mentors
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              {student.projects.length} Showcased
            </span>
          </div>

          <div className="space-y-4">
            {student.projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-slate-200 p-4 transition-all hover:border-indigo-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-sm font-bold text-slate-900">
                    {proj.title}
                  </h4>
                  {proj.verifiedByFaculty ? (
                    <span className="flex-shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Faculty Verified
                    </span>
                  ) : (
                    <span className="flex-shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      Self Reported
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                {proj.facultyName && (
                  <p className="mt-1 text-[11px] text-indigo-600 font-medium">
                    Verified by: {proj.facultyName}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
                      >
                        <Github className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Industry Accreditations */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-bold text-slate-900 mb-4">
          Verified Certifications & Accreditations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {student.certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl border border-slate-200/90 p-4 transition-all hover:border-emerald-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified
                </span>
                <span className="text-[10px] text-slate-400">{cert.issueDate}</span>
              </div>
              <h4 className="font-display text-xs font-bold text-slate-900">{cert.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1">{cert.issuer}</p>
              <div className="mt-3 font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded">
                ID: {cert.credentialId}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ledger Verification Audit Modal */}
      {showLedgerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Cryptographic Ledger Audit Trail
                </h3>
                <p className="text-xs text-slate-500">
                  Permanent verifiable record of academic-industry attestation
                </p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-5">
              <div>
                <span className="text-slate-400 block text-[10px]">STUDENT ID & NAME:</span>
                <strong>{student.rollNumber} - {student.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">LEDGER TRANSACTION HASH:</span>
                <strong className="text-emerald-700 break-all">{student.digitalPassportHash}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ATTESTING UNIVERSITY:</span>
                <span>Apex Institute of Advanced Technology (Deanery Signature: VALID)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">INDUSTRY PARTNER SIGNATURE:</span>
                <span>Siemens Digital Industries Talent Gateway (PKI Key #482910)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">BLOCK TIMESTAMP:</span>
                <span>2026-03-01T14:22:09.182Z (Block #9482109)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CONSENSUS STATE:</span>
                <span className="text-emerald-700 font-bold">100% AUDIT PASS • ZERO TAMPERING DETECTED</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowLedgerModal(false)}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Close Audit Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
