import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--primary)] flex items-center justify-center shrink-0 shadow-sm">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 10 C 6 4, 10 16, 13 8 C 14.5 5, 17 7, 17 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="3" cy="10" r="2.5" fill="white" />
          <circle cx="17" cy="10" r="2.5" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">LeadFlow CRM</span>
        <span className="text-[10.5px] text-[var(--text-muted)] mt-[2px] tracking-[0.01em]">Discover. Rate. Convert. Measure.</span>
      </div>
    </div>
  );
}
