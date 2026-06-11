import React from "react";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 justify-center w-full min-h-[100dvh] items-center sm:p-4">
      <div className="relative w-full max-w-md h-[100dvh] sm:h-[844px] bg-white sm:rounded-[3rem] sm:border-8 border-gray-900 shadow-2xl overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
