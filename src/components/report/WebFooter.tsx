import React from 'react';

export function WebFooter() {
  return (
    <footer className="bg-white pt-2 pb-4 sm:pt-3 sm:pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-2">
        {/* Logo do Reclame Aqui bem grande e centralizada */}
        <div className="flex items-center justify-center w-full">
          <img
            src="/image/reclame-aqui.webp"
            alt="Reclame AQUI"
            className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain select-none mx-auto"
          />
        </div>

        {/* Texto de direitos autorais centralizado */}
        <div className="w-full pt-2 border-t border-black/5 flex items-center justify-center text-center">
          <p className="text-[11px] sm:text-xs text-black/50 font-medium">
            2026, Análise Reclame Aqui. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
