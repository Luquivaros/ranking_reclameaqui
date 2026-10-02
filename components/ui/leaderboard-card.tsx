"use client"

import * as React from "react"
import { ChevronDown, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LeaderboardPodium,
  type LeaderboardRanking as LeaderboardPodiumRanking,
} from "@/components/ui/leaderboard-podium"
import {
  LeaderboardRankings,
  type LeaderboardRankingItem,
} from "@/components/ui/leaderboard-rankings"

export interface LeaderboardRunOption {
  id: string
  label: string
}

export interface LeaderboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  fromDate?: Date | string
  toDate?: Date | string
  runOptions?: LeaderboardRunOption[]
  selectedRunId?: string
  onRunChange?: (runId: string) => void
  podiumRankings?: LeaderboardPodiumRanking[]
  rankings?: LeaderboardRankingItem[]
  pageSize?: number
  defaultPage?: number
  onSelectRanking?: (item: LeaderboardRankingItem | LeaderboardPodiumRanking) => void
  headerAction?: React.ReactNode
}

function formatDateDisplay(date: Date | string): string {
  if (typeof date === "string") return date
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function LeaderboardCard({
  title = "Weekly Leaderboard",
  subtitle,
  fromDate,
  toDate,
  runOptions = [],
  selectedRunId,
  onRunChange,
  podiumRankings = [],
  rankings = [],
  pageSize = 5,
  defaultPage = 1,
  onSelectRanking,
  headerAction,
  className,
  ...props
}: LeaderboardCardProps) {
  // Determine date subtitle if provided
  const dateText = React.useMemo(() => {
    if (subtitle) return subtitle
    if (fromDate && toDate) {
      return `${formatDateDisplay(fromDate)} - ${formatDateDisplay(toDate)}`
    }
    return undefined
  }, [subtitle, fromDate, toDate])

  // Top 3 for podium
  const topThree = React.useMemo(() => {
    if (podiumRankings && podiumRankings.length > 0) {
      return podiumRankings
    }
    // Fallback from rankings if podiumRankings not provided
    return rankings.slice(0, 3).map((r) => ({
      id: r.id,
      rank: r.rank,
      name: r.name,
      value: r.value,
      avatar: r.avatar,
      badge: r.byline,
    }))
  }, [podiumRankings, rankings])

  return (
    <div
      className={cn(
        "w-full max-w-lg mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-6",
        className
      )}
      {...props}
    >
      {/* Header section */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
          </div>
          {dateText && (
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              {dateText}
            </p>
          )}
        </div>

        {/* Right header action */}
        {headerAction && (
          <div className="flex items-center gap-2">
            {headerAction}
          </div>
        )}
      </div>

      {/* Podium Component */}
      {topThree.length > 0 && (
        <LeaderboardPodium
          rankings={topThree}
          onSelectRanking={onSelectRanking}
        />
      )}

      {/* Rankings List Component */}
      <LeaderboardRankings
        rankings={rankings}
        pageSize={pageSize}
        defaultPage={defaultPage}
        onSelectRanking={onSelectRanking}
      />
    </div>
  )
}
