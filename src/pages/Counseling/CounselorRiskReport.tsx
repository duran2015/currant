import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, AlertTriangle, ShieldAlert, FileText, HeartHandshake } from "lucide-react";

export function CounselorRiskReport() {
  const { popView, selectedCounselorOrder } = useAppStore();

  const [formData, setFormData] = useState({
    riskType: "",
    description: "",
    suggestIntervention: true,
    suggestReferral: false,
  });

  const handleSubmit = () => {
    if (!formData.riskType || !formData.description) {
      alert("请填写风险类型和风险描述");
      return;
    }
    alert("风险已上报平台，运营团队将尽快介入！");
    popView();
  };

  const riskTypes = [
    "自伤/自杀表达",
    "伤害他人风险",
    "严重心理危机",
    "未成年人风险",
    "暴力/威胁",
    "其他"
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#f8f9fa] z-[90] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-sm pt-14">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-[17px]">风险上报</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-32 p-4">
        
        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start mb-4">
          <ShieldAlert size={20} className="text-red-500 mr-3 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[14px] font-bold text-red-800 mb-1">紧急危机处理 SOP</h3>
            <p className="text-[12px] text-red-600/80 leading-relaxed">
              当遇到危机个案时，请保持冷静，安抚用户情绪，并尽快在此上报。平台收到上报后会立即启动干预预案。
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex justify-between items-center">
          <div className="flex items-center">
             <img src={selectedCounselorOrder?.avatar || "https://ui-avatars.com/api/?name=User&background=random"} alt="user" className="w-10 h-10 rounded-full mr-3 object-cover" />
             <div>
                <div className="text-[14px] font-bold text-gray-900">{selectedCounselorOrder?.userName || "当前用户"}</div>
                <div className="text-[11px] text-gray-500">正在进行的服务</div>
             </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-3">
              风险类型 <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {riskTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, riskType: type })}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    formData.riskType === type
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 border border-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              风险描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="请客观描述用户在沟通中表达的风险内容或迹象..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[14px] h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
            />
          </div>

          <div className="pt-2 border-t border-gray-50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-[13px] font-bold text-gray-700">是否建议平台介入</label>
                <span className="text-[11px] text-gray-400">平台将联系紧急联络人或报警</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.suggestIntervention}
                onChange={(e) => setFormData({ ...formData, suggestIntervention: e.target.checked })}
                className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-[13px] font-bold text-gray-700">是否建议专业资源转介</label>
                <span className="text-[11px] text-gray-400">推荐精神科或危机干预热线</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.suggestReferral}
                onChange={(e) => setFormData({ ...formData, suggestReferral: e.target.checked })}
                className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl bg-red-500 text-white font-bold text-[15px] active:bg-red-600 transition-colors shadow-md shadow-red-500/20 flex justify-center items-center"
        >
          <AlertTriangle size={18} className="mr-2" /> 确认上报
        </button>
      </div>
    </motion.div>
  );
}
