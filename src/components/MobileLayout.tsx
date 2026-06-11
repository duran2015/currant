import React from "react";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 justify-center w-full min-h-[100dvh] items-center p-4">
      <div className="relative w-[min(390px,100vw)] h-[min(844px,100dvh)] bg-white rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
