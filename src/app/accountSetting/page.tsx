"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="min-h-screen ">
      <header className="border-b">
        <div className="container flex h-14 items-center gap-6">
          <h1 className="text-lg font-semibold">Account Settings</h1>
          <nav className="flex flex-1 items-center gap-6 text-sm">
            <a href="#" className="text-foreground">
              Home
            </a>
            <a href="#" className="text-muted-foreground">
              Wizard
            </a>
            <a href="#" className="text-muted-foreground">
              Settings
            </a>
            <a href="#" className="text-muted-foreground">
              Docs
            </a>
          </nav>
        </div>
      </header>

      <main className=" py-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium mb-4">Account Owners</h2>
            <Card>
              <CardHeader>
                <CardTitle>Add/Remove Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Type Address" />
                <Input type="password" placeholder="Enter Pin" />
                <CardDescription className="text-sm text-muted-foreground">
                  Please enter your pin set during account creation.
                </CardDescription>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                  >
                    Add Owner
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                  >
                    Remove Owner
                  </Button>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  If the wallet requesting change is a valid owner and correct
                  pin is entered, the transactions will be published to the
                  Ethereum blockchain for confirmation.
                </CardDescription>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Replace Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Existing Owner" />
                <Input placeholder="New Owner" />
                <Input type="password" placeholder="Enter Pin" />
                <CardDescription className="text-sm text-muted-foreground">
                  Please enter your pin set during account creation.
                </CardDescription>
                <Button
                  variant="outline"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  Replace Owner
                </Button>
                <CardDescription className="text-xs text-muted-foreground">
                  If the wallet requesting change is a valid owner and correct
                  pin is entered, the transactions will be published to the
                  Ethereum blockchain for confirmation.
                </CardDescription>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Change Approval Requirement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="# of confirmations" />
                <CardDescription className="text-sm text-muted-foreground">
                  Enter the number of confirmations a transaction needs before
                  it can be execute.
                </CardDescription>
                <Input type="password" placeholder="Enter Pin" />
                <CardDescription className="text-sm text-muted-foreground">
                  Please enter your pin set during your account creation.
                </CardDescription>
                <Button
                  variant="outline"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  Change Requirement
                </Button>
                <CardDescription className="text-xs text-muted-foreground">
                  If the wallet requesting change is a valid owner and correct
                  pin is entered, the transactions will be published to the
                  Ethereum blockchain for confirmation.
                </CardDescription>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
