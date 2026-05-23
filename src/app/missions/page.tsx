"use client";

import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { BeeButton } from "@/components/ui";
import { MapPin, Zap } from "lucide-react";

const missions = [
  {
    id: 1,
    title: "Visite la Boulangerie du Cœur",
    description: "Scanne le QR code et gagne 100 points",
    partner: "Boulangerie du Cœur",
    points: 100,
    distance: 0.8,
    completed: false,
  },
  {
    id: 2,
    title: "Découvre la Librairie Locale",
    description: "Visite le lieu et complète la mission",
    partner: "Librairie L'Oasis",
    points: 150,
    distance: 1.2,
    completed: false,
  },
  {
    id: 3,
    title: "Gym à Ciel Ouvert",
    description: "Accomplis 5 trajets en vélo cette semaine",
    partner: "Parc du Cèdre",
    points: 200,
    distance: 0,
    completed: true,
  },
];

export default function MissionsPage() {
  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6">
        <h1 className="text-2xl font-bold">Missions locales</h1>
        <p className="text-bee-text/70 text-sm mt-1">Gagne des points en visitant nos partenaires</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {missions.map((mission) => (
          <BeeCard key={mission.id} className={mission.completed ? "opacity-60" : ""}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{mission.title}</h3>
                <p className="text-bee-text/70 text-sm mt-1">{mission.description}</p>
                <p className="text-bee-text/60 text-xs mt-2 flex items-center gap-1">
                  <MapPin size={14} /> {mission.partner}
                  {mission.distance > 0 && ` • ${mission.distance} km`}
                </p>
              </div>
              <div className="text-right ml-4">
                <div className="bg-bee-yellow px-3 py-1 rounded-2xl font-bold text-sm">
                  +{mission.points} pts
                </div>
              </div>
            </div>

            {!mission.completed ? (
              <BeeButton size="sm" className="w-full flex items-center justify-center gap-2">
                <Zap size={16} /> Accepter mission
              </BeeButton>
            ) : (
              <div className="text-center text-bee-text/60 text-sm py-2">
                ✓ Complétée
              </div>
            )}
          </BeeCard>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
