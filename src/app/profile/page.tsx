"use client";

import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { BeeButton } from "@/components/ui";
import { LogOut, Settings } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6 text-center">
        <div className="text-5xl mb-4">👤</div>
        <h1 className="text-2xl font-bold">Jean</h1>
        <p className="text-bee-text/70">Paris</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <BeeCard className="text-center">
            <p className="text-bee-text/70 text-sm">Points</p>
            <p className="text-2xl font-bold">2450</p>
          </BeeCard>
          <BeeCard className="text-center">
            <p className="text-bee-text/70 text-sm">Niveau</p>
            <p className="text-2xl font-bold">7</p>
          </BeeCard>
          <BeeCard className="text-center">
            <p className="text-bee-text/70 text-sm">Trajets</p>
            <p className="text-2xl font-bold">24</p>
          </BeeCard>
        </div>

        {/* Profile Settings */}
        <BeeCard>
          <div className="space-y-4">
            <div>
              <p className="text-bee-text/70 text-sm">Email</p>
              <p className="font-bold">jean@exemple.fr</p>
            </div>
            <div>
              <p className="text-bee-text/70 text-sm">Ville</p>
              <p className="font-bold">Paris</p>
            </div>
            <div>
              <p className="text-bee-text/70 text-sm">Mode de transport</p>
              <p className="font-bold">Vélo</p>
            </div>
          </div>
        </BeeCard>

        {/* Settings */}
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-bee-card rounded-2xl hover:shadow-lg transition-all">
            <Settings size={24} className="text-bee-yellow" />
            <span className="font-bold flex-1 text-left">Paramètres</span>
            <span className="text-bee-text/60">→</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 bg-bee-card rounded-2xl hover:shadow-lg transition-all">
            <LogOut size={24} className="text-bee-yellow" />
            <span className="font-bold flex-1 text-left">Se déconnecter</span>
            <span className="text-bee-text/60">→</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
