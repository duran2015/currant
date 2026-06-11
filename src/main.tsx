import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider, useAppStore } from "./store";
import { MobileLayout } from "./components/MobileLayout";
import { AnimatePresence } from "motion/react";
import "./index.css";

// Pages
import { Login } from "./pages/Onboarding/Login";
import { CompleteProfile } from "./pages/Onboarding/CompleteProfile";
import { Assessment } from "./pages/Onboarding/Assessment";
import { AIInterview } from "./pages/Onboarding/AIInterview";
import { ProfileGeneration } from "./pages/Onboarding/ProfileGeneration";
import { MainLayout } from "./components/MainLayout";
import { CounselorList } from "./pages/Counseling/CounselorList";
import { CounselorDetail } from "./pages/Counseling/CounselorDetail";
import { Booking } from "./pages/Counseling/Booking";
import { Payment } from "./pages/Counseling/Payment";
import { VoiceCall } from "./pages/Counseling/VoiceCall";
import { CallSummary } from "./pages/Counseling/CallSummary";
import { OrdersList } from "./pages/Counseling/OrdersList";
import { ProfileReport } from "./pages/Profile/ProfileReport";
import { AssessmentRecords } from "./pages/Profile/AssessmentRecords";
import { AIChatRecords } from "./pages/Profile/AIChatRecords";
import { TextChat } from "./pages/Counseling/TextChat";

import { TreeHole } from "./pages/Main/TreeHole";
import { MiniAssessmentHome } from "./pages/Onboarding/MiniAssessmentHome";
import { MiniAssessmentTest } from "./pages/Onboarding/MiniAssessmentTest";
import { MiniAssessmentResult } from "./pages/Onboarding/MiniAssessmentResult";

// Counselor App Pages
import { CounselorWorkbench } from "./pages/Counseling/CounselorWorkbench";
import { CounselorOrderDetail } from "./pages/Counseling/CounselorOrderDetail";
import { CounselorPatientProfile } from "./pages/Counseling/CounselorPatientProfile";

function ViewManager() {
  const { viewStack } = useAppStore();
  const currentView = viewStack[viewStack.length - 1];

  return (
    <AnimatePresence mode="wait">
      {currentView === "login" && <Login key="login" />}
      {currentView === "complete-profile" && (
        <CompleteProfile key="complete-profile" />
      )}
      {currentView === "assessment" && <Assessment key="assessment" />}
      {currentView === "ai-interview" && <AIInterview key="ai-interview" />}
      {currentView === "generation" && <ProfileGeneration key="generation" />}

      {/* Main Tab Wrapper maintains continuous presence unless replaced linearly by full screen sub-views */}
      {(currentView === "main" ||
        currentView.startsWith("counseling-") ||
        currentView === "orders-list" ||
        currentView === "profile-report" ||
        currentView === "assessment-records" ||
        currentView === "ai-chat-records") && <MainLayout key="main" />}

      {/* Counselor Dashboard - Separate from MainLayout */}
      {currentView === "counselor-workbench" && <CounselorWorkbench key="c_workbench" />}

      {/* Sub views stacked above Main Layout absolutely */}
      {currentView === "counseling-list" && <CounselorList key="clist" />}
      {currentView === "counseling-detail" && <CounselorDetail key="cdetail" />}
      {currentView === "counseling-booking" && <Booking key="cbooking" />}
      {currentView === "counseling-payment" && <Payment key="cpayment" />}
      {currentView === "counseling-call" && <VoiceCall key="ccall" />}
      {currentView === "counseling-text-chat" && <TextChat key="tchat" />}
      {currentView === "counseling-summary" && <CallSummary key="csummary" />}
      {currentView === "orders-list" && <OrdersList key="orders" />}
      {currentView === "profile-report" && <ProfileReport key="preport" />}
      {currentView === "assessment-records" && (
        <AssessmentRecords key="arecords" />
      )}
      {currentView === "ai-chat-records" && <AIChatRecords key="achat_rec" />}
      {currentView === "tree-hole" && <TreeHole key="tree_hole" />}
      {currentView === "mini-assessment-home" && (
        <MiniAssessmentHome key="mini_home" />
      )}
      {currentView === "mini-assessment-test" && (
        <MiniAssessmentTest key="mini_test" />
      )}
      {currentView === "mini-assessment-result" && (
        <MiniAssessmentResult key="mini_result" />
      )}
      {currentView === "counselor-order-detail" && <CounselorOrderDetail key="c_order_detail" />}
      {currentView === "counselor-patient-profile" && <CounselorPatientProfile key="c_pt_profile" />}
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <MobileLayout>
        <ViewManager />
      </MobileLayout>
    </AppProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
