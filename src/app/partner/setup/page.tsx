"use client";

import { useState } from "react";
import { BeeButton } from "@/components/ui";
import { BeeCard } from "@/components/ui";

const steps = [
  { id: 1, title: "Infos établissement" },
  { id: 2, title: "Contact" },
  { id: 3, title: "Mission & récompenses" },
];

export default function PartnerSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    city: "Paris",
    address: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen bg-bee-bg px-6 py-12 max-w-md mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                step.id === currentStep ? "text-bee-yellow font-bold" : "text-bee-text/60"
              }`}
            >
              {step.id}
            </div>
          ))}
        </div>
        <div className="w-full bg-bee-card rounded-full h-2">
          <div
            className="bg-bee-yellow rounded-full h-2 transition-all"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <BeeCard className="mb-6">
        <h2 className="text-2xl font-bold mb-6">{steps[currentStep - 1].title}</h2>

        {currentStep === 1 && (
          <form className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Nom de l'établissement</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
              >
                <option value="">Sélectionne une catégorie</option>
                <option value="food">Restauration</option>
                <option value="shop">Boutique</option>
                <option value="gym">Sport</option>
                <option value="culture">Culture</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Ville</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
              >
                <option value="Paris">Paris</option>
                <option value="Clermont-Ferrand">Clermont-Ferrand</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Adresse</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
              />
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-bee-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-bee-yellow"
              />
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-bold text-lg mb-2">Vous êtes prêt!</h3>
            <p className="text-bee-text/70">
              Prochaine étape: générez votre code QR et créez vos missions
            </p>
          </div>
        )}
      </BeeCard>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentStep > 1 && (
          <button
            onClick={handlePrev}
            className="flex-1 px-4 py-3 text-bee-text border-2 border-bee-text rounded-2xl font-bold hover:bg-bee-bg"
          >
            Retour
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-1"
        >
          <BeeButton size="lg" onClick={() => {}}>
            {currentStep === steps.length ? "Terminer" : "Suivant"}
          </BeeButton>
        </button>
      </div>
    </main>
  );
}
