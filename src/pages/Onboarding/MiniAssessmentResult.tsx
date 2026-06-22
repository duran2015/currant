import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Share2, Download, X } from "lucide-react";
import { useAppStore } from "../../store";

export function MiniAssessmentResult() {
  const { popView, pushView } = useAppStore();
  const [showShare, setShowShare] = useState(false);
  const [showAppDownload, setShowAppDownload] = useState(false);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="flex flex-col h-full bg-[#f4f5f7] absolute inset-0 z-[120] overflow-hidden"
    >
      <div className="pt-14 pb-3 px-4 sticky top-0 flex items-center justify-between z-20">
        <button
          onClick={() => {
            popView();
            popView();
          }}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 active:bg-gray-200 bg-white/50 backdrop-blur rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32 -mt-16">
        {/* Result Card Image (Simulated) */}
        <div
          id="result-card"
          className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-[2rem] p-6 text-white shadow-xl mt-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
          <h2 className="text-[12px] opacity-80 mb-2 font-medium tracking-widest uppercase">
            焦虑自评测试 - 结果
          </h2>
          <div className="flex items-end mb-6">
            <span className="text-5xl font-black mr-2">12</span>
            <span className="text-[14px] opacity-80 pb-1">分</span>
          </div>
          <h3 className="text-[20px] font-bold mb-3 text-amber-300">
            中度焦虑
          </h3>
          <p className="text-[13px] leading-relaxed opacity-90 mb-6">
            你的焦虑水平目前处于中等状态，可能有持续几天感到心烦意乱或紧张。可以尝试寻找专业的疏导或进行短时间的放松冥想。
          </p>
          <div className="absolute -bottom-4 right-4 flex items-center space-x-1.5 opacity-80 mix-blend-overlay">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest">
              可鹿助手 生成
            </span>
            <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">
              🦌
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => setShowShare(true)}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform"
          >
            <Share2 size={18} className="mr-2" /> 分享测试与结果
          </button>
          <button
            onClick={() => setShowAppDownload(true)}
            className="w-full bg-white text-indigo-900 font-bold py-4 rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <Download size={18} className="mr-2" /> 获取详细解读 (下载APP)
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-[130] flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-[2rem] p-6 pb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[16px]">分享至</h3>
                <button onClick={() => setShowShare(false)} className="p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex mx-auto mb-2 text-white items-center justify-center">
                    微信
                  </div>
                  <span className="text-[11px] text-gray-500">微信好友</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex mx-auto mb-2 text-white items-center justify-center">
                    圈
                  </div>
                  <span className="text-[11px] text-gray-500">朋友圈</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex mx-auto mb-2 text-white items-center justify-center">
                    红
                  </div>
                  <span className="text-[11px] text-gray-500">小红书</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex mx-auto mb-2 text-gray-600 items-center justify-center">
                    <Download size={20} />
                  </div>
                  <span className="text-[11px] text-gray-500">保存图片</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Download Modal */}
      <AnimatePresence>
        {showAppDownload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-[140] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl relative text-center"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-[1.2rem] flex items-center justify-center mx-auto mb-4 shadow-lg">
                可鹿
              </div>
              <h2 className="text-[18px] font-bold text-gray-900 mb-2">
                下载可鹿 App
              </h2>
              <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
                在 App 中解锁完整的 30 页深度心理分析报告，以及 24 小时 AI
                树洞陪伴。
              </p>
              <button
                onClick={() => setShowAppDownload(false)}
                className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform font-[14px] mb-3"
              >
                去应用市场下载
              </button>
              <button
                onClick={() => setShowAppDownload(false)}
                className="text-[12px] text-gray-400 font-bold p-2"
              >
                暂不需要
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
