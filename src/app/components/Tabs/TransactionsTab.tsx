import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/app/components/ui/tabs";

export function TransactionsTab() {
  const tabContents = [
    {
      value: "All Txn",
      label: "All Txn",
      content: "All Transactions Content",
    },
    {
      value: "Confirms",
      label: "Confirms",
      content: "Confirms Content",
    },
    {
      value: "Submits",
      label: "Submits",
      content: "Submits Content",
    },
    {
      value: "Execute",
      label: "Execute",
      content: "Execute Content",
    },
    {
      value: "Deposits",
      label: "Deposits",
      content: "Deposits Content",
    },
    {
      value: "Account",
      label: "Account",
      content: "Account Content",
    },
  ];

  return (
    <div className="w-full h-full p-5 ">
      <Tabs defaultValue="All Txn" className="w-full h-full flex flex-col">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-black mr-4">Transactions</h2>
          <TabsList className="grid grid-cols-6 gap-2">
            {tabContents.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="flex-grow ">
          {tabContents.map(({ value, content }) => (
            <TabsContent
              key={value}
              value={value}
              className="w-full h-full data-[state=inactive]:hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-3xl text-black bg-white rounded-lg">
                {content}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
