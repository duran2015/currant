import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, Info, Plus, Settings, CheckCircle2, Circle, X } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  isActive: boolean;
  type: "single" | "package";
  sessionCount?: number;
  validity?: string;
  suitableFor?: string;
}

const TEMPLATES: Omit<ServiceItem, 'id' | 'isActive'>[] = [
  { name: "20分钟倾诉体验", duration: "20分钟", price: 99, description: "适合紧急情绪宣泄、轻度烦恼倾诉", type: "single", suitableFor: "首次体验、急需倾听" },
  { name: "30分钟问题初筛", duration: "30分钟", price: 159, description: "梳理核心问题，初步评估风险与方向", type: "single", suitableFor: "困惑较多，需要专业梳理" },
  { name: "45分钟心理咨询", duration: "45分钟", price: 299, description: "标准单次心理咨询，深入探讨特定议题", type: "single", suitableFor: "明确知道自己需要专业干预" },
  { name: "60分钟深度咨询", duration: "60分钟", price: 399, description: "更长时间的深度探讨与干预方案制定", type: "single", suitableFor: "议题复杂，需要更多时间展开" },
  { name: "3次支持包", duration: "单次45分钟", price: 799, description: "针对单一问题的短期聚焦干预", type: "package", sessionCount: 3, validity: "1个月", suitableFor: "特定事件复盘、短期压力应对" },
  { name: "5次支持包", duration: "单次45分钟", price: 1299, description: "中短期系统性干预与陪伴", type: "package", sessionCount: 5, validity: "2个月", suitableFor: "关系问题、职业转型陪伴" },
];

