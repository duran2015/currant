import { motion } from "motion/react";
import { Briefcase, CalendarClock, ChevronRight, FileText, LogOut, Settings } from "lucide-react";
import { useAppStore } from "../../store";

export function ProfileTab() {
  const { pushView, enterAppMode, user } = useAppStore();

  const items = [
    { icon: CalendarClock, title: "预约记录", desc: "查看待服务与历史预约", action: () => pushView("orders-list") },
    { icon: FileText, title: "小结与建议", desc: "咨询师提供的服务小结", action: () => pushView("counseling-summary-list") },
    { icon: FileText, title: "量表记录", desc: "查看已完成的测评结果", action: () => pushView("assessment-records") },
    { icon: LogOut, title: "账号与安全", desc: "个人资料、隐私与账号管理", action: () => pushView("account-security" as any) },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto pb-28">
      <header className="px-5 pb-4 pt-12">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[.12em] text-gray-400">个人中心</p><h1 className="mt-1 text-[22px] font-black text-gray-900">我的</h1></div><button onClick={() => pushView("profile-edit")} aria-label="编辑个人资料" className="grid h-10 w-10 place-items-center rounded-[13px] bg-white text-gray-600 shadow-sm"><Settings size={18} /></button></div>
        <section className="flex items-center rounded-[20px] bg-[#193b32] p-4 text-white shadow-[0_12px_28px_rgba(25,59,50,.14)]">
          <img src={user.avatar} alt="avatar" className="h-14 w-14 rounded-[17px] border-2 border-white/60 object-cover" />
          <div className="ml-3 min-w-0 flex-1"><h2 className="truncate text-[17px] font-black">{user.name}</h2><p className="mt-1 text-[10px] text-white/55">你的记录仅用于提供个人化服务</p></div>
          <ChevronRight size={17} className="text-white/35" />
        </section>
      </header>

      <main className="px-5">
        {user.role === "active" && <button onClick={() => enterAppMode("counselor")} className="mb-3 flex w-full items-center rounded-[14px] bg-[#e8f3ee] px-4 py-3 text-left text-primary"><Briefcase size={17} className="mr-3" /><span className="flex-1 text-[12px] font-black">切换为咨询师身份</span><ChevronRight size={14} /></button>}
        <section className="overflow-hidden rounded-[16px] border border-black/[.05] bg-white">
          {items.map((item) => <button key={item.title} onClick={item.action} className="flex w-full items-center border-b border-black/[.05] px-4 py-3.5 text-left last:border-0"><span className="mr-3 grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-gray-50 text-gray-500"><item.icon size={17} /></span><span className="min-w-0 flex-1"><b className="block text-[12px] text-gray-900">{item.title}</b><small className="mt-0.5 block text-[9px] text-gray-400">{item.desc}</small></span><ChevronRight size={14} className="text-gray-300" /></button>)}
        </section>
        <p className="pt-4 text-center text-[9px] text-gray-300">可鹿 · 关注你的每一次感受</p>
      </main>
    </motion.div>
  );
}
