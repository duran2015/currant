import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Smartphone,
  ShieldCheck,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { mockCounselors } from "../../data";

export function Payment() {
  const {
    popView,
    pushView,
    resetToView,
    bookingOrder,
    setBookingOrder,
    addOrder,
  } = useAppStore();
  const [status, setStatus] = useState<
    "checkout" | "paying" | "success" | "failed"
  >("checkout");
  const [paymentMethod, setPaymentMethod] = useState<"wechat" | "alipay">(
    "wechat",
  );
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const counselor = mockCounselors.find(
    (c) => c.id === bookingOrder?.counselorId,
  );

  useEffect(() => {
    if (status !== "checkout") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus("failed");
          setBookingOrder((order) =>
            order ? { ...order, status: "failed" } : null,
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, setBookingOrder]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePay = () => {
    setStatus("paying");
    setTimeout(() => {
      if (paymentMethod === "alipay") {
        setStatus("failed");
        setBookingOrder((prev) =>
          prev ? { ...prev, status: "failed" } : null,
        );
      } else {
        setStatus("success");
        setBookingOrder((prev) => {
          if (prev) {
            const updated = { ...prev, status: "paid" };
            addOrder(updated);
            return updated;
          }
          return null;
        });
      }
    }, 1500);
  };

  const handleCancelOrder = () => {
    setBookingOrder(null);
    popView();
  };

  const handleRefund = () => {
    setBookingOrder((prev) => (prev ? { ...prev, status: "refunded" } : null));
    resetToView("main");
  };

  if (!bookingOrder || !counselor) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-surface absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-10 flex items-center shadow-sm">
        {status === "checkout" && (
          <button
            onClick={handleCancelOrder}
            className="mr-3 p-2 rounded-full active:bg-gray-100"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
        )}
        <h1 className="text-[17px] font-bold flex-1 text-center pr-10 text-gray-900">
          {status === "success"
            ? "支付成功"
            : status === "failed"
              ? "订单异常"
              : "确认订单"}
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {status === "checkout" && (
          <motion.div
            key="checkout"
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 overflow-y-auto pb-32"
          >
            <div className="p-5">
              {/* Payment Timer */}
              <div className="bg-orange-50 text-orange-600 rounded-xl p-3 mb-6 flex items-center justify-center space-x-2">
                <Clock size={16} />
                <span className="text-sm font-medium">
                  支付剩余时间 {formatTime(timeLeft)}
                </span>
              </div>

              {/* Order Info Card */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-50 mb-6">
                  <img
                    src={counselor.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{counselor.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {counselor.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">咨询方式</span>
                    <span className="font-medium text-gray-900">
                      {bookingOrder.type === "text"
                        ? "文字沟通"
                        : "语音/视频咨询"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">预约时间</span>
                    <span className="font-bold text-primary">
                      {bookingOrder.date} {bookingOrder.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">支持时长</span>
                    <span className="font-medium text-gray-900">
                      {bookingOrder.type === "text"
                        ? "单次/周期回复"
                        : "50分钟"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <h3 className="text-sm font-bold text-gray-900 mb-3 px-1 ml-1">
                支付方式
              </h3>
              <div className="bg-white rounded-[2rem] border border-gray-100 p-2 shadow-sm space-y-1">
                <button
                  onClick={() => setPaymentMethod("wechat")}
                  className={`w-full flex items-center justify-between p-4 rounded-[1.5rem] transition-colors ${paymentMethod === "wechat" ? "bg-green-50" : "bg-transparent"}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="font-medium text-gray-900 text-[15px]">
                      微信支付
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "wechat" ? "border-green-500 bg-green-500" : "border-gray-300"}`}
                  >
                    {paymentMethod === "wechat" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod("alipay")}
                  className={`w-full flex items-center justify-between p-4 rounded-[1.5rem] transition-colors ${paymentMethod === "alipay" ? "bg-blue-50" : "bg-transparent"}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Smartphone size={18} />
                    </div>
                    <span className="font-medium text-gray-900 text-[15px]">
                      支付宝
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "alipay" ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                  >
                    {paymentMethod === "alipay" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex justify-between items-center">
              <div className="flex flex-col ml-2">
                <span className="text-[13px] text-gray-500 mb-0.5 font-medium">
                  实付款
                </span>
                <div className="flex items-end">
                  <span className="text-sm font-bold text-gray-900 mr-0.5">
                    ¥
                  </span>
                  <span className="text-2xl font-bold text-gray-900 leading-none">
                    {bookingOrder.price}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={handlePay}
                  className="w-[160px] bg-gray-900 text-white font-bold py-4 rounded-full active:bg-gray-800 transition-colors shadow-md shadow-gray-900/20 text-[15px] mb-1"
                >
                  立即支付
                </button>
                <span className="text-[10px] text-gray-400">
                  选择支付宝将模拟支付失败
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {status === "paying" && (
          <motion.div
            key="paying"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
            <h2 className="text-lg font-bold text-gray-900">正在唤起支付...</h2>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-primary w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">预约成功</h2>
            <p className="text-gray-500 text-sm leading-relaxed text-center mb-10 px-4">
              您已成功预约{" "}
              <span className="font-bold text-gray-700">{counselor.name}</span>
              <br />
              时间：{bookingOrder.date} {bookingOrder.time}
              <br />
              <span className="inline-block mt-4 text-[12px] bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">
                请提前 5 分钟进入咨询室准备
              </span>
            </p>

            <div className="w-full max-w-xs space-y-4">
              <button
                onClick={() => {
                  pushView("orders-list");
                }}
                className="w-full bg-primary text-white font-bold py-4 rounded-full active:scale-95 transition-transform"
              >
                查看我的订单
              </button>
              <button
                onClick={() => resetToView("main")}
                className="w-full bg-gray-50 text-gray-700 font-bold py-4 rounded-full active:scale-95 transition-transform"
              >
                返回首页
              </button>
            </div>

            <button
              onClick={handleRefund}
              className="mt-8 text-xs text-gray-400 underline underline-offset-2"
            >
              申请退单并取消预约
            </button>
          </motion.div>
        )}
        {status === "failed" && (
          <motion.div
            key="failed"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <XCircle className="text-red-500 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">支付异常</h2>
            <p className="text-gray-500 text-sm leading-relaxed text-center mb-10 px-4">
              订单支付未完成或已超时，请重新核对信息后再试。
              <br />
              若已扣款，系统将在24小时内原路退回。
            </p>

            <div className="w-full max-w-xs space-y-4">
              <button
                onClick={() => setStatus("checkout")}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-full active:scale-95 transition-transform"
              >
                重新支付
              </button>
              <button
                onClick={handleCancelOrder}
                className="w-full bg-gray-50 text-gray-700 font-bold py-4 rounded-full active:scale-95 transition-transform"
              >
                放弃订单并返回
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
