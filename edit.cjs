const fs = require('fs');

const file = 'src/pages/Main/AITab.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure ChevronLeft is imported
if (!content.includes('ChevronLeft')) {
  content = content.replace('ChevronRight,', 'ChevronLeft,\n  ChevronRight,');
}

// Replace header
const oldHeader = `<div className={\`pt-12 pb-2 px-6 sticky top-0 z-20 flex flex-col shadow-[0_1px_10px_rgba(0,0,0,0.02)] relative transition-colors \${isDark ? 'bg-[#1A1A1A] border-b border-gray-800' : 'bg-white'}\`}>
        <button 
          onClick={() => popView()} 
          className={\`absolute left-4 top-11 p-2 transition-colors z-10 \${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}\`}
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <div className="flex justify-between items-center mb-2 w-full px-2">
          <span className={\`text-[16px] font-bold \${isDark ? "text-white" : "text-gray-900"}\`}>
            心愈 AI
          </span>
          <button
            onClick={() => pushView("counseling-list")}
            className={\`text-[13px] font-bold transition-all px-3 py-1.5 rounded-full \${
              isDark 
                ? "bg-[#20A6A6] text-white hover:bg-[#1C8C8C]" 
                : "bg-primary text-white hover:bg-[#20A6A6]"
            }\`}
          >
            预约真人咨询
          </button>
        </div>
      </div>`;

const newHeader = `<div className={\`pt-12 pb-2 px-6 sticky top-0 z-20 flex flex-col shadow-[0_1px_10px_rgba(0,0,0,0.02)] relative transition-colors \${isDark ? 'bg-[#1A1A1A] border-b border-gray-800' : 'bg-white'}\`}>
        <button 
          onClick={() => popView()} 
          className={\`absolute left-4 top-11 p-2 transition-colors z-10 \${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}\`}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex justify-center space-x-8 mb-2 relative w-full px-2">
          <button
            onClick={() => setActiveTab("ai")}
            className={\`pb-2 text-[16px] font-bold transition-all relative \${
              activeTab === "ai"
                ? (isDark ? "text-primary" : "text-primary")
                : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
            }\`}
          >
            心愈 AI
            {activeTab === "ai" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("human")}
            className={\`pb-2 text-[16px] font-bold transition-all relative \${
              activeTab === "human"
                ? (isDark ? "text-white" : "text-gray-900")
                : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
            }\`}
          >
            真人倾听师
            {activeTab === "human" && (
              <motion.div
                layoutId="activeTab"
                className={\`absolute bottom-0 left-0 right-0 h-1 rounded-full \${isDark ? "bg-white" : "bg-gray-900"}\`}
              />
            )}
          </button>
        </div>
      </div>`;

content = content.replace(oldHeader, newHeader);

// Wrap AI chat and append counselor list
// Find where AI chat content starts: <div className={`backdrop-blur-md px-4 py-3
const aiChatStart = `<div className={\`backdrop-blur-md px-4 py-3 border-b flex items-center justify-between sticky top-[92px] z-20 transition-colors \${isDark ? 'bg-[#1A1A1A]/95 border-gray-800' : 'bg-white/95 border-gray-100'}\`}>`;

const wrapperStart = `{activeTab === "ai" ? (
        <>
          <div className={\`backdrop-blur-md px-4 py-3 border-b flex items-center justify-between sticky top-[92px] z-20 transition-colors \${isDark ? 'bg-[#1A1A1A]/95 border-gray-800' : 'bg-white/95 border-gray-100'}\`}>`;

content = content.replace(aiChatStart, wrapperStart);

