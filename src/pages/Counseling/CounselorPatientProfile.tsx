import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, BrainCircuit, Activity, Target, MessageSquare, ClipboardList, Shield, Edit3, ChevronRight } from "lucide-react";
import { mockUser } from "../../data";

export function CounselorPatientProfile() {
  const { popView, pushView, selectedCounselorOrder, bookingSummary } = useAppStore();

  const sourceLabel = bookingSummary?.source === "可鹿 AI 情绪助手" 
    ? { title: "来自可鹿 AI 情绪助手", desc: "用户先与可鹿 AI 沟通，随后选择了该咨询师，并授权同步摘要。" }
    : { title: "来自咨询师小助理", desc: "用户预约后，由咨询前小助理收集并确认同步。" };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-[60] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={popView}
          className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-[16px]">数字心理画像</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full bg-[#f8f9fa] pb-12">
         <div className="bg-white p-4 pb-5 border-b border-gray-100 relative">
           <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>
           
           <div className="flex items-center space-x-3 mb-4">
              <img src={selectedCounselorOrder?.avatar || "https://ui-avatars.com/api/?name=Chen&background=random"} alt="client" className="w-12 h-12 rounded-full border border-gray-200 object-cover" />
              <div>
                 <h2 className="text-[17px] font-bold text-gray-900 mb-0.5">{selectedCounselorOrder?.userName || "陈小希"}</h2>
                 <p className="text-[12px] text-gray-500">24岁 · 互联网运营</p>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#FFF8F3] py-2 px-1 rounded-xl border border-orange-100/50 flex flex-col items-center">
                 <div className="text-[10px] font-bold mb-0.5 text-[#FF8A48]">当前风险</div>
                 <div className="text-[14px] font-black tracking-tight text-[#FF453A]">低/常规</div>
              </div>
              <div className="bg-[#F4F9FF] py-2 px-1 rounded-xl border border-blue-100/50 flex flex-col items-center">
                 <div className="text-[10px] font-bold mb-0.5 text-[#5C82FF]">近期量表</div>
                 <div className="text-[14px] font-black tracking-tight text-[#1A45FF]">PHQ-9(5)</div>
              </div>
              <div className="bg-[#F2FBF7] py-2 px-1 rounded-xl border border-green-100/50 flex flex-col items-center">
                 <div className="text-[10px] font-bold mb-0.5 text-[#40B07B]">心理韧性</div>
                 <div className="text-[14px] font-black tracking-tight text-[#008A4B]">68/100</div>
              </div>
           </div>
         </div>

         <div className="p-3 space-y-3">
            {/* 咨询前问卷 SOP 摘要 */}
            {(bookingSummary && bookingSummary.authorized) ? (
              <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-[#2CC1C1]/20">
                 <div className="flex items-center justify-between mb-2">
                   <h3 className="font-bold text-[14px] text-gray-900 flex items-center">
                     <Target className="text-[#2CC1C1] mr-1.5" size={16} /> 本次服务预约摘要
                   </h3>
                   <span className="text-[10px] bg-[#2CC1C1]/10 text-[#2CC1C1] px-2 py-0.5 rounded font-bold">
                     已授权同步
                   </span>
                 </div>
                 <p className="text-[11px] text-gray-500 mb-3 bg-gray-50 p-2 rounded-lg leading-relaxed">
                   <span className="font-bold">{sourceLabel.title}：</span>{sourceLabel.desc}
                 </p>
                 <div className="space-y-2.5">
                   <div>
                     <div className="text-[12px] font-bold text-gray-400 mb-0.5">主要困扰</div>
                     <div className="text-[13px] text-gray-800">{bookingSummary.problem}</div>
                   </div>
                   <div>
                     <div className="text-[12px] font-bold text-gray-400 mb-0.5">当前情绪</div>
                     <div className="text-[13px] text-gray-800">{bookingSummary.feeling}</div>
                   </div>
                   <div>
                     <div className="text-[12px] font-bold text-gray-400 mb-0.5">关键事件</div>
                     <div className="text-[13px] text-gray-800">{bookingSummary.reason}</div>
                   </div>
                   <div>
                     <div className="text-[12px] font-bold text-gray-400 mb-0.5">用户期待</div>
                     <div className="text-[13px] text-gray-800">{bookingSummary.expectation}</div>
                   </div>
                   <div>
                     <div className="text-[12px] font-bold text-gray-400 mb-0.5">风险提示</div>
                     <div className="text-[13px] font-bold text-green-600">无明显风险</div>
                   </div>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100">
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="font-bold text-[14px] text-gray-900 flex items-center">
                     <Target className="text-blue-500 mr-1.5" size={16} /> 本次服务预约摘要
                   </h3>
                   <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">
                     仅问卷
                   </span>
                 </div>
                 <p className="text-[11px] text-gray-500 mb-3">用户未授权同步完整聊天摘要，仅展示预约问卷内容。</p>
                 <div className="space-y-2">
                   <div className="flex items-start text-[13px]">
                     <span className="text-gray-400 w-16 shrink-0">主要诉求</span>
                     <span className="text-gray-800 font-medium">{selectedCounselorOrder?.preQuestionnaire?.mainTopic || "希望梳理工作带来的焦虑感，找回状态"}</span>
                   </div>
                   <div className="flex items-start text-[13px]">
                     <span className="text-gray-400 w-16 shrink-0">持续时间</span>
                     <span className="text-gray-800">{selectedCounselorOrder?.preQuestionnaire?.duration || "1-3个月"}</span>
                   </div>
                   <div className="flex items-start text-[13px]">
                     <span className="text-gray-400 w-16 shrink-0">影响事件</span>
                     <span className="text-gray-800">{selectedCounselorOrder?.preQuestionnaire?.event || "上周被调到了新项目组，觉得领导在针对我"}</span>
                   </div>
                   <div className="flex items-start text-[13px]">
                     <span className="text-gray-400 w-16 shrink-0">自伤倾向</span>
                     <span className={selectedCounselorOrder?.preQuestionnaire?.hasSelfHarmThoughts ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                       {selectedCounselorOrder?.preQuestionnaire?.hasSelfHarmThoughts ? "有风险" : "无"}
                     </span>
                   </div>
                 </div>
              </div>
            )}
            {selectedCounselorOrder?.status === "completed" && (
               <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[14px] text-gray-900 mb-3 flex items-center">
                    <Edit3 className="text-blue-500 mr-1.5" size={16} /> 本次咨询建议与总结
                  </h3>
                  {selectedCounselorOrder.counselorAdvice ? (
                     <div className="bg-[#F8FBFF] p-3.5 rounded-xl border border-[#E8F1FF]">
                        <p className="text-[13px] text-gray-700 leading-[1.6] font-medium">
                           {selectedCounselorOrder.counselorAdvice}
                        </p>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-4 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                        <p className="text-[11px] text-gray-500 mb-2">尚未填写行动建议和内部总结</p>
                        <button 
                           onClick={() => pushView("counseling-summary")}
                           className="bg-gray-900 text-white text-[12px] font-bold px-4 py-2 rounded-full active:scale-95 transition-transform shadow-sm"
                        >
                           立即补充
                        </button>
                     </div>
                  )}
               </div>
            )}

            <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100">
               <h3 className="font-bold text-[14px] text-gray-900 mb-3 flex items-center">
                 <BrainCircuit className="text-[#40B07B] mr-1.5" size={16} /> 主导人格与特质
               </h3>
               <div className="flex flex-wrap gap-2">
                 <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium">高敏感</span>
                 <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium">讨好型倾向</span>
                 <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium">成就导向</span>
                 <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium">防御：理智化</span>
               </div>
            </div>

            <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100">
               <h3 className="font-bold text-[14px] text-gray-900 mb-3 flex items-center">
                 <ClipboardList className="text-green-500 mr-1.5" size={16} /> 小鹿近期重点关注
               </h3>
               <ul className="space-y-2.5">
                 <li className="flex items-start text-[12px] text-gray-600 leading-relaxed">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 shrink-0"></div>
                   用户在最近的三次小鹿陪伴沟通中，反复提及“工作做不完觉得会对不起同事”，有明显的职场人际边界问题。
                 </li>
                 <li className="flex items-start text-[12px] text-gray-600 leading-relaxed">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 shrink-0"></div>
                   曾使用「认知重构」工具记录过次生情绪：将老板的常规指派解读为“对她能力的不满”。
                 </li>
               </ul>
            </div>

            <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="font-bold text-[14px] text-gray-900 flex items-center">
                   <Activity className="text-purple-500 mr-1.5" size={16} /> 状态趋势 (7天)
                 </h3>
               </div>
               
               <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-end justify-between px-3 pb-3 pt-3 relative overflow-hidden">
                 {/* Mock Chart */}
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full absolute inset-0 z-0 opacity-20">
                     <path d="M0,35 C20,30 40,10 60,20 C80,30 90,10 100,20 L100,50 L0,50 Z" fill="#8A2BE2" />
                  </svg>
                  <div className="relative z-10 w-full flex justify-between items-end h-full pt-4">
                    {[6, 5, 8, 4, 7, 6, 9].map((val, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div className={`w-1/2 rounded-t-sm ${i === 6 ? 'bg-primary' : 'bg-primary/30'}`} style={{ height: `${val * 10}%` }}></div>
                        <div className="text-[8px] text-gray-400 mt-1">{["二","三","四","五","六","日","一"][i]}</div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* 新增：过往定性总结（内部记录）区块 */}
            <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-[#FFE8D6]">
               <h3 className="font-bold text-[14px] text-gray-900 mb-3 flex items-center">
                 <ClipboardList className="text-[#FF8A48] mr-1.5" size={16} /> 过往定性总结 (内部)
               </h3>
               <div className="space-y-3">
                 <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[#FFE8D6]">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[12px] font-bold text-gray-900">2026年05月20日</span>
                       <span className="text-[10px] text-[#FF8A48] bg-[#FFE8D6] px-2 py-0.5 rounded-sm font-bold">文字沟通</span>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      用户存在明显的回避型依恋特征。在探讨人际冲突时，频繁使用“算了”、“没关系”等词汇来掩饰真实的愤怒。建议在下一次咨询中，尝试引导其直面并表达一次愤怒情绪。
                    </p>
                 </div>
                 
                 <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[#FFE8D6]">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[12px] font-bold text-gray-900">2026年05月14日</span>
                       <span className="text-[10px] text-[#FF8A48] bg-[#FFE8D6] px-2 py-0.5 rounded-sm font-bold">语音咨询</span>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      首次建立咨访关系。用户防御机制较强，理智化严重。记录了近期失眠（入睡困难&gt;2h），暂无躯体化或自残倾向。留了行为激活作业（睡前冥想）。
                    </p>
                 </div>
               </div>
            </div>

            <button className="w-full bg-white p-3.5 rounded-[1.25rem] flex items-center justify-between shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
               <div className="flex items-center text-[13px] font-bold text-gray-900">
                 <Shield size={16} className="mr-2 text-red-500" /> 过往预警记录与干预
               </div>
               <div className="text-gray-400 text-[11px]">无记录</div>
            </button>
         </div>
      </div>
    </motion.div>
  );
}
