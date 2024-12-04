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
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle>Contract Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <Card className="p-4 cursor-pointer hover:bg-green-50 transition-colors">
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
              <Card className="p-4 cursor-pointer hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">🎨</div>
                  <div>
                    <h3 className="font-semibold">Non-Fungible Token</h3>
                    <p className="text-sm text-gray-500">
                      Blockchain-based tokens that each represent a unique asset
                      like a piece of art, digital content, or media.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">🏛️</div>
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
          </CardContent>
        </Card>
      ),
    },
    {
      id: 2,
      title: "Contract Name",
      description: "Name your contract",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Contract Name</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter contract name" />
          </CardContent>
        </Card>
      ),
    },
    {
      id: 3,
      title: "Parameters",
      description: "Setup how your contract will behave",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Contract Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Number of required signatures" type="number" />
            <Input placeholder="Initial owner addresses" />
          </CardContent>
        </Card>
      ),
    },
    {
      id: 4,
      title: "Add Owners",
      description: "Add owners to your contract",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Add Owners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Owner address" />
            <Button
              variant="outline"
              className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
            >
              Add Another Owner
            </Button>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 5,
      title: "Deploy!",
      description: "Review and Submit",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Review Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Contract Type: Multi-Signature Account
              </p>
              <p className="text-sm font-medium">Required Signatures: 2</p>
              <p className="text-sm font-medium">Initial Owners: 3</p>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Deploy Contract
            </Button>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Create Smart Contract</h2>
            <p className="text-gray-500">
              Step {currentStep} of {steps.length}
            </p>
          </div>
          <div className="flex gap-2">
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
                onClick={() =>
                  setCurrentStep((prev) => Math.min(steps.length, prev + 1))
                }
              >
                Next Step
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-2 mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded-full ${
                step.id <= currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">{steps[currentStep - 1].component}</div>
    </div>
  );
}
