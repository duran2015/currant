import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { Search, Heart, Clock, MessageCircle, FileText, Gift, CalendarPlus, BellRing, ShieldAlert, ChevronRight } from "lucide-react";

export function CounselorClientsTab() {
  const { pushView } = useAppStore();
  const [activeFilter, setActiveFilter] = useState("最近服务");

  const filters = [
    "最近服务", "待跟进", "已购服务包", "高满意度", "30天未复购", "有风险记录"
  ];

  const followUps = [
    {
      id: "f1",
      userName: "小鹿用户1749",
      reason: "服务后7天未复购",
      action: "建议发送关怀",
      type: "care"
    },
    {
      id: "f2",
      userName: "小鹿用户5920",
      reason: "服务包剩余1次",
      action: "建议提醒预约",
      type: "booking"
    }
  ];

  const clients = [
    {
      id: "u1",
      userName: "小鹿用户3821",
      avatar: "https://ui-avatars.com/api/?name=U1&background=random",
      lastServiceDate: "2026-07-12",
      serviceCount: 3,
      tags: ["情绪压力", "关系困扰"],
      lastServiceType: "45分钟心理咨询",
      evalStatus: "已评价",
      repurchaseStatus: "已复购",
      packageStatus: "剩余2次",
      hasRisk: false,
    },
    {
      id: "u2",
      userName: "匿名用户",
      avatar: "https://ui-avatars.com/api/?name=U2&background=random",
      lastServiceDate: "2026-07-05",
      serviceCount: 1,
      tags: ["职场焦虑"],
      lastServiceType: "20分钟倾诉",
      evalStatus: "未评价",
      repurchaseStatus: "未复购",
      packageStatus: "无服务包",
      hasRisk: false,
    },
    {
      id: "u3",
      userName: "小鹿用户9920",
      avatar: "https://ui-avatars.com/api/?name=U3&background=random",
      lastServiceDate: "2026-06-28",
      serviceCount: 5,
      tags: ["原生家庭", "抑郁倾向"],
      lastServiceType: "60分钟深度咨询",
      evalStatus: "已评价",
      repurchaseStatus: "已复购",
      packageStatus: "无服务包",
      hasRisk: true,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="counselor-page flex flex-col h-full overflow-hidden relative w-full"
    >
      {/* 1. 顶部标题 */}
      <div className="page-header flex items-end justify-between">
        <div><div className="page-kicker mb-1.5">CLIENT CARE</div><h1 className="page-title">客户</h1></div><span className="pb-1 text-[11px] font-bold text-gray-400">共 28 位</span>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-28">
        
        {/* 2. 客户数据总览 */}
        <div className="counselor-metrics mx-4 mt-4 px-4 py-5">
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-bold text-gray-900 mb-1">28</span>
              <span className="text-[11px] text-gray-500">已服务</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-bold text-gray-900 mb-1">9</span>
              <span className="text-[11px] text-gray-500">复购</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-bold text-orange-500 mb-1">4</span>
              <span className="text-[11px] text-gray-500">待跟进</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-bold text-blue-500 mb-1">3</span>
              <span className="text-[11px] text-gray-500">服务包</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-5">
          {/* 6. 待跟进提醒模块 */}
          <div className="mb-5">
            <div className="flex items-center mb-3">
              <BellRing size={16} className="text-orange-500 mr-2" />
              <h3 className="font-bold text-gray-900 text-[14px]">跟进提醒</h3>
            </div>
            <div className="space-y-2">
              {followUps.map(f => (
                <div key={f.id} className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 mb-0.5">{f.userName}</div>
                    <div className="text-[11px] text-gray-500">{f.reason}</div>
                  </div>
                  <button className="text-[11px] bg-white text-orange-600 font-bold px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform border border-orange-100">
                    {f.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 搜索与筛选 */}
          <div className="mb-4">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="搜索用户昵称"
                className="w-full bg-white border border-gray-100 rounded-full py-2.5 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-1">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                    activeFilter === f
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* 4. 客户列表卡片 */}
          <div className="space-y-3">
            {clients.map(client => (
              <div 
                key={client.id} 
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3 cursor-pointer" onClick={() => pushView("counselor-patient-profile" as any)}>
                  <div className="flex items-center">
                    <img src={client.avatar} alt="avatar" className="w-12 h-12 rounded-full bg-gray-100 object-cover mr-3 border border-gray-100" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-[15px] text-gray-900 mr-2">{client.userName}</h4>
                        {client.hasRisk && <ShieldAlert size={14} className="text-red-500" />}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 flex items-center">
                        <Clock size={10} className="mr-1" />
                        最近服务: {client.lastServiceDate}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-1" />
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium border border-blue-100">
                      累计服务 {client.serviceCount} 次
                    </span>
                    {client.packageStatus !== "无服务包" && (
                      <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-medium border border-purple-100">
                        {client.packageStatus}
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${client.repurchaseStatus === '已复购' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                      {client.repurchaseStatus}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {client.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-gray-600">
                    <span className="text-gray-400 mr-1">最近项目:</span>
                    {client.lastServiceType}
                  </div>
                </div>

                {/* 5. 客户卡片操作 */}
                <div className="flex space-x-2 pt-1">
                  <button 
                    onClick={() => pushView("counselor-patient-profile" as any)}
                    className="flex-1 flex items-center justify-center py-2 rounded-xl border border-gray-200 text-[12px] font-bold text-gray-700 active:bg-gray-50 transition-colors"
                  >
                    <FileText size={14} className="mr-1.5" />
                    查看档案
                  </button>
                  <button className="flex-1 flex items-center justify-center py-2 rounded-xl bg-gray-900 text-white text-[12px] font-bold active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10">
                    <Heart size={14} className="mr-1.5" />
                    发送关怀
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
