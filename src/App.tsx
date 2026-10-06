"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ReportPage } from "./components/report/ReportPage"
import { RankingPage } from "./components/ranking/RankingPage"

export type PageView = "hub" | "relatorio" | "ranking"
export type CompanyChoice = "nexus" | "novare"

import { CompanyHubPage } from "./components/hub/CompanyHubPage"

export default function App() {
  // A página inicial padrão é a tela de seleção de empresas (Hub), conforme solicitado
  const [selectedCompany, setSelectedCompany] = useState<CompanyChoice>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#novare") return "novare"
    }
    return "nexus"
  })

  const [currentView, setCurrentView] = useState<PageView>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#ranking") return "ranking"
      if (hash === "#nexus" || hash === "#novare") return "relatorio"
    }
    return "hub"
  })

  // Sincronizar com navegação por hash da URL (e histórico do navegador)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#ranking") {
        setCurrentView("ranking")
      } else if (hash === "#nexus") {
        setSelectedCompany("nexus")
        setCurrentView("relatorio")
      } else if (hash === "#novare") {
        setSelectedCompany("novare")
        setCurrentView("relatorio")
      } else {
        setCurrentView("hub")
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleSelectCompany = (company: CompanyChoice) => {
    setSelectedCompany(company)
    setCurrentView("relatorio")
    window.location.hash = company
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToHub = () => {
    setCurrentView("hub")
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToRanking = () => {
    setCurrentView("ranking")
    window.location.hash = "ranking"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToReport = () => {
    setCurrentView("relatorio")
    window.location.hash = selectedCompany
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (currentView === "ranking") {
    return (
      <RankingPage 
        onNavigateToReport={navigateToHub} 
      />
    )
  }

  if (currentView === "relatorio") {
    return (
      <ReportPage 
        companyId={selectedCompany}
        onNavigateToRanking={navigateToRanking} 
        onNavigateToHub={navigateToHub}
      />
    )
  }

  return (
    <CompanyHubPage 
      onSelectCompany={handleSelectCompany}
      onNavigateToRanking={navigateToRanking}
    />
  )
}
