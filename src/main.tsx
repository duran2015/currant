import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useAppStore } from "./store";
import { MobileLayout } from "./components/MobileLayout";
import { motion, AnimatePresence } from "motion/react";
import "./index.css";

// Pages
import { Login } from "./pages/Onboarding/Login";
import { Assessment } from "./pages/Onboarding/Assessment";
import { AIInterview } from "./pages/Onboarding/AIInterview";
import { ProfileGeneration } from "./pages/Onboarding/ProfileGeneration";
import { MainLayout } from "./components/MainLayout";
import { AITab } from "./pages/Main/AITab";
import { Payment } from "./pages/Counseling/Payment";
import { UserEvaluation } from "./pages/Counseling/UserEvaluation";
import { CounselorSessionNotes } from "./pages/Counseling/CounselorSessionNotes";
import { Booking } from "./pages/Counseling/Booking";
import { BookingConfirm } from "./pages/Counseling/BookingConfirm";
import { PreCounselingQuestionnaire } from "./pages/Counseling/PreCounselingQuestionnaire";
import { VoiceCall } from "./pages/Counseling/VoiceCall";
import { CallSummary } from "./pages/Counseling/CallSummary";
import { OrdersList } from "./pages/Counseling/OrdersList";
import { ProfileReport } from "./pages/Profile/ProfileReport";
import { AssessmentRecords } from "./pages/Profile/AssessmentRecords";
import { AIChatRecords } from "./pages/Profile/AIChatRecords";
import { TextChat } from "./pages/Counseling/TextChat";
import { NotificationsList } from "./pages/Main/NotificationsList";
import { NotificationDetail } from "./pages/Main/NotificationDetail";
import { ConsultationRecords } from "./pages/Profile/ConsultationRecords";
import { ConsultationDetail } from "./pages/Profile/ConsultationDetail";
import { AISettings } from "./pages/Main/AISettings";

import { TreeHole } from "./pages/Main/TreeHole";
import { MiniAssessmentHome } from "./pages/Onboarding/MiniAssessmentHome";
import { MiniAssessmentTest } from "./pages/Onboarding/MiniAssessmentTest";
import { MiniAssessmentResult } from "./pages/Onboarding/MiniAssessmentResult";
import { 
  BreathingTool, 
  WhiteNoiseTool, 
  MuyuTool, 
  MeditationTool, 
  SleepGuideTool, 
  BubbleWrapTool 
} from "./pages/Main/ReliefTools";

// Counselor App Pages
import { CounselorWorkbench } from "./pages/Counseling/CounselorWorkbench";
import { CounselorOrderDetail } from "./pages/Counseling/CounselorOrderDetail";
import { CounselorPatientProfile } from "./pages/Counseling/CounselorPatientProfile";
import { CounselorDetail } from "./pages/Counseling/CounselorDetail";
import { UserOrderDetail } from "./pages/Counseling/UserOrderDetail";
import { AssessmentReportDetail } from "./pages/Profile/AssessmentReportDetail";
import { CounselingSummaryList } from "./pages/Profile/CounselingSummaryList";
import { CounselingSummaryDetail } from "./pages/Profile/CounselingSummaryDetail";
import { ProfileEdit } from "./pages/Profile/ProfileEdit";
import { CounselorOnboarding } from "./pages/Counseling/CounselorOnboarding";
import { CounselorBoundary } from "./pages/Counseling/CounselorBoundary";
import { CounselorServices } from "./pages/Counseling/CounselorServices";
import { CounselorSchedule } from "./pages/Counseling/CounselorSchedule";
import { CounselorOrdersList } from "./pages/Counseling/CounselorOrdersList";
import { CounselorServiceChat } from "./pages/Counseling/CounselorServiceChat";
import { CounselorEvaluations } from "./pages/Counseling/CounselorEvaluations";
import { CounselorEarnings } from "./pages/Counseling/CounselorEarnings";
import { CounselorRiskReport } from "./pages/Counseling/CounselorRiskReport";

