"use client";

import { useState } from "react";
import Link from "next/link";
import { BeeButton } from "@/components/ui";
import { BeeCard } from "@/components/ui";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Quelle est ta ville?",
    options: ["Paris", "Clermont-Ferrand"],
    key: "city",
  },
  {
    title: "Ton mode de transport préféré?",
    options: ["Vélo", "Marche", "Trottinette", "Skateboard"],
    key: "transport",
  },
  {
    title: "Tes objectifs?",
    options: ["Gagner des points", "Découvrir des lieux", "Aider la planète", "Socialiser"],
    key: "goals",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [step.key]: option };
    setAnswers(newAnswers);

    if (isLastStep) {
      // Save to profile and redirect
      localStorage.setItem("beeclou-onboarding", JSON.stringify(newAnswers));
      window.location.href = "/dashboard";
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <main className="min-h-screen bg-bee-bg flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-bold">Étape {currentStep + 1} / {steps.length}</span>
            <span className="text-bee-text/60">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-bee-card rounded-full h-2">
            <div
              className="bg-bee-yellow rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <BeeCard className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-8">{step.title}</h2>

          <div className="space-y-3">
            {step.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full p-4 text-lg font-bold rounded-2xl border-2 border-bee-text bg-bee-bg hover:bg-bee-yellow transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </BeeCard>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 px-4 py-3 text-bee-text border-2 border-bee-text rounded-2xl font-bold hover:bg-bee-bg"
            >
              Retour
            </button>
          )}
          <div className="flex-1" />
        </div>
      </div>
    </main>
  );
}
