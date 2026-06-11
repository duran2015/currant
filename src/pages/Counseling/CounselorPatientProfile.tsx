import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, BrainCircuit, Activity, Target, MessageSquare, ClipboardList, Shield } from "lucide-react";
import { mockUser } from "../../data";

export function CounselorPatientProfile() {
  const { popView } = useAppStore();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[60] flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <button
          onClick={popView}
          className="w-10 h-10 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-lg">数字心理画像 (用户态)</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full bg-[#f8f9fa]">
         <div className="bg-white p-6 pb-8 border-b border-gray-100 relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
           
           <div className="flex items-center space-x-4 mb-5">
              <img src="https://i.pravatar.cc/150?img=12" alt="client" className="w-16 h-16 rounded-full border border-gray-200" />
              <div>
                 <h2 className="text-[20px] font-bold text-gray-900">陈小希</h2>
                 <p className="text-[13px] text-gray-500">24岁 · 互联网运营</p>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-3">
              <div className="bg-orange-50 text-orange-600 p-3 rounded-xl border border-orange-100 flex flex-col items-center">
                 <div className="text-[11px] font-bold mb-1 opacity-80">当前风险</div>
                 <div className="text-[15px] font-black tracking-tight">低/常规</div>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl border border-blue-100 flex flex-col items-center">
                 <div className="text-[11px] font-bold mb-1 opacity-80">近期测评</div>
                 <div className="text-[15px] font-black tracking-tight flex items-center">PHQ-9(5)</div>
              </div>
              <div className="bg-primary/10 text-primary p-3 rounded-xl border border-primary/20 flex flex-col items-center">
                 <div className="text-[11px] font-bold mb-1 opacity-80">心理韧性</div>
                 <div className="text-[15px] font-black tracking-tight">68/100</div>
              </div>
           </div>
         </div>

         <div className="p-4 space-y-4 pb-12">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
               <h3 className="font-bold text-[16px] text-gray-900 mb-4 flex items-center">
                 <BrainCircuit className="text-primary mr-2" size={18} /> 主导人格与特质标签
               </h3>
               <div className="flex flex-wrap gap-2">
                 <span className="bg-surface text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-gray-100">高敏感</span>
                 <span className="bg-surface text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-gray-100">讨好型倾向</span>
                 <span className="bg-surface text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-gray-100">成就导向</span>
                 <span className="bg-surface text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-gray-100">防御：理智化</span>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
               <h3 className="font-bold text-[16px] text-gray-900 mb-4 flex items-center">
                 <ClipboardList className="text-green-500 mr-2" size={18} /> AI 近期重点关注
               </h3>
               <ul className="space-y-3">
                 <li className="flex items-start text-[14px] text-gray-700 leading-relaxed">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 mr-2.5 shrink-0"></div>
                   用户在最近的三次 AI 树洞沟通中，反复提及“工作做不完觉得会对不起同事”，有明显的职场人际边界问题。
                 </li>
                 <li className="flex items-start text-[14px] text-gray-700 leading-relaxed">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 mr-2.5 shrink-0"></div>
                   曾使用「认知重构」工具记录过次生情绪：将老板的常规指派解读为“对她能力的不满”。
                 </li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-[16px] text-gray-900 flex items-center">
                   <Activity className="text-purple-500 mr-2" size={18} /> 状态趋势 (7天)
                 </h3>
               </div>
               
               <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-end justify-between px-4 pb-4 pt-4 relative overflow-hidden">
                 {/* Mock Chart */}
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full absolute inset-0 z-0 opacity-20">
                     <path d="M0,35 C20,30 40,10 60,20 C80,30 90,10 100,20 L100,50 L0,50 Z" fill="#8A2BE2" />
                  </svg>
                  <div className="relative z-10 w-full flex justify-between items-end h-full pt-6">
                    {[6, 5, 8, 4, 7, 6, 9].map((val, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div className="text-[10px] text-gray-400 mb-1 opacity-0 group-hover:opacity-100">{val}</div>
                        <div className={`w-1/2 rounded-t-sm ${i === 6 ? 'bg-primary' : 'bg-primary/30'}`} style={{ height: `${val * 10}%` }}></div>
                        <div className="text-[9px] text-gray-400 mt-1">{["二","三","四","五","六","日","一"][i]}</div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <button className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 active:scale-95 transition-transform">
               <div className="flex items-center text-[15px] font-bold text-gray-900">
                 <Shield size={20} className="mr-3 text-red-500" /> 过往预警记录与干预
               </div>
               <div className="text-gray-400 text-[13px]">无记录</div>
            </button>
         </div>
      </div>
    </motion.div>
  );
}
