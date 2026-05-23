"use client";

import { useState } from "react";
import Link from "next/link";
import { BeeButton } from "@/components/ui";
import { BeeCard } from "@/components/ui";
import { Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Magic link would be sent here via Supabase
  };

  return (
    <main className="min-h-screen bg-bee-bg flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2">🐝</div>
          <h1 className="text-2xl font-bold">Bienvenue sur Beeclou</h1>
        </div>

        <BeeCard className="mb-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Ton email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="toi@exemple.fr"
                  className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
                  required
                />
              </div>

              <BeeButton type="submit" size="lg" className="flex items-center justify-center gap-2">
                <Mail size={20} />
                Envoyer lien magique
              </BeeButton>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">✨</div>
              <h2 className="font-bold text-lg mb-2">Vérifie ton email</h2>
              <p className="text-bee-text/70 mb-4">
                Un lien de connexion a été envoyé à <strong>{email}</strong>
              </p>
              <p className="text-bee-text/60 text-sm">
                Clique sur le lien pour te connecter
              </p>
            </div>
          )}
        </BeeCard>

        <p className="text-center text-bee-text/70">
          Pas encore inscrit?{" "}
          <Link href="/onboarding" className="font-bold text-bee-yellow hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}
