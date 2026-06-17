import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, Bell, FileText, CalendarClock } from "lucide-react";
import { mockNotifications } from "../../data";

export function NotificationsList() {
  const { popView, pushView, setSelectedNotificationId } = useAppStore();

  const handleSelect = (id: string) => {
    setSelectedNotificationId(id);
    pushView("notification-detail");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "report":
        return <FileText size={20} className="text-purple-500" />;
      case "booking":
        return <CalendarClock size={20} className="text-orange-500" />;
      case "system":
      default:
        return <Bell size={20} className="text-blue-500" />;
    }
  };

  const getBgClass = (type: string) => {
    switch (type) {
      case "report":
        return "bg-purple-50";
      case "booking":
        return "bg-orange-50";
      case "system":
      default:
        return "bg-blue-50";
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">
          系统通知
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bell size={48} className="mb-4 text-gray-300" />
            <p>暂无通知</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockNotifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => handleSelect(notif.id)}
                className="w-full bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-start active:scale-[0.98] transition-transform text-left"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 shrink-0 ${getBgClass(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-[15px] truncate pr-2">
                      {notif.title}
                    </h3>
                    <span className="text-[11px] text-gray-400 shrink-0 whitespace-nowrap mt-0.5">
                      {notif.date}
                    </span>
                  </div>
                  <p className={`text-[13px] line-clamp-2 ${notif.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                    {notif.preview}
                  </p>
                </div>
                {!notif.isRead && (
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 ml-2 shrink-0"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}