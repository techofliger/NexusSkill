import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  Send,
  CheckCircle2,
  TrendingUp,
  Brain,
  ArrowRight,
  Bot,
  User,
  Zap,
  Briefcase,
} from 'lucide-react';

export const AIMappingView: React.FC = () => {
  const { student, setActiveView } = useApp();

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Hello ${student.name}! I am your NexusSkill AI Career & Skill Mapping Advisor. Based on your verified score of ${student.readinessScore}% and your coursework in ${student.department}, I've mapped 4 premier industry career trajectories for you. What target career path or internship challenge would you like to explore today?`,
      time: 'Just now',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const careerTrajectories = [
    {
      role: 'Full Stack Cloud & AI Engineer',
      matchScore: 92,
      demandTrend: '+44% YoY',
      topHiring: ['Microsoft', 'Siemens', 'Google Cloud', 'Stripe'],
      acquiredSkills: ['React.js', 'Data Structures', 'Node.js Microservices'],
      missingSkills: ['Distributed Systems', 'Kubernetes Helm'],
      estComp: '₹18 - 28 LPA',
    },
    {
      role: 'Machine Learning & Edge AI Specialist',
      matchScore: 86,
      demandTrend: '+58% YoY',
      topHiring: ['NVIDIA', 'Intel', 'Qualcomm', 'Tesla'],
      acquiredSkills: ['Data Structures', 'LLM Fine-tuning', 'Python FastAPI'],
      missingSkills: ['CUDA Parallel C', 'TensorRT Quantization'],
      estComp: '₹22 - 35 LPA',
    },
    {
      role: 'Cloud DevOps & Site Reliability Engineer',
      matchScore: 78,
      demandTrend: '+35% YoY',
      topHiring: ['Amazon AWS', 'Oracle Cloud', 'Cisco', 'Razorpay'],
      acquiredSkills: ['Node.js', 'Basic Cloud AWS'],
      missingSkills: ['Kubernetes Operators', 'Terraform IaC', 'Prometheus/Grafana'],
      estComp: '₹16 - 25 LPA',
    },
    {
      role: 'Autonomous EV Embedded Firmware Engineer',
      matchScore: 72,
      demandTrend: '+28% YoY',
      topHiring: ['Tata Motors', 'Ola Electric', 'Bosch', 'Ather'],
      acquiredSkills: ['Algorithms', 'Cross-functional Communication'],
      missingSkills: ['CAN Bus Protocol', 'RTOS Embedded C', 'Battery BMS'],
      estComp: '₹14 - 20 LPA',
    },
  ];

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isSending) return;

    const userText = userInput.trim();
    setUserInput('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setIsSending(true);

    try {
      const response = await fetch('/api/ai/career-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userText,
          studentContext: {
            name: student.name,
            cgpa: student.cgpa,
            department: student.department,
            skills: student.skills.map((s) => `${s.name} (Lvl ${s.currentLevel})`),
            targetRole: student.targetRole,
          },
        }),
      });
      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer || 'Unable to generate response at this time.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I have logged your request. For the Cloud & AI role, focusing on containerization and event streaming pipelines is your highest ROI step this semester.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
              <Compass className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              AI-Powered Career & Skill Mapping Engine
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Intelligent semantic projection mapping student skill profiles into high-growth industry trajectories
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-100 px-3.5 py-2 text-xs font-semibold text-indigo-700">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>Powered by Gemini 3.8 Intelligence</span>
        </div>
      </div>

      {/* Trajectory Match Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerTrajectories.map((traj, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Career Trajectory {idx + 1}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 mt-0.5">
                  {traj.role}
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                  {traj.matchScore}% Match
                </span>
                <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                  {traj.demandTrend}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-y border-slate-100 py-2">
              <span>Avg Entry Compensation:</span>
              <strong className="text-slate-900">{traj.estComp}</strong>
            </div>

            {/* Skills breakdown */}
            <div className="mt-3 space-y-2 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-emerald-700">Acquired Strengths:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {traj.acquiredSkills.map((s, i) => (
                    <span key={i} className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800 border border-emerald-100">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-rose-700">Missing Competencies:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {traj.missingSkills.map((s, i) => (
                    <span key={i} className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-800 border border-rose-100">
                      ⚡ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Top Hiring: {traj.topHiring.slice(0, 2).join(', ')} +more
              </span>
              <button
                onClick={() => setActiveView('learning')}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Bridge Path <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Interactive Gemini Career Advisor Chatbot */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-[480px]">
        <div className="border-b border-slate-200 bg-slate-50/80 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
                NexusSkill AI Career Advisor
                <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[10px] font-bold text-emerald-700">
                  Online
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct consultation for skill roadmaps, resume tips, and placement strategy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {['How do I crack Siemens Edge AI interview?', 'Which certification has highest placement value?', 'Suggest a capstone project for Microsoft Cloud'].map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setUserInput(prompt);
                }}
                className="hidden xl:inline-block rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, idx) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'border border-slate-200 bg-slate-50 text-slate-800'
                      : 'bg-indigo-600 text-white shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`mt-1.5 block text-[10px] ${
                      isAi ? 'text-slate-400' : 'text-indigo-200'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {!isAi && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 animate-pulse">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                Gemini AI is analyzing industry hiring trends & generating tailored advice...
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <form onSubmit={handleSendMessage} className="border-t border-slate-200 p-3 bg-white flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask anything (e.g. 'How can I bridge my Kubernetes gap before Microsoft interviews?')..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!userInput.trim() || isSending}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
          >
            <span>Consult</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
