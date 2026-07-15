import { create } from "zustand";
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

export const useAppStore = create<AppState>((set, get) => ({
  viewStack: (() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) return ["login"];
    return ["main"];
  })(),
  currentTab: "home",
  appMode: (localStorage.getItem("appMode") as any) || "user",
  user: mockUser,
  blackboard: {
    clinical: null,
    domain: null,
    phase: 1,
    recommendation: {
      serviceLevel: "L1",
      firstTool: "呼吸引导",
      persona: "温暖陪伴"
    }
  },
  selectedCounselorId: "c1",
  selectedNotificationId: "n1",
  selectedConsultationId: "",
  selectedCounselorOrder: null,
  bookingOrder: null,
  orders: mockOrders,
  assessmentRecords: mockAssessmentRecords,
  activeCallSession: null,
  isCallMinimized: false,
  isSessionCounselorDetail: false,
  counselorStatus: "active",
  activeOrderTab: "all",
  assessmentState: {
    step: 0,
    answers: { stage: "", domain: "" },
    phq2Scores: [-1, -1],
    phq2Step: 0,
  },
  aiSettings: {
    avatar: "otter",
    fontSize: "medium",
    theme: "light",
    voice: "gentle",
    autoPlayVoice: false,
  },

  setAssessmentState: (state: any) => set({ assessmentState: state }),
  updateAISettings: (settings: Partial<AppState["aiSettings"]>) => 
    set((state) => ({ aiSettings: { ...state.aiSettings, ...settings } })),
  
  addOrder: (order: any) => set((state) => ({ orders: [order, ...state.orders] })),
  
  updateOrder: (orderId: string, data: any) => set((state) => {
    const newOrders = state.orders.map(o => o.id === orderId ? { ...o, ...data } : o);
    const newSelectedOrder = state.selectedCounselorOrder?.id === orderId ? { ...state.selectedCounselorOrder, ...data } : state.selectedCounselorOrder;
    const newBookingOrder = state.bookingOrder?.id === orderId ? { ...state.bookingOrder, ...data } : state.bookingOrder;
    return { orders: newOrders, selectedCounselorOrder: newSelectedOrder, bookingOrder: newBookingOrder };
  }),

  pushView: (view: AppView) => set((state) => ({ viewStack: [...state.viewStack, view] })),
  popView: () => set((state) => ({ viewStack: state.viewStack.length > 1 ? state.viewStack.slice(0, -1) : state.viewStack })),
  
  resetToView: (view: AppView) => {
    set({ viewStack: [view] });
    if (view === "main" || view === "counselor-workbench") {
      localStorage.setItem("isLoggedIn", "true");
    } else if (view === "login") {
      localStorage.removeItem("isLoggedIn");
    }
  },

  setTab: (tab: AppTab) => set({ currentTab: tab }),
  
  setAppMode: (mode: "user" | "counselor") => {
    set({ appMode: mode });
    localStorage.setItem("appMode", mode);
  },

  enterAppMode: (mode: "user" | "counselor") => {
    set({ appMode: mode, currentTab: "home" });
    localStorage.setItem("appMode", mode);
    get().resetToView("main");
  },

  updateUser: (data: Partial<UserProfile>) => set((state) => ({ user: { ...state.user, ...data } })),
  updateBlackboard: (data: Partial<BlackboardState>) => set((state) => ({ blackboard: { ...state.blackboard, ...data } })),
  
  setSelectedCounselorId: (id: string) => set({ selectedCounselorId: id }),
  setSelectedNotificationId: (id: string) => set({ selectedNotificationId: id }),
  setSelectedConsultationId: (id: string) => set({ selectedConsultationId: id }),
  setSelectedCounselorOrder: (order: any) => set({ selectedCounselorOrder: order }),
  setBookingOrder: (order: any) => set({ bookingOrder: order }),
  setOrders: (orders: any[]) => set({ orders }),
  setAssessmentRecords: (records: any[]) => set({ assessmentRecords: records }),
  setActiveCallSession: (session: any | null) => set({ activeCallSession: session }),
  setIsCallMinimized: (minimized: boolean) => set({ isCallMinimized: minimized }),
  setIsSessionCounselorDetail: (isSession: boolean) => set({ isSessionCounselorDetail: isSession }),
  setCounselorStatus: (status: "active" | "paused") => set({ counselorStatus: status }),
  setActiveOrderTab: (tab: "all" | "pending" | "completed" | "cancelled") => set({ activeOrderTab: tab }),
}));
