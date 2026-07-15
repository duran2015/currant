import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, Camera, CheckCircle, Plus, Info, UploadCloud, AlertCircle } from "lucide-react";

const SPECIALTIES = [
  "情绪压力", "亲密关系", "家庭关系", "职场心理",
  "个人成长", "睡眠困扰", "青少年/亲子", "婚恋情感"
];

const DEMOGRAPHICS = [
  "职场人", "学生", "伴侣/夫妻", "父母", "管理者", "新手妈妈"
];

export function CounselorOnboarding() {
  const { popView } = useAppStore();

  const [status, setStatus] = useState<"待完善" | "待审核" | "已通过" | "未通过">("待完善");
  
  // Basic Info
  const [avatar, setAvatar] = useState<string>("https://ui-avatars.com/api/?name=Lin&background=random");
  const [nickname, setNickname] = useState("林初");
  const [realName, setRealName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [ageRange, setAgeRange] = useState("");

  // Professional Background
  const [counselingBg, setCounselingBg] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [trainingExp, setTrainingExp] = useState("");
  const [certificates, setCertificates] = useState<{ id: string, name: string, url: string }[]>([]);
  const [hasSupervision, setHasSupervision] = useState<boolean | null>(null);
  const [hasEAP, setHasEAP] = useState<boolean | null>(null);

  // Tags
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDemographics, setSelectedDemographics] = useState<string[]>([]);

  // Introduction
  const [intro, setIntro] = useState("");
  const [style, setStyle] = useState("");
  const [suitableFor, setSuitableFor] = useState("");

  const [agreedBoundary, setAgreedBoundary] = useState(false);
  const [showError, setShowError] = useState(false);
  const { pushView } = useAppStore();

  const toggleSpecialty = (item: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleDemographic = (item: string) => {
    setSelectedDemographics(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleUploadCert = () => {
    // Mock upload
    const newCert = {
      id: Date.now().toString(),
      name: `资质证明_${certificates.length + 1}.jpg`,
      url: ""
    };
    setCertificates([...certificates, newCert]);
  };

  const validateForm = () => {
    if (!realName || !gender || !city || selectedSpecialties.length === 0 || selectedDemographics.length === 0 || !intro || !agreedBoundary) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowError(false);
      setStatus("待审核");
    } else {
      setShowError(true);
      // scroll to top or show toast
    }
  };

  const handleSaveDraft = () => {
    // Just a mock save
    setShowError(false);
    alert("草稿已保存");
  };

  const getStatusColor = () => {
    switch (status) {
      case "待完善": return "bg-orange-50 border-orange-100 text-orange-600";
      case "待审核": return "bg-blue-50 border-blue-100 text-blue-600";
      case "已通过": return "bg-green-50 border-green-100 text-green-600";
      case "未通过": return "bg-red-50 border-red-100 text-red-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-[#F5F6F8]"
    >
      {/* Header */}
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">咨询师入驻资料</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Status Card */}
        <div className="p-4">
          <div className={`p-4 rounded-2xl border flex items-start space-x-3 ${getStatusColor()}`}>
            <Info size={20} className="shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[15px] mb-1">
                {status === "待完善" && "资料待完善"}
                {status === "待审核" && "资料审核中"}
                {status === "已通过" && "审核已通过"}
                {status === "未通过" && "审核未通过"}
              </h3>
              <p className="text-[13px] opacity-80 leading-relaxed">
                {status === "待完善" && "请完善以下基础信息、专业背景及自我介绍，提交平台审核后即可开启接单服务。"}
                {status === "待审核" && "平台正在加紧审核您的资料，预计需要 1-3 个工作日，请耐心等待。"}
                {status === "已通过" && "恭喜您已成为可鹿心理入驻咨询师，您可以前往工作台设置排班并开始接单。"}
                {status === "未通过" && "您的资料部分信息不符合平台要求，请修改后重新提交。"}
              </p>
            </div>
          </div>
        </div>

        {showError && status === "待完善" && (
          <div className="px-4 mb-4">
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-[13px] flex items-center">
              <AlertCircle size={16} className="mr-2 shrink-0" />
              请检查并完善所有必填项，并勾选同意《平台服务边界与风险提醒》。
            </div>
          </div>
        )}

        <div className="px-4 space-y-4">
          {/* 1. Basic Info */}
          <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center">
              <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
              基础信息
            </h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover bg-gray-100 border border-gray-200" />
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 text-gray-600 active:scale-95">
                  <Camera size={14} />
                </button>
              </div>
              <span className="text-[12px] text-gray-400 mt-2">真实清晰的头像能增加信任感</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">展示昵称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="用户可见的称呼"
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">真实姓名 <span className="text-red-500">*</span> <span className="text-gray-400 text-[11px] font-normal">(仅平台审核可见)</span></label>
                <input 
                  type="text" 
                  value={realName}
                  onChange={(e) => setRealName(e.target.value)}
                  placeholder="您的真实姓名"
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">性别 <span className="text-red-500">*</span></label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors appearance-none"
                  >
                    <option value="" disabled>请选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                    <option value="other">不愿透露</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">年龄段</label>
                  <select 
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors appearance-none"
                  >
                    <option value="" disabled>请选择</option>
                    <option value="20s">20-29岁</option>
                    <option value="30s">30-39岁</option>
                    <option value="40s">40-49岁</option>
                    <option value="50+">50岁及以上</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">所在城市 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="如：上海"
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. Professional Background */}
          <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center">
              <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
              专业背景
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">当前职业 / 咨询背景</label>
                <input 
                  type="text" 
                  value={counselingBg}
                  onChange={(e) => setCounselingBg(e.target.value)}
                  placeholder="如：全职心理咨询师、资深HR等"
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">从业年限</label>
                <select 
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>请选择</option>
                  <option value="1-3">1-3年</option>
                  <option value="3-5">3-5年</option>
                  <option value="5-10">5-10年</option>
                  <option value="10+">10年以上</option>
                </select>
              </div>
              
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">相关培训经历</label>
                <textarea 
                  value={trainingExp}
                  onChange={(e) => setTrainingExp(e.target.value)}
                  placeholder="简述您参加过的系统性心理咨询/职场教练培训经历"
                  rows={3}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">资质上传 <span className="text-gray-400 text-[11px] font-normal">(证书、学历等)</span></label>
                <div className="grid grid-cols-3 gap-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="relative aspect-[4/3] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden group">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <CheckCircle size={20} className="text-green-500 mb-1" />
                        <span className="text-[10px] text-gray-500">已上传</span>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={handleUploadCert}
                    className="aspect-[4/3] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 active:bg-gray-100 transition-colors"
                  >
                    <UploadCloud size={20} className="mb-1" />
                    <span className="text-[10px]">点击上传</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-50">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[13px] font-medium text-gray-700">是否接受过系统督导？</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setHasSupervision(true)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${hasSupervision === true ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
                    >是</button>
                    <button 
                      onClick={() => setHasSupervision(false)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${hasSupervision === false ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                    >否</button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[13px] font-medium text-gray-700">是否有 EAP / 企业服务经验？</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setHasEAP(true)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${hasEAP === true ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
                    >是</button>
                    <button 
                      onClick={() => setHasEAP(false)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${hasEAP === false ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                    >否</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Specialties & Demographics */}
          <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center">
              <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
              擅长领域与人群
            </h2>
            
            <div className="mb-6">
              <label className="text-[13px] font-medium text-gray-700 mb-2 block flex justify-between">
                <span>擅长领域 <span className="text-red-500">*</span></span>
                <span className="text-[11px] text-gray-400 font-normal">多选，最多 3 项</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map(item => {
                  const isSelected = selectedSpecialties.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleSpecialty(item)}
                      disabled={!isSelected && selectedSpecialties.length >= 3}
                      className={`px-3 py-1.5 rounded-full text-[13px] transition-all border ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-600 border-blue-200 font-medium' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-50 disabled:text-gray-400'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-gray-700 mb-2 block flex justify-between">
                <span>擅长人群 <span className="text-red-500">*</span></span>
                <span className="text-[11px] text-gray-400 font-normal">多选</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {DEMOGRAPHICS.map(item => {
                  const isSelected = selectedDemographics.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleDemographic(item)}
                      className={`px-3 py-1.5 rounded-full text-[13px] transition-all border ${
                        isSelected 
                          ? 'bg-purple-50 text-purple-600 border-purple-200 font-medium' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 4. Introduction */}
          <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center">
              <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
              自我介绍
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">咨询师简介 <span className="text-red-500">*</span></label>
                <textarea 
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="一句话或一段话介绍自己，让用户快速了解你"
                  rows={3}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">咨询风格</label>
                <textarea 
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder="如：温暖包容、犀利直接、注重行动落地等"
                  rows={2}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">适合什么样的来访者</label>
                <textarea 
                  value={suitableFor}
                  onChange={(e) => setSuitableFor(e.target.value)}
                  placeholder="如：适合遇到职场上升瓶颈，需要复盘和梳理思路的来访者"
                  rows={2}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white px-4 py-3 rounded-xl text-[14px] outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 flex flex-col z-30">
        <div className="flex items-center mb-3 px-1">
          <button 
            onClick={() => setAgreedBoundary(!agreedBoundary)}
            className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${agreedBoundary ? 'bg-primary border-primary' : 'border-gray-300'}`}
          >
            {agreedBoundary && <CheckCircle size={10} className="text-white" strokeWidth={3} />}
          </button>
          <span className="text-[12px] text-gray-500">
            我已阅读并同意
            <button onClick={() => pushView("counselor-boundary" as any)} className="text-primary font-medium ml-1 active:opacity-70">
              《平台服务边界与风险提醒》
            </button>
          </span>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSaveDraft}
            className="flex-1 py-3.5 rounded-xl font-bold text-[15px] bg-gray-100 text-gray-700 active:bg-gray-200 transition-colors"
          >
            保存草稿
          </button>
          <button 
            onClick={handleSubmit}
            className={`flex-[2] py-3.5 rounded-xl font-bold text-[15px] transition-colors shadow-lg ${agreedBoundary ? 'bg-gray-900 text-white shadow-gray-900/20 active:bg-gray-800' : 'bg-gray-200 text-gray-400'}`}
          >
            提交审核
          </button>
        </div>
      </div>
    </motion.div>
  );
}
