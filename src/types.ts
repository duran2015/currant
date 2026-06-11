export type AppView =
  | "login"
  | "complete-profile"
  | "assessment"
  | "ai-interview"
  | "generation"
  | "main"
  | "counseling-list"
  | "counseling-detail"
  | "counseling-booking"
  | "counseling-payment"
  | "counseling-call"
  | "counseling-text-chat"
  | "counseling-summary"
  | "orders-list"
  | "profile-report"
  | "assessment-records"
  | "ai-chat-records"
  | "tree-hole"
  | "mini-assessment-home"
  | "mini-assessment-test"
  | "mini-assessment-result"
  | "counselor-workbench"
  | "counselor-order-detail"
  | "counselor-patient-profile"
  | "counselor-earnings";

export type AppTab = "home" | "ai" | "profile";

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  age?: number;
  school?: string;
  major?: string;
  grade?: string;
  statusScore: number;
  statusTrend: number;
  statusSummary: string;
  isNewUser: boolean;
  hasRisk: boolean;
  role: "guest" | "registered" | "active";
}

export interface BookingOrder {
  id: string;
  counselorId: string;
  date: string;
  time: string;
  price: number;
  type?: "text" | "voice";
  status:
    | "pending"
    | "paid"
    | "completed"
    | "cancelled"
    | "failed"
    | "refunded";
}

export interface CounselorSchedule {
  date: string;
  label: string;
  isFull: boolean;
  times: string[];
}

export interface Counselor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  tags: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  about: string;
  specialties: string[];
  schedules: CounselorSchedule[];
  type?: "pro" | "listener";
  status?: "online" | "busy" | "offline";
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface TodayTask {
  id: string;
  title: string;
  duration: string;
  reason: string;
  type: "breathing" | "meditation" | "cbt" | "journal";
}

// ----------------------------------------------------
// Data Architecture Systems Models
// ----------------------------------------------------

export interface ProfileTag {
  id: string;
  name: string;
  category: "emotion" | "personality" | "relationship" | "development";
  weight: number; // 0-1
}

export interface RiskProfile {
  level: "low" | "medium" | "high" | "critical";
  lastTriggers: string[];
  requiresIntervention: boolean;
  lastUpdated: string;
}

export interface AdvancedUserProfile extends UserProfile {
  userId: string;
  basicInfo: {
    age?: number;
    gender?: string;
    occupation?: string;
  };
  psychStats: {
    currentScore: number;
    trend: number;
    stressLevel: "low" | "medium" | "high";
  };
  tagsDetails: ProfileTag[];
  riskProfile: RiskProfile;
}

export interface AssessmentRecord {
  id: string;
  assessmentId: string; // e.g. 'PHQ-9'
  title: string;
  date: string;
  score: number;
  result: string;
  tagsGenerated: string[];
}

export interface ConsultationRecord {
  id: string;
  orderId: string;
  counselorId: string;
  date: string;
  duration: number; // minutes
  summary: string;
  counselorNotes: string;
  clientFeedback?: {
    rating: number;
    content: string;
  };
  actionItems: {
    text: string;
    completed: boolean;
  }[];
}
