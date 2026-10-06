import React, { useState, useEffect } from 'react';
import { ReportConfig } from '../../types/report';
import { initialReportData } from '../../data/defaultReportData';
import { getReportData, getCompanyDefaultData } from '../../services/reportService';
import { ReportNavbar } from './ReportNavbar';
import { HeroHeader } from './HeroHeader';
import { MonthlySection } from './MonthlySection';
import { SemesterSection } from './SemesterSection';
import { ReasonsSection } from './ReasonsSection';
import { WebFooter } from './WebFooter';
import { RevealOnScroll } from '../common/RevealOnScroll';

interface ReportPageProps {
  companyId?: 'nexus' | 'novare';
  onNavigateToRanking: () => void;
  onNavigateToHub: () => void;
}

export function ReportPage({ companyId = 'nexus', onNavigateToRanking, onNavigateToHub }: ReportPageProps) {
  const [reportData, setReportData] = useState<ReportConfig>(() => getCompanyDefaultData(companyId));
  const [activeSection, setActiveSection] = useState('visao-geral');
  const [isLoadedFromDb, setIsLoadedFromDb] = useState(false);

  // Carregar dados atualizados do Supabase (com fallback local seguro)
  useEffect(() => {
    let isCurrent = true;
    setReportData(getCompanyDefaultData(companyId));

    async function loadData() {
      const res = await getReportData(companyId);
      if (isCurrent) {
        setReportData(res.data);
        setIsLoadedFromDb(res.fromDb);
      }
    }
    loadData();
    return () => { isCurrent = false; };
  }, [companyId]);

  // Monitorar seção ativa durante o scroll para a navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['visao-geral', 'mensal', 'semestral', 'motivos'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased selection:bg-[#90B823] selection:text-black relative">
      {/* Barra de Navegação Oficial com botão de acesso ao Ranking e Trocar Empresa */}
      <ReportNavbar 
        data={reportData}
        activeSection={activeSection} 
        onNavigateToRanking={onNavigateToRanking} 
        onNavigateToHub={onNavigateToHub}
      />

      {/* Conteúdo Principal do Relatório Executivo */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* 1. Visão Geral Executiva e Nota do Ciclo (anima imediatamente na montagem) */}
        <HeroHeader data={reportData} />

        {/* 2. Análise Mensal Individual (Setembro / 2026 com seletor de histórico) */}
        <RevealOnScroll>
          <MonthlySection data={reportData} />
        </RevealOnScroll>

        {/* 3. Análise Semestral Consolidada (180 dias + Gráfico de Evolução) */}
        <RevealOnScroll>
          <SemesterSection data={reportData} />
        </RevealOnScroll>

        {/* 4. Principais Motivos das Reclamações (Tabela interativa e pesquisa) */}
        <RevealOnScroll>
          <ReasonsSection data={reportData} />
        </RevealOnScroll>
      </main>

      {/* Rodapé Executivo */}
      <RevealOnScroll>
        <WebFooter />
      </RevealOnScroll>
    </div>
  );
}
