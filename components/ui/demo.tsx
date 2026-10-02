"use client"

import * as React from "react"
import { LeaderboardCard } from "@/components/ui/leaderboard-card"
import type { LeaderboardRanking } from "@/components/ui/leaderboard-podium"
import type { LeaderboardRankingItem } from "@/components/ui/leaderboard-rankings"

const DEMO_PODIUM: LeaderboardRanking[] = [
  {
    id: "user-1",
    rank: 1,
    name: "Ava Elizab...",
    value: "289 400",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    badge: "Diamond",
  },
  {
    id: "user-2",
    rank: 2,
    name: "Leo Harris...",
    value: "251 800",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    badge: "Platinum",
  },
  {
    id: "user-3",
    rank: 3,
    name: "Rowan Elij...",
    value: "238 300",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    badge: "Gold",
  },
]

const DEMO_RANKINGS: LeaderboardRankingItem[] = [
  {
    id: "user-1",
    rank: 1,
    name: "Ava Elizabeth Turner",
    byline: "Level 42 – Diamond",
    value: "289.4k",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-2",
    rank: 2,
    name: "Leo Harrison",
    byline: "Level 39 – Platinum",
    value: "251.8k",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-3",
    rank: 3,
    name: "Rowan Elijah",
    byline: "Level 35 – Gold",
    value: "238.3k",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-4",
    rank: 4,
    name: "Maya Chen",
    byline: "Level 31 – Silver",
    value: "198.7k",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-5",
    rank: 5,
    name: "You",
    byline: "Level 28 – Bronze",
    value: "156.2k",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    isCurrent: true,
  },
  {
    id: "user-6",
    rank: 6,
    name: "Lucas Gabriel",
    byline: "Level 26 – Challenger",
    value: "142.1k",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-7",
    rank: 7,
    name: "Sophia Martinez",
    byline: "Level 24 – Elite",
    value: "135.8k",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
]

export function LeaderboardDemo() {
  const [selectedRun, setSelectedRun] = React.useState("season-4")

  return (
    <LeaderboardCard
      title="Weekly Leaderboard"
      subtitle="1 мая 2026 г. - 7 мая 2026 г."
      runOptions={[
        { id: "season-4", label: "Season 4" },
        { id: "season-3", label: "Season 3" },
        { id: "all-time", label: "All Time" },
      ]}
      selectedRunId={selectedRun}
      onRunChange={setSelectedRun}
      podiumRankings={DEMO_PODIUM}
      rankings={DEMO_RANKINGS}
      pageSize={5}
    />
  )
}
