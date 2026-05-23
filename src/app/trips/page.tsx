"use client";

import { useState, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { BeeButton } from "@/components/ui";
import { MapPin, Clock, RotateCw } from "lucide-react";

export default function TripsPage() {
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setDistance((d) => d + 0.05);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleStart = () => {
    setIsTracking(true);
    setStartTime(new Date());
    setDistance(0);
  };

  const handleStop = () => {
    setIsTracking(false);
  };

  const points = Math.round(distance * 10);
  const minutes = startTime ? Math.round((Date.now() - startTime.getTime()) / 60000) : 0;

  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6">
        <h1 className="text-2xl font-bold">Tes trajets</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Active Trip */}
        {isTracking && (
          <BeeCard className="text-center">
            <div className="mb-6">
              <div className="text-5xl font-bold text-bee-yellow mb-2">
                {distance.toFixed(2)} km
              </div>
              <p className="text-bee-text/70">{minutes} minutes</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-bee-text/70 text-sm">Points gagnés</p>
                <p className="text-2xl font-bold">+{points}</p>
              </div>
              <div>
                <p className="text-bee-text/70 text-sm">Vitesse moy.</p>
                <p className="text-2xl font-bold">{minutes > 0 ? (distance / (minutes / 60)).toFixed(1) : 0} km/h</p>
              </div>
            </div>

            <BeeButton size="lg" onClick={handleStop}>
              Terminer le trajet
            </BeeButton>
          </BeeCard>
        )}

        {!isTracking && (
          <BeeCard className="text-center py-8">
            <div className="text-5xl mb-4">🚴</div>
            <h2 className="text-xl font-bold mb-2">Commence un trajet</h2>
            <p className="text-bee-text/70 mb-6">
              Mesure ta distance et gagne des points à chaque kilomètre
            </p>
            <BeeButton size="lg" onClick={handleStart}>
              Démarrer le GPS
            </BeeButton>
          </BeeCard>
        )}

        {/* Past Trips */}
        <div>
          <h2 className="font-bold text-lg mb-4">Historique</h2>
          <div className="space-y-3">
            {[
              { date: "23 mai, 18h30", distance: 4.5, points: 45, duration: 32 },
              { date: "22 mai, 17h00", distance: 3.2, points: 32, duration: 24 },
              { date: "21 mai, 19h00", distance: 5.8, points: 58, duration: 38 },
            ].map((trip, i) => (
              <BeeCard key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{trip.distance} km</p>
                  <p className="text-bee-text/70 text-sm flex items-center gap-1 mt-1">
                    <Clock size={14} /> {trip.duration}min
                  </p>
                  <p className="text-bee-text/60 text-xs">{trip.date}</p>
                </div>
                <div className="bg-bee-yellow px-4 py-2 rounded-2xl font-bold">
                  +{trip.points} pts
                </div>
              </BeeCard>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
