"use client";

import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { Award } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Antoine", points: 4850, level: 10, badge: "🥇" },
  { rank: 2, name: "Claire", points: 4320, level: 9, badge: "🥈" },
  { rank: 3, name: "Thomas", points: 3950, level: 9, badge: "🥉" },
  { rank: 4, name: "Jean", points: 2450, level: 7, badge: "🚀" },
  { rank: 5, name: "Marie", points: 2100, level: 6, badge: "" },
  { rank: 6, name: "Sophie", points: 1850, level: 5, badge: "" },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Award size={28} /> Classement
        </h1>
        <p className="text-bee-text/70 text-sm mt-1">Paris · Top 100</p>
      </div>

      <div className="px-6 py-6 space-y-3">
        {leaderboard.map((user) => (
          <BeeCard key={user.rank} className="flex items-center gap-4">
            <div className="text-2xl font-bold w-12 text-center">{user.badge || `#${user.rank}`}</div>
            <div className="flex-1">
              <p className="font-bold">{user.name}</p>
              <p className="text-bee-text/70 text-sm">Niveau {user.level}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-bee-yellow">{user.points}</p>
              <p className="text-bee-text/60 text-xs">points</p>
            </div>
          </BeeCard>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
