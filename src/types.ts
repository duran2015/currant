export type AppView =
  | "login"
  | "assessment"
  | "ai-interview"
  | "generation"
  | "main"
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
  | "ai-chat"
  | "tree-hole"
  | "mini-assessment-home"
  | "mini-assessment-test"
  | "mini-assessment-result"
  | "counselor-workbench"
  | "counselor-order-detail"
  | "counselor-patient-profile"
  | "counselor-earnings"
  | "user-order-detail"
  | "user-evaluation"
  | "counseling-summary-list"
  | "counseling-summary-detail"
  | "counselor-session-notes"
  | "profile-edit";

export type AppTab = "home" | "counseling" | "messages" | "profile";

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
  usedTrialCount?: number;
}

export interface BookingOrder {
  id: string;
  counselorId: string;
  date: string;
  time: string;
  price: number;
  type?: "text" | "voice" | "video";
  status:
    | "pending"
    | "paid"
    | "completed"
    | "cancelled"
    | "failed"
    | "refunded";
  isEvaluated?: boolean;
  counselorNotesWritten?: boolean;
}

export interface CounselorSchedule {
  date: string;
  label: string;
  isFull: boolean;
  times: string[];
}

export interface MVPCounselorSchedule {
  id: string;
  counselorId: string;
  date: string;
  shift: "morning" | "afternoon" | "evening";
  slotCount: number;
  status: "active" | "cancelled";
}

export interface Appointment {
  id: string;
  userId: string;
  counselorId: string;
  date: string;
  timeSlot: string;
  price: number;
  isTrial: boolean;
  status: "pending_payment" | "paid" | "in_progress" | "completed" | "cancelled" | "no_show";
  meetingUrl?: string;
  paidAt?: string;
  startedAt?: string;
  endedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt?: string;
}

// For frontend display mapping
export interface AvailableSlot {
  time: string;
  shift: string;
  available: boolean;
}

export interface AvailabilityResponse {
  date: string;
  slots: AvailableSlot[];
  price: number;
  isTrial: boolean;
}

export interface Counselor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  tags: string[]; // Keep for legacy if needed, or remove
  price: number;
  pricing?: {
    text: number;
    voice: number;
    video: number;
  };
  rating: number;
  reviewsCount: number;
  about: string;
  specialties: string[];
  schedules: CounselorSchedule[];
  type?: "pro" | "listener";
  status?: "online" | "busy" | "offline";
  styles?: string[];
  credentials?: string[];
  consultationCount?: number;
  serviceHours?: number;
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

// ----------------------------------------------------
// Blackboard State Pool Models (Agent Collaboration)
// ----------------------------------------------------

export interface BlackboardState {
  clinical: {
    phq2Score: number;
    severity: "轻度" | "中度" | "重度" | "危机" | "未评估";
    crisis: boolean;
  } | null;
  domain: {
    primary: "学业" | "工作" | "情感" | "家庭" | "社交" | "自我" | "说不清" | "未分类";
    secondary?: string;
  } | null;
  phase: 1 | 2 | 3 | 4;
  recommendation: {
    serviceLevel: "L1" | "L2" | "L3" | "L4";
    firstTool?: string;
    persona?: string;
  } | null;
}
