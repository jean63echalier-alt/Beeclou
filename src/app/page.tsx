import Link from "next/link";
import { BeeButton } from "@/components/ui";
import { Zap, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-bee-bg flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="text-6xl font-bold mb-4">🐝</div>
        <h1 className="text-4xl font-bold mb-4">Beeclou</h1>
        <p className="text-xl text-bee-text/80 mb-8">
          Transforme tes déplacements en revenus et avantages locaux
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 mb-12 w-full max-w-md">
          <div className="bg-bee-card rounded-3xl p-6 shadow-sm flex items-start gap-4">
            <Zap className="text-bee-yellow flex-shrink-0" size={32} />
            <div className="text-left">
              <h3 className="font-bold mb-2">Se déplacer</h3>
              <p className="text-sm text-bee-text/70">À vélo, à pied, en mobilité douce</p>
            </div>
          </div>

          <div className="bg-bee-card rounded-3xl p-6 shadow-sm flex items-start gap-4">
            <Award className="text-bee-yellow flex-shrink-0" size={32} />
            <div className="text-left">
              <h3 className="font-bold mb-2">Gagner</h3>
              <p className="text-sm text-bee-text/70">Des points et des récompenses locales</p>
            </div>
          </div>

          <div className="bg-bee-card rounded-3xl p-6 shadow-sm flex items-start gap-4">
            <Users className="text-bee-yellow flex-shrink-0" size={32} />
            <div className="text-left">
              <h3 className="font-bold mb-2">Communauté</h3>
              <p className="text-sm text-bee-text/70">Rejoins ta ville et invite tes amis</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 w-full max-w-md">
          <Link href="/login" className="w-full">
            <BeeButton size="lg">Commencer</BeeButton>
          </Link>
          <Link href="/partner" className="w-full">
            <BeeButton size="lg" variant="secondary">
              Je suis partenaire
            </BeeButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bee-card py-4 text-center text-bee-text/60 text-sm border-t border-bee-yellow">
        <p>Disponible à Paris et Clermont-Ferrand</p>
      </footer>
    </main>
  );
}
