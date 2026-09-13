import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Video,
  Star,
  MessageSquare,
  ArrowRight,
  Send,
  Zap,
} from 'lucide-react';

export const MentorshipCollabView: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [sessionTopic, setSessionTopic] = useState('System Design & Microservices Mock Interview');

  const mentors = [
    {
      id: 'm-1',
      name: 'Dr. Rajeshwari Sundaram',
      role: 'Principal Architect - Cloud Edge',
      company: 'Siemens Technology Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      expertise: ['Industrial IoT', 'Kafka Event Streaming', 'Kubernetes Edge'],
      rating: 4.9,
      sessionsCompleted: 142,
      availableSlot: 'Tomorrow, 4:00 PM IST',
      bio: '20+ years building industrial automation networks. Mentors students on distributed reliability and real-world system architecture.',
    },
    {
      id: 'm-2',
      name: 'Vikram Malhotra',
      role: 'Senior Staff SRE & Cloud Architect',
      company: 'Microsoft Azure',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      expertise: ['Cloud Architecture', 'Go/Rust Microservices', 'CI/CD Pipelines'],
      rating: 5.0,
      sessionsCompleted: 98,
      availableSlot: 'Thursday, 6:30 PM IST',
      bio: 'Passionate about bridging academia and hyperscaler engineering. Specializes in production incident simulations and interview design.',
    },
    {
      id: 'm-3',
      name: 'Ananya Deshmukh',
      role: 'Staff Deep Learning Scientist',
      company: 'NVIDIA Autonomous Systems',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      expertise: ['LLM Fine-tuning', 'TensorRT Optimization', 'Edge Vision'],
      rating: 4.9,
      sessionsCompleted: 76,
      availableSlot: 'Friday, 5:00 PM IST',
      bio: 'Co-mentoring university labs on embedded GPU inference and low-power computer vision architectures.',
    },
  ];

  const innovationChallenges = [
    {
      id: 'chal-1',
      title: 'Siemens Industrial AI Hackathon: Real-Time Telemetry Anomaly Engine',
      prize: '₹2,50,000 + Pre-Placement Interviews (PPIs)',
      deadline: 'April 20, 2026',
      teamsRegistered: 84,
      tags: ['Kafka', 'Docker', 'Time-Series ML'],
      banner: 'Industrial Automation',
    },
    {
      id: 'chal-2',
      title: 'Microsoft Green Cloud Computing Challenge',
      prize: '₹3,00,000 + Azure Cloud Grant',
      deadline: 'May 5, 2026',
      teamsRegistered: 112,
      tags: ['Carbon Aware SDK', 'Kubernetes', 'Go'],
      banner: 'Sustainable Infrastructure',
    },
  ];

  const handleBookSession = () => {
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setSelectedMentor(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <Users className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Industry Mentorship & Collaboration Hub
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Direct 1:1 guidance from engineering leaders, technical mock interviews, and corporate hackathons
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            ● 28 Industry Mentors Online
          </span>
        </div>
      </div>

      {/* Mentors Grid */}
      <div>
        <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
          Featured Industry Engineering Mentors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between transition-all hover:border-rose-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-rose-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span>{mentor.rating}</span>
                      <span className="text-slate-400">({mentor.sessionsCompleted} sessions)</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900">
                      {mentor.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{mentor.role}</p>
                    <p className="text-[11px] text-rose-700 font-bold">{mentor.company}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-emerald-600" />
                  <span>{mentor.availableSlot}</span>
                </div>
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-600 transition-colors"
                >
                  Book 1:1 Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Hackathons & Innovation Challenges */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Corporate Innovation Challenges & PPIs
            </h3>
            <p className="text-xs text-slate-500">
              Solve actual industrial R&D problem statements and earn pre-placement interviews
            </p>
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
            Direct Industry Sponsorship
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {innovationChallenges.map((chal) => (
            <div
              key={chal.id}
              className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 to-white hover:border-indigo-300 transition-all"
            >
              <span className="rounded-full bg-slate-900 text-white px-2.5 py-0.5 text-[10px] font-bold">
                {chal.banner}
              </span>
              <h4 className="font-display text-sm font-bold text-slate-900 mt-2">
                {chal.title}
              </h4>
              <div className="mt-2 text-xs font-bold text-emerald-700">{chal.prize}</div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {chal.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  {chal.teamsRegistered} teams registered • Ends: {chal.deadline}
                </span>
                <button
                  onClick={() => alert(`Registered for ${chal.title}! Team kit dispatched.`)}
                  className="rounded-xl bg-indigo-600 px-3.5 py-1.5 font-bold text-white hover:bg-indigo-700"
                >
                  Register Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedMentor.avatar}
                alt={selectedMentor.name}
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Schedule Session with {selectedMentor.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedMentor.company}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Session Objective</label>
                <select
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                >
                  <option value="System Design & Microservices Mock Interview">
                    System Design & Architecture Mock Interview
                  </option>
                  <option value="Resume & Digital Passport Review">
                    Resume & Digital Passport Review
                  </option>
                  <option value="Career Transition & SRE Placement Strategy">
                    Career Transition & Placement Strategy
                  </option>
                  <option value="Academic Capstone Guidance">
                    Academic Capstone Guidance
                  </option>
                </select>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-800 block text-[11px] mb-1">Selected Slot:</span>
                <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
                  <Video className="h-4 w-4" /> {selectedMentor.availableSlot} (Google Meet)
                </span>
              </div>
            </div>

            {bookedSuccess ? (
              <div className="rounded-xl bg-emerald-600 p-3 text-center text-xs font-bold text-white flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Calendar Invite & Meet Link Sent!
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookSession}
                  className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
