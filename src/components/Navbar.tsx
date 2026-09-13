import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, NavView } from '../types';
import {
  GraduationCap,
  Building2,
  BookOpenCheck,
  School,
  Bell,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Search,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    student,
    notifications,
    markNotificationsRead,
    setActiveView,
    activeView,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleConfig: Record<
    UserRole,
    { label: string; icon: any; color: string; bg: string; border: string; roleDesc: string }
  > = {
    student: {
      label: 'Student',
      icon: GraduationCap,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      roleDesc: 'Aryan Sharma (3rd Yr CS & AI)',
    },
    industry: {
      label: 'Industry Partner',
      icon: Building2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      roleDesc: 'Siemens & Microsoft Talent Portal',
    },
    academician: {
      label: 'Academician / Faculty',
      icon: BookOpenCheck,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      roleDesc: 'Dr. Radhika Iyer (Assoc. Prof & R&D)',
    },
    institution: {
      label: 'Institution Admin',
      icon: School,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      roleDesc: 'Apex Institute (Dean of Placements)',
    },
  };

  const CurrentIcon = roleConfig[role].icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveView('overview')}
            className="flex cursor-pointer items-center gap-2.5 transition-transform hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 text-white shadow-sm shadow-indigo-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-bold tracking-tight text-slate-900">
                  Nexus<span className="text-indigo-600">Skill</span>
                </span>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  v2.6 Live
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">
                Academia-Industry Collaboration & Placement Nexus
              </p>
            </div>
          </div>
        </div>

        {/* Global Role Switcher */}
        <div className="hidden md:flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-1">
          {(['student', 'industry', 'academician', 'institution'] as UserRole[]).map((r) => {
            const cfg = roleConfig[r];
            const Icon = cfg.icon;
            const isActive = role === r;
            return (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setActiveView('overview');
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm shadow-slate-200 font-bold border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? cfg.color : 'text-slate-400'}`} />
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-3">
          {/* Digital Credential Pill */}
          <button
            onClick={() => setActiveView('portfolio')}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 transition-colors hover:bg-emerald-100"
            title="Cryptographic Verified Student Credential"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden lg:inline">Verified Passport:</span>
            <span className="font-mono text-[11px] font-bold text-emerald-700">ACTIVE</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-800">Live Updates</span>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
                      {notifications.length}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markNotificationsRead}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`rounded-xl p-2.5 text-xs transition-colors ${
                        n.read ? 'bg-slate-50 text-slate-600' : 'bg-indigo-50/70 border border-indigo-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium leading-snug">{n.title}</p>
                        {!n.read && (
                          <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-600" />
                        )}
                      </div>
                      <span className="mt-1 block text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Active Persona Chip */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 transition-colors hover:bg-slate-50"
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div className="hidden text-left xl:block">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  {roleConfig[role].roleDesc.split('(')[0]}
                </div>
                <div className="text-[10px] font-semibold text-indigo-600">
                  {roleConfig[role].label}
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Mobile / Quick Role Dropdown */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50">
                <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Active Role
                </div>
                {(['student', 'industry', 'academician', 'institution'] as UserRole[]).map((r) => {
                  const cfg = roleConfig[r];
                  const Icon = cfg.icon;
                  const isSel = role === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setActiveView('overview');
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors ${
                        isSel
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${cfg.color}`} />
                        <span>{cfg.label}</span>
                      </div>
                      {isSel && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
