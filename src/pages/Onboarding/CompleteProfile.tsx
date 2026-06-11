import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, Camera, GraduationCap, School } from "lucide-react";

export function CompleteProfile() {
  const { popView, pushView, resetToView, updateUser } = useAppStore();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    school: "",
    major: "",
    grade: "",
  });

  const handleComplete = () => {
    updateUser({
      name: profile.name || "新用户",
      age: parseInt(profile.age) || undefined,
      school: profile.school,
      major: profile.major,
      grade: profile.grade,
      isNewUser: true,
    });
    pushView("welcome");
  };

  const isFormValid = profile.name.trim().length > 0;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-white absolute inset-0 z-50 p-6 overflow-y-auto"
    >
      <div className="pt-10 mb-6 flex justify-between items-center">
        <button
          onClick={popView}
          className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <button
          onClick={() => {
             updateUser({ isNewUser: true });
             pushView("welcome");
          }}
          className="text-gray-400 text-sm font-medium"
        >
          跳过
        </button>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">完善个人信息</h1>
        <p className="text-gray-500 text-sm mb-8">
          更好地了解你，提供更精准的陪伴
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-surface rounded-full flex flex-col items-center justify-center text-gray-400 border border-gray-200 relative">
            <Camera size={28} />
            <span className="text-[10px] mt-1">上传头像</span>
            <div className="absolute inset-0 border-2 border-transparent rounded-full active:bg-black/5 transition-colors" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">
              昵称 (必填)
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="你想让我们怎么称呼你"
              className="w-full bg-surface border border-gray-100 px-4 py-4 rounded-2xl outline-none focus:border-primary text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">
              年龄
            </label>
            <input
              type="tel"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              placeholder="你的年龄"
              className="w-full bg-surface border border-gray-100 px-4 py-4 rounded-2xl outline-none focus:border-primary text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                学校
              </label>
              <div className="relative">
                <School
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={profile.school}
                  onChange={(e) =>
                    setProfile({ ...profile, school: e.target.value })
                  }
                  placeholder="所在高校"
                  className="w-full bg-surface border border-gray-100 pl-10 pr-4 py-4 rounded-2xl outline-none focus:border-primary text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                年级
              </label>
              <div className="relative">
                <GraduationCap
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={profile.grade}
                  onChange={(e) =>
                    setProfile({ ...profile, grade: e.target.value })
                  }
                  placeholder="如: 大二"
                  className="w-full bg-surface border border-gray-100 pl-10 pr-4 py-4 rounded-2xl outline-none focus:border-primary text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pb-8">
        <button
          onClick={handleComplete}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-full font-medium transition-all ${isFormValid ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-gray-100 text-gray-400"}`}
        >
          保存并继续
        </button>
      </div>
    </motion.div>
  );
}
