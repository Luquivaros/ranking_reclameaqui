import React from 'react';

export function RAMonogram({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official dual-tone RA emblem with exact palette #90B823 & #007636 */}
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Reclame AQUI Logo"
      >
        {/* R letter in Verde Claro / Lima (#90B823) */}
        <path
          d="M12 72L12 8H36C47 8 55 15 55 26C55 35 48 42 39 44L56 72H39L26 48H23L23 72H12ZM23 37H35C40 37 44 33 44 26C44 19 40 17 35 17H23V37Z"
          fill="#90B823"
          transform="skewX(-6)"
        />
        {/* A letter in Verde Escuro (#007636) */}
        <path
          d="M48 72L67 8H81L100 72H87L83 56H65L61 72H48ZM67 46H81L74 20L67 46Z"
          fill="#007636"
          transform="skewX(-6)"
        />
      </svg>
    </div>
  );
}

export function ReclameAquiHorizontalLogo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 font-brand ${className}`}>
      <span className="font-extrabold text-[#007636] tracking-tight text-xl">
        Reclame<span className="font-black text-[#007636]">AQUI</span>
      </span>
      <RAMonogram className="h-6 ml-1" />
    </div>
  );
}

export function ReclameAquiVerticalBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-visible ${className}`}>
      <div 
        className="whitespace-nowrap font-brand text-[#007636] -rotate-90 origin-center tracking-tight"
        style={{
          transformOrigin: 'center center',
        }}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Reclame<span className="font-extrabold text-[#007636]">AQUI</span>
        </span>
      </div>
    </div>
  );
}
