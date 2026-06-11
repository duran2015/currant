import { createContext, useContext, useState, ReactNode } from "react";
import { AppView, AppTab, UserProfile } from "./types";
import { mockUser } from "./data";

export interface AppState {
  viewStack: AppView[];
  currentTab: AppTab;
  appMode: "user" | "counselor";
  user: UserProfile;
  selectedCounselorId: string;
  bookingOrder: any;
  orders: any[];
  pushView: (view: AppView) => void;
  popView: () => void;
  resetToView: (view: AppView) => void;
  setTab: (tab: AppTab) => void;
  setAppMode: (mode: "user" | "counselor") => void;
  enterAppMode: (mode: "user" | "counselor") => void;
  updateUser: (data: Partial<UserProfile>) => void;
  setSelectedCounselorId: (id: string) => void;
  setBookingOrder: (order: any) => void;
  addOrder: (order: any) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewStack, setViewStack] = useState<AppView[]>(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) return ["login"];
    const mode = localStorage.getItem("appMode");
    return mode === "counselor" ? ["counselor-workbench"] : ["main"];
  });
  const [currentTab, setCurrentTab] = useState<AppTab>("home");
  const [appMode, setAppMode] = useState<"user" | "counselor">((localStorage.getItem("appMode") as any) || "user");
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [selectedCounselorId, setSelectedCounselorId] = useState<string>("c1");
  const [bookingOrder, setBookingOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const addOrder = (order: any) => {
    setOrders((prev) => [order, ...prev]);
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
    if (mode === "user") {
      setCurrentTab("home");
      resetToView("main");
      return;
    }
    resetToView("counselor-workbench");
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider
      value={{
        viewStack,
        currentTab,
        appMode,
        user,
        selectedCounselorId,
        bookingOrder,
        orders,
        pushView,
        popView,
        resetToView,
        setTab,
        setAppMode: handleSetAppMode,
        enterAppMode,
        updateUser,
        setSelectedCounselorId,
        setBookingOrder,
        addOrder,
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
