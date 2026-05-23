"use client";

import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { BeeButton } from "@/components/ui";
import { Copy, Users, Gift } from "lucide-react";
import { useState } from "react";

export default function ReferralPage() {
  const referralCode = "BEE8F2K1";
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { name: "Marie", joined: "15 mai", points: 150 },
    { name: "Thomas", joined: "10 mai", points: 150 },
    { name: "Sophie", joined: "5 mai", points: 150 },
  ];

  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6">
        <h1 className="text-2xl font-bold">Parrainage</h1>
        <p className="text-bee-text/70 text-sm mt-1">Invite tes amis et gagne ensemble!</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Share Card */}
        <BeeCard>
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">👥</div>
            <h2 className="font-bold text-lg">Ton code de parrainage</h2>
          </div>

          <div className="bg-bee-bg rounded-2xl p-4 mb-4 text-center">
            <p className="text-bee-text/70 text-sm mb-2">À partager avec tes amis</p>
            <p className="text-3xl font-bold text-bee-yellow">{referralCode}</p>
          </div>

          <button
            onClick={copyCode}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-bee-yellow rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            <Copy size={20} />
            {copied ? "Copié!" : "Copier le code"}
          </button>
        </BeeCard>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <BeeCard className="text-center">
            <p className="text-bee-text/70 text-sm">Amis invités</p>
            <p className="text-3xl font-bold">{referrals.length}</p>
          </BeeCard>
          <BeeCard className="text-center">
            <p className="text-bee-text/70 text-sm">Points gagnés</p>
            <p className="text-3xl font-bold">+450</p>
          </BeeCard>
        </div>

        {/* Referrals */}
        <div>
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Gift size={24} /> Amis parrainés
          </h2>
          <div className="space-y-3">
            {referrals.map((ref, i) => (
              <BeeCard key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{ref.name}</p>
                  <p className="text-bee-text/70 text-sm">{ref.joined}</p>
                </div>
                <div className="bg-bee-yellow px-3 py-1 rounded-2xl font-bold text-sm">
                  +{ref.points} pts
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
