import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { 
  ChevronRight, 
  UserCircle, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  Star, 
  Users, 
  Link as LinkIcon, 
  Ticket, 
  PenTool, 
  Lightbulb, 
  ClipboardList, 
  FileText, 
  Wallet, 
  Lock, 
  AlertTriangle, 
  FileSignature, 
  Settings, 
  Bell, 
  Headphones, 
  MessageSquare, 
  LogOut,
  QrCode,
  Share2,
  CheckCircle2,
  Sparkles
} from "lucide-react";

  export function CounselorProfileTab() {
  const { pushView, resetToView, setTab, enterAppMode } = useAppStore();

  const handleLogout = () => {
    resetToView("login");
  };

  const ServiceModules = [
    { icon: UserCircle, label: "入驻资料", view: "counselor-onboarding", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: ShoppingBag, label: "服务商品", view: "counselor-services", color: "text-pink-500", bg: "bg-pink-50" },
    { icon: Clock, label: "可预约时间", view: "counselor-schedule", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: ShieldCheck, label: "服务边界确认", view: "counselor-boundary", color: "text-teal-500", bg: "bg-teal-50" },
    { icon: Star, label: "我的评价", view: "counselor-evaluations", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Users, label: "我的客户", view: "counselor-clients", color: "text-indigo-500", bg: "bg-indigo-50", isTab: true },
  ];

  const GrowthModules = [
    { icon: LinkIcon, label: "专属预约链接", isNew: false },
    { icon: Ticket, label: "首单优惠券", isNew: false },
    { icon: PenTool, label: "主页文案助手", isNew: true, tag: "内测中" },
    { icon: Lightbulb, label: "内容选题库", isNew: true, tag: "即将上线" },
    { icon: ClipboardList, label: "测评获客工具", isNew: true, tag: "即将上线" },
  ];

  const RuleModules = [
    { icon: FileText, label: "服务规则" },
    { icon: Wallet, label: "结算规则" },
    { icon: Lock, label: "隐私与数据说明" },
    { icon: AlertTriangle, label: "风险上报说明" },
    { icon: FileSignature, label: "平台合作协议" },
  ];

  const SupportModules = [
    { icon: Settings, label: "账号设置" },
    { icon: Bell, label: "消息通知" },
    { icon: Headphones, label: "联系平台运营" },
    { icon: MessageSquare, label: "意见反馈" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa] overflow-hidden relative w-full"
    >
      <div className="flex-1 overflow-y-auto w-full pb-28">
        
        {/* 1. 顶部个人信息卡 */}
        <div className="bg-white px-4 pt-16 pb-6 shadow-sm border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <img 
                src="https://ui-avatars.com/api/?name=Lin&background=random" 
                alt="avatar" 
                className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm object-cover mr-4"
              />
              <div>
                <h1 className="text-[20px] font-bold text-gray-900 mb-1 flex items-center">
                  林老师
                  <CheckCircle2 size={16} className="text-green-500 ml-1.5" />
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-[12px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium border border-blue-100">心理咨询师</span>
                  <span className="text-[12px] text-gray-500">已通过审核</span>
                </div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
              <Settings size={18} />
            </button>
          </div>

          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex-1 flex flex-col items-center border-r border-gray-200 last:border-0">
              <span className="text-[15px] font-bold text-gray-900 mb-0.5">85%</span>
              <span className="text-[11px] text-gray-500">主页完整度</span>
            </div>
            <div className="flex-1 flex flex-col items-center border-r border-gray-200 last:border-0">
              <span className="text-[15px] font-bold text-gray-900 mb-0.5">128次</span>
              <span className="text-[11px] text-gray-500">服务次数</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-[15px] font-bold text-gray-900 mb-0.5">98%</span>
              <span className="text-[11px] text-gray-500">好评率</span>
            </div>
          </div>
        </div>

        {/* 2. 个人主页入口 (私域营销强导向) */}
        <div className="p-4">
          <div className="bg-gray-900 rounded-[1.2rem] p-4 shadow-md text-white relative overflow-hidden flex flex-col mb-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                  <UserCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] mb-0.5">我的个人主页</h3>
                  <p className="text-[11px] text-white/70">完善主页可提升 30% 转化率</p>
                </div>
              </div>
              <button 
                onClick={() => pushView("counselor-detail" as any)}
                className="text-[12px] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-medium transition-colors backdrop-blur-sm"
              >
                预览效果
              </button>
            </div>

            <div className="flex space-x-3 relative z-10">
              <button className="flex-1 bg-white text-gray-900 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center active:scale-95 transition-transform shadow-sm">
                <Share2 size={16} className="mr-1.5" /> 分享主页
              </button>
              <button className="flex-1 bg-white/10 text-white py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center active:bg-white/20 transition-colors backdrop-blur-sm">
                <QrCode size={16} className="mr-1.5" /> 生成二维码
              </button>
            </div>
          </div>

          {/* 3. 服务管理模块 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 mt-4">
            <h3 className="font-bold text-gray-900 text-[14px] mb-3 px-1">服务管理</h3>
            <div className="grid grid-cols-4 gap-y-4">
              {ServiceModules.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center cursor-pointer active:opacity-70 transition-opacity"
                  onClick={() => {
                  if (item.isTab) {
                    setTab('clients');
                  } else if (item.view) {
                    pushView(item.view as any);
                  }
                }}
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-1.5`}>
                    <item.icon size={22} />
                  </div>
                  <span className="text-[11px] text-gray-700 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 增长工具模块 */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center px-3 py-2">
              <Sparkles size={16} className="text-orange-500 mr-2" />
              <h3 className="font-bold text-gray-900 text-[14px]">增长工具</h3>
            </div>
            <div>
              {GrowthModules.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-3 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <item.icon size={18} className="text-gray-400 mr-3" />
                    <span className="text-[14px] text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center">
                    {item.isNew && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium mr-2 ${item.tag === '内测中' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                        {item.tag}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 平台规则模块 */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-4">
            <h3 className="font-bold text-gray-900 text-[14px] px-3 py-2">规则与协议</h3>
            <div>
              {RuleModules.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-3 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <item.icon size={18} className="text-gray-400 mr-3" />
                    <span className="text-[14px] text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* 6. 账号与支持模块 */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-4">
            <h3 className="font-bold text-gray-900 text-[14px] px-3 py-2">账号与支持</h3>
            <div>
              {SupportModules.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-3 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <item.icon size={18} className="text-gray-400 mr-3" />
                    <span className="text-[14px] text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Switch to User Mode */}
          <button 
            onClick={() => {
              enterAppMode("user");
            }}
            className="w-full bg-white text-primary font-bold text-[15px] py-4 rounded-2xl shadow-sm border border-primary/20 active:bg-gray-50 transition-colors flex items-center justify-center mb-4"
          >
            <UserCircle size={18} className="mr-2" /> 切换为用户身份
          </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-white text-red-500 font-bold text-[15px] py-4 rounded-2xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors flex items-center justify-center mb-4"
          >
            <LogOut size={18} className="mr-2" /> 退出登录
          </button>
          
          <div className="text-center pb-6">
            <span className="text-[11px] text-gray-400">可鹿心理 咨询师端 v1.0.0</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
