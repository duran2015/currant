import { motion } from "motion/react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Eye,
  Settings2,
  UserCircle,
  Wallet,
} from "lucide-react";
import { useAppStore } from "../../store";

export function CounselorProfileTab() {
  const { pushView, enterAppMode } = useAppStore();

  const items = [
    { icon: UserCircle, title: "执业资料", desc: "资质、介绍和擅长方向", view: "counselor-onboarding" },
    { icon: Settings2, title: "服务与价格", desc: "服务方式、时长和价格", view: "counselor-services" },
    { icon: CalendarDays, title: "可预约时间", desc: "开放时间和休假设置", view: "counselor-schedule" },
    { icon: Wallet, title: "收入账户", desc: "收入明细、结算和提现", view: "counselor-earnings" },
    { icon: CircleHelp, title: "账号与安全", desc: "退出登录和注销账号", view: "counselor-account-security" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full overflow-y-auto pb-28">
      <header className="bg-white px-5 pb-6 pt-14">
        <div className="flex items-center">
          <img src="https://ui-avatars.com/api/?name=LA&background=2f6b5a&color=fff" alt="林安" className="h-16 w-16 rounded-[20px] object-cover shadow-sm" />
          <div className="ml-4 min-w-0 flex-1">
            <div className="flex items-center gap-2"><h1 className="text-[20px] font-black text-gray-900">林安</h1><CheckCircle2 size={16} className="text-green-600" /></div>
            <p className="mt-1 text-[11px] text-gray-500">职场支持师 · 已通过平台审核</p>
            <button onClick={() => pushView("counseling-detail")} className="mt-2 flex items-center text-[10px] font-bold text-primary"><Eye size={13} className="mr-1" />查看用户看到的主页</button>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4">
        <section className="overflow-hidden rounded-[22px] border border-black/5 bg-white">
          {items.map((item) => <button key={item.title} onClick={() => pushView(item.view as any)} className="flex w-full items-center border-b border-gray-100 px-4 py-4 text-left last:border-0"><span className="mr-3 grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-gray-50 text-gray-600"><item.icon size={19} /></span><span className="min-w-0 flex-1"><b className="block text-[13px] text-gray-900">{item.title}</b><small className="mt-1 block text-[10px] text-gray-400">{item.desc}</small></span><ChevronRight size={16} className="text-gray-300" /></button>)}
        </section>

        <button onClick={() => enterAppMode("user")} className="mt-4 flex h-[50px] w-full items-center justify-center rounded-[17px] bg-white text-[12px] font-bold text-gray-600">切换为用户身份</button>
        <p className="pb-5 pt-4 text-center text-[9px] text-gray-400">可鹿咨询师端</p>
      </main>
    </motion.div>
  );
}
