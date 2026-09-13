import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AssessmentQuestion } from '../types';
import {
  Brain,
  Timer,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Award,
  BookOpen,
  HelpCircle,
  Check,
  Zap,
} from 'lucide-react';

export const SkillAssessmentView: React.FC = () => {
  const { questions, updateStudentSkill, student, setActiveView } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'soft-skills' | 'problem-solving'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 mins
  const [isCustomAiLoading, setIsCustomAiLoading] = useState(false);
  const [customSkillTopic, setCustomSkillTopic] = useState('Distributed Systems & Cloud (AWS/GCP)');
  const [testQuestions, setTestQuestions] = useState<AssessmentQuestion[]>(questions);

  const filteredQuestions = activeCategory === 'all' 
    ? testQuestions 
    : testQuestions.filter((q) => q.category === activeCategory);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // Calculate score
  const correctCount = filteredQuestions.filter((q, idx) => selectedAnswers[idx] === q.correctAnswer).length;
  const scorePercent = Math.round((correctCount / (filteredQuestions.length || 1)) * 100);

  // Apply results to student profile
  const handleCommitResults = () => {
    // If score >= 60%, level up target skills
    if (scorePercent >= 60) {
      const targetSkill = student.skills.find(
        (s) => s.name.toLowerCase().includes('distributed') || s.name.toLowerCase().includes('cloud')
      );
      if (targetSkill) {
        updateStudentSkill(targetSkill.id, Math.min(5, targetSkill.currentLevel + 1));
      }
    }
    setActiveView('skill-gap');
  };

  // AI dynamic quiz generation
  const handleGenerateAiQuestion = async () => {
    setIsCustomAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillTopic: customSkillTopic }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        const newQs: AssessmentQuestion[] = data.questions.map((q: any, i: number) => ({
          id: `ai-q-${Date.now()}-${i}`,
          category: 'technical',
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          skillTarget: customSkillTopic,
          weight: 20,
        }));
        setTestQuestions((prev) => [...newQs, ...prev]);
        setCurrentIdx(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setSecondsRemaining(300);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCustomAiLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <Brain className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Adaptive Skill & Aptitude Assessment
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Standardized questionnaires benchmarked by corporate engineering councils (Siemens, Microsoft, IEEE)
          </p>
        </div>

        {/* Live Timer and Category Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs font-bold text-slate-800">
            <Timer className={`h-4 w-4 ${secondsRemaining < 60 ? 'text-rose-600 animate-pulse' : 'text-slate-500'}`} />
            <span>Time Left: {formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => {
              setSelectedAnswers({});
              setIsSubmitted(false);
              setCurrentIdx(0);
              setSecondsRemaining(300);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* AI Custom Quiz Generator Bar */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-white p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Gemini AI Dynamic Assessment Generator
              </h4>
              <p className="text-[11px] text-slate-500">
                Synthesize instant, industry-vetted questions on any specialized technical domain
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={customSkillTopic}
              onChange={(e) => setCustomSkillTopic(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs focus:border-indigo-500 focus:outline-none"
            >
              <option value="Distributed Systems & Cloud (AWS/GCP)">Distributed Systems & Cloud</option>
              <option value="Docker, Kubernetes & CI/CD Pipelines">Docker, K8s & CI/CD</option>
              <option value="Machine Learning & LLM Fine-tuning">Machine Learning & LLM</option>
              <option value="Cybersecurity & Zero Trust Architecture">Cybersecurity & Zero Trust</option>
              <option value="Industrial IoT & Sensor Telemetry">Industrial IoT & Telemetry</option>
            </select>

            <button
              onClick={handleGenerateAiQuestion}
              disabled={isCustomAiLoading}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50"
            >
              <Zap className="h-3.5 w-3.5" />
              {isCustomAiLoading ? 'Synthesizing...' : 'Generate Questions'}
            </button>
          </div>
        </div>
      </div>

      {/* Assessment Question Interface */}
      {!isSubmitted ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
              <span>
                Question <strong>{currentIdx + 1}</strong> of {filteredQuestions.length}
              </span>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 capitalize">
                {currentQ.category} • Target: {currentQ.skillTarget}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h2 className="font-display text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full flex items-start gap-3 rounded-2xl p-4 text-left text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-2 border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSubmitted(true)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Submit Early
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
              >
                {currentIdx === filteredQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Report Screen */
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-3 shadow-inner">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Assessment Evaluation Complete
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your answers have been audited against the Industry Skill Competency Rubric
            </p>

            <div className="mt-6 flex items-center justify-center gap-8 rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <div>
                <div className="font-display text-3xl font-bold text-slate-900">{scorePercent}%</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Score Earned</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="font-display text-3xl font-bold text-emerald-600">
                  {correctCount} / {filteredQuestions.length}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Correct Answers</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="font-display text-3xl font-bold text-indigo-600">
                  {scorePercent >= 60 ? 'PASSED' : 'RETEST'}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Industry Status</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={handleCommitResults}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" />
              Update Verified Skill Ledger (+Level)
            </button>
            <button
              onClick={() => {
                setSelectedAnswers({});
                setIsSubmitted(false);
                setCurrentIdx(0);
                setSecondsRemaining(300);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Assessment
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-display text-sm font-bold text-slate-900 mb-4">
              Detailed Question Analysis & Industry Rationale
            </h3>

            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border p-4 text-xs ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">Question {idx + 1}</span>
                          <span className="font-semibold text-[10px] text-slate-500 uppercase">{q.skillTarget}</span>
                        </div>
                        <p className="font-medium text-slate-900 mb-2">{q.question}</p>

                        <div className="space-y-1 mb-2">
                          <p className="text-slate-600">
                            Your selection: <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                              {userAns !== undefined ? q.options[userAns] : 'Not Answered'}
                            </strong>
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-700">
                              Correct answer: <strong>{q.options[q.correctAnswer]}</strong>
                            </p>
                          )}
                        </div>

                        <div className="rounded-xl bg-white/80 p-2.5 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
                          <strong>Industry Rationale:</strong> {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
