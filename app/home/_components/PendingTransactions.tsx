import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PendingTransactions() {
  const tabContents = [
    {
      value: "All Pending Tsx",
      label: "All Pending Tsx",
      content: "All Pending Tsx Content",
    },
    {
      value: "Pending Confirmation",
      label: "Pending Confirmation",
      content: "Pending Confirmation Content",
    },
    {
      value: "Ready To Send",
      label: "Ready To Send",
      content: "Ready To Send Content",
    },
  ];

  return (
    <div className="h-full w-full">
      <Tabs
        defaultValue="All Pending Tsx"
        className="w-full h-full flex flex-col"
      >
        <div className="flex items-center mb-2">
          <h3 className="font-bold text-black mr-4">Pending Transactions</h3>
          <TabsList className="grid grid-cols-3">
            {tabContents.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabContents.map(({ value, content }) => (
          <TabsContent
            key={value}
            value={value}
            className="w-full h-full data-[state=inactive]:hidden flex-grow bg-white text-black rounded-lg"
          >
            <div className="w-full h-full flex items-center justify-center text-3xl  ">
              {content}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
