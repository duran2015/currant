import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, Wallet, Info, ArrowRight, CheckCircle2, Clock, Filter, AlertCircle } from "lucide-react";

export function CounselorEarnings() {
  const { currentView, popView } = useAppStore();
  const isTab = currentView === "main"; // Check if it's being rendered as a tab
  const [filter, setFilter] = useState("all");

  const [earningsData] = useState({
    estimated: "12,450.00",
    withdrawable: "8,200.00",
    pending: "4,250.00",
    settled: "24,800.00",
  });

  const [transactions] = useState([
    {
      id: "tx1",
      userName: "小鹿用户3821",
      type: "文字咨询",
      time: "今天 14:00",
      orderAmount: 199.00,
      fee: -19.90,
      bonus: 0,
      actual: 179.10,
      status: "pending", // pending, settled
      orderType: "platform", // platform, self, bonus, package
    },
    {
      id: "tx2",
      userName: "匿名用户",
      type: "语音咨询",
      time: "昨天 20:15",
      orderAmount: 299.00,
      fee: 0, // 自带订单免手续费
      bonus: 50.00,
      actual: 349.00,
      status: "settled",
      orderType: "self",
    },
    {
      id: "tx3",
      userName: "小鹿用户9920",
      type: "视频咨询",
      time: "11-18 14:00",
      orderAmount: 499.00,
      fee: -49.90,
      bonus: 0,
      actual: 449.10,
      status: "settled",
      orderType: "platform",
    },
    {
      id: "tx4",
      userName: "系统奖励",
      type: "优质评价激励",
      time: "11-17 10:00",
      orderAmount: 0,
      fee: 0,
      bonus: 100.00,
      actual: 100.00,
      status: "settled",
      orderType: "bonus",
    }
  ]);

  const filteredTransactions = transactions.filter(t => {
    if (filter === "all") return true;
    return t.orderType === filter;
  });

  const filterOptions = [
    { id: "all", label: "全部" },
    { id: "platform", label: "平台订单" },
    { id: "self", label: "自带订单" },
    { id: "package", label: "服务包" },
    { id: "bonus", label: "激励奖励" },
  ];

  return (
    <motion.div
      initial={isTab ? { opacity: 0 } : { x: "100%" }}
      animate={isTab ? { opacity: 1 } : { x: 0 }}
      exit={isTab ? { opacity: 0 } : { x: "100%" }}
      transition={isTab ? undefined : { type: "spring", damping: 25, stiffness: 200 }}
      className={`flex flex-col h-full bg-[#f8f9fa] overflow-hidden ${isTab ? 'relative w-full' : 'absolute inset-0 z-50'}`}
    >
      {/* 1. 顶部标题 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-sm pt-14">
        {!isTab ? (
          <button
            onClick={popView}
            className="w-10 h-10 -ml-2 flex items-center justify-center active:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
        ) : (
          <div className="w-8"></div>
        )}
        <span className="font-bold text-gray-900 text-[17px]">{isTab ? '我的收入' : '收入明细'}</span>
        <div className="w-10 flex justify-end">
          <button className="text-gray-400 hover:text-gray-600">
            <Info size={20} />
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto w-full p-4 ${isTab ? 'pb-28' : 'pb-8'}`}>
        
        {/* 2. 收入总览卡 */}
        <div className="bg-gray-900 rounded-[1.5rem] p-6 shadow-lg mb-6 relative overflow-hidden text-white">
          {/* Background decoration */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[13px] text-gray-300 font-medium mb-1">可提现收入 (元)</div>
                <div className="text-[36px] font-bold tracking-tight">
                  <span className="text-[20px] mr-1">¥</span>{earningsData.withdrawable}
                </div>
              </div>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-[13px] font-bold active:scale-95 transition-transform shadow-md">
                立即提现
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
              <div>
                <div className="text-[11px] text-gray-400 mb-1">本月预估</div>
                <div className="text-[16px] font-bold">¥{earningsData.estimated}</div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400 mb-1 flex items-center">
                  待结算 <Info size={10} className="ml-1 opacity-60" />
                </div>
                <div className="text-[16px] font-bold text-orange-300">¥{earningsData.pending}</div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400 mb-1">累计已结算</div>
                <div className="text-[16px] font-bold">¥{earningsData.settled}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. 结算规则说明 */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 mb-5 flex items-start">
          <AlertCircle size={16} className="text-blue-500 mr-2 shrink-0 mt-0.5" />
          <div className="text-[12px] text-blue-800/80 leading-relaxed">
            <span className="font-bold text-blue-600">结算规则：</span>
            订单服务完成后，需经过 7 天的安全期（无退款/客诉）方可进入可提现余额。
          </div>
        </div>

        {/* 5. 收入类型筛选 */}
        <div className="flex space-x-2 mb-4 overflow-x-auto hide-scrollbar pb-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-bold transition-all ${
                filter === opt.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 4. 收入明细列表 */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 text-[15px] px-1 mb-2">明细账单</h3>
          
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    tx.orderType === 'bonus' ? 'bg-orange-50 text-orange-500' :
                    tx.orderType === 'self' ? 'bg-purple-50 text-purple-500' :
                    'bg-blue-50 text-blue-500'
                  }`}>
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-gray-900 mb-0.5">{tx.userName}</h4>
                    <span className="text-[11px] text-gray-400">{tx.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-[18px] font-bold ${tx.status === 'pending' ? 'text-orange-500' : 'text-gray-900'}`}>
                    +{tx.actual.toFixed(2)}
                  </div>
                  <div className={`text-[11px] font-medium flex items-center justify-end mt-1 ${
                    tx.status === 'pending' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {tx.status === 'pending' ? <Clock size={10} className="mr-1" /> : <CheckCircle2 size={10} className="mr-1" />}
                    {tx.status === 'pending' ? '待结算' : '已入账'}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 text-[12px]">
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-500">账单类型</span>
                  <span className="font-medium text-gray-800">
                    {tx.type} 
                    {tx.orderType === 'self' && <span className="ml-1 bg-purple-100 text-purple-600 px-1 rounded text-[9px]">自带</span>}
                  </span>
                </div>
                {tx.orderAmount > 0 && (
                  <div className="flex justify-between mb-1.5">
                    <span className="text-gray-500">用户实付</span>
                    <span className="font-medium text-gray-800">¥{tx.orderAmount.toFixed(2)}</span>
                  </div>
                )}
                {tx.fee < 0 && (
                  <div className="flex justify-between mb-1.5">
                    <span className="text-gray-500">平台技术服务费 (10%)</span>
                    <span className="font-medium text-red-500">{tx.fee.toFixed(2)}</span>
                  </div>
                )}
                {tx.bonus > 0 && (
                  <div className="flex justify-between mb-1.5">
                    <span className="text-gray-500">平台激励奖励</span>
                    <span className="font-medium text-orange-500">+¥{tx.bonus.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Filter size={24} className="text-gray-300" />
              </div>
              <p className="text-[13px] font-bold text-gray-600">暂无相关明细</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
