import { createContext, useContext, useState, ReactNode } from "react";
import { AppView, AppTab, UserProfile, BlackboardState } from "./types";
import { mockUser, mockOrders, mockAssessmentRecords } from "./data";

export interface AppState {
  viewStack: AppView[];
  currentTab: AppTab;
  appMode: "user" | "counselor";
  user: UserProfile;
  blackboard: BlackboardState;
  selectedCounselorId: string;
  selectedNotificationId: string;
  selectedConsultationId: string;
  selectedCounselorOrder: any;
  bookingOrder: any;
  orders: any[];
  assessmentRecords: any[];
  activeCallSession: any | null;
  isCallMinimized: boolean;
  assessmentState: {
    step: number;
    answers: { stage: string; domain: string };
    phq2Scores: number[];
    phq2Step: number;
  };
  aiSettings: {
    avatar: "elephant" | "cat";
    fontSize: "small" | "medium" | "large";
    theme: "light" | "dark";
    voice: "gentle" | "sexy" | "neutral";
    autoPlayVoice: boolean;
  };
  setAssessmentState: (state: any) => void;
  updateAISettings: (settings: Partial<AppState["aiSettings"]>) => void;
  pushView: (view: AppView) => void;
  popView: () => void;
  resetToView: (view: AppView) => void;
  setTab: (tab: AppTab) => void;
  setAppMode: (mode: "user" | "counselor") => void;
  enterAppMode: (mode: "user" | "counselor") => void;
  updateUser: (data: Partial<UserProfile>) => void;
  updateBlackboard: (data: Partial<BlackboardState>) => void;
  setSelectedCounselorId: (id: string) => void;
  setSelectedNotificationId: (id: string) => void;
  setSelectedConsultationId: (id: string) => void;
  setSelectedCounselorOrder: (order: any) => void;
  setBookingOrder: (order: any) => void;
  setOrders: (orders: any[]) => void;
  addOrder: (order: any) => void;
  updateOrder: (orderId: string, data: any) => void;
  setAssessmentRecords: (records: any[]) => void;
  setActiveCallSession: (session: any | null) => void;
  setIsCallMinimized: (minimized: boolean) => void;
  isSessionCounselorDetail: boolean;
  setIsSessionCounselorDetail: (isSession: boolean) => void;
  counselorStatus: "active" | "paused";
  setCounselorStatus: (status: "active" | "paused") => void;
  activeOrderTab: "all" | "pending" | "completed" | "cancelled";
  setActiveOrderTab: (tab: "all" | "pending" | "completed" | "cancelled") => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewStack, setViewStack] = useState<AppView[]>(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) return ["login"];
    return ["main"];
  });
  const [currentTab, setCurrentTab] = useState<AppTab>("home");
  const [appMode, setAppMode] = useState<"user" | "counselor">((localStorage.getItem("appMode") as any) || "user");
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [blackboard, setBlackboard] = useState<BlackboardState>({
    clinical: null,
    domain: null,
    phase: 1,
    recommendation: {
      serviceLevel: "L1",
      firstTool: "呼吸引导",
      persona: "温暖陪伴"
    }
  });
  const [selectedCounselorId, setSelectedCounselorId] = useState<string>("c1");
  const [selectedNotificationId, setSelectedNotificationId] = useState<string>("n1");
  const [selectedConsultationId, setSelectedConsultationId] = useState<string>("");
  const [selectedCounselorOrder, setSelectedCounselorOrder] = useState<any>(null);
  const [bookingOrder, setBookingOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>(mockOrders);
  const [assessmentRecords, setAssessmentRecords] = useState<any[]>(mockAssessmentRecords);
  const [activeCallSession, setActiveCallSession] = useState<any | null>(null);
  const [isCallMinimized, setIsCallMinimized] = useState<boolean>(false);
  const [isSessionCounselorDetail, setIsSessionCounselorDetail] = useState<boolean>(false);
  const [counselorStatus, setCounselorStatus] = useState<"active" | "paused">("active");
  const [activeOrderTab, setActiveOrderTab] = useState<"all" | "pending" | "completed" | "cancelled">("all");
  const [assessmentState, setAssessmentState] = useState({
    step: 0,
    answers: { stage: "", domain: "" },
    phq2Scores: [-1, -1],
    phq2Step: 0,
  });
  const [aiSettings, setAISettings] = useState<AppState["aiSettings"]>({
    avatar: "otter",
    fontSize: "medium",
    theme: "light",
    voice: "gentle",
    autoPlayVoice: false,
  });

  const updateAISettings = (settings: Partial<AppState["aiSettings"]>) => {
    setAISettings((prev) => ({ ...prev, ...settings }));
  };

  const addOrder = (order: any) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrder = (orderId: string, data: any) => {
    setOrders((prev) => prev.map(o => o.id === orderId ? { ...o, ...data } : o));
    if (selectedCounselorOrder?.id === orderId) {
      setSelectedCounselorOrder((prev: any) => ({ ...prev, ...data }));
    }
    if (bookingOrder?.id === orderId) {
      setBookingOrder((prev: any) => ({ ...prev, ...data }));
    }
  };

  const pushView = (view: AppView) => {
    setViewStack((prev) => [...prev, view]);
  };

  const popView = () => {
    setViewStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const resetToView = (view: AppView) => {
    setViewStack([view]);
    if (view === "main" || view === "counselor-workbench") {
      localStorage.setItem("isLoggedIn", "true");
    } else if (view === "login") {
      localStorage.removeItem("isLoggedIn");
    }
  };

  const setTab = (tab: AppTab) => {
    setCurrentTab(tab);
  };
  
  const handleSetAppMode = (mode: "user" | "counselor") => {
    setAppMode(mode);
    localStorage.setItem("appMode", mode);
  };

  const enterAppMode = (mode: "user" | "counselor") => {
    handleSetAppMode(mode);
    setCurrentTab("home");
    resetToView("main");
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const updateBlackboard = (data: Partial<BlackboardState>) => {
    setBlackboard((prev) => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider
      value={{
        viewStack,
        currentTab,
        appMode,
        user,
        blackboard,
        selectedCounselorId,
        selectedNotificationId,
        selectedConsultationId,
        selectedCounselorOrder,
        bookingOrder,
        orders,
        assessmentRecords,
        activeCallSession,
        isCallMinimized,
        assessmentState,
        aiSettings,
        setAssessmentState,
        updateAISettings,
        pushView,
        popView,
        resetToView,
        setTab,
        setAppMode: handleSetAppMode,
        enterAppMode,
        updateUser,
        updateBlackboard,
        setSelectedCounselorId,
        setSelectedNotificationId,
        setSelectedConsultationId,
        setSelectedCounselorOrder,
        setBookingOrder,
        setOrders,
        addOrder,
        updateOrder,
        setAssessmentRecords,
        setActiveCallSession,
        setIsCallMinimized,
        isSessionCounselorDetail,
        setIsSessionCounselorDetail,
        counselorStatus,
        setCounselorStatus,
        activeOrderTab,
        setActiveOrderTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
}
