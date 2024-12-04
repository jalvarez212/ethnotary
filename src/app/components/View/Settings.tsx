"use client";

import { Button } from "@/src/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Input } from "@/src/app/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/app/components/ui/tabs";
import Wizard from "./Wizard";
import { useQueryParams } from "@/src/app/hooks/useQueryParams";

interface SettingsQueryParams {
  tab?: string;
}

export default function AccountSetting() {
  const { queryParams, setQueryParams } = useQueryParams<SettingsQueryParams>();

  const mainTabContents = [
    {
      value: "wizard",
      label: "Wizard",
      content: <Wizard />,
    },
    {
      value: "settings",
      label: "Settings",
      content: (
        <section>
          <div className="space-y-6">
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
          </div>
        </section>
      ),
    },
    {
      value: "docs",
      label: "Docs",
      content: <div>Documentation Content</div>,
    },
  ];

  // Get the active tab from query params or default to 'home'
  const activeTab = queryParams.tab || "home";

  // Handle tab change
  const handleTabChange = (value: string) => {
    setQueryParams({ tab: value });
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4">
        <main className="py-8">
          <div className="h-full w-full">
            <Tabs
              value={activeTab}
              className="w-full h-full flex flex-col"
              onValueChange={handleTabChange}
            >
              <div className="flex items-center justify-between mb-6 border-b">
                <header>
                  <div className="container flex items-center h-14 gap-6">
                    <h1 className="text-lg font-semibold">Account Settings</h1>
                  </div>
                </header>
                <TabsList>
                  {mainTabContents.map(({ value, label }) => (
                    <TabsTrigger key={value} value={value}>
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {mainTabContents.map(({ value, content }) => (
                <TabsContent
                  key={value}
                  value={value}
                  className="w-full data-[state=inactive]:hidden"
                >
                  <div className="space-y-6">{content}</div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
