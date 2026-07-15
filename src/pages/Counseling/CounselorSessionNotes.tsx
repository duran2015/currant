import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, FileText, CheckCircle2, Bot, AlertTriangle } from "lucide-react";

export function CounselorSessionNotes() {
  const { popView, selectedCounselorOrder, updateOrder } = useAppStore();

  const [formData, setFormData] = useState({
    mainProblem: "",
    mainEmotion: "",
    treatmentFocus: "",
    advice: "",
    suggestFollowUp: true,
    referral: "none", // none, counseling, medical, legal, crisis
    counselorNotes: "",
  });

  const [previewGenerated, setPreviewGenerated] = useState("");

  const handleGeneratePreview = () => {
    setPreviewGenerated(
      "在本次服务中，我们主要探讨了您近期面临的困扰。\n我注意到您在情绪上承受了一些压力。我们在会话中重点梳理了情绪的来源，并尝试区分了事实与猜测。\n\n接下来的时间里，建议您：\n1. " + (formData.advice || "尝试记录下每次感到焦虑时的触发事件。") + "\n\n请记住，感到疲惫时允许自己停下来休息。如果需要，我随时在这里。"
    );
  };

  const handleSubmit = () => {
    if (!formData.mainProblem || !formData.mainEmotion || !formData.advice) {
      alert("请填写必填项（主要问题、主要情绪、给用户的建议）");
      return;
    }
    
    // Update order status to completed
    if (selectedCounselorOrder) {
      updateOrder(selectedCounselorOrder.id, { 
        status: "completed",
        counselorNotesWritten: true 
      });
    }
    
    alert("总结已提交，订单已完成！");
    popView();
  };

  const handleSaveDraft = () => {
    alert("草稿已保存");
    popView();
  };

  const order = selectedCounselorOrder || {
    userName: "新用户",
    type: "text",
    date: "今天",
    time: "14:00-14:45"
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#f8f9fa] z-[80] flex flex-col"
    >
      {/* 1. 顶部标题 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-sm pt-14">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-[17px]">服务后总结</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-32 p-4">
        
        {/* 2. 订单信息卡 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-[16px] mb-1">{order.userName || "小鹿用户3821"}</h3>
              <div className="text-[13px] text-gray-500">
                {order.type === 'voice' ? '语音' : order.type === 'video' ? '视频' : '文字'}咨询 · 45分钟
              </div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-medium text-gray-800">{order.date}</div>
              <div className="text-[12px] text-gray-500">{order.time || "14:00-14:45"}</div>
            </div>
          </div>
        </div>

        {/* 3. 总结表单 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 space-y-5">
          <div className="flex items-center mb-2">
            <FileText size={18} className="text-primary mr-2" />
            <h3 className="font-bold text-gray-900 text-[15px]">专业记录 (仅自己/平台可见)</h3>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              本次主要问题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.mainProblem}
              onChange={(e) => setFormData({ ...formData, mainProblem: e.target.value })}
              placeholder="如：职场人际冲突导致的压力"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              用户主要情绪 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.mainEmotion}
              onChange={(e) => setFormData({ ...formData, mainEmotion: e.target.value })}
              placeholder="如：焦虑、轻度抑郁倾向、委屈"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              本次处理重点
            </label>
            <textarea
              value={formData.treatmentFocus}
              onChange={(e) => setFormData({ ...formData, treatmentFocus: e.target.value })}
              placeholder="简述干预技术或探讨核心..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[14px] h-20 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="pt-2 border-t border-gray-50">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[13px] font-bold text-gray-700">
                是否建议继续跟进
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-[14px]">
                  <input 
                    type="radio" 
                    checked={formData.suggestFollowUp} 
                    onChange={() => setFormData({ ...formData, suggestFollowUp: true })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span>是</span>
                </label>
                <label className="flex items-center space-x-2 text-[14px]">
                  <input 
                    type="radio" 
                    checked={!formData.suggestFollowUp} 
                    onChange={() => setFormData({ ...formData, suggestFollowUp: false })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span>否</span>
                </label>
              </div>
            </div>
          </div>

          {/* 4. 建议转介选项 */}
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-3 flex items-center">
              建议转介/寻求额外资源 <AlertTriangle size={14} className="text-orange-500 ml-1.5" />
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "none", label: "暂不需要" },
                { id: "counseling", label: "继续心理咨询" },
                { id: "medical", label: "精神科/医疗机构" },
                { id: "legal", label: "法律/劳动权益" },
                { id: "crisis", label: "危机支持资源" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({ ...formData, referral: option.id })}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    formData.referral === option.id
                      ? option.id === 'none' ? 'bg-primary text-white' : 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 active:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              咨询师私密备注
            </label>
            <textarea
              value={formData.counselorNotes}
              onChange={(e) => setFormData({ ...formData, counselorNotes: e.target.value })}
              placeholder="仅自己可见，方便下次接单回顾..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[14px] h-20 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* 5. 给用户看的总结预览 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-[15px] flex items-center">
              <CheckCircle2 size={18} className="text-green-500 mr-2" />
              给用户的总结寄语 <span className="text-red-500 ml-1">*</span>
            </h3>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              给用户的 1-3 条建议
            </label>
            <textarea
              value={formData.advice}
              onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
              placeholder="如：1. 尝试每天记录一次积极事件..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[14px] h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all mb-4"
            />
          </div>

          <div className="relative">
            {previewGenerated ? (
              <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 text-[13px] text-gray-700 leading-relaxed">
                <p className="whitespace-pre-wrap">{previewGenerated}</p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Bot size={32} className="text-gray-300 mb-2" />
                <p className="text-[12px] text-gray-500 mb-3">基于您填写的专业记录，一键生成温和专业的总结文案发送给用户</p>
                <button 
                  onClick={handleGeneratePreview}
                  className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-[13px] font-bold text-gray-700 active:scale-95 transition-transform flex items-center"
                >
                  <Bot size={16} className="mr-1.5 text-primary" />
                  生成文案预览
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 6. 底部按钮 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
        <div className="flex space-x-3">
          <button
            onClick={handleSaveDraft}
            className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-[15px] active:bg-gray-50 transition-colors"
          >
            保存草稿
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[2] py-3.5 rounded-xl bg-gray-900 text-white font-bold text-[15px] active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10 flex justify-center items-center"
          >
            提交总结，完成服务
          </button>
        </div>
      </div>
    </motion.div>
  );
}
