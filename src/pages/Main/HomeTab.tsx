import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Circle,
  Bell,
  Info,
  Wind,
  Shield,
  Lightbulb,
  Moon,
  PlayCircle,
} from "lucide-react";
import { useAppStore } from "../../store";
import { mockUser } from "../../data";

export function HomeTab() {
  const { user, setTab, pushView } = useAppStore();

  const isNewUser = user.isNewUser || false;
  const hasRisk = user.hasRisk || false;

  const [tasks, setTasks] = useState([
    { id: 1, title: "呼吸练习", duration: "5分钟", status: "completed" },
    { id: 2, title: "担忧时间", duration: "15分钟", status: "in-progress" },
    { id: 3, title: "思维记录", duration: "10分钟", status: "pending" },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa] relative pb-8 overflow-y-auto w-full"
    >
      {/* 顶部个人状态 (User Status) */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 mb-1 flex items-center">
              {isNewUser ? "晚上好，新朋友" : `晚上好，${user.name}`} 🌙
            </h1>
            <p className="text-gray-500 text-[14px]">
              {isNewUser
                ? "完成初次评估，了解你的状态"
                : "今天对自己温柔一点～"}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f8f9fa]"></div>
            </button>
          </div>
        </div>

        {/* Cloud Character Mock */}
        <div className="flex justify-end pr-4 -mt-4 mb-2">
          <div className="w-16 h-12 bg-white rounded-full shadow-sm flex items-center justify-center relative">
            <div className="absolute w-6 h-6 bg-white rounded-full -top-2 left-2"></div>
            <div className="absolute w-8 h-8 bg-white rounded-full -top-3 right-2"></div>
            <div className="flex space-x-2 relative z-10">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            </div>
            <div className="absolute bottom-2 w-2 h-1 border-b-2 border-blue-400 rounded-full"></div>
          </div>
        </div>

        {!isNewUser ? (
          <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative">
            <button
              onClick={() => pushView("profile-report")}
              className="absolute inset-0 w-full h-full text-left"
              aria-label="View Report"
            ></button>
            <div className="flex justify-between items-center mb-4 relative z-10 pointer-events-none">
              <div className="flex items-center text-gray-900 font-bold text-[16px]">
                我的状态 <Info size={14} className="text-gray-400 ml-1.5" />
              </div>
              <div className="text-[12px] text-gray-400">更新于 20:30</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 relative z-10 pointer-events-none">
              <div className="flex flex-col items-center">
                <div className="text-[12px] text-gray-500 mb-1">焦虑指数</div>
                <div className="text-[24px] font-black text-gray-900 leading-none mb-1">
                  9
                </div>
                <div className="text-[11px] font-bold text-green-500">↓ 3</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[12px] text-gray-500 mb-1">情绪指数</div>
                <div className="text-[24px] font-black text-gray-900 leading-none mb-1">
                  65
                </div>
                <div className="text-[11px] font-bold text-gray-500">中等</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[12px] text-gray-500 mb-1">睡眠质量</div>
                <div className="text-[16px] font-black text-gray-900 leading-none mb-1 mt-1">
                  一般
                </div>
                <div className="text-[11px] font-bold text-green-500 mt-0.5">
                  ↓ 2
                </div>
              </div>
            </div>

            <div className="relative z-10 pointer-events-none">
              <div className="text-[12px] text-gray-500 mb-2">近7天趋势</div>
              <div className="h-12 w-full relative">
                <svg
                  viewBox="0 0 100 30"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <path
                    d="M0,20 C10,15 20,25 30,10 C40,-5 50,20 60,15 C70,10 80,25 90,5 L100,10"
                    fill="none"
                    stroke="#8A2BE2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0,20 C10,15 20,25 30,10 C40,-5 50,20 60,15 C70,10 80,25 90,5 L100,10 L100,30 L0,30 Z"
                    fill="url(#gradient)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
                <span>日</span>
                <span>一</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-primary/5 p-5 rounded-3xl border border-primary/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-primary mb-1">
                未完成心理画像计算
              </h3>
              <p className="text-xs text-gray-500">花3分钟了解真实的自己</p>
            </div>
            <button
              onClick={() => pushView("assessment")}
              className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full active:bg-primary/90"
            >
              去评估
            </button>
          </div>
        )}
      </div>

      <div className="px-4 space-y-4">
        {/* 风险提醒卡 (Risk Alert Card) */}
        {hasRisk && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-500 to-[#FF453A] rounded-[1.5rem] p-5 text-white shadow-lg shadow-red-500/20"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white/20 text-white rounded-full">
                <ShieldAlert size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-[16px]">风险识别拦截触发</h3>
                </div>
                <div className="text-[10px] text-white/70 mb-3 flex items-center bg-black/10 self-start px-2 py-0.5 rounded w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300 mr-1 animate-pulse" />
                  智能卫士在线
                </div>
                <p className="text-white/90 text-[13px] leading-relaxed mb-4">
                  系统检测到您当前存在高危机风险（L4）。请不要独自承受，立刻与专业援助人员取得联系，我们都在。
                </p>
                <div className="flex space-x-2">
                  <a
                    href="tel:400-161-9995"
                    className="flex-1 bg-white text-red-500 font-bold text-[13px] py-2.5 rounded-xl text-center active:bg-red-50 transition-colors block"
                  >
                    紧急援助热线
                  </a>
                  <button
                    onClick={() => setTab("ai")}
                    className="flex-1 bg-black/20 text-white font-bold text-[13px] py-2.5 rounded-xl text-center active:bg-black/30 transition-colors border border-white/20"
                  >
                    联系真人倾听
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 今日建议卡 (Daily Tasks Box) */}
        {!isNewUser && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-bold text-[18px] text-gray-900">今日计划</h3>
              <button className="text-[13px] text-gray-400 flex items-center active:text-gray-600">
                查看全部 <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {task.status === "completed" && (
                        <CheckCircle2 size={24} className="text-[#34C759]" />
                      )}
                      {task.status === "in-progress" && (
                        <PlayCircle
                          size={24}
                          className="text-[#FF9500]"
                          fill="#FFF4E5"
                        />
                      )}
                      {task.status === "pending" && (
                        <Circle size={24} className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-[15px] font-bold text-gray-900">
                        {task.title}
                      </span>
                      <span className="text-[12px] text-gray-400">
                        {task.duration}
                      </span>
                    </div>
                  </div>
                  <div>
                    {task.status === "completed" && (
                      <span className="text-[11px] font-bold text-[#34C759] bg-[#34C759]/10 px-2.5 py-1 rounded-full">
                        已完成
                      </span>
                    )}
                    {task.status === "in-progress" && (
                      <span className="text-[11px] font-bold text-[#FF9500] bg-[#FF9500]/10 px-2.5 py-1 rounded-full">
                        进行中
                      </span>
                    )}
                    {task.status === "pending" && (
                      <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                        待开始
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 快捷工具箱 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-[18px] text-gray-900">我的工具箱</h3>
            <button className="text-[13px] text-gray-400 flex items-center active:text-gray-600">
              全部工具 <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex justify-between items-center px-1">
            <button className="flex flex-col items-center active:opacity-70 transition-opacity">
              <div className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-indigo-50 to-indigo-100/50 flex flex-col items-center justify-center text-indigo-500 mb-2 shadow-sm border border-indigo-50">
                <Wind size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-medium text-gray-700">
                呼吸练习
              </span>
            </button>
            <button className="flex flex-col items-center active:opacity-70 transition-opacity">
              <div className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-blue-50 to-blue-100/50 flex flex-col items-center justify-center text-blue-500 mb-2 shadow-sm border border-blue-50">
                <Shield size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-medium text-gray-700">
                担忧管理
              </span>
            </button>
            <button className="flex flex-col items-center active:opacity-70 transition-opacity">
              <div className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-purple-50 to-purple-100/50 flex flex-col items-center justify-center text-purple-500 mb-2 shadow-sm border border-purple-50">
                <Lightbulb size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-medium text-gray-700">
                认知重构
              </span>
            </button>
            <button className="flex flex-col items-center active:opacity-70 transition-opacity">
              <div className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-cyan-50 to-cyan-100/50 flex flex-col items-center justify-center text-cyan-500 mb-2 shadow-sm border border-cyan-50">
                <Moon size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-medium text-gray-700">
                睡眠改善
              </span>
            </button>
          </div>
        </div>

        {/* 真人倾听师 */}
        <button
          onClick={() => pushView("counseling-list")}
          className="w-full bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform"
        >
          <div className="text-left">
            <div className="text-[16px] font-bold text-gray-900 mb-1">
              真人倾听师
            </div>
            <div className="text-[12px] text-gray-500">
              需要找人聊聊？我们在这里
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
              />
            </div>
            <div className="text-[12px] text-gray-400 font-medium flex items-center">
              去看看 <ChevronRight size={14} />
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
