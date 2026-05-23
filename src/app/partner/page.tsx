"use client";

import Link from "next/link";
import { BeeButton } from "@/components/ui";
import { BeeCard } from "@/components/ui";
import { Store, Zap } from "lucide-react";

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-bee-bg flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2">🤝</div>
          <h1 className="text-2xl font-bold">Devenir partenaire Beeclou</h1>
          <p className="text-bee-text/70 text-sm mt-2">
            Générez du trafic local et boostez votre clientèle
          </p>
        </div>

        <BeeCard className="mb-8 space-y-6">
          <div className="flex gap-4">
            <Store className="text-bee-yellow flex-shrink-0" size={32} />
            <div>
              <h3 className="font-bold mb-1">Augmentez votre visibilité</h3>
              <p className="text-bee-text/70 text-sm">
                Atteignez des milliers d'utilisateurs en mobilité
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Zap className="text-bee-yellow flex-shrink-0" size={32} />
            <div>
              <h3 className="font-bold mb-1">Créez des missions</h3>
              <p className="text-bee-text/70 text-sm">
                Engagez clients avec défis et récompenses
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-2xl flex-shrink-0">📊</div>
            <div>
              <h3 className="font-bold mb-1">Dashboard analytics</h3>
              <p className="text-bee-text/70 text-sm">
                Suivez performances et conversions en temps réel
              </p>
            </div>
          </div>
        </BeeCard>

        <div className="space-y-3">
          <Link href="/partner/setup" className="block">
            <BeeButton size="lg">Créer mon compte partenaire</BeeButton>
          </Link>
          <button className="w-full px-4 py-3 text-bee-text border-2 border-bee-text rounded-2xl font-bold hover:bg-bee-bg">
            Voir les tarifs
          </button>
        </div>

        <p className="text-center text-bee-text/60 text-xs mt-6">
          Questions? Contacte-nous à partners@beeclou.fr
        </p>
      </div>
    </main>
  );
}