export function CounselorServices() {
  const { popView } = useAppStore();
  
  const [myServices, setMyServices] = useState<ServiceItem[]>([
    {
      id: "s1",
      name: "30分钟问题初筛",
      duration: "30分钟",
      price: 159,
      description: "梳理核心问题，初步评估风险与方向",
      isActive: true,
      type: "single",
      suitableFor: "困惑较多，需要专业梳理"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ServiceItem> | null>(null);

  const toggleActive = (id: string) => {
    setMyServices(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleEdit = (item: ServiceItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleTemplateClick = (template: Omit<ServiceItem, 'id' | 'isActive'>) => {
    setEditingItem({ ...template, isActive: true });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    if (editingItem.id) {
      setMyServices(prev => prev.map(s => s.id === editingItem.id ? (editingItem as ServiceItem) : s));
    } else {
      const newService = {
        ...editingItem,
        id: Date.now().toString(),
        isActive: editingItem.isActive !== false
      } as ServiceItem;
      setMyServices([...myServices, newService]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

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
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">服务商品</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hint Card */}
        <div className="px-4 pt-5 pb-2">
          <div className="bg-blue-50 border border-blue-100 text-blue-700 p-3.5 rounded-2xl flex items-start">
            <Info size={18} className="mr-2 shrink-0 mt-0.5" />
            <p className="text-[13px] font-medium leading-relaxed">
              建议优先选择平台标准服务模板，方便用户理解和预约。您也可以根据自身情况调整价格或添加自定义服务。
            </p>
          </div>
        </div>

        {/* My Active Services */}
        <div className="px-4 py-4">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
            已配置的服务 ({myServices.length})
          </h2>
          
          <div className="space-y-3">
            {myServices.map(service => (
              <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-1">{service.name}</h3>
                    <div className="flex items-center text-[12px] text-gray-500 space-x-2">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded">{service.type === 'package' ? '支持包' : '单次服务'}</span>
                      <span>{service.duration}</span>
                      {service.type === 'package' && (
                        <span>· 包含{service.sessionCount}次 ({service.validity}内有效)</span>
                      )}
                    </div>
                  </div>
                  <div className="text-[16px] font-bold text-orange-500">
                    ¥{service.price}
                  </div>
                </div>
                
                <p className="text-[12px] text-gray-500 mb-4 line-clamp-2 mt-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center">
                    <button 
                      onClick={() => toggleActive(service.id)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${service.isActive ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      <motion.div 
                        layout
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                        animate={{ x: service.isActive ? 16 : 0 }}
                      />
                    </button>
                    <span className={`text-[12px] ml-2 font-medium ${service.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {service.isActive ? '上架中' : '已下架'}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleEdit(service)}
                    className="text-[12px] font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full flex items-center transition-colors"
                  >
                    <Settings size={12} className="mr-1" />
                    编辑配置
                  </button>
                </div>
              </div>
            ))}
            {myServices.length === 0 && (
              <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 border-dashed text-gray-400 text-[13px]">
                暂无服务，请从下方模板添加
              </div>
            )}
          </div>
        </div>

        {/* Templates */}
        <div className="px-4 py-2">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-1 h-3.5 bg-gray-400 rounded-full mr-2"></span>
            平台标准模板
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((template, idx) => (
              <button
                key={idx}
                onClick={() => handleTemplateClick(template)}
                className="bg-white border border-gray-200 rounded-xl p-3 text-left active:scale-[0.98] transition-transform shadow-sm"
              >
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="text-[13px] font-bold text-gray-900 leading-tight">{template.name}</h3>
                  {template.type === 'package' && (
                    <span className="bg-orange-50 text-orange-500 text-[9px] px-1 py-0.5 rounded font-medium shrink-0 ml-1">打包</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-2 truncate">{template.duration}</div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold text-gray-900">¥{template.price}</span>
                  <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Plus size={12} strokeWidth={3} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <button 
          onClick={() => {
            setEditingItem({ isActive: true, type: "single" });
            setIsModalOpen(true);
          }}
          className="w-full py-3.5 rounded-xl font-bold text-[15px] bg-gray-900 text-white active:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 flex items-center justify-center"
        >
          <Plus size={18} className="mr-1" />
          新增自定义服务
        </button>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingItem && (
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
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h2 className="text-[16px] font-bold text-gray-900">{editingItem.id ? '编辑服务配置' : '添加服务'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 -mr-2 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20">
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button 
                    onClick={() => setEditingItem({ ...editingItem, type: "single" })}
                    className={`py-2 rounded-xl text-[13px] font-bold flex items-center justify-center border ${editingItem.type === 'single' ? 'bg-primary/5 border-primary text-primary' : 'border-gray-200 text-gray-500'}`}
                  >
                    {editingItem.type === 'single' ? <CheckCircle2 size={14} className="mr-1" /> : <Circle size={14} className="mr-1" />}
                    单次服务
                  </button>
                  <button 
                    onClick={() => setEditingItem({ ...editingItem, type: "package" })}
                    className={`py-2 rounded-xl text-[13px] font-bold flex items-center justify-center border ${editingItem.type === 'package' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'border-gray-200 text-gray-500'}`}
                  >
                    {editingItem.type === 'package' ? <CheckCircle2 size={14} className="mr-1" /> : <Circle size={14} className="mr-1" />}
                    支持包 (多次)
                  </button>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-gray-500 mb-1.5 block">服务名称</label>
                  <input 
                    type="text" 
                    value={editingItem.name || ""} 
                    onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                    placeholder="如：45分钟心理咨询"
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[14px] font-medium outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-medium text-gray-500 mb-1.5 block">服务时长</label>
                    <input 
                      type="text" 
                      value={editingItem.duration || ""} 
                      onChange={e => setEditingItem({...editingItem, duration: e.target.value})}
                      placeholder="如：45分钟"
                      className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[14px] font-medium outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-gray-500 mb-1.5 block">价格 (元)</label>
                    <input 
                      type="number" 
                      value={editingItem.price || ""} 
                      onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})}
                      placeholder="如：299"
                      className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[14px] font-bold text-orange-500 outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                {editingItem.type === 'package' && (
                  <div className="grid grid-cols-2 gap-3 bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
                    <div>
                      <label className="text-[12px] font-medium text-orange-700/70 mb-1.5 block">包含次数</label>
                      <input 
                        type="number" 
                        value={editingItem.sessionCount || ""} 
                        onChange={e => setEditingItem({...editingItem, sessionCount: Number(e.target.value)})}
                        placeholder="如：3"
                        className="w-full bg-white px-4 py-2.5 rounded-lg text-[13px] font-medium outline-none border border-transparent focus:border-orange-300"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-orange-700/70 mb-1.5 block">有效期</label>
                      <input 
                        type="text" 
                        value={editingItem.validity || ""} 
                        onChange={e => setEditingItem({...editingItem, validity: e.target.value})}
                        placeholder="如：1个月"
                        className="w-full bg-white px-4 py-2.5 rounded-lg text-[13px] font-medium outline-none border border-transparent focus:border-orange-300"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[12px] font-medium text-gray-500 mb-1.5 block">适合人群</label>
                  <input 
                    type="text" 
                    value={editingItem.suitableFor || ""} 
                    onChange={e => setEditingItem({...editingItem, suitableFor: e.target.value})}
                    placeholder="一句话描述适合什么样的用户"
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[13px] outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-gray-500 mb-1.5 block">服务介绍</label>
                  <textarea 
                    value={editingItem.description || ""} 
                    onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="详细描述该服务包含的内容、流程等..."
                    rows={3}
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl text-[13px] outline-none resize-none focus:bg-primary/5 focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-3 pb-8">
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3.5 rounded-xl font-bold text-[15px] bg-gray-900 text-white active:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                >
                  保存配置
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}