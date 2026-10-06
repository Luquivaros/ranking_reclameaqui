import React, { useState } from 'react';
import { Menu, X, ExternalLink, LogOut } from 'lucide-react';
import { ReportConfig } from '../../types/report';

interface ReportNavbarProps {
  data: ReportConfig;
  activeSection: string;
  onNavigateToRanking: () => void;
  onNavigateToHub: () => void;
}

export function ReportNavbar({ data, activeSection, onNavigateToRanking, onNavigateToHub }: ReportNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNovare = data.companyName.toLowerCase().includes('novare');
  const reclameAquiUrl = isNovare
    ? 'https://www.reclameaqui.com.br/empresa/novare-assessoria-administrativa-ltda/'
    : (data.reclameAquiUrl || 'https://www.reclameaqui.com.br/empresa/nexus-solucoes-financeiras/');

  const navLinks = [
    { id: 'visao-geral', label: 'Visão Geral' },
    { id: 'mensal', label: 'Análise Mensal' },
    { id: 'semestral', label: 'Análise Semestral' },
    { id: 'motivos', label: 'Principais Motivos' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/[0.08] animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between gap-4">
        {/* Brand Zone com a logo oficial do Reclame Aqui e o nome da empresa */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none" 
          onClick={() => handleNavClick('visao-geral')}
        >
          <img 
            src="/image/reclame-aqui.webp" 
            alt="Reclame AQUI" 
            className="h-12 sm:h-16 md:h-20 w-auto object-contain" 
          />
          <span className="hidden sm:inline-block text-xs sm:text-sm text-black/70 font-semibold pl-3.5 border-l border-black/20">
            Painel para Análise
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#007636] font-semibold bg-[#007636]/5'
                    : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Botão Ranking ao lado e com o MESMO design que os demais botões de navegação */}
          <button
            id="nav-btn-ranking"
            onClick={onNavigateToRanking}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer text-black/60 hover:text-black hover:bg-black/[0.03]"
          >
            Ranking
          </button>

          {/* Botão para redirecionar para a página da empresa no Reclame AQUI */}
          <a
            href={reclameAquiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#007636] text-white hover:bg-[#005e2b] transition-all shadow-xs cursor-pointer whitespace-nowrap ml-1.5"
            title={`Abrir página oficial da ${data.companyName} no Reclame AQUI`}
          >
            <span className="hidden xl:inline">Página no</span>
            <span>Reclame AQUI</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-90 shrink-0" />
          </a>

          {/* Botão Log-out (somente o ícone) posicionado ao lado direito do botão Página do Reclame Aqui */}
          <button
            onClick={onNavigateToHub}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer ml-1"
            title="Sair / Trocar Empresa"
            aria-label="Sair / Trocar Empresa"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-black hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
          aria-label="Abrir menu de navegação"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/10 px-4 py-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="w-full text-left px-3 py-2 text-xs font-medium text-black hover:bg-black/5 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="text-[#007636] text-xs font-mono-numbers">→</span>
            </button>
          ))}

          {/* Botão Ranking no Menu Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToRanking();
            }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-black hover:bg-black/5 rounded-lg flex items-center justify-between cursor-pointer"
          >
            <span>Ranking</span>
            <span className="text-[#007636] text-xs font-mono-numbers">→</span>
          </button>

          {/* Botão para página no Reclame AQUI no Mobile */}
          <div className="pt-2 mt-1 border-t border-black/5 space-y-1">
            <a
              href={reclameAquiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-3 py-2 text-xs font-semibold text-white bg-[#007636] hover:bg-[#005e2b] rounded-lg flex items-center justify-between transition-colors shadow-xs"
            >
              <span className="flex items-center gap-1.5">
                <span>Página no Reclame AQUI</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-90" />
              </span>
              <span className="text-white/80 text-xs font-mono-numbers">↗</span>
            </a>

            {/* Botão Log-out no Menu Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToHub();
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-red-600" />
                <span>Sair / Trocar Empresa</span>
              </span>
              <span className="text-red-400 text-xs font-mono-numbers">⟲</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
