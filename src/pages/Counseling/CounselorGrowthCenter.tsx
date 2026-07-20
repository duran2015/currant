import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  BarChart3,
  CalendarClock,
  Check,
  ChevronRight,
  Copy,
  Gift,
  Link2,
  QrCode,
  Share2,
  Sparkles,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { useAppStore } from "../../store";

type GrowthSection = "overview" | "homepage" | "test" | "benefit";

const funnel = [
  { label: "分享页访问", value: 286, color: "bg-[#316b5b]" },
  { label: "测试完成", value: 174, color: "bg-[#4b8172]" },
  { label: "主页访问", value: 126, color: "bg-[#6b9a8c]" },
  { label: "完成预约", value: 18, color: "bg-[#d79b59]" },
  { label: "实际履约", value: 15, color: "bg-[#ddae75]" },
];

const tests = [
  { id: "burnout", title: "你的职场消耗来自哪里？", desc: "12 道情境题 · 约 3 分钟", conversion: "近 7 天完成率 64%", tone: "bg-[#e6f1ed] text-[#285c4d]" },
  { id: "partner", title: "你和 TA 是哪种职场搭子？", desc: "双人完成 · 适合社群传播", conversion: "分享率较高", tone: "bg-[#ecebfa] text-[#5b5791]" },
  { id: "leader", title: "你和领导卡在哪种沟通困局？", desc: "10 道题 · 管理关系主题", conversion: "新上线", tone: "bg-[#f8ecdc] text-[#8a6032]" },
];

