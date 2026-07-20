import { motion } from "motion/react";
import { Bell, CalendarClock, ChevronRight, Clock3, FileText, MessageSquare } from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";

export function CounselorWorkbench() {
  const { pushView, enterAppMode, counselorStatus, orders, setActiveOrderTab, setTab } = useAppStore();
  const counselorOrders = orders.filter((order) => order.counselorId === "c1");
  const pendingOrders = counselorOrders.filter((order) => order.status === "paid" || order.status === "pending");
  const completedOrders = counselorOrders.filter((order) => order.status === "completed");
  const nextOrder = pendingOrders[0];
  const counselor = mockCounselors.find((item) => item.id === "c1");

  const openAppointments = (tab: "all" | "pending" | "completed") => {
    setActiveOrderTab(tab);
    setTab("appointments");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full overflow-y-auto pb-28">
      <header className="px-5 pb-4 pt-12">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={counselor?.avatar} alt="林安" className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm" />
            <div>
              <h1 className="text-[18px] font-black text-gray-900">林安，上午好</h1>
              <div className="mt-1 flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${counselorStatus === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                <span className="text-[10px] font-medium text-gray-500">{counselorStatus === "active" ? "接单中" : "暂停接单"}</span>
                <span className="text-[10px] text-gray-300">·</span><span className="text-[10px] text-gray-400">职场支持师</span>
              </div>
            </div>
          </div>
          <button onClick={() => enterAppMode("user")} className="rounded-[12px] border border-primary/10 bg-primary-light px-3 py-2 text-[10px] font-bold text-primary">用户端</button>
        </div>

        <button onClick={() => setTab("messages")} className="mb-3 flex h-8 w-full items-center overflow-hidden rounded-[10px] bg-[#e8f0ed] px-3 text-left">
          <Bell size={13} className="mr-2 shrink-0 text-[#557b91]" />
          <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d95c5c]" />
          <span className="platform-ticker min-w-0 flex-1 overflow-hidden text-[10px] text-[#667a73]"><span>平台通知：预约变更、审核结果和结算提醒已更新</span></span>
          <ChevronRight size={12} className="ml-2 shrink-0 text-[#90a09a]" />
        </button>

        <section className="overflow-hidden rounded-[20px] bg-[#193b32] p-5 text-white shadow-[0_14px_30px_rgba(25,59,50,.16)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.12em] text-white/45">下一项服务</p>
              <h2 className="mt-2 text-[21px] font-black">{nextOrder ? `${nextOrder.time || "19:30"} · ${nextOrder.type === "video" ? "视频咨询" : "语音咨询"}` : "暂无待服务预约"}</h2>
              <p className="mt-2 text-[10px] text-white/50">{nextOrder ? `${nextOrder.userName || "小鹿用户3821"} · 开始前 10 分钟开放进入` : "今天可以安排自己的时间"}</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-white/10"><CalendarClock size={21} /></div>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
            {nextOrder ? <><button onClick={() => openAppointments("pending")} className="flex-1 rounded-[13px] bg-white py-3 text-[12px] font-black text-[#193b32]">进入服务</button><button onClick={() => openAppointments("pending")} className="px-2 py-2 text-[11px] font-bold text-white/65">查看详情</button></> : <button onClick={() => pushView("counselor-schedule")} className="w-full rounded-[13px] bg-white py-3 text-[12px] font-black text-[#193b32]">管理可预约时间</button>}
          </div>
        </section>
      </header>

      <main className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <div><h2 className="text-[15px] font-black text-gray-900">待办事项</h2><p className="mt-1 text-[10px] text-gray-400">按服务进度集中处理</p></div>
          <button onClick={() => openAppointments("all")} className="flex items-center text-[10px] font-bold text-primary">全部预约<ChevronRight size={13} /></button>
        </div>
        <section className="overflow-hidden rounded-[16px] border border-black/[.05] bg-white">
          <button onClick={() => openAppointments("pending")} className="flex w-full items-center border-b border-black/[.05] px-4 py-3.5 text-left">
            <div className="mr-3 grid h-9 w-9 place-items-center rounded-[11px] bg-blue-50 text-blue-600"><Clock3 size={17} /></div><div className="flex-1"><h3 className="text-[12px] font-black text-gray-800">待服务预约</h3><p className="mt-0.5 text-[9px] text-gray-400">确认信息并完成服务准备</p></div><b className="mr-2 text-[16px] font-black text-gray-900">{pendingOrders.length}</b><ChevronRight size={14} className="text-gray-300" />
          </button>
          <button onClick={() => setTab("messages")} className="flex w-full items-center border-b border-black/[.05] px-4 py-3.5 text-left">
            <div className="mr-3 grid h-9 w-9 place-items-center rounded-[11px] bg-orange-50 text-orange-600"><MessageSquare size={17} /></div><div className="flex-1"><h3 className="text-[12px] font-black text-gray-800">用户消息</h3><p className="mt-0.5 text-[9px] text-gray-400">服务关系内的沟通消息</p></div><span className="mr-2 rounded-full bg-[#d95c5c] px-2 py-0.5 text-[9px] font-bold text-white">1 未读</span><ChevronRight size={14} className="text-gray-300" />
          </button>
          <button onClick={() => openAppointments("completed")} className="flex w-full items-center px-4 py-3.5 text-left">
            <div className="mr-3 grid h-9 w-9 place-items-center rounded-[11px] bg-green-50 text-green-600"><FileText size={17} /></div><div className="flex-1"><h3 className="text-[12px] font-black text-gray-800">服务记录</h3><p className="mt-0.5 text-[9px] text-gray-400">补充记录并查看用户反馈</p></div><b className="mr-2 text-[16px] font-black text-gray-900">{completedOrders.length}</b><ChevronRight size={14} className="text-gray-300" />
          </button>
        </section>
      </main>
    </motion.div>
  );
}