// Find where AI chat content ends: right before `{/* 危机预警弹窗`
const aiChatEndRegex = /<\/div>\s*\{\/\* 危机预警弹窗/;

const simpleCounselorList = `</>
      ) : (
        <div className={\`flex-1 overflow-y-auto p-4 space-y-4 pb-32 min-h-full transition-colors \${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}\`}>
          {mockCounselors.map((counselor) => (
            <div
              key={counselor.id}
              onClick={() => {
                setSelectedCounselorId(counselor.id);
                pushView("counseling-detail");
              }}
              className={\`rounded-3xl p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border flex active:scale-[0.98] transition-transform cursor-pointer overflow-hidden relative \${isDark ? 'bg-[#2A2A2A] border-gray-800' : 'bg-white border-gray-50'}\`}
            >
              {counselor.type === "pro" && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FFD700] to-[#F5A623] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm border-b border-l border-white/20">
                  专家团
                </div>
              )}
              {counselor.type === "listener" && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#2CC1C1] to-[#20A6A6] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm border-b border-l border-white/20">
                  优选倾听师
                </div>
              )}
              <div className="relative mr-4 shrink-0">
                <img
                  src={counselor.avatar}
                  alt={counselor.name}
                  className={\`w-16 h-16 rounded-2xl object-cover shadow-sm border \${isDark ? 'border-gray-700' : 'border-gray-100'}\`}
                />
                <div className={\`absolute -bottom-2 -right-2 rounded-full p-1 shadow-sm \${isDark ? 'bg-[#2A2A2A]' : 'bg-white'}\`}>
                  {counselor.status === "online" ? (
                    <div className={\`w-3 h-3 bg-green-500 rounded-full border-2 \${isDark ? 'border-[#2A2A2A]' : 'border-white'}\`}></div>
                  ) : counselor.status === "busy" ? (
                    <div className={\`w-3 h-3 bg-red-500 rounded-full border-2 \${isDark ? 'border-[#2A2A2A]' : 'border-white'}\`}></div>
                  ) : (
                    <div className={\`w-3 h-3 bg-gray-300 rounded-full border-2 \${isDark ? 'border-[#2A2A2A]' : 'border-white'}\`}></div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 pt-1">
                  <h3 className={\`font-bold text-[16px] truncate \${isDark ? 'text-white' : 'text-gray-900'}\`}>
                    {counselor.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 mb-2 flex-wrap">
                  <div className="flex items-center text-orange-500">
                    <Star size={12} className="fill-current mr-1" />
                    <span className="text-[12px] font-bold">
                      {counselor.rating}
                    </span>
                  </div>
                  <span className={\`text-[10px] \${isDark ? 'text-gray-700' : 'text-gray-300'}\`}>|</span>
                  <span className={\`text-[12px] \${isDark ? 'text-gray-400' : 'text-gray-500'}\`}>
                    {counselor.reviewsCount}次服务
                  </span>
                </div>

                <p className={\`text-[12px] line-clamp-1 mb-2 font-medium \${isDark ? 'text-gray-400' : 'text-gray-500'}\`}>
                  {counselor.title}
                </p>

                <div className="flex items-center justify-between mt-3 mb-1">
                  <div className="flex space-x-1.5">
                    {counselor.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className={\`px-2.5 py-1 rounded-md text-[10px] font-medium border \${isDark ? 'bg-[#1C1C1E] text-gray-400 border-gray-700' : 'bg-surface text-gray-600 border-gray-100'}\`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-baseline text-primary">
                    <span className="text-[10px] font-bold mr-0.5">¥</span>
                    <span className="text-[16px] font-black tracking-tight leading-none">
                      {counselor.price}
                    </span>
                    <span className={\`text-[10px] font-medium ml-0.5 \${isDark ? 'text-gray-500' : 'text-gray-400'}\`}>/次</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 危机预警弹窗`;

content = content.replace(aiChatEndRegex, simpleCounselorList);

// We also need to change the behavior of "pushView('counseling-list')" inside the Referral card to setActiveTab('human')
content = content.replace(/pushView\("counseling-list"\)/g, 'setActiveTab("human")');

fs.writeFileSync(file, content);
console.log('Done!');
