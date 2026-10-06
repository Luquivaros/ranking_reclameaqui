"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ReportPage } from "./components/report/ReportPage"
import { RankingPage } from "./components/ranking/RankingPage"

export type PageView = "relatorio" | "ranking"

export default function App() {
  // A página principal padrão é o Relatório Executivo, conforme especificado
  const [currentView, setCurrentView] = useState<PageView>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#ranking") return "ranking"
    }
    return "relatorio"
  })

  // Sincronizar com navegação por hash da URL (e histórico do navegador)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#ranking") {
        setCurrentView("ranking")
      } else {
        setCurrentView("relatorio")
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigateToRanking = () => {
    setCurrentView("ranking")
    window.location.hash = "ranking"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToReport = () => {
    setCurrentView("relatorio")
    if (window.location.hash === "#ranking") {
      window.history.pushState(null, "", window.location.pathname)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (currentView === "ranking") {
    return <RankingPage onNavigateToReport={navigateToReport} />
  }

  return <ReportPage onNavigateToRanking={navigateToRanking} />
}