function ViewManager() {
  const { viewStack, activeCallSession } = useAppStore();
  const currentView = viewStack[viewStack.length - 1];

  return (
    <>
      <AnimatePresence mode="wait">
        {currentView === "login" && <Login key="login" />}
      {currentView === "assessment" && <Assessment key="assessment" />}
      {currentView === "ai-interview" && <AIInterview key="ai-interview" />}
      {currentView === "generation" && <ProfileGeneration key="generation" />}

      {/* Main Tab Wrapper maintains continuous presence unless replaced linearly by full screen sub-views */}
      {(currentView === "main" ||
        currentView.startsWith("counseling-") ||
        currentView === "ai-chat" ||
        currentView === "orders-list" ||
        currentView === "user-order-detail" ||
        currentView === "notifications-list" ||
        currentView === "notification-detail" ||
        currentView === "consultation-records" ||
        currentView === "assessment-records" ||
        currentView === "assessment-report-detail" ||
        currentView === "ai-chat-records" ||
        currentView === "profile-report" ||
        currentView === "assessment-records" ||
        currentView === "ai-chat-records") && <MainLayout key="main" />}

      {/* Counselor Dashboard - Separate from MainLayout */}
      {currentView === "counselor-workbench" && <CounselorWorkbench key="c_workbench" />}



      {/* Sub views stacked above Main Layout absolutely */}
      {currentView === "booking-confirm" && <BookingConfirm key="booking_confirm" />}
      {currentView === "pre-questionnaire" && <PreCounselingQuestionnaire key="pre_q" />}
      {currentView === "ai-chat" && (
        <div className="absolute inset-0 z-50 bg-white">
          <AITab />
        </div>
      )}
      {currentView === "counseling-detail" && <CounselorDetail key="cdetail" />}
      {currentView === "counseling-payment" && <Payment key="cpayment" />}
      {currentView === "counseling-text-chat" && <TextChat key="tchat" />}
      {currentView === "counseling-summary" && <CallSummary key="csummary" />}
      {currentView === "orders-list" && (
          useAppStore.getState().appMode === "counselor" ? <CounselorOrdersList key="c_orders" /> : <OrdersList key="orders" />
        )}
      {currentView === "user-order-detail" && <UserOrderDetail key="u_order_detail" />}
      {currentView === "profile-report" && <ProfileReport key="preport" />}
      {currentView === "user-evaluation" && <UserEvaluation key="ueval" />}
      {currentView === "counselor-session-notes" && <CounselorSessionNotes key="csnotes" />}
      {currentView === "assessment-records" && (
        <AssessmentRecords key="arecords" />
      )}
      {currentView === "assessment-report-detail" && <AssessmentReportDetail key="areport_detail" />}
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
      {currentView === "notifications-list" && <NotificationsList key="n_list" />}
      {currentView === "notification-detail" && <NotificationDetail key="n_detail" />}
      {currentView === "consultation-records" && <ConsultationRecords key="cons_records" />}
      {currentView === "consultation-detail" && <ConsultationDetail key="cons_detail" />}
      {currentView === "counselor-order-detail" && <CounselorOrderDetail key="c_order_detail" />}
      {currentView === "counselor-patient-profile" && <CounselorPatientProfile key="c_pt_profile" />}
      {currentView === "counselor-onboarding" && <CounselorOnboarding key="c_onboarding" />}
      {currentView === "counselor-boundary" && <CounselorBoundary key="c_boundary" />}
      {currentView === "counselor-services" && <CounselorServices key="c_services" />}
      {currentView === "counselor-schedule" && <CounselorSchedule key="c_schedule" />}
      {currentView === "counselor-service-chat" && <CounselorServiceChat key="c_service_chat" />}
      {currentView === "counselor-evaluations" && <CounselorEvaluations key="c_evaluations" />}
      {currentView === "counselor-earnings" && <CounselorEarnings key="c_earnings" />}
      {currentView === "counselor-risk-report" && <CounselorRiskReport key="c_risk_report" />}
      {currentView === "ai-settings" && <AISettings key="ai_settings" />}
      {currentView === "counseling-summary-list" && <CounselingSummaryList key="c_summary_list" />}
      {currentView === "counseling-summary-detail" && <CounselingSummaryDetail key="c_summary_detail" />}
      {currentView === "profile-edit" && <ProfileEdit key="p_edit" />}
      
      {currentView === "breathing" && <BreathingTool key="tool_breathing" />}
      {currentView === "white-noise" && <WhiteNoiseTool key="tool_white_noise" />}
      {currentView === "muyu" && <MuyuTool key="tool_muyu" />}
      {currentView === "meditation" && <MeditationTool key="tool_meditation" />}
      {currentView === "sleep-guide" && <SleepGuideTool key="tool_sleep" />}
      {currentView === "bubble-wrap" && <BubbleWrapTool key="tool_bubble" />}
    </AnimatePresence>
    {activeCallSession && <VoiceCall />}
    </>
  );
}

function App() {
  return (
    <MobileLayout>
      <ViewManager />
    </MobileLayout>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
