"use client"

import * as React from "react"
import { Crown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface LeaderboardRankingItem {
  id: string
  rank: number
  name: string
  byline?: string
  value: string | number
  avatar?: string
  initials?: string
  avatarBg?: string
  isCurrent?: boolean
  meta?: any
}

export interface LeaderboardRankingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rankings: LeaderboardRankingItem[]
  pageSize?: number
  defaultPage?: number
  onSelectRanking?: (item: LeaderboardRankingItem) => void
}

export function LeaderboardRankings({
  rankings,
  pageSize: initialPageSize = 0,
  defaultPage = 1,
  onSelectRanking,
  className,
  ...props
}: LeaderboardRankingsProps) {
  const [currentPage, setCurrentPage] = React.useState(defaultPage)
  const [pageSize, setPageSize] = React.useState(initialPageSize)

  const effectivePageSize = pageSize === 0 ? Math.max(1, rankings.length) : pageSize
  const totalPages = Math.max(1, Math.ceil(rankings.length / effectivePageSize))

  // Keep page in valid range
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const paginatedItems = React.useMemo(() => {
    if (pageSize === 0) {
      return rankings
    }
    const start = (currentPage - 1) * effectivePageSize
    return rankings.slice(start, start + effectivePageSize)
  }, [rankings, currentPage, effectivePageSize, pageSize])

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const renderCrown = (rank: number) => {
    if (rank === 1) {
      return <Crown className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0" />
    }
    if (rank === 2) {
      return <Crown className="w-4 h-4 text-slate-400 fill-slate-300 flex-shrink-0" />
    }
    if (rank === 3) {
      return <Crown className="w-4 h-4 text-amber-700 fill-amber-600 flex-shrink-0" />
    }
    return <div className="w-4 h-4 flex-shrink-0" />
  }

  return (
    <div
      className={cn(
        "w-full border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs",
        className
      )}
      {...props}
    >
      <div className="divide-y divide-slate-100 p-1.5 min-h-[280px]">
        <AnimatePresence mode="popLayout">
          {paginatedItems.map((item, index) => {
            const displayInitials = item.initials || item.name.slice(0, 2).toUpperCase()
            const isRA1000 = String(item.value).includes("RA1000")

            return (
              <motion.div
                key={`${item.id}-${currentPage}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.038, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => onSelectRanking?.(item)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 sm:py-3 cursor-pointer rounded-xl group transition-all duration-400 ease-out",
                  item.isCurrent
                    ? "border border-slate-300 bg-slate-50/90 shadow-xs"
                    : "hover:bg-slate-100/70 hover:shadow-2xs hover:translate-x-0.5"
                )}
              >
                {/* Rank number */}
                <span
                  className={cn(
                    "w-5 text-center text-xs sm:text-sm font-semibold flex-shrink-0 transition-colors duration-400",
                    item.isCurrent ? "text-slate-900" : "text-slate-500"
                  )}
                >
                  {item.rank}
                </span>

                {/* Crown indicator */}
                {renderCrown(item.rank)}

                {/* Avatar with Initials */}
                <div
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 border flex items-center justify-center font-bold text-xs tracking-tight select-none shadow-2xs transition-transform duration-500 ease-out group-hover:scale-108",
                    item.avatarBg || "bg-slate-900 text-white border-slate-800"
                  )}
                >
                  {item.avatar && !item.avatar.startsWith("data:image/svg") ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  ) : (
                    <span
                      className={
                        displayInitials.length >= 3
                          ? "text-[10px] sm:text-xs font-extrabold"
                          : "text-xs sm:text-sm font-extrabold"
                      }
                    >
                      {displayInitials}
                    </span>
                  )}
                </div>

                {/* Name & byline */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-semibold truncate",
                        item.isCurrent ? "text-slate-950 font-bold" : "text-slate-900"
                      )}
                    >
                      {item.name}
                    </p>
                    {item.isCurrent && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-white">
                        Você
                      </span>
                    )}
                  </div>
                  {item.byline && (
                    <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                      {item.byline}
                    </p>
                  )}
                </div>

                {/* Value */}
                <div className="text-right flex-shrink-0">
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-bold tracking-tight inline-flex items-center gap-1 px-2 py-0.5 rounded-md",
                      isRA1000
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold shadow-2xs"
                        : typeof item.value === "string" && item.value.includes("Não")
                        ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                        : typeof item.value === "string" && item.value.includes("Sem")
                        ? "bg-slate-100 text-slate-600 border border-slate-200"
                        : "text-slate-900"
                    )}
                  >
                    {isRA1000 && <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />}
                    {item.value}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {paginatedItems.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-xs">
            Nenhuma empresa encontrada
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      <div className="border-t border-slate-100 bg-slate-50/40 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500">
        {/* Page size select */}
        <div className="flex items-center gap-1.5">
          <span>Exibir</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="bg-white border border-slate-200 rounded-md px-2 py-0.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={0}>Todas ({rankings.length})</option>
          </select>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <span>
            {pageSize === 0
              ? `Todas as ${rankings.length} empresas`
              : `Página ${currentPage} de ${totalPages}`}
          </span>
          {pageSize !== 0 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                aria-label="Página anterior"
                className={cn(
                  "p-1 rounded-md border border-slate-200 bg-white transition-all duration-300 ease-out",
                  currentPage <= 1
                    ? "opacity-40 cursor-not-allowed text-slate-300"
                    : "text-slate-600 hover:bg-slate-100 hover:border-slate-300 cursor-pointer"
                )}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                aria-label="Próxima página"
                className={cn(
                  "p-1 rounded-md border border-slate-200 bg-white transition-all duration-300 ease-out",
                  currentPage >= totalPages
                    ? "opacity-40 cursor-not-allowed text-slate-300"
                    : "text-slate-600 hover:bg-slate-100 hover:border-slate-300 cursor-pointer"
                )}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
