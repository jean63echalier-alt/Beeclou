"use client";

import { BottomNav } from "@/components/BottomNav";
import { BeeCard } from "@/components/ui";
import { BeeButton } from "@/components/ui";
import { useState } from "react";
import QRCode from "qrcode.react";

export default function ScanPage() {
  const [scanned, setScanned] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-bee-bg pb-24">
      {/* Header */}
      <div className="bg-bee-yellow p-6">
        <h1 className="text-2xl font-bold">Scanner QR Code</h1>
        <p className="text-bee-text/70 text-sm mt-1">Valide tes visites chez les partenaires</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {!scanned ? (
          <>
            <BeeCard className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="font-bold text-lg mb-2">Pointe ton téléphone</h2>
              <p className="text-bee-text/70 text-center">vers le QR code du partenaire</p>
            </BeeCard>

            <BeeButton size="lg" onClick={() => setScanned("PARTNER_123")}>
              Simuler un scan
            </BeeButton>
          </>
        ) : (
          <BeeCard className="text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="font-bold text-xl mb-2">Visite validée!</h2>
              <p className="text-bee-text/70">Boulangerie du Cœur</p>
            </div>

            <div className="bg-bee-bg rounded-2xl p-4 mb-6">
              <p className="text-bee-text/70 text-sm mb-2">Points gagnés</p>
              <p className="text-4xl font-bold text-bee-yellow">+50</p>
            </div>

            <BeeButton size="lg" onClick={() => setScanned(null)}>
              Scanner un autre QR
            </BeeButton>
          </BeeCard>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
