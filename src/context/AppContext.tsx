import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  NavView,
  StudentProfile,
  Opportunity,
  Application,
  LearningCourse,
  FacultyOpportunity,
  MentorshipSlot,
  InnovationChallenge,
  DepartmentMetric,
  AssessmentQuestion,
} from '../types';
import {
  initialStudent,
  initialOpportunities,
  initialApplications,
  initialCourses,
  initialFacultyOpportunities,
  initialMentors,
  initialChallenges,
  departmentAnalytics,
  sampleAssessmentQuestions,
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: NavView;
  setActiveView: (view: NavView) => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  courses: LearningCourse[];
  setCourses: React.Dispatch<React.SetStateAction<LearningCourse[]>>;
  facultyOpps: FacultyOpportunity[];
  setFacultyOpps: React.Dispatch<React.SetStateAction<FacultyOpportunity[]>>;
  mentors: MentorshipSlot[];
  challenges: InnovationChallenge[];
  metrics: DepartmentMetric[];
  questions: AssessmentQuestion[];
  
  // Actions
  applyToOpportunity: (oppId: string, customNote?: string) => boolean;
  updateApplicationStatus: (appId: string, status: Application['status']) => void;
  enrollCourse: (courseId: string) => void;
  completeCourseStep: (courseId: string) => void;
  updateStudentSkill: (skillId: string, newLevel: number) => void;
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'applicantsCount' | 'postedDate'>) => void;
  bookMentorSlot: (mentorId: string) => void;
  applyFacultyOpp: (oppId: string) => void;
  notifications: Array<{ id: string; title: string; time: string; read: boolean; type: 'success' | 'info' | 'alert' }>;
  markNotificationsRead: () => void;
  isAiAnalyzing: boolean;
  setIsAiAnalyzing: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [activeView, setActiveView] = useState<NavView>('overview');
  const [student, setStudent] = useState<StudentProfile>(initialStudent);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [courses, setCourses] = useState<LearningCourse[]>(initialCourses);
  const [facultyOpps, setFacultyOpps] = useState<FacultyOpportunity[]>(initialFacultyOpportunities);
  const [mentors, setMentors] = useState<MentorshipSlot[]>(initialMentors);
  const [challenges, setChallenges] = useState<InnovationChallenge[]>(initialChallenges);
  const [metrics, setMetrics] = useState<DepartmentMetric[]>(departmentAnalytics);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(sampleAssessmentQuestions);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Siemens Industrial AI issued an official Offer Letter (₹18.5 LPA)!',
      time: '10m ago',
      read: false,
      type: 'success' as const,
    },
    {
      id: 'n2',
      title: 'Interview scheduled: Microsoft Cloud Architecture Team (March 18)',
      time: '1h ago',
      read: false,
      type: 'info' as const,
    },
    {
      id: 'n3',
      title: 'New Skill Gap recommendation: Production Docker & K8s bootcamp',
      time: '3h ago',
      read: false,
      type: 'alert' as const,
    },
  ]);

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const applyToOpportunity = (oppId: string, customNote?: string): boolean => {
    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return false;

    // Check if already applied
    if (applications.some((a) => a.opportunityId === oppId && a.studentId === student.id)) {
      return false;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      company: opp.company,
      studentId: student.id,
      studentName: student.name,
      studentRole: student.targetRole,
      appliedDate: 'Just now',
      status: 'applied',
      matchScore: opp.matchScore || 85,
      feedbackNotes: customNote ? `Candidate Note: "${customNote}"` : 'Application transmitted to corporate recruiting ATS.',
      salaryOrStipend: opp.stipendOrSalary,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increment applicants count
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, applicantsCount: o.applicantsCount + 1 } : o))
    );

    // Push notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Applied successfully to ${opp.company} for ${opp.title}`,
        time: 'Just now',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);

    return true;
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const enrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: true, progress: 10 } : c))
    );
  };

  const completeCourseStep = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const nextProgress = Math.min(100, c.progress + 25);
          // If completed, boost the target skill level!
          if (nextProgress === 100) {
            setStudent((s) => ({
              ...s,
              readinessScore: Math.min(100, s.readinessScore + 3),
              skills: s.skills.map((sk) =>
                sk.name.toLowerCase().includes(c.targetSkill.toLowerCase()) ||
                c.targetSkill.toLowerCase().includes(sk.name.toLowerCase())
                  ? { ...sk, currentLevel: Math.min(5, sk.currentLevel + 1), verified: true }
                  : sk
              ),
            }));
          }
          return { ...c, progress: nextProgress };
        }
        return c;
      })
    );
  };

  const updateStudentSkill = (skillId: string, newLevel: number) => {
    setStudent((prev) => {
      const updatedSkills = prev.skills.map((sk) =>
        sk.id === skillId ? { ...sk, currentLevel: newLevel, verified: true } : sk
      );
      // Recalculate readiness
      const totalPossible = updatedSkills.length * 5;
      const totalEarned = updatedSkills.reduce((acc, curr) => acc + curr.currentLevel, 0);
      const newScore = Math.round((totalEarned / totalPossible) * 100);

      return {
        ...prev,
        skills: updatedSkills,
        readinessScore: newScore,
      };
    });
  };

  const addOpportunity = (oppData: Omit<Opportunity, 'id' | 'applicantsCount' | 'postedDate'>) => {
    const newOpp: Opportunity = {
      ...oppData,
      id: `opp-${Date.now()}`,
      applicantsCount: 0,
      postedDate: 'Just now',
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Industry posting published: ${newOpp.title} at ${newOpp.company}`,
        time: 'Just now',
        read: false,
        type: 'info',
      },
      ...prev,
    ]);
  };

  const bookMentorSlot = (mentorId: string) => {
    const mentor = mentors.find((m) => m.id === mentorId);
    if (!mentor) return;
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `1-on-1 Mentorship session confirmed with ${mentor.mentorName} (${mentor.company})!`,
        time: 'Just now',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);
  };

  const applyFacultyOpp = (oppId: string) => {
    setFacultyOpps((prev) =>
      prev.map((f) => (f.id === oppId ? { ...f, status: 'applied' } : f))
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Faculty Sabbatical application registered with industry partner.`,
        time: 'Just now',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        student,
        setStudent,
        opportunities,
        setOpportunities,
        applications,
        setApplications,
        courses,
        setCourses,
        facultyOpps,
        setFacultyOpps,
        mentors,
        challenges,
        metrics,
        questions,
        applyToOpportunity,
        updateApplicationStatus,
        enrollCourse,
        completeCourseStep,
        updateStudentSkill,
        addOpportunity,
        bookMentorSlot,
        applyFacultyOpp,
        notifications,
        markNotificationsRead,
        isAiAnalyzing,
        setIsAiAnalyzing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
