import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, Plus, X, Power, Clock, Info, CheckCircle2, Circle, AlertCircle } from "lucide-react";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  types: ("text" | "voice" | "video")[];
}

interface DaySchedule {
  day: number; // 1-7
  name: string;
  slots: TimeSlot[];
}

export function CounselorSchedule() {
  const { popView, counselorStatus, setCounselorStatus } = useAppStore();

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 1, name: "周一", slots: [{ id: "1", start: "19:00", end: "22:00", types: ["text", "voice"] }] },
    { day: 2, name: "周二", slots: [] },
    { day: 3, name: "周三", slots: [{ id: "2", start: "20:00", end: "23:00", types: ["text", "voice", "video"] }] },
    { day: 4, name: "周四", slots: [] },
    { day: 5, name: "周五", slots: [{ id: "3", start: "19:00", end: "21:00", types: ["text"] }] },
    { day: 6, name: "周六", slots: [{ id: "4", start: "14:00", end: "18:00", types: ["text", "voice"] }] },
    { day: 7, name: "周日", slots: [] },
  ]);

  // Settings
  const [minNotice, setMinNotice] = useState("2");
  const [sessionGap, setSessionGap] = useState("15");
  const [allowSameDay, setAllowSameDay] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<number>(1);
  const [newStart, setNewStart] = useState("19:00");
  const [newEnd, setNewEnd] = useState("20:00");
  const [newTypes, setNewTypes] = useState<("text" | "voice" | "video")[]>(["text", "voice"]);

  const toggleType = (type: "text" | "voice" | "video") => {
    setNewTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAddSlot = () => {
    if (newTypes.length === 0) {
      alert("请至少选择一种服务方式");
      return;
    }
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      start: newStart,
      end: newEnd,
      types: newTypes
    };

    setSchedule(prev => prev.map(d => {
      if (d.day === editingDay) {
        // Simple append, in real app should sort by time
        return { ...d, slots: [...d.slots, newSlot] };
      }
      return d;
    }));
    
    setIsModalOpen(false);
  };

  const removeSlot = (dayIdx: number, slotId: string) => {
    setSchedule(prev => prev.map(d => {
      if (d.day === dayIdx) {
        return { ...d, slots: d.slots.filter(s => s.id !== slotId) };
      }
      return d;
    }));
  };

  const typeLabels = { text: "文字", voice: "语音", video: "视频" };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">可预约时间</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        
        {/* Status Toggle */}
        <div className="bg-white p-5 shadow-sm border-b border-gray-100 flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${counselorStatus === 'active' ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400'}`}>
              <Power size={20} />
            </div>
            <div>
              <div className="text-[15px] font-bold text-gray-900 mb-0.5">
                {counselorStatus === 'active' ? '当前可预约' : '已暂停预约'}
              </div>
              <div className="text-[11px] text-gray-500">
                {counselorStatus === 'active' ? '用户可以预约您的服务' : '用户暂时无法预约您的服务'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setCounselorStatus(counselorStatus === 'active' ? 'paused' : 'active')}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${counselorStatus === 'active' ? 'bg-green-500' : 'bg-gray-200'}`}
          >
            <motion.div 
              layout
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              animate={{ x: counselorStatus === 'active' ? 24 : 0 }}
            />
          </button>
        </div>

        {/* Weekly Schedule */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[15px] font-bold text-gray-900 flex items-center">
              <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
              本周排班
            </h2>
            <button 
              onClick={() => {
                setEditingDay(1);
                setIsModalOpen(true);
              }}
              className="text-primary text-[13px] font-bold flex items-center bg-primary/10 px-3 py-1.5 rounded-full active:bg-primary/20 transition-colors"
            >
              <Plus size={14} className="mr-1" />
              添加时段
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {schedule.map((day, idx) => (
              <div key={day.day} className={`p-4 ${idx !== schedule.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="w-12 shrink-0 font-bold text-[14px] text-gray-900 mt-1">
                    {day.name}
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    {day.slots.length > 0 ? (
                      day.slots.map(slot => (
                        <div key={slot.id} className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex justify-between items-center group relative">
                          <div>
                            <div className="text-[13px] font-bold text-gray-900 mb-1 tracking-tight">
                              {slot.start} - {slot.end}
                            </div>
                            <div className="flex gap-1">
                              {slot.types.map(t => (
                                <span key={t} className="bg-white text-gray-500 text-[10px] px-1.5 py-0.5 rounded border border-gray-200">
                                  {typeLabels[t]}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button 
                            onClick={() => removeSlot(day.day, slot.id)}
                            className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center active:bg-red-100 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-[12px] text-gray-400 mt-1">未设置</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Rules */}
        <div className="px-4 mb-6">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-1 h-3.5 bg-blue-500 rounded-full mr-2"></span>
            预约规则设置
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-5">
            
            <div>
              <label className="text-[13px] font-medium text-gray-700 mb-2 block">预约前最短通知时间</label>
              <div className="grid grid-cols-3 gap-2">
                {["2", "6", "24"].map(h => (
                  <button 
                    key={h}
                    onClick={() => setMinNotice(h)}
                    className={`py-2 rounded-xl text-[13px] font-medium border transition-colors ${minNotice === h ? 'bg-primary/5 border-primary text-primary' : 'bg-gray-50 border-transparent text-gray-600'}`}
                  >
                    提前 {h} 小时
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-gray-700 mb-2 block">单次服务间隔时间</label>
              <div className="grid grid-cols-2 gap-2">
                {["15", "30"].map(m => (
                  <button 
                    key={m}
                    onClick={() => setSessionGap(m)}
                    className={`py-2 rounded-xl text-[13px] font-medium border transition-colors ${sessionGap === m ? 'bg-primary/5 border-primary text-primary' : 'bg-gray-50 border-transparent text-gray-600'}`}
                  >
                    {m} 分钟
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div>
                <div className="text-[14px] font-medium text-gray-900">允许当天预约</div>
                <div className="text-[11px] text-gray-400">开启后，用户可预约当天的空闲时段</div>
              </div>
              <button 
                onClick={() => setAllowSameDay(!allowSameDay)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 ${allowSameDay ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <motion.div 
                  layout
                  className="w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: allowSameDay ? 24 : 0 }}
                />
              </button>
            </div>

          </div>
        </div>

        {/* Cancellation Rules Info */}
        <div className="px-4 mb-6">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start">
            <AlertCircle size={18} className="text-orange-500 mr-2 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[13px] font-bold text-orange-800 mb-1">取消与改约规则说明</h3>
              <ul className="text-[12px] text-orange-700/80 space-y-1 list-disc pl-3">
                <li>用户在预约开始前 24 小时可免费取消。</li>
                <li>24小时内取消将扣除 50% 费用作为咨询师补偿。</li>
                <li>咨询师如需改约，请至少提前 12 小时与用户沟通并在后台操作。</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Fixed Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <button 
          onClick={() => {
            alert("设置已保存");
            popView();
          }}
          className="w-full py-3.5 rounded-xl font-bold text-[15px] bg-gray-900 text-white active:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
        >
          保存设置
        </button>
      </div>

      {/* Add Slot Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h2 className="text-[16px] font-bold text-gray-900">添加排班时段</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 -mr-2 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-5 pb-8">
                
                <div>
                  <label className="text-[13px] font-medium text-gray-700 mb-2 block">选择星期</label>
                  <div className="flex flex-wrap gap-2">
                    {schedule.map(d => (
                      <button
                        key={d.day}
                        onClick={() => setEditingDay(d.day)}
                        className={`w-10 h-10 rounded-full text-[13px] font-bold transition-colors ${editingDay === d.day ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}
                      >
                        {d.name.replace('周', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-medium text-gray-700 mb-2 block">开始时间</label>
                    <input 
                      type="time" 
                      value={newStart}
                      onChange={e => setNewStart(e.target.value)}
                      className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[16px] font-bold outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-gray-700 mb-2 block">结束时间</label>
                    <input 
                      type="time" 
                      value={newEnd}
                      onChange={e => setNewEnd(e.target.value)}
                      className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[16px] font-bold outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-medium text-gray-700 mb-2 block">该时段支持的服务方式 (多选)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["text", "voice", "video"] as const).map(t => (
                      <button 
                        key={t}
                        onClick={() => toggleType(t)}
                        className={`py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center border transition-colors ${newTypes.includes(t) ? 'bg-primary/5 border-primary text-primary' : 'bg-gray-50 border-transparent text-gray-500'}`}
                      >
                        {newTypes.includes(t) ? <CheckCircle2 size={14} className="mr-1" /> : <Circle size={14} className="mr-1" />}
                        {typeLabels[t]}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddSlot}
                  className="w-full py-3.5 mt-2 rounded-xl font-bold text-[15px] bg-primary text-white active:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  确认添加
                </button>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}