import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, Wind, Headphones, Bell, Cloud, Moon, Smile } from "lucide-react";
import { useAppStore } from "../../store";

export function ReliefToolPage({ 
  title, 
  icon, 
  color, 
  desc 
}: { 
  title: string; 
  icon: React.ReactNode; 
  color: string; 
  desc: string; 
}) {
  const { popView } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-surface z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <button onClick={popView} className="p-2 -ml-2 text-gray-600 active:scale-95">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-800">{title}</h1>
        <div className="w-10"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50/50">
        <div className={`w-32 h-32 rounded-full ${color} flex items-center justify-center mb-8 shadow-sm animate-pulse`}>
          {icon}
        </div>
        <h2 className="text-[22px] font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-[15px] text-gray-500 text-center max-w-[240px] leading-relaxed">
          {desc}
        </p>
        
        <div className="mt-12 bg-white px-6 py-3 rounded-full text-[14px] font-bold text-primary shadow-sm border border-primary/10 cursor-pointer active:scale-95 transition-transform" onClick={popView}>
          结束体验
        </div>
      </div>
    </motion.div>
  );
}

export function BreathingTool() {
  return <ReliefToolPage title="呼吸训练" icon={<Wind size={48} />} color="bg-teal-100 text-teal-600" desc="跟随节奏，深吸气...慢呼气...让心跳慢慢平复下来。" />;
}

export function WhiteNoiseTool() {
  return <ReliefToolPage title="白噪音" icon={<Headphones size={48} />} color="bg-indigo-100 text-indigo-600" desc="戴上耳机，聆听雨声与海浪，隔绝外界的喧嚣。" />;
}

export function MuyuTool() {
  return <ReliefToolPage title="敲木鱼" icon={<Bell size={48} />} color="bg-amber-100 text-amber-600" desc="敲击屏幕，积累功德，每一次清脆的响声都是一次释怀。" />;
}

export function MeditationTool() {
  return <ReliefToolPage title="冥想放松" icon={<Cloud size={48} />} color="bg-sky-100 text-sky-600" desc="闭上眼睛，感受身体的重量，找回内心的平静。" />;
}

export function SleepGuideTool() {
  return <ReliefToolPage title="睡眠引导" icon={<Moon size={48} />} color="bg-blue-100 text-blue-600" desc="放松每一寸肌肉，准备进入一个甜美安稳的梦乡。" />;
}

export function BubbleWrapTool() {
  return <ReliefToolPage title="捏泡泡" icon={<Smile size={48} />} color="bg-fuchsia-100 text-fuchsia-600" desc="啪嗒、啪嗒...无限捏泡泡，把压力全都捏碎！" />;
}
