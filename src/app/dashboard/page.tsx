"use client";

import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { BeeButton } from "@/components/ui";
import Link from "next/link";
import { Zap, Target, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const userPoints = 2450;
  const userLevel = 7;
  const nextLevelPoints = 3000;
  const recentTrips = [
    { date: "Aujourd'hui", distance: 3.2, points: 32 },
    { date: "Hier", distance: 5.1, points: 51 },
    { date: "22 mai", distance: 2.8, points: 28 },
  ];

  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6 text-center">
        <div className="text-4xl font-bold mb-2">{userPoints}</div>
        <p className="text-bee-text/80">Points totaux</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Level Progress */}
        <BeeCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-bee-text/70 text-sm">Niveau</p>
              <h3 className="text-2xl font-bold">{userLevel}</h3>
            </div>
            <div className="text-3xl">🏆</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Vers le niveau {userLevel + 1}</span>
              <span className="text-bee-text/60">{userPoints}/{nextLevelPoints}</span>
            </div>
            <div className="w-full bg-bee-bg rounded-full h-2">
              <div
                className="bg-bee-yellow rounded-full h-2 transition-all"
                style={{ width: `${(userPoints / nextLevelPoints) * 100}%` }}
              />
            </div>
          </div>
        </BeeCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/trips" className="block">
            <BeeCard className="text-center h-full flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow">
              <Zap className="text-bee-yellow mb-2" size={32} />
              <p className="font-bold">Trajet</p>
            </BeeCard>
          </Link>

          <Link href="/missions" className="block">
            <BeeCard className="text-center h-full flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow">
              <Target className="text-bee-yellow mb-2" size={32} />
              <p className="font-bold">Missions</p>
            </BeeCard>
          </Link>

          <Link href="/scan" className="block">
            <BeeCard className="text-center h-full flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">📱</div>
              <p className="font-bold">Scanner</p>
            </BeeCard>
          </Link>

          <Link href="/referral" className="block">
            <BeeCard className="text-center h-full flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow">
              <Users className="text-bee-yellow mb-2" size={32} />
              <p className="font-bold">Parrainer</p>
            </BeeCard>
          </Link>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={24} /> Activité récente
          </h2>
          <div className="space-y-3">
            {recentTrips.map((trip, i) => (
              <BeeCard key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{trip.distance} km</p>
                  <p className="text-bee-text/70 text-sm">{trip.date}</p>
                </div>
                <div className="bg-bee-yellow px-4 py-2 rounded-2xl font-bold">
                  +{trip.points} pts
                </div>
              </BeeCard>
            ))}
          </div>
        </div>

        {/* Leaderboard CTA */}
        <Link href="/leaderboard" className="block">
          <BeeButton size="lg">Voir le classement 📊</BeeButton>
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}
