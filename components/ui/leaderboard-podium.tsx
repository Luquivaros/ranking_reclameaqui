"use client"

import * as React from "react"
import { Crown, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface LeaderboardRanking {
  id?: string
  rank: number
  name: string
  value: string | number
  avatar?: string
  initials?: string
  avatarBg?: string
  badge?: string
  subtext?: string
}

export interface LeaderboardPodiumProps extends React.HTMLAttributes<HTMLDivElement> {
  rankings: LeaderboardRanking[]
  onSelectRanking?: (ranking: LeaderboardRanking) => void
}

export function LeaderboardPodium({
  rankings,
  onSelectRanking,
  className,
  ...props
}: LeaderboardPodiumProps) {
  // Extract top 3 positions
  const rank1 = rankings.find((r) => r.rank === 1)
  const rank2 = rankings.find((r) => r.rank === 2)
  const rank3 = rankings.find((r) => r.rank === 3)

  // Render order: 2nd place (left), 1st place (center), 3rd place (right)
  // Palette: Chumbo (Lead / Anthracite / Slate) with 3 distinct harmonious tones:
  // 1st: Deep Lead / Chumbo Escuro Grafite (#1e293b)
  // 2nd: Medium Lead / Chumbo Médio Acetinado (#475569)
  // 3rd: Light Lead / Chumbo Claro Aço (#94a3b8)
  const podiumOrder = [
    {
      item: rank2,
      rank: 2,
      delay: 0.22,
      pedestalHeight: "h-24 sm:h-28",
      pedestalColor: "bg-[#475569] text-white shadow-xs",
      crownColor: "text-slate-200 fill-slate-100",
      avatarSize: "w-14 h-14 sm:w-16 sm:h-16",
    },
    {
      item: rank1,
      rank: 1,
      delay: 0.38,
      pedestalHeight: "h-32 sm:h-36",
      pedestalColor: "bg-[#1e293b] text-white shadow-md",
      crownColor: "text-amber-400 fill-amber-300",
      avatarSize: "w-16 h-16 sm:w-20 sm:h-20",
    },
    {
      item: rank3,
      rank: 3,
      delay: 0.1,
      pedestalHeight: "h-16 sm:h-20",
      pedestalColor: "bg-[#64748b] text-white shadow-xs",
      crownColor: "text-amber-700 fill-amber-600",
      avatarSize: "w-14 h-14 sm:w-16 sm:h-16",
    },
  ]

  return (
    <div className={cn("w-full flex flex-col items-center pt-2 pb-0", className)} {...props}>
      <div className="w-full flex items-end justify-center gap-2 sm:gap-4">
        {podiumOrder.map(
          ({
            item,
            rank,
            delay,
            pedestalHeight,
            pedestalColor,
            crownColor,
            avatarSize,
          }) => {
            if (!item) return null

            const displayInitials = item.initials || item.name.slice(0, 2).toUpperCase()
            const isRA1000 = String(item.value).includes("RA1000")

            return (
              <div
                key={item.id || rank}
                className="flex-1 flex flex-col items-center max-w-[135px] cursor-pointer group transition-transform duration-500 ease-out hover:-translate-y-1"
                onClick={() => onSelectRanking?.(item)}
              >
                {/* Floating Avatar & Details with smooth rise */}
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: delay + 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Avatar with crown badge */}
                  <div className="relative mb-2 flex items-center justify-center">
                    <div
                      className={cn(
                        "rounded-full overflow-hidden ring-2 ring-white shadow-md flex items-center justify-center font-bold tracking-tight transition-all duration-500 ease-out group-hover:scale-108 group-hover:shadow-lg select-none",
                        avatarSize,
                        item.avatarBg || "bg-slate-900 text-white"
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
                              ? "text-xs sm:text-sm font-extrabold"
                              : "text-sm sm:text-base font-extrabold"
                          }
                        >
                          {displayInitials}
                        </span>
                      )}
                    </div>

                    {/* Crown badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-115">
                      <Crown className={cn("w-3.5 h-3.5", crownColor)} />
                    </div>
                  </div>

                  {/* Name */}
                  <span
                    className="text-xs sm:text-sm font-semibold text-slate-800 text-center truncate w-full px-1"
                    title={item.name}
                  >
                    {item.name}
                  </span>

                  {/* Value / Score Badge */}
                  <div className="mb-2 mt-0.5">
                    {isRA1000 ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        RA1000
                      </span>
                    ) : (
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-600">
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Graph-style Bar Pedestal growing upward from origin bottom with square borders */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: "bottom" }}
                  className={cn(
                    "w-full rounded-none flex items-start justify-center pt-3 shadow-inner relative overflow-hidden transition-all duration-500 ease-out group-hover:opacity-90 group-hover:brightness-105",
                    pedestalHeight,
                    pedestalColor
                  )}
                >
                  {/* Subtle graph bar gradient highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/20 pointer-events-none" />

                  {/* Rank number fading in */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: delay + 0.35,
                      ease: "easeOut",
                    }}
                    className="text-2xl sm:text-3xl font-extrabold select-none relative z-10"
                  >
                    {rank}
                  </motion.span>
                </motion.div>
              </div>
            )
          }
        )}
      </div>

      {/* Graph Baseline Accent */}
      <div className="w-full h-1 bg-slate-300/80 mt-[-1px] shadow-2xs" />
    </div>
  )
}

