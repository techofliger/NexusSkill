export type UserRole = 'student' | 'industry' | 'academician' | 'institution';

export type NavView = 
  | 'overview' 
  | 'skill-assessment' 
  | 'skill-gap' 
  | 'ai-mapping' 
  | 'learning' 
  | 'opportunities' 
  | 'portfolio' 
  | 'collaboration' 
  | 'institution-analytics' 
  | 'tracking';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Core CS' | 'Soft Skills' | 'Cloud & DevOps' | 'AI & Data';
  currentLevel: number; // 1 to 5
  benchmarkLevel: number; // 1 to 5 required by industry
  verified: boolean;
  verifiedBy?: string;
  endorsementCount: number;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  verifiedByFaculty: boolean;
  facultyName?: string;
}

export interface StudentCertification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verified: boolean;
  badgeUrl?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rollNumber: string;
  institution: string;
  department: string;
  year: string;
  cgpa: number;
  targetRole: string;
  readinessScore: number;
  digitalPassportHash: string;
  skills: SkillItem[];
  projects: StudentProject[];
  certifications: StudentCertification[];
  achievements: string[];
  resumeName?: string;
}

export type OpportunityType = 'internship' | 'placement' | 'project' | 'faculty-training';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  type: OpportunityType;
  department: string[];
  location: string;
  remoteType: 'Remote' | 'Hybrid' | 'On-site';
  stipendOrSalary: string;
  duration: string;
  requiredSkills: Array<{ name: string; level: number }>;
  applicantsCount: number;
  postedDate: string;
  deadline: string;
  description: string;
  eligibility: string;
  openings: number;
  matchScore?: number;
}

export type ApplicationStatus = 'applied' | 'screening' | 'assessment' | 'interview' | 'offered' | 'rejected';

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  studentId: string;
  studentName: string;
  studentRole: string;
  appliedDate: string;
  status: ApplicationStatus;
  matchScore: number;
  feedbackNotes?: string;
  interviewSchedule?: string;
  salaryOrStipend?: string;
}

export interface LearningCourse {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetSkill: string;
  rating: number;
  enrolled: boolean;
  progress: number;
  certificationType: string;
  isFree: boolean;
  description: string;
}

export type FacultyOppType = 'sabbatical' | 'fdp' | 'consultancy' | 'joint-rd';

export interface FacultyOpportunity {
  id: string;
  title: string;
  company: string;
  domain: string;
  type: FacultyOppType;
  duration: string;
  grantOrStipend: string;
  eligibility: string;
  deadline: string;
  status: 'open' | 'applied' | 'shortlisted';
  description: string;
}

export interface MentorshipSlot {
  id: string;
  mentorName: string;
  mentorRole: string;
  company: string;
  avatar: string;
  domains: string[];
  availability: string;
  rating: number;
  sessionDuration: string;
  verified: boolean;
}

export interface InnovationChallenge {
  id: string;
  title: string;
  company: string;
  prizePool: string;
  submissionDeadline: string;
  problemStatement: string;
  registeredTeams: number;
  tags: string[];
}

export interface DepartmentMetric {
  department: string;
  studentsCount: number;
  assessedCount: number;
  placementReadyPercent: number;
  avgSkillScore: number;
  topGapSkill: string;
  partnerCount: number;
  placedPercent: number;
}

export interface AssessmentQuestion {
  id: string;
  category: 'technical' | 'soft-skills' | 'problem-solving';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  skillTarget: string;
  weight: number;
}
