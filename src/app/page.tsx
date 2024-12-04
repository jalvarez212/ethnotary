import { Send, FileText, Link2 } from "lucide-react";
import Image from "next/image";
import { PendingTransactions } from "./components/Tabs/PendingTransactions";
import { TransactionsTab } from "./components/Tabs/TransactionsTab";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/app/components/ui/card";

const ACTIONS = [
  { icon: <Send className="w-5 h-5" />, title: "Send ETH" },
  { icon: <FileText className="w-5 h-5" />, title: "Transfer Token" },
  { icon: <FileText className="w-5 h-5" />, title: "Import Token" },
  { icon: <Link2 className="w-5 h-5" />, title: "Connect to dApp" },
];

export default function Home() {
  return (
    <>
      <div className="grid md:grid-cols-6 gap-10 ">
        <Card className="md:col-span-2">
          <CardContent className="p-10">
            <div className="grid gap-6">
              <Card className="bg-green-light">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardDescription className="text-[#7e8299] mb-1">
                        Balance
                      </CardDescription>
                      <CardTitle className="text-2xl font-bold text-[#152c5b] mb-2">
                        ETH
                      </CardTitle>
                      <span className="inline-block px-3 py-1 bg-[#20d489] text-white rounded-full text-sm">
                        Token Holdings
                      </span>
                    </div>
                    <Image
                      src="/placeholder.svg?height=120&width=120"
                      alt="Mascot"
                      width={120}
                      height={120}
                      className="w-30 h-30"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {ACTIONS.map((action, i) => (
                  <Card
                    key={i}
                    className="hover:bg-green-light border-2 border-transparent  bg-clay-primary border-dashed hover:border-green-primary transition-all ease-in duration-150"
                  >
                    <CardContent className="flex items-start flex-col gap-3 p-5">
                      <span className="text-[#3f4254]">{action.icon}</span>
                      <span className="text-[#3f4254] font-medium">
                        {action.title}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-4">
          <CardContent className="p-5">
            <PendingTransactions />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-6 gap-10 mt-10">
        <div className="md:col-span-2 flex flex-col gap-10">
          <Card>
            <CardContent className="p-10">
              <CardTitle className="text-[#7e8299] mb-2">Ether Price</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#20d489]">
                  $3666.32
                </span>
                <span className="text-[#a1a5b7]">@ 0.037804 BTC</span>
              </div>
              <CardDescription className="mt-2">
                As of Monday, December 2, 2024 at 08:54:28 PM
              </CardDescription>
              <CardFooter className="flex items-center gap-2 mt-2 p-0">
                <span className="text-sm text-[#7e8299]">
                  Source: coingecko.com
                </span>
                <button className="px-3 py-1 bg-[#20d489] text-white rounded-full text-sm">
                  Refresh
                </button>
              </CardFooter>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-10">
              <CardTitle className="text-[#7e8299] mb-4">
                Ethereum Stats
              </CardTitle>
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="text-[#7e8299]">Gas Price</span>
                  <span className="text-[#3f4254]">31.806494879 Gwei</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#7e8299]">Network Congestion</span>
                    <span className="text-[#3f4254]">15.5%</span>
                  </div>
                  <div className="h-2 bg-[#e4e6ef] rounded-full overflow-hidden">
                    <div className="h-full w-[15.5%] bg-[#20d489] rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="md:col-span-4">
          <CardContent>
            <TransactionsTab />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
