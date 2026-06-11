import { Counselor, TodayTask, UserProfile } from "./types";

export const mockUser: UserProfile = {
  id: "u1",
  name: "小明",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  statusScore: 72,
  statusTrend: 8,
  statusSummary: "最近压力有所下降，睡眠质量有待提高。",
  isNewUser: false,
  hasRisk: false,
  role: "active",
};

export const mockCounselors: Counselor[] = [
  {
    id: "c1",
    name: "林静",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "国家二级心理咨询师",
    tags: ["情绪管理", "学业焦虑", "人际关系"],
    price: 300,
    rating: 4.9,
    reviewsCount: 128,
    about:
      "从业8年，擅长使用认知行为疗法（CBT）和正念疗法，帮助大学生群体缓解考试焦虑、就业迷茫和人际关系冲突，陪伴你走过人生的低谷。",
    specialties: [
      "考试焦虑缓解",
      "宿舍人际冲突处理",
      "恋爱边界感建立",
      "早期抑郁倾向干预",
    ],
    type: "pro",
    status: "online",
    schedules: [
      {
        date: "11-20",
        label: "今天",
        isFull: false,
        times: ["14:00", "15:30", "19:00"],
      },
      {
        date: "11-21",
        label: "明天",
        isFull: false,
        times: ["09:00", "10:30", "14:00", "16:00"],
      },
      { date: "11-22", label: "周五", isFull: true, times: [] },
      { date: "11-23", label: "周六", isFull: false, times: ["10:00"] },
    ],
  },
  {
    id: "c2",
    name: "张宇",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    title: "临床心理学硕士",
    tags: ["失眠困扰", "抑郁情绪", "原生家庭"],
    price: 450,
    rating: 4.8,
    reviewsCount: 86,
    about:
      "致力于解决由于原生家庭带来的心理创伤，以及长期高压导致的睡眠障碍。通过精神分析与人本主义结合的方式，带你重新认识自己。",
    specialties: ["原生家庭创伤疗愈", "长期失眠改善", "自我认同感提升"],
    type: "listener",
    status: "busy",
    schedules: [
      { date: "11-20", label: "今天", isFull: true, times: [] },
      {
        date: "11-21",
        label: "明天",
        isFull: false,
        times: ["10:00", "14:00"],
      },
      {
        date: "11-23",
        label: "周六",
        isFull: false,
        times: ["09:00", "11:00", "15:00"],
      },
    ],
  },
];

export const mockTodayTask: TodayTask = {
  id: "t1",
  title: "4-7-8 呼吸放松",
  duration: "5 分钟",
  reason:
    "你最近反映睡前容易焦虑，这个练习可以帮助你快速平静下来，为入睡做准备。",
  type: "breathing",
};
