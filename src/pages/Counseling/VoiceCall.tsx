import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  Copy,
  LockKeyhole,
  MessageSquare,
  Mic,
  MicOff,
  Minimize2,
  PhoneOff,
  Send,
  ShieldCheck,
  SwitchCamera,
  Video as VideoIcon,
  VideoOff,
  Volume2,
  X,
} from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors, mockUser } from "../../data";

type MeetingState = "lobby" | "waiting" | "in-call" | "ended";

export function VoiceCall() {
  const {
    popView,
    bookingOrder,
    selectedCounselorOrder,
    selectedCounselorId,
    isCallMinimized,
    setIsCallMinimized,
    setActiveCallSession,
    updateOrder,
  } = useAppStore();

  const isCounselorView = Boolean(selectedCounselorOrder);
  const order = isCounselorView ? selectedCounselorOrder : bookingOrder;
  const isVideo = order?.type === "video";
  const counselor = mockCounselors.find((item) => item.id === (order?.counselorId || selectedCounselorId)) || mockCounselors[0];
  const user = mockUser;
  const otherName = isCounselorView ? order?.userName || "小鹿用户3821" : counselor.name;
  const otherAvatar = isCounselorView ? order?.avatar || user.avatar : counselor.avatar;
  const selfAvatar = isCounselorView ? counselor.avatar : user.avatar;
  const selfName = isCounselorView ? counselor.name : user.name || "我";
  const selfRole = isCounselorView ? "咨询师" : "用户";
  const otherRole = isCounselorView ? "用户" : "咨询师";
  const roomNumber = `KL-${String(order?.id || "849201").replace(/\D/g, "").slice(-6).padStart(6, "0")}`;

  const [meetingState, setMeetingState] = useState<MeetingState>("lobby");
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(!isVideo);
  const [speaker, setSpeaker] = useState(true);
  const [duration, setDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [notice, setNotice] = useState("");
  const [messages, setMessages] = useState<{ id: string; sender: "me" | "other"; text: string; time: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meetingState !== "waiting") return;
    const joinTimer = setTimeout(() => setMeetingState("in-call"), 6000);
    return () => clearTimeout(joinTimer);
  }, [meetingState]);

  useEffect(() => {
    if (meetingState !== "in-call") return;
    const timer = setInterval(() => setDuration((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [meetingState]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 1600);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, showChat]);

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const leaveMeeting = () => {
    setActiveCallSession(null);
    setIsCallMinimized(false);
    popView();
  };

  const endMeeting = () => {
    if (order?.id) updateOrder(order.id, { status: "completed", callDuration: duration });
    setMeetingState("ended");
    setShowChat(false);
    setIsCallMinimized(false);
  };

  const sendMessage = () => {
    const value = inputValue.trim();
    if (!value) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((items) => [...items, { id: `${Date.now()}-me`, sender: "me", text: value, time }]);
    setInputValue("");
    setTimeout(() => {
      setMessages((items) => [...items, { id: `${Date.now()}-other`, sender: "other", text: isCounselorView ? "收到，我们继续。" : "我看到了，我们慢慢聊。", time }]);
    }, 900);
  };

  if (isCallMinimized && meetingState !== "lobby" && meetingState !== "ended") {
    return (
      <motion.button
        drag
        dragConstraints={{ left: 10, right: 300, top: 50, bottom: 700 }}
        onClick={() => setIsCallMinimized(false)}
        aria-label="返回预约会议室"
        className="absolute right-4 top-20 z-[200] h-32 w-24 overflow-hidden rounded-2xl border-2 border-white/20 bg-[#17382d] shadow-2xl"
      >
        <img src={otherAvatar} alt={otherName} className="h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
          <span className="text-[10px] font-bold">{meetingState === "waiting" ? "等待加入" : formatTime(duration)}</span>
        </div>
      </motion.button>
    );
  }

  if (meetingState === "lobby") {
    return (
      <div className="absolute inset-0 z-[100] flex flex-col overflow-hidden bg-[#f7f6f1]">
        <div className="flex items-center justify-between px-5 pb-4 pt-12">
          <button onClick={leaveMeeting} aria-label="退出会议室" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm"><ChevronLeft size={22} /></button>
          <div className="text-center"><div className="text-[15px] font-black text-gray-900">预约咨询会议室</div><div className="mt-0.5 text-[10px] font-bold tracking-wider text-gray-400">{roomNumber}</div></div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary"><LockKeyhole size={18} /></div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <div className="hero-panel mb-4 p-5">
            <div className="relative z-10 mb-4 flex items-center justify-between"><div><div className="text-[11px] font-bold text-white/55">{order?.date || "今天"} · {order?.time || "预约时间"}</div><h1 className="mt-1 text-[20px] font-black">{isVideo ? "视频咨询" : "语音咨询"}</h1></div><CalendarClock size={28} className="text-white/60" /></div>
            <div className="relative z-10 flex items-center rounded-2xl bg-black/10 p-3">
              <img src={otherAvatar} alt={otherName} className="mr-3 h-11 w-11 rounded-[14px] border border-white/20 object-cover" />
              <div><div className="text-[13px] font-bold text-white">与 {otherName} 会面</div><div className="mt-0.5 text-[10px] text-white/55">双方进入后才开始计算咨询时长</div></div>
            </div>
          </div>

          <div className="mb-5 flex items-start rounded-[18px] border border-blue-100 bg-blue-50/70 p-4"><ShieldCheck size={18} className="mr-3 mt-0.5 shrink-0 text-blue-600" /><p className="text-[11px] leading-5 text-blue-800">会议室仅限本次预约双方进入，通话内容默认不录音、不录像。请确认当前环境安静且私密。</p></div>
          <button onClick={() => setMeetingState("waiting")} className="w-full rounded-[18px] bg-primary py-4 text-[14px] font-black text-white shadow-[0_12px_28px_rgba(50,116,92,.24)]">进入预约会议室</button>
        </div>
      </div>
    );
  }

  if (meetingState === "ended") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#f7f6f1] p-7 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[26px] bg-primary-light text-primary"><CheckCircle2 size={38} /></div>
        <h1 className="text-[22px] font-black text-gray-900">本次会议已结束</h1>
        <p className="mt-2 text-[13px] leading-6 text-gray-500">双方已离开预约会议室，通话时长 {formatTime(duration)}</p>
        <div className="ui-card mt-7 w-full p-4 text-left"><div className="flex justify-between border-b border-gray-100 pb-3 text-[12px]"><span className="text-gray-500">会议号</span><span className="font-bold text-gray-800">{roomNumber}</span></div><div className="flex justify-between pt-3 text-[12px]"><span className="text-gray-500">服务状态</span><span className="font-bold text-primary">已完成</span></div></div>
        <button onClick={leaveMeeting} className="mt-6 w-full rounded-[18px] bg-primary py-4 text-[14px] font-black text-white">返回预约详情</button>
      </motion.div>
    );
  }

  return (
    <motion.div data-meeting-room initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[100] flex min-h-0 flex-col overflow-hidden bg-[#15271f] text-white">
      <div className="relative z-20 flex items-center justify-between px-4 pb-4 pt-12">
        <button onClick={() => setIsCallMinimized(true)} aria-label="最小化会议" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Minimize2 size={20} /></button>
        <div className="text-center"><div className="flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold"><LockKeyhole size={11} className="mr-1.5 text-green-300" />预约会议 · {roomNumber}</div><div className="mt-2 text-[12px] font-mono text-white/65">{meetingState === "waiting" ? "1/2 人已入会" : formatTime(duration)}</div></div>
        <button onClick={() => { setNotice("已切换摄像头"); }} aria-label="切换摄像头" className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ${isVideo ? "" : "invisible"}`}><SwitchCamera size={20} /></button>
      </div>

      <AnimatePresence>{notice && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-1/2 top-28 z-50 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 text-[11px] backdrop-blur-md">{notice}</motion.div>}</AnimatePresence>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center">
        {meetingState === "waiting" ? <div className="flex h-full w-full flex-col pb-2">
          <div className="mb-3 flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.06] px-3 py-2.5 text-left">
            <div><div className="text-[11px] font-black">会议已开放</div><div className="mt-0.5 text-[9px] text-white/40">{order?.date || "今天"} {order?.time || "预约时间"} · {isVideo ? "视频咨询" : "语音咨询"}</div></div>
            <button onClick={() => setNotice("会议信息已复制")} className="flex items-center rounded-[10px] bg-white/10 px-2.5 py-2 text-[9px] font-bold text-white/70"><Copy size={12} className="mr-1" />复制信息</button>
          </div>
          <div className="grid min-h-0 flex-1 grid-rows-2 gap-2">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[22px] border border-green-300/20 bg-[#243b32]">
            <img src={selfAvatar} alt={selfName} className="mb-3 h-20 w-20 rounded-[24px] object-cover" />
            <div className="text-[13px] font-black">{selfName}</div>
            <div className="mt-1 flex items-center text-[10px] font-bold text-green-300"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400" />{selfRole} · 已进入</div>
          </div>
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-white/15 bg-white/[0.04]">
            <img src={otherAvatar} alt={otherName} className="mb-3 h-20 w-20 rounded-[24px] object-cover opacity-35 grayscale" />
            <div className="text-[13px] font-black text-white/55">{otherName}</div>
            <div className="mt-1 text-[10px] font-bold text-white/35">{otherRole} · 待加入</div>
            <button onClick={() => setNotice(`已提醒${otherName}加入会议`)} className="mt-4 flex items-center rounded-full bg-white/10 px-4 py-2 text-[10px] font-bold text-white/65"><BellRing size={13} className="mr-1.5" />提醒对方</button>
          </div>
          </div>
        </div> : !isVideo ? <><div className="mb-8 flex items-center gap-5"><img src={selfAvatar} alt="我" className="h-20 w-20 rounded-[26px] border-2 border-white/15 object-cover" /><div className="flex gap-1">{[0,1,2].map((i) => <motion.span key={i} animate={{ opacity: [.25,1,.25], height: [6,18,6] }} transition={{ repeat: Infinity, delay: i*.16 }} className="w-1 rounded-full bg-green-300" />)}</div><img src={otherAvatar} alt={otherName} className="h-20 w-20 rounded-[26px] border-2 border-green-300/40 object-cover" /></div><h1 className="text-[22px] font-black">正在与 {otherName} 进行语音咨询</h1><p className="mt-2 text-[12px] text-white/50">双方已进入 · 会议已加密</p></> : <div className="grid h-full w-full grid-rows-2 gap-2 pb-2">
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#243b32]">
            <img src={otherAvatar} alt={`${otherName}的视频画面`} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold backdrop-blur-md"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400" />{otherName} · {otherRole}</div>
          </div>
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#243b32]">
            {cameraOff ? <div className="flex h-full flex-col items-center justify-center"><img src={selfAvatar} alt={selfName} className="mb-2 h-16 w-16 rounded-[20px] object-cover opacity-75" /><span className="text-[10px] text-white/45">摄像头已关闭</span></div> : <img src={selfAvatar} alt={`${selfName}的视频画面`} className="h-full w-full object-cover opacity-80" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold backdrop-blur-md">{muted ? <MicOff size={11} className="mr-1.5 text-orange-300" /> : <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400" />}{selfName} · {selfRole}</div>
          </div>
        </div>}
      </div>

      <div className="relative z-30 shrink-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-10 pt-4">
        <div className="mx-auto flex max-w-sm items-center justify-around">
          <button onClick={() => setMuted(!muted)} aria-label={muted ? "解除静音" : "静音"} className="flex w-16 flex-col items-center gap-2"><span className={`flex h-14 w-14 items-center justify-center rounded-full ${muted ? "bg-white text-black" : "bg-white/12"}`}>{muted ? <MicOff /> : <Mic />}</span><span className="text-[10px] text-white/70">{muted ? "解除静音" : "静音"}</span></button>
          {isVideo ? <button onClick={() => setCameraOff(!cameraOff)} aria-label={cameraOff ? "开启视频" : "关闭视频"} className="flex w-16 flex-col items-center gap-2"><span className={`flex h-14 w-14 items-center justify-center rounded-full ${cameraOff ? "bg-white text-black" : "bg-white/12"}`}>{cameraOff ? <VideoOff /> : <VideoIcon />}</span><span className="text-[10px] text-white/70">视频</span></button> : <button onClick={() => setSpeaker(!speaker)} aria-label="切换免提" className="flex w-16 flex-col items-center gap-2"><span className={`flex h-14 w-14 items-center justify-center rounded-full ${speaker ? "bg-white text-black" : "bg-white/12"}`}><Volume2 /></span><span className="text-[10px] text-white/70">免提</span></button>}
          {meetingState === "waiting" ? <button onClick={() => setNotice(`已提醒${otherName}加入会议`)} aria-label="提醒对方加入" className="flex w-16 flex-col items-center gap-2"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/12"><BellRing /></span><span className="text-[10px] text-white/70">提醒</span></button> : <button onClick={() => setShowChat(true)} aria-label="会议聊天" className="flex w-16 flex-col items-center gap-2"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/12"><MessageSquare /></span><span className="text-[10px] text-white/70">聊天</span></button>}
          <button onClick={meetingState === "waiting" ? leaveMeeting : endMeeting} aria-label={meetingState === "waiting" ? "离开会议室" : "结束会议"} className="flex w-16 flex-col items-center gap-2"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-900/30"><PhoneOff /></span><span className="text-[10px] text-white/70">{meetingState === "waiting" ? "离开" : "结束"}</span></button>
        </div>
      </div>

      <AnimatePresence>{showChat && <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute inset-0 z-[110] flex flex-col bg-[#17241f]/98 backdrop-blur-xl"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4 pt-12"><div><h2 className="font-black">会议内聊天</h2><p className="mt-1 text-[10px] text-white/40">仅本次预约双方可见</p></div><button onClick={() => setShowChat(false)} aria-label="关闭聊天" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><X /></button></div><div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">{messages.length === 0 && <div className="flex h-full flex-col items-center justify-center text-white/35"><MessageSquare className="mb-3" /><span className="text-[12px]">还没有会议消息</span></div>}{messages.map((msg) => <div key={msg.id} className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}><span className="mb-1 text-[9px] text-white/35">{msg.sender === "me" ? "我" : otherName} · {msg.time}</span><div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] ${msg.sender === "me" ? "bg-primary text-white" : "bg-white/10 text-white/90"}`}>{msg.text}</div></div>)}</div><div className="border-t border-white/10 p-4"><div className="flex rounded-full bg-white/10 p-1"><input aria-label="会议消息" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="输入会议消息" className="flex-1 bg-transparent px-4 text-[13px] text-white outline-none placeholder:text-white/30" /><button onClick={sendMessage} aria-label="发送消息" disabled={!inputValue.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary disabled:opacity-30"><Send size={16} /></button></div></div></motion.div>}</AnimatePresence>
    </motion.div>
  );
}