export function CounselorGrowthCenter({ isTab = false }: { isTab?: boolean; key?: string }) {
  const { popView } = useAppStore();
  const [section, setSection] = useState<GrowthSection>("overview");
  const [selectedTest, setSelectedTest] = useState(tests[0].id);
  const [benefitEnabled, setBenefitEnabled] = useState(true);
  const [discount, setDiscount] = useState(50);
  const [validDays, setValidDays] = useState(14);
  const [funding, setFunding] = useState<"platform" | "shared">("shared");
  const [sheet, setSheet] = useState<"share" | "qr" | null>(null);
  const [notice, setNotice] = useState("");

  const referralLink = "kelu.cn/c/linan?from=profile";
  const activeTest = useMemo(() => tests.find((item) => item.id === selectedTest) || tests[0], [selectedTest]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const copyLink = () => {
    void navigator.clipboard?.writeText(`https://${referralLink}`);
    notify("专属链接已复制");
  };

  return (
    <motion.div initial={{ opacity: 0, x: isTab ? 0 : 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`${isTab ? "relative h-full w-full" : "absolute inset-0 z-[80]"} flex flex-col bg-[#f3f6f4]`}>
      <header className="flex shrink-0 items-end border-b border-black/5 bg-white/90 px-5 pb-3 pt-12 backdrop-blur-xl">
        {isTab ? <div className="w-10" /> : <button onClick={popView} aria-label="返回" className="grid h-10 w-10 place-items-center rounded-full text-gray-700"><ArrowLeft size={22} /></button>}
        <div className="flex-1 text-left"><h1 className="text-[17px] font-black text-gray-900">获客</h1><p className="mt-0.5 text-[10px] text-gray-400">分享主页、测试与体验权益</p></div>
        <button onClick={() => setSheet("share")} aria-label="分享" className="grid h-10 w-10 place-items-center rounded-full bg-primary-light text-primary"><Share2 size={18} /></button>
      </header>

      <nav className="shrink-0 border-b border-black/5 bg-white px-4 py-3">
        <div className="grid grid-cols-4 rounded-[14px] bg-gray-100 p-1">
          {([
            ["overview", "概览"], ["homepage", "预约主页"], ["test", "职场测试"], ["benefit", "体验权益"],
          ] as [GrowthSection, string][]).map(([id, label]) => <button key={id} onClick={() => setSection(id)} className={`h-9 rounded-[11px] text-[11px] font-bold transition ${section === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>{label}</button>)}
        </div>
      </nav>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-12 pt-4">
        {section === "overview" && <div className="space-y-4">
          <section className="overflow-hidden rounded-[24px] bg-[#193b32] p-5 text-white shadow-[0_16px_34px_rgba(25,59,50,.18)]">
            <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold tracking-[.16em] text-white/45">本月自带用户收入</p><div className="mt-2 flex items-baseline"><span className="text-[32px] font-black">¥2,680</span><span className="ml-2 text-[11px] text-white/45">15 次履约</span></div></div><div className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-[#cde8df]">低分成订单</div></div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4"><div><b className="text-[16px]">286</b><p className="mt-1 text-[9px] text-white/45">分享访问</p></div><div><b className="text-[16px]">18</b><p className="mt-1 text-[9px] text-white/45">带来预约</p></div><div><b className="text-[16px]">6.3%</b><p className="mt-1 text-[9px] text-white/45">访问转预约</p></div></div>
          </section>

          <section className="rounded-[22px] border border-black/5 bg-white p-4">
            <div className="mb-4 flex items-center justify-between"><div><h2 className="text-[15px] font-black text-gray-900">获客漏斗</h2><p className="mt-1 text-[10px] text-gray-400">近 30 天 · 已排除重复访问</p></div><BarChart3 size={19} className="text-primary" /></div>
            <div className="space-y-3">{funnel.map((item, index) => <div key={item.label} className="flex items-center gap-3"><span className="w-[68px] text-[10px] font-bold text-gray-500">{item.label}</span><div className="h-8 flex-1 overflow-hidden rounded-[10px] bg-gray-50"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(26, (item.value / funnel[0].value) * 100)}%` }} className={`flex h-full items-center justify-end rounded-[10px] px-2 ${item.color}`}><span className="text-[10px] font-black text-white">{item.value}</span></motion.div></div>{index < funnel.length - 1 && <span className="w-8 text-right text-[9px] text-gray-400">{Math.round((funnel[index + 1].value / item.value) * 100)}%</span>}</div>)}</div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            {[{ id: "homepage" as const, icon: Link2, title: "专属预约主页", desc: "链接、小程序码与预约" }, { id: "test" as const, icon: Sparkles, title: "专属职场测试", desc: "选择主题并生成分享卡" }, { id: "benefit" as const, icon: Ticket, title: "首次体验权益", desc: benefitEnabled ? `新用户立减 ¥${discount}` : "当前未开启" }, { id: "overview" as const, icon: Users, title: "来源归因", desc: "18 位用户来自你的分享" }].map((item) => <button key={item.title} onClick={() => setSection(item.id)} className="rounded-[20px] border border-black/5 bg-white p-4 text-left active:scale-[.98]"><div className="mb-3 grid h-10 w-10 place-items-center rounded-[13px] bg-primary-light text-primary"><item.icon size={20} /></div><h3 className="text-[13px] font-black text-gray-900">{item.title}</h3><p className="mt-1.5 text-[10px] leading-4 text-gray-400">{item.desc}</p></button>)}
          </section>
        </div>}

        {section === "homepage" && <div className="space-y-4">
          <section className="rounded-[24px] bg-[#193b32] p-5 text-white">
            <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-[16px] bg-white/10"><Link2 size={23} /></div><div><h2 className="text-[17px] font-black">林安的预约主页</h2><p className="mt-1 text-[10px] text-white/50">来源标识 LINAN · 自动归因</p></div></div>
            <div className="mt-5 rounded-[14px] bg-black/15 p-3"><p className="text-[9px] text-white/40">专属链接</p><div className="mt-1 flex items-center justify-between gap-2"><span className="truncate text-[11px] font-bold">{referralLink}</span><button onClick={copyLink} className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold"><Copy size={12} className="mr-1 inline" />复制</button></div></div>
            <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => setSheet("share")} className="rounded-[14px] bg-white py-3 text-[12px] font-black text-[#193b32]"><Share2 size={15} className="mr-1.5 inline" />分享主页</button><button onClick={() => setSheet("qr")} className="rounded-[14px] bg-white/10 py-3 text-[12px] font-black"><QrCode size={15} className="mr-1.5 inline" />小程序码</button></div>
          </section>
          <section className="rounded-[22px] border border-black/5 bg-white p-5"><div className="flex items-start"><img src="https://ui-avatars.com/api/?name=LA&background=2f6b5a&color=fff" alt="林安" className="h-16 w-16 rounded-[20px] object-cover" /><div className="ml-3"><div className="flex items-center gap-2"><h3 className="text-[17px] font-black">林安</h3><span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-bold text-green-700">平台已审核</span></div><p className="mt-1 text-[11px] text-gray-500">职场支持师 · 8 年从业经验</p><p className="mt-2 text-[10px] leading-4 text-gray-400">擅长职场压力、管理沟通与职业倦怠</p></div></div><div className="mt-4 flex gap-2">{["周三 19:00", "周四 20:00", "周六 10:00"].map((time) => <span key={time} className="rounded-full bg-gray-50 px-2.5 py-1.5 text-[9px] font-bold text-gray-600">{time}</span>)}</div><div className="mt-4 flex items-center justify-between rounded-[14px] bg-[#fff6e9] p-3"><div><p className="text-[11px] font-black text-[#8a6032]">新用户首次体验</p><p className="mt-1 text-[9px] text-[#a87a48]">{benefitEnabled ? `14 天内预约立减 ¥${discount}` : "暂未开启体验权益"}</p></div><Gift size={20} className="text-[#c58b4c]" /></div><button onClick={() => notify("已进入预约时间选择")} className="mt-4 h-12 w-full rounded-[15px] bg-primary text-[13px] font-black text-white">立即预约</button></section>
          <section className="rounded-[18px] border border-black/5 bg-white p-4"><h3 className="text-[13px] font-black">来源归因规则</h3><p className="mt-2 text-[10px] leading-5 text-gray-500">用户通过你的链接、小程序码或测试卡进入后，30 天内首次预约将归因给你。重复访问和已注册老用户不会重复计入。</p></section>
        </div>}

        {section === "test" && <div className="space-y-4">
          <section className="rounded-[22px] border border-black/5 bg-white p-4"><h2 className="text-[15px] font-black">选择一个传播主题</h2><p className="mt-1 text-[10px] text-gray-400">分享卡将自动带上你的名字和来源标识</p><div className="mt-4 space-y-3">{tests.map((test) => <button key={test.id} onClick={() => setSelectedTest(test.id)} className={`flex w-full items-center rounded-[17px] border p-3 text-left ${selectedTest === test.id ? "border-primary bg-primary-light/40" : "border-gray-100 bg-white"}`}><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] ${test.tone}`}><Sparkles size={20} /></div><div className="ml-3 min-w-0 flex-1"><h3 className="text-[12px] font-black text-gray-900">{test.title}</h3><p className="mt-1 text-[9px] text-gray-400">{test.desc} · {test.conversion}</p></div><div className={`grid h-5 w-5 place-items-center rounded-full border ${selectedTest === test.id ? "border-primary bg-primary text-white" : "border-gray-200"}`}>{selectedTest === test.id && <Check size={12} />}</div></button>)}</div></section>
          <section className="overflow-hidden rounded-[24px] bg-[#2d3155] p-5 text-white"><span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-[#f1d89b]">林安老师的职场测试</span><h2 className="mt-5 text-[21px] font-black leading-7">{activeTest.title}</h2><p className="mt-2 text-[10px] text-white/50">完成测试，获得一份专属建议</p><div className="mt-6 flex items-end justify-between"><div><p className="text-[9px] text-white/40">已有 174 人完成</p><p className="mt-1 text-[10px] font-bold">长按识别小程序码开始</p></div><div className="grid h-16 w-16 place-items-center rounded-[14px] bg-white text-[#2d3155]"><QrCode size={42} /></div></div></section>
          <button onClick={() => setSheet("share")} className="h-[52px] w-full rounded-[16px] bg-primary text-[14px] font-black text-white"><Share2 size={17} className="mr-2 inline" />生成并分享测试卡</button>
          <div className="rounded-[16px] bg-blue-50 p-3 text-[10px] leading-5 text-blue-700">用户完成测试后将看到你的专业建议、预约主页和首次体验权益；来源会自动计入获客漏斗。</div>
        </div>}

        {section === "benefit" && <div className="space-y-4">
          <section className="rounded-[22px] border border-black/5 bg-white p-5"><div className="flex items-center justify-between"><div><h2 className="text-[15px] font-black">首次体验权益</h2><p className="mt-1 text-[10px] text-gray-400">仅限从你的分享进入的新用户</p></div><button onClick={() => setBenefitEnabled(!benefitEnabled)} aria-pressed={benefitEnabled} className={`h-8 w-14 rounded-full p-1 transition ${benefitEnabled ? "bg-primary" : "bg-gray-200"}`}><motion.span animate={{ x: benefitEnabled ? 24 : 0 }} className="block h-6 w-6 rounded-full bg-white shadow" /></button></div></section>
          <section className={`rounded-[22px] border border-black/5 bg-white p-5 transition ${benefitEnabled ? "" : "pointer-events-none opacity-45"}`}><h3 className="text-[12px] font-black">优惠金额</h3><div className="mt-3 grid grid-cols-3 gap-2">{[20, 50, 80].map((value) => <button key={value} onClick={() => setDiscount(value)} className={`h-11 rounded-[13px] text-[12px] font-black ${discount === value ? "bg-primary text-white" : "bg-gray-50 text-gray-600"}`}>¥{value}</button>)}</div><h3 className="mt-5 text-[12px] font-black">有效期</h3><div className="mt-3 grid grid-cols-3 gap-2">{[7, 14, 30].map((value) => <button key={value} onClick={() => setValidDays(value)} className={`h-11 rounded-[13px] text-[11px] font-bold ${validDays === value ? "bg-primary-light text-primary ring-1 ring-primary/20" : "bg-gray-50 text-gray-500"}`}>{value} 天</button>)}</div><h3 className="mt-5 text-[12px] font-black">补贴承担</h3><div className="mt-3 space-y-2">{([['shared', '平台与我共同承担', `平台 ¥${Math.ceil(discount * .6)} · 我 ¥${Math.floor(discount * .4)}`], ['platform', '平台活动补贴', '需满足本月新客活动条件']] as const).map(([id, title, desc]) => <button key={id} onClick={() => setFunding(id)} className={`flex w-full items-center rounded-[14px] border p-3 text-left ${funding === id ? "border-primary bg-primary-light/30" : "border-gray-100"}`}><span className={`mr-3 h-4 w-4 rounded-full border-[4px] ${funding === id ? "border-primary" : "border-gray-200"}`} /><span><b className="block text-[11px]">{title}</b><small className="mt-1 block text-[9px] text-gray-400">{desc}</small></span></button>)}</div></section>
          <section className="rounded-[18px] border border-amber-100 bg-amber-50 p-4"><h3 className="text-[11px] font-black text-amber-800">领取限制</h3><ul className="mt-2 space-y-1 text-[10px] leading-5 text-amber-700"><li>· 同一手机号、微信账号和设备仅可领取一次</li><li>· 仅限首次在平台预约的新用户</li><li>· 仅可预约林安老师，过期自动失效</li><li>· 退款后权益不返还，异常领取由平台拦截</li></ul></section>
          <button onClick={() => notify("体验权益已保存")} className="h-[52px] w-full rounded-[16px] bg-primary text-[14px] font-black text-white">保存权益设置</button>
        </div>}
      </main>

      <AnimatePresence>{notice && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-1/2 top-24 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-[11px] font-bold text-white shadow-xl">{notice}</motion.div>}</AnimatePresence>
      <AnimatePresence>{sheet && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 flex items-end bg-black/35" onClick={() => setSheet(null)}><motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} onClick={(event) => event.stopPropagation()} className="w-full rounded-t-[28px] bg-white p-6 pb-[calc(24px+env(safe-area-inset-bottom))]"><button onClick={() => setSheet(null)} aria-label="关闭" className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-gray-100"><X size={17} /></button>{sheet === "qr" ? <div className="text-center"><div className="mx-auto grid h-44 w-44 place-items-center rounded-[24px] border border-gray-100 bg-white shadow-sm"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=148x148&data=${encodeURIComponent(`https://${referralLink}`)}`} alt="林安的专属预约二维码" className="h-[148px] w-[148px]" /></div><h2 className="mt-5 text-[18px] font-black">专属预约小程序码</h2><p className="mt-2 text-[11px] text-gray-400">来源标识 LINAN · 访问与预约自动归因</p><button onClick={() => notify("小程序码已保存到相册")} className="mt-5 h-12 w-full rounded-[15px] bg-primary text-[13px] font-black text-white">保存到相册</button></div> : <div><div className="grid h-12 w-12 place-items-center rounded-[16px] bg-primary-light text-primary"><Share2 size={22} /></div><h2 className="mt-5 text-[19px] font-black">分享给需要的人</h2><p className="mt-2 text-[11px] leading-5 text-gray-500">分享内容会自动包含咨询师介绍、可预约时间、体验权益和来源归因。</p><div className="mt-5 grid grid-cols-3 gap-3">{["微信好友", "朋友圈", "复制链接"].map((item) => <button key={item} onClick={() => { if (item === "复制链接") copyLink(); else notify(`已生成${item}分享内容`); setSheet(null); }} className="rounded-[15px] bg-gray-50 px-2 py-4 text-[11px] font-bold text-gray-700">{item}</button>)}</div></div>}</motion.div></motion.div>}</AnimatePresence>
    </motion.div>
  );
}
