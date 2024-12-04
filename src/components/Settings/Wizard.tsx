"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
}

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: WizardStep[] = [
    {
      id: 1,
      title: "Contract Type",
      description: "What will your smart contract do?",
      component: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Contract Type</h2>
            <p className="text-sm text-gray-500">
              Not sure? <span className="text-green-500">Learn more.</span>
            </p>
          </div>
          <div className="grid gap-4">
            <Card className="p-4 cursor-pointer border-2 border-green-500 hover:bg-green-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">🔐</div>
                <div>
                  <h3 className="font-semibold">Multi-Signature Account</h3>
                  <p className="text-sm text-gray-500">
                    A contract designed so that multiple signatures from
                    different addresses are needed for a transaction to be
                    executed.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">🎨</div>
                <div>
                  <h3 className="font-semibold">Non-Fungible Token</h3>
                  <p className="text-sm text-gray-500">
                    Blockchain-based tokens that each represent a unique asset
                    like a piece of art, digital content, or media.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">🏛️</div>
                <div>
                  <h3 className="font-semibold">
                    Decentralized Autonomous Organization
                  </h3>
                  <p className="text-sm text-gray-500">
                    A organization managed by contracts, with voting and
                    finances handled through a blockchain.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    // ... other steps remain the same
  ];

  return (
    <div className="flex gap-10">
      {/* Left side - Steps */}
      <div className="w-64 space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex gap-4 items-start ${
              step.id === currentStep
                ? "opacity-100"
                : step.id < currentStep
                ? "opacity-100 text-green-500"
                : "opacity-50"
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id === currentStep
                  ? "bg-green-100 text-green-500"
                  : step.id < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.id}
            </div>
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Content */}
      <div className="flex-1">
        {steps[currentStep - 1].component}
        <div className="mt-8 flex justify-end gap-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
          )}
          {currentStep < steps.length && (
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() =>
                setCurrentStep((prev) => Math.min(steps.length, prev + 1))
              }
            >
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
